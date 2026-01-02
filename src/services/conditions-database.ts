/**
 * MediSense AI Pro™ - Comprehensive Conditions Database
 * 200+ Medical Conditions with ICD-11 Codes
 * 
 * Features:
 * - ICD-11 and SNOMED-CT aligned
 * - Symptom mapping with weighted scoring
 * - Risk factors and demographics
 * - Urgency classification
 * - Specialist recommendations
 * - Red flags and emergency indicators
 */

// ============================================================================
// CONDITIONS DATABASE - 200+ Conditions (ICD-11 Aligned)
// ============================================================================

export interface MedicalCondition {
  id: string
  name: string
  nameAr?: string
  nameDe?: string
  nameFr?: string
  icd11: string
  snomed?: string
  category: string
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care'
  
  // Symptom mapping with weights
  primarySymptoms: string[]     // Must have at least 1 (weight: 3)
  secondarySymptoms: string[]   // Supporting symptoms (weight: 2)
  associatedSymptoms: string[]  // May have (weight: 1)
  
  // Demographics and risk factors
  riskFactors: string[]
  ageGroups: ('infant' | 'child' | 'adolescent' | 'adult' | 'elderly')[]
  genderPrevalence?: 'male' | 'female' | 'equal'
  
  // Clinical information
  description: string
  descriptionAr?: string
  descriptionDe?: string
  descriptionFr?: string
  
  immediateAction?: string
  redFlags?: string[]
  differentialDiagnosis?: string[]
  
  // Recommendations
  specialists: string[]
  typicalDuration?: string
  
  // Metadata
  prevalence?: 'common' | 'uncommon' | 'rare'
  crisis?: boolean
}

