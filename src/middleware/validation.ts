/**
 * Input Validation Middleware
 * Type-safe request validation using Zod-like patterns
 * Optimized for Cloudflare Workers (no external dependencies)
 */

import { Context, Next } from 'hono'
import { ValidationError } from './error-handler'

/**
 * Validation schema types
 */
type ValidatorFn<T> = (value: unknown) => { success: true; data: T } | { success: false; error: string }

interface Schema<T> {
  parse: (value: unknown) => T
  safeParse: ValidatorFn<T>
}

/**
 * String validator builder
 */
export function string(options?: {
  min?: number
  max?: number
  pattern?: RegExp
  email?: boolean
  uuid?: boolean
  trim?: boolean
}) {
  return {
    parse(value: unknown): string {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: string } | { success: false; error: string } {
      if (typeof value !== 'string') {
        return { success: false, error: 'Expected string' }
      }
      
      let str = options?.trim ? value.trim() : value
      
      if (options?.min !== undefined && str.length < options.min) {
        return { success: false, error: `String must be at least ${options.min} characters` }
      }
      
      if (options?.max !== undefined && str.length > options.max) {
        return { success: false, error: `String must be at most ${options.max} characters` }
      }
      
      if (options?.pattern && !options.pattern.test(str)) {
        return { success: false, error: 'String does not match required pattern' }
      }
      
      if (options?.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(str)) {
          return { success: false, error: 'Invalid email format' }
        }
      }
      
      if (options?.uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(str)) {
          return { success: false, error: 'Invalid UUID format' }
        }
      }
      
      return { success: true, data: str }
    }
  }
}

/**
 * Number validator builder
 */
export function number(options?: {
  min?: number
  max?: number
  integer?: boolean
  positive?: boolean
}) {
  return {
    parse(value: unknown): number {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: number } | { success: false; error: string } {
      const num = typeof value === 'string' ? parseFloat(value) : value
      
      if (typeof num !== 'number' || isNaN(num)) {
        return { success: false, error: 'Expected number' }
      }
      
      if (options?.integer && !Number.isInteger(num)) {
        return { success: false, error: 'Expected integer' }
      }
      
      if (options?.positive && num <= 0) {
        return { success: false, error: 'Expected positive number' }
      }
      
      if (options?.min !== undefined && num < options.min) {
        return { success: false, error: `Number must be at least ${options.min}` }
      }
      
      if (options?.max !== undefined && num > options.max) {
        return { success: false, error: `Number must be at most ${options.max}` }
      }
      
      return { success: true, data: num }
    }
  }
}

/**
 * Boolean validator
 */
export function boolean() {
  return {
    parse(value: unknown): boolean {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: boolean } | { success: false; error: string } {
      if (typeof value === 'boolean') {
        return { success: true, data: value }
      }
      
      if (value === 'true') return { success: true, data: true }
      if (value === 'false') return { success: true, data: false }
      
      return { success: false, error: 'Expected boolean' }
    }
  }
}

/**
 * Enum validator
 */
export function enumType<T extends string>(values: readonly T[]) {
  return {
    parse(value: unknown): T {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: T } | { success: false; error: string } {
      if (typeof value !== 'string' || !values.includes(value as T)) {
        return { success: false, error: `Expected one of: ${values.join(', ')}` }
      }
      return { success: true, data: value as T }
    }
  }
}

/**
 * Array validator
 */
export function array<T>(itemValidator: Schema<T>, options?: { min?: number; max?: number }) {
  return {
    parse(value: unknown): T[] {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: T[] } | { success: false; error: string } {
      if (!Array.isArray(value)) {
        return { success: false, error: 'Expected array' }
      }
      
      if (options?.min !== undefined && value.length < options.min) {
        return { success: false, error: `Array must have at least ${options.min} items` }
      }
      
      if (options?.max !== undefined && value.length > options.max) {
        return { success: false, error: `Array must have at most ${options.max} items` }
      }
      
      const results: T[] = []
      for (let i = 0; i < value.length; i++) {
        const itemResult = itemValidator.safeParse(value[i])
        if (!itemResult.success) {
          return { success: false, error: `Item ${i}: ${itemResult.error}` }
        }
        results.push(itemResult.data)
      }
      
      return { success: true, data: results }
    }
  }
}

/**
 * Object validator builder
 */
export function object<T extends Record<string, Schema<any>>>(shape: T) {
  type Output = { [K in keyof T]: ReturnType<T[K]['parse']> }
  
  return {
    parse(value: unknown): Output {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: Output } | { success: false; error: string } {
      if (typeof value !== 'object' || value === null) {
        return { success: false, error: 'Expected object' }
      }
      
      const result: any = {}
      const errors: string[] = []
      
      for (const [key, validator] of Object.entries(shape)) {
        const fieldValue = (value as any)[key]
        const fieldResult = validator.safeParse(fieldValue)
        
        if (!fieldResult.success) {
          errors.push(`${key}: ${fieldResult.error}`)
        } else {
          result[key] = fieldResult.data
        }
      }
      
      if (errors.length > 0) {
        return { success: false, error: errors.join('; ') }
      }
      
      return { success: true, data: result as Output }
    }
  }
}

