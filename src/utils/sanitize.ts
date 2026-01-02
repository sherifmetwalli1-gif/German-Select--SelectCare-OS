/**
 * HTML Sanitization Utilities
 * Prevents XSS attacks by escaping HTML entities
 */

/**
 * Escapes HTML entities to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitizes a string for use in HTML attributes
 */
export function sanitizeAttribute(value: string): string {
  if (!value) return '';
  return escapeHtml(value).replace(/[`]/g, '&#96;');
}

/**
 * Validates and sanitizes a URL to prevent javascript: and data: URLs
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim().toLowerCase();
  
  // Block dangerous protocols
  if (trimmed.startsWith('javascript:') || 
      trimmed.startsWith('data:') ||
      trimmed.startsWith('vbscript:')) {
    return '#';
  }
  
  return escapeHtml(url);
}

/**
 * Validates numeric input
 */
export function sanitizeNumber(value: string | number, min?: number, max?: number): number {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return min ?? 0;
  if (min !== undefined && num < min) return min;
  if (max !== undefined && num > max) return max;
  
  return num;
}

/**
 * Validates and sanitizes email
 */
export function sanitizeEmail(email: string): string | null {
  if (!email) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleaned = email.trim().toLowerCase();
  return emailRegex.test(cleaned) ? cleaned : null;
}

/**
 * Sanitizes query parameters
 */
export function sanitizeQueryParam(value: string | null | undefined, maxLength = 200): string {
  if (!value) return '';
  return escapeHtml(value.slice(0, maxLength).trim());
}
