# SelectCareOS™ Developer Guide

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Directory Structure](#directory-structure)
3. [Code Standards](#code-standards)
4. [Component System](#component-system)
5. [API Development](#api-development)
6. [Styling & Branding](#styling--branding)
7. [Testing Guidelines](#testing-guidelines)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Project Architecture

### Technology Stack
- **Runtime**: Cloudflare Workers (Edge Computing)
- **Framework**: Hono v4.x (TypeScript)
- **Build**: Vite 5.x
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV
- **Styling**: TailwindCSS (CDN) + Custom CSS Design System

### Architecture Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│  │  D1 DB   │   │    KV    │   │    R2    │   │ Workers  │ │
│  │ (SQLite) │   │ (Cache)  │   │ (Storage)│   │ (Compute)│ │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    Hono Framework (index.tsx)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Routes    │  │  Services   │  │   Pages     │         │
│  │ /src/routes │  │/src/services│  │ /src/pages  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Components  │  │   Styles    │  │   Utils     │         │
│  │/src/components│ │/src/styles │  │ /src/utils  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
webapp/
├── src/
│   ├── index.tsx              # Main entry point - all routes registered here
│   ├── renderer.tsx           # JSX renderer configuration
│   │
│   ├── data/                  # Static data modules (NEW - Refactored)
│   │   ├── index.ts           # Central export point for all data
│   │   ├── doctors.ts         # German Select Medical Team
│   │   ├── packages.ts        # Care packages (HealBridge, VitaCare, etc.)
│   │   ├── treatments.ts      # Treatment categories & procedures
│   │   ├── retreats.ts        # Medical retreats & SELECT hotels
│   │   ├── accommodations.ts  # Hotels, excursions, wellness services
│   │   └── aesthetic-packages.ts # Aesthetic tourism packages
│   │
│   ├── components/            # Reusable UI components
│   │   ├── bottom-nav.ts      # Unified bottom navigation
│   │   └── shared-ui.ts       # Shared header, page wrapper
│   │
│   ├── pages/                 # Page components (HTML generators)
│   │   ├── dashboard.ts       # Legacy dashboard
│   │   ├── patient-dashboard.ts  # Main patient dashboard (6k+ lines)
│   │   ├── doctor-dashboard.ts   # Doctor dashboard with calendar
│   │   ├── services.ts        # Services page with packages
│   │   ├── medisense-ui.ts    # MediSense AI symptom analyzer
│   │   ├── health-calculators.ts # BMI, body fat calculators
│   │   ├── booking.ts         # Booking system
│   │   ├── doctors.ts         # Doctor listing
│   │   ├── instant-doctor.ts  # Instant connect UI
│   │   └── ... (30+ more)
│   │
│   ├── routes/                # API route handlers (modular)
│   │   ├── auth.ts            # Authentication endpoints
│   │   ├── bookings.ts        # Booking CRUD
│   │   ├── doctors.ts         # Doctor endpoints
│   │   ├── payments.ts        # Stripe integration
│   │   ├── medisense-api.ts   # MediSense endpoints
│   │   ├── wellness.ts        # Wellness tracking
│   │   └── ... (15+ more)
│   │
│   ├── services/              # Business logic & data
│   │   ├── instant-connect/   # Telemedicine system
│   │   │   ├── index.ts       # Main exports
│   │   │   ├── smart-matching.ts  # AI doctor matching
│   │   │   ├── consultation-queue.ts # Queue management
│   │   │   ├── video-service.ts    # Jitsi integration
│   │   │   └── types.ts       # TypeScript types
│   │   ├── conditions-database.ts  # Medical conditions
│   │   ├── symptoms-database.ts    # Symptom definitions
│   │   ├── dashboard-i18n.ts  # Dashboard translations
│   │   ├── app-i18n.ts        # App-wide translations
│   │   └── ... (10+ more)
│   │
│   ├── styles/                # CSS design system
│   │   └── brand.ts           # UNIFIED_CSS, colors, components
│   │
│   ├── middleware/            # Hono middleware
│   │   ├── auth.ts            # JWT authentication
│   │   ├── rate-limiter.ts    # Rate limiting
│   │   └── validation.ts      # Request validation
│   │
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts           # Global types
│   │
│   └── utils/                 # Utilities
│       ├── helpers.ts         # Common helpers
│       ├── logger.ts          # Logging utilities
│       └── sanitize.ts        # Input sanitization
│
├── public/                    # Static assets
│   └── static/
│       └── style.css          # Additional styles
│
├── dist/                      # Build output (auto-generated)
│   └── _worker.js             # Bundled worker
│
├── .wrangler/                 # Local dev state (auto-generated)
│
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite build config
├── wrangler.jsonc             # Cloudflare config
├── ecosystem.config.cjs       # PM2 config
├── README.md                  # Project documentation
└── DEVELOPER_GUIDE.md         # This file
```

---

## Code Standards

### TypeScript Guidelines

1. **Use explicit types** - Avoid `any` where possible
```typescript
// ✅ Good
const doctors: Doctor[] = DOCTORS.filter(d => d.available)

// ❌ Bad
const doctors: any = DOCTORS.filter(d => d.available)
```

2. **Use const assertions for static data**
```typescript
const BRAND_COLORS = {
  navy: '#001F3F',
  gold: '#D4A843',
} as const
```

3. **Import static data from centralized modules**
```typescript
// ✅ Good - Import from data module
import { DOCTORS, getDoctorById } from '../data'
import { CARE_PACKAGES, TREATMENT_CATEGORIES } from '../data'

// ❌ Bad - Don't define large data objects inline
const DOCTORS = [...] // Move to src/data/doctors.ts
```

3. **Export types alongside implementations**
```typescript
export type ActivePage = 'home' | 'medisense' | 'connect' | 'doctors' | 'profile'
export function getBottomNav(activePage: ActivePage): string { ... }
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `patient-dashboard.ts` |
| Functions | camelCase | `getBottomNav()` |
| Constants | SCREAMING_SNAKE | `BRAND_COLORS` |
| Types | PascalCase | `ConsultationRequest` |
| CSS Classes | kebab-case | `.bottom-nav-container` |

### File Organization

- **Pages**: Export a function that returns HTML string
- **Routes**: Export Hono router or handler functions
- **Services**: Export pure business logic
- **Components**: Export reusable UI generators

---

## Component System

### Unified Brand System

Import from `src/styles/brand.ts`:

```typescript
import { UNIFIED_CSS, BRAND_COLORS, getUnifiedBottomNav, getUnifiedHeader } from '../styles/brand'
```

### Available Components

| Component | Location | Description |
|-----------|----------|-------------|
| `UNIFIED_CSS` | brand.ts | Complete CSS design system |
| `BRAND_HEAD` | brand.ts | HTML head with fonts & meta |
| `getUnifiedBottomNav(page)` | brand.ts | Standard bottom navigation |
| `getUnifiedHeader(title)` | brand.ts | Standard page header |
| `getBottomNav(page)` | bottom-nav.ts | Alternative bottom nav |
| `sharedHeader(lang, options)` | shared-ui.ts | i18n header component |
| `pageWrapper(lang, options)` | shared-ui.ts | Full page wrapper |

### Usage Example

```typescript
import { UNIFIED_CSS, BRAND_HEAD, getUnifiedBottomNav } from '../styles/brand'

export function myPage(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BRAND_HEAD}
      <title>My Page</title>
      <style>${UNIFIED_CSS}</style>
    </head>
    <body>
      <!-- Content -->
      ${getUnifiedBottomNav('home')}
    </body>
    </html>
  `
}
```

---

## API Development

### Adding New Endpoints

1. **Simple endpoint** - Add directly to `index.tsx`:
```typescript
app.get('/api/my-endpoint', (c) => {
  return c.json({ success: true, data: myData })
})
```

2. **Complex endpoint** - Create separate route file:
```typescript
// src/routes/my-feature.ts
import { Hono } from 'hono'

const router = new Hono()

router.get('/list', (c) => { ... })
router.post('/create', async (c) => { ... })

export default router

// Then in index.tsx:
import myFeatureRouter from './routes/my-feature'
app.route('/api/my-feature', myFeatureRouter)
```

### Response Format

Always use consistent JSON response format:

```typescript
// Success
return c.json({
  success: true,
  data: { ... },
  message: 'Optional message'
})

// Error
return c.json({
  success: false,
  error: 'Error description',
  details: 'Optional details'
}, 400) // HTTP status code
```

### Request Validation

```typescript
app.post('/api/endpoint', async (c) => {
  const body = await c.req.json()
  
  if (!body.requiredField) {
    return c.json({ success: false, error: 'Missing required field' }, 400)
  }
  
  // Process request...
})
```

---

## Styling & Branding

### Color Tokens

```css
:root {
  /* Primary */
  --navy: #001F3F;
  --navy-light: #003366;
  --gold: #D4A843;
  --gold-bright: #E8C158;
  
  /* Backgrounds */
  --cream: #FDFBF7;
  --cream-warm: #FDF8EC;
  
  /* Status */
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #DC2626;
}
```

### Utility Classes

```css
/* Colors */
.bg-navy, .bg-gold, .bg-cream
.text-navy, .text-gold
.border-gold, .border-navy

/* Gradients */
.gradient-navy, .gradient-gold

/* Components */
.card - White rounded card with shadow
.btn-primary - Navy button
.btn-secondary - Outlined button
```

### Responsive Breakpoints

```css
/* Mobile first */
@media (max-width: 360px) { /* Small phones */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

## Testing Guidelines

### Manual Testing Checklist

1. **All page routes return 200**:
```bash
for route in "/" "/dashboard" "/services" "/medisense" "/calculators"; do
  curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route"
done
```

2. **API health check**:
```bash
curl http://localhost:3000/api/health
```

3. **Bottom navigation present on all pages**:
```bash
curl -s http://localhost:3000/dashboard | grep -c "bottom-nav"
```

4. **Gold color consistency** (should use `#D4A843`, not `#C9A227`):
```bash
curl -s http://localhost:3000/dashboard | grep -c "D4A843"
```

### Critical Endpoints to Test

| Endpoint | Expected Response |
|----------|-------------------|
| `/api/health` | `{"success":true,"status":"healthy"}` |
| `/api/doctors` | Array of doctor objects |
| `/api/packages` | Array of package objects |
| `/api/instant-connect/stats` | Queue and doctor stats |

---

## Deployment

### Local Development

```bash
# Install dependencies
npm install

# Build (REQUIRED before dev server)
npm run build

# Start with PM2
pm2 start ecosystem.config.cjs

# Check status
pm2 list
pm2 logs --nostream
```

### Production Deployment

```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name selectcareos-app
```

### Environment Variables

For production, set secrets via Wrangler:
```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name selectcareos-app
npx wrangler pages secret put JWT_SECRET --project-name selectcareos-app
```

---

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart selectcareos
```

2. **Build fails**
- Check TypeScript errors: `npx tsc --noEmit`
- Clear cache: `rm -rf .wrangler/tmp`

3. **Duplicate route error**
- Search for duplicate: `grep -n "app.get('/route'" src/index.tsx`
- Remove duplicate definition

4. **Styles not applying**
- Ensure `UNIFIED_CSS` is imported
- Check for legacy color tokens (`#C9A227` → `#D4A843`)

5. **Bottom nav missing**
- Import `getUnifiedBottomNav` from brand.ts
- Add at end of body, before `</body>`

### Debug Mode

Add console logs for debugging (remove before commit):
```typescript
console.log('[DEBUG]', variableName)
```

---

## Code Review Checklist

Before submitting changes:

- [ ] No duplicate routes
- [ ] Consistent response format
- [ ] UNIFIED_CSS imported for new pages
- [ ] Bottom navigation present
- [ ] Gold color is `#D4A843` (not `#C9A227`)
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] No console.log statements in production code

---

*Last updated: January 26, 2026*
*Version: 2.4.0*
