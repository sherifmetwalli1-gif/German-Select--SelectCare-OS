/**
 * SelectCareOS™ Services Page
 * Comprehensive services overview inspired by SurgeryBridge journey design
 * 
 * Features:
 * - Hero section with value propositions
 * - Why Red Sea Recovery section
 * - The SelectCare Journey (3-step process)
 * - Recovery Experience showcase
 * - Care Packages with detailed pricing
 * - Patient success stories
 * - Trust badges and certifications
 * - Call-to-action sections
 * 
 * Updated: Unified branding with UNIFIED_CSS from brand.ts
 */

import { UNIFIED_CSS, BRAND_HEAD, getUnifiedBottomNav } from '../styles/brand'

// Static data for services page - Market-researched pricing (2025)
export const JOURNEY_STEPS = [
  {
    step: 1,
    title: 'Virtual Preparation',
    duration: '4-12 Weeks',
    location: 'Online/Remote',
    description: 'Comprehensive pre-operative preparation from the comfort of your home',
    features: [
      'German surgeon video consultation',
      'Complete health optimization program',
      'IoT device monitoring (smart scale, BP, glucose)',
      'Travel booking & visa assistance',
      'Nutritional counseling & meal plans',
      'Psychological preparation support'
    ],
    price: 990,
    icon: 'laptop-medical',
    color: 'blue'
  },
  {
    step: 2,
    title: 'Red Sea Surgery & Recovery',
    duration: '1-4 Weeks',
    location: 'Hurghada, Egypt',
    description: 'World-class surgery with luxury Red Sea recovery experience',
    features: [
      'VIP airport transfer (2 min from airport!)',
      'German MD surgery at JCI hospital',
      '5-star Red Sea resort (beach view)',
      'Dedicated care coordinator 24/7',
      'Daily wellness activities',
      'Physiotherapy & rehabilitation'
    ],
    priceRange: { min: 4900, max: 14500 },
    icon: 'procedures',
    color: 'gold'
  },
  {
    step: 3,
    title: 'Lifetime Digital Follow-Up',
    duration: '12+ Months',
    location: 'Online/Remote',
    description: 'Continuous support for lasting health transformation',
    features: [
      'Monthly telemedicine check-ins',
      'IoT health monitoring (continuous)',
      'AI nutrition & exercise plans',
      'German team 24/7 support',
      'SelectCareOS™ premium access',
      'Unlimited AI health concierge'
    ],
    priceMonthly: 49,
    icon: 'infinity',
    color: 'green'
  }
];

export const RED_SEA_BENEFITS = [
  {
    title: 'Perfect Healing Climate',
    icon: 'sun',
    description: 'Year-round sunshine (300+ days), 24-28°C ideal healing temperature, low humidity perfect for recovery',
    stat: '300+',
    statLabel: 'Sunny Days/Year'
  },
  {
    title: 'Therapeutic Waters',
    icon: 'water',
    description: 'Red Sea salt water (35% salinity) accelerates wound healing, reduces inflammation, natural minerals boost recovery',
    stat: '35%',
    statLabel: 'Salinity Level'
  },
  {
    title: 'Stress-Free Environment',
    icon: 'spa',
    description: 'Proven: reduced cortisol levels in beach environments enhance surgical recovery by up to 40%',
    stat: '40%',
    statLabel: 'Faster Recovery'
  },
  {
    title: 'German Medical Excellence',
    icon: 'user-md',
    description: 'All surgeons are German board-certified (Facharzt) with 15-25+ years of experience',
    stat: '100%',
    statLabel: 'German Certified'
  }
];

export const RECOVERY_ACTIVITIES = [
  {
    name: 'Snorkeling & Diving',
    description: "World's best coral reefs (1,200+ species). Post-recovery activity available from Week 3+",
    icon: 'water',
    timing: 'Week 3+'
  },
  {
    name: 'Luxury Spa Treatments',
    description: 'Hot stone massage, aromatherapy, Red Sea salt scrubs. Daily sessions during recovery',
    icon: 'spa',
    timing: 'Daily'
  },
  {
    name: 'Healthy Gourmet Dining',
    description: 'Mediterranean diet, fresh seafood, German nutritionist-approved menus tailored to your recovery',
    icon: 'utensils',
    timing: 'All Meals'
  },
  {
    name: 'Private Beach Access',
    description: 'Exclusive beach loungers, cabanas, gentle walks to boost circulation and mood',
    icon: 'umbrella-beach',
    timing: 'Unlimited'
  },
  {
    name: 'Physiotherapy Sessions',
    description: 'German-trained physiotherapists for mobility training, pool therapy, and rehabilitation',
    icon: 'dumbbell',
    timing: '2x Daily'
  },
  {
    name: 'Mindfulness & Meditation',
    description: 'Guided meditation, yoga sessions, and breathing exercises for mental wellness',
    icon: 'om',
    timing: 'Morning/Evening'
  }
];

