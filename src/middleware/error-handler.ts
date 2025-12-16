/**
 * Error Handling Middleware
 * Centralized error handling with proper logging and responses
 * HIPAA-compliant error responses (no PHI leakage)
 */

import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

/**
 * Custom application error types
 */
export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean
  public readonly details?: Record<string, any>
  
  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details?: Record<string, any>
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational
    this.details = details
    
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Common error types
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 400, 'VALIDATION_ERROR', true, details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR', true)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR', true)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND', true)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT', true)
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED', true, { retryAfter })
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, details?: Record<string, any>) {
    super(`External service error: ${service}`, 502, 'EXTERNAL_SERVICE_ERROR', true, details)
  }
}

/**
 * Error response format
 */
interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, any>
    requestId?: string
    timestamp: string
  }
}

/**
 * Build standardized error response
 */
function buildErrorResponse(
  code: string,
  message: string,
  requestId?: string,
  details?: Record<string, any>
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
      requestId,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Sanitize error message for external response
 * Removes potential PHI and internal details
 */
function sanitizeErrorMessage(message: string): string {
  // Remove potential file paths
  message = message.replace(/\/[^\s]+\.(ts|js|json)/g, '[file]')
  
  // Remove potential database details
  message = message.replace(/table\s+['"`]?\w+['"`]?/gi, 'table [redacted]')
  message = message.replace(/column\s+['"`]?\w+['"`]?/gi, 'column [redacted]')
  
  // Remove potential email addresses
  message = message.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]')
  
  // Remove potential IDs
  message = message.replace(/id\s*[:=]\s*['"`]?[\w-]+['"`]?/gi, 'id=[redacted]')
  
  return message
}

/**
 * Log error with context
 */
function logError(error: Error | AppError, c: Context) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'error',
    requestId: c.get('requestId'),
    traceId: c.get('traceId'),
    method: c.req.method,
    path: c.req.path,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(error instanceof AppError && {
        code: error.code,
        statusCode: error.statusCode,
        isOperational: error.isOperational,
      })
    }
  }
  
  console.error(JSON.stringify(logEntry))
}

/**
 * Main error handling middleware
 */
export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    const requestId = c.get('requestId') as string | undefined
    
    // Log the error
    if (error instanceof Error) {
      logError(error, c)
    }
    
    // Handle AppError (our custom errors)
    if (error instanceof AppError) {
      const response = buildErrorResponse(
        error.code,
        error.isOperational ? error.message : 'An unexpected error occurred',
        requestId,
        error.isOperational ? error.details : undefined
      )
      
      return c.json(response, error.statusCode as any)
    }
    
    // Handle Hono HTTPException
    if (error instanceof HTTPException) {
      const response = buildErrorResponse(
        `HTTP_${error.status}`,
        error.message || 'Request failed',
        requestId
      )
      
      return c.json(response, error.status)
    }
    
    // Handle generic errors
    if (error instanceof Error) {
      const isDev = c.env?.NODE_ENV === 'development'
      const response = buildErrorResponse(
        'INTERNAL_ERROR',
        isDev ? sanitizeErrorMessage(error.message) : 'An unexpected error occurred',
        requestId
      )
      
      return c.json(response, 500)
    }
    
    // Unknown error type
    const response = buildErrorResponse(
      'UNKNOWN_ERROR',
      'An unexpected error occurred',
      requestId
    )
    
    return c.json(response, 500)
  }
}

/**
 * Not Found handler
 */
export const notFoundHandler = (c: Context) => {
  const requestId = c.get('requestId') as string | undefined
  
  const response = buildErrorResponse(
    'NOT_FOUND',
    `Route ${c.req.method} ${c.req.path} not found`,
    requestId
  )
  
  return c.json(response, 404)
}

/**
 * Async error wrapper for route handlers
 * Catches async errors and passes to error handler
 */
export function asyncHandler<T>(
  handler: (c: Context) => Promise<T>
): (c: Context) => Promise<T | Response> {
  return async (c: Context) => {
    try {
      return await handler(c)
    } catch (error) {
      const requestId = c.get('requestId') as string | undefined
      
      if (error instanceof Error) {
        logError(error, c)
      }
      
      if (error instanceof AppError) {
        return c.json(buildErrorResponse(
          error.code,
          error.message,
          requestId,
          error.details
        ), error.statusCode as any)
      }
      
      throw error
    }
  }
}

/**
 * Health check error handling
 * Returns degraded status instead of error
 */
export function healthCheckHandler(checks: Record<string, () => Promise<boolean>>) {
  return async (c: Context) => {
    const results: Record<string, { status: 'ok' | 'error'; latency?: number }> = {}
    let allHealthy = true
    
    for (const [name, check] of Object.entries(checks)) {
      const start = Date.now()
      try {
        const healthy = await check()
        results[name] = {
          status: healthy ? 'ok' : 'error',
          latency: Date.now() - start
        }
        if (!healthy) allHealthy = false
      } catch (error) {
        results[name] = {
          status: 'error',
          latency: Date.now() - start
        }
        allHealthy = false
      }
    }
    
    return c.json({
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: results
    }, allHealthy ? 200 : 503)
  }
}
