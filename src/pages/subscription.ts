/**
 * SelectCareOS™ Premium Subscription Tiers
 * World-Class Monetization with Tiered Access
 */

export const SUBSCRIPTION_TIERS = {
  free: {
    id: 'free',
    name: 'SelectCare Free',
    price: 0,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Basic Health Dashboard',
      'Limited AI Health Tips (5/month)',
      'Community Support Forum',
      'Health Articles Access',
      'Basic Symptom Checker',
    ],
    limits: {
      consultations: 0,
      aiQueries: 5,
      deviceConnections: 1,
      familyMembers: 0,
      storageGB: 0.5,
    },
    cta: 'Get Started Free',
    popular: false,
  },
  basic: {
    id: 'basic',
    name: 'SelectCare Basic',
    price: 29,
    originalPrice: 49,
    currency: 'EUR',
    interval: 'month',
    annualPrice: 290,
    savings: 58,
    features: [
      'Everything in Free',
      '2 Video Consultations/month',
      'AI Health Assistant (50 queries)',
      'Connect 3 Health Devices',
      'Medication Reminders',
      'Basic Health Reports',
      'Email Support (48h)',
      '5GB Secure Storage',
    ],
    limits: {
      consultations: 2,
      aiQueries: 50,
      deviceConnections: 3,
      familyMembers: 0,
      storageGB: 5,
    },
    cta: 'Start Basic Plan',
    popular: false,
  },
  plus: {
    id: 'plus',
    name: 'SelectCare Plus',
    price: 79,
    originalPrice: 129,
    currency: 'EUR',
    interval: 'month',
    annualPrice: 790,
    savings: 158,
    features: [
      'Everything in Basic',
      '5 Video Consultations/month',
      'Unlimited AI Health Concierge',
      'Connect Unlimited Devices',
      'Family Plan (up to 4 members)',
      'Priority Doctor Matching',
      'Advanced Health Analytics',
      'Second Opinion Service',
      'Prescription Management',
      'Priority Support (4h)',
      '25GB Secure Storage',
      'SelectPoints 2x Earning',
    ],
    limits: {
      consultations: 5,
      aiQueries: -1, // unlimited
      deviceConnections: -1,
      familyMembers: 4,
      storageGB: 25,
    },
    cta: 'Upgrade to Plus',
    popular: true,
    badge: 'MOST POPULAR',
  },
  elite: {
    id: 'elite',
    name: 'SelectCare Elite',
    price: 199,
    originalPrice: 349,
    currency: 'EUR',
    interval: 'month',
    annualPrice: 1990,
    savings: 398,
    features: [
      'Everything in Plus',
      'Unlimited Video Consultations',
      'Dedicated Care Manager',
      '24/7 Emergency Hotline',
      'VIP Doctor Access',
      'Global Second Opinions',
      'Concierge Travel Planning',
      'Premium Health Retreats (10% off)',
      'Executive Health Screening',
      'Genetic Testing Discounts',
      'Mental Wellness Programs',
      'White-Glove Support (1h)',
      '100GB Secure Storage',
      'SelectPoints 5x Earning',
      'Exclusive Member Events',
    ],
    limits: {
      consultations: -1,
      aiQueries: -1,
      deviceConnections: -1,
      familyMembers: 8,
      storageGB: 100,
    },
    cta: 'Go Elite',
    popular: false,
    badge: 'BEST VALUE',
  },
  enterprise: {
    id: 'enterprise',
    name: 'SelectCare Enterprise',
    price: null,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Everything in Elite',
      'Custom API Integration',
      'Dedicated Account Team',
      'Custom Reporting & Analytics',
      'White-Label Options',
      'HIPAA/GDPR Compliance Tools',
      'Employee Wellness Programs',
      'Bulk Licensing Discounts',
      'On-site Health Events',
      'SLA Guarantees',
    ],
    limits: {
      consultations: -1,
      aiQueries: -1,
      deviceConnections: -1,
      familyMembers: -1,
      storageGB: -1,
    },
    cta: 'Contact Sales',
    popular: false,
    badge: 'ENTERPRISE',
  },
};

