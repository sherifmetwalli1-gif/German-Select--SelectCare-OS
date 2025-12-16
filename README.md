# SelectCareOS™ | German Select Health Digital Platform

## Project Overview
- **Name**: SelectCareOS™
- **Version**: 1.0.0
- **Goal**: World-class digital health platform for German Select Health - combining German medical excellence with Red Sea recovery
- **Launch Target**: 2026

## Live Demo URLs
- **Development**: https://3000-iyay96oin17ul70j5b8qe-b32ec7bb.sandbox.novita.ai

## Features Implemented

### Patient Dashboard (`/patient`)
- Recovery timeline visualization with milestones
- Progress tracking (75% complete indicator)
- Surgery preparation status
- Upcoming appointments
- Care team overview
- Health summary vitals
- SelectScore™ readiness indicator
- Quick actions navigation
- Today's tasks checklist

### Recovery Timeline (`/patient/timeline`)
- Complete surgery timeline from pre-op to follow-up
- Week-by-week milestones
- Phase progress tracking
- Appointment integration

### Care Team (`/patient/care-team`)
- German board-certified doctors listing
- Video call integration
- Message functionality
- Specialty search
- Emergency contact support
- Doctor profiles with ratings

### Telemedicine (`/patient/telemedicine`)
- Video consultation scheduling
- Available doctors with wait times
- Consultation history
- Pre-call checklist
- Multi-language support
- Technical support integration

### Remote Patient Monitoring (`/patient/rpm`)
- Real-time vitals tracking (Heart rate, BP, Temperature, SpO2, Weight, Glucose)
- Activity summary (Steps, Calories, Active minutes)
- Sleep analysis with stages
- Heart rate trends
- Connected devices management (Apple Watch, Withings, Oura)
- Health goals tracking

### AI Health Assistant (`/patient/ai-diagnostics`)
- Risk calculators (ASCVD, Diabetes, BMI, eGFR)
- Document/image analysis upload
- AI chat interface
- Evidence-based recommendations
- Health insights with sources

### Wellness Hub (`/patient/wellness`)
- Nutrition tracking with macros
- Meal planning
- Exercise tracking
- Mood journaling
- Sleep hygiene tools
- Wellness resources library
- Activity streaks

### Booking System (`/patient/booking`)
- Telemedicine/Onsite selection
- Specialty filtering
- Doctor selection with availability
- Calendar date picker
- Time slot selection
- Consultation type selection
- Booking summary

### Marketplace (`/patient/marketplace`)
- Surgery packages (SelectCare, SelectCare+, SelectCrown)
- Red Sea accommodations
- Excursions & activities (Yacht, Snorkeling, Desert Safari)
- Anti-aging & wellness treatments
- Membership tiers (Silver, Gold, Platinum)
- Cart functionality

### User Profile (`/patient/profile`)
- Personal information
- Medical information
- Connected devices management
- Membership status
- Settings

### Doctor Dashboard (`/doctor`)
- Today's schedule overview
- RPM alerts
- Patient panel with status
- Appointment management
- Care pathway templates
- Partner commission tracking

### Landing Page (`/`)
- Service overview
- How it works steps
- Package pricing
- Platform features
- Trust indicators

## API Endpoints

### Health Check
- `GET /api/health` - System status

### Patient Data
- `GET /api/patients` - List patients
- `GET /api/patients/:id` - Patient details

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment

### Care Plan
- `GET /api/timeline` - Recovery timeline
- `GET /api/tasks` - Daily tasks
- `POST /api/tasks/:id/complete` - Complete task

### Vitals & RPM
- `GET /api/vitals` - Current vitals
- `POST /api/vitals` - Record vitals

### Care Team
- `GET /api/care-team` - Patient's care team
- `GET /api/doctors` - All doctors

### Messaging
- `GET /api/messages` - Conversations
- `POST /api/messages` - Send message

### Marketplace
- `GET /api/marketplace/packages` - Surgery packages
- `GET /api/marketplace/accommodations` - Hotels/villas
- `GET /api/marketplace/excursions` - Activities
- `GET /api/marketplace/wellness` - Treatments

