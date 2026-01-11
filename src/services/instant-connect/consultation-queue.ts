/**
 * Consultation Queue Manager for Instant Connect
 * SelectCareOS™ - World-Class Instant Doctor Connection
 * 
 * Manages the queue of patients waiting for doctor matches
 */

import type {
  ConsultationRequest,
  ConsultationStatus,
  QueueEntry,
  QueueStats,
  UrgencyLevel,
  VideoProvider,
  MatchResult
} from './types';
import { smartMatchingService } from './smart-matching';
import { videoService } from './video-service';

// ============================================================================
// QUEUE CONFIGURATION
// ============================================================================

const QUEUE_CONFIG = {
  // Maximum time a request can wait in queue (15 minutes)
  MAX_QUEUE_TIME_MS: 15 * 60 * 1000,
  
  // Time to wait for doctor acceptance (60 seconds)
  ACCEPTANCE_TIMEOUT_MS: 60 * 1000,
  
  // Interval to check for expired requests (5 seconds)
  CLEANUP_INTERVAL_MS: 5 * 1000,
  
  // Maximum match attempts before giving up
  MAX_MATCH_ATTEMPTS: 5,
  
  // Priority multipliers by urgency
  URGENCY_PRIORITY: {
    emergency: 1000,
    urgent: 500,
    routine: 100
  } as Record<UrgencyLevel, number>
};

// ============================================================================
// CONSULTATION QUEUE MANAGER
// ============================================================================

export class ConsultationQueueManager {
  private requests: Map<string, ConsultationRequest> = new Map();
  private queue: Map<string, QueueEntry> = new Map();
  // Note: In Cloudflare Workers, we can't use setInterval in global scope
  // Cleanup will be triggered on each request instead
  
  constructor() {
    // No interval in Cloudflare Workers - cleanup happens on demand
  }
  
  /**
   * Create a new consultation request and add to queue
   */
  createRequest(params: {
    patientId: string;
    patientName: string;
    preferredSpecialty?: string;
    preferredLanguage?: string;
    urgency: UrgencyLevel;
    symptoms?: string[];
    symptomDescription?: string;
  }): ConsultationRequest {
    const now = new Date();
    const requestId = this.generateId();
    
    const request: ConsultationRequest = {
      id: requestId,
      patientId: params.patientId,
      status: 'pending',
      preferredSpecialty: params.preferredSpecialty,
      preferredLanguage: params.preferredLanguage,
      urgency: params.urgency,
      symptoms: params.symptoms || [],
      symptomDescription: params.symptomDescription,
      matchScore: 0,
      requestedAt: now,
      videoProvider: 'jitsi', // Free, no API key needed
      consultationFeeCents: 5000, // €50 default
      paymentStatus: 'pending',
      connectionIssues: false,
      followUpRecommended: false,
      requeueCount: 0,
      previousDoctorIds: [],
      createdAt: now,
      updatedAt: now
    };
    
    this.requests.set(requestId, request);
    
    // Clean up expired requests (on-demand cleanup for Cloudflare Workers)
    this.cleanupExpiredRequests();
    
    // Add to queue
    this.addToQueue(request);
    
    // Attempt immediate match
    this.attemptMatch(requestId);
    
    return request;
  }
  
  /**
   * Add request to priority queue
   */
  private addToQueue(request: ConsultationRequest): QueueEntry {
    const now = new Date();
    const priority = this.calculatePriority(request);
    
    const queueEntry: QueueEntry = {
      id: this.generateId(),
      requestId: request.id,
      priority,
      queuedAt: now,
      estimatedWaitSeconds: this.estimateWaitTime(),
      matchAttempts: 0,
      excludedDoctorIds: [],
      expiresAt: new Date(now.getTime() + QUEUE_CONFIG.MAX_QUEUE_TIME_MS)
    };
    
    this.queue.set(request.id, queueEntry);
    
    console.log(`[Queue] Added request ${request.id} with priority ${priority}`);
    
    return queueEntry;
  }
  
  /**
   * Calculate priority score for a request
   */
  private calculatePriority(request: ConsultationRequest): number {
    let priority = QUEUE_CONFIG.URGENCY_PRIORITY[request.urgency];
    
    // Add time-based priority (older requests get higher priority)
    const waitTimeMs = Date.now() - request.requestedAt.getTime();
    const waitMinutes = waitTimeMs / (60 * 1000);
    priority += Math.floor(waitMinutes * 10);
    
    return priority;
  }
  
  /**
   * Estimate wait time based on queue and available doctors
   */
  private estimateWaitTime(): number {
    const stats = smartMatchingService.getAvailabilityStats();
    const queueSize = this.queue.size;
    
    if (stats.availableDoctors === 0) {
      return 300; // 5 minutes if no doctors available
    }
    
    // Base: average response time
    let estimate = stats.avgResponseTime;
    
    // Add time for queue ahead
    estimate += (queueSize / stats.availableDoctors) * 60;
    
    return Math.min(estimate, 600); // Cap at 10 minutes
  }
  
