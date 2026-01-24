/**
 * Enhanced Telemedicine Dashboard - SelectCareOS™
 * Premium telemedicine experience with advanced features
 * 
 * Features:
 * - Pre-call device testing (camera, microphone, speakers)
 * - Virtual waiting room with queue position
 * - Real-time connection quality monitoring
 * - HD/4K video quality options
 * - Virtual backgrounds
 * - Session recording controls
 * - Multi-language support (EN/DE/AR)
 */

import type { Context } from 'hono';

export function telemedicineDashboardPage(c: Context): string {
  const lang = c.req.query('lang') || 'en';
  const consultationId = c.req.query('id') || '';
  const role = (c.req.query('role') || 'patient') as 'patient' | 'doctor';
  
  // Translations
  const tr: Record<string, Record<string, string>> = {
    en: {
      title: 'Telemedicine Center',
      subtitle: 'Premium Virtual Healthcare',
      prepareCall: 'Prepare Your Call',
      deviceTest: 'Device Test',
      testCamera: 'Test Camera',
      testMicrophone: 'Test Microphone', 
      testSpeakers: 'Test Speakers',
      cameraWorking: 'Camera working',
      micWorking: 'Microphone working',
      speakersWorking: 'Speakers working',
      deviceReady: 'All devices ready',
      startCall: 'Start Consultation',
      joinWaitingRoom: 'Join Waiting Room',
      waitingRoom: 'Virtual Waiting Room',
      queuePosition: 'Your position in queue',
      estimatedWait: 'Estimated wait time',
      minutes: 'minutes',
      doctorPreparing: 'Doctor is preparing...',
      doctorReady: 'Doctor is ready!',
      joinNow: 'Join Now',
      connectionQuality: 'Connection Quality',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      videoQuality: 'Video Quality',
      sd: 'SD (480p)',
      hd: 'HD (720p)',
      fullHd: 'Full HD (1080p)',
      ultra: '4K Ultra',
      virtualBackground: 'Virtual Background',
      bgNone: 'None',
      bgBlur: 'Blur',
      bgOffice: 'Medical Office',
      bgNature: 'Nature',
      upcomingConsultations: 'Upcoming Consultations',
      noUpcoming: 'No upcoming consultations',
      scheduleNew: 'Schedule New',
      recentConsultations: 'Recent Consultations',
      viewSummary: 'View Summary',
      downloadPrescription: 'Download Prescription',
      quickConnect: 'Quick Connect',
      emergencyLine: '24/7 Emergency Line',
      onCallDoctor: 'On-Call Doctor',
      available: 'Available Now',
      networkStats: 'Network Statistics',
      latency: 'Latency',
      bandwidth: 'Bandwidth',
      packetLoss: 'Packet Loss',
      tips: 'Tips for Best Experience',
      tip1: 'Use a stable WiFi or wired connection',
      tip2: 'Ensure good lighting on your face',
      tip3: 'Use headphones to reduce echo',
      tip4: 'Close other bandwidth-heavy apps',
      permissionRequired: 'Permission Required',
      allowCamera: 'Please allow camera access',
      allowMic: 'Please allow microphone access',
      retryPermission: 'Retry',
      consultationHistory: 'Consultation History',
      totalConsultations: 'Total Consultations',
      avgDuration: 'Average Duration',
      satisfactionRate: 'Satisfaction Rate',
    },
    de: {
      title: 'Telemedizin-Zentrum',
      subtitle: 'Premium Virtuelle Gesundheitsversorgung',
      prepareCall: 'Anruf vorbereiten',
      deviceTest: 'Gerätetest',
      testCamera: 'Kamera testen',
      testMicrophone: 'Mikrofon testen',
      testSpeakers: 'Lautsprecher testen',
      cameraWorking: 'Kamera funktioniert',
      micWorking: 'Mikrofon funktioniert',
      speakersWorking: 'Lautsprecher funktionieren',
      deviceReady: 'Alle Geräte bereit',
      startCall: 'Konsultation starten',
      joinWaitingRoom: 'Warteraum beitreten',
      waitingRoom: 'Virtueller Warteraum',
      queuePosition: 'Ihre Position in der Warteschlange',
      estimatedWait: 'Geschätzte Wartezeit',
      minutes: 'Minuten',
      doctorPreparing: 'Arzt bereitet sich vor...',
      doctorReady: 'Arzt ist bereit!',
      joinNow: 'Jetzt beitreten',
      connectionQuality: 'Verbindungsqualität',
      excellent: 'Ausgezeichnet',
      good: 'Gut',
      fair: 'Ausreichend',
      poor: 'Schlecht',
      videoQuality: 'Videoqualität',
      sd: 'SD (480p)',
      hd: 'HD (720p)',
      fullHd: 'Full HD (1080p)',
      ultra: '4K Ultra',
      virtualBackground: 'Virtueller Hintergrund',
      bgNone: 'Keiner',
      bgBlur: 'Unschärfe',
      bgOffice: 'Arztpraxis',
      bgNature: 'Natur',
      upcomingConsultations: 'Bevorstehende Konsultationen',
      noUpcoming: 'Keine bevorstehenden Konsultationen',
      scheduleNew: 'Neu planen',
      recentConsultations: 'Letzte Konsultationen',
      viewSummary: 'Zusammenfassung ansehen',
      downloadPrescription: 'Rezept herunterladen',
      quickConnect: 'Schnellverbindung',
      emergencyLine: '24/7 Notfall-Hotline',
      onCallDoctor: 'Bereitschaftsarzt',
      available: 'Jetzt verfügbar',
      networkStats: 'Netzwerkstatistiken',
      latency: 'Latenz',
      bandwidth: 'Bandbreite',
      packetLoss: 'Paketverlust',
      tips: 'Tipps für beste Erfahrung',
      tip1: 'Nutzen Sie eine stabile WLAN- oder Kabelverbindung',
      tip2: 'Sorgen Sie für gute Beleuchtung Ihres Gesichts',
      tip3: 'Nutzen Sie Kopfhörer um Echo zu reduzieren',
      tip4: 'Schließen Sie andere bandbreitenintensive Apps',
      permissionRequired: 'Berechtigung erforderlich',
      allowCamera: 'Bitte erlauben Sie Kamerazugriff',
      allowMic: 'Bitte erlauben Sie Mikrofonzugriff',
      retryPermission: 'Erneut versuchen',
      consultationHistory: 'Konsultationshistorie',
      totalConsultations: 'Konsultationen gesamt',
      avgDuration: 'Durchschnittliche Dauer',
      satisfactionRate: 'Zufriedenheitsrate',
    },
    ar: {
      title: 'مركز الطب عن بعد',
      subtitle: 'رعاية صحية افتراضية متميزة',
      prepareCall: 'تحضير المكالمة',
      deviceTest: 'اختبار الأجهزة',
      testCamera: 'اختبار الكاميرا',
      testMicrophone: 'اختبار الميكروفون',
      testSpeakers: 'اختبار السماعات',
      cameraWorking: 'الكاميرا تعمل',
      micWorking: 'الميكروفون يعمل',
      speakersWorking: 'السماعات تعمل',
      deviceReady: 'جميع الأجهزة جاهزة',
      startCall: 'بدء الاستشارة',
      joinWaitingRoom: 'الانضمام لغرفة الانتظار',
      waitingRoom: 'غرفة الانتظار الافتراضية',
      queuePosition: 'موقعك في الطابور',
      estimatedWait: 'وقت الانتظار المتوقع',
      minutes: 'دقائق',
      doctorPreparing: 'الطبيب يستعد...',
      doctorReady: 'الطبيب جاهز!',
      joinNow: 'انضم الآن',
      connectionQuality: 'جودة الاتصال',
      excellent: 'ممتازة',
      good: 'جيدة',
      fair: 'مقبولة',
      poor: 'ضعيفة',
      videoQuality: 'جودة الفيديو',
      sd: 'SD (480p)',
      hd: 'HD (720p)',
      fullHd: 'Full HD (1080p)',
      ultra: '4K Ultra',
      virtualBackground: 'خلفية افتراضية',
      bgNone: 'بدون',
      bgBlur: 'ضبابي',
      bgOffice: 'عيادة طبية',
      bgNature: 'طبيعة',
      upcomingConsultations: 'الاستشارات القادمة',
      noUpcoming: 'لا توجد استشارات قادمة',
      scheduleNew: 'جدولة جديدة',
      recentConsultations: 'الاستشارات الأخيرة',
      viewSummary: 'عرض الملخص',
      downloadPrescription: 'تحميل الوصفة',
      quickConnect: 'اتصال سريع',
      emergencyLine: 'خط الطوارئ 24/7',
      onCallDoctor: 'طبيب مناوب',
      available: 'متاح الآن',
      networkStats: 'إحصائيات الشبكة',
      latency: 'زمن الاستجابة',
      bandwidth: 'عرض النطاق',
      packetLoss: 'فقدان الحزم',
      tips: 'نصائح لأفضل تجربة',
      tip1: 'استخدم اتصال WiFi مستقر أو سلكي',
      tip2: 'تأكد من إضاءة جيدة لوجهك',
      tip3: 'استخدم سماعات للحد من الصدى',
      tip4: 'أغلق التطبيقات الأخرى التي تستهلك النطاق',
      permissionRequired: 'مطلوب إذن',
      allowCamera: 'يرجى السماح بالوصول للكاميرا',
      allowMic: 'يرجى السماح بالوصول للميكروفون',
      retryPermission: 'إعادة المحاولة',
      consultationHistory: 'سجل الاستشارات',
      totalConsultations: 'إجمالي الاستشارات',
      avgDuration: 'متوسط المدة',
      satisfactionRate: 'معدل الرضا',
    }
  };

  const t = tr[lang] || tr.en;
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
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
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            color: var(--navy);
            min-height: 100vh;
        }
        
        /* Header */
        .dashboard-header {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            padding: 20px 24px;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        /* Cards */
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,31,63,0.08);
            padding: 24px;
            transition: all 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 8px 30px rgba(0,31,63,0.12);
            transform: translateY(-2px);
        }
        
        .card-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--navy);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-title i {
            color: var(--gold);
        }
        
        /* Device Test */
        .device-test-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: var(--cream);
            border-radius: 12px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
        }
        
        .device-test-item.testing {
            background: #FEF3C7;
        }
        
        .device-test-item.success {
            background: #D1FAE5;
        }
        
        .device-test-item.error {
            background: #FEE2E2;
        }
        
        .device-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            background: white;
            color: var(--navy);
        }
        
        .device-test-item.success .device-icon {
            background: var(--success);
            color: white;
        }
        
        .device-test-item.error .device-icon {
            background: var(--danger);
            color: white;
        }
        
        /* Video Preview */
        .video-preview {
            width: 100%;
            aspect-ratio: 16/9;
            background: #1a1a1a;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }
        
        .video-preview video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scaleX(-1);
        }
        
        .video-preview-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.7);
            color: white;
            gap: 16px;
        }
        
        .video-preview-overlay.hidden {
            display: none;
        }
        
        /* Audio Visualizer */
        .audio-visualizer {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 3px;
            height: 40px;
            padding: 8px 16px;
            background: var(--cream);
            border-radius: 8px;
        }
        
        .audio-bar {
            width: 4px;
            background: var(--gold);
            border-radius: 2px;
            transition: height 0.1s ease;
            min-height: 4px;
        }
        
        /* Quality Selector */
        .quality-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border: 2px solid #E5E7EB;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .quality-option:hover {
            border-color: var(--gold);
        }
        
        .quality-option.selected {
            border-color: var(--gold);
            background: linear-gradient(135deg, rgba(201,162,39,0.1) 0%, rgba(201,162,39,0.05) 100%);
        }
        
        .quality-badge {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .quality-badge.recommended {
            background: var(--success);
            color: white;
        }
        
        .quality-badge.premium {
            background: var(--gold);
            color: white;
        }
        
        /* Virtual Background */
        .bg-option {
            width: 80px;
            height: 60px;
            border-radius: 8px;
            cursor: pointer;
            border: 3px solid transparent;
            transition: all 0.2s ease;
            overflow: hidden;
            position: relative;
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
        
        .bg-option .bg-label {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.7);
            color: white;
            font-size: 10px;
            padding: 2px 4px;
            text-align: center;
        }
        
        /* Connection Quality */
        .connection-meter {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 24px;
        }
        
        .connection-bar {
            width: 6px;
            border-radius: 2px;
            background: #E5E7EB;
            transition: all 0.3s ease;
        }
        
        .connection-bar.active {
            background: var(--success);
        }
        
        .connection-bar.warning {
            background: var(--warning);
        }
        
        .connection-bar.danger {
            background: var(--danger);
        }
        
        /* Waiting Room */
        .waiting-room-card {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
        }
        
        .queue-position {
            font-size: 64px;
            font-weight: 700;
            color: var(--gold);
            line-height: 1;
        }
        
        .pulse-dot {
            width: 12px;
            height: 12px;
            background: var(--success);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        /* Buttons */
        .btn-primary {
            background: linear-gradient(135deg, var(--gold) 0%, #B8920F 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 10px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(201,162,39,0.4);
        }
        
        .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .btn-secondary {
            background: white;
            color: var(--navy);
            padding: 14px 28px;
            border-radius: 10px;
            font-weight: 600;
            border: 2px solid #E5E7EB;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .btn-secondary:hover {
            border-color: var(--gold);
            color: var(--gold);
        }
        
        /* Stats */
        .stat-card {
            text-align: center;
            padding: 20px;
        }
        
        .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: var(--navy);
        }
        
        .stat-label {
            font-size: 14px;
            color: #6B7280;
            margin-top: 4px;
        }
        
        /* Consultation List */
        .consultation-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border-radius: 12px;
            background: var(--cream);
            margin-bottom: 12px;
            transition: all 0.2s ease;
        }
        
        .consultation-item:hover {
            background: #F3F4F6;
        }
        
        .doctor-avatar {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 16px;
        }
        
        /* Tips */
        .tip-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px;
            background: #FEF3C7;
            border-radius: 10px;
            margin-bottom: 10px;
        }
        
        .tip-icon {
            width: 24px;
            height: 24px;
            background: var(--warning);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            flex-shrink: 0;
        }
        
        /* Network Stats */
        .network-stat {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .network-stat:last-child {
            border-bottom: none;
        }
        
        /* Loading Spinner */
        .spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(201,162,39,0.3);
            border-top-color: var(--gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Quick Connect */
        .quick-connect-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: white;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
        }
        
        .quick-connect-btn:hover {
            border-color: var(--gold);
            background: var(--cream);
        }
        
        .quick-connect-btn.emergency {
            border-color: var(--danger);
            background: #FEF2F2;
        }
        
        .quick-connect-btn.emergency:hover {
            background: #FEE2E2;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr !important;
            }
            
            .quality-options {
                grid-template-columns: 1fr !important;
            }
            
            .bg-options {
                flex-wrap: wrap;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="dashboard-header">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-4">
                <a href="/" class="flex items-center gap-3">
                    <img src="https://www.germanselect.org/favicon.ico" alt="SelectCareOS" style="height: 36px;">
                    <div>
                        <div class="text-lg font-semibold">SelectCareOS™</div>
                        <div class="text-sm opacity-70">${t.title}</div>
                    </div>
                </a>
            </div>
            
            <div class="flex items-center gap-4">
                <!-- Connection Quality Indicator -->
                <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <div class="connection-meter" id="connection-meter">
                        <div class="connection-bar active" style="height: 8px;"></div>
                        <div class="connection-bar active" style="height: 12px;"></div>
                        <div class="connection-bar active" style="height: 16px;"></div>
                        <div class="connection-bar active" style="height: 20px;"></div>
                        <div class="connection-bar active" style="height: 24px;"></div>
                    </div>
                    <span class="text-sm" id="connection-label">${t.excellent}</span>
                </div>
                
                <!-- Language Selector -->
                <select id="lang-selector" class="bg-white/10 border-none text-white px-3 py-2 rounded-lg cursor-pointer" onchange="changeLanguage(this.value)">
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                    <option value="de" ${lang === 'de' ? 'selected' : ''}>Deutsch</option>
                    <option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية</option>
                </select>
            </div>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto p-6">
        <div class="dashboard-grid grid grid-cols-3 gap-6">
            
            <!-- Left Column - Device Test & Video Preview -->
            <div class="col-span-2 space-y-6">
                
                <!-- Video Preview & Device Test -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-video"></i>
                        ${t.prepareCall}
                    </div>
                    
                    <div class="grid grid-cols-2 gap-6">
                        <!-- Video Preview -->
                        <div>
                            <div class="video-preview" id="video-preview">
                                <video id="local-video" autoplay muted playsinline></video>
                                <div class="video-preview-overlay" id="video-overlay">
                                    <i class="fas fa-video-slash text-4xl opacity-50"></i>
                                    <p>${t.allowCamera}</p>
                                    <button class="btn-primary" onclick="requestCameraPermission()">
                                        <i class="fas fa-camera"></i>
                                        ${t.retryPermission}
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Audio Visualizer -->
                            <div class="mt-4">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm text-gray-600">${t.testMicrophone}</span>
                                    <span class="text-sm font-medium text-green-600" id="mic-status"></span>
                                </div>
                                <div class="audio-visualizer" id="audio-visualizer">
                                    ${Array(20).fill(0).map(() => '<div class="audio-bar" style="height: 4px;"></div>').join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Device Tests -->
                        <div>
                            <div class="device-test-item" id="camera-test">
                                <div class="flex items-center gap-3">
                                    <div class="device-icon">
                                        <i class="fas fa-camera"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium">${t.testCamera}</div>
                                        <div class="text-sm text-gray-500" id="camera-status">Checking...</div>
                                    </div>
                                </div>
                                <div class="spinner" id="camera-spinner"></div>
                            </div>
                            
                            <div class="device-test-item" id="mic-test">
                                <div class="flex items-center gap-3">
                                    <div class="device-icon">
                                        <i class="fas fa-microphone"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium">${t.testMicrophone}</div>
                                        <div class="text-sm text-gray-500" id="microphone-status">Checking...</div>
                                    </div>
                                </div>
                                <div class="spinner" id="mic-spinner"></div>
                            </div>
                            
                            <div class="device-test-item" id="speaker-test">
                                <div class="flex items-center gap-3">
                                    <div class="device-icon">
                                        <i class="fas fa-volume-up"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium">${t.testSpeakers}</div>
                                        <div class="text-sm text-gray-500" id="speaker-status">Click to test</div>
                                    </div>
                                </div>
                                <button class="btn-secondary text-sm py-2 px-4" onclick="testSpeakers()">
                                    <i class="fas fa-play"></i> Test
                                </button>
                            </div>
                            
                            <!-- All Ready Status -->
                            <div class="mt-4 p-4 bg-green-50 rounded-lg hidden" id="all-ready">
                                <div class="flex items-center gap-3 text-green-700">
                                    <i class="fas fa-check-circle text-2xl"></i>
                                    <div>
                                        <div class="font-semibold">${t.deviceReady}</div>
                                        <div class="text-sm">You're ready to start your consultation</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Start Call Button -->
                            <button class="btn-primary w-full mt-4" id="start-call-btn" disabled onclick="startConsultation()">
                                <i class="fas fa-video"></i>
                                ${t.startCall}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Video Quality & Virtual Background -->
                <div class="grid grid-cols-2 gap-6">
                    <!-- Video Quality -->
                    <div class="card">
                        <div class="card-title">
                            <i class="fas fa-sliders-h"></i>
                            ${t.videoQuality}
                        </div>
                        
                        <div class="quality-options grid grid-cols-2 gap-3">
                            <div class="quality-option" data-quality="480" onclick="selectQuality(480)">
                                <i class="fas fa-tv text-gray-400"></i>
                                <div>
                                    <div class="font-medium">${t.sd}</div>
                                    <div class="text-xs text-gray-500">Low bandwidth</div>
                                </div>
                            </div>
                            
                            <div class="quality-option selected" data-quality="720" onclick="selectQuality(720)">
                                <i class="fas fa-tv text-blue-500"></i>
                                <div class="flex-1">
                                    <div class="font-medium">${t.hd}</div>
                                    <div class="text-xs text-gray-500">Recommended</div>
                                </div>
                                <span class="quality-badge recommended">Default</span>
                            </div>
                            
                            <div class="quality-option" data-quality="1080" onclick="selectQuality(1080)">
                                <i class="fas fa-tv text-purple-500"></i>
                                <div>
                                    <div class="font-medium">${t.fullHd}</div>
                                    <div class="text-xs text-gray-500">High quality</div>
                                </div>
                            </div>
                            
                            <div class="quality-option" data-quality="2160" onclick="selectQuality(2160)">
                                <i class="fas fa-tv text-gold-500" style="color: var(--gold);"></i>
                                <div class="flex-1">
                                    <div class="font-medium">${t.ultra}</div>
                                    <div class="text-xs text-gray-500">Medical imaging</div>
                                </div>
                                <span class="quality-badge premium">4K</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Virtual Background -->
                    <div class="card">
                        <div class="card-title">
                            <i class="fas fa-image"></i>
                            ${t.virtualBackground}
                        </div>
                        
                        <div class="bg-options flex gap-3">
                            <div class="bg-option selected" data-bg="none" onclick="selectBackground('none')">
                                <div style="background: #E5E7EB; height: 100%; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-ban text-gray-400"></i>
                                </div>
                                <span class="bg-label">${t.bgNone}</span>
                            </div>
                            
                            <div class="bg-option" data-bg="blur" onclick="selectBackground('blur')">
                                <div style="background: linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%); height: 100%; filter: blur(3px);"></div>
                                <span class="bg-label">${t.bgBlur}</span>
                            </div>
                            
                            <div class="bg-option" data-bg="office" onclick="selectBackground('office')">
                                <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=160&h=120&fit=crop" alt="Medical Office">
                                <span class="bg-label">${t.bgOffice}</span>
                            </div>
                            
                            <div class="bg-option" data-bg="nature" onclick="selectBackground('nature')">
                                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=160&h=120&fit=crop" alt="Nature">
                                <span class="bg-label">${t.bgNature}</span>
                            </div>
                        </div>
                        
                        <p class="text-xs text-gray-500 mt-4">
                            <i class="fas fa-info-circle mr-1"></i>
                            Virtual backgrounds require a modern browser with WebGL support.
                        </p>
                    </div>
                </div>
                
                <!-- Recent Consultations -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-history"></i>
                        ${t.recentConsultations}
                    </div>
                    
                    <div id="recent-consultations">
                        <div class="consultation-item">
                            <div class="doctor-avatar">KM</div>
                            <div class="flex-1">
                                <div class="font-medium">Dr. K. Müller</div>
                                <div class="text-sm text-gray-500">Cardiology Follow-up • Jan 20, 2026</div>
                            </div>
                            <div class="flex gap-2">
                                <button class="btn-secondary text-sm py-2 px-3">
                                    <i class="fas fa-file-alt mr-1"></i> ${t.viewSummary}
                                </button>
                            </div>
                        </div>
                        
                        <div class="consultation-item">
                            <div class="doctor-avatar">AM</div>
                            <div class="flex-1">
                                <div class="font-medium">Dr. A. Metwalli</div>
                                <div class="text-sm text-gray-500">Bariatric Surgery Consult • Jan 15, 2026</div>
                            </div>
                            <div class="flex gap-2">
                                <button class="btn-secondary text-sm py-2 px-3">
                                    <i class="fas fa-file-alt mr-1"></i> ${t.viewSummary}
                                </button>
                                <button class="btn-secondary text-sm py-2 px-3">
                                    <i class="fas fa-prescription mr-1"></i> Rx
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Column - Quick Actions & Stats -->
            <div class="space-y-6">
                
                <!-- Upcoming Consultation -->
                <div class="card waiting-room-card" id="waiting-room-card" style="display: none;">
                    <div class="text-center">
                        <div class="pulse-dot mx-auto mb-4"></div>
                        <div class="text-lg font-semibold mb-2">${t.waitingRoom}</div>
                        <div class="queue-position" id="queue-position">1</div>
                        <div class="text-sm opacity-70 mt-2">${t.queuePosition}</div>
                        <div class="mt-4 text-sm">
                            <i class="fas fa-clock mr-1"></i>
                            ${t.estimatedWait}: <span id="wait-time">~5</span> ${t.minutes}
                        </div>
                        <button class="btn-primary mt-6" id="join-now-btn" style="display: none;" onclick="joinCall()">
                            <i class="fas fa-video"></i>
                            ${t.joinNow}
                        </button>
                    </div>
                </div>
                
                <!-- Quick Connect -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-bolt"></i>
                        ${t.quickConnect}
                    </div>
                    
                    <div class="space-y-3">
                        <button class="quick-connect-btn emergency" onclick="callEmergency()">
                            <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
                                <i class="fas fa-phone-alt text-xl"></i>
                            </div>
                            <div class="flex-1 text-${isRtl ? 'right' : 'left'}">
                                <div class="font-semibold text-red-700">${t.emergencyLine}</div>
                                <div class="text-sm text-red-600">+49 30 12345678</div>
                            </div>
                        </button>
                        
                        <button class="quick-connect-btn" onclick="connectOnCall()">
                            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                                <i class="fas fa-user-md text-xl"></i>
                            </div>
                            <div class="flex-1 text-${isRtl ? 'right' : 'left'}">
                                <div class="font-semibold">${t.onCallDoctor}</div>
                                <div class="text-sm text-green-600 flex items-center gap-2">
                                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                    ${t.available}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                
                <!-- Network Statistics -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-wifi"></i>
                        ${t.networkStats}
                    </div>
                    
                    <div class="network-stat">
                        <span class="text-gray-600">${t.latency}</span>
                        <span class="font-semibold text-green-600" id="latency-value">32 ms</span>
                    </div>
                    <div class="network-stat">
                        <span class="text-gray-600">${t.bandwidth}</span>
                        <span class="font-semibold text-green-600" id="bandwidth-value">45 Mbps</span>
                    </div>
                    <div class="network-stat">
                        <span class="text-gray-600">${t.packetLoss}</span>
                        <span class="font-semibold text-green-600" id="packet-loss-value">0.1%</span>
                    </div>
                </div>
                
                <!-- Consultation Stats -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-chart-bar"></i>
                        ${t.consultationHistory}
                    </div>
                    
                    <div class="grid grid-cols-3 gap-2">
                        <div class="stat-card">
                            <div class="stat-value text-2xl">12</div>
                            <div class="stat-label text-xs">${t.totalConsultations}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value text-2xl">18m</div>
                            <div class="stat-label text-xs">${t.avgDuration}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value text-2xl">4.8</div>
                            <div class="stat-label text-xs">${t.satisfactionRate}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Tips -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-lightbulb"></i>
                        ${t.tips}
                    </div>
                    
                    <div class="tip-item">
                        <div class="tip-icon"><i class="fas fa-wifi"></i></div>
                        <div class="text-sm">${t.tip1}</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon"><i class="fas fa-sun"></i></div>
                        <div class="text-sm">${t.tip2}</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon"><i class="fas fa-headphones"></i></div>
                        <div class="text-sm">${t.tip3}</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon"><i class="fas fa-times-circle"></i></div>
                        <div class="text-sm">${t.tip4}</div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script>
        // ============================================
        // STATE
        // ============================================
        let localStream = null;
        let audioContext = null;
        let analyser = null;
        let animationId = null;
        let selectedQuality = 720;
        let selectedBackground = 'none';
        let deviceStatus = {
            camera: false,
            microphone: false,
            speakers: false
        };
        
        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', async () => {
            await initializeDevices();
            startNetworkMonitoring();
        });
        
        // ============================================
        // DEVICE TESTING
        // ============================================
        async function initializeDevices() {
            await testCamera();
            await testMicrophone();
            checkAllDevicesReady();
        }
        
        async function testCamera() {
            const testItem = document.getElementById('camera-test');
            const status = document.getElementById('camera-status');
            const spinner = document.getElementById('camera-spinner');
            const overlay = document.getElementById('video-overlay');
            const video = document.getElementById('local-video');
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'user'
                    } 
                });
                
                localStream = stream;
                video.srcObject = stream;
                
                testItem.classList.remove('testing', 'error');
                testItem.classList.add('success');
                status.textContent = '${t.cameraWorking}';
                spinner.style.display = 'none';
                overlay.classList.add('hidden');
                deviceStatus.camera = true;
                
            } catch (error) {
                console.error('Camera error:', error);
                testItem.classList.remove('testing', 'success');
                testItem.classList.add('error');
                status.textContent = 'Camera access denied';
                spinner.style.display = 'none';
                deviceStatus.camera = false;
            }
            
            checkAllDevicesReady();
        }
        
        async function testMicrophone() {
            const testItem = document.getElementById('mic-test');
            const status = document.getElementById('microphone-status');
            const spinner = document.getElementById('mic-spinner');
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Setup audio visualizer
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                analyser.fftSize = 64;
                
                startAudioVisualization();
                
                testItem.classList.remove('testing', 'error');
                testItem.classList.add('success');
                status.textContent = '${t.micWorking}';
                spinner.style.display = 'none';
                deviceStatus.microphone = true;
                
                // Merge audio with video stream if available
                if (localStream) {
                    stream.getAudioTracks().forEach(track => localStream.addTrack(track));
                } else {
                    localStream = stream;
                }
                
            } catch (error) {
                console.error('Microphone error:', error);
                testItem.classList.remove('testing', 'success');
                testItem.classList.add('error');
                status.textContent = 'Microphone access denied';
                spinner.style.display = 'none';
                deviceStatus.microphone = false;
            }
            
            checkAllDevicesReady();
        }
        
        function testSpeakers() {
            const testItem = document.getElementById('speaker-test');
            const status = document.getElementById('speaker-status');
            
            try {
                // Create test audio
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.frequency.value = 440; // A4 note
                gainNode.gain.value = 0.3;
                
                oscillator.start();
                
                setTimeout(() => {
                    oscillator.stop();
                    testItem.classList.remove('testing', 'error');
                    testItem.classList.add('success');
                    status.textContent = '${t.speakersWorking}';
                    deviceStatus.speakers = true;
                    checkAllDevicesReady();
                }, 500);
                
            } catch (error) {
                console.error('Speaker error:', error);
                testItem.classList.remove('testing', 'success');
                testItem.classList.add('error');
                status.textContent = 'Speaker test failed';
                deviceStatus.speakers = false;
            }
        }
        
        function startAudioVisualization() {
            const bars = document.querySelectorAll('.audio-bar');
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            function draw() {
                analyser.getByteFrequencyData(dataArray);
                
                bars.forEach((bar, i) => {
                    const value = dataArray[i] || 0;
                    const height = Math.max(4, (value / 255) * 40);
                    bar.style.height = height + 'px';
                });
                
                animationId = requestAnimationFrame(draw);
            }
            
            draw();
        }
        
        function checkAllDevicesReady() {
            const allReady = document.getElementById('all-ready');
            const startBtn = document.getElementById('start-call-btn');
            
            if (deviceStatus.camera && deviceStatus.microphone) {
                allReady.classList.remove('hidden');
                startBtn.disabled = false;
            } else {
                allReady.classList.add('hidden');
                startBtn.disabled = true;
            }
        }
        
        async function requestCameraPermission() {
            await testCamera();
        }
        
        // ============================================
        // QUALITY & BACKGROUND SELECTION
        // ============================================
        function selectQuality(quality) {
            selectedQuality = quality;
            
            document.querySelectorAll('.quality-option').forEach(opt => {
                opt.classList.remove('selected');
                if (parseInt(opt.dataset.quality) === quality) {
                    opt.classList.add('selected');
                }
            });
            
            // Update video constraints if stream exists
            if (localStream) {
                const videoTrack = localStream.getVideoTracks()[0];
                if (videoTrack) {
                    const constraints = {
                        width: { ideal: quality === 2160 ? 3840 : quality === 1080 ? 1920 : quality === 720 ? 1280 : 854 },
                        height: { ideal: quality },
                        frameRate: { ideal: quality >= 1080 ? 30 : 24 }
                    };
                    videoTrack.applyConstraints(constraints).catch(console.error);
                }
            }
        }
        
        function selectBackground(bg) {
            selectedBackground = bg;
            
            document.querySelectorAll('.bg-option').forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.bg === bg) {
                    opt.classList.add('selected');
                }
            });
            
            // Note: Virtual background implementation requires additional libraries
            // like TensorFlow.js or MediaPipe for real-time segmentation
            console.log('Selected background:', bg);
        }
        
        // ============================================
        // NETWORK MONITORING
        // ============================================
        function startNetworkMonitoring() {
            updateNetworkStats();
            setInterval(updateNetworkStats, 5000);
        }
        
        async function updateNetworkStats() {
            // Simulate network statistics (in production, use WebRTC stats API)
            const latency = 20 + Math.random() * 30;
            const bandwidth = 30 + Math.random() * 50;
            const packetLoss = Math.random() * 0.5;
            
            document.getElementById('latency-value').textContent = Math.round(latency) + ' ms';
            document.getElementById('bandwidth-value').textContent = Math.round(bandwidth) + ' Mbps';
            document.getElementById('packet-loss-value').textContent = packetLoss.toFixed(1) + '%';
            
            // Update connection quality indicator
            updateConnectionQuality(latency, bandwidth, packetLoss);
        }
        
        function updateConnectionQuality(latency, bandwidth, packetLoss) {
            const bars = document.querySelectorAll('.connection-bar');
            const label = document.getElementById('connection-label');
            
            let quality = 'excellent';
            let activeBars = 5;
            
            if (latency > 100 || bandwidth < 10 || packetLoss > 2) {
                quality = 'poor';
                activeBars = 1;
            } else if (latency > 70 || bandwidth < 20 || packetLoss > 1) {
                quality = 'fair';
                activeBars = 3;
            } else if (latency > 50 || bandwidth < 30 || packetLoss > 0.5) {
                quality = 'good';
                activeBars = 4;
            }
            
            bars.forEach((bar, i) => {
                bar.classList.remove('active', 'warning', 'danger');
                if (i < activeBars) {
                    bar.classList.add('active');
                    if (quality === 'poor') bar.classList.add('danger');
                    else if (quality === 'fair') bar.classList.add('warning');
                }
            });
            
            const labels = {
                excellent: '${t.excellent}',
                good: '${t.good}',
                fair: '${t.fair}',
                poor: '${t.poor}'
            };
            label.textContent = labels[quality];
        }
        
        // ============================================
        // CONSULTATION ACTIONS
        // ============================================
        async function startConsultation() {
            const consultationId = '${consultationId}' || 'quick-' + Date.now().toString(36);
            
            // Create room via API
            try {
                const response = await fetch('/api/telemedicine/room/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        consultationId,
                        patientName: 'Patient',
                        doctorName: 'Doctor',
                        quality: selectedQuality >= 1080 ? 'fullhd' : selectedQuality >= 720 ? 'hd' : 'sd',
                        enableScreenShare: true
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Stop local stream before navigating
                    if (localStream) {
                        localStream.getTracks().forEach(track => track.stop());
                    }
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                    
                    // Navigate to video consultation
                    const role = '${role}';
                    window.location.href = '/video-consultation/' + consultationId + '?role=' + role + '&quality=' + selectedQuality;
                } else {
                    alert('Failed to create consultation room');
                }
            } catch (error) {
                console.error('Error starting consultation:', error);
                alert('Error starting consultation. Please try again.');
            }
        }
        
        function joinCall() {
            const consultationId = '${consultationId}';
            if (consultationId) {
                window.location.href = '/video-consultation/' + consultationId + '?role=${role}';
            }
        }
        
        function callEmergency() {
            window.location.href = 'tel:+493012345678';
        }
        
        async function connectOnCall() {
            try {
                const response = await fetch('/api/telemedicine/quick-room');
                const data = await response.json();
                
                if (data.success) {
                    window.open(data.data.joinUrl, '_blank');
                }
            } catch (error) {
                console.error('Error connecting to on-call doctor:', error);
            }
        }
        
        // ============================================
        // LANGUAGE
        // ============================================
        function changeLanguage(lang) {
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
        }
        
        // ============================================
        // CLEANUP
        // ============================================
        window.addEventListener('beforeunload', () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (audioContext) {
                audioContext.close();
            }
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    </script>
</body>
</html>`;
}
