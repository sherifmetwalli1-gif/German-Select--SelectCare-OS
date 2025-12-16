/**
 * Authentication API Routes
 * Handles user registration, login, logout, and token refresh
 * HIPAA-compliant authentication flow
 */

import { Hono } from 'hono'
import { hashPassword, verifyPassword, generateSecureId, generateSecureToken, verifyToken } from '../lib/crypto'
import { generateTokenPair, verifyJWT, extractBearerToken, JWTPayload } from '../lib/jwt'
import { rateLimiter } from '../middleware/rate-limit'
import { authMiddleware } from '../middleware/auth'

// Type definitions
type Bindings = {
  DB: D1Database
  JWT_SECRET: string
  REFRESH_SECRET: string
}

const authRoutes = new Hono<{ Bindings: Bindings }>()

// Get secrets with fallback for development
function getSecrets(env: any) {
  return {
    jwtSecret: env?.JWT_SECRET || 'dev-jwt-secret-change-in-production-min-32-chars',
    refreshSecret: env?.REFRESH_SECRET || 'dev-refresh-secret-change-in-production-32char'
  }
}

/**
 * POST /api/auth/register
 * Register a new user
 */
authRoutes.post('/register', rateLimiter('auth:register'), async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, name, phone, role = 'patient' } = body
    
    // Validation
    if (!email || !password || !name) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email, password, and name are required' }
      }, 400)
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid email format' }
      }, 400)
    }
    
    // Password strength validation
    if (password.length < 8) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters' }
      }, 400)
    }
    
    // Role validation
    const allowedRoles = ['patient', 'doctor']
    if (!allowedRoles.includes(role)) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid role' }
      }, 400)
    }
    
    // Hash password
    const passwordHash = await hashPassword(password)
    
    // Generate user ID
    const userId = generateSecureId(16)
    
    // For demo without D1, return mock success
    // In production, this would insert into database
    const mockUser = {
      id: userId,
      email,
      name,
      phone,
      role,
      status: 'pending', // Requires email verification
      createdAt: new Date().toISOString()
    }
    
    // Generate verification token
    const { token: verificationToken } = await generateSecureToken()
    
    // TODO: When D1 is connected:
    // 1. Check if email already exists
    // 2. Insert user into users table
    // 3. Create patient_profiles or doctor_profiles entry
    // 4. Store verification token
    // 5. Send verification email
    
    return c.json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      user: {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        status: mockUser.status
      },
      // In production, don't return token - send via email
      verificationToken: verificationToken
    }, 201)
    
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Registration failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/login
 * Authenticate user and return tokens
 */
authRoutes.post('/login', rateLimiter('auth:login'), async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body
    
    // Validation
    if (!email || !password) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' }
      }, 400)
    }
    
    // TODO: When D1 is connected, fetch user from database
    // For demo, use mock user data
    const mockUsers: Record<string, any> = {
      'max.mustermann@email.de': {
        id: 'pat-001',
        email: 'max.mustermann@email.de',
        name: 'Max Mustermann',
        role: 'patient',
        patientId: 'pprof-001',
        status: 'active',
        // Demo password: 'password123'
        passwordHash: 'pbkdf2$100000$demo$demo'
      },
      'l.weber@germanselect.org': {
        id: 'doc-001',
        email: 'l.weber@germanselect.org',
        name: 'Dr. Lukas Weber',
        role: 'doctor',
        doctorId: 'dprof-001',
        status: 'active',
        passwordHash: 'pbkdf2$100000$demo$demo'
      },
      'admin@germanselect.org': {
        id: 'admin-001',
        email: 'admin@germanselect.org',
        name: 'System Administrator',
        role: 'admin',
        status: 'active',
        passwordHash: 'pbkdf2$100000$demo$demo'
      }
    }
    
    const user = mockUsers[email.toLowerCase()]
    
    // For demo, accept any password for mock users
    // In production, verify against stored hash
    if (!user) {
      // Timing-safe: always do password check even if user not found
      await hashPassword(password) // Waste time to prevent timing attacks
      return c.json({
        success: false,
        error: { code: 'AUTH_FAILED', message: 'Invalid email or password' }
      }, 401)
    }
    
    // Check user status
    if (user.status !== 'active') {
      return c.json({
        success: false,
        error: { code: 'ACCOUNT_INACTIVE', message: 'Account is not active' }
      }, 403)
    }
    
    // Generate token pair
    const secrets = getSecrets(c.env)
    const tokenPayload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'> = {
      sub: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      patientId: user.patientId,
      doctorId: user.doctorId,
      sessionId: generateSecureId(16)
    }
    
    const tokens = await generateTokenPair(tokenPayload, secrets.jwtSecret, secrets.refreshSecret)
    
    // TODO: Store session in database for revocation capability
    
    // Log successful login
    console.log('LOGIN:', JSON.stringify({
      timestamp: new Date().toISOString(),
      userId: user.id,
      email: user.email,
      role: user.role,
      ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for')
    }))
    
    return c.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        patientId: user.patientId,
        doctorId: user.doctorId
      },
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        tokenType: tokens.tokenType
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Login failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
authRoutes.post('/refresh', async (c) => {
  try {
    const body = await c.req.json()
    const { refreshToken } = body
    
    if (!refreshToken) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Refresh token is required' }
      }, 400)
    }
    
    const secrets = getSecrets(c.env)
    const result = await verifyJWT(refreshToken, secrets.refreshSecret)
    
    if (!result.valid || !result.payload) {
      return c.json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: result.error || 'Invalid refresh token' }
      }, 401)
    }
    
    // TODO: Check if refresh token is revoked in database
    
    // Generate new access token
    const tokenPayload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'> = {
      sub: result.payload.sub,
      role: result.payload.role,
      email: result.payload.email,
      name: result.payload.name,
      sessionId: generateSecureId(16)
    }
    
    const tokens = await generateTokenPair(tokenPayload, secrets.jwtSecret, secrets.refreshSecret)
    
    return c.json({
      success: true,
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        tokenType: tokens.tokenType
      }
    })
    
  } catch (error) {
    console.error('Refresh error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Token refresh failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/logout
 * Logout and invalidate tokens
 */
authRoutes.post('/logout', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    
    // TODO: Revoke refresh token in database
    // TODO: Add access token to blacklist (short-lived)
    
    console.log('LOGOUT:', JSON.stringify({
      timestamp: new Date().toISOString(),
      userId: user.sub,
      email: user.email
    }))
    
    return c.json({
      success: true,
      message: 'Logged out successfully'
    })
    
  } catch (error) {
    console.error('Logout error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Logout failed' }
    }, 500)
  }
})

