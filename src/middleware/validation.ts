/**
 * Input Validation Middleware
 * Validates and sanitizes request inputs
 */

import { escapeHtml, sanitizeNumber, sanitizeQueryParam } from '../utils/sanitize';

// Validate symptoms array
export function validateSymptoms(symptoms: any[]): { valid: boolean; error?: string; sanitized?: any[] } {
  if (!Array.isArray(symptoms)) {
    return { valid: false, error: 'Symptoms must be an array' };
  }
  
  if (symptoms.length === 0) {
    return { valid: false, error: 'At least one symptom is required' };
  }
  
  if (symptoms.length > 20) {
    return { valid: false, error: 'Maximum 20 symptoms allowed per analysis' };
  }
  
  const validSeverities = ['mild', 'moderate', 'severe', 'very-severe'];
  const validFrequencies = ['constant', 'intermittent', 'occasional'];
  const validOnsets = ['sudden', 'gradual'];
  
  const sanitized = symptoms.map(s => ({
    id: sanitizeQueryParam(s.id, 100),
    name: escapeHtml(s.name || '').slice(0, 200),
    severity: validSeverities.includes(s.severity) ? s.severity : 'moderate',
    duration: sanitizeQueryParam(s.duration, 50),
    frequency: validFrequencies.includes(s.frequency) ? s.frequency : 'intermittent',
    onset: validOnsets.includes(s.onset) ? s.onset : 'gradual',
    bodyRegion: s.bodyRegion ? sanitizeQueryParam(s.bodyRegion, 50) : undefined
  }));
  
  return { valid: true, sanitized };
}

// Validate patient profile
export function validatePatientProfile(patient: any): { valid: boolean; error?: string; sanitized?: any } {
  if (!patient) {
    return { valid: false, error: 'Patient profile is required' };
  }
  
  const age = sanitizeNumber(patient.age, 0, 120);
  if (age <= 0) {
    return { valid: false, error: 'Valid patient age is required (1-120)' };
  }
  
  const validGenders = ['male', 'female', 'other'];
  const gender = validGenders.includes(patient.gender) ? patient.gender : 'other';
  
  const validSmokingStatuses = ['never', 'former', 'current'];
  const validAlcoholLevels = ['none', 'moderate', 'heavy'];
  const validExerciseLevels = ['sedentary', 'light', 'moderate', 'active', 'very-active'];
  const validDietTypes = ['standard', 'vegetarian', 'vegan', 'keto', 'mediterranean'];
  
  const sanitized = {
    age,
    gender,
    preConditions: Array.isArray(patient.preConditions) 
      ? patient.preConditions.slice(0, 20).map((c: string) => sanitizeQueryParam(c, 100))
      : [],
    medications: Array.isArray(patient.medications)
      ? patient.medications.slice(0, 30).map((m: string) => sanitizeQueryParam(m, 100))
      : [],
    allergies: Array.isArray(patient.allergies)
      ? patient.allergies.slice(0, 20).map((a: string) => sanitizeQueryParam(a, 100))
      : [],
    familyHistory: Array.isArray(patient.familyHistory)
      ? patient.familyHistory.slice(0, 20).map((h: string) => sanitizeQueryParam(h, 100))
      : [],
    lifestyle: {
      smoking: validSmokingStatuses.includes(patient.lifestyle?.smoking) 
        ? patient.lifestyle.smoking : 'never',
      alcohol: validAlcoholLevels.includes(patient.lifestyle?.alcohol)
        ? patient.lifestyle.alcohol : 'none',
      exercise: validExerciseLevels.includes(patient.lifestyle?.exercise)
        ? patient.lifestyle.exercise : 'moderate',
      diet: validDietTypes.includes(patient.lifestyle?.diet)
        ? patient.lifestyle.diet : 'standard'
    }
  };
  
  return { valid: true, sanitized };
}

// Validate wellness recommendation input
export function validateWellnessInput(body: any): { valid: boolean; error?: string; sanitized?: any } {
  if (!body.conditions || !Array.isArray(body.conditions) || body.conditions.length === 0) {
    return { valid: false, error: 'At least one condition is required' };
  }
  
  if (body.conditions.length > 10) {
    return { valid: false, error: 'Maximum 10 conditions allowed' };
  }
  
  const validFitnessLevels = ['sedentary', 'light', 'moderate', 'active', 'very-active'];
  
  const sanitized = {
    conditions: body.conditions.slice(0, 10).map((c: string) => sanitizeQueryParam(c, 100).toLowerCase()),
    age: sanitizeNumber(body.age, 0, 120) || undefined,
    gender: ['male', 'female', 'other'].includes(body.gender) ? body.gender : undefined,
    fitnessLevel: validFitnessLevels.includes(body.fitnessLevel) ? body.fitnessLevel : 'moderate',
    goals: Array.isArray(body.goals) 
      ? body.goals.slice(0, 10).map((g: string) => sanitizeQueryParam(g, 100))
      : []
  };
  
  return { valid: true, sanitized };
}