  /**
   * Attempt to match a request with a doctor
   */
  attemptMatch(requestId: string): MatchResult | null {
    const request = this.requests.get(requestId);
    const queueEntry = this.queue.get(requestId);
    
    if (!request || !queueEntry) {
      console.log(`[Queue] Request ${requestId} not found`);
      return null;
    }
    
    if (request.status !== 'pending') {
      console.log(`[Queue] Request ${requestId} is not pending (${request.status})`);
      return null;
    }
    
    // Increment match attempts
    queueEntry.matchAttempts++;
    queueEntry.lastMatchAttempt = new Date();
    
    // Check max attempts
    if (queueEntry.matchAttempts > QUEUE_CONFIG.MAX_MATCH_ATTEMPTS) {
      console.log(`[Queue] Max match attempts reached for ${requestId}`);
      return null;
    }
    
    // Find best doctor
    const match = smartMatchingService.quickMatch({
      specialty: request.preferredSpecialty,
      language: request.preferredLanguage,
      urgency: request.urgency,
      excludedDoctorIds: [...request.previousDoctorIds, ...queueEntry.excludedDoctorIds]
    });
    
    if (!match) {
      console.log(`[Queue] No matching doctor found for ${requestId}`);
      return null;
    }
    
    // Update request with match
    request.doctorId = match.doctorId;
    request.status = 'matched';
    request.matchedAt = new Date();
    request.matchScore = match.matchScore;
    request.matchReason = match.reasons.join('; ');
    request.updatedAt = new Date();
    
    // Update doctor status
    smartMatchingService.updateDoctorStatus(match.doctorId, 'busy');
    
    // Create video room
    const videoRoom = videoService.createRoom(requestId);
    request.videoRoomId = videoRoom.roomId;
    request.videoRoomUrl = videoRoom.roomUrl;
    request.videoRoomTokenPatient = videoRoom.patientToken;
    request.videoRoomTokenDoctor = videoRoom.doctorToken;
    
    console.log(`[Queue] Matched request ${requestId} with doctor ${match.doctorId}`);
    
    // Note: In Cloudflare Workers, we can't use setTimeout
    // Timeout is checked during getRequest() and other operations
    // Store the timeout deadline in the queue entry
    const queueEntryForTimeout = this.queue.get(requestId);
    if (queueEntryForTimeout) {
      queueEntryForTimeout.expiresAt = new Date(Date.now() + QUEUE_CONFIG.ACCEPTANCE_TIMEOUT_MS);
    }
    
    return match;
  }
  
  /**
   * Handle doctor acceptance timeout
   */
  private handleAcceptanceTimeout(requestId: string): void {
    const request = this.requests.get(requestId);
    
    if (!request || request.status !== 'matched') {
      return; // Already handled
    }
    
    console.log(`[Queue] Acceptance timeout for ${requestId}`);
    
    // Mark as expired and requeue
    const previousDoctorId = request.doctorId;
    if (previousDoctorId) {
      request.previousDoctorIds.push(previousDoctorId);
      smartMatchingService.updateDoctorStatus(previousDoctorId, 'available');
    }
    
    request.status = 'pending';
    request.doctorId = undefined;
    request.matchedAt = undefined;
    request.requeueCount++;
    request.updatedAt = new Date();
    
    // Add to excluded list
    const queueEntry = this.queue.get(requestId);
    if (queueEntry && previousDoctorId) {
      queueEntry.excludedDoctorIds.push(previousDoctorId);
    }
    
    // Try matching again
    this.attemptMatch(requestId);
  }
  
  /**
   * Doctor accepts a consultation request
   */
  doctorAccept(requestId: string, doctorId: string): boolean {
    const request = this.requests.get(requestId);
    
    if (!request) {
      console.log(`[Queue] Request ${requestId} not found`);
      return false;
    }
    
    if (request.status !== 'matched' || request.doctorId !== doctorId) {
      console.log(`[Queue] Invalid accept for ${requestId}`);
      return false;
    }
    
    request.status = 'accepted';
    request.acceptedAt = new Date();
    request.updatedAt = new Date();
    
    // Update doctor status
    smartMatchingService.updateDoctorStatus(doctorId, 'in_call');
    
    // Remove from queue
    this.queue.delete(requestId);
    
    // Record the match
    smartMatchingService.recordMatch(request.patientId, doctorId);
    
    console.log(`[Queue] Doctor ${doctorId} accepted request ${requestId}`);
    
    return true;
  }
  
  /**
   * Doctor declines a consultation request
   */
  doctorDecline(requestId: string, doctorId: string): boolean {
    const request = this.requests.get(requestId);
    
    if (!request || request.doctorId !== doctorId) {
      return false;
    }
    
    request.previousDoctorIds.push(doctorId);
    request.status = 'pending';
    request.doctorId = undefined;
    request.declinedAt = new Date();
    request.requeueCount++;
    request.updatedAt = new Date();
    
    // Update doctor status back to available
    smartMatchingService.updateDoctorStatus(doctorId, 'available');
    
    // Try matching with another doctor
    this.attemptMatch(requestId);
    
    console.log(`[Queue] Doctor ${doctorId} declined request ${requestId}`);
    
    return true;
  }
  
