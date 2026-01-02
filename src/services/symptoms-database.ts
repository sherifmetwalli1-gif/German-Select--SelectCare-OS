/**
 * MediSense AI™ Pro - Enhanced Symptoms Database v2.0
 * 
 * Comprehensive symptom definitions with:
 * - Multiple aliases for symptom matching
 * - Severity descriptors
 * - Associated body regions
 * - Medical terminology
 * - Laymen descriptions
 */

export interface SymptomDefinition {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  medicalTerms: string[];
  description: string;
  bodyRegions: string[];
  severityIndicators: {
    mild: string[];
    moderate: string[];
    severe: string[];
  };
  relatedSymptoms: string[];
  redFlagCombinations: { symptoms: string[]; condition: string }[];
}

// ════════════════════════════════════════════════════════════════════════════════
// SYMPTOMS DATABASE
// ════════════════════════════════════════════════════════════════════════════════

export const SYMPTOMS_DATABASE: Record<string, SymptomDefinition> = {
  
  // ══════════════════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'chest-pain': {
    id: 'chest-pain',
    name: 'Chest Pain',
    category: 'cardiovascular',
    aliases: ['chest discomfort', 'chest tightness', 'chest pressure', 'chest heaviness', 'angina'],
    medicalTerms: ['angina pectoris', 'thoracic pain', 'precordial pain', 'retrosternal pain'],
    description: 'Pain or discomfort in the chest area, can be sharp, dull, pressure-like, or burning',
    bodyRegions: ['chest', 'thorax', 'sternum'],
    severityIndicators: {
      mild: ['occasional discomfort', 'brief episodes', 'relieved by rest'],
      moderate: ['persistent discomfort', 'limits activity', 'recurring'],
      severe: ['crushing pain', 'radiating to arm/jaw', 'associated with sweating', 'at rest']
    },
    relatedSymptoms: ['shortness-breath', 'sweating', 'nausea', 'arm-pain', 'jaw-pain'],
    redFlagCombinations: [
      { symptoms: ['sweating', 'shortness-breath'], condition: 'acute-coronary-syndrome' },
      { symptoms: ['radiating-pain', 'jaw-pain'], condition: 'myocardial-infarction' }
    ]
  },
  
  'palpitations': {
    id: 'palpitations',
    name: 'Palpitations',
    category: 'cardiovascular',
    aliases: ['racing heart', 'heart fluttering', 'skipping beats', 'heart pounding', 'rapid heartbeat'],
    medicalTerms: ['cardiac arrhythmia awareness', 'tachycardia sensation'],
    description: 'Awareness of heartbeat, may feel fast, slow, or irregular',
    bodyRegions: ['chest', 'neck'],
    severityIndicators: {
      mild: ['occasional awareness', 'brief episodes', 'no other symptoms'],
      moderate: ['frequent episodes', 'lasting minutes', 'mild dizziness'],
      severe: ['sustained rapid rate', 'with chest pain', 'fainting', 'severe dizziness']
    },
    relatedSymptoms: ['dizziness', 'shortness-breath', 'anxiety', 'chest-pain'],
    redFlagCombinations: [
      { symptoms: ['fainting', 'chest-pain'], condition: 'cardiac-arrhythmia' },
      { symptoms: ['shortness-breath', 'leg-swelling'], condition: 'heart-failure' }
    ]
  },
  
  'shortness-breath': {
    id: 'shortness-breath',
    name: 'Shortness of Breath',
    category: 'respiratory',
    aliases: ['breathlessness', 'difficulty breathing', 'cant catch breath', 'dyspnea', 'air hunger', 'winded'],
    medicalTerms: ['dyspnea', 'respiratory distress', 'air hunger'],
    description: 'Difficulty breathing or feeling of not getting enough air',
    bodyRegions: ['chest', 'lungs', 'throat'],
    severityIndicators: {
      mild: ['with exertion', 'climbing stairs', 'resolves with rest'],
      moderate: ['with minimal exertion', 'walking short distances', 'persistent'],
      severe: ['at rest', 'cant speak full sentences', 'gasping', 'blue lips']
    },
    relatedSymptoms: ['cough', 'wheezing', 'chest-pain', 'fatigue', 'leg-swelling'],
    redFlagCombinations: [
      { symptoms: ['chest-pain', 'leg-swelling'], condition: 'pulmonary-embolism' },
      { symptoms: ['sudden-onset', 'pleuritic-pain'], condition: 'pneumothorax' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // NEUROLOGICAL SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'headache': {
    id: 'headache',
    name: 'Headache',
    category: 'neurological',
    aliases: ['head pain', 'cephalalgia', 'migraine', 'head hurts', 'head pressure'],
    medicalTerms: ['cephalalgia', 'cranial pain', 'cephalgia'],
    description: 'Pain in any part of the head',
    bodyRegions: ['head', 'forehead', 'temples', 'back of head'],
    severityIndicators: {
      mild: ['dull ache', 'responds to OTC meds', 'no nausea'],
      moderate: ['persistent pain', 'limits activity', 'some nausea'],
      severe: ['worst headache ever', 'thunderclap onset', 'with confusion', 'with neck stiffness']
    },
    relatedSymptoms: ['nausea', 'light-sensitivity', 'neck-stiffness', 'vision-changes', 'dizziness'],
    redFlagCombinations: [
      { symptoms: ['neck-stiffness', 'fever'], condition: 'meningitis' },
      { symptoms: ['sudden-onset', 'worst-ever'], condition: 'subarachnoid-hemorrhage' }
    ]
  },
  
  'dizziness': {
    id: 'dizziness',
    name: 'Dizziness',
    category: 'neurological',
    aliases: ['lightheaded', 'vertigo', 'spinning', 'off balance', 'woozy', 'faint feeling'],
    medicalTerms: ['vertigo', 'presyncope', 'disequilibrium', 'lightheadedness'],
    description: 'Sensation of unsteadiness, lightheadedness, or spinning',
    bodyRegions: ['head', 'inner ear'],
    severityIndicators: {
      mild: ['brief episodes', 'with position change', 'resolves quickly'],
      moderate: ['persistent', 'affects balance', 'recurring'],
      severe: ['cant stand', 'with vomiting', 'hearing loss', 'fainting']
    },
    relatedSymptoms: ['nausea', 'hearing-changes', 'headache', 'vision-changes'],
    redFlagCombinations: [
      { symptoms: ['one-sided-weakness', 'speech-difficulty'], condition: 'stroke' },
      { symptoms: ['hearing-loss', 'tinnitus'], condition: 'menieres-disease' }
    ]
  },
  
  'confusion': {
    id: 'confusion',
    name: 'Confusion',
    category: 'neurological',
    aliases: ['disorientation', 'mental fog', 'altered mental status', 'cant think clearly', 'brain fog'],
    medicalTerms: ['altered mental status', 'acute confusional state', 'delirium', 'encephalopathy'],
    description: 'Difficulty thinking clearly, disorientation to time/place/person',
    bodyRegions: ['brain', 'head'],
    severityIndicators: {
      mild: ['mild forgetfulness', 'difficulty concentrating'],
      moderate: ['disoriented to time', 'difficulty with tasks', 'agitation'],
      severe: ['not recognizing family', 'hallucinations', 'unresponsive']
    },
    relatedSymptoms: ['headache', 'fever', 'weakness', 'speech-difficulty'],
    redFlagCombinations: [
      { symptoms: ['fever', 'neck-stiffness'], condition: 'meningitis' },
      { symptoms: ['one-sided-weakness'], condition: 'stroke' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // GASTROINTESTINAL SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'abdominal-pain': {
    id: 'abdominal-pain',
    name: 'Abdominal Pain',
    category: 'gastrointestinal',
    aliases: ['stomach pain', 'belly pain', 'tummy ache', 'gut pain', 'stomach cramps'],
    medicalTerms: ['abdominal colic', 'visceral pain', 'peritoneal pain'],
    description: 'Pain in the area between chest and pelvis',
    bodyRegions: ['abdomen', 'stomach', 'belly'],
    severityIndicators: {
      mild: ['crampy', 'intermittent', 'eating related'],
      moderate: ['persistent', 'limits activity', 'with nausea'],
      severe: ['severe constant pain', 'rigid abdomen', 'with fever', 'with vomiting']
    },
    relatedSymptoms: ['nausea', 'vomiting', 'diarrhea', 'fever', 'bloating'],
    redFlagCombinations: [
      { symptoms: ['right-lower-quadrant', 'fever'], condition: 'appendicitis' },
      { symptoms: ['vomiting-blood', 'black-stool'], condition: 'gi-bleeding' }
    ]
  },
  
  'nausea': {
    id: 'nausea',
    name: 'Nausea',
    category: 'gastrointestinal',
    aliases: ['feeling sick', 'queasy', 'stomach upset', 'wanting to vomit', 'sick to stomach'],
    medicalTerms: ['nausea', 'emetic sensation'],
    description: 'Unpleasant sensation of wanting to vomit',
    bodyRegions: ['stomach', 'abdomen'],
    severityIndicators: {
      mild: ['occasional', 'no vomiting', 'can eat'],
      moderate: ['persistent', 'limiting food intake', 'some vomiting'],
      severe: ['constant', 'unable to eat/drink', 'repeated vomiting']
    },
    relatedSymptoms: ['vomiting', 'abdominal-pain', 'dizziness', 'headache'],
    redFlagCombinations: [
      { symptoms: ['severe-headache', 'neck-stiffness'], condition: 'meningitis' },
      { symptoms: ['chest-pain', 'sweating'], condition: 'heart-attack' }
    ]
  },
  
  'vomiting': {
    id: 'vomiting',
    name: 'Vomiting',
    category: 'gastrointestinal',
    aliases: ['throwing up', 'being sick', 'emesis', 'puking'],
    medicalTerms: ['emesis', 'vomitus'],
    description: 'Forceful expulsion of stomach contents through the mouth',
    bodyRegions: ['stomach', 'esophagus'],
    severityIndicators: {
      mild: ['occasional', 'clear/food contents', 'keeping some fluids down'],
      moderate: ['frequent', 'bile contents', 'difficulty keeping fluids'],
      severe: ['blood in vomit', 'projectile', 'cant keep anything down', 'for >24 hours']
    },
    relatedSymptoms: ['nausea', 'abdominal-pain', 'diarrhea', 'fever'],
    redFlagCombinations: [
      { symptoms: ['blood-in-vomit'], condition: 'gi-bleeding' },
      { symptoms: ['severe-headache'], condition: 'increased-intracranial-pressure' }
    ]
  },
  
  'diarrhea': {
    id: 'diarrhea',
    name: 'Diarrhea',
    category: 'gastrointestinal',
    aliases: ['loose stools', 'watery stools', 'frequent bowel movements', 'runny poo'],
    medicalTerms: ['diarrhea', 'loose stools', 'increased stool frequency'],
    description: 'Frequent loose or watery bowel movements',
    bodyRegions: ['intestines', 'colon'],
    severityIndicators: {
      mild: ['2-3 loose stools/day', 'no blood', 'no dehydration'],
      moderate: ['4-6 stools/day', 'some cramping', 'mild dehydration'],
      severe: ['>6 stools/day', 'bloody', 'severe dehydration', 'fever']
    },
    relatedSymptoms: ['abdominal-pain', 'nausea', 'fever', 'dehydration'],
    redFlagCombinations: [
      { symptoms: ['bloody-stool', 'fever'], condition: 'dysentery' },
      { symptoms: ['severe-dehydration'], condition: 'dehydration-emergency' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // GENERAL/SYSTEMIC SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'fever': {
    id: 'fever',
    name: 'Fever',
    category: 'general',
    aliases: ['high temperature', 'elevated temp', 'pyrexia', 'running a fever', 'feeling hot'],
    medicalTerms: ['pyrexia', 'febrile', 'hyperthermia'],
    description: 'Elevated body temperature above normal (>37.5°C/99.5°F)',
    bodyRegions: ['whole body'],
    severityIndicators: {
      mild: ['37.5-38°C', 'no other symptoms', 'responds to medication'],
      moderate: ['38-39°C', 'with chills', 'with body aches'],
      severe: ['>39.5°C', 'persistent', 'with confusion', 'with rash']
    },
    relatedSymptoms: ['chills', 'sweating', 'fatigue', 'body-aches'],
    redFlagCombinations: [
      { symptoms: ['neck-stiffness', 'headache'], condition: 'meningitis' },
      { symptoms: ['rash', 'confusion'], condition: 'sepsis' }
    ]
  },
  
  'fatigue': {
    id: 'fatigue',
    name: 'Fatigue',
    category: 'general',
    aliases: ['tiredness', 'exhaustion', 'weakness', 'no energy', 'lethargy', 'feeling drained'],
    medicalTerms: ['fatigue', 'asthenia', 'lassitude', 'malaise'],
    description: 'Persistent tiredness or lack of energy',
    bodyRegions: ['whole body'],
    severityIndicators: {
      mild: ['occasional tiredness', 'improves with rest', 'can function'],
      moderate: ['persistent tiredness', 'limits daily activities'],
      severe: ['unable to perform daily tasks', 'with weakness', 'prolonged bed rest needed']
    },
    relatedSymptoms: ['weakness', 'sleep-problems', 'depression', 'weight-changes'],
    redFlagCombinations: [
      { symptoms: ['weight-loss', 'night-sweats'], condition: 'cancer' },
      { symptoms: ['shortness-breath', 'leg-swelling'], condition: 'heart-failure' }
    ]
  },
  
  'weight-loss': {
    id: 'weight-loss',
    name: 'Unexplained Weight Loss',
    category: 'general',
    aliases: ['losing weight', 'unintentional weight loss', 'cachexia'],
    medicalTerms: ['unexplained weight loss', 'cachexia', 'wasting'],
    description: 'Unintentional decrease in body weight without trying to lose weight',
    bodyRegions: ['whole body'],
    severityIndicators: {
      mild: ['<5% body weight loss', 'over months'],
      moderate: ['5-10% loss', 'over 6 months', 'with appetite changes'],
      severe: ['>10% loss', 'rapid', 'with other symptoms']
    },
    relatedSymptoms: ['fatigue', 'loss-of-appetite', 'night-sweats', 'fever'],
    redFlagCombinations: [
      { symptoms: ['night-sweats', 'fatigue'], condition: 'cancer' },
      { symptoms: ['increased-thirst', 'frequent-urination'], condition: 'diabetes' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // RESPIRATORY SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'cough': {
    id: 'cough',
    name: 'Cough',
    category: 'respiratory',
    aliases: ['coughing', 'hacking', 'dry cough', 'wet cough', 'productive cough'],
    medicalTerms: ['tussis', 'productive cough', 'non-productive cough'],
    description: 'Sudden expulsion of air from lungs to clear airways',
    bodyRegions: ['throat', 'chest', 'lungs'],
    severityIndicators: {
      mild: ['occasional', 'dry', 'no other symptoms'],
      moderate: ['persistent', 'with phlegm', 'disrupts sleep'],
      severe: ['blood in sputum', 'with shortness of breath', 'with fever', 'persistent >3 weeks']
    },
    relatedSymptoms: ['shortness-breath', 'fever', 'chest-pain', 'sore-throat'],
    redFlagCombinations: [
      { symptoms: ['blood-in-sputum', 'weight-loss'], condition: 'lung-cancer' },
      { symptoms: ['fever', 'shortness-breath'], condition: 'pneumonia' }
    ]
  },
  
  'wheezing': {
    id: 'wheezing',
    name: 'Wheezing',
    category: 'respiratory',
    aliases: ['whistling breath', 'noisy breathing', 'wheeze'],
    medicalTerms: ['wheezing', 'sibilant rhonchi', 'bronchospasm sounds'],
    description: 'High-pitched whistling sound during breathing',
    bodyRegions: ['lungs', 'airways', 'chest'],
    severityIndicators: {
      mild: ['occasional', 'with exertion only', 'responds to inhaler'],
      moderate: ['frequent', 'at rest', 'limiting activity'],
      severe: ['constant', 'with severe shortness of breath', 'silent chest (no air movement)']
    },
    relatedSymptoms: ['shortness-breath', 'cough', 'chest-tightness'],
    redFlagCombinations: [
      { symptoms: ['severe-shortness-breath', 'cant-speak'], condition: 'severe-asthma' },
      { symptoms: ['swelling-throat'], condition: 'anaphylaxis' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // MUSCULOSKELETAL SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'joint-pain': {
    id: 'joint-pain',
    name: 'Joint Pain',
    category: 'musculoskeletal',
    aliases: ['arthralgia', 'joint ache', 'sore joints', 'joint stiffness'],
    medicalTerms: ['arthralgia', 'articular pain'],
    description: 'Pain in one or more joints',
    bodyRegions: ['joints', 'knees', 'hips', 'hands', 'shoulders'],
    severityIndicators: {
      mild: ['occasional', 'with activity', 'no swelling'],
      moderate: ['persistent', 'limits activity', 'some swelling'],
      severe: ['severe pain', 'significant swelling', 'red hot joint', 'cant use joint']
    },
    relatedSymptoms: ['joint-swelling', 'stiffness', 'limited-mobility', 'fatigue'],
    redFlagCombinations: [
      { symptoms: ['fever', 'red-hot-joint'], condition: 'septic-arthritis' },
      { symptoms: ['morning-stiffness', 'symmetric'], condition: 'rheumatoid-arthritis' }
    ]
  },
  
  'back-pain': {
    id: 'back-pain',
    name: 'Back Pain',
    category: 'musculoskeletal',
    aliases: ['backache', 'spine pain', 'lower back pain', 'lumbar pain'],
    medicalTerms: ['dorsalgia', 'lumbago', 'lumbar pain'],
    description: 'Pain in the back, commonly lower back',
    bodyRegions: ['back', 'spine', 'lumbar region'],
    severityIndicators: {
      mild: ['occasional ache', 'with activity', 'responds to rest'],
      moderate: ['persistent', 'limits activity', 'radiating to legs'],
      severe: ['severe constant pain', 'with numbness', 'with bladder/bowel changes', 'with weakness']
    },
    relatedSymptoms: ['leg-pain', 'numbness', 'weakness', 'stiffness'],
    redFlagCombinations: [
      { symptoms: ['bladder-dysfunction', 'saddle-anesthesia'], condition: 'cauda-equina-syndrome' },
      { symptoms: ['fever', 'weight-loss'], condition: 'spinal-infection-cancer' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // DERMATOLOGICAL SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'rash': {
    id: 'rash',
    name: 'Rash',
    category: 'dermatological',
    aliases: ['skin rash', 'eruption', 'skin breakout', 'hives', 'spots'],
    medicalTerms: ['exanthem', 'dermatitis', 'urticaria', 'eruption'],
    description: 'Change in skin color or texture',
    bodyRegions: ['skin', 'any body area'],
    severityIndicators: {
      mild: ['localized', 'not itchy', 'no other symptoms'],
      moderate: ['spreading', 'itchy', 'with mild discomfort'],
      severe: ['widespread', 'with fever', 'with blisters', 'with peeling']
    },
    relatedSymptoms: ['itching', 'fever', 'joint-pain', 'swelling'],
    redFlagCombinations: [
      { symptoms: ['fever', 'petechiae'], condition: 'meningococcemia' },
      { symptoms: ['mucosal-involvement', 'blistering'], condition: 'stevens-johnson-syndrome' }
    ]
  },
  
  'itching': {
    id: 'itching',
    name: 'Itching',
    category: 'dermatological',
    aliases: ['pruritus', 'itchy skin', 'scratching', 'skin irritation'],
    medicalTerms: ['pruritus', 'pruritis'],
    description: 'Uncomfortable sensation causing desire to scratch',
    bodyRegions: ['skin', 'any body area'],
    severityIndicators: {
      mild: ['occasional', 'localized', 'tolerable'],
      moderate: ['persistent', 'affecting sleep', 'causing scratching'],
      severe: ['intense', 'widespread', 'causing skin damage', 'with bleeding']
    },
    relatedSymptoms: ['rash', 'dry-skin', 'redness', 'swelling'],
    redFlagCombinations: [
      { symptoms: ['jaundice'], condition: 'liver-disease' },
      { symptoms: ['weight-loss', 'fatigue'], condition: 'lymphoma' }
    ]
  },
  
  // ══════════════════════════════════════════════════════════════════════════════
  // MENTAL HEALTH SYMPTOMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'anxiety': {
    id: 'anxiety',
    name: 'Anxiety',
    category: 'mental-health',
    aliases: ['worried', 'nervous', 'panic', 'fear', 'apprehension', 'stressed'],
    medicalTerms: ['anxiety', 'generalized anxiety', 'panic'],
    description: 'Excessive worry, nervousness, or fear',
    bodyRegions: ['mind', 'brain'],
    severityIndicators: {
      mild: ['occasional worry', 'manageable', 'no physical symptoms'],
      moderate: ['persistent worry', 'affecting daily life', 'some physical symptoms'],
      severe: ['panic attacks', 'unable to function', 'avoidance behaviors']
    },
    relatedSymptoms: ['palpitations', 'sweating', 'insomnia', 'trembling'],
    redFlagCombinations: [
      { symptoms: ['chest-pain', 'shortness-breath'], condition: 'panic-attack-vs-cardiac' },
      { symptoms: ['suicidal-thoughts'], condition: 'psychiatric-emergency' }
    ]
  },
  
  'depression': {
    id: 'depression',
    name: 'Depression',
    category: 'mental-health',
    aliases: ['sad', 'low mood', 'feeling down', 'hopeless', 'no interest', 'depressed'],
    medicalTerms: ['depression', 'major depressive disorder', 'dysthymia'],
    description: 'Persistent sadness, loss of interest, or hopelessness',
    bodyRegions: ['mind', 'brain'],
    severityIndicators: {
      mild: ['occasional sadness', 'can function', 'some enjoyment'],
      moderate: ['persistent low mood', 'affecting work/relationships', 'sleep/appetite changes'],
      severe: ['unable to function', 'hopelessness', 'suicidal thoughts']
    },
    relatedSymptoms: ['fatigue', 'sleep-problems', 'appetite-changes', 'concentration-difficulty'],
    redFlagCombinations: [
      { symptoms: ['suicidal-thoughts', 'plan'], condition: 'suicide-risk' },
      { symptoms: ['psychosis'], condition: 'severe-depression-with-psychosis' }
    ]
  },
  
  'suicidal-thoughts': {
    id: 'suicidal-thoughts',
    name: 'Suicidal Thoughts',
    category: 'mental-health',
    aliases: ['wanting to die', 'thoughts of self-harm', 'suicidal ideation', 'ending life'],
    medicalTerms: ['suicidal ideation', 'active suicidal ideation', 'passive suicidal ideation'],
    description: 'Thoughts about ending ones own life',
    bodyRegions: ['mind'],
    severityIndicators: {
      mild: ['passive thoughts', 'no plan', 'fleeting'],
      moderate: ['persistent thoughts', 'considering methods', 'no immediate plan'],
      severe: ['active plan', 'intent', 'means available', 'immediate risk']
    },
    relatedSymptoms: ['depression', 'hopelessness', 'anxiety', 'isolation'],
    redFlagCombinations: [
      { symptoms: ['active-plan', 'means'], condition: 'immediate-suicide-risk' }
    ]
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

export function getSymptomCount(): number {
  return Object.keys(SYMPTOMS_DATABASE).length;
}

export function findSymptomByAlias(query: string): SymptomDefinition | undefined {
  const lowercaseQuery = query.toLowerCase();
  
  for (const symptom of Object.values(SYMPTOMS_DATABASE)) {
    if (symptom.id.toLowerCase() === lowercaseQuery ||
        symptom.name.toLowerCase() === lowercaseQuery ||
        symptom.aliases.some(a => a.toLowerCase() === lowercaseQuery) ||
        symptom.medicalTerms.some(t => t.toLowerCase() === lowercaseQuery)) {
      return symptom;
    }
  }
  
  // Partial match
  for (const symptom of Object.values(SYMPTOMS_DATABASE)) {
    if (symptom.name.toLowerCase().includes(lowercaseQuery) ||
        symptom.aliases.some(a => a.toLowerCase().includes(lowercaseQuery))) {
      return symptom;
    }
  }
  
  return undefined;
}

export function getSymptomsByCategory(category: string): SymptomDefinition[] {
  return Object.values(SYMPTOMS_DATABASE).filter(s => s.category === category);
}

export function getRelatedSymptoms(symptomId: string): SymptomDefinition[] {
  const symptom = SYMPTOMS_DATABASE[symptomId];
  if (!symptom) return [];
  
  return symptom.relatedSymptoms
    .map(id => SYMPTOMS_DATABASE[id])
    .filter(s => s !== undefined);
}

export function checkRedFlagCombinations(symptomIds: string[]): { symptoms: string[]; condition: string }[] {
  const redFlags: { symptoms: string[]; condition: string }[] = [];
  const lowercaseIds = symptomIds.map(id => id.toLowerCase());
  
  for (const symptom of Object.values(SYMPTOMS_DATABASE)) {
    for (const combo of symptom.redFlagCombinations) {
      const allPresent = combo.symptoms.every(s => 
        lowercaseIds.some(id => id.includes(s.toLowerCase()) || s.toLowerCase().includes(id))
      );
      
      if (allPresent && !redFlags.find(rf => rf.condition === combo.condition)) {
        redFlags.push(combo);
      }
    }
  }
  
  return redFlags;
}
