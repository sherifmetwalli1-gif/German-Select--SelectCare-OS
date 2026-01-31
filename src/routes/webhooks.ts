/**
 * Webhook Routes
 * Handle external service webhooks (Stripe, etc.)
 */

import { Hono } from 'hono'
import { logger } from '../utils/logger'
import type { Bindings, Variables } from '../types'

export const webhookRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Stripe webhooks
webhookRoutes.post('/stripe', async (c) => {
  try {
    const signature = c.req.header('stripe-signature')
    const rawBody = await c.req.text()

    // In production, verify webhook signature
    // const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
    // const event = await stripe.verifyWebhookSignature(rawBody, signature)

    const event = JSON.parse(rawBody)
    const eventType = event.type
    const data = event.data?.object

    logger.info('Stripe webhook received', { eventType })

    switch (eventType) {
      case 'payment_intent.succeeded':
        // Payment successful
        // 1. Update booking payment status
        // 2. Confirm booking
        // 3. Send confirmation emails
        // 4. Update doctor/platform revenue
        logger.info('Payment succeeded', { id: data?.id })
        break

      case 'payment_intent.payment_failed':
        // Payment failed
        // 1. Update booking payment status
        // 2. Send failure notification
        // 3. Offer retry options
        logger.warn('Payment failed', { id: data?.id })
        break

      case 'customer.subscription.created':
        // New premium subscription
        // 1. Activate doctor premium status
        // 2. Grant premium features
        // 3. Send welcome email
        logger.info('Subscription created', { id: data?.id })
        break

      case 'customer.subscription.updated':
        // Subscription changed (upgrade/downgrade)
        // 1. Update doctor premium tier
        // 2. Adjust features
        logger.info('Subscription updated', { id: data?.id })
        break

      case 'customer.subscription.deleted':
        // Subscription cancelled
        // 1. Remove premium status
        // 2. Revoke premium features
        // 3. Send cancellation confirmation
        logger.info('Subscription deleted', { id: data?.id })
        break

      case 'invoice.paid':
        // Subscription invoice paid
        // 1. Extend subscription period
        // 2. Send receipt
        logger.info('Invoice paid', { id: data?.id })
        break

      case 'invoice.payment_failed':
        // Subscription payment failed
        // 1. Notify doctor
        // 2. Retry payment
        // 3. Grace period handling
        logger.warn('Invoice payment failed', { id: data?.id })
        break

      case 'charge.refunded':
        // Refund processed
        // 1. Update booking status
        // 2. Adjust revenue records
        // 3. Notify parties
        logger.info('Charge refunded', { id: data?.id })
        break

      case 'checkout.session.completed':
        // Checkout completed
        // 1. Process order
        // 2. Create booking
        // 3. Send confirmations
        logger.info('Checkout completed', { id: data?.id })
        break

      default:
        logger.debug('Unhandled event type', { eventType })
    }

    return c.json({ received: true })
  } catch (error: unknown) {
    logger.error('Stripe webhook error', error)
    return c.json({ error: 'Webhook processing failed' }, 400)
  }
})

// Generic webhook endpoint for testing
webhookRoutes.post('/test', async (c) => {
  try {
    const body = await c.req.json()
    
    logger.debug('Test webhook received', body)

    return c.json({
      success: true,
      message: 'Webhook received',
      data: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    return c.json({ success: false, error: 'Invalid webhook data' }, 400)
  }
})

// Email service webhooks (SendGrid, Mailgun, etc.)
webhookRoutes.post('/email', async (c) => {
  try {
    const body = await c.req.json()
    const events = Array.isArray(body) ? body : [body]

    for (const event of events) {
      switch (event.event || event.type) {
        case 'delivered':
          logger.debug('Email delivered:', event.email || event.recipient)
          break
        case 'opened':
          logger.debug('Email opened:', event.email || event.recipient)
          break
        case 'clicked':
          logger.debug('Email link clicked:', event.url)
          break
        case 'bounced':
        case 'bounce':
          // Handle bounced emails
          // Mark email as invalid
          logger.debug('Email bounced:', event.email || event.recipient)
          break
        case 'spam':
        case 'complained':
          // Handle spam complaints
          // Unsubscribe user
          logger.debug('Spam complaint:', event.email || event.recipient)
          break
        case 'unsubscribed':
          // Update user preferences
          logger.debug('User unsubscribed:', event.email || event.recipient)
          break
        default:
          logger.debug('Email event:', event.event || event.type)
      }
    }

    return c.json({ received: true })
  } catch (error: any) {
    logger.error('Email webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// SMS service webhooks (Twilio, etc.)
webhookRoutes.post('/sms', async (c) => {
  try {
    const body = await c.req.json()

    const status = body.MessageStatus || body.status
    const to = body.To || body.to
    const messageId = body.MessageSid || body.message_id

    logger.debug(`SMS ${status}: ${to} (${messageId})`)

    switch (status) {
      case 'delivered':
        // SMS delivered successfully
        break
      case 'failed':
      case 'undelivered':
        // SMS failed
        // Retry or notify
        break
      case 'received':
        // Incoming SMS
        // Process reply
        break
    }

    return c.json({ received: true })
  } catch (error: any) {
    logger.error('SMS webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Calendar sync webhooks (Google Calendar, etc.)
webhookRoutes.post('/calendar', async (c) => {
  try {
    const body = await c.req.json()

    logger.debug('Calendar webhook:', body)

    // Handle calendar events
    // - Appointment updates
    // - Availability changes
    // - Cancellations

    return c.json({ received: true })
  } catch (error: any) {
    logger.error('Calendar webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Video platform webhooks (Zoom, etc.)
webhookRoutes.post('/video', async (c) => {
  try {
    const body = await c.req.json()
    const event = body.event

    logger.debug('Video platform webhook:', event)

    switch (event) {
      case 'meeting.started':
        // Update booking status to 'in_progress'
        break
      case 'meeting.ended':
        // Update booking status to 'completed'
        // Trigger post-consultation actions
        break
      case 'meeting.participant_joined':
        // Track attendance
        break
      case 'recording.completed':
        // Store recording URL
        break
    }

    return c.json({ received: true })
  } catch (error: any) {
    logger.error('Video webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Health check for webhook endpoint
webhookRoutes.get('/health', async (c) => {
  return c.json({
    success: true,
    status: 'Webhook endpoints operational',
    endpoints: [
      'POST /api/webhooks/stripe',
      'POST /api/webhooks/email',
      'POST /api/webhooks/sms',
      'POST /api/webhooks/calendar',
      'POST /api/webhooks/video',
      'POST /api/webhooks/test',
    ],
    timestamp: new Date().toISOString(),
  })
})
