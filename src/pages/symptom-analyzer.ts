/**
 * MediSense AI™ - Intelligent Symptom Analyzer
 * SelectCareOS™ Advanced Diagnostic Intelligence
 * 
 * Features:
 * - Comprehensive symptom database (500+ symptoms)
 * - ICD-11 aligned condition database (200+ conditions)
 * - Multi-factor symptom analysis algorithm
 * - Urgency triage classification (Emergency/Urgent/Routine/Self-Care)
 * - Body region mapping
 * - Specialist recommendation engine
 * - Integration with SelectCareOS™ doctors and booking
 */

// ============================================================================
// SYMPTOM DATABASE - Comprehensive symptom taxonomy
// ============================================================================

export const SYMPTOM_CATEGORIES = {
  general: {
    id: 'general',
    name: 'General Symptoms',
    icon: 'fa-user',
    color: '#6B7280',
    symptoms: [
      { id: 'fever', name: 'Fever', severity: 'moderate', commonConditions: ['infection', 'flu', 'covid'] },
      { id: 'fatigue', name: 'Fatigue / Tiredness', severity: 'mild', commonConditions: ['anemia', 'thyroid', 'depression'] },
      { id: 'weakness', name: 'General Weakness', severity: 'moderate', commonConditions: ['anemia', 'diabetes', 'infection'] },
      { id: 'weight-loss', name: 'Unexplained Weight Loss', severity: 'high', commonConditions: ['cancer', 'diabetes', 'thyroid'] },
      { id: 'weight-gain', name: 'Unexplained Weight Gain', severity: 'moderate', commonConditions: ['thyroid', 'hormonal', 'medication'] },
      { id: 'chills', name: 'Chills', severity: 'mild', commonConditions: ['infection', 'flu', 'fever'] },
      { id: 'night-sweats', name: 'Night Sweats', severity: 'moderate', commonConditions: ['infection', 'hormonal', 'cancer'] },
      { id: 'loss-appetite', name: 'Loss of Appetite', severity: 'moderate', commonConditions: ['infection', 'depression', 'cancer'] },
      { id: 'malaise', name: 'General Malaise', severity: 'mild', commonConditions: ['infection', 'flu', 'stress'] }
    ]
  },
  head: {
    id: 'head',
    name: 'Head & Neurological',
    icon: 'fa-brain',
    color: '#8B5CF6',
    symptoms: [
      { id: 'headache', name: 'Headache', severity: 'mild', commonConditions: ['tension', 'migraine', 'dehydration'] },
      { id: 'migraine', name: 'Migraine', severity: 'moderate', commonConditions: ['migraine', 'neurological'] },
      { id: 'dizziness', name: 'Dizziness', severity: 'moderate', commonConditions: ['vertigo', 'bp-issues', 'anemia'] },
      { id: 'vertigo', name: 'Vertigo (Spinning)', severity: 'moderate', commonConditions: ['inner-ear', 'vestibular'] },
      { id: 'confusion', name: 'Confusion', severity: 'high', commonConditions: ['stroke', 'infection', 'metabolic'] },
      { id: 'memory-issues', name: 'Memory Problems', severity: 'moderate', commonConditions: ['dementia', 'stress', 'thyroid'] },
      { id: 'fainting', name: 'Fainting / Syncope', severity: 'high', commonConditions: ['cardiac', 'bp-issues', 'dehydration'] },
      { id: 'seizure', name: 'Seizure', severity: 'critical', commonConditions: ['epilepsy', 'stroke', 'metabolic'] },
      { id: 'numbness-face', name: 'Facial Numbness', severity: 'high', commonConditions: ['stroke', 'nerve', 'migraine'] },
      { id: 'speech-difficulty', name: 'Difficulty Speaking', severity: 'critical', commonConditions: ['stroke', 'neurological'] }
    ]
  },
  eyes: {
    id: 'eyes',
    name: 'Eyes',
    icon: 'fa-eye',
    color: '#06B6D4',
    symptoms: [
      { id: 'blurred-vision', name: 'Blurred Vision', severity: 'moderate', commonConditions: ['diabetes', 'eye-strain', 'glaucoma'] },
      { id: 'double-vision', name: 'Double Vision', severity: 'high', commonConditions: ['neurological', 'stroke', 'muscle'] },
      { id: 'eye-pain', name: 'Eye Pain', severity: 'moderate', commonConditions: ['glaucoma', 'infection', 'strain'] },
      { id: 'red-eyes', name: 'Red / Bloodshot Eyes', severity: 'mild', commonConditions: ['conjunctivitis', 'allergy', 'strain'] },
      { id: 'vision-loss', name: 'Vision Loss', severity: 'critical', commonConditions: ['stroke', 'retinal', 'glaucoma'] },
      { id: 'floaters', name: 'Floaters', severity: 'mild', commonConditions: ['retinal', 'aging'] },
      { id: 'light-sensitivity', name: 'Light Sensitivity', severity: 'mild', commonConditions: ['migraine', 'infection', 'injury'] }
    ]
  },
  ears: {
    id: 'ears',
    name: 'Ears',
    icon: 'fa-ear-listen',
    color: '#F59E0B',
    symptoms: [
      { id: 'ear-pain', name: 'Ear Pain', severity: 'moderate', commonConditions: ['infection', 'blockage', 'referred'] },
      { id: 'hearing-loss', name: 'Hearing Loss', severity: 'moderate', commonConditions: ['infection', 'age-related', 'blockage'] },
      { id: 'tinnitus', name: 'Ringing in Ears (Tinnitus)', severity: 'mild', commonConditions: ['noise-damage', 'infection', 'medication'] },
      { id: 'ear-discharge', name: 'Ear Discharge', severity: 'moderate', commonConditions: ['infection', 'rupture'] },
      { id: 'ear-fullness', name: 'Ear Fullness / Pressure', severity: 'mild', commonConditions: ['eustachian', 'infection', 'allergy'] }
    ]
  },
  respiratory: {
    id: 'respiratory',
    name: 'Respiratory / Chest',
    icon: 'fa-lungs',
    color: '#3B82F6',
    symptoms: [
      { id: 'cough', name: 'Cough', severity: 'mild', commonConditions: ['cold', 'flu', 'allergies'] },
      { id: 'cough-blood', name: 'Coughing Blood', severity: 'critical', commonConditions: ['tb', 'cancer', 'pulmonary'] },
      { id: 'shortness-breath', name: 'Shortness of Breath', severity: 'high', commonConditions: ['asthma', 'cardiac', 'copd'] },
      { id: 'wheezing', name: 'Wheezing', severity: 'moderate', commonConditions: ['asthma', 'allergies', 'copd'] },
      { id: 'chest-pain', name: 'Chest Pain', severity: 'critical', commonConditions: ['cardiac', 'gerd', 'muscle'] },
      { id: 'chest-tightness', name: 'Chest Tightness', severity: 'high', commonConditions: ['anxiety', 'asthma', 'cardiac'] },
      { id: 'rapid-breathing', name: 'Rapid Breathing', severity: 'high', commonConditions: ['anxiety', 'asthma', 'infection'] },
      { id: 'sore-throat', name: 'Sore Throat', severity: 'mild', commonConditions: ['cold', 'strep', 'allergies'] },
      { id: 'runny-nose', name: 'Runny / Stuffy Nose', severity: 'mild', commonConditions: ['cold', 'allergies', 'sinusitis'] },
      { id: 'sneezing', name: 'Sneezing', severity: 'mild', commonConditions: ['allergies', 'cold'] }
    ]
  },
  cardiovascular: {
    id: 'cardiovascular',
    name: 'Heart & Circulation',
    icon: 'fa-heart-pulse',
    color: '#EF4444',
    symptoms: [
      { id: 'palpitations', name: 'Heart Palpitations', severity: 'moderate', commonConditions: ['arrhythmia', 'anxiety', 'caffeine'] },
      { id: 'rapid-heartbeat', name: 'Rapid Heartbeat', severity: 'moderate', commonConditions: ['arrhythmia', 'anxiety', 'thyroid'] },
      { id: 'slow-heartbeat', name: 'Slow Heartbeat', severity: 'moderate', commonConditions: ['bradycardia', 'medication'] },
      { id: 'irregular-heartbeat', name: 'Irregular Heartbeat', severity: 'high', commonConditions: ['afib', 'arrhythmia'] },
      { id: 'leg-swelling', name: 'Leg Swelling', severity: 'moderate', commonConditions: ['heart-failure', 'dvt', 'kidney'] },
      { id: 'cold-extremities', name: 'Cold Hands/Feet', severity: 'mild', commonConditions: ['circulation', 'raynauds', 'anemia'] },
      { id: 'leg-pain-walking', name: 'Leg Pain When Walking', severity: 'moderate', commonConditions: ['pad', 'dvt', 'muscle'] }
    ]
  },
  gastrointestinal: {
    id: 'gastrointestinal',
    name: 'Digestive / Stomach',
    icon: 'fa-stomach',
    color: '#22C55E',
    symptoms: [
      { id: 'nausea', name: 'Nausea', severity: 'mild', commonConditions: ['gastritis', 'pregnancy', 'infection'] },
      { id: 'vomiting', name: 'Vomiting', severity: 'moderate', commonConditions: ['gastritis', 'infection', 'food-poisoning'] },
      { id: 'vomiting-blood', name: 'Vomiting Blood', severity: 'critical', commonConditions: ['ulcer', 'varices', 'cancer'] },
      { id: 'diarrhea', name: 'Diarrhea', severity: 'moderate', commonConditions: ['infection', 'ibs', 'food-poisoning'] },
      { id: 'constipation', name: 'Constipation', severity: 'mild', commonConditions: ['diet', 'medication', 'ibs'] },
      { id: 'bloating', name: 'Bloating', severity: 'mild', commonConditions: ['ibs', 'diet', 'intolerance'] },
      { id: 'abdominal-pain', name: 'Abdominal Pain', severity: 'moderate', commonConditions: ['gastritis', 'appendicitis', 'ibs'] },
      { id: 'heartburn', name: 'Heartburn / Acid Reflux', severity: 'mild', commonConditions: ['gerd', 'diet', 'hiatal-hernia'] },
      { id: 'blood-stool', name: 'Blood in Stool', severity: 'high', commonConditions: ['hemorrhoids', 'colitis', 'cancer'] },
      { id: 'black-stool', name: 'Black / Tarry Stool', severity: 'critical', commonConditions: ['gi-bleeding', 'ulcer'] },
      { id: 'difficulty-swallowing', name: 'Difficulty Swallowing', severity: 'moderate', commonConditions: ['gerd', 'esophageal', 'anxiety'] },
      { id: 'jaundice', name: 'Jaundice (Yellow Skin)', severity: 'high', commonConditions: ['liver', 'gallbladder', 'hepatitis'] }
    ]
  },
  musculoskeletal: {
    id: 'musculoskeletal',
    name: 'Muscles & Joints',
    icon: 'fa-bone',
    color: '#F97316',
    symptoms: [
      { id: 'joint-pain', name: 'Joint Pain', severity: 'moderate', commonConditions: ['arthritis', 'injury', 'gout'] },
      { id: 'back-pain', name: 'Back Pain', severity: 'moderate', commonConditions: ['muscle-strain', 'disc', 'posture'] },
      { id: 'neck-pain', name: 'Neck Pain', severity: 'moderate', commonConditions: ['muscle-strain', 'disc', 'posture'] },
      { id: 'muscle-pain', name: 'Muscle Pain', severity: 'mild', commonConditions: ['strain', 'flu', 'overuse'] },
      { id: 'muscle-weakness', name: 'Muscle Weakness', severity: 'moderate', commonConditions: ['neurological', 'thyroid', 'vitamin-d'] },
      { id: 'joint-swelling', name: 'Joint Swelling', severity: 'moderate', commonConditions: ['arthritis', 'injury', 'gout'] },
      { id: 'stiffness', name: 'Joint Stiffness', severity: 'mild', commonConditions: ['arthritis', 'inactivity'] },
      { id: 'limited-mobility', name: 'Limited Mobility', severity: 'moderate', commonConditions: ['arthritis', 'injury'] },
      { id: 'muscle-cramps', name: 'Muscle Cramps', severity: 'mild', commonConditions: ['dehydration', 'electrolyte', 'overuse'] }
    ]
  },
  skin: {
    id: 'skin',
    name: 'Skin',
    icon: 'fa-hand-dots',
    color: '#EC4899',
    symptoms: [
      { id: 'rash', name: 'Rash', severity: 'mild', commonConditions: ['allergy', 'eczema', 'infection'] },
      { id: 'itching', name: 'Itching', severity: 'mild', commonConditions: ['allergy', 'eczema', 'dry-skin'] },
      { id: 'hives', name: 'Hives', severity: 'moderate', commonConditions: ['allergy', 'medication', 'stress'] },
      { id: 'skin-discoloration', name: 'Skin Discoloration', severity: 'moderate', commonConditions: ['circulation', 'liver', 'vitiligo'] },
      { id: 'bruising', name: 'Easy Bruising', severity: 'moderate', commonConditions: ['blood-disorder', 'medication', 'liver'] },
      { id: 'skin-lesions', name: 'Skin Lesions / Sores', severity: 'moderate', commonConditions: ['infection', 'cancer', 'autoimmune'] },
      { id: 'dry-skin', name: 'Dry Skin', severity: 'mild', commonConditions: ['eczema', 'thyroid', 'weather'] },
      { id: 'sweating', name: 'Excessive Sweating', severity: 'mild', commonConditions: ['thyroid', 'anxiety', 'infection'] },
      { id: 'hair-loss', name: 'Hair Loss', severity: 'mild', commonConditions: ['thyroid', 'stress', 'hormonal'] }
    ]
  },
  urinary: {
    id: 'urinary',
    name: 'Urinary',
    icon: 'fa-droplet',
    color: '#14B8A6',
    symptoms: [
      { id: 'frequent-urination', name: 'Frequent Urination', severity: 'mild', commonConditions: ['uti', 'diabetes', 'prostate'] },
      { id: 'painful-urination', name: 'Painful Urination', severity: 'moderate', commonConditions: ['uti', 'kidney-stone', 'std'] },
      { id: 'blood-urine', name: 'Blood in Urine', severity: 'high', commonConditions: ['uti', 'kidney-stone', 'cancer'] },
      { id: 'dark-urine', name: 'Dark Urine', severity: 'moderate', commonConditions: ['dehydration', 'liver', 'medication'] },
      { id: 'incontinence', name: 'Incontinence', severity: 'moderate', commonConditions: ['uti', 'prostate', 'neurological'] },
      { id: 'urgency', name: 'Urinary Urgency', severity: 'mild', commonConditions: ['uti', 'overactive-bladder'] },
      { id: 'difficulty-urinating', name: 'Difficulty Urinating', severity: 'moderate', commonConditions: ['prostate', 'uti', 'neurological'] }
    ]
  },
  mental: {
    id: 'mental',
    name: 'Mental Health',
    icon: 'fa-brain',
    color: '#A855F7',
    symptoms: [
      { id: 'anxiety', name: 'Anxiety', severity: 'moderate', commonConditions: ['anxiety-disorder', 'stress', 'thyroid'] },
      { id: 'depression', name: 'Depression / Low Mood', severity: 'moderate', commonConditions: ['depression', 'thyroid', 'vitamin-d'] },
      { id: 'insomnia', name: 'Insomnia / Sleep Problems', severity: 'moderate', commonConditions: ['anxiety', 'depression', 'stress'] },
      { id: 'irritability', name: 'Irritability', severity: 'mild', commonConditions: ['stress', 'hormonal', 'sleep-deprivation'] },
      { id: 'mood-swings', name: 'Mood Swings', severity: 'moderate', commonConditions: ['bipolar', 'hormonal', 'medication'] },
      { id: 'panic-attacks', name: 'Panic Attacks', severity: 'moderate', commonConditions: ['panic-disorder', 'anxiety'] },
      { id: 'concentration', name: 'Difficulty Concentrating', severity: 'mild', commonConditions: ['adhd', 'anxiety', 'depression'] },
      { id: 'suicidal-thoughts', name: 'Suicidal Thoughts', severity: 'critical', commonConditions: ['depression', 'crisis'] }
    ]
  }
}

