/**
 * SelectCareOS™ Daily Wellness & Health Tracking Routes
 * Gamified health logging with SelectPoints integration
 * Includes Meal & Exercise Plans based on symptoms/conditions
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

const wellness = new Hono();

// ============================================================================
// POINTS CONFIGURATION
// ============================================================================

const POINTS_CONFIG = {
  dailyLogin: 10,
  logWeight: 20,
  logMeal: 15,
  logExercise: 25,
  logWater: 10,
  logSleep: 15,
  logMedication: 30,
  reachStepGoal: 50,
  completeAllTasks: 100, // bonus for completing all daily tasks
  weeklyStreak: 200,
  monthlyStreak: 500,
};

// ============================================================================
// DAILY WELLNESS ENDPOINTS
// ============================================================================

/**
 * Get daily wellness summary
 * GET /api/wellness/daily/:userId
 */
wellness.get('/daily/:userId', async (c) => {
  const userId = c.req.param('userId');
  const date = c.req.query('date') || new Date().toISOString().split('T')[0];
  
  // Demo data - in production, fetch from database
  return c.json({
    success: true,
    date,
    wellness: {
      score: 80,
      scoreChange: 5,
      streak: 14,
      longestStreak: 21,
      metrics: {
        water: {
          current: 1.1,
          goal: 2.5,
          unit: 'L',
          progress: 44,
          pointsAvailable: POINTS_CONFIG.logWater,
          logged: true,
        },
        steps: {
          current: 6847,
          goal: 10000,
          unit: 'steps',
          progress: 68,
          pointsAvailable: POINTS_CONFIG.reachStepGoal,
          logged: true,
          goalReached: false,
        },
        sleep: {
          duration: 7.53, // 7h 32m
          quality: 'good',
          deepSleep: 2.25,
          remSleep: 1.75,
          goal: 8,
          unit: 'hours',
          pointsAvailable: POINTS_CONFIG.logSleep,
          logged: true,
        },
        calories: {
          consumed: 1450,
          goal: 1800,
          unit: 'kcal',
          progress: 80,
          breakdown: {
            breakfast: 350,
            lunch: 550,
            dinner: 0,
            snacks: 150,
          },
        },
        weight: {
          current: 82.4,
          previous: 82.6,
          change: -0.2,
          startWeight: 90.0,
          targetWeight: 75.0,
          totalLoss: -7.6,
          unit: 'kg',
          pointsAvailable: POINTS_CONFIG.logWeight,
          logged: true,
        },
        exercise: {
          minutes: 25,
          goal: 30,
          type: 'walking',
          caloriesBurned: 180,
          pointsAvailable: POINTS_CONFIG.logExercise,
          logged: true,
        },
      },
      mood: {
        current: 'good',
        energyLevel: 7,
        notes: '',
      },
    },
  });
});

/**
 * Log health metric
 * POST /api/wellness/log
 */
