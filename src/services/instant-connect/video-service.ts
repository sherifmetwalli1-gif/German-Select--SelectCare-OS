/**
 * Video Service for Instant Connect Telemedicine
 * SelectCareOS™ - World-Class Instant Doctor Connection
 * 
 * Uses Jitsi Meet - FREE, open-source, no API key needed
 * Alternative: Daily.co (free tier: 2,000 minutes/month)
 */

import type { VideoProvider } from './types';

// ============================================================================
// VIDEO ROOM CONFIGURATION
// ============================================================================

const VIDEO_CONFIG = {
  // Jitsi Meet public server (FREE, no signup)
  JITSI_DOMAIN: 'meet.jit.si',
  
  // Room naming prefix for SelectCareOS
  ROOM_PREFIX: 'selectcareos',
  
  // Default video settings
  DEFAULT_SETTINGS: {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    enableWelcomePage: false,
    enableClosePage: false,
    disableDeepLinking: true,
    prejoinPageEnabled: true,
    disableThirdPartyRequests: true,
    enableNoisyMicDetection: true,
    enableNoAudioDetection: true,
  },
  
  // Interface settings
  INTERFACE_CONFIG: {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_BACKGROUND: '#1e293b',
    TOOLBAR_BUTTONS: [
      'microphone',
      'camera',
      'desktop',
      'fullscreen',
      'chat',
      'settings',
      'raisehand',
      'filmstrip',
      'hangup',
    ],
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    HIDE_INVITE_MORE_HEADER: true,
  }
};

// ============================================================================
// VIDEO ROOM TYPES
// ============================================================================

export interface VideoRoom {
  roomId: string;
  roomUrl: string;
  patientToken: string;
  doctorToken: string;
  provider: VideoProvider;
  createdAt: Date;
  expiresAt: Date;
}

export interface JitsiConfig {
  roomName: string;
  width: string;
  height: string;
  parentNode: HTMLElement | null;
  configOverwrite: object;
  interfaceConfigOverwrite: object;
  userInfo?: {
    displayName: string;
    email?: string;
  };
}

// ============================================================================
// VIDEO SERVICE
// ============================================================================

export class VideoService {
  private rooms: Map<string, VideoRoom> = new Map();
  
  constructor() {}
  
  /**
   * Create a new video room for a consultation
   */
  createRoom(consultationId: string): VideoRoom {
    const roomId = this.generateRoomId(consultationId);
    const now = new Date();
    
    // Create room URLs with unique tokens
    const patientToken = this.generateToken('patient');
    const doctorToken = this.generateToken('doctor');
    
    const baseUrl = `https://${VIDEO_CONFIG.JITSI_DOMAIN}/${roomId}`;
    
    const room: VideoRoom = {
      roomId,
      roomUrl: baseUrl,
      patientToken,
      doctorToken,
      provider: 'jitsi',
      createdAt: now,
      expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours
    };
    
    this.rooms.set(consultationId, room);
    
    console.log(`[Video] Created room ${roomId} for consultation ${consultationId}`);
    
    return room;
  }
  
  /**
   * Generate a unique room ID
   */
  private generateRoomId(consultationId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${VIDEO_CONFIG.ROOM_PREFIX}-${timestamp}-${random}`;
  }
  
  /**
   * Generate a simple token for room access
   */
  private generateToken(role: 'patient' | 'doctor'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 12);
    return `${role}-${timestamp}-${random}`;
  }
  
  /**
   * Get video room URL with participant info
   */
  getParticipantUrl(consultationId: string, role: 'patient' | 'doctor', displayName: string): string {
    const room = this.rooms.get(consultationId);
    if (!room) {
      throw new Error(`Room not found for consultation ${consultationId}`);
    }
    
    // Build Jitsi URL with config parameters
    const params = new URLSearchParams({
      // User info
      'userInfo.displayName': displayName,
      
      // Config overwrites
      'config.startWithAudioMuted': 'false',
      'config.startWithVideoMuted': 'false',
      'config.prejoinPageEnabled': 'true',
      'config.disableDeepLinking': 'true',
      
      // Interface config
      'interfaceConfig.SHOW_JITSI_WATERMARK': 'false',
      'interfaceConfig.SHOW_WATERMARK_FOR_GUESTS': 'false',
    });
    
    return `${room.roomUrl}#${params.toString()}`;
  }
  
