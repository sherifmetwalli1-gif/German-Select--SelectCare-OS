/**
 * SelectCareOS™ Engagement & Conversion Optimization Routes
 * Smart upsells, social proof, urgency, and retention features
 */

import { Hono } from 'hono';

const engagement = new Hono();

// ============================================================================
// SOCIAL PROOF & LIVE ACTIVITY
// ============================================================================

/**
 * Get recent platform activity for social proof
 * GET /api/engagement/social-proof
 */
engagement.get('/social-proof', async (c) => {
  const activities = [
    { type: 'booking', message: 'Maria from Munich booked a gastric sleeve consultation', time: '2 minutes ago', icon: 'calendar-check' },
    { type: 'purchase', message: 'Thomas purchased SelectTech Pro Watch', time: '5 minutes ago', icon: 'shopping-cart' },
    { type: 'signup', message: 'Anna upgraded to Elite membership', time: '8 minutes ago', icon: 'crown' },
    { type: 'milestone', message: 'Klaus reached 75% recovery milestone', time: '12 minutes ago', icon: 'trophy' },
    { type: 'review', message: 'Dr. Fischer received a 5-star review', time: '15 minutes ago', icon: 'star' },
    { type: 'referral', message: 'Peter earned €50 + 1,000 points from referral', time: '20 minutes ago', icon: 'gift' },
    { type: 'points', message: 'Sarah reached Platinum tier!', time: '25 minutes ago', icon: 'medal' },
    { type: 'wellness', message: '247 members completed daily wellness check today', time: '30 minutes ago', icon: 'heart' },
  ];
  
  // Return random subset for variety
  const shuffled = activities.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);
  
  return c.json({
    success: true,
    activities: selected,
    stats: {
      activeUsers: Math.floor(Math.random() * 50) + 150, // 150-200
      viewingNow: Math.floor(Math.random() * 30) + 20, // 20-50
      bookedToday: Math.floor(Math.random() * 20) + 30, // 30-50
    },
  });
});

/**
 * Get current viewers count (for urgency)
 * GET /api/engagement/viewers/:pageType
 */
engagement.get('/viewers/:pageType', async (c) => {
  const pageType = c.req.param('pageType');
  
  const viewerRanges: Record<string, [number, number]> = {
    'subscription': [15, 35],
    'marketplace': [25, 60],
    'doctor': [8, 20],
    'retreat': [5, 15],
    'package': [10, 25],
  };
  
  const range = viewerRanges[pageType] || [5, 20];
  const viewers = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
  
  return c.json({
    success: true,
    pageType,
    viewersCount: viewers,
    message: `${viewers} people are viewing this right now`,
  });
});

// ============================================================================
// URGENCY & SCARCITY
// ============================================================================

/**
 * Get current promotions and limited offers
 * GET /api/engagement/promotions
 */
engagement.get('/promotions', async (c) => {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const hoursLeft = Math.floor((endOfMonth.getTime() - now.getTime()) / (1000 * 60 * 60));
  
  return c.json({
    success: true,
    promotions: [
      {
        id: 'new-year-elite',
        title: 'New Year Health Revolution',
        description: 'Get 40% off Elite membership - Limited spots!',
        discount: 40,
        type: 'percentage',
        code: 'NEWYEAR2026',
        validTiers: ['elite'],
        spotsLeft: Math.floor(Math.random() * 10) + 3, // 3-12 spots
        totalSpots: 50,
        expiresAt: endOfMonth.toISOString(),
        hoursRemaining: hoursLeft,
        badge: 'LIMITED',
      },
      {
        id: 'flash-sale-devices',
        title: 'Flash Sale: Health Devices',
        description: 'Up to 35% off all health devices',
        discount: 35,
        type: 'percentage',
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        hoursRemaining: 24,
        badge: '24H ONLY',
      },
      {
        id: 'referral-bonus',
        title: 'Double Referral Rewards',
        description: 'Earn €100 + 2,000 points for each referral',
        bonusMultiplier: 2,
        expiresAt: endOfMonth.toISOString(),
        hoursRemaining: hoursLeft,
        badge: '2X BONUS',
      },
    ],
    urgency: {
      message: hoursLeft < 48 
        ? `🔥 Only ${hoursLeft} hours left for January promotions!`
        : `⏰ ${Math.ceil(hoursLeft / 24)} days left to save big!`,
      level: hoursLeft < 48 ? 'high' : hoursLeft < 168 ? 'medium' : 'low',
    },
  });
});

