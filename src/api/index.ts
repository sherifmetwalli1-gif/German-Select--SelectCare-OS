import { Hono } from 'hono'

export const apiRoutes = new Hono()

// Health check
apiRoutes.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// User/Patient endpoints
apiRoutes.get('/patients', (c) => {
  return c.json({
    patients: [
      { id: 'GS-2024-0847', name: 'Max Mustermann', condition: 'Knee Replacement Recovery', week: 2, progress: 75 },
      { id: 'GS-2024-0823', name: 'Anna Schmidt', condition: 'Gastric Sleeve Post-Op', week: 4, progress: 60 },
      { id: 'GS-2024-0815', name: 'Thomas Müller', condition: 'Hip Replacement Recovery', week: 6, progress: 90 }
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
    dateOfBirth: '1978-03-15',
    nationality: 'German',
    bloodType: 'A+',
    allergies: ['Penicillin'],
    conditions: ['Hypertension'],
    membership: 'Gold',
    selectScore: 85,
    recoveryProgress: 75
  })
})

// Vitals/RPM endpoints
apiRoutes.get('/vitals', (c) => {
  return c.json({
    timestamp: new Date().toISOString(),
    vitals: {
      heartRate: { value: 72, unit: 'bpm', status: 'normal', trend: 'stable' },
      bloodPressure: { systolic: 128, diastolic: 82, unit: 'mmHg', status: 'elevated', trend: 'up' },
      temperature: { value: 36.8, unit: '°C', status: 'normal', trend: 'stable' },
      spO2: { value: 98, unit: '%', status: 'normal', trend: 'stable' },
      weight: { value: 78.5, unit: 'kg', status: 'normal', trend: 'down' },
      steps: { value: 4230, goal: 8000, status: 'normal', trend: 'up' }
    }
  })
})

apiRoutes.get('/vitals/history', (c) => {
  return c.json({
    heartRate: [68, 72, 75, 70, 73, 71, 74, 72, 69, 71, 73, 72],
    bloodPressure: [
      { date: '2024-10-22', systolic: 128, diastolic: 82 },
      { date: '2024-10-21', systolic: 125, diastolic: 80 },
      { date: '2024-10-20', systolic: 122, diastolic: 78 }
    ],
    weight: [
      { week: 1, value: 83.7 },
      { week: 2, value: 82.1 },
      { week: 3, value: 80.5 },
      { week: 4, value: 78.5 }
    ]
  })
})

// Appointments endpoints
apiRoutes.get('/appointments', (c) => {
  return c.json({
    upcoming: [
      { id: 'APT-001', doctor: 'Dr. K. Müller', specialty: 'Cardiologist', type: 'Cardiology Consult', datetime: '2024-10-22T10:00:00', duration: 30, method: 'video' },
      { id: 'APT-002', doctor: 'Dr. A. Schmidt', specialty: 'Nutritionist', type: 'Nutrition Plan', datetime: '2024-11-05T14:00:00', duration: 30, method: 'video' }
    ],
    past: [
      { id: 'APT-000', doctor: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', type: 'Post-Op Follow-up', datetime: '2024-10-19T11:00:00', duration: 25, method: 'video' }
    ]
  })
})

apiRoutes.post('/appointments', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    appointment: {
      id: 'APT-' + Math.random().toString(36).substr(2, 9),
      ...body,
      status: 'confirmed'
    }
  })
})

