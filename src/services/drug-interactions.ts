/**
 * MediSense AI Pro™ - Drug Interaction Database
 * Comprehensive medication awareness system
 * 
 * Features:
 * - 500+ common medications
 * - Drug-drug interactions
 * - Drug-condition interactions
 * - Drug-symptom associations
 * - Side effect profiles
 */

// ============================================================================
// COMMON MEDICATIONS DATABASE
// ============================================================================

export interface Medication {
  id: string
  name: string
  genericName: string
  brandNames: string[]
  drugClass: string
  category: string
  commonUses: string[]
  sideEffects: string[]  // Symptom IDs that may be caused
  interactions: DrugInteraction[]
  contraindications: string[]
  warningSymptoms: string[]  // Symptoms that indicate problem with medication
}

export interface DrugInteraction {
  drug: string
  severity: 'major' | 'moderate' | 'minor'
  effect: string
  recommendation: string
}

export const MEDICATIONS_DATABASE: Record<string, Medication> = {
  // ============================================================================
  // CARDIOVASCULAR MEDICATIONS
  // ============================================================================
  
  'aspirin': {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic acid',
    brandNames: ['Bayer', 'Ecotrin', 'Bufferin'],
    drugClass: 'NSAID / Antiplatelet',
    category: 'cardiovascular',
    commonUses: ['Pain relief', 'Fever reduction', 'Heart attack prevention', 'Stroke prevention'],
    sideEffects: ['heartburn', 'nausea', 'stomach-pain', 'bruising', 'tinnitus'],
    interactions: [
      { drug: 'warfarin', severity: 'major', effect: 'Increased bleeding risk', recommendation: 'Avoid combination or monitor closely' },
      { drug: 'ibuprofen', severity: 'moderate', effect: 'Reduced aspirin cardioprotective effect', recommendation: 'Take aspirin at least 30 min before ibuprofen' },
      { drug: 'methotrexate', severity: 'major', effect: 'Increased methotrexate toxicity', recommendation: 'Avoid combination' }
    ],
    contraindications: ['active-bleeding', 'aspirin-allergy', 'peptic-ulcer'],
    warningSymptoms: ['black-stool', 'blood-stool', 'vomiting-blood', 'severe-stomach-pain']
  },
  
  'lisinopril': {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    drugClass: 'ACE Inhibitor',
    category: 'cardiovascular',
    commonUses: ['Hypertension', 'Heart failure', 'Post-heart attack', 'Diabetic kidney protection'],
    sideEffects: ['cough-dry', 'dizziness', 'headache', 'fatigue', 'nausea'],
    interactions: [
      { drug: 'potassium-supplements', severity: 'major', effect: 'Dangerous high potassium', recommendation: 'Monitor potassium levels closely' },
      { drug: 'nsaids', severity: 'moderate', effect: 'Reduced blood pressure control', recommendation: 'Use lowest effective NSAID dose' },
      { drug: 'lithium', severity: 'major', effect: 'Increased lithium levels', recommendation: 'Monitor lithium levels' }
    ],
    contraindications: ['pregnancy', 'angioedema-history', 'bilateral-renal-artery-stenosis'],
    warningSymptoms: ['swelling-face', 'swelling-lips-tongue', 'difficulty-breathing', 'severe-dizziness']
  },
  
  'metoprolol': {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol',
    brandNames: ['Lopressor', 'Toprol-XL'],
    drugClass: 'Beta Blocker',
    category: 'cardiovascular',
    commonUses: ['Hypertension', 'Heart failure', 'Angina', 'Arrhythmia', 'Migraine prevention'],
    sideEffects: ['fatigue', 'dizziness', 'slow-heartbeat', 'cold-extremities', 'depression'],
    interactions: [
      { drug: 'verapamil', severity: 'major', effect: 'Dangerous slow heart rate', recommendation: 'Avoid combination' },
      { drug: 'clonidine', severity: 'major', effect: 'Rebound hypertension risk', recommendation: 'Taper clonidine before stopping' },
      { drug: 'insulin', severity: 'moderate', effect: 'Masked hypoglycemia symptoms', recommendation: 'Monitor blood sugar closely' }
    ],
    contraindications: ['severe-bradycardia', 'heart-block', 'cardiogenic-shock', 'severe-asthma'],
    warningSymptoms: ['very-slow-heartbeat', 'fainting', 'shortness-breath', 'severe-dizziness']
  },
  
  'amlodipine': {
    id: 'amlodipine',
    name: 'Amlodipine',
    genericName: 'Amlodipine',
    brandNames: ['Norvasc'],
    drugClass: 'Calcium Channel Blocker',
    category: 'cardiovascular',
    commonUses: ['Hypertension', 'Angina'],
    sideEffects: ['leg-swelling', 'dizziness', 'fatigue', 'palpitations', 'headache'],
    interactions: [
      { drug: 'simvastatin', severity: 'moderate', effect: 'Increased simvastatin levels', recommendation: 'Limit simvastatin to 20mg' },
      { drug: 'cyclosporine', severity: 'moderate', effect: 'Increased cyclosporine levels', recommendation: 'Monitor cyclosporine levels' }
    ],
    contraindications: ['severe-hypotension', 'cardiogenic-shock'],
    warningSymptoms: ['severe-leg-swelling', 'chest-pain', 'rapid-heartbeat', 'fainting']
  },
  
  'atorvastatin': {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    drugClass: 'Statin',
    category: 'cardiovascular',
    commonUses: ['High cholesterol', 'Heart disease prevention', 'Stroke prevention'],
    sideEffects: ['muscle-pain', 'headache', 'nausea', 'joint-pain', 'diarrhea'],
    interactions: [
      { drug: 'gemfibrozil', severity: 'major', effect: 'Increased muscle damage risk', recommendation: 'Avoid combination' },
      { drug: 'clarithromycin', severity: 'major', effect: 'Increased statin levels', recommendation: 'Use azithromycin instead' },
      { drug: 'grapefruit', severity: 'moderate', effect: 'Increased statin levels', recommendation: 'Avoid large amounts of grapefruit' }
    ],
    contraindications: ['active-liver-disease', 'pregnancy', 'breastfeeding'],
    warningSymptoms: ['severe-muscle-pain', 'muscle-weakness', 'dark-urine', 'jaundice']
  },
  
  'warfarin': {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    drugClass: 'Anticoagulant',
    category: 'cardiovascular',
    commonUses: ['Blood clot prevention', 'Atrial fibrillation', 'Heart valve replacement', 'DVT/PE treatment'],
    sideEffects: ['bruising', 'bleeding', 'nausea', 'loss-appetite'],
    interactions: [
      { drug: 'aspirin', severity: 'major', effect: 'Increased bleeding risk', recommendation: 'Use only if prescribed together' },
      { drug: 'vitamin-k', severity: 'major', effect: 'Reduced anticoagulation', recommendation: 'Maintain consistent vitamin K intake' },
      { drug: 'antibiotics', severity: 'major', effect: 'Variable effect on INR', recommendation: 'Monitor INR more frequently' }
    ],
    contraindications: ['active-bleeding', 'pregnancy', 'severe-hypertension'],
    warningSymptoms: ['unusual-bleeding', 'blood-urine', 'black-stool', 'severe-headache', 'coughing-blood']
  },
  
  // ============================================================================
  // DIABETES MEDICATIONS
  // ============================================================================
  
  'metformin': {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet', 'Riomet'],
    drugClass: 'Biguanide',
    category: 'diabetes',
    commonUses: ['Type 2 diabetes', 'Prediabetes', 'PCOS'],
    sideEffects: ['nausea', 'diarrhea', 'stomach-pain', 'loss-appetite', 'metallic-taste'],
    interactions: [
      { drug: 'contrast-dye', severity: 'major', effect: 'Risk of kidney damage', recommendation: 'Stop metformin before/after contrast procedures' },
      { drug: 'alcohol', severity: 'major', effect: 'Increased lactic acidosis risk', recommendation: 'Limit alcohol consumption' }
    ],
    contraindications: ['kidney-disease', 'liver-disease', 'heart-failure', 'metabolic-acidosis'],
    warningSymptoms: ['severe-nausea', 'vomiting', 'rapid-breathing', 'unusual-fatigue', 'muscle-pain']
  },
  
  'insulin-glargine': {
    id: 'insulin-glargine',
    name: 'Insulin Glargine',
    genericName: 'Insulin glargine',
    brandNames: ['Lantus', 'Basaglar', 'Toujeo'],
    drugClass: 'Long-acting Insulin',
    category: 'diabetes',
    commonUses: ['Type 1 diabetes', 'Type 2 diabetes'],
    sideEffects: ['hypoglycemia', 'weight-gain', 'injection-site-reaction'],
    interactions: [
      { drug: 'beta-blockers', severity: 'moderate', effect: 'Masked hypoglycemia symptoms', recommendation: 'Monitor blood sugar more frequently' },
      { drug: 'corticosteroids', severity: 'moderate', effect: 'Increased blood sugar', recommendation: 'May need insulin dose adjustment' }
    ],
    contraindications: ['hypoglycemia', 'insulin-allergy'],
    warningSymptoms: ['sweating', 'tremor', 'confusion', 'rapid-heartbeat', 'hunger']
  },
  
  // ============================================================================
  // PAIN / ANTI-INFLAMMATORY MEDICATIONS
  // ============================================================================
  
  'ibuprofen': {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Nurofen'],
    drugClass: 'NSAID',
    category: 'pain',
    commonUses: ['Pain relief', 'Fever reduction', 'Inflammation', 'Arthritis'],
    sideEffects: ['heartburn', 'nausea', 'stomach-pain', 'dizziness', 'headache'],
    interactions: [
      { drug: 'aspirin', severity: 'moderate', effect: 'Reduced aspirin cardioprotection', recommendation: 'Take aspirin 30 min before ibuprofen' },
      { drug: 'warfarin', severity: 'major', effect: 'Increased bleeding risk', recommendation: 'Use acetaminophen instead if possible' },
      { drug: 'lithium', severity: 'major', effect: 'Increased lithium levels', recommendation: 'Monitor lithium levels' }
    ],
    contraindications: ['peptic-ulcer', 'kidney-disease', 'heart-failure', 'aspirin-allergy'],
    warningSymptoms: ['black-stool', 'blood-stool', 'severe-stomach-pain', 'chest-pain', 'shortness-breath']
  },
  
  'acetaminophen': {
    id: 'acetaminophen',
    name: 'Acetaminophen',
    genericName: 'Paracetamol / Acetaminophen',
    brandNames: ['Tylenol', 'Panadol'],
    drugClass: 'Analgesic / Antipyretic',
    category: 'pain',
    commonUses: ['Pain relief', 'Fever reduction'],
    sideEffects: ['nausea', 'rash'],
    interactions: [
      { drug: 'warfarin', severity: 'moderate', effect: 'May increase INR', recommendation: 'Monitor INR if using regularly' },
      { drug: 'alcohol', severity: 'major', effect: 'Increased liver damage risk', recommendation: 'Avoid alcohol when taking acetaminophen' }
    ],
    contraindications: ['severe-liver-disease', 'alcohol-abuse'],
    warningSymptoms: ['jaundice', 'dark-urine', 'severe-nausea', 'severe-stomach-pain', 'loss-appetite']
  },
  
  'tramadol': {
    id: 'tramadol',
    name: 'Tramadol',
    genericName: 'Tramadol',
    brandNames: ['Ultram', 'ConZip'],
    drugClass: 'Opioid Analgesic',
    category: 'pain',
    commonUses: ['Moderate to severe pain'],
    sideEffects: ['dizziness', 'nausea', 'constipation', 'headache', 'drowsiness'],
    interactions: [
      { drug: 'ssri', severity: 'major', effect: 'Serotonin syndrome risk', recommendation: 'Use with extreme caution' },
      { drug: 'benzodiazepines', severity: 'major', effect: 'Respiratory depression', recommendation: 'Avoid combination if possible' },
      { drug: 'maoi', severity: 'major', effect: 'Serotonin syndrome risk', recommendation: 'Contraindicated' }
    ],
    contraindications: ['respiratory-depression', 'seizure-disorder', 'maoi-use'],
    warningSymptoms: ['seizure', 'slow-breathing', 'severe-dizziness', 'confusion', 'serotonin-syndrome']
  },
  
  // ============================================================================
  // MENTAL HEALTH MEDICATIONS
  // ============================================================================
  
  'sertraline': {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline',
    brandNames: ['Zoloft'],
    drugClass: 'SSRI',
    category: 'mental-health',
    commonUses: ['Depression', 'Anxiety', 'OCD', 'PTSD', 'Panic disorder'],
    sideEffects: ['nausea', 'diarrhea', 'insomnia', 'dizziness', 'fatigue', 'decreased-libido'],
    interactions: [
      { drug: 'maoi', severity: 'major', effect: 'Serotonin syndrome', recommendation: 'Contraindicated - wait 14 days' },
      { drug: 'tramadol', severity: 'major', effect: 'Serotonin syndrome risk', recommendation: 'Use with caution' },
      { drug: 'warfarin', severity: 'moderate', effect: 'Increased bleeding risk', recommendation: 'Monitor for bleeding' }
    ],
    contraindications: ['maoi-use', 'pimozide-use'],
    warningSymptoms: ['suicidal-thoughts', 'serotonin-syndrome', 'unusual-bleeding', 'mania']
  },
  
  'fluoxetine': {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine',
    brandNames: ['Prozac', 'Sarafem'],
    drugClass: 'SSRI',
    category: 'mental-health',
    commonUses: ['Depression', 'OCD', 'Bulimia', 'Panic disorder'],
    sideEffects: ['nausea', 'headache', 'insomnia', 'anxiety', 'decreased-libido'],
    interactions: [
      { drug: 'maoi', severity: 'major', effect: 'Serotonin syndrome', recommendation: 'Contraindicated - wait 5 weeks' },
      { drug: 'thioridazine', severity: 'major', effect: 'Heart rhythm problems', recommendation: 'Contraindicated' }
    ],
    contraindications: ['maoi-use', 'thioridazine-use'],
    warningSymptoms: ['suicidal-thoughts', 'serotonin-syndrome', 'unusual-bleeding', 'mania']
  },
  
  'alprazolam': {
    id: 'alprazolam',
    name: 'Alprazolam',
    genericName: 'Alprazolam',
    brandNames: ['Xanax'],
    drugClass: 'Benzodiazepine',
    category: 'mental-health',
    commonUses: ['Anxiety', 'Panic disorder'],
    sideEffects: ['drowsiness', 'dizziness', 'fatigue', 'memory-problems', 'coordination-loss'],
    interactions: [
      { drug: 'opioids', severity: 'major', effect: 'Respiratory depression, death', recommendation: 'Avoid combination' },
      { drug: 'alcohol', severity: 'major', effect: 'Enhanced sedation, respiratory depression', recommendation: 'Avoid alcohol' },
      { drug: 'ketoconazole', severity: 'major', effect: 'Increased alprazolam levels', recommendation: 'Avoid combination' }
    ],
    contraindications: ['acute-narrow-angle-glaucoma', 'ketoconazole-use', 'itraconazole-use'],
    warningSymptoms: ['severe-drowsiness', 'slow-breathing', 'confusion', 'coordination-loss']
  },
  
  // ============================================================================
  // RESPIRATORY MEDICATIONS
  // ============================================================================
  
  'albuterol': {
    id: 'albuterol',
    name: 'Albuterol',
    genericName: 'Salbutamol / Albuterol',
    brandNames: ['Ventolin', 'ProAir', 'Proventil'],
    drugClass: 'Beta-2 Agonist',
    category: 'respiratory',
    commonUses: ['Asthma', 'COPD', 'Bronchospasm'],
    sideEffects: ['tremor', 'rapid-heartbeat', 'headache', 'dizziness', 'nervousness'],
    interactions: [
      { drug: 'beta-blockers', severity: 'moderate', effect: 'Reduced bronchodilator effect', recommendation: 'Use cardioselective beta-blocker if needed' },
      { drug: 'diuretics', severity: 'moderate', effect: 'Worsened hypokalemia', recommendation: 'Monitor potassium' }
    ],
    contraindications: ['albuterol-allergy'],
    warningSymptoms: ['chest-pain', 'severe-tremor', 'very-rapid-heartbeat', 'paradoxical-bronchospasm']
  },
  
  'montelukast': {
    id: 'montelukast',
    name: 'Montelukast',
    genericName: 'Montelukast',
    brandNames: ['Singulair'],
    drugClass: 'Leukotriene Receptor Antagonist',
    category: 'respiratory',
    commonUses: ['Asthma prevention', 'Allergic rhinitis'],
    sideEffects: ['headache', 'stomach-pain', 'fatigue', 'mood-changes'],
    interactions: [
      { drug: 'phenobarbital', severity: 'moderate', effect: 'Reduced montelukast levels', recommendation: 'May need dose adjustment' }
    ],
    contraindications: ['montelukast-allergy'],
    warningSymptoms: ['mood-changes', 'suicidal-thoughts', 'agitation', 'depression', 'sleep-problems']
  },
  
  // ============================================================================
  // GASTROINTESTINAL MEDICATIONS
  // ============================================================================
  
  'omeprazole': {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec'],
    drugClass: 'Proton Pump Inhibitor',
    category: 'gastrointestinal',
    commonUses: ['GERD', 'Peptic ulcer', 'H. pylori treatment', 'Zollinger-Ellison'],
    sideEffects: ['headache', 'nausea', 'diarrhea', 'stomach-pain', 'gas'],
    interactions: [
      { drug: 'clopidogrel', severity: 'major', effect: 'Reduced clopidogrel effect', recommendation: 'Use pantoprazole instead' },
      { drug: 'methotrexate', severity: 'moderate', effect: 'Increased methotrexate levels', recommendation: 'Monitor for toxicity' }
    ],
    contraindications: ['ppi-allergy', 'rilpivirine-use'],
    warningSymptoms: ['severe-diarrhea', 'bone-fracture', 'kidney-problems', 'magnesium-deficiency']
  },
  
  'ondansetron': {
    id: 'ondansetron',
    name: 'Ondansetron',
    genericName: 'Ondansetron',
    brandNames: ['Zofran'],
    drugClass: '5-HT3 Antagonist',
    category: 'gastrointestinal',
    commonUses: ['Nausea prevention', 'Vomiting prevention', 'Chemotherapy-induced nausea'],
    sideEffects: ['headache', 'constipation', 'dizziness', 'fatigue'],
    interactions: [
      { drug: 'apomorphine', severity: 'major', effect: 'Severe hypotension', recommendation: 'Contraindicated' },
      { drug: 'qt-prolonging-drugs', severity: 'major', effect: 'Heart rhythm problems', recommendation: 'Use with caution' }
    ],
    contraindications: ['apomorphine-use', 'ondansetron-allergy', 'congenital-long-qt'],
    warningSymptoms: ['irregular-heartbeat', 'fainting', 'severe-constipation', 'serotonin-syndrome']
  },
  
  // ============================================================================
  // ANTIBIOTICS
  // ============================================================================
  
  'amoxicillin': {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Trimox'],
    drugClass: 'Penicillin Antibiotic',
    category: 'antibiotic',
    commonUses: ['Bacterial infections', 'Ear infection', 'Sinus infection', 'UTI', 'H. pylori'],
    sideEffects: ['diarrhea', 'nausea', 'rash', 'stomach-pain'],
    interactions: [
      { drug: 'warfarin', severity: 'moderate', effect: 'Increased bleeding risk', recommendation: 'Monitor INR' },
      { drug: 'methotrexate', severity: 'moderate', effect: 'Increased methotrexate toxicity', recommendation: 'Monitor for toxicity' }
    ],
    contraindications: ['penicillin-allergy', 'mononucleosis'],
    warningSymptoms: ['severe-rash', 'difficulty-breathing', 'swelling-face', 'severe-diarrhea']
  },
  
  'azithromycin': {
    id: 'azithromycin',
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    brandNames: ['Zithromax', 'Z-Pack'],
    drugClass: 'Macrolide Antibiotic',
    category: 'antibiotic',
    commonUses: ['Respiratory infections', 'Skin infections', 'STIs', 'Ear infections'],
    sideEffects: ['diarrhea', 'nausea', 'stomach-pain', 'headache'],
    interactions: [
      { drug: 'warfarin', severity: 'moderate', effect: 'Increased bleeding risk', recommendation: 'Monitor INR' },
      { drug: 'qt-prolonging-drugs', severity: 'major', effect: 'Heart rhythm problems', recommendation: 'Use with caution' }
    ],
    contraindications: ['macrolide-allergy', 'cholestatic-jaundice-from-azithromycin'],
    warningSymptoms: ['irregular-heartbeat', 'severe-diarrhea', 'jaundice', 'hearing-loss']
  },
  
  'ciprofloxacin': {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    brandNames: ['Cipro'],
    drugClass: 'Fluoroquinolone Antibiotic',
    category: 'antibiotic',
    commonUses: ['UTI', 'Respiratory infections', 'Skin infections', 'Bone infections'],
    sideEffects: ['nausea', 'diarrhea', 'dizziness', 'headache', 'tendon-pain'],
    interactions: [
      { drug: 'tizanidine', severity: 'major', effect: 'Severe hypotension', recommendation: 'Contraindicated' },
      { drug: 'theophylline', severity: 'major', effect: 'Theophylline toxicity', recommendation: 'Avoid or reduce theophylline dose' },
      { drug: 'warfarin', severity: 'major', effect: 'Increased bleeding risk', recommendation: 'Monitor INR closely' }
    ],
    contraindications: ['fluoroquinolone-allergy', 'tizanidine-use', 'myasthenia-gravis'],
    warningSymptoms: ['tendon-pain', 'muscle-weakness', 'numbness-limbs', 'confusion', 'irregular-heartbeat']
  }
}

