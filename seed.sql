-- ============================================================================
-- German Select Health Platform - SelectCareOS
-- Seed Data for Development & Testing
-- Version: 1.0.0
-- ============================================================================

-- ============================================================================
-- USERS & PROFILES
-- ============================================================================

-- Admin user
INSERT OR IGNORE INTO users (id, email, name, phone, role, status, email_verified) VALUES
  ('admin-001', 'admin@germanselect.org', 'System Administrator', '+49 30 1234567', 'admin', 'active', 1);

-- Doctors
INSERT OR IGNORE INTO users (id, email, name, phone, role, status, email_verified) VALUES
  ('doc-001', 'l.weber@germanselect.org', 'Dr. Lukas Weber', '+49 431 111222', 'doctor', 'active', 1),
  ('doc-002', 'k.mueller@germanselect.org', 'Dr. Klaus Müller', '+49 431 222333', 'doctor', 'active', 1),
  ('doc-003', 'a.schmidt@germanselect.org', 'Dr. Anna Schmidt', '+49 431 333444', 'doctor', 'active', 1),
  ('doc-004', 'm.hassan@germanselect.org', 'Mohamed Hassan', '+20 100 1234567', 'doctor', 'active', 1),
  ('doc-005', 's.metwalli@germanselect.org', 'Dr. Sherif Akram Metwalli', '+49 521 555666', 'doctor', 'active', 1);

-- Doctor profiles
INSERT OR IGNORE INTO doctor_profiles (id, user_id, license_number, specialty, hospital, languages, consultation_fee, rating, review_count, telemedicine_enabled, availability_status) VALUES
  ('dprof-001', 'doc-001', 'GMC-2024-LW-1234', 'Orthopedic Surgery', 'German Select Egypt', '["German", "English"]', 80.00, 4.9, 156, 1, 'online'),
  ('dprof-002', 'doc-002', 'GMC-2024-KM-4521', 'Cardiology', 'University Hospital Kiel', '["German", "English"]', 100.00, 4.8, 342, 1, 'online'),
  ('dprof-003', 'doc-003', 'GMC-2024-AS-7890', 'Nutrition & Dietetics', 'SelectCareOS Wellness', '["German", "English"]', 60.00, 4.7, 89, 1, 'online'),
  ('dprof-004', 'doc-004', 'EGY-2024-MH-5678', 'Physiotherapy', 'Red Sea Recovery Center', '["Arabic", "English", "German"]', 50.00, 4.8, 234, 1, 'busy'),
  ('dprof-005', 'doc-005', 'GMC-2024-SM-9012', 'Bariatric & Colorectal Surgery', 'Bielefeld University Hospitals', '["German", "English", "Arabic"]', 120.00, 4.9, 278, 1, 'online');

-- Test patients
INSERT OR IGNORE INTO users (id, email, name, phone, role, status, email_verified) VALUES
  ('pat-001', 'max.mustermann@email.de', 'Max Mustermann', '+49 151 1234 5678', 'patient', 'active', 1),
  ('pat-002', 'anna.weber@email.de', 'Anna Weber', '+49 152 2345 6789', 'patient', 'active', 1),
  ('pat-003', 'karl.fischer@email.de', 'Karl Fischer', '+49 153 3456 7890', 'patient', 'pending', 0);

-- Patient profiles
INSERT OR IGNORE INTO patient_profiles (id, user_id, patient_id, date_of_birth, gender, blood_type, height_cm, weight_kg, allergies, conditions, membership_tier, select_score, recovery_progress, preferred_language) VALUES
  ('pprof-001', 'pat-001', 'GS-2024-0847', '1978-03-15', 'male', 'A+', 178, 78.5, '["Penicillin"]', '["Hypertension (controlled)"]', 'gold', 85, 75, 'de'),
  ('pprof-002', 'pat-002', 'GS-2024-0848', '1985-07-22', 'female', 'O+', 165, 62.0, '[]', '[]', 'silver', 72, 60, 'de'),
  ('pprof-003', 'pat-003', 'GS-2024-0849', '1970-11-08', 'male', 'B+', 182, 95.0, '["Aspirin"]', '["Type 2 Diabetes"]', 'standard', 45, 0, 'de');

