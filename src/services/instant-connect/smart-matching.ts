/**
 * Smart Matching Service for Instant Connect Telemedicine
 * SelectCareOS™ - World-Class Instant Doctor Connection
 * 
 * Goal: Match patients to doctors in <500ms with optimal scoring
 */

import type { 
  InstantDoctor, 
  MatchResult, 
  MatchingCriteria, 
  UrgencyLevel 
} from './types';

// ============================================================================
// MATCHING ALGORITHM WEIGHTS
// ============================================================================

const MATCH_WEIGHTS = {
  // Base score for any available doctor
  BASE_SCORE: 100,
  
  // Specialty match bonus (exact match)
  SPECIALTY_EXACT: 50,
  // Specialty partial match (subspecialty contains keyword)
  SPECIALTY_PARTIAL: 25,
  
  // Language match bonus
  LANGUAGE_MATCH: 30,
  
  // Response time bonus (max 60 points for <30s avg)
  FAST_RESPONSE_MAX: 60,
  FAST_RESPONSE_THRESHOLD: 30, // seconds
  
  // Rating bonus (rating * 10, max 50 for 5.0)
  RATING_MULTIPLIER: 10,
  
  // Acceptance rate bonus (rate / 5, max 20 for 100%)
  ACCEPTANCE_RATE_DIVISOR: 5,
  
  // Urgency priority (emergency gets priority boost)
  EMERGENCY_PRIORITY: 100,
  URGENT_PRIORITY: 50,
  
  // Experience bonus
  EXPERIENCE_BONUS_PER_YEAR: 2,
  EXPERIENCE_MAX_BONUS: 30,
  
  // Low queue bonus (doctor with fewer current patients)
  LOW_QUEUE_BONUS: 20,
  
  // Recent activity bonus (active in last 5 minutes)
  RECENT_ACTIVITY_BONUS: 15,
};

// ============================================================================
// SMART MATCHING SERVICE
// ============================================================================

export class SmartMatchingService {
  private doctors: Map<string, InstantDoctor> = new Map();
  private matchHistory: Map<string, { doctorId: string; timestamp: Date }[]> = new Map();
  
  constructor() {}
  
  /**
   * Register a doctor for instant connect
   */
  registerDoctor(doctor: InstantDoctor): void {
    this.doctors.set(doctor.id, doctor);
  }
  
  /**
   * Update doctor status
   */
  updateDoctorStatus(doctorId: string, status: InstantDoctor['status']): boolean {
    const doctor = this.doctors.get(doctorId);
    if (!doctor) return false;
    
    doctor.status = status;
    doctor.lastSeen = new Date();
    doctor.lastHeartbeat = new Date();
    doctor.updatedAt = new Date();
    
    return true;
  }
  
  /**
   * Doctor heartbeat - keep alive signal
   */
  doctorHeartbeat(doctorId: string): boolean {
    const doctor = this.doctors.get(doctorId);
    if (!doctor) return false;
    
    doctor.lastHeartbeat = new Date();
    return true;
  }
  
  /**
   * Get all available doctors
   * Note: In demo mode, we relax the heartbeat requirement to show doctors
   */
  getAvailableDoctors(): InstantDoctor[] {
    const now = new Date();
    const heartbeatThreshold = 24 * 60 * 60 * 1000; // 24 hours for demo (production: 60 seconds)
    
    return Array.from(this.doctors.values()).filter(doctor => 
      doctor.status === 'available' &&
      doctor.instantConnectEnabled &&
      (now.getTime() - doctor.lastHeartbeat.getTime()) < heartbeatThreshold
    );
  }
  