export const subscriptionPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Plans - SelectCareOS™</title>
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
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--cream); }
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .gradient-navy { background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%); }
        .card { background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 31, 63, 0.1); transition: all 0.3s; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0, 31, 63, 0.15); }
        .card-popular { border: 3px solid var(--gold); position: relative; }
        .card-popular::before { content: 'MOST POPULAR'; position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--gold); color: var(--navy); padding: 4px 20px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .btn-gold { background: var(--gold); color: var(--navy); padding: 14px 32px; border-radius: 12px; font-weight: 600; transition: all 0.2s; }
        .btn-gold:hover { background: #B8922A; transform: scale(1.02); }
        .btn-navy { background: var(--navy); color: white; padding: 14px 32px; border-radius: 12px; font-weight: 600; }
        .price-strike { text-decoration: line-through; opacity: 0.5; }
        .toggle-btn { transition: all 0.3s; }
        .toggle-btn.active { background: var(--gold); color: var(--navy); }
        .feature-check { color: #22C55E; }
        .savings-badge { background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .float-animation { animation: float 3s ease-in-out infinite; }
        
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
    </style>
</head>
<body class="min-h-screen">
    <!-- Header -->
    <header class="gradient-navy px-6 pt-16 pb-24 text-center">
        <a href="/" class="text-gold mb-6 inline-block"><i class="fas fa-arrow-left mr-2"></i>Back to Dashboard</a>
        <h1 class="text-white text-4xl font-bold mb-4">Choose Your Health Journey</h1>
        <p class="text-gold text-xl mb-8">German Medical Excellence at Your Fingertips</p>
        
        <!-- Billing Toggle -->
        <div class="inline-flex bg-white/10 rounded-full p-1">
            <button id="monthlyBtn" class="toggle-btn active px-6 py-2 rounded-full text-white font-medium" onclick="toggleBilling('monthly')">Monthly</button>
            <button id="annualBtn" class="toggle-btn px-6 py-2 rounded-full text-white font-medium" onclick="toggleBilling('annual')">
                Annual <span class="savings-badge ml-2">Save 20%</span>
            </button>
        </div>
    </header>
    
    <!-- Pricing Cards -->
    <main class="max-w-7xl mx-auto px-6 -mt-16 pb-20">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Free Tier -->
            <div class="card p-6">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-navy">Free</h3>
                    <div class="mt-4">
                        <span class="text-4xl font-bold text-navy">€0</span>
                        <span class="text-gray-500">/month</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Get started with basics</p>
                </div>
                
                <ul class="space-y-3 mb-6">
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Basic Health Dashboard</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>5 AI Health Tips/month</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Community Forum</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Health Articles</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Basic Symptom Checker</li>
                </ul>
                
                <button class="w-full btn-navy">Get Started Free</button>
            </div>
            
            <!-- Basic Tier -->
            <div class="card p-6">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-navy">Basic</h3>
                    <div class="mt-4">
                        <span class="price-strike text-gray-400 text-lg">€49</span>
                        <span class="text-4xl font-bold text-navy ml-2 monthly-price">€29</span>
                        <span class="text-4xl font-bold text-navy ml-2 annual-price hidden">€24</span>
                        <span class="text-gray-500">/month</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Perfect for individuals</p>
                </div>
                
                <ul class="space-y-3 mb-6">
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>2 Video Consultations/mo</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>50 AI Queries/month</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>3 Device Connections</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Medication Reminders</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Basic Health Reports</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>5GB Secure Storage</li>
                </ul>
                
                <button class="w-full btn-gold">Start Basic Plan</button>
            </div>
            
            <!-- Plus Tier (Popular) -->
            <div class="card card-popular p-6 pt-8">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-gold">Plus</h3>
                    <div class="mt-4">
                        <span class="price-strike text-gray-400 text-lg">€129</span>
                        <span class="text-4xl font-bold text-navy ml-2 monthly-price">€79</span>
                        <span class="text-4xl font-bold text-navy ml-2 annual-price hidden">€66</span>
                        <span class="text-gray-500">/month</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Best for families</p>
                </div>
                
                <ul class="space-y-3 mb-6">
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>5 Video Consultations/mo</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i><strong>Unlimited</strong> AI Concierge</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Unlimited Devices</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Family Plan (4 members)</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Priority Doctor Matching</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Second Opinion Service</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>Advanced Analytics</li>
                    <li class="flex items-center text-sm"><i class="fas fa-check feature-check mr-3"></i>SelectPoints 2x</li>
                </ul>
                
                <button class="w-full btn-gold">Upgrade to Plus</button>
            </div>
            
            <!-- Elite Tier -->
            <div class="card p-6 bg-navy text-white">
                <div class="absolute top-4 right-4">
                    <span class="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
                </div>
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-gold">Elite</h3>
                    <div class="mt-4">
                        <span class="price-strike text-gray-400 text-lg">€349</span>
                        <span class="text-4xl font-bold text-white ml-2 monthly-price">€199</span>
                        <span class="text-4xl font-bold text-white ml-2 annual-price hidden">€166</span>
                        <span class="text-gray-300">/month</span>
                    </div>
                    <p class="text-sm text-gray-300 mt-2">Ultimate care experience</p>
                </div>
                
                <ul class="space-y-3 mb-6">
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i><strong>Unlimited</strong> Consultations</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>Dedicated Care Manager</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>24/7 Emergency Hotline</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>VIP Doctor Access</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>Global Second Opinions</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>Concierge Travel Planning</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>Premium Retreat Discounts</li>
                    <li class="flex items-center text-sm text-white"><i class="fas fa-crown text-gold mr-3"></i>SelectPoints 5x</li>
                </ul>
                
                <button class="w-full bg-gold text-navy py-3 rounded-xl font-bold hover:bg-yellow-400 transition">Go Elite</button>
            </div>
        </div>
        
        <!-- Enterprise CTA -->
        <div class="mt-12 card p-8 text-center bg-gradient-to-r from-navy to-blue-900 text-white">
            <div class="flex items-center justify-center gap-8 flex-wrap">
                <div>
                    <h3 class="text-2xl font-bold mb-2">Enterprise Solutions</h3>
                    <p class="text-gray-300">Custom health programs for organizations of 50+ employees</p>
                </div>
                <button class="btn-gold">
                    <i class="fas fa-building mr-2"></i>Contact Sales
                </button>
            </div>
        </div>
        
        <!-- Trust Badges -->
        <div class="mt-16 text-center">
            <p class="text-gray-500 mb-6">Trusted by leading organizations</p>
            <div class="flex justify-center items-center gap-12 flex-wrap opacity-50">
                <span class="text-2xl font-bold text-navy">JCI Accredited</span>
                <span class="text-2xl font-bold text-navy">GDPR Compliant</span>
                <span class="text-2xl font-bold text-navy">ISO 13485</span>
                <span class="text-2xl font-bold text-navy">TEMOS Certified</span>
            </div>
        </div>
        
        <!-- FAQ Section -->
        <div class="mt-16">
            <h2 class="text-2xl font-bold text-navy text-center mb-8">Frequently Asked Questions</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="card p-6">
                    <h4 class="font-bold text-navy mb-2">Can I cancel anytime?</h4>
                    <p class="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
                </div>
                <div class="card p-6">
                    <h4 class="font-bold text-navy mb-2">How do family plans work?</h4>
                    <p class="text-gray-600 text-sm">Plus and Elite plans include family members. Each member gets their own profile with full access to plan features.</p>
                </div>
                <div class="card p-6">
                    <h4 class="font-bold text-navy mb-2">What are SelectPoints?</h4>
                    <p class="text-gray-600 text-sm">Earn points for healthy activities, completing checkups, and engagement. Redeem for consultations, products, and exclusive rewards.</p>
                </div>
                <div class="card p-6">
                    <h4 class="font-bold text-navy mb-2">Is my data secure?</h4>
                    <p class="text-gray-600 text-sm">Absolutely. We use bank-level encryption, are GDPR compliant, and never sell your health data. Your privacy is our priority.</p>
                </div>
            </div>
        </div>
    </main>
    
    <script>
        function toggleBilling(type) {
            const monthlyBtn = document.getElementById('monthlyBtn');
            const annualBtn = document.getElementById('annualBtn');
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const annualPrices = document.querySelectorAll('.annual-price');
            
            if (type === 'annual') {
                monthlyBtn.classList.remove('active');
                annualBtn.classList.add('active');
                monthlyPrices.forEach(el => el.classList.add('hidden'));
                annualPrices.forEach(el => el.classList.remove('hidden'));
            } else {
                monthlyBtn.classList.add('active');
                annualBtn.classList.remove('active');
                monthlyPrices.forEach(el => el.classList.remove('hidden'));
                annualPrices.forEach(el => el.classList.add('hidden'));
            }
        }
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/subscription" class="nav-item active">
                <i class="fas fa-crown"></i>
                <span>Plans</span>
            </a>
            <a href="/marketplace" class="nav-item">
                <i class="fas fa-store"></i>
                <span>Shop</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>
`;
