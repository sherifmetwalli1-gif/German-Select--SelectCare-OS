/**
 * SelectCareOS™ Notification & Reminder API Routes
 * Push notifications, email, SMS, medication reminders
 */

import { Hono } from 'hono';
import { 
  NotificationService, 
  SAMPLE_MEDICATIONS, 
  SAMPLE_APPOINTMENTS,
  organizeMedicationsByTime,
  type Notification,
  type Medication,
  type MedicationLog,
  type Appointment,
  type NotificationPreferences
} from '../services/notifications';

const notificationsRouter = new Hono();

// ============================================================================
// IN-MEMORY STORAGE (Replace with D1 in production)
// ============================================================================

const notifications: Map<string, Notification[]> = new Map();
const medications: Map<string, Medication[]> = new Map();
const medicationLogs: Map<string, MedicationLog[]> = new Map();
const appointments: Map<string, Appointment[]> = new Map();
const preferences: Map<string, NotificationPreferences> = new Map();

// Initialize with sample data
medications.set('user_001', SAMPLE_MEDICATIONS);
appointments.set('user_001', SAMPLE_APPOINTMENTS);

// ============================================================================
// NOTIFICATION ENDPOINTS
// ============================================================================

/**
 * GET /api/notifications
 * Get all notifications for user
 */
notificationsRouter.get('/', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  const status = c.req.query('status');
  const type = c.req.query('type');
  
  let userNotifications = notifications.get(userId) || [];
  
  if (status) {
    userNotifications = userNotifications.filter(n => n.status === status);
  }
  if (type) {
    userNotifications = userNotifications.filter(n => n.type === type);
  }
  
  // Sort by created date descending
  userNotifications.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const unreadCount = userNotifications.filter(n => n.status !== 'read').length;
  
  return c.json({
    success: true,
    data: {
      notifications: userNotifications,
      unreadCount,
      total: userNotifications.length
    }
  });
});

/**
 * POST /api/notifications
 * Create a new notification
 */
notificationsRouter.post('/', async (c) => {
  const body = await c.req.json();
  const { userId, type, channel, title, message, data, priority, scheduledFor } = body;
  
  if (!userId || !type || !title || !message) {
    return c.json({ success: false, error: 'Missing required fields' }, 400);
  }
  
  const notification = NotificationService.createNotification({
    userId,
    type,
    channel: channel || 'push',
    title,
    message,
    data,
    priority,
    scheduledFor
  });
  
  const userNotifications = notifications.get(userId) || [];
  userNotifications.push(notification);
  notifications.set(userId, userNotifications);
  
  return c.json({
    success: true,
    data: notification
  });
});

/**
 * PUT /api/notifications/:id/read
 * Mark notification as read
 */
notificationsRouter.put('/:id/read', (c) => {
  const notificationId = c.req.param('id');
  const userId = c.req.query('userId') || 'user_001';
  
  const userNotifications = notifications.get(userId) || [];
  const notification = userNotifications.find(n => n.id === notificationId);
  
  if (!notification) {
    return c.json({ success: false, error: 'Notification not found' }, 404);
  }
  
  notification.status = 'read';
  notification.readAt = new Date().toISOString();
  
  return c.json({ success: true, data: notification });
});

/**
 * PUT /api/notifications/read-all
 * Mark all notifications as read
 */
notificationsRouter.put('/read-all', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  
  const userNotifications = notifications.get(userId) || [];
  userNotifications.forEach(n => {
    if (n.status !== 'read') {
      n.status = 'read';
      n.readAt = new Date().toISOString();
    }
  });
  
  return c.json({ success: true, message: 'All notifications marked as read' });
});

// ============================================================================
// MEDICATION ENDPOINTS
// ============================================================================

/**
 * GET /api/notifications/medications
 * Get user's medications
 */
notificationsRouter.get('/medications', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  const activeOnly = c.req.query('active') !== 'false';
  
  let userMedications = medications.get(userId) || SAMPLE_MEDICATIONS;
  
  if (activeOnly) {
    userMedications = userMedications.filter(m => m.isActive);
  }
  
  const schedule = organizeMedicationsByTime(userMedications);
  
  return c.json({
    success: true,
    data: {
      medications: userMedications,
      schedule,
      totalActive: userMedications.filter(m => m.isActive).length
    }
  });
});

/**
 * POST /api/notifications/medications
 * Add a new medication
 */
