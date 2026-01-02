/**
 * Simple In-Memory Rate Limiter for Cloudflare Workers
 * Uses request counting with sliding window
 */

interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
  keyGenerator?: (c: any) => string; // Custom key generator
}

interface RequestRecord {
  count: number;
  resetAt: number;
}

// In-memory store (resets on worker restart - use KV for production persistence)
const store = new Map<string, RequestRecord>();

/**
 * Creates a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig) {
  const { windowMs, maxRequests, keyGenerator } = config;
  
  return async (c: any, next: () => Promise<void>) => {
    // Generate key (default: IP address or CF-Connecting-IP)
    const key = keyGenerator 
      ? keyGenerator(c) 
      : c.req.header('cf-connecting-ip') || 
        c.req.header('x-forwarded-for')?.split(',')[0] || 
        'anonymous';
    
    const now = Date.now();
    const record = store.get(key);
    
    // Clean up expired records periodically
    if (Math.random() < 0.01) { // 1% chance per request
      for (const [k, v] of store.entries()) {
        if (v.resetAt < now) store.delete(k);
      }
    }
    
    if (!record || record.resetAt < now) {
      // New window
      store.set(key, { count: 1, resetAt: now + windowMs });
    } else if (record.count >= maxRequests) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      return c.json({
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter
      }, 429, {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.ceil(record.resetAt / 1000).toString()
      });
    } else {
      // Increment count
      record.count++;
    }
    
    // Add rate limit headers
    c.header('X-RateLimit-Limit', maxRequests.toString());
    c.header('X-RateLimit-Remaining', Math.max(0, maxRequests - (store.get(key)?.count || 0)).toString());
    
    await next();
  };
}

// Pre-configured rate limiters
export const standardLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60      // 60 requests per minute
});

export const strictLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10      // 10 requests per minute (for sensitive endpoints)
});

export const analysisLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20      // 20 analysis requests per minute
});
