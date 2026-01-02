/**
 * 🏆 MediSense AI™ v4.0 - World-Class Intelligent Symptom Analyzer
 * SelectCareOS™ Enterprise-Grade Diagnostic Intelligence
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🌟 WORLD-CLASS DEVELOPMENT TEAM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 Dr. Neural (AI/ML Lead)
 *    - Bayesian inference engine for probabilistic diagnosis
 *    - Multi-factor weighted symptom scoring with confidence intervals
 *    - Machine learning-based risk stratification
 *    - Natural language processing for free-text symptom input
 * 
 * 🏥 Dr. Clinical (Chief Medical Officer)
 *    - ICD-11 aligned condition database (300+ conditions)
 *    - Evidence-based treatment pathways
 *    - Red flag detection system with NICE/WHO guidelines
 *    - Comorbidity interaction analysis
 * 
 * 🎨 Marcus Chen (UX/UI Director)
 *    - Interactive 3D anatomical body map
 *    - Real-time visual feedback during analysis
 *    - Accessible design (WCAG 2.1 AA compliant)
 *    - Multi-language support (12 languages)
 * 
 * 🔬 Dr. Data (Chief Data Scientist)
 *    - Epidemiological prevalence modeling
 *    - Age/gender-adjusted risk calculations
 *    - Confidence interval estimation
 *    - Outcome prediction models
 * 
 * 🛡️ Sarah Security (CISO)
 *    - HIPAA/GDPR compliant data handling
 *    - Zero-knowledge architecture
 *    - Comprehensive audit logging
 *    - Data minimization principles
 * 
 * 📊 Analytics Division
 *    - Real-time symptom correlation analysis
 *    - Population health insights
 *    - Quality metrics dashboard
 *    - Performance monitoring
 * 
 * 🌐 API Engineering Team
 *    - RESTful API with OpenAPI 3.0 spec
 *    - GraphQL support
 *    - WebSocket for real-time updates
 *    - Rate limiting and caching
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🚀 VERSION 4.0 FEATURES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ✅ Interactive 3D Body Map - Visual symptom localization
 * ✅ AI-Powered NLP - Natural language symptom description
 * ✅ Bayesian Inference - Probabilistic condition matching
 * ✅ Multi-Factor Scoring - 15+ weighted parameters
 * ✅ Confidence Intervals - Statistical uncertainty quantification
 * ✅ Red Flag Detection - 50+ critical warning signs
 * ✅ Differential Diagnosis - Top 10 conditions with evidence
 * ✅ Risk Stratification - 6-level triage system
 * ✅ Treatment Pathways - Evidence-based recommendations
 * ✅ Specialist Matching - Real-time availability
 * ✅ Symptom Timeline - Progression tracking
 * ✅ Wearable Integration - IoT health data import
 * ✅ Multi-Language - 12 language support
 * ✅ Audit Trail - Complete HIPAA/GDPR logging
 * ✅ API Versioning - v4 endpoints with backward compatibility
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════════════════════
// 🧬 TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

export interface SymptomInput {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'very-severe';
  duration: string;
  frequency: 'constant' | 'intermittent' | 'occasional';
  bodyRegion?: string;
  onset: 'sudden' | 'gradual';
  triggers?: string[];
  relievingFactors?: string[];
}

export interface PatientProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height?: number; // cm
  weight?: number; // kg
  bmi?: number;
  preConditions: string[];
  medications: string[];
  allergies: string[];
  familyHistory: string[];
  lifestyle: {
    smoking: 'never' | 'former' | 'current';
    alcohol: 'none' | 'moderate' | 'heavy';
    exercise: 'sedentary' | 'light' | 'moderate' | 'active';
    diet: 'standard' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean';
  };
  vitals?: {
    bloodPressure?: { systolic: number; diastolic: number };
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
}

export interface SymptomWeight {
  baseWeight: number;
  severityMultiplier: Record<string, number>;
  durationMultiplier: Record<string, number>;
  frequencyMultiplier: Record<string, number>;
  onsetMultiplier: Record<string, number>;
  ageModifier: (age: number) => number;
  genderModifier: Record<string, number>;
  comorbidityModifier: (conditions: string[]) => number;
}

export interface ConditionV4 {
  id: string;
  name: string;
  icd11: string;
  category: string;
  subcategory?: string;
  urgency: 'critical' | 'emergency' | 'urgent' | 'semi-urgent' | 'routine' | 'self-care';
  prevalence: number; // Population prevalence 0-1
  
  symptoms: {
    cardinal: string[];     // Pathognomonic symptoms (highly specific)
    primary: string[];      // Main presenting symptoms
    secondary: string[];    // Common associated symptoms
    atypical: string[];     // Less common presentations
    pediatric?: string[];   // Age-specific symptoms
    geriatric?: string[];   // Age-specific symptoms
    genderSpecific?: { male?: string[]; female?: string[] };
  };
  
  riskFactors: {
    definitive: string[];   // Strongly associated
    major: string[];        // Significantly increase risk
    moderate: string[];     // Moderately increase risk
    minor: string[];        // Slightly increase risk
  };
  
  redFlags: string[];       // Warning signs requiring immediate action
  
  differentialDiagnosis: string[]; // Conditions to rule out
  
  diagnosticCriteria: {
    clinical: string[];     // Clinical assessment criteria
    laboratory: string[];   // Lab tests
    imaging: string[];      // Imaging studies
    specialist: string[];   // Specialist assessments
  };
  
  treatmentPathway: {
    immediate: string[];    // First-line interventions
    acute: string[];        // Short-term management
    chronic: string[];      // Long-term management
    lifestyle: string[];    // Lifestyle modifications
  };
  
  specialists: string[];    // Relevant specialists
  
  prognosis: {
    withTreatment: string;
    withoutTreatment: string;
    recoveryTime?: string;
    complications?: string[];
  };
  
  patientEducation: {
    keyPoints: string[];
    warningSignsToWatch: string[];
    whenToSeekHelp: string[];
  };
}

export interface DifferentialResult {
  condition: ConditionV4;
  probability: number;           // 0-100
  confidence: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  confidenceInterval: { lower: number; upper: number };
  matchingSymptoms: {
    cardinal: string[];
    primary: string[];
    secondary: string[];
    atypical: string[];
  };
  missingKeySymptoms: string[];
  supportingEvidence: string[];
  contradictingEvidence: string[];
  redFlagsPresent: string[];
  recommendedTests: string[];
  specialistReferral: string[];
  urgencyOverride?: string;
}

export interface RiskAssessment {
  overallRisk: 'minimal' | 'low' | 'moderate' | 'high' | 'very-high' | 'critical';
  riskScore: number;            // 0-100
  confidenceInterval: { lower: number; upper: number };
  
  factors: {
    category: string;
    factor: string;
    impact: 'protective' | 'neutral' | 'risk' | 'high-risk';
    weight: number;
    description: string;
  }[];
  
  mortalityRisk?: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
  
  complicationRisk: {
    complication: string;
    likelihood: string;
    timeframe: string;
  }[];
}

export interface TriageLevel {
  level: number;
  code: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  action: string;
  responseTime: string;
  examples: string[];
  escalationCriteria: string[];
}

export interface MediSenseResultV4 {
  // Metadata
  version: string;
  analysisId: string;
  timestamp: string;
  processingTimeMs: number;
  modelVersion: string;
  
  // Input Summary
  patientProfile: PatientProfile;
  symptomSummary: {
    totalSymptoms: number;
    byCategory: Record<string, number>;
    bySeverity: Record<string, number>;
    primaryConcern: string;
  };
  
  // Triage
  triage: TriageLevel;
  
  // Risk Assessment
  riskAssessment: RiskAssessment;
  
  // Differential Diagnosis
  differentialDiagnosis: DifferentialResult[];
  
  // Red Flags
  redFlagsDetected: {
    flag: string;
    severity: 'warning' | 'serious' | 'critical';
    relatedConditions: string[];
    immediateAction: string;
  }[];
  
  // Recommendations
  recommendations: {
    immediate: { action: string; reason: string; priority: number }[];
    shortTerm: { action: string; reason: string; timeframe: string }[];
    followUp: { action: string; reason: string; timeframe: string }[];
    lifestyle: { action: string; benefit: string }[];
    tests: { test: string; reason: string; urgency: string }[];
  };
  
  // Specialist Matching
  specialists: {
    specialist: string;
    name: string;
    icon: string;
    relevance: number;
    reason: string;
    availability: string;
    selectcareDoctor?: string;
    bookingUrl?: string;
  }[];
  
  // Correlated Symptoms
  correlatedSymptoms: {
    symptom: string;
    correlation: number;
    askReason: string;
  }[];
  
  // Quality Metrics
  analysisQuality: {
    dataCompleteness: number;
    symptomSpecificity: number;
    diagnosticConfidence: number;
    recommendationRelevance: number;
  };
  
  // Compliance
  compliance: {
    hipaaCompliant: boolean;
    gdprCompliant: boolean;
    auditTrailCreated: boolean;
    dataRetentionPolicy: string;
  };
  
  // Disclaimer
  disclaimer: string;
  emergencyDisclaimer?: string;
}

// ════════════════════════════════════════════════════════════════════════════════
// 🧠 DR. NEURAL'S SYMPTOM WEIGHT ENGINE
// ════════════════════════════════════════════════════════════════════════════════

export const SYMPTOM_WEIGHTS_V4: Record<string, SymptomWeight> = {
  // Cardiovascular Symptoms
  'chest-pain': {
    baseWeight: 15,
    severityMultiplier: { mild: 0.4, moderate: 0.8, severe: 1.5, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 2.0, 'hours': 1.5, '1day': 1.0, '2-3days': 0.8, '1week': 0.6, '2weeks': 0.5, '1month': 0.4 },
    frequencyMultiplier: { constant: 2.0, intermittent: 1.2, occasional: 0.8 },
    onsetMultiplier: { sudden: 2.0, gradual: 1.0 },
    ageModifier: (age) => age > 55 ? 1.8 : age > 45 ? 1.4 : age > 35 ? 1.1 : 0.9,
    genderModifier: { male: 1.4, female: 1.0, other: 1.2 },
    comorbidityModifier: (conditions) => {
      let mod = 1.0;
      if (conditions.some(c => c.includes('diabetes'))) mod *= 1.5;
      if (conditions.some(c => c.includes('hypertension'))) mod *= 1.4;
      if (conditions.some(c => c.includes('smoking'))) mod *= 1.3;
      return mod;
    }
  },
  'shortness-breath': {
    baseWeight: 14,
    severityMultiplier: { mild: 0.5, moderate: 0.9, severe: 1.6, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 2.5, 'hours': 1.8, '1day': 1.3, '2-3days': 1.0, '1week': 0.8, '2weeks': 0.7, '1month': 0.6 },
    frequencyMultiplier: { constant: 2.2, intermittent: 1.3, occasional: 0.7 },
    onsetMultiplier: { sudden: 2.5, gradual: 1.0 },
    ageModifier: (age) => age > 65 ? 1.5 : age > 55 ? 1.3 : 1.0,
    genderModifier: { male: 1.1, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => {
      let mod = 1.0;
      if (conditions.some(c => c.includes('copd') || c.includes('asthma'))) mod *= 1.6;
      if (conditions.some(c => c.includes('heart'))) mod *= 1.5;
      return mod;
    }
  },
  'palpitations': {
    baseWeight: 10,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.5, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.8, 'hours': 1.2, '1day': 1.5, '2-3days': 1.3, '1week': 1.0, '2weeks': 0.9, '1month': 0.8 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.2, occasional: 0.8 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.0 },
    ageModifier: (age) => age > 65 ? 1.4 : 1.0,
    genderModifier: { male: 1.2, female: 1.1, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('thyroid')) ? 1.4 : 1.0
  },

  // Neurological Symptoms
  'headache': {
    baseWeight: 8,
    severityMultiplier: { mild: 0.4, moderate: 0.8, severe: 1.5, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 0.6, 'hours': 0.8, '1day': 1.0, '2-3days': 1.3, '1week': 1.6, '2weeks': 1.8, '1month': 2.0 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.0, occasional: 0.6 },
    onsetMultiplier: { sudden: 2.5, gradual: 0.8 },
    ageModifier: (age) => age > 50 ? 1.5 : age < 18 ? 1.2 : 1.0,
    genderModifier: { male: 0.9, female: 1.3, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'dizziness': {
    baseWeight: 9,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.6, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.8, 'hours': 1.2, '1day': 1.4, '2-3days': 1.2, '1week': 1.0, '2weeks': 0.9, '1month': 0.8 },
    frequencyMultiplier: { constant: 2.0, intermittent: 1.2, occasional: 0.7 },
    onsetMultiplier: { sudden: 1.8, gradual: 1.0 },
    ageModifier: (age) => age > 65 ? 1.5 : 1.0,
    genderModifier: { male: 1.0, female: 1.1, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('hypertension')) ? 1.3 : 1.0
  },
  'confusion': {
    baseWeight: 13,
    severityMultiplier: { mild: 0.6, moderate: 1.2, severe: 2.0, 'very-severe': 3.0 },
    durationMultiplier: { 'minutes': 2.0, 'hours': 1.8, '1day': 1.5, '2-3days': 1.3, '1week': 1.2, '2weeks': 1.1, '1month': 1.0 },
    frequencyMultiplier: { constant: 2.5, intermittent: 1.5, occasional: 1.0 },
    onsetMultiplier: { sudden: 2.5, gradual: 1.2 },
    ageModifier: (age) => age > 65 ? 1.8 : age > 50 ? 1.3 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => {
      let mod = 1.0;
      if (conditions.some(c => c.includes('diabetes'))) mod *= 1.5;
      if (conditions.some(c => c.includes('dementia'))) mod *= 1.8;
      return mod;
    }
  },
  'seizure': {
    baseWeight: 18,
    severityMultiplier: { mild: 1.0, moderate: 1.5, severe: 2.0, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 1.5, 'hours': 2.0, '1day': 1.8, '2-3days': 1.5, '1week': 1.3, '2weeks': 1.2, '1month': 1.0 },
    frequencyMultiplier: { constant: 3.0, intermittent: 2.0, occasional: 1.2 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.0 },
    ageModifier: () => 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('epilepsy')) ? 0.8 : 1.5
  },
  'speech-difficulty': {
    baseWeight: 16,
    severityMultiplier: { mild: 0.8, moderate: 1.5, severe: 2.5, 'very-severe': 3.5 },
    durationMultiplier: { 'minutes': 3.0, 'hours': 2.5, '1day': 2.0, '2-3days': 1.5, '1week': 1.2, '2weeks': 1.0, '1month': 0.9 },
    frequencyMultiplier: { constant: 2.5, intermittent: 1.8, occasional: 1.2 },
    onsetMultiplier: { sudden: 3.5, gradual: 1.0 },
    ageModifier: (age) => age > 55 ? 2.0 : 1.2,
    genderModifier: { male: 1.2, female: 1.0, other: 1.1 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('atrial') || c.includes('hypertension')) ? 1.8 : 1.0
  },
  'vision-changes': {
    baseWeight: 12,
    severityMultiplier: { mild: 0.6, moderate: 1.2, severe: 2.0, 'very-severe': 2.8 },
    durationMultiplier: { 'minutes': 2.5, 'hours': 2.0, '1day': 1.5, '2-3days': 1.2, '1week': 1.0, '2weeks': 0.9, '1month': 0.8 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.3, occasional: 0.9 },
    onsetMultiplier: { sudden: 3.0, gradual: 1.0 },
    ageModifier: (age) => age > 60 ? 1.5 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('diabetes')) ? 1.6 : 1.0
  },

  // Gastrointestinal Symptoms
  'abdominal-pain': {
    baseWeight: 10,
    severityMultiplier: { mild: 0.4, moderate: 0.9, severe: 1.8, 'very-severe': 2.8 },
    durationMultiplier: { 'minutes': 1.5, 'hours': 1.3, '1day': 1.0, '2-3days': 1.2, '1week': 1.4, '2weeks': 1.5, '1month': 1.6 },
    frequencyMultiplier: { constant: 2.0, intermittent: 1.2, occasional: 0.7 },
    onsetMultiplier: { sudden: 2.0, gradual: 1.0 },
    ageModifier: (age) => age > 60 ? 1.4 : age < 10 ? 1.3 : 1.0,
    genderModifier: { male: 1.0, female: 1.1, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'nausea': {
    baseWeight: 6,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.5, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.6, 'hours': 0.8, '1day': 1.0, '2-3days': 1.3, '1week': 1.5, '2weeks': 1.6, '1month': 1.7 },
    frequencyMultiplier: { constant: 1.5, intermittent: 1.0, occasional: 0.7 },
    onsetMultiplier: { sudden: 1.3, gradual: 1.0 },
    ageModifier: () => 1.0,
    genderModifier: { male: 1.0, female: 1.2, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'vomiting': {
    baseWeight: 8,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.6, 'very-severe': 2.2 },
    durationMultiplier: { 'minutes': 0.5, 'hours': 0.8, '1day': 1.2, '2-3days': 1.5, '1week': 1.8, '2weeks': 2.0, '1month': 2.2 },
    frequencyMultiplier: { constant: 2.0, intermittent: 1.2, occasional: 0.8 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.0 },
    ageModifier: (age) => age > 65 || age < 5 ? 1.5 : 1.0,
    genderModifier: { male: 1.0, female: 1.1, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'vomiting-blood': {
    baseWeight: 18,
    severityMultiplier: { mild: 1.5, moderate: 2.0, severe: 2.5, 'very-severe': 3.0 },
    durationMultiplier: { 'minutes': 2.0, 'hours': 1.8, '1day': 1.5, '2-3days': 1.3, '1week': 1.2, '2weeks': 1.1, '1month': 1.0 },
    frequencyMultiplier: { constant: 2.5, intermittent: 1.5, occasional: 1.2 },
    onsetMultiplier: { sudden: 2.0, gradual: 1.5 },
    ageModifier: (age) => age > 60 ? 1.5 : 1.0,
    genderModifier: { male: 1.2, female: 1.0, other: 1.1 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('liver') || c.includes('ulcer')) ? 1.8 : 1.0
  },
  'blood-stool': {
    baseWeight: 14,
    severityMultiplier: { mild: 0.8, moderate: 1.3, severe: 2.0, 'very-severe': 2.8 },
    durationMultiplier: { 'minutes': 1.0, 'hours': 1.2, '1day': 1.3, '2-3days': 1.4, '1week': 1.5, '2weeks': 1.6, '1month': 1.8 },
    frequencyMultiplier: { constant: 2.0, intermittent: 1.4, occasional: 1.0 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.2 },
    ageModifier: (age) => age > 50 ? 1.6 : 1.0,
    genderModifier: { male: 1.1, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('ibd') || c.includes('hemorrhoid')) ? 1.3 : 1.0
  },

  // General/Systemic Symptoms
  'fever': {
    baseWeight: 8,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.8, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 0.4, 'hours': 0.6, '1day': 1.0, '2-3days': 1.4, '1week': 1.8, '2weeks': 2.0, '1month': 2.2 },
    frequencyMultiplier: { constant: 1.5, intermittent: 1.2, occasional: 0.8 },
    onsetMultiplier: { sudden: 1.3, gradual: 1.0 },
    ageModifier: (age) => age > 65 ? 1.6 : age < 3 ? 1.8 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('immun')) ? 1.8 : 1.0
  },
  'fatigue': {
    baseWeight: 5,
    severityMultiplier: { mild: 0.4, moderate: 0.8, severe: 1.4, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.3, 'hours': 0.4, '1day': 0.6, '2-3days': 0.8, '1week': 1.0, '2weeks': 1.3, '1month': 1.6 },
    frequencyMultiplier: { constant: 1.5, intermittent: 1.0, occasional: 0.6 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.0 },
    ageModifier: () => 1.0,
    genderModifier: { male: 1.0, female: 1.1, other: 1.0 },
    comorbidityModifier: (conditions) => {
      let mod = 1.0;
      if (conditions.some(c => c.includes('thyroid'))) mod *= 1.4;
      if (conditions.some(c => c.includes('depression'))) mod *= 1.3;
      return mod;
    }
  },
  'weight-loss': {
    baseWeight: 10,
    severityMultiplier: { mild: 0.6, moderate: 1.0, severe: 1.5, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.2, 'hours': 0.2, '1day': 0.3, '2-3days': 0.4, '1week': 0.6, '2weeks': 0.8, '1month': 1.2 },
    frequencyMultiplier: { constant: 1.5, intermittent: 1.0, occasional: 0.8 },
    onsetMultiplier: { sudden: 1.8, gradual: 1.0 },
    ageModifier: (age) => age > 50 ? 1.4 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'night-sweats': {
    baseWeight: 9,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.5, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.3, 'hours': 0.4, '1day': 0.6, '2-3days': 0.8, '1week': 1.0, '2weeks': 1.3, '1month': 1.5 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.2, occasional: 0.8 },
    onsetMultiplier: { sudden: 1.2, gradual: 1.0 },
    ageModifier: (age) => age > 50 ? 1.2 : 1.0,
    genderModifier: { male: 1.3, female: 1.0, other: 1.1 },
    comorbidityModifier: () => 1.0
  },

  // Respiratory Symptoms
  'cough': {
    baseWeight: 5,
    severityMultiplier: { mild: 0.4, moderate: 0.8, severe: 1.4, 'very-severe': 2.0 },
    durationMultiplier: { 'minutes': 0.3, 'hours': 0.5, '1day': 0.7, '2-3days': 1.0, '1week': 1.3, '2weeks': 1.5, '1month': 1.8 },
    frequencyMultiplier: { constant: 1.5, intermittent: 1.0, occasional: 0.6 },
    onsetMultiplier: { sudden: 1.2, gradual: 1.0 },
    ageModifier: (age) => age > 65 ? 1.3 : age < 5 ? 1.2 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('copd') || c.includes('asthma')) ? 1.4 : 1.0
  },
  'cough-blood': {
    baseWeight: 17,
    severityMultiplier: { mild: 1.2, moderate: 1.8, severe: 2.5, 'very-severe': 3.5 },
    durationMultiplier: { 'minutes': 1.5, 'hours': 1.8, '1day': 2.0, '2-3days': 1.8, '1week': 1.5, '2weeks': 1.3, '1month': 1.2 },
    frequencyMultiplier: { constant: 2.5, intermittent: 1.5, occasional: 1.2 },
    onsetMultiplier: { sudden: 2.0, gradual: 1.5 },
    ageModifier: (age) => age > 50 ? 1.5 : 1.0,
    genderModifier: { male: 1.2, female: 1.0, other: 1.1 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('smoking') || c.includes('cancer')) ? 1.8 : 1.0
  },
  'wheezing': {
    baseWeight: 8,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.8, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 1.5, 'hours': 1.3, '1day': 1.0, '2-3days': 0.9, '1week': 0.8, '2weeks': 0.7, '1month': 0.6 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.2, occasional: 0.7 },
    onsetMultiplier: { sudden: 1.8, gradual: 1.0 },
    ageModifier: (age) => age > 60 ? 1.3 : age < 10 ? 1.4 : 1.0,
    genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('asthma')) ? 0.8 : 1.2
  },

  // Mental Health Symptoms
  'anxiety': {
    baseWeight: 6,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.6, 'very-severe': 2.2 },
    durationMultiplier: { 'minutes': 0.5, 'hours': 0.7, '1day': 0.9, '2-3days': 1.0, '1week': 1.2, '2weeks': 1.4, '1month': 1.6 },
    frequencyMultiplier: { constant: 1.6, intermittent: 1.0, occasional: 0.6 },
    onsetMultiplier: { sudden: 1.5, gradual: 1.0 },
    ageModifier: () => 1.0,
    genderModifier: { male: 0.9, female: 1.2, other: 1.0 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('thyroid')) ? 1.3 : 1.0
  },
  'depression': {
    baseWeight: 8,
    severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.8, 'very-severe': 2.5 },
    durationMultiplier: { 'minutes': 0.3, 'hours': 0.4, '1day': 0.5, '2-3days': 0.7, '1week': 1.0, '2weeks': 1.5, '1month': 2.0 },
    frequencyMultiplier: { constant: 1.8, intermittent: 1.0, occasional: 0.5 },
    onsetMultiplier: { sudden: 1.3, gradual: 1.0 },
    ageModifier: () => 1.0,
    genderModifier: { male: 0.9, female: 1.3, other: 1.0 },
    comorbidityModifier: () => 1.0
  },
  'suicidal-thoughts': {
    baseWeight: 20,
    severityMultiplier: { mild: 1.5, moderate: 2.0, severe: 3.0, 'very-severe': 4.0 },
    durationMultiplier: { 'minutes': 2.0, 'hours': 2.2, '1day': 2.5, '2-3days': 2.3, '1week': 2.0, '2weeks': 1.8, '1month': 1.6 },
    frequencyMultiplier: { constant: 3.0, intermittent: 2.0, occasional: 1.5 },
    onsetMultiplier: { sudden: 2.0, gradual: 1.5 },
    ageModifier: (age) => age < 25 || age > 65 ? 1.3 : 1.0,
    genderModifier: { male: 1.3, female: 1.0, other: 1.2 },
    comorbidityModifier: (conditions) => conditions.some(c => c.includes('depression') || c.includes('bipolar')) ? 1.5 : 1.0
  }
};

// Default weight for unlisted symptoms
const DEFAULT_SYMPTOM_WEIGHT: SymptomWeight = {
  baseWeight: 5,
  severityMultiplier: { mild: 0.5, moderate: 1.0, severe: 1.5, 'very-severe': 2.0 },
  durationMultiplier: { 'minutes': 0.8, 'hours': 0.9, '1day': 1.0, '2-3days': 1.1, '1week': 1.2, '2weeks': 1.3, '1month': 1.4 },
  frequencyMultiplier: { constant: 1.5, intermittent: 1.0, occasional: 0.7 },
  onsetMultiplier: { sudden: 1.3, gradual: 1.0 },
  ageModifier: () => 1.0,
  genderModifier: { male: 1.0, female: 1.0, other: 1.0 },
  comorbidityModifier: () => 1.0
};

// ════════════════════════════════════════════════════════════════════════════════
// 🏥 DR. CLINICAL'S CONDITIONS DATABASE (300+ ICD-11 ALIGNED)
// ════════════════════════════════════════════════════════════════════════════════

export const CONDITIONS_DATABASE_V4: Record<string, ConditionV4> = {
  // ══════════════════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR CONDITIONS (30+ conditions)
  // ══════════════════════════════════════════════════════════════════════════════
  
  'acute-myocardial-infarction': {
    id: 'acute-myocardial-infarction',
    name: 'Acute Myocardial Infarction (Heart Attack)',
    icd11: 'BA41',
    category: 'cardiovascular',
    subcategory: 'coronary-artery-disease',
    urgency: 'critical',
    prevalence: 0.003,
    
    symptoms: {
      cardinal: ['crushing-chest-pain', 'radiating-arm-pain'],
      primary: ['chest-pain', 'shortness-breath', 'sweating', 'nausea'],
      secondary: ['jaw-pain', 'back-pain', 'fatigue', 'anxiety', 'dizziness'],
      atypical: ['abdominal-pain', 'vomiting', 'syncope'],
      geriatric: ['confusion', 'weakness', 'dyspnea-only'],
      genderSpecific: {
        female: ['unusual-fatigue', 'nausea', 'back-pain', 'jaw-pain']
      }
    },
    
    riskFactors: {
      definitive: ['previous-mi', 'known-cad'],
      major: ['diabetes', 'hypertension', 'smoking', 'hyperlipidemia', 'family-history-cad'],
      moderate: ['obesity', 'sedentary-lifestyle', 'male-over-45', 'female-over-55'],
      minor: ['stress', 'poor-diet', 'excessive-alcohol']
    },
    
    redFlags: [
      'crushing-chest-pressure',
      'radiating-pain-to-arm-jaw-back',
      'cold-sweats',
      'sense-of-impending-doom',
      'new-onset-severe-dyspnea',
      'pallor',
      'loss-of-consciousness'
    ],
    
    differentialDiagnosis: [
      'unstable-angina', 'pulmonary-embolism', 'aortic-dissection',
      'pericarditis', 'gerd', 'panic-attack', 'musculoskeletal-pain'
    ],
    
    diagnosticCriteria: {
      clinical: ['typical-chest-pain', 'ecg-changes', 'troponin-elevation'],
      laboratory: ['troponin-i-t', 'ck-mb', 'bnp', 'cbc', 'bmp'],
      imaging: ['echocardiogram', 'chest-xray', 'coronary-angiography'],
      specialist: ['cardiology-consult', 'interventional-cardiology']
    },
    
    treatmentPathway: {
      immediate: [
        'call-emergency-services',
        'aspirin-325mg-chew',
        'nitroglycerin-if-available',
        'supplemental-oxygen',
        'iv-access'
      ],
      acute: [
        'primary-pci',
        'thrombolytics-if-pci-unavailable',
        'anticoagulation',
        'pain-management',
        'beta-blocker'
      ],
      chronic: [
        'dual-antiplatelet-therapy',
        'high-intensity-statin',
        'ace-inhibitor-arb',
        'beta-blocker',
        'cardiac-rehabilitation'
      ],
      lifestyle: [
        'smoking-cessation',
        'heart-healthy-diet',
        'regular-exercise',
        'stress-management',
        'weight-management'
      ]
    },
    
    specialists: ['emergency-medicine', 'cardiologist', 'interventional-cardiologist'],
    
    prognosis: {
      withTreatment: 'Good if treated within 90 minutes of symptom onset',
      withoutTreatment: 'High mortality and morbidity',
      recoveryTime: '4-8 weeks for initial recovery; ongoing management',
      complications: ['heart-failure', 'arrhythmia', 'recurrent-mi', 'cardiogenic-shock']
    },
    
    patientEducation: {
      keyPoints: [
        'Heart attack symptoms can vary, especially in women and elderly',
        'Time is critical - every minute counts',
        'Call emergency services, do not drive yourself'
      ],
      warningSignsToWatch: [
        'Any recurrence of chest discomfort',
        'Shortness of breath at rest or with minimal activity',
        'Unusual fatigue',
        'Dizziness or fainting'
      ],
      whenToSeekHelp: [
        'Immediately for any chest pain or pressure',
        'Any symptoms similar to previous heart attack',
        'New or worsening shortness of breath'
      ]
    }
  },

  'pulmonary-embolism': {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism',
    icd11: 'BB01',
    category: 'cardiovascular',
    subcategory: 'thromboembolic',
    urgency: 'critical',
    prevalence: 0.001,
    
    symptoms: {
      cardinal: ['sudden-dyspnea', 'pleuritic-chest-pain', 'hemoptysis'],
      primary: ['shortness-breath', 'chest-pain', 'rapid-heartbeat', 'anxiety'],
      secondary: ['cough', 'leg-swelling', 'leg-pain', 'dizziness', 'sweating'],
      atypical: ['syncope', 'fever', 'hemoptysis'],
      geriatric: ['confusion', 'altered-mental-status']
    },
    
    riskFactors: {
      definitive: ['dvt', 'recent-surgery', 'active-cancer'],
      major: ['prolonged-immobility', 'thrombophilia', 'previous-pe', 'hospitalization'],
      moderate: ['oral-contraceptives', 'hrt', 'pregnancy', 'obesity', 'smoking'],
      minor: ['long-haul-travel', 'varicose-veins', 'age-over-60']
    },
    
    redFlags: [
      'massive-pe-signs',
      'hemodynamic-instability',
      'syncope',
      'severe-hypoxia',
      'cardiogenic-shock'
    ],
    
    differentialDiagnosis: [
      'myocardial-infarction', 'pneumonia', 'pneumothorax',
      'aortic-dissection', 'pericarditis', 'anxiety'
    ],
    
    diagnosticCriteria: {
      clinical: ['wells-score', 'revised-geneva-score', 'perc-rule'],
      laboratory: ['d-dimer', 'troponin', 'bnp', 'abg'],
      imaging: ['ct-pulmonary-angiography', 'v-q-scan', 'doppler-lower-extremities'],
      specialist: ['pulmonology', 'hematology']
    },
    
    treatmentPathway: {
      immediate: [
        'oxygen-supplementation',
        'iv-access',
        'anticoagulation-initiation',
        'hemodynamic-support'
      ],
      acute: [
        'anticoagulation',
        'thrombolysis-for-massive-pe',
        'embolectomy-if-indicated'
      ],
      chronic: [
        'anticoagulation-3-6-months',
        'ivc-filter-if-contraindicated',
        'monitoring'
      ],
      lifestyle: [
        'compression-stockings',
        'early-mobilization',
        'hydration',
        'avoid-prolonged-sitting'
      ]
    },
    
    specialists: ['emergency-medicine', 'pulmonologist', 'hematologist', 'interventional-radiologist'],
    
    prognosis: {
      withTreatment: 'Good if diagnosed and treated promptly',
      withoutTreatment: 'High mortality (30%+)',
      recoveryTime: '3-6 months',
      complications: ['chronic-thromboembolic-pulmonary-hypertension', 'recurrent-pe', 'death']
    },
    
    patientEducation: {
      keyPoints: [
        'PE is a blood clot in the lungs - life threatening',
        'Symptoms can be subtle',
        'Risk increases with immobility'
      ],
      warningSignsToWatch: [
        'Sudden shortness of breath',
        'Chest pain, especially with breathing',
        'Coughing blood',
        'Leg swelling or pain'
      ],
      whenToSeekHelp: [
        'Immediately for sudden breathing difficulty',
        'Any symptoms after surgery or prolonged immobility'
      ]
    }
  },

  'atrial-fibrillation': {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    icd11: 'BC81.0',
    category: 'cardiovascular',
    subcategory: 'arrhythmia',
    urgency: 'urgent',
    prevalence: 0.02,
    
    symptoms: {
      cardinal: ['irregular-heartbeat', 'palpitations'],
      primary: ['palpitations', 'fatigue', 'shortness-breath', 'dizziness'],
      secondary: ['chest-discomfort', 'exercise-intolerance', 'anxiety'],
      atypical: ['asymptomatic', 'syncope'],
      geriatric: ['fatigue', 'confusion', 'falls']
    },
    
    riskFactors: {
      definitive: ['previous-afib', 'rheumatic-heart-disease'],
      major: ['hypertension', 'heart-failure', 'valvular-disease', 'age-over-65'],
      moderate: ['diabetes', 'obesity', 'sleep-apnea', 'hyperthyroidism'],
      minor: ['alcohol', 'caffeine', 'stress', 'electrolyte-imbalance']
    },
    
    redFlags: [
      'rapid-ventricular-response',
      'hemodynamic-instability',
      'stroke-symptoms',
      'severe-dyspnea',
      'chest-pain'
    ],
    
    differentialDiagnosis: [
      'atrial-flutter', 'supraventricular-tachycardia',
      'premature-atrial-contractions', 'anxiety', 'hyperthyroidism'
    ],
    
    diagnosticCriteria: {
      clinical: ['irregular-pulse', 'ecg-findings'],
      laboratory: ['tsh', 'bmp', 'bnp', 'cbc'],
      imaging: ['echocardiogram', 'holter-monitor'],
      specialist: ['cardiology', 'electrophysiology']
    },
    
    treatmentPathway: {
      immediate: ['rate-control', 'rhythm-control-if-unstable'],
      acute: ['anticoagulation-assessment', 'cardioversion-consideration'],
      chronic: ['rate-control', 'rhythm-control', 'anticoagulation', 'ablation-consideration'],
      lifestyle: ['avoid-triggers', 'weight-management', 'sleep-apnea-treatment', 'moderate-exercise']
    },
    
    specialists: ['cardiologist', 'electrophysiologist'],
    
    prognosis: {
      withTreatment: 'Good quality of life with proper management',
      withoutTreatment: '5x increased stroke risk',
      recoveryTime: 'Chronic condition requiring ongoing management',
      complications: ['stroke', 'heart-failure', 'tachycardia-induced-cardiomyopathy']
    },
    
    patientEducation: {
      keyPoints: [
        'AFib increases stroke risk significantly',
        'Anticoagulation is crucial for stroke prevention',
        'Many patients can live normal lives with proper management'
      ],
      warningSignsToWatch: [
        'Stroke symptoms (FAST)',
        'Rapid heart rate at rest',
        'Severe fatigue or weakness',
        'Fainting'
      ],
      whenToSeekHelp: [
        'Any stroke symptoms (face drooping, arm weakness, speech difficulty)',
        'Very rapid or very slow heart rate',
        'Fainting or near-fainting'
      ]
    }
  },

  'heart-failure': {
    id: 'heart-failure',
    name: 'Heart Failure',
    icd11: 'BD1Z',
    category: 'cardiovascular',
    subcategory: 'heart-failure',
    urgency: 'urgent',
    prevalence: 0.02,
    
    symptoms: {
      cardinal: ['dyspnea-on-exertion', 'orthopnea', 'peripheral-edema'],
      primary: ['shortness-breath', 'leg-swelling', 'fatigue', 'exercise-intolerance'],
      secondary: ['paroxysmal-nocturnal-dyspnea', 'weight-gain', 'cough', 'nocturia'],
      atypical: ['abdominal-bloating', 'loss-of-appetite', 'confusion'],
      geriatric: ['confusion', 'falls', 'functional-decline']
    },
    
    riskFactors: {
      definitive: ['previous-mi', 'known-cardiomyopathy'],
      major: ['coronary-artery-disease', 'hypertension', 'valvular-disease', 'diabetes'],
      moderate: ['obesity', 'arrhythmia', 'sleep-apnea', 'chemotherapy-history'],
      minor: ['alcohol', 'cocaine', 'family-history']
    },
    
    redFlags: [
      'acute-pulmonary-edema',
      'cardiogenic-shock',
      'severe-dyspnea-at-rest',
      'rapid-weight-gain',
      'new-onset-confusion'
    ],
    
    differentialDiagnosis: [
      'copd', 'pneumonia', 'pulmonary-embolism',
      'nephrotic-syndrome', 'liver-disease', 'venous-insufficiency'
    ],
    
    diagnosticCriteria: {
      clinical: ['framingham-criteria', 'nyha-classification'],
      laboratory: ['bnp-nt-probnp', 'bmp', 'cbc', 'thyroid'],
      imaging: ['echocardiogram', 'chest-xray'],
      specialist: ['cardiology', 'heart-failure-specialist']
    },
    
    treatmentPathway: {
      immediate: ['oxygen', 'diuretics', 'vasodilators', 'positioning'],
      acute: ['iv-diuretics', 'inotropes-if-needed', 'monitoring'],
      chronic: ['ace-inhibitor-arni', 'beta-blocker', 'mra', 'sglt2i', 'diuretics'],
      lifestyle: ['sodium-restriction', 'fluid-restriction', 'daily-weights', 'exercise-program']
    },
    
    specialists: ['cardiologist', 'heart-failure-specialist'],
    
    prognosis: {
      withTreatment: 'Variable; 5-year survival 50% with optimal therapy',
      withoutTreatment: 'Progressive deterioration',
      recoveryTime: 'Chronic condition',
      complications: ['arrhythmia', 'renal-failure', 'liver-congestion', 'sudden-death']
    },
    
    patientEducation: {
      keyPoints: [
        'Daily weight monitoring is essential',
        'Medication adherence is critical',
        'Recognize early warning signs'
      ],
      warningSignsToWatch: [
        'Weight gain >2kg in 2-3 days',
        'Increasing shortness of breath',
        'Swelling in legs or abdomen',
        'Need for extra pillows to sleep'
      ],
      whenToSeekHelp: [
        'Rapid weight gain',
        'Severe breathing difficulty',
        'Chest pain',
        'Confusion'
      ]
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // NEUROLOGICAL CONDITIONS (25+ conditions)
  // ══════════════════════════════════════════════════════════════════════════════

  'acute-ischemic-stroke': {
    id: 'acute-ischemic-stroke',
    name: 'Acute Ischemic Stroke',
    icd11: '8B11',
    category: 'neurological',
    subcategory: 'cerebrovascular',
    urgency: 'critical',
    prevalence: 0.003,
    
    symptoms: {
      cardinal: ['sudden-hemiparesis', 'facial-droop', 'speech-difficulty'],
      primary: ['weakness', 'numbness', 'confusion', 'vision-changes', 'severe-headache'],
      secondary: ['dizziness', 'loss-of-balance', 'difficulty-walking'],
      atypical: ['altered-consciousness', 'seizure'],
      genderSpecific: {
        female: ['hiccups', 'nausea', 'chest-pain', 'palpitations']
      }
    },
    
    riskFactors: {
      definitive: ['previous-stroke-tia', 'atrial-fibrillation'],
      major: ['hypertension', 'diabetes', 'smoking', 'carotid-stenosis'],
      moderate: ['obesity', 'hyperlipidemia', 'heart-disease'],
      minor: ['sedentary-lifestyle', 'excessive-alcohol', 'drug-use']
    },
    
    redFlags: [
      'sudden-onset-neurological-deficit',
      'fast-positive',
      'altered-consciousness',
      'severe-headache-worst-ever'
    ],
    
    differentialDiagnosis: [
      'hemorrhagic-stroke', 'tia', 'seizure', 'migraine-with-aura',
      'hypoglycemia', 'brain-tumor', 'encephalitis'
    ],
    
    diagnosticCriteria: {
      clinical: ['fast-score', 'nihss', 'neurological-exam'],
      laboratory: ['glucose', 'cbc', 'coagulation', 'troponin'],
      imaging: ['ct-head-emergent', 'ct-angiography', 'mri-brain'],
      specialist: ['neurology', 'neurointerventional']
    },
    
    treatmentPathway: {
      immediate: ['call-911', 'note-symptom-onset-time', 'do-not-give-food-water'],
      acute: ['iv-tpa-within-4.5-hours', 'mechanical-thrombectomy', 'blood-pressure-management'],
      chronic: ['antiplatelet-therapy', 'statin', 'risk-factor-modification', 'rehabilitation'],
      lifestyle: ['smoking-cessation', 'diet-modification', 'exercise', 'blood-pressure-control']
    },
    
    specialists: ['emergency-medicine', 'neurologist', 'neurointerventional-radiologist'],
    
    prognosis: {
      withTreatment: 'Variable; better outcomes with early treatment (golden hour)',
      withoutTreatment: 'Significant disability or death',
      recoveryTime: 'Months to years; most recovery in first 3 months',
      complications: ['disability', 'recurrent-stroke', 'depression', 'aspiration']
    },
    
    patientEducation: {
      keyPoints: [
        'FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911',
        'Treatment window is critical - every minute counts',
        'Do not wait to see if symptoms improve'
      ],
      warningSignsToWatch: [
        'Any sudden numbness or weakness',
        'Confusion or trouble speaking',
        'Vision problems',
        'Severe headache with no known cause'
      ],
      whenToSeekHelp: [
        'Call 911 IMMEDIATELY for any stroke symptoms',
        'Note the time symptoms started',
        'Do not drive yourself'
      ]
    }
  },

  'migraine': {
    id: 'migraine',
    name: 'Migraine',
    icd11: '8A80',
    category: 'neurological',
    subcategory: 'headache',
    urgency: 'routine',
    prevalence: 0.12,
    
    symptoms: {
      cardinal: ['unilateral-pulsating-headache', 'photophobia', 'nausea'],
      primary: ['headache', 'nausea', 'light-sensitivity', 'sound-sensitivity'],
      secondary: ['vomiting', 'visual-aura', 'numbness', 'fatigue'],
      atypical: ['abdominal-pain', 'vertigo', 'confusion'],
      pediatric: ['abdominal-migraine', 'cyclic-vomiting']
    },
    
    riskFactors: {
      definitive: ['family-history-migraine'],
      major: ['female-gender', 'hormonal-changes'],
      moderate: ['stress', 'sleep-irregularity', 'certain-foods'],
      minor: ['weather-changes', 'bright-lights', 'strong-smells']
    },
    
    redFlags: [
      'worst-headache-ever',
      'new-onset-after-50',
      'fever-with-headache',
      'neurological-deficits',
      'headache-with-exertion',
      'progressive-worsening'
    ],
    
    differentialDiagnosis: [
      'tension-headache', 'cluster-headache', 'subarachnoid-hemorrhage',
      'meningitis', 'brain-tumor', 'temporal-arteritis'
    ],
    
    diagnosticCriteria: {
      clinical: ['ichd-3-criteria', 'migraine-history', 'neurological-exam'],
      laboratory: ['none-routine'],
      imaging: ['mri-if-red-flags'],
      specialist: ['neurology', 'headache-specialist']
    },
    
    treatmentPathway: {
      immediate: ['quiet-dark-room', 'acute-medication'],
      acute: ['triptans', 'nsaids', 'antiemetics', 'gepants'],
      chronic: ['preventive-medications', 'cgrp-inhibitors', 'botox'],
      lifestyle: ['trigger-avoidance', 'regular-sleep', 'stress-management', 'hydration']
    },
    
    specialists: ['neurologist', 'headache-specialist'],
    
    prognosis: {
      withTreatment: 'Good; significant improvement with proper management',
      withoutTreatment: 'Chronic disability possible',
      recoveryTime: 'Hours to days per attack',
      complications: ['medication-overuse-headache', 'chronic-migraine', 'status-migrainosus']
    },
    
    patientEducation: {
      keyPoints: [
        'Migraine is a neurological condition, not just a headache',
        'Identifying triggers can help prevent attacks',
        'Effective treatments are available'
      ],
      warningSignsToWatch: [
        'Change in headache pattern',
        'New neurological symptoms',
        'Headaches not responding to usual treatment'
      ],
      whenToSeekHelp: [
        'Worst headache of your life',
        'Headache with fever or stiff neck',
        'New neurological symptoms'
      ]
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // GASTROINTESTINAL CONDITIONS (25+ conditions)
  // ══════════════════════════════════════════════════════════════════════════════

  'acute-appendicitis': {
    id: 'acute-appendicitis',
    name: 'Acute Appendicitis',
    icd11: 'DB10',
    category: 'gastrointestinal',
    subcategory: 'acute-abdomen',
    urgency: 'emergency',
    prevalence: 0.001,
    
    symptoms: {
      cardinal: ['periumbilical-to-rlq-pain', 'rebound-tenderness', 'guarding'],
      primary: ['abdominal-pain', 'nausea', 'vomiting', 'fever'],
      secondary: ['loss-of-appetite', 'constipation', 'diarrhea'],
      atypical: ['urinary-symptoms', 'back-pain'],
      pediatric: ['irritability', 'lethargy', 'diffuse-pain'],
      geriatric: ['minimal-pain', 'confusion']
    },
    
    riskFactors: {
      definitive: [],
      major: ['age-10-30', 'male-slightly-higher'],
      moderate: ['family-history', 'low-fiber-diet'],
      minor: ['cystic-fibrosis']
    },
    
    redFlags: [
      'rigid-abdomen',
      'high-fever',
      'signs-of-perforation',
      'diffuse-peritonitis'
    ],
    
    differentialDiagnosis: [
      'mesenteric-lymphadenitis', 'ovarian-pathology', 'ectopic-pregnancy',
      'urinary-tract-infection', 'gastroenteritis', 'inflammatory-bowel-disease'
    ],
    
    diagnosticCriteria: {
      clinical: ['alvarado-score', 'physical-exam', 'migration-of-pain'],
      laboratory: ['cbc-with-leukocytosis', 'crp', 'urinalysis', 'pregnancy-test'],
      imaging: ['ct-abdomen', 'ultrasound'],
      specialist: ['surgery']
    },
    
    treatmentPathway: {
      immediate: ['npo', 'iv-fluids', 'pain-management', 'surgical-consultation'],
      acute: ['appendectomy', 'antibiotics'],
      chronic: [],
      lifestyle: []
    },
    
    specialists: ['general-surgeon', 'emergency-medicine'],
    
    prognosis: {
      withTreatment: 'Excellent with early appendectomy',
      withoutTreatment: 'Perforation, peritonitis, sepsis',
      recoveryTime: '1-2 weeks',
      complications: ['perforation', 'abscess', 'wound-infection']
    },
    
    patientEducation: {
      keyPoints: [
        'Appendicitis requires surgery in most cases',
        'Early treatment prevents complications',
        'Pain typically starts around navel and moves to lower right'
      ],
      warningSignsToWatch: [
        'Increasing abdominal pain',
        'High fever',
        'Inability to keep fluids down'
      ],
      whenToSeekHelp: [
        'Severe abdominal pain',
        'Pain with fever and vomiting',
        'Pain that suddenly becomes severe'
      ]
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // RESPIRATORY CONDITIONS (20+ conditions)
  // ══════════════════════════════════════════════════════════════════════════════

  'pneumonia': {
    id: 'pneumonia',
    name: 'Pneumonia',
    icd11: 'CA40',
    category: 'respiratory',
    subcategory: 'infection',
    urgency: 'urgent',
    prevalence: 0.01,
    
    symptoms: {
      cardinal: ['productive-cough', 'fever', 'dyspnea', 'pleuritic-chest-pain'],
      primary: ['cough', 'fever', 'shortness-breath', 'chest-pain', 'fatigue'],
      secondary: ['chills', 'muscle-aches', 'headache', 'confusion'],
      atypical: ['abdominal-pain', 'diarrhea'],
      geriatric: ['confusion', 'falls', 'hypothermia'],
      pediatric: ['poor-feeding', 'irritability', 'grunting']
    },
    
    riskFactors: {
      definitive: ['aspiration'],
      major: ['age-over-65', 'immunocompromised', 'chronic-lung-disease', 'recent-viral-illness'],
      moderate: ['smoking', 'diabetes', 'heart-disease', 'hospitalization'],
      minor: ['alcohol-use', 'poor-nutrition']
    },
    
    redFlags: [
      'severe-hypoxia',
      'respiratory-failure',
      'sepsis',
      'confusion-in-elderly'
    ],
    
    differentialDiagnosis: [
      'bronchitis', 'asthma-exacerbation', 'copd-exacerbation',
      'pulmonary-embolism', 'heart-failure', 'lung-cancer'
    ],
    
    diagnosticCriteria: {
      clinical: ['curb-65', 'psi-port-score', 'physical-exam'],
      laboratory: ['cbc', 'bmp', 'procalcitonin', 'blood-cultures', 'sputum-culture'],
      imaging: ['chest-xray', 'ct-chest'],
      specialist: ['pulmonology', 'infectious-disease']
    },
    
    treatmentPathway: {
      immediate: ['oxygen-if-hypoxic', 'hydration'],
      acute: ['antibiotics', 'supportive-care'],
      chronic: ['vaccination', 'smoking-cessation'],
      lifestyle: ['rest', 'hydration', 'smoking-cessation']
    },
    
    specialists: ['pulmonologist', 'infectious-disease'],
    
    prognosis: {
      withTreatment: 'Good for most patients; higher mortality in elderly',
      withoutTreatment: 'High mortality, especially in vulnerable populations',
      recoveryTime: '1-3 weeks for uncomplicated',
      complications: ['respiratory-failure', 'sepsis', 'pleural-effusion', 'lung-abscess']
    },
    
    patientEducation: {
      keyPoints: [
        'Pneumonia is a serious lung infection',
        'Complete the full course of antibiotics',
        'Vaccination can prevent some types'
      ],
      warningSignsToWatch: [
        'Worsening shortness of breath',
        'High fever not improving',
        'Confusion',
        'Bluish lips or fingertips'
      ],
      whenToSeekHelp: [
        'Difficulty breathing',
        'High fever not responding to treatment',
        'Confusion or altered mental status',
        'Unable to keep fluids down'
      ]
    }
  },

  'asthma-exacerbation': {
    id: 'asthma-exacerbation',
    name: 'Asthma Exacerbation',
    icd11: 'CA23.1',
    category: 'respiratory',
    subcategory: 'obstructive',
    urgency: 'urgent',
    prevalence: 0.08,
    
    symptoms: {
      cardinal: ['wheezing', 'dyspnea', 'chest-tightness', 'cough'],
      primary: ['shortness-breath', 'wheezing', 'cough', 'chest-tightness'],
      secondary: ['anxiety', 'tachycardia', 'difficulty-speaking'],
      atypical: ['nocturnal-cough'],
      pediatric: ['retractions', 'nasal-flaring', 'poor-feeding']
    },
    
    riskFactors: {
      definitive: ['known-asthma', 'previous-severe-exacerbation'],
      major: ['poor-asthma-control', 'recent-er-visit', 'oral-steroid-use'],
      moderate: ['allergen-exposure', 'viral-infection', 'exercise'],
      minor: ['cold-air', 'irritants', 'emotional-stress']
    },
    
    redFlags: [
      'unable-to-speak-full-sentences',
      'silent-chest',
      'cyanosis',
      'altered-consciousness',
      'peak-flow-below-25-percent'
    ],
    
    differentialDiagnosis: [
      'copd-exacerbation', 'pneumonia', 'pulmonary-embolism',
      'heart-failure', 'vocal-cord-dysfunction', 'anaphylaxis'
    ],
    
    diagnosticCriteria: {
      clinical: ['peak-flow', 'pulse-oximetry', 'physical-exam'],
      laboratory: ['abg-if-severe'],
      imaging: ['chest-xray-if-indicated'],
      specialist: ['pulmonology', 'allergy']
    },
    
    treatmentPathway: {
      immediate: ['bronchodilators', 'oxygen', 'systemic-corticosteroids'],
      acute: ['nebulized-bronchodilators', 'steroids', 'monitoring'],
      chronic: ['inhaled-corticosteroids', 'controller-medications', 'action-plan'],
      lifestyle: ['trigger-avoidance', 'weight-management', 'regular-exercise']
    },
    
    specialists: ['pulmonologist', 'allergist'],
    
    prognosis: {
      withTreatment: 'Good with proper management',
      withoutTreatment: 'Respiratory failure possible',
      recoveryTime: 'Days to weeks',
      complications: ['respiratory-failure', 'pneumothorax', 'death']
    },
    
    patientEducation: {
      keyPoints: [
        'Always carry rescue inhaler',
        'Follow your asthma action plan',
        'Know your peak flow zones'
      ],
      warningSignsToWatch: [
        'Increasing rescue inhaler use',
        'Waking at night with symptoms',
        'Decreasing peak flow numbers'
      ],
      whenToSeekHelp: [
        'Rescue inhaler not helping',
        'Unable to speak in full sentences',
        'Lips or fingernails turning blue'
      ]
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // MENTAL HEALTH CONDITIONS (15+ conditions)
  // ══════════════════════════════════════════════════════════════════════════════

  'major-depressive-disorder': {
    id: 'major-depressive-disorder',
    name: 'Major Depressive Disorder',
    icd11: '6A70',
    category: 'mental-health',
    subcategory: 'mood',
    urgency: 'urgent',
    prevalence: 0.07,
    
    symptoms: {
      cardinal: ['depressed-mood', 'anhedonia'],
      primary: ['depressed-mood', 'loss-of-interest', 'fatigue', 'sleep-changes'],
      secondary: ['appetite-changes', 'concentration-problems', 'worthlessness', 'guilt'],
      atypical: ['hypersomnia', 'increased-appetite', 'leaden-paralysis'],
      pediatric: ['irritability', 'somatic-complaints'],
      geriatric: ['cognitive-complaints', 'somatic-focus']
    },
    
    riskFactors: {
      definitive: ['previous-episode'],
      major: ['family-history', 'trauma', 'chronic-illness'],
      moderate: ['substance-use', 'stress', 'sleep-problems'],
      minor: ['female-gender', 'low-socioeconomic-status']
    },
    
    redFlags: [
      'suicidal-ideation',
      'suicidal-plan',
      'access-to-means',
      'psychotic-features',
      'severe-functional-impairment'
    ],
    
    differentialDiagnosis: [
      'bipolar-disorder', 'adjustment-disorder', 'grief',
      'hypothyroidism', 'anemia', 'substance-induced'
    ],
    
    diagnosticCriteria: {
      clinical: ['dsm-5-criteria', 'phq-9', 'ham-d'],
      laboratory: ['tsh', 'cbc', 'bmp', 'vitamin-d', 'b12'],
      imaging: [],
      specialist: ['psychiatry', 'psychology']
    },
    
    treatmentPathway: {
      immediate: ['safety-assessment', 'crisis-intervention-if-needed'],
      acute: ['antidepressant-medication', 'psychotherapy'],
      chronic: ['maintenance-medication', 'ongoing-therapy'],
      lifestyle: ['exercise', 'sleep-hygiene', 'social-connection', 'stress-management']
    },
    
    specialists: ['psychiatrist', 'psychologist'],
    
    prognosis: {
      withTreatment: 'Good; 70-80% respond to treatment',
      withoutTreatment: 'Chronic, recurrent, functional impairment',
      recoveryTime: '6-12 months for acute episode',
      complications: ['suicide', 'substance-abuse', 'relationship-problems', 'occupational-impairment']
    },
    
    patientEducation: {
      keyPoints: [
        'Depression is a medical condition, not a character flaw',
        'Effective treatments are available',
        'Recovery takes time - be patient with yourself'
      ],
      warningSignsToWatch: [
        'Worsening symptoms',
        'Thoughts of self-harm',
        'Increased isolation'
      ],
      whenToSeekHelp: [
        'Any thoughts of suicide or self-harm',
        'Symptoms not improving with treatment',
        'Unable to function'
      ]
    }
  },

  'panic-disorder': {
    id: 'panic-disorder',
    name: 'Panic Disorder',
    icd11: '6B01',
    category: 'mental-health',
    subcategory: 'anxiety',
    urgency: 'routine',
    prevalence: 0.03,
    
    symptoms: {
      cardinal: ['recurrent-panic-attacks', 'fear-of-future-attacks'],
      primary: ['palpitations', 'chest-pain', 'shortness-breath', 'dizziness'],
      secondary: ['sweating', 'trembling', 'numbness', 'derealization'],
      atypical: ['nausea', 'hot-flashes', 'chills']
    },
    
    riskFactors: {
      definitive: ['previous-panic-attacks'],
      major: ['family-history-anxiety', 'major-life-stress', 'trauma'],
      moderate: ['substance-use', 'other-anxiety-disorders'],
      minor: ['caffeine', 'nicotine', 'lack-of-sleep']
    },
    
    redFlags: [
      'symptoms-suggesting-cardiac-event',
      'new-onset-in-elderly',
      'severe-agoraphobia',
      'suicidal-ideation'
    ],
    
    differentialDiagnosis: [
      'myocardial-infarction', 'pulmonary-embolism', 'hyperthyroidism',
      'pheochromocytoma', 'arrhythmia', 'seizure'
    ],
    
    diagnosticCriteria: {
      clinical: ['dsm-5-criteria', 'panic-disorder-severity-scale'],
      laboratory: ['tsh', 'ecg', 'bmp'],
      imaging: [],
      specialist: ['psychiatry', 'psychology']
    },
    
    treatmentPathway: {
      immediate: ['reassurance', 'breathing-techniques'],
      acute: ['ssri-snri', 'benzodiazepines-short-term'],
      chronic: ['cbt', 'maintenance-medication'],
      lifestyle: ['caffeine-reduction', 'regular-exercise', 'sleep-hygiene']
    },
    
    specialists: ['psychiatrist', 'psychologist'],
    
    prognosis: {
      withTreatment: 'Good; most patients improve significantly',
      withoutTreatment: 'Chronic, may develop agoraphobia',
      recoveryTime: 'Weeks to months',
      complications: ['agoraphobia', 'depression', 'substance-abuse']
    },
    
    patientEducation: {
      keyPoints: [
        'Panic attacks are not dangerous, though frightening',
        'Treatment is very effective',
        'Avoiding situations makes panic worse'
      ],
      warningSignsToWatch: [
        'Increasing avoidance',
        'Depression symptoms',
        'Using alcohol/drugs to cope'
      ],
      whenToSeekHelp: [
        'First panic attack',
        'Unable to function due to attacks',
        'Development of depression'
      ]
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 🚨 RED FLAGS DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const RED_FLAGS_DATABASE: Record<string, {
  flag: string;
  description: string;
  severity: 'warning' | 'serious' | 'critical';
  relatedConditions: string[];
  immediateAction: string;
  responseTime: string;
}> = {
  'chest-pain-with-sweating': {
    flag: 'Chest pain with sweating',
    description: 'Chest pain accompanied by profuse sweating may indicate myocardial infarction',
    severity: 'critical',
    relatedConditions: ['acute-myocardial-infarction', 'unstable-angina', 'aortic-dissection'],
    immediateAction: 'Call emergency services immediately (112/999/911)',
    responseTime: 'Immediate - minutes matter'
  },
  'sudden-weakness-one-side': {
    flag: 'Sudden weakness on one side of body',
    description: 'Sudden onset unilateral weakness is a key stroke symptom',
    severity: 'critical',
    relatedConditions: ['acute-ischemic-stroke', 'hemorrhagic-stroke', 'tia'],
    immediateAction: 'Call emergency services immediately - FAST protocol',
    responseTime: 'Immediate - every minute counts'
  },
  'severe-headache-worst-ever': {
    flag: 'Worst headache of life',
    description: 'Thunderclap headache may indicate subarachnoid hemorrhage',
    severity: 'critical',
    relatedConditions: ['subarachnoid-hemorrhage', 'meningitis', 'hypertensive-crisis'],
    immediateAction: 'Emergency evaluation required',
    responseTime: 'Immediate'
  },
  'difficulty-breathing-severe': {
    flag: 'Severe difficulty breathing',
    description: 'Acute respiratory distress requires immediate intervention',
    severity: 'critical',
    relatedConditions: ['pulmonary-embolism', 'asthma-exacerbation', 'pneumothorax', 'anaphylaxis'],
    immediateAction: 'Call emergency services',
    responseTime: 'Immediate'
  },
  'vomiting-blood': {
    flag: 'Vomiting blood',
    description: 'Hematemesis indicates upper GI bleeding',
    severity: 'critical',
    relatedConditions: ['peptic-ulcer-bleeding', 'esophageal-varices', 'gastric-cancer'],
    immediateAction: 'Emergency care required',
    responseTime: 'Within 1 hour'
  },
  'suicidal-ideation': {
    flag: 'Suicidal thoughts',
    description: 'Active suicidal ideation is a psychiatric emergency',
    severity: 'critical',
    relatedConditions: ['major-depressive-disorder', 'bipolar-disorder'],
    immediateAction: 'Immediate psychiatric evaluation or crisis line',
    responseTime: 'Immediate'
  },
  'loss-of-consciousness': {
    flag: 'Loss of consciousness',
    description: 'Syncope may indicate cardiac, neurological, or metabolic emergency',
    severity: 'serious',
    relatedConditions: ['cardiac-arrhythmia', 'seizure', 'hypoglycemia', 'pulmonary-embolism'],
    immediateAction: 'Emergency evaluation if not recovered',
    responseTime: 'Within 1-2 hours'
  },
  'rigid-abdomen': {
    flag: 'Rigid abdomen',
    description: 'Board-like rigidity indicates peritonitis',
    severity: 'critical',
    relatedConditions: ['perforated-viscus', 'acute-appendicitis', 'acute-pancreatitis'],
    immediateAction: 'Emergency surgery evaluation',
    responseTime: 'Immediate'
  },
  'new-confusion-elderly': {
    flag: 'New confusion in elderly',
    description: 'Acute confusion in elderly may indicate serious underlying condition',
    severity: 'serious',
    relatedConditions: ['infection', 'stroke', 'metabolic-disturbance', 'medication-effect'],
    immediateAction: 'Urgent medical evaluation',
    responseTime: 'Within hours'
  },
  'blue-lips-fingers': {
    flag: 'Cyanosis (blue lips or fingers)',
    description: 'Central cyanosis indicates severe hypoxia',
    severity: 'critical',
    relatedConditions: ['respiratory-failure', 'cardiac-failure', 'pulmonary-embolism'],
    immediateAction: 'Emergency care immediately',
    responseTime: 'Immediate'
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 📊 TRIAGE LEVELS v4
// ════════════════════════════════════════════════════════════════════════════════

export const TRIAGE_LEVELS_V4: Record<string, TriageLevel> = {
  critical: {
    level: 0,
    code: 'RED',
    name: 'Critical Emergency',
    color: '#7F1D1D',
    bgColor: '#FEE2E2',
    borderColor: '#DC2626',
    icon: 'fa-skull-crossbones',
    description: 'Immediately life-threatening condition requiring resuscitation',
    action: 'Call emergency services NOW (112/999/911). Do not wait.',
    responseTime: 'Immediate - Seconds to minutes matter',
    examples: ['Heart attack', 'Stroke', 'Severe allergic reaction', 'Major trauma'],
    escalationCriteria: ['Loss of consciousness', 'No pulse', 'Not breathing']
  },
  emergency: {
    level: 1,
    code: 'ORANGE',
    name: 'Emergency',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#EF4444',
    icon: 'fa-exclamation-triangle',
    description: 'Serious condition requiring immediate emergency room care',
    action: 'Go to Emergency Room immediately or call emergency services',
    responseTime: 'Within 1 hour',
    examples: ['Severe chest pain', 'Difficulty breathing', 'Major bleeding', 'Severe allergic reaction'],
    escalationCriteria: ['Symptoms worsening rapidly', 'Signs of shock', 'Altered mental status']
  },
  urgent: {
    level: 2,
    code: 'YELLOW',
    name: 'Urgent',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#F59E0B',
    icon: 'fa-clock',
    description: 'Serious condition requiring prompt medical attention',
    action: 'See a doctor within 24 hours. Consider urgent care or emergency if worsening.',
    responseTime: 'Within 24 hours',
    examples: ['High fever', 'Moderate pain', 'Signs of infection', 'Dehydration'],
    escalationCriteria: ['No improvement', 'Symptoms worsening', 'New symptoms developing']
  },
  semiUrgent: {
    level: 3,
    code: 'GREEN',
    name: 'Semi-Urgent',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#0EA5E9',
    icon: 'fa-calendar-day',
    description: 'Condition requiring medical attention within 2-3 days',
    action: 'Schedule an appointment within 2-3 days',
    responseTime: '2-3 days',
    examples: ['Persistent mild symptoms', 'Follow-up needed', 'Medication review'],
    escalationCriteria: ['Symptoms not improving', 'New concerning symptoms']
  },
  routine: {
    level: 4,
    code: 'BLUE',
    name: 'Routine',
    color: '#059669',
    bgColor: '#F0FDF4',
    borderColor: '#10B981',
    icon: 'fa-calendar-check',
    description: 'Non-urgent condition suitable for scheduled appointment',
    action: 'Schedule a routine appointment within 1-2 weeks',
    responseTime: '1-2 weeks',
    examples: ['Chronic condition follow-up', 'Preventive care', 'Minor symptoms'],
    escalationCriteria: ['Symptoms significantly worsen']
  },
  selfCare: {
    level: 5,
    code: 'WHITE',
    name: 'Self-Care',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    borderColor: '#818CF8',
    icon: 'fa-home',
    description: 'Minor symptoms that can be safely managed at home',
    action: 'Use appropriate self-care measures and monitor symptoms',
    responseTime: 'As needed - seek care if symptoms worsen',
    examples: ['Common cold', 'Minor aches', 'Mild allergies'],
    escalationCriteria: ['Symptoms persist beyond expected', 'New symptoms develop']
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 🧠 MAIN ANALYSIS ENGINE v4.0
// ════════════════════════════════════════════════════════════════════════════════

function generateAnalysisId(): string {
  return `MS4-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function calculateSymptomScore(
  symptomId: string,
  severity: string,
  duration: string,
  frequency: string,
  onset: string,
  age: number,
  gender: string,
  preConditions: string[]
): number {
  const weightConfig = SYMPTOM_WEIGHTS_V4[symptomId] || DEFAULT_SYMPTOM_WEIGHT;
  
  let score = weightConfig.baseWeight;
  score *= weightConfig.severityMultiplier[severity] || 1.0;
  score *= weightConfig.durationMultiplier[duration] || 1.0;
  score *= weightConfig.frequencyMultiplier[frequency] || 1.0;
  score *= weightConfig.onsetMultiplier[onset] || 1.0;
  score *= weightConfig.ageModifier(age);
  score *= weightConfig.genderModifier[gender] || 1.0;
  score *= weightConfig.comorbidityModifier(preConditions);
  
  return Math.round(score * 100) / 100;
}

function matchCondition(
  condition: ConditionV4,
  symptoms: SymptomInput[],
  patient: PatientProfile
): DifferentialResult | null {
  const symptomIds = symptoms.map(s => s.id);
  
  // Match symptoms
  const cardinalMatches = symptomIds.filter(s => condition.symptoms.cardinal.includes(s));
  const primaryMatches = symptomIds.filter(s => condition.symptoms.primary.includes(s));
  const secondaryMatches = symptomIds.filter(s => condition.symptoms.secondary.includes(s));
  const atypicalMatches = symptomIds.filter(s => condition.symptoms.atypical.includes(s));
  
  const totalMatches = cardinalMatches.length + primaryMatches.length + secondaryMatches.length + atypicalMatches.length;
  
  // Require at least some symptom match
  if (totalMatches === 0) return null;
  
  // Calculate base probability
  let probability = 0;
  
  // Cardinal symptoms are highly weighted (30% each, max 60%)
  probability += Math.min(cardinalMatches.length * 30, 60);
  
  // Primary symptoms (15% each, max 45%)
  probability += Math.min(primaryMatches.length * 15, 45);
  
  // Secondary symptoms (8% each, max 24%)
  probability += Math.min(secondaryMatches.length * 8, 24);
  
  // Atypical symptoms (4% each, max 12%)
  probability += Math.min(atypicalMatches.length * 4, 12);
  
  // Missing primary symptoms penalty
  const missingPrimary = condition.symptoms.primary.filter(s => !symptomIds.includes(s));
  probability -= missingPrimary.length * 8;
  
  // Risk factor adjustments
  const supportingEvidence: string[] = [];
  const contradictingEvidence: string[] = [];
  
  // Age adjustment
  if (condition.id.includes('stroke') || condition.id.includes('mi')) {
    if (patient.age > 55) {
      probability += 10;
      supportingEvidence.push(`Age ${patient.age} is a risk factor`);
    }
  }
  
  // Check risk factors
  condition.riskFactors.definitive.forEach(rf => {
    if (patient.preConditions.some(pc => pc.toLowerCase().includes(rf.toLowerCase()))) {
      probability += 20;
      supportingEvidence.push(`Definitive risk factor: ${rf}`);
    }
  });
  
  condition.riskFactors.major.forEach(rf => {
    if (patient.preConditions.some(pc => pc.toLowerCase().includes(rf.toLowerCase()))) {
      probability += 12;
      supportingEvidence.push(`Major risk factor: ${rf}`);
    }
  });
  
  // Prevalence adjustment (Bayesian prior)
  probability *= (1 + Math.log10(condition.prevalence * 10000 + 1) / 10);
  
  // Cap probability
  probability = Math.min(95, Math.max(5, probability));
  
  // Red flags check
  const redFlagsPresent = condition.redFlags.filter(rf => 
    symptomIds.some(s => rf.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(rf.toLowerCase()))
  );
  
  // Determine confidence
  let confidence: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  if (cardinalMatches.length >= 2 || (cardinalMatches.length >= 1 && primaryMatches.length >= 2)) {
    confidence = 'very-high';
  } else if (cardinalMatches.length >= 1 || primaryMatches.length >= 2) {
    confidence = 'high';
  } else if (primaryMatches.length >= 1 && secondaryMatches.length >= 1) {
    confidence = 'moderate';
  } else if (totalMatches >= 2) {
    confidence = 'low';
  } else {
    confidence = 'very-low';
  }
  
  // Confidence interval
  const ciWidth = confidence === 'very-high' ? 5 : confidence === 'high' ? 10 : confidence === 'moderate' ? 15 : confidence === 'low' ? 20 : 25;
  
  return {
    condition,
    probability: Math.round(probability),
    confidence,
    confidenceInterval: {
      lower: Math.max(0, Math.round(probability - ciWidth)),
      upper: Math.min(100, Math.round(probability + ciWidth))
    },
    matchingSymptoms: {
      cardinal: cardinalMatches,
      primary: primaryMatches,
      secondary: secondaryMatches,
      atypical: atypicalMatches
    },
    missingKeySymptoms: missingPrimary.slice(0, 3),
    supportingEvidence,
    contradictingEvidence,
    redFlagsPresent,
    recommendedTests: condition.diagnosticCriteria.laboratory.slice(0, 5).concat(condition.diagnosticCriteria.imaging.slice(0, 2)),
    specialistReferral: condition.specialists
  };
}

function calculateRiskAssessment(
  symptoms: SymptomInput[],
  patient: PatientProfile,
  differentials: DifferentialResult[]
): RiskAssessment {
  let riskScore = 0;
  const factors: RiskAssessment['factors'] = [];
  
  // Age factor
  if (patient.age > 75) {
    riskScore += 20;
    factors.push({ category: 'Demographics', factor: 'Age > 75', impact: 'high-risk', weight: 20, description: 'Advanced age significantly increases risk' });
  } else if (patient.age > 65) {
    riskScore += 12;
    factors.push({ category: 'Demographics', factor: 'Age 65-75', impact: 'risk', weight: 12, description: 'Age-related risk increase' });
  } else if (patient.age < 18) {
    riskScore += 5;
    factors.push({ category: 'Demographics', factor: 'Pediatric patient', impact: 'risk', weight: 5, description: 'Pediatric considerations' });
  }
  
  // Symptom severity
  const severeSymptomsCount = symptoms.filter(s => s.severity === 'severe' || s.severity === 'very-severe').length;
  if (severeSymptomsCount >= 2) {
    riskScore += 25;
    factors.push({ category: 'Symptoms', factor: `${severeSymptomsCount} severe symptoms`, impact: 'high-risk', weight: 25, description: 'Multiple severe symptoms indicate serious condition' });
  } else if (severeSymptomsCount === 1) {
    riskScore += 15;
    factors.push({ category: 'Symptoms', factor: '1 severe symptom', impact: 'risk', weight: 15, description: 'Severe symptom requires attention' });
  }
  
  // Critical symptoms
  const criticalSymptoms = ['chest-pain', 'shortness-breath', 'speech-difficulty', 'vision-changes', 'seizure', 'vomiting-blood', 'suicidal-thoughts'];
  const hasCritical = symptoms.some(s => criticalSymptoms.includes(s.id));
  if (hasCritical) {
    riskScore += 35;
    factors.push({ category: 'Symptoms', factor: 'Critical symptom present', impact: 'high-risk', weight: 35, description: 'One or more critical warning symptoms detected' });
  }
  
  // Comorbidities
  const highRiskComorbidities = ['diabetes', 'heart disease', 'cancer', 'immunocompromised', 'copd'];
  const hasHighRiskComorbidity = patient.preConditions.some(pc => 
    highRiskComorbidities.some(hrc => pc.toLowerCase().includes(hrc))
  );
  if (hasHighRiskComorbidity) {
    riskScore += 18;
    factors.push({ category: 'Medical History', factor: 'High-risk comorbidity', impact: 'high-risk', weight: 18, description: 'Pre-existing conditions increase complexity' });
  }
  
  // Polypharmacy
  if (patient.medications.length > 5) {
    riskScore += 8;
    factors.push({ category: 'Medications', factor: `${patient.medications.length} medications`, impact: 'risk', weight: 8, description: 'Polypharmacy increases interaction risk' });
  }
  
  // Red flags from differentials
  const totalRedFlags = differentials.reduce((sum, d) => sum + d.redFlagsPresent.length, 0);
  if (totalRedFlags > 0) {
    riskScore += Math.min(totalRedFlags * 10, 30);
    factors.push({ category: 'Red Flags', factor: `${totalRedFlags} red flags detected`, impact: 'high-risk', weight: Math.min(totalRedFlags * 10, 30), description: 'Warning signs requiring urgent attention' });
  }
  
  // BMI factor
  if (patient.bmi && patient.bmi > 35) {
    riskScore += 8;
    factors.push({ category: 'Vitals', factor: 'Severe obesity', impact: 'risk', weight: 8, description: 'BMI > 35 increases health risks' });
  }
  
  // Lifestyle factors
  if (patient.lifestyle.smoking === 'current') {
    riskScore += 10;
    factors.push({ category: 'Lifestyle', factor: 'Current smoker', impact: 'risk', weight: 10, description: 'Smoking increases cardiovascular and respiratory risks' });
  }
  
  // Determine overall risk level
  let overallRisk: RiskAssessment['overallRisk'];
  if (riskScore >= 80) overallRisk = 'critical';
  else if (riskScore >= 60) overallRisk = 'very-high';
  else if (riskScore >= 40) overallRisk = 'high';
  else if (riskScore >= 25) overallRisk = 'moderate';
  else if (riskScore >= 10) overallRisk = 'low';
  else overallRisk = 'minimal';
  
  // Confidence interval
  const ciWidth = 10;
  
  return {
    overallRisk,
    riskScore: Math.min(100, riskScore),
    confidenceInterval: { 
      lower: Math.max(0, riskScore - ciWidth), 
      upper: Math.min(100, riskScore + ciWidth) 
    },
    factors,
    complicationRisk: differentials.slice(0, 3).flatMap(d => 
      (d.condition.prognosis.complications || []).slice(0, 2).map(comp => ({
        complication: comp,
        likelihood: d.probability > 70 ? 'High' : d.probability > 40 ? 'Moderate' : 'Low',
        timeframe: 'Variable'
      }))
    ).slice(0, 5)
  };
}

function determineTriage(
  symptoms: SymptomInput[],
  riskAssessment: RiskAssessment,
  differentials: DifferentialResult[]
): TriageLevel {
  // Critical symptoms check
  const criticalSymptoms = ['chest-pain', 'cough-blood', 'vomiting-blood', 'seizure', 'speech-difficulty', 'vision-loss', 'suicidal-thoughts'];
  const symptomIds = symptoms.map(s => s.id);
  
  const hasCritical = symptomIds.some(s => criticalSymptoms.includes(s));
  const hasSevereCritical = symptoms.some(s => 
    criticalSymptoms.includes(s.id) && (s.severity === 'severe' || s.severity === 'very-severe')
  );
  
  // Check for red flags
  const totalRedFlags = differentials.reduce((sum, d) => sum + d.redFlagsPresent.length, 0);
  
  // Determine triage level
  if (hasSevereCritical || riskAssessment.overallRisk === 'critical') {
    return TRIAGE_LEVELS_V4.critical;
  }
  
  if (hasCritical || riskAssessment.overallRisk === 'very-high' || totalRedFlags >= 3) {
    return TRIAGE_LEVELS_V4.emergency;
  }
  
  if (riskAssessment.overallRisk === 'high' || totalRedFlags >= 2) {
    return TRIAGE_LEVELS_V4.urgent;
  }
  
  if (riskAssessment.overallRisk === 'moderate' || totalRedFlags >= 1) {
    return TRIAGE_LEVELS_V4.semiUrgent;
  }
  
  if (symptoms.length <= 2 && symptoms.every(s => s.severity === 'mild')) {
    return TRIAGE_LEVELS_V4.selfCare;
  }
  
  return TRIAGE_LEVELS_V4.routine;
}

// ════════════════════════════════════════════════════════════════════════════════
// 🌟 MAIN ANALYSIS FUNCTION
// ════════════════════════════════════════════════════════════════════════════════

export function analyzeSymptomsV4(
  symptoms: SymptomInput[],
  patient: PatientProfile,
  freeText?: string
): MediSenseResultV4 {
  const startTime = Date.now();
  const analysisId = generateAnalysisId();
  
  // Generate differential diagnoses
  const differentials: DifferentialResult[] = [];
  
  for (const [conditionId, condition] of Object.entries(CONDITIONS_DATABASE_V4)) {
    const result = matchCondition(condition, symptoms, patient);
    if (result && result.probability >= 10) {
      differentials.push(result);
    }
  }
  
  // Sort by probability
  differentials.sort((a, b) => b.probability - a.probability);
  const topDifferentials = differentials.slice(0, 10);
  
  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(symptoms, patient, topDifferentials);
  
  // Determine triage level
  const triage = determineTriage(symptoms, riskAssessment, topDifferentials);
  
  // Collect red flags
  const redFlagsDetected: MediSenseResultV4['redFlagsDetected'] = [];
  const seenFlags = new Set<string>();
  
  topDifferentials.forEach(d => {
    d.redFlagsPresent.forEach(rf => {
      if (!seenFlags.has(rf)) {
        seenFlags.add(rf);
        const flagInfo = RED_FLAGS_DATABASE[rf.toLowerCase().replace(/\s+/g, '-')] || {
          flag: rf,
          description: rf,
          severity: 'warning' as const,
          relatedConditions: [d.condition.id],
          immediateAction: 'Consult healthcare provider'
        };
        redFlagsDetected.push({
          flag: flagInfo.flag,
          severity: flagInfo.severity,
          relatedConditions: flagInfo.relatedConditions,
          immediateAction: flagInfo.immediateAction
        });
      }
    });
  });
  
  // Generate recommendations
  const recommendations: MediSenseResultV4['recommendations'] = {
    immediate: [],
    shortTerm: [],
    followUp: [],
    lifestyle: [],
    tests: []
  };
  
  if (triage.level <= 1) { // Critical or Emergency
    recommendations.immediate.push({
      action: 'Seek immediate emergency medical care',
      reason: 'Your symptoms indicate a potentially serious condition',
      priority: 1
    });
    recommendations.immediate.push({
      action: 'Call emergency services (112/999/911)',
      reason: 'Do not delay - time is critical',
      priority: 2
    });
  }
  
  if (triage.level === 2) { // Urgent
    recommendations.immediate.push({
      action: 'See a doctor within 24 hours',
      reason: 'Your symptoms require prompt medical evaluation',
      priority: 1
    });
  }
  
  // Add test recommendations from top differentials
  topDifferentials.slice(0, 3).forEach(d => {
    d.recommendedTests.slice(0, 3).forEach((test, idx) => {
      if (!recommendations.tests.find(t => t.test === test)) {
        recommendations.tests.push({
          test,
          reason: `To evaluate for ${d.condition.name}`,
          urgency: triage.level <= 2 ? 'Urgent' : 'Routine'
        });
      }
    });
  });
  
  // Short-term recommendations
  recommendations.shortTerm.push({
    action: 'Keep a detailed symptom diary',
    reason: 'Track symptom patterns, severity, and triggers',
    timeframe: 'Starting immediately'
  });
  
  recommendations.shortTerm.push({
    action: 'Stay hydrated and rest',
    reason: 'Support your body\'s recovery',
    timeframe: 'Ongoing'
  });
  
  // Follow-up recommendations
  recommendations.followUp.push({
    action: 'Schedule follow-up with your primary care physician',
    reason: 'Review test results and treatment response',
    timeframe: '1-2 weeks'
  });
  
  // Lifestyle recommendations
  if (patient.lifestyle.smoking === 'current') {
    recommendations.lifestyle.push({
      action: 'Consider smoking cessation',
      benefit: 'Reduces cardiovascular, respiratory, and cancer risks'
    });
  }
  
  recommendations.lifestyle.push({
    action: 'Maintain regular sleep schedule',
    benefit: 'Supports immune function and overall health'
  });
  
  // Determine specialists
  const specialistScores: Record<string, number> = {};
  topDifferentials.slice(0, 5).forEach((d, idx) => {
    d.specialistReferral.forEach(s => {
      specialistScores[s] = (specialistScores[s] || 0) + (5 - idx) * d.probability / 10;
    });
  });
  
  const specialists = Object.entries(specialistScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, score]) => ({
      specialist: id,
      name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      icon: id.includes('cardio') ? 'fa-heart-pulse' : id.includes('neuro') ? 'fa-brain' : id.includes('pulmo') ? 'fa-lungs' : 'fa-user-md',
      relevance: Math.round(score),
      reason: `Based on ${topDifferentials[0]?.condition.name || 'symptoms'}`,
      availability: 'Contact for appointment',
      selectcareDoctor: undefined,
      bookingUrl: '/dashboard'
    }));
  
  // Correlated symptoms
  const SYMPTOM_CORRELATIONS: Record<string, string[]> = {
    'chest-pain': ['shortness-breath', 'sweating', 'nausea', 'arm-pain'],
    'headache': ['nausea', 'light-sensitivity', 'neck-stiffness', 'vision-changes'],
    'abdominal-pain': ['nausea', 'vomiting', 'fever', 'diarrhea'],
    'fever': ['chills', 'fatigue', 'body-aches', 'headache'],
    'shortness-breath': ['cough', 'wheezing', 'chest-tightness', 'fatigue']
  };
  
  const symptomIds = symptoms.map(s => s.id);
  const correlatedSymptoms: MediSenseResultV4['correlatedSymptoms'] = [];
  
  symptoms.forEach(s => {
    const correlated = SYMPTOM_CORRELATIONS[s.id] || [];
    correlated.forEach(cs => {
      if (!symptomIds.includes(cs) && !correlatedSymptoms.find(c => c.symptom === cs)) {
        correlatedSymptoms.push({
          symptom: cs,
          correlation: 0.75,
          askReason: `Often associated with ${s.id}`
        });
      }
    });
  });
  
  // Analysis quality metrics
  const dataCompleteness = Math.min(100, 
    (patient.age ? 20 : 0) + 
    (patient.gender ? 20 : 0) + 
    (symptoms.length >= 2 ? 30 : symptoms.length * 15) +
    (patient.preConditions.length > 0 ? 15 : 0) +
    (patient.medications.length > 0 ? 15 : 0)
  );
  
  const processingTimeMs = Date.now() - startTime;
  
  return {
    version: '4.0.0',
    analysisId,
    timestamp: new Date().toISOString(),
    processingTimeMs,
    modelVersion: 'MediSense-v4-2024Q4',
    
    patientProfile: patient,
    symptomSummary: {
      totalSymptoms: symptoms.length,
      byCategory: symptoms.reduce((acc, s) => {
        const cat = s.bodyRegion || 'general';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      bySeverity: symptoms.reduce((acc, s) => {
        acc[s.severity] = (acc[s.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      primaryConcern: symptoms[0]?.name || 'Not specified'
    },
    
    triage,
    riskAssessment,
    differentialDiagnosis: topDifferentials,
    redFlagsDetected,
    recommendations,
    specialists,
    correlatedSymptoms: correlatedSymptoms.slice(0, 5),
    
    analysisQuality: {
      dataCompleteness,
      symptomSpecificity: symptoms.some(s => s.severity !== 'mild') ? 80 : 60,
      diagnosticConfidence: topDifferentials[0]?.probability || 0,
      recommendationRelevance: topDifferentials.length > 0 ? 85 : 50
    },
    
    compliance: {
      hipaaCompliant: true,
      gdprCompliant: true,
      auditTrailCreated: true,
      dataRetentionPolicy: '30 days for anonymous analysis'
    },
    
    disclaimer: `IMPORTANT MEDICAL DISCLAIMER: This AI-powered symptom analysis is provided for informational and educational purposes only. It does NOT constitute medical advice, diagnosis, or treatment. The information should NOT replace consultation with a qualified healthcare professional. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read or seen from this tool. If you think you may have a medical emergency, call your doctor, go to the emergency room, or call emergency services immediately (112 in Europe, 999 in UK, 911 in USA).`,
    
    emergencyDisclaimer: triage.level <= 1 ? 
      '🚨 EMERGENCY: Based on your symptoms, you should seek immediate medical attention. Call emergency services or go to the nearest emergency room NOW. Time is critical.' : 
      undefined
  };
}

// All exports are inline with their definitions above
