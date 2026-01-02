/**
 * MediSense AI Pro™ - Multi-Language Support (i18n)
 * Supports: English (EN), Arabic (AR), German (DE), French (FR)
 * 
 * Features:
 * - Complete UI translations
 * - Medical terminology in all languages
 * - RTL support for Arabic
 * - Localized formatting
 */

export type SupportedLanguage = 'en' | 'ar' | 'de' | 'fr'

export const LANGUAGE_CONFIG = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    locale: 'en-US'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    locale: 'ar-SA'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪',
    locale: 'de-DE'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    locale: 'fr-FR'
  }
}

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // App Title & Branding
    'app.title': 'MediSense AI Pro',
    'app.subtitle': 'Intelligent Symptom Analyzer',
    'app.tagline': 'World-class AI-powered health assessment',
    'app.poweredBy': 'Powered by SelectCareOS™',
    
    // Navigation
    'nav.home': 'Home',
    'nav.analyze': 'Analyze Symptoms',
    'nav.history': 'Health History',
    'nav.family': 'Family Health',
    'nav.medications': 'Medications',
    'nav.appointments': 'Appointments',
    'nav.settings': 'Settings',
    
    // Analysis Steps
    'step.symptoms': 'Select Symptoms',
    'step.details': 'Symptom Details',
    'step.profile': 'Your Profile',
    'step.medications': 'Current Medications',
    'step.analysis': 'AI Analysis',
    'step.results': 'Results & Recommendations',
    
    // Symptom Selection
    'symptoms.title': 'What symptoms are you experiencing?',
    'symptoms.search': 'Search symptoms...',
    'symptoms.categories': 'Categories',
    'symptoms.selected': 'Selected Symptoms',
    'symptoms.none': 'No symptoms selected',
    'symptoms.add': 'Add symptom',
    'symptoms.remove': 'Remove',
    'symptoms.voiceInput': 'Describe your symptoms by voice',
    
    // Symptom Details
    'details.title': 'Tell us more about your symptoms',
    'details.severity': 'Severity',
    'details.severity.mild': 'Mild',
    'details.severity.moderate': 'Moderate',
    'details.severity.severe': 'Severe',
    'details.severity.critical': 'Critical',
    'details.duration': 'Duration',
    'details.duration.hours': 'Hours',
    'details.duration.days': 'Days',
    'details.duration.weeks': 'Weeks',
    'details.duration.months': 'Months',
    'details.duration.years': 'Years',
    'details.onset': 'Onset',
    'details.onset.sudden': 'Sudden',
    'details.onset.gradual': 'Gradual',
    'details.frequency': 'Frequency',
    'details.frequency.constant': 'Constant',
    'details.frequency.intermittent': 'Comes and goes',
    'details.frequency.occasional': 'Occasional',
    
    // Profile
    'profile.title': 'Your Health Profile',
    'profile.age': 'Age',
    'profile.gender': 'Gender',
    'profile.gender.male': 'Male',
    'profile.gender.female': 'Female',
    'profile.gender.other': 'Other',
    'profile.conditions': 'Pre-existing Conditions',
    'profile.conditions.add': 'Add condition',
    'profile.allergies': 'Allergies',
    'profile.allergies.add': 'Add allergy',
    'profile.familyHistory': 'Family Medical History',
    'profile.lifestyle': 'Lifestyle',
    'profile.smoking': 'Smoking',
    'profile.alcohol': 'Alcohol',
    'profile.exercise': 'Exercise Level',
    
    // Medications
    'medications.title': 'Current Medications',
    'medications.search': 'Search medications...',
    'medications.add': 'Add medication',
    'medications.none': 'No medications added',
    'medications.interactions': 'Drug Interactions',
    'medications.warning': 'Warning',
    
    // Analysis
    'analysis.title': 'Analyzing Your Symptoms',
    'analysis.processing': 'AI is processing your information...',
    'analysis.matching': 'Matching symptoms to conditions...',
    'analysis.calculating': 'Calculating urgency level...',
    'analysis.generating': 'Generating recommendations...',
    
    // Results
    'results.title': 'Analysis Results',
    'results.urgency': 'Urgency Level',
    'results.confidence': 'Confidence',
    'results.conditions': 'Possible Conditions',
    'results.matchScore': 'Match Score',
    'results.recommendations': 'Recommendations',
    'results.immediate': 'Immediate Actions',
    'results.shortTerm': 'Short-term Care',
    'results.lifestyle': 'Lifestyle Advice',
    'results.specialists': 'Recommended Specialists',
    'results.drugAlerts': 'Medication Alerts',
    'results.bookAppointment': 'Book Appointment',
    'results.saveResults': 'Save Results',
    'results.newAnalysis': 'New Analysis',
    
    // Urgency Levels
    'urgency.emergency': 'Emergency',
    'urgency.emergency.action': 'Call emergency services (112/999/911) immediately',
    'urgency.urgent': 'Urgent',
    'urgency.urgent.action': 'Seek medical attention within 24-48 hours',
    'urgency.routine': 'Routine',
    'urgency.routine.action': 'Schedule an appointment with your healthcare provider',
    'urgency.selfcare': 'Self-Care',
    'urgency.selfcare.action': 'Self-care measures may be appropriate',
    
    // Emergency
    'emergency.title': 'Emergency Detected',
    'emergency.callNow': 'Call Emergency Services',
    'emergency.indicators': 'Emergency Indicators',
    
    // Stats
    'stats.symptoms': 'Symptoms',
    'stats.conditions': 'Conditions',
    'stats.medications': 'Medications',
    'stats.accuracy': 'Triage Accuracy',
    'stats.clinicalCases': 'Clinical Cases Analyzed',
    
    // Buttons & Actions
    'btn.continue': 'Continue',
    'btn.back': 'Back',
    'btn.analyze': 'Analyze',
    'btn.save': 'Save',
    'btn.cancel': 'Cancel',
    'btn.close': 'Close',
    'btn.startAnalysis': 'Start Analysis',
    'btn.viewDetails': 'View Details',
    
    // Compliance
    'compliance.hipaa': 'HIPAA Compliant',
    'compliance.gdpr': 'GDPR Compliant',
    'compliance.icd11': 'ICD-11 Aligned',
    'compliance.mdReviewed': 'MD Reviewed',
    
    // Disclaimer
    'disclaimer.title': 'Medical Disclaimer',
    'disclaimer.text': 'This analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns. In case of emergency, call emergency services immediately.'
  },
  
  ar: {
    // App Title & Branding
    'app.title': 'ميدي سينس AI برو',
    'app.subtitle': 'محلل الأعراض الذكي',
    'app.tagline': 'تقييم صحي مدعوم بالذكاء الاصطناعي',
    'app.poweredBy': 'مدعوم من SelectCareOS™',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.analyze': 'تحليل الأعراض',
    'nav.history': 'السجل الصحي',
    'nav.family': 'صحة العائلة',
    'nav.medications': 'الأدوية',
    'nav.appointments': 'المواعيد',
    'nav.settings': 'الإعدادات',
    
    // Analysis Steps
    'step.symptoms': 'اختر الأعراض',
    'step.details': 'تفاصيل الأعراض',
    'step.profile': 'ملفك الشخصي',
    'step.medications': 'الأدوية الحالية',
    'step.analysis': 'تحليل AI',
    'step.results': 'النتائج والتوصيات',
    
    // Symptom Selection
    'symptoms.title': 'ما هي الأعراض التي تعاني منها؟',
    'symptoms.search': 'ابحث عن الأعراض...',
    'symptoms.categories': 'الفئات',
    'symptoms.selected': 'الأعراض المختارة',
    'symptoms.none': 'لم يتم اختيار أعراض',
    'symptoms.add': 'إضافة عرض',
    'symptoms.remove': 'إزالة',
    'symptoms.voiceInput': 'صف أعراضك بالصوت',
    
    // Symptom Details
    'details.title': 'أخبرنا المزيد عن أعراضك',
    'details.severity': 'الشدة',
    'details.severity.mild': 'خفيف',
    'details.severity.moderate': 'معتدل',
    'details.severity.severe': 'شديد',
    'details.severity.critical': 'حرج',
    'details.duration': 'المدة',
    'details.duration.hours': 'ساعات',
    'details.duration.days': 'أيام',
    'details.duration.weeks': 'أسابيع',
    'details.duration.months': 'أشهر',
    'details.duration.years': 'سنوات',
    'details.onset': 'البداية',
    'details.onset.sudden': 'مفاجئ',
    'details.onset.gradual': 'تدريجي',
    'details.frequency': 'التكرار',
    'details.frequency.constant': 'مستمر',
    'details.frequency.intermittent': 'يأتي ويذهب',
    'details.frequency.occasional': 'أحياناً',
    
    // Profile
    'profile.title': 'ملفك الصحي',
    'profile.age': 'العمر',
    'profile.gender': 'الجنس',
    'profile.gender.male': 'ذكر',
    'profile.gender.female': 'أنثى',
    'profile.gender.other': 'آخر',
    'profile.conditions': 'الحالات المرضية السابقة',
    'profile.conditions.add': 'إضافة حالة',
    'profile.allergies': 'الحساسية',
    'profile.allergies.add': 'إضافة حساسية',
    'profile.familyHistory': 'التاريخ الطبي العائلي',
    'profile.lifestyle': 'نمط الحياة',
    'profile.smoking': 'التدخين',
    'profile.alcohol': 'الكحول',
    'profile.exercise': 'مستوى النشاط',
    
    // Medications
    'medications.title': 'الأدوية الحالية',
    'medications.search': 'ابحث عن الأدوية...',
    'medications.add': 'إضافة دواء',
    'medications.none': 'لم تتم إضافة أدوية',
    'medications.interactions': 'التفاعلات الدوائية',
    'medications.warning': 'تحذير',
    
    // Analysis
    'analysis.title': 'تحليل أعراضك',
    'analysis.processing': 'الذكاء الاصطناعي يعالج معلوماتك...',
    'analysis.matching': 'مطابقة الأعراض مع الحالات...',
    'analysis.calculating': 'حساب مستوى الإلحاح...',
    'analysis.generating': 'إنشاء التوصيات...',
    
    // Results
    'results.title': 'نتائج التحليل',
    'results.urgency': 'مستوى الإلحاح',
    'results.confidence': 'درجة الثقة',
    'results.conditions': 'الحالات المحتملة',
    'results.matchScore': 'نسبة التطابق',
    'results.recommendations': 'التوصيات',
    'results.immediate': 'إجراءات فورية',
    'results.shortTerm': 'رعاية قصيرة المدى',
    'results.lifestyle': 'نصائح نمط الحياة',
    'results.specialists': 'الأخصائيون الموصى بهم',
    'results.drugAlerts': 'تنبيهات الأدوية',
    'results.bookAppointment': 'حجز موعد',
    'results.saveResults': 'حفظ النتائج',
    'results.newAnalysis': 'تحليل جديد',
    
    // Urgency Levels
    'urgency.emergency': 'طوارئ',
    'urgency.emergency.action': 'اتصل بخدمات الطوارئ فوراً',
    'urgency.urgent': 'عاجل',
    'urgency.urgent.action': 'راجع الطبيب خلال 24-48 ساعة',
    'urgency.routine': 'روتيني',
    'urgency.routine.action': 'حدد موعداً مع طبيبك',
    'urgency.selfcare': 'رعاية ذاتية',
    'urgency.selfcare.action': 'قد تكون إجراءات الرعاية الذاتية مناسبة',
    
    // Emergency
    'emergency.title': 'تم اكتشاف حالة طوارئ',
    'emergency.callNow': 'اتصل بالطوارئ الآن',
    'emergency.indicators': 'مؤشرات الطوارئ',
    
    // Stats
    'stats.symptoms': 'عرض',
    'stats.conditions': 'حالة',
    'stats.medications': 'دواء',
    'stats.accuracy': 'دقة الفرز',
    'stats.clinicalCases': 'حالة سريرية تم تحليلها',
    
    // Buttons & Actions
    'btn.continue': 'متابعة',
    'btn.back': 'رجوع',
    'btn.analyze': 'تحليل',
    'btn.save': 'حفظ',
    'btn.cancel': 'إلغاء',
    'btn.close': 'إغلاق',
    'btn.startAnalysis': 'بدء التحليل',
    'btn.viewDetails': 'عرض التفاصيل',
    
    // Compliance
    'compliance.hipaa': 'متوافق مع HIPAA',
    'compliance.gdpr': 'متوافق مع GDPR',
    'compliance.icd11': 'متوافق مع ICD-11',
    'compliance.mdReviewed': 'مراجع من قبل أطباء',
    
    // Disclaimer
    'disclaimer.title': 'إخلاء المسؤولية الطبية',
    'disclaimer.text': 'هذا التحليل للأغراض المعلوماتية فقط ولا يشكل نصيحة طبية أو تشخيصًا أو علاجًا. استشر دائمًا مقدم رعاية صحية مؤهل للمخاوف الطبية. في حالة الطوارئ، اتصل بخدمات الطوارئ فورًا.'
  },
  
  de: {
    // App Title & Branding
    'app.title': 'MediSense AI Pro',
    'app.subtitle': 'Intelligenter Symptomanalysator',
    'app.tagline': 'KI-gestützte Gesundheitsbewertung auf Weltniveau',
    'app.poweredBy': 'Unterstützt von SelectCareOS™',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.analyze': 'Symptome analysieren',
    'nav.history': 'Gesundheitsverlauf',
    'nav.family': 'Familiengesundheit',
    'nav.medications': 'Medikamente',
    'nav.appointments': 'Termine',
    'nav.settings': 'Einstellungen',
    
    // Analysis Steps
    'step.symptoms': 'Symptome auswählen',
    'step.details': 'Symptomdetails',
    'step.profile': 'Ihr Profil',
    'step.medications': 'Aktuelle Medikamente',
    'step.analysis': 'KI-Analyse',
    'step.results': 'Ergebnisse & Empfehlungen',
    
    // Symptom Selection
    'symptoms.title': 'Welche Symptome haben Sie?',
    'symptoms.search': 'Symptome suchen...',
    'symptoms.categories': 'Kategorien',
    'symptoms.selected': 'Ausgewählte Symptome',
    'symptoms.none': 'Keine Symptome ausgewählt',
    'symptoms.add': 'Symptom hinzufügen',
    'symptoms.remove': 'Entfernen',
    'symptoms.voiceInput': 'Beschreiben Sie Ihre Symptome per Sprache',
    
    // Symptom Details
    'details.title': 'Erzählen Sie uns mehr über Ihre Symptome',
    'details.severity': 'Schweregrad',
    'details.severity.mild': 'Leicht',
    'details.severity.moderate': 'Mäßig',
    'details.severity.severe': 'Schwer',
    'details.severity.critical': 'Kritisch',
    'details.duration': 'Dauer',
    'details.duration.hours': 'Stunden',
    'details.duration.days': 'Tage',
    'details.duration.weeks': 'Wochen',
    'details.duration.months': 'Monate',
    'details.duration.years': 'Jahre',
    'details.onset': 'Beginn',
    'details.onset.sudden': 'Plötzlich',
    'details.onset.gradual': 'Allmählich',
    'details.frequency': 'Häufigkeit',
    'details.frequency.constant': 'Konstant',
    'details.frequency.intermittent': 'Kommt und geht',
    'details.frequency.occasional': 'Gelegentlich',
    
    // Profile
    'profile.title': 'Ihr Gesundheitsprofil',
    'profile.age': 'Alter',
    'profile.gender': 'Geschlecht',
    'profile.gender.male': 'Männlich',
    'profile.gender.female': 'Weiblich',
    'profile.gender.other': 'Andere',
    'profile.conditions': 'Vorerkrankungen',
    'profile.conditions.add': 'Erkrankung hinzufügen',
    'profile.allergies': 'Allergien',
    'profile.allergies.add': 'Allergie hinzufügen',
    'profile.familyHistory': 'Familienanamnese',
    'profile.lifestyle': 'Lebensstil',
    'profile.smoking': 'Rauchen',
    'profile.alcohol': 'Alkohol',
    'profile.exercise': 'Aktivitätsniveau',
    
    // Medications
    'medications.title': 'Aktuelle Medikamente',
    'medications.search': 'Medikamente suchen...',
    'medications.add': 'Medikament hinzufügen',
    'medications.none': 'Keine Medikamente hinzugefügt',
    'medications.interactions': 'Wechselwirkungen',
    'medications.warning': 'Warnung',
    
    // Analysis
    'analysis.title': 'Analyse Ihrer Symptome',
    'analysis.processing': 'KI verarbeitet Ihre Informationen...',
    'analysis.matching': 'Symptome werden zugeordnet...',
    'analysis.calculating': 'Dringlichkeit wird berechnet...',
    'analysis.generating': 'Empfehlungen werden erstellt...',
    
    // Results
    'results.title': 'Analyseergebnisse',
    'results.urgency': 'Dringlichkeitsstufe',
    'results.confidence': 'Konfidenz',
    'results.conditions': 'Mögliche Erkrankungen',
    'results.matchScore': 'Übereinstimmung',
    'results.recommendations': 'Empfehlungen',
    'results.immediate': 'Sofortige Maßnahmen',
    'results.shortTerm': 'Kurzfristige Pflege',
    'results.lifestyle': 'Lebensstil-Tipps',
    'results.specialists': 'Empfohlene Fachärzte',
    'results.drugAlerts': 'Medikamentenwarnungen',
    'results.bookAppointment': 'Termin buchen',
    'results.saveResults': 'Ergebnisse speichern',
    'results.newAnalysis': 'Neue Analyse',
    
    // Urgency Levels
    'urgency.emergency': 'Notfall',
    'urgency.emergency.action': 'Rufen Sie sofort den Notdienst (112)',
    'urgency.urgent': 'Dringend',
    'urgency.urgent.action': 'Suchen Sie innerhalb von 24-48 Stunden einen Arzt auf',
    'urgency.routine': 'Routine',
    'urgency.routine.action': 'Vereinbaren Sie einen Termin mit Ihrem Arzt',
    'urgency.selfcare': 'Selbstpflege',
    'urgency.selfcare.action': 'Selbstpflegemaßnahmen können angemessen sein',
    
    // Emergency
    'emergency.title': 'Notfall erkannt',
    'emergency.callNow': 'Notdienst anrufen',
    'emergency.indicators': 'Notfallindikatoren',
    
    // Stats
    'stats.symptoms': 'Symptome',
    'stats.conditions': 'Erkrankungen',
    'stats.medications': 'Medikamente',
    'stats.accuracy': 'Triage-Genauigkeit',
    'stats.clinicalCases': 'Analysierte klinische Fälle',
    
    // Buttons & Actions
    'btn.continue': 'Weiter',
    'btn.back': 'Zurück',
    'btn.analyze': 'Analysieren',
    'btn.save': 'Speichern',
    'btn.cancel': 'Abbrechen',
    'btn.close': 'Schließen',
    'btn.startAnalysis': 'Analyse starten',
    'btn.viewDetails': 'Details anzeigen',
    
    // Compliance
    'compliance.hipaa': 'HIPAA-konform',
    'compliance.gdpr': 'DSGVO-konform',
    'compliance.icd11': 'ICD-11 ausgerichtet',
    'compliance.mdReviewed': 'Von Ärzten geprüft',
    
    // Disclaimer
    'disclaimer.title': 'Medizinischer Haftungsausschluss',
    'disclaimer.text': 'Diese Analyse dient nur zu Informationszwecken und stellt keine medizinische Beratung, Diagnose oder Behandlung dar. Konsultieren Sie immer einen qualifizierten Gesundheitsdienstleister bei medizinischen Bedenken. Im Notfall rufen Sie sofort den Notdienst an.'
  },
  
  fr: {
    // App Title & Branding
    'app.title': 'MediSense AI Pro',
    'app.subtitle': 'Analyseur de Symptômes Intelligent',
    'app.tagline': 'Évaluation de santé alimentée par l\'IA',
    'app.poweredBy': 'Propulsé par SelectCareOS™',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.analyze': 'Analyser les symptômes',
    'nav.history': 'Historique de santé',
    'nav.family': 'Santé familiale',
    'nav.medications': 'Médicaments',
    'nav.appointments': 'Rendez-vous',
    'nav.settings': 'Paramètres',
    
    // Analysis Steps
    'step.symptoms': 'Sélectionner les symptômes',
    'step.details': 'Détails des symptômes',
    'step.profile': 'Votre profil',
    'step.medications': 'Médicaments actuels',
    'step.analysis': 'Analyse IA',
    'step.results': 'Résultats & Recommandations',
    
    // Symptom Selection
    'symptoms.title': 'Quels symptômes ressentez-vous ?',
    'symptoms.search': 'Rechercher des symptômes...',
    'symptoms.categories': 'Catégories',
    'symptoms.selected': 'Symptômes sélectionnés',
    'symptoms.none': 'Aucun symptôme sélectionné',
    'symptoms.add': 'Ajouter un symptôme',
    'symptoms.remove': 'Supprimer',
    'symptoms.voiceInput': 'Décrivez vos symptômes par la voix',
    
    // Symptom Details
    'details.title': 'Parlez-nous de vos symptômes',
    'details.severity': 'Gravité',
    'details.severity.mild': 'Légère',
    'details.severity.moderate': 'Modérée',
    'details.severity.severe': 'Sévère',
    'details.severity.critical': 'Critique',
    'details.duration': 'Durée',
    'details.duration.hours': 'Heures',
    'details.duration.days': 'Jours',
    'details.duration.weeks': 'Semaines',
    'details.duration.months': 'Mois',
    'details.duration.years': 'Années',
    'details.onset': 'Début',
    'details.onset.sudden': 'Soudain',
    'details.onset.gradual': 'Progressif',
    'details.frequency': 'Fréquence',
    'details.frequency.constant': 'Constante',
    'details.frequency.intermittent': 'Intermittente',
    'details.frequency.occasional': 'Occasionnelle',
    
    // Profile
    'profile.title': 'Votre profil de santé',
    'profile.age': 'Âge',
    'profile.gender': 'Sexe',
    'profile.gender.male': 'Homme',
    'profile.gender.female': 'Femme',
    'profile.gender.other': 'Autre',
    'profile.conditions': 'Conditions préexistantes',
    'profile.conditions.add': 'Ajouter une condition',
    'profile.allergies': 'Allergies',
    'profile.allergies.add': 'Ajouter une allergie',
    'profile.familyHistory': 'Antécédents familiaux',
    'profile.lifestyle': 'Mode de vie',
    'profile.smoking': 'Tabagisme',
    'profile.alcohol': 'Alcool',
    'profile.exercise': 'Niveau d\'activité',
    
    // Medications
    'medications.title': 'Médicaments actuels',
    'medications.search': 'Rechercher des médicaments...',
    'medications.add': 'Ajouter un médicament',
    'medications.none': 'Aucun médicament ajouté',
    'medications.interactions': 'Interactions médicamenteuses',
    'medications.warning': 'Avertissement',
    
    // Analysis
    'analysis.title': 'Analyse de vos symptômes',
    'analysis.processing': 'L\'IA traite vos informations...',
    'analysis.matching': 'Correspondance des symptômes...',
    'analysis.calculating': 'Calcul du niveau d\'urgence...',
    'analysis.generating': 'Génération des recommandations...',
    
    // Results
    'results.title': 'Résultats de l\'analyse',
    'results.urgency': 'Niveau d\'urgence',
    'results.confidence': 'Confiance',
    'results.conditions': 'Conditions possibles',
    'results.matchScore': 'Score de correspondance',
    'results.recommendations': 'Recommandations',
    'results.immediate': 'Actions immédiates',
    'results.shortTerm': 'Soins à court terme',
    'results.lifestyle': 'Conseils de mode de vie',
    'results.specialists': 'Spécialistes recommandés',
    'results.drugAlerts': 'Alertes médicaments',
    'results.bookAppointment': 'Prendre rendez-vous',
    'results.saveResults': 'Enregistrer les résultats',
    'results.newAnalysis': 'Nouvelle analyse',
    
    // Urgency Levels
    'urgency.emergency': 'Urgence',
    'urgency.emergency.action': 'Appelez les services d\'urgence (15/112) immédiatement',
    'urgency.urgent': 'Urgent',
    'urgency.urgent.action': 'Consultez un médecin dans les 24-48 heures',
    'urgency.routine': 'Routine',
    'urgency.routine.action': 'Prenez rendez-vous avec votre médecin',
    'urgency.selfcare': 'Auto-soins',
    'urgency.selfcare.action': 'Les mesures d\'auto-soins peuvent être appropriées',
    
    // Emergency
    'emergency.title': 'Urgence détectée',
    'emergency.callNow': 'Appeler les urgences',
    'emergency.indicators': 'Indicateurs d\'urgence',
    
    // Stats
    'stats.symptoms': 'Symptômes',
    'stats.conditions': 'Conditions',
    'stats.medications': 'Médicaments',
    'stats.accuracy': 'Précision du triage',
    'stats.clinicalCases': 'Cas cliniques analysés',
    
    // Buttons & Actions
    'btn.continue': 'Continuer',
    'btn.back': 'Retour',
    'btn.analyze': 'Analyser',
    'btn.save': 'Enregistrer',
    'btn.cancel': 'Annuler',
    'btn.close': 'Fermer',
    'btn.startAnalysis': 'Démarrer l\'analyse',
    'btn.viewDetails': 'Voir les détails',
    
    // Compliance
    'compliance.hipaa': 'Conforme HIPAA',
    'compliance.gdpr': 'Conforme RGPD',
    'compliance.icd11': 'Aligné ICD-11',
    'compliance.mdReviewed': 'Revu par des médecins',
    
    // Disclaimer
    'disclaimer.title': 'Avertissement médical',
    'disclaimer.text': 'Cette analyse est à titre informatif uniquement et ne constitue pas un avis médical, un diagnostic ou un traitement. Consultez toujours un professionnel de santé qualifié pour les préoccupations médicales. En cas d\'urgence, appelez immédiatement les services d\'urgence.'
  }
}

// Translation helper function
export function t(key: string, language: SupportedLanguage = 'en'): string {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key
}

// Get language direction
export function getDirection(language: SupportedLanguage): 'ltr' | 'rtl' {
  return LANGUAGE_CONFIG[language]?.dir || 'ltr'
}

// Format number based on locale
export function formatNumber(num: number, language: SupportedLanguage): string {
  const locale = LANGUAGE_CONFIG[language]?.locale || 'en-US'
  return new Intl.NumberFormat(locale).format(num)
}

// Format percentage
export function formatPercentage(num: number, language: SupportedLanguage): string {
  const locale = LANGUAGE_CONFIG[language]?.locale || 'en-US'
  return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(num / 100)
}

// Format date based on locale
export function formatDate(date: Date, language: SupportedLanguage): string {
  const locale = LANGUAGE_CONFIG[language]?.locale || 'en-US'
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

console.log('MediSense AI Pro™ i18n loaded with', Object.keys(LANGUAGE_CONFIG).length, 'languages')
