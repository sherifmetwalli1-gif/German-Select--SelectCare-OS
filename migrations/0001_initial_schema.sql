-- ============================================================================
-- German Select Health Platform - SelectCareOS
-- Initial Database Schema for Cloudflare D1
-- Version: 1.0.0
-- Date: 2024-10-22
-- ============================================================================

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

-- Users table (patients, doctors, staff)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin', 'coordinator', 'staff')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
  password_hash TEXT,
  mfa_enabled INTEGER DEFAULT 0,
  mfa_secret TEXT,
  email_verified INTEGER DEFAULT 0,
  phone_verified INTEGER DEFAULT 0,
  last_login_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- User sessions
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  device_info TEXT,
  ip_address TEXT,
  user_agent TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- PATIENT PROFILES
-- ============================================================================

-- Patient profiles (extended user data)
CREATE TABLE IF NOT EXISTS patient_profiles (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL UNIQUE,
  patient_id TEXT UNIQUE, -- e.g., GS-2024-0847
  date_of_birth TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'unknown')),
  height_cm REAL,
  weight_kg REAL,
  allergies TEXT, -- JSON array
  conditions TEXT, -- JSON array
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relation TEXT,
  address_street TEXT,
  address_city TEXT,
  address_country TEXT,
  address_postal TEXT,
  insurance_provider TEXT,
  insurance_number TEXT,
  membership_tier TEXT DEFAULT 'standard' CHECK (membership_tier IN ('standard', 'silver', 'gold', 'platinum')),
  select_score INTEGER DEFAULT 0 CHECK (select_score >= 0 AND select_score <= 100),
  recovery_progress INTEGER DEFAULT 0 CHECK (recovery_progress >= 0 AND recovery_progress <= 100),
  preferred_language TEXT DEFAULT 'de',
  timezone TEXT DEFAULT 'Europe/Berlin',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- DOCTORS & CARE TEAM
-- ============================================================================

-- Doctor profiles
CREATE TABLE IF NOT EXISTS doctor_profiles (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL UNIQUE,
  license_number TEXT UNIQUE NOT NULL,
  specialty TEXT NOT NULL,
  sub_specialties TEXT, -- JSON array
  hospital TEXT,
  department TEXT,
  bio TEXT,
  education TEXT, -- JSON array
  certifications TEXT, -- JSON array
  languages TEXT DEFAULT '["German", "English"]', -- JSON array
  consultation_fee REAL DEFAULT 80.00,
  currency TEXT DEFAULT 'EUR',
  rating REAL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  telemedicine_enabled INTEGER DEFAULT 1,
  availability_status TEXT DEFAULT 'offline' CHECK (availability_status IN ('online', 'busy', 'offline', 'away')),
  max_patients_per_day INTEGER DEFAULT 20,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Care team assignments
CREATE TABLE IF NOT EXISTS care_team_members (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'attending' CHECK (role IN ('attending', 'consulting', 'primary', 'specialist', 'therapist', 'coordinator')),
  assigned_at TEXT DEFAULT (datetime('now')),
  notes TEXT,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  UNIQUE(patient_id, doctor_id)
);

-- ============================================================================
-- APPOINTMENTS & SCHEDULING
-- ============================================================================

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('consultation', 'follow-up', 'telemedicine', 'procedure', 'checkup', 'therapy')),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'rescheduled')),
  scheduled_at TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  location TEXT,
  location_type TEXT DEFAULT 'in_person' CHECK (location_type IN ('in_person', 'telemedicine', 'home_visit')),
  reason TEXT,
  notes TEXT,
  pre_visit_form_completed INTEGER DEFAULT 0,
  reminder_sent INTEGER DEFAULT 0,
  cancelled_at TEXT,
  cancellation_reason TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- TELEMEDICINE
-- ============================================================================

-- Telemedicine sessions
CREATE TABLE IF NOT EXISTS telemedicine_sessions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  appointment_id TEXT,
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  session_type TEXT DEFAULT 'video' CHECK (session_type IN ('video', 'audio', 'chat')),
  room_url TEXT,
  room_token TEXT,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed', 'cancelled', 'failed')),
  started_at TEXT,
  ended_at TEXT,
  duration_seconds INTEGER,
  recording_enabled INTEGER DEFAULT 0,
  recording_url TEXT,
  translation_enabled INTEGER DEFAULT 0,
  source_language TEXT,
  target_language TEXT,
  quality_score REAL,
  network_stats TEXT, -- JSON object
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE
);

-- Telemedicine chat messages
CREATE TABLE IF NOT EXISTS telemedicine_chat (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  session_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('patient', 'doctor', 'system')),
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'file', 'image', 'system')),
  file_url TEXT,
  file_name TEXT,
  translated_content TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES telemedicine_sessions(id) ON DELETE CASCADE
);

-- ============================================================================
-- VITALS & RPM (Remote Patient Monitoring)
-- ============================================================================

