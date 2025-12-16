/**
 * Caching Middleware
 * Implements intelligent caching for performance optimization
 * Compliant with healthcare data regulations (no PHI caching)
 */

import { Context, Next } from 'hono'

/**
 * Cache configuration by route pattern
 */
interface CacheConfig {
  pattern: RegExp
  maxAge: number          // Cache-Control max-age in seconds
  staleWhileRevalidate?: number  // SWR time in seconds
  private?: boolean       // Private cache (user-specific)
  noStore?: boolean       // Never cache (PHI endpoints)
  immutable?: boolean     // Content never changes (versioned assets)
  etag?: boolean          // Generate ETag for conditional requests
}

/**
 * Cache configurations for different endpoint types
 */
const CACHE_CONFIGS: CacheConfig[] = [
  // PHI endpoints - NEVER cache
  {
    pattern: /^\/api\/(patient|medical|rpm|vitals|prescriptions|diagnosis)/,
    maxAge: 0,
    noStore: true,
    private: true,
  },
  {
    pattern: /^\/patient\/(profile|medical|rpm)/,
    maxAge: 0,
    noStore: true,
    private: true,
  },
  
  // Telemedicine - No caching, real-time
  {
    pattern: /^\/api\/telemedicine/,
    maxAge: 0,
    noStore: true,
    private: true,
  },
  
  // Static content - Long cache with versioning
  {
    pattern: /^\/static\/.+\.(js|css|woff2?|ttf|eot)(\?v=.+)?$/,
    maxAge: 31536000,  // 1 year
    immutable: true,
    etag: true,
  },
  {
    pattern: /^\/static\/.+\.(png|jpg|jpeg|gif|svg|ico|webp)$/,
    maxAge: 604800,    // 1 week
    staleWhileRevalidate: 86400,  // 1 day SWR
    etag: true,
  },
  
  // Public catalog data - Medium cache
  {
    pattern: /^\/api\/careselect\/(packages|accommodations|excursions|wellness)$/,
    maxAge: 300,       // 5 minutes
    staleWhileRevalidate: 60,
    etag: true,
  },
  {
    pattern: /^\/api\/marketplace\//,  // Backward compatibility
    maxAge: 300,
    staleWhileRevalidate: 60,
    etag: true,
  },
  
  // Doctor listings - Short cache
  {
    pattern: /^\/api\/doctors$/,
    maxAge: 120,       // 2 minutes
    staleWhileRevalidate: 30,
    etag: true,
  },
  
  // AI endpoints - No cache (personalized responses)
  {
    pattern: /^\/api\/ai\//,
    maxAge: 0,
    noStore: true,
    private: true,
  },
  
  // Health check - Short cache
  {
    pattern: /^\/api\/health$/,
    maxAge: 10,
    etag: false,
  },
  
  // Metrics endpoint - No cache
  {
    pattern: /^\/api\/metrics$/,
    maxAge: 0,
    noStore: true,
    private: true,
  },
  
  // Default API - Short cache with private
  {
    pattern: /^\/api\//,
    maxAge: 60,
    private: true,
    etag: true,
  },
  
  // HTML pages - Short cache with SWR
  {
    pattern: /^\/($|patient|doctor|login)/,
    maxAge: 0,
    staleWhileRevalidate: 60,
    private: true,
    etag: true,
  },
]

/**
 * Get cache config for a path
 */
function getCacheConfig(path: string): CacheConfig | null {
  for (const config of CACHE_CONFIGS) {
    if (config.pattern.test(path)) {
      return config
    }
  }
  return null
}

/**
 * Generate ETag from content
 */
async function generateETag(content: string | ArrayBuffer): Promise<string> {
  const data = typeof content === 'string' 
    ? new TextEncoder().encode(content)
    : new Uint8Array(content)
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return `"${hashHex.substring(0, 16)}"`
}

/**
 * Build Cache-Control header value
 */
