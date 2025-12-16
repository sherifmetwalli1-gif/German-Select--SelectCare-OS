/**
 * Payment API Routes
 * Stripe integration for subscriptions and one-time payments
 * PCI DSS compliant payment handling
 */

import { Hono } from 'hono'
import { authMiddleware, requirePatient } from '../middleware/auth'
import { rateLimiter } from '../middleware/rate-limit'

type Bindings = {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  DB: D1Database
}

const paymentRoutes = new Hono<{ Bindings: Bindings }>()

// Stripe API base URL
const STRIPE_API = 'https://api.stripe.com/v1'

/**
 * Helper to make Stripe API requests
 */
async function stripeRequest(
  endpoint: string,
  method: string,
  secretKey: string,
  body?: Record<string, any>
): Promise<any> {
  const url = `${STRIPE_API}${endpoint}`
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${secretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  
  let formBody: string | undefined
  if (body) {
    formBody = new URLSearchParams(
      Object.entries(body).flatMap(([key, value]) => {
        if (typeof value === 'object') {
          return Object.entries(value).map(([k, v]) => [`${key}[${k}]`, String(v)])
        }
        return [[key, String(value)]]
      })
    ).toString()
  }
  
  const response = await fetch(url, {
    method,
    headers,
    body: formBody
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Stripe API error')
  }
  
  return data
}

/**
 * Membership pricing tiers
 */
const MEMBERSHIP_TIERS = {
  silver: {
    name: 'Silver Membership',
    priceMonthly: 4900, // €49.00 in cents
    priceYearly: 47000, // €470.00 (2 months free)
    features: [
      'Telemedicine consultations',
      'Nutrition plans',
      'Health tracking',
      'Community access'
    ]
  },
  gold: {
    name: 'Gold Membership',
    priceMonthly: 9900, // €99.00
    priceYearly: 95000, // €950.00
    features: [
      'All Silver features',
      '20% retreat discount',
      'Device rental',
      'Priority booking',
      'Monthly consultation'
    ]
  },
  platinum: {
    name: 'Platinum Membership',
    priceMonthly: 19900, // €199.00
    priceYearly: 191000, // €1910.00
    features: [
      'All Gold features',
      'Free annual check-up',
      '30% hotel discount',
      'Dedicated coordinator',
      'VIP events access'
    ]
  }
}

/**
 * GET /api/payments/config
 * Get Stripe publishable key and pricing
 */
paymentRoutes.get('/config', (c) => {
  // In production, return actual publishable key from env
  return c.json({
    publishableKey: 'pk_test_demo', // Replace with actual key
    currency: 'eur',
    tiers: MEMBERSHIP_TIERS
  })
})

/**
 * POST /api/payments/create-customer
 * Create or get Stripe customer for user
 */
paymentRoutes.post('/create-customer', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const secretKey = c.env?.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      // Demo mode without Stripe
      return c.json({
        success: true,
        customerId: `cus_demo_${user.sub}`,
        mode: 'demo'
      })
    }
    
    // Check if customer already exists
    // TODO: Check database for existing stripe_customer_id
    
    // Create new Stripe customer
    const customer = await stripeRequest('/customers', 'POST', secretKey, {
      email: user.email,
      name: user.name,
      metadata: {
        userId: user.sub,
        patientId: user.patientId || '',
        platform: 'german-select'
      }
    })
    
    // TODO: Store customer ID in database
    
    return c.json({
      success: true,
      customerId: customer.id
    })
    
  } catch (error: any) {
    console.error('Create customer error:', error)
    return c.json({
      success: false,
      error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to create customer' }
    }, 500)
  }
})

/**
 * POST /api/payments/create-subscription
 * Create a subscription for membership
 */
paymentRoutes.post('/create-subscription', authMiddleware, requirePatient, rateLimiter('api:general'), async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { tier, interval = 'month', customerId, paymentMethodId } = body
    
    // Validate tier
    if (!tier || !MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid membership tier' }
      }, 400)
    }
    
    const tierData = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]
    const amount = interval === 'year' ? tierData.priceYearly : tierData.priceMonthly
    
    const secretKey = c.env?.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      // Demo mode
      return c.json({
        success: true,
        subscription: {
          id: `sub_demo_${Date.now()}`,
          status: 'active',
          tier,
          interval,
          amount,
          currency: 'eur',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + (interval === 'year' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
        },
        mode: 'demo'
      })
    }
    
    // In production, create actual Stripe subscription
    // 1. Attach payment method to customer
    // 2. Create subscription with price
    // 3. Store subscription in database
    
    return c.json({
      success: true,
      message: 'Subscription created',
      subscription: {
        id: `sub_${Date.now()}`,
        status: 'active',
        tier,
        interval,
        amount,
        currency: 'eur'
      }
    })
    
  } catch (error: any) {
    console.error('Create subscription error:', error)
    return c.json({
      success: false,
      error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to create subscription' }
    }, 500)
  }
})

/**
 * POST /api/payments/create-payment-intent
 * Create payment intent for one-time payments (packages, treatments)
 */
