/**
 * Security Headers Middleware
 * Implements OWASP recommended security headers
 * HIPAA/GDPR compliant configuration
 */

import { Context, Next } from 'hono'

/**
 * Content Security Policy directives
 * Configured for healthcare compliance (HIPAA, GDPR)
 */
const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",  // Required for Tailwind CSS inline styles
    "'unsafe-eval'",    // Required for Chart.js
    "https://cdn.tailwindcss.com",
    "https://cdn.jsdelivr.net",
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.tailwindcss.com",
    "https://cdn.jsdelivr.net",
    "https://fonts.googleapis.com",
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
    "https://cdn.jsdelivr.net",
  ],
  'img-src': [
    "'self'",
    "data:",
    "blob:",
    "https:",  // Allow external images
  ],
  'connect-src': [
    "'self'",
    "https://api.stripe.com",      // Payments
    "wss://*.jitsi.net",           // Telemedicine WebRTC
    "https://*.jitsi.net",
    "https://api.openai.com",      // AI services
  ],
  'frame-src': [
    "'self'",
    "https://*.jitsi.net",         // Telemedicine video
    "https://js.stripe.com",       // Stripe checkout
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],   // Clickjacking protection
  'upgrade-insecure-requests': [],
}

/**
 * Build CSP header string from directives
 */
function buildCSP(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, values]) => {
      if (values.length === 0) {
        return directive
      }
      return `${directive} ${values.join(' ')}`
    })
    .join('; ')
}

/**
 * Permissions Policy (formerly Feature Policy)
 * Restricts access to browser features
 */
const PERMISSIONS_POLICY = [
  'accelerometer=()',
  'autoplay=(self)',
  'camera=(self)',              // Allow for telemedicine
  'cross-origin-isolated=()',
  'display-capture=()',
  'encrypted-media=(self)',
  'fullscreen=(self)',
  'geolocation=()',
  'gyroscope=()',
  'keyboard-map=()',
  'magnetometer=()',
  'microphone=(self)',          // Allow for telemedicine
  'midi=()',
  'payment=(self)',             // Allow for Stripe
  'picture-in-picture=(self)',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'sync-xhr=()',
  'usb=()',
  'web-share=(self)',
  'xr-spatial-tracking=()',
].join(', ')

/**
 * Security headers middleware
 * Adds comprehensive security headers to all responses
 */
export const securityHeaders = async (c: Context, next: Next) => {
  await next()
  
  // Content Security Policy - Prevents XSS attacks
  c.res.headers.set('Content-Security-Policy', buildCSP())
  
  // HTTP Strict Transport Security - Forces HTTPS
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  
  // Prevent clickjacking
  c.res.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection (legacy browsers)
  c.res.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy - Controls information in Referer header
  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy - Restricts browser features
  c.res.headers.set('Permissions-Policy', PERMISSIONS_POLICY)
  
  // Prevent information leakage
  c.res.headers.delete('X-Powered-By')
  c.res.headers.delete('Server')
  
  // Cache control for sensitive endpoints
  if (c.req.path.startsWith('/api/') || c.req.path.includes('/patient/')) {
    c.res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    c.res.headers.set('Pragma', 'no-cache')
    c.res.headers.set('Expires', '0')
  }
  
  // CORS headers for API (handled by cors middleware, but ensure secure defaults)
  if (c.req.path.startsWith('/api/')) {
    c.res.headers.set('X-Content-Type-Options', 'nosniff')
  }
}

/**
 * HIPAA-specific security middleware
 * Additional controls for PHI (Protected Health Information)
 */
export const hipaaSecurityHeaders = async (c: Context, next: Next) => {
  await next()
  
  // For endpoints handling PHI
  if (c.req.path.includes('/patient/') || 
      c.req.path.includes('/rpm/') || 
      c.req.path.includes('/telemedicine/') ||
      c.req.path.includes('/medical/')) {
    
    // Prevent caching of PHI
    c.res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0')
    c.res.headers.set('Pragma', 'no-cache')
    c.res.headers.set('Expires', '0')
    
    // Mark as sensitive content
    c.res.headers.set('X-Content-Sensitivity', 'PHI')
    
    // Ensure secure context
    c.res.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    c.res.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  }
}

/**
 * API-specific security headers
 * Optimized for JSON API responses
 */
export const apiSecurityHeaders = async (c: Context, next: Next) => {
  await next()
  
  // Ensure JSON content type
  if (c.req.path.startsWith('/api/')) {
    // Prevent MIME sniffing for API responses
    c.res.headers.set('X-Content-Type-Options', 'nosniff')
    
    // API responses should not be cached by default
    if (!c.res.headers.get('Cache-Control')) {
      c.res.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
  }
}

/**
 * CORS security configuration
 * Configurable allowed origins for healthcare compliance
 */
export function createCorsConfig(allowedOrigins: string[] = []) {
  const defaultOrigins = [
    'https://germanselect.org',
    'https://germanselect.loukiedesign.com',
    'https://selectcareos.pages.dev',
  ]
  
  const origins = [...defaultOrigins, ...allowedOrigins]
  
  return {
    origin: (origin: string) => {
      // Allow same-origin requests
      if (!origin) return true
      
      // Check against whitelist
      return origins.some(allowed => {
        if (allowed.includes('*')) {
          const pattern = allowed.replace('*', '.*')
          return new RegExp(`^${pattern}$`).test(origin)
        }
        return origin === allowed
      })
    },
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-Request-ID',
      'X-Trace-ID',
    ],
    exposeHeaders: [
      'X-Request-ID',
      'X-Trace-ID',
      'X-RateLimit-Limit',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
    ],
    maxAge: 86400, // 24 hours
    credentials: true,
  }
}

/**
 * Request ID middleware
 * Adds unique request ID for tracing and audit logging
 */
export const requestId = async (c: Context, next: Next) => {
  const existingId = c.req.header('X-Request-ID')
  const requestId = existingId || crypto.randomUUID()
  
  c.set('requestId', requestId)
  c.res.headers.set('X-Request-ID', requestId)
  
  await next()
}

/**
 * Input sanitization helper
 * Prevents basic injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Sensitive data redaction for logging
 * Redacts PHI and PII from logs
 */
export function redactSensitiveData(data: Record<string, any>): Record<string, any> {
  const sensitiveFields = [
    'password',
    'ssn',
    'social_security',
    'medical_record',
    'diagnosis',
    'treatment',
    'prescription',
    'credit_card',
    'card_number',
    'cvv',
    'dob',
    'date_of_birth',
    'phone',
    'email',
    'address',
  ]
  
  const redacted = { ...data }
  
  for (const key of Object.keys(redacted)) {
    const lowerKey = key.toLowerCase()
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      redacted[key] = '[REDACTED]'
    } else if (typeof redacted[key] === 'object' && redacted[key] !== null) {
      redacted[key] = redactSensitiveData(redacted[key])
    }
  }
  
  return redacted
}
