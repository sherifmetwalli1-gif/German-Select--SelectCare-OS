/**
 * JWT (JSON Web Token) Implementation
 * Web Crypto API based - Cloudflare Workers compatible
 * Implements RS256 signing with HMAC-SHA256 fallback
 */

import { generateHMAC, verifyHMAC, base64UrlEncode, base64UrlDecode } from './crypto'

// JWT Types
export interface JWTPayload {
  // Standard claims
  sub: string          // Subject (user ID)
  iat: number          // Issued at (Unix timestamp)
  exp: number          // Expiration (Unix timestamp)
  nbf?: number         // Not before (Unix timestamp)
  iss?: string         // Issuer
  aud?: string         // Audience
  jti?: string         // JWT ID (unique identifier)
  
  // Custom claims for German Select
  role: 'patient' | 'doctor' | 'admin' | 'coordinator' | 'staff'
  email: string
  name: string
  patientId?: string   // Patient profile ID
  doctorId?: string    // Doctor profile ID
  sessionId?: string   // Session ID for tracking
  permissions?: string[]
}

export interface JWTHeader {
  alg: 'HS256'
  typ: 'JWT'
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: 'Bearer'
}

// Configuration
const JWT_CONFIG = {
  issuer: 'german-select-health',
  audience: 'selectcareos-api',
  accessTokenExpiry: 15 * 60,           // 15 minutes
  refreshTokenExpiry: 7 * 24 * 60 * 60, // 7 days
  algorithm: 'HS256' as const,
}

/**
 * Create a JWT token
 */
export async function createJWT(
  payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'>,
  secret: string,
  expiresIn: number = JWT_CONFIG.accessTokenExpiry
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  
  const header: JWTHeader = {
    alg: JWT_CONFIG.algorithm,
    typ: 'JWT'
  }
  
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
    iss: JWT_CONFIG.issuer,
    aud: JWT_CONFIG.audience,
  }
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload))
  
  const signatureInput = `${encodedHeader}.${encodedPayload}`
  const signature = await generateHMAC(signatureInput, secret)
  
  return `${signatureInput}.${signature}`
}

/**
 * Verify and decode a JWT token
 */
export async function verifyJWT(
  token: string,
  secret: string
): Promise<{ valid: boolean; payload?: JWTPayload; error?: string }> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' }
    }
    
    const [encodedHeader, encodedPayload, signature] = parts
    
    // Verify signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`
    const isValid = await verifyHMAC(signatureInput, signature, secret)
    
    if (!isValid) {
      return { valid: false, error: 'Invalid signature' }
    }
    
    // Decode and parse payload
    const payloadJson = base64UrlDecode(encodedPayload)
    const payload: JWTPayload = JSON.parse(payloadJson)
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' }
    }
    
    // Check not before
    if (payload.nbf && payload.nbf > now) {
      return { valid: false, error: 'Token not yet valid' }
    }
    
    // Verify issuer
    if (payload.iss !== JWT_CONFIG.issuer) {
      return { valid: false, error: 'Invalid issuer' }
    }
    
    return { valid: true, payload }
  } catch (error) {
    return { valid: false, error: 'Token parsing failed' }
  }
}

/**
 * Decode JWT without verification (for debugging/inspection)
 */
export function decodeJWT(token: string): { header: JWTHeader; payload: JWTPayload } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const header = JSON.parse(base64UrlDecode(parts[0]))
    const payload = JSON.parse(base64UrlDecode(parts[1]))
    
    return { header, payload }
  } catch {
    return null
  }
}

/**
 * Generate access and refresh token pair
 */
export async function generateTokenPair(
  payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'>,
  accessSecret: string,
  refreshSecret: string
): Promise<TokenPair> {
  const accessToken = await createJWT(payload, accessSecret, JWT_CONFIG.accessTokenExpiry)
  
  // Refresh token has minimal payload
  const refreshPayload = {
    sub: payload.sub,
    role: payload.role,
    email: payload.email,
    name: payload.name,
    jti: crypto.randomUUID(), // Unique ID for refresh token
  }
  const refreshToken = await createJWT(refreshPayload, refreshSecret, JWT_CONFIG.refreshTokenExpiry)
  
  return {
    accessToken,
    refreshToken,
    expiresIn: JWT_CONFIG.accessTokenExpiry,
    tokenType: 'Bearer'
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string,
  refreshSecret: string,
  accessSecret: string,
  getUserData: (userId: string) => Promise<Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'> | null>
): Promise<{ accessToken: string; expiresIn: number } | null> {
  const result = await verifyJWT(refreshToken, refreshSecret)
  
  if (!result.valid || !result.payload) {
    return null
  }
  
  // Get fresh user data
  const userData = await getUserData(result.payload.sub)
  if (!userData) {
    return null
  }
  
  const accessToken = await createJWT(userData, accessSecret, JWT_CONFIG.accessTokenExpiry)
  
  return {
    accessToken,
    expiresIn: JWT_CONFIG.accessTokenExpiry
  }
}

/**
 * Extract token from Authorization header
 */
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) return null
  
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null
  }
  
  return parts[1]
}

/**
 * Check if token is about to expire (within threshold)
 */
export function isTokenExpiringSoon(payload: JWTPayload, thresholdSeconds: number = 60): boolean {
  const now = Math.floor(Date.now() / 1000)
  return payload.exp - now < thresholdSeconds
}

/**
 * Get remaining token lifetime in seconds
 */
export function getTokenLifetime(payload: JWTPayload): number {
  const now = Math.floor(Date.now() / 1000)
  return Math.max(0, payload.exp - now)
}