/**
 * Get availability/scarcity for specific items
 * GET /api/engagement/availability/:itemType/:itemId
 */
engagement.get('/availability/:itemType/:itemId', async (c) => {
  const itemType = c.req.param('itemType');
  const itemId = c.req.param('itemId');
  
  // Simulated scarcity data
  const scarcityData: Record<string, any> = {
    'doctor-slot': {
      available: Math.floor(Math.random() * 5) + 1,
      total: 8,
      message: 'slots left this week',
      nextAvailable: 'Tomorrow, 10:00 AM',
    },
    'elite-membership': {
      available: Math.floor(Math.random() * 10) + 3,
      total: 50,
      message: 'spots left at current price',
      priceIncreaseAt: '2026-02-01',
    },
    'retreat': {
      available: Math.floor(Math.random() * 5) + 2,
      total: 12,
      message: 'rooms available',
      nextDate: '2026-02-15',
    },
    'product': {
      available: Math.floor(Math.random() * 20) + 5,
      reorderingSoon: true,
      message: 'in stock',
    },
  };
  
  const data = scarcityData[itemType] || { available: 10, message: 'available' };
  
  return c.json({
    success: true,
    itemType,
    itemId,
    availability: data,
    showUrgency: data.available <= 5,
  });
});

// ============================================================================
// SMART UPSELLS & CROSS-SELLS
// ============================================================================

/**
 * Get personalized upsell recommendations
 * GET /api/engagement/upsells/:userId
 */
engagement.get('/upsells/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  // In production, this would analyze user behavior and tier
  return c.json({
    success: true,
    upsells: [
      {
        id: 'tier-upgrade',
        type: 'subscription_upgrade',
        priority: 1,
        trigger: 'ai_query_approaching_limit',
        currentTier: 'plus',
        suggestedTier: 'elite',
        headline: 'You\'re Using AI Concierge Like a Pro!',
        message: 'Unlock unlimited AI queries and get a dedicated care manager with Elite.',
        savings: '€50/month value in extra features',
        cta: 'Upgrade to Elite',
        discount: 20,
        discountCode: 'POWERUSER20',
        expiresIn: 48, // hours
      },
      {
        id: 'bundle-supplements',
        type: 'product_bundle',
        priority: 2,
        trigger: 'viewed_vitamin_d',
        headline: 'Complete Your Recovery Stack',
        message: 'Patients who bought Vitamin D3 also got 30% better results with our Recovery Bundle.',
        products: ['vitamin-d', 'omega-3', 'magnesium'],
        originalPrice: 87,
        bundlePrice: 79,
        savings: 8,
        pointsBonus: 200,
        cta: 'Add Recovery Bundle',
      },
      {
        id: 'family-plan',
        type: 'feature_addon',
        priority: 3,
        trigger: 'single_user_plus',
        headline: 'Your Family Deserves Premium Care Too',
        message: 'Add up to 3 more family members at no extra cost with your Plus plan.',
        features: ['Shared SelectPoints pool', 'Family health calendar', 'Group challenges'],
        cta: 'Add Family Member',
      },
      {
        id: 'consultation-package',
        type: 'service_bundle',
        priority: 4,
        trigger: 'first_consultation_completed',
        headline: 'Save on Your Next Consultations',
        message: 'Book a 3-consultation package and save 25%.',
        originalPrice: 450,
        packagePrice: 337,
        savings: 113,
        pointsBonus: 500,
        cta: 'Get Consultation Package',
      },
    ],
  });
});

/**
 * Get cart abandonment recovery offer
 * GET /api/engagement/cart-recovery/:userId
 */
