/**
 * MediSense AI Pro™ - Wellness Plans Service
 * Comprehensive Meal & Exercise Plans Based on Symptoms, Conditions & Targets
 * 
 * Sources: American Heart Association, CDC, Mayo Clinic, WHO, NIH
 * Last Updated: 2026-01-07
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  targetConditions: string[];
  targetSymptoms: string[];
  goals: string[];
  dailyCalories: {
    min: number;
    max: number;
  };
  macros: {
    protein: { min: number; max: number }; // percentage
    carbs: { min: number; max: number };
    fat: { min: number; max: number };
  };
  meals: DailyMeals;
  foods: {
    recommended: FoodItem[];
    avoid: FoodItem[];
    limit: FoodItem[];
  };
  hydration: {
    dailyWaterLiters: number;
    tips: string[];
  };
  supplements?: Supplement[];
  restrictions: string[];
  duration: string;
  medicalWarning?: string;
}

export interface DailyMeals {
  breakfast: MealOption[];
  morningSnack?: MealOption[];
  lunch: MealOption[];
  afternoonSnack?: MealOption[];
  dinner: MealOption[];
  eveningSnack?: MealOption[];
}

export interface MealOption {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  ingredients: string[];
  preparation?: string;
  icon: string;
}

export interface FoodItem {
  name: string;
  category: string;
  reason: string;
  icon: string;
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  reason: string;
}

export interface ExercisePlan {
  id: string;
  name: string;
  description: string;
  targetConditions: string[];
  targetSymptoms: string[];
  goals: string[];
  intensity: 'low' | 'moderate' | 'high';
  frequency: string; // e.g., "3-5 days/week"
  duration: string; // e.g., "30-45 minutes"
  warmup: Exercise[];
  mainExercises: Exercise[];
  cooldown: Exercise[];
  progressions: ExerciseProgression[];
  contraindications: string[];
  modifications: ExerciseModification[];
  equipment: string[];
  medicalWarning?: string;
}

export interface Exercise {
  name: string;
  description: string;
  duration?: string;
  sets?: number;
  reps?: number;
  restBetween?: string;
  muscleGroups: string[];
  icon: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modifications?: string[];
}

export interface ExerciseProgression {
  week: number;
  changes: string[];
}

export interface ExerciseModification {
  condition: string;
  modifications: string[];
}

// ============================================================================
// MEAL PLANS DATABASE
// ============================================================================

export const MEAL_PLANS: Record<string, MealPlan> = {
  // ─────────────────────────────────────────────────────────────────────────
  // CARDIOVASCULAR HEALTH
  // ─────────────────────────────────────────────────────────────────────────
  'heart-healthy': {
    id: 'heart-healthy',
    name: 'Heart-Healthy Mediterranean Plan',
    description: 'DASH and Mediterranean-inspired diet for cardiovascular health, blood pressure control, and cholesterol management.',
    targetConditions: ['hypertension', 'heart-disease', 'high-cholesterol', 'atherosclerosis', 'heart-failure'],
    targetSymptoms: ['chest-pain', 'shortness-breath', 'palpitations', 'fatigue', 'edema-legs'],
    goals: ['Lower blood pressure', 'Reduce LDL cholesterol', 'Improve heart function', 'Reduce inflammation'],
    dailyCalories: { min: 1600, max: 2200 },
    macros: {
      protein: { min: 15, max: 20 },
      carbs: { min: 45, max: 55 },
      fat: { min: 25, max: 35 }
    },
    meals: {
      breakfast: [
        {
          name: 'Oatmeal with Berries',
          description: 'Steel-cut oats with fresh berries, walnuts, and honey',
          calories: 350,
          protein: 10,
          carbs: 55,
          fat: 12,
          fiber: 8,
          ingredients: ['Steel-cut oats', 'Mixed berries', 'Walnuts', 'Cinnamon', 'Honey'],
          icon: '🥣'
        },
        {
          name: 'Avocado Toast with Eggs',
          description: 'Whole grain toast with avocado and poached eggs',
          calories: 380,
          protein: 15,
          carbs: 35,
          fat: 22,
          fiber: 7,
          ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Olive oil'],
          icon: '🥑'
        }
      ],
      morningSnack: [
        {
          name: 'Greek Yogurt with Nuts',
          description: 'Low-fat Greek yogurt with almonds and honey',
          calories: 180,
          protein: 12,
          carbs: 18,
          fat: 8,
          ingredients: ['Greek yogurt', 'Almonds', 'Honey'],
          icon: '🥛'
        }
      ],
      lunch: [
        {
          name: 'Mediterranean Salad Bowl',
          description: 'Quinoa with grilled chicken, vegetables, and olive oil dressing',
          calories: 480,
          protein: 35,
          carbs: 45,
          fat: 18,
          fiber: 8,
          ingredients: ['Quinoa', 'Grilled chicken', 'Cucumber', 'Tomatoes', 'Olives', 'Feta cheese', 'Olive oil'],
          icon: '🥗'
        },
        {
          name: 'Grilled Salmon Wrap',
          description: 'Whole wheat wrap with salmon, spinach, and tzatziki',
          calories: 450,
          protein: 32,
          carbs: 40,
          fat: 18,
          fiber: 5,
          ingredients: ['Whole wheat tortilla', 'Grilled salmon', 'Spinach', 'Tzatziki', 'Red onion'],
          icon: '🌯'
        }
      ],
      afternoonSnack: [
        {
          name: 'Hummus with Vegetables',
          description: 'Chickpea hummus with carrot and celery sticks',
          calories: 150,
          protein: 5,
          carbs: 18,
          fat: 7,
          fiber: 4,
          ingredients: ['Hummus', 'Carrots', 'Celery', 'Bell peppers'],
          icon: '🥕'
        }
      ],
      dinner: [
        {
          name: 'Grilled Fish with Vegetables',
          description: 'Herb-crusted cod with roasted Mediterranean vegetables',
          calories: 420,
          protein: 38,
          carbs: 25,
          fat: 18,
          fiber: 6,
          ingredients: ['Cod fillet', 'Zucchini', 'Eggplant', 'Bell peppers', 'Olive oil', 'Herbs'],
          icon: '🐟'
        },
        {
          name: 'Lean Chicken Stir-Fry',
          description: 'Chicken breast with colorful vegetables and brown rice',
          calories: 450,
          protein: 35,
          carbs: 45,
          fat: 14,
          fiber: 5,
          ingredients: ['Chicken breast', 'Brown rice', 'Broccoli', 'Bell peppers', 'Garlic', 'Ginger'],
          icon: '🍗'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Fatty Fish (Salmon, Mackerel)', category: 'Protein', reason: 'Rich in omega-3 fatty acids', icon: '🐟' },
        { name: 'Leafy Greens', category: 'Vegetables', reason: 'High in potassium and magnesium', icon: '🥬' },
        { name: 'Olive Oil', category: 'Fats', reason: 'Healthy monounsaturated fats', icon: '🫒' },
        { name: 'Whole Grains', category: 'Carbs', reason: 'Fiber for cholesterol reduction', icon: '🌾' },
        { name: 'Nuts & Seeds', category: 'Snacks', reason: 'Heart-healthy fats and fiber', icon: '🥜' },
        { name: 'Berries', category: 'Fruits', reason: 'Antioxidants and fiber', icon: '🫐' },
        { name: 'Legumes', category: 'Protein', reason: 'Plant protein and fiber', icon: '🫘' }
      ],
      avoid: [
        { name: 'Trans Fats', category: 'Fats', reason: 'Increases LDL and heart disease risk', icon: '🚫' },
        { name: 'Processed Meats', category: 'Protein', reason: 'High sodium and saturated fat', icon: '🥓' },
        { name: 'Sugary Drinks', category: 'Beverages', reason: 'Empty calories, blood sugar spikes', icon: '🥤' },
        { name: 'Excessive Alcohol', category: 'Beverages', reason: 'Can raise blood pressure', icon: '🍺' }
      ],
      limit: [
        { name: 'Sodium', category: 'Seasoning', reason: 'Keep under 2,300mg/day (ideally 1,500mg)', icon: '🧂' },
        { name: 'Red Meat', category: 'Protein', reason: 'Limit to 1-2 servings/week', icon: '🥩' },
        { name: 'Full-Fat Dairy', category: 'Dairy', reason: 'Choose low-fat alternatives', icon: '🧀' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.5,
      tips: [
        'Start each meal with a glass of water',
        'Limit caffeine to 2-3 cups/day',
        'Avoid sugary drinks and excessive juice',
        'Herbal teas count toward hydration'
      ]
    },
    supplements: [
      { name: 'Omega-3 Fish Oil', dosage: '1000-2000mg EPA+DHA', timing: 'With meals', reason: 'Reduces triglycerides and inflammation' },
      { name: 'CoQ10', dosage: '100-200mg', timing: 'Morning', reason: 'Supports heart muscle energy' },
      { name: 'Magnesium', dosage: '300-400mg', timing: 'Evening', reason: 'Helps regulate blood pressure' }
    ],
    restrictions: ['Low sodium', 'Low saturated fat', 'Limited red meat'],
    duration: 'Long-term lifestyle plan',
    medicalWarning: 'Consult your cardiologist before starting, especially if on blood thinners or heart medications.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIGESTIVE HEALTH
  // ─────────────────────────────────────────────────────────────────────────
  'digestive-comfort': {
    id: 'digestive-comfort',
    name: 'Digestive Comfort Plan',
    description: 'Low-FODMAP inspired diet for IBS, bloating, and digestive discomfort management.',
    targetConditions: ['ibs', 'gerd', 'gastritis', 'bloating', 'constipation', 'diarrhea'],
    targetSymptoms: ['abdominal-pain', 'bloating', 'nausea', 'heartburn', 'constipation', 'diarrhea'],
    goals: ['Reduce bloating', 'Improve digestion', 'Identify trigger foods', 'Restore gut health'],
    dailyCalories: { min: 1500, max: 2000 },
    macros: {
      protein: { min: 20, max: 25 },
      carbs: { min: 45, max: 55 },
      fat: { min: 25, max: 30 }
    },
    meals: {
      breakfast: [
        {
          name: 'Gentle Start Porridge',
          description: 'Oat porridge with banana and maple syrup',
          calories: 320,
          protein: 8,
          carbs: 58,
          fat: 6,
          fiber: 5,
          ingredients: ['Rolled oats', 'Almond milk', 'Ripe banana', 'Maple syrup', 'Cinnamon'],
          icon: '🥣'
        },
        {
          name: 'Scrambled Eggs with Toast',
          description: 'Soft scrambled eggs with sourdough toast',
          calories: 340,
          protein: 18,
          carbs: 30,
          fat: 16,
          ingredients: ['Eggs', 'Butter', 'Sourdough bread', 'Chives'],
          icon: '🍳'
        }
      ],
      lunch: [
        {
          name: 'Chicken & Rice Bowl',
          description: 'Gentle chicken with white rice and steamed vegetables',
          calories: 420,
          protein: 32,
          carbs: 48,
          fat: 10,
          fiber: 3,
          ingredients: ['Chicken breast', 'White rice', 'Carrots', 'Green beans', 'Ginger'],
          icon: '🍚'
        }
      ],
      dinner: [
        {
          name: 'Baked Fish with Potatoes',
          description: 'Simple baked white fish with mashed potatoes',
          calories: 400,
          protein: 35,
          carbs: 40,
          fat: 12,
          fiber: 4,
          ingredients: ['White fish', 'Potatoes', 'Olive oil', 'Dill', 'Lemon'],
          icon: '🐟'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Ginger', category: 'Herbs', reason: 'Natural anti-nausea and digestive aid', icon: '🫚' },
        { name: 'Bananas', category: 'Fruits', reason: 'Easy to digest, gentle on stomach', icon: '🍌' },
        { name: 'White Rice', category: 'Carbs', reason: 'Low fiber, easy to digest', icon: '🍚' },
        { name: 'Lean Proteins', category: 'Protein', reason: 'Easy to digest without irritation', icon: '🍗' },
        { name: 'Cooked Vegetables', category: 'Vegetables', reason: 'Easier to digest than raw', icon: '🥕' },
        { name: 'Bone Broth', category: 'Soups', reason: 'Gut healing properties', icon: '🍲' }
      ],
      avoid: [
        { name: 'High-FODMAP Foods', category: 'Various', reason: 'Triggers bloating and gas', icon: '🧄' },
        { name: 'Spicy Foods', category: 'Seasonings', reason: 'Can irritate digestive tract', icon: '🌶️' },
        { name: 'Carbonated Drinks', category: 'Beverages', reason: 'Causes gas and bloating', icon: '🥤' },
        { name: 'Fried Foods', category: 'Cooking', reason: 'Hard to digest, slows digestion', icon: '🍟' },
        { name: 'Alcohol', category: 'Beverages', reason: 'Irritates stomach lining', icon: '🍷' }
      ],
      limit: [
        { name: 'Dairy', category: 'Dairy', reason: 'May cause symptoms if lactose intolerant', icon: '🥛' },
        { name: 'Raw Vegetables', category: 'Vegetables', reason: 'Harder to digest', icon: '🥬' },
        { name: 'Coffee', category: 'Beverages', reason: 'Can increase stomach acid', icon: '☕' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.0,
      tips: [
        'Sip water throughout the day, not large amounts at once',
        'Warm water may be easier on digestion',
        'Ginger tea helps with nausea',
        'Peppermint tea aids digestion'
      ]
    },
    supplements: [
      { name: 'Probiotics', dosage: '10-50 billion CFU', timing: 'Morning before food', reason: 'Restores healthy gut bacteria' },
      { name: 'Digestive Enzymes', dosage: 'As directed', timing: 'With meals', reason: 'Aids food breakdown' },
      { name: 'L-Glutamine', dosage: '5-10g', timing: 'Morning', reason: 'Supports gut lining repair' }
    ],
    restrictions: ['Low FODMAP', 'Avoid trigger foods', 'Small frequent meals'],
    duration: '2-6 weeks elimination, then gradual reintroduction',
    medicalWarning: 'Consult a gastroenterologist for persistent symptoms. This plan is not for acute conditions.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ANTI-INFLAMMATORY
  // ─────────────────────────────────────────────────────────────────────────
  'anti-inflammatory': {
    id: 'anti-inflammatory',
    name: 'Anti-Inflammatory Wellness Plan',
    description: 'Nutrient-rich diet to reduce chronic inflammation and support joint/muscle health.',
    targetConditions: ['arthritis', 'fibromyalgia', 'autoimmune-disease', 'chronic-pain', 'inflammatory-bowel'],
    targetSymptoms: ['joint-pain', 'muscle-pain', 'stiffness', 'fatigue', 'swelling'],
    goals: ['Reduce inflammation markers', 'Decrease pain', 'Improve mobility', 'Boost energy'],
    dailyCalories: { min: 1700, max: 2200 },
    macros: {
      protein: { min: 20, max: 25 },
      carbs: { min: 40, max: 50 },
      fat: { min: 30, max: 35 }
    },
    meals: {
      breakfast: [
        {
          name: 'Golden Turmeric Smoothie',
          description: 'Anti-inflammatory smoothie with turmeric, ginger, and berries',
          calories: 320,
          protein: 15,
          carbs: 40,
          fat: 12,
          fiber: 6,
          ingredients: ['Almond milk', 'Turmeric', 'Ginger', 'Berries', 'Protein powder', 'Flaxseed'],
          icon: '🥤'
        }
      ],
      lunch: [
        {
          name: 'Rainbow Veggie Bowl',
          description: 'Colorful vegetables with salmon and tahini dressing',
          calories: 520,
          protein: 35,
          carbs: 38,
          fat: 26,
          fiber: 10,
          ingredients: ['Wild salmon', 'Sweet potato', 'Kale', 'Beets', 'Avocado', 'Tahini'],
          icon: '🥗'
        }
      ],
      dinner: [
        {
          name: 'Herb-Crusted Salmon',
          description: 'Omega-3 rich salmon with roasted vegetables',
          calories: 480,
          protein: 40,
          carbs: 25,
          fat: 26,
          fiber: 6,
          ingredients: ['Wild salmon', 'Broccoli', 'Asparagus', 'Olive oil', 'Herbs'],
          icon: '🐟'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Fatty Fish', category: 'Protein', reason: 'Omega-3s reduce inflammation', icon: '🐟' },
        { name: 'Turmeric', category: 'Spices', reason: 'Curcumin is powerful anti-inflammatory', icon: '🟡' },
        { name: 'Dark Leafy Greens', category: 'Vegetables', reason: 'Rich in antioxidants', icon: '🥬' },
        { name: 'Berries', category: 'Fruits', reason: 'Anthocyanins reduce inflammation', icon: '🫐' },
        { name: 'Extra Virgin Olive Oil', category: 'Fats', reason: 'Oleocanthal has anti-inflammatory properties', icon: '🫒' },
        { name: 'Nuts (Walnuts, Almonds)', category: 'Snacks', reason: 'Healthy fats and antioxidants', icon: '🥜' },
        { name: 'Green Tea', category: 'Beverages', reason: 'EGCG reduces inflammation', icon: '🍵' }
      ],
      avoid: [
        { name: 'Refined Sugars', category: 'Sweeteners', reason: 'Promotes inflammation', icon: '🍬' },
        { name: 'Processed Foods', category: 'Packaged', reason: 'High in inflammatory additives', icon: '📦' },
        { name: 'Trans Fats', category: 'Fats', reason: 'Highly inflammatory', icon: '🍟' },
        { name: 'Excessive Omega-6', category: 'Oils', reason: 'Promotes inflammation when imbalanced', icon: '🌻' }
      ],
      limit: [
        { name: 'Red Meat', category: 'Protein', reason: 'Contains arachidonic acid', icon: '🥩' },
        { name: 'Alcohol', category: 'Beverages', reason: 'Promotes inflammation', icon: '🍷' },
        { name: 'Refined Carbs', category: 'Carbs', reason: 'Spikes blood sugar and inflammation', icon: '🍞' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.5,
      tips: [
        'Green tea counts toward hydration',
        'Add lemon for extra vitamin C',
        'Avoid sugary drinks completely',
        'Bone broth provides extra benefits'
      ]
    },
    supplements: [
      { name: 'Omega-3 Fish Oil', dosage: '2000-3000mg EPA+DHA', timing: 'With meals', reason: 'Powerful anti-inflammatory' },
      { name: 'Curcumin + Piperine', dosage: '500-1000mg', timing: 'With meals', reason: 'Enhanced turmeric absorption' },
      { name: 'Vitamin D3', dosage: '2000-4000 IU', timing: 'Morning with fat', reason: 'Modulates inflammation' }
    ],
    restrictions: ['No refined sugars', 'No processed foods', 'Limited red meat'],
    duration: 'Long-term lifestyle plan',
    medicalWarning: 'If on blood thinners or anti-inflammatory medications, consult your doctor before adding supplements.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIABETES / BLOOD SUGAR MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────
  'blood-sugar-balance': {
    id: 'blood-sugar-balance',
    name: 'Blood Sugar Balance Plan',
    description: 'Low glycemic diet for diabetes management and blood sugar stabilization.',
    targetConditions: ['diabetes-type2', 'prediabetes', 'metabolic-syndrome', 'insulin-resistance'],
    targetSymptoms: ['fatigue', 'excessive-thirst', 'frequent-urination', 'blurred-vision', 'slow-healing'],
    goals: ['Stabilize blood sugar', 'Improve insulin sensitivity', 'Prevent complications', 'Maintain healthy weight'],
    dailyCalories: { min: 1400, max: 1800 },
    macros: {
      protein: { min: 25, max: 30 },
      carbs: { min: 30, max: 40 },
      fat: { min: 30, max: 40 }
    },
    meals: {
      breakfast: [
        {
          name: 'Protein-Packed Eggs',
          description: 'Vegetable omelette with avocado',
          calories: 350,
          protein: 22,
          carbs: 12,
          fat: 26,
          fiber: 6,
          ingredients: ['Eggs', 'Spinach', 'Tomatoes', 'Avocado', 'Cheese'],
          icon: '🍳'
        }
      ],
      lunch: [
        {
          name: 'Grilled Chicken Salad',
          description: 'Large salad with grilled chicken and olive oil dressing',
          calories: 420,
          protein: 38,
          carbs: 18,
          fat: 24,
          fiber: 8,
          ingredients: ['Chicken breast', 'Mixed greens', 'Cucumber', 'Tomatoes', 'Olive oil', 'Lemon'],
          icon: '🥗'
        }
      ],
      dinner: [
        {
          name: 'Baked Salmon with Vegetables',
          description: 'Omega-3 rich salmon with non-starchy vegetables',
          calories: 450,
          protein: 40,
          carbs: 15,
          fat: 28,
          fiber: 5,
          ingredients: ['Salmon', 'Asparagus', 'Broccoli', 'Olive oil', 'Garlic'],
          icon: '🐟'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Non-Starchy Vegetables', category: 'Vegetables', reason: 'Low carb, high fiber', icon: '🥦' },
        { name: 'Lean Proteins', category: 'Protein', reason: 'No impact on blood sugar', icon: '🍗' },
        { name: 'Healthy Fats', category: 'Fats', reason: 'Slow glucose absorption', icon: '🥑' },
        { name: 'Nuts & Seeds', category: 'Snacks', reason: 'Low glycemic, satisfying', icon: '🥜' },
        { name: 'Berries', category: 'Fruits', reason: 'Lower glycemic fruits', icon: '🫐' },
        { name: 'Legumes', category: 'Carbs', reason: 'Slow-release carbohydrates', icon: '🫘' }
      ],
      avoid: [
        { name: 'Sugary Foods/Drinks', category: 'Sweeteners', reason: 'Rapid blood sugar spike', icon: '🍬' },
        { name: 'White Bread/Rice', category: 'Carbs', reason: 'High glycemic index', icon: '🍞' },
        { name: 'Fruit Juices', category: 'Beverages', reason: 'Concentrated sugars', icon: '🧃' },
        { name: 'Processed Snacks', category: 'Snacks', reason: 'Hidden sugars and refined carbs', icon: '🍪' }
      ],
      limit: [
        { name: 'Starchy Vegetables', category: 'Vegetables', reason: 'Higher carb content', icon: '🥔' },
        { name: 'High-GI Fruits', category: 'Fruits', reason: 'Bananas, grapes, watermelon', icon: '🍌' },
        { name: 'Alcohol', category: 'Beverages', reason: 'Can affect blood sugar unpredictably', icon: '🍷' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.5,
      tips: [
        'Water helps kidneys flush excess glucose',
        'Avoid all sugary beverages',
        'Unsweetened tea and coffee are okay',
        'Monitor caffeine if it affects blood sugar'
      ]
    },
    supplements: [
      { name: 'Chromium', dosage: '200-400mcg', timing: 'With meals', reason: 'Improves insulin sensitivity' },
      { name: 'Alpha Lipoic Acid', dosage: '300-600mg', timing: 'Before meals', reason: 'Supports glucose metabolism' },
      { name: 'Berberine', dosage: '500mg 2-3x daily', timing: 'Before meals', reason: 'Helps regulate blood sugar' },
      { name: 'Magnesium', dosage: '300-400mg', timing: 'Evening', reason: 'Many diabetics are deficient' }
    ],
    restrictions: ['Low carbohydrate', 'No added sugars', 'Portion controlled'],
    duration: 'Long-term management plan',
    medicalWarning: 'Essential to monitor blood sugar and adjust medications with your doctor. Do not adjust insulin without medical guidance.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST-SURGERY RECOVERY
  // ─────────────────────────────────────────────────────────────────────────
  'post-surgery-recovery': {
    id: 'post-surgery-recovery',
    name: 'Post-Surgery Recovery Plan',
    description: 'Nutrition plan to support healing, prevent complications, and restore strength after surgery.',
    targetConditions: ['post-surgical', 'wound-healing', 'recovery'],
    targetSymptoms: ['weakness', 'fatigue', 'poor-appetite', 'constipation'],
    goals: ['Accelerate healing', 'Prevent infection', 'Restore energy', 'Prevent complications'],
    dailyCalories: { min: 1800, max: 2400 },
    macros: {
      protein: { min: 25, max: 35 },
      carbs: { min: 40, max: 50 },
      fat: { min: 20, max: 30 }
    },
    meals: {
      breakfast: [
        {
          name: 'High-Protein Smoothie',
          description: 'Protein-rich smoothie for easy consumption',
          calories: 400,
          protein: 30,
          carbs: 45,
          fat: 12,
          fiber: 5,
          ingredients: ['Protein powder', 'Banana', 'Peanut butter', 'Greek yogurt', 'Milk'],
          icon: '🥤'
        }
      ],
      lunch: [
        {
          name: 'Chicken Soup',
          description: 'Homemade chicken soup with vegetables',
          calories: 380,
          protein: 28,
          carbs: 35,
          fat: 14,
          fiber: 4,
          ingredients: ['Chicken', 'Carrots', 'Celery', 'Noodles', 'Broth'],
          icon: '🍲'
        }
      ],
      dinner: [
        {
          name: 'Soft Fish with Mash',
          description: 'Baked fish with creamy mashed potatoes',
          calories: 450,
          protein: 35,
          carbs: 40,
          fat: 16,
          fiber: 3,
          ingredients: ['White fish', 'Potatoes', 'Butter', 'Milk', 'Herbs'],
          icon: '🐟'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Lean Protein', category: 'Protein', reason: 'Essential for tissue repair', icon: '🍗' },
        { name: 'Vitamin C Foods', category: 'Fruits', reason: 'Collagen synthesis for healing', icon: '🍊' },
        { name: 'Zinc-Rich Foods', category: 'Various', reason: 'Wound healing support', icon: '🦪' },
        { name: 'Iron-Rich Foods', category: 'Various', reason: 'Blood cell production', icon: '🥩' },
        { name: 'Fiber-Rich Foods', category: 'Various', reason: 'Prevent post-op constipation', icon: '🥬' }
      ],
      avoid: [
        { name: 'Alcohol', category: 'Beverages', reason: 'Impairs healing and interacts with medications', icon: '🍷' },
        { name: 'Excessive Sugar', category: 'Sweeteners', reason: 'Can impair immune function', icon: '🍬' },
        { name: 'Gas-Producing Foods', category: 'Various', reason: 'Can cause discomfort post-surgery', icon: '🥦' }
      ],
      limit: [
        { name: 'Caffeine', category: 'Beverages', reason: 'Can interfere with healing', icon: '☕' },
        { name: 'Salty Foods', category: 'Seasoning', reason: 'Can cause fluid retention', icon: '🧂' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.5,
      tips: [
        'Hydration crucial for healing',
        'Water helps flush anesthesia',
        'Prune juice helps with constipation',
        'Avoid caffeine initially'
      ]
    },
    supplements: [
      { name: 'Vitamin C', dosage: '500-1000mg', timing: 'With meals', reason: 'Wound healing and collagen' },
      { name: 'Zinc', dosage: '15-30mg', timing: 'With meals', reason: 'Immune function and healing' },
      { name: 'Protein Powder', dosage: '20-30g', timing: 'Between meals', reason: 'Extra protein for recovery' }
    ],
    restrictions: ['Easy to digest', 'High protein', 'Adequate fiber'],
    duration: '2-6 weeks depending on surgery type',
    medicalWarning: 'Follow your surgeon\'s specific dietary guidelines. Some surgeries have strict dietary progressions.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MENTAL WELLNESS / STRESS
  // ─────────────────────────────────────────────────────────────────────────
  'mental-wellness': {
    id: 'mental-wellness',
    name: 'Mental Wellness Support Plan',
    description: 'Brain-boosting nutrition to support mood, reduce anxiety, and improve cognitive function.',
    targetConditions: ['anxiety', 'depression', 'stress', 'insomnia', 'brain-fog'],
    targetSymptoms: ['anxiety', 'depression', 'insomnia', 'fatigue', 'difficulty-concentrating', 'mood-swings'],
    goals: ['Improve mood', 'Reduce anxiety', 'Better sleep', 'Enhanced focus', 'Stress resilience'],
    dailyCalories: { min: 1600, max: 2200 },
    macros: {
      protein: { min: 20, max: 25 },
      carbs: { min: 45, max: 55 },
      fat: { min: 25, max: 35 }
    },
    meals: {
      breakfast: [
        {
          name: 'Brain-Boost Bowl',
          description: 'Oatmeal with walnuts, berries, and omega-3 seeds',
          calories: 380,
          protein: 12,
          carbs: 55,
          fat: 16,
          fiber: 8,
          ingredients: ['Steel-cut oats', 'Walnuts', 'Blueberries', 'Chia seeds', 'Honey'],
          icon: '🥣'
        }
      ],
      lunch: [
        {
          name: 'Salmon Power Salad',
          description: 'Omega-3 rich salmon with leafy greens',
          calories: 480,
          protein: 35,
          carbs: 25,
          fat: 28,
          fiber: 6,
          ingredients: ['Wild salmon', 'Spinach', 'Avocado', 'Pumpkin seeds', 'Olive oil'],
          icon: '🥗'
        }
      ],
      dinner: [
        {
          name: 'Turkey with Sweet Potato',
          description: 'Tryptophan-rich turkey with complex carbs',
          calories: 450,
          protein: 38,
          carbs: 40,
          fat: 14,
          fiber: 5,
          ingredients: ['Turkey breast', 'Sweet potato', 'Broccoli', 'Olive oil'],
          icon: '🦃'
        }
      ]
    },
    foods: {
      recommended: [
        { name: 'Fatty Fish', category: 'Protein', reason: 'Omega-3s support brain function', icon: '🐟' },
        { name: 'Dark Chocolate (70%+)', category: 'Treats', reason: 'Mood-boosting compounds', icon: '🍫' },
        { name: 'Leafy Greens', category: 'Vegetables', reason: 'Folate for mood regulation', icon: '🥬' },
        { name: 'Fermented Foods', category: 'Various', reason: 'Gut-brain axis support', icon: '🥒' },
        { name: 'Nuts & Seeds', category: 'Snacks', reason: 'Magnesium for relaxation', icon: '🥜' },
        { name: 'Berries', category: 'Fruits', reason: 'Antioxidants for brain health', icon: '🫐' },
        { name: 'Eggs', category: 'Protein', reason: 'Choline for neurotransmitters', icon: '🥚' }
      ],
      avoid: [
        { name: 'Refined Sugars', category: 'Sweeteners', reason: 'Blood sugar crashes affect mood', icon: '🍬' },
        { name: 'Excessive Caffeine', category: 'Beverages', reason: 'Can increase anxiety', icon: '☕' },
        { name: 'Alcohol', category: 'Beverages', reason: 'Depressant that disrupts sleep', icon: '🍷' },
        { name: 'Processed Foods', category: 'Packaged', reason: 'Linked to depression', icon: '📦' }
      ],
      limit: [
        { name: 'Caffeine', category: 'Beverages', reason: 'Keep to morning only', icon: '☕' },
        { name: 'Simple Carbs', category: 'Carbs', reason: 'Can cause mood swings', icon: '🍞' }
      ]
    },
    hydration: {
      dailyWaterLiters: 2.5,
      tips: [
        'Dehydration affects mood and cognition',
        'Herbal teas (chamomile, lavender) are calming',
        'Limit caffeine after noon',
        'Warm milk before bed aids sleep'
      ]
    },
    supplements: [
      { name: 'Omega-3 Fish Oil', dosage: '2000mg EPA+DHA', timing: 'With meals', reason: 'Brain health and mood' },
      { name: 'Vitamin D3', dosage: '2000-4000 IU', timing: 'Morning', reason: 'Deficiency linked to depression' },
      { name: 'Magnesium Glycinate', dosage: '300-400mg', timing: 'Evening', reason: 'Calming, aids sleep' },
      { name: 'B-Complex', dosage: 'As directed', timing: 'Morning', reason: 'Neurotransmitter production' },
      { name: 'Ashwagandha', dosage: '300-600mg', timing: 'Morning', reason: 'Adaptogen for stress' }
    ],
    restrictions: ['No excessive caffeine', 'No alcohol', 'Limited processed foods'],
    duration: 'Long-term lifestyle plan',
    medicalWarning: 'If on psychiatric medications, consult your doctor before adding supplements. St. John\'s Wort interacts with many medications.'
  }
};

// ============================================================================
// EXERCISE PLANS DATABASE
// ============================================================================

export const EXERCISE_PLANS: Record<string, ExercisePlan> = {
  // ─────────────────────────────────────────────────────────────────────────
  // CARDIOVASCULAR FITNESS
  // ─────────────────────────────────────────────────────────────────────────
  'cardio-recovery': {
    id: 'cardio-recovery',
    name: 'Cardiac Rehabilitation Exercise Plan',
    description: 'Safe, progressive exercise program for heart health recovery and prevention.',
    targetConditions: ['heart-disease', 'post-heart-attack', 'heart-failure', 'hypertension'],
    targetSymptoms: ['shortness-breath', 'fatigue', 'chest-discomfort', 'low-endurance'],
    goals: ['Improve cardiovascular fitness', 'Strengthen heart', 'Lower blood pressure', 'Increase endurance'],
    intensity: 'low',
    frequency: '3-5 days/week',
    duration: '20-40 minutes',
    warmup: [
      {
        name: 'Gentle Walking',
        description: 'Slow-paced walking to prepare the heart',
        duration: '5 minutes',
        muscleGroups: ['legs', 'cardiovascular'],
        icon: '🚶',
        difficulty: 'beginner'
      },
      {
        name: 'Arm Circles',
        description: 'Gentle arm rotations to warm up upper body',
        duration: '2 minutes',
        sets: 1,
        reps: 20,
        muscleGroups: ['shoulders', 'arms'],
        icon: '🤸',
        difficulty: 'beginner'
      }
    ],
    mainExercises: [
      {
        name: 'Moderate Walking',
        description: 'Brisk walking at conversation pace (RPE 3-4/10)',
        duration: '15-30 minutes',
        muscleGroups: ['legs', 'cardiovascular'],
        icon: '🚶‍♂️',
        difficulty: 'beginner',
        modifications: ['Use treadmill if weather is poor', 'Walk in place if mobility limited']
      },
      {
        name: 'Stationary Cycling',
        description: 'Low resistance cycling (RPE 3-4/10)',
        duration: '10-20 minutes',
        muscleGroups: ['legs', 'cardiovascular'],
        icon: '🚴',
        difficulty: 'beginner',
        modifications: ['Recumbent bike for better support', 'Arm ergometer as alternative']
      },
      {
        name: 'Chair Exercises',
        description: 'Seated leg lifts, arm raises, and marching',
        duration: '10 minutes',
        sets: 2,
        reps: 10,
        muscleGroups: ['legs', 'arms', 'core'],
        icon: '🪑',
        difficulty: 'beginner'
      }
    ],
    cooldown: [
      {
        name: 'Slow Walking',
        description: 'Gradually reduce pace over 5 minutes',
        duration: '5 minutes',
        muscleGroups: ['legs', 'cardiovascular'],
        icon: '🚶',
        difficulty: 'beginner'
      },
      {
        name: 'Deep Breathing',
        description: 'Diaphragmatic breathing exercises',
        duration: '3 minutes',
        muscleGroups: ['respiratory'],
        icon: '🧘',
        difficulty: 'beginner'
      }
    ],
    progressions: [
      { week: 1, changes: ['Start with 10-15 min walking', 'RPE 2-3/10'] },
      { week: 2, changes: ['Increase to 15-20 min', 'Add 5 min cycling'] },
      { week: 4, changes: ['20-25 min walking', '10 min cycling', 'Add chair exercises'] },
      { week: 6, changes: ['25-30 min walking', 'Light resistance exercises'] },
      { week: 8, changes: ['30-40 min total exercise', 'Moderate intensity (RPE 4-5/10)'] }
    ],
    contraindications: [
      'Unstable angina',
      'Uncontrolled heart failure',
      'Severe valve disease',
      'Uncontrolled arrhythmias',
      'Acute illness or fever'
    ],
    modifications: [
      { condition: 'Post-surgery (first 6 weeks)', modifications: ['Walking only', 'No lifting', 'Start with 5 minutes'] },
      { condition: 'Heart failure', modifications: ['Monitor symptoms closely', 'Rest if short of breath', 'Limit to RPE 3/10'] },
      { condition: 'Hypertension', modifications: ['Avoid holding breath', 'No heavy lifting', 'Stop if dizzy'] }
    ],
    equipment: ['Comfortable shoes', 'Heart rate monitor (optional)', 'Chair for support'],
    medicalWarning: 'STOP and seek medical help if you experience: chest pain, severe shortness of breath, dizziness, irregular heartbeat, or unusual fatigue. Always get medical clearance before starting.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JOINT HEALTH / ARTHRITIS
  // ─────────────────────────────────────────────────────────────────────────
  'joint-mobility': {
    id: 'joint-mobility',
    name: 'Joint Mobility & Arthritis Exercise Plan',
    description: 'Gentle exercises to improve joint flexibility, reduce stiffness, and manage arthritis symptoms.',
    targetConditions: ['osteoarthritis', 'rheumatoid-arthritis', 'joint-pain', 'stiffness'],
    targetSymptoms: ['joint-pain', 'stiffness', 'limited-mobility', 'swelling'],
    goals: ['Reduce stiffness', 'Improve range of motion', 'Strengthen supporting muscles', 'Reduce pain'],
    intensity: 'low',
    frequency: '5-7 days/week (gentle daily movement)',
    duration: '20-30 minutes',
    warmup: [
      {
        name: 'Warm Water or Heat',
        description: 'Apply warm compress or warm shower to joints',
        duration: '5-10 minutes',
        muscleGroups: ['all joints'],
        icon: '♨️',
        difficulty: 'beginner'
      },
      {
        name: 'Gentle Range of Motion',
        description: 'Slowly move each joint through its range',
        duration: '5 minutes',
        muscleGroups: ['all joints'],
        icon: '🔄',
        difficulty: 'beginner'
      }
    ],
    mainExercises: [
      {
        name: 'Water Aerobics / Pool Walking',
        description: 'Low-impact exercise in warm water (preferred)',
        duration: '20-30 minutes',
        muscleGroups: ['full body'],
        icon: '🏊',
        difficulty: 'beginner',
        modifications: ['Pool temperature 82-86°F ideal', 'Use pool noodle for support']
      },
      {
        name: 'Seated Leg Extensions',
        description: 'Strengthen quadriceps without joint stress',
        sets: 2,
        reps: 10,
        restBetween: '30 seconds',
        muscleGroups: ['quadriceps', 'knees'],
        icon: '🦵',
        difficulty: 'beginner'
      },
      {
        name: 'Finger & Hand Exercises',
        description: 'Ball squeezes and finger stretches',
        sets: 2,
        reps: 10,
        muscleGroups: ['hands', 'fingers'],
        icon: '✊',
        difficulty: 'beginner'
      },
      {
        name: 'Gentle Yoga Stretches',
        description: 'Cat-cow, seated twists, gentle forward folds',
        duration: '10 minutes',
        muscleGroups: ['spine', 'hips', 'shoulders'],
        icon: '🧘',
        difficulty: 'beginner',
        modifications: ['Use props like blocks and straps', 'Chair yoga if needed']
      }
    ],
    cooldown: [
      {
        name: 'Static Stretches',
        description: 'Hold gentle stretches for 15-30 seconds each',
        duration: '5 minutes',
        muscleGroups: ['all major joints'],
        icon: '🧘',
        difficulty: 'beginner'
      },
      {
        name: 'Ice Application (if needed)',
        description: 'Apply ice to any inflamed joints for 10-15 minutes',
        duration: '10-15 minutes',
        muscleGroups: ['affected joints'],
        icon: '🧊',
        difficulty: 'beginner'
      }
    ],
    progressions: [
      { week: 1, changes: ['Focus on range of motion only', 'No resistance'] },
      { week: 2, changes: ['Add isometric holds', '5-second holds'] },
      { week: 4, changes: ['Light resistance band exercises', 'Increase water exercise time'] },
      { week: 6, changes: ['Progress to standing exercises if able'] }
    ],
    contraindications: [
      'Acute joint inflammation (hot, red, severely swollen)',
      'Joint instability',
      'Recent joint surgery without clearance',
      'Severe pain during exercise'
    ],
    modifications: [
      { condition: 'Knee arthritis', modifications: ['Avoid deep squats', 'Pool exercises preferred', 'Cycling over walking'] },
      { condition: 'Hand arthritis', modifications: ['Use ergonomic tools', 'Wax bath therapy', 'Gentle ball exercises'] },
      { condition: 'Hip arthritis', modifications: ['Avoid high impact', 'Limit hip rotation', 'Water walking ideal'] }
    ],
    equipment: ['Resistance bands (light)', 'Exercise ball', 'Warm water pool (ideal)', 'Chair for support'],
    medicalWarning: 'Exercise should not increase joint pain significantly. Some discomfort is normal, but sharp pain means stop. During flares, reduce activity and rest.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST-SURGERY REHABILITATION
  // ─────────────────────────────────────────────────────────────────────────
  'post-surgery-rehab': {
    id: 'post-surgery-rehab',
    name: 'Post-Surgery Rehabilitation Plan',
    description: 'Gradual exercise program to restore function and strength after surgery.',
    targetConditions: ['post-surgical', 'bariatric-surgery', 'orthopedic-surgery'],
    targetSymptoms: ['weakness', 'limited-mobility', 'fatigue', 'deconditioning'],
    goals: ['Prevent blood clots', 'Restore mobility', 'Rebuild strength', 'Return to daily activities'],
    intensity: 'low',
    frequency: 'Daily (as tolerated)',
    duration: '10-30 minutes (progressive)',
    warmup: [
      {
        name: 'Ankle Pumps',
        description: 'Flex and point ankles to promote circulation',
        sets: 3,
        reps: 10,
        muscleGroups: ['ankles', 'calves'],
        icon: '🦶',
        difficulty: 'beginner'
      },
      {
        name: 'Deep Breathing',
        description: 'Diaphragmatic breathing to prevent pneumonia',
        duration: '2 minutes',
        muscleGroups: ['respiratory'],
        icon: '🌬️',
        difficulty: 'beginner'
      }
    ],
    mainExercises: [
      {
        name: 'Bed Exercises',
        description: 'Leg slides, heel raises, and gentle movements in bed',
        sets: 2,
        reps: 10,
        muscleGroups: ['legs'],
        icon: '🛏️',
        difficulty: 'beginner'
      },
      {
        name: 'Sitting to Standing',
        description: 'Practice transfers with assistance as needed',
        sets: 3,
        reps: 5,
        restBetween: '1 minute',
        muscleGroups: ['legs', 'core'],
        icon: '🪑',
        difficulty: 'beginner'
      },
      {
        name: 'Short Walking',
        description: 'Walk short distances with support if needed',
        duration: '5-15 minutes',
        muscleGroups: ['legs', 'cardiovascular'],
        icon: '🚶',
        difficulty: 'beginner',
        modifications: ['Use walker initially', 'Rest as needed', 'Increase gradually']
      },
      {
        name: 'Gentle Stretching',
        description: 'Stretch major muscle groups (avoid surgical area)',
        duration: '5 minutes',
        muscleGroups: ['varies'],
        icon: '🧘',
        difficulty: 'beginner'
      }
    ],
    cooldown: [
      {
        name: 'Rest and Elevation',
        description: 'Rest with legs elevated if applicable',
        duration: '5-10 minutes',
        muscleGroups: ['legs'],
        icon: '🛋️',
        difficulty: 'beginner'
      }
    ],
    progressions: [
      { week: 1, changes: ['Bed exercises only', 'Breathing exercises', 'Assisted transfers'] },
      { week: 2, changes: ['Short walks 2-3x daily', 'Seated exercises', 'Independent transfers'] },
      { week: 4, changes: ['Longer walks', 'Light resistance exercises', 'Stairs with support'] },
      { week: 6, changes: ['Normal walking', 'Progressive resistance', 'Return to light activities'] },
      { week: 8, changes: ['Near-normal activity', 'Moderate exercise', 'Sport-specific training begins'] }
    ],
    contraindications: [
      'Wound dehiscence',
      'Active infection',
      'Severe pain',
      'Surgeon restrictions not met'
    ],
    modifications: [
      { condition: 'Abdominal surgery', modifications: ['No core exercises for 6 weeks', 'Splint incision when coughing', 'No lifting over 10 lbs'] },
      { condition: 'Joint replacement', modifications: ['Follow specific precautions', 'Use prescribed aids', 'Physical therapy essential'] },
      { condition: 'Cardiac surgery', modifications: ['Sternal precautions 8-12 weeks', 'No pushing/pulling', 'Cardiac rehab recommended'] }
    ],
    equipment: ['Walker/cane (if needed)', 'Compression stockings', 'Incentive spirometer'],
    medicalWarning: 'Follow your surgeon\'s specific guidelines. Report any signs of infection (fever, redness, drainage), blood clots (leg swelling, pain, shortness of breath), or other complications immediately.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STRESS RELIEF / MENTAL WELLNESS
  // ─────────────────────────────────────────────────────────────────────────
  'stress-relief': {
    id: 'stress-relief',
    name: 'Stress Relief & Mental Wellness Exercise Plan',
    description: 'Mind-body exercises to reduce stress, anxiety, and improve mental well-being.',
    targetConditions: ['anxiety', 'depression', 'chronic-stress', 'insomnia'],
    targetSymptoms: ['anxiety', 'tension', 'insomnia', 'racing-thoughts', 'muscle-tension'],
    goals: ['Reduce stress hormones', 'Improve mood', 'Better sleep', 'Increase relaxation'],
    intensity: 'low',
    frequency: 'Daily for stress management',
    duration: '20-45 minutes',
    warmup: [
      {
        name: 'Body Scan',
        description: 'Mental scan from head to toe, releasing tension',
        duration: '3 minutes',
        muscleGroups: ['mind', 'full body'],
        icon: '🧠',
        difficulty: 'beginner'
      },
      {
        name: 'Gentle Neck Rolls',
        description: 'Slowly roll head to release neck tension',
        duration: '2 minutes',
        muscleGroups: ['neck', 'shoulders'],
        icon: '🔄',
        difficulty: 'beginner'
      }
    ],
    mainExercises: [
      {
        name: 'Yoga Flow',
        description: 'Gentle vinyasa or hatha yoga sequence',
        duration: '20-30 minutes',
        muscleGroups: ['full body', 'mind'],
        icon: '🧘',
        difficulty: 'beginner',
        modifications: ['Chair yoga if needed', 'Use props', 'Restorative poses for relaxation']
      },
      {
        name: 'Walking Meditation',
        description: 'Mindful walking focusing on breath and steps',
        duration: '15-20 minutes',
        muscleGroups: ['legs', 'mind'],
        icon: '🚶‍♀️',
        difficulty: 'beginner'
      },
      {
        name: 'Tai Chi / Qigong',
        description: 'Slow, flowing movements with breath coordination',
        duration: '15-20 minutes',
        muscleGroups: ['full body', 'balance', 'mind'],
        icon: '🥋',
        difficulty: 'beginner'
      },
      {
        name: 'Progressive Muscle Relaxation',
        description: 'Systematically tense and release muscle groups',
        duration: '10-15 minutes',
        muscleGroups: ['full body'],
        icon: '💆',
        difficulty: 'beginner'
      }
    ],
    cooldown: [
      {
        name: 'Savasana / Corpse Pose',
        description: 'Complete relaxation lying down',
        duration: '5-10 minutes',
        muscleGroups: ['full body', 'mind'],
        icon: '😌',
        difficulty: 'beginner'
      },
      {
        name: 'Box Breathing',
        description: '4 counts inhale, hold, exhale, hold',
        duration: '5 minutes',
        muscleGroups: ['respiratory', 'nervous system'],
        icon: '🫁',
        difficulty: 'beginner'
      }
    ],
    progressions: [
      { week: 1, changes: ['Start with 10 min meditation', 'Basic breathing exercises'] },
      { week: 2, changes: ['Add gentle yoga', '15-20 minutes total'] },
      { week: 4, changes: ['Build to 30 minutes', 'Try tai chi or qigong'] },
      { week: 6, changes: ['Establish daily practice', 'Combine modalities'] }
    ],
    contraindications: [
      'Acute psychosis',
      'Severe PTSD (without professional guidance)',
      'Physical limitations (modify poses)'
    ],
    modifications: [
      { condition: 'Anxiety', modifications: ['Avoid breath holds if triggering', 'Keep eyes open if needed', 'Shorter sessions'] },
      { condition: 'Depression', modifications: ['More active practices', 'Walking over sitting', 'Group classes helpful'] },
      { condition: 'Insomnia', modifications: ['Practice in evening', 'Focus on relaxation techniques', 'Avoid stimulating activities'] }
    ],
    equipment: ['Yoga mat', 'Comfortable clothing', 'Quiet space', 'Meditation cushion (optional)'],
    medicalWarning: 'If you have severe mental health conditions, combine exercise with professional treatment. Exercise is complementary, not a replacement for therapy or medication.'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RESPIRATORY HEALTH
  // ─────────────────────────────────────────────────────────────────────────
  'respiratory-strength': {
    id: 'respiratory-strength',
    name: 'Respiratory Strengthening Plan',
    description: 'Breathing exercises and light cardio to improve lung function and capacity.',
    targetConditions: ['copd', 'asthma', 'post-covid', 'respiratory-weakness'],
    targetSymptoms: ['shortness-breath', 'wheezing', 'reduced-capacity', 'fatigue'],
    goals: ['Improve lung capacity', 'Strengthen respiratory muscles', 'Better oxygen efficiency', 'Reduce breathlessness'],
    intensity: 'low',
    frequency: '3-5 days/week',
    duration: '15-30 minutes',
    warmup: [
      {
        name: 'Pursed Lip Breathing',
        description: 'Inhale through nose, exhale slowly through pursed lips',
        duration: '3 minutes',
        muscleGroups: ['respiratory'],
        icon: '👄',
        difficulty: 'beginner'
      },
      {
        name: 'Shoulder Shrugs',
        description: 'Relax shoulder tension that affects breathing',
        sets: 2,
        reps: 10,
        muscleGroups: ['shoulders', 'neck'],
        icon: '🤷',
        difficulty: 'beginner'
      }
    ],
    mainExercises: [
      {
        name: 'Diaphragmatic Breathing',
        description: 'Deep belly breathing to strengthen diaphragm',
        duration: '5-10 minutes',
        sets: 3,
        reps: 10,
        muscleGroups: ['diaphragm', 'respiratory'],
        icon: '🫁',
        difficulty: 'beginner'
      },
      {
        name: 'Incentive Spirometry',
        description: 'Use device to practice sustained deep breaths',
        sets: 3,
        reps: 10,
        restBetween: '30 seconds',
        muscleGroups: ['lungs'],
        icon: '📊',
        difficulty: 'beginner'
      },
      {
        name: 'Walking with Breath Control',
        description: 'Coordinate breathing with steps (inhale 2 steps, exhale 4 steps)',
        duration: '10-15 minutes',
        muscleGroups: ['legs', 'respiratory'],
        icon: '🚶',
        difficulty: 'beginner'
      },
      {
        name: 'Upper Body Stretches',
        description: 'Stretches to open chest and improve lung expansion',
        duration: '5 minutes',
        muscleGroups: ['chest', 'back', 'shoulders'],
        icon: '🧘',
        difficulty: 'beginner'
      }
    ],
    cooldown: [
      {
        name: 'Relaxation Breathing',
        description: '4-7-8 breathing technique',
        duration: '5 minutes',
        muscleGroups: ['respiratory'],
        icon: '😌',
        difficulty: 'beginner'
      }
    ],
    progressions: [
      { week: 1, changes: ['Breathing exercises only', '2x daily'] },
      { week: 2, changes: ['Add 5-minute walks', 'Use pursed lip breathing'] },
      { week: 4, changes: ['10-minute walks', 'Increase spirometry reps'] },
      { week: 6, changes: ['15-minute walks', 'Light resistance exercises'] }
    ],
    contraindications: [
      'Acute respiratory infection',
      'Uncontrolled asthma attack',
      'Oxygen saturation below 88% at rest',
      'Severe shortness of breath at rest'
    ],
    modifications: [
      { condition: 'COPD', modifications: ['Use supplemental oxygen if prescribed', 'Rest between exercises', 'Monitor oxygen levels'] },
      { condition: 'Asthma', modifications: ['Use rescue inhaler before exercise', 'Avoid cold air', 'Indoor exercise during pollen season'] },
      { condition: 'Post-COVID', modifications: ['Very gradual progression', 'Monitor heart rate', 'Stop if symptoms worsen'] }
    ],
    equipment: ['Incentive spirometer', 'Pulse oximeter (recommended)', 'Comfortable seating'],
    medicalWarning: 'Monitor oxygen saturation during exercise. Stop if you experience severe breathlessness, chest pain, dizziness, or confusion. Always have rescue medications available if prescribed.'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get recommended meal plans based on symptoms
 */
