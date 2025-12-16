/**
 * Payment Routes
 * Stripe payment processing and management
 */

import { Hono } from 'hono'
import { createStripeService } from '../services/stripe'
import type { Bindings, Variables, Currency } from '../types'

export const paymentRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Create payment intent for consultation/booking
paymentRoutes.post('/create-intent', async (c) => {
  try {
    const body = await c.req.json()
    const {
      amount,
      currency = 'EUR',
      bookingId,
      doctorId,
      packageId,
      patientEmail,
      description,
      metadata = {},
    } = body

    if (!amount || amount <= 0) {
      return c.json({ success: false, error: 'Valid amount is required' }, 400)
    }

    if (!c.env.STRIPE_SECRET_KEY) {
      // Demo mode without Stripe
      return c.json({
        success: true,
        data: {
          mode: 'demo',
          message: 'Stripe not configured. Demo payment intent created.',
          paymentIntent: {
            id: `pi_demo_${crypto.randomUUID().substring(0, 8)}`,
            client_secret: 'demo_secret_' + crypto.randomUUID(),
            amount,
            currency,
            status: 'requires_payment_method',
          },
        },
        timestamp: new Date().toISOString(),
      })
    }

    const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
    
    const paymentIntent = await stripe.createPaymentIntent({
      amount,
      currency: currency as Currency,
      metadata: {
        ...metadata,
        bookingId: bookingId || '',
        doctorId: doctorId || '',
        packageId: packageId || '',
        source: 'german_select_platform',
      },
      description: description || 'German Select Medical Services',
      receiptEmail: patientEmail,
    })

    return c.json({
      success: true,
      data: {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency.toUpperCase(),
        status: paymentIntent.status,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Payment intent creation error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get payment status
paymentRoutes.get('/status/:paymentIntentId', async (c) => {
  try {
    const paymentIntentId = c.req.param('paymentIntentId')

    if (!c.env.STRIPE_SECRET_KEY) {
      return c.json({
        success: true,
        data: {
          mode: 'demo',
          paymentIntentId,
          status: 'succeeded',
          amount: 150,
          currency: 'EUR',
        },
        timestamp: new Date().toISOString(),
      })
    }

    const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
    const paymentIntent = await stripe.getPaymentIntent(paymentIntentId)

    return c.json({
      success: true,
      data: {
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        metadata: paymentIntent.metadata,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Process refund
paymentRoutes.post('/refund', async (c) => {
  try {
    const body = await c.req.json()
    const { paymentIntentId, amount, reason, bookingId } = body

    if (!paymentIntentId) {
      return c.json({ success: false, error: 'paymentIntentId is required' }, 400)
    }

    if (!c.env.STRIPE_SECRET_KEY) {
      return c.json({
        success: true,
        data: {
          mode: 'demo',
          refundId: `re_demo_${crypto.randomUUID().substring(0, 8)}`,
          paymentIntentId,
          amount: amount || 150,
          status: 'succeeded',
        },
        timestamp: new Date().toISOString(),
      })
    }

    const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
    
    const refund = await stripe.createRefund({
      paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents if partial
      reason: reason || 'requested_by_customer',
      metadata: {
        bookingId: bookingId || '',
        processedAt: new Date().toISOString(),
      },
    })

    return c.json({
      success: true,
      data: {
        refundId: refund.id,
        paymentIntentId,
        amount: refund.amount / 100,
        currency: refund.currency.toUpperCase(),
        status: refund.status,
      },
      message: 'Refund processed successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get payment history
paymentRoutes.get('/history', async (c) => {
  try {
    const userId = c.req.query('userId')
    const status = c.req.query('status')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = parseInt(c.req.query('offset') || '0')

    // Mock payment history
    const payments = [
      {
        id: 'pay_001',
        type: 'consultation',
        amount: 200,
        currency: 'EUR',
        status: 'captured',
        description: 'Consultation with Dr. Schmidt',
        bookingId: 'booking_001',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        receiptUrl: 'https://receipt.stripe.com/demo',
      },
      {
        id: 'pay_002',
        type: 'consultation',
        amount: 250,
        currency: 'EUR',
        status: 'pending',
        description: 'Consultation with Prof. Dr. Richter',
        bookingId: 'booking_002',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'pay_003',
        type: 'package',
        amount: 3375,
        currency: 'EUR',
        status: 'captured',
        description: 'SurgeryBridge Package - Deposit',
        bookingId: 'booking_003',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        receiptUrl: 'https://receipt.stripe.com/demo2',
      },
    ]

    let filtered = payments
    if (status) {
      filtered = filtered.filter(p => p.status === status)
    }

    return c.json({
      success: true,
      data: filtered.slice(offset, offset + limit),
      meta: {
        total: filtered.length,
        page: Math.floor(offset / limit) + 1,
        limit,
      },
      summary: {
        totalPaid: 3575,
        totalPending: 250,
        currency: 'EUR',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get supported currencies
paymentRoutes.get('/currencies', async (c) => {
  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.0 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.08 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.86 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.94 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 3.97 },
  ]

  return c.json({
    success: true,
    data: currencies,
    baseCurrency: 'EUR',
    lastUpdated: new Date().toISOString(),
    timestamp: new Date().toISOString(),
  })
})

// Convert currency
paymentRoutes.get('/convert', async (c) => {
  const amount = parseFloat(c.req.query('amount') || '0')
  const from = c.req.query('from') || 'EUR'
  const to = c.req.query('to') || 'USD'

  const rates: Record<string, number> = {
    EUR: 1.0,
    USD: 1.08,
    GBP: 0.86,
    CHF: 0.94,
    AED: 3.97,
  }

  if (!rates[from] || !rates[to]) {
    return c.json({ success: false, error: 'Unsupported currency' }, 400)
  }

  // Convert to EUR first, then to target currency
  const amountInEur = amount / rates[from]
  const convertedAmount = Math.round(amountInEur * rates[to] * 100) / 100

  return c.json({
    success: true,
    data: {
      originalAmount: amount,
      originalCurrency: from,
      convertedAmount,
      targetCurrency: to,
      exchangeRate: rates[to] / rates[from],
    },
    timestamp: new Date().toISOString(),
  })
})

// Payment methods
paymentRoutes.get('/methods', async (c) => {
  const methods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icons: ['visa', 'mastercard', 'amex'],
      enabled: true,
    },
    {
      id: 'sepa',
      name: 'SEPA Direct Debit',
      description: 'Bank transfer for EU customers',
      icons: ['bank'],
      enabled: true,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icons: ['paypal'],
      enabled: false,
      comingSoon: true,
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      description: 'Quick checkout with Apple Pay',
      icons: ['apple'],
      enabled: false,
      comingSoon: true,
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      description: 'Quick checkout with Google Pay',
      icons: ['google'],
      enabled: false,
      comingSoon: true,
    },
  ]

  return c.json({
    success: true,
    data: methods.filter(m => m.enabled || m.comingSoon),
    timestamp: new Date().toISOString(),
  })
})

// Generate invoice
paymentRoutes.post('/invoice', async (c) => {
  try {
    const body = await c.req.json()
    const { bookingId, paymentId, patientDetails } = body

    const invoiceId = `INV-${Date.now()}-${crypto.randomUUID().substring(0, 4).toUpperCase()}`

    // Mock invoice generation
    const invoice = {
      id: invoiceId,
      bookingId,
      paymentId,
      patient: patientDetails,
      items: [
        {
          description: 'Medical Consultation',
          quantity: 1,
          unitPrice: 200,
          total: 200,
        },
      ],
      subtotal: 200,
      tax: 0, // Medical services often exempt
      total: 200,
      currency: 'EUR',
      status: 'issued',
      issuedAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      pdfUrl: `/api/payments/invoice/${invoiceId}/pdf`,
    }

    return c.json({
      success: true,
      data: invoice,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Platform revenue summary (admin)
paymentRoutes.get('/revenue/summary', async (c) => {
  try {
    // Mock revenue data
    const summary = {
      period: 'last_30_days',
      totalRevenue: 186543,
      platformFees: 32645,
      doctorPayouts: 124320,
      affiliateCommissions: 4578,
      netRevenue: 28067,
      currency: 'EUR',
      breakdown: {
        consultations: {
          count: 487,
          revenue: 97400,
          fees: 19480,
        },
        packages: {
          count: 23,
          revenue: 89143,
          fees: 13165,
        },
        subscriptions: {
          count: 7,
          revenue: 2793,
          fees: 0,
        },
      },
      growth: {
        revenue: 23.5,
        bookings: 18.2,
        averageOrder: 4.3,
      },
      topDoctors: [
        { id: 'dr_bariatric_antireflux', name: 'Dr. Schmidt', revenue: 34500 },
        { id: 'dr_cardiology', name: 'Prof. Richter', revenue: 28750 },
        { id: 'dr_post_bariatric', name: 'Dr. Weber', revenue: 22500 },
      ],
    }

    return c.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