// Market-researched care package pricing (2025) - competitive medical tourism rates
export const CARE_PACKAGES_DETAILED = [
  {
    id: 'selectcare-essential',
    name: 'SELECTCARE™',
    tier: 'Essential',
    tagline: 'German Excellence, Affordable Care',
    price: 4900,
    priceRange: { min: 3500, max: 6500 },
    savingsVsGermany: 17100,
    turkeyComparison: 3800,
    popular: false,
    features: [
      { text: 'German Board-Certified Surgeon', included: true },
      { text: 'JCI-Accredited Hospital (3-night stay)', included: true },
      { text: '4-Star Beach Resort (7 nights)', included: true },
      { text: 'Airport Transfers (shared shuttle)', included: true },
      { text: '1-Year Digital Follow-up', included: true },
      { text: 'SelectCareOS™ Basic Access', included: true },
      { text: '24/7 Support Line', included: true },
      { text: 'VIP Private Transfers', included: false },
      { text: 'Dedicated Case Manager', included: false },
      { text: 'Daily Spa Treatments', included: false },
      { text: 'Family Accommodation', included: false }
    ],
    duration: 14,
    recovery: 7,
    accommodation: '4-Star Beach Resort'
  },
  {
    id: 'selectcare-plus',
    name: 'SELECTCARE+™',
    tier: 'Premium',
    tagline: 'Luxury Recovery with Family Options',
    price: 7900,
    priceRange: { min: 6200, max: 11500 },
    savingsVsGermany: 24100,
    turkeyComparison: 5800,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      { text: 'German Board-Certified Surgeon', included: true },
      { text: 'JCI-Accredited Hospital (5-night stay)', included: true },
      { text: '5-Star Red Sea Resort (14 nights)', included: true },
      { text: 'VIP Private Transfers (luxury sedan)', included: true },
      { text: '2-Year Digital Follow-up', included: true },
      { text: 'SelectCareOS™ Plus Access', included: true },
      { text: 'Dedicated Case Manager 24/7', included: true },
      { text: 'Daily Spa Treatments', included: true },
      { text: 'Family Room (spouse + 2 kids free)', included: true },
      { text: 'Red Sea Excursions (snorkeling, safari)', included: true },
      { text: 'Physiotherapy Sessions', included: true }
    ],
    duration: 21,
    recovery: 14,
    accommodation: '5-Star Red Sea Resort'
  },
  {
    id: 'selectcrown',
    name: 'SELECTCROWN™',
    tier: 'Crown',
    tagline: 'Ultimate Luxury & Privacy',
    price: 14500,
    priceRange: { min: 11500, max: 19500 },
    savingsVsGermany: 40500,
    turkeyComparison: 'No equivalent',
    popular: false,
    badge: 'ULTIMATE',
    features: [
      { text: 'German Board-Certified Surgeon', included: true },
      { text: 'JCI-Accredited Hospital (7-night VIP suite)', included: true },
      { text: 'Private Beachfront Villa (21 nights)', included: true },
      { text: 'Helicopter Transfer Option', included: true },
      { text: 'Lifetime Digital Follow-up', included: true },
      { text: 'SelectCareOS™ Elite Access', included: true },
      { text: 'Personal Care Manager 24/7', included: true },
      { text: 'Unlimited Spa & Wellness', included: true },
      { text: 'Family Suite (up to 4 guests)', included: true },
      { text: 'Private Chef (German cuisine available)', included: true },
      { text: 'Private Nurse (12 hours/day)', included: true },
      { text: 'Luxury Yacht Excursion (full day)', included: true },
      { text: 'VIP Concierge Service', included: true }
    ],
    duration: 28,
    recovery: 21,
    accommodation: 'Private Beachfront Villa'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Munich, Germany',
    procedure: 'Gastric Sleeve',
    quote: 'The Red Sea recovery was magical. Swimming with dolphins just 3 weeks post-op was surreal. German quality + Egyptian hospitality = perfection!',
    rating: 5,
    weightLoss: 45,
    avatar: 'SM',
    verified: true
  },
  {
    name: 'Thomas K.',
    location: 'London, UK',
    procedure: 'Gastric Bypass',
    quote: "Saved €15,000 vs London prices. The resort was incredible - my wife called it our 'second honeymoon'. Prof. Metwalli is world-class.",
    rating: 5,
    weightLoss: 52,
    avatar: 'TK',
    verified: true
  },
  {
    name: 'Anna B.',
    location: 'Vienna, Austria',
    procedure: 'Body Contouring',
    quote: 'Best decision ever. The IoT monitoring kept my German doctor connected throughout. Red Sea therapeutic waters really do speed healing!',
    rating: 5,
    avatar: 'AB',
    verified: true
  },
  {
    name: 'Michael H.',
    location: 'Zurich, Switzerland',
    procedure: 'Knee Replacement',
    quote: 'After my knee replacement, I was walking on the beach within 2 weeks. The physiotherapy team was exceptional. Zero complications!',
    rating: 5,
    avatar: 'MH',
    verified: true
  }
];

