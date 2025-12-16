/**
 * Remote Patient Monitoring (RPM) API Routes
 * Device integration, vitals tracking, and alert engine
 * Supports Apple HealthKit, Google Health Connect, and third-party devices
 */

import { Hono } from 'hono'
import { authMiddleware, requirePatient, requireDoctor, requireCareTeamAccess } from '../middleware/auth'
import { rateLimiter } from '../middleware/rate-limit'
import { generateSecureId } from '../lib/crypto'

type Bindings = {
  DB: D1Database
}

const rpmRoutes = new Hono<{ Bindings: Bindings }>()

/**
 * Vital types and their normal ranges
 */
const VITAL_RANGES = {
  heartRate: { min: 60, max: 100, unit: 'bpm', critical_low: 40, critical_high: 150 },
  bloodPressureSystolic: { min: 90, max: 140, unit: 'mmHg', critical_low: 80, critical_high: 180 },
  bloodPressureDiastolic: { min: 60, max: 90, unit: 'mmHg', critical_low: 50, critical_high: 120 },
  temperature: { min: 36.1, max: 37.2, unit: '°C', critical_low: 35, critical_high: 39 },
  oxygenSaturation: { min: 95, max: 100, unit: '%', critical_low: 90, critical_high: null },
  bloodGlucose: { min: 70, max: 140, unit: 'mg/dL', critical_low: 54, critical_high: 250 },
  weight: { min: null, max: null, unit: 'kg', critical_low: null, critical_high: null },
  respiratoryRate: { min: 12, max: 20, unit: 'breaths/min', critical_low: 8, critical_high: 30 }
} as const

/**
 * Analyze vital and determine status
 */
function analyzeVital(type: keyof typeof VITAL_RANGES, value: number): {
  status: 'normal' | 'low' | 'high' | 'critical_low' | 'critical_high'
  message?: string
} {
  const range = VITAL_RANGES[type]
  
  if (range.critical_low && value <= range.critical_low) {
    return { status: 'critical_low', message: `${type} critically low` }
  }
  if (range.critical_high && value >= range.critical_high) {
    return { status: 'critical_high', message: `${type} critically high` }
  }
  if (range.min && value < range.min) {
    return { status: 'low', message: `${type} below normal` }
  }
  if (range.max && value > range.max) {
    return { status: 'high', message: `${type} above normal` }
  }
  return { status: 'normal' }
}

/**
 * POST /api/rpm/vitals/record
 * Record new vitals (from device sync or manual entry)
 */
rpmRoutes.post('/vitals/record', authMiddleware, requirePatient, rateLimiter('api:general'), async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { source = 'manual', deviceId, vitals } = body
    
    if (!vitals || typeof vitals !== 'object') {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Vitals data is required' }
      }, 400)
    }
    
    const recordId = generateSecureId(12)
    const timestamp = new Date().toISOString()
    const alerts: any[] = []
    const processedVitals: any = {}
    
    // Process each vital
    for (const [key, value] of Object.entries(vitals)) {
      if (value === null || value === undefined) continue
      
      const vitalType = key as keyof typeof VITAL_RANGES
      const numValue = Number(value)
      
      if (isNaN(numValue)) continue
      
      // Analyze vital
      const analysis = VITAL_RANGES[vitalType] ? analyzeVital(vitalType, numValue) : { status: 'normal' }
      
      processedVitals[key] = {
        value: numValue,
        unit: VITAL_RANGES[vitalType]?.unit || '',
        status: analysis.status,
        recordedAt: timestamp
      }
      
      // Generate alert if critical
      if (analysis.status === 'critical_low' || analysis.status === 'critical_high') {
        alerts.push({
          id: generateSecureId(8),
          type: 'critical',
          vital: key,
          value: numValue,
          status: analysis.status,
          message: analysis.message,
          timestamp,
          acknowledged: false
        })
      }
    }
    
    const record = {
      id: recordId,
      patientId: user.patientId,
      source,
      deviceId,
      vitals: processedVitals,
      alerts,
      recordedAt: timestamp
    }
    
    // TODO: Store in database
    // TODO: Send alerts to care team if critical
    
    return c.json({
      success: true,
      record,
      alertCount: alerts.length
    })
    
  } catch (error: any) {
    console.error('Record vitals error:', error)
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to record vitals' }
    }, 500)
  }
})

