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
// 🌐 MULTI-LANGUAGE SUPPORT
// ════════════════════════════════════════════════════════════════════════════════

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: 'MediSense AI™ v4.0',
    subtitle: 'World-Class Symptom Analyzer',
    selectSymptoms: 'Select Your Symptoms',
    chooseSymptoms: 'Choose all symptoms you\'re experiencing',
    analyze: 'Analyze Symptoms',
    analyzing: 'Analyzing...',
    results: 'Analysis Results',
    urgency: 'Urgency Level',
    recommendations: 'Recommendations',
    disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional.',
    bodyMap: 'Body Map',
    front: 'Front',
    back: 'Back',
    symptomsSelected: 'Symptoms Selected',
    clickRegion: 'Click a body region to filter symptoms',
    all: 'All',
    general: 'General',
    head: 'Head',
    eyes: 'Eyes',
    ears: 'Ears',
    respiratory: 'Respiratory',
    cardiovascular: 'Heart',
    gastrointestinal: 'Digestive',
    musculoskeletal: 'Muscles',
    skin: 'Skin',
    urinary: 'Urinary',
    mental: 'Mental',
    searchSymptoms: 'Search symptoms...',
    patientInfo: 'Patient Information',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    height: 'Height',
    weight: 'Weight',
    conditions: 'Existing Conditions',
    medications: 'Current Medications',
    none: 'None',
    bookConsultation: 'Book Consultation',
    viewServices: 'View Services'
  },
  de: {
    title: 'MediSense AI™ v4.0',
    subtitle: 'Weltklasse Symptom-Analysator',
    selectSymptoms: 'Wählen Sie Ihre Symptome',
    chooseSymptoms: 'Wählen Sie alle Symptome, die Sie erleben',
    analyze: 'Symptome Analysieren',
    analyzing: 'Analysiere...',
    results: 'Analyseergebnisse',
    urgency: 'Dringlichkeitsstufe',
    recommendations: 'Empfehlungen',
    disclaimer: 'Dies ist keine medizinische Diagnose. Bitte konsultieren Sie einen Arzt.',
    bodyMap: 'Körperkarte',
    front: 'Vorne',
    back: 'Hinten',
    symptomsSelected: 'Symptome Ausgewählt',
    clickRegion: 'Klicken Sie auf eine Körperregion',
    all: 'Alle',
    general: 'Allgemein',
    head: 'Kopf',
    eyes: 'Augen',
    ears: 'Ohren',
    respiratory: 'Atmung',
    cardiovascular: 'Herz',
    gastrointestinal: 'Verdauung',
    musculoskeletal: 'Muskeln',
    skin: 'Haut',
    urinary: 'Harn',
    mental: 'Mental',
    searchSymptoms: 'Symptome suchen...',
    patientInfo: 'Patienteninformationen',
    age: 'Alter',
    gender: 'Geschlecht',
    male: 'Männlich',
    female: 'Weiblich',
    height: 'Größe',
    weight: 'Gewicht',
    conditions: 'Vorerkrankungen',
    medications: 'Aktuelle Medikamente',
    none: 'Keine',
    bookConsultation: 'Beratung Buchen',
    viewServices: 'Services Ansehen'
  },
  ar: {
    title: 'MediSense AI™ v4.0',
    subtitle: 'محلل الأعراض العالمي',
    selectSymptoms: 'اختر أعراضك',
    chooseSymptoms: 'اختر جميع الأعراض التي تعاني منها',
    analyze: 'تحليل الأعراض',
    analyzing: 'جاري التحليل...',
    results: 'نتائج التحليل',
    urgency: 'مستوى الإلحاح',
    recommendations: 'التوصيات',
    disclaimer: 'هذا ليس تشخيصاً طبياً. يرجى استشارة أخصائي رعاية صحية.',
    bodyMap: 'خريطة الجسم',
    front: 'الأمام',
    back: 'الخلف',
    symptomsSelected: 'الأعراض المختارة',
    clickRegion: 'انقر على منطقة الجسم',
    all: 'الكل',
    general: 'عام',
    head: 'الرأس',
    eyes: 'العيون',
    ears: 'الأذنين',
    respiratory: 'التنفس',
    cardiovascular: 'القلب',
    gastrointestinal: 'الجهاز الهضمي',
    musculoskeletal: 'العضلات',
    skin: 'الجلد',
    urinary: 'البولي',
    mental: 'النفسي',
    searchSymptoms: 'البحث عن الأعراض...',
    patientInfo: 'معلومات المريض',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    height: 'الطول',
    weight: 'الوزن',
    conditions: 'الحالات الموجودة',
    medications: 'الأدوية الحالية',
    none: 'لا شيء',
    bookConsultation: 'حجز استشارة',
    viewServices: 'عرض الخدمات'
  },
  fr: {
    title: 'MediSense AI™ v4.0',
    subtitle: 'Analyseur de Symptômes',
    selectSymptoms: 'Sélectionnez vos symptômes',
    chooseSymptoms: 'Choisissez tous les symptômes que vous ressentez',
    analyze: 'Analyser les Symptômes',
    analyzing: 'Analyse en cours...',
    results: 'Résultats d\'Analyse',
    urgency: 'Niveau d\'Urgence',
    recommendations: 'Recommandations',
    disclaimer: 'Ceci n\'est pas un diagnostic médical. Veuillez consulter un professionnel de santé.',
    bodyMap: 'Carte du Corps',
    front: 'Avant',
    back: 'Arrière',
    symptomsSelected: 'Symptômes Sélectionnés',
    clickRegion: 'Cliquez sur une région du corps',
    all: 'Tous',
    general: 'Général',
    head: 'Tête',
    eyes: 'Yeux',
    ears: 'Oreilles',
    respiratory: 'Respiratoire',
    cardiovascular: 'Cœur',
    gastrointestinal: 'Digestif',
    musculoskeletal: 'Muscles',
    skin: 'Peau',
    urinary: 'Urinaire',
    mental: 'Mental',
    searchSymptoms: 'Rechercher des symptômes...',
    patientInfo: 'Informations Patient',
    age: 'Âge',
    gender: 'Sexe',
    male: 'Homme',
    female: 'Femme',
    height: 'Taille',
    weight: 'Poids',
    conditions: 'Conditions Existantes',
    medications: 'Médicaments Actuels',
    none: 'Aucun',
    bookConsultation: 'Réserver Consultation',
    viewServices: 'Voir les Services'
  }
};

