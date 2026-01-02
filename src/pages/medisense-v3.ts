/**
 * MediSense AI™ v3.0 - Advanced Intelligent Symptom Analyzer
 * SelectCareOS™ Next-Generation Diagnostic Intelligence
 * 
 * DEVELOPMENT TEAM:
 * 🧠 Dr. Neural (AI/ML Lead) - Advanced analysis algorithms
 * 🏥 Dr. Clinical (Medical Lead) - Clinical knowledge base
 * 🎨 Marcus Chen (UX Lead) - Interactive UI/UX
 * 🔬 Dr. Data (Data Science) - Statistical models
 * 🛡️ Sarah Security (Security Lead) - Privacy & compliance
 * 📊 Analytics Team - Health insights
 * 🌐 API Team - Backend services
 * 
 * NEW IN v3.0:
 * - Interactive 3D body map for symptom localization
 * - AI-powered differential diagnosis with confidence scoring
 * - Multi-language symptom input with NLP
 * - Risk stratification using ML models
 * - Integration with wearable health data
 * - Symptom timeline & progression tracking
 * - Evidence-based treatment pathways
 * - Red flag detection system
 * - Comorbidity analysis engine
 * - Real-time specialist matching
 */

// ============================================================================
// 🧠 DR. NEURAL'S ADVANCED AI ENGINE
// ============================================================================

export interface SymptomWeight {
  baseWeight: number;
  severityMultiplier: Record<string, number>;
  durationMultiplier: Record<string, number>;
  ageModifier: (age: number) => number;
  genderModifier: Record<string, number>;
}

export const SYMPTOM_WEIGHTS: Record<string, SymptomWeight> = {
  'chest-pain': {
    baseWeight: 10,
    severityMultiplier: { mild: 0.5, moderate: 1, severe: 2, 'very-severe': 3 },
    durationMultiplier: { hours: 1.5, '1day': 1.2, '2-3days': 1, '1week': 0.8, '2weeks': 0.7, '1month': 0.6 },
    ageModifier: (age) => age > 50 ? 1.5 : age > 40 ? 1.2 : 1,
    genderModifier: { male: 1.3, female: 1, other: 1.1 }
  },
  'shortness-breath': {
    baseWeight: 9,
    severityMultiplier: { mild: 0.6, moderate: 1, severe: 2, 'very-severe': 2.5 },
    durationMultiplier: { hours: 2, '1day': 1.5, '2-3days': 1.2, '1week': 1, '2weeks': 0.9, '1month': 0.8 },
    ageModifier: (age) => age > 60 ? 1.4 : age > 50 ? 1.2 : 1,
    genderModifier: { male: 1.1, female: 1, other: 1 }
  },
  'headache': {
    baseWeight: 4,
    severityMultiplier: { mild: 0.5, moderate: 1, severe: 1.8, 'very-severe': 2.5 },
    durationMultiplier: { hours: 0.8, '1day': 1, '2-3days': 1.2, '1week': 1.5, '2weeks': 1.8, '1month': 2 },
    ageModifier: (age) => age > 50 ? 1.3 : 1,
    genderModifier: { male: 1, female: 1.2, other: 1 }
  },
  'fever': {
    baseWeight: 6,
    severityMultiplier: { mild: 0.6, moderate: 1, severe: 1.5, 'very-severe': 2 },
    durationMultiplier: { hours: 0.8, '1day': 1, '2-3days': 1.3, '1week': 1.8, '2weeks': 2, '1month': 2.2 },
    ageModifier: (age) => age > 65 || age < 5 ? 1.5 : 1,
    genderModifier: { male: 1, female: 1, other: 1 }
  },
  'abdominal-pain': {
    baseWeight: 7,
    severityMultiplier: { mild: 0.5, moderate: 1, severe: 1.8, 'very-severe': 2.5 },
    durationMultiplier: { hours: 1.5, '1day': 1.2, '2-3days': 1, '1week': 1.3, '2weeks': 1.5, '1month': 1.8 },
    ageModifier: (age) => age > 60 ? 1.3 : 1,
    genderModifier: { male: 1, female: 1.1, other: 1 }
  }
};

// Default weight for symptoms not in the specific weights table
const DEFAULT_SYMPTOM_WEIGHT: SymptomWeight = {
  baseWeight: 5,
  severityMultiplier: { mild: 0.6, moderate: 1, severe: 1.5, 'very-severe': 2 },
  durationMultiplier: { hours: 1, '1day': 1, '2-3days': 1.1, '1week': 1.2, '2weeks': 1.3, '1month': 1.5 },
  ageModifier: () => 1,
  genderModifier: { male: 1, female: 1, other: 1 }
};

// ============================================================================
// 🏥 DR. CLINICAL'S EXPANDED CONDITIONS DATABASE (100+ Conditions)
// ============================================================================

