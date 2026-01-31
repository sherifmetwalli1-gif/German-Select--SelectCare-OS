/**
 * MediSense AI Pro™ - API Routes
 * World-Class Intelligent Symptom Analyzer API
 * 
 * Endpoints:
 * - POST /api/medisense-pro/analyze - Main symptom analysis
 * - GET /api/medisense-pro/symptoms - Get all symptoms
 * - GET /api/medisense-pro/symptoms/:categoryId - Get symptoms by category
 * - GET /api/medisense-pro/conditions - Get all conditions
 * - GET /api/medisense-pro/conditions/:id - Get condition details
 * - GET /api/medisense-pro/medications - Get medications
 * - POST /api/medisense-pro/drug-check - Check drug interactions
 * - GET /api/medisense-pro/stats - Get system statistics
 */

import { Hono } from 'hono'
import { logger } from '../utils/logger'
import { SYMPTOM_DATABASE, getTotalSymptomCount, getAllSymptoms, searchSymptoms } from '../services/medisense-pro'
import { CONDITIONS_DATABASE, ALL_CONDITIONS_DATABASE, getTotalConditionCount, getConditionsByUrgency, getConditionsByCategory, CONDITION_PREVALENCE_WEIGHTS } from '../services/conditions-database'
import { MEDICATIONS_DATABASE, checkDrugInteractions, checkMedicationWarnings, searchMedications } from '../services/drug-interactions'
import { MediSenseAnalyzer, MEDISENSE_STATS, getSymptomCategories, getUrgencyLevelInfo, SymptomInput, PatientProfile } from '../services/medisense-analyzer'
import { SupportedLanguage } from '../services/medisense-i18n'

const medisenseApiRouter = new Hono()

// ============================================================================
// MAIN ANALYSIS ENDPOINT
// ============================================================================

/**
 * POST /api/medisense-pro/analyze
 * Main symptom analysis endpoint
 */
