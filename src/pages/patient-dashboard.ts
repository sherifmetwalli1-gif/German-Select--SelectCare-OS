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
                                    <button class="text-gold font-semibold text-sm">View Full Analysis →</button>
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
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Default tab is overview
        });
    </script>
</body>
</html>
`