-- Care team assignments
INSERT OR IGNORE INTO care_team_members (id, patient_id, doctor_id, role) VALUES
  ('ctm-001', 'pprof-001', 'dprof-001', 'attending'),
  ('ctm-002', 'pprof-001', 'dprof-002', 'consulting'),
  ('ctm-003', 'pprof-001', 'dprof-003', 'specialist'),
  ('ctm-004', 'pprof-001', 'dprof-004', 'therapist');

-- ============================================================================
-- APPOINTMENTS
-- ============================================================================

INSERT OR IGNORE INTO appointments (id, patient_id, doctor_id, type, status, scheduled_at, duration_minutes, location_type, reason) VALUES
  ('apt-001', 'pprof-001', 'dprof-001', 'follow-up', 'completed', '2024-10-15 09:00:00', 30, 'in_person', 'Post-surgery follow-up'),
  ('apt-002', 'pprof-001', 'dprof-002', 'consultation', 'scheduled', '2024-10-22 10:00:00', 30, 'telemedicine', 'Cardiology consultation'),
  ('apt-003', 'pprof-001', 'dprof-004', 'therapy', 'scheduled', '2024-10-29 14:00:00', 60, 'in_person', 'Mobility training session'),
  ('apt-004', 'pprof-001', 'dprof-003', 'consultation', 'scheduled', '2024-11-05 14:00:00', 30, 'telemedicine', 'Nutrition plan review');

-- ============================================================================
-- VITALS (Last 7 days of sample data)
-- ============================================================================

INSERT OR IGNORE INTO vitals (id, patient_id, recorded_at, source, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight_kg, blood_glucose, oxygen_saturation, steps, active_minutes, sleep_duration_minutes, sleep_score) VALUES
  ('vit-001', 'pprof-001', datetime('now', '-7 days'), 'device', 74, 130, 84, 36.5, 79.2, 98, 97, 5420, 35, 425, 78),
  ('vit-002', 'pprof-001', datetime('now', '-6 days'), 'device', 73, 128, 83, 36.6, 79.0, 96, 98, 6100, 42, 440, 82),
  ('vit-003', 'pprof-001', datetime('now', '-5 days'), 'device', 75, 132, 85, 36.4, 78.8, 102, 97, 4800, 30, 410, 75),
  ('vit-004', 'pprof-001', datetime('now', '-4 days'), 'device', 72, 126, 82, 36.6, 78.7, 94, 98, 7200, 55, 465, 85),
  ('vit-005', 'pprof-001', datetime('now', '-3 days'), 'device', 71, 125, 81, 36.5, 78.6, 95, 99, 8100, 60, 450, 84),
  ('vit-006', 'pprof-001', datetime('now', '-2 days'), 'device', 73, 127, 82, 36.7, 78.5, 97, 98, 6500, 48, 430, 80),
  ('vit-007', 'pprof-001', datetime('now', '-1 days'), 'device', 72, 128, 82, 36.6, 78.5, 95, 98, 4230, 45, 442, 82);

-- ============================================================================
-- CONNECTED DEVICES
-- ============================================================================

INSERT OR IGNORE INTO connected_devices (id, patient_id, device_type, device_name, manufacturer, model, connection_status, battery_level, last_sync_at) VALUES
  ('dev-001', 'pprof-001', 'smartwatch', 'Apple Watch Series 9', 'Apple', 'Series 9', 'connected', 72, datetime('now', '-30 minutes')),
  ('dev-002', 'pprof-001', 'scale', 'Withings Body+', 'Withings', 'Body+', 'connected', 85, datetime('now', '-2 hours')),
  ('dev-003', 'pprof-001', 'ring', 'Oura Ring', 'Oura', 'Gen 3', 'disconnected', NULL, datetime('now', '-2 days'));

