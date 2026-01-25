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
            --gold: #C9A227;
            --cream: #FDF8F0;
            --gold-light: rgba(201, 162, 39, 0.1);
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
        
        .card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(201, 162, 39, 0.1);
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
            background: linear-gradient(90deg, var(--gold), #E5C04B, var(--gold));
            background-size: 200% 100%;
            transform: scaleX(0);
            transition: transform 0.4s ease;
            animation: shimmer 2s infinite;
        }
        .calculator-card:hover::before {
            transform: scaleX(1);
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .calculator-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
        }
        .calculator-card:hover::after {
            left: 100%;
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
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
            animation: badge-glow 2s ease-in-out infinite;
        }
        @keyframes badge-glow {
            0%, 100% { box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); }
            50% { box-shadow: 0 4px 25px rgba(245, 158, 11, 0.6); }
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 24px 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border: 1px solid rgba(255, 255, 255, 0.5);
            position: relative;
            overflow: hidden;
        }
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), #E5C04B);
        }
        .stat-card .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--navy), #003366);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
        
        <!-- Category Tabs with Modern Styling -->
        <div class="relative mb-8">
            <div class="flex overflow-x-auto gap-3 pb-4 scrollbar-hide" style="-webkit-overflow-scrolling: touch;">
                <button class="category-tab active group" onclick="filterCategory('all')" data-category="all">
                    <div class="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-th-large text-gray-600"></i>
                    </div>
                    All Calculators
                    <span class="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">23</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('essential')" data-category="essential">
                    <div class="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-heart-pulse text-red-500"></i>
                    </div>
                    Essential
                    <span class="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">4</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('bariatric')" data-category="bariatric">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-weight-scale text-purple-500"></i>
                    </div>
                    Bariatric
                    <span class="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">4</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('surgical')" data-category="surgical">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-user-doctor text-blue-500"></i>
                    </div>
                    Surgical
                    <span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">4</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('nutrition')" data-category="nutrition">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-apple-whole text-green-500"></i>
                    </div>
                    Nutrition
                    <span class="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">4</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('wellness')" data-category="wellness">
                    <div class="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-spa text-pink-500"></i>
                    </div>
                    Wellness
                    <span class="ml-2 px-2 py-0.5 bg-pink-100 text-pink-600 text-xs rounded-full">4</span>
                </button>
                <button class="category-tab group" onclick="filterCategory('financial')" data-category="financial">
                    <div class="w-8 h-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <i class="fas fa-piggy-bank text-yellow-600"></i>
                    </div>
                    Financial
                    <span class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">3</span>
                </button>
            </div>
            <!-- Scroll indicator -->
            <div class="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-cream to-transparent pointer-events-none md:hidden"></div>
        </div>
        
        <!-- Popular Calculators - Featured with AI-Generated Images -->
        <div id="popular-section" class="mb-16">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-navy flex items-center">
                    <span class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-orange-200">
                        <i class="fas fa-fire text-white text-xl"></i>
                    </span>
                    Most Popular
                </h2>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <i class="fas fa-users mr-2 text-gold"></i> 
                        <span class="font-semibold text-navy">10,000+</span> patients
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
        
        <!-- Visual Divider with Animation -->
        <div class="relative my-16">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="bg-cream px-8 py-3 text-navy font-semibold text-sm flex items-center gap-3 rounded-full border border-gray-200 shadow-sm">
                    <div class="w-8 h-8 bg-gradient-to-br from-navy to-blue-800 rounded-lg flex items-center justify-center">
                        <i class="fas fa-th-large text-white text-xs"></i>
                    </div>
                    All Calculators by Category
                </span>
            </div>
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
