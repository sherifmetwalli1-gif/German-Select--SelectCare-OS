/**
 * Patient Routes
 * Patient portal and account management
 */

import { Hono } from 'hono'
import type { Bindings, Variables } from '../types'

export const patientRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Get patient profile
patientRoutes.get('/profile', async (c) => {
  const userId = c.req.query('userId') || 'demo'

  const profile = {
    id: userId,
    email: 'patient@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+49 170 1234567',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    language: 'en',
    currency: 'EUR',
    address: {
      street: '123 Main Street',
      city: 'Munich',
      state: 'Bavaria',
      country: 'Germany',
      postalCode: '80331',
    },
    medicalInfo: {
      bloodType: 'O+',
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Lisinopril 10mg'],
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+49 170 9876543',
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        reminders: true,
      },
      consultationType: 'telemedicine',
      preferredLanguage: 'en',
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  }

  return c.json({
    success: true,
    data: profile,
    timestamp: new Date().toISOString(),
  })
})

// Update patient profile
patientRoutes.patch('/profile', async (c) => {
  try {
    const body = await c.req.json()

    return c.json({
      success: true,
      data: { ...body, updatedAt: new Date().toISOString() },
      message: 'Profile updated successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get patient bookings
patientRoutes.get('/bookings', async (c) => {
  const userId = c.req.query('userId')
  const status = c.req.query('status')

  const bookings = [
    {
      id: 'booking_001',
      type: 'consultation',
      status: 'completed',
      doctor: {
        id: 'dr_bariatric_antireflux',
        name: 'Dr. Friedrich Schmidt',
        specialization: 'Bariatric Surgery',
        image: '/images/doctors/schmidt.jpg',
      },
      scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 30,
      consultationType: 'telemedicine',
      price: 200,
      currency: 'EUR',
      rating: 5,
      canReview: false,
      documents: [
        { name: 'Consultation Summary', type: 'pdf', url: '/documents/summary.pdf' },
        { name: 'Prescription', type: 'pdf', url: '/documents/prescription.pdf' },
      ],
    },
    {
      id: 'booking_002',
      type: 'consultation',
      status: 'confirmed',
      doctor: {
        id: 'dr_cardiology',
        name: 'Prof. Dr. Michael Richter',
        specialization: 'Cardiology',
        image: '/images/doctors/richter.jpg',
      },
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 45,
      consultationType: 'telemedicine',
      price: 250,
      currency: 'EUR',
      meetingUrl: 'https://meet.germanselect.com/booking_002',
      canCancel: true,
      canReschedule: true,
    },
    {
      id: 'booking_003',
      type: 'package',
      status: 'pending',
      package: {
        id: 'surgery_bridge',
        name: 'SurgeryBridge: Germany to Egypt',
      },
      scheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 11250,
      currency: 'EUR',
      paymentStatus: 'deposit_paid',
      depositAmount: 3375,
      remainingBalance: 7875,
    },
  ]

  let filtered = bookings
  if (status) {
    filtered = filtered.filter(b => b.status === status)
  }

  return c.json({
    success: true,
    data: filtered,
    summary: {
      total: bookings.length,
      upcoming: bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length,
      completed: bookings.filter(b => b.status === 'completed').length,
      totalSpent: 650,
    },
    timestamp: new Date().toISOString(),
  })
})

// Get payment history
patientRoutes.get('/payments', async (c) => {
  const userId = c.req.query('userId')

  const payments = [
    {
      id: 'pay_001',
      type: 'consultation',
      amount: 200,
      currency: 'EUR',
      status: 'completed',
      description: 'Consultation with Dr. Schmidt',
      bookingId: 'booking_001',
      paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      receiptUrl: '/receipts/pay_001.pdf',
    },
    {
      id: 'pay_002',
      type: 'deposit',
      amount: 3375,
      currency: 'EUR',
      status: 'completed',
      description: 'SurgeryBridge Package - Deposit',
      bookingId: 'booking_003',
      paidAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      receiptUrl: '/receipts/pay_002.pdf',
    },
  ]

  return c.json({
    success: true,
    data: payments,
    summary: {
      totalPaid: 3575,
      pendingPayments: 7875,
      currency: 'EUR',
    },
    timestamp: new Date().toISOString(),
  })
})

// Get medical records
patientRoutes.get('/records', async (c) => {
  const userId = c.req.query('userId')

  const records = {
    consultations: [
      {
        id: 'record_001',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        doctor: 'Dr. Friedrich Schmidt',
        type: 'Initial Consultation',
        summary: 'Patient presented for bariatric surgery evaluation...',
        diagnosis: 'Obesity Class III (BMI 42.5)',
        recommendations: [
          'Proceed with pre-operative workup',
          'Nutritional counseling',
          'Cardiac clearance',
        ],
        documents: [
          { name: 'Consultation Report', url: '/records/consult_001.pdf' },
        ],
      },
    ],
    prescriptions: [
      {
        id: 'rx_001',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        doctor: 'Dr. Friedrich Schmidt',
        medications: [
          { name: 'Omeprazole 20mg', dosage: 'Once daily before breakfast', duration: '2 weeks' },
        ],
        status: 'active',
      },
    ],
    labResults: [
      {
        id: 'lab_001',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Blood Panel',
        status: 'completed',
        results: [
          { test: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12.0-16.0', status: 'normal' },
          { test: 'Fasting Glucose', value: '118', unit: 'mg/dL', range: '70-100', status: 'elevated' },
          { test: 'HbA1c', value: '6.2', unit: '%', range: '<5.7', status: 'elevated' },
        ],
      },
    ],
  }

  return c.json({
    success: true,
    data: records,
    timestamp: new Date().toISOString(),
  })
})

// Get favorite doctors
patientRoutes.get('/favorites', async (c) => {
  const favorites = [
    {
      id: 'dr_bariatric_antireflux',
      name: 'Dr. Friedrich Schmidt',
      specialization: 'Bariatric Surgery',
      rating: 4.95,
      consultationFee: 200,
      currency: 'EUR',
      addedAt: '2024-02-01',
    },
    {
      id: 'dr_cardiology',
      name: 'Prof. Dr. Michael Richter',
      specialization: 'Cardiology',
      rating: 4.92,
      consultationFee: 250,
      currency: 'EUR',
      addedAt: '2024-02-15',
    },
  ]

  return c.json({
    success: true,
    data: favorites,
    timestamp: new Date().toISOString(),
  })
})

// Add/remove favorite
patientRoutes.post('/favorites/:doctorId', async (c) => {
  const doctorId = c.req.param('doctorId')

  return c.json({
    success: true,
    data: { doctorId, addedAt: new Date().toISOString() },
    message: 'Doctor added to favorites',
    timestamp: new Date().toISOString(),
  })
})

patientRoutes.delete('/favorites/:doctorId', async (c) => {
  const doctorId = c.req.param('doctorId')

  return c.json({
    success: true,
    message: 'Doctor removed from favorites',
    timestamp: new Date().toISOString(),
  })
})

// Notification settings
patientRoutes.get('/notifications/settings', async (c) => {
  const settings = {
    email: {
      bookingConfirmation: true,
      bookingReminder: true,
      paymentReceipt: true,
      promotions: false,
      newsletter: true,
    },
    sms: {
      bookingReminder: true,
      appointmentChanges: true,
    },
    push: {
      enabled: false,
    },
    reminderTiming: {
      firstReminder: 24, // hours before
      secondReminder: 2, // hours before
    },
  }

  return c.json({
    success: true,
    data: settings,
    timestamp: new Date().toISOString(),
  })
})

patientRoutes.patch('/notifications/settings', async (c) => {
  const body = await c.req.json()

  return c.json({
    success: true,
    data: body,
    message: 'Notification settings updated',
    timestamp: new Date().toISOString(),
  })
})

// Get notifications
patientRoutes.get('/notifications', async (c) => {
  const unreadOnly = c.req.query('unreadOnly') === 'true'

  const notifications = [
    {
      id: 'notif_001',
      type: 'reminder',
      title: 'Upcoming Consultation',
      message: 'Your consultation with Prof. Dr. Richter is in 2 days.',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      action: { type: 'booking', id: 'booking_002' },
    },
    {
      id: 'notif_002',
      type: 'payment',
      title: 'Payment Confirmed',
      message: 'Your deposit of €3,375 has been processed.',
      read: true,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      action: { type: 'payment', id: 'pay_002' },
    },
    {
      id: 'notif_003',
      type: 'document',
      title: 'New Document Available',
      message: 'Your consultation summary is ready to view.',
      read: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      action: { type: 'document', url: '/documents/summary.pdf' },
    },
  ]

  let filtered = notifications
  if (unreadOnly) {
    filtered = filtered.filter(n => !n.read)
  }

  return c.json({
    success: true,
    data: filtered,
    unreadCount: notifications.filter(n => !n.read).length,
    timestamp: new Date().toISOString(),
  })
})

patientRoutes.patch('/notifications/:id/read', async (c) => {
  const id = c.req.param('id')

  return c.json({
    success: true,
    data: { id, read: true },
    timestamp: new Date().toISOString(),
  })
})

// Saved payment methods
patientRoutes.get('/payment-methods', async (c) => {
  const methods = [
    {
      id: 'pm_001',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: 'pm_002',
      type: 'card',
      brand: 'mastercard',
      last4: '5555',
      expMonth: 6,
      expYear: 2026,
      isDefault: false,
    },
  ]

  return c.json({
    success: true,
    data: methods,
    timestamp: new Date().toISOString(),
  })
})

patientRoutes.delete('/payment-methods/:id', async (c) => {
  const id = c.req.param('id')

  return c.json({
    success: true,
    message: 'Payment method removed',
    timestamp: new Date().toISOString(),
  })
})
