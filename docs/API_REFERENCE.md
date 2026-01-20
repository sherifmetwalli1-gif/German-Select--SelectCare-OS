# SelectCareOS API Reference

## Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://selectcareos-app.pages.dev`

## Authentication
Most endpoints currently work without authentication. Future versions will require JWT tokens.

---

## Core APIs

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "service": "SelectCareOS Platform",
  "version": "2.0.0",
  "provider": "German Select",
  "timestamp": "2026-01-20T12:00:00.000Z",
  "instantConnect": {
    "initialized": true,
    "stats": {
      "totalDoctors": 10,
      "availableDoctors": 10,
      "busyDoctors": 0,
      "offlineDoctors": 0,
      "avgResponseTime": 46,
      "avgRating": 4.8
    }
  }
}
```

### API Info
```http
GET /api
```

**Response:**
```json
{
  "name": "SelectCareOS API",
  "version": "2.0.0",
  "description": "German Select Medical Tourism Platform",
  "provider": "German Select",
  "website": "https://www.germanselect.org",
  "endpoints": {
    "doctors": "/api/doctors",
    "packages": "/api/packages",
    "treatments": "/api/treatments"
  }
}
```

---

## Doctor APIs

### List All Doctors
```http
GET /api/doctors
GET /api/doctors?specialization=Bariatric%20Surgery
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| specialization | string | Filter by specialty |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "dr-metwalli",
      "name": "Dr. med. Sherif Akram Metwalli, M.Sc.",
      "specialization": "Plastic & Reconstructive Surgery",
      "languages": ["German", "English", "Arabic"],
      "experience_years": 20,
      "location": "Germany / Hurghada",
      "consultation_fee": 150,
      "rating": 4.9,
      "total_reviews": 247,
      "isPremium": true,
      "isAvailable": true
    }
  ],
  "total": 10
}
```

### Get Doctor by ID
```http
GET /api/doctors/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dr-metwalli",
    "name": "Dr. med. Sherif Akram Metwalli, M.Sc.",
    "title": "Founder & CMO",
    "specialization": "Plastic & Reconstructive Surgery",
    "subspecialties": ["Body Contouring", "Breast Surgery"],
    "qualifications": ["German Board Certified"],
    "languages": ["German", "English", "Arabic"],
    "experience_years": 20,
    "location": "Germany / Hurghada",
    "consultation_fee": 150,
    "video_consultation_fee": 100,
    "rating": 4.9,
    "total_reviews": 247,
    "bio": "...",
    "availability": { ... }
  }
}
```

### Get Doctor Availability
```http
GET /api/doctors/:id/availability
GET /api/doctors/:id/availability?week=0&type=onsite
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| week | number | 0 | Week offset (0 = current week) |
| type | string | onsite | Slot type: onsite, video, both |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "dr-metwalli-2026-01-21-09:00",
      "date": "2026-01-21",
      "startTime": "09:00",
      "endTime": "09:30",
      "duration": 30,
      "available": true,
      "type": "onsite",
      "location": "Germany / Hurghada"
    }
  ]
}
```

---

## Instant Connect APIs

### Get System Stats
```http
GET /api/instant-connect/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "doctors": {
      "total": 10,
      "available": 10,
      "busy": 0,
      "offline": 0
    },
    "avgResponseTime": 45,
    "avgRating": 4.8,
    "queue": {
      "totalInQueue": 0,
      "avgWaitTime": 0,
      "longestWait": 0
    },
    "estimatedNextMatch": 45
  },
  "timestamp": "2026-01-20T12:00:00.000Z"
}
```

### Get Available Doctors
```http
GET /api/instant-connect/doctors
GET /api/instant-connect/doctors?specialty=Cardiology&language=German&limit=5
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| specialty | string | Filter by specialty |
| language | string | Filter by language |
| limit | number | Max results (default: 10) |

