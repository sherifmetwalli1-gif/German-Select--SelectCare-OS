/**
 * Advanced Telemedicine API Routes
 * WebRTC integration with Jitsi/Daily.co
 * HIPAA-compliant video consultations
 */

import { Hono } from 'hono'
import { authMiddleware, requirePatient, requireDoctor, requireCareTeamAccess } from '../middleware/auth'
import { rateLimiter } from '../middleware/rate-limit'
import { generateSecureId } from '../lib/crypto'

type Bindings = {
  DAILY_API_KEY: string
  JITSI_APP_ID: string
  DB: D1Database
}

const telemedicineRoutes = new Hono<{ Bindings: Bindings }>()

// Daily.co API base URL
const DAILY_API = 'https://api.daily.co/v1'

/**
 * Helper to make Daily.co API requests
 */
async function dailyRequest(
  endpoint: string,
  method: string,
  apiKey: string,
  body?: Record<string, any>
): Promise<any> {
  const url = `${DAILY_API}${endpoint}`
  
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Daily.co API error')
  }
  
  return data
}

/**
 * Generate Jitsi meeting URL (free, self-hosted option)
 */
function generateJitsiRoom(sessionId: string, config: {
  appId?: string
  subject?: string
  startWithAudioMuted?: boolean
  startWithVideoMuted?: boolean
}): string {
  const roomName = `gs-${sessionId}`
  const baseUrl = config.appId ? `https://${config.appId}.jitsi.net` : 'https://meet.jit.si'
  
  const params = new URLSearchParams()
  if (config.subject) params.set('subject', config.subject)
  if (config.startWithAudioMuted) params.set('config.startWithAudioMuted', 'true')
  if (config.startWithVideoMuted) params.set('config.startWithVideoMuted', 'true')
  
  // Add HIPAA-friendly settings
  params.set('config.disableDeepLinking', 'true')
  params.set('config.prejoinPageEnabled', 'true')
  params.set('config.enableClosePage', 'true')
  params.set('interfaceConfig.SHOW_PROMOTIONAL_CLOSE_PAGE', 'false')
  
  return `${baseUrl}/${roomName}?${params.toString()}`
}

/**
 * Session status enum
 */
const SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  WAITING: 'waiting',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
} as const

/**
 * POST /api/telemedicine/rooms/create
 * Create a new video room for consultation
 */
telemedicineRoutes.post('/rooms/create', authMiddleware, rateLimiter('telemed:start'), async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { appointmentId, doctorId, patientId, scheduledTime, duration = 30 } = body
    
    const sessionId = generateSecureId(12)
    const dailyApiKey = c.env?.DAILY_API_KEY
    const jitsiAppId = c.env?.JITSI_APP_ID
    
    let roomData: any
    
    if (dailyApiKey) {
      // Use Daily.co for production
      const room = await dailyRequest('/rooms', 'POST', dailyApiKey, {
        name: `gs-${sessionId}`,
        privacy: 'private',
        properties: {
          exp: Math.floor(Date.now() / 1000) + (duration + 30) * 60, // Expiry with buffer
          max_participants: 5,
          enable_screenshare: true,
          enable_chat: true,
          enable_recording: false, // Set true if enabled
          start_video_off: false,
          start_audio_off: false,
          lang: 'de',
          // HIPAA compliance settings
          enable_people_ui: true,
          enable_pip_ui: true,
          enable_emoji_reactions: false,
          enable_hand_raising: true,
          enable_noise_cancellation_ui: true,
        }
      })
      
      roomData = {
        provider: 'daily',
        roomUrl: room.url,
        roomName: room.name,
        expiresAt: new Date(room.config.exp * 1000).toISOString()
      }
    } else {
      // Use Jitsi as fallback (free)
      const jitsiUrl = generateJitsiRoom(sessionId, {
        appId: jitsiAppId,
        subject: `German Select Consultation - ${sessionId}`
      })
      
      roomData = {
        provider: 'jitsi',
        roomUrl: jitsiUrl,
        roomName: `gs-${sessionId}`,
        expiresAt: new Date(Date.now() + (duration + 30) * 60 * 1000).toISOString()
      }
    }
    
    // Create session record
    const session = {
      id: sessionId,
      appointmentId,
      doctorId,
      patientId: patientId || user.patientId,
      status: SESSION_STATUS.SCHEDULED,
      scheduledTime,
      duration,
      ...roomData,
      features: {
        video: true,
        audio: true,
        chat: true,
        screenShare: true,
        recording: false,
        translation: true,
        captions: true
      },
      compliance: ['HIPAA', 'GDPR'],
      createdAt: new Date().toISOString(),
      createdBy: user.sub
    }
    
    // TODO: Store session in database
    
    return c.json({
      success: true,
      session
    })
    
  } catch (error: any) {
    console.error('Create room error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Failed to create room' }
    }, 500)
  }
})

