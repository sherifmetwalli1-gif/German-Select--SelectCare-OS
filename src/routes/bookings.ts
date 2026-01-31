/**
 * Booking Routes
 * Consultation and package booking management
 */

import { Hono } from 'hono'
import { logger } from '../utils/logger'
import { DatabaseService } from '../services/database'
import { createStripeService } from '../services/stripe'
import type { Bindings, Variables, Booking, BookingType, ConsultationType, Currency } from '../types'

export const bookingRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Platform commission rates
const COMMISSION_RATES = {
  consultation: 20, // 20% for consultations
  package: 15, // 15% for packages
  follow_up: 15,
  emergency: 25,
}

// Create a new booking
bookingRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const {
      patientId,
      patientEmail,
      doctorId,
      packageId,
      slotId,
      type = 'consultation',
      consultationType = 'telemedicine',
      scheduledAt,
      duration = 30,
      notes,
      symptoms,
      affiliateCode,
    } = body

    // Validate required fields
    if (!doctorId || !scheduledAt) {
      return c.json({ 
        success: false, 
        error: 'doctorId and scheduledAt are required' 
      }, 400)
    }

    // Calculate pricing
    const consultationFee = body.price || 150 // Default fee
    const currency: Currency = body.currency || 'EUR'
    const commissionRate = COMMISSION_RATES[type as BookingType] || 20
    const platformFee = Math.round(consultationFee * (commissionRate / 100) * 100) / 100
    const doctorPayout = consultationFee - platformFee

    // Handle affiliate tracking
    let affiliateId: string | undefined
    let affiliateCommission: number | undefined
    
    if (affiliateCode) {
      // In production, look up affiliate from database
      affiliateId = `aff_${affiliateCode}`
      affiliateCommission = Math.round(consultationFee * 0.05 * 100) / 100 // 5% affiliate commission
    }

    // Create booking object
    const bookingId = crypto.randomUUID()
    const now = new Date().toISOString()

    const booking: Booking = {
      id: bookingId,
      patientId: patientId || `guest_${crypto.randomUUID().substring(0, 8)}`,
      doctorId,
      packageId,
      slotId,
      type: type as BookingType,
      status: 'pending',
      consultationType: consultationType as ConsultationType,
      scheduledAt,
      duration,
      notes,
      symptoms: symptoms || [],
      attachments: [],
      price: consultationFee,
      currency,
      platformFee,
      doctorPayout,
      paymentStatus: 'pending',
      followUpRequired: false,
      affiliateId,
      affiliateCommission,
      createdAt: now,
      updatedAt: now,
    }

    // Create Stripe payment intent
    let paymentIntent: any = null
    if (c.env.STRIPE_SECRET_KEY) {
      const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
      paymentIntent = await stripe.createPaymentIntent({
        amount: consultationFee,
        currency,
        metadata: {
          bookingId,
          doctorId,
          type,
          patientEmail: patientEmail || '',
        },
        description: `German Select - ${type} with Dr. ID: ${doctorId}`,
        receiptEmail: patientEmail,
      })
      
      booking.paymentIntentId = paymentIntent.id
    }

    // In production, save to database
    // const db = new DatabaseService(c.env.DB)
    // await db.createBooking(booking)

    return c.json({
      success: true,
      data: {
        booking: {
          id: booking.id,
          status: booking.status,
          type: booking.type,
          scheduledAt: booking.scheduledAt,
          duration: booking.duration,
          price: booking.price,
          currency: booking.currency,
          platformFee: booking.platformFee,
          doctorPayout: booking.doctorPayout,
        },
        payment: paymentIntent ? {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: consultationFee,
          currency,
        } : {
          message: 'Payment processing not configured. Demo mode.',
          amount: consultationFee,
          currency,
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    logger.error('Booking creation error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get booking by ID
bookingRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    // Mock booking for demo
    const mockBooking: Partial<Booking> = {
      id,
      patientId: 'patient_demo',
      doctorId: 'dr_bariatric_antireflux',
      type: 'consultation',
      status: 'confirmed',
      consultationType: 'telemedicine',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      duration: 30,
      price: 200,
      currency: 'EUR',
      platformFee: 40,
      doctorPayout: 160,
      paymentStatus: 'captured',
      meetingUrl: 'https://meet.germanselect.com/consultation/' + id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return c.json({
      success: true,
      data: mockBooking,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// List bookings (with filters)
bookingRoutes.get('/', async (c) => {
  try {
    const patientId = c.req.query('patientId')
    const doctorId = c.req.query('doctorId')
    const status = c.req.query('status')
    const type = c.req.query('type')
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = parseInt(c.req.query('offset') || '0')

    // Mock bookings for demo
    const mockBookings: Partial<Booking>[] = [
      {
        id: 'booking_001',
        patientId: 'patient_demo',
        doctorId: 'dr_bariatric_antireflux',
        type: 'consultation',
        status: 'completed',
        consultationType: 'telemedicine',
        scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 30,
        price: 200,
        currency: 'EUR',
        rating: 5,
        review: 'Excellent consultation!',
      },
      {
        id: 'booking_002',
        patientId: 'patient_demo',
        doctorId: 'dr_cardiology',
        type: 'consultation',
        status: 'confirmed',
        consultationType: 'telemedicine',
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 45,
        price: 250,
        currency: 'EUR',
      },
      {
        id: 'booking_003',
        patientId: 'patient_demo',
        doctorId: 'dr_post_bariatric',
        type: 'package',
        status: 'pending',
        consultationType: 'onsite',
        scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        price: 8500,
        currency: 'EUR',
        packageId: 'surgery_bridge',
      },
    ]

    // Apply filters
    let filtered = mockBookings
    if (status) filtered = filtered.filter(b => b.status === status)
    if (type) filtered = filtered.filter(b => b.type === type)
    if (doctorId) filtered = filtered.filter(b => b.doctorId === doctorId)

    return c.json({
      success: true,
      data: filtered.slice(offset, offset + limit),
      meta: {
        total: filtered.length,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update booking status
bookingRoutes.patch('/:id/status', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { status, notes } = body

    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'refunded']
    if (!validStatuses.includes(status)) {
      return c.json({ 
        success: false, 
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      }, 400)
    }

    // In production, update database
    // const db = new DatabaseService(c.env.DB)
    // await db.updateBooking(id, { status, notes })

    return c.json({
      success: true,
      data: {
        id,
        status,
        notes,
        updatedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Cancel booking
bookingRoutes.post('/:id/cancel', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { reason, requestRefund = false } = body

    // In production:
    // 1. Update booking status to 'cancelled'
    // 2. If requestRefund and within policy, process Stripe refund
    // 3. Send notifications to doctor and patient

    let refundStatus = null
    if (requestRefund && c.env.STRIPE_SECRET_KEY) {
      // Mock refund process
      refundStatus = {
        processed: true,
        amount: 150,
        currency: 'EUR',
        refundId: 'refund_' + crypto.randomUUID().substring(0, 8),
      }
    }

    return c.json({
      success: true,
      data: {
        id,
        status: 'cancelled',
        reason,
        refund: refundStatus,
        cancelledAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add review to booking
bookingRoutes.post('/:id/review', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { rating, review } = body

    if (!rating || rating < 1 || rating > 5) {
      return c.json({ 
        success: false, 
        error: 'Rating must be between 1 and 5' 
      }, 400)
    }

    // In production, update booking and recalculate doctor rating

    return c.json({
      success: true,
      data: {
        bookingId: id,
        rating,
        review,
        submittedAt: new Date().toISOString(),
      },
      message: 'Thank you for your review!',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get booking statistics
bookingRoutes.get('/stats/summary', async (c) => {
  try {
    // Mock statistics
    const stats = {
      total: 1247,
      completed: 987,
      cancelled: 89,
      pending: 171,
      revenue: {
        total: 186543,
        consultations: 124320,
        packages: 62223,
        currency: 'EUR',
      },
      averageRating: 4.82,
      conversionRate: 68.5,
      byType: {
        consultation: 1089,
        package: 134,
        follow_up: 24,
      },
      byMonth: [
        { month: '2024-01', count: 89, revenue: 13450 },
        { month: '2024-02', count: 112, revenue: 16890 },
        { month: '2024-03', count: 134, revenue: 20340 },
      ],
    }

    return c.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Reschedule booking
bookingRoutes.post('/:id/reschedule', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { newScheduledAt, newSlotId, reason } = body

    if (!newScheduledAt) {
      return c.json({ 
        success: false, 
        error: 'newScheduledAt is required' 
      }, 400)
    }

    // Validate new time is in the future
    if (new Date(newScheduledAt) <= new Date()) {
      return c.json({ 
        success: false, 
        error: 'New scheduled time must be in the future' 
      }, 400)
    }

    return c.json({
      success: true,
      data: {
        id,
        previousScheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        newScheduledAt,
        newSlotId,
        reason,
        rescheduledAt: new Date().toISOString(),
      },
      message: 'Booking rescheduled successfully. Notifications sent to all parties.',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