/**
 * POST /api/rpm/vitals/batch
 * Record multiple vitals records (for device sync)
 */
rpmRoutes.post('/vitals/batch', authMiddleware, requirePatient, rateLimiter('api:general'), async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { source, deviceId, records } = body
    
    if (!Array.isArray(records) || records.length === 0) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Records array is required' }
      }, 400)
    }
    
    // Limit batch size
    if (records.length > 100) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Maximum 100 records per batch' }
      }, 400)
    }
    
    const processedRecords: any[] = []
    const allAlerts: any[] = []
    
    for (const record of records) {
      const recordId = generateSecureId(12)
      const timestamp = record.timestamp || new Date().toISOString()
      
      processedRecords.push({
        id: recordId,
        patientId: user.patientId,
        source,
        deviceId,
        vitals: record.vitals,
        recordedAt: timestamp
      })
    }
    
    // TODO: Bulk insert into database
    
    return c.json({
      success: true,
      processed: processedRecords.length,
      alerts: allAlerts.length
    })
    
  } catch (error: any) {
    console.error('Batch vitals error:', error)
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to process batch' }
    }, 500)
  }
})

/**
 * GET /api/rpm/vitals/history
 * Get vitals history for patient
 */
rpmRoutes.get('/vitals/history', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const patientId = c.req.query('patientId') || user.patientId
    const vitalType = c.req.query('type')
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')
    const limit = parseInt(c.req.query('limit') || '50')
    
    // TODO: Fetch from database with filters
    // For demo, return mock data
    const mockHistory = [
      {
        id: 'vit-007',
        recordedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'device',
        vitals: {
          heartRate: { value: 72, unit: 'bpm', status: 'normal' },
          bloodPressureSystolic: { value: 128, unit: 'mmHg', status: 'normal' },
          bloodPressureDiastolic: { value: 82, unit: 'mmHg', status: 'normal' },
          oxygenSaturation: { value: 98, unit: '%', status: 'normal' },
          steps: { value: 4230, unit: 'steps', status: 'normal' }
        }
      },
      {
        id: 'vit-006',
        recordedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'device',
        vitals: {
          heartRate: { value: 73, unit: 'bpm', status: 'normal' },
          bloodPressureSystolic: { value: 127, unit: 'mmHg', status: 'normal' },
          bloodPressureDiastolic: { value: 82, unit: 'mmHg', status: 'normal' },
          weight: { value: 78.5, unit: 'kg', status: 'normal' }
        }
      }
    ]
    
    return c.json({
      success: true,
      patientId,
      history: mockHistory,
      pagination: {
        total: mockHistory.length,
        limit,
        offset: 0
      }
    })
    
  } catch (error: any) {
    console.error('Get vitals history error:', error)
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to get history' }
    }, 500)
  }
})

/**
 * GET /api/rpm/vitals/trends
 * Get vitals trends and analytics
 */
rpmRoutes.get('/vitals/trends', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const patientId = c.req.query('patientId') || user.patientId
    const period = c.req.query('period') || '7d' // 7d, 30d, 90d
    
    // TODO: Calculate trends from database
    return c.json({
      success: true,
      patientId,
      period,
      trends: {
        heartRate: {
          current: 72,
          average: 73,
          min: 65,
          max: 82,
          trend: 'stable',
          change: -1
        },
        bloodPressure: {
          current: '128/82',
          averageSystolic: 127,
          averageDiastolic: 81,
          trend: 'improving',
          change: -3
        },
        weight: {
          current: 78.5,
          starting: 79.2,
          target: 75,
          trend: 'improving',
          change: -0.7
        },
        steps: {
          dailyAverage: 5840,
          target: 8000,
          completion: 73,
          trend: 'improving'
        },
        sleep: {
          averageDuration: '7h 15m',
          averageScore: 81,
          trend: 'stable'
        }
      },
      insights: [
        { type: 'positive', message: 'Blood pressure has improved by 3 mmHg this week' },
        { type: 'info', message: 'You\'re averaging 73% of your daily step goal' },
        { type: 'suggestion', message: 'Try to increase daily steps by 1000 to reach your goal' }
      ]
    })
    
  } catch (error: any) {
    console.error('Get trends error:', error)
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to get trends' }
    }, 500)
  }
})