// Service types: 'surgery' = Major Surgery, 'treatment' = Onsite Treatment, 'checkup' = Diagnostic/Checkup
// Market-researched pricing (2025) - competitive with Egypt/Turkey medical tourism rates
// German MD premium justifies ~15-25% above pure Egypt rates while undercutting Western prices by 70-80%
export const TREATMENT_PROCEDURES = [
  {
    category: 'Bariatric & Weight Loss',
    icon: 'weight',
    description: 'German-certified metabolic surgery with 5-star Red Sea recovery',
    specialist: 'Prof. Dr. Med. Bariatric Surgeon',
    procedures: [
      { name: 'Gastric Sleeve', price: 4900, germanyPrice: 22000, turkeyPrice: 3800, savings: 17100, type: 'surgery', duration: '1 hour', recovery: '2 weeks', turkeyComparison: '+German MD' },
      { name: 'Gastric Bypass (Roux-en-Y)', price: 6500, germanyPrice: 28000, turkeyPrice: 5200, savings: 21500, type: 'surgery', duration: '2 hours', recovery: '3 weeks', turkeyComparison: '+German MD' },
      { name: 'Gastric Balloon (Non-Surgical)', price: 2200, germanyPrice: 8000, turkeyPrice: 1800, savings: 5800, type: 'treatment', duration: '30 min', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Revision Surgery', price: 7900, germanyPrice: 35000, turkeyPrice: 6200, savings: 27100, type: 'surgery', duration: '2-3 hours', recovery: '3 weeks', turkeyComparison: '+German MD' },
      { name: 'Mini Gastric Bypass', price: 5900, germanyPrice: 25000, turkeyPrice: 4500, savings: 19100, type: 'surgery', duration: '1.5 hours', recovery: '2 weeks', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Orthopedic Surgery',
    icon: 'bone',
    description: 'Arthroscopy, joint replacement & sports injuries by German orthopedic specialists',
    specialist: 'Dr. Med. Senior Orthopedic Surgeon',
    procedures: [
      { name: 'Knee Replacement (Total)', price: 8500, germanyPrice: 40000, turkeyPrice: 7200, savings: 31500, type: 'surgery', duration: '2 hours', recovery: '6-8 weeks', turkeyComparison: '+German MD' },
      { name: 'Hip Replacement', price: 9500, germanyPrice: 45000, turkeyPrice: 8000, savings: 35500, type: 'surgery', duration: '2.5 hours', recovery: '6-8 weeks', turkeyComparison: '+German MD' },
      { name: 'Arthroscopic Knee Surgery', price: 3500, germanyPrice: 15000, turkeyPrice: 2800, savings: 11500, type: 'surgery', duration: '45 min', recovery: '2-4 weeks', turkeyComparison: '+German MD' },
      { name: 'Spine Surgery (Disc)', price: 12500, germanyPrice: 55000, turkeyPrice: 9500, savings: 42500, type: 'surgery', duration: '3 hours', recovery: '8-12 weeks', turkeyComparison: '+German MD' },
      { name: 'ACL Reconstruction', price: 4900, germanyPrice: 20000, turkeyPrice: 3800, savings: 15100, type: 'surgery', duration: '1.5 hours', recovery: '6-9 months', turkeyComparison: '+German MD' },
      { name: 'Shoulder Arthroscopy', price: 4200, germanyPrice: 18000, turkeyPrice: 3200, savings: 13800, type: 'surgery', duration: '1 hour', recovery: '3-4 weeks', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Plastic & Reconstructive',
    icon: 'sparkles',
    description: 'Post-bariatric body contouring & cosmetic procedures',
    specialist: 'Prof. Dr. Med. Plastic & Reconstructive Surgeon',
    procedures: [
      { name: 'Body Contouring (Full)', price: 6900, germanyPrice: 30000, turkeyPrice: 5200, savings: 23100, type: 'surgery', duration: '4-6 hours', recovery: '4-6 weeks', turkeyComparison: '+German MD' },
      { name: 'Abdominoplasty (Tummy Tuck)', price: 4200, germanyPrice: 18000, turkeyPrice: 3200, savings: 13800, type: 'surgery', duration: '2-3 hours', recovery: '3-4 weeks', turkeyComparison: '+German MD' },
      { name: 'Arm Lift (Brachioplasty)', price: 2900, germanyPrice: 12000, turkeyPrice: 2200, savings: 9100, type: 'surgery', duration: '2 hours', recovery: '2-3 weeks', turkeyComparison: '+German MD' },
      { name: 'Thigh Lift', price: 3500, germanyPrice: 15000, turkeyPrice: 2800, savings: 11500, type: 'surgery', duration: '2-3 hours', recovery: '3-4 weeks', turkeyComparison: '+German MD' },
      { name: 'Facelift', price: 5500, germanyPrice: 25000, turkeyPrice: 4200, savings: 19500, type: 'surgery', duration: '3-4 hours', recovery: '2-3 weeks', turkeyComparison: '+German MD' },
      { name: 'Rhinoplasty', price: 3900, germanyPrice: 18000, turkeyPrice: 2800, savings: 14100, type: 'surgery', duration: '1.5-2 hours', recovery: '2 weeks', turkeyComparison: '+German MD' },
      { name: 'Liposuction', price: 2600, germanyPrice: 10000, turkeyPrice: 1900, savings: 7400, type: 'surgery', duration: '1-2 hours', recovery: '1-2 weeks', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Cardiology',
    icon: 'heartbeat',
    description: 'Comprehensive cardiac care by German-trained cardiologists',
    specialist: 'Ass. Prof. Dr. Med. Cardiology',
    procedures: [
      { name: 'Complete Cardiac Checkup', price: 750, germanyPrice: 3500, turkeyPrice: 550, savings: 2750, type: 'checkup', duration: '3-4 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Echocardiogram (Advanced)', price: 280, germanyPrice: 1200, turkeyPrice: 200, savings: 920, type: 'checkup', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Cardiac Stress Test', price: 220, germanyPrice: 900, turkeyPrice: 160, savings: 680, type: 'checkup', duration: '1.5 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Coronary CT Angiography', price: 520, germanyPrice: 2200, turkeyPrice: 380, savings: 1680, type: 'checkup', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Cardiac Catheterization', price: 2200, germanyPrice: 10000, turkeyPrice: 1700, savings: 7800, type: 'treatment', duration: '2-3 hours', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Pacemaker Implantation', price: 5500, germanyPrice: 25000, turkeyPrice: 4200, savings: 19500, type: 'surgery', duration: '1-2 hours', recovery: '1 week', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Urology & Andrology',
    icon: 'user',
    description: "Men's health & urological procedures by German urologists",
    specialist: 'Dr. Med. Consultant Urology & Andrology',
    procedures: [
      { name: 'Complete Urology Checkup', price: 490, germanyPrice: 2200, turkeyPrice: 350, savings: 1710, type: 'checkup', duration: '2 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Prostate Assessment (MRI+PSA)', price: 420, germanyPrice: 1800, turkeyPrice: 300, savings: 1380, type: 'checkup', duration: '1.5 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'TURP (Prostate Surgery)', price: 3500, germanyPrice: 15000, turkeyPrice: 2700, savings: 11500, type: 'surgery', duration: '1-2 hours', recovery: '2-3 weeks', turkeyComparison: '+German MD' },
      { name: 'Kidney Stone Treatment (ESWL)', price: 1600, germanyPrice: 7000, turkeyPrice: 1200, savings: 5400, type: 'treatment', duration: '1 hour', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Vasectomy', price: 750, germanyPrice: 3000, turkeyPrice: 550, savings: 2250, type: 'surgery', duration: '30 min', recovery: '1 week', turkeyComparison: '+German MD' },
      { name: 'ED Treatment (PRP/Shockwave)', price: 1100, germanyPrice: 4500, turkeyPrice: 850, savings: 3400, type: 'treatment', duration: '45 min', recovery: 'Same day', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Gastroenterology',
    icon: 'stomach',
    description: 'Digestive health & internal medicine by German gastroenterologists',
    specialist: 'Dr. Med. Gastroenterology & Internal Medicine',
    procedures: [
      { name: 'Complete GI Checkup', price: 590, germanyPrice: 2800, turkeyPrice: 420, savings: 2210, type: 'checkup', duration: '3 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Gastroscopy (Diagnostic)', price: 280, germanyPrice: 1200, turkeyPrice: 200, savings: 920, type: 'checkup', duration: '30 min', recovery: '2-4 hours', turkeyComparison: '+German MD' },
      { name: 'Colonoscopy (Diagnostic)', price: 420, germanyPrice: 1800, turkeyPrice: 300, savings: 1380, type: 'checkup', duration: '45 min', recovery: '4-6 hours', turkeyComparison: '+German MD' },
      { name: 'GERD/Antireflux Treatment', price: 2200, germanyPrice: 10000, turkeyPrice: 1700, savings: 7800, type: 'treatment', duration: '1 hour', recovery: '2-3 days', turkeyComparison: '+German MD' },
      { name: 'Hemorrhoid Treatment', price: 1100, germanyPrice: 5000, turkeyPrice: 850, savings: 3900, type: 'treatment', duration: '30-45 min', recovery: '1-2 weeks', turkeyComparison: '+German MD' },
      { name: 'Liver FibroScan + Assessment', price: 220, germanyPrice: 900, turkeyPrice: 160, savings: 680, type: 'checkup', duration: '30 min', recovery: 'Same day', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Dental Care',
    icon: 'tooth',
    description: 'Comprehensive dental services from checkups to implants',
    specialist: 'Dr. Med. Dent. German Dental Specialist',
    procedures: [
      { name: 'Complete Dental Checkup', price: 75, germanyPrice: 350, turkeyPrice: 50, savings: 275, type: 'checkup', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Professional Cleaning', price: 95, germanyPrice: 400, turkeyPrice: 65, savings: 305, type: 'treatment', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Dental Implant (Single)', price: 650, germanyPrice: 3500, turkeyPrice: 480, savings: 2850, type: 'surgery', duration: '1-2 hours', recovery: '3-6 months', turkeyComparison: '+German MD' },
      { name: 'Full Mouth Implants (All-on-4)', price: 5200, germanyPrice: 25000, turkeyPrice: 3800, savings: 19800, type: 'surgery', duration: '3-4 hours', recovery: '3-6 months', turkeyComparison: '+German MD' },
      { name: 'Teeth Whitening (Zoom)', price: 220, germanyPrice: 900, turkeyPrice: 160, savings: 680, type: 'treatment', duration: '1.5 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Porcelain Veneers (per tooth)', price: 280, germanyPrice: 1200, turkeyPrice: 180, savings: 920, type: 'treatment', duration: '2 visits', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Root Canal Treatment', price: 220, germanyPrice: 900, turkeyPrice: 140, savings: 680, type: 'treatment', duration: '1-2 hours', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Dental Crown (Zirconia)', price: 350, germanyPrice: 1500, turkeyPrice: 240, savings: 1150, type: 'treatment', duration: '2 visits', recovery: 'Same day', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Pain Management',
    icon: 'syringe',
    description: 'Advanced pain therapy & anesthesiology',
    specialist: 'Dr. Med. Anesthesia & Pain Management',
    procedures: [
      { name: 'Pain Assessment & Consultation', price: 150, germanyPrice: 650, turkeyPrice: 100, savings: 500, type: 'checkup', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Epidural Steroid Injection', price: 490, germanyPrice: 2200, turkeyPrice: 380, savings: 1710, type: 'treatment', duration: '30 min', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Nerve Block Therapy', price: 420, germanyPrice: 1800, turkeyPrice: 300, savings: 1380, type: 'treatment', duration: '30-45 min', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'Facet Joint Injection', price: 350, germanyPrice: 1500, turkeyPrice: 260, savings: 1150, type: 'treatment', duration: '30 min', recovery: '1 day', turkeyComparison: '+German MD' },
      { name: 'Trigger Point Therapy', price: 220, germanyPrice: 900, turkeyPrice: 160, savings: 680, type: 'treatment', duration: '30 min', recovery: 'Same day', turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Anti-Aging & Longevity',
    icon: 'clock',
    description: 'Regenerative medicine & wellness treatments',
    specialist: 'Prof. Dr. Med. Regenerative Medicine',
    procedures: [
      { name: 'Executive Health Checkup', price: 1500, germanyPrice: 7000, turkeyPrice: 1100, savings: 5500, type: 'checkup', duration: 'Full day', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Stem Cell Therapy', price: 7900, germanyPrice: 35000, turkeyPrice: 5500, savings: 27100, type: 'treatment', duration: '3-4 hours', recovery: '1-2 days', turkeyComparison: '+German MD' },
      { name: 'PRP Therapy (Face/Hair)', price: 650, germanyPrice: 8000, turkeyPrice: 450, savings: 7350, type: 'treatment', duration: '1 hour', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'IV Vitamin Therapy', price: 280, germanyPrice: 1200, turkeyPrice: 200, savings: 920, type: 'treatment', duration: '1-2 hours', recovery: 'Same day', turkeyComparison: '+German MD' },
      { name: 'Hormone Optimization', price: 2500, germanyPrice: 12000, turkeyPrice: 1800, savings: 9500, type: 'treatment', duration: 'Ongoing', recovery: 'None', turkeyComparison: '+German MD' },
      { name: 'NAD+ Infusion Therapy', price: 420, germanyPrice: 1800, turkeyPrice: 300, savings: 1380, type: 'treatment', duration: '2-3 hours', recovery: 'Same day', turkeyComparison: '+German MD' }
    ]
  }
];

export const TRUST_BADGES = [
  { name: 'JCI Accredited', icon: 'award', description: 'Gold Standard in Healthcare' },
  { name: 'German Board Certified', icon: 'certificate', description: 'Facharzt Qualifications' },
  { name: 'TEMOS Certified', icon: 'globe', description: 'International Patient Standards' },
  { name: 'ISO 13485', icon: 'shield-alt', description: 'Medical Device Quality' },
  { name: 'GDPR Compliant', icon: 'lock', description: 'Data Protection' },
  { name: 'HIPAA Ready', icon: 'user-shield', description: 'Privacy Standards' }
];

export const RECOVERY_ITINERARY = {
  week1: {
    title: 'Week 1: Rest & Gentle Healing',
    days: [
      { days: '1-2', activity: 'Surgery + hospital stay (JCI facility)', icon: 'hospital' },
      { days: '3-4', activity: 'Transfer to resort, room rest with sea view', icon: 'hotel' },
      { days: '5-6', activity: 'Gentle beach walks (15 min 2x/day)', icon: 'walking' },
      { days: '7', activity: 'First spa session (light massage)', icon: 'spa' }
    ]
  },
  week2: {
    title: 'Week 2: Active Recovery',
    days: [
      { days: '8-9', activity: 'Pool therapy sessions', icon: 'swimming-pool' },
      { days: '10-11', activity: 'Healthy cooking class (optional)', icon: 'utensils' },
      { days: '12', activity: 'Glass-bottom boat reef tour', icon: 'ship' },
      { days: '14', activity: 'Fit-to-fly check + departure', icon: 'plane-departure' }
    ]
  }
};

// Main services page export
export const servicesPage = () => `<!DOCTYPE html>
<html lang="en">
<head>
    ${BRAND_HEAD}
    <title>Our Services - SelectCareOS™ | German Select Medical Tourism</title>
    <meta name="description" content="German-quality healthcare in Egypt. German trained surgeons, Red Sea recovery, complete digital guidance. Save up to 70% compared to German hospitals.">
    <style>
        ${UNIFIED_CSS}
        
        /* Page-specific hero enhancement */
        .gradient-hero {
            background: linear-gradient(135deg, var(--navy) 0%, #0A2E4F 40%, var(--navy) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .gradient-hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 80%;
            height: 150%;
            background: radial-gradient(ellipse at center, rgba(212, 168, 67, 0.15) 0%, transparent 70%);
            animation: pulse-glow 8s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .card-gold {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%);
            border-radius: var(--radius-xl);
        }
        
        .btn-navy {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            padding: 14px 28px;
            border-radius: var(--radius-full);
            font-weight: 600;
            transition: all var(--transition-spring);
            display: inline-block;
            text-decoration: none;
            box-shadow: var(--shadow-md);
        }
        
        .btn-navy:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .btn-gold {
            background: linear-gradient(135deg, var(--gold), var(--gold-bright));
            color: var(--navy);
            padding: 14px 28px;
            border-radius: var(--radius-full);
            font-weight: 600;
            transition: all var(--transition-spring);
            display: inline-block;
            text-decoration: none;
            box-shadow: var(--shadow-sm);
        }
        
        .btn-gold:hover {
            background: linear-gradient(135deg, var(--gold-warm), var(--gold));
            transform: translateY(-2px);
            box-shadow: var(--shadow-gold);
        }
        
        .btn-outline-white {
            background: transparent;
            border: 2px solid white;
            color: white;
            padding: 12px 26px;
            border-radius: var(--radius-full);
            font-weight: 600;
            transition: all var(--transition-spring);
            display: inline-block;
            text-decoration: none;
        }
        
        .btn-outline-white:hover {
            background: white;
            color: var(--navy);
        }
        
        .step-number {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--gold), var(--gold-bright));
            color: var(--navy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            position: relative;
            z-index: 10;
            box-shadow: var(--shadow-gold);
        }
        
        .step-line {
            position: absolute;
            top: 30px;
            left: 30px;
            right: -100%;
            height: 3px;
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
            z-index: 5;
        }
        
        .testimonial-card {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 100%);
            border-radius: var(--radius-xl);
            padding: 24px;
            box-shadow: var(--shadow-md);
            border: 1px solid rgba(212, 168, 67, 0.08);
            position: relative;
            transition: all var(--transition-spring);
        }
        
        .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
            border-color: rgba(212, 168, 67, 0.2);
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 60px;
            color: var(--gold);
            opacity: 0.3;
            font-family: Georgia, serif;
            line-height: 1;
        }
        
        .price-tag {
            background: linear-gradient(135deg, var(--navy), var(--navy-light));
            color: white;
            padding: 8px 16px;
            border-radius: var(--radius-md);
            font-weight: 700;
            display: inline-block;
        }
        
        .savings-tag {
            background: linear-gradient(135deg, #22C55E, #16A34A);
            color: white;
            padding: 4px 12px;
            border-radius: var(--radius-full);
            font-size: 12px;
            font-weight: 600;
        }
        
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gold);
            color: var(--navy);
            padding: 6px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
        }
        
        .trust-badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .itinerary-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 12px 0;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .itinerary-item:last-child {
            border-bottom: none;
        }
        
        .floating-cta {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        @keyframes pulse-gold {
            0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.4); }
            50% { box-shadow: 0 0 0 15px rgba(201, 162, 39, 0); }
        }
        
        .pulse-gold {
            animation: pulse-gold 2s infinite;
        }
        
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile menu */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--navy);
            z-index: 1000;
            padding: 80px 24px 24px;
        }
        
        .mobile-menu.active {
            display: block;
        }
        
        .mobile-menu a {
            display: block;
            padding: 16px 0;
            color: white;
            font-size: 18px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .mobile-menu a.active {
            color: var(--gold);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .step-line { display: none; }
            .floating-cta { bottom: 80px; right: 10px; }
            .hero-stats { grid-template-columns: 1fr !important; }
            .btn-gold, .btn-outline-white { width: 100%; text-align: center; }
        }
        
        /* Bottom nav and emergency button are now provided by UNIFIED_CSS */
        
        footer { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-cream">
    <!-- Navigation -->
    <nav class="bg-navy py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="text-white text-xl font-bold">
                SelectCare<span class="text-gold">OS</span>™
            </a>
            <div class="hidden md:flex items-center space-x-6">
                <a href="/" class="text-white/80 hover:text-white transition">Home</a>
                <a href="/services" class="text-gold font-semibold">Services</a>
                <a href="/packages" class="text-white/80 hover:text-white transition">Packages</a>
                <a href="/care-team" class="text-white/80 hover:text-white transition">Doctors</a>
                <a href="/booking" class="btn-gold text-sm py-2 px-4">Book Consultation</a>
            </div>
            <button id="mobile-menu-btn" class="md:hidden text-white text-xl" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu">
        <button onclick="toggleMobileMenu()" class="absolute top-4 right-4 text-white text-2xl">
            <i class="fas fa-times"></i>
        </button>
        <a href="/">Home</a>
        <a href="/services" class="active">Services</a>
        <a href="/packages">Packages</a>
        <a href="/care-team">Doctors</a>
        <a href="/wellness">Wellness</a>
        <a href="/subscription">Subscription Plans</a>
        <a href="/booking" class="btn-gold mt-6 text-center" style="border-radius: 12px;">Book Consultation</a>
    </div>

    <!-- Hero Section -->
    <section class="gradient-hero py-20 px-6 relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                <div class="lg:w-1/2 text-center lg:text-left">
                    <!-- Trust Badges -->
                    <div class="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <span class="bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-semibold">
                            <i class="fas fa-award mr-2"></i>German Medical Standards
                        </span>
                        <span class="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            <i class="fas fa-certificate mr-2"></i>JCI Accredited
                        </span>
                    </div>
                    
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        German-Quality Healthcare<br>
                        <span class="text-gold">in Egypt</span>
                    </h1>
                    
                    <p class="text-xl text-white/80 mb-8 max-w-lg">
                        German trained surgeons + calm Red Sea recovery + complete digital guidance
                    </p>
                    
                    <!-- Value Props -->
                    <div class="grid grid-cols-3 gap-4 mb-8">
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                            <p class="text-3xl font-bold text-gold">€8,500</p>
                            <p class="text-sm text-white/70">vs €22,000 Germany</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                            <p class="text-3xl font-bold text-gold">5-Star</p>
                            <p class="text-sm text-white/70">Red Sea Resorts</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                            <p class="text-3xl font-bold text-gold">12+</p>
                            <p class="text-sm text-white/70">Months Follow-Up</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="/booking" class="btn-gold text-center">
                            <i class="fas fa-calendar-check mr-2"></i>Book Free Consultation
                        </a>
                        <a href="#packages" class="btn-outline-white text-center">
                            <i class="fas fa-box-open mr-2"></i>View Packages
                        </a>
                    </div>
                </div>
                
                <div class="lg:w-1/2">
                    <!-- Hero Image/Video placeholder -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
                            <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/50"></div>
                            <div class="relative z-10 text-center p-8">
                                <i class="fas fa-play-circle text-white text-6xl mb-4 opacity-80"></i>
                                <p class="text-white font-semibold">Watch Patient Stories</p>
                            </div>
                            <!-- Simulated Red Sea view -->
                            <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-600/30 to-transparent"></div>
                        </div>
                        
                        <!-- Floating stats card -->
                        <div class="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <p class="font-bold text-navy">2,500+ Patients</p>
                                    <p class="text-sm text-gray-500">Successfully Treated</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Rating card -->
                        <div class="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                            <div class="flex items-center gap-2">
                                <div class="flex text-gold">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span class="font-bold text-navy">4.9/5</span>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">1,200+ Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 24/7 Instant Doctor Access Banner -->
    <section class="py-8 px-6 bg-gradient-to-r from-green-600 to-emerald-700 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
        </div>
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <i class="fas fa-video text-white text-2xl"></i>
                </div>
                <div class="text-white">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                        <span class="text-sm font-semibold text-green-200">24/7 Available</span>
                    </div>
                    <h3 class="text-xl md:text-2xl font-bold">Instant Doctor Access</h3>
                    <p class="text-green-100 text-sm">Connect with a German-certified doctor in under 2 minutes</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-white text-center">
                    <span class="text-3xl font-bold">€50</span>
                    <span class="text-sm text-green-200 block">/ 30 min session</span>
                </div>
                <a href="/instant-doctor" class="bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition shadow-lg flex items-center gap-2">
                    <i class="fas fa-bolt"></i>
                    Connect Now
                </a>
            </div>
        </div>
    </section>

    <!-- Why Red Sea Recovery Section -->
    <section class="py-20 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-sun mr-2"></i>Why the Red Sea?
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    Why Recover at the Red Sea?
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    The perfect combination of world-class medical care and therapeutic natural environment
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${RED_SEA_BENEFITS.map(benefit => `
                    <div class="card p-6 text-center hover:border-gold hover:border-2 transition-all cursor-pointer">
                        <div class="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-${benefit.icon} text-gold text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-navy text-lg mb-2">${benefit.title}</h3>
                        <p class="text-sm text-gray-600 mb-4">${benefit.description}</p>
                        <div class="bg-navy rounded-lg py-3 px-4 inline-block">
                            <span class="text-2xl font-bold text-gold">${benefit.stat}</span>
                            <span class="text-xs text-white block">${benefit.statLabel}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- The SelectCare Journey Section -->
    <section class="py-20 px-6 bg-cream">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-route mr-2"></i>Your Journey
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    The SelectCare Journey
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    A seamless, guided experience from consultation to complete recovery
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 relative">
                ${JOURNEY_STEPS.map((step, index) => {
                    // Define colors based on step color
                    const colorStyles = {
                        blue: { bg: 'background: rgba(59, 130, 246, 0.1);', text: 'color: #3B82F6;' },
                        gold: { bg: 'background: rgba(201, 162, 39, 0.1);', text: 'color: #C9A227;' },
                        green: { bg: 'background: rgba(34, 197, 94, 0.1);', text: 'color: #22C55E;' }
                    };
                    const style = colorStyles[step.color as keyof typeof colorStyles] || colorStyles.gold;
                    
                    return `
                    <div class="relative animate-fade-in" style="animation-delay: ${index * 0.2}s">
                        <!-- Step number with connecting line -->
                        <div class="flex justify-center mb-6">
                            <div class="step-number">
                                ${step.step}
                                ${index < 2 ? '<div class="step-line hidden md:block"></div>' : ''}
                            </div>
                        </div>
                        
                        <div class="card p-6 h-full ${step.color === 'gold' ? 'ring-2 ring-gold' : ''}" style="transition: all 0.3s;">
                            <div class="text-center mb-4">
                                <div class="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style="${style.bg}">
                                    <i class="fas fa-${step.icon} text-xl" style="${style.text}"></i>
                                </div>
                                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">${step.duration}</span>
                                <span class="mx-2 text-gray-300">•</span>
                                <span class="text-xs text-gray-500">${step.location}</span>
                            </div>
                            
                            <h3 class="font-bold text-navy text-xl text-center mb-3">${step.title}</h3>
                            <p class="text-sm text-gray-600 text-center mb-4">${step.description}</p>
                            
                            <ul class="space-y-2 mb-6">
                                ${step.features.map(feature => `
                                    <li class="flex items-start text-sm">
                                        <i class="fas fa-check text-gold mr-2 mt-1 flex-shrink-0"></i>
                                        <span class="text-gray-700">${feature}</span>
                                    </li>
                                `).join('')}
                            </ul>
                            
                            <div class="text-center pt-4 border-t">
                                ${step.price ? `
                                    <span class="price-tag">From €${step.price.toLocaleString()}</span>
                                ` : step.priceRange ? `
                                    <span class="price-tag">€${step.priceRange.min.toLocaleString()} - €${step.priceRange.max.toLocaleString()}</span>
                                ` : `
                                    <span class="price-tag">€${step.priceMonthly}/month</span>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    </section>

    <!-- Recovery Experience Section -->
    <section class="py-20 px-6 bg-navy text-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-umbrella-beach mr-2"></i>Recovery Paradise
                </span>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    Your Red Sea Recovery Experience
                </h2>
                <p class="text-white/70 max-w-2xl mx-auto">
                    Healing doesn't have to be boring. Welcome to paradise.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                ${RECOVERY_ACTIVITIES.map(activity => `
                    <div class="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/15 transition-all">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-${activity.icon} text-gold text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-white text-lg mb-1">${activity.name}</h3>
                                <p class="text-sm text-white/70 mb-2">${activity.description}</p>
                                <span class="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full">${activity.timing}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Sample Recovery Itinerary -->
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                    <h3 class="font-bold text-gold text-xl mb-4 flex items-center">
                        <i class="fas fa-calendar-week mr-3"></i>
                        ${RECOVERY_ITINERARY.week1.title}
                    </h3>
                    <div class="space-y-0">
                        ${RECOVERY_ITINERARY.week1.days.map(day => `
                            <div class="itinerary-item border-white/10">
                                <div class="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-${day.icon} text-gold"></i>
                                </div>
                                <div>
                                    <span class="text-gold font-semibold text-sm">Day ${day.days}</span>
                                    <p class="text-white/80">${day.activity}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                    <h3 class="font-bold text-gold text-xl mb-4 flex items-center">
                        <i class="fas fa-calendar-week mr-3"></i>
                        ${RECOVERY_ITINERARY.week2.title}
                    </h3>
                    <div class="space-y-0">
                        ${RECOVERY_ITINERARY.week2.days.map(day => `
                            <div class="itinerary-item border-white/10">
                                <div class="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-${day.icon} text-gold"></i>
                                </div>
                                <div>
                                    <span class="text-gold font-semibold text-sm">Day ${day.days}</span>
                                    <p class="text-white/80">${day.activity}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Care Packages Section -->
    <section id="packages" class="py-20 px-6 bg-cream">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-box-open mr-2"></i>Care Packages
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    Red Sea Recovery Packages
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    All-inclusive packages designed for your complete recovery journey
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                ${CARE_PACKAGES_DETAILED.map(pkg => `
                    <div class="card overflow-hidden ${pkg.popular ? 'ring-2 ring-gold relative' : ''} h-full flex flex-col">
                        ${pkg.badge ? `<div class="popular-badge">${pkg.badge}</div>` : ''}
                        
                        <div class="p-6 flex-grow">
                            <div class="text-center mb-6">
                                <h3 class="font-bold text-navy text-2xl">${pkg.name}</h3>
                                <p class="text-gold font-semibold">${pkg.tier}</p>
                                <p class="text-sm text-gray-500 mt-1">${pkg.tagline}</p>
                            </div>
                            
                            <div class="text-center mb-6">
                                <p class="text-sm text-gray-500">Starting from</p>
                                <p class="text-4xl font-bold text-navy">€${pkg.price.toLocaleString()}</p>
                                <div class="mt-2">
                                    <span class="savings-tag">
                                        <i class="fas fa-tag mr-1"></i>Save €${pkg.savingsVsGermany.toLocaleString()} vs Germany
                                    </span>
                                </div>
                            </div>
                            
                            <div class="space-y-3 mb-6">
                                ${pkg.features.map(feature => `
                                    <div class="flex items-center text-sm">
                                        ${feature.included ? `
                                            <i class="fas fa-check-circle text-green-500 mr-3 flex-shrink-0"></i>
                                            <span class="text-gray-700">${feature.text}</span>
                                        ` : `
                                            <i class="fas fa-times-circle text-gray-300 mr-3 flex-shrink-0"></i>
                                            <span class="text-gray-400">${feature.text}</span>
                                        `}
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                                <span><i class="fas fa-calendar mr-1"></i>${pkg.duration} days</span>
                                <span><i class="fas fa-hotel mr-1"></i>${pkg.accommodation}</span>
                            </div>
                        </div>
                        
                        <div class="p-6 pt-0">
                            <a href="/booking?package=${pkg.id}" class="${pkg.popular ? 'btn-gold' : 'btn-outline'} w-full text-center block">
                                ${pkg.popular ? '<i class="fas fa-star mr-2"></i>' : ''}Select Package
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Custom Package CTA -->
            <div class="mt-12 text-center">
                <div class="card p-8 max-w-2xl mx-auto border-2 border-dashed border-gold">
                    <i class="fas fa-cogs text-gold text-4xl mb-4"></i>
                    <h3 class="font-bold text-navy text-xl mb-2">Need a Custom Package?</h3>
                    <p class="text-gray-600 mb-4">
                        Our team will create a personalized care plan tailored to your specific needs and budget.
                    </p>
                    <a href="/booking?type=custom" class="btn-outline">
                        <i class="fas fa-envelope mr-2"></i>Request Custom Quote
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Medical Shop - Onsite Treatments & Surgeries -->
    <section id="shop" class="py-20 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-store-alt mr-2"></i>Medical Shop
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    Onsite Treatments & Surgeries
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    German expertise, Red Sea recovery. Compare our prices - save up to 70% vs Germany
                </p>
            </div>
            
            <!-- Filter Tabs -->
            <div class="flex flex-wrap justify-center gap-3 mb-8">
                <button onclick="filterServices('all')" class="service-filter active px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gold text-navy" data-filter="all">
                    <i class="fas fa-th-large mr-2"></i>All Services
                </button>
                <button onclick="filterServices('surgery')" class="service-filter px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-100 text-gray-600 hover:bg-gold/20 hover:text-navy" data-filter="surgery">
                    <i class="fas fa-procedures mr-2"></i>Surgeries
                </button>
                <button onclick="filterServices('treatment')" class="service-filter px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-100 text-gray-600 hover:bg-gold/20 hover:text-navy" data-filter="treatment">
                    <i class="fas fa-syringe mr-2"></i>Treatments
                </button>
                <button onclick="filterServices('checkup')" class="service-filter px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-100 text-gray-600 hover:bg-gold/20 hover:text-navy" data-filter="checkup">
                    <i class="fas fa-stethoscope mr-2"></i>Checkups
                </button>
            </div>
            
            <!-- Category Cards -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="serviceGrid">
                <!-- Instant Doctor Card - Featured -->
                <div class="card p-6 service-category bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 relative overflow-hidden" data-category="instant">
                    <div class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        <i class="fas fa-bolt mr-1"></i>INSTANT
                    </div>
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-video text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy text-lg">24/7 Doctor Access</h3>
                            <p class="text-xs text-gray-500">Video consultations anytime</p>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-600 mb-4">Connect with a German-certified doctor instantly via HD video for urgent questions, second opinions, or follow-up care.</p>
                    
                    <div class="space-y-3 mb-4">
                        <div class="p-4 bg-white rounded-xl border border-green-100">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <p class="font-semibold text-navy text-sm">Instant Video Consultation</p>
                                        <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            <i class="fas fa-video mr-1"></i>Video
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs text-green-600">
                                        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span>Doctors online now</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-bold text-green-600 text-lg">€50</p>
                                    <span class="text-xs text-gray-500">/ 30 min</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 text-xs text-gray-500">
                                <span><i class="fas fa-clock mr-1"></i>&lt; 2 min wait</span>
                                <span><i class="fas fa-globe mr-1"></i>EN, DE, AR</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t border-green-200">
                        <a href="/instant-doctor" class="w-full text-center block bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition">
                            <i class="fas fa-bolt mr-2"></i>Connect Now
                        </a>
                    </div>
                </div>
                
                ${TREATMENT_PROCEDURES.map(category => `
                    <div class="card p-6 service-category" data-category="${category.category}">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-${
                                    category.icon === 'weight' ? 'weight' : 
                                    category.icon === 'bone' ? 'bone' : 
                                    category.icon === 'sparkles' ? 'magic' : 
                                    category.icon === 'heartbeat' ? 'heartbeat' :
                                    category.icon === 'user' ? 'male' :
                                    category.icon === 'stomach' ? 'stomach' :
                                    category.icon === 'tooth' ? 'tooth' :
                                    category.icon === 'syringe' ? 'syringe' :
                                    'clock'
                                } text-navy text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-navy text-lg">${category.category}</h3>
                                <p class="text-xs text-gray-500">${category.procedures.length} procedures</p>
                            </div>
                        </div>
                        
                        <p class="text-sm text-gray-600 mb-4">${category.description || ''}</p>
                        
                        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            ${category.procedures.map(proc => `
                                <div class="service-item p-4 bg-gradient-to-r from-cream to-white rounded-xl border-2 border-transparent hover:border-gold transition-all cursor-pointer" 
                                     data-type="${proc.type}"
                                     onclick="showServiceDetail('${encodeURIComponent(JSON.stringify({...proc, category: category.category, specialist: category.specialist}))}')">
                                    <div class="flex items-start justify-between mb-2">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <p class="font-semibold text-navy text-sm">${proc.name}</p>
                                                <span class="px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    proc.type === 'surgery' ? 'bg-red-100 text-red-700' :
                                                    proc.type === 'treatment' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-green-100 text-green-700'
                                                }">${proc.type === 'surgery' ? '⚕️ Surgery' : proc.type === 'treatment' ? '💉 Treatment' : '🔍 Checkup'}</span>
                                            </div>
                                            <p class="text-xs text-gray-400 line-through">Germany: €${proc.germanyPrice.toLocaleString()}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-bold text-gold text-lg">€${proc.price.toLocaleString()}</p>
                                            <span class="savings-tag text-xs">
                                                Save €${proc.savings.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 text-xs text-gray-500">
                                        <span><i class="fas fa-clock mr-1"></i>${proc.duration}</span>
                                        <span><i class="fas fa-bed mr-1"></i>${proc.recovery}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <a href="/booking?category=${encodeURIComponent(category.category)}" class="btn-gold w-full text-center block text-sm py-3">
                                <i class="fas fa-calendar-check mr-2"></i>Book Consultation
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Service Detail Modal -->
    <div id="serviceDetailModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                    <h3 id="modalTitle" class="text-xl font-bold text-navy"></h3>
                    <button onclick="closeServiceDetail()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div id="modalContent" class="p-6"></div>
            <div class="p-6 border-t border-gray-100 bg-cream rounded-b-3xl">
                <div class="flex gap-4">
                    <a id="modalBookBtn" href="#" class="flex-1 btn-gold text-center py-4 rounded-xl font-semibold">
                        <i class="fas fa-calendar-check mr-2"></i>Book This Procedure
                    </a>
                    <a href="/medisense" class="flex-1 btn-outline text-center py-4 rounded-xl font-semibold">
                        <i class="fas fa-brain mr-2"></i>Check Eligibility
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function filterServices(type) {
            // Update active button
            document.querySelectorAll('.service-filter').forEach(btn => {
                btn.classList.remove('active', 'bg-gold', 'text-navy');
                btn.classList.add('bg-gray-100', 'text-gray-600');
            });
            const activeBtn = document.querySelector(\`.service-filter[data-filter="\${type}"]\`);
            if (activeBtn) {
                activeBtn.classList.add('active', 'bg-gold', 'text-navy');
                activeBtn.classList.remove('bg-gray-100', 'text-gray-600');
            }
            
            // Filter items
            document.querySelectorAll('.service-item').forEach(item => {
                const itemType = item.dataset.type;
                if (type === 'all' || itemType === type) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Hide empty categories
            document.querySelectorAll('.service-category').forEach(cat => {
                const visibleItems = cat.querySelectorAll('.service-item[style="display: block"], .service-item:not([style*="display"])');
                const hiddenItems = cat.querySelectorAll('.service-item[style="display: none"]');
                if (type !== 'all' && hiddenItems.length === cat.querySelectorAll('.service-item').length) {
                    cat.style.display = 'none';
                } else {
                    cat.style.display = 'block';
                }
            });
        }
        
        function showServiceDetail(serviceJson) {
            const service = JSON.parse(decodeURIComponent(serviceJson));
            document.getElementById('modalTitle').textContent = service.name;
            
            const content = \`
                <div class="space-y-6">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="px-3 py-1 rounded-full text-sm font-medium \${
                            service.type === 'surgery' ? 'bg-red-100 text-red-700' :
                            service.type === 'treatment' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                        }">\${service.type === 'surgery' ? '⚕️ Major Surgery' : service.type === 'treatment' ? '💉 Onsite Treatment' : '🔍 Diagnostic Checkup'}</span>
                        <span class="text-sm text-gray-500">\${service.category}</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-cream rounded-xl p-4">
                            <p class="text-sm text-gray-500 mb-1">Our Price</p>
                            <p class="text-3xl font-bold text-gold">€\${service.price.toLocaleString()}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4">
                            <p class="text-sm text-gray-500 mb-1">Germany Price</p>
                            <p class="text-2xl font-bold text-gray-400 line-through">€\${service.germanyPrice.toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <p class="text-sm text-green-600 mb-1">Your Savings</p>
                        <p class="text-2xl font-bold text-green-600">€\${service.savings.toLocaleString()}</p>
                        <p class="text-xs text-green-500">\${Math.round((service.savings / service.germanyPrice) * 100)}% less than Germany</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex items-center gap-3 p-3 bg-cream rounded-lg">
                            <i class="fas fa-clock text-gold"></i>
                            <div>
                                <p class="text-xs text-gray-500">Duration</p>
                                <p class="font-semibold text-navy">\${service.duration}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-cream rounded-lg">
                            <i class="fas fa-bed text-gold"></i>
                            <div>
                                <p class="text-xs text-gray-500">Recovery</p>
                                <p class="font-semibold text-navy">\${service.recovery}</p>
                            </div>
                        </div>
                    </div>
                    
                    \${service.specialist ? \`
                        <div class="flex items-center gap-4 p-4 border border-gold/30 rounded-xl bg-gold/5">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-user-md text-navy"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Performed by</p>
                                <p class="font-semibold text-navy">\${service.specialist}</p>
                                <p class="text-xs text-gold">German Board-Certified</p>
                            </div>
                        </div>
                    \` : ''}
                    
                    <div class="space-y-2">
                        <h4 class="font-semibold text-navy">What's Included:</h4>
                        <ul class="grid grid-cols-1 gap-2 text-sm text-gray-600">
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>German Board-Certified Specialist</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>JCI-Accredited Hospital Facility</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>Pre-operative Consultation</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>Post-procedure Follow-up</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>SelectCareOS™ Digital Support</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>24/7 Medical Hotline</li>
                        </ul>
                    </div>
                </div>
            \`;
            
            document.getElementById('modalContent').innerHTML = content;
            document.getElementById('modalBookBtn').href = '/booking?procedure=' + encodeURIComponent(service.name) + '&category=' + encodeURIComponent(service.category);
            document.getElementById('serviceDetailModal').classList.remove('hidden');
            document.getElementById('serviceDetailModal').classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        
        function closeServiceDetail() {
            document.getElementById('serviceDetailModal').classList.add('hidden');
            document.getElementById('serviceDetailModal').classList.remove('flex');
            document.body.style.overflow = '';
        }
        
        // Close modal on escape or outside click
        document.getElementById('serviceDetailModal').addEventListener('click', function(e) {
            if (e.target === this) closeServiceDetail();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeServiceDetail();
        });
    </script>

    <!-- Patient Testimonials -->
    <section class="py-20 px-6 bg-cream">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-comments mr-2"></i>Success Stories
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    Patient Success Stories
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    Hear from our patients about their transformation journey
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${TESTIMONIALS.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">
                                ${testimonial.avatar}
                            </div>
                            <div>
                                <p class="font-bold text-navy">${testimonial.name}</p>
                                <p class="text-xs text-gray-500">${testimonial.location}</p>
                            </div>
                        </div>
                        
                        <div class="flex text-gold mb-3">
                            ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                        
                        <p class="text-sm text-gray-600 italic mb-4">"${testimonial.quote}"</p>
                        
                        <div class="flex items-center justify-between pt-4 border-t">
                            <span class="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">${testimonial.procedure}</span>
                            ${testimonial.weightLoss ? `
                                <span class="text-xs text-green-600 font-semibold">
                                    <i class="fas fa-arrow-down mr-1"></i>-${testimonial.weightLoss}kg
                                </span>
                            ` : ''}
                        </div>
                        
                        ${testimonial.verified ? `
                            <div class="mt-3 text-xs text-gray-400">
                                <i class="fas fa-check-circle text-blue-500 mr-1"></i>Verified Patient
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Trust Badges Section -->
    <section class="py-16 px-6 bg-navy">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-10">
                <h2 class="text-2xl font-bold text-white mb-2">Trusted by Patients Worldwide</h2>
                <p class="text-white/70">Certified to the highest international standards</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                ${TRUST_BADGES.map(badge => `
                    <div class="trust-badge">
                        <div class="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-3">
                            <i class="fas fa-${badge.icon} text-gold text-xl"></i>
                        </div>
                        <p class="font-semibold text-navy text-sm text-center">${badge.name}</p>
                        <p class="text-xs text-gray-500 text-center">${badge.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 px-6 gradient-gold">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                Ready for Your Red Sea Transformation?
            </h2>
            <p class="text-navy/80 mb-8 text-lg">
                Book your free virtual consultation with a German board-certified surgeon
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/booking" class="btn-navy pulse-gold">
                    <i class="fas fa-video mr-2"></i>Book Free Consultation
                </a>
                <a href="tel:+4930123456789" class="bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition inline-block">
                    <i class="fas fa-phone mr-2"></i>Call +49 30 123 456 789
                </a>
            </div>
            
            <p class="text-sm text-navy/60 mt-6">
                <i class="fas fa-shield-alt mr-2"></i>No obligation • German medical team • 24/7 support
            </p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-navy py-12 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-white font-bold text-lg mb-4">
                        SelectCare<span class="text-gold">OS</span>™
                    </h3>
                    <p class="text-white/60 text-sm">
                        German Medical Excellence, Egyptian Hospitality, Red Sea Recovery.
                    </p>
                </div>
                <div>
                    <h4 class="text-gold font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/services" class="text-white/60 hover:text-white">All Services</a></li>
                        <li><a href="/packages" class="text-white/60 hover:text-white">Care Packages</a></li>
                        <li><a href="/wellness" class="text-white/60 hover:text-white">Wellness</a></li>
                        <li><a href="/booking" class="text-white/60 hover:text-white">Book Consultation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-gold font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/care-team" class="text-white/60 hover:text-white">Our Doctors</a></li>
                        <li><a href="https://www.germanselect.org" class="text-white/60 hover:text-white" target="_blank">German Select</a></li>
                        <li><a href="/subscription" class="text-white/60 hover:text-white">Subscription Plans</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-gold font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="text-white/60"><i class="fas fa-phone mr-2"></i>+49 30 123 456 789</li>
                        <li class="text-white/60"><i class="fas fa-envelope mr-2"></i>info@germanselect.org</li>
                        <li class="text-white/60"><i class="fas fa-map-marker-alt mr-2"></i>Hurghada, Egypt</li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-white/40 text-sm">
                    © ${new Date().getFullYear()} German Select GmbH. All rights reserved.
                </p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" class="text-white/40 hover:text-gold"><i class="fab fa-facebook text-xl"></i></a>
                    <a href="#" class="text-white/40 hover:text-gold"><i class="fab fa-instagram text-xl"></i></a>
                    <a href="#" class="text-white/40 hover:text-gold"><i class="fab fa-linkedin text-xl"></i></a>
                    <a href="#" class="text-white/40 hover:text-gold"><i class="fab fa-youtube text-xl"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Floating CTA -->
    <div class="floating-cta">
        <a href="/booking" class="btn-gold pulse-gold shadow-lg">
            <i class="fas fa-calendar-check mr-2"></i>Book Now
        </a>
        <a href="tel:+4930123456789" class="bg-white text-navy font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition">
            <i class="fas fa-phone"></i>
        </a>
    </div>

    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Close mobile menu if open
                const menu = document.getElementById('mobile-menu');
                if (menu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
        
        // Counter animation for stats
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        }
        
        // Trigger counter animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Could add counter animations here if needed
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const heroSection = document.querySelector('.gradient-hero');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    </script>
    
    <!-- Unified Bottom Navigation -->
    ${getUnifiedBottomNav('home')}
</body>
</html>`;
