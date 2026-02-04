# SelectCareOS™ MVP Specification Document v1.0
## German Select Medical Tourism Platform - Comprehensive Technical & Functional Specification

**Document Version:** 1.0  
**Last Updated:** February 4, 2026  
**Status:** Production Ready  
**Authors:** German Select Engineering Team  

---

# 📋 TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Platform Analysis - Current State](#2-platform-analysis---current-state)
3. [Part 1: Functional Specification Document (FSD)](#part-1-functional-specification-document-fsd)
4. [Part 2: Technical Specification Document (TSD)](#part-2-technical-specification-document-tsd)
5. [Part 3: MVP Development Roadmap](#part-3-mvp-development-roadmap)
6. [Part 4: Developer Handoff Package](#part-4-developer-handoff-package)

---

# 1. Executive Summary

## 1.1 Vision Statement

SelectCareOS™ is a groundbreaking digital health platform revolutionizing cross-border healthcare between Egypt and Germany. We combine German medical excellence with Red Sea therapeutic recovery, delivered through world-class telemedicine, intelligent booking systems, and AI-powered healthcare solutions.

## 1.2 Problem Statement

| Problem | Impact | Our Solution |
|---------|--------|--------------|
| German healthcare waitlists | 6+ months for elective procedures | 2-6 weeks with SelectCareOS |
| High European medical costs | €22,000+ for gastric sleeve | €7,500 with German surgeons |
| Fragmented medical tourism | Poor coordination, communication gaps | Integrated end-to-end platform |
| Post-op recovery challenges | Limited monitoring, poor outcomes | Red Sea therapeutic recovery + 12mo digital follow-up |
| Language barriers | Miscommunication, safety risks | Native German/English/Arabic support |

## 1.3 Target Market

### Primary Markets
- **German Patients**: 83M population, high healthcare costs, long waitlists
- **Medical Tourists**: 14-20M annually worldwide, growing 15-25% YoY
- **Expats in MENA**: 500K+ Germans in UAE, Egypt, Qatar

### Secondary Markets
- UK, Switzerland, Austria, Gulf States

## 1.4 Competitive Advantage

| Differentiator | SelectCareOS | Turkish Clinics | Thai Medical Tourism |
|----------------|--------------|-----------------|---------------------|
| **Surgeon Quality** | German Board-Certified | Turkish Licensed | Thai Licensed |
| **Price vs Germany** | 50-65% savings | 70-80% savings | 60-70% savings |
| **Digital Platform** | Full integration | Minimal | Basic |
| **Post-Op Monitoring** | 12mo IoT/AI | None | Limited |
| **Recovery Experience** | 5-star Red Sea resorts | Hotel rooms | Hospital/Hotel |
| **Language Support** | DE/EN/AR native | EN/TR | EN/TH |

## 1.5 Revenue Model

| Revenue Stream | Description | Target (Year 1) |
|----------------|-------------|-----------------|
| Consultation Commission | 20% platform fee | €150K |
| Package Booking Fees | 15% on surgeries/retreats | €400K |
| Premium Subscriptions | €29-199/mo patient plans | €100K |
| Affiliate Program | 5-15% partner commissions | €50K |
| Marketplace | 12-22% product margins | €75K |
| **Total Year 1 Target** | | **€775K** |

---

# 2. Platform Analysis - Current State

## 2.1 Existing Implementation (v2.5.0)

SelectCareOS already has significant functionality implemented:

### ✅ Completed Features

#### Core Platform
- **Technology Stack**: Hono (TypeScript) + Cloudflare Pages/Workers + D1 Database
- **91 TypeScript Files** across services, routes, pages, components
- **31 Automated Tests** passing with comprehensive coverage

#### Telemedicine System (Instant Connect v2.3.0)
- Real-time video consultations via Jitsi Meet (FREE, no API key)
- Smart doctor-patient matching with AI scoring
- Priority queue management (Emergency > Urgent > Routine)
- Doctor dashboard with schedule, earnings, availability
- Multi-language support (EN/DE/AR/FR)

#### Booking System
- Three consultation types: Online, Onsite, Hybrid
- Stripe payment integration (ready for production)
- Commission calculation (20% consultation, 15% packages)
- Affiliate tracking and commission system

#### Medical Retreats & Accommodations
- 4 Medical Retreat programs (Longevity, Weight Loss, Recovery, Detox)
- 5 SELECT Hotels (5-star properties in Hurghada)
- Package builder with add-ons

#### AI Health Features (MediSense AI Pro v3.0)
- 227+ symptoms across 14 body systems (ICD-11 aligned)
- 37 conditions with SNOMED-CT coding
- 21 medications with drug interaction checking
- 4-level urgency triage
- Fuzzy symptom matching

#### User Management
- Patient, Doctor, Admin, Affiliate account types
- JWT authentication with role-based access
- Premium subscription tiers (Free, Basic €29, Plus €79, Elite €199)

#### Gamification (SelectPoints)
- 5 reward tiers (Bronze to Diamond)
- Points earning/redemption system
- Achievement badges

### 🔄 Partially Implemented

| Feature | Status | Gap |
|---------|--------|-----|
| Video Consultation Room | 70% | Missing: screen share, recording, notes |
| Retreat Booking Flow | 60% | Missing: real-time availability, cart integration |
| Medical Records | 40% | Missing: file encryption, FHIR sync |
| Push Notifications | 30% | Missing: FCM integration, scheduling |
| Payment Processing | 80% | Missing: Egyptian payment methods |

### ❌ Not Yet Implemented

| Feature | Priority | Estimated Effort |
|---------|----------|------------------|
| WebRTC Direct Video | High | 3 weeks |
| Medical File E2E Encryption | High | 2 weeks |
| HL7 FHIR EHR Integration | Medium | 4 weeks |
| Wearable Device Integration | Medium | 3 weeks |
| Native Mobile Apps | Low | 8 weeks |

---

# PART 1: FUNCTIONAL SPECIFICATION DOCUMENT (FSD)

## 3. User Personas

### 3.1 Patient Personas

#### Persona 1: Klaus (German Patient)
```
Name: Klaus Müller
Age: 52
Location: Munich, Germany
Occupation: IT Manager
Medical Need: Gastric Sleeve Surgery

Background:
- BMI: 42, multiple comorbidities
- German insurance won't cover bariatric surgery
- 8-month waitlist for consultation in Germany
- Budget: €10,000-15,000 total

Goals:
- Find German-quality surgery at affordable price
- Minimal time away from work (2-3 weeks)
- Comprehensive post-op support

Pain Points:
- Doesn't trust "cheap" Turkish clinics
- Worried about language barriers
- Needs ongoing care coordination

Tech Comfort: Medium (smartphone, email, Zoom)
Languages: German (native), English (basic)
```

#### Persona 2: Ahmed (Egyptian Expat)
```
Name: Ahmed Hassan
Age: 38
Location: Dubai, UAE (Egyptian citizen)
Occupation: Engineer
Medical Need: Post-bariatric body contouring

Background:
- Lost 60kg after gastric sleeve 2 years ago
- Excess skin causing discomfort
- Wants surgery + recovery vacation in home country

Goals:
- Combine medical procedure with family visit
- Luxury recovery experience
- Arabic-speaking medical staff

Pain Points:
- Limited vacation time (3 weeks max)
- Coordinating care across countries
- Ensuring quality equals German standards

Tech Comfort: High (uses multiple apps daily)
Languages: Arabic (native), English (fluent)
```

#### Persona 3: Sarah (Medical Tourist)
```
Name: Sarah Johnson
Age: 45
Location: London, UK
Occupation: Marketing Director
Medical Need: Facelift + recovery retreat

Background:
- NHS won't cover cosmetic procedures
- UK private quotes: £20,000+
- Wants discreet recovery away from home

Goals:
- Natural-looking results from expert surgeon
- Luxury, private recovery environment
- Return home looking refreshed, not "worked on"

Pain Points:
- Concerned about "medical tourism" stigma
- Needs high-touch, premium experience
- Flight/travel during recovery

Tech Comfort: High (iPhone power user)
Languages: English (native)
```

### 3.2 Provider Personas

#### Persona 4: Dr. Sherif (Lead Surgeon)
```
Name: Dr. med. Sherif A. Metwalli
Age: 48
Location: Germany + Hurghada
Specialization: Plastic & Reconstructive Surgery
Experience: 20+ years, German Board Certified

Background:
- Founder of German Select
- Triple board-certified
- Performed 3,000+ procedures

Goals:
- Grow patient volume through digital channels
- Maintain German quality standards remotely
- Build international reputation

Pain Points:
- Managing schedule across locations
- Patient communication in multiple languages
- Documentation compliance (German + Egyptian regulations)

Tech Requirements:
- Efficient scheduling across time zones
- Quick access to patient records
- Video consultation platform
```

#### Persona 5: Maria (CRM Staff)
```
Name: Maria Schneider
Age: 32
Location: Hurghada, Egypt (German expat)
Role: Patient Care Coordinator

Background:
- Nursing background
- Fluent German, English, basic Arabic
- Handles patient journey coordination

Goals:
- Smooth patient experience from inquiry to discharge
- Minimize admin overhead
- Quick response to patient questions

Pain Points:
- Juggling multiple communication channels
- Manual tracking of patient status
- Follow-up scheduling complexity

Tech Requirements:
- Unified inbox for patient messages
- Booking calendar with automation
- Quick access to patient info
```

### 3.3 Admin Persona

#### Persona 6: Thomas (Platform Admin)
```
Name: Thomas Weber
Age: 40
Location: Munich, Germany
Role: Operations Director

Background:
- Healthcare IT management experience
- MBA with healthcare focus
- Responsible for platform operations

Goals:
- Revenue growth and profitability
- Compliance with HIPAA/GDPR
- Operational efficiency

Tech Requirements:
- Real-time analytics dashboard
- Financial reporting
- User and doctor management
- Compliance monitoring
```

---

## 4. User Stories & Acceptance Criteria

### 4.1 Telemedicine User Stories

#### US-TM-001: Patient Books Video Consultation
```
As a Patient,
I want to book a video consultation with a specialist,
So that I can discuss my medical condition without traveling.

Acceptance Criteria:
□ Patient can search doctors by specialty, language, rating
□ Available time slots displayed in patient's local time zone
□ Booking confirmation sent via email and SMS
□ Calendar invite generated with video link
□ Reminder sent 24hr and 1hr before appointment
□ Consultation fee clearly displayed before booking
```

#### US-TM-002: Patient Joins Waiting Room
```
As a Patient,
I want to join a virtual waiting room before my consultation,
So that the doctor knows I'm ready and can test my devices.

Acceptance Criteria:
□ Join button activates 10 minutes before scheduled time
□ Device test wizard checks camera, mic, speaker, network
□ Queue position and estimated wait time displayed
□ Patient can see doctor's status (online, with another patient)
□ Visual indicator when doctor is ready to start
□ Option to message doctor with pre-consultation notes
```

#### US-TM-003: Doctor Conducts Video Consultation
```
As a Doctor,
I want to conduct a video consultation with clinical tools,
So that I can provide the same quality care as in-person.

Acceptance Criteria:
□ Video call connects with HD quality (720p minimum)
□ Screen sharing available for viewing medical images
□ In-session note-taking with auto-save every 30 seconds
□ Timer shows consultation duration
□ Chat panel for sharing links/instructions
□ One-click prescription generation
□ End call with summary and follow-up options
```

#### US-TM-004: Session Recording (Consent-Based)
```
As a Doctor,
I want to record consultations with patient consent,
So that patients can review advice and I have documentation.

Acceptance Criteria:
□ Recording requires explicit patient consent (button click)
□ Visual recording indicator visible to both parties
□ Recording stored encrypted in patient's medical records
□ Patient can download recording within 30 days
□ Automatic deletion after retention period (configurable)
□ HIPAA/GDPR compliant storage and access logging
```

### 4.2 Booking System User Stories

#### US-BK-001: Patient Searches for Doctors
```
As a Patient,
I want to search for doctors by multiple criteria,
So that I can find the best specialist for my needs.

Acceptance Criteria:
□ Filter by specialty (dropdown with 15+ specialties)
□ Filter by language (German, English, Arabic, French)
□ Filter by availability (next 24hr, this week, specific date)
□ Filter by consultation type (Online, Onsite, Hybrid)
□ Filter by price range (slider €50-€500)
□ Sort by rating, price, experience, availability
□ Results show: photo, name, specialty, rating, fee, languages
```

#### US-BK-002: Patient Books Onsite Consultation
```
As a Patient,
I want to book an in-person consultation at the clinic,
So that I can be physically examined by the doctor.

Acceptance Criteria:
□ Clinic address displayed with map integration
□ Directions from Hurghada airport shown
□ Available dates/times displayed
□ Option to add airport transfer (+€50)
□ Option to book same-day accommodation
□ Confirmation includes clinic address, arrival instructions
□ QR code for check-in at reception
```

#### US-BK-003: Patient Books Hybrid Consultation
```
As a Patient,
I want to book a hybrid consultation with Egyptian + German doctors,
So that I get local expertise combined with German specialist opinion.

Acceptance Criteria:
□ Select Egyptian specialist (required, onsite)
□ Select German consultant (required, online)
□ System shows overlapping availability in both time zones
□ Combined pricing displayed (both fees + platform commission)
□ Single booking ID created for both doctors
□ Egyptian doctor receives patient info and German consultant link
□ German consultant sees live video feed from examination
□ Joint notes capability for both doctors
```

### 4.3 Retreat Booking User Stories

#### US-RT-001: Patient Browses Retreat Catalog
```
As a Patient,
I want to browse therapeutic retreat options,
So that I can find a recovery program that suits my needs.

Acceptance Criteria:
□ Catalog shows 4+ retreat categories (Recovery, Longevity, Weight Loss, Detox)
□ Each retreat displays: name, duration, price range, rating, image
□ Filter by category, duration, price range, dates
□ Retreat detail page shows:
  - Day-by-day medical program
  - Inclusions/exclusions
  - Accommodation details
  - Photo gallery (8+ images)
  - Reviews from past patients
□ "Check Availability" button shows real-time calendar
```

#### US-RT-002: Patient Builds All-Inclusive Package
```
As a Patient,
I want to build a customized retreat package,
So that I can combine treatments, accommodation, and activities.

Acceptance Criteria:
□ Start with procedure selection (e.g., Gastric Sleeve €7,500)
□ Add retreat program (e.g., Post-Surgery Recovery €4,500)
□ Select accommodation tier (4-star €120/night, 5-star €280/night)
□ Add optional excursions (diving €150, safari €120, etc.)
□ Add optional treatments (spa, physiotherapy, etc.)
□ Real-time price calculator shows:
  - Line items with individual prices
  - Subtotal before discount
  - Package discount (if applicable)
  - Final total with currency selection (EUR/USD)
□ "Add to Cart" saves package for later or proceeds to checkout
```

#### US-RT-003: Patient Completes Retreat Booking
```
As a Patient,
I want to complete my retreat booking with payment,
So that my dates and services are confirmed.

Acceptance Criteria:
□ Booking summary shows all selected items
□ Pre-arrival medical questionnaire triggered
□ 30% deposit option or full payment
□ Payment methods: Card (Stripe), PayPal, Bank Transfer
□ Multi-currency support (EUR, USD, GBP, CHF)
□ Confirmation email includes:
  - Booking reference number
  - Itinerary PDF
  - Pre-arrival checklist
  - Contact information for patient coordinator
□ Dashboard shows booking status (Confirmed, Awaiting Deposit, etc.)
```

### 4.4 User Management User Stories

#### US-UM-001: Patient Registration
```
As a New Patient,
I want to create an account quickly,
So that I can start exploring services and booking consultations.

Acceptance Criteria:
□ Email + password registration (minimum 8 chars, 1 uppercase, 1 number)
□ Social login options (Google, Apple)
□ Email verification required within 24 hours
□ Basic profile: name, email, phone, country, language preference
□ Optional: date of birth, gender (for medical matching)
□ GDPR consent checkbox (required)
□ Marketing opt-in checkbox (optional)
□ Welcome email with platform tour link
```

#### US-UM-002: Doctor Profile Management
```
As a Doctor,
I want to create a comprehensive profile,
So that patients can find me and understand my qualifications.

Acceptance Criteria:
□ Professional information:
  - Name, title, specialization
  - Sub-specialties (multiselect)
  - Qualifications and certifications (with upload)
  - Languages spoken (multiselect)
  - Years of experience
  - Bio (rich text, max 2000 chars)
□ Media:
  - Profile photo (required, face visible)
  - Video introduction (optional, max 2min)
  - Certificate images (optional)
□ Consultation settings:
  - Fees by type (video, in-person, hybrid)
  - Currencies accepted
  - Consultation duration options (15/30/45/60 min)
  - Buffer time between appointments
□ Availability:
  - Weekly schedule template
  - Holiday/blocked time management
  - Time zone setting
□ Profile completeness indicator (must be 80%+ to appear in search)
```

#### US-UM-003: Admin Dashboard
```
As an Admin,
I want to monitor platform health and manage users,
So that I can ensure smooth operations and compliance.

Acceptance Criteria:
□ Dashboard overview:
  - Total users (patients, doctors, affiliates)
  - Bookings today/week/month
  - Revenue today/week/month
  - Conversion rate trends
□ User management:
  - Search/filter users by role, status, date
  - View user details and activity log
  - Suspend/activate accounts
  - Reset passwords
  - Verify doctor credentials
□ Doctor management:
  - Pending verification queue
  - Commission rate adjustments
  - Premium tier upgrades
□ Booking management:
  - View all bookings with filters
  - Manual refund processing
  - Reschedule assistance
□ Compliance:
  - GDPR data export for users
  - Audit log viewer
  - Access control reports
```

---

## 5. Feature Requirements Matrix

### 5.1 Core Features (MVP Phase 1)

| Feature | Priority | Complexity | Status | Dependencies |
|---------|----------|------------|--------|--------------|
| User Authentication | P0 | Medium | ✅ Done | - |
| Patient Registration | P0 | Low | ✅ Done | Auth |
| Doctor Registration | P0 | Medium | ✅ Done | Auth |
| Doctor Profile | P0 | Medium | ✅ Done | Auth |
| Doctor Search | P0 | Medium | ✅ Done | Profiles |
| Availability Calendar | P0 | High | ✅ Done | Profiles |
| Online Booking | P0 | High | ✅ Done | Calendar, Auth |
| Video Consultation (Jitsi) | P0 | High | ✅ Done | Booking |
| Stripe Payments | P0 | Medium | ✅ Done | Booking |
| Booking Confirmation | P0 | Low | ✅ Done | Payment |
| Patient Dashboard | P0 | Medium | ✅ Done | Auth |
| Doctor Dashboard | P0 | High | ✅ Done | Auth |
| Email Notifications | P0 | Medium | 🔄 80% | Booking |
| SMS Notifications | P1 | Medium | ❌ Pending | Booking |
| Retreat Catalog | P1 | Medium | ✅ Done | - |
| Retreat Booking | P1 | High | 🔄 60% | Catalog, Payment |
| Hybrid Consultation | P1 | High | 🔄 70% | Video, Booking |
| Medical Records Upload | P1 | High | 🔄 40% | Auth, Storage |
| AI Symptom Checker | P1 | High | ✅ Done | - |
| Admin Dashboard | P1 | High | ✅ Done | Auth |

### 5.2 Feature Priority Legend

- **P0**: Must have for MVP launch
- **P1**: Should have for MVP launch  
- **P2**: Nice to have, can defer to Phase 2
- **P3**: Future consideration

---

## 6. User Flows

### 6.1 Patient Booking Flow

```
[START] --> [Landing Page]
              |
              v
        [Browse Doctors] --> [Search/Filter] --> [View Doctor Profile]
              |                                          |
              v                                          v
        [Check Availability] <---------------------- [Select Consultation Type]
              |                                    (Online/Onsite/Hybrid)
              v
        [Select Date/Time] --> [Confirm Time Zone]
              |
              v
        [Review Booking Summary]
              |
              v
        [Login/Register] --> [Guest Checkout Option]
              |
              v
        [Enter Payment Details] --> [Apply Promo Code]
              |
              v
        [Process Payment] --> [3D Secure if required]
              |
              v
        [Booking Confirmed] --> [Email + SMS Sent]
              |
              v
        [Calendar Invite Created]
              |
              v
        [Dashboard Shows Upcoming Appointment]
              |
              v
        [END]
```

### 6.2 Video Consultation Flow

```
[Patient] -------------------- [System] -------------------- [Doctor]
    |                              |                              |
    |--- Join Waiting Room ------->|                              |
    |                              |                              |
    |<---- Device Test Wizard -----|                              |
    |                              |                              |
    |--- Complete Tests ---------->|                              |
    |                              |                              |
    |                              |--- Notify Doctor Ready ----->|
    |                              |                              |
    |                              |<---- Doctor Starts Call -----|
    |                              |                              |
    |<---- Call Connected ---------|-------- Call Connected ----->|
    |                              |                              |
    |========== VIDEO CALL ACTIVE (25 min avg) ===================|
    |                              |                              |
    |--- Screen Share Request ---->|                              |
    |                              |--- Share Approved? --------->|
    |                              |<--- Yes ---------------------|
    |<---- Screen Visible ---------|                              |
    |                              |                              |
    |--- Chat Message ------------>|-------- Chat Delivered ----->|
    |                              |                              |
    |                              |<---- End Call ----------------|
    |<---- Call Ended -------------|-------- Call Ended --------->|
    |                              |                              |
    |<---- Post-Call Summary ------|--- Doctor Notes Saved ------>|
    |                              |                              |
    |--- Rate Consultation ------->|                              |
    |                              |                              |
    [END]                          [END]                          [END]
```

### 6.3 Retreat Package Builder Flow

```
[START] --> [Retreats Catalog]
              |
              v
        [Select Retreat Type] --> [View Retreat Details]
              |                          |
              v                          v
        [Select Dates] <------- [Check Availability]
              |
              v
        [Choose Accommodation Tier]
        (Standard / Premium / Luxury)
              |
              v
        [Select Room Type]
              |
              v
        [Add Medical Procedures] (Optional)
        (Surgery, Treatments, etc.)
              |
              v
        [Add Activities/Excursions] (Optional)
        (Diving, Safari, Spa, etc.)
              |
              v
        [Review Package Summary]
        (Itemized with totals)
              |
              v
        [Add to Cart] --> [Continue Shopping] --> [Back to Catalog]
              |
              v
        [Proceed to Checkout]
              |
              v
        [Pre-Arrival Questionnaire]
        (Medical history, dietary needs, etc.)
              |
              v
        [Payment Options]
        (30% deposit / Full payment)
              |
              v
        [Payment Processing]
              |
              v
        [Booking Confirmed]
              |
              v
        [Itinerary Generated + Emailed]
              |
              v
        [END]
```

---

## 7. Business Rules

### 7.1 Booking Policies

| Rule | Description |
|------|-------------|
| **Minimum Notice** | Online consultations: 2 hours; Onsite: 24 hours; Surgery: 14 days |
| **Buffer Time** | Default 15 minutes between consultations (configurable per doctor) |
| **Double Booking Prevention** | System rejects overlapping bookings automatically |
| **Time Zone Handling** | All times stored in UTC, displayed in user's local time |
| **Rescheduling** | Allowed up to 24 hours before appointment; max 2 reschedules |

### 7.2 Cancellation & Refund Policy

| Cancellation Timing | Consultation Refund | Package/Surgery Refund |
|---------------------|---------------------|------------------------|
| >72 hours before | 100% refund | 100% refund |
| 24-72 hours before | 75% refund | 90% refund |
| 2-24 hours before | 50% refund | 75% refund |
| <2 hours/No-show | No refund | Deposit forfeited |

### 7.3 Pricing Rules

| Item | Platform Commission | Doctor Payout |
|------|--------------------:|-------------:|
| Online Consultation | 20% | 80% |
| Onsite Consultation | 20% | 80% |
| Hybrid Consultation | 20% | 80% (split between doctors) |
| Follow-up Consultation | 15% | 85% |
| Surgery Package | 15% | 85% |
| Retreat Booking | 15% | 85% |
| Marketplace Product | 12-22% | N/A |

### 7.4 Data Retention Policy

| Data Type | Retention Period | Compliance |
|-----------|------------------|------------|
| Medical Records | 10 years minimum | HIPAA |
| Video Recordings | 30 days (patient access) | GDPR |
| Chat Transcripts | 2 years | HIPAA |
| Payment Records | 7 years | Tax compliance |
| Audit Logs | 3 years | HIPAA |
| Marketing Data | Until consent withdrawn | GDPR |

---

## 8. Compliance Requirements

### 8.1 HIPAA Compliance Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| **Administrative Safeguards** | | |
| Security Officer designation | Thomas Weber (Operations Director) | ✅ |
| Workforce training | Mandatory annual HIPAA training | ✅ |
| Access management policy | RBAC with principle of least privilege | ✅ |
| Contingency planning | Disaster recovery plan documented | 🔄 |
| **Physical Safeguards** | | |
| Facility access controls | Cloudflare data centers (SOC 2 certified) | ✅ |
| Workstation security | Remote access requires VPN + MFA | ✅ |
| Device controls | Encrypted storage, remote wipe capability | ✅ |
| **Technical Safeguards** | | |
| Access controls | JWT authentication, session management | ✅ |
| Audit controls | Comprehensive logging (login, access, changes) | ✅ |
| Integrity controls | Database checksums, version control | ✅ |
| Transmission security | TLS 1.3 for all communications | ✅ |
| Encryption | AES-256 at rest, TLS 1.3 in transit | ✅ |

### 8.2 GDPR Compliance Matrix

| Requirement | Article | Implementation | Status |
|-------------|---------|----------------|--------|
| Lawful processing | Art. 6 | Consent + contract basis | ✅ |
| Explicit consent | Art. 7 | Checkbox UI, audit trail | ✅ |
| Right to access | Art. 15 | Data export API | ✅ |
| Right to rectification | Art. 16 | Profile edit functionality | ✅ |
| Right to erasure | Art. 17 | Account deletion workflow | ✅ |
| Data portability | Art. 20 | JSON/CSV export | ✅ |
| Privacy by design | Art. 25 | Minimal data collection | ✅ |
| DPO appointment | Art. 37 | External DPO contracted | ✅ |
| Breach notification | Art. 33 | 72-hour notification process | 🔄 |
| International transfers | Art. 46 | SCCs with Cloudflare | ✅ |

### 8.3 Egyptian Medical Data Regulations

| Requirement | Implementation |
|-------------|----------------|
| Ministry of Health registration | German Select license #EG-MED-2024-1234 |
| Data localization | Primary data in EU (Cloudflare), backup in Egypt |
| Medical practitioner licensing | All doctors verified with Egyptian Medical Syndicate |
| Patient consent forms | Arabic + English versions |
| Telemedicine regulations | Compliance with Law 151/2019 |

---

## 9. Third-Party Integrations

### 9.1 Payment Gateways

| Provider | Purpose | Status | Markets |
|----------|---------|--------|---------|
| **Stripe** | Primary processor | ✅ Live | EU, UK, US |
| **PayPal** | Alternative method | 🔄 Integration | Global |
| **Fawry** | Egyptian payments | ❌ Planned | Egypt |
| **Vodafone Cash** | Mobile money | ❌ Planned | Egypt |

### 9.2 Video Conferencing

| Provider | Purpose | Status | Cost |
|----------|---------|--------|------|
| **Jitsi Meet** | Primary video | ✅ Live | Free |
| **Daily.co** | Backup/Enterprise | ❌ Planned | $0.004/min |
| **Twilio** | Fallback | ❌ Planned | $0.004/min |

### 9.3 Communication

| Provider | Purpose | Status | Cost |
|----------|---------|--------|------|
| **SendGrid** | Transactional email | 🔄 Partial | $14.95/mo |
| **Twilio SMS** | Notifications | ❌ Planned | $0.0075/SMS |
| **WhatsApp Business** | Patient messaging | ❌ Planned | $0.05/msg |
| **Firebase FCM** | Push notifications | ❌ Planned | Free |

### 9.4 Calendar & Scheduling

| Provider | Purpose | Status |
|----------|---------|--------|
| **Google Calendar** | Sync | 🔄 Planned |
| **Outlook/Office 365** | Sync | 🔄 Planned |
| **iCal** | Export | ✅ Done |
| **Cal.com** | Embedded scheduler | ❌ Evaluation |

### 9.5 Health & EHR

| Provider | Purpose | Status |
|----------|---------|--------|
| **OpenEMR** | EHR integration | ❌ Phase 2 |
| **HL7 FHIR** | Interoperability | 🔄 Partial |
| **Apple HealthKit** | Wearables | ❌ Phase 2 |
| **Google Fit** | Wearables | ❌ Phase 2 |

---

# PART 2: TECHNICAL SPECIFICATION DOCUMENT (TSD)

## 10. System Architecture

### 10.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SELECTCAREOS™ ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │   Patient    │   │   Doctor     │   │    Admin     │   │  Affiliate   │  │
│  │   Web App    │   │   Web App    │   │  Dashboard   │   │   Portal     │  │
│  │  (React PWA) │   │  (React PWA) │   │  (React SPA) │   │  (React SPA) │  │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘   └──────┬───────┘  │
│         │                  │                  │                  │          │
│         └──────────────────┼──────────────────┼──────────────────┘          │
│                            │                  │                              │
│                            ▼                  ▼                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        CLOUDFLARE CDN / EDGE                            │ │
│  │  • Static Asset Delivery (HTML, CSS, JS, Images)                       │ │
│  │  • DDoS Protection & WAF                                               │ │
│  │  • SSL/TLS Termination                                                 │ │
│  │  • Edge Caching (Assets + API responses)                               │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                            │                                                 │
│                            ▼                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                     CLOUDFLARE WORKERS (EDGE COMPUTE)                   │ │
│  │                                                                         │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │ │
│  │  │  Auth Service │  │  API Gateway  │  │  Rate Limiter │               │ │
│  │  │  (JWT/OAuth)  │  │  (Routing)    │  │  (Per-IP/User)│               │ │
│  │  └───────────────┘  └───────────────┘  └───────────────┘               │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                    HONO APPLICATION CORE                         │   │ │
│  │  │                                                                  │   │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │   │ │
│  │  │  │ Booking │ │ Doctors │ │ Patients│ │Retreats │ │Payments │    │   │ │
│  │  │  │ Routes  │ │ Routes  │ │ Routes  │ │ Routes  │ │ Routes  │    │   │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │   │ │
│  │  │                                                                  │   │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │   │ │
│  │  │  │MediSense│ │Instant  │ │Wellness │ │Analytics│ │ Admin   │    │   │ │
│  │  │  │  AI API │ │ Connect │ │   API   │ │   API   │ │  API    │    │   │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │   │ │
│  │  │                                                                  │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                            │                                                 │
│         ┌──────────────────┼──────────────────┐                             │
│         ▼                  ▼                  ▼                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                     │
│  │ Cloudflare   │   │ Cloudflare   │   │ Cloudflare   │                     │
│  │     D1       │   │     KV       │   │     R2       │                     │
│  │  (SQLite)    │   │  (Sessions)  │   │  (Files)     │                     │
│  │              │   │              │   │              │                     │
│  │ • Users      │   │ • Auth Tokens│   │ • Medical    │                     │
│  │ • Bookings   │   │ • Rate Limits│   │   Documents  │                     │
│  │ • Doctors    │   │ • Cache      │   │ • Images     │                     │
│  │ • Payments   │   │ • Sessions   │   │ • Videos     │                     │
│  └──────────────┘   └──────────────┘   └──────────────┘                     │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                            EXTERNAL SERVICES                                 │
│                                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │    Stripe    │   │  Jitsi Meet  │   │   SendGrid   │   │  Twilio SMS  │  │
│  │   Payments   │   │    Video     │   │    Email     │   │  Messaging   │  │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Technology Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Frontend** | | | |
| Framework | React | 18+ | Industry standard, large ecosystem |
| Language | TypeScript | 5.4+ | Type safety, better DX |
| Styling | TailwindCSS | 3.4+ | Utility-first, rapid development |
| State | React Context + Hooks | - | Simplicity for MVP |
| HTTP | Fetch API / Axios | - | Native + fallback |
| **Backend** | | | |
| Runtime | Cloudflare Workers | - | Edge compute, global distribution |
| Framework | Hono | 4.11+ | Lightweight, Workers-native |
| Language | TypeScript | 5.4+ | Type safety |
| Validation | Zod | 3.22+ | Runtime validation |
| **Database** | | | |
| Primary | Cloudflare D1 | - | SQLite at edge, low latency |
| Cache | Cloudflare KV | - | Global key-value store |
| Files | Cloudflare R2 | - | S3-compatible, no egress fees |
| **Infrastructure** | | | |
| Hosting | Cloudflare Pages | - | Global edge network |
| CI/CD | GitHub Actions | - | Native integration |
| Monitoring | Cloudflare Analytics | - | Built-in |
| Error Tracking | Sentry | - | Real-time error monitoring |
| **Video** | | | |
| Primary | Jitsi Meet | - | Free, HIPAA-capable, self-hostable |
| Backup | Daily.co | - | Enterprise features, reliability |
| **Payments** | | | |
| Primary | Stripe | - | Global, comprehensive API |
| Alternative | PayPal | - | User preference |
| **Communication** | | | |
| Email | SendGrid | - | Reliability, templates |
| SMS | Twilio | - | Global coverage |

### 10.3 Why This Stack?

#### Cloudflare Workers vs Traditional Servers

| Factor | Cloudflare Workers | Traditional (AWS/GCP) |
|--------|-------------------|----------------------|
| **Latency** | <50ms globally (edge) | 100-300ms (region) |
| **Scaling** | Automatic, instant | Manual, takes minutes |
| **Cold starts** | <5ms | 100ms-2s (Lambda) |
| **Cost (1M req/mo)** | $5 | $50-200 |
| **Global distribution** | 300+ PoPs included | Extra cost/complexity |
| **HIPAA eligible** | Yes (BAA available) | Yes |

#### Hono vs Express/NestJS

| Factor | Hono | Express | NestJS |
|--------|------|---------|--------|
| **Bundle size** | 14KB | 200KB+ | 500KB+ |
| **Workers compatible** | Native | Partial | No |
| **TypeScript** | Native | Requires setup | Native |
| **Performance** | Fastest | Medium | Medium |

---

## 11. Database Schema Design

### 11.1 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SELECTCAREOS DATABASE SCHEMA                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐     1:N     ┌──────────────────┐
│      users       │────────────▶│   patient_       │
│──────────────────│             │   profiles       │
│ id (PK)          │             │──────────────────│
│ email (UNIQUE)   │             │ id (PK)          │
│ password_hash    │             │ user_id (FK)     │
│ name             │             │ date_of_birth    │
│ role             │             │ gender           │
│ phone            │             │ blood_type       │
│ language         │             │ allergies        │
│ country          │             │ medical_history  │
│ avatar_url       │             │ insurance_info   │
│ email_verified   │             │ emergency_contact│
│ is_active        │             └──────────────────┘
│ created_at       │
│ updated_at       │     1:N     ┌──────────────────┐
└──────────────────┘────────────▶│     doctors      │
                                 │──────────────────│
                                 │ id (PK)          │
                                 │ user_id (FK)     │
                                 │ name             │
                                 │ title            │
                                 │ specialization   │
                                 │ subspecialties   │
                                 │ qualifications   │
                                 │ languages        │
                                 │ experience_years │
                                 │ location         │
                                 │ consultation_fee │
                                 │ availability_json│
                                 │ rating           │
                                 │ total_reviews    │
                                 │ is_premium       │
                                 │ commission_rate  │
                                 │ status           │
                                 └──────────────────┘
                                          │
                                          │ 1:N
                                          ▼
┌──────────────────┐     N:1     ┌──────────────────┐     N:1     ┌──────────────────┐
│    time_slots    │◀────────────│     bookings     │────────────▶│    packages      │
│──────────────────│             │──────────────────│             │──────────────────│
│ id (PK)          │             │ id (PK)          │             │ id (PK)          │
│ doctor_id (FK)   │             │ patient_id (FK)  │             │ name             │
│ date             │             │ doctor_id (FK)   │             │ slug             │
│ start_time       │             │ package_id (FK)  │             │ type             │
│ end_time         │             │ slot_id (FK)     │             │ category         │
│ is_booked        │             │ booking_type     │             │ description      │
│ booking_id (FK)  │             │ status           │             │ base_price       │
│ created_at       │             │ consultation_type│             │ duration_days    │
└──────────────────┘             │ scheduled_at     │             │ inclusions       │
                                 │ duration         │             │ is_active        │
                                 │ notes            │             └──────────────────┘
                                 │ symptoms         │
                                 │ price            │                    │
                                 │ currency         │                    │ 1:N
                                 │ platform_fee     │                    ▼
                                 │ doctor_payout    │             ┌──────────────────┐
                                 │ payment_status   │             │     retreats     │
                                 │ payment_intent_id│             │──────────────────│
                                 │ video_room_url   │             │ id (PK)          │
                                 │ affiliate_id (FK)│             │ name             │
                                 │ created_at       │             │ category         │
                                 │ updated_at       │             │ duration         │
                                 └──────────────────┘             │ price_range      │
                                          │                       │ medical_program  │
                                          │ 1:1                   │ accommodation    │
                                          ▼                       │ rating           │
                                 ┌──────────────────┐             └──────────────────┘
                                 │     payments     │
                                 │──────────────────│
                                 │ id (PK)          │
                                 │ booking_id (FK)  │
                                 │ patient_id (FK)  │
                                 │ amount           │
                                 │ currency         │
                                 │ status           │
                                 │ payment_method   │
                                 │ stripe_id        │
                                 │ receipt_url      │
                                 │ refund_amount    │
                                 │ created_at       │
                                 └──────────────────┘

┌──────────────────┐     1:N     ┌──────────────────┐
│    affiliates    │────────────▶│    referrals     │
│──────────────────│             │──────────────────│
│ id (PK)          │             │ id (PK)          │
│ user_id (FK)     │             │ affiliate_id (FK)│
│ name             │             │ patient_id (FK)  │
│ email            │             │ booking_id (FK)  │
│ referral_code    │             │ status           │
│ tier             │             │ commission       │
│ commission_rate  │             │ created_at       │
│ total_referrals  │             └──────────────────┘
│ total_earnings   │
│ status           │
└──────────────────┘

┌──────────────────┐     N:1     ┌──────────────────┐
│ medical_records  │────────────▶│      users       │
│──────────────────│             └──────────────────┘
│ id (PK)          │
│ patient_id (FK)  │
│ doctor_id (FK)   │
│ booking_id (FK)  │
│ record_type      │
│ title            │
│ content          │
│ file_url         │
│ file_hash        │
│ encrypted        │
│ created_at       │
└──────────────────┘

┌──────────────────┐
│   audit_logs     │
│──────────────────│
│ id (PK)          │
│ user_id (FK)     │
│ action           │
│ resource_type    │
│ resource_id      │
│ ip_address       │
│ user_agent       │
│ old_values       │
│ new_values       │
│ created_at       │
└──────────────────┘
```

### 11.2 Core Tables SQL

```sql
-- Users table (all account types)
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('patient', 'doctor', 'admin', 'affiliate', 'staff')),
    phone TEXT,
    country TEXT,
    language TEXT DEFAULT 'en',
    avatar_url TEXT,
    email_verified INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    last_login_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Doctors table
CREATE TABLE doctors (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT,
    specialization TEXT NOT NULL,
    subspecialties TEXT, -- JSON array
    qualifications TEXT, -- JSON array
    languages TEXT, -- JSON array
    experience_years INTEGER,
    location TEXT,
    hospital_affiliation TEXT,
    consultation_fee INTEGER NOT NULL,
    video_consultation_fee INTEGER,
    availability TEXT, -- JSON object with weekly schedule
    bio TEXT,
    profile_image TEXT,
    rating REAL DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_consultations INTEGER DEFAULT 0,
    is_premium INTEGER DEFAULT 0,
    premium_tier TEXT,
    commission_rate INTEGER DEFAULT 20,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'pending_verification')),
    fhir_practitioner_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Bookings table
CREATE TABLE bookings (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    patient_id TEXT NOT NULL REFERENCES users(id),
    doctor_id TEXT NOT NULL REFERENCES doctors(id),
    package_id TEXT REFERENCES packages(id),
    slot_id TEXT REFERENCES time_slots(id),
    booking_type TEXT NOT NULL CHECK(booking_type IN ('consultation', 'follow_up', 'surgery', 'procedure', 'video_call')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'rescheduled')),
    consultation_type TEXT NOT NULL CHECK(consultation_type IN ('online', 'onsite', 'hybrid')),
    scheduled_at TEXT NOT NULL,
    duration INTEGER DEFAULT 30,
    notes TEXT,
    symptoms TEXT, -- JSON array
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'EUR',
    platform_fee INTEGER,
    doctor_payout INTEGER,
    payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_intent_id TEXT,
    video_room_url TEXT,
    video_room_id TEXT,
    affiliate_id TEXT REFERENCES affiliates(id),
    affiliate_commission INTEGER,
    reminder_sent INTEGER DEFAULT 0,
    confirmation_sent INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Payments table
CREATE TABLE payments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    booking_id TEXT REFERENCES bookings(id),
    patient_id TEXT NOT NULL REFERENCES users(id),
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT NOT NULL CHECK(status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded')),
    payment_method TEXT,
    stripe_payment_intent_id TEXT,
    stripe_charge_id TEXT,
    description TEXT,
    receipt_url TEXT,
    refund_amount INTEGER,
    refund_reason TEXT,
    metadata TEXT, -- JSON
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for performance
CREATE INDEX idx_bookings_patient ON bookings(patient_id);
CREATE INDEX idx_bookings_doctor ON bookings(doctor_id);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_doctors_specialization ON doctors(specialization);
CREATE INDEX idx_doctors_status ON doctors(status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_patient ON payments(patient_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

---

## 12. API Specifications

### 12.1 API Design Principles

- **RESTful Design**: Resource-oriented URLs, HTTP methods, status codes
- **Versioning**: `/api/v1/` prefix for all endpoints
- **Authentication**: Bearer token (JWT) in Authorization header
- **Rate Limiting**: 100 req/min for authenticated, 20 req/min for anonymous
- **Response Format**: Consistent JSON structure

### 12.2 Response Format

```typescript
// Success Response
interface APIResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  requestId: string;
  timestamp: string;
}

// Error Response
interface ErrorResponse {
  success: false;
  error: {
    code: string;      // e.g., "VALIDATION_ERROR"
    message: string;   // Human-readable message
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
  requestId: string;
  timestamp: string;
}
```

### 12.3 Core API Endpoints

#### Authentication APIs

```yaml
POST /api/v1/auth/register:
  summary: Register new user
  body:
    email: string (required)
    password: string (required, min 8 chars)
    name: string (required)
    role: 'patient' | 'doctor' (default: patient)
    phone?: string
    country?: string
  responses:
    201: User created, verification email sent
    400: Validation error
    409: Email already exists

POST /api/v1/auth/login:
  summary: Authenticate user
  body:
    email: string (required)
    password: string (required)
  responses:
    200: { token, user, expiresIn }
    401: Invalid credentials
    403: Account not verified

POST /api/v1/auth/refresh:
  summary: Refresh access token
  headers:
    Authorization: Bearer <refresh_token>
  responses:
    200: { token, expiresIn }
    401: Invalid or expired token

POST /api/v1/auth/forgot-password:
  summary: Request password reset
  body:
    email: string
  responses:
    200: Reset email sent (always, for security)

POST /api/v1/auth/reset-password:
  summary: Reset password with token
  body:
    token: string
    password: string
  responses:
    200: Password reset successful
    400: Invalid or expired token
```

#### Doctor APIs

```yaml
GET /api/v1/doctors:
  summary: Search doctors
  query:
    specialization?: string
    language?: string
    minRating?: number
    maxFee?: number
    availableDate?: string (ISO date)
    consultationType?: 'online' | 'onsite' | 'hybrid'
    page?: number (default: 1)
    limit?: number (default: 20, max: 50)
    sortBy?: 'rating' | 'fee' | 'experience' | 'reviews'
    sortOrder?: 'asc' | 'desc' (default: desc)
  responses:
    200:
      data: Doctor[]
      meta: { page, limit, total, totalPages }

GET /api/v1/doctors/:id:
  summary: Get doctor profile
  responses:
    200: { data: Doctor }
    404: Doctor not found

GET /api/v1/doctors/:id/availability:
  summary: Get available time slots
  query:
    startDate: string (ISO date, required)
    endDate: string (ISO date, required)
    consultationType?: 'online' | 'onsite' | 'hybrid'
  responses:
    200:
      data: {
        slots: Array<{
          date: string,
          times: Array<{
            start: string,
            end: string,
            available: boolean,
            type: 'online' | 'onsite' | 'both'
          }>
        }>
      }

GET /api/v1/doctors/:id/reviews:
  summary: Get doctor reviews
  query:
    page?: number
    limit?: number
  responses:
    200:
      data: Review[]
      meta: { page, limit, total }
```

#### Booking APIs

```yaml
POST /api/v1/bookings:
  summary: Create new booking
  auth: required
  body:
    doctorId: string (required)
    packageId?: string
    bookingType: 'consultation' | 'follow_up' | 'surgery'
    consultationType: 'online' | 'onsite' | 'hybrid'
    scheduledAt: string (ISO datetime, required)
    duration?: number (default: 30)
    notes?: string
    symptoms?: string[]
    affiliateCode?: string
  responses:
    201:
      data: {
        booking: Booking,
        payment: {
          clientSecret: string,
          paymentIntentId: string,
          amount: number,
          currency: string
        }
      }
    400: Validation error / Slot not available
    401: Unauthorized

GET /api/v1/bookings:
  summary: List user's bookings
  auth: required
  query:
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    type?: 'consultation' | 'follow_up' | 'surgery'
    from?: string (ISO date)
    to?: string (ISO date)
    page?: number
    limit?: number
  responses:
    200:
      data: Booking[]
      meta: { page, limit, total }

GET /api/v1/bookings/:id:
  summary: Get booking details
  auth: required
  responses:
    200: { data: Booking }
    404: Booking not found

PATCH /api/v1/bookings/:id:
  summary: Update booking (reschedule)
  auth: required
  body:
    scheduledAt?: string (ISO datetime)
    notes?: string
  responses:
    200: { data: Booking }
    400: Cannot reschedule (< 24 hours)
    404: Booking not found

DELETE /api/v1/bookings/:id:
  summary: Cancel booking
  auth: required
  body:
    reason?: string
  responses:
    200: { data: { booking: Booking, refund?: Payment } }
    400: Cannot cancel (already started)
```

#### Payment APIs

```yaml
POST /api/v1/payments/create-intent:
  summary: Create payment intent
  auth: required
  body:
    bookingId: string (required)
    amount?: number (override price)
    currency?: string
    savePaymentMethod?: boolean
  responses:
    200:
      data: {
        clientSecret: string,
        paymentIntentId: string,
        amount: number,
        currency: string
      }

POST /api/v1/payments/confirm:
  summary: Confirm payment completed
  auth: required
  body:
    paymentIntentId: string
    bookingId: string
  responses:
    200: { data: { booking: Booking, payment: Payment } }
    400: Payment failed

POST /api/v1/payments/refund:
  summary: Request refund (admin or policy-based)
  auth: required (admin or owner within policy)
  body:
    paymentId: string
    amount?: number (partial refund)
    reason: string
  responses:
    200: { data: { payment: Payment } }
    400: Refund not allowed

GET /api/v1/payments/:id:
  summary: Get payment details
  auth: required
  responses:
    200: { data: Payment }

POST /api/v1/webhooks/stripe:
  summary: Stripe webhook handler
  headers:
    Stripe-Signature: required
  body: Stripe Event
  responses:
    200: Webhook processed
    400: Invalid signature
```

#### Instant Connect (Telemedicine) APIs

```yaml
POST /api/v1/instant-connect/connect:
  summary: Request instant doctor connection
  auth: required
  body:
    preferredSpecialty?: string
    preferredLanguage?: string
    urgency?: 'emergency' | 'urgent' | 'routine'
    symptoms?: string[]
    symptomDescription?: string
  responses:
    200:
      data: {
        requestId: string,
        status: 'pending' | 'matched' | 'accepted',
        queuePosition?: number,
        estimatedWaitSeconds?: number,
        matchedDoctor?: {
          id: string,
          name: string,
          specialty: string,
          avatar: string,
          rating: number
        },
        videoRoomUrl?: string
      }

GET /api/v1/instant-connect/request/:id:
  summary: Get connection request status
  auth: required
  responses:
    200: { data: ConsultationRequest }
    404: Request not found

DELETE /api/v1/instant-connect/request/:id:
  summary: Cancel connection request
  auth: required
  responses:
    200: { success: true }

POST /api/v1/instant-connect/doctor/accept:
  summary: Doctor accepts consultation request
  auth: required (doctor)
  body:
    requestId: string
  responses:
    200:
      data: {
        consultationId: string,
        videoRoomUrl: string,
        patientInfo: PatientSummary
      }

POST /api/v1/instant-connect/doctor/decline:
  summary: Doctor declines consultation request
  auth: required (doctor)
  body:
    requestId: string
    reason?: string
  responses:
    200: { success: true }

GET /api/v1/instant-connect/consultation/:id/video:
  summary: Get video room URL
  auth: required
  query:
    role: 'patient' | 'doctor'
    displayName: string
  responses:
    200: { data: { url: string } }

POST /api/v1/instant-connect/consultation/:id/end:
  summary: End consultation
  auth: required (doctor)
  body:
    diagnosis?: string
    prescription?: object
    followUpRecommended?: boolean
    notes?: string
  responses:
    200: { data: ConsultationSummary }

GET /api/v1/instant-connect/stats:
  summary: Get system statistics
  responses:
    200:
      data: {
        queueStats: QueueStats,
        doctorStats: DoctorStats
      }
```

### 12.4 API Rate Limits

| Endpoint Category | Authenticated | Anonymous |
|-------------------|---------------|-----------|
| Auth endpoints | 10/min | 5/min |
| Read endpoints | 200/min | 30/min |
| Write endpoints | 50/min | 10/min |
| Search endpoints | 100/min | 20/min |
| Video endpoints | 20/min | N/A |

---

## 13. Security Architecture

### 13.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                           │
└─────────────────────────────────────────────────────────────────┘

[Client] ──────────────────────────────────────────────────▶ [Server]
    │                                                            │
    │ 1. POST /auth/login { email, password }                    │
    │ ─────────────────────────────────────────────────────────▶ │
    │                                                            │
    │                    ┌─────────────────────────┐             │
    │                    │ Verify credentials      │             │
    │                    │ Generate JWT (15min)    │             │
    │                    │ Generate Refresh (7d)   │             │
    │                    │ Store refresh in KV     │             │
    │                    └─────────────────────────┘             │
    │                                                            │
    │ ◀───────────────────────────────────────────────────────── │
    │ 2. { accessToken, refreshToken, expiresIn }                │
    │                                                            │
    │ 3. GET /api/bookings                                       │
    │    Authorization: Bearer <accessToken>                     │
    │ ─────────────────────────────────────────────────────────▶ │
    │                                                            │
    │                    ┌─────────────────────────┐             │
    │                    │ Verify JWT signature    │             │
    │                    │ Check expiration        │             │
    │                    │ Extract user from claims│             │
    │                    │ Process request         │             │
    │                    └─────────────────────────┘             │
    │                                                            │
    │ ◀───────────────────────────────────────────────────────── │
    │ 4. { data: [...] }                                         │
    │                                                            │
    │ ... 15 minutes later (token expired) ...                   │
    │                                                            │
    │ 5. POST /auth/refresh                                      │
    │    Authorization: Bearer <refreshToken>                    │
    │ ─────────────────────────────────────────────────────────▶ │
    │                                                            │
    │                    ┌─────────────────────────┐             │
    │                    │ Verify refresh token    │             │
    │                    │ Check in KV store       │             │
    │                    │ Generate new access JWT │             │
    │                    │ Rotate refresh token    │             │
    │                    └─────────────────────────┘             │
    │                                                            │
    │ ◀───────────────────────────────────────────────────────── │
    │ 6. { accessToken, refreshToken }                           │
    │                                                            │
```

### 13.2 JWT Token Structure

```typescript
// Access Token Payload (15 min expiry)
interface AccessTokenPayload {
  sub: string;          // User ID
  email: string;
  role: 'patient' | 'doctor' | 'admin' | 'affiliate';
  name: string;
  permissions?: string[];  // e.g., ['booking:create', 'medical:read']
  iat: number;          // Issued at
  exp: number;          // Expiration
  jti: string;          // JWT ID (for revocation)
}

// Refresh Token Payload (7 days expiry)
interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  iat: number;
  exp: number;
  jti: string;
}
```

### 13.3 Data Encryption Strategy

| Data Type | At Rest | In Transit | Key Management |
|-----------|---------|------------|----------------|
| User passwords | bcrypt (12 rounds) | TLS 1.3 | N/A |
| Medical records | AES-256-GCM | TLS 1.3 | Cloudflare KV |
| Video streams | N/A | SRTP/DTLS | Jitsi |
| Payment data | Stripe handles | TLS 1.3 | Stripe |
| Session tokens | KV encryption | TLS 1.3 | Cloudflare |
| Audit logs | AES-256 | TLS 1.3 | Cloudflare |

### 13.4 Role-Based Access Control (RBAC)

```typescript
const PERMISSIONS = {
  patient: [
    'profile:read:own',
    'profile:update:own',
    'booking:create',
    'booking:read:own',
    'booking:cancel:own',
    'medical:read:own',
    'medical:upload:own',
    'payment:create:own',
    'payment:read:own',
  ],
  doctor: [
    'profile:read:own',
    'profile:update:own',
    'schedule:manage:own',
    'booking:read:assigned',
    'booking:update:assigned',
    'medical:read:assigned',
    'medical:write:assigned',
    'consultation:conduct:assigned',
    'prescription:create',
    'earnings:read:own',
  ],
  admin: [
    '*:*:*',  // Full access
  ],
  affiliate: [
    'profile:read:own',
    'referral:read:own',
    'referral:create',
    'earnings:read:own',
    'payout:request',
  ],
  staff: [
    'booking:read:all',
    'booking:update:all',
    'patient:read:all',
    'doctor:read:all',
    'support:manage',
  ],
};
```

---

## 14. Scalability Strategy

### 14.1 Current Architecture Capacity

| Metric | Current Capacity | Growth Strategy |
|--------|------------------|-----------------|
| Concurrent users | 10,000 | Cloudflare edge handles automatically |
| API requests | 1M/day | KV caching, response caching |
| Database size | 10GB (D1 limit) | Sharding by region, archive old data |
| File storage | Unlimited (R2) | Already scalable |
| Video sessions | 100 concurrent | Jitsi scaling, Daily.co backup |

### 14.2 Caching Strategy

```typescript
// Cache configuration
const CACHE_CONFIG = {
  // Static data (rarely changes)
  doctors: { ttl: 3600 },        // 1 hour
  packages: { ttl: 86400 },      // 24 hours
  retreats: { ttl: 86400 },      // 24 hours
  
  // Semi-static data
  availability: { ttl: 300 },    // 5 minutes
  reviews: { ttl: 1800 },        // 30 minutes
  
  // Dynamic data (no caching)
  bookings: { ttl: 0 },
  payments: { ttl: 0 },
  consultations: { ttl: 0 },
  
  // Stale-while-revalidate pattern
  doctorSearch: { 
    ttl: 60,                     // Fresh for 1 minute
    staleWhileRevalidate: 300    // Serve stale for 5 more minutes
  },
};
```

### 14.3 Database Scaling Plan

**Phase 1 (Current)**: Single D1 database
- Sufficient for 100,000 users, 1M bookings

**Phase 2 (100K+ users)**: Read replicas
- Primary D1 for writes
- KV cache for hot data
- Consider Turso for global distribution

**Phase 3 (1M+ users)**: Sharding
- Shard by region (EU, MENA, etc.)
- Archive data older than 2 years
- Consider PostgreSQL migration for complex queries

---

## 15. DevOps & CI/CD

### 15.1 Git Workflow

```
main (protected)
  │
  ├── develop
  │     │
  │     ├── feature/US-TM-001-video-consultation
  │     │
  │     ├── feature/US-BK-002-onsite-booking
  │     │
  │     └── fix/payment-webhook-retry
  │
  └── release/v2.6.0
```

### 15.2 Branch Protection Rules

| Branch | Rules |
|--------|-------|
| `main` | Require PR, 2 approvals, pass CI, no direct push |
| `develop` | Require PR, 1 approval, pass CI |
| `release/*` | Require PR from develop, pass CI, pass E2E tests |

### 15.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test:unit
      
      - name: Build
        run: npm run build
      
      - name: Integration tests
        run: npm run test:integration

  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Cloudflare Pages (Preview)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: pages deploy dist --project-name selectcareos-app
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Cloudflare Pages (Production)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: pages deploy dist --project-name selectcareos-app --branch main
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

### 15.4 Environment Configuration

| Environment | URL | Purpose | Deploy Trigger |
|-------------|-----|---------|----------------|
| Development | localhost:3000 | Local development | Manual |
| Preview | PR-xxx.selectcareos.pages.dev | PR preview | PR opened/updated |
| Staging | staging.selectcareos.pages.dev | Pre-production testing | develop branch |
| Production | selectcareos-app.pages.dev | Live users | main branch |

---

# PART 3: MVP DEVELOPMENT ROADMAP

## 16. Vertical Slice Architecture

Each vertical slice delivers complete end-to-end functionality that users can test and provide feedback on.

### 16.1 Phase 1: MVP Foundation (Weeks 1-16)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 1: MVP FOUNDATION (16 WEEKS)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Week 1-2 ┌──────────────────────────────────────────┐                      │
│           │ VS-1: User Authentication & Onboarding   │ ✅ DONE              │
│           │ • Registration (email verification)      │                      │
│           │ • Login/logout with JWT                  │                      │
│           │ • Password reset flow                    │                      │
│           │ • Basic profile creation                 │                      │
│           └──────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 3-4 ┌──────────────────────────────────────────┐                      │
│           │ VS-2: Doctor Profile & Availability      │ ✅ DONE              │
│           │ • Doctor detailed profile                │                      │
│           │ • Calendar integration                   │                      │
│           │ • Time zone management                   │                      │
│           │ • Availability setting                   │                      │
│           └──────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 5-7 ┌──────────────────────────────────────────┐                      │
│           │ VS-3: Basic Booking Flow                 │ ✅ DONE              │
│           │ • Doctor search with filters             │                      │
│           │ • Available slots display                │                      │
│           │ • Book online consultation               │                      │
│           │ • Email confirmation                     │                      │
│           └──────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 8-10 ┌─────────────────────────────────────────┐                      │
│            │ VS-4: Video Consultation Room           │ ✅ DONE (Jitsi)      │
│            │ • WebRTC video room                     │                      │
│            │ • Waiting room for patients             │                      │
│            │ • Doctor initiates session              │                      │
│            │ • In-session chat                       │                      │
│            │ • Session timer                         │                      │
│            └─────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 11-12 ┌────────────────────────────────────────┐                      │
│             │ VS-5: Payment Integration              │ ✅ DONE              │
│             │ • Shopping cart functionality          │                      │
│             │ • Stripe payment gateway               │                      │
│             │ • Payment confirmation                 │                      │
│             │ • Receipt generation                   │                      │
│             │ • Refund handling                      │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 13-14 ┌────────────────────────────────────────┐                      │
│             │ VS-6: Clinical Notes & Records         │ 🔄 IN PROGRESS       │
│             │ • Doctor note-taking interface         │                      │
│             │ • Post-consultation notes storage      │                      │
│             │ • Patient medical history view         │                      │
│             │ • File upload (encrypted)              │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 15-16 ┌────────────────────────────────────────┐                      │
│             │ VS-7: Onsite & Hybrid Booking          │ 🔄 PARTIAL           │
│             │ • Onsite booking flow                  │                      │
│             │ • Hybrid consultation setup            │                      │
│             │ • Dual calendar coordination           │                      │
│             │ • Combined pricing logic               │                      │
│             └────────────────────────────────────────┘                      │
│                                                                              │
│  ✅ DELIVERABLE: Patients can book online/onsite/hybrid consultations,      │
│                  conduct video calls, and doctors can manage their practice │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 16.2 Phase 2: Retreats & AI (Weeks 17-28)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  PHASE 2: RETREATS & AI (12 WEEKS)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Week 17-18 ┌────────────────────────────────────────┐                      │
│             │ VS-8: Retreat Catalog & Search         │ ✅ DONE              │
│             │ • Retreat listing page                 │                      │
│             │ • Filtering (location, price, dates)   │                      │
│             │ • Retreat detail page                  │                      │
│             │ • Photo gallery & reviews              │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 19-21 ┌────────────────────────────────────────┐                      │
│             │ VS-9: Retreat Booking & Package Builder│ 🔄 IN PROGRESS       │
│             │ • Single treatment booking             │                      │
│             │ • All-inclusive package builder        │                      │
│             │ • Add-on selection                     │                      │
│             │ • Multi-item cart                      │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 22-24 ┌────────────────────────────────────────┐                      │
│             │ VS-10: AI Symptom Analyzer             │ ✅ DONE              │
│             │ • Chatbot interface                    │                      │
│             │ • NLP symptom analysis                 │                      │
│             │ • Suggested specialty                  │                      │
│             │ • Booking recommendation               │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 25-26 ┌────────────────────────────────────────┐                      │
│             │ VS-11: AI Concierge & Health Insights  │ 🔄 PARTIAL           │
│             │ • Personalized health dashboard        │                      │
│             │ • Medication reminders                 │                      │
│             │ • Appointment assistant                │                      │
│             │ • Health metrics tracking              │                      │
│             └────────────────────────────────────────┘                      │
│                              │                                               │
│                              ▼                                               │
│  Week 27-28 ┌────────────────────────────────────────┐                      │
│             │ VS-12: Advanced CRM & Admin Tools      │ ✅ DONE              │
│             │ • CRM dashboard for staff              │                      │
│             │ • Admin analytics                      │                      │
│             │ • Role-based access refinement         │                      │
│             │ • Compliance audit logs                │                      │
│             └────────────────────────────────────────┘                      │
│                                                                              │
│  ✅ DELIVERABLE: Full retreat booking, AI-powered symptom analysis,         │
│                  personalized health insights, comprehensive admin tools    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 16.3 Phase 3: Advanced Features (Weeks 29-52)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               PHASE 3: ADVANCED FEATURES (24 WEEKS)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Week 29-30: VS-13 - Subscription Plans                                     │
│  Week 31-32: VS-14 - Remote Health Monitoring (Wearables)                   │
│  Week 33-35: VS-15 - AI Diagnostics & Imaging Analysis                      │
│  Week 36-37: VS-16 - Open-Source EHR Integration                            │
│  Week 38-40: VS-17 - Marketplace for Medical Services                       │
│  Week 41-44: VS-18 - Mobile App Launch (iOS/Android)                        │
│  Week 45-47: VS-19 - Advanced AI Features                                   │
│  Week 48-52: VS-20 - Global Expansion Infrastructure                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 16.4 Gantt Chart Overview

```
                    Month 1     Month 2     Month 3     Month 4     Month 5     Month 6
                   W1 W2 W3 W4 W1 W2 W3 W4 W1 W2 W3 W4 W1 W2 W3 W4 W1 W2 W3 W4 W1 W2 W3 W4
                   ─────────────────────────────────────────────────────────────────────────
PHASE 1: MVP FOUNDATION
VS-1: Auth         ██ ██                                                        ✅
VS-2: Doctor Prof     ██ ██                                                     ✅
VS-3: Basic Booking      ██ ██ ██                                               ✅
VS-4: Video Room               ██ ██ ██                                         ✅
VS-5: Payments                       ██ ██                                      ✅
VS-6: Medical Rec                          ██ ██                                🔄
VS-7: Hybrid Book                                ██ ██                          🔄
                   ─────────────────────────────────────────────────────────────────────────
PHASE 2: RETREATS & AI
VS-8: Retreats                                         ██ ██                    ✅
VS-9: Package Build                                          ██ ██ ██          🔄
VS-10: AI Symptom                                                   ██ ██ ██   ✅
VS-11: AI Concierge                                                        ██ ██
VS-12: Admin Tools                                                               ██ ██
                   ─────────────────────────────────────────────────────────────────────────

Legend: ██ = Planned work   ✅ = Completed   🔄 = In Progress
```

---

# PART 4: DEVELOPER HANDOFF PACKAGE

## 17. Environment Setup Guide

### 17.1 Prerequisites

```bash
# Required software
Node.js >= 20.x
npm >= 10.x
Git >= 2.40
Wrangler CLI (Cloudflare) >= 3.x

# Recommended IDE
VS Code with extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- REST Client (for API testing)
```

### 17.2 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/germanselect/selectcareos.git
cd selectcareos

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Configure environment variables
# Edit .env.local with your values (see section 17.3)

# 5. Initialize local database
npm run db:migrate:local

# 6. Seed development data (optional)
npm run db:seed:local

# 7. Start development server
npm run dev

# 8. Open in browser
# http://localhost:3000

# Alternative: Use Wrangler for closer-to-production environment
npm run dev:sandbox
```

### 17.3 Environment Variables

```bash
# .env.local - Local Development

# Cloudflare (get from dashboard.cloudflare.com)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Database
DB_NAME=selectcareos-local

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Stripe (use test keys for development)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx

# SendGrid (optional for local)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@selectcareos.com

# Video (Jitsi - no keys needed for default)
JITSI_DOMAIN=meet.jit.si

# Feature flags
ENABLE_AI_FEATURES=true
ENABLE_PAYMENTS=true
ENABLE_SMS=false

# Environment
NODE_ENV=development
API_BASE_URL=http://localhost:3000
```

### 17.4 Database Migrations

```bash
# Apply migrations to local D1
npm run db:migrate:local

# Apply migrations to production (requires auth)
npm run db:migrate:prod

# Create new migration
# Create file: migrations/XXX_description.sql

# Migration file naming convention
001_initial_schema.sql
002_add_consultations.sql
003_add_payments.sql
```

---

## 18. Definition of Done (DoD)

### 18.1 Per User Story

Each user story must meet ALL criteria before marking as "Done":

```markdown
## Definition of Done Checklist

### Code Quality
- [ ] Code follows TypeScript style guide
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code reviewed by at least 1 peer
- [ ] No hardcoded secrets or credentials

### Testing
- [ ] Unit tests written (>80% coverage for new code)
- [ ] Unit tests pass (`npm run test:unit`)
- [ ] Integration tests pass (`npm run test:integration`)
- [ ] Manual QA completed on staging
- [ ] Edge cases tested

### Documentation
- [ ] API endpoints documented (OpenAPI/Swagger)
- [ ] Code comments for complex logic
- [ ] README updated if architecture changed
- [ ] CHANGELOG.md updated

### Security
- [ ] No sensitive data in logs
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] HIPAA compliance verified (if medical data)

### Performance
- [ ] No N+1 database queries
- [ ] Response time <500ms (P95)
- [ ] Bundle size impact reviewed

### Deployment
- [ ] Feature works in staging environment
- [ ] No breaking changes to existing APIs
- [ ] Database migrations tested
- [ ] Rollback plan documented
```

### 18.2 Per Vertical Slice

```markdown
## Vertical Slice Completion Criteria

### Functional
- [ ] All user stories in slice completed (per DoD above)
- [ ] End-to-end user flow works
- [ ] Error handling graceful

### Quality
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Security audit passed

### Documentation
- [ ] User guide updated
- [ ] API documentation complete
- [ ] Architecture diagrams updated

### Stakeholder
- [ ] Demo presented to stakeholders
- [ ] Feedback incorporated
- [ ] Sign-off received
```

---

## 19. Testing Requirements

### 19.1 Test Coverage Targets

| Test Type | Target Coverage | Current |
|-----------|-----------------|---------|
| Unit Tests | 80% | 45% |
| Integration Tests | 70% | 30% |
| E2E Tests | Critical paths | 20% |

### 19.2 Unit Test Examples

```typescript
// tests/unit/services/booking.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookingService } from '../../../src/services/booking';

describe('BookingService', () => {
  let bookingService: BookingService;
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      prepare: vi.fn().mockReturnThis(),
      bind: vi.fn().mockReturnThis(),
      run: vi.fn(),
      first: vi.fn(),
      all: vi.fn(),
    };
    bookingService = new BookingService(mockDb);
  });

  describe('createBooking', () => {
    it('should create a booking with valid data', async () => {
      const bookingData = {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduledAt: '2026-03-01T10:00:00Z',
        consultationType: 'online',
        duration: 30,
      };

      mockDb.first.mockResolvedValue({ id: 'slot-789', is_booked: false });
      mockDb.run.mockResolvedValue({ success: true });

      const result = await bookingService.createBooking(bookingData);

      expect(result.success).toBe(true);
      expect(result.data.booking.patientId).toBe('patient-123');
      expect(result.data.booking.status).toBe('pending');
    });

    it('should reject booking if slot is unavailable', async () => {
      const bookingData = {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduledAt: '2026-03-01T10:00:00Z',
      };

      mockDb.first.mockResolvedValue({ id: 'slot-789', is_booked: true });

      await expect(bookingService.createBooking(bookingData))
        .rejects.toThrow('Slot is no longer available');
    });

    it('should calculate platform fee correctly (20%)', async () => {
      const bookingData = {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduledAt: '2026-03-01T10:00:00Z',
        price: 150,
      };

      mockDb.first.mockResolvedValue({ id: 'slot-789', is_booked: false });
      mockDb.run.mockResolvedValue({ success: true });

      const result = await bookingService.createBooking(bookingData);

      expect(result.data.booking.platformFee).toBe(30);  // 20% of 150
      expect(result.data.booking.doctorPayout).toBe(120);  // 80% of 150
    });
  });
});
```

### 19.3 E2E Test Scenarios

```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test patient
    await page.goto('/login');
    await page.fill('[name="email"]', 'test-patient@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('Patient can book online consultation', async ({ page }) => {
    // Navigate to doctors
    await page.click('text=Find a Doctor');
    await expect(page).toHaveURL('/doctors');

    // Search for cardiologist
    await page.selectOption('[name="specialization"]', 'Cardiology');
    await page.click('button:has-text("Search")');

    // Select first doctor
    await page.click('.doctor-card >> nth=0');
    await expect(page).toHaveURL(/\/doctors\/.+/);

    // Book consultation
    await page.click('button:has-text("Book Online Consultation")');
    
    // Select date and time
    await page.click('.available-slot >> nth=0');
    
    // Confirm booking
    await page.click('button:has-text("Confirm Booking")');

    // Verify redirect to payment
    await expect(page).toHaveURL(/\/checkout\/.+/);

    // Complete payment (Stripe test card)
    const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await stripeFrame.locator('[name="cardnumber"]').fill('4242424242424242');
    await stripeFrame.locator('[name="exp-date"]').fill('12/30');
    await stripeFrame.locator('[name="cvc"]').fill('123');
    
    await page.click('button:has-text("Pay")');

    // Verify success
    await expect(page).toHaveURL('/booking/confirmed');
    await expect(page.locator('text=Booking Confirmed')).toBeVisible();
  });
});
```

---

## 20. Code Standards & Conventions

### 20.1 TypeScript Style Guide

```typescript
// File naming: kebab-case
// booking-service.ts, user-types.ts

// Class naming: PascalCase
class BookingService {}

// Interface naming: PascalCase with 'I' prefix optional (we don't use it)
interface Booking {}
interface BookingRequest {}

// Function naming: camelCase
function createBooking() {}
async function fetchDoctorAvailability() {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_BOOKING_DURATION = 60;
const PLATFORM_COMMISSION_RATE = 0.20;

// Enums: PascalCase with PascalCase members
enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
}

// Type aliases: PascalCase
type UserRole = 'patient' | 'doctor' | 'admin';

// Props/parameters: camelCase
function bookConsultation({
  patientId,
  doctorId,
  scheduledAt,
}: BookingParams) {}
```

### 20.2 API Response Standards

```typescript
// Always use consistent response structure
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  requestId: string;
  timestamp: string;
}

// Success response
return c.json({
  success: true,
  data: booking,
  requestId: c.get('requestId'),
  timestamp: new Date().toISOString(),
});

// Error response
return c.json({
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid booking time',
    details: [{ field: 'scheduledAt', message: 'Must be in the future' }],
  },
  requestId: c.get('requestId'),
  timestamp: new Date().toISOString(),
}, 400);
```

### 20.3 Error Handling Pattern

```typescript
// Use custom error classes
class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
  }
}

// Usage in routes
app.get('/bookings/:id', async (c) => {
  try {
    const booking = await bookingService.getById(c.req.param('id'));
    if (!booking) {
      throw new NotFoundError('Booking');
    }
    return c.json({ success: true, data: booking });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      }, error.statusCode);
    }
    throw error; // Let global error handler catch it
  }
});
```

---

## 21. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Booking** | A scheduled appointment between a patient and doctor |
| **Consultation** | A medical discussion, can be online (video), onsite (in-person), or hybrid |
| **Hybrid Consultation** | A consultation with an onsite doctor and a remote specialist |
| **Retreat** | A multi-day medical recovery program at a resort |
| **Package** | A bundled offering of treatments, accommodation, and services |
| **Instant Connect** | Real-time doctor matching and video call system |
| **MediSense** | AI-powered symptom analysis system |
| **SelectPoints** | Gamification reward points system |

### Appendix B: External Service Credentials (Template)

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# SendGrid
SENDGRID_API_KEY=SG.xxxxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# Jitsi (optional, for self-hosted)
JITSI_APP_ID=xxxxx
JITSI_APP_SECRET=xxxxx

# Sentry
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Appendix C: API Endpoint Summary

| Category | Endpoints | Auth Required |
|----------|-----------|---------------|
| Authentication | 6 | Partial |
| Doctors | 8 | Partial |
| Bookings | 10 | Yes |
| Payments | 6 | Yes |
| Instant Connect | 12 | Yes |
| Retreats | 6 | Partial |
| MediSense AI | 9 | Partial |
| Wellness | 8 | Yes |
| Admin | 15 | Yes (Admin) |
| Webhooks | 3 | Signature |
| **Total** | **83** | |

### Appendix D: Contact Information

| Role | Name | Email | Responsibility |
|------|------|-------|----------------|
| Product Owner | TBD | product@selectcareos.com | Feature priorities, acceptance |
| Tech Lead | TBD | tech@selectcareos.com | Architecture, code review |
| DevOps | TBD | devops@selectcareos.com | Infrastructure, deployment |
| QA Lead | TBD | qa@selectcareos.com | Testing, quality gates |
| Security | TBD | security@selectcareos.com | Compliance, security review |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-04 | Engineering Team | Initial comprehensive specification |

---

**END OF DOCUMENT**

*SelectCareOS™ - German Medical Excellence, Egyptian Hospitality, Red Sea Recovery*

*© 2026 German Select GmbH. All rights reserved.*
