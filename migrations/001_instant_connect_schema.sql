-- ============================================================================
-- INSTANT CONNECT TELEMEDICINE SYSTEM - DATABASE SCHEMA
-- SelectCareOS™ - World-Class Instant Doctor Connection
-- ============================================================================
-- Target: Connect patients to doctors in <2 minutes
-- Cost: $0-25/month using free-tier services
-- Competitors: Teladoc, Babylon Health, MDLIVE
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Doctors table with instant connect capabilities
-- Extends existing doctors with real-time availability features
CREATE TABLE IF NOT EXISTS instant_doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Link to existing doctor data (if using external auth)
  external_doctor_id TEXT UNIQUE,
  user_id TEXT, -- Auth user ID (Supabase auth, Firebase, etc.)
  
  -- Basic Profile
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  profile_image_url TEXT,
  
  -- Medical Credentials
  specialty TEXT NOT NULL DEFAULT 'General Practice',
  subspecialties TEXT[] DEFAULT ARRAY[]::TEXT[],
  qualifications TEXT[] DEFAULT ARRAY[]::TEXT[],
  license_number TEXT,
  license_country TEXT DEFAULT 'Germany',
  
  -- Languages & Location
  languages TEXT[] DEFAULT ARRAY['en', 'de'],
  timezone TEXT DEFAULT 'Europe/Berlin',
  location TEXT DEFAULT 'Germany / Hurghada',
  
  -- Performance Metrics
  rating DECIMAL(3,2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INT DEFAULT 0,
  total_consultations INT DEFAULT 0,
  
  -- ========================================
  -- INSTANT CONNECT FIELDS (CRITICAL)
  -- ========================================
  status TEXT DEFAULT 'offline' CHECK (status IN ('available', 'busy', 'offline', 'in_call')),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
  current_consultation_id UUID,
  
  -- Response metrics (used for smart matching)
  avg_response_time_seconds INT DEFAULT 45,
  acceptance_rate DECIMAL(5,2) DEFAULT 100.0 CHECK (acceptance_rate >= 0 AND acceptance_rate <= 100),
  total_accepted INT DEFAULT 0,
  total_declined INT DEFAULT 0,
  total_missed INT DEFAULT 0,
  
  -- Availability Settings
  instant_connect_enabled BOOLEAN DEFAULT true,
  max_queue_size INT DEFAULT 3,
  auto_accept_enabled BOOLEAN DEFAULT false,
  consultation_fee_cents INT DEFAULT 5000, -- €50 default
  
  -- Notification Settings
  fcm_token TEXT, -- Firebase Cloud Messaging token
  push_enabled BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,
  
  -- Working Hours (JSON for flexibility)
  working_hours JSONB DEFAULT '{
    "monday": {"start": "09:00", "end": "18:00", "enabled": true},
    "tuesday": {"start": "09:00", "end": "18:00", "enabled": true},
    "wednesday": {"start": "09:00", "end": "18:00", "enabled": true},
    "thursday": {"start": "09:00", "end": "18:00", "enabled": true},
    "friday": {"start": "09:00", "end": "17:00", "enabled": true},
    "saturday": {"start": "10:00", "end": "14:00", "enabled": false},
    "sunday": {"start": null, "end": null, "enabled": false}
  }'::JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients table for instant connect
CREATE TABLE IF NOT EXISTS instant_patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Link to existing patient data
  external_patient_id TEXT UNIQUE,
  user_id TEXT,
  
  -- Basic Profile
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  profile_image_url TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  
  -- Location & Language
  preferred_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'Europe/Berlin',
  country TEXT DEFAULT 'Germany',
  
  -- Subscription & Billing
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'plus', 'premium', 'elite')),
  free_consultations_remaining INT DEFAULT 1,
  stripe_customer_id TEXT,
  
  -- Health Profile (for better matching)
  primary_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
  allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
  medications TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Notification Settings
  fcm_token TEXT,
  push_enabled BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONSULTATION REQUESTS TABLE (QUEUE SYSTEM)
-- ============================================================================

CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Participants
  patient_id UUID REFERENCES instant_patients(id) ON DELETE SET NULL,
  doctor_id UUID REFERENCES instant_doctors(id) ON DELETE SET NULL,
  
  -- Request Status Flow:
  -- pending -> matched -> accepted -> in_progress -> completed
  -- pending -> matched -> declined -> pending (re-queue)
  -- pending -> matched -> expired -> pending (re-queue)
  -- pending -> cancelled
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Waiting for doctor match
    'matched',      -- Doctor found, waiting for acceptance
    'accepted',     -- Doctor accepted, preparing video room
    'in_progress',  -- Video call active
    'completed',    -- Consultation finished
    'cancelled',    -- Patient cancelled
    'declined',     -- Doctor declined
    'expired',      -- Doctor didn't respond in time
    'no_show'       -- Patient didn't join video call
  )),
  
  -- Matching Criteria
  preferred_specialty TEXT,
  preferred_language TEXT,
  urgency TEXT DEFAULT 'routine' CHECK (urgency IN ('emergency', 'urgent', 'routine')),
  
  -- AI Triage Results (optional)
  symptoms JSONB DEFAULT '[]'::JSONB,
  symptom_description TEXT,
  triage_level TEXT CHECK (triage_level IN ('critical', 'urgent', 'moderate', 'low', 'self_care')),
  ai_triage_result JSONB,
  
  -- Match Score (for analytics)
  match_score INT DEFAULT 0,
  match_reason TEXT,
  
  -- Timing Metrics (CRITICAL for performance tracking)
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  matched_at TIMESTAMPTZ,
  notified_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Wait time calculations
  wait_time_seconds INT GENERATED ALWAYS AS (
    CASE 
      WHEN started_at IS NOT NULL THEN EXTRACT(EPOCH FROM (started_at - requested_at))::INT
      ELSE NULL
    END
  ) STORED,
  
  -- Video Call Details
  video_provider TEXT DEFAULT 'jitsi' CHECK (video_provider IN ('jitsi', 'daily', 'twilio', 'agora')),
  video_room_id TEXT,
  video_room_url TEXT,
  video_room_token_patient TEXT,
  video_room_token_doctor TEXT,
  
  -- Recording (with consent)
  recording_enabled BOOLEAN DEFAULT false,
  recording_url TEXT,
  recording_consent_patient BOOLEAN DEFAULT false,
  recording_consent_doctor BOOLEAN DEFAULT false,
  
  -- Call Quality Metrics
  call_duration_seconds INT,
  video_quality_score DECIMAL(3,2),
  audio_quality_score DECIMAL(3,2),
  connection_issues BOOLEAN DEFAULT false,
  
  -- Payment
  consultation_fee_cents INT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'authorized', 'captured', 'refunded', 'failed')),
  payment_intent_id TEXT,
  
  -- Ratings & Feedback
  patient_rating INT CHECK (patient_rating >= 1 AND patient_rating <= 5),
  patient_feedback TEXT,
  doctor_rating INT CHECK (doctor_rating >= 1 AND doctor_rating <= 5),
  doctor_notes TEXT,
  
  -- Medical Notes (encrypted in production)
  diagnosis TEXT,
  prescription JSONB,
  follow_up_recommended BOOLEAN DEFAULT false,
  follow_up_date DATE,
  
  -- Re-queue tracking
  requeue_count INT DEFAULT 0,
  previous_doctor_ids UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- DOCTOR NOTIFICATIONS TABLE (REAL-TIME)
-- ============================================================================

CREATE TABLE IF NOT EXISTS doctor_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  doctor_id UUID REFERENCES instant_doctors(id) ON DELETE CASCADE NOT NULL,
  request_id UUID REFERENCES consultation_requests(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN (
    'new_consultation_request',
    'patient_cancelled',
    'patient_no_show',
    'payment_received',
    'rating_received',
    'system_alert'
  )),
  
  title TEXT NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}'::JSONB,
  
  -- Notification Status
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  clicked BOOLEAN DEFAULT false,
  clicked_at TIMESTAMPTZ,
  
  -- Push Notification Status
  push_sent BOOLEAN DEFAULT false,
  push_sent_at TIMESTAMPTZ,
  push_error TEXT,
  
  -- Auto-expire
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 seconds'),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- DOCTOR AVAILABILITY LOG (FOR ANALYTICS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS doctor_availability_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES instant_doctors(id) ON DELETE CASCADE NOT NULL,
  
  status TEXT NOT NULL,
  previous_status TEXT,
  
  -- Session tracking
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  session_duration_minutes INT,
  
  -- Activity during session
  requests_received INT DEFAULT 0,
  requests_accepted INT DEFAULT 0,
  requests_declined INT DEFAULT 0,
  consultations_completed INT DEFAULT 0,
  earnings_cents INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONSULTATION QUEUE TABLE (FOR OVERFLOW HANDLING)
