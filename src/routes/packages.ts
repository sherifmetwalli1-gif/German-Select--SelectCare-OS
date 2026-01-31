/**
 * Care Package Routes
 * Medical tourism package management and e-commerce
 */

import { Hono } from 'hono'
import { logger } from '../utils/logger'
import { createStripeService } from '../services/stripe'
import type { Bindings, Variables, CarePackage, PackageCategory } from '../types'

export const packageRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Care packages data
const CARE_PACKAGES: CarePackage[] = [
  {
    id: 'surgery_bridge',
    name: 'SurgeryBridge: Germany to Egypt',
    slug: 'surgery-bridge-germany-egypt',
    description: 'Experience unparalleled surgical excellence with German precision meeting Egyptian care. Our innovative platform seamlessly connects top-tier surgical expertise from Germany with premier healthcare services in Egypt.',
    shortDescription: 'German surgical expertise with Egyptian hospitality',
    category: 'bariatric',
    features: [
      'German-certified medical specialists',
      'Seamless cross-continental care coordination',
      'World-class surgical techniques',
      'Premier healthcare services in Egypt',
      'Exceptional care across continents',
      '24/7 patient support hotline',
      'Dedicated patient coordinator',
    ],
    inclusions: [
      { name: 'Pre-operative Consultation', description: 'Comprehensive telemedicine consultation with German surgeon', icon: 'video' },
      { name: 'Surgery Procedure', description: 'State-of-the-art surgical facility in Egypt', icon: 'hospital' },
      { name: 'Hospital Stay', description: '5-7 nights in premium medical facility', icon: 'bed' },
      { name: 'Accommodation', description: '7 nights in 5-star recovery resort', icon: 'hotel' },
      { name: 'Airport Transfers', description: 'VIP transfers from/to Hurghada Airport', icon: 'car' },
      { name: 'Post-op Care', description: '3 months follow-up consultations', icon: 'heart' },
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Additional medical tests if required',
    ],
    duration: '14-21 days',
    durationDays: 18,
    location: 'Germany → Egypt (Red Sea Region)',
    certifications: ['German Medical Standards', 'International Healthcare Accreditation', 'JCI Certified'],
    targetAudience: 'International patients seeking German surgical expertise with Egyptian care',
    basePrice: 12500,
    currency: 'EUR',
    discountPercent: 10,
    finalPrice: 11250,
    commissionRate: 15,
    images: [
      '/images/packages/surgery-bridge-1.jpg',
      '/images/packages/surgery-bridge-2.jpg',
      '/images/packages/surgery-bridge-3.jpg',
    ],
    videoUrl: 'https://youtube.com/watch?v=example',
    doctorIds: ['dr_bariatric_antireflux', 'dr_anesthesia_pain', 'dr_post_bariatric'],
    maxPatients: 50,
    currentPatients: 23,
    availability: 'available',
    rating: 4.9,
    reviewCount: 87,
    totalBookings: 234,
    totalRevenue: 2632500,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'tailored_care_packages',
    name: 'Tailored Care Packages',
    slug: 'tailored-care-packages',
    description: 'German Select offers tailored care packages designed to meet the diverse needs of our patients, combining medical excellence with the relaxing environment of Egypt\'s Red Sea region.',
    shortDescription: 'Personalized medical care with Red Sea recovery',
    category: 'wellness',
    features: [
      'Personalized treatment plans',
      'Medical excellence with German standards',
      'Relaxing Red Sea recovery environment',
      'Family-friendly accommodations',
      'Comprehensive healthcare and leisure combination',
      'Multilingual support staff',
    ],
    inclusions: [
      { name: 'Medical Assessment', description: 'Full diagnostic workup', icon: 'clipboard' },
      { name: 'Treatment Plan', description: 'Customized by German specialists', icon: 'file-medical' },
      { name: 'Accommodation', description: '5-star resort with medical facilities', icon: 'hotel' },
      { name: 'Wellness Program', description: 'Spa and rehabilitation services', icon: 'spa' },
      { name: 'Nutrition Plan', description: 'Personalized diet and nutrition guidance', icon: 'apple' },
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Additional procedures',
    ],
    duration: '7-14 days',
    durationDays: 10,
    location: 'Hurghada, Egypt (Red Sea Region)',
    certifications: ['German Medical Standards', 'Egyptian Healthcare Accreditation'],
    targetAudience: 'Patients and families seeking comprehensive healthcare with leisure',
    basePrice: 5500,
    currency: 'EUR',
    finalPrice: 5500,
    commissionRate: 12,
    images: [
      '/images/packages/tailored-care-1.jpg',
      '/images/packages/tailored-care-2.jpg',
    ],
    doctorIds: ['dr_internal_gastroenterology', 'dr_cardiology'],
    maxPatients: 100,
    currentPatients: 45,
    availability: 'available',
    rating: 4.7,
    reviewCount: 156,
    totalBookings: 489,
    totalRevenue: 2689500,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'cardiac_excellence',
    name: 'Cardiac Excellence Program',
    slug: 'cardiac-excellence-program',
    description: 'Comprehensive cardiac care combining German cardiology expertise with world-class facilities. Complete heart health assessment, treatment, and recovery in one seamless program.',
    shortDescription: 'Complete cardiac care by German cardiologists',
    category: 'cardiology',
    features: [
      'Full cardiac diagnostic workup',
      'German Board-certified cardiologists',
      'Advanced imaging and stress testing',
      'Personalized treatment protocol',
      'Cardiac rehabilitation program',
      'Long-term follow-up care',
    ],
    inclusions: [
      { name: 'Cardiac Consultation', description: 'With Prof. Dr. Richter', icon: 'heart' },
      { name: 'Diagnostic Tests', description: 'ECG, Echo, Stress Test, CT Angio', icon: 'heartbeat' },
      { name: 'Treatment Plan', description: 'Evidence-based cardiac care', icon: 'notes-medical' },
      { name: 'Rehabilitation', description: '5-day cardiac rehab program', icon: 'running' },
      { name: 'Premium Stay', description: '10 nights luxury accommodation', icon: 'hotel' },
    ],
    exclusions: [
      'Surgical interventions (quoted separately)',
      'International flights',
      'Travel insurance',
    ],
    duration: '10-14 days',
    durationDays: 12,
    location: 'Kiel, Germany → Hurghada, Egypt',
    certifications: ['German Cardiac Society', 'European Society of Cardiology'],
    targetAudience: 'Patients with cardiac conditions seeking expert evaluation and treatment',
    basePrice: 8900,
    currency: 'EUR',
    discountPercent: 5,
    finalPrice: 8455,
    commissionRate: 10,
    images: [
      '/images/packages/cardiac-1.jpg',
    ],
    doctorIds: ['dr_cardiology'],
    maxPatients: 30,
    currentPatients: 12,
    availability: 'available',
    rating: 4.95,
    reviewCount: 43,
    totalBookings: 67,
    totalRevenue: 566485,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: 'orthopedic_sports',
    name: 'Sports Medicine & Recovery',
    slug: 'sports-medicine-recovery',
    description: 'Elite sports medicine program designed for athletes and active individuals. German orthopedic expertise combined with professional-grade rehabilitation.',
    shortDescription: 'Athletic injury treatment and performance recovery',
    category: 'orthopedics',
    features: [
      'Sports injury diagnosis',
      'Arthroscopic surgery (if needed)',
      'Physical therapy program',
      'Performance optimization',
      'Return-to-sport protocol',
    ],
    inclusions: [
      { name: 'Orthopedic Consultation', description: 'With sports medicine specialist', icon: 'user-md' },
      { name: 'Advanced Imaging', description: 'MRI, CT, X-ray as needed', icon: 'x-ray' },
      { name: 'Treatment', description: 'Conservative or surgical', icon: 'syringe' },
      { name: 'Rehabilitation', description: '2-week intensive physio', icon: 'dumbbell' },
      { name: 'Accommodation', description: 'Sports resort with facilities', icon: 'hotel' },
    ],
    exclusions: [
      'Major surgical procedures (additional cost)',
      'International flights',
    ],
    duration: '14-21 days',
    durationDays: 17,
    location: 'Frankfurt, Germany → Hurghada, Egypt',
    certifications: ['German Sports Medicine Association', 'FIFA Medical Centre'],
    targetAudience: 'Athletes and active individuals with sports injuries',
    basePrice: 7500,
    currency: 'EUR',
    finalPrice: 7500,
    commissionRate: 12,
    images: [],
    doctorIds: ['dr_arthroscopy_sports'],
    maxPatients: 40,
    currentPatients: 18,
    availability: 'available',
    rating: 4.85,
    reviewCount: 72,
    totalBookings: 123,
    totalRevenue: 922500,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z',
  },
  {
    id: 'executive_health',
    name: 'Executive Health Check',
    slug: 'executive-health-check',
    description: 'Comprehensive health assessment for busy executives. Complete medical evaluation combined with luxury retreat experience.',
    shortDescription: 'Premium health screening for executives',
    category: 'diagnostic',
    features: [
      'Full body health screening',
      'Cardiovascular assessment',
      'Cancer screening',
      'Nutritional evaluation',
      'Stress management consultation',
      'Executive wellness report',
    ],
    inclusions: [
      { name: 'Full Check-up', description: '100+ diagnostic tests', icon: 'vial' },
      { name: 'Specialist Consultations', description: '5 specialist reviews', icon: 'user-md' },
      { name: 'Advanced Imaging', description: 'Full body MRI, CT', icon: 'procedures' },
      { name: 'Wellness Program', description: '3-day executive retreat', icon: 'spa' },
      { name: 'VIP Services', description: 'Private suite, concierge', icon: 'concierge-bell' },
    ],
    exclusions: [
      'Treatment for detected conditions',
      'International flights',
    ],
    duration: '5-7 days',
    durationDays: 6,
    location: 'Hurghada, Egypt',
    certifications: ['German Medical Standards'],
    targetAudience: 'Executives and high-net-worth individuals',
    basePrice: 4500,
    currency: 'EUR',
    discountPercent: 15,
    finalPrice: 3825,
    commissionRate: 18,
    images: [],
    doctorIds: ['dr_internal_gastroenterology', 'dr_cardiology'],
    maxPatients: 20,
    currentPatients: 8,
    availability: 'limited',
    rating: 4.88,
    reviewCount: 34,
    totalBookings: 56,
    totalRevenue: 214200,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
]

// Get all packages
packageRoutes.get('/', async (c) => {
  try {
    const category = c.req.query('category')
    const isFeatured = c.req.query('featured')
    const minPrice = parseFloat(c.req.query('minPrice') || '0')
    const maxPrice = parseFloat(c.req.query('maxPrice') || '100000')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = parseInt(c.req.query('offset') || '0')

    let filtered = CARE_PACKAGES.filter(p => p.isActive)

    if (category) {
      filtered = filtered.filter(p => p.category === category)
    }

    if (isFeatured === 'true') {
      filtered = filtered.filter(p => p.isFeatured)
    }

    filtered = filtered.filter(p => 
      p.finalPrice >= minPrice && p.finalPrice <= maxPrice
    )

    // Sort: featured first, then by popularity
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return b.totalBookings - a.totalBookings
    })

    const total = filtered.length
    const paginated = filtered.slice(offset, offset + limit)

    return c.json({
      success: true,
      data: paginated,
      meta: {
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get categories
packageRoutes.get('/categories', async (c) => {
  const categories: { id: PackageCategory; name: string; count: number; icon: string }[] = [
    { id: 'bariatric', name: 'Bariatric Surgery', count: 1, icon: 'weight' },
    { id: 'cardiology', name: 'Cardiology', count: 1, icon: 'heart' },
    { id: 'orthopedics', name: 'Orthopedics', count: 1, icon: 'bone' },
    { id: 'wellness', name: 'Wellness & Recovery', count: 1, icon: 'spa' },
    { id: 'diagnostic', name: 'Diagnostic Programs', count: 1, icon: 'stethoscope' },
    { id: 'cosmetic', name: 'Cosmetic Surgery', count: 0, icon: 'magic' },
    { id: 'urology', name: 'Urology', count: 0, icon: 'procedures' },
    { id: 'general', name: 'General Medicine', count: 0, icon: 'medkit' },
  ]

  return c.json({
    success: true,
    data: categories,
    timestamp: new Date().toISOString(),
  })
})

// Get featured packages
packageRoutes.get('/featured', async (c) => {
  const featured = CARE_PACKAGES.filter(p => p.isFeatured && p.isActive)

  return c.json({
    success: true,
    data: featured,
    count: featured.length,
    timestamp: new Date().toISOString(),
  })
})

// Get package by ID or slug
packageRoutes.get('/:idOrSlug', async (c) => {
  const idOrSlug = c.req.param('idOrSlug')
  const pkg = CARE_PACKAGES.find(p => p.id === idOrSlug || p.slug === idOrSlug)

  if (!pkg) {
    return c.json({ success: false, error: 'Package not found' }, 404)
  }

  return c.json({
    success: true,
    data: pkg,
    timestamp: new Date().toISOString(),
  })
})

// Get package pricing with currency conversion
packageRoutes.get('/:id/pricing', async (c) => {
  const id = c.req.param('id')
  const currency = c.req.query('currency') || 'EUR'
  
  const pkg = CARE_PACKAGES.find(p => p.id === id)
  if (!pkg) {
    return c.json({ success: false, error: 'Package not found' }, 404)
  }

  const exchangeRates: Record<string, number> = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    CHF: 0.94,
    AED: 3.97,
  }

  const rate = exchangeRates[currency] || 1
  const convertedPrice = Math.round(pkg.finalPrice * rate * 100) / 100
  const convertedBasePrice = Math.round(pkg.basePrice * rate * 100) / 100

  return c.json({
    success: true,
    data: {
      packageId: id,
      packageName: pkg.name,
      pricing: {
        basePrice: convertedBasePrice,
        discount: pkg.discountPercent || 0,
        finalPrice: convertedPrice,
        currency: currency,
        originalCurrency: pkg.currency,
        exchangeRate: rate,
      },
      deposit: {
        required: true,
        amount: Math.round(convertedPrice * 0.3 * 100) / 100, // 30% deposit
        currency: currency,
      },
      paymentOptions: [
        { type: 'full', description: 'Pay in full', discount: 5 },
        { type: 'deposit', description: '30% deposit + balance before arrival', discount: 0 },
        { type: 'installment', description: '3 monthly installments', fee: 3 },
      ],
    },
    timestamp: new Date().toISOString(),
  })
})

// Purchase/book a package
packageRoutes.post('/:id/purchase', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const {
      patientId,
      patientEmail,
      patientName,
      patientPhone,
      preferredDate,
      currency = 'EUR',
      paymentOption = 'deposit',
      notes,
      affiliateCode,
    } = body

    const pkg = CARE_PACKAGES.find(p => p.id === id)
    if (!pkg) {
      return c.json({ success: false, error: 'Package not found' }, 404)
    }

    if (!patientEmail || !preferredDate) {
      return c.json({ 
        success: false, 
        error: 'patientEmail and preferredDate are required' 
      }, 400)
    }

    // Calculate payment amount based on option
    let amount = pkg.finalPrice
    if (paymentOption === 'deposit') {
      amount = Math.round(pkg.finalPrice * 0.3 * 100) / 100 // 30% deposit
    } else if (paymentOption === 'full') {
      amount = Math.round(pkg.finalPrice * 0.95 * 100) / 100 // 5% discount for full payment
    }

    // Create order/booking
    const orderId = `ORD-${Date.now()}-${crypto.randomUUID().substring(0, 4).toUpperCase()}`

    // Create Stripe checkout session
    let checkoutUrl = null
    if (c.env.STRIPE_SECRET_KEY) {
      const stripe = createStripeService(c.env.STRIPE_SECRET_KEY, c.env.STRIPE_WEBHOOK_SECRET)
      const session = await stripe.createCheckoutSession({
        customerEmail: patientEmail,
        lineItems: [{
          name: pkg.name,
          description: pkg.shortDescription,
          amount,
          currency,
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${c.req.url.split('/api')[0]}/booking/success?orderId=${orderId}`,
        cancelUrl: `${c.req.url.split('/api')[0]}/packages/${id}?cancelled=true`,
        metadata: {
          orderId,
          packageId: id,
          patientEmail,
          paymentOption,
        },
      })
      checkoutUrl = session.url
    }

    return c.json({
      success: true,
      data: {
        orderId,
        package: {
          id: pkg.id,
          name: pkg.name,
          duration: pkg.duration,
        },
        booking: {
          preferredDate,
          status: 'pending_payment',
        },
        payment: {
          amount,
          currency,
          paymentOption,
          checkoutUrl: checkoutUrl || null,
          instructions: !checkoutUrl ? 'Payment processing not configured. Contact support.' : null,
        },
        patient: {
          email: patientEmail,
          name: patientName,
          phone: patientPhone,
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    logger.error('Package purchase error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get package reviews
packageRoutes.get('/:id/reviews', async (c) => {
  const id = c.req.param('id')
  const pkg = CARE_PACKAGES.find(p => p.id === id)

  if (!pkg) {
    return c.json({ success: false, error: 'Package not found' }, 404)
  }

  // Mock reviews
  const reviews = [
    {
      id: 'rev_1',
      patientName: 'Maria S.',
      country: 'Germany',
      rating: 5,
      title: 'Life-changing experience',
      text: 'The entire process was seamless. From the initial consultation to the surgery and recovery, everything was handled professionally.',
      date: '2024-02-15',
      verified: true,
    },
    {
      id: 'rev_2',
      patientName: 'John D.',
      country: 'UK',
      rating: 5,
      title: 'Exceeded expectations',
      text: 'German medical expertise combined with the beautiful Red Sea recovery setting. Could not have asked for more.',
      date: '2024-01-28',
      verified: true,
    },
    {
      id: 'rev_3',
      patientName: 'Ahmed K.',
      country: 'UAE',
      rating: 4,
      title: 'Great care, minor delays',
      text: 'The medical care was excellent. Only minor issue was some scheduling delays, but overall very satisfied.',
      date: '2024-01-10',
      verified: true,
    },
  ]

  return c.json({
    success: true,
    data: {
      packageId: id,
      averageRating: pkg.rating,
      totalReviews: pkg.reviewCount,
      reviews,
    },
    timestamp: new Date().toISOString(),
  })
})

// Compare packages
packageRoutes.post('/compare', async (c) => {
  try {
    const body = await c.req.json()
    const { packageIds } = body

    if (!packageIds || !Array.isArray(packageIds) || packageIds.length < 2) {
      return c.json({ 
        success: false, 
        error: 'Provide at least 2 packageIds to compare' 
      }, 400)
    }

    const packages = packageIds
      .map(id => CARE_PACKAGES.find(p => p.id === id))
      .filter(Boolean)

    if (packages.length < 2) {
      return c.json({ 
        success: false, 
        error: 'Could not find enough packages to compare' 
      }, 404)
    }

    const comparison = {
      packages: packages.map(p => ({
        id: p!.id,
        name: p!.name,
        category: p!.category,
        price: p!.finalPrice,
        currency: p!.currency,
        duration: p!.duration,
        rating: p!.rating,
        reviewCount: p!.reviewCount,
        features: p!.features,
        inclusions: p!.inclusions.map(i => i.name),
        doctors: p!.doctorIds.length,
      })),
    }

    return c.json({
      success: true,
      data: comparison,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