notificationsRouter.post('/medications', async (c) => {
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const medication: Medication = {
    id: `med_${Date.now()}`,
    userId,
    name: body.name,
    genericName: body.genericName,
    dosage: body.dosage,
    unit: body.unit || 'mg',
    frequency: body.frequency || 'once_daily',
    times: body.times || ['08:00'],
    instructions: body.instructions || '',
    startDate: body.startDate || new Date().toISOString().split('T')[0],
    endDate: body.endDate,
    prescribedBy: body.prescribedBy || 'Unknown',
    pharmacy: body.pharmacy,
    refillDate: body.refillDate,
    pillsRemaining: body.pillsRemaining,
    pillsPerRefill: body.pillsPerRefill,
    sideEffects: body.sideEffects,
    interactions: body.interactions,
    category: body.category || 'other',
    color: body.color || '#6B7280',
    shape: body.shape,
    imageUrl: body.imageUrl,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  const userMedications = medications.get(userId) || [];
  userMedications.push(medication);
  medications.set(userId, userMedications);
  
  return c.json({
    success: true,
    data: medication
  });
});

/**
 * PUT /api/notifications/medications/:id
 * Update a medication
 */
notificationsRouter.put('/medications/:id', async (c) => {
  const medicationId = c.req.param('id');
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const userMedications = medications.get(userId) || [];
  const medIndex = userMedications.findIndex(m => m.id === medicationId);
  
  if (medIndex === -1) {
    return c.json({ success: false, error: 'Medication not found' }, 404);
  }
  
  userMedications[medIndex] = {
    ...userMedications[medIndex],
    ...body,
    id: medicationId // Preserve ID
  };
  
  medications.set(userId, userMedications);
  
  return c.json({
    success: true,
    data: userMedications[medIndex]
  });
});

/**
 * DELETE /api/notifications/medications/:id
 * Deactivate a medication
 */
notificationsRouter.delete('/medications/:id', (c) => {
  const medicationId = c.req.param('id');
  const userId = c.req.query('userId') || 'user_001';
  
  const userMedications = medications.get(userId) || [];
  const medication = userMedications.find(m => m.id === medicationId);
  
  if (!medication) {
    return c.json({ success: false, error: 'Medication not found' }, 404);
  }
  
  medication.isActive = false;
  
  return c.json({
    success: true,
    message: 'Medication deactivated'
  });
});

/**
 * POST /api/notifications/medications/:id/log
 * Log medication taken/skipped
 */
notificationsRouter.post('/medications/:id/log', async (c) => {
  const medicationId = c.req.param('id');
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const log: MedicationLog = {
    id: `log_${Date.now()}`,
    medicationId,
    userId,
    scheduledTime: body.scheduledTime || new Date().toISOString(),
    takenAt: body.status === 'taken' ? new Date().toISOString() : undefined,
    status: body.status || 'taken',
    notes: body.notes,
    sideEffectsReported: body.sideEffects
  };
  
  const userLogs = medicationLogs.get(userId) || [];
  userLogs.push(log);
  medicationLogs.set(userId, userLogs);
  
  // Update pills remaining
  const userMedications = medications.get(userId) || [];
  const medication = userMedications.find(m => m.id === medicationId);
  if (medication && medication.pillsRemaining !== undefined && body.status === 'taken') {
    medication.pillsRemaining = Math.max(0, medication.pillsRemaining - 1);
  }
  
  return c.json({
    success: true,
    data: log
  });
});

/**
 * GET /api/notifications/medications/logs
 * Get medication logs
 */
notificationsRouter.get('/medications/logs', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  const medicationId = c.req.query('medicationId');
  const date = c.req.query('date');
  
  let userLogs = medicationLogs.get(userId) || [];
  
  if (medicationId) {
    userLogs = userLogs.filter(l => l.medicationId === medicationId);
  }
  
  if (date) {
    userLogs = userLogs.filter(l => l.scheduledTime.startsWith(date));
  }
  
  // Sort by time descending
  userLogs.sort((a, b) => 
    new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime()
  );
  
  return c.json({
    success: true,
    data: {
      logs: userLogs,
      total: userLogs.length,
      adherenceRate: calculateAdherenceRate(userLogs)
    }
  });
});

// ============================================================================
// APPOINTMENT ENDPOINTS
// ============================================================================

