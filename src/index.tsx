/**
 * German Select Health Platform - SelectCareOS
 * Main Application Entry Point
 * 
 * Middleware Stack:
 * 1. Request ID - Unique ID for tracing
 * 2. Security Headers - OWASP recommended headers (CSP, HSTS, etc.)
 * 3. Compression - Response compression hints
 * 4. Tracing - OpenTelemetry-style request tracing
 * 5. Rate Limiting - Endpoint-specific rate limiting
 * 6. Caching - Intelligent response caching
 * 7. Error Handling - Centralized error handling
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'

// Import pages
import { patientDashboard } from './pages/patient-dashboard'
import { doctorDashboard } from './pages/doctor-dashboard'
import { timelinePage } from './pages/timeline'
import { careTeamPage } from './pages/care-team'
import { messagesPage } from './pages/messages'
import { profilePage } from './pages/profile'
import { bookingPage } from './pages/booking'
import { marketplacePage } from './pages/marketplace' // CareSelect™ Journeys page
import { aiDiagnosticsPage } from './pages/ai-diagnostics'
import { rpmPage } from './pages/rpm'
import { wellnessPage } from './pages/wellness'
import { telemedicinePage } from './pages/telemedicine'
import { loginPage } from './pages/login'
import { landingPage } from './pages/landing'
import { apiRoutes } from './api'

// Import middleware
import {
  // Tracing & Observability
  tracingMiddleware,
  requestLogger,
  metricsMiddleware,
  getMetrics,
  resetMetrics,
  // Rate Limiting
  endpointRateLimiter,
  rateLimiter,
  // Security
  securityHeaders,
  hipaaSecurityHeaders,
  requestId,
  createCorsConfig,
  // Compression
  compressionMiddleware,
  // Caching
  cachingMiddleware,
  // Error Handling
  errorHandler,
  notFoundHandler,
} from './middleware'

const app = new Hono()

// =============================================================================
// MIDDLEWARE STACK (Order matters!)
// =============================================================================

// 1. Request ID - Must be first for tracing
app.use('*', requestId)

// 2. Error Handler - Wrap all routes with error handling
app.use('*', errorHandler)

// 3. Security Headers - Applied to all responses
app.use('*', securityHeaders)

// 4. Compression hints - For response optimization
app.use('*', compressionMiddleware)

// 5. Request Tracing - OpenTelemetry-style tracing
app.use('*', tracingMiddleware)

// 6. Metrics Collection - Track performance metrics
app.use('*', metricsMiddleware)

// 7. Request Logger - Development logging
app.use('*', requestLogger)

// 8. CORS - For API routes only (with secure configuration)
app.use('/api/*', cors(createCorsConfig()))

// 9. HIPAA Security - For patient/medical routes
app.use('/patient/*', hipaaSecurityHeaders)
app.use('/api/patient/*', hipaaSecurityHeaders)
app.use('/api/telemedicine/*', hipaaSecurityHeaders)
app.use('/api/prescriptions/*', hipaaSecurityHeaders)
app.use('/api/vitals/*', hipaaSecurityHeaders)

// 10. Rate Limiting - Endpoint-specific limits
app.use('/api/*', endpointRateLimiter)

// 11. Caching - Intelligent response caching
app.use('*', cachingMiddleware)

// =============================================================================
// HEALTH & METRICS ENDPOINTS
// =============================================================================

// Health check endpoint (high rate limit, short cache)
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: c.env?.NODE_ENV || 'production',
    services: {
      api: 'operational',
      database: 'operational', // TODO: Add actual DB health check
      cache: 'operational'     // TODO: Add actual cache health check
    }
  })
})

// Metrics endpoint (for observability)
app.get('/api/metrics', rateLimiter('health:check'), (c) => {
  const metrics = getMetrics()
  return c.json(metrics)
})

// Reset metrics (admin only - TODO: add auth)
app.post('/api/metrics/reset', rateLimiter('api:general'), (c) => {
  resetMetrics()
  return c.json({ success: true, message: 'Metrics reset', timestamp: new Date().toISOString() })
})

// =============================================================================
// HTML RENDERER
// =============================================================================

// Use renderer for HTML pages
app.use(renderer)

// =============================================================================
// PUBLIC ROUTES
// =============================================================================

// Landing page
app.get('/', (c) => landingPage(c))

// Auth routes
app.get('/login', (c) => loginPage(c))

// =============================================================================
// PATIENT ROUTES (Protected with HIPAA headers)
// =============================================================================

app.get('/patient', (c) => patientDashboard(c))
app.get('/patient/timeline', (c) => timelinePage(c))
app.get('/patient/care-team', (c) => careTeamPage(c))
app.get('/patient/messages', (c) => messagesPage(c))
app.get('/patient/profile', (c) => profilePage(c))
app.get('/patient/booking', (c) => bookingPage(c))
app.get('/patient/careselect-journeys', (c) => marketplacePage(c)) // CareSelect™ Journeys
app.get('/patient/marketplace', (c) => marketplacePage(c)) // Backward compatibility
app.get('/patient/ai-diagnostics', (c) => aiDiagnosticsPage(c))
app.get('/patient/rpm', (c) => rpmPage(c))
app.get('/patient/wellness', (c) => wellnessPage(c))
app.get('/patient/telemedicine', (c) => telemedicinePage(c))

// =============================================================================
// DOCTOR ROUTES
// =============================================================================

app.get('/doctor', (c) => doctorDashboard(c))

// =============================================================================
// API ROUTES
// =============================================================================

app.route('/api', apiRoutes)

// =============================================================================
// 404 HANDLER
// =============================================================================

app.notFound(notFoundHandler)

export default app