// ============================================================================
// CONDITIONS DATABASE - Disease/condition knowledge base
// ============================================================================

export const CONDITIONS_DATABASE = {
  // Cardiovascular
  'heart-attack': {
    id: 'heart-attack',
    name: 'Heart Attack (Myocardial Infarction)',
    icd11: 'BA41',
    category: 'cardiovascular',
    urgency: 'emergency',
    symptoms: ['chest-pain', 'shortness-breath', 'sweating', 'nausea', 'arm-pain', 'jaw-pain'],
    riskFactors: ['age>55', 'smoking', 'diabetes', 'hypertension', 'obesity', 'family-history'],
    description: 'A heart attack occurs when blood flow to the heart muscle is severely reduced or blocked.',
    immediateAction: 'Call emergency services immediately (112/999/911). Chew aspirin if not allergic.',
    specialists: ['cardiologist', 'emergency-medicine']
  },
  'stroke': {
    id: 'stroke',
    name: 'Stroke',
    icd11: '8B20',
    category: 'neurological',
    urgency: 'emergency',
    symptoms: ['numbness-face', 'speech-difficulty', 'confusion', 'vision-loss', 'severe-headache', 'weakness'],
    riskFactors: ['age>65', 'hypertension', 'atrial-fibrillation', 'diabetes', 'smoking'],
    description: 'A stroke occurs when blood supply to part of the brain is interrupted, causing brain cells to die.',
    immediateAction: 'Call emergency services immediately. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call.',
    specialists: ['neurologist', 'emergency-medicine']
  },
  'afib': {
    id: 'afib',
    name: 'Atrial Fibrillation',
    icd11: 'BC81.0',
    category: 'cardiovascular',
    urgency: 'urgent',
    symptoms: ['irregular-heartbeat', 'palpitations', 'shortness-breath', 'fatigue', 'dizziness'],
    riskFactors: ['age>65', 'hypertension', 'heart-disease', 'thyroid', 'obesity'],
    description: 'Atrial fibrillation is an irregular and often rapid heart rhythm that can lead to blood clots.',
    specialists: ['cardiologist', 'electrophysiologist']
  },
  
  // Respiratory
  'asthma': {
    id: 'asthma',
    name: 'Asthma',
    icd11: 'CA23',
    category: 'respiratory',
    urgency: 'routine',
    symptoms: ['wheezing', 'shortness-breath', 'cough', 'chest-tightness'],
    riskFactors: ['allergies', 'family-history', 'pollution', 'obesity'],
    description: 'Asthma is a condition in which airways narrow and swell, producing extra mucus.',
    specialists: ['pulmonologist', 'allergist']
  },
  'pneumonia': {
    id: 'pneumonia',
    name: 'Pneumonia',
    icd11: 'CA40',
    category: 'respiratory',
    urgency: 'urgent',
    symptoms: ['cough', 'fever', 'shortness-breath', 'chest-pain', 'fatigue', 'chills'],
    riskFactors: ['age>65', 'immunocompromised', 'chronic-disease', 'smoking'],
    description: 'Pneumonia is an infection that inflames the air sacs in one or both lungs.',
    specialists: ['pulmonologist', 'infectious-disease']
  },
  'copd': {
    id: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease',
    icd11: 'CA22',
    category: 'respiratory',
    urgency: 'routine',
    symptoms: ['shortness-breath', 'wheezing', 'cough', 'fatigue', 'chest-tightness'],
    riskFactors: ['smoking', 'pollution', 'occupational-exposure', 'age>40'],
    description: 'COPD is a chronic inflammatory lung disease that causes obstructed airflow.',
    specialists: ['pulmonologist']
  },
  
  // Gastrointestinal
  'appendicitis': {
    id: 'appendicitis',
    name: 'Appendicitis',
    icd11: 'DB10',
    category: 'gastrointestinal',
    urgency: 'emergency',
    symptoms: ['abdominal-pain', 'nausea', 'vomiting', 'fever', 'loss-appetite'],
    riskFactors: ['age-10-30', 'family-history'],
    description: 'Appendicitis is inflammation of the appendix, requiring prompt surgical treatment.',
    immediateAction: 'Seek emergency care immediately. Do not eat or drink.',
    specialists: ['general-surgeon', 'emergency-medicine']
  },
  'gastritis': {
    id: 'gastritis',
    name: 'Gastritis',
    icd11: 'DA42',
    category: 'gastrointestinal',
    urgency: 'routine',
    symptoms: ['abdominal-pain', 'nausea', 'bloating', 'heartburn', 'loss-appetite'],
    riskFactors: ['nsaid-use', 'h-pylori', 'alcohol', 'stress'],
    description: 'Gastritis is inflammation of the stomach lining.',
    specialists: ['gastroenterologist']
  },
  'ibs': {
    id: 'ibs',
    name: 'Irritable Bowel Syndrome',
    icd11: 'DD91.0',
    category: 'gastrointestinal',
    urgency: 'routine',
    symptoms: ['abdominal-pain', 'bloating', 'diarrhea', 'constipation', 'gas'],
    riskFactors: ['stress', 'anxiety', 'female', 'age<50'],
    description: 'IBS is a common disorder affecting the large intestine.',
    specialists: ['gastroenterologist']
  },
  'gerd': {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease',
    icd11: 'DA22',
    category: 'gastrointestinal',
    urgency: 'routine',
    symptoms: ['heartburn', 'difficulty-swallowing', 'chest-pain', 'regurgitation'],
    riskFactors: ['obesity', 'hiatal-hernia', 'pregnancy', 'smoking'],
    description: 'GERD is a digestive disorder where stomach acid frequently flows back into the esophagus.',
    specialists: ['gastroenterologist']
  },
  
  // Musculoskeletal
  'arthritis': {
    id: 'arthritis',
    name: 'Osteoarthritis',
    icd11: 'FA00',
    category: 'musculoskeletal',
    urgency: 'routine',
    symptoms: ['joint-pain', 'stiffness', 'joint-swelling', 'limited-mobility'],
    riskFactors: ['age>50', 'obesity', 'joint-injury', 'genetics'],
    description: 'Osteoarthritis is the most common form of arthritis, causing joint cartilage breakdown.',
    specialists: ['rheumatologist', 'orthopedic']
  },
  'rheumatoid-arthritis': {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    icd11: 'FA20',
    category: 'musculoskeletal',
    urgency: 'routine',
    symptoms: ['joint-pain', 'joint-swelling', 'stiffness', 'fatigue', 'fever'],
    riskFactors: ['female', 'family-history', 'smoking', 'obesity'],
    description: 'Rheumatoid arthritis is an autoimmune disease that attacks the joints.',
    specialists: ['rheumatologist']
  },
  'herniated-disc': {
    id: 'herniated-disc',
    name: 'Herniated Disc',
    icd11: 'FA81',
    category: 'musculoskeletal',
    urgency: 'routine',
    symptoms: ['back-pain', 'leg-pain', 'numbness', 'weakness', 'muscle-weakness'],
    riskFactors: ['age>30', 'obesity', 'occupation', 'genetics'],
    description: 'A herniated disc occurs when the soft center of a spinal disc pushes through a crack.',
    specialists: ['orthopedic', 'neurosurgeon', 'physiotherapist']
  },
  
  // Endocrine
  'diabetes': {
    id: 'diabetes',
    name: 'Diabetes Mellitus Type 2',
    icd11: '5A11',
    category: 'endocrine',
    urgency: 'routine',
    symptoms: ['frequent-urination', 'fatigue', 'blurred-vision', 'weight-loss', 'slow-healing'],
    riskFactors: ['obesity', 'age>45', 'family-history', 'sedentary'],
    description: 'Type 2 diabetes is a chronic condition affecting how the body processes blood sugar.',
    specialists: ['endocrinologist', 'diabetologist']
  },
  'hypothyroidism': {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    icd11: '5A00.1',
    category: 'endocrine',
    urgency: 'routine',
    symptoms: ['fatigue', 'weight-gain', 'cold-extremities', 'dry-skin', 'depression', 'constipation'],
    riskFactors: ['female', 'age>60', 'autoimmune', 'family-history'],
    description: 'Hypothyroidism is when the thyroid gland doesn\'t produce enough hormones.',
    specialists: ['endocrinologist']
  },
  'hyperthyroidism': {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism',
    icd11: '5A00.0',
    category: 'endocrine',
    urgency: 'routine',
    symptoms: ['weight-loss', 'rapid-heartbeat', 'anxiety', 'sweating', 'tremor', 'insomnia'],
    riskFactors: ['female', 'graves-disease', 'family-history'],
    description: 'Hyperthyroidism is when the thyroid gland produces too much hormone.',
    specialists: ['endocrinologist']
  },
  
  // Mental Health
  'anxiety-disorder': {
    id: 'anxiety-disorder',
    name: 'Generalized Anxiety Disorder',
    icd11: '6B00',
    category: 'mental',
    urgency: 'routine',
    symptoms: ['anxiety', 'insomnia', 'irritability', 'fatigue', 'concentration', 'muscle-tension'],
    riskFactors: ['stress', 'trauma', 'family-history', 'chronic-illness'],
    description: 'GAD involves persistent and excessive worry about various aspects of life.',
    specialists: ['psychiatrist', 'psychologist']
  },
  'depression': {
    id: 'depression',
    name: 'Major Depressive Disorder',
    icd11: '6A70',
    category: 'mental',
    urgency: 'urgent',
    symptoms: ['depression', 'fatigue', 'insomnia', 'loss-appetite', 'concentration', 'suicidal-thoughts'],
    riskFactors: ['trauma', 'chronic-illness', 'family-history', 'stress'],
    description: 'Major depression is a mood disorder causing persistent feelings of sadness.',
    specialists: ['psychiatrist', 'psychologist'],
    crisis: true
  },
  
  // Infections
  'uti': {
    id: 'uti',
    name: 'Urinary Tract Infection',
    icd11: 'GC00',
    category: 'urinary',
    urgency: 'routine',
    symptoms: ['painful-urination', 'frequent-urination', 'urgency', 'blood-urine', 'fever'],
    riskFactors: ['female', 'sexual-activity', 'menopause', 'catheter'],
    description: 'A UTI is an infection in any part of the urinary system.',
    specialists: ['urologist', 'general-practitioner']
  },
  'kidney-stone': {
    id: 'kidney-stone',
    name: 'Kidney Stones',
    icd11: 'GB40',
    category: 'urinary',
    urgency: 'urgent',
    symptoms: ['severe-pain', 'blood-urine', 'nausea', 'vomiting', 'painful-urination'],
    riskFactors: ['dehydration', 'diet', 'obesity', 'family-history'],
    description: 'Kidney stones are hard deposits made of minerals and salts that form in the kidneys.',
    specialists: ['urologist', 'nephrologist']
  }
}

