/**
 * Alert Engine
 * Real-time monitoring and alerting for patient vitals
 * HIPAA-compliant alert management with escalation support
 */

import { generateSecureId } from './crypto'

// Alert severity levels
export type AlertSeverity = 'info' | 'warning' | 'urgent' | 'critical' | 'emergency'

// Alert status
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'escalated' | 'snoozed'

// Alert categories
export type AlertCategory = 
  | 'vital_abnormal'
  | 'vital_critical'
  | 'vital_trending'
  | 'medication_reminder'
  | 'appointment_reminder'
  | 'device_disconnected'
  | 'goal_not_met'
  | 'recovery_milestone'
  | 'care_team_message'
  | 'system'

// Alert interface
export interface Alert {
  id: string
  patientId: string
  category: AlertCategory
  severity: AlertSeverity
  status: AlertStatus
  title: string
  message: string
  data?: Record<string, any>
  createdAt: string
  acknowledgedAt?: string
  acknowledgedBy?: string
  resolvedAt?: string
  resolvedBy?: string
  escalatedAt?: string
  escalationLevel?: number
  snoozeUntil?: string
  expiresAt?: string
  notificationsSent?: {
    email?: boolean
    sms?: boolean
    push?: boolean
    inApp?: boolean
  }
}

// Vital thresholds configuration
export interface VitalThresholds {
  vitalType: string
  unit: string
  normalMin?: number
  normalMax?: number
  warningMin?: number
  warningMax?: number
  criticalMin?: number
  criticalMax?: number
  emergencyMin?: number
  emergencyMax?: number
}

// Default vital thresholds (can be overridden per patient)
export const DEFAULT_VITAL_THRESHOLDS: VitalThresholds[] = [
  {
    vitalType: 'heartRate',
    unit: 'bpm',
    normalMin: 60,
    normalMax: 100,
    warningMin: 50,
    warningMax: 110,
    criticalMin: 40,
    criticalMax: 130,
    emergencyMin: 30,
    emergencyMax: 180
  },
  {
    vitalType: 'bloodPressureSystolic',
    unit: 'mmHg',
    normalMin: 90,
    normalMax: 120,
    warningMin: 85,
    warningMax: 140,
    criticalMin: 80,
    criticalMax: 160,
    emergencyMin: 70,
    emergencyMax: 180
  },
  {
    vitalType: 'bloodPressureDiastolic',
    unit: 'mmHg',
    normalMin: 60,
    normalMax: 80,
    warningMin: 55,
    warningMax: 90,
    criticalMin: 50,
    criticalMax: 100,
    emergencyMin: 40,
    emergencyMax: 120
  },
  {
    vitalType: 'oxygenSaturation',
    unit: '%',
    normalMin: 95,
    normalMax: 100,
    warningMin: 92,
    warningMax: 100,
    criticalMin: 88,
    criticalMax: 100,
    emergencyMin: 85,
    emergencyMax: 100
  },
  {
    vitalType: 'temperature',
    unit: '°C',
    normalMin: 36.1,
    normalMax: 37.2,
    warningMin: 35.5,
    warningMax: 37.8,
    criticalMin: 35.0,
    criticalMax: 38.5,
    emergencyMin: 34.0,
    emergencyMax: 40.0
  },
  {
    vitalType: 'bloodGlucose',
    unit: 'mg/dL',
    normalMin: 70,
    normalMax: 140,
    warningMin: 60,
    warningMax: 180,
    criticalMin: 54,
    criticalMax: 250,
    emergencyMin: 40,
    emergencyMax: 400
  },
  {
    vitalType: 'respiratoryRate',
    unit: 'breaths/min',
    normalMin: 12,
    normalMax: 20,
    warningMin: 10,
    warningMax: 24,
    criticalMin: 8,
    criticalMax: 28,
    emergencyMin: 6,
    emergencyMax: 35
  }
]

// Escalation rules
export interface EscalationRule {
  level: number
  delayMinutes: number
  notifyRoles: string[]
  notificationChannels: ('email' | 'sms' | 'push' | 'phone')[]
}

export const DEFAULT_ESCALATION_RULES: EscalationRule[] = [
  {
    level: 1,
    delayMinutes: 0,
    notifyRoles: ['patient'],
    notificationChannels: ['push', 'email']
  },
  {
    level: 2,
    delayMinutes: 5,
    notifyRoles: ['care_coordinator'],
    notificationChannels: ['push', 'email', 'sms']
  },
  {
    level: 3,
    delayMinutes: 15,
    notifyRoles: ['nurse', 'primary_doctor'],
    notificationChannels: ['push', 'email', 'sms', 'phone']
  },
  {
    level: 4,
    delayMinutes: 30,
    notifyRoles: ['attending_physician', 'department_head'],
    notificationChannels: ['phone', 'sms', 'push']
  },
  {
    level: 5,
    delayMinutes: 45,
    notifyRoles: ['emergency_services'],
    notificationChannels: ['phone']
  }
]

