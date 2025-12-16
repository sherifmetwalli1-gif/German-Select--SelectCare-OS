/**
 * Rate Limiting Middleware
 * Protects against abuse and ensures fair usage
 */

import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

// Rate limit configuration
interface RateLimitConfig {
  windowMs: number        // Time window in milliseconds
  maxRequests: number     // Maximum requests per window
  message?: string        // Custom error message
  keyGenerator?: (c: Context) => string  // Custom key generator
  skipFailedRequests?: boolean  // Don't count failed requests
  skipSuccessfulRequests?: boolean // Don't count successful requests
}

// Default rate limit configurations
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // General API - 100 requests per minute
  'api:general': {
    windowMs: 60 * 1000,
    maxRequests: 100,
    message: 'Too many requests, please try again later',
  },
  
  // Authentication endpoints - stricter limits
  'auth:login': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many login attempts, please try again in 15 minutes',
  },
  'auth:register': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: 'Too many registration attempts, please try again later',
  },
  'auth:password-reset': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: 'Too many password reset attempts',
  },
  
  // AI endpoints - expensive operations
  'ai:chat': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    message: 'AI query limit reached, please wait a moment',
  },
  'ai:document': {
    windowMs: 60 * 1000,
    maxRequests: 5,
    message: 'Document analysis limit reached',
  },
  
  // Telemedicine - session management
  'telemed:start': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    message: 'Too many session requests',
  },
  
  // Data export - very limited
  'export:data': {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 5,
    message: 'Daily export limit reached',
  },
  
  // Health check - higher limit
  'health:check': {
    windowMs: 60 * 1000,
    maxRequests: 1000,
    message: 'Rate limit exceeded',
  },
}

// In-memory store for rate limiting (in production, use KV or Redis)
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries inline during check (no setInterval in Workers)
function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Get rate limit key from context
 */
function getKey(c: Context, limitKey: string, config: RateLimitConfig): string {
  if (config.keyGenerator) {
    return config.keyGenerator(c)
  }
  
  // Default: use IP address + limit key
  const ip = c.req.header('cf-connecting-ip') || 
             c.req.header('x-forwarded-for')?.split(',')[0] || 
             'unknown'
  
  // If user is authenticated, use user ID instead
  const userId = c.get('userId')
  const identifier = userId || ip
  
  return `${limitKey}:${identifier}`
}

/**
 * Check and update rate limit
 */
function checkRateLimit(key: string, config: RateLimitConfig): {
  allowed: boolean
  remaining: number
  resetAt: number
  retryAfter?: number
} {
  const now = Date.now()
  
  // Periodically clean up expired entries (every ~100 requests)
  if (rateLimitStore.size > 100 && Math.random() < 0.01) {
    cleanupExpiredEntries()
  }
  
  let entry = rateLimitStore.get(key)
  
  // Create new entry if doesn't exist or expired
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs
    }
  }
  
  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000)
    }
  }
  
  // Increment counter
  entry.count++
  rateLimitStore.set(key, entry)
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt
  }
}

/**
 * Rate limiter middleware factory
 */
export function rateLimiter(limitKey: string = 'api:general') {
  const config = RATE_LIMITS[limitKey] || RATE_LIMITS['api:general']
  
  return async (c: Context, next: Next) => {
    const key = getKey(c, limitKey, config)
    const result = checkRateLimit(key, config)
    
    // Set rate limit headers
    c.header('X-RateLimit-Limit', String(config.maxRequests))
    c.header('X-RateLimit-Remaining', String(result.remaining))
    c.header('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))
    
    if (!result.allowed) {
      c.header('Retry-After', String(result.retryAfter))
      
      throw new HTTPException(429, {
        message: config.message || 'Rate limit exceeded'
      })
    }
    
    await next()
  }
}

/**
 * Global rate limiter for all routes
 */
export const globalRateLimiter = rateLimiter('api:general')

/**
 * Sliding window rate limiter (more accurate but more expensive)
 */
export function slidingWindowRateLimiter(config: RateLimitConfig) {
  const requests = new Map<string, number[]>()
  
  return async (c: Context, next: Next) => {
    const key = getKey(c, 'sliding', config)
    const now = Date.now()
    const windowStart = now - config.windowMs
    
    // Get existing requests and filter to current window
    let timestamps = requests.get(key) || []
    timestamps = timestamps.filter(t => t > windowStart)
    
    // Check limit
    if (timestamps.length >= config.maxRequests) {
      const oldestInWindow = Math.min(...timestamps)
      const retryAfter = Math.ceil((oldestInWindow + config.windowMs - now) / 1000)
      
      c.header('X-RateLimit-Limit', String(config.maxRequests))
      c.header('X-RateLimit-Remaining', '0')
      c.header('Retry-After', String(retryAfter))
      
      throw new HTTPException(429, {
        message: config.message || 'Rate limit exceeded'
      })
    }
    
    // Add current request
    timestamps.push(now)
    requests.set(key, timestamps)
    
    // Set headers
    c.header('X-RateLimit-Limit', String(config.maxRequests))
    c.header('X-RateLimit-Remaining', String(config.maxRequests - timestamps.length))
    
    await next()
  }
}

/**
 * Endpoint-specific rate limiter based on path patterns
 */
export const endpointRateLimiter = async (c: Context, next: Next) => {
  const path = c.req.path
  const method = c.req.method
  
  // Determine rate limit key based on endpoint
  let limitKey = 'api:general'
  
  if (path.startsWith('/api/ai/')) {
    limitKey = path.includes('document') ? 'ai:document' : 'ai:chat'
  } else if (path.includes('/login')) {
    limitKey = 'auth:login'
  } else if (path.includes('/register')) {
    limitKey = 'auth:register'
  } else if (path.includes('/password-reset')) {
    limitKey = 'auth:password-reset'
  } else if (path.startsWith('/api/telemedicine/start')) {
    limitKey = 'telemed:start'
  } else if (path.includes('/export')) {
    limitKey = 'export:data'
  } else if (path === '/api/health') {
    limitKey = 'health:check'
  }
  
  const config = RATE_LIMITS[limitKey]
  const key = getKey(c, limitKey, config)
  const result = checkRateLimit(key, config)
  
  // Set headers
  c.header('X-RateLimit-Policy', limitKey)
  c.header('X-RateLimit-Limit', String(config.maxRequests))
  c.header('X-RateLimit-Remaining', String(result.remaining))
  c.header('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))
  
  if (!result.allowed) {
    c.header('Retry-After', String(result.retryAfter))
    
    return c.json({
      error: 'Rate limit exceeded',
      message: config.message,
      retryAfter: result.retryAfter
    }, 429)
  }
  
  await next()
}