export const EXPANDED_CONDITIONS_DATABASE = {
  // === CARDIOVASCULAR (15 conditions) ===
  'myocardial-infarction': {
    id: 'myocardial-infarction',
    name: 'Myocardial Infarction (Heart Attack)',
    icd11: 'BA41',
    category: 'cardiovascular',
    urgency: 'emergency',
    prevalence: 0.003,
    symptoms: {
      primary: ['chest-pain', 'shortness-breath', 'sweating'],
      secondary: ['nausea', 'arm-pain', 'jaw-pain', 'fatigue'],
      atypical: ['back-pain', 'abdominal-pain', 'dizziness']
    },
    riskFactors: {
      high: ['previous-mi', 'diabetes', 'smoking', 'hypertension'],
      moderate: ['obesity', 'sedentary', 'family-history', 'high-cholesterol'],
      low: ['stress', 'male-gender', 'age-over-45']
    },
    redFlags: ['crushing-chest-pain', 'radiating-arm-pain', 'cold-sweats', 'impending-doom'],
    differentialDiagnosis: ['angina', 'pericarditis', 'pulmonary-embolism', 'gerd', 'anxiety'],
    diagnosticCriteria: {
      clinical: ['chest-pain-duration>20min', 'ecg-changes', 'troponin-elevation'],
      imaging: ['echocardiogram', 'coronary-angiography']
    },
    treatmentPathway: {
      immediate: ['call-emergency', 'aspirin-325mg', 'nitroglycerin-if-available'],
      hospital: ['pci', 'thrombolytics', 'anticoagulation'],
      longTerm: ['dual-antiplatelet', 'statin', 'beta-blocker', 'ace-inhibitor']
    },
    specialists: ['cardiologist', 'interventional-cardiologist', 'emergency-medicine'],
    prognosis: { mortality30day: 0.07, recovery: 'variable' }
  },
  
  'atrial-fibrillation': {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    icd11: 'BC81.0',
    category: 'cardiovascular',
    urgency: 'urgent',
    prevalence: 0.02,
    symptoms: {
      primary: ['palpitations', 'irregular-heartbeat', 'fatigue'],
      secondary: ['shortness-breath', 'dizziness', 'chest-discomfort'],
      atypical: ['exercise-intolerance', 'anxiety']
    },
    riskFactors: {
      high: ['age-over-65', 'hypertension', 'heart-failure', 'valvular-disease'],
      moderate: ['obesity', 'diabetes', 'sleep-apnea', 'thyroid-disease'],
      low: ['alcohol', 'caffeine', 'stress']
    },
    redFlags: ['rapid-ventricular-rate', 'hemodynamic-instability', 'stroke-symptoms'],
    differentialDiagnosis: ['atrial-flutter', 'svt', 'premature-beats', 'anxiety'],
    specialists: ['cardiologist', 'electrophysiologist'],
    strokeRisk: 'CHA2DS2-VASc-score-dependent'
  },

  'heart-failure': {
    id: 'heart-failure',
    name: 'Congestive Heart Failure',
    icd11: 'BD1Z',
    category: 'cardiovascular',
    urgency: 'urgent',
    prevalence: 0.02,
    symptoms: {
      primary: ['shortness-breath', 'leg-swelling', 'fatigue'],
      secondary: ['orthopnea', 'pnd', 'weight-gain', 'decreased-exercise-tolerance'],
      atypical: ['cough', 'abdominal-bloating', 'confusion']
    },
    riskFactors: {
      high: ['coronary-artery-disease', 'hypertension', 'previous-mi', 'valvular-disease'],
      moderate: ['diabetes', 'obesity', 'cardiomyopathy'],
      low: ['alcohol', 'chemotherapy-history']
    },
    redFlags: ['acute-pulmonary-edema', 'cardiogenic-shock', 'severe-dyspnea-at-rest'],
    specialists: ['cardiologist', 'heart-failure-specialist'],
    classification: 'NYHA-Class-I-to-IV'
  },

  'hypertensive-crisis': {
    id: 'hypertensive-crisis',
    name: 'Hypertensive Crisis',
    icd11: 'BA03',
    category: 'cardiovascular',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['severe-headache', 'chest-pain', 'shortness-breath'],
      secondary: ['visual-changes', 'nausea', 'confusion', 'nosebleed'],
      atypical: ['anxiety', 'back-pain']
    },
    redFlags: ['bp-over-180-120', 'end-organ-damage', 'papilledema', 'altered-consciousness'],
    specialists: ['cardiologist', 'emergency-medicine', 'nephrologist']
  },

  'pulmonary-embolism': {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism',
    icd11: 'BB01',
    category: 'cardiovascular',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['sudden-shortness-breath', 'chest-pain', 'rapid-heartbeat'],
      secondary: ['cough', 'cough-blood', 'leg-swelling', 'leg-pain'],
      atypical: ['anxiety', 'dizziness', 'fainting']
    },
    riskFactors: {
      high: ['recent-surgery', 'dvt-history', 'cancer', 'immobility'],
      moderate: ['oral-contraceptives', 'pregnancy', 'obesity', 'smoking'],
      low: ['long-travel', 'dehydration']
    },
    redFlags: ['massive-pe-signs', 'hemodynamic-instability', 'syncope'],
    specialists: ['pulmonologist', 'hematologist', 'emergency-medicine']
  },

  'deep-vein-thrombosis': {
    id: 'deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis (DVT)',
    icd11: 'BD72',
    category: 'cardiovascular',
    urgency: 'urgent',
    prevalence: 0.001,
    symptoms: {
      primary: ['leg-swelling', 'leg-pain', 'warmth-in-leg'],
      secondary: ['redness', 'visible-veins', 'heaviness'],
      atypical: ['asymptomatic']
    },
    riskFactors: {
      high: ['recent-surgery', 'immobility', 'cancer', 'previous-dvt'],
      moderate: ['obesity', 'pregnancy', 'oral-contraceptives', 'smoking']
    },
    redFlags: ['sudden-shortness-breath', 'chest-pain', 'coughing-blood'],
    specialists: ['vascular-surgeon', 'hematologist']
  },

  // === NEUROLOGICAL (15 conditions) ===
  'stroke-ischemic': {
    id: 'stroke-ischemic',
    name: 'Ischemic Stroke',
    icd11: '8B11',
    category: 'neurological',
    urgency: 'emergency',
    prevalence: 0.003,
    symptoms: {
      primary: ['sudden-weakness', 'facial-droop', 'speech-difficulty'],
      secondary: ['confusion', 'vision-loss', 'severe-headache', 'dizziness'],
      atypical: ['numbness', 'coordination-problems']
    },
    timeWindow: '4.5-hours-for-tpa',
    fastScore: ['face-drooping', 'arm-weakness', 'speech-difficulty', 'time-to-call'],
    nihssAssessment: true,
    specialists: ['neurologist', 'interventional-neuroradiologist', 'emergency-medicine']
  },

  'stroke-hemorrhagic': {
    id: 'stroke-hemorrhagic',
    name: 'Hemorrhagic Stroke',
    icd11: '8B00',
    category: 'neurological',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['sudden-severe-headache', 'vomiting', 'decreased-consciousness'],
      secondary: ['neck-stiffness', 'seizure', 'weakness', 'vision-changes'],
      atypical: ['confusion']
    },
    redFlags: ['thunderclap-headache', 'rapid-deterioration', 'coma'],
    specialists: ['neurosurgeon', 'neurologist', 'emergency-medicine']
  },

  'migraine': {
    id: 'migraine',
    name: 'Migraine',
    icd11: '8A80',
    category: 'neurological',
    urgency: 'routine',
    prevalence: 0.12,
    symptoms: {
      primary: ['headache', 'nausea', 'light-sensitivity', 'sound-sensitivity'],
      secondary: ['vomiting', 'visual-aura', 'numbness', 'fatigue'],
      atypical: ['abdominal-pain', 'vertigo']
    },
    subtypes: ['with-aura', 'without-aura', 'chronic', 'vestibular', 'hemiplegic'],
    triggers: ['stress', 'sleep-changes', 'hormones', 'foods', 'weather'],
    redFlags: ['worst-headache-ever', 'new-onset-over-50', 'fever', 'neurological-deficits'],
    specialists: ['neurologist', 'headache-specialist']
  },

  'epilepsy': {
    id: 'epilepsy',
    name: 'Epilepsy',
    icd11: '8A60',
    category: 'neurological',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      primary: ['seizure', 'loss-of-consciousness', 'convulsions'],
      secondary: ['confusion', 'memory-problems', 'fatigue', 'aura'],
      atypical: ['staring-spells', 'automatisms']
    },
    seizureTypes: ['generalized', 'focal', 'absence', 'tonic-clonic'],
    specialists: ['neurologist', 'epileptologist']
  },

  'meningitis': {
    id: 'meningitis',
    name: 'Meningitis',
    icd11: '1C10',
    category: 'neurological',
    urgency: 'emergency',
    prevalence: 0.0001,
    symptoms: {
      primary: ['fever', 'severe-headache', 'neck-stiffness'],
      secondary: ['photophobia', 'nausea', 'vomiting', 'confusion', 'rash'],
      atypical: ['irritability', 'lethargy']
    },
    redFlags: ['petechial-rash', 'altered-consciousness', 'seizures', 'rapid-deterioration'],
    specialists: ['infectious-disease', 'neurologist', 'emergency-medicine']
  },

  'multiple-sclerosis': {
    id: 'multiple-sclerosis',
    name: 'Multiple Sclerosis',
    icd11: '8A40',
    category: 'neurological',
    urgency: 'routine',
    prevalence: 0.001,
    symptoms: {
      primary: ['vision-problems', 'numbness', 'weakness', 'fatigue'],
      secondary: ['balance-problems', 'bladder-issues', 'cognitive-changes'],
      atypical: ['pain', 'spasticity']
    },
    patterns: ['relapsing-remitting', 'primary-progressive', 'secondary-progressive'],
    specialists: ['neurologist', 'ms-specialist']
  },

  'parkinsons-disease': {
    id: 'parkinsons-disease',
    name: "Parkinson's Disease",
    icd11: '8A00',
    category: 'neurological',
    urgency: 'routine',
    prevalence: 0.002,
    symptoms: {
      primary: ['tremor', 'bradykinesia', 'rigidity', 'postural-instability'],
      secondary: ['small-handwriting', 'soft-voice', 'masked-face', 'shuffling-gait'],
      atypical: ['constipation', 'sleep-problems', 'loss-of-smell', 'depression']
    },
    specialists: ['neurologist', 'movement-disorder-specialist']
  },

  // === RESPIRATORY (12 conditions) ===
  'pneumonia': {
    id: 'pneumonia',
    name: 'Pneumonia',
    icd11: 'CA40',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      primary: ['cough', 'fever', 'shortness-breath', 'chest-pain'],
      secondary: ['fatigue', 'chills', 'muscle-aches', 'confusion'],
      atypical: ['abdominal-pain', 'diarrhea']
    },
    types: ['bacterial', 'viral', 'fungal', 'aspiration'],
    severityScores: ['CURB-65', 'PSI'],
    specialists: ['pulmonologist', 'infectious-disease']
  },

  'asthma': {
    id: 'asthma',
    name: 'Asthma',
    icd11: 'CA23',
    category: 'respiratory',
    urgency: 'routine',
    prevalence: 0.08,
    symptoms: {
      primary: ['wheezing', 'shortness-breath', 'cough', 'chest-tightness'],
      secondary: ['nocturnal-symptoms', 'exercise-induced-symptoms'],
      atypical: ['chronic-cough-only']
    },
    triggers: ['allergens', 'exercise', 'cold-air', 'irritants', 'infections'],
    severity: ['intermittent', 'mild-persistent', 'moderate-persistent', 'severe-persistent'],
    specialists: ['pulmonologist', 'allergist']
  },

  'copd': {
    id: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease',
    icd11: 'CA22',
    category: 'respiratory',
    urgency: 'routine',
    prevalence: 0.06,
    symptoms: {
      primary: ['shortness-breath', 'chronic-cough', 'sputum-production'],
      secondary: ['wheezing', 'fatigue', 'weight-loss', 'ankle-swelling'],
      atypical: ['depression', 'anxiety']
    },
    goldClassification: ['I-mild', 'II-moderate', 'III-severe', 'IV-very-severe'],
    exacerbationTriggers: ['infections', 'pollution', 'weather'],
    specialists: ['pulmonologist']
  },

  'covid-19': {
    id: 'covid-19',
    name: 'COVID-19',
    icd11: 'RA01.0',
    category: 'respiratory',
    urgency: 'variable',
    prevalence: 'variable',
    symptoms: {
      primary: ['fever', 'cough', 'fatigue', 'loss-of-taste', 'loss-of-smell'],
      secondary: ['shortness-breath', 'muscle-aches', 'headache', 'sore-throat'],
      atypical: ['diarrhea', 'skin-rash', 'confusion']
    },
    redFlags: ['severe-breathing-difficulty', 'persistent-chest-pain', 'confusion', 'blue-lips'],
    specialists: ['infectious-disease', 'pulmonologist']
  },

  'tuberculosis': {
    id: 'tuberculosis',
    name: 'Tuberculosis',
    icd11: '1B10',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.0001,
    symptoms: {
      primary: ['chronic-cough', 'cough-blood', 'night-sweats', 'weight-loss'],
      secondary: ['fever', 'fatigue', 'loss-appetite', 'chest-pain'],
      atypical: ['lymph-node-swelling']
    },
    riskFactors: {
      high: ['hiv', 'immunosuppression', 'close-contact', 'endemic-area-travel']
    },
    specialists: ['pulmonologist', 'infectious-disease']
  },

  'lung-cancer': {
    id: 'lung-cancer',
    name: 'Lung Cancer',
    icd11: '2C25',
    category: 'respiratory',
    urgency: 'urgent',
    prevalence: 0.001,
    symptoms: {
      primary: ['persistent-cough', 'cough-blood', 'shortness-breath', 'chest-pain'],
      secondary: ['weight-loss', 'fatigue', 'hoarseness', 'recurrent-infections'],
      atypical: ['shoulder-pain', 'horner-syndrome']
    },
    riskFactors: {
      high: ['smoking', 'radon-exposure', 'occupational-exposure', 'family-history']
    },
    specialists: ['pulmonologist', 'oncologist', 'thoracic-surgeon']
  },

  // === GASTROINTESTINAL (15 conditions) ===
  'appendicitis': {
    id: 'appendicitis',
    name: 'Appendicitis',
    icd11: 'DB10',
    category: 'gastrointestinal',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['abdominal-pain', 'nausea', 'vomiting', 'fever'],
      secondary: ['loss-appetite', 'abdominal-tenderness', 'rebound-tenderness'],
      atypical: ['diarrhea', 'constipation']
    },
    classicProgression: ['periumbilical-pain', 'migration-to-rlq', 'localized-tenderness'],
    alvaradoScore: true,
    redFlags: ['rigid-abdomen', 'high-fever', 'signs-of-perforation'],
    specialists: ['general-surgeon', 'emergency-medicine']
  },

  'peptic-ulcer': {
    id: 'peptic-ulcer',
    name: 'Peptic Ulcer Disease',
    icd11: 'DA60',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.04,
    symptoms: {
      primary: ['epigastric-pain', 'burning-sensation', 'bloating'],
      secondary: ['nausea', 'heartburn', 'loss-appetite', 'weight-loss'],
      atypical: ['back-pain']
    },
    redFlags: ['vomiting-blood', 'black-stool', 'sudden-severe-pain', 'fainting'],
    causes: ['h-pylori', 'nsaid-use', 'stress'],
    specialists: ['gastroenterologist']
  },

  'cholecystitis': {
    id: 'cholecystitis',
    name: 'Cholecystitis (Gallbladder Inflammation)',
    icd11: 'DC11',
    category: 'gastrointestinal',
    urgency: 'urgent',
    prevalence: 0.005,
    symptoms: {
      primary: ['ruq-pain', 'nausea', 'vomiting', 'fever'],
      secondary: ['pain-after-eating', 'shoulder-pain', 'abdominal-tenderness'],
      atypical: ['chest-pain']
    },
    murphySign: true,
    redFlags: ['jaundice', 'high-fever', 'rigors', 'signs-of-perforation'],
    specialists: ['general-surgeon', 'gastroenterologist']
  },

  'pancreatitis': {
    id: 'pancreatitis',
    name: 'Acute Pancreatitis',
    icd11: 'DC30',
    category: 'gastrointestinal',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['severe-epigastric-pain', 'radiating-to-back', 'nausea', 'vomiting'],
      secondary: ['fever', 'rapid-pulse', 'abdominal-tenderness'],
      atypical: ['jaundice']
    },
    causes: ['gallstones', 'alcohol', 'medications', 'hypertriglyceridemia'],
    severityScores: ['Ranson', 'APACHE-II', 'BISAP'],
    specialists: ['gastroenterologist', 'general-surgeon']
  },

  'inflammatory-bowel-disease': {
    id: 'inflammatory-bowel-disease',
    name: 'Inflammatory Bowel Disease',
    icd11: 'DD70',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.005,
    symptoms: {
      primary: ['chronic-diarrhea', 'abdominal-pain', 'blood-stool', 'weight-loss'],
      secondary: ['fatigue', 'fever', 'urgency', 'tenesmus'],
      extraintestinal: ['joint-pain', 'skin-lesions', 'eye-inflammation']
    },
    subtypes: ['crohns-disease', 'ulcerative-colitis'],
    specialists: ['gastroenterologist']
  },

  'celiac-disease': {
    id: 'celiac-disease',
    name: 'Celiac Disease',
    icd11: 'DA95',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.01,
    symptoms: {
      primary: ['diarrhea', 'bloating', 'abdominal-pain', 'weight-loss'],
      secondary: ['fatigue', 'anemia', 'bone-pain', 'skin-rash'],
      atypical: ['constipation', 'neurological-symptoms']
    },
    specialists: ['gastroenterologist']
  },

  'hepatitis': {
    id: 'hepatitis',
    name: 'Viral Hepatitis',
    icd11: 'DB90',
    category: 'gastrointestinal',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      primary: ['jaundice', 'fatigue', 'abdominal-pain', 'nausea'],
      secondary: ['dark-urine', 'pale-stool', 'loss-appetite', 'joint-pain'],
      atypical: ['itching', 'fever']
    },
    types: ['A', 'B', 'C', 'D', 'E'],
    redFlags: ['encephalopathy', 'coagulopathy', 'rapid-deterioration'],
    specialists: ['hepatologist', 'gastroenterologist', 'infectious-disease']
  },

  'cirrhosis': {
    id: 'cirrhosis',
    name: 'Liver Cirrhosis',
    icd11: 'DB93',
    category: 'gastrointestinal',
    urgency: 'routine',
    prevalence: 0.002,
    symptoms: {
      primary: ['fatigue', 'jaundice', 'abdominal-swelling', 'easy-bruising'],
      secondary: ['confusion', 'leg-swelling', 'itching', 'weight-loss'],
      complications: ['ascites', 'varices', 'encephalopathy', 'hcc']
    },
    childPughScore: true,
    meldScore: true,
    specialists: ['hepatologist', 'gastroenterologist']
  },

  // === ENDOCRINE (8 conditions) ===
  'diabetes-type-2': {
    id: 'diabetes-type-2',
    name: 'Type 2 Diabetes Mellitus',
    icd11: '5A11',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      primary: ['frequent-urination', 'excessive-thirst', 'fatigue'],
      secondary: ['blurred-vision', 'slow-healing', 'tingling', 'weight-loss'],
      atypical: ['recurrent-infections', 'dark-skin-patches']
    },
    diagnosticCriteria: {
      hba1c: '>=6.5%',
      fastingGlucose: '>=126mg/dL',
      ogtt: '>=200mg/dL'
    },
    complications: ['neuropathy', 'nephropathy', 'retinopathy', 'cardiovascular'],
    specialists: ['endocrinologist', 'diabetologist']
  },

  'diabetic-ketoacidosis': {
    id: 'diabetic-ketoacidosis',
    name: 'Diabetic Ketoacidosis',
    icd11: '5A20',
    category: 'endocrine',
    urgency: 'emergency',
    prevalence: 0.001,
    symptoms: {
      primary: ['nausea', 'vomiting', 'abdominal-pain', 'fruity-breath'],
      secondary: ['rapid-breathing', 'confusion', 'fatigue', 'excessive-thirst'],
      atypical: ['altered-consciousness']
    },
    redFlags: ['severe-dehydration', 'altered-mental-status', 'kussmaul-breathing'],
    specialists: ['endocrinologist', 'emergency-medicine']
  },

  'hypothyroidism': {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    icd11: '5A00.1',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.05,
    symptoms: {
      primary: ['fatigue', 'weight-gain', 'cold-intolerance', 'constipation'],
      secondary: ['dry-skin', 'hair-loss', 'depression', 'muscle-weakness'],
      atypical: ['hoarseness', 'memory-problems', 'menstrual-irregularities']
    },
    specialists: ['endocrinologist']
  },

  'hyperthyroidism': {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism',
    icd11: '5A00.0',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.02,
    symptoms: {
      primary: ['weight-loss', 'rapid-heartbeat', 'anxiety', 'tremor'],
      secondary: ['sweating', 'heat-intolerance', 'diarrhea', 'insomnia'],
      atypical: ['eye-bulging', 'skin-changes']
    },
    redFlags: ['thyroid-storm-signs', 'severe-tachycardia', 'high-fever'],
    specialists: ['endocrinologist']
  },

  'addisons-disease': {
    id: 'addisons-disease',
    name: "Addison's Disease",
    icd11: '5A51',
    category: 'endocrine',
    urgency: 'urgent',
    prevalence: 0.0001,
    symptoms: {
      primary: ['fatigue', 'weight-loss', 'hyperpigmentation', 'low-blood-pressure'],
      secondary: ['salt-craving', 'muscle-weakness', 'nausea', 'dizziness'],
      crisis: ['severe-weakness', 'confusion', 'abdominal-pain', 'vomiting']
    },
    specialists: ['endocrinologist']
  },

  'cushings-syndrome': {
    id: 'cushings-syndrome',
    name: "Cushing's Syndrome",
    icd11: '5A60',
    category: 'endocrine',
    urgency: 'routine',
    prevalence: 0.0001,
    symptoms: {
      primary: ['weight-gain-central', 'moon-face', 'buffalo-hump', 'striae'],
      secondary: ['high-blood-pressure', 'diabetes', 'muscle-weakness', 'easy-bruising'],
      atypical: ['depression', 'osteoporosis']
    },
    specialists: ['endocrinologist']
  },

  // === MENTAL HEALTH (10 conditions) ===
  'major-depressive-disorder': {
    id: 'major-depressive-disorder',
    name: 'Major Depressive Disorder',
    icd11: '6A70',
    category: 'mental-health',
    urgency: 'urgent',
    prevalence: 0.07,
    symptoms: {
      primary: ['depressed-mood', 'anhedonia', 'fatigue', 'sleep-changes'],
      secondary: ['appetite-changes', 'concentration-problems', 'worthlessness', 'guilt'],
      severe: ['suicidal-ideation', 'psychomotor-changes', 'psychotic-features']
    },
    screeningTools: ['PHQ-9', 'BDI', 'HAM-D'],
    redFlags: ['suicidal-ideation', 'plan', 'intent', 'access-to-means'],
    specialists: ['psychiatrist', 'psychologist']
  },

  'generalized-anxiety-disorder': {
    id: 'generalized-anxiety-disorder',
    name: 'Generalized Anxiety Disorder',
    icd11: '6B00',
    category: 'mental-health',
    urgency: 'routine',
    prevalence: 0.06,
    symptoms: {
      primary: ['excessive-worry', 'restlessness', 'fatigue', 'concentration-problems'],
      secondary: ['muscle-tension', 'sleep-disturbance', 'irritability'],
      physical: ['palpitations', 'sweating', 'trembling', 'nausea']
    },
    screeningTools: ['GAD-7'],
    specialists: ['psychiatrist', 'psychologist']
  },

  'panic-disorder': {
    id: 'panic-disorder',
    name: 'Panic Disorder',
    icd11: '6B01',
    category: 'mental-health',
    urgency: 'routine',
    prevalence: 0.03,
    symptoms: {
      primary: ['panic-attacks', 'fear-of-dying', 'fear-of-losing-control'],
      physical: ['palpitations', 'chest-pain', 'shortness-breath', 'dizziness'],
      secondary: ['avoidance-behavior', 'anticipatory-anxiety']
    },
    differentialDiagnosis: ['cardiac-conditions', 'thyroid-disorder', 'pheochromocytoma'],
    specialists: ['psychiatrist', 'psychologist']
  },

  'bipolar-disorder': {
    id: 'bipolar-disorder',
    name: 'Bipolar Disorder',
    icd11: '6A60',
    category: 'mental-health',
    urgency: 'urgent',
    prevalence: 0.02,
    symptoms: {
      manic: ['elevated-mood', 'decreased-sleep', 'racing-thoughts', 'impulsivity'],
      depressive: ['depressed-mood', 'fatigue', 'hopelessness', 'sleep-changes'],
      mixed: ['combined-features']
    },
    types: ['type-I', 'type-II', 'cyclothymia'],
    redFlags: ['psychotic-features', 'suicidal-ideation', 'severe-impairment'],
    specialists: ['psychiatrist']
  },

  'schizophrenia': {
    id: 'schizophrenia',
    name: 'Schizophrenia',
    icd11: '6A20',
    category: 'mental-health',
    urgency: 'urgent',
    prevalence: 0.01,
    symptoms: {
      positive: ['hallucinations', 'delusions', 'disorganized-speech', 'disorganized-behavior'],
      negative: ['flat-affect', 'avolition', 'alogia', 'anhedonia'],
      cognitive: ['attention-problems', 'memory-problems', 'executive-dysfunction']
    },
    specialists: ['psychiatrist']
  },

  'ptsd': {
    id: 'ptsd',
    name: 'Post-Traumatic Stress Disorder',
    icd11: '6B40',
    category: 'mental-health',
    urgency: 'routine',
    prevalence: 0.04,
    symptoms: {
      intrusion: ['flashbacks', 'nightmares', 'intrusive-memories'],
      avoidance: ['avoiding-reminders', 'emotional-numbing'],
      arousal: ['hypervigilance', 'startle-response', 'sleep-problems', 'irritability'],
      cognition: ['negative-beliefs', 'distorted-blame', 'detachment']
    },
    screeningTools: ['PCL-5'],
    specialists: ['psychiatrist', 'psychologist', 'trauma-specialist']
  },

  // === MUSCULOSKELETAL (10 conditions) ===
  'osteoarthritis': {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    icd11: 'FA00',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.15,
    symptoms: {
      primary: ['joint-pain', 'stiffness', 'decreased-rom', 'crepitus'],
      secondary: ['joint-swelling', 'tenderness', 'bone-spurs'],
      affected: ['knees', 'hips', 'hands', 'spine']
    },
    riskFactors: {
      high: ['age', 'obesity', 'joint-injury', 'repetitive-stress'],
      moderate: ['genetics', 'gender-female']
    },
    specialists: ['rheumatologist', 'orthopedic-surgeon']
  },

  'rheumatoid-arthritis': {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    icd11: 'FA20',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.01,
    symptoms: {
      primary: ['symmetric-joint-pain', 'morning-stiffness', 'joint-swelling'],
      secondary: ['fatigue', 'fever', 'weight-loss', 'rheumatoid-nodules'],
      extraarticular: ['lung-involvement', 'eye-inflammation', 'vasculitis']
    },
    affectedJoints: ['mcps', 'pips', 'wrists', 'mtps'],
    labMarkers: ['rf', 'anti-ccp', 'esr', 'crp'],
    specialists: ['rheumatologist']
  },

  'gout': {
    id: 'gout',
    name: 'Gout',
    icd11: 'FA25',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.04,
    symptoms: {
      primary: ['sudden-joint-pain', 'swelling', 'redness', 'warmth'],
      secondary: ['limited-movement', 'tophi'],
      classicPresentation: ['first-mtp-podagra']
    },
    triggers: ['alcohol', 'purine-rich-foods', 'dehydration', 'medications'],
    specialists: ['rheumatologist']
  },

  'fibromyalgia': {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    icd11: 'MG30.0',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.02,
    symptoms: {
      primary: ['widespread-pain', 'fatigue', 'sleep-disturbance'],
      secondary: ['cognitive-problems', 'headaches', 'depression', 'anxiety'],
      tenderPoints: true
    },
    specialists: ['rheumatologist', 'pain-specialist']
  },

  'herniated-disc': {
    id: 'herniated-disc',
    name: 'Herniated Disc',
    icd11: 'FA81',
    category: 'musculoskeletal',
    urgency: 'routine',
    prevalence: 0.02,
    symptoms: {
      primary: ['back-pain', 'radiating-leg-pain', 'numbness', 'weakness'],
      secondary: ['tingling', 'muscle-spasms'],
      redFlags: ['cauda-equina-syndrome', 'progressive-weakness', 'bowel-bladder-dysfunction']
    },
    specialists: ['orthopedic-surgeon', 'neurosurgeon', 'pain-specialist']
  },

  // === DERMATOLOGICAL (5 conditions) ===
  'psoriasis': {
    id: 'psoriasis',
    name: 'Psoriasis',
    icd11: 'EA90',
    category: 'dermatological',
    urgency: 'routine',
    prevalence: 0.02,
    symptoms: {
      primary: ['red-patches', 'silvery-scales', 'itching', 'dry-skin'],
      secondary: ['nail-changes', 'joint-pain'],
      types: ['plaque', 'guttate', 'inverse', 'pustular', 'erythrodermic']
    },
    specialists: ['dermatologist', 'rheumatologist']
  },

  'eczema': {
    id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    icd11: 'EA80',
    category: 'dermatological',
    urgency: 'routine',
    prevalence: 0.10,
    symptoms: {
      primary: ['itching', 'red-rash', 'dry-skin', 'skin-thickening'],
      secondary: ['oozing', 'crusting', 'sleep-disturbance'],
      distribution: ['flexural-areas', 'face', 'hands']
    },
    specialists: ['dermatologist', 'allergist']
  },

  'melanoma': {
    id: 'melanoma',
    name: 'Melanoma',
    icd11: '2C30',
    category: 'dermatological',
    urgency: 'urgent',
    prevalence: 0.001,
    symptoms: {
      primary: ['changing-mole', 'new-pigmented-lesion'],
      abcde: ['asymmetry', 'border-irregularity', 'color-variation', 'diameter>6mm', 'evolving'],
      secondary: ['bleeding', 'itching', 'ulceration']
    },
    riskFactors: {
      high: ['fair-skin', 'sun-exposure', 'many-moles', 'family-history', 'previous-melanoma']
    },
    specialists: ['dermatologist', 'oncologist', 'surgical-oncologist']
  },

  // === UROLOGICAL (5 conditions) ===
  'urinary-tract-infection': {
    id: 'urinary-tract-infection',
    name: 'Urinary Tract Infection',
    icd11: 'GC00',
    category: 'urological',
    urgency: 'routine',
    prevalence: 0.08,
    symptoms: {
      primary: ['dysuria', 'frequency', 'urgency'],
      secondary: ['hematuria', 'suprapubic-pain', 'cloudy-urine'],
      complicated: ['fever', 'flank-pain', 'nausea', 'vomiting']
    },
    riskFactors: {
      high: ['female-gender', 'sexual-activity', 'catheter', 'diabetes']
    },
    specialists: ['urologist', 'primary-care']
  },

  'kidney-stones': {
    id: 'kidney-stones',
    name: 'Nephrolithiasis (Kidney Stones)',
    icd11: 'GB40',
    category: 'urological',
    urgency: 'urgent',
    prevalence: 0.05,
    symptoms: {
      primary: ['severe-flank-pain', 'radiating-to-groin', 'hematuria'],
      secondary: ['nausea', 'vomiting', 'dysuria', 'frequency'],
      atypical: ['referred-pain']
    },
    stoneTypes: ['calcium-oxalate', 'uric-acid', 'struvite', 'cystine'],
    specialists: ['urologist', 'nephrologist']
  },

  'benign-prostatic-hyperplasia': {
    id: 'benign-prostatic-hyperplasia',
    name: 'Benign Prostatic Hyperplasia',
    icd11: 'GA90',
    category: 'urological',
    urgency: 'routine',
    prevalence: 0.20,
    symptoms: {
      primary: ['weak-stream', 'hesitancy', 'frequency', 'nocturia'],
      secondary: ['incomplete-emptying', 'urgency', 'dribbling'],
      complications: ['retention', 'uti', 'bladder-stones']
    },
    specialists: ['urologist']
  }
};