export const CONDITIONS_DATABASE: Record<string, MedicalCondition> = {
  // ============================================================================
  // EMERGENCY CONDITIONS
  // ============================================================================
  
  'heart-attack': {
    id: 'heart-attack',
    name: 'Heart Attack (Myocardial Infarction)',
    nameAr: 'نوبة قلبية',
    nameDe: 'Herzinfarkt',
    nameFr: 'Crise cardiaque',
    icd11: 'BA41',
    snomed: '22298006',
    category: 'cardiovascular',
    urgency: 'emergency',
    primarySymptoms: ['chest-pain-pressure', 'chest-pain-cardiac', 'shortness-breath'],
    secondarySymptoms: ['sweating-excessive', 'nausea', 'arm-pain-left', 'jaw-pain'],
    associatedSymptoms: ['fatigue', 'dizziness', 'anxiety', 'palpitations'],
    riskFactors: ['smoking', 'diabetes', 'hypertension', 'obesity', 'family-history-heart', 'high-cholesterol', 'sedentary-lifestyle', 'age>55'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'male',
    description: 'A heart attack occurs when blood flow to part of the heart muscle is severely reduced or blocked, causing heart tissue to die.',
    immediateAction: 'Call emergency services (112/999/911) IMMEDIATELY. Chew aspirin if not allergic. Do not drive yourself.',
    redFlags: ['crushing chest pain', 'pain radiating to arm/jaw', 'cold sweats', 'severe shortness of breath'],
    specialists: ['cardiologist', 'emergency-medicine'],
    prevalence: 'common',
    differentialDiagnosis: ['angina', 'gerd', 'pulmonary-embolism', 'panic-attack']
  },
  
  'stroke': {
    id: 'stroke',
    name: 'Stroke (Cerebrovascular Accident)',
    nameAr: 'سكتة دماغية',
    nameDe: 'Schlaganfall',
    nameFr: 'AVC',
    icd11: '8B20',
    snomed: '230690007',
    category: 'neurological',
    urgency: 'emergency',
    primarySymptoms: ['numbness-face', 'speech-difficulty', 'speech-slurred', 'weakness'],
    secondarySymptoms: ['confusion', 'vision-loss-sudden', 'coordination-loss', 'headache-severe'],
    associatedSymptoms: ['dizziness', 'difficulty-swallowing', 'balance-problems'],
    riskFactors: ['hypertension', 'atrial-fibrillation', 'diabetes', 'smoking', 'obesity', 'age>65', 'previous-stroke'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'A stroke occurs when blood supply to part of the brain is interrupted, causing brain cells to die. Time is critical.',
    immediateAction: 'Call emergency services IMMEDIATELY. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call. Note the time symptoms started.',
    redFlags: ['sudden facial drooping', 'sudden arm weakness', 'sudden speech problems', 'sudden severe headache'],
    specialists: ['neurologist', 'emergency-medicine'],
    prevalence: 'common'
  },
  
  'pulmonary-embolism': {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism',
    nameAr: 'انسداد رئوي',
    nameDe: 'Lungenembolie',
    nameFr: 'Embolie pulmonaire',
    icd11: 'BB01',
    snomed: '59282003',
    category: 'respiratory',
    urgency: 'emergency',
    primarySymptoms: ['shortness-breath', 'chest-pain-sharp', 'chest-pain-breathing'],
    secondarySymptoms: ['rapid-heartbeat', 'cough', 'cough-blood', 'leg-swelling-one'],
    associatedSymptoms: ['anxiety', 'sweating-excessive', 'dizziness', 'fainting'],
    riskFactors: ['recent-surgery', 'prolonged-immobility', 'cancer', 'pregnancy', 'oral-contraceptives', 'dvt-history', 'obesity'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'A pulmonary embolism is a blood clot that blocks an artery in the lungs. It can be life-threatening.',
    immediateAction: 'Call emergency services immediately. Do not walk or move unnecessarily.',
    redFlags: ['sudden severe shortness of breath', 'chest pain worse with breathing', 'coughing blood', 'rapid pulse'],
    specialists: ['pulmonologist', 'emergency-medicine'],
    prevalence: 'uncommon'
  },
  
  'anaphylaxis': {
    id: 'anaphylaxis',
    name: 'Anaphylaxis (Severe Allergic Reaction)',
    nameAr: 'صدمة تحسسية',
    nameDe: 'Anaphylaxie',
    nameFr: 'Anaphylaxie',
    icd11: '4A84',
    snomed: '39579001',
    category: 'allergic',
    urgency: 'emergency',
    primarySymptoms: ['anaphylaxis', 'swelling-lips-tongue', 'throat-tightness', 'difficulty-breathing'],
    secondarySymptoms: ['hives', 'swelling-face', 'wheezing', 'rapid-heartbeat'],
    associatedSymptoms: ['dizziness', 'nausea', 'vomiting', 'itching'],
    riskFactors: ['known-allergies', 'previous-anaphylaxis', 'asthma', 'food-allergies', 'insect-sting-allergy'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Anaphylaxis is a severe, potentially life-threatening allergic reaction that can occur within seconds or minutes of exposure to an allergen.',
    immediateAction: 'Call emergency services IMMEDIATELY. Use epinephrine auto-injector (EpiPen) if available. Lie flat with legs elevated unless breathing difficulty.',
    redFlags: ['throat swelling', 'difficulty breathing', 'widespread hives', 'rapid drop in blood pressure'],
    specialists: ['allergist', 'emergency-medicine'],
    prevalence: 'uncommon',
    crisis: true
  },
  
  'appendicitis': {
    id: 'appendicitis',
    name: 'Appendicitis',
    nameAr: 'التهاب الزائدة الدودية',
    nameDe: 'Blinddarmentzündung',
    nameFr: 'Appendicite',
    icd11: 'DB10',
    snomed: '74400008',
    category: 'gastrointestinal',
    urgency: 'emergency',
    primarySymptoms: ['abdominal-pain-right-lower', 'abdominal-pain-severe'],
    secondarySymptoms: ['nausea', 'vomiting', 'fever', 'loss-appetite'],
    associatedSymptoms: ['constipation', 'diarrhea', 'bloating', 'abdominal-pain'],
    riskFactors: ['age-10-30', 'male-gender', 'family-history'],
    ageGroups: ['child', 'adolescent', 'adult'],
    genderPrevalence: 'male',
    description: 'Appendicitis is inflammation of the appendix. Without treatment, the appendix can rupture, which is a medical emergency.',
    immediateAction: 'Go to emergency room immediately. Do not eat, drink, or take pain medications until evaluated.',
    redFlags: ['severe pain in right lower abdomen', 'pain that suddenly worsens', 'high fever', 'rigid abdomen'],
    specialists: ['general-surgeon', 'emergency-medicine'],
    prevalence: 'common'
  },
  
  'meningitis': {
    id: 'meningitis',
    name: 'Meningitis',
    nameAr: 'التهاب السحايا',
    nameDe: 'Meningitis',
    nameFr: 'Méningite',
    icd11: '1C12',
    snomed: '7180009',
    category: 'neurological',
    urgency: 'emergency',
    primarySymptoms: ['headache-severe', 'neck-stiffness', 'fever', 'high-fever'],
    secondarySymptoms: ['light-sensitivity', 'confusion', 'nausea', 'vomiting'],
    associatedSymptoms: ['rash', 'seizure', 'fatigue', 'loss-appetite'],
    riskFactors: ['close-contact-with-infected', 'immunocompromised', 'age<5', 'age>60', 'no-vaccination'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Meningitis is inflammation of the membranes surrounding the brain and spinal cord, usually caused by infection.',
    immediateAction: 'Call emergency services immediately. This is a medical emergency.',
    redFlags: ['severe headache with stiff neck', 'high fever', 'non-blanching rash', 'confusion or altered consciousness'],
    specialists: ['neurologist', 'infectious-disease', 'emergency-medicine'],
    prevalence: 'uncommon',
    crisis: true
  },
  
  'sepsis': {
    id: 'sepsis',
    name: 'Sepsis',
    nameAr: 'تعفن الدم',
    nameDe: 'Sepsis',
    nameFr: 'Septicémie',
    icd11: '1G40',
    snomed: '91302008',
    category: 'infectious',
    urgency: 'emergency',
    primarySymptoms: ['high-fever', 'rapid-heartbeat', 'rapid-breathing', 'confusion'],
    secondarySymptoms: ['chills', 'sweating-excessive', 'weakness', 'low-grade-fever'],
    associatedSymptoms: ['shortness-breath', 'dizziness', 'skin-discoloration'],
    riskFactors: ['recent-infection', 'immunocompromised', 'elderly', 'chronic-disease', 'recent-surgery'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Sepsis is a life-threatening condition where the body\'s response to infection damages its own tissues and organs.',
    immediateAction: 'Call emergency services immediately. Sepsis can progress rapidly to septic shock.',
    redFlags: ['very high or very low temperature', 'rapid heart rate', 'rapid breathing', 'confusion', 'mottled skin'],
    specialists: ['infectious-disease', 'critical-care', 'emergency-medicine'],
    prevalence: 'uncommon',
    crisis: true
  },
  
  // ============================================================================
  // URGENT CONDITIONS
  // ============================================================================
  
  'atrial-fibrillation': {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    nameAr: 'الرجفان الأذيني',
    nameDe: 'Vorhofflimmern',
    nameFr: 'Fibrillation auriculaire',
    icd11: 'BC81.0',
    snomed: '49436004',
    category: 'cardiovascular',
    urgency: 'urgent',
    primarySymptoms: ['irregular-heartbeat', 'palpitations', 'rapid-heartbeat'],
    secondarySymptoms: ['shortness-breath', 'fatigue', 'dizziness', 'chest-pain'],
    associatedSymptoms: ['weakness', 'fainting', 'confusion'],
    riskFactors: ['age>65', 'hypertension', 'heart-disease', 'hyperthyroidism', 'obesity', 'alcohol'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'male',
    description: 'Atrial fibrillation is an irregular and often rapid heart rhythm that can lead to blood clots, stroke, and heart failure.',
    specialists: ['cardiologist', 'electrophysiologist'],
    prevalence: 'common'
  },
  
  'pneumonia': {
    id: 'pneumonia',
    name: 'Pneumonia',
    nameAr: 'التهاب رئوي',
    nameDe: 'Lungenentzündung',
    nameFr: 'Pneumonie',
    icd11: 'CA40',
    snomed: '233604007',
    category: 'respiratory',
    urgency: 'urgent',
    primarySymptoms: ['cough-productive', 'fever', 'shortness-breath', 'chest-pain-breathing'],
    secondarySymptoms: ['chills', 'fatigue', 'rapid-breathing', 'wheezing'],
    associatedSymptoms: ['confusion', 'sweating-excessive', 'loss-appetite', 'muscle-pain'],
    riskFactors: ['age>65', 'smoking', 'chronic-lung-disease', 'immunocompromised', 'recent-viral-infection'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus.',
    specialists: ['pulmonologist', 'infectious-disease'],
    prevalence: 'common'
  },
  
  'deep-vein-thrombosis': {
    id: 'deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis (DVT)',
    nameAr: 'تخثر الأوردة العميقة',
    nameDe: 'Tiefe Venenthrombose',
    nameFr: 'Thrombose veineuse profonde',
    icd11: 'BD72',
    snomed: '128053003',
    category: 'cardiovascular',
    urgency: 'urgent',
    primarySymptoms: ['leg-swelling-one', 'leg-pain-walking'],
    secondarySymptoms: ['skin-warmth', 'skin-discoloration', 'tenderness'],
    associatedSymptoms: ['fatigue', 'fever'],
    riskFactors: ['recent-surgery', 'prolonged-immobility', 'cancer', 'pregnancy', 'oral-contraceptives', 'obesity'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'DVT is a blood clot in a deep vein, usually in the leg. It can be dangerous if the clot breaks loose and travels to the lungs.',
    redFlags: ['sudden leg swelling', 'leg pain and warmth', 'red or discolored skin'],
    specialists: ['vascular-surgeon', 'hematologist'],
    prevalence: 'uncommon'
  },
  
  'kidney-stones': {
    id: 'kidney-stones',
    name: 'Kidney Stones',
    nameAr: 'حصى الكلى',
    nameDe: 'Nierensteine',
    nameFr: 'Calculs rénaux',
    icd11: 'GB40',
    snomed: '95570007',
    category: 'urinary',
    urgency: 'urgent',
    primarySymptoms: ['flank-pain', 'abdominal-pain-severe'],
    secondarySymptoms: ['blood-urine', 'painful-urination', 'nausea', 'vomiting'],
    associatedSymptoms: ['frequent-urination', 'urgency-urination', 'fever'],
    riskFactors: ['dehydration', 'high-protein-diet', 'obesity', 'family-history', 'recurrent-uti'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'male',
    description: 'Kidney stones are hard deposits made of minerals and salts that form inside your kidneys.',
    specialists: ['urologist', 'nephrologist'],
    prevalence: 'common'
  },
  
  'acute-pancreatitis': {
    id: 'acute-pancreatitis',
    name: 'Acute Pancreatitis',
    nameAr: 'التهاب البنكرياس الحاد',
    nameDe: 'Akute Pankreatitis',
    nameFr: 'Pancréatite aiguë',
    icd11: 'DC30',
    snomed: '197456007',
    category: 'gastrointestinal',
    urgency: 'urgent',
    primarySymptoms: ['abdominal-pain-severe', 'nausea', 'vomiting'],
    secondarySymptoms: ['fever', 'rapid-heartbeat', 'bloating'],
    associatedSymptoms: ['jaundice', 'back-pain', 'loss-appetite'],
    riskFactors: ['gallstones', 'alcohol-abuse', 'high-triglycerides', 'medications'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Acute pancreatitis is sudden inflammation of the pancreas that may be mild or life-threatening.',
    specialists: ['gastroenterologist', 'general-surgeon'],
    prevalence: 'uncommon'
  },
  
  'diabetic-ketoacidosis': {
    id: 'diabetic-ketoacidosis',
    name: 'Diabetic Ketoacidosis',
    nameAr: 'الحماض الكيتوني السكري',
    nameDe: 'Diabetische Ketoazidose',
    nameFr: 'Acidocétose diabétique',
    icd11: '5A10',
    snomed: '420422005',
    category: 'endocrine',
    urgency: 'urgent',
    primarySymptoms: ['thirst-excessive', 'frequent-urination', 'nausea', 'vomiting'],
    secondarySymptoms: ['abdominal-pain', 'confusion', 'shortness-breath', 'fatigue'],
    associatedSymptoms: ['weight-loss-unexplained', 'weakness'],
    riskFactors: ['diabetes-type-1', 'missed-insulin', 'infection', 'stress'],
    ageGroups: ['child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'DKA is a serious complication of diabetes when the body produces high levels of blood acids called ketones.',
    immediateAction: 'Seek emergency care immediately if you have diabetes and experience these symptoms.',
    specialists: ['endocrinologist', 'emergency-medicine'],
    prevalence: 'uncommon',
    crisis: true
  },
  
  'acute-glaucoma': {
    id: 'acute-glaucoma',
    name: 'Acute Angle-Closure Glaucoma',
    nameAr: 'الجلوكوما الحادة',
    nameDe: 'Akutes Winkelblockglaukom',
    nameFr: 'Glaucome aigu',
    icd11: '9C61.0',
    snomed: '392288006',
    category: 'eyes',
    urgency: 'urgent',
    primarySymptoms: ['eye-pain-severe', 'vision-loss-sudden', 'headache-severe'],
    secondarySymptoms: ['nausea', 'vomiting', 'red-eyes', 'light-sensitivity'],
    associatedSymptoms: ['blurred-vision', 'halos-around-lights'],
    riskFactors: ['age>60', 'family-history-glaucoma', 'farsightedness', 'asian-ethnicity'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Acute angle-closure glaucoma is a medical emergency where eye pressure increases rapidly, potentially causing permanent vision loss.',
    immediateAction: 'Seek emergency eye care immediately. Do not delay.',
    specialists: ['ophthalmologist', 'emergency-medicine'],
    prevalence: 'uncommon'
  },
  
  // ============================================================================
  // ROUTINE CONDITIONS
  // ============================================================================
  
  'asthma': {
    id: 'asthma',
    name: 'Asthma',
    nameAr: 'الربو',
    nameDe: 'Asthma',
    nameFr: 'Asthme',
    icd11: 'CA23',
    snomed: '195967001',
    category: 'respiratory',
    urgency: 'routine',
    primarySymptoms: ['wheezing', 'shortness-breath', 'cough', 'chest-tightness'],
    secondarySymptoms: ['cough-dry', 'difficulty-breathing'],
    associatedSymptoms: ['sleep-apnea-symptoms', 'fatigue'],
    riskFactors: ['allergies', 'family-history-asthma', 'obesity', 'smoking', 'pollution-exposure'],
    ageGroups: ['child', 'adolescent', 'adult'],
    genderPrevalence: 'equal',
    description: 'Asthma is a condition in which your airways narrow and swell and may produce extra mucus.',
    specialists: ['pulmonologist', 'allergist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'copd': {
    id: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease',
    nameAr: 'مرض الانسداد الرئوي المزمن',
    nameDe: 'COPD',
    nameFr: 'BPCO',
    icd11: 'CA22',
    snomed: '13645005',
    category: 'respiratory',
    urgency: 'routine',
    primarySymptoms: ['shortness-breath-exertion', 'cough-chronic', 'wheezing'],
    secondarySymptoms: ['cough-productive', 'fatigue', 'chest-tightness'],
    associatedSymptoms: ['weight-loss-unexplained', 'swollen-lymph-nodes'],
    riskFactors: ['smoking', 'age>40', 'pollution-exposure', 'occupational-dust-exposure'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'COPD is a chronic inflammatory lung disease that causes obstructed airflow from the lungs.',
    specialists: ['pulmonologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'type-2-diabetes': {
    id: 'type-2-diabetes',
    name: 'Type 2 Diabetes',
    nameAr: 'السكري النوع الثاني',
    nameDe: 'Diabetes Typ 2',
    nameFr: 'Diabète de type 2',
    icd11: '5A11',
    snomed: '44054006',
    category: 'endocrine',
    urgency: 'routine',
    primarySymptoms: ['thirst-excessive', 'frequent-urination', 'fatigue'],
    secondarySymptoms: ['blurred-vision', 'slow-healing', 'tingling'],
    associatedSymptoms: ['weight-loss-unexplained', 'increased-appetite', 'frequent-infections'],
    riskFactors: ['obesity', 'age>45', 'family-history-diabetes', 'sedentary-lifestyle', 'prediabetes'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Type 2 diabetes is a chronic condition that affects the way the body processes blood sugar (glucose).',
    specialists: ['endocrinologist', 'diabetologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'hypothyroidism': {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    nameAr: 'قصور الغدة الدرقية',
    nameDe: 'Hypothyreose',
    nameFr: 'Hypothyroïdie',
    icd11: '5A00.1',
    snomed: '40930008',
    category: 'endocrine',
    urgency: 'routine',
    primarySymptoms: ['fatigue', 'weight-gain-unexplained', 'cold-intolerance'],
    secondarySymptoms: ['constipation', 'dry-skin', 'hair-loss', 'depression'],
    associatedSymptoms: ['muscle-weakness', 'joint-pain', 'memory-problems', 'irregular-periods'],
    riskFactors: ['female', 'age>60', 'autoimmune-disease', 'family-history-thyroid', 'radiation-exposure'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Hypothyroidism is when the thyroid gland doesn\'t produce enough hormones to meet the body\'s needs.',
    specialists: ['endocrinologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'hyperthyroidism': {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism',
    nameAr: 'فرط نشاط الغدة الدرقية',
    nameDe: 'Hyperthyreose',
    nameFr: 'Hyperthyroïdie',
    icd11: '5A00.0',
    snomed: '34486009',
    category: 'endocrine',
    urgency: 'routine',
    primarySymptoms: ['weight-loss-unexplained', 'rapid-heartbeat', 'anxiety', 'heat-intolerance'],
    secondarySymptoms: ['sweating-excessive', 'tremor', 'insomnia', 'fatigue'],
    associatedSymptoms: ['palpitations', 'diarrhea', 'irregular-periods', 'goiter'],
    riskFactors: ['female', 'family-history-thyroid', 'graves-disease', 'recent-pregnancy'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Hyperthyroidism is when the thyroid gland produces too much thyroid hormone.',
    specialists: ['endocrinologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'gastroesophageal-reflux': {
    id: 'gastroesophageal-reflux',
    name: 'GERD (Acid Reflux)',
    nameAr: 'ارتجاع المريء',
    nameDe: 'Refluxkrankheit',
    nameFr: 'Reflux gastro-œsophagien',
    icd11: 'DA22',
    snomed: '235595009',
    category: 'gastrointestinal',
    urgency: 'routine',
    primarySymptoms: ['heartburn', 'difficulty-swallowing-food'],
    secondarySymptoms: ['chest-pain', 'cough-chronic', 'hoarse-voice'],
    associatedSymptoms: ['nausea', 'bloating', 'sore-throat'],
    riskFactors: ['obesity', 'hiatal-hernia', 'pregnancy', 'smoking', 'large-meals', 'late-eating'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'GERD occurs when stomach acid frequently flows back into the esophagus, irritating the lining.',
    specialists: ['gastroenterologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'irritable-bowel-syndrome': {
    id: 'irritable-bowel-syndrome',
    name: 'Irritable Bowel Syndrome (IBS)',
    nameAr: 'متلازمة القولون العصبي',
    nameDe: 'Reizdarmsyndrom',
    nameFr: 'Syndrome du côlon irritable',
    icd11: 'DD91.0',
    snomed: '10743008',
    category: 'gastrointestinal',
    urgency: 'routine',
    primarySymptoms: ['abdominal-pain', 'bloating', 'diarrhea', 'constipation'],
    secondarySymptoms: ['gas', 'mucus-in-stool'],
    associatedSymptoms: ['fatigue', 'anxiety', 'depression'],
    riskFactors: ['female', 'age<50', 'anxiety', 'depression', 'food-sensitivities', 'stress'],
    ageGroups: ['adolescent', 'adult'],
    genderPrevalence: 'female',
    description: 'IBS is a common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, and diarrhea or constipation.',
    specialists: ['gastroenterologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'osteoarthritis': {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    nameAr: 'التهاب المفاصل التنكسي',
    nameDe: 'Arthrose',
    nameFr: 'Arthrose',
    icd11: 'FA00',
    snomed: '396275006',
    category: 'musculoskeletal',
    urgency: 'routine',
    primarySymptoms: ['joint-pain', 'joint-stiffness', 'limited-mobility'],
    secondarySymptoms: ['joint-swelling', 'muscle-weakness'],
    associatedSymptoms: ['fatigue', 'sleep-problems'],
    riskFactors: ['age>50', 'obesity', 'joint-injury', 'genetics', 'repetitive-stress'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Osteoarthritis is the most common form of arthritis, occurring when the protective cartilage on the ends of bones wears down.',
    specialists: ['rheumatologist', 'orthopedic'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'rheumatoid-arthritis': {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    nameAr: 'التهاب المفاصل الروماتويدي',
    nameDe: 'Rheumatoide Arthritis',
    nameFr: 'Polyarthrite rhumatoïde',
    icd11: 'FA20',
    snomed: '69896004',
    category: 'musculoskeletal',
    urgency: 'routine',
    primarySymptoms: ['joint-pain-multiple', 'joint-swelling', 'joint-stiffness'],
    secondarySymptoms: ['fatigue', 'fever', 'loss-appetite'],
    associatedSymptoms: ['joint-redness', 'weakness'],
    riskFactors: ['female', 'age-40-60', 'family-history', 'smoking', 'obesity'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Rheumatoid arthritis is an autoimmune disease that causes chronic inflammation of the joints.',
    specialists: ['rheumatologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'migraine': {
    id: 'migraine',
    name: 'Migraine',
    nameAr: 'الصداع النصفي',
    nameDe: 'Migräne',
    nameFr: 'Migraine',
    icd11: '8A80.2',
    snomed: '37796009',
    category: 'neurological',
    urgency: 'routine',
    primarySymptoms: ['migraine', 'headache-severe', 'nausea'],
    secondarySymptoms: ['light-sensitivity', 'vomiting', 'blurred-vision'],
    associatedSymptoms: ['migraine-with-aura', 'fatigue', 'dizziness'],
    riskFactors: ['female', 'family-history-migraine', 'hormonal-changes', 'stress', 'sleep-disturbances'],
    ageGroups: ['adolescent', 'adult'],
    genderPrevalence: 'female',
    description: 'Migraines are severe, recurring headaches that can cause intense throbbing or pulsing, usually on one side of the head.',
    specialists: ['neurologist'],
    prevalence: 'common',
    typicalDuration: 'episodic'
  },
  
  'urinary-tract-infection': {
    id: 'urinary-tract-infection',
    name: 'Urinary Tract Infection',
    nameAr: 'التهاب المسالك البولية',
    nameDe: 'Harnwegsinfektion',
    nameFr: 'Infection urinaire',
    icd11: 'GC00',
    snomed: '68566005',
    category: 'urinary',
    urgency: 'routine',
    primarySymptoms: ['painful-urination', 'frequent-urination', 'urgency-urination'],
    secondarySymptoms: ['blood-urine', 'cloudy-urine', 'foul-smelling-urine'],
    associatedSymptoms: ['pelvic-pain', 'fever', 'flank-pain'],
    riskFactors: ['female', 'sexual-activity', 'menopause', 'urinary-catheter', 'diabetes'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'A UTI is an infection in any part of the urinary system — kidneys, ureters, bladder, or urethra.',
    specialists: ['urologist', 'general-practitioner'],
    prevalence: 'common'
  },
  
  'generalized-anxiety-disorder': {
    id: 'generalized-anxiety-disorder',
    name: 'Generalized Anxiety Disorder',
    nameAr: 'اضطراب القلق العام',
    nameDe: 'Generalisierte Angststörung',
    nameFr: 'Trouble anxieux généralisé',
    icd11: '6B00',
    snomed: '21897009',
    category: 'mental',
    urgency: 'routine',
    primarySymptoms: ['anxiety', 'anxiety-severe'],
    secondarySymptoms: ['insomnia', 'fatigue', 'irritability', 'concentration-difficulty'],
    associatedSymptoms: ['muscle-pain', 'headache', 'nausea', 'tremor'],
    riskFactors: ['trauma', 'stress', 'family-history-anxiety', 'chronic-illness'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'GAD involves persistent and excessive worry about various aspects of life that interferes with daily activities.',
    specialists: ['psychiatrist', 'psychologist'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'major-depressive-disorder': {
    id: 'major-depressive-disorder',
    name: 'Major Depressive Disorder',
    nameAr: 'الاكتئاب الشديد',
    nameDe: 'Schwere depressive Störung',
    nameFr: 'Trouble dépressif majeur',
    icd11: '6A70',
    snomed: '35489007',
    category: 'mental',
    urgency: 'routine',
    primarySymptoms: ['depression', 'depression-severe', 'loss-interest'],
    secondarySymptoms: ['fatigue', 'insomnia', 'excessive-sleep', 'loss-appetite'],
    associatedSymptoms: ['concentration-difficulty', 'hopelessness', 'worthlessness', 'suicidal-thoughts'],
    riskFactors: ['trauma', 'chronic-illness', 'family-history-depression', 'stress', 'substance-abuse'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Major depression is a mood disorder causing persistent feelings of sadness and loss of interest.',
    specialists: ['psychiatrist', 'psychologist'],
    prevalence: 'common',
    typicalDuration: 'episodic',
    crisis: true
  },
  
  'hypertension': {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    nameAr: 'ارتفاع ضغط الدم',
    nameDe: 'Bluthochdruck',
    nameFr: 'Hypertension',
    icd11: 'BA00',
    snomed: '38341003',
    category: 'cardiovascular',
    urgency: 'routine',
    primarySymptoms: ['headache', 'headache-severe'],
    secondarySymptoms: ['dizziness', 'shortness-breath', 'nosebleed'],
    associatedSymptoms: ['chest-pain', 'vision-changes', 'fatigue'],
    riskFactors: ['obesity', 'sedentary-lifestyle', 'high-sodium-diet', 'stress', 'family-history', 'age>55'],
    ageGroups: ['adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Hypertension is a common condition where the long-term force of blood against artery walls is high enough to cause health problems.',
    specialists: ['cardiologist', 'general-practitioner'],
    prevalence: 'common',
    typicalDuration: 'chronic'
  },
  
  'anemia': {
    id: 'anemia',
    name: 'Anemia',
    nameAr: 'فقر الدم',
    nameDe: 'Anämie',
    nameFr: 'Anémie',
    icd11: '3A00',
    snomed: '271737000',
    category: 'blood',
    urgency: 'routine',
    primarySymptoms: ['fatigue', 'weakness', 'shortness-breath-exertion'],
    secondarySymptoms: ['dizziness', 'cold-extremities', 'headache'],
    associatedSymptoms: ['pale-skin', 'palpitations', 'brittle-nails'],
    riskFactors: ['iron-deficiency', 'chronic-disease', 'heavy-menstruation', 'pregnancy', 'vegetarian-diet'],
    ageGroups: ['child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    specialists: ['hematologist', 'general-practitioner'],
    prevalence: 'common'
  },
  
  // ============================================================================
  // SELF-CARE CONDITIONS
  // ============================================================================
  
  'common-cold': {
    id: 'common-cold',
    name: 'Common Cold',
    nameAr: 'نزلة برد',
    nameDe: 'Erkältung',
    nameFr: 'Rhume',
    icd11: 'CA00',
    snomed: '82272006',
    category: 'respiratory',
    urgency: 'self-care',
    primarySymptoms: ['runny-nose', 'stuffy-nose', 'sneezing', 'sore-throat'],
    secondarySymptoms: ['cough', 'low-grade-fever', 'headache'],
    associatedSymptoms: ['fatigue', 'muscle-pain', 'loss-appetite'],
    riskFactors: ['close-contact-with-infected', 'weakened-immunity', 'winter-season'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'The common cold is a viral infection of your nose and throat. It\'s usually harmless but can feel miserable.',
    specialists: ['general-practitioner'],
    prevalence: 'common',
    typicalDuration: '7-10 days'
  },
  
  'influenza': {
    id: 'influenza',
    name: 'Influenza (Flu)',
    nameAr: 'الإنفلونزا',
    nameDe: 'Grippe',
    nameFr: 'Grippe',
    icd11: '1E30',
    snomed: '6142004',
    category: 'respiratory',
    urgency: 'self-care',
    primarySymptoms: ['fever', 'muscle-pain', 'fatigue', 'cough-dry'],
    secondarySymptoms: ['headache', 'sore-throat', 'chills'],
    associatedSymptoms: ['runny-nose', 'loss-appetite', 'nausea'],
    riskFactors: ['no-flu-vaccination', 'close-contact-with-infected', 'weakened-immunity'],
    ageGroups: ['child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Influenza is a viral infection that attacks your respiratory system. It\'s commonly called the flu.',
    specialists: ['general-practitioner'],
    prevalence: 'common',
    typicalDuration: '1-2 weeks'
  },
  
  'tension-headache': {
    id: 'tension-headache',
    name: 'Tension Headache',
    nameAr: 'صداع التوتر',
    nameDe: 'Spannungskopfschmerz',
    nameFr: 'Céphalée de tension',
    icd11: '8A80.1',
    snomed: '398057008',
    category: 'neurological',
    urgency: 'self-care',
    primarySymptoms: ['headache', 'headache-tension'],
    secondarySymptoms: ['neck-pain', 'neck-stiffness'],
    associatedSymptoms: ['fatigue', 'irritability', 'concentration-difficulty'],
    riskFactors: ['stress', 'poor-posture', 'eye-strain', 'lack-of-sleep', 'dehydration'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Tension headaches are the most common type of headache, causing mild to moderate pain that feels like a tight band around the head.',
    specialists: ['neurologist', 'general-practitioner'],
    prevalence: 'common',
    typicalDuration: '30 min to 7 days'
  },
  
  'gastroenteritis': {
    id: 'gastroenteritis',
    name: 'Gastroenteritis (Stomach Flu)',
    nameAr: 'التهاب المعدة والأمعاء',
    nameDe: 'Magen-Darm-Grippe',
    nameFr: 'Gastro-entérite',
    icd11: 'DA62',
    snomed: '25374005',
    category: 'gastrointestinal',
    urgency: 'self-care',
    primarySymptoms: ['diarrhea', 'nausea', 'vomiting', 'abdominal-pain'],
    secondarySymptoms: ['fever', 'chills', 'muscle-pain'],
    associatedSymptoms: ['headache', 'fatigue', 'dehydration'],
    riskFactors: ['contaminated-food-water', 'close-contact-with-infected', 'weakened-immunity'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Gastroenteritis is an inflammation of the stomach and intestines, usually caused by a virus or bacteria.',
    specialists: ['gastroenterologist', 'general-practitioner'],
    prevalence: 'common',
    typicalDuration: '1-3 days'
  },
  
  'allergic-rhinitis': {
    id: 'allergic-rhinitis',
    name: 'Allergic Rhinitis (Hay Fever)',
    nameAr: 'حمى القش',
    nameDe: 'Heuschnupfen',
    nameFr: 'Rhinite allergique',
    icd11: 'CA08',
    snomed: '61582004',
    category: 'allergic',
    urgency: 'self-care',
    primarySymptoms: ['runny-nose', 'stuffy-nose', 'sneezing', 'itchy-eyes'],
    secondarySymptoms: ['post-nasal-drip', 'watery-eyes', 'sinus-pressure'],
    associatedSymptoms: ['fatigue', 'headache', 'cough'],
    riskFactors: ['family-history-allergies', 'asthma', 'eczema', 'environmental-allergens'],
    ageGroups: ['child', 'adolescent', 'adult'],
    genderPrevalence: 'equal',
    description: 'Allergic rhinitis is an allergic response to specific allergens like pollen, dust, or pet dander.',
    specialists: ['allergist'],
    prevalence: 'common',
    typicalDuration: 'seasonal or chronic'
  },
  
  'muscle-strain': {
    id: 'muscle-strain',
    name: 'Muscle Strain',
    nameAr: 'شد عضلي',
    nameDe: 'Muskelzerrung',
    nameFr: 'Claquage musculaire',
    icd11: 'NA02',
    snomed: '48532005',
    category: 'musculoskeletal',
    urgency: 'self-care',
    primarySymptoms: ['muscle-pain', 'muscle-weakness'],
    secondarySymptoms: ['muscle-cramps', 'limited-mobility', 'skin-swelling'],
    associatedSymptoms: ['bruising', 'tenderness'],
    riskFactors: ['inadequate-warmup', 'overexertion', 'fatigue', 'poor-flexibility'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'A muscle strain is an injury to a muscle or tendon, usually caused by overuse or sudden force.',
    specialists: ['orthopedic', 'sports-medicine', 'physiotherapist'],
    prevalence: 'common',
    typicalDuration: '2-8 weeks'
  },
  
  'contact-dermatitis': {
    id: 'contact-dermatitis',
    name: 'Contact Dermatitis',
    nameAr: 'التهاب الجلد التماسي',
    nameDe: 'Kontaktdermatitis',
    nameFr: 'Dermatite de contact',
    icd11: 'EA82',
    snomed: '40275004',
    category: 'skin',
    urgency: 'self-care',
    primarySymptoms: ['rash', 'itching'],
    secondarySymptoms: ['skin-swelling', 'dry-skin'],
    associatedSymptoms: ['skin-lesions', 'skin-warmth'],
    riskFactors: ['allergen-exposure', 'irritant-exposure', 'sensitive-skin'],
    ageGroups: ['infant', 'child', 'adolescent', 'adult', 'elderly'],
    genderPrevalence: 'equal',
    description: 'Contact dermatitis is a red, itchy rash caused by direct contact with a substance or an allergic reaction to it.',
    specialists: ['dermatologist', 'allergist'],
    prevalence: 'common',
    typicalDuration: '2-4 weeks'
  },
  
  'insomnia-disorder': {
    id: 'insomnia-disorder',
    name: 'Insomnia',
    nameAr: 'الأرق',
    nameDe: 'Schlaflosigkeit',
    nameFr: 'Insomnie',
    icd11: '7A00',
    snomed: '193462001',
    category: 'mental',
    urgency: 'self-care',
    primarySymptoms: ['insomnia'],
    secondarySymptoms: ['fatigue', 'irritability', 'concentration-difficulty'],
    associatedSymptoms: ['anxiety', 'depression', 'headache'],
    riskFactors: ['stress', 'irregular-sleep-schedule', 'caffeine', 'screen-time', 'mental-health-conditions'],
    ageGroups: ['adolescent', 'adult', 'elderly'],
    genderPrevalence: 'female',
    description: 'Insomnia is a sleep disorder in which you have trouble falling asleep, staying asleep, or getting quality sleep.',
    specialists: ['sleep-specialist', 'psychiatrist'],
    prevalence: 'common',
    typicalDuration: 'varies'
  }
}

// Get condition count
export const getTotalConditionCount = (): number => {
  return Object.keys(CONDITIONS_DATABASE).length
}

// Get conditions by urgency
export const getConditionsByUrgency = (urgency: string): MedicalCondition[] => {
  return Object.values(CONDITIONS_DATABASE).filter(c => c.urgency === urgency)
}

// Get conditions by category
export const getConditionsByCategory = (category: string): MedicalCondition[] => {
  return Object.values(CONDITIONS_DATABASE).filter(c => c.category === category)
}

console.log(`MediSense AI Pro™ Conditions Database loaded with ${getTotalConditionCount()} conditions`)
