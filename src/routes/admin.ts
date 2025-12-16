/**
 * Admin Routes
 * Platform administration and management
 */

import { Hono } from 'hono'
import type { Bindings, Variables } from '../types'

export const adminRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Admin dashboard
adminRoutes.get('/dashboard', async (c) => {
  const dashboard = {
    overview: {
      totalRevenue: 186543,
      totalBookings: 487,
      totalPatients: 1247,
      totalDoctors: 9,
      activeSessions: 67,
      pendingApprovals: 3,
    },
    alerts: [
      { type: 'warning', message: '2 new affiliate applications pending review', action: '/admin/affiliates' },
      { type: 'info', message: '1 doctor subscription expiring in 3 days', action: '/admin/subscriptions' },
      { type: 'success', message: 'System health: All services operational', action: null },
    ],
    recentActivity: [
      { type: 'booking', description: 'New consultation booked', time: '5 min ago' },
      { type: 'payment', description: '€8,500 package payment received', time: '15 min ago' },
      { type: 'user', description: 'New patient registered from Germany', time: '23 min ago' },
      { type: 'lead', description: 'High-value lead converted', time: '1 hour ago' },
    ],
  }

  return c.json({
    success: true,
    data: dashboard,
    timestamp: new Date().toISOString(),
  })
})