-- ============================================================================
-- PRESCRIPTIONS
-- ============================================================================

INSERT OR IGNORE INTO prescriptions (id, patient_id, doctor_id, medication_name, generic_name, dosage, frequency, instructions, quantity, duration_days, refills_allowed, refills_used, status, pharmacy_name, pharmacy_address, pharmacy_phone, digital_signature, prescribed_at, expires_at) VALUES
  ('rx-001', 'pprof-001', 'dprof-002', 'Metformin 500mg', 'Metformin Hydrochloride', '500mg', 'Twice daily with meals', 'Take with food to reduce stomach upset. Do not crush or chew tablets.', 180, 90, 3, 1, 'active', 'Apotheke am Markt', 'Marktplatz 5, 24103 Kiel', '+49 431 123456', 'SIGNED-2024-KM-001', '2024-10-20', '2025-10-20'),
  ('rx-002', 'pprof-001', 'dprof-002', 'Lisinopril 10mg', 'Lisinopril', '10mg', 'Once daily in morning', 'Take at the same time each day. Monitor blood pressure regularly.', 30, 30, 2, 0, 'active', 'Apotheke am Markt', 'Marktplatz 5, 24103 Kiel', '+49 431 123456', 'SIGNED-2024-KM-002', '2024-10-20', '2025-04-20'),
  ('rx-003', 'pprof-001', 'dprof-003', 'Vitamin D3 1000IU', 'Cholecalciferol', '1000IU', 'Once daily', 'Take with a meal containing fat for better absorption.', 60, 60, 0, 0, 'completed', 'DocMorris Online Pharmacy', 'Online', '+49 800 1234567', 'SIGNED-2024-AS-001', '2024-10-15', '2025-10-15');

-- ============================================================================
-- CARE TIMELINE
-- ============================================================================

INSERT OR IGNORE INTO care_timeline (id, patient_id, phase, title, description, week_number, start_date, end_date, status, progress_percent) VALUES
  ('tl-001', 'pprof-001', 'preparation', 'Initial Assessment', 'Complete medical evaluation and pre-surgery tests', 1, '2024-10-15', '2024-10-21', 'completed', 100),
  ('tl-002', 'pprof-001', 'recovery', 'Basic Rehabilitation', 'Light exercises and wound care', 2, '2024-10-22', '2024-10-28', 'current', 60),
  ('tl-003', 'pprof-001', 'recovery', 'Mobility Training', 'Increase range of motion and strength', 3, '2024-10-29', '2024-11-04', 'upcoming', 0),
  ('tl-004', 'pprof-001', 'recovery', 'Nutrition Plan', 'Dietary optimization for recovery', 4, '2024-11-05', '2024-11-11', 'upcoming', 0),
  ('tl-005', 'pprof-001', 'recovery', 'Advanced Strengthening', 'Progressive resistance training', 6, '2024-11-19', '2024-11-25', 'upcoming', 0);

-- ============================================================================
-- TASKS
-- ============================================================================

INSERT OR IGNORE INTO tasks (id, patient_id, timeline_id, title, category, due_date, due_time, status) VALUES
  ('task-001', 'pprof-001', 'tl-002', 'Take morning medication', 'medication', date('now'), '08:00', 'completed'),
  ('task-002', 'pprof-001', 'tl-002', 'Light mobility exercises', 'exercise', date('now'), '10:00', 'completed'),
  ('task-003', 'pprof-001', 'tl-002', 'Log breakfast', 'nutrition', date('now'), '09:00', 'pending'),
  ('task-004', 'pprof-001', 'tl-002', 'Physiotherapy session', 'appointment', date('now'), '14:00', 'pending');

