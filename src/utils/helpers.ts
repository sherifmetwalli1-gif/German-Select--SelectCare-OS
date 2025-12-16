/**
 * Utility Helpers
 * Common utility functions for the platform
 */

import type { Currency, DateRange, PaginationParams, FilterParams } from '../types'

// =============================================================================
// ID GENERATION
// =============================================================================

/**
 * Generate a UUID v4
 */
export function generateId(): string {
  return crypto.randomUUID()
}

/**
 * Generate a short ID (8 characters)
 */
export function generateShortId(): string {
  const array = new Uint8Array(4)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a booking reference
 */
export function generateBookingRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = generateShortId().substring(0, 4).toUpperCase()
  return `GS-${timestamp}-${random}`
}

/**
 * Generate a transaction reference
 */
export function generateTransactionRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  return `TXN-${timestamp}`
}

// =============================================================================
// DATE & TIME UTILITIES
// =============================================================================

/**
 * Format a date string to ISO format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * Format a datetime string
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString()
}

/**
 * Get date range for a period
 */
export function getDateRange(period: '7d' | '30d' | '90d' | '1y' | 'mtd' | 'ytd'): DateRange {
  const now = new Date()
  const end = formatDate(now)
  let start: Date
  
  switch (period) {
    case '7d':
      start = new Date(now.setDate(now.getDate() - 7))
      break
    case '30d':
      start = new Date(now.setDate(now.getDate() - 30))
      break
    case '90d':
      start = new Date(now.setDate(now.getDate() - 90))
      break
    case '1y':
      start = new Date(now.setFullYear(now.getFullYear() - 1))
      break
    case 'mtd':
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'ytd':
      start = new Date(now.getFullYear(), 0, 1)
      break
    default:
      start = new Date(now.setDate(now.getDate() - 30))
  }
  
  return { start: formatDate(start), end }
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return d < new Date()
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return d > new Date()
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string, days: number): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * Get relative time string
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return d.toLocaleDateString()
}

// =============================================================================
// CURRENCY & FORMATTING
// =============================================================================

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: Currency = 'EUR'): string {
  const symbols: Record<Currency, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    AED: 'د.إ',
    CHF: 'CHF'
  }
  
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  
  return `${symbols[currency]}${formatted}`
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Convert amount between currencies (simplified)
 */
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency,
  rates: Record<Currency, number> = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    AED: 3.96,
    CHF: 0.95
  }
): number {
  if (from === to) return amount
  const inEur = amount / rates[from]
  return inEur * rates[to]
}

// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Title case a string
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Truncate a string
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

/**
 * Mask email address
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  
  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : local[0] + '*'
  
  return `${maskedLocal}@${domain}`
}

/**
 * Mask phone number
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return phone
  return '*'.repeat(digits.length - 4) + digits.slice(-4)
}

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^\+?[\d\s-()]{10,}$/
  return regex.test(phone)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return regex.test(uuid)
}

// =============================================================================
// PAGINATION & FILTERING
// =============================================================================

/**
 * Parse pagination parameters
 */
export function parsePagination(params: PaginationParams): {
  page: number
  limit: number
  offset: number
} {
  const page = Math.max(1, params.page || 1)
  const limit = Math.min(100, Math.max(1, params.limit || 20))
  const offset = (page - 1) * limit
  
  return { page, limit, offset }
}

/**
 * Build pagination metadata
 */
export function buildPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit)
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  }
}

/**
 * Parse filter parameters from query string
 */
export function parseFilters(query: Record<string, string>): FilterParams {
  const filters: FilterParams = {}
  
  // Pagination
  if (query.page) filters.page = parseInt(query.page)
  if (query.limit) filters.limit = parseInt(query.limit)
  if (query.sort_by) filters.sort_by = query.sort_by
  if (query.sort_order) filters.sort_order = query.sort_order as 'asc' | 'desc'
  
  // Common filters
  if (query.search) filters.search = query.search
  if (query.status) filters.status = query.status
  if (query.date_from) filters.date_from = query.date_from
  if (query.date_to) filters.date_to = query.date_to
  
  return filters
}

// =============================================================================
// CALCULATIONS
// =============================================================================

/**
 * Calculate commission amount
 */
export function calculateCommission(amount: number, rate: number): number {
  return Math.round((amount * rate / 100) * 100) / 100
}

/**
 * Calculate platform fee
 */
export function calculatePlatformFee(amount: number, feeRate = 10): number {
  return calculateCommission(amount, feeRate)
}

/**
 * Calculate BMI
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 1000) / 10
}

// =============================================================================
// SECURITY
// =============================================================================

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return str.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Generate a secure random string
 */
export function generateSecureString(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Constant-time string comparison
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

/**
 * Create a structured error
 */
export function createError(code: string, message: string, details?: Record<string, any>) {
  return {
    code,
    message,
    details,
    timestamp: new Date().toISOString()
  }
}

/**
 * Check if error is a specific type
 */
export function isErrorType(error: any, code: string): boolean {
  return error?.code === code
}

// =============================================================================
// OBJECT UTILITIES
// =============================================================================

/**
 * Remove undefined/null values from object
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null)
  ) as Partial<T>
}

/**
 * Pick specific keys from object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key]
    return result
  }, {} as Pick<T, K>)
}

/**
 * Omit specific keys from object
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// =============================================================================
// ARRAY UTILITIES
// =============================================================================

/**
 * Group array items by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key])
    if (!result[group]) result[group] = []
    result[group].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by key
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Get unique values from array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

// =============================================================================
// ASYNC UTILITIES
// =============================================================================

/**
 * Delay execution
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delayMs?: number; backoffMultiplier?: number } = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoffMultiplier = 2 } = options
  
  let lastError: Error | undefined
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxAttempts) {
        await delay(delayMs * Math.pow(backoffMultiplier, attempt - 1))
      }
    }
  }
  
  throw lastError
}

/**
 * Execute promises with concurrency limit
 */
export async function withConcurrency<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = []
  const chunks = chunk(items, concurrency)
  
  for (const chunkItems of chunks) {
    const chunkResults = await Promise.all(chunkItems.map(fn))
    results.push(...chunkResults)
  }
  
  return results
}