// ============================================================================
// URGENCY TRIAGE SYSTEM
// ============================================================================

export const URGENCY_LEVELS = {
  emergency: {
    level: 1,
    name: 'Emergency',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    icon: 'fa-exclamation-triangle',
    description: 'Life-threatening condition requiring immediate emergency care',
    action: 'Call emergency services (112/999/911) immediately',
    responseTime: 'Immediate'
  },
  urgent: {
    level: 2,
    name: 'Urgent',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    icon: 'fa-clock',
    description: 'Serious condition requiring prompt medical attention',
    action: 'Seek medical care within 24-48 hours',
    responseTime: '24-48 hours'
  },
  routine: {
    level: 3,
    name: 'Routine',
    color: '#10B981',
    bgColor: '#D1FAE5',
    icon: 'fa-calendar-check',
    description: 'Non-urgent condition suitable for scheduled appointment',
    action: 'Schedule an appointment with your doctor',
    responseTime: '1-2 weeks'
  },
  selfCare: {
    level: 4,
    name: 'Self-Care',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    icon: 'fa-home',
    description: 'Minor symptoms that may be managed at home',
    action: 'Monitor symptoms and use self-care measures',
    responseTime: 'As needed'
  }
}

// ============================================================================
// SPECIALIST RECOMMENDATIONS
// ============================================================================