### AI Services
- `GET /api/ai/risk-calculators` - Risk scores
- `POST /api/ai/chat` - AI assistant

### User Data
- `GET /api/selectscore` - SelectScore
- `GET /api/memberships` - Membership info
- `GET /api/devices` - Connected devices

### Telemedicine
- `GET /api/telemedicine/available` - Available doctors
- `POST /api/telemedicine/start` - Start session

## Tech Stack
- **Framework**: Hono (TypeScript)
- **Platform**: Cloudflare Pages/Workers
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Typography**: Inter (Google Fonts)
- **Charts**: Chart.js
- **Date**: Day.js

## Design System

### Brand Colors
- **Navy** (Primary): `#1A2E4A`
- **Gold** (Accent): `#C9A962`
- **Cream** (Background): `#FDF9F3`
- **Teal**: `#4A9B9B`
- **Red**: `#E74C3C`
- **Green**: `#27AE60`
- **Blue**: `#3498DB`
- **Purple**: `#9B59B6`

### Typography
- Font Family: Inter
- Weights: 300, 400, 500, 600, 700, 800

## Project Structure
```
webapp/
├── src/
│   ├── index.tsx           # Main app routes
│   ├── renderer.tsx        # HTML renderer
│   ├── api.tsx             # API routes
│   ├── pages/              # Page components
│   │   ├── landing.tsx
│   │   ├── login.tsx
│   │   ├── patient-dashboard.tsx
│   │   ├── doctor-dashboard.tsx
│   │   ├── timeline.tsx
│   │   ├── care-team.tsx
│   │   ├── messages.tsx
│   │   ├── profile.tsx
│   │   ├── booking.tsx
│   │   ├── marketplace.tsx
│   │   ├── ai-diagnostics.tsx
│   │   ├── rpm.tsx
│   │   ├── wellness.tsx
│   │   └── telemedicine.tsx
│   └── components/
│       └── layout.tsx      # Reusable components
├── public/
│   └── static/
│       ├── style.css       # Custom styles
│       └── app.js          # Client-side JS
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc
└── ecosystem.config.cjs    # PM2 config
```

## Development Commands
```bash
# Install dependencies
npm install

# Build
npm run build

# Development server (sandbox)
npm run dev:sandbox

# Deploy to Cloudflare
npm run deploy
```

## Features Not Yet Implemented
- [ ] Real database integration (D1 recommended)
- [ ] User authentication (Auth0/Clerk)
- [ ] Real-time video calling (Jitsi/Twilio)
- [ ] Wearable device integration
- [ ] Push notifications
- [ ] Payment processing (Stripe)
- [ ] E-learning modules
- [ ] Partner portal
- [ ] Multi-language support (DE/AR)

## Recommended Next Steps
1. **Database Setup**: Configure Cloudflare D1 for data persistence
2. **Authentication**: Integrate Auth0 or Clerk for secure login
3. **Video Integration**: Add Jitsi or Twilio for telemedicine
4. **Wearable APIs**: Connect HealthKit/Health Connect
5. **Payment Gateway**: Integrate Stripe for subscriptions
6. **Notifications**: Add Firebase/APNs for push
7. **i18n**: Add German and Arabic translations
8. **Testing**: Add Playwright e2e tests

## User Guide

### For Patients
1. Visit the landing page and click "Get Started"
2. Create an account or sign in
3. Access your dashboard to view:
   - Recovery progress
   - Upcoming appointments
   - Daily tasks
4. Use quick actions for:
   - Telemedicine consultations
   - Booking appointments
   - Health monitoring
   - AI assistance
5. Explore marketplace for packages and activities

### For Doctors
1. Access `/doctor` for the doctor dashboard
2. View today's schedule and RPM alerts
3. Manage patient consultations
4. Track referral commissions

## Deployment Status
- **Platform**: Cloudflare Pages (pending deployment)
- **Status**: Development Ready
- **Last Updated**: December 2024

## Contact
- **Website**: www.germanselect.org
- **Email**: info@germanselect.org

---
© 2024 German Select Health. All rights reserved.
GDPR Compliant | JCI Certified Partners
