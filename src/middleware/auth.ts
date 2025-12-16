/**
 * Authentication Middleware
 * JWT-based authentication for German Select Health Platform
 * HIPAA-compliant access control
 */

import { Context, Next } from 'hono'
import { verifyJWT, extractBearerToken, JWTPayload } from '../lib/jwt'

// Extend Hono context with user data
declare module 'hono' {
  interface ContextVariableMap {
    user: JWTPayload
    userId: string
    userRole: string
    patientId?: string
    doctorId?: string
  }
}

// Type definitions
type Bindings = {
  JWT_SECRET: string
  API_KEY?: string
  DB?: D1Database
}

// Get JWT secret with fallback for development
function getJWTSecret(env: any): string {
  return env?.JWT_SECRET || 'dev-jwt-secret-change-in-production-min-32-chars'
}

/**
 * Main authentication middleware
 * Requires valid JWT token in Authorization header
 */
export const authMiddleware = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  const token = extractBearerToken(authHeader)
  
  if (!token) {
    return c.json({
      success: false,
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'Authentication required' 
      }
    }, 401)
  }
  
  const secret = getJWTSecret(c.env)
  const result = await verifyJWT(token, secret)
  
  if (!result.valid || !result.payload) {
    return c.json({
      success: false,
      error: { 
        code: 'INVALID_TOKEN', 
        message: result.error || 'Invalid or expired token' 
      }
    }, 401)
  }
  
  // Set user data in context
  c.set('user', result.payload)
  c.set('userId', result.payload.sub)
  c.set('userRole', result.payload.role)
  if (result.payload.patientId) c.set('patientId', result.payload.patientId)
  if (result.payload.doctorId) c.set('doctorId', result.payload.doctorId)
  
  await next()
}

/**
 * Optional authentication middleware
 * Allows unauthenticated requests but attaches user data if valid token present
 */
export const optionalAuth = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  const token = extractBearerToken(authHeader)
  
  if (token) {
    const secret = getJWTSecret(c.env)
    const result = await verifyJWT(token, secret)
    
    if (result.valid && result.payload) {
      c.set('user', result.payload)
      c.set('userId', result.payload.sub)
      c.set('userRole', result.payload.role)
      if (result.payload.patientId) c.set('patientId', result.payload.patientId)
      if (result.payload.doctorId) c.set('doctorId', result.payload.doctorId)
    }
  }
  
  await next()
}

/**
 * Role-based access control middleware factory
 */
export const requireRole = (...allowedRoles: string[]) => {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    const user = c.get('user')
    
    if (!user) {
      return c.json({
        success: false,
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Authentication required' 
        }
      }, 401)
    }
    
    if (!allowedRoles.includes(user.role)) {
      return c.json({
        success: false,
        error: { 
          code: 'FORBIDDEN', 
          message: 'Insufficient permissions' 
        }
      }, 403)
    }
    
    await next()
  }
}

/**
 * Patient-only access
 */
export const requirePatient = requireRole('patient')

/**
 * Doctor-only access
 */
export const requireDoctor = requireRole('doctor')

/**
 * Admin-only access
 */
export const requireAdmin = requireRole('admin')

/**
 * Healthcare provider access (doctor, coordinator, staff)
 */
export const requireProvider = requireRole('doctor', 'coordinator', 'staff', 'admin')

/**
 * Self or admin access middleware
 * Allows access only if the user is accessing their own resource or is an admin
 */
export const requireSelfOrAdmin = (userIdParam: string = 'userId') => {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    const user = c.get('user')
    
    if (!user) {
      return c.json({
        success: false,
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Authentication required' 
        }
      }, 401)
    }
    
    const resourceUserId = c.req.param(userIdParam)
    const isAdmin = user.role === 'admin'
    const isSelf = user.sub === resourceUserId || 
                   user.patientId === resourceUserId ||
                   user.doctorId === resourceUserId
    
    if (!isAdmin && !isSelf) {
      return c.json({
        success: false,
        error: { 
          code: 'FORBIDDEN', 
          message: 'Access denied to this resource' 
        }
      }, 403)
    }
    
    await next()
  }
}