/**
 * Alert Engine class
 * Handles alert creation, evaluation, and escalation
 */
export class AlertEngine {
  private thresholds: Map<string, VitalThresholds> = new Map()
  private escalationRules: EscalationRule[] = DEFAULT_ESCALATION_RULES
  private alerts: Map<string, Alert> = new Map() // In production, use D1
  private patientAlerts: Map<string, Set<string>> = new Map() // patientId -> alertIds
  
  constructor() {
    // Initialize default thresholds
    DEFAULT_VITAL_THRESHOLDS.forEach(t => {
      this.thresholds.set(t.vitalType, t)
    })
  }
  
  /**
   * Set custom thresholds for a patient
   */
  setPatientThresholds(patientId: string, thresholds: VitalThresholds[]): void {
    // In production, store per-patient thresholds in database
    thresholds.forEach(t => {
      this.thresholds.set(`${patientId}:${t.vitalType}`, t)
    })
  }
  
  /**
   * Get thresholds for a vital type (patient-specific or default)
   */
  getThresholds(patientId: string, vitalType: string): VitalThresholds | undefined {
    // Check patient-specific first, then fallback to default
    return this.thresholds.get(`${patientId}:${vitalType}`) || 
           this.thresholds.get(vitalType)
  }
  
  /**
   * Evaluate a vital reading and determine severity
   */
  evaluateVital(
    patientId: string,
    vitalType: string,
    value: number
  ): { severity: AlertSeverity | null; message: string | null; threshold: VitalThresholds | null } {
    const threshold = this.getThresholds(patientId, vitalType)
    
    if (!threshold) {
      return { severity: null, message: null, threshold: null }
    }
    
    // Check emergency thresholds
    if (threshold.emergencyMin !== undefined && value < threshold.emergencyMin) {
      return {
        severity: 'emergency',
        message: `${vitalType} critically low: ${value} ${threshold.unit} (emergency threshold: ${threshold.emergencyMin})`,
        threshold
      }
    }
    if (threshold.emergencyMax !== undefined && value > threshold.emergencyMax) {
      return {
        severity: 'emergency',
        message: `${vitalType} critically high: ${value} ${threshold.unit} (emergency threshold: ${threshold.emergencyMax})`,
        threshold
      }
    }
    
    // Check critical thresholds
    if (threshold.criticalMin !== undefined && value < threshold.criticalMin) {
      return {
        severity: 'critical',
        message: `${vitalType} very low: ${value} ${threshold.unit} (critical threshold: ${threshold.criticalMin})`,
        threshold
      }
    }
    if (threshold.criticalMax !== undefined && value > threshold.criticalMax) {
      return {
        severity: 'critical',
        message: `${vitalType} very high: ${value} ${threshold.unit} (critical threshold: ${threshold.criticalMax})`,
        threshold
      }
    }
    
    // Check warning thresholds
    if (threshold.warningMin !== undefined && value < threshold.warningMin) {
      return {
        severity: 'warning',
        message: `${vitalType} below normal: ${value} ${threshold.unit} (warning threshold: ${threshold.warningMin})`,
        threshold
      }
    }
    if (threshold.warningMax !== undefined && value > threshold.warningMax) {
      return {
        severity: 'warning',
        message: `${vitalType} above normal: ${value} ${threshold.unit} (warning threshold: ${threshold.warningMax})`,
        threshold
      }
    }
    
    // Within normal range
    return { severity: null, message: null, threshold }
  }
  
  /**
   * Create a new alert
   */
  createAlert(params: {
    patientId: string
    category: AlertCategory
    severity: AlertSeverity
    title: string
    message: string
    data?: Record<string, any>
    expiresInMinutes?: number
  }): Alert {
    const now = new Date().toISOString()
    const alert: Alert = {
      id: generateSecureId(12),
      patientId: params.patientId,
      category: params.category,
      severity: params.severity,
      status: 'active',
      title: params.title,
      message: params.message,
      data: params.data,
      createdAt: now,
      escalationLevel: 1,
      notificationsSent: { inApp: true }
    }
    
    if (params.expiresInMinutes) {
      alert.expiresAt = new Date(Date.now() + params.expiresInMinutes * 60000).toISOString()
    }
    
    // Store alert
    this.alerts.set(alert.id, alert)
    
    // Index by patient
    if (!this.patientAlerts.has(params.patientId)) {
      this.patientAlerts.set(params.patientId, new Set())
    }
    this.patientAlerts.get(params.patientId)!.add(alert.id)
    
    // Log alert (in production, also trigger notifications)
    console.log('ALERT_CREATED:', JSON.stringify({
      alertId: alert.id,
      patientId: params.patientId,
      severity: params.severity,
      category: params.category,
      title: params.title,
      timestamp: now
    }))
    
    return alert
  }
  