/**
 * POST /api/telemedicine/rooms/:sessionId/join
 * Join an existing room (generates access token)
 */
telemedicineRoutes.post('/rooms/:sessionId/join', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    const body = await c.req.json()
    const { displayName } = body
    
    const dailyApiKey = c.env?.DAILY_API_KEY
    
    let joinData: any
    
    if (dailyApiKey) {
      // Generate Daily.co meeting token
      const token = await dailyRequest('/meeting-tokens', 'POST', dailyApiKey, {
        properties: {
          room_name: `gs-${sessionId}`,
          user_name: displayName || user.name,
          user_id: user.sub,
          is_owner: user.role === 'doctor',
          enable_screenshare: true,
          start_video_off: false,
          start_audio_off: false,
          exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60, // 2 hour token
        }
      })
      
      joinData = {
        provider: 'daily',
        token: token.token,
        roomUrl: `https://germanselect.daily.co/gs-${sessionId}`,
        expiresAt: new Date(token.exp * 1000).toISOString()
      }
    } else {
      // Jitsi doesn't require token for basic usage
      joinData = {
        provider: 'jitsi',
        roomUrl: generateJitsiRoom(sessionId, {
          appId: c.env?.JITSI_APP_ID,
          subject: `Consultation with ${displayName || user.name}`
        }),
        displayName: displayName || user.name
      }
    }
    
    // Update session status
    // TODO: Update in database
    
    return c.json({
      success: true,
      join: joinData,
      user: {
        id: user.sub,
        name: user.name,
        role: user.role
      }
    })
    
  } catch (error: any) {
    console.error('Join room error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Failed to join room' }
    }, 500)
  }
})

/**
 * POST /api/telemedicine/rooms/:sessionId/end
 * End a telemedicine session
 */
telemedicineRoutes.post('/rooms/:sessionId/end', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    const body = await c.req.json()
    const { notes, prescriptions, followUp } = body
    
    const dailyApiKey = c.env?.DAILY_API_KEY
    
    if (dailyApiKey) {
      // Delete Daily.co room
      try {
        await dailyRequest(`/rooms/gs-${sessionId}`, 'DELETE', dailyApiKey)
      } catch (e) {
        // Room may already be deleted
      }
    }
    
    // Update session record
    const sessionUpdate = {
      status: SESSION_STATUS.COMPLETED,
      endedAt: new Date().toISOString(),
      endedBy: user.sub,
      clinicalNotes: notes,
      prescriptions,
      followUpScheduled: followUp
    }
    
    // TODO: Update in database
    
    return c.json({
      success: true,
      session: {
        id: sessionId,
        ...sessionUpdate
      }
    })
    
  } catch (error: any) {
    console.error('End session error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Failed to end session' }
    }, 500)
  }
})

/**
 * GET /api/telemedicine/waiting-room/:doctorId
 * Get waiting room status for a doctor
 */
telemedicineRoutes.get('/waiting-room/:doctorId', authMiddleware, async (c) => {
  const doctorId = c.req.param('doctorId')
  
  // TODO: Fetch from database
  // For demo, return mock waiting room
  return c.json({
    success: true,
    waitingRoom: {
      doctorId,
      doctor: {
        name: 'Dr. L. Weber',
        specialty: 'Orthopedic Surgery',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200',
        status: 'in_session',
        currentSessionEndsIn: '~5 min'
      },
      queue: [
        {
          position: 1,
          patientId: 'pprof-001',
          patientName: 'M. Mustermann',
          appointmentType: 'Follow-up',
          checkInTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          estimatedWait: '~5 min',
          preVisitFormCompleted: true
        }
      ],
      settings: {
        maxQueueSize: 10,
        avgSessionDuration: 20,
        autoNotify: true,
        soundEnabled: true
      }
    }
  })
})

/**
 * POST /api/telemedicine/waiting-room/check-in
 * Patient checks into waiting room
 */
telemedicineRoutes.post('/waiting-room/check-in', authMiddleware, requirePatient, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { appointmentId, doctorId } = body
    
    const checkIn = {
      id: generateSecureId(8),
      patientId: user.patientId,
      patientName: user.name,
      appointmentId,
      doctorId,
      checkInTime: new Date().toISOString(),
      status: 'waiting',
      position: 1, // TODO: Calculate actual position
      estimatedWait: '~10 min'
    }
    
    // TODO: Add to waiting room queue in database
    
    return c.json({
      success: true,
      checkIn
    })
    
  } catch (error: any) {
    console.error('Check-in error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Check-in failed' }
    }, 500)
  }
})

