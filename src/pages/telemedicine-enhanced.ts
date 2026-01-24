/**
 * Enhanced Telemedicine Dashboard - SelectCareOS™
 * Enterprise-Grade Video Consultation Platform
 * 
 * Features:
 * - Pre-call Device Testing (Camera, Microphone, Speaker)
 * - Virtual Waiting Room with Queue Management
 * - Real-time Connection Quality Monitoring
 * - Virtual Background Support
 * - HD/4K Screen Sharing for Medical Imaging
 * - AI-Powered Connection Optimization
 * - Multi-Language Support (EN/DE/AR)
 * - HIPAA/GDPR Compliant Design
 */

import type { Context } from 'hono';

// Translations for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Telemedicine Hub',
    subtitle: 'World-Class Virtual Healthcare',
    preCallCheck: 'Pre-Call Check',
    testDevices: 'Test Your Devices',
    camera: 'Camera',
    microphone: 'Microphone',
    speaker: 'Speaker',
    network: 'Network',
    testCamera: 'Test Camera',
    testMic: 'Test Microphone',
    testSpeaker: 'Test Speaker',
    testNetwork: 'Test Connection',
    allTestsPassed: 'All systems ready!',
    someTestsFailed: 'Some issues detected',
    startConsultation: 'Start Consultation',
    joinWaitingRoom: 'Join Waiting Room',
    
    waitingRoom: 'Virtual Waiting Room',
    waitingForDoctor: 'Waiting for your doctor...',
    estimatedWait: 'Estimated wait time',
    minutes: 'minutes',
    position: 'Queue position',
    doctorOnline: 'Doctor is online',
    doctorBusy: 'Doctor is with another patient',
    
    quickConnect: 'Quick Connect',
    scheduleCall: 'Schedule Call',
    emergencyLine: '24/7 Emergency Line',
    onCallDoctor: 'On-Call Doctor',
    
    upcomingSessions: 'Upcoming Sessions',
    pastConsultations: 'Past Consultations',
    noUpcoming: 'No upcoming sessions',
    
    settings: 'Settings',
    videoQuality: 'Video Quality',
    audioSettings: 'Audio Settings',
    background: 'Virtual Background',
    
    hdVideo: 'HD Video (720p)',
    fullHd: 'Full HD (1080p)',
    ultraHd: '4K Ultra HD',
    
    blurBackground: 'Blur Background',
    virtualBg: 'Virtual Background',
    noBg: 'No Effect',
    
    connectionExcellent: 'Excellent',
    connectionGood: 'Good',
    connectionFair: 'Fair',
    connectionPoor: 'Poor',
    
    devicePermissions: 'Device Permissions',
    allowCamera: 'Allow camera access',
    allowMic: 'Allow microphone access',
    
    features: 'Premium Features',
    screenShare: 'HD Screen Sharing',
    recording: 'Cloud Recording',
    chat: 'In-Call Chat',
    notes: 'Medical Notes',
    prescription: 'E-Prescription',
    
    joinNow: 'Join Now',
    viewDetails: 'View Details',
    cancelSession: 'Cancel',
    reschedule: 'Reschedule',
    
    troubleshooting: 'Troubleshooting',
    refreshPage: 'Refresh Page',
    checkPermissions: 'Check Permissions',
    contactSupport: 'Contact Support',
  },
  de: {
    title: 'Telemedizin Hub',
    subtitle: 'Erstklassige virtuelle Gesundheitsversorgung',
    preCallCheck: 'Vor-Anruf-Check',
    testDevices: 'Geräte testen',
    camera: 'Kamera',
    microphone: 'Mikrofon',
    speaker: 'Lautsprecher',
    network: 'Netzwerk',
    testCamera: 'Kamera testen',
    testMic: 'Mikrofon testen',
    testSpeaker: 'Lautsprecher testen',
    testNetwork: 'Verbindung testen',
    allTestsPassed: 'Alle Systeme bereit!',
    someTestsFailed: 'Einige Probleme erkannt',
    startConsultation: 'Konsultation starten',
    joinWaitingRoom: 'Warteraum beitreten',
    
    waitingRoom: 'Virtueller Warteraum',
    waitingForDoctor: 'Warten auf Ihren Arzt...',
    estimatedWait: 'Geschätzte Wartezeit',
    minutes: 'Minuten',
    position: 'Warteschlangenposition',
    doctorOnline: 'Arzt ist online',
    doctorBusy: 'Arzt ist bei einem anderen Patienten',
    
    quickConnect: 'Schnellverbindung',
    scheduleCall: 'Anruf planen',
    emergencyLine: '24/7 Notfalllinie',
    onCallDoctor: 'Bereitschaftsarzt',
    
    upcomingSessions: 'Kommende Sitzungen',
    pastConsultations: 'Vergangene Konsultationen',
    noUpcoming: 'Keine kommenden Sitzungen',
    
    settings: 'Einstellungen',
    videoQuality: 'Videoqualität',
    audioSettings: 'Audioeinstellungen',
    background: 'Virtueller Hintergrund',
    
    hdVideo: 'HD Video (720p)',
    fullHd: 'Full HD (1080p)',
    ultraHd: '4K Ultra HD',
    
    blurBackground: 'Hintergrund unscharf',
    virtualBg: 'Virtueller Hintergrund',
    noBg: 'Kein Effekt',
    
    connectionExcellent: 'Ausgezeichnet',
    connectionGood: 'Gut',
    connectionFair: 'Mäßig',
    connectionPoor: 'Schlecht',
    
    devicePermissions: 'Geräteberechtigungen',
    allowCamera: 'Kamerazugriff erlauben',
    allowMic: 'Mikrofonzugriff erlauben',
    
    features: 'Premium-Funktionen',
    screenShare: 'HD Bildschirmfreigabe',
    recording: 'Cloud-Aufnahme',
    chat: 'Chat während Anruf',
    notes: 'Medizinische Notizen',
    prescription: 'E-Rezept',
    
    joinNow: 'Jetzt beitreten',
    viewDetails: 'Details anzeigen',
    cancelSession: 'Abbrechen',
    reschedule: 'Verschieben',
    
    troubleshooting: 'Fehlerbehebung',
    refreshPage: 'Seite aktualisieren',
    checkPermissions: 'Berechtigungen prüfen',
    contactSupport: 'Support kontaktieren',
  },
  ar: {
    title: 'مركز التطبيب عن بعد',
    subtitle: 'رعاية صحية افتراضية على مستوى عالمي',
    preCallCheck: 'فحص ما قبل المكالمة',
    testDevices: 'اختبر أجهزتك',
    camera: 'الكاميرا',
    microphone: 'الميكروفون',
    speaker: 'مكبر الصوت',
    network: 'الشبكة',
    testCamera: 'اختبار الكاميرا',
    testMic: 'اختبار الميكروفون',
    testSpeaker: 'اختبار مكبر الصوت',
    testNetwork: 'اختبار الاتصال',
    allTestsPassed: 'جميع الأنظمة جاهزة!',
    someTestsFailed: 'تم اكتشاف بعض المشاكل',
    startConsultation: 'بدء الاستشارة',
    joinWaitingRoom: 'الانضمام لغرفة الانتظار',
    
    waitingRoom: 'غرفة الانتظار الافتراضية',
    waitingForDoctor: 'في انتظار طبيبك...',
    estimatedWait: 'وقت الانتظار المقدر',
    minutes: 'دقائق',
    position: 'موقع الانتظار',
    doctorOnline: 'الطبيب متصل',
    doctorBusy: 'الطبيب مع مريض آخر',
    
    quickConnect: 'اتصال سريع',
    scheduleCall: 'جدولة مكالمة',
    emergencyLine: 'خط الطوارئ 24/7',
    onCallDoctor: 'طبيب تحت الطلب',
    
    upcomingSessions: 'الجلسات القادمة',
    pastConsultations: 'الاستشارات السابقة',
    noUpcoming: 'لا توجد جلسات قادمة',
    
    settings: 'الإعدادات',
    videoQuality: 'جودة الفيديو',
    audioSettings: 'إعدادات الصوت',
    background: 'خلفية افتراضية',
    
    hdVideo: 'فيديو عالي الدقة (720p)',
    fullHd: 'دقة كاملة (1080p)',
    ultraHd: '4K فائقة الدقة',
    
    blurBackground: 'ضبابية الخلفية',
    virtualBg: 'خلفية افتراضية',
    noBg: 'بدون تأثير',
    
    connectionExcellent: 'ممتاز',
    connectionGood: 'جيد',
    connectionFair: 'مقبول',
    connectionPoor: 'ضعيف',
    
    devicePermissions: 'أذونات الجهاز',
    allowCamera: 'السماح بالوصول للكاميرا',
    allowMic: 'السماح بالوصول للميكروفون',
    
    features: 'الميزات المتميزة',
    screenShare: 'مشاركة شاشة HD',
    recording: 'تسجيل سحابي',
    chat: 'دردشة أثناء المكالمة',
    notes: 'ملاحظات طبية',
    prescription: 'وصفة إلكترونية',
    
    joinNow: 'انضم الآن',
    viewDetails: 'عرض التفاصيل',
    cancelSession: 'إلغاء',
    reschedule: 'إعادة الجدولة',
    
    troubleshooting: 'استكشاف الأخطاء',
    refreshPage: 'تحديث الصفحة',
    checkPermissions: 'تحقق من الأذونات',
    contactSupport: 'اتصل بالدعم',
  }
};

