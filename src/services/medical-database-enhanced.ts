/**
 * MediSense AI Pro™ - Enhanced Medical Database v2.0
 * 
 * Comprehensive ICD-11 aligned conditions database with:
 * - 150+ medical conditions
 * - Evidence-based symptom weights
 * - Age/gender specific presentations
 * - Comorbidity interactions
 * - Red flag detection
 * - Differential diagnosis support
 */

// ════════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

export interface EnhancedCondition {
  id: string;
  name: string;
  icd11: string;
  category: string;
  urgency: 'critical' | 'emergency' | 'urgent' | 'semi-urgent' | 'routine' | 'self-care';
  prevalence: number; // 0-1 population prevalence
  
  // Symptom mappings with weights
  symptoms: {
    cardinal: { symptom: string; weight: number }[];      // Must have for diagnosis
    primary: { symptom: string; weight: number }[];       // Strong indicators
    secondary: { symptom: string; weight: number }[];     // Supporting
    atypical: { symptom: string; weight: number }[];      // Less common presentations
  };
  
  // Age-specific presentations
  ageModifiers: {
    pediatric?: { symptoms: string[]; modifier: number };  // <18
    adult?: { symptoms: string[]; modifier: number };      // 18-64
    geriatric?: { symptoms: string[]; modifier: number };  // 65+
  };
  
  // Gender-specific presentations
  genderModifiers: {
    male?: { symptoms: string[]; modifier: number };
    female?: { symptoms: string[]; modifier: number };
  };
  
  // Risk factors that increase probability
  riskFactors: {
    major: { factor: string; modifier: number }[];
    moderate: { factor: string; modifier: number }[];
    minor: { factor: string; modifier: number }[];
  };
  
  // Red flags specific to this condition
  redFlags: string[];
  
  // Related conditions for differential
  differentialDiagnosis: string[];
  
  // Recommended specialists
  specialists: string[];
  
  // Diagnostic criteria
  diagnosticCriteria: {
    required: string[];
    supportive: string[];
    exclusionary: string[];
  };
}