/**
 * POST /api/telemedicine/waiting-room/call-next
 * Doctor calls next patient from waiting room
 */
telemedicineRoutes.post('/waiting-room/call-next', authMiddleware, requireDoctor, async (c) => {
  try {
    const user = c.get('user')
    
    // TODO: Get next patient from queue
    const nextPatient = {
      id: 'pprof-001',
      name: 'Max Mustermann',
      appointmentId: 'apt-001',
      waitTime: '12 min'
    }
    
    // Create room for session
    const sessionId = generateSecureId(12)
    const roomUrl = generateJitsiRoom(sessionId, {
      appId: c.env?.JITSI_APP_ID,
      subject: `Consultation - ${nextPatient.name}`
    })
    
    // TODO: Update queue, notify patient
    
    return c.json({
      success: true,
      session: {
        id: sessionId,
        patient: nextPatient,
        roomUrl
      }
    })
    
  } catch (error: any) {
    console.error('Call next error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Failed to call next patient' }
    }, 500)
  }
})

/**
 * GET /api/telemedicine/device-check/run
 * Run comprehensive device compatibility check
 */
telemedicineRoutes.get('/device-check/run', async (c) => {
  // This endpoint returns client-side checks the browser should perform
  return c.json({
    success: true,
    checks: {
      required: [
        { id: 'webrtc', name: 'WebRTC Support', description: 'Check if browser supports WebRTC' },
        { id: 'camera', name: 'Camera Access', description: 'Request camera permission and test' },
        { id: 'microphone', name: 'Microphone Access', description: 'Request microphone permission and test' },
        { id: 'speaker', name: 'Speaker Test', description: 'Play test tone and confirm' }
      ],
      optional: [
        { id: 'screenshare', name: 'Screen Share', description: 'Check screen sharing capability' },
        { id: 'bandwidth', name: 'Bandwidth Test', description: 'Test network speed' }
      ],
      minimumRequirements: {
        browser: ['Chrome 80+', 'Firefox 75+', 'Safari 14+', 'Edge 80+'],
        bandwidth: { download: '2 Mbps', upload: '1 Mbps' },
        latency: '< 150ms'
      },
      clientScript: '/static/device-check.js'
    }
  })
})

/**
 * POST /api/telemedicine/sessions/:sessionId/notes
 * Save clinical notes for a session (doctor only)
 */
telemedicineRoutes.post('/sessions/:sessionId/notes', authMiddleware, requireDoctor, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    const body = await c.req.json()
    
    const notes = {
      sessionId,
      doctorId: user.doctorId,
      chiefComplaint: body.chiefComplaint,
      assessment: body.assessment,
      diagnosis: body.diagnosis,
      plan: body.plan,
      recommendations: body.recommendations,
      followUpDate: body.followUpDate,
      prescriptions: body.prescriptions,
      labOrders: body.labOrders,
      savedAt: new Date().toISOString(),
      signature: {
        doctorId: user.doctorId,
        doctorName: user.name,
        signedAt: new Date().toISOString()
      }
    }
    
    // TODO: Save to database
    
    return c.json({
      success: true,
      notes
    })
    
  } catch (error: any) {
    console.error('Save notes error:', error)
    return c.json({
      success: false,
      error: { code: 'TELEMEDICINE_ERROR', message: error.message || 'Failed to save notes' }
    }, 500)
  }
})

/**
 * GET /api/telemedicine/sessions/:sessionId/summary
 * Get session summary (for patient)
 */
telemedicineRoutes.get('/sessions/:sessionId/summary', authMiddleware, async (c) => {
  const sessionId = c.req.param('sessionId')
  
  // TODO: Fetch from database and check access permissions
  return c.json({
    success: true,
    summary: {
      sessionId,
      date: new Date().toISOString(),
      doctor: {
        name: 'Dr. L. Weber',
        specialty: 'Orthopedic Surgery'
      },
      duration: '25 min',
      diagnosis: 'Post-operative recovery progressing well',
      recommendations: [
        'Continue current medication regimen',
        'Increase physical activity gradually',
        'Follow-up in 2 weeks'
      ],
      prescriptions: [
        { medication: 'Metformin 500mg', dosage: 'Twice daily with meals' }
      ],
      nextAppointment: {
        date: '2024-11-05',
        type: 'Telemedicine Follow-up'
      },
      attachments: [
        { name: 'Visit_Summary.pdf', url: '#' }
      ]
    }
  })
})

export { telemedicineRoutes }