### Request Instant Connection
```http
POST /api/instant-connect/connect
Content-Type: application/json

{
  "patientId": "patient-123",
  "patientName": "John Doe",
  "specialty": "Cardiology",
  "language": "German",
  "urgency": "routine",
  "symptoms": "Chest pain"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| patientId | string | Yes | Unique patient ID |
| patientName | string | Yes | Patient display name |
| specialty | string | No | Preferred specialty |
| language | string | No | Preferred language |
| urgency | string | No | routine, urgent, emergency |
| symptoms | string | No | Brief symptom description |

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "req-abc123",
    "status": "matched",
    "matchedDoctor": {
      "id": "dr-muller",
      "name": "Dr. K. Muller",
      "specialization": "Cardiology"
    },
    "estimatedWaitTime": 30
  }
}
```

### Get Request Status
```http
GET /api/instant-connect/request/:id
```

### Cancel Request
```http
DELETE /api/instant-connect/request/:id
```

---

## Doctor Schedule APIs

### Get Doctor Schedule
```http
GET /api/instant-connect/doctor/:id/schedule
```

**Response:**
```json
{
  "success": true,
  "data": {
    "doctorId": "dr-metwalli",
    "weeklySchedule": {
      "0": { "enabled": false, "slots": [] },
      "1": { 
        "enabled": true, 
        "slots": [
          { "start": "09:00", "end": "12:00" },
          { "start": "14:00", "end": "18:00" }
        ]
      },
      "2": { "enabled": true, "slots": [...] },
      "3": { "enabled": true, "slots": [...] },
      "4": { "enabled": true, "slots": [...] },
      "5": { "enabled": true, "slots": [...] },
      "6": { "enabled": false, "slots": [] }
    },
    "blockedTimes": [],
    "settings": {
      "slotDuration": 30,
      "bufferTime": 5,
      "maxDailySlots": 20,
      "allowInstantBooking": true,
      "allowOnlineBooking": true,
      "bookingWindowDays": 30
    }
  }
}
```

### Save Doctor Schedule
```http
POST /api/instant-connect/doctor/schedule
Content-Type: application/json

{
  "doctorId": "dr-metwalli",
  "schedule": {
    "0": { "enabled": false, "slots": [] },
    "1": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] }
  }
}
```

### Get Available Slots
```http
GET /api/instant-connect/doctor/:id/available-slots
GET /api/instant-connect/doctor/:id/available-slots?days=14
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| days | number | 7 | Number of days to fetch |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "dr-metwalli-2026-01-21-09:00",
      "date": "2026-01-21",
      "startTime": "09:00",
      "endTime": "09:30",
      "duration": 30,
      "available": true,
      "type": "telemedicine"
    }
  ],
  "total": 60,
  "settings": {
    "onlineBookingEnabled": true,
    "bookingWindowDays": 30
  }
}
```

### Add Blocked Time
```http
POST /api/instant-connect/doctor/:id/blocked-time
Content-Type: application/json

{
  "reason": "vacation",
  "startTime": "2026-02-01T00:00:00",
  "endTime": "2026-02-07T23:59:59",
  "notes": "Annual vacation"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| reason | string | Yes | vacation, conference, personal, other |
| startTime | string | Yes | ISO 8601 datetime |
| endTime | string | Yes | ISO 8601 datetime |
| notes | string | No | Additional notes |

### Remove Blocked Time
```http
DELETE /api/instant-connect/doctor/:id/blocked-time/:blockId
```

### Get Consultation History
```http
GET /api/instant-connect/doctor/:id/history
GET /api/instant-connect/doctor/:id/history?status=completed&limit=20&offset=0
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| status | string | all | all, completed, cancelled, no_show |
| limit | number | 20 | Results per page |
| offset | number | 0 | Pagination offset |

### Get Doctor Earnings
```http
GET /api/instant-connect/doctor/:id/earnings
GET /api/instant-connect/doctor/:id/earnings?period=month
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| period | string | month | day, week, month, year |

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "totalEarnings": 2450,
    "consultationCount": 47,
    "avgPerConsultation": 52,
    "pendingPayouts": 350,
    "lastPayout": "2026-01-15"
  }
}
```

