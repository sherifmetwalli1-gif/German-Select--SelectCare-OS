/**
 * SelectCareOS™ Health Calculators Hub
 * Comprehensive suite of medical, wellness, and bariatric calculators
 * Enhanced with German Select medical tourism specific tools
 */

import { Hono } from 'hono'

const calculatorsRouter = new Hono()

// ============================================================================
// CALCULATOR DATA & FORMULAS
// ============================================================================

const CALCULATOR_CATEGORIES = {
  essential: {
    name: 'Essential Health',
    icon: 'fa-heart-pulse',
    color: '#EF4444',
    description: 'Core health metrics every patient should know'
  },
  bariatric: {
    name: 'Bariatric & Weight Loss',
    icon: 'fa-weight-scale',
    color: '#8B5CF6',
    description: 'Specialized tools for weight loss surgery patients'
  },
  surgical: {
    name: 'Surgical Planning',
    icon: 'fa-user-doctor',
    color: '#3B82F6',
    description: 'Pre-operative assessment and planning tools'
  },
  nutrition: {
    name: 'Nutrition & Fitness',
    icon: 'fa-apple-whole',
    color: '#22C55E',
    description: 'Diet, nutrition, and exercise calculators'
  },
  wellness: {
    name: 'Wellness & Lifestyle',
    icon: 'fa-spa',
    color: '#EC4899',
    description: 'Overall health and wellness assessment'
  },
  financial: {
    name: 'Cost & Savings',
    icon: 'fa-piggy-bank',
    color: '#F59E0B',
    description: 'Medical tourism cost comparison tools'
  }
}

