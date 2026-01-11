/**
 * Instant Doctor Access - 24/7 Emergency Medical Consultation
 * SelectCareOS™ Branding - Inspired by SurgeryBridge doctor-availability
 * 
 * Features:
 * - Real-time doctor availability display
 * - Instant video consultation booking
 * - Queue management system
 * - Multi-language support
 * - Emergency priority escalation
 */

import { Context } from 'hono'

// Complete German Select Medical Team for Instant Consultations
// Source: www.germanselect.org/our-team/
const INSTANT_DOCTORS = [
  // FOUNDERS & LEADERSHIP
  {
    id: 'dr-metwalli',
    name: 'Dr. med. Sherif Akram Metwalli, M.Sc.',
    title: 'Founder, CEO & CMO',
    specialization: 'Plastic & Reconstructive Surgery',
    avatar: 'SM',
    languages: ['German', 'English', 'Arabic'],
    rating: 4.9,
    reviews: 247,
    available: true,
    status: 'online',
    nextAvailable: null,
    consultations_today: 12
  },
  // CHIEF BARIATRIC SURGEON
  {
    id: 'dr-sherif-aly',
    name: 'Dr. Sherif Aly, FACS',
    title: 'Chief Consultant Bariatric Surgery',
    specialization: 'Bariatric Surgery',
    avatar: 'SA',
    languages: ['German', 'English', 'Arabic'],
    rating: 4.95,
    reviews: 487,
    available: true,
    status: 'online',
    nextAvailable: null,
    consultations_today: 18
  },
  // GENERAL SURGERY
  {
    id: 'dr-hesham-elzahi',
    name: 'Dr. Hesham El Zahi',
    title: 'Consultant General Surgery',
    specialization: 'General & GI Surgery',
    avatar: 'HE',
    languages: ['German', 'English', 'Arabic'],
    rating: 4.8,
    reviews: 156,
    available: true,
    status: 'busy',
    nextAvailable: '10 min',
    consultations_today: 9
  },
  // CARDIOLOGY
  {
    id: 'dr-muller',
    name: 'Dr. K. Müller',
    title: 'Assoc. Prof., Deputy Head of Cardiology',
    specialization: 'Cardiology',
    avatar: 'KM',
    languages: ['German', 'English'],
    rating: 4.9,
    reviews: 156,
    available: true,
    status: 'busy',
    nextAvailable: '5 min',
    consultations_today: 8
  },
  // ORTHOPEDICS
  {
    id: 'dr-weber',
    name: 'Dr. L. Weber',
    title: 'Senior Consultant, Head of Arthroscopy Unit',
    specialization: 'Orthopedics',
    avatar: 'LW',
    languages: ['German', 'English'],
    rating: 4.8,
    reviews: 189,
    available: true,
    status: 'online',
    nextAvailable: null,
    consultations_today: 10
  },
  // ANESTHESIA
  {
    id: 'dr-koch',
    name: 'Dr. P. Koch',
    title: 'Dept. Head Anesthesia & Pain Management',
    specialization: 'Anesthesia & Pain Management',
    avatar: 'PK',
    languages: ['German', 'English'],
    rating: 4.9,
    reviews: 98,
    available: false,
    status: 'offline',
    nextAvailable: '2 hours',
    consultations_today: 6
  },
  {
    id: 'dr-hoffmann',
    name: 'Dr. J. Hoffmann',
    title: 'Consultant',
    specialization: 'Internal Medicine & Gastroenterology',
    avatar: 'JH',
    languages: ['German', 'English'],
    rating: 4.7,
    reviews: 167,
    available: true,
    status: 'online',
    nextAvailable: null,
    consultations_today: 11
  }
];

// Queue stats simulation
const QUEUE_STATS = {
  avgWaitTime: '1:45',
  doctorsOnline: INSTANT_DOCTORS.filter(d => d.status === 'online').length,
  doctorsBusy: INSTANT_DOCTORS.filter(d => d.status === 'busy').length,
  patientsInQueue: 3,
  consultationsToday: 247
};

