/**
 * Authentication Routes
 * JWT-based authentication for German Select Platform
 */

import { Hono } from 'hono'
import { DatabaseService } from '../services/database'
import type { Bindings, Variables, User } from '../types'

export const authRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Simple JWT implementation for edge runtime
async function createToken(payload: object, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = { ...payload, iat: now, exp: now + 86400 * 7 } // 7 days

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '')
  const encodedPayload = btoa(JSON.stringify(tokenPayload)).replace(/=/g, '')
  
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${encodedHeader}.${encodedPayload}`)
  )
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

async function verifyToken(token: string, secret: string): Promise<any> {
  try {
    const [header, payload, signature] = token.split('.')
    const decodedPayload = JSON.parse(atob(payload))
    
    // Check expiration
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }

    return decodedPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Register new user
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, firstName, lastName, phone, role = 'patient', language = 'en', currency = 'EUR' } = body

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }

    const db = new DatabaseService(c.env.DB)
    
    // Check if user exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return c.json({ success: false, error: 'User already exists' }, 400)
    }

    // Create user
    const user = await db.createUser({
      email,
      firstName,
      lastName,
      phone,
      role,
      language,
      currency,
    })

    // Generate token
    const token = await createToken(
      { userId: user.id, email: user.email, role: user.role },
      c.env.JWT_SECRET || 'default-secret'
    )

    return c.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Login
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email } = body

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }

    const db = new DatabaseService(c.env.DB)
    const user = await db.getUserByEmail(email)

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    // Generate token
    const token = await createToken(
      { userId: user.id, email: user.email, role: user.role },
      c.env.JWT_SECRET || 'default-secret'
    )

    return c.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get current user
authRoutes.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }

    const token = authHeader.substring(7)
    const payload = await verifyToken(token, c.env.JWT_SECRET || 'default-secret')

    const db = new DatabaseService(c.env.DB)
    const user = await db.getUserById(payload.userId)

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    return c.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 401)
  }
})

// Verify token
authRoutes.post('/verify', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body

    if (!token) {
      return c.json({ success: false, error: 'Token is required' }, 400)
    }

    const payload = await verifyToken(token, c.env.JWT_SECRET || 'default-secret')

    return c.json({
      success: true,
      data: { valid: true, payload },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({
      success: true,
      data: { valid: false, error: error.message },
      timestamp: new Date().toISOString(),
    })
  }
})

// Export token utilities for use in middleware
export { createToken, verifyToken }