wellness.post('/log', async (c) => {
  try {
    const { userId, metricType, value, valueSecondary, unit, notes, source } = await c.req.json();
    
    const validMetrics = ['weight', 'water', 'sleep', 'exercise', 'meal', 'medication', 'mood', 'blood_pressure', 'heart_rate', 'glucose'];
    
    if (!validMetrics.includes(metricType)) {
      return c.json({ success: false, error: 'Invalid metric type' }, 400);
    }
    
    // Calculate points earned
    const pointsMap: Record<string, number> = {
      weight: POINTS_CONFIG.logWeight,
      water: POINTS_CONFIG.logWater,
      sleep: POINTS_CONFIG.logSleep,
      exercise: POINTS_CONFIG.logExercise,
      meal: POINTS_CONFIG.logMeal,
      medication: POINTS_CONFIG.logMedication,
      blood_pressure: 15,
      heart_rate: 10,
      glucose: 20,
      mood: 5,
    };
    
    const pointsEarned = pointsMap[metricType] || 10;
    
    // Generate log ID
    const logId = `log_${Date.now()}_${metricType}`;
    
    return c.json({
      success: true,
      log: {
        id: logId,
        userId,
        metricType,
        value,
        valueSecondary,
        unit,
        notes,
        source: source || 'manual',
        recordedAt: new Date().toISOString(),
      },
      points: {
        earned: pointsEarned,
        newBalance: 8450 + pointsEarned, // Demo: add to existing balance
        message: `+${pointsEarned} SelectPoints for logging ${metricType}!`,
      },
      achievements: checkAchievements(metricType),
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to log metric' }, 500);
  }
});

/**
 * Get daily tasks
 * GET /api/wellness/tasks/:userId
 */
wellness.get('/tasks/:userId', async (c) => {
  const userId = c.req.param('userId');
  const date = c.req.query('date') || new Date().toISOString().split('T')[0];
  
  return c.json({
    success: true,
    date,
    tasks: {
      completed: 4,
      total: 7,
      potentialPoints: 155,
      earnedPoints: 75,
      items: [
        {
          id: 'task-medication-morning',
          type: 'medication',
          title: 'Morning medications',
          description: 'Take your prescribed morning medications',
          scheduledTime: '08:00',
          points: 30,
          status: 'completed',
          completedAt: `${date}T08:15:00Z`,
        },
        {
          id: 'task-log-breakfast',
          type: 'meal',
          title: 'Log breakfast',
          description: 'Record what you had for breakfast',
          scheduledTime: '09:00',
          points: 15,
          status: 'completed',
          completedAt: `${date}T08:45:00Z`,
        },
        {
          id: 'task-water-morning',
          type: 'water',
          title: 'Drink 2 glasses of water',
          description: 'Stay hydrated in the morning',
          scheduledTime: '10:00',
          points: 10,
          status: 'completed',
          completedAt: `${date}T09:30:00Z`,
        },
        {
          id: 'task-exercise',
          type: 'exercise',
          title: '20-minute walk',
          description: 'Light walking as recommended by your doctor',
          scheduledTime: '11:00',
          points: 25,
          status: 'completed',
          completedAt: `${date}T11:20:00Z`,
        },
        {
          id: 'task-log-lunch',
          type: 'meal',
          title: 'Log lunch',
          description: 'Record your lunch meal',
          scheduledTime: '13:00',
          points: 15,
          status: 'pending',
          completedAt: null,
        },
        {
          id: 'task-blood-pressure',
          type: 'health_check',
          title: 'Log blood pressure',
          description: 'Record your afternoon BP reading',
          scheduledTime: '15:00',
          points: 20,
          status: 'pending',
          completedAt: null,
        },
        {
          id: 'task-medication-evening',
          type: 'medication',
          title: 'Evening medications',
          description: 'Take your prescribed evening medications',
          scheduledTime: '20:00',
          points: 30,
          status: 'pending',
          completedAt: null,
        },
      ],
      bonusTask: {
        id: 'task-bonus-all',
        title: 'Complete all tasks',
        description: 'Finish all 7 daily tasks for a bonus',
        points: 100,
        status: 'in_progress',
        progress: '4/7',
      },
    },
  });
});

/**
 * Complete a task
 * POST /api/wellness/tasks/complete
 */
wellness.post('/tasks/complete', async (c) => {
  try {
    const { userId, taskId, value, notes } = await c.req.json();
    
    // Demo task completion
    const taskPoints = 15; // Would be looked up from task config
    const newBalance = 8450 + taskPoints;
    
    return c.json({
      success: true,
      completion: {
        taskId,
        userId,
        completedAt: new Date().toISOString(),
        value,
        notes,
      },
      points: {
        earned: taskPoints,
        newBalance,
        streakBonus: 0, // Would calculate if streak milestone reached
      },
      tasksRemaining: 3,
      bonusEligible: false, // Set to true when all tasks complete
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to complete task' }, 500);
  }
});

/**
 * Get meal plan for the day
 * GET /api/wellness/meal-plan/:userId
 */
wellness.get('/meal-plan/:userId', async (c) => {
  const userId = c.req.param('userId');
  const date = c.req.query('date') || new Date().toISOString().split('T')[0];
  
  // Premium feature check would happen here
  const isPremium = true; // Demo: assume premium user
  
  if (!isPremium) {
    return c.json({
      success: true,
      premium: false,
      teaser: {
        message: 'Unlock personalized AI meal plans with Plus or Elite',
        features: [
          'Customized for your recovery stage',
          'Macronutrient balanced',
          'Recipe suggestions',
          'Shopping list',
        ],
        cta: 'Upgrade to Plus - €79/month',
        ctaUrl: '/subscription',
      },
    });
  }
  
  return c.json({
    success: true,
    premium: true,
    date,
    mealPlan: {
      dailyTargets: {
        calories: 1800,
        protein: 90, // grams
        carbs: 180,
        fat: 60,
        fiber: 25,
        water: 2.5,
      },
      meals: [
        {
          type: 'breakfast',
          time: '08:00',
          name: 'High-Protein Greek Yogurt Bowl',
          calories: 350,
          protein: 25,
          carbs: 35,
          fat: 12,
          ingredients: ['Greek yogurt', 'Mixed berries', 'Almonds', 'Honey drizzle'],
          logged: true,
          points: 15,
        },
        {
          type: 'lunch',
          time: '12:30',
          name: 'Grilled Chicken Salad',
          calories: 450,
          protein: 35,
          carbs: 25,
          fat: 18,
          ingredients: ['Grilled chicken breast', 'Mixed greens', 'Avocado', 'Olive oil dressing'],
          logged: false,
          points: 15,
        },
        {
          type: 'snack',
          time: '15:30',
          name: 'Recovery Protein Smoothie',
          calories: 200,
          protein: 20,
          carbs: 20,
          fat: 5,
          ingredients: ['Whey protein', 'Banana', 'Almond milk', 'Spinach'],
          logged: false,
          points: 10,
        },
        {
          type: 'dinner',
          time: '19:00',
          name: 'Baked Salmon with Vegetables',
          calories: 550,
          protein: 40,
          carbs: 35,
          fat: 22,
          ingredients: ['Salmon fillet', 'Roasted broccoli', 'Sweet potato', 'Lemon herb butter'],
          logged: false,
          points: 15,
        },
      ],
      tips: [
        'Eat slowly and chew thoroughly - aim for 20+ chews per bite',
        'Wait 30 minutes between meals and drinks',
        'Protein first, then vegetables, then carbs',
      ],
      aiInsight: 'Based on your recovery progress, I\'ve increased protein to support muscle recovery. Your vitamin D levels suggest adding more fatty fish this week.',
    },
  });
});

/**
 * Get weekly wellness summary
 * GET /api/wellness/weekly/:userId
 */
wellness.get('/weekly/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  return c.json({
    success: true,
    period: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    summary: {
      averageScore: 78,
      scoreChange: 5,
      daysLogged: 7,
      streakDays: 14,
      metrics: {
        steps: {
          average: 6234,
          goal: 10000,
          best: 8547,
          worst: 4123,
          trend: 'improving',
        },
        weight: {
          start: 83.0,
          end: 82.4,
          change: -0.6,
          trend: 'on_track',
        },
        sleep: {
          average: 7.2,
          goal: 8,
          best: 8.5,
          worst: 5.5,
          trend: 'stable',
        },
        water: {
          average: 1.8,
          goal: 2.5,
          trend: 'needs_improvement',
        },
      },
      tasksCompleted: 42,
      totalTasks: 49,
      completionRate: 86,
      pointsEarned: 1250,
      achievements: [
        { name: 'Week Warrior', description: 'Completed 7-day streak', icon: 'calendar-check' },
      ],
    },
    recommendations: [
      {
        type: 'improvement',
        metric: 'water',
        message: 'Your water intake is below target. Try setting hourly reminders.',
        action: 'Set reminder',
      },
      {
        type: 'maintain',
        metric: 'weight',
        message: 'Great progress! You\'re on track with your weight goal.',
        action: null,
      },
      {
        type: 'challenge',
        metric: 'steps',
        message: 'Try to hit 8,000 steps daily this week for a 200 point bonus!',
        action: 'Accept challenge',
        reward: 200,
      },
    ],
    nextWeekGoals: [
      { metric: 'steps', goal: 8000, current: 6234 },
      { metric: 'water', goal: 2.5, current: 1.8 },
      { metric: 'sleep', goal: 8, current: 7.2 },
    ],
  });
});

/**
 * Get health challenges
 * GET /api/wellness/challenges/:userId
 */
wellness.get('/challenges/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  return c.json({
    success: true,
    challenges: {
      active: [
        {
          id: 'challenge-steps-weekly',
          name: '10K Steps Challenge',
          description: 'Walk 10,000 steps every day for a week',
          type: 'daily_streak',
          metric: 'steps',
          target: 10000,
          duration: 7,
          progress: 5,
          currentStreak: 5,
          reward: 500,
          endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          participants: 247,
        },
        {
          id: 'challenge-water-hydration',
          name: 'Hydration Hero',
          description: 'Drink 2.5L of water daily for 5 days',
          type: 'daily_streak',
          metric: 'water',
          target: 2.5,
          duration: 5,
          progress: 2,
          currentStreak: 2,
          reward: 250,
          endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          participants: 189,
        },
      ],
      available: [
        {
          id: 'challenge-sleep-quality',
          name: 'Sleep Champion',
          description: 'Get 7+ hours of sleep for 7 nights',
          type: 'daily_streak',
          metric: 'sleep',
          target: 7,
          duration: 7,
          reward: 400,
          participants: 156,
          difficulty: 'medium',
        },
        {
          id: 'challenge-family-steps',
          name: 'Family Step Together',
          description: 'Your family walks 100K steps combined this week',
          type: 'family_cumulative',
          metric: 'steps',
          target: 100000,
          duration: 7,
          reward: 1000,
          participants: 89,
          difficulty: 'hard',
          requiresFamily: true,
        },
      ],
      completed: [
        {
          id: 'challenge-first-week',
          name: 'First Week Champion',
          completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          reward: 300,
          badge: 'week-warrior',
        },
      ],
    },
  });
});