export function instantDoctorPage(c: Context): string {
  const lang = c.req.query('lang') || 'en';
  
  // Translations
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'Instant Doctor Access',
      subtitle: 'Connect with a qualified doctor in under 2 minutes, 24/7',
      avgWaitTime: 'Avg. Wait Time',
      doctorsOnline: 'Doctors Online',
      patientsInQueue: 'In Queue',
      consultationsToday: 'Consultations Today',
      instantConnect: 'Instant Connect',
      instantConnectDesc: 'Get matched with the next available doctor automatically',
      connectNow: 'Connect Now',
      perSession: 'per 30 min session',
      guaranteedResponse: 'Guaranteed response time',
      underMinutes: 'Under 2 Minutes',
      boardCertified: 'Board Certified',
      boardCertifiedDesc: 'All German-qualified doctors',
      multiLanguage: 'Multi-Language',
      multiLanguageDesc: 'EN, DE, AR, FR supported',
      howItWorks: 'How 24/7 Access Works',
      step1Title: 'Click Connect',
      step1Desc: 'Choose instant connect or select a specific doctor',
      step2Title: 'Smart Matching',
      step2Desc: 'Our AI matches you with the best available doctor',
      step3Title: 'Video Consultation',
      step3Desc: 'Connect via HD video in under 2 minutes',
      step4Title: 'Prescription & Records',
      step4Desc: 'Get prescriptions and records instantly',
      availableDoctors: 'Available Doctors',
      selectDoctor: 'Select a Doctor',
      viewProfile: 'View Profile',
      bookNow: 'Book Now',
      online: 'Online',
      busy: 'Busy',
      offline: 'Offline',
      available: 'Available',
      nextAvailable: 'Available in',
      reviews: 'reviews',
      languages: 'Languages',
      emergency: 'Emergency',
      emergencyDesc: 'Life-threatening situation?',
      emergencyCall: 'Call Emergency',
      emergencyNote: 'For immediate medical emergencies, call local emergency services',
      consultationFee: 'Consultation Fee',
      freeForMembers: 'Free for SelectCare+ members'
    },
    de: {
      title: 'Sofort-Arzt-Zugang',
      subtitle: 'Verbinden Sie sich in unter 2 Minuten mit einem qualifizierten Arzt, 24/7',
      avgWaitTime: 'Durchschn. Wartezeit',
      doctorsOnline: 'Ärzte Online',
      patientsInQueue: 'In Warteschlange',
      consultationsToday: 'Konsultationen Heute',
      instantConnect: 'Sofort Verbinden',
      instantConnectDesc: 'Automatisch mit dem nächsten verfügbaren Arzt verbunden werden',
      connectNow: 'Jetzt Verbinden',
      perSession: 'pro 30 Min. Sitzung',
      guaranteedResponse: 'Garantierte Reaktionszeit',
      underMinutes: 'Unter 2 Minuten',
      boardCertified: 'Board Certified',
      boardCertifiedDesc: 'Alle deutsch-qualifizierten Ärzte',
      multiLanguage: 'Mehrsprachig',
      multiLanguageDesc: 'EN, DE, AR, FR unterstützt',
      howItWorks: 'Wie 24/7-Zugang funktioniert',
      step1Title: 'Klicken Sie Verbinden',
      step1Desc: 'Wählen Sie Sofortverbindung oder einen bestimmten Arzt',
      step2Title: 'Intelligente Zuordnung',
      step2Desc: 'Unsere KI verbindet Sie mit dem besten verfügbaren Arzt',
      step3Title: 'Video-Konsultation',
      step3Desc: 'Verbinden Sie sich per HD-Video in unter 2 Minuten',
      step4Title: 'Rezept & Unterlagen',
      step4Desc: 'Erhalten Sie Rezepte und Unterlagen sofort',
      availableDoctors: 'Verfügbare Ärzte',
      selectDoctor: 'Wählen Sie einen Arzt',
      viewProfile: 'Profil ansehen',
      bookNow: 'Jetzt buchen',
      online: 'Online',
      busy: 'Beschäftigt',
      offline: 'Offline',
      available: 'Verfügbar',
      nextAvailable: 'Verfügbar in',
      reviews: 'Bewertungen',
      languages: 'Sprachen',
      emergency: 'Notfall',
      emergencyDesc: 'Lebensbedrohliche Situation?',
      emergencyCall: 'Notfall anrufen',
      emergencyNote: 'Bei sofortigen medizinischen Notfällen rufen Sie den lokalen Notdienst an',
      consultationFee: 'Konsultationsgebühr',
      freeForMembers: 'Kostenlos für SelectCare+ Mitglieder'
    },
    ar: {
      title: 'الوصول الفوري للطبيب',
      subtitle: 'تواصل مع طبيب مؤهل في أقل من دقيقتين، على مدار الساعة',
      avgWaitTime: 'متوسط وقت الانتظار',
      doctorsOnline: 'أطباء متصلين',
      patientsInQueue: 'في الانتظار',
      consultationsToday: 'استشارات اليوم',
      instantConnect: 'اتصال فوري',
      instantConnectDesc: 'يتم ربطك تلقائياً بالطبيب المتاح التالي',
      connectNow: 'اتصل الآن',
      perSession: 'لكل جلسة 30 دقيقة',
      guaranteedResponse: 'وقت استجابة مضمون',
      underMinutes: 'أقل من دقيقتين',
      boardCertified: 'معتمد من البورد',
      boardCertifiedDesc: 'جميع الأطباء مؤهلين ألمانياً',
      multiLanguage: 'متعدد اللغات',
      multiLanguageDesc: 'يدعم EN, DE, AR, FR',
      howItWorks: 'كيف يعمل الوصول على مدار الساعة',
      step1Title: 'انقر اتصال',
      step1Desc: 'اختر الاتصال الفوري أو اختر طبيباً محدداً',
      step2Title: 'مطابقة ذكية',
      step2Desc: 'يربطك الذكاء الاصطناعي لدينا بأفضل طبيب متاح',
      step3Title: 'استشارة فيديو',
      step3Desc: 'تواصل عبر فيديو عالي الدقة في أقل من دقيقتين',
      step4Title: 'الوصفات والسجلات',
      step4Desc: 'احصل على الوصفات والسجلات فوراً',
      availableDoctors: 'الأطباء المتاحون',
      selectDoctor: 'اختر طبيباً',
      viewProfile: 'عرض الملف',
      bookNow: 'احجز الآن',
      online: 'متصل',
      busy: 'مشغول',
      offline: 'غير متصل',
      available: 'متاح',
      nextAvailable: 'متاح خلال',
      reviews: 'تقييم',
      languages: 'اللغات',
      emergency: 'طوارئ',
      emergencyDesc: 'حالة تهدد الحياة؟',
      emergencyCall: 'اتصل بالطوارئ',
      emergencyNote: 'للحالات الطبية الطارئة، اتصل بخدمات الطوارئ المحلية',
      consultationFee: 'رسوم الاستشارة',
      freeForMembers: 'مجاناً لأعضاء SelectCare+'
    },
    fr: {
      title: 'Accès Médecin Instantané',
      subtitle: 'Connectez-vous avec un médecin qualifié en moins de 2 minutes, 24h/24',
      avgWaitTime: 'Temps d\'attente moy.',
      doctorsOnline: 'Médecins en ligne',
      patientsInQueue: 'En attente',
      consultationsToday: 'Consultations aujourd\'hui',
      instantConnect: 'Connexion Instantanée',
      instantConnectDesc: 'Soyez automatiquement mis en relation avec le prochain médecin disponible',
      connectNow: 'Se connecter maintenant',
      perSession: 'par session de 30 min',
      guaranteedResponse: 'Temps de réponse garanti',
      underMinutes: 'Moins de 2 minutes',
      boardCertified: 'Certifié',
      boardCertifiedDesc: 'Tous médecins qualifiés allemands',
      multiLanguage: 'Multilingue',
      multiLanguageDesc: 'EN, DE, AR, FR supportés',
      howItWorks: 'Comment fonctionne l\'accès 24/7',
      step1Title: 'Cliquez Connecter',
      step1Desc: 'Choisissez connexion instantanée ou sélectionnez un médecin',
      step2Title: 'Correspondance Intelligente',
      step2Desc: 'Notre IA vous met en relation avec le meilleur médecin disponible',
      step3Title: 'Consultation Vidéo',
      step3Desc: 'Connectez-vous en vidéo HD en moins de 2 minutes',
      step4Title: 'Ordonnance & Dossiers',
      step4Desc: 'Obtenez ordonnances et dossiers instantanément',
      availableDoctors: 'Médecins Disponibles',
      selectDoctor: 'Sélectionner un médecin',
      viewProfile: 'Voir profil',
      bookNow: 'Réserver',
      online: 'En ligne',
      busy: 'Occupé',
      offline: 'Hors ligne',
      available: 'Disponible',
      nextAvailable: 'Disponible dans',
      reviews: 'avis',
      languages: 'Langues',
      emergency: 'Urgence',
      emergencyDesc: 'Situation mettant la vie en danger?',
      emergencyCall: 'Appeler les urgences',
      emergencyNote: 'Pour les urgences médicales immédiates, appelez les services d\'urgence locaux',
      consultationFee: 'Frais de consultation',
      freeForMembers: 'Gratuit pour les membres SelectCare+'
    }
  };
  
  const tr = t[lang] || t.en;
  const isRTL = lang === 'ar';
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tr.title} - SelectCareOS™</title>
    <meta name="description" content="${tr.subtitle}">
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
            --coral: #FF6B35;
            --green: #22C55E;
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
            background: linear-gradient(135deg, var(--navy) 0%, #002244 50%, #001530 100%);
        }
        
        .gradient-gold {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
        }
        
        /* Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-dark {
            background: rgba(0, 31, 63, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(201, 162, 39, 0.2);
        }
        
        /* Cards */
        .card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
            transition: all 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 8px 30px rgba(0, 31, 63, 0.15);
            transform: translateY(-4px);
        }
        
        /* Doctor Cards */
        .doctor-card {
            position: relative;
            overflow: hidden;
        }
        
        .doctor-card::before {
            content: '';
            position: absolute;
            top: 0;
            ${isRTL ? 'right' : 'left'}: 0;
            width: 4px;
            height: 100%;
            background: var(--gold);
            transform: scaleY(0);
            transition: transform 0.3s ease;
        }
        
        .doctor-card:hover::before {
            transform: scaleY(1);
        }
        
        /* Status Indicators */
        .status-online {
            background: var(--green);
            animation: pulse 2s infinite;
        }
        
        .status-busy {
            background: #F59E0B;
            animation: pulse 2s infinite;
        }
        
        .status-offline {
            background: #9CA3AF;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        /* Buttons */
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
            text-decoration: none;
        }
        
        .btn-gold:hover {
            background: #B8922A;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(201, 162, 39, 0.4);
        }
        
        .btn-navy {
            background: var(--navy);
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-navy:hover {
            background: var(--navy-light);
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--gold);
            color: var(--gold);
            padding: 12px 26px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-outline:hover {
            background: var(--gold);
            color: var(--navy);
        }
        
        .btn-emergency {
            background: #DC2626;
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s;
            animation: emergency-pulse 1.5s infinite;
        }
        
        @keyframes emergency-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
        }
        
        /* Step numbers */
        .step-number {
            width: 48px;
            height: 48px;
            background: var(--gold);
            color: var(--navy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
        }
        
        /* Timer animation */
        .timer-display {
            font-family: 'Courier New', monospace;
            font-size: 3rem;
            font-weight: 700;
            color: var(--gold);
        }
        
        /* Avatar gradient ring */
        .avatar-ring {
            background: linear-gradient(135deg, var(--gold), var(--navy));
            padding: 3px;
            border-radius: 50%;
        }
        
        .avatar-inner {
            background: white;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: var(--navy);
        }
        
        /* Bottom nav */
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
        
        /* Loading shimmer */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        /* Video call button animation */
        .video-btn {
            position: relative;
            overflow: hidden;
        }
        
        .video-btn::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: rotate(45deg);
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
        
        /* Connection animation */
        .connecting-dots span {
            animation: dots 1.4s infinite ease-in-out;
            animation-fill-mode: both;
        }
        
        .connecting-dots span:nth-child(1) { animation-delay: -0.32s; }
        .connecting-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes dots {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
</head>
<body class="bg-cream">
    <!-- Navigation -->
    <nav class="bg-navy py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="text-white text-xl font-bold">
                SelectCare<span class="text-gold">OS</span>™
            </a>
            <div class="flex items-center gap-4">
                <!-- Language Selector -->
                <select id="langSelect" onchange="changeLang(this.value)" class="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm">
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
                    <option value="de" ${lang === 'de' ? 'selected' : ''}>🇩🇪 DE</option>
                    <option value="ar" ${lang === 'ar' ? 'selected' : ''}>🇸🇦 AR</option>
                    <option value="fr" ${lang === 'fr' ? 'selected' : ''}>🇫🇷 FR</option>
                </select>
                <a href="/booking" class="btn-gold text-sm py-2 px-4">
                    <i class="fas fa-calendar-check ${isRTL ? 'ml-2' : 'mr-2'}"></i>Book
                </a>
            </div>
        </div>
    </nav>

    <main>
        <!-- Hero Section with Live Stats -->
        <section class="gradient-navy py-16 px-6">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-10">
                    <div class="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        24/7 Available
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                        ${tr.title}
                    </h1>
                    <p class="text-xl text-white/70 max-w-2xl mx-auto">
                        ${tr.subtitle}
                    </p>
                </div>
                
                <!-- Live Stats Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="timer-display" id="waitTime">${QUEUE_STATS.avgWaitTime}</div>
                        <p class="text-white/70 text-sm">${tr.avgWaitTime}</p>
                    </div>
                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-gold" id="doctorsOnline">${QUEUE_STATS.doctorsOnline}</div>
                        <p class="text-white/70 text-sm">${tr.doctorsOnline}</p>
                    </div>
                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-white" id="queueCount">${QUEUE_STATS.patientsInQueue}</div>
                        <p class="text-white/70 text-sm">${tr.patientsInQueue}</p>
                    </div>
                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-green-400" id="consultToday">${QUEUE_STATS.consultationsToday}</div>
                        <p class="text-white/70 text-sm">${tr.consultationsToday}</p>
                    </div>
                </div>
                
                <!-- Instant Connect Card -->
                <div class="max-w-xl mx-auto">
                    <div class="card p-8 text-center border-2 border-gold">
                        <div class="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-video text-gold text-3xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-navy mb-2">${tr.instantConnect}</h2>
                        <p class="text-gray-600 mb-6">${tr.instantConnectDesc}</p>
                        
                        <button onclick="startInstantConnect()" class="btn-gold video-btn w-full text-lg py-4 mb-4">
                            <i class="fas fa-bolt ${isRTL ? 'ml-2' : 'mr-2'}"></i>${tr.connectNow}
                        </button>
                        
                        <div class="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <span class="font-bold text-navy">€50</span>
                            <span>/ ${tr.perSession}</span>
                        </div>
                        <p class="text-xs text-green-600 mt-2">
                            <i class="fas fa-crown ${isRTL ? 'ml-1' : 'mr-1'}"></i>${tr.freeForMembers}
                        </p>
                        
                        <!-- Features -->
                        <div class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                                    <i class="fas fa-clock text-green-600"></i>
                                </div>
                                <p class="text-xs font-semibold text-navy">${tr.underMinutes}</p>
                                <p class="text-xs text-gray-500">${tr.guaranteedResponse}</p>
                            </div>
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                    <i class="fas fa-certificate text-blue-600"></i>
                                </div>
                                <p class="text-xs font-semibold text-navy">${tr.boardCertified}</p>
                                <p class="text-xs text-gray-500">${tr.boardCertifiedDesc}</p>
                            </div>
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                    <i class="fas fa-globe text-purple-600"></i>
                                </div>
                                <p class="text-xs font-semibold text-navy">${tr.multiLanguage}</p>
                                <p class="text-xs text-gray-500">${tr.multiLanguageDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="py-16 px-6 bg-white">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-navy text-center mb-12">${tr.howItWorks}</h2>
                
                <div class="grid md:grid-cols-4 gap-8">
                    <div class="text-center">
                        <div class="step-number mx-auto mb-4">1</div>
                        <h3 class="font-bold text-navy mb-2">${tr.step1Title}</h3>
                        <p class="text-sm text-gray-600">${tr.step1Desc}</p>
                    </div>
                    <div class="text-center">
                        <div class="step-number mx-auto mb-4">2</div>
                        <h3 class="font-bold text-navy mb-2">${tr.step2Title}</h3>
                        <p class="text-sm text-gray-600">${tr.step2Desc}</p>
                    </div>
                    <div class="text-center">
                        <div class="step-number mx-auto mb-4">3</div>
                        <h3 class="font-bold text-navy mb-2">${tr.step3Title}</h3>
                        <p class="text-sm text-gray-600">${tr.step3Desc}</p>
                    </div>
                    <div class="text-center">
                        <div class="step-number mx-auto mb-4">4</div>
                        <h3 class="font-bold text-navy mb-2">${tr.step4Title}</h3>
                        <p class="text-sm text-gray-600">${tr.step4Desc}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Available Doctors -->
        <section class="py-16 px-6 bg-cream">
            <div class="max-w-6xl mx-auto">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl font-bold text-navy">${tr.availableDoctors}</h2>
                    <div class="flex items-center gap-4">
                        <span class="flex items-center gap-2 text-sm">
                            <span class="w-3 h-3 rounded-full status-online"></span>
                            <span class="text-gray-600">${tr.online}</span>
                        </span>
                        <span class="flex items-center gap-2 text-sm">
                            <span class="w-3 h-3 rounded-full status-busy"></span>
                            <span class="text-gray-600">${tr.busy}</span>
                        </span>
                        <span class="flex items-center gap-2 text-sm">
                            <span class="w-3 h-3 rounded-full status-offline"></span>
                            <span class="text-gray-600">${tr.offline}</span>
                        </span>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${INSTANT_DOCTORS.map(doctor => `
                        <div class="card doctor-card p-6 ${doctor.status !== 'offline' ? 'cursor-pointer' : 'opacity-75'}" 
                             ${doctor.status !== 'offline' ? `onclick="selectDoctor('${doctor.id}')"` : ''}>
                            <div class="flex items-start gap-4">
                                <!-- Avatar with status -->
                                <div class="relative">
                                    <div class="avatar-ring w-16 h-16">
                                        <div class="avatar-inner text-xl">${doctor.avatar}</div>
                                    </div>
                                    <span class="absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-4 h-4 rounded-full border-2 border-white ${
                                        doctor.status === 'online' ? 'status-online' :
                                        doctor.status === 'busy' ? 'status-busy' : 'status-offline'
                                    }"></span>
                                </div>
                                
                                <div class="flex-1">
                                    <h3 class="font-bold text-navy">${doctor.name}</h3>
                                    <p class="text-sm text-gold">${doctor.specialization}</p>
                                    <p class="text-xs text-gray-500">${doctor.title}</p>
                                    
                                    <!-- Rating -->
                                    <div class="flex items-center gap-2 mt-2">
                                        <div class="flex text-gold text-xs">
                                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(doctor.rating))}
                                        </div>
                                        <span class="text-xs text-gray-600">${doctor.rating} (${doctor.reviews} ${tr.reviews})</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Languages -->
                            <div class="mt-4 pt-4 border-t">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="fas fa-globe text-gold text-sm"></i>
                                    <span class="text-xs text-gray-600">${doctor.languages.join(', ')}</span>
                                </div>
                                
                                <!-- Status & Action -->
                                <div class="flex items-center justify-between">
                                    ${doctor.status === 'online' ? `
                                        <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                            <i class="fas fa-circle text-[8px] ${isRTL ? 'ml-1' : 'mr-1'}"></i>${tr.available}
                                        </span>
                                        <button onclick="event.stopPropagation(); bookDoctor('${doctor.id}')" class="btn-gold text-xs py-2 px-4">
                                            <i class="fas fa-video ${isRTL ? 'ml-1' : 'mr-1'}"></i>${tr.connectNow}
                                        </button>
                                    ` : doctor.status === 'busy' ? `
                                        <span class="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                                            <i class="fas fa-clock ${isRTL ? 'ml-1' : 'mr-1'}"></i>${tr.nextAvailable}: ${doctor.nextAvailable}
                                        </span>
                                        <button onclick="event.stopPropagation(); bookDoctor('${doctor.id}')" class="btn-outline text-xs py-2 px-4">
                                            ${tr.bookNow}
                                        </button>
                                    ` : `
                                        <span class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                                            ${tr.nextAvailable}: ${doctor.nextAvailable}
                                        </span>
                                        <a href="/doctor/${doctor.id}" class="text-xs text-gold hover:underline">
                                            ${tr.viewProfile}
                                        </a>
                                    `}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Emergency Section -->
        <section class="py-12 px-6 bg-red-50 border-y-2 border-red-200">
            <div class="max-w-4xl mx-auto text-center">
                <div class="inline-flex items-center gap-3 mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    <h2 class="text-2xl font-bold text-red-700">${tr.emergency}</h2>
                </div>
                <p class="text-red-600 mb-6">${tr.emergencyDesc}</p>
                
                <a href="tel:112" class="btn-emergency inline-flex items-center gap-2">
                    <i class="fas fa-phone-alt"></i>
                    ${tr.emergencyCall} (112)
                </a>
                
                <p class="text-sm text-red-500 mt-4">
                    <i class="fas fa-info-circle ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                    ${tr.emergencyNote}
                </p>
            </div>
        </section>
    </main>

    <!-- Connection Modal -->
    <div id="connectionModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 text-center">
            <div class="w-24 h-24 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <i class="fas fa-user-md text-gold text-4xl"></i>
            </div>
            <h3 class="text-xl font-bold text-navy mb-2">Connecting you now...</h3>
            <p class="text-gray-600 mb-6">Finding the best available doctor</p>
            
            <div class="connecting-dots text-4xl text-gold mb-6">
                <span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>
                <span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>
                <span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>
            </div>
            
            <p class="text-sm text-gray-500">Estimated wait: <span id="modalWaitTime">1:30</span></p>
            
            <button onclick="cancelConnection()" class="mt-6 text-gray-500 hover:text-gray-700">
                Cancel
            </button>
        </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
            </a>
            <a href="/services" class="nav-item">
                <i class="fas fa-concierge-bell"></i>
            </a>
            <a href="/instant-doctor" class="nav-item active">
                <i class="fas fa-video"></i>
            </a>
            <a href="/doctors" class="nav-item">
                <i class="fas fa-user-md"></i>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
            </a>
        </div>
    </nav>

    <script>
        // State management
        let currentRequestId = null;
        let pollInterval = null;
        const patientId = 'patient-' + Math.random().toString(36).substring(7);
        const patientName = 'Patient User';
        
        // Language change
        function changeLang(lang) {
            window.location.href = '/instant-doctor?lang=' + lang;
        }
        
        // Fetch and update live stats from API
        async function updateLiveStats() {
            try {
                const response = await fetch('/api/instant-connect/stats');
                const result = await response.json();
                
                if (result.success) {
                    const { doctors, queue } = result.data;
                    
                    // Update UI
                    document.getElementById('doctorsOnline').textContent = doctors.availableDoctors;
                    document.getElementById('queueCount').textContent = queue.totalInQueue;
                    
                    // Format wait time (seconds to MM:SS)
                    const waitSecs = queue.estimatedNextMatchSeconds || doctors.avgResponseTime;
                    const mins = Math.floor(waitSecs / 60);
                    const secs = Math.round(waitSecs % 60);
                    document.getElementById('waitTime').textContent = mins + ':' + secs.toString().padStart(2, '0');
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        }
        
        // Start instant connection with real API
        async function startInstantConnect() {
            const modal = document.getElementById('connectionModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Update modal content
            updateModalStatus('connecting', 'Finding the best available doctor...');
            
            try {
                // Call the Connect Now API
                const response = await fetch('/api/instant-connect/connect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: patientId,
                        patientName: patientName,
                        urgency: 'routine'
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    currentRequestId = result.data.requestId;
                    
                    if (result.data.status === 'matched') {
                        // Doctor found! Update UI and start polling for acceptance
                        const doctor = result.data.matchedDoctor;
                        updateModalStatus('matched', 
                            'Matched with ' + doctor.name + '!\\nWaiting for doctor to accept...',
                            doctor
                        );
                        startPolling();
                    } else {
                        // In queue
                        updateModalStatus('queued', 
                            'Added to queue. Position: ' + (result.data.queuePosition || 1),
                            null,
                            result.data.estimatedWaitSeconds
                        );
                        startPolling();
                    }
                } else {
                    updateModalStatus('error', 'Failed to connect: ' + (result.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Connection error:', error);
                updateModalStatus('error', 'Connection failed. Please try again.');
            }
        }
        
        // Update modal status display
        function updateModalStatus(status, message, doctor = null, waitTime = null) {
            const modalContent = document.querySelector('#connectionModal > div');
            let icon, title, dots;
            
            switch(status) {
                case 'connecting':
                    icon = 'fa-user-md';
                    title = 'Connecting you now...';
                    dots = true;
                    break;
                case 'matched':
                    icon = 'fa-check-circle';
                    title = 'Doctor Found!';
                    dots = true;
                    break;
                case 'queued':
                    icon = 'fa-users';
                    title = 'In Queue';
                    dots = true;
                    break;
                case 'accepted':
                    icon = 'fa-video';
                    title = 'Connecting Video...';
                    dots = false;
                    break;
                case 'error':
                    icon = 'fa-exclamation-triangle';
                    title = 'Connection Issue';
                    dots = false;
                    break;
            }
            
            let doctorInfo = '';
            if (doctor) {
                doctorInfo = '<div class="mt-4 p-4 bg-gray-50 rounded-xl">' +
                    '<div class="flex items-center gap-3">' +
                    '<div class="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center font-bold text-navy">' + 
                    doctor.avatar + '</div>' +
                    '<div class="text-left">' +
                    '<p class="font-bold text-navy">' + doctor.name + '</p>' +
                    '<p class="text-sm text-gray-600">' + doctor.specialty + '</p>' +
                    '<p class="text-xs text-gold">★ ' + doctor.rating + '</p>' +
                    '</div></div></div>';
            }
            
            let waitInfo = '';
            if (waitTime) {
                const mins = Math.floor(waitTime / 60);
                const secs = Math.round(waitTime % 60);
                waitInfo = '<p class="text-sm text-gray-500 mt-4">Estimated wait: <span class="font-bold">' + 
                    mins + ':' + secs.toString().padStart(2, '0') + '</span></p>';
            }
            
            modalContent.innerHTML = 
                '<div class="w-24 h-24 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">' +
                    '<i class="fas ' + icon + ' text-gold text-4xl"></i>' +
                '</div>' +
                '<h3 class="text-xl font-bold text-navy mb-2">' + title + '</h3>' +
                '<p class="text-gray-600 mb-4">' + message.replace(/\\n/g, '<br>') + '</p>' +
                (dots ? '<div class="connecting-dots text-4xl text-gold mb-4">' +
                    '<span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>' +
                    '<span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>' +
                    '<span class="inline-block w-3 h-3 bg-gold rounded-full mx-1"></span>' +
                '</div>' : '') +
                doctorInfo +
                waitInfo +
                '<button onclick="cancelConnection()" class="mt-6 text-gray-500 hover:text-gray-700 py-2 px-4 border border-gray-300 rounded-lg">' +
                    'Cancel' +
                '</button>';
        }
        
        // Poll for request status updates
        function startPolling() {
            if (pollInterval) clearInterval(pollInterval);
            
            pollInterval = setInterval(async () => {
                if (!currentRequestId) return;
                
                try {
                    const response = await fetch('/api/instant-connect/request/' + currentRequestId);
                    const result = await response.json();
                    
                    if (result.success) {
                        const status = result.data.status;
                        
                        if (status === 'accepted') {
                            // Doctor accepted! Redirect to video
                            clearInterval(pollInterval);
                            updateModalStatus('accepted', 'Doctor accepted! Connecting to video call...');
                            
                            // Simulate doctor accepting (in a real app, we'd wait for their real accept)
                            // Start the consultation
                            await fetch('/api/instant-connect/consultation/' + currentRequestId + '/start', {
                                method: 'POST'
                            });
                            
                            // Redirect to video room
                            setTimeout(() => {
                                window.open(result.data.videoRoomUrl, '_blank');
                                cancelConnection();
                            }, 1500);
                        } else if (status === 'completed' || status === 'cancelled') {
                            clearInterval(pollInterval);
                            cancelConnection();
                        }
                    }
                } catch (error) {
                    console.error('Polling error:', error);
                }
            }, 2000);
        }
        
        // Cancel connection
        async function cancelConnection() {
            if (pollInterval) {
                clearInterval(pollInterval);
                pollInterval = null;
            }
            
            if (currentRequestId) {
                try {
                    await fetch('/api/instant-connect/request/' + currentRequestId, {
                        method: 'DELETE'
                    });
                } catch (e) {
                    // Ignore cancel errors
                }
                currentRequestId = null;
            }
            
            document.getElementById('connectionModal').classList.add('hidden');
            document.getElementById('connectionModal').classList.remove('flex');
        }
        
        // Select doctor
        function selectDoctor(doctorId) {
            window.location.href = '/doctor/' + doctorId;
        }
        
        // Book specific doctor
        async function bookDoctor(doctorId) {
            const modal = document.getElementById('connectionModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            updateModalStatus('connecting', 'Connecting to selected doctor...');
            
            try {
                const response = await fetch('/api/instant-connect/connect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: patientId,
                        patientName: patientName,
                        urgency: 'routine'
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    currentRequestId = result.data.requestId;
                    
                    // Simulate doctor accepting for demo
                    setTimeout(async () => {
                        // Doctor accepts
                        await fetch('/api/instant-connect/doctor/accept', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                requestId: currentRequestId,
                                doctorId: result.data.matchedDoctor?.id || doctorId
                            })
                        });
                    }, 2000);
                    
                    if (result.data.matchedDoctor) {
                        updateModalStatus('matched', 
                            'Connecting with ' + result.data.matchedDoctor.name + '...',
                            result.data.matchedDoctor
                        );
                    }
                    
                    startPolling();
                }
            } catch (error) {
                console.error('Booking error:', error);
                updateModalStatus('error', 'Failed to connect. Please try again.');
            }
        }
        
        // Update stats on load and periodically
        updateLiveStats();
        setInterval(updateLiveStats, 10000);
    </script>
</body>
</html>`;
}