  /**
   * Get Jitsi embed configuration for iframe integration
   */
  getJitsiConfig(consultationId: string, displayName: string, email?: string): JitsiConfig {
    const room = this.rooms.get(consultationId);
    if (!room) {
      throw new Error(`Room not found for consultation ${consultationId}`);
    }
    
    return {
      roomName: room.roomId,
      width: '100%',
      height: '100%',
      parentNode: null, // Set this in the client
      configOverwrite: {
        ...VIDEO_CONFIG.DEFAULT_SETTINGS,
        subject: 'SelectCareOS™ Medical Consultation',
      },
      interfaceConfigOverwrite: VIDEO_CONFIG.INTERFACE_CONFIG,
      userInfo: {
        displayName,
        email
      }
    };
  }
  
  /**
   * Get room by consultation ID
   */
  getRoom(consultationId: string): VideoRoom | undefined {
    return this.rooms.get(consultationId);
  }
  
  /**
   * Check if room exists and is valid
   */
  isRoomValid(consultationId: string): boolean {
    const room = this.rooms.get(consultationId);
    if (!room) return false;
    
    return room.expiresAt > new Date();
  }
  
  /**
   * Close/delete a room
   */
  closeRoom(consultationId: string): boolean {
    const existed = this.rooms.has(consultationId);
    this.rooms.delete(consultationId);
    
    if (existed) {
      console.log(`[Video] Closed room for consultation ${consultationId}`);
    }
    
    return existed;
  }
  
  /**
   * Generate frontend JavaScript for Jitsi integration
   */
  generateClientScript(consultationId: string, role: 'patient' | 'doctor', displayName: string): string {
    const room = this.rooms.get(consultationId);
    if (!room) {
      throw new Error(`Room not found for consultation ${consultationId}`);
    }
    
    return `
// SelectCareOS™ Video Integration - Jitsi Meet
const domain = '${VIDEO_CONFIG.JITSI_DOMAIN}';
const options = {
  roomName: '${room.roomId}',
  width: '100%',
  height: '100%',
  parentNode: document.getElementById('video-container'),
  configOverwrite: {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: true,
    disableDeepLinking: true,
    subject: 'SelectCareOS™ Medical Consultation'
  },
  interfaceConfigOverwrite: {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'fullscreen', 'chat', 'settings', 'raisehand', 'filmstrip', 'hangup'],
    HIDE_INVITE_MORE_HEADER: true
  },
  userInfo: {
    displayName: '${displayName}'
  }
};

const api = new JitsiMeetExternalAPI(domain, options);

// Event handlers
api.addEventListener('readyToClose', () => {
  console.log('[SelectCareOS] Video call ended');
  window.location.href = '/consultation/${consultationId}/feedback';
});

api.addEventListener('participantJoined', (participant) => {
  console.log('[SelectCareOS] Participant joined:', participant.displayName);
});

api.addEventListener('participantLeft', (participant) => {
  console.log('[SelectCareOS] Participant left:', participant.displayName);
});

api.addEventListener('videoConferenceJoined', () => {
  console.log('[SelectCareOS] Joined video conference');
  // Notify backend
  fetch('/api/instant-connect/consultation/${consultationId}/joined', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: '${role}' })
  });
});
`;
  }
  
  /**
   * Get statistics about active rooms
   */
  getStats(): { totalRooms: number; activeRooms: number } {
    const now = new Date();
    const activeRooms = Array.from(this.rooms.values())
      .filter(room => room.expiresAt > now).length;
    
    return {
      totalRooms: this.rooms.size,
      activeRooms
    };
  }
}

// Export singleton instance
export const videoService = new VideoService();
