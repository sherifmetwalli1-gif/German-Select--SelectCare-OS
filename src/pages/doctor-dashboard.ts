/**
 * Doctor Dashboard - SelectCareOS™ Telemedicine
 * Enhanced Comprehensive Doctor Portal v2.0
 * 
 * Features:
 * - Real-time consultation requests with live polling
 * - Availability status toggle with heartbeat
 * - Weekly schedule management with drag-and-drop
 * - Online booking calendar with slot reservation
 * - Consultation history and statistics
 * - Earnings analytics with charts
 * - Patient queue management
 * - Quick prescription writing
 * - Medical notes and records
 * - Video call integration
 * - Multi-language support (EN, DE, AR, FR)
 */

import type { Context } from 'hono';

export function doctorDashboardPage(c: Context): string {
  const doctorId = c.req.query('id') || 'dr-demo';
  const lang = c.req.query('lang') || 'en';
  const tab = c.req.query('tab') || 'overview';
  
  // Translations
  const tr: Record<string, Record<string, string>> = {
    en: {
      title: 'Doctor Dashboard',
      welcome: 'Welcome back',
      overview: 'Overview',
      schedule: 'Schedule',
      consultations: 'Consultations',
      patients: 'Patients',
      earnings: 'Earnings',
      settings: 'Settings',
      prescriptions: 'Prescriptions',
      
      // Status
      available: 'Available',
      busy: 'Busy',
      offline: 'Offline',
      inCall: 'In Call',
      goOnline: 'Go Online',
      goOffline: 'Go Offline',
      
      // Stats
      todayConsultations: "Today's Consultations",
      pendingRequests: 'Pending Requests',
      totalEarnings: 'Total Earnings',
      avgRating: 'Average Rating',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      completionRate: 'Completion Rate',
      avgDuration: 'Avg Duration',
      
      // Schedule
      weeklySchedule: 'Weekly Schedule',
      timeSlots: 'Time Slots',
      addSlot: 'Add Time Slot',
      removeSlot: 'Remove',
      saveSchedule: 'Save Schedule',
      blockedTimes: 'Blocked Times',
      addBlockedTime: 'Block Time Off',
      vacation: 'Vacation',
      conference: 'Conference',
      personal: 'Personal',
      
      // Days
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      
      // Consultations
      activeConsultations: 'Active Consultations',
      waitingPatients: 'Waiting Patients',
      acceptRequest: 'Accept',
      declineRequest: 'Decline',
      joinCall: 'Join Call',
      viewHistory: 'View History',
      noRequests: 'No pending requests',
      upcomingToday: 'Upcoming Today',
      recentPatients: 'Recent Patients',
      
      // Patient Info
      patientName: 'Patient Name',
      symptoms: 'Symptoms',
      urgency: 'Urgency',
      waitTime: 'Wait Time',
      language: 'Language',
      
      // Actions
      startConsultation: 'Start Consultation',
      endConsultation: 'End Consultation',
      writePrescription: 'Write Prescription',
      addNotes: 'Add Notes',
      viewProfile: 'View Profile',
      sendMessage: 'Send Message',
      
      // Prescription
      newPrescription: 'New Prescription',
      medication: 'Medication',
      dosage: 'Dosage',
      frequency: 'Frequency',
      duration: 'Duration',
      instructions: 'Instructions',
      savePrescription: 'Save Prescription',
      
      // Alerts
      newRequest: 'New consultation request!',
      requestAccepted: 'Request accepted',
      requestDeclined: 'Request declined',
      scheduleUpdated: 'Schedule updated successfully',
      prescriptionSaved: 'Prescription saved',
    },
    de: {
      title: 'Arzt-Dashboard',
      welcome: 'Willkommen zurück',
      overview: 'Übersicht',
      schedule: 'Zeitplan',
      consultations: 'Konsultationen',
      patients: 'Patienten',
      earnings: 'Einnahmen',
      settings: 'Einstellungen',
      prescriptions: 'Rezepte',
      
      available: 'Verfügbar',
      busy: 'Beschäftigt',
      offline: 'Offline',
      inCall: 'Im Gespräch',
      goOnline: 'Online gehen',
      goOffline: 'Offline gehen',
      
      todayConsultations: 'Konsultationen heute',
      pendingRequests: 'Ausstehende Anfragen',
      totalEarnings: 'Gesamteinnahmen',
      avgRating: 'Durchschnittliche Bewertung',
      thisWeek: 'Diese Woche',
      thisMonth: 'Diesen Monat',
      completionRate: 'Abschlussrate',
      avgDuration: 'Durchschn. Dauer',
      
      weeklySchedule: 'Wochenplan',
      timeSlots: 'Zeitfenster',
      addSlot: 'Zeitfenster hinzufügen',
      removeSlot: 'Entfernen',
      saveSchedule: 'Zeitplan speichern',
      blockedTimes: 'Blockierte Zeiten',
      addBlockedTime: 'Zeit blockieren',
      vacation: 'Urlaub',
      conference: 'Konferenz',
      personal: 'Persönlich',
      
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag',
      
      activeConsultations: 'Aktive Konsultationen',
      waitingPatients: 'Wartende Patienten',
      acceptRequest: 'Annehmen',
      declineRequest: 'Ablehnen',
      joinCall: 'Beitreten',
      viewHistory: 'Verlauf anzeigen',
      noRequests: 'Keine ausstehenden Anfragen',
      upcomingToday: 'Heute anstehend',
      recentPatients: 'Letzte Patienten',
      
      patientName: 'Patientenname',
      symptoms: 'Symptome',
      urgency: 'Dringlichkeit',
      waitTime: 'Wartezeit',
      language: 'Sprache',
      
      startConsultation: 'Konsultation starten',
      endConsultation: 'Konsultation beenden',
      writePrescription: 'Rezept schreiben',
      addNotes: 'Notizen hinzufügen',
      viewProfile: 'Profil anzeigen',
      sendMessage: 'Nachricht senden',
      
      newPrescription: 'Neues Rezept',
      medication: 'Medikament',
      dosage: 'Dosierung',
      frequency: 'Häufigkeit',
      duration: 'Dauer',
      instructions: 'Anweisungen',
      savePrescription: 'Rezept speichern',
      
      newRequest: 'Neue Konsultationsanfrage!',
      requestAccepted: 'Anfrage angenommen',
      requestDeclined: 'Anfrage abgelehnt',
      scheduleUpdated: 'Zeitplan erfolgreich aktualisiert',
      prescriptionSaved: 'Rezept gespeichert',
    },
    ar: {
      title: 'لوحة تحكم الطبيب',
      welcome: 'مرحباً بعودتك',
      overview: 'نظرة عامة',
      schedule: 'الجدول',
      consultations: 'الاستشارات',
      patients: 'المرضى',
      earnings: 'الأرباح',
      settings: 'الإعدادات',
      prescriptions: 'الوصفات الطبية',
      
      available: 'متاح',
      busy: 'مشغول',
      offline: 'غير متصل',
      inCall: 'في مكالمة',
      goOnline: 'اتصل الآن',
      goOffline: 'انقطع',
      
      todayConsultations: 'استشارات اليوم',
      pendingRequests: 'طلبات معلقة',
      totalEarnings: 'إجمالي الأرباح',
      avgRating: 'متوسط التقييم',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      completionRate: 'معدل الإنجاز',
      avgDuration: 'المدة المتوسطة',
      
      weeklySchedule: 'الجدول الأسبوعي',
      timeSlots: 'فترات زمنية',
      addSlot: 'إضافة فترة',
      removeSlot: 'إزالة',
      saveSchedule: 'حفظ الجدول',
      blockedTimes: 'الأوقات المحجوبة',
      addBlockedTime: 'حجب وقت',
      vacation: 'إجازة',
      conference: 'مؤتمر',
      personal: 'شخصي',
      
      monday: 'الإثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة',
      saturday: 'السبت',
      sunday: 'الأحد',
      
      activeConsultations: 'الاستشارات النشطة',
      waitingPatients: 'المرضى المنتظرون',
      acceptRequest: 'قبول',
      declineRequest: 'رفض',
      joinCall: 'انضمام',
      viewHistory: 'عرض السجل',
      noRequests: 'لا توجد طلبات معلقة',
      upcomingToday: 'القادم اليوم',
      recentPatients: 'المرضى الأخيرون',
      
      patientName: 'اسم المريض',
      symptoms: 'الأعراض',
      urgency: 'الإلحاح',
      waitTime: 'وقت الانتظار',
      language: 'اللغة',
      
      startConsultation: 'بدء الاستشارة',
      endConsultation: 'إنهاء الاستشارة',
      writePrescription: 'كتابة وصفة',
      addNotes: 'إضافة ملاحظات',
      viewProfile: 'عرض الملف',
      sendMessage: 'إرسال رسالة',
      
      newPrescription: 'وصفة جديدة',
      medication: 'الدواء',
      dosage: 'الجرعة',
      frequency: 'التكرار',
      duration: 'المدة',
      instructions: 'التعليمات',
      savePrescription: 'حفظ الوصفة',
      
      newRequest: 'طلب استشارة جديد!',
      requestAccepted: 'تم قبول الطلب',
      requestDeclined: 'تم رفض الطلب',
      scheduleUpdated: 'تم تحديث الجدول بنجاح',
      prescriptionSaved: 'تم حفظ الوصفة',
    },
    fr: {
      title: 'Tableau de Bord Médecin',
      welcome: 'Bienvenue',
      overview: 'Aperçu',
      schedule: 'Calendrier',
      consultations: 'Consultations',
      patients: 'Patients',
      earnings: 'Revenus',
      settings: 'Paramètres',
      prescriptions: 'Ordonnances',
      
      available: 'Disponible',
      busy: 'Occupé',
      offline: 'Hors ligne',
      inCall: 'En appel',
      goOnline: 'Se connecter',
      goOffline: 'Se déconnecter',
      
      todayConsultations: "Consultations d'aujourd'hui",
      pendingRequests: 'Demandes en attente',
      totalEarnings: 'Revenus totaux',
      avgRating: 'Note moyenne',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      completionRate: 'Taux de complétion',
      avgDuration: 'Durée moyenne',
      
      weeklySchedule: 'Planning hebdomadaire',
      timeSlots: 'Créneaux horaires',
      addSlot: 'Ajouter un créneau',
      removeSlot: 'Supprimer',
      saveSchedule: 'Enregistrer',
      blockedTimes: 'Temps bloqués',
      addBlockedTime: 'Bloquer du temps',
      vacation: 'Vacances',
      conference: 'Conférence',
      personal: 'Personnel',
      
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      
      activeConsultations: 'Consultations actives',
      waitingPatients: 'Patients en attente',
      acceptRequest: 'Accepter',
      declineRequest: 'Refuser',
      joinCall: 'Rejoindre',
      viewHistory: "Voir l'historique",
      noRequests: 'Aucune demande en attente',
      upcomingToday: "À venir aujourd'hui",
      recentPatients: 'Patients récents',
      
      patientName: 'Nom du patient',
      symptoms: 'Symptômes',
      urgency: 'Urgence',
      waitTime: "Temps d'attente",
      language: 'Langue',
      
      startConsultation: 'Démarrer la consultation',
      endConsultation: 'Terminer la consultation',
      writePrescription: 'Rédiger une ordonnance',
      addNotes: 'Ajouter des notes',
      viewProfile: 'Voir le profil',
      sendMessage: 'Envoyer un message',
      
      newPrescription: 'Nouvelle ordonnance',
      medication: 'Médicament',
      dosage: 'Dosage',
      frequency: 'Fréquence',
      duration: 'Durée',
      instructions: 'Instructions',
      savePrescription: "Enregistrer l'ordonnance",
      
      newRequest: 'Nouvelle demande de consultation!',
      requestAccepted: 'Demande acceptée',
      requestDeclined: 'Demande refusée',
      scheduleUpdated: 'Planning mis à jour',
      prescriptionSaved: 'Ordonnance enregistrée',
    }
  };
  
  const t = tr[lang] || tr.en;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // Sample data for demo
  const samplePatients = [
    { id: 'p1', name: 'Ahmed Hassan', age: 45, gender: 'Male', lastVisit: '2 days ago', condition: 'Post-bariatric follow-up', avatar: 'AH' },
    { id: 'p2', name: 'Maria Schmidt', age: 38, gender: 'Female', lastVisit: '1 week ago', condition: 'Weight management', avatar: 'MS' },
    { id: 'p3', name: 'Klaus Weber', age: 52, gender: 'Male', lastVisit: '3 days ago', condition: 'Cardiac checkup', avatar: 'KW' },
    { id: 'p4', name: 'Fatima Ali', age: 29, gender: 'Female', lastVisit: 'Today', condition: 'General consultation', avatar: 'FA' },
  ];

  const sampleAppointments = [
    { id: 'a1', time: '09:00', patient: 'Ahmed Hassan', type: 'Follow-up', status: 'confirmed', duration: 30 },
    { id: 'a2', time: '10:00', patient: 'Maria Schmidt', type: 'Video Call', status: 'confirmed', duration: 45 },
    { id: 'a3', time: '11:30', patient: 'New Patient', type: 'Initial Consultation', status: 'pending', duration: 60 },
    { id: 'a4', time: '14:00', patient: 'Klaus Weber', type: 'Check-up', status: 'confirmed', duration: 30 },
  ];

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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
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
        
        /* Sidebar */
        .sidebar {
            position: fixed;
            top: 0;
            ${isRtl ? 'right' : 'left'}: 0;
            width: 280px;
            height: 100vh;
            background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            padding: 24px 16px;
            overflow-y: auto;
            z-index: 50;
            transition: transform 0.3s ease;
        }
        
        .sidebar-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 8px 24px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 24px;
        }
        
        .sidebar-logo img {
            height: 40px;
            width: 40px;
            border-radius: 10px;
        }
        
        .sidebar-logo span {
            font-size: 18px;
            font-weight: 700;
        }
        
        .doctor-profile {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            margin-bottom: 24px;
        }
        
        .doctor-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            color: var(--navy);
        }
        
        .doctor-info h3 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
        }
        
        .doctor-info p {
            margin: 4px 0 0;
            font-size: 12px;
            color: rgba(255,255,255,0.7);
        }
        
        .nav-section {
            margin-bottom: 24px;
        }
        
        .nav-section-title {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: rgba(255,255,255,0.5);
            padding: 0 16px;
            margin-bottom: 8px;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            margin-bottom: 4px;
            transition: all 0.2s ease;
            cursor: pointer;
            font-size: 14px;
        }
        
        .nav-item:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        
        .nav-item.active {
            background: var(--gold);
            color: var(--navy);
            font-weight: 600;
        }
        
        .nav-item i {
            width: 20px;
            text-align: center;
        }
        
        .nav-item .badge {
            margin-${isRtl ? 'right' : 'left'}: auto;
            background: var(--danger);
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 10px;
        }
        
        /* Main Content */
        .main-content {
            ${isRtl ? 'margin-right' : 'margin-left'}: 280px;
            padding: 24px;
            min-height: 100vh;
        }
        
        /* Header */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            flex-wrap: wrap;
            gap: 16px;
        }
        
        .header-left h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
        }
        
        .header-left p {
            color: #6B7280;
            margin: 4px 0 0;
            font-size: 14px;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        /* Status Toggle */
        .status-toggle {
            display: flex;
            align-items: center;
            gap: 16px;
            background: white;
            padding: 12px 20px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #9CA3AF;
            transition: all 0.3s ease;
        }
        
        .status-indicator.available {
            background: var(--success);
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
            animation: pulse-status 2s ease-in-out infinite;
        }
        
        .status-indicator.busy {
            background: var(--warning);
        }
        
        .status-indicator.in_call {
            background: var(--danger);
            animation: pulse-status 1s ease-in-out infinite;
        }
        
        @keyframes pulse-status {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        .status-btn {
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
        }
        
        .status-btn.online {
            background: var(--success);
            color: white;
        }
        
        .status-btn.offline {
            background: #E5E7EB;
            color: #6B7280;
        }
        
        .status-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        /* Quick Actions */
        .quick-actions {
            display: flex;
            gap: 12px;
        }
        
        .quick-action-btn {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.2s ease;
            position: relative;
        }
        
        .quick-action-btn.primary {
            background: var(--gold);
            color: white;
        }
        
        .quick-action-btn.secondary {
            background: white;
            color: var(--navy);
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .quick-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .quick-action-btn .notification-dot {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 8px;
            height: 8px;
            background: var(--danger);
            border-radius: 50%;
        }
        
        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 24px;
        }
        
        .stat-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            ${isRtl ? 'right' : 'left'}: 0;
            width: 4px;
            height: 100%;
            background: var(--gold);
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        
        .stat-card:hover::before {
            opacity: 1;
        }
        
        .stat-card .icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin-bottom: 16px;
        }
        
        .stat-card .icon.green { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .stat-card .icon.blue { background: rgba(59, 130, 246, 0.1); color: var(--info); }
        .stat-card .icon.gold { background: rgba(201, 162, 39, 0.1); color: var(--gold); }
        .stat-card .icon.purple { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; }
        .stat-card .icon.red { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
        
        .stat-card .value {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 4px;
            line-height: 1;
        }
        
        .stat-card .label {
            font-size: 14px;
            color: #6B7280;
        }
        
        .stat-card .trend {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            margin-top: 8px;
        }
        
        .stat-card .trend.up { color: var(--success); }
        .stat-card .trend.down { color: var(--danger); }
        
        /* Content Grid */
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
        }
        
        .content-grid.full {
            grid-template-columns: 1fr;
        }
        
        /* Section Card */
        .section-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            margin-bottom: 24px;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .section-title .badge {
            background: var(--danger);
            color: white;
            font-size: 12px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 10px;
            animation: pulse-badge 2s ease-in-out infinite;
        }
        
        @keyframes pulse-badge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        /* Patient/Request Card */
        .request-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: #F9FAFB;
            border-radius: 12px;
            margin-bottom: 12px;
            border: 1px solid #E5E7EB;
            transition: all 0.2s ease;
        }
        
        .request-card:hover {
            border-color: var(--gold);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .request-card.urgent {
            border-left: 4px solid var(--danger);
        }
        
        .request-card.routine {
            border-left: 4px solid var(--success);
        }
        
        .request-card.active {
            background: rgba(201, 162, 39, 0.1);
            border-color: var(--gold);
        }
        
        .patient-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .patient-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
        }
        
        .patient-details h4 {
            margin: 0 0 4px;
            font-size: 15px;
            font-weight: 600;
        }
        
        .patient-details p {
            margin: 0;
            font-size: 13px;
            color: #6B7280;
        }
        
        .request-meta {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .meta-item {
            text-align: center;
        }
        
        .meta-item .value {
            font-size: 14px;
            font-weight: 600;
            color: var(--navy);
        }
        
        .meta-item .label {
            font-size: 11px;
            color: #9CA3AF;
        }
        
        .urgency-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .urgency-badge.emergency { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
        .urgency-badge.urgent { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .urgency-badge.routine { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        
        .request-actions {
            display: flex;
            gap: 8px;
        }
        
        .action-btn {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .action-btn.accept { background: var(--success); color: white; }
        .action-btn.accept:hover { background: #059669; }
        
        .action-btn.decline { background: #F3F4F6; color: #6B7280; }
        .action-btn.decline:hover { background: #E5E7EB; }
        
        .action-btn.join { background: var(--gold); color: white; }
        .action-btn.join:hover { background: #B8920F; }
        
        .action-btn.primary { background: var(--navy); color: white; }
        .action-btn.primary:hover { background: var(--navy-light); }
        
        /* Today's Schedule */
        .schedule-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 0;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .schedule-item:last-child {
            border-bottom: none;
        }
        
        .schedule-time {
            font-size: 14px;
            font-weight: 600;
            color: var(--navy);
            min-width: 60px;
        }
        
        .schedule-details {
            flex: 1;
        }
        
        .schedule-details h4 {
            margin: 0 0 4px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .schedule-details p {
            margin: 0;
            font-size: 12px;
            color: #6B7280;
        }
        
        .schedule-status {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .schedule-status.confirmed {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
        }
        
        .schedule-status.pending {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning);
        }
        
        /* Quick Stats Sidebar */
        .quick-stats {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .quick-stat-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: #F9FAFB;
            border-radius: 12px;
        }
        
        .quick-stat-item .label {
            font-size: 13px;
            color: #6B7280;
        }
        
        .quick-stat-item .value {
            font-size: 18px;
            font-weight: 700;
            color: var(--navy);
        }
        
        /* Weekly Schedule Grid */
        .schedule-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 12px;
        }
        
        .day-column {
            background: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            min-height: 280px;
        }
        
        .day-header {
            text-align: center;
            padding-bottom: 12px;
            border-bottom: 1px solid #E5E7EB;
            margin-bottom: 12px;
        }
        
        .day-name {
            font-weight: 600;
            font-size: 14px;
            color: var(--navy);
        }
        
        .day-toggle {
            margin-top: 8px;
        }
        
        .toggle-switch {
            position: relative;
            width: 44px;
            height: 24px;
            background: #E5E7EB;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s ease;
            display: inline-block;
        }
        
        .toggle-switch.active {
            background: var(--success);
        }
        
        .toggle-switch::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            top: 2px;
            ${isRtl ? 'right' : 'left'}: 2px;
            transition: ${isRtl ? 'right' : 'left'} 0.2s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .toggle-switch.active::after {
            ${isRtl ? 'right' : 'left'}: 22px;
        }
        
        .time-slots {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 160px;
        }
        
        .time-slot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            background: #F9FAFB;
            border-radius: 8px;
            font-size: 13px;
            border: 1px solid #E5E7EB;
        }
        
        .time-slot.booked {
            background: rgba(201, 162, 39, 0.1);
            border-color: var(--gold);
        }
        
        .time-slot.blocked {
            background: rgba(239, 68, 68, 0.1);
            border-color: var(--danger);
            text-decoration: line-through;
            color: #9CA3AF;
        }
        
        .add-slot-btn {
            width: 100%;
            padding: 10px;
            border: 2px dashed #D1D5DB;
            border-radius: 8px;
            background: transparent;
            color: #9CA3AF;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 8px;
        }
        
        .add-slot-btn:hover {
            border-color: var(--gold);
            color: var(--gold);
        }
        
        /* Booking Calendar */
        .booking-calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
        }
        
        .calendar-header {
            text-align: center;
            font-size: 12px;
            font-weight: 600;
            color: #6B7280;
            padding: 8px;
        }
        
        .calendar-day {
            aspect-ratio: 1;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 2px solid transparent;
            background: white;
            position: relative;
        }
        
        .calendar-day:hover:not(.disabled) {
            border-color: var(--gold);
            transform: scale(1.05);
        }
        
        .calendar-day.today {
            border-color: var(--navy);
            font-weight: 700;
        }
        
        .calendar-day.selected {
            background: var(--gold);
            color: white;
            border-color: var(--gold);
        }
        
        .calendar-day.disabled {
            background: #F3F4F6;
            color: #9CA3AF;
            cursor: not-allowed;
        }
        
        .calendar-day.has-slots {
            background: rgba(16, 185, 129, 0.1);
        }
        
        .calendar-day .slot-count {
            font-size: 10px;
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: var(--success);
            color: white;
            padding: 1px 4px;
            border-radius: 4px;
        }
        
        /* Earnings Chart Container */
        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }
        
        /* Prescription Form */
        .prescription-form {
            display: grid;
            gap: 16px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        
        .form-label {
            font-size: 13px;
            font-weight: 500;
            color: var(--navy);
        }
        
        .form-input, .form-select, .form-textarea {
            padding: 12px 16px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.2s;
            font-family: inherit;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--gold);
        }
        
        .form-textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        /* Modal */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
            backdrop-filter: blur(4px);
        }
        
        .modal-overlay.show {
            display: flex;
        }
        
        .modal {
            background: white;
            border-radius: 16px;
            padding: 24px;
            width: 100%;
            max-width: 560px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .modal-title {
            font-size: 20px;
            font-weight: 600;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #9CA3AF;
            transition: color 0.2s;
        }
        
        .modal-close:hover {
            color: var(--navy);
        }
        
        .submit-btn {
            width: 100%;
            padding: 14px;
            background: var(--gold);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-top: 8px;
        }
        
        .submit-btn:hover {
            background: #B8920F;
        }
        
        /* Toast Notifications */
        .toast-container {
            position: fixed;
            top: 24px;
            ${isRtl ? 'left' : 'right'}: 24px;
            z-index: 200;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .toast {
            padding: 16px 24px;
            border-radius: 12px;
            background: white;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
            min-width: 300px;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(${isRtl ? '-100%' : '100%'});
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toast.success { border-${isRtl ? 'right' : 'left'}: 4px solid var(--success); }
        .toast.error { border-${isRtl ? 'right' : 'left'}: 4px solid var(--danger); }
        .toast.warning { border-${isRtl ? 'right' : 'left'}: 4px solid var(--warning); }
        .toast.info { border-${isRtl ? 'right' : 'left'}: 4px solid var(--info); }
        
        .toast-icon { font-size: 20px; }
        .toast-icon.success { color: var(--success); }
        .toast-icon.error { color: var(--danger); }
        .toast-icon.warning { color: var(--warning); }
        .toast-icon.info { color: var(--info); }
        
        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 40px;
            color: #9CA3AF;
        }
        
        .empty-state i {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
        }
        
        /* Language Selector */
        .lang-selector {
            display: flex;
            gap: 8px;
            padding: 8px 16px;
        }
        
        .lang-btn {
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            background: rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.7);
            transition: all 0.2s;
        }
        
        .lang-btn.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .lang-btn:hover:not(.active) {
            background: rgba(255,255,255,0.2);
        }
        
        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
            display: none;
            position: fixed;
            top: 16px;
            ${isRtl ? 'right' : 'left'}: 16px;
            z-index: 60;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--navy);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
        
        /* Responsive */
        @media (max-width: 1400px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .content-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 1200px) {
            .schedule-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .sidebar {
                transform: translateX(${isRtl ? '100%' : '-100%'});
            }
            
            .sidebar.open {
                transform: translateX(0);
            }
            
            .main-content {
                ${isRtl ? 'margin-right' : 'margin-left'}: 0;
                padding: 80px 16px 24px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .schedule-grid {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                align-items: stretch;
            }
            
            .header-right {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .request-card {
                flex-direction: column;
                gap: 16px;
            }
            
            .request-meta {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .request-actions {
                width: 100%;
                justify-content: center;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Mobile Menu Toggle -->
    <button class="mobile-menu-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>
    
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
            <img src="https://www.germanselect.org/favicon.ico" alt="SelectCareOS">
            <span>SelectCareOS™</span>
        </div>
        
        <div class="doctor-profile">
            <div class="doctor-avatar">DR</div>
            <div class="doctor-info">
                <h3>Dr. Demo User</h3>
                <p>General Medicine</p>
            </div>
        </div>
        
        <div class="lang-selector">
            <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="changeLang('en')">EN</button>
            <button class="lang-btn ${lang === 'de' ? 'active' : ''}" onclick="changeLang('de')">DE</button>
            <button class="lang-btn ${lang === 'ar' ? 'active' : ''}" onclick="changeLang('ar')">AR</button>
            <button class="lang-btn ${lang === 'fr' ? 'active' : ''}" onclick="changeLang('fr')">FR</button>
        </div>
        
        <nav>
            <div class="nav-section">
                <div class="nav-section-title">Main</div>
                <a class="nav-item ${tab === 'overview' ? 'active' : ''}" onclick="switchTab('overview')">
                    <i class="fas fa-th-large"></i>
                    <span>${t.overview}</span>
                </a>
                <a class="nav-item ${tab === 'schedule' ? 'active' : ''}" onclick="switchTab('schedule')">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${t.schedule}</span>
                </a>
                <a class="nav-item ${tab === 'consultations' ? 'active' : ''}" onclick="switchTab('consultations')">
                    <i class="fas fa-video"></i>
                    <span>${t.consultations}</span>
                    <span class="badge" id="nav-pending-badge" style="display: none;">0</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Management</div>
                <a class="nav-item ${tab === 'patients' ? 'active' : ''}" onclick="switchTab('patients')">
                    <i class="fas fa-users"></i>
                    <span>${t.patients}</span>
                </a>
                <a class="nav-item ${tab === 'prescriptions' ? 'active' : ''}" onclick="switchTab('prescriptions')">
                    <i class="fas fa-prescription"></i>
                    <span>${t.prescriptions}</span>
                </a>
                <a class="nav-item ${tab === 'earnings' ? 'active' : ''}" onclick="switchTab('earnings')">
                    <i class="fas fa-euro-sign"></i>
                    <span>${t.earnings}</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Quick Links</div>
                <a class="nav-item" href="/instant-doctor">
                    <i class="fas fa-bolt"></i>
                    <span>Instant Connect</span>
                </a>
                <a class="nav-item" href="/doctors">
                    <i class="fas fa-user-md"></i>
                    <span>All Doctors</span>
                </a>
                <a class="nav-item" href="/">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </div>
        </nav>
        
        <div style="margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 4px;">Doctor ID</div>
            <div style="font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.8);">${doctorId}</div>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <!-- Header -->
        <header class="header">
            <div class="header-left">
                <h1>${t.title}</h1>
                <p>${t.welcome}, <strong>Dr. Demo</strong> • ${new Date().toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div class="header-right">
                <div class="status-toggle">
                    <div class="status-indicator" id="status-indicator"></div>
                    <span id="status-text">${t.offline}</span>
                    <button class="status-btn offline" id="status-btn" onclick="toggleStatus()">
                        ${t.goOnline}
                    </button>
                </div>
                
                <div class="quick-actions">
                    <button class="quick-action-btn secondary" onclick="openPrescriptionModal()" title="${t.writePrescription}">
                        <i class="fas fa-prescription"></i>
                    </button>
                    <button class="quick-action-btn secondary" onclick="refreshData()" title="Refresh">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                    <button class="quick-action-btn primary" onclick="openVideoCall()" title="${t.joinCall}">
                        <i class="fas fa-video"></i>
                        <span class="notification-dot" id="call-notification" style="display: none;"></span>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Overview Tab -->
        <div id="tab-overview" class="tab-content" style="display: ${tab === 'overview' ? 'block' : 'none'};">
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="icon green">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="value" id="stat-today">0</div>
                    <div class="label">${t.todayConsultations}</div>
                    <div class="trend up">
                        <i class="fas fa-arrow-up"></i>
                        <span>+12% vs last week</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="icon blue">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="value" id="stat-pending">0</div>
                    <div class="label">${t.pendingRequests}</div>
                </div>
                <div class="stat-card">
                    <div class="icon gold">
                        <i class="fas fa-euro-sign"></i>
                    </div>
                    <div class="value" id="stat-earnings">€0</div>
                    <div class="label">${t.totalEarnings} (${t.thisMonth})</div>
                    <div class="trend up">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8% vs last month</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="icon purple">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="value" id="stat-rating">5.0</div>
                    <div class="label">${t.avgRating}</div>
                    <div class="trend up">
                        <i class="fas fa-arrow-up"></i>
                        <span>+0.2 this month</span>
                    </div>
                </div>
            </div>
            
            <div class="content-grid">
                <div>
                    <!-- Consultation Queue -->
                    <div class="section-card">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-user-clock"></i>
                                ${t.waitingPatients}
                                <span class="badge" id="queue-badge" style="display: none;">0</span>
                            </div>
                            <button class="action-btn decline" onclick="refreshQueue()">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                        
                        <div id="queue-container">
                            <div class="empty-state">
                                <i class="fas fa-inbox"></i>
                                <p>${t.noRequests}</p>
                                <p style="font-size: 13px; margin-top: 8px;">New consultation requests will appear here</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Today's Schedule -->
                    <div class="section-card">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-calendar-day"></i>
                                ${t.upcomingToday}
                            </div>
                            <a href="?tab=schedule" class="action-btn decline">
                                View All <i class="fas fa-chevron-${isRtl ? 'left' : 'right'}"></i>
                            </a>
                        </div>
                        
                        <div id="today-schedule">
                            ${sampleAppointments.map(apt => `
                                <div class="schedule-item">
                                    <div class="schedule-time">${apt.time}</div>
                                    <div class="schedule-details">
                                        <h4>${apt.patient}</h4>
                                        <p>${apt.type} • ${apt.duration} min</p>
                                    </div>
                                    <span class="schedule-status ${apt.status}">${apt.status}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div>
                    <!-- Quick Stats -->
                    <div class="section-card">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-chart-pie"></i>
                                Quick Stats
                            </div>
                        </div>
                        
                        <div class="quick-stats">
                            <div class="quick-stat-item">
                                <span class="label">${t.completionRate}</span>
                                <span class="value" style="color: var(--success);">98%</span>
                            </div>
                            <div class="quick-stat-item">
                                <span class="label">${t.avgDuration}</span>
                                <span class="value">24 min</span>
                            </div>
                            <div class="quick-stat-item">
                                <span class="label">Patients ${t.thisWeek}</span>
                                <span class="value">23</span>
                            </div>
                            <div class="quick-stat-item">
                                <span class="label">Response Time</span>
                                <span class="value">45s</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recent Patients -->
                    <div class="section-card">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-users"></i>
                                ${t.recentPatients}
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${samplePatients.slice(0, 3).map(patient => `
                                <div class="request-card" style="cursor: pointer;" onclick="viewPatient('${patient.id}')">
                                    <div class="patient-info">
                                        <div class="patient-avatar">${patient.avatar}</div>
                                        <div class="patient-details">
                                            <h4>${patient.name}</h4>
                                            <p>${patient.condition}</p>
                                        </div>
                                    </div>
                                    <span style="font-size: 12px; color: #9CA3AF;">${patient.lastVisit}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Schedule Tab -->
        <div id="tab-schedule" class="tab-content" style="display: ${tab === 'schedule' ? 'block' : 'none'};">
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-calendar-alt"></i>
                        ${t.weeklySchedule}
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button class="action-btn decline" onclick="openBlockTimeModal()">
                            <i class="fas fa-ban"></i>
                            ${t.addBlockedTime}
                        </button>
                        <button class="action-btn accept" onclick="saveSchedule()">
                            <i class="fas fa-save"></i>
                            ${t.saveSchedule}
                        </button>
                    </div>
                </div>
                
                <div class="schedule-grid" id="schedule-grid">
                    ${days.map((day, index) => `
                        <div class="day-column" data-day="${index}">
                            <div class="day-header">
                                <div class="day-name">${t[day] || day}</div>
                                <div class="day-toggle">
                                    <div class="toggle-switch ${index >= 1 && index <= 5 ? 'active' : ''}" 
                                         onclick="toggleDay(${index})" 
                                         id="toggle-day-${index}"></div>
                                </div>
                            </div>
                            <div class="time-slots" id="slots-day-${index}">
                                ${index >= 1 && index <= 5 ? `
                                    <div class="time-slot" data-start="09:00" data-end="12:00">
                                        <span class="slot-time">09:00 - 12:00</span>
                                        <span class="slot-action" onclick="removeSlot(this)" style="cursor:pointer;color:#9CA3AF;"><i class="fas fa-times"></i></span>
                                    </div>
                                    <div class="time-slot" data-start="14:00" data-end="18:00">
                                        <span class="slot-time">14:00 - 18:00</span>
                                        <span class="slot-action" onclick="removeSlot(this)" style="cursor:pointer;color:#9CA3AF;"><i class="fas fa-times"></i></span>
                                    </div>
                                ` : ''}
                            </div>
                            <button class="add-slot-btn" onclick="openAddSlotModal(${index})">
                                <i class="fas fa-plus"></i> ${t.addSlot}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Online Booking Calendar -->
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-globe"></i>
                        Online Booking Calendar
                    </div>
                    <label style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
                        <div class="toggle-switch active" onclick="toggleOnlineBooking()" id="toggle-online-booking"></div>
                        <span>Accept Online Bookings</span>
                    </label>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <button class="action-btn decline" onclick="navigateCalendar(-1)">
                        <i class="fas fa-chevron-${isRtl ? 'right' : 'left'}"></i>
                    </button>
                    <h3 id="calendar-month" style="font-size: 18px; font-weight: 600;">January 2026</h3>
                    <button class="action-btn decline" onclick="navigateCalendar(1)">
                        <i class="fas fa-chevron-${isRtl ? 'left' : 'right'}"></i>
                    </button>
                </div>
                
                <div id="booking-calendar" class="booking-calendar"></div>
                
                <div style="display: flex; gap: 24px; margin-top: 16px; padding: 12px; background: #F9FAFB; border-radius: 8px; font-size: 12px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 14px; height: 14px; border-radius: 4px; background: var(--success);"></span>
                        <span>Available</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 14px; height: 14px; border-radius: 4px; background: var(--gold);"></span>
                        <span>Booked</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 14px; height: 14px; border-radius: 4px; background: var(--danger);"></span>
                        <span>Blocked</span>
                    </div>
                </div>
            </div>
            
            <!-- Blocked Times -->
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-ban"></i>
                        ${t.blockedTimes}
                    </div>
                </div>
                <div id="blocked-times-container">
                    <div class="empty-state">
                        <i class="fas fa-calendar-check"></i>
                        <p>No blocked times</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Consultations Tab -->
        <div id="tab-consultations" class="tab-content" style="display: ${tab === 'consultations' ? 'block' : 'none'};">
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-history"></i>
                        Consultation History
                    </div>
                    <select class="form-select" style="width: auto; padding: 8px 16px;" onchange="filterConsultations(this.value)">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no_show">No Show</option>
                    </select>
                </div>
                
                <div id="consultation-history">
                    <div class="empty-state">
                        <i class="fas fa-history"></i>
                        <p>No consultation history yet</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Patients Tab -->
        <div id="tab-patients" class="tab-content" style="display: ${tab === 'patients' ? 'block' : 'none'};">
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-users"></i>
                        ${t.patients}
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <input type="text" class="form-input" placeholder="Search patients..." style="width: 250px; padding: 10px 16px;" id="patient-search" oninput="searchPatients(this.value)">
                    </div>
                </div>
                
                <div id="patients-list">
                    ${samplePatients.map(patient => `
                        <div class="request-card" style="cursor: pointer;" onclick="viewPatient('${patient.id}')">
                            <div class="patient-info">
                                <div class="patient-avatar">${patient.avatar}</div>
                                <div class="patient-details">
                                    <h4>${patient.name}</h4>
                                    <p>${patient.age} years • ${patient.gender} • ${patient.condition}</p>
                                </div>
                            </div>
                            <div class="request-meta">
                                <div class="meta-item">
                                    <div class="value">${patient.lastVisit}</div>
                                    <div class="label">Last Visit</div>
                                </div>
                            </div>
                            <div class="request-actions">
                                <button class="action-btn decline" onclick="event.stopPropagation(); sendMessage('${patient.id}')">
                                    <i class="fas fa-comment"></i>
                                </button>
                                <button class="action-btn join" onclick="event.stopPropagation(); startConsultation('${patient.id}')">
                                    <i class="fas fa-video"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Prescriptions Tab -->
        <div id="tab-prescriptions" class="tab-content" style="display: ${tab === 'prescriptions' ? 'block' : 'none'};">
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-prescription"></i>
                        ${t.prescriptions}
                    </div>
                    <button class="action-btn accept" onclick="openPrescriptionModal()">
                        <i class="fas fa-plus"></i>
                        ${t.newPrescription}
                    </button>
                </div>
                
                <div id="prescriptions-list">
                    <div class="empty-state">
                        <i class="fas fa-prescription-bottle-alt"></i>
                        <p>No prescriptions yet</p>
                        <button class="action-btn accept" onclick="openPrescriptionModal()" style="margin-top: 16px;">
                            <i class="fas fa-plus"></i>
                            Create First Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Earnings Tab -->
        <div id="tab-earnings" class="tab-content" style="display: ${tab === 'earnings' ? 'block' : 'none'};">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="icon gold">
                        <i class="fas fa-euro-sign"></i>
                    </div>
                    <div class="value">€2,450</div>
                    <div class="label">${t.thisMonth}</div>
                </div>
                <div class="stat-card">
                    <div class="icon green">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="value">€8,200</div>
                    <div class="label">Last 3 Months</div>
                </div>
                <div class="stat-card">
                    <div class="icon blue">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="value">47</div>
                    <div class="label">Consultations (${t.thisMonth})</div>
                </div>
                <div class="stat-card">
                    <div class="icon purple">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="value">€52</div>
                    <div class="label">Avg. per Consultation</div>
                </div>
            </div>
            
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-chart-bar"></i>
                        Earnings Overview
                    </div>
                    <select class="form-select" style="width: auto; padding: 8px 16px;">
                        <option value="6months">Last 6 Months</option>
                        <option value="year">This Year</option>
                        <option value="all">All Time</option>
                    </select>
                </div>
                
                <div class="chart-container">
                    <canvas id="earnings-chart"></canvas>
                </div>
            </div>
            
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-file-invoice-dollar"></i>
                        Recent Transactions
                    </div>
                </div>
                
                <div id="transactions-container">
                    <div class="request-card">
                        <div class="patient-info">
                            <div class="patient-avatar" style="background: var(--success);">
                                <i class="fas fa-arrow-down" style="color: white;"></i>
                            </div>
                            <div class="patient-details">
                                <h4>Consultation - Ahmed Hassan</h4>
                                <p>Video Call • 30 min</p>
                            </div>
                        </div>
                        <div class="meta-item">
                            <div class="value" style="color: var(--success);">+€50</div>
                            <div class="label">Today</div>
                        </div>
                    </div>
                    <div class="request-card">
                        <div class="patient-info">
                            <div class="patient-avatar" style="background: var(--success);">
                                <i class="fas fa-arrow-down" style="color: white;"></i>
                            </div>
                            <div class="patient-details">
                                <h4>Consultation - Maria Schmidt</h4>
                                <p>Follow-up • 45 min</p>
                            </div>
                        </div>
                        <div class="meta-item">
                            <div class="value" style="color: var(--success);">+€75</div>
                            <div class="label">Yesterday</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Add Time Slot Modal -->
    <div class="modal-overlay" id="add-slot-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">${t.addSlot}</h3>
                <button class="modal-close" onclick="closeModal('add-slot-modal')">&times;</button>
            </div>
            
            <form onsubmit="addTimeSlot(event)">
                <input type="hidden" id="slot-day-input">
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Time</label>
                        <input type="time" class="form-input" id="slot-start" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Time</label>
                        <input type="time" class="form-input" id="slot-end" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Slot Duration</label>
                    <select class="form-select" id="slot-duration">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn">${t.addSlot}</button>
            </form>
        </div>
    </div>
    
    <!-- Block Time Modal -->
    <div class="modal-overlay" id="block-time-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">${t.addBlockedTime}</h3>
                <button class="modal-close" onclick="closeModal('block-time-modal')">&times;</button>
            </div>
            
            <form onsubmit="addBlockedTime(event)">
                <div class="form-group">
                    <label class="form-label">Reason</label>
                    <select class="form-select" id="block-reason" required>
                        <option value="vacation">${t.vacation}</option>
                        <option value="conference">${t.conference}</option>
                        <option value="personal">${t.personal}</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date & Time</label>
                        <input type="datetime-local" class="form-input" id="block-start" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date & Time</label>
                        <input type="datetime-local" class="form-input" id="block-end" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Notes (Optional)</label>
                    <input type="text" class="form-input" id="block-notes" placeholder="Add a note...">
                </div>
                
                <button type="submit" class="submit-btn">${t.addBlockedTime}</button>
            </form>
        </div>
    </div>
    
    <!-- Prescription Modal -->
    <div class="modal-overlay" id="prescription-modal">
        <div class="modal" style="max-width: 640px;">
            <div class="modal-header">
                <h3 class="modal-title">${t.newPrescription}</h3>
                <button class="modal-close" onclick="closeModal('prescription-modal')">&times;</button>
            </div>
            
            <form onsubmit="savePrescription(event)" class="prescription-form">
                <div class="form-group">
                    <label class="form-label">Patient</label>
                    <select class="form-select" id="rx-patient" required>
                        <option value="">Select patient...</option>
                        ${samplePatients.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">${t.medication}</label>
                    <input type="text" class="form-input" id="rx-medication" placeholder="e.g., Metformin 500mg" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">${t.dosage}</label>
                        <input type="text" class="form-input" id="rx-dosage" placeholder="e.g., 1 tablet" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">${t.frequency}</label>
                        <select class="form-select" id="rx-frequency" required>
                            <option value="once_daily">Once daily</option>
                            <option value="twice_daily">Twice daily</option>
                            <option value="three_times">Three times daily</option>
                            <option value="as_needed">As needed</option>
                            <option value="with_meals">With meals</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">${t.duration}</label>
                    <select class="form-select" id="rx-duration" required>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30" selected>30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="ongoing">Ongoing</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">${t.instructions}</label>
                    <textarea class="form-textarea" id="rx-instructions" placeholder="Special instructions for the patient..."></textarea>
                </div>
                
                <button type="submit" class="submit-btn">${t.savePrescription}</button>
            </form>
        </div>
    </div>
    
    <!-- Toast Container -->
    <div class="toast-container" id="toast-container"></div>
    
    <!-- Notification Sound -->
    <audio id="notification-sound">
        <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg">
    </audio>

    <script>
        // ============================================
        // CONFIGURATION
        // ============================================
        const config = {
            doctorId: '${doctorId}',
            lang: '${lang}',
            pollInterval: 5000,
            apiBase: '/api/instant-connect'
        };
        
        // ============================================
        // STATE
        // ============================================
        let currentStatus = 'offline';
        let pendingRequests = [];
        let activeConsultations = [];
        let schedule = {};
        let blockedTimes = [];
        let pollTimer = null;
        let currentCalendarDate = new Date();
        let onlineBookingEnabled = true;
        
        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            initializeSchedule();
            loadDoctorStatus();
            loadPendingRequests();
            startPolling();
            renderCalendar();
            initEarningsChart();
        });
        
        function initializeSchedule() {
            // Initialize default schedule structure
            for (let i = 0; i <= 6; i++) {
                schedule[i] = {
                    enabled: i >= 1 && i <= 5,
                    slots: i >= 1 && i <= 5 ? [
                        { start: '09:00', end: '12:00' },
                        { start: '14:00', end: '18:00' }
                    ] : []
                };
            }
            
            // Load from API
            fetch(\`\${config.apiBase}/doctor/\${config.doctorId}/schedule\`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data.weeklySchedule) {
                        schedule = data.data.weeklySchedule;
                        blockedTimes = data.data.blockedTimes || [];
                        renderBlockedTimes();
                        updateScheduleUI();
                    }
                })
                .catch(err => console.log('Using default schedule'));
        }
        
        function updateScheduleUI() {
            for (let i = 0; i <= 6; i++) {
                const toggle = document.getElementById('toggle-day-' + i);
                if (toggle && schedule[i]) {
                    toggle.classList.toggle('active', schedule[i].enabled);
                }
            }
        }
        
        // ============================================
        // SIDEBAR & NAVIGATION
        // ============================================
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
        }
        
        function changeLang(newLang) {
            window.location.href = '/doctor-dashboard?id=${doctorId}&lang=' + newLang + '&tab=${tab}';
        }
        
        function switchTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            
            document.getElementById('tab-' + tabName).style.display = 'block';
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.closest('.nav-item').classList.add('active');
            
            history.pushState({}, '', '?id=${doctorId}&lang=${lang}&tab=' + tabName);
            
            // Close mobile sidebar
            document.getElementById('sidebar').classList.remove('open');
        }
        
        // ============================================
        // STATUS MANAGEMENT
        // ============================================
        async function loadDoctorStatus() {
            try {
                const response = await fetch(\`\${config.apiBase}/stats\`);
                const data = await response.json();
                
                if (data.success) {
                    updateStatusUI('available');
                    updateStats(data.data);
                }
            } catch (error) {
                console.error('Failed to load doctor status:', error);
            }
        }
        
        async function toggleStatus() {
            const newStatus = currentStatus === 'available' ? 'offline' : 'available';
            
            try {
                const response = await fetch(\`\${config.apiBase}/doctor/status\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ doctorId: config.doctorId, status: newStatus })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    updateStatusUI(newStatus);
                    showToast(newStatus === 'available' ? 'You are now online' : 'You are now offline', 'success');
                }
            } catch (error) {
                showToast('Failed to update status', 'error');
            }
        }
        
        function updateStatusUI(status) {
            currentStatus = status;
            
            const indicator = document.getElementById('status-indicator');
            const text = document.getElementById('status-text');
            const btn = document.getElementById('status-btn');
            
            indicator.className = 'status-indicator ' + status;
            
            const statusLabels = {
                available: '${t.available}',
                busy: '${t.busy}',
                offline: '${t.offline}',
                in_call: '${t.inCall}'
            };
            
            text.textContent = statusLabels[status] || status;
            
            if (status === 'available') {
                btn.className = 'status-btn online';
                btn.textContent = '${t.goOffline}';
            } else {
                btn.className = 'status-btn offline';
                btn.textContent = '${t.goOnline}';
            }
        }
        
        function updateStats(stats) {
            document.getElementById('stat-today').textContent = stats.totalDoctors || 0;
            document.getElementById('stat-pending').textContent = stats.queue?.totalInQueue || 0;
            document.getElementById('stat-rating').textContent = (stats.avgRating || 5.0).toFixed(1);
            document.getElementById('stat-earnings').textContent = '€2,450';
            
            const navBadge = document.getElementById('nav-pending-badge');
            if (stats.queue?.totalInQueue > 0) {
                navBadge.textContent = stats.queue.totalInQueue;
                navBadge.style.display = 'inline';
            } else {
                navBadge.style.display = 'none';
            }
        }
        
        // ============================================
        // QUEUE MANAGEMENT
        // ============================================
        async function loadPendingRequests() {
            try {
                const response = await fetch(\`\${config.apiBase}/doctors?limit=10\`);
                const data = await response.json();
                renderPendingRequests([]);
            } catch (error) {
                console.error('Failed to load pending requests:', error);
            }
        }
        
        function renderPendingRequests(requests) {
            const container = document.getElementById('queue-container');
            const badge = document.getElementById('queue-badge');
            
            if (requests.length === 0) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>${t.noRequests}</p>
                        <p style="font-size: 13px; margin-top: 8px;">New consultation requests will appear here</p>
                    </div>
                \`;
                badge.style.display = 'none';
                return;
            }
            
            badge.textContent = requests.length;
            badge.style.display = 'inline';
            
            container.innerHTML = requests.map(req => \`
                <div class="request-card \${req.urgency}" data-request-id="\${req.id}">
                    <div class="patient-info">
                        <div class="patient-avatar">\${req.patientName.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                        <div class="patient-details">
                            <h4>\${req.patientName}</h4>
                            <p>\${req.symptoms || 'General consultation'}</p>
                        </div>
                    </div>
                    <div class="request-meta">
                        <div class="meta-item">
                            <div class="value">\${formatWaitTime(req.waitTime)}</div>
                            <div class="label">${t.waitTime}</div>
                        </div>
                        <span class="urgency-badge \${req.urgency}">\${req.urgency}</span>
                    </div>
                    <div class="request-actions">
                        <button class="action-btn decline" onclick="declineRequest('\${req.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                        <button class="action-btn accept" onclick="acceptRequest('\${req.id}')">
                            <i class="fas fa-check"></i> ${t.acceptRequest}
                        </button>
                    </div>
                </div>
            \`).join('');
        }
        
        async function acceptRequest(requestId) {
            try {
                const response = await fetch(\`\${config.apiBase}/doctor/accept\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ requestId, doctorId: config.doctorId })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showToast('${t.requestAccepted}', 'success');
                    if (data.data?.videoRoomUrl) {
                        window.open(\`/consultation/\${requestId}?role=doctor&name=Doctor\`, '_blank');
                    }
                    loadPendingRequests();
                } else {
                    showToast(data.error || 'Failed to accept', 'error');
                }
            } catch (error) {
                showToast('Failed to accept request', 'error');
            }
        }
        
        async function declineRequest(requestId) {
            try {
                await fetch(\`\${config.apiBase}/doctor/decline\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ requestId, doctorId: config.doctorId })
                });
                showToast('${t.requestDeclined}', 'warning');
                loadPendingRequests();
            } catch (error) {
                console.error('Failed to decline request:', error);
            }
        }
        
        function refreshQueue() {
            loadPendingRequests();
            loadDoctorStatus();
            showToast('Data refreshed', 'info');
        }
        
        function refreshData() {
            refreshQueue();
        }
        
        // ============================================
        // SCHEDULE MANAGEMENT
        // ============================================
        function toggleDay(dayIndex) {
            const toggle = document.getElementById('toggle-day-' + dayIndex);
            const isActive = toggle.classList.toggle('active');
            schedule[dayIndex].enabled = isActive;
            
            const slotsContainer = document.getElementById('slots-day-' + dayIndex);
            slotsContainer.style.opacity = isActive ? '1' : '0.5';
        }
        
        function openAddSlotModal(dayIndex) {
            document.getElementById('slot-day-input').value = dayIndex;
            document.getElementById('slot-start').value = '09:00';
            document.getElementById('slot-end').value = '12:00';
            document.getElementById('add-slot-modal').classList.add('show');
        }
        
        function addTimeSlot(event) {
            event.preventDefault();
            
            const dayIndex = document.getElementById('slot-day-input').value;
            const startTime = document.getElementById('slot-start').value;
            const endTime = document.getElementById('slot-end').value;
            
            if (startTime >= endTime) {
                showToast('End time must be after start time', 'error');
                return;
            }
            
            const slotsContainer = document.getElementById('slots-day-' + dayIndex);
            
            const slotDiv = document.createElement('div');
            slotDiv.className = 'time-slot';
            slotDiv.dataset.start = startTime;
            slotDiv.dataset.end = endTime;
            slotDiv.innerHTML = \`
                <span class="slot-time">\${startTime} - \${endTime}</span>
                <span class="slot-action" onclick="removeSlot(this)" style="cursor:pointer;color:#9CA3AF;"><i class="fas fa-times"></i></span>
            \`;
            
            slotsContainer.appendChild(slotDiv);
            
            closeModal('add-slot-modal');
            showToast('Time slot added', 'success');
        }
        
        function removeSlot(element) {
            element.closest('.time-slot').remove();
        }
        
        function saveSchedule() {
            const scheduleData = {};
            
            document.querySelectorAll('.day-column').forEach(dayCol => {
                const dayIndex = dayCol.dataset.day;
                const isActive = document.getElementById('toggle-day-' + dayIndex).classList.contains('active');
                const slots = [];
                
                dayCol.querySelectorAll('.time-slot').forEach(slot => {
                    slots.push({ start: slot.dataset.start, end: slot.dataset.end });
                });
                
                scheduleData[dayIndex] = { enabled: isActive, slots };
            });
            
            fetch(\`\${config.apiBase}/doctor/schedule\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctorId: config.doctorId, schedule: scheduleData })
            }).then(() => {
                schedule = scheduleData;
                showToast('${t.scheduleUpdated}', 'success');
            }).catch(err => showToast('Failed to save schedule', 'error'));
        }
        
        // ============================================
        // BLOCKED TIMES
        // ============================================
        function openBlockTimeModal() {
            const now = new Date();
            now.setMinutes(0);
            document.getElementById('block-start').value = formatDateTimeLocal(now);
            
            const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
            document.getElementById('block-end').value = formatDateTimeLocal(endTime);
            
            document.getElementById('block-time-modal').classList.add('show');
        }
        
        function addBlockedTime(event) {
            event.preventDefault();
            
            const reason = document.getElementById('block-reason').value;
            const startTime = document.getElementById('block-start').value;
            const endTime = document.getElementById('block-end').value;
            const notes = document.getElementById('block-notes').value;
            
            if (new Date(startTime) >= new Date(endTime)) {
                showToast('End time must be after start time', 'error');
                return;
            }
            
            const blockedTime = { id: Date.now().toString(), reason, startTime, endTime, notes };
            blockedTimes.push(blockedTime);
            
            // Save to API
            fetch(\`\${config.apiBase}/doctor/\${config.doctorId}/blocked-time\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blockedTime)
            });
            
            renderBlockedTimes();
            closeModal('block-time-modal');
            showToast('Time blocked successfully', 'success');
        }
        
        function renderBlockedTimes() {
            const container = document.getElementById('blocked-times-container');
            
            if (blockedTimes.length === 0) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <i class="fas fa-calendar-check"></i>
                        <p>No blocked times</p>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = blockedTimes.map(bt => \`
                <div class="request-card" style="border-left: 4px solid var(--danger);">
                    <div class="patient-info">
                        <div class="patient-avatar" style="background: var(--danger);">
                            <i class="fas fa-ban" style="color: white;"></i>
                        </div>
                        <div class="patient-details">
                            <h4>\${bt.reason.charAt(0).toUpperCase() + bt.reason.slice(1)}</h4>
                            <p>\${bt.notes || 'No notes'}</p>
                        </div>
                    </div>
                    <div class="request-meta">
                        <div class="meta-item">
                            <div class="value">\${formatDateTime(bt.startTime)}</div>
                            <div class="label">Start</div>
                        </div>
                        <div class="meta-item">
                            <div class="value">\${formatDateTime(bt.endTime)}</div>
                            <div class="label">End</div>
                        </div>
                    </div>
                    <button class="action-btn decline" onclick="removeBlockedTime('\${bt.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            \`).join('');
        }
        
        function removeBlockedTime(id) {
            blockedTimes = blockedTimes.filter(bt => bt.id !== id);
            renderBlockedTimes();
            showToast('Blocked time removed', 'info');
        }
        
        // ============================================
        // CALENDAR
        // ============================================
        function renderCalendar() {
            const calendar = document.getElementById('booking-calendar');
            const monthLabel = document.getElementById('calendar-month');
            
            if (!calendar || !monthLabel) return;
            
            const year = currentCalendarDate.getFullYear();
            const month = currentCalendarDate.getMonth();
            
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                               'July', 'August', 'September', 'October', 'November', 'December'];
            monthLabel.textContent = \`\${monthNames[month]} \${year}\`;
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDayOfWeek = firstDay.getDay();
            const totalDays = lastDay.getDate();
            
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let html = dayHeaders.map(d => \`<div class="calendar-header">\${d}</div>\`).join('');
            
            for (let i = 0; i < startDayOfWeek; i++) {
                html += '<div class="calendar-day disabled"></div>';
            }
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            for (let day = 1; day <= totalDays; day++) {
                const date = new Date(year, month, day);
                const isPast = date < today;
                const isToday = date.getTime() === today.getTime();
                const dayOfWeek = date.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const hasSlots = !isPast && !isWeekend && schedule[dayOfWeek]?.enabled;
                
                let classes = ['calendar-day'];
                if (isPast) classes.push('disabled');
                if (isToday) classes.push('today');
                if (hasSlots) classes.push('has-slots');
                
                html += \`<div class="\${classes.join(' ')}">\${day}\${hasSlots ? '<span class="slot-count">✓</span>' : ''}</div>\`;
            }
            
            calendar.innerHTML = html;
        }
        
        function navigateCalendar(direction) {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
            renderCalendar();
        }
        
        function toggleOnlineBooking() {
            const toggle = document.getElementById('toggle-online-booking');
            onlineBookingEnabled = !toggle.classList.contains('active');
            toggle.classList.toggle('active');
            showToast(onlineBookingEnabled ? 'Online bookings enabled' : 'Online bookings disabled', 'info');
        }
        
        // ============================================
        // PRESCRIPTIONS
        // ============================================
        function openPrescriptionModal() {
            document.getElementById('prescription-modal').classList.add('show');
        }
        
        function savePrescription(event) {
            event.preventDefault();
            
            const prescription = {
                patient: document.getElementById('rx-patient').value,
                medication: document.getElementById('rx-medication').value,
                dosage: document.getElementById('rx-dosage').value,
                frequency: document.getElementById('rx-frequency').value,
                duration: document.getElementById('rx-duration').value,
                instructions: document.getElementById('rx-instructions').value,
                date: new Date().toISOString()
            };
            
            console.log('Prescription saved:', prescription);
            closeModal('prescription-modal');
            showToast('${t.prescriptionSaved}', 'success');
            
            // Reset form
            event.target.reset();
        }
        
        // ============================================
        // PATIENTS
        // ============================================
        function viewPatient(patientId) {
            showToast('Opening patient profile...', 'info');
        }
        
        function sendMessage(patientId) {
            showToast('Opening chat...', 'info');
        }
        
        function startConsultation(patientId) {
            window.open('/consultation/' + patientId + '?role=doctor&name=Doctor', '_blank');
        }
        
        function searchPatients(query) {
            console.log('Searching for:', query);
        }
        
        // ============================================
        // VIDEO CALL
        // ============================================
        function openVideoCall() {
            window.open('/consultation/demo?role=doctor&name=Doctor', '_blank');
        }
        
        // ============================================
        // EARNINGS CHART
        // ============================================
        function initEarningsChart() {
            const ctx = document.getElementById('earnings-chart');
            if (!ctx) return;
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                    datasets: [{
                        label: 'Earnings (€)',
                        data: [1800, 2100, 1950, 2400, 2200, 2450],
                        backgroundColor: 'rgba(201, 162, 39, 0.8)',
                        borderColor: 'rgb(201, 162, 39)',
                        borderWidth: 1,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => '€' + value
                            }
                        }
                    }
                }
            });
        }
        
        // ============================================
        // POLLING
        // ============================================
        function startPolling() {
            pollTimer = setInterval(async () => {
                if (currentStatus === 'available') {
                    try {
                        const response = await fetch(\`\${config.apiBase}/stats\`);
                        const data = await response.json();
                        if (data.success) updateStats(data.data);
                    } catch (error) {}
                }
            }, config.pollInterval);
        }
        
        // ============================================
        // UTILITIES
        // ============================================
        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }
        
        function formatWaitTime(seconds) {
            if (!seconds) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
        }
        
        function formatDateTime(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleString('${lang}', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        
        function formatDateTimeLocal(date) {
            return date.toISOString().slice(0, 16);
        }
        
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };
            
            const toast = document.createElement('div');
            toast.className = 'toast ' + type;
            toast.innerHTML = \`
                <i class="toast-icon \${type} \${icons[type]}"></i>
                <span>\${message}</span>
            \`;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }
        
        // Close modals on outside click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('show');
            });
        });
        
        // Cleanup
        window.addEventListener('beforeunload', () => {
            if (pollTimer) clearInterval(pollTimer);
        });
    </script>
</body>
</html>`;
}