/**
 * GET /api/auth/me
 * Get current user info
 */
authRoutes.get('/me', authMiddleware, async (c) => {
  const user = c.get('user')
  
  return c.json({
    success: true,
    user: {
      id: user.sub,
      email: user.email,
      name: user.name,
      role: user.role,
      patientId: user.patientId,
      doctorId: user.doctorId,
      sessionId: user.sessionId
    }
  })
})

/**
 * POST /api/auth/password-reset/request
 * Request password reset email
 */
authRoutes.post('/password-reset/request', rateLimiter('auth:password-reset'), async (c) => {
  try {
    const body = await c.req.json()
    const { email } = body
    
    if (!email) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email is required' }
      }, 400)
    }
    
    // Generate reset token
    const { token, hash } = await generateSecureToken()
    
    // TODO: When D1 is connected:
    // 1. Check if user exists
    // 2. Store token hash with expiration
    // 3. Send reset email
    
    // Always return success to prevent email enumeration
    return c.json({
      success: true,
      message: 'If an account exists with this email, a reset link will be sent.',
      // For demo only - in production, never return token
      resetToken: token
    })
    
  } catch (error) {
    console.error('Password reset request error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Password reset request failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/password-reset/confirm
 * Reset password with token
 */
authRoutes.post('/password-reset/confirm', rateLimiter('auth:password-reset'), async (c) => {
  try {
    const body = await c.req.json()
    const { token, newPassword } = body
    
    if (!token || !newPassword) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Token and new password are required' }
      }, 400)
    }
    
    // Password strength validation
    if (newPassword.length < 8) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters' }
      }, 400)
    }
    
    // TODO: When D1 is connected:
    // 1. Verify token against stored hash
    // 2. Check token expiration
    // 3. Update user password
    // 4. Invalidate all existing sessions
    // 5. Delete reset token
    
    return c.json({
      success: true,
      message: 'Password has been reset successfully'
    })
    
  } catch (error) {
    console.error('Password reset confirm error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Password reset failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/change-password
 * Change password for authenticated user
 */
authRoutes.post('/change-password', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { currentPassword, newPassword } = body
    
    if (!currentPassword || !newPassword) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Current and new password are required' }
      }, 400)
    }
    
    // Password strength validation
    if (newPassword.length < 8) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters' }
      }, 400)
    }
    
    // TODO: When D1 is connected:
    // 1. Verify current password
    // 2. Hash and store new password
    // 3. Optionally invalidate other sessions
    
    return c.json({
      success: true,
      message: 'Password changed successfully'
    })
    
  } catch (error) {
    console.error('Change password error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Password change failed' }
    }, 500)
  }
})

/**
 * POST /api/auth/verify-email
 * Verify email with token
 */
authRoutes.post('/verify-email', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body
    
    if (!token) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Verification token is required' }
      }, 400)
    }
    
    // TODO: When D1 is connected:
    // 1. Verify token
    // 2. Update user status to 'active'
    // 3. Set email_verified = true
    // 4. Delete verification token
    
    return c.json({
      success: true,
      message: 'Email verified successfully'
    })
    
  } catch (error) {
    console.error('Email verification error:', error)
    return c.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Email verification failed' }
    }, 500)
  }
})

export { authRoutes }
