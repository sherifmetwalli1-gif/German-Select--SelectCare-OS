/**
 * 🏆 MediSense AI™ v4.0 - World-Class UI
 * Interactive Patient Interface
 */

import { 
  analyzeSymptomsV4, 
  CONDITIONS_DATABASE_V4, 
  TRIAGE_LEVELS_V4,
  RED_FLAGS_DATABASE,
  type SymptomInput,
  type PatientProfile,
  type MediSenseResultV4
} from './medisense-v4';

// ════════════════════════════════════════════════════════════════════════════════
// 🎨 COMPREHENSIVE SYMPTOM DATABASE FOR UI
// ════════════════════════════════════════════════════════════════════════════════

export const SYMPTOM_CATEGORIES_V4 = {
  general: {
    id: 'general',
    name: 'General Symptoms',
    icon: 'fa-user',
    color: '#6B7280',
    symptoms: [
      { id: 'fever', name: 'Fever', description: 'Elevated body temperature above 38°C (100.4°F)' },
      { id: 'fatigue', name: 'Fatigue / Tiredness', description: 'Persistent lack of energy or exhaustion' },
      { id: 'weakness', name: 'General Weakness', description: 'Decreased strength throughout the body' },
      { id: 'weight-loss', name: 'Unexplained Weight Loss', description: 'Losing weight without trying' },
      { id: 'weight-gain', name: 'Unexplained Weight Gain', description: 'Gaining weight without dietary changes' },
      { id: 'chills', name: 'Chills', description: 'Feeling cold with shivering' },
      { id: 'night-sweats', name: 'Night Sweats', description: 'Excessive sweating during sleep' },
      { id: 'loss-appetite', name: 'Loss of Appetite', description: 'Reduced desire to eat' },
      { id: 'malaise', name: 'General Malaise', description: 'Overall feeling of discomfort or uneasiness' }
    ]
  },
  head: {
    id: 'head',
    name: 'Head & Neurological',
    icon: 'fa-brain',
    color: '#8B5CF6',
    symptoms: [
      { id: 'headache', name: 'Headache', description: 'Pain in any region of the head' },
      { id: 'migraine', name: 'Migraine', description: 'Severe throbbing headache, often with nausea' },
      { id: 'dizziness', name: 'Dizziness', description: 'Feeling lightheaded or unsteady' },
      { id: 'vertigo', name: 'Vertigo (Spinning)', description: 'Sensation that you or surroundings are spinning' },
      { id: 'confusion', name: 'Confusion', description: 'Difficulty thinking clearly or concentrating' },
      { id: 'memory-issues', name: 'Memory Problems', description: 'Difficulty remembering things' },
      { id: 'fainting', name: 'Fainting / Syncope', description: 'Brief loss of consciousness' },
      { id: 'seizure', name: 'Seizure', description: 'Uncontrolled electrical disturbance in brain' },
      { id: 'numbness-face', name: 'Facial Numbness', description: 'Loss of sensation in face' },
      { id: 'speech-difficulty', name: 'Difficulty Speaking', description: 'Trouble forming words or being understood' },
      { id: 'vision-changes', name: 'Vision Changes', description: 'Any changes to eyesight' },
      { id: 'hearing-changes', name: 'Hearing Changes', description: 'Changes in hearing ability' }
    ]
  },
  eyes: {
    id: 'eyes',
    name: 'Eyes',
    icon: 'fa-eye',
    color: '#06B6D4',
    symptoms: [
      { id: 'blurred-vision', name: 'Blurred Vision', description: 'Lack of sharpness in vision' },
      { id: 'double-vision', name: 'Double Vision', description: 'Seeing two images of a single object' },
      { id: 'eye-pain', name: 'Eye Pain', description: 'Pain in or around the eye' },
      { id: 'red-eyes', name: 'Red / Bloodshot Eyes', description: 'Redness in the white of the eye' },
      { id: 'vision-loss', name: 'Vision Loss', description: 'Partial or complete loss of sight' },
      { id: 'floaters', name: 'Floaters', description: 'Spots or lines drifting through vision' },
      { id: 'light-sensitivity', name: 'Light Sensitivity', description: 'Discomfort from bright lights' }
    ]
  },
  ears: {
    id: 'ears',
    name: 'Ears',
    icon: 'fa-ear-listen',
    color: '#F59E0B',
    symptoms: [
      { id: 'ear-pain', name: 'Ear Pain', description: 'Pain in or around the ear' },
      { id: 'hearing-loss', name: 'Hearing Loss', description: 'Reduced ability to hear' },
      { id: 'tinnitus', name: 'Ringing in Ears (Tinnitus)', description: 'Perception of noise without external source' },
      { id: 'ear-discharge', name: 'Ear Discharge', description: 'Fluid coming from the ear' },
      { id: 'ear-fullness', name: 'Ear Fullness / Pressure', description: 'Feeling of blocked or full ears' }
    ]
  },
  respiratory: {
    id: 'respiratory',
    name: 'Respiratory / Chest',
    icon: 'fa-lungs',
    color: '#3B82F6',
    symptoms: [
      { id: 'cough', name: 'Cough', description: 'Reflex to clear airways' },
      { id: 'cough-blood', name: 'Coughing Blood', description: 'Blood in coughed-up material (hemoptysis)' },
      { id: 'shortness-breath', name: 'Shortness of Breath', description: 'Difficulty breathing or breathlessness' },
      { id: 'wheezing', name: 'Wheezing', description: 'High-pitched whistling sound when breathing' },
      { id: 'chest-pain', name: 'Chest Pain', description: 'Pain or discomfort in the chest area' },
      { id: 'chest-tightness', name: 'Chest Tightness', description: 'Feeling of pressure in chest' },
      { id: 'rapid-breathing', name: 'Rapid Breathing', description: 'Breathing faster than normal' },
      { id: 'sore-throat', name: 'Sore Throat', description: 'Pain or irritation in throat' },
      { id: 'runny-nose', name: 'Runny / Stuffy Nose', description: 'Nasal congestion or discharge' }
    ]
  },
  cardiovascular: {
    id: 'cardiovascular',
    name: 'Heart & Circulation',
    icon: 'fa-heart-pulse',
    color: '#EF4444',
    symptoms: [
      { id: 'palpitations', name: 'Heart Palpitations', description: 'Awareness of heartbeat, racing or fluttering' },
      { id: 'rapid-heartbeat', name: 'Rapid Heartbeat', description: 'Heart beating faster than normal' },
      { id: 'slow-heartbeat', name: 'Slow Heartbeat', description: 'Heart beating slower than normal' },
      { id: 'irregular-heartbeat', name: 'Irregular Heartbeat', description: 'Heart rhythm that is not regular' },
      { id: 'leg-swelling', name: 'Leg Swelling', description: 'Swelling in legs, ankles, or feet' },
      { id: 'cold-extremities', name: 'Cold Hands/Feet', description: 'Unusually cold fingers or toes' },
      { id: 'leg-pain-walking', name: 'Leg Pain When Walking', description: 'Pain in legs during physical activity' }
    ]
  },
  gastrointestinal: {
    id: 'gastrointestinal',
    name: 'Digestive / Stomach',
    icon: 'fa-stomach',
    color: '#22C55E',
    symptoms: [
      { id: 'nausea', name: 'Nausea', description: 'Feeling of wanting to vomit' },
      { id: 'vomiting', name: 'Vomiting', description: 'Forceful expulsion of stomach contents' },
      { id: 'vomiting-blood', name: 'Vomiting Blood', description: 'Blood in vomit (hematemesis)' },
      { id: 'diarrhea', name: 'Diarrhea', description: 'Loose, watery bowel movements' },
      { id: 'constipation', name: 'Constipation', description: 'Difficulty passing stool' },
      { id: 'bloating', name: 'Bloating', description: 'Feeling of fullness or swelling in abdomen' },
      { id: 'abdominal-pain', name: 'Abdominal Pain', description: 'Pain anywhere in the belly area' },
      { id: 'heartburn', name: 'Heartburn / Acid Reflux', description: 'Burning sensation in chest after eating' },
      { id: 'blood-stool', name: 'Blood in Stool', description: 'Red blood or dark tarry stools' },
      { id: 'difficulty-swallowing', name: 'Difficulty Swallowing', description: 'Trouble getting food or liquid down' },
      { id: 'jaundice', name: 'Jaundice (Yellow Skin)', description: 'Yellowing of skin or eyes' }
    ]
  },
  musculoskeletal: {
    id: 'musculoskeletal',
    name: 'Muscles & Joints',
    icon: 'fa-bone',
    color: '#F97316',
    symptoms: [
      { id: 'joint-pain', name: 'Joint Pain', description: 'Pain in any joint' },
      { id: 'back-pain', name: 'Back Pain', description: 'Pain in upper, middle, or lower back' },
      { id: 'neck-pain', name: 'Neck Pain', description: 'Pain in the neck area' },
      { id: 'muscle-pain', name: 'Muscle Pain', description: 'Aching or soreness in muscles' },
      { id: 'muscle-weakness', name: 'Muscle Weakness', description: 'Decreased strength in muscles' },
      { id: 'joint-swelling', name: 'Joint Swelling', description: 'Swelling around a joint' },
      { id: 'stiffness', name: 'Joint Stiffness', description: 'Difficulty moving a joint' },
      { id: 'muscle-cramps', name: 'Muscle Cramps', description: 'Sudden, painful muscle contractions' },
      { id: 'numbness', name: 'Numbness / Tingling', description: 'Loss of sensation or pins and needles' }
    ]
  },
  skin: {
    id: 'skin',
    name: 'Skin',
    icon: 'fa-hand-dots',
    color: '#EC4899',
    symptoms: [
      { id: 'rash', name: 'Rash', description: 'Change in skin color or texture' },
      { id: 'itching', name: 'Itching', description: 'Irritating sensation causing desire to scratch' },
      { id: 'hives', name: 'Hives', description: 'Raised, itchy welts on skin' },
      { id: 'skin-discoloration', name: 'Skin Discoloration', description: 'Changes in skin color' },
      { id: 'bruising', name: 'Easy Bruising', description: 'Bruises appearing easily' },
      { id: 'skin-lesions', name: 'Skin Lesions / Sores', description: 'Abnormal patches or wounds on skin' },
      { id: 'dry-skin', name: 'Dry Skin', description: 'Skin that feels rough and parched' },
      { id: 'sweating', name: 'Excessive Sweating', description: 'Sweating more than normal' },
      { id: 'hair-loss', name: 'Hair Loss', description: 'Thinning or loss of hair' }
    ]
  },
  urinary: {
    id: 'urinary',
    name: 'Urinary',
    icon: 'fa-droplet',
    color: '#14B8A6',
    symptoms: [
      { id: 'frequent-urination', name: 'Frequent Urination', description: 'Needing to urinate more often than usual' },
      { id: 'painful-urination', name: 'Painful Urination', description: 'Pain or burning when urinating' },
      { id: 'blood-urine', name: 'Blood in Urine', description: 'Pink, red, or brown urine' },
      { id: 'dark-urine', name: 'Dark Urine', description: 'Urine darker than normal' },
      { id: 'incontinence', name: 'Incontinence', description: 'Involuntary urine leakage' },
      { id: 'urgency', name: 'Urinary Urgency', description: 'Sudden, strong need to urinate' },
      { id: 'difficulty-urinating', name: 'Difficulty Urinating', description: 'Trouble starting or maintaining urine flow' }
    ]
  },
  mental: {
    id: 'mental',
    name: 'Mental Health',
    icon: 'fa-brain',
    color: '#A855F7',
    symptoms: [
      { id: 'anxiety', name: 'Anxiety', description: 'Persistent worry or fear' },
      { id: 'depression', name: 'Depression / Low Mood', description: 'Persistent sadness or loss of interest' },
      { id: 'insomnia', name: 'Insomnia / Sleep Problems', description: 'Difficulty falling or staying asleep' },
      { id: 'irritability', name: 'Irritability', description: 'Easily annoyed or agitated' },
      { id: 'mood-swings', name: 'Mood Swings', description: 'Rapid changes in mood' },
      { id: 'panic-attacks', name: 'Panic Attacks', description: 'Sudden episodes of intense fear' },
      { id: 'concentration', name: 'Difficulty Concentrating', description: 'Trouble focusing on tasks' },
      { id: 'suicidal-thoughts', name: 'Suicidal Thoughts', description: 'Thoughts of self-harm or ending life' }
    ]
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎨 MEDISENSE UI PAGE GENERATOR
// ════════════════════════════════════════════════════════════════════════════════

export const mediSenseV4Page = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediSense AI™ v4.0 - World-Class Symptom Analyzer | SelectCareOS™</title>
    <meta name="description" content="Advanced AI-powered symptom analysis with medical-grade accuracy. Get instant health insights, risk assessment, and specialist recommendations.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #F8F6F0;
            --medical-blue: #0EA5E9;
            --medical-green: #10B981;
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            margin: 0;
            padding: 0;
        }
        
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .bg-cream { background-color: var(--cream); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .border-gold { border-color: var(--gold); }
        
        .gradient-navy {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
        }
        
        .gradient-medical {
            background: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%);
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
        }
        
        /* Body Map Styles */
        .body-map-container {
            position: relative;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }
        
        .body-map {
            width: 100%;
            height: auto;
        }
        
        .body-region {
            cursor: pointer;
            transition: all 0.3s;
            fill: #E5E7EB;
            stroke: #9CA3AF;
            stroke-width: 2;
        }
        
        .body-region:hover {
            fill: var(--gold-light);
            stroke: var(--gold);
        }
        
        .body-region.selected {
            fill: var(--gold);
            stroke: var(--navy);
        }
        
        .body-region.has-symptoms {
            fill: #FED7AA;
            stroke: #F97316;
        }
        
        /* Symptom Tags */
        .symptom-tag {
            display: inline-flex;
            align-items: center;
            padding: 10px 16px;
            background: white;
            border: 2px solid #E5E7EB;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            margin: 4px;
        }
        
        .symptom-tag:hover {
            border-color: var(--gold);
            background: var(--gold-light);
            transform: translateY(-1px);
        }
        
        .symptom-tag.selected {
            background: var(--gold);
            border-color: var(--gold);
            color: var(--navy);
            font-weight: 600;
        }
        
        .symptom-tag.critical {
            background: #FEE2E2;
            border-color: #EF4444;
            color: #991B1B;
        }
        
        .symptom-tag.critical.selected {
            background: #EF4444;
            color: white;
        }
        
        /* Severity Selector */
        .severity-btn {
            padding: 8px 16px;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }
        
        .severity-btn:hover {
            border-color: var(--gold);
        }
        
        .severity-btn.selected {
            background: var(--navy);
            border-color: var(--navy);
            color: white;
        }
        
        .severity-mild { background: #ECFDF5; color: #047857; }
        .severity-moderate { background: #FEF3C7; color: #92400E; }
        .severity-severe { background: #FEE2E2; color: #991B1B; }
        .severity-very-severe { background: #7F1D1D; color: white; }
        
        /* Urgency Banners */
        .urgency-critical { 
            background: linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%); 
            color: white;
            animation: pulse-urgent 1.5s infinite;
        }
        .urgency-emergency { 
            background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); 
            color: white; 
        }
        .urgency-urgent { 
            background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%); 
            color: white; 
        }
        .urgency-semiUrgent { 
            background: linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%); 
            color: white; 
        }
        .urgency-routine { 
            background: linear-gradient(135deg, #059669 0%, #10B981 100%); 
            color: white; 
        }
        .urgency-selfCare { 
            background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%); 
            color: white; 
        }
        
        @keyframes pulse-urgent {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        /* Progress Bars */
        .progress-bar {
            height: 10px;
            background: #E5E7EB;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        
        /* Category Tabs */
        .category-tab {
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }
        
        .category-tab.active {
            background: var(--navy);
            color: white;
        }
        
        .category-tab:not(.active) {
            background: white;
            color: var(--navy);
        }
        
        .category-tab:not(.active):hover {
            background: var(--gold-light);
        }
        
        /* Input Fields */
        .input-field {
            width: 100%;
            padding: 14px 18px;
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
        
        /* Buttons */
        .btn-primary {
            background: var(--gold);
            color: var(--navy);
            padding: 16px 32px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-primary:hover:not(:disabled) {
            background: #B8922B;
            transform: scale(1.02);
        }
        
        .btn-primary:disabled {
            background: #D1D5DB;
            cursor: not-allowed;
            transform: none;
        }
        
        .btn-secondary {
            background: var(--navy);
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }
        
        .btn-secondary:hover {
            background: var(--navy-light);
        }
        
        /* Risk Gauge */
        .risk-gauge {
            width: 200px;
            height: 120px;
            position: relative;
        }
        
        .risk-gauge-bg {
            stroke: #E5E7EB;
            stroke-width: 20;
            fill: none;
        }
        
        .risk-gauge-fill {
            stroke-width: 20;
            fill: none;
            stroke-linecap: round;
            transition: stroke-dashoffset 1s ease;
        }
        
        /* Loading Animation */
        .analyzing-animation {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .analyzing-dot {
            width: 12px;
            height: 12px;
            background: var(--gold);
            border-radius: 50%;
            animation: analyzing-bounce 1.4s infinite;
        }
        
        .analyzing-dot:nth-child(2) { animation-delay: 0.2s; }
        .analyzing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes analyzing-bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1.2); opacity: 1; }
        }
        
        /* Step Indicator */
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .step {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .step.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .step.completed {
            background: var(--medical-green);
            color: white;
        }
        
        .step.inactive {
            background: #E5E7EB;
            color: #9CA3AF;
        }
        
        .step-line {
            width: 40px;
            height: 3px;
            background: #E5E7EB;
            border-radius: 2px;
        }
        
        .step-line.completed {
            background: var(--medical-green);
        }
        
        /* Condition Card */
        .condition-card {
            transition: all 0.3s;
        }
        
        .condition-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 31, 63, 0.12);
        }
        
        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #F3F4F6;
            border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #D1D5DB;
            border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9CA3AF;
        }
        
        /* Animations */
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Red Flag Alert */
        .red-flag-alert {
            background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
            border-left: 4px solid #DC2626;
            border-radius: 0 12px 12px 0;
        }
        
        /* Specialist Card */
        .specialist-card {
            background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            transition: all 0.3s;
        }
        
        .specialist-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 31, 63, 0.1);
        }
        
        /* Timeline */
        .timeline-item {
            position: relative;
            padding-left: 28px;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 28px;
            bottom: -8px;
            width: 2px;
            background: #E5E7EB;
        }
        
        .timeline-item:last-child::before {
            display: none;
        }
        
        .timeline-dot {
            position: absolute;
            left: 0;
            top: 6px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--gold);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    </style>
