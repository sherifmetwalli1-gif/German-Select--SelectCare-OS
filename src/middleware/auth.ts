/**
 * Authentication Middleware
 * Enterprise-grade JWT-based authentication
 */

import type { Context, Next } from 'hono'
import type { Bindings, Variables, AuthUser, JWTPayload, UserRole } from '../types'

// Simple base64 URL encoding/decoding for JWT
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return atob(str)
}

// JWT utilities for Cloudflare Workers (using Web Crypto API)
async function createHmacSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const dataToSign = encoder.encode(data)
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, dataToSign)
  const signatureArray = new Uint8Array(signature)
  let binary = ''
  signatureArray.forEach(byte => binary += String.fromCharCode(byte))
  return base64UrlEncode(binary)
}

async function verifyHmacSignature(data: string, signature: string, secret: string): Promise<boolean> {
  const expectedSignature = await createHmacSignature(data, secret)
  return signature === expectedSignature
}

/**
 * Create a JWT token
 */
export async function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, secret: string, expiresIn = '24h'): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  
  // Parse expiration time
  const match = expiresIn.match(/^(\d+)([smhd])$/)
  if (!match) throw new Error('Invalid expiration format')
  
  const [, value, unit] = match
  const multipliers: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 }
  const expirationMs = parseInt(value) * multipliers[unit]
  
  const now = Math.floor(Date.now() / 1000)
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + Math.floor(expirationMs / 1000)
  }
  
  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(fullPayload))
  const data = `${headerEncoded}.${payloadEncoded}`
  const signature = await createHmacSignature(data, secret)
  
  return `${data}.${signature}`
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const [headerEncoded, payloadEncoded, signature] = parts
    const data = `${headerEncoded}.${payloadEncoded}`
    
    // Verify signature
    const isValid = await verifyHmacSignature(data, signature, secret)
    if (!isValid) return null
    
    // Decode and parse payload
    const payload: JWTPayload = JSON.parse(base64UrlDecode(payloadEncoded))
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) return null
    
    return payload
  } catch {
    return null
  }
}

/**
 * Hash a password using Web Crypto API
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = new Uint8Array(hashBuffer)
  return Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

/**
 * Authentication middleware - extracts and validates JWT from Authorization header
 */
export function authMiddleware() {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header'
      }, 401)
    }
    
    const token = authHeader.slice(7) // Remove 'Bearer ' prefix
    
    try {
      const payload = await verifyToken(token, c.env.JWT_SECRET)
      
      if (!payload) {
        return c.json({
          success: false,
          error: 'Unauthorized',
          message: 'Invalid or expired token'
        }, 401)
      }
      
      // Set user in context
      c.set('user', {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: payload.name
      })
      
      await next()
    } catch (error) {
      return c.json({
        success: false,
        error: 'Unauthorized',
        message: 'Token verification failed'
      }, 401)
    }
  }
}

/**
 * Optional authentication middleware - doesn't block if no token
 */
export function optionalAuthMiddleware() {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const authHeader = c.req.header('Authorization')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      
      try {
        const payload = await verifyToken(token, c.env.JWT_SECRET)
        
        if (payload) {
          c.set('user', {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
            name: payload.name
          })
        }
      } catch {
        // Ignore token errors for optional auth
      }
    }
    
    await next()
  }
}

/**
 * Role-based authorization middleware
 */
export function requireRole(...roles: UserRole[]) {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const user = c.get('user')
    
    if (!user) {
      return c.json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required'
      }, 401)
    }
    
    if (!roles.includes(user.role)) {
      return c.json({
        success: false,
        error: 'Forbidden',
        message: `Access denied. Required role: ${roles.join(' or ')}`
      }, 403)
    }
    
    await next()
  }
}

/**
 * API Key authentication middleware
 */
