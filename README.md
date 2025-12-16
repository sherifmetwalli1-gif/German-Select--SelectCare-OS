# SelectCareOS - German Select Health Digital Platform

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2025-12-16

---

## 🏥 Project Overview

SelectCareOS is a comprehensive digital healthcare platform for German Select Health, providing end-to-end patient care management, telemedicine, remote patient monitoring (RPM), and medical tourism coordination.

### Key Features

- **🔐 Secure Authentication** - JWT-based auth with PBKDF2 password hashing
- **👥 Patient Dashboard** - Timeline, vitals tracking, care team communication
- **📹 Telemedicine** - WebRTC video consultations with virtual waiting rooms
- **📊 RPM Integration** - Apple HealthKit, Google Health Connect, device sync
- **🚨 Alert Engine** - Real-time vital monitoring with escalation support
- **💳 Payments** - Stripe integration for subscriptions and packages
- **🤖 AI Diagnostics** - Risk calculators with medical guardrails
- **✈️ CareSelect™ Journeys** - Medical tourism package builder

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Sandbox** | https://3000-iyay96oin17ul70j5b8qe-b32ec7bb.sandbox.novita.ai |
| **GitHub** | https://github.com/sherifmetwalli1-gif/German-Select--SelectCare-OS |

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/metrics` | Performance metrics |
| `POST /api/auth/login` | User login |
| `POST /api/auth/register` | User registration |
| `POST /api/auth/refresh` | Token refresh |
| `GET /api/alerts` | Patient alerts |
| `POST /api/alerts/process-vitals` | Vital analysis |
| `GET /api/rpm/devices` | RPM devices |
| `POST /api/rpm/vitals/record` | Record vitals |
| `GET /api/payments/config` | Payment configuration |
| `POST /api/telemedicine-v2/session/start` | Start video call |

---

## 🛠 Tech Stack

- **Framework:** Hono (lightweight, edge-optimized)
- **Runtime:** Cloudflare Workers/Pages
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare KV, R2
- **Frontend:** Vanilla JS + Tailwind CSS (CDN)
- **Authentication:** JWT (HS256)
- **Payments:** Stripe API

---

## 📁 Project Structure

```
webapp/
├── src/
│   ├── index.tsx           # Main application entry
│   ├── api/
│   │   ├── index.tsx       # API routes index
│   │   ├── auth.ts         # Authentication
│   │   ├── alerts.ts       # Alert management
│   │   ├── payments.ts     # Stripe integration
│   │   ├── rpm.ts          # Remote monitoring
│   │   └── telemedicine-live.ts  # Video calls
│   ├── lib/
│   │   ├── crypto.ts       # PBKDF2, HMAC
│   │   ├── jwt.ts          # JWT handling
│   │   ├── alert-engine.ts # Vital monitoring
│   │   └── ai-guardrails.ts # Medical safety
│   ├── middleware/
│   │   ├── auth.ts         # Auth middleware
│   │   ├── rate-limit.ts   # Rate limiting
│   │   ├── security.ts     # Security headers
│   │   ├── validation.ts   # Input validation
│   │   └── error-handler.ts # Error handling
│   └── pages/              # HTML page renderers
├── migrations/
│   └── 0001_initial_schema.sql  # D1 schema
├── docs/
│   ├── SECURITY_AUDIT.md   # Security checklist
│   └── COMPLIANCE_CHECKLIST.md  # HIPAA/GDPR
├── scripts/
│   └── deploy-production.sh
├── wrangler.jsonc          # Development config
├── wrangler.prod.jsonc     # Production config
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Build
npm run build

# Start development server (PM2)
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000/api/health
```

### Production Deployment
```bash
# Configure Cloudflare
npx wrangler login

# Create D1 database
npx wrangler d1 create selectcareos-production

# Set secrets
npx wrangler secret put JWT_SECRET
npx wrangler secret put STRIPE_SECRET_KEY