/**
 * POST /api/rpm/devices/connect
 * Connect a new device
 */
rpmRoutes.post('/devices/connect', authMiddleware, requirePatient, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { deviceType, deviceName, manufacturer, model, serialNumber } = body
    
    if (!deviceType || !deviceName) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Device type and name are required' }
      }, 400)
    }
    
    const device = {
      id: generateSecureId(12),
      patientId: user.patientId,
      deviceType,
      deviceName,
      manufacturer,
      model,
      serialNumber,
      connectionStatus: 'pairing',
      connectedAt: new Date().toISOString()
    }
    
    // TODO: Store in database
    
    return c.json({
      success: true,
      device,
      pairingInstructions: getPairingInstructions(deviceType)
    })
    
  } catch (error: any) {
    console.error('Connect device error:', error)
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to connect device' }
    }, 500)
  }
})

/**
 * Get pairing instructions for device type
 */
function getPairingInstructions(deviceType: string): string[] {
  const instructions: Record<string, string[]> = {
    smartwatch: [
      'Open the health app on your smartwatch',
      'Go to Settings > Connected Apps',
      'Select "German Select" from the list',
      'Confirm the connection on both devices'
    ],
    scale: [
      'Step on the scale to turn it on',
      'Open Bluetooth settings on your phone',
      'Select the scale from available devices',
      'Enter the pairing code if prompted'
    ],
    glucometer: [
      'Turn on your glucometer',
      'Enable Bluetooth mode (usually hold button for 3 seconds)',
      'The device should appear in the app automatically'
    ],
    blood_pressure: [
      'Turn on your blood pressure monitor',
      'Press the Bluetooth button',
      'Wait for the device to appear in the app'
    ]
  }
  
  return instructions[deviceType] || [
    'Enable Bluetooth on your device',
    'Put the device in pairing mode',
    'Select the device when it appears'
  ]
}

/**
 * GET /api/rpm/devices
 * Get connected devices for patient
 */
rpmRoutes.get('/devices', authMiddleware, async (c) => {
  const user = c.get('user')
  
  // TODO: Fetch from database
  return c.json({
    success: true,
    devices: [
      {
        id: 'dev-001',
        deviceType: 'smartwatch',
        deviceName: 'Apple Watch Series 9',
        manufacturer: 'Apple',
        connectionStatus: 'connected',
        batteryLevel: 72,
        lastSync: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        dataTypes: ['heartRate', 'steps', 'sleep', 'oxygenSaturation']
      },
      {
        id: 'dev-002',
        deviceType: 'scale',
        deviceName: 'Withings Body+',
        manufacturer: 'Withings',
        connectionStatus: 'connected',
        batteryLevel: 85,
        lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        dataTypes: ['weight', 'bodyFat', 'muscle', 'water']
      }
    ]
  })
})

/**
 * DELETE /api/rpm/devices/:deviceId
 * Disconnect a device
 */
rpmRoutes.delete('/devices/:deviceId', authMiddleware, requirePatient, async (c) => {
  try {
    const deviceId = c.req.param('deviceId')
    
    // TODO: Remove from database
    
    return c.json({
      success: true,
      message: 'Device disconnected successfully'
    })
    
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to disconnect device' }
    }, 500)
  }
})

/**
 * GET /api/rpm/alerts
 * Get alerts for patient
 */
rpmRoutes.get('/alerts', authMiddleware, async (c) => {
  const user = c.get('user')
  const status = c.req.query('status') // all, unacknowledged, acknowledged
  
  // TODO: Fetch from database
  return c.json({
    success: true,
    alerts: [
      {
        id: 'alert-001',
        type: 'warning',
        vital: 'bloodPressureSystolic',
        value: 145,
        message: 'Blood pressure slightly elevated',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        acknowledged: false,
        recommendation: 'Rest for 10 minutes and measure again. Contact your doctor if it remains high.'
      }
    ],
    unacknowledgedCount: 1
  })
})