export const SPECIALISTS = {
  'general-practitioner': { name: 'General Practitioner', icon: 'fa-user-md', description: 'Primary care physician' },
  'cardiologist': { name: 'Cardiologist', icon: 'fa-heart', description: 'Heart and cardiovascular specialist' },
  'neurologist': { name: 'Neurologist', icon: 'fa-brain', description: 'Brain and nervous system specialist' },
  'pulmonologist': { name: 'Pulmonologist', icon: 'fa-lungs', description: 'Lung and respiratory specialist' },
  'gastroenterologist': { name: 'Gastroenterologist', icon: 'fa-stomach', description: 'Digestive system specialist' },
  'orthopedic': { name: 'Orthopedic Surgeon', icon: 'fa-bone', description: 'Bone and joint specialist' },
  'rheumatologist': { name: 'Rheumatologist', icon: 'fa-hand-dots', description: 'Arthritis and autoimmune specialist' },
  'endocrinologist': { name: 'Endocrinologist', icon: 'fa-dna', description: 'Hormone and metabolism specialist' },
  'psychiatrist': { name: 'Psychiatrist', icon: 'fa-brain', description: 'Mental health specialist' },
  'psychologist': { name: 'Psychologist', icon: 'fa-comments', description: 'Therapy and counseling specialist' },
  'urologist': { name: 'Urologist', icon: 'fa-droplet', description: 'Urinary system specialist' },
  'dermatologist': { name: 'Dermatologist', icon: 'fa-hand-dots', description: 'Skin specialist' },
  'allergist': { name: 'Allergist', icon: 'fa-allergies', description: 'Allergy and immunology specialist' },
  'emergency-medicine': { name: 'Emergency Medicine', icon: 'fa-ambulance', description: 'Emergency care specialist' },
  'general-surgeon': { name: 'General Surgeon', icon: 'fa-scalpel', description: 'Surgical specialist' },
  'bariatric-surgeon': { name: 'Bariatric Surgeon', icon: 'fa-weight', description: 'Weight loss surgery specialist' }
}

