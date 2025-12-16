/**
 * Webhook Routes
 * Handle external service webhooks (Stripe, etc.)
 */

import { Hono } from 'hono'
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

    console.log(`Stripe webhook received: ${eventType}`)

    switch (eventType) {
      case 'payment_intent.succeeded':
        // Payment successful
        // 1. Update booking payment status
        // 2. Confirm booking
        // 3. Send confirmation emails
        // 4. Update doctor/platform revenue
        console.log('Payment succeeded:', data?.id)
        break

      case 'payment_intent.payment_failed':
        // Payment failed
        // 1. Update booking payment status
        // 2. Send failure notification
        // 3. Offer retry options
        console.log('Payment failed:', data?.id)
        break

      case 'customer.subscription.created':
        // New premium subscription
        // 1. Activate doctor premium status
        // 2. Grant premium features
        // 3. Send welcome email
        console.log('Subscription created:', data?.id)
        break

      case 'customer.subscription.updated':
        // Subscription changed (upgrade/downgrade)
        // 1. Update doctor premium tier
        // 2. Adjust features
        console.log('Subscription updated:', data?.id)
        break

      case 'customer.subscription.deleted':
        // Subscription cancelled
        // 1. Remove premium status
        // 2. Revoke premium features
        // 3. Send cancellation confirmation
        console.log('Subscription deleted:', data?.id)
        break

      case 'invoice.paid':
        // Subscription invoice paid
        // 1. Extend subscription period
        // 2. Send receipt
        console.log('Invoice paid:', data?.id)
        break

      case 'invoice.payment_failed':
        // Subscription payment failed
        // 1. Notify doctor
        // 2. Retry payment
        // 3. Grace period handling
        console.log('Invoice payment failed:', data?.id)
        break

      case 'charge.refunded':
        // Refund processed
        // 1. Update booking status
        // 2. Adjust revenue records
        // 3. Notify parties
        console.log('Charge refunded:', data?.id)
        break

      case 'checkout.session.completed':
        // Checkout completed
        // 1. Process order
        // 2. Create booking
        // 3. Send confirmations
        console.log('Checkout completed:', data?.id)
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return c.json({ received: true })
  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Generic webhook endpoint for testing
webhookRoutes.post('/test', async (c) => {
  try {
    const body = await c.req.json()
    
    console.log('Test webhook received:', JSON.stringify(body, null, 2))

    return c.json({
      success: true,
      message: 'Webhook received',
      data: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 400)
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
          console.log('Email delivered:', event.email || event.recipient)
          break
        case 'opened':
          console.log('Email opened:', event.email || event.recipient)
          break
        case 'clicked':
          console.log('Email link clicked:', event.url)
          break
        case 'bounced':
        case 'bounce':
          // Handle bounced emails
          // Mark email as invalid
          console.log('Email bounced:', event.email || event.recipient)
          break
        case 'spam':
        case 'complained':
          // Handle spam complaints
          // Unsubscribe user
          console.log('Spam complaint:', event.email || event.recipient)
          break
        case 'unsubscribed':
          // Update user preferences
          console.log('User unsubscribed:', event.email || event.recipient)
          break
        default:
          console.log('Email event:', event.event || event.type)
      }
    }

    return c.json({ received: true })
  } catch (error: any) {
    console.error('Email webhook error:', error)
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

    console.log(`SMS ${status}: ${to} (${messageId})`)

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
    console.error('SMS webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Calendar sync webhooks (Google Calendar, etc.)
webhookRoutes.post('/calendar', async (c) => {
  try {
    const body = await c.req.json()

    console.log('Calendar webhook:', body)

    // Handle calendar events
    // - Appointment updates
    // - Availability changes
    // - Cancellations

    return c.json({ received: true })
  } catch (error: any) {
    console.error('Calendar webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

// Video platform webhooks (Zoom, etc.)
webhookRoutes.post('/video', async (c) => {
  try {
    const body = await c.req.json()
    const event = body.event

    console.log('Video platform webhook:', event)

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
    console.error('Video webhook error:', error)
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