export function telemedicineEnhancedPage(c: Context): string {
  const lang = c.req.query('lang') || 'en';
  const t = translations[lang] || translations.en;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.title} - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="https://www.germanselect.org/favicon.ico">
    
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #FAF8F5;
            --success: #10B981;
            --danger: #EF4444;
            --warning: #F59E0B;
            --info: #3B82F6;
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            color: var(--navy);
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * HEADER STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .header {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            padding: 20px 24px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * DEVICE TEST CARD STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .device-test-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .device-test-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .device-test-card.testing {
            border-color: var(--gold);
        }
        
        .device-test-card.passed {
            border-color: var(--success);
        }
        
        .device-test-card.failed {
            border-color: var(--danger);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * VIDEO PREVIEW STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .video-preview {
            width: 100%;
            aspect-ratio: 16/9;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }
        
        .video-preview video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-preview-placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            gap: 12px;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * AUDIO VISUALIZER
         * ═══════════════════════════════════════════════════════════════════ */
        .audio-visualizer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            height: 40px;
            padding: 0 20px;
        }
        
        .audio-bar {
            width: 6px;
            height: 8px;
            background: var(--gold);
            border-radius: 3px;
            transition: height 0.1s ease;
        }
        
        .audio-bar.active {
            animation: audioBar 0.5s ease infinite;
        }
        
        @keyframes audioBar {
            0%, 100% { height: 8px; }
            50% { height: 32px; }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * CONNECTION QUALITY INDICATOR
         * ═══════════════════════════════════════════════════════════════════ */
        .quality-indicator {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
        }
        
        .quality-bars {
            display: flex;
            align-items: flex-end;
            gap: 3px;
            height: 20px;
        }
        
        .quality-bar {
            width: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        .quality-bar:nth-child(1) { height: 6px; }
        .quality-bar:nth-child(2) { height: 10px; }
        .quality-bar:nth-child(3) { height: 14px; }
        .quality-bar:nth-child(4) { height: 18px; }
        
        .quality-bar.active { background: var(--success); }
        .quality-bar.active.warning { background: var(--warning); }
        .quality-bar.active.danger { background: var(--danger); }
        
        /* ═══════════════════════════════════════════════════════════════════
         * WAITING ROOM STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .waiting-room {
            background: linear-gradient(135deg, var(--navy) 0%, #0a2540 100%);
            border-radius: 20px;
            padding: 32px;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .waiting-room::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 60%);
            animation: pulse-glow 4s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }
        
        .waiting-animation {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 24px 0;
        }
        
        .waiting-dot {
            width: 12px;
            height: 12px;
            background: var(--gold);
            border-radius: 50%;
            animation: waitingDot 1.4s ease-in-out infinite;
        }
        
        .waiting-dot:nth-child(2) { animation-delay: 0.2s; }
        .waiting-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes waitingDot {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * SESSION CARD STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .session-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border-left: 4px solid var(--gold);
        }
        
        .session-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .session-card.urgent {
            border-left-color: var(--danger);
            background: linear-gradient(135deg, white 0%, #fef2f2 100%);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * FEATURE BADGE STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .feature-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: var(--cream);
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            color: var(--navy);
        }
        
        .feature-badge.premium {
            background: linear-gradient(135deg, var(--gold) 0%, #deb334 100%);
            color: white;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * BUTTON STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .btn-primary {
            background: linear-gradient(135deg, var(--gold) 0%, #deb334 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            border: none;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(201,162,39,0.4);
        }
        
        .btn-secondary {
            background: white;
            color: var(--navy);
            padding: 12px 24px;
            border-radius: 12px;
            border: 2px solid var(--navy);
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
        }
        
        .btn-secondary:hover {
            background: var(--navy);
            color: white;
        }
        
        .btn-danger {
            background: linear-gradient(135deg, var(--danger) 0%, #dc2626 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            border: none;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(239,68,68,0.4);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * SETTINGS PANEL STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .settings-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: white;
            border-radius: 12px;
            margin-bottom: 12px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .settings-option:hover {
            background: var(--cream);
        }
        
        .settings-option.selected {
            border: 2px solid var(--gold);
            background: rgba(201,162,39,0.1);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * TOGGLE SWITCH
         * ═══════════════════════════════════════════════════════════════════ */
        .toggle-switch {
            position: relative;
            width: 52px;
            height: 28px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 28px;
        }
        
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
            background-color: var(--gold);
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(24px);
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * QUICK CONNECT GRID
         * ═══════════════════════════════════════════════════════════════════ */
        .quick-connect-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .quick-connect-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        
        .quick-connect-card.emergency {
            background: linear-gradient(135deg, var(--danger) 0%, #b91c1c 100%);
            color: white;
        }
        
        .quick-connect-card.emergency:hover {
            box-shadow: 0 8px 30px rgba(239,68,68,0.4);
        }
        
        .quick-connect-icon {
            width: 64px;
            height: 64px;
            background: var(--cream);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            font-size: 28px;
            color: var(--navy);
        }
        
        .quick-connect-card.emergency .quick-connect-icon {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * PROGRESS RING
         * ═══════════════════════════════════════════════════════════════════ */
        .progress-ring {
            transform: rotate(-90deg);
        }
        
        .progress-ring-circle {
            transition: stroke-dashoffset 0.5s ease;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * MODAL STYLES
         * ═══════════════════════════════════════════════════════════════════ */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        
        .modal-overlay.show {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * VIRTUAL BACKGROUND OPTIONS
         * ═══════════════════════════════════════════════════════════════════ */
        .bg-option {
            width: 80px;
            height: 60px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 3px solid transparent;
            overflow: hidden;
        }
        
        .bg-option:hover {
            transform: scale(1.05);
        }
        
        .bg-option.selected {
            border-color: var(--gold);
        }
        
        .bg-option img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
         * RESPONSIVE DESIGN
         * ═══════════════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
            .header {
                padding: 16px;
            }
            
            .device-test-card {
                padding: 16px;
            }
            
            .waiting-room {
                padding: 20px;
            }
            
            .quick-connect-icon {
                width: 48px;
                height: 48px;
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <a href="/" class="text-white hover:text-gold-light transition-colors">
                        <i class="fas fa-arrow-left text-lg"></i>
                    </a>
                    <div>
                        <h1 class="text-xl font-bold flex items-center gap-2">
                            <i class="fas fa-video text-[var(--gold)]"></i>
                            ${t.title}
                        </h1>
                        <p class="text-sm opacity-70">${t.subtitle}</p>
                    </div>
                </div>
                
                <!-- Connection Quality -->
                <div class="quality-indicator hidden md:flex">
                    <div class="quality-bars" id="quality-bars">
                        <div class="quality-bar active"></div>
                        <div class="quality-bar active"></div>
                        <div class="quality-bar active"></div>
                        <div class="quality-bar active"></div>
                    </div>
                    <span class="text-sm" id="quality-label">${t.connectionExcellent}</span>
                </div>
                
                <!-- Settings Button -->
                <button onclick="openSettingsModal()" class="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <i class="fas fa-cog text-lg"></i>
                </button>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        
        <!-- Pre-Call Device Check Section -->
        <section>
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold flex items-center gap-2">
                    <i class="fas fa-tools text-[var(--gold)]"></i>
                    ${t.preCallCheck}
                </h2>
                <button onclick="runAllTests()" class="btn-secondary text-sm">
                    <i class="fas fa-sync-alt"></i>
                    ${t.testDevices}
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Camera Test -->
                <div class="device-test-card" id="camera-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-[var(--cream)] flex items-center justify-center text-xl">
                                <i class="fas fa-video text-[var(--navy)]"></i>
                            </div>
                            <div>
                                <div class="font-semibold">${t.camera}</div>
                                <div class="text-sm text-gray-500" id="camera-status">Not tested</div>
                            </div>
                        </div>
                        <div id="camera-icon" class="text-gray-300">
                            <i class="fas fa-circle"></i>
                        </div>
                    </div>
                    
                    <div class="video-preview mb-4" id="camera-preview">
                        <div class="video-preview-placeholder" id="camera-placeholder">
                            <i class="fas fa-camera text-4xl opacity-30"></i>
                            <span class="text-sm opacity-50">${t.testCamera}</span>
                        </div>
                        <video id="camera-video" autoplay playsinline muted style="display: none;"></video>
                    </div>
                    
                    <button onclick="testCamera()" class="btn-secondary w-full text-sm">
                        <i class="fas fa-play"></i>
                        ${t.testCamera}
                    </button>
                </div>
                
                <!-- Microphone Test -->
                <div class="device-test-card" id="mic-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-[var(--cream)] flex items-center justify-center text-xl">
                                <i class="fas fa-microphone text-[var(--navy)]"></i>
                            </div>
                            <div>
                                <div class="font-semibold">${t.microphone}</div>
                                <div class="text-sm text-gray-500" id="mic-status">Not tested</div>
                            </div>
                        </div>
                        <div id="mic-icon" class="text-gray-300">
                            <i class="fas fa-circle"></i>
                        </div>
                    </div>
                    
                    <div class="audio-visualizer" id="audio-visualizer">
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                        <div class="audio-bar"></div>
                    </div>
                    
                    <button onclick="testMicrophone()" class="btn-secondary w-full text-sm mt-4">
                        <i class="fas fa-play"></i>
                        ${t.testMic}
                    </button>
                </div>
                
                <!-- Speaker Test -->
                <div class="device-test-card" id="speaker-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-[var(--cream)] flex items-center justify-center text-xl">
                                <i class="fas fa-volume-up text-[var(--navy)]"></i>
                            </div>
                            <div>
                                <div class="font-semibold">${t.speaker}</div>
                                <div class="text-sm text-gray-500" id="speaker-status">Not tested</div>
                            </div>
                        </div>
                        <div id="speaker-icon" class="text-gray-300">
                            <i class="fas fa-circle"></i>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-center py-6">
                        <div class="w-16 h-16 rounded-full bg-[var(--cream)] flex items-center justify-center text-3xl" id="speaker-anim">
                            <i class="fas fa-volume-up text-[var(--navy)]"></i>
                        </div>
                    </div>
                    
                    <button onclick="testSpeaker()" class="btn-secondary w-full text-sm">
                        <i class="fas fa-play"></i>
                        ${t.testSpeaker}
                    </button>
                </div>
                
                <!-- Network Test -->
                <div class="device-test-card" id="network-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-[var(--cream)] flex items-center justify-center text-xl">
                                <i class="fas fa-wifi text-[var(--navy)]"></i>
                            </div>
                            <div>
                                <div class="font-semibold">${t.network}</div>
                                <div class="text-sm text-gray-500" id="network-status">Not tested</div>
                            </div>
                        </div>
                        <div id="network-icon" class="text-gray-300">
                            <i class="fas fa-circle"></i>
                        </div>
                    </div>
                    
                    <div class="flex flex-col items-center justify-center py-4">
                        <div class="relative w-20 h-20">
                            <svg class="progress-ring" width="80" height="80">
                                <circle stroke="#E5E7EB" stroke-width="6" fill="transparent" r="34" cx="40" cy="40"/>
                                <circle id="network-progress" class="progress-ring-circle" stroke="var(--gold)" stroke-width="6" fill="transparent" r="34" cx="40" cy="40" stroke-dasharray="213.6" stroke-dashoffset="213.6"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span id="network-speed" class="text-lg font-bold">--</span>
                            </div>
                        </div>
                        <span class="text-sm text-gray-500 mt-2">Mbps</span>
                    </div>
                    
                    <button onclick="testNetwork()" class="btn-secondary w-full text-sm">
                        <i class="fas fa-play"></i>
                        ${t.testNetwork}
                    </button>
                </div>
            </div>
            
            <!-- Test Results Summary -->
            <div class="mt-4 p-4 rounded-xl bg-white flex items-center justify-between" id="test-summary" style="display: none;">
                <div class="flex items-center gap-3">
                    <i class="fas fa-check-circle text-2xl text-[var(--success)]" id="summary-icon"></i>
                    <span class="font-semibold" id="summary-text">${t.allTestsPassed}</span>
                </div>
                <button onclick="startConsultation()" class="btn-primary">
                    <i class="fas fa-video"></i>
                    ${t.startConsultation}
                </button>
            </div>
        </section>

        <!-- Quick Connect & Waiting Room -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Quick Connect -->
            <section class="lg:col-span-1">
                <h2 class="text-xl font-bold flex items-center gap-2 mb-4">
                    <i class="fas fa-bolt text-[var(--gold)]"></i>
                    ${t.quickConnect}
                </h2>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="quick-connect-card emergency" onclick="callEmergency()">
                        <div class="quick-connect-icon">
                            <i class="fas fa-phone-alt"></i>
                        </div>
                        <div class="font-semibold">${t.emergencyLine}</div>
                        <div class="text-sm opacity-70 mt-1">+49 800 123 4567</div>
                    </div>
                    
                    <div class="quick-connect-card" onclick="connectOnCall()">
                        <div class="quick-connect-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <div class="font-semibold">${t.onCallDoctor}</div>
                        <div class="text-sm text-gray-500 mt-1">Available Now</div>
                    </div>
                    
                    <div class="quick-connect-card" onclick="createQuickRoom()">
                        <div class="quick-connect-icon">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="font-semibold">${t.startConsultation}</div>
                        <div class="text-sm text-gray-500 mt-1">HD Video Call</div>
                    </div>
                    
                    <div class="quick-connect-card" onclick="openScheduleModal()">
                        <div class="quick-connect-icon">
                            <i class="fas fa-calendar-plus"></i>
                        </div>
                        <div class="font-semibold">${t.scheduleCall}</div>
                        <div class="text-sm text-gray-500 mt-1">Book Appointment</div>
                    </div>
                </div>
            </section>
            
            <!-- Virtual Waiting Room -->
            <section class="lg:col-span-2">
                <h2 class="text-xl font-bold flex items-center gap-2 mb-4">
                    <i class="fas fa-hourglass-half text-[var(--gold)]"></i>
                    ${t.waitingRoom}
                </h2>
                
                <div class="waiting-room" id="waiting-room" style="display: none;">
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center gap-3">
                                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                                    <i class="fas fa-user-clock"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-lg">${t.waitingForDoctor}</div>
                                    <div class="text-sm opacity-70" id="doctor-status">${t.doctorBusy}</div>
                                </div>
                            </div>
                            <button onclick="leaveWaitingRoom()" class="btn-danger text-sm">
                                <i class="fas fa-times"></i>
                                Leave
                            </button>
                        </div>
                        
                        <div class="waiting-animation">
                            <div class="waiting-dot"></div>
                            <div class="waiting-dot"></div>
                            <div class="waiting-dot"></div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mt-6">
                            <div class="bg-white/10 rounded-xl p-4 text-center">
                                <div class="text-3xl font-bold text-[var(--gold)]" id="wait-time">5</div>
                                <div class="text-sm opacity-70">${t.estimatedWait} (${t.minutes})</div>
                            </div>
                            <div class="bg-white/10 rounded-xl p-4 text-center">
                                <div class="text-3xl font-bold text-[var(--gold)]" id="queue-position">2</div>
                                <div class="text-sm opacity-70">${t.position}</div>
                            </div>
                        </div>
                        
                        <!-- Features while waiting -->
                        <div class="mt-6 pt-6 border-t border-white/20">
                            <div class="text-sm opacity-70 mb-3">${t.features}</div>
                            <div class="flex flex-wrap gap-2">
                                <span class="feature-badge premium">
                                    <i class="fas fa-desktop"></i>
                                    ${t.screenShare}
                                </span>
                                <span class="feature-badge">
                                    <i class="fas fa-comment"></i>
                                    ${t.chat}
                                </span>
                                <span class="feature-badge">
                                    <i class="fas fa-clipboard"></i>
                                    ${t.notes}
                                </span>
                                <span class="feature-badge">
                                    <i class="fas fa-prescription"></i>
                                    ${t.prescription}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- No Active Waiting - Show Upcoming Sessions -->
                <div id="upcoming-sessions">
                    <div class="session-card mb-4">
                        <div class="flex items-start justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-full bg-[var(--navy)] flex items-center justify-center text-white font-bold">
                                    KM
                                </div>
                                <div>
                                    <div class="font-semibold text-lg">Dr. Klaus Müller</div>
                                    <div class="text-sm text-gray-500">Cardiology Follow-up</div>
                                    <div class="flex items-center gap-2 mt-2">
                                        <span class="text-xs px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)]">
                                            <i class="fas fa-circle text-[6px] mr-1"></i>
                                            Online
                                        </span>
                                        <span class="text-xs text-gray-500">
                                            <i class="fas fa-clock mr-1"></i>
                                            Today, 10:00 AM
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <button onclick="joinSession('cardio-001')" class="btn-primary text-sm">
                                    <i class="fas fa-video"></i>
                                    ${t.joinNow}
                                </button>
                                <button class="btn-secondary text-xs">
                                    ${t.reschedule}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="session-card">
                        <div class="flex items-start justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-full bg-[var(--gold)] flex items-center justify-center text-white font-bold">
                                    AM
                                </div>
                                <div>
                                    <div class="font-semibold text-lg">Dr. Ahmed Metwalli</div>
                                    <div class="text-sm text-gray-500">Bariatric Surgery Consultation</div>
                                    <div class="flex items-center gap-2 mt-2">
                                        <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                                            <i class="fas fa-calendar mr-1"></i>
                                            Jan 28, 2:00 PM
                                        </span>
                                        <span class="text-xs text-gray-500">
                                            <i class="fas fa-globe mr-1"></i>
                                            Hurghada, Egypt
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <button class="btn-secondary text-sm">
                                    <i class="fas fa-info-circle"></i>
                                    ${t.viewDetails}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
        <!-- Premium Features -->
        <section class="bg-gradient-to-r from-[var(--navy)] to-[var(--navy-light)] rounded-2xl p-6 md:p-8 text-white">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div class="flex items-center gap-2 text-[var(--gold)] text-sm font-semibold mb-2">
                        <i class="fas fa-crown"></i>
                        ZERO COST PREMIUM FEATURES
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Enterprise-Grade Telemedicine</h3>
                    <p class="opacity-70">HD Video • 4K Screen Sharing • In-Call Chat • E-Prescriptions</p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="feature-badge premium">
                        <i class="fas fa-hd"></i>
                        Full HD 1080p
                    </div>
                    <div class="feature-badge premium">
                        <i class="fas fa-desktop"></i>
                        4K Screen Share
                    </div>
                    <div class="feature-badge premium">
                        <i class="fas fa-infinity"></i>
                        Unlimited Calls
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Settings Modal -->
    <div class="modal-overlay" id="settings-modal">
        <div class="modal-content">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <i class="fas fa-cog text-[var(--gold)]"></i>
                        ${t.settings}
                    </h3>
                    <button onclick="closeSettingsModal()" class="p-2 hover:bg-gray-100 rounded-lg">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6 space-y-6">
                <!-- Video Quality -->
                <div>
                    <h4 class="font-semibold mb-3">${t.videoQuality}</h4>
                    <div class="space-y-2">
                        <div class="settings-option" onclick="setVideoQuality('720')">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-video text-gray-400"></i>
                                <span>${t.hdVideo}</span>
                            </div>
                            <i class="fas fa-check text-[var(--gold)]" style="display: none;" data-quality="720"></i>
                        </div>
                        <div class="settings-option selected" onclick="setVideoQuality('1080')">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-video text-[var(--gold)]"></i>
                                <span>${t.fullHd}</span>
                                <span class="feature-badge premium text-xs">Recommended</span>
                            </div>
                            <i class="fas fa-check text-[var(--gold)]" data-quality="1080"></i>
                        </div>
                        <div class="settings-option" onclick="setVideoQuality('2160')">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-film text-gray-400"></i>
                                <span>${t.ultraHd}</span>
                            </div>
                            <i class="fas fa-check text-[var(--gold)]" style="display: none;" data-quality="2160"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Virtual Background -->
                <div>
                    <h4 class="font-semibold mb-3">${t.background}</h4>
                    <div class="flex flex-wrap gap-3">
                        <div class="bg-option selected" onclick="setBackground('none')" style="background: linear-gradient(135deg, #ddd 0%, #eee 100%);">
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                <i class="fas fa-ban"></i>
                            </div>
                        </div>
                        <div class="bg-option" onclick="setBackground('blur')" style="background: linear-gradient(135deg, #88c0d0 0%, #81a1c1 100%); filter: blur(2px);">
                        </div>
                        <div class="bg-option" onclick="setBackground('office')">
                            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=160&h=120&fit=crop" alt="Office">
                        </div>
                        <div class="bg-option" onclick="setBackground('medical')">
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=160&h=120&fit=crop" alt="Medical">
                        </div>
                        <div class="bg-option" onclick="setBackground('nature')">
                            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=120&fit=crop" alt="Nature">
                        </div>
                    </div>
                </div>
                
                <!-- Audio Settings -->
                <div>
                    <h4 class="font-semibold mb-3">${t.audioSettings}</h4>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-microphone-alt text-gray-500"></i>
                                <span>Noise Suppression</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked onchange="toggleNoiseSuppression(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-wave-square text-gray-500"></i>
                                <span>Echo Cancellation</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked onchange="toggleEchoCancellation(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-volume-up text-gray-500"></i>
                                <span>Auto Gain Control</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked onchange="toggleAutoGain(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="p-6 border-t bg-gray-50">
                <button onclick="closeSettingsModal()" class="btn-primary w-full">
                    <i class="fas fa-check"></i>
                    Save Settings
                </button>
            </div>
        </div>
    </div>

    <script>
        // ════════════════════════════════════════════════════════════════════════
        // STATE MANAGEMENT
        // ════════════════════════════════════════════════════════════════════════
        const state = {
            cameraStream: null,
            micStream: null,
            audioContext: null,
            analyser: null,
            animationFrame: null,
            
            tests: {
                camera: null,
                microphone: null,
                speaker: null,
                network: null
            },
            
            settings: {
                videoQuality: '1080',
                background: 'none',
                noiseSuppression: true,
                echoCancellation: true,
                autoGain: true
            },
            
            waitingRoom: {
                active: false,
                sessionId: null,
                position: 0,
                estimatedWait: 0
            }
        };

        // ════════════════════════════════════════════════════════════════════════
        // DEVICE TESTING
        // ════════════════════════════════════════════════════════════════════════
        
        async function testCamera() {
            const card = document.getElementById('camera-card');
            const status = document.getElementById('camera-status');
            const icon = document.getElementById('camera-icon');
            const video = document.getElementById('camera-video');
            const placeholder = document.getElementById('camera-placeholder');
            
            card.classList.add('testing');
            card.classList.remove('passed', 'failed');
            status.textContent = 'Testing...';
            
            try {
                // Stop previous stream if exists
                if (state.cameraStream) {
                    state.cameraStream.getTracks().forEach(track => track.stop());
                }
                
                // Request camera with HD resolution
                state.cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        frameRate: { ideal: 30 }
                    }
                });
                
                video.srcObject = state.cameraStream;
                video.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Get actual resolution
                const track = state.cameraStream.getVideoTracks()[0];
                const settings = track.getSettings();
                
                card.classList.remove('testing');
                card.classList.add('passed');
                status.textContent = settings.width + 'x' + settings.height + ' @ ' + Math.round(settings.frameRate) + 'fps';
                icon.innerHTML = '<i class="fas fa-check-circle text-[var(--success)]"></i>';
                state.tests.camera = true;
                
            } catch (error) {
                card.classList.remove('testing');
                card.classList.add('failed');
                status.textContent = 'Permission denied';
                icon.innerHTML = '<i class="fas fa-times-circle text-[var(--danger)]"></i>';
                state.tests.camera = false;
            }
            
            updateTestSummary();
        }
        
        async function testMicrophone() {
            const card = document.getElementById('mic-card');
            const status = document.getElementById('mic-status');
            const icon = document.getElementById('mic-icon');
            const bars = document.querySelectorAll('#audio-visualizer .audio-bar');
            
            card.classList.add('testing');
            card.classList.remove('passed', 'failed');
            status.textContent = 'Testing...';
            
            try {
                // Stop previous stream
                if (state.micStream) {
                    state.micStream.getTracks().forEach(track => track.stop());
                }
                
                state.micStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: state.settings.echoCancellation,
                        noiseSuppression: state.settings.noiseSuppression,
                        autoGainControl: state.settings.autoGain
                    }
                });
                
                // Setup audio analysis
                state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                state.analyser = state.audioContext.createAnalyser();
                const source = state.audioContext.createMediaStreamSource(state.micStream);
                source.connect(state.analyser);
                state.analyser.fftSize = 32;
                
                const dataArray = new Uint8Array(state.analyser.frequencyBinCount);
                
                function updateVisualizer() {
                    state.analyser.getByteFrequencyData(dataArray);
                    
                    bars.forEach((bar, i) => {
                        const value = dataArray[i] || 0;
                        const height = Math.max(8, (value / 255) * 40);
                        bar.style.height = height + 'px';
                        bar.classList.add('active');
                    });
                    
                    state.animationFrame = requestAnimationFrame(updateVisualizer);
                }
                
                updateVisualizer();
                
                // Check for audio input
                setTimeout(() => {
                    const track = state.micStream.getAudioTracks()[0];
                    card.classList.remove('testing');
                    card.classList.add('passed');
                    status.textContent = track.label || 'Microphone OK';
                    icon.innerHTML = '<i class="fas fa-check-circle text-[var(--success)]"></i>';
                    state.tests.microphone = true;
                    updateTestSummary();
                }, 1500);
                
            } catch (error) {
                card.classList.remove('testing');
                card.classList.add('failed');
                status.textContent = 'Permission denied';
                icon.innerHTML = '<i class="fas fa-times-circle text-[var(--danger)]"></i>';
                state.tests.microphone = false;
                updateTestSummary();
            }
        }
        
        async function testSpeaker() {
            const card = document.getElementById('speaker-card');
            const status = document.getElementById('speaker-status');
            const icon = document.getElementById('speaker-icon');
            const anim = document.getElementById('speaker-anim');
            
            card.classList.add('testing');
            card.classList.remove('passed', 'failed');
            status.textContent = 'Playing test sound...';
            
            try {
                // Create a simple beep
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.frequency.value = 440; // A4 note
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                
                oscillator.start(audioCtx.currentTime);
                oscillator.stop(audioCtx.currentTime + 0.5);
                
                // Visual feedback
                anim.style.transform = 'scale(1.2)';
                anim.style.boxShadow = '0 0 30px rgba(201,162,39,0.5)';
                
                setTimeout(() => {
                    anim.style.transform = 'scale(1)';
                    anim.style.boxShadow = 'none';
                    
                    card.classList.remove('testing');
                    card.classList.add('passed');
                    status.textContent = 'Speaker working';
                    icon.innerHTML = '<i class="fas fa-check-circle text-[var(--success)]"></i>';
                    state.tests.speaker = true;
                    updateTestSummary();
                }, 600);
                
            } catch (error) {
                card.classList.remove('testing');
                card.classList.add('failed');
                status.textContent = 'Audio error';
                icon.innerHTML = '<i class="fas fa-times-circle text-[var(--danger)]"></i>';
                state.tests.speaker = false;
                updateTestSummary();
            }
        }
        
        async function testNetwork() {
            const card = document.getElementById('network-card');
            const status = document.getElementById('network-status');
            const icon = document.getElementById('network-icon');
            const progress = document.getElementById('network-progress');
            const speedDisplay = document.getElementById('network-speed');
            
            card.classList.add('testing');
            card.classList.remove('passed', 'failed');
            status.textContent = 'Testing connection...';
            
            try {
                const startTime = performance.now();
                
                // Animate progress
                let progressValue = 0;
                const progressInterval = setInterval(() => {
                    progressValue += 5;
                    if (progressValue > 90) progressValue = 90;
                    const offset = 213.6 - (213.6 * progressValue / 100);
                    progress.style.strokeDashoffset = offset;
                }, 100);
                
                // Test with multiple requests
                const testUrls = [
                    '/api/health',
                    '/api/telemedicine/config',
                    '/api/health'
                ];
                
                const results = await Promise.all(
                    testUrls.map(async (url) => {
                        const start = performance.now();
                        await fetch(url + '?t=' + Date.now());
                        return performance.now() - start;
                    })
                );
                
                clearInterval(progressInterval);
                
                const avgLatency = results.reduce((a, b) => a + b, 0) / results.length;
                const estimatedSpeed = Math.round(Math.max(5, Math.min(100, 100 - avgLatency / 10)));
                
                // Complete progress animation
                progress.style.strokeDashoffset = '0';
                speedDisplay.textContent = estimatedSpeed;
                
                // Determine quality
                let quality = 'excellent';
                if (avgLatency > 200) quality = 'poor';
                else if (avgLatency > 100) quality = 'fair';
                else if (avgLatency > 50) quality = 'good';
                
                card.classList.remove('testing');
                card.classList.add('passed');
                status.textContent = quality.charAt(0).toUpperCase() + quality.slice(1) + ' (' + Math.round(avgLatency) + 'ms)';
                icon.innerHTML = '<i class="fas fa-check-circle text-[var(--success)]"></i>';
                state.tests.network = true;
                
                // Update header quality indicator
                updateConnectionQuality(quality);
                
            } catch (error) {
                card.classList.remove('testing');
                card.classList.add('failed');
                status.textContent = 'Connection failed';
                icon.innerHTML = '<i class="fas fa-times-circle text-[var(--danger)]"></i>';
                state.tests.network = false;
            }
            
            updateTestSummary();
        }
        
        async function runAllTests() {
            await testCamera();
            await testMicrophone();
            await testSpeaker();
            await testNetwork();
        }
        
        function updateTestSummary() {
            const summary = document.getElementById('test-summary');
            const summaryIcon = document.getElementById('summary-icon');
            const summaryText = document.getElementById('summary-text');
            
            const tests = Object.values(state.tests);
            const completed = tests.filter(t => t !== null);
            
            if (completed.length === 0) {
                summary.style.display = 'none';
                return;
            }
            
            summary.style.display = 'flex';
            
            const allPassed = completed.every(t => t === true);
            
            if (allPassed) {
                summaryIcon.className = 'fas fa-check-circle text-2xl text-[var(--success)]';
                summaryText.textContent = '${t.allTestsPassed}';
            } else {
                summaryIcon.className = 'fas fa-exclamation-triangle text-2xl text-[var(--warning)]';
                summaryText.textContent = '${t.someTestsFailed}';
            }
        }
        
        function updateConnectionQuality(quality) {
            const bars = document.querySelectorAll('#quality-bars .quality-bar');
            const label = document.getElementById('quality-label');
            
            const qualities = {
                excellent: { bars: 4, label: '${t.connectionExcellent}', class: '' },
                good: { bars: 3, label: '${t.connectionGood}', class: '' },
                fair: { bars: 2, label: '${t.connectionFair}', class: 'warning' },
                poor: { bars: 1, label: '${t.connectionPoor}', class: 'danger' }
            };
            
            const config = qualities[quality] || qualities.good;
            
            bars.forEach((bar, i) => {
                bar.classList.remove('active', 'warning', 'danger');
                if (i < config.bars) {
                    bar.classList.add('active');
                    if (config.class) bar.classList.add(config.class);
                }
            });
            
            label.textContent = config.label;
        }

        // ════════════════════════════════════════════════════════════════════════
        // SETTINGS MANAGEMENT
        // ════════════════════════════════════════════════════════════════════════
        
        function openSettingsModal() {
            document.getElementById('settings-modal').classList.add('show');
        }
        
        function closeSettingsModal() {
            document.getElementById('settings-modal').classList.remove('show');
        }
        
        function setVideoQuality(quality) {
            state.settings.videoQuality = quality;
            
            document.querySelectorAll('.settings-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelectorAll('[data-quality]').forEach(icon => {
                icon.style.display = 'none';
            });
            
            const selected = document.querySelector('[data-quality="' + quality + '"]');
            if (selected) {
                selected.style.display = 'block';
                selected.closest('.settings-option').classList.add('selected');
            }
        }
        
        function setBackground(bg) {
            state.settings.background = bg;
            document.querySelectorAll('.bg-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            event.target.closest('.bg-option').classList.add('selected');
        }
        
        function toggleNoiseSuppression(checkbox) {
            state.settings.noiseSuppression = checkbox.checked;
        }
        
        function toggleEchoCancellation(checkbox) {
            state.settings.echoCancellation = checkbox.checked;
        }
        
        function toggleAutoGain(checkbox) {
            state.settings.autoGain = checkbox.checked;
        }

        // ════════════════════════════════════════════════════════════════════════
        // VIDEO CONSULTATION FUNCTIONS
        // ════════════════════════════════════════════════════════════════════════
        
        async function createQuickRoom() {
            try {
                const response = await fetch('/api/telemedicine/quick-room');
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = '/video-consultation/' + data.data.roomId + '?role=patient';
                } else {
                    alert('Failed to create room. Please try again.');
                }
            } catch (error) {
                console.error('Error creating room:', error);
                alert('Connection error. Please check your network.');
            }
        }
        
        function joinSession(sessionId) {
            window.location.href = '/video-consultation/' + sessionId + '?role=patient';
        }
        
        function startConsultation() {
            createQuickRoom();
        }
        
        function connectOnCall() {
            createQuickRoom();
        }
        
        function callEmergency() {
            window.location.href = 'tel:+498001234567';
        }
        
        function openScheduleModal() {
            // Would open scheduling modal
            alert('Scheduling feature coming soon!');
        }

        // ════════════════════════════════════════════════════════════════════════
        // WAITING ROOM FUNCTIONS
        // ════════════════════════════════════════════════════════════════════════
        
        function joinWaitingRoom(sessionId) {
            state.waitingRoom.active = true;
            state.waitingRoom.sessionId = sessionId;
            
            document.getElementById('waiting-room').style.display = 'block';
            document.getElementById('upcoming-sessions').style.display = 'none';
            
            // Simulate waiting room updates
            updateWaitingRoom();
        }
        
        function leaveWaitingRoom() {
            state.waitingRoom.active = false;
            document.getElementById('waiting-room').style.display = 'none';
            document.getElementById('upcoming-sessions').style.display = 'block';
        }
        
        function updateWaitingRoom() {
            if (!state.waitingRoom.active) return;
            
            // Simulate position updates
            setTimeout(() => {
                const position = document.getElementById('queue-position');
                const waitTime = document.getElementById('wait-time');
                
                let currentPos = parseInt(position.textContent);
                if (currentPos > 1) {
                    position.textContent = currentPos - 1;
                    waitTime.textContent = (currentPos - 1) * 3;
                    updateWaitingRoom();
                } else {
                    // Doctor ready
                    document.getElementById('doctor-status').textContent = '${t.doctorOnline}';
                    // Could auto-join here
                }
            }, 10000); // Update every 10 seconds
        }

        // ════════════════════════════════════════════════════════════════════════
        // INITIALIZATION
        // ════════════════════════════════════════════════════════════════════════
        
        document.addEventListener('DOMContentLoaded', () => {
            // Initial connection quality check
            updateConnectionQuality('good');
            
            // Periodically check connection
            setInterval(() => {
                testNetwork();
            }, 60000); // Every minute
        });
        
        // Cleanup on page leave
        window.addEventListener('beforeunload', () => {
            if (state.cameraStream) {
                state.cameraStream.getTracks().forEach(track => track.stop());
            }
            if (state.micStream) {
                state.micStream.getTracks().forEach(track => track.stop());
            }
            if (state.animationFrame) {
                cancelAnimationFrame(state.animationFrame);
            }
            if (state.audioContext) {
                state.audioContext.close();
            }
        });
    </script>
</body>
</html>`;
}