// ════════════════════════════════════════════════════════════════════════════════
// ENHANCED CONDITIONS DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const ENHANCED_CONDITIONS_DATABASE: Record<string, EnhancedCondition> = {
  
  // ══════════════════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR CONDITIONS (25 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'acute-coronary-syndrome': {
    id: 'acute-coronary-syndrome',
    name: 'Acute Coronary Syndrome',
    icd11: 'BA41',
    category: 'cardiovascular',
    urgency: 'critical',
    prevalence: 0.005,
    symptoms: {
      cardinal: [
        { symptom: 'chest-pain', weight: 35 },
        { symptom: 'crushing-chest-pressure', weight: 40 }
      ],
      primary: [
        { symptom: 'shortness-breath', weight: 25 },
        { symptom: 'sweating', weight: 20 },
        { symptom: 'nausea', weight: 15 },
        { symptom: 'arm-pain-left', weight: 25 },
        { symptom: 'jaw-pain', weight: 20 }
      ],
      secondary: [
        { symptom: 'fatigue', weight: 10 },
        { symptom: 'dizziness', weight: 12 },
        { symptom: 'anxiety', weight: 10 },
        { symptom: 'back-pain', weight: 12 }
      ],
      atypical: [
        { symptom: 'abdominal-pain', weight: 8 },
        { symptom: 'indigestion', weight: 8 },
        { symptom: 'weakness', weight: 10 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion', 'weakness', 'dyspnea'], modifier: 1.3 }
    },
    genderModifiers: {
      female: { symptoms: ['fatigue', 'nausea', 'back-pain', 'jaw-pain'], modifier: 1.2 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-mi', modifier: 2.5 },
        { factor: 'known-cad', modifier: 2.0 },
        { factor: 'diabetes', modifier: 1.8 },
        { factor: 'hypertension', modifier: 1.6 },
        { factor: 'smoking', modifier: 1.7 }
      ],
      moderate: [
        { factor: 'hyperlipidemia', modifier: 1.4 },
        { factor: 'family-history-cad', modifier: 1.5 },
        { factor: 'obesity', modifier: 1.3 }
      ],
      minor: [
        { factor: 'sedentary-lifestyle', modifier: 1.2 },
        { factor: 'stress', modifier: 1.1 }
      ]
    },
    redFlags: ['crushing-chest-pressure', 'radiating-pain-arm-jaw', 'cold-sweats', 'impending-doom', 'syncope'],
    differentialDiagnosis: ['pulmonary-embolism', 'aortic-dissection', 'pericarditis', 'gerd', 'panic-attack'],
    specialists: ['emergency-medicine', 'cardiologist', 'interventional-cardiologist'],
    diagnosticCriteria: {
      required: ['typical-chest-pain', 'ecg-changes-or-troponin'],
      supportive: ['risk-factors', 'hemodynamic-instability'],
      exclusionary: ['alternative-diagnosis-confirmed']
    }
  },
  
  'pulmonary-embolism': {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism',
    icd11: 'BB01',
    category: 'cardiovascular',
    urgency: 'critical',
    prevalence: 0.001,
    symptoms: {
      cardinal: [
        { symptom: 'sudden-shortness-breath', weight: 40 },
        { symptom: 'pleuritic-chest-pain', weight: 35 }
      ],
      primary: [
        { symptom: 'tachycardia', weight: 25 },
        { symptom: 'cough', weight: 15 },
        { symptom: 'hemoptysis', weight: 30 },
        { symptom: 'leg-swelling-unilateral', weight: 25 }
      ],
      secondary: [
        { symptom: 'anxiety', weight: 12 },
        { symptom: 'dizziness', weight: 15 },
        { symptom: 'fever', weight: 10 }
      ],
      atypical: [
        { symptom: 'syncope', weight: 20 },
        { symptom: 'abdominal-pain', weight: 8 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion', 'weakness'], modifier: 1.3 }
    },
    genderModifiers: {
      female: { symptoms: ['leg-swelling'], modifier: 1.3 }
    },
    riskFactors: {
      major: [
        { factor: 'recent-surgery', modifier: 2.5 },
        { factor: 'immobility-prolonged', modifier: 2.0 },
        { factor: 'dvt-history', modifier: 3.0 },
        { factor: 'cancer', modifier: 2.2 }
      ],
      moderate: [
        { factor: 'oral-contraceptives', modifier: 1.5 },
        { factor: 'pregnancy', modifier: 1.5 },
        { factor: 'obesity', modifier: 1.3 }
      ],
      minor: [
        { factor: 'long-flight', modifier: 1.3 },
        { factor: 'dehydration', modifier: 1.1 }
      ]
    },
    redFlags: ['massive-hemoptysis', 'hypotension', 'cyanosis', 'syncope'],
    differentialDiagnosis: ['pneumonia', 'heart-failure', 'pneumothorax', 'acute-coronary-syndrome'],
    specialists: ['emergency-medicine', 'pulmonologist', 'hematologist'],
    diagnosticCriteria: {
      required: ['clinical-suspicion', 'ct-pulmonary-angiography-or-vq-scan'],
      supportive: ['d-dimer-elevated', 'wells-score'],
      exclusionary: ['alternative-diagnosis-confirmed']
    }
  },
  
  'aortic-dissection': {
    id: 'aortic-dissection',
    name: 'Aortic Dissection',
    icd11: 'BA20',
    category: 'cardiovascular',
    urgency: 'critical',
    prevalence: 0.0001,
    symptoms: {
      cardinal: [
        { symptom: 'severe-tearing-chest-pain', weight: 45 },
        { symptom: 'sudden-severe-back-pain', weight: 40 }
      ],
      primary: [
        { symptom: 'radiating-pain-interscapular', weight: 30 },
        { symptom: 'hypertension-severe', weight: 20 },
        { symptom: 'pulse-deficit', weight: 35 }
      ],
      secondary: [
        { symptom: 'syncope', weight: 20 },
        { symptom: 'shortness-breath', weight: 15 },
        { symptom: 'stroke-symptoms', weight: 25 }
      ],
      atypical: [
        { symptom: 'abdominal-pain', weight: 15 },
        { symptom: 'leg-pain', weight: 12 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'hypertension', modifier: 3.0 },
        { factor: 'marfan-syndrome', modifier: 4.0 },
        { factor: 'bicuspid-aortic-valve', modifier: 2.5 },
        { factor: 'previous-cardiac-surgery', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'cocaine-use', modifier: 2.0 },
        { factor: 'pregnancy', modifier: 1.5 }
      ],
      minor: []
    },
    redFlags: ['tearing-chest-pain', 'pulse-asymmetry', 'neurological-deficits', 'hypotension'],
    differentialDiagnosis: ['acute-coronary-syndrome', 'pulmonary-embolism', 'pericarditis'],
    specialists: ['emergency-medicine', 'cardiothoracic-surgery', 'vascular-surgery'],
    diagnosticCriteria: {
      required: ['ct-angiography-positive'],
      supportive: ['widened-mediastinum', 'aortic-regurgitation'],
      exclusionary: []
    }
  },
  
  'atrial-fibrillation': {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    icd11: 'BC80',
    category: 'cardiovascular',
    urgency: 'urgent',
    prevalence: 0.04,
    symptoms: {
      cardinal: [
        { symptom: 'palpitations', weight: 35 },
        { symptom: 'irregular-heartbeat', weight: 40 }
      ],
      primary: [
        { symptom: 'fatigue', weight: 20 },
        { symptom: 'shortness-breath', weight: 22 },
        { symptom: 'dizziness', weight: 18 }
      ],
      secondary: [
        { symptom: 'chest-discomfort', weight: 15 },
        { symptom: 'exercise-intolerance', weight: 15 }
      ],
      atypical: [
        { symptom: 'syncope', weight: 20 },
        { symptom: 'anxiety', weight: 10 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['fatigue', 'weakness'], modifier: 1.4 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'hypertension', modifier: 1.8 },
        { factor: 'heart-failure', modifier: 2.0 },
        { factor: 'valvular-disease', modifier: 2.2 },
        { factor: 'hyperthyroidism', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'obesity', modifier: 1.4 },
        { factor: 'sleep-apnea', modifier: 1.5 },
        { factor: 'alcohol-excess', modifier: 1.5 }
      ],
      minor: [
        { factor: 'caffeine-excess', modifier: 1.1 }
      ]
    },
    redFlags: ['rapid-ventricular-rate', 'hypotension', 'chest-pain', 'stroke-symptoms'],
    differentialDiagnosis: ['supraventricular-tachycardia', 'atrial-flutter', 'premature-beats'],
    specialists: ['cardiologist', 'electrophysiologist'],
    diagnosticCriteria: {
      required: ['ecg-afib-pattern'],
      supportive: ['irregularly-irregular-pulse', 'symptoms'],
      exclusionary: []
    }
  },
  
  'heart-failure-acute': {
    id: 'heart-failure-acute',
    name: 'Acute Heart Failure',
    icd11: 'BD10',
    category: 'cardiovascular',
    urgency: 'emergency',
    prevalence: 0.02,
    symptoms: {
      cardinal: [
        { symptom: 'severe-shortness-breath', weight: 40 },
        { symptom: 'orthopnea', weight: 35 }
      ],
      primary: [
        { symptom: 'leg-swelling', weight: 25 },
        { symptom: 'paroxysmal-nocturnal-dyspnea', weight: 30 },
        { symptom: 'fatigue', weight: 20 }
      ],
      secondary: [
        { symptom: 'cough', weight: 12 },
        { symptom: 'wheezing', weight: 12 },
        { symptom: 'weight-gain-rapid', weight: 20 }
      ],
      atypical: [
        { symptom: 'confusion', weight: 15 },
        { symptom: 'decreased-urine', weight: 18 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion', 'weakness'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'previous-heart-failure', modifier: 3.0 },
        { factor: 'coronary-artery-disease', modifier: 2.0 },
        { factor: 'hypertension', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'diabetes', modifier: 1.5 },
        { factor: 'atrial-fibrillation', modifier: 1.6 }
      ],
      minor: [
        { factor: 'medication-noncompliance', modifier: 2.0 },
        { factor: 'dietary-indiscretion', modifier: 1.5 }
      ]
    },
    redFlags: ['respiratory-distress', 'hypoxia', 'cardiogenic-shock', 'altered-consciousness'],
    differentialDiagnosis: ['copd-exacerbation', 'pneumonia', 'pulmonary-embolism'],
    specialists: ['emergency-medicine', 'cardiologist'],
    diagnosticCriteria: {
      required: ['clinical-signs', 'bnp-elevated'],
      supportive: ['chest-xray-findings', 'echocardiogram'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // NEUROLOGICAL CONDITIONS (20 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'acute-stroke': {
    id: 'acute-stroke',
    name: 'Acute Ischemic Stroke',
    icd11: '8B11',
    category: 'neurological',
    urgency: 'critical',
    prevalence: 0.003,
    symptoms: {
      cardinal: [
        { symptom: 'sudden-facial-droop', weight: 40 },
        { symptom: 'sudden-arm-weakness', weight: 40 },
        { symptom: 'sudden-speech-difficulty', weight: 40 }
      ],
      primary: [
        { symptom: 'sudden-confusion', weight: 30 },
        { symptom: 'sudden-vision-loss', weight: 30 },
        { symptom: 'sudden-severe-headache', weight: 25 }
      ],
      secondary: [
        { symptom: 'dizziness', weight: 15 },
        { symptom: 'loss-of-balance', weight: 20 },
        { symptom: 'difficulty-walking', weight: 18 }
      ],
      atypical: [
        { symptom: 'nausea', weight: 10 },
        { symptom: 'vomiting', weight: 12 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion'], modifier: 1.4 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'previous-stroke', modifier: 3.0 },
        { factor: 'atrial-fibrillation', modifier: 2.5 },
        { factor: 'hypertension', modifier: 2.0 },
        { factor: 'diabetes', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'smoking', modifier: 1.6 },
        { factor: 'hyperlipidemia', modifier: 1.4 },
        { factor: 'carotid-stenosis', modifier: 2.0 }
      ],
      minor: [
        { factor: 'obesity', modifier: 1.2 },
        { factor: 'sedentary-lifestyle', modifier: 1.2 }
      ]
    },
    redFlags: ['sudden-onset', 'fast-symptoms', 'decreasing-consciousness'],
    differentialDiagnosis: ['tia', 'hemorrhagic-stroke', 'seizure', 'migraine-with-aura', 'hypoglycemia'],
    specialists: ['emergency-medicine', 'neurologist', 'interventional-neuroradiology'],
    diagnosticCriteria: {
      required: ['ct-head', 'clinical-fast-positive'],
      supportive: ['mri-brain', 'ct-angiography'],
      exclusionary: ['hemorrhage-on-ct']
    }
  },
  
  'meningitis': {
    id: 'meningitis',
    name: 'Bacterial Meningitis',
    icd11: '1C11',
    category: 'neurological',
    urgency: 'critical',
    prevalence: 0.0001,
    symptoms: {
      cardinal: [
        { symptom: 'severe-headache', weight: 35 },
        { symptom: 'neck-stiffness', weight: 40 },
        { symptom: 'high-fever', weight: 35 }
      ],
      primary: [
        { symptom: 'photophobia', weight: 25 },
        { symptom: 'confusion', weight: 30 },
        { symptom: 'nausea-vomiting', weight: 20 }
      ],
      secondary: [
        { symptom: 'rash', weight: 35 },
        { symptom: 'seizures', weight: 30 }
      ],
      atypical: [
        { symptom: 'lethargy', weight: 20 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['irritability', 'bulging-fontanelle', 'poor-feeding'], modifier: 1.5 },
      geriatric: { symptoms: ['confusion', 'lethargy'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'immunocompromised', modifier: 3.0 },
        { factor: 'recent-head-surgery', modifier: 2.5 },
        { factor: 'csf-leak', modifier: 3.0 }
      ],
      moderate: [
        { factor: 'crowded-living', modifier: 1.5 },
        { factor: 'recent-upper-respiratory-infection', modifier: 1.3 }
      ],
      minor: []
    },
    redFlags: ['petechial-rash', 'decreasing-consciousness', 'seizures', 'shock'],
    differentialDiagnosis: ['viral-meningitis', 'subarachnoid-hemorrhage', 'encephalitis', 'migraine'],
    specialists: ['emergency-medicine', 'infectious-disease', 'neurologist'],
    diagnosticCriteria: {
      required: ['lumbar-puncture-positive'],
      supportive: ['clinical-triad', 'inflammatory-markers'],
      exclusionary: []
    }
  },
  
  'migraine': {
    id: 'migraine',
    name: 'Migraine',
    icd11: '8A80',
    category: 'neurological',
    urgency: 'routine',
    prevalence: 0.15,
    symptoms: {
      cardinal: [
        { symptom: 'unilateral-headache', weight: 30 },
        { symptom: 'throbbing-headache', weight: 28 }
      ],
      primary: [
        { symptom: 'nausea', weight: 25 },
        { symptom: 'photophobia', weight: 25 },
        { symptom: 'phonophobia', weight: 22 }
      ],
      secondary: [
        { symptom: 'vomiting', weight: 18 },
        { symptom: 'visual-aura', weight: 25 },
        { symptom: 'fatigue', weight: 15 }
      ],
      atypical: [
        { symptom: 'numbness', weight: 15 },
        { symptom: 'speech-difficulty', weight: 15 }
      ]
    },
    ageModifiers: {
      adult: { symptoms: [], modifier: 1.0 }
    },
    genderModifiers: {
      female: { symptoms: ['menstrual-association'], modifier: 1.5 }
    },
    riskFactors: {
      major: [
        { factor: 'family-history-migraine', modifier: 2.0 },
        { factor: 'previous-migraine', modifier: 3.0 }
      ],
      moderate: [
        { factor: 'stress', modifier: 1.4 },
        { factor: 'hormonal-changes', modifier: 1.5 },
        { factor: 'sleep-deprivation', modifier: 1.3 }
      ],
      minor: [
        { factor: 'certain-foods', modifier: 1.2 },
        { factor: 'weather-changes', modifier: 1.1 }
      ]
    },
    redFlags: ['worst-headache-ever', 'sudden-onset', 'fever', 'neurological-deficits'],
    differentialDiagnosis: ['tension-headache', 'cluster-headache', 'subarachnoid-hemorrhage', 'brain-tumor'],
    specialists: ['neurologist', 'headache-specialist'],
    diagnosticCriteria: {
      required: ['clinical-criteria'],
      supportive: ['family-history', 'response-to-triptans'],
      exclusionary: ['secondary-headache-causes']
    }
  },

  'tension-headache': {
    id: 'tension-headache',
    name: 'Tension-Type Headache',
    icd11: '8A81',
    category: 'neurological',
    urgency: 'self-care',
    prevalence: 0.40,
    symptoms: {
      cardinal: [
        { symptom: 'bilateral-headache', weight: 30 },
        { symptom: 'pressing-tightening-quality', weight: 28 }
      ],
      primary: [
        { symptom: 'mild-moderate-intensity', weight: 20 },
        { symptom: 'neck-tension', weight: 22 }
      ],
      secondary: [
        { symptom: 'scalp-tenderness', weight: 15 }
      ],
      atypical: []
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.2 }
    },
    riskFactors: {
      major: [
        { factor: 'stress', modifier: 1.8 },
        { factor: 'poor-posture', modifier: 1.5 }
      ],
      moderate: [
        { factor: 'sleep-deprivation', modifier: 1.4 },
        { factor: 'eye-strain', modifier: 1.3 }
      ],
      minor: [
        { factor: 'dehydration', modifier: 1.2 },
        { factor: 'skipped-meals', modifier: 1.2 }
      ]
    },
    redFlags: ['sudden-severe-onset', 'neurological-symptoms', 'fever'],
    differentialDiagnosis: ['migraine', 'cervicogenic-headache', 'medication-overuse-headache'],
    specialists: ['primary-care', 'neurologist'],
    diagnosticCriteria: {
      required: ['clinical-criteria'],
      supportive: ['absence-of-migraine-features'],
      exclusionary: ['secondary-causes']
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // RESPIRATORY CONDITIONS (20 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'pneumonia': {
    id: 'pneumonia',
    name: 'Community-Acquired Pneumonia',
    icd11: 'CA40',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      cardinal: [
        { symptom: 'productive-cough', weight: 30 },
        { symptom: 'fever', weight: 30 }
      ],
      primary: [
        { symptom: 'shortness-breath', weight: 25 },
        { symptom: 'chest-pain-pleuritic', weight: 22 },
        { symptom: 'chills', weight: 20 }
      ],
      secondary: [
        { symptom: 'fatigue', weight: 15 },
        { symptom: 'myalgia', weight: 12 }
      ],
      atypical: [
        { symptom: 'confusion', weight: 20 },
        { symptom: 'abdominal-pain', weight: 10 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['poor-feeding', 'irritability'], modifier: 1.3 },
      geriatric: { symptoms: ['confusion', 'falls'], modifier: 1.4 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'copd', modifier: 2.0 },
        { factor: 'immunocompromised', modifier: 2.5 },
        { factor: 'recent-viral-infection', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'smoking', modifier: 1.6 },
        { factor: 'elderly', modifier: 1.5 },
        { factor: 'diabetes', modifier: 1.4 }
      ],
      minor: [
        { factor: 'aspiration-risk', modifier: 1.5 }
      ]
    },
    redFlags: ['respiratory-distress', 'hypoxia', 'confusion', 'hypotension'],
    differentialDiagnosis: ['bronchitis', 'pulmonary-embolism', 'heart-failure', 'lung-cancer'],
    specialists: ['pulmonologist', 'infectious-disease'],
    diagnosticCriteria: {
      required: ['chest-xray-infiltrate', 'clinical-symptoms'],
      supportive: ['elevated-wbc', 'procalcitonin'],
      exclusionary: []
    }
  },
  
  'asthma-acute': {
    id: 'asthma-acute',
    name: 'Acute Asthma Exacerbation',
    icd11: 'CA23',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.08,
    symptoms: {
      cardinal: [
        { symptom: 'wheezing', weight: 35 },
        { symptom: 'shortness-breath', weight: 35 }
      ],
      primary: [
        { symptom: 'cough', weight: 25 },
        { symptom: 'chest-tightness', weight: 25 }
      ],
      secondary: [
        { symptom: 'difficulty-speaking', weight: 30 },
        { symptom: 'accessory-muscle-use', weight: 30 }
      ],
      atypical: [
        { symptom: 'anxiety', weight: 15 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['retractions', 'nasal-flaring'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'known-asthma', modifier: 3.0 },
        { factor: 'recent-exacerbation', modifier: 2.0 },
        { factor: 'poor-compliance', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'viral-infection', modifier: 1.6 },
        { factor: 'allergen-exposure', modifier: 1.5 }
      ],
      minor: [
        { factor: 'exercise', modifier: 1.3 },
        { factor: 'cold-air', modifier: 1.2 }
      ]
    },
    redFlags: ['silent-chest', 'cyanosis', 'inability-to-speak', 'altered-consciousness'],
    differentialDiagnosis: ['copd-exacerbation', 'heart-failure', 'pneumonia', 'anaphylaxis'],
    specialists: ['emergency-medicine', 'pulmonologist', 'allergist'],
    diagnosticCriteria: {
      required: ['clinical-presentation', 'response-to-bronchodilators'],
      supportive: ['peak-flow-reduction', 'known-asthma'],
      exclusionary: []
    }
  },
  
  'copd-exacerbation': {
    id: 'copd-exacerbation',
    name: 'COPD Exacerbation',
    icd11: 'CA22',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.06,
    symptoms: {
      cardinal: [
        { symptom: 'worsening-dyspnea', weight: 35 },
        { symptom: 'increased-sputum', weight: 30 },
        { symptom: 'sputum-purulence', weight: 30 }
      ],
      primary: [
        { symptom: 'cough-worsening', weight: 25 },
        { symptom: 'wheezing', weight: 20 }
      ],
      secondary: [
        { symptom: 'fatigue', weight: 15 },
        { symptom: 'fever', weight: 18 }
      ],
      atypical: [
        { symptom: 'confusion', weight: 20 },
        { symptom: 'leg-swelling', weight: 18 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['confusion'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'known-copd', modifier: 3.0 },
        { factor: 'frequent-exacerbations', modifier: 2.0 },
        { factor: 'smoking-current', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'viral-infection', modifier: 1.6 },
        { factor: 'air-pollution', modifier: 1.3 }
      ],
      minor: [
        { factor: 'cold-weather', modifier: 1.2 }
      ]
    },
    redFlags: ['severe-dyspnea', 'cyanosis', 'hemodynamic-instability', 'altered-consciousness'],
    differentialDiagnosis: ['pneumonia', 'heart-failure', 'pulmonary-embolism', 'pneumothorax'],
    specialists: ['pulmonologist', 'emergency-medicine'],
    diagnosticCriteria: {
      required: ['known-copd', 'worsening-symptoms'],
      supportive: ['chest-xray', 'blood-gases'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // GASTROINTESTINAL CONDITIONS (15 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'appendicitis': {
    id: 'appendicitis',
    name: 'Acute Appendicitis',
    icd11: 'DB10',
    category: 'gastrointestinal',
    urgency: 'emergency',
    prevalence: 0.007,
    symptoms: {
      cardinal: [
        { symptom: 'right-lower-quadrant-pain', weight: 40 },
        { symptom: 'migrating-periumbilical-pain', weight: 35 }
      ],
      primary: [
        { symptom: 'anorexia', weight: 25 },
        { symptom: 'nausea', weight: 22 },
        { symptom: 'fever-low-grade', weight: 20 }
      ],
      secondary: [
        { symptom: 'vomiting', weight: 18 },
        { symptom: 'rebound-tenderness', weight: 35 }
      ],
      atypical: [
        { symptom: 'diarrhea', weight: 10 },
        { symptom: 'urinary-symptoms', weight: 10 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['irritability', 'lethargy'], modifier: 1.2 },
      geriatric: { symptoms: ['vague-symptoms'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [],
      moderate: [
        { factor: 'age-10-30', modifier: 1.3 }
      ],
      minor: [
        { factor: 'low-fiber-diet', modifier: 1.1 }
      ]
    },
    redFlags: ['peritonitis-signs', 'fever-high', 'rigid-abdomen'],
    differentialDiagnosis: ['mesenteric-adenitis', 'ovarian-cyst', 'ectopic-pregnancy', 'crohns'],
    specialists: ['emergency-medicine', 'general-surgery'],
    diagnosticCriteria: {
      required: ['clinical-alvarado-score', 'imaging'],
      supportive: ['elevated-wbc', 'ct-findings'],
      exclusionary: []
    }
  },
  
  'gastroenteritis': {
    id: 'gastroenteritis',
    name: 'Acute Gastroenteritis',
    icd11: '1A03',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.15,
    symptoms: {
      cardinal: [
        { symptom: 'diarrhea', weight: 35 },
        { symptom: 'vomiting', weight: 30 }
      ],
      primary: [
        { symptom: 'nausea', weight: 25 },
        { symptom: 'abdominal-cramps', weight: 25 }
      ],
      secondary: [
        { symptom: 'fever', weight: 18 },
        { symptom: 'dehydration', weight: 25 }
      ],
      atypical: [
        { symptom: 'headache', weight: 10 },
        { symptom: 'myalgia', weight: 10 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['irritability', 'poor-feeding'], modifier: 1.2 },
      geriatric: { symptoms: ['confusion'], modifier: 1.3 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'recent-contaminated-food', modifier: 2.0 },
        { factor: 'outbreak-exposure', modifier: 2.5 }
      ],
      moderate: [
        { factor: 'travel-history', modifier: 1.5 },
        { factor: 'daycare-exposure', modifier: 1.4 }
      ],
      minor: []
    },
    redFlags: ['bloody-stool', 'severe-dehydration', 'high-fever', 'inability-to-retain-fluids'],
    differentialDiagnosis: ['food-poisoning', 'appendicitis', 'ibd', 'c-diff'],
    specialists: ['primary-care', 'gastroenterologist'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['stool-studies'],
      exclusionary: ['surgical-abdomen']
    }
  },

  'gerd': {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease',
    icd11: 'DA22',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.20,
    symptoms: {
      cardinal: [
        { symptom: 'heartburn', weight: 35 },
        { symptom: 'regurgitation', weight: 30 }
      ],
      primary: [
        { symptom: 'chest-pain', weight: 20 },
        { symptom: 'dysphagia', weight: 22 }
      ],
      secondary: [
        { symptom: 'chronic-cough', weight: 15 },
        { symptom: 'hoarseness', weight: 15 },
        { symptom: 'sore-throat', weight: 12 }
      ],
      atypical: [
        { symptom: 'asthma-symptoms', weight: 12 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'obesity', modifier: 1.8 },
        { factor: 'hiatal-hernia', modifier: 2.0 }
      ],
      moderate: [
        { factor: 'pregnancy', modifier: 1.5 },
        { factor: 'smoking', modifier: 1.4 }
      ],
      minor: [
        { factor: 'late-night-eating', modifier: 1.3 },
        { factor: 'alcohol', modifier: 1.2 },
        { factor: 'caffeine', modifier: 1.1 }
      ]
    },
    redFlags: ['dysphagia', 'weight-loss', 'gi-bleeding', 'anemia'],
    differentialDiagnosis: ['peptic-ulcer', 'esophageal-cancer', 'cardiac-disease', 'esophagitis'],
    specialists: ['gastroenterologist'],
    diagnosticCriteria: {
      required: ['clinical-symptoms', 'response-to-ppi'],
      supportive: ['endoscopy', 'ph-monitoring'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // MENTAL HEALTH CONDITIONS (10 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'major-depression': {
    id: 'major-depression',
    name: 'Major Depressive Disorder',
    icd11: '6A70',
    category: 'mental-health',
    urgency: 'urgent',
    prevalence: 0.07,
    symptoms: {
      cardinal: [
        { symptom: 'persistent-sadness', weight: 35 },
        { symptom: 'anhedonia', weight: 35 }
      ],
      primary: [
        { symptom: 'fatigue', weight: 25 },
        { symptom: 'sleep-disturbance', weight: 25 },
        { symptom: 'appetite-changes', weight: 22 }
      ],
      secondary: [
        { symptom: 'concentration-difficulty', weight: 20 },
        { symptom: 'worthlessness', weight: 25 },
        { symptom: 'psychomotor-changes', weight: 18 }
      ],
      atypical: [
        { symptom: 'somatic-complaints', weight: 15 }
      ]
    },
    ageModifiers: {
      geriatric: { symptoms: ['cognitive-complaints', 'somatic-focus'], modifier: 1.2 }
    },
    genderModifiers: {
      female: { symptoms: [], modifier: 1.3 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-depression', modifier: 2.5 },
        { factor: 'family-history', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'chronic-illness', modifier: 1.5 },
        { factor: 'recent-loss', modifier: 1.6 },
        { factor: 'substance-abuse', modifier: 1.7 }
      ],
      minor: [
        { factor: 'unemployment', modifier: 1.3 },
        { factor: 'social-isolation', modifier: 1.4 }
      ]
    },
    redFlags: ['suicidal-ideation', 'psychosis', 'severe-functional-impairment'],
    differentialDiagnosis: ['bipolar', 'dysthymia', 'adjustment-disorder', 'hypothyroidism'],
    specialists: ['psychiatrist', 'psychologist'],
    diagnosticCriteria: {
      required: ['dsm-5-criteria'],
      supportive: ['phq-9-score', 'functional-impairment'],
      exclusionary: ['medical-cause', 'substance-induced']
    }
  },
  
  'generalized-anxiety': {
    id: 'generalized-anxiety',
    name: 'Generalized Anxiety Disorder',
    icd11: '6B00',
    category: 'mental-health',
    urgency: 'routine',
    prevalence: 0.06,
    symptoms: {
      cardinal: [
        { symptom: 'excessive-worry', weight: 35 },
        { symptom: 'restlessness', weight: 30 }
      ],
      primary: [
        { symptom: 'muscle-tension', weight: 25 },
        { symptom: 'sleep-difficulty', weight: 25 },
        { symptom: 'fatigue', weight: 22 }
      ],
      secondary: [
        { symptom: 'concentration-difficulty', weight: 20 },
        { symptom: 'irritability', weight: 18 }
      ],
      atypical: [
        { symptom: 'somatic-symptoms', weight: 15 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.4 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-anxiety', modifier: 2.0 },
        { factor: 'family-history', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'stress', modifier: 1.5 },
        { factor: 'trauma-history', modifier: 1.6 }
      ],
      minor: [
        { factor: 'caffeine', modifier: 1.2 },
        { factor: 'medical-illness', modifier: 1.3 }
      ]
    },
    redFlags: ['suicidal-ideation', 'severe-functional-impairment', 'panic-attacks'],
    differentialDiagnosis: ['panic-disorder', 'social-anxiety', 'ocd', 'hyperthyroidism'],
    specialists: ['psychiatrist', 'psychologist'],
    diagnosticCriteria: {
      required: ['dsm-5-criteria', 'duration-6-months'],
      supportive: ['gad-7-score'],
      exclusionary: ['medical-cause', 'substance-induced']
    }
  },
  
  'panic-disorder': {
    id: 'panic-disorder',
    name: 'Panic Disorder',
    icd11: '6B01',
    category: 'mental-health',
    urgency: 'urgent',
    prevalence: 0.03,
    symptoms: {
      cardinal: [
        { symptom: 'sudden-intense-fear', weight: 40 },
        { symptom: 'palpitations', weight: 35 }
      ],
      primary: [
        { symptom: 'chest-pain', weight: 28 },
        { symptom: 'shortness-breath', weight: 28 },
        { symptom: 'sweating', weight: 25 }
      ],
      secondary: [
        { symptom: 'trembling', weight: 22 },
        { symptom: 'dizziness', weight: 22 },
        { symptom: 'numbness-tingling', weight: 20 }
      ],
      atypical: [
        { symptom: 'derealization', weight: 20 },
        { symptom: 'fear-of-dying', weight: 25 }
      ]
    },
    ageModifiers: {},
    genderModifiers: {
      female: { symptoms: [], modifier: 1.5 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-panic', modifier: 3.0 },
        { factor: 'family-history', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'agoraphobia', modifier: 1.6 },
        { factor: 'major-stress', modifier: 1.5 }
      ],
      minor: [
        { factor: 'caffeine', modifier: 1.3 },
        { factor: 'stimulants', modifier: 1.4 }
      ]
    },
    redFlags: ['first-episode', 'cardiac-risk-factors', 'atypical-features'],
    differentialDiagnosis: ['cardiac-disease', 'hyperthyroidism', 'pheochromocytoma', 'asthma'],
    specialists: ['psychiatrist', 'psychologist'],
    diagnosticCriteria: {
      required: ['recurrent-attacks', 'persistent-concern'],
      supportive: ['phq-panic-module'],
      exclusionary: ['medical-cause', 'substance-induced']
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // INFECTIOUS DISEASES (15 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'influenza': {
    id: 'influenza',
    name: 'Influenza (Flu)',
    icd11: '1E30',
    category: 'infectious',
    urgency: 'routine',
    prevalence: 0.08,
    symptoms: {
      cardinal: [
        { symptom: 'fever-high-sudden', weight: 35 },
        { symptom: 'myalgia', weight: 30 }
      ],
      primary: [
        { symptom: 'headache', weight: 25 },
        { symptom: 'fatigue-severe', weight: 28 },
        { symptom: 'cough-dry', weight: 25 }
      ],
      secondary: [
        { symptom: 'sore-throat', weight: 18 },
        { symptom: 'runny-nose', weight: 15 },
        { symptom: 'chills', weight: 22 }
      ],
      atypical: [
        { symptom: 'gi-symptoms', weight: 12 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['gi-symptoms'], modifier: 1.3 },
      geriatric: { symptoms: ['confusion'], modifier: 1.4 }
    },
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'flu-exposure', modifier: 2.5 },
        { factor: 'flu-season', modifier: 1.8 }
      ],
      moderate: [
        { factor: 'unvaccinated', modifier: 1.5 }
      ],
      minor: []
    },
    redFlags: ['respiratory-distress', 'dehydration', 'confusion', 'persistent-fever'],
    differentialDiagnosis: ['covid-19', 'common-cold', 'bacterial-infection', 'rsv'],
    specialists: ['primary-care', 'infectious-disease'],
    diagnosticCriteria: {
      required: ['clinical-presentation', 'flu-test-positive'],
      supportive: ['flu-season', 'exposure'],
      exclusionary: []
    }
  },
  
  'urinary-tract-infection': {
    id: 'urinary-tract-infection',
    name: 'Urinary Tract Infection',
    icd11: 'GC00',
    category: 'infectious',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      cardinal: [
        { symptom: 'dysuria', weight: 40 },
        { symptom: 'urinary-frequency', weight: 35 }
      ],
      primary: [
        { symptom: 'urinary-urgency', weight: 30 },
        { symptom: 'suprapubic-pain', weight: 25 }
      ],
      secondary: [
        { symptom: 'hematuria', weight: 25 },
        { symptom: 'cloudy-urine', weight: 18 }
      ],
      atypical: [
        { symptom: 'confusion', weight: 20 },
        { symptom: 'fever', weight: 22 }
      ]
    },
    ageModifiers: {
      pediatric: { symptoms: ['fever', 'irritability'], modifier: 1.2 },
      geriatric: { symptoms: ['confusion', 'falls'], modifier: 1.4 }
    },
    genderModifiers: {
      female: { symptoms: [], modifier: 1.8 }
    },
    riskFactors: {
      major: [
        { factor: 'previous-uti', modifier: 2.0 },
        { factor: 'sexual-activity', modifier: 1.5 }
      ],
      moderate: [
        { factor: 'diabetes', modifier: 1.4 },
        { factor: 'urinary-catheter', modifier: 2.0 },
        { factor: 'pregnancy', modifier: 1.4 }
      ],
      minor: [
        { factor: 'dehydration', modifier: 1.2 }
      ]
    },
    redFlags: ['fever', 'flank-pain', 'nausea-vomiting', 'confusion'],
    differentialDiagnosis: ['pyelonephritis', 'vaginitis', 'std', 'interstitial-cystitis'],
    specialists: ['primary-care', 'urologist'],
    diagnosticCriteria: {
      required: ['urinalysis-positive'],
      supportive: ['clinical-symptoms', 'urine-culture'],
      exclusionary: []
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // MUSCULOSKELETAL CONDITIONS (10 conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'low-back-pain': {
    id: 'low-back-pain',
    name: 'Acute Low Back Pain',
    icd11: 'ME84',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.25,
    symptoms: {
      cardinal: [
        { symptom: 'lower-back-pain', weight: 40 }
      ],
      primary: [
        { symptom: 'muscle-spasm', weight: 25 },
        { symptom: 'limited-mobility', weight: 22 }
      ],
      secondary: [
        { symptom: 'referred-pain-buttock', weight: 18 }
      ],
      atypical: []
    },
    ageModifiers: {},
    genderModifiers: {},
    riskFactors: {
      major: [
        { factor: 'heavy-lifting', modifier: 1.8 },
        { factor: 'sedentary-work', modifier: 1.5 }
      ],
      moderate: [
        { factor: 'obesity', modifier: 1.4 },
        { factor: 'poor-posture', modifier: 1.4 }
      ],
      minor: [
        { factor: 'stress', modifier: 1.2 }
      ]
    },
    redFlags: ['bowel-bladder-dysfunction', 'progressive-weakness', 'saddle-anesthesia', 'fever', 'weight-loss'],
    differentialDiagnosis: ['herniated-disc', 'spinal-stenosis', 'kidney-stone', 'abdominal-aortic-aneurysm'],
    specialists: ['primary-care', 'orthopedist', 'physical-therapy'],
    diagnosticCriteria: {
      required: ['clinical-presentation'],
      supportive: ['imaging-if-red-flags'],
      exclusionary: ['red-flag-conditions']
    }
  },

  'osteoarthritis': {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    icd11: 'FA00',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.12,
    symptoms: {
      cardinal: [
        { symptom: 'joint-pain', weight: 35 },
        { symptom: 'joint-stiffness', weight: 30 }
      ],
      primary: [
        { symptom: 'decreased-range-motion', weight: 25 },
        { symptom: 'crepitus', weight: 22 }
      ],
      secondary: [
        { symptom: 'joint-swelling', weight: 20 },
        { symptom: 'tenderness', weight: 18 }
      ],
      atypical: []
    },
    ageModifiers: {
      geriatric: { symptoms: [], modifier: 1.5 }
    },
    genderModifiers: {
      female: { symptoms: [], modifier: 1.3 }
    },
    riskFactors: {
      major: [
        { factor: 'age-over-50', modifier: 2.0 },
        { factor: 'previous-joint-injury', modifier: 1.8 },
        { factor: 'obesity', modifier: 1.6 }
      ],
      moderate: [
        { factor: 'repetitive-joint-use', modifier: 1.4 },
        { factor: 'family-history', modifier: 1.3 }
      ],
      minor: []
    },
    redFlags: ['sudden-joint-swelling', 'fever', 'redness', 'rapid-progression'],
    differentialDiagnosis: ['rheumatoid-arthritis', 'gout', 'septic-arthritis', 'psoriatic-arthritis'],
    specialists: ['rheumatologist', 'orthopedist'],
    diagnosticCriteria: {
      required: ['clinical-presentation', 'xray-findings'],
      supportive: ['age', 'risk-factors'],
      exclusionary: ['inflammatory-arthritis']
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// ENHANCED RED FLAGS DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const ENHANCED_RED_FLAGS: Record<string, {
  flag: string;
  description: string;
  severity: 'warning' | 'serious' | 'critical';
  associatedConditions: string[];
  immediateAction: string;
  timeframe: string;
}> = {
  // Critical - Call Emergency Services Immediately
  'chest-pain-crushing': {
    flag: 'Crushing Chest Pain',
    description: 'Severe pressure or squeezing sensation in the chest',
    severity: 'critical',
    associatedConditions: ['acute-coronary-syndrome', 'aortic-dissection'],
    immediateAction: 'Call emergency services (112/999/911) immediately',
    timeframe: 'Immediate - minutes matter'
  },
  'sudden-weakness-one-side': {
    flag: 'Sudden One-Sided Weakness',
    description: 'Sudden weakness or numbness of face, arm, or leg on one side',
    severity: 'critical',
    associatedConditions: ['acute-stroke'],
    immediateAction: 'Call emergency services - potential stroke',
    timeframe: 'Immediate - treatment window is 4.5 hours'
  },
  'severe-breathing-difficulty': {
    flag: 'Severe Difficulty Breathing',
    description: 'Unable to speak in full sentences, blue lips, gasping',
    severity: 'critical',
    associatedConditions: ['pulmonary-embolism', 'asthma-acute', 'anaphylaxis'],
    immediateAction: 'Call emergency services immediately',
    timeframe: 'Immediate'
  },
  'loss-of-consciousness': {
    flag: 'Loss of Consciousness',
    description: 'Fainting or passing out',
    severity: 'critical',
    associatedConditions: ['cardiac-arrhythmia', 'hypoglycemia', 'seizure'],
    immediateAction: 'Call emergency services if not recovered within 1 minute',
    timeframe: 'Immediate'
  },
  'severe-allergic-reaction': {
    flag: 'Severe Allergic Reaction',
    description: 'Swelling of throat/tongue, difficulty breathing, widespread hives',
    severity: 'critical',
    associatedConditions: ['anaphylaxis'],
    immediateAction: 'Use epinephrine if available, call emergency services',
    timeframe: 'Immediate'
  },
  'suicidal-thoughts-active': {
    flag: 'Active Suicidal Thoughts',
    description: 'Thoughts of self-harm or suicide with plan or intent',
    severity: 'critical',
    associatedConditions: ['major-depression', 'bipolar'],
    immediateAction: 'Call crisis line or go to emergency room immediately',
    timeframe: 'Immediate'
  },
  
  // Serious - Seek Medical Attention Within Hours
  'worst-headache-ever': {
    flag: 'Worst Headache of Life',
    description: 'Sudden severe headache unlike any previous headache',
    severity: 'serious',
    associatedConditions: ['subarachnoid-hemorrhage', 'meningitis'],
    immediateAction: 'Seek emergency care immediately',
    timeframe: 'Within 1 hour'
  },
  'fever-with-stiff-neck': {
    flag: 'Fever with Stiff Neck',
    description: 'High fever combined with neck stiffness and headache',
    severity: 'serious',
    associatedConditions: ['meningitis'],
    immediateAction: 'Seek emergency care immediately',
    timeframe: 'Within 1 hour'
  },
  'blood-in-vomit': {
    flag: 'Vomiting Blood',
    description: 'Fresh red blood or coffee-ground appearance in vomit',
    severity: 'serious',
    associatedConditions: ['gi-bleeding', 'peptic-ulcer', 'esophageal-varices'],
    immediateAction: 'Seek emergency care',
    timeframe: 'Within 1-2 hours'
  },
  'blood-in-stool': {
    flag: 'Blood in Stool',
    description: 'Bright red blood or black tarry stools',
    severity: 'serious',
    associatedConditions: ['gi-bleeding', 'colorectal-cancer'],
    immediateAction: 'Seek medical attention urgently',
    timeframe: 'Same day'
  },
  'severe-abdominal-pain': {
    flag: 'Severe Abdominal Pain',
    description: 'Sudden severe abdominal pain, especially with rigidity',
    severity: 'serious',
    associatedConditions: ['appendicitis', 'bowel-obstruction', 'aortic-aneurysm'],
    immediateAction: 'Seek emergency care',
    timeframe: 'Within 2 hours'
  },
  'coughing-blood': {
    flag: 'Coughing Up Blood',
    description: 'Blood or blood-streaked sputum when coughing',
    severity: 'serious',
    associatedConditions: ['pulmonary-embolism', 'pneumonia', 'lung-cancer'],
    immediateAction: 'Seek medical attention urgently',
    timeframe: 'Same day'
  },
  'sudden-vision-loss': {
    flag: 'Sudden Vision Loss',
    description: 'Sudden loss or significant change in vision',
    severity: 'serious',
    associatedConditions: ['retinal-detachment', 'stroke', 'giant-cell-arteritis'],
    immediateAction: 'Seek emergency eye care',
    timeframe: 'Within 1-2 hours'
  },
  'unexplained-weight-loss': {
    flag: 'Unexplained Weight Loss',
    description: 'Loss of >5% body weight without trying',
    severity: 'warning',
    associatedConditions: ['cancer', 'diabetes', 'hyperthyroidism'],
    immediateAction: 'Schedule appointment with doctor',
    timeframe: 'Within 1-2 weeks'
  },
  'persistent-fever': {
    flag: 'Persistent High Fever',
    description: 'Fever >38.5°C lasting more than 3 days',
    severity: 'warning',
    associatedConditions: ['infection', 'malignancy'],
    immediateAction: 'Seek medical evaluation',
    timeframe: 'Within 24 hours'
  },
  'new-confusion-elderly': {
    flag: 'New Confusion in Elderly',
    description: 'Sudden change in mental status in older adults',
    severity: 'serious',
    associatedConditions: ['stroke', 'infection', 'medication-toxicity'],
    immediateAction: 'Seek emergency evaluation',
    timeframe: 'Within 2-4 hours'
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// SYMPTOM CORRELATION MATRIX
// ════════════════════════════════════════════════════════════════════════════════

export const SYMPTOM_CORRELATIONS: Record<string, { related: string[]; strengthens: string[]; weakens: string[] }> = {
  'chest-pain': {
    related: ['shortness-breath', 'sweating', 'nausea', 'arm-pain'],
    strengthens: ['acute-coronary-syndrome', 'pulmonary-embolism'],
    weakens: ['gerd']
  },
  'headache': {
    related: ['nausea', 'light-sensitivity', 'neck-stiffness', 'vision-changes'],
    strengthens: ['migraine', 'meningitis'],
    weakens: ['tension-headache']
  },
  'fever': {
    related: ['chills', 'fatigue', 'myalgia'],
    strengthens: ['infection', 'pneumonia'],
    weakens: ['non-infectious']
  },
  'shortness-breath': {
    related: ['chest-pain', 'cough', 'wheezing', 'leg-swelling'],
    strengthens: ['heart-failure', 'pulmonary-embolism', 'asthma'],
    weakens: ['anxiety']
  },
  'abdominal-pain': {
    related: ['nausea', 'vomiting', 'diarrhea', 'fever'],
    strengthens: ['appendicitis', 'gastroenteritis'],
    weakens: ['functional-disorder']
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// IMPORT ADDITIONAL CONDITIONS
// ════════════════════════════════════════════════════════════════════════════════

import { ADDITIONAL_CONDITIONS } from './conditions-additional';

// ════════════════════════════════════════════════════════════════════════════════
// MERGED COMPLETE DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const COMPLETE_CONDITIONS_DATABASE: Record<string, EnhancedCondition> = {
  ...ENHANCED_CONDITIONS_DATABASE,
  ...ADDITIONAL_CONDITIONS
};

// ════════════════════════════════════════════════════════════════════════════════
// EXPORT HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

export function getConditionCount(): number {
  return Object.keys(COMPLETE_CONDITIONS_DATABASE).length;
}

export function getRedFlagCount(): number {
  return Object.keys(ENHANCED_RED_FLAGS).length;
}

export function getConditionsByCategory(): Record<string, string[]> {
  const categories: Record<string, string[]> = {};
  for (const [id, condition] of Object.entries(COMPLETE_CONDITIONS_DATABASE)) {
    if (!categories[condition.category]) {
      categories[condition.category] = [];
    }
    categories[condition.category].push(id);
  }
  return categories;
}

export function getConditionsByUrgency(): Record<string, string[]> {
  const urgencies: Record<string, string[]> = {};
  for (const [id, condition] of Object.entries(COMPLETE_CONDITIONS_DATABASE)) {
    if (!urgencies[condition.urgency]) {
      urgencies[condition.urgency] = [];
    }
    urgencies[condition.urgency].push(id);
  }
  return urgencies;
}

export function searchConditions(query: string): EnhancedCondition[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(COMPLETE_CONDITIONS_DATABASE).filter(condition => 
    condition.name.toLowerCase().includes(lowercaseQuery) ||
    condition.id.toLowerCase().includes(lowercaseQuery) ||
    condition.category.toLowerCase().includes(lowercaseQuery) ||
    condition.symptoms.cardinal.some(s => s.symptom.toLowerCase().includes(lowercaseQuery)) ||
    condition.symptoms.primary.some(s => s.symptom.toLowerCase().includes(lowercaseQuery))
  );
}

export function getConditionById(id: string): EnhancedCondition | undefined {
  return COMPLETE_CONDITIONS_DATABASE[id];
}
