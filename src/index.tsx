/**
 * SelectCareOS™ - German Select Medical Tourism Platform
 * World-Class Digital Health Platform
 * 
 * Features:
 * - Patient Dashboard with Surgery Prep & Recovery Tracking
 * - Doctor Connectivity & Telemedicine
 * - Remote Patient Monitoring & Health Tools Integration
 * - AI Diagnostics & Risk Analysis
 * - Evidence-Based Medicine Recommendations
 * - Booking System (Consultations, Treatments, Accommodations)
 * - Timeline of Therapies
 * - Wellness, Anti-Aging & Excursions Booking
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'

// Types
type Bindings = {
  DB: D1Database
  KV: KVNamespace
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  JWT_SECRET: string
  ENVIRONMENT: string
}

type Variables = {
  user?: {
    id: string
    email: string
    role: 'patient' | 'doctor' | 'admin' | 'affiliate'
    name?: string
  }
  requestId: string
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Global middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders())
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-API-Key'],
  exposeHeaders: ['X-Request-ID', 'X-RateLimit-Remaining'],
  maxAge: 86400,
}))

// Request ID middleware
app.use('*', async (c, next) => {
  const requestId = c.req.header('X-Request-ID') || crypto.randomUUID()
  c.set('requestId', requestId)
  c.header('X-Request-ID', requestId)
  await next()
})

// ============================================================================
// STATIC DATA - German Select Doctors & Packages
// ============================================================================

const DOCTORS = [
  {
    id: 'dr-metwalli',
    name: 'Dr. med. Sherif Akram Metwalli',
    title: 'Founder, CEO & CMO',
    specialization: 'Plastic & Reconstructive Surgery',
    subspecialties: ['Post-Bariatric Surgery', 'Body Contouring', 'Facial Surgery'],
    qualifications: ['Triple Board-Certified German Facharzt', '20+ Years International Experience'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 20,
    location: 'Germany / Hurghada',
    consultation_fee: 150,
    rating: 4.9,
    total_reviews: 247,
    is_premium: true,
    avatar: 'SM',
    available: true
  },
  {
    id: 'dr-weber',
    name: 'Dr. L. Weber',
    title: 'Senior Consultant',
    specialization: 'Orthopedics',
    subspecialties: ['Joint Surgery', 'Sports Medicine', 'Arthroscopy'],
    qualifications: ['German Board Certified', 'Head of Arthroscopy Unit'],
    languages: ['German', 'English'],
    experience_years: 18,
    location: 'Germany / Hurghada',
    consultation_fee: 180,
    rating: 4.8,
    total_reviews: 189,
    is_premium: true,
    avatar: 'LW',
    available: true
  },
  {
    id: 'dr-muller',
    name: 'Dr. K. Müller',
    title: 'Consultant',
    specialization: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Cardiac Imaging'],
    qualifications: ['Ass. Prof of Cardiology', 'University Hospital Kiel'],
    languages: ['German', 'English'],
    experience_years: 15,
    location: 'Germany / Hurghada',
    consultation_fee: 200,
    rating: 4.9,
    total_reviews: 156,
    is_premium: true,
    avatar: 'KM',
    available: true
  },
  {
    id: 'dr-schmidt',
    name: 'Dr. A. Schmidt',
    title: 'Consultant',
    specialization: 'Nutritionist',
    subspecialties: ['Bariatric Nutrition', 'Metabolic Health', 'Weight Management'],
    qualifications: ['Nutritional Medicine Specialist', 'German Board Certified'],
    languages: ['German', 'English'],
    experience_years: 12,
    location: 'Germany / Hurghada',
    consultation_fee: 120,
    rating: 4.7,
    total_reviews: 203,
    is_premium: false,
    avatar: 'AS',
    available: true
  },
  {
    id: 'dr-fischer',
    name: 'Dr. H. Fischer',
    title: 'Senior Consultant',
    specialization: 'Bariatric Surgery',
    subspecialties: ['Gastric Sleeve', 'Gastric Bypass', 'Revision Surgery'],
    qualifications: ['Consultant of Bariatric and Antireflux Surgery', 'Colorectal Surgery'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 22,
    location: 'Germany / Hurghada',
    consultation_fee: 180,
    rating: 4.9,
    total_reviews: 312,
    is_premium: true,
    avatar: 'HF',
    available: true
  },
  {
    id: 'dr-bauer',
    name: 'Dr. M. Bauer',
    title: 'Consultant',
    specialization: 'Urology & Andrology',
    subspecialties: ['Minimally Invasive Surgery', 'Men\'s Health'],
    qualifications: ['Hmmling Hospital Sgel', 'German Board Certified'],
    languages: ['German', 'English'],
    experience_years: 16,
    location: 'Germany / Hurghada',
    consultation_fee: 160,
    rating: 4.8,
    total_reviews: 124,
    is_premium: true,
    avatar: 'MB',
    available: true
  },
  {
    id: 'dr-koch',
    name: 'Dr. P. Koch',
    title: 'Head of Department',
    specialization: 'Anesthesia & Pain Management',
    subspecialties: ['Intensive Care', 'Pain Therapy', 'Regional Anesthesia'],
    qualifications: ['Medias Hospital Germany', 'Academic Teaching Hospital'],
    languages: ['German', 'English'],
    experience_years: 19,
    location: 'Germany / Hurghada',
    consultation_fee: 140,
    rating: 4.9,
    total_reviews: 98,
    is_premium: true,
    avatar: 'PK',
    available: true
  },
  {
    id: 'dr-hoffmann',
    name: 'Dr. J. Hoffmann',
    title: 'Consultant',
    specialization: 'Internal Medicine & Gastroenterology',
    subspecialties: ['Palliative Medicine', 'Emergency Medicine', 'Hygiene'],
    qualifications: ['Facharzt für Innere Medizin', 'German Board Certified'],
    languages: ['German', 'English'],
    experience_years: 14,
    location: 'Germany / Hurghada',
    consultation_fee: 150,
    rating: 4.7,
    total_reviews: 167,
    is_premium: false,
    avatar: 'JH',
    available: true
  }
]

const CARE_PACKAGES = [
  {
    id: 'selectcare-essential',
    name: 'SELECTCARE™',
    tier: 'Essential',
    price_range: { min: 5500, max: 10000 },
    base_price: 7500,
    turkey_comparison: 5500,
    savings_vs_germany: 14500,
    currency: 'EUR',
    description: 'Essential Protocol with German Standard Care',
    features: [
      'German Board-Certified Surgeon',
      'JCI-Certified Facility',
      '4-Star Accommodation',
      'Standard Suite Recovery',
      'Airport Transfers',
      '1-Year Digital Follow-up',
      'SelectCareOS™ Access',
      '24/7 Support Line'
    ],
    inclusions: ['Surgery', 'Hospital Stay', 'Medications', 'Lab Tests', 'Accommodation', 'Transfers'],
    duration_days: 14,
    recovery_days: 7,
    popular: false
  },
  {
    id: 'selectcare-plus',
    name: 'SELECTCARE+™',
    tier: 'Plus',
    price_range: { min: 9500, max: 18000 },
    base_price: 12000,
    turkey_comparison: 9000,
    savings_vs_germany: 20000,
    currency: 'EUR',
    description: 'Enhanced Comfort with Premium Services',
    features: [
      'All Essential Features',
      '5-Star Resort Accommodation',
      'Premium Suite Recovery',
      'VIP Airport Transfer',
      'Personal Care Coordinator',
      '2-Year Digital Follow-up',
      'Wellness Sessions Included',
      'Family Accommodation Option',
      'Physiotherapy Sessions'
    ],
    inclusions: ['Surgery', 'Hospital Stay', 'Medications', 'Lab Tests', '5-Star Resort', 'VIP Transfers', 'Wellness', 'Physio'],
    duration_days: 21,
    recovery_days: 14,
    popular: true
  },
  {
    id: 'selectcrown',
    name: 'SELECTCROWN™',
    tier: 'Crown',
    price_range: { min: 18000, max: 30000 },
    base_price: 22000,
    turkey_comparison: null,
    savings_vs_germany: 33000,
    currency: 'EUR',
    description: 'Ultimate Luxury with Lifetime Support',
    features: [
      'All Plus Features',
      'Private Villa Accommodation',
      'Personal Chef Service',
      'Private Nurse 24/7',
      'Helicopter Transfer Option',
      'Lifetime Support Program',
      'Concierge Service',
      'Family Suite Included',
      'Unlimited Wellness Access',
      'Red Sea Yacht Experience',
      'Anti-Aging Treatments'
    ],
    inclusions: ['Surgery', 'Hospital Stay', 'Medications', 'Lab Tests', 'Private Villa', 'Helicopter', 'Chef', 'Nurse', 'Unlimited Wellness'],
    duration_days: 28,
    recovery_days: 21,
    popular: false
  }
]

const TREATMENT_CATEGORIES = [
  {
    id: 'bariatric',
    name: 'Bariatric Surgery',
    icon: 'weight',
    procedures: [
      { id: 'gastric-sleeve', name: 'Gastric Sleeve', price: 7500, germanyPrice: 22000, turkeyPrice: 4500, duration: '2-3 hours', recovery: '2-4 weeks' },
      { id: 'gastric-bypass', name: 'Gastric Bypass', price: 10500, germanyPrice: 28000, turkeyPrice: 6500, duration: '3-4 hours', recovery: '4-6 weeks' },
      { id: 'revision-surgery', name: 'Revision Surgery', price: 13000, germanyPrice: 35000, turkeyPrice: 7500, duration: '3-5 hours', recovery: '4-6 weeks' }
    ]
  },
  {
    id: 'orthopedic',
    name: 'Orthopedic Surgery',
    icon: 'bone',
    procedures: [
      { id: 'knee-replacement', name: 'Knee Replacement', price: 13500, germanyPrice: 40000, turkeyPrice: 9000, duration: '2-3 hours', recovery: '6-12 weeks' },
      { id: 'hip-replacement', name: 'Hip Replacement', price: 15000, germanyPrice: 45000, turkeyPrice: 12000, duration: '2-3 hours', recovery: '6-12 weeks' },
      { id: 'spine-surgery', name: 'Spine Surgery', price: 19500, germanyPrice: 55000, turkeyPrice: 14000, duration: '4-6 hours', recovery: '8-16 weeks' }
    ]
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic Surgery',
    icon: 'sparkles',
    procedures: [
      { id: 'facelift', name: 'Facelift', price: 8500, germanyPrice: 25000, turkeyPrice: 5500, duration: '3-5 hours', recovery: '2-4 weeks' },
      { id: 'body-contouring', name: 'Body Contouring', price: 10500, germanyPrice: 30000, turkeyPrice: 6500, duration: '4-6 hours', recovery: '4-6 weeks' },
      { id: 'rhinoplasty', name: 'Rhinoplasty', price: 6000, germanyPrice: 18000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '2-3 weeks' }
    ]
  },
  {
    id: 'antiaging',
    name: 'Anti-Aging & Longevity',
    icon: 'clock',
    procedures: [
      { id: 'stem-cell', name: 'Stem Cell Therapy', price: 12500, germanyPrice: 35000, turkeyPrice: 8000, duration: '1-2 hours', recovery: '1 week' },
      { id: 'prp-therapy', name: 'PRP Therapy', price: 2200, germanyPrice: 8000, turkeyPrice: 800, duration: '1 hour', recovery: '1-2 days' },
      { id: 'hormone-therapy', name: 'Hormone Optimization', price: 4000, germanyPrice: 12000, turkeyPrice: 2500, duration: 'Ongoing', recovery: 'None' }
    ]
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: 'heart',
    procedures: [
      { id: 'cardiac-checkup', name: 'Comprehensive Cardiac Checkup', price: 1800, germanyPrice: 5000, turkeyPrice: 1250, duration: '1 day', recovery: 'None' },
      { id: 'angioplasty', name: 'Angioplasty', price: 9500, germanyPrice: 20000, turkeyPrice: 5000, duration: '1-2 hours', recovery: '1-2 weeks' }
    ]
  },
  {
    id: 'aesthetic-surgical',
    name: 'Aesthetic Surgical Procedures',
    icon: 'user-nurse',
    procedures: [
      { id: 'rhinoplasty-full', name: 'Rhinoplasty', price: 3200, germanyPrice: 15000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '2-3 weeks' },
      { id: 'breast-augmentation', name: 'Breast Augmentation', price: 3200, germanyPrice: 10000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '4-6 weeks' },
      { id: 'breast-reduction', name: 'Breast Reduction', price: 2700, germanyPrice: 12000, turkeyPrice: 2800, duration: '3-4 hours', recovery: '4-6 weeks' },
      { id: 'breast-lift', name: 'Breast Lift', price: 2200, germanyPrice: 8000, turkeyPrice: 2400, duration: '2-3 hours', recovery: '3-4 weeks' },
      { id: 'liposuction-area', name: 'Liposuction (per area)', price: 2200, germanyPrice: 8000, turkeyPrice: 2400, duration: '1-2 hours', recovery: '2-4 weeks' },
      { id: 'facelift-surgical', name: 'Facelift (Surgical)', price: 3800, germanyPrice: 20000, turkeyPrice: 4000, duration: '4-6 hours', recovery: '3-4 weeks' },
      { id: 'blepharoplasty', name: 'Blepharoplasty (Eyelid)', price: 1600, germanyPrice: 5000, turkeyPrice: 1800, duration: '1-2 hours', recovery: '1-2 weeks' },
      { id: 'otoplasty', name: 'Otoplasty (Ear Pinning)', price: 1900, germanyPrice: 6000, turkeyPrice: 2000, duration: '1-2 hours', recovery: '1-2 weeks' }
    ]
  },
  {
    id: 'non-surgical-face',
    name: 'Non-Surgical Face Treatments',
    icon: 'spa',
    procedures: [
      { id: 'hifu-face', name: 'HIFU Face Lift', price: 950, germanyPrice: 1400, turkeyPrice: 1200, duration: '60-90 min', recovery: 'None' },
      { id: 'ultherapy', name: 'Ultherapy (Branded HIFU)', price: 1500, germanyPrice: 2000, turkeyPrice: 1800, duration: '90 min', recovery: 'None' },
      { id: 'rf-tightening', name: 'RF Skin Tightening', price: 750, germanyPrice: 1100, turkeyPrice: 1000, duration: '45-60 min', recovery: 'None' },
      { id: 'plasma-pen', name: 'Plasma Pen Treatment', price: 550, germanyPrice: 800, turkeyPrice: 700, duration: '30-60 min', recovery: '5-7 days' },
      { id: 'thread-lift', name: 'Thread Lift', price: 1600, germanyPrice: 4000, turkeyPrice: 1800, duration: '60-90 min', recovery: '1-2 weeks' },
      { id: 'botox-full', name: 'Botox (Full Face)', price: 450, germanyPrice: 1000, turkeyPrice: 600, duration: '15-30 min', recovery: 'None' },
      { id: 'dermal-fillers', name: 'Dermal Fillers (1ml)', price: 300, germanyPrice: 450, turkeyPrice: 400, duration: '30-45 min', recovery: 'None' }
    ]
  },
  {
    id: 'body-contouring-treatments',
    name: 'Body Contouring',
    icon: 'person-dress',
    procedures: [
      { id: 'vaser-lipo', name: 'VASER Liposuction', price: 3000, germanyPrice: 3800, turkeyPrice: 3500, duration: '2-4 hours', recovery: '2-4 weeks' },
      { id: 'coolsculpting', name: 'CoolSculpting (per cycle)', price: 650, germanyPrice: 900, turkeyPrice: 750, duration: '45-60 min', recovery: 'None' },
      { id: 'tummy-tuck', name: 'Tummy Tuck (Abdominoplasty)', price: 3500, germanyPrice: 10000, turkeyPrice: 4000, duration: '3-4 hours', recovery: '4-6 weeks' },
      { id: 'arm-lift', name: 'Arm Lift (Brachioplasty)', price: 2800, germanyPrice: 8000, turkeyPrice: 3200, duration: '2-3 hours', recovery: '2-4 weeks' },
      { id: 'thigh-lift', name: 'Thigh Lift', price: 3200, germanyPrice: 9000, turkeyPrice: 3600, duration: '2-3 hours', recovery: '3-4 weeks' }
    ]
  },
  {
    id: 'skin-treatments',
    name: 'Skin Treatments',
    icon: 'wand-magic-sparkles',
    procedures: [
      { id: 'fractional-co2', name: 'Fractional CO2 Laser', price: 550, germanyPrice: 1500, turkeyPrice: 700, duration: '30-60 min', recovery: '5-7 days' },
      { id: 'chemical-peel', name: 'Chemical Peel (Deep)', price: 300, germanyPrice: 800, turkeyPrice: 350, duration: '30-45 min', recovery: '7-14 days' },
      { id: 'microneedling-prp', name: 'Microneedling + PRP', price: 350, germanyPrice: 1000, turkeyPrice: 450, duration: '45-60 min', recovery: '2-3 days' },
      { id: 'laser-tattoo', name: 'Laser Tattoo Removal (session)', price: 150, germanyPrice: 300, turkeyPrice: 170, duration: '15-30 min', recovery: '1-2 weeks' },
      { id: 'laser-scar', name: 'Laser Scar Revision (session)', price: 220, germanyPrice: 450, turkeyPrice: 250, duration: '30-45 min', recovery: '3-5 days' },
      { id: 'hydrafacial', name: 'Hydrafacial', price: 115, germanyPrice: 350, turkeyPrice: 130, duration: '45-60 min', recovery: 'None' }
    ]
  },
  {
    id: 'laser-hair-removal',
    name: 'Laser Hair Removal (6 Sessions)',
    icon: 'bolt',
    procedures: [
      { id: 'lhr-full-body-female', name: 'Full Body (Female)', price: 1000, germanyPrice: 3500, turkeyPrice: 1250, duration: '2-3 hours', recovery: 'None' },
      { id: 'lhr-full-body-male', name: 'Full Body (Male)', price: 1250, germanyPrice: 4500, turkeyPrice: 1500, duration: '2-3 hours', recovery: 'None' },
      { id: 'lhr-brazilian', name: 'Brazilian/Bikini', price: 400, germanyPrice: 1200, turkeyPrice: 500, duration: '30-45 min', recovery: 'None' },
      { id: 'lhr-legs', name: 'Legs (Full)', price: 500, germanyPrice: 1500, turkeyPrice: 600, duration: '60-90 min', recovery: 'None' },
      { id: 'lhr-face', name: 'Face (Full)', price: 320, germanyPrice: 1200, turkeyPrice: 400, duration: '30 min', recovery: 'None' }
    ]
  },
  {
    id: 'intimate-aesthetics',
    name: 'Intimate Aesthetics',
    icon: 'venus',
    procedures: [
      { id: 'vaginal-laser', name: 'Vaginal Tightening (Laser)', price: 700, germanyPrice: 3000, turkeyPrice: 850, duration: '30-45 min', recovery: '2-3 days' },
      { id: 'vaginal-rf', name: 'Vaginal Tightening (RF)', price: 420, germanyPrice: 2000, turkeyPrice: 500, duration: '30-45 min', recovery: '1-2 days' },
      { id: 'vaginal-hifu', name: 'Vaginal Tightening (HIFU)', price: 320, germanyPrice: 2500, turkeyPrice: 400, duration: '30-45 min', recovery: 'None' },
      { id: 'vaginoplasty', name: 'Vaginoplasty (Surgical)', price: 1400, germanyPrice: 5000, turkeyPrice: 1750, duration: '1-2 hours', recovery: '4-6 weeks' },
      { id: 'labiaplasty', name: 'Labiaplasty', price: 1200, germanyPrice: 3500, turkeyPrice: 1400, duration: '1-2 hours', recovery: '2-4 weeks' }
    ]
  }
]

// Aesthetic Tourism Packages (All-Inclusive)
const AESTHETIC_PACKAGES = [
  {
    id: 'red-sea-renewal',
    name: 'Red Sea Renewal',
    tagline: 'Transform & Recover by the Sea',
    priceRange: { min: 4500, max: 5500 },
    currency: 'USD',
    duration: '7 nights',
    accommodation: '4-Star Beachfront',
    targetMarket: 'European females 25-45',
    proceduresIncluded: ['Rhinoplasty OR Breast Aug/Lift', 'Post-op care', 'Recovery spa treatments'],
    features: ['German Board-Certified Surgeon', 'JCI Hospital', 'Beachfront Recovery', 'Daily Spa', 'Airport VIP Transfer', 'Nutritionist Meals'],
    popular: true
  },
  {
    id: 'confident-curves',
    name: 'Confident Curves',
    tagline: 'Body Sculpting Excellence',
    priceRange: { min: 3800, max: 4800 },
    currency: 'USD',
    duration: '5 nights',
    accommodation: '5-Star Resort',
    targetMarket: 'European females 30-50',
    proceduresIncluded: ['Liposuction (3 areas)', 'VASER + Body RF', 'Compression garments'],
    features: ['German Plastic Surgeon', 'Advanced VASER Technology', '5-Star Recovery Suite', 'Lymphatic Massage', 'Wellness Activities'],
    popular: true
  },
  {
    id: 'executive-refresh',
    name: 'Executive Refresh',
    tagline: 'Non-Surgical Rejuvenation',
    priceRange: { min: 2200, max: 3200 },
    currency: 'USD',
    duration: '3 nights',
    accommodation: '5-Star Resort',
    targetMarket: 'Business travelers 40-60',
    proceduresIncluded: ['Non-surgical facelift (HIFU)', 'Botox', 'Fillers', 'Medical-grade skincare'],
    features: ['Minimal Downtime', 'Business Center Access', 'Spa & Wellness', 'Discreet Service', 'Quick Recovery'],
    popular: false
  },
  {
    id: 'intimate-wellness',
    name: 'Intimate Wellness',
    tagline: 'Feminine Rejuvenation Retreat',
    priceRange: { min: 2500, max: 3500 },
    currency: 'USD',
    duration: '5 nights',
    accommodation: 'Private Villa Option',
    targetMarket: 'European females 35-55',
    proceduresIncluded: ['Vaginal rejuvenation (Laser OR RF, 3 sessions)'],
    features: ['Complete Privacy', 'Female Medical Team Available', 'Private Villa', 'Spa Treatments', 'Holistic Wellness'],
    popular: false
  },
  {
    id: 'mommy-makeover',
    name: 'Mommy Makeover',
    tagline: 'Complete Post-Pregnancy Transformation',
    priceRange: { min: 6500, max: 8500 },
    currency: 'USD',
    duration: '10 nights',
    accommodation: '5-Star Resort',
    targetMarket: 'Post-pregnancy women 28-45',
    proceduresIncluded: ['Tummy Tuck', 'Breast Lift/Augmentation', 'Liposuction (2 areas)'],
    features: ['Comprehensive Body Restoration', 'Extended Recovery Support', 'Childcare Assistance Available', 'Family Suite Option', 'Physiotherapy'],
    popular: true
  },
  {
    id: 'total-transformation',
    name: 'Total Transformation',
    tagline: 'Complete Aesthetic Journey',
    priceRange: { min: 12000, max: 18000 },
    currency: 'USD',
    duration: '21 nights',
    accommodation: 'Private Villa',
    targetMarket: 'Premium clientele',
    proceduresIncluded: ['Multiple procedures (customized)', 'Full body contouring', 'Facial rejuvenation', 'Anti-aging treatments'],
    features: ['Personal Care Manager', 'Private Chef', 'Unlimited Spa', 'Yacht Excursion', 'Lifetime Follow-up'],
    popular: false
  }
]

const WELLNESS_SERVICES = [
  {
    id: 'red-sea-recovery',
    name: 'Red Sea Recovery Retreat',
    category: 'Recovery',
    price: 2500,
    duration: '7 days',
    description: 'Therapeutic Red Sea wellness with German physiotherapy',
    features: ['Hydrotherapy', 'Physiotherapy', 'Nutritional Counseling', 'Mindfulness Sessions']
  },
  {
    id: 'detox-program',
    name: 'Medical Detox Program',
    category: 'Wellness',
    price: 3500,
    duration: '10 days',
    description: 'Comprehensive detoxification under medical supervision',
    features: ['IV Therapy', 'Nutritional Reset', 'Colon Hydrotherapy', 'Liver Support']
  },
  {
    id: 'antiaging-retreat',
    name: 'Anti-Aging Intensive',
    category: 'Anti-Aging',
    price: 8000,
    duration: '14 days',
    description: 'Comprehensive regenerative medicine program',
    features: ['Stem Cell Therapy', 'PRP Treatments', 'Hormone Analysis', 'Nutrition Plan']
  }
]

// Telemedicine Technical Requirements
const TELEMEDICINE_SPECS = {
  videoPlatform: { name: 'Zoom Healthcare or Doxy.me', compliance: 'HIPAA/GDPR-compliant' },
  examinationCamera: { name: 'High-resolution USB camera + ring light' },
  digitalStethoscope: { name: 'Eko Core or ThinkLabs One', connectivity: 'Bluetooth' },
  ehrIntegration: { name: 'Custom API connector', method: 'Zapier or n8n workflow' },
  cloudVps: { specs: '4 vCPU, 8GB RAM, 100GB SSD', cost: '€80-€120/month', compliance: 'GDPR Article 32' }
}

const ACCOMMODATIONS = [
  {
    id: 'standard-hotel',
    name: '4-Star Hotel',
    type: 'Hotel',
    price_per_night: 120,
    features: ['Sea View', 'Breakfast Included', 'Airport Transfer', 'Wi-Fi'],
    rating: 4.2
  },
  {
    id: 'premium-resort',
    name: '5-Star Resort',
    type: 'Resort',
    price_per_night: 280,
    features: ['Private Beach', 'All-Inclusive', 'Spa Access', 'Butler Service', 'Pool'],
    rating: 4.8
  },
  {
    id: 'private-villa',
    name: 'Private Villa',
    type: 'Villa',
    price_per_night: 550,
    features: ['Private Pool', 'Personal Chef', 'Private Nurse Option', '24/7 Concierge', 'Sea View'],
    rating: 5.0
  }
]

const EXCURSIONS = [
  { id: 'red-sea-diving', name: 'Red Sea Diving Experience', price: 150, duration: 'Full Day' },
  { id: 'desert-safari', name: 'Desert Safari Adventure', price: 120, duration: 'Half Day' },
  { id: 'luxor-tour', name: 'Luxor Ancient Temple Tour', price: 250, duration: 'Full Day' },
  { id: 'yacht-cruise', name: 'Private Yacht Cruise', price: 500, duration: 'Full Day' },
  { id: 'snorkeling', name: 'Snorkeling Trip', price: 80, duration: 'Half Day' },
  { id: 'spa-day', name: 'Luxury Spa Day', price: 200, duration: 'Full Day' }
]

// ============================================================================
// API ROUTES
// ============================================================================

// Health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    status: 'healthy',
    service: 'SelectCareOS™ Platform',
    version: '2.0.0',
    provider: 'German Select',
    timestamp: new Date().toISOString()
  })
})

// API info
app.get('/api', (c) => {
  return c.json({
    name: 'SelectCareOS™ API',
    version: '2.0.0',
    description: 'German Select Medical Tourism Platform - German Medical Excellence, Red Sea Recovery',
    provider: 'German Select',
    website: 'https://www.germanselect.org',
    endpoints: {
      doctors: '/api/doctors',
      packages: '/api/packages',
      treatments: '/api/treatments',
      wellness: '/api/wellness',
      accommodations: '/api/accommodations',
      excursions: '/api/excursions',
      bookings: '/api/bookings',
      patients: '/api/patients',
      analytics: '/api/analytics'
    }
  })
})

// Doctors API
app.get('/api/doctors', (c) => {
  const specialization = c.req.query('specialization')
  let filtered = DOCTORS
  if (specialization) {
    filtered = DOCTORS.filter(d => d.specialization.toLowerCase().includes(specialization.toLowerCase()))
  }
  return c.json({ success: true, data: filtered, total: filtered.length })
})

app.get('/api/doctors/:id', (c) => {
  const id = c.req.param('id')
  const doctor = DOCTORS.find(d => d.id === id)
  if (!doctor) return c.json({ success: false, error: 'Doctor not found' }, 404)
  return c.json({ success: true, data: doctor })
})

// Packages API
app.get('/api/packages', (c) => {
  return c.json({ success: true, data: CARE_PACKAGES })
})

app.get('/api/packages/:id', (c) => {
  const id = c.req.param('id')
  const pkg = CARE_PACKAGES.find(p => p.id === id)
  if (!pkg) return c.json({ success: false, error: 'Package not found' }, 404)
  return c.json({ success: true, data: pkg })
})

// Treatments API
app.get('/api/treatments', (c) => {
  return c.json({ success: true, data: TREATMENT_CATEGORIES })
})

app.get('/api/treatments/:categoryId', (c) => {
  const categoryId = c.req.param('categoryId')
  const category = TREATMENT_CATEGORIES.find(t => t.id === categoryId)
  if (!category) return c.json({ success: false, error: 'Category not found' }, 404)
  return c.json({ success: true, data: category })
})

// Wellness API
app.get('/api/wellness', (c) => {
  return c.json({ success: true, data: WELLNESS_SERVICES })
})

// Aesthetic Packages API
app.get('/api/aesthetic-packages', (c) => {
  return c.json({ success: true, data: AESTHETIC_PACKAGES, total: AESTHETIC_PACKAGES.length })
})

app.get('/api/aesthetic-packages/:id', (c) => {
  const id = c.req.param('id')
  const pkg = AESTHETIC_PACKAGES.find(p => p.id === id)
  if (!pkg) return c.json({ success: false, error: 'Aesthetic package not found' }, 404)
  return c.json({ success: true, data: pkg })
})

// Telemedicine Specifications API
app.get('/api/telemedicine/specs', (c) => {
  return c.json({ success: true, data: TELEMEDICINE_SPECS })
})

// Comprehensive Pricing API - All procedures with comparisons
app.get('/api/pricing', (c) => {
  const category = c.req.query('category')
  let categories = TREATMENT_CATEGORIES
  
  if (category) {
    categories = TREATMENT_CATEGORIES.filter(t => t.id === category || t.name.toLowerCase().includes(category.toLowerCase()))
  }
  
  // Calculate total procedures and price ranges
  const summary = {
    totalCategories: categories.length,
    totalProcedures: categories.reduce((sum, cat) => sum + cat.procedures.length, 0),
    priceRange: {
      min: Math.min(...categories.flatMap(c => c.procedures.map(p => p.price))),
      max: Math.max(...categories.flatMap(c => c.procedures.map(p => p.price)))
    },
    avgSavingsVsGermany: '60-70%',
    avgPremiumVsTurkey: '+15-25%'
  }
  
  return c.json({ 
    success: true, 
    data: categories,
    summary,
    note: 'Prices in EUR. German Select includes German board-certified surgeons, JCI hospital, Red Sea recovery, and 12+ months digital follow-up.'
  })
})

// Accommodations API
app.get('/api/accommodations', (c) => {
  return c.json({ success: true, data: ACCOMMODATIONS })
})

// Excursions API
app.get('/api/excursions', (c) => {
  return c.json({ success: true, data: EXCURSIONS })
})

// Analytics overview (demo data)
app.get('/api/analytics/overview', (c) => {
  return c.json({
    success: true,
    revenue: { total: 485000, change: 12.5 },
    bookings: { total: 156, change: 8.3 },
    patients: { total: 89, new: 23 },
    conversion: { rate: 12.4, change: -2.1 }
  })
})

// Health Vitals API - Real-time patient monitoring
app.get('/api/vitals/current', (c) => {
  // Simulated real-time vitals with slight variations
  const baseHR = 72
  const baseSystolic = 120
  const baseDiastolic = 80
  const baseSpO2 = 98
  const baseSteps = 5240
  const baseGlucose = 95
  
  return c.json({
    success: true,
    data: {
      timestamp: new Date().toISOString(),
      heart_rate: {
        value: baseHR + Math.floor(Math.random() * 6) - 3,
        unit: 'bpm',
        status: 'normal',
        trend: 'stable'
      },
      blood_pressure: {
        systolic: baseSystolic + Math.floor(Math.random() * 10) - 5,
        diastolic: baseDiastolic + Math.floor(Math.random() * 6) - 3,
        unit: 'mmHg',
        status: 'normal',
        trend: 'stable'
      },
      oxygen_saturation: {
        value: baseSpO2 + Math.floor(Math.random() * 3) - 1,
        unit: '%',
        status: 'normal'
      },
      steps: {
        value: baseSteps + Math.floor(Math.random() * 500),
        target: 7500,
        unit: 'steps'
      },
      glucose: {
        value: baseGlucose + Math.floor(Math.random() * 10) - 5,
        unit: 'mg/dL',
        status: 'normal',
        trend: 'decreasing'
      },
      weight: {
        current: 82.4,
        initial: 90.0,
        target: 75.0,
        unit: 'kg',
        change: -7.6
      },
      sleep: {
        duration: 7.2,
        quality: 'good',
        deep_sleep: 1.8,
        rem_sleep: 2.1,
        unit: 'hours'
      }
    },
    alerts: [],
    last_sync: new Date().toISOString()
  })
})

// Health history for charts
app.get('/api/vitals/history', (c) => {
  const days = parseInt(c.req.query('days') || '7')
  const metric = c.req.query('metric') || 'heart_rate'
  
  const generateData = (baseValue: number, variance: number) => {
    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split('T')[0],
        value: baseValue + Math.floor(Math.random() * variance * 2) - variance,
        min: baseValue - variance,
        max: baseValue + variance + Math.floor(Math.random() * 5)
      })
    }
    return data
  }
  
  const metrics: Record<string, { base: number, variance: number, unit: string }> = {
    heart_rate: { base: 72, variance: 8, unit: 'bpm' },
    weight: { base: 84, variance: 0.5, unit: 'kg' },
    steps: { base: 5000, variance: 2000, unit: 'steps' },
    glucose: { base: 98, variance: 10, unit: 'mg/dL' },
    blood_pressure_systolic: { base: 120, variance: 8, unit: 'mmHg' }
  }
  
  const config = metrics[metric] || metrics['heart_rate']
  
  return c.json({
    success: true,
    metric,
    unit: config.unit,
    period: `${days} days`,
    data: generateData(config.base, config.variance),
    summary: {
      average: config.base,
      min: config.base - config.variance,
      max: config.base + config.variance,
      trend: 'stable'
    }
  })
})

// Connected devices API
app.get('/api/devices', (c) => {
  return c.json({
    success: true,
    data: [
      {
        id: 'device-1',
        name: 'Apple Watch Series 9',
        type: 'smartwatch',
        brand: 'Apple',
        connected: true,
        last_sync: new Date().toISOString(),
        metrics: ['heart_rate', 'steps', 'sleep', 'ecg'],
        battery: 78
      },
      {
        id: 'device-2',
        name: 'Withings Body+ Scale',
        type: 'scale',
        brand: 'Withings',
        connected: true,
        last_sync: new Date(Date.now() - 3600000).toISOString(),
        metrics: ['weight', 'bmi', 'body_fat'],
        battery: null
      },
      {
        id: 'device-3',
        name: 'Omron Blood Pressure Monitor',
        type: 'blood_pressure',
        brand: 'Omron',
        connected: true,
        last_sync: new Date(Date.now() - 7200000).toISOString(),
        metrics: ['blood_pressure', 'pulse'],
        battery: 92
      },
      {
        id: 'device-4',
        name: 'SelectTech CGM',
        type: 'glucose_monitor',
        brand: 'SelectTech',
        connected: true,
        last_sync: new Date().toISOString(),
        metrics: ['glucose'],
        battery: 65
      }
    ]
  })
})

// AI Health Analysis API
app.get('/api/ai/analysis', (c) => {
  return c.json({
    success: true,
    data: {
      overall_score: 85,
      score_change: 5,
      analysis_date: new Date().toISOString(),
      risk_factors: [
        {
          name: 'Cardiovascular Risk',
          score: 15,
          level: 'low',
          trend: 'improving',
          recommendation: 'Continue current exercise routine. Consider adding 10 more minutes of cardio daily.'
        },
        {
          name: 'Metabolic Health',
          score: 45,
          level: 'moderate',
          trend: 'improving',
          recommendation: 'Blood sugar levels improving. Consider reducing carbohydrate intake by 10% further.'
        },
        {
          name: 'Recovery Progress',
          score: 85,
          level: 'excellent',
          trend: 'ahead_of_schedule',
          recommendation: 'Post-operative recovery is 25% ahead of typical timeline. Continue current protocol.'
        },
        {
          name: 'Sleep Quality',
          score: 72,
          level: 'good',
          trend: 'stable',
          recommendation: 'Sleep duration is adequate. Consider consistent bedtime for improved deep sleep.'
        }
      ],
      recommendations: [
        {
          category: 'Activity',
          title: 'Increase Daily Steps',
          description: 'Studies show 7,500+ daily steps improve post-bariatric outcomes by 23%',
          source: 'NIH Clinical Guidelines 2024',
          priority: 'medium',
          action: 'Add 500 steps to daily target'
        },
        {
          category: 'Nutrition',
          title: 'Protein Timing',
          description: 'Consuming protein within 30 minutes post-exercise enhances muscle recovery',
          source: 'ASMBS Guidelines',
          priority: 'high',
          action: 'Schedule protein shake after morning walk'
        },
        {
          category: 'Sleep',
          title: 'Sleep Optimization',
          description: '7-9 hours of sleep accelerates surgical recovery by up to 40%',
          source: 'Sleep Medicine Reviews',
          priority: 'medium',
          action: 'Maintain consistent 10:30 PM bedtime'
        }
      ],
      next_assessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  })
})

// Appointments/Bookings API
app.get('/api/appointments', (c) => {
  const status = c.req.query('status') // upcoming, past, all
  
  const appointments = [
    {
      id: 'apt-001',
      type: 'video_call',
      title: 'Cardiology Follow-up',
      doctor: {
        id: 'dr-muller',
        name: 'Dr. K. Müller',
        specialization: 'Cardiology',
        avatar: 'KM'
      },
      date: '2024-10-22',
      time: '10:00',
      duration: 30,
      status: 'upcoming',
      notes: 'Post-surgery cardiac evaluation'
    },
    {
      id: 'apt-002',
      type: 'in_person',
      title: 'Nutrition Plan Review',
      doctor: {
        id: 'dr-schmidt',
        name: 'Dr. A. Schmidt',
        specialization: 'Nutritionist',
        avatar: 'AS'
      },
      date: '2024-11-05',
      time: '14:00',
      duration: 45,
      status: 'upcoming',
      notes: 'Week 4 dietary adjustments'
    },
    {
      id: 'apt-003',
      type: 'video_call',
      title: 'Surgical Follow-up',
      doctor: {
        id: 'dr-fischer',
        name: 'Dr. H. Fischer',
        specialization: 'Bariatric Surgery',
        avatar: 'HF'
      },
      date: '2024-10-19',
      time: '09:00',
      duration: 20,
      status: 'completed',
      notes: 'Incision healing check'
    }
  ]
  
  let filtered = appointments
  if (status === 'upcoming') {
    filtered = appointments.filter(a => a.status === 'upcoming')
  } else if (status === 'past') {
    filtered = appointments.filter(a => a.status === 'completed')
  }
  
  return c.json({
    success: true,
    data: filtered,
    total: filtered.length
  })
})

// Messages API
app.get('/api/messages', (c) => {
  return c.json({
    success: true,
    data: [
      {
        id: 'msg-001',
        from: { id: 'dr-fischer', name: 'Dr. H. Fischer', role: 'doctor', avatar: 'HF' },
        subject: 'Recovery Progress Update',
        preview: 'Your recovery is progressing excellently! I have reviewed your latest vitals and I am very pleased with...',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
        read: false,
        priority: 'normal'
      },
      {
        id: 'msg-002',
        from: { id: 'dr-schmidt', name: 'Dr. A. Schmidt', role: 'doctor', avatar: 'AS' },
        subject: 'Updated Nutrition Plan',
        preview: 'Here is your updated nutrition plan for Week 2. Please follow the protein intake guidelines...',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
        read: true,
        priority: 'normal'
      },
      {
        id: 'msg-003',
        from: { id: 'care-coord', name: 'Care Coordinator', role: 'coordinator', avatar: 'CC' },
        subject: 'Appointment Confirmation',
        preview: 'Your next appointment has been confirmed. Transport will arrive at 9:30 AM on Oct 22...',
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
        read: true,
        priority: 'normal'
      }
    ],
    unread_count: 1
  })
})

// Treatment timeline API
app.get('/api/timeline', (c) => {
  return c.json({
    success: true,
    data: {
      current_phase: 'recovery',
      current_week: 2,
      total_weeks: 6,
      progress_percent: 75,
      phases: [
        {
          id: 'pre-op',
          name: 'Pre-Operative Phase',
          status: 'completed',
          start_date: '2024-09-15',
          end_date: '2024-10-11',
          milestones: [
            { name: 'Initial Consultation', status: 'completed', date: '2024-09-15' },
            { name: 'Medical Evaluation', status: 'completed', date: '2024-09-22' },
            { name: 'Lab Tests & Imaging', status: 'completed', date: '2024-10-01' },
            { name: 'Risk Assessment', status: 'completed', date: '2024-10-11' }
          ]
        },
        {
          id: 'surgery',
          name: 'Surgery Day',
          status: 'completed',
          start_date: '2024-10-12',
          end_date: '2024-10-12',
          details: {
            procedure: 'Gastric Sleeve',
            surgeon: 'Dr. H. Fischer',
            duration: '2.5 hours',
            outcome: 'Successful - No Complications'
          }
        },
        {
          id: 'recovery',
          name: 'Recovery Phase',
          status: 'in_progress',
          start_date: '2024-10-13',
          end_date: '2024-11-25',
          current_week: 2,
          milestones: [
            { name: 'Week 1: Initial Assessment', status: 'completed', date: '2024-10-15' },
            { name: 'Week 2: Light Activity', status: 'in_progress', date: '2024-10-22' },
            { name: 'Week 3: Mobility Training', status: 'pending', date: '2024-10-29' },
            { name: 'Week 4-5: Progressive Exercise', status: 'pending', date: '2024-11-05' },
            { name: 'Week 6: Advanced Strengthening', status: 'pending', date: '2024-11-19' }
          ]
        },
        {
          id: 'follow-up',
          name: 'Follow-up Phase',
          status: 'pending',
          start_date: '2024-11-26',
          end_date: '2024-12-26'
        },
        {
          id: 'long-term',
          name: 'Long-term Support',
          status: 'pending',
          start_date: '2024-12-27',
          duration: '12+ months'
        }
      ]
    }
  })
})

// ============================================================================
// FRONTEND PAGES
// ============================================================================

// Main app shell with SelectCareOS design
const appShell = (content: string, title: string, activeNav: string = 'home') => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title} - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #F8F6F0;
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            min-height: 100vh;
            padding-bottom: 80px;
        }
        
        .bg-navy { background-color: var(--navy); }
        .bg-navy-light { background-color: var(--navy-light); }
        .bg-gold { background-color: var(--gold); }
        .bg-gold-light { background-color: var(--gold-light); }
        .bg-cream { background-color: var(--cream); }
        
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        
        .border-gold { border-color: var(--gold); }
        .border-navy { border-color: var(--navy); }
        
        .gradient-gold {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 50%, var(--gold-light) 100%);
        }
        
        .gradient-navy {
            background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%);
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
        }
        
        .card-gold {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
            border-radius: 16px;
        }
        
        .card-navy {
            background: var(--navy);
            border-radius: 12px;
            color: white;
        }
        
        .progress-ring {
            transform: rotate(-90deg);
        }
        
        .progress-ring-circle {
            transition: stroke-dashoffset 0.5s ease;
        }
        
        .timeline-line {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, var(--gold) 0%, var(--gold-light) 100%);
        }
        
        .timeline-dot {
            width: 12px;
            height: 12px;
            background: var(--gold);
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(201, 162, 39, 0.4);
        }
        
        .timeline-dot-large {
            width: 40px;
            height: 40px;
            background: white;
            border: 3px solid var(--gold);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 20px;
            z-index: 100;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            color: #9CA3AF;
            font-size: 10px;
            transition: all 0.2s;
        }
        
        .nav-item.active {
            color: var(--gold);
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .status-completed { background: #DCFCE7; color: #166534; }
        .status-in-progress { background: var(--gold-light); color: var(--navy); }
        .status-upcoming { background: #DBEAFE; color: #1E40AF; }
        .status-pending { background: #FEF3C7; color: #92400E; }
        
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--navy);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
        }
        
        .avatar-gold {
            background: var(--gold);
            color: var(--navy);
        }
        
        .health-metric {
            background: white;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .metric-value {
            font-size: 24px;
            font-weight: 700;
            color: var(--navy);
        }
        
        .metric-label {
            font-size: 11px;
            color: #6B7280;
            margin-top: 4px;
        }
        
        .ai-insight {
            background: linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 100%);
            border-left: 4px solid var(--gold);
            border-radius: 0 12px 12px 0;
            padding: 16px;
        }
        
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .btn-gold:hover {
            background: #B8922A;
            transform: translateY(-1px);
        }
        
        .btn-navy {
            background: var(--navy);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .btn-navy:hover {
            background: var(--navy-light);
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--gold);
            color: var(--gold);
            padding: 10px 22px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .btn-outline:hover {
            background: var(--gold);
            color: var(--navy);
        }
        
        .appointment-card {
            background: var(--navy);
            color: white;
            border-radius: 12px;
            padding: 16px;
            position: relative;
            overflow: hidden;
        }
        
        .appointment-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            background: var(--gold);
            opacity: 0.1;
            border-radius: 0 0 0 60px;
        }
        
        .floating-action {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 56px;
            height: 56px;
            background: var(--gold);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--navy);
            font-size: 24px;
            box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
            z-index: 50;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .floating-action:hover {
            transform: scale(1.1);
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .pulse { animation: pulse 2s infinite; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-cream">
    ${content}
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item ${activeNav === 'home' ? 'active' : ''}">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/timeline" class="nav-item ${activeNav === 'timeline' ? 'active' : ''}">
                <i class="fas fa-stream"></i>
                <span>Timeline</span>
            </a>
            <a href="/messages" class="nav-item ${activeNav === 'messages' ? 'active' : ''}">
                <i class="fas fa-comment-dots"></i>
                <span>Messages</span>
            </a>
            <a href="/care-team" class="nav-item ${activeNav === 'care-team' ? 'active' : ''}">
                <i class="fas fa-user-md"></i>
                <span>Care Team</span>
            </a>
            <a href="/profile" class="nav-item ${activeNav === 'profile' ? 'active' : ''}">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`

// Home/Dashboard Page (Patient View)
app.get('/', (c) => {
  const content = `
    <!-- Header -->
    <header class="gradient-navy px-5 pt-12 pb-6">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-white text-xl font-semibold tracking-wide">SelectCare<span class="text-gold">OS</span>™</h1>
            </div>
            <div class="flex items-center space-x-3">
                <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                    <i class="fas fa-bell"></i>
                </button>
                <div class="avatar avatar-gold">JD</div>
            </div>
        </div>
        
        <!-- Surgery Status Card -->
        <div class="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                    <i class="fas fa-running text-navy"></i>
                </div>
                <div>
                    <h3 class="text-white font-semibold">SURGERY PREPARATION</h3>
                    <p class="text-gold text-sm">Status: Completed - Oct 12</p>
                </div>
            </div>
        </div>
        
        <!-- Recovery Phase Card -->
        <div class="card-gold p-5">
            <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <i class="fas fa-check text-gold"></i>
                </div>
                <div>
                    <h3 class="text-navy font-bold text-lg">RECOVERY PHASE:</h3>
                    <p class="text-navy font-bold">POST-OP REHAB</p>
                </div>
            </div>
            
            <!-- Progress Ring -->
            <div class="flex items-center justify-between">
                <div class="relative w-24 h-24">
                    <svg class="progress-ring w-24 h-24" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="8"/>
                        <circle class="progress-ring-circle" cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="70"/>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-navy text-2xl font-bold">75%</span>
                        <span class="text-navy text-xs">COMPLETE</span>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="flex-1 ml-6">
                    <div class="h-2 bg-white/30 rounded-full overflow-hidden">
                        <div class="h-full bg-white rounded-full" style="width: 75%"></div>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                        <div class="w-3 h-3 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Current Week Milestone -->
        <div class="relative">
            <div class="flex items-start space-x-4">
                <div class="timeline-dot-large">
                    <i class="fas fa-clipboard-list text-gold"></i>
                </div>
                <div class="flex-1">
                    <div class="card p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-xs font-bold text-navy">WEEK 1:</p>
                                <h4 class="font-bold text-navy">INITIAL ASSESSMENT</h4>
                                <p class="text-xs text-gray-500">Oct 15 - 21</p>
                            </div>
                            <span class="status-badge status-completed">Completed</span>
                        </div>
                        <p class="text-sm text-gray-600">Dr. L. Weber, Orthopedics.</p>
                        <p class="text-sm text-gray-600">Follow-up: Oct 19</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Appointment Cards -->
        <div class="space-y-4">
            <div class="appointment-card ml-14">
                <p class="text-xs font-semibold text-gold mb-1">APPOINTMENT:</p>
                <h4 class="font-bold text-lg">CARDIOLOGY CONSULT</h4>
                <p class="text-gold text-sm">Oct 22, 10:00 AM</p>
                <div class="flex items-center mt-3 space-x-2">
                    <div class="avatar" style="width:32px;height:32px;font-size:12px;">KM</div>
                    <div>
                        <p class="text-sm">Dr. K. Müller,</p>
                        <p class="text-xs text-gray-300">Cardiologist</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Upcoming Milestones -->
        <div class="card p-4">
            <h4 class="font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-flag text-gold mr-2"></i>
                UPCOMING MILESTONES
            </h4>
            <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-cream rounded-xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                            <i class="fas fa-dumbbell text-gold"></i>
                        </div>
                        <div>
                            <p class="font-bold text-navy text-sm">WEEK 3: MOBILITY TRAINING</p>
                            <p class="text-xs text-gray-500">Oct 29 - Nov 4</p>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-cream rounded-xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                            <i class="fas fa-heartbeat text-gold"></i>
                        </div>
                        <div>
                            <p class="font-bold text-navy text-sm">WEEK 6: ADVANCED STRENGTHENING</p>
                            <p class="text-xs text-gray-500">Nov 19 - 25</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Next Appointment -->
        <div class="appointment-card">
            <p class="text-xs font-semibold text-gold mb-1">APPOINTMENT:</p>
            <h4 class="font-bold text-lg">NUTRITION PLAN</h4>
            <p class="text-gold text-sm">Nov 5, 2:00 PM</p>
            <div class="flex items-center mt-3 space-x-2">
                <div class="avatar" style="width:32px;height:32px;font-size:12px;">AS</div>
                <div>
                    <p class="text-sm">Dr. A. Schmidt,</p>
                    <p class="text-xs text-gray-300">Nutritionist</p>
                </div>
            </div>
        </div>
        
        <!-- Health Metrics -->
        <div>
            <h4 class="font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-chart-line text-gold mr-2"></i>
                HEALTH METRICS
            </h4>
            <div class="grid grid-cols-3 gap-3">
                <div class="health-metric">
                    <i class="fas fa-heartbeat text-red-500 mb-2"></i>
                    <div class="metric-value">72</div>
                    <div class="metric-label">Heart Rate</div>
                </div>
                <div class="health-metric">
                    <i class="fas fa-weight text-blue-500 mb-2"></i>
                    <div class="metric-value">-8kg</div>
                    <div class="metric-label">Weight Loss</div>
                </div>
                <div class="health-metric">
                    <i class="fas fa-walking text-green-500 mb-2"></i>
                    <div class="metric-value">5,240</div>
                    <div class="metric-label">Steps Today</div>
                </div>
            </div>
        </div>
        
        <!-- AI Insights -->
        <div class="ai-insight">
            <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-navy"></i>
                </div>
                <div>
                    <h4 class="font-bold text-navy mb-1">AI Health Insight</h4>
                    <p class="text-sm text-gray-600">Your recovery is progressing well! Based on your activity data, consider increasing your daily walk by 500 steps. Your vitals are within optimal range.</p>
                    <button class="text-gold text-sm font-semibold mt-2">View Full Analysis →</button>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-2 gap-4">
            <a href="/booking" class="btn-gold text-center flex items-center justify-center space-x-2">
                <i class="fas fa-calendar-plus"></i>
                <span>Book Consultation</span>
            </a>
            <a href="/telemedicine" class="btn-navy text-center flex items-center justify-center space-x-2">
                <i class="fas fa-video"></i>
                <span>Video Call</span>
            </a>
        </div>
    </main>
    
    <!-- Floating Action Button -->
    <a href="/emergency" class="floating-action">
        <i class="fas fa-phone-alt"></i>
    </a>
  `
  
  return c.html(appShell(content, 'Home', 'home'))
})

// Timeline Page
app.get('/timeline', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-white text-xl font-bold">Treatment Timeline</h1>
            <button class="text-white">
                <i class="fas fa-filter"></i>
            </button>
        </div>
        <p class="text-gold">Your complete care journey</p>
    </header>
    
    <main class="px-5 py-6">
        <div class="relative">
            <div class="timeline-line"></div>
            
            <!-- Phase: Pre-Op -->
            <div class="relative pl-12 pb-8">
                <div class="absolute left-0 timeline-dot-large bg-green-100 border-green-500">
                    <i class="fas fa-check text-green-600"></i>
                </div>
                <div class="card p-4">
                    <span class="status-badge status-completed mb-2 inline-block">Completed</span>
                    <h3 class="font-bold text-navy">PRE-OPERATIVE PHASE</h3>
                    <p class="text-sm text-gray-500 mb-3">Sep 15 - Oct 11</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            Initial Consultation
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            Medical Evaluation
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            Lab Tests & Imaging
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            Risk Assessment Complete
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Phase: Surgery -->
            <div class="relative pl-12 pb-8">
                <div class="absolute left-0 timeline-dot-large bg-green-100 border-green-500">
                    <i class="fas fa-check text-green-600"></i>
                </div>
                <div class="card p-4">
                    <span class="status-badge status-completed mb-2 inline-block">Completed</span>
                    <h3 class="font-bold text-navy">SURGERY DAY</h3>
                    <p class="text-sm text-gray-500 mb-3">Oct 12</p>
                    <div class="bg-cream p-3 rounded-lg">
                        <p class="text-sm"><strong>Procedure:</strong> Gastric Sleeve</p>
                        <p class="text-sm"><strong>Surgeon:</strong> Dr. H. Fischer</p>
                        <p class="text-sm"><strong>Duration:</strong> 2.5 hours</p>
                        <p class="text-sm text-green-600 font-semibold mt-2">✓ Successful - No Complications</p>
                    </div>
                </div>
            </div>
            
            <!-- Phase: Recovery (Current) -->
            <div class="relative pl-12 pb-8">
                <div class="absolute left-0 timeline-dot-large border-gold">
                    <i class="fas fa-spinner fa-spin text-gold"></i>
                </div>
                <div class="card-gold p-4">
                    <span class="status-badge status-in-progress mb-2 inline-block">In Progress</span>
                    <h3 class="font-bold text-navy">RECOVERY PHASE</h3>
                    <p class="text-sm text-navy/70 mb-3">Oct 13 - Nov 25 (Week 2 of 6)</p>
                    
                    <div class="bg-white/50 rounded-lg p-3 mb-3">
                        <p class="text-sm font-semibold text-navy">Current Focus:</p>
                        <p class="text-sm text-navy/80">Initial Assessment & Mobility</p>
                    </div>
                    
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-navy">Week 1: Initial Assessment</span>
                            <i class="fas fa-check text-green-600"></i>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-navy font-semibold">Week 2: Light Activity</span>
                            <span class="text-gold">← Current</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-navy/60">
                            <span>Week 3: Mobility Training</span>
                            <span>Oct 29</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-navy/60">
                            <span>Week 4-5: Progressive Exercise</span>
                            <span>Nov 5</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-navy/60">
                            <span>Week 6: Advanced Strengthening</span>
                            <span>Nov 19</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Phase: Follow-up -->
            <div class="relative pl-12 pb-8">
                <div class="absolute left-0 timeline-dot-large">
                    <i class="fas fa-calendar text-gold"></i>
                </div>
                <div class="card p-4 opacity-75">
                    <span class="status-badge status-upcoming mb-2 inline-block">Upcoming</span>
                    <h3 class="font-bold text-navy">FOLLOW-UP PHASE</h3>
                    <p class="text-sm text-gray-500 mb-3">Nov 26 - Dec 26</p>
                    <div class="text-sm text-gray-600">
                        <p>• Monthly check-ins</p>
                        <p>• Progress evaluation</p>
                        <p>• Nutrition adjustments</p>
                    </div>
                </div>
            </div>
            
            <!-- Phase: Long-term -->
            <div class="relative pl-12">
                <div class="absolute left-0 timeline-dot-large">
                    <i class="fas fa-infinity text-gold"></i>
                </div>
                <div class="card p-4 opacity-50">
                    <span class="status-badge status-pending mb-2 inline-block">Future</span>
                    <h3 class="font-bold text-navy">LONG-TERM SUPPORT</h3>
                    <p class="text-sm text-gray-500 mb-3">12+ months</p>
                    <div class="text-sm text-gray-600">
                        <p>• Digital monitoring</p>
                        <p>• Annual check-ups</p>
                        <p>• Lifetime support access</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Timeline', 'timeline'))
})

// Care Team Page
app.get('/care-team', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <h1 class="text-white text-xl font-bold mb-2">Your Care Team</h1>
        <p class="text-gold">German Board-Certified Specialists</p>
    </header>
    
    <main class="px-5 py-6 space-y-4">
        ${DOCTORS.slice(0, 6).map(doc => `
            <div class="card p-4">
                <div class="flex items-start space-x-4">
                    <div class="avatar ${doc.is_premium ? 'avatar-gold' : ''}" style="width:56px;height:56px;font-size:18px;">
                        ${doc.avatar}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="font-bold text-navy">${doc.name}</h3>
                                <p class="text-sm text-gold">${doc.specialization}</p>
                                <p class="text-xs text-gray-500">${doc.title}</p>
                            </div>
                            ${doc.available ? '<span class="w-3 h-3 bg-green-500 rounded-full pulse"></span>' : ''}
                        </div>
                        
                        <div class="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                            <span><i class="fas fa-star text-gold mr-1"></i>${doc.rating}</span>
                            <span><i class="fas fa-comment mr-1"></i>${doc.total_reviews} reviews</span>
                            <span><i class="fas fa-clock mr-1"></i>${doc.experience_years}y exp</span>
                        </div>
                        
                        <div class="flex space-x-2 mt-4">
                            <button class="btn-gold text-xs py-2 px-4 flex-1">
                                <i class="fas fa-video mr-1"></i> Video Call
                            </button>
                            <button class="btn-outline text-xs py-2 px-4 flex-1">
                                <i class="fas fa-comment mr-1"></i> Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
        
        <div class="card p-4 bg-gold/10 border-2 border-gold border-dashed">
            <div class="text-center">
                <i class="fas fa-plus-circle text-gold text-3xl mb-2"></i>
                <p class="font-semibold text-navy">Request Additional Specialist</p>
                <p class="text-sm text-gray-500">Need another specialist? We'll connect you.</p>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Care Team', 'care-team'))
})

// Messages Page
app.get('/messages', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <h1 class="text-white text-xl font-bold mb-2">Messages</h1>
        <p class="text-gold">Secure communication with your care team</p>
    </header>
    
    <main class="px-5 py-6 space-y-4">
        <!-- Unread Messages -->
        <div class="card p-4 border-l-4 border-gold">
            <div class="flex items-start space-x-3">
                <div class="avatar">HF</div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-navy">Dr. H. Fischer</h4>
                        <span class="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Your recovery is progressing excellently! I've reviewed your latest vitals and I'm very pleased with...</p>
                    <span class="text-xs bg-gold text-navy px-2 py-1 rounded-full mt-2 inline-block">Unread</span>
                </div>
            </div>
        </div>
        
        <div class="card p-4">
            <div class="flex items-start space-x-3">
                <div class="avatar avatar-gold">AS</div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-navy">Dr. A. Schmidt</h4>
                        <span class="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Here's your updated nutrition plan for Week 2. Please follow the protein intake guidelines...</p>
                </div>
            </div>
        </div>
        
        <div class="card p-4">
            <div class="flex items-start space-x-3">
                <div class="avatar">CC</div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-navy">Care Coordinator</h4>
                        <span class="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Your next appointment has been confirmed. Transport will arrive at 9:30 AM on Oct 22...</p>
                </div>
            </div>
        </div>
        
        <div class="card p-4">
            <div class="flex items-start space-x-3">
                <div class="avatar">LW</div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-navy">Dr. L. Weber</h4>
                        <span class="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Initial assessment completed. You're cleared for light mobility exercises starting tomorrow...</p>
                </div>
            </div>
        </div>
        
        <!-- AI Assistant -->
        <div class="ai-insight">
            <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-navy"></i>
                </div>
                <div>
                    <h4 class="font-bold text-navy">SelectCare AI Assistant</h4>
                    <p class="text-sm text-gray-600 mt-1">Hi! I'm here 24/7 to answer questions about your recovery, medications, or appointments. How can I help?</p>
                    <button class="btn-gold text-sm mt-3">Start Chat</button>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Compose Button -->
    <a href="/compose" class="floating-action">
        <i class="fas fa-pen"></i>
    </a>
  `
  
  return c.html(appShell(content, 'Messages', 'messages'))
})

// Profile Page
app.get('/profile', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-8 text-center">
        <div class="w-24 h-24 mx-auto bg-gold rounded-full flex items-center justify-center text-navy text-3xl font-bold mb-4">
            JD
        </div>
        <h1 class="text-white text-xl font-bold">John Doe</h1>
        <p class="text-gold">SELECTCARE+ Patient</p>
        <p class="text-white/60 text-sm mt-1">Patient ID: GS-2024-00847</p>
    </header>
    
    <main class="px-5 py-6 space-y-4">
        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-3">
            <div class="card p-4 text-center">
                <p class="text-2xl font-bold text-navy">75%</p>
                <p class="text-xs text-gray-500">Recovery</p>
            </div>
            <div class="card p-4 text-center">
                <p class="text-2xl font-bold text-navy">8</p>
                <p class="text-xs text-gray-500">Appointments</p>
            </div>
            <div class="card p-4 text-center">
                <p class="text-2xl font-bold text-navy">-12kg</p>
                <p class="text-xs text-gray-500">Weight Loss</p>
            </div>
        </div>
        
        <!-- Menu Items -->
        <div class="card divide-y">
            <a href="/profile/personal" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-user text-gold w-6"></i>
                    <span class="font-medium text-navy">Personal Information</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/profile/medical" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-file-medical text-gold w-6"></i>
                    <span class="font-medium text-navy">Medical Records</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/profile/insurance" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-shield-alt text-gold w-6"></i>
                    <span class="font-medium text-navy">Insurance & Payments</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/health-devices" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-heartbeat text-gold w-6"></i>
                    <span class="font-medium text-navy">Connected Health Devices</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/profile/accommodation" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-hotel text-gold w-6"></i>
                    <span class="font-medium text-navy">Accommodation Details</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/profile/documents" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-folder text-gold w-6"></i>
                    <span class="font-medium text-navy">Documents & Reports</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
        </div>
        
        <!-- Support -->
        <div class="card divide-y">
            <a href="/support" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-headset text-gold w-6"></i>
                    <span class="font-medium text-navy">24/7 Support</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
            <a href="/settings" class="flex items-center justify-between p-4">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-cog text-gold w-6"></i>
                    <span class="font-medium text-navy">Settings</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </a>
        </div>
        
        <button class="w-full text-red-500 font-medium py-4">
            <i class="fas fa-sign-out-alt mr-2"></i> Sign Out
        </button>
    </main>
  `
  
  return c.html(appShell(content, 'Profile', 'profile'))
})

// Booking Page
app.get('/booking', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">Book Consultation</h1>
        <p class="text-gold">Schedule with our specialists</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Consultation Type -->
        <div>
            <h3 class="font-bold text-navy mb-3">Consultation Type</h3>
            <div class="grid grid-cols-2 gap-3">
                <button class="card p-4 text-center border-2 border-gold">
                    <i class="fas fa-video text-gold text-2xl mb-2"></i>
                    <p class="font-semibold text-navy">Video Call</p>
                    <p class="text-xs text-gray-500">From anywhere</p>
                </button>
                <button class="card p-4 text-center border-2 border-transparent">
                    <i class="fas fa-hospital text-gold text-2xl mb-2"></i>
                    <p class="font-semibold text-navy">In-Person</p>
                    <p class="text-xs text-gray-500">At facility</p>
                </button>
            </div>
        </div>
        
        <!-- Select Specialty -->
        <div>
            <h3 class="font-bold text-navy mb-3">Select Specialty</h3>
            <div class="grid grid-cols-2 gap-3">
                ${TREATMENT_CATEGORIES.map(cat => `
                    <button class="card p-4 text-left hover:border-gold hover:border-2 transition-all">
                        <div class="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-2">
                            <i class="fas fa-${cat.icon === 'weight' ? 'weight' : cat.icon === 'bone' ? 'bone' : cat.icon === 'sparkles' ? 'magic' : cat.icon === 'clock' ? 'clock' : 'heart'} text-gold"></i>
                        </div>
                        <p class="font-semibold text-navy text-sm">${cat.name}</p>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <!-- Select Doctor -->
        <div>
            <h3 class="font-bold text-navy mb-3">Available Doctors</h3>
            <div class="space-y-3">
                ${DOCTORS.slice(0, 4).map(doc => `
                    <button class="card p-4 w-full text-left hover:border-gold hover:border-2 transition-all">
                        <div class="flex items-center space-x-3">
                            <div class="avatar">${doc.avatar}</div>
                            <div class="flex-1">
                                <p class="font-semibold text-navy">${doc.name}</p>
                                <p class="text-xs text-gray-500">${doc.specialization}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-gold">€${doc.consultation_fee}</p>
                                <p class="text-xs text-gray-500">per session</p>
                            </div>
                        </div>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <!-- Date Selection -->
        <div>
            <h3 class="font-bold text-navy mb-3">Select Date & Time</h3>
            <input type="date" class="w-full p-4 border rounded-xl mb-3">
            <div class="grid grid-cols-4 gap-2">
                <button class="p-3 border rounded-lg text-sm hover:bg-gold hover:text-navy">9:00</button>
                <button class="p-3 border rounded-lg text-sm hover:bg-gold hover:text-navy">10:00</button>
                <button class="p-3 border rounded-lg text-sm bg-gold text-navy">11:00</button>
                <button class="p-3 border rounded-lg text-sm hover:bg-gold hover:text-navy">14:00</button>
                <button class="p-3 border rounded-lg text-sm hover:bg-gold hover:text-navy">15:00</button>
                <button class="p-3 border rounded-lg text-sm hover:bg-gold hover:text-navy">16:00</button>
            </div>
        </div>
        
        <button class="btn-gold w-full text-lg py-4">
            <i class="fas fa-calendar-check mr-2"></i> Confirm Booking
        </button>
    </main>
  `
  
  return c.html(appShell(content, 'Book Consultation', 'home'))
})

// Telemedicine Page
app.get('/telemedicine', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">Telemedicine</h1>
        <p class="text-gold">Connect with your care team</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Upcoming Video Calls -->
        <div>
            <h3 class="font-bold text-navy mb-3">Upcoming Sessions</h3>
            <div class="card p-4 border-l-4 border-gold">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="avatar">KM</div>
                        <div>
                            <p class="font-bold text-navy">Dr. K. Müller</p>
                            <p class="text-sm text-gray-500">Cardiology Follow-up</p>
                            <p class="text-xs text-gold mt-1"><i class="fas fa-clock mr-1"></i>Oct 22, 10:00 AM</p>
                        </div>
                    </div>
                    <button class="btn-gold py-2 px-4">
                        <i class="fas fa-video mr-1"></i> Join
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Quick Connect -->
        <div>
            <h3 class="font-bold text-navy mb-3">Quick Connect</h3>
            <div class="grid grid-cols-2 gap-4">
                <button class="card p-6 text-center">
                    <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                        <i class="fas fa-phone-alt text-red-600 text-2xl"></i>
                    </div>
                    <p class="font-semibold text-navy">Emergency</p>
                    <p class="text-xs text-gray-500">24/7 Hotline</p>
                </button>
                <button class="card p-6 text-center">
                    <div class="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-3">
                        <i class="fas fa-user-md text-gold text-2xl"></i>
                    </div>
                    <p class="font-semibold text-navy">On-Call Doctor</p>
                    <p class="text-xs text-gray-500">Available Now</p>
                </button>
            </div>
        </div>
        
        <!-- Remote Monitoring -->
        <div class="card p-4">
            <h3 class="font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-heartbeat text-gold mr-2"></i>
                Remote Monitoring Status
            </h3>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-green-50 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">Heart Rate</p>
                    <p class="text-xl font-bold text-navy">72 <span class="text-sm font-normal">bpm</span></p>
                    <p class="text-xs text-green-600"><i class="fas fa-check-circle mr-1"></i>Normal</p>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">Blood Pressure</p>
                    <p class="text-xl font-bold text-navy">120/80</p>
                    <p class="text-xs text-green-600"><i class="fas fa-check-circle mr-1"></i>Normal</p>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">SpO2</p>
                    <p class="text-xl font-bold text-navy">98%</p>
                    <p class="text-xs text-green-600"><i class="fas fa-check-circle mr-1"></i>Normal</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">Activity</p>
                    <p class="text-xl font-bold text-navy">3,200</p>
                    <p class="text-xs text-yellow-600"><i class="fas fa-info-circle mr-1"></i>Below target</p>
                </div>
            </div>
            <p class="text-xs text-gray-500 mt-3 text-center">Last synced: 10 minutes ago</p>
        </div>
        
        <!-- Health Devices -->
        <div class="card p-4">
            <h3 class="font-bold text-navy mb-3">Connected Devices</h3>
            <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-cream rounded-lg">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-watch text-gold text-xl"></i>
                        <div>
                            <p class="font-medium text-navy">Apple Watch</p>
                            <p class="text-xs text-green-600">Connected</p>
                        </div>
                    </div>
                    <i class="fas fa-check-circle text-green-500"></i>
                </div>
                <div class="flex items-center justify-between p-3 bg-cream rounded-lg">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-weight text-gold text-xl"></i>
                        <div>
                            <p class="font-medium text-navy">Smart Scale</p>
                            <p class="text-xs text-green-600">Connected</p>
                        </div>
                    </div>
                    <i class="fas fa-check-circle text-green-500"></i>
                </div>
                <button class="w-full p-3 border-2 border-dashed border-gold rounded-lg text-gold font-medium">
                    <i class="fas fa-plus mr-2"></i>Add Device
                </button>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Telemedicine', 'home'))
})

// Health Analytics Page
app.get('/health-analytics', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">AI Health Analytics</h1>
        <p class="text-gold">Evidence-based insights</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Risk Score -->
        <div class="card p-6 text-center">
            <h3 class="font-bold text-navy mb-4">Overall Health Score</h3>
            <div class="relative w-32 h-32 mx-auto mb-4">
                <svg class="progress-ring w-32 h-32" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="8"/>
                    <circle class="progress-ring-circle" cx="50" cy="50" r="45" fill="none" stroke="#22C55E" stroke-width="8" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="42"/>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-4xl font-bold text-navy">85</span>
                    <span class="text-sm text-gray-500">/ 100</span>
                </div>
            </div>
            <p class="text-green-600 font-semibold"><i class="fas fa-arrow-up mr-1"></i>+5 points this week</p>
        </div>
        
        <!-- AI Insights -->
        <div>
            <h3 class="font-bold text-navy mb-3 flex items-center">
                <i class="fas fa-brain text-gold mr-2"></i>
                AI Risk Analysis
            </h3>
            <div class="space-y-3">
                <div class="ai-insight">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold text-navy">Cardiovascular Risk</span>
                        <span class="text-green-600 font-bold">Low</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 rounded-full" style="width: 15%"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">Your heart health indicators are excellent. Continue with current lifestyle.</p>
                </div>
                
                <div class="ai-insight">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold text-navy">Metabolic Health</span>
                        <span class="text-yellow-600 font-bold">Moderate</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-yellow-500 rounded-full" style="width: 45%"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">Blood sugar levels improving. Consider reducing carbohydrate intake further.</p>
                </div>
                
                <div class="ai-insight">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold text-navy">Recovery Progress</span>
                        <span class="text-green-600 font-bold">Excellent</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 rounded-full" style="width: 85%"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">Post-operative recovery is ahead of schedule. 25% faster than average.</p>
                </div>
            </div>
        </div>
        
        <!-- Evidence-Based Recommendations -->
        <div>
            <h3 class="font-bold text-navy mb-3 flex items-center">
                <i class="fas fa-lightbulb text-gold mr-2"></i>
                Evidence-Based Recommendations
            </h3>
            <div class="space-y-3">
                <div class="card p-4">
                    <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-walking text-blue-600"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">Increase Daily Steps</p>
                            <p class="text-sm text-gray-600">Studies show 7,500+ daily steps improve post-bariatric outcomes by 23%</p>
                            <p class="text-xs text-gold mt-1">Source: NIH Clinical Guidelines 2024</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-apple-alt text-green-600"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">Protein Timing</p>
                            <p class="text-sm text-gray-600">Consuming protein within 30 min post-exercise enhances recovery</p>
                            <p class="text-xs text-gold mt-1">Source: ASMBS Guidelines</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-moon text-purple-600"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">Sleep Optimization</p>
                            <p class="text-sm text-gray-600">7-9 hours of sleep accelerates surgical recovery by up to 40%</p>
                            <p class="text-xs text-gold mt-1">Source: Sleep Medicine Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Health Analytics', 'home'))
})

// Packages Page
app.get('/packages', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">Care Packages</h1>
        <p class="text-gold">German Excellence at Unbeatable Value</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        ${CARE_PACKAGES.map(pkg => `
            <div class="card overflow-hidden ${pkg.popular ? 'ring-2 ring-gold' : ''}">
                ${pkg.popular ? '<div class="bg-gold text-navy text-center py-1 text-sm font-bold">MOST POPULAR</div>' : ''}
                <div class="p-5">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-navy text-lg">${pkg.name}</h3>
                            <p class="text-gold font-semibold">${pkg.tier} Tier</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500">From</p>
                            <p class="text-2xl font-bold text-navy">€${pkg.price_range.min.toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-600 mb-4">${pkg.description}</p>
                    
                    <div class="space-y-2 mb-4">
                        ${pkg.features.slice(0, 5).map(f => `
                            <div class="flex items-center text-sm">
                                <i class="fas fa-check text-gold mr-2"></i>
                                <span class="text-gray-700">${f}</span>
                            </div>
                        `).join('')}
                        ${pkg.features.length > 5 ? `<p class="text-sm text-gold">+${pkg.features.length - 5} more features</p>` : ''}
                    </div>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span><i class="fas fa-calendar mr-1"></i>${pkg.duration_days} days</span>
                        <span><i class="fas fa-bed mr-1"></i>${pkg.recovery_days} days recovery</span>
                    </div>
                    
                    <button class="btn-gold w-full">
                        Select Package
                    </button>
                </div>
            </div>
        `).join('')}
        
        <!-- Custom Package -->
        <div class="card p-5 border-2 border-dashed border-gold">
            <div class="text-center">
                <i class="fas fa-cogs text-gold text-3xl mb-3"></i>
                <h3 class="font-bold text-navy">Custom Package</h3>
                <p class="text-sm text-gray-600 mt-2">Need something tailored? Our team will create a personalized care plan for you.</p>
                <button class="btn-outline mt-4">Request Custom Quote</button>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Care Packages', 'home'))
})

// Wellness & Add-ons Page
app.get('/wellness', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">Wellness & Add-ons</h1>
        <p class="text-gold">Enhance your recovery experience</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Wellness Programs -->
        <div>
            <h3 class="font-bold text-navy mb-3">Wellness Programs</h3>
            <div class="space-y-3">
                ${WELLNESS_SERVICES.map(svc => `
                    <div class="card p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h4 class="font-bold text-navy">${svc.name}</h4>
                                <span class="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">${svc.category}</span>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-navy">€${svc.price.toLocaleString()}</p>
                                <p class="text-xs text-gray-500">${svc.duration}</p>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">${svc.description}</p>
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${svc.features.map(f => `<span class="text-xs bg-cream px-2 py-1 rounded">${f}</span>`).join('')}
                        </div>
                        <button class="btn-outline w-full text-sm">Add to Package</button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Accommodation Upgrades -->
        <div>
            <h3 class="font-bold text-navy mb-3">Accommodation Options</h3>
            <div class="space-y-3">
                ${ACCOMMODATIONS.map(acc => `
                    <div class="card p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h4 class="font-bold text-navy">${acc.name}</h4>
                                <div class="flex items-center mt-1">
                                    ${Array(5).fill(0).map((_, i) => `<i class="fas fa-star text-${i < Math.floor(acc.rating) ? 'gold' : 'gray-300'} text-xs"></i>`).join('')}
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-navy">€${acc.price_per_night}</p>
                                <p class="text-xs text-gray-500">per night</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${acc.features.map(f => `<span class="text-xs bg-cream px-2 py-1 rounded"><i class="fas fa-check text-gold mr-1"></i>${f}</span>`).join('')}
                        </div>
                        <button class="btn-outline w-full text-sm">Select</button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Excursions -->
        <div>
            <h3 class="font-bold text-navy mb-3">Excursions & Activities</h3>
            <div class="grid grid-cols-2 gap-3">
                ${EXCURSIONS.map(exc => `
                    <div class="card p-4">
                        <div class="w-full h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-3 flex items-center justify-center">
                            <i class="fas fa-${exc.id.includes('diving') || exc.id.includes('snorkeling') ? 'water' : exc.id.includes('desert') ? 'sun' : exc.id.includes('luxor') ? 'landmark' : exc.id.includes('yacht') ? 'ship' : 'spa'} text-white text-2xl"></i>
                        </div>
                        <h4 class="font-bold text-navy text-sm">${exc.name}</h4>
                        <p class="text-xs text-gray-500">${exc.duration}</p>
                        <div class="flex justify-between items-center mt-2">
                            <p class="font-bold text-gold">€${exc.price}</p>
                            <button class="text-xs bg-gold text-navy px-3 py-1 rounded-full">Book</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Wellness', 'home'))
})

// Doctor Dashboard Page
app.get('/doctor-dashboard', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h1 class="text-white text-xl font-bold">Doctor Dashboard</h1>
                <p class="text-gold">Dr. H. Fischer</p>
            </div>
            <div class="avatar avatar-gold">HF</div>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
            <div class="bg-white/10 rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-white">12</p>
                <p class="text-xs text-gold">Today's Patients</p>
            </div>
            <div class="bg-white/10 rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-white">3</p>
                <p class="text-xs text-gold">Surgeries</p>
            </div>
            <div class="bg-white/10 rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-white">5</p>
                <p class="text-xs text-gold">Video Calls</p>
            </div>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Today's Schedule -->
        <div>
            <h3 class="font-bold text-navy mb-3">Today's Schedule</h3>
            <div class="space-y-3">
                <div class="card p-4 border-l-4 border-red-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Surgery</span>
                            <h4 class="font-bold text-navy mt-2">Gastric Sleeve - Patient #847</h4>
                            <p class="text-sm text-gray-500">John D. • Male, 42</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-navy">9:00 AM</p>
                            <p class="text-xs text-gray-500">3 hours</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 border-l-4 border-blue-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Video Call</span>
                            <h4 class="font-bold text-navy mt-2">Follow-up - Patient #832</h4>
                            <p class="text-sm text-gray-500">Maria S. • Female, 35</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-navy">2:00 PM</p>
                            <p class="text-xs text-gray-500">30 min</p>
                            <button class="btn-gold text-xs py-1 px-3 mt-2">Join Call</button>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 border-l-4 border-green-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Consultation</span>
                            <h4 class="font-bold text-navy mt-2">Initial Consult - Patient #856</h4>
                            <p class="text-sm text-gray-500">Peter M. • Male, 48</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-navy">4:00 PM</p>
                            <p class="text-xs text-gray-500">45 min</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Patient Monitoring Alerts -->
        <div>
            <h3 class="font-bold text-navy mb-3 flex items-center">
                <i class="fas fa-bell text-gold mr-2"></i>
                Monitoring Alerts
            </h3>
            <div class="space-y-3">
                <div class="card p-4 bg-yellow-50 border-l-4 border-yellow-500">
                    <div class="flex items-start space-x-3">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                            <p class="font-semibold text-navy">Low Activity Alert</p>
                            <p class="text-sm text-gray-600">Patient #847 (John D.) - Steps below target for 2 days</p>
                            <button class="text-gold text-sm font-semibold mt-2">Send Reminder</button>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 bg-green-50 border-l-4 border-green-500">
                    <div class="flex items-start space-x-3">
                        <i class="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <p class="font-semibold text-navy">Excellent Progress</p>
                            <p class="text-sm text-gray-600">Patient #832 (Maria S.) - Recovery 15% ahead of schedule</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-2 gap-4">
            <button class="card p-4 text-center">
                <i class="fas fa-file-medical text-gold text-2xl mb-2"></i>
                <p class="font-semibold text-navy text-sm">Add Notes</p>
            </button>
            <button class="card p-4 text-center">
                <i class="fas fa-prescription text-gold text-2xl mb-2"></i>
                <p class="font-semibold text-navy text-sm">Prescribe</p>
            </button>
            <button class="card p-4 text-center">
                <i class="fas fa-chart-line text-gold text-2xl mb-2"></i>
                <p class="font-semibold text-navy text-sm">Analytics</p>
            </button>
            <button class="card p-4 text-center">
                <i class="fas fa-users text-gold text-2xl mb-2"></i>
                <p class="font-semibold text-navy text-sm">All Patients</p>
            </button>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Doctor Dashboard', 'home'))
})

// Health Devices Page
app.get('/health-devices', (c) => {
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <a href="/profile" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold">Connected Health Devices</h1>
        <p class="text-gold">Sync your wearables and medical devices</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Connection Status -->
        <div class="card p-4 bg-green-50 border-l-4 border-green-500">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check text-green-600"></i>
                </div>
                <div>
                    <p class="font-semibold text-navy">All Devices Synced</p>
                    <p class="text-sm text-gray-600">Last sync: 2 minutes ago</p>
                </div>
            </div>
        </div>
        
        <!-- Connected Devices -->
        <div>
            <h3 class="font-bold text-navy mb-3">Connected Devices</h3>
            <div class="space-y-3">
                <div class="card p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-watch text-gray-700 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Apple Watch Series 9</h4>
                                <p class="text-sm text-gray-500">Heart Rate, Steps, Sleep</p>
                                <div class="flex items-center mt-1">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span class="text-xs text-green-600">Connected</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">72</p>
                            <p class="text-xs text-gray-500">BPM</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">5,240</p>
                            <p class="text-xs text-gray-500">Steps</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">7.2h</p>
                            <p class="text-xs text-gray-500">Sleep</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-weight text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Withings Body+ Scale</h4>
                                <p class="text-sm text-gray-500">Weight, BMI, Body Fat</p>
                                <div class="flex items-center mt-1">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span class="text-xs text-green-600">Connected</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">82kg</p>
                            <p class="text-xs text-gray-500">Weight</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">26.1</p>
                            <p class="text-xs text-gray-500">BMI</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">-8kg</p>
                            <p class="text-xs text-gray-500">Progress</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-heartbeat text-red-500 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Omron Blood Pressure</h4>
                                <p class="text-sm text-gray-500">Systolic, Diastolic, Pulse</p>
                                <div class="flex items-center mt-1">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span class="text-xs text-green-600">Connected</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">120</p>
                            <p class="text-xs text-gray-500">Systolic</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">80</p>
                            <p class="text-xs text-gray-500">Diastolic</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">72</p>
                            <p class="text-xs text-gray-500">Pulse</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-tint text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">SelectTech™ Glucose Monitor</h4>
                                <p class="text-sm text-gray-500">Continuous Glucose Monitoring</p>
                                <div class="flex items-center mt-1">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span class="text-xs text-green-600">Active</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">95</p>
                            <p class="text-xs text-gray-500">mg/dL Now</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-navy">102</p>
                            <p class="text-xs text-gray-500">Avg Today</p>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-green-600">
                                <i class="fas fa-arrow-down"></i> 8%
                            </p>
                            <p class="text-xs text-gray-500">This Week</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Add New Device -->
        <div>
            <h3 class="font-bold text-navy mb-3">Add New Device</h3>
            <div class="grid grid-cols-2 gap-3">
                <button class="card p-4 text-center hover:border-gold hover:border-2">
                    <i class="fab fa-apple text-3xl text-gray-700 mb-2"></i>
                    <p class="font-semibold text-navy text-sm">Apple Health</p>
                </button>
                <button class="card p-4 text-center hover:border-gold hover:border-2">
                    <i class="fab fa-google text-3xl text-gray-700 mb-2"></i>
                    <p class="font-semibold text-navy text-sm">Google Fit</p>
                </button>
                <button class="card p-4 text-center hover:border-gold hover:border-2">
                    <i class="fas fa-mobile-alt text-3xl text-gray-700 mb-2"></i>
                    <p class="font-semibold text-navy text-sm">Fitbit</p>
                </button>
                <button class="card p-4 text-center hover:border-gold hover:border-2">
                    <i class="fas fa-plus text-3xl text-gold mb-2"></i>
                    <p class="font-semibold text-navy text-sm">Other Device</p>
                </button>
            </div>
        </div>
        
        <!-- Data Sharing -->
        <div class="card p-4">
            <h3 class="font-bold text-navy mb-3 flex items-center">
                <i class="fas fa-shield-alt text-gold mr-2"></i>
                Data Sharing Settings
            </h3>
            <div class="space-y-3">
                <div class="flex items-center justify-between py-2">
                    <div>
                        <p class="font-medium text-navy">Share with Care Team</p>
                        <p class="text-xs text-gray-500">Your doctors can view real-time data</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" checked>
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gold"></div>
                    </label>
                </div>
                <div class="flex items-center justify-between py-2">
                    <div>
                        <p class="font-medium text-navy">Emergency Alerts</p>
                        <p class="text-xs text-gray-500">Notify team of abnormal readings</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" checked>
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gold"></div>
                    </label>
                </div>
                <div class="flex items-center justify-between py-2">
                    <div>
                        <p class="font-medium text-navy">AI Analysis</p>
                        <p class="text-xs text-gray-500">Enable AI-powered health insights</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" checked>
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gold"></div>
                    </label>
                </div>
            </div>
        </div>
    </main>
  `
  
  return c.html(appShell(content, 'Health Devices', 'profile'))
})

// Emergency Contact Page
app.get('/emergency', (c) => {
  const content = `
    <header class="bg-red-600 px-5 pt-12 pb-6">
        <a href="/" class="text-white mb-4 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back</a>
        <h1 class="text-white text-xl font-bold flex items-center">
            <i class="fas fa-phone-alt mr-3 animate-pulse"></i>
            Emergency Services
        </h1>
        <p class="text-red-200">24/7 Medical Support Available</p>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Emergency Call -->
        <div class="card p-6 border-2 border-red-500 bg-red-50">
            <div class="text-center mb-4">
                <div class="w-20 h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-4">
                    <i class="fas fa-phone-alt text-white text-3xl"></i>
                </div>
                <h2 class="text-xl font-bold text-navy">Medical Emergency?</h2>
                <p class="text-gray-600 mt-2">Tap to call our 24/7 emergency hotline</p>
            </div>
            <a href="tel:+4930123456789" class="block w-full bg-red-500 text-white text-center py-4 rounded-xl font-bold text-lg">
                <i class="fas fa-phone mr-2"></i> Call +49 30 123 456 789
            </a>
        </div>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-2 gap-4">
            <button onclick="requestAmbulance()" class="card p-4 text-center">
                <div class="w-14 h-14 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <i class="fas fa-ambulance text-red-500 text-xl"></i>
                </div>
                <p class="font-semibold text-navy">Request Ambulance</p>
                <p class="text-xs text-gray-500">ETA: 5-10 mins</p>
            </button>
            <button onclick="startVideoCall()" class="card p-4 text-center">
                <div class="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <i class="fas fa-video text-blue-500 text-xl"></i>
                </div>
                <p class="font-semibold text-navy">Video Consult</p>
                <p class="text-xs text-gray-500">Doctor Available</p>
            </button>
        </div>
        
        <!-- On-Call Doctor -->
        <div class="card p-4">
            <h3 class="font-bold text-navy mb-3 flex items-center">
                <span class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                On-Call Doctor Available
            </h3>
            <div class="flex items-center space-x-4">
                <div class="avatar" style="width:56px;height:56px;font-size:18px;background:#001F3F;color:white;display:flex;align-items:center;justify-content:center;border-radius:50%;">PK</div>
                <div class="flex-1">
                    <h4 class="font-bold text-navy">Dr. P. Koch</h4>
                    <p class="text-sm text-gray-500">Anesthesia & Pain Management</p>
                    <p class="text-xs text-green-600 mt-1">
                        <i class="fas fa-circle text-xs mr-1"></i>Online - Ready to assist
                    </p>
                </div>
                <button class="btn-gold py-2 px-4 bg-gold text-navy rounded-lg font-semibold">
                    <i class="fas fa-video mr-1"></i> Call
                </button>
            </div>
        </div>
        
        <!-- Your Location -->
        <div class="card p-4">
            <h3 class="font-bold text-navy mb-3">
                <i class="fas fa-map-marker-alt text-gold mr-2"></i>
                Your Current Location
            </h3>
            <div class="bg-cream p-4 rounded-xl">
                <p class="font-medium text-navy">Red Sea Resort & Spa</p>
                <p class="text-sm text-gray-600">Room 412, Building A</p>
                <p class="text-sm text-gray-500 mt-2">Hurghada, Egypt</p>
                <p class="text-xs text-gray-400 mt-2">
                    <i class="fas fa-location-arrow mr-1"></i>
                    GPS: 27.2578° N, 33.8117° E
                </p>
            </div>
            <p class="text-xs text-gray-500 mt-3 text-center">
                <i class="fas fa-info-circle mr-1"></i>
                Location shared with emergency services when calling
            </p>
        </div>
        
        <!-- Emergency Contacts -->
        <div>
            <h3 class="font-bold text-navy mb-3">Emergency Contacts</h3>
            <div class="space-y-3">
                <div class="card p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-hospital text-red-500"></i>
                        </div>
                        <div>
                            <p class="font-medium text-navy">German Select Clinic</p>
                            <p class="text-xs text-gray-500">Primary Care Facility</p>
                        </div>
                    </div>
                    <a href="tel:+201234567890" class="text-gold">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                </div>
                
                <div class="card p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-md text-blue-500"></i>
                        </div>
                        <div>
                            <p class="font-medium text-navy">Dr. H. Fischer (Surgeon)</p>
                            <p class="text-xs text-gray-500">Your Primary Surgeon</p>
                        </div>
                    </div>
                    <a href="tel:+491234567890" class="text-gold">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                </div>
                
                <div class="card p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-concierge-bell text-gold"></i>
                        </div>
                        <div>
                            <p class="font-medium text-navy">Concierge Service</p>
                            <p class="text-xs text-gray-500">Non-medical assistance</p>
                        </div>
                    </div>
                    <a href="tel:+201234567891" class="text-gold">
                        <i class="fas fa-phone-alt"></i>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Current Vitals Warning -->
        <div class="ai-insight" style="background:linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 100%);border-left:4px solid #C9A227;border-radius:0 12px 12px 0;padding:16px;">
            <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-heart text-green-600"></i>
                </div>
                <div>
                    <h4 class="font-bold text-navy">Your Vitals are Normal</h4>
                    <p class="text-sm text-gray-600">All monitored health metrics are within safe ranges. No immediate concerns detected.</p>
                    <p class="text-xs text-gray-400 mt-2">Last checked: 5 minutes ago</p>
                </div>
            </div>
        </div>
    </main>
    
    <script>
        function requestAmbulance() {
            if(confirm('Request ambulance to your location?')) {
                alert('Ambulance dispatched! ETA: 8 minutes. Stay calm and keep your phone nearby.');
            }
        }
        function startVideoCall() {
            alert('Connecting to on-call doctor...');
        }
    </script>
  `
  
  return c.html(appShell(content, 'Emergency', 'home'))
})

// Compose Message Page
app.get('/compose', (c) => {
  const recipientId = c.req.query('to') || ''
  
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <div class="flex items-center justify-between">
            <a href="/messages" class="text-white"><i class="fas fa-times text-xl"></i></a>
            <h1 class="text-white text-lg font-bold">New Message</h1>
            <button onclick="sendMessage()" class="text-gold font-semibold">Send</button>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-4">
        <!-- Recipient Selection -->
        <div class="card p-4">
            <label class="text-sm text-gray-500 mb-2 block">To:</label>
            <select id="recipient" class="w-full p-3 border rounded-xl text-navy">
                <option value="">Select recipient...</option>
                <option value="dr-fischer" ${recipientId === 'dr-fischer' ? 'selected' : ''}>Dr. H. Fischer - Bariatric Surgery</option>
                <option value="dr-schmidt">Dr. A. Schmidt - Nutritionist</option>
                <option value="dr-weber">Dr. L. Weber - Orthopedics</option>
                <option value="dr-muller">Dr. K. Müller - Cardiology</option>
                <option value="care-coordinator">Care Coordinator</option>
                <option value="support">24/7 Support Team</option>
            </select>
        </div>
        
        <!-- Quick Topics -->
        <div>
            <p class="text-sm text-gray-500 mb-2">Quick topic:</p>
            <div class="flex flex-wrap gap-2">
                <button onclick="setTopic('medication')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-pills mr-1 text-gold"></i> Medication
                </button>
                <button onclick="setTopic('appointment')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-calendar mr-1 text-gold"></i> Appointment
                </button>
                <button onclick="setTopic('symptom')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-notes-medical mr-1 text-gold"></i> Symptoms
                </button>
                <button onclick="setTopic('diet')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-utensils mr-1 text-gold"></i> Diet Question
                </button>
                <button onclick="setTopic('exercise')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-running mr-1 text-gold"></i> Exercise
                </button>
                <button onclick="setTopic('general')" class="px-3 py-2 bg-cream rounded-full text-sm text-navy">
                    <i class="fas fa-comment mr-1 text-gold"></i> General
                </button>
            </div>
        </div>
        
        <!-- Subject -->
        <div class="card p-4">
            <label class="text-sm text-gray-500 mb-2 block">Subject:</label>
            <input type="text" id="subject" placeholder="Enter subject..." class="w-full p-3 border rounded-xl text-navy">
        </div>
        
        <!-- Message Body -->
        <div class="card p-4">
            <label class="text-sm text-gray-500 mb-2 block">Message:</label>
            <textarea id="message-body" rows="8" placeholder="Type your message here..." class="w-full p-3 border rounded-xl text-navy resize-none"></textarea>
        </div>
        
        <!-- Attachments -->
        <div class="card p-4">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-gray-500">Attachments</span>
                <button onclick="addAttachment()" class="text-gold text-sm font-semibold">
                    <i class="fas fa-plus mr-1"></i> Add
                </button>
            </div>
            <div id="attachments-list" class="space-y-2">
                <!-- Attachments will be added here -->
            </div>
            <div class="flex flex-wrap gap-2 mt-3">
                <button onclick="attachPhoto()" class="px-3 py-2 border border-dashed rounded-lg text-sm text-gray-500">
                    <i class="fas fa-camera mr-1"></i> Photo
                </button>
                <button onclick="attachFile()" class="px-3 py-2 border border-dashed rounded-lg text-sm text-gray-500">
                    <i class="fas fa-file mr-1"></i> File
                </button>
                <button onclick="attachVitals()" class="px-3 py-2 border border-dashed rounded-lg text-sm text-gray-500">
                    <i class="fas fa-heartbeat mr-1"></i> Latest Vitals
                </button>
            </div>
        </div>
        
        <!-- Priority -->
        <div class="card p-4">
            <label class="text-sm text-gray-500 mb-2 block">Priority:</label>
            <div class="flex space-x-3">
                <label class="flex-1">
                    <input type="radio" name="priority" value="normal" checked class="sr-only peer">
                    <div class="p-3 border rounded-xl text-center cursor-pointer peer-checked:border-gold peer-checked:bg-gold/10">
                        <i class="fas fa-envelope text-gray-500 peer-checked:text-gold"></i>
                        <p class="text-sm mt-1">Normal</p>
                    </div>
                </label>
                <label class="flex-1">
                    <input type="radio" name="priority" value="urgent" class="sr-only peer">
                    <div class="p-3 border rounded-xl text-center cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50">
                        <i class="fas fa-exclamation-circle text-gray-500 peer-checked:text-orange-500"></i>
                        <p class="text-sm mt-1">Urgent</p>
                    </div>
                </label>
                <label class="flex-1">
                    <input type="radio" name="priority" value="emergency" class="sr-only peer">
                    <div class="p-3 border rounded-xl text-center cursor-pointer peer-checked:border-red-500 peer-checked:bg-red-50">
                        <i class="fas fa-ambulance text-gray-500 peer-checked:text-red-500"></i>
                        <p class="text-sm mt-1">Emergency</p>
                    </div>
                </label>
            </div>
        </div>
    </main>
    
    <script>
        function setTopic(topic) {
            const topics = {
                'medication': 'Question about my medication',
                'appointment': 'Appointment request',
                'symptom': 'Symptom report',
                'diet': 'Diet and nutrition question',
                'exercise': 'Exercise and activity question',
                'general': ''
            };
            document.getElementById('subject').value = topics[topic];
        }
        
        function sendMessage() {
            const recipient = document.getElementById('recipient').value;
            const subject = document.getElementById('subject').value;
            const body = document.getElementById('message-body').value;
            
            if(!recipient) {
                alert('Please select a recipient');
                return;
            }
            if(!body.trim()) {
                alert('Please enter a message');
                return;
            }
            
            alert('Message sent successfully! You will receive a response within 24 hours.');
            window.location.href = '/messages';
        }
        
        function addAttachment() {
            alert('File picker would open here');
        }
        function attachPhoto() {
            alert('Camera would open here');
        }
        function attachFile() {
            alert('File browser would open here');
        }
        function attachVitals() {
            const list = document.getElementById('attachments-list');
            list.innerHTML += '<div class="flex items-center justify-between p-2 bg-cream rounded-lg"><span class="text-sm"><i class="fas fa-heartbeat text-gold mr-2"></i>Latest Vitals Report</span><button onclick="this.parentElement.remove()" class="text-red-500"><i class="fas fa-times"></i></button></div>';
        }
    </script>
  `
  
  return c.html(appShell(content, 'New Message', 'messages'))
})

// Patient Onboarding Page
app.get('/onboarding', (c) => {
  const step = parseInt(c.req.query('step') || '1')
  
  const steps = [
    { title: 'Welcome', icon: 'hand-sparkles' },
    { title: 'Personal Info', icon: 'user' },
    { title: 'Medical History', icon: 'file-medical' },
    { title: 'Treatment Goals', icon: 'bullseye' },
    { title: 'Connect Devices', icon: 'mobile-alt' },
    { title: 'Complete', icon: 'check-circle' }
  ]
  
  const content = `
    <header class="gradient-navy px-5 pt-12 pb-6">
        <div class="flex items-center justify-between mb-4">
            ${step > 1 ? '<a href="/onboarding?step=' + (step-1) + '" class="text-white"><i class="fas fa-arrow-left"></i></a>' : '<div></div>'}
            <span class="text-white/60 text-sm">Step ${step} of ${steps.length}</span>
            <div></div>
        </div>
        <h1 class="text-white text-xl font-bold">${steps[step-1].title}</h1>
        
        <!-- Progress Bar -->
        <div class="flex space-x-2 mt-4">
            ${steps.map((s, i) => `
                <div class="flex-1 h-1 rounded-full ${i < step ? 'bg-gold' : 'bg-white/20'}"></div>
            `).join('')}
        </div>
    </header>
    
    <main class="px-5 py-6">
        ${step === 1 ? `
            <div class="text-center py-8">
                <div class="w-24 h-24 mx-auto bg-gold rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-hand-sparkles text-navy text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-navy mb-4">Welcome to SelectCareOS™</h2>
                <p class="text-gray-600 mb-8">Your journey to better health starts here. We'll guide you through setting up your profile.</p>
                
                <div class="space-y-4 text-left mb-8">
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-shield-alt text-gold text-sm"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">GDPR Compliant</p>
                            <p class="text-sm text-gray-500">Your data is protected by German privacy standards</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-lock text-gold text-sm"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">End-to-End Encrypted</p>
                            <p class="text-sm text-gray-500">All communications are secure</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-user-md text-gold text-sm"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-navy">German Board-Certified Doctors</p>
                            <p class="text-sm text-gray-500">Access to world-class medical expertise</p>
                        </div>
                    </div>
                </div>
                
                <a href="/onboarding?step=2" class="btn-gold w-full py-4 block text-center font-semibold" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                    Get Started <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        ` : step === 2 ? `
            <form class="space-y-4">
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Full Name *</label>
                    <input type="text" placeholder="John Doe" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Email *</label>
                    <input type="email" placeholder="john@example.com" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Phone Number *</label>
                    <input type="tel" placeholder="+49 123 456 7890" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Date of Birth *</label>
                    <input type="date" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Gender</label>
                    <select class="w-full p-3 border rounded-xl">
                        <option>Select...</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                    </select>
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Country of Residence</label>
                    <select class="w-full p-3 border rounded-xl">
                        <option>Select...</option>
                        <option>Germany</option>
                        <option>United Kingdom</option>
                        <option>Austria</option>
                        <option>Switzerland</option>
                        <option>Netherlands</option>
                        <option>Other EU Country</option>
                        <option>GCC Country</option>
                        <option>Other</option>
                    </select>
                </div>
                
                <a href="/onboarding?step=3" class="btn-gold w-full py-4 block text-center font-semibold mt-6" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                    Continue <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </form>
        ` : step === 3 ? `
            <form class="space-y-4">
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Current Height (cm)</label>
                    <input type="number" placeholder="175" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Current Weight (kg)</label>
                    <input type="number" placeholder="90" class="w-full p-3 border rounded-xl">
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-3">Existing Conditions</label>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Diabetes</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Hypertension</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Heart Disease</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Sleep Apnea</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Joint Problems</span>
                        </label>
                    </div>
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Current Medications</label>
                    <textarea placeholder="List any medications you are currently taking..." rows="3" class="w-full p-3 border rounded-xl"></textarea>
                </div>
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Allergies</label>
                    <textarea placeholder="List any known allergies..." rows="2" class="w-full p-3 border rounded-xl"></textarea>
                </div>
                
                <a href="/onboarding?step=4" class="btn-gold w-full py-4 block text-center font-semibold mt-6" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                    Continue <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </form>
        ` : step === 4 ? `
            <form class="space-y-4">
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-3">Interested Treatments</label>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Bariatric Surgery (Weight Loss)</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Orthopedic Surgery</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Aesthetic Surgery</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Anti-Aging & Longevity</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Cardiology</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-gold">
                            <span>Wellness & Recovery Programs</span>
                        </label>
                    </div>
                </div>
                
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-3">Preferred Care Package</label>
                    <div class="space-y-3">
                        <label class="block p-4 border rounded-xl cursor-pointer hover:border-gold">
                            <input type="radio" name="package" value="essential" class="sr-only peer">
                            <div class="peer-checked:text-gold">
                                <p class="font-bold">SELECTCARE™ Essential</p>
                                <p class="text-sm text-gray-500">€6,500 - €12,000</p>
                            </div>
                        </label>
                        <label class="block p-4 border rounded-xl cursor-pointer hover:border-gold border-gold bg-gold/5">
                            <input type="radio" name="package" value="plus" class="sr-only peer" checked>
                            <div class="peer-checked:text-gold">
                                <p class="font-bold">SELECTCARE+™ Plus <span class="text-xs bg-gold text-navy px-2 py-0.5 rounded-full ml-2">Popular</span></p>
                                <p class="text-sm text-gray-500">€12,000 - €22,000</p>
                            </div>
                        </label>
                        <label class="block p-4 border rounded-xl cursor-pointer hover:border-gold">
                            <input type="radio" name="package" value="crown" class="sr-only peer">
                            <div class="peer-checked:text-gold">
                                <p class="font-bold">SELECTCROWN™ Luxury</p>
                                <p class="text-sm text-gray-500">€22,000 - €35,000</p>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div class="card p-4">
                    <label class="block text-sm text-gray-500 mb-2">Target Treatment Date</label>
                    <select class="w-full p-3 border rounded-xl">
                        <option>As soon as possible</option>
                        <option>Within 1 month</option>
                        <option>Within 3 months</option>
                        <option>Within 6 months</option>
                        <option>Just exploring options</option>
                    </select>
                </div>
                
                <a href="/onboarding?step=5" class="btn-gold w-full py-4 block text-center font-semibold mt-6" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                    Continue <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </form>
        ` : step === 5 ? `
            <div class="space-y-6">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-mobile-alt text-gold text-2xl"></i>
                    </div>
                    <h2 class="text-lg font-bold text-navy">Connect Your Health Devices</h2>
                    <p class="text-sm text-gray-500 mt-2">Sync your wearables for better monitoring</p>
                </div>
                
                <div class="space-y-3">
                    <button onclick="connectDevice('apple')" class="card p-4 w-full flex items-center justify-between hover:border-gold">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <i class="fab fa-apple text-2xl"></i>
                            </div>
                            <div class="text-left">
                                <p class="font-semibold text-navy">Apple Health</p>
                                <p class="text-xs text-gray-500">Heart rate, steps, sleep</p>
                            </div>
                        </div>
                        <i class="fas fa-plus-circle text-gold text-xl"></i>
                    </button>
                    
                    <button onclick="connectDevice('google')" class="card p-4 w-full flex items-center justify-between hover:border-gold">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <i class="fab fa-google text-2xl"></i>
                            </div>
                            <div class="text-left">
                                <p class="font-semibold text-navy">Google Fit</p>
                                <p class="text-xs text-gray-500">Activity, heart rate</p>
                            </div>
                        </div>
                        <i class="fas fa-plus-circle text-gold text-xl"></i>
                    </button>
                    
                    <button onclick="connectDevice('fitbit')" class="card p-4 w-full flex items-center justify-between hover:border-gold">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-heartbeat text-2xl text-pink-500"></i>
                            </div>
                            <div class="text-left">
                                <p class="font-semibold text-navy">Fitbit</p>
                                <p class="text-xs text-gray-500">All health metrics</p>
                            </div>
                        </div>
                        <i class="fas fa-plus-circle text-gold text-xl"></i>
                    </button>
                </div>
                
                <div class="text-center mt-8">
                    <a href="/onboarding?step=6" class="btn-gold w-full py-4 block text-center font-semibold" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                        Continue <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    <a href="/onboarding?step=6" class="text-gray-500 text-sm mt-4 block">Skip for now</a>
                </div>
            </div>
            
            <script>
                function connectDevice(type) {
                    alert('Connecting to ' + type + '...');
                }
            </script>
        ` : `
            <div class="text-center py-8">
                <div class="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-check text-green-600 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-navy mb-4">You're All Set!</h2>
                <p class="text-gray-600 mb-8">Your profile is complete. You're ready to start your journey with SelectCareOS™.</p>
                
                <div class="card p-4 mb-6 text-left">
                    <h4 class="font-bold text-navy mb-3">What's Next?</h4>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                                <span class="text-gold font-bold text-sm">1</span>
                            </div>
                            <p class="text-sm text-gray-600">Book a free consultation with our specialists</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                                <span class="text-gold font-bold text-sm">2</span>
                            </div>
                            <p class="text-sm text-gray-600">Get a personalized treatment plan</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                                <span class="text-gold font-bold text-sm">3</span>
                            </div>
                            <p class="text-sm text-gray-600">Begin your transformation journey</p>
                        </div>
                    </div>
                </div>
                
                <a href="/" class="btn-gold w-full py-4 block text-center font-semibold" style="background:#C9A227;color:#001F3F;border-radius:12px;">
                    Go to Dashboard <i class="fas fa-arrow-right ml-2"></i>
                </a>
                
                <a href="/booking" class="btn-outline w-full py-4 block text-center font-semibold mt-3" style="border:2px solid #C9A227;color:#C9A227;border-radius:12px;">
                    Book Consultation
                </a>
            </div>
        `}
    </main>
  `
  
  return c.html(appShell(content, 'Welcome', 'home'))
})

// Admin Dashboard
app.get('/admin', (c) => {
  return c.redirect('/admin/dashboard')
})

app.get('/admin/dashboard', async (c) => {
  const { adminPage } = await import('./pages/admin')
  return c.html(adminPage(c))
})

app.get('/analytics', async (c) => {
  const { analyticsPage } = await import('./pages/analytics')
  return c.html(analyticsPage(c))
})

app.get('/affiliate', async (c) => {
  const { affiliatePage } = await import('./pages/affiliate')
  return c.html(affiliatePage(c))
})

// ============================================================================
// MONETIZATION & ENGAGEMENT PAGES
// ============================================================================

// Premium Subscription Plans
app.get('/subscription', async (c) => {
  const { subscriptionPage } = await import('./pages/subscription')
  return c.html(subscriptionPage())
})

app.get('/pricing', async (c) => {
  const { subscriptionPage } = await import('./pages/subscription')
  return c.html(subscriptionPage())
})

// SelectPoints Rewards & Gamification
app.get('/rewards', async (c) => {
  const { rewardsPage } = await import('./pages/rewards')
  return c.html(rewardsPage())
})

app.get('/points', async (c) => {
  const { rewardsPage } = await import('./pages/rewards')
  return c.html(rewardsPage())
})

// Health Marketplace
app.get('/marketplace', async (c) => {
  const { marketplacePage } = await import('./pages/marketplace')
  return c.html(marketplacePage())
})

app.get('/shop', async (c) => {
  const { marketplacePage } = await import('./pages/marketplace')
  return c.html(marketplacePage())
})

// AI Health Concierge
app.get('/ai-concierge', async (c) => {
  const { aiConciergePage } = await import('./pages/ai-concierge')
  return c.html(aiConciergePage())
})

app.get('/ai', async (c) => {
  const { aiConciergePage } = await import('./pages/ai-concierge')
  return c.html(aiConciergePage())
})

// Daily Wellness Hub
app.get('/daily-wellness', async (c) => {
  const { dailyWellnessPage } = await import('./pages/daily-wellness')
  return c.html(dailyWellnessPage())
})

app.get('/wellness-hub', async (c) => {
  const { dailyWellnessPage } = await import('./pages/daily-wellness')
  return c.html(dailyWellnessPage())
})

// Premium Home Dashboard
app.get('/premium', async (c) => {
  const { premiumHomePage } = await import('./pages/premium-home')
  return c.html(premiumHomePage('plus'))
})

app.get('/dashboard-v2', async (c) => {
  const { premiumHomePage } = await import('./pages/premium-home')
  return c.html(premiumHomePage('plus'))
})

// Family Health Hub
app.get('/family', async (c) => {
  const { familyHubPage } = await import('./pages/family-hub')
  return c.html(familyHubPage())
})

app.get('/family-hub', async (c) => {
  const { familyHubPage } = await import('./pages/family-hub')
  return c.html(familyHubPage())
})

// Services Page (comprehensive journey & packages overview)
app.get('/services', async (c) => {
  const { servicesPage } = await import('./pages/services')
  return c.html(servicesPage())
})

// Services API endpoints
app.get('/api/services/journey', async (c) => {
  const { JOURNEY_STEPS } = await import('./pages/services')
  return c.json({ success: true, data: JOURNEY_STEPS })
})

app.get('/api/services/benefits', async (c) => {
  const { RED_SEA_BENEFITS } = await import('./pages/services')
  return c.json({ success: true, data: RED_SEA_BENEFITS })
})

app.get('/api/services/activities', async (c) => {
  const { RECOVERY_ACTIVITIES } = await import('./pages/services')
  return c.json({ success: true, data: RECOVERY_ACTIVITIES })
})

app.get('/api/services/packages', async (c) => {
  const { CARE_PACKAGES_DETAILED } = await import('./pages/services')
  return c.json({ success: true, data: CARE_PACKAGES_DETAILED })
})

app.get('/api/services/testimonials', async (c) => {
  const { TESTIMONIALS } = await import('./pages/services')
  return c.json({ success: true, data: TESTIMONIALS })
})

app.get('/api/services/procedures', async (c) => {
  const { TREATMENT_PROCEDURES } = await import('./pages/services')
  return c.json({ success: true, data: TREATMENT_PROCEDURES })
})

// ============================================================================
// MONETIZATION API ENDPOINTS
// ============================================================================

// Subscription API
app.get('/api/subscriptions/tiers', async (c) => {
  const { SUBSCRIPTION_TIERS } = await import('./pages/subscription')
  return c.json({ success: true, data: SUBSCRIPTION_TIERS })
})

// Rewards API
app.get('/api/rewards/config', async (c) => {
  const { REWARDS_CONFIG } = await import('./pages/rewards')
  return c.json({ success: true, data: REWARDS_CONFIG })
})

app.get('/api/rewards/user', (c) => {
  // Demo user rewards data
  return c.json({
    success: true,
    data: {
      userId: 'user-123',
      points: 8450,
      tier: 'gold',
      multiplier: 1.5,
      streak: 14,
      totalEarned: 15600,
      totalRedeemed: 7150,
      badges: ['first-steps', 'health-hero', 'week-warrior'],
      referralCode: 'JOHN2024',
      referrals: 3
    }
  })
})

app.post('/api/rewards/earn', async (c) => {
  const body = await c.req.json()
  const { action, amount } = body
  // In production, this would update the database
  return c.json({
    success: true,
    data: {
      action,
      pointsEarned: amount || 10,
      newBalance: 8460,
      message: `Earned ${amount || 10} SelectPoints for ${action}`
    }
  })
})

// Marketplace API
app.get('/api/marketplace/products', async (c) => {
  const { MARKETPLACE_PRODUCTS } = await import('./pages/marketplace')
  return c.json({ success: true, data: MARKETPLACE_PRODUCTS })
})

app.get('/api/marketplace/cart', (c) => {
  return c.json({
    success: true,
    data: {
      items: [
        { id: 'vitamin-d', name: 'Vitamin D3+K2', price: 29, quantity: 1 },
        { id: 'omega3', name: 'Omega-3 Fish Oil', price: 34, quantity: 2 },
      ],
      subtotal: 97,
      pointsEarning: 485,
      discount: 0,
      total: 97
    }
  })
})

// Family Hub API
app.get('/api/family', async (c) => {
  const { FAMILY_MEMBERS } = await import('./pages/family-hub')
  return c.json({
    success: true,
    data: {
      members: FAMILY_MEMBERS,
      totalPoints: FAMILY_MEMBERS.reduce((sum, m) => sum + m.points, 0),
      totalMembers: FAMILY_MEMBERS.length,
      maxMembers: 4,
      planType: 'plus'
    }
  })
})

// User Stats API (for premium dashboard)
app.get('/api/user/stats', (c) => {
  return c.json({
    success: true,
    data: {
      user: {
        id: 'user-123',
        name: 'John Doe',
        tier: 'plus',
        avatar: 'JD'
      },
      health: {
        score: 85,
        recoveryProgress: 75,
        weightLoss: 8,
        streak: 14
      },
      points: {
        balance: 8450,
        earned: 15600,
        redeemed: 7150,
        multiplier: 2
      },
      tasks: {
        completed: 4,
        total: 7,
        potentialPoints: 155
      },
      appointments: {
        upcoming: 2,
        nextDate: '2024-10-22T10:00:00Z',
        nextDoctor: 'Dr. K. Müller'
      }
    }
  })
})

// Daily Tasks API
app.get('/api/tasks/daily', (c) => {
  return c.json({
    success: true,
    data: [
      { id: 't1', name: 'Morning medications', points: 30, completed: true },
      { id: 't2', name: 'Log breakfast', points: 15, completed: true },
      { id: 't3', name: 'Drink 8 glasses water', points: 10, completed: false },
      { id: 't4', name: 'Log blood pressure', points: 20, completed: false },
      { id: 't5', name: '15-minute walk', points: 25, completed: true },
      { id: 't6', name: 'Evening stretching', points: 20, completed: false },
      { id: 't7', name: 'Log sleep time', points: 15, completed: true }
    ]
  })
})

app.post('/api/tasks/complete', async (c) => {
  const body = await c.req.json()
  const { taskId } = body
  return c.json({
    success: true,
    data: {
      taskId,
      completed: true,
      pointsEarned: 20,
      newBalance: 8470,
      message: 'Task completed! +20 SelectPoints'
    }
  })
})

// ============================================================================
// MONETIZATION & ENGAGEMENT API ROUTES
// ============================================================================

// Import route handlers
import { payments } from './routes/payments'
import { engagement } from './routes/engagement'
import { wellness } from './routes/wellness'

// Mount route handlers
app.route('/api/payments', payments)
app.route('/api/engagement', engagement)
app.route('/api/wellness', wellness)

// ============================================================================
// CONVERSION OPTIMIZATION ENDPOINTS
// ============================================================================

// Get urgency/scarcity data for subscription page
app.get('/api/subscription/urgency', (c) => {
  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  const hoursLeft = Math.floor((endOfMonth.getTime() - now.getTime()) / (1000 * 60 * 60))
  
  return c.json({
    success: true,
    urgency: {
      eliteSpotsLeft: Math.floor(Math.random() * 8) + 3,
      totalEliteSpots: 50,
      currentViewers: Math.floor(Math.random() * 20) + 15,
      hoursUntilPriceIncrease: hoursLeft,
      promotion: {
        code: 'NEWYEAR2026',
        discount: 40,
        expiresAt: endOfMonth.toISOString(),
        message: 'New Year Special: 40% off Elite membership!'
      },
      socialProof: {
        signupsToday: Math.floor(Math.random() * 15) + 20,
        recentUpgrade: 'Anna from Munich upgraded to Elite 5 minutes ago'
      }
    }
  })
})

// Get personalized recommendations
app.get('/api/recommendations/:userId', (c) => {
  const userId = c.req.param('userId')
  
  return c.json({
    success: true,
    recommendations: {
      products: [
        {
          id: 'vitamin-d',
          name: 'Vitamin D3+K2',
          reason: 'Essential for post-bariatric recovery',
          discount: 15,
          pointsBonus: 50
        },
        {
          id: 'omega-3',
          name: 'Omega-3 Fish Oil',
          reason: 'Recommended by Dr. Schmidt for your nutrition plan',
          discount: 10,
          pointsBonus: 35
        }
      ],
      services: [
        {
          id: 'consultation-package',
          name: '3-Consultation Package',
          originalPrice: 450,
          discountedPrice: 337,
          savings: 113,
          reason: 'Based on your recovery timeline'
        }
      ],
      upgrade: {
        currentTier: 'plus',
        suggestedTier: 'elite',
        benefits: ['Unlimited consultations', 'Dedicated care manager', '5x SelectPoints'],
        specialOffer: {
          discount: 30,
          code: 'POWERUSER30',
          expiresIn: 48
        }
      }
    }
  })
})

// Track conversion events
app.post('/api/analytics/conversion-event', async (c) => {
  try {
    const { userId, eventType, eventData, sessionId, pageUrl } = await c.req.json()
    
    // Log conversion event (in production, store in analytics DB)
    console.log('Conversion event:', {
      userId,
      eventType,
      eventData,
      sessionId,
      pageUrl,
      timestamp: new Date().toISOString()
    })
    
    return c.json({
      success: true,
      tracked: true,
      eventId: `evt_${Date.now()}`
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to track event' }, 500)
  }
})

// Get streak and points status
app.get('/api/user/streak/:userId', (c) => {
  const userId = c.req.param('userId')
  
  return c.json({
    success: true,
    streak: {
      current: 14,
      longest: 21,
      lastActivityDate: new Date().toISOString().split('T')[0],
      nextMilestone: 21,
      milestoneReward: 500,
      daysUntilMilestone: 7,
      atRisk: false,
      message: '🔥 14-day streak! 7 more days to unlock 500 bonus points!'
    }
  })
})

// Check achievement progress
app.get('/api/achievements/:userId', (c) => {
  const userId = c.req.param('userId')
  
  return c.json({
    success: true,
    achievements: {
      earned: [
        { id: 'first-steps', name: 'First Steps', earnedAt: '2024-10-01', icon: 'star', points: 50 },
        { id: 'health-hero', name: 'Health Hero', earnedAt: '2024-10-10', icon: 'heartbeat', points: 100 },
        { id: 'week-warrior', name: 'Week Warrior', earnedAt: '2024-10-15', icon: 'calendar-check', points: 200 }
      ],
      inProgress: [
        { id: 'consistency-king', name: 'Consistency King', progress: 14, target: 30, icon: 'crown', reward: 1000 },
        { id: 'gold-member', name: 'Gold Member', progress: 8450, target: 15000, icon: 'medal', reward: 500 }
      ],
      locked: [
        { id: 'diamond-status', name: 'Diamond Status', icon: 'gem', reward: 2000, requirement: 'Reach 50,000 points' },
        { id: 'referral-master', name: 'Referral Master', icon: 'users', reward: 1500, requirement: 'Refer 10 friends' }
      ],
      totalPoints: 350,
      nextUnlock: {
        id: 'consistency-king',
        daysRemaining: 16,
        reward: 1000
      }
    }
  })
})

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Not Found',
    message: `Route ${c.req.path} not found`,
    requestId: c.get('requestId'),
  }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`, err.stack)
  return c.json({
    success: false,
    error: 'Internal Server Error',
    message: c.env.ENVIRONMENT === 'development' ? err.message : 'Something went wrong',
    requestId: c.get('requestId'),
  }, 500)
})

export default app