-- Vital signs records
CREATE TABLE IF NOT EXISTS vitals (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  recorded_at TEXT DEFAULT (datetime('now')),
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'device', 'hospital', 'lab')),
  device_id TEXT,
  heart_rate INTEGER CHECK (heart_rate IS NULL OR (heart_rate >= 30 AND heart_rate <= 250)),
  blood_pressure_systolic INTEGER CHECK (blood_pressure_systolic IS NULL OR (blood_pressure_systolic >= 70 AND blood_pressure_systolic <= 250)),
  blood_pressure_diastolic INTEGER CHECK (blood_pressure_diastolic IS NULL OR (blood_pressure_diastolic >= 40 AND blood_pressure_diastolic <= 150)),
  temperature REAL CHECK (temperature IS NULL OR (temperature >= 35 AND temperature <= 42)),
  weight_kg REAL CHECK (weight_kg IS NULL OR (weight_kg >= 20 AND weight_kg <= 300)),
  blood_glucose INTEGER CHECK (blood_glucose IS NULL OR (blood_glucose >= 20 AND blood_glucose <= 600)),
  oxygen_saturation INTEGER CHECK (oxygen_saturation IS NULL OR (oxygen_saturation >= 70 AND oxygen_saturation <= 100)),
  respiratory_rate INTEGER CHECK (respiratory_rate IS NULL OR (respiratory_rate >= 5 AND respiratory_rate <= 60)),
  steps INTEGER DEFAULT 0,
  active_minutes INTEGER DEFAULT 0,
  calories_burned INTEGER,
  sleep_duration_minutes INTEGER,
  sleep_score INTEGER CHECK (sleep_score IS NULL OR (sleep_score >= 0 AND sleep_score <= 100)),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- Connected devices
CREATE TABLE IF NOT EXISTS connected_devices (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  device_type TEXT NOT NULL CHECK (device_type IN ('smartwatch', 'scale', 'glucometer', 'blood_pressure', 'thermometer', 'oximeter', 'ring', 'other')),
  device_name TEXT NOT NULL,
  manufacturer TEXT,
  model TEXT,
  serial_number TEXT,
  firmware_version TEXT,
  connection_status TEXT DEFAULT 'connected' CHECK (connection_status IN ('connected', 'disconnected', 'pairing', 'error')),
  battery_level INTEGER CHECK (battery_level IS NULL OR (battery_level >= 0 AND battery_level <= 100)),
  last_sync_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- PRESCRIPTIONS
-- ============================================================================

-- Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  appointment_id TEXT,
  medication_name TEXT NOT NULL,
  generic_name TEXT,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  instructions TEXT,
  quantity INTEGER NOT NULL,
  duration_days INTEGER,
  refills_allowed INTEGER DEFAULT 0,
  refills_used INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'expired', 'pending')),
  pharmacy_name TEXT,
  pharmacy_address TEXT,
  pharmacy_phone TEXT,
  digital_signature TEXT,
  qr_code TEXT,
  prescribed_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- ============================================================================
-- TIMELINE & MILESTONES
-- ============================================================================

-- Care plan timeline
CREATE TABLE IF NOT EXISTS care_timeline (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('preparation', 'surgery', 'recovery', 'follow_up', 'maintenance')),
  title TEXT NOT NULL,
  description TEXT,
  week_number INTEGER,
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('completed', 'current', 'upcoming', 'skipped')),
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- Daily tasks
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  timeline_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('medication', 'exercise', 'nutrition', 'vitals', 'appointment', 'general')),
  due_date TEXT,
  due_time TEXT,
  is_recurring INTEGER DEFAULT 0,
  recurrence_pattern TEXT, -- JSON object
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped', 'overdue')),
  completed_at TEXT,
  reminder_enabled INTEGER DEFAULT 1,
  reminder_time TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (timeline_id) REFERENCES care_timeline(id) ON DELETE SET NULL
);

-- ============================================================================
-- MESSAGING
-- ============================================================================

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  type TEXT DEFAULT 'direct' CHECK (type IN ('direct', 'group', 'care_team')),
  title TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Conversation participants
CREATE TABLE IF NOT EXISTS conversation_participants (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  conversation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  last_read_at TEXT,
  muted INTEGER DEFAULT 0,
  joined_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(conversation_id, user_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'file', 'image', 'audio', 'video', 'system')),
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  is_edited INTEGER DEFAULT 0,
  edited_at TEXT,
  is_deleted INTEGER DEFAULT 0,
  deleted_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- CARESELECT™ JOURNEYS (MARKETPLACE)
-- ============================================================================

-- Surgery packages
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('essential', 'premium', 'crown')),
  description TEXT,
  price REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  features TEXT NOT NULL, -- JSON array
  includes TEXT, -- JSON object
  duration_days INTEGER,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Accommodations
CREATE TABLE IF NOT EXISTS accommodations (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'resort', 'villa', 'apartment', 'medical_spa')),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  description TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Egypt',
  price_per_night REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  amenities TEXT, -- JSON array
  images TEXT, -- JSON array of URLs
  rating REAL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  is_recovery_friendly INTEGER DEFAULT 1,
  medical_staff_available INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Excursions & experiences