-- ============================================================================
-- MESSAGES & CONVERSATIONS
-- ============================================================================

INSERT OR IGNORE INTO conversations (id, type, title, created_by) VALUES
  ('conv-001', 'direct', NULL, 'doc-001'),
  ('conv-002', 'direct', NULL, 'doc-003'),
  ('conv-003', 'care_team', 'Care Team - Max Mustermann', 'doc-001');

INSERT OR IGNORE INTO conversation_participants (id, conversation_id, user_id, role) VALUES
  ('cp-001', 'conv-001', 'doc-001', 'member'),
  ('cp-002', 'conv-001', 'pat-001', 'member'),
  ('cp-003', 'conv-002', 'doc-003', 'member'),
  ('cp-004', 'conv-002', 'pat-001', 'member');

INSERT OR IGNORE INTO messages (id, conversation_id, sender_id, content, created_at) VALUES
  ('msg-001', 'conv-001', 'doc-001', 'Your progress looks excellent! Keep up the good work with your exercises.', datetime('now', '-2 hours')),
  ('msg-002', 'conv-001', 'pat-001', 'Thank you, Dr. Weber! I have been following the plan carefully.', datetime('now', '-1 hour')),
  ('msg-003', 'conv-002', 'doc-003', 'I have updated your meal plan based on your latest blood work. Please check the app.', datetime('now', '-1 day')),
  ('msg-004', 'conv-002', 'pat-001', 'Thank you, Dr. Schmidt! I will review it today.', datetime('now', '-23 hours'));

-- ============================================================================
-- CARESELECT™ JOURNEYS PACKAGES
-- ============================================================================

INSERT OR IGNORE INTO packages (id, name, slug, tier, description, price, features, is_featured, display_order) VALUES
  ('pkg-001', 'Essential Journey', 'essential-journey', 'essential', 'Complete care package for your medical journey', 6500.00, '["German-certified surgeon", "Hospital stay (3-5 days)", "Basic accommodation", "Airport transfers", "Digital follow-up"]', 0, 1),
  ('pkg-002', 'Premium Journey', 'premium-journey', 'premium', 'Enhanced recovery experience with premium amenities', 12000.00, '["All Essential features", "5-star resort recovery", "Personal care coordinator", "Family accommodation", "Wellness treatments", "Daily check-ins"]', 1, 2),
  ('pkg-003', 'Crown Journey', 'crown-journey', 'crown', 'The ultimate medical tourism experience', 22000.00, '["All Premium features", "Private villa with chef", "24/7 medical supervision", "Yacht excursions", "VIP spa & concierge", "Executive health screening"]', 0, 3);

-- ============================================================================
-- ACCOMMODATIONS
-- ============================================================================

INSERT OR IGNORE INTO accommodations (id, name, type, star_rating, description, city, price_per_night, amenities, rating, review_count, is_recovery_friendly, medical_staff_available) VALUES
  ('acc-001', 'Steigenberger Resort', 'resort', 5, 'Luxury beachfront resort with world-class amenities', 'Hurghada', 180.00, '["Pool", "Spa", "Beach", "Room Service", "Fitness Center", "Restaurant"]', 4.9, 1250, 1, 0),
  ('acc-002', 'Recovery Villa', 'villa', 5, 'Private villa designed for medical recovery patients', 'Hurghada', 450.00, '["Private Pool", "Chef", "24/7 Staff", "Medical Equipment", "Garden", "Sea View"]', 5.0, 89, 1, 1),
  ('acc-003', 'Wellness Retreat', 'medical_spa', 4, 'Medical spa facility with recovery programs', 'El Gouna', 250.00, '["Spa", "Rehabilitation Center", "Nutrition", "Medical Staff", "Pool"]', 4.8, 342, 1, 1);

-- ============================================================================
-- EXCURSIONS
-- ============================================================================