---

## Doctor Actions

### Update Doctor Status
```http
POST /api/instant-connect/doctor/status
Content-Type: application/json

{
  "doctorId": "dr-metwalli",
  "status": "available"
}
```

**Status Values:** `available`, `busy`, `offline`

### Accept Consultation Request
```http
POST /api/instant-connect/doctor/accept
Content-Type: application/json

{
  "doctorId": "dr-metwalli",
  "requestId": "req-abc123"
}
```

**Response:**
```json
{
  "success": true,
  "consultationId": "consult-xyz789",
  "videoRoomUrl": "https://meet.jit.si/selectcare-xyz789",
  "message": "Request accepted. Video room ready."
}
```

### Decline Consultation Request
```http
POST /api/instant-connect/doctor/decline
Content-Type: application/json

{
  "doctorId": "dr-metwalli",
  "requestId": "req-abc123",
  "reason": "Not available"
}
```

---

## Video Consultation APIs

### Get Video Room URL
```http
GET /api/instant-connect/consultation/:id/video
GET /api/instant-connect/consultation/:id/video?role=doctor&name=Dr.%20Smith
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| role | string | doctor or patient |
| name | string | Display name in call |

### Start Consultation
```http
POST /api/instant-connect/consultation/:id/start
Content-Type: application/json

{
  "role": "doctor"
}
```

### End Consultation
```http
POST /api/instant-connect/consultation/:id/end
Content-Type: application/json

{
  "role": "doctor",
  "notes": "Follow-up in 2 weeks",
  "prescriptions": []
}
```

---

## Package & Treatment APIs

### List Packages
```http
GET /api/packages
```

### List Treatments
```http
GET /api/treatments
```

### List Wellness Services
```http
GET /api/wellness
```

### List Accommodations
```http
GET /api/accommodations
```

### List Excursions
```http
GET /api/excursions
```

---

## Health & Vitals APIs

### Get Current Vitals
```http
GET /api/vitals/current
```

### Get Vitals History
```http
GET /api/vitals/history
```

### Get Connected Devices
```http
GET /api/devices
```

### Get AI Health Analysis
```http
GET /api/ai/analysis
```

---

## User & Rewards APIs

### Get User Stats
```http
GET /api/user/stats
```

### Get Subscription Tiers
```http
GET /api/subscriptions/tiers
```

### Get Rewards Config
```http
GET /api/rewards/config
```

### Get Marketplace Products
```http
GET /api/marketplace/products
```

---

## MediSense Pro APIs

### Get System Stats
```http
GET /api/medisense-pro/stats
```

### Health Check
```http
GET /api/medisense-pro/health
```

### Search Symptoms
```http
GET /api/medisense-pro/symptoms?query=chest
```

### List Conditions
```http
GET /api/medisense-pro/conditions
```

### Get Condition Details
```http
GET /api/medisense-pro/conditions/:id
```

### List Medications
```http
GET /api/medisense-pro/medications
```

### Analyze Symptoms
```http
POST /api/medisense-pro/analyze
Content-Type: application/json

{
  "symptoms": [
    { "id": "chest-pain", "severity": "severe", "duration": "hours", "onset": "sudden" },
    { "id": "shortness-breath", "severity": "moderate" }
  ],
  "profile": {
    "age": 55,
    "gender": "male",
    "preExistingConditions": ["hypertension"],
    "familyHistory": ["heart-disease"],
    "lifestyle": { "smoking": true, "exercise": "sedentary" }
  }
}
```

### Check Drug Interactions
```http
POST /api/medisense-pro/drug-check
Content-Type: application/json

{
  "medications": ["aspirin", "warfarin"]
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error code",
  "message": "Human-readable message",
  "details": [] // Optional validation errors
}
```

### HTTP Status Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Auth required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

*Last Updated: January 2026*
