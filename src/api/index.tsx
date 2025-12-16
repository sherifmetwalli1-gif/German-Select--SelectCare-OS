/**
 * API Routes Index
 * German Select Health Platform - SelectCareOS
 * 
 * Route Structure:
 * /api/health - Health check
 * /api/auth/* - Authentication (login, register, refresh, etc.)
 * /api/payments/* - Payment processing (Stripe)
 * /api/telemedicine-v2/* - Advanced telemedicine (WebRTC)
 * /api/rpm/* - Remote Patient Monitoring
 * /api/* - Core API routes (patients, doctors, etc.)
 */

import { Hono } from 'hono'
import { authRoutes } from './auth'
import { paymentRoutes } from './payments'
import { telemedicineRoutes } from './telemedicine-live'
import { rpmRoutes } from './rpm'
import { alertRoutes } from './alerts'

export const apiRoutes = new Hono()

// Mount specialized API routes
apiRoutes.route('/auth', authRoutes)
apiRoutes.route('/payments', paymentRoutes)
apiRoutes.route('/telemedicine-v2', telemedicineRoutes)
apiRoutes.route('/rpm', rpmRoutes)
apiRoutes.route('/alerts', alertRoutes)

// ============================================================================
// CORE API ROUTES (Mock data for demo)
// ============================================================================

// Mock data
const patients = [
  { id: '1', name: 'Max Mustermann', email: 'max@example.de', status: 'active', recoveryProgress: 75 },
  { id: '2', name: 'Anna Schmidt', email: 'anna@example.de', status: 'active', recoveryProgress: 45 },
  { id: '3', name: 'Peter Müller', email: 'peter@example.de', status: 'pre-op', recoveryProgress: 80 }
]

const doctors = [
  { id: '1', name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', hospital: 'German Select Egypt', available: true, rating: 4.9 },
  { id: '2', name: 'Dr. K. Müller', specialty: 'Cardiologist', hospital: 'University Hospital Kiel', available: true, rating: 4.8 },
  { id: '3', name: 'Dr. A. Schmidt', specialty: 'Nutritionist', hospital: 'German Select Egypt', available: true, rating: 4.7 },
  { id: '4', name: 'Dr. Sherif Akram Metwalli', specialty: 'Bariatric & Colorectal Surgeon', hospital: 'Bielefeld University Hospitals', available: true, rating: 4.9 }
]

const appointments = [
  { id: '1', patientId: '1', doctorId: '2', type: 'Cardiology Consult', date: '2024-10-22', time: '10:00', status: 'scheduled' },
  { id: '2', patientId: '1', doctorId: '3', type: 'Nutrition Plan', date: '2024-11-05', time: '14:00', status: 'scheduled' },
  { id: '3', patientId: '1', doctorId: '1', type: 'Follow-up', date: '2024-10-19', time: '09:00', status: 'completed' }
]

const vitals = [
  { id: '1', patientId: '1', type: 'heart_rate', value: 72, unit: 'bpm', timestamp: new Date().toISOString() },
  { id: '2', patientId: '1', type: 'blood_pressure', value: '128/82', unit: 'mmHg', timestamp: new Date().toISOString() },
  { id: '3', patientId: '1', type: 'spo2', value: 98, unit: '%', timestamp: new Date().toISOString() },
  { id: '4', patientId: '1', type: 'weight', value: 78.5, unit: 'kg', timestamp: new Date().toISOString() },
  { id: '5', patientId: '1', type: 'steps', value: 4230, unit: 'steps', timestamp: new Date().toISOString() }
]

const procedures = [
  { id: '1', name: 'Gastric Sleeve', category: 'Bariatric', price: 8500, description: 'Laparoscopic sleeve gastrectomy' },
  { id: '2', name: 'Knee Replacement', category: 'Orthopedic', price: 12000, description: 'Total knee arthroplasty' },
  { id: '3', name: 'Facelift', category: 'Aesthetics', price: 6500, description: 'Full facelift with neck lift' },
  { id: '4', name: 'Dental Implants', category: 'Dental', price: 1800, description: 'Single tooth implant with crown' }
]

const accommodations = [
  { id: '1', name: 'Steigenberger Resort', type: '5-Star Hotel', price: 180, rating: 4.9 },
  { id: '2', name: 'Recovery Villa', type: 'Private Villa', price: 450, rating: 5.0 },
  { id: '3', name: 'Wellness Retreat', type: 'Medical Spa', price: 250, rating: 4.8 }
]

const excursions = [
  { id: '1', name: 'Yacht Day Trip', duration: '6 hours', price: 350 },
  { id: '2', name: 'Snorkeling Tour', duration: '4 hours', price: 85 },
  { id: '3', name: 'Desert Safari', duration: '5 hours', price: 120 },
  { id: '4', name: 'Sunset Cruise', duration: '3 hours', price: 95 }
]

// Patients API
apiRoutes.get('/patients', (c) => {
  return c.json({ success: true, data: patients })
})

apiRoutes.get('/patients/:id', (c) => {
  const id = c.req.param('id')
  const patient = patients.find(p => p.id === id)
  if (!patient) {
    return c.json({ success: false, error: 'Patient not found' }, 404)
  }
  return c.json({ success: true, data: patient })
})

// Doctors API
apiRoutes.get('/doctors', (c) => {
  const specialty = c.req.query('specialty')
  let filtered = doctors
  if (specialty) {
    filtered = doctors.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()))
  }
  return c.json({ success: true, data: filtered })
})