const CALCULATORS = [
  // ESSENTIAL HEALTH
  {
    id: 'bmi',
    category: 'essential',
    name: 'BMI Calculator',
    nameDE: 'BMI-Rechner',
    description: 'Calculate Body Mass Index and weight category',
    icon: 'fa-weight',
    popular: true,
    inputs: ['height', 'weight'],
    formula: 'weight (kg) / height² (m)'
  },
  {
    id: 'body-fat',
    category: 'essential',
    name: 'Body Fat Percentage',
    nameDE: 'Körperfettanteil',
    description: 'Estimate body fat using Navy method',
    icon: 'fa-percent',
    popular: true,
    inputs: ['gender', 'height', 'waist', 'neck', 'hip'],
    formula: 'U.S. Navy Method'
  },
  {
    id: 'blood-pressure',
    category: 'essential',
    name: 'Blood Pressure Analysis',
    nameDE: 'Blutdruck-Analyse',
    description: 'Interpret blood pressure readings',
    icon: 'fa-heart',
    inputs: ['systolic', 'diastolic'],
    ranges: [
      { name: 'Normal', systolic: [0, 120], diastolic: [0, 80], color: '#22C55E' },
      { name: 'Elevated', systolic: [120, 129], diastolic: [0, 80], color: '#F59E0B' },
      { name: 'High Stage 1', systolic: [130, 139], diastolic: [80, 89], color: '#EF4444' },
      { name: 'High Stage 2', systolic: [140, 999], diastolic: [90, 999], color: '#DC2626' }
    ]
  },
  {
    id: 'heart-rate-zones',
    category: 'essential',
    name: 'Heart Rate Zones',
    nameDE: 'Herzfrequenzzonen',
    description: 'Calculate training heart rate zones',
    icon: 'fa-heartbeat',
    inputs: ['age', 'resting_hr'],
    zones: ['Recovery', 'Fat Burn', 'Cardio', 'Peak', 'Maximum']
  },
  // BARIATRIC & WEIGHT LOSS
  {
    id: 'bariatric-eligibility',
    category: 'bariatric',
    name: 'Surgery Eligibility Check',
    nameDE: 'OP-Eignungsprüfung',
    description: 'Check if you qualify for bariatric surgery',
    icon: 'fa-clipboard-check',
    popular: true,
    inputs: ['height', 'weight', 'age', 'comorbidities'],
    criteria: {
      bmi40: 'BMI ≥ 40 qualifies without comorbidities',
      bmi35: 'BMI 35-39.9 with obesity-related conditions',
      bmi30: 'BMI 30-34.9 with uncontrolled diabetes (select procedures)'
    }
  },
  {
    id: 'weight-loss-projection',
    category: 'bariatric',
    name: 'Weight Loss Projection',
    nameDE: 'Gewichtsverlust-Prognose',
    description: 'Project expected weight loss after surgery',
    icon: 'fa-chart-line',
    popular: true,
    inputs: ['current_weight', 'height', 'procedure', 'age'],
    ewlRanges: {
      'gastric-sleeve': { ewl: [60, 70], timeline: '12-18 months' },
      'gastric-bypass': { ewl: [70, 80], timeline: '12-18 months' },
      'lap-band': { ewl: [40, 50], timeline: '24-36 months' }
    }
  },
  {
    id: 'excess-weight',
    category: 'bariatric',
    name: 'Excess Weight Calculator',
    nameDE: 'Übergewicht-Rechner',
    description: 'Calculate excess body weight for surgery planning',
    icon: 'fa-scale-unbalanced',
    inputs: ['height', 'weight', 'frame_size'],
    formula: 'Current weight - Ideal weight (BMI 25)'
  },
  {
    id: 'protein-needs',
    category: 'bariatric',
    name: 'Post-Surgery Protein',
    nameDE: 'Proteinbedarf nach OP',
    description: 'Daily protein requirements after bariatric surgery',
    icon: 'fa-drumstick-bite',
    inputs: ['weight', 'weeks_post_op', 'activity_level'],
    recommendations: {
      week0_4: '60-80g protein daily',
      week4_12: '60-80g protein daily',
      week12_plus: '60-100g based on activity'
    }
  },
  // SURGICAL PLANNING
  {
    id: 'asa-score',
    category: 'surgical',
    name: 'ASA Physical Status',
    nameDE: 'ASA Klassifikation',
    description: 'Anesthesia risk classification',
    icon: 'fa-hospital',
    popular: true,
    inputs: ['health_conditions'],
    classifications: [
      { class: 'ASA I', desc: 'Normal healthy patient', mortality: '0.1%' },
      { class: 'ASA II', desc: 'Mild systemic disease', mortality: '0.2%' },
      { class: 'ASA III', desc: 'Severe systemic disease', mortality: '1.8%' },
      { class: 'ASA IV', desc: 'Life-threatening disease', mortality: '7.8%' }
    ]
  },
  {
    id: 'recovery-time',
    category: 'surgical',
    name: 'Recovery Timeline',
    nameDE: 'Erholungszeit',
    description: 'Estimate recovery duration by procedure',
    icon: 'fa-calendar-check',
    inputs: ['procedure', 'age', 'bmi', 'comorbidities'],
    procedures: [
      { name: 'Gastric Sleeve', initial: 14, full: 42 },
      { name: 'Gastric Bypass', initial: 21, full: 56 },
      { name: 'Knee Replacement', initial: 42, full: 180 },
      { name: 'Hip Replacement', initial: 42, full: 180 },
      { name: 'Facelift', initial: 14, full: 56 }
    ]
  },
  {
    id: 'surgical-risk',
    category: 'surgical',
    name: 'Surgical Risk Score',
    nameDE: 'OP-Risiko-Score',
    description: 'Comprehensive surgical risk assessment',
    icon: 'fa-triangle-exclamation',
    inputs: ['age', 'bmi', 'diabetes', 'hypertension', 'heart_disease', 'smoking'],
    factors: {
      age_over_65: 1.5,
      bmi_over_40: 2.0,
      diabetes: 1.5,
      hypertension: 1.3,
      heart_disease: 2.5,
      smoking: 1.8
    }
  },
  {
    id: 'pre-op-checklist',
    category: 'surgical',
    name: 'Pre-Op Readiness',
    nameDE: 'Präoperative Checkliste',
    description: 'Surgery preparation checklist',
    icon: 'fa-list-check',
    inputs: ['checklist_items'],
    items: [
      'Medical clearance from PCP',
      'Lab work completed',
      'Cardiac clearance (if applicable)',
      'Pre-op diet started',
      'Medications reviewed',
      'Stop blood thinners',
      'Stop smoking (4 weeks)',
      'Arrange caregiver support',
      'Prepare recovery area',
      'Complete required imaging'
    ]
  },
  // NUTRITION & FITNESS
  {
    id: 'tdee',
    category: 'nutrition',
    name: 'TDEE & Calorie Needs',
    nameDE: 'Kalorienbedarf',
    description: 'Total Daily Energy Expenditure calculator',
    icon: 'fa-fire',
    popular: true,
    inputs: ['age', 'gender', 'height', 'weight', 'activity_level'],
    formulas: ['Mifflin-St Jeor', 'Harris-Benedict', 'Katch-McArdle']
  },
  {
    id: 'macros',
    category: 'nutrition',
    name: 'Macro Calculator',
    nameDE: 'Makronährstoff-Rechner',
    description: 'Calculate protein, carbs, and fat needs',
    icon: 'fa-chart-pie',
    inputs: ['tdee', 'goal', 'diet_type'],
    presets: {
      balanced: { protein: 30, carbs: 40, fat: 30 },
      lowCarb: { protein: 35, carbs: 20, fat: 45 },
      keto: { protein: 25, carbs: 5, fat: 70 },
      highProtein: { protein: 40, carbs: 35, fat: 25 }
    }
  },
  {
    id: 'water-intake',
    category: 'nutrition',
    name: 'Daily Water Intake',
    nameDE: 'Täglicher Wasserbedarf',
    description: 'Calculate optimal hydration needs',
    icon: 'fa-droplet',
    inputs: ['weight', 'activity_level', 'climate'],
    formula: 'Body weight × 30-40ml'
  },
  {
    id: 'ideal-weight',
    category: 'nutrition',
    name: 'Ideal Body Weight',
    nameDE: 'Idealgewicht',
    description: 'Calculate ideal weight range',
    icon: 'fa-bullseye',
    inputs: ['height', 'gender', 'frame_size'],
    formulas: ['Devine', 'Robinson', 'Miller', 'Hamwi']
  },
  // WELLNESS & LIFESTYLE
  {
    id: 'metabolic-age',
    category: 'wellness',
    name: 'Metabolic Age',
    nameDE: 'Stoffwechselalter',
    description: 'Estimate your metabolic age',
    icon: 'fa-hourglass-half',
    inputs: ['age', 'weight', 'height', 'body_fat', 'muscle_mass'],
    formula: 'Based on BMR comparison to age averages'
  },
  {
    id: 'sleep-quality',
    category: 'wellness',
    name: 'Sleep Quality Score',
    nameDE: 'Schlafqualität',
    description: 'Assess your sleep quality',
    icon: 'fa-moon',
    inputs: ['hours', 'wake_ups', 'snoring', 'tired_morning'],
    scoring: {
      excellent: '90-100',
      good: '70-89',
      fair: '50-69',
      poor: 'Below 50'
    }
  },
  {
    id: 'stress-assessment',
    category: 'wellness',
    name: 'Stress Level Assessment',
    nameDE: 'Stressbelastung',
    description: 'Evaluate your stress levels',
    icon: 'fa-brain',
    inputs: ['questionnaire'],
    scoring: 'PSS-10 adapted scale'
  },
  {
    id: 'biological-age',
    category: 'wellness',
    name: 'Biological Age',
    nameDE: 'Biologisches Alter',
    description: 'Estimate biological vs chronological age',
    icon: 'fa-dna',
    inputs: ['age', 'bmi', 'exercise', 'smoking', 'alcohol', 'sleep', 'diet'],
    factors: ['Lifestyle', 'Habits', 'Health markers']
  },
  // FINANCIAL
  {
    id: 'cost-comparison',
    category: 'financial',
    name: 'Cost Comparison',
    nameDE: 'Kostenvergleich',
    description: 'Compare Germany vs Turkey vs German Select',
    icon: 'fa-euro-sign',
    popular: true,
    inputs: ['procedure', 'package_level'],
    markets: ['Germany', 'Turkey', 'German Select']
  },
  {
    id: 'total-trip-cost',
    category: 'financial',
    name: 'Total Trip Calculator',
    nameDE: 'Gesamtkosten-Rechner',
    description: 'All-inclusive trip cost estimate',
    icon: 'fa-calculator',
    inputs: ['procedure', 'package', 'companion', 'duration', 'extras'],
    includes: ['Procedure', 'Hotel', 'Flights', 'Transfers', 'Meals', 'Excursions']
  },
  {
    id: 'roi-calculator',
    category: 'financial',
    name: 'Health ROI Calculator',
    nameDE: 'Gesundheits-ROI',
    description: 'Long-term savings from health improvements',
    icon: 'fa-chart-line',
    inputs: ['current_medications', 'comorbidities', 'procedure'],
    projections: ['Medication savings', 'Healthcare cost reduction', 'Quality of life']
  }
]

// ============================================================================
// PAGE RENDERER
// ============================================================================