function buildCacheControl(config: CacheConfig): string {
  const directives: string[] = []
  
  if (config.noStore) {
    return 'no-store, no-cache, must-revalidate, private, max-age=0'
  }
  
  if (config.private) {
    directives.push('private')
  } else {
    directives.push('public')
  }
  
  directives.push(`max-age=${config.maxAge}`)
  
  if (config.staleWhileRevalidate) {
    directives.push(`stale-while-revalidate=${config.staleWhileRevalidate}`)
  }
  
  if (config.immutable) {
    directives.push('immutable')
  }
  
  return directives.join(', ')
}

/**
 * Caching middleware
 * Adds appropriate cache headers based on route configuration
 */
export const cachingMiddleware = async (c: Context, next: Next) => {
  const path = c.req.path
  const method = c.req.method
  
  // Only cache GET and HEAD requests
  if (method !== 'GET' && method !== 'HEAD') {
    await next()
    return
  }
  
  const config = getCacheConfig(path)
  
  // Handle conditional requests (If-None-Match)
  const ifNoneMatch = c.req.header('If-None-Match')
  
  await next()
  
  if (!config) {
    // Default: no cache for unmatched routes
    c.res.headers.set('Cache-Control', 'no-cache')
    return
  }
  
  // Set Cache-Control header
  c.res.headers.set('Cache-Control', buildCacheControl(config))
  
  // Add Vary header for proper caching
  const varyHeaders = ['Accept', 'Accept-Encoding']
  if (config.private) {
    varyHeaders.push('Authorization', 'Cookie')
  }
  c.res.headers.set('Vary', varyHeaders.join(', '))
  
  // Generate and check ETag if enabled
  if (config.etag && c.res.body) {
    try {
      const body = await c.res.clone().text()
      const etag = await generateETag(body)
      c.res.headers.set('ETag', etag)
      
      // Check for conditional request match
      if (ifNoneMatch && ifNoneMatch === etag) {
        // Return 304 Not Modified
        c.res = new Response(null, {
          status: 304,
          headers: {
            'ETag': etag,
            'Cache-Control': buildCacheControl(config),
          }
        })
      }
    } catch (e) {
      // ETag generation failed, continue without it
    }
  }
  
  // Add timestamp for debugging
  c.res.headers.set('X-Cache-Config', config.pattern.toString())
}

/**
 * Manual cache control helper
 * Use in route handlers for custom caching
 */
export function setCacheHeaders(c: Context, options: {
  maxAge?: number
  private?: boolean
  noStore?: boolean
  staleWhileRevalidate?: number
  etag?: string
}) {
  if (options.noStore) {
    c.header('Cache-Control', 'no-store, no-cache, must-revalidate')
    c.header('Pragma', 'no-cache')
    return
  }
  
  const directives: string[] = []
  
  if (options.private) {
    directives.push('private')
  } else {
    directives.push('public')
  }
  
  if (options.maxAge !== undefined) {
    directives.push(`max-age=${options.maxAge}`)
  }
  
  if (options.staleWhileRevalidate) {
    directives.push(`stale-while-revalidate=${options.staleWhileRevalidate}`)
  }
  
  c.header('Cache-Control', directives.join(', '))
  
  if (options.etag) {
    c.header('ETag', options.etag)
  }
}

/**
 * Cache invalidation helper
 * Marks response as uncacheable after data mutation
 */
export function invalidateCache(c: Context) {
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate')
  c.header('Pragma', 'no-cache')
  c.header('Expires', '0')
  c.header('X-Cache-Invalidated', new Date().toISOString())
}

/**
 * Surrogate key helper for CDN cache invalidation
 * Used with Cloudflare or other CDN cache tags
 */
export function setSurrogateKeys(c: Context, keys: string[]) {
  c.header('Surrogate-Key', keys.join(' '))
  c.header('Cache-Tag', keys.join(','))  // Cloudflare format
}
