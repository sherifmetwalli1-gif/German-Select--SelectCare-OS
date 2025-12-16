/**
 * Analytics Routes
 * Enterprise analytics dashboard for German Select
 */

import { Hono } from 'hono'
import type { Bindings, Variables } from '../types'

export const analyticsRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Dashboard overview
analyticsRoutes.get('/dashboard', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const dashboard = {
    period,
    summary: {
      totalRevenue: 186543,
      revenueGrowth: 23.5,
      totalBookings: 487,
      bookingGrowth: 18.2,
      activePatients: 1247,
      patientGrowth: 12.8,
      averageRating: 4.82,
      conversionRate: 68.5,
    },
    revenue: {
      total: 186543,
      consultations: 97400,
      packages: 89143,
      subscriptions: 2793,
      currency: 'EUR',
    },
    platformMetrics: {
      platformFees: 32645,
      doctorPayouts: 149320,
      affiliateCommissions: 4578,
      netProfit: 28067,
    },
    topPerformers: {
      doctors: [
        { id: 'dr_bariatric_antireflux', name: 'Dr. F. Schmidt', revenue: 34500, bookings: 45 },
        { id: 'dr_cardiology', name: 'Prof. M. Richter', revenue: 28750, bookings: 32 },
        { id: 'dr_post_bariatric', name: 'Dr. K. Weber', revenue: 22500, bookings: 38 },
      ],
      packages: [
        { id: 'surgery_bridge', name: 'SurgeryBridge', revenue: 56250, sales: 5 },
        { id: 'tailored_care_packages', name: 'Tailored Care', revenue: 27500, sales: 5 },
        { id: 'cardiac_excellence', name: 'Cardiac Excellence', revenue: 16910, sales: 2 },
      ],
    },
  }

  return c.json({
    success: true,
    data: dashboard,
    timestamp: new Date().toISOString(),
  })
})

// Revenue analytics
analyticsRoutes.get('/revenue', async (c) => {
  const period = c.req.query('period') || 'last_30_days'
  const groupBy = c.req.query('groupBy') || 'day'

  // Generate mock daily revenue data
  const dailyData = []
  const days = period === 'last_7_days' ? 7 : period === 'last_90_days' ? 90 : 30
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dailyData.push({
      date: date.toISOString().split('T')[0],
      consultations: Math.floor(2000 + Math.random() * 3000),
      packages: Math.floor(1000 + Math.random() * 5000),
      subscriptions: Math.floor(50 + Math.random() * 150),
      total: 0,
    })
    dailyData[dailyData.length - 1].total = 
      dailyData[dailyData.length - 1].consultations +
      dailyData[dailyData.length - 1].packages +
      dailyData[dailyData.length - 1].subscriptions
  }

  const analytics = {
    period,
    summary: {
      total: dailyData.reduce((sum, d) => sum + d.total, 0),
      average: Math.round(dailyData.reduce((sum, d) => sum + d.total, 0) / days),
      highest: Math.max(...dailyData.map(d => d.total)),
      lowest: Math.min(...dailyData.map(d => d.total)),
    },
    bySource: [
      { source: 'Consultations', amount: 97400, percentage: 52.2 },
      { source: 'Packages', amount: 89143, percentage: 47.8 },
      { source: 'Subscriptions', amount: 2793, percentage: 1.5 },
    ],
    byCurrency: [
      { currency: 'EUR', amount: 156543, percentage: 83.9 },
      { currency: 'USD', amount: 18500, percentage: 9.9 },
      { currency: 'GBP', amount: 8700, percentage: 4.7 },
      { currency: 'AED', amount: 2800, percentage: 1.5 },
    ],
    trend: dailyData,
  }

  return c.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  })
})

