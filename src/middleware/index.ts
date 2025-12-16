/**
 * Middleware Index
 * Central export for all middleware modules
 * German Select Health Platform - SelectCareOS
 */

// Tracing & Observability
export { 
  tracingMiddleware, 
  requestLogger, 
  metricsMiddleware,
  createSpan,
  getMetrics,
  resetMetrics 
} from './tracing'

// Rate Limiting
export { 
  rateLimiter, 
  globalRateLimiter,
  slidingWindowRateLimiter,
  endpointRateLimiter,
  RATE_LIMITS 
} from './rate-limit'

// Security
export { 
  securityHeaders, 
  hipaaSecurityHeaders,
  apiSecurityHeaders,
  requestId,
  createCorsConfig,
  sanitizeInput,
  redactSensitiveData 
} from './security'

// Compression
export { 
  compressionMiddleware,
  compressResponse,
  decompressRequest 
} from './compression'

// Caching
export { 
  cachingMiddleware,
  setCacheHeaders,
  invalidateCache,
  setSurrogateKeys 
} from './cache'

// Error Handling
export { 
  errorHandler,
  notFoundHandler,
  asyncHandler,
  healthCheckHandler,
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ExternalServiceError 
} from './error-handler'

// Validation
export {
  // Validators
  string,
  number,
  boolean,
  enumType,
  array,
  object,
  optional,
  date,
  // Schemas
  PatientSchema,
  AppointmentSchema,
  VitalsSchema,
  TelemedicineSessionSchema,
  AIChatSchema,
  PackageOrderSchema,
  // Middleware
  validateBody,
  validateQuery,
  validateParams,
  // Sanitizers
  sanitizeHtml,
  sanitizeSql
} from './validation'

// Authentication
export {
  authMiddleware,
  optionalAuth,
  requireRole,
  requirePatient,
  requireDoctor,
  requireAdmin,
  requireProvider,
  requireSelfOrAdmin,
  requireCareTeamAccess,
  apiKeyAuth,
  auditLog
} from './auth'
