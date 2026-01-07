/**
 * MediSense AI Pro™ - Wellness Plans API
 * Meal & Exercise Plans Based on Symptoms, Conditions & Targets
 */

import { Hono } from 'hono';
import { 
  MEAL_PLANS, 
  EXERCISE_PLANS, 
  getMealPlansBySymptoms, 
  getMealPlansByConditions,
  getExercisePlansBySymptoms,
  getExercisePlansByConditions,
  getWellnessRecommendations
} from '../services/wellness-plans';

const wellnessApi = new Hono();

// ─────────────────────────────────────────────────────────────────────────────
// MEAL PLANS ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/wellness/meal-plans
 * Get all available meal plans
 */
wellnessApi.get('/meal-plans', (c) => {
  const plans = Object.values(MEAL_PLANS).map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    targetConditions: plan.targetConditions,
    targetSymptoms: plan.targetSymptoms,
    goals: plan.goals,
    dailyCalories: plan.dailyCalories,
    duration: plan.duration
  }));
  
  return c.json({
    success: true,
    count: plans.length,
    plans
  });
});

/**
 * GET /api/wellness/meal-plans/:id
 * Get a specific meal plan by ID
 */
wellnessApi.get('/meal-plans/:id', (c) => {
  const { id } = c.req.param();
  const plan = MEAL_PLANS[id];
  
  if (!plan) {
    return c.json({ success: false, error: 'Meal plan not found' }, 404);
  }
  
  return c.json({
    success: true,
    plan
  });
});

/**
 * POST /api/wellness/meal-plans/recommend
 * Get recommended meal plans based on symptoms/conditions
 */
wellnessApi.post('/meal-plans/recommend', async (c) => {
  try {
    const body = await c.req.json();
    const { symptoms = [], conditions = [] } = body;
    
    const symptomPlans = getMealPlansBySymptoms(symptoms);
    const conditionPlans = getMealPlansByConditions(conditions);
    
    // Combine and deduplicate
    const planMap = new Map();
    [...symptomPlans, ...conditionPlans].forEach(p => planMap.set(p.id, p));
    const recommendations = Array.from(planMap.values());
    
    return c.json({
      success: true,
      inputSymptoms: symptoms,
      inputConditions: conditions,
      count: recommendations.length,
      recommendations: recommendations.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        matchedConditions: conditions.filter(c => 
          plan.targetConditions.some(tc => tc.includes(c) || c.includes(tc))
        ),
        matchedSymptoms: symptoms.filter(s => 
          plan.targetSymptoms.some(ts => ts.includes(s) || s.includes(ts))
        ),
        goals: plan.goals,
        dailyCalories: plan.dailyCalories,
        duration: plan.duration,
        medicalWarning: plan.medicalWarning
      }))
    });
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request body' }, 400);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// EXERCISE PLANS ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/wellness/exercise-plans
 * Get all available exercise plans
 */
wellnessApi.get('/exercise-plans', (c) => {
  const plans = Object.values(EXERCISE_PLANS).map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    targetConditions: plan.targetConditions,
    targetSymptoms: plan.targetSymptoms,
    goals: plan.goals,
    intensity: plan.intensity,
    frequency: plan.frequency,
    duration: plan.duration
  }));
  
  return c.json({
    success: true,
    count: plans.length,
    plans
  });
});

/**
 * GET /api/wellness/exercise-plans/:id
 * Get a specific exercise plan by ID
 */
wellnessApi.get('/exercise-plans/:id', (c) => {
  const { id } = c.req.param();
  const plan = EXERCISE_PLANS[id];
  
  if (!plan) {
    return c.json({ success: false, error: 'Exercise plan not found' }, 404);
  }
  
  return c.json({
    success: true,
    plan
  });
});

/**
 * POST /api/wellness/exercise-plans/recommend
 * Get recommended exercise plans based on symptoms/conditions
 */
