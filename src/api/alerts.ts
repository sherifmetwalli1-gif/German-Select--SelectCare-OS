/**
 * Alert API Routes
 * Real-time patient monitoring alerts and notifications
 */

import { Hono } from 'hono'
import { authMiddleware, requireDoctor, requireCareTeamAccess, optionalAuth } from '../middleware/auth'
import { rateLimiter } from '../middleware/rate-limit'
import { alertEngine, AlertSeverity, AlertStatus, AlertCategory } from '../lib/alert-engine'

type Bindings = {
  DB: D1Database
}

const alertRoutes = new Hono<{ Bindings: Bindings }>()

/**
 * GET /api/alerts
 * Get alerts for the current user or specified patient
 */
alertRoutes.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const patientId = c.req.query('patientId') || user.patientId
    const status = c.req.query('status') as AlertStatus | undefined
    const severity = c.req.query('severity') as AlertSeverity | undefined
    const category = c.req.query('category') as AlertCategory | undefined
    const limit = parseInt(c.req.query('limit') || '50')
    
    if (!patientId) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID required' }
      }, 400)
    }
    
    // For patients, only allow their own alerts
    if (user.role === 'patient' && user.patientId !== patientId) {
      return c.json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Access denied' }
      }, 403)
    }
    
    const alerts = alertEngine.getPatientAlerts(patientId, {
      status,
      severity,
      category,
      limit
    })
    
    return c.json({
      success: true,
      patientId,
      alerts,
      count: alerts.length
    })
    
  } catch (error: any) {
    console.error('Get alerts error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to get alerts' }
    }, 500)
  }
})

/**
 * GET /api/alerts/active
 * Get active (unacknowledged) alerts for current user
 */
alertRoutes.get('/active', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const patientId = c.req.query('patientId') || user.patientId
    
    if (!patientId) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID required' }
      }, 400)
    }
    
    const alerts = alertEngine.getPatientAlerts(patientId, { status: 'active' })
    
    // Group by severity for dashboard display
    const grouped = {
      emergency: alerts.filter(a => a.severity === 'emergency'),
      critical: alerts.filter(a => a.severity === 'critical'),
      urgent: alerts.filter(a => a.severity === 'urgent'),
      warning: alerts.filter(a => a.severity === 'warning'),
      info: alerts.filter(a => a.severity === 'info')
    }
    
    return c.json({
      success: true,
      patientId,
      activeCount: alerts.length,
      alerts: grouped
    })
    
  } catch (error: any) {
    console.error('Get active alerts error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to get active alerts' }
    }, 500)
  }
})

/**
 * GET /api/alerts/stats
 * Get alert statistics for a patient
 */
alertRoutes.get('/stats', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const patientId = c.req.query('patientId') || user.patientId
    
    if (!patientId) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID required' }
      }, 400)
    }
    
    const stats = alertEngine.getAlertStats(patientId)
    
    return c.json({
      success: true,
      patientId,
      stats
    })
    
  } catch (error: any) {
    console.error('Get alert stats error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to get alert stats' }
    }, 500)
  }
})

/**
 * POST /api/alerts/:id/acknowledge
 * Acknowledge an alert
 */
alertRoutes.post('/:id/acknowledge', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const alertId = c.req.param('id')
    
    const alert = alertEngine.acknowledgeAlert(alertId, user.sub)
    
    if (!alert) {
      return c.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Alert not found' }
      }, 404)
    }
    
    return c.json({
      success: true,
      alert
    })
    
  } catch (error: any) {
    console.error('Acknowledge alert error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to acknowledge alert' }
    }, 500)
  }
})

/**
 * POST /api/alerts/:id/resolve
 * Resolve an alert
 */
alertRoutes.post('/:id/resolve', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const alertId = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const { resolution } = body
    
    const alert = alertEngine.resolveAlert(alertId, user.sub, resolution)
    
    if (!alert) {
      return c.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Alert not found' }
      }, 404)
    }
    
    return c.json({
      success: true,
      alert
    })
    
  } catch (error: any) {
    console.error('Resolve alert error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to resolve alert' }
    }, 500)
  }
})

/**
 * POST /api/alerts/:id/snooze
 * Snooze an alert for specified minutes
 */
alertRoutes.post('/:id/snooze', authMiddleware, async (c) => {
  try {
    const alertId = c.req.param('id')
    const body = await c.req.json()
    const { minutes = 30 } = body
    
    // Validate snooze duration
    if (minutes < 5 || minutes > 480) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Snooze duration must be between 5 and 480 minutes' }
      }, 400)
    }
    
    const alert = alertEngine.snoozeAlert(alertId, minutes)
    
    if (!alert) {
      return c.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Alert not found' }
      }, 404)
    }
    
    return c.json({
      success: true,
      alert
    })
    
  } catch (error: any) {
    console.error('Snooze alert error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to snooze alert' }
    }, 500)
  }
})

