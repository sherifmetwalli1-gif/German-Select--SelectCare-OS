import { Hono } from 'hono'

export const apiRoutes = new Hono()

// Health check
apiRoutes.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' })
})

// Patient endpoints
apiRoutes.get('/patients', (c) => {
  return c.json({
    patients: [
      { id: 'GS-2024-0847', name: 'Max Mustermann', status: 'active', recovery: 75 },
      { id: 'GS-2024-0848', name: 'Anna Weber', status: 'active', recovery: 60 },
      { id: 'GS-2024-0849', name: 'Karl Fischer', status: 'pending', recovery: 0 }
    ]
  })
})

apiRoutes.get('/patients/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    id,
    name: 'Max Mustermann',
    email: 'max.mustermann@email.de',
    phone: '+49 151 1234 5678',
    dob: '1978-03-15',
    bloodType: 'A+',
    allergies: ['Penicillin'],
    conditions: ['Hypertension (controlled)'],
    selectScore: 85,
    recovery: 75,
    membership: 'Gold'
  })
})

// Appointments
apiRoutes.get('/appointments', (c) => {
  return c.json({
    appointments: [
      { id: 1, type: 'Cardiology Consult', doctor: 'Dr. K. Müller', date: '2024-10-22', time: '10:00', status: 'upcoming' },
      { id: 2, type: 'Nutrition Plan', doctor: 'Dr. A. Schmidt', date: '2024-11-05', time: '14:00', status: 'upcoming' },
      { id: 3, type: 'Initial Assessment', doctor: 'Dr. L. Weber', date: '2024-10-15', time: '09:00', status: 'completed' }
    ]
  })
})

apiRoutes.post('/appointments', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    appointment: {
      id: Date.now(),
      ...body,
      status: 'confirmed'
    }
  })
})

// Timeline / Care Plan
apiRoutes.get('/timeline', (c) => {
  return c.json({
    currentPhase: 'Recovery',
    progress: 75,
    startDate: '2024-10-12',
    expectedEndDate: '2025-01-12',
    milestones: [
      { week: 1, title: 'Initial Assessment', status: 'completed', dateRange: 'Oct 15-21' },
      { week: 2, title: 'Basic Rehabilitation', status: 'current', dateRange: 'Oct 22-28' },
      { week: 3, title: 'Mobility Training', status: 'upcoming', dateRange: 'Oct 29 - Nov 4' },
      { week: 6, title: 'Advanced Strengthening', status: 'upcoming', dateRange: 'Nov 19-25' }
    ]
  })
})

// RPM / Vitals
apiRoutes.get('/vitals', (c) => {
  return c.json({
    lastSync: new Date().toISOString(),
    vitals: {
      heartRate: { value: 72, unit: 'bpm', status: 'normal', trend: 'stable' },
      bloodPressure: { value: '128/82', unit: 'mmHg', status: 'normal', trend: 'down' },
      temperature: { value: 36.6, unit: '°C', status: 'normal' },
      spo2: { value: 98, unit: '%', status: 'normal' },
      weight: { value: 78.5, unit: 'kg', trend: 'down', status: 'normal' },
      bloodGlucose: { value: 95, unit: 'mg/dL', status: 'normal' }
    },
    activity: {
      steps: { current: 4230, target: 8000 },
      activeMinutes: { current: 45, target: 60 },
      caloriesBurned: 1840
    },
    sleep: {
      duration: '7h 22m',
      score: 82,
      deep: '1h 15m',
      light: '3h 45m',
      rem: '1h 52m',
      awake: '30m'
    }
  })
})

apiRoutes.post('/vitals', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    recorded: {
      ...body,
      timestamp: new Date().toISOString()
    }
  })
})

