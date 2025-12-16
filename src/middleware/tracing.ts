/**
 * OpenTelemetry-style Tracing Middleware
 * Provides request tracing, timing, and observability
 */

import { Context, Next } from 'hono'

// Trace context interface
interface TraceContext {
  traceId: string
  spanId: string
  parentSpanId?: string
  startTime: number
  attributes: Record<string, string | number | boolean>
}

// Generate random ID (simplified, production should use crypto)
function generateId(length: number = 16): string {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

// Parse W3C trace context header
function parseTraceParent(header: string | undefined): { traceId: string; parentSpanId: string } | null {
  if (!header) return null
  const parts = header.split('-')
  if (parts.length !== 4) return null
  return {
    traceId: parts[1],
    parentSpanId: parts[2]
  }
}

// Create trace context
function createTraceContext(c: Context): TraceContext {
  const traceParent = parseTraceParent(c.req.header('traceparent'))
  
  return {
    traceId: traceParent?.traceId || generateId(32),
    spanId: generateId(16),
    parentSpanId: traceParent?.parentSpanId,
    startTime: performance.now(),
    attributes: {
      'http.method': c.req.method,
      'http.url': c.req.url,
      'http.route': c.req.path,
      'http.user_agent': c.req.header('user-agent') || 'unknown',
      'http.request_content_length': parseInt(c.req.header('content-length') || '0'),
      'net.peer.ip': c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown',
      'service.name': 'german-select-api',
      'service.version': '1.0.0',
    }
  }
}

// Log trace (in production, send to collector)
function logTrace(trace: TraceContext, statusCode: number, error?: Error): void {
  const duration = performance.now() - trace.startTime
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info',
    trace_id: trace.traceId,
    span_id: trace.spanId,
    parent_span_id: trace.parentSpanId,
    duration_ms: Math.round(duration * 100) / 100,
    status_code: statusCode,
    ...trace.attributes,
    ...(error && { error: error.message, stack: error.stack })
  }
  
  // In production: send to OpenTelemetry collector, Datadog, etc.
  // For now, structured console log
  console.log(JSON.stringify(logEntry))
}

/**
 * Tracing middleware - adds request tracing and timing
 */
export const tracingMiddleware = async (c: Context, next: Next) => {
  const trace = createTraceContext(c)
  
  // Store trace in context for downstream use
  c.set('trace', trace)
  c.set('traceId', trace.traceId)
  c.set('spanId', trace.spanId)
  
  // Add trace headers to response
  c.header('x-trace-id', trace.traceId)
  c.header('x-span-id', trace.spanId)
  
  let statusCode = 200
  let error: Error | undefined
  
  try {
    await next()
    statusCode = c.res.status
  } catch (e) {
    error = e as Error
    statusCode = 500
    throw e
  } finally {
    // Add response attributes
    trace.attributes['http.status_code'] = statusCode
    trace.attributes['http.response_content_length'] = parseInt(c.res.headers.get('content-length') || '0')
    
    logTrace(trace, statusCode, error)
  }
}

/**
 * Request logging middleware - detailed request/response logging
 */
export const requestLogger = async (c: Context, next: Next) => {
  const start = Date.now()
  const method = c.req.method
  const path = c.req.path
  
  // Log request start
  console.log(`--> ${method} ${path}`)
  
  await next()
  
  const duration = Date.now() - start
  const status = c.res.status
  
  // Log request end with timing
  const statusEmoji = status < 300 ? '✅' : status < 400 ? '↩️' : status < 500 ? '⚠️' : '❌'
  console.log(`<-- ${method} ${path} ${statusEmoji} ${status} ${duration}ms`)
}

/**
 * Create a child span for tracking sub-operations
 */
export function createSpan(c: Context, name: string): { spanId: string; end: () => void } {
  const parentTrace = c.get('trace') as TraceContext
  const spanId = generateId(16)
  const startTime = performance.now()
  
  return {
    spanId,
    end: () => {
      const duration = performance.now() - startTime
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'debug',
        trace_id: parentTrace?.traceId,
        span_id: spanId,
        parent_span_id: parentTrace?.spanId,
        span_name: name,
        duration_ms: Math.round(duration * 100) / 100,
      }))
    }
  }
}

// Metrics collection (simple in-memory for demo)
interface Metrics {
  requests: number
  errors: number
  latencySum: number
  latencyCount: number
  statusCodes: Record<number, number>
  endpoints: Record<string, { count: number; latencySum: number }>
}

const metrics: Metrics = {
  requests: 0,
  errors: 0,
  latencySum: 0,
  latencyCount: 0,
  statusCodes: {},
  endpoints: {}
}

/**
 * Metrics collection middleware
 */
export const metricsMiddleware = async (c: Context, next: Next) => {
  const start = performance.now()
  const endpoint = `${c.req.method} ${c.req.path}`
  
  metrics.requests++
  
  try {
    await next()
  } catch (e) {
    metrics.errors++
    throw e
  } finally {
    const duration = performance.now() - start
    const status = c.res.status
    
    metrics.latencySum += duration
    metrics.latencyCount++
    metrics.statusCodes[status] = (metrics.statusCodes[status] || 0) + 1
    
    if (!metrics.endpoints[endpoint]) {
      metrics.endpoints[endpoint] = { count: 0, latencySum: 0 }
    }
    metrics.endpoints[endpoint].count++
    metrics.endpoints[endpoint].latencySum += duration
  }
}

/**
 * Get current metrics snapshot
 */
export function getMetrics() {
  const endpointStats = Object.entries(metrics.endpoints).map(([endpoint, data]) => ({
    endpoint,
    count: data.count,
    avgLatencyMs: Math.round(data.latencySum / data.count * 100) / 100
  })).sort((a, b) => b.count - a.count)
  
  return {
    total_requests: metrics.requests,
    total_errors: metrics.errors,
    error_rate: metrics.requests > 0 ? (metrics.errors / metrics.requests * 100).toFixed(2) + '%' : '0%',
    avg_latency_ms: metrics.latencyCount > 0 ? Math.round(metrics.latencySum / metrics.latencyCount * 100) / 100 : 0,
    status_codes: metrics.statusCodes,
    top_endpoints: endpointStats.slice(0, 10),
    collected_at: new Date().toISOString()
  }
}

/**
 * Reset metrics (for testing or periodic reset)
 */
export function resetMetrics(): void {
  metrics.requests = 0
  metrics.errors = 0
  metrics.latencySum = 0
  metrics.latencyCount = 0
  metrics.statusCodes = {}
  metrics.endpoints = {}
}
