/**
 * SelectCareOS™ Payment & Subscription Routes
 * Stripe Integration for Monetization
 */

import { Hono } from 'hono';

const payments = new Hono();

// ============================================================================
// STRIPE CONFIGURATION (Demo Mode - Replace with real keys in production)
// ============================================================================

const STRIPE_PRICES = {
  basic: {
    monthly: 'price_basic_monthly_2900',
    annual: 'price_basic_annual_29000',
    amount: 2900, // €29.00
    annualAmount: 29000, // €290.00
  },
  plus: {
    monthly: 'price_plus_monthly_7900',
    annual: 'price_plus_annual_79000',
    amount: 7900, // €79.00
    annualAmount: 79000, // €790.00
  },
  elite: {
    monthly: 'price_elite_monthly_19900',
    annual: 'price_elite_annual_199000',
    amount: 19900, // €199.00
    annualAmount: 199000, // €1,990.00
  },
};

// ============================================================================
// SUBSCRIPTION ENDPOINTS
// ============================================================================

/**
 * Create checkout session for new subscription
 * POST /api/payments/create-checkout
 */
payments.post('/create-checkout', async (c) => {
  try {
    const { tier, interval, userId, returnUrl } = await c.req.json();
    
    if (!tier || !['basic', 'plus', 'elite'].includes(tier)) {
      return c.json({ success: false, error: 'Invalid subscription tier' }, 400);
    }
    
    if (!interval || !['monthly', 'annual'].includes(interval)) {
      return c.json({ success: false, error: 'Invalid billing interval' }, 400);
    }
    
    const priceConfig = STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES];
    const priceId = interval === 'annual' ? priceConfig.annual : priceConfig.monthly;
    
    // In production, this would create a real Stripe checkout session
    // For demo, we return a mock session
    const sessionId = `cs_demo_${Date.now()}_${tier}_${interval}`;
    
    return c.json({
      success: true,
      sessionId,
      url: `${returnUrl || '/subscription'}?session=${sessionId}&tier=${tier}&interval=${interval}`,
      message: 'Demo mode: In production, this redirects to Stripe Checkout',
      pricing: {
        tier,
        interval,
        amount: interval === 'annual' ? priceConfig.annualAmount : priceConfig.amount,
        currency: 'eur',
        savings: interval === 'annual' ? Math.round(priceConfig.amount * 12 * 0.2) : 0,
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create checkout session' }, 500);
  }
});

/**
 * Get subscription status for user
 * GET /api/payments/subscription-status/:userId
 */
payments.get('/subscription-status/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  // Demo subscription data - in production, query database
  return c.json({
    success: true,
    subscription: {
      id: 'sub_demo_12345',
      userId,
      tier: 'plus',
      status: 'active',
      interval: 'monthly',
      currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      trialEnd: null,
      features: {
        consultations: 5,
        aiQueries: -1, // unlimited
        deviceConnections: -1,
        familyMembers: 4,
        storageGB: 25,
        pointsMultiplier: 2,
      },
    },
  });
});

/**
 * Upgrade subscription tier
 * POST /api/payments/upgrade
 */
payments.post('/upgrade', async (c) => {
  try {
    const { userId, newTier, interval } = await c.req.json();
    
    if (!['basic', 'plus', 'elite'].includes(newTier)) {
      return c.json({ success: false, error: 'Invalid tier' }, 400);
    }
    
    // Calculate prorated amount (demo)
    const priceConfig = STRIPE_PRICES[newTier as keyof typeof STRIPE_PRICES];
    const proratedAmount = Math.round((interval === 'annual' ? priceConfig.annualAmount : priceConfig.amount) * 0.5);
    
    return c.json({
      success: true,
      message: `Upgrade to ${newTier} initiated`,
      upgrade: {
        userId,
        previousTier: 'basic',
        newTier,
        interval,
        proratedAmount,
        effectiveDate: new Date().toISOString(),
        newFeatures: getNewFeatures(newTier),
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to process upgrade' }, 500);
  }
});

/**
 * Cancel subscription
 * POST /api/payments/cancel
 */
payments.post('/cancel', async (c) => {
  try {
    const { userId, reason, feedback } = await c.req.json();
    
    return c.json({
      success: true,
      cancellation: {
        userId,
        status: 'pending_cancellation',
        cancelAtPeriodEnd: true,
        effectiveDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        reason,
        feedback,
        retentionOffer: {
          discount: 30,
          message: 'Stay with us! Get 30% off your next 3 months.',
          code: 'STAYWITHUS30',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to process cancellation' }, 500);
  }
});

/**
 * Apply promo code
 * POST /api/payments/apply-promo
 */
payments.post('/apply-promo', async (c) => {
  try {
    const { code, userId, tier } = await c.req.json();
    
    const promoCodes: Record<string, any> = {
      'WELCOME20': { discount: 20, type: 'percent', validTiers: ['basic', 'plus', 'elite'], firstTimeOnly: true },
      'STAYHEALTHY30': { discount: 30, type: 'percent', validTiers: ['plus', 'elite'], firstTimeOnly: false },
      'ELITE50': { discount: 50, type: 'fixed_amount', validTiers: ['elite'], firstTimeOnly: true },
      'COMEBACK10': { discount: 10, type: 'percent', validTiers: ['basic', 'plus', 'elite'], firstTimeOnly: false },
      'FAMILY25': { discount: 25, type: 'percent', validTiers: ['plus', 'elite'], firstTimeOnly: false },
    };
    
    const promo = promoCodes[code?.toUpperCase()];
    
    if (!promo) {
      return c.json({ success: false, error: 'Invalid promo code' }, 400);
    }
    
    if (!promo.validTiers.includes(tier)) {
      return c.json({ success: false, error: `This code is not valid for ${tier} tier` }, 400);
    }
    
    return c.json({
      success: true,
      promo: {
        code: code.toUpperCase(),
        discount: promo.discount,
        type: promo.type,
        applied: true,
        message: promo.type === 'percent' 
          ? `${promo.discount}% discount applied!`
          : `€${promo.discount} discount applied!`,
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to apply promo code' }, 500);
  }
});

// ============================================================================
// ONE-TIME PAYMENT ENDPOINTS (Marketplace)
// ============================================================================

/**
 * Create payment intent for marketplace purchase
 * POST /api/payments/create-payment-intent
 */
payments.post('/create-payment-intent', async (c) => {
  try {
    const { userId, items, shippingAddress } = await c.req.json();
    
    if (!items || items.length === 0) {
      return c.json({ success: false, error: 'No items in cart' }, 400);
    }
    
    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 5000 ? 0 : 495; // Free shipping over €50
    const tax = Math.round(subtotal * 0.19); // 19% VAT
    const total = subtotal + shipping + tax;
    
    // Calculate points earned (5% back)
    const pointsEarned = Math.round(total * 0.05);
    
    const paymentIntentId = `pi_demo_${Date.now()}`;
    
    return c.json({
      success: true,
      paymentIntent: {
        id: paymentIntentId,
        clientSecret: `${paymentIntentId}_secret_demo`,
        amount: total,
        currency: 'eur',
        breakdown: {
          subtotal,
          shipping,
          tax,
          total,
        },
        pointsToEarn: pointsEarned,
        message: 'Demo mode: Use test card 4242 4242 4242 4242',
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create payment intent' }, 500);
  }
});

/**
 * Confirm payment and create order
 * POST /api/payments/confirm-order
 */
payments.post('/confirm-order', async (c) => {
  try {
    const { paymentIntentId, userId, items, shippingAddress, promoCode } = await c.req.json();
    
    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (promoCode) {
      discount = Math.round(subtotal * 0.1); // 10% discount for demo
    }
    const shipping = (subtotal - discount) >= 5000 ? 0 : 495;
    const tax = Math.round((subtotal - discount) * 0.19);
    const total = subtotal - discount + shipping + tax;
    const pointsEarned = Math.round(total * 0.05);
    
    const orderId = `order_${Date.now()}`;
    
    return c.json({
      success: true,
      order: {
        id: orderId,
        userId,
        items,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        currency: 'eur',
        status: 'paid',
        paymentIntentId,
        pointsEarned,
        shippingAddress,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      },
      message: 'Order placed successfully! You earned ' + pointsEarned + ' SelectPoints.',
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to confirm order' }, 500);
  }
});

// ============================================================================
// STRIPE WEBHOOKS (Production handlers)
// ============================================================================

/**
 * Handle Stripe webhooks
 * POST /api/payments/webhook
 */
payments.post('/webhook', async (c) => {
  try {
    const body = await c.req.text();
    const signature = c.req.header('stripe-signature');
    
    // In production, verify webhook signature with Stripe
    // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    // Demo: parse body as JSON
    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return c.json({ error: 'Invalid webhook payload' }, 400);
    }
    
    const eventType = event.type;
    
    switch (eventType) {
      case 'checkout.session.completed':
        // Handle successful checkout
        console.log('Checkout completed:', event.data.object);
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // Update user subscription in database
        console.log('Subscription updated:', event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        console.log('Subscription canceled:', event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        // Handle successful payment
        console.log('Payment succeeded:', event.data.object);
        break;
        
      case 'invoice.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', event.data.object);
        break;
        
      default:
        console.log('Unhandled event type:', eventType);
    }
    
    return c.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return c.json({ error: 'Webhook handler failed' }, 500);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getNewFeatures(tier: string): string[] {
  const features: Record<string, string[]> = {
    basic: [
      '2 Video Consultations/month',
      'AI Health Assistant (50 queries)',
      '3 Device Connections',
      'Basic Health Reports',
    ],
    plus: [
      '5 Video Consultations/month',
      'Unlimited AI Concierge',
      'Unlimited Device Connections',
      'Family Plan (4 members)',
      '2x SelectPoints Earning',
    ],
    elite: [
      'Unlimited Video Consultations',
      'Dedicated Care Manager',
      '24/7 Emergency Hotline',
      'VIP Doctor Access',
      '5x SelectPoints Earning',
    ],
  };
  
  return features[tier] || [];
}

export { payments };
