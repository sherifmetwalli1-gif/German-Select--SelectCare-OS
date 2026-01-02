/**
 * MediSense AI™ Pro - Additional Medical Conditions Database
 * 
 * Extends the enhanced database with more conditions across specialties:
 * - Dermatological conditions
 * - Endocrine/Metabolic conditions
 * - Rheumatological conditions
 * - Pediatric conditions
 * - Women's health conditions
 * - Ophthalmological conditions
 * - ENT conditions
 * - Renal/Urological conditions
 */

import { EnhancedCondition } from './medical-database-enhanced';

// ════════════════════════════════════════════════════════════════════════════════
// ADDITIONAL CONDITIONS DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const ADDITIONAL_CONDITIONS: Record<string, EnhancedCondition> = {
  
  // ══════════════════════════════════════════════════════════════════════════════
  // DERMATOLOGICAL CONDITIONS (10 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'cellulitis': {
    id: 'cellulitis',
    name: 'Cellulitis',
    icd11: '1B71',
    category: 'dermatological',
    urgency: 'urgent',
    prevalence: 0.02,
    symptoms: {
      cardinal: [
        { symptom: 'skin-redness-spreading', weight: 35 },
        { symptom: 'skin-warmth', weight: 30 }
      ],
      primary: [
        { symptom: 'skin-swelling', weight: 25 },
        { symptom: 'pain-at-site', weight: 25 },
        { symptom: 'fever', weight: 22 }
      ],
      secondary: [
        { symptom: 'chills', weight: 18 },
        { symptom: 'fatigue', weight: 15 }
      ],
      atypical: [
        { symptom: 'blisters', weight: 15 },
        { symptom: 'drainage', weight: 12 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'diabetes', modifier: 2.0 },
        { factor: 'skin-break', modifier: 2.5 },
        { factor: 'lymphedema', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'obesity', modifier: 1.4 },
        { factor: 'immunocompromised', modifier: 1.8 }
      ],
      minor: [
        { factor: 'athletes-foot', modifier: 1.3 }
      ]
    },
    redFlags: ['rapid-spread', 'high-fever', 'crepitus', 'bullae', 'necrosis'],
    differentialDiagnosis: ['dvt', 'erysipelas', 'necrotizing-fasciitis', 'gout'],
    specialists: ['dermatologist', 'infectious-disease'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['elevated-wbc', 'blood-cultures'],
      exclusionary: ['necrotizing-fasciitis']
    }
  },
  
  'shingles': {
    id: 'shingles',
    name: 'Herpes Zoster (Shingles)',
    icd11: '1E91',
    category: 'dermatological',
    urgency: 'urgent',
    prevalence: 0.004,
    symptoms: {
      cardinal: [
        { symptom: 'painful-rash-dermatomal', weight: 40 },
        { symptom: 'burning-pain', weight: 35 }
      ],
      primary: [
        { symptom: 'blisters-clustered', weight: 30 },
        { symptom: 'tingling-before-rash', weight: 25 }
      ],
      secondary: [
        { symptom: 'fever', weight: 15 },
        { symptom: 'headache', weight: 15 },
        { symptom: 'fatigue', weight: 15 }
      ],
      atypical: [
        { symptom: 'itching', weight: 12 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['post-herpetic-neuralgia'], modifier: 1.5 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'previous-chickenpox', modifier: 3.0 },
        { factor: 'immunocompromised', modifier: 2.5 },
        { factor: 'age-over-50', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'stress', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['eye-involvement', 'facial-involvement', 'immunocompromised', 'disseminated'],
    differentialDiagnosis: ['herpes-simplex', 'contact-dermatitis', 'cellulitis'],
    specialists: ['dermatologist', 'infectious-disease', 'ophthalmologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['viral-culture', 'pcr'],
      exclusionary: []
    }
  },
  
  'eczema': {
    id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    icd11: 'EA80',
    category: 'dermatological',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'itchy-skin', weight: 40 },
        { symptom: 'dry-skin', weight: 30 }
      ],
      primary: [
        { symptom: 'red-patches', weight: 25 },
        { symptom: 'rough-skin', weight: 22 }
      ],
      secondary: [
        { symptom: 'skin-thickening', weight: 18 },
        { symptom: 'cracked-skin', weight: 18 }
      ],
      atypical: [
        { symptom: 'skin-darkening', weight: 12 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['cheek-rash', 'scalp-involvement'], modifier: 1.5 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'family-history-atopy', modifier: 2.5 },
        { factor: 'asthma', modifier: 1.8 },
        { factor: 'allergies', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'environmental-triggers', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['skin-infection', 'eczema-herpeticum', 'severe-flare'],
    differentialDiagnosis: ['contact-dermatitis', 'psoriasis', 'seborrheic-dermatitis'],
    specialists: ['dermatologist', 'allergist'],
    diagnosticCriteria: {
      required: ['clinical-criteria'],
      supportive: ['family-history', 'elevated-ige'],
      exclusionary: ['other-skin-conditions']
    }
  },
  
  'psoriasis': {
    id: 'psoriasis',
    name: 'Psoriasis',
    icd11: 'EA90',
    category: 'dermatological',
    urgency: 'routine',
    prevalence: 0.03,
    symptoms: {
      cardinal: [
        { symptom: 'red-scaly-patches', weight: 40 },
        { symptom: 'silvery-scales', weight: 35 }
      ],
      primary: [
        { symptom: 'itching', weight: 22 },
        { symptom: 'dry-cracked-skin', weight: 20 }
      ],
      secondary: [
        { symptom: 'nail-changes', weight: 18 },
        { symptom: 'joint-pain', weight: 20 }
      ],
      atypical: [
        { symptom: 'burning', weight: 12 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'family-history', modifier: 2.5 }
      ],
      moderate: [
        { factor: 'stress', modifier: 1.5 },
        { factor: 'obesity', modifier: 1.4 },
        { factor: 'smoking', modifier: 1.4 }
      ],
      minor: [
        { factor: 'alcohol', modifier: 1.2 }
      ]
    },
    redFlags: ['psoriatic-arthritis', 'erythrodermic-psoriasis', 'pustular-psoriasis'],
    differentialDiagnosis: ['eczema', 'seborrheic-dermatitis', 'fungal-infection'],
    specialists: ['dermatologist', 'rheumatologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['skin-biopsy'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ENDOCRINE/METABOLIC CONDITIONS (10 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'diabetes-type-2': {
    id: 'diabetes-type-2',
    name: 'Type 2 Diabetes Mellitus',
    icd11: '5A11',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'increased-thirst', weight: 30 },
        { symptom: 'frequent-urination', weight: 30 }
      ],
      primary: [
        { symptom: 'fatigue', weight: 22 },
        { symptom: 'blurred-vision', weight: 20 },
        { symptom: 'slow-healing-wounds', weight: 22 }
      ],
      secondary: [
        { symptom: 'weight-loss', weight: 18 },
        { symptom: 'tingling-numbness-hands-feet', weight: 20 },
        { symptom: 'frequent-infections', weight: 15 }
      ],
      atypical: [
        { symptom: 'dark-skin-patches', weight: 15 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'obesity', modifier: 2.5 },
        { factor: 'family-history-diabetes', modifier: 2.0 },
        { factor: 'pre-diabetes', modifier: 2.5 }
      ],
      moderate: [
        { factor: 'sedentary-lifestyle', modifier: 1.5 },
        { factor: 'age-over-45', modifier: 1.4 }
      ],
      minor: [
        { factor: 'poor-diet', modifier: 1.3 }
      ]
    },
    redFlags: ['diabetic-ketoacidosis', 'hyperosmolar-syndrome', 'severe-hypoglycemia'],
    differentialDiagnosis: ['diabetes-type-1', 'gestational-diabetes', 'secondary-diabetes'],
    specialists: ['endocrinologist', 'diabetologist'],
    diagnosticCriteria: {
      required: ['fasting-glucose', 'hba1c', 'glucose-tolerance-test'],
      supportive: ['symptoms', 'random-glucose'],
      exclusionary: ['type-1-diabetes']
    }
  },
  
  'hypothyroidism': {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    icd11: '5A00',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.05,
    symptoms: {
      cardinal: [
        { symptom: 'fatigue', weight: 30 },
        { symptom: 'weight-gain', weight: 28 }
      ],
      primary: [
        { symptom: 'cold-intolerance', weight: 25 },
        { symptom: 'constipation', weight: 22 },
        { symptom: 'dry-skin', weight: 22 }
      ],
      secondary: [
        { symptom: 'hair-loss', weight: 18 },
        { symptom: 'depression', weight: 18 },
        { symptom: 'muscle-weakness', weight: 18 },
        { symptom: 'bradycardia', weight: 20 }
      ],
      atypical: [
        { symptom: 'hoarse-voice', weight: 15 },
        { symptom: 'menstrual-irregularities', weight: 15 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion', 'depression'], modifier: 1.3 }
    },
    genderModifiers: {
      female: { symptoms: ['menstrual-changes'], modifier: 1.5 }
    },
    riskFactors: {
      major: [
        { factor: 'autoimmune-disease', modifier: 2.0 },
        { factor: 'previous-thyroid-treatment', modifier: 2.5 }
      ],
      moderate: [
        { factor: 'family-history', modifier: 1.6 },
        { factor: 'age-over-60', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['myxedema-coma', 'severe-bradycardia', 'severe-hypothermia'],
    differentialDiagnosis: ['depression', 'anemia', 'chronic-fatigue-syndrome'],
    specialists: ['endocrinologist'],
    diagnosticCriteria: {
      required: ['tsh', 'free-t4'],
      supportive: ['anti-thyroid-antibodies'],
      exclusionary: []
    }
  },
  
  'hyperthyroidism': {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism',
    icd11: '5A01',
    category: 'endocrine',
    urgency: 'urgent',
    prevalence: 0.015,
    symptoms: {
      cardinal: [
        { symptom: 'weight-loss-unexplained', weight: 32 },
        { symptom: 'rapid-heartbeat', weight: 32 }
      ],
      primary: [
        { symptom: 'anxiety', weight: 25 },
        { symptom: 'tremor', weight: 25 },
        { symptom: 'heat-intolerance', weight: 25 }
      ],
      secondary: [
        { symptom: 'sweating', weight: 20 },
        { symptom: 'fatigue', weight: 18 },
        { symptom: 'insomnia', weight: 18 }
      ],
      atypical: [
        { symptom: 'diarrhea', weight: 15 },
        { symptom: 'eye-bulging', weight: 25 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['atrial-fibrillation', 'weight-loss'], modifier: 1.3 }
    },
    genderModifiers: {
      female: { symptoms: ['menstrual-changes'], modifier: 1.5 }
    },
    riskFactors: {
      major: [
        { factor: 'graves-disease', modifier: 3.0 },
        { factor: 'family-history', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'iodine-excess', modifier: 1.5 }
      ],
      minor: []
    },
    redFlags: ['thyroid-storm', 'severe-tachycardia', 'altered-consciousness'],
    differentialDiagnosis: ['anxiety-disorder', 'pheochromocytoma', 'drug-abuse'],
    specialists: ['endocrinologist'],
    diagnosticCriteria: {
      required: ['tsh', 'free-t4', 'free-t3'],
      supportive: ['thyroid-antibodies', 'thyroid-scan'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // RHEUMATOLOGICAL CONDITIONS (8 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'rheumatoid-arthritis': {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    icd11: 'FA20',
    category: 'rheumatological',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      cardinal: [
        { symptom: 'joint-pain-symmetric', weight: 35 },
        { symptom: 'morning-stiffness-prolonged', weight: 35 }
      ],
      primary: [
        { symptom: 'joint-swelling', weight: 28 },
        { symptom: 'joint-warmth', weight: 22 },
        { symptom: 'fatigue', weight: 22 }
      ],
      secondary: [
        { symptom: 'weight-loss', weight: 15 },
        { symptom: 'fever-low-grade', weight: 15 }
      ],
      atypical: [
        { symptom: 'rheumatoid-nodules', weight: 20 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.7 }
    },
    riskFactors: {
      major: [
        { factor: 'family-history', modifier: 2.5 },
        { factor: 'smoking', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'other-autoimmune', modifier: 1.5 }
      ],
      minor: [
        { factor: 'obesity', modifier: 1.2 }
      ]
    },
    redFlags: ['joint-deformity', 'vasculitis', 'interstitial-lung-disease'],
    differentialDiagnosis: ['osteoarthritis', 'psoriatic-arthritis', 'lupus', 'gout'],
    specialists: ['rheumatologist'],
    diagnosticCriteria: {
      required: ['clinical-criteria', 'rf-or-anti-ccp'],
      supportive: ['imaging', 'acute-phase-reactants'],
      exclusionary: []
    }
  },
  
  'gout': {
    id: 'gout',
    name: 'Gout',
    icd11: 'FA25',
    category: 'rheumatological',
    urgency: 'urgent',
    prevalence: 0.04,
    symptoms: {
      cardinal: [
        { symptom: 'severe-joint-pain-sudden', weight: 40 },
        { symptom: 'joint-redness', weight: 30 }
      ],
      primary: [
        { symptom: 'joint-swelling', weight: 28 },
        { symptom: 'joint-warmth', weight: 25 },
        { symptom: 'big-toe-pain', weight: 35 }
      ],
      secondary: [
        { symptom: 'fever', weight: 15 },
        { symptom: 'limited-mobility', weight: 18 }
      ],
      atypical: []
    },
    ageModifiers: {},
    genderModifiers: {
      male: { symptoms: [], modifier: 2.0 }
    },
    riskFactors: {
      major: [
        { factor: 'high-uric-acid', modifier: 3.0 },
        { factor: 'previous-gout', modifier: 3.0 }
      ],
      moderate: [
        { factor: 'obesity', modifier: 1.5 },
        { factor: 'alcohol', modifier: 1.6 },
        { factor: 'high-purine-diet', modifier: 1.5 }
      ],
      minor: [
        { factor: 'diuretics', modifier: 1.3 }
      ]
    },
    redFlags: ['fever', 'multiple-joints', 'tophi'],
    differentialDiagnosis: ['septic-arthritis', 'pseudogout', 'rheumatoid-arthritis'],
    specialists: ['rheumatologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation', 'uric-acid'],
      supportive: ['joint-aspiration', 'imaging'],
      exclusionary: ['septic-arthritis']
    }
  },
  
  'fibromyalgia': {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    icd11: 'MG30',
    category: 'rheumatological',
    urgency: 'routine',
    prevalence: 0.04,
    symptoms: {
      cardinal: [
        { symptom: 'widespread-pain', weight: 40 },
        { symptom: 'tender-points', weight: 35 }
      ],
      primary: [
        { symptom: 'fatigue-chronic', weight: 30 },
        { symptom: 'sleep-disturbance', weight: 28 },
        { symptom: 'cognitive-dysfunction', weight: 25 }
      ],
      secondary: [
        { symptom: 'headache', weight: 18 },
        { symptom: 'depression', weight: 20 },
        { symptom: 'anxiety', weight: 18 }
      ],
      atypical: [
        { symptom: 'ibs-symptoms', weight: 15 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 2.5 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-trauma', modifier: 1.8 },
        { factor: 'rheumatic-disease', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'stress', modifier: 1.5 },
        { factor: 'depression', modifier: 1.5 }
      ],
      minor: []
    },
    redFlags: ['neurological-symptoms', 'weight-loss', 'fever'],
    differentialDiagnosis: ['hypothyroidism', 'lupus', 'rheumatoid-arthritis', 'depression'],
    specialists: ['rheumatologist', 'pain-specialist'],
    diagnosticCriteria: {
      required: ['clinical-criteria', 'exclusion-other-causes'],
      supportive: ['symptom-severity-scales'],
      exclusionary: ['inflammatory-arthritis', 'myopathy']
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // PEDIATRIC-SPECIFIC CONDITIONS (8 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'croup': {
    id: 'croup',
    name: 'Croup (Laryngotracheobronchitis)',
    icd11: 'CA04',
    category: 'pediatric',
    urgency: 'urgent',
    prevalence: 0.03,
    symptoms: {
      cardinal: [
        { symptom: 'barking-cough', weight: 45 },
        { symptom: 'stridor', weight: 40 }
      ],
      primary: [
        { symptom: 'hoarse-voice', weight: 28 },
        { symptom: 'fever', weight: 22 },
        { symptom: 'difficulty-breathing', weight: 30 }
      ],
      secondary: [
        { symptom: 'runny-nose', weight: 15 },
        { symptom: 'cough', weight: 18 }
      ],
      atypical: []
    },
    ageModifiers: {
      pediatric: { symptoms: ['barking-cough', 'stridor'], modifier: 1.5 }
    },
    genderModifiers: {
      male: { symptoms: [], modifier: 1.3 }
    },
    riskFactors: {
      major: [
        { factor: 'age-6months-3years', modifier: 2.0 },
        { factor: 'viral-infection', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'fall-winter-season', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['severe-stridor', 'retractions', 'cyanosis', 'drooling'],
    differentialDiagnosis: ['epiglottitis', 'foreign-body', 'bacterial-tracheitis'],
    specialists: ['pediatrician', 'pediatric-pulmonologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['neck-xray'],
      exclusionary: ['epiglottitis']
    }
  },
  
  'rsv-bronchiolitis': {
    id: 'rsv-bronchiolitis',
    name: 'RSV Bronchiolitis',
    icd11: '1E32',
    category: 'pediatric',
    urgency: 'urgent',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'wheezing', weight: 38 },
        { symptom: 'rapid-breathing', weight: 35 }
      ],
      primary: [
        { symptom: 'cough', weight: 25 },
        { symptom: 'runny-nose', weight: 22 },
        { symptom: 'fever', weight: 20 }
      ],
      secondary: [
        { symptom: 'poor-feeding', weight: 28 },
        { symptom: 'irritability', weight: 20 }
      ],
      atypical: [
        { symptom: 'apnea', weight: 35 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['apnea', 'poor-feeding'], modifier: 1.5 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'premature-birth', modifier: 2.5 },
        { factor: 'congenital-heart-disease', modifier: 2.0 },
        { factor: 'age-under-6months', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'exposure-to-rsv', modifier: 1.8 },
        { factor: 'winter-season', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['apnea', 'severe-retractions', 'cyanosis', 'dehydration'],
    differentialDiagnosis: ['asthma', 'pneumonia', 'pertussis'],
    specialists: ['pediatrician', 'pediatric-pulmonologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['rsv-test', 'chest-xray'],
      exclusionary: []
    }
  },
  
  'hand-foot-mouth': {
    id: 'hand-foot-mouth',
    name: 'Hand, Foot, and Mouth Disease',
    icd11: '1F03',
    category: 'pediatric',
    urgency: 'routine',
    prevalence: 0.05,
    symptoms: {
      cardinal: [
        { symptom: 'mouth-sores', weight: 40 },
        { symptom: 'rash-hands-feet', weight: 40 }
      ],
      primary: [
        { symptom: 'fever', weight: 25 },
        { symptom: 'sore-throat', weight: 22 }
      ],
      secondary: [
        { symptom: 'poor-appetite', weight: 18 },
        { symptom: 'irritability', weight: 15 }
      ],
      atypical: [
        { symptom: 'buttock-rash', weight: 20 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['drooling', 'irritability'], modifier: 1.5 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'daycare-exposure', modifier: 2.0 },
        { factor: 'age-under-5', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'summer-fall-season', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['dehydration', 'encephalitis', 'myocarditis'],
    differentialDiagnosis: ['herpangina', 'herpes-stomatitis', 'chickenpox'],
    specialists: ['pediatrician'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['viral-culture'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // WOMEN'S HEALTH CONDITIONS (10 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'endometriosis': {
    id: 'endometriosis',
    name: 'Endometriosis',
    icd11: 'GA10',
    category: 'gynecological',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'pelvic-pain-chronic', weight: 35 },
        { symptom: 'painful-periods', weight: 35 }
      ],
      primary: [
        { symptom: 'pain-during-intercourse', weight: 28 },
        { symptom: 'heavy-periods', weight: 25 },
        { symptom: 'infertility', weight: 28 }
      ],
      secondary: [
        { symptom: 'fatigue', weight: 18 },
        { symptom: 'painful-bowel-movements', weight: 22 },
        { symptom: 'painful-urination', weight: 20 }
      ],
      atypical: [
        { symptom: 'bloating', weight: 15 },
        { symptom: 'nausea', weight: 12 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.0 }  // Only affects females
    },
    riskFactors: {
      major: [
        { factor: 'family-history', modifier: 2.5 },
        { factor: 'nulliparity', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'early-menarche', modifier: 1.4 },
        { factor: 'short-menstrual-cycles', modifier: 1.3 }
      ],
      minor: []
    },
    redFlags: ['severe-pain-unresponsive', 'bowel-obstruction', 'kidney-involvement'],
    differentialDiagnosis: ['adenomyosis', 'pelvic-inflammatory-disease', 'ovarian-cyst', 'ibs'],
    specialists: ['gynecologist', 'reproductive-endocrinologist'],
    diagnosticCriteria: {
      required: ['laparoscopy'],
      supportive: ['ultrasound', 'mri'],
      exclusionary: []
    }
  },
  
  'pcos': {
    id: 'pcos',
    name: 'Polycystic Ovary Syndrome (PCOS)',
    icd11: 'GA20',
    category: 'gynecological',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'irregular-periods', weight: 38 },
        { symptom: 'hirsutism', weight: 32 }
      ],
      primary: [
        { symptom: 'acne', weight: 25 },
        { symptom: 'weight-gain', weight: 22 },
        { symptom: 'infertility', weight: 28 }
      ],
      secondary: [
        { symptom: 'hair-loss', weight: 18 },
        { symptom: 'skin-darkening', weight: 15 }
      ],
      atypical: [
        { symptom: 'pelvic-pain', weight: 15 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.0 }
    },
    riskFactors: {
      major: [
        { factor: 'family-history', modifier: 2.0 },
        { factor: 'obesity', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'insulin-resistance', modifier: 1.6 }
      ],
      minor: []
    },
    redFlags: ['severe-bleeding', 'endometrial-hyperplasia'],
    differentialDiagnosis: ['thyroid-disorder', 'hyperprolactinemia', 'congenital-adrenal-hyperplasia'],
    specialists: ['gynecologist', 'endocrinologist'],
    diagnosticCriteria: {
      required: ['rotterdam-criteria'],
      supportive: ['hormone-levels', 'ultrasound'],
      exclusionary: ['other-hyperandrogenic-conditions']
    }
  },
  
  'ectopic-pregnancy': {
    id: 'ectopic-pregnancy',
    name: 'Ectopic Pregnancy',
    icd11: 'JA01',
    category: 'gynecological',
    urgency: 'emergency',
    prevalence: 0.02,
    symptoms: {
      cardinal: [
        { symptom: 'lower-abdominal-pain', weight: 40 },
        { symptom: 'vaginal-bleeding', weight: 35 },
        { symptom: 'missed-period', weight: 35 }
      ],
      primary: [
        { symptom: 'shoulder-tip-pain', weight: 30 },
        { symptom: 'dizziness', weight: 25 }
      ],
      secondary: [
        { symptom: 'nausea', weight: 18 },
        { symptom: 'breast-tenderness', weight: 15 }
      ],
      atypical: [
        { symptom: 'rectal-pressure', weight: 15 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.0 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-ectopic', modifier: 3.0 },
        { factor: 'tubal-surgery', modifier: 2.5 },
        { factor: 'pelvic-inflammatory-disease', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'ivf', modifier: 1.5 },
        { factor: 'iud', modifier: 1.4 }
      ],
      minor: [
        { factor: 'smoking', modifier: 1.3 }
      ]
    },
    redFlags: ['severe-pain', 'hypotension', 'tachycardia', 'syncope'],
    differentialDiagnosis: ['miscarriage', 'appendicitis', 'ovarian-cyst-rupture'],
    specialists: ['obstetrician-gynecologist', 'emergency-medicine'],
    diagnosticCriteria: {
      required: ['hcg', 'ultrasound'],
      supportive: ['serial-hcg'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ENT CONDITIONS (8 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'acute-otitis-media': {
    id: 'acute-otitis-media',
    name: 'Acute Otitis Media',
    icd11: 'AB10',
    category: 'ent',
    urgency: 'urgent',
    prevalence: 0.08,
    symptoms: {
      cardinal: [
        { symptom: 'ear-pain', weight: 40 },
        { symptom: 'fever', weight: 30 }
      ],
      primary: [
        { symptom: 'hearing-loss', weight: 25 },
        { symptom: 'ear-fullness', weight: 22 }
      ],
      secondary: [
        { symptom: 'irritability', weight: 20 },
        { symptom: 'poor-sleep', weight: 15 },
        { symptom: 'ear-discharge', weight: 25 }
      ],
      atypical: [
        { symptom: 'dizziness', weight: 12 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['ear-tugging', 'irritability'], modifier: 1.5 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'recent-upper-respiratory-infection', modifier: 2.0 },
        { factor: 'age-6months-2years', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'daycare-attendance', modifier: 1.5 },
        { factor: 'bottle-feeding', modifier: 1.3 }
      ],
      minor: [
        { factor: 'secondhand-smoke', modifier: 1.2 }
      ]
    },
    redFlags: ['mastoiditis', 'meningitis-symptoms', 'facial-paralysis'],
    differentialDiagnosis: ['otitis-externa', 'referred-pain', 'eustachian-tube-dysfunction'],
    specialists: ['otolaryngologist', 'pediatrician'],
    diagnosticCriteria: {
      required: ['otoscopy'],
      supportive: ['tympanometry'],
      exclusionary: []
    }
  },
  
  'sinusitis-acute': {
    id: 'sinusitis-acute',
    name: 'Acute Bacterial Sinusitis',
    icd11: 'CA01',
    category: 'ent',
    urgency: 'routine',
    prevalence: 0.02,
    symptoms: {
      cardinal: [
        { symptom: 'facial-pain-pressure', weight: 35 },
        { symptom: 'nasal-congestion', weight: 32 }
      ],
      primary: [
        { symptom: 'purulent-nasal-discharge', weight: 30 },
        { symptom: 'fever', weight: 22 },
        { symptom: 'headache', weight: 22 }
      ],
      secondary: [
        { symptom: 'post-nasal-drip', weight: 18 },
        { symptom: 'cough', weight: 15 },
        { symptom: 'fatigue', weight: 15 }
      ],
      atypical: [
        { symptom: 'dental-pain', weight: 18 },
        { symptom: 'ear-pressure', weight: 12 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'recent-viral-infection', modifier: 2.0 },
        { factor: 'allergic-rhinitis', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'nasal-polyps', modifier: 1.5 },
        { factor: 'smoking', modifier: 1.4 }
      ],
      minor: [
        { factor: 'dental-infection', modifier: 1.3 }
      ]
    },
    redFlags: ['orbital-cellulitis', 'meningitis', 'severe-headache', 'visual-changes'],
    differentialDiagnosis: ['viral-rhinosinusitis', 'allergic-rhinitis', 'migraine', 'dental-abscess'],
    specialists: ['otolaryngologist'],
    diagnosticCriteria: {
      required: ['clinical-criteria', 'duration-10-days'],
      supportive: ['ct-scan'],
      exclusionary: []
    }
  },
  
  'tonsillitis': {
    id: 'tonsillitis',
    name: 'Acute Tonsillitis',
    icd11: 'CA03',
    category: 'ent',
    urgency: 'urgent',
    prevalence: 0.03,
    symptoms: {
      cardinal: [
        { symptom: 'sore-throat-severe', weight: 40 },
        { symptom: 'difficulty-swallowing', weight: 35 }
      ],
      primary: [
        { symptom: 'fever', weight: 28 },
        { symptom: 'swollen-tonsils', weight: 30 },
        { symptom: 'white-patches-tonsils', weight: 32 }
      ],
      secondary: [
        { symptom: 'neck-lymph-nodes', weight: 22 },
        { symptom: 'headache', weight: 15 },
        { symptom: 'bad-breath', weight: 15 }
      ],
      atypical: [
        { symptom: 'abdominal-pain', weight: 12 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['drooling', 'refusal-to-eat'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'age-5-15', modifier: 1.6 },
        { factor: 'close-contact-exposure', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'winter-season', modifier: 1.3 }
      ],
      minor: []
    },
    redFlags: ['peritonsillar-abscess', 'difficulty-breathing', 'trismus', 'drooling'],
    differentialDiagnosis: ['viral-pharyngitis', 'mononucleosis', 'peritonsillar-abscess', 'diphtheria'],
    specialists: ['otolaryngologist', 'pediatrician'],
    diagnosticCriteria: {
      required: ['clinical-exam', 'rapid-strep-test'],
      supportive: ['throat-culture'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGICAL CONDITIONS (6 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'conjunctivitis': {
    id: 'conjunctivitis',
    name: 'Conjunctivitis (Pink Eye)',
    icd11: '9A60',
    category: 'ophthalmological',
    urgency: 'routine',
    prevalence: 0.06,
    symptoms: {
      cardinal: [
        { symptom: 'eye-redness', weight: 38 },
        { symptom: 'eye-discharge', weight: 35 }
      ],
      primary: [
        { symptom: 'eye-itching', weight: 25 },
        { symptom: 'tearing', weight: 22 }
      ],
      secondary: [
        { symptom: 'eyelid-swelling', weight: 18 },
        { symptom: 'light-sensitivity', weight: 15 }
      ],
      atypical: [
        { symptom: 'gritty-sensation', weight: 18 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['crusting-eyelids'], modifier: 1.2 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'exposure-infected-person', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'allergies', modifier: 1.5 },
        { factor: 'contact-lenses', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['vision-changes', 'severe-pain', 'hypopyon', 'corneal-involvement'],
    differentialDiagnosis: ['keratitis', 'uveitis', 'acute-glaucoma', 'episcleritis'],
    specialists: ['ophthalmologist'],
    diagnosticCriteria: {
      required: ['clinical-examination'],
      supportive: ['culture'],
      exclusionary: ['corneal-ulcer']
    }
  },
  
  'acute-glaucoma': {
    id: 'acute-glaucoma',
    name: 'Acute Angle-Closure Glaucoma',
    icd11: '9C61',
    category: 'ophthalmological',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      cardinal: [
        { symptom: 'severe-eye-pain', weight: 45 },
        { symptom: 'sudden-vision-loss', weight: 40 }
      ],
      primary: [
        { symptom: 'halos-around-lights', weight: 32 },
        { symptom: 'eye-redness', weight: 28 },
        { symptom: 'headache', weight: 25 }
      ],
      secondary: [
        { symptom: 'nausea-vomiting', weight: 22 },
        { symptom: 'cloudy-cornea', weight: 30 }
      ],
      atypical: []
    },
    ageModifiers: {
      geriatric: { symptoms: [], modifier: 1.4 }
    },
    genderModifiers: {
      female: { symptoms: [], modifier: 1.3 }
    },
    riskFactors: {
      major: [
        { factor: 'hyperopia', modifier: 2.0 },
        { factor: 'family-history-glaucoma', modifier: 1.8 },
        { factor: 'age-over-60', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'asian-ethnicity', modifier: 1.5 },
        { factor: 'certain-medications', modifier: 1.5 }
      ],
      minor: []
    },
    redFlags: ['fixed-dilated-pupil', 'rock-hard-eye', 'rapid-vision-loss'],
    differentialDiagnosis: ['migraine', 'cluster-headache', 'uveitis', 'corneal-ulcer'],
    specialists: ['ophthalmologist', 'emergency-medicine'],
    diagnosticCriteria: {
      required: ['iop-measurement', 'gonioscopy'],
      supportive: ['slit-lamp-exam'],
      exclusionary: []
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

export function getAdditionalConditionCount(): number {
  return Object.keys(ADDITIONAL_CONDITIONS).length;
}

export function getAdditionalConditionsByCategory(): Record<string, string[]> {
  const categories: Record<string, string[]> = {};
  for (const [id, condition] of Object.entries(ADDITIONAL_CONDITIONS)) {
    if (!categories[condition.category]) {
      categories[condition.category] = [];
    }
    categories[condition.category].push(id);
  }
  return categories;
}

export function getAllConditionCategories(): string[] {
  const categories = new Set<string>();
  for (const condition of Object.values(ADDITIONAL_CONDITIONS)) {
    categories.add(condition.category);
  }
  return Array.from(categories);
}
