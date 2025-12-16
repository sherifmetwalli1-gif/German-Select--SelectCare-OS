/**
 * AI Guardrails System
 * Medical AI safety, compliance, and disclaimer management
 * HIPAA-compliant AI interactions
 */

/**
 * Medical disclaimer that must accompany AI responses
 */
export const MEDICAL_DISCLAIMER = {
  short: 'AI-generated content. Not medical advice. Consult your healthcare provider.',
  medium: 'This information is AI-generated and for informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult your healthcare provider.',
  full: `IMPORTANT MEDICAL DISCLAIMER

This AI-generated content is provided for informational and educational purposes only. It is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment.

Key Points:
• This AI assistant is not a licensed healthcare provider
• Never disregard professional medical advice or delay seeking it because of information from this AI
• In case of emergency, call emergency services immediately
• Always verify information with your healthcare provider
• Individual health conditions require personalized medical assessment

The German Select platform and its AI features are designed to support, not replace, the patient-provider relationship.

By using this feature, you acknowledge these limitations.`
}

/**
 * Topics that AI should NOT provide advice on
 */
export const PROHIBITED_TOPICS = [
  'suicide',
  'self-harm',
  'drug abuse',
  'overdose',
  'illegal substances',
  'weapons',
  'violence',
  'terrorism',
  'child abuse',
  'sexual abuse'
]

/**
 * Topics requiring escalation to human
 */
export const ESCALATION_TOPICS = [
  'severe pain',
  'chest pain',
  'difficulty breathing',
  'stroke symptoms',
  'allergic reaction',
  'severe bleeding',
  'loss of consciousness',
  'pregnancy emergency',
  'mental health crisis',
  'medication interactions'
]

/**
 * Emergency keywords that should trigger immediate action
 */
export const EMERGENCY_KEYWORDS = [
  'heart attack',
  'stroke',
  'can\'t breathe',
  'choking',
  'severe allergic',
  'anaphylaxis',
  'overdose',
  'unconscious',
  'suicide',
  'want to die',
  'kill myself'
]

/**
 * Analyze user message for safety concerns
 */
export function analyzeMessageSafety(message: string): {
  safe: boolean
  reason?: string
  action: 'allow' | 'warn' | 'block' | 'escalate' | 'emergency'
  responseOverride?: string
} {
  const lowerMessage = message.toLowerCase()
  
  // Check for emergency keywords
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return {
        safe: false,
        reason: 'Emergency situation detected',
        action: 'emergency',
        responseOverride: getEmergencyResponse(keyword)
      }
    }
  }
  
  // Check for prohibited topics
  for (const topic of PROHIBITED_TOPICS) {
    if (lowerMessage.includes(topic)) {
      return {
        safe: false,
        reason: `Prohibited topic: ${topic}`,
        action: 'block',
        responseOverride: 'I\'m not able to provide information on this topic. If you\'re in distress, please contact emergency services or a crisis helpline.'
      }
    }
  }
  
  // Check for escalation topics
  for (const topic of ESCALATION_TOPICS) {
    if (lowerMessage.includes(topic)) {
      return {
        safe: true,
        reason: `Sensitive topic: ${topic}`,
        action: 'warn'
      }
    }
  }
  
  return { safe: true, action: 'allow' }
}

/**
 * Get emergency response based on keyword
 */
function getEmergencyResponse(keyword: string): string {
  const suicideKeywords = ['suicide', 'want to die', 'kill myself']
  
  if (suicideKeywords.some(k => keyword.includes(k))) {
    return `I'm concerned about what you've shared. Your safety is the top priority.

🆘 IMMEDIATE HELP AVAILABLE:

Germany: Telefonseelsorge
📞 0800 111 0 111 (24/7, kostenlos)
📞 0800 111 0 222 (24/7, kostenlos)

International:
📞 EU Emergency: 112
📞 Crisis Text Line: Text HOME to 741741

Please reach out to one of these services right now. You don't have to face this alone.

If you're in immediate danger, please call emergency services (112).`
  }
  
  return `⚠️ MEDICAL EMERGENCY DETECTED

This sounds like a medical emergency. Please take immediate action:

🚨 CALL EMERGENCY SERVICES NOW:
📞 Germany: 112
📞 Europe: 112
📞 Egypt: 123

While waiting for help:
• Stay calm
• Don't move the person if spinal injury is suspected
• If unconscious but breathing, place in recovery position
• If not breathing, begin CPR if trained

DO NOT rely on AI for emergency medical situations.`
}

/**
 * Add safety wrapper to AI response
 */
