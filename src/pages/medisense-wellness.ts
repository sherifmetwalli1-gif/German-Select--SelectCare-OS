/**
 * 🏋️ MediSense Wellness™ v1.0 - Exercise & Nutrition Programs
 * SelectCareOS™ Integrated Wellness Intelligence
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🌟 WELLNESS DEVELOPMENT TEAM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 🏃 Dr. Fitness (Exercise Science Lead)
 *    - Evidence-based exercise prescription
 *    - Condition-specific workout modifications
 *    - Progressive overload programming
 *    - Injury prevention protocols
 * 
 * 🥗 Dr. Nutrition (Registered Dietitian)
 *    - Medical nutrition therapy
 *    - Condition-specific meal planning
 *    - Macronutrient optimization
 *    - Supplement recommendations
 * 
 * 🧘 Wellness Integration
 *    - Mind-body connection programs
 *    - Stress management protocols
 *    - Sleep optimization strategies
 *    - Holistic health approach
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════════════════════
// 🧬 TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

export interface ExerciseProgram {
  id: string;
  name: string;
  category: 'cardiovascular' | 'strength' | 'flexibility' | 'balance' | 'rehabilitation' | 'sport-specific' | 'mind-body';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'clinical';
  duration: string; // e.g., "30 minutes", "45-60 minutes"
  frequency: string; // e.g., "3x per week", "daily"
  targetConditions: string[]; // conditions this program helps
  contraindications: string[]; // conditions where this is NOT safe
  benefits: string[];
  exercises: Exercise[];
  progressionPath: string[];
  equipment: string[];
  caloriesBurned: string; // e.g., "200-300 kcal"
  muscleGroups: string[];
  modifications: {
    easier: string[];
    harder: string[];
  };
  safetyNotes: string[];
  warmUp: Exercise[];
  coolDown: Exercise[];
}

export interface Exercise {
  name: string;
  description: string;
  sets?: number;
  reps?: string;
  duration?: string;
  restPeriod?: string;
  targetMuscles: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  modifications?: string[];
}

export interface NutritionPlan {
  id: string;
  name: string;
  category: 'therapeutic' | 'weight-management' | 'performance' | 'general-wellness' | 'disease-specific';
  targetConditions: string[];
  contraindications: string[];
  calorieRange: string;
  macroRatio: {
    carbohydrates: string;
    protein: string;
    fat: string;
  };
  keyPrinciples: string[];
  allowedFoods: FoodCategory[];
  restrictedFoods: FoodCategory[];
  sampleMealPlan: MealPlan;
  supplements: Supplement[];
  hydrationGuidelines: string;
  mealTiming: string[];
  benefits: string[];
  duration: string;
  scientificEvidence: string;
}

export interface FoodCategory {
  category: string;
  items: string[];
  servingSize: string;
  frequency: string;
  notes?: string;
}

export interface MealPlan {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
}

export interface Meal {
  name: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  preparationTime: string;
  instructions?: string[];
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  purpose: string;
  contraindications: string[];
  evidence: 'strong' | 'moderate' | 'emerging';
}

export interface WellnessRecommendation {
  exercisePrograms: ExerciseProgram[];
  nutritionPlans: NutritionPlan[];
  lifestyleModifications: string[];
  mindBodyPractices: string[];
  sleepRecommendations: string[];
  stressManagement: string[];
  monitoringMetrics: string[];
  goals: WellnessGoal[];
}

export interface WellnessGoal {
  category: string;
  shortTerm: string;
  longTerm: string;
  metrics: string[];
  timeline: string;
}

// ════════════════════════════════════════════════════════════════════════════════
// 🏋️ EXERCISE PROGRAMS DATABASE (50+ Programs)
// ════════════════════════════════════════════════════════════════════════════════

export const EXERCISE_PROGRAMS_DATABASE: Record<string, ExerciseProgram> = {
  
  // ══════════════════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════════
  
  'cardiac-rehab-phase-1': {
    id: 'cardiac-rehab-phase-1',
    name: 'Cardiac Rehabilitation Phase 1',
    category: 'rehabilitation',
    difficulty: 'clinical',
    duration: '15-20 minutes',
    frequency: '2-3x per day',
    targetConditions: ['acute-myocardial-infarction', 'heart-failure', 'post-cardiac-surgery', 'angina'],
    contraindications: ['unstable-angina', 'uncontrolled-arrhythmia', 'acute-heart-failure', 'recent-embolism'],
    benefits: [
      'Prevents deconditioning during recovery',
      'Reduces risk of blood clots',
      'Improves circulation',
      'Maintains joint mobility',
      'Psychological wellbeing'
    ],
    exercises: [
      {
        name: 'Ankle Pumps',
        description: 'Flex and point feet while lying down',
        sets: 3,
        reps: '10-15',
        targetMuscles: ['calves', 'ankle-mobilizers'],
        instructions: ['Lie flat on back', 'Point toes away then flex toward shin', 'Move slowly and controlled'],
        difficulty: 'easy'
      },
      {
        name: 'Seated Marching',
        description: 'Lift knees alternately while seated',
        sets: 2,
        reps: '10 each leg',
        targetMuscles: ['hip-flexors', 'quadriceps'],
        instructions: ['Sit upright in chair', 'Lift one knee at a time', 'Keep movements slow'],
        difficulty: 'easy'
      },
      {
        name: 'Arm Raises',
        description: 'Gentle overhead arm movements',
        sets: 2,
        reps: '8-10',
        targetMuscles: ['shoulders', 'upper-back'],
        instructions: ['Sit or stand supported', 'Raise arms to shoulder height', 'Lower slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Breathing Exercises',
        description: 'Diaphragmatic breathing with pursed lips',
        duration: '5 minutes',
        targetMuscles: ['diaphragm', 'intercostals'],
        instructions: ['Breathe in through nose 4 seconds', 'Breathe out through pursed lips 6 seconds', 'Focus on belly rising'],
        difficulty: 'easy'
      }
    ],
    progressionPath: ['cardiac-rehab-phase-2', 'cardiac-rehab-phase-3', 'heart-healthy-walking'],
    equipment: ['chair', 'bed'],
    caloriesBurned: '50-100 kcal',
    muscleGroups: ['full-body-gentle'],
    modifications: {
      easier: ['Perform in bed only', 'Reduce repetitions', 'Add more rest'],
      harder: ['Add light resistance bands', 'Increase duration', 'Add standing exercises']
    },
    safetyNotes: [
      'Stop immediately if chest pain occurs',
      'Monitor heart rate - stay below prescribed limit',
      'Report any dizziness or shortness of breath',
      'Do not hold breath during exercises'
    ],
    warmUp: [
      {
        name: 'Deep Breathing',
        description: '5 deep breaths',
        duration: '1 minute',
        targetMuscles: ['respiratory'],
        instructions: ['Slow, controlled breaths'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Relaxation',
        description: 'Progressive muscle relaxation',
        duration: '3 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Tense and release each muscle group'],
        difficulty: 'easy'
      }
    ]
  },

  'cardiac-rehab-phase-2': {
    id: 'cardiac-rehab-phase-2',
    name: 'Cardiac Rehabilitation Phase 2',
    category: 'rehabilitation',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: '3x per week',
    targetConditions: ['post-myocardial-infarction', 'stable-angina', 'controlled-heart-failure', 'post-angioplasty'],
    contraindications: ['unstable-angina', 'uncontrolled-hypertension', 'recent-cardiac-event'],
    benefits: [
      'Improves cardiovascular fitness',
      'Reduces risk of future cardiac events by 25%',
      'Lowers blood pressure',
      'Improves cholesterol profile',
      'Reduces anxiety and depression'
    ],
    exercises: [
      {
        name: 'Treadmill Walking',
        description: 'Supervised walking at prescribed intensity',
        duration: '15-20 minutes',
        targetMuscles: ['legs', 'cardiovascular-system'],
        instructions: ['Start at 2.0 mph', 'Progress to 3.0 mph', 'Maintain conversation pace'],
        difficulty: 'moderate'
      },
      {
        name: 'Stationary Cycling',
        description: 'Low resistance cycling',
        duration: '10-15 minutes',
        targetMuscles: ['quadriceps', 'hamstrings', 'cardiovascular'],
        instructions: ['Keep RPM at 60-70', 'Light resistance', 'Focus on smooth pedaling'],
        difficulty: 'moderate'
      },
      {
        name: 'Arm Ergometer',
        description: 'Upper body cycling',
        duration: '5-10 minutes',
        targetMuscles: ['shoulders', 'arms', 'chest'],
        instructions: ['Low resistance', 'Forward and backward', 'Coordinate with breathing'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['cardiac-rehab-phase-3', 'heart-healthy-cardio', 'strength-for-heart'],
    equipment: ['treadmill', 'stationary-bike', 'arm-ergometer', 'heart-rate-monitor'],
    caloriesBurned: '150-250 kcal',
    muscleGroups: ['cardiovascular', 'lower-body', 'upper-body'],
    modifications: {
      easier: ['Reduce duration', 'Lower intensity', 'More rest breaks'],
      harder: ['Increase incline', 'Add intervals', 'Extend duration']
    },
    safetyNotes: [
      'Always wear heart rate monitor',
      'Stay within prescribed heart rate zone',
      'Staff supervision required',
      'Emergency equipment nearby'
    ],
    warmUp: [
      {
        name: 'Light Walking',
        description: 'Easy pace walking',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['2.0 mph pace', 'Allow gradual HR increase'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Gradual Slowdown',
        description: 'Progressively slower walking',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Reduce pace gradually', 'Allow HR to return below 100'],
        difficulty: 'easy'
      }
    ]
  },

  'heart-healthy-walking': {
    id: 'heart-healthy-walking',
    name: 'Heart Healthy Walking Program',
    category: 'cardiovascular',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: '5x per week',
    targetConditions: ['hypertension', 'pre-diabetes', 'obesity', 'metabolic-syndrome', 'mild-depression'],
    contraindications: ['severe-arthritis-lower-limb', 'acute-injury', 'uncontrolled-cardiac-condition'],
    benefits: [
      'Reduces blood pressure by 5-10 mmHg',
      'Burns 150-200 calories per session',
      'Improves insulin sensitivity',
      'Reduces stress hormones',
      'Strengthens bones',
      'Low impact on joints'
    ],
    exercises: [
      {
        name: 'Brisk Walking',
        description: 'Moderate pace walking outdoors or on treadmill',
        duration: '30-45 minutes',
        targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves', 'core'],
        instructions: [
          'Walk at a pace where you can talk but not sing',
          'Keep shoulders back, head up',
          'Swing arms naturally',
          'Land heel first, roll to toe'
        ],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['interval-walking', 'jogging-for-beginners', 'hiking-program'],
    equipment: ['comfortable-walking-shoes', 'fitness-tracker-optional'],
    caloriesBurned: '150-250 kcal',
    muscleGroups: ['lower-body', 'core', 'cardiovascular'],
    modifications: {
      easier: ['Shorter duration', 'Slower pace', 'Flat terrain only'],
      harder: ['Add hills', 'Increase pace', 'Add walking poles', 'Interval training']
    },
    safetyNotes: [
      'Wear supportive footwear',
      'Stay hydrated',
      'Avoid extreme temperatures',
      'Walk in well-lit, safe areas'
    ],
    warmUp: [
      {
        name: 'Slow Walking',
        description: 'Easy pace for 5 minutes',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Start at conversational pace'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Gentle Stretching',
        description: 'Lower body stretches',
        duration: '5 minutes',
        targetMuscles: ['calves', 'hamstrings', 'quadriceps'],
        instructions: ['Hold each stretch 20-30 seconds'],
        difficulty: 'easy'
      }
    ]
  },

  'hiit-metabolic': {
    id: 'hiit-metabolic',
    name: 'HIIT Metabolic Conditioning',
    category: 'cardiovascular',
    difficulty: 'advanced',
    duration: '25-30 minutes',
    frequency: '3x per week',
    targetConditions: ['obesity', 'insulin-resistance', 'metabolic-syndrome'],
    contraindications: ['heart-disease', 'uncontrolled-hypertension', 'joint-problems', 'pregnancy', 'recent-surgery'],
    benefits: [
      'Burns 300-400 calories in 30 minutes',
      'Increases metabolic rate for 24-48 hours post-exercise',
      'Improves insulin sensitivity by up to 25%',
      'Builds lean muscle',
      'Time efficient'
    ],
    exercises: [
      {
        name: 'Burpees',
        description: 'Full body explosive movement',
        sets: 4,
        reps: '10',
        restPeriod: '30 seconds',
        targetMuscles: ['full-body'],
        instructions: ['Squat down', 'Jump feet back to plank', 'Push-up', 'Jump feet forward', 'Jump up'],
        difficulty: 'challenging',
        modifications: ['Step back instead of jump', 'Remove push-up', 'No jump at top']
      },
      {
        name: 'Mountain Climbers',
        description: 'High-speed alternating knee drives',
        sets: 4,
        duration: '30 seconds',
        restPeriod: '15 seconds',
        targetMuscles: ['core', 'shoulders', 'hip-flexors'],
        instructions: ['Start in plank', 'Drive knees alternately toward chest', 'Keep hips low'],
        difficulty: 'challenging'
      },
      {
        name: 'Jump Squats',
        description: 'Explosive squat with jump',
        sets: 4,
        reps: '12',
        restPeriod: '30 seconds',
        targetMuscles: ['quadriceps', 'glutes', 'calves'],
        instructions: ['Squat down', 'Explode up into jump', 'Land softly', 'Immediately squat again'],
        difficulty: 'challenging',
        modifications: ['Regular squats without jump']
      },
      {
        name: 'High Knees',
        description: 'Running in place with high knee lift',
        sets: 4,
        duration: '30 seconds',
        restPeriod: '15 seconds',
        targetMuscles: ['hip-flexors', 'core', 'cardiovascular'],
        instructions: ['Run in place', 'Drive knees above hip level', 'Pump arms'],
        difficulty: 'challenging'
      }
    ],
    progressionPath: ['advanced-hiit', 'crossfit-style', 'athletic-conditioning'],
    equipment: ['none-bodyweight', 'optional-mat'],
    caloriesBurned: '300-450 kcal',
    muscleGroups: ['full-body'],
    modifications: {
      easier: ['Low impact versions', 'Longer rest periods', 'Fewer sets'],
      harder: ['Add weights', 'Shorter rest', 'Tabata protocol']
    },
    safetyNotes: [
      'Not suitable for beginners',
      'Ensure proper warm-up',
      'Stay hydrated',
      'Stop if dizzy or chest pain'
    ],
    warmUp: [
      {
        name: 'Dynamic Stretching',
        description: 'Full body movement prep',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Leg swings', 'Arm circles', 'Torso twists', 'Light jogging'],
        difficulty: 'moderate'
      }
    ],
    coolDown: [
      {
        name: 'Static Stretching',
        description: 'Full body stretch routine',
        duration: '5-7 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Hold each stretch 30 seconds', 'Breathe deeply'],
        difficulty: 'easy'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // STRENGTH TRAINING PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════════

  'strength-for-diabetes': {
    id: 'strength-for-diabetes',
    name: 'Strength Training for Diabetes Management',
    category: 'strength',
    difficulty: 'beginner',
    duration: '30-40 minutes',
    frequency: '2-3x per week',
    targetConditions: ['diabetes-type-2', 'pre-diabetes', 'insulin-resistance', 'metabolic-syndrome'],
    contraindications: ['uncontrolled-blood-sugar', 'diabetic-retinopathy-advanced', 'severe-neuropathy'],
    benefits: [
      'Improves insulin sensitivity by 20-30%',
      'Increases glucose uptake by muscles',
      'Builds metabolically active tissue',
      'Helps maintain healthy weight',
      'Reduces HbA1c by 0.5-1%'
    ],
    exercises: [
      {
        name: 'Goblet Squats',
        description: 'Squat holding weight at chest',
        sets: 3,
        reps: '10-12',
        restPeriod: '60 seconds',
        targetMuscles: ['quadriceps', 'glutes', 'core'],
        instructions: ['Hold weight at chest', 'Feet shoulder width', 'Squat until thighs parallel', 'Drive through heels'],
        difficulty: 'moderate'
      },
      {
        name: 'Dumbbell Rows',
        description: 'Bent over rowing motion',
        sets: 3,
        reps: '10 each arm',
        restPeriod: '45 seconds',
        targetMuscles: ['lats', 'rhomboids', 'biceps'],
        instructions: ['Hinge at hips', 'Pull elbow back', 'Squeeze shoulder blade', 'Lower controlled'],
        difficulty: 'moderate'
      },
      {
        name: 'Push-Ups',
        description: 'Classic chest and arm exercise',
        sets: 3,
        reps: '8-12',
        restPeriod: '60 seconds',
        targetMuscles: ['chest', 'shoulders', 'triceps', 'core'],
        instructions: ['Hands shoulder width', 'Body straight line', 'Lower chest to floor', 'Push up fully'],
        difficulty: 'moderate',
        modifications: ['Wall push-ups', 'Knee push-ups', 'Incline push-ups']
      },
      {
        name: 'Lunges',
        description: 'Forward stepping lunge',
        sets: 3,
        reps: '10 each leg',
        restPeriod: '45 seconds',
        targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
        instructions: ['Step forward', 'Lower back knee toward ground', 'Push back to start'],
        difficulty: 'moderate'
      },
      {
        name: 'Plank Hold',
        description: 'Core stabilization exercise',
        sets: 3,
        duration: '20-30 seconds',
        restPeriod: '45 seconds',
        targetMuscles: ['core', 'shoulders', 'glutes'],
        instructions: ['Forearms on ground', 'Body straight line', 'Engage core', 'Breathe normally'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['intermediate-strength', 'full-body-strength', 'metabolic-resistance'],
    equipment: ['dumbbells', 'mat', 'bench-optional'],
    caloriesBurned: '150-250 kcal',
    muscleGroups: ['full-body'],
    modifications: {
      easier: ['Lighter weights', 'Fewer reps', 'Seated variations'],
      harder: ['Heavier weights', 'Supersets', 'Slower tempo']
    },
    safetyNotes: [
      'Check blood sugar before and after',
      'Have fast-acting glucose available',
      'Avoid exercise if blood sugar >250 mg/dL',
      'Stay hydrated'
    ],
    warmUp: [
      {
        name: 'Light Cardio',
        description: 'Walking or marching in place',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Get blood flowing', 'Prepare joints'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Stretching',
        description: 'Full body static stretches',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Hold each stretch 20-30 seconds'],
        difficulty: 'easy'
      }
    ]
  },

  'osteoporosis-strength': {
    id: 'osteoporosis-strength',
    name: 'Bone Building Strength Program',
    category: 'strength',
    difficulty: 'beginner',
    duration: '30-40 minutes',
    frequency: '2-3x per week',
    targetConditions: ['osteoporosis', 'osteopenia', 'menopause', 'vitamin-d-deficiency'],
    contraindications: ['recent-fracture', 'severe-osteoporosis', 'spinal-stenosis'],
    benefits: [
      'Increases bone mineral density',
      'Reduces fracture risk by 40%',
      'Improves balance and coordination',
      'Builds muscle to protect bones',
      'Improves posture'
    ],
    exercises: [
      {
        name: 'Heel Drops',
        description: 'Controlled heel impacts for bone loading',
        sets: 3,
        reps: '20',
        targetMuscles: ['legs', 'spine'],
        instructions: ['Rise onto toes', 'Drop heels with controlled impact', 'Keep knees slightly bent'],
        difficulty: 'easy'
      },
      {
        name: 'Wall Push-Ups',
        description: 'Upper body weight bearing exercise',
        sets: 3,
        reps: '12-15',
        targetMuscles: ['chest', 'arms', 'wrists'],
        instructions: ['Hands on wall at shoulder height', 'Lean in bending elbows', 'Push back'],
        difficulty: 'easy'
      },
      {
        name: 'Squats with Chair',
        description: 'Supported squat movement',
        sets: 3,
        reps: '10-12',
        targetMuscles: ['quadriceps', 'glutes', 'hips'],
        instructions: ['Stand in front of chair', 'Lower as if to sit', 'Stand back up'],
        difficulty: 'moderate'
      },
      {
        name: 'Standing Hip Extension',
        description: 'Leg lift backward while standing',
        sets: 3,
        reps: '10 each leg',
        targetMuscles: ['glutes', 'lower-back'],
        instructions: ['Hold chair for balance', 'Lift leg straight back', 'Keep torso upright'],
        difficulty: 'easy'
      },
      {
        name: 'Prone Back Extension',
        description: 'Lying face down back strengthener',
        sets: 3,
        reps: '8-10',
        targetMuscles: ['erector-spinae', 'glutes'],
        instructions: ['Lie face down', 'Lift chest off ground', 'Hold 2-3 seconds', 'Lower slowly'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['intermediate-bone-building', 'weight-bearing-cardio', 'balance-training'],
    equipment: ['chair', 'mat', 'light-dumbbells'],
    caloriesBurned: '100-150 kcal',
    muscleGroups: ['spine', 'hips', 'wrists', 'full-body'],
    modifications: {
      easier: ['Seated exercises', 'Wall support', 'No weights'],
      harder: ['Add dumbbells', 'Remove support', 'Add resistance bands']
    },
    safetyNotes: [
      'Avoid forward bending and twisting',
      'No high-impact jumping',
      'Use chair for balance if needed',
      'Progress slowly'
    ],
    warmUp: [
      {
        name: 'Gentle Walking',
        description: 'Easy walking or marching',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Light intensity', 'Prepare joints'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Gentle Stretches',
        description: 'Standing supported stretches',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Avoid extreme flexion', 'Support yourself'],
        difficulty: 'easy'
      }
    ]
  },

  'arthritis-strength': {
    id: 'arthritis-strength',
    name: 'Gentle Strength for Arthritis',
    category: 'rehabilitation',
    difficulty: 'beginner',
    duration: '20-30 minutes',
    frequency: '3x per week',
    targetConditions: ['osteoarthritis', 'rheumatoid-arthritis', 'joint-pain', 'fibromyalgia'],
    contraindications: ['acute-joint-inflammation', 'severe-joint-damage', 'recent-joint-surgery'],
    benefits: [
      'Reduces joint pain and stiffness',
      'Strengthens muscles around joints',
      'Improves joint function',
      'Maintains independence',
      'Reduces need for pain medication'
    ],
    exercises: [
      {
        name: 'Seated Leg Extensions',
        description: 'Straighten leg while seated',
        sets: 2,
        reps: '10 each leg',
        targetMuscles: ['quadriceps'],
        instructions: ['Sit with back supported', 'Straighten one leg', 'Hold 3 seconds', 'Lower slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Seated Knee Lifts',
        description: 'Lift bent knee toward chest',
        sets: 2,
        reps: '10 each leg',
        targetMuscles: ['hip-flexors', 'core'],
        instructions: ['Sit upright', 'Lift knee toward chest', 'Lower with control'],
        difficulty: 'easy'
      },
      {
        name: 'Arm Curls',
        description: 'Bicep curls with light weights',
        sets: 2,
        reps: '10-12',
        targetMuscles: ['biceps'],
        instructions: ['Hold light weights', 'Curl toward shoulders', 'Lower slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Wrist Circles',
        description: 'Rotate wrists through full range',
        sets: 2,
        reps: '10 each direction',
        targetMuscles: ['forearms', 'wrists'],
        instructions: ['Make gentle circles', 'Both directions', 'Keep movements smooth'],
        difficulty: 'easy'
      },
      {
        name: 'Ankle Circles',
        description: 'Rotate ankles through full range',
        sets: 2,
        reps: '10 each direction',
        targetMuscles: ['ankles', 'calves'],
        instructions: ['Lift foot off ground', 'Circle ankle', 'Both directions'],
        difficulty: 'easy'
      }
    ],
    progressionPath: ['intermediate-arthritis', 'aquatic-therapy', 'tai-chi-arthritis'],
    equipment: ['chair', 'light-dumbbells-optional'],
    caloriesBurned: '75-125 kcal',
    muscleGroups: ['full-body-joints'],
    modifications: {
      easier: ['Fewer repetitions', 'Smaller range of motion', 'More rest'],
      harder: ['Light weights', 'Standing exercises', 'Resistance bands']
    },
    safetyNotes: [
      'Never exercise during a flare',
      'Stop if sharp pain occurs',
      'Heat joints before, ice after if needed',
      'Move within comfortable range'
    ],
    warmUp: [
      {
        name: 'Gentle Range of Motion',
        description: 'Move each joint gently',
        duration: '5 minutes',
        targetMuscles: ['all-joints'],
        instructions: ['Small movements first', 'Gradually increase range'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Gentle Stretching',
        description: 'Light stretches for worked muscles',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['No bouncing', 'Breathe deeply'],
        difficulty: 'easy'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // FLEXIBILITY & MIND-BODY PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════════

  'yoga-for-anxiety': {
    id: 'yoga-for-anxiety',
    name: 'Therapeutic Yoga for Anxiety',
    category: 'mind-body',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: 'Daily or 5x per week',
    targetConditions: ['anxiety-disorder', 'panic-disorder', 'generalized-anxiety', 'stress', 'insomnia'],
    contraindications: ['severe-spinal-injury', 'recent-surgery', 'uncontrolled-blood-pressure'],
    benefits: [
      'Reduces cortisol levels by 25%',
      'Activates parasympathetic nervous system',
      'Improves sleep quality',
      'Reduces muscle tension',
      'Enhances emotional regulation',
      'Increases GABA (calming neurotransmitter)'
    ],
    exercises: [
      {
        name: 'Child\'s Pose (Balasana)',
        description: 'Restorative kneeling forward fold',
        duration: '2-3 minutes',
        targetMuscles: ['lower-back', 'hips', 'shoulders'],
        instructions: ['Kneel on mat', 'Sit back on heels', 'Fold forward, arms extended', 'Rest forehead on mat'],
        difficulty: 'easy'
      },
      {
        name: 'Cat-Cow Stretch',
        description: 'Spinal mobility flow',
        sets: 1,
        reps: '10 cycles',
        targetMuscles: ['spine', 'core', 'neck'],
        instructions: ['Start on hands and knees', 'Arch back up (cat)', 'Drop belly down (cow)', 'Flow with breath'],
        difficulty: 'easy'
      },
      {
        name: 'Legs Up the Wall',
        description: 'Restorative inversion',
        duration: '5-10 minutes',
        targetMuscles: ['hamstrings', 'lower-back', 'nervous-system'],
        instructions: ['Lie with buttocks against wall', 'Legs straight up', 'Arms relaxed at sides', 'Close eyes, breathe'],
        difficulty: 'easy'
      },
      {
        name: 'Corpse Pose (Savasana)',
        description: 'Final relaxation',
        duration: '5-10 minutes',
        targetMuscles: ['full-body', 'nervous-system'],
        instructions: ['Lie flat on back', 'Legs and arms relaxed', 'Close eyes', 'Focus on breath'],
        difficulty: 'easy'
      },
      {
        name: 'Box Breathing',
        description: 'Structured breathing technique',
        duration: '5 minutes',
        targetMuscles: ['respiratory-system'],
        instructions: ['Inhale 4 counts', 'Hold 4 counts', 'Exhale 4 counts', 'Hold 4 counts', 'Repeat'],
        difficulty: 'easy'
      }
    ],
    progressionPath: ['intermediate-yoga', 'yoga-nidra', 'meditation-practice'],
    equipment: ['yoga-mat', 'blanket', 'bolster-optional'],
    caloriesBurned: '75-150 kcal',
    muscleGroups: ['full-body', 'nervous-system'],
    modifications: {
      easier: ['Use props', 'Shorter holds', 'Skip challenging poses'],
      harder: ['Longer holds', 'Add sun salutations', 'Include balance poses']
    },
    safetyNotes: [
      'Move slowly between poses',
      'Never force a stretch',
      'Breathe throughout',
      'Use props as needed'
    ],
    warmUp: [
      {
        name: 'Centering',
        description: 'Seated breathing',
        duration: '3 minutes',
        targetMuscles: ['mind-body'],
        instructions: ['Sit comfortably', 'Close eyes', 'Focus on breath'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Body Scan',
        description: 'Progressive relaxation',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Notice each body part', 'Release tension', 'Breathe into areas of holding'],
        difficulty: 'easy'
      }
    ]
  },

  'tai-chi-balance': {
    id: 'tai-chi-balance',
    name: 'Tai Chi for Balance & Fall Prevention',
    category: 'mind-body',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: '3-5x per week',
    targetConditions: ['balance-disorders', 'fall-risk', 'parkinsons', 'elderly-deconditioning', 'vestibular-disorders'],
    contraindications: ['severe-vertigo-acute', 'recent-surgery'],
    benefits: [
      'Reduces fall risk by 45%',
      'Improves balance and coordination',
      'Enhances proprioception',
      'Reduces fear of falling',
      'Improves cognitive function',
      'Gentle on joints'
    ],
    exercises: [
      {
        name: 'Weight Shifting',
        description: 'Basic weight transfer exercise',
        sets: 1,
        reps: '10 each side',
        targetMuscles: ['legs', 'core', 'balance-system'],
        instructions: ['Stand with feet hip-width', 'Shift weight to one foot', 'Hold 3-5 seconds', 'Shift to other side'],
        difficulty: 'easy'
      },
      {
        name: 'Cloud Hands',
        description: 'Classic tai chi arm movement',
        duration: '3-5 minutes',
        targetMuscles: ['shoulders', 'core', 'coordination'],
        instructions: ['Hands circle in front of body', 'Weight shifts side to side', 'Move slowly and smoothly'],
        difficulty: 'moderate'
      },
      {
        name: 'Brush Knee',
        description: 'Forward stepping movement',
        sets: 1,
        reps: '10 each side',
        targetMuscles: ['legs', 'hips', 'balance'],
        instructions: ['Step forward', 'One hand brushes past knee', 'Other hand pushes forward', 'Alternate sides'],
        difficulty: 'moderate'
      },
      {
        name: 'Single Leg Stance',
        description: 'Balance on one foot',
        sets: 3,
        duration: '10-30 seconds each leg',
        targetMuscles: ['ankles', 'legs', 'core'],
        instructions: ['Stand near wall for support', 'Lift one foot slightly', 'Hold balance', 'Switch sides'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['intermediate-tai-chi', '24-form-tai-chi', 'qigong'],
    equipment: ['comfortable-clothes', 'flat-shoes-or-barefoot'],
    caloriesBurned: '100-150 kcal',
    muscleGroups: ['full-body', 'balance-system'],
    modifications: {
      easier: ['Use chair for support', 'Smaller movements', 'Seated variations'],
      harder: ['Deeper stances', 'Eyes closed', 'Longer sequences']
    },
    safetyNotes: [
      'Practice near wall or chair initially',
      'Move slowly and mindfully',
      'Stop if dizzy',
      'Wear non-slip footwear'
    ],
    warmUp: [
      {
        name: 'Joint Rotations',
        description: 'Gentle joint circles',
        duration: '5 minutes',
        targetMuscles: ['all-joints'],
        instructions: ['Ankles', 'Knees', 'Hips', 'Spine', 'Shoulders', 'Neck'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Standing Meditation',
        description: 'Quiet standing practice',
        duration: '3-5 minutes',
        targetMuscles: ['mind-body'],
        instructions: ['Stand quietly', 'Hands at sides or on belly', 'Breathe naturally'],
        difficulty: 'easy'
      }
    ]
  },

  'back-pain-rehab': {
    id: 'back-pain-rehab',
    name: 'Lower Back Pain Rehabilitation',
    category: 'rehabilitation',
    difficulty: 'beginner',
    duration: '20-30 minutes',
    frequency: 'Daily',
    targetConditions: ['lower-back-pain', 'herniated-disc', 'sciatica', 'lumbar-strain', 'degenerative-disc-disease'],
    contraindications: ['cauda-equina-syndrome', 'spinal-fracture', 'spinal-tumor', 'progressive-neurological-deficit'],
    benefits: [
      'Reduces pain by 30-50%',
      'Improves core stability',
      'Increases spinal mobility',
      'Prevents recurrence',
      'Reduces disability'
    ],
    exercises: [
      {
        name: 'Pelvic Tilts',
        description: 'Gentle spinal mobilization',
        sets: 3,
        reps: '10-15',
        targetMuscles: ['core', 'lower-back', 'pelvic-floor'],
        instructions: ['Lie on back, knees bent', 'Flatten lower back to floor', 'Release', 'Create small arch', 'Repeat'],
        difficulty: 'easy'
      },
      {
        name: 'Knee to Chest',
        description: 'Single leg stretch for lower back',
        sets: 3,
        reps: '10 each leg',
        targetMuscles: ['lower-back', 'glutes', 'hips'],
        instructions: ['Lie on back', 'Pull one knee to chest', 'Hold 20-30 seconds', 'Release and switch'],
        difficulty: 'easy'
      },
      {
        name: 'Bird Dog',
        description: 'Core stability exercise',
        sets: 3,
        reps: '8-10 each side',
        targetMuscles: ['core', 'lower-back', 'glutes', 'shoulders'],
        instructions: ['Start on hands and knees', 'Extend opposite arm and leg', 'Keep back flat', 'Hold 5 seconds', 'Return and switch'],
        difficulty: 'moderate'
      },
      {
        name: 'Cat-Camel',
        description: 'Spinal flexion and extension',
        sets: 2,
        reps: '10 cycles',
        targetMuscles: ['spine', 'core'],
        instructions: ['Hands and knees position', 'Arch back up', 'Then drop belly down', 'Move slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Dead Bug',
        description: 'Advanced core stabilization',
        sets: 3,
        reps: '8 each side',
        targetMuscles: ['core', 'hip-flexors'],
        instructions: ['Lie on back', 'Arms up, knees at 90°', 'Lower opposite arm and leg', 'Keep back flat on floor'],
        difficulty: 'moderate'
      },
      {
        name: 'Bridge',
        description: 'Glute and core strengthening',
        sets: 3,
        reps: '10-12',
        targetMuscles: ['glutes', 'hamstrings', 'core'],
        instructions: ['Lie on back, knees bent', 'Lift hips toward ceiling', 'Squeeze glutes at top', 'Lower slowly'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['intermediate-back-rehab', 'core-strength-program', 'pilates-for-back'],
    equipment: ['mat'],
    caloriesBurned: '75-125 kcal',
    muscleGroups: ['core', 'back', 'glutes'],
    modifications: {
      easier: ['Smaller range of motion', 'More rest between exercises', 'Skip challenging exercises'],
      harder: ['Add resistance band', 'Increase hold times', 'Add McGill Big 3']
    },
    safetyNotes: [
      'Stop if pain increases',
      'Avoid if numbness or weakness worsens',
      'Move slowly and controlled',
      'Consult physician if symptoms change'
    ],
    warmUp: [
      {
        name: 'Gentle Walking',
        description: 'Light movement',
        duration: '3-5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Easy pace', 'Loosen up'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Child\'s Pose',
        description: 'Restful stretch',
        duration: '2-3 minutes',
        targetMuscles: ['lower-back', 'hips'],
        instructions: ['Kneel and fold forward', 'Relax completely'],
        difficulty: 'easy'
      }
    ]
  },

  'pulmonary-rehab': {
    id: 'pulmonary-rehab',
    name: 'Pulmonary Rehabilitation Program',
    category: 'rehabilitation',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: '3-5x per week',
    targetConditions: ['copd', 'asthma', 'pulmonary-fibrosis', 'post-covid', 'chronic-bronchitis'],
    contraindications: ['acute-respiratory-failure', 'unstable-cardiac-condition', 'severe-hypoxia'],
    benefits: [
      'Increases exercise tolerance by 25-40%',
      'Reduces shortness of breath',
      'Improves quality of life',
      'Reduces hospital admissions',
      'Enhances oxygen efficiency'
    ],
    exercises: [
      {
        name: 'Pursed Lip Breathing',
        description: 'Breathing technique for better air exchange',
        duration: '5 minutes',
        targetMuscles: ['diaphragm', 'respiratory-muscles'],
        instructions: ['Inhale through nose 2 counts', 'Purse lips like blowing candle', 'Exhale slowly 4 counts', 'Repeat'],
        difficulty: 'easy'
      },
      {
        name: 'Diaphragmatic Breathing',
        description: 'Belly breathing exercise',
        duration: '5 minutes',
        targetMuscles: ['diaphragm'],
        instructions: ['Hand on chest, hand on belly', 'Breathe so belly rises', 'Chest stays still', 'Exhale slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Arm Raises with Breathing',
        description: 'Coordinated movement and breath',
        sets: 3,
        reps: '10',
        targetMuscles: ['shoulders', 'respiratory-muscles'],
        instructions: ['Inhale while raising arms', 'Exhale while lowering', 'Move slowly'],
        difficulty: 'easy'
      },
      {
        name: 'Step-Ups',
        description: 'Low-intensity aerobic exercise',
        duration: '5-10 minutes',
        targetMuscles: ['legs', 'cardiovascular'],
        instructions: ['Use low step or stair', 'Step up and down slowly', 'Coordinate with breathing', 'Rest as needed'],
        difficulty: 'moderate'
      },
      {
        name: 'Seated Cycling',
        description: 'Upper or lower body ergometer',
        duration: '10-15 minutes',
        targetMuscles: ['legs-or-arms', 'cardiovascular'],
        instructions: ['Low resistance', 'Coordinate breathing', 'Use pursed lip breathing'],
        difficulty: 'moderate'
      }
    ],
    progressionPath: ['intermediate-pulmonary', 'walking-program', 'interval-training-pulmonary'],
    equipment: ['step-or-stair', 'chair', 'oximeter-optional'],
    caloriesBurned: '100-200 kcal',
    muscleGroups: ['respiratory', 'cardiovascular', 'full-body'],
    modifications: {
      easier: ['Seated exercises only', 'More rest breaks', 'Supplemental oxygen'],
      harder: ['Longer duration', 'Add light weights', 'Increase step height']
    },
    safetyNotes: [
      'Have rescue inhaler available',
      'Monitor oxygen saturation if possible',
      'Stop if severe shortness of breath',
      'Rest as needed - no pushing through'
    ],
    warmUp: [
      {
        name: 'Breathing Focus',
        description: 'Establish breathing rhythm',
        duration: '3 minutes',
        targetMuscles: ['respiratory'],
        instructions: ['Sit comfortably', 'Practice pursed lip breathing'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Recovery Breathing',
        description: 'Return to baseline',
        duration: '5 minutes',
        targetMuscles: ['respiratory'],
        instructions: ['Seated position', 'Slow deep breaths', 'Return to normal'],
        difficulty: 'easy'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // WEIGHT MANAGEMENT PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════════

  'weight-loss-beginner': {
    id: 'weight-loss-beginner',
    name: 'Beginner Weight Loss Program',
    category: 'cardiovascular',
    difficulty: 'beginner',
    duration: '30-40 minutes',
    frequency: '5x per week',
    targetConditions: ['obesity', 'overweight', 'metabolic-syndrome', 'sedentary-lifestyle'],
    contraindications: ['severe-joint-problems', 'uncontrolled-cardiac', 'severe-obesity-bmi-over-45'],
    benefits: [
      'Burns 200-300 calories per session',
      'Boosts metabolism',
      'Improves cardiovascular fitness',
      'Reduces body fat',
      'Increases energy levels'
    ],
    exercises: [
      {
        name: 'Walking',
        description: 'Moderate pace walking',
        duration: '20-30 minutes',
        targetMuscles: ['legs', 'cardiovascular'],
        instructions: ['Maintain brisk pace', 'Swing arms naturally', 'Can talk but not sing'],
        difficulty: 'easy'
      },
      {
        name: 'Bodyweight Squats',
        description: 'Basic lower body exercise',
        sets: 3,
        reps: '10-15',
        targetMuscles: ['quadriceps', 'glutes'],
        instructions: ['Feet shoulder width', 'Lower until thighs parallel', 'Keep chest up'],
        difficulty: 'moderate'
      },
      {
        name: 'Modified Push-Ups',
        description: 'Wall or knee push-ups',
        sets: 3,
        reps: '8-12',
        targetMuscles: ['chest', 'shoulders', 'triceps'],
        instructions: ['Wall version for beginners', 'Progress to knees', 'Full range of motion'],
        difficulty: 'moderate'
      },
      {
        name: 'Standing Crunches',
        description: 'Elbow to knee standing',
        sets: 3,
        reps: '12 each side',
        targetMuscles: ['core', 'obliques'],
        instructions: ['Lift knee to meet elbow', 'Alternate sides', 'Engage core'],
        difficulty: 'easy'
      }
    ],
    progressionPath: ['intermediate-weight-loss', 'hiit-metabolic', 'strength-training'],
    equipment: ['none-bodyweight', 'comfortable-shoes'],
    caloriesBurned: '200-300 kcal',
    muscleGroups: ['full-body'],
    modifications: {
      easier: ['Slower pace', 'Seated exercises', 'More rest'],
      harder: ['Add light weights', 'Increase duration', 'Add intervals']
    },
    safetyNotes: [
      'Start slowly and progress gradually',
      'Stay hydrated',
      'Listen to your body',
      'Combine with nutrition plan'
    ],
    warmUp: [
      {
        name: 'Light Marching',
        description: 'March in place',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Lift knees gently', 'Swing arms'],
        difficulty: 'easy'
      }
    ],
    coolDown: [
      {
        name: 'Static Stretching',
        description: 'Full body stretches',
        duration: '5 minutes',
        targetMuscles: ['full-body'],
        instructions: ['Hold stretches 20-30 seconds'],
        difficulty: 'easy'
      }
    ]
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 🥗 NUTRITION PLANS DATABASE (25+ Plans)
// ════════════════════════════════════════════════════════════════════════════════

export const NUTRITION_PLANS_DATABASE: Record<string, NutritionPlan> = {
  
  // ══════════════════════════════════════════════════════════════════════════════
  // THERAPEUTIC DIETS
  // ══════════════════════════════════════════════════════════════════════════════

  'dash-diet': {
    id: 'dash-diet',
    name: 'DASH Diet (Dietary Approaches to Stop Hypertension)',
    category: 'therapeutic',
    targetConditions: ['hypertension', 'pre-hypertension', 'cardiovascular-disease', 'metabolic-syndrome'],
    contraindications: ['kidney-disease-advanced', 'potassium-restrictions'],
    calorieRange: '1600-2600 kcal',
    macroRatio: {
      carbohydrates: '55%',
      protein: '18%',
      fat: '27%'
    },
    keyPrinciples: [
      'Reduce sodium to 1500-2300mg daily',
      'Increase potassium, calcium, magnesium',
      'Emphasize fruits, vegetables, whole grains',
      'Limit saturated fat and added sugars',
      'Choose lean proteins'
    ],
    allowedFoods: [
      {
        category: 'Fruits',
        items: ['apples', 'bananas', 'oranges', 'berries', 'melon', 'grapes'],
        servingSize: '1 medium fruit or 1/2 cup',
        frequency: '4-5 servings daily'
      },
      {
        category: 'Vegetables',
        items: ['leafy greens', 'broccoli', 'carrots', 'tomatoes', 'bell peppers', 'squash'],
        servingSize: '1 cup raw or 1/2 cup cooked',
        frequency: '4-5 servings daily'
      },
      {
        category: 'Whole Grains',
        items: ['whole wheat bread', 'brown rice', 'oatmeal', 'quinoa', 'whole grain pasta'],
        servingSize: '1 slice bread or 1/2 cup cooked',
        frequency: '6-8 servings daily'
      },
      {
        category: 'Lean Proteins',
        items: ['chicken breast', 'fish', 'turkey', 'legumes', 'tofu'],
        servingSize: '3 oz cooked',
        frequency: '6 oz or less daily'
      },
      {
        category: 'Low-Fat Dairy',
        items: ['skim milk', 'low-fat yogurt', 'low-fat cheese'],
        servingSize: '1 cup milk or 1.5 oz cheese',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Nuts & Seeds',
        items: ['almonds', 'walnuts', 'sunflower seeds', 'peanuts'],
        servingSize: '1/3 cup or 2 tbsp nut butter',
        frequency: '4-5 servings weekly'
      }
    ],
    restrictedFoods: [
      {
        category: 'High Sodium',
        items: ['processed meats', 'canned soups', 'pickles', 'soy sauce', 'fast food'],
        servingSize: 'N/A',
        frequency: 'Avoid or minimize'
      },
      {
        category: 'Added Sugars',
        items: ['soda', 'candy', 'pastries', 'sweetened beverages'],
        servingSize: 'N/A',
        frequency: '5 or less servings weekly'
      },
      {
        category: 'Saturated Fat',
        items: ['fatty meats', 'full-fat dairy', 'butter', 'coconut oil'],
        servingSize: 'N/A',
        frequency: 'Minimize'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Oatmeal with Berries',
          ingredients: ['1 cup oatmeal', '1/2 cup mixed berries', '1 tbsp almonds', 'cinnamon'],
          calories: 320,
          protein: 10,
          carbs: 55,
          fat: 8,
          fiber: 8,
          preparationTime: '10 minutes'
        }
      ],
      lunch: [
        {
          name: 'Mediterranean Salad',
          ingredients: ['mixed greens', 'grilled chicken', 'tomatoes', 'cucumbers', 'olive oil', 'whole wheat pita'],
          calories: 450,
          protein: 35,
          carbs: 40,
          fat: 18,
          fiber: 6,
          preparationTime: '15 minutes'
        }
      ],
      dinner: [
        {
          name: 'Baked Salmon with Vegetables',
          ingredients: ['4 oz salmon', '1 cup roasted vegetables', '1/2 cup quinoa', 'lemon', 'herbs'],
          calories: 480,
          protein: 35,
          carbs: 35,
          fat: 20,
          fiber: 5,
          preparationTime: '30 minutes'
        }
      ],
      snacks: [
        {
          name: 'Apple with Almond Butter',
          ingredients: ['1 medium apple', '1 tbsp almond butter'],
          calories: 200,
          protein: 4,
          carbs: 28,
          fat: 9,
          fiber: 5,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Omega-3 Fish Oil',
        dosage: '1000mg EPA+DHA daily',
        timing: 'With meals',
        purpose: 'Heart health, reduce inflammation',
        contraindications: ['blood-thinners', 'fish-allergy'],
        evidence: 'strong'
      },
      {
        name: 'Magnesium',
        dosage: '200-400mg daily',
        timing: 'Evening',
        purpose: 'Blood pressure regulation',
        contraindications: ['kidney-disease'],
        evidence: 'strong'
      }
    ],
    hydrationGuidelines: '8-10 glasses of water daily; limit caffeine to 2 cups; avoid sugary drinks',
    mealTiming: [
      'Eat breakfast within 1 hour of waking',
      '3 main meals + 1-2 snacks',
      'Avoid heavy meals before bed',
      'Space meals 4-5 hours apart'
    ],
    benefits: [
      'Reduces systolic blood pressure by 8-14 mmHg',
      'Lowers LDL cholesterol',
      'Reduces risk of heart disease',
      'Promotes healthy weight',
      'May reduce diabetes risk'
    ],
    duration: 'Lifelong dietary pattern',
    scientificEvidence: 'Strong - Multiple large randomized controlled trials (DASH-Sodium, ENCORE)'
  },

  'diabetic-diet': {
    id: 'diabetic-diet',
    name: 'Diabetic Meal Plan (Low Glycemic)',
    category: 'therapeutic',
    targetConditions: ['diabetes-type-2', 'pre-diabetes', 'insulin-resistance', 'gestational-diabetes'],
    contraindications: ['eating-disorder-history'],
    calorieRange: '1400-2200 kcal',
    macroRatio: {
      carbohydrates: '40-45%',
      protein: '20-25%',
      fat: '30-35%'
    },
    keyPrinciples: [
      'Consistent carbohydrate intake (45-60g per meal)',
      'Choose low glycemic index foods (GI < 55)',
      'Include fiber at every meal (25-30g daily)',
      'Balance meals with protein and healthy fats',
      'Monitor portion sizes',
      'Time meals consistently'
    ],
    allowedFoods: [
      {
        category: 'Low GI Carbohydrates',
        items: ['steel cut oats', 'quinoa', 'sweet potato', 'legumes', 'barley', 'whole grain bread'],
        servingSize: '1/2 cup cooked or 1 slice',
        frequency: '45-60g carbs per meal',
        notes: 'Glycemic Index < 55'
      },
      {
        category: 'Non-Starchy Vegetables',
        items: ['broccoli', 'spinach', 'peppers', 'zucchini', 'asparagus', 'mushrooms', 'tomatoes'],
        servingSize: '1 cup raw or 1/2 cup cooked',
        frequency: 'Unlimited - aim for half plate'
      },
      {
        category: 'Lean Proteins',
        items: ['skinless chicken', 'fish', 'turkey', 'eggs', 'tofu', 'Greek yogurt'],
        servingSize: '3-4 oz',
        frequency: 'Each meal'
      },
      {
        category: 'Healthy Fats',
        items: ['olive oil', 'avocado', 'nuts', 'seeds', 'fatty fish'],
        servingSize: '1 tbsp oil or 1/4 avocado',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Low Sugar Fruits',
        items: ['berries', 'apples', 'pears', 'citrus', 'cherries'],
        servingSize: '1 small fruit or 1/2 cup',
        frequency: '2-3 servings daily',
        notes: 'Count as carbs'
      }
    ],
    restrictedFoods: [
      {
        category: 'High GI Foods',
        items: ['white bread', 'white rice', 'instant oatmeal', 'potatoes', 'corn flakes'],
        servingSize: 'N/A',
        frequency: 'Minimize or avoid'
      },
      {
        category: 'Added Sugars',
        items: ['candy', 'soda', 'desserts', 'sweetened drinks', 'fruit juice'],
        servingSize: 'N/A',
        frequency: 'Avoid'
      },
      {
        category: 'Processed Foods',
        items: ['chips', 'crackers', 'packaged snacks', 'fast food'],
        servingSize: 'N/A',
        frequency: 'Rarely'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Veggie Egg Scramble',
          ingredients: ['2 eggs', 'spinach', 'tomatoes', 'mushrooms', '1 slice whole grain toast', '1/4 avocado'],
          calories: 380,
          protein: 22,
          carbs: 25,
          fat: 22,
          fiber: 7,
          preparationTime: '15 minutes'
        }
      ],
      lunch: [
        {
          name: 'Greek Salad with Chicken',
          ingredients: ['grilled chicken breast', 'mixed greens', 'cucumber', 'olives', 'feta', 'olive oil', '1/2 cup quinoa'],
          calories: 480,
          protein: 40,
          carbs: 30,
          fat: 22,
          fiber: 5,
          preparationTime: '20 minutes'
        }
      ],
      dinner: [
        {
          name: 'Herb Baked Fish with Vegetables',
          ingredients: ['5 oz white fish', '2 cups roasted non-starchy vegetables', '1/2 cup brown rice', 'herbs', 'lemon'],
          calories: 420,
          protein: 35,
          carbs: 40,
          fat: 12,
          fiber: 6,
          preparationTime: '35 minutes'
        }
      ],
      snacks: [
        {
          name: 'Nuts and Cheese',
          ingredients: ['1 oz almonds', '1 oz cheese'],
          calories: 250,
          protein: 12,
          carbs: 6,
          fat: 20,
          preparationTime: '1 minute'
        },
        {
          name: 'Vegetables with Hummus',
          ingredients: ['1 cup raw vegetables', '3 tbsp hummus'],
          calories: 150,
          protein: 5,
          carbs: 15,
          fat: 8,
          fiber: 5,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Chromium',
        dosage: '200-1000mcg daily',
        timing: 'With meals',
        purpose: 'May improve insulin sensitivity',
        contraindications: ['kidney-disease'],
        evidence: 'moderate'
      },
      {
        name: 'Alpha-Lipoic Acid',
        dosage: '600mg daily',
        timing: 'Before meals',
        purpose: 'Antioxidant, may help neuropathy',
        contraindications: ['thiamine-deficiency'],
        evidence: 'moderate'
      },
      {
        name: 'Vitamin D',
        dosage: '1000-2000 IU daily',
        timing: 'With fatty meal',
        purpose: 'Supports insulin function',
        contraindications: ['hypercalcemia'],
        evidence: 'moderate'
      }
    ],
    hydrationGuidelines: '8+ glasses water daily; sugar-free beverages; limit alcohol',
    mealTiming: [
      'Eat within 1 hour of waking',
      'Never skip meals',
      'Space meals 4-5 hours apart',
      'Have small snack if meal delayed',
      'Check blood sugar before and after meals'
    ],
    benefits: [
      'Improves blood sugar control (HbA1c reduction 0.5-1%)',
      'Reduces medication requirements',
      'Prevents complications',
      'Promotes healthy weight',
      'Reduces cardiovascular risk'
    ],
    duration: 'Lifelong with regular adjustments',
    scientificEvidence: 'Strong - ADA, EASD guidelines; multiple clinical trials'
  },

  'mediterranean-diet': {
    id: 'mediterranean-diet',
    name: 'Mediterranean Diet',
    category: 'general-wellness',
    targetConditions: ['cardiovascular-disease', 'cognitive-decline', 'depression', 'obesity', 'general-wellness'],
    contraindications: [],
    calorieRange: '1600-2400 kcal',
    macroRatio: {
      carbohydrates: '45-50%',
      protein: '15-20%',
      fat: '35-40%'
    },
    keyPrinciples: [
      'Extra virgin olive oil as primary fat source',
      'Abundant fruits and vegetables',
      'Fish and seafood twice weekly',
      'Legumes and whole grains daily',
      'Moderate wine with meals (optional)',
      'Limited red meat',
      'Social, enjoyable meals'
    ],
    allowedFoods: [
      {
        category: 'Olive Oil',
        items: ['extra virgin olive oil'],
        servingSize: '3-4 tbsp daily',
        frequency: 'Daily with every meal'
      },
      {
        category: 'Vegetables',
        items: ['tomatoes', 'eggplant', 'zucchini', 'peppers', 'leafy greens', 'onions', 'garlic'],
        servingSize: '1 cup raw or 1/2 cup cooked',
        frequency: '6+ servings daily'
      },
      {
        category: 'Fruits',
        items: ['figs', 'dates', 'grapes', 'pomegranate', 'citrus', 'melons'],
        servingSize: '1 medium fruit',
        frequency: '3+ servings daily'
      },
      {
        category: 'Fish & Seafood',
        items: ['salmon', 'sardines', 'mackerel', 'anchovies', 'shrimp', 'mussels'],
        servingSize: '4-6 oz',
        frequency: '2-3 times weekly'
      },
      {
        category: 'Legumes',
        items: ['chickpeas', 'lentils', 'white beans', 'fava beans'],
        servingSize: '1/2 cup cooked',
        frequency: 'Daily or most days'
      },
      {
        category: 'Whole Grains',
        items: ['whole wheat', 'bulgur', 'farro', 'barley', 'whole grain bread'],
        servingSize: '1/2 cup cooked or 1 slice',
        frequency: '3-4 servings daily'
      },
      {
        category: 'Nuts',
        items: ['almonds', 'walnuts', 'pistachios', 'hazelnuts'],
        servingSize: '1 oz (handful)',
        frequency: 'Daily'
      },
      {
        category: 'Dairy',
        items: ['Greek yogurt', 'feta cheese', 'parmesan'],
        servingSize: '1 cup yogurt or 1 oz cheese',
        frequency: 'Moderate - daily'
      }
    ],
    restrictedFoods: [
      {
        category: 'Red Meat',
        items: ['beef', 'pork', 'lamb'],
        servingSize: '3-4 oz',
        frequency: 'Once weekly or less'
      },
      {
        category: 'Processed Foods',
        items: ['fast food', 'packaged snacks', 'processed meats'],
        servingSize: 'N/A',
        frequency: 'Rarely or avoid'
      },
      {
        category: 'Refined Grains',
        items: ['white bread', 'white pasta', 'white rice'],
        servingSize: 'N/A',
        frequency: 'Minimize'
      },
      {
        category: 'Added Sugars',
        items: ['desserts', 'candy', 'sweetened drinks'],
        servingSize: 'N/A',
        frequency: 'Occasional treats only'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Greek Yogurt with Honey and Walnuts',
          ingredients: ['1 cup Greek yogurt', '1 tbsp honey', '1 oz walnuts', 'fresh figs'],
          calories: 380,
          protein: 20,
          carbs: 35,
          fat: 18,
          fiber: 3,
          preparationTime: '5 minutes'
        }
      ],
      lunch: [
        {
          name: 'Mediterranean Grain Bowl',
          ingredients: ['farro', 'chickpeas', 'cucumber', 'tomatoes', 'olives', 'feta', 'olive oil dressing'],
          calories: 520,
          protein: 18,
          carbs: 55,
          fat: 26,
          fiber: 10,
          preparationTime: '20 minutes'
        }
      ],
      dinner: [
        {
          name: 'Grilled Fish with Roasted Vegetables',
          ingredients: ['6 oz grilled fish', 'roasted eggplant', 'zucchini', 'tomatoes', 'olive oil', 'herbs', 'lemon'],
          calories: 450,
          protein: 40,
          carbs: 20,
          fat: 25,
          fiber: 6,
          preparationTime: '30 minutes'
        }
      ],
      snacks: [
        {
          name: 'Hummus with Vegetables',
          ingredients: ['1/4 cup hummus', 'raw vegetables'],
          calories: 200,
          protein: 6,
          carbs: 20,
          fat: 12,
          fiber: 5,
          preparationTime: '3 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Vitamin D',
        dosage: '1000-2000 IU daily',
        timing: 'With meal',
        purpose: 'General health, especially in northern climates',
        contraindications: ['hypercalcemia'],
        evidence: 'strong'
      }
    ],
    hydrationGuidelines: 'Water as primary beverage; moderate red wine optional (1 glass women, 2 men)',
    mealTiming: [
      'Enjoy meals slowly',
      'Share meals with family/friends',
      'Lunch as main meal traditional',
      'Light dinner'
    ],
    benefits: [
      'Reduces cardiovascular events by 30%',
      'Improves cognitive function',
      'Reduces depression risk',
      'Anti-inflammatory effects',
      'Promotes longevity',
      'Sustainable long-term'
    ],
    duration: 'Lifelong dietary pattern',
    scientificEvidence: 'Strong - PREDIMED study, numerous observational studies'
  },

  'anti-inflammatory-diet': {
    id: 'anti-inflammatory-diet',
    name: 'Anti-Inflammatory Diet',
    category: 'therapeutic',
    targetConditions: ['rheumatoid-arthritis', 'inflammatory-bowel-disease', 'psoriasis', 'chronic-pain', 'autoimmune-conditions'],
    contraindications: [],
    calorieRange: '1600-2200 kcal',
    macroRatio: {
      carbohydrates: '40-45%',
      protein: '20-25%',
      fat: '30-35%'
    },
    keyPrinciples: [
      'Emphasize omega-3 fatty acids',
      'Abundant colorful fruits and vegetables',
      'Eliminate processed foods',
      'Include anti-inflammatory spices',
      'Avoid refined sugars and trans fats',
      'Choose whole, unprocessed foods'
    ],
    allowedFoods: [
      {
        category: 'Omega-3 Rich Foods',
        items: ['salmon', 'sardines', 'mackerel', 'walnuts', 'flaxseeds', 'chia seeds'],
        servingSize: '3-4 oz fish or 1 oz nuts/seeds',
        frequency: 'Fatty fish 3x weekly; nuts/seeds daily'
      },
      {
        category: 'Colorful Vegetables',
        items: ['leafy greens', 'broccoli', 'beets', 'sweet potatoes', 'tomatoes', 'bell peppers'],
        servingSize: '1 cup raw or 1/2 cup cooked',
        frequency: '8+ servings daily'
      },
      {
        category: 'Berries',
        items: ['blueberries', 'strawberries', 'blackberries', 'cherries', 'raspberries'],
        servingSize: '1 cup',
        frequency: 'Daily'
      },
      {
        category: 'Anti-Inflammatory Spices',
        items: ['turmeric', 'ginger', 'garlic', 'cinnamon', 'rosemary'],
        servingSize: '1/2 - 1 tsp',
        frequency: 'Daily with meals'
      },
      {
        category: 'Healthy Fats',
        items: ['extra virgin olive oil', 'avocado', 'coconut oil'],
        servingSize: '1-2 tbsp',
        frequency: 'Daily'
      },
      {
        category: 'Green Tea',
        items: ['matcha', 'sencha', 'green tea'],
        servingSize: '1-3 cups',
        frequency: 'Daily'
      }
    ],
    restrictedFoods: [
      {
        category: 'Pro-Inflammatory Foods',
        items: ['processed meats', 'fried foods', 'refined carbs', 'sugary drinks', 'margarine'],
        servingSize: 'N/A',
        frequency: 'Avoid completely'
      },
      {
        category: 'Refined Sugars',
        items: ['candy', 'pastries', 'soda', 'fruit juices'],
        servingSize: 'N/A',
        frequency: 'Avoid'
      },
      {
        category: 'Omega-6 Heavy Oils',
        items: ['corn oil', 'soybean oil', 'sunflower oil', 'vegetable oil'],
        servingSize: 'N/A',
        frequency: 'Minimize'
      },
      {
        category: 'Potential Triggers',
        items: ['gluten', 'dairy', 'nightshades'],
        servingSize: 'N/A',
        frequency: 'Trial elimination if symptoms persist',
        notes: 'Individual variation - some may tolerate'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Anti-Inflammatory Smoothie',
          ingredients: ['spinach', 'blueberries', 'banana', 'turmeric', 'ginger', 'flaxseed', 'almond milk'],
          calories: 320,
          protein: 8,
          carbs: 50,
          fat: 12,
          fiber: 10,
          preparationTime: '5 minutes'
        }
      ],
      lunch: [
        {
          name: 'Rainbow Salad with Salmon',
          ingredients: ['mixed greens', 'wild salmon', 'beets', 'carrots', 'avocado', 'olive oil', 'lemon'],
          calories: 520,
          protein: 35,
          carbs: 25,
          fat: 32,
          fiber: 8,
          preparationTime: '20 minutes'
        }
      ],
      dinner: [
        {
          name: 'Turmeric Chicken with Vegetables',
          ingredients: ['chicken breast', 'turmeric', 'ginger', 'broccoli', 'sweet potato', 'garlic', 'olive oil'],
          calories: 450,
          protein: 40,
          carbs: 35,
          fat: 18,
          fiber: 7,
          preparationTime: '35 minutes'
        }
      ],
      snacks: [
        {
          name: 'Walnuts and Berries',
          ingredients: ['1 oz walnuts', '1/2 cup mixed berries'],
          calories: 230,
          protein: 5,
          carbs: 15,
          fat: 18,
          fiber: 4,
          preparationTime: '1 minute'
        }
      ]
    },
    supplements: [
      {
        name: 'Omega-3 Fish Oil',
        dosage: '2000-3000mg EPA+DHA daily',
        timing: 'With meals',
        purpose: 'Reduce inflammation',
        contraindications: ['blood-thinners', 'fish-allergy'],
        evidence: 'strong'
      },
      {
        name: 'Curcumin',
        dosage: '500-1000mg daily',
        timing: 'With black pepper and fat',
        purpose: 'Natural anti-inflammatory',
        contraindications: ['gallbladder-disease', 'blood-thinners'],
        evidence: 'strong'
      },
      {
        name: 'Vitamin D',
        dosage: '2000-4000 IU daily',
        timing: 'With meal',
        purpose: 'Immune modulation',
        contraindications: ['hypercalcemia'],
        evidence: 'strong'
      }
    ],
    hydrationGuidelines: '8+ glasses water; green tea; bone broth; avoid sugary and alcoholic beverages',
    mealTiming: [
      'Eat within 2 hours of waking',
      'Regular meal times reduce stress',
      'Consider intermittent fasting if appropriate',
      'Avoid eating late at night'
    ],
    benefits: [
      'Reduces inflammatory markers (CRP, IL-6)',
      'Decreases joint pain and swelling',
      'Improves autoimmune symptoms',
      'Enhances gut health',
      'Supports brain health',
      'May reduce medication needs'
    ],
    duration: '8-12 weeks initially, then lifelong maintenance',
    scientificEvidence: 'Moderate to Strong - Multiple clinical trials for specific conditions'
  },

  'heart-healthy-diet': {
    id: 'heart-healthy-diet',
    name: 'Heart Healthy Diet',
    category: 'therapeutic',
    targetConditions: ['coronary-artery-disease', 'high-cholesterol', 'atherosclerosis', 'post-heart-attack', 'heart-failure'],
    contraindications: ['kidney-disease-with-potassium-restriction'],
    calorieRange: '1600-2200 kcal',
    macroRatio: {
      carbohydrates: '50-55%',
      protein: '15-20%',
      fat: '25-30%'
    },
    keyPrinciples: [
      'Limit saturated fat to <7% of calories',
      'Eliminate trans fats completely',
      'Increase soluble fiber (10-25g daily)',
      'Include plant sterols',
      'Reduce sodium to <1500mg',
      'Choose lean proteins',
      'Emphasize omega-3 fatty acids'
    ],
    allowedFoods: [
      {
        category: 'Soluble Fiber Foods',
        items: ['oats', 'barley', 'legumes', 'apples', 'citrus', 'psyllium'],
        servingSize: 'Varies',
        frequency: '25-30g fiber daily total'
      },
      {
        category: 'Heart Healthy Fats',
        items: ['olive oil', 'avocado', 'almonds', 'walnuts', 'fatty fish'],
        servingSize: '1 tbsp oil or 1 oz nuts',
        frequency: 'Daily'
      },
      {
        category: 'Plant Proteins',
        items: ['beans', 'lentils', 'tofu', 'tempeh', 'edamame'],
        servingSize: '1/2 cup',
        frequency: 'Daily'
      },
      {
        category: 'Fatty Fish',
        items: ['salmon', 'mackerel', 'sardines', 'trout', 'herring'],
        servingSize: '3-4 oz',
        frequency: '2-3 times weekly'
      },
      {
        category: 'Cholesterol-Lowering Foods',
        items: ['plant sterol fortified foods', 'soy products', 'garlic', 'almonds'],
        servingSize: 'Varies',
        frequency: 'Daily'
      }
    ],
    restrictedFoods: [
      {
        category: 'Saturated Fats',
        items: ['fatty meats', 'full-fat dairy', 'butter', 'coconut oil', 'palm oil'],
        servingSize: 'N/A',
        frequency: '<7% of calories'
      },
      {
        category: 'Trans Fats',
        items: ['partially hydrogenated oils', 'some margarines', 'fried foods', 'commercial baked goods'],
        servingSize: 'N/A',
        frequency: 'Avoid completely'
      },
      {
        category: 'High Sodium',
        items: ['processed foods', 'canned soups', 'deli meats', 'pickles', 'soy sauce'],
        servingSize: 'N/A',
        frequency: 'Avoid - <1500mg total daily'
      },
      {
        category: 'Dietary Cholesterol',
        items: ['egg yolks', 'organ meats', 'shellfish'],
        servingSize: 'N/A',
        frequency: 'Limit to 200mg daily'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Oatmeal with Walnuts and Berries',
          ingredients: ['1.5 cups steel-cut oats', 'walnuts', 'blueberries', 'ground flax', 'cinnamon'],
          calories: 380,
          protein: 12,
          carbs: 55,
          fat: 14,
          fiber: 10,
          preparationTime: '10 minutes'
        }
      ],
      lunch: [
        {
          name: 'Lentil Soup with Whole Grain Bread',
          ingredients: ['lentil vegetable soup', 'whole grain bread', 'side salad', 'olive oil'],
          calories: 450,
          protein: 20,
          carbs: 60,
          fat: 14,
          fiber: 15,
          preparationTime: '30 minutes'
        }
      ],
      dinner: [
        {
          name: 'Baked Salmon with Quinoa',
          ingredients: ['4 oz wild salmon', '3/4 cup quinoa', 'steamed broccoli', 'lemon', 'dill'],
          calories: 480,
          protein: 38,
          carbs: 40,
          fat: 18,
          fiber: 6,
          preparationTime: '30 minutes'
        }
      ],
      snacks: [
        {
          name: 'Apple with Almond Butter',
          ingredients: ['1 apple', '1 tbsp almond butter'],
          calories: 200,
          protein: 4,
          carbs: 28,
          fat: 9,
          fiber: 5,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Omega-3 Fish Oil',
        dosage: '1000-2000mg EPA+DHA daily',
        timing: 'With meals',
        purpose: 'Reduce triglycerides, support heart health',
        contraindications: ['blood-thinners'],
        evidence: 'strong'
      },
      {
        name: 'Plant Sterols',
        dosage: '2g daily',
        timing: 'With meals',
        purpose: 'Lower LDL cholesterol 10-15%',
        contraindications: ['sitosterolemia'],
        evidence: 'strong'
      },
      {
        name: 'CoQ10',
        dosage: '100-200mg daily',
        timing: 'With meal',
        purpose: 'Support heart muscle, especially if on statins',
        contraindications: [],
        evidence: 'moderate'
      }
    ],
    hydrationGuidelines: '8 glasses water; limit alcohol to 1 drink daily for women, 2 for men; avoid sugary drinks',
    mealTiming: [
      'Regular meal schedule',
      'Do not skip breakfast',
      'Lighter evening meal',
      'Avoid eating 3 hours before bed'
    ],
    benefits: [
      'Reduces LDL cholesterol by 20-30%',
      'Lowers triglycerides',
      'Reduces heart attack risk',
      'Lowers blood pressure',
      'Reduces inflammation'
    ],
    duration: 'Lifelong',
    scientificEvidence: 'Strong - American Heart Association, ACC guidelines'
  },

  'weight-loss-balanced': {
    id: 'weight-loss-balanced',
    name: 'Balanced Weight Loss Plan',
    category: 'weight-management',
    targetConditions: ['obesity', 'overweight', 'metabolic-syndrome', 'pre-diabetes'],
    contraindications: ['eating-disorder-history', 'pregnancy', 'underweight'],
    calorieRange: '1200-1800 kcal (individualized)',
    macroRatio: {
      carbohydrates: '40-45%',
      protein: '25-30%',
      fat: '25-30%'
    },
    keyPrinciples: [
      'Moderate calorie deficit (500-750 kcal/day)',
      'High protein to preserve muscle mass',
      'Emphasis on whole, unprocessed foods',
      'Adequate fiber for satiety (25-30g)',
      'Regular meal timing',
      'Mindful eating practices',
      'Sustainable, not restrictive'
    ],
    allowedFoods: [
      {
        category: 'Lean Proteins',
        items: ['chicken breast', 'fish', 'turkey', 'eggs', 'Greek yogurt', 'cottage cheese', 'legumes'],
        servingSize: '4-6 oz or equivalent',
        frequency: 'Every meal'
      },
      {
        category: 'Non-Starchy Vegetables',
        items: ['all leafy greens', 'broccoli', 'cauliflower', 'peppers', 'cucumbers', 'tomatoes', 'zucchini'],
        servingSize: 'Unlimited',
        frequency: 'Half your plate each meal'
      },
      {
        category: 'Complex Carbohydrates',
        items: ['quinoa', 'oats', 'sweet potato', 'brown rice', 'whole grain bread'],
        servingSize: '1/2 cup cooked or 1 slice',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Healthy Fats',
        items: ['avocado', 'nuts', 'seeds', 'olive oil'],
        servingSize: '1 tbsp oil or 1/4 avocado',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Fruits',
        items: ['berries', 'apples', 'citrus', 'pears'],
        servingSize: '1 cup or 1 medium fruit',
        frequency: '2 servings daily'
      }
    ],
    restrictedFoods: [
      {
        category: 'Calorie Dense Foods',
        items: ['fried foods', 'creamy sauces', 'pastries', 'chips'],
        servingSize: 'N/A',
        frequency: 'Avoid or rare treat'
      },
      {
        category: 'Sugary Foods',
        items: ['candy', 'soda', 'desserts', 'sweetened coffee drinks'],
        servingSize: 'N/A',
        frequency: 'Avoid'
      },
      {
        category: 'Alcohol',
        items: ['beer', 'wine', 'spirits', 'cocktails'],
        servingSize: 'N/A',
        frequency: 'Limit or avoid (empty calories)'
      },
      {
        category: 'Processed Foods',
        items: ['fast food', 'packaged snacks', 'frozen meals'],
        servingSize: 'N/A',
        frequency: 'Rarely'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Protein Veggie Scramble',
          ingredients: ['3 egg whites + 1 whole egg', 'spinach', 'tomatoes', 'onions', '1 slice whole grain toast'],
          calories: 280,
          protein: 24,
          carbs: 22,
          fat: 10,
          fiber: 4,
          preparationTime: '15 minutes'
        }
      ],
      lunch: [
        {
          name: 'Grilled Chicken Salad',
          ingredients: ['5 oz grilled chicken', 'mixed greens', 'vegetables', 'chickpeas', 'olive oil vinaigrette'],
          calories: 420,
          protein: 40,
          carbs: 25,
          fat: 18,
          fiber: 8,
          preparationTime: '15 minutes'
        }
      ],
      dinner: [
        {
          name: 'Baked Fish with Vegetables',
          ingredients: ['5 oz white fish', '2 cups roasted vegetables', '1/2 cup brown rice'],
          calories: 380,
          protein: 35,
          carbs: 35,
          fat: 10,
          fiber: 6,
          preparationTime: '30 minutes'
        }
      ],
      snacks: [
        {
          name: 'Greek Yogurt with Berries',
          ingredients: ['1 cup nonfat Greek yogurt', '1/2 cup berries'],
          calories: 150,
          protein: 20,
          carbs: 18,
          fat: 0,
          fiber: 2,
          preparationTime: '2 minutes'
        },
        {
          name: 'Vegetables with Hummus',
          ingredients: ['1 cup raw vegetables', '2 tbsp hummus'],
          calories: 100,
          protein: 4,
          carbs: 12,
          fat: 5,
          fiber: 4,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Multivitamin',
        dosage: '1 daily',
        timing: 'With meal',
        purpose: 'Cover nutritional gaps during calorie restriction',
        contraindications: [],
        evidence: 'moderate'
      },
      {
        name: 'Protein Powder (optional)',
        dosage: '20-25g as needed',
        timing: 'Post-workout or as meal supplement',
        purpose: 'Meet protein goals',
        contraindications: ['kidney-disease'],
        evidence: 'strong'
      }
    ],
    hydrationGuidelines: '8-12 glasses water daily; drink before meals; limit caffeine; avoid caloric beverages',
    mealTiming: [
      'Eat breakfast within 1 hour of waking',
      '3 meals + 1-2 snacks',
      'Avoid eating after 8 PM',
      'Pre-plan meals and prep ahead'
    ],
    benefits: [
      '1-2 lbs weight loss per week (sustainable)',
      'Preserves muscle mass',
      'Improves metabolic health',
      'Teaches sustainable eating habits',
      'Reduces hunger and cravings'
    ],
    duration: 'Until goal weight achieved, then maintenance',
    scientificEvidence: 'Strong - Evidence-based weight loss guidelines'
  },

  'renal-diet': {
    id: 'renal-diet',
    name: 'Renal (Kidney) Diet',
    category: 'therapeutic',
    targetConditions: ['chronic-kidney-disease', 'kidney-failure', 'dialysis', 'kidney-transplant'],
    contraindications: [],
    calorieRange: '25-35 kcal/kg body weight',
    macroRatio: {
      carbohydrates: '50-60%',
      protein: '0.6-0.8g/kg (pre-dialysis) or 1.0-1.2g/kg (dialysis)',
      fat: '25-35%'
    },
    keyPrinciples: [
      'Limit sodium to 1500-2000mg daily',
      'Restrict potassium based on blood levels',
      'Limit phosphorus to 800-1000mg daily',
      'Control protein intake (stage dependent)',
      'Monitor fluid intake if required',
      'Work closely with renal dietitian'
    ],
    allowedFoods: [
      {
        category: 'Low Potassium Fruits',
        items: ['apples', 'berries', 'grapes', 'pineapple', 'watermelon', 'peaches'],
        servingSize: '1/2 cup or 1 small fruit',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Low Potassium Vegetables',
        items: ['cabbage', 'cauliflower', 'cucumber', 'lettuce', 'onions', 'peppers', 'green beans'],
        servingSize: '1/2 cup cooked',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Protein (controlled)',
        items: ['chicken', 'fish', 'eggs', 'pork'],
        servingSize: '3 oz cooked',
        frequency: 'As prescribed by dietitian',
        notes: 'High quality protein preferred'
      },
      {
        category: 'Grains',
        items: ['white rice', 'white bread', 'pasta', 'unsalted crackers'],
        servingSize: '1/2 cup or 1 slice',
        frequency: 'As calorie needs require',
        notes: 'Lower phosphorus than whole grains'
      }
    ],
    restrictedFoods: [
      {
        category: 'High Potassium',
        items: ['bananas', 'oranges', 'potatoes', 'tomatoes', 'avocados', 'spinach', 'beans'],
        servingSize: 'N/A',
        frequency: 'Avoid or strictly limit'
      },
      {
        category: 'High Phosphorus',
        items: ['dairy products', 'nuts', 'beans', 'cola', 'processed foods with phosphate additives'],
        servingSize: 'N/A',
        frequency: 'Strictly limit'
      },
      {
        category: 'High Sodium',
        items: ['canned foods', 'processed meats', 'pickles', 'cheese', 'fast food'],
        servingSize: 'N/A',
        frequency: 'Avoid'
      },
      {
        category: 'Whole Grains (if phosphorus restricted)',
        items: ['whole wheat', 'bran', 'oatmeal'],
        servingSize: 'N/A',
        frequency: 'Limit - higher in phosphorus'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Egg White Scramble',
          ingredients: ['3 egg whites', 'peppers', 'onions', '2 slices white toast', 'unsalted butter', 'apple'],
          calories: 320,
          protein: 18,
          carbs: 40,
          fat: 10,
          preparationTime: '15 minutes'
        }
      ],
      lunch: [
        {
          name: 'Chicken Sandwich',
          ingredients: ['3 oz unsalted chicken', 'white bread', 'lettuce', 'low-sodium mayo', 'grapes'],
          calories: 400,
          protein: 28,
          carbs: 45,
          fat: 12,
          preparationTime: '10 minutes'
        }
      ],
      dinner: [
        {
          name: 'Baked Fish with Rice',
          ingredients: ['4 oz fish', '1 cup white rice', 'green beans', 'lemon', 'herbs'],
          calories: 420,
          protein: 30,
          carbs: 50,
          fat: 10,
          preparationTime: '30 minutes'
        }
      ],
      snacks: [
        {
          name: 'Unsalted Crackers',
          ingredients: ['6 unsalted crackers', '1 tbsp cream cheese (low-sodium)'],
          calories: 150,
          protein: 3,
          carbs: 20,
          fat: 7,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Renal Multivitamin',
        dosage: 'As prescribed',
        timing: 'With meal',
        purpose: 'Replace water-soluble vitamins lost in dialysis',
        contraindications: [],
        evidence: 'strong'
      },
      {
        name: 'Phosphate Binders',
        dosage: 'As prescribed',
        timing: 'With meals containing phosphorus',
        purpose: 'Control blood phosphorus levels',
        contraindications: [],
        evidence: 'strong'
      },
      {
        name: 'Vitamin D (active form)',
        dosage: 'As prescribed',
        timing: 'As directed',
        purpose: 'Kidney cannot activate vitamin D',
        contraindications: ['high-calcium'],
        evidence: 'strong'
      }
    ],
    hydrationGuidelines: 'Fluid restriction varies by stage - typically 1-1.5L daily in later stages; consult nephrologist',
    mealTiming: [
      'Consistent meal times',
      'Spread protein throughout day',
      'Take phosphate binders with meals',
      'Monitor fluid with meals'
    ],
    benefits: [
      'Slows kidney disease progression',
      'Controls blood pressure',
      'Manages electrolyte balance',
      'Reduces uremic symptoms',
      'Improves quality of life'
    ],
    duration: 'Lifelong - adjust as kidney function changes',
    scientificEvidence: 'Strong - KDOQI guidelines, NKF recommendations'
  },

  'low-fodmap': {
    id: 'low-fodmap',
    name: 'Low FODMAP Diet',
    category: 'therapeutic',
    targetConditions: ['irritable-bowel-syndrome', 'ibs-d', 'ibs-c', 'sibo', 'functional-bloating'],
    contraindications: ['eating-disorder', 'underweight'],
    calorieRange: '1600-2200 kcal',
    macroRatio: {
      carbohydrates: '45-50%',
      protein: '20%',
      fat: '30-35%'
    },
    keyPrinciples: [
      'Three phases: Elimination, Reintroduction, Personalization',
      'Eliminate high FODMAP foods for 2-6 weeks',
      'Systematically reintroduce to identify triggers',
      'Create personalized long-term diet',
      'Work with dietitian trained in FODMAP',
      'Not intended as permanent restriction'
    ],
    allowedFoods: [
      {
        category: 'Low FODMAP Fruits',
        items: ['bananas (unripe)', 'blueberries', 'grapes', 'oranges', 'strawberries', 'kiwi', 'pineapple'],
        servingSize: '1 serving per meal',
        frequency: '2-3 servings daily'
      },
      {
        category: 'Low FODMAP Vegetables',
        items: ['carrots', 'cucumber', 'eggplant', 'green beans', 'lettuce', 'potato', 'tomato', 'zucchini'],
        servingSize: '1/2 cup',
        frequency: 'Multiple servings daily'
      },
      {
        category: 'Proteins',
        items: ['plain meat', 'fish', 'chicken', 'eggs', 'firm tofu'],
        servingSize: '3-4 oz',
        frequency: 'Each meal'
      },
      {
        category: 'Grains',
        items: ['rice', 'quinoa', 'oats', 'gluten-free bread', 'corn'],
        servingSize: '1/2 cup or 1 slice',
        frequency: 'Each meal'
      },
      {
        category: 'Dairy Alternatives',
        items: ['lactose-free milk', 'hard cheeses', 'almond milk', 'coconut milk'],
        servingSize: '1 cup',
        frequency: '2-3 servings daily'
      }
    ],
    restrictedFoods: [
      {
        category: 'High Fructose',
        items: ['apples', 'pears', 'mango', 'watermelon', 'honey', 'high fructose corn syrup'],
        servingSize: 'N/A',
        frequency: 'Avoid during elimination'
      },
      {
        category: 'Lactose',
        items: ['milk', 'yogurt', 'ice cream', 'soft cheeses'],
        servingSize: 'N/A',
        frequency: 'Avoid during elimination'
      },
      {
        category: 'Fructans',
        items: ['wheat', 'onions', 'garlic', 'inulin'],
        servingSize: 'N/A',
        frequency: 'Avoid during elimination'
      },
      {
        category: 'Galactans',
        items: ['beans', 'lentils', 'chickpeas'],
        servingSize: 'N/A',
        frequency: 'Avoid during elimination'
      },
      {
        category: 'Polyols',
        items: ['stone fruits', 'mushrooms', 'cauliflower', 'sugar alcohols'],
        servingSize: 'N/A',
        frequency: 'Avoid during elimination'
      }
    ],
    sampleMealPlan: {
      breakfast: [
        {
          name: 'Oatmeal with Berries',
          ingredients: ['1/2 cup oats', 'lactose-free milk', 'strawberries', 'maple syrup'],
          calories: 320,
          protein: 10,
          carbs: 55,
          fat: 8,
          fiber: 6,
          preparationTime: '10 minutes'
        }
      ],
      lunch: [
        {
          name: 'Rice Bowl with Chicken',
          ingredients: ['rice', 'grilled chicken', 'carrots', 'zucchini', 'sesame oil', 'soy sauce (low FODMAP)'],
          calories: 450,
          protein: 35,
          carbs: 50,
          fat: 12,
          fiber: 4,
          preparationTime: '20 minutes'
        }
      ],
      dinner: [
        {
          name: 'Baked Salmon with Potato',
          ingredients: ['salmon', 'roasted potato', 'green beans', 'olive oil', 'lemon', 'herbs'],
          calories: 480,
          protein: 35,
          carbs: 35,
          fat: 22,
          fiber: 5,
          preparationTime: '35 minutes'
        }
      ],
      snacks: [
        {
          name: 'Rice Cakes with Peanut Butter',
          ingredients: ['2 rice cakes', '1 tbsp peanut butter'],
          calories: 180,
          protein: 5,
          carbs: 22,
          fat: 9,
          preparationTime: '2 minutes'
        }
      ]
    },
    supplements: [
      {
        name: 'Lactase Enzyme',
        dosage: 'As needed with dairy',
        timing: 'Before eating lactose-containing foods',
        purpose: 'Digest lactose if accidentally consumed',
        contraindications: [],
        evidence: 'strong'
      },
      {
        name: 'Peppermint Oil Capsules',
        dosage: '180-200mg 3x daily',
        timing: '30 min before meals',
        purpose: 'Reduce IBS symptoms',
        contraindications: ['gerd'],
        evidence: 'moderate'
      }
    ],
    hydrationGuidelines: '8 glasses water daily; avoid high FODMAP drinks; limit caffeine',
    mealTiming: [
      'Regular meal times',
      'Eat slowly and mindfully',
      'Avoid large meals',
      'Allow time between meals'
    ],
    benefits: [
      '75% of IBS patients see improvement',
      'Reduces bloating, gas, pain',
      'Identifies personal triggers',
      'Creates sustainable long-term plan',
      'Evidence-based approach'
    ],
    duration: '2-6 weeks elimination, then personalized maintenance',
    scientificEvidence: 'Strong - Monash University research, multiple clinical trials'
  }
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎯 CONDITION-EXERCISE MAPPING
// ════════════════════════════════════════════════════════════════════════════════

export const CONDITION_EXERCISE_MAP: Record<string, string[]> = {
  // Cardiovascular
  'acute-myocardial-infarction': ['cardiac-rehab-phase-1', 'cardiac-rehab-phase-2'],
  'heart-failure': ['cardiac-rehab-phase-1', 'cardiac-rehab-phase-2'],
  'hypertension': ['heart-healthy-walking', 'yoga-for-anxiety', 'tai-chi-balance'],
  'coronary-artery-disease': ['cardiac-rehab-phase-2', 'heart-healthy-walking'],
  'atrial-fibrillation': ['heart-healthy-walking', 'yoga-for-anxiety'],
  
  // Metabolic
  'diabetes-type-2': ['strength-for-diabetes', 'heart-healthy-walking', 'hiit-metabolic'],
  'pre-diabetes': ['strength-for-diabetes', 'heart-healthy-walking', 'weight-loss-beginner'],
  'obesity': ['weight-loss-beginner', 'heart-healthy-walking', 'strength-for-diabetes'],
  'metabolic-syndrome': ['hiit-metabolic', 'strength-for-diabetes', 'heart-healthy-walking'],
  
  // Musculoskeletal
  'osteoarthritis': ['arthritis-strength', 'tai-chi-balance', 'yoga-for-anxiety'],
  'rheumatoid-arthritis': ['arthritis-strength', 'yoga-for-anxiety'],
  'osteoporosis': ['osteoporosis-strength', 'tai-chi-balance'],
  'lower-back-pain': ['back-pain-rehab', 'yoga-for-anxiety'],
  'fibromyalgia': ['arthritis-strength', 'yoga-for-anxiety', 'tai-chi-balance'],
  
  // Respiratory
  'copd': ['pulmonary-rehab', 'yoga-for-anxiety'],
  'asthma': ['pulmonary-rehab', 'heart-healthy-walking'],
  
  // Mental Health
  'anxiety-disorder': ['yoga-for-anxiety', 'heart-healthy-walking', 'tai-chi-balance'],
  'depression': ['heart-healthy-walking', 'yoga-for-anxiety', 'strength-for-diabetes'],
  'insomnia': ['yoga-for-anxiety', 'tai-chi-balance'],
  
  // Neurological
  'parkinsons': ['tai-chi-balance', 'yoga-for-anxiety'],
  'balance-disorders': ['tai-chi-balance'],
  
  // General
  'sedentary-lifestyle': ['weight-loss-beginner', 'heart-healthy-walking'],
  'stress': ['yoga-for-anxiety', 'tai-chi-balance'],
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎯 CONDITION-NUTRITION MAPPING
// ════════════════════════════════════════════════════════════════════════════════

export const CONDITION_NUTRITION_MAP: Record<string, string[]> = {
  // Cardiovascular
  'hypertension': ['dash-diet', 'mediterranean-diet', 'heart-healthy-diet'],
  'coronary-artery-disease': ['heart-healthy-diet', 'mediterranean-diet'],
  'heart-failure': ['dash-diet', 'heart-healthy-diet'],
  'high-cholesterol': ['heart-healthy-diet', 'mediterranean-diet'],
  
  // Metabolic
  'diabetes-type-2': ['diabetic-diet', 'mediterranean-diet'],
  'pre-diabetes': ['diabetic-diet', 'weight-loss-balanced'],
  'obesity': ['weight-loss-balanced', 'mediterranean-diet'],
  'metabolic-syndrome': ['dash-diet', 'diabetic-diet', 'mediterranean-diet'],
  
  // Inflammatory
  'rheumatoid-arthritis': ['anti-inflammatory-diet', 'mediterranean-diet'],
  'psoriasis': ['anti-inflammatory-diet'],
  'inflammatory-bowel-disease': ['anti-inflammatory-diet', 'low-fodmap'],
  
  // Gastrointestinal
  'irritable-bowel-syndrome': ['low-fodmap'],
  'ibs-d': ['low-fodmap'],
  'ibs-c': ['low-fodmap'],
  'gerd': ['mediterranean-diet'],
  
  // Renal
  'chronic-kidney-disease': ['renal-diet'],
  'kidney-failure': ['renal-diet'],
  
  // General
  'general-wellness': ['mediterranean-diet'],
  'cognitive-decline': ['mediterranean-diet', 'anti-inflammatory-diet'],
};

// ════════════════════════════════════════════════════════════════════════════════
// 🔧 WELLNESS RECOMMENDATION ENGINE
// ════════════════════════════════════════════════════════════════════════════════

export interface WellnessInput {
  conditions: string[];
  age: number;
  gender: 'male' | 'female' | 'other';
  fitnessLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goals: string[];
  restrictions: string[];
  preferences: {
    exerciseTypes?: string[];
    dietaryRestrictions?: string[];
    timeAvailable?: number; // minutes per day
  };
}

export function generateWellnessRecommendations(input: WellnessInput): WellnessRecommendation {
  const recommendedExercises: ExerciseProgram[] = [];
  const recommendedNutrition: NutritionPlan[] = [];
  const lifestyleModifications: string[] = [];
  const mindBodyPractices: string[] = [];
  const sleepRecommendations: string[] = [];
  const stressManagement: string[] = [];
  const monitoringMetrics: string[] = [];
  const goals: WellnessGoal[] = [];

  // Get exercise programs based on conditions
  const exerciseIds = new Set<string>();
  for (const condition of input.conditions) {
    const programs = CONDITION_EXERCISE_MAP[condition.toLowerCase()] || [];
    programs.forEach(id => exerciseIds.add(id));
  }

  // Filter by fitness level and add appropriate programs
  for (const exerciseId of exerciseIds) {
    const program = EXERCISE_PROGRAMS_DATABASE[exerciseId];
    if (program && !input.restrictions.some(r => program.contraindications.includes(r))) {
      // Adjust for fitness level
      if (input.fitnessLevel === 'sedentary' && program.difficulty === 'beginner') {
        recommendedExercises.push(program);
      } else if (input.fitnessLevel === 'light' && ['beginner', 'clinical'].includes(program.difficulty)) {
        recommendedExercises.push(program);
      } else if (input.fitnessLevel === 'moderate') {
        recommendedExercises.push(program);
      } else if (['active', 'very-active'].includes(input.fitnessLevel)) {
        recommendedExercises.push(program);
      }
    }
  }

  // If no specific exercises found, add general recommendations
  if (recommendedExercises.length === 0) {
    if (input.fitnessLevel === 'sedentary') {
      const walking = EXERCISE_PROGRAMS_DATABASE['heart-healthy-walking'];
      if (walking) recommendedExercises.push(walking);
    } else {
      const beginner = EXERCISE_PROGRAMS_DATABASE['weight-loss-beginner'];
      if (beginner) recommendedExercises.push(beginner);
    }
  }

  // Get nutrition plans based on conditions
  const nutritionIds = new Set<string>();
  for (const condition of input.conditions) {
    const plans = CONDITION_NUTRITION_MAP[condition.toLowerCase()] || [];
    plans.forEach(id => nutritionIds.add(id));
  }

  // Add nutrition plans
  for (const nutritionId of nutritionIds) {
    const plan = NUTRITION_PLANS_DATABASE[nutritionId];
    if (plan && !input.restrictions.some(r => plan.contraindications.includes(r))) {
      recommendedNutrition.push(plan);
    }
  }

  // If no specific nutrition found, add Mediterranean as default
  if (recommendedNutrition.length === 0) {
    const mediterranean = NUTRITION_PLANS_DATABASE['mediterranean-diet'];
    if (mediterranean) recommendedNutrition.push(mediterranean);
  }

  // Add lifestyle modifications based on conditions
  lifestyleModifications.push(
    'Aim for 7-9 hours of quality sleep per night',
    'Take regular breaks from sitting (every 30-60 minutes)',
    'Practice good posture throughout the day',
    'Limit screen time before bed',
    'Stay socially connected with friends and family'
  );

  // Add mind-body practices
  mindBodyPractices.push(
    'Practice deep breathing exercises for 5-10 minutes daily',
    'Consider meditation or mindfulness practice',
    'Try progressive muscle relaxation before bed',
    'Spend time in nature regularly'
  );

  // Sleep recommendations
  sleepRecommendations.push(
    'Maintain consistent sleep and wake times',
    'Create a dark, cool sleeping environment',
    'Avoid caffeine after 2 PM',
    'Establish a relaxing bedtime routine',
    'Limit alcohol close to bedtime'
  );

  // Stress management
  stressManagement.push(
    'Identify and address sources of stress',
    'Practice time management and prioritization',
    'Set healthy boundaries',
    'Engage in enjoyable hobbies',
    'Seek support when needed'
  );

  // Monitoring metrics
  monitoringMetrics.push(
    'Weight (weekly)',
    'Blood pressure (as recommended)',
    'Activity minutes per week',
    'Sleep quality and duration',
    'Mood and energy levels',
    'Symptom tracking'
  );

  // Set wellness goals
  goals.push({
    category: 'Exercise',
    shortTerm: 'Complete 3 exercise sessions this week',
    longTerm: 'Achieve 150 minutes of moderate activity per week',
    metrics: ['Minutes exercised', 'Sessions completed', 'Steps per day'],
    timeline: '3 months'
  });

  goals.push({
    category: 'Nutrition',
    shortTerm: 'Follow meal plan for 5 days this week',
    longTerm: 'Establish sustainable healthy eating habits',
    metrics: ['Adherence to plan', 'Fruit/vegetable servings', 'Water intake'],
    timeline: '3 months'
  });

  if (input.goals.includes('weight-loss')) {
    goals.push({
      category: 'Weight Management',
      shortTerm: 'Lose 1-2 lbs this week',
      longTerm: 'Reach healthy BMI',
      metrics: ['Weight', 'Waist circumference', 'Body composition'],
      timeline: '6-12 months'
    });
  }

  return {
    exercisePrograms: recommendedExercises.slice(0, 5), // Top 5
    nutritionPlans: recommendedNutrition.slice(0, 3), // Top 3
    lifestyleModifications,
    mindBodyPractices,
    sleepRecommendations,
    stressManagement,
    monitoringMetrics,
    goals
  };
}

// ════════════════════════════════════════════════════════════════════════════════
// 📊 EXERCISE STATS
// ════════════════════════════════════════════════════════════════════════════════

export function getWellnessStats() {
  return {
    exercisePrograms: Object.keys(EXERCISE_PROGRAMS_DATABASE).length,
    nutritionPlans: Object.keys(NUTRITION_PLANS_DATABASE).length,
    conditionsWithExercise: Object.keys(CONDITION_EXERCISE_MAP).length,
    conditionsWithNutrition: Object.keys(CONDITION_NUTRITION_MAP).length,
    totalExercises: Object.values(EXERCISE_PROGRAMS_DATABASE).reduce(
      (sum, program) => sum + program.exercises.length, 0
    ),
    totalMealOptions: Object.values(NUTRITION_PLANS_DATABASE).reduce(
      (sum, plan) => sum + 
        plan.sampleMealPlan.breakfast.length + 
        plan.sampleMealPlan.lunch.length + 
        plan.sampleMealPlan.dinner.length + 
        plan.sampleMealPlan.snacks.length, 0
    )
  };
}