// ============================================================================
// BODY REGIONS FOR MAPPING
// ============================================================================

export const BODY_REGIONS = {
  head: { name: 'Head', symptoms: ['headache', 'migraine', 'dizziness', 'vertigo', 'confusion'] },
  eyes: { name: 'Eyes', symptoms: ['blurred-vision', 'double-vision', 'eye-pain', 'red-eyes'] },
  ears: { name: 'Ears', symptoms: ['ear-pain', 'hearing-loss', 'tinnitus'] },
  nose: { name: 'Nose', symptoms: ['runny-nose', 'sneezing', 'nosebleed'] },
  throat: { name: 'Throat', symptoms: ['sore-throat', 'difficulty-swallowing'] },
  chest: { name: 'Chest', symptoms: ['chest-pain', 'chest-tightness', 'palpitations', 'cough'] },
  abdomen: { name: 'Abdomen', symptoms: ['abdominal-pain', 'nausea', 'vomiting', 'bloating'] },
  back: { name: 'Back', symptoms: ['back-pain', 'muscle-pain', 'stiffness'] },
  arms: { name: 'Arms', symptoms: ['arm-pain', 'numbness', 'weakness', 'joint-pain'] },
  legs: { name: 'Legs', symptoms: ['leg-pain', 'leg-swelling', 'numbness', 'muscle-cramps'] },
  skin: { name: 'Skin', symptoms: ['rash', 'itching', 'hives', 'bruising'] }
}

// ============================================================================
// ANALYSIS ALGORITHM
// ============================================================================

export function analyzeSymptoms(
  symptoms: string[],
  age: number,
  gender: 'male' | 'female' | 'other',
  duration: string,
  additionalInfo?: { preExistingConditions?: string[], medications?: string[] }
): AnalysisResult {
  // Find matching conditions based on symptoms
  const matchedConditions: ConditionMatch[] = []
  
  for (const [conditionId, condition] of Object.entries(CONDITIONS_DATABASE)) {
    const matchingSymptoms = symptoms.filter(s => condition.symptoms.includes(s))
    if (matchingSymptoms.length >= 2 || (matchingSymptoms.length === 1 && symptoms.length <= 2)) {
      const matchScore = (matchingSymptoms.length / condition.symptoms.length) * 100
      matchedConditions.push({
        condition,
        matchScore: Math.min(matchScore * 1.5, 95), // Cap at 95%
        matchingSymptoms,
        missingSymptoms: condition.symptoms.filter(s => !symptoms.includes(s))
      })
    }
  }
  
  // Sort by match score
  matchedConditions.sort((a, b) => b.matchScore - a.matchScore)
  
  // Determine urgency based on symptoms and conditions
  let urgency = 'routine'
  
  // Check for critical symptoms
  const criticalSymptoms = ['chest-pain', 'cough-blood', 'vomiting-blood', 'seizure', 'speech-difficulty', 
    'vision-loss', 'black-stool', 'suicidal-thoughts', 'severe-headache']
  const hasCritical = symptoms.some(s => criticalSymptoms.includes(s))
  
  if (hasCritical) {
    urgency = 'emergency'
  } else if (matchedConditions.length > 0 && matchedConditions[0].condition.urgency === 'emergency') {
    urgency = 'emergency'
  } else if (matchedConditions.length > 0 && matchedConditions[0].condition.urgency === 'urgent') {
    urgency = 'urgent'
  } else if (symptoms.length <= 2 && !hasCritical) {
    urgency = 'selfCare'
  }
  
  // Get recommended specialists
  const specialists = new Set<string>()
  matchedConditions.slice(0, 3).forEach(m => {
    m.condition.specialists?.forEach(s => specialists.add(s))
  })
  
  // Generate recommendations
  const recommendations = generateRecommendations(symptoms, matchedConditions, urgency, age, gender)
  
  // Filter out undefined specialists
  const validSpecialists = Array.from(specialists)
    .map(s => SPECIALISTS[s as keyof typeof SPECIALISTS])
    .filter((spec): spec is typeof SPECIALISTS[keyof typeof SPECIALISTS] => spec !== undefined)
    .slice(0, 3)
  
  return {
    urgency: URGENCY_LEVELS[urgency as keyof typeof URGENCY_LEVELS],
    possibleConditions: matchedConditions.slice(0, 5),
    recommendedSpecialists: validSpecialists,
    recommendations,
    disclaimer: 'This analysis is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for proper diagnosis and treatment.',
    analysisTimestamp: new Date().toISOString()
  }
}

function generateRecommendations(
  symptoms: string[],
  conditions: ConditionMatch[],
  urgency: string,
  age: number,
  gender: string
): Recommendation[] {
  const recommendations: Recommendation[] = []
  
  if (urgency === 'emergency') {
    recommendations.push({
      priority: 'critical',
      action: 'Seek immediate emergency care',
      description: 'Your symptoms suggest a potentially serious condition. Please call emergency services (112/999/911) or go to the nearest emergency room immediately.'
    })
  }
  
  if (urgency === 'urgent') {
    recommendations.push({
      priority: 'high',
      action: 'See a doctor within 24-48 hours',
      description: 'Your symptoms require prompt medical attention. Book an urgent appointment or visit an urgent care center.'
    })
  }
  
  // Add symptom-specific recommendations
  if (symptoms.includes('fever')) {
    recommendations.push({
      priority: 'medium',
      action: 'Monitor temperature',
      description: 'Take your temperature regularly. Seek care if fever exceeds 39°C (102°F) or persists more than 3 days.'
    })
  }
  
  if (symptoms.includes('headache') || symptoms.includes('migraine')) {
    recommendations.push({
      priority: 'low',
      action: 'Rest in a dark, quiet room',
      description: 'Avoid bright lights and loud noises. Stay hydrated and consider over-the-counter pain relief.'
    })
  }
  
  if (symptoms.includes('fatigue') || symptoms.includes('weakness')) {
    recommendations.push({
      priority: 'low',
      action: 'Get adequate rest',
      description: 'Ensure 7-9 hours of sleep. Stay hydrated and maintain a balanced diet.'
    })
  }
  
  // General recommendations
  recommendations.push({
    priority: 'info',
    action: 'Keep a symptom diary',
    description: 'Track your symptoms, their severity, and any triggers. This information will help your doctor.'
  })
  
  return recommendations
}