-- ============================================================================

CREATE TABLE IF NOT EXISTS consultation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES consultation_requests(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Priority scoring (higher = more urgent)
  priority INT DEFAULT 0,
  
  -- Queue position tracking
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  estimated_wait_seconds INT DEFAULT 300,
  
  -- Matching attempts
  match_attempts INT DEFAULT 0,
  last_match_attempt TIMESTAMPTZ,
  excluded_doctor_ids UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Auto-expire
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '15 minutes'),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PERFORMANCE INDEXES (CRITICAL FOR <500ms MATCHING)
-- ============================================================================

-- Doctor availability index (MOST IMPORTANT)
CREATE INDEX idx_doctors_available ON instant_doctors(status, instant_connect_enabled)
  WHERE status = 'available' AND instant_connect_enabled = true;

-- Doctor specialty index for filtered searches
CREATE INDEX idx_doctors_specialty ON instant_doctors(specialty, status)
  WHERE status = 'available';

-- Doctor language index
CREATE INDEX idx_doctors_languages ON instant_doctors USING GIN(languages)
  WHERE status = 'available';

-- Doctor response time for smart matching (fastest first)
CREATE INDEX idx_doctors_response_time ON instant_doctors(avg_response_time_seconds ASC)
  WHERE status = 'available' AND instant_connect_enabled = true;

-- Doctor rating for quality matching
CREATE INDEX idx_doctors_rating ON instant_doctors(rating DESC)
  WHERE status = 'available';

-- Consultation requests pending
CREATE INDEX idx_requests_pending ON consultation_requests(status, requested_at)
  WHERE status = 'pending';

-- Consultation requests by patient
CREATE INDEX idx_requests_patient ON consultation_requests(patient_id, status, created_at DESC);

-- Consultation requests by doctor
CREATE INDEX idx_requests_doctor ON consultation_requests(doctor_id, status, created_at DESC);

-- Queue priority ordering
CREATE INDEX idx_queue_priority ON consultation_queue(priority DESC, queued_at ASC)
  WHERE expires_at > NOW();

-- Notifications for doctor
CREATE INDEX idx_notifications_doctor ON doctor_notifications(doctor_id, read, created_at DESC)
  WHERE read = false;

-- Doctor heartbeat index (for real-time availability)
CREATE INDEX idx_doctors_heartbeat ON instant_doctors(last_heartbeat DESC)
  WHERE status = 'available';

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for instant_doctors
CREATE TRIGGER trigger_doctors_updated_at
  BEFORE UPDATE ON instant_doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger for instant_patients
CREATE TRIGGER trigger_patients_updated_at
  BEFORE UPDATE ON instant_patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger for consultation_requests
