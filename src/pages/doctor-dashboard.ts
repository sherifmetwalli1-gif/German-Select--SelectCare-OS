/**
 * Doctor Dashboard - SelectCareOS™ Telemedicine
 * Comprehensive doctor portal for managing consultations and availability
 * 
 * Features:
 * - Real-time consultation requests
 * - Availability status toggle
 * - Weekly schedule management with time slot reservation
 * - Consultation history and statistics
 * - Earnings overview
 * - Patient queue management
 * - Quick actions (accept/decline consultations)
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
      overview: 'Overview',
      schedule: 'Schedule',
      consultations: 'Consultations',
      patients: 'Patients',
      earnings: 'Earnings',
      settings: 'Settings',
      
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
      
      // Alerts
      newRequest: 'New consultation request!',
      requestAccepted: 'Request accepted',
      requestDeclined: 'Request declined',
      scheduleUpdated: 'Schedule updated successfully',
    },
    de: {
      title: 'Arzt-Dashboard',
      overview: 'Übersicht',
      schedule: 'Zeitplan',
      consultations: 'Konsultationen',
      patients: 'Patienten',
      earnings: 'Einnahmen',
      settings: 'Einstellungen',
      
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
      
      patientName: 'Patientenname',
      symptoms: 'Symptome',
      urgency: 'Dringlichkeit',
      waitTime: 'Wartezeit',
      language: 'Sprache',
      
      startConsultation: 'Konsultation starten',
      endConsultation: 'Konsultation beenden',
      writePrescription: 'Rezept schreiben',
      addNotes: 'Notizen hinzufügen',
      
      newRequest: 'Neue Konsultationsanfrage!',
      requestAccepted: 'Anfrage angenommen',
      requestDeclined: 'Anfrage abgelehnt',
      scheduleUpdated: 'Zeitplan erfolgreich aktualisiert',
    },
    ar: {
      title: 'لوحة تحكم الطبيب',
      overview: 'نظرة عامة',
      schedule: 'الجدول',
      consultations: 'الاستشارات',
      patients: 'المرضى',
      earnings: 'الأرباح',
      settings: 'الإعدادات',
      
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
      
      patientName: 'اسم المريض',
      symptoms: 'الأعراض',
      urgency: 'الإلحاح',
      waitTime: 'وقت الانتظار',
      language: 'اللغة',
      
      startConsultation: 'بدء الاستشارة',
      endConsultation: 'إنهاء الاستشارة',
      writePrescription: 'كتابة وصفة',
      addNotes: 'إضافة ملاحظات',
      
      newRequest: 'طلب استشارة جديد!',
      requestAccepted: 'تم قبول الطلب',
      requestDeclined: 'تم رفض الطلب',
      scheduleUpdated: 'تم تحديث الجدول بنجاح',
    }
  };
  
  const t = tr[lang] || tr.en;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

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
            width: 260px;
            height: 100vh;
            background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%);
            color: white;
            padding: 24px 16px;
            overflow-y: auto;
            z-index: 50;
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
            height: 36px;
        }
        
        .sidebar-logo span {
            font-size: 18px;
            font-weight: 700;
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
        
        /* Main Content */
        .main-content {
            ${isRtl ? 'margin-right' : 'margin-left'}: 260px;
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
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
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
        }
        
        .status-indicator.available {
            background: var(--success);
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
        
        /* Stats Cards */
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
        }
        
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
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
        
        .stat-card .icon.green {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
        }
        
        .stat-card .icon.blue {
            background: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
        }
        
        .stat-card .icon.gold {
            background: rgba(201, 162, 39, 0.1);
            color: var(--gold);
        }
        
        .stat-card .icon.purple {
            background: rgba(139, 92, 246, 0.1);
            color: #8B5CF6;
        }
        
        .stat-card .value {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        
        .stat-card .label {
            font-size: 14px;
            color: #6B7280;
        }
        
        /* Consultation Queue */
        .queue-section {
            background: white;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
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
        
        .badge {
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
            font-size: 16px;
        }
        
        .patient-details h4 {
            margin: 0 0 4px;
            font-size: 16px;
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
            gap: 16px;
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
        
        .urgency-badge.emergency {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger);
        }
        
        .urgency-badge.urgent {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning);
        }
        
        .urgency-badge.routine {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
        }
        
        .request-actions {
            display: flex;
            gap: 8px;
        }
        
        .action-btn {
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
        }
        
        .action-btn.accept {
            background: var(--success);
            color: white;
        }
        
        .action-btn.accept:hover {
            background: #059669;
        }
        
        .action-btn.decline {
            background: #F3F4F6;
            color: #6B7280;
        }
        
        .action-btn.decline:hover {
            background: #E5E7EB;
        }
        
        .action-btn.join {
            background: var(--gold);
            color: white;
        }
        
        .action-btn.join:hover {
            background: #B8920F;
        }
        
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
        
        /* Schedule Section */
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
            left: 2px;
            transition: left 0.2s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .toggle-switch.active::after {
            left: 22px;
        }
        
        .time-slots {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 200px;
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
        
        .slot-time {
            font-weight: 500;
        }
        
        .slot-action {
            cursor: pointer;
            color: #9CA3AF;
            transition: color 0.2s;
        }
        
        .slot-action:hover {
            color: var(--danger);
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
        
        /* Blocked Time Modal */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }
        
        .modal-overlay.show {
            display: flex;
        }
        
        .modal {
            background: white;
            border-radius: 16px;
            padding: 24px;
            width: 100%;
            max-width: 480px;
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
        }
        
        .form-group {
            margin-bottom: 16px;
        }
        
        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
            color: var(--navy);
        }
        
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.2s;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--gold);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        
        .form-select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 14px;
            background: white;
            cursor: pointer;
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
        
        .toast.success {
            border-left: 4px solid var(--success);
        }
        
        .toast.error {
            border-left: 4px solid var(--danger);
        }
        
        .toast.warning {
            border-left: 4px solid var(--warning);
        }
        
        .toast.info {
            border-left: 4px solid #3B82F6;
        }
        
        .toast-icon {
            font-size: 20px;
        }
        
        .toast-icon.success { color: var(--success); }
        .toast-icon.error { color: var(--danger); }
        .toast-icon.warning { color: var(--warning); }
        .toast-icon.info { color: #3B82F6; }
        
        /* Audio Notification */
        .notification-sound {
            display: none;
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
        
        .calendar-day.fully-booked {
            background: rgba(201, 162, 39, 0.1);
        }
        
        .calendar-day.blocked {
            background: rgba(239, 68, 68, 0.1);
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
        
        .calendar-day.fully-booked .slot-count {
            background: var(--gold);
        }
        
        .calendar-day.blocked .slot-count {
            background: var(--danger);
        }
        
        /* Time Slots Grid */
        .time-slots-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 8px;
        }
        
        .slot-item {
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            border: 2px solid #E5E7EB;
            background: white;
            transition: all 0.2s ease;
        }
        
        .slot-item:hover {
            border-color: var(--gold);
        }
        
        .slot-item.selected {
            border-color: var(--success);
            background: rgba(16, 185, 129, 0.1);
        }
        
        .slot-item.booked {
            background: rgba(201, 162, 39, 0.1);
            border-color: var(--gold);
            cursor: not-allowed;
        }
        
        .slot-item.blocked {
            background: rgba(239, 68, 68, 0.1);
            border-color: var(--danger);
            text-decoration: line-through;
        }
        
        .slot-item.reserved {
            background: rgba(59, 130, 246, 0.1);
            border-color: #3B82F6;
        }
        
        .slot-item .slot-status {
            font-size: 10px;
            margin-top: 4px;
            color: #6B7280;
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .schedule-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .sidebar {
                position: fixed;
                transform: translateX(${isRtl ? '100%' : '-100%'});
                transition: transform 0.3s ease;
            }
            
            .sidebar.open {
                transform: translateX(0);
            }
            
            .main-content {
                ${isRtl ? 'margin-right' : 'margin-left'}: 0;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .schedule-grid {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                gap: 16px;
                align-items: stretch;
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
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
            <img src="https://www.germanselect.org/favicon.ico" alt="SelectCareOS">
            <span>SelectCareOS™</span>
        </div>
        
        <nav>
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
            </a>
            <a class="nav-item" href="/doctors">
                <i class="fas fa-user-md"></i>
                <span>${t.patients}</span>
            </a>
            <a class="nav-item ${tab === 'earnings' ? 'active' : ''}" onclick="switchTab('earnings')">
                <i class="fas fa-euro-sign"></i>
                <span>${t.earnings}</span>
            </a>
            <a class="nav-item" href="/instant-doctor">
                <i class="fas fa-bolt"></i>
                <span>Instant Connect</span>
            </a>
            <a class="nav-item" href="/">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
        </nav>
        
        <div style="margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 8px;">Doctor ID</div>
            <div style="font-size: 14px; font-weight: 500;">${doctorId}</div>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <!-- Header -->
        <header class="header">
            <div>
                <h1>${t.title}</h1>
                <p style="color: #6B7280; margin: 4px 0 0;">Welcome back, Doctor</p>
            </div>
            
            <div class="status-toggle">
                <div class="status-indicator" id="status-indicator"></div>
                <span id="status-text">${t.offline}</span>
                <button class="status-btn offline" id="status-btn" onclick="toggleStatus()">
                    ${t.goOnline}
                </button>
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
                </div>
                <div class="stat-card">
                    <div class="icon purple">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="value" id="stat-rating">5.0</div>
                    <div class="label">${t.avgRating}</div>
                </div>
            </div>
            
            <!-- Consultation Queue -->
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-user-clock"></i>
                        ${t.waitingPatients}
                        <span class="badge" id="queue-badge" style="display: none;">0</span>
                    </div>
                    <button class="action-btn" onclick="refreshQueue()" style="background: #F3F4F6; color: #6B7280;">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                
                <div id="queue-container">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>${t.noRequests}</p>
                    </div>
                </div>
            </div>
            
            <!-- Active Consultations -->
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-video"></i>
                        ${t.activeConsultations}
                    </div>
                </div>
                
                <div id="active-consultations">
                    <div class="empty-state">
                        <i class="fas fa-video-slash"></i>
                        <p>No active consultations</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Schedule Tab -->
        <div id="tab-schedule" class="tab-content" style="display: ${tab === 'schedule' ? 'block' : 'none'};">
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-calendar-alt"></i>
                        ${t.weeklySchedule}
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button class="action-btn" onclick="openBlockTimeModal()" style="background: #FEE2E2; color: var(--danger);">
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
                                        <span class="slot-action" onclick="removeSlot(this)"><i class="fas fa-times"></i></span>
                                    </div>
                                    <div class="time-slot" data-start="14:00" data-end="18:00">
                                        <span class="slot-time">14:00 - 18:00</span>
                                        <span class="slot-action" onclick="removeSlot(this)"><i class="fas fa-times"></i></span>
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
            
            <!-- Blocked Times -->
            <div class="queue-section">
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
            
            <!-- Online Booking Integration -->
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-globe"></i>
                        Online Booking Calendar
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
                            <div class="toggle-switch ${true ? 'active' : ''}" 
                                 onclick="toggleOnlineBooking()" 
                                 id="toggle-online-booking"></div>
                            <span>Accept Online Bookings</span>
                        </label>
                    </div>
                </div>
                
                <div class="booking-calendar-container" style="margin-top: 16px;">
                    <!-- Calendar Navigation -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <button class="action-btn" onclick="navigateCalendar(-1)" style="background: #F3F4F6; color: #6B7280;">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 id="calendar-month" style="font-size: 18px; font-weight: 600; color: var(--navy);">January 2026</h3>
                        <button class="action-btn" onclick="navigateCalendar(1)" style="background: #F3F4F6; color: #6B7280;">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <!-- Calendar Grid -->
                    <div id="booking-calendar" class="booking-calendar">
                        <!-- Calendar will be generated by JavaScript -->
                    </div>
                    
                    <!-- Calendar Legend -->
                    <div style="display: flex; gap: 24px; margin-top: 16px; padding: 12px; background: #F9FAFB; border-radius: 8px; font-size: 13px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 16px; height: 16px; border-radius: 4px; background: var(--success);"></span>
                            <span>Available</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 16px; height: 16px; border-radius: 4px; background: var(--gold);"></span>
                            <span>Booked</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 16px; height: 16px; border-radius: 4px; background: var(--danger);"></span>
                            <span>Blocked</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 16px; height: 16px; border-radius: 4px; background: #E5E7EB;"></span>
                            <span>Past/Unavailable</span>
                        </div>
                    </div>
                </div>
                
                <!-- Booking Settings -->
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                    <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Booking Settings</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 12px;">Slot Duration</label>
                            <select class="form-select" id="slot-duration-setting" style="padding: 8px 12px;">
                                <option value="15">15 minutes</option>
                                <option value="30" selected>30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 12px;">Buffer Between Slots</label>
                            <select class="form-select" id="buffer-time-setting" style="padding: 8px 12px;">
                                <option value="0">No buffer</option>
                                <option value="5" selected>5 minutes</option>
                                <option value="10">10 minutes</option>
                                <option value="15">15 minutes</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 12px;">Booking Window</label>
                            <select class="form-select" id="booking-window-setting" style="padding: 8px 12px;">
                                <option value="7">7 days ahead</option>
                                <option value="14">14 days ahead</option>
                                <option value="30" selected>30 days ahead</option>
                                <option value="60">60 days ahead</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 12px;">Consultation Fee (€)</label>
                            <input type="number" class="form-input" id="consultation-fee-setting" value="150" style="padding: 8px 12px;">
                        </div>
                    </div>
                    <button class="submit-btn" onclick="saveBookingSettings()" style="margin-top: 16px; max-width: 200px;">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </div>
            
            <!-- Quick Slot Reservation -->
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-clock"></i>
                        Quick Slot Reservation
                    </div>
                </div>
                
                <p style="font-size: 14px; color: #6B7280; margin-bottom: 16px;">
                    Reserve specific time slots to show as available on external booking sites (Doctolib, Zocdoc, etc.)
                </p>
                
                <div id="selected-date-slots" style="display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h4 id="selected-date-title" style="font-size: 16px; font-weight: 600; color: var(--navy);">
                            Slots for January 20, 2026
                        </h4>
                        <button class="action-btn" onclick="closeSelectedDateSlots()" style="background: #F3F4F6; color: #6B7280;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="date-time-slots" class="time-slots-grid">
                        <!-- Time slots for selected date will be rendered here -->
                    </div>
                    
                    <div style="margin-top: 16px; display: flex; gap: 12px;">
                        <button class="action-btn accept" onclick="reserveSelectedSlots()">
                            <i class="fas fa-check"></i> Reserve Selected Slots
                        </button>
                        <button class="action-btn" onclick="selectAllSlots()" style="background: #F3F4F6; color: #6B7280;">
                            <i class="fas fa-check-double"></i> Select All
                        </button>
                        <button class="action-btn decline" onclick="blockSelectedSlots()">
                            <i class="fas fa-ban"></i> Block Selected
                        </button>
                    </div>
                </div>
                
                <div id="no-date-selected" style="text-align: center; padding: 24px; color: #9CA3AF;">
                    <i class="fas fa-calendar-day" style="font-size: 32px; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p>Click on a date in the calendar above to manage time slots</p>
                </div>
            </div>
        </div>
        
        <!-- Consultations Tab -->
        <div id="tab-consultations" class="tab-content" style="display: ${tab === 'consultations' ? 'block' : 'none'};">
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-history"></i>
                        Consultation History
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <select class="form-select" style="width: auto;" onchange="filterConsultations(this.value)">
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="no_show">No Show</option>
                        </select>
                    </div>
                </div>
                
                <div id="consultation-history">
                    <!-- Will be populated by JavaScript -->
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
            
            <div class="queue-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-file-invoice-dollar"></i>
                        Recent Transactions
                    </div>
                </div>
                
                <div id="transactions-container">
                    <!-- Transactions will be loaded here -->
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
    
    <!-- Toast Container -->
    <div class="toast-container" id="toast-container"></div>
    
    <!-- Notification Sound -->
    <audio class="notification-sound" id="notification-sound">
        <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg">
    </audio>

    <script>
        // ============================================
        // CONFIGURATION
        // ============================================
        const config = {
            doctorId: '${doctorId}',
            lang: '${lang}',
            pollInterval: 5000, // 5 seconds
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
        
        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            loadDoctorStatus();
            loadPendingRequests();
            loadSchedule();
            startPolling();
        });
        
        // ============================================
        // TAB SWITCHING
        // ============================================
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Show selected tab
            document.getElementById('tab-' + tabName).style.display = 'block';
            
            // Update nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.closest('.nav-item').classList.add('active');
            
            // Update URL
            history.pushState({}, '', '?id=${doctorId}&tab=' + tabName);
        }
        
        // ============================================
        // STATUS MANAGEMENT
        // ============================================
        async function loadDoctorStatus() {
            try {
                const response = await fetch(\`\${config.apiBase}/stats\`);
                const data = await response.json();
                
                if (data.success) {
                    // Find this doctor in the stats
                    updateStatusUI('available'); // Default for demo
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
                    body: JSON.stringify({
                        doctorId: config.doctorId,
                        status: newStatus
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    updateStatusUI(newStatus);
                    showToast(newStatus === 'available' ? 'You are now online' : 'You are now offline', 'success');
                }
            } catch (error) {
                console.error('Failed to update status:', error);
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
        }
        
        // ============================================
        // QUEUE MANAGEMENT
        // ============================================
        async function loadPendingRequests() {
            try {
                const response = await fetch(\`\${config.apiBase}/doctors?limit=10\`);
                const data = await response.json();
                
                // For demo, we'll simulate pending requests
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
                        <div class="meta-item">
                            <div class="value">\${req.language?.toUpperCase() || 'EN'}</div>
                            <div class="label">${t.language}</div>
                        </div>
                        <div class="urgency-badge \${req.urgency}">\${req.urgency}</div>
                    </div>
                    
                    <div class="request-actions">
                        <button class="action-btn decline" onclick="declineRequest('\${req.id}')">
                            <i class="fas fa-times"></i> ${t.declineRequest}
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
                    body: JSON.stringify({
                        requestId: requestId,
                        doctorId: config.doctorId
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showToast('${t.requestAccepted}', 'success');
                    
                    // Redirect to consultation
                    if (data.data?.videoRoomUrl) {
                        window.open(\`/consultation/\${requestId}?role=doctor&name=Doctor\`, '_blank');
                    }
                    
                    loadPendingRequests();
                } else {
                    showToast(data.error || 'Failed to accept', 'error');
                }
            } catch (error) {
                console.error('Failed to accept request:', error);
                showToast('Failed to accept request', 'error');
            }
        }
        
        async function declineRequest(requestId) {
            try {
                const response = await fetch(\`\${config.apiBase}/doctor/decline\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestId: requestId,
                        doctorId: config.doctorId
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showToast('${t.requestDeclined}', 'warning');
                    loadPendingRequests();
                }
            } catch (error) {
                console.error('Failed to decline request:', error);
            }
        }
        
        function refreshQueue() {
            loadPendingRequests();
            showToast('Queue refreshed', 'info');
        }
        
        // ============================================
        // SCHEDULE MANAGEMENT
        // ============================================
        function loadSchedule() {
            // Initialize default schedule structure (Mon-Fri 9-12, 14-18)
            for (let i = 0; i <= 6; i++) {
                schedule[i] = {
                    enabled: i >= 1 && i <= 5,
                    slots: i >= 1 && i <= 5 ? [
                        { start: '09:00', end: '12:00' },
                        { start: '14:00', end: '18:00' }
                    ] : []
                };
            }
            
            // Try to load from localStorage first
            const saved = localStorage.getItem('doctor_schedule_' + config.doctorId);
            if (saved) {
                try {
                    schedule = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse saved schedule:', e);
                }
            }
            
            // Also fetch from API
            fetch(\`\${config.apiBase}/doctor/\${config.doctorId}/schedule\`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data.weeklySchedule) {
                        schedule = data.data.weeklySchedule;
                        blockedTimes = data.data.blockedTimes || [];
                        renderBlockedTimes();
                        renderSchedule();
                    }
                })
                .catch(err => console.error('Failed to load schedule from API:', err));
            
            renderSchedule();
        }
        
        function renderSchedule() {
            // Update toggle states based on schedule data
            for (let i = 0; i <= 6; i++) {
                const toggle = document.getElementById('toggle-day-' + i);
                if (toggle && schedule[i]) {
                    if (schedule[i].enabled) {
                        toggle.classList.add('active');
                    } else {
                        toggle.classList.remove('active');
                    }
                }
            }
        }
        
        function toggleDay(dayIndex) {
            const toggle = document.getElementById('toggle-day-' + dayIndex);
            const isActive = toggle.classList.toggle('active');
            
            const slotsContainer = document.getElementById('slots-day-' + dayIndex);
            slotsContainer.style.opacity = isActive ? '1' : '0.5';
        }
        
        function openAddSlotModal(dayIndex) {
            document.getElementById('slot-day-input').value = dayIndex;
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
                <span class="slot-action" onclick="removeSlot(this)"><i class="fas fa-times"></i></span>
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
                    slots.push({
                        start: slot.dataset.start,
                        end: slot.dataset.end
                    });
                });
                
                scheduleData[dayIndex] = {
                    enabled: isActive,
                    slots: slots
                };
            });
            
            // Save to localStorage (in production, save to API)
            localStorage.setItem('doctor_schedule_' + config.doctorId, JSON.stringify(scheduleData));
            
            // Also send to API
            fetch(\`\${config.apiBase}/doctor/schedule\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: config.doctorId,
                    schedule: scheduleData
                })
            }).catch(err => console.error('Failed to save schedule to server:', err));
            
            showToast('${t.scheduleUpdated}', 'success');
        }
        
        // ============================================
        // BLOCKED TIMES
        // ============================================
        function openBlockTimeModal() {
            // Set default values
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
            
            const blockedTime = {
                id: Date.now().toString(),
                reason,
                startTime,
                endTime,
                notes
            };
            
            blockedTimes.push(blockedTime);
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
                            <i class="fas fa-ban"></i>
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
                    
                    <div class="request-actions">
                        <button class="action-btn decline" onclick="removeBlockedTime('\${bt.id}')">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            \`).join('');
        }
        
        function removeBlockedTime(id) {
            blockedTimes = blockedTimes.filter(bt => bt.id !== id);
            renderBlockedTimes();
            showToast('Blocked time removed', 'info');
        }
        
        // ============================================
        // POLLING FOR UPDATES
        // ============================================
        function startPolling() {
            pollTimer = setInterval(async () => {
                if (currentStatus === 'available') {
                    await checkForNewRequests();
                }
            }, config.pollInterval);
        }
        
        async function checkForNewRequests() {
            try {
                const response = await fetch(\`\${config.apiBase}/stats\`);
                const data = await response.json();
                
                if (data.success) {
                    const newCount = data.data.queue?.totalInQueue || 0;
                    const currentCount = parseInt(document.getElementById('queue-badge').textContent) || 0;
                    
                    if (newCount > currentCount) {
                        // New request!
                        playNotificationSound();
                        showToast('${t.newRequest}', 'warning');
                        loadPendingRequests();
                    }
                    
                    updateStats(data.data);
                }
            } catch (error) {
                // Silent fail for polling
            }
        }
        
        function playNotificationSound() {
            const audio = document.getElementById('notification-sound');
            audio.play().catch(() => {}); // Ignore autoplay errors
        }
        
        // ============================================
        // UTILITY FUNCTIONS
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
            return date.toLocaleString('${lang}', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
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
                if (e.target === overlay) {
                    overlay.classList.remove('show');
                }
            });
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (pollTimer) clearInterval(pollTimer);
        });
        
        // ============================================
        // ONLINE BOOKING CALENDAR
        // ============================================
        let currentCalendarDate = new Date();
        let selectedCalendarDate = null;
        let selectedSlots = new Set();
        let onlineBookingEnabled = true;
        let bookedSlots = {}; // Store booked slots by date
        let reservedSlots = {}; // Store reserved slots by date
        
        function initializeCalendar() {
            renderCalendar();
            loadBookingSettings();
        }
        
        function renderCalendar() {
            const calendar = document.getElementById('booking-calendar');
            const monthLabel = document.getElementById('calendar-month');
            
            if (!calendar || !monthLabel) return;
            
            const year = currentCalendarDate.getFullYear();
            const month = currentCalendarDate.getMonth();
            
            // Update month label
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                               'July', 'August', 'September', 'October', 'November', 'December'];
            monthLabel.textContent = \`\${monthNames[month]} \${year}\`;
            
            // Get first day of month and total days
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDayOfWeek = firstDay.getDay();
            const totalDays = lastDay.getDate();
            
            // Day headers
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let html = dayHeaders.map(d => \`<div class="calendar-header">\${d}</div>\`).join('');
            
            // Empty cells before first day
            for (let i = 0; i < startDayOfWeek; i++) {
                html += '<div class="calendar-day disabled"></div>';
            }
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Days of month
            for (let day = 1; day <= totalDays; day++) {
                const date = new Date(year, month, day);
                const dateStr = date.toISOString().split('T')[0];
                const isPast = date < today;
                const isToday = date.getTime() === today.getTime();
                const isSelected = selectedCalendarDate === dateStr;
                const dayOfWeek = date.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                // Check schedule for this day
                const hasSlots = !isPast && !isWeekend && schedule[dayOfWeek]?.enabled;
                const isBlocked = blockedTimes.some(bt => {
                    const blockStart = new Date(bt.startTime);
                    const blockEnd = new Date(bt.endTime);
                    return date >= blockStart && date <= blockEnd;
                });
                
                // Calculate available slots
                const availableSlotsCount = hasSlots && !isBlocked ? getAvailableSlotsCount(dateStr) : 0;
                const bookedCount = (bookedSlots[dateStr] || []).length;
                const fullyBooked = availableSlotsCount > 0 && bookedCount >= availableSlotsCount;
                
                let classes = ['calendar-day'];
                if (isPast || isBlocked) classes.push('disabled');
                if (isToday) classes.push('today');
                if (isSelected) classes.push('selected');
                if (isBlocked) classes.push('blocked');
                else if (fullyBooked) classes.push('fully-booked');
                else if (hasSlots && availableSlotsCount > 0) classes.push('has-slots');
                
                const slotBadge = !isPast && !isBlocked && availableSlotsCount > 0 
                    ? \`<span class="slot-count">\${availableSlotsCount - bookedCount}</span>\` 
                    : '';
                
                html += \`
                    <div class="\${classes.join(' ')}" 
                         onclick="selectCalendarDate('\${dateStr}')"
                         data-date="\${dateStr}">
                        \${day}
                        \${slotBadge}
                    </div>
                \`;
            }
            
            calendar.innerHTML = html;
        }
        
        function navigateCalendar(direction) {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
            renderCalendar();
        }
        
        function selectCalendarDate(dateStr) {
            const date = new Date(dateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (date < today) {
                showToast('Cannot select past dates', 'warning');
                return;
            }
            
            selectedCalendarDate = dateStr;
            selectedSlots.clear();
            renderCalendar();
            renderDateSlots(dateStr);
        }
        
        function getAvailableSlotsCount(dateStr) {
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();
            const daySchedule = schedule[dayOfWeek];
            
            if (!daySchedule?.enabled) return 0;
            
            let count = 0;
            const slotDuration = parseInt(document.getElementById('slot-duration-setting')?.value || '30');
            const bufferTime = parseInt(document.getElementById('buffer-time-setting')?.value || '5');
            
            for (const range of (daySchedule.slots || [])) {
                const [startHour, startMin] = range.start.split(':').map(Number);
                const [endHour, endMin] = range.end.split(':').map(Number);
                let currentMinutes = startHour * 60 + startMin;
                const endMinutes = endHour * 60 + endMin;
                
                while (currentMinutes + slotDuration <= endMinutes) {
                    count++;
                    currentMinutes += slotDuration + bufferTime;
                }
            }
            
            return count;
        }
        
        function renderDateSlots(dateStr) {
            const container = document.getElementById('date-time-slots');
            const titleEl = document.getElementById('selected-date-title');
            const slotsSection = document.getElementById('selected-date-slots');
            const noDateSection = document.getElementById('no-date-selected');
            
            if (!container) return;
            
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();
            const daySchedule = schedule[dayOfWeek];
            
            // Update title
            titleEl.textContent = \`Slots for \${date.toLocaleDateString('${lang}', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\`;
            
            // Show slots section
            slotsSection.style.display = 'block';
            noDateSection.style.display = 'none';
            
            if (!daySchedule?.enabled) {
                container.innerHTML = '<p style="color: #9CA3AF; text-align: center; padding: 24px;">No slots scheduled for this day</p>';
                return;
            }
            
            // Generate slots
            const slotDuration = parseInt(document.getElementById('slot-duration-setting')?.value || '30');
            const bufferTime = parseInt(document.getElementById('buffer-time-setting')?.value || '5');
            const booked = bookedSlots[dateStr] || [];
            const reserved = reservedSlots[dateStr] || [];
            
            let html = '';
            
            for (const range of (daySchedule.slots || [])) {
                const [startHour, startMin] = range.start.split(':').map(Number);
                const [endHour, endMin] = range.end.split(':').map(Number);
                let currentMinutes = startHour * 60 + startMin;
                const endMinutes = endHour * 60 + endMin;
                
                while (currentMinutes + slotDuration <= endMinutes) {
                    const slotStart = \`\${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:\${String(currentMinutes % 60).padStart(2, '0')}\`;
                    const slotEnd = \`\${String(Math.floor((currentMinutes + slotDuration) / 60)).padStart(2, '0')}:\${String((currentMinutes + slotDuration) % 60).padStart(2, '0')}\`;
                    const slotId = \`\${dateStr}-\${slotStart}\`;
                    
                    const isBooked = booked.includes(slotStart);
                    const isReserved = reserved.includes(slotStart);
                    const isSelected = selectedSlots.has(slotId);
                    
                    let classes = ['slot-item'];
                    let status = '';
                    
                    if (isBooked) {
                        classes.push('booked');
                        status = 'Booked';
                    } else if (isReserved) {
                        classes.push('reserved');
                        status = 'Reserved';
                    } else if (isSelected) {
                        classes.push('selected');
                        status = 'Selected';
                    }
                    
                    html += \`
                        <div class="\${classes.join(' ')}" 
                             onclick="\${isBooked ? '' : \`toggleSlotSelection('\${slotId}')\`}"
                             data-slot-id="\${slotId}">
                            <div>\${slotStart} - \${slotEnd}</div>
                            \${status ? \`<div class="slot-status">\${status}</div>\` : ''}
                        </div>
                    \`;
                    
                    currentMinutes += slotDuration + bufferTime;
                }
            }
            
            container.innerHTML = html || '<p style="color: #9CA3AF; text-align: center; padding: 24px;">No time slots available</p>';
        }
        
        function toggleSlotSelection(slotId) {
            if (selectedSlots.has(slotId)) {
                selectedSlots.delete(slotId);
            } else {
                selectedSlots.add(slotId);
            }
            
            // Update UI
            const slotEl = document.querySelector(\`[data-slot-id="\${slotId}"]\`);
            if (slotEl && !slotEl.classList.contains('booked')) {
                slotEl.classList.toggle('selected');
                
                if (selectedSlots.has(slotId)) {
                    if (!slotEl.querySelector('.slot-status')) {
                        slotEl.innerHTML += '<div class="slot-status">Selected</div>';
                    } else {
                        slotEl.querySelector('.slot-status').textContent = 'Selected';
                    }
                } else {
                    const statusEl = slotEl.querySelector('.slot-status');
                    if (statusEl && statusEl.textContent === 'Selected') {
                        statusEl.remove();
                    }
                }
            }
        }
        
        function selectAllSlots() {
            if (!selectedCalendarDate) return;
            
            document.querySelectorAll('#date-time-slots .slot-item:not(.booked):not(.blocked)').forEach(el => {
                const slotId = el.dataset.slotId;
                if (!selectedSlots.has(slotId)) {
                    selectedSlots.add(slotId);
                    el.classList.add('selected');
                    if (!el.querySelector('.slot-status')) {
                        el.innerHTML += '<div class="slot-status">Selected</div>';
                    } else {
                        el.querySelector('.slot-status').textContent = 'Selected';
                    }
                }
            });
            
            showToast(\`\${selectedSlots.size} slots selected\`, 'info');
        }
        
        function reserveSelectedSlots() {
            if (selectedSlots.size === 0) {
                showToast('Please select at least one slot', 'warning');
                return;
            }
            
            // Save to reserved slots
            selectedSlots.forEach(slotId => {
                const [dateStr, time] = slotId.split('-').slice(0, 3).join('-').split('-');
                const actualDate = slotId.substring(0, 10);
                const actualTime = slotId.substring(11);
                
                if (!reservedSlots[actualDate]) {
                    reservedSlots[actualDate] = [];
                }
                if (!reservedSlots[actualDate].includes(actualTime)) {
                    reservedSlots[actualDate].push(actualTime);
                }
            });
            
            // Save to server
            fetch(\`\${config.apiBase}/doctor/\${config.doctorId}/reserved-slots\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: config.doctorId,
                    reservedSlots: Array.from(selectedSlots)
                })
            }).catch(err => console.error('Failed to save reserved slots:', err));
            
            showToast(\`\${selectedSlots.size} slots reserved for online booking\`, 'success');
            selectedSlots.clear();
            renderDateSlots(selectedCalendarDate);
            renderCalendar();
        }
        
        function blockSelectedSlots() {
            if (selectedSlots.size === 0) {
                showToast('Please select at least one slot', 'warning');
                return;
            }
            
            // For simplicity, block the entire day if any slots are selected
            if (selectedCalendarDate) {
                const date = new Date(selectedCalendarDate);
                const startTime = new Date(date);
                startTime.setHours(0, 0, 0);
                const endTime = new Date(date);
                endTime.setHours(23, 59, 59);
                
                blockedTimes.push({
                    id: Date.now().toString(),
                    reason: 'personal',
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    notes: \`Blocked \${selectedSlots.size} slots\`
                });
                
                renderBlockedTimes();
            }
            
            showToast(\`Slots blocked successfully\`, 'warning');
            selectedSlots.clear();
            closeSelectedDateSlots();
            renderCalendar();
        }
        
        function closeSelectedDateSlots() {
            selectedCalendarDate = null;
            selectedSlots.clear();
            
            document.getElementById('selected-date-slots').style.display = 'none';
            document.getElementById('no-date-selected').style.display = 'block';
            
            renderCalendar();
        }
        
        function toggleOnlineBooking() {
            const toggle = document.getElementById('toggle-online-booking');
            onlineBookingEnabled = !toggle.classList.contains('active');
            toggle.classList.toggle('active');
            
            showToast(onlineBookingEnabled ? 'Online bookings enabled' : 'Online bookings disabled', 'info');
            
            // Save to server
            saveBookingSettings();
        }
        
        function saveBookingSettings() {
            const settings = {
                slotDuration: parseInt(document.getElementById('slot-duration-setting')?.value || '30'),
                bufferTime: parseInt(document.getElementById('buffer-time-setting')?.value || '5'),
                bookingWindowDays: parseInt(document.getElementById('booking-window-setting')?.value || '30'),
                consultationFee: parseFloat(document.getElementById('consultation-fee-setting')?.value || '150'),
                allowOnlineBooking: onlineBookingEnabled
            };
            
            // Save to server
            fetch(\`\${config.apiBase}/doctor/schedule\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: config.doctorId,
                    settings: settings
                })
            }).then(res => res.json())
              .then(data => {
                  if (data.success) {
                      showToast('Booking settings saved', 'success');
                      renderCalendar();
                  }
              })
              .catch(err => {
                  console.error('Failed to save settings:', err);
                  showToast('Failed to save settings', 'error');
              });
        }
        
        function loadBookingSettings() {
            fetch(\`\${config.apiBase}/doctor/\${config.doctorId}/schedule\`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data.settings) {
                        const s = data.data.settings;
                        
                        if (document.getElementById('slot-duration-setting')) {
                            document.getElementById('slot-duration-setting').value = s.slotDuration || 30;
                        }
                        if (document.getElementById('buffer-time-setting')) {
                            document.getElementById('buffer-time-setting').value = s.bufferTime || 5;
                        }
                        if (document.getElementById('booking-window-setting')) {
                            document.getElementById('booking-window-setting').value = s.bookingWindowDays || 30;
                        }
                        if (document.getElementById('consultation-fee-setting')) {
                            document.getElementById('consultation-fee-setting').value = s.consultationFee || 150;
                        }
                        
                        onlineBookingEnabled = s.allowOnlineBooking !== false;
                        const toggle = document.getElementById('toggle-online-booking');
                        if (toggle) {
                            toggle.classList.toggle('active', onlineBookingEnabled);
                        }
                    }
                })
                .catch(err => console.error('Failed to load settings:', err));
        }
        
        // Initialize calendar on page load
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeCalendar, 100);
        });
    </script>
</body>
</html>`;
}