// Manage doctors
adminRoutes.get('/doctors', async (c) => {
  const status = c.req.query('status')
  
  const doctors = [
    {
      id: 'dr_bariatric_antireflux',
      name: 'Dr. Friedrich Schmidt',
      specialization: 'Bariatric Surgery',
      status: 'active',
      isPremium: true,
      tier: 'enterprise',
      revenue: 34500,
      bookings: 67,
      rating: 4.95,
      commissionRate: 12,
    },
    // ... more doctors
  ]

  return c.json({
    success: true,
    data: doctors,
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.patch('/doctors/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()

  return c.json({
    success: true,
    data: { id, ...body, updatedAt: new Date().toISOString() },
    message: 'Doctor updated successfully',
    timestamp: new Date().toISOString(),
  })
})

// Manage packages
adminRoutes.get('/packages', async (c) => {
  const packages = [
    {
      id: 'surgery_bridge',
      name: 'SurgeryBridge',
      category: 'bariatric',
      basePrice: 12500,
      finalPrice: 11250,
      commissionRate: 15,
      totalBookings: 234,
      revenue: 2632500,
      isActive: true,
      isFeatured: true,
    },
  ]

  return c.json({
    success: true,
    data: packages,
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.post('/packages', async (c) => {
  const body = await c.req.json()
  const id = `pkg_${crypto.randomUUID().substring(0, 8)}`

  return c.json({
    success: true,
    data: { id, ...body, createdAt: new Date().toISOString() },
    message: 'Package created successfully',
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.patch('/packages/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()

  return c.json({
    success: true,
    data: { id, ...body, updatedAt: new Date().toISOString() },
    message: 'Package updated successfully',
    timestamp: new Date().toISOString(),
  })
})

// Manage affiliates
adminRoutes.get('/affiliates', async (c) => {
  const status = c.req.query('status')

  const affiliates = [
    {
      id: 'aff_001',
      code: 'GS-DEMO01',
      name: 'Demo Affiliate',
      email: 'affiliate@example.com',
      type: 'individual',
      tier: 'silver',
      status: 'active',
      commissionRate: 8,
      totalRevenue: 57225,
      totalCommission: 4578,
      pendingCommission: 892,
    },
    {
      id: 'aff_002',
      code: 'GS-NEW01',
      name: 'New Partner',
      email: 'newpartner@example.com',
      type: 'agency',
      tier: 'bronze',
      status: 'pending',
      commissionRate: 5,
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
    },
  ]

  let filtered = affiliates
  if (status) {
    filtered = filtered.filter(a => a.status === status)
  }

  return c.json({
    success: true,
    data: filtered,
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.patch('/affiliates/:id/status', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const { status, reason } = body

  return c.json({
    success: true,
    data: { id, status, reason, updatedAt: new Date().toISOString() },
    message: `Affiliate ${status === 'active' ? 'approved' : 'updated'}`,
    timestamp: new Date().toISOString(),
  })
})

// Commission management
adminRoutes.get('/commissions', async (c) => {
  const settings = {
    defaultRates: {
      consultation: 20,
      package: 15,
      follow_up: 15,
      emergency: 25,
    },
    affiliateRates: {
      bronze: 5,
      silver: 8,
      gold: 12,
      platinum: 15,
    },
    doctorDiscounts: {
      basic: 0,
      professional: 5,
      enterprise: 10,
    },
  }

  return c.json({
    success: true,
    data: settings,
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.patch('/commissions', async (c) => {
  const body = await c.req.json()

  return c.json({
    success: true,
    data: body,
    message: 'Commission rates updated',
    timestamp: new Date().toISOString(),
  })
})

// Payout management
adminRoutes.get('/payouts', async (c) => {
  const status = c.req.query('status')

  const payouts = [
    {
      id: 'payout_001',
      type: 'doctor',
      recipientId: 'dr_bariatric_antireflux',
      recipientName: 'Dr. Schmidt',
      amount: 12450,
      currency: 'EUR',
      status: 'pending',
      period: '2024-03',
      dueDate: '2024-04-05',
    },
    {
      id: 'payout_002',
      type: 'affiliate',
      recipientId: 'aff_001',
      recipientName: 'Demo Affiliate',
      amount: 892,
      currency: 'EUR',
      status: 'scheduled',
      period: '2024-03',
      dueDate: '2024-04-15',
    },
  ]

  return c.json({
    success: true,
    data: payouts,
    summary: {
      totalPending: 23450,
      totalScheduled: 8920,
      doctorPayouts: 18230,
      affiliatePayouts: 5220,
    },
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.post('/payouts/:id/process', async (c) => {
  const id = c.req.param('id')

  return c.json({
    success: true,
    data: {
      id,
      status: 'processing',
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    message: 'Payout processing initiated',
    timestamp: new Date().toISOString(),
  })
})

// System settings
adminRoutes.get('/settings', async (c) => {
  const settings = {
    platform: {
      name: 'German Select',
      tagline: 'German Precision Meets Egyptian Care',
      supportEmail: 'support@germanselect.com',
      supportPhone: '+49 123 456 789',
      timezone: 'Europe/Berlin',
      defaultCurrency: 'EUR',
      defaultLanguage: 'en',
    },
    payments: {
      stripeEnabled: true,
      currencies: ['EUR', 'USD', 'GBP', 'CHF', 'AED'],
      minimumBookingAmount: 50,
      refundPolicy: '48_hours',
    },
    bookings: {
      minimumLeadTime: 24, // hours
      maximumAdvanceBooking: 90, // days
      cancellationWindow: 24, // hours
      autoConfirm: false,
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      bookingReminders: [24, 2], // hours before
    },
  }

  return c.json({
    success: true,
    data: settings,
    timestamp: new Date().toISOString(),
  })
})

adminRoutes.patch('/settings', async (c) => {
  const body = await c.req.json()

  return c.json({
    success: true,
    data: body,
    message: 'Settings updated successfully',
    timestamp: new Date().toISOString(),
  })
})

// User management
adminRoutes.get('/users', async (c) => {
  const role = c.req.query('role')
  const limit = parseInt(c.req.query('limit') || '20')

  const users = [
    {
      id: 'user_001',
      email: 'patient@example.com',
      name: 'Test Patient',
      role: 'patient',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-03-15',
      bookings: 3,
      totalSpent: 650,
    },
    {
      id: 'user_002',
      email: 'admin@germanselect.com',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-03-16',
    },
  ]

  let filtered = users
  if (role) {
    filtered = filtered.filter(u => u.role === role)
  }

  return c.json({
    success: true,
    data: filtered.slice(0, limit),
    meta: { total: filtered.length },
    timestamp: new Date().toISOString(),
  })
})

// Audit log
adminRoutes.get('/audit-log', async (c) => {
  const limit = parseInt(c.req.query('limit') || '50')

  const logs = [
    {
      id: 'log_001',
      action: 'settings.update',
      actor: 'admin@germanselect.com',
      details: 'Updated payment settings',
      ip: '192.168.1.1',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'log_002',
      action: 'affiliate.approve',
      actor: 'admin@germanselect.com',
      details: 'Approved affiliate GS-NEW01',
      ip: '192.168.1.1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'log_003',
      action: 'doctor.update',
      actor: 'admin@germanselect.com',
      details: 'Updated commission rate for Dr. Schmidt',
      ip: '192.168.1.1',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return c.json({
    success: true,
    data: logs.slice(0, limit),
    timestamp: new Date().toISOString(),
  })
})

// System health
adminRoutes.get('/health', async (c) => {
  const health = {
    status: 'healthy',
    services: {
      api: { status: 'up', responseTime: '45ms' },
      database: { status: 'up', responseTime: '12ms' },
      cache: { status: 'up', hitRate: '94.5%' },
      payments: { status: 'up', provider: 'stripe' },
    },
    metrics: {
      requestsPerMinute: 234,
      averageResponseTime: '67ms',
      errorRate: '0.02%',
      uptime: '99.99%',
    },
    lastChecked: new Date().toISOString(),
  }

  return c.json({
    success: true,
    data: health,
    timestamp: new Date().toISOString(),
  })
})
