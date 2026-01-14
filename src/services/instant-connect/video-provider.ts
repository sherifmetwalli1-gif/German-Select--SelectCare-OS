/**
 * Video Provider Service - Multi-Provider Support
 * SelectCareOS™ - Enterprise-Grade Video Consultations
 * 
 * Supports:
 * - Jitsi Meet: FREE, unlimited usage, no API key needed
 * - Daily.co: Premium features (10,000 min/month free), recordings, breakout rooms
 * 
 * Usage:
 * - Default: Jitsi Meet (free tier, €0/month)
 * - Premium: Daily.co (for recording, analytics, enterprise features)
 */

import type { VideoProvider } from './types';

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface VideoProviderConfig {
  // Default provider (jitsi = free, daily = premium)
  defaultProvider: VideoProvider;
  
  // Jitsi Configuration (FREE)
  jitsi: {
    domain: string;
    enableRecording: boolean;
  };
  
  // Daily.co Configuration (PREMIUM - needs API key)
  daily: {
    domain: string;
    apiKey?: string;
    enableRecording: boolean;
    enableTranscription: boolean;
  };
}

const CONFIG: VideoProviderConfig = {
  defaultProvider: 'jitsi', // Change to 'daily' when API key is configured
  
  jitsi: {
    domain: 'meet.jit.si',
    enableRecording: false, // Jitsi public server doesn't support recording
  },
  
  daily: {
    domain: process.env.DAILY_DOMAIN || 'selectcareos.daily.co',
    apiKey: process.env.DAILY_API_KEY,
    enableRecording: true,
    enableTranscription: false, // Enable when needed
  }
};

// ============================================================================
// VIDEO ROOM TYPES
// ============================================================================

export interface VideoRoomConfig {
  consultationId: string;
  patientName: string;
  doctorName: string;
  enableRecording?: boolean;
  enableChat?: boolean;
  enableScreenShare?: boolean;
  maxParticipants?: number;
  expiresInMinutes?: number;
  provider?: VideoProvider;
}

export interface VideoRoomResult {
  success: boolean;
  roomId: string;
  roomUrl: string;
  patientUrl: string;
  doctorUrl: string;
  patientToken?: string;
  doctorToken?: string;
  provider: VideoProvider;
  createdAt: Date;
  expiresAt: Date;
  features: {
    recording: boolean;
    chat: boolean;
    screenShare: boolean;
    transcription: boolean;
  };
  embedCode?: string;
}

export interface DailyRoomResponse {
  id: string;
  name: string;
  url: string;
  created_at: string;
  config: {
    enable_chat?: boolean;
    enable_screenshare?: boolean;
    enable_recording?: string;
    max_participants?: number;
    exp?: number;
  };
}

// ============================================================================
// JITSI MEET PROVIDER (FREE)
// ============================================================================

class JitsiProvider {
  private domain = CONFIG.jitsi.domain;
  
  createRoom(config: VideoRoomConfig): VideoRoomResult {
    const roomId = this.generateRoomId(config.consultationId);
    const baseUrl = `https://${this.domain}/${roomId}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (config.expiresInMinutes || 120) * 60 * 1000);
    
    // Build URLs with participant info
    const patientUrl = this.buildParticipantUrl(baseUrl, config.patientName, 'patient');
    const doctorUrl = this.buildParticipantUrl(baseUrl, config.doctorName, 'doctor');
    
    return {
      success: true,
      roomId,
      roomUrl: baseUrl,
      patientUrl,
      doctorUrl,
      provider: 'jitsi',
      createdAt: now,
      expiresAt,
      features: {
        recording: false, // Jitsi public server doesn't support cloud recording
        chat: true,
        screenShare: true,
        transcription: false,
      },
      embedCode: this.generateEmbedCode(roomId, config)
    };
  }
  
  private generateRoomId(consultationId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `selectcareos-${timestamp}-${random}`;
  }
  
  private buildParticipantUrl(baseUrl: string, displayName: string, role: 'patient' | 'doctor'): string {
    const params = new URLSearchParams({
      'userInfo.displayName': displayName,
      'config.startWithAudioMuted': 'false',
      'config.startWithVideoMuted': 'false',
      'config.prejoinPageEnabled': 'true',
      'config.disableDeepLinking': 'true',
      'interfaceConfig.SHOW_JITSI_WATERMARK': 'false',
      'interfaceConfig.SHOW_WATERMARK_FOR_GUESTS': 'false',
    });
    
    return `${baseUrl}#${params.toString()}`;
  }
  