export function wrapAIResponse(response: string, context: {
  topic?: string
  confidence?: number
  sources?: string[]
}): {
  response: string
  disclaimer: string
  metadata: {
    aiGenerated: true
    timestamp: string
    confidence?: number
    sources?: string[]
    verified: false
  }
} {
  const hasUncertainty = response.toLowerCase().includes('may') ||
                         response.toLowerCase().includes('might') ||
                         response.toLowerCase().includes('could') ||
                         response.toLowerCase().includes('possibly')
  
  // Add uncertainty markers if not present
  let enhancedResponse = response
  
  if (!hasUncertainty && !response.includes('consult')) {
    enhancedResponse += '\n\nPlease consult with your healthcare provider for personalized advice.'
  }
  
  return {
    response: enhancedResponse,
    disclaimer: MEDICAL_DISCLAIMER.short,
    metadata: {
      aiGenerated: true,
      timestamp: new Date().toISOString(),
      confidence: context.confidence,
      sources: context.sources,
      verified: false
    }
  }
}

/**
 * Validate AI output for medical accuracy markers
 */
export function validateAIOutput(response: string): {
  valid: boolean
  issues: string[]
  suggestions: string[]
} {
  const issues: string[] = []
  const suggestions: string[] = []
  
  // Check for absolute medical claims
  const absolutePatterns = [
    /will cure/i,
    /guaranteed to/i,
    /100% effective/i,
    /always works/i,
    /never fails/i,
    /you definitely have/i,
    /you don't have/i
  ]
  
  for (const pattern of absolutePatterns) {
    if (pattern.test(response)) {
      issues.push('Contains absolute medical claim')
      suggestions.push('Use hedging language like "may", "might", "could help"')
    }
  }
  
  // Check for dosage recommendations
  if (/take \d+ (mg|ml|pills?|tablets?)/i.test(response)) {
    issues.push('Contains specific dosage recommendation')
    suggestions.push('Remove specific dosages; advise consulting healthcare provider')
  }
  
  // Check for diagnosis statements
  if (/you have|diagnosis is|this is/i.test(response) && /disease|condition|syndrome|disorder/i.test(response)) {
    issues.push('Contains diagnostic statement')
    suggestions.push('Reframe as "this could be" or "symptoms may suggest"')
  }
  
  return {
    valid: issues.length === 0,
    issues,
    suggestions
  }
}

/**
 * Rate limiting configuration for AI endpoints
 */
export const AI_RATE_LIMITS = {
  chatMessages: { perMinute: 20, perHour: 100 },
  documentAnalysis: { perMinute: 5, perHour: 20 },
  riskCalculation: { perMinute: 10, perHour: 50 },
  imageAnalysis: { perMinute: 3, perHour: 15 }
}

/**
 * Content moderation for AI inputs
 */
export function moderateContent(content: string): {
  approved: boolean
  reason?: string
  sanitized?: string
} {
  // Remove potential PII before sending to AI
  let sanitized = content
  
  // Remove email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]')
  
  // Remove phone numbers
  sanitized = sanitized.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE]')
  
  // Remove potential SSN/ID numbers
  sanitized = sanitized.replace(/\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g, '[ID]')
  
  // Remove credit card numbers
  sanitized = sanitized.replace(/\b\d{4}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}\b/g, '[CARD]')
  
  return {
    approved: true,
    sanitized
  }
}

/**
 * Audit log entry for AI interaction
 */
export interface AIAuditEntry {
  timestamp: string
  userId: string
  sessionId: string
  inputHash: string // Hash of input (no PII stored)
  outputHash: string // Hash of output
  model: string
  tokensUsed: number
  safetyCheck: {
    action: string
    reason?: string
  }
  disclaimerShown: boolean
}

/**
 * Create AI audit entry
 */
export async function createAIAuditEntry(data: Omit<AIAuditEntry, 'timestamp'>): Promise<AIAuditEntry> {
  return {
    ...data,
    timestamp: new Date().toISOString()
  }
}

/**
 * AI response templates for common medical queries
 */
export const AI_RESPONSE_TEMPLATES = {
  symptomInquiry: (symptoms: string) => `
Based on the symptoms you've described (${symptoms}), there are several possible explanations. However, I cannot provide a diagnosis.

**Important**: These symptoms could indicate various conditions. Please:
1. Document when symptoms started and any patterns you notice
2. Note any triggers or relieving factors
3. Schedule an appointment with your healthcare provider
4. Seek immediate care if symptoms worsen

Your German Select care team is available for telemedicine consultations if needed.
  `.trim(),

  medicationQuestion: (medication: string) => `
Regarding ${medication}:

I can provide general information, but for specific questions about your medication:
• Dosage: Consult your prescribing physician
• Side effects: Speak with your pharmacist or doctor
• Interactions: Your care team can review your medication list

Never change your medication without consulting your healthcare provider.

Would you like to schedule a telemedicine consultation to discuss this?
  `.trim(),

  emergencyRedirect: () => `
⚠️ This sounds urgent.

If this is a medical emergency:
📞 Call 112 (Germany/EU) immediately

For non-emergency concerns:
📱 Use our telemedicine feature to speak with a doctor
📅 Schedule an urgent appointment through the app

Your health and safety are our priority.
  `.trim()
}