CREATE TABLE IF NOT EXISTS excursions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('tour', 'water_activity', 'wellness', 'adventure', 'cultural', 'dining')),
  description TEXT,
  duration_hours REAL,
  price REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  location TEXT,
  includes TEXT, -- JSON array
  requirements TEXT, -- JSON array
  recovery_week_minimum INTEGER DEFAULT 0,
  intensity_level TEXT DEFAULT 'low' CHECK (intensity_level IN ('low', 'medium', 'high')),
  max_participants INTEGER,
  images TEXT, -- JSON array
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Wellness treatments
CREATE TABLE IF NOT EXISTS wellness_treatments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('spa', 'medical', 'anti_aging', 'rehabilitation', 'nutrition', 'fitness')),
  description TEXT,
  duration_minutes INTEGER,
  price REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  benefits TEXT, -- JSON array
  contraindications TEXT, -- JSON array
  recovery_compatible INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Bookings/Orders
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  booking_number TEXT UNIQUE NOT NULL,
  package_id TEXT,
  accommodation_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  start_date TEXT NOT NULL,
  end_date TEXT,
  total_amount REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded', 'failed')),
  payment_method TEXT,
  stripe_payment_id TEXT,
  special_requests TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
  FOREIGN KEY (accommodation_id) REFERENCES accommodations(id) ON DELETE SET NULL
);

-- Booking items (excursions, treatments added to booking)
CREATE TABLE IF NOT EXISTS booking_items (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  booking_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('excursion', 'treatment', 'transfer', 'other')),
  item_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  scheduled_date TEXT,
  scheduled_time TEXT,
  price REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ============================================================================
-- AI & DIAGNOSTICS
-- ============================================================================

-- AI chat history
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  context TEXT, -- JSON object with additional context
  tokens_used INTEGER,
  model TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- Risk assessment results
CREATE TABLE IF NOT EXISTS risk_assessments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('cardiovascular', 'diabetes', 'bmi', 'kidney', 'surgical')),
  input_data TEXT NOT NULL, -- JSON object
  score REAL,
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high', 'very_high')),
  recommendations TEXT, -- JSON array
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- MEMBERSHIPS
-- ============================================================================

-- Membership subscriptions
CREATE TABLE IF NOT EXISTS memberships (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_id TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'silver', 'gold', 'platinum')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  price_monthly REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  stripe_subscription_id TEXT,
  started_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT,
  cancelled_at TEXT,
  cancellation_reason TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- FEEDBACK & REVIEWS
-- ============================================================================

-- Doctor reviews
CREATE TABLE IF NOT EXISTS doctor_reviews (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  doctor_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  appointment_id TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_anonymous INTEGER DEFAULT 0,
  is_verified INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Telemedicine feedback
CREATE TABLE IF NOT EXISTS telemedicine_feedback (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  session_id TEXT NOT NULL UNIQUE,
  patient_id TEXT NOT NULL,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  video_quality INTEGER CHECK (video_quality >= 1 AND video_quality <= 5),
  audio_quality INTEGER CHECK (audio_quality >= 1 AND audio_quality <= 5),
  doctor_rating INTEGER CHECK (doctor_rating >= 1 AND doctor_rating <= 5),
  ease_of_use INTEGER CHECK (ease_of_use >= 1 AND ease_of_use <= 5),
  would_recommend INTEGER DEFAULT 1,
  comments TEXT,
  technical_issues TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES telemedicine_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patient_profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- AUDIT & COMPLIANCE
-- ============================================================================

-- Audit log (HIPAA compliance)
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  request_id TEXT,
  details TEXT, -- JSON object
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Consent records (GDPR compliance)
CREATE TABLE IF NOT EXISTS consent_records (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('terms', 'privacy', 'marketing', 'data_processing', 'telemedicine', 'recording')),
  version TEXT NOT NULL,
  consented INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Patient profiles
CREATE INDEX IF NOT EXISTS idx_patient_profiles_user_id ON patient_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_profiles_patient_id ON patient_profiles(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_profiles_membership ON patient_profiles(membership_tier);

-- Doctor profiles
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_user_id ON doctor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_specialty ON doctor_profiles(specialty);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_availability ON doctor_profiles(availability_status);

-- Appointments
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Telemedicine sessions
CREATE INDEX IF NOT EXISTS idx_telemedicine_sessions_patient_id ON telemedicine_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_sessions_doctor_id ON telemedicine_sessions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_sessions_status ON telemedicine_sessions(status);

-- Vitals
CREATE INDEX IF NOT EXISTS idx_vitals_patient_id ON vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_vitals_recorded_at ON vitals(recorded_at);

-- Prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);

-- Messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Bookings
CREATE INDEX IF NOT EXISTS idx_bookings_patient_id ON bookings(patient_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_number ON bookings(booking_number);

-- Audit log
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_resource_type ON audit_log(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