  private generateEmbedCode(roomId: string, config: VideoRoomConfig): string {
    return `
<!-- SelectCareOS™ Video Consultation - Jitsi Meet -->
<script src="https://meet.jit.si/external_api.js"></script>
<div id="selectcareos-video" style="height: 100%; width: 100%;"></div>
<script>
  const domain = '${this.domain}';
  const options = {
    roomName: '${roomId}',
    width: '100%',
    height: '100%',
    parentNode: document.getElementById('selectcareos-video'),
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
      TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'fullscreen', 'chat', 'raisehand', 'hangup'],
      HIDE_INVITE_MORE_HEADER: true
    }
  };
  
  const api = new JitsiMeetExternalAPI(domain, options);
  
  api.addEventListener('readyToClose', () => {
    window.parent.postMessage({ type: 'CONSULTATION_ENDED' }, '*');
  });
  
  api.addEventListener('videoConferenceJoined', () => {
    window.parent.postMessage({ type: 'CONSULTATION_JOINED' }, '*');
  });
</script>
`;
  }
}

// ============================================================================
// DAILY.CO PROVIDER (PREMIUM)
// ============================================================================

class DailyProvider {
  private domain = CONFIG.daily.domain;
  private apiKey = CONFIG.daily.apiKey;
  private apiBaseUrl = 'https://api.daily.co/v1';
  
  async createRoom(config: VideoRoomConfig): Promise<VideoRoomResult> {
    if (!this.apiKey) {
      throw new Error('Daily.co API key not configured. Set DAILY_API_KEY environment variable.');
    }
    
    const roomName = this.generateRoomName(config.consultationId);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (config.expiresInMinutes || 120) * 60 * 1000);
    
    try {
      // Create room via Daily.co API
      const response = await fetch(`${this.apiBaseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName,
          privacy: 'private',
          properties: {
            enable_chat: config.enableChat !== false,
            enable_screenshare: config.enableScreenShare !== false,
            enable_recording: config.enableRecording ? 'cloud' : undefined,
            max_participants: config.maxParticipants || 2,
            exp: Math.floor(expiresAt.getTime() / 1000),
            eject_at_room_exp: true,
            enable_prejoin_ui: true,
            enable_network_ui: true,
          },
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Daily.co API error: ${error.error || response.statusText}`);
      }
      
      const room: DailyRoomResponse = await response.json();
      
      // Create meeting tokens for participants
      const patientToken = await this.createMeetingToken(roomName, config.patientName, false);
      const doctorToken = await this.createMeetingToken(roomName, config.doctorName, true);
      