  /**
   * Start a consultation (video call begins)
   */
  startConsultation(requestId: string): boolean {
    const request = this.requests.get(requestId);
    
    if (!request || request.status !== 'accepted') {
      return false;
    }
    
    request.status = 'in_progress';
    request.startedAt = new Date();
    request.waitTimeSeconds = Math.round(
      (request.startedAt.getTime() - request.requestedAt.getTime()) / 1000
    );
    request.updatedAt = new Date();
    
    console.log(`[Queue] Consultation ${requestId} started (wait: ${request.waitTimeSeconds}s)`);
    
    return true;
  }
  
  /**
   * Complete a consultation
   */
  completeConsultation(requestId: string, data?: {
    diagnosis?: string;
    prescription?: object;
    followUpRecommended?: boolean;
    followUpDate?: Date;
    doctorNotes?: string;
  }): boolean {
    const request = this.requests.get(requestId);
    
    if (!request || request.status !== 'in_progress') {
      return false;
    }
    
    const now = new Date();
    request.status = 'completed';
    request.completedAt = now;
    request.callDurationSeconds = request.startedAt 
      ? Math.round((now.getTime() - request.startedAt.getTime()) / 1000)
      : 0;
    
    if (data) {
      request.diagnosis = data.diagnosis;
      request.prescription = data.prescription;
      request.followUpRecommended = data.followUpRecommended || false;
      request.followUpDate = data.followUpDate;
      request.doctorNotes = data.doctorNotes;
    }
    
    request.updatedAt = now;
    
    // Update doctor status
    if (request.doctorId) {
      smartMatchingService.updateDoctorStatus(request.doctorId, 'available');
    }
    
    console.log(`[Queue] Consultation ${requestId} completed (duration: ${request.callDurationSeconds}s)`);
    
    return true;
  }
  
  /**
   * Cancel a consultation request
   */
  cancelRequest(requestId: string): boolean {
    const request = this.requests.get(requestId);
    
    if (!request || ['completed', 'cancelled'].includes(request.status)) {
      return false;
    }
    
    // Free up doctor if matched
    if (request.doctorId) {
      smartMatchingService.updateDoctorStatus(request.doctorId, 'available');
    }
    
    request.status = 'cancelled';
    request.cancelledAt = new Date();
    request.updatedAt = new Date();
    
    // Remove from queue
    this.queue.delete(requestId);
    
    console.log(`[Queue] Request ${requestId} cancelled`);
    
    return true;
  }
  
  /**
   * Get request by ID
   * Also checks for acceptance timeout (for Cloudflare Workers compatibility)
   */
  getRequest(requestId: string): ConsultationRequest | undefined {
    const request = this.requests.get(requestId);
    
    // Check for acceptance timeout for matched requests
    if (request && request.status === 'matched') {
      const queueEntry = this.queue.get(requestId);
      if (queueEntry && queueEntry.expiresAt < new Date()) {
        // Timeout expired - handle it
        this.handleAcceptanceTimeout(requestId);
      }
    }
    
    // Run cleanup while we're at it
    this.cleanupExpiredRequests();
    
    return this.requests.get(requestId);
  }
  
  /**
   * Get queue position for a request
   */
  getQueuePosition(requestId: string): number {
    const entries = Array.from(this.queue.values())
      .sort((a, b) => b.priority - a.priority);
    
    const index = entries.findIndex(e => e.requestId === requestId);
    return index === -1 ? -1 : index + 1;
  }
  
  /**
   * Get queue statistics
   */
  getQueueStats(): QueueStats {
    const entries = Array.from(this.queue.values());
    const doctorStats = smartMatchingService.getAvailabilityStats();
    
    const waitTimes = entries.map(e => 
      (Date.now() - e.queuedAt.getTime()) / 1000
    );
    
    const avgWait = waitTimes.length > 0 
      ? waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length 
      : 0;
    
    const longestWait = waitTimes.length > 0 
      ? Math.max(...waitTimes) 
      : 0;
    
    return {
      totalInQueue: entries.length,
      avgWaitTimeSeconds: Math.round(avgWait),
      longestWaitSeconds: Math.round(longestWait),
      doctorsAvailable: doctorStats.availableDoctors,
      doctorsBusy: doctorStats.busyDoctors,
      estimatedNextMatchSeconds: this.estimateWaitTime()
    };
  }
  
  /**
   * Note: In Cloudflare Workers, we can't use setInterval
   * Cleanup is triggered on-demand during other operations
   */
  
  /**
   * Clean up expired requests
   */
  private cleanupExpiredRequests(): void {
    const now = new Date();
    
    for (const [requestId, entry] of this.queue) {
      if (entry.expiresAt < now) {
        const request = this.requests.get(requestId);
        if (request && request.status === 'pending') {
          request.status = 'expired';
          request.updatedAt = now;
          this.queue.delete(requestId);
          console.log(`[Queue] Request ${requestId} expired`);
        }
      }
    }
  }
  
  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Stop the queue manager (no-op in Cloudflare Workers)
   */
  stop(): void {
    // No interval to clear in Cloudflare Workers
  }
}

// Export singleton instance
export const consultationQueue = new ConsultationQueueManager();