wellnessApi.post('/exercise-plans/recommend', async (c) => {
  try {
    const body = await c.req.json();
    const { symptoms = [], conditions = [] } = body;
    
    const symptomPlans = getExercisePlansBySymptoms(symptoms);
    const conditionPlans = getExercisePlansByConditions(conditions);
    
    // Combine and deduplicate
    const planMap = new Map();
    [...symptomPlans, ...conditionPlans].forEach(p => planMap.set(p.id, p));
    const recommendations = Array.from(planMap.values());
    
    return c.json({
      success: true,
      inputSymptoms: symptoms,
      inputConditions: conditions,
      count: recommendations.length,
      recommendations: recommendations.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        matchedConditions: conditions.filter(c => 
          plan.targetConditions.some(tc => tc.includes(c) || c.includes(tc))
        ),
        matchedSymptoms: symptoms.filter(s => 
          plan.targetSymptoms.some(ts => ts.includes(s) || s.includes(ts))
        ),
        goals: plan.goals,
        intensity: plan.intensity,
        frequency: plan.frequency,
        duration: plan.duration,
        medicalWarning: plan.medicalWarning
      }))
    });
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request body' }, 400);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED WELLNESS RECOMMENDATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/wellness/recommendations
 * Get complete wellness recommendations (meal + exercise plans)
 */
wellnessApi.post('/recommendations', async (c) => {
  try {
    const body = await c.req.json();
    const { symptoms = [], conditions = [], goals = [] } = body;
    
    const { mealPlans, exercisePlans } = getWellnessRecommendations(symptoms, conditions);
    
    return c.json({
      success: true,
      input: { symptoms, conditions, goals },
      recommendations: {
        mealPlans: mealPlans.map(plan => ({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          goals: plan.goals,
          dailyCalories: plan.dailyCalories,
          macros: plan.macros,
          duration: plan.duration,
          medicalWarning: plan.medicalWarning,
          keyFoods: {
            recommended: plan.foods.recommended.slice(0, 5),
            avoid: plan.foods.avoid.slice(0, 3)
          },
          supplements: plan.supplements
        })),
        exercisePlans: exercisePlans.map(plan => ({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          goals: plan.goals,
          intensity: plan.intensity,
          frequency: plan.frequency,
          duration: plan.duration,
          medicalWarning: plan.medicalWarning,
          keyExercises: plan.mainExercises.slice(0, 3).map(e => ({
            name: e.name,
            description: e.description,
            icon: e.icon
          })),
          contraindications: plan.contraindications
        }))
      },
      disclaimer: 'These recommendations are for informational purposes only. Consult a healthcare professional before starting any new diet or exercise program.'
    });
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request body' }, 400);
  }
});

/**
 * GET /api/wellness/goals
 * Get available wellness goals
 */
wellnessApi.get('/goals', (c) => {
  const allGoals = new Set<string>();
  
  Object.values(MEAL_PLANS).forEach(plan => {
    plan.goals.forEach(g => allGoals.add(g));
  });
  
  Object.values(EXERCISE_PLANS).forEach(plan => {
    plan.goals.forEach(g => allGoals.add(g));
  });
  
  return c.json({
    success: true,
    goals: Array.from(allGoals).sort()
  });
});

/**
 * GET /api/wellness/conditions
 * Get all target conditions covered by wellness plans
 */
wellnessApi.get('/conditions', (c) => {
  const allConditions = new Set<string>();
  
  Object.values(MEAL_PLANS).forEach(plan => {
    plan.targetConditions.forEach(c => allConditions.add(c));
  });
  
  Object.values(EXERCISE_PLANS).forEach(plan => {
    plan.targetConditions.forEach(c => allConditions.add(c));
  });
  
  return c.json({
    success: true,
    conditions: Array.from(allConditions).sort()
  });
});

/**
 * GET /api/wellness/symptoms
 * Get all target symptoms covered by wellness plans
 */
wellnessApi.get('/symptoms', (c) => {
  const allSymptoms = new Set<string>();
  
  Object.values(MEAL_PLANS).forEach(plan => {
    plan.targetSymptoms.forEach(s => allSymptoms.add(s));
  });
  
  Object.values(EXERCISE_PLANS).forEach(plan => {
    plan.targetSymptoms.forEach(s => allSymptoms.add(s));
  });
  
  return c.json({
    success: true,
    symptoms: Array.from(allSymptoms).sort()
  });
});

export { wellnessApi };
export default wellnessApi;
