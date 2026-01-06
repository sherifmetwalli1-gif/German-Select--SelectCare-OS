/**
 * SelectCareOS™ Notification & Reminder Service
 * Comprehensive push, email, SMS notification system
 */

// ============================================================================
// NOTIFICATION TYPES & INTERFACES
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  data?: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  scheduledFor?: string;
  sentAt?: string;
  readAt?: string;
  createdAt: string;
}

export type NotificationType = 
  | 'appointment_reminder'
  | 'medication_reminder'
  | 'video_call'
  | 'lab_results'
  | 'surgery_prep'
  | 'recovery_milestone'
  | 'refill_reminder'
  | 'follow_up'
  | 'document_request'
  | 'payment_due'
  | 'travel_reminder'
  | 'emergency_alert'
  | 'wellness_checkin'
  | 'general';

export type NotificationChannel = 'push' | 'email' | 'sms' | 'in_app';

export interface NotificationPreferences {
  userId: string;
  push: {
    enabled: boolean;
    quietHoursStart?: string; // HH:MM format
    quietHoursEnd?: string;
    categories: Record<NotificationType, boolean>;
  };
  email: {
    enabled: boolean;
    address: string;
    categories: Record<NotificationType, boolean>;
  };
  sms: {
    enabled: boolean;
    phone: string;
    categories: Record<NotificationType, boolean>;
  };
  timezone: string;
  language: string;
}

// ============================================================================
// MEDICATION REMINDER INTERFACES
// ============================================================================