/**
 * POST /api/rpm/alerts/:alertId/acknowledge
 * Acknowledge an alert
 */
rpmRoutes.post('/alerts/:alertId/acknowledge', authMiddleware, async (c) => {
  try {
    const alertId = c.req.param('alertId')
    const user = c.get('user')
    
    // TODO: Update in database
    
    return c.json({
      success: true,
      alert: {
        id: alertId,
        acknowledged: true,
        acknowledgedAt: new Date().toISOString(),
        acknowledgedBy: user.sub
      }
    })
    
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to acknowledge alert' }
    }, 500)
  }
})

/**
 * GET /api/rpm/selectscore
 * Calculate and return SelectScore™
 */
rpmRoutes.get('/selectscore', authMiddleware, async (c) => {
  const user = c.get('user')
  const patientId = c.req.query('patientId') || user.patientId
  
  // TODO: Calculate from actual data
  // SelectScore™ is a composite health engagement score
  const factors = {
    vitalsCompliance: 90,      // % of days with vitals recorded
    medicationAdherence: 95,   // % of medications taken on time
    exerciseCompletion: 75,    // % of exercise goals met
    nutritionTracking: 80,     // % of meals logged
    appointmentAttendance: 100 // % of appointments attended
  }
  
  // Weighted average
  const weights = {
    vitalsCompliance: 0.25,
    medicationAdherence: 0.30,
    exerciseCompletion: 0.20,
    nutritionTracking: 0.10,
    appointmentAttendance: 0.15
  }
  
  const score = Math.round(
    Object.entries(factors).reduce((sum, [key, value]) => {
      return sum + value * weights[key as keyof typeof weights]
    }, 0)
  )
  
  const previousScore = 80 // TODO: Get from history
  const change = score - previousScore
  
  return c.json({
    success: true,
    selectScore: {
      score,
      maxScore: 100,
      status: score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Fair' : 'Needs Improvement',
      change,
      changeDirection: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      factors,
      lastUpdated: new Date().toISOString(),
      insights: [
        score >= 85 
          ? 'Great job! Your health engagement is excellent.'
          : 'Keep tracking your vitals daily to improve your score.'
      ]
    }
  })
})

/**
 * POST /api/rpm/goals/set
 * Set health goals for patient
 */
rpmRoutes.post('/goals/set', authMiddleware, requirePatient, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { goals } = body
    
    // Validate goals
    const validGoalTypes = ['steps', 'weight', 'bloodPressure', 'bloodGlucose', 'sleep', 'exercise']
    const processedGoals: any[] = []
    
    for (const goal of goals) {
      if (!validGoalTypes.includes(goal.type)) continue
      
      processedGoals.push({
        id: generateSecureId(8),
        patientId: user.patientId,
        type: goal.type,
        target: goal.target,
        unit: goal.unit,
        frequency: goal.frequency || 'daily',
        startDate: goal.startDate || new Date().toISOString(),
        endDate: goal.endDate,
        createdAt: new Date().toISOString()
      })
    }
    
    // TODO: Store in database
    
    return c.json({
      success: true,
      goals: processedGoals
    })
    
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'RPM_ERROR', message: error.message || 'Failed to set goals' }
    }, 500)
  }
})

/**
 * GET /api/rpm/goals
 * Get patient's health goals
 */
rpmRoutes.get('/goals', authMiddleware, async (c) => {
  const user = c.get('user')
  
  // TODO: Fetch from database
  return c.json({
    success: true,
    goals: [
      {
        id: 'goal-001',
        type: 'steps',
        target: 8000,
        unit: 'steps',
        frequency: 'daily',
        current: 4230,
        progress: 53,
        streak: 5
      },
      {
        id: 'goal-002',
        type: 'weight',
        target: 75,
        unit: 'kg',
        current: 78.5,
        startValue: 82,
        progress: 50,
        trend: 'on_track'
      }
    ]
  })
})

export { rpmRoutes }