/**
 * Join a challenge
 * POST /api/wellness/challenges/join
 */
wellness.post('/challenges/join', async (c) => {
  try {
    const { userId, challengeId } = await c.req.json();
    
    return c.json({
      success: true,
      enrollment: {
        challengeId,
        userId,
        joinedAt: new Date().toISOString(),
        status: 'active',
        progress: 0,
      },
      message: 'Challenge joined! Start tracking to earn points.',
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to join challenge' }, 500);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function checkAchievements(metricType: string): any[] {
  // In production, this would check actual achievement progress
  const achievements: any[] = [];
  
  // Demo: occasionally return an achievement
  if (Math.random() > 0.7) {
    achievements.push({
      id: 'health-hero',
      name: 'Health Hero',
      description: 'Logged 7 health metrics',
      icon: 'heartbeat',
      pointsAwarded: 100,
      unlockedAt: new Date().toISOString(),
    });
  }
  
  return achievements;
}

// ============================================================================
// MEAL & EXERCISE PLANS API
// ============================================================================

/**
 * GET /api/wellness/plans/meals
 * Get all available meal plans
 */
wellness.get('/plans/meals', (c) => {
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
 * GET /api/wellness/plans/meals/:id
 * Get a specific meal plan by ID
 */
wellness.get('/plans/meals/:id', (c) => {
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
 * GET /api/wellness/plans/exercises
 * Get all available exercise plans
 */
wellness.get('/plans/exercises', (c) => {
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
 * GET /api/wellness/plans/exercises/:id
 * Get a specific exercise plan by ID
 */
wellness.get('/plans/exercises/:id', (c) => {
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
 * POST /api/wellness/plans/recommend
 * Get personalized meal & exercise recommendations based on symptoms/conditions
 */
wellness.post('/plans/recommend', async (c) => {
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
 * GET /api/wellness/plans/conditions
 * Get all target conditions covered by wellness plans
 */
wellness.get('/plans/conditions', (c) => {
  const allConditions = new Set<string>();
  
  Object.values(MEAL_PLANS).forEach(plan => {
    plan.targetConditions.forEach(cond => allConditions.add(cond));
  });
  
  Object.values(EXERCISE_PLANS).forEach(plan => {
    plan.targetConditions.forEach(cond => allConditions.add(cond));
  });
  
  return c.json({
    success: true,
    conditions: Array.from(allConditions).sort()
  });
});

/**
 * GET /api/wellness/plans/symptoms
 * Get all target symptoms covered by wellness plans
 */
wellness.get('/plans/symptoms', (c) => {
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

export { wellness };