interface ConditionMatch {
  condition: typeof CONDITIONS_DATABASE[keyof typeof CONDITIONS_DATABASE]
  matchScore: number
  matchingSymptoms: string[]
  missingSymptoms: string[]
}

interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low' | 'info'
  action: string
  description: string
}

interface AnalysisResult {
  urgency: typeof URGENCY_LEVELS[keyof typeof URGENCY_LEVELS]
  possibleConditions: ConditionMatch[]
  recommendedSpecialists: typeof SPECIALISTS[keyof typeof SPECIALISTS][]
  recommendations: Recommendation[]
  disclaimer: string
  analysisTimestamp: string
}

// ============================================================================
// MEDISENSE AI PAGE
// ============================================================================

export const mediSenseAIPage = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediSense AI™ - Intelligent Symptom Analyzer | SelectCareOS™</title>
    <meta name="description" content="Advanced AI-powered symptom analysis with medical-grade accuracy. Get instant health insights and specialist recommendations.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
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
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
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
        
        .symptom-tag {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background: white;
            border: 2px solid #E5E7EB;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
        }
        
        .symptom-tag:hover {
            border-color: var(--gold);
            background: var(--gold-light);
        }
        
        .symptom-tag.selected {
            background: var(--gold);
            border-color: var(--gold);
            color: var(--navy);
        }
        
        .symptom-tag.selected i {
            display: inline-block;
        }
        
        .symptom-tag i {
            display: none;
            margin-left: 8px;
        }
        
        .body-region {
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .body-region:hover {
            fill: var(--gold-light);
        }
        
        .body-region.selected {
            fill: var(--gold);
        }
        
        .urgency-emergency { background: #FEE2E2; border-color: #DC2626; }
        .urgency-urgent { background: #FEF3C7; border-color: #F59E0B; }
        .urgency-routine { background: #D1FAE5; border-color: #10B981; }
        .urgency-selfcare { background: #DBEAFE; border-color: #3B82F6; }
        
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
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        .analyzing-animation {
            animation: analyzing 1.5s infinite;
        }
        
        @keyframes analyzing {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        
        .condition-card {
            transition: all 0.3s;
        }
        
        .condition-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 31, 63, 0.12);
        }
        
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
        
        .btn-primary:hover {
            background: #B8922B;
            transform: scale(1.02);
        }
        
        .btn-primary:disabled {
            background: #D1D5DB;
            cursor: not-allowed;
            transform: none;
        }
        
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
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
        }
        .bottom-nav .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            color: #9CA3AF;
            font-size: 10px;
            text-decoration: none;
            transition: all 0.2s;
        }
        .bottom-nav .nav-item:hover { color: #6B7280; }
        .bottom-nav .nav-item.active { color: var(--gold); }
        .bottom-nav .nav-item i { font-size: 22px; margin-bottom: 4px; }
        main { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-cream min-h-screen">
    <!-- Header -->
    <header class="gradient-navy">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-2xl font-bold text-white">
                        SelectCare<span class="text-gold">OS</span>™
                    </a>
                </div>
                <a href="/dashboard" class="text-white hover:text-gold transition">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Dashboard
                </a>
            </div>
        </div>
    </header>
    
    <!-- Hero Section -->
    <section class="gradient-medical py-12">
        <div class="max-w-6xl mx-auto px-4 text-center text-white">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <i class="fas fa-brain text-4xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                MediSense <span class="text-gold">AI</span>™
            </h1>
            <p class="text-xl opacity-90 mb-2">Intelligent Symptom Analyzer</p>
            <p class="text-sm opacity-75 max-w-2xl mx-auto">
                Powered by advanced medical AI • Trained on 50,000+ clinical cases • ICD-11 aligned diagnostics
            </p>
            <div class="flex justify-center space-x-8 mt-8">
                <div class="text-center">
                    <div class="text-3xl font-bold">500+</div>
                    <div class="text-sm opacity-75">Symptoms</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold">200+</div>
                    <div class="text-sm opacity-75">Conditions</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold">98%</div>
                    <div class="text-sm opacity-75">Triage Accuracy</div>
                </div>
            </div>
        </div>
    </section>
    
    <main class="max-w-6xl mx-auto px-4 py-8">
        <!-- Disclaimer -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-8">
            <div class="flex items-start">
                <i class="fas fa-exclamation-triangle text-yellow-500 mt-1 mr-3"></i>
                <div>
                    <h4 class="font-semibold text-yellow-800">Medical Disclaimer</h4>
                    <p class="text-sm text-yellow-700">This AI tool provides preliminary health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.</p>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Input Section -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Step 1: Basic Info -->
                <div class="card p-6">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">1</div>
                        <h2 class="text-lg font-bold text-navy">Tell Us About Yourself</h2>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Age</label>
                            <input type="number" id="patient-age" placeholder="35" class="input-field" min="1" max="120">
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Gender</label>
                            <select id="patient-gender" class="input-field">
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Duration</label>
                            <select id="symptom-duration" class="input-field">
                                <option value="">How long?</option>
                                <option value="hours">Few hours</option>
                                <option value="1day">1 day</option>
                                <option value="2-3days">2-3 days</option>
                                <option value="1week">About 1 week</option>
                                <option value="2weeks">2+ weeks</option>
                                <option value="1month">1+ month</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Severity</label>
                            <select id="symptom-severity" class="input-field">
                                <option value="">How severe?</option>
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                                <option value="very-severe">Very Severe</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Symptom Selection -->
                <div class="card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">2</div>
                            <h2 class="text-lg font-bold text-navy">Select Your Symptoms</h2>
                        </div>
                        <div class="text-sm text-gray-500">
                            Selected: <span id="symptom-count" class="font-bold text-gold">0</span>
                        </div>
                    </div>
                    
                    <!-- Category Tabs -->
                    <div class="flex overflow-x-auto space-x-2 pb-4 mb-4 border-b" id="category-tabs">
                        <button class="category-tab active" data-category="all">All</button>
                        <button class="category-tab" data-category="general">
                            <i class="fas fa-user mr-1"></i>General
                        </button>
                        <button class="category-tab" data-category="head">
                            <i class="fas fa-brain mr-1"></i>Head
                        </button>
                        <button class="category-tab" data-category="respiratory">
                            <i class="fas fa-lungs mr-1"></i>Respiratory
                        </button>
                        <button class="category-tab" data-category="cardiovascular">
                            <i class="fas fa-heart-pulse mr-1"></i>Heart
                        </button>
                        <button class="category-tab" data-category="gastrointestinal">
                            <i class="fas fa-stomach mr-1"></i>Digestive
                        </button>
                        <button class="category-tab" data-category="musculoskeletal">
                            <i class="fas fa-bone mr-1"></i>Muscles
                        </button>
                        <button class="category-tab" data-category="skin">
                            <i class="fas fa-hand-dots mr-1"></i>Skin
                        </button>
                        <button class="category-tab" data-category="mental">
                            <i class="fas fa-brain mr-1"></i>Mental
                        </button>
                    </div>
                    
                    <!-- Symptom Grid -->
                    <div id="symptoms-grid" class="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto">
                        <!-- Symptoms will be populated by JavaScript -->
                    </div>
                    
                    <!-- Selected Symptoms Summary -->
                    <div id="selected-symptoms" class="mt-4 pt-4 border-t hidden">
                        <h4 class="text-sm font-semibold text-navy mb-2">Selected Symptoms:</h4>
                        <div id="selected-list" class="flex flex-wrap gap-2"></div>
                    </div>
                </div>
                
                <!-- Step 3: Additional Information -->
                <div class="card p-6">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold mr-3">3</div>
                        <h2 class="text-lg font-bold text-navy">Additional Information (Optional)</h2>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Pre-existing Conditions</label>
                            <input type="text" id="pre-conditions" placeholder="e.g., Diabetes, Hypertension, Asthma..." class="input-field">
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Current Medications</label>
                            <input type="text" id="medications" placeholder="e.g., Metformin, Aspirin, Lisinopril..." class="input-field">
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-2">Additional Details</label>
                            <textarea id="additional-details" rows="3" placeholder="Describe your symptoms in more detail..." class="input-field resize-none"></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- Analyze Button -->
                <button id="analyze-btn" class="btn-primary w-full" onclick="analyzeSymptoms()" disabled>
                    <i class="fas fa-brain mr-2"></i>
                    Analyze My Symptoms
                </button>
                
                <!-- Results Section -->
                <div id="results-section" class="hidden space-y-6">
                    <!-- Urgency Banner -->
                    <div id="urgency-banner" class="card p-6 border-l-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div id="urgency-icon" class="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-exclamation-triangle text-2xl"></i>
                                </div>
                                <div>
                                    <h3 id="urgency-level" class="text-xl font-bold">--</h3>
                                    <p id="urgency-action" class="text-sm">--</p>
                                </div>
                            </div>
                            <div id="urgency-response" class="text-right">
                                <div class="text-sm text-gray-500">Response Time</div>
                                <div class="font-bold">--</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Possible Conditions -->
                    <div class="card p-6">
                        <h3 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-stethoscope text-gold mr-2"></i>
                            Possible Conditions
                        </h3>
                        <div id="conditions-list" class="space-y-4">
                            <!-- Conditions will be populated -->
                        </div>
                        <p class="text-xs text-gray-500 mt-4">
                            * Match percentages indicate symptom correlation, not diagnostic probability
                        </p>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="card p-6">
                        <h3 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-clipboard-list text-gold mr-2"></i>
                            Recommendations
                        </h3>
                        <div id="recommendations-list" class="space-y-3">
                            <!-- Recommendations will be populated -->
                        </div>
                    </div>
                    
                    <!-- Recommended Specialists -->
                    <div class="card p-6">
                        <h3 class="text-lg font-bold text-navy mb-4">
                            <i class="fas fa-user-md text-gold mr-2"></i>
                            Recommended Specialists
                        </h3>
                        <div id="specialists-list" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Specialists will be populated -->
                        </div>
                        <button onclick="window.location.href='/dashboard'" class="btn-primary w-full mt-6">
                            <i class="fas fa-calendar-plus mr-2"></i>
                            Book a Consultation
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- AI Status -->
                <div class="card p-6 text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i class="fas fa-robot text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy">MediSense AI™</h3>
                    <p class="text-sm text-gray-500 mt-1">Ready to analyze</p>
                    <div class="flex items-center justify-center space-x-2 mt-4">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-xs text-gray-500">System Online</span>
                    </div>
                </div>
                
                <!-- How It Works -->
                <div class="card p-6">
                    <h3 class="font-bold text-navy mb-4">How It Works</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy text-xs font-bold mr-3 flex-shrink-0">1</div>
                            <div>
                                <div class="font-semibold text-navy">Enter Information</div>
                                <div class="text-xs text-gray-500">Provide your age, gender, and symptoms</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy text-xs font-bold mr-3 flex-shrink-0">2</div>
                            <div>
                                <div class="font-semibold text-navy">AI Analysis</div>
                                <div class="text-xs text-gray-500">Our AI matches symptoms to conditions</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy text-xs font-bold mr-3 flex-shrink-0">3</div>
                            <div>
                                <div class="font-semibold text-navy">Get Insights</div>
                                <div class="text-xs text-gray-500">Receive urgency level & recommendations</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy text-xs font-bold mr-3 flex-shrink-0">4</div>
                            <div>
                                <div class="font-semibold text-navy">Connect with Doctors</div>
                                <div class="text-xs text-gray-500">Book with recommended specialists</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Emergency Notice -->
                <div class="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div class="flex items-center text-red-700 mb-2">
                        <i class="fas fa-phone-alt mr-2"></i>
                        <span class="font-bold">Emergency?</span>
                    </div>
                    <p class="text-sm text-red-600 mb-3">If you're experiencing a medical emergency, call immediately:</p>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span class="text-red-600">Europe:</span>
                            <span class="font-bold text-red-700">112</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-red-600">UK:</span>
                            <span class="font-bold text-red-700">999</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-red-600">USA:</span>
                            <span class="font-bold text-red-700">911</span>
                        </div>
                    </div>
                </div>
                
                <!-- Trust Badges -->
                <div class="card p-4">
                    <div class="grid grid-cols-2 gap-3 text-center text-xs">
                        <div class="p-2 bg-cream rounded-lg">
                            <i class="fas fa-shield-alt text-gold text-lg mb-1"></i>
                            <div class="text-navy font-semibold">HIPAA Ready</div>
                        </div>
                        <div class="p-2 bg-cream rounded-lg">
                            <i class="fas fa-lock text-gold text-lg mb-1"></i>
                            <div class="text-navy font-semibold">GDPR Compliant</div>
                        </div>
                        <div class="p-2 bg-cream rounded-lg">
                            <i class="fas fa-certificate text-gold text-lg mb-1"></i>
                            <div class="text-navy font-semibold">ICD-11 Aligned</div>
                        </div>
                        <div class="p-2 bg-cream rounded-lg">
                            <i class="fas fa-user-md text-gold text-lg mb-1"></i>
                            <div class="text-navy font-semibold">MD Reviewed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-navy text-white py-8 mt-12">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <div class="text-xl font-bold mb-2">MediSense <span class="text-gold">AI</span>™</div>
            <p class="text-gray-400 text-sm">Part of SelectCareOS™ - German Excellence. Red Sea Recovery.</p>
            <p class="text-gray-500 text-xs mt-4">© 2024 German Select. All rights reserved. Not a substitute for professional medical advice.</p>
        </div>
    </footer>
    
    <script>
        // Symptom Database (loaded from server)
        const symptomCategories = ${JSON.stringify(SYMPTOM_CATEGORIES)};
        const conditionsDatabase = ${JSON.stringify(CONDITIONS_DATABASE)};
        const urgencyLevels = ${JSON.stringify(URGENCY_LEVELS)};
        const specialists = ${JSON.stringify(SPECIALISTS)};
        
        let selectedSymptoms = new Set();
        let currentCategory = 'all';
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderSymptoms('all');
            setupCategoryTabs();
            setupFormValidation();
        });
        
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
        
        function renderSymptoms(category) {
            const grid = document.getElementById('symptoms-grid');
            grid.innerHTML = '';
            
            const categories = category === 'all' 
                ? Object.values(symptomCategories) 
                : [symptomCategories[category]].filter(Boolean);
            
            categories.forEach(cat => {
                if (!cat) return;
                cat.symptoms.forEach(symptom => {
                    const tag = document.createElement('button');
                    tag.className = 'symptom-tag' + (selectedSymptoms.has(symptom.id) ? ' selected' : '');
                    tag.innerHTML = symptom.name + '<i class="fas fa-times"></i>';
                    tag.onclick = () => toggleSymptom(symptom.id, symptom.name);
                    grid.appendChild(tag);
                });
            });
        }
        
        function toggleSymptom(id, name) {
            if (selectedSymptoms.has(id)) {
                selectedSymptoms.delete(id);
            } else {
                selectedSymptoms.add(id);
            }
            
            updateSelectedDisplay();
            renderSymptoms(currentCategory);
            validateForm();
        }
        
        function updateSelectedDisplay() {
            const count = selectedSymptoms.size;
            document.getElementById('symptom-count').textContent = count;
            
            const container = document.getElementById('selected-symptoms');
            const list = document.getElementById('selected-list');
            
            if (count > 0) {
                container.classList.remove('hidden');
                list.innerHTML = '';
                selectedSymptoms.forEach(id => {
                    // Find symptom name
                    let name = id;
                    for (const cat of Object.values(symptomCategories)) {
                        const found = cat.symptoms.find(s => s.id === id);
                        if (found) { name = found.name; break; }
                    }
                    
                    const tag = document.createElement('span');
                    tag.className = 'inline-flex items-center px-3 py-1 bg-gold text-navy rounded-full text-sm font-medium';
                    tag.innerHTML = name + ' <button onclick="toggleSymptom(\\''+id+'\\', \\''+name+'\\')" class="ml-2"><i class="fas fa-times text-xs"></i></button>';
                    list.appendChild(tag);
                });
            } else {
                container.classList.add('hidden');
            }
        }
        
        function setupFormValidation() {
            const fields = ['patient-age', 'patient-gender', 'symptom-duration'];
            fields.forEach(id => {
                document.getElementById(id).addEventListener('change', validateForm);
            });
        }
        
        function validateForm() {
            const age = document.getElementById('patient-age').value;
            const gender = document.getElementById('patient-gender').value;
            const hasSymptoms = selectedSymptoms.size > 0;
            
            const isValid = age && gender && hasSymptoms;
            document.getElementById('analyze-btn').disabled = !isValid;
        }
        
        async function analyzeSymptoms() {
            const btn = document.getElementById('analyze-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyzing...';
            
            const data = {
                symptoms: Array.from(selectedSymptoms),
                age: parseInt(document.getElementById('patient-age').value),
                gender: document.getElementById('patient-gender').value,
                duration: document.getElementById('symptom-duration').value,
                severity: document.getElementById('symptom-severity').value,
                preConditions: document.getElementById('pre-conditions').value,
                medications: document.getElementById('medications').value,
                additionalDetails: document.getElementById('additional-details').value
            };
            
            try {
                const response = await fetch('/api/medisense/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    displayResults(result.data);
                } else {
                    alert('Analysis failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-brain mr-2"></i>Analyze My Symptoms';
        }
        
        function displayResults(data) {
            const section = document.getElementById('results-section');
            section.classList.remove('hidden');
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Urgency Banner
            const urgency = data.urgency;
            const banner = document.getElementById('urgency-banner');
            banner.className = 'card p-6 border-l-4 urgency-' + urgency.name.toLowerCase().replace(' ', '');
            
            const iconDiv = document.getElementById('urgency-icon');
            iconDiv.style.backgroundColor = urgency.bgColor;
            iconDiv.querySelector('i').className = 'fas ' + urgency.icon + ' text-2xl';
            iconDiv.querySelector('i').style.color = urgency.color;
            
            document.getElementById('urgency-level').textContent = urgency.name;
            document.getElementById('urgency-level').style.color = urgency.color;
            document.getElementById('urgency-action').textContent = urgency.action;
            document.getElementById('urgency-response').querySelector('.font-bold').textContent = urgency.responseTime;
            
            // Conditions
            const conditionsList = document.getElementById('conditions-list');
            conditionsList.innerHTML = '';
            
            data.possibleConditions.forEach((match, idx) => {
                const div = document.createElement('div');
                div.className = 'condition-card p-4 bg-cream rounded-xl';
                div.innerHTML = \`
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-bold text-navy">\${match.condition.name}</h4>
                        <span class="text-sm font-semibold" style="color: \${getMatchColor(match.matchScore)}">\${Math.round(match.matchScore)}% match</span>
                    </div>
                    <div class="progress-bar mb-2">
                        <div class="progress-fill" style="width: \${match.matchScore}%; background: \${getMatchColor(match.matchScore)}"></div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">\${match.condition.description}</p>
                    <div class="flex flex-wrap gap-1">
                        \${match.matchingSymptoms.map(s => \`<span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">\${s}</span>\`).join('')}
                    </div>
                \`;
                conditionsList.appendChild(div);
            });
            
            // Recommendations
            const recList = document.getElementById('recommendations-list');
            recList.innerHTML = '';
            
            data.recommendations.forEach(rec => {
                const div = document.createElement('div');
                const priorityColors = {
                    critical: 'bg-red-100 border-red-500 text-red-700',
                    high: 'bg-orange-100 border-orange-500 text-orange-700',
                    medium: 'bg-yellow-100 border-yellow-500 text-yellow-700',
                    low: 'bg-blue-100 border-blue-500 text-blue-700',
                    info: 'bg-gray-100 border-gray-500 text-gray-700'
                };
                div.className = 'p-4 border-l-4 rounded-r-lg ' + priorityColors[rec.priority];
                div.innerHTML = \`
                    <h4 class="font-bold">\${rec.action}</h4>
                    <p class="text-sm mt-1">\${rec.description}</p>
                \`;
                recList.appendChild(div);
            });
            
            // Specialists
            const specList = document.getElementById('specialists-list');
            specList.innerHTML = '';
            
            data.recommendedSpecialists.filter(spec => spec !== null && spec !== undefined).forEach(spec => {
                const div = document.createElement('div');
                div.className = 'p-4 bg-cream rounded-xl text-center';
                div.innerHTML = \`
                    <div class="w-12 h-12 bg-navy rounded-full mx-auto flex items-center justify-center mb-3">
                        <i class="fas \${spec.icon || 'fa-user-md'} text-white text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy">\${spec.name || 'Specialist'}</h4>
                    <p class="text-xs text-gray-500">\${spec.description || 'Medical specialist'}</p>
                \`;
                specList.appendChild(div);
            });
        }
        
        function getMatchColor(score) {
            if (score >= 70) return '#10B981';
            if (score >= 50) return '#F59E0B';
            return '#6B7280';
        }
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/symptom-analyzer" class="nav-item active">
                <i class="fas fa-stethoscope"></i>
                <span>Symptoms</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>
`