medisenseApiRouter.post('/analyze', async (c) => {
  try {
    const body = await c.req.json()
    const { symptoms, profile, language = 'en' } = body as {
      symptoms: SymptomInput[]
      profile: PatientProfile
      language?: SupportedLanguage
    }
    
    // Validate input
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return c.json({
        error: 'Invalid input',
        message: 'At least one symptom is required'
      }, 400)
    }
    
    if (!profile || typeof profile.age !== 'number') {
      return c.json({
        error: 'Invalid input',
        message: 'Patient profile with age is required'
      }, 400)
    }
    
    // Ensure profile has all required fields with defaults
    const completeProfile: PatientProfile = {
      age: profile.age,
      gender: profile.gender || 'other',
      preExistingConditions: profile.preExistingConditions || [],
      currentMedications: profile.currentMedications || [],
      allergies: profile.allergies || [],
      familyHistory: profile.familyHistory || [],
      lifestyle: {
        smoking: profile.lifestyle?.smoking || false,
        alcohol: profile.lifestyle?.alcohol || 'none',
        exercise: profile.lifestyle?.exercise || 'moderate',
        diet: profile.lifestyle?.diet || 'average'
      },
      language: language as SupportedLanguage
    }
    
    // Ensure symptoms have all required fields with defaults
    const completeSymptoms: SymptomInput[] = symptoms.map(s => ({
      id: s.id,
      severity: s.severity || 'moderate',
      duration: s.duration || 'days',
      onset: s.onset || 'gradual',
      frequency: s.frequency || 'intermittent'
    }))
    
    // Run analysis
    const analyzer = new MediSenseAnalyzer(language)
    const result = analyzer.analyze(completeSymptoms, completeProfile)
    
    return c.json(result)
    
  } catch (error) {
    logger.error('Analysis error:', error)
    return c.json({
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// ============================================================================
// SYMPTOM ENDPOINTS
// ============================================================================

/**
 * GET /api/medisense-pro/symptoms
 * Get all symptoms or search
 */
medisenseApiRouter.get('/symptoms', (c) => {
  const query = c.req.query('q')
  const language = c.req.query('lang') || 'en'
  
  if (query) {
    const results = searchSymptoms(query, language)
    return c.json({
      query,
      count: results.length,
      symptoms: results
    })
  }
  
  return c.json({
    totalCount: getTotalSymptomCount(),
    categories: getSymptomCategories(),
    database: SYMPTOM_DATABASE
  })
})

/**
 * GET /api/medisense-pro/symptoms/:categoryId
 * Get symptoms by category
 */
medisenseApiRouter.get('/symptoms/:categoryId', (c) => {
  const categoryId = c.req.param('categoryId')
  const category = SYMPTOM_DATABASE[categoryId as keyof typeof SYMPTOM_DATABASE]
  
  if (!category) {
    return c.json({
      error: 'Category not found',
      message: `No category found with ID: ${categoryId}`
    }, 404)
  }
  
  return c.json({
    category: {
      id: category.id,
      name: category.name,
      nameAr: category.nameAr,
      nameDe: category.nameDe,
      nameFr: category.nameFr,
      icon: category.icon,
      color: category.color,
      bodyRegion: category.bodyRegion
    },
    symptoms: category.symptoms,
    count: category.symptoms.length
  })
})

/**
 * GET /api/medisense-pro/symptom/:id
 * Get single symptom details
 */
medisenseApiRouter.get('/symptom/:id', (c) => {
  const symptomId = c.req.param('id')
  
  for (const category of Object.values(SYMPTOM_DATABASE)) {
    const symptom = category.symptoms.find((s: any) => s.id === symptomId)
    if (symptom) {
      return c.json({
        symptom,
        category: {
          id: category.id,
          name: category.name,
          color: category.color
        }
      })
    }
  }
  
  return c.json({
    error: 'Symptom not found',
    message: `No symptom found with ID: ${symptomId}`
  }, 404)
})

// ============================================================================
// CONDITION ENDPOINTS
// ============================================================================

/**
 * GET /api/medisense-pro/conditions
 * Get all conditions
 */
medisenseApiRouter.get('/conditions', (c) => {
  const urgency = c.req.query('urgency')
  const category = c.req.query('category')
  
  let conditions = Object.values(CONDITIONS_DATABASE)
  
  if (urgency) {
    conditions = conditions.filter(c => c.urgency === urgency)
  }
  
  if (category) {
    conditions = conditions.filter(c => c.category === category)
  }
  
  return c.json({
    totalCount: conditions.length,
    conditions: conditions.map(c => ({
      id: c.id,
      name: c.name,
      nameAr: c.nameAr,
      nameDe: c.nameDe,
      nameFr: c.nameFr,
      icd11: c.icd11,
      category: c.category,
      urgency: c.urgency,
      description: c.description
    }))
  })
})

/**
 * GET /api/medisense-pro/conditions/:id
 * Get condition details
 */
medisenseApiRouter.get('/conditions/:id', (c) => {
  const conditionId = c.req.param('id')
  const condition = CONDITIONS_DATABASE[conditionId]
  
  if (!condition) {
    return c.json({
      error: 'Condition not found',
      message: `No condition found with ID: ${conditionId}`
    }, 404)
  }
  
  return c.json(condition)
})

// ============================================================================
// MEDICATION ENDPOINTS
// ============================================================================

/**
 * GET /api/medisense-pro/medications
 * Get medications or search
 */
medisenseApiRouter.get('/medications', (c) => {
  const query = c.req.query('q')
  
  if (query) {
    const results = searchMedications(query)
    return c.json({
      query,
      count: results.length,
      medications: results.map(m => ({
        id: m.id,
        name: m.name,
        genericName: m.genericName,
        brandNames: m.brandNames,
        drugClass: m.drugClass,
        category: m.category
      }))
    })
  }
  
  return c.json({
    totalCount: Object.keys(MEDICATIONS_DATABASE).length,
    medications: Object.values(MEDICATIONS_DATABASE).map(m => ({
      id: m.id,
      name: m.name,
      genericName: m.genericName,
      brandNames: m.brandNames,
      drugClass: m.drugClass,
      category: m.category,
      commonUses: m.commonUses
    }))
  })
})

/**
 * GET /api/medisense-pro/medications/:id
 * Get medication details
 */
medisenseApiRouter.get('/medications/:id', (c) => {
  const medId = c.req.param('id')
  const medication = MEDICATIONS_DATABASE[medId]
  
  if (!medication) {
    return c.json({
      error: 'Medication not found',
      message: `No medication found with ID: ${medId}`
    }, 404)
  }
  
  return c.json(medication)
})

/**
 * POST /api/medisense-pro/drug-check
 * Check drug interactions
 */
medisenseApiRouter.post('/drug-check', async (c) => {
  try {
    const body = await c.req.json()
    const { medications, symptoms } = body as {
      medications: string[]
      symptoms?: string[]
    }
    
    if (!medications || !Array.isArray(medications)) {
      return c.json({
        error: 'Invalid input',
        message: 'Medications array is required'
      }, 400)
    }
    
    const interactions = checkDrugInteractions(medications)
    const warnings = symptoms ? checkMedicationWarnings(medications, symptoms) : []
    
    return c.json({
      interactions,
      warnings,
      totalInteractions: interactions.length,
      majorInteractions: interactions.filter(i => i.severity === 'major').length,
      moderateInteractions: interactions.filter(i => i.severity === 'moderate').length
    })
    
  } catch (error) {
    return c.json({
      error: 'Drug check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// ============================================================================
// SYSTEM ENDPOINTS
// ============================================================================

/**
 * GET /api/medisense-pro/stats
 * Get system statistics - Enhanced v4.0 with Bayesian features
 */
medisenseApiRouter.get('/stats', (c) => {
  // Count conditions by urgency
  const conditionsByUrgency = {
    emergency: Object.values(ALL_CONDITIONS_DATABASE).filter(c => c.urgency === 'emergency').length,
    urgent: Object.values(ALL_CONDITIONS_DATABASE).filter(c => c.urgency === 'urgent').length,
    routine: Object.values(ALL_CONDITIONS_DATABASE).filter(c => c.urgency === 'routine').length,
    'self-care': Object.values(ALL_CONDITIONS_DATABASE).filter(c => c.urgency === 'self-care').length
  }
  
  return c.json({
    ...MEDISENSE_STATS,
    urgencyLevels: getUrgencyLevelInfo(),
    categories: getSymptomCategories().map(cat => ({
      id: cat.id,
      name: cat.name,
      symptomCount: cat.symptomCount
    })),
    conditionCategories: [...new Set(Object.values(ALL_CONDITIONS_DATABASE).map(c => c.category))],
    medicationCategories: [...new Set(Object.values(MEDICATIONS_DATABASE).map(m => m.category))],
    conditionsByUrgency,
    prevalenceDataConditions: Object.keys(CONDITION_PREVALENCE_WEIGHTS).length,
    algorithmFeatures: {
      bayesianProbabilityScoring: 'Uses prevalence-based prior probabilities and likelihood ratios',
      diagnosticValueWeighting: 'Symptoms with high LR+ get additional weight',
      fuzzySymptomMatching: 'Related symptoms are matched via synonym mapping',
      riskFactorAnalysis: 'Enhanced family history and lifestyle risk assessment',
      emergencyDetection: 'Critical symptom combinations trigger emergency alerts'
    }
  })
})

/**
 * GET /api/medisense-pro/health
 * Health check endpoint
 */
medisenseApiRouter.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    service: 'MediSense AI Pro',
    version: MEDISENSE_STATS.algorithmVersion,
    timestamp: new Date().toISOString()
  })
})

export default medisenseApiRouter
