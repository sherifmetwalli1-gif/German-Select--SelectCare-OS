/**
 * Database Service
 * Handles all D1 database operations
 */

import { 
  Doctor, User, Booking, CarePackage, Payment, 
  Subscription, Lead, Affiliate, Currency, BookingStatus,
  PaymentStatus, LeadStatus, DoctorStatus
} from '../types'

export class DatabaseService {
  constructor(private db: D1Database) {}

  // ==================== USERS ====================
  async createUser(user: Partial<User>): Promise<User> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    
    await this.db.prepare(`
      INSERT INTO users (id, email, role, first_name, last_name, phone, language, currency, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      user.email,
      user.role || 'patient',
      user.firstName || null,
      user.lastName || null,
      user.phone || null,
      user.language || 'en',
      user.currency || 'EUR',
      now,
      now
    ).run()

    return { ...user, id, createdAt: now } as User
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await this.db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(id).first()
    return result ? this.mapUser(result) : null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first()
    return result ? this.mapUser(result) : null
  }

  private mapUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      role: row.role,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      language: row.language,
      currency: row.currency,
      createdAt: row.created_at,
    }
  }

  // ==================== DOCTORS ====================
  async getDoctors(options?: {
    specialization?: string
    status?: DoctorStatus
    isPremium?: boolean
    limit?: number
    offset?: number
  }): Promise<{ doctors: Doctor[]; total: number }> {
    let query = 'SELECT * FROM doctors WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM doctors WHERE 1=1'
    const params: any[] = []

    if (options?.specialization) {
      query += ' AND specialization LIKE ?'
      countQuery += ' AND specialization LIKE ?'
      params.push(`%${options.specialization}%`)
    }

    if (options?.status) {
      query += ' AND status = ?'
      countQuery += ' AND status = ?'
      params.push(options.status)
    }

    if (options?.isPremium !== undefined) {
      query += ' AND is_premium = ?'
      countQuery += ' AND is_premium = ?'
      params.push(options.isPremium ? 1 : 0)
    }

    // Premium doctors first, then by rating
    query += ' ORDER BY is_premium DESC, rating DESC, total_consultations DESC'
    
    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      doctors: (results.results || []).map(row => this.mapDoctor(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async getDoctorById(id: string): Promise<Doctor | null> {
    const result = await this.db.prepare(
      'SELECT * FROM doctors WHERE id = ?'
    ).bind(id).first()
    return result ? this.mapDoctor(result) : null
  }

  async updateDoctor(id: string, updates: Partial<Doctor>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${this.toSnakeCase(key)} = ?`)
        values.push(typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })

    fields.push('updated_at = ?')
    values.push(new Date().toISOString())
    values.push(id)

    await this.db.prepare(
      `UPDATE doctors SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run()
  }

  private mapDoctor(row: any): Doctor {
    return {
      id: row.id,
      name: row.name,
      title: row.title,
      specialization: row.specialization,
      location: row.location,
      department: row.department,
      certifications: JSON.parse(row.certifications || '[]'),
      languages: JSON.parse(row.languages || '[]'),
      experienceYears: row.experience_years,
      education: row.education,
      researchInterests: JSON.parse(row.research_interests || '[]'),
      availability: row.availability,
      profileImage: row.profile_image,
      rating: row.rating || 0,
      reviewCount: row.review_count || 0,
      consultationFee: row.consultation_fee,
      currency: row.currency || 'EUR',
      isPremium: !!row.is_premium,
      premiumTier: row.premium_tier,
      premiumExpiresAt: row.premium_expires_at,
      bio: row.bio,
      videoIntroUrl: row.video_intro_url,
      totalConsultations: row.total_consultations || 0,
      totalRevenue: row.total_revenue || 0,
      commissionRate: row.commission_rate || 20,
      status: row.status || 'active',
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== BOOKINGS ====================
  async createBooking(booking: Partial<Booking>): Promise<Booking> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await this.db.prepare(`
      INSERT INTO bookings (
        id, patient_id, doctor_id, package_id, slot_id, type, status,
        consultation_type, scheduled_at, duration, notes, symptoms,
        price, currency, platform_fee, doctor_payout, payment_status,
        payment_intent_id, affiliate_id, affiliate_commission, lead_id,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      booking.patientId,
      booking.doctorId,
      booking.packageId || null,
      booking.slotId || null,
      booking.type || 'consultation',
      booking.status || 'pending',
      booking.consultationType || 'telemedicine',
      booking.scheduledAt,
      booking.duration || 30,
      booking.notes || null,
      JSON.stringify(booking.symptoms || []),
      booking.price,
      booking.currency || 'EUR',
      booking.platformFee,
      booking.doctorPayout,
      booking.paymentStatus || 'pending',
      booking.paymentIntentId || null,
      booking.affiliateId || null,
      booking.affiliateCommission || null,
      booking.leadId || null,
      now,
      now
    ).run()

    return { ...booking, id, createdAt: now, updatedAt: now } as Booking
  }

  async getBookings(options?: {
    patientId?: string
    doctorId?: string
    status?: BookingStatus
    type?: string
    startDate?: string
    endDate?: string
    limit?: number
    offset?: number
  }): Promise<{ bookings: Booking[]; total: number }> {
    let query = 'SELECT * FROM bookings WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM bookings WHERE 1=1'
    const params: any[] = []

    if (options?.patientId) {
      query += ' AND patient_id = ?'
      countQuery += ' AND patient_id = ?'
      params.push(options.patientId)
    }

    if (options?.doctorId) {
      query += ' AND doctor_id = ?'
      countQuery += ' AND doctor_id = ?'
      params.push(options.doctorId)
    }

    if (options?.status) {
      query += ' AND status = ?'
      countQuery += ' AND status = ?'
      params.push(options.status)
    }

    if (options?.startDate) {
      query += ' AND scheduled_at >= ?'
      countQuery += ' AND scheduled_at >= ?'
      params.push(options.startDate)
    }

    if (options?.endDate) {
      query += ' AND scheduled_at <= ?'
      countQuery += ' AND scheduled_at <= ?'
      params.push(options.endDate)
    }

    query += ' ORDER BY scheduled_at DESC'

    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      bookings: (results.results || []).map(row => this.mapBooking(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const result = await this.db.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).bind(id).first()
    return result ? this.mapBooking(result) : null
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        const snakeKey = this.toSnakeCase(key)
        fields.push(`${snakeKey} = ?`)
        values.push(typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })

    fields.push('updated_at = ?')
    values.push(new Date().toISOString())
    values.push(id)

    await this.db.prepare(
      `UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run()
  }

  private mapBooking(row: any): Booking {
    return {
      id: row.id,
      patientId: row.patient_id,
      doctorId: row.doctor_id,
      packageId: row.package_id,
      slotId: row.slot_id,
      type: row.type,
      status: row.status,
      consultationType: row.consultation_type,
      scheduledAt: row.scheduled_at,
      duration: row.duration,
      notes: row.notes,
      symptoms: JSON.parse(row.symptoms || '[]'),
      attachments: JSON.parse(row.attachments || '[]'),
      price: row.price,
      currency: row.currency,
      platformFee: row.platform_fee,
      doctorPayout: row.doctor_payout,
      paymentStatus: row.payment_status,
      paymentIntentId: row.payment_intent_id,
      meetingUrl: row.meeting_url,
      recordingUrl: row.recording_url,
      prescription: row.prescription,
      followUpRequired: !!row.follow_up_required,
      followUpDate: row.follow_up_date,
      rating: row.rating,
      review: row.review,
      affiliateId: row.affiliate_id,
      affiliateCommission: row.affiliate_commission,
      leadId: row.lead_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== PACKAGES ====================
  async getPackages(options?: {
    category?: string
    isActive?: boolean
    isFeatured?: boolean
    limit?: number
    offset?: number
  }): Promise<{ packages: CarePackage[]; total: number }> {
    let query = 'SELECT * FROM packages WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM packages WHERE 1=1'
    const params: any[] = []

    if (options?.category) {
      query += ' AND category = ?'
      countQuery += ' AND category = ?'
      params.push(options.category)
    }

    if (options?.isActive !== undefined) {
      query += ' AND is_active = ?'
      countQuery += ' AND is_active = ?'
      params.push(options.isActive ? 1 : 0)
    }

    if (options?.isFeatured !== undefined) {
      query += ' AND is_featured = ?'
      countQuery += ' AND is_featured = ?'
      params.push(options.isFeatured ? 1 : 0)
    }

    query += ' ORDER BY is_featured DESC, total_bookings DESC'

    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      packages: (results.results || []).map(row => this.mapPackage(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async getPackageById(id: string): Promise<CarePackage | null> {
    const result = await this.db.prepare(
      'SELECT * FROM packages WHERE id = ?'
    ).bind(id).first()
    return result ? this.mapPackage(result) : null
  }

  private mapPackage(row: any): CarePackage {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      shortDescription: row.short_description,
      category: row.category,
      features: JSON.parse(row.features || '[]'),
      inclusions: JSON.parse(row.inclusions || '[]'),
      exclusions: JSON.parse(row.exclusions || '[]'),
      duration: row.duration,
      durationDays: row.duration_days,
      location: row.location,
      certifications: JSON.parse(row.certifications || '[]'),
      targetAudience: row.target_audience,
      basePrice: row.base_price,
      currency: row.currency,
      discountPercent: row.discount_percent,
      finalPrice: row.final_price,
      commissionRate: row.commission_rate,
      images: JSON.parse(row.images || '[]'),
      videoUrl: row.video_url,
      doctorIds: JSON.parse(row.doctor_ids || '[]'),
      maxPatients: row.max_patients,
      currentPatients: row.current_patients,
      availability: row.availability,
      rating: row.rating,
      reviewCount: row.review_count,
      totalBookings: row.total_bookings,
      totalRevenue: row.total_revenue,
      isActive: !!row.is_active,
      isFeatured: !!row.is_featured,
      metadata: JSON.parse(row.metadata || '{}'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== PAYMENTS ====================
  async createPayment(payment: Partial<Payment>): Promise<Payment> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await this.db.prepare(`
      INSERT INTO payments (
        id, booking_id, subscription_id, user_id, type, amount, currency,
        amount_in_eur, status, stripe_payment_intent_id, payment_method,
        description, metadata, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      payment.bookingId || null,
      payment.subscriptionId || null,
      payment.userId,
      payment.type,
      payment.amount,
      payment.currency || 'EUR',
      payment.amountInEur,
      payment.status || 'pending',
      payment.stripePaymentIntentId || null,
      payment.paymentMethod || null,
      payment.description,
      JSON.stringify(payment.metadata || {}),
      now,
      now
    ).run()

    return { ...payment, id, createdAt: now, updatedAt: now } as Payment
  }

  async getPayments(options?: {
    userId?: string
    bookingId?: string
    status?: PaymentStatus
    type?: string
    limit?: number
    offset?: number
  }): Promise<{ payments: Payment[]; total: number }> {
    let query = 'SELECT * FROM payments WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM payments WHERE 1=1'
    const params: any[] = []

    if (options?.userId) {
      query += ' AND user_id = ?'
      countQuery += ' AND user_id = ?'
      params.push(options.userId)
    }

    if (options?.bookingId) {
      query += ' AND booking_id = ?'
      countQuery += ' AND booking_id = ?'
      params.push(options.bookingId)
    }

    if (options?.status) {
      query += ' AND status = ?'
      countQuery += ' AND status = ?'
      params.push(options.status)
    }

    query += ' ORDER BY created_at DESC'

    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      payments: (results.results || []).map(row => this.mapPayment(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${this.toSnakeCase(key)} = ?`)
        values.push(typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })

    fields.push('updated_at = ?')
    values.push(new Date().toISOString())
    values.push(id)

    await this.db.prepare(
      `UPDATE payments SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run()
  }

  private mapPayment(row: any): Payment {
    return {
      id: row.id,
      bookingId: row.booking_id,
      subscriptionId: row.subscription_id,
      userId: row.user_id,
      type: row.type,
      amount: row.amount,
      currency: row.currency,
      amountInEur: row.amount_in_eur,
      status: row.status,
      stripePaymentIntentId: row.stripe_payment_intent_id,
      stripeChargeId: row.stripe_charge_id,
      stripeRefundId: row.stripe_refund_id,
      paymentMethod: row.payment_method,
      description: row.description,
      metadata: JSON.parse(row.metadata || '{}'),
      refundedAmount: row.refunded_amount,
      refundReason: row.refund_reason,
      failureReason: row.failure_reason,
      receiptUrl: row.receipt_url,
      invoiceId: row.invoice_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== LEADS ====================
  async createLead(lead: Partial<Lead>): Promise<Lead> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await this.db.prepare(`
      INSERT INTO leads (
        id, source, affiliate_id, patient_email, patient_name, patient_phone,
        interested_in, type, status, score, notes, metadata, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      lead.source || 'organic',
      lead.affiliateId || null,
      lead.patientEmail,
      lead.patientName || null,
      lead.patientPhone || null,
      lead.interestedIn,
      lead.type,
      lead.status || 'new',
      lead.score || 50,
      lead.notes || null,
      JSON.stringify(lead.metadata || {}),
      now,
      now
    ).run()

    return { ...lead, id, createdAt: now, updatedAt: now, communications: [] } as Lead
  }

  async getLeads(options?: {
    status?: LeadStatus
    source?: string
    affiliateId?: string
    assignedDoctorId?: string
    limit?: number
    offset?: number
  }): Promise<{ leads: Lead[]; total: number }> {
    let query = 'SELECT * FROM leads WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM leads WHERE 1=1'
    const params: any[] = []

    if (options?.status) {
      query += ' AND status = ?'
      countQuery += ' AND status = ?'
      params.push(options.status)
    }

    if (options?.source) {
      query += ' AND source = ?'
      countQuery += ' AND source = ?'
      params.push(options.source)
    }

    if (options?.affiliateId) {
      query += ' AND affiliate_id = ?'
      countQuery += ' AND affiliate_id = ?'
      params.push(options.affiliateId)
    }

    query += ' ORDER BY created_at DESC'

    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      leads: (results.results || []).map(row => this.mapLead(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'communications') {
        fields.push(`${this.toSnakeCase(key)} = ?`)
        values.push(typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })

    fields.push('updated_at = ?')
    values.push(new Date().toISOString())
    values.push(id)

    await this.db.prepare(
      `UPDATE leads SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run()
  }

  private mapLead(row: any): Lead {
    return {
      id: row.id,
      source: row.source,
      affiliateId: row.affiliate_id,
      patientEmail: row.patient_email,
      patientName: row.patient_name,
      patientPhone: row.patient_phone,
      interestedIn: row.interested_in,
      type: row.type,
      status: row.status,
      score: row.score,
      notes: row.notes,
      convertedBookingId: row.converted_booking_id,
      value: row.value,
      assignedDoctorId: row.assigned_doctor_id,
      followUpDate: row.follow_up_date,
      communications: JSON.parse(row.communications || '[]'),
      metadata: JSON.parse(row.metadata || '{}'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== AFFILIATES ====================
  async createAffiliate(affiliate: Partial<Affiliate>): Promise<Affiliate> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const code = this.generateAffiliateCode()

    await this.db.prepare(`
      INSERT INTO affiliates (
        id, user_id, code, name, email, website, type, tier, status,
        commission_rate, cookie_duration, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      affiliate.userId,
      code,
      affiliate.name,
      affiliate.email,
      affiliate.website || null,
      affiliate.type || 'individual',
      affiliate.tier || 'bronze',
      affiliate.status || 'pending',
      affiliate.commissionRate || 5,
      affiliate.cookieDuration || 30,
      now,
      now
    ).run()

    return { 
      ...affiliate, 
      id, 
      code, 
      createdAt: now, 
      updatedAt: now,
      totalClicks: 0,
      totalLeads: 0,
      totalConversions: 0,
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
      paidCommission: 0,
    } as Affiliate
  }

  async getAffiliateByCode(code: string): Promise<Affiliate | null> {
    const result = await this.db.prepare(
      'SELECT * FROM affiliates WHERE code = ? AND status = ?'
    ).bind(code, 'active').first()
    return result ? this.mapAffiliate(result) : null
  }

  async getAffiliates(options?: {
    status?: string
    tier?: string
    limit?: number
    offset?: number
  }): Promise<{ affiliates: Affiliate[]; total: number }> {
    let query = 'SELECT * FROM affiliates WHERE 1=1'
    let countQuery = 'SELECT COUNT(*) as total FROM affiliates WHERE 1=1'
    const params: any[] = []

    if (options?.status) {
      query += ' AND status = ?'
      countQuery += ' AND status = ?'
      params.push(options.status)
    }

    if (options?.tier) {
      query += ' AND tier = ?'
      countQuery += ' AND tier = ?'
      params.push(options.tier)
    }

    query += ' ORDER BY total_revenue DESC'

    if (options?.limit) {
      query += ` LIMIT ${options.limit}`
      if (options.offset) {
        query += ` OFFSET ${options.offset}`
      }
    }

    const [results, countResult] = await Promise.all([
      this.db.prepare(query).bind(...params).all(),
      this.db.prepare(countQuery).bind(...params).first()
    ])

    return {
      affiliates: (results.results || []).map(row => this.mapAffiliate(row)),
      total: (countResult as any)?.total || 0
    }
  }

  async updateAffiliate(id: string, updates: Partial<Affiliate>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${this.toSnakeCase(key)} = ?`)
        values.push(typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })

    fields.push('updated_at = ?')
    values.push(new Date().toISOString())
    values.push(id)

    await this.db.prepare(
      `UPDATE affiliates SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run()
  }

  private mapAffiliate(row: any): Affiliate {
    return {
      id: row.id,
      userId: row.user_id,
      code: row.code,
      name: row.name,
      email: row.email,
      website: row.website,
      type: row.type,
      tier: row.tier,
      status: row.status,
      commissionRate: row.commission_rate,
      cookieDuration: row.cookie_duration,
      totalClicks: row.total_clicks || 0,
      totalLeads: row.total_leads || 0,
      totalConversions: row.total_conversions || 0,
      totalRevenue: row.total_revenue || 0,
      totalCommission: row.total_commission || 0,
      pendingCommission: row.pending_commission || 0,
      paidCommission: row.paid_commission || 0,
      paymentMethod: row.payment_method,
      paymentDetails: JSON.parse(row.payment_details || '{}'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== SUBSCRIPTIONS ====================
  async createSubscription(subscription: Partial<Subscription>): Promise<Subscription> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await this.db.prepare(`
      INSERT INTO subscriptions (
        id, doctor_id, tier, status, amount, currency, interval_type,
        current_period_start, current_period_end, cancel_at_period_end,
        stripe_subscription_id, stripe_customer_id, features, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      subscription.doctorId,
      subscription.tier,
      subscription.status || 'active',
      subscription.amount,
      subscription.currency || 'EUR',
      subscription.interval,
      subscription.currentPeriodStart,
      subscription.currentPeriodEnd,
      subscription.cancelAtPeriodEnd ? 1 : 0,
      subscription.stripeSubscriptionId || null,
      subscription.stripeCustomerId || null,
      JSON.stringify(subscription.features || []),
      now,
      now
    ).run()

    return { ...subscription, id, createdAt: now, updatedAt: now } as Subscription
  }

  async getSubscriptionByDoctorId(doctorId: string): Promise<Subscription | null> {
    const result = await this.db.prepare(
      'SELECT * FROM subscriptions WHERE doctor_id = ? AND status = ?'
    ).bind(doctorId, 'active').first()
    return result ? this.mapSubscription(result) : null
  }

  private mapSubscription(row: any): Subscription {
    return {
      id: row.id,
      doctorId: row.doctor_id,
      tier: row.tier,
      status: row.status,
      amount: row.amount,
      currency: row.currency,
      interval: row.interval_type,
      currentPeriodStart: row.current_period_start,
      currentPeriodEnd: row.current_period_end,
      cancelAtPeriodEnd: !!row.cancel_at_period_end,
      stripeSubscriptionId: row.stripe_subscription_id,
      stripeCustomerId: row.stripe_customer_id,
      features: JSON.parse(row.features || '[]'),
      usage: JSON.parse(row.usage || '{}'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }

  // ==================== ANALYTICS ====================
  async getAnalyticsSummary(startDate: string, endDate: string): Promise<any> {
    const [
      revenueResult,
      bookingsResult,
      usersResult,
      doctorsResult,
      leadsResult
    ] = await Promise.all([
      this.db.prepare(`
        SELECT 
          SUM(amount_in_eur) as total_revenue,
          COUNT(*) as total_payments
        FROM payments 
        WHERE status = 'captured' 
        AND created_at BETWEEN ? AND ?
      `).bind(startDate, endDate).first(),
      
      this.db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
          AVG(price) as avg_value
        FROM bookings 
        WHERE created_at BETWEEN ? AND ?
      `).bind(startDate, endDate).first(),
      
      this.db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN role = 'patient' THEN 1 ELSE 0 END) as patients,
          SUM(CASE WHEN role = 'doctor' THEN 1 ELSE 0 END) as doctors
        FROM users 
        WHERE created_at BETWEEN ? AND ?
      `).bind(startDate, endDate).first(),
      
      this.db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN is_premium = 1 THEN 1 ELSE 0 END) as premium,
          AVG(rating) as avg_rating
        FROM doctors
      `).first(),
      
      this.db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted
        FROM leads 
        WHERE created_at BETWEEN ? AND ?
      `).bind(startDate, endDate).first(),
    ])

    return {
      revenue: {
        total: (revenueResult as any)?.total_revenue || 0,
        transactions: (revenueResult as any)?.total_payments || 0,
      },
      bookings: {
        total: (bookingsResult as any)?.total || 0,
        completed: (bookingsResult as any)?.completed || 0,
        cancelled: (bookingsResult as any)?.cancelled || 0,
        averageValue: (bookingsResult as any)?.avg_value || 0,
      },
      users: {
        newUsers: (usersResult as any)?.total || 0,
        patients: (usersResult as any)?.patients || 0,
        doctors: (usersResult as any)?.doctors || 0,
      },
      doctors: {
        total: (doctorsResult as any)?.total || 0,
        premium: (doctorsResult as any)?.premium || 0,
        averageRating: (doctorsResult as any)?.avg_rating || 0,
      },
      leads: {
        total: (leadsResult as any)?.total || 0,
        converted: (leadsResult as any)?.converted || 0,
        conversionRate: (leadsResult as any)?.total > 0 
          ? ((leadsResult as any)?.converted / (leadsResult as any)?.total * 100).toFixed(2)
          : 0,
      },
    }
  }

  async getRevenueByDay(startDate: string, endDate: string): Promise<{ date: string; amount: number }[]> {
    const result = await this.db.prepare(`
      SELECT 
        DATE(created_at) as date,
        SUM(amount_in_eur) as amount
      FROM payments 
      WHERE status = 'captured' 
      AND created_at BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY date
    `).bind(startDate, endDate).all()

    return (result.results || []).map((row: any) => ({
      date: row.date,
      amount: row.amount || 0,
    }))
  }

  // ==================== UTILITIES ====================
  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }

  private generateAffiliateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'GS-'
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }
}
