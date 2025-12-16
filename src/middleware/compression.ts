/**
 * Response Compression Middleware
 * Enables gzip/deflate compression for responses
 * Optimized for Cloudflare Workers environment
 */

import { Context, Next } from 'hono'

/**
 * Content types that benefit from compression
 */
const COMPRESSIBLE_TYPES = [
  'text/html',
  'text/plain',
  'text/css',
  'text/javascript',
  'application/javascript',
  'application/json',
  'application/xml',
  'text/xml',
  'application/xhtml+xml',
  'image/svg+xml',
]

/**
 * Minimum size (bytes) to compress
 * Below this threshold, compression overhead isn't worth it
 */
const MIN_COMPRESS_SIZE = 1024 // 1KB

/**
 * Check if content type is compressible
 */
function isCompressible(contentType: string | null): boolean {
  if (!contentType) return false
  return COMPRESSIBLE_TYPES.some(type => contentType.includes(type))
}

/**
 * Check if client accepts compression
 */
function acceptsCompression(acceptEncoding: string | null): 'gzip' | 'deflate' | null {
  if (!acceptEncoding) return null
  
  if (acceptEncoding.includes('gzip')) return 'gzip'
  if (acceptEncoding.includes('deflate')) return 'deflate'
  
  return null
}

/**
 * Compression middleware
 * Note: Cloudflare Workers handle compression automatically at the edge,
 * but this middleware adds proper headers and can be used for other deployments
 */
export const compressionMiddleware = async (c: Context, next: Next) => {
  // Add Vary header to indicate response varies based on Accept-Encoding
  c.res.headers.set('Vary', 'Accept-Encoding')
  
  await next()
  
  // Cloudflare handles compression at edge, we just ensure proper headers
  const contentType = c.res.headers.get('Content-Type')
  const acceptEncoding = c.req.header('Accept-Encoding')
  
  // If content is compressible and client accepts it
  if (isCompressible(contentType) && acceptsCompression(acceptEncoding)) {
    // Cloudflare will automatically compress, we just mark it
    c.res.headers.set('X-Compression-Hint', 'compressible')
  }
}

/**
 * Enhanced compression configuration for non-Cloudflare environments
 * Uses CompressionStream API when available
 */
export async function compressResponse(
  body: string | ArrayBuffer,
  encoding: 'gzip' | 'deflate'
): Promise<ArrayBuffer> {
  // Check if CompressionStream is available (modern environments)
  if (typeof CompressionStream === 'undefined') {
    // Fallback: return uncompressed
    if (typeof body === 'string') {
      return new TextEncoder().encode(body).buffer
    }
    return body
  }
  
  const stream = new CompressionStream(encoding)
  
  let inputData: Uint8Array
  if (typeof body === 'string') {
    inputData = new TextEncoder().encode(body)
  } else {
    inputData = new Uint8Array(body)
  }
  
  const writer = stream.writable.getWriter()
  writer.write(inputData)
  writer.close()
  
  const chunks: Uint8Array[] = []
  const reader = stream.readable.getReader()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }
  
  // Concatenate chunks
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  
  return result.buffer
}

/**
 * Decompression helper for incoming compressed requests
 */
export async function decompressRequest(
  body: ArrayBuffer,
  encoding: 'gzip' | 'deflate'
): Promise<string> {
  if (typeof DecompressionStream === 'undefined') {
    // Fallback: assume uncompressed
    return new TextDecoder().decode(body)
  }
  
  const stream = new DecompressionStream(encoding)
  
  const writer = stream.writable.getWriter()
  writer.write(new Uint8Array(body))
  writer.close()
  
  const chunks: Uint8Array[] = []
  const reader = stream.readable.getReader()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }
  
  // Concatenate and decode
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  
  return new TextDecoder().decode(result)
}