export function apiKeyMiddleware() {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const apiKey = c.req.header('X-API-Key')
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: 'Unauthorized',
        message: 'API key required'
      }, 401)
    }
    
    // Validate API key from KV store
    try {
      const keyData = await c.env.KV.get(`api_key:${apiKey}`, 'json') as {
        user_id: string
        role: UserRole
        name?: string
        permissions?: string[]
      } | null
      
      if (!keyData) {
        return c.json({
          success: false,
          error: 'Unauthorized',
          message: 'Invalid API key'
        }, 401)
      }
      
      // Set user from API key data
      c.set('user', {
        id: keyData.user_id,
        email: '',
        role: keyData.role,
        name: keyData.name,
        permissions: keyData.permissions
      })
      
      await next()
    } catch (error) {
      return c.json({
        success: false,
        error: 'Unauthorized',
        message: 'API key validation failed'
      }, 401)
    }
  }
}

/**
 * Rate limiting middleware using KV
 */
export function rateLimitMiddleware(options: {
  limit: number
  window: number  // in seconds
  keyPrefix?: string
}) {
  const { limit, window, keyPrefix = 'rate_limit' } = options
  
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const identifier = c.get('user')?.id || c.req.header('CF-Connecting-IP') || 'anonymous'
    const key = `${keyPrefix}:${identifier}`
    
    try {
      const current = await c.env.KV.get(key, 'json') as { count: number; reset: number } | null
      const now = Date.now()
      
      if (current && current.reset > now) {
        if (current.count >= limit) {
          c.header('X-RateLimit-Limit', limit.toString())
          c.header('X-RateLimit-Remaining', '0')
          c.header('X-RateLimit-Reset', Math.ceil(current.reset / 1000).toString())
          
          return c.json({
            success: false,
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.'
          }, 429)
        }
        
        await c.env.KV.put(key, JSON.stringify({
          count: current.count + 1,
          reset: current.reset
        }), { expirationTtl: window })
        
        c.header('X-RateLimit-Remaining', (limit - current.count - 1).toString())
      } else {
        await c.env.KV.put(key, JSON.stringify({
          count: 1,
          reset: now + window * 1000
        }), { expirationTtl: window })
        
        c.header('X-RateLimit-Remaining', (limit - 1).toString())
      }
      
      c.header('X-RateLimit-Limit', limit.toString())
      
      await next()
    } catch {
      // On error, allow the request through
      await next()
    }
  }
}

/**
 * Request logging middleware
 */
export function loggingMiddleware() {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const startTime = Date.now()
    c.set('startTime', startTime)
    
    await next()
    
    const duration = Date.now() - startTime
    const user = c.get('user')
    
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      duration,
      userId: user?.id,
      userRole: user?.role,
      ip: c.req.header('CF-Connecting-IP'),
      userAgent: c.req.header('User-Agent')
    }))
  }
}

/**
 * CORS middleware for API
 */
export function corsMiddleware(options?: {
  origins?: string[]
  methods?: string[]
  headers?: string[]
}) {
  const {
    origins = ['*'],
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    headers = ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID']
  } = options || {}
  
  return async (c: Context, next: Next) => {
    const origin = c.req.header('Origin')
    
    // Check if origin is allowed
    const allowedOrigin = origins.includes('*') ? '*' : 
      (origin && origins.includes(origin) ? origin : origins[0])
    
    c.header('Access-Control-Allow-Origin', allowedOrigin)
    c.header('Access-Control-Allow-Methods', methods.join(', '))
    c.header('Access-Control-Allow-Headers', headers.join(', '))
    c.header('Access-Control-Max-Age', '86400')
    
    if (c.req.method === 'OPTIONS') {
      return c.body(null, 204)
    }
    
    await next()
  }
}

/**
 * Generate a secure random API key
 */
export function generateApiKey(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a referral code
 */
export function generateReferralCode(prefix = 'GS'): string {
  const array = new Uint8Array(4)
  crypto.getRandomValues(array)
  const code = Array.from(array).map(b => b.toString(36).toUpperCase()).join('')
  return `${prefix}-${code}`
}
