/**
 * German Select Enterprise Platform - Type Definitions
 * Comprehensive TypeScript types for the entire platform
 */

// =============================================================================
// ENVIRONMENT & BINDINGS
// =============================================================================

export type Bindings = {
  DB: D1Database
  KV: KVNamespace
  R2?: R2Bucket
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  JWT_SECRET: string
  ENVIRONMENT: 'development' | 'staging' | 'production'
  API_BASE_URL?: string
}

export type Variables = {
  user?: AuthUser
  requestId: string
  startTime?: number
}

// =============================================================================
// AUTHENTICATION
// =============================================================================

export type UserRole = 'patient' | 'doctor' | 'admin' | 'affiliate' | 'staff'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  name?: string
  verified?: boolean
  permissions?: string[]
}

export interface JWTPayload {
  sub: string
  email: string
  role: UserRole
  name?: string
  iat: number
  exp: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: UserRole
  phone?: string
  country?: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: AuthUser
  message?: string
}

// =============================================================================
// USERS & PATIENTS
// =============================================================================

export interface User {
  id: string
  email: string
  password_hash: string
  name: string
  role: UserRole
  phone?: string
  country?: string
  language?: string
  timezone?: string
  avatar_url?: string
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface Patient extends User {
  date_of_birth?: string
  gender?: 'male' | 'female' | 'other'
  medical_history?: string
  insurance_provider?: string
  insurance_number?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  referred_by?: string  // affiliate_id
  stripe_customer_id?: string
}

export interface PatientProfile {
  id: string
  user_id: string
  date_of_birth?: string
  gender?: string
  blood_type?: string
  allergies?: string[]
  medical_conditions?: string[]
  current_medications?: string[]
  height_cm?: number
  weight_kg?: number
  bmi?: number
  smoking_status?: 'never' | 'former' | 'current'
  alcohol_consumption?: 'none' | 'occasional' | 'regular'
  preferred_language?: string
  communication_preferences?: {
    email: boolean
    sms: boolean
    whatsapp: boolean
    phone: boolean
  }
}

// =============================================================================
// DOCTORS
// =============================================================================

export interface Doctor {
  id: string
  user_id?: string
  name: string
  title?: string
  email: string
  phone?: string
  specialization: string
  subspecialties?: string[]
  qualifications: string[]
  certifications?: string[]
  languages: string[]
  experience_years: number
  location: string
  hospital_affiliation?: string
  consultation_fee: number
  video_consultation_fee?: number
  availability: DoctorAvailability
  bio?: string
  profile_image?: string
  rating: number
  total_reviews: number
  total_consultations: number
  is_active: boolean
  is_premium: boolean
  subscription_tier?: 'basic' | 'professional' | 'enterprise'
  fhir_practitioner_id?: string
  created_at: string
  updated_at: string
}

export interface DoctorAvailability {
  monday?: TimeSlot[]
  tuesday?: TimeSlot[]
  wednesday?: TimeSlot[]
  thursday?: TimeSlot[]
  friday?: TimeSlot[]
  saturday?: TimeSlot[]
  sunday?: TimeSlot[]
  exceptions?: AvailabilityException[]
}

export interface TimeSlot {
  start: string  // HH:MM format
  end: string    // HH:MM format
  type?: 'in-person' | 'video' | 'both'
}

export interface AvailabilityException {
  date: string
  available: boolean
  reason?: string
  slots?: TimeSlot[]
}

export interface DoctorSearchParams {
  specialization?: string
  location?: string
  language?: string
  min_rating?: number
  max_fee?: number
  available_date?: string
  consultation_type?: 'in-person' | 'video' | 'both'
  sort_by?: 'rating' | 'fee' | 'experience' | 'reviews'
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// =============================================================================
// BOOKINGS
// =============================================================================

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'rescheduled'

export type BookingType = 
  | 'consultation'
  | 'follow_up'
  | 'surgery'
  | 'procedure'
  | 'video_call'

export interface Booking {
  id: string
  patient_id: string
  doctor_id: string
  package_id?: string
  booking_type: BookingType
  status: BookingStatus
  scheduled_date: string
  scheduled_time: string
  duration_minutes: number
  consultation_type: 'in-person' | 'video'
  video_meeting_url?: string
  notes?: string
  symptoms?: string
  amount: number
  currency: string
  payment_status: PaymentStatus
  payment_id?: string
  reminder_sent: boolean
  confirmation_sent: boolean
  referral_code?: string
  affiliate_id?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface BookingRequest {
  doctor_id: string
  package_id?: string
  booking_type: BookingType
  scheduled_date: string
  scheduled_time: string
  consultation_type: 'in-person' | 'video'
  duration_minutes?: number
  notes?: string
  symptoms?: string
  referral_code?: string
}

export interface BookingSlot {
  date: string
  time: string
  available: boolean
  duration_minutes: number
  consultation_type: 'in-person' | 'video' | 'both'
}

// =============================================================================
// PACKAGES & SERVICES
// =============================================================================

export type PackageType = 
  | 'consultation'
  | 'surgery'
  | 'treatment'
  | 'wellness'
  | 'bundle'

export interface CarePackage {
  id: string
  name: string
  slug: string
  type: PackageType
  category: string
  description: string
  short_description?: string
  features: string[]
  inclusions: PackageInclusion[]
  exclusions?: string[]
  base_price: number
  currency: string
  price_range?: {
    min: number
    max: number
  }
  duration_days?: number
  recovery_days?: number
  doctor_ids?: string[]
  specializations?: string[]
  images?: string[]
  video_url?: string
  faq?: FAQ[]
  success_rate?: number
  total_procedures?: number
  avg_rating?: number
  is_active: boolean
  is_featured: boolean
  sort_order: number
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PackageInclusion {
  name: string
  description?: string
  included: boolean
}

export interface FAQ {
  question: string
  answer: string
}

// =============================================================================
// PAYMENTS & SUBSCRIPTIONS
// =============================================================================

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed'

export type PaymentMethod = 
  | 'card'
  | 'bank_transfer'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'

export interface Payment {
  id: string
  booking_id?: string
  package_id?: string
  patient_id: string
  amount: number
  currency: string
  status: PaymentStatus
  payment_method: PaymentMethod
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  description?: string
  receipt_url?: string
  refund_amount?: number
  refund_reason?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PaymentRequest {
  booking_id?: string
  package_id?: string
  amount: number
  currency?: string
  payment_method?: PaymentMethod
  return_url?: string
  metadata?: Record<string, any>
}

export type SubscriptionStatus = 
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'unpaid'
  | 'trialing'
  | 'paused'

export type SubscriptionPlan = 
  | 'basic'
  | 'professional'
  | 'enterprise'

export interface Subscription {
  id: string
  doctor_id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  stripe_subscription_id?: string
  stripe_customer_id?: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  cancelled_at?: string
  trial_end?: string
  price_per_month: number
  currency: string
  features: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, {
  name: string
  price: number
  features: string[]
}> = {
  basic: {
    name: 'Basic',
    price: 200,
    features: [
      'Basic profile listing',
      'Up to 20 appointments/month',
      'Email support',
      'Basic analytics'
    ]
  },
  professional: {
    name: 'Professional',
    price: 350,
    features: [
      'Featured profile listing',
      'Unlimited appointments',
      'Priority support',
      'Advanced analytics',
      'Video consultations',
      'Custom scheduling'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 500,
    features: [
      'Premium profile placement',
      'Unlimited everything',
      'Dedicated account manager',
      'Real-time analytics',
      'API access',
      'White-label options',
      'Custom integrations'
    ]
  }
}

// =============================================================================
// LEADS & AFFILIATES
// =============================================================================

export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'converted'
  | 'lost'
  | 'nurturing'

export type LeadSource = 
  | 'website'
  | 'referral'
  | 'affiliate'
  | 'social_media'
  | 'google_ads'
  | 'facebook_ads'
  | 'email_campaign'
  | 'event'
  | 'partner'
  | 'other'

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  country?: string
  source: LeadSource
  status: LeadStatus
  interested_service?: string
  interested_package_id?: string
  budget_range?: string
  preferred_date?: string
  notes?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  referral_code?: string
  affiliate_id?: string
  assigned_to?: string
  score?: number
  last_contacted?: string
  converted_at?: string
  converted_booking_id?: string
  tags?: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface LeadCreateRequest {
  name: string
  email: string
  phone?: string
  country?: string
  source?: LeadSource
  interested_service?: string
  interested_package_id?: string
  budget_range?: string
  preferred_date?: string
  notes?: string
  referral_code?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export type AffiliateStatus = 'pending' | 'active' | 'suspended' | 'terminated'
export type AffiliateTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface Affiliate {
  id: string
  user_id?: string
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  status: AffiliateStatus
  tier: AffiliateTier
  commission_rate: number  // percentage
  referral_code: string
  payment_method?: string
  payment_details?: Record<string, any>
  total_referrals: number
  total_conversions: number
  total_commission: number
  pending_commission: number
  paid_commission: number
  conversion_rate?: number
  last_referral_at?: string
  last_payout_at?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface AffiliateReferral {
  id: string
  affiliate_id: string
  lead_id?: string
  patient_id?: string
  booking_id?: string
  status: 'pending' | 'converted' | 'rejected'
  referral_date: string
  conversion_date?: string
  revenue_generated: number
  commission_amount: number
  commission_paid: boolean
  commission_paid_at?: string
  metadata?: Record<string, any>
  created_at: string
}

export interface AffiliatePayout {
  id: string
  affiliate_id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'paid' | 'failed'
  payment_method: string
  payment_reference?: string
  referrals_included: string[]
  period_start: string
  period_end: string
  paid_at?: string
  notes?: string
  created_at: string
}

export const AFFILIATE_TIERS: Record<AffiliateTier, {
  name: string
  commission_rate: number
  min_referrals: number
  benefits: string[]
}> = {
  bronze: {
    name: 'Bronze',
    commission_rate: 5,
    min_referrals: 0,
    benefits: ['Basic dashboard', 'Monthly payouts', 'Email support']
  },
  silver: {
    name: 'Silver',
    commission_rate: 7,
    min_referrals: 10,
    benefits: ['Enhanced analytics', 'Bi-weekly payouts', 'Priority support']
  },
  gold: {
    name: 'Gold',
    commission_rate: 10,
    min_referrals: 25,
    benefits: ['Advanced analytics', 'Weekly payouts', 'Dedicated support', 'Custom landing pages']
  },
  platinum: {
    name: 'Platinum',
    commission_rate: 15,
    min_referrals: 50,
    benefits: ['Real-time analytics', 'On-demand payouts', 'Account manager', 'Co-branded materials', 'API access']
  }
}

// =============================================================================
// ANALYTICS
// =============================================================================

export interface AnalyticsOverview {
  revenue: {
    total: number
    change: number
    trend: number[]
  }
  bookings: {
    total: number
    change: number
    byStatus: Record<BookingStatus, number>
  }
  patients: {
    total: number
    new: number
    returning: number
    change: number
  }
  conversion: {
    rate: number
    change: number
  }
  period: string
}

export interface RevenueAnalytics {
  trend: {
    labels: string[]
    values: number[]
  }
  breakdown: {
    source: string
    amount: number
    percentage: number
  }[]
  byPackage: {
    package_id: string
    package_name: string
    revenue: number
    bookings: number
  }[]
  byDoctor: {
    doctor_id: string
    doctor_name: string
    revenue: number
    bookings: number
  }[]
}

export interface BookingAnalytics {
  total: number
  byStatus: Record<string, number>
  byType: Record<string, number>
  bySpecialization: Record<string, number>
  trend: {
    labels: string[]
    values: number[]
  }
  peakHours: Record<string, number>
  peakDays: Record<string, number>
}

export interface DoctorPerformance {
  doctor_id: string
  doctor_name: string
  specialization: string
  bookings: number
  revenue: number
  rating: number
  conversion_rate: number
  avg_consultation_time: number
}

// =============================================================================
// FHIR R4 TYPES
// =============================================================================

export interface FHIRPractitioner {
  resourceType: 'Practitioner'
  id: string
  identifier?: FHIRIdentifier[]
  active: boolean
  name: FHIRHumanName[]
  telecom?: FHIRContactPoint[]
  address?: FHIRAddress[]
  gender?: 'male' | 'female' | 'other' | 'unknown'
  qualification?: FHIRQualification[]
  communication?: FHIRCommunication[]
}

export interface FHIRIdentifier {
  system?: string
  value: string
  type?: {
    coding: {
      system: string
      code: string
      display: string
    }[]
  }
}

export interface FHIRHumanName {
  use?: 'official' | 'usual' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden'
  family?: string
  given?: string[]
  prefix?: string[]
  suffix?: string[]
  text?: string
}

export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other'
  value?: string
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile'
}

export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing'
  type?: 'postal' | 'physical' | 'both'
  text?: string
  line?: string[]
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

export interface FHIRQualification {
  identifier?: FHIRIdentifier[]
  code: {
    coding: {
      system?: string
      code: string
      display: string
    }[]
    text?: string
  }
  period?: {
    start?: string
    end?: string
  }
  issuer?: {
    display: string
  }
}

export interface FHIRCommunication {
  language: {
    coding: {
      system?: string
      code: string
      display: string
    }[]
    text?: string
  }
}

export interface FHIRBundle<T> {
  resourceType: 'Bundle'
  type: 'searchset' | 'collection' | 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history'
  total?: number
  link?: {
    relation: string
    url: string
  }[]
  entry?: {
    fullUrl?: string
    resource: T
  }[]
}

// =============================================================================
// API RESPONSES
// =============================================================================

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
  requestId?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface ErrorResponse {
  success: false
  error: string
  message: string
  details?: ValidationError[]
  requestId?: string
  timestamp?: string
}

// =============================================================================
// WEBHOOKS
// =============================================================================

export type WebhookEvent = 
  | 'booking.created'
  | 'booking.confirmed'
  | 'booking.cancelled'
  | 'booking.completed'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'payment.refunded'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'lead.created'
  | 'lead.converted'
  | 'affiliate.referral'
  | 'affiliate.payout'

export interface WebhookPayload {
  event: WebhookEvent
  timestamp: string
  data: Record<string, any>
  signature?: string
}

// =============================================================================
// NOTIFICATIONS
// =============================================================================

export type NotificationType = 
  | 'email'
  | 'sms'
  | 'push'
  | 'in_app'

export type NotificationCategory = 
  | 'booking'
  | 'payment'
  | 'reminder'
  | 'promotion'
  | 'system'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  sent_at?: string
  read_at?: string
  created_at: string
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type Currency = 'EUR' | 'USD' | 'GBP' | 'AED' | 'CHF'

export interface DateRange {
  start: string
  end: string
}

export interface GeoLocation {
  latitude: number
  longitude: number
  city?: string
  country?: string
  timezone?: string
}

export type SortOrder = 'asc' | 'desc'

export interface PaginationParams {
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: SortOrder
}

export interface FilterParams extends PaginationParams {
  search?: string
  status?: string
  date_from?: string
  date_to?: string
  [key: string]: any
}