/**
 * GET /api/notifications/appointments
 * Get user's appointments
 */
notificationsRouter.get('/appointments', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  const upcoming = c.req.query('upcoming') === 'true';
  
  let userAppointments = appointments.get(userId) || SAMPLE_APPOINTMENTS;
  
  if (upcoming) {
    const now = new Date();
    userAppointments = userAppointments.filter(a => 
      new Date(a.startTime) > now && a.status !== 'cancelled'
    );
  }
  
  // Sort by start time
  userAppointments.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
  
  return c.json({
    success: true,
    data: {
      appointments: userAppointments,
      total: userAppointments.length
    }
  });
});

/**
 * POST /api/notifications/appointments
 * Create a new appointment
 */
notificationsRouter.post('/appointments', async (c) => {
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const appointment: Appointment = {
    id: `apt_${Date.now()}`,
    userId,
    type: body.type || 'consultation',
    title: body.title,
    description: body.description,
    doctorId: body.doctorId,
    doctorName: body.doctorName,
    location: body.location,
    isVirtual: body.isVirtual || false,
    videoCallUrl: body.isVirtual ? `/video-call/apt_${Date.now()}` : undefined,
    startTime: body.startTime,
    endTime: body.endTime,
    status: 'scheduled',
    reminders: body.reminders || { '24h': true, '2h': true, '30m': body.isVirtual },
    notes: body.notes,
    documents: body.documents,
    createdAt: new Date().toISOString()
  };
  
  const userAppointments = appointments.get(userId) || [];
  userAppointments.push(appointment);
  appointments.set(userId, userAppointments);
  
  // Schedule reminders
  const reminders = NotificationService.scheduleAppointmentReminders(appointment, userId);
  const userNotifications = notifications.get(userId) || [];
  userNotifications.push(...reminders);
  notifications.set(userId, userNotifications);
  
  return c.json({
    success: true,
    data: appointment,
    remindersScheduled: reminders.length
  });
});

/**
 * PUT /api/notifications/appointments/:id
 * Update appointment
 */
notificationsRouter.put('/appointments/:id', async (c) => {
  const appointmentId = c.req.param('id');
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const userAppointments = appointments.get(userId) || [];
  const aptIndex = userAppointments.findIndex(a => a.id === appointmentId);
  
  if (aptIndex === -1) {
    return c.json({ success: false, error: 'Appointment not found' }, 404);
  }
  
  userAppointments[aptIndex] = {
    ...userAppointments[aptIndex],
    ...body,
    id: appointmentId
  };
  
  appointments.set(userId, userAppointments);
  
  return c.json({
    success: true,
    data: userAppointments[aptIndex]
  });
});

/**
 * DELETE /api/notifications/appointments/:id
 * Cancel appointment
 */
notificationsRouter.delete('/appointments/:id', (c) => {
  const appointmentId = c.req.param('id');
  const userId = c.req.query('userId') || 'user_001';
  
  const userAppointments = appointments.get(userId) || [];
  const appointment = userAppointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return c.json({ success: false, error: 'Appointment not found' }, 404);
  }
  
  appointment.status = 'cancelled';
  
  return c.json({
    success: true,
    message: 'Appointment cancelled'
  });
});

// ============================================================================
// VIDEO CALL ENDPOINTS
// ============================================================================

/**
 * GET /api/notifications/video-call/:appointmentId
 * Get video call details for appointment
 */
notificationsRouter.get('/video-call/:appointmentId', (c) => {
  const appointmentId = c.req.param('appointmentId');
  const userId = c.req.query('userId') || 'user_001';
  
  const userAppointments = appointments.get(userId) || [];
  const appointment = userAppointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return c.json({ success: false, error: 'Appointment not found' }, 404);
  }
  
  if (!appointment.isVirtual) {
    return c.json({ success: false, error: 'This is not a virtual appointment' }, 400);
  }
  
  // Generate video call token (in production, integrate with actual video service)
  const callToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return c.json({
    success: true,
    data: {
      appointmentId,
      title: appointment.title,
      doctorName: appointment.doctorName,
      startTime: appointment.startTime,
      videoCallUrl: appointment.videoCallUrl,
      callToken,
      features: {
        video: true,
        audio: true,
        screenShare: true,
        recording: false, // Requires consent
        chat: true
      }
    }
  });
});

