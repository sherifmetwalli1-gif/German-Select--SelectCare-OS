/**
 * Lead Generation Routes
 * Lead capture and management system
 */

import { Hono } from 'hono'
import type { Bindings, Variables, Lead, LeadStatus, LeadSource } from '../types'

export const leadRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Capture new lead
leadRoutes.post('/capture', async (c) => {
  try {
    const body = await c.req.json()
    const {
      email,
      name,
      phone,
      interestedIn,
      type = 'doctor', // 'doctor' or 'package'
      source = 'organic',
      affiliateCode,
      notes,
      metadata = {},
    } = body

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }

    const leadId = `lead_${crypto.randomUUID().substring(0, 8)}`
    
    // Calculate lead score (simple scoring model)
    let score = 50 // Base score
    if (phone) score += 15 // Has phone number
    if (name) score += 10 // Provided name
    if (interestedIn) score += 20 // Specified interest
    if (source === 'affiliate') score += 5 // From trusted source

    const lead: Partial<Lead> = {
      id: leadId,
      source: source as LeadSource,
      affiliateId: affiliateCode ? `aff_${affiliateCode}` : undefined,
      patientEmail: email,
      patientName: name,
      patientPhone: phone,
      interestedIn: interestedIn || 'general',
      type: type as 'doctor' | 'package',
      status: 'new',
      score,
      notes,
      communications: [],
      metadata,
      createdAt: new Date().toISOString(),
    }

    // Calculate lead value estimate based on interest
    let estimatedValue = 150 // Default consultation value
    if (type === 'package') {
      estimatedValue = 5000 // Average package value
    } else if (interestedIn?.includes('bariatric') || interestedIn?.includes('surgery')) {
      estimatedValue = 8000
    } else if (interestedIn?.includes('cardiology')) {
      estimatedValue = 5000
    }

    return c.json({
      success: true,
      data: {
        leadId,
        score,
        estimatedValue,
        status: 'new',
        nextSteps: [
          'Lead captured and assigned',
          'Follow-up email scheduled',
          'Sales team notified',
        ],
      },
      message: 'Lead captured successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get all leads (admin)
leadRoutes.get('/', async (c) => {
  const status = c.req.query('status') as LeadStatus | undefined
  const source = c.req.query('source')
  const minScore = parseInt(c.req.query('minScore') || '0')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')

  // Mock leads data
  const mockLeads: Partial<Lead>[] = [
    {
      id: 'lead_001',
      patientEmail: 'maria@example.de',
      patientName: 'Maria Schmidt',
      patientPhone: '+49 170 1234567',
      interestedIn: 'dr_bariatric_antireflux',
      type: 'doctor',
      source: 'organic',
      status: 'qualified',
      score: 85,
      value: 8500,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'lead_002',
      patientEmail: 'john.doe@gmail.com',
      patientName: 'John Doe',
      interestedIn: 'surgery_bridge',
      type: 'package',
      source: 'affiliate',
      affiliateId: 'aff_demo01',
      status: 'contacted',
      score: 72,
      value: 11250,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'lead_003',
      patientEmail: 'ahmed.k@domain.ae',
      patientName: 'Ahmed Khan',
      patientPhone: '+971 50 1234567',
      interestedIn: 'dr_cardiology',
      type: 'doctor',
      source: 'google',
      status: 'new',
      score: 78,
      value: 250,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'lead_004',
      patientEmail: 'emma.w@yahoo.co.uk',
      patientName: 'Emma Wilson',
      interestedIn: 'executive_health',
      type: 'package',
      source: 'facebook',
      status: 'nurturing',
      score: 65,
      value: 3825,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'lead_005',
      patientEmail: 'converted@example.com',
      patientName: 'Hans Mueller',
      patientPhone: '+49 171 9876543',
      interestedIn: 'surgery_bridge',
      type: 'package',
      source: 'referral',
      status: 'converted',
      score: 95,
      value: 11250,
      convertedBookingId: 'booking_003',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  let filtered = mockLeads
  if (status) {
    filtered = filtered.filter(l => l.status === status)
  }
  if (source) {
    filtered = filtered.filter(l => l.source === source)
  }
  if (minScore > 0) {
    filtered = filtered.filter(l => (l.score || 0) >= minScore)
  }

  // Sort by score descending
  filtered.sort((a, b) => (b.score || 0) - (a.score || 0))

  return c.json({
    success: true,
    data: filtered.slice(offset, offset + limit),
    meta: {
      total: filtered.length,
      page: Math.floor(offset / limit) + 1,
      limit,
    },
    summary: {
      total: mockLeads.length,
      byStatus: {
        new: mockLeads.filter(l => l.status === 'new').length,
        contacted: mockLeads.filter(l => l.status === 'contacted').length,
        qualified: mockLeads.filter(l => l.status === 'qualified').length,
        converted: mockLeads.filter(l => l.status === 'converted').length,
        lost: mockLeads.filter(l => l.status === 'lost').length,
        nurturing: mockLeads.filter(l => l.status === 'nurturing').length,
      },
      totalValue: mockLeads.reduce((sum, l) => sum + (l.value || 0), 0),
      averageScore: Math.round(mockLeads.reduce((sum, l) => sum + (l.score || 0), 0) / mockLeads.length),
    },
    timestamp: new Date().toISOString(),
  })
})

// Get lead by ID
leadRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  // Mock lead detail
  const lead = {
    id,
    patientEmail: 'maria@example.de',
    patientName: 'Maria Schmidt',
    patientPhone: '+49 170 1234567',
    interestedIn: 'dr_bariatric_antireflux',
    type: 'doctor',
    source: 'organic',
    status: 'qualified',
    score: 85,
    value: 8500,
    notes: 'Interested in bariatric surgery. Prefers telemedicine consultation first.',
    assignedDoctorId: 'dr_bariatric_antireflux',
    followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    communications: [
      {
        id: 'comm_1',
        type: 'email',
        direction: 'outbound',
        content: 'Welcome email sent with consultation booking link',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 'system',
      },
      {
        id: 'comm_2',
        type: 'email',
        direction: 'inbound',
        content: 'Patient replied with questions about the procedure',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 'patient',
      },
      {
        id: 'comm_3',
        type: 'phone',
        direction: 'outbound',
        content: 'Called patient, discussed procedure options. Very interested.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        userId: 'admin_001',
      },
    ],
    metadata: {
      landingPage: '/packages/surgery-bridge',
      referrer: 'google.de',
      device: 'mobile',
      country: 'Germany',
      city: 'Munich',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  }

  return c.json({
    success: true,
    data: lead,
    timestamp: new Date().toISOString(),
  })
})

// Update lead status
leadRoutes.patch('/:id/status', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { status, notes, assignedDoctorId, followUpDate } = body

    const validStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted', 'lost', 'nurturing']
    if (!validStatuses.includes(status)) {
      return c.json({ 
        success: false, 
        error: `Invalid status. Must be: ${validStatuses.join(', ')}` 
      }, 400)
    }

    return c.json({
      success: true,
      data: {
        id,
        status,
        notes,
        assignedDoctorId,
        followUpDate,
        updatedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add communication to lead
leadRoutes.post('/:id/communication', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { type, direction, content, userId } = body

    const validTypes = ['email', 'phone', 'sms', 'whatsapp']
    if (!validTypes.includes(type)) {
      return c.json({ 
        success: false, 
        error: `Invalid type. Must be: ${validTypes.join(', ')}` 
      }, 400)
    }

    const communicationId = `comm_${crypto.randomUUID().substring(0, 8)}`

    return c.json({
      success: true,
      data: {
        id: communicationId,
        leadId: id,
        type,
        direction,
        content,
        userId,
        timestamp: new Date().toISOString(),
      },
      message: 'Communication logged successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Convert lead to booking
leadRoutes.post('/:id/convert', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { bookingId, notes } = body

    // In production:
    // 1. Update lead status to 'converted'
    // 2. Link lead to booking
    // 3. Update affiliate commission if applicable
    // 4. Trigger notifications

    return c.json({
      success: true,
      data: {
        leadId: id,
        status: 'converted',
        bookingId,
        convertedAt: new Date().toISOString(),
        affiliateNotified: true,
      },
      message: 'Lead successfully converted to booking',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Lead analytics
leadRoutes.get('/analytics/summary', async (c) => {
  const period = c.req.query('period') || 'last_30_days'

  const analytics = {
    period,
    summary: {
      totalLeads: 456,
      newLeads: 89,
      qualifiedLeads: 156,
      convertedLeads: 67,
      lostLeads: 34,
      conversionRate: 14.7,
      averageLeadScore: 68,
      totalPotentialValue: 2340000,
      convertedValue: 456780,
    },
    bySource: [
      { source: 'organic', leads: 167, converted: 28, rate: 16.8, value: 178000 },
      { source: 'google', leads: 123, converted: 18, rate: 14.6, value: 134500 },
      { source: 'affiliate', leads: 89, converted: 15, rate: 16.9, value: 89280 },
      { source: 'facebook', leads: 45, converted: 4, rate: 8.9, value: 32000 },
      { source: 'referral', leads: 32, converted: 2, rate: 6.3, value: 23000 },
    ],
    byType: [
      { type: 'doctor', leads: 345, converted: 52, averageValue: 450 },
      { type: 'package', leads: 111, converted: 15, averageValue: 8500 },
    ],
    responseMetrics: {
      averageFirstResponse: '2h 34m',
      averageTimeToConversion: '4.2 days',
      followUpRate: 89.4,
    },
    funnel: [
      { stage: 'New', count: 456 },
      { stage: 'Contacted', count: 378 },
      { stage: 'Qualified', count: 156 },
      { stage: 'Proposal', count: 89 },
      { stage: 'Converted', count: 67 },
    ],
    trend: [
      { date: '2024-03-01', leads: 12, converted: 2 },
      { date: '2024-03-02', leads: 15, converted: 3 },
      { date: '2024-03-03', leads: 11, converted: 1 },
      // ... more days
    ],
  }

  return c.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  })
})

// Score leads automatically
leadRoutes.post('/score', async (c) => {
  try {
    const body = await c.req.json()
    const { leadId, factors } = body

    // Simple scoring model
    let score = 50 // Base score

    if (factors.hasPhone) score += 15
    if (factors.hasName) score += 10
    if (factors.interestedInPackage) score += 20
    if (factors.fromAffiliate) score += 5
    if (factors.highValueCountry) score += 10
    if (factors.returnVisitor) score += 10
    if (factors.viewedPricing) score += 15
    if (factors.startedBooking) score += 25

    // Negative factors
    if (factors.invalidEmail) score -= 30
    if (factors.bounceRate > 80) score -= 10

    score = Math.max(0, Math.min(100, score)) // Clamp to 0-100

    return c.json({
      success: true,
      data: {
        leadId,
        score,
        factors,
        recommendation: score >= 70 ? 'high_priority' : score >= 50 ? 'standard' : 'nurture',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