/**
 * Optional wrapper
 */
export function optional<T>(validator: Schema<T>) {
  return {
    parse(value: unknown): T | undefined {
      if (value === undefined || value === null || value === '') {
        return undefined
      }
      return validator.parse(value)
    },
    safeParse(value: unknown): { success: true; data: T | undefined } | { success: false; error: string } {
      if (value === undefined || value === null || value === '') {
        return { success: true, data: undefined }
      }
      return validator.safeParse(value)
    }
  }
}

/**
 * Date validator
 */
export function date() {
  return {
    parse(value: unknown): Date {
      const result = this.safeParse(value)
      if (!result.success) throw new ValidationError(result.error)
      return result.data
    },
    safeParse(value: unknown): { success: true; data: Date } | { success: false; error: string } {
      if (value instanceof Date && !isNaN(value.getTime())) {
        return { success: true, data: value }
      }
      
      if (typeof value === 'string') {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
          return { success: true, data: date }
        }
      }
      
      return { success: false, error: 'Invalid date' }
    }
  }
}

// =============================================================================
// Common Schemas for German Select Platform
// =============================================================================

/**
 * Patient-related schemas
 */
export const PatientSchema = object({
  id: optional(string({ uuid: true })),
  name: string({ min: 2, max: 100 }),
  email: string({ email: true }),
  phone: optional(string({ pattern: /^\+?[\d\s-()]+$/ })),
  dateOfBirth: optional(date()),
})

/**
 * Appointment schemas
 */
export const AppointmentSchema = object({
  patientId: string({ uuid: true }),
  doctorId: string({ uuid: true }),
  date: date(),
  type: enumType(['consultation', 'follow-up', 'telemedicine', 'procedure'] as const),
  notes: optional(string({ max: 1000 })),
})

/**
 * Vitals/RPM schemas
 */
export const VitalsSchema = object({
  heartRate: optional(number({ min: 30, max: 250, integer: true })),
  bloodPressureSystolic: optional(number({ min: 70, max: 250, integer: true })),
  bloodPressureDiastolic: optional(number({ min: 40, max: 150, integer: true })),
  temperature: optional(number({ min: 35, max: 42 })),
  weight: optional(number({ min: 20, max: 300, positive: true })),
  bloodGlucose: optional(number({ min: 20, max: 600, positive: true })),
  oxygenSaturation: optional(number({ min: 70, max: 100 })),
})

/**
 * Telemedicine session schema
 */
export const TelemedicineSessionSchema = object({
  patientId: string({ uuid: true }),
  doctorId: string({ uuid: true }),
  scheduledAt: date(),
  duration: optional(number({ min: 5, max: 120, integer: true })),
  type: enumType(['video', 'audio', 'chat'] as const),
})

/**
 * AI chat schema
 */
export const AIChatSchema = object({
  message: string({ min: 1, max: 2000 }),
  context: optional(enumType(['general', 'symptoms', 'medication', 'lifestyle'] as const)),
  language: optional(enumType(['en', 'de', 'ar'] as const)),
})

/**
 * CareSelect™ package order schema
 */
export const PackageOrderSchema = object({
  packageId: string(),
  accommodationId: optional(string()),
  excursionIds: optional(array(string())),
  startDate: date(),
  specialRequests: optional(string({ max: 500 })),
})

// =============================================================================
// Validation Middleware
// =============================================================================

/**
 * Request body validation middleware factory
 */
export function validateBody<T>(schema: Schema<T>) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json()
      const result = schema.safeParse(body)
      
      if (!result.success) {
        return c.json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request body validation failed',
            details: { error: result.error }
          }
        }, 400)
      }
      
      // Store validated data in context
      c.set('validatedBody', result.data)
      await next()
    } catch (error) {
      return c.json({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Invalid JSON in request body'
        }
      }, 400)
    }
  }
}

/**
 * Query parameters validation middleware factory
 */
export function validateQuery<T>(schema: Schema<T>) {
  return async (c: Context, next: Next) => {
    const query = c.req.query()
    const result = schema.safeParse(query)
    
    if (!result.success) {
      return c.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Query parameter validation failed',
          details: { error: result.error }
        }
      }, 400)
    }
    
    c.set('validatedQuery', result.data)
    await next()
  }
}

/**
 * Path parameters validation middleware factory
 */
export function validateParams<T>(schema: Schema<T>) {
  return async (c: Context, next: Next) => {
    const params = c.req.param()
    const result = schema.safeParse(params)
    
    if (!result.success) {
      return c.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Path parameter validation failed',
          details: { error: result.error }
        }
      }, 400)
    }
    
    c.set('validatedParams', result.data)
    await next()
  }
}

/**
 * Input sanitization helpers
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function sanitizeSql(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
}
