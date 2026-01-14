/**
 * Video Consultation Page - SelectCareOS™ Telemedicine
 * Enterprise-grade video consultation interface
 * 
 * Features:
 * - HD video/audio with Jitsi/Daily.co
 * - In-call chat panel
 * - Screen sharing
 * - Call controls (mute, camera, end call)
 * - Medical notes (doctor only)
 * - Prescription writing (doctor only)
 * - Call timer
 * - Connection quality indicator
 */

import type { Context } from 'hono';

export function videoConsultationPage(c: Context): string {
  const consultationId = c.req.param('id') || '';
  const role = (c.req.query('role') || 'patient') as 'patient' | 'doctor';
  const lang = c.req.query('lang') || 'en';
  const displayName = c.req.query('name') || (role === 'doctor' ? 'Doctor' : 'Patient');
  
  // Translations
  const tr: Record<string, Record<string, string>> = {
    en: {
      title: 'Video Consultation',
      connecting: 'Connecting to consultation...',
      waitingForDoctor: 'Waiting for doctor to join...',
      waitingForPatient: 'Waiting for patient to join...',
      callInProgress: 'Call in Progress',
      endCall: 'End Call',
      mute: 'Mute',
      unmute: 'Unmute',
      videoOn: 'Camera On',
      videoOff: 'Camera Off',
      shareScreen: 'Share Screen',
      stopSharing: 'Stop Sharing',
      chat: 'Chat',
      notes: 'Medical Notes',
      prescription: 'Prescription',
      patientInfo: 'Patient Info',
      callEnded: 'Call Ended',
      thankYou: 'Thank you for using SelectCareOS™',
      rateCall: 'How was your consultation?',
      submitRating: 'Submit Rating',
      sendMessage: 'Send message...',
      typeNotes: 'Type your medical notes here...',
      savePrescription: 'Save Prescription',
      addMedication: 'Add Medication',
      connectionIssue: 'Connection Issue',
      tryReconnect: 'Try to Reconnect',
      callDuration: 'Duration',
      recording: 'Recording',
      notRecording: 'Not Recording',
    },
    de: {
      title: 'Videokonsultation',
      connecting: 'Verbindung wird hergestellt...',
      waitingForDoctor: 'Warten auf den Arzt...',
      waitingForPatient: 'Warten auf den Patienten...',
      callInProgress: 'Anruf läuft',
      endCall: 'Anruf beenden',
      mute: 'Stumm',
      unmute: 'Stummschaltung aufheben',
      videoOn: 'Kamera an',
      videoOff: 'Kamera aus',
      shareScreen: 'Bildschirm teilen',
      stopSharing: 'Teilen beenden',
      chat: 'Chat',
      notes: 'Medizinische Notizen',
      prescription: 'Rezept',
      patientInfo: 'Patienteninformation',
      callEnded: 'Anruf beendet',
      thankYou: 'Vielen Dank für die Nutzung von SelectCareOS™',
      rateCall: 'Wie war Ihre Konsultation?',
      submitRating: 'Bewertung abgeben',
      sendMessage: 'Nachricht senden...',
      typeNotes: 'Geben Sie hier Ihre medizinischen Notizen ein...',
      savePrescription: 'Rezept speichern',
      addMedication: 'Medikament hinzufügen',
      connectionIssue: 'Verbindungsproblem',
      tryReconnect: 'Erneut verbinden',
      callDuration: 'Dauer',
      recording: 'Aufnahme',
      notRecording: 'Keine Aufnahme',
    },
    ar: {
      title: 'استشارة فيديو',
      connecting: 'جاري الاتصال...',
      waitingForDoctor: 'في انتظار الطبيب...',
      waitingForPatient: 'في انتظار المريض...',
      callInProgress: 'المكالمة جارية',
      endCall: 'إنهاء المكالمة',
      mute: 'كتم الصوت',
      unmute: 'إلغاء كتم الصوت',
      videoOn: 'الكاميرا مفعلة',
      videoOff: 'الكاميرا معطلة',
      shareScreen: 'مشاركة الشاشة',
      stopSharing: 'إيقاف المشاركة',
      chat: 'الدردشة',
      notes: 'الملاحظات الطبية',
      prescription: 'الوصفة الطبية',
      patientInfo: 'معلومات المريض',
      callEnded: 'انتهت المكالمة',
      thankYou: 'شكراً لاستخدامك SelectCareOS™',
      rateCall: 'كيف كانت استشارتك؟',
      submitRating: 'إرسال التقييم',
      sendMessage: 'اكتب رسالة...',
      typeNotes: 'اكتب ملاحظاتك الطبية هنا...',
      savePrescription: 'حفظ الوصفة',
      addMedication: 'إضافة دواء',
      connectionIssue: 'مشكلة في الاتصال',
      tryReconnect: 'إعادة الاتصال',
      callDuration: 'المدة',
      recording: 'تسجيل',
      notRecording: 'بدون تسجيل',
    }
  };
  
  const t = tr[lang] || tr.en;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${t.title} - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Jitsi Meet External API -->
    <script src="https://meet.jit.si/external_api.js"></script>
    
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
            background: var(--navy);
            color: white;
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
        }
        
        /* Video Container */
        .video-container {
            position: relative;
            height: calc(100vh - 80px);
            background: #000;
            border-radius: 0 0 16px 16px;
            overflow: hidden;
        }
        
        .video-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        /* Header Bar */
        .call-header {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            padding: 12px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid var(--gold);
        }
        
        .call-info {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .call-timer {
            font-size: 18px;
            font-weight: 600;
            font-variant-numeric: tabular-nums;
            background: rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 8px;
        }
        
        .recording-indicator {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: var(--danger);
        }
        
        .recording-dot {
            width: 8px;
            height: 8px;
            background: var(--danger);
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        /* Control Bar */
        .control-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, var(--navy-light) 0%, var(--navy) 100%);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            border-top: 2px solid var(--gold);
            z-index: 100;
        }
        
        .control-btn {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: none;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.1);
            color: white;
        }
        
        .control-btn:hover {
            background: rgba(255,255,255,0.2);
            transform: scale(1.05);
        }
        
        .control-btn.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .control-btn.muted {
            background: var(--danger);
        }
        
        .control-btn.end-call {
            background: var(--danger);
            width: 64px;
            height: 64px;
            font-size: 24px;
        }
        
        .control-btn.end-call:hover {
            background: #DC2626;
        }
        
        /* Side Panel */
        .side-panel {
            position: fixed;
            top: 60px;
            ${isRtl ? 'left' : 'right'}: 0;
            width: 360px;
            height: calc(100vh - 140px);
            background: white;
            color: var(--navy);
            border-radius: ${isRtl ? '0 16px 16px 0' : '16px 0 0 16px'};
            box-shadow: -4px 0 20px rgba(0,0,0,0.3);
            transform: translateX(${isRtl ? '-100%' : '100%'});
            transition: transform 0.3s ease;
            z-index: 50;
            display: flex;
            flex-direction: column;
        }
        
        .side-panel.open {
            transform: translateX(0);
        }
        
        .panel-header {
            padding: 16px;
            border-bottom: 1px solid #E5E7EB;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .panel-tabs {
            display: flex;
            gap: 8px;
            padding: 12px 16px;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .panel-tab {
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            background: transparent;
            border: none;
            color: #6B7280;
            transition: all 0.2s ease;
        }
        
        .panel-tab:hover {
            background: #F3F4F6;
        }
        
        .panel-tab.active {
            background: var(--gold);
            color: white;
        }
        
        .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }
        
        /* Chat Messages */
        .chat-messages {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 12px;
        }
        
        .chat-message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .chat-message.sent {
            background: var(--gold);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        
        .chat-message.received {
            background: #F3F4F6;
            color: var(--navy);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        
        .chat-message .sender {
            font-size: 11px;
            opacity: 0.7;
            margin-bottom: 4px;
        }
        
        .chat-input-container {
            padding: 12px 16px;
            border-top: 1px solid #E5E7EB;
            display: flex;
            gap: 8px;
        }
        
        .chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #E5E7EB;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }
        
        .chat-input:focus {
            border-color: var(--gold);
        }
        
        .chat-send-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--gold);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        
        .chat-send-btn:hover {
            background: #B8920F;
        }
        
        /* Medical Notes (Doctor Only) */
        .notes-textarea {
            width: 100%;
            height: 200px;
            padding: 12px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 14px;
            resize: none;
            outline: none;
            font-family: inherit;
        }
        
        .notes-textarea:focus {
            border-color: var(--gold);
        }
        
        /* Prescription Form (Doctor Only) */
        .prescription-form {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .medication-item {
            background: #F9FAFB;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #E5E7EB;
        }
        
        .medication-input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .add-medication-btn {
            width: 100%;
            padding: 12px;
            background: #F3F4F6;
            border: 2px dashed #D1D5DB;
            border-radius: 8px;
            color: #6B7280;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        .add-medication-btn:hover {
            border-color: var(--gold);
            color: var(--gold);
        }
        
        .save-btn {
            padding: 12px 24px;
            background: var(--gold);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 12px;
            transition: background 0.2s;
        }
        
        .save-btn:hover {
            background: #B8920F;
        }
        
        /* Connection Quality Indicator */
        .connection-quality {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 6px 12px;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            font-size: 12px;
        }
        
        .quality-bar {
            width: 3px;
            height: 12px;
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
        }
        
        .quality-bar.active {
            background: var(--success);
        }
        
        .quality-bar.active.medium {
            background: var(--warning);
        }
        
        .quality-bar.active.poor {
            background: var(--danger);
        }
        
        /* Loading/Connecting State */
        .connecting-overlay {
            position: absolute;
            inset: 0;
            background: var(--navy);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            z-index: 10;
        }
        
        .connecting-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255,255,255,0.1);
            border-top-color: var(--gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Call Ended State */
        .call-ended-overlay {
            position: fixed;
            inset: 0;
            background: var(--navy);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            z-index: 200;
        }
        
        .call-ended-overlay.show {
            display: flex;
        }
        
        .rating-stars {
            display: flex;
            gap: 8px;
        }
        
        .rating-star {
            font-size: 36px;
            color: rgba(255,255,255,0.3);
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .rating-star:hover,
        .rating-star.active {
            color: var(--gold);
            transform: scale(1.1);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .side-panel {
                width: 100%;
                border-radius: 16px 16px 0 0;
                transform: translateY(100%);
                top: auto;
                bottom: 80px;
                height: 60vh;
            }
            
            .side-panel.open {
                transform: translateY(0);
            }
            
            .control-bar {
                padding: 12px 16px;
            }
            
            .control-btn {
                width: 48px;
                height: 48px;
                font-size: 18px;
            }
            
            .control-btn.end-call {
                width: 56px;
                height: 56px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="call-header">
        <div class="call-info">
            <img src="https://www.germanselect.org/favicon.ico" alt="SelectCareOS" style="height: 32px;">
            <div>
                <div style="font-weight: 600;">SelectCareOS™</div>
                <div style="font-size: 12px; opacity: 0.7;">${t.title}</div>
            </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 16px;">
            <div class="call-timer" id="call-timer">00:00</div>
            
            <div class="connection-quality" id="connection-quality">
                <div class="quality-bar active"></div>
                <div class="quality-bar active"></div>
                <div class="quality-bar active"></div>
                <div class="quality-bar active"></div>
            </div>
            
            <div class="recording-indicator" id="recording-indicator" style="display: none;">
                <div class="recording-dot"></div>
                <span>${t.recording}</span>
            </div>
        </div>
    </header>
    
    <!-- Video Container -->
    <div class="video-container" id="video-container">
        <div class="connecting-overlay" id="connecting-overlay">
            <div class="connecting-spinner"></div>
            <div style="font-size: 18px; font-weight: 500;">${t.connecting}</div>
            <div style="font-size: 14px; opacity: 0.7;">
                ${role === 'patient' ? t.waitingForDoctor : t.waitingForPatient}
            </div>
        </div>
    </div>
    
    <!-- Control Bar -->
    <div class="control-bar">
        <button class="control-btn" id="btn-mute" onclick="toggleMute()" title="${t.mute}">
            <i class="fas fa-microphone"></i>
        </button>
        
        <button class="control-btn" id="btn-video" onclick="toggleVideo()" title="${t.videoOn}">
            <i class="fas fa-video"></i>
        </button>
        
        <button class="control-btn" id="btn-screen" onclick="toggleScreenShare()" title="${t.shareScreen}">
            <i class="fas fa-desktop"></i>
        </button>
        
        <button class="control-btn end-call" onclick="endCall()" title="${t.endCall}">
            <i class="fas fa-phone-slash"></i>
        </button>
        
        <button class="control-btn" id="btn-chat" onclick="togglePanel('chat')" title="${t.chat}">
            <i class="fas fa-comment"></i>
        </button>
        
        ${role === 'doctor' ? `
        <button class="control-btn" id="btn-notes" onclick="togglePanel('notes')" title="${t.notes}">
            <i class="fas fa-clipboard"></i>
        </button>
        
        <button class="control-btn" id="btn-prescription" onclick="togglePanel('prescription')" title="${t.prescription}">
            <i class="fas fa-prescription"></i>
        </button>
        ` : ''}
    </div>
    
    <!-- Side Panel -->
    <div class="side-panel" id="side-panel">
        <div class="panel-header">
            <span id="panel-title" style="font-weight: 600;">${t.chat}</span>
            <button onclick="closePanel()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #6B7280;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <!-- Chat Tab -->
        <div id="chat-panel" class="panel-content">
            <div class="chat-messages" id="chat-messages">
                <!-- Messages will be added here -->
            </div>
        </div>
        <div class="chat-input-container" id="chat-input-container">
            <input type="text" class="chat-input" id="chat-input" placeholder="${t.sendMessage}" onkeypress="if(event.key === 'Enter') sendMessage()">
            <button class="chat-send-btn" onclick="sendMessage()">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
        
        <!-- Notes Tab (Doctor Only) -->
        <div id="notes-panel" class="panel-content" style="display: none;">
            <textarea class="notes-textarea" id="medical-notes" placeholder="${t.typeNotes}"></textarea>
            <button class="save-btn" onclick="saveNotes()">
                <i class="fas fa-save" style="margin-right: 8px;"></i>
                Save Notes
            </button>
        </div>
        
        <!-- Prescription Tab (Doctor Only) -->
        <div id="prescription-panel" class="panel-content" style="display: none;">
            <div class="prescription-form" id="prescription-form">
                <div class="medication-item">
                    <input type="text" class="medication-input" placeholder="Medication name">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <input type="text" class="medication-input" placeholder="Dosage" style="margin: 0;">
                        <input type="text" class="medication-input" placeholder="Frequency" style="margin: 0;">
                    </div>
                </div>
                
                <button class="add-medication-btn" onclick="addMedication()">
                    <i class="fas fa-plus" style="margin-right: 8px;"></i>
                    ${t.addMedication}
                </button>
                
                <textarea class="notes-textarea" style="height: 100px;" placeholder="Special instructions..."></textarea>
                
                <button class="save-btn" onclick="savePrescription()">
                    <i class="fas fa-file-prescription" style="margin-right: 8px;"></i>
                    ${t.savePrescription}
                </button>
            </div>
        </div>
    </div>
    
    <!-- Call Ended Overlay -->
    <div class="call-ended-overlay" id="call-ended-overlay">
        <i class="fas fa-check-circle" style="font-size: 64px; color: var(--success);"></i>
        <div style="font-size: 24px; font-weight: 600;">${t.callEnded}</div>
        <div style="font-size: 16px; opacity: 0.7;">${t.thankYou}</div>
        
        <div style="margin-top: 24px;">
            <div style="font-size: 16px; margin-bottom: 12px;">${t.rateCall}</div>
            <div class="rating-stars" id="rating-stars">
                <span class="rating-star" data-rating="1">★</span>
                <span class="rating-star" data-rating="2">★</span>
                <span class="rating-star" data-rating="3">★</span>
                <span class="rating-star" data-rating="4">★</span>
                <span class="rating-star" data-rating="5">★</span>
            </div>
        </div>
        
        <button class="save-btn" onclick="submitRating()" style="margin-top: 24px;">
            ${t.submitRating}
        </button>
        
        <a href="/" style="margin-top: 16px; color: var(--gold); text-decoration: none;">
            ← Return to Dashboard
        </a>
    </div>

    <script>
        // ============================================
        // CONFIGURATION
        // ============================================
        const config = {
            consultationId: '${consultationId}',
            role: '${role}',
            displayName: '${displayName}',
            lang: '${lang}',
            jitsiDomain: 'meet.jit.si',
            roomPrefix: 'selectcareos'
        };
        
        // ============================================
        // STATE
        // ============================================
        let jitsiApi = null;
        let isMuted = false;
        let isVideoOff = false;
        let isScreenSharing = false;
        let callStartTime = null;
        let timerInterval = null;
        let selectedRating = 0;
        let currentPanel = null;
        const chatMessages = [];
        
        // ============================================
        // INITIALIZE VIDEO CALL
        // ============================================
        async function initializeCall() {
            try {
                // Get video room info from API
                const response = await fetch(\`/api/instant-connect/consultation/\${config.consultationId}/video?role=\${config.role}\`);
                const data = await response.json();
                
                if (!data.success) {
                    console.error('Failed to get video room:', data.error);
                    return;
                }
                
                // Initialize Jitsi
                const roomName = data.data.roomId || \`\${config.roomPrefix}-\${config.consultationId}\`;
                
                jitsiApi = new JitsiMeetExternalAPI(config.jitsiDomain, {
                    roomName: roomName,
                    parentNode: document.getElementById('video-container'),
                    width: '100%',
                    height: '100%',
                    configOverwrite: {
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        prejoinPageEnabled: false,
                        disableDeepLinking: true,
                        subject: 'SelectCareOS™ Medical Consultation'
                    },
                    interfaceConfigOverwrite: {
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        TOOLBAR_ALWAYS_VISIBLE: false,
                        HIDE_INVITE_MORE_HEADER: true,
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        TOOLBAR_BUTTONS: []
                    },
                    userInfo: {
                        displayName: config.displayName
                    }
                });
                
                // Event listeners
                jitsiApi.addEventListener('videoConferenceJoined', onJoined);
                jitsiApi.addEventListener('videoConferenceLeft', onLeft);
                jitsiApi.addEventListener('participantJoined', onParticipantJoined);
                jitsiApi.addEventListener('participantLeft', onParticipantLeft);
                jitsiApi.addEventListener('audioMuteStatusChanged', onAudioMuteChanged);
                jitsiApi.addEventListener('videoMuteStatusChanged', onVideoMuteChanged);
                jitsiApi.addEventListener('screenSharingStatusChanged', onScreenShareChanged);
                jitsiApi.addEventListener('chatUpdated', onChatUpdated);
                
            } catch (error) {
                console.error('Failed to initialize call:', error);
            }
        }
        
        // ============================================
        // EVENT HANDLERS
        // ============================================
        function onJoined(event) {
            console.log('[SelectCareOS] Joined video conference');
            document.getElementById('connecting-overlay').style.display = 'none';
            
            // Start timer
            callStartTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
            
            // Notify backend
            fetch(\`/api/instant-connect/consultation/\${config.consultationId}/start\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: config.role })
            });
        }
        
        function onLeft(event) {
            console.log('[SelectCareOS] Left video conference');
            showCallEnded();
        }
        
        function onParticipantJoined(participant) {
            console.log('[SelectCareOS] Participant joined:', participant.displayName);
            addSystemMessage(\`\${participant.displayName} joined the call\`);
        }
        
        function onParticipantLeft(participant) {
            console.log('[SelectCareOS] Participant left:', participant.displayName);
            addSystemMessage(\`\${participant.displayName} left the call\`);
        }
        
        function onAudioMuteChanged(event) {
            isMuted = event.muted;
            updateMuteButton();
        }
        
        function onVideoMuteChanged(event) {
            isVideoOff = event.muted;
            updateVideoButton();
        }
        
        function onScreenShareChanged(event) {
            isScreenSharing = event.on;
            updateScreenShareButton();
        }
        
        function onChatUpdated(event) {
            // Handle incoming chat messages from Jitsi
            if (event.isOpen !== undefined) return;
            addChatMessage(event.message, event.from, event.from !== config.displayName);
        }
        
        // ============================================
        // CONTROL FUNCTIONS
        // ============================================
        function toggleMute() {
            if (jitsiApi) {
                jitsiApi.executeCommand('toggleAudio');
            }
        }
        
        function toggleVideo() {
            if (jitsiApi) {
                jitsiApi.executeCommand('toggleVideo');
            }
        }
        
        function toggleScreenShare() {
            if (jitsiApi) {
                jitsiApi.executeCommand('toggleShareScreen');
            }
        }
        
        function endCall() {
            if (jitsiApi) {
                jitsiApi.executeCommand('hangup');
            }
            
            // Notify backend
            fetch(\`/api/instant-connect/consultation/\${config.consultationId}/end\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: config.role })
            });
            
            showCallEnded();
        }
        
        // ============================================
        // UI UPDATE FUNCTIONS
        // ============================================
        function updateMuteButton() {
            const btn = document.getElementById('btn-mute');
            const icon = btn.querySelector('i');
            
            if (isMuted) {
                btn.classList.add('muted');
                icon.className = 'fas fa-microphone-slash';
            } else {
                btn.classList.remove('muted');
                icon.className = 'fas fa-microphone';
            }
        }
        
        function updateVideoButton() {
            const btn = document.getElementById('btn-video');
            const icon = btn.querySelector('i');
            
            if (isVideoOff) {
                btn.classList.add('muted');
                icon.className = 'fas fa-video-slash';
            } else {
                btn.classList.remove('muted');
                icon.className = 'fas fa-video';
            }
        }
        
        function updateScreenShareButton() {
            const btn = document.getElementById('btn-screen');
            
            if (isScreenSharing) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
        
        function updateTimer() {
            if (!callStartTime) return;
            
            const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            
            document.getElementById('call-timer').textContent = \`\${minutes}:\${seconds}\`;
        }
        
        // ============================================
        // PANEL FUNCTIONS
        // ============================================
        function togglePanel(panelName) {
            const panel = document.getElementById('side-panel');
            const panelTitle = document.getElementById('panel-title');
            
            // Hide all panel contents
            document.getElementById('chat-panel').style.display = 'none';
            document.getElementById('chat-input-container').style.display = 'none';
            document.getElementById('notes-panel').style.display = 'none';
            document.getElementById('prescription-panel').style.display = 'none';
            
            // Deactivate all buttons
            document.querySelectorAll('.control-btn').forEach(btn => {
                if (btn.id.startsWith('btn-')) {
                    btn.classList.remove('active');
                }
            });
            
            if (currentPanel === panelName) {
                panel.classList.remove('open');
                currentPanel = null;
                return;
            }
            
            // Show selected panel
            if (panelName === 'chat') {
                document.getElementById('chat-panel').style.display = 'block';
                document.getElementById('chat-input-container').style.display = 'flex';
                panelTitle.textContent = '${t.chat}';
                document.getElementById('btn-chat').classList.add('active');
            } else if (panelName === 'notes') {
                document.getElementById('notes-panel').style.display = 'block';
                panelTitle.textContent = '${t.notes}';
                document.getElementById('btn-notes')?.classList.add('active');
            } else if (panelName === 'prescription') {
                document.getElementById('prescription-panel').style.display = 'block';
                panelTitle.textContent = '${t.prescription}';
                document.getElementById('btn-prescription')?.classList.add('active');
            }
            
            panel.classList.add('open');
            currentPanel = panelName;
        }
        
        function closePanel() {
            document.getElementById('side-panel').classList.remove('open');
            document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
            currentPanel = null;
        }
        
        // ============================================
        // CHAT FUNCTIONS
        // ============================================
        function sendMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Send via Jitsi
            if (jitsiApi) {
                jitsiApi.executeCommand('sendChatMessage', message);
            }
            
            addChatMessage(message, config.displayName, false);
            input.value = '';
        }
        
        function addChatMessage(text, sender, isReceived) {
            const container = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.className = \`chat-message \${isReceived ? 'received' : 'sent'}\`;
            msgDiv.innerHTML = \`
                <div class="sender">\${sender}</div>
                <div>\${text}</div>
            \`;
            container.appendChild(msgDiv);
            container.scrollTop = container.scrollHeight;
        }
        
        function addSystemMessage(text) {
            const container = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.style.cssText = 'text-align: center; font-size: 12px; color: #6B7280; margin: 8px 0;';
            msgDiv.textContent = text;
            container.appendChild(msgDiv);
        }
        
        // ============================================
        // PRESCRIPTION FUNCTIONS
        // ============================================
        function addMedication() {
            const form = document.getElementById('prescription-form');
            const addBtn = form.querySelector('.add-medication-btn');
            
            const newMed = document.createElement('div');
            newMed.className = 'medication-item';
            newMed.innerHTML = \`
                <input type="text" class="medication-input" placeholder="Medication name">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <input type="text" class="medication-input" placeholder="Dosage" style="margin: 0;">
                    <input type="text" class="medication-input" placeholder="Frequency" style="margin: 0;">
                </div>
            \`;
            
            form.insertBefore(newMed, addBtn);
        }
        
        async function savePrescription() {
            const medications = [];
            document.querySelectorAll('.medication-item').forEach(item => {
                const inputs = item.querySelectorAll('input');
                if (inputs[0].value) {
                    medications.push({
                        name: inputs[0].value,
                        dosage: inputs[1]?.value || '',
                        frequency: inputs[2]?.value || ''
                    });
                }
            });
            
            const instructions = document.querySelector('#prescription-panel textarea')?.value || '';
            
            try {
                await fetch(\`/api/instant-connect/consultation/\${config.consultationId}/prescription\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ medications, instructions })
                });
                
                alert('Prescription saved successfully!');
            } catch (error) {
                console.error('Failed to save prescription:', error);
            }
        }
        
        async function saveNotes() {
            const notes = document.getElementById('medical-notes').value;
            
            try {
                await fetch(\`/api/instant-connect/consultation/\${config.consultationId}/notes\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ notes })
                });
                
                alert('Notes saved successfully!');
            } catch (error) {
                console.error('Failed to save notes:', error);
            }
        }
        
        // ============================================
        // CALL ENDED / RATING
        // ============================================
        function showCallEnded() {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            
            document.getElementById('call-ended-overlay').classList.add('show');
            
            // Setup rating stars
            document.querySelectorAll('.rating-star').forEach(star => {
                star.addEventListener('click', () => {
                    selectedRating = parseInt(star.dataset.rating);
                    updateRatingStars();
                });
            });
        }
        
        function updateRatingStars() {
            document.querySelectorAll('.rating-star').forEach(star => {
                if (parseInt(star.dataset.rating) <= selectedRating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
        
        async function submitRating() {
            try {
                await fetch(\`/api/instant-connect/consultation/\${config.consultationId}/rating\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rating: selectedRating, role: config.role })
                });
                
                window.location.href = '/';
            } catch (error) {
                console.error('Failed to submit rating:', error);
                window.location.href = '/';
            }
        }
        
        // ============================================
        // INITIALIZE
        // ============================================
        document.addEventListener('DOMContentLoaded', initializeCall);
    </script>
</body>
</html>`;
}
