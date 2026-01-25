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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
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
            /* UX Enhancement: Improved spacing system */
            --spacing-xs: 4px;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
            --spacing-xl: 32px;
            --spacing-2xl: 48px;
            --spacing-3xl: 64px;
            /* UX Enhancement: Visual depth layers */
            --shadow-sm: 0 2px 8px rgba(0, 31, 63, 0.06);
            --shadow-md: 0 4px 16px rgba(0, 31, 63, 0.08);
            --shadow-lg: 0 8px 32px rgba(0, 31, 63, 0.12);
            --shadow-xl: 0 16px 48px rgba(0, 31, 63, 0.16);
            --shadow-glow: 0 0 24px rgba(212, 168, 67, 0.25);
            /* UX Enhancement: Transition presets */
            --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
            --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
            --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }
        
        /* Modern Gradient Backgrounds */
        .gradient-navy { background: linear-gradient(135deg, #001F3F 0%, #003366 50%, #001F3F 100%); }
        .gradient-gold { background: linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #E5C04B 100%); }
        .gradient-mesh {
            background: 
                radial-gradient(at 40% 20%, rgba(201, 162, 39, 0.15) 0px, transparent 50%),
                radial-gradient(at 80% 0%, rgba(0, 51, 102, 0.1) 0px, transparent 50%),
                radial-gradient(at 0% 50%, rgba(201, 162, 39, 0.1) 0px, transparent 50%),
                radial-gradient(at 80% 50%, rgba(0, 31, 63, 0.08) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(201, 162, 39, 0.12) 0px, transparent 50%);
        }
        .gradient-hero {
            background: linear-gradient(135deg, #001F3F 0%, #0A2E4F 40%, #001F3F 100%);
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
            background: radial-gradient(ellipse at center, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
            animation: pulse-glow 8s ease-in-out infinite;
        }
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }
        .bg-cream { background-color: var(--cream); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .bg-gold-light { background-color: var(--gold-light); }
        
        /* Noise texture overlay */
        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        
        /* Glassmorphism Effects */
        .glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .glass-dark {
            background: rgba(0, 31, 63, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        
        /* Animated Background */
        .animated-bg {
            position: relative;
            overflow: hidden;
        }
        .animated-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, rgba(201, 162, 39, 0.03), transparent 30%);
            animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delay-1 { animation-delay: -2s; }
        .float-delay-2 { animation-delay: -4s; }
        
        /* Glow Effects */
        .glow-gold {
            box-shadow: 0 0 40px rgba(201, 162, 39, 0.3), 0 0 80px rgba(201, 162, 39, 0.1);
        }
        .glow-blue {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1);
        }
        
        /* Particle Animation */
        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--gold);
            border-radius: 50%;
            opacity: 0.3;
            animation: particle-float 15s infinite;
        }
        @keyframes particle-float {
            0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        /* ═══════════════════════════════════════════════════════════════
           ENHANCED CARD SYSTEM - Improved Visual Hierarchy & Affordance
           ═══════════════════════════════════════════════════════════════ */
        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border-radius: 20px;
            box-shadow: var(--shadow-md);
            transition: all 0.35s var(--ease-spring);
            border: 1px solid rgba(255, 255, 255, 0.6);
            position: relative;
            overflow: hidden;
        }
        .card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
            transform: scaleX(0);
            transition: transform 0.4s var(--ease-spring);
            transform-origin: left;
        }
        .card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
            border-color: rgba(212, 168, 67, 0.2);
        }
        .card:hover::after {
            transform: scaleX(1);
        }
        .card:active {
            transform: translateY(-3px) scale(0.99);
        }
        
        /* ═══════════════════════════════════════════════════════════════
           CALCULATOR CARDS - Enhanced Affordance & Interactive Feedback
           ═══════════════════════════════════════════════════════════════ */
        .calculator-card {
            cursor: pointer;
            position: relative;
            overflow: hidden;
            padding: 24px;
            min-height: 180px;
            display: flex;
            flex-direction: column;
        }
        .calculator-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
            background-size: 200% 100%;
            transform: scaleX(0);
            transition: transform 0.4s var(--ease-spring);
            animation: shimmer 3s linear infinite;
            transform-origin: left;
        }
        .calculator-card:hover::before {
            transform: scaleX(1);
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        /* Shine effect on hover */
        .calculator-card .card-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s var(--ease-smooth);
            pointer-events: none;
        }
        .calculator-card:hover .card-shine {
            left: 100%;
        }
        /* Icon container enhancement */
        .calculator-card .icon-container {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.35s var(--ease-spring);
            position: relative;
        }
        .calculator-card .icon-container::after {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 18px;
            border: 2px dashed transparent;
            transition: all 0.35s var(--ease-spring);
        }
        .calculator-card:hover .icon-container {
            transform: scale(1.1) rotate(-3deg);
        }
        .calculator-card:hover .icon-container::after {
            border-color: var(--gold);
            animation: dash-rotate 8s linear infinite;
        }
        @keyframes dash-rotate {
            to { transform: rotate(360deg); }
        }
        /* CTA indicator */
        .calculator-card .cta-arrow {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--gold-light), rgba(212, 168, 67, 0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.35s var(--ease-spring);
        }
        .calculator-card:hover .cta-arrow {
            opacity: 1;
            transform: translateX(0);
        }
        .calculator-card .cta-arrow i {
            color: var(--gold-warm);
            font-size: 14px;
            transition: transform 0.2s ease;
        }
        .calculator-card:hover .cta-arrow i {
            transform: translateX(2px);
        }
        
        /* Icon Pulse Animation */
        .icon-pulse {
            animation: icon-pulse 2s ease-in-out infinite;
        }
        @keyframes icon-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        /* Gradient Icon Background */
        .icon-gradient-red { background: linear-gradient(135deg, #FEE2E2, #FECACA); }
        .icon-gradient-purple { background: linear-gradient(135deg, #EDE9FE, #DDD6FE); }
        .icon-gradient-blue { background: linear-gradient(135deg, #DBEAFE, #BFDBFE); }
        .icon-gradient-green { background: linear-gradient(135deg, #DCFCE7, #BBF7D0); }
        .icon-gradient-yellow { background: linear-gradient(135deg, #FEF3C7, #FDE68A); }
        .icon-gradient-pink { background: linear-gradient(135deg, #FCE7F3, #FBCFE8); }
        
        /* ═══════════════════════════════════════════════════════════════
           CATEGORY TABS - Enhanced Navigation UX
           ═══════════════════════════════════════════════════════════════ */
        .category-tabs-container {
            position: sticky;
            top: 0;
            z-index: 50;
            background: linear-gradient(180deg, var(--cream) 0%, var(--cream) 80%, transparent 100%);
            padding: 16px 0 24px;
            margin: 0 -16px;
            padding-left: 16px;
            padding-right: 16px;
        }
        .category-tabs-inner {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        .category-tabs-inner::-webkit-scrollbar {
            display: none;
        }
        .category-tab {
            padding: 12px 20px;
            border-radius: 14px;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap;
            transition: all 0.3s var(--ease-spring);
            cursor: pointer;
            border: 2px solid transparent;
            background: white;
            box-shadow: var(--shadow-sm);
            display: inline-flex;
            align-items: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }
        .category-tab::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--gold-light), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .category-tab:hover {
            background: white;
            border-color: rgba(212, 168, 67, 0.3);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md), 0 0 16px rgba(212, 168, 67, 0.1);
        }
        .category-tab:hover::before {
            opacity: 1;
        }
        .category-tab.active {
            background: linear-gradient(135deg, var(--gold), var(--gold-bright));
            color: var(--navy);
            border-color: var(--gold-warm);
            box-shadow: var(--shadow-lg), var(--shadow-glow);
            transform: translateY(-2px);
        }
        .category-tab.active::before {
            opacity: 0;
        }
        .category-tab .tab-icon {
            width: 32px;
            height: 32px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s var(--ease-spring);
            position: relative;
            z-index: 1;
        }
        .category-tab:hover .tab-icon {
            transform: scale(1.1);
        }
        .category-tab .tab-count {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 20px;
            position: relative;
            z-index: 1;
        }
        .category-tab.active .tab-count {
            background: rgba(0, 31, 63, 0.15);
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
        
        /* ═══════════════════════════════════════════════════════════════
           BADGES & LABELS - Visual Priority Indicators
           ═══════════════════════════════════════════════════════════════ */
        .popular-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            color: white;
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
            animation: badge-float 3s ease-in-out infinite;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        @keyframes badge-float {
            0%, 100% { transform: translateY(0); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35); }
            50% { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(245, 158, 11, 0.45); }
        }
        /* Category badges */
        .category-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 12px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s var(--ease-spring);
        }
        .category-badge:hover {
            transform: scale(1.05);
        }
        /* Time indicator */
        .time-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            background: rgba(34, 197, 94, 0.1);
            color: #16A34A;
        }
        
        /* ═══════════════════════════════════════════════════════════════
           STAT CARDS - Enhanced Visual Impact & Data Display
           ═══════════════════════════════════════════════════════════════ */
        .stat-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(253, 251, 247, 0.9));
            backdrop-filter: blur(12px);
            border-radius: 24px;
            padding: 28px 24px;
            text-align: center;
            box-shadow: var(--shadow-md);
            border: 1px solid rgba(255, 255, 255, 0.6);
            position: relative;
            overflow: hidden;
            transition: all 0.4s var(--ease-spring);
        }
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
            background-size: 200% 100%;
            animation: shimmer 4s linear infinite;
        }
        .stat-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 30%, rgba(212, 168, 67, 0.08) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }
        .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
        }
        .stat-card:hover::after {
            opacity: 1;
        }
        .stat-card .stat-icon-ring {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }
        .stat-card .stat-number {
            font-size: 2.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--navy), #003366);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
        }
        .stat-card .stat-label {
            font-size: 14px;
            font-weight: 600;
            color: #6B7280;
            margin-top: 8px;
            letter-spacing: 0.3px;
        }
        
        /* 3D Card Effect */
        .card-3d {
            transform-style: preserve-3d;
            perspective: 1000px;
        }
        .card-3d:hover {
            transform: rotateX(5deg) rotateY(-5deg) translateY(-8px);
        }
        
        /* Animated Counter */
        .counter {
            display: inline-block;
        }
        
        /* Lottie-like CSS Animation for Icons */
        .animated-icon {
            position: relative;
        }
        .animated-icon::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid transparent;
            border-top-color: var(--gold);
            animation: spin-border 3s linear infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .calculator-card:hover .animated-icon::after {
            opacity: 1;
        }
        @keyframes spin-border {
            100% { transform: rotate(360deg); }
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
        
        /* ═══════════════════════════════════════════════════════════════
           SECTION HEADERS - Enhanced Visual Hierarchy & Spacing
           ═══════════════════════════════════════════════════════════════ */
        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid rgba(0, 31, 63, 0.06);
            position: relative;
        }
        .section-header::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 80px;
            height: 2px;
            background: linear-gradient(90deg, var(--gold), var(--gold-bright));
            border-radius: 2px;
        }
        .section-title {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .section-icon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
            transition: all 0.3s var(--ease-spring);
        }
        .section-icon:hover {
            transform: rotate(-5deg) scale(1.1);
        }
        .section-text h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--navy);
            margin: 0;
        }
        .section-text p {
            font-size: 14px;
            color: #6B7280;
            margin: 4px 0 0 0;
        }
        .section-meta {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        /* Category section cards */
        .category-section {
            margin-bottom: 48px;
            position: relative;
        }
        .category-section::before {
            content: '';
            position: absolute;
            left: -20px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
            border-radius: 2px;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .category-section:hover::before {
            opacity: 1;
        }
        
        /* Visual dividers */
        .visual-divider {
            position: relative;
            height: 1px;
            margin: 48px 0;
            background: linear-gradient(90deg, transparent, rgba(0, 31, 63, 0.08), transparent);
        }
        .visual-divider::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: var(--cream);
            border-radius: 50%;
        }
        .visual-divider .divider-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, var(--navy), var(--navy-light));
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
            z-index: 1;
        }
        .visual-divider .divider-icon i {
            color: white;
            font-size: 16px;
        }
        
        /* Info cards within category descriptions */
        .info-card {
            background: white;
            border-radius: 20px;
            padding: 24px;
            box-shadow: var(--shadow-sm);
            border: 1px solid rgba(0, 31, 63, 0.04);
            transition: all 0.3s var(--ease-spring);
        }
        .info-card:hover {
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
        }
        .info-card .info-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        /* Quick BMI Widget Enhancement */
        .quick-widget {
            background: linear-gradient(145deg, white, var(--cream));
            border-radius: 24px;
            box-shadow: var(--shadow-md);
            border: 1px solid rgba(0, 31, 63, 0.04);
            overflow: hidden;
        }
        .quick-widget-header {
            padding: 20px 24px;
            background: linear-gradient(135deg, var(--navy), var(--navy-light));
            color: white;
        }
        .quick-widget-body {
            padding: 24px;
        }
        
        /* Health Profile Card Enhancement */
        .profile-card {
            border-radius: 28px;
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            transition: all 0.4s var(--ease-spring);
        }
        .profile-card:hover {
            box-shadow: var(--shadow-xl), var(--shadow-glow);
        }
        .profile-metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }
        .profile-metric {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 16px;
            text-align: center;
            transition: all 0.3s var(--ease-spring);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .profile-metric:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
        .profile-metric .metric-value {
            font-size: 1.75rem;
            font-weight: 700;
            line-height: 1.2;
        }
        .profile-metric .metric-label {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 4px;
        }
        
        @media (max-width: 768px) {
            .profile-metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .section-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
            .section-meta {
                width: 100%;
                justify-content: flex-start;
            }
        }
        
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
        /* Scroll Animation */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Typing Animation */
        .typing {
            overflow: hidden;
            border-right: 2px solid var(--gold);
            white-space: nowrap;
            animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--gold) }
        }
        
        /* Modern Hero Image Container */
        .hero-image-container {
            position: relative;
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0, 31, 63, 0.3), 0 10px 30px rgba(201, 162, 39, 0.15);
            transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
            transition: transform 0.5s ease;
        }
        .hero-image-container:hover {
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
        }
        .hero-image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        .hero-image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(0, 31, 63, 0.3) 0%, transparent 50%, rgba(201, 162, 39, 0.2) 100%);
        }
        
        /* Morphing blob animation */
        .morph-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: morph 20s ease-in-out infinite;
        }
        @keyframes morph {
            0%, 100% { border-radius: 50% 30% 70% 40% / 60% 40% 30% 70%; }
            25% { border-radius: 30% 60% 40% 70% / 50% 60% 30% 60%; }
            50% { border-radius: 60% 40% 30% 60% / 70% 30% 50% 40%; }
            75% { border-radius: 40% 70% 60% 30% / 40% 50% 60% 70%; }
        }
        
        /* Category card with illustration */
        .category-card-visual {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            background: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .category-card-visual:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(201, 162, 39, 0.1);
        }
        .category-card-visual .visual-bg {
            height: 180px;
            overflow: hidden;
            position: relative;
        }
        .category-card-visual .visual-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .category-card-visual:hover .visual-bg img {
            transform: scale(1.1);
        }
        .category-card-visual .visual-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0, 31, 63, 0.9) 0%, rgba(0, 31, 63, 0.3) 50%, transparent 100%);
        }
        .category-card-visual .content {
            padding: 20px;
            position: relative;
            z-index: 10;
        }
        
        /* Animated progress ring */
        .progress-ring {
            transform: rotate(-90deg);
        }
        .progress-ring-circle {
            transition: stroke-dashoffset 0.5s ease;
        }
        
        /* Stagger animation for cards */
        .stagger-in {
            opacity: 0;
            transform: translateY(30px);
            animation: stagger-in 0.6s ease-out forwards;
        }
        @keyframes stagger-in {
            to { opacity: 1; transform: translateY(0); }
        }
        .stagger-delay-1 { animation-delay: 0.1s; }
        .stagger-delay-2 { animation-delay: 0.2s; }
        .stagger-delay-3 { animation-delay: 0.3s; }
        .stagger-delay-4 { animation-delay: 0.4s; }
        .stagger-delay-5 { animation-delay: 0.5s; }
        .stagger-delay-6 { animation-delay: 0.6s; }
        
        /* Gradient border animation */
        .gradient-border {
            position: relative;
            background: white;
            border-radius: 24px;
        }
        .gradient-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 26px;
            background: linear-gradient(135deg, var(--gold), #E5C04B, var(--navy), var(--gold));
            background-size: 400% 400%;
            animation: gradient-shift 8s ease infinite;
            z-index: -1;
        }
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Interactive stat counter */
        .stat-counter {
            display: inline-block;
            position: relative;
        }
        .stat-counter::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), transparent);
            border-radius: 2px;
        }
        
        /* Modern tag styles */
        .modern-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 100px;
            font-size: 12px;
            font-weight: 600;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        .modern-tag:hover {
            transform: translateY(-2px);
        }
        
        /* Skeleton loading animation */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
        }
        @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Interactive hover spotlight */
        .spotlight-card {
            position: relative;
            overflow: hidden;
        }
        .spotlight-card::before {
            content: '';
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 162, 39, 0.15), transparent 40%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .spotlight-card:hover::before {
            opacity: 1;
        }
    </style>