const getCalculatorsPage = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Calculators | SelectCareOS™</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --gold: #C9A227;
            --cream: #FDF8F0;
            --gold-light: rgba(201, 162, 39, 0.1);
        }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .gradient-navy { background: linear-gradient(135deg, #001F3F 0%, #003366 100%); }
        .gradient-gold { background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%); }
        .bg-cream { background-color: var(--cream); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .bg-gold-light { background-color: var(--gold-light); }
        
        .card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .calculator-card {
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .calculator-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gold);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        .calculator-card:hover::before {
            transform: scaleX(1);
        }
        
        .category-tab {
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 500;
            white-space: nowrap;
            transition: all 0.2s ease;
            cursor: pointer;
            border: 2px solid transparent;
        }
        .category-tab:hover {
            background: rgba(201, 162, 39, 0.1);
        }
        .category-tab.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .input-field {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #E5E7EB;
            border-radius: 14px;
            font-size: 16px;
            transition: all 0.2s ease;
            background: white;
        }
        .input-field:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.15);
        }
        
        .result-card {
            background: linear-gradient(135deg, #FDF8F0 0%, #FFF9E6 100%);
            border: 2px solid var(--gold);
            border-radius: 16px;
        }
        
        .btn-primary {
            background: var(--gold);
            color: var(--navy);
            padding: 14px 32px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .btn-primary:hover {
            background: #B8922B;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(201, 162, 39, 0.3);
        }
        
        .btn-secondary {
            background: var(--navy);
            color: white;
            padding: 14px 32px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .btn-secondary:hover {
            background: #003366;
            transform: translateY(-2px);
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 31, 63, 0.8);
            backdrop-filter: blur(8px);
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
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalIn 0.3s ease;
        }
        @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
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
            transition: stroke-dashoffset 0.8s ease;
        }
        
        .progress-bar {
            height: 8px;
            background: #E5E7EB;
            border-radius: 4px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        .popular-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .stat-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(12px, env(safe-area-inset-bottom));
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }
        .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 500px;
            margin: 0 auto;
            padding: 0 8px;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 6px 12px;
            color: #9CA3AF;
            font-size: 10px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            border-radius: 8px;
            min-width: 56px;
            position: relative;
        }
        .nav-item i { font-size: 20px; margin-bottom: 4px; transition: transform 0.2s ease; }
        .nav-item:hover { color: #6B7280; background: rgba(0,0,0,0.02); }
        .nav-item.active { color: #C9A227; }
        .nav-item.connect-btn .live-dot {
            position: absolute;
            top: 4px;
            right: 12px;
            width: 8px;
            height: 8px;
            background: #22C55E;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        .floating-emergency {
            position: fixed;
            bottom: 90px;
            right: 16px;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #DC2626, #B91C1C);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 22px;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
            z-index: 999;
            transition: all 0.2s ease;
            text-decoration: none;
            border: 3px solid white;
        }
        .floating-emergency:hover { transform: scale(1.08); }
        .floating-emergency::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(220, 38, 38, 0.3);
            animation: emergency-pulse 2s infinite;
            z-index: -1;
        }
        @keyframes emergency-pulse {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        
        @media (min-width: 768px) {
            .bottom-nav { display: none; }
            .floating-emergency { bottom: 24px; right: 24px; }
        }
        main { padding-bottom: 100px; }
        
        .range-indicator {
            display: flex;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 8px;
        }
        .range-segment {
            flex: 1;
        }
        .range-marker {
            position: relative;
            height: 20px;
        }
        .range-arrow {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 10px solid var(--navy);
            transform: translateX(-50%);
            transition: left 0.5s ease;
        }
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
                    <span class="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full font-medium">
                        <i class="fas fa-calculator mr-1"></i> Health Calculators
                    </span>
                </div>
                <div class="flex items-center space-x-3">
                    <a href="/dashboard" class="text-white/80 hover:text-white text-sm">
                        <i class="fas fa-arrow-left mr-1"></i> Dashboard
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-bold text-navy mb-3">
                🧮 Health Calculators Hub
            </h1>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Comprehensive suite of medical, wellness, and bariatric calculators designed for 
                German Select patients. All calculations follow clinical guidelines and are reviewed by our medical team.
            </p>
        </div>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="stat-card">
                <div class="text-3xl font-bold text-navy">20+</div>
                <div class="text-sm text-gray-500">Calculators</div>
            </div>
            <div class="stat-card">
                <div class="text-3xl font-bold text-purple-600">6</div>
                <div class="text-sm text-gray-500">Categories</div>
            </div>
            <div class="stat-card">
                <div class="text-3xl font-bold text-green-600">100%</div>
                <div class="text-sm text-gray-500">Free to Use</div>
            </div>
            <div class="stat-card">
                <div class="text-3xl font-bold text-gold">MD</div>
                <div class="text-sm text-gray-500">Reviewed</div>
            </div>
        </div>
        
        <!-- Category Tabs -->
        <div class="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
            <button class="category-tab active" onclick="filterCategory('all')" data-category="all">
                <i class="fas fa-th-large mr-2"></i>All Calculators
            </button>
            <button class="category-tab" onclick="filterCategory('essential')" data-category="essential">
                <i class="fas fa-heart-pulse mr-2 text-red-500"></i>Essential
            </button>
            <button class="category-tab" onclick="filterCategory('bariatric')" data-category="bariatric">
                <i class="fas fa-weight-scale mr-2 text-purple-500"></i>Bariatric
            </button>
            <button class="category-tab" onclick="filterCategory('surgical')" data-category="surgical">
                <i class="fas fa-user-doctor mr-2 text-blue-500"></i>Surgical
            </button>
            <button class="category-tab" onclick="filterCategory('nutrition')" data-category="nutrition">
                <i class="fas fa-apple-whole mr-2 text-green-500"></i>Nutrition
            </button>
            <button class="category-tab" onclick="filterCategory('wellness')" data-category="wellness">
                <i class="fas fa-spa mr-2 text-pink-500"></i>Wellness
            </button>
            <button class="category-tab" onclick="filterCategory('financial')" data-category="financial">
                <i class="fas fa-piggy-bank mr-2 text-yellow-500"></i>Financial
            </button>
        </div>
        
        <!-- Popular Calculators -->
        <div id="popular-section" class="mb-10">
            <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-fire text-orange-500 mr-2"></i> Most Popular
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- BMI Calculator -->
                <div class="card calculator-card p-5" onclick="openCalculator('bmi')" data-category="essential">
                    <div class="popular-badge">Popular</div>
                    <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                        <i class="fas fa-weight text-red-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy mb-1">BMI Calculator</h3>
                    <p class="text-sm text-gray-500">Body Mass Index</p>
                </div>
                
                <!-- Surgery Eligibility -->
                <div class="card calculator-card p-5" onclick="openCalculator('bariatric-eligibility')" data-category="bariatric">
                    <div class="popular-badge">Popular</div>
                    <div class="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                        <i class="fas fa-clipboard-check text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy mb-1">Surgery Eligibility</h3>
                    <p class="text-sm text-gray-500">Check qualification</p>
                </div>
                
                <!-- Weight Loss Projection -->
                <div class="card calculator-card p-5" onclick="openCalculator('weight-loss-projection')" data-category="bariatric">
                    <div class="popular-badge">Popular</div>
                    <div class="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                        <i class="fas fa-chart-line text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy mb-1">Weight Loss Projection</h3>
                    <p class="text-sm text-gray-500">Post-surgery forecast</p>
                </div>
                
                <!-- Cost Comparison -->
                <div class="card calculator-card p-5" onclick="openCalculator('cost-comparison')" data-category="financial">
                    <div class="popular-badge">Popular</div>
                    <div class="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                        <i class="fas fa-euro-sign text-yellow-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy mb-1">Cost Comparison</h3>
                    <p class="text-sm text-gray-500">Compare prices</p>
                </div>
            </div>
        </div>
        
        <!-- All Calculators Grid -->
        <div id="calculators-grid">
            <!-- Essential Health -->
            <div class="category-section mb-8" data-category="essential">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-heart-pulse text-red-500"></i>
                    </span>
                    Essential Health
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('bmi')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-weight text-red-600 text-xl"></i>
                            </div>
                            <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Essential</span>
                        </div>
                        <h3 class="font-bold text-navy mb-1">BMI Calculator</h3>
                        <p class="text-sm text-gray-500">Calculate Body Mass Index and weight category</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('body-fat')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-percent text-purple-600 text-xl"></i>
                            </div>
                            <span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Navy Method</span>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Body Fat %</h3>
                        <p class="text-sm text-gray-500">Estimate body fat percentage</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('blood-pressure')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-heart text-pink-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Blood Pressure</h3>
                        <p class="text-sm text-gray-500">Interpret BP readings</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('heart-rate-zones')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-heartbeat text-rose-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Heart Rate Zones</h3>
                        <p class="text-sm text-gray-500">Training heart rate targets</p>
                    </div>
                </div>
            </div>
            
            <!-- Bariatric & Weight Loss -->
            <div class="category-section mb-8" data-category="bariatric">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-weight-scale text-purple-500"></i>
                    </span>
                    Bariatric & Weight Loss
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('bariatric-eligibility')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-clipboard-check text-purple-600 text-xl"></i>
                            </div>
                            <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Pre-Op</span>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Surgery Eligibility</h3>
                        <p class="text-sm text-gray-500">Check if you qualify for bariatric surgery</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('weight-loss-projection')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-chart-line text-green-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Weight Loss Projection</h3>
                        <p class="text-sm text-gray-500">Expected results after surgery</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('excess-weight')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-scale-unbalanced text-indigo-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Excess Weight</h3>
                        <p class="text-sm text-gray-500">Calculate excess body weight</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('protein-needs')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-drumstick-bite text-orange-600 text-xl"></i>
                            </div>
                            <span class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Post-Op</span>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Protein Needs</h3>
                        <p class="text-sm text-gray-500">Daily protein after surgery</p>
                    </div>
                </div>
            </div>
            
            <!-- Surgical Planning -->
            <div class="category-section mb-8" data-category="surgical">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-user-doctor text-blue-500"></i>
                    </span>
                    Surgical Planning
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('asa-score')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-hospital text-blue-600 text-xl"></i>
                            </div>
                            <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Pre-Op</span>
                        </div>
                        <h3 class="font-bold text-navy mb-1">ASA Physical Status</h3>
                        <p class="text-sm text-gray-500">Anesthesia risk classification</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('recovery-time')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-calendar-check text-teal-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Recovery Timeline</h3>
                        <p class="text-sm text-gray-500">Estimate recovery duration</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('surgical-risk')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-triangle-exclamation text-amber-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Surgical Risk Score</h3>
                        <p class="text-sm text-gray-500">Comprehensive risk assessment</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('pre-op-checklist')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-list-check text-cyan-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Pre-Op Checklist</h3>
                        <p class="text-sm text-gray-500">Surgery preparation guide</p>
                    </div>
                </div>
            </div>
            
            <!-- Nutrition & Fitness -->
            <div class="category-section mb-8" data-category="nutrition">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-apple-whole text-green-500"></i>
                    </span>
                    Nutrition & Fitness
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('tdee')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-fire text-orange-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">TDEE Calculator</h3>
                        <p class="text-sm text-gray-500">Daily calorie needs</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('macros')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-chart-pie text-lime-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Macro Calculator</h3>
                        <p class="text-sm text-gray-500">Protein, carbs & fat split</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('water-intake')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-droplet text-sky-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Water Intake</h3>
                        <p class="text-sm text-gray-500">Daily hydration needs</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('ideal-weight')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-bullseye text-emerald-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Ideal Weight</h3>
                        <p class="text-sm text-gray-500">Target weight range</p>
                    </div>
                </div>
            </div>
            
            <!-- Wellness & Lifestyle -->
            <div class="category-section mb-8" data-category="wellness">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-spa text-pink-500"></i>
                    </span>
                    Wellness & Lifestyle
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('metabolic-age')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-hourglass-half text-violet-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Metabolic Age</h3>
                        <p class="text-sm text-gray-500">Your metabolism's age</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('sleep-quality')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-moon text-indigo-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Sleep Quality</h3>
                        <p class="text-sm text-gray-500">Assess your sleep</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('stress-assessment')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-brain text-fuchsia-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Stress Assessment</h3>
                        <p class="text-sm text-gray-500">Evaluate stress levels</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('biological-age')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-dna text-rose-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Biological Age</h3>
                        <p class="text-sm text-gray-500">Your body's true age</p>
                    </div>
                </div>
            </div>
            
            <!-- Financial -->
            <div class="category-section mb-8" data-category="financial">
                <h2 class="text-xl font-bold text-navy mb-4 flex items-center">
                    <span class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-piggy-bank text-yellow-500"></i>
                    </span>
                    Cost & Savings
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="card calculator-card p-5" onclick="openCalculator('cost-comparison')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-euro-sign text-yellow-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Cost Comparison</h3>
                        <p class="text-sm text-gray-500">Germany vs Turkey vs German Select</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('total-trip-cost')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-calculator text-amber-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Total Trip Cost</h3>
                        <p class="text-sm text-gray-500">All-inclusive estimate</p>
                    </div>
                    
                    <div class="card calculator-card p-5" onclick="openCalculator('roi-calculator')">
                        <div class="flex items-start justify-between mb-3">
                            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-chart-line text-green-600 text-xl"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-navy mb-1">Health ROI</h3>
                        <p class="text-sm text-gray-500">Long-term savings projection</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- CTA Section -->
        <div class="card p-8 text-center gradient-gold mt-8">
            <h3 class="text-2xl font-bold text-navy mb-3">Ready to Start Your Journey?</h3>
            <p class="text-navy/80 mb-6 max-w-xl mx-auto">
                Get a personalized health assessment from our German board-certified surgeons.
                Free video consultation included.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/instant-connect" class="btn-secondary">
                    <i class="fas fa-video mr-2"></i> Free Consultation
                </a>
                <a href="/services" class="btn-primary">
                    <i class="fas fa-calendar mr-2"></i> Book Appointment
                </a>
            </div>
        </div>
    </main>
    
    <!-- Calculator Modals -->
    <!-- BMI Calculator Modal -->
    <div id="modal-bmi" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-weight text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">BMI Calculator</h2>
                            <p class="text-sm text-gray-500">Body Mass Index</p>
                        </div>
                    </div>
                    <button onclick="closeModal('bmi')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                        <input type="number" id="bmi-height" placeholder="e.g., 175" class="input-field" oninput="calculateBMI()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                        <input type="number" id="bmi-weight" placeholder="e.g., 85" class="input-field" oninput="calculateBMI()">
                    </div>
                </div>
                
                <div id="bmi-result" class="mt-6 hidden">
                    <div class="result-card p-6">
                        <div class="text-center mb-4">
                            <div class="text-5xl font-bold text-navy" id="bmi-value">--</div>
                            <div class="text-lg font-medium mt-2" id="bmi-category">--</div>
                        </div>
                        
                        <div class="range-indicator">
                            <div class="range-segment" style="background: #3B82F6"></div>
                            <div class="range-segment" style="background: #22C55E"></div>
                            <div class="range-segment" style="background: #F59E0B"></div>
                            <div class="range-segment" style="background: #EF4444"></div>
                            <div class="range-segment" style="background: #DC2626"></div>
                            <div class="range-segment" style="background: #991B1B"></div>
                        </div>
                        <div class="range-marker">
                            <div class="range-arrow" id="bmi-arrow" style="left: 0%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-400 mt-1">
                            <span>15</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
                        </div>
                        
                        <div class="mt-6 space-y-2">
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Healthy Weight Range:</span>
                                <span class="font-semibold text-navy" id="bmi-healthy-range">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Weight to Lose for BMI 25:</span>
                                <span class="font-semibold text-navy" id="bmi-to-lose">--</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="bmi-surgery-recommendation" class="mt-4 p-4 bg-purple-50 rounded-xl hidden">
                        <div class="flex items-start">
                            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                <i class="fas fa-user-md text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-purple-900">Surgery May Help</h4>
                                <p class="text-sm text-purple-700 mt-1" id="bmi-surgery-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-6 border-t bg-gray-50 rounded-b-3xl">
                <button onclick="saveBMIResult()" class="btn-primary w-full">
                    <i class="fas fa-save mr-2"></i> Save to Health Profile
                </button>
            </div>
        </div>
    </div>
    
    <!-- Bariatric Eligibility Modal -->
    <div id="modal-bariatric-eligibility" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-clipboard-check text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Surgery Eligibility</h2>
                            <p class="text-sm text-gray-500">Check qualification for bariatric surgery</p>
                        </div>
                    </div>
                    <button onclick="closeModal('bariatric-eligibility')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                            <input type="number" id="elig-height" placeholder="175" class="input-field" oninput="checkEligibility()">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                            <input type="number" id="elig-weight" placeholder="120" class="input-field" oninput="checkEligibility()">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <input type="number" id="elig-age" placeholder="45" class="input-field" oninput="checkEligibility()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-3">Related Health Conditions</label>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="elig-diabetes" class="mr-3" onchange="checkEligibility()">
                                <span class="text-sm">Type 2 Diabetes</span>
                            </label>
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="elig-hypertension" class="mr-3" onchange="checkEligibility()">
                                <span class="text-sm">Hypertension</span>
                            </label>
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="elig-apnea" class="mr-3" onchange="checkEligibility()">
                                <span class="text-sm">Sleep Apnea</span>
                            </label>
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="elig-joint" class="mr-3" onchange="checkEligibility()">
                                <span class="text-sm">Joint Pain</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div id="eligibility-result" class="mt-6 hidden">
                    <div id="elig-qualified" class="result-card p-6 hidden">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-check text-green-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-green-700">You May Qualify!</h3>
                            <p class="text-gray-600 mt-2" id="elig-reason"></p>
                        </div>
                        <div class="mt-6 space-y-3">
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Your BMI:</span>
                                <span class="font-bold text-navy" id="elig-bmi-value">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Recommended Procedures:</span>
                                <span class="font-semibold text-purple-600" id="elig-procedures">--</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="elig-not-qualified" class="p-6 bg-yellow-50 rounded-xl hidden">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-info text-yellow-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-yellow-700">May Not Qualify</h3>
                            <p class="text-gray-600 mt-2" id="elig-not-reason"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-6 border-t bg-gray-50 rounded-b-3xl">
                <a href="/instant-connect" class="btn-primary w-full block text-center">
                    <i class="fas fa-video mr-2"></i> Free Consultation to Confirm
                </a>
            </div>
        </div>
    </div>
    
    <!-- Weight Loss Projection Modal -->
    <div id="modal-weight-loss-projection" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-chart-line text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Weight Loss Projection</h2>
                            <p class="text-sm text-gray-500">Expected results after surgery</p>
                        </div>
                    </div>
                    <button onclick="closeModal('weight-loss-projection')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Current Weight (kg)</label>
                            <input type="number" id="proj-weight" placeholder="120" class="input-field" oninput="calculateProjection()">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                            <input type="number" id="proj-height" placeholder="175" class="input-field" oninput="calculateProjection()">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
                        <select id="proj-procedure" class="input-field" onchange="calculateProjection()">
                            <option value="">Select procedure...</option>
                            <option value="gastric-sleeve">Gastric Sleeve</option>
                            <option value="gastric-bypass">Gastric Bypass</option>
                            <option value="lap-band">Lap-Band</option>
                        </select>
                    </div>
                </div>
                
                <div id="projection-result" class="mt-6 hidden">
                    <div class="result-card p-6">
                        <h4 class="font-semibold text-navy mb-4 text-center">Projected Weight Loss Timeline</h4>
                        
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div class="text-center p-3 bg-white rounded-lg">
                                <div class="text-xs text-gray-500 mb-1">6 Months</div>
                                <div class="text-xl font-bold text-navy" id="proj-6mo">--</div>
                                <div class="text-xs text-green-600" id="proj-6mo-loss">--</div>
                            </div>
                            <div class="text-center p-3 bg-white rounded-lg">
                                <div class="text-xs text-gray-500 mb-1">12 Months</div>
                                <div class="text-xl font-bold text-navy" id="proj-12mo">--</div>
                                <div class="text-xs text-green-600" id="proj-12mo-loss">--</div>
                            </div>
                            <div class="text-center p-3 bg-white rounded-lg">
                                <div class="text-xs text-gray-500 mb-1">18 Months</div>
                                <div class="text-xl font-bold text-gold" id="proj-18mo">--</div>
                                <div class="text-xs text-green-600" id="proj-18mo-loss">--</div>
                            </div>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Expected %EWL:</span>
                                <span class="font-bold text-green-600" id="proj-ewl">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600">Target BMI:</span>
                                <span class="font-bold text-navy" id="proj-target-bmi">--</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-blue-50 rounded-xl">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            Results vary by individual. These projections are based on average outcomes from clinical studies.
                            Actual results depend on adherence to post-operative guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Cost Comparison Modal -->
    <div id="modal-cost-comparison" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-euro-sign text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Cost Comparison</h2>
                            <p class="text-sm text-gray-500">Compare treatment costs</p>
                        </div>
                    </div>
                    <button onclick="closeModal('cost-comparison')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Select Procedure</label>
                    <select id="cost-procedure" class="input-field" onchange="calculateCost()">
                        <option value="">Select procedure...</option>
                        <option value="gastric-sleeve" data-germany="22000" data-turkey="4500" data-select="5500">Gastric Sleeve</option>
                        <option value="gastric-bypass" data-germany="28000" data-turkey="6500" data-select="7500">Gastric Bypass</option>
                        <option value="knee-replacement" data-germany="40000" data-turkey="9000" data-select="10500">Knee Replacement</option>
                        <option value="hip-replacement" data-germany="45000" data-turkey="12000" data-select="13500">Hip Replacement</option>
                        <option value="facelift" data-germany="25000" data-turkey="5500" data-select="6500">Facelift</option>
                        <option value="rhinoplasty" data-germany="18000" data-turkey="3500" data-select="4200">Rhinoplasty</option>
                    </select>
                </div>
                
                <div id="cost-result" class="mt-6 hidden">
                    <div class="grid grid-cols-3 gap-3 mb-6">
                        <div class="p-4 bg-gray-100 rounded-xl text-center">
                            <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span class="text-xs">🇩🇪</span>
                            </div>
                            <div class="text-xs text-gray-500 mb-1">Germany</div>
                            <div class="text-lg font-bold text-gray-600" id="cost-germany">€--</div>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-xl text-center">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span class="text-xs">🇹🇷</span>
                            </div>
                            <div class="text-xs text-blue-600 mb-1">Turkey</div>
                            <div class="text-lg font-bold text-blue-600" id="cost-turkey">€--</div>
                        </div>
                        <div class="p-4 gradient-gold rounded-xl text-center">
                            <div class="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span class="text-xs">🏆</span>
                            </div>
                            <div class="text-xs text-navy mb-1">German Select</div>
                            <div class="text-lg font-bold text-navy" id="cost-select">€--</div>
                        </div>
                    </div>
                    
                    <div class="result-card p-5">
                        <div class="text-center">
                            <div class="text-sm text-gray-600 mb-1">You Save vs. Germany</div>
                            <div class="text-3xl font-bold text-green-600" id="cost-savings">€--</div>
                            <div class="text-sm text-green-600" id="cost-percent">-- savings</div>
                        </div>
                    </div>
                    
                    <div class="mt-4 space-y-2">
                        <div class="flex items-center p-3 bg-green-50 rounded-lg">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span class="text-sm text-green-700">German Board-Certified Surgeons</span>
                        </div>
                        <div class="flex items-center p-3 bg-green-50 rounded-lg">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span class="text-sm text-green-700">5-Star Resort Recovery Included</span>
                        </div>
                        <div class="flex items-center p-3 bg-green-50 rounded-lg">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span class="text-sm text-green-700">2-Year Digital Follow-up</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Generic Modal for Other Calculators -->
    <div id="modal-generic" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div id="generic-icon" class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-calculator text-gray-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 id="generic-title" class="text-xl font-bold text-navy">Calculator</h2>
                            <p id="generic-subtitle" class="text-sm text-gray-500">Description</p>
                        </div>
                    </div>
                    <button onclick="closeModal('generic')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div id="generic-content" class="text-center py-8">
                    <div class="w-20 h-20 bg-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-wrench text-gold text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-navy mb-2">Coming Soon!</h3>
                    <p class="text-gray-500">This calculator is being developed by our medical team.</p>
                    <p class="text-sm text-gray-400 mt-2">Check back soon for updates.</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bottom Navigation -->
    <a href="tel:112" class="floating-emergency" title="Emergency: 112">
        <i class="fas fa-phone"></i>
    </a>
    
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="nav-item connect-btn">
                <i class="fas fa-video"></i>
                <span class="live-dot"></span>
                <span>Connect</span>
            </a>
            <a href="/care-team" class="nav-item">
                <i class="fas fa-user-doctor"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item active">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    
    <script>
        // Calculator Data
        const calculatorData = {
            'bmi': { title: 'BMI Calculator', icon: 'fa-weight', color: 'red' },
            'body-fat': { title: 'Body Fat %', icon: 'fa-percent', color: 'purple' },
            'blood-pressure': { title: 'Blood Pressure', icon: 'fa-heart', color: 'pink' },
            'heart-rate-zones': { title: 'Heart Rate Zones', icon: 'fa-heartbeat', color: 'rose' },
            'bariatric-eligibility': { title: 'Surgery Eligibility', icon: 'fa-clipboard-check', color: 'purple' },
            'weight-loss-projection': { title: 'Weight Loss Projection', icon: 'fa-chart-line', color: 'green' },
            'excess-weight': { title: 'Excess Weight', icon: 'fa-scale-unbalanced', color: 'indigo' },
            'protein-needs': { title: 'Protein Needs', icon: 'fa-drumstick-bite', color: 'orange' },
            'asa-score': { title: 'ASA Physical Status', icon: 'fa-hospital', color: 'blue' },
            'recovery-time': { title: 'Recovery Timeline', icon: 'fa-calendar-check', color: 'teal' },
            'surgical-risk': { title: 'Surgical Risk', icon: 'fa-triangle-exclamation', color: 'amber' },
            'pre-op-checklist': { title: 'Pre-Op Checklist', icon: 'fa-list-check', color: 'cyan' },
            'tdee': { title: 'TDEE Calculator', icon: 'fa-fire', color: 'orange' },
            'macros': { title: 'Macro Calculator', icon: 'fa-chart-pie', color: 'lime' },
            'water-intake': { title: 'Water Intake', icon: 'fa-droplet', color: 'sky' },
            'ideal-weight': { title: 'Ideal Weight', icon: 'fa-bullseye', color: 'emerald' },
            'metabolic-age': { title: 'Metabolic Age', icon: 'fa-hourglass-half', color: 'violet' },
            'sleep-quality': { title: 'Sleep Quality', icon: 'fa-moon', color: 'indigo' },
            'stress-assessment': { title: 'Stress Assessment', icon: 'fa-brain', color: 'fuchsia' },
            'biological-age': { title: 'Biological Age', icon: 'fa-dna', color: 'rose' },
            'cost-comparison': { title: 'Cost Comparison', icon: 'fa-euro-sign', color: 'yellow' },
            'total-trip-cost': { title: 'Total Trip Cost', icon: 'fa-calculator', color: 'amber' },
            'roi-calculator': { title: 'Health ROI', icon: 'fa-chart-line', color: 'green' }
        };
        
        // Open Calculator Modal
        function openCalculator(id) {
            // Calculators with custom modals
            const customModals = ['bmi', 'bariatric-eligibility', 'weight-loss-projection', 'cost-comparison'];
            
            if (customModals.includes(id)) {
                document.getElementById('modal-' + id).classList.add('active');
            } else {
                // Use generic modal
                const data = calculatorData[id] || { title: 'Calculator', icon: 'fa-calculator', color: 'gray' };
                document.getElementById('generic-title').textContent = data.title;
                document.getElementById('generic-subtitle').textContent = 'Health Calculator';
                document.getElementById('modal-generic').classList.add('active');
            }
        }
        
        // Close Modal
        function closeModal(id) {
            document.getElementById('modal-' + id).classList.remove('active');
        }
        
        // Close modal on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
        
        // Filter by Category
        function filterCategory(category) {
            // Update tabs
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                }
            });
            
            // Show/hide sections
            const sections = document.querySelectorAll('.category-section');
            const popularSection = document.getElementById('popular-section');
            
            if (category === 'all') {
                sections.forEach(s => s.style.display = 'block');
                popularSection.style.display = 'block';
            } else {
                popularSection.style.display = 'none';
                sections.forEach(s => {
                    s.style.display = s.dataset.category === category ? 'block' : 'none';
                });
            }
        }
        
        // BMI Calculator
        function calculateBMI() {
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            
            if (height && weight && height > 0) {
                const heightM = height / 100;
                const bmi = weight / (heightM * heightM);
                
                document.getElementById('bmi-result').classList.remove('hidden');
                document.getElementById('bmi-value').textContent = bmi.toFixed(1);
                
                // Determine category
                let category, color, arrowPos;
                if (bmi < 18.5) {
                    category = 'Underweight';
                    color = '#3B82F6';
                    arrowPos = (bmi / 18.5) * 16.67;
                } else if (bmi < 25) {
                    category = 'Normal Weight';
                    color = '#22C55E';
                    arrowPos = 16.67 + ((bmi - 18.5) / 6.5) * 16.67;
                } else if (bmi < 30) {
                    category = 'Overweight';
                    color = '#F59E0B';
                    arrowPos = 33.33 + ((bmi - 25) / 5) * 16.67;
                } else if (bmi < 35) {
                    category = 'Obese Class I';
                    color = '#EF4444';
                    arrowPos = 50 + ((bmi - 30) / 5) * 16.67;
                } else if (bmi < 40) {
                    category = 'Obese Class II';
                    color = '#DC2626';
                    arrowPos = 66.67 + ((bmi - 35) / 5) * 16.67;
                } else {
                    category = 'Obese Class III';
                    color = '#991B1B';
                    arrowPos = Math.min(83.33 + ((bmi - 40) / 10) * 16.67, 100);
                }
                
                document.getElementById('bmi-category').textContent = category;
                document.getElementById('bmi-category').style.color = color;
                document.getElementById('bmi-arrow').style.left = arrowPos + '%';
                
                // Healthy weight range
                const minHealthy = 18.5 * heightM * heightM;
                const maxHealthy = 24.9 * heightM * heightM;
                document.getElementById('bmi-healthy-range').textContent = 
                    minHealthy.toFixed(0) + ' - ' + maxHealthy.toFixed(0) + ' kg';
                
                // Weight to lose
                const targetWeight = 25 * heightM * heightM;
                const toLose = weight - targetWeight;
                document.getElementById('bmi-to-lose').textContent = 
                    toLose > 0 ? toLose.toFixed(1) + ' kg' : 'None needed';
                
                // Surgery recommendation
                const surgeryRec = document.getElementById('bmi-surgery-recommendation');
                if (bmi >= 35) {
                    surgeryRec.classList.remove('hidden');
                    if (bmi >= 40) {
                        document.getElementById('bmi-surgery-text').textContent = 
                            'With a BMI of ' + bmi.toFixed(1) + ', you may qualify for bariatric surgery. ' +
                            'Gastric Sleeve or Gastric Bypass could help you achieve significant, lasting weight loss.';
                    } else {
                        document.getElementById('bmi-surgery-text').textContent = 
                            'With a BMI of ' + bmi.toFixed(1) + ', you may qualify for bariatric surgery ' +
                            'if you have related health conditions like diabetes or hypertension.';
                    }
                } else {
                    surgeryRec.classList.add('hidden');
                }
            }
        }
        
        // Bariatric Eligibility Check
        function checkEligibility() {
            const height = parseFloat(document.getElementById('elig-height').value);
            const weight = parseFloat(document.getElementById('elig-weight').value);
            const age = parseFloat(document.getElementById('elig-age').value);
            
            if (height && weight && age) {
                const heightM = height / 100;
                const bmi = weight / (heightM * heightM);
                
                const diabetes = document.getElementById('elig-diabetes').checked;
                const hypertension = document.getElementById('elig-hypertension').checked;
                const apnea = document.getElementById('elig-apnea').checked;
                const joint = document.getElementById('elig-joint').checked;
                
                const hasComorbidities = diabetes || hypertension || apnea || joint;
                
                document.getElementById('eligibility-result').classList.remove('hidden');
                document.getElementById('elig-bmi-value').textContent = bmi.toFixed(1);
                
                let qualified = false;
                let reason = '';
                let procedures = '';
                
                if (bmi >= 40) {
                    qualified = true;
                    reason = 'BMI ≥ 40 qualifies for bariatric surgery without additional conditions.';
                    procedures = 'Sleeve, Bypass';
                } else if (bmi >= 35 && hasComorbidities) {
                    qualified = true;
                    reason = 'BMI 35-39.9 with obesity-related health conditions qualifies for surgery.';
                    procedures = 'Sleeve, Bypass';
                } else if (bmi >= 30 && diabetes) {
                    qualified = true;
                    reason = 'BMI 30-34.9 with uncontrolled Type 2 Diabetes may qualify for metabolic surgery.';
                    procedures = 'Sleeve, Bypass';
                } else if (bmi >= 35) {
                    qualified = false;
                    reason = 'BMI 35-39.9 typically requires at least one obesity-related condition to qualify.';
                } else {
                    qualified = false;
                    reason = 'BMI below 35 generally does not qualify for bariatric surgery. Consider non-surgical options.';
                }
                
                if (age < 18 || age > 70) {
                    qualified = false;
                    reason = 'Age must typically be between 18-70 for bariatric surgery eligibility.';
                }
                
                if (qualified) {
                    document.getElementById('elig-qualified').classList.remove('hidden');
                    document.getElementById('elig-not-qualified').classList.add('hidden');
                    document.getElementById('elig-reason').textContent = reason;
                    document.getElementById('elig-procedures').textContent = procedures;
                } else {
                    document.getElementById('elig-qualified').classList.add('hidden');
                    document.getElementById('elig-not-qualified').classList.remove('hidden');
                    document.getElementById('elig-not-reason').textContent = reason;
                }
            }
        }
        
        // Weight Loss Projection
        function calculateProjection() {
            const weight = parseFloat(document.getElementById('proj-weight').value);
            const height = parseFloat(document.getElementById('proj-height').value);
            const procedure = document.getElementById('proj-procedure').value;
            
            if (weight && height && procedure) {
                const heightM = height / 100;
                const idealWeight = 25 * heightM * heightM;
                const excessWeight = weight - idealWeight;
                
                let ewlPercent, timeline;
                switch (procedure) {
                    case 'gastric-sleeve':
                        ewlPercent = 0.65;
                        timeline = '12-18 months';
                        break;
                    case 'gastric-bypass':
                        ewlPercent = 0.75;
                        timeline = '12-18 months';
                        break;
                    case 'lap-band':
                        ewlPercent = 0.45;
                        timeline = '24-36 months';
                        break;
                    default:
                        return;
                }
                
                const totalLoss = excessWeight * ewlPercent;
                const weight6mo = weight - (totalLoss * 0.5);
                const weight12mo = weight - (totalLoss * 0.8);
                const weight18mo = weight - totalLoss;
                const finalBMI = weight18mo / (heightM * heightM);
                
                document.getElementById('projection-result').classList.remove('hidden');
                
                document.getElementById('proj-6mo').textContent = weight6mo.toFixed(0) + ' kg';
                document.getElementById('proj-6mo-loss').textContent = '-' + (totalLoss * 0.5).toFixed(0) + ' kg';
                
                document.getElementById('proj-12mo').textContent = weight12mo.toFixed(0) + ' kg';
                document.getElementById('proj-12mo-loss').textContent = '-' + (totalLoss * 0.8).toFixed(0) + ' kg';
                
                document.getElementById('proj-18mo').textContent = weight18mo.toFixed(0) + ' kg';
                document.getElementById('proj-18mo-loss').textContent = '-' + totalLoss.toFixed(0) + ' kg';
                
                document.getElementById('proj-ewl').textContent = (ewlPercent * 100) + '% EWL';
                document.getElementById('proj-target-bmi').textContent = finalBMI.toFixed(1);
            }
        }
        
        // Cost Comparison
        function calculateCost() {
            const select = document.getElementById('cost-procedure');
            const option = select.options[select.selectedIndex];
            
            if (option.value) {
                const germany = parseInt(option.dataset.germany);
                const turkey = parseInt(option.dataset.turkey);
                const selectPrice = parseInt(option.dataset.select);
                const savings = germany - selectPrice;
                const percent = ((savings / germany) * 100).toFixed(0);
                
                document.getElementById('cost-result').classList.remove('hidden');
                document.getElementById('cost-germany').textContent = '€' + germany.toLocaleString();
                document.getElementById('cost-turkey').textContent = '€' + turkey.toLocaleString();
                document.getElementById('cost-select').textContent = '€' + selectPrice.toLocaleString();
                document.getElementById('cost-savings').textContent = '€' + savings.toLocaleString();
                document.getElementById('cost-percent').textContent = percent + '% savings';
            }
        }
        
        // Save BMI Result
        function saveBMIResult() {
            const bmiValue = document.getElementById('bmi-value').textContent;
            const category = document.getElementById('bmi-category').textContent;
            
            // Show toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center';
            toast.innerHTML = '<i class="fas fa-check-circle mr-2"></i> BMI saved to your health profile!';
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 3000);
        }
    </script>