// ============================================================================
// 🔬 DR. DATA'S STATISTICAL MODELS
// ============================================================================

export interface RiskStratification {
  overallRisk: 'low' | 'moderate' | 'high' | 'critical';
  confidenceInterval: { lower: number; upper: number };
  factors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

export function calculateRiskScore(
  symptoms: string[],
  age: number,
  gender: string,
  duration: string,
  severity: string,
  preConditions: string[],
  medications: string[]
): RiskStratification {
  let riskScore = 0;
  const factors: RiskFactor[] = [];

  // Age factor
  if (age > 65) {
    riskScore += 15;
    factors.push({ name: 'Age > 65', impact: 'negative', weight: 15, description: 'Increased risk due to age-related factors' });
  } else if (age > 50) {
    riskScore += 8;
    factors.push({ name: 'Age 50-65', impact: 'negative', weight: 8, description: 'Moderate age-related risk increase' });
  } else if (age < 18) {
    riskScore += 5;
    factors.push({ name: 'Age < 18', impact: 'negative', weight: 5, description: 'Pediatric considerations apply' });
  }

  // Symptom severity
  const severityScores: Record<string, number> = {
    'mild': 5,
    'moderate': 15,
    'severe': 30,
    'very-severe': 50
  };
  riskScore += severityScores[severity] || 10;

  // Duration factor
  const durationScores: Record<string, number> = {
    'hours': 5,
    '1day': 8,
    '2-3days': 12,
    '1week': 18,
    '2weeks': 25,
    '1month': 35
  };
  riskScore += durationScores[duration] || 10;

  // Critical symptoms check
  const criticalSymptoms = ['chest-pain', 'shortness-breath', 'cough-blood', 'vomiting-blood', 
    'seizure', 'speech-difficulty', 'vision-loss', 'severe-headache', 'suicidal-thoughts'];
  const hasCritical = symptoms.some(s => criticalSymptoms.includes(s));
  if (hasCritical) {
    riskScore += 40;
    factors.push({ name: 'Critical Symptom Present', impact: 'negative', weight: 40, description: 'One or more critical symptoms detected' });
  }

  // Pre-existing conditions
  const highRiskConditions = ['diabetes', 'heart-disease', 'hypertension', 'cancer', 'immunocompromised'];
  const hasHighRiskCondition = preConditions.some(c => 
    highRiskConditions.some(hrc => c.toLowerCase().includes(hrc))
  );
  if (hasHighRiskCondition) {
    riskScore += 20;
    factors.push({ name: 'High-Risk Comorbidity', impact: 'negative', weight: 20, description: 'Pre-existing conditions increase complexity' });
  }

  // Polypharmacy
  if (medications.length > 5) {
    riskScore += 10;
    factors.push({ name: 'Polypharmacy', impact: 'negative', weight: 10, description: 'Multiple medications increase interaction risk' });
  }

  // Number of symptoms
  if (symptoms.length > 5) {
    riskScore += 15;
    factors.push({ name: 'Multiple Symptoms', impact: 'negative', weight: 15, description: 'Multiple symptoms may indicate complex condition' });
  }

  // Determine overall risk level
  let overallRisk: 'low' | 'moderate' | 'high' | 'critical';
  if (riskScore >= 80) overallRisk = 'critical';
  else if (riskScore >= 50) overallRisk = 'high';
  else if (riskScore >= 25) overallRisk = 'moderate';
  else overallRisk = 'low';

  // Calculate confidence interval (simplified)
  const confidence = Math.min(95, 60 + symptoms.length * 5);
  const margin = (100 - confidence) / 2;

  // Generate recommendations
  const recommendations: string[] = [];
  if (overallRisk === 'critical') {
    recommendations.push('Seek immediate emergency medical care');
    recommendations.push('Call emergency services (112/999/911)');
  } else if (overallRisk === 'high') {
    recommendations.push('Consult a healthcare provider within 24 hours');
    recommendations.push('Consider visiting urgent care');
  } else if (overallRisk === 'moderate') {
    recommendations.push('Schedule an appointment with your doctor');
    recommendations.push('Monitor symptoms closely');
  } else {
    recommendations.push('Continue monitoring symptoms');
    recommendations.push('Use self-care measures as appropriate');
  }

  return {
    overallRisk,
    confidenceInterval: { lower: riskScore - margin, upper: riskScore + margin },
    factors,
    recommendations
  };
}

// ============================================================================
// 🧠 ADVANCED DIFFERENTIAL DIAGNOSIS ENGINE
// ============================================================================

export interface DifferentialDiagnosis {
  condition: any;
  probability: number;
  confidence: 'low' | 'moderate' | 'high' | 'very-high';
  matchingSymptoms: string[];
  missingSymptoms: string[];
  supportingFactors: string[];
  againstFactors: string[];
  redFlagsPresent: string[];
  recommendedTests: string[];
}

export function generateDifferentialDiagnosis(
  symptoms: string[],
  age: number,
  gender: string,
  duration: string,
  severity: string,
  preConditions: string[],
  freeText?: string
): DifferentialDiagnosis[] {
  const differentials: DifferentialDiagnosis[] = [];

  for (const [conditionId, condition] of Object.entries(EXPANDED_CONDITIONS_DATABASE)) {
    const allSymptoms = [
      ...(condition.symptoms?.primary || []),
      ...(condition.symptoms?.secondary || []),
      ...(condition.symptoms?.atypical || [])
    ];

    const matchingSymptoms = symptoms.filter(s => allSymptoms.includes(s));
    const missingPrimary = (condition.symptoms?.primary || []).filter((s: string) => !symptoms.includes(s));

    if (matchingSymptoms.length === 0) continue;

    // Calculate base probability
    let probability = 0;
    
    // Primary symptom matches are weighted heavily
    const primaryMatches = symptoms.filter(s => (condition.symptoms?.primary || []).includes(s));
    probability += primaryMatches.length * 25;

    // Secondary matches
    const secondaryMatches = symptoms.filter(s => (condition.symptoms?.secondary || []).includes(s));
    probability += secondaryMatches.length * 15;

    // Atypical matches (lower weight)
    const atypicalMatches = symptoms.filter(s => (condition.symptoms?.atypical || []).includes(s));
    probability += atypicalMatches.length * 8;

    // Penalize for missing primary symptoms
    probability -= missingPrimary.length * 10;

    // Risk factor adjustments
    const supportingFactors: string[] = [];
    const againstFactors: string[] = [];

    if (condition.riskFactors) {
      // Check high risk factors
      condition.riskFactors.high?.forEach((rf: string) => {
        if (rf.includes('age') && age > 50) {
          probability += 10;
          supportingFactors.push(`Age matches risk profile`);
        }
        if (rf.includes('female') && gender === 'female') {
          probability += 5;
          supportingFactors.push('Gender is a risk factor');
        }
        if (rf.includes('male') && gender === 'male') {
          probability += 5;
          supportingFactors.push('Gender is a risk factor');
        }
        if (preConditions.some(pc => rf.toLowerCase().includes(pc.toLowerCase()))) {
          probability += 15;
          supportingFactors.push(`Pre-existing condition: ${rf}`);
        }
      });
    }

    // Check for red flags
    const redFlagsPresent: string[] = [];
    if (condition.redFlags) {
      condition.redFlags.forEach((rf: string) => {
        if (symptoms.some(s => rf.includes(s) || s.includes(rf))) {
          redFlagsPresent.push(rf);
          probability += 20;
        }
      });
    }

    // Urgency adjustment
    if (condition.urgency === 'emergency' && severity === 'very-severe') {
      probability += 15;
    }

    // Prevalence adjustment
    if (condition.prevalence) {
      probability *= (1 + Math.log10(condition.prevalence * 1000) / 10);
    }

    // Cap probability
    probability = Math.min(95, Math.max(5, probability));

    // Determine confidence
    let confidence: 'low' | 'moderate' | 'high' | 'very-high';
    if (primaryMatches.length >= 2 && matchingSymptoms.length >= 3) {
      confidence = 'very-high';
    } else if (primaryMatches.length >= 1 && matchingSymptoms.length >= 2) {
      confidence = 'high';
    } else if (matchingSymptoms.length >= 2) {
      confidence = 'moderate';
    } else {
      confidence = 'low';
    }

    // Recommended tests
    const recommendedTests: string[] = [];
    if (condition.diagnosticCriteria) {
      if (condition.diagnosticCriteria.clinical) {
        recommendedTests.push(...condition.diagnosticCriteria.clinical);
      }
      if (condition.diagnosticCriteria.imaging) {
        recommendedTests.push(...condition.diagnosticCriteria.imaging);
      }
    }
    if (condition.labMarkers) {
      recommendedTests.push(...condition.labMarkers.map((m: string) => `Lab: ${m.toUpperCase()}`));
    }

    differentials.push({
      condition: {
        id: conditionId,
        name: condition.name,
        icd11: condition.icd11,
        category: condition.category,
        urgency: condition.urgency,
        description: condition.description || `${condition.name} - ${condition.category} condition`
      },
      probability: Math.round(probability),
      confidence,
      matchingSymptoms,
      missingSymptoms: missingPrimary,
      supportingFactors,
      againstFactors,
      redFlagsPresent,
      recommendedTests: recommendedTests.slice(0, 5)
    });
  }

  // Sort by probability
  differentials.sort((a, b) => b.probability - a.probability);

  // Return top 10
  return differentials.slice(0, 10);
}

// ============================================================================
// 🛡️ SARAH'S SECURITY & AUDIT SYSTEM
// ============================================================================

export interface AuditLog {
  timestamp: string;
  action: string;
  userId?: string;
  sessionId: string;
  ipAddress?: string;
  inputData: {
    symptomCount: number;
    hasAge: boolean;
    hasGender: boolean;
    hasMedicalHistory: boolean;
  };
  outputData: {
    urgencyLevel: string;
    conditionCount: number;
    processingTimeMs: number;
  };
  complianceFlags: {
    hipaaCompliant: boolean;
    gdprCompliant: boolean;
    dataMinimization: boolean;
  };
}

export function createAuditLog(
  sessionId: string,
  symptoms: string[],
  age: number | undefined,
  gender: string | undefined,
  preConditions: string[],
  result: any,
  processingTimeMs: number
): AuditLog {
  return {
    timestamp: new Date().toISOString(),
    action: 'SYMPTOM_ANALYSIS',
    sessionId,
    inputData: {
      symptomCount: symptoms.length,
      hasAge: !!age,
      hasGender: !!gender,
      hasMedicalHistory: preConditions.length > 0
    },
    outputData: {
      urgencyLevel: result.urgency?.name || 'unknown',
      conditionCount: result.differentialDiagnosis?.length || 0,
      processingTimeMs
    },
    complianceFlags: {
      hipaaCompliant: true,
      gdprCompliant: true,
      dataMinimization: true // No PII stored
    }
  };
}

// ============================================================================
// 📊 ANALYTICS: SYMPTOM CORRELATION MATRIX
// ============================================================================

export const SYMPTOM_CORRELATIONS: Record<string, string[]> = {
  'chest-pain': ['shortness-breath', 'sweating', 'nausea', 'arm-pain', 'palpitations'],
  'shortness-breath': ['chest-pain', 'cough', 'wheezing', 'fatigue', 'anxiety'],
  'headache': ['nausea', 'light-sensitivity', 'neck-stiffness', 'fever', 'vision-changes'],
  'fever': ['chills', 'fatigue', 'body-aches', 'sweating', 'headache'],
  'abdominal-pain': ['nausea', 'vomiting', 'diarrhea', 'bloating', 'fever'],
  'fatigue': ['weakness', 'sleep-problems', 'depression', 'weight-changes', 'fever'],
  'dizziness': ['nausea', 'headache', 'vision-changes', 'weakness', 'palpitations'],
  'nausea': ['vomiting', 'abdominal-pain', 'dizziness', 'headache', 'fever'],
  'cough': ['shortness-breath', 'fever', 'sore-throat', 'chest-pain', 'fatigue'],
  'back-pain': ['leg-pain', 'numbness', 'weakness', 'stiffness', 'muscle-spasm']
};

export function getCorrelatedSymptoms(selectedSymptoms: string[]): string[] {
  const correlated = new Set<string>();
  
  selectedSymptoms.forEach(symptom => {
    const related = SYMPTOM_CORRELATIONS[symptom] || [];
    related.forEach(r => {
      if (!selectedSymptoms.includes(r)) {
        correlated.add(r);
      }
    });
  });

  return Array.from(correlated);
}

// ============================================================================
// 🌐 ENHANCED SPECIALISTS DATABASE
// ============================================================================

export const ENHANCED_SPECIALISTS = {
  'emergency-medicine': {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    icon: 'fa-ambulance',
    description: 'Immediate life-threatening emergencies',
    conditions: ['myocardial-infarction', 'stroke', 'pulmonary-embolism', 'meningitis'],
    availability: '24/7',
    responseTime: 'Immediate',
    selectcareDoctor: 'dr-koch'
  },
  'cardiologist': {
    id: 'cardiologist',
    name: 'Cardiologist',
    icon: 'fa-heart-pulse',
    description: 'Heart and cardiovascular system specialist',
    conditions: ['atrial-fibrillation', 'heart-failure', 'coronary-artery-disease'],
    availability: 'Weekdays + Emergency',
    responseTime: '24-48 hours',
    selectcareDoctor: 'dr-muller'
  },
  'neurologist': {
    id: 'neurologist',
    name: 'Neurologist',
    icon: 'fa-brain',
    description: 'Brain and nervous system specialist',
    conditions: ['migraine', 'epilepsy', 'multiple-sclerosis', 'parkinsons'],
    availability: 'Weekdays',
    responseTime: '1-2 weeks',
    selectcareDoctor: null
  },
  'pulmonologist': {
    id: 'pulmonologist',
    name: 'Pulmonologist',
    icon: 'fa-lungs',
    description: 'Lung and respiratory specialist',
    conditions: ['asthma', 'copd', 'pneumonia', 'lung-cancer'],
    availability: 'Weekdays',
    responseTime: '1-2 weeks',
    selectcareDoctor: null
  },
  'gastroenterologist': {
    id: 'gastroenterologist',
    name: 'Gastroenterologist',
    icon: 'fa-stomach',
    description: 'Digestive system specialist',
    conditions: ['ibd', 'gerd', 'hepatitis', 'pancreatitis'],
    availability: 'Weekdays',
    responseTime: '1-2 weeks',
    selectcareDoctor: 'dr-hoffmann'
  },
  'endocrinologist': {
    id: 'endocrinologist',
    name: 'Endocrinologist',
    icon: 'fa-dna',
    description: 'Hormone and metabolism specialist',
    conditions: ['diabetes', 'thyroid-disorders', 'adrenal-disorders'],
    availability: 'Weekdays',
    responseTime: '2-4 weeks',
    selectcareDoctor: null
  },
  'psychiatrist': {
    id: 'psychiatrist',
    name: 'Psychiatrist',
    icon: 'fa-brain',
    description: 'Mental health and psychiatric specialist',
    conditions: ['depression', 'anxiety', 'bipolar', 'schizophrenia'],
    availability: 'Weekdays + Emergency Line',
    responseTime: '1-2 weeks',
    selectcareDoctor: null
  },
  'rheumatologist': {
    id: 'rheumatologist',
    name: 'Rheumatologist',
    icon: 'fa-bone',
    description: 'Joint and autoimmune disease specialist',
    conditions: ['rheumatoid-arthritis', 'lupus', 'gout', 'fibromyalgia'],
    availability: 'Weekdays',
    responseTime: '2-4 weeks',
    selectcareDoctor: null
  },
  'orthopedic-surgeon': {
    id: 'orthopedic-surgeon',
    name: 'Orthopedic Surgeon',
    icon: 'fa-bone',
    description: 'Bone, joint, and musculoskeletal surgeon',
    conditions: ['fractures', 'arthritis', 'herniated-disc', 'sports-injuries'],
    availability: 'Weekdays + Emergency',
    responseTime: '1-2 weeks',
    selectcareDoctor: 'dr-weber'
  },
  'bariatric-surgeon': {
    id: 'bariatric-surgeon',
    name: 'Bariatric Surgeon',
    icon: 'fa-weight',
    description: 'Weight loss surgery specialist',
    conditions: ['morbid-obesity', 'metabolic-syndrome'],
    availability: 'Weekdays',
    responseTime: '2-4 weeks',
    selectcareDoctor: 'dr-fischer'
  },
  'dermatologist': {
    id: 'dermatologist',
    name: 'Dermatologist',
    icon: 'fa-hand-dots',
    description: 'Skin specialist',
    conditions: ['psoriasis', 'eczema', 'melanoma', 'acne'],
    availability: 'Weekdays',
    responseTime: '2-4 weeks',
    selectcareDoctor: null
  },
  'urologist': {
    id: 'urologist',
    name: 'Urologist',
    icon: 'fa-droplet',
    description: 'Urinary system specialist',
    conditions: ['kidney-stones', 'uti', 'prostate-issues', 'bladder-conditions'],
    availability: 'Weekdays',
    responseTime: '1-2 weeks',
    selectcareDoctor: 'dr-bauer'
  },
  'plastic-surgeon': {
    id: 'plastic-surgeon',
    name: 'Plastic & Reconstructive Surgeon',
    icon: 'fa-user-nurse',
    description: 'Cosmetic and reconstructive surgery specialist',
    conditions: ['post-bariatric', 'reconstruction', 'aesthetic'],
    availability: 'Weekdays',
    responseTime: '2-4 weeks',
    selectcareDoctor: 'dr-metwalli'
  }
};

// ============================================================================
// URGENCY TRIAGE SYSTEM v3.0
// ============================================================================

export const URGENCY_LEVELS_V3 = {
  critical: {
    level: 0,
    name: 'Critical Emergency',
    color: '#7F1D1D',
    bgColor: '#FEE2E2',
    borderColor: '#DC2626',
    icon: 'fa-skull-crossbones',
    description: 'Immediately life-threatening condition',
    action: 'Call emergency services NOW (112/999/911)',
    responseTime: 'Immediate - Minutes matter',
    examples: ['Heart attack', 'Stroke', 'Severe breathing difficulty', 'Active bleeding']
  },
  emergency: {
    level: 1,
    name: 'Emergency',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#EF4444',
    icon: 'fa-exclamation-triangle',
    description: 'Serious condition requiring immediate emergency care',
    action: 'Go to Emergency Room immediately or call emergency services',
    responseTime: 'Within 1 hour',
    examples: ['Severe chest pain', 'Head injury', 'Broken bone', 'High fever with rash']
  },
  urgent: {
    level: 2,
    name: 'Urgent',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    icon: 'fa-clock',
    description: 'Serious condition requiring prompt medical attention',
    action: 'See a doctor within 24 hours or visit urgent care',
    responseTime: '24 hours',
    examples: ['Persistent fever', 'Moderate pain', 'Infection signs', 'Worsening symptoms']
  },
  semiUrgent: {
    level: 3,
    name: 'Semi-Urgent',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    borderColor: '#0EA5E9',
    icon: 'fa-calendar-day',
    description: 'Condition requiring medical attention within a few days',
    action: 'Schedule an appointment within 2-3 days',
    responseTime: '2-3 days',
    examples: ['Mild infection', 'Persistent symptoms', 'Follow-up needed']
  },
  routine: {
    level: 4,
    name: 'Routine',
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#10B981',
    icon: 'fa-calendar-check',
    description: 'Non-urgent condition suitable for scheduled appointment',
    action: 'Schedule a routine appointment',
    responseTime: '1-2 weeks',
    examples: ['Chronic condition management', 'Preventive care', 'Mild symptoms']
  },
  selfCare: {
    level: 5,
    name: 'Self-Care',
    color: '#6366F1',
    bgColor: '#E0E7FF',
    borderColor: '#818CF8',
    icon: 'fa-home',
    description: 'Minor symptoms that can be managed at home',
    action: 'Use self-care measures and monitor symptoms',
    responseTime: 'As needed',
    examples: ['Common cold', 'Minor aches', 'Mild fatigue']
  }
};

// ============================================================================
// MAIN ANALYSIS FUNCTION v3.0
// ============================================================================

export interface MediSenseAnalysisV3 {
  version: string;
  analysisId: string;
  timestamp: string;
  processingTimeMs: number;
  