apiRoutes.get('/doctors/:id', (c) => {
  const id = c.req.param('id')
  const doctor = doctors.find(d => d.id === id)
  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404)
  }
  return c.json({ success: true, data: doctor })
})

// Appointments API
apiRoutes.get('/appointments', (c) => {
  const patientId = c.req.query('patientId')
  const doctorId = c.req.query('doctorId')
  let filtered = appointments
  if (patientId) {
    filtered = filtered.filter(a => a.patientId === patientId)
  }
  if (doctorId) {
    filtered = filtered.filter(a => a.doctorId === doctorId)
  }
  return c.json({ success: true, data: filtered })
})

apiRoutes.post('/appointments', async (c) => {
  try {
    const body = await c.req.json()
    const newAppointment = {
      id: String(appointments.length + 1),
      ...body,
      status: 'scheduled'
    }
    appointments.push(newAppointment)
    return c.json({ success: true, data: newAppointment }, 201)
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// Vitals API (basic - use /rpm/* for advanced)
apiRoutes.get('/vitals', (c) => {
  const patientId = c.req.query('patientId')
  const type = c.req.query('type')
  let filtered = vitals
  if (patientId) {
    filtered = filtered.filter(v => v.patientId === patientId)
  }
  if (type) {
    filtered = filtered.filter(v => v.type === type)
  }
  return c.json({ success: true, data: filtered })
})

apiRoutes.post('/vitals', async (c) => {
  try {
    const body = await c.req.json()
    const newVital = {
      id: String(vitals.length + 1),
      ...body,
      timestamp: new Date().toISOString()
    }
    vitals.push(newVital)
    return c.json({ success: true, data: newVital }, 201)
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// Risk Calculator API
apiRoutes.post('/risk-calculator', async (c) => {
  try {
    const body = await c.req.json()
    const { calculatorType, ...params } = body
    
    let result: { score: number; risk: string; recommendations: string[] }
    
    switch (calculatorType) {
      case 'bmi':
        const bmi = params.weight / Math.pow(params.height / 100, 2)
        let category = 'Normal'
        if (bmi < 18.5) category = 'Underweight'
        else if (bmi >= 25 && bmi < 30) category = 'Overweight'
        else if (bmi >= 30) category = 'Obese'
        result = {
          score: parseFloat(bmi.toFixed(1)),
          risk: category,
          recommendations: category !== 'Normal' ? ['Consult with nutritionist', 'Regular exercise recommended'] : ['Maintain current lifestyle']
        }
        break
      
      case 'cardiovascular':
        const cvRisk = Math.random() * 15
        result = {
          score: parseFloat(cvRisk.toFixed(1)),
          risk: cvRisk < 5 ? 'Low' : cvRisk < 10 ? 'Moderate' : 'High',
          recommendations: ['Regular BP monitoring', 'Heart-healthy diet', 'Regular exercise']
        }
        break
      
      default:
        return c.json({ success: false, error: 'Unknown calculator type' }, 400)
    }
    
    return c.json({ success: true, data: result })
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// CareSelect™ Journeys API
apiRoutes.get('/procedures', (c) => {
  const category = c.req.query('category')
  let filtered = procedures
  if (category) {
    filtered = procedures.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }
  return c.json({ success: true, data: filtered })
})

apiRoutes.get('/accommodations', (c) => {
  return c.json({ success: true, data: accommodations })
})

apiRoutes.get('/excursions', (c) => {
  return c.json({ success: true, data: excursions })
})

// Package builder API
apiRoutes.post('/packages/build', async (c) => {
  try {
    const body = await c.req.json()
    const { procedureId, accommodationId, excursionIds = [], nights = 7 } = body
    
    const procedure = procedures.find(p => p.id === procedureId)
    const accommodation = accommodations.find(a => a.id === accommodationId)
    const selectedExcursions = excursions.filter(e => excursionIds.includes(e.id))
    
    if (!procedure || !accommodation) {
      return c.json({ success: false, error: 'Invalid procedure or accommodation' }, 400)
    }
    
    const accommodationTotal = accommodation.price * nights
    const excursionsTotal = selectedExcursions.reduce((sum, e) => sum + e.price, 0)
    const total = procedure.price + accommodationTotal + excursionsTotal
    
    return c.json({
      success: true,
      data: {
        procedure,
        accommodation,
        nights,
        excursions: selectedExcursions,
        pricing: {
          procedure: procedure.price,
          accommodation: accommodationTotal,
          excursions: excursionsTotal,
          total
        }
      }
    })
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// AI Chat API with guardrails
apiRoutes.post('/ai/chat', async (c) => {
  try {
    const body = await c.req.json()
    const { message } = body
    
    // Import guardrails dynamically to avoid circular deps
    const { analyzeMessageSafety, wrapAIResponse, MEDICAL_DISCLAIMER } = await import('../lib/ai-guardrails')
    
    // Check message safety
    const safety = analyzeMessageSafety(message)
    
    if (safety.action === 'emergency' || safety.action === 'block') {
      return c.json({
        success: true,
        data: {
          response: safety.responseOverride,
          isEmergency: safety.action === 'emergency',
          disclaimer: MEDICAL_DISCLAIMER.short,
          timestamp: new Date().toISOString()
        }
      })
    }
    
    // Mock AI responses
    const responses: { [key: string]: string } = {
      'blood pressure': 'Blood pressure readings are categorized as follows: Normal (<120/80), Elevated (120-129/<80), High Stage 1 (130-139/80-89), High Stage 2 (≥140/≥90). Always consult your healthcare provider for personalized advice.',
      'recovery': 'Recovery timelines vary by procedure. Generally: Week 1-2 focuses on rest and wound healing, Weeks 3-4 on gentle mobility, Weeks 5-8 on strengthening. Follow your care team\'s specific guidance.',
      'diet': 'Post-surgery nutrition is crucial. Focus on high-protein foods, stay hydrated, eat small frequent meals, and avoid processed foods. Your nutritionist can provide a personalized plan.',
      'default': 'I\'m here to help with health-related questions. I can provide information about risk calculators, explain lab results, offer recovery tips, and more. What would you like to know?'
    }
    
    let response = responses.default
    for (const [key, value] of Object.entries(responses)) {
      if (message.toLowerCase().includes(key)) {
        response = value
        break
      }
    }
    
    // Wrap response with safety disclaimer
    const wrapped = wrapAIResponse(response, { confidence: 0.85 })
    
    return c.json({
      success: true,
      data: {
        response: wrapped.response,
        disclaimer: wrapped.disclaimer,
        metadata: wrapped.metadata,
        timestamp: new Date().toISOString()
      }
    })
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// Messages API
apiRoutes.get('/messages', (c) => {
  const messages = [
    { id: '1', from: 'Dr. L. Weber', message: 'Your progress looks excellent!', timestamp: '2024-10-21T10:30:00Z', read: false },
    { id: '2', from: 'S. Ahmed', message: 'Accommodation confirmed.', timestamp: '2024-10-20T14:00:00Z', read: true },
    { id: '3', from: 'Dr. A. Schmidt', message: 'Meal plan updated.', timestamp: '2024-10-20T09:00:00Z', read: true }
  ]
  return c.json({ success: true, data: messages })
})

// Timeline API
apiRoutes.get('/timeline', (c) => {
  const timeline = [
    { week: '-4', title: 'Initial Consultation', status: 'completed', date: 'Sep 15-21' },
    { week: '-2', title: 'Pre-Op Optimization', status: 'completed', date: 'Sep 29 - Oct 5' },
    { week: '-1', title: 'Final Preparation', status: 'completed', date: 'Oct 6-11' },
    { week: '0', title: 'Surgery', status: 'completed', date: 'Oct 12' },
    { week: '1', title: 'Initial Assessment', status: 'completed', date: 'Oct 15-21' },
    { week: '2', title: 'Basic Rehabilitation', status: 'current', date: 'Oct 22-28' },
    { week: '3', title: 'Mobility Training', status: 'upcoming', date: 'Oct 29 - Nov 4' },
    { week: '6', title: 'Advanced Strengthening', status: 'upcoming', date: 'Nov 19-25' },
    { week: '12', title: '3-Month Assessment', status: 'upcoming', date: 'Jan 12, 2025' }
  ]
  return c.json({ success: true, data: timeline })
})

apiRoutes.get('/timeline/:patientId', (c) => {
  const timeline = [
    { week: '-4', title: 'Initial Consultation', status: 'completed', date: 'Sep 15-21' },
    { week: '0', title: 'Surgery', status: 'completed', date: 'Oct 12' },
    { week: '2', title: 'Basic Rehabilitation', status: 'current', date: 'Oct 22-28' },
    { week: '3', title: 'Mobility Training', status: 'upcoming', date: 'Oct 29 - Nov 4' }
  ]
  return c.json({ success: true, data: timeline })
})

// SelectScore API
apiRoutes.get('/selectscore', (c) => {
  return c.json({
    success: true,
    data: {
      score: 85,
      trend: '+5',
      category: 'Excellent',
      breakdown: {
        adherence: 90,
        vitals: 85,
        activity: 80,
        nutrition: 85
      },
      lastUpdated: new Date().toISOString()
    }
  })
})

apiRoutes.get('/selectscore/:patientId', (c) => {
  return c.json({
    success: true,
    data: {
      score: 85,
      trend: '+5',
      category: 'Excellent',
      breakdown: {
        adherence: 90,
        vitals: 85,
        activity: 80,
        nutrition: 85
      },
      lastUpdated: new Date().toISOString()
    }
  })
})

// Membership tiers
apiRoutes.get('/memberships', (c) => {
  const memberships = [
    { id: 'silver', name: 'Silver', price: 49, currency: 'EUR', period: 'month', features: ['Basic telemedicine', 'Health tracking', 'Email support'] },
    { id: 'gold', name: 'Gold', price: 99, currency: 'EUR', period: 'month', features: ['Unlimited telemedicine', 'AI diagnostics', 'Priority support', 'RPM devices'] },
    { id: 'platinum', name: 'Platinum', price: 199, currency: 'EUR', period: 'month', features: ['All Gold features', '24/7 concierge', 'Personal care coordinator', 'Exclusive discounts'] }
  ]
  return c.json({ success: true, data: memberships })
})

// Surgery packages
apiRoutes.get('/surgery-packages', (c) => {
  const packages = [
    { id: 'essential', name: 'Essential Journey', price: 6500, includes: ['German-certified surgeon', 'Hospital stay (3-5 days)', 'Airport transfers', 'Digital follow-up'] },
    { id: 'premium', name: 'Premium Journey', price: 12000, includes: ['All Essential features', '5-star resort recovery', 'Personal coordinator', 'Wellness treatments'] },
    { id: 'crown', name: 'Crown Journey', price: 22000, includes: ['All Premium features', 'Private villa with chef', '24/7 supervision', 'Yacht excursions'] }
  ]
  return c.json({ success: true, data: packages })
})