</head>
<body class="bg-cream animated-bg gradient-mesh">
    <!-- Noise Overlay for Premium Feel -->
    <div class="noise-overlay"></div>
    
    <!-- Floating Particles -->
    <div class="particles">
        <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
        <div class="particle" style="left: 20%; animation-delay: 2s;"></div>
        <div class="particle" style="left: 30%; animation-delay: 4s;"></div>
        <div class="particle" style="left: 50%; animation-delay: 1s;"></div>
        <div class="particle" style="left: 70%; animation-delay: 3s;"></div>
        <div class="particle" style="left: 80%; animation-delay: 5s;"></div>
        <div class="particle" style="left: 90%; animation-delay: 2.5s;"></div>
    </div>

    <!-- Modern Hero Header with Visual -->
    <header class="gradient-hero relative overflow-hidden">
        <!-- Morphing Blobs -->
        <div class="morph-blob absolute top-0 right-0 w-96 h-96 bg-gold/20 opacity-30"></div>
        <div class="morph-blob absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/20 opacity-20" style="animation-delay: -5s;"></div>
        
        <div class="max-w-7xl mx-auto px-4 py-6 relative z-10">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-2xl font-bold text-white group">
                        SelectCare<span class="text-gold group-hover:text-yellow-300 transition-colors">OS</span>™
                    </a>
                    <span class="px-4 py-1.5 glass-dark text-gold text-sm rounded-full font-medium flex items-center border border-gold/20">
                        <i class="fas fa-calculator mr-2 icon-pulse"></i> Health Calculators
                    </span>
                </div>
                <div class="flex items-center space-x-3">
                    <a href="/dashboard" class="text-white/80 hover:text-white text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all border border-white/10">
                        <i class="fas fa-arrow-left"></i> Dashboard
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Hero Content Inside Header -->
        <div class="max-w-7xl mx-auto px-4 py-12 lg:py-20 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                <!-- Text Content -->
                <div class="lg:w-1/2 text-center lg:text-left">
                    <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-gold text-sm font-medium mb-6 border border-gold/30 stagger-in">
                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        23 Calculators Available
                        <span class="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">NEW</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight stagger-in stagger-delay-1">
                        Health <span class="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Calculators</span> Hub
                    </h1>
                    <p class="text-white/70 text-lg max-w-xl mb-8 stagger-in stagger-delay-2">
                        Precision medical tools designed by German board-certified physicians. 
                        Make informed decisions about your health journey.
                    </p>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 stagger-in stagger-delay-3">
                        <button onclick="openCalculator('bmi')" class="btn-primary group">
                            <i class="fas fa-calculator mr-2 group-hover:rotate-12 transition-transform"></i>
                            Try BMI Calculator
                        </button>
                        <a href="#all-calculators" class="px-6 py-3 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all font-medium">
                            <i class="fas fa-th-large mr-2"></i>
                            Browse All
                        </a>
                    </div>
                    
                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-3 justify-center lg:justify-start stagger-in stagger-delay-4">
                        <div class="modern-tag bg-green-500/20 text-green-400 border border-green-500/30">
                            <i class="fas fa-shield-check"></i>
                            <span>MD Reviewed</span>
                        </div>
                        <div class="modern-tag bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            <i class="fas fa-lock"></i>
                            <span>HIPAA Compliant</span>
                        </div>
                        <div class="modern-tag bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            <i class="fas fa-bolt"></i>
                            <span>Instant Results</span>
                        </div>
                    </div>
                </div>
                
                <!-- Hero Visual -->
                <div class="lg:w-1/2 relative stagger-in stagger-delay-5">
                    <div class="hero-image-container">
                        <img src="https://www.genspark.ai/api/files/s/Vwshp9ux?cache_control=3600" 
                             alt="Health Calculators Dashboard" 
                             class="w-full"
                             loading="eager">
                        <div class="hero-image-overlay"></div>
                        
                        <!-- Floating Stats on Image -->
                        <div class="absolute top-4 right-4 glass px-4 py-2 rounded-xl float">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <i class="fas fa-check text-white text-sm"></i>
                                </div>
                                <div>
                                    <div class="text-xs text-gray-500">Accuracy Rate</div>
                                    <div class="text-sm font-bold text-navy">99.2%</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="absolute bottom-4 left-4 glass px-4 py-2 rounded-xl float float-delay-1">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                    <i class="fas fa-users text-navy text-sm"></i>
                                </div>
                                <div>
                                    <div class="text-xs text-gray-500">Users Today</div>
                                    <div class="text-sm font-bold text-navy">2,847</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating Category Icons -->
                    <div class="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-xl float flex items-center justify-center">
                        <i class="fas fa-heartbeat text-white text-2xl"></i>
                    </div>
                    <div class="absolute top-1/3 -right-4 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-xl float float-delay-1 flex items-center justify-center">
                        <i class="fas fa-weight-scale text-white text-xl"></i>
                    </div>
                    <div class="absolute -bottom-4 left-1/3 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-xl float float-delay-2 flex items-center justify-center">
                        <i class="fas fa-apple-whole text-white text-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-12 relative z-10" id="all-calculators">
        
        <!-- My Health Metrics Summary (Persistent Profile) -->
        <div class="bg-white rounded-3xl shadow-lg mb-10 overflow-hidden border border-gray-100" id="health-profile-card">
            <div class="gradient-navy p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-user text-navy text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-white font-bold text-lg">My Health Profile</h3>
                            <p class="text-white/60 text-sm">Your saved health metrics</p>
                        </div>
                    </div>
                    <button onclick="toggleHealthProfile()" class="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                        <i class="fas fa-chevron-down mr-2" id="profile-toggle-icon"></i>
                        <span id="profile-toggle-text">Show Details</span>
                    </button>
                </div>
                
                <!-- Quick Metrics Row -->
                <div class="grid grid-cols-4 gap-4 mt-6" id="quick-metrics">
                    <div class="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <div class="text-2xl font-bold text-white" id="profile-bmi">--</div>
                        <div class="text-xs text-white/60">BMI</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <div class="text-2xl font-bold text-white" id="profile-weight">--</div>
                        <div class="text-xs text-white/60">Weight (kg)</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <div class="text-2xl font-bold text-white" id="profile-height">--</div>
                        <div class="text-xs text-white/60">Height (cm)</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <div class="text-2xl font-bold text-gold" id="profile-status">--</div>
                        <div class="text-xs text-white/60">Status</div>
                    </div>
                </div>
            </div>
            
            <!-- Expanded Profile Details (Hidden by default) -->
            <div class="p-6 hidden" id="profile-details">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-4">
                        <h4 class="font-semibold text-navy flex items-center gap-2">
                            <i class="fas fa-chart-pie text-red-500"></i> Body Composition
                        </h4>
                        <div class="space-y-2">
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Body Fat</span>
                                <span class="font-semibold text-navy" id="profile-bodyfat">Not calculated</span>
                            </div>
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Ideal Weight</span>
                                <span class="font-semibold text-navy" id="profile-ideal">Not calculated</span>
                            </div>
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Excess Weight</span>
                                <span class="font-semibold text-navy" id="profile-excess">Not calculated</span>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-semibold text-navy flex items-center gap-2">
                            <i class="fas fa-fire text-orange-500"></i> Nutrition
                        </h4>
                        <div class="space-y-2">
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Daily Calories (TDEE)</span>
                                <span class="font-semibold text-navy" id="profile-tdee">Not calculated</span>
                            </div>
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Protein Goal</span>
                                <span class="font-semibold text-navy" id="profile-protein">Not calculated</span>
                            </div>
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Water Intake</span>
                                <span class="font-semibold text-navy" id="profile-water">Not calculated</span>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-semibold text-navy flex items-center gap-2">
                            <i class="fas fa-user-md text-purple-500"></i> Surgery Readiness
                        </h4>
                        <div class="space-y-2">
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Eligible</span>
                                <span class="font-semibold" id="profile-eligible">Check BMI</span>
                            </div>
                            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-600">Recommended</span>
                                <span class="font-semibold text-navy" id="profile-recommended">--</span>
                            </div>
                            <div class="p-3 bg-gold/10 rounded-lg text-center">
                                <a href="/instant-connect" class="text-gold font-semibold hover:underline">
                                    <i class="fas fa-video mr-2"></i>Book Free Consultation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 pt-6 border-t text-center">
                    <button onclick="clearHealthProfile()" class="text-red-500 text-sm hover:underline">
                        <i class="fas fa-trash-alt mr-2"></i>Clear My Health Data
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Quick Calculator Widget - Inline BMI -->
        <div class="bg-white rounded-3xl shadow-lg p-6 mb-10 border border-gray-100">
            <div class="flex flex-col lg:flex-row gap-8 items-center">
                <div class="lg:w-1/3">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-bolt text-navy text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-navy text-lg">Quick BMI Check</h3>
                            <p class="text-gray-500 text-sm">Get instant results</p>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm">Enter your measurements for an instant BMI calculation and surgery eligibility assessment.</p>
                </div>
                <div class="lg:w-2/3">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Height (cm)</label>
                            <input type="number" id="quick-height" placeholder="175" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:ring-0 text-lg font-semibold text-navy" oninput="quickBMI()">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1">Weight (kg)</label>
                            <input type="number" id="quick-weight" placeholder="85" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:ring-0 text-lg font-semibold text-navy" oninput="quickBMI()">
                        </div>
                        <div class="text-center">
                            <div class="text-xs font-medium text-gray-500 mb-1">Your BMI</div>
                            <div class="text-4xl font-black text-navy" id="quick-bmi-value">--</div>
                            <div class="text-xs font-semibold" id="quick-bmi-category">Enter your data</div>
                        </div>
                        <div>
                            <button onclick="openCalculator('bmi')" class="w-full btn-primary py-3 text-sm">
                                <i class="fas fa-expand mr-2"></i>Full Analysis
                            </button>
                        </div>
                    </div>
                    <!-- Quick Surgery Eligibility Indicator -->
                    <div id="quick-surgery-alert" class="mt-4 hidden">
                        <div class="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-user-md text-purple-600"></i>
                            </div>
                            <div class="flex-1">
                                <div class="font-semibold text-purple-900" id="quick-surgery-text">You may qualify for bariatric surgery</div>
                                <div class="text-sm text-purple-700">Gastric Sleeve from <span class="font-bold">€5,500</span></div>
                            </div>
                            <a href="/instant-connect" class="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                                Free Consultation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Stats with Interactive Counters -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            <div class="stat-card spotlight-card group hover:scale-105 transition-transform stagger-in stagger-delay-1" onmousemove="updateSpotlight(event, this)">
                <div class="relative">
                    <svg class="w-16 h-16 mx-auto mb-3" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="url(#blueGrad)" stroke-width="4" 
                                stroke-dasharray="163" stroke-dashoffset="0" class="progress-ring-circle"
                                style="transform: rotate(-90deg); transform-origin: 50% 50%;"/>
                        <defs><linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-calculator text-blue-600 text-xl group-hover:scale-125 transition-transform"></i>
                    </div>
                </div>
                <div class="stat-number stat-counter" data-target="23">23</div>
                <div class="text-sm text-gray-500 font-medium">Calculators</div>
            </div>
            <div class="stat-card spotlight-card group hover:scale-105 transition-transform stagger-in stagger-delay-2" onmousemove="updateSpotlight(event, this)">
                <div class="relative">
                    <svg class="w-16 h-16 mx-auto mb-3" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="url(#purpleGrad)" stroke-width="4" 
                                stroke-dasharray="163" stroke-dashoffset="40" class="progress-ring-circle"/>
                        <defs><linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="#A78BFA"/></linearGradient></defs>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-layer-group text-purple-600 text-xl group-hover:scale-125 transition-transform"></i>
                    </div>
                </div>
                <div class="stat-number" style="background: linear-gradient(135deg, #7C3AED, #A855F7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">6</div>
                <div class="text-sm text-gray-500 font-medium">Categories</div>
            </div>
            <div class="stat-card spotlight-card group hover:scale-105 transition-transform stagger-in stagger-delay-3" onmousemove="updateSpotlight(event, this)">
                <div class="relative">
                    <svg class="w-16 h-16 mx-auto mb-3" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="url(#greenGrad)" stroke-width="4" 
                                stroke-dasharray="163" stroke-dashoffset="0" class="progress-ring-circle"/>
                        <defs><linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22C55E"/><stop offset="100%" stop-color="#4ADE80"/></linearGradient></defs>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-hand-holding-heart text-green-600 text-xl group-hover:scale-125 transition-transform"></i>
                    </div>
                </div>
                <div class="stat-number" style="background: linear-gradient(135deg, #16A34A, #22C55E); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">100%</div>
                <div class="text-sm text-gray-500 font-medium">Free to Use</div>
            </div>
            <div class="stat-card spotlight-card group hover:scale-105 transition-transform stagger-in stagger-delay-4" onmousemove="updateSpotlight(event, this)">
                <div class="relative">
                    <svg class="w-16 h-16 mx-auto mb-3" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="url(#goldGrad)" stroke-width="4" 
                                stroke-dasharray="163" stroke-dashoffset="0" class="progress-ring-circle"/>
                        <defs><linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C9A227"/><stop offset="100%" stop-color="#E5C04B"/></linearGradient></defs>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-user-md text-gold text-xl group-hover:scale-125 transition-transform"></i>
                    </div>
                </div>
                <div class="stat-number" style="background: linear-gradient(135deg, #C9A227, #E5C04B); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">MD</div>
                <div class="text-sm text-gray-500 font-medium">Reviewed</div>
            </div>
        </div>
        
        <!-- Enhanced Category Tabs with Sticky Navigation -->
        <div class="category-tabs-container">
            <div class="category-tabs-inner">
                <button class="category-tab active" onclick="filterCategory('all')" data-category="all">
                    <div class="tab-icon bg-gradient-to-br from-gray-100 to-gray-200">
                        <i class="fas fa-th-large text-gray-600 text-sm"></i>
                    </div>
                    <span>All</span>
                    <span class="tab-count bg-gray-100 text-gray-600">23</span>
                </button>
                <button class="category-tab" onclick="filterCategory('essential')" data-category="essential">
                    <div class="tab-icon bg-gradient-to-br from-red-100 to-red-200">
                        <i class="fas fa-heart-pulse text-red-500 text-sm"></i>
                    </div>
                    <span>Essential</span>
                    <span class="tab-count bg-red-50 text-red-600">4</span>
                </button>
                <button class="category-tab" onclick="filterCategory('bariatric')" data-category="bariatric">
                    <div class="tab-icon bg-gradient-to-br from-purple-100 to-purple-200">
                        <i class="fas fa-weight-scale text-purple-500 text-sm"></i>
                    </div>
                    <span>Bariatric</span>
                    <span class="tab-count bg-purple-50 text-purple-600">4</span>
                </button>
                <button class="category-tab" onclick="filterCategory('surgical')" data-category="surgical">
                    <div class="tab-icon bg-gradient-to-br from-blue-100 to-blue-200">
                        <i class="fas fa-user-doctor text-blue-500 text-sm"></i>
                    </div>
                    <span>Surgical</span>
                    <span class="tab-count bg-blue-50 text-blue-600">4</span>
                </button>
                <button class="category-tab" onclick="filterCategory('nutrition')" data-category="nutrition">
                    <div class="tab-icon bg-gradient-to-br from-green-100 to-green-200">
                        <i class="fas fa-apple-whole text-green-500 text-sm"></i>
                    </div>
                    <span>Nutrition</span>
                    <span class="tab-count bg-green-50 text-green-600">4</span>
                </button>
                <button class="category-tab" onclick="filterCategory('wellness')" data-category="wellness">
                    <div class="tab-icon bg-gradient-to-br from-pink-100 to-pink-200">
                        <i class="fas fa-spa text-pink-500 text-sm"></i>
                    </div>
                    <span>Wellness</span>
                    <span class="tab-count bg-pink-50 text-pink-600">4</span>
                </button>
                <button class="category-tab" onclick="filterCategory('financial')" data-category="financial">
                    <div class="tab-icon bg-gradient-to-br from-yellow-100 to-yellow-200">
                        <i class="fas fa-piggy-bank text-yellow-600 text-sm"></i>
                    </div>
                    <span>Financial</span>
                    <span class="tab-count bg-yellow-50 text-yellow-700">3</span>
                </button>
            </div>
            <!-- Enhanced scroll fade indicators -->
            <div class="absolute right-0 top-4 bottom-8 w-16 bg-gradient-to-l from-cream via-cream/90 to-transparent pointer-events-none md:hidden"></div>
        </div>
        
        <!-- Popular Calculators - Enhanced Section with Visual Hierarchy -->
        <div id="popular-section" class="mb-20">
            <div class="section-header">
                <div class="section-title">
                    <div class="section-icon bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-200/50">
                        <i class="fas fa-fire text-white text-xl"></i>
                    </div>
                    <div class="section-text">
                        <h2>Most Popular</h2>
                        <p>Top calculators used by our patients</p>
                    </div>
                </div>
                <div class="section-meta">
                    <span class="inline-flex items-center gap-2 text-sm bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
                        <i class="fas fa-users text-gold"></i>
                        <span class="font-semibold text-navy">10,000+</span>
                        <span class="text-gray-500">patients</span>
                    </span>
                    <span class="inline-flex items-center gap-2 text-sm bg-green-50 text-green-700 px-4 py-2.5 rounded-xl border border-green-100">
                        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span class="font-medium">Updated today</span>
                    </span>
                </div>
            </div>
            
            <!-- Featured Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- BMI Calculator - Featured Card with Visual -->
                <div class="category-card-visual spotlight-card cursor-pointer stagger-in stagger-delay-1" onclick="openCalculator('bmi')" data-category="essential" onmousemove="updateSpotlight(event, this)">
                    <div class="popular-badge z-20"><i class="fas fa-crown mr-1"></i> #1</div>
                    <div class="visual-bg">
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" alt="BMI Health" loading="lazy">
                        <div class="visual-overlay"></div>
                        <div class="absolute bottom-3 left-3 text-white">
                            <div class="text-xs opacity-75">Essential Health</div>
                            <div class="text-xl font-bold">BMI Calculator</div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-weight text-white text-lg"></i>
                            </div>
                            <div class="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                                <i class="fas fa-bolt"></i>
                                <span>30 sec</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">Calculate your Body Mass Index and get surgery recommendations</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">Essential</span>
                            <span class="text-gold font-medium text-sm group-hover:translate-x-1 transition-transform">
                                Try Now <i class="fas fa-arrow-right ml-1"></i>
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Surgery Eligibility - Featured Card with Visual -->
                <div class="category-card-visual spotlight-card cursor-pointer stagger-in stagger-delay-2" onclick="openCalculator('bariatric-eligibility')" data-category="bariatric" onmousemove="updateSpotlight(event, this)">
                    <div class="popular-badge z-20"><i class="fas fa-medal mr-1"></i> #2</div>
                    <div class="visual-bg">
                        <img src="https://www.genspark.ai/api/files/s/KglrOtfO?cache_control=3600" alt="Bariatric Surgery" loading="lazy">
                        <div class="visual-overlay"></div>
                        <div class="absolute bottom-3 left-3 text-white">
                            <div class="text-xs opacity-75">Bariatric</div>
                            <div class="text-xl font-bold">Surgery Eligibility</div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-clipboard-check text-white text-lg"></i>
                            </div>
                            <div class="flex items-center gap-1 text-purple-600 text-xs bg-purple-50 px-2 py-1 rounded-full">
                                <i class="fas fa-user-md"></i>
                                <span>Pre-Op</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">Check if you qualify for weight loss surgery procedures</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">Bariatric</span>
                            <span class="text-gold font-medium text-sm">Try Now <i class="fas fa-arrow-right ml-1"></i></span>
                        </div>
                    </div>
                </div>
                
                <!-- Weight Loss Projection - Featured Card with Visual -->
                <div class="category-card-visual spotlight-card cursor-pointer stagger-in stagger-delay-3" onclick="openCalculator('weight-loss-projection')" data-category="bariatric" onmousemove="updateSpotlight(event, this)">
                    <div class="popular-badge z-20"><i class="fas fa-award mr-1"></i> #3</div>
                    <div class="visual-bg">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" alt="Weight Loss" loading="lazy">
                        <div class="visual-overlay"></div>
                        <div class="absolute bottom-3 left-3 text-white">
                            <div class="text-xs opacity-75">Forecast</div>
                            <div class="text-xl font-bold">Weight Projection</div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-chart-line text-white text-lg"></i>
                            </div>
                            <div class="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                                <i class="fas fa-calendar"></i>
                                <span>6-18 mo</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">Project your weight loss journey at 6, 12, and 18 months</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">Forecast</span>
                            <span class="text-gold font-medium text-sm">Try Now <i class="fas fa-arrow-right ml-1"></i></span>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Comparison - Featured Card with Visual -->
                <div class="category-card-visual spotlight-card cursor-pointer stagger-in stagger-delay-4" onclick="openCalculator('cost-comparison')" data-category="financial" onmousemove="updateSpotlight(event, this)">
                    <div class="popular-badge z-20"><i class="fas fa-star mr-1"></i> #4</div>
                    <div class="visual-bg">
                        <img src="https://www.genspark.ai/api/files/s/EiFgGIrI?cache_control=3600" alt="Cost Savings" loading="lazy">
                        <div class="visual-overlay"></div>
                        <div class="absolute bottom-3 left-3 text-white">
                            <div class="text-xs opacity-75">Financial</div>
                            <div class="text-xl font-bold">Cost Comparison</div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-euro-sign text-navy text-lg"></i>
                            </div>
                            <div class="flex items-center gap-1 text-gold text-xs bg-gold/10 px-2 py-1 rounded-full">
                                <i class="fas fa-piggy-bank"></i>
                                <span>Save 75%</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">Compare costs: Germany vs Turkey vs German Select</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Savings</span>
                            <span class="text-gold font-medium text-sm">Try Now <i class="fas fa-arrow-right ml-1"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Enhanced Visual Divider -->
        <div class="visual-divider my-20">
            <div class="divider-icon">
                <i class="fas fa-th-large"></i>
            </div>
        </div>
        
        <!-- Section Title for All Calculators -->
        <div class="text-center mb-12">
            <span class="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold-warm rounded-full text-sm font-medium mb-4">
                <i class="fas fa-layer-group"></i>
                6 Categories
            </span>
            <h2 class="text-3xl font-bold text-navy mb-3">All Calculators by Category</h2>
            <p class="text-gray-500 max-w-2xl mx-auto">Browse our comprehensive collection of medical calculators, organized by category for easy navigation</p>
        </div>
        
        <!-- All Calculators Grid -->
        <div id="calculators-grid">
            <!-- Essential Health with Visual Header -->
            <div class="category-section mb-12" data-category="essential">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" alt="Essential Health" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-heart-pulse text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Essential Health</h2>
                                        <p class="text-white/70 text-sm">Core metrics every patient should know</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-info-circle text-red-500"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Why These Matter</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Essential health calculators help you understand your body's baseline metrics. 
                                        BMI, body fat percentage, and blood pressure are fundamental indicators that 
                                        our German board-certified physicians use to assess your overall health status.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div class="card calculator-card" onclick="openCalculator('bmi')">
                        <div class="card-shine"></div>
                        <div class="flex items-start justify-between mb-4">
                            <div class="icon-container bg-gradient-to-br from-red-100 to-red-200">
                                <i class="fas fa-weight text-red-600 text-xl"></i>
                            </div>
                            <span class="category-badge bg-red-50 text-red-600 border border-red-100">Essential</span>
                        </div>
                        <h3 class="font-bold text-navy text-lg mb-2">BMI Calculator</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-grow">Calculate Body Mass Index and weight category</p>
                        <div class="time-badge">
                            <i class="fas fa-clock"></i>
                            <span>~30 sec</span>
                        </div>
                        <div class="cta-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                    
                    <div class="card calculator-card" onclick="openCalculator('body-fat')">
                        <div class="card-shine"></div>
                        <div class="flex items-start justify-between mb-4">
                            <div class="icon-container bg-gradient-to-br from-purple-100 to-purple-200">
                                <i class="fas fa-percent text-purple-600 text-xl"></i>
                            </div>
                            <span class="category-badge bg-purple-50 text-purple-600 border border-purple-100">Navy Method</span>
                        </div>
                        <h3 class="font-bold text-navy text-lg mb-2">Body Fat %</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-grow">Estimate body fat using scientific Navy method</p>
                        <div class="time-badge">
                            <i class="fas fa-clock"></i>
                            <span>~45 sec</span>
                        </div>
                        <div class="cta-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                    
                    <div class="card calculator-card" onclick="openCalculator('blood-pressure')">
                        <div class="card-shine"></div>
                        <div class="flex items-start justify-between mb-4">
                            <div class="icon-container bg-gradient-to-br from-pink-100 to-pink-200">
                                <i class="fas fa-heart text-pink-600 text-xl"></i>
                            </div>
                            <span class="category-badge bg-pink-50 text-pink-600 border border-pink-100">Vital</span>
                        </div>
                        <h3 class="font-bold text-navy text-lg mb-2">Blood Pressure</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-grow">Interpret BP readings with health insights</p>
                        <div class="time-badge">
                            <i class="fas fa-clock"></i>
                            <span>~15 sec</span>
                        </div>
                        <div class="cta-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                    
                    <div class="card calculator-card" onclick="openCalculator('heart-rate-zones')">
                        <div class="card-shine"></div>
                        <div class="flex items-start justify-between mb-4">
                            <div class="icon-container bg-gradient-to-br from-rose-100 to-rose-200">
                                <i class="fas fa-heartbeat text-rose-600 text-xl"></i>
                            </div>
                            <span class="category-badge bg-rose-50 text-rose-600 border border-rose-100">Fitness</span>
                        </div>
                        <h3 class="font-bold text-navy text-lg mb-2">Heart Rate Zones</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-grow">Optimize training with personalized targets</p>
                        <div class="time-badge">
                            <i class="fas fa-clock"></i>
                            <span>~20 sec</span>
                        </div>
                        <div class="cta-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bariatric & Weight Loss with Visual Header -->
            <div class="category-section mb-12" data-category="bariatric">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://www.genspark.ai/api/files/s/KglrOtfO?cache_control=3600" alt="Bariatric Surgery" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-weight-scale text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Bariatric & Weight Loss</h2>
                                        <p class="text-white/70 text-sm">Specialized surgery planning tools</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-stethoscope text-purple-500"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Your Weight Loss Journey</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Our bariatric calculators help you determine if you're a candidate for weight loss surgery 
                                        and project your expected outcomes. With <strong>Gastric Sleeve starting at €5,500</strong>, 
                                        we make your transformation journey accessible with German-quality care.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            
            <!-- Surgical Planning with Visual Header -->
            <div class="category-section mb-12" data-category="surgical">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://www.genspark.ai/api/files/s/EgXOsjkU?cache_control=3600" alt="Surgical Planning" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-user-doctor text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Surgical Planning</h2>
                                        <p class="text-white/70 text-sm">Pre-operative assessment tools</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-clipboard-list text-blue-500"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Prepare for Success</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Surgical planning calculators help assess your readiness and potential risks. 
                                        Our ASA classification, recovery timeline, and pre-op checklist ensure you're 
                                        fully prepared for your procedure with our German board-certified surgeons.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            
            <!-- Nutrition & Fitness with Visual Header -->
            <div class="category-section mb-12" data-category="nutrition">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://www.genspark.ai/api/files/s/zRm0Nav1?cache_control=3600" alt="Nutrition Wellness" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-apple-whole text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Nutrition & Fitness</h2>
                                        <p class="text-white/70 text-sm">Diet & exercise optimization</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-salad text-green-500"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Fuel Your Recovery</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Proper nutrition is essential before and after surgery. Calculate your TDEE, 
                                        macros, protein needs, and hydration requirements to optimize your body for 
                                        the best surgical outcomes and fastest recovery.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            
            <!-- Wellness & Lifestyle with Visual Header -->
            <div class="category-section mb-12" data-category="wellness">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://www.genspark.ai/api/files/s/AZTf4NnD?cache_control=3600" alt="Wellness Lifestyle" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-spa text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Wellness & Lifestyle</h2>
                                        <p class="text-white/70 text-sm">Holistic health assessment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-heart text-pink-500"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Beyond Physical Health</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        True wellness encompasses sleep quality, stress levels, and your body's biological age. 
                                        These calculators help you understand the full picture of your health, supporting 
                                        not just surgical outcomes but your overall quality of life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            
            <!-- Financial with Visual Header -->
            <div class="category-section mb-12" data-category="financial">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <!-- Category Visual Card -->
                    <div class="md:w-1/3">
                        <div class="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://www.genspark.ai/api/files/s/EiFgGIrI?cache_control=3600" alt="Cost Savings" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/50 to-transparent"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <i class="fas fa-piggy-bank text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Cost & Savings</h2>
                                        <p class="text-white/70 text-sm">Medical tourism value calculator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category Description -->
                    <div class="md:w-2/3 flex items-center">
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-euro-sign text-yellow-600"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-navy mb-2">Smart Healthcare Investment</h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Compare costs across Germany, Turkey, and German Select. Our medical tourism model 
                                        delivers <strong>up to 75% savings vs. German prices</strong> while maintaining 
                                        German-quality standards with board-certified surgeons.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        
        <!-- Modern CTA Section -->
        <div class="relative mt-16 mb-8 overflow-hidden rounded-3xl">
            <!-- Background with gradient -->
            <div class="absolute inset-0 gradient-navy"></div>
            <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div class="relative z-10 p-10 md:p-16 text-center">
                <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-gold text-sm font-medium mb-6 border border-gold/30">
                    <i class="fas fa-gift mr-2"></i>
                    Limited Time Offer
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
                <p class="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                    Get a personalized health assessment from our German board-certified surgeons.
                    <span class="text-gold font-semibold">Free video consultation included.</span>
                </p>
                
                <!-- Stats Row -->
                <div class="flex flex-wrap justify-center gap-8 mb-10">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gold">€5,500</div>
                        <div class="text-white/60 text-sm">Gastric Sleeve from</div>
                    </div>
                    <div class="w-px h-12 bg-white/20 hidden md:block"></div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gold">75%</div>
                        <div class="text-white/60 text-sm">Savings vs Germany</div>
                    </div>
                    <div class="w-px h-12 bg-white/20 hidden md:block"></div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gold">5★</div>
                        <div class="text-white/60 text-sm">Resort Recovery</div>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/instant-connect" class="inline-flex items-center justify-center px-8 py-4 bg-white text-navy rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                        <i class="fas fa-video mr-3"></i> Free Video Consultation
                    </a>
                    <a href="/services" class="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-xl">
                        <i class="fas fa-calendar-check mr-3"></i> Book Your Surgery
                    </a>
                </div>
                
                <p class="text-white/50 text-sm mt-6">
                    <i class="fas fa-shield-check mr-1"></i>
                    No commitment required • Results in 24 hours
                </p>
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
    
    <!-- TDEE Calculator Modal -->
    <div id="modal-tdee" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b bg-gradient-to-r from-orange-50 to-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <i class="fas fa-fire text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">TDEE Calculator</h2>
                            <p class="text-sm text-gray-500">Daily calorie needs</p>
                        </div>
                    </div>
                    <button onclick="closeModal('tdee')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <input type="number" id="tdee-age" placeholder="35" class="input-field" oninput="calculateTDEE()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select id="tdee-gender" class="input-field" onchange="calculateTDEE()">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                        <input type="number" id="tdee-height" placeholder="175" class="input-field" oninput="calculateTDEE()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                        <input type="number" id="tdee-weight" placeholder="80" class="input-field" oninput="calculateTDEE()">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                    <select id="tdee-activity" class="input-field" onchange="calculateTDEE()">
                        <option value="1.2">Sedentary (office job, no exercise)</option>
                        <option value="1.375">Light (1-3 days/week exercise)</option>
                        <option value="1.55" selected>Moderate (3-5 days/week)</option>
                        <option value="1.725">Very Active (6-7 days/week)</option>
                        <option value="1.9">Extremely Active (athlete/physical job)</option>
                    </select>
                </div>
                
                <div id="tdee-result" class="hidden">
                    <div class="result-card p-6 mb-4">
                        <div class="grid grid-cols-2 gap-4 text-center mb-4">
                            <div class="p-4 bg-white rounded-xl">
                                <div class="text-xs text-gray-500 mb-1">BMR (Base)</div>
                                <div class="text-2xl font-bold text-navy" id="tdee-bmr">--</div>
                                <div class="text-xs text-gray-400">kcal/day</div>
                            </div>
                            <div class="p-4 bg-white rounded-xl border-2 border-gold">
                                <div class="text-xs text-gold mb-1">TDEE (Total)</div>
                                <div class="text-3xl font-bold text-gold" id="tdee-value">--</div>
                                <div class="text-xs text-gray-400">kcal/day</div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600"><i class="fas fa-arrow-down text-green-500 mr-2"></i>Weight Loss</span>
                                <span class="font-bold text-green-600" id="tdee-loss">--</span>
                            </div>
                            <div class="flex justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600"><i class="fas fa-equals text-blue-500 mr-2"></i>Maintain</span>
                                <span class="font-bold text-blue-600" id="tdee-maintain">--</span>
                            </div>
                            <div class="flex justify-between p-3 bg-white rounded-lg">
                                <span class="text-gray-600"><i class="fas fa-arrow-up text-purple-500 mr-2"></i>Weight Gain</span>
                                <span class="font-bold text-purple-600" id="tdee-gain">--</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        Uses Mifflin-St Jeor formula, the most accurate for general population.
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Body Fat Calculator Modal -->
    <div id="modal-body-fat" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b bg-gradient-to-r from-purple-50 to-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <i class="fas fa-percent text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Body Fat %</h2>
                            <p class="text-sm text-gray-500">U.S. Navy Method</p>
                        </div>
                    </div>
                    <button onclick="closeModal('body-fat')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select id="bf-gender" class="input-field" onchange="calculateBodyFat()">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                            <input type="number" id="bf-height" placeholder="175" class="input-field" oninput="calculateBodyFat()">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Neck (cm)</label>
                            <input type="number" id="bf-neck" placeholder="38" class="input-field" oninput="calculateBodyFat()">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Waist (cm)</label>
                            <input type="number" id="bf-waist" placeholder="88" class="input-field" oninput="calculateBodyFat()">
                        </div>
                        <div id="bf-hip-field">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Hip (cm) <span class="text-purple-500">♀ only</span></label>
                            <input type="number" id="bf-hip" placeholder="96" class="input-field" oninput="calculateBodyFat()">
                        </div>
                    </div>
                </div>
                
                <div id="bf-result" class="mt-6 hidden">
                    <div class="result-card p-6 text-center">
                        <div class="text-5xl font-bold text-navy mb-2" id="bf-value">--</div>
                        <div class="text-lg font-semibold mb-4" id="bf-category">--</div>
                        <div class="flex gap-1 h-4 rounded-full overflow-hidden mb-4">
                            <div class="bg-blue-500 flex-1" title="Essential"></div>
                            <div class="bg-green-500 flex-1" title="Athletes"></div>
                            <div class="bg-emerald-500 flex-1" title="Fitness"></div>
                            <div class="bg-yellow-500 flex-1" title="Average"></div>
                            <div class="bg-red-500 flex-1" title="Obese"></div>
                        </div>
                        <div class="range-marker">
                            <div class="range-arrow" id="bf-arrow" style="left: 50%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Ideal Weight Calculator Modal -->
    <div id="modal-ideal-weight" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b bg-gradient-to-r from-emerald-50 to-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <i class="fas fa-bullseye text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Ideal Weight</h2>
                            <p class="text-sm text-gray-500">Multiple formulas</p>
                        </div>
                    </div>
                    <button onclick="closeModal('ideal-weight')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select id="iw-gender" class="input-field" onchange="calculateIdealWeight()">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                        <input type="number" id="iw-height" placeholder="175" class="input-field" oninput="calculateIdealWeight()">
                    </div>
                </div>
                
                <div id="iw-result" class="hidden">
                    <div class="result-card p-6">
                        <h4 class="font-semibold text-navy mb-4 text-center">Your Ideal Weight Range</h4>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div>
                                    <span class="font-medium text-navy">Devine Formula</span>
                                    <span class="text-xs text-gray-400 block">Most used clinically</span>
                                </div>
                                <span class="text-xl font-bold text-emerald-600" id="iw-devine">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div>
                                    <span class="font-medium text-navy">Robinson Formula</span>
                                    <span class="text-xs text-gray-400 block">Modified 1983</span>
                                </div>
                                <span class="text-xl font-bold text-blue-600" id="iw-robinson">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div>
                                    <span class="font-medium text-navy">Miller Formula</span>
                                    <span class="text-xs text-gray-400 block">For larger frames</span>
                                </div>
                                <span class="text-xl font-bold text-purple-600" id="iw-miller">--</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-gold">
                                <div>
                                    <span class="font-medium text-navy">Recommended Range</span>
                                    <span class="text-xs text-gold block">Based on BMI 18.5-25</span>
                                </div>
                                <span class="text-xl font-bold text-gold" id="iw-range">--</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recovery Time Calculator Modal -->
    <div id="modal-recovery-time" class="modal">
        <div class="modal-content">
            <div class="p-6 border-b bg-gradient-to-r from-teal-50 to-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <i class="fas fa-calendar-check text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Recovery Timeline</h2>
                            <p class="text-sm text-gray-500">Personalized estimate</p>
                        </div>
                    </div>
                    <button onclick="closeModal('recovery-time')" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
                        <select id="rec-procedure" class="input-field" onchange="calculateRecovery()">
                            <option value="">Select procedure...</option>
                            <option value="gastric-sleeve" data-initial="14" data-full="42">Gastric Sleeve</option>
                            <option value="gastric-bypass" data-initial="21" data-full="56">Gastric Bypass</option>
                            <option value="knee-replacement" data-initial="42" data-full="180">Knee Replacement</option>
                            <option value="hip-replacement" data-initial="42" data-full="180">Hip Replacement</option>
                            <option value="facelift" data-initial="14" data-full="56">Facelift</option>
                            <option value="rhinoplasty" data-initial="10" data-full="90">Rhinoplasty</option>
                            <option value="tummy-tuck" data-initial="21" data-full="84">Tummy Tuck</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                            <input type="number" id="rec-age" placeholder="45" class="input-field" oninput="calculateRecovery()">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Current BMI</label>
                            <input type="number" id="rec-bmi" placeholder="32" class="input-field" oninput="calculateRecovery()">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Health Factors</label>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="rec-diabetes" class="mr-3" onchange="calculateRecovery()">
                                <span class="text-sm">Diabetes</span>
                            </label>
                            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" id="rec-smoking" class="mr-3" onchange="calculateRecovery()">
                                <span class="text-sm">Smoker</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div id="rec-result" class="mt-6 hidden">
                    <div class="result-card p-6">
                        <h4 class="font-semibold text-navy mb-4 text-center">Your Recovery Timeline</h4>
                        <div class="relative">
                            <!-- Timeline -->
                            <div class="flex items-center justify-between mb-8">
                                <div class="flex-1 h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div>
                            </div>
                            <div class="grid grid-cols-3 gap-4 text-center">
                                <div class="p-4 bg-white rounded-xl">
                                    <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <i class="fas fa-bed text-red-500"></i>
                                    </div>
                                    <div class="text-xs text-gray-500 mb-1">Initial Recovery</div>
                                    <div class="text-xl font-bold text-navy" id="rec-initial">--</div>
                                    <div class="text-xs text-gray-400">days</div>
                                </div>
                                <div class="p-4 bg-white rounded-xl">
                                    <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <i class="fas fa-walking text-yellow-500"></i>
                                    </div>
                                    <div class="text-xs text-gray-500 mb-1">Light Activity</div>
                                    <div class="text-xl font-bold text-navy" id="rec-light">--</div>
                                    <div class="text-xs text-gray-400">days</div>
                                </div>
                                <div class="p-4 bg-white rounded-xl border-2 border-green-400">
                                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <i class="fas fa-running text-green-500"></i>
                                    </div>
                                    <div class="text-xs text-gray-500 mb-1">Full Recovery</div>
                                    <div class="text-xl font-bold text-green-600" id="rec-full">--</div>
                                    <div class="text-xs text-gray-400">days</div>
                                </div>
                            </div>
                        </div>
                        <div id="rec-factors" class="mt-4 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800 hidden">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <span id="rec-factors-text"></span>
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
        // Health Profile Management (localStorage)
        const PROFILE_KEY = 'selectcare_health_profile';
        
        function loadHealthProfile() {
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
            if (profile.bmi) document.getElementById('profile-bmi').textContent = profile.bmi;
            if (profile.weight) document.getElementById('profile-weight').textContent = profile.weight;
            if (profile.height) document.getElementById('profile-height').textContent = profile.height;
            if (profile.status) {
                document.getElementById('profile-status').textContent = profile.status;
                document.getElementById('profile-status').className = profile.statusColor || 'text-2xl font-bold text-gold';
            }
            if (profile.bodyfat) document.getElementById('profile-bodyfat').textContent = profile.bodyfat;
            if (profile.ideal) document.getElementById('profile-ideal').textContent = profile.ideal;
            if (profile.excess) document.getElementById('profile-excess').textContent = profile.excess;
            if (profile.tdee) document.getElementById('profile-tdee').textContent = profile.tdee;
            if (profile.protein) document.getElementById('profile-protein').textContent = profile.protein;
            if (profile.water) document.getElementById('profile-water').textContent = profile.water;
            if (profile.eligible) {
                document.getElementById('profile-eligible').textContent = profile.eligible;
                document.getElementById('profile-eligible').className = profile.eligibleColor || 'font-semibold';
            }
            if (profile.recommended) document.getElementById('profile-recommended').textContent = profile.recommended;
        }
        
        function saveToProfile(key, value) {
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
            profile[key] = value;
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
            loadHealthProfile();
        }
        
        function clearHealthProfile() {
            if (confirm('Clear all your saved health data?')) {
                localStorage.removeItem(PROFILE_KEY);
                location.reload();
            }
        }
        
        function toggleHealthProfile() {
            const details = document.getElementById('profile-details');
            const icon = document.getElementById('profile-toggle-icon');
            const text = document.getElementById('profile-toggle-text');
            
            if (details.classList.contains('hidden')) {
                details.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                text.textContent = 'Hide Details';
            } else {
                details.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                text.textContent = 'Show Details';
            }
        }
        
        // Load profile on page load
        document.addEventListener('DOMContentLoaded', loadHealthProfile);
        
        // Spotlight effect for cards
        function updateSpotlight(e, element) {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            element.style.setProperty('--mouse-x', x + '%');
            element.style.setProperty('--mouse-y', y + '%');
        }
        
        // Animated counter
        function animateCounters() {
            const counters = document.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (target - start) * easeOutQuart);
                    counter.textContent = current;
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }
        
        // Intersection Observer for scroll animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('stat-card')) {
                        animateCounters();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.fade-in, .stagger-in, .stat-card').forEach(el => {
            fadeObserver.observe(el);
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Quick BMI Calculator (Inline Widget)
        function quickBMI() {
            const height = parseFloat(document.getElementById('quick-height').value);
            const weight = parseFloat(document.getElementById('quick-weight').value);
            
            if (height && weight && height > 0) {
                const heightM = height / 100;
                const bmi = weight / (heightM * heightM);
                
                document.getElementById('quick-bmi-value').textContent = bmi.toFixed(1);
                
                let category, color;
                if (bmi < 18.5) { category = 'Underweight'; color = '#3B82F6'; }
                else if (bmi < 25) { category = 'Normal'; color = '#22C55E'; }
                else if (bmi < 30) { category = 'Overweight'; color = '#F59E0B'; }
                else if (bmi < 35) { category = 'Obese I'; color = '#EF4444'; }
                else if (bmi < 40) { category = 'Obese II'; color = '#DC2626'; }
                else { category = 'Obese III'; color = '#991B1B'; }
                
                const categoryEl = document.getElementById('quick-bmi-category');
                categoryEl.textContent = category;
                categoryEl.style.color = color;
                
                // Show surgery alert for BMI >= 35
                const alertEl = document.getElementById('quick-surgery-alert');
                const alertText = document.getElementById('quick-surgery-text');
                if (bmi >= 40) {
                    alertEl.classList.remove('hidden');
                    alertText.textContent = 'You qualify for bariatric surgery';
                } else if (bmi >= 35) {
                    alertEl.classList.remove('hidden');
                    alertText.textContent = 'You may qualify for bariatric surgery with comorbidities';
                } else {
                    alertEl.classList.add('hidden');
                }
            } else {
                document.getElementById('quick-bmi-value').textContent = '--';
                document.getElementById('quick-bmi-category').textContent = 'Enter your data';
                document.getElementById('quick-bmi-category').style.color = '#6B7280';
                document.getElementById('quick-surgery-alert').classList.add('hidden');
            }
        }
        
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
            const customModals = ['bmi', 'bariatric-eligibility', 'weight-loss-projection', 'cost-comparison', 'tdee', 'body-fat', 'ideal-weight', 'recovery-time'];
            
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
        
        // TDEE Calculator
        function calculateTDEE() {
            const age = parseFloat(document.getElementById('tdee-age').value);
            const gender = document.getElementById('tdee-gender').value;
            const height = parseFloat(document.getElementById('tdee-height').value);
            const weight = parseFloat(document.getElementById('tdee-weight').value);
            const activity = parseFloat(document.getElementById('tdee-activity').value);
            
            if (age && height && weight) {
                // Mifflin-St Jeor Formula
                let bmr;
                if (gender === 'male') {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
                
                const tdee = Math.round(bmr * activity);
                
                document.getElementById('tdee-result').classList.remove('hidden');
                document.getElementById('tdee-bmr').textContent = Math.round(bmr);
                document.getElementById('tdee-value').textContent = tdee;
                document.getElementById('tdee-loss').textContent = (tdee - 500) + ' kcal';
                document.getElementById('tdee-maintain').textContent = tdee + ' kcal';
                document.getElementById('tdee-gain').textContent = (tdee + 500) + ' kcal';
            }
        }
        
        // Body Fat Calculator (Navy Method)
        function calculateBodyFat() {
            const gender = document.getElementById('bf-gender').value;
            const height = parseFloat(document.getElementById('bf-height').value);
            const neck = parseFloat(document.getElementById('bf-neck').value);
            const waist = parseFloat(document.getElementById('bf-waist').value);
            const hip = parseFloat(document.getElementById('bf-hip').value);
            
            // Show/hide hip field based on gender
            document.getElementById('bf-hip-field').style.opacity = gender === 'female' ? '1' : '0.5';
            
            if (height && neck && waist) {
                let bodyFat;
                if (gender === 'male') {
                    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
                } else if (hip) {
                    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
                } else {
                    return;
                }
                
                bodyFat = Math.max(0, Math.min(bodyFat, 60));
                
                document.getElementById('bf-result').classList.remove('hidden');
                document.getElementById('bf-value').textContent = bodyFat.toFixed(1) + '%';
                
                // Determine category
                let category, color, arrowPos;
                if (gender === 'male') {
                    if (bodyFat < 6) { category = 'Essential Fat'; color = '#3B82F6'; arrowPos = 10; }
                    else if (bodyFat < 14) { category = 'Athletes'; color = '#22C55E'; arrowPos = 30; }
                    else if (bodyFat < 18) { category = 'Fitness'; color = '#10B981'; arrowPos = 50; }
                    else if (bodyFat < 25) { category = 'Average'; color = '#F59E0B'; arrowPos = 70; }
                    else { category = 'Obese'; color = '#EF4444'; arrowPos = 90; }
                } else {
                    if (bodyFat < 14) { category = 'Essential Fat'; color = '#3B82F6'; arrowPos = 10; }
                    else if (bodyFat < 21) { category = 'Athletes'; color = '#22C55E'; arrowPos = 30; }
                    else if (bodyFat < 25) { category = 'Fitness'; color = '#10B981'; arrowPos = 50; }
                    else if (bodyFat < 32) { category = 'Average'; color = '#F59E0B'; arrowPos = 70; }
                    else { category = 'Obese'; color = '#EF4444'; arrowPos = 90; }
                }
                
                document.getElementById('bf-category').textContent = category;
                document.getElementById('bf-category').style.color = color;
                document.getElementById('bf-arrow').style.left = arrowPos + '%';
            }
        }
        
        // Ideal Weight Calculator
        function calculateIdealWeight() {
            const gender = document.getElementById('iw-gender').value;
            const heightCm = parseFloat(document.getElementById('iw-height').value);
            
            if (heightCm) {
                const heightIn = heightCm / 2.54;
                const heightOver5ft = heightIn - 60;
                const heightM = heightCm / 100;
                
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
                
                // BMI-based range
                const minWeight = 18.5 * heightM * heightM;
                const maxWeight = 25 * heightM * heightM;
                
                document.getElementById('iw-result').classList.remove('hidden');
                document.getElementById('iw-devine').textContent = devine.toFixed(1) + ' kg';
                document.getElementById('iw-robinson').textContent = robinson.toFixed(1) + ' kg';
                document.getElementById('iw-miller').textContent = miller.toFixed(1) + ' kg';
                document.getElementById('iw-range').textContent = minWeight.toFixed(0) + ' - ' + maxWeight.toFixed(0) + ' kg';
            }
        }
        
        // Recovery Time Calculator
        function calculateRecovery() {
            const procedureEl = document.getElementById('rec-procedure');
            const age = parseFloat(document.getElementById('rec-age').value);
            const bmi = parseFloat(document.getElementById('rec-bmi').value);
            const diabetes = document.getElementById('rec-diabetes').checked;
            const smoking = document.getElementById('rec-smoking').checked;
            
            if (procedureEl.value && age) {
                const selectedOption = procedureEl.options[procedureEl.selectedIndex];
                let initial = parseInt(selectedOption.dataset.initial);
                let full = parseInt(selectedOption.dataset.full);
                
                // Adjustment factors
                let factors = [];
                let modifier = 1.0;
                
                if (age > 65) { modifier += 0.2; factors.push('Age over 65'); }
                if (bmi && bmi > 35) { modifier += 0.15; factors.push('BMI over 35'); }
                if (diabetes) { modifier += 0.2; factors.push('Diabetes'); }
                if (smoking) { modifier += 0.3; factors.push('Smoking'); }
                
                initial = Math.round(initial * modifier);
                const light = Math.round(initial * 1.5);
                full = Math.round(full * modifier);
                
                document.getElementById('rec-result').classList.remove('hidden');
                document.getElementById('rec-initial').textContent = initial;
                document.getElementById('rec-light').textContent = light;
                document.getElementById('rec-full').textContent = full;
                
                // Show factors warning
                const factorsEl = document.getElementById('rec-factors');
                const factorsText = document.getElementById('rec-factors-text');
                if (factors.length > 0) {
                    factorsEl.classList.remove('hidden');
                    factorsText.textContent = 'Recovery extended due to: ' + factors.join(', ');
                } else {
                    factorsEl.classList.add('hidden');
                }
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
        
        // Enhanced Filter by Category with Smooth Animations
        function filterCategory(category) {
            // Update tabs with smooth transition
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                    // Smooth scroll tab into view on mobile
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            });
            
            // Show/hide sections with fade animation
            const sections = document.querySelectorAll('.category-section');
            const popularSection = document.getElementById('popular-section');
            const divider = document.querySelector('.visual-divider');
            const sectionTitle = divider?.nextElementSibling;
            
            // Add transition classes
            const fadeOut = (el) => {
                if (el) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(10px)';
                    setTimeout(() => { el.style.display = 'none'; }, 200);
                }
            };
            const fadeIn = (el) => {
                if (el) {
                    el.style.display = 'block';
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 50);
                }
            };
            
            // Apply CSS transitions to all sections
            [...sections, popularSection, divider, sectionTitle].forEach(el => {
                if (el) {
                    el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                }
            });
            
            if (category === 'all') {
                sections.forEach(s => fadeIn(s));
                fadeIn(popularSection);
                fadeIn(divider);
                fadeIn(sectionTitle);
            } else {
                fadeOut(popularSection);
                fadeOut(divider);
                fadeOut(sectionTitle);
                sections.forEach(s => {
                    if (s.dataset.category === category) {
                        fadeIn(s);
                    } else {
                        fadeOut(s);
                    }
                });
            }
            
            // Scroll to category section smoothly
            if (category !== 'all') {
                setTimeout(function() {
                    var targetSection = document.querySelector('.category-section[data-category="' + category + '"]');
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
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
        
        // Save BMI Result to Health Profile
        function saveBMIResult() {
            const bmiValue = document.getElementById('bmi-value').textContent;
            const category = document.getElementById('bmi-category').textContent;
            const categoryColor = document.getElementById('bmi-category').style.color;
            const height = document.getElementById('bmi-height').value;
            const weight = document.getElementById('bmi-weight').value;
            const healthyRange = document.getElementById('bmi-healthy-range').textContent;
            const toLose = document.getElementById('bmi-to-lose').textContent;
            
            if (bmiValue && bmiValue !== '--') {
                // Save to profile
                saveToProfile('bmi', bmiValue);
                saveToProfile('weight', weight);
                saveToProfile('height', height);
                saveToProfile('status', category);
                saveToProfile('statusColor', 'text-2xl font-bold ' + (parseFloat(bmiValue) < 25 ? 'text-green-400' : parseFloat(bmiValue) < 30 ? 'text-yellow-400' : 'text-red-400'));
                saveToProfile('ideal', healthyRange);
                saveToProfile('excess', toLose);
                
                // Set eligibility
                const bmi = parseFloat(bmiValue);
                if (bmi >= 40) {
                    saveToProfile('eligible', 'Yes');
                    saveToProfile('eligibleColor', 'font-semibold text-green-600');
                    saveToProfile('recommended', 'Gastric Sleeve, Bypass');
                } else if (bmi >= 35) {
                    saveToProfile('eligible', 'Likely');
                    saveToProfile('eligibleColor', 'font-semibold text-yellow-600');
                    saveToProfile('recommended', 'Gastric Sleeve');
                } else if (bmi >= 30) {
                    saveToProfile('eligible', 'With conditions');
                    saveToProfile('eligibleColor', 'font-semibold text-orange-600');
                    saveToProfile('recommended', 'Consult required');
                } else {
                    saveToProfile('eligible', 'No');
                    saveToProfile('eligibleColor', 'font-semibold text-gray-600');
                    saveToProfile('recommended', 'Lifestyle changes');
                }
                
                // Calculate protein and water automatically
                saveToProfile('protein', Math.round(parseFloat(weight) * 0.8) + 'g');
                saveToProfile('water', Math.round(parseFloat(weight) * 35) + 'ml');
            }
            
            // Show toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center';
            toast.innerHTML = '<i class="fas fa-check-circle mr-2"></i> BMI saved to your health profile!';
            document.body.appendChild(toast);
            
            // Celebrate with confetti for good results
            if (parseFloat(bmiValue) < 25) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            
            setTimeout(() => toast.remove(), 3000);
            closeModal('bmi');
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
