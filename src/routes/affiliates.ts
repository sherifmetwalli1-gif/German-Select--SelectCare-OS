/**
 * Affiliate Routes
 * Affiliate program management and tracking
 */

import { Hono } from 'hono'
import { AFFILIATE_TIERS } from '../types'
import type { Bindings, Variables, Affiliate, AffiliateTier } from '../types'

export const affiliateRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Get affiliate program info
affiliateRoutes.get('/program', async (c) => {
  const program = {
    name: 'German Select Partner Program',
    description: 'Earn commissions by referring patients to German Select medical services',
    tiers: Object.entries(AFFILIATE_TIERS).map(([key, tier]) => ({
      id: key,
      ...tier,
    })),
    benefits: [
      'Earn 5-15% commission on all referrals',
      'Real-time tracking dashboard',
      'Monthly payouts via bank transfer or PayPal',
      'Marketing materials provided',
      'Dedicated partner support',
      'Performance bonuses',
    ],
    cookieDuration: '30 days',
    minimumPayout: 100,
    payoutCurrency: 'EUR',
    payoutSchedule: 'Monthly (15th of each month)',
  }

  return c.json({
    success: true,
    data: program,
    timestamp: new Date().toISOString(),
  })
})

// Register as affiliate
affiliateRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const {
      email,
      name,
      website,
      type = 'individual',
      companyName,
      country,
      phone,
      howDidYouHear,
      expectedMonthlyReferrals,
    } = body

    if (!email || !name) {
      return c.json({ 
        success: false, 
        error: 'email and name are required' 
      }, 400)
    }

    // Generate affiliate code
    const code = 'GS-' + crypto.randomUUID().substring(0, 6).toUpperCase()
    const affiliateId = `aff_${crypto.randomUUID().substring(0, 8)}`

    const affiliate: Partial<Affiliate> = {
      id: affiliateId,
      userId: `user_${crypto.randomUUID().substring(0, 8)}`,
      code,
      name,
      email,
      website,
      type: type as any,
      tier: 'bronze',
      status: 'pending',
      commissionRate: AFFILIATE_TIERS.bronze.commissionRate,
      cookieDuration: 30,
      totalClicks: 0,
      totalLeads: 0,
      totalConversions: 0,
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
      paidCommission: 0,
      createdAt: new Date().toISOString(),
    }

    return c.json({
      success: true,
      data: {
        affiliate: {
          id: affiliateId,
          code,
          status: 'pending',
          tier: 'bronze',
          commissionRate: 5,
        },
        links: {
          trackingUrl: `https://germanselect.com/?ref=${code}`,
          dashboardUrl: `/affiliate/dashboard`,
        },
        nextSteps: [
          'Your application is under review (24-48 hours)',
          'You will receive an email once approved',
          'Start sharing your unique referral link',
          'Track your earnings in real-time',
        ],
      },
      message: 'Affiliate application submitted successfully!',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get affiliate dashboard
affiliateRoutes.get('/dashboard', async (c) => {
  const affiliateId = c.req.query('affiliateId') || 'demo'

  const dashboard = {
    affiliate: {
      id: affiliateId,
      code: 'GS-DEMO01',
      name: 'Demo Affiliate',
      tier: 'silver' as AffiliateTier,
      status: 'active',
      commissionRate: 8,
      joinedAt: '2024-01-15',
    },
    earnings: {
      totalCommission: 4578.50,
      pendingCommission: 892.00,
      paidCommission: 3686.50,
      currency: 'EUR',
      nextPayout: {
        date: '2024-04-15',
        amount: 892.00,
        status: 'scheduled',
      },
    },
    performance: {
      period: 'all_time',
      clicks: 12456,
      leads: 456,
      conversions: 89,
      revenue: 57225,
      conversionRate: 19.5,
      averageOrderValue: 643,
    },
    currentMonth: {
      clicks: 1234,
      leads: 47,
      conversions: 12,
      revenue: 6780,
      commission: 542.40,
    },
    tierProgress: {
      currentTier: 'silver',
      currentRevenue: 57225,
      nextTier: 'gold',
      nextTierRequirement: 50000,
      progress: 100, // Already qualified for gold
      newCommissionRate: 12,
    },
    topReferrals: [
      { packageId: 'surgery_bridge', name: 'SurgeryBridge', conversions: 5, revenue: 56250 },
      { doctorId: 'dr_bariatric_antireflux', name: 'Dr. Schmidt', conversions: 23, revenue: 4600 },
      { doctorId: 'dr_cardiology', name: 'Prof. Richter', conversions: 18, revenue: 4500 },
    ],
  }

  return c.json({
    success: true,
    data: dashboard,
    timestamp: new Date().toISOString(),
  })
})

// Track affiliate click
affiliateRoutes.post('/track/click', async (c) => {
  try {
    const body = await c.req.json()
    const { code, page, referrer, userAgent, ip } = body

    if (!code) {
      return c.json({ success: false, error: 'Affiliate code is required' }, 400)
    }

    const clickId = `click_${crypto.randomUUID().substring(0, 8)}`

    // In production, save to database and update affiliate stats
    return c.json({
      success: true,
      data: {
        clickId,
        code,
        tracked: true,
        cookieSet: true,
        expiresIn: '30 days',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Track conversion
affiliateRoutes.post('/track/conversion', async (c) => {
  try {
    const body = await c.req.json()
    const { code, bookingId, amount, currency = 'EUR' } = body

    if (!code || !bookingId || !amount) {
      return c.json({ 
        success: false, 
        error: 'code, bookingId, and amount are required' 
      }, 400)
    }

    // Calculate commission (mock - use actual affiliate rate)
    const commissionRate = 8 // Silver tier
    const commission = Math.round(amount * (commissionRate / 100) * 100) / 100

    const conversionId = `conv_${crypto.randomUUID().substring(0, 8)}`

    return c.json({
      success: true,
      data: {
        conversionId,
        code,
        bookingId,
        amount,
        currency,
        commission,
        status: 'pending', // pending until booking is completed
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get affiliate performance
affiliateRoutes.get('/performance', async (c) => {
  const affiliateId = c.req.query('affiliateId')
  const period = c.req.query('period') || 'last_30_days'

  // Generate performance data
  const dailyData = []
  const days = 30
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dailyData.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(30 + Math.random() * 50),
      leads: Math.floor(1 + Math.random() * 3),
      conversions: Math.random() > 0.6 ? Math.floor(Math.random() * 2) : 0,
      revenue: 0,
      commission: 0,
    })
    if (dailyData[dailyData.length - 1].conversions > 0) {
      dailyData[dailyData.length - 1].revenue = dailyData[dailyData.length - 1].conversions * (200 + Math.random() * 300)
      dailyData[dailyData.length - 1].commission = dailyData[dailyData.length - 1].revenue * 0.08
    }
  }

  const performance = {
    period,
    summary: {
      clicks: dailyData.reduce((sum, d) => sum + d.clicks, 0),
      leads: dailyData.reduce((sum, d) => sum + d.leads, 0),
      conversions: dailyData.reduce((sum, d) => sum + d.conversions, 0),
      revenue: Math.round(dailyData.reduce((sum, d) => sum + d.revenue, 0) * 100) / 100,
      commission: Math.round(dailyData.reduce((sum, d) => sum + d.commission, 0) * 100) / 100,
    },
    trend: dailyData,
    topSources: [
      { source: 'Website Banner', clicks: 456, conversions: 5 },
      { source: 'Email Newsletter', clicks: 234, conversions: 3 },
      { source: 'Social Media', clicks: 189, conversions: 2 },
      { source: 'Blog Post', clicks: 156, conversions: 2 },
    ],
  }

  return c.json({
    success: true,
    data: performance,
    timestamp: new Date().toISOString(),
  })
})

// Get payout history
affiliateRoutes.get('/payouts', async (c) => {
  const affiliateId = c.req.query('affiliateId')

  const payouts = [
    {
      id: 'payout_001',
      amount: 1245.50,
      currency: 'EUR',
      status: 'completed',
      method: 'bank_transfer',
      period: '2024-02',
      paidAt: '2024-03-15',
      reference: 'GS-PAY-202402-001',
    },
    {
      id: 'payout_002',
      amount: 987.00,
      currency: 'EUR',
      status: 'completed',
      method: 'bank_transfer',
      period: '2024-01',
      paidAt: '2024-02-15',
      reference: 'GS-PAY-202401-001',
    },
    {
      id: 'payout_003',
      amount: 1454.00,
      currency: 'EUR',
      status: 'completed',
      method: 'paypal',
      period: '2023-12',
      paidAt: '2024-01-15',
      reference: 'GS-PAY-202312-001',
    },
  ]

  return c.json({
    success: true,
    data: {
      payouts,
      pendingPayout: {
        amount: 892.00,
        currency: 'EUR',
        estimatedDate: '2024-04-15',
      },
      paymentMethods: [
        { type: 'bank_transfer', status: 'active', lastUsed: '2024-03-15' },
        { type: 'paypal', status: 'available' },
      ],
    },
    timestamp: new Date().toISOString(),
  })
})

// Get referral links
affiliateRoutes.get('/links', async (c) => {
  const affiliateId = c.req.query('affiliateId')
  const code = 'GS-DEMO01' // Get from affiliate record

  const baseUrl = 'https://germanselect.com'

  const links = {
    main: `${baseUrl}/?ref=${code}`,
    specific: [
      {
        name: 'Homepage',
        url: `${baseUrl}/?ref=${code}`,
        shortUrl: `https://gs.link/${code}`,
      },
      {
        name: 'Doctors Page',
        url: `${baseUrl}/doctors?ref=${code}`,
        shortUrl: `https://gs.link/${code}/doctors`,
      },
      {
        name: 'Packages',
        url: `${baseUrl}/packages?ref=${code}`,
        shortUrl: `https://gs.link/${code}/packages`,
      },
      {
        name: 'SurgeryBridge Package',
        url: `${baseUrl}/packages/surgery-bridge?ref=${code}`,
        shortUrl: `https://gs.link/${code}/surgery`,
      },
      {
        name: 'Book Consultation',
        url: `${baseUrl}/booking?ref=${code}`,
        shortUrl: `https://gs.link/${code}/book`,
      },
    ],
    customizable: true,
    utmParameters: {
      enabled: true,
      example: `${baseUrl}/?ref=${code}&utm_source=affiliate&utm_medium=banner&utm_campaign=spring2024`,
    },
  }

  return c.json({
    success: true,
    data: links,
    timestamp: new Date().toISOString(),
  })
})

// Get marketing materials
affiliateRoutes.get('/materials', async (c) => {
  const materials = {
    banners: [
      { size: '728x90', name: 'Leaderboard', url: '/assets/banners/728x90.png' },
      { size: '300x250', name: 'Medium Rectangle', url: '/assets/banners/300x250.png' },
      { size: '160x600', name: 'Wide Skyscraper', url: '/assets/banners/160x600.png' },
      { size: '336x280', name: 'Large Rectangle', url: '/assets/banners/336x280.png' },
    ],
    emailTemplates: [
      { name: 'Welcome Email', type: 'html', preview: '/templates/welcome.html' },
      { name: 'Package Promotion', type: 'html', preview: '/templates/promo.html' },
      { name: 'Newsletter Insert', type: 'html', preview: '/templates/newsletter.html' },
    ],
    socialMedia: {
      images: [
        { platform: 'facebook', size: '1200x630', url: '/assets/social/fb.png' },
        { platform: 'instagram', size: '1080x1080', url: '/assets/social/ig.png' },
        { platform: 'twitter', size: '1200x675', url: '/assets/social/tw.png' },
        { platform: 'linkedin', size: '1200x627', url: '/assets/social/li.png' },
      ],
      captions: [
        'Experience German medical excellence with Egyptian hospitality 🏥✨',
        'World-class healthcare, exceptional care. Discover German Select.',
        'Your health journey starts here. Premium medical tourism.',
      ],
    },
    brandGuidelines: '/docs/brand-guidelines.pdf',
  }

  return c.json({
    success: true,
    data: materials,
    timestamp: new Date().toISOString(),
  })
})

// Update payout settings
affiliateRoutes.post('/payout-settings', async (c) => {
  try {
    const body = await c.req.json()
    const { affiliateId, method, details } = body

    const validMethods = ['bank_transfer', 'paypal', 'wise']
    if (!validMethods.includes(method)) {
      return c.json({ 
        success: false, 
        error: `Invalid method. Must be: ${validMethods.join(', ')}` 
      }, 400)
    }

    return c.json({
      success: true,
      data: {
        affiliateId,
        method,
        status: 'verified',
        updatedAt: new Date().toISOString(),
      },
      message: 'Payout settings updated successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
