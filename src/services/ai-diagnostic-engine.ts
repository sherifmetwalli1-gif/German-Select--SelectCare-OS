/**
 * MediSense AI™ Pro - Advanced Diagnostic Engine v2.0
 * 
 * Enhanced AI analysis with:
 * - Bayesian inference for probability calculations
 * - Age/gender-specific symptom modifiers
 * - Comorbidity interaction analysis
 * - Symptom correlation networks
 * - Evidence-based weighting system
 * - Differential diagnosis refinement
 * - Risk stratification scoring
 */

import { 
  COMPLETE_CONDITIONS_DATABASE,
  ENHANCED_CONDITIONS_DATABASE, 
  ENHANCED_RED_FLAGS,
  SYMPTOM_CORRELATIONS,
  EnhancedCondition,
  getConditionCount,
  getRedFlagCount,
  getConditionsByCategory
} from './medical-database-enhanced';

// ════════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

export interface PatientContext {
  age: number;
  gender: 'male' | 'female' | 'other';
  preConditions: string[];
  medications: string[];
  allergies: string[];
  familyHistory: string[];
  lifestyle: {
    smoking: 'never' | 'former' | 'current';
    alcohol: 'none' | 'moderate' | 'heavy';
    exercise: 'sedentary' | 'light' | 'moderate' | 'active';
    diet: 'poor' | 'average' | 'healthy';
  };
  vitals?: {
    bloodPressure?: { systolic: number; diastolic: number };
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
  };
}

export interface SymptomEntry {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'very-severe';
  duration: string;
  frequency: 'constant' | 'intermittent' | 'occasional';
  onset: 'sudden' | 'gradual';
  bodyRegion?: string;
  associatedFactors?: string[];
  relievingFactors?: string[];
  aggravatingFactors?: string[];
}

export interface DiagnosisResult {
  conditionId: string;
  conditionName: string;
  icd11Code: string;
  category: string;
  probability: number;
  confidence: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  urgency: string;
  
  evidenceBreakdown: {
    symptomScore: number;
    ageModifier: number;
    genderModifier: number;
    riskFactorScore: number;
    prevalenceAdjustment: number;
    correlationBonus: number;
    atypicalPenalty: number;
  };
  
  matchedSymptoms: {
    cardinal: { symptom: string; weight: number }[];
    primary: { symptom: string; weight: number }[];
    secondary: { symptom: string; weight: number }[];
    atypical: { symptom: string; weight: number }[];
  };
  
  missingKeySymptoms: string[];
  supportingEvidence: string[];
  contradictingEvidence: string[];
  redFlagsDetected: string[];
  
  differentialConsiderations: string[];
  recommendedTests: string[];
  specialists: string[];
}

export interface AnalysisResult {
  analysisId: string;
  timestamp: string;
  engineVersion: string;
  processingTimeMs: number;
  
  diagnoses: DiagnosisResult[];
  primaryDiagnosis: DiagnosisResult | null;
  
  triageLevel: {
    level: number;
    name: string;
    color: string;
    description: string;
    timeframe: string;
    action: string;
  };
  
  riskScore: {
    overall: number;
    category: 'minimal' | 'low' | 'moderate' | 'high' | 'very-high' | 'critical';
    factors: { factor: string; weight: number; category: string }[];
  };
  
  redFlags: {
    flag: string;
    severity: 'warning' | 'serious' | 'critical';
    description: string;
    action: string;
    timeframe: string;
  }[];
  
  correlatedSymptoms: {
    symptom: string;
    correlation: number;
    reason: string;
  }[];
  
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    tests: { test: string; urgency: string; reason: string }[];
    specialists: { specialist: string; reason: string }[];
    lifestyle: string[];
  };
  
  dataQuality: {
    completeness: number;
    symptomSpecificity: number;
    diagnosticConfidence: number;
  };
}

// ════════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC WEIGHTS CONFIGURATION
// ════════════════════════════════════════════════════════════════════════════════