# Deploy
./scripts/deploy-production.sh
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|----------------|
| Password Hashing | PBKDF2 (100K iterations, SHA-256) |
| Token Signing | HMAC-SHA256 |
| Transport | TLS 1.3 (HTTPS only) |
| Headers | CSP, HSTS, X-Frame-Options |
| Rate Limiting | Sliding window, per-endpoint |
| Input Validation | Zod-like schemas |
| Audit Logging | Request tracing, user actions |

### Rate Limits
- **General API:** 100 req/min
- **Auth Login:** 5 req/15 min
- **AI Chat:** 20 req/min
- **Data Export:** 5 req/day

---

## 🏛 Compliance

### HIPAA
- ✅ Unique user identification
- ✅ Automatic logoff (token expiry)
- ✅ Encryption (transit & at rest)
- ✅ Audit controls
- ✅ Access controls (RBAC)

### GDPR
- ✅ Data minimization
- ✅ Purpose limitation
- ✅ Encryption
- ✅ Consent management (ready)
- ⏳ Data subject rights APIs

See [COMPLIANCE_CHECKLIST.md](docs/COMPLIANCE_CHECKLIST.md) for details.

---

## 📊 Data Architecture

### Core Models
- **Users** - Authentication, roles, profiles
- **Patients** - Demographics, medical history
- **Doctors** - Credentials, specialties, availability
- **Appointments** - Scheduling, status tracking
- **Vitals** - RPM readings, analysis
- **Alerts** - Real-time monitoring
- **Sessions** - Telemedicine calls
- **Prescriptions** - E-prescribing
- **Payments** - Subscriptions, transactions

### Storage Services
- **D1:** Relational data (users, appointments)
- **KV:** Sessions, rate limits, cache
- **R2:** Documents, media files

---

## 🧪 Testing

### API Testing
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"max.mustermann@email.de","password":"password123"}'

# Get token and test protected route
TOKEN="eyJ..."
curl http://localhost:3000/api/rpm/devices \
  -H "Authorization: Bearer $TOKEN"

# Process vitals (generate alerts)
curl -X POST http://localhost:3000/api/alerts/process-vitals \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"vitals":{"heartRate":160,"bloodPressureSystolic":185}}'
```

### Demo Accounts
| Email | Password | Role |
|-------|----------|------|
| max.mustermann@email.de | password123 | Patient |
| l.weber@germanselect.org | password123 | Doctor |
| admin@germanselect.org | password123 | Admin |

---

## 📈 Sprint Completion Summary

### ✅ Sprint 1 - Quick Wins (Completed)
- OpenTelemetry instrumentation
- Rate limiting middleware
- Security headers
- Response compression
- Cache headers
- Input validation
- Error handling
- D1 database schema

### ✅ Sprint 2 - Authentication (Completed)
- JWT implementation
- Password hashing (PBKDF2)
- Session management
- Refresh tokens
- Auth middleware
- Role-based access

### ✅ Sprint 3 - Payments & Telemedicine (Completed)
- Stripe integration
- Subscription management
- Webhook handling
- WebRTC video calls
- Virtual waiting room

### ✅ Sprint 4 - RPM (Completed)
- Device integration APIs
- Vitals ingestion
- Alert engine
- Trend analysis
- Escalation rules

### ✅ Sprint 5 - Infrastructure (Completed)
- Multi-region config
- Security audit prep
- Production wrangler config
- Deployment scripts

### ✅ Sprint 6 - Compliance (Completed)
- AI guardrails
- Medical disclaimers
- HIPAA checklist
- GDPR checklist
- Launch prep

---

## 🔄 Next Steps

### Production Launch
1. Create production D1 database
2. Configure KV/R2 buckets
3. Set production secrets
4. Deploy to Cloudflare Pages
5. Configure custom domain
6. Enable WAF rules

### Future Enhancements
- HL7 FHIR interoperability
- Apple Watch integration
- Multi-language support (DE/EN/AR)
- Family member access
- Insurance integration

---

## 📞 Support

- **Technical:** tech@germanselect.org
- **Medical:** medical@germanselect.org
- **General:** support@selectcareos.com

---

## 📄 License

Proprietary - German Select Health GmbH © 2025

All rights reserved. Unauthorized use prohibited.
