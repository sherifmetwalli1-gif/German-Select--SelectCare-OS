/**
 * SelectCareOS™ Dashboard Multi-Language Support (i18n)
 * Comprehensive translations for Patient Dashboard & Premium Home
 * Supports: English (EN), Arabic (AR), German (DE), French (FR)
 * 
 * Features:
 * - Complete UI translations
 * - RTL support for Arabic
 * - Localized date/number formatting
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

export const DASHBOARD_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Header & Navigation
    'header.patientPortal': 'Patient Portal',
    'header.notifications': 'Notifications',
    'header.settings': 'Settings',
    
    // Tab Navigation
    'nav.overview': 'Overview',
    'nav.calculators': 'Health Calculators',
    'nav.journey': 'My Journey',
    'nav.vitals': 'Vitals & Metrics',
    'nav.appointments': 'Appointments',
    'nav.home': 'Home',
    'nav.wellness': 'Wellness',
    'nav.rewards': 'Rewards',
    'nav.shop': 'Shop',
    'nav.profile': 'Profile',
    
    // Welcome Section
    'welcome.back': 'Welcome back,',
    'welcome.nextAppointment': 'Your next appointment is in',
    'welcome.days': 'days',
    'welcome.journeyProgress': 'Journey Progress',
    
    // Quick Stats
    'stats.heartRate': 'Heart Rate (bpm)',
    'stats.weight': 'Weight (kg)',
    'stats.stepsToday': 'Steps Today',
    'stats.spO2': 'SpO2 (%)',
    'stats.normal': 'Normal',
    'stats.low': 'Low',
    'stats.high': 'High',
    
    // Health Calculators
    'calc.bmi': 'BMI Calculator',
    'calc.bmiDesc': 'Calculate your Body Mass Index and understand your weight category',
    'calc.bodyFat': 'Body Fat Estimator',
    'calc.bodyFatDesc': 'Estimate your body fat percentage using the U.S. Navy method',
    'calc.anesthesiaRisk': 'Anesthesia Risk Assessment',
    'calc.anesthesiaRiskDesc': 'ASA Physical Status Classification for surgical risk',
    'calc.recovery': 'Recovery Time Estimator',
    'calc.recoveryDesc': 'Estimate your surgical recovery timeline',
    'calc.costSavings': 'Cost & Savings Calculator',
    'calc.costSavingsDesc': 'Compare treatment costs between Germany, Turkey, and SelectCare',
    'calc.idealWeight': 'Ideal Weight Calculator',
    'calc.idealWeightDesc': 'Calculate your ideal weight using multiple formulas',
    'calc.calorie': 'Calorie & TDEE Calculator',
    'calc.calorieDesc': 'Calculate daily calorie needs',
    
    // Journey Section
    'journey.title': 'Your Medical Journey',
    'journey.phase': 'Current Phase',
    'journey.virtualPrep': 'Virtual Preparation',
    'journey.surgery': 'Surgery & Recovery',
    'journey.followUp': 'Follow-Up Care',
    'journey.completed': 'Completed',
    'journey.inProgress': 'In Progress',
    'journey.upcoming': 'Upcoming',
    'journey.week': 'Week',
    'journey.of': 'of',
    
    // Premium Home
    'premium.selectPoints': 'SelectPoints',
    'premium.elite': 'Elite',
    'premium.plus': 'Plus',
    'premium.patient': 'Patient',
    'premium.earning': 'earning',
    'premium.doublePoints': '2x SelectPoints',
    'premium.day': 'Day',
    'premium.recovery': 'Recovery',
    'premium.postOp': 'Post-Op',
    'premium.physicalRecovery': 'Physical Recovery',
    'premium.weightGoal': 'Weight Goal',
    'premium.milestone': 'Milestone reached!',
    'premium.fasterThanAvg': 'faster than average',
    'premium.earned': 'earned',
    'premium.dayStreak': 'Day Streak',
    'premium.dailyTasks': 'Daily Tasks',
    'premium.liveMetrics': 'Live Health Metrics',
    'premium.synced': 'Synced',
    'premium.ago': 'ago',
    
    // Care Team
    'team.title': 'Your Care Team',
    'team.viewAll': 'View All',
    'team.online': 'Online',
    'team.offline': 'Offline',
    'team.busy': 'Busy',
    'team.addSpecialist': 'Add Specialist',
    
    // Wellness
    'wellness.title': 'Enhance Your Recovery',
    'wellness.exclusive': 'EXCLUSIVE',
    'wellness.retreat': 'Red Sea Recovery Retreat',
    'wellness.retreatDesc': '7 days of therapeutic wellness in Hurghada',
    'wellness.save': 'Save',
    'wellness.learnMore': 'Learn More',
    
    // Family Hub
    'family.title': 'Family Health Hub',
    'family.members': 'Family Members',
    'family.planIncludes': 'Plus plan includes up to',
    'family.healthy': 'Healthy',
    'family.appointments': 'Appointments',
    'family.familyPts': 'Family Pts',
    'family.manage': 'Manage Family',
    
    // Referral
    'referral.title': 'Share & Earn',
    'referral.desc': 'Refer friends, earn',
    'referral.each': 'each',
    'referral.friends': 'friends referred',
    'referral.earned': 'earned',
    
    // Buttons & Actions
    'btn.add': 'Add',
    'btn.book': 'Book',
    'btn.continue': 'Continue',
    'btn.viewDetails': 'View Details',
    'btn.calculate': 'Calculate',
    
    // AI Concierge
    'ai.title': 'AI Health Concierge',
    
    // Language
    'lang.select': 'Select Language',
    'lang.change': 'Change Language'
  },
  
  ar: {
    // Header & Navigation
    'header.patientPortal': 'بوابة المريض',
    'header.notifications': 'الإشعارات',
    'header.settings': 'الإعدادات',
    
    // Tab Navigation
    'nav.overview': 'نظرة عامة',
    'nav.calculators': 'حاسبات الصحة',
    'nav.journey': 'رحلتي',
    'nav.vitals': 'المؤشرات الحيوية',
    'nav.appointments': 'المواعيد',
    'nav.home': 'الرئيسية',
    'nav.wellness': 'العافية',
    'nav.rewards': 'المكافآت',
    'nav.shop': 'المتجر',
    'nav.profile': 'الملف الشخصي',
    
    // Welcome Section
    'welcome.back': 'أهلاً بعودتك،',
    'welcome.nextAppointment': 'موعدك القادم بعد',
    'welcome.days': 'أيام',
    'welcome.journeyProgress': 'تقدم الرحلة',
    
    // Quick Stats
    'stats.heartRate': 'نبضات القلب',
    'stats.weight': 'الوزن (كغ)',
    'stats.stepsToday': 'خطوات اليوم',
    'stats.spO2': 'تشبع الأكسجين',
    'stats.normal': 'طبيعي',
    'stats.low': 'منخفض',
    'stats.high': 'مرتفع',
    
    // Health Calculators
    'calc.bmi': 'حاسبة كتلة الجسم',
    'calc.bmiDesc': 'احسب مؤشر كتلة جسمك وافهم فئة وزنك',
    'calc.bodyFat': 'مقدر دهون الجسم',
    'calc.bodyFatDesc': 'قدر نسبة دهون جسمك بطريقة البحرية الأمريكية',
    'calc.anesthesiaRisk': 'تقييم مخاطر التخدير',
    'calc.anesthesiaRiskDesc': 'تصنيف الحالة الجسدية ASA للمخاطر الجراحية',
    'calc.recovery': 'مقدر وقت التعافي',
    'calc.recoveryDesc': 'قدر جدولك الزمني للتعافي الجراحي',
    'calc.costSavings': 'حاسبة التكاليف والتوفير',
    'calc.costSavingsDesc': 'قارن تكاليف العلاج بين ألمانيا وتركيا وسيليكت كير',
    'calc.idealWeight': 'حاسبة الوزن المثالي',
    'calc.idealWeightDesc': 'احسب وزنك المثالي باستخدام صيغ متعددة',
    'calc.calorie': 'حاسبة السعرات الحرارية',
    'calc.calorieDesc': 'احسب احتياجاتك اليومية من السعرات',
    
    // Journey Section
    'journey.title': 'رحلتك الطبية',
    'journey.phase': 'المرحلة الحالية',
    'journey.virtualPrep': 'التحضير الافتراضي',
    'journey.surgery': 'الجراحة والتعافي',
    'journey.followUp': 'متابعة الرعاية',
    'journey.completed': 'مكتمل',
    'journey.inProgress': 'قيد التنفيذ',
    'journey.upcoming': 'قادم',
    'journey.week': 'الأسبوع',
    'journey.of': 'من',
    
    // Premium Home
    'premium.selectPoints': 'نقاط سيليكت',
    'premium.elite': 'النخبة',
    'premium.plus': 'بلس',
    'premium.patient': 'مريض',
    'premium.earning': 'يكسب',
    'premium.doublePoints': 'نقاط مضاعفة',
    'premium.day': 'يوم',
    'premium.recovery': 'التعافي',
    'premium.postOp': 'بعد العملية',
    'premium.physicalRecovery': 'التعافي الجسدي',
    'premium.weightGoal': 'هدف الوزن',
    'premium.milestone': 'تم تحقيق إنجاز!',
    'premium.fasterThanAvg': 'أسرع من المتوسط',
    'premium.earned': 'مكتسب',
    'premium.dayStreak': 'أيام متتالية',
    'premium.dailyTasks': 'مهام اليوم',
    'premium.liveMetrics': 'المؤشرات الحية',
    'premium.synced': 'تمت المزامنة',
    'premium.ago': 'مضت',
    
    // Care Team
    'team.title': 'فريق الرعاية',
    'team.viewAll': 'عرض الكل',
    'team.online': 'متصل',
    'team.offline': 'غير متصل',
    'team.busy': 'مشغول',
    'team.addSpecialist': 'إضافة أخصائي',
    
    // Wellness
    'wellness.title': 'عزز تعافيك',
    'wellness.exclusive': 'حصري',
    'wellness.retreat': 'منتجع التعافي بالبحر الأحمر',
    'wellness.retreatDesc': '7 أيام من العافية العلاجية في الغردقة',
    'wellness.save': 'وفر',
    'wellness.learnMore': 'اعرف المزيد',
    
    // Family Hub
    'family.title': 'مركز صحة العائلة',
    'family.members': 'أفراد العائلة',
    'family.planIncludes': 'خطة بلس تشمل حتى',
    'family.healthy': 'بصحة جيدة',
    'family.appointments': 'المواعيد',
    'family.familyPts': 'نقاط العائلة',
    'family.manage': 'إدارة العائلة',
    
    // Referral
    'referral.title': 'شارك واربح',
    'referral.desc': 'ادعُ أصدقاءك واربح',
    'referral.each': 'لكل واحد',
    'referral.friends': 'أصدقاء تمت دعوتهم',
    'referral.earned': 'مكتسب',
    
    // Buttons & Actions
    'btn.add': 'إضافة',
    'btn.book': 'حجز',
    'btn.continue': 'متابعة',
    'btn.viewDetails': 'عرض التفاصيل',
    'btn.calculate': 'احسب',
    
    // AI Concierge
    'ai.title': 'مساعد الصحة الذكي',
    
    // Language
    'lang.select': 'اختر اللغة',
    'lang.change': 'تغيير اللغة'
  },
  
  de: {
    // Header & Navigation
    'header.patientPortal': 'Patientenportal',
    'header.notifications': 'Benachrichtigungen',
    'header.settings': 'Einstellungen',
    
    // Tab Navigation
    'nav.overview': 'Übersicht',
    'nav.calculators': 'Gesundheitsrechner',
    'nav.journey': 'Meine Reise',
    'nav.vitals': 'Vitalwerte',
    'nav.appointments': 'Termine',
    'nav.home': 'Start',
    'nav.wellness': 'Wellness',
    'nav.rewards': 'Prämien',
    'nav.shop': 'Shop',
    'nav.profile': 'Profil',
    
    // Welcome Section
    'welcome.back': 'Willkommen zurück,',
    'welcome.nextAppointment': 'Ihr nächster Termin ist in',
    'welcome.days': 'Tagen',
    'welcome.journeyProgress': 'Reisefortschritt',
    
    // Quick Stats
    'stats.heartRate': 'Herzfrequenz (bpm)',
    'stats.weight': 'Gewicht (kg)',
    'stats.stepsToday': 'Schritte heute',
    'stats.spO2': 'SpO2 (%)',
    'stats.normal': 'Normal',
    'stats.low': 'Niedrig',
    'stats.high': 'Hoch',
    
    // Health Calculators
    'calc.bmi': 'BMI-Rechner',
    'calc.bmiDesc': 'Berechnen Sie Ihren Body-Mass-Index',
    'calc.bodyFat': 'Körperfettschätzer',
    'calc.bodyFatDesc': 'Schätzen Sie Ihren Körperfettanteil',
    'calc.anesthesiaRisk': 'Anästhesie-Risikobewertung',
    'calc.anesthesiaRiskDesc': 'ASA-Klassifikation für OP-Risiko',
    'calc.recovery': 'Genesungszeit-Schätzer',
    'calc.recoveryDesc': 'Schätzen Sie Ihre Genesungszeit',
    'calc.costSavings': 'Kosten- & Sparrechner',
    'calc.costSavingsDesc': 'Vergleichen Sie Behandlungskosten',
    'calc.idealWeight': 'Idealgewicht-Rechner',
    'calc.idealWeightDesc': 'Berechnen Sie Ihr Idealgewicht',
    'calc.calorie': 'Kalorienrechner',
    'calc.calorieDesc': 'Berechnen Sie Ihren Kalorienbedarf',
    
    // Journey Section
    'journey.title': 'Ihre medizinische Reise',
    'journey.phase': 'Aktuelle Phase',
    'journey.virtualPrep': 'Virtuelle Vorbereitung',
    'journey.surgery': 'Operation & Genesung',
    'journey.followUp': 'Nachsorge',
    'journey.completed': 'Abgeschlossen',
    'journey.inProgress': 'In Bearbeitung',
    'journey.upcoming': 'Anstehend',
    'journey.week': 'Woche',
    'journey.of': 'von',
    
    // Premium Home
    'premium.selectPoints': 'SelectPoints',
    'premium.elite': 'Elite',
    'premium.plus': 'Plus',
    'premium.patient': 'Patient',
    'premium.earning': 'verdient',
    'premium.doublePoints': '2x SelectPoints',
    'premium.day': 'Tag',
    'premium.recovery': 'Genesung',
    'premium.postOp': 'Nach-OP',
    'premium.physicalRecovery': 'Körperliche Erholung',
    'premium.weightGoal': 'Gewichtsziel',
    'premium.milestone': 'Meilenstein erreicht!',
    'premium.fasterThanAvg': 'schneller als Durchschnitt',
    'premium.earned': 'verdient',
    'premium.dayStreak': 'Tage-Serie',
    'premium.dailyTasks': 'Tägliche Aufgaben',
    'premium.liveMetrics': 'Live-Gesundheitswerte',
    'premium.synced': 'Synchronisiert',
    'premium.ago': 'vor',
    
    // Care Team
    'team.title': 'Ihr Pflegeteam',
    'team.viewAll': 'Alle anzeigen',
    'team.online': 'Online',
    'team.offline': 'Offline',
    'team.busy': 'Beschäftigt',
    'team.addSpecialist': 'Spezialist hinzufügen',
    
    // Wellness
    'wellness.title': 'Verbessern Sie Ihre Genesung',
    'wellness.exclusive': 'EXKLUSIV',
    'wellness.retreat': 'Rotes Meer Erholungsretreat',
    'wellness.retreatDesc': '7 Tage therapeutisches Wellness in Hurghada',
    'wellness.save': 'Sparen',
    'wellness.learnMore': 'Mehr erfahren',
    
    // Family Hub
    'family.title': 'Familiengesundheit',
    'family.members': 'Familienmitglieder',
    'family.planIncludes': 'Plus-Plan enthält bis zu',
    'family.healthy': 'Gesund',
    'family.appointments': 'Termine',
    'family.familyPts': 'Familien-Pkt',
    'family.manage': 'Familie verwalten',
    
    // Referral
    'referral.title': 'Teilen & Verdienen',
    'referral.desc': 'Freunde empfehlen, verdienen',
    'referral.each': 'jeweils',
    'referral.friends': 'Freunde empfohlen',
    'referral.earned': 'verdient',
    
    // Buttons & Actions
    'btn.add': 'Hinzufügen',
    'btn.book': 'Buchen',
    'btn.continue': 'Weiter',
    'btn.viewDetails': 'Details ansehen',
    'btn.calculate': 'Berechnen',
    
    // AI Concierge
    'ai.title': 'KI-Gesundheitsassistent',
    
    // Language
    'lang.select': 'Sprache wählen',
    'lang.change': 'Sprache ändern'
  },
  
  fr: {
    // Header & Navigation
    'header.patientPortal': 'Portail Patient',
    'header.notifications': 'Notifications',
    'header.settings': 'Paramètres',
    
    // Tab Navigation
    'nav.overview': 'Aperçu',
    'nav.calculators': 'Calculateurs de Santé',
    'nav.journey': 'Mon Parcours',
    'nav.vitals': 'Signes Vitaux',
    'nav.appointments': 'Rendez-vous',
    'nav.home': 'Accueil',
    'nav.wellness': 'Bien-être',
    'nav.rewards': 'Récompenses',
    'nav.shop': 'Boutique',
    'nav.profile': 'Profil',
    
    // Welcome Section
    'welcome.back': 'Bon retour,',
    'welcome.nextAppointment': 'Votre prochain rendez-vous est dans',
    'welcome.days': 'jours',
    'welcome.journeyProgress': 'Progression du Parcours',
    
    // Quick Stats
    'stats.heartRate': 'Rythme Cardiaque (bpm)',
    'stats.weight': 'Poids (kg)',
    'stats.stepsToday': 'Pas Aujourd\'hui',
    'stats.spO2': 'SpO2 (%)',
    'stats.normal': 'Normal',
    'stats.low': 'Bas',
    'stats.high': 'Élevé',
    
    // Health Calculators
    'calc.bmi': 'Calculateur IMC',
    'calc.bmiDesc': 'Calculez votre indice de masse corporelle',
    'calc.bodyFat': 'Estimateur Graisse Corporelle',
    'calc.bodyFatDesc': 'Estimez votre pourcentage de graisse',
    'calc.anesthesiaRisk': 'Évaluation Risque Anesthésie',
    'calc.anesthesiaRiskDesc': 'Classification ASA pour risque chirurgical',
    'calc.recovery': 'Estimateur Temps de Récupération',
    'calc.recoveryDesc': 'Estimez votre temps de récupération',
    'calc.costSavings': 'Calculateur Coûts & Économies',
    'calc.costSavingsDesc': 'Comparez les coûts de traitement',
    'calc.idealWeight': 'Calculateur Poids Idéal',
    'calc.idealWeightDesc': 'Calculez votre poids idéal',
    'calc.calorie': 'Calculateur Calories',
    'calc.calorieDesc': 'Calculez vos besoins caloriques',
    
    // Journey Section
    'journey.title': 'Votre Parcours Médical',
    'journey.phase': 'Phase Actuelle',
    'journey.virtualPrep': 'Préparation Virtuelle',
    'journey.surgery': 'Chirurgie & Récupération',
    'journey.followUp': 'Suivi',
    'journey.completed': 'Terminé',
    'journey.inProgress': 'En Cours',
    'journey.upcoming': 'À Venir',
    'journey.week': 'Semaine',
    'journey.of': 'sur',
    
    // Premium Home
    'premium.selectPoints': 'SelectPoints',
    'premium.elite': 'Élite',
    'premium.plus': 'Plus',
    'premium.patient': 'Patient',
    'premium.earning': 'gagne',
    'premium.doublePoints': '2x SelectPoints',
    'premium.day': 'Jour',
    'premium.recovery': 'Récupération',
    'premium.postOp': 'Post-Op',
    'premium.physicalRecovery': 'Récupération Physique',
    'premium.weightGoal': 'Objectif Poids',
    'premium.milestone': 'Jalon atteint!',
    'premium.fasterThanAvg': 'plus rapide que la moyenne',
    'premium.earned': 'gagné',
    'premium.dayStreak': 'Jours Consécutifs',
    'premium.dailyTasks': 'Tâches Quotidiennes',
    'premium.liveMetrics': 'Métriques de Santé en Direct',
    'premium.synced': 'Synchronisé',
    'premium.ago': 'il y a',
    
    // Care Team
    'team.title': 'Votre Équipe de Soins',
    'team.viewAll': 'Voir Tout',
    'team.online': 'En Ligne',
    'team.offline': 'Hors Ligne',
    'team.busy': 'Occupé',
    'team.addSpecialist': 'Ajouter Spécialiste',
    
    // Wellness
    'wellness.title': 'Améliorez Votre Récupération',
    'wellness.exclusive': 'EXCLUSIF',
    'wellness.retreat': 'Retraite Récupération Mer Rouge',
    'wellness.retreatDesc': '7 jours de bien-être thérapeutique à Hurghada',
    'wellness.save': 'Économisez',
    'wellness.learnMore': 'En Savoir Plus',
    
    // Family Hub
    'family.title': 'Centre Santé Familiale',
    'family.members': 'Membres de la Famille',
    'family.planIncludes': 'Le plan Plus inclut jusqu\'à',
    'family.healthy': 'En Bonne Santé',
    'family.appointments': 'Rendez-vous',
    'family.familyPts': 'Pts Famille',
    'family.manage': 'Gérer Famille',
    
    // Referral
    'referral.title': 'Partagez & Gagnez',
    'referral.desc': 'Parrainez des amis, gagnez',
    'referral.each': 'chacun',
    'referral.friends': 'amis parrainés',
    'referral.earned': 'gagné',
    
    // Buttons & Actions
    'btn.add': 'Ajouter',
    'btn.book': 'Réserver',
    'btn.continue': 'Continuer',
    'btn.viewDetails': 'Voir Détails',
    'btn.calculate': 'Calculer',
    
    // AI Concierge
    'ai.title': 'Assistant Santé IA',
    
    // Language
    'lang.select': 'Choisir la Langue',
    'lang.change': 'Changer de Langue'
  }
}

// Translation helper function
export function t(key: string, language: SupportedLanguage = 'en'): string {
  return DASHBOARD_TRANSLATIONS[language]?.[key] || DASHBOARD_TRANSLATIONS.en[key] || key
}

// Get language direction
export function getDirection(language: SupportedLanguage): 'ltr' | 'rtl' {
  return LANGUAGE_CONFIG[language]?.dir || 'ltr'
}

// Generate language selector HTML
export function generateLanguageSelector(currentLang: SupportedLanguage = 'en'): string {
  const options = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => {
      const selected = code === currentLang ? 'selected' : ''
      return `<option value="${code}" ${selected}>${config.flag} ${config.nativeName}</option>`
    })
    .join('')

  return `
    <select id="languageSelect" onchange="changeLanguage(this.value)" 
            class="appearance-none bg-white/10 text-white px-3 py-1.5 pr-8 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition border border-white/20">
      ${options}
    </select>
  `
}

// Generate language change script
export function generateLanguageScript(): string {
  return `
    function changeLanguage(lang) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.location.href = url.toString();
    }
    
    // Store language preference
    function saveLanguagePreference(lang) {
      localStorage.setItem('selectcare-language', lang);
    }
    
    // Get stored language preference
    function getStoredLanguage() {
      return localStorage.getItem('selectcare-language') || 'en';
    }
    
    // Initialize language on page load
    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang) {
        saveLanguagePreference(urlLang);
      }
    });
  `
}

console.log('SelectCareOS™ Dashboard i18n loaded with', Object.keys(LANGUAGE_CONFIG).length, 'languages')