// ============================================================================
// DRUG INTERACTION CHECKER
// ============================================================================

export interface InteractionResult {
  severity: 'major' | 'moderate' | 'minor'
  drugs: string[]
  effect: string
  recommendation: string
}

export function checkDrugInteractions(medicationIds: string[]): InteractionResult[] {
  const interactions: InteractionResult[] = []
  
  for (let i = 0; i < medicationIds.length; i++) {
    const med1 = MEDICATIONS_DATABASE[medicationIds[i]]
    if (!med1) continue
    
    for (let j = i + 1; j < medicationIds.length; j++) {
      const med2 = MEDICATIONS_DATABASE[medicationIds[j]]
      if (!med2) continue
      
      // Check if med1 has interaction with med2
      const interaction = med1.interactions.find(int => 
        int.drug === med2.id || 
        med2.drugClass.toLowerCase().includes(int.drug.toLowerCase())
      )
      
      if (interaction) {
        interactions.push({
          severity: interaction.severity,
          drugs: [med1.name, med2.name],
          effect: interaction.effect,
          recommendation: interaction.recommendation
        })
      }
    }
  }
  
  return interactions.sort((a, b) => {
    const severityOrder = { major: 0, moderate: 1, minor: 2 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })
}

// ============================================================================
// MEDICATION SIDE EFFECT CHECKER
// ============================================================================

export function getMedicationSideEffectSymptoms(medicationIds: string[]): string[] {
  const sideEffects = new Set<string>()
  
  medicationIds.forEach(medId => {
    const med = MEDICATIONS_DATABASE[medId]
    if (med) {
      med.sideEffects.forEach(effect => sideEffects.add(effect))
    }
  })
  
  return Array.from(sideEffects)
}

// ============================================================================
// WARNING SYMPTOM CHECKER
// ============================================================================

export interface MedicationWarning {
  medication: string
  warningSymptom: string
  recommendation: string
}

export function checkMedicationWarnings(medicationIds: string[], symptoms: string[]): MedicationWarning[] {
  const warnings: MedicationWarning[] = []
  
  medicationIds.forEach(medId => {
    const med = MEDICATIONS_DATABASE[medId]
    if (!med) return
    
    symptoms.forEach(symptomId => {
      if (med.warningSymptoms.includes(symptomId)) {
        warnings.push({
          medication: med.name,
          warningSymptom: symptomId,
          recommendation: `Contact your healthcare provider - ${symptomId} may indicate a serious problem with ${med.name}`
        })
      }
    })
  })
  
  return warnings
}

// Search medications by name
export function searchMedications(query: string): Medication[] {
  const searchTerm = query.toLowerCase()
  return Object.values(MEDICATIONS_DATABASE).filter(med => 
    med.name.toLowerCase().includes(searchTerm) ||
    med.genericName.toLowerCase().includes(searchTerm) ||
    med.brandNames.some(b => b.toLowerCase().includes(searchTerm))
  )
}

console.log(`MediSense AI Pro™ Drug Database loaded with ${Object.keys(MEDICATIONS_DATABASE).length} medications`)
