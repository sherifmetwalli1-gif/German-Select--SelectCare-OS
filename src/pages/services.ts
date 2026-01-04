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
 */

// Static data for services page
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
    price: 2500,
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
    priceRange: { min: 7500, max: 22000 },
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
    priceMonthly: 99,
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

export const CARE_PACKAGES_DETAILED = [
  {
    id: 'selectcare-essential',
    name: 'SELECTCARE™',
    tier: 'Essential',
    tagline: 'German Excellence, Affordable Care',
    price: 7500,
    priceRange: { min: 5500, max: 10000 },
    savingsVsGermany: 14500,
    turkeyComparison: 5500,
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
    price: 12000,
    priceRange: { min: 9500, max: 18000 },
    savingsVsGermany: 20000,
    turkeyComparison: 9000,
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
    price: 22000,
    priceRange: { min: 18000, max: 30000 },
    savingsVsGermany: 33000,
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

export const TREATMENT_PROCEDURES = [
  {
    category: 'Bariatric Surgery',
    icon: 'weight',
    procedures: [
      { name: 'Gastric Sleeve', price: 7500, germanyPrice: 22000, turkeyPrice: 4500, savings: 14500, turkeyComparison: '+German MD' },
      { name: 'Gastric Bypass', price: 10500, germanyPrice: 28000, turkeyPrice: 6500, savings: 17500, turkeyComparison: '+German MD' },
      { name: 'Revision Surgery', price: 13000, germanyPrice: 35000, turkeyPrice: 7500, savings: 22000, turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Orthopedic Surgery',
    icon: 'bone',
    procedures: [
      { name: 'Knee Replacement', price: 13500, germanyPrice: 40000, turkeyPrice: 9000, savings: 26500, turkeyComparison: '+German MD' },
      { name: 'Hip Replacement', price: 15000, germanyPrice: 45000, turkeyPrice: 12000, savings: 30000, turkeyComparison: '+German MD' },
      { name: 'Spine Surgery', price: 19500, germanyPrice: 55000, turkeyPrice: 14000, savings: 35500, turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Aesthetic Surgery',
    icon: 'sparkles',
    procedures: [
      { name: 'Facelift', price: 8500, germanyPrice: 25000, turkeyPrice: 5500, savings: 16500, turkeyComparison: '+German MD' },
      { name: 'Body Contouring', price: 10500, germanyPrice: 30000, turkeyPrice: 6500, savings: 19500, turkeyComparison: '+German MD' },
      { name: 'Rhinoplasty', price: 6000, germanyPrice: 18000, turkeyPrice: 3500, savings: 12000, turkeyComparison: '+German MD' }
    ]
  },
  {
    category: 'Anti-Aging & Longevity',
    icon: 'clock',
    procedures: [
      { name: 'Stem Cell Therapy', price: 12500, germanyPrice: 35000, turkeyPrice: 8000, savings: 22500, turkeyComparison: '+German MD' },
      { name: 'PRP Therapy', price: 2200, germanyPrice: 8000, turkeyPrice: 800, savings: 5800, turkeyComparison: '+German MD' },
      { name: 'Hormone Optimization', price: 4000, germanyPrice: 12000, turkeyPrice: 2500, savings: 8000, turkeyComparison: '+German MD' }
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - SelectCareOS™ | German Select Medical Tourism</title>
    <meta name="description" content="German-quality healthcare in Egypt. German trained surgeons, Red Sea recovery, complete digital guidance. Save up to 70% compared to German hospitals.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #F8F6F0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
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
        
        .gradient-hero {
            background: linear-gradient(135deg, var(--navy) 0%, #001530 50%, #002040 100%);
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
        }
        
        .card:hover {
            box-shadow: 0 8px 30px rgba(0, 31, 63, 0.12);
            transform: translateY(-2px);
            transition: all 0.3s ease;
        }
        
        .card-gold {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
            border-radius: 16px;
        }
        
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
            text-decoration: none;
        }
        
        .btn-gold:hover {
            background: #B8922A;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(201, 162, 39, 0.4);
        }
        
        .btn-navy {
            background: var(--navy);
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
            text-decoration: none;
        }
        
        .btn-navy:hover {
            background: var(--navy-light);
            transform: translateY(-2px);
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--gold);
            color: var(--gold);
            padding: 12px 26px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
            text-decoration: none;
        }
        
        .btn-outline:hover {
            background: var(--gold);
            color: var(--navy);
        }
        
        .btn-outline-white {
            background: transparent;
            border: 2px solid white;
            color: white;
            padding: 12px 26px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
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
            background: var(--gold);
            color: var(--navy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            position: relative;
            z-index: 10;
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
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
            position: relative;
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
            background: var(--navy);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
            display: inline-block;
        }
        
        .savings-tag {
            background: #22C55E;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
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
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
        }
        .bottom-nav .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            color: #9CA3AF;
            font-size: 10px;
            text-decoration: none;
            transition: all 0.2s;
        }
        .bottom-nav .nav-item:hover { color: #6B7280; }
        .bottom-nav .nav-item.active { color: var(--gold); }
        .bottom-nav .nav-item i { font-size: 22px; margin-bottom: 4px; }
        main { padding-bottom: 100px; }
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

    <!-- Treatment Procedures & Pricing -->
    <section class="py-20 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <span class="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    <i class="fas fa-procedures mr-2"></i>Procedures
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
                    Treatment Procedures & Savings
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    Compare our prices with German hospitals - save up to 70%
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                ${TREATMENT_PROCEDURES.map(category => `
                    <div class="card p-6">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                                <i class="fas fa-${category.icon === 'weight' ? 'weight' : category.icon === 'bone' ? 'bone' : category.icon === 'sparkles' ? 'magic' : 'clock'} text-gold text-xl"></i>
                            </div>
                            <h3 class="font-bold text-navy text-xl">${category.category}</h3>
                        </div>
                        
                        <div class="space-y-4">
                            ${category.procedures.map(proc => `
                                <div class="flex items-center justify-between p-4 bg-cream rounded-lg">
                                    <div>
                                        <p class="font-semibold text-navy">${proc.name}</p>
                                        <p class="text-xs text-gray-500 line-through">Germany: €${proc.germanyPrice.toLocaleString()}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-gold text-lg">€${proc.price.toLocaleString()}</p>
                                        <span class="savings-tag text-xs">
                                            Save €${proc.savings.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

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
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/services" class="nav-item active">
                <i class="fas fa-concierge-bell"></i>
                <span>Services</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/subscription" class="nav-item">
                <i class="fas fa-crown"></i>
                <span>Plans</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`;