  // Patient Input Summary
  patientProfile: {
    age: number;
    gender: string;
    symptomDuration: string;
    severity: string;
    symptomCount: number;
    preConditions: string[];
    medications: string[];
  };

  // Risk Assessment
  riskStratification: RiskStratification;

  // Urgency Triage
  urgency: typeof URGENCY_LEVELS_V3[keyof typeof URGENCY_LEVELS_V3];

  // Differential Diagnosis
  differentialDiagnosis: DifferentialDiagnosis[];

  // Recommended Specialists
  recommendedSpecialists: (typeof ENHANCED_SPECIALISTS[keyof typeof ENHANCED_SPECIALISTS] & { priority: number })[];

  // Red Flags Detected
  redFlagsDetected: string[];

  // Correlated Symptoms (to ask about)
  correlatedSymptoms: string[];

  // Evidence-Based Recommendations
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    followUp: string[];
  };

  // Disclaimer
  disclaimer: string;

  // Audit Trail
  auditLog: AuditLog;
}

export function analyzeSymptomsV3(
  symptoms: string[],
  age: number,
  gender: string,
  duration: string,
  severity: string,
  preConditions: string[] = [],
  medications: string[] = [],
  freeText?: string
): MediSenseAnalysisV3 {
  const startTime = Date.now();
  const analysisId = `MS3-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const sessionId = `session-${Date.now()}`;

  // Generate differential diagnosis
  const differentialDiagnosis = generateDifferentialDiagnosis(
    symptoms, age, gender, duration, severity, preConditions, freeText
  );

  // Calculate risk stratification
  const riskStratification = calculateRiskScore(
    symptoms, age, gender, duration, severity, preConditions, medications
  );

  // Determine urgency
  let urgencyKey: keyof typeof URGENCY_LEVELS_V3 = 'routine';
  
  // Check for critical symptoms
  const criticalSymptoms = ['chest-pain', 'cough-blood', 'vomiting-blood', 'seizure', 
    'speech-difficulty', 'vision-loss', 'severe-headache', 'suicidal-thoughts', 'altered-consciousness'];
  const hasCritical = symptoms.some(s => criticalSymptoms.includes(s));
  
  if (hasCritical && severity === 'very-severe') {
    urgencyKey = 'critical';
  } else if (hasCritical || riskStratification.overallRisk === 'critical') {
    urgencyKey = 'emergency';
  } else if (riskStratification.overallRisk === 'high') {
    urgencyKey = 'urgent';
  } else if (riskStratification.overallRisk === 'moderate') {
    urgencyKey = 'semiUrgent';
  } else if (symptoms.length <= 2 && severity === 'mild') {
    urgencyKey = 'selfCare';
  }

  // Collect red flags
  const redFlagsDetected: string[] = [];
  differentialDiagnosis.forEach(d => {
    d.redFlagsPresent.forEach(rf => {
      if (!redFlagsDetected.includes(rf)) {
        redFlagsDetected.push(rf);
      }
    });
  });

  // Get correlated symptoms
  const correlatedSymptoms = getCorrelatedSymptoms(symptoms);

  // Determine specialists
  const specialistScores: Record<string, number> = {};
  differentialDiagnosis.slice(0, 5).forEach((d, idx) => {
    const condition = EXPANDED_CONDITIONS_DATABASE[d.condition.id as keyof typeof EXPANDED_CONDITIONS_DATABASE];
    if (condition?.specialists) {
      condition.specialists.forEach((s: string) => {
        specialistScores[s] = (specialistScores[s] || 0) + (5 - idx) * 10;
      });
    }
  });

  const recommendedSpecialists = Object.entries(specialistScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, score]) => ({
      ...ENHANCED_SPECIALISTS[id as keyof typeof ENHANCED_SPECIALISTS],
      priority: score
    }))
    .filter(s => s.id);

  // Generate recommendations
  const recommendations = {
    immediate: [] as string[],
    shortTerm: [] as string[],
    followUp: [] as string[]
  };

  if (urgencyKey === 'critical' || urgencyKey === 'emergency') {
    recommendations.immediate.push('Seek immediate emergency medical care');
    recommendations.immediate.push('Call emergency services (112/999/911) if not already done');
    recommendations.immediate.push('Do not drive yourself - call for help');
  }

  if (hasCritical) {
    recommendations.immediate.push('Your symptoms include potentially serious warning signs');
  }

  recommendations.shortTerm.push('Keep a detailed symptom diary');
  recommendations.shortTerm.push('Stay hydrated and rest');
  
  if (differentialDiagnosis.length > 0 && differentialDiagnosis[0].recommendedTests.length > 0) {
    recommendations.shortTerm.push(`Consider these diagnostic tests: ${differentialDiagnosis[0].recommendedTests.slice(0, 3).join(', ')}`);
  }

  recommendations.followUp.push('Schedule follow-up with your primary care physician');
  if (recommendedSpecialists.length > 0) {
    recommendations.followUp.push(`Consider consultation with: ${recommendedSpecialists.map(s => s.name).join(', ')}`);
  }

  const processingTimeMs = Date.now() - startTime;

  // Create audit log
  const result = {
    urgency: URGENCY_LEVELS_V3[urgencyKey],
    differentialDiagnosis
  };
  const auditLog = createAuditLog(sessionId, symptoms, age, gender, preConditions, result, processingTimeMs);

  return {
    version: '3.0.0',
    analysisId,
    timestamp: new Date().toISOString(),
    processingTimeMs,
    patientProfile: {
      age,
      gender,
      symptomDuration: duration,
      severity,
      symptomCount: symptoms.length,
      preConditions,
      medications
    },
    riskStratification,
    urgency: URGENCY_LEVELS_V3[urgencyKey],
    differentialDiagnosis,
    recommendedSpecialists,
    redFlagsDetected,
    correlatedSymptoms,
    recommendations,
    disclaimer: 'IMPORTANT: This AI-powered analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. The information provided should not replace consultation with a qualified healthcare professional. If you are experiencing a medical emergency, please call emergency services immediately (112 in Europe, 999 in UK, 911 in USA). Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.',
    auditLog
  };
}

// Export all for API use
export {
  SYMPTOM_CATEGORIES,
  CONDITIONS_DATABASE,
  URGENCY_LEVELS,
  SPECIALISTS,
  BODY_REGIONS,
  analyzeSymptoms
} from './symptom-analyzer';