</body>
</html>`
}

// ============================================================================
// ROUTES
// ============================================================================

// Main calculators page
calculatorsRouter.get('/', (c) => {
  return c.html(getCalculatorsPage())
})

// API endpoints for calculators
calculatorsRouter.get('/api/list', (c) => {
  return c.json({
    success: true,
    categories: CALCULATOR_CATEGORIES,
    calculators: CALCULATORS,
    total: CALCULATORS.length
  })
})

calculatorsRouter.post('/api/bmi', async (c) => {
  const { height, weight } = await c.req.json()
  
  if (!height || !weight) {
    return c.json({ error: 'Height and weight required' }, 400)
  }
  
  const heightM = height / 100
  const bmi = weight / (heightM * heightM)
  
  let category, risk
  if (bmi < 18.5) {
    category = 'Underweight'
    risk = 'low'
  } else if (bmi < 25) {
    category = 'Normal'
    risk = 'normal'
  } else if (bmi < 30) {
    category = 'Overweight'
    risk = 'elevated'
  } else if (bmi < 35) {
    category = 'Obese Class I'
    risk = 'high'
  } else if (bmi < 40) {
    category = 'Obese Class II'
    risk = 'very_high'
  } else {
    category = 'Obese Class III'
    risk = 'extremely_high'
  }
  
  const idealWeight = 24.9 * heightM * heightM
  const excessWeight = Math.max(0, weight - idealWeight)
  
  return c.json({
    success: true,
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    risk,
    idealWeight: parseFloat(idealWeight.toFixed(1)),
    excessWeight: parseFloat(excessWeight.toFixed(1)),
    surgeryEligible: bmi >= 35,
    recommendations: bmi >= 40 ? ['Gastric Sleeve', 'Gastric Bypass'] : 
                     bmi >= 35 ? ['Gastric Sleeve', 'Gastric Bypass (with comorbidities)'] : []
  })
})

calculatorsRouter.post('/api/eligibility', async (c) => {
  const { height, weight, age, comorbidities } = await c.req.json()
  
  const heightM = height / 100
  const bmi = weight / (heightM * heightM)
  const hasComorbidities = comorbidities && comorbidities.length > 0
  
  let eligible = false
  let reason = ''
  let procedures: string[] = []
  
  if (age < 18 || age > 70) {
    reason = 'Age must be between 18-70 for bariatric surgery'
  } else if (bmi >= 40) {
    eligible = true
    reason = 'BMI ≥ 40 qualifies for bariatric surgery'
    procedures = ['Gastric Sleeve', 'Gastric Bypass']
  } else if (bmi >= 35 && hasComorbidities) {
    eligible = true
    reason = 'BMI 35-39.9 with comorbidities qualifies'
    procedures = ['Gastric Sleeve', 'Gastric Bypass']
  } else if (bmi >= 30 && comorbidities?.includes('diabetes')) {
    eligible = true
    reason = 'BMI 30-34.9 with diabetes may qualify for metabolic surgery'
    procedures = ['Gastric Sleeve']
  } else {
    reason = 'Does not meet standard bariatric surgery criteria'
  }
  
  return c.json({
    success: true,
    eligible,
    bmi: parseFloat(bmi.toFixed(1)),
    reason,
    procedures,
    recommendation: eligible ? 'Schedule a free consultation' : 'Consider non-surgical options'
  })
})

calculatorsRouter.post('/api/weight-projection', async (c) => {
  const { currentWeight, height, procedure } = await c.req.json()
  
  const heightM = height / 100
  const idealWeight = 25 * heightM * heightM
  const excessWeight = currentWeight - idealWeight
  
  const ewlRates: Record<string, number> = {
    'gastric-sleeve': 0.65,
    'gastric-bypass': 0.75,
    'lap-band': 0.45
  }
  
  const ewlRate = ewlRates[procedure] || 0.65
  const totalLoss = excessWeight * ewlRate
  
  return c.json({
    success: true,
    currentWeight,
    idealWeight: parseFloat(idealWeight.toFixed(1)),
    excessWeight: parseFloat(excessWeight.toFixed(1)),
    expectedLoss: parseFloat(totalLoss.toFixed(1)),
    ewlPercent: ewlRate * 100,
    projections: {
      month6: parseFloat((currentWeight - totalLoss * 0.5).toFixed(1)),
      month12: parseFloat((currentWeight - totalLoss * 0.8).toFixed(1)),
      month18: parseFloat((currentWeight - totalLoss).toFixed(1))
    },
    finalBMI: parseFloat(((currentWeight - totalLoss) / (heightM * heightM)).toFixed(1))
  })
})

export default calculatorsRouter