engagement.get('/cart-recovery/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  // Demo cart recovery data
  return c.json({
    success: true,
    recovery: {
      hasAbandonedCart: true,
      cartValue: 127,
      itemCount: 3,
      abandonedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      offer: {
        discount: 10,
        type: 'percentage',
        code: 'COMEBACK10',
        message: 'Complete your order now and get 10% off!',
        expiresIn: 24, // hours
        freeShipping: true,
      },
    },
  });
});

// ============================================================================
// RETENTION & WIN-BACK
// ============================================================================

/**
 * Get retention offer for at-risk user
 * GET /api/engagement/retention/:userId
 */
engagement.get('/retention/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  return c.json({
    success: true,
    retention: {
      riskLevel: 'medium',
      daysSinceLastLogin: 5,
      daysSinceLastPurchase: 30,
      offers: [
        {
          type: 'discount',
          headline: 'We Miss You!',
          message: 'Come back and get 25% off your next purchase.',
          discount: 25,
          code: 'MISSYOU25',
          expiresIn: 72,
        },
        {
          type: 'points_bonus',
          headline: 'Double Points Weekend',
          message: 'Earn 2x SelectPoints on all activities this weekend.',
          multiplier: 2,
          startsAt: getNextWeekendStart(),
          endsAt: getNextWeekendEnd(),
        },
        {
          type: 'free_consultation',
          headline: 'Free Check-in Call',
          message: 'Book a free 15-minute wellness check with our care team.',
          cta: 'Book Free Call',
        },
      ],
    },
  });
});

/**
 * Log engagement event for analytics
 * POST /api/engagement/track
 */
engagement.post('/track', async (c) => {
  try {
    const { userId, eventType, eventData, pageUrl, sessionId } = await c.req.json();
    
    const validEvents = [
      'page_view', 'button_click', 'upsell_shown', 'upsell_clicked', 'upsell_dismissed',
      'social_proof_shown', 'promotion_viewed', 'promotion_clicked', 'cart_abandoned',
      'checkout_started', 'checkout_completed', 'subscription_viewed', 'subscription_started',
    ];
    
    if (!validEvents.includes(eventType)) {
      return c.json({ success: false, error: 'Invalid event type' }, 400);
    }
    
    // In production, store in analytics database
    console.log('Engagement event:', { userId, eventType, eventData, pageUrl, sessionId, timestamp: new Date().toISOString() });
    
    return c.json({
      success: true,
      tracked: true,
      eventId: `evt_${Date.now()}`,
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to track event' }, 500);
  }
});

// ============================================================================
// PERSONALIZATION
// ============================================================================

/**
 * Get personalized homepage content
 * GET /api/engagement/personalized/:userId
 */
engagement.get('/personalized/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  return c.json({
    success: true,
    personalization: {
      greeting: getTimeBasedGreeting(),
      featuredContent: [
        {
          type: 'recovery_tip',
          title: 'Today\'s Recovery Tip',
          content: 'Studies show walking for 20 minutes after meals improves post-bariatric outcomes by 15%.',
          source: 'ASMBS Guidelines 2024',
          pointsForAction: 25,
        },
        {
          type: 'recommended_product',
          productId: 'vitamin-d',
          reason: 'Based on your recovery stage',
          discount: 15,
        },
        {
          type: 'doctor_available',
          doctorId: 'dr-fischer',
          message: 'Dr. Fischer has 2 slots available today',
          specialOffer: 'Free follow-up call with booking',
        },
      ],
      challenges: [
        {
          id: 'step-challenge',
          title: 'Weekly Step Challenge',
          description: 'Walk 50,000 steps this week',
          progress: 34500,
          goal: 50000,
          reward: 500,
          endsIn: '3 days',
        },
      ],
      notifications: [
        {
          type: 'streak',
          message: '🔥 You\'re on a 14-day streak! Keep it up for bonus points.',
        },
        {
          type: 'points',
          message: '💰 You\'re 1,550 points away from Platinum status!',
        },
      ],
    },
  });
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function getNextWeekendStart(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  const saturday = new Date(now);
  saturday.setDate(now.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);
  return saturday.toISOString();
}

function getNextWeekendEnd(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString();
}

export { engagement };