// Care Team / Doctors
apiRoutes.get('/care-team', (c) => {
  return c.json({
    team: [
      { id: 1, name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', hospital: 'German Select Egypt', rating: 4.9, available: true },
      { id: 2, name: 'Dr. K. Müller', specialty: 'Cardiologist', hospital: 'University Hospital Kiel', rating: 4.8, available: true },
      { id: 3, name: 'Dr. A. Schmidt', specialty: 'Nutritionist', role: 'Nutrition Planning', rating: 4.7, available: true },
      { id: 4, name: 'M. Hassan', specialty: 'Physiotherapist', role: 'Rehabilitation', rating: 4.8, available: true }
    ]
  })
})

apiRoutes.get('/doctors', (c) => {
  return c.json({
    doctors: [
      { id: 1, name: 'Dr. Sherif Akram Metwalli', specialty: 'Bariatric & Colorectal Surgery', hospital: 'Bielefeld University Hospitals', rating: 4.9 },
      { id: 2, name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', rating: 4.9 },
      { id: 3, name: 'Dr. K. Müller', specialty: 'Cardiologist', hospital: 'University Hospital Kiel', rating: 4.8 },
      { id: 4, name: 'Dr. Sherif Aly', specialty: 'Bariatric & Anti-Reflux Surgery', hospital: 'Nagold Hospitals', rating: 4.9 },
      { id: 5, name: 'Dr. Ahmed Youssef', specialty: 'Urology and Andrology', hospital: 'Hmmling Hospital', rating: 4.8 }
    ]
  })
})

// Messages
apiRoutes.get('/messages', (c) => {
  return c.json({
    conversations: [
      { id: 1, name: 'Dr. L. Weber', role: 'Orthopedic Surgeon', lastMessage: 'Your progress looks excellent!', time: '10:30 AM', unread: 2 },
      { id: 2, name: 'S. Ahmed', role: 'Care Coordinator', lastMessage: 'Your accommodation has been confirmed.', time: 'Yesterday', unread: 0 },
      { id: 3, name: 'Dr. A. Schmidt', role: 'Nutritionist', lastMessage: 'I\'ve updated your meal plan.', time: 'Yesterday', unread: 1 }
    ]
  })
})

apiRoutes.post('/messages', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    message: {
      id: Date.now(),
      ...body,
      timestamp: new Date().toISOString()
    }
  })
})

// Marketplace
apiRoutes.get('/marketplace/packages', (c) => {
  return c.json({
    packages: [
      { id: 1, name: 'SelectCare', price: 6500, currency: 'EUR', features: ['Surgery', 'Hospital stay', 'Basic accommodation', 'Transfers', 'Follow-up'] },
      { id: 2, name: 'SelectCare+', price: 12000, currency: 'EUR', features: ['Surgery', '5-star resort', 'Personal coordinator', 'Family accommodation', 'Wellness'], featured: true },
      { id: 3, name: 'SelectCrown', price: 22000, currency: 'EUR', features: ['Surgery', 'Private villa', 'Chef', '24/7 care', 'Yacht', 'Spa'] }
    ]
  })
})

apiRoutes.get('/marketplace/accommodations', (c) => {
  return c.json({
    accommodations: [
      { id: 1, name: 'Steigenberger Resort', type: '5-Star Hotel', price: 180, currency: 'EUR', rating: 4.9 },
      { id: 2, name: 'Recovery Villa', type: 'Private Villa', price: 450, currency: 'EUR', rating: 5.0 },
      { id: 3, name: 'Wellness Retreat', type: 'Medical Spa', price: 250, currency: 'EUR', rating: 4.8 }
    ]
  })
})

apiRoutes.get('/marketplace/excursions', (c) => {
  return c.json({
    excursions: [
      { id: 1, name: 'Yacht Day Trip', duration: '6 hours', price: 350, currency: 'EUR' },
      { id: 2, name: 'Snorkeling Tour', duration: '4 hours', price: 85, currency: 'EUR' },
      { id: 3, name: 'Desert Safari', duration: '5 hours', price: 120, currency: 'EUR' },
      { id: 4, name: 'Diving Course', duration: '2 days', price: 250, currency: 'EUR' },
      { id: 5, name: 'Spa Day', duration: 'Full day', price: 180, currency: 'EUR' },
      { id: 6, name: 'Sunset Cruise', duration: '3 hours', price: 95, currency: 'EUR' }
    ]
  })
})

apiRoutes.get('/marketplace/wellness', (c) => {
  return c.json({
    treatments: [
      { id: 1, name: 'IV Vitamin Therapy', desc: 'Energy boost infusion', price: 150, duration: '45 min' },
      { id: 2, name: 'Medical Check-up', desc: 'Comprehensive screening', price: 450, duration: '3 hours' },
      { id: 3, name: 'Skin Rejuvenation', desc: 'LED + Microneedling', price: 280, duration: '90 min' },
      { id: 4, name: 'Detox Program', desc: '5-day cleanse', price: 1200, duration: '5 days' }
    ]
  })
})