INSERT OR IGNORE INTO excursions (id, name, type, description, duration_hours, price, location, recovery_week_minimum, intensity_level) VALUES
  ('exc-001', 'Yacht Day Trip', 'water_activity', 'Private yacht cruise along the Red Sea coast', 6, 350.00, 'Hurghada Marina', 2, 'low'),
  ('exc-002', 'Snorkeling Tour', 'water_activity', 'Guided snorkeling at pristine coral reefs', 4, 85.00, 'Giftun Island', 3, 'medium'),
  ('exc-003', 'Desert Safari', 'adventure', 'Quad biking and Bedouin dinner experience', 5, 120.00, 'Arabian Desert', 4, 'medium'),
  ('exc-004', 'Diving Course', 'water_activity', 'PADI certified beginner diving course', 16, 250.00, 'Red Sea', 6, 'high'),
  ('exc-005', 'Spa Day', 'wellness', 'Full day of pampering and relaxation', 8, 180.00, 'El Gouna', 1, 'low'),
  ('exc-006', 'Sunset Cruise', 'water_activity', 'Evening cruise with dinner and entertainment', 3, 95.00, 'Hurghada Marina', 1, 'low');

-- ============================================================================
-- WELLNESS TREATMENTS
-- ============================================================================

INSERT OR IGNORE INTO wellness_treatments (id, name, category, description, duration_minutes, price, benefits, recovery_compatible) VALUES
  ('wt-001', 'IV Vitamin Therapy', 'medical', 'Energy boost and immune support infusion', 45, 150.00, '["Energy boost", "Immune support", "Hydration", "Vitamin restoration"]', 1),
  ('wt-002', 'Medical Check-up', 'medical', 'Comprehensive health screening', 180, 450.00, '["Full blood work", "Cardiac screening", "Body composition", "Consultation"]', 1),
  ('wt-003', 'Skin Rejuvenation', 'anti_aging', 'LED therapy and microneedling treatment', 90, 280.00, '["Collagen boost", "Skin tightening", "Glow enhancement"]', 1),
  ('wt-004', 'Detox Program', 'spa', '5-day comprehensive cleanse program', 7200, 1200.00, '["Liver support", "Weight management", "Energy improvement", "Mental clarity"]', 1);

-- ============================================================================
-- MEMBERSHIPS
-- ============================================================================

INSERT OR IGNORE INTO memberships (id, patient_id, tier, status, price_monthly, started_at) VALUES
  ('mem-001', 'pprof-001', 'gold', 'active', 99.00, '2024-06-01'),
  ('mem-002', 'pprof-002', 'silver', 'active', 49.00, '2024-08-15');

-- ============================================================================
-- AUDIT LOG ENTRIES
-- ============================================================================

INSERT OR IGNORE INTO audit_log (id, user_id, action, resource_type, resource_id, ip_address, details) VALUES
  ('audit-001', 'pat-001', 'login', 'session', NULL, '192.168.1.100', '{"method": "password", "success": true}'),
  ('audit-002', 'pat-001', 'view', 'patient_profile', 'pprof-001', '192.168.1.100', '{"fields_accessed": ["vitals", "prescriptions"]}'),
  ('audit-003', 'doc-001', 'update', 'prescription', 'rx-001', '10.0.0.50', '{"changes": {"refills_used": [0, 1]}}');

-- ============================================================================
-- CONSENT RECORDS
-- ============================================================================

INSERT OR IGNORE INTO consent_records (id, user_id, consent_type, version, consented, ip_address) VALUES
  ('consent-001', 'pat-001', 'terms', '2024.1', 1, '192.168.1.100'),
  ('consent-002', 'pat-001', 'privacy', '2024.1', 1, '192.168.1.100'),
  ('consent-003', 'pat-001', 'telemedicine', '2024.1', 1, '192.168.1.100'),
  ('consent-004', 'pat-001', 'data_processing', '2024.1', 1, '192.168.1.100');