const DIAGNOSTIC_WEIGHTS = {
  // Symptom category weights
  cardinal: 35,      // Essential symptoms for diagnosis
  primary: 20,       // Strong indicators
  secondary: 10,     // Supporting symptoms
  atypical: 5,       // Less common presentations
  
  // Modifiers
  severityMultiplier: {
    'mild': 0.8,
    'moderate': 1.0,
    'severe': 1.3,
    'very-severe': 1.5
  },
  
  durationMultiplier: {
    'minutes': 0.9,
    'hours': 1.0,
    'days': 1.1,
    'weeks': 1.2,
    'months': 1.3
  },
  
  onsetMultiplier: {
    'sudden': 1.2,    // More concerning
    'gradual': 1.0
  },
  
  frequencyMultiplier: {
    'constant': 1.3,
    'intermittent': 1.0,
    'occasional': 0.8
  },
  
  // Age-based baseline adjustments
  ageBaselines: {
    pediatric: { min: 0, max: 17, modifier: 0.9 },
    youngAdult: { min: 18, max: 39, modifier: 1.0 },
    middleAge: { min: 40, max: 64, modifier: 1.1 },
    senior: { min: 65, max: 79, modifier: 1.2 },
    elderly: { min: 80, max: 150, modifier: 1.3 }
  },
  
  // Risk factor weights
  riskFactors: {
    major: 1.5,
    moderate: 1.25,
    minor: 1.1
  },
  
  // Confidence thresholds
  confidenceThresholds: {
    veryLow: 20,
    low: 35,
    moderate: 50,
    high: 70,
    veryHigh: 85
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// TRIAGE LEVELS
// ════════════════════════════════════════════════════════════════════════════════

const TRIAGE_LEVELS = {
  critical: {
    level: 0,
    name: 'Critical - Immediate Emergency',
    color: '#DC2626',
    description: 'Life-threatening condition requiring immediate emergency care',
    timeframe: 'Immediate - seconds to minutes',
    action: 'Call emergency services (112/999/911) NOW'
  },
  emergency: {
    level: 1,
    name: 'Emergency',
    color: '#EA580C',
    description: 'Potentially life-threatening, requires emergency department',
    timeframe: 'Within 15-30 minutes',
    action: 'Go to emergency room immediately'
  },
  urgent: {
    level: 2,
    name: 'Urgent',
    color: '#F59E0B',
    description: 'Needs prompt medical evaluation',
    timeframe: 'Within 1-2 hours',
    action: 'Seek urgent care or same-day appointment'
  },
  semiUrgent: {
    level: 3,
    name: 'Semi-Urgent',
    color: '#3B82F6',
    description: 'Requires medical attention but not immediately',
    timeframe: 'Within 24 hours',
    action: 'Schedule appointment within a day'
  },
  routine: {
    level: 4,
    name: 'Routine',
    color: '#10B981',
    description: 'Standard medical evaluation recommended',
    timeframe: 'Within 1-2 weeks',
    action: 'Schedule regular appointment'
  },
  selfCare: {
    level: 5,
    name: 'Self-Care',
    color: '#6B7280',
    description: 'Can be managed at home with self-care',
    timeframe: 'Monitor and seek care if worsening',
    action: 'Rest, hydrate, and monitor symptoms'
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// BAYESIAN INFERENCE ENGINE
// ════════════════════════════════════════════════════════════════════════════════

class BayesianDiagnosticEngine {
  private conditions: Record<string, EnhancedCondition>;
  
  constructor() {
    // Use the complete merged database with all conditions
    this.conditions = COMPLETE_CONDITIONS_DATABASE;
  }
  
  /**
   * Calculate prior probability based on condition prevalence and patient demographics
   */
  private calculatePrior(condition: EnhancedCondition, patient: PatientContext): number {
    let prior = condition.prevalence;
    
    // Age adjustment
    const ageGroup = this.getAgeGroup(patient.age);
    if (condition.ageModifiers[ageGroup]) {
      prior *= condition.ageModifiers[ageGroup]!.modifier;
    }
    
    // Gender adjustment
    if (patient.gender === 'male' && condition.genderModifiers.male) {
      prior *= condition.genderModifiers.male.modifier;
    } else if (patient.gender === 'female' && condition.genderModifiers.female) {
      prior *= condition.genderModifiers.female.modifier;
    }
    
    return prior;
  }
  
  /**
   * Calculate likelihood of symptoms given the condition (P(S|C))
   */
  private calculateLikelihood(
    condition: EnhancedCondition, 
    symptoms: SymptomEntry[],
    patient: PatientContext
  ): { likelihood: number; breakdown: DiagnosisResult['evidenceBreakdown']; matchedSymptoms: DiagnosisResult['matchedSymptoms'] } {
    const symptomIds = symptoms.map(s => s.id.toLowerCase());
    let totalScore = 0;
    
    const matchedSymptoms: DiagnosisResult['matchedSymptoms'] = {
      cardinal: [],
      primary: [],
      secondary: [],
      atypical: []
    };
    
    // Score cardinal symptoms (most important)
    let cardinalScore = 0;
    condition.symptoms.cardinal.forEach(symptomDef => {
      const symptomEntry = symptoms.find(s => 
        s.id.toLowerCase() === symptomDef.symptom.toLowerCase() ||
        s.id.toLowerCase().includes(symptomDef.symptom.toLowerCase()) ||
        symptomDef.symptom.toLowerCase().includes(s.id.toLowerCase())
      );
      
      if (symptomEntry) {
        let weight = symptomDef.weight;
        weight *= this.getSeverityMultiplier(symptomEntry.severity);
        weight *= this.getOnsetMultiplier(symptomEntry.onset);
        weight *= this.getFrequencyMultiplier(symptomEntry.frequency);
        
        cardinalScore += weight;
        matchedSymptoms.cardinal.push({ symptom: symptomDef.symptom, weight });
      }
    });
    
    // Score primary symptoms
    let primaryScore = 0;
    condition.symptoms.primary.forEach(symptomDef => {
      const symptomEntry = symptoms.find(s => 
        s.id.toLowerCase() === symptomDef.symptom.toLowerCase() ||
        s.id.toLowerCase().includes(symptomDef.symptom.toLowerCase()) ||
        symptomDef.symptom.toLowerCase().includes(s.id.toLowerCase())
      );
      
      if (symptomEntry) {
        let weight = symptomDef.weight;
        weight *= this.getSeverityMultiplier(symptomEntry.severity);
        primaryScore += weight;
        matchedSymptoms.primary.push({ symptom: symptomDef.symptom, weight });
      }
    });
    
    // Score secondary symptoms
    let secondaryScore = 0;
    condition.symptoms.secondary.forEach(symptomDef => {
      const symptomEntry = symptoms.find(s => 
        s.id.toLowerCase() === symptomDef.symptom.toLowerCase() ||
        s.id.toLowerCase().includes(symptomDef.symptom.toLowerCase()) ||
        symptomDef.symptom.toLowerCase().includes(s.id.toLowerCase())
      );
      
      if (symptomEntry) {
        secondaryScore += symptomDef.weight;
        matchedSymptoms.secondary.push({ symptom: symptomDef.symptom, weight: symptomDef.weight });
      }
    });
    
    // Score atypical symptoms
    let atypicalScore = 0;
    condition.symptoms.atypical.forEach(symptomDef => {
      const symptomEntry = symptoms.find(s => 
        s.id.toLowerCase() === symptomDef.symptom.toLowerCase() ||
        s.id.toLowerCase().includes(symptomDef.symptom.toLowerCase()) ||
        symptomDef.symptom.toLowerCase().includes(s.id.toLowerCase())
      );
      
      if (symptomEntry) {
        atypicalScore += symptomDef.weight;
        matchedSymptoms.atypical.push({ symptom: symptomDef.symptom, weight: symptomDef.weight });
      }
    });
    
    // Calculate symptom score with caps (higher caps for cardinal symptoms)
    // Cardinal symptoms are the most important for diagnosis
    const symptomScore = Math.min(cardinalScore, 100) + 
                        Math.min(primaryScore, 60) + 
                        Math.min(secondaryScore, 30) + 
                        Math.min(atypicalScore, 15);
    
    // Extra bonus if multiple cardinal symptoms match
    const cardinalBonus = matchedSymptoms.cardinal.length >= 2 ? 30 : 
                          matchedSymptoms.cardinal.length === 1 ? 15 : 0;
    
    // Calculate age modifier
    let ageModifier = 1.0;
    const ageGroup = this.getAgeGroup(patient.age);
    if (condition.ageModifiers[ageGroup]) {
      ageModifier = condition.ageModifiers[ageGroup]!.modifier;
      // Check for age-specific symptoms
      const ageSymptoms = condition.ageModifiers[ageGroup]!.symptoms;
      ageSymptoms.forEach(ageSymptom => {
        if (symptomIds.includes(ageSymptom.toLowerCase())) {
          ageModifier *= 1.1;
        }
      });
    }
    
    // Calculate gender modifier
    let genderModifier = 1.0;
    if (patient.gender === 'male' && condition.genderModifiers.male) {
      genderModifier = condition.genderModifiers.male.modifier;
    } else if (patient.gender === 'female' && condition.genderModifiers.female) {
      genderModifier = condition.genderModifiers.female.modifier;
      // Check for gender-specific symptoms
      const genderSymptoms = condition.genderModifiers.female.symptoms;
      genderSymptoms.forEach(genderSymptom => {
        if (symptomIds.includes(genderSymptom.toLowerCase())) {
          genderModifier *= 1.1;
        }
      });
    }
    
    // Calculate risk factor score
    let riskFactorScore = 0;
    condition.riskFactors.major.forEach(rf => {
      if (this.hasRiskFactor(rf.factor, patient)) {
        riskFactorScore += rf.modifier * 10;
      }
    });
    condition.riskFactors.moderate.forEach(rf => {
      if (this.hasRiskFactor(rf.factor, patient)) {
        riskFactorScore += rf.modifier * 6;
      }
    });
    condition.riskFactors.minor.forEach(rf => {
      if (this.hasRiskFactor(rf.factor, patient)) {
        riskFactorScore += rf.modifier * 3;
      }
    });
    
    // Calculate prevalence adjustment (Bayesian prior influence)
    const prevalenceAdjustment = 1 + Math.log10(condition.prevalence * 10000 + 1) / 5;
    
    // Calculate symptom correlation bonus
    let correlationBonus = 0;
    Object.entries(SYMPTOM_CORRELATIONS).forEach(([symptom, correlations]) => {
      if (symptomIds.includes(symptom.toLowerCase())) {
        correlations.related.forEach(related => {
          if (symptomIds.includes(related.toLowerCase())) {
            correlationBonus += 5;
          }
        });
        correlations.strengthens.forEach(strengthened => {
          if (condition.id === strengthened) {
            correlationBonus += 10;
          }
        });
        correlations.weakens.forEach(weakened => {
          if (condition.id === weakened) {
            correlationBonus -= 8;
          }
        });
      }
    });
    
    // Calculate atypical penalty (if only atypical symptoms match)
    let atypicalPenalty = 0;
    if (matchedSymptoms.cardinal.length === 0 && matchedSymptoms.primary.length === 0) {
      if (matchedSymptoms.atypical.length > 0) {
        atypicalPenalty = 15; // Penalize if only atypical presentation
      }
    }
    
    // Calculate total likelihood (including cardinal bonus)
    const likelihood = (
      (symptomScore + cardinalBonus) * ageModifier * genderModifier * prevalenceAdjustment +
      riskFactorScore + correlationBonus - atypicalPenalty
    );
    
    return {
      likelihood: Math.max(0, likelihood),
      breakdown: {
        symptomScore,
        ageModifier,
        genderModifier,
        riskFactorScore,
        prevalenceAdjustment,
        correlationBonus,
        atypicalPenalty
      },
      matchedSymptoms
    };
  }
  
  /**
   * Calculate posterior probability using Bayesian inference
   */
  private calculatePosterior(prior: number, likelihood: number): number {
    // Simplified Bayesian: P(C|S) ∝ P(S|C) * P(C)
    // We normalize at the end
    return prior * likelihood;
  }
  
  /**
   * Determine confidence level based on evidence
   */
  private determineConfidence(
    matchedSymptoms: DiagnosisResult['matchedSymptoms'],
    probability: number
  ): DiagnosisResult['confidence'] {
    const cardinalCount = matchedSymptoms.cardinal.length;
    const primaryCount = matchedSymptoms.primary.length;
    const totalMatched = cardinalCount + primaryCount + 
                        matchedSymptoms.secondary.length + 
                        matchedSymptoms.atypical.length;
    
    // Evidence-based confidence
    if (cardinalCount >= 2 || (cardinalCount >= 1 && primaryCount >= 2)) {
      return probability >= 70 ? 'very-high' : 'high';
    }
    if (cardinalCount >= 1 || primaryCount >= 2) {
      return probability >= 60 ? 'high' : 'moderate';
    }
    if (primaryCount >= 1 && matchedSymptoms.secondary.length >= 1) {
      return 'moderate';
    }
    if (totalMatched >= 2) {
      return 'low';
    }
    return 'very-low';
  }
  
  /**
   * Main analysis function
   */
  public analyze(symptoms: SymptomEntry[], patient: PatientContext): AnalysisResult {
    const startTime = Date.now();
    const analysisId = `MSAI-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    
    const candidateDiagnoses: DiagnosisResult[] = [];
    
    // Analyze each condition
    for (const [conditionId, condition] of Object.entries(this.conditions)) {
      const prior = this.calculatePrior(condition, patient);
      const { likelihood, breakdown, matchedSymptoms } = this.calculateLikelihood(condition, symptoms, patient);
      
      // Skip if no relevant symptoms matched
      const totalMatched = matchedSymptoms.cardinal.length + 
                          matchedSymptoms.primary.length + 
                          matchedSymptoms.secondary.length + 
                          matchedSymptoms.atypical.length;
      
      if (totalMatched === 0) continue;
      
      const posterior = this.calculatePosterior(prior, likelihood);
      
      // Get missing key symptoms
      const symptomIds = symptoms.map(s => s.id.toLowerCase());
      const missingCardinal = condition.symptoms.cardinal
        .filter(s => !symptomIds.some(sid => sid.includes(s.symptom.toLowerCase())))
        .map(s => s.symptom);
      const missingPrimary = condition.symptoms.primary
        .filter(s => !symptomIds.some(sid => sid.includes(s.symptom.toLowerCase())))
        .map(s => s.symptom);
      
      // Check for red flags
      const redFlagsDetected = condition.redFlags.filter(rf =>
        symptomIds.some(sid => 
          rf.toLowerCase().includes(sid) || sid.includes(rf.toLowerCase())
        )
      );
      
      // Build supporting/contradicting evidence
      const supportingEvidence: string[] = [];
      const contradictingEvidence: string[] = [];
      
      if (matchedSymptoms.cardinal.length > 0) {
        supportingEvidence.push(`${matchedSymptoms.cardinal.length} cardinal symptom(s) present`);
      }
      if (breakdown.riskFactorScore > 10) {
        supportingEvidence.push(`Multiple risk factors identified`);
      }
      if (breakdown.ageModifier > 1.0) {
        supportingEvidence.push(`Age-appropriate presentation`);
      }
      if (breakdown.genderModifier > 1.0) {
        supportingEvidence.push(`Gender-specific presentation pattern`);
      }
      if (breakdown.correlationBonus > 5) {
        supportingEvidence.push(`Symptom correlation pattern supports diagnosis`);
      }
      
      if (missingCardinal.length > 1) {
        contradictingEvidence.push(`Missing ${missingCardinal.length} cardinal symptoms`);
      }
      if (breakdown.atypicalPenalty > 0) {
        contradictingEvidence.push(`Only atypical presentation`);
      }
      
      const confidence = this.determineConfidence(matchedSymptoms, posterior);
      
      candidateDiagnoses.push({
        conditionId,
        conditionName: condition.name,
        icd11Code: condition.icd11,
        category: condition.category,
        probability: posterior,
        confidence,
        urgency: condition.urgency,
        evidenceBreakdown: breakdown,
        matchedSymptoms,
        missingKeySymptoms: [...missingCardinal.slice(0, 2), ...missingPrimary.slice(0, 2)],
        supportingEvidence,
        contradictingEvidence,
        redFlagsDetected,
        differentialConsiderations: condition.differentialDiagnosis,
        recommendedTests: condition.diagnosticCriteria.required.concat(condition.diagnosticCriteria.supportive),
        specialists: condition.specialists
      });
    }
    
    // Check if critical symptoms are present
    const criticalSymptomIds = ['chest-pain', 'shortness-breath', 'cough-blood', 'vomiting-blood', 
                                'seizure', 'loss-consciousness', 'speech-difficulty', 'suicidal-thoughts',
                                'sudden-weakness', 'crushing-chest-pressure', 'severe-breathing-difficulty'];
    const hasCriticalSymptom = symptoms.some(s => 
      criticalSymptomIds.some(crit => s.id.toLowerCase().includes(crit.toLowerCase())) &&
      (s.severity === 'severe' || s.severity === 'very-severe')
    );
    
    const hasMultipleCritical = symptoms.filter(s => 
      criticalSymptomIds.some(crit => s.id.toLowerCase().includes(crit.toLowerCase()))
    ).length >= 2;
    
    // Apply urgency boost for critical conditions when critical symptoms are present
    if (hasCriticalSymptom || hasMultipleCritical) {
      candidateDiagnoses.forEach(d => {
        // Boost critical and emergency conditions significantly
        if (d.urgency === 'critical') {
          d.probability *= 2.5;  // Strong boost for critical conditions
        } else if (d.urgency === 'emergency') {
          d.probability *= 2.0;  // Moderate boost for emergency conditions
        } else if (d.urgency === 'urgent') {
          d.probability *= 1.3;  // Slight boost for urgent conditions
        } else if (d.urgency === 'routine') {
          d.probability *= 0.6;  // Penalize routine conditions when critical symptoms present
        } else if (d.urgency === 'self-care') {
          d.probability *= 0.3;  // Strong penalty for self-care conditions
        }
      });
    }
    
    // Additional boost for cardiovascular conditions when chest pain and shortness of breath both present
    const hasChestPain = symptoms.some(s => s.id.toLowerCase().includes('chest-pain'));
    const hasBreathingDifficulty = symptoms.some(s => 
      s.id.toLowerCase().includes('shortness-breath') || 
      s.id.toLowerCase().includes('breathing')
    );
    
    if (hasChestPain && hasBreathingDifficulty) {
      candidateDiagnoses.forEach(d => {
        if (d.category === 'cardiovascular' && (d.urgency === 'critical' || d.urgency === 'emergency')) {
          d.probability *= 1.5;  // Extra boost for cardiac emergencies
        }
      });
    }
    
    // Normalize probabilities and sort
    const maxScore = Math.max(...candidateDiagnoses.map(d => d.probability), 1);
    candidateDiagnoses.forEach(d => {
      d.probability = Math.round(Math.min(95, (d.probability / maxScore) * 90 + 5));
    });
    
    // Sort with secondary consideration for urgency
    candidateDiagnoses.sort((a, b) => {
      // Primary sort by probability
      const probDiff = b.probability - a.probability;
      if (Math.abs(probDiff) > 10) return probDiff;
      
      // Secondary sort by urgency for close probabilities
      const urgencyOrder = { 'critical': 0, 'emergency': 1, 'urgent': 2, 'semi-urgent': 3, 'routine': 4, 'self-care': 5 };
      const urgencyA = urgencyOrder[a.urgency as keyof typeof urgencyOrder] ?? 4;
      const urgencyB = urgencyOrder[b.urgency as keyof typeof urgencyOrder] ?? 4;
      
      if (urgencyA !== urgencyB) return urgencyA - urgencyB;
      
      // Tertiary sort by confidence
      const confOrder = { 'very-high': 0, 'high': 1, 'moderate': 2, 'low': 3, 'very-low': 4 };
      return (confOrder[a.confidence] ?? 4) - (confOrder[b.confidence] ?? 4);
    });
    
    // Get top 10 diagnoses
    const topDiagnoses = candidateDiagnoses.slice(0, 10);
    
    // Calculate risk score
    const riskScore = this.calculateRiskScore(symptoms, patient, topDiagnoses);
    
    // Determine triage level
    const triageLevel = this.determineTriageLevel(symptoms, patient, topDiagnoses, riskScore);
    
    // Collect all red flags
    const allRedFlags = this.collectRedFlags(symptoms, topDiagnoses);
    
    // Get correlated symptoms to ask about
    const correlatedSymptoms = this.getCorrelatedSymptoms(symptoms);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(topDiagnoses, triageLevel, patient);
    
    // Calculate data quality metrics
    const dataQuality = this.calculateDataQuality(symptoms, patient, topDiagnoses);
    
    return {
      analysisId,
      timestamp: new Date().toISOString(),
      engineVersion: 'MediSense-AI-v2.0',
      processingTimeMs: Date.now() - startTime,
      diagnoses: topDiagnoses,
      primaryDiagnosis: topDiagnoses[0] || null,
      triageLevel,
      riskScore,
      redFlags: allRedFlags,
      correlatedSymptoms,
      recommendations,
      dataQuality
    };
  }
  
  // ════════════════════════════════════════════════════════════════════════════
  // HELPER METHODS
  // ════════════════════════════════════════════════════════════════════════════
  
  private getAgeGroup(age: number): 'pediatric' | 'adult' | 'geriatric' {
    if (age < 18) return 'pediatric';
    if (age >= 65) return 'geriatric';
    return 'adult';
  }
  
  private getSeverityMultiplier(severity: string): number {
    return DIAGNOSTIC_WEIGHTS.severityMultiplier[severity as keyof typeof DIAGNOSTIC_WEIGHTS.severityMultiplier] || 1.0;
  }
  
  private getOnsetMultiplier(onset: string): number {
    return DIAGNOSTIC_WEIGHTS.onsetMultiplier[onset as keyof typeof DIAGNOSTIC_WEIGHTS.onsetMultiplier] || 1.0;
  }
  
  private getFrequencyMultiplier(frequency: string): number {
    return DIAGNOSTIC_WEIGHTS.frequencyMultiplier[frequency as keyof typeof DIAGNOSTIC_WEIGHTS.frequencyMultiplier] || 1.0;
  }
  
  private hasRiskFactor(factor: string, patient: PatientContext): boolean {
    const factorLower = factor.toLowerCase();
    
    // Check pre-existing conditions
    if (patient.preConditions.some(pc => pc.toLowerCase().includes(factorLower))) {
      return true;
    }
    
    // Check family history
    if (patient.familyHistory.some(fh => fh.toLowerCase().includes(factorLower))) {
      return true;
    }
    
    // Check lifestyle factors
    if (factorLower.includes('smok') && patient.lifestyle.smoking === 'current') return true;
    if (factorLower.includes('alcohol') && patient.lifestyle.alcohol === 'heavy') return true;
    if (factorLower.includes('sedentary') && patient.lifestyle.exercise === 'sedentary') return true;
    if (factorLower.includes('obesity') && patient.preConditions.some(pc => pc.toLowerCase().includes('obes'))) return true;
    
    // Check age-related factors
    if (factorLower.includes('elderly') || factorLower.includes('age>65')) {
      return patient.age >= 65;
    }
    if (factorLower.includes('age>55') || factorLower.includes('age over 55')) {
      return patient.age >= 55;
    }
    
    return false;
  }
  
  private calculateRiskScore(
    symptoms: SymptomEntry[],
    patient: PatientContext,
    diagnoses: DiagnosisResult[]
  ): AnalysisResult['riskScore'] {
    let score = 0;
    const factors: { factor: string; weight: number; category: string }[] = [];
    
    // Age risk
    if (patient.age >= 80) {
      score += 20;
      factors.push({ factor: 'Age ≥80 years', weight: 20, category: 'Demographics' });
    } else if (patient.age >= 65) {
      score += 12;
      factors.push({ factor: 'Age 65-79 years', weight: 12, category: 'Demographics' });
    } else if (patient.age < 5) {
      score += 10;
      factors.push({ factor: 'Very young child (<5 years)', weight: 10, category: 'Demographics' });
    }
    
    // Symptom severity
    const severeCount = symptoms.filter(s => s.severity === 'severe' || s.severity === 'very-severe').length;
    if (severeCount >= 2) {
      score += 25;
      factors.push({ factor: `${severeCount} severe symptoms`, weight: 25, category: 'Symptoms' });
    } else if (severeCount === 1) {
      score += 15;
      factors.push({ factor: '1 severe symptom', weight: 15, category: 'Symptoms' });
    }
    
    // Critical symptoms
    const criticalSymptomIds = ['chest-pain', 'shortness-breath', 'cough-blood', 'vomiting-blood', 
                               'seizure', 'loss-consciousness', 'speech-difficulty', 'suicidal-thoughts'];
    const hasCritical = symptoms.some(s => criticalSymptomIds.includes(s.id.toLowerCase()));
    if (hasCritical) {
      score += 30;
      factors.push({ factor: 'Critical symptom present', weight: 30, category: 'Symptoms' });
    }
    
    // Sudden onset of severe symptoms
    const suddenSevere = symptoms.some(s => s.onset === 'sudden' && 
                                         (s.severity === 'severe' || s.severity === 'very-severe'));
    if (suddenSevere) {
      score += 15;
      factors.push({ factor: 'Sudden onset severe symptom', weight: 15, category: 'Symptoms' });
    }
    
    // Comorbidities
    const highRiskConditions = ['diabetes', 'heart disease', 'cancer', 'copd', 'immunocompromised', 'kidney disease'];
    const hasHighRisk = patient.preConditions.some(pc => 
      highRiskConditions.some(hrc => pc.toLowerCase().includes(hrc))
    );
    if (hasHighRisk) {
      score += 18;
      factors.push({ factor: 'High-risk comorbidity', weight: 18, category: 'Medical History' });
    }
    
    // Multiple medications
    if (patient.medications.length > 5) {
      score += 8;
      factors.push({ factor: `Polypharmacy (${patient.medications.length} medications)`, weight: 8, category: 'Medications' });
    }
    
    // Red flags from diagnoses
    const totalRedFlags = diagnoses.reduce((sum, d) => sum + d.redFlagsDetected.length, 0);
    if (totalRedFlags > 0) {
      const redFlagScore = Math.min(totalRedFlags * 10, 30);
      score += redFlagScore;
      factors.push({ factor: `${totalRedFlags} red flags detected`, weight: redFlagScore, category: 'Red Flags' });
    }
    
    // Lifestyle factors
    if (patient.lifestyle.smoking === 'current') {
      score += 8;
      factors.push({ factor: 'Current smoker', weight: 8, category: 'Lifestyle' });
    }
    
    // Abnormal vitals
    if (patient.vitals) {
      if (patient.vitals.temperature && patient.vitals.temperature >= 39.5) {
        score += 12;
        factors.push({ factor: 'High fever (≥39.5°C)', weight: 12, category: 'Vitals' });
      }
      if (patient.vitals.oxygenSaturation && patient.vitals.oxygenSaturation < 94) {
        score += 20;
        factors.push({ factor: 'Low oxygen saturation (<94%)', weight: 20, category: 'Vitals' });
      }
      if (patient.vitals.heartRate && (patient.vitals.heartRate > 120 || patient.vitals.heartRate < 50)) {
        score += 15;
        factors.push({ factor: 'Abnormal heart rate', weight: 15, category: 'Vitals' });
      }
    }
    
    // Determine category
    let category: AnalysisResult['riskScore']['category'];
    if (score >= 80) category = 'critical';
    else if (score >= 60) category = 'very-high';
    else if (score >= 40) category = 'high';
    else if (score >= 25) category = 'moderate';
    else if (score >= 10) category = 'low';
    else category = 'minimal';
    
    return {
      overall: Math.min(100, score),
      category,
      factors
    };
  }
  
  private determineTriageLevel(
    symptoms: SymptomEntry[],
    patient: PatientContext,
    diagnoses: DiagnosisResult[],
    riskScore: AnalysisResult['riskScore']
  ): AnalysisResult['triageLevel'] {
    const symptomIds = symptoms.map(s => s.id.toLowerCase());
    
    // Check for critical conditions
    const criticalSymptoms = ['chest-pain', 'cough-blood', 'vomiting-blood', 'seizure', 
                             'loss-consciousness', 'speech-difficulty', 'suicidal-thoughts'];
    
    const hasCriticalSevere = symptoms.some(s => 
      criticalSymptoms.includes(s.id.toLowerCase()) && 
      (s.severity === 'severe' || s.severity === 'very-severe')
    );
    
    if (hasCriticalSevere || riskScore.category === 'critical') {
      return TRIAGE_LEVELS.critical;
    }
    
    // Check for critical diagnosis
    const hasCriticalDiagnosis = diagnoses.some(d => d.urgency === 'critical');
    if (hasCriticalDiagnosis || riskScore.category === 'very-high') {
      return TRIAGE_LEVELS.emergency;
    }
    
    // Check red flags
    const totalRedFlags = diagnoses.reduce((sum, d) => sum + d.redFlagsDetected.length, 0);
    
    const hasEmergencyDiagnosis = diagnoses.some(d => d.urgency === 'emergency');
    if (hasEmergencyDiagnosis || totalRedFlags >= 3 || riskScore.category === 'high') {
      return TRIAGE_LEVELS.urgent;
    }
    
    const hasUrgentDiagnosis = diagnoses.some(d => d.urgency === 'urgent');
    if (hasUrgentDiagnosis || totalRedFlags >= 1 || riskScore.category === 'moderate') {
      return TRIAGE_LEVELS.semiUrgent;
    }
    
    // Check for mild symptoms only
    if (symptoms.length <= 2 && symptoms.every(s => s.severity === 'mild')) {
      return TRIAGE_LEVELS.selfCare;
    }
    
    return TRIAGE_LEVELS.routine;
  }
  
  private collectRedFlags(
    symptoms: SymptomEntry[],
    diagnoses: DiagnosisResult[]
  ): AnalysisResult['redFlags'] {
    const redFlags: AnalysisResult['redFlags'] = [];
    const seenFlags = new Set<string>();
    
    // From diagnoses
    diagnoses.forEach(d => {
      d.redFlagsDetected.forEach(rf => {
        if (!seenFlags.has(rf)) {
          seenFlags.add(rf);
          const flagInfo = ENHANCED_RED_FLAGS[rf.toLowerCase().replace(/\s+/g, '-')] || 
                          ENHANCED_RED_FLAGS[rf.toLowerCase()];
          
          if (flagInfo) {
            redFlags.push({
              flag: flagInfo.flag,
              severity: flagInfo.severity,
              description: flagInfo.description,
              action: flagInfo.immediateAction,
              timeframe: flagInfo.timeframe
            });
          } else {
            redFlags.push({
              flag: rf,
              severity: 'warning',
              description: rf,
              action: 'Consult healthcare provider',
              timeframe: 'Within 24 hours'
            });
          }
        }
      });
    });
    
    // Check for additional red flags in symptoms
    const criticalSymptoms = ['chest-pain', 'shortness-breath', 'cough-blood', 
                             'vomiting-blood', 'loss-consciousness', 'seizure'];
    
    symptoms.forEach(s => {
      if (criticalSymptoms.includes(s.id.toLowerCase()) && 
          (s.severity === 'severe' || s.severity === 'very-severe') &&
          !seenFlags.has(s.id)) {
        seenFlags.add(s.id);
        redFlags.push({
          flag: s.name,
          severity: 'critical',
          description: `Severe ${s.name.toLowerCase()} requires immediate attention`,
          action: 'Seek immediate medical care',
          timeframe: 'Immediate'
        });
      }
    });
    
    // Sort by severity
    const severityOrder = { critical: 0, serious: 1, warning: 2 };
    redFlags.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    
    return redFlags;
  }
  
  private getCorrelatedSymptoms(symptoms: SymptomEntry[]): AnalysisResult['correlatedSymptoms'] {
    const correlatedSymptoms: AnalysisResult['correlatedSymptoms'] = [];
    const symptomIds = symptoms.map(s => s.id.toLowerCase());
    const seenCorrelated = new Set<string>();
    
    symptoms.forEach(s => {
      const correlations = SYMPTOM_CORRELATIONS[s.id.toLowerCase()];
      if (correlations) {
        correlations.related.forEach(related => {
          if (!symptomIds.includes(related.toLowerCase()) && !seenCorrelated.has(related)) {
            seenCorrelated.add(related);
            correlatedSymptoms.push({
              symptom: related,
              correlation: 0.75,
              reason: `Often associated with ${s.name}`
            });
          }
        });
      }
    });
    
    return correlatedSymptoms.slice(0, 5);
  }
  
  private generateRecommendations(
    diagnoses: DiagnosisResult[],
    triageLevel: AnalysisResult['triageLevel'],
    patient: PatientContext
  ): AnalysisResult['recommendations'] {
    const recommendations: AnalysisResult['recommendations'] = {
      immediate: [],
      shortTerm: [],
      tests: [],
      specialists: [],
      lifestyle: []
    };
    
    // Immediate actions based on triage
    if (triageLevel.level <= 1) {
      recommendations.immediate.push('Call emergency services (112/999/911) immediately');
      recommendations.immediate.push('Do not eat or drink anything');
      recommendations.immediate.push('Stay calm and note the time symptoms started');
    } else if (triageLevel.level === 2) {
      recommendations.immediate.push('Seek urgent medical care within 2 hours');
      recommendations.immediate.push('Have someone drive you or call for transport');
    } else if (triageLevel.level === 3) {
      recommendations.immediate.push('Schedule same-day medical appointment');
      recommendations.immediate.push('Monitor symptoms closely');
    }
    
    // Short-term recommendations
    recommendations.shortTerm.push('Keep a detailed symptom diary');
    recommendations.shortTerm.push('Stay hydrated and rest');
    if (triageLevel.level > 2) {
      recommendations.shortTerm.push('Take over-the-counter medication as appropriate for symptom relief');
    }
    
    // Tests from top diagnoses
    const testSet = new Set<string>();
    diagnoses.slice(0, 3).forEach(d => {
      d.recommendedTests.forEach(test => {
        if (!testSet.has(test)) {
          testSet.add(test);
          recommendations.tests.push({
            test,
            urgency: triageLevel.level <= 2 ? 'Urgent' : 'Routine',
            reason: `To evaluate for ${d.conditionName}`
          });
        }
      });
    });
    
    // Specialists
    const specialistScores: Record<string, { score: number; reason: string }> = {};
    diagnoses.slice(0, 5).forEach((d, idx) => {
      d.specialists.forEach(spec => {
        if (!specialistScores[spec]) {
          specialistScores[spec] = { score: 0, reason: d.conditionName };
        }
        specialistScores[spec].score += (5 - idx) * d.probability / 100;
      });
    });
    
    Object.entries(specialistScores)
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 4)
      .forEach(([spec, data]) => {
        recommendations.specialists.push({
          specialist: spec.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          reason: `Based on ${data.reason}`
        });
      });
    
    // Lifestyle recommendations
    if (patient.lifestyle.smoking === 'current') {
      recommendations.lifestyle.push('Consider smoking cessation - greatly reduces health risks');
    }
    if (patient.lifestyle.exercise === 'sedentary') {
      recommendations.lifestyle.push('Increase physical activity gradually');
    }
    if (patient.lifestyle.diet === 'poor') {
      recommendations.lifestyle.push('Improve diet with more fruits, vegetables, and whole grains');
    }
    recommendations.lifestyle.push('Maintain regular sleep schedule (7-9 hours)');
    recommendations.lifestyle.push('Practice stress management techniques');
    
    return recommendations;
  }
  
  private calculateDataQuality(
    symptoms: SymptomEntry[],
    patient: PatientContext,
    diagnoses: DiagnosisResult[]
  ): AnalysisResult['dataQuality'] {
    // Completeness score
    let completeness = 0;
    if (patient.age) completeness += 20;
    if (patient.gender) completeness += 20;
    if (symptoms.length >= 2) completeness += 30;
    else if (symptoms.length === 1) completeness += 15;
    if (patient.preConditions.length > 0) completeness += 15;
    if (patient.medications.length > 0) completeness += 10;
    if (patient.lifestyle.smoking !== 'never') completeness += 5;
    
    // Symptom specificity
    let specificity = 50;
    if (symptoms.some(s => s.severity !== 'mild')) specificity += 20;
    if (symptoms.some(s => s.onset === 'sudden')) specificity += 10;
    if (symptoms.some(s => s.duration)) specificity += 10;
    if (symptoms.length >= 3) specificity += 10;
    
    // Diagnostic confidence
    const topDiagnosis = diagnoses[0];
    const confidence = topDiagnosis ? topDiagnosis.probability : 0;
    
    return {
      completeness: Math.min(100, completeness),
      symptomSpecificity: Math.min(100, specificity),
      diagnosticConfidence: confidence
    };
  }
}

// ════════════════════════════════════════════════════════════════════════════════
// EXPORTED FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

// Create singleton instance
const diagnosticEngine = new BayesianDiagnosticEngine();

/**
 * Analyze symptoms using enhanced AI diagnostic engine
 */
export function analyzeWithEnhancedAI(
  symptoms: SymptomEntry[],
  patient: PatientContext
): AnalysisResult {
  return diagnosticEngine.analyze(symptoms, patient);
}

/**
 * Get engine statistics
 */
export function getEngineStats(): {
  conditionCount: number;
  redFlagCount: number;
  engineVersion: string;
  capabilities: string[];
} {
  return {
    conditionCount: getConditionCount(),
    redFlagCount: getRedFlagCount(),
    engineVersion: 'MediSense-AI-v2.0',
    capabilities: [
      'Bayesian probability inference',
      'Age/gender-specific symptom modifiers',
      'Comorbidity interaction analysis',
      'Symptom correlation networks',
      'Evidence-based weighting',
      'Multi-factor risk stratification',
      'ICD-11 aligned conditions database'
    ]
  };
}
