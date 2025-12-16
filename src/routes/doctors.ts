/**
 * Doctor Routes
 * Medical specialist management and search
 */

import { Hono } from 'hono'
import { DatabaseService } from '../services/database'
import type { Bindings, Variables, Doctor } from '../types'

export const doctorRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// German Select team data (embedded for Cloudflare Workers compatibility)
const GERMAN_SELECT_TEAM: Partial<Doctor>[] = [
  {
    id: 'dr_post_bariatric',
    name: 'Dr. Klaus Weber',
    title: 'Consultant of Post-Bariatric Plastic and Reconstructive Surgery',
    specialization: 'Plastic and Reconstructive Surgery',
    location: 'Germany',
    department: 'Plastic Surgery',
    certifications: ['German Board Certified', 'Post-Bariatric Specialist'],
    languages: ['German', 'English'],
    experienceYears: 15,
    education: 'Charité - Universitätsmedizin Berlin',
    researchInterests: ['Post-weight loss body contouring', 'Reconstructive surgery'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 150,
    currency: 'EUR',
    rating: 4.9,
    reviewCount: 127,
    isPremium: true,
    premiumTier: 'enterprise',
    bio: 'Leading expert in post-bariatric body contouring with over 3000 successful procedures.',
    status: 'active',
    commissionRate: 15,
  },
  {
    id: 'dr_urology_andrology',
    name: 'Dr. Hans Müller',
    title: 'Consultant Urology and Andrology',
    specialization: 'Urology and Andrology',
    location: 'Hmmling Hospital, Sgel, Niedersachsen, Germany',
    department: 'Urology',
    certifications: ['German Board Certified Urologist', 'Andrology Specialist'],
    languages: ['German', 'English'],
    experienceYears: 12,
    education: 'University of Heidelberg',
    researchInterests: ['Male reproductive health', 'Urological conditions'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 120,
    currency: 'EUR',
    rating: 4.8,
    reviewCount: 89,
    isPremium: true,
    premiumTier: 'professional',
    bio: 'Specialized in minimally invasive urological procedures and male fertility treatments.',
    status: 'active',
    commissionRate: 18,
  },
  {
    id: 'dr_bariatric_antireflux',
    name: 'Dr. Friedrich Schmidt',
    title: 'Consultant of Bariatric and Antireflux Surgery',
    specialization: 'Bariatric Surgery, Antireflux Surgery, Colorectal Surgery',
    location: 'Munich, Germany',
    department: 'General Surgery',
    certifications: ['German Board Certified Surgeon', 'Bariatric Specialist', 'Nutritional Medicine'],
    languages: ['German', 'English', 'Arabic'],
    experienceYears: 18,
    education: 'Ludwig Maximilian University of Munich',
    researchInterests: ['Bariatric surgery outcomes', 'Metabolic surgery', 'Nutritional medicine'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 200,
    currency: 'EUR',
    rating: 4.95,
    reviewCount: 234,
    isPremium: true,
    premiumTier: 'enterprise',
    bio: 'Pioneer in robotic bariatric surgery with international acclaim.',
    status: 'active',
    commissionRate: 12,
  },
  {
    id: 'dr_arthroscopy_sports',
    name: 'Dr. Stefan Bauer',
    title: 'Head of Arthroscopy and Sports Injuries',
    specialization: 'Orthopedic Surgery, Sports Medicine, Arthroscopy',
    location: 'Frankfurt, Germany',
    department: 'Orthopedics',
    certifications: ['German Board Certified Orthopedic Surgeon', 'Sports Medicine Specialist'],
    languages: ['German', 'English'],
    experienceYears: 20,
    education: 'Goethe University Frankfurt',
    researchInterests: ['Sports injuries', 'Arthroscopic surgery', 'Joint preservation'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 180,
    currency: 'EUR',
    rating: 4.85,
    reviewCount: 156,
    isPremium: true,
    premiumTier: 'professional',
    bio: 'Trusted by professional athletes for knee and shoulder reconstructions.',
    status: 'active',
    commissionRate: 15,
  },
  {
    id: 'dr_cardiology',
    name: 'Prof. Dr. Michael Richter',
    title: 'Associate Professor of Cardiology',
    specialization: 'Cardiology',
    location: 'University Hospital Kiel, Germany',
    department: 'Cardiology',
    certifications: ['German Board Certified Cardiologist', 'Academic Professor'],
    languages: ['German', 'English'],
    experienceYears: 16,
    education: 'Christian-Albrechts-Universität zu Kiel',
    researchInterests: ['Cardiovascular disease', 'Heart failure', 'Academic cardiology'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 250,
    currency: 'EUR',
    rating: 4.92,
    reviewCount: 198,
    isPremium: true,
    premiumTier: 'enterprise',
    bio: 'Leading researcher in heart failure treatment with 200+ published papers.',
    status: 'active',
    commissionRate: 10,
  },
  {
    id: 'dr_anesthesia_pain',
    name: 'Dr. Thomas Fischer',
    title: 'Consultant Anesthesia and Pain Management',
    specialization: 'Anesthesiology, Pain Management, Intensive Care',
    location: 'Academic Hospital of Oldenburg University, Germany',
    department: 'Anesthesiology',
    certifications: ['German Board Certified Anesthesiologist', 'Pain Management Specialist'],
    languages: ['German', 'English'],
    experienceYears: 14,
    education: 'Carl von Ossietzky University of Oldenburg',
    researchInterests: ['Pain management', 'Intensive care medicine', 'Anesthesia safety'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 130,
    currency: 'EUR',
    rating: 4.75,
    reviewCount: 67,
    isPremium: false,
    bio: 'Expert in chronic pain management and perioperative care.',
    status: 'active',
    commissionRate: 20,
  },
  {
    id: 'dr_internal_gastroenterology',
    name: 'Dr. Andreas Hoffmann',
    title: 'Specialist in Internal Medicine and Gastroenterology',
    specialization: 'Internal Medicine, Gastroenterology, Palliative Medicine',
    location: 'Hamburg, Germany',
    department: 'Internal Medicine',
    certifications: ['German Board Certified Internist', 'Gastroenterologist'],
    languages: ['German', 'English'],
    experienceYears: 17,
    education: 'University of Hamburg',
    researchInterests: ['Gastrointestinal diseases', 'Palliative care', 'Internal medicine'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 140,
    currency: 'EUR',
    rating: 4.78,
    reviewCount: 112,
    isPremium: true,
    premiumTier: 'basic',
    bio: 'Specialized in complex digestive disorders and comprehensive internal medicine.',
    status: 'active',
    commissionRate: 18,
  },
  {
    id: 'dr_anesthesia_head',
    name: 'Dr. Markus Klein',
    title: 'Head of Anesthesia and Pain Management',
    specialization: 'Anesthesiology, Pain Management',
    location: 'Medias Hospital, Germany',
    department: 'Anesthesiology',
    certifications: ['German Board Certified Anesthesiologist', 'Pain Management Specialist'],
    languages: ['German', 'English'],
    experienceYears: 19,
    education: 'University of Düsseldorf',
    researchInterests: ['Anesthesia techniques', 'Pain management protocols', 'Patient safety'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 160,
    currency: 'EUR',
    rating: 4.82,
    reviewCount: 94,
    isPremium: true,
    premiumTier: 'professional',
    bio: 'Department head with expertise in regional anesthesia and multimodal pain therapy.',
    status: 'active',
    commissionRate: 15,
  },
  {
    id: 'dr_general_gastrointestinal',
    name: 'Dr. Wolfgang Schröder',
    title: 'Consultant General and Gastrointestinal Surgery',
    specialization: 'General Surgery, Gastrointestinal Surgery',
    location: 'St. Augustinus Krankenhaus, Düren, Germany',
    department: 'General Surgery',
    certifications: ['German Board Certified Surgeon', 'Gastrointestinal Specialist'],
    languages: ['German', 'English'],
    experienceYears: 13,
    education: 'RWTH Aachen University',
    researchInterests: ['Gastrointestinal surgery', 'Minimally invasive techniques'],
    availability: 'Telemedicine & Onsite',
    consultationFee: 145,
    currency: 'EUR',
    rating: 4.7,
    reviewCount: 78,
    isPremium: false,
    bio: 'Specialist in laparoscopic and minimally invasive gastrointestinal procedures.',
    status: 'active',
    commissionRate: 20,
  },
]

// Get all doctors
doctorRoutes.get('/', async (c) => {
  try {
    const specialization = c.req.query('specialization')
    const isPremium = c.req.query('isPremium')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = parseInt(c.req.query('offset') || '0')

    // Filter doctors
    let filteredDoctors = [...GERMAN_SELECT_TEAM]

    if (specialization) {
      filteredDoctors = filteredDoctors.filter(d => 
        d.specialization?.toLowerCase().includes(specialization.toLowerCase())
      )
    }

    if (isPremium !== undefined) {
      filteredDoctors = filteredDoctors.filter(d => 
        d.isPremium === (isPremium === 'true')
      )
    }

    // Sort: premium first, then by rating
    filteredDoctors.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1
      if (!a.isPremium && b.isPremium) return 1
      return (b.rating || 0) - (a.rating || 0)
    })

    const total = filteredDoctors.length
    const paginatedDoctors = filteredDoctors.slice(offset, offset + limit)

    return c.json({
      success: true,
      data: paginatedDoctors,
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

// Search doctors
doctorRoutes.get('/search', async (c) => {
  try {
    const query = c.req.query('q')?.toLowerCase()
    const specialization = c.req.query('specialization')?.toLowerCase()
    const language = c.req.query('language')?.toLowerCase()
    const minExperience = parseInt(c.req.query('minExperience') || '0')
    const maxFee = parseFloat(c.req.query('maxFee') || '10000')
    const minRating = parseFloat(c.req.query('minRating') || '0')

    let results = [...GERMAN_SELECT_TEAM]

    if (query) {
      results = results.filter(d =>
        d.name?.toLowerCase().includes(query) ||
        d.specialization?.toLowerCase().includes(query) ||
        d.bio?.toLowerCase().includes(query) ||
        d.department?.toLowerCase().includes(query)
      )
    }

    if (specialization) {
      results = results.filter(d =>
        d.specialization?.toLowerCase().includes(specialization)
      )
    }

    if (language) {
      results = results.filter(d =>
        d.languages?.some(l => l.toLowerCase() === language)
      )
    }

    if (minExperience > 0) {
      results = results.filter(d => (d.experienceYears || 0) >= minExperience)
    }

    if (maxFee < 10000) {
      results = results.filter(d => (d.consultationFee || 0) <= maxFee)
    }

    if (minRating > 0) {
      results = results.filter(d => (d.rating || 0) >= minRating)
    }

    // Sort: premium first, then by relevance (rating)
    results.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1
      if (!a.isPremium && b.isPremium) return 1
      return (b.rating || 0) - (a.rating || 0)
    })

    return c.json({
      success: true,
      data: results,
      count: results.length,
      filters: { query, specialization, language, minExperience, maxFee, minRating },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get specializations
doctorRoutes.get('/specializations', async (c) => {
  const specializations = [...new Set(
    GERMAN_SELECT_TEAM
      .flatMap(d => d.specialization?.split(', ') || [])
      .filter(Boolean)
  )].sort()

  return c.json({
    success: true,
    data: specializations,
    count: specializations.length,
    timestamp: new Date().toISOString(),
  })
})

// Get doctor by ID
doctorRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')
  const doctor = GERMAN_SELECT_TEAM.find(d => d.id === id)

  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404)
  }

  return c.json({
    success: true,
    data: doctor,
    timestamp: new Date().toISOString(),
  })
})

// Get doctor availability/slots
doctorRoutes.get('/:id/availability', async (c) => {
  const id = c.req.param('id')
  const doctor = GERMAN_SELECT_TEAM.find(d => d.id === id)

  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404)
  }

  // Generate mock availability for next 14 days
  const slots = []
  const now = new Date()
  
  for (let day = 1; day <= 14; day++) {
    const date = new Date(now)
    date.setDate(date.getDate() + day)
    
    // Skip weekends for some doctors
    if (date.getDay() === 0 || date.getDay() === 6) continue

    // Generate 4-6 slots per day
    const slotCount = 4 + Math.floor(Math.random() * 3)
    const startHour = 9
    
    for (let i = 0; i < slotCount; i++) {
      const hour = startHour + i * 2
      if (hour >= 17) continue
      
      slots.push({
        id: `${id}_${date.toISOString().split('T')[0]}_${hour}`,
        doctorId: id,
        date: date.toISOString().split('T')[0],
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        isBooked: Math.random() > 0.7, // 30% already booked
        consultationType: doctor.availability?.includes('Telemedicine') ? 'telemedicine' : 'onsite',
      })
    }
  }

  return c.json({
    success: true,
    data: {
      doctorId: id,
      doctorName: doctor.name,
      consultationFee: doctor.consultationFee,
      currency: doctor.currency,
      slots: slots.filter(s => !s.isBooked),
    },
    timestamp: new Date().toISOString(),
  })
})

// Get doctor reviews
doctorRoutes.get('/:id/reviews', async (c) => {
  const id = c.req.param('id')
  const doctor = GERMAN_SELECT_TEAM.find(d => d.id === id)

  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404)
  }

  // Generate mock reviews
  const reviewTemplates = [
    { rating: 5, text: 'Excellent doctor! Very thorough and professional.' },
    { rating: 5, text: 'Highly recommend. The telemedicine consultation was seamless.' },
    { rating: 4, text: 'Very knowledgeable and caring. Wait time was a bit long.' },
    { rating: 5, text: 'Best experience ever. Will definitely come back.' },
    { rating: 4, text: 'Great consultation, explained everything clearly.' },
  ]

  const reviews = reviewTemplates.slice(0, Math.min(5, doctor.reviewCount || 5)).map((r, i) => ({
    id: `review_${id}_${i}`,
    patientName: `Patient ${i + 1}`,
    rating: r.rating,
    text: r.text,
    date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  }))

  return c.json({
    success: true,
    data: {
      doctorId: id,
      averageRating: doctor.rating,
      totalReviews: doctor.reviewCount,
      reviews,
    },
    timestamp: new Date().toISOString(),
  })
})

// Premium doctor listing info
doctorRoutes.get('/:id/premium', async (c) => {
  const id = c.req.param('id')
  const doctor = GERMAN_SELECT_TEAM.find(d => d.id === id)

  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404)
  }

  return c.json({
    success: true,
    data: {
      doctorId: id,
      isPremium: doctor.isPremium,
      tier: doctor.premiumTier || null,
      benefits: doctor.isPremium ? [
        'Featured in search results',
        'Priority booking slots',
        'Enhanced profile visibility',
        'Analytics dashboard access',
        doctor.premiumTier === 'enterprise' ? 'Dedicated account manager' : null,
        doctor.premiumTier !== 'basic' ? 'Video profile enabled' : null,
      ].filter(Boolean) : [],
      upgrade: !doctor.isPremium ? {
        tiers: ['basic', 'professional', 'enterprise'],
        pricing: {
          basic: { monthly: 199, yearly: 1990 },
          professional: { monthly: 399, yearly: 3990 },
          enterprise: { monthly: 799, yearly: 7990 },
        },
      } : null,
    },
    timestamp: new Date().toISOString(),
  })
})