// Booking analytics
analyticsRoutes.get('/bookings', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const analytics = {
    period,
    summary: {
      total: 487,
      completed: 389,
      cancelled: 42,
      pending: 56,
      completionRate: 79.9,
      cancellationRate: 8.6,
    },
    byType: [
      { type: 'consultation', count: 423, percentage: 86.9 },
      { type: 'package', count: 48, percentage: 9.9 },
      { type: 'follow_up', count: 16, percentage: 3.3 },
    ],
    byConsultationType: [
      { type: 'telemedicine', count: 356, percentage: 73.1 },
      { type: 'onsite', count: 112, percentage: 23.0 },
      { type: 'hybrid', count: 19, percentage: 3.9 },
    ],
    byDoctor: [
      { doctorId: 'dr_bariatric_antireflux', name: 'Dr. Schmidt', count: 67, revenue: 13400 },
      { doctorId: 'dr_cardiology', name: 'Prof. Richter', count: 54, revenue: 13500 },
      { doctorId: 'dr_post_bariatric', name: 'Dr. Weber', count: 48, revenue: 7200 },
      { doctorId: 'dr_arthroscopy_sports', name: 'Dr. Bauer', count: 45, revenue: 8100 },
    ],
    averageValues: {
      bookingValue: 382.7,
      duration: 38, // minutes
      rating: 4.82,
      leadTime: 3.2, // days from booking to appointment
    },
    peakTimes: {
      byDay: [
        { day: 'Monday', count: 98 },
        { day: 'Tuesday', count: 112 },
        { day: 'Wednesday', count: 105 },
        { day: 'Thursday', count: 89 },
        { day: 'Friday', count: 67 },
        { day: 'Saturday', count: 12 },
        { day: 'Sunday', count: 4 },
      ],
      byHour: [
        { hour: '09:00', count: 67 },
        { hour: '10:00', count: 89 },
        { hour: '11:00', count: 78 },
        { hour: '14:00', count: 92 },
        { hour: '15:00', count: 84 },
        { hour: '16:00', count: 56 },
      ],
    },
  }

  return c.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  })
})

// User/Patient analytics
analyticsRoutes.get('/users', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const analytics = {
    period,
    summary: {
      totalUsers: 3456,
      newUsers: 287,
      activeUsers: 1247,
      returningUsers: 456,
      retentionRate: 36.6,
    },
    byRole: [
      { role: 'patient', count: 3234, percentage: 93.6 },
      { role: 'doctor', count: 9, percentage: 0.3 },
      { role: 'affiliate', count: 45, percentage: 1.3 },
      { role: 'admin', count: 3, percentage: 0.1 },
    ],
    byCountry: [
      { country: 'Germany', code: 'DE', count: 1456, percentage: 42.1 },
      { country: 'United Kingdom', code: 'GB', count: 534, percentage: 15.5 },
      { country: 'United States', code: 'US', count: 423, percentage: 12.2 },
      { country: 'UAE', code: 'AE', count: 312, percentage: 9.0 },
      { country: 'Switzerland', code: 'CH', count: 234, percentage: 6.8 },
      { country: 'Other', code: 'OTHER', count: 497, percentage: 14.4 },
    ],
    byLanguage: [
      { language: 'English', count: 2145, percentage: 62.1 },
      { language: 'German', count: 987, percentage: 28.6 },
      { language: 'Arabic', count: 234, percentage: 6.8 },
      { language: 'Other', count: 90, percentage: 2.6 },
    ],
    acquisition: {
      organic: 1234,
      affiliate: 456,
      google: 678,
      facebook: 234,
      referral: 189,
      direct: 665,
    },
    engagement: {
      averageSessionDuration: '4m 32s',
      pagesPerSession: 5.7,
      bounceRate: 32.4,
    },
  }

  return c.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  })
})

// Doctor performance analytics
analyticsRoutes.get('/doctors', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const analytics = {
    period,
    summary: {
      totalDoctors: 9,
      activeDoctors: 9,
      premiumDoctors: 7,
      averageRating: 4.83,
      totalConsultations: 487,
      totalRevenue: 149320,
    },
    rankings: [
      {
        rank: 1,
        doctorId: 'dr_bariatric_antireflux',
        name: 'Dr. Friedrich Schmidt',
        specialization: 'Bariatric Surgery',
        metrics: {
          bookings: 67,
          revenue: 13400,
          rating: 4.95,
          responseRate: 98,
          completionRate: 96,
        },
        trend: 'up',
        isPremium: true,
        tier: 'enterprise',
      },
      {
        rank: 2,
        doctorId: 'dr_cardiology',
        name: 'Prof. Dr. Michael Richter',
        specialization: 'Cardiology',
        metrics: {
          bookings: 54,
          revenue: 13500,
          rating: 4.92,
          responseRate: 95,
          completionRate: 94,
        },
        trend: 'up',
        isPremium: true,
        tier: 'enterprise',
      },
      {
        rank: 3,
        doctorId: 'dr_post_bariatric',
        name: 'Dr. Klaus Weber',
        specialization: 'Plastic Surgery',
        metrics: {
          bookings: 48,
          revenue: 7200,
          rating: 4.90,
          responseRate: 92,
          completionRate: 91,
        },
        trend: 'stable',
        isPremium: true,
        tier: 'enterprise',
      },
    ],
    bySpecialization: [
      { specialization: 'Bariatric Surgery', doctors: 2, bookings: 115, revenue: 26900 },
      { specialization: 'Cardiology', doctors: 1, bookings: 54, revenue: 13500 },
      { specialization: 'Orthopedics', doctors: 1, bookings: 45, revenue: 8100 },
      { specialization: 'Urology', doctors: 1, bookings: 38, revenue: 4560 },
    ],
    premiumImpact: {
      premiumDoctors: {
        count: 7,
        averageBookings: 52,
        averageRevenue: 11200,
        averageRating: 4.87,
      },
      standardDoctors: {
        count: 2,
        averageBookings: 23,
        averageRevenue: 3450,
        averageRating: 4.72,
      },
      premiumAdvantage: {
        bookingsIncrease: '+126%',
        revenueIncrease: '+225%',
        ratingIncrease: '+3.2%',
      },
    },
  }

  return c.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  })
})

