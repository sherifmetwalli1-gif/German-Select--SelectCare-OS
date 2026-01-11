/**
 * Instant Connect Telemedicine System - Type Definitions
 * SelectCareOS™ - World-Class Instant Doctor Connection
 */

// ============================================================================
// DOCTOR TYPES
// ============================================================================

export type DoctorStatus = 'available' | 'busy' | 'offline' | 'in_call';

export interface InstantDoctor {
  id: string;
  externalDoctorId?: string;
  name: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
  
  // Medical Credentials
  specialty: string;
  subspecialties: string[];
  qualifications: string[];
  licenseNumber?: string;
  licenseCountry: string;
  
  // Languages & Location
  languages: string[];
  timezone: string;
  location: string;
  
  // Performance Metrics
  rating: number;
  totalReviews: number;
  totalConsultations: number;
  
  // Instant Connect Fields (CRITICAL)
  status: DoctorStatus;
  lastSeen: Date;
  lastHeartbeat: Date;
  currentConsultationId?: string;
  
  // Response metrics (used for smart matching)
  avgResponseTimeSeconds: number;
  acceptanceRate: number;
  totalAccepted: number;
  totalDeclined: number;
  totalMissed: number;
  
  // Availability Settings
  instantConnectEnabled: boolean;
  maxQueueSize: number;
  autoAcceptEnabled: boolean;
  consultationFeeCents: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// PATIENT TYPES
// ============================================================================

export type SubscriptionTier = 'free' | 'basic' | 'plus' | 'premium' | 'elite';

export interface InstantPatient {
  id: string;
  externalPatientId?: string;
  name: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  
  // Location & Language
  preferredLanguage: string;
  timezone: string;
  country: string;
  
  // Subscription & Billing
  subscriptionTier: SubscriptionTier;
  freeConsultationsRemaining: number;
  stripeCustomerId?: string;
  
  // Health Profile
  primaryConditions: string[];
  allergies: string[];
  medications: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// CONSULTATION REQUEST TYPES
// ============================================================================

export type ConsultationStatus = 
  | 'pending'      // Waiting for doctor match
  | 'matched'      // Doctor found, waiting for acceptance
  | 'accepted'     // Doctor accepted, preparing video room
  | 'in_progress'  // Video call active
  | 'completed'    // Consultation finished
  | 'cancelled'    // Patient cancelled
  | 'declined'     // Doctor declined
  | 'expired'      // Doctor didn't respond in time
  | 'no_show';     // Patient didn't join video call

export type UrgencyLevel = 'emergency' | 'urgent' | 'routine';
export type TriageLevel = 'critical' | 'urgent' | 'moderate' | 'low' | 'self_care';
export type VideoProvider = 'jitsi' | 'daily' | 'twilio' | 'agora';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'refunded' | 'failed';

export interface ConsultationRequest {
  id: string;
  
  // Participants
  patientId: string;
  doctorId?: string;
  
  // Status
  status: ConsultationStatus;
  
  // Matching Criteria
  preferredSpecialty?: string;
  preferredLanguage?: string;
  urgency: UrgencyLevel;
  
  // AI Triage Results
  symptoms: string[];
  symptomDescription?: string;
  triageLevel?: TriageLevel;
  aiTriageResult?: object;
  
  // Match Score
  matchScore: number;
  matchReason?: string;
  
  // Timing Metrics (CRITICAL)
  requestedAt: Date;
  matchedAt?: Date;
  notifiedAt?: Date;
  acceptedAt?: Date;
  declinedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  
  // Wait time (calculated)
  waitTimeSeconds?: number;
  
  // Video Call Details
  videoProvider: VideoProvider;
  videoRoomId?: string;
  videoRoomUrl?: string;
  videoRoomTokenPatient?: string;
  videoRoomTokenDoctor?: string;
  
  // Call Quality
  callDurationSeconds?: number;
  videoQualityScore?: number;
  audioQualityScore?: number;
  connectionIssues: boolean;
  
  // Payment
  consultationFeeCents: number;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string;
  
  // Ratings & Feedback
  patientRating?: number;
  patientFeedback?: string;
  doctorRating?: number;
  doctorNotes?: string;
  
  // Medical Notes
  diagnosis?: string;
  prescription?: object;
  followUpRecommended: boolean;
  followUpDate?: Date;
  
  // Re-queue tracking
  requeueCount: number;
  previousDoctorIds: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// MATCHING TYPES
// ============================================================================

export interface MatchResult {
  doctorId: string;
  doctorName: string;
  specialty: string;
  matchScore: number;
  estimatedResponseSeconds: number;
  reasons: string[];
}

export interface MatchingCriteria {
  specialty?: string;
  language?: string;
  urgency: UrgencyLevel;
  excludedDoctorIds?: string[];
  maxWaitTimeSeconds?: number;
}

// ============================================================================
// QUEUE TYPES
// ============================================================================

export interface QueueEntry {
  id: string;
  requestId: string;
  priority: number;
  queuedAt: Date;
  estimatedWaitSeconds: number;
  matchAttempts: number;
  lastMatchAttempt?: Date;
  excludedDoctorIds: string[];
  expiresAt: Date;
}

export interface QueueStats {
  totalInQueue: number;
  avgWaitTimeSeconds: number;
  longestWaitSeconds: number;
  doctorsAvailable: number;
  doctorsBusy: number;
  estimatedNextMatchSeconds: number;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export type NotificationType = 
  | 'new_consultation_request'
  | 'patient_cancelled'
  | 'patient_no_show'
  | 'payment_received'
  | 'rating_received'
  | 'system_alert';

export interface DoctorNotification {
  id: string;
  doctorId: string;
  requestId?: string;
  type: NotificationType;
  title: string;
  body?: string;
  data: object;
  read: boolean;
  readAt?: Date;
  clicked: boolean;
  clickedAt?: Date;
  pushSent: boolean;
  pushSentAt?: Date;
  pushError?: string;
  expiresAt: Date;
  createdAt: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ConnectNowResponse {
  requestId: string;
  status: ConsultationStatus;
  queuePosition?: number;
  estimatedWaitSeconds: number;
  matchedDoctor?: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    rating: number;
  };
  videoRoomUrl?: string;
}

export interface DoctorAcceptResponse {
  success: boolean;
  consultationId: string;
  patientInfo: {
    name: string;
    symptoms: string[];
    urgency: UrgencyLevel;
  };
  videoRoomUrl: string;
  videoRoomToken: string;
}
