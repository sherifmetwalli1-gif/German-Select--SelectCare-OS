/**
 * SelectCareOS Input Validation Utilities
 * Secure validation for API inputs
 */

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// UUID validation
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Phone validation (international format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

// Sanitize string input (prevent XSS)
export const sanitizeString = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Validate positive integer
export const isPositiveInteger = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
};

// Validate date string (ISO format)
export const isValidDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

// Validate price/amount (positive number with up to 2 decimal places)
export const isValidAmount = (amount: unknown): amount is number => {
  if (typeof amount !== 'number') return false;
  return amount >= 0 && Number.isFinite(amount);
};

// Validate pagination params
export const validatePagination = (limit: unknown, offset: unknown): { limit: number; offset: number } => {
  const safeLimit = Math.min(Math.max(1, Number(limit) || 20), 100);
  const safeOffset = Math.max(0, Number(offset) || 0);
  return { limit: safeLimit, offset: safeOffset };
};

// Generic object validator
export interface ValidationRule {
  field: string;
  type: 'string' | 'number' | 'boolean' | 'email' | 'uuid' | 'phone' | 'date';
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const validateObject = (obj: Record<string, unknown>, rules: ValidationRule[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const rule of rules) {
    const value = obj[rule.field];

    // Check required fields
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${rule.field} is required`);
      continue;
    }

    // Skip optional empty fields
    if (value === undefined || value === null || value === '') continue;

    // Type validation
    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`${rule.field} must be a string`);
        } else if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${rule.field} must be at most ${rule.maxLength} characters`);
        }
        break;
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push(`${rule.field} must be a number`);
        } else {
          if (rule.min !== undefined && value < rule.min) {
            errors.push(`${rule.field} must be at least ${rule.min}`);
          }
          if (rule.max !== undefined && value > rule.max) {
            errors.push(`${rule.field} must be at most ${rule.max}`);
          }
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${rule.field} must be a boolean`);
        }
        break;
      case 'email':
        if (typeof value !== 'string' || !isValidEmail(value)) {
          errors.push(`${rule.field} must be a valid email`);
        }
        break;
      case 'uuid':
        if (typeof value !== 'string' || !isValidUUID(value)) {
          errors.push(`${rule.field} must be a valid UUID`);
        }
        break;
      case 'phone':
        if (typeof value !== 'string' || !isValidPhone(value)) {
          errors.push(`${rule.field} must be a valid phone number`);
        }
        break;
      case 'date':
        if (typeof value !== 'string' || !isValidDate(value)) {
          errors.push(`${rule.field} must be a valid date`);
        }
        break;
    }
  }

  return { valid: errors.length === 0, errors };
};

// Secure error response helper
export const safeErrorResponse = (error: unknown, defaultMessage: string = 'An error occurred'): string => {
  // In production, never expose internal error details
  if (process.env.NODE_ENV === 'production') {
    return defaultMessage;
  }
  
  // In development, return more details
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