  /**
   * CORE: Find best matching doctor(s) for a patient
   * Target: <500ms response time
   */
  findBestDoctors(criteria: MatchingCriteria, limit: number = 5): MatchResult[] {
    const startTime = performance.now();
    
    // Get all available doctors
    const availableDoctors = this.getAvailableDoctors();
    
    // Filter out excluded doctors
    const eligibleDoctors = availableDoctors.filter(
      doctor => !criteria.excludedDoctorIds?.includes(doctor.id)
    );
    
    // Score each doctor
    const scoredDoctors = eligibleDoctors.map(doctor => ({
      doctor,
      ...this.calculateMatchScore(doctor, criteria)
    }));
    
    // Sort by score (descending), then by response time (ascending)
    scoredDoctors.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.doctor.avgResponseTimeSeconds - b.doctor.avgResponseTimeSeconds;
    });
    
    // Take top N doctors
    const topDoctors = scoredDoctors.slice(0, limit);
    
    const matchTime = performance.now() - startTime;
    console.log(`[SmartMatching] Found ${topDoctors.length} doctors in ${matchTime.toFixed(2)}ms`);
    
    return topDoctors.map(({ doctor, score, reasons }) => ({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      matchScore: score,
      estimatedResponseSeconds: doctor.avgResponseTimeSeconds,
      reasons
    }));
  }
  
  /**
   * Calculate match score for a doctor
   */
  private calculateMatchScore(
    doctor: InstantDoctor, 
    criteria: MatchingCriteria
  ): { score: number; reasons: string[] } {
    let score = MATCH_WEIGHTS.BASE_SCORE;
    const reasons: string[] = ['Base availability'];
    
    // 1. Specialty Match
    if (criteria.specialty) {
      const specialtyLower = criteria.specialty.toLowerCase();
      if (doctor.specialty.toLowerCase() === specialtyLower) {
        score += MATCH_WEIGHTS.SPECIALTY_EXACT;
        reasons.push(`Exact specialty match: ${doctor.specialty}`);
      } else if (
        doctor.specialty.toLowerCase().includes(specialtyLower) ||
        doctor.subspecialties.some(s => s.toLowerCase().includes(specialtyLower))
      ) {
        score += MATCH_WEIGHTS.SPECIALTY_PARTIAL;
        reasons.push(`Related specialty: ${doctor.specialty}`);
      }
    }
    
    // 2. Language Match
    if (criteria.language) {
      const langLower = criteria.language.toLowerCase();
      if (doctor.languages.some(l => l.toLowerCase() === langLower || 
          l.toLowerCase().startsWith(langLower.substring(0, 2)))) {
        score += MATCH_WEIGHTS.LANGUAGE_MATCH;
        reasons.push(`Language match: ${criteria.language}`);
      }
    }
    
    // 3. Response Time Bonus
    if (doctor.avgResponseTimeSeconds < MATCH_WEIGHTS.FAST_RESPONSE_THRESHOLD) {
      const responseBonus = Math.max(
        0, 
        MATCH_WEIGHTS.FAST_RESPONSE_MAX - doctor.avgResponseTimeSeconds
      );
      score += responseBonus;
      reasons.push(`Fast responder: ${doctor.avgResponseTimeSeconds}s avg`);
    }
    
    // 4. Rating Bonus
    const ratingBonus = Math.round(doctor.rating * MATCH_WEIGHTS.RATING_MULTIPLIER);
    score += ratingBonus;
    reasons.push(`Rating: ${doctor.rating}/5`);
    
    // 5. Acceptance Rate Bonus
    const acceptanceBonus = Math.round(doctor.acceptanceRate / MATCH_WEIGHTS.ACCEPTANCE_RATE_DIVISOR);
    score += acceptanceBonus;
    if (doctor.acceptanceRate >= 95) {
      reasons.push(`High acceptance: ${doctor.acceptanceRate}%`);
    }
    
    // 6. Urgency Priority
    if (criteria.urgency === 'emergency') {
      score += MATCH_WEIGHTS.EMERGENCY_PRIORITY;
      reasons.push('Emergency priority boost');
    } else if (criteria.urgency === 'urgent') {
      score += MATCH_WEIGHTS.URGENT_PRIORITY;
      reasons.push('Urgent priority boost');
    }
    
    // 7. Recent Activity Bonus
    const now = new Date();
    const fiveMinutesAgo = now.getTime() - (5 * 60 * 1000);
    if (doctor.lastHeartbeat.getTime() > fiveMinutesAgo) {
      score += MATCH_WEIGHTS.RECENT_ACTIVITY_BONUS;
      reasons.push('Recently active');
    }
    
    return { score, reasons };
  }
  
  /**
   * Quick match - get the single best doctor immediately
   */
  quickMatch(criteria: MatchingCriteria): MatchResult | null {
    const results = this.findBestDoctors(criteria, 1);
    return results.length > 0 ? results[0] : null;
  }
  
  /**
   * Record a successful match for analytics
   */
  recordMatch(patientId: string, doctorId: string): void {
    const history = this.matchHistory.get(patientId) || [];
    history.push({ doctorId, timestamp: new Date() });
    this.matchHistory.set(patientId, history);
  }
  
  /**
   * Get statistics about available doctors
   */
  getAvailabilityStats(): {
    totalDoctors: number;
    availableDoctors: number;
    busyDoctors: number;
    offlineDoctors: number;
    avgResponseTime: number;
    avgRating: number;
  } {
    const allDoctors = Array.from(this.doctors.values());
    const available = allDoctors.filter(d => d.status === 'available');
    const busy = allDoctors.filter(d => d.status === 'busy' || d.status === 'in_call');
    const offline = allDoctors.filter(d => d.status === 'offline');
    
    const avgResponseTime = available.length > 0
      ? available.reduce((sum, d) => sum + d.avgResponseTimeSeconds, 0) / available.length
      : 0;
    
    const avgRating = available.length > 0
      ? available.reduce((sum, d) => sum + d.rating, 0) / available.length
      : 0;
    
    return {
      totalDoctors: allDoctors.length,
      availableDoctors: available.length,
      busyDoctors: busy.length,
      offlineDoctors: offline.length,
      avgResponseTime: Math.round(avgResponseTime),
      avgRating: Math.round(avgRating * 10) / 10
    };
  }
  
  /**
   * Get doctor by ID
   */
  getDoctor(doctorId: string): InstantDoctor | undefined {
    return this.doctors.get(doctorId);
  }
  
  /**
   * Initialize with seed doctors (from existing DOCTORS array)
   */
  initializeFromDoctors(doctors: any[]): void {
    doctors.forEach(doc => {
      const instantDoctor: InstantDoctor = {
        id: doc.id,
        externalDoctorId: doc.id,
        name: doc.name,
        specialty: doc.specialization || doc.specialty,
        subspecialties: doc.subspecialties || [],
        qualifications: doc.qualifications || [],
        licenseCountry: 'Germany',
        languages: doc.languages || ['German', 'English'],
        timezone: 'Europe/Berlin',
        location: doc.location || 'Germany / Hurghada',
        rating: doc.rating || 4.8,
        totalReviews: doc.total_reviews || 100,
        totalConsultations: doc.totalConsultations || 200,
        status: doc.available ? 'available' : 'offline',
        lastSeen: new Date(),
        lastHeartbeat: new Date(),
        avgResponseTimeSeconds: 30 + Math.floor(Math.random() * 30), // 30-60s
        acceptanceRate: 90 + Math.floor(Math.random() * 10), // 90-100%
        totalAccepted: Math.floor(Math.random() * 500),
        totalDeclined: Math.floor(Math.random() * 20),
        totalMissed: Math.floor(Math.random() * 10),
        instantConnectEnabled: true,
        maxQueueSize: 3,
        autoAcceptEnabled: false,
        consultationFeeCents: (doc.consultation_fee || 150) * 100,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.registerDoctor(instantDoctor);
    });
    
    console.log(`[SmartMatching] Initialized with ${this.doctors.size} doctors`);
  }
}

// Export singleton instance
export const smartMatchingService = new SmartMatchingService();