// AI / Risk calculators
apiRoutes.get('/ai/risk-calculators', (c) => {
  return c.json({
    calculators: [
      { id: 'ascvd', name: 'Cardiovascular Risk (ASCVD)', score: 8.2, status: 'Low', lastUpdated: '2024-10-15' },
      { id: 'diabetes', name: 'Diabetes Risk (ADA)', score: 3, status: 'Low', lastUpdated: '2024-10-10' },
      { id: 'bmi', name: 'BMI Calculator', score: 27.8, status: 'Overweight', lastUpdated: new Date().toISOString() },
      { id: 'egfr', name: 'Kidney Function (eGFR)', score: 92, status: 'Normal', lastUpdated: '2024-10-12' }
    ]
  })
})

apiRoutes.post('/ai/chat', async (c) => {
  const { message } = await c.req.json()
  // Simulated AI response
  return c.json({
    response: `Thank you for your question about "${message}". Based on evidence-based medical guidelines, I recommend consulting with your care team for personalized advice. This is for informational purposes only.`,
    sources: ['American Heart Association Guidelines (2023)', 'WHO Health Recommendations'],
    disclaimer: 'AI insights are for informational purposes only. Always consult your healthcare provider for medical decisions.'
  })
})

// SelectScore
apiRoutes.get('/selectscore', (c) => {
  return c.json({
    score: 85,
    status: 'Excellent',
    change: '+5 from last week',
    factors: {
      vitalsCompliance: 90,
      medicationAdherence: 95,
      exerciseCompletion: 75,
      nutritionTracking: 80,
      appointmentAttendance: 100
    }
  })
})

// Memberships
apiRoutes.get('/memberships', (c) => {
  return c.json({
    current: 'Gold',
    tiers: [
      { id: 'silver', name: 'Silver', price: 49, currency: 'EUR', features: ['Telemedicine', 'Nutrition Plans', 'Health Tracking', 'Community'] },
      { id: 'gold', name: 'Gold', price: 99, currency: 'EUR', features: ['All Silver +', '20% Retreat Discount', 'Device Rental', 'Priority Booking', 'Monthly Consult'] },
      { id: 'platinum', name: 'Platinum', price: 199, currency: 'EUR', features: ['All Gold +', 'Free Annual Check-up', '30% Hotel Discount', 'Dedicated Coordinator', 'VIP Events'] }
    ]
  })
})

// Tasks
apiRoutes.get('/tasks', (c) => {
  return c.json({
    tasks: [
      { id: 1, title: 'Take morning medication', time: '8:00 AM', done: true },
      { id: 2, title: 'Light mobility exercises', time: '10:00 AM', done: true },
      { id: 3, title: 'Log breakfast', time: '9:00 AM', done: false },
      { id: 4, title: 'Physiotherapy session', time: '2:00 PM', done: false }
    ]
  })
})

apiRoutes.post('/tasks/:id/complete', (c) => {
  const id = c.req.param('id')
  return c.json({ success: true, taskId: id, completedAt: new Date().toISOString() })
})

// Connected devices
apiRoutes.get('/devices', (c) => {
  return c.json({
    devices: [
      { id: 1, name: 'Apple Watch Series 9', type: 'smartwatch', connected: true, battery: 72 },
      { id: 2, name: 'Withings Body+', type: 'scale', connected: true, battery: 85 },
      { id: 3, name: 'Oura Ring', type: 'ring', connected: false, battery: null }
    ]
  })
})

// Telemedicine
apiRoutes.get('/telemedicine/available', (c) => {
  return c.json({
    doctors: [
      { id: 1, name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', waitTime: '~5 min', rating: 4.9 },
      { id: 2, name: 'Dr. A. Schmidt', specialty: 'Nutritionist', waitTime: '~2 min', rating: 4.7 },
      { id: 3, name: 'M. Hassan', specialty: 'Physiotherapist', waitTime: 'Instant', rating: 4.8 }
    ]
  })
})

apiRoutes.post('/telemedicine/start', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    session: {
      id: `session-${Date.now()}`,
      doctorId: body.doctorId,
      roomUrl: `https://meet.selectcareos.com/${Date.now()}`,
      startedAt: new Date().toISOString()
    }
  })
})

export default apiRoutes