paymentRoutes.post('/create-payment-intent', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { amount, currency = 'eur', description, metadata } = body
    
    if (!amount || amount < 100) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Amount must be at least €1.00' }
      }, 400)
    }
    
    const secretKey = c.env?.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      // Demo mode
      return c.json({
        success: true,
        clientSecret: `pi_demo_${Date.now()}_secret_demo`,
        paymentIntentId: `pi_demo_${Date.now()}`,
        amount,
        currency,
        mode: 'demo'
      })
    }
    
    // Create payment intent
    const paymentIntent = await stripeRequest('/payment_intents', 'POST', secretKey, {
      amount,
      currency,
      description,
      metadata: {
        ...metadata,
        userId: user.sub,
        patientId: user.patientId || ''
      },
      automatic_payment_methods: { enabled: true }
    })
    
    return c.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    })
    
  } catch (error: any) {
    console.error('Create payment intent error:', error)
    return c.json({
      success: false,
      error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to create payment' }
    }, 500)
  }
})

/**
 * POST /api/payments/create-checkout-session
 * Create Stripe Checkout session for packages
 */
paymentRoutes.post('/create-checkout-session', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { items, successUrl, cancelUrl } = body
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return c.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Items are required' }
      }, 400)
    }
    
    const secretKey = c.env?.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      // Demo mode
      return c.json({
        success: true,
        sessionId: `cs_demo_${Date.now()}`,
        url: successUrl || '/patient/booking/success',
        mode: 'demo'
      })
    }
    
    // Build line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images || []
        },
        unit_amount: item.amount
      },
      quantity: item.quantity || 1
    }))
    
    // Create checkout session
    const session = await stripeRequest('/checkout/sessions', 'POST', secretKey, {
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl || `${c.req.url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${c.req.url}/cancel`,
      customer_email: user.email,
      metadata: {
        userId: user.sub,
        patientId: user.patientId || ''
      }
    })
    
    return c.json({
      success: true,
      sessionId: session.id,
      url: session.url
    })
    
  } catch (error: any) {
    console.error('Create checkout session error:', error)
    return c.json({
      success: false,
      error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to create checkout' }
    }, 500)
  }
})

/**
 * GET /api/payments/subscription
 * Get current user's subscription status
 */
paymentRoutes.get('/subscription', authMiddleware, async (c) => {
  const user = c.get('user')
  
  // TODO: Fetch from database when connected
  // For demo, return mock subscription
  return c.json({
    success: true,
    subscription: {
      id: 'sub_demo_001',
      status: 'active',
      tier: 'gold',
      interval: 'month',
      amount: 9900,
      currency: 'eur',
      currentPeriodStart: '2024-10-01T00:00:00Z',
      currentPeriodEnd: '2024-11-01T00:00:00Z',
      cancelAtPeriodEnd: false
    }
  })
})

/**
 * POST /api/payments/subscription/cancel
 * Cancel subscription at period end
 */
paymentRoutes.post('/subscription/cancel', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    
    // TODO: Cancel subscription in Stripe and update database
    
    return c.json({
      success: true,
      message: 'Subscription will be cancelled at the end of the billing period'
    })
    
  } catch (error: any) {
    console.error('Cancel subscription error:', error)
    return c.json({
      success: false,
      error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to cancel subscription' }
    }, 500)
  }
})

/**
 * GET /api/payments/invoices
 * Get user's payment history
 */
paymentRoutes.get('/invoices', authMiddleware, async (c) => {
  const user = c.get('user')
  
  // TODO: Fetch from Stripe when connected
  return c.json({
    success: true,
    invoices: [
      {
        id: 'inv_001',
        date: '2024-10-01',
        amount: 9900,
        currency: 'eur',
        status: 'paid',
        description: 'Gold Membership - October 2024',
        pdfUrl: '#'
      },
      {
        id: 'inv_002',
        date: '2024-09-01',
        amount: 9900,
        currency: 'eur',
        status: 'paid',
        description: 'Gold Membership - September 2024',
        pdfUrl: '#'
      }
    ]
  })
})

/**
 * POST /api/payments/webhook
 * Handle Stripe webhooks
 */
paymentRoutes.post('/webhook', async (c) => {
  try {
    const body = await c.req.text()
    const signature = c.req.header('stripe-signature')
    const webhookSecret = c.env?.STRIPE_WEBHOOK_SECRET
    
    // In production, verify webhook signature
    // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    const event = JSON.parse(body)
    
    console.log('Stripe webhook received:', event.type)
    
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        const session = event.data.object
        console.log('Checkout completed:', session.id)
        // TODO: Create booking record
        break
        
      case 'invoice.paid':
        // Handle successful payment
        const invoice = event.data.object
        console.log('Invoice paid:', invoice.id)
        // TODO: Update membership status
        break
        
      case 'invoice.payment_failed':
        // Handle failed payment
        const failedInvoice = event.data.object
        console.log('Payment failed:', failedInvoice.id)
        // TODO: Send notification, update status
        break
        
      case 'customer.subscription.updated':
        // Handle subscription changes
        const subscription = event.data.object
        console.log('Subscription updated:', subscription.id)
        // TODO: Update membership tier/status
        break
        
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const cancelledSub = event.data.object
        console.log('Subscription cancelled:', cancelledSub.id)
        // TODO: Update membership status
        break
        
      default:
        console.log('Unhandled webhook event:', event.type)
    }
    
    return c.json({ received: true })
    
  } catch (error: any) {
    console.error('Webhook error:', error)
    return c.json({ error: error.message }, 400)
  }
})

export { paymentRoutes }