export function getMealPlansBySymptoms(symptoms: string[]): MealPlan[] {
  const plans: MealPlan[] = [];
  
  for (const plan of Object.values(MEAL_PLANS)) {
    const matchingSymptoms = symptoms.filter(s => 
      plan.targetSymptoms.some(ts => ts.includes(s) || s.includes(ts))
    );
    
    if (matchingSymptoms.length > 0) {
      plans.push(plan);
    }
  }
  
  return plans;
}

/**
 * Get recommended meal plans based on conditions
 */
export function getMealPlansByConditions(conditions: string[]): MealPlan[] {
  const plans: MealPlan[] = [];
  
  for (const plan of Object.values(MEAL_PLANS)) {
    const matchingConditions = conditions.filter(c => 
      plan.targetConditions.some(tc => tc.includes(c) || c.includes(tc))
    );
    
    if (matchingConditions.length > 0) {
      plans.push(plan);
    }
  }
  
  return plans;
}

/**
 * Get recommended exercise plans based on symptoms
 */
export function getExercisePlansBySymptoms(symptoms: string[]): ExercisePlan[] {
  const plans: ExercisePlan[] = [];
  
  for (const plan of Object.values(EXERCISE_PLANS)) {
    const matchingSymptoms = symptoms.filter(s => 
      plan.targetSymptoms.some(ts => ts.includes(s) || s.includes(ts))
    );
    
    if (matchingSymptoms.length > 0) {
      plans.push(plan);
    }
  }
  
  return plans;
}

