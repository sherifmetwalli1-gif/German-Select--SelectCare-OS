/**
 * Subscription Routes
 * Premium doctor listing subscriptions
 */

import { Hono } from 'hono'
import { logger } from '../utils/logger'
import { createStripeService } from '../services/stripe'
import { PREMIUM_TIERS, PremiumTier } from '../types'
import type { Bindings, Variables } from '../types'

export const subscriptionRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Get premium tier pricing
subscriptionRoutes.get('/tiers', async (c) => {
  const currency = c.req.query('currency') || 'EUR'
  
  const exchangeRates: Record<string, number> = {
    EUR: 1, USD: 1.08, GBP: 0.86, CHF: 0.94, AED: 3.97,
  }
  const rate = exchangeRates[currency] || 1

  const tiers = Object.entries(PREMIUM_TIERS).map(([key, tier]) => ({
    id: key,
    name: tier.name,
    pricing: {
      monthly: Math.round(tier.monthlyPrice * rate * 100) / 100,
      yearly: Math.round(tier.yearlyPrice * rate * 100) / 100,
      yearlySavings: Math.round((tier.monthlyPrice * 12 - tier.yearlyPrice) * rate * 100) / 100,
      currency,
    },
    features: tier.features,
    benefits: {
      listingBoost: `${tier.listingBoost}x visibility`,
      commissionDiscount: tier.commissionDiscount > 0 ? `${tier.commissionDiscount}% commission discount` : null,
    },
    recommended: key === 'professional',
  }))

  return c.json({
    success: true,
    data: tiers,
    timestamp: new Date().toISOString(),
  })
})

// Get current subscription for doctor
subscriptionRoutes.get('/current', async (c) => {
  const doctorId = c.req.query('doctorId')

  if (!doctorId) {
    return c.json({ success: false, error: 'doctorId is required' }, 400)
  }

  // Mock subscription data
  const mockSubscription = {
    id: 'sub_' + crypto.randomUUID().substring(0, 8),
    doctorId,
    tier: 'professional' as PremiumTier,
    status: 'active',
    amount: 399,
    currency: 'EUR',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
    features: PREMIUM_TIERS.professional.features,
    usage: {
      featuredListings: 3,
      prioritySupport: true,
      analyticsAccess: true,
      leadAccess: 47,
      customBranding: false,
    },
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  }

  return c.json({
    success: true,
    data: mockSubscription,
    timestamp: new Date().toISOString(),
  })
})

