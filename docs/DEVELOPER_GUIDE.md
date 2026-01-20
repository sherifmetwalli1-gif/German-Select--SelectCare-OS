# SelectCareOS Developer Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [API Documentation](#api-documentation)
7. [Adding New Features](#adding-new-features)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Code Standards](#code-standards)

---

## Project Overview

**SelectCareOS** is a world-class digital health and medical tourism platform built with:
- **Framework**: Hono (TypeScript) - Lightweight, fast web framework
- **Platform**: Cloudflare Workers/Pages - Edge deployment
- **Build Tool**: Vite
- **Styling**: TailwindCSS (via CDN)
- **Icons**: FontAwesome 6.4
- **Charts**: Chart.js

### Key Features
- Instant Connect Telemedicine System
- Doctor Dashboard with Schedule Management
- Patient Dashboard with Health Tracking
- MediSense AI Symptom Analyzer
- Booking System
- Multi-language Support (EN/DE/AR)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Workers   │  │    Pages    │  │     KV      │          │
│  │  (API/SSR)  │  │  (Static)   │  │  (Cache)    │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│         │                │                │                  │
│         └────────────────┼────────────────┘                  │
│                          │                                   │
│                    ┌─────▼─────┐                             │
│                    │   Hono    │                             │
│                    │  Router   │                             │
│                    └─────┬─────┘                             │
└──────────────────────────┼──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │   Pages   │   │    API    │   │ Services  │
    │  (Views)  │   │ (Routes)  │   │ (Logic)   │
    └───────────┘   └───────────┘   └───────────┘
```

### Request Flow
1. Request hits Cloudflare Edge
2. Hono router matches route
3. Middleware processes request (CORS, auth, logging)
4. Route handler executes
5. Services perform business logic
6. Response returned (HTML/JSON)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Cloudflare account (for deployment)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd webapp

# Install dependencies
npm install

# Start development server
npm run build
pm2 start ecosystem.config.cjs

# Or use wrangler directly
npm run dev:sandbox
```

### Environment Setup

Create `.dev.vars` for local development:
```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
JWT_SECRET=your-secret-key
ENVIRONMENT=development
```

---

## Project Structure

```
webapp/
├── src/
│   ├── index.tsx           # Main entry - Hono app & all routes
│   ├── renderer.tsx        # HTML renderer utility
│   ├── pages/              # Page components (HTML generators)
│   │   ├── doctor-dashboard.ts
│   │   ├── patient-dashboard.ts
│   │   ├── booking.ts
│   │   ├── instant-doctor.ts
│   │   └── ...
│   ├── services/           # Business logic & data
│   │   ├── instant-connect/  # Telemedicine system
│   │   │   ├── index.ts      # Service exports
│   │   │   ├── types.ts      # TypeScript types
│   │   │   ├── smart-matching.ts
│   │   │   ├── consultation-queue.ts
│   │   │   └── video-service.ts
│   │   ├── database.ts
│   │   ├── stripe.ts
│   │   └── ...
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # All platform types
│   ├── utils/              # Utility functions
│   │   ├── helpers.ts
│   │   ├── logger.ts
│   │   └── sanitize.ts
│   ├── middleware/         # Hono middleware
│   ├── components/         # Reusable UI components
│   └── styles/             # CSS/styling
├── public/                 # Static assets
├── migrations/             # D1 database migrations
├── docs/                   # Documentation
├── test-api.sh            # API test suite
├── test-pages.sh          # Page test suite
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── vite.config.ts         # Vite build config
└── package.json
```

---

## Development Workflow

### Daily Development

```bash
# Start dev server (after initial build)
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs

# Watch logs
pm2 logs selectcareos --nostream

# Test endpoints
curl http://localhost:3000/api/health

# Run test suites
./test-api.sh
./test-pages.sh
```

### Making Changes

1. **Edit code** in `src/` directory
2. **Rebuild**: `npm run build`
3. **Restart**: `pm2 restart selectcareos`
4. **Test**: `curl http://localhost:3000/your-endpoint`

### Hot Reloading

Wrangler pages dev provides some hot reloading, but for major changes:
```bash
npm run build && pm2 restart selectcareos
```

---

## API Documentation

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/doctors` | GET | List all doctors |
| `/api/doctors/:id` | GET | Get doctor by ID |
| `/api/packages` | GET | List care packages |

### Instant Connect (Telemedicine)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/instant-connect/stats` | GET | System statistics |
| `/api/instant-connect/doctors` | GET | Available doctors |
| `/api/instant-connect/connect` | POST | Request instant connection |
| `/api/instant-connect/doctor/:id/schedule` | GET | Doctor's schedule |
| `/api/instant-connect/doctor/:id/available-slots` | GET | Bookable time slots |

### Response Format

All API responses follow this structure:
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

---

## Adding New Features

### Adding a New Page

1. **Create page file** in `src/pages/`:
```typescript
// src/pages/my-new-page.ts
export function myNewPage(params: { lang?: string }): string {
  const lang = params.lang || 'en';
  
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Page - SelectCareOS</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <!-- Your content -->
    </body>
    </html>
  `;
}
```

2. **Add route** in `src/index.tsx`:
```typescript
import { myNewPage } from './pages/my-new-page';