CREATE TRIGGER trigger_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to log doctor availability changes
CREATE OR REPLACE FUNCTION log_doctor_availability_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Close previous session
    UPDATE doctor_availability_log
    SET session_end = NOW(),
        session_duration_minutes = EXTRACT(EPOCH FROM (NOW() - session_start)) / 60
    WHERE doctor_id = NEW.id AND session_end IS NULL;
    
    -- Start new session
    INSERT INTO doctor_availability_log (doctor_id, status, previous_status)
    VALUES (NEW.id, NEW.status, OLD.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_availability
  AFTER UPDATE ON instant_doctors
  FOR EACH ROW EXECUTE FUNCTION log_doctor_availability_change();

-- Function to update doctor metrics after consultation
CREATE OR REPLACE FUNCTION update_doctor_metrics_after_consultation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status = 'in_progress' THEN
    UPDATE instant_doctors
    SET 
      total_consultations = total_consultations + 1,
      -- Update average response time
      avg_response_time_seconds = (
        (avg_response_time_seconds * total_consultations + 
         COALESCE(EXTRACT(EPOCH FROM (NEW.accepted_at - NEW.notified_at))::INT, avg_response_time_seconds))
        / (total_consultations + 1)
      )
    WHERE id = NEW.doctor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_doctor_metrics
  AFTER UPDATE ON consultation_requests
  FOR EACH ROW EXECUTE FUNCTION update_doctor_metrics_after_consultation();

-- Function to find best available doctor (Smart Matching)
CREATE OR REPLACE FUNCTION find_best_doctor(
  p_specialty TEXT DEFAULT NULL,
  p_language TEXT DEFAULT NULL,
  p_urgency TEXT DEFAULT 'routine',
  p_excluded_ids UUID[] DEFAULT ARRAY[]::UUID[]
)
RETURNS TABLE (
  doctor_id UUID,
  doctor_name TEXT,
  specialty TEXT,
  match_score INT,
  estimated_response_seconds INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.specialty,
    (
      -- Base score
      100
      -- Specialty match bonus
      + CASE WHEN p_specialty IS NULL OR d.specialty = p_specialty THEN 50 ELSE 0 END
      -- Language match bonus
      + CASE WHEN p_language IS NULL OR p_language = ANY(d.languages) THEN 30 ELSE 0 END
      -- Fast response bonus (max 60 points for <30s avg)
      + GREATEST(0, 60 - d.avg_response_time_seconds)
      -- High rating bonus
      + (d.rating * 10)::INT
      -- High acceptance rate bonus
      + (d.acceptance_rate / 5)::INT
      -- Urgency priority (emergency gets faster doctors)
      + CASE WHEN p_urgency = 'emergency' THEN 100 ELSE 0 END
    )::INT AS match_score,
    d.avg_response_time_seconds AS estimated_response_seconds
  FROM instant_doctors d
  WHERE 
    d.status = 'available'
    AND d.instant_connect_enabled = true
    AND d.last_heartbeat > NOW() - INTERVAL '60 seconds'
    AND NOT (d.id = ANY(p_excluded_ids))
    AND (p_specialty IS NULL OR d.specialty = p_specialty)
  ORDER BY match_score DESC, d.avg_response_time_seconds ASC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE instant_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE instant_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_notifications ENABLE ROW LEVEL SECURITY;

-- Doctors can see all available doctors (for patient view)
CREATE POLICY "Public doctors are viewable by everyone"
  ON instant_doctors FOR SELECT
  USING (status IN ('available', 'busy'));

-- Doctors can update their own profile
CREATE POLICY "Doctors can update own profile"
  ON instant_doctors FOR UPDATE
  USING (user_id = current_setting('app.current_user_id', true));

-- Patients can view their own data
CREATE POLICY "Patients can view own data"
  ON instant_patients FOR SELECT
  USING (user_id = current_setting('app.current_user_id', true));

-- Patients can update their own data
CREATE POLICY "Patients can update own data"
  ON instant_patients FOR UPDATE
  USING (user_id = current_setting('app.current_user_id', true));

-- Consultation requests visible to involved parties
CREATE POLICY "Users can view own consultations"
  ON consultation_requests FOR SELECT
  USING (
    patient_id IN (SELECT id FROM instant_patients WHERE user_id = current_setting('app.current_user_id', true))
    OR doctor_id IN (SELECT id FROM instant_doctors WHERE user_id = current_setting('app.current_user_id', true))
  );

-- Doctors see their own notifications
CREATE POLICY "Doctors see own notifications"
  ON doctor_notifications FOR SELECT
  USING (doctor_id IN (SELECT id FROM instant_doctors WHERE user_id = current_setting('app.current_user_id', true)));

-- ============================================================================
-- SEED DATA - German Select Medical Team
-- ============================================================================

INSERT INTO instant_doctors (
  external_doctor_id, name, specialty, subspecialties, qualifications,
  languages, rating, total_reviews, status, instant_connect_enabled,
  consultation_fee_cents, avg_response_time_seconds, acceptance_rate
) VALUES
-- Dr. Sherif Akram Metwalli - Founder
('dr-metwalli', 'Dr. med. Sherif Akram Metwalli, M.Sc.', 'Plastic & Reconstructive Surgery',
 ARRAY['Post-Bariatric Surgery', 'Body Contouring', 'Facial Surgery'],
 ARRAY['Triple Board-Certified German Facharzt', '20+ Years Experience', 'German Select Founder'],
 ARRAY['de', 'en', 'ar'], 4.9, 247, 'available', true, 15000, 35, 98.5),

-- Dr. Sherif Aly - Chief Bariatric
('dr-sherif-aly', 'Dr. Sherif Aly, FACS', 'Bariatric Surgery',
 ARRAY['Gastric Sleeve', 'Gastric Bypass', 'Antireflux Surgery', 'Colorectal Surgery'],
 ARRAY['Fellow American College of Surgeons (FACS)', 'Chief Consultant Nagold Hospital Germany'],
 ARRAY['de', 'en', 'ar'], 4.95, 487, 'available', true, 20000, 30, 99.0),

-- Dr. Hesham El Zahi - General Surgery
('dr-hesham-elzahi', 'Dr. Hesham El Zahi', 'General & Gastrointestinal Surgery',
 ARRAY['Laparoscopic Surgery', 'GI Surgery', 'Hernia Repair'],
 ARRAY['German Board Certified', 'St. Augustinus Krankenhaus Düren'],
 ARRAY['de', 'en', 'ar'], 4.8, 156, 'available', true, 16000, 40, 95.0),

-- Dr. Weber - Orthopedics
('dr-weber', 'Dr. L. Weber', 'Orthopedics',
 ARRAY['Joint Surgery', 'Sports Medicine', 'Arthroscopy', 'Sports Injuries'],
 ARRAY['German Board Certified', 'Head of Arthroscopy Unit', 'Senior Consultant'],
 ARRAY['de', 'en'], 4.8, 189, 'available', true, 18000, 45, 94.0),

-- Dr. Müller - Cardiology
('dr-muller', 'Dr. K. Müller', 'Cardiology',
 ARRAY['Interventional Cardiology', 'Cardiac Imaging', 'Heart Disease'],
 ARRAY['Assoc. Prof of Cardiology', 'Deputy Head of Cardiology', 'University Hospital Kiel'],
 ARRAY['de', 'en'], 4.9, 156, 'available', true, 20000, 38, 97.0),

-- Dr. Schmidt - Nutrition
('dr-schmidt', 'Dr. A. Schmidt', 'Nutritional Medicine',
 ARRAY['Bariatric Nutrition', 'Metabolic Health', 'Weight Management'],
 ARRAY['Nutritional Medicine Specialist', 'German Board Certified'],
 ARRAY['de', 'en'], 4.7, 203, 'available', true, 12000, 25, 99.0),

-- Dr. Fischer - Bariatric
('dr-fischer', 'Dr. H. Fischer', 'Bariatric Surgery',
 ARRAY['Gastric Sleeve', 'Gastric Bypass', 'Revision Surgery'],
 ARRAY['Consultant Bariatric and Antireflux Surgery', 'Colorectal Surgery'],
 ARRAY['de', 'en', 'ar'], 4.9, 312, 'available', true, 18000, 42, 96.0),

-- Dr. Bauer - Urology
('dr-bauer', 'Dr. M. Bauer', 'Urology & Andrology',
 ARRAY['Minimally Invasive Surgery', 'Mens Health', 'Prostate Care'],
 ARRAY['Hümmling Hospital Sögel', 'German Board Certified'],
 ARRAY['de', 'en'], 4.8, 124, 'available', true, 16000, 50, 92.0),

-- Dr. Koch - Anesthesia
('dr-koch', 'Dr. P. Koch', 'Anesthesia & Pain Management',
 ARRAY['Intensive Care', 'Pain Therapy', 'Regional Anesthesia'],
 ARRAY['Dept. Head Medias Hospital Germany', 'Academic Teaching Hospital'],
 ARRAY['de', 'en'], 4.9, 98, 'offline', true, 14000, 35, 98.0),

-- Dr. Hoffmann - Internal Medicine
('dr-hoffmann', 'Dr. J. Hoffmann', 'Internal Medicine & Gastroenterology',
 ARRAY['Palliative Medicine', 'Emergency Medicine', 'Hygiene'],
 ARRAY['Facharzt für Innere Medizin', 'German Board Certified'],
 ARRAY['de', 'en'], 4.7, 167, 'available', true, 15000, 48, 93.0)

ON CONFLICT (external_doctor_id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  subspecialties = EXCLUDED.subspecialties,
  qualifications = EXCLUDED.qualifications,
  languages = EXCLUDED.languages,
  updated_at = NOW();

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Available doctors with all relevant info
CREATE OR REPLACE VIEW v_available_doctors AS
SELECT 
  d.id,
  d.external_doctor_id,
  d.name,
  d.specialty,
  d.subspecialties,
  d.qualifications,
  d.languages,
  d.rating,
  d.total_reviews,
  d.total_consultations,
  d.avg_response_time_seconds,
  d.acceptance_rate,
  d.consultation_fee_cents,
  d.profile_image_url,
  d.status,
  d.last_heartbeat,
  CASE 
    WHEN d.last_heartbeat > NOW() - INTERVAL '60 seconds' THEN true 
    ELSE false 
  END AS is_online,
  (
    SELECT COUNT(*) FROM consultation_requests cr 
    WHERE cr.doctor_id = d.id AND cr.status IN ('matched', 'accepted')
  )::INT AS current_queue_size
FROM instant_doctors d
WHERE d.status = 'available' 
  AND d.instant_connect_enabled = true;

-- View: Consultation statistics
CREATE OR REPLACE VIEW v_consultation_stats AS
SELECT 
  DATE_TRUNC('day', requested_at) AS date,
  COUNT(*) AS total_requests,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled,
  COUNT(*) FILTER (WHERE status = 'declined') AS declined,
  AVG(wait_time_seconds) FILTER (WHERE wait_time_seconds IS NOT NULL) AS avg_wait_seconds,
  AVG(call_duration_seconds) FILTER (WHERE call_duration_seconds IS NOT NULL) AS avg_call_duration,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY wait_time_seconds) AS p90_wait_seconds
FROM consultation_requests
WHERE requested_at > NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', requested_at)
ORDER BY date DESC;

-- View: Doctor performance metrics
CREATE OR REPLACE VIEW v_doctor_performance AS
SELECT 
  d.id,
  d.name,
  d.specialty,
  d.rating,
  d.total_consultations,
  d.acceptance_rate,
  d.avg_response_time_seconds,
  (
    SELECT COUNT(*) FROM consultation_requests cr 
    WHERE cr.doctor_id = d.id AND cr.status = 'completed' 
    AND cr.created_at > NOW() - INTERVAL '7 days'
  ) AS consultations_last_7_days,
  (
    SELECT AVG(patient_rating) FROM consultation_requests cr 
    WHERE cr.doctor_id = d.id AND cr.patient_rating IS NOT NULL
  ) AS avg_patient_rating,
  (
    SELECT SUM(consultation_fee_cents) / 100.0 FROM consultation_requests cr 
    WHERE cr.doctor_id = d.id AND cr.status = 'completed' 
    AND cr.created_at > NOW() - INTERVAL '30 days'
  ) AS earnings_last_30_days
FROM instant_doctors d;

-- ============================================================================
-- REALTIME SUBSCRIPTIONS (Supabase specific)
-- ============================================================================

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE instant_doctors;
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE doctor_notifications;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE instant_doctors IS 'Doctors registered for instant connect telemedicine service';
COMMENT ON TABLE instant_patients IS 'Patients using instant connect telemedicine service';
COMMENT ON TABLE consultation_requests IS 'Queue of consultation requests with full lifecycle tracking';
COMMENT ON TABLE doctor_notifications IS 'Real-time notifications for doctors (new requests, etc.)';
COMMENT ON TABLE consultation_queue IS 'Overflow queue for requests without immediate doctor match';
COMMENT ON FUNCTION find_best_doctor IS 'Smart matching algorithm to find best available doctor in <500ms';

-- ============================================================================
-- GRANT PERMISSIONS (adjust based on your auth setup)
-- ============================================================================

-- For API access (through Supabase client)
GRANT SELECT ON v_available_doctors TO anon, authenticated;
GRANT SELECT ON v_consultation_stats TO authenticated;
GRANT SELECT ON v_doctor_performance TO authenticated;

GRANT SELECT, INSERT, UPDATE ON instant_doctors TO authenticated;
GRANT SELECT, INSERT, UPDATE ON instant_patients TO authenticated;
GRANT SELECT, INSERT, UPDATE ON consultation_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON doctor_notifications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON consultation_queue TO authenticated;
GRANT SELECT, INSERT ON doctor_availability_log TO authenticated;

-- Sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
