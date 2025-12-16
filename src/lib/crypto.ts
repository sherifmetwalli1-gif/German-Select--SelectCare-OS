/**
 * Cryptographic Utilities
 * Web Crypto API based - Cloudflare Workers compatible
 * HIPAA-compliant password hashing and token generation
 */

/**
 * Generate a secure random string
 */
export function generateSecureId(length: number = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return crypto.randomUUID()
}

/**
 * Hash password using PBKDF2 with SHA-256
 * HIPAA-compliant: 100,000 iterations, 256-bit salt
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(32))
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  )
  
  const hashArray = new Uint8Array(derivedBits)
  const hashHex = Array.from(hashArray, b => b.toString(16).padStart(2, '0')).join('')
  const saltHex = Array.from(salt, b => b.toString(16).padStart(2, '0')).join('')
  
  // Format: algorithm$iterations$salt$hash
  return `pbkdf2$100000$${saltHex}$${hashHex}`
}

/**
 * Verify password against stored hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split('$')
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
      return false
    }
    
    const iterations = parseInt(parts[1], 10)
    const saltHex = parts[2]
    const hashHex = parts[3]
    
    // Convert salt from hex to Uint8Array
    const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)))
    
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    )
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    )
    
    const computedHash = Array.from(new Uint8Array(derivedBits), b => b.toString(16).padStart(2, '0')).join('')
    
    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(computedHash, hashHex)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Generate HMAC-SHA256 signature
 */
export async function generateHMAC(data: string, secret: string): Promise<string> {
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
    encoder.encode(data)
  )
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Verify HMAC-SHA256 signature
 */
export async function verifyHMAC(data: string, signature: string, secret: string): Promise<boolean> {
  const expectedSignature = await generateHMAC(data, secret)
  return timingSafeEqual(signature, expectedSignature)
}

/**
 * Base64URL encode
 */
export function base64UrlEncode(data: string): string {
  return btoa(data)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Base64URL decode
 */
export function base64UrlDecode(data: string): string {
  const padded = data + '='.repeat((4 - data.length % 4) % 4)
  return atob(padded.replace(/-/g, '+').replace(/_/g, '/'))
}

/**
 * Generate a secure token for password reset, email verification, etc.
 */
export async function generateSecureToken(): Promise<{ token: string; hash: string }> {
  const token = generateSecureId(32)
  const hash = await hashToken(token)
  return { token, hash }
}

/**
 * Hash a token for storage (one-way)
 */
export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify a token against its hash
 */
export async function verifyToken(token: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashToken(token)
  return timingSafeEqual(computedHash, storedHash)
}