  /**
   * Process vitals and generate alerts
   */
  processVitals(patientId: string, vitals: Record<string, number>): Alert[] {
    const generatedAlerts: Alert[] = []
    
    for (const [vitalType, value] of Object.entries(vitals)) {
      const evaluation = this.evaluateVital(patientId, vitalType, value)
      
      if (evaluation.severity) {
        const alert = this.createAlert({
          patientId,
          category: evaluation.severity === 'emergency' || evaluation.severity === 'critical' 
            ? 'vital_critical' 
            : 'vital_abnormal',
          severity: evaluation.severity,
          title: `${this.formatVitalName(vitalType)} Alert`,
          message: evaluation.message!,
          data: {
            vitalType,
            value,
            unit: evaluation.threshold?.unit,
            threshold: evaluation.threshold
          }
        })
        generatedAlerts.push(alert)
      }
    }
    
    return generatedAlerts
  }
  
  /**
   * Get active alerts for a patient
   */
  getPatientAlerts(patientId: string, options?: {
    status?: AlertStatus
    severity?: AlertSeverity
    category?: AlertCategory
    limit?: number
  }): Alert[] {
    const alertIds = this.patientAlerts.get(patientId) || new Set()
    let alerts = Array.from(alertIds)
      .map(id => this.alerts.get(id))
      .filter((a): a is Alert => a !== undefined)
    
    // Filter by status
    if (options?.status) {
      alerts = alerts.filter(a => a.status === options.status)
    }
    
    // Filter by severity
    if (options?.severity) {
      alerts = alerts.filter(a => a.severity === options.severity)
    }
    
    // Filter by category
    if (options?.category) {
      alerts = alerts.filter(a => a.category === options.category)
    }
    
    // Sort by severity and time
    const severityOrder: Record<AlertSeverity, number> = {
      emergency: 5,
      critical: 4,
      urgent: 3,
      warning: 2,
      info: 1
    }
    
    alerts.sort((a, b) => {
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity]
      if (severityDiff !== 0) return severityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    // Apply limit
    if (options?.limit) {
      alerts = alerts.slice(0, options.limit)
    }
    
    return alerts
  }
  
  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string, userId: string): Alert | null {
    const alert = this.alerts.get(alertId)
    if (!alert) return null
    
    alert.status = 'acknowledged'
    alert.acknowledgedAt = new Date().toISOString()
    alert.acknowledgedBy = userId
    
    console.log('ALERT_ACKNOWLEDGED:', JSON.stringify({
      alertId,
      acknowledgedBy: userId,
      timestamp: alert.acknowledgedAt
    }))
    
    return alert
  }
  
  /**
   * Resolve an alert
   */
  resolveAlert(alertId: string, userId: string, resolution?: string): Alert | null {
    const alert = this.alerts.get(alertId)
    if (!alert) return null
    
    alert.status = 'resolved'
    alert.resolvedAt = new Date().toISOString()
    alert.resolvedBy = userId
    if (resolution) {
      alert.data = { ...alert.data, resolution }
    }
    
    console.log('ALERT_RESOLVED:', JSON.stringify({
      alertId,
      resolvedBy: userId,
      timestamp: alert.resolvedAt
    }))
    
    return alert
  }
  
  /**
   * Snooze an alert
   */
  snoozeAlert(alertId: string, minutes: number): Alert | null {
    const alert = this.alerts.get(alertId)
    if (!alert) return null
    
    alert.status = 'snoozed'
    alert.snoozeUntil = new Date(Date.now() + minutes * 60000).toISOString()
    
    return alert
  }
  
  /**
   * Escalate an alert to next level
   */
  escalateAlert(alertId: string): Alert | null {
    const alert = this.alerts.get(alertId)
    if (!alert) return null
    
    const currentLevel = alert.escalationLevel || 1
    const nextLevel = currentLevel + 1
    
    if (nextLevel > this.escalationRules.length) {
      // Already at maximum escalation
      return alert
    }
    
    alert.status = 'escalated'
    alert.escalationLevel = nextLevel
    alert.escalatedAt = new Date().toISOString()
    
    const rule = this.escalationRules[nextLevel - 1]
    
    console.log('ALERT_ESCALATED:', JSON.stringify({
      alertId,
      newLevel: nextLevel,
      notifyRoles: rule.notifyRoles,
      channels: rule.notificationChannels,
      timestamp: alert.escalatedAt
    }))
    
    return alert
  }
  
