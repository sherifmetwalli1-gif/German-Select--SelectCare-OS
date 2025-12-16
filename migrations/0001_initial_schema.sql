-- SelectCareOS™ Enterprise Platform - Initial Schema
-- German Select Medical Tourism Platform

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin', 'affiliate', 'staff')),
    phone TEXT,
    country TEXT,
    language TEXT DEFAULT 'en',
    is_active INTEGER DEFAULT 1,
    email_verified INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =============================================================================
-- PATIENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    blood_type TEXT,
    height_cm REAL,
    weight_kg REAL,
    bmi REAL,
    medical_history TEXT,
    allergies TEXT,
    current_medications TEXT,
    insurance_provider TEXT,
    insurance_number TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    referred_by TEXT,
    stripe_customer_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);

-- =============================================================================
-- DOCTORS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    title TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    specialization TEXT NOT NULL,
    subspecialties TEXT,
    qualifications TEXT NOT NULL,
    languages TEXT NOT NULL,
    experience_years INTEGER NOT NULL,
    location TEXT NOT NULL,
    consultation_fee REAL NOT NULL DEFAULT 150,
    video_consultation_fee REAL,
    availability TEXT,
    bio TEXT,
    rating REAL DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    is_premium INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON doctors(specialization);

-- =============================================================================
-- CARE PACKAGES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tier TEXT NOT NULL,
    price_min REAL NOT NULL,
    price_max REAL NOT NULL,
    currency TEXT DEFAULT 'EUR',
    description TEXT NOT NULL,
    features TEXT NOT NULL,
    inclusions TEXT NOT NULL,
    duration_days INTEGER,
    recovery_days INTEGER,
    is_active INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- =============================================================================
-- BOOKINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    reference TEXT UNIQUE NOT NULL,
    patient_id TEXT NOT NULL,
    doctor_id TEXT NOT NULL,
    package_id TEXT,
    booking_type TEXT NOT NULL CHECK (booking_type IN ('consultation', 'follow_up', 'surgery', 'procedure', 'video_call')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show', 'rescheduled')),
    scheduled_date TEXT NOT NULL,
    scheduled_time TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    consultation_type TEXT NOT NULL CHECK (consultation_type IN ('in-person', 'video')),
    video_meeting_url TEXT,
    notes TEXT,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'EUR',
    payment_status TEXT DEFAULT 'pending',
    affiliate_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_patient_id ON bookings(patient_id);
CREATE INDEX IF NOT EXISTS idx_bookings_doctor_id ON bookings(doctor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);

-- =============================================================================
-- TREATMENT TIMELINE TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS treatment_timeline (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    phase TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    start_date TEXT,
    end_date TEXT,
    progress_percentage INTEGER DEFAULT 0,
    milestones TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_timeline_patient_id ON treatment_timeline(patient_id);

-- =============================================================================
-- HEALTH METRICS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS health_metrics (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    metric_type TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT,
    recorded_at TEXT NOT NULL,
    source TEXT DEFAULT 'manual',
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_health_metrics_patient_id ON health_metrics(patient_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_recorded_at ON health_metrics(recorded_at);

-- =============================================================================
-- APPOINTMENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    doctor_id TEXT NOT NULL,
    appointment_type TEXT NOT NULL,
    title TEXT NOT NULL,
    scheduled_datetime TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled',
    location TEXT,
    video_url TEXT,
    notes TEXT,
    reminder_sent INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled ON appointments(scheduled_datetime);

-- =============================================================================
-- MESSAGES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('patient', 'doctor', 'system', 'ai')),
    recipient_id TEXT NOT NULL,
    content TEXT NOT NULL,
    attachments TEXT,
    read_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);

-- =============================================================================
-- AI INSIGHTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS ai_insights (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    insight_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high')),
    recommendation TEXT,
    evidence_source TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_insights_patient_id ON ai_insights(patient_id);

-- =============================================================================
-- WELLNESS BOOKINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS wellness_bookings (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    service_type TEXT NOT NULL,
    service_name TEXT NOT NULL,
    scheduled_date TEXT NOT NULL,
    duration_days INTEGER,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- =============================================================================
-- ACCOMMODATION BOOKINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS accommodation_bookings (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    accommodation_type TEXT NOT NULL,
    accommodation_name TEXT NOT NULL,
    check_in_date TEXT NOT NULL,
    check_out_date TEXT NOT NULL,
    nights INTEGER NOT NULL,
    room_type TEXT,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending',
    special_requests TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- =============================================================================
-- EXCURSION BOOKINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS excursion_bookings (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    excursion_id TEXT NOT NULL,
    excursion_name TEXT NOT NULL,
    scheduled_date TEXT NOT NULL,
    participants INTEGER DEFAULT 1,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- =============================================================================
-- CONNECTED DEVICES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS connected_devices (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    device_type TEXT NOT NULL,
    device_name TEXT NOT NULL,
    device_id TEXT,
    manufacturer TEXT,
    is_active INTEGER DEFAULT 1,
    last_sync_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_connected_devices_patient_id ON connected_devices(patient_id);