// Care Team endpoints
apiRoutes.get('/care-team', (c) => {
  return c.json({
    primary: [
      { id: 'DOC-001', name: 'Dr. Sherif Akram Metwalli', specialty: 'Lead Bariatric & Colorectal Surgeon', hospital: 'Bielefeld University Hospitals', rating: 4.9, available: true },
      { id: 'DOC-002', name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', hospital: 'German Select Egypt', rating: 4.9, available: true },
      { id: 'DOC-003', name: 'Dr. K. Müller', specialty: 'Cardiologist', hospital: 'University Hospital Kiel', rating: 4.8, available: true }
    ],
    support: [
      { id: 'SUP-001', name: 'Dr. A. Schmidt', specialty: 'Nutritionist', role: 'Nutrition & Diet Planning', available: true },
      { id: 'SUP-002', name: 'M. Hassan', specialty: 'Physiotherapist', role: 'Rehabilitation & Exercise', available: true },
      { id: 'SUP-003', name: 'S. Ahmed', specialty: 'Care Coordinator', role: 'Patient Liaison & Logistics', available: true }
    ]
  })
})

// Timeline endpoints
apiRoutes.get('/timeline', (c) => {
  return c.json({
    currentPhase: 'recovery',
    overallProgress: 75,
    phases: [
      { phase: 'pre-surgery', status: 'completed', milestones: [
        { week: -4, title: 'Initial Consultation', status: 'completed' },
        { week: -2, title: 'Pre-Op Optimization', status: 'completed' },
        { week: -1, title: 'Final Preparation', status: 'completed' }
      ]},
      { phase: 'surgery', status: 'completed', milestones: [
        { week: 0, title: 'Knee Replacement Surgery', status: 'completed' }
      ]},
      { phase: 'recovery', status: 'in_progress', milestones: [
        { week: 1, title: 'Initial Assessment', status: 'completed' },
        { week: 2, title: 'Basic Rehabilitation', status: 'current' },
        { week: 3, title: 'Mobility Training', status: 'upcoming' },
        { week: 6, title: 'Advanced Strengthening', status: 'upcoming' }
      ]},
      { phase: 'follow-up', status: 'upcoming', milestones: [
        { week: 8, title: '6-Week Check-up', status: 'upcoming' },
        { week: 12, title: '3-Month Assessment', status: 'upcoming' }
      ]}
    ]
  })
})

// Marketplace endpoints
apiRoutes.get('/marketplace/packages', (c) => {
  return c.json({
    packages: [
      { id: 'PKG-001', name: 'SelectCare', price: 6500, currency: 'EUR', features: ['German-certified surgeon', 'Hospital stay', 'Basic accommodation', 'Airport transfers', 'Digital follow-up'] },
      { id: 'PKG-002', name: 'SelectCare+', price: 12000, currency: 'EUR', popular: true, features: ['All SelectCare features', '5-star resort recovery', 'Personal care coordinator', 'Family accommodation', 'Wellness treatments'] },
      { id: 'PKG-003', name: 'SelectCrown', price: 22000, currency: 'EUR', features: ['All SelectCare+ features', 'Private villa', 'Chef service', '24/7 medical supervision', 'Yacht excursions'] }
    ]
  })
})

apiRoutes.get('/marketplace/accommodations', (c) => {
  return c.json({
    accommodations: [
      { id: 'ACC-001', name: 'Steigenberger Resort', type: '5-Star Hotel', pricePerNight: 180, currency: 'EUR', rating: 4.9 },
      { id: 'ACC-002', name: 'Recovery Villa', type: 'Private Villa', pricePerNight: 450, currency: 'EUR', rating: 5.0 },
      { id: 'ACC-003', name: 'Wellness Retreat', type: 'Medical Spa', pricePerNight: 250, currency: 'EUR', rating: 4.8 }
    ]
  })
})

apiRoutes.get('/marketplace/excursions', (c) => {
  return c.json({
    excursions: [
      { id: 'EXC-001', name: 'Yacht Day Trip', duration: '6 hours', price: 350, currency: 'EUR' },
      { id: 'EXC-002', name: 'Snorkeling Tour', duration: '4 hours', price: 85, currency: 'EUR' },
      { id: 'EXC-003', name: 'Desert Safari', duration: '5 hours', price: 120, currency: 'EUR' },
      { id: 'EXC-004', name: 'Diving Course', duration: '2 days', price: 250, currency: 'EUR' },
      { id: 'EXC-005', name: 'Spa Day', duration: 'Full day', price: 180, currency: 'EUR' },
      { id: 'EXC-006', name: 'Sunset Cruise', duration: '3 hours', price: 95, currency: 'EUR' }
    ]
  })
})

// AI/Risk Calculator endpoints
apiRoutes.get('/ai/risk-scores', (c) => {
  return c.json({
    scores: [
      { calculator: 'ASCVD', name: 'Cardiovascular Risk', score: 8.2, status: 'Low', unit: '%', lastUpdated: '2024-10-15' },
      { calculator: 'ADA', name: 'Diabetes Risk', score: 3, status: 'Low', unit: 'points', lastUpdated: '2024-10-10' },
      { calculator: 'BMI', name: 'Body Mass Index', score: 27.8, status: 'Overweight', unit: 'kg/m²', lastUpdated: '2024-10-22' },
      { calculator: 'eGFR', name: 'Kidney Function', score: 92, status: 'Normal', unit: 'mL/min', lastUpdated: '2024-10-12' }
    ]
  })
})

apiRoutes.post('/ai/chat', async (c) => {
  const { message } = await c.req.json()
  
  // Simulated AI response
  const responses: Record<string, string> = {
    'blood pressure': 'Your blood pressure reading of 128/82 mmHg falls into the Elevated category. This suggests lifestyle modifications may be beneficial. Consider reducing sodium intake, increasing physical activity, and maintaining a healthy weight.',
    'default': 'I can help you understand your health data, calculate risk scores, and provide evidence-based health information. Please ask me a specific question about your health.'
  }
  
  const response = Object.keys(responses).find(key => message.toLowerCase().includes(key))
    ? responses[Object.keys(responses).find(key => message.toLowerCase().includes(key))!]
    : responses.default
  
  return c.json({
    response,
    sources: ['American Heart Association Guidelines', 'Clinical Best Practices'],
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider for medical decisions.'
  })
})

// Wellness endpoints
apiRoutes.get('/wellness/goals', (c) => {
  return c.json({
    dailyGoals: [
      { id: 'GOAL-001', task: 'Drink 8 glasses of water', progress: '6/8', completed: false },
      { id: 'GOAL-002', task: 'Walk 8,000 steps', progress: '4,230/8,000', completed: false },
      { id: 'GOAL-003', task: 'Eat 5 servings of vegetables', progress: '5/5', completed: true },
      { id: 'GOAL-004', task: 'Complete physiotherapy exercises', progress: '', completed: true },
      { id: 'GOAL-005', task: 'Take medications', progress: '', completed: true },
      { id: 'GOAL-006', task: 'Sleep 7+ hours', progress: '7.2h', completed: true }
    ],
    wellnessScore: 78,
    breakdown: {
      nutrition: 82,
      exercise: 75,
      sleep: 85,
      mood: 70
    }
  })
})

apiRoutes.get('/wellness/nutrition', (c) => {
  return c.json({
    calories: { consumed: 1420, target: 1800, unit: 'kcal' },
    macros: {
      protein: { consumed: 85, target: 100, unit: 'g' },
      carbs: { consumed: 120, target: 150, unit: 'g' },
      fat: { consumed: 45, target: 60, unit: 'g' }
    },
    meals: [
      { type: 'Breakfast', time: '8:00 AM', items: 'Oatmeal, Berries, Greek Yogurt', calories: 350, logged: true },
      { type: 'Lunch', time: '12:30 PM', items: 'Grilled Chicken Salad', calories: 520, logged: true },
      { type: 'Snack', time: '3:30 PM', items: 'Apple, Almonds', calories: 180, logged: true },
      { type: 'Dinner', time: '7:00 PM', items: 'Suggested: Salmon with vegetables', calories: 450, logged: false }
    ]
  })
})

// Messages endpoints
apiRoutes.get('/messages', (c) => {
  return c.json({
    conversations: [
      { id: 'CONV-001', contact: 'Dr. L. Weber', role: 'Orthopedic Surgeon', lastMessage: 'Your progress looks excellent!', time: '10:30 AM', unread: 2, online: true },
      { id: 'CONV-002', contact: 'S. Ahmed', role: 'Care Coordinator', lastMessage: 'Your accommodation has been confirmed.', time: 'Yesterday', unread: 0, online: true },
      { id: 'CONV-003', contact: 'Dr. A. Schmidt', role: 'Nutritionist', lastMessage: 'I\'ve updated your meal plan.', time: 'Yesterday', unread: 1, online: false }
    ]
  })
})

apiRoutes.post('/messages', async (c) => {
  const { conversationId, message } = await c.req.json()
  return c.json({
    success: true,
    message: {
      id: 'MSG-' + Math.random().toString(36).substr(2, 9),
      conversationId,
      content: message,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
  })
})

// Memberships
apiRoutes.get('/memberships', (c) => {
  return c.json({
    tiers: [
      { id: 'MEM-SILVER', name: 'Silver', price: 49, currency: 'EUR', period: 'month', features: ['Telemedicine', 'Nutrition Plans', 'Health Tracking', 'Community'] },
      { id: 'MEM-GOLD', name: 'Gold', price: 99, currency: 'EUR', period: 'month', features: ['All Silver features', '20% Retreat Discount', 'Device Rental', 'Priority Booking', 'Monthly Consult'] },
      { id: 'MEM-PLATINUM', name: 'Platinum', price: 199, currency: 'EUR', period: 'month', features: ['All Gold features', 'Free Annual Check-up', '30% Hotel Discount', 'Dedicated Coordinator', 'VIP Events'] }
    ],
    current: 'MEM-GOLD'
  })
})

export default apiRoutes