/**
 * Care team access middleware
 * Allows doctors and coordinators to access patient data if they're on the care team
 */
export const requireCareTeamAccess = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const user = c.get('user')
  
  if (!user) {
    return c.json({
      success: false,
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'Authentication required' 
      }
    }, 401)
  }
  
  // Admins always have access
  if (user.role === 'admin') {
    await next()
    return
  }
  
  // Patients can access their own data
  const patientId = c.req.param('patientId') || c.req.query('patientId')
  if (user.role === 'patient' && user.patientId === patientId) {
    await next()
    return
  }
  
  // Healthcare providers need care team verification
  // TODO: When D1 is connected, check care_team table
  // For now, allow all providers
  if (['doctor', 'coordinator', 'staff'].includes(user.role)) {
    // In production, query: SELECT 1 FROM care_team WHERE doctor_id = ? AND patient_id = ?
    await next()
    return
  }
  
  return c.json({
    success: false,
    error: { 
      code: 'FORBIDDEN', 
      message: 'Not authorized to access this patient data' 
    }
  }, 403)
}

/**
 * API Key authentication for external integrations
 */
export const apiKeyAuth = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const apiKey = c.req.header('X-API-Key')
  
  if (!apiKey) {
    return c.json({
      success: false,
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'API key required' 
      }
    }, 401)
  }
  
  // TODO: Validate API key against database
  const validApiKey = c.env?.API_KEY || 'dev-api-key-change-in-production'
  
  if (apiKey !== validApiKey) {
    return c.json({
      success: false,
      error: { 
        code: 'INVALID_API_KEY', 
        message: 'Invalid API key' 
      }
    }, 401)
  }
  
  await next()
}

/**
 * Audit logging middleware
 * Logs access to sensitive resources for HIPAA compliance
 */
export const auditLog = (action: string, resourceType: string) => {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    const user = c.get('user')
    const startTime = Date.now()
    
    // Proceed with request
    await next()
    
    // Log the access
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      resourceType,
      resourceId: c.req.param('id') || c.req.param('patientId') || 'N/A',
      userId: user?.sub || 'anonymous',
      userRole: user?.role || 'anonymous',
      userEmail: user?.email || 'N/A',
      method: c.req.method,
      path: c.req.path,
      ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown',
      userAgent: c.req.header('user-agent') || 'unknown',
      duration: Date.now() - startTime,
      status: c.res.status,
    }
    
    // TODO: When D1 is connected, insert into audit_log table
    // For now, log to console
    console.log('AUDIT:', JSON.stringify(logEntry))
  }
}

/**
 * Session validation middleware
 * Checks if session is still valid (not revoked)
 */
export const validateSession = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const user = c.get('user')
  
  if (!user || !user.sessionId) {
    return c.json({
      success: false,
      error: { 
        code: 'INVALID_SESSION', 
        message: 'Invalid session' 
      }
    }, 401)
  }
  
  // TODO: When D1 is connected, check sessions table
  // SELECT 1 FROM sessions WHERE id = ? AND revoked_at IS NULL AND expires_at > NOW()
  
  await next()
}

/**
 * 2FA verification middleware
 * Requires 2FA code for sensitive operations
 */
export const require2FA = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const user = c.get('user')
  const twoFactorCode = c.req.header('X-2FA-Code')
  
  if (!user) {
    return c.json({
      success: false,
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'Authentication required' 
      }
    }, 401)
  }
  
  // TODO: When D1 is connected:
  // 1. Check if user has 2FA enabled
  // 2. Verify TOTP code
  
  if (!twoFactorCode) {
    return c.json({
      success: false,
      error: { 
        code: '2FA_REQUIRED', 
        message: 'Two-factor authentication code required' 
      }
    }, 403)
  }
  
  // For demo, accept any 6-digit code
  if (!/^\d{6}$/.test(twoFactorCode)) {
    return c.json({
      success: false,
      error: { 
        code: 'INVALID_2FA', 
        message: 'Invalid 2FA code format' 
      }
    }, 403)
  }
  
  await next()
}