export interface Medication {
  id: string;
  userId: string;
  name: string;
  genericName?: string;
  dosage: string;
  unit: string;
  frequency: MedicationFrequency;
  times: string[]; // Array of HH:MM times
  instructions: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  pharmacy?: string;
  refillDate?: string;
  pillsRemaining?: number;
  pillsPerRefill?: number;
  sideEffects?: string[];
  interactions?: string[];
  category: MedicationCategory;
  color?: string;
  shape?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export type MedicationFrequency = 
  | 'once_daily'
  | 'twice_daily'
  | 'three_times_daily'
  | 'four_times_daily'
  | 'every_other_day'
  | 'weekly'
  | 'as_needed'
  | 'before_meals'
  | 'after_meals'
  | 'with_food'
  | 'on_empty_stomach';

export type MedicationCategory =
  | 'pain_management'
  | 'antibiotic'
  | 'blood_thinner'
  | 'blood_pressure'
  | 'diabetes'
  | 'vitamin'
  | 'supplement'
  | 'pre_surgery'
  | 'post_surgery'
  | 'anti_inflammatory'
  | 'other';

export interface MedicationLog {
  id: string;
  medicationId: string;
  userId: string;
  scheduledTime: string;
  takenAt?: string;
  status: 'pending' | 'taken' | 'skipped' | 'missed';
  notes?: string;
  sideEffectsReported?: string[];
}

export interface MedicationSchedule {
  morning: Medication[];   // 6:00 - 11:59
  afternoon: Medication[]; // 12:00 - 17:59
  evening: Medication[];   // 18:00 - 20:59
  bedtime: Medication[];   // 21:00 - 5:59
  asNeeded: Medication[];
}

// ============================================================================
// APPOINTMENT & SCHEDULER INTERFACES
// ============================================================================

export interface Appointment {
  id: string;
  userId: string;
  type: AppointmentType;
  title: string;
  description?: string;
  doctorId?: string;
  doctorName?: string;
  location?: string;
  isVirtual: boolean;
  videoCallUrl?: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reminders: {
    '24h': boolean;
    '2h': boolean;
    '30m': boolean;
  };
  notes?: string;
  documents?: string[];
  createdAt: string;
}

export type AppointmentType =
  | 'consultation'
  | 'video_call'
  | 'surgery'
  | 'follow_up'
  | 'lab_test'
  | 'imaging'
  | 'physio'
  | 'nutrition'
  | 'pre_op'
  | 'post_op';

export interface RecoveryMilestone {
  id: string;
  userId: string;
  surgeryId: string;
  day: number;
  title: string;
  description: string;
  tasks: {
    id: string;
    task: string;
    completed: boolean;
    completedAt?: string;
  }[];
  tips: string[];
  warnings: string[];
  expectedSymptoms: string[];
  status: 'upcoming' | 'current' | 'completed';
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

export const EMAIL_TEMPLATES = {
  appointment_reminder: {
    subject: '📅 Appointment Reminder - {{appointmentType}} Tomorrow',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0; font-size: 28px;">SelectCareOS™</h1>
          <p style="color: #ffffff; margin: 10px 0 0;">Your Health Journey Partner</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #1a1a2e; margin-bottom: 20px;">Appointment Reminder</h2>
          
          <div style="background: linear-gradient(135deg, #f8f6f0 0%, #fff 100%); border-left: 4px solid #C9A227; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0 0 10px; color: #666;"><strong style="color: #1a1a2e;">{{appointmentType}}</strong></p>
            <p style="margin: 0 0 5px; font-size: 18px; color: #1a1a2e;"><strong>📅 {{date}}</strong></p>
            <p style="margin: 0 0 5px; font-size: 18px; color: #1a1a2e;"><strong>🕐 {{time}}</strong></p>
            <p style="margin: 0; color: #666;">📍 {{location}}</p>
          </div>
          
          <p style="color: #444; line-height: 1.6;">Dear {{patientName}},</p>
          <p style="color: #444; line-height: 1.6;">This is a friendly reminder about your upcoming appointment with <strong>{{doctorName}}</strong>.</p>
          
          {{#if isVirtual}}
          <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32;"><strong>🎥 Virtual Appointment</strong></p>
            <p style="margin: 10px 0 0;">
              <a href="{{videoCallUrl}}" style="background: #C9A227; color: #1a1a2e; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                Join Video Call
              </a>
            </p>
          </div>
          {{/if}}
          
          <h3 style="color: #1a1a2e; margin-top: 30px;">Preparation Checklist:</h3>
          <ul style="color: #444; line-height: 1.8;">
            {{#each preparations}}
            <li>{{this}}</li>
            {{/each}}
          </ul>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <a href="{{dashboardUrl}}" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #C9A227; padding: 14px 28px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              View in Dashboard
            </a>
          </div>
        </div>
        
        <div style="background: #f8f6f0; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #888; font-size: 12px;">
            German Select Medical Tourism | SelectCareOS™<br>
            <a href="{{unsubscribeUrl}}" style="color: #C9A227;">Manage Notifications</a>
          </p>
        </div>
      </div>
    `
  },
  
  medication_reminder: {
    subject: '💊 Time for Your Medication - {{medicationName}}',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0;">💊 Medication Reminder</h1>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: linear-gradient(135deg, #fff5e6 0%, #fff 100%); border: 2px solid #C9A227; padding: 25px; border-radius: 12px; text-align: center;">
            <h2 style="color: #1a1a2e; margin: 0 0 10px;">{{medicationName}}</h2>
            <p style="font-size: 24px; color: #C9A227; margin: 0; font-weight: bold;">{{dosage}}</p>
            <p style="color: #666; margin: 10px 0 0;">{{instructions}}</p>
          </div>
          
          <div style="margin-top: 25px; text-align: center;">
            <a href="{{confirmUrl}}" style="background: #10B981; color: white; padding: 14px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; margin: 5px;">
              ✓ Mark as Taken
            </a>
            <a href="{{snoozeUrl}}" style="background: #F59E0B; color: white; padding: 14px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; margin: 5px;">
              ⏰ Snooze 30min
            </a>
          </div>
          
          {{#if warnings}}
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Important:</strong> {{warnings}}</p>
          </div>
          {{/if}}
        </div>
      </div>
    `
  },
  
  surgery_prep: {
    subject: '🏥 Surgery Preparation - {{daysUntil}} Days Until Your Procedure',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0;">Surgery Preparation</h1>
          <p style="color: #ffffff; font-size: 20px; margin: 10px 0 0;">{{daysUntil}} Days Until Your Procedure</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #1a1a2e; margin: 0 0 15px;">📋 Today's Checklist</h3>
            {{#each tasks}}
            <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
              <span style="width: 24px; height: 24px; background: {{#if completed}}#10B981{{else}}#e0e0e0{{/if}}; border-radius: 50%; margin-right: 12px; display: inline-block;"></span>
              <span style="color: #444;">{{task}}</span>
            </div>
            {{/each}}
          </div>
          
          <h3 style="color: #1a1a2e;">🚫 Medications to STOP:</h3>
          <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <ul style="color: #991b1b; margin: 0; padding-left: 20px;">
              {{#each stopMedications}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
          </div>
          
          <h3 style="color: #1a1a2e;">✅ Continue Taking:</h3>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <ul style="color: #166534; margin: 0; padding-left: 20px;">
              {{#each continueMedications}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
          </div>
        </div>
      </div>
    `
  },

  video_call_starting: {
    subject: '🎥 Your Video Call is Starting Now',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0;">🎥 Video Call Starting</h1>
        </div>
        
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 18px; color: #1a1a2e; margin-bottom: 25px;">
            Your video consultation with <strong>{{doctorName}}</strong> is ready to begin.
          </p>
          
          <a href="{{videoCallUrl}}" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 18px 50px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 18px;">
            🎥 Join Video Call Now
          </a>
          
          <div style="margin-top: 30px; padding: 20px; background: #f8f6f0; border-radius: 12px;">
            <h4 style="color: #1a1a2e; margin: 0 0 10px;">Quick Tips:</h4>
            <ul style="text-align: left; color: #666; line-height: 1.8;">
              <li>Ensure good lighting and quiet environment</li>
              <li>Test your camera and microphone</li>
              <li>Have your medical documents ready</li>
              <li>Prepare questions you want to ask</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
};

// ============================================================================
// SMS TEMPLATES
// ============================================================================

export const SMS_TEMPLATES = {
  appointment_reminder_24h: 
    'SelectCareOS: Reminder - Your {{appointmentType}} with {{doctorName}} is tomorrow at {{time}}. Reply C to confirm.',
  
  appointment_reminder_2h:
    'SelectCareOS: Your appointment starts in 2 hours at {{time}}. {{#if isVirtual}}Join: {{videoCallUrl}}{{/if}}',
  
  medication_reminder:
    'SelectCareOS: Time for {{medicationName}} ({{dosage}}). {{instructions}}. Reply T when taken.',
  
  surgery_prep:
    'SelectCareOS: {{daysUntil}} days until surgery. Remember: {{reminder}}. Questions? Call {{supportNumber}}',
  
  video_call_starting:
    'SelectCareOS: Your video call with {{doctorName}} is starting. Join now: {{videoCallUrl}}',
  
  emergency_alert:
    'URGENT SelectCareOS Alert: {{message}}. If emergency, call {{emergencyNumber}} immediately.'
};

// ============================================================================
// NOTIFICATION SERVICE CLASS
// ============================================================================

export class NotificationService {
  
  // Generate unique notification ID
  static generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Create a new notification
  static createNotification(params: {
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    title: string;
    message: string;
    data?: Record<string, any>;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    scheduledFor?: string;
  }): Notification {
    return {
      id: this.generateId(),
      userId: params.userId,
      type: params.type,
      channel: params.channel,
      title: params.title,
      message: params.message,
      data: params.data,
      priority: params.priority || 'medium',
      status: params.scheduledFor ? 'pending' : 'pending',
      scheduledFor: params.scheduledFor,
      createdAt: new Date().toISOString()
    };
  }
  
  // Schedule medication reminders for a day
  static scheduleMedicationReminders(
    medications: Medication[],
    userId: string,
    date: string
  ): Notification[] {
    const notifications: Notification[] = [];
    
    medications.forEach(med => {
      if (!med.isActive) return;
      
      med.times.forEach(time => {
        const scheduledTime = `${date}T${time}:00`;
        
        notifications.push(this.createNotification({
          userId,
          type: 'medication_reminder',
          channel: 'push',
          title: `💊 Time for ${med.name}`,
          message: `Take ${med.dosage} ${med.unit}. ${med.instructions}`,
          data: {
            medicationId: med.id,
            dosage: med.dosage,
            instructions: med.instructions
          },
          priority: 'high',
          scheduledFor: scheduledTime
        }));
      });
    });
    
    return notifications;
  }
  
  // Schedule appointment reminders
  static scheduleAppointmentReminders(
    appointment: Appointment,
    userId: string
  ): Notification[] {
    const notifications: Notification[] = [];
    const appointmentTime = new Date(appointment.startTime);
    
    // 24 hours before
    if (appointment.reminders['24h']) {
      const reminder24h = new Date(appointmentTime);
      reminder24h.setHours(reminder24h.getHours() - 24);
      
      notifications.push(this.createNotification({
        userId,
        type: 'appointment_reminder',
        channel: 'email',
        title: `Appointment Tomorrow: ${appointment.title}`,
        message: `Your ${appointment.type} is scheduled for tomorrow at ${appointmentTime.toLocaleTimeString()}`,
        data: { appointmentId: appointment.id },
        priority: 'medium',
        scheduledFor: reminder24h.toISOString()
      }));
    }
    
    // 2 hours before
    if (appointment.reminders['2h']) {
      const reminder2h = new Date(appointmentTime);
      reminder2h.setHours(reminder2h.getHours() - 2);
      
      notifications.push(this.createNotification({
        userId,
        type: 'appointment_reminder',
        channel: 'push',
        title: `Appointment in 2 Hours`,
        message: `${appointment.title} with ${appointment.doctorName}`,
        data: { appointmentId: appointment.id, videoCallUrl: appointment.videoCallUrl },
        priority: 'high',
        scheduledFor: reminder2h.toISOString()
      }));
    }
    
    // 30 minutes before (for virtual appointments)
    if (appointment.reminders['30m'] && appointment.isVirtual) {
      const reminder30m = new Date(appointmentTime);
      reminder30m.setMinutes(reminder30m.getMinutes() - 30);
      
      notifications.push(this.createNotification({
        userId,
        type: 'video_call',
        channel: 'push',
        title: `Video Call in 30 Minutes`,
        message: `Prepare for your consultation with ${appointment.doctorName}`,
        data: { appointmentId: appointment.id, videoCallUrl: appointment.videoCallUrl },
        priority: 'high',
        scheduledFor: reminder30m.toISOString()
      }));
    }
    
    return notifications;
  }
  
  // Get surgery preparation timeline
  static getSurgeryPrepTimeline(surgeryDate: string, surgeryType: string): {
    day: number;
    title: string;
    tasks: string[];
    medications: { stop: string[]; continue: string[] };
  }[] {
    const timelines: Record<string, any[]> = {
      'gastric_sleeve': [
        {
          day: -14,
          title: '2 Weeks Before Surgery',
          tasks: [
            'Start pre-operative liquid diet',
            'Complete all required lab tests',
            'Attend nutrition consultation',
            'Begin liver shrinking diet'
          ],
          medications: {
            stop: ['Aspirin', 'Ibuprofen', 'Fish oil supplements', 'Vitamin E'],
            continue: ['Blood pressure medication', 'Thyroid medication']
          }
        },
        {
          day: -7,
          title: '1 Week Before Surgery',
          tasks: [
            'Continue liquid diet strictly',
            'Arrange transportation for surgery day',
            'Prepare post-surgery supplies',
            'Review post-op care instructions'
          ],
          medications: {
            stop: ['All herbal supplements', 'Diet pills'],
            continue: ['Prescribed medications as directed']
          }
        },
        {
          day: -2,
          title: '2 Days Before Surgery',
          tasks: [
            'Clear liquids only',
            'Pack hospital bag',
            'Shower with antibacterial soap',
            'Remove nail polish'
          ],
          medications: {
            stop: ['Metformin (diabetes medication)'],
            continue: ['Blood pressure medication with small sip of water']
          }
        },
        {
          day: -1,
          title: 'Day Before Surgery',
          tasks: [
            'Nothing to eat after midnight',
            'Clear liquids until 2 hours before surgery',
            'Final antibacterial shower',
            'Get good rest'
          ],
          medications: {
            stop: ['All oral medications after midnight except as directed'],
            continue: []
          }
        }
      ],
      'default': [
        {
          day: -7,
          title: '1 Week Before Surgery',
          tasks: [
            'Complete pre-operative testing',
            'Review medications with surgeon',
            'Arrange post-surgery help',
            'Stop smoking if applicable'
          ],
          medications: {
            stop: ['Blood thinners as directed', 'NSAIDs'],
            continue: ['Essential medications as directed']
          }
        },
        {
          day: -1,
          title: 'Day Before Surgery',
          tasks: [
            'Nothing to eat after midnight',
            'Shower with antibacterial soap',
            'Prepare comfortable recovery clothes',
            'Confirm arrival time'
          ],
          medications: {
            stop: ['All medications except as directed'],
            continue: []
          }
        }
      ]
    };
    
    return timelines[surgeryType] || timelines['default'];
  }
}

// ============================================================================
// MEDICATION SCHEDULE HELPERS
// ============================================================================

export function organizeMedicationsByTime(medications: Medication[]): MedicationSchedule {
  const schedule: MedicationSchedule = {
    morning: [],
    afternoon: [],
    evening: [],
    bedtime: [],
    asNeeded: []
  };
  
  medications.forEach(med => {
    if (!med.isActive) return;
    
    if (med.frequency === 'as_needed') {
      schedule.asNeeded.push(med);
      return;
    }
    
    med.times.forEach(time => {
      const hour = parseInt(time.split(':')[0]);
      
      if (hour >= 6 && hour < 12) {
        if (!schedule.morning.find(m => m.id === med.id)) {
          schedule.morning.push(med);
        }
      } else if (hour >= 12 && hour < 18) {
        if (!schedule.afternoon.find(m => m.id === med.id)) {
          schedule.afternoon.push(med);
        }
      } else if (hour >= 18 && hour < 21) {
        if (!schedule.evening.find(m => m.id === med.id)) {
          schedule.evening.push(med);
        }
      } else {
        if (!schedule.bedtime.find(m => m.id === med.id)) {
          schedule.bedtime.push(med);
        }
      }
    });
  });
  
  return schedule;
}

// ============================================================================
// SAMPLE DATA FOR DEMO
// ============================================================================

export const SAMPLE_MEDICATIONS: Medication[] = [
  {
    id: 'med_001',
    userId: 'user_001',
    name: 'Omeprazole',
    genericName: 'Proton Pump Inhibitor',
    dosage: '20',
    unit: 'mg',
    frequency: 'once_daily',
    times: ['07:00'],
    instructions: 'Take on empty stomach, 30 minutes before breakfast',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Mueller',
    category: 'post_surgery',
    color: '#8B5CF6',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'med_002',
    userId: 'user_001',
    name: 'Multivitamin',
    dosage: '1',
    unit: 'tablet',
    frequency: 'once_daily',
    times: ['08:00'],
    instructions: 'Take with food. Chewable form recommended.',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Mueller',
    category: 'vitamin',
    color: '#F59E0B',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'med_003',
    userId: 'user_001',
    name: 'Calcium Citrate',
    dosage: '500',
    unit: 'mg',
    frequency: 'twice_daily',
    times: ['08:00', '20:00'],
    instructions: 'Take separately from iron supplements (2 hours apart)',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Mueller',
    category: 'supplement',
    color: '#10B981',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'med_004',
    userId: 'user_001',
    name: 'Vitamin B12',
    dosage: '1000',
    unit: 'mcg',
    frequency: 'once_daily',
    times: ['12:00'],
    instructions: 'Sublingual tablet - dissolve under tongue',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Mueller',
    category: 'vitamin',
    color: '#EC4899',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'med_005',
    userId: 'user_001',
    name: 'Pain Reliever',
    genericName: 'Paracetamol',
    dosage: '500',
    unit: 'mg',
    frequency: 'as_needed',
    times: [],
    instructions: 'Take as needed for pain. Maximum 4 doses per day.',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Mueller',
    category: 'pain_management',
    color: '#EF4444',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_001',
    userId: 'user_001',
    type: 'video_call',
    title: 'Post-Surgery Follow-up',
    description: 'Weekly check-in to monitor recovery progress',
    doctorId: 'doc_001',
    doctorName: 'Dr. Hans Mueller',
    isVirtual: true,
    videoCallUrl: '/video-call/apt_001',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: 'scheduled',
    reminders: { '24h': true, '2h': true, '30m': true },
    createdAt: new Date().toISOString()
  },
  {
    id: 'apt_002',
    userId: 'user_001',
    type: 'lab_test',
    title: 'Blood Work - 1 Month Post-Op',
    description: 'Comprehensive metabolic panel and vitamin levels',
    location: 'German Select Lab Center, Hurghada',
    isVirtual: false,
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    reminders: { '24h': true, '2h': true, '30m': false },
    createdAt: new Date().toISOString()
  }
];

console.log('📧 SelectCareOS Notification Service loaded');