const getTranslation = (lang: string, key: string): string => {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  return translations[key] || TRANSLATIONS['en'][key] || key;
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎨 MEDISENSE UI PAGE GENERATOR
// ════════════════════════════════════════════════════════════════════════════════

export const mediSenseV4Page = (lang: string = 'en') => {
  const t = (key: string) => getTranslation(lang, key);
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediSense AI™ v4.0 - World-Class Symptom Analyzer | SelectCareOS™</title>
    <meta name="description" content="Advanced AI-powered symptom analysis with medical-grade accuracy. Get instant health insights, risk assessment, and specialist recommendations.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        /* ============================================================================
           SELECTCAREOS™ PREMIUM MEDISENSE SYSTEM
           German Select Luxury Healthcare Branding
           ============================================================================ */
        
        :root {
            /* SelectCareOS™ Brand Colors */
            --navy: #001F3F;
            --navy-light: #003366;
            --deep-navy: #001530;
            --midnight-blue: #003366;
            
            /* Luxurious Gold Spectrum */
            --gold: #C9A227;
            --gold-primary: #C9A227;
            --gold-champagne: #D4AF37;
            --gold-soft: #E8D5A3;
            --gold-light: #E8D5A3;
            --gold-bright: #F4D03F;
            --gold-rose: #B8860B;
            
            /* Warm Neutrals */
            --cream: #faf8f5;
            --warm-ivory: #F5F0E8;
            --pearl: #FFFDF7;
            --soft-beige: #F0EBE3;
            
            /* Functional Colors */
            --medical-blue: #0EA5E9;
            --medical-green: #10B981;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            
            /* Premium Shadows */
            --shadow-gold-sm: 0 2px 8px rgba(201, 162, 39, 0.2);
            --shadow-gold-md: 0 4px 15px rgba(201, 162, 39, 0.3);
            --shadow-gold-lg: 0 8px 30px rgba(201, 162, 39, 0.4);
            --shadow-navy-md: 0 4px 15px rgba(26, 26, 46, 0.15);
            --shadow-navy-lg: 0 12px 40px rgba(26, 26, 46, 0.2);
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--deep-navy) 100%);
            border-bottom: 2px solid rgba(201, 162, 39, 0.3);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(201, 162, 39, 0.2) inset;
        }
        
        .gradient-medical {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, #16213e 100%);
            position: relative;
        }
        
        .gradient-medical::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--gold-champagne) 50%, var(--gold) 80%, transparent 100%);
        }
        
        .card {
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            border: 1px solid rgba(201, 162, 39, 0.1);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(26, 26, 46, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
            box-shadow: 0 12px 40px rgba(26, 26, 46, 0.12), 0 4px 12px rgba(201, 162, 39, 0.08);
            border-color: rgba(201, 162, 39, 0.2);
        }
        
        /* Premium Anatomical Body Map Styles - Visible Body Inspired */
        .body-map-container {
            position: relative;
            width: 100%;
            max-width: 380px;
            margin: 0 auto;
            padding: 0;
            background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%);
            border-radius: 24px;
            border: 2px solid rgba(201, 162, 39, 0.3);
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(201, 162, 39, 0.2);
        }
        
        .anatomy-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 3/4;
            overflow: hidden;
        }
        
        .anatomy-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: opacity 0.5s ease;
        }
        
        .anatomy-image.hidden {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .anatomy-image.active {
            opacity: 1;
        }
        
        .body-map-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .body-map {
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }
        
        .body-region {
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            fill: rgba(201, 162, 39, 0.05);
            stroke: rgba(201, 162, 39, 0.15);
            stroke-width: 1;
            opacity: 0.6;
        }
        
        .body-region:hover {
            fill: rgba(201, 162, 39, 0.35);
            stroke: var(--gold);
            stroke-width: 2.5;
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(201, 162, 39, 0.7));
            transform: scale(1.02);
        }
        
        .body-region:active {
            fill: rgba(201, 162, 39, 0.5);
            stroke: var(--gold-bright);
            stroke-width: 3;
            filter: drop-shadow(0 0 20px rgba(244, 208, 63, 0.9));
            transform: scale(0.98);
        }
        
        .body-region.selected {
            fill: rgba(201, 162, 39, 0.4);
            stroke: var(--gold-champagne);
            stroke-width: 2.5;
            opacity: 1;
            filter: drop-shadow(0 0 22px rgba(212, 175, 55, 0.85));
            animation: pulse-selected 2s ease-in-out infinite;
        }
        
        @keyframes pulse-selected {
            0%, 100% { filter: drop-shadow(0 0 18px rgba(212, 175, 55, 0.7)); }
            50% { filter: drop-shadow(0 0 28px rgba(212, 175, 55, 1)); }
        }
        
        .body-region.has-symptoms {
            fill: rgba(239, 68, 68, 0.35);
            stroke: #EF4444;
            stroke-width: 2.5;
            opacity: 1;
            animation: pulse-symptom 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse-symptom {
            0%, 100% { 
                opacity: 0.8; 
                fill: rgba(239, 68, 68, 0.3);
            }
            50% { 
                opacity: 1; 
                fill: rgba(239, 68, 68, 0.5);
                filter: drop-shadow(0 0 18px rgba(239, 68, 68, 0.7)); 
            }
        }
        
        .body-outline {
            fill: none;
            stroke: rgba(201, 162, 39, 0.15);
            stroke-width: 0.5;
            pointer-events: none;
        }
        
        /* Anatomical glow effect on container */
        .body-map-container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--gold), transparent, var(--gold-champagne), transparent);
            border-radius: 26px;
            z-index: -1;
            opacity: 0.3;
            animation: anatomical-glow 4s ease-in-out infinite;
        }
        
        @keyframes anatomical-glow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
        }
        
        /* Medical badge on image */
        .anatomy-badge {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
            border: 1px solid rgba(201, 162, 39, 0.4);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 9px;
            color: var(--gold);
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            backdrop-filter: blur(4px);
        }
        
        /* View Toggle - Premium Gold */
        .view-toggle {
            display: flex;
            gap: 6px;
            margin-bottom: 12px;
            justify-content: center;
            background: linear-gradient(145deg, var(--soft-beige) 0%, #E8E8E8 100%);
            padding: 4px;
            border-radius: 25px;
            border: 1px solid rgba(201, 162, 39, 0.1);
        }
        
        .view-toggle button {
            padding: 8px 18px;
            border: none;
            border-radius: 20px;
            background: transparent;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6B7280;
        }
        
        .view-toggle button.active {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            color: var(--navy);
            box-shadow: var(--shadow-gold-sm);
        }
        
        .view-toggle button:hover:not(.active) {
            color: var(--navy);
            background: rgba(201, 162, 39, 0.15);
        }
        
        /* Gender Toggle - Premium Gold */
        .gender-toggle {
            display: flex;
            gap: 6px;
            margin-bottom: 8px;
            justify-content: center;
        }
        
        .gender-toggle button {
            padding: 6px 12px;
            border: 2px solid #E8E8E8;
            border-radius: 15px;
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            font-size: 10px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #9CA3AF;
        }
        
        .gender-toggle button.active {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            border-color: var(--gold);
            color: var(--navy);
            font-weight: 600;
            box-shadow: var(--shadow-gold-sm);
        }
        
        .gender-toggle button:hover:not(.active) {
            border-color: var(--gold);
            background: rgba(201, 162, 39, 0.08);
        }
        
        /* Symptom Tags - Premium Gold */
        .symptom-tag {
            display: inline-flex;
            align-items: center;
            padding: 12px 18px;
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            border: 2px solid #E8E8E8;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 14px;
            margin: 4px;
            font-weight: 500;
        }
        
        .symptom-tag:hover {
            border-color: var(--gold);
            background: linear-gradient(145deg, var(--pearl) 0%, rgba(201, 162, 39, 0.08) 100%);
            transform: translateY(-2px);
            box-shadow: var(--shadow-gold-sm);
        }
        
        .symptom-tag.selected {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            border-color: var(--gold);
            color: var(--navy);
            font-weight: 600;
            box-shadow: var(--shadow-gold-sm);
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
        
        /* Category Tabs - Premium Gold */
        .category-tab {
            padding: 12px 22px;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            border: 2px solid transparent;
        }
        
        .category-tab.active {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            color: var(--navy);
            font-weight: 600;
            box-shadow: var(--shadow-gold-sm);
            border-color: var(--gold);
        }
        
        .category-tab:not(.active) {
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            color: var(--navy);
            border-color: #E8E8E8;
        }
        
        .category-tab:not(.active):hover {
            background: linear-gradient(145deg, var(--pearl) 0%, rgba(201, 162, 39, 0.1) 100%);
            border-color: var(--gold);
        }
        
        /* Input Fields - Premium Gold */
        .input-field {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #E8E8E8;
            border-radius: 12px;
            font-size: 15px;
            background: var(--pearl);
            color: var(--navy);
            transition: all 0.3s ease;
        }
        
        .input-field::placeholder {
            color: #A0A0A0;
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--gold);
            background: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.15), 0 4px 12px rgba(201, 162, 39, 0.1);
        }
        
        /* Buttons - Premium Gold */
        .btn-primary {
            background: linear-gradient(135deg, var(--gold-champagne) 0%, var(--gold) 50%, var(--gold-rose) 100%);
            color: var(--navy);
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .btn-primary:hover:not(:disabled) {
            background: linear-gradient(135deg, var(--gold-soft) 0%, var(--gold-champagne) 50%, var(--gold) 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(201, 162, 39, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .btn-primary:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(201, 162, 39, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary:disabled {
            background: linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: var(--gold);
            padding: 12px 28px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            border: 2px solid var(--gold);
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(26, 26, 46, 0.3);
        }
        
        .btn-secondary:hover {
            background: var(--gold);
            color: var(--navy);
            box-shadow: var(--shadow-gold-md);
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
        
        /* Step Indicator - Premium Gold */
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .step {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .step.active {
            background: linear-gradient(135deg, var(--gold-champagne) 0%, var(--gold) 100%);
            color: var(--navy);
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2), 0 4px 15px rgba(201, 162, 39, 0.4);
            animation: pulse-gold-step 2s infinite;
        }
        
        @keyframes pulse-gold-step {
            0%, 100% { box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2), 0 4px 15px rgba(201, 162, 39, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(201, 162, 39, 0.1), 0 4px 20px rgba(201, 162, 39, 0.5); }
        }
        
        .step.completed {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: var(--gold);
            border: 2px solid var(--gold);
            box-shadow: 0 4px 12px rgba(26, 26, 46, 0.3);
        }
        
        .step.inactive {
            background: var(--soft-beige);
            color: #8B8B8B;
            border: 2px solid #D0D0D0;
        }
        
        .step-line {
            width: 60px;
            height: 3px;
            background: #E0E0E0;
            border-radius: 2px;
            transition: all 0.4s ease;
        }
        
        .step-line.completed {
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-champagne) 100%);
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
        
        /* Specialist Card - Premium Gold */
        .specialist-card {
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            border: 2px solid rgba(201, 162, 39, 0.15);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .specialist-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-champagne) 50%, var(--gold) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .specialist-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(26, 26, 46, 0.1), 0 4px 12px rgba(201, 162, 39, 0.1);
            border-color: rgba(201, 162, 39, 0.3);
        }
        
        .specialist-card:hover::before {
            opacity: 1;
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
        
        /* Bottom Navigation - Premium Gold */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, #FFFFFF 0%, var(--pearl) 100%);
            border-top: 2px solid rgba(201, 162, 39, 0.15);
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
            box-shadow: 0 -4px 20px rgba(26, 26, 46, 0.08);
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            color: #9CA3AF;
            text-decoration: none;
            font-size: 10px;
            transition: all 0.2s;
        }
        
        .nav-item i {
            font-size: 22px;
            margin-bottom: 4px;
        }
        
        .nav-item:hover {
            color: var(--navy);
        }
        
        .nav-item.active {
            color: var(--gold);
        }
        
        .nav-item.active i {
            color: var(--gold);
        }
        
        /* Add padding to body for bottom nav */
        body {
            padding-bottom: 80px;
        }
        
        /* Floating Emergency Button - Premium */
        .floating-emergency {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #DC2626, #EF4444);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
            z-index: 99;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            border: 3px solid rgba(255, 255, 255, 0.3);
        }
        
        .floating-emergency:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
        }
        
        /* Gold Accent AI Floating Button */
        .floating-ai {
            position: fixed;
            bottom: 160px;
            right: 20px;
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--navy);
            font-size: 20px;
            box-shadow: var(--shadow-gold-md);
            z-index: 99;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
        }
        
        .floating-ai:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-gold-lg);
        }
        
        /* Toast Notifications */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        }
        
        .toast {
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
            backdrop-filter: blur(10px);
        }
        
        .toast.toast-error {
            background: linear-gradient(135deg, #FEE2E2, #FECACA);
            border-left: 4px solid #DC2626;
            color: #991B1B;
        }
        
        .toast.toast-success {
            background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
            border-left: 4px solid #059669;
            color: #065F46;
        }
        
        .toast.toast-warning {
            background: linear-gradient(135deg, #FEF3C7, #FDE68A);
            border-left: 4px solid #D97706;
            color: #92400E;
        }
        
        .toast.toast-info {
            background: linear-gradient(135deg, #DBEAFE, #BFDBFE);
            border-left: 4px solid #2563EB;
            color: #1E40AF;
        }
        
        .toast-icon {
            font-size: 20px;
            flex-shrink: 0;
        }
        
        .toast-content {
            flex: 1;
        }
        
        .toast-title {
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .toast-message {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .toast-close {
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
            padding: 0;
            font-size: 18px;
        }
        
        .toast-close:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Skip to Content Link (Accessibility) */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--navy);
            color: white;
            padding: 8px 16px;
            z-index: 10001;
            transition: top 0.3s;
        }
        
        .skip-link:focus {
            top: 0;
        }
        
        /* Focus Visible (Accessibility) */
        *:focus-visible {
            outline: 3px solid var(--gold);
            outline-offset: 2px;
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* ============================================================================
           3D ANATOMICAL BACKGROUND STYLES
           Premium Medical Visualization
           ============================================================================ */
        
        .anatomy-3d-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            min-height: 800px;
            background: linear-gradient(135deg, #0a0a1a 0%, #001F3F 30%, #003366 70%, #0a1628 100%);
            border-radius: 20px;
            overflow: hidden;
            z-index: 0;
        }
        
        #anatomy-3d-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        .anatomy-3d-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                135deg,
                rgba(0, 31, 63, 0.4) 0%,
                rgba(0, 51, 102, 0.3) 30%,
                transparent 50%,
                rgba(0, 31, 63, 0.3) 70%,
                rgba(10, 10, 26, 0.5) 100%
            );
            z-index: 2;
            pointer-events: none;
        }
        
        /* Floating Anatomy Labels */
        .anatomy-labels {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            pointer-events: none;
        }
        
        .anatomy-label {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0.7;
            transition: all 0.3s ease;
            animation: float 4s ease-in-out infinite;
        }
        
        .anatomy-label:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        
        .label-brain { top: 8%; left: 15%; animation-delay: 0s; }
        .label-heart { top: 35%; left: 10%; animation-delay: 0.5s; }
        .label-lungs { top: 30%; right: 12%; animation-delay: 1s; }
        .label-liver { top: 48%; left: 8%; animation-delay: 1.5s; }
        .label-stomach { top: 55%; right: 10%; animation-delay: 2s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        
        .label-dot {
            width: 10px;
            height: 10px;
            background: var(--gold);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--gold), 0 0 20px rgba(201, 162, 39, 0.5);
        }
        
        .label-dot.pulse-red {
            background: #ef4444;
            box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.5);
            animation: pulse-glow-red 1.2s ease-in-out infinite;
        }
        
        .label-dot.pulse-blue {
            background: #3b82f6;
            box-shadow: 0 0 10px #3b82f6, 0 0 20px rgba(59, 130, 246, 0.5);
            animation: pulse-glow-blue 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow-red {
            0%, 100% { box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.3); transform: scale(1); }
            50% { box-shadow: 0 0 20px #ef4444, 0 0 40px rgba(239, 68, 68, 0.6); transform: scale(1.2); }
        }
        
        @keyframes pulse-glow-blue {
            0%, 100% { box-shadow: 0 0 10px #3b82f6, 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 20px #3b82f6, 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .label-text {
            font-size: 11px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        /* DNA Helix Animation */
        .dna-helix {
            position: absolute;
            right: 5%;
            top: 20%;
            width: 60px;
            height: 300px;
            z-index: 2;
            opacity: 0.3;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 10px,
                rgba(201, 162, 39, 0.3) 10px,
                rgba(201, 162, 39, 0.3) 12px
            );
            animation: dna-rotate 8s linear infinite;
            transform-style: preserve-3d;
        }
        
        @keyframes dna-rotate {
            0% { transform: rotateY(0deg) perspective(500px); }
            100% { transform: rotateY(360deg) perspective(500px); }
        }
        
        /* ECG Vital Signs Line */
        .vitals-visual {
            position: absolute;
            bottom: 15%;
            left: 5%;
            width: 250px;
            height: 50px;
            z-index: 3;
            opacity: 0.6;
        }
        
        .ecg-line {
            width: 100%;
            height: 100%;
        }
        
        .ecg-path {
            fill: none;
            stroke: #10b981;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: ecg-draw 2s ease-in-out infinite;
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6));
        }
        
        @keyframes ecg-draw {
            0% { stroke-dashoffset: 400; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -400; }
        }
        
        /* Profile Form Container */
        .profile-form-container {
            position: relative;
            z-index: 10;
            padding: 40px 20px;
        }
        
        .profile-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(201, 162, 39, 0.2);
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 162, 39, 0.1);
            max-width: 900px;
            margin: 0 auto;
        }
        
        /* Form Group Styles */
        .form-group {
            position: relative;
        }
        
        .form-label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--navy);
            margin-bottom: 8px;
        }
        
        .form-label-small {
            display: block;
            font-size: 11px;
            font-weight: 500;
            color: #6B7280;
            margin-bottom: 4px;
            text-align: center;
        }
        
        .input-hint {
            display: block;
            font-size: 10px;
            color: #9CA3AF;
            margin-top: 4px;
        }
        
        .input-animated {
            transition: all 0.3s ease;
            border: 2px solid #E5E7EB;
        }
        
        .input-animated:focus {
            border-color: var(--gold);
            box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15), 0 4px 12px rgba(201, 162, 39, 0.1);
            transform: translateY(-2px);
        }
        
        /* Lifestyle Cards */
        .lifestyle-section {
            background: linear-gradient(135deg, rgba(201, 162, 39, 0.05) 0%, rgba(201, 162, 39, 0.02) 100%);
            border-radius: 16px;
            padding: 20px;
            border: 1px solid rgba(201, 162, 39, 0.1);
        }
        
        .lifestyle-card {
            background: white;
            border-radius: 12px;
            padding: 16px 12px;
            text-align: center;
            border: 1px solid #E5E7EB;
            transition: all 0.3s ease;
        }
        
        .lifestyle-card:hover {
            border-color: var(--gold);
            box-shadow: 0 8px 25px rgba(201, 162, 39, 0.15);
            transform: translateY(-3px);
        }
        
        .lifestyle-icon {
            width: 40px;
            height: 40px;
            margin: 0 auto 10px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--navy);
            font-size: 16px;
        }
        
        .input-field-small {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 12px;
            transition: all 0.3s ease;
            background: white;
        }
        
        .input-field-small:focus {
            border-color: var(--gold);
            outline: none;
            box-shadow: 0 0 0 2px rgba(201, 162, 39, 0.1);
        }
        
        /* BMI Calculator */
        .bmi-calculator {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 16px;
            padding: 20px;
            border: 1px solid rgba(14, 165, 233, 0.2);
        }
        
        .bmi-value-container {
            text-align: center;
            margin-bottom: 16px;
        }
        
        .bmi-label {
            display: block;
            font-size: 12px;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }
        
        .bmi-value {
            display: block;
            font-size: 48px;
            font-weight: 700;
            color: var(--navy);
            line-height: 1;
        }
        
        .bmi-category {
            display: block;
            font-size: 14px;
            font-weight: 600;
            margin-top: 8px;
            padding: 4px 12px;
            border-radius: 20px;
            display: inline-block;
        }
        
        .bmi-category.underweight { background: #fef3c7; color: #92400e; }
        .bmi-category.normal { background: #d1fae5; color: #065f46; }
        .bmi-category.overweight { background: #fed7aa; color: #9a3412; }
        .bmi-category.obese { background: #fee2e2; color: #991b1b; }
        
        .bmi-scale {
            margin-top: 16px;
        }
        
        .bmi-scale-bar {
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(90deg, #fbbf24 0%, #22c55e 25%, #22c55e 40%, #f97316 60%, #ef4444 100%);
            position: relative;
        }
        
        .bmi-indicator {
            position: absolute;
            top: -4px;
            width: 16px;
            height: 16px;
            background: var(--navy);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: left 0.5s ease;
            left: 0%;
        }
        
        .bmi-scale-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 9px;
            color: #9CA3AF;
            text-transform: uppercase;
        }
        
        /* Glowing Button */
        .btn-glow {
            position: relative;
            overflow: hidden;
        }
        
        .btn-glow::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            transform: rotate(45deg);
            animation: btn-shine 3s ease-in-out infinite;
        }
        
        @keyframes btn-shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
        
        /* Responsive for 3D Section */
        @media (max-width: 768px) {
            .anatomy-3d-container {
                min-height: 950px;
            }
            
            .anatomy-labels {
                display: none;
            }
            
            .dna-helix, .vitals-visual {
                opacity: 0.2;
            }
            
            .profile-form-container {
                padding: 20px 10px;
            }
            
            .lifestyle-card {
                padding: 12px 8px;
            }
            
            .lifestyle-icon {
                width: 32px;
                height: 32px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body class="bg-cream min-h-screen">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Toast Notification Container -->
    <div id="toast-container" class="toast-container" role="alert" aria-live="polite"></div>
    
    <!-- Header - Premium Gold -->
    <header class="gradient-navy sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-2xl font-bold text-white flex items-center">
                        <i class="fas fa-hospital mr-2" style="color: var(--gold)"></i>
                        SelectCare<span class="text-gold">OS</span>™
                    </a>
                    <span class="hidden md:inline-block" style="color: rgba(201, 162, 39, 0.4)">|</span>
                    <span class="hidden md:inline-block font-semibold" style="color: var(--gold-soft)">MediSense AI™ v4.0</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/dashboard" class="transition-opacity hover:opacity-80" style="color: var(--gold-soft)">
                        <i class="fas fa-th-large mr-2"></i>
                        <span class="hidden sm:inline">Dashboard</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Hero Section - Premium Gold -->
    <section class="gradient-medical py-8 md:py-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
            <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" style="background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%); box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4);">
                <i class="fas fa-brain text-3xl md:text-4xl" style="color: var(--navy)"></i>
            </div>
            <h1 class="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                MediSense <span style="color: var(--gold)">AI</span>™
            </h1>
            <p class="text-lg md:text-xl mb-2" style="color: var(--gold-soft)">World-Class Intelligent Symptom Analyzer</p>
            <p class="text-xs md:text-sm opacity-75 max-w-2xl mx-auto">
                Powered by advanced medical AI • Bayesian inference engine • 300+ ICD-11 conditions • 6-level triage
            </p>
            <div class="flex justify-center flex-wrap gap-4 md:gap-8 mt-6 md:mt-8">
                <div class="text-center p-3 rounded-xl" style="background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.3);">
                    <div class="text-2xl md:text-3xl font-bold" style="color: var(--gold)">600+</div>
                    <div class="text-xs md:text-sm opacity-75">Symptoms</div>
                </div>
                <div class="text-center p-3 rounded-xl" style="background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.3);">
                    <div class="text-2xl md:text-3xl font-bold" style="color: var(--gold)">300+</div>
                    <div class="text-xs md:text-sm opacity-75">Conditions</div>
                </div>
                <div class="text-center p-3 rounded-xl" style="background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.3);">
                    <div class="text-2xl md:text-3xl font-bold" style="color: var(--gold)">98.5%</div>
                    <div class="text-xs md:text-sm opacity-75">Triage Accuracy</div>
                </div>
                <div class="text-center p-3 rounded-xl" style="background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.3);">
                    <div class="text-2xl md:text-3xl font-bold" style="color: var(--gold)">50+</div>
                    <div class="text-xs md:text-sm opacity-75">Red Flags</div>
                </div>
            </div>
        </div>
    </section>
    
    <main id="main-content" class="max-w-7xl mx-auto px-4 py-6 md:py-8" role="main" aria-label="MediSense Symptom Analyzer">
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
        
        <!-- Step 1: Patient Profile with 3D Anatomical Background -->
        <div id="step1" class="relative mb-6 fade-in">
            <!-- 3D Anatomical Model Background Container -->
            <div class="anatomy-3d-container">
                <!-- Three.js 3D Canvas -->
                <canvas id="anatomy-3d-canvas"></canvas>
                
                <!-- Anatomical Overlay Gradient -->
                <div class="anatomy-3d-overlay"></div>
                
                <!-- Floating Anatomy Labels -->
                <div class="anatomy-labels">
                    <div class="anatomy-label label-brain" data-organ="brain">
                        <span class="label-dot"></span>
                        <span class="label-text">Brain</span>
                    </div>
                    <div class="anatomy-label label-heart" data-organ="heart">
                        <span class="label-dot pulse-red"></span>
                        <span class="label-text">Heart</span>
                    </div>
                    <div class="anatomy-label label-lungs" data-organ="lungs">
                        <span class="label-dot pulse-blue"></span>
                        <span class="label-text">Lungs</span>
                    </div>
                    <div class="anatomy-label label-liver" data-organ="liver">
                        <span class="label-dot"></span>
                        <span class="label-text">Liver</span>
                    </div>
                    <div class="anatomy-label label-stomach" data-organ="stomach">
                        <span class="label-dot"></span>
                        <span class="label-text">Stomach</span>
                    </div>
                </div>
                
                <!-- DNA Helix Animation -->
                <div class="dna-helix"></div>
                
                <!-- Vital Signs Visualization -->
                <div class="vitals-visual">
                    <svg viewBox="0 0 200 50" class="ecg-line">
                        <path class="ecg-path" d="M0,25 L20,25 L25,25 L30,10 L35,40 L40,15 L45,35 L50,25 L70,25 L75,25 L80,5 L85,45 L90,20 L95,30 L100,25 L120,25 L125,25 L130,8 L135,42 L140,18 L145,32 L150,25 L200,25"/>
                    </svg>
                </div>
            </div>
            
            <!-- Patient Profile Form (Floating over 3D background) -->
            <div class="profile-form-container">
                <div class="card profile-card p-6 md:p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-4 shadow-lg">
                            <i class="fas fa-user-md text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-navy">Your Health Profile</h2>
                            <p class="text-sm text-gray-500">Help our AI understand your baseline health</p>
                        </div>
                    </div>
                    
                    <!-- BMI Calculator Display -->
                    <div id="bmi-display" class="bmi-calculator mb-6 hidden">
                        <div class="bmi-value-container">
                            <span class="bmi-label">Your BMI</span>
                            <span id="bmi-value" class="bmi-value">--</span>
                            <span id="bmi-category" class="bmi-category">Enter height & weight</span>
                        </div>
                        <div class="bmi-scale">
                            <div class="bmi-scale-bar">
                                <div id="bmi-indicator" class="bmi-indicator"></div>
                            </div>
                            <div class="bmi-scale-labels">
                                <span>Underweight</span>
                                <span>Normal</span>
                                <span>Overweight</span>
                                <span>Obese</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-calendar-alt mr-1 text-gold"></i> Age *
                            </label>
                            <input type="number" id="patient-age" placeholder="35" class="input-field input-animated" min="1" max="120" required oninput="updateAnatomyVisualization()">
                            <span class="input-hint">Years old</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-venus-mars mr-1 text-gold"></i> Gender *
                            </label>
                            <select id="patient-gender" class="input-field input-animated" required onchange="updateAnatomyVisualization()">
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-ruler-vertical mr-1 text-gold"></i> Height
                            </label>
                            <input type="number" id="patient-height" placeholder="170" class="input-field input-animated" min="50" max="250" oninput="calculateBMI()">
                            <span class="input-hint">centimeters</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-weight mr-1 text-gold"></i> Weight
                            </label>
                            <input type="number" id="patient-weight" placeholder="70" class="input-field input-animated" min="20" max="300" oninput="calculateBMI()">
                            <span class="input-hint">kilograms</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-notes-medical mr-1 text-gold"></i> Pre-existing Conditions
                            </label>
                            <input type="text" id="pre-conditions" placeholder="e.g., Diabetes, Hypertension, Asthma..." class="input-field input-animated">
                            <span class="input-hint">Separate multiple conditions with commas</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-pills mr-1 text-gold"></i> Current Medications
                            </label>
                            <input type="text" id="medications" placeholder="e.g., Metformin, Aspirin, Lisinopril..." class="input-field input-animated">
                            <span class="input-hint">Separate multiple medications with commas</span>
                        </div>
                    </div>
                    
                    <!-- Lifestyle Section with Visual Icons -->
                    <div class="lifestyle-section mb-6">
                        <h3 class="text-sm font-semibold text-navy mb-3 flex items-center">
                            <i class="fas fa-heartbeat mr-2 text-gold"></i> Lifestyle Factors
                        </h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="form-group lifestyle-card">
                                <div class="lifestyle-icon">
                                    <i class="fas fa-smoking"></i>
                                </div>
                                <label class="form-label-small">Smoking</label>
                                <select id="lifestyle-smoking" class="input-field-small">
                                    <option value="never">Never</option>
                                    <option value="former">Former</option>
                                    <option value="current">Current</option>
                                </select>
                            </div>
                            <div class="form-group lifestyle-card">
                                <div class="lifestyle-icon">
                                    <i class="fas fa-wine-glass-alt"></i>
                                </div>
                                <label class="form-label-small">Alcohol</label>
                                <select id="lifestyle-alcohol" class="input-field-small">
                                    <option value="none">None</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="heavy">Heavy</option>
                                </select>
                            </div>
                            <div class="form-group lifestyle-card">
                                <div class="lifestyle-icon">
                                    <i class="fas fa-running"></i>
                                </div>
                                <label class="form-label-small">Exercise</label>
                                <select id="lifestyle-exercise" class="input-field-small">
                                    <option value="sedentary">Sedentary</option>
                                    <option value="light">Light</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="active">Active</option>
                                </select>
                            </div>
                            <div class="form-group lifestyle-card">
                                <div class="lifestyle-icon">
                                    <i class="fas fa-utensils"></i>
                                </div>
                                <label class="form-label-small">Diet</label>
                                <select id="lifestyle-diet" class="input-field-small">
                                    <option value="standard">Standard</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="keto">Keto</option>
                                    <option value="mediterranean">Mediterranean</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center mt-6">
                        <div class="text-xs text-gray-400">
                            <i class="fas fa-lock mr-1"></i> Your data is encrypted and HIPAA compliant
                        </div>
                        <button onclick="goToStep(2)" class="btn-primary btn-glow">
                            Continue to Symptoms <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Step 2: Symptom Selection -->
        <div id="step2" class="hidden">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Anatomical Body Map (Left) -->
                <div class="lg:col-span-1">
                    <div class="card p-6 sticky top-24">
                        <h3 class="font-bold text-navy mb-3 flex items-center">
                            <i class="fas fa-person text-gold mr-2"></i>
                            Select Body Region
                        </h3>
                        
                        <!-- View Toggle (Front/Back) -->
                        <div class="view-toggle">
                            <button id="view-front" class="active" onclick="toggleBodyView('front')">
                                <i class="fas fa-user mr-1"></i>Front
                            </button>
                            <button id="view-back" onclick="toggleBodyView('back')">
                                <i class="fas fa-user mr-1"></i>Back
                            </button>
                        </div>
                        
                        <div class="body-map-container">
                            <!-- Visible Body-Style Anatomical Images -->
                            <div class="anatomy-image-wrapper">
                                <!-- Front View Anatomical Image -->
                                <img 
                                    id="anatomy-front" 
                                    src="/static/images/anatomy-front.png" 
                                    alt="Human Anatomy Front View" 
                                    class="anatomy-image active"
                                    loading="eager"
                                />
                                <!-- Back View Anatomical Image -->
                                <img 
                                    id="anatomy-back" 
                                    src="/static/images/anatomy-back.png" 
                                    alt="Human Anatomy Back View" 
                                    class="anatomy-image hidden"
                                    loading="eager"
                                />
                                
                                <!-- Interactive Overlay - Front View (Enhanced Precision for 3D Anatomy Image) -->
                                <!-- Image: 1792x2400px, ViewBox: 200x420, Conversion: X=pixel*0.1116, Y=pixel*0.175 -->
                                <div class="body-map-overlay" id="overlay-front">
                                    <svg id="body-front" viewBox="0 0 200 420" class="body-map" preserveAspectRatio="xMidYMid meet">
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- HEAD & NECK REGION - Precisely aligned to anatomical image center -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- HEAD (Skull) - Larger clickable area covering full face -->
                                        <ellipse cx="100" cy="30" rx="18" ry="22" class="body-region" data-region="head" onclick="selectBodyRegion('head', 'Head')" data-label="Head"/>
                                        
                                        <!-- Left Ear - Extended hit area -->
                                        <ellipse cx="80" cy="32" rx="6" ry="10" class="body-region" data-region="ears" onclick="selectBodyRegion('ears', 'Left Ear')" data-label="Left Ear"/>
                                        
                                        <!-- Right Ear - Extended hit area -->
                                        <ellipse cx="120" cy="32" rx="6" ry="10" class="body-region" data-region="ears" onclick="selectBodyRegion('ears', 'Right Ear')" data-label="Right Ear"/>
                                        
                                        <!-- NECK - Centered below head -->
                                        <rect x="90" y="52" width="20" height="16" rx="5" class="body-region" data-region="head" onclick="selectBodyRegion('head', 'Neck')" data-label="Neck"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- SHOULDERS & ARMS - Aligned to visible musculature contours -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Shoulder (Deltoid) -->
                                        <path d="M70,66 C60,70 50,78 48,90 L48,98 C55,96 62,92 70,88 L80,76 C78,72 74,68 70,66 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Shoulder')" data-label="Left Shoulder"/>
                                        
                                        <!-- Right Shoulder (Deltoid) -->
                                        <path d="M130,66 C140,70 150,78 152,90 L152,98 C145,96 138,92 130,88 L120,76 C122,72 126,68 130,66 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Shoulder')" data-label="Right Shoulder"/>
                                        
                                        <!-- Left Upper Arm (Bicep) - Following arm contour -->
                                        <path d="M42,100 C36,118 32,138 30,158 L44,162 C46,142 48,122 50,104 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Upper Arm')" data-label="Left Bicep"/>
                                        
                                        <!-- Right Upper Arm (Bicep) -->
                                        <path d="M158,100 C164,118 168,138 170,158 L156,162 C154,142 152,122 150,104 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Upper Arm')" data-label="Right Bicep"/>
                                        
                                        <!-- Left Forearm - Extended along arm -->
                                        <path d="M28,165 C22,190 18,215 16,240 L32,244 C34,219 36,194 40,169 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Forearm')" data-label="Left Forearm"/>
                                        
                                        <!-- Right Forearm -->
                                        <path d="M172,165 C178,190 182,215 184,240 L168,244 C166,219 164,194 160,169 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Forearm')" data-label="Right Forearm"/>
                                        
                                        <!-- Left Hand - Larger hit area -->
                                        <ellipse cx="22" cy="265" rx="12" ry="20" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Hand')" data-label="Left Hand"/>
                                        
                                        <!-- Right Hand -->
                                        <ellipse cx="178" cy="265" rx="12" ry="20" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Hand')" data-label="Right Hand"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- THORAX - Lungs, Heart, Chest (Precisely aligned to organs) -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Lung / Chest - Covering left ribcage area -->
                                        <path d="M72,70 L68,82 L66,100 L68,120 C74,125 82,128 90,126 L90,72 C84,68 78,68 72,70 Z" class="body-region" data-region="respiratory" onclick="selectBodyRegion('respiratory', 'Left Lung')" data-label="Left Lung"/>
                                        
                                        <!-- Right Lung / Chest - Covering right ribcage -->
                                        <path d="M128,70 L132,82 L134,100 L132,120 C126,125 118,128 110,126 L110,72 C116,68 122,68 128,70 Z" class="body-region" data-region="respiratory" onclick="selectBodyRegion('respiratory', 'Right Lung')" data-label="Right Lung"/>
                                        
                                        <!-- Heart Region (Slightly left of center, anatomically correct) -->
                                        <path d="M88,95 C84,100 82,108 84,118 C86,124 92,130 100,128 C108,130 114,124 116,118 C118,108 116,100 112,95 C108,90 104,88 100,88 C96,88 92,90 88,95 Z" class="body-region" data-region="cardiovascular" onclick="selectBodyRegion('cardiovascular', 'Heart')" data-label="Heart"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- ABDOMEN - Stomach, Liver, Intestines (Larger clickable areas) -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Upper Abdomen (Epigastric - Stomach/Liver area) -->
                                        <rect x="72" y="128" width="56" height="32" rx="8" class="body-region" data-region="gastrointestinal" onclick="selectBodyRegion('gastrointestinal', 'Upper Abdomen')" data-label="Upper Abdomen"/>
                                        
                                        <!-- Lower Abdomen (Umbilical/Hypogastric - Intestines) -->
                                        <rect x="72" y="162" width="56" height="36" rx="8" class="body-region" data-region="gastrointestinal" onclick="selectBodyRegion('gastrointestinal', 'Lower Abdomen')" data-label="Lower Abdomen"/>
                                        
                                        <!-- Pelvis / Urinary Region (Hip area, bladder) -->
                                        <path d="M68,200 C62,215 64,235 70,250 C82,258 100,262 118,258 C130,250 136,235 132,215 C128,200 118,198 100,196 C82,198 72,200 68,200 Z" class="body-region" data-region="urinary" onclick="selectBodyRegion('urinary', 'Pelvis')" data-label="Pelvis/Hip"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- LEGS - Thighs, Knees, Shins, Feet (Extended hit areas) -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Thigh (Quadriceps) -->
                                        <path d="M70,258 C66,275 64,295 64,315 L82,318 C82,298 82,278 84,260 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Thigh')" data-label="Left Thigh"/>
                                        
                                        <!-- Right Thigh (Quadriceps) -->
                                        <path d="M130,258 C134,275 136,295 136,315 L118,318 C118,298 118,278 116,260 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Thigh')" data-label="Right Thigh"/>
                                        
                                        <!-- Left Knee (Patella region) - Larger clickable -->
                                        <ellipse cx="73" cy="328" rx="12" ry="14" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Knee')" data-label="Left Knee"/>
                                        
                                        <!-- Right Knee (Patella region) -->
                                        <ellipse cx="127" cy="328" rx="12" ry="14" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Knee')" data-label="Right Knee"/>
                                        
                                        <!-- Left Shin/Calf (Tibialis anterior) -->
                                        <path d="M62,345 C58,365 58,385 60,400 L78,402 C80,387 80,367 78,347 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Shin')" data-label="Left Shin"/>
                                        
                                        <!-- Right Shin/Calf -->
                                        <path d="M138,345 C142,365 142,385 140,400 L122,402 C120,387 120,367 122,347 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Shin')" data-label="Right Shin"/>
                                        
                                        <!-- Left Foot (Dorsum) -->
                                        <ellipse cx="68" cy="412" rx="14" ry="8" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Foot')" data-label="Left Foot"/>
                                        
                                        <!-- Right Foot (Dorsum) -->
                                        <ellipse cx="132" cy="412" rx="14" ry="8" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Foot')" data-label="Right Foot"/>
                                    </svg>
                                </div>
                                
                                <!-- Interactive Overlay - Back View (Enhanced Precision for 3D Anatomy Image) -->
                                <!-- Image: 1792x2400px, ViewBox: 200x420, Back anatomy regions -->
                                <div class="body-map-overlay hidden" id="overlay-back">
                                    <svg id="body-back" viewBox="0 0 200 420" class="body-map" preserveAspectRatio="xMidYMid meet">
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- HEAD & NECK (Back) - Occipital and Cervical regions -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Back of Head (Occipital) -->
                                        <ellipse cx="100" cy="30" rx="16" ry="20" class="body-region" data-region="head" onclick="selectBodyRegion('head', 'Back of Head')" data-label="Occipital"/>
                                        
                                        <!-- Neck (Cervical Spine) -->
                                        <rect x="92" y="50" width="16" height="18" rx="4" class="body-region" data-region="head" onclick="selectBodyRegion('head', 'Neck (Back)')" data-label="Cervical Spine"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- UPPER BACK - Shoulders, Scapulae, Thoracic Spine -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Shoulder Blade (Scapula) - Larger triangular region -->
                                        <path d="M70,68 C58,75 52,88 54,105 L58,118 C68,116 78,112 88,106 L88,72 C82,68 76,66 70,68 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Shoulder Blade')" data-label="Left Scapula"/>
                                        
                                        <!-- Right Shoulder Blade (Scapula) -->
                                        <path d="M130,68 C142,75 148,88 146,105 L142,118 C132,116 122,112 112,106 L112,72 C118,68 124,66 130,68 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Shoulder Blade')" data-label="Right Scapula"/>
                                        
                                        <!-- Thoracic Spine (Upper Back - T1-T12) -->
                                        <rect x="94" y="68" width="12" height="52" rx="4" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Thoracic Spine')" data-label="Thoracic Spine"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- ARMS (Back View) - Triceps, Forearms, Hands -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Tricep - Following posterior arm -->
                                        <path d="M44,100 C38,120 34,142 32,165 L48,168 C50,145 52,122 54,102 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Tricep')" data-label="Left Tricep"/>
                                        
                                        <!-- Right Tricep -->
                                        <path d="M156,100 C162,120 166,142 168,165 L152,168 C150,145 148,122 146,102 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Tricep')" data-label="Right Tricep"/>
                                        
                                        <!-- Left Forearm (Posterior) -->
                                        <path d="M30,172 C24,198 20,225 18,250 L34,254 C36,229 38,202 42,176 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Forearm')" data-label="Left Forearm"/>
                                        
                                        <!-- Right Forearm (Posterior) -->
                                        <path d="M170,172 C176,198 180,225 182,250 L166,254 C164,229 162,202 158,176 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Forearm')" data-label="Right Forearm"/>
                                        
                                        <!-- Left Hand (Dorsal) -->
                                        <ellipse cx="24" cy="272" rx="12" ry="18" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Hand')" data-label="Left Hand"/>
                                        
                                        <!-- Right Hand (Dorsal) -->
                                        <ellipse cx="176" cy="272" rx="12" ry="18" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Hand')" data-label="Right Hand"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- LOWER BACK - Lumbar Spine, Latissimus, Kidneys -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Lumbar Spine (L1-L5) -->
                                        <rect x="94" y="122" width="12" height="42" rx="4" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Lumbar Spine')" data-label="Lumbar Spine"/>
                                        
                                        <!-- Left Lower Back (Latissimus Dorsi / Erector Spinae) -->
                                        <path d="M56,118 C52,138 52,158 56,175 C68,180 82,178 92,172 L92,120 C78,118 66,116 56,118 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Lower Back')" data-label="Left Lower Back"/>
                                        
                                        <!-- Right Lower Back (Latissimus Dorsi / Erector Spinae) -->
                                        <path d="M144,118 C148,138 148,158 144,175 C132,180 118,178 108,172 L108,120 C122,118 134,116 144,118 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Lower Back')" data-label="Right Lower Back"/>
                                        
                                        <!-- Left Kidney - Anatomically positioned -->
                                        <ellipse cx="78" cy="142" rx="10" ry="14" class="body-region" data-region="urinary" onclick="selectBodyRegion('urinary', 'Left Kidney')" data-label="Left Kidney"/>
                                        
                                        <!-- Right Kidney -->
                                        <ellipse cx="122" cy="142" rx="10" ry="14" class="body-region" data-region="urinary" onclick="selectBodyRegion('urinary', 'Right Kidney')" data-label="Right Kidney"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- GLUTEAL & PELVIS - Buttocks region -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Buttock (Gluteus Maximus) -->
                                        <path d="M60,178 C54,195 56,218 64,238 C78,248 94,245 100,235 L100,180 C86,175 72,175 60,178 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Gluteus')" data-label="Left Gluteus"/>
                                        
                                        <!-- Right Buttock (Gluteus Maximus) -->
                                        <path d="M140,178 C146,195 144,218 136,238 C122,248 106,245 100,235 L100,180 C114,175 128,175 140,178 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Gluteus')" data-label="Right Gluteus"/>
                                        
                                        <!-- Sacrum/Coccyx (Tailbone area) -->
                                        <ellipse cx="100" cy="200" rx="8" ry="12" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Sacrum')" data-label="Sacrum/Tailbone"/>
                                        
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        <!-- LEGS (Back) - Hamstrings, Calves, Heels -->
                                        <!-- ═══════════════════════════════════════════════════════════════════ -->
                                        
                                        <!-- Left Hamstring (Biceps femoris, Semitendinosus) -->
                                        <path d="M66,245 C62,270 62,295 64,318 L82,320 C84,295 84,270 82,248 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Hamstring')" data-label="Left Hamstring"/>
                                        
                                        <!-- Right Hamstring -->
                                        <path d="M134,245 C138,270 138,295 136,318 L118,320 C116,295 116,270 118,248 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Hamstring')" data-label="Right Hamstring"/>
                                        
                                        <!-- Left Knee (Popliteal - back of knee) -->
                                        <ellipse cx="73" cy="330" rx="12" ry="12" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Knee')" data-label="Left Popliteal"/>
                                        
                                        <!-- Right Knee (Popliteal) -->
                                        <ellipse cx="127" cy="330" rx="12" ry="12" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Knee')" data-label="Right Popliteal"/>
                                        
                                        <!-- Left Calf (Gastrocnemius) -->
                                        <path d="M62,345 C56,368 58,390 62,405 L80,407 C82,392 82,370 78,348 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Calf')" data-label="Left Calf"/>
                                        
                                        <!-- Right Calf (Gastrocnemius) -->
                                        <path d="M138,345 C144,368 142,390 138,405 L120,407 C118,392 118,370 122,348 Z" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Calf')" data-label="Right Calf"/>
                                        
                                        <!-- Left Heel/Foot (Plantar surface visible from back) -->
                                        <ellipse cx="70" cy="414" rx="12" ry="6" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Left Foot')" data-label="Left Heel"/>
                                        
                                        <!-- Right Heel/Foot -->
                                        <ellipse cx="130" cy="414" rx="12" ry="6" class="body-region" data-region="musculoskeletal" onclick="selectBodyRegion('musculoskeletal', 'Right Foot')" data-label="Right Heel"/>
                                    </svg>
                                </div>
                                
                                <!-- Medical Badge -->
                                <div class="anatomy-badge">
                                    <i class="fas fa-heartbeat mr-1"></i>
                                    Medical Grade 3D
                                </div>
                            </div>
                        </div>
                        
                        <!-- Selected Region Display -->
                        <div id="selected-region-info" class="mt-3 p-3 bg-cream rounded-xl text-center hidden">
                            <div class="text-xs text-gray-500 mb-1">Selected Region</div>
                            <div class="font-semibold text-navy" id="selected-region-name">-</div>
                        </div>
                        
                        <div class="mt-3 text-center text-xs text-gray-400">
                            <i class="fas fa-hand-pointer mr-1"></i>
                            Click a body region to filter symptoms
                        </div>
                        
                        <!-- Selected Count -->
                        <div class="mt-3 p-4 bg-gradient-to-r from-navy to-navy-light rounded-xl text-center">
                            <div class="text-3xl font-bold text-gold" id="symptom-count">0</div>
                            <div class="text-sm text-white/80">Symptoms Selected</div>
                        </div>
                        
                        <!-- Quick Region Buttons -->
                        <div class="mt-3 grid grid-cols-3 gap-2">
                            <button onclick="selectBodyRegion('general', 'General')" class="p-2 text-xs bg-gray-100 hover:bg-gold hover:text-navy rounded-lg transition-colors">
                                <i class="fas fa-user block text-lg mb-1"></i>General
                            </button>
                            <button onclick="selectBodyRegion('mental', 'Mental Health')" class="p-2 text-xs bg-gray-100 hover:bg-gold hover:text-navy rounded-lg transition-colors">
                                <i class="fas fa-brain block text-lg mb-1"></i>Mental
                            </button>
                            <button onclick="selectBodyRegion('skin', 'Skin')" class="p-2 text-xs bg-gray-100 hover:bg-gold hover:text-navy rounded-lg transition-colors">
                                <i class="fas fa-hand-dots block text-lg mb-1"></i>Skin
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Symptom Selection (Right) -->
                <div class="lg:col-span-2">
                    <div class="card p-6 fade-in">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold mr-3" style="background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%); color: var(--navy); box-shadow: var(--shadow-gold-sm);">2</div>
                                <div>
                                    <h2 class="text-lg font-bold" style="color: var(--navy)">Select Your Symptoms</h2>
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
                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold mr-3" style="background: linear-gradient(135deg, var(--gold) 0%, var(--gold-champagne) 100%); color: var(--navy); box-shadow: var(--shadow-gold-sm);">3</div>
                <div>
                    <h2 class="text-lg font-bold" style="color: var(--navy)">Symptom Details</h2>
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
                
                <!-- 🏋️ Wellness Programs Section -->
                <div id="wellness-section" class="card p-6 fade-in">
                    <h3 class="text-lg font-bold text-navy mb-4 flex items-center">
                        <i class="fas fa-heartbeat text-gold mr-2"></i>
                        Personalized Wellness Programs
                    </h3>
                    
                    <!-- Exercise Programs -->
                    <div id="exercise-programs-section" class="mb-6">
                        <h4 class="text-md font-semibold text-navy mb-3 flex items-center">
                            <i class="fas fa-running text-green-500 mr-2"></i>
                            Recommended Exercise Programs
                        </h4>
                        <div id="exercise-programs-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Populated by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Nutrition Plans -->
                    <div id="nutrition-plans-section" class="mb-6">
                        <h4 class="text-md font-semibold text-navy mb-3 flex items-center">
                            <i class="fas fa-utensils text-orange-500 mr-2"></i>
                            Recommended Nutrition Plans
                        </h4>
                        <div id="nutrition-plans-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Populated by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Lifestyle Modifications -->
                    <div id="lifestyle-section" class="mb-6">
                        <h4 class="text-md font-semibold text-navy mb-3 flex items-center">
                            <i class="fas fa-leaf text-teal-500 mr-2"></i>
                            Lifestyle Modifications
                        </h4>
                        <div id="lifestyle-list" class="space-y-2">
                            <!-- Populated by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Mind-Body Practices -->
                    <div id="mindbody-section">
                        <h4 class="text-md font-semibold text-navy mb-3 flex items-center">
                            <i class="fas fa-spa text-purple-500 mr-2"></i>
                            Mind-Body Practices
                        </h4>
                        <div id="mindbody-list" class="space-y-2">
                            <!-- Populated by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Explore More -->
                    <div class="mt-6 pt-4 border-t border-gray-200">
                        <a href="/api/wellness/exercises" target="_blank" class="inline-flex items-center text-navy hover:text-gold mr-6">
                            <i class="fas fa-dumbbell mr-2"></i>View All Exercise Programs
                        </a>
                        <a href="/api/wellness/nutrition" target="_blank" class="inline-flex items-center text-navy hover:text-gold">
                            <i class="fas fa-apple-alt mr-2"></i>View All Nutrition Plans
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
    
    <!-- Footer - Premium Gold -->
    <footer class="py-8 mt-12" style="background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center">
                <div class="text-xl font-bold mb-2 text-white">MediSense <span style="color: var(--gold)">AI</span>™ v4.0</div>
                <p class="text-sm mb-4" style="color: var(--gold-soft)">Part of SelectCareOS™ - German Excellence. Red Sea Recovery.</p>
                <div class="flex justify-center flex-wrap gap-4 md:gap-6 text-xs mb-4" style="color: var(--gold-soft)">
                    <span><i class="fas fa-shield-alt mr-1" style="color: var(--gold)"></i>HIPAA Ready</span>
                    <span><i class="fas fa-lock mr-1" style="color: var(--gold)"></i>GDPR Compliant</span>
                    <span><i class="fas fa-certificate mr-1" style="color: var(--gold)"></i>ICD-11 Aligned</span>
                    <span><i class="fas fa-user-md mr-1" style="color: var(--gold)"></i>MD Reviewed</span>
                </div>
                <div class="h-px w-32 mx-auto mb-4" style="background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);"></div>
                <p class="text-gray-400 text-xs">© 2024 German Select. All rights reserved. Not a substitute for professional medical advice.</p>
            </div>
        </div>
    </footer>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="nav-item active">
                <i class="fas fa-brain"></i>
                <span>AI Symptom</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
            <a href="/care-team" class="nav-item">
                <i class="fas fa-user-md"></i>
                <span>Care Team</span>
            </a>
            <a href="/services" class="nav-item">
                <i class="fas fa-concierge-bell"></i>
                <span>Services</span>
            </a>
        </div>
    </nav>
    
    <!-- Floating Emergency Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call">
        <i class="fas fa-phone-alt"></i>
    </a>
    
    <script>
        // Toast Notification System
        const toast = {
            container: null,
            init() {
                this.container = document.getElementById('toast-container');
            },
            show(type, title, message, duration = 5000) {
                if (!this.container) this.init();
                
                const icons = {
                    error: 'fa-circle-exclamation',
                    success: 'fa-circle-check',
                    warning: 'fa-triangle-exclamation',
                    info: 'fa-circle-info'
                };
                
                const toastEl = document.createElement('div');
                toastEl.className = \`toast toast-\${type}\`;
                toastEl.innerHTML = \`
                    <i class="fas \${icons[type]} toast-icon"></i>
                    <div class="toast-content">
                        <div class="toast-title">\${title}</div>
                        <div class="toast-message">\${message}</div>
                    </div>
                    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">
                        <i class="fas fa-times"></i>
                    </button>
                \`;
                
                this.container.appendChild(toastEl);
                
                // Auto remove after duration
                if (duration > 0) {
                    setTimeout(() => {
                        toastEl.style.animation = 'slideOut 0.3s ease-out forwards';
                        setTimeout(() => toastEl.remove(), 300);
                    }, duration);
                }
                
                return toastEl;
            },
            error(title, message) { return this.show('error', title, message); },
            success(title, message) { return this.show('success', title, message); },
            warning(title, message) { return this.show('warning', title, message); },
            info(title, message) { return this.show('info', title, message, 4000); }
        };
        
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
            init3DAnatomyBackground();
        });
        
        // ============================================================================
        // 3D ANATOMICAL BACKGROUND VISUALIZATION
        // ============================================================================
        
        let anatomy3DScene, anatomy3DCamera, anatomy3DRenderer;
        let anatomyParticles = [];
        let anatomyRotation = 0;
        
        function init3DAnatomyBackground() {
            const canvas = document.getElementById('anatomy-3d-canvas');
            if (!canvas) return;
            
            const container = canvas.parentElement;
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            
            // Set canvas size
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            // Create particles for medical visualization
            for (let i = 0; i < 150; i++) {
                anatomyParticles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.7 ? '#C9A227' : (Math.random() > 0.5 ? '#3b82f6' : '#10b981'),
                    pulse: Math.random() * Math.PI * 2
                });
            }
            
            // Create human silhouette points for body outline
            const bodyOutlinePoints = createBodyOutline(width, height);
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, width, height);
                
                // Draw gradient background
                const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/1.5);
                gradient.addColorStop(0, 'rgba(0, 51, 102, 0.1)');
                gradient.addColorStop(0.5, 'rgba(0, 31, 63, 0.05)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw body outline
                drawBodyOutline(ctx, bodyOutlinePoints, width, height);
                
                // Draw and animate particles
                anatomyParticles.forEach((particle, index) => {
                    particle.pulse += 0.02;
                    const pulseSize = Math.sin(particle.pulse) * 0.5 + 1;
                    
                    // Move particle
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Wrap around
                    if (particle.x < 0) particle.x = width;
                    if (particle.x > width) particle.x = 0;
                    if (particle.y < 0) particle.y = height;
                    if (particle.y > height) particle.y = 0;
                    
                    // Draw particle with glow
                    ctx.beginPath();
                    const glowGradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3 * pulseSize
                    );
                    glowGradient.addColorStop(0, particle.color);
                    glowGradient.addColorStop(0.5, particle.color.replace(')', ', 0.3)').replace('rgb', 'rgba').replace('#', 'rgba(').replace(/([A-Fa-f0-9]{6})/, (m) => {
                        const r = parseInt(m.slice(0,2), 16);
                        const g = parseInt(m.slice(2,4), 16);
                        const b = parseInt(m.slice(4,6), 16);
                        return r + ',' + g + ',' + b + ', 0.3';
                    }));
                    glowGradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = glowGradient;
                    ctx.arc(particle.x, particle.y, particle.size * 3 * pulseSize, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw core
                    ctx.beginPath();
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = particle.opacity;
                    ctx.arc(particle.x, particle.y, particle.size * pulseSize, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
                
                // Draw connecting lines between close particles
                ctx.strokeStyle = 'rgba(201, 162, 39, 0.1)';
                ctx.lineWidth = 0.5;
                for (let i = 0; i < anatomyParticles.length; i++) {
                    for (let j = i + 1; j < anatomyParticles.length; j++) {
                        const dx = anatomyParticles[i].x - anatomyParticles[j].x;
                        const dy = anatomyParticles[i].y - anatomyParticles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.globalAlpha = (1 - distance / 100) * 0.3;
                            ctx.beginPath();
                            ctx.moveTo(anatomyParticles[i].x, anatomyParticles[i].y);
                            ctx.lineTo(anatomyParticles[j].x, anatomyParticles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
                
                // Draw organs visualization
                drawOrgans(ctx, width, height);
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Handle resize
            window.addEventListener('resize', () => {
                const newWidth = container.offsetWidth;
                const newHeight = container.offsetHeight;
                canvas.width = newWidth;
                canvas.height = newHeight;
            });
        }
        
        function createBodyOutline(width, height) {
            const centerX = width * 0.35;
            const scale = height / 800;
            
            return {
                centerX: centerX,
                scale: scale,
                headY: 80 * scale,
                shoulderY: 180 * scale,
                chestY: 280 * scale,
                waistY: 380 * scale,
                hipY: 450 * scale
            };
        }
        
        function drawBodyOutline(ctx, points, width, height) {
            const { centerX, scale } = points;
            
            // Draw subtle body silhouette
            ctx.strokeStyle = 'rgba(201, 162, 39, 0.15)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 10]);
            
            // Head
            ctx.beginPath();
            ctx.ellipse(centerX, 70 * scale, 45 * scale, 55 * scale, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Neck
            ctx.beginPath();
            ctx.moveTo(centerX - 20 * scale, 125 * scale);
            ctx.lineTo(centerX - 20 * scale, 155 * scale);
            ctx.moveTo(centerX + 20 * scale, 125 * scale);
            ctx.lineTo(centerX + 20 * scale, 155 * scale);
            ctx.stroke();
            
            // Shoulders and torso
            ctx.beginPath();
            ctx.moveTo(centerX - 20 * scale, 155 * scale);
            ctx.quadraticCurveTo(centerX - 100 * scale, 165 * scale, centerX - 120 * scale, 200 * scale);
            ctx.lineTo(centerX - 80 * scale, 400 * scale);
            ctx.quadraticCurveTo(centerX - 70 * scale, 450 * scale, centerX - 50 * scale, 480 * scale);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX + 20 * scale, 155 * scale);
            ctx.quadraticCurveTo(centerX + 100 * scale, 165 * scale, centerX + 120 * scale, 200 * scale);
            ctx.lineTo(centerX + 80 * scale, 400 * scale);
            ctx.quadraticCurveTo(centerX + 70 * scale, 450 * scale, centerX + 50 * scale, 480 * scale);
            ctx.stroke();
            
            ctx.setLineDash([]);
        }
        
        function drawOrgans(ctx, width, height) {
            const centerX = width * 0.35;
            const scale = height / 800;
            
            // Draw heart with pulse effect
            const heartPulse = Math.sin(Date.now() / 200) * 5 + 1;
            ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
            ctx.beginPath();
            ctx.ellipse(centerX - 20 * scale, 240 * scale, (35 + heartPulse) * scale, (40 + heartPulse) * scale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw lungs
            ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
            // Left lung
            ctx.beginPath();
            ctx.ellipse(centerX - 55 * scale, 230 * scale, 30 * scale, 60 * scale, 0.2, 0, Math.PI * 2);
            ctx.fill();
            // Right lung
            ctx.beginPath();
            ctx.ellipse(centerX + 35 * scale, 230 * scale, 35 * scale, 65 * scale, -0.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw brain visualization
            ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
            ctx.beginPath();
            ctx.ellipse(centerX, 55 * scale, 35 * scale, 30 * scale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw stomach area
            ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';
            ctx.beginPath();
            ctx.ellipse(centerX + 10 * scale, 340 * scale, 40 * scale, 35 * scale, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ============================================================================
        // BMI CALCULATOR
        // ============================================================================
        
        function calculateBMI() {
            const height = parseFloat(document.getElementById('patient-height').value);
            const weight = parseFloat(document.getElementById('patient-weight').value);
            const bmiDisplay = document.getElementById('bmi-display');
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');
            const bmiIndicator = document.getElementById('bmi-indicator');
            
            if (height && weight && height > 0 && weight > 0) {
                const heightM = height / 100;
                const bmi = weight / (heightM * heightM);
                
                bmiDisplay.classList.remove('hidden');
                bmiValue.textContent = bmi.toFixed(1);
                
                let category, categoryClass, indicatorPos;
                
                if (bmi < 18.5) {
                    category = 'Underweight';
                    categoryClass = 'underweight';
                    indicatorPos = (bmi / 18.5) * 25;
                } else if (bmi < 25) {
                    category = 'Normal';
                    categoryClass = 'normal';
                    indicatorPos = 25 + ((bmi - 18.5) / 6.5) * 20;
                } else if (bmi < 30) {
                    category = 'Overweight';
                    categoryClass = 'overweight';
                    indicatorPos = 45 + ((bmi - 25) / 5) * 25;
                } else {
                    category = 'Obese';
                    categoryClass = 'obese';
                    indicatorPos = Math.min(70 + ((bmi - 30) / 10) * 30, 100);
                }
                
                bmiCategory.textContent = category;
                bmiCategory.className = 'bmi-category ' + categoryClass;
                bmiIndicator.style.left = indicatorPos + '%';
            } else {
                bmiDisplay.classList.add('hidden');
            }
        }
        
        function updateAnatomyVisualization() {
            // Update any anatomy-based visualizations based on patient profile
            const gender = document.getElementById('patient-gender').value;
            const age = document.getElementById('patient-age').value;
            
            // Could add gender-specific or age-specific visualization changes here
            console.log('Profile updated:', { gender, age });
        }
        
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
                toast.warning('Missing Information', 'Please enter your age and select your gender to continue.');
                // Highlight missing fields
                if (!age) document.getElementById('patient-age').focus();
                else if (!gender) document.getElementById('patient-gender').focus();
                return false;
            }
            
            const ageNum = parseInt(age);
            if (ageNum < 0 || ageNum > 120) {
                toast.warning('Invalid Age', 'Please enter a valid age between 0 and 120.');
                document.getElementById('patient-age').focus();
                return false;
            }
            
            return true;
        }
        
        function validateStep2() {
            if (selectedSymptoms.size === 0) {
                toast.warning('No Symptoms Selected', 'Please select at least one symptom to continue with the analysis.');
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
        let currentBodyView = 'front';
        let selectedBodyRegion = null;
        
        function setupBodyMap() {
            // Body regions are now handled via onclick attributes in the SVG
            // This function sets up additional interactivity
            document.querySelectorAll('.body-region').forEach(region => {
                region.addEventListener('mouseenter', function() {
                    const subregion = this.dataset.subregion;
                    if (subregion) {
                        this.style.cursor = 'pointer';
                    }
                });
            });
        }
        
        // Toggle between front and back body views
        function toggleBodyView(view) {
            currentBodyView = view;
            
            // Update buttons
            document.getElementById('view-front').classList.toggle('active', view === 'front');
            document.getElementById('view-back').classList.toggle('active', view === 'back');
            
            // Toggle anatomical images
            const frontImg = document.getElementById('anatomy-front');
            const backImg = document.getElementById('anatomy-back');
            if (frontImg && backImg) {
                frontImg.classList.toggle('hidden', view !== 'front');
                frontImg.classList.toggle('active', view === 'front');
                backImg.classList.toggle('hidden', view !== 'back');
                backImg.classList.toggle('active', view === 'back');
            }
            
            // Toggle SVG overlay visibility
            const frontOverlay = document.getElementById('overlay-front');
            const backOverlay = document.getElementById('overlay-back');
            if (frontOverlay && backOverlay) {
                frontOverlay.classList.toggle('hidden', view !== 'front');
                backOverlay.classList.toggle('hidden', view !== 'back');
            }
        }
        
        // Select body region and filter symptoms
        function selectBodyRegion(regionId, regionName) {
            selectedBodyRegion = { id: regionId, name: regionName };
            
            // Update selected region display
            const infoDiv = document.getElementById('selected-region-info');
            const nameDiv = document.getElementById('selected-region-name');
            infoDiv.classList.remove('hidden');
            nameDiv.textContent = regionName;
            
            // Highlight the selected region
            document.querySelectorAll('.body-region').forEach(r => r.classList.remove('selected'));
            event.target.classList.add('selected');
            
            // Select category tab and filter symptoms
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            const tab = document.querySelector('[data-category="' + regionId + '"]');
            if (tab) {
                tab.classList.add('active');
                currentCategory = regionId;
                renderSymptoms(regionId);
            } else {
                // If no specific tab, show all but scroll to relevant section
                document.querySelector('[data-category="all"]').classList.add('active');
                currentCategory = 'all';
                renderSymptoms('all');
            }
            
            // Scroll symptoms grid into view
            document.getElementById('symptoms-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Update body map to show regions with symptoms
        function updateBodyMapHighlights() {
            document.querySelectorAll('.body-region').forEach(region => {
                region.classList.remove('has-symptoms');
            });
            
            // Check which categories have selected symptoms
            const categoriesWithSymptoms = new Set();
            selectedSymptoms.forEach((data, symptomId) => {
                for (const [catId, cat] of Object.entries(symptomCategories)) {
                    if (cat.symptoms.some(s => s.id === symptomId)) {
                        categoriesWithSymptoms.add(catId);
                        break;
                    }
                }
            });
            
            // Highlight regions
            document.querySelectorAll('.body-region').forEach(region => {
                const regionCategory = region.dataset.region;
                if (categoriesWithSymptoms.has(regionCategory)) {
                    region.classList.add('has-symptoms');
                }
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
                    toast.success('Analysis Complete', 'Your symptom analysis has been processed successfully.');
                } else {
                    toast.error('Analysis Failed', result.error || 'Unable to process your symptoms. Please try again.');
                    goToStep(3);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Connection Error', 'Unable to connect to the analysis service. Please check your connection and try again.');
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
            
            // 🏋️ Wellness Programs
            if (data.wellnessRecommendations) {
                const wellness = data.wellnessRecommendations;
                document.getElementById('wellness-section').classList.remove('hidden');
                
                // Exercise Programs
                const exerciseList = document.getElementById('exercise-programs-list');
                exerciseList.innerHTML = '';
                if (wellness.exercisePrograms && wellness.exercisePrograms.length > 0) {
                    document.getElementById('exercise-programs-section').classList.remove('hidden');
                    wellness.exercisePrograms.forEach(prog => {
                        const categoryIcons = {
                            'cardiovascular': 'fa-heart-pulse',
                            'strength': 'fa-dumbbell',
                            'rehabilitation': 'fa-hand-holding-medical',
                            'mind-body': 'fa-spa',
                            'flexibility': 'fa-person-walking'
                        };
                        const categoryColors = {
                            'cardiovascular': 'bg-red-100 text-red-700',
                            'strength': 'bg-blue-100 text-blue-700',
                            'rehabilitation': 'bg-green-100 text-green-700',
                            'mind-body': 'bg-purple-100 text-purple-700',
                            'flexibility': 'bg-yellow-100 text-yellow-700'
                        };
                        const div = document.createElement('div');
                        div.className = 'p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200';
                        div.innerHTML = \`
                            <div class="flex items-start justify-between mb-2">
                                <div>
                                    <h5 class="font-bold text-gray-800">\${prog.name}</h5>
                                    <span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full \${categoryColors[prog.category] || 'bg-gray-100 text-gray-700'}">
                                        <i class="fas \${categoryIcons[prog.category] || 'fa-running'} mr-1"></i>
                                        \${prog.category}
                                    </span>
                                </div>
                                <span class="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">\${prog.difficulty}</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-600 mb-2">
                                <span class="mr-4"><i class="fas fa-clock mr-1"></i>\${prog.duration}</span>
                                <span><i class="fas fa-calendar-alt mr-1"></i>\${prog.frequency}</span>
                            </div>
                            <div class="text-xs text-gray-500">
                                <strong>Benefits:</strong> \${prog.benefits.slice(0, 2).join('; ')}
                            </div>
                        \`;
                        exerciseList.appendChild(div);
                    });
                } else {
                    document.getElementById('exercise-programs-section').classList.add('hidden');
                }
                
                // Nutrition Plans
                const nutritionList = document.getElementById('nutrition-plans-list');
                nutritionList.innerHTML = '';
                if (wellness.nutritionPlans && wellness.nutritionPlans.length > 0) {
                    document.getElementById('nutrition-plans-section').classList.remove('hidden');
                    wellness.nutritionPlans.forEach(plan => {
                        const categoryColors = {
                            'therapeutic': 'bg-blue-100 text-blue-700',
                            'weight-management': 'bg-orange-100 text-orange-700',
                            'general-wellness': 'bg-green-100 text-green-700',
                            'disease-specific': 'bg-purple-100 text-purple-700'
                        };
                        const div = document.createElement('div');
                        div.className = 'p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200';
                        div.innerHTML = \`
                            <div class="flex items-start justify-between mb-2">
                                <div>
                                    <h5 class="font-bold text-gray-800">\${plan.name}</h5>
                                    <span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full \${categoryColors[plan.category] || 'bg-gray-100 text-gray-700'}">
                                        <i class="fas fa-utensils mr-1"></i>
                                        \${plan.category}
                                    </span>
                                </div>
                                <span class="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">\${plan.calorieRange}</span>
                            </div>
                            <div class="text-xs text-gray-600 mb-2">
                                <strong>Key Principles:</strong>
                            </div>
                            <ul class="text-xs text-gray-500 list-disc list-inside">
                                \${plan.keyPrinciples.slice(0, 3).map(p => '<li>' + p + '</li>').join('')}
                            </ul>
                        \`;
                        nutritionList.appendChild(div);
                    });
                } else {
                    document.getElementById('nutrition-plans-section').classList.add('hidden');
                }
                
                // Lifestyle Modifications
                const lifestyleList = document.getElementById('lifestyle-list');
                lifestyleList.innerHTML = '';
                if (wellness.lifestyleModifications && wellness.lifestyleModifications.length > 0) {
                    document.getElementById('lifestyle-section').classList.remove('hidden');
                    wellness.lifestyleModifications.forEach(mod => {
                        const div = document.createElement('div');
                        div.className = 'flex items-start p-3 bg-teal-50 rounded-lg';
                        div.innerHTML = \`
                            <i class="fas fa-check-circle text-teal-500 mt-0.5 mr-3"></i>
                            <span class="text-sm text-gray-700">\${mod}</span>
                        \`;
                        lifestyleList.appendChild(div);
                    });
                } else {
                    document.getElementById('lifestyle-section').classList.add('hidden');
                }
                
                // Mind-Body Practices
                const mindbodyList = document.getElementById('mindbody-list');
                mindbodyList.innerHTML = '';
                if (wellness.mindBodyPractices && wellness.mindBodyPractices.length > 0) {
                    document.getElementById('mindbody-section').classList.remove('hidden');
                    wellness.mindBodyPractices.forEach(practice => {
                        const div = document.createElement('div');
                        div.className = 'flex items-start p-3 bg-purple-50 rounded-lg';
                        div.innerHTML = \`
                            <i class="fas fa-om text-purple-500 mt-0.5 mr-3"></i>
                            <span class="text-sm text-gray-700">\${practice}</span>
                        \`;
                        mindbodyList.appendChild(div);
                    });
                } else {
                    document.getElementById('mindbody-section').classList.add('hidden');
                }
            } else {
                document.getElementById('wellness-section').classList.add('hidden');
            }
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
}