/**
 * POST /api/alerts/:id/escalate
 * Manually escalate an alert to next level
 */
alertRoutes.post('/:id/escalate', authMiddleware, requireDoctor, async (c) => {
  try {
    const alertId = c.req.param('id')
    
    const alert = alertEngine.escalateAlert(alertId)
    
    if (!alert) {
      return c.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Alert not found' }
      }, 404)
    }
    
    return c.json({
      success: true,
      alert
    })
    
  } catch (error: any) {
    console.error('Escalate alert error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to escalate alert' }
    }, 500)
  }
})

/**
 * POST /api/alerts/process-vitals
 * Process vitals and generate alerts
 */
alertRoutes.post('/process-vitals', authMiddleware, rateLimiter('api:general'), async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { patientId = user.patientId, vitals } = body
    
    if (!patientId) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID required' }
      }, 400)
    }
    
    if (!vitals || typeof vitals !== 'object') {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Vitals data required' }
      }, 400)
    }
    
    const alerts = alertEngine.processVitals(patientId, vitals)
    
    return c.json({
      success: true,
      patientId,
      alertsGenerated: alerts.length,
      alerts
    })
    
  } catch (error: any) {
    console.error('Process vitals error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to process vitals' }
    }, 500)
  }
})

/**
 * POST /api/alerts/analyze-trends
 * Analyze vital trends and detect patterns
 */
alertRoutes.post('/analyze-trends', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { patientId = user.patientId, vitalType, readings } = body
    
    if (!patientId || !vitalType || !readings) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID, vital type, and readings required' }
      }, 400)
    }
    
    const analysis = alertEngine.analyzeVitalTrends(patientId, vitalType, readings)
    
    return c.json({
      success: true,
      patientId,
      vitalType,
      analysis
    })
    
  } catch (error: any) {
    console.error('Analyze trends error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to analyze trends' }
    }, 500)
  }
})

/**
 * GET /api/alerts/care-team
 * Get alerts for all patients under care (for doctors/coordinators)
 */
alertRoutes.get('/care-team', authMiddleware, requireDoctor, async (c) => {
  try {
    const user = c.get('user')
    const severity = c.req.query('severity') as AlertSeverity | undefined
    
    // TODO: In production, fetch patient list from care_team table
    // For demo, return mock aggregated alerts
    const mockPatients = ['pprof-001', 'pprof-002', 'pprof-003']
    
    const allAlerts = mockPatients.flatMap(patientId => {
      return alertEngine.getPatientAlerts(patientId, {
        status: 'active',
        severity,
        limit: 10
      }).map(alert => ({
        ...alert,
        patientName: patientId === 'pprof-001' ? 'Max Mustermann' :
                     patientId === 'pprof-002' ? 'Anna Schmidt' : 'Peter Müller'
      }))
    })
    
    // Sort by severity and time
    allAlerts.sort((a, b) => {
      const severityOrder: Record<AlertSeverity, number> = {
        emergency: 5,
        critical: 4,
        urgent: 3,
        warning: 2,
        info: 1
      }
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity]
      if (severityDiff !== 0) return severityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    return c.json({
      success: true,
      doctorId: user.doctorId,
      patientCount: mockPatients.length,
      alertCount: allAlerts.length,
      alerts: allAlerts.slice(0, 50)
    })
    
  } catch (error: any) {
    console.error('Get care team alerts error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to get care team alerts' }
    }, 500)
  }
})

/**
 * PUT /api/alerts/thresholds
 * Set custom alert thresholds for a patient
 */
alertRoutes.put('/thresholds', authMiddleware, requireDoctor, async (c) => {
  try {
    const body = await c.req.json()
    const { patientId, thresholds } = body
    
    if (!patientId || !Array.isArray(thresholds)) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Patient ID and thresholds array required' }
      }, 400)
    }
    
    alertEngine.setPatientThresholds(patientId, thresholds)
    
    return c.json({
      success: true,
      message: 'Custom thresholds set successfully',
      patientId,
      thresholdCount: thresholds.length
    })
    
  } catch (error: any) {
    console.error('Set thresholds error:', error)
    return c.json({
      success: false,
      error: { code: 'ALERT_ERROR', message: error.message || 'Failed to set thresholds' }
    }, 500)
  }
})

export { alertRoutes }