/**
 * Get recommended exercise plans based on conditions
 */
export function getExercisePlansByConditions(conditions: string[]): ExercisePlan[] {
  const plans: ExercisePlan[] = [];
  
  for (const plan of Object.values(EXERCISE_PLANS)) {
    const matchingConditions = conditions.filter(c => 
      plan.targetConditions.some(tc => tc.includes(c) || c.includes(tc))
    );
    
    if (matchingConditions.length > 0) {
      plans.push(plan);
    }
  }
  
  return plans;
}

/**
 * Get complete wellness recommendations
 */
export function getWellnessRecommendations(symptoms: string[], conditions: string[]): {
  mealPlans: MealPlan[];
  exercisePlans: ExercisePlan[];
} {
  const symptomMealPlans = getMealPlansBySymptoms(symptoms);
  const conditionMealPlans = getMealPlansByConditions(conditions);
  const symptomExercisePlans = getExercisePlansBySymptoms(symptoms);
  const conditionExercisePlans = getExercisePlansByConditions(conditions);
  
  // Combine and deduplicate
  const mealPlanMap = new Map<string, MealPlan>();
  [...symptomMealPlans, ...conditionMealPlans].forEach(p => mealPlanMap.set(p.id, p));
  
  const exercisePlanMap = new Map<string, ExercisePlan>();
  [...symptomExercisePlans, ...conditionExercisePlans].forEach(p => exercisePlanMap.set(p.id, p));
  
  return {
    mealPlans: Array.from(mealPlanMap.values()),
    exercisePlans: Array.from(exercisePlanMap.values())
  };
}

// Export all
export default {
  MEAL_PLANS,
  EXERCISE_PLANS,
  getMealPlansBySymptoms,
  getMealPlansByConditions,
  getExercisePlansBySymptoms,
  getExercisePlansByConditions,
  getWellnessRecommendations
};