app.get('/my-page', (c) => {
  const lang = c.req.query('lang') || 'en';
  return c.html(myNewPage({ lang }));
});
```

### Adding a New API Endpoint

```typescript
// In src/index.tsx

// GET endpoint
app.get('/api/my-resource', (c) => {
  const data = { /* your data */ };
  return c.json({ success: true, data });
});

// POST endpoint
app.post('/api/my-resource', async (c) => {
  const body = await c.req.json();
  // Process data
  return c.json({ success: true, data: result });
});
```

### Adding a New Service

1. **Create service file** in `src/services/`:
```typescript
// src/services/my-service.ts
export class MyService {
  private data: Map<string, any> = new Map();
  
  async create(item: any): Promise<any> {
    // Implementation
  }
  
  async getById(id: string): Promise<any | null> {
    return this.data.get(id) || null;
  }
}

export const myService = new MyService();
```

2. **Import and use** in routes:
```typescript
import { myService } from './services/my-service';

app.get('/api/items/:id', async (c) => {
  const item = await myService.getById(c.req.param('id'));
  if (!item) return c.json({ success: false, error: 'Not found' }, 404);
  return c.json({ success: true, data: item });
});
```

---

## Testing

### Running Tests

```bash
# Run API tests
./test-api.sh http://localhost:3000

# Run page tests  
./test-pages.sh http://localhost:3000

# Test production
./test-api.sh https://selectcareos-app.pages.dev
```

### Manual Testing

```bash
# Test specific endpoint
curl -s http://localhost:3000/api/doctors | jq '.'

# Test POST endpoint
curl -X POST http://localhost:3000/api/instant-connect/connect \
  -H "Content-Type: application/json" \
  -d '{"patientId":"test","patientName":"Test Patient"}'
```

---

## Deployment

### Local Development
```bash
npm run build
pm2 start ecosystem.config.cjs
```

### Production Deployment

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name selectcareos-app

# Set secrets
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name selectcareos-app
```

### Production URLs
- **Main**: https://selectcareos-app.pages.dev
- **API**: https://selectcareos-app.pages.dev/api

---

## Code Standards

### TypeScript Best Practices

1. **Always use types** from `src/types/index.ts`
2. **Export explicit types** for function parameters
3. **Use interfaces** for objects, types for unions

```typescript
// Good
import type { Doctor, APIResponse } from '../types';

function getDoctor(id: string): Doctor | null {
  // ...
}

// Bad
function getDoctor(id: any): any {
  // ...
}
```

### File Organization

- **Pages**: One file per page, export single function
- **Services**: One file per domain, export class/instance
- **Types**: Centralized in `src/types/index.ts`
- **Utils**: Small, pure functions

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `doctor-dashboard.ts` |
| Functions | camelCase | `getDoctorById()` |
| Classes | PascalCase | `SmartMatchingService` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Types/Interfaces | PascalCase | `DoctorSchedule` |

### HTML/CSS in Pages

```typescript
// Use template literals with proper indentation
return `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100">
    <div class="container mx-auto p-4">
      ${renderContent()}
    </div>
  </body>
  </html>
`;
```

### Error Handling

```typescript
// API endpoints should always return proper responses
app.get('/api/resource/:id', async (c) => {
  try {
    const item = await service.getById(c.req.param('id'));
    if (!item) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }
    return c.json({ success: true, data: item });
  } catch (error) {
    console.error('Error:', error);
    return c.json({ success: false, error: 'Internal error' }, 500);
  }
});
```

---

## Common Tasks

### Add Multi-language Support

```typescript
const translations = {
  en: { title: 'Dashboard', save: 'Save' },
  de: { title: 'Armaturenbrett', save: 'Speichern' },
  ar: { title: 'لوحة التحكم', save: 'حفظ' }
};

function getTranslation(lang: string) {
  return translations[lang] || translations.en;
}
```

### Add RTL Support

```typescript
const isRtl = lang === 'ar';
const dir = isRtl ? 'rtl' : 'ltr';

return `<html lang="${lang}" dir="${dir}">`;
```

---

## Troubleshooting

### Common Issues

1. **Port 3000 in use**
   ```bash
   fuser -k 3000/tcp
   ```

2. **Build fails**
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

3. **Wrangler auth issues**
   ```bash
   npx wrangler login
   ```

### Getting Help

- Check PM2 logs: `pm2 logs selectcareos --nostream`
- Check build output: `npm run build 2>&1`
- Test health endpoint: `curl http://localhost:3000/api/health`

---

## Resources

- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [TailwindCSS](https://tailwindcss.com/docs)

---

*Last Updated: January 2026*