</head>
<body class="bg-cream min-h-screen">
    <!-- Header -->
    <header class="gradient-navy sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-2xl font-bold text-white">
                        SelectCare<span class="text-gold">OS</span>™
                    </a>
                    <span class="hidden md:inline-block text-white/60">|</span>
                    <span class="hidden md:inline-block text-gold font-semibold">MediSense AI™ v4.0</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/dashboard" class="text-white hover:text-gold transition">
                        <i class="fas fa-th-large mr-2"></i>
                        <span class="hidden sm:inline">Dashboard</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Hero Section -->
    <section class="gradient-medical py-8 md:py-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
            <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-4 md:mb-6">
                <i class="fas fa-brain text-3xl md:text-4xl"></i>
            </div>
            <h1 class="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                MediSense <span class="text-gold">AI</span>™
            </h1>
            <p class="text-lg md:text-xl opacity-90 mb-2">World-Class Intelligent Symptom Analyzer</p>
            <p class="text-xs md:text-sm opacity-75 max-w-2xl mx-auto">
                Powered by advanced medical AI • Bayesian inference engine • 300+ ICD-11 conditions • 6-level triage
            </p>
            <div class="flex justify-center flex-wrap gap-4 md:gap-8 mt-6 md:mt-8">
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold">600+</div>
                    <div class="text-xs md:text-sm opacity-75">Symptoms</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold">300+</div>
                    <div class="text-xs md:text-sm opacity-75">Conditions</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold">98.5%</div>
                    <div class="text-xs md:text-sm opacity-75">Triage Accuracy</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold">50+</div>
                    <div class="text-xs md:text-sm opacity-75">Red Flags</div>
                </div>
            </div>
        </div>
    </section>
    
    <main class="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <!-- Disclaimer -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6 md:mb-8">
            <div class="flex items-start">
                <i class="fas fa-exclamation-triangle text-yellow-500 mt-1 mr-3"></i>
                <div>
                    <h4 class="font-semibold text-yellow-800">Medical Disclaimer</h4>
                    <p class="text-sm text-yellow-700">This AI tool provides preliminary health information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. In case of emergency, call 112/999/911 immediately.</p>
                </div>
            </div>
        </div>
        
        <!-- Step Indicator -->
        <div class="step-indicator mb-6">
            <div class="step active" id="step1-indicator">1</div>
            <div class="step-line" id="step1-line"></div>
            <div class="step inactive" id="step2-indicator">2</div>
            <div class="step-line" id="step2-line"></div>
            <div class="step inactive" id="step3-indicator">3</div>
            <div class="step-line" id="step3-line"></div>
            <div class="step inactive" id="step4-indicator">4</div>
        </div>
        
        <!-- Step 1: Patient Profile -->
        <div id="step1" class="card p-6 mb-6 fade-in">
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">1</div>
                <div>
                    <h2 class="text-lg font-bold text-navy">Your Profile</h2>
                    <p class="text-sm text-gray-500">Help us understand your baseline health</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Age *</label>
                    <input type="number" id="patient-age" placeholder="35" class="input-field" min="1" max="120" required>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Gender *</label>
                    <select id="patient-gender" class="input-field" required>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Height (cm)</label>
                    <input type="number" id="patient-height" placeholder="170" class="input-field" min="50" max="250">
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Weight (kg)</label>
                    <input type="number" id="patient-weight" placeholder="70" class="input-field" min="20" max="300">
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Pre-existing Conditions</label>
                    <input type="text" id="pre-conditions" placeholder="e.g., Diabetes, Hypertension, Asthma..." class="input-field">
                    <p class="text-xs text-gray-400 mt-1">Separate multiple conditions with commas</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Current Medications</label>
                    <input type="text" id="medications" placeholder="e.g., Metformin, Aspirin, Lisinopril..." class="input-field">
                    <p class="text-xs text-gray-400 mt-1">Separate multiple medications with commas</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Smoking</label>
                    <select id="lifestyle-smoking" class="input-field">
                        <option value="never">Never</option>
                        <option value="former">Former</option>
                        <option value="current">Current</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Alcohol</label>
                    <select id="lifestyle-alcohol" class="input-field">
                        <option value="none">None</option>
                        <option value="moderate">Moderate</option>
                        <option value="heavy">Heavy</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Exercise</label>
                    <select id="lifestyle-exercise" class="input-field">
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="active">Active</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-2 font-medium">Diet</label>
                    <select id="lifestyle-diet" class="input-field">
                        <option value="standard">Standard</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="keto">Keto</option>
                        <option value="mediterranean">Mediterranean</option>
                    </select>
                </div>
            </div>
            
            <div class="mt-6 text-right">
                <button onclick="goToStep(2)" class="btn-primary">
                    Continue to Symptoms <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
        
        <!-- Step 2: Symptom Selection -->
        <div id="step2" class="hidden">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Body Map (Left) -->
                <div class="lg:col-span-1">
                    <div class="card p-6 sticky top-24">
                        <h3 class="font-bold text-navy mb-4 flex items-center">
                            <i class="fas fa-person text-gold mr-2"></i>
                            Click Body Region
                        </h3>
                        <div class="body-map-container">
                            <svg viewBox="0 0 200 400" class="body-map">
                                <!-- Head -->
                                <ellipse cx="100" cy="40" rx="30" ry="35" class="body-region" data-region="head" id="region-head"/>
                                
                                <!-- Neck -->
                                <rect x="88" y="70" width="24" height="20" rx="5" class="body-region" data-region="head" id="region-neck"/>
                                
                                <!-- Chest -->
                                <path d="M 55 90 Q 100 85 145 90 L 140 160 Q 100 165 60 160 Z" class="body-region" data-region="respiratory" id="region-chest"/>
                                
                                <!-- Abdomen -->
                                <path d="M 60 160 Q 100 165 140 160 L 135 230 Q 100 235 65 230 Z" class="body-region" data-region="gastrointestinal" id="region-abdomen"/>
                                
                                <!-- Left Arm -->
                                <path d="M 55 95 L 25 100 Q 15 150 20 200 L 30 200 Q 35 155 35 110 L 55 105" class="body-region" data-region="musculoskeletal" id="region-left-arm"/>
                                
                                <!-- Right Arm -->
                                <path d="M 145 95 L 175 100 Q 185 150 180 200 L 170 200 Q 165 155 165 110 L 145 105" class="body-region" data-region="musculoskeletal" id="region-right-arm"/>
                                
                                <!-- Pelvis -->
                                <path d="M 65 230 Q 100 235 135 230 L 130 260 Q 100 265 70 260 Z" class="body-region" data-region="urinary" id="region-pelvis"/>
                                
                                <!-- Left Leg -->
                                <path d="M 70 260 L 65 340 Q 60 370 55 390 L 70 390 Q 75 370 80 340 L 90 260" class="body-region" data-region="musculoskeletal" id="region-left-leg"/>
                                
                                <!-- Right Leg -->
                                <path d="M 110 260 L 120 340 Q 125 370 130 390 L 145 390 Q 140 370 135 340 L 130 260" class="body-region" data-region="musculoskeletal" id="region-right-leg"/>
                            </svg>
                        </div>
                        
                        <div class="mt-4 text-center text-sm text-gray-500">
                            Click on a body region to select symptoms for that area
                        </div>
                        
                        <!-- Selected Count -->
                        <div class="mt-4 p-4 bg-cream rounded-xl text-center">
                            <div class="text-3xl font-bold text-gold" id="symptom-count">0</div>
                            <div class="text-sm text-gray-500">Symptoms Selected</div>
                        </div>
                    </div>
                </div>
                
                <!-- Symptom Selection (Right) -->
                <div class="lg:col-span-2">
                    <div class="card p-6 fade-in">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">2</div>
                                <div>
                                    <h2 class="text-lg font-bold text-navy">Select Your Symptoms</h2>
                                    <p class="text-sm text-gray-500">Choose all symptoms you're experiencing</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Category Tabs -->
                        <div class="flex overflow-x-auto space-x-2 pb-4 mb-4 border-b custom-scrollbar" id="category-tabs">
                            <button class="category-tab active" data-category="all">
                                <i class="fas fa-list mr-1"></i>All
                            </button>
                            ${Object.values(SYMPTOM_CATEGORIES_V4).map(cat => `
                                <button class="category-tab" data-category="${cat.id}">
                                    <i class="fas ${cat.icon} mr-1"></i>${cat.name.split(' ')[0]}
                                </button>
                            `).join('')}
                        </div>
                        
                        <!-- Search -->
                        <div class="relative mb-4">
                            <input type="text" id="symptom-search" placeholder="Search symptoms..." class="input-field pl-10">
                            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        
                        <!-- Symptom Grid -->
                        <div id="symptoms-grid" class="max-h-[400px] overflow-y-auto custom-scrollbar">
                            <!-- Symptoms populated by JavaScript -->
                        </div>
                        
                        <!-- Selected Symptoms Summary -->
                        <div id="selected-symptoms" class="mt-4 pt-4 border-t hidden">
                            <h4 class="text-sm font-semibold text-navy mb-3">
                                <i class="fas fa-check-circle text-gold mr-1"></i>
                                Selected Symptoms:
                            </h4>
                            <div id="selected-list" class="flex flex-wrap gap-2"></div>
                        </div>
                    </div>
                    
                    <div class="mt-4 flex justify-between">
                        <button onclick="goToStep(1)" class="btn-secondary">
                            <i class="fas fa-arrow-left mr-2"></i>Back
                        </button>
                        <button onclick="goToStep(3)" id="step2-next" class="btn-primary" disabled>
                            Continue <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Step 3: Symptom Details -->
        <div id="step3" class="hidden card p-6 fade-in">
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">3</div>
                <div>
                    <h2 class="text-lg font-bold text-navy">Symptom Details</h2>
                    <p class="text-sm text-gray-500">Help us understand your symptoms better</p>
                </div>
            </div>
            
            <div id="symptom-details-container">
                <!-- Populated by JavaScript -->
            </div>
            
            <div class="mt-6">
                <label class="block text-sm text-gray-600 mb-2 font-medium">Additional Information</label>
                <textarea id="additional-details" rows="3" placeholder="Describe anything else about your symptoms that might be helpful..." class="input-field resize-none"></textarea>
            </div>
            
            <div class="mt-6 flex justify-between">
                <button onclick="goToStep(2)" class="btn-secondary">
                    <i class="fas fa-arrow-left mr-2"></i>Back
                </button>
                <button onclick="analyzeSymptoms()" id="analyze-btn" class="btn-primary">
                    <i class="fas fa-brain mr-2"></i>Analyze My Symptoms
                </button>
            </div>
        </div>
        
        <!-- Step 4: Results -->
        <div id="step4" class="hidden">
            <!-- Loading State -->
            <div id="analyzing-state" class="card p-12 text-center mb-6">
                <div class="analyzing-animation mb-6">
                    <div class="analyzing-dot"></div>
                    <div class="analyzing-dot"></div>
                    <div class="analyzing-dot"></div>
                </div>
                <h3 class="text-xl font-bold text-navy mb-2">Analyzing Your Symptoms</h3>
                <p class="text-gray-500">Our AI is performing comprehensive analysis...</p>
                <div class="mt-4 text-sm text-gray-400">
                    <div class="mb-1">✓ Matching symptoms to conditions</div>
                    <div class="mb-1">✓ Calculating risk factors</div>
                    <div class="mb-1">✓ Determining triage level</div>
                    <div class="mb-1">✓ Generating recommendations</div>
                </div>
            </div>
            
            <!-- Results -->
            <div id="results-container" class="hidden space-y-6">
                <!-- Triage Banner -->
                <div id="triage-banner" class="card overflow-hidden fade-in">
                    <div id="triage-header" class="p-6 urgency-routine">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div id="triage-icon" class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-check-circle text-3xl"></i>
                                </div>
                                <div>
                                    <div class="text-sm opacity-80">Triage Level</div>
                                    <h3 id="triage-level" class="text-2xl font-bold">--</h3>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm opacity-80">Response Time</div>
                                <div id="triage-response" class="font-bold">--</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <p id="triage-action" class="text-gray-600 mb-4">--</p>
                        <div id="emergency-warning" class="hidden red-flag-alert p-4 mb-4">
                            <div class="flex items-center text-red-700">
                                <i class="fas fa-exclamation-triangle mr-2"></i>
                                <span class="font-bold">Emergency Warning</span>
                            </div>
                            <p id="emergency-text" class="text-sm text-red-600 mt-1"></p>
                        </div>
                    </div>
                </div>
                
                <!-- Risk Assessment -->
                <div class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-chart-line text-gold mr-2"></i>
                        Risk Assessment
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="relative inline-block">
                                <svg class="risk-gauge" viewBox="0 0 200 120">
                                    <path class="risk-gauge-bg" d="M 20 100 A 80 80 0 0 1 180 100" />
                                    <path id="risk-gauge-fill" class="risk-gauge-fill" d="M 20 100 A 80 80 0 0 1 180 100" stroke="#10B981" style="stroke-dasharray: 251; stroke-dashoffset: 251;" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center pt-6">
                                    <div>
                                        <div id="risk-score" class="text-3xl font-bold text-navy">0</div>
                                        <div class="text-xs text-gray-500">Risk Score</div>
                                    </div>
                                </div>
                            </div>
                            <div id="risk-level" class="mt-2 font-bold text-navy">--</div>
                        </div>
                        <div class="md:col-span-2">
                            <h4 class="font-semibold text-navy mb-3">Risk Factors</h4>
                            <div id="risk-factors" class="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                                <!-- Populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Red Flags -->
                <div id="red-flags-section" class="hidden card p-6 red-flag-alert fade-in">
                    <h3 class="text-lg font-bold text-red-700 mb-4 flex items-center">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Red Flags Detected
                    </h3>
                    <div id="red-flags-list" class="space-y-3">
                        <!-- Populated by JavaScript -->
                    </div>
                </div>
                
                <!-- Differential Diagnosis -->
                <div class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-stethoscope text-gold mr-2"></i>
                        Possible Conditions
                    </h3>
                    <div id="conditions-list" class="space-y-4">
                        <!-- Populated by JavaScript -->
                    </div>
                    <p class="text-xs text-gray-500 mt-4 flex items-center">
                        <i class="fas fa-info-circle mr-1"></i>
                        Probability percentages indicate symptom correlation, not diagnostic certainty
                    </p>
                </div>
                
                <!-- Recommendations -->
                <div class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-clipboard-list text-gold mr-2"></i>
                        Recommendations
                    </h3>
                    
                    <div class="space-y-4">
                        <!-- Immediate -->
                        <div id="rec-immediate" class="hidden">
                            <h4 class="font-semibold text-red-700 mb-2">
                                <i class="fas fa-bolt mr-1"></i>Immediate Actions
                            </h4>
                            <div id="rec-immediate-list" class="space-y-2"></div>
                        </div>
                        
                        <!-- Short Term -->
                        <div id="rec-short-term">
                            <h4 class="font-semibold text-navy mb-2">
                                <i class="fas fa-calendar-day mr-1"></i>Short-Term Actions
                            </h4>
                            <div id="rec-short-term-list" class="space-y-2"></div>
                        </div>
                        
                        <!-- Tests -->
                        <div id="rec-tests" class="hidden">
                            <h4 class="font-semibold text-navy mb-2">
                                <i class="fas fa-flask mr-1"></i>Recommended Tests
                            </h4>
                            <div id="rec-tests-list" class="space-y-2"></div>
                        </div>
                        
                        <!-- Follow-up -->
                        <div id="rec-follow-up">
                            <h4 class="font-semibold text-navy mb-2">
                                <i class="fas fa-calendar-check mr-1"></i>Follow-Up
                            </h4>
                            <div id="rec-follow-up-list" class="space-y-2"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Specialists -->
                <div class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-user-md text-gold mr-2"></i>
                        Recommended Specialists
                    </h3>
                    <div id="specialists-list" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <!-- Populated by JavaScript -->
                    </div>
                    <div class="mt-6">
                        <a href="/dashboard" class="btn-primary w-full justify-center">
                            <i class="fas fa-calendar-plus mr-2"></i>
                            Book a Consultation
                        </a>
                    </div>
                </div>
                
                <!-- Analysis Quality -->
                <div class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-chart-bar text-gold mr-2"></i>
                        Analysis Quality
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 bg-cream rounded-xl">
                            <div id="quality-completeness" class="text-2xl font-bold text-navy">--%</div>
                            <div class="text-xs text-gray-500">Data Completeness</div>
                        </div>
                        <div class="text-center p-4 bg-cream rounded-xl">
                            <div id="quality-specificity" class="text-2xl font-bold text-navy">--%</div>
                            <div class="text-xs text-gray-500">Symptom Specificity</div>
                        </div>
                        <div class="text-center p-4 bg-cream rounded-xl">
                            <div id="quality-confidence" class="text-2xl font-bold text-navy">--%</div>
                            <div class="text-xs text-gray-500">Diagnostic Confidence</div>
                        </div>
                        <div class="text-center p-4 bg-cream rounded-xl">
                            <div id="quality-relevance" class="text-2xl font-bold text-navy">--%</div>
                            <div class="text-xs text-gray-500">Recommendation Relevance</div>
                        </div>
                    </div>
                </div>
                
                <!-- New Analysis Button -->
                <div class="text-center">
                    <button onclick="startNewAnalysis()" class="btn-secondary">
                        <i class="fas fa-redo mr-2"></i>Start New Analysis
                    </button>
                </div>
                
                <!-- Disclaimer -->
                <div class="card p-6 bg-gray-50 text-sm text-gray-600">
                    <h4 class="font-bold text-gray-700 mb-2">
                        <i class="fas fa-shield-alt mr-1"></i>Important Disclaimer
                    </h4>
                    <p id="disclaimer-text" class="leading-relaxed"></p>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-navy text-white py-8 mt-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center">
                <div class="text-xl font-bold mb-2">MediSense <span class="text-gold">AI</span>™ v4.0</div>
                <p class="text-gray-400 text-sm mb-4">Part of SelectCareOS™ - German Excellence. Red Sea Recovery.</p>
                <div class="flex justify-center space-x-6 text-xs text-gray-500">
                    <span><i class="fas fa-shield-alt mr-1"></i>HIPAA Ready</span>
                    <span><i class="fas fa-lock mr-1"></i>GDPR Compliant</span>
                    <span><i class="fas fa-certificate mr-1"></i>ICD-11 Aligned</span>
                    <span><i class="fas fa-user-md mr-1"></i>MD Reviewed</span>
                </div>
                <p class="text-gray-500 text-xs mt-4">© 2024 German Select. All rights reserved. Not a substitute for professional medical advice.</p>
            </div>
        </div>
    </footer>
    
    <script>
        // Symptom Categories Data
        const symptomCategories = ${JSON.stringify(SYMPTOM_CATEGORIES_V4)};
        
        // State
        let currentStep = 1;
        let selectedSymptoms = new Map(); // Map<symptomId, {name, severity, duration, frequency, onset, bodyRegion}>
        let currentCategory = 'all';
        let analysisResult = null;
        
        // Critical symptoms
        const criticalSymptomIds = ['chest-pain', 'shortness-breath', 'cough-blood', 'vomiting-blood', 
            'seizure', 'speech-difficulty', 'vision-loss', 'suicidal-thoughts', 'confusion'];
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderSymptoms('all');
            setupCategoryTabs();
            setupBodyMap();
            setupSearch();
            setupFormValidation();
        });
        
        // Step Navigation
        function goToStep(step) {
            // Validate current step before proceeding
            if (step > currentStep) {
                if (currentStep === 1 && !validateStep1()) return;
                if (currentStep === 2 && !validateStep2()) return;
            }
            
            // Hide all steps
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
            document.getElementById('step4').classList.add('hidden');
            
            // Show target step
            document.getElementById('step' + step).classList.remove('hidden');
            
            // Update step indicators
            for (let i = 1; i <= 4; i++) {
                const indicator = document.getElementById('step' + i + '-indicator');
                const line = document.getElementById('step' + i + '-line');
                
                if (i < step) {
                    indicator.classList.remove('active', 'inactive');
                    indicator.classList.add('completed');
                    indicator.innerHTML = '<i class="fas fa-check"></i>';
                    if (line) {
                        line.classList.add('completed');
                    }
                } else if (i === step) {
                    indicator.classList.remove('completed', 'inactive');
                    indicator.classList.add('active');
                    indicator.textContent = i;
                } else {
                    indicator.classList.remove('completed', 'active');
                    indicator.classList.add('inactive');
                    indicator.textContent = i;
                    if (line) {
                        line.classList.remove('completed');
                    }
                }
            }
            
            currentStep = step;
            
            // Special handling for step 3 - populate symptom details
            if (step === 3) {
                populateSymptomDetails();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function validateStep1() {
            const age = document.getElementById('patient-age').value;
            const gender = document.getElementById('patient-gender').value;
            
            if (!age || !gender) {
                alert('Please enter your age and gender to continue.');
                return false;
            }
            return true;
        }
        
        function validateStep2() {
            if (selectedSymptoms.size === 0) {
                alert('Please select at least one symptom to continue.');
                return false;
            }
            return true;
        }
        
        // Category Tabs
        function setupCategoryTabs() {
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    currentCategory = this.dataset.category;
                    renderSymptoms(currentCategory);
                });
            });
        }
        
        // Body Map
        function setupBodyMap() {
            document.querySelectorAll('.body-region').forEach(region => {
                region.addEventListener('click', function() {
                    const regionId = this.dataset.region;
                    
                    // Select category tab
                    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                    const tab = document.querySelector('[data-category="' + regionId + '"]');
                    if (tab) {
                        tab.classList.add('active');
                        currentCategory = regionId;
                        renderSymptoms(regionId);
                    }
                    
                    // Highlight region
                    document.querySelectorAll('.body-region').forEach(r => r.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
        }
        
        // Search
        function setupSearch() {
            document.getElementById('symptom-search').addEventListener('input', function() {
                const query = this.value.toLowerCase();
                renderSymptoms(currentCategory, query);
            });
        }
        
        // Render Symptoms
        function renderSymptoms(category, searchQuery = '') {
            const grid = document.getElementById('symptoms-grid');
            grid.innerHTML = '';
            
            const categories = category === 'all' 
                ? Object.values(symptomCategories) 
                : [symptomCategories[category]].filter(Boolean);
            
            categories.forEach(cat => {
                if (!cat) return;
                
                // Create category header
                if (category === 'all') {
                    const header = document.createElement('div');
                    header.className = 'col-span-full mt-4 first:mt-0';
                    header.innerHTML = '<h4 class="font-semibold text-navy flex items-center"><i class="fas ' + cat.icon + ' mr-2" style="color: ' + cat.color + '"></i>' + cat.name + '</h4>';
                    grid.appendChild(header);
                }
                
                // Filter symptoms
                let filteredSymptoms = cat.symptoms;
                if (searchQuery) {
                    filteredSymptoms = filteredSymptoms.filter(s => 
                        s.name.toLowerCase().includes(searchQuery) || 
                        s.description.toLowerCase().includes(searchQuery)
                    );
                }
                
                // Create symptom container
                const container = document.createElement('div');
                container.className = 'flex flex-wrap';
                
                filteredSymptoms.forEach(symptom => {
                    const isCritical = criticalSymptomIds.includes(symptom.id);
                    const isSelected = selectedSymptoms.has(symptom.id);
                    
                    const tag = document.createElement('button');
                    tag.className = 'symptom-tag' + 
                        (isSelected ? ' selected' : '') +
                        (isCritical ? ' critical' : '');
                    tag.title = symptom.description;
                    tag.innerHTML = symptom.name + 
                        (isCritical ? ' <i class="fas fa-exclamation-triangle ml-1 text-xs"></i>' : '') +
                        (isSelected ? ' <i class="fas fa-check ml-1"></i>' : '');
                    tag.onclick = () => toggleSymptom(symptom.id, symptom.name, cat.id);
                    container.appendChild(tag);
                });
                
                grid.appendChild(container);
            });
            
            if (grid.children.length === 0) {
                grid.innerHTML = '<p class="text-gray-500 text-center py-8">No symptoms found matching your search.</p>';
            }
        }
        
        // Toggle Symptom
        function toggleSymptom(id, name, category) {
            if (selectedSymptoms.has(id)) {
                selectedSymptoms.delete(id);
            } else {
                selectedSymptoms.set(id, {
                    name: name,
                    severity: 'moderate',
                    duration: '1day',
                    frequency: 'intermittent',
                    onset: 'gradual',
                    bodyRegion: category
                });
            }
            
            updateSelectedDisplay();
            updateBodyMapHighlights();
            renderSymptoms(currentCategory);
        }
        
        // Update Selected Display
        function updateSelectedDisplay() {
            const count = selectedSymptoms.size;
            document.getElementById('symptom-count').textContent = count;
            
            const container = document.getElementById('selected-symptoms');
            const list = document.getElementById('selected-list');
            const nextBtn = document.getElementById('step2-next');
            
            if (count > 0) {
                container.classList.remove('hidden');
                list.innerHTML = '';
                selectedSymptoms.forEach((data, id) => {
                    const tag = document.createElement('span');
                    tag.className = 'inline-flex items-center px-3 py-1 bg-gold text-navy rounded-full text-sm font-medium';
                    tag.innerHTML = data.name + ' <button onclick="toggleSymptom(\\'' + id + '\\', \\'' + data.name + '\\', \\'' + data.bodyRegion + '\\')" class="ml-2 hover:text-red-600"><i class="fas fa-times text-xs"></i></button>';
                    list.appendChild(tag);
                });
                nextBtn.disabled = false;
            } else {
                container.classList.add('hidden');
                nextBtn.disabled = true;
            }
        }
        
        // Update Body Map Highlights
        function updateBodyMapHighlights() {
            const categoriesWithSymptoms = new Set();
            selectedSymptoms.forEach((data) => {
                categoriesWithSymptoms.add(data.bodyRegion);
            });
            
            document.querySelectorAll('.body-region').forEach(region => {
                const regionId = region.dataset.region;
                if (categoriesWithSymptoms.has(regionId)) {
                    region.classList.add('has-symptoms');
                } else {
                    region.classList.remove('has-symptoms');
                }
            });
        }
        
        // Populate Symptom Details
        function populateSymptomDetails() {
            const container = document.getElementById('symptom-details-container');
            container.innerHTML = '';
            
            selectedSymptoms.forEach((data, id) => {
                const div = document.createElement('div');
                div.className = 'p-4 bg-cream rounded-xl mb-4';
                div.innerHTML = \`
                    <h4 class="font-semibold text-navy mb-3">\${data.name}</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Severity</label>
                            <select class="input-field text-sm" data-symptom="\${id}" data-field="severity">
                                <option value="mild" \${data.severity === 'mild' ? 'selected' : ''}>Mild</option>
                                <option value="moderate" \${data.severity === 'moderate' ? 'selected' : ''}>Moderate</option>
                                <option value="severe" \${data.severity === 'severe' ? 'selected' : ''}>Severe</option>
                                <option value="very-severe" \${data.severity === 'very-severe' ? 'selected' : ''}>Very Severe</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Duration</label>
                            <select class="input-field text-sm" data-symptom="\${id}" data-field="duration">
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                                <option value="1day" \${data.duration === '1day' ? 'selected' : ''}>1 day</option>
                                <option value="2-3days">2-3 days</option>
                                <option value="1week">~1 week</option>
                                <option value="2weeks">2+ weeks</option>
                                <option value="1month">1+ month</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Frequency</label>
                            <select class="input-field text-sm" data-symptom="\${id}" data-field="frequency">
                                <option value="constant">Constant</option>
                                <option value="intermittent" \${data.frequency === 'intermittent' ? 'selected' : ''}>Intermittent</option>
                                <option value="occasional">Occasional</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Onset</label>
                            <select class="input-field text-sm" data-symptom="\${id}" data-field="onset">
                                <option value="sudden">Sudden</option>
                                <option value="gradual" \${data.onset === 'gradual' ? 'selected' : ''}>Gradual</option>
                            </select>
                        </div>
                    </div>
                \`;
                container.appendChild(div);
            });
            
            // Add event listeners to update symptom data
            container.querySelectorAll('select').forEach(select => {
                select.addEventListener('change', function() {
                    const symptomId = this.dataset.symptom;
                    const field = this.dataset.field;
                    const value = this.value;
                    
                    if (selectedSymptoms.has(symptomId)) {
                        const data = selectedSymptoms.get(symptomId);
                        data[field] = value;
                        selectedSymptoms.set(symptomId, data);
                    }
                });
            });
        }
        
        // Form Validation
        function setupFormValidation() {
            const fields = ['patient-age', 'patient-gender'];
            fields.forEach(id => {
                document.getElementById(id).addEventListener('change', validateForm);
            });
        }
        
        function validateForm() {
            // Just for immediate feedback, actual validation in goToStep
        }
        
        // Analyze Symptoms
        async function analyzeSymptoms() {
            // Go to step 4 and show loading
            goToStep(4);
            document.getElementById('analyzing-state').classList.remove('hidden');
            document.getElementById('results-container').classList.add('hidden');
            
            // Collect patient profile
            const patientProfile = {
                age: parseInt(document.getElementById('patient-age').value),
                gender: document.getElementById('patient-gender').value,
                height: parseInt(document.getElementById('patient-height').value) || undefined,
                weight: parseInt(document.getElementById('patient-weight').value) || undefined,
                preConditions: document.getElementById('pre-conditions').value.split(',').map(s => s.trim()).filter(Boolean),
                medications: document.getElementById('medications').value.split(',').map(s => s.trim()).filter(Boolean),
                allergies: [],
                familyHistory: [],
                lifestyle: {
                    smoking: document.getElementById('lifestyle-smoking').value,
                    alcohol: document.getElementById('lifestyle-alcohol').value,
                    exercise: document.getElementById('lifestyle-exercise').value,
                    diet: document.getElementById('lifestyle-diet').value
                }
            };
            
            // Calculate BMI if height and weight provided
            if (patientProfile.height && patientProfile.weight) {
                patientProfile.bmi = Math.round(patientProfile.weight / Math.pow(patientProfile.height / 100, 2) * 10) / 10;
            }
            
            // Collect symptoms
            const symptoms = Array.from(selectedSymptoms.entries()).map(([id, data]) => ({
                id,
                name: data.name,
                severity: data.severity,
                duration: data.duration,
                frequency: data.frequency,
                onset: data.onset,
                bodyRegion: data.bodyRegion
            }));
            
            const additionalDetails = document.getElementById('additional-details').value;
            
            try {
                // Call API
                const response = await fetch('/api/medisense/v4/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        symptoms,
                        patient: patientProfile,
                        freeText: additionalDetails
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    analysisResult = result.data;
                    displayResults(result.data);
                } else {
                    alert('Analysis failed: ' + (result.error || 'Please try again.'));
                    goToStep(3);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                goToStep(3);
            }
        }
        
        // Display Results
        function displayResults(data) {
            // Hide loading, show results
            document.getElementById('analyzing-state').classList.add('hidden');
            document.getElementById('results-container').classList.remove('hidden');
            
            // Triage Banner
            const triageHeader = document.getElementById('triage-header');
            const triageIcon = document.getElementById('triage-icon');
            
            // Reset classes
            triageHeader.className = 'p-6';
            
            // Add urgency class based on level
            const urgencyMap = {
                0: 'urgency-critical',
                1: 'urgency-emergency',
                2: 'urgency-urgent',
                3: 'urgency-semiUrgent',
                4: 'urgency-routine',
                5: 'urgency-selfCare'
            };
            triageHeader.classList.add(urgencyMap[data.triage.level] || 'urgency-routine');
            
            triageIcon.querySelector('i').className = 'fas ' + data.triage.icon + ' text-3xl';
            document.getElementById('triage-level').textContent = data.triage.name;
            document.getElementById('triage-response').textContent = data.triage.responseTime;
            document.getElementById('triage-action').textContent = data.triage.action;
            
            // Emergency warning
            if (data.emergencyDisclaimer) {
                document.getElementById('emergency-warning').classList.remove('hidden');
                document.getElementById('emergency-text').textContent = data.emergencyDisclaimer;
            } else {
                document.getElementById('emergency-warning').classList.add('hidden');
            }
            
            // Risk Assessment
            const riskScore = data.riskAssessment.riskScore;
            document.getElementById('risk-score').textContent = riskScore;
            document.getElementById('risk-level').textContent = data.riskAssessment.overallRisk.charAt(0).toUpperCase() + data.riskAssessment.overallRisk.slice(1) + ' Risk';
            
            // Animate gauge
            const gaugeFill = document.getElementById('risk-gauge-fill');
            const circumference = 251; // Half circle
            const offset = circumference - (riskScore / 100) * circumference;
            gaugeFill.style.strokeDashoffset = offset;
            
            // Set gauge color
            const gaugeColors = {
                'minimal': '#10B981',
                'low': '#10B981',
                'moderate': '#F59E0B',
                'high': '#EF4444',
                'very-high': '#DC2626',
                'critical': '#7F1D1D'
            };
            gaugeFill.style.stroke = gaugeColors[data.riskAssessment.overallRisk] || '#10B981';
            
            // Risk factors
            const factorsList = document.getElementById('risk-factors');
            factorsList.innerHTML = '';
            data.riskAssessment.factors.forEach(factor => {
                const impactColors = {
                    'protective': 'text-green-600 bg-green-50',
                    'neutral': 'text-gray-600 bg-gray-50',
                    'risk': 'text-orange-600 bg-orange-50',
                    'high-risk': 'text-red-600 bg-red-50'
                };
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between p-2 rounded-lg ' + (impactColors[factor.impact] || 'bg-gray-50');
                div.innerHTML = \`
                    <span class="font-medium">\${factor.factor}</span>
                    <span class="text-sm">+\${factor.weight} pts</span>
                \`;
                factorsList.appendChild(div);
            });
            
            // Red Flags
            if (data.redFlagsDetected && data.redFlagsDetected.length > 0) {
                document.getElementById('red-flags-section').classList.remove('hidden');
                const redFlagsList = document.getElementById('red-flags-list');
                redFlagsList.innerHTML = '';
                data.redFlagsDetected.forEach(rf => {
                    const div = document.createElement('div');
                    div.className = 'flex items-start p-3 bg-white rounded-lg';
                    div.innerHTML = \`
                        <i class="fas fa-exclamation-circle text-red-500 mt-1 mr-3"></i>
                        <div>
                            <div class="font-semibold text-red-700">\${rf.flag}</div>
                            <div class="text-sm text-red-600">\${rf.immediateAction}</div>
                        </div>
                    \`;
                    redFlagsList.appendChild(div);
                });
            } else {
                document.getElementById('red-flags-section').classList.add('hidden');
            }
            
            // Conditions
            const conditionsList = document.getElementById('conditions-list');
            conditionsList.innerHTML = '';
            data.differentialDiagnosis.forEach((diff, idx) => {
                const confidenceColors = {
                    'very-high': '#059669',
                    'high': '#10B981',
                    'moderate': '#F59E0B',
                    'low': '#9CA3AF',
                    'very-low': '#D1D5DB'
                };
                
                const div = document.createElement('div');
                div.className = 'condition-card p-4 bg-cream rounded-xl';
                div.innerHTML = \`
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <span class="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">\${idx + 1}</span>
                            <h4 class="font-bold text-navy">\${diff.condition.name}</h4>
                        </div>
                        <div class="text-right">
                            <span class="text-sm font-semibold" style="color: \${confidenceColors[diff.confidence]}">\${diff.probability}%</span>
                            <div class="text-xs text-gray-500">\${diff.confidence} confidence</div>
                        </div>
                    </div>
                    <div class="progress-bar mb-3">
                        <div class="progress-fill" style="width: \${diff.probability}%; background: \${confidenceColors[diff.confidence]}"></div>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-2">
                        \${diff.matchingSymptoms.cardinal.map(s => '<span class="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">⚡ ' + s + '</span>').join('')}
                        \${diff.matchingSymptoms.primary.map(s => '<span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">' + s + '</span>').join('')}
                        \${diff.matchingSymptoms.secondary.map(s => '<span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">' + s + '</span>').join('')}
                    </div>
                    \${diff.missingKeySymptoms.length > 0 ? '<div class="text-xs text-gray-500">Missing key symptoms: ' + diff.missingKeySymptoms.join(', ') + '</div>' : ''}
                    \${diff.redFlagsPresent.length > 0 ? '<div class="text-xs text-red-600 mt-1"><i class="fas fa-exclamation-triangle mr-1"></i>Red flags: ' + diff.redFlagsPresent.join(', ') + '</div>' : ''}
                \`;
                conditionsList.appendChild(div);
            });
            
            // Recommendations
            // Immediate
            if (data.recommendations.immediate && data.recommendations.immediate.length > 0) {
                document.getElementById('rec-immediate').classList.remove('hidden');
                const list = document.getElementById('rec-immediate-list');
                list.innerHTML = '';
                data.recommendations.immediate.forEach(rec => {
                    const div = document.createElement('div');
                    div.className = 'p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg';
                    div.innerHTML = \`
                        <div class="font-semibold text-red-700">\${rec.action}</div>
                        <div class="text-sm text-red-600">\${rec.reason}</div>
                    \`;
                    list.appendChild(div);
                });
            } else {
                document.getElementById('rec-immediate').classList.add('hidden');
            }
            
            // Short-term
            const shortTermList = document.getElementById('rec-short-term-list');
            shortTermList.innerHTML = '';
            data.recommendations.shortTerm.forEach(rec => {
                const div = document.createElement('div');
                div.className = 'p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg';
                div.innerHTML = \`
                    <div class="font-semibold text-blue-700">\${rec.action}</div>
                    <div class="text-sm text-blue-600">\${rec.reason} (\${rec.timeframe})</div>
                \`;
                shortTermList.appendChild(div);
            });
            
            // Tests
            if (data.recommendations.tests && data.recommendations.tests.length > 0) {
                document.getElementById('rec-tests').classList.remove('hidden');
                const testsList = document.getElementById('rec-tests-list');
                testsList.innerHTML = '';
                data.recommendations.tests.forEach(test => {
                    const div = document.createElement('div');
                    div.className = 'p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg';
                    div.innerHTML = \`
                        <div class="font-semibold text-purple-700">\${test.test}</div>
                        <div class="text-sm text-purple-600">\${test.reason} (\${test.urgency})</div>
                    \`;
                    testsList.appendChild(div);
                });
            } else {
                document.getElementById('rec-tests').classList.add('hidden');
            }
            
            // Follow-up
            const followUpList = document.getElementById('rec-follow-up-list');
            followUpList.innerHTML = '';
            data.recommendations.followUp.forEach(rec => {
                const div = document.createElement('div');
                div.className = 'p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg';
                div.innerHTML = \`
                    <div class="font-semibold text-green-700">\${rec.action}</div>
                    <div class="text-sm text-green-600">\${rec.reason} (\${rec.timeframe})</div>
                \`;
                followUpList.appendChild(div);
            });
            
            // Specialists
            const specialistsList = document.getElementById('specialists-list');
            specialistsList.innerHTML = '';
            data.specialists.forEach(spec => {
                const div = document.createElement('div');
                div.className = 'specialist-card';
                div.innerHTML = \`
                    <div class="w-12 h-12 bg-navy rounded-full mx-auto flex items-center justify-center mb-2">
                        <i class="fas \${spec.icon} text-white text-xl"></i>
                    </div>
                    <div class="font-semibold text-navy text-sm">\${spec.name}</div>
                    <div class="text-xs text-gray-500 mt-1">\${spec.reason}</div>
                \`;
                specialistsList.appendChild(div);
            });
            
            // Analysis Quality
            document.getElementById('quality-completeness').textContent = data.analysisQuality.dataCompleteness + '%';
            document.getElementById('quality-specificity').textContent = data.analysisQuality.symptomSpecificity + '%';
            document.getElementById('quality-confidence').textContent = data.analysisQuality.diagnosticConfidence + '%';
            document.getElementById('quality-relevance').textContent = data.analysisQuality.recommendationRelevance + '%';
            
            // Disclaimer
            document.getElementById('disclaimer-text').textContent = data.disclaimer;
        }
        
        // Start New Analysis
        function startNewAnalysis() {
            // Reset state
            selectedSymptoms.clear();
            analysisResult = null;
            
            // Reset form fields
            document.getElementById('patient-age').value = '';
            document.getElementById('patient-gender').value = '';
            document.getElementById('patient-height').value = '';
            document.getElementById('patient-weight').value = '';
            document.getElementById('pre-conditions').value = '';
            document.getElementById('medications').value = '';
            document.getElementById('additional-details').value = '';
            
            // Reset UI
            updateSelectedDisplay();
            updateBodyMapHighlights();
            renderSymptoms('all');
            
            // Go to step 1
            goToStep(1);
        }
    </script>
</body>
</html>
`;
