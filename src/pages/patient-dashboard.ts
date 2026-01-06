/**
 * SelectCareOS™ Patient Dashboard
 * Comprehensive health monitoring, calculators, and journey tracking
 * Inspired by SurgeryBridge design with enhanced health tools
 */

// ============================================================================
// HEALTH CALCULATORS DATA
// ============================================================================

export const HEALTH_CALCULATORS = {
  bmi: {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your weight category',
    icon: 'fa-weight',
    formula: 'weight (kg) / height² (m)',
    categories: [
      { range: '< 18.5', category: 'Underweight', color: '#3B82F6', risk: 'Nutritional deficiency risk' },
      { range: '18.5 - 24.9', category: 'Normal', color: '#10B981', risk: 'Healthy weight range' },
      { range: '25 - 29.9', category: 'Overweight', color: '#F59E0B', risk: 'Increased health risks' },
      { range: '30 - 34.9', category: 'Obese Class I', color: '#EF4444', risk: 'Moderate health risks' },
      { range: '35 - 39.9', category: 'Obese Class II', color: '#DC2626', risk: 'Severe health risks' },
      { range: '≥ 40', category: 'Obese Class III', color: '#991B1B', risk: 'Very severe health risks - Surgery recommended' }
    ]
  },
  bodyFat: {
    id: 'body-fat',
    name: 'Body Fat Estimator',
    description: 'Estimate your body fat percentage using the U.S. Navy method',
    icon: 'fa-percent',
    formula: 'Navy Method: 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450',
    categories: {
      male: [
        { range: '2-5%', category: 'Essential Fat', color: '#3B82F6' },
        { range: '6-13%', category: 'Athletes', color: '#10B981' },
        { range: '14-17%', category: 'Fitness', color: '#22C55E' },
        { range: '18-24%', category: 'Average', color: '#F59E0B' },
        { range: '25%+', category: 'Obese', color: '#EF4444' }
      ],
      female: [
        { range: '10-13%', category: 'Essential Fat', color: '#3B82F6' },
        { range: '14-20%', category: 'Athletes', color: '#10B981' },
        { range: '21-24%', category: 'Fitness', color: '#22C55E' },
        { range: '25-31%', category: 'Average', color: '#F59E0B' },
        { range: '32%+', category: 'Obese', color: '#EF4444' }
      ]
    }
  },
  anesthesiaRisk: {
    id: 'asa-score',
    name: 'Anesthesia Risk Assessment',
    description: 'ASA Physical Status Classification for surgical risk',
    icon: 'fa-hospital',
    classifications: [
      { class: 'ASA I', description: 'Normal healthy patient', risk: 'Very Low', mortality: '0.1%', color: '#10B981' },
      { class: 'ASA II', description: 'Mild systemic disease (controlled diabetes, mild hypertension, obesity)', risk: 'Low', mortality: '0.2%', color: '#22C55E' },
      { class: 'ASA III', description: 'Severe systemic disease (poorly controlled diabetes, COPD, morbid obesity)', risk: 'Moderate', mortality: '1.8%', color: '#F59E0B' },
      { class: 'ASA IV', description: 'Severe life-threatening disease (recent MI, stroke, sepsis)', risk: 'High', mortality: '7.8%', color: '#EF4444' },
      { class: 'ASA V', description: 'Moribund patient not expected to survive without surgery', risk: 'Very High', mortality: '9.4%', color: '#991B1B' }
    ]
  },
  recoveryTime: {
    id: 'recovery',
    name: 'Recovery Time Estimator',
    description: 'Estimate your surgical recovery timeline based on procedure and health factors',
    icon: 'fa-calendar-check',
    procedures: [
      { name: 'Gastric Sleeve', baseRecovery: 14, fullRecovery: 42, factors: ['age', 'bmi', 'comorbidities'] },
      { name: 'Gastric Bypass', baseRecovery: 21, fullRecovery: 56, factors: ['age', 'bmi', 'comorbidities', 'revision'] },
      { name: 'Knee Replacement', baseRecovery: 42, fullRecovery: 180, factors: ['age', 'activity', 'physio'] },
      { name: 'Hip Replacement', baseRecovery: 42, fullRecovery: 180, factors: ['age', 'activity', 'physio'] },
      { name: 'Facelift', baseRecovery: 14, fullRecovery: 56, factors: ['age', 'smoking'] },
      { name: 'Rhinoplasty', baseRecovery: 10, fullRecovery: 365, factors: ['age', 'revision'] },
      { name: 'Tummy Tuck', baseRecovery: 21, fullRecovery: 84, factors: ['age', 'bmi', 'combined'] }
    ]
  },
  costSavings: {
    id: 'cost-savings',
    name: 'Cost & Savings Calculator',
    description: 'Compare treatment costs between Germany, Turkey, and German Select',
    icon: 'fa-euro-sign'
  },
  idealWeight: {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight using multiple formulas',
    icon: 'fa-bullseye',
    formulas: [
      { name: 'Devine', description: 'Most commonly used in clinical settings' },
      { name: 'Robinson', description: 'Based on Metropolitan Life tables' },
      { name: 'Miller', description: 'Adjusted for larger body frames' },
      { name: 'Hamwi', description: 'Used for medication dosing' }
    ]
  },
  calorieCalculator: {
    id: 'calorie-tdee',
    name: 'Calorie & TDEE Calculator',
    description: 'Calculate daily calorie needs using science-backed BMR and TDEE formulas',
    icon: 'fa-fire-alt',
    formulas: [
      { 
        name: 'Mifflin-St Jeor', 
        description: 'Most accurate for general population (1990)',
        male: 'BMR = (10 × weight kg) + (6.25 × height cm) – (5 × age) + 5',
        female: 'BMR = (10 × weight kg) + (6.25 × height cm) – (5 × age) – 161'
      },
      { 
        name: 'Harris-Benedict', 
        description: 'Classic formula revised in 1984',
        male: 'BMR = 88.362 + (13.397 × weight) + (4.799 × height) – (5.677 × age)',
        female: 'BMR = 447.593 + (9.247 × weight) + (3.098 × height) – (4.330 × age)'
      },
      { 
        name: 'Katch-McArdle', 
        description: 'Best for lean individuals with known body fat %',
        formula: 'BMR = 370 + (21.6 × Lean Body Mass kg)'
      }
    ],
    activityMultipliers: [
      { level: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
      { level: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
      { level: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
      { level: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
      { level: 'Extremely Active', multiplier: 1.9, description: 'Very hard exercise, physical job' }
    ],
    macroRatios: {
      balanced: { protein: 30, carbs: 40, fat: 30 },
      lowCarb: { protein: 40, carbs: 20, fat: 40 },
      highProtein: { protein: 40, carbs: 35, fat: 25 }
    }
  }
}

// ============================================================================
// PATIENT JOURNEY DATA
// ============================================================================

export const PATIENT_JOURNEY = {
  phases: [
    {
      id: 'discovery',
      name: 'Discovery & Consultation',
      duration: '1-2 weeks',
      icon: 'fa-search',
      status: 'completed',
      tasks: [
        { name: 'Initial Inquiry', status: 'completed' },
        { name: 'Free Video Consultation', status: 'completed' },
        { name: 'Medical History Review', status: 'completed' },
        { name: 'Treatment Recommendations', status: 'completed' }
      ]
    },
    {
      id: 'preparation',
      name: 'Virtual Preparation',
      duration: '4-12 weeks',
      icon: 'fa-clipboard-list',
      status: 'in_progress',
      tasks: [
        { name: 'Medical Assessments', status: 'completed' },
        { name: 'Lab Tests & Imaging', status: 'completed' },
        { name: 'Health Optimization', status: 'in_progress' },
        { name: 'IoT Device Setup', status: 'completed' },
        { name: 'Pre-Op Documentation', status: 'pending' },
        { name: 'Travel Planning', status: 'pending' }
      ]
    },
    {
      id: 'travel',
      name: 'Travel to Hurghada',
      duration: '1 day',
      icon: 'fa-plane',
      status: 'pending',
      tasks: [
        { name: 'VIP Airport Reception', status: 'pending' },
        { name: 'Luxury Transfer to Resort', status: 'pending' },
        { name: 'Resort Check-in', status: 'pending' },
        { name: 'Pre-Op Consultation', status: 'pending' }
      ]
    },
    {
      id: 'surgery',
      name: 'Surgery & Hospital Stay',
      duration: '2-7 days',
      icon: 'fa-hospital',
      status: 'pending',
      tasks: [
        { name: 'Final Pre-Op Assessment', status: 'pending' },
        { name: 'Surgery Day', status: 'pending' },
        { name: 'Hospital Recovery', status: 'pending' },
        { name: 'Post-Op Evaluation', status: 'pending' }
      ]
    },
    {
      id: 'recovery',
      name: 'Red Sea Recovery',
      duration: '7-21 days',
      icon: 'fa-umbrella-beach',
      status: 'pending',
      tasks: [
        { name: 'Resort Transfer', status: 'pending' },
        { name: 'Daily Medical Checks', status: 'pending' },
        { name: 'Spa & Wellness Sessions', status: 'pending' },
        { name: 'Gentle Activities', status: 'pending' },
        { name: 'Fit-to-Fly Assessment', status: 'pending' }
      ]
    },
    {
      id: 'followup',
      name: 'Lifetime Digital Follow-up',
      duration: 'Ongoing',
      icon: 'fa-video',
      status: 'pending',
      tasks: [
        { name: 'Monthly Video Consultations', status: 'pending' },
        { name: 'IoT Health Monitoring', status: 'pending' },
        { name: 'AI Nutrition Plans', status: 'pending' },
        { name: 'Progress Tracking', status: 'pending' }
      ]
    }
  ],
  currentPhase: 'preparation',
  overallProgress: 35
}

// ============================================================================
// HEALTH METRICS DATA
// ============================================================================

export const HEALTH_METRICS_CONFIG = {
  vitals: [
    { id: 'heart_rate', name: 'Heart Rate', unit: 'bpm', icon: 'fa-heartbeat', color: '#EF4444', normalRange: { min: 60, max: 100 } },
    { id: 'blood_pressure', name: 'Blood Pressure', unit: 'mmHg', icon: 'fa-heart', color: '#3B82F6', normalRange: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } } },
    { id: 'oxygen', name: 'SpO2', unit: '%', icon: 'fa-lungs', color: '#10B981', normalRange: { min: 95, max: 100 } },
    { id: 'temperature', name: 'Temperature', unit: '°C', icon: 'fa-thermometer-half', color: '#F59E0B', normalRange: { min: 36.1, max: 37.2 } }
  ],
  tracking: [
    { id: 'weight', name: 'Weight', unit: 'kg', icon: 'fa-weight', color: '#8B5CF6' },
    { id: 'steps', name: 'Steps', unit: 'steps', icon: 'fa-walking', color: '#22C55E' },
    { id: 'water', name: 'Water Intake', unit: 'ml', icon: 'fa-tint', color: '#06B6D4' },
    { id: 'sleep', name: 'Sleep', unit: 'hours', icon: 'fa-moon', color: '#6366F1' },
    { id: 'calories', name: 'Calories', unit: 'kcal', icon: 'fa-fire', color: '#EF4444' },
    { id: 'protein', name: 'Protein', unit: 'g', icon: 'fa-drumstick-bite', color: '#F97316' }
  ]
}

// ============================================================================
// DASHBOARD PAGE HTML
// ============================================================================

export const patientDashboardPage = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard - SelectCareOS™</title>
    <meta name="description" content="Your personalized health dashboard with calculators, journey tracking, and real-time vitals monitoring.">
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
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            min-height: 100vh;
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
        
        .gradient-navy {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
        }
        
        .gradient-gold {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
        }
        
        .calculator-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .calculator-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 31, 63, 0.15);
        }
        
        .metric-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            transition: all 0.2s;
        }
        
        .metric-card:hover {
            background: var(--cream);
        }
        
        .progress-ring {
            transform: rotate(-90deg);
        }
        
        .progress-ring-circle {
            transition: stroke-dashoffset 0.5s ease;
        }
        
        .timeline-connector {
            position: absolute;
            left: 20px;
            top: 40px;
            bottom: -20px;
            width: 2px;
            background: linear-gradient(180deg, var(--gold) 0%, var(--gold-light) 100%);
        }
        
        .phase-dot {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            z-index: 10;
        }
        
        .phase-completed { background: #10B981; color: white; }
        .phase-in-progress { background: var(--gold); color: var(--navy); animation: pulse 2s infinite; }
        .phase-pending { background: #E5E7EB; color: #9CA3AF; }
        
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(201, 162, 39, 0); }
        }
        
        .tab-button {
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .tab-button.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .tab-button:not(.active) {
            background: transparent;
            color: white;
        }
        
        .gauge-container {
            position: relative;
            width: 200px;
            height: 120px;
            margin: 0 auto;
        }
        
        .gauge-bg {
            fill: none;
            stroke: #E5E7EB;
            stroke-width: 20;
        }
        
        .gauge-fill {
            fill: none;
            stroke-width: 20;
            stroke-linecap: round;
            transition: stroke-dashoffset 0.5s ease;
        }
        
        .input-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.2s;
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.2);
        }
        
        .btn-primary {
            background: var(--gold);
            color: var(--navy);
            padding: 14px 28px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background: #B8922B;
            transform: scale(1.02);
        }
        
        .btn-secondary {
            background: var(--navy);
            color: white;
            padding: 14px 28px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 31, 63, 0.7);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 24px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .risk-low { background: #DCFCE7; color: #166534; }
        .risk-moderate { background: #FEF3C7; color: #92400E; }
        .risk-high { background: #FEE2E2; color: #991B1B; }
        
        .status-completed { background: #DCFCE7; color: #166534; }
        .status-in-progress { background: var(--gold-light); color: var(--navy); }
        .status-pending { background: #F3F4F6; color: #6B7280; }
        
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
<body class="bg-cream">
    <!-- Header -->
    <header class="gradient-navy">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-2xl font-bold text-white">
                        SelectCare<span class="text-gold">OS</span>™
                    </a>
                    <span class="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full">Patient Portal</span>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                        <i class="fas fa-bell"></i>
                    </button>
                    <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                        <i class="fas fa-cog"></i>
                    </button>
                    <div class="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy font-bold">
                        JD
                    </div>
                </div>
            </div>
            
            <!-- Tab Navigation -->
            <div class="flex space-x-2 mt-6 overflow-x-auto pb-2">
                <button class="tab-button active" onclick="showTab('overview')">
                    <i class="fas fa-home mr-2"></i>Overview
                </button>
                <button class="tab-button" onclick="showTab('calculators')">
                    <i class="fas fa-calculator mr-2"></i>Health Calculators
                </button>
                <button class="tab-button" onclick="showTab('journey')">
                    <i class="fas fa-road mr-2"></i>My Journey
                </button>
                <button class="tab-button" onclick="showTab('vitals')">
                    <i class="fas fa-heartbeat mr-2"></i>Vitals & Metrics
                </button>
                <button class="tab-button" onclick="showTab('appointments')">
                    <i class="fas fa-calendar mr-2"></i>Appointments
                </button>
            </div>
        </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
        <!-- OVERVIEW TAB -->
        <div id="tab-overview" class="tab-content">
            <!-- Welcome Banner -->
            <div class="gradient-gold rounded-2xl p-6 mb-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-navy mb-2">Welcome back, John!</h1>
                        <p class="text-navy/80">Your next appointment is in 3 days</p>
                    </div>
                    <div class="mt-4 md:mt-0 flex items-center space-x-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-navy">35%</div>
                            <div class="text-sm text-navy/70">Journey Progress</div>
                        </div>
                        <div class="w-24 h-24">
                            <svg class="progress-ring" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,31,63,0.2)" stroke-width="8"/>
                                <circle class="progress-ring-circle" cx="50" cy="50" r="40" fill="none" stroke="var(--navy)" stroke-width="8" stroke-linecap="round" stroke-dasharray="251" stroke-dashoffset="163"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="card p-4">
                    <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-heartbeat text-red-500 text-xl"></i>
                        <span class="text-xs text-green-600 font-semibold">Normal</span>
                    </div>
                    <div class="text-2xl font-bold text-navy" id="heart-rate">72</div>
                    <div class="text-sm text-gray-500">Heart Rate (bpm)</div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-weight text-purple-500 text-xl"></i>
                        <span class="text-xs text-green-600 font-semibold">-8.4 kg</span>
                    </div>
                    <div class="text-2xl font-bold text-navy">82.4</div>
                    <div class="text-sm text-gray-500">Weight (kg)</div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-walking text-green-500 text-xl"></i>
                        <span class="text-xs text-yellow-600 font-semibold">70%</span>
                    </div>
                    <div class="text-2xl font-bold text-navy" id="steps-today">5,240</div>
                    <div class="text-sm text-gray-500">Steps Today</div>
                </div>
                <div class="card p-4">
                    <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-lungs text-blue-500 text-xl"></i>
                        <span class="text-xs text-green-600 font-semibold">Optimal</span>
                    </div>
                    <div class="text-2xl font-bold text-navy">98%</div>
                    <div class="text-sm text-gray-500">SpO2</div>
                </div>
            </div>
            
            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Current Phase -->
                    <div class="card p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-navy">
                                <i class="fas fa-clipboard-list text-gold mr-2"></i>
                                Current Phase: Virtual Preparation
                            </h2>
                            <span class="px-3 py-1 bg-gold-light text-navy text-sm font-semibold rounded-full">Week 6 of 12</span>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>Medical Assessments</span>
                                </div>
                                <span class="text-green-600 text-sm font-semibold">Completed</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>Lab Tests & Imaging</span>
                                </div>
                                <span class="text-green-600 text-sm font-semibold">Completed</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gold-light rounded-lg">
                                <div class="flex items-center">
                                    <i class="fas fa-spinner fa-spin text-gold mr-3"></i>
                                    <span>Health Optimization Program</span>
                                </div>
                                <span class="text-navy text-sm font-semibold">In Progress (Week 4/8)</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center">
                                    <i class="fas fa-circle text-gray-300 mr-3"></i>
                                    <span>Pre-Op Documentation</span>
                                </div>
                                <span class="text-gray-500 text-sm">Pending</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Health Calculators Quick Access -->
                    <div class="card p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-navy">
                                <i class="fas fa-calculator text-gold mr-2"></i>
                                Health Calculators
                            </h2>
                            <button onclick="showTab('calculators')" class="text-gold font-semibold text-sm">View All →</button>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('bmi')">
                                <i class="fas fa-weight text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">BMI</div>
                                <div class="text-xs text-gray-500">Body Mass Index</div>
                            </div>
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('body-fat')">
                                <i class="fas fa-percent text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">Body Fat</div>
                                <div class="text-xs text-gray-500">Fat Percentage</div>
                            </div>
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('asa')">
                                <i class="fas fa-hospital text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">ASA Risk</div>
                                <div class="text-xs text-gray-500">Anesthesia Risk</div>
                            </div>
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('recovery')">
                                <i class="fas fa-calendar-check text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">Recovery</div>
                                <div class="text-xs text-gray-500">Time Estimate</div>
                            </div>
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('cost')">
                                <i class="fas fa-euro-sign text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">Savings</div>
                                <div class="text-xs text-gray-500">Cost Calculator</div>
                            </div>
                            <div class="calculator-card p-4 bg-cream rounded-xl text-center" onclick="openCalculator('ideal-weight')">
                                <i class="fas fa-bullseye text-3xl text-navy mb-2"></i>
                                <div class="font-semibold text-navy">Ideal Weight</div>
                                <div class="text-xs text-gray-500">Goal Setting</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- AI Insights -->
                    <div class="card p-6 border-l-4 border-gold">
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-robot text-navy text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-navy mb-2">AI Health Insight</h3>
                                <p class="text-gray-600 mb-3">Based on your recent data, your cardiovascular health is improving. Your resting heart rate has decreased by 5 bpm over the past 2 weeks, indicating better fitness. Consider increasing your daily steps to 7,500 for optimal pre-surgical conditioning.</p>
                                <div class="flex items-center space-x-4">
                                    <button onclick="window.location.href='/medisense'" class="text-gold font-semibold text-sm hover:text-navy transition-colors">View Full Analysis →</button>
                                    <span class="text-xs text-gray-400">Updated 2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column -->
                <div class="space-y-6">
                    <!-- Upcoming Appointments -->
                    <div class="card p-6">
                        <h2 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-calendar text-gold mr-2"></i>
                            Upcoming Appointments
                        </h2>
                        <div class="space-y-4">
                            <div class="p-4 bg-navy rounded-xl text-white">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-gold text-xs font-semibold">NEXT APPOINTMENT</span>
                                    <span class="text-xs bg-white/20 px-2 py-1 rounded">Video Call</span>
                                </div>
                                <div class="font-bold">Cardiology Follow-up</div>
                                <div class="text-gold text-sm mb-3">Oct 22, 10:00 AM</div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy text-xs font-bold">KM</div>
                                    <div>
                                        <div class="text-sm">Dr. K. Müller</div>
                                        <div class="text-xs text-gray-300">Cardiologist</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-cream rounded-xl">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-navy text-xs font-semibold">UPCOMING</span>
                                    <span class="text-xs bg-white px-2 py-1 rounded">In Person</span>
                                </div>
                                <div class="font-bold text-navy">Nutrition Review</div>
                                <div class="text-gold text-sm mb-3">Nov 5, 2:00 PM</div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">AS</div>
                                    <div>
                                        <div class="text-sm text-navy">Dr. A. Schmidt</div>
                                        <div class="text-xs text-gray-500">Nutritionist</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="w-full mt-4 py-3 border-2 border-gold text-gold rounded-xl font-semibold hover:bg-gold hover:text-navy transition">
                            Book New Appointment
                        </button>
                    </div>
                    
                    <!-- Care Team -->
                    <div class="card p-6">
                        <h2 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-user-md text-gold mr-2"></i>
                            Your Care Team
                        </h2>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3 p-3 bg-cream rounded-xl">
                                <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold">HF</div>
                                <div class="flex-1">
                                    <div class="font-semibold text-navy">Dr. H. Fischer</div>
                                    <div class="text-xs text-gray-500">Lead Surgeon</div>
                                </div>
                                <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy">
                                    <i class="fas fa-comment text-sm"></i>
                                </button>
                            </div>
                            <div class="flex items-center space-x-3 p-3 bg-cream rounded-xl">
                                <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold">AS</div>
                                <div class="flex-1">
                                    <div class="font-semibold text-navy">Dr. A. Schmidt</div>
                                    <div class="text-xs text-gray-500">Nutritionist</div>
                                </div>
                                <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy">
                                    <i class="fas fa-comment text-sm"></i>
                                </button>
                            </div>
                            <div class="flex items-center space-x-3 p-3 bg-cream rounded-xl">
                                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy text-sm font-bold">CC</div>
                                <div class="flex-1">
                                    <div class="font-semibold text-navy">Sarah M.</div>
                                    <div class="text-xs text-gray-500">Care Coordinator</div>
                                </div>
                                <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy">
                                    <i class="fas fa-comment text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="card p-6">
                        <h2 class="text-lg font-bold text-navy mb-4">Quick Actions</h2>
                        <div class="grid grid-cols-2 gap-3">
                            <button class="p-4 bg-cream rounded-xl text-center hover:bg-gold-light transition">
                                <i class="fas fa-video text-navy text-xl mb-2"></i>
                                <div class="text-sm font-semibold text-navy">Video Call</div>
                            </button>
                            <button class="p-4 bg-cream rounded-xl text-center hover:bg-gold-light transition">
                                <i class="fas fa-file-medical text-navy text-xl mb-2"></i>
                                <div class="text-sm font-semibold text-navy">Documents</div>
                            </button>
                            <button class="p-4 bg-cream rounded-xl text-center hover:bg-gold-light transition">
                                <i class="fas fa-pills text-navy text-xl mb-2"></i>
                                <div class="text-sm font-semibold text-navy">Medications</div>
                            </button>
                            <button class="p-4 bg-cream rounded-xl text-center hover:bg-gold-light transition">
                                <i class="fas fa-utensils text-navy text-xl mb-2"></i>
                                <div class="text-sm font-semibold text-navy">Meal Plan</div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Health App Integration -->
                    <div class="card p-6">
                        <h2 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-heartbeat text-gold mr-2"></i>
                            Health App Sync
                        </h2>
                        
                        <div id="health-providers-status" class="mb-4">
                            <p class="text-sm text-gray-500">No health apps connected</p>
                        </div>
                        
                        <div class="space-y-2">
                            <button onclick="connectHealthProvider('apple_health')" class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                        <i class="fab fa-apple text-white"></i>
                                    </div>
                                    <span class="font-medium text-navy">Apple Health</span>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                            
                            <button onclick="connectHealthProvider('google_fit')" class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <i class="fab fa-google text-white"></i>
                                    </div>
                                    <span class="font-medium text-navy">Google Fit</span>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                            
                            <button onclick="connectHealthProvider('fitbit')" class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-heartbeat text-white"></i>
                                    </div>
                                    <span class="font-medium text-navy">Fitbit</span>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                            
                            <button onclick="connectHealthProvider('garmin')" class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-watch text-white"></i>
                                    </div>
                                    <span class="font-medium text-navy">Garmin</span>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                        </div>
                        
                        <!-- Synced Health Data Display -->
                        <div id="synced-health-data" class="mt-4 grid grid-cols-2 gap-3 hidden">
                            <div class="p-3 bg-blue-50 rounded-lg text-center">
                                <div class="text-xl font-bold text-blue-600" id="health-steps">--</div>
                                <div class="text-xs text-gray-500">Steps Today</div>
                            </div>
                            <div class="p-3 bg-red-50 rounded-lg text-center">
                                <div class="text-xl font-bold text-red-600"><span id="health-heart-rate">--</span> bpm</div>
                                <div class="text-xs text-gray-500">Heart Rate</div>
                            </div>
                            <div class="p-3 bg-green-50 rounded-lg text-center">
                                <div class="text-xl font-bold text-green-600" id="health-weight">--</div>
                                <div class="text-xs text-gray-500">Weight</div>
                            </div>
                            <div class="p-3 bg-orange-50 rounded-lg text-center">
                                <div class="text-xl font-bold text-orange-600" id="health-calories-burned">--</div>
                                <div class="text-xs text-gray-500">Calories Burned</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- CALCULATORS TAB -->
        <div id="tab-calculators" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-calculator text-gold mr-3"></i>
                Health Calculators
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- BMI Calculator -->
                <div class="card p-6 calculator-card" id="bmi-calculator">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-weight text-blue-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Essential</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">BMI Calculator</h3>
                    <p class="text-sm text-gray-500 mb-4">Calculate your Body Mass Index</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-600">Height (cm)</label>
                            <input type="number" id="bmi-height" placeholder="175" class="input-field" oninput="calculateBMI()">
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Weight (kg)</label>
                            <input type="number" id="bmi-weight" placeholder="80" class="input-field" oninput="calculateBMI()">
                        </div>
                    </div>
                    
                    <div id="bmi-result" class="mt-4 p-4 bg-cream rounded-xl hidden">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-navy" id="bmi-value">--</div>
                            <div class="text-sm text-gray-500" id="bmi-category">--</div>
                        </div>
                        <div class="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div id="bmi-gauge" class="h-full rounded-full transition-all" style="width: 0%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-400 mt-1">
                            <span>15</span><span>20</span><span>25</span><span>30</span><span>35</span><span>40+</span>
                        </div>
                    </div>
                </div>
                
                <!-- Body Fat Calculator -->
                <div class="card p-6 calculator-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-percent text-purple-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Navy Method</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">Body Fat Estimator</h3>
                    <p class="text-sm text-gray-500 mb-4">Estimate body fat percentage</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-600">Gender</label>
                            <select id="bf-gender" class="input-field" onchange="calculateBodyFat()">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label class="text-sm text-gray-600">Height (cm)</label>
                                <input type="number" id="bf-height" placeholder="175" class="input-field" oninput="calculateBodyFat()">
                            </div>
                            <div>
                                <label class="text-sm text-gray-600">Waist (cm)</label>
                                <input type="number" id="bf-waist" placeholder="85" class="input-field" oninput="calculateBodyFat()">
                            </div>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Neck (cm)</label>
                            <input type="number" id="bf-neck" placeholder="38" class="input-field" oninput="calculateBodyFat()">
                        </div>
                        <div id="bf-hip-container" class="hidden">
                            <label class="text-sm text-gray-600">Hip (cm) - for females</label>
                            <input type="number" id="bf-hip" placeholder="95" class="input-field" oninput="calculateBodyFat()">
                        </div>
                    </div>
                    
                    <div id="bf-result" class="mt-4 p-4 bg-cream rounded-xl hidden">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-navy" id="bf-value">--</div>
                            <div class="text-sm text-gray-500" id="bf-category">--</div>
                        </div>
                    </div>
                </div>
                
                <!-- ASA Risk Calculator -->
                <div class="card p-6 calculator-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-hospital text-red-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Pre-Op</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">Anesthesia Risk (ASA)</h3>
                    <p class="text-sm text-gray-500 mb-4">Surgical risk classification</p>
                    
                    <div class="space-y-2">
                        <label class="flex items-start space-x-3 p-3 bg-cream rounded-lg cursor-pointer hover:bg-gold-light transition">
                            <input type="radio" name="asa" value="1" class="mt-1" onchange="showASAResult(1)">
                            <div>
                                <div class="font-semibold text-navy">ASA I</div>
                                <div class="text-xs text-gray-500">Normal healthy patient</div>
                            </div>
                        </label>
                        <label class="flex items-start space-x-3 p-3 bg-cream rounded-lg cursor-pointer hover:bg-gold-light transition">
                            <input type="radio" name="asa" value="2" class="mt-1" onchange="showASAResult(2)">
                            <div>
                                <div class="font-semibold text-navy">ASA II</div>
                                <div class="text-xs text-gray-500">Mild systemic disease</div>
                            </div>
                        </label>
                        <label class="flex items-start space-x-3 p-3 bg-cream rounded-lg cursor-pointer hover:bg-gold-light transition">
                            <input type="radio" name="asa" value="3" class="mt-1" onchange="showASAResult(3)">
                            <div>
                                <div class="font-semibold text-navy">ASA III</div>
                                <div class="text-xs text-gray-500">Severe systemic disease</div>
                            </div>
                        </label>
                        <label class="flex items-start space-x-3 p-3 bg-cream rounded-lg cursor-pointer hover:bg-gold-light transition">
                            <input type="radio" name="asa" value="4" class="mt-1" onchange="showASAResult(4)">
                            <div>
                                <div class="font-semibold text-navy">ASA IV</div>
                                <div class="text-xs text-gray-500">Life-threatening disease</div>
                            </div>
                        </label>
                    </div>
                    
                    <div id="asa-result" class="mt-4 p-4 rounded-xl hidden">
                        <div class="flex items-center justify-between">
                            <span class="font-semibold" id="asa-risk-level">--</span>
                            <span class="text-sm" id="asa-mortality">--</span>
                        </div>
                    </div>
                </div>
                
                <!-- Recovery Time Calculator -->
                <div class="card p-6 calculator-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-calendar-check text-green-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Planning</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">Recovery Estimator</h3>
                    <p class="text-sm text-gray-500 mb-4">Estimate your recovery timeline</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-600">Procedure</label>
                            <select id="recovery-procedure" class="input-field" onchange="calculateRecovery()">
                                <option value="">Select procedure...</option>
                                <option value="gastric-sleeve">Gastric Sleeve</option>
                                <option value="gastric-bypass">Gastric Bypass</option>
                                <option value="knee-replacement">Knee Replacement</option>
                                <option value="hip-replacement">Hip Replacement</option>
                                <option value="facelift">Facelift</option>
                                <option value="rhinoplasty">Rhinoplasty</option>
                                <option value="tummy-tuck">Tummy Tuck</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Age</label>
                            <input type="number" id="recovery-age" placeholder="45" class="input-field" oninput="calculateRecovery()">
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Current BMI</label>
                            <input type="number" id="recovery-bmi" placeholder="32" class="input-field" oninput="calculateRecovery()">
                        </div>
                    </div>
                    
                    <div id="recovery-result" class="mt-4 p-4 bg-cream rounded-xl hidden">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-navy" id="recovery-initial">--</div>
                                <div class="text-xs text-gray-500">Return to Light Activity</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gold" id="recovery-full">--</div>
                                <div class="text-xs text-gray-500">Full Recovery</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Savings Calculator -->
                <div class="card p-6 calculator-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-euro-sign text-yellow-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Savings</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">Cost Calculator</h3>
                    <p class="text-sm text-gray-500 mb-4">Compare treatment costs</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-600">Procedure</label>
                            <select id="cost-procedure" class="input-field" onchange="calculateCost()">
                                <option value="">Select procedure...</option>
                                <option value="gastric-sleeve" data-germany="22000" data-turkey="4500" data-select="7500">Gastric Sleeve</option>
                                <option value="gastric-bypass" data-germany="28000" data-turkey="6500" data-select="10500">Gastric Bypass</option>
                                <option value="knee-replacement" data-germany="40000" data-turkey="9000" data-select="13500">Knee Replacement</option>
                                <option value="hip-replacement" data-germany="45000" data-turkey="12000" data-select="15000">Hip Replacement</option>
                                <option value="facelift" data-germany="25000" data-turkey="5500" data-select="8500">Facelift</option>
                                <option value="rhinoplasty" data-germany="15000" data-turkey="3500" data-select="3200">Rhinoplasty</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Package</label>
                            <select id="cost-package" class="input-field" onchange="calculateCost()">
                                <option value="essential">SELECTCARE Essential</option>
                                <option value="plus">SELECTCARE+ Plus</option>
                                <option value="crown">SELECTCROWN Crown</option>
                            </select>
                        </div>
                    </div>
                    
                    <div id="cost-result" class="mt-4 hidden">
                        <div class="grid grid-cols-3 gap-2 text-center mb-4">
                            <div class="p-3 bg-gray-100 rounded-lg">
                                <div class="text-sm text-gray-500">Germany</div>
                                <div class="font-bold text-gray-600" id="cost-germany">€--</div>
                            </div>
                            <div class="p-3 bg-blue-100 rounded-lg">
                                <div class="text-sm text-blue-600">Turkey</div>
                                <div class="font-bold text-blue-600" id="cost-turkey">€--</div>
                            </div>
                            <div class="p-3 bg-gold-light rounded-lg">
                                <div class="text-sm text-navy">German Select</div>
                                <div class="font-bold text-navy" id="cost-select">€--</div>
                            </div>
                        </div>
                        <div class="p-4 bg-green-100 rounded-xl text-center">
                            <div class="text-green-600 text-sm">You save vs. Germany</div>
                            <div class="text-2xl font-bold text-green-600" id="cost-savings">€--</div>
                            <div class="text-xs text-green-600" id="cost-percent">(--%)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Ideal Weight Calculator -->
                <div class="card p-6 calculator-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-bullseye text-indigo-600 text-xl"></i>
                        </div>
                        <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Goal</span>
                    </div>
                    <h3 class="text-lg font-bold text-navy mb-2">Ideal Weight</h3>
                    <p class="text-sm text-gray-500 mb-4">Calculate your ideal weight range</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm text-gray-600">Gender</label>
                            <select id="ideal-gender" class="input-field" onchange="calculateIdealWeight()">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Height (cm)</label>
                            <input type="number" id="ideal-height" placeholder="175" class="input-field" oninput="calculateIdealWeight()">
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">Current Weight (kg)</label>
                            <input type="number" id="ideal-current" placeholder="90" class="input-field" oninput="calculateIdealWeight()">
                        </div>
                    </div>
                    
                    <div id="ideal-result" class="mt-4 p-4 bg-cream rounded-xl hidden">
                        <div class="text-center mb-3">
                            <div class="text-sm text-gray-500">Ideal Weight Range</div>
                            <div class="text-2xl font-bold text-navy" id="ideal-range">-- - -- kg</div>
                        </div>
                        <div class="text-center p-3 bg-white rounded-lg">
                            <div class="text-sm text-gray-500">Weight to Lose</div>
                            <div class="text-xl font-bold text-red-500" id="ideal-lose">-- kg</div>
                        </div>
                    </div>
                </div>
                
                <!-- CALORIE/TDEE CALCULATOR - Enhanced Version with Best Practices -->
                <div class="card p-6 calculator-card md:col-span-2 lg:col-span-3">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-fire-alt text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-navy">Calorie & TDEE Calculator</h3>
                                <p class="text-sm text-gray-500">Calculate your daily calorie needs using science-backed formulas</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <!-- Unit Toggle -->
                            <div class="flex items-center bg-gray-100 rounded-lg p-1">
                                <button id="unit-metric" onclick="toggleUnits('metric')" class="px-3 py-1 text-xs font-medium rounded-md bg-white text-navy shadow-sm">Metric</button>
                                <button id="unit-imperial" onclick="toggleUnits('imperial')" class="px-3 py-1 text-xs font-medium rounded-md text-gray-500">Imperial</button>
                            </div>
                            <span class="text-xs bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
                                <i class="fas fa-star mr-1"></i>Premium
                            </span>
                        </div>
                    </div>
                    
                    <!-- Validation Messages -->
                    <div id="cal-validation" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm hidden">
                        <i class="fas fa-exclamation-circle mr-2"></i>
                        <span id="cal-validation-msg">Please fill in all required fields</span>
                    </div>
                    
                    <!-- Saved Results Banner -->
                    <div id="cal-saved-banner" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm hidden">
                        <i class="fas fa-check-circle mr-2"></i>
                        Results saved! <button onclick="loadSavedCalories()" class="underline ml-2">View history</button>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- Input Section -->
                        <div class="space-y-4">
                            <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3"><i class="fas fa-user mr-2"></i>Personal Information</h4>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Age <span class="text-red-500">*</span></label>
                                        <input type="number" id="cal-age" placeholder="35" min="15" max="100" class="input-field cal-input" oninput="validateAndCalculate()">
                                        <span class="text-xs text-red-500 hidden" id="cal-age-error">15-100 years</span>
                                    </div>
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Gender</label>
                                        <select id="cal-gender" class="input-field" onchange="validateAndCalculate()">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Height <span class="text-red-500">*</span> <span id="height-unit-label">(cm)</span></label>
                                        <div class="flex gap-1" id="height-input-container">
                                            <input type="number" id="cal-height" placeholder="175" min="100" max="250" class="input-field cal-input" oninput="validateAndCalculate()">
                                        </div>
                                        <span class="text-xs text-red-500 hidden" id="cal-height-error">Invalid height</span>
                                    </div>
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Weight <span class="text-red-500">*</span> <span id="weight-unit-label">(kg)</span></label>
                                        <input type="number" id="cal-weight" placeholder="80" min="30" max="300" class="input-field cal-input" oninput="validateAndCalculate()">
                                        <span class="text-xs text-red-500 hidden" id="cal-weight-error">Invalid weight</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3"><i class="fas fa-running mr-2"></i>Activity Level</h4>
                                <select id="cal-activity" class="input-field mb-2" onchange="validateAndCalculate()">
                                    <option value="1.2">Sedentary (little or no exercise)</option>
                                    <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
                                    <option value="1.55" selected>Moderately Active (moderate exercise 3-5 days/week)</option>
                                    <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
                                    <option value="1.9">Extremely Active (very hard exercise, physical job)</option>
                                </select>
                                <div class="text-xs text-gray-500">
                                    <i class="fas fa-info-circle mr-1"></i>
                                    Choose the level that best describes your typical week
                                </div>
                            </div>
                            
                            <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3"><i class="fas fa-bullseye mr-2"></i>Your Goal</h4>
                                <select id="cal-goal" class="input-field mb-2" onchange="validateAndCalculate()">
                                    <option value="-1000">Aggressive Weight Loss (-1 kg/week)</option>
                                    <option value="-500">Moderate Weight Loss (-0.5 kg/week)</option>
                                    <option value="-250">Mild Weight Loss (-0.25 kg/week)</option>
                                    <option value="0" selected>Maintain Weight</option>
                                    <option value="250">Mild Weight Gain (+0.25 kg/week)</option>
                                    <option value="500">Moderate Weight Gain (+0.5 kg/week)</option>
                                </select>
                            </div>
                            
                            <div class="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3"><i class="fas fa-flask mr-2"></i>Formula & Macros</h4>
                                <div class="space-y-3">
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Formula Method</label>
                                        <select id="cal-formula" class="input-field" onchange="handleFormulaChange()">
                                            <option value="mifflin" selected>Mifflin-St Jeor (Most Accurate)</option>
                                            <option value="harris">Harris-Benedict (Classic)</option>
                                            <option value="katch">Katch-McArdle (Requires Body Fat %)</option>
                                        </select>
                                    </div>
                                    <div id="body-fat-input" class="hidden">
                                        <label class="text-xs text-gray-600 font-medium">Body Fat Percentage (%)</label>
                                        <input type="number" id="cal-bodyfat" placeholder="20" min="3" max="60" class="input-field cal-input" oninput="validateAndCalculate()">
                                    </div>
                                    <div>
                                        <label class="text-xs text-gray-600 font-medium">Macro Split</label>
                                        <select id="cal-macro-preset" class="input-field" onchange="applyMacroPreset()">
                                            <option value="balanced" selected>Balanced (30P/40C/30F)</option>
                                            <option value="lowcarb">Low Carb (40P/20C/40F)</option>
                                            <option value="highprotein">High Protein (40P/35C/25F)</option>
                                            <option value="keto">Keto (25P/5C/70F)</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>
                                    <div id="custom-macros" class="hidden grid grid-cols-3 gap-2">
                                        <div>
                                            <label class="text-xs text-gray-600">Protein %</label>
                                            <input type="number" id="custom-protein" value="30" min="10" max="60" class="input-field text-center" oninput="validateAndCalculate()">
                                        </div>
                                        <div>
                                            <label class="text-xs text-gray-600">Carbs %</label>
                                            <input type="number" id="custom-carbs" value="40" min="5" max="70" class="input-field text-center" oninput="validateAndCalculate()">
                                        </div>
                                        <div>
                                            <label class="text-xs text-gray-600">Fat %</label>
                                            <input type="number" id="custom-fat" value="30" min="10" max="80" class="input-field text-center" oninput="validateAndCalculate()">
                                        </div>
                                        <div class="col-span-3 text-xs text-center" id="macro-total-indicator">Total: 100%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="flex flex-wrap gap-2">
                                <button onclick="saveCalorieResults()" class="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                    <i class="fas fa-save mr-1"></i> Save
                                </button>
                                <button onclick="exportMealPlanPDF()" class="flex-1 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
                                    <i class="fas fa-file-pdf mr-1"></i> Export PDF
                                </button>
                                <button onclick="resetCalorieCalculator()" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                                    <i class="fas fa-redo"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Results Section -->
                        <div id="cal-result" class="space-y-4 hidden">
                            <!-- BMR Result -->
                            <div class="p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-blue-100 text-sm font-medium">Basal Metabolic Rate (BMR)</span>
                                    <i class="fas fa-heartbeat text-blue-200"></i>
                                </div>
                                <div class="text-3xl font-bold" id="cal-bmr">--</div>
                                <div class="text-blue-200 text-xs mt-1">Calories burned at complete rest</div>
                            </div>
                            
                            <!-- TDEE Result -->
                            <div class="p-5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-orange-100 text-sm font-medium">Total Daily Energy Expenditure (TDEE)</span>
                                    <i class="fas fa-fire text-orange-200"></i>
                                </div>
                                <div class="text-4xl font-bold" id="cal-tdee">--</div>
                                <div class="text-orange-200 text-xs mt-1">Calories you burn per day with activity</div>
                            </div>
                            
                            <!-- Target Calories -->
                            <div class="p-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-green-100 text-sm font-medium">Daily Calorie Target</span>
                                    <i class="fas fa-utensils text-green-200"></i>
                                </div>
                                <div class="text-4xl font-bold" id="cal-target">--</div>
                                <div class="text-green-200 text-xs mt-1" id="cal-goal-text">To maintain your current weight</div>
                            </div>
                            
                            <!-- Macronutrient Breakdown with Visual Chart -->
                            <div class="p-5 bg-white border-2 border-gray-100 rounded-xl">
                                <h4 class="font-semibold text-navy mb-4 flex items-center justify-between">
                                    <span><i class="fas fa-chart-pie text-purple-500 mr-2"></i>Macros Breakdown</span>
                                    <span class="text-xs text-gray-500" id="macro-preset-label">Balanced</span>
                                </h4>
                                <!-- Visual Pie Chart -->
                                <div class="flex items-center justify-center mb-4">
                                    <div class="relative w-32 h-32">
                                        <svg viewBox="0 0 36 36" class="w-full h-full">
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3"></circle>
                                            <circle id="chart-protein" cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="30 70" stroke-dashoffset="25" class="transition-all duration-500"></circle>
                                            <circle id="chart-carbs" cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="40 60" stroke-dashoffset="-5" class="transition-all duration-500"></circle>
                                            <circle id="chart-fat" cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="30 70" stroke-dashoffset="-45" class="transition-all duration-500"></circle>
                                        </svg>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="text-center">
                                                <div class="text-lg font-bold text-navy" id="total-cal-display">--</div>
                                                <div class="text-xs text-gray-500">cal/day</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-3 gap-3">
                                    <div class="text-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                                        <div class="text-2xl font-bold text-blue-600" id="macro-protein">--g</div>
                                        <div class="text-xs text-gray-500">Protein (<span id="protein-pct">30</span>%)</div>
                                        <div class="text-xs text-blue-500 font-medium" id="macro-protein-cal">-- cal</div>
                                    </div>
                                    <div class="text-center p-3 bg-amber-50 rounded-lg border-2 border-amber-200">
                                        <div class="text-2xl font-bold text-amber-600" id="macro-carbs">--g</div>
                                        <div class="text-xs text-gray-500">Carbs (<span id="carbs-pct">40</span>%)</div>
                                        <div class="text-xs text-amber-500 font-medium" id="macro-carbs-cal">-- cal</div>
                                    </div>
                                    <div class="text-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                                        <div class="text-2xl font-bold text-green-600" id="macro-fat">--g</div>
                                        <div class="text-xs text-gray-500">Fat (<span id="fat-pct">30</span>%)</div>
                                        <div class="text-xs text-green-500 font-medium" id="macro-fat-cal">-- cal</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Meal Timing Suggestions -->
                            <div class="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3 flex items-center">
                                    <i class="fas fa-clock text-indigo-500 mr-2"></i>
                                    Suggested Meal Timing
                                </h4>
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="p-3 bg-white rounded-lg">
                                        <div class="text-xs text-gray-500 mb-1"><i class="fas fa-sun text-yellow-500 mr-1"></i>Breakfast (25%)</div>
                                        <div class="font-bold text-navy" id="meal-breakfast">-- cal</div>
                                    </div>
                                    <div class="p-3 bg-white rounded-lg">
                                        <div class="text-xs text-gray-500 mb-1"><i class="fas fa-cloud-sun text-orange-400 mr-1"></i>Lunch (35%)</div>
                                        <div class="font-bold text-navy" id="meal-lunch">-- cal</div>
                                    </div>
                                    <div class="p-3 bg-white rounded-lg">
                                        <div class="text-xs text-gray-500 mb-1"><i class="fas fa-moon text-blue-400 mr-1"></i>Dinner (30%)</div>
                                        <div class="font-bold text-navy" id="meal-dinner">-- cal</div>
                                    </div>
                                    <div class="p-3 bg-white rounded-lg">
                                        <div class="text-xs text-gray-500 mb-1"><i class="fas fa-cookie text-amber-500 mr-1"></i>Snacks (10%)</div>
                                        <div class="font-bold text-navy" id="meal-snacks">-- cal</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Weight Projection -->
                            <div class="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                <h4 class="font-semibold text-navy mb-3 flex items-center">
                                    <i class="fas fa-calendar-alt text-indigo-500 mr-2"></i>
                                    Weight Projection
                                </h4>
                                <div class="grid grid-cols-3 gap-2 text-center">
                                    <div class="p-2 bg-white rounded-lg">
                                        <div class="text-sm font-bold text-navy" id="proj-1month">--</div>
                                        <div class="text-xs text-gray-500">1 Month</div>
                                    </div>
                                    <div class="p-2 bg-white rounded-lg">
                                        <div class="text-sm font-bold text-navy" id="proj-3month">--</div>
                                        <div class="text-xs text-gray-500">3 Months</div>
                                    </div>
                                    <div class="p-2 bg-white rounded-lg">
                                        <div class="text-sm font-bold text-navy" id="proj-6month">--</div>
                                        <div class="text-xs text-gray-500">6 Months</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Tips -->
                            <div class="p-4 bg-blue-50 rounded-xl">
                                <h4 class="font-semibold text-blue-800 mb-2 text-sm">
                                    <i class="fas fa-lightbulb mr-2"></i>Pro Tips
                                </h4>
                                <ul class="text-xs text-blue-700 space-y-1" id="cal-tips">
                                    <li>• Track your food intake for accurate results</li>
                                    <li>• Adjust calories based on weekly progress</li>
                                    <li>• Don't go below 1200 cal (women) / 1500 cal (men)</li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Empty State -->
                        <div id="cal-empty" class="flex flex-col items-center justify-center py-12 text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-4">
                                <i class="fas fa-fire-alt text-orange-400 text-4xl"></i>
                            </div>
                            <h4 class="font-semibold text-navy mb-2">Enter Your Details</h4>
                            <p class="text-sm text-gray-500 max-w-xs">
                                Fill in the form to calculate your daily calorie needs based on the most accurate scientific formulas.
                            </p>
                            <!-- Quick Load from History -->
                            <button onclick="loadSavedCalories()" id="load-history-btn" class="mt-4 text-sm text-blue-600 hover:underline hidden">
                                <i class="fas fa-history mr-1"></i> Load previous calculation
                            </button>
                        </div>
                    </div>
                    
                    <!-- History Panel -->
                    <div id="cal-history-panel" class="mt-6 p-4 bg-gray-50 rounded-xl hidden">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="font-semibold text-navy text-sm">
                                <i class="fas fa-history text-gray-500 mr-2"></i>Calculation History
                            </h4>
                            <button onclick="clearCalorieHistory()" class="text-xs text-red-500 hover:underline">Clear All</button>
                        </div>
                        <div id="cal-history-list" class="space-y-2 max-h-40 overflow-y-auto">
                            <!-- History items will be populated here -->
                        </div>
                    </div>
                    
                    <!-- Formula Explanation -->
                    <div class="mt-6 p-4 bg-gray-50 rounded-xl">
                        <details>
                            <summary class="cursor-pointer font-semibold text-navy text-sm flex items-center">
                                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                                About the Formulas
                            </summary>
                            <div class="mt-3 text-xs text-gray-600 space-y-2">
                                <p><strong>Mifflin-St Jeor (Recommended):</strong> Most accurate for the general population. Developed in 1990 and validated in numerous studies.</p>
                                <p><strong>Harris-Benedict:</strong> Classic formula from 1919, revised in 1984. May slightly overestimate for some individuals.</p>
                                <p><strong>Katch-McArdle:</strong> Best for lean individuals who know their body fat percentage. Accounts for lean body mass.</p>
                                <p class="text-gray-500 italic mt-2">Note: All formulas are estimates. Monitor your progress and adjust as needed. Consult a healthcare provider for personalized advice.</p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- JOURNEY TAB -->
        <div id="tab-journey" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-road text-gold mr-3"></i>
                Your SelectCare Journey
            </h1>
            
            <div class="card p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="text-lg font-bold text-navy">Overall Progress</h2>
                        <p class="text-sm text-gray-500">Journey to German Excellence Healthcare</p>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold text-gold">35%</div>
                        <div class="text-sm text-gray-500">Complete</div>
                    </div>
                </div>
                <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full" style="width: 35%"></div>
                </div>
            </div>
            
            <div class="space-y-6">
                <!-- Phase 1: Discovery -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-completed">
                            <i class="fas fa-check text-white"></i>
                        </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="card p-6">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Discovery & Consultation</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-completed">Completed</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-4">1-2 weeks • Initial assessment and recommendations</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Initial Inquiry
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Video Consultation
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Medical History
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Treatment Plan
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 2: Virtual Prep -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-in-progress">
                            <i class="fas fa-clipboard-list text-navy"></i>
                        </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="card p-6 border-2 border-gold">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Virtual Preparation</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-in-progress">In Progress</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-4">4-12 weeks • Week 6 of 12</p>
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-1">
                                <span>Phase Progress</span>
                                <span class="font-semibold">50%</span>
                            </div>
                            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-full bg-gold rounded-full" style="width: 50%"></div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Medical Assessments
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>Lab Tests & Imaging
                            </div>
                            <div class="flex items-center text-sm text-gold">
                                <i class="fas fa-spinner fa-spin mr-2"></i>Health Optimization
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>IoT Device Setup
                            </div>
                            <div class="flex items-center text-sm text-gray-400">
                                <i class="fas fa-circle mr-2"></i>Pre-Op Documentation
                            </div>
                            <div class="flex items-center text-sm text-gray-400">
                                <i class="fas fa-circle mr-2"></i>Travel Planning
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 3: Travel -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-pending">
                            <i class="fas fa-plane"></i>
                        </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="card p-6 opacity-60">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Travel to Hurghada</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-pending">Pending</span>
                        </div>
                        <p class="text-sm text-gray-500">1 day • VIP airport reception & luxury transfer</p>
                    </div>
                </div>
                
                <!-- Phase 4: Surgery -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-pending">
                            <i class="fas fa-hospital"></i>
                        </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="card p-6 opacity-60">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Surgery & Hospital Stay</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-pending">Pending</span>
                        </div>
                        <p class="text-sm text-gray-500">2-7 days • JCI-accredited facility with German surgeon</p>
                    </div>
                </div>
                
                <!-- Phase 5: Recovery -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-pending">
                            <i class="fas fa-umbrella-beach"></i>
                        </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="card p-6 opacity-60">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Red Sea Recovery</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-pending">Pending</span>
                        </div>
                        <p class="text-sm text-gray-500">7-21 days • 5-star resort with daily medical checks & spa</p>
                    </div>
                </div>
                
                <!-- Phase 6: Follow-up -->
                <div class="relative pl-16">
                    <div class="absolute left-0 top-0">
                        <div class="phase-dot phase-pending">
                            <i class="fas fa-video"></i>
                        </div>
                    </div>
                    <div class="card p-6 opacity-60">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-navy text-lg">Lifetime Digital Follow-up</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full status-pending">Pending</span>
                        </div>
                        <p class="text-sm text-gray-500">Ongoing • Monthly telemedicine, IoT monitoring, AI plans</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- VITALS TAB -->
        <div id="tab-vitals" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-heartbeat text-gold mr-3"></i>
                Health Vitals & Metrics
            </h1>
            
            <!-- Current Vitals -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-3">
                        <i class="fas fa-heartbeat text-red-500 text-2xl"></i>
                        <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Normal</span>
                    </div>
                    <div class="text-3xl font-bold text-navy" id="vital-hr">72</div>
                    <div class="text-sm text-gray-500">Heart Rate</div>
                    <div class="text-xs text-gray-400 mt-1">bpm • Updated now</div>
                </div>
                
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-3">
                        <i class="fas fa-heart text-blue-500 text-2xl"></i>
                        <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Normal</span>
                    </div>
                    <div class="text-3xl font-bold text-navy">120/80</div>
                    <div class="text-sm text-gray-500">Blood Pressure</div>
                    <div class="text-xs text-gray-400 mt-1">mmHg • 2 min ago</div>
                </div>
                
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-3">
                        <i class="fas fa-lungs text-green-500 text-2xl"></i>
                        <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Optimal</span>
                    </div>
                    <div class="text-3xl font-bold text-navy">98%</div>
                    <div class="text-sm text-gray-500">Oxygen (SpO2)</div>
                    <div class="text-xs text-gray-400 mt-1">Updated now</div>
                </div>
                
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-3">
                        <i class="fas fa-thermometer-half text-orange-500 text-2xl"></i>
                        <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Normal</span>
                    </div>
                    <div class="text-3xl font-bold text-navy">36.8°C</div>
                    <div class="text-sm text-gray-500">Temperature</div>
                    <div class="text-xs text-gray-400 mt-1">1 hour ago</div>
                </div>
            </div>
            
            <!-- Tracking Metrics -->
            <h2 class="text-lg font-bold text-navy mb-4">Daily Tracking</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div class="card p-4 text-center">
                    <i class="fas fa-weight text-purple-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">82.4</div>
                    <div class="text-xs text-gray-500">Weight (kg)</div>
                    <div class="text-xs text-green-500 mt-1">-0.3 today</div>
                </div>
                <div class="card p-4 text-center">
                    <i class="fas fa-walking text-green-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">5,240</div>
                    <div class="text-xs text-gray-500">Steps</div>
                    <div class="text-xs text-yellow-500 mt-1">70% of goal</div>
                </div>
                <div class="card p-4 text-center">
                    <i class="fas fa-tint text-blue-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">1,800</div>
                    <div class="text-xs text-gray-500">Water (ml)</div>
                    <div class="text-xs text-yellow-500 mt-1">75% of goal</div>
                </div>
                <div class="card p-4 text-center">
                    <i class="fas fa-moon text-indigo-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">7.2</div>
                    <div class="text-xs text-gray-500">Sleep (hours)</div>
                    <div class="text-xs text-green-500 mt-1">Good quality</div>
                </div>
                <div class="card p-4 text-center">
                    <i class="fas fa-fire text-red-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">1,420</div>
                    <div class="text-xs text-gray-500">Calories</div>
                    <div class="text-xs text-green-500 mt-1">On target</div>
                </div>
                <div class="card p-4 text-center">
                    <i class="fas fa-drumstick-bite text-orange-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-navy">68</div>
                    <div class="text-xs text-gray-500">Protein (g)</div>
                    <div class="text-xs text-green-500 mt-1">85% of goal</div>
                </div>
            </div>
            
            <!-- Weight Progress Chart -->
            <div class="card p-6 mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-navy">Weight Progress</h2>
                    <select class="text-sm border rounded-lg px-3 py-1">
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>All time</option>
                    </select>
                </div>
                <div class="h-64">
                    <canvas id="weightChart"></canvas>
                </div>
                <div class="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                        <div class="text-sm text-gray-500">Starting</div>
                        <div class="text-xl font-bold text-gray-600">90.8 kg</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">Current</div>
                        <div class="text-xl font-bold text-navy">82.4 kg</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">Target</div>
                        <div class="text-xl font-bold text-gold">75.0 kg</div>
                    </div>
                </div>
            </div>
            
            <!-- Connected Devices -->
            <div class="card p-6">
                <h2 class="text-lg font-bold text-navy mb-4">
                    <i class="fas fa-bluetooth text-blue-500 mr-2"></i>
                    Connected Devices
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-center justify-between p-4 bg-cream rounded-xl">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                                <i class="fab fa-apple text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-navy">Apple Watch Series 9</div>
                                <div class="text-xs text-gray-500">HR, Steps, Sleep, ECG</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <span class="text-xs text-green-600">Connected</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-cream rounded-xl">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                <i class="fas fa-weight text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-navy">Withings Body+ Scale</div>
                                <div class="text-xs text-gray-500">Weight, BMI, Body Fat</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <span class="text-xs text-green-600">Connected</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-cream rounded-xl">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                <i class="fas fa-heart text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-navy">Omron BP Monitor</div>
                                <div class="text-xs text-gray-500">Blood Pressure, Pulse</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <span class="text-xs text-green-600">Connected</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-cream rounded-xl">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                                <i class="fas fa-tint text-navy text-xl"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-navy">SelectTech CGM</div>
                                <div class="text-xs text-gray-500">Continuous Glucose</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <span class="text-xs text-green-600">Connected</span>
                        </div>
                    </div>
                </div>
                
                <button class="w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-gold hover:text-gold transition">
                    <i class="fas fa-plus mr-2"></i>Add New Device
                </button>
            </div>
        </div>
        
        <!-- APPOINTMENTS TAB -->
        <div id="tab-appointments" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-calendar text-gold mr-3"></i>
                Appointments
            </h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <!-- Upcoming -->
                    <div>
                        <h2 class="text-lg font-bold text-navy mb-4">Upcoming Appointments</h2>
                        <div class="space-y-4">
                            <div class="card p-5 border-l-4 border-gold">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">KM</div>
                                        <div>
                                            <h3 class="font-bold text-navy">Cardiology Follow-up</h3>
                                            <p class="text-sm text-gray-500">Dr. K. Müller • Cardiologist</p>
                                            <div class="flex items-center space-x-4 mt-2">
                                                <span class="text-gold font-semibold">
                                                    <i class="fas fa-calendar mr-1"></i>Oct 22, 2024
                                                </span>
                                                <span class="text-gold font-semibold">
                                                    <i class="fas fa-clock mr-1"></i>10:00 AM
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                                        <i class="fas fa-video mr-1"></i>Video Call
                                    </span>
                                </div>
                                <div class="flex space-x-3 mt-4">
                                    <button class="btn-primary flex-1">
                                        <i class="fas fa-video mr-2"></i>Join Call
                                    </button>
                                    <button class="px-4 py-2 border-2 border-gray-200 rounded-full text-gray-600 hover:border-red-500 hover:text-red-500">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="card p-5">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">AS</div>
                                        <div>
                                            <h3 class="font-bold text-navy">Nutrition Plan Review</h3>
                                            <p class="text-sm text-gray-500">Dr. A. Schmidt • Nutritionist</p>
                                            <div class="flex items-center space-x-4 mt-2">
                                                <span class="text-gray-600">
                                                    <i class="fas fa-calendar mr-1"></i>Nov 5, 2024
                                                </span>
                                                <span class="text-gray-600">
                                                    <i class="fas fa-clock mr-1"></i>2:00 PM
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                                        <i class="fas fa-user mr-1"></i>In Person
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Past Appointments -->
                    <div>
                        <h2 class="text-lg font-bold text-navy mb-4">Past Appointments</h2>
                        <div class="space-y-4">
                            <div class="card p-5 opacity-75">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">HF</div>
                                        <div>
                                            <h3 class="font-bold text-gray-600">Surgical Follow-up</h3>
                                            <p class="text-sm text-gray-400">Dr. H. Fischer • Bariatric Surgeon</p>
                                            <div class="flex items-center space-x-4 mt-2">
                                                <span class="text-gray-400">
                                                    <i class="fas fa-calendar mr-1"></i>Oct 19, 2024
                                                </span>
                                                <span class="text-gray-400">
                                                    <i class="fas fa-clock mr-1"></i>9:00 AM
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                                        <i class="fas fa-check mr-1"></i>Completed
                                    </span>
                                </div>
                                <button class="mt-4 text-gold text-sm font-semibold">
                                    <i class="fas fa-file-alt mr-1"></i>View Notes →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Calendar Sidebar -->
                <div>
                    <div class="card p-6">
                        <h2 class="text-lg font-bold text-navy mb-4">Quick Book</h2>
                        <div class="space-y-3">
                            <button class="w-full p-4 bg-cream rounded-xl text-left hover:bg-gold-light transition">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                                        <i class="fas fa-video text-white"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-navy">Video Consultation</div>
                                        <div class="text-xs text-gray-500">30 min • €50</div>
                                    </div>
                                </div>
                            </button>
                            
                            <button class="w-full p-4 bg-cream rounded-xl text-left hover:bg-gold-light transition">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                                        <i class="fas fa-user-md text-white"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-navy">In-Person Visit</div>
                                        <div class="text-xs text-gray-500">45 min • €80</div>
                                    </div>
                                </div>
                            </button>
                            
                            <button class="w-full p-4 bg-cream rounded-xl text-left hover:bg-gold-light transition">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                                        <i class="fas fa-phone text-navy"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-navy">Urgent Call</div>
                                        <div class="text-xs text-gray-500">15 min • Priority</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card p-6 mt-6">
                        <h2 class="text-lg font-bold text-navy mb-4">Need Help?</h2>
                        <p class="text-sm text-gray-500 mb-4">Our care coordinators are available 24/7 to assist you.</p>
                        <button class="w-full btn-secondary">
                            <i class="fas fa-headset mr-2"></i>Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-navy text-white py-8 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <div class="text-xl font-bold mb-2">SelectCare<span class="text-gold">OS</span>™</div>
            <p class="text-gray-400 text-sm">German Excellence. Red Sea Recovery. Lifetime Support.</p>
            <p class="text-gray-500 text-xs mt-4">© 2024 German Select. All rights reserved.</p>
        </div>
    </footer>
    
    <script>
        // Tab Navigation
        function showTab(tabId) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
            // Show selected tab
            document.getElementById('tab-' + tabId).classList.remove('hidden');
            // Update button states
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            event.target.closest('.tab-button').classList.add('active');
            
            // Initialize charts if needed
            if (tabId === 'vitals') {
                initWeightChart();
            }
        }
        
        // BMI Calculator
        function calculateBMI() {
            const height = parseFloat(document.getElementById('bmi-height').value) / 100;
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            
            if (height > 0 && weight > 0) {
                const bmi = weight / (height * height);
                document.getElementById('bmi-value').textContent = bmi.toFixed(1);
                
                let category, color, gaugeWidth;
                if (bmi < 18.5) {
                    category = 'Underweight'; color = '#3B82F6'; gaugeWidth = 15;
                } else if (bmi < 25) {
                    category = 'Normal'; color = '#10B981'; gaugeWidth = 35;
                } else if (bmi < 30) {
                    category = 'Overweight'; color = '#F59E0B'; gaugeWidth = 55;
                } else if (bmi < 35) {
                    category = 'Obese Class I'; color = '#EF4444'; gaugeWidth = 70;
                } else if (bmi < 40) {
                    category = 'Obese Class II'; color = '#DC2626'; gaugeWidth = 85;
                } else {
                    category = 'Obese Class III'; color = '#991B1B'; gaugeWidth = 100;
                }
                
                document.getElementById('bmi-category').textContent = category;
                document.getElementById('bmi-gauge').style.width = gaugeWidth + '%';
                document.getElementById('bmi-gauge').style.background = color;
                document.getElementById('bmi-result').classList.remove('hidden');
            }
        }
        
        // Body Fat Calculator
        document.getElementById('bf-gender').addEventListener('change', function() {
            const hipContainer = document.getElementById('bf-hip-container');
            if (this.value === 'female') {
                hipContainer.classList.remove('hidden');
            } else {
                hipContainer.classList.add('hidden');
            }
        });
        
        function calculateBodyFat() {
            const gender = document.getElementById('bf-gender').value;
            const height = parseFloat(document.getElementById('bf-height').value);
            const waist = parseFloat(document.getElementById('bf-waist').value);
            const neck = parseFloat(document.getElementById('bf-neck').value);
            const hip = parseFloat(document.getElementById('bf-hip').value) || 0;
            
            if (height > 0 && waist > 0 && neck > 0) {
                let bodyFat;
                if (gender === 'male') {
                    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
                } else if (hip > 0) {
                    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
                } else {
                    return;
                }
                
                bodyFat = Math.max(0, bodyFat);
                
                let category;
                if (gender === 'male') {
                    if (bodyFat < 6) category = 'Essential Fat';
                    else if (bodyFat < 14) category = 'Athletes';
                    else if (bodyFat < 18) category = 'Fitness';
                    else if (bodyFat < 25) category = 'Average';
                    else category = 'Obese';
                } else {
                    if (bodyFat < 14) category = 'Essential Fat';
                    else if (bodyFat < 21) category = 'Athletes';
                    else if (bodyFat < 25) category = 'Fitness';
                    else if (bodyFat < 32) category = 'Average';
                    else category = 'Obese';
                }
                
                document.getElementById('bf-value').textContent = bodyFat.toFixed(1) + '%';
                document.getElementById('bf-category').textContent = category;
                document.getElementById('bf-result').classList.remove('hidden');
            }
        }
        
        // ASA Risk
        function showASAResult(level) {
            const results = {
                1: { risk: 'Very Low Risk', mortality: '0.1% mortality rate', class: 'risk-low' },
                2: { risk: 'Low Risk', mortality: '0.2% mortality rate', class: 'risk-low' },
                3: { risk: 'Moderate Risk', mortality: '1.8% mortality rate', class: 'risk-moderate' },
                4: { risk: 'High Risk', mortality: '7.8% mortality rate', class: 'risk-high' }
            };
            
            const result = results[level];
            const resultDiv = document.getElementById('asa-result');
            resultDiv.className = 'mt-4 p-4 rounded-xl ' + result.class;
            document.getElementById('asa-risk-level').textContent = result.risk;
            document.getElementById('asa-mortality').textContent = result.mortality;
            resultDiv.classList.remove('hidden');
        }
        
        // Recovery Calculator
        function calculateRecovery() {
            const procedure = document.getElementById('recovery-procedure').value;
            const age = parseInt(document.getElementById('recovery-age').value) || 45;
            const bmi = parseFloat(document.getElementById('recovery-bmi').value) || 30;
            
            if (!procedure) return;
            
            const baseRecovery = {
                'gastric-sleeve': { initial: 14, full: 42 },
                'gastric-bypass': { initial: 21, full: 56 },
                'knee-replacement': { initial: 42, full: 180 },
                'hip-replacement': { initial: 42, full: 180 },
                'facelift': { initial: 14, full: 56 },
                'rhinoplasty': { initial: 10, full: 365 },
                'tummy-tuck': { initial: 21, full: 84 }
            };
            
            const base = baseRecovery[procedure];
            
            // Adjust for age (add 10% per decade over 40)
            let ageFactor = 1;
            if (age > 40) ageFactor += (age - 40) * 0.01;
            
            // Adjust for BMI (add 5% per point over 30)
            let bmiFactor = 1;
            if (bmi > 30) bmiFactor += (bmi - 30) * 0.05;
            
            const initial = Math.round(base.initial * ageFactor * bmiFactor);
            const full = Math.round(base.full * ageFactor * bmiFactor);
            
            document.getElementById('recovery-initial').textContent = initial + ' days';
            document.getElementById('recovery-full').textContent = full + ' days';
            document.getElementById('recovery-result').classList.remove('hidden');
        }
        
        // Cost Calculator
        function calculateCost() {
            const procedureSelect = document.getElementById('cost-procedure');
            const selectedOption = procedureSelect.options[procedureSelect.selectedIndex];
            
            if (!selectedOption.value) return;
            
            const germany = parseInt(selectedOption.dataset.germany);
            const turkey = parseInt(selectedOption.dataset.turkey);
            const select = parseInt(selectedOption.dataset.select);
            
            const packageType = document.getElementById('cost-package').value;
            const packageMultiplier = { essential: 1, plus: 1.4, crown: 2 };
            
            const finalSelect = Math.round(select * packageMultiplier[packageType]);
            const savings = germany - finalSelect;
            const percent = Math.round((savings / germany) * 100);
            
            document.getElementById('cost-germany').textContent = '€' + germany.toLocaleString();
            document.getElementById('cost-turkey').textContent = '€' + turkey.toLocaleString();
            document.getElementById('cost-select').textContent = '€' + finalSelect.toLocaleString();
            document.getElementById('cost-savings').textContent = '€' + savings.toLocaleString();
            document.getElementById('cost-percent').textContent = '(-' + percent + '%)';
            document.getElementById('cost-result').classList.remove('hidden');
        }
        
        // Ideal Weight Calculator
        function calculateIdealWeight() {
            const gender = document.getElementById('ideal-gender').value;
            const heightCm = parseFloat(document.getElementById('ideal-height').value);
            const current = parseFloat(document.getElementById('ideal-current').value);
            
            if (!heightCm || heightCm < 100) return;
            
            const heightIn = heightCm / 2.54;
            const heightOver5ft = Math.max(0, heightIn - 60);
            
            let devine, robinson, miller;
            if (gender === 'male') {
                devine = 50 + 2.3 * heightOver5ft;
                robinson = 52 + 1.9 * heightOver5ft;
                miller = 56.2 + 1.41 * heightOver5ft;
            } else {
                devine = 45.5 + 2.3 * heightOver5ft;
                robinson = 49 + 1.7 * heightOver5ft;
                miller = 53.1 + 1.36 * heightOver5ft;
            }
            
            const min = Math.round(Math.min(devine, robinson, miller));
            const max = Math.round(Math.max(devine, robinson, miller));
            
            document.getElementById('ideal-range').textContent = min + ' - ' + max + ' kg';
            
            if (current > 0) {
                const toLose = Math.max(0, current - max);
                document.getElementById('ideal-lose').textContent = toLose > 0 ? toLose.toFixed(1) + ' kg' : 'At goal!';
                document.getElementById('ideal-lose').className = toLose > 0 ? 'text-xl font-bold text-red-500' : 'text-xl font-bold text-green-500';
            }
            
            document.getElementById('ideal-result').classList.remove('hidden');
        }
        
        // ============================================================================
        // CALORIE/TDEE CALCULATOR - Best Practices from MyFitnessPal, Calculator.net
        // Using Mifflin-St Jeor (most accurate), Harris-Benedict, and Katch-McArdle formulas
        // ============================================================================
        
        // Show/hide body fat input based on formula selection
        document.getElementById('cal-formula')?.addEventListener('change', function() {
            const bodyFatInput = document.getElementById('body-fat-input');
            if (this.value === 'katch') {
                bodyFatInput.classList.remove('hidden');
            } else {
                bodyFatInput.classList.add('hidden');
            }
        });
        
        function calculateCalories() {
            const age = parseFloat(document.getElementById('cal-age')?.value);
            const gender = document.getElementById('cal-gender')?.value;
            const heightCm = parseFloat(document.getElementById('cal-height')?.value);
            const weightKg = parseFloat(document.getElementById('cal-weight')?.value);
            const activityLevel = parseFloat(document.getElementById('cal-activity')?.value);
            const goal = parseFloat(document.getElementById('cal-goal')?.value);
            const formula = document.getElementById('cal-formula')?.value;
            const bodyFat = parseFloat(document.getElementById('cal-bodyfat')?.value);
            
            // Validate required fields
            if (!age || !heightCm || !weightKg || age < 15 || heightCm < 100 || weightKg < 30) {
                return;
            }
            
            // For Katch-McArdle, require body fat
            if (formula === 'katch' && (!bodyFat || bodyFat < 3 || bodyFat > 60)) {
                return;
            }
            
            let bmr = 0;
            
            // Calculate BMR based on selected formula
            switch (formula) {
                case 'mifflin':
                    // Mifflin-St Jeor Equation (1990) - Most accurate for general population
                    // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) + 5
                    // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) – 161
                    if (gender === 'male') {
                        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
                    } else {
                        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
                    }
                    break;
                    
                case 'harris':
                    // Harris-Benedict Equation (Revised 1984)
                    // Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) – (5.677 × age in years)
                    // Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) – (4.330 × age in years)
                    if (gender === 'male') {
                        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
                    } else {
                        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
                    }
                    break;
                    
                case 'katch':
                    // Katch-McArdle Formula - Uses Lean Body Mass
                    // BMR = 370 + (21.6 × Lean Body Mass in kg)
                    const leanMass = weightKg * (1 - bodyFat / 100);
                    bmr = 370 + (21.6 * leanMass);
                    break;
                    
                default:
                    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + (gender === 'male' ? 5 : -161);
            }
            
            // Calculate TDEE (BMR × Activity Factor)
            const tdee = bmr * activityLevel;
            
            // Calculate target calories based on goal
            const targetCalories = Math.max(gender === 'male' ? 1500 : 1200, tdee + goal);
            
            // Calculate macros (using balanced approach: 30% protein, 40% carbs, 30% fat)
            const proteinCal = targetCalories * 0.30;
            const carbsCal = targetCalories * 0.40;
            const fatCal = targetCalories * 0.30;
            
            const proteinGrams = Math.round(proteinCal / 4); // 4 cal per gram
            const carbsGrams = Math.round(carbsCal / 4); // 4 cal per gram
            const fatGrams = Math.round(fatCal / 9); // 9 cal per gram
            
            // Weight projections (3500 cal = 1 lb = 0.45 kg)
            const weeklyChange = (goal * 7) / 7700; // kg per week (7700 cal ≈ 1 kg)
            const proj1Month = weightKg + (weeklyChange * 4);
            const proj3Month = weightKg + (weeklyChange * 12);
            const proj6Month = weightKg + (weeklyChange * 24);
            
            // Update UI
            document.getElementById('cal-bmr').textContent = Math.round(bmr).toLocaleString() + ' cal';
            document.getElementById('cal-tdee').textContent = Math.round(tdee).toLocaleString() + ' cal';
            document.getElementById('cal-target').textContent = Math.round(targetCalories).toLocaleString() + ' cal';
            
            // Update goal text
            const goalTexts = {
                '-1000': 'For aggressive weight loss (-1 kg/week)',
                '-500': 'For moderate weight loss (-0.5 kg/week)',
                '-250': 'For mild weight loss (-0.25 kg/week)',
                '0': 'To maintain your current weight',
                '250': 'For mild weight gain (+0.25 kg/week)',
                '500': 'For moderate weight gain (+0.5 kg/week)'
            };
            document.getElementById('cal-goal-text').textContent = goalTexts[goal.toString()] || 'To maintain your current weight';
            
            // Update macros
            document.getElementById('macro-protein').textContent = proteinGrams + 'g';
            document.getElementById('macro-carbs').textContent = carbsGrams + 'g';
            document.getElementById('macro-fat').textContent = fatGrams + 'g';
            document.getElementById('macro-protein-cal').textContent = Math.round(proteinCal) + ' cal';
            document.getElementById('macro-carbs-cal').textContent = Math.round(carbsCal) + ' cal';
            document.getElementById('macro-fat-cal').textContent = Math.round(fatCal) + ' cal';
            
            // Update projections
            document.getElementById('proj-1month').textContent = proj1Month.toFixed(1) + ' kg';
            document.getElementById('proj-3month').textContent = proj3Month.toFixed(1) + ' kg';
            document.getElementById('proj-6month').textContent = proj6Month.toFixed(1) + ' kg';
            
            // Update tips based on goal
            const tipsEl = document.getElementById('cal-tips');
            if (goal < 0) {
                tipsEl.innerHTML = \`
                    <li>• Create a calorie deficit through diet and exercise</li>
                    <li>• Prioritize protein to preserve muscle mass</li>
                    <li>• Don't drop below \${gender === 'male' ? '1500' : '1200'} calories daily</li>
                    <li>• Aim for 0.5-1% body weight loss per week max</li>
                \`;
            } else if (goal > 0) {
                tipsEl.innerHTML = \`
                    <li>• Focus on quality calories, not just quantity</li>
                    <li>• Include resistance training for muscle gain</li>
                    <li>• Eat protein with every meal (aim for 1.6-2.2g/kg)</li>
                    <li>• Track progress with measurements, not just scale</li>
                \`;
            } else {
                tipsEl.innerHTML = \`
                    <li>• Monitor your weight weekly for consistency</li>
                    <li>• Adjust intake if weight changes significantly</li>
                    <li>• Balance macros for optimal health</li>
                    <li>• Stay hydrated and prioritize sleep</li>
                \`;
            }
            
            // Show results, hide empty state
            document.getElementById('cal-result').classList.remove('hidden');
            document.getElementById('cal-empty').classList.add('hidden');
        }
        
        // Weight Chart
        function initWeightChart() {
            const ctx = document.getElementById('weightChart');
            if (!ctx || ctx.chart) return;
            
            const labels = [];
            const data = [];
            const startWeight = 90.8;
            const currentWeight = 82.4;
            
            for (let i = 30; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                
                const progress = (30 - i) / 30;
                const weight = startWeight - (startWeight - currentWeight) * progress + (Math.random() * 0.6 - 0.3);
                data.push(weight.toFixed(1));
            }
            
            ctx.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Weight (kg)',
                        data: data,
                        borderColor: '#C9A227',
                        backgroundColor: 'rgba(201, 162, 39, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            min: 75,
                            max: 95,
                            ticks: { callback: v => v + ' kg' }
                        }
                    }
                }
            });
        }
        
        // Update vitals periodically
        function updateVitals() {
            const hr = 70 + Math.floor(Math.random() * 8);
            document.getElementById('vital-hr').textContent = hr;
            document.getElementById('heart-rate').textContent = hr;
            
            const steps = 5000 + Math.floor(Math.random() * 500);
            document.getElementById('steps-today').textContent = steps.toLocaleString();
        }
        
        setInterval(updateVitals, 5000);
        
        // ============================================================================
        // CALORIE CALCULATOR ENHANCEMENT FUNCTIONS
        // Unit Toggle, Save/Load, Validation, Macros, Meal Timing
        // ============================================================================
        
        // State management
        let currentUnit = 'metric'; // 'metric' or 'imperial'
        let macroRatios = { protein: 30, carbs: 40, fat: 30 };
        const STORAGE_KEY = 'selectcare_calorie_history';
        
        // Unit Toggle Function
        function toggleUnits(unit) {
            const prevUnit = currentUnit;
            currentUnit = unit;
            
            // Update button styles
            const metricBtn = document.getElementById('unit-metric');
            const imperialBtn = document.getElementById('unit-imperial');
            
            if (unit === 'metric') {
                metricBtn.classList.add('bg-white', 'text-navy', 'shadow-sm');
                metricBtn.classList.remove('text-gray-500');
                imperialBtn.classList.remove('bg-white', 'text-navy', 'shadow-sm');
                imperialBtn.classList.add('text-gray-500');
                
                document.getElementById('height-unit-label').textContent = '(cm)';
                document.getElementById('weight-unit-label').textContent = '(kg)';
                
                // Convert values if switching from imperial
                if (prevUnit === 'imperial') {
                    const heightInput = document.getElementById('cal-height');
                    const weightInput = document.getElementById('cal-weight');
                    
                    const feet = parseFloat(document.getElementById('height-feet')?.value) || 0;
                    const inches = parseFloat(document.getElementById('height-inches')?.value) || 0;
                    const totalInches = (feet * 12) + inches;
                    const cm = Math.round(totalInches * 2.54);
                    
                    const lbs = parseFloat(weightInput.value) || 0;
                    const kg = Math.round(lbs / 2.205 * 10) / 10;
                    
                    // Restore single height input
                    const container = document.getElementById('height-input-container');
                    container.innerHTML = '<input type="number" id="cal-height" placeholder="175" min="100" max="250" class="input-field cal-input" oninput="validateAndCalculate()">';
                    
                    if (cm >= 100) document.getElementById('cal-height').value = cm;
                    if (kg >= 30) weightInput.value = kg;
                    
                    // Update placeholders
                    document.getElementById('cal-height').placeholder = '175';
                    weightInput.placeholder = '80';
                    weightInput.min = '30';
                    weightInput.max = '300';
                }
            } else {
                imperialBtn.classList.add('bg-white', 'text-navy', 'shadow-sm');
                imperialBtn.classList.remove('text-gray-500');
                metricBtn.classList.remove('bg-white', 'text-navy', 'shadow-sm');
                metricBtn.classList.add('text-gray-500');
                
                document.getElementById('height-unit-label').textContent = '(ft/in)';
                document.getElementById('weight-unit-label').textContent = '(lbs)';
                
                // Convert values if switching from metric
                if (prevUnit === 'metric') {
                    const heightInput = document.getElementById('cal-height');
                    const weightInput = document.getElementById('cal-weight');
                    
                    const cm = parseFloat(heightInput.value) || 0;
                    const totalInches = cm / 2.54;
                    const feet = Math.floor(totalInches / 12);
                    const inches = Math.round(totalInches % 12);
                    
                    const kg = parseFloat(weightInput.value) || 0;
                    const lbs = Math.round(kg * 2.205);
                    
                    // Replace with feet/inches inputs
                    const container = document.getElementById('height-input-container');
                    container.innerHTML = \`
                        <input type="number" id="height-feet" placeholder="5" min="3" max="8" class="input-field cal-input w-1/2" oninput="validateAndCalculate()">
                        <span class="self-center text-xs text-gray-500">ft</span>
                        <input type="number" id="height-inches" placeholder="9" min="0" max="11" class="input-field cal-input w-1/2" oninput="validateAndCalculate()">
                        <span class="self-center text-xs text-gray-500">in</span>
                    \`;
                    
                    if (feet >= 3) document.getElementById('height-feet').value = feet;
                    if (inches >= 0) document.getElementById('height-inches').value = inches;
                    if (lbs >= 66) weightInput.value = lbs;
                    
                    // Update placeholders and limits
                    weightInput.placeholder = '176';
                    weightInput.min = '66';
                    weightInput.max = '660';
                }
            }
            
            validateAndCalculate();
        }
        
        // Validate and Calculate with visual feedback
        function validateAndCalculate() {
            const validationDiv = document.getElementById('cal-validation');
            const validationMsg = document.getElementById('cal-validation-msg');
            const errors = [];
            
            // Get values based on current unit
            let heightCm, weightKg;
            const age = parseFloat(document.getElementById('cal-age')?.value);
            
            if (currentUnit === 'metric') {
                heightCm = parseFloat(document.getElementById('cal-height')?.value);
                weightKg = parseFloat(document.getElementById('cal-weight')?.value);
            } else {
                const feet = parseFloat(document.getElementById('height-feet')?.value) || 0;
                const inches = parseFloat(document.getElementById('height-inches')?.value) || 0;
                const totalInches = (feet * 12) + inches;
                heightCm = totalInches * 2.54;
                
                const lbs = parseFloat(document.getElementById('cal-weight')?.value) || 0;
                weightKg = lbs / 2.205;
            }
            
            // Validate age
            const ageError = document.getElementById('cal-age-error');
            if (!age || age < 15 || age > 100) {
                ageError?.classList.remove('hidden');
                document.getElementById('cal-age')?.classList.add('border-red-400', 'bg-red-50');
                if (age && (age < 15 || age > 100)) errors.push('Age must be 15-100 years');
            } else {
                ageError?.classList.add('hidden');
                document.getElementById('cal-age')?.classList.remove('border-red-400', 'bg-red-50');
            }
            
            // Validate height
            const heightError = document.getElementById('cal-height-error');
            if (!heightCm || heightCm < 100 || heightCm > 250) {
                heightError?.classList.remove('hidden');
                if (currentUnit === 'metric') {
                    document.getElementById('cal-height')?.classList.add('border-red-400', 'bg-red-50');
                } else {
                    document.getElementById('height-feet')?.classList.add('border-red-400', 'bg-red-50');
                    document.getElementById('height-inches')?.classList.add('border-red-400', 'bg-red-50');
                }
                if (heightCm && (heightCm < 100 || heightCm > 250)) errors.push('Height out of valid range');
            } else {
                heightError?.classList.add('hidden');
                if (currentUnit === 'metric') {
                    document.getElementById('cal-height')?.classList.remove('border-red-400', 'bg-red-50');
                } else {
                    document.getElementById('height-feet')?.classList.remove('border-red-400', 'bg-red-50');
                    document.getElementById('height-inches')?.classList.remove('border-red-400', 'bg-red-50');
                }
            }
            
            // Validate weight
            const weightError = document.getElementById('cal-weight-error');
            if (!weightKg || weightKg < 30 || weightKg > 300) {
                weightError?.classList.remove('hidden');
                document.getElementById('cal-weight')?.classList.add('border-red-400', 'bg-red-50');
                if (weightKg && (weightKg < 30 || weightKg > 300)) errors.push('Weight out of valid range');
            } else {
                weightError?.classList.add('hidden');
                document.getElementById('cal-weight')?.classList.remove('border-red-400', 'bg-red-50');
            }
            
            // Check custom macros
            const macroPreset = document.getElementById('cal-macro-preset')?.value;
            if (macroPreset === 'custom') {
                const protein = parseInt(document.getElementById('custom-protein')?.value) || 0;
                const carbs = parseInt(document.getElementById('custom-carbs')?.value) || 0;
                const fat = parseInt(document.getElementById('custom-fat')?.value) || 0;
                const total = protein + carbs + fat;
                
                const indicator = document.getElementById('macro-total-indicator');
                if (total !== 100) {
                    indicator.textContent = \`Total: \${total}% (must equal 100%)\`;
                    indicator.classList.add('text-red-500');
                    indicator.classList.remove('text-green-600');
                    errors.push('Macro percentages must total 100%');
                } else {
                    indicator.textContent = 'Total: 100% ✓';
                    indicator.classList.remove('text-red-500');
                    indicator.classList.add('text-green-600');
                    macroRatios = { protein, carbs, fat };
                }
            }
            
            // Show/hide validation message
            if (errors.length > 0) {
                validationMsg.textContent = errors.join('. ');
                validationDiv.classList.remove('hidden');
            } else {
                validationDiv.classList.add('hidden');
            }
            
            // Calculate if valid
            if (age >= 15 && heightCm >= 100 && weightKg >= 30 && errors.length === 0) {
                calculateCaloriesEnhanced(age, heightCm, weightKg);
            }
        }
        
        // Handle formula change
        function handleFormulaChange() {
            const formula = document.getElementById('cal-formula')?.value;
            const bodyFatInput = document.getElementById('body-fat-input');
            
            if (formula === 'katch') {
                bodyFatInput.classList.remove('hidden');
            } else {
                bodyFatInput.classList.add('hidden');
            }
            
            validateAndCalculate();
        }
        
        // Apply macro preset
        function applyMacroPreset() {
            const preset = document.getElementById('cal-macro-preset')?.value;
            const customDiv = document.getElementById('custom-macros');
            
            const presets = {
                'balanced': { protein: 30, carbs: 40, fat: 30 },
                'lowcarb': { protein: 40, carbs: 20, fat: 40 },
                'highprotein': { protein: 40, carbs: 35, fat: 25 },
                'keto': { protein: 25, carbs: 5, fat: 70 }
            };
            
            if (preset === 'custom') {
                customDiv.classList.remove('hidden');
            } else {
                customDiv.classList.add('hidden');
                if (presets[preset]) {
                    macroRatios = presets[preset];
                }
            }
            
            // Update percentage displays
            document.getElementById('protein-pct').textContent = macroRatios.protein;
            document.getElementById('carbs-pct').textContent = macroRatios.carbs;
            document.getElementById('fat-pct').textContent = macroRatios.fat;
            
            // Update preset label
            const labels = {
                'balanced': 'Balanced',
                'lowcarb': 'Low Carb',
                'highprotein': 'High Protein',
                'keto': 'Keto',
                'custom': 'Custom'
            };
            document.getElementById('macro-preset-label').textContent = labels[preset] || 'Balanced';
            
            validateAndCalculate();
        }
        
        // Enhanced calculation with all features
        function calculateCaloriesEnhanced(age, heightCm, weightKg) {
            const gender = document.getElementById('cal-gender')?.value;
            const activityLevel = parseFloat(document.getElementById('cal-activity')?.value);
            const goal = parseFloat(document.getElementById('cal-goal')?.value);
            const formula = document.getElementById('cal-formula')?.value;
            const bodyFat = parseFloat(document.getElementById('cal-bodyfat')?.value);
            
            // For Katch-McArdle, require body fat
            if (formula === 'katch' && (!bodyFat || bodyFat < 3 || bodyFat > 60)) {
                return;
            }
            
            let bmr = 0;
            
            // Calculate BMR based on selected formula
            switch (formula) {
                case 'mifflin':
                    if (gender === 'male') {
                        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
                    } else {
                        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
                    }
                    break;
                case 'harris':
                    if (gender === 'male') {
                        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
                    } else {
                        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
                    }
                    break;
                case 'katch':
                    const leanMass = weightKg * (1 - bodyFat / 100);
                    bmr = 370 + (21.6 * leanMass);
                    break;
                default:
                    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + (gender === 'male' ? 5 : -161);
            }
            
            // Calculate TDEE
            const tdee = bmr * activityLevel;
            
            // Calculate target with safety floors
            const minCal = gender === 'male' ? 1500 : 1200;
            const targetCalories = Math.max(minCal, tdee + goal);
            
            // Get current macro ratios
            const macroPreset = document.getElementById('cal-macro-preset')?.value;
            if (macroPreset === 'custom') {
                macroRatios.protein = parseInt(document.getElementById('custom-protein')?.value) || 30;
                macroRatios.carbs = parseInt(document.getElementById('custom-carbs')?.value) || 40;
                macroRatios.fat = parseInt(document.getElementById('custom-fat')?.value) || 30;
            }
            
            // Calculate macros
            const proteinCal = targetCalories * (macroRatios.protein / 100);
            const carbsCal = targetCalories * (macroRatios.carbs / 100);
            const fatCal = targetCalories * (macroRatios.fat / 100);
            
            const proteinGrams = Math.round(proteinCal / 4);
            const carbsGrams = Math.round(carbsCal / 4);
            const fatGrams = Math.round(fatCal / 9);
            
            // Weight projections
            const weeklyChange = (goal * 7) / 7700;
            const proj1Month = weightKg + (weeklyChange * 4);
            const proj3Month = weightKg + (weeklyChange * 12);
            const proj6Month = weightKg + (weeklyChange * 24);
            
            // Update UI
            document.getElementById('cal-bmr').textContent = Math.round(bmr).toLocaleString() + ' cal';
            document.getElementById('cal-tdee').textContent = Math.round(tdee).toLocaleString() + ' cal';
            document.getElementById('cal-target').textContent = Math.round(targetCalories).toLocaleString() + ' cal';
            document.getElementById('total-cal-display').textContent = Math.round(targetCalories).toLocaleString();
            
            // Goal text
            const goalTexts = {
                '-1000': 'For aggressive weight loss (-1 kg/week)',
                '-500': 'For moderate weight loss (-0.5 kg/week)',
                '-250': 'For mild weight loss (-0.25 kg/week)',
                '0': 'To maintain your current weight',
                '250': 'For mild weight gain (+0.25 kg/week)',
                '500': 'For moderate weight gain (+0.5 kg/week)'
            };
            document.getElementById('cal-goal-text').textContent = goalTexts[goal.toString()] || 'To maintain your current weight';
            
            // Update macros display
            document.getElementById('macro-protein').textContent = proteinGrams + 'g';
            document.getElementById('macro-carbs').textContent = carbsGrams + 'g';
            document.getElementById('macro-fat').textContent = fatGrams + 'g';
            document.getElementById('macro-protein-cal').textContent = Math.round(proteinCal) + ' cal';
            document.getElementById('macro-carbs-cal').textContent = Math.round(carbsCal) + ' cal';
            document.getElementById('macro-fat-cal').textContent = Math.round(fatCal) + ' cal';
            
            // Update percentage displays
            document.getElementById('protein-pct').textContent = macroRatios.protein;
            document.getElementById('carbs-pct').textContent = macroRatios.carbs;
            document.getElementById('fat-pct').textContent = macroRatios.fat;
            
            // Update pie chart
            updateMacroPieChart(macroRatios.protein, macroRatios.carbs, macroRatios.fat);
            
            // Meal timing calculations
            document.getElementById('meal-breakfast').textContent = Math.round(targetCalories * 0.25) + ' cal';
            document.getElementById('meal-lunch').textContent = Math.round(targetCalories * 0.35) + ' cal';
            document.getElementById('meal-dinner').textContent = Math.round(targetCalories * 0.30) + ' cal';
            document.getElementById('meal-snacks').textContent = Math.round(targetCalories * 0.10) + ' cal';
            
            // Update projections
            const unitSuffix = currentUnit === 'metric' ? ' kg' : ' lbs';
            const multiplier = currentUnit === 'metric' ? 1 : 2.205;
            document.getElementById('proj-1month').textContent = (proj1Month * multiplier).toFixed(1) + unitSuffix;
            document.getElementById('proj-3month').textContent = (proj3Month * multiplier).toFixed(1) + unitSuffix;
            document.getElementById('proj-6month').textContent = (proj6Month * multiplier).toFixed(1) + unitSuffix;
            
            // Update tips based on goal
            updateCalorieTips(goal, gender);
            
            // Show results, hide empty state
            document.getElementById('cal-result').classList.remove('hidden');
            document.getElementById('cal-empty').classList.add('hidden');
        }
        
        // Update pie chart SVG
        function updateMacroPieChart(protein, carbs, fat) {
            // Calculate stroke-dasharray and stroke-dashoffset for each segment
            const proteinCircle = document.getElementById('chart-protein');
            const carbsCircle = document.getElementById('chart-carbs');
            const fatCircle = document.getElementById('chart-fat');
            
            if (!proteinCircle || !carbsCircle || !fatCircle) return;
            
            // Protein starts at top (offset 25% to start at 12 o'clock)
            proteinCircle.setAttribute('stroke-dasharray', \`\${protein} \${100 - protein}\`);
            proteinCircle.setAttribute('stroke-dashoffset', '25');
            
            // Carbs follows protein
            carbsCircle.setAttribute('stroke-dasharray', \`\${carbs} \${100 - carbs}\`);
            carbsCircle.setAttribute('stroke-dashoffset', \`\${25 - protein}\`);
            
            // Fat follows carbs
            fatCircle.setAttribute('stroke-dasharray', \`\${fat} \${100 - fat}\`);
            fatCircle.setAttribute('stroke-dashoffset', \`\${25 - protein - carbs}\`);
        }
        
        // Update tips based on goal
        function updateCalorieTips(goal, gender) {
            const tipsEl = document.getElementById('cal-tips');
            if (!tipsEl) return;
            
            if (goal < 0) {
                tipsEl.innerHTML = \`
                    <li>• Create a calorie deficit through diet and exercise</li>
                    <li>• Prioritize protein to preserve muscle mass (1.6-2.2g/kg)</li>
                    <li>• Don't drop below \${gender === 'male' ? '1500' : '1200'} calories daily</li>
                    <li>• Aim for 0.5-1% body weight loss per week max</li>
                    <li>• Include strength training to maintain muscle</li>
                \`;
            } else if (goal > 0) {
                tipsEl.innerHTML = \`
                    <li>• Focus on quality calories, not just quantity</li>
                    <li>• Include resistance training for muscle gain</li>
                    <li>• Eat protein with every meal (aim for 1.6-2.2g/kg)</li>
                    <li>• Track progress with measurements, not just scale</li>
                    <li>• Aim for 0.25-0.5kg muscle gain per month</li>
                \`;
            } else {
                tipsEl.innerHTML = \`
                    <li>• Monitor your weight weekly for consistency</li>
                    <li>• Adjust intake if weight changes significantly</li>
                    <li>• Balance macros for optimal health</li>
                    <li>• Stay hydrated (aim for 30-35ml per kg bodyweight)</li>
                    <li>• Prioritize sleep for metabolic health</li>
                \`;
            }
        }
        
        // Save calorie results to localStorage
        function saveCalorieResults() {
            const bmr = document.getElementById('cal-bmr')?.textContent;
            const tdee = document.getElementById('cal-tdee')?.textContent;
            const target = document.getElementById('cal-target')?.textContent;
            
            if (!bmr || bmr === '--') {
                alert('Please calculate your calories first before saving.');
                return;
            }
            
            const result = {
                date: new Date().toISOString(),
                age: document.getElementById('cal-age')?.value,
                gender: document.getElementById('cal-gender')?.value,
                height: currentUnit === 'metric' ? 
                    document.getElementById('cal-height')?.value + ' cm' :
                    (document.getElementById('height-feet')?.value || 0) + "'" + (document.getElementById('height-inches')?.value || 0) + '"',
                weight: document.getElementById('cal-weight')?.value + (currentUnit === 'metric' ? ' kg' : ' lbs'),
                activity: document.getElementById('cal-activity')?.selectedOptions[0]?.text,
                goal: document.getElementById('cal-goal')?.selectedOptions[0]?.text,
                formula: document.getElementById('cal-formula')?.selectedOptions[0]?.text,
                macroPreset: document.getElementById('cal-macro-preset')?.value,
                bmr: bmr,
                tdee: tdee,
                target: target,
                macros: {
                    protein: document.getElementById('macro-protein')?.textContent,
                    carbs: document.getElementById('macro-carbs')?.textContent,
                    fat: document.getElementById('macro-fat')?.textContent
                }
            };
            
            // Get existing history
            let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            // Add new result (max 10 entries)
            history.unshift(result);
            if (history.length > 10) history = history.slice(0, 10);
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            
            // Show success banner
            const banner = document.getElementById('cal-saved-banner');
            banner.classList.remove('hidden');
            setTimeout(() => banner.classList.add('hidden'), 3000);
            
            // Update history UI
            updateHistoryUI();
        }
        
        // Load saved calories from localStorage
        function loadSavedCalories() {
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            if (history.length === 0) {
                alert('No saved calculations found.');
                return;
            }
            
            // Show history panel
            const panel = document.getElementById('cal-history-panel');
            panel.classList.toggle('hidden');
            
            updateHistoryUI();
        }
        
        // Update history UI
        function updateHistoryUI() {
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const list = document.getElementById('cal-history-list');
            const loadBtn = document.getElementById('load-history-btn');
            
            if (history.length > 0) {
                loadBtn?.classList.remove('hidden');
            }
            
            if (!list) return;
            
            list.innerHTML = history.map((item, index) => \`
                <div class="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gold cursor-pointer" onclick="applyHistoryItem(\${index})">
                    <div>
                        <div class="font-semibold text-navy text-sm">\${item.target}</div>
                        <div class="text-xs text-gray-500">\${new Date(item.date).toLocaleDateString()} • \${item.weight} • \${item.goal}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">\${item.formula}</span>
                        <button onclick="event.stopPropagation(); deleteHistoryItem(\${index})" class="text-red-400 hover:text-red-600">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
            \`).join('');
        }
        
        // Apply history item to form
        function applyHistoryItem(index) {
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const item = history[index];
            
            if (!item) return;
            
            // Set form values
            document.getElementById('cal-age').value = item.age;
            document.getElementById('cal-gender').value = item.gender;
            
            // Handle weight based on stored unit
            if (item.weight.includes('kg')) {
                toggleUnits('metric');
                document.getElementById('cal-weight').value = parseFloat(item.weight);
                if (item.height.includes('cm')) {
                    document.getElementById('cal-height').value = parseFloat(item.height);
                }
            } else {
                toggleUnits('imperial');
                document.getElementById('cal-weight').value = parseFloat(item.weight);
            }
            
            // Activity and goal
            const activitySelect = document.getElementById('cal-activity');
            for (let opt of activitySelect.options) {
                if (opt.text === item.activity) {
                    activitySelect.value = opt.value;
                    break;
                }
            }
            
            const goalSelect = document.getElementById('cal-goal');
            for (let opt of goalSelect.options) {
                if (opt.text === item.goal) {
                    goalSelect.value = opt.value;
                    break;
                }
            }
            
            // Formula
            const formulaSelect = document.getElementById('cal-formula');
            for (let opt of formulaSelect.options) {
                if (opt.text === item.formula) {
                    formulaSelect.value = opt.value;
                    break;
                }
            }
            
            // Macro preset
            if (item.macroPreset) {
                document.getElementById('cal-macro-preset').value = item.macroPreset;
                applyMacroPreset();
            }
            
            // Close panel and recalculate
            document.getElementById('cal-history-panel').classList.add('hidden');
            handleFormulaChange();
            validateAndCalculate();
        }
        
        // Delete history item
        function deleteHistoryItem(index) {
            let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            history.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            updateHistoryUI();
        }
        
        // Clear all history
        function clearCalorieHistory() {
            if (confirm('Are you sure you want to clear all saved calculations?')) {
                localStorage.removeItem(STORAGE_KEY);
                updateHistoryUI();
                document.getElementById('cal-history-panel').classList.add('hidden');
                document.getElementById('load-history-btn')?.classList.add('hidden');
            }
        }
        
        // Reset calculator
        function resetCalorieCalculator() {
            // Reset all inputs
            document.getElementById('cal-age').value = '';
            document.getElementById('cal-gender').value = 'male';
            document.getElementById('cal-activity').value = '1.55';
            document.getElementById('cal-goal').value = '0';
            document.getElementById('cal-formula').value = 'mifflin';
            document.getElementById('cal-bodyfat').value = '';
            document.getElementById('cal-macro-preset').value = 'balanced';
            
            // Reset to metric
            toggleUnits('metric');
            document.getElementById('cal-height').value = '';
            document.getElementById('cal-weight').value = '';
            
            // Hide custom macros
            document.getElementById('custom-macros').classList.add('hidden');
            document.getElementById('body-fat-input').classList.add('hidden');
            
            // Reset macro ratios
            macroRatios = { protein: 30, carbs: 40, fat: 30 };
            
            // Clear validation states
            document.querySelectorAll('.cal-input').forEach(el => {
                el.classList.remove('border-red-400', 'bg-red-50');
            });
            document.getElementById('cal-validation').classList.add('hidden');
            
            // Hide results, show empty state
            document.getElementById('cal-result').classList.add('hidden');
            document.getElementById('cal-empty').classList.remove('hidden');
        }
        
        // ============================================================================
        // PDF EXPORT FOR MEAL PLAN
        // ============================================================================
        
        async function exportMealPlanPDF() {
            const target = document.getElementById('cal-target')?.textContent;
            if (!target || target === '--') {
                alert('Please calculate your calories first before exporting.');
                return;
            }
            
            // Gather current calculation data
            const calories = parseInt(target.replace(/[^0-9]/g, ''));
            const protein = parseInt(document.getElementById('macro-protein')?.textContent) || 0;
            const carbs = parseInt(document.getElementById('macro-carbs')?.textContent) || 0;
            const fat = parseInt(document.getElementById('macro-fat')?.textContent) || 0;
            const goal = document.getElementById('cal-goal')?.value || '0';
            
            try {
                // Call the API to generate meal plan
                const response = await fetch('/api/export/meal-plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        calories,
                        macros: { protein, carbs, fat },
                        goal,
                        userInfo: { name: 'SelectCare User' },
                        format: 'html'
                    })
                });
                
                if (!response.ok) throw new Error('Failed to generate meal plan');
                
                const html = await response.text();
                
                // Open in new window for printing/saving as PDF
                const printWindow = window.open('', '_blank');
                printWindow.document.write(html);
                printWindow.document.close();
                
                // Auto-trigger print dialog after a short delay
                setTimeout(() => {
                    printWindow.print();
                }, 500);
                
            } catch (error) {
                console.error('Export error:', error);
                
                // Fallback: Generate client-side if API fails
                const htmlContent = generateMealPlanHTML(calories, { protein, carbs, fat }, goal);
                const printWindow = window.open('', '_blank');
                printWindow.document.write(htmlContent);
                printWindow.document.close();
                setTimeout(() => printWindow.print(), 500);
            }
        }
        
        // Fallback meal plan generator (client-side)
        function generateMealPlanHTML(calories, macros, goal) {
            const goalText = {
                '-1000': 'Weight Loss (Aggressive)',
                '-500': 'Weight Loss (Moderate)',
                '-250': 'Weight Loss (Mild)',
                '0': 'Weight Maintenance',
                '250': 'Weight Gain (Mild)',
                '500': 'Weight Gain (Moderate)'
            }[goal] || 'Weight Maintenance';
            
            return \`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SelectCareOS - Personalized Meal Plan</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #1a1a2e; }
        .header { text-align: center; border-bottom: 3px solid #C9A227; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #1a1a2e; margin: 0; }
        .header .subtitle { color: #C9A227; font-size: 18px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
        .summary-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 15px; border-radius: 10px; text-align: center; }
        .summary-card .value { font-size: 28px; font-weight: bold; color: #C9A227; }
        .summary-card .label { font-size: 12px; color: #666; }
        .meal { background: #fff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
        .meal h3 { color: #1a1a2e; margin-top: 0; border-bottom: 2px solid #C9A227; padding-bottom: 10px; }
        .suggestion { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .suggestion .name { font-weight: bold; color: #1a1a2e; }
        .macros { display: flex; gap: 15px; margin-top: 10px; font-size: 12px; }
        .macros span { padding: 4px 8px; border-radius: 4px; }
        .protein { background: #e3f2fd; color: #1976d2; }
        .carbs { background: #fff3e0; color: #f57c00; }
        .fat { background: #e8f5e9; color: #388e3c; }
        .tips { background: #f5f5f5; padding: 20px; border-radius: 10px; margin-top: 30px; }
        .tips h3 { color: #C9A227; margin-top: 0; }
        .tips ul { margin: 0; padding-left: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; }
        @media print { body { padding: 0; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🥗 Personalized Meal Plan</h1>
        <div class="subtitle">SelectCareOS™ - German Excellence in Healthcare</div>
        <div style="margin-top: 10px; color: #666;">Goal: \${goalText} | Generated: \${new Date().toLocaleDateString()}</div>
    </div>
    
    <div class="summary">
        <div class="summary-card">
            <div class="value">\${calories}</div>
            <div class="label">Daily Calories</div>
        </div>
        <div class="summary-card">
            <div class="value">\${macros.protein}g</div>
            <div class="label">Protein</div>
        </div>
        <div class="summary-card">
            <div class="value">\${macros.carbs}g</div>
            <div class="label">Carbs</div>
        </div>
        <div class="summary-card">
            <div class="value">\${macros.fat}g</div>
            <div class="label">Fat</div>
        </div>
    </div>
    
    <div class="meal">
        <h3>🌅 Breakfast (\${Math.round(calories * 0.25)} cal) - 7:00-8:00 AM</h3>
        <div class="suggestion">
            <div class="name">Greek Yogurt Bowl</div>
            <div style="color: #666; font-size: 14px;">Greek yogurt with berries, granola, and honey</div>
            <div class="macros">
                <span class="protein">Protein: \${Math.round(macros.protein * 0.3)}g</span>
                <span class="carbs">Carbs: \${Math.round(macros.carbs * 0.25)}g</span>
                <span class="fat">Fat: \${Math.round(macros.fat * 0.2)}g</span>
            </div>
        </div>
    </div>
    
    <div class="meal">
        <h3>☀️ Lunch (\${Math.round(calories * 0.35)} cal) - 12:00-1:00 PM</h3>
        <div class="suggestion">
            <div class="name">Grilled Chicken Salad</div>
            <div style="color: #666; font-size: 14px;">Grilled chicken breast with mixed greens, quinoa, and olive oil dressing</div>
            <div class="macros">
                <span class="protein">Protein: \${Math.round(macros.protein * 0.4)}g</span>
                <span class="carbs">Carbs: \${Math.round(macros.carbs * 0.35)}g</span>
                <span class="fat">Fat: \${Math.round(macros.fat * 0.3)}g</span>
            </div>
        </div>
    </div>
    
    <div class="meal">
        <h3>🌙 Dinner (\${Math.round(calories * 0.30)} cal) - 6:00-7:00 PM</h3>
        <div class="suggestion">
            <div class="name">Salmon & Vegetables</div>
            <div style="color: #666; font-size: 14px;">Baked salmon with roasted vegetables and quinoa</div>
            <div class="macros">
                <span class="protein">Protein: \${Math.round(macros.protein * 0.25)}g</span>
                <span class="carbs">Carbs: \${Math.round(macros.carbs * 0.3)}g</span>
                <span class="fat">Fat: \${Math.round(macros.fat * 0.35)}g</span>
            </div>
        </div>
    </div>
    
    <div class="meal">
        <h3>🍎 Snacks (\${Math.round(calories * 0.10)} cal)</h3>
        <div class="suggestion">
            <div class="name">Healthy Snack Options</div>
            <div style="color: #666; font-size: 14px;">Almonds (1/4 cup) • Apple with peanut butter • Protein shake • Greek yogurt</div>
            <div class="macros">
                <span class="protein">Protein: \${Math.round(macros.protein * 0.05)}g</span>
                <span class="carbs">Carbs: \${Math.round(macros.carbs * 0.1)}g</span>
                <span class="fat">Fat: \${Math.round(macros.fat * 0.15)}g</span>
            </div>
        </div>
    </div>
    
    <div class="tips">
        <h3>💡 Pro Tips for Success</h3>
        <ul>
            <li>Drink at least 8 glasses of water daily</li>
            <li>Eat slowly and mindfully for better digestion</li>
            <li>Prep meals in advance for consistency</li>
            <li>Include fiber-rich foods for satiety</li>
            <li>Limit processed foods and added sugars</li>
            <li>Track your progress weekly and adjust as needed</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>This meal plan is for informational purposes only. Consult a healthcare provider before making significant dietary changes.</p>
        <p>© \${new Date().getFullYear()} SelectCareOS™ - German Select Healthcare</p>
    </div>
    
    <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="padding: 10px 30px; background: #C9A227; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            🖨️ Print / Save as PDF
        </button>
    </div>
</body>
</html>
            \`;
        }
        
        // ============================================================================
        // HEALTH APP INTEGRATION (Apple Health / Google Fit)
        // ============================================================================
        
        const HEALTH_PROVIDERS_KEY = 'selectcare_health_providers';
        
        async function connectHealthProvider(provider) {
            const userId = 'user_' + Date.now(); // In production, use actual user ID
            
            try {
                const response = await fetch('/api/health/connect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ provider, userId })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Store provider info locally
                    const providers = JSON.parse(localStorage.getItem(HEALTH_PROVIDERS_KEY) || '{}');
                    providers[provider] = { userId, connected: true, lastSync: new Date().toISOString() };
                    localStorage.setItem(HEALTH_PROVIDERS_KEY, JSON.stringify(providers));
                    
                    alert(\`Successfully connected to \${provider.replace('_', ' ').toUpperCase()}!\`);
                    updateHealthProviderUI();
                    
                    // Auto-sync after connection
                    await syncHealthData(provider, userId);
                } else {
                    alert('Failed to connect: ' + data.error);
                }
            } catch (error) {
                console.error('Connection error:', error);
                alert('Failed to connect to health provider.');
            }
        }
        
        async function syncHealthData(provider, userId) {
            try {
                const response = await fetch('/api/health/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        provider, 
                        userId,
                        dataTypes: ['steps', 'heart_rate', 'weight', 'calories', 'sleep']
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Update local storage with synced data
                    const providers = JSON.parse(localStorage.getItem(HEALTH_PROVIDERS_KEY) || '{}');
                    if (providers[provider]) {
                        providers[provider].lastSync = data.data.syncedAt;
                        providers[provider].healthData = data.data.healthData;
                        localStorage.setItem(HEALTH_PROVIDERS_KEY, JSON.stringify(providers));
                    }
                    
                    updateHealthDataDisplay(data.data.healthData);
                    return data.data.healthData;
                }
            } catch (error) {
                console.error('Sync error:', error);
            }
            return null;
        }
        
        function updateHealthProviderUI() {
            const providers = JSON.parse(localStorage.getItem(HEALTH_PROVIDERS_KEY) || '{}');
            
            // Update connected providers display if the element exists
            const container = document.getElementById('health-providers-status');
            if (container) {
                const connectedList = Object.entries(providers)
                    .filter(([_, v]) => v.connected)
                    .map(([provider, info]) => \`
                        <div class="flex items-center justify-between p-2 bg-green-50 rounded-lg mb-2">
                            <span class="text-sm font-medium text-green-700">
                                <i class="fas fa-check-circle mr-2"></i>
                                \${provider.replace('_', ' ').toUpperCase()}
                            </span>
                            <span class="text-xs text-gray-500">
                                Synced: \${new Date(info.lastSync).toLocaleString()}
                            </span>
                        </div>
                    \`).join('');
                
                container.innerHTML = connectedList || '<p class="text-sm text-gray-500">No health apps connected</p>';
            }
        }
        
        function updateHealthDataDisplay(healthData) {
            if (!healthData) return;
            
            // Update steps if available
            if (healthData.steps) {
                const stepsEl = document.getElementById('health-steps');
                if (stepsEl) stepsEl.textContent = healthData.steps.today?.toLocaleString() || '--';
            }
            
            // Update heart rate if available
            if (healthData.heartRate) {
                const hrEl = document.getElementById('health-heart-rate');
                if (hrEl) hrEl.textContent = healthData.heartRate.current || '--';
            }
            
            // Update weight if available
            if (healthData.weight) {
                const weightEl = document.getElementById('health-weight');
                if (weightEl) weightEl.textContent = healthData.weight.current + ' ' + healthData.weight.unit;
            }
            
            // Update calories if available
            if (healthData.calories) {
                const calEl = document.getElementById('health-calories-burned');
                if (calEl) calEl.textContent = healthData.calories.burned?.toLocaleString() || '--';
            }
        }
        
        // Initialize on load
        document.addEventListener('DOMContentLoaded', function() {
            // Default tab is overview
            
            // Check for saved history
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (history.length > 0) {
                document.getElementById('load-history-btn')?.classList.remove('hidden');
            }
            
            // Initialize macro pie chart
            updateMacroPieChart(30, 40, 30);
            
            // Initialize health provider UI
            updateHealthProviderUI();
        });
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
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/rewards" class="nav-item">
                <i class="fas fa-coins"></i>
                <span>Rewards</span>
            </a>
            <a href="/patient-dashboard" class="nav-item active">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>
`
