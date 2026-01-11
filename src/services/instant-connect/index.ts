/**
 * Instant Connect Telemedicine System
 * SelectCareOS™ - World-Class Instant Doctor Connection
 * 
 * Main entry point - exports all services
 */

// Types
export * from './types';

// Services
export { SmartMatchingService, smartMatchingService } from './smart-matching';
export { ConsultationQueueManager, consultationQueue } from './consultation-queue';
export { VideoService, videoService } from './video-service';

// ============================================================================
// INSTANT CONNECT API
// ============================================================================

import { smartMatchingService } from './smart-matching';
import { consultationQueue } from './consultation-queue';
import { videoService } from './video-service';
import type { 
  UrgencyLevel, 
  ConsultationRequest, 
  MatchResult,
  QueueStats,
  ConnectNowResponse 
} from './types';

/**
 * Main API for Instant Connect functionality
 */
export const instantConnectAPI = {
  /**
   * Initialize the system with existing doctors
   */
  initialize(doctors: any[]): void {
    smartMatchingService.initializeFromDoctors(doctors);
    console.log('[InstantConnect] System initialized');
  },
  
  /**
   * Patient: Request instant connection to a doctor
   */
  connectNow(params: {
    patientId: string;
    patientName: string;
    preferredSpecialty?: string;
    preferredLanguage?: string;
    urgency?: UrgencyLevel;
    symptoms?: string[];
    symptomDescription?: string;
  }): ConnectNowResponse {
    const request = consultationQueue.createRequest({
      patientId: params.patientId,
      patientName: params.patientName,
      preferredSpecialty: params.preferredSpecialty,
      preferredLanguage: params.preferredLanguage,
      urgency: params.urgency || 'routine',
      symptoms: params.symptoms,
      symptomDescription: params.symptomDescription
    });
    
    const queuePosition = consultationQueue.getQueuePosition(request.id);
    const stats = consultationQueue.getQueueStats();
    
    // Get matched doctor info if available
    let matchedDoctor: ConnectNowResponse['matchedDoctor'];
    if (request.doctorId && request.status === 'matched') {
      const doctor = smartMatchingService.getDoctor(request.doctorId);
      if (doctor) {
        matchedDoctor = {
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          avatar: doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
          rating: doctor.rating
        };
      }
    }
    
    return {
      requestId: request.id,
      status: request.status,
      queuePosition: queuePosition > 0 ? queuePosition : undefined,
      estimatedWaitSeconds: stats.estimatedNextMatchSeconds,
      matchedDoctor,
      videoRoomUrl: request.videoRoomUrl
    };
  },
  
  /**
   * Doctor: Accept a consultation request
   */
  doctorAccept(requestId: string, doctorId: string): {
    success: boolean;
    consultationId?: string;
    videoRoomUrl?: string;
    error?: string;
  } {
    const success = consultationQueue.doctorAccept(requestId, doctorId);
    
    if (!success) {
      return { success: false, error: 'Unable to accept request' };
    }
    
    const request = consultationQueue.getRequest(requestId);
    
    return {
      success: true,
      consultationId: requestId,
      videoRoomUrl: request?.videoRoomUrl
    };
  },
  
  /**
   * Doctor: Decline a consultation request
   */
  doctorDecline(requestId: string, doctorId: string): boolean {
    return consultationQueue.doctorDecline(requestId, doctorId);
  },
  
  /**
   * Start the video call
   */
  startCall(requestId: string): boolean {
    return consultationQueue.startConsultation(requestId);
  },
  
  /**
   * End the consultation
   */
  endCall(requestId: string, data?: {
    diagnosis?: string;
    prescription?: object;
    followUpRecommended?: boolean;
    doctorNotes?: string;
  }): boolean {
    return consultationQueue.completeConsultation(requestId, data);
  },
  
  /**
   * Cancel a request
   */
  cancel(requestId: string): boolean {
    return consultationQueue.cancelRequest(requestId);
  },
  
  /**
   * Get consultation request status
   */
  getStatus(requestId: string): ConsultationRequest | undefined {
    return consultationQueue.getRequest(requestId);
  },
  
  /**
   * Get video room URL for a participant
   */
  getVideoUrl(requestId: string, role: 'patient' | 'doctor', displayName: string): string | null {
    try {
      return videoService.getParticipantUrl(requestId, role, displayName);
    } catch {
      return null;
    }
  },
  
  /**
   * Get available doctors
   */
  getAvailableDoctors(): any[] {
    return smartMatchingService.getAvailableDoctors();
  },
  
  /**
   * Get queue statistics
   */
  getQueueStats(): QueueStats {
    return consultationQueue.getQueueStats();
  },
  
  /**
   * Get doctor availability stats
   */
  getDoctorStats(): ReturnType<typeof smartMatchingService.getAvailabilityStats> {
    return smartMatchingService.getAvailabilityStats();
  },
  
  /**
   * Update doctor status
   */
  updateDoctorStatus(doctorId: string, status: 'available' | 'busy' | 'offline'): boolean {
    return smartMatchingService.updateDoctorStatus(doctorId, status);
  },
  
  /**
   * Doctor heartbeat
   */
  doctorHeartbeat(doctorId: string): boolean {
    return smartMatchingService.doctorHeartbeat(doctorId);
  },
  
  /**
   * Find best doctors for criteria (for UI display)
   */
  findDoctors(params: {
    specialty?: string;
    language?: string;
    urgency?: UrgencyLevel;
    limit?: number;
  }): MatchResult[] {
    return smartMatchingService.findBestDoctors({
      specialty: params.specialty,
      language: params.language,
      urgency: params.urgency || 'routine'
    }, params.limit || 5);
  }
};

// Default export
export default instantConnectAPI;
