/**
 * SelectCareOS™ Patient Dashboard
 * Comprehensive health monitoring, calculators, and journey tracking
 * Inspired by SurgeryBridge design with enhanced health tools
 * 
 * Multi-language support: EN, AR, DE, FR
 */

import { LANGUAGE_CONFIG, DASHBOARD_TRANSLATIONS, type SupportedLanguage } from '../services/dashboard-i18n'

// Helper function for translations
const t = (key: string, lang: SupportedLanguage) => DASHBOARD_TRANSLATIONS[lang]?.[key] || DASHBOARD_TRANSLATIONS.en[key] || key
const getDir = (lang: SupportedLanguage) => LANGUAGE_CONFIG[lang]?.dir || 'ltr'

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

export const patientDashboardPage = (lang: SupportedLanguage = 'en') => {
  const dir = getDir(lang)
  const langOptions = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${config.flag} ${config.nativeName}</option>`)
    .join('')
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard - SelectCareOS™</title>
    <meta name="description" content="Your personalized health dashboard with calculators, journey tracking, and real-time vitals monitoring.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --navy-dark: #001529;
            --gold: #D4A843;
            --gold-bright: #E8C158;
            --gold-light: #F5E6C0;
            --gold-warm: #B8941F;
            --gold-glow: rgba(212, 168, 67, 0.4);
            --cream: #FDFBF7;
            --cream-warm: #FDF8EC;
        }
        
        /* ═══════════════════════════════════════════════════════════════
           MOBILE SCROLLING & VIEWPORT FIX - v2.5.1
           Ensures proper scrolling and prevents content cutoff on mobile
           ═══════════════════════════════════════════════════════════════ */
        html {
            overflow-x: hidden;
            overflow-y: auto;
            height: 100%;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(180deg, var(--cream-warm) 0%, var(--cream) 50%, #F5F0E6 100%);
            min-height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        /* Mobile-specific viewport fixes */
        @media (max-width: 768px) {
            html, body {
                overflow-y: auto !important;
                height: auto !important;
                min-height: 100vh;
            }
            
            /* Ensure tab content scrolls properly */
            .tab-content {
                overflow: visible;
                min-height: auto;
            }
            
            /* Fix main content area */
            main {
                overflow: visible;
                position: relative;
            }
        }
        
        .bg-navy { background-color: var(--navy); }
        .bg-navy-light { background-color: var(--navy-light); }
        .bg-gold { background-color: var(--gold); }
        .bg-gold-light { background-color: var(--gold-light); }
        .bg-gold-bright { background-color: var(--gold-bright); }
        .bg-cream { background-color: var(--cream); }
        .bg-cream-warm { background-color: var(--cream-warm); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .text-gold-bright { color: var(--gold-bright); }
        .border-gold { border-color: var(--gold); }
        .border-navy { border-color: var(--navy); }
        
        /* Premium Gold Gradient Variations */
        .gradient-navy {
            background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-light) 100%);
        }
        
        .gradient-gold {
            background: linear-gradient(135deg, var(--gold-warm) 0%, var(--gold) 50%, var(--gold-bright) 100%);
        }
        
        .gradient-gold-subtle {
            background: linear-gradient(135deg, rgba(212, 168, 67, 0.08) 0%, rgba(232, 193, 88, 0.15) 100%);
        }
        
        .gradient-gold-radial {
            background: radial-gradient(ellipse at top right, rgba(232, 193, 88, 0.2) 0%, transparent 50%);
        }
        
        /* Gold Shimmer Animation */
        @keyframes goldShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        .shimmer-gold {
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-bright) 25%, #F7E199 50%, var(--gold-bright) 75%, var(--gold) 100%);
            background-size: 200% 100%;
            animation: goldShimmer 3s ease infinite;
        }
        
        /* Gold Glow Effect */
        .glow-gold {
            box-shadow: 0 0 20px var(--gold-glow), 0 0 40px rgba(212, 168, 67, 0.2);
        }
        
        .glow-gold-subtle {
            box-shadow: 0 4px 20px rgba(212, 168, 67, 0.15), 0 0 30px rgba(212, 168, 67, 0.1);
        }
        
        /* Glassmorphism with Gold Tint */
        .glass-gold {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 248, 236, 0.9) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 168, 67, 0.2);
        }
        
        .glass-navy {
            background: linear-gradient(135deg, rgba(0, 31, 63, 0.95) 0%, rgba(0, 51, 102, 0.9) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 168, 67, 0.3);
        }
        
        .card {
            background: linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%);
            border-radius: 20px;
            box-shadow: 
                0 4px 20px rgba(0, 31, 63, 0.06),
                0 1px 3px rgba(0, 31, 63, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(212, 168, 67, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
            box-shadow: 
                0 8px 30px rgba(0, 31, 63, 0.1),
                0 2px 8px rgba(212, 168, 67, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.9);
            border-color: rgba(212, 168, 67, 0.2);
        }
        
        .card-premium {
            background: linear-gradient(145deg, #FFFFFF 0%, var(--cream-warm) 100%);
            border-radius: 24px;
            box-shadow: 
                0 8px 32px rgba(0, 31, 63, 0.08),
                0 2px 8px rgba(212, 168, 67, 0.08);
            border: 1px solid rgba(212, 168, 67, 0.15);
            position: relative;
            overflow: hidden;
        }
        
        .card-premium::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold-warm), var(--gold), var(--gold-bright));
        }
        
        .calculator-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
            bottom: 0;
            background: radial-gradient(circle at 50% 0%, rgba(212, 168, 67, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .calculator-card:hover::before {
            opacity: 1;
        }
        
        .calculator-card:hover {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 
                0 20px 40px rgba(0, 31, 63, 0.12),
                0 8px 16px rgba(212, 168, 67, 0.1);
            border-color: var(--gold);
        }
        
        .metric-card {
            background: linear-gradient(180deg, #FFFFFF 0%, var(--cream-warm) 100%);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            position: relative;
            overflow: hidden;
        }
        
        .metric-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .metric-card:hover {
            background: linear-gradient(180deg, #FFFFFF 0%, var(--gold-light) 100%);
            border-color: rgba(212, 168, 67, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(212, 168, 67, 0.15);
        }
        
        .metric-card:hover::after {
            opacity: 1;
        }
        
        .progress-ring {
            transform: rotate(-90deg);
            filter: drop-shadow(0 2px 4px rgba(212, 168, 67, 0.3));
        }
        
        .progress-ring-circle {
            transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-connector {
            position: absolute;
            left: 23px;
            top: 48px;
            bottom: -16px;
            width: 3px;
            background: linear-gradient(180deg, var(--gold) 0%, var(--gold-light) 50%, rgba(212, 168, 67, 0.2) 100%);
            border-radius: 2px;
        }
        
        .phase-dot {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .phase-completed { 
            background: linear-gradient(135deg, #059669 0%, #10B981 100%); 
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        
        .phase-in-progress { 
            background: linear-gradient(135deg, var(--gold-warm) 0%, var(--gold-bright) 100%);
            color: var(--navy); 
            animation: pulseGold 2s infinite;
            box-shadow: 0 4px 20px var(--gold-glow);
        }
        
        .phase-pending { 
            background: linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 100%); 
            color: #9CA3AF;
        }
        
        @keyframes pulseGold {
            0%, 100% { 
                box-shadow: 0 0 0 0 var(--gold-glow), 0 4px 20px var(--gold-glow);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 0 12px rgba(212, 168, 67, 0), 0 4px 25px var(--gold-glow);
                transform: scale(1.05);
            }
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
        }
        
        .float-animation {
            animation: float 4s ease-in-out infinite;
        }
        
        /* Stagger Animation */
        @keyframes staggerFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-item {
            animation: staggerFadeIn 0.5s ease forwards;
            opacity: 0;
        }
        
        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }
        .stagger-item:nth-child(5) { animation-delay: 0.5s; }
        .stagger-item:nth-child(6) { animation-delay: 0.6s; }
        
        /* ═══════════════════════════════════════════════════════════════
           MOBILE-OPTIMIZED TOP TAB NAVIGATION - Enhanced UX v2.5.1
           Ensures Treatments & Retreats tabs are visible on all devices
           ═══════════════════════════════════════════════════════════════ */
        .top-tabs-container {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            padding-left: 4px;
            padding-right: 16px;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-snap-type: x proximity;
        }
        .top-tabs-container::-webkit-scrollbar {
            display: none;
        }
        
        /* Tab scroll indicators for mobile */
        .top-tabs-wrapper {
            position: relative;
        }
        .top-tabs-wrapper::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 8px;
            width: 40px;
            background: linear-gradient(90deg, transparent, var(--navy));
            pointer-events: none;
            opacity: 0.9;
            z-index: 5;
        }
        @media (min-width: 1024px) {
            .top-tabs-wrapper::after {
                display: none;
            }
        }
        
        .tab-button {
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 13px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            flex-shrink: 0;
            scroll-snap-align: start;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            min-height: 44px; /* Touch-friendly minimum */
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Mobile-specific tab sizing */
        @media (max-width: 640px) {
            .tab-button {
                padding: 8px 14px;
                font-size: 12px;
                border-radius: 20px;
            }
            .tab-button i {
                font-size: 12px !important;
            }
            .top-tabs-container {
                gap: 6px;
            }
        }
        
        @media (min-width: 641px) and (max-width: 1023px) {
            .tab-button {
                padding: 10px 18px;
                font-size: 13px;
            }
        }
        
        @media (min-width: 1024px) {
            .tab-button {
                padding: 12px 28px;
                font-size: 14px;
            }
            .top-tabs-container {
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                overflow: visible;
            }
        }
        
        .tab-button.active {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%);
            color: var(--navy);
            box-shadow: 0 4px 15px var(--gold-glow);
        }
        
        .tab-button:not(.active) {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .tab-button:not(.active):hover {
            background: rgba(212, 168, 67, 0.2);
            border-color: var(--gold);
            color: var(--gold-bright);
        }
        
        /* Active touch state */
        .tab-button:active {
            transform: scale(0.97);
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
            padding: 14px 18px;
            border: 2px solid #E5E7EB;
            border-radius: 14px;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%);
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 4px rgba(212, 168, 67, 0.15), 0 4px 12px rgba(212, 168, 67, 0.1);
            background: #FFFFFF;
        }
        
        .input-field:hover:not(:focus) {
            border-color: rgba(212, 168, 67, 0.4);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%);
            color: var(--navy);
            padding: 14px 32px;
            border-radius: 30px;
            font-weight: 700;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px var(--gold-glow);
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, var(--gold-warm) 0%, var(--gold) 100%);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 25px var(--gold-glow);
        }
        
        .btn-primary:active {
            transform: translateY(0) scale(0.98);
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%);
            color: white;
            padding: 14px 32px;
            border-radius: 30px;
            font-weight: 700;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid transparent;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 31, 63, 0.3);
        }
        
        .btn-secondary:hover {
            border-color: var(--gold);
            box-shadow: 0 8px 25px rgba(0, 31, 63, 0.4);
            transform: translateY(-2px);
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
        
        .status-completed { 
            background: linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%); 
            color: #166534;
            border: 1px solid rgba(22, 101, 52, 0.2);
        }
        .status-in-progress { 
            background: linear-gradient(135deg, var(--gold-light) 0%, rgba(232, 193, 88, 0.3) 100%); 
            color: var(--navy);
            border: 1px solid var(--gold);
            box-shadow: 0 2px 8px var(--gold-glow);
        }
        .status-pending { 
            background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%); 
            color: #6B7280;
            border: 1px solid rgba(156, 163, 175, 0.2);
        }
        
        /* ════════════════════════════════════════════════════════════════
           UNIFIED BOTTOM NAVIGATION - SelectCareOS Branding (Navy/Gold)
           Consistent across all viewports - Healthcare-First Design
           ════════════════════════════════════════════════════════════════ */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%);
            border-top: 2px solid transparent;
            border-image: linear-gradient(90deg, transparent 10%, var(--gold) 50%, transparent 90%) 1;
            padding: 10px 0 max(14px, env(safe-area-inset-bottom));
            z-index: 1000;
            box-shadow: 0 -4px 20px rgba(0, 31, 63, 0.08), 0 -1px 4px rgba(212, 168, 67, 0.1);
        }
        .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
            padding: 0 12px;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 14px;
            color: #6B7280;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 12px;
            min-width: 60px;
            position: relative;
        }
        .nav-item i { 
            font-size: 22px; 
            margin-bottom: 5px; 
            transition: all 0.3s ease;
        }
        .nav-item span { white-space: nowrap; letter-spacing: 0.3px; }
        .nav-item:hover { 
            color: var(--navy); 
            background: linear-gradient(135deg, rgba(212, 168, 67, 0.1) 0%, rgba(232, 193, 88, 0.05) 100%);
            transform: translateY(-2px);
        }
        .nav-item:hover i { transform: scale(1.15); color: var(--gold); }
        .nav-item.active { 
            color: var(--navy); 
            background: linear-gradient(135deg, rgba(212, 168, 67, 0.2) 0%, rgba(232, 193, 88, 0.1) 100%);
            box-shadow: 0 4px 12px rgba(212, 168, 67, 0.2);
        }
        .nav-item.active i { 
            transform: scale(1.15); 
            color: var(--gold-bright);
            filter: drop-shadow(0 2px 4px rgba(212, 168, 67, 0.4));
        }
        .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), var(--gold-bright));
            border-radius: 2px;
        }
        .nav-item.connect-btn { position: relative; }
        .nav-item.connect-btn .live-dot {
            position: absolute;
            top: 6px;
            right: 14px;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #22C55E, #10B981);
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse-dot 2s infinite;
            box-shadow: 0 2px 6px rgba(34, 197, 94, 0.4);
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            50% { opacity: 0.9; transform: scale(1.1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
        }
        .floating-emergency {
            position: fixed;
            bottom: 100px;
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
        .floating-emergency:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(220, 38, 38, 0.5); }
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
        @media (max-width: 360px) {
            .nav-item { padding: 6px 10px; min-width: 52px; }
            .nav-item i { font-size: 20px; }
            .nav-item span { font-size: 10px; }
        }
        /* Desktop: Show bottom nav as sidebar-style footer nav */
        @media (min-width: 768px) {
            .bottom-nav { 
                background: linear-gradient(90deg, var(--navy) 0%, var(--navy-light) 100%);
                border-top: none;
                border-image: none;
                padding: 12px 0;
                box-shadow: 0 -4px 30px rgba(0, 31, 63, 0.15);
            }
            .bottom-nav-container {
                max-width: 800px;
                padding: 0 24px;
            }
            .nav-item {
                flex-direction: row;
                gap: 8px;
                padding: 10px 20px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 13px;
                border-radius: 30px;
            }
            .nav-item i { 
                font-size: 18px; 
                margin-bottom: 0;
            }
            .nav-item:hover {
                color: white;
                background: rgba(212, 168, 67, 0.2);
                transform: translateY(0);
            }
            .nav-item:hover i { color: var(--gold-bright); }
            .nav-item.active {
                color: var(--navy);
                background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%);
                box-shadow: 0 4px 15px rgba(212, 168, 67, 0.4);
            }
            .nav-item.active i { color: var(--navy); filter: none; }
            .nav-item.active::after { display: none; }
            .floating-emergency { bottom: 100px; right: 24px; width: 64px; height: 64px; font-size: 26px; }
        }
        @media (min-width: 1024px) {
            .bottom-nav-container { max-width: 900px; }
            .nav-item { padding: 12px 24px; font-size: 14px; }
        }
        main { padding-bottom: 110px; }
    </style>
</head>
<body class="bg-cream">
    <!-- Header - Premium Gold Tint Design -->
    <header class="gradient-navy relative overflow-hidden">
        <!-- Decorative gold accent lines -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"></div>
        <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        <!-- Radial gold glow effect -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-gold/5 to-transparent rounded-full blur-2xl"></div>
        
        <div class="max-w-7xl mx-auto px-4 py-6 relative z-10">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <a href="/" class="group flex items-center">
                        <span class="text-2xl font-bold text-white group-hover:text-gold-light transition-colors">
                            SelectCare<span class="text-gold group-hover:text-gold-bright transition-colors">OS</span>™
                        </span>
                    </a>
                    <span class="px-4 py-1.5 bg-gradient-to-r from-gold/20 to-gold/10 text-gold text-sm rounded-full border border-gold/30 backdrop-blur-sm">
                        <i class="fas fa-user-shield mr-1.5 text-xs"></i>${t('header.patientPortal', lang)}
                    </span>
                </div>
                <div class="flex items-center space-x-3">
                    <!-- Language Selector -->
                    <select id="languageSelect" onchange="changeLanguage(this.value)" 
                            class="appearance-none bg-white/10 text-white px-4 py-2 pr-8 rounded-xl text-sm cursor-pointer hover:bg-gold/20 hover:border-gold/50 transition-all border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gold/50">
                        ${langOptions}
                    </select>
                    <button class="relative w-11 h-11 bg-white/10 hover:bg-gold/20 rounded-xl flex items-center justify-center text-white hover:text-gold transition-all border border-white/10 hover:border-gold/30" title="${t('header.notifications', lang)}">
                        <i class="fas fa-bell"></i>
                        <span id="notification-badge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg hidden">3</span>
                    </button>
                    <button class="w-11 h-11 bg-white/10 hover:bg-gold/20 rounded-xl flex items-center justify-center text-white hover:text-gold transition-all border border-white/10 hover:border-gold/30" title="${t('header.settings', lang)}">
                        <i class="fas fa-cog"></i>
                    </button>
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center text-navy font-bold shadow-lg shadow-gold/30 border-2 border-gold-light/50">
                        SM
                    </div>
                </div>
            </div>
            
            <!-- Tab Navigation - Mobile Optimized -->
            <div class="top-tabs-wrapper mt-6">
            <div class="top-tabs-container ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
                <button class="tab-button active" onclick="showTab('overview')">
                    <i class="fas fa-home ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.overview', lang)}
                </button>
                <button class="tab-button" onclick="showTab('calculators')">
                    <i class="fas fa-calculator ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.calculators', lang)}
                </button>
                <button class="tab-button" onclick="showTab('journey')">
                    <i class="fas fa-road ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.journey', lang)}
                </button>
                <button class="tab-button" onclick="showTab('treatments')">
                    <i class="fas fa-stethoscope ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.treatments', lang)}
                </button>
                <button class="tab-button" onclick="showTab('retreats')">
                    <i class="fas fa-spa ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.retreats', lang)}
                </button>
                <button class="tab-button" onclick="showTab('vitals')">
                    <i class="fas fa-heartbeat ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.vitals', lang)}
                </button>
                <button class="tab-button" onclick="showTab('appointments')">
                    <i class="fas fa-calendar ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('nav.appointments', lang)}
                </button>
            </div>
            </div><!-- end top-tabs-wrapper -->
        </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
        <!-- OVERVIEW TAB -->
        <div id="tab-overview" class="tab-content">
            <!-- Welcome Banner - Premium Gold Design -->
            <div class="relative rounded-3xl p-8 mb-8 overflow-hidden" style="background: linear-gradient(135deg, #D4A843 0%, #E8C158 50%, #F5E6C0 100%);">
                <!-- Decorative elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/15 rounded-full translate-y-1/3 -translate-x-1/4 blur-xl"></div>
                <div class="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-lg float-animation"></div>
                
                <!-- Pattern overlay -->
                <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23001F3F\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-3">
                            <span class="px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full backdrop-blur-sm">
                                <i class="fas fa-shield-alt mr-1"></i>VERIFIED PATIENT
                            </span>
                            <span class="px-3 py-1 bg-white/30 text-navy text-xs font-semibold rounded-full backdrop-blur-sm">
                                <i class="fas fa-award mr-1"></i>SELECTCARE+
                            </span>
                        </div>
                        <h1 class="text-3xl md:text-4xl font-bold text-navy mb-2">${t('welcome.back', lang)} Sherif! 👋</h1>
                        <p class="text-navy/80 text-lg flex items-center gap-2">
                            <i class="fas fa-calendar-check"></i>
                            ${t('welcome.nextAppointment', lang)} <span class="font-bold text-navy">3 ${t('welcome.days', lang)}</span>
                        </p>
                        <div class="mt-4 flex flex-wrap gap-2">
                            <a href="/instant-connect" class="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-gold rounded-xl font-semibold text-sm hover:bg-navy-light transition-all shadow-lg">
                                <i class="fas fa-video"></i>Quick Consult
                            </a>
                            <a href="/medisense" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/40 text-navy rounded-xl font-semibold text-sm hover:bg-white/60 transition-all backdrop-blur-sm border border-navy/10">
                                <i class="fas fa-brain"></i>Ask MediSense AI
                            </a>
                        </div>
                    </div>
                    <div class="mt-6 md:mt-0 flex items-center gap-8">
                        <div class="text-center">
                            <div class="text-4xl font-bold text-navy">35<span class="text-2xl">%</span></div>
                            <div class="text-sm text-navy/70 font-medium">${t('welcome.journeyProgress', lang)}</div>
                            <div class="mt-2 flex items-center gap-1 text-xs text-navy/60">
                                <i class="fas fa-arrow-up text-green-600"></i>
                                <span>+5% this week</span>
                            </div>
                        </div>
                        <div class="relative w-28 h-28">
                            <!-- Glow effect behind ring -->
                            <div class="absolute inset-2 bg-navy/10 rounded-full blur-md"></div>
                            <svg class="progress-ring relative z-10" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#001F3F;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#003366;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,31,63,0.15)" stroke-width="10"/>
                                <circle class="progress-ring-circle" cx="50" cy="50" r="40" fill="none" stroke="url(#progressGradient)" stroke-width="10" stroke-linecap="round" stroke-dasharray="251" stroke-dashoffset="163"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="text-center">
                                    <div class="text-xs text-navy/60">Phase</div>
                                    <div class="text-sm font-bold text-navy">2/6</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Stats - Premium Gold Tint Design -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="card-premium p-5 stagger-item group cursor-pointer" onclick="openTrackingChart('heartRate')">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="fas fa-heartbeat text-red-500 text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                            <i class="fas fa-check-circle mr-1"></i>${t('stats.normal', lang)}
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-navy" id="heart-rate">72</div>
                    <div class="text-sm text-gray-500 flex items-center justify-between">
                        <span>${t('stats.heartRate', lang)}</span>
                        <span class="text-xs text-gray-400">bpm</span>
                    </div>
                    <div class="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full w-3/4 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    </div>
                </div>
                
                <div class="card-premium p-5 stagger-item group cursor-pointer" onclick="openTrackingChart('weight')">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="fas fa-weight text-purple-500 text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                            <i class="fas fa-arrow-down mr-1"></i>-8.4 kg
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-navy">82.4</div>
                    <div class="text-sm text-gray-500 flex items-center justify-between">
                        <span>${t('stats.weight', lang)}</span>
                        <span class="text-xs text-gray-400">kg</span>
                    </div>
                    <div class="mt-2 flex items-center gap-1">
                        <div class="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full w-2/3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                        </div>
                        <span class="text-xs text-purple-500 font-medium">→75kg</span>
                    </div>
                </div>
                
                <div class="card-premium p-5 stagger-item group cursor-pointer" onclick="openTrackingChart('steps')">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="fas fa-walking text-green-500 text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                            <i class="fas fa-chart-line mr-1"></i>70%
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-navy" id="steps-today">5,240</div>
                    <div class="text-sm text-gray-500 flex items-center justify-between">
                        <span>${t('stats.stepsToday', lang)}</span>
                        <span class="text-xs text-gray-400">/7,500</span>
                    </div>
                    <div class="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full w-[70%] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                    </div>
                </div>
                
                <div class="card-premium p-5 stagger-item group cursor-pointer" onclick="openTrackingChart('oxygen')">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="fas fa-lungs text-blue-500 text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                            <i class="fas fa-star mr-1"></i>Optimal
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-navy">98<span class="text-lg">%</span></div>
                    <div class="text-sm text-gray-500 flex items-center justify-between">
                        <span>SpO2</span>
                        <span class="text-xs text-green-500">Excellent</span>
                    </div>
                    <div class="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full w-[98%] bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"></div>
                    </div>
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
                    
                    <!-- Health Calculators Quick Access - Enhanced Premium Design -->
                    <div class="card-premium p-6">
                        <div class="flex items-center justify-between mb-5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                                    <i class="fas fa-calculator text-gold text-lg"></i>
                                </div>
                                <div>
                                    <h2 class="text-lg font-bold text-navy">Health Calculators</h2>
                                    <p class="text-xs text-gray-500">Track & optimize your health metrics</p>
                                </div>
                            </div>
                            <a href="/calculators" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/10 to-gold/5 text-gold font-semibold text-sm rounded-xl hover:from-gold/20 hover:to-gold/10 transition-all border border-gold/20">
                                View All <i class="fas fa-arrow-right text-xs"></i>
                            </a>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="calculator-card p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl text-center border border-blue-100/50 group" onclick="openCalculator('bmi')">
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-weight text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">BMI</div>
                                <div class="text-xs text-gray-500">Body Mass Index</div>
                            </div>
                            <div class="calculator-card p-5 bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl text-center border border-purple-100/50 group" onclick="openCalculator('body-fat')">
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-percent text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">Body Fat</div>
                                <div class="text-xs text-gray-500">Fat Percentage</div>
                            </div>
                            <div class="calculator-card p-5 bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl text-center border border-red-100/50 group" onclick="openCalculator('asa')">
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-hospital text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">ASA Risk</div>
                                <div class="text-xs text-gray-500">Anesthesia Risk</div>
                            </div>
                            <div class="calculator-card p-5 bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl text-center border border-green-100/50 group" onclick="openCalculator('recovery')">
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-calendar-check text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">Recovery</div>
                                <div class="text-xs text-gray-500">Time Estimate</div>
                            </div>
                            <div class="calculator-card p-5 bg-gradient-to-br from-amber-50 to-yellow-50/50 rounded-2xl text-center border border-amber-100/50 group relative" onclick="openCalculator('cost')">
                                <span class="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-gold to-gold-bright text-navy text-[10px] font-bold rounded-full shadow">SAVE 75%</span>
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/30 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-euro-sign text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">Savings</div>
                                <div class="text-xs text-gray-500">Cost Calculator</div>
                            </div>
                            <div class="calculator-card p-5 bg-gradient-to-br from-cyan-50 to-blue-50/50 rounded-2xl text-center border border-cyan-100/50 group" onclick="openCalculator('ideal-weight')">
                                <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-bullseye text-2xl text-white"></i>
                                </div>
                                <div class="font-bold text-navy">Ideal Weight</div>
                                <div class="text-xs text-gray-500">Goal Setting</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- AI Insights - Modern Premium Design -->
                    <a href="/medisense" class="block card p-6 border-l-4 border-gold hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gradient-to-r from-white via-white to-amber-50/30">
                        <div class="flex items-start space-x-4">
                            <div class="relative flex-shrink-0">
                                <!-- Premium AI Icon -->
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold via-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg class="w-7 h-7 text-navy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <!-- Brain/AI Neural Network Icon -->
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                        <path d="M9 21v-2M15 21v-2M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <circle cx="9" cy="9" r="1" fill="currentColor"/>
                                        <circle cx="15" cy="9" r="1" fill="currentColor"/>
                                        <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                        <path d="M9 9l3 3M15 9l-3 3" stroke="currentColor" stroke-width="1"/>
                                    </svg>
                                </div>
                                <!-- Animated glow -->
                                <div class="absolute -inset-1 bg-gradient-to-r from-gold to-amber-400 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
                                <!-- Status indicator -->
                                <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <h3 class="font-bold text-navy text-lg">AI Health Insight</h3>
                                    <span class="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full flex items-center gap-1">
                                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                        LIVE
                                    </span>
                                </div>
                                <p class="text-gray-600 mb-4 leading-relaxed">Based on your recent data, your cardiovascular health is improving. Your resting heart rate has decreased by <strong class="text-navy">5 bpm</strong> over the past 2 weeks, indicating better fitness. Consider increasing your daily steps to <strong class="text-gold">7,500</strong> for optimal pre-surgical conditioning.</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2 text-gold font-semibold group-hover:text-amber-600 transition-colors">
                                        <span>Explore Full Analysis</span>
                                        <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                        </svg>
                                    </div>
                                    <span class="text-xs text-gray-400 flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        Updated 2 hours ago
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                
                <!-- Right Column -->
                <div class="space-y-6">
                    <!-- Upcoming Appointments - Premium Gold Design -->
                    <div class="card-premium p-6">
                        <div class="flex items-center gap-3 mb-5">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                                <i class="fas fa-calendar-alt text-gold text-lg"></i>
                            </div>
                            <h2 class="text-lg font-bold text-navy">Upcoming Appointments</h2>
                        </div>
                        <div class="space-y-4">
                            <!-- Next Appointment - Highlighted -->
                            <div class="relative p-5 bg-gradient-to-br from-navy via-navy to-navy-light rounded-2xl text-white overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                                <!-- Decorative gold accents -->
                                <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-full"></div>
                                <div class="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gold/10 to-transparent rounded-tr-full"></div>
                                
                                <div class="relative z-10">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="px-3 py-1 bg-gradient-to-r from-gold to-gold-bright text-navy text-xs font-bold rounded-full flex items-center gap-1">
                                            <span class="w-1.5 h-1.5 bg-navy rounded-full animate-pulse"></span>
                                            NEXT APPOINTMENT
                                        </span>
                                        <span class="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                                            <i class="fas fa-video text-green-400"></i>Video Call
                                        </span>
                                    </div>
                                    <div class="font-bold text-lg mb-1">Cardiology Follow-up</div>
                                    <div class="flex items-center gap-2 text-gold text-sm mb-4">
                                        <i class="fas fa-clock"></i>
                                        <span class="font-semibold">Oct 22, 10:00 AM</span>
                                        <span class="text-white/50">•</span>
                                        <span class="text-white/70">In 3 days</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 bg-gradient-to-br from-gold to-gold-bright rounded-xl flex items-center justify-center text-navy text-sm font-bold shadow-lg">KM</div>
                                            <div>
                                                <div class="font-medium">Dr. K. Müller</div>
                                                <div class="text-xs text-gray-300 flex items-center gap-1">
                                                    <i class="fas fa-stethoscope text-gold/70"></i>Cardiologist
                                                </div>
                                            </div>
                                        </div>
                                        <button onclick="joinVideoCall('appt_001')" class="px-4 py-2 bg-gradient-to-r from-gold to-gold-bright text-navy font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all">
                                            Join <i class="fas fa-arrow-right ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Upcoming Appointment -->
                            <div class="p-4 bg-gradient-to-br from-cream-warm to-cream rounded-2xl border border-gold/10 hover:border-gold/30 transition-all cursor-pointer">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-navy/70 text-xs font-semibold">UPCOMING</span>
                                    <span class="text-xs bg-white px-2 py-1 rounded-full border border-gray-200 flex items-center gap-1">
                                        <i class="fas fa-user text-navy/60"></i>In Person
                                    </span>
                                </div>
                                <div class="font-bold text-navy">Nutrition Review</div>
                                <div class="flex items-center gap-2 text-gold text-sm mb-3">
                                    <i class="fas fa-clock text-xs"></i>
                                    <span>Nov 5, 2:00 PM</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center text-white text-xs font-bold">AS</div>
                                    <div>
                                        <div class="text-sm font-medium text-navy">Dr. A. Schmidt</div>
                                        <div class="text-xs text-gray-500">Nutritionist</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="w-full mt-5 py-3.5 border-2 border-gold text-gold rounded-xl font-bold hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright hover:text-navy hover:border-transparent transition-all flex items-center justify-center gap-2">
                            <i class="fas fa-plus"></i>Book New Appointment
                        </button>
                    </div>
                    
                    <!-- Care Team - Enhanced Premium Design -->
                    <div class="card-premium p-6">
                        <div class="flex items-center justify-between mb-5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                                    <i class="fas fa-user-md text-gold text-lg"></i>
                                </div>
                                <h2 class="text-lg font-bold text-navy">Your Care Team</h2>
                            </div>
                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Available
                            </span>
                        </div>
                        <div class="space-y-3">
                            <!-- Lead Surgeon -->
                            <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-navy/5 to-transparent rounded-2xl border border-navy/10 hover:border-gold/30 hover:bg-gradient-to-r hover:from-gold/5 hover:to-transparent transition-all group cursor-pointer">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center text-white font-bold shadow-lg">HF</div>
                                    <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-navy flex items-center gap-2">
                                        Dr. H. Fischer
                                        <span class="px-1.5 py-0.5 bg-gold/20 text-gold text-[10px] font-bold rounded">LEAD</span>
                                    </div>
                                    <div class="text-xs text-gray-500 flex items-center gap-1">
                                        <i class="fas fa-scalpel text-navy/40"></i>Bariatric Surgeon
                                    </div>
                                </div>
                                <button class="w-10 h-10 bg-gradient-to-br from-gold to-gold-bright rounded-xl flex items-center justify-center text-navy shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                    <i class="fas fa-comment"></i>
                                </button>
                            </div>
                            
                            <!-- Nutritionist -->
                            <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50/50 to-transparent rounded-2xl border border-green-100/50 hover:border-gold/30 hover:bg-gradient-to-r hover:from-gold/5 hover:to-transparent transition-all group cursor-pointer">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">AS</div>
                                    <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-navy">Dr. A. Schmidt</div>
                                    <div class="text-xs text-gray-500 flex items-center gap-1">
                                        <i class="fas fa-apple-alt text-green-400"></i>Nutritionist
                                    </div>
                                </div>
                                <button class="w-10 h-10 bg-gradient-to-br from-gold to-gold-bright rounded-xl flex items-center justify-center text-navy shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                    <i class="fas fa-comment"></i>
                                </button>
                            </div>
                            
                            <!-- Care Coordinator -->
                            <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-gold/5 to-transparent rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group cursor-pointer">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-br from-gold to-gold-bright rounded-xl flex items-center justify-center text-navy font-bold shadow-lg">SM</div>
                                    <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-navy">Sarah M.</div>
                                    <div class="text-xs text-gray-500 flex items-center gap-1">
                                        <i class="fas fa-headset text-gold"></i>Care Coordinator • 24/7
                                    </div>
                                </div>
                                <button class="w-10 h-10 bg-gradient-to-br from-gold to-gold-bright rounded-xl flex items-center justify-center text-navy shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                    <i class="fas fa-comment"></i>
                                </button>
                            </div>
                        </div>
                        <a href="/doctors" class="block mt-4 text-center text-sm text-gold font-semibold hover:text-gold-warm transition">
                            View Full Care Team <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                    
                    <!-- Quick Actions - Premium Gold Design -->
                    <div class="card-premium p-6">
                        <div class="flex items-center gap-3 mb-5">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                                <i class="fas fa-bolt text-gold text-lg"></i>
                            </div>
                            <h2 class="text-lg font-bold text-navy">Quick Actions</h2>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="openVideoCall()" class="p-5 bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group border border-green-100/50 relative overflow-hidden">
                                <div class="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-video text-white text-lg"></i>
                                </div>
                                <div class="text-sm font-bold text-navy">Video Call</div>
                                <div class="text-xs text-gray-500">Connect Now</div>
                            </button>
                            <button onclick="openDocuments()" class="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group border border-blue-100/50">
                                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-file-medical text-white text-lg"></i>
                                </div>
                                <div class="text-sm font-bold text-navy">Documents</div>
                                <div class="text-xs text-gray-500">5 Files</div>
                            </button>
                            <button onclick="openMedications()" class="p-5 bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group border border-purple-100/50">
                                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-pills text-white text-lg"></i>
                                </div>
                                <div class="text-sm font-bold text-navy">Medications</div>
                                <div class="text-xs text-gray-500">4 Active</div>
                            </button>
                            <button onclick="openMealPlan()" class="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group border border-amber-100/50">
                                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-utensils text-white text-lg"></i>
                                </div>
                                <div class="text-sm font-bold text-navy">Meal Plan</div>
                                <div class="text-xs text-gray-500">Today's Menu</div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Medication Reminder Widget -->
                    <div class="card p-6" id="medication-widget">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-navy">
                                <i class="fas fa-pills text-gold mr-2"></i>
                                Today's Medications
                            </h2>
                            <span id="med-adherence" class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                100% Adherence
                            </span>
                        </div>
                        
                        <div id="medication-schedule" class="space-y-3">
                            <!-- Morning Medications -->
                            <div class="med-time-slot">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="fas fa-sun text-amber-500"></i>
                                    <span class="text-sm font-semibold text-navy">Morning</span>
                                    <span class="text-xs text-gray-400">6:00 - 12:00</span>
                                </div>
                                <div id="morning-meds" class="space-y-2">
                                    <div class="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">O</div>
                                            <div>
                                                <div class="font-semibold text-navy text-sm">Omeprazole</div>
                                                <div class="text-xs text-gray-500">20mg • 7:00 AM</div>
                                            </div>
                                        </div>
                                        <button onclick="logMedication('med_001', 'taken')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition">
                                            <i class="fas fa-check mr-1"></i>Take
                                        </button>
                                    </div>
                                    <div class="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">M</div>
                                            <div>
                                                <div class="font-semibold text-navy text-sm">Multivitamin</div>
                                                <div class="text-xs text-gray-500">1 tablet • 8:00 AM</div>
                                            </div>
                                        </div>
                                        <button onclick="logMedication('med_002', 'taken')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition">
                                            <i class="fas fa-check mr-1"></i>Take
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Afternoon Medications -->
                            <div class="med-time-slot">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="fas fa-cloud-sun text-blue-500"></i>
                                    <span class="text-sm font-semibold text-navy">Afternoon</span>
                                    <span class="text-xs text-gray-400">12:00 - 18:00</span>
                                </div>
                                <div id="afternoon-meds" class="space-y-2">
                                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">B</div>
                                            <div>
                                                <div class="font-semibold text-navy text-sm">Vitamin B12</div>
                                                <div class="text-xs text-gray-500">1000mcg • 12:00 PM</div>
                                            </div>
                                        </div>
                                        <button onclick="logMedication('med_004', 'taken')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition">
                                            <i class="fas fa-check mr-1"></i>Take
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Evening Medications -->
                            <div class="med-time-slot">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="fas fa-moon text-indigo-500"></i>
                                    <span class="text-sm font-semibold text-navy">Evening</span>
                                    <span class="text-xs text-gray-400">18:00 - 22:00</span>
                                </div>
                                <div id="evening-meds" class="space-y-2">
                                    <div class="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">C</div>
                                            <div>
                                                <div class="font-semibold text-navy text-sm">Calcium Citrate</div>
                                                <div class="text-xs text-gray-500">500mg • 8:00 PM</div>
                                            </div>
                                        </div>
                                        <button onclick="logMedication('med_003', 'taken')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition">
                                            <i class="fas fa-check mr-1"></i>Take
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="openMedications()" class="mt-4 w-full py-2 text-sm text-gold font-semibold hover:bg-gold-light rounded-lg transition">
                            <i class="fas fa-cog mr-1"></i>Manage Medications
                        </button>
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
        
        <!-- TREATMENTS TAB -->
        <div id="tab-treatments" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-stethoscope text-gold mr-3"></i>
                Medical Treatments
            </h1>
            
            <!-- Treatment Categories -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <!-- Bariatric Surgery -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#bariatric'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <i class="fas fa-weight text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Bariatric Surgery</h3>
                            <p class="text-sm text-gray-500">Weight loss procedures</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Gastric Sleeve</span>
                            <span class="font-semibold text-navy">from €4,900</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Gastric Bypass</span>
                            <span class="font-semibold text-navy">from €6,500</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Gastric Balloon</span>
                            <span class="font-semibold text-navy">from €2,200</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 75%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
                
                <!-- Orthopedic -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#orthopedic'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <i class="fas fa-bone text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Orthopedic Surgery</h3>
                            <p class="text-sm text-gray-500">Joint & bone procedures</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Knee Replacement</span>
                            <span class="font-semibold text-navy">from €8,500</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Hip Replacement</span>
                            <span class="font-semibold text-navy">from €9,500</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Spine Surgery</span>
                            <span class="font-semibold text-navy">from €12,500</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 80%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
                
                <!-- Plastic Surgery -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#plastic'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                            <i class="fas fa-star text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Plastic & Cosmetic</h3>
                            <p class="text-sm text-gray-500">Body contouring & aesthetics</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Tummy Tuck</span>
                            <span class="font-semibold text-navy">from €4,200</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Facelift</span>
                            <span class="font-semibold text-navy">from €5,500</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Rhinoplasty</span>
                            <span class="font-semibold text-navy">from €3,900</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 70%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
                
                <!-- Cardiology -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#cardiology'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <i class="fas fa-heart-pulse text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Cardiology</h3>
                            <p class="text-sm text-gray-500">Heart care & diagnostics</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Cardiac Checkup</span>
                            <span class="font-semibold text-navy">from €750</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Angiography</span>
                            <span class="font-semibold text-navy">from €520</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Pacemaker</span>
                            <span class="font-semibold text-navy">from €5,500</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 78%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
                
                <!-- Dental -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#dental'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                            <i class="fas fa-tooth text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Dental Care</h3>
                            <p class="text-sm text-gray-500">Complete dental services</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Dental Implant</span>
                            <span class="font-semibold text-navy">from €650</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">All-on-4</span>
                            <span class="font-semibold text-navy">from €5,200</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Veneers (each)</span>
                            <span class="font-semibold text-navy">from €280</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 80%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
                
                <!-- Anti-Aging -->
                <div class="card p-6 hover:shadow-xl transition-all cursor-pointer" onclick="window.location.href='/services#antiaging'">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <i class="fas fa-clock text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy">Anti-Aging & Longevity</h3>
                            <p class="text-sm text-gray-500">Regenerative medicine</p>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Executive Checkup</span>
                            <span class="font-semibold text-navy">from €1,500</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Stem Cell Therapy</span>
                            <span class="font-semibold text-navy">from €7,900</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">PRP Therapy</span>
                            <span class="font-semibold text-navy">from €650</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save up to 77%</span>
                        <i class="fas fa-arrow-right text-gold"></i>
                    </div>
                </div>
            </div>
            
            <!-- CTA -->
            <div class="card-premium p-8 text-center">
                <h3 class="text-xl font-bold text-navy mb-2">Need Help Choosing?</h3>
                <p class="text-gray-600 mb-4">Get a free consultation with our German medical team</p>
                <a href="/booking" class="btn-primary inline-flex items-center gap-2">
                    <i class="fas fa-video"></i>
                    Book Free Consultation
                </a>
            </div>
        </div>
        
        <!-- RETREATS TAB -->
        <div id="tab-retreats" class="tab-content hidden">
            <h1 class="text-2xl font-bold text-navy mb-6">
                <i class="fas fa-spa text-gold mr-3"></i>
                Red Sea Recovery Retreats
            </h1>
            
            <!-- Hero Banner -->
            <div class="relative rounded-3xl overflow-hidden mb-8" style="background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%);">
                <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0L60 30L30 60L0 30z\" fill=\"white\" fill-opacity=\"0.1\"/%3E%3C/svg%3E');"></div>
                <div class="relative p-8 text-white">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-sun text-yellow-300"></i>
                        <span class="text-sm font-medium">300+ Sunny Days Per Year</span>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold mb-2">Heal by the Red Sea</h2>
                    <p class="text-white/80 mb-4 max-w-xl">Combine world-class German medical care with a luxury recovery experience at Egypt's premier Red Sea resorts.</p>
                    <div class="flex flex-wrap gap-4">
                        <div class="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                            <i class="fas fa-water text-cyan-200"></i>
                            <span class="text-sm">Therapeutic Waters</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                            <i class="fas fa-fish text-cyan-200"></i>
                            <span class="text-sm">World-Class Diving</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                            <i class="fas fa-hotel text-cyan-200"></i>
                            <span class="text-sm">5-Star Resorts</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Retreat Packages -->
            <h3 class="text-lg font-bold text-navy mb-4">Recovery Packages</h3>
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <!-- Essential -->
                <div class="card p-6 border-2 border-transparent hover:border-gold transition-all">
                    <div class="text-center mb-4">
                        <span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">ESSENTIAL</span>
                    </div>
                    <h4 class="text-xl font-bold text-navy text-center mb-2">SelectCare™</h4>
                    <p class="text-sm text-gray-500 text-center mb-4">Quality care at great value</p>
                    <div class="text-center mb-4">
                        <span class="text-3xl font-bold text-navy">€4,900</span>
                        <span class="text-gray-500">+</span>
                    </div>
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>4-Star Beach Resort (7 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>JCI Hospital Stay (3 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Airport Transfers
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>1-Year Follow-up
                        </li>
                    </ul>
                    <button class="w-full btn-outline py-3">Learn More</button>
                </div>
                
                <!-- Premium -->
                <div class="card-premium p-6 border-2 border-gold relative">
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span class="bg-gradient-to-r from-gold to-yellow-400 text-navy text-xs px-4 py-1 rounded-full font-bold shadow-lg">MOST POPULAR</span>
                    </div>
                    <div class="text-center mb-4 mt-2">
                        <span class="text-xs bg-gold/20 text-gold-warm px-3 py-1 rounded-full font-semibold">PREMIUM</span>
                    </div>
                    <h4 class="text-xl font-bold text-navy text-center mb-2">SelectCare+™</h4>
                    <p class="text-sm text-gray-500 text-center mb-4">Luxury recovery experience</p>
                    <div class="text-center mb-4">
                        <span class="text-3xl font-bold text-navy">€7,900</span>
                        <span class="text-gray-500">+</span>
                    </div>
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>5-Star Resort (14 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>VIP Hospital Suite (5 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Private Transfers
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Daily Spa Treatments
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Family Room Included
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>2-Year Follow-up
                        </li>
                    </ul>
                    <button class="w-full btn-primary py-3">Book Now</button>
                </div>
                
                <!-- Crown -->
                <div class="card p-6 border-2 border-transparent hover:border-gold transition-all">
                    <div class="text-center mb-4">
                        <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">ULTIMATE</span>
                    </div>
                    <h4 class="text-xl font-bold text-navy text-center mb-2">SelectCrown™</h4>
                    <p class="text-sm text-gray-500 text-center mb-4">Ultimate luxury & privacy</p>
                    <div class="text-center mb-4">
                        <span class="text-3xl font-bold text-navy">€14,500</span>
                        <span class="text-gray-500">+</span>
                    </div>
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Private Villa (21 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>VIP Suite (7 nights)
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Helicopter Transfer
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Private Chef
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Private Nurse 12h/day
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>Lifetime Follow-up
                        </li>
                    </ul>
                    <button class="w-full btn-outline py-3">Learn More</button>
                </div>
            </div>
            
            <!-- Recovery Activities -->
            <h3 class="text-lg font-bold text-navy mb-4">Recovery Activities</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-100 flex items-center justify-center">
                        <i class="fas fa-water text-cyan-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Snorkeling & Diving</h5>
                    <p class="text-xs text-gray-500 mt-1">Week 3+</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-100 flex items-center justify-center">
                        <i class="fas fa-spa text-pink-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Spa Treatments</h5>
                    <p class="text-xs text-gray-500 mt-1">Daily</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                        <i class="fas fa-utensils text-green-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Healthy Dining</h5>
                    <p class="text-xs text-gray-500 mt-1">All Meals</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-100 flex items-center justify-center">
                        <i class="fas fa-umbrella-beach text-yellow-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Beach Access</h5>
                    <p class="text-xs text-gray-500 mt-1">Unlimited</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                        <i class="fas fa-dumbbell text-orange-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Physiotherapy</h5>
                    <p class="text-xs text-gray-500 mt-1">2x Daily</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                        <i class="fas fa-om text-purple-600 text-xl"></i>
                    </div>
                    <h5 class="font-semibold text-navy text-sm">Meditation</h5>
                    <p class="text-xs text-gray-500 mt-1">Morning/Evening</p>
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
            
            <!-- Tracking Metrics - Clickable with Charts -->
            <h2 class="text-lg font-bold text-navy mb-4">
                <i class="fas fa-chart-line text-gold mr-2"></i>Daily Tracking
                <span class="text-sm font-normal text-gray-500 ml-2">Click for detailed charts</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div onclick="openTrackingChart('weight')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-weight text-purple-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">82.4</div>
                    <div class="text-xs text-gray-500">Weight (kg)</div>
                    <div class="text-xs text-green-500 mt-1">-0.3 today</div>
                </div>
                <div onclick="openTrackingChart('steps')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-green-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-walking text-green-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-green-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">5,240</div>
                    <div class="text-xs text-gray-500">Steps</div>
                    <div class="text-xs text-yellow-500 mt-1">70% of goal</div>
                </div>
                <div onclick="openTrackingChart('water')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-tint text-blue-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">1,800</div>
                    <div class="text-xs text-gray-500">Water (ml)</div>
                    <div class="text-xs text-yellow-500 mt-1">75% of goal</div>
                </div>
                <div onclick="openTrackingChart('sleep')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-moon text-indigo-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">7.2</div>
                    <div class="text-xs text-gray-500">Sleep (hours)</div>
                    <div class="text-xs text-green-500 mt-1">Good quality</div>
                </div>
                <div onclick="openTrackingChart('calories')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-red-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-fire text-red-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">1,420</div>
                    <div class="text-xs text-gray-500">Calories</div>
                    <div class="text-xs text-green-500 mt-1">On target</div>
                </div>
                <div onclick="openTrackingChart('protein')" class="card p-4 text-center cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all duration-300 group">
                    <div class="relative">
                        <i class="fas fa-drumstick-bite text-orange-500 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <i class="fas fa-chart-line absolute -top-1 -right-1 text-xs text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="text-2xl font-bold text-navy">68</div>
                    <div class="text-xs text-gray-500">Protein (g)</div>
                    <div class="text-xs text-green-500 mt-1">85% of goal</div>
                </div>
            </div>
            
            <!-- Tracking Chart Modal -->
            <div id="tracking-chart-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <!-- Modal Header -->
                    <div class="bg-gradient-to-r from-navy to-navy-light p-6 text-white">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div id="chart-icon-container" class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                                    <i id="chart-modal-icon" class="fas fa-chart-line text-2xl"></i>
                                </div>
                                <div>
                                    <h2 id="chart-modal-title" class="text-2xl font-bold">Tracking Data</h2>
                                    <p id="chart-modal-subtitle" class="text-gold text-sm">Historical trends and analysis</p>
                                </div>
                            </div>
                            <button onclick="closeTrackingChart()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Time Period Selector -->
                    <div class="p-4 bg-cream border-b flex items-center justify-center gap-2">
                        <button onclick="updateChartPeriod(30)" id="period-30" class="px-6 py-2 rounded-full font-semibold text-sm transition-all bg-navy text-white">
                            30 Days
                        </button>
                        <button onclick="updateChartPeriod(60)" id="period-60" class="px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-200 text-gray-600 hover:bg-gray-300">
                            60 Days
                        </button>
                        <button onclick="updateChartPeriod(90)" id="period-90" class="px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-200 text-gray-600 hover:bg-gray-300">
                            90 Days
                        </button>
                    </div>
                    
                    <!-- Chart Container -->
                    <div class="p-6">
                        <div class="h-80 relative">
                            <canvas id="tracking-detail-chart"></canvas>
                        </div>
                        
                        <!-- Statistics Summary -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100">
                                <div class="text-sm text-gray-500 mb-1">Average</div>
                                <div id="stat-average" class="text-2xl font-bold text-navy">--</div>
                            </div>
                            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border border-blue-100">
                                <div class="text-sm text-gray-500 mb-1">Minimum</div>
                                <div id="stat-min" class="text-2xl font-bold text-navy">--</div>
                            </div>
                            <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 text-center border border-purple-100">
                                <div class="text-sm text-gray-500 mb-1">Maximum</div>
                                <div id="stat-max" class="text-2xl font-bold text-navy">--</div>
                            </div>
                            <div class="bg-gradient-to-br from-gold/10 to-amber-50 rounded-2xl p-4 text-center border border-gold/20">
                                <div class="text-sm text-gray-500 mb-1">Trend</div>
                                <div id="stat-trend" class="text-2xl font-bold text-navy flex items-center justify-center gap-1">
                                    <i id="trend-icon" class="fas fa-arrow-up text-green-500"></i>
                                    <span id="trend-value">--</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Insights -->
                        <div class="mt-6 p-4 bg-gradient-to-r from-gold/10 to-amber-50 rounded-2xl border border-gold/20">
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-lightbulb text-gold"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-navy mb-1">AI Insight</h4>
                                    <p id="chart-insight" class="text-sm text-gray-600">Loading personalized insights...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal Footer -->
                    <div class="p-4 bg-gray-50 border-t flex items-center justify-between">
                        <button onclick="exportChartData()" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-navy flex items-center gap-2">
                            <i class="fas fa-download"></i>
                            Export Data
                        </button>
                        <div class="flex items-center gap-3">
                            <button onclick="shareChart()" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-navy flex items-center gap-2">
                                <i class="fas fa-share-alt"></i>
                                Share
                            </button>
                            <button onclick="closeTrackingChart()" class="px-6 py-2 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
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
    
    <!-- Footer - Premium Gold Design -->
    <footer class="bg-gradient-to-b from-navy via-navy to-navy-dark text-white py-12 mt-12 relative overflow-hidden">
        <!-- Decorative gold accents -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        <div class="absolute top-0 left-1/4 w-48 h-48 bg-gold/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div class="text-2xl font-bold mb-3">
                SelectCare<span class="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-bright">OS</span>™
            </div>
            <p class="text-gray-400 text-sm mb-4">German Excellence. Red Sea Recovery. Lifetime Support.</p>
            
            <div class="flex justify-center gap-4 mb-6">
                <a href="#" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold/20 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold/20 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold/20 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold/20 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
            
            <div class="flex justify-center gap-6 text-xs text-gray-500 mb-4">
                <a href="#" class="hover:text-gold transition">Privacy Policy</a>
                <a href="#" class="hover:text-gold transition">Terms of Service</a>
                <a href="#" class="hover:text-gold transition">HIPAA Compliance</a>
            </div>
            
            <p class="text-gray-500 text-xs">© 2024 German Select Healthcare GmbH. All rights reserved.</p>
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
            
            // Initialize treatments tab
            if (tabId === 'treatments') {
                initTreatmentsInteractions();
            }
            
            // Initialize retreats tab
            if (tabId === 'retreats') {
                initRetreatsInteractions();
            }
        }
        
        // Treatments tab interactions
        function initTreatmentsInteractions() {
            document.querySelectorAll('.treatment-card').forEach(card => {
                card.style.cursor = 'pointer';
            });
        }
        
        // Retreats tab interactions
        function initRetreatsInteractions() {
            document.querySelectorAll('.retreat-card').forEach(card => {
                card.style.cursor = 'pointer';
            });
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
                        borderColor: '#D4A843',
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
    <title>SelectCareOS™ - Personalized Meal Plan</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #1a1a2e; }
        .header { text-align: center; border-bottom: 3px solid #D4A843; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #1a1a2e; margin: 0; }
        .header .subtitle { color: #D4A843; font-size: 18px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
        .summary-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 15px; border-radius: 10px; text-align: center; }
        .summary-card .value { font-size: 28px; font-weight: bold; color: #D4A843; }
        .summary-card .label { font-size: 12px; color: #666; }
        .meal { background: #fff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
        .meal h3 { color: #1a1a2e; margin-top: 0; border-bottom: 2px solid #D4A843; padding-bottom: 10px; }
        .suggestion { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .suggestion .name { font-weight: bold; color: #1a1a2e; }
        .macros { display: flex; gap: 15px; margin-top: 10px; font-size: 12px; }
        .macros span { padding: 4px 8px; border-radius: 4px; }
        .protein { background: #e3f2fd; color: #1976d2; }
        .carbs { background: #fff3e0; color: #f57c00; }
        .fat { background: #e8f5e9; color: #388e3c; }
        .tips { background: #f5f5f5; padding: 20px; border-radius: 10px; margin-top: 30px; }
        .tips h3 { color: #D4A843; margin-top: 0; }
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
        <button onclick="window.print()" style="padding: 10px 30px; background: #D4A843; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
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
            
            // Initialize notifications
            initializeNotifications();
            
            // Request push notification permission
            requestNotificationPermission();
        });
        
        // ═══════════════════════════════════════════════════════════════════════
        // QUICK ACTION FUNCTIONS
        // ═══════════════════════════════════════════════════════════════════════
        
        // Video Call Handler
        async function openVideoCall() {
            showModal('video-call-modal');
            
            // Fetch upcoming video appointments
            try {
                const response = await fetch('/api/notifications/appointments?upcoming=true&userId=user_001');
                const data = await response.json();
                
                if (data.success) {
                    const videoAppts = data.data.appointments.filter(a => a.isVirtual);
                    renderVideoCallModal(videoAppts);
                }
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        }
        
        function renderVideoCallModal(appointments) {
            const container = document.getElementById('video-appointments-list');
            if (!container) return;
            
            if (appointments.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-8">
                        <i class="fas fa-video text-gray-300 text-4xl mb-4"></i>
                        <p class="text-gray-500">No upcoming video consultations</p>
                        <button onclick="scheduleVideoCall()" class="mt-4 px-6 py-2 bg-gold text-navy rounded-full font-semibold hover:bg-gold-bright transition">
                            <i class="fas fa-plus mr-2"></i>Schedule Video Call
                        </button>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = appointments.map(apt => \`
                <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 mb-3">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <h4 class="font-bold text-navy">\${apt.title}</h4>
                            <p class="text-sm text-gray-600"><i class="fas fa-user-md mr-1"></i>\${apt.doctorName || 'Dr. Hans Mueller'}</p>
                        </div>
                        <span class="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                            \${apt.status === 'in_progress' ? '🔴 LIVE' : 'Scheduled'}
                        </span>
                    </div>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span><i class="fas fa-calendar mr-1"></i>\${new Date(apt.startTime).toLocaleDateString()}</span>
                        <span><i class="fas fa-clock mr-1"></i>\${new Date(apt.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <button onclick="joinVideoCall('\${apt.id}')" class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all">
                        <i class="fas fa-video mr-2"></i>Join Video Call
                    </button>
                </div>
            \`).join('');
        }
        
        async function joinVideoCall(appointmentId) {
            showToast('Connecting to video call...', 'info');
            
            try {
                const response = await fetch(\`/api/notifications/video-call/\${appointmentId}?userId=user_001\`);
                const data = await response.json();
                
                if (data.success) {
                    // In production, this would open the actual video call
                    // For now, show a simulated video call interface
                    showVideoCallInterface(data.data);
                }
            } catch (error) {
                showToast('Failed to connect to video call', 'error');
            }
        }
        
        function showVideoCallInterface(callData) {
            closeModal('video-call-modal');
            
            const videoUI = document.createElement('div');
            videoUI.id = 'video-call-interface';
            videoUI.className = 'fixed inset-0 z-50 bg-gray-900';
            videoUI.innerHTML = \`
                <div class="h-full flex flex-col">
                    <!-- Video Area -->
                    <div class="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center text-white">
                                <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-gold to-gold-bright flex items-center justify-center">
                                    <i class="fas fa-user-md text-5xl text-navy"></i>
                                </div>
                                <h3 class="text-xl font-bold">\${callData.doctorName}</h3>
                                <p class="text-gray-400">\${callData.title}</p>
                                <p class="text-green-400 mt-2"><i class="fas fa-circle text-xs mr-2 animate-pulse"></i>Connected</p>
                            </div>
                        </div>
                        
                        <!-- Self view -->
                        <div class="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-xl border-2 border-gold overflow-hidden">
                            <div class="w-full h-full flex items-center justify-center">
                                <i class="fas fa-user text-gray-500 text-2xl"></i>
                            </div>
                        </div>
                        
                        <!-- Call timer -->
                        <div class="absolute top-4 left-4 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
                            <i class="fas fa-clock mr-2"></i><span id="call-timer">00:00</span>
                        </div>
                    </div>
                    
                    <!-- Controls -->
                    <div class="bg-gray-800 p-6">
                        <div class="flex justify-center items-center gap-6">
                            <button onclick="toggleMute()" class="w-14 h-14 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition">
                                <i class="fas fa-microphone" id="mic-icon"></i>
                            </button>
                            <button onclick="toggleVideo()" class="w-14 h-14 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition">
                                <i class="fas fa-video" id="video-icon"></i>
                            </button>
                            <button onclick="endVideoCall()" class="w-16 h-16 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                                <i class="fas fa-phone-slash text-xl"></i>
                            </button>
                            <button onclick="toggleChat()" class="w-14 h-14 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition">
                                <i class="fas fa-comment"></i>
                            </button>
                            <button onclick="toggleScreenShare()" class="w-14 h-14 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition">
                                <i class="fas fa-desktop"></i>
                            </button>
                        </div>
                    </div>
                </div>
            \`;
            document.body.appendChild(videoUI);
            
            // Start call timer
            let seconds = 0;
            window.callTimer = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                document.getElementById('call-timer').textContent = \`\${mins}:\${secs}\`;
            }, 1000);
        }
        
        function endVideoCall() {
            clearInterval(window.callTimer);
            const videoUI = document.getElementById('video-call-interface');
            if (videoUI) videoUI.remove();
            showToast('Video call ended', 'success');
        }
        
        function toggleMute() {
            const icon = document.getElementById('mic-icon');
            if (icon.classList.contains('fa-microphone')) {
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
                showToast('Microphone muted', 'info');
            } else {
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
                showToast('Microphone unmuted', 'info');
            }
        }
        
        function toggleVideo() {
            const icon = document.getElementById('video-icon');
            if (icon.classList.contains('fa-video')) {
                icon.classList.remove('fa-video');
                icon.classList.add('fa-video-slash');
                showToast('Camera off', 'info');
            } else {
                icon.classList.remove('fa-video-slash');
                icon.classList.add('fa-video');
                showToast('Camera on', 'info');
            }
        }
        
        function toggleChat() { showToast('Chat feature coming soon', 'info'); }
        function toggleScreenShare() { showToast('Screen sharing feature coming soon', 'info'); }
        function scheduleVideoCall() { window.location.href = '/booking?type=video'; }
        
        // Documents Handler
        function openDocuments() {
            showModal('documents-modal');
            loadDocuments();
        }
        
        async function loadDocuments() {
            // Simulated documents for demo
            const documents = [
                { id: 'doc_001', name: 'Pre-Surgery Guidelines', type: 'pdf', date: '2024-01-10', category: 'preparation' },
                { id: 'doc_002', name: 'Lab Results - Blood Work', type: 'pdf', date: '2024-01-08', category: 'lab' },
                { id: 'doc_003', name: 'Post-Op Care Instructions', type: 'pdf', date: '2024-01-15', category: 'recovery' },
                { id: 'doc_004', name: 'Medication Schedule', type: 'pdf', date: '2024-01-15', category: 'medication' },
                { id: 'doc_005', name: 'Travel Itinerary', type: 'pdf', date: '2024-01-05', category: 'travel' }
            ];
            
            const container = document.getElementById('documents-list');
            if (!container) return;
            
            const categoryIcons = {
                preparation: { icon: 'fa-clipboard-check', color: 'text-blue-500' },
                lab: { icon: 'fa-flask', color: 'text-purple-500' },
                recovery: { icon: 'fa-heart', color: 'text-red-500' },
                medication: { icon: 'fa-pills', color: 'text-green-500' },
                travel: { icon: 'fa-plane', color: 'text-amber-500' }
            };
            
            container.innerHTML = documents.map(doc => {
                const cat = categoryIcons[doc.category] || { icon: 'fa-file', color: 'text-gray-500' };
                return \`
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer" onclick="viewDocument('\${doc.id}')">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                <i class="fas \${cat.icon} \${cat.color} text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-navy">\${doc.name}</h4>
                                <p class="text-xs text-gray-500">\${doc.date} • \${doc.type.toUpperCase()}</p>
                            </div>
                        </div>
                        <button class="p-2 text-gray-400 hover:text-gold transition">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                \`;
            }).join('');
        }
        
        function viewDocument(docId) {
            showToast('Opening document...', 'info');
            // In production, open actual document viewer
        }
        
        // Medications Handler
        function openMedications() {
            showModal('medications-modal');
            loadMedicationsModal();
        }
        
        async function loadMedicationsModal() {
            try {
                const response = await fetch('/api/notifications/medications?userId=user_001');
                const data = await response.json();
                
                if (data.success) {
                    renderMedicationsModal(data.data);
                }
            } catch (error) {
                console.error('Failed to load medications:', error);
            }
        }
        
        function renderMedicationsModal(medData) {
            const container = document.getElementById('medications-full-list');
            if (!container) return;
            
            const { medications, schedule } = medData;
            
            const html = \`
                <div class="space-y-6">
                    <!-- Add Medication Button -->
                    <button onclick="showAddMedicationForm()" class="w-full py-3 border-2 border-dashed border-gold rounded-xl text-gold font-semibold hover:bg-gold-light transition">
                        <i class="fas fa-plus mr-2"></i>Add New Medication
                    </button>
                    
                    <!-- Medication List -->
                    \${medications.map(med => \`
                        <div class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style="background: \${med.color || '#6B7280'}">
                                        \${med.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-navy">\${med.name}</h4>
                                        <p class="text-sm text-gray-500">\${med.dosage} \${med.unit} • \${med.frequency.replace('_', ' ')}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button onclick="editMedication('\${med.id}')" class="p-2 text-gray-400 hover:text-gold transition">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" \${med.isActive ? 'checked' : ''} onchange="toggleMedicationActive('\${med.id}')" class="sr-only peer">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                <i class="fas fa-info-circle mr-1 text-gold"></i>
                                \${med.instructions}
                            </div>
                            <div class="flex items-center gap-4 text-xs text-gray-400">
                                <span><i class="fas fa-user-md mr-1"></i>\${med.prescribedBy}</span>
                                <span><i class="fas fa-clock mr-1"></i>\${med.times.join(', ')}</span>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            \`;
            
            container.innerHTML = html;
        }
        
        async function logMedication(medicationId, status) {
            try {
                const response = await fetch(\`/api/notifications/medications/\${medicationId}/log\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: 'user_001', status })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showToast(status === 'taken' ? '✓ Medication logged!' : 'Medication skipped', status === 'taken' ? 'success' : 'warning');
                    
                    // Update UI
                    const btn = event.target.closest('button');
                    if (btn && status === 'taken') {
                        btn.innerHTML = '<i class="fas fa-check"></i> Taken';
                        btn.classList.remove('bg-green-500', 'hover:bg-green-600');
                        btn.classList.add('bg-gray-300', 'cursor-default');
                        btn.disabled = true;
                    }
                }
            } catch (error) {
                showToast('Failed to log medication', 'error');
            }
        }
        
        function showAddMedicationForm() {
            showToast('Add medication form coming soon', 'info');
        }
        
        function editMedication(medId) {
            showToast('Edit medication form coming soon', 'info');
        }
        
        function toggleMedicationActive(medId) {
            showToast('Medication status updated', 'success');
        }
        
        // Meal Plan Handler
        function openMealPlan() {
            // Switch to nutrition tab
            showTab('nutrition');
            showToast('Navigating to Meal Plan section', 'info');
        }
        
        // ═══════════════════════════════════════════════════════════════════════
        // NOTIFICATION SYSTEM
        // ═══════════════════════════════════════════════════════════════════════
        
        let notificationPermission = 'default';
        
        function initializeNotifications() {
            // Check if browser supports notifications
            if ('Notification' in window) {
                notificationPermission = Notification.permission;
            }
            
            // Load notifications
            loadNotifications();
            
            // Poll for new notifications every 30 seconds
            setInterval(loadNotifications, 30000);
        }
        
        async function requestNotificationPermission() {
            if ('Notification' in window && Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                notificationPermission = permission;
                
                if (permission === 'granted') {
                    showToast('Push notifications enabled!', 'success');
                }
            }
        }
        
        async function loadNotifications() {
            try {
                const response = await fetch('/api/notifications?userId=user_001');
                const data = await response.json();
                
                if (data.success) {
                    updateNotificationBadge(data.data.unreadCount);
                }
            } catch (error) {
                console.error('Failed to load notifications:', error);
            }
        }
        
        function updateNotificationBadge(count) {
            const badge = document.getElementById('notification-badge');
            if (badge) {
                if (count > 0) {
                    badge.textContent = count > 9 ? '9+' : count;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        }
        
        function sendPushNotification(title, body, icon) {
            if (notificationPermission === 'granted') {
                new Notification(title, {
                    body,
                    icon: icon || '/static/images/logo.png',
                    badge: '/static/images/badge.png',
                    vibrate: [200, 100, 200]
                });
            }
        }
        
        // ═══════════════════════════════════════════════════════════════════════
        // MODAL SYSTEM
        // ═══════════════════════════════════════════════════════════════════════
        
        function showModal(modalId) {
            // Create modal backdrop if not exists
            let backdrop = document.getElementById('modal-backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.id = 'modal-backdrop';
                backdrop.className = 'fixed inset-0 bg-black/50 z-40 opacity-0 transition-opacity duration-300';
                backdrop.onclick = () => closeModal(modalId);
                document.body.appendChild(backdrop);
            }
            
            // Create modal content container if not exists
            let modal = document.getElementById(modalId);
            if (!modal) {
                modal = document.createElement('div');
                modal.id = modalId;
                modal.className = 'fixed inset-x-4 top-20 bottom-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-2xl z-50 overflow-hidden shadow-2xl transform translate-y-full transition-transform duration-300';
                modal.innerHTML = getModalContent(modalId);
                document.body.appendChild(modal);
            }
            
            // Show with animation
            requestAnimationFrame(() => {
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
                modal.classList.remove('translate-y-full');
            });
            
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(modalId) {
            const backdrop = document.getElementById('modal-backdrop');
            const modal = document.getElementById(modalId);
            
            if (backdrop) {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
                setTimeout(() => backdrop.remove(), 300);
            }
            
            if (modal) {
                modal.classList.add('translate-y-full');
                setTimeout(() => modal.remove(), 300);
            }
            
            document.body.style.overflow = '';
        }
        
        function getModalContent(modalId) {
            const modals = {
                'video-call-modal': \`
                    <div class="h-full flex flex-col">
                        <div class="p-4 bg-gradient-to-r from-navy to-navy-light text-white flex items-center justify-between">
                            <h3 class="font-bold text-lg"><i class="fas fa-video mr-2"></i>Video Consultations</h3>
                            <button onclick="closeModal('video-call-modal')" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="flex-1 overflow-y-auto p-4" id="video-appointments-list">
                            <div class="flex items-center justify-center h-32">
                                <i class="fas fa-spinner fa-spin text-gold text-2xl"></i>
                            </div>
                        </div>
                    </div>
                \`,
                'documents-modal': \`
                    <div class="h-full flex flex-col">
                        <div class="p-4 bg-gradient-to-r from-navy to-navy-light text-white flex items-center justify-between">
                            <h3 class="font-bold text-lg"><i class="fas fa-file-medical mr-2"></i>My Documents</h3>
                            <button onclick="closeModal('documents-modal')" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="flex-1 overflow-y-auto p-4 space-y-3" id="documents-list">
                            <div class="flex items-center justify-center h-32">
                                <i class="fas fa-spinner fa-spin text-gold text-2xl"></i>
                            </div>
                        </div>
                    </div>
                \`,
                'medications-modal': \`
                    <div class="h-full flex flex-col">
                        <div class="p-4 bg-gradient-to-r from-navy to-navy-light text-white flex items-center justify-between">
                            <h3 class="font-bold text-lg"><i class="fas fa-pills mr-2"></i>My Medications</h3>
                            <button onclick="closeModal('medications-modal')" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="flex-1 overflow-y-auto p-4" id="medications-full-list">
                            <div class="flex items-center justify-center h-32">
                                <i class="fas fa-spinner fa-spin text-gold text-2xl"></i>
                            </div>
                        </div>
                    </div>
                \`
            };
            
            return modals[modalId] || '<div class="p-4">Modal content not found</div>';
        }
        
        // ═══════════════════════════════════════════════════════════════════════
        // TOAST NOTIFICATIONS
        // ═══════════════════════════════════════════════════════════════════════
        
        function showToast(message, type = 'info') {
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                warning: 'bg-amber-500',
                info: 'bg-blue-500'
            };
            
            const toast = document.createElement('div');
            toast.className = \`fixed top-4 right-4 px-6 py-3 \${colors[type]} text-white rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-300\`;
            toast.innerHTML = \`
                <div class="flex items-center gap-3">
                    <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}\"></i>
                    <span>\${message}</span>
                </div>
            \`;
            
            document.body.appendChild(toast);
            
            requestAnimationFrame(() => {
                toast.classList.remove('translate-x-full');
            });
            
            setTimeout(() => {
                toast.classList.add('translate-x-full');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
        
        // ============================================================================
        // TRACKING CHARTS - 30/60/90 Day Views
        // ============================================================================
        
        let trackingChart = null;
        let currentMetric = 'weight';
        let currentPeriod = 30;
        
        const trackingConfig = {
            weight: {
                label: 'Weight Progress',
                subtitle: 'Track your weight loss journey',
                icon: 'fa-weight',
                iconColor: 'text-purple-500',
                color: 'rgb(147, 51, 234)',
                bgColor: 'rgba(147, 51, 234, 0.1)',
                unit: 'kg',
                goal: 75,
                generateData: (days) => generateWeightData(days),
                insights: [
                    'Your weight loss is consistent. Keep up the great work!',
                    'Consider adding more protein to maintain muscle mass during weight loss.',
                    'Your weekly average shows a healthy 0.5kg loss pattern.'
                ]
            },
            steps: {
                label: 'Daily Steps',
                subtitle: 'Activity and movement tracking',
                icon: 'fa-walking',
                iconColor: 'text-green-500',
                color: 'rgb(34, 197, 94)',
                bgColor: 'rgba(34, 197, 94, 0.1)',
                unit: 'steps',
                goal: 7500,
                generateData: (days) => generateStepsData(days),
                insights: [
                    'You\\'re averaging 5,200 steps daily. Try to hit 7,500 for optimal health.',
                    'Great job on weekends! You tend to walk more on Saturdays.',
                    'Consider a 15-minute walk after lunch to boost your daily count.'
                ]
            },
            water: {
                label: 'Water Intake',
                subtitle: 'Hydration monitoring',
                icon: 'fa-tint',
                iconColor: 'text-blue-500',
                color: 'rgb(59, 130, 246)',
                bgColor: 'rgba(59, 130, 246, 0.1)',
                unit: 'ml',
                goal: 2400,
                generateData: (days) => generateWaterData(days),
                insights: [
                    'Staying well hydrated! Your average is 1,850ml daily.',
                    'Try to drink more water in the morning hours.',
                    'Good hydration supports your weight loss and recovery goals.'
                ]
            },
            sleep: {
                label: 'Sleep Quality',
                subtitle: 'Rest and recovery analysis',
                icon: 'fa-moon',
                iconColor: 'text-indigo-500',
                color: 'rgb(99, 102, 241)',
                bgColor: 'rgba(99, 102, 241, 0.1)',
                unit: 'hours',
                goal: 8,
                generateData: (days) => generateSleepData(days),
                insights: [
                    'Your sleep quality has improved 15% this month.',
                    'Try to maintain a consistent bedtime for better sleep.',
                    'Deep sleep duration is excellent for muscle recovery.'
                ]
            },
            calories: {
                label: 'Calorie Intake',
                subtitle: 'Nutrition and diet tracking',
                icon: 'fa-fire',
                iconColor: 'text-red-500',
                color: 'rgb(239, 68, 68)',
                bgColor: 'rgba(239, 68, 68, 0.1)',
                unit: 'kcal',
                goal: 1800,
                generateData: (days) => generateCaloriesData(days),
                insights: [
                    'You\\'re staying within your calorie target most days.',
                    'Weekend calories tend to be higher - plan ahead!',
                    'Consistent calorie deficit is supporting your weight goals.'
                ]
            },
            protein: {
                label: 'Protein Intake',
                subtitle: 'Muscle recovery nutrition',
                icon: 'fa-drumstick-bite',
                iconColor: 'text-orange-500',
                color: 'rgb(249, 115, 22)',
                bgColor: 'rgba(249, 115, 22, 0.1)',
                unit: 'g',
                goal: 80,
                generateData: (days) => generateProteinData(days),
                insights: [
                    'Increase protein to 80g daily for optimal muscle recovery.',
                    'Post-surgery recovery requires adequate protein intake.',
                    'Consider adding a protein shake after exercise.'
                ]
            }
        };
        
        // Data generation functions with realistic patterns
        function generateWeightData(days) {
            const data = [];
            let weight = 90.8; // Starting weight
            const targetLoss = 0.1; // Average daily loss
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                // Add some randomness but trending down
                weight = Math.max(75, weight - targetLoss + (Math.random() - 0.4) * 0.3);
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: parseFloat(weight.toFixed(1)) });
            }
            return data;
        }
        
        function generateStepsData(days) {
            const data = [];
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const base = isWeekend ? 6500 : 4500;
                const value = Math.floor(base + Math.random() * 3000);
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value });
            }
            return data;
        }
        
        function generateWaterData(days) {
            const data = [];
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const value = Math.floor(1500 + Math.random() * 1200);
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value });
            }
            return data;
        }
        
        function generateSleepData(days) {
            const data = [];
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const base = isWeekend ? 8 : 6.5;
                const value = parseFloat((base + Math.random() * 2).toFixed(1));
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value });
            }
            return data;
        }
        
        function generateCaloriesData(days) {
            const data = [];
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const base = isWeekend ? 1900 : 1400;
                const value = Math.floor(base + Math.random() * 500);
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value });
            }
            return data;
        }
        
        function generateProteinData(days) {
            const data = [];
            for (let i = days; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const value = Math.floor(55 + Math.random() * 35);
                data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value });
            }
            return data;
        }
        
        function openTrackingChart(metric) {
            currentMetric = metric;
            const config = trackingConfig[metric];
            const modal = document.getElementById('tracking-chart-modal');
            
            // Update modal header
            document.getElementById('chart-modal-title').textContent = config.label;
            document.getElementById('chart-modal-subtitle').textContent = config.subtitle;
            document.getElementById('chart-modal-icon').className = \`fas \${config.icon} text-2xl\`;
            document.getElementById('chart-icon-container').className = \`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center \${config.iconColor}\`;
            
            // Show modal
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Render chart
            updateChartPeriod(30);
        }
        
        function closeTrackingChart() {
            document.getElementById('tracking-chart-modal').classList.add('hidden');
            document.body.style.overflow = '';
            if (trackingChart) {
                trackingChart.destroy();
                trackingChart = null;
            }
        }
        
        function updateChartPeriod(days) {
            currentPeriod = days;
            const config = trackingConfig[currentMetric];
            const data = config.generateData(days);
            
            // Update period buttons
            [30, 60, 90].forEach(d => {
                const btn = document.getElementById(\`period-\${d}\`);
                if (d === days) {
                    btn.className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all bg-navy text-white';
                } else {
                    btn.className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all bg-gray-200 text-gray-600 hover:bg-gray-300';
                }
            });
            
            // Calculate statistics
            const values = data.map(d => d.value);
            const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
            const min = Math.min(...values).toFixed(1);
            const max = Math.max(...values).toFixed(1);
            const trend = ((values[values.length - 1] - values[0]) / values[0] * 100).toFixed(1);
            
            document.getElementById('stat-average').textContent = \`\${avg} \${config.unit}\`;
            document.getElementById('stat-min').textContent = \`\${min} \${config.unit}\`;
            document.getElementById('stat-max').textContent = \`\${max} \${config.unit}\`;
            document.getElementById('trend-value').textContent = \`\${Math.abs(trend)}%\`;
            
            const trendIcon = document.getElementById('trend-icon');
            if (currentMetric === 'weight') {
                // For weight, down is good
                trendIcon.className = trend < 0 ? 'fas fa-arrow-down text-green-500' : 'fas fa-arrow-up text-red-500';
            } else {
                // For other metrics, up is good
                trendIcon.className = trend > 0 ? 'fas fa-arrow-up text-green-500' : 'fas fa-arrow-down text-red-500';
            }
            
            // Update insight
            const insights = config.insights;
            document.getElementById('chart-insight').textContent = insights[Math.floor(Math.random() * insights.length)];
            
            // Render chart
            renderTrackingChart(data, config);
        }
        
        function renderTrackingChart(data, config) {
            const ctx = document.getElementById('tracking-detail-chart').getContext('2d');
            
            if (trackingChart) {
                trackingChart.destroy();
            }
            
            // Sample labels for display (show every nth label based on period)
            const skipLabels = currentPeriod === 30 ? 5 : currentPeriod === 60 ? 10 : 15;
            
            trackingChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.date),
                    datasets: [
                        {
                            label: config.label,
                            data: data.map(d => d.value),
                            borderColor: config.color,
                            backgroundColor: config.bgColor,
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: currentPeriod <= 30 ? 4 : 2,
                            pointHoverRadius: 8,
                            pointBackgroundColor: config.color,
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2
                        },
                        {
                            label: 'Goal',
                            data: Array(data.length).fill(config.goal),
                            borderColor: 'rgba(201, 162, 39, 0.8)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: { size: 12, weight: 'bold' }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(26, 26, 46, 0.95)',
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 13 },
                            padding: 12,
                            cornerRadius: 12,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    return \`\${context.dataset.label}: \${context.parsed.y} \${config.unit}\`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                maxRotation: 45,
                                callback: function(value, index) {
                                    return index % skipLabels === 0 ? this.getLabelForValue(value) : '';
                                }
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            ticks: {
                                callback: function(value) {
                                    return value + ' ' + config.unit;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        function exportChartData() {
            const config = trackingConfig[currentMetric];
            const data = config.generateData(currentPeriod);
            
            let csv = 'Date,' + config.label + ' (' + config.unit + ')\\n';
            data.forEach(d => {
                csv += d.date + ',' + d.value + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`\${currentMetric}_\${currentPeriod}days_\${new Date().toISOString().split('T')[0]}.csv\`;
            a.click();
            URL.revokeObjectURL(url);
            
            showToast('Data exported successfully!', 'success');
        }
        
        function shareChart() {
            if (navigator.share) {
                navigator.share({
                    title: trackingConfig[currentMetric].label + ' - SelectCareOS™',
                    text: \`Check out my \${currentPeriod}-day \${trackingConfig[currentMetric].label.toLowerCase()} progress!\`,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!', 'success');
            }
        }
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeTrackingChart();
            }
        });
        
        // Close modal on backdrop click
        document.getElementById('tracking-chart-modal')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeTrackingChart();
            }
        });
    </script>
    
    <!-- Language Change Script -->
    <script>
        function changeLanguage(lang) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            localStorage.setItem('selectcare-language', lang);
            window.location.href = url.toString();
        }
    </script>
    
    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>
    
    <!-- Bottom Navigation - Healthcare-First (Option A) -->
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/?lang=${lang}" class="nav-item" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>${t('nav.home', lang)}</span>
            </a>
            <a href="/medisense?lang=${lang}" class="nav-item" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect?lang=${lang}" class="nav-item connect-btn" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/care-team?lang=${lang}" class="nav-item" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard?lang=${lang}" class="nav-item active" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>${t('nav.profile', lang)}</span>
            </a>
        </div>
    </nav>
</body>
</html>
`
}