  /**
   * Get alert statistics for a patient
   */
  getAlertStats(patientId: string): {
    total: number
    active: number
    acknowledged: number
    resolved: number
    bySeverity: Record<AlertSeverity, number>
    byCategory: Record<AlertCategory, number>
  } {
    const alerts = this.getPatientAlerts(patientId)
    
    const stats = {
      total: alerts.length,
      active: alerts.filter(a => a.status === 'active').length,
      acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
      resolved: alerts.filter(a => a.status === 'resolved').length,
      bySeverity: {} as Record<AlertSeverity, number>,
      byCategory: {} as Record<AlertCategory, number>
    }
    
    alerts.forEach(a => {
      stats.bySeverity[a.severity] = (stats.bySeverity[a.severity] || 0) + 1
      stats.byCategory[a.category] = (stats.byCategory[a.category] || 0) + 1
    })
    
    return stats
  }
  
  /**
   * Format vital name for display
   */
  private formatVitalName(vitalType: string): string {
    const names: Record<string, string> = {
      heartRate: 'Heart Rate',
      bloodPressureSystolic: 'Blood Pressure (Systolic)',
      bloodPressureDiastolic: 'Blood Pressure (Diastolic)',
      oxygenSaturation: 'Oxygen Saturation',
      temperature: 'Temperature',
      bloodGlucose: 'Blood Glucose',
      respiratoryRate: 'Respiratory Rate',
      weight: 'Weight'
    }
    return names[vitalType] || vitalType
  }
  
  /**
   * Analyze vital trends and detect patterns
   */
  analyzeVitalTrends(
    patientId: string,
    vitalType: string,
    readings: { value: number; timestamp: string }[]
  ): {
    trend: 'stable' | 'increasing' | 'decreasing' | 'erratic'
    average: number
    min: number
    max: number
    percentChange: number | null
    alerts: Alert[]
  } {
    if (readings.length < 2) {
      return {
        trend: 'stable',
        average: readings[0]?.value || 0,
        min: readings[0]?.value || 0,
        max: readings[0]?.value || 0,
        percentChange: null,
        alerts: []
      }
    }
    
    const values = readings.map(r => r.value).sort((a, b) => a - b)
    const average = values.reduce((a, b) => a + b, 0) / values.length
    const min = values[0]
    const max = values[values.length - 1]
    
    // Calculate trend using linear regression slope
    const n = readings.length
    const sortedByTime = [...readings].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0
    sortedByTime.forEach((r, i) => {
      sumX += i
      sumY += r.value
      sumXY += i * r.value
      sumXX += i * i
    })
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const slopePercent = (slope / average) * 100
    
    // Determine trend
    let trend: 'stable' | 'increasing' | 'decreasing' | 'erratic'
    if (Math.abs(slopePercent) < 2) {
      trend = 'stable'
    } else if (slopePercent > 5) {
      trend = 'increasing'
    } else if (slopePercent < -5) {
      trend = 'decreasing'
    } else {
      // Check for erratic pattern (high variance)
      const variance = values.reduce((sum, v) => sum + Math.pow(v - average, 2), 0) / values.length
      const stdDev = Math.sqrt(variance)
      const coeffOfVariation = (stdDev / average) * 100
      
      trend = coeffOfVariation > 15 ? 'erratic' : 
              slopePercent > 0 ? 'increasing' : 'decreasing'
    }
    
    // Calculate percent change from first to last
    const percentChange = ((sortedByTime[n-1].value - sortedByTime[0].value) / sortedByTime[0].value) * 100
    
    // Generate alerts for concerning trends
    const alerts: Alert[] = []
    
    if (trend === 'erratic') {
      alerts.push(this.createAlert({
        patientId,
        category: 'vital_trending',
        severity: 'warning',
        title: `Erratic ${this.formatVitalName(vitalType)} Pattern`,
        message: `${this.formatVitalName(vitalType)} showing inconsistent readings. Average: ${average.toFixed(1)}, Range: ${min}-${max}`,
        data: { vitalType, trend, average, min, max }
      }))
    } else if (Math.abs(percentChange) > 20) {
      alerts.push(this.createAlert({
        patientId,
        category: 'vital_trending',
        severity: percentChange > 30 || percentChange < -30 ? 'urgent' : 'warning',
        title: `${this.formatVitalName(vitalType)} ${trend === 'increasing' ? 'Increasing' : 'Decreasing'} Trend`,
        message: `${this.formatVitalName(vitalType)} has ${trend === 'increasing' ? 'increased' : 'decreased'} by ${Math.abs(percentChange).toFixed(1)}%`,
        data: { vitalType, trend, percentChange, average }
      }))
    }
    
    return {
      trend,
      average,
      min,
      max,
      percentChange,
      alerts
    }
  }
}

// Singleton instance
export const alertEngine = new AlertEngine()