// Create new subscription
subscriptionRoutes.post('/create', async (c) => {
  try {
    const body = await c.req.json()
    const {
      doctorId,
      doctorEmail,
      doctorName,
      tier,
      interval = 'monthly',
      currency = 'EUR',
    } = body

    if (!doctorId || !tier) {
      return c.json({ 
        success: false, 
        error: 'doctorId and tier are required' 
      }, 400)
    }

    if (!['basic', 'professional', 'enterprise'].includes(tier)) {
      return c.json({ 
        success: false, 
        error: 'Invalid tier. Must be: basic, professional, or enterprise' 
      }, 400)
    }

    const tierConfig = PREMIUM_TIERS[tier as PremiumTier]
    const amount = interval === 'yearly' ? tierConfig.yearlyPrice : tierConfig.monthlyPrice

    const subscriptionId = `sub_${crypto.randomUUID().substring(0, 8)}`
    const now = new Date()
    const periodEnd = new Date(now)
    if (interval === 'yearly') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1)
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1)
    }

    // Create Stripe checkout session for subscription
    let checkoutUrl = null
    if (c.env.STRIPE_SECRET_KEY) {
      const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
      
      // In production, you'd create/use Stripe Products and Prices
      const session = await stripe.createCheckoutSession({
        customerEmail: doctorEmail,
        lineItems: [{
          name: `German Select ${tierConfig.name} - ${interval === 'yearly' ? 'Annual' : 'Monthly'}`,
          description: tierConfig.features.slice(0, 3).join(', '),
          amount,
          currency,
          quantity: 1,
        }],
        mode: 'subscription',
        successUrl: `${c.req.url.split('/api')[0]}/subscription/success?subscriptionId=${subscriptionId}`,
        cancelUrl: `${c.req.url.split('/api')[0]}/subscription/cancelled`,
        metadata: {
          subscriptionId,
          doctorId,
          tier,
          interval,
        },
      })
      checkoutUrl = session.url
    }

    return c.json({
      success: true,
      data: {
        subscriptionId,
        tier,
        tierName: tierConfig.name,
        amount,
        currency,
        interval,
        features: tierConfig.features,
        periodStart: now.toISOString(),
        periodEnd: periodEnd.toISOString(),
        checkoutUrl,
        status: checkoutUrl ? 'pending_payment' : 'demo_active',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    logger.error('Subscription creation error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Upgrade/downgrade subscription
subscriptionRoutes.post('/change-tier', async (c) => {
  try {
    const body = await c.req.json()
    const { subscriptionId, newTier, immediate = false } = body

    if (!subscriptionId || !newTier) {
      return c.json({ 
        success: false, 
        error: 'subscriptionId and newTier are required' 
      }, 400)
    }

    const tierConfig = PREMIUM_TIERS[newTier as PremiumTier]
    if (!tierConfig) {
      return c.json({ success: false, error: 'Invalid tier' }, 400)
    }

    // Calculate proration
    const currentAmount = 399 // Mock current amount
    const newAmount = tierConfig.monthlyPrice
    const daysRemaining = 15 // Mock days remaining
    const proratedAmount = Math.round((newAmount - currentAmount) * (daysRemaining / 30) * 100) / 100

    return c.json({
      success: true,
      data: {
        subscriptionId,
        previousTier: 'professional',
        newTier,
        newTierName: tierConfig.name,
        proration: {
          amount: proratedAmount,
          currency: 'EUR',
          appliedImmediately: immediate,
        },
        effectiveDate: immediate ? new Date().toISOString() : 'next_billing_cycle',
        newFeatures: tierConfig.features,
      },
      message: immediate 
        ? 'Subscription updated immediately with prorated charge'
        : 'Subscription will update at next billing cycle',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Cancel subscription
subscriptionRoutes.post('/cancel', async (c) => {
  try {
    const body = await c.req.json()
    const { subscriptionId, reason, cancelImmediately = false } = body

    if (!subscriptionId) {
      return c.json({ success: false, error: 'subscriptionId is required' }, 400)
    }

    const periodEnd = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)

    return c.json({
      success: true,
      data: {
        subscriptionId,
        status: cancelImmediately ? 'cancelled' : 'active',
        cancelAtPeriodEnd: !cancelImmediately,
        accessUntil: cancelImmediately ? new Date().toISOString() : periodEnd.toISOString(),
        reason,
        refund: cancelImmediately ? {
          eligible: true,
          amount: 199.50, // Prorated refund
          currency: 'EUR',
        } : null,
      },
      message: cancelImmediately 
        ? 'Subscription cancelled immediately'
        : `Subscription will remain active until ${periodEnd.toDateString()}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Reactivate cancelled subscription
subscriptionRoutes.post('/reactivate', async (c) => {
  try {
    const body = await c.req.json()
    const { subscriptionId } = body

    if (!subscriptionId) {
      return c.json({ success: false, error: 'subscriptionId is required' }, 400)
    }

    return c.json({
      success: true,
      data: {
        subscriptionId,
        status: 'active',
        cancelAtPeriodEnd: false,
        message: 'Subscription reactivated successfully',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get subscription history
subscriptionRoutes.get('/history', async (c) => {
  const doctorId = c.req.query('doctorId')

  const history = [
    {
      id: 'sub_001',
      tier: 'basic',
      amount: 199,
      currency: 'EUR',
      interval: 'monthly',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
    },
    {
      id: 'sub_002',
      tier: 'professional',
      amount: 399,
      currency: 'EUR',
      interval: 'monthly',
      status: 'active',
      startDate: '2024-02-01',
      endDate: null,
    },
  ]

  return c.json({
    success: true,
    data: history,
    timestamp: new Date().toISOString(),
  })
})

// Get subscription benefits/ROI
subscriptionRoutes.get('/benefits', async (c) => {
  const doctorId = c.req.query('doctorId')

  // Mock ROI calculation
  const benefits = {
    subscriptionCost: 399,
    period: 'last_month',
    metrics: {
      additionalBookings: 12,
      averageBookingValue: 175,
      additionalRevenue: 2100,
      leadGeneration: 47,
      convertedLeads: 8,
      profileViews: 1234,
      searchImpressions: 5678,
    },
    roi: {
      revenue: 2100,
      cost: 399,
      netGain: 1701,
      percentage: 426.3,
    },
    comparison: {
      bookingsVsNonPremium: '+340%',
      visibilityBoost: '2.5x',
      leadQuality: '+45%',
    },
  }

  return c.json({
    success: true,
    data: benefits,
    timestamp: new Date().toISOString(),
  })
})

// Premium features usage
subscriptionRoutes.get('/usage', async (c) => {
  const doctorId = c.req.query('doctorId')

  const usage = {
    period: 'current_billing_cycle',
    features: [
      {
        name: 'Featured Listings',
        limit: 5,
        used: 3,
        remaining: 2,
      },
      {
        name: 'Lead Access',
        limit: 'unlimited',
        used: 47,
        remaining: 'unlimited',
      },
      {
        name: 'Analytics Dashboard',
        enabled: true,
        lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        name: 'Priority Support',
        enabled: true,
        ticketsOpened: 2,
        averageResponseTime: '2h 15m',
      },
      {
        name: 'Video Profile',
        enabled: true,
        views: 234,
      },
    ],
  }

  return c.json({
    success: true,
    data: usage,
    timestamp: new Date().toISOString(),
  })
})