      return {
        success: true,
        roomId: room.name,
        roomUrl: room.url,
        patientUrl: `${room.url}?t=${patientToken}`,
        doctorUrl: `${room.url}?t=${doctorToken}`,
        patientToken,
        doctorToken,
        provider: 'daily',
        createdAt: now,
        expiresAt,
        features: {
          recording: config.enableRecording || false,
          chat: true,
          screenShare: true,
          transcription: CONFIG.daily.enableTranscription,
        },
        embedCode: this.generateEmbedCode(room.url, doctorToken)
      };
    } catch (error) {
      console.error('[Daily.co] Error creating room:', error);
      throw error;
    }
  }
  
  private generateRoomName(consultationId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `scos-${timestamp}-${random}`;
  }
  
  private async createMeetingToken(roomName: string, userName: string, isOwner: boolean): Promise<string> {
    const response = await fetch(`${this.apiBaseUrl}/meeting-tokens`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_name: userName,
          is_owner: isOwner, // Doctor is owner (can record, manage participants)
          enable_screenshare: true,
          start_video_off: false,
          start_audio_off: false,
          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        },
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create meeting token');
    }
    
    const { token } = await response.json();
    return token;
  }
  
  private generateEmbedCode(roomUrl: string, token: string): string {
    return `
<!-- SelectCareOS™ Video Consultation - Daily.co -->
<script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
<div id="selectcareos-video" style="height: 100%; width: 100%;"></div>
<script>
  const callFrame = window.DailyIframe.createFrame(
    document.getElementById('selectcareos-video'),
    {
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '12px',
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    }
  );
  
  callFrame.join({ url: '${roomUrl}', token: '${token}' });
  
  callFrame.on('left-meeting', () => {
    window.parent.postMessage({ type: 'CONSULTATION_ENDED' }, '*');
  });
  
  callFrame.on('joined-meeting', () => {
    window.parent.postMessage({ type: 'CONSULTATION_JOINED' }, '*');
  });
  
  callFrame.on('error', (e) => {
    console.error('[SelectCareOS] Video error:', e);
    window.parent.postMessage({ type: 'CONSULTATION_ERROR', error: e }, '*');
  });
</script>
`;
  }
  
  /**
   * Start recording for a room (Daily.co only)
   */
  async startRecording(roomName: string): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/rooms/${roomName}/recordings/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('[Daily.co] Error starting recording:', error);
      return false;
    }
  }
  
  /**
   * Stop recording for a room
   */
  async stopRecording(roomName: string): Promise<{ recordingUrl?: string }> {
    if (!this.apiKey) return {};
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/rooms/${roomName}/recordings/stop`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return { recordingUrl: data.download_url };
      }
      
      return {};
    } catch (error) {
      console.error('[Daily.co] Error stopping recording:', error);
      return {};
    }
  }
  
  /**
   * Delete a room
   */
  async deleteRoom(roomName: string): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/rooms/${roomName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('[Daily.co] Error deleting room:', error);
      return false;
    }
  }
}

// ============================================================================
// UNIFIED VIDEO SERVICE
// ============================================================================

class VideoProviderService {
  private jitsi = new JitsiProvider();
  private daily = new DailyProvider();
  private activeRooms = new Map<string, VideoRoomResult>();
  
  /**
   * Create a video room using the appropriate provider
   */
  async createRoom(config: VideoRoomConfig): Promise<VideoRoomResult> {
    const provider = config.provider || CONFIG.defaultProvider;
    
    let result: VideoRoomResult;
    
    if (provider === 'daily' && CONFIG.daily.apiKey) {
      // Use Daily.co for premium features
      result = await this.daily.createRoom(config);
    } else {
      // Default to Jitsi (free, no API key needed)
      result = this.jitsi.createRoom(config);
    }
    
    // Store room info
    this.activeRooms.set(config.consultationId, result);
    
    console.log(`[VideoProvider] Created ${result.provider} room: ${result.roomId}`);
    
    return result;
  }
  
  /**
   * Get room by consultation ID
   */
  getRoom(consultationId: string): VideoRoomResult | undefined {
    return this.activeRooms.get(consultationId);
  }
  
  /**
   * Check if room exists and is valid
   */
  isRoomValid(consultationId: string): boolean {
    const room = this.activeRooms.get(consultationId);
    if (!room) return false;
    return room.expiresAt > new Date();
  }
  
  /**
   * Close/delete a room
   */
  async closeRoom(consultationId: string): Promise<boolean> {
    const room = this.activeRooms.get(consultationId);
    if (!room) return false;
    
    // If Daily.co room, delete via API
    if (room.provider === 'daily' && CONFIG.daily.apiKey) {
      await this.daily.deleteRoom(room.roomId);
    }
    
    this.activeRooms.delete(consultationId);
    console.log(`[VideoProvider] Closed room for consultation ${consultationId}`);
    
    return true;
  }
  
  /**
   * Start recording (Daily.co only)
   */
  async startRecording(consultationId: string): Promise<boolean> {
    const room = this.activeRooms.get(consultationId);
    if (!room || room.provider !== 'daily') return false;
    
    return await this.daily.startRecording(room.roomId);
  }
  
  /**
   * Stop recording (Daily.co only)
   */
  async stopRecording(consultationId: string): Promise<{ recordingUrl?: string }> {
    const room = this.activeRooms.get(consultationId);
    if (!room || room.provider !== 'daily') return {};
    
    return await this.daily.stopRecording(room.roomId);
  }
  
  /**
   * Get service statistics
   */
  getStats(): {
    totalRooms: number;
    activeRooms: number;
    byProvider: { jitsi: number; daily: number };
  } {
    const now = new Date();
    const rooms = Array.from(this.activeRooms.values());
    const active = rooms.filter(r => r.expiresAt > now);
    
    return {
      totalRooms: rooms.length,
      activeRooms: active.length,
      byProvider: {
        jitsi: active.filter(r => r.provider === 'jitsi').length,
        daily: active.filter(r => r.provider === 'daily').length,
      }
    };
  }
  
  /**
   * Get current provider configuration
   */
  getConfig(): {
    defaultProvider: VideoProvider;
    dailyConfigured: boolean;
    features: { recording: boolean; transcription: boolean };
  } {
    return {
      defaultProvider: CONFIG.defaultProvider,
      dailyConfigured: !!CONFIG.daily.apiKey,
      features: {
        recording: CONFIG.daily.enableRecording && !!CONFIG.daily.apiKey,
        transcription: CONFIG.daily.enableTranscription && !!CONFIG.daily.apiKey,
      }
    };
  }
}

// Export singleton instance
export const videoProviderService = new VideoProviderService();

// Export types
export type { VideoRoomConfig, VideoRoomResult };