// Lead funnel analytics
analyticsRoutes.get('/funnel', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const funnel = {
    period,
    stages: [
      { stage: 'Visitors', count: 15678, percentage: 100 },
      { stage: 'Doctor Views', count: 8934, percentage: 57.0 },
      { stage: 'Package Views', count: 4567, percentage: 29.1 },
      { stage: 'Leads Generated', count: 1234, percentage: 7.9 },
      { stage: 'Bookings Started', count: 678, percentage: 4.3 },
      { stage: 'Payments Completed', count: 487, percentage: 3.1 },
    ],
    conversionRates: {
      visitorToLead: 7.9,
      leadToBooking: 54.9,
      bookingToPayment: 71.8,
      overallConversion: 3.1,
    },
    dropOff: [
      { from: 'Visitors', to: 'Doctor Views', dropOff: 43.0 },
      { from: 'Doctor Views', to: 'Leads', dropOff: 86.2 },
      { from: 'Leads', to: 'Bookings', dropOff: 45.1 },
      { from: 'Bookings', to: 'Payments', dropOff: 28.2 },
    ],
    bySource: [
      { source: 'Organic', visitors: 6543, conversions: 234, rate: 3.6 },
      { source: 'Google Ads', visitors: 3456, conversions: 123, rate: 3.6 },
      { source: 'Affiliates', visitors: 2345, conversions: 89, rate: 3.8 },
      { source: 'Social', visitors: 1890, conversions: 32, rate: 1.7 },
      { source: 'Direct', visitors: 1444, conversions: 9, rate: 0.6 },
    ],
  }

  return c.json({
    success: true,
    data: funnel,
    timestamp: new Date().toISOString(),
  })
})

// Real-time metrics
analyticsRoutes.get('/realtime', async (c) => {
  const realtime = {
    activeUsers: Math.floor(45 + Math.random() * 30),
    activeConsultations: Math.floor(3 + Math.random() * 5),
    pendingBookings: Math.floor(8 + Math.random() * 10),
    todayMetrics: {
      revenue: Math.floor(4500 + Math.random() * 2000),
      bookings: Math.floor(15 + Math.random() * 10),
      newUsers: Math.floor(20 + Math.random() * 15),
      leads: Math.floor(30 + Math.random() * 20),
    },
    recentActivity: [
      { type: 'booking', message: 'New consultation booked with Dr. Schmidt', time: '2 min ago' },
      { type: 'payment', message: '€250 payment received', time: '5 min ago' },
      { type: 'lead', message: 'New lead from Germany', time: '8 min ago' },
      { type: 'review', message: '5-star review from patient', time: '12 min ago' },
      { type: 'signup', message: 'New patient registered', time: '15 min ago' },
    ],
    serverHealth: {
      status: 'healthy',
      responseTime: Math.floor(45 + Math.random() * 30) + 'ms',
      uptime: '99.99%',
    },
  }

  return c.json({
    success: true,
    data: realtime,
    timestamp: new Date().toISOString(),
  })
})

// Export analytics report
analyticsRoutes.get('/export', async (c) => {
  const format = c.req.query('format') || 'json'
  const period = c.req.query('period') || 'last_30_days'

  // In production, generate actual report
  return c.json({
    success: true,
    data: {
      reportId: `report_${crypto.randomUUID().substring(0, 8)}`,
      format,
      period,
      status: 'generating',
      estimatedTime: '30 seconds',
      downloadUrl: null, // Would be populated when ready
    },
    message: 'Report generation started. Check status with reportId.',
    timestamp: new Date().toISOString(),
  })
})
