/**
 * Library Index
 * Central export for all library modules
 * German Select Health Platform - SelectCareOS
 */

// Cryptographic utilities
export {
  generateSecureId,
  generateUUID,
  hashPassword,
  verifyPassword,
  generateHMAC,
  verifyHMAC,
  base64UrlEncode,
  base64UrlDecode,
  generateSecureToken,
  hashToken,
  verifyToken
} from './crypto'

// JWT utilities
export {
  createJWT,
  verifyJWT,
  decodeJWT,
  generateTokenPair,
  refreshAccessToken,
  extractBearerToken,
  isTokenExpiringSoon,
  getTokenLifetime
} from './jwt'
export type { JWTPayload, JWTHeader, TokenPair } from './jwt'

// AI Guardrails
export {
  MEDICAL_DISCLAIMER,
  PROHIBITED_TOPICS,
  ESCALATION_TOPICS,
  EMERGENCY_KEYWORDS,
  analyzeMessageSafety,
  wrapAIResponse,
  validateAIOutput,
  AI_RATE_LIMITS,
  moderateContent,
  createAIAuditEntry,
  AI_RESPONSE_TEMPLATES
} from './ai-guardrails'
export type { AIAuditEntry } from './ai-guardrails'

// Alert Engine
export {
  alertEngine,
  AlertEngine,
  DEFAULT_VITAL_THRESHOLDS,
  DEFAULT_ESCALATION_RULES
} from './alert-engine'
export type {
  Alert,
  AlertSeverity,
  AlertStatus,
  AlertCategory,
  VitalThresholds,
  EscalationRule
} from './alert-engine'