/**
 * POST /api/notifications/video-call/:appointmentId/start
 * Start video call
 */
notificationsRouter.post('/video-call/:appointmentId/start', async (c) => {
  const appointmentId = c.req.param('appointmentId');
  const userId = c.req.query('userId') || 'user_001';
  
  const userAppointments = appointments.get(userId) || [];
  const appointment = userAppointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return c.json({ success: false, error: 'Appointment not found' }, 404);
  }
  
  appointment.status = 'in_progress';
  
  return c.json({
    success: true,
    data: {
      status: 'started',
      roomId: `room_${appointmentId}`,
      joinUrl: `/video-call/${appointmentId}?token=live`,
      startedAt: new Date().toISOString()
    }
  });
});

// ============================================================================
// PREFERENCES ENDPOINTS
// ============================================================================

/**
 * GET /api/notifications/preferences
 * Get notification preferences
 */
notificationsRouter.get('/preferences', (c) => {
  const userId = c.req.query('userId') || 'user_001';
  
  const userPreferences = preferences.get(userId) || {
    userId,
    push: {
      enabled: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00',
      categories: {
        appointment_reminder: true,
        medication_reminder: true,
        video_call: true,
        lab_results: true,
        surgery_prep: true,
        recovery_milestone: true,
        refill_reminder: true,
        follow_up: true,
        document_request: true,
        payment_due: true,
        travel_reminder: true,
        emergency_alert: true,
        wellness_checkin: true,
        general: true
      }
    },
    email: {
      enabled: true,
      address: 'patient@example.com',
      categories: {
        appointment_reminder: true,
        medication_reminder: false,
        video_call: true,
        lab_results: true,
        surgery_prep: true,
        recovery_milestone: true,
        refill_reminder: true,
        follow_up: true,
        document_request: true,
        payment_due: true,
        travel_reminder: true,
        emergency_alert: true,
        wellness_checkin: false,
        general: true
      }
    },
    sms: {
      enabled: true,
      phone: '+1234567890',
      categories: {
        appointment_reminder: true,
        medication_reminder: true,
        video_call: true,
        lab_results: false,
        surgery_prep: true,
        recovery_milestone: false,
        refill_reminder: true,
        follow_up: true,
        document_request: false,
        payment_due: true,
        travel_reminder: true,
        emergency_alert: true,
        wellness_checkin: false,
        general: false
      }
    },
    timezone: 'Europe/Berlin',
    language: 'en'
  };
  
  return c.json({
    success: true,
    data: userPreferences
  });
});

/**
 * PUT /api/notifications/preferences
 * Update notification preferences
 */
notificationsRouter.put('/preferences', async (c) => {
  const body = await c.req.json();
  const userId = body.userId || 'user_001';
  
  const currentPrefs = preferences.get(userId) || {};
  const updatedPrefs = {
    ...currentPrefs,
    ...body,
    userId
  };
  
  preferences.set(userId, updatedPrefs as NotificationPreferences);
  
  return c.json({
    success: true,
    data: updatedPrefs
  });
});

// ============================================================================
// SURGERY PREP TIMELINE
// ============================================================================

/**
 * GET /api/notifications/surgery-prep
 * Get surgery preparation timeline
 */
notificationsRouter.get('/surgery-prep', (c) => {
  const surgeryType = c.req.query('type') || 'gastric_sleeve';
  const surgeryDate = c.req.query('date') || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const timeline = NotificationService.getSurgeryPrepTimeline(surgeryDate, surgeryType);
  
  // Calculate current day relative to surgery
  const today = new Date();
  const surgery = new Date(surgeryDate);
  const daysUntilSurgery = Math.ceil((surgery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Find current phase
  let currentPhase = timeline[timeline.length - 1];
  for (const phase of timeline) {
    if (daysUntilSurgery >= Math.abs(phase.day)) {
      currentPhase = phase;
      break;
    }
  }
  
  return c.json({
    success: true,
    data: {
      surgeryDate,
      surgeryType,
      daysUntilSurgery,
      timeline,
      currentPhase,
      isPreOpPhase: daysUntilSurgery > 0
    }
  });
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateAdherenceRate(logs: MedicationLog[]): number {
  if (logs.length === 0) return 100;
  
  const takenCount = logs.filter(l => l.status === 'taken').length;
  return Math.round((takenCount / logs.length) * 100);
}

export { notificationsRouter };
