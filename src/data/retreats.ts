/**
 * SelectCareOS - Medical Retreats & Hotels Data
 * Medically Supervised Retreats & SELECT Hotels
 */

export interface MedicalRetreat {
  id: string;
  name: string;
  tagline: string;
  category: string;
  duration: { nights: number; days: number };
  priceRange: { min: number; max: number };
  currency: string;
  medicalSupervision: string;
  description: string;
  highlights: string[];
  medicalProgram: Array<{ day: number | string; activities: string[] }>;
  inclusions: string[];
  accommodation: string;
  rating: number;
  reviewCount: number;
  popular: boolean;
  image: string;
}

export interface SelectHotel {
  id: string;
  name: string;
  category: string;
  starRating: number;
  location: string;
  distanceToClinic: string;
  pricePerNight: { min: number; max: number };
  currency: string;
  description: string;
  features: string[];
  medicalAmenities: string[];
  roomTypes: Array<{ type: string; price: number; size: string }>;
  rating: number;
  reviewCount: number;
  image: string;
  popular: boolean;
}

export interface RetreatPackage {
  id: string;
  retreatId: string;
  hotelId: string;
  packageName: string;
  totalPrice: { min: number; max: number };
  currency: string;
  savings: number;
  popular: boolean;
}

export const MEDICAL_RETREATS: MedicalRetreat[] = [
  {
    id: 'longevity-reset',
    name: 'Longevity Reset Retreat',
    tagline: 'Science-Based Anti-Aging & Rejuvenation',
    category: 'anti-aging',
    duration: { nights: 7, days: 8 },
    priceRange: { min: 8500, max: 12000 },
    currency: 'EUR',
    medicalSupervision: 'Full-time physician + nursing staff',
    description: 'A comprehensive 7-night medical retreat combining cutting-edge longevity science with Red Sea relaxation. Includes full health assessment, personalized treatment plan, and ongoing support.',
    highlights: [
      'Comprehensive health & longevity assessment',
      'Personalized IV therapy protocols (NAD+, Vitamins)',
      'Stem cell & exosome treatments',
      'Hormone optimization consultation',
      'Daily physiotherapy & wellness sessions',
      'Nutritionist-designed meal plan',
      'Stress reduction & sleep optimization',
      'Post-retreat follow-up program'
    ],
    medicalProgram: [
      { day: 1, activities: ['Arrival & Welcome', 'Initial health assessment', 'Blood work & diagnostics', 'Consultation with longevity physician'] },
      { day: 2, activities: ['Review of results', 'Personalized treatment plan', 'First IV therapy session', 'Physiotherapy assessment'] },
      { day: 3, activities: ['Stem cell / exosome therapy', 'Nutritionist consultation', 'Spa relaxation'] },
      { day: 4, activities: ['Hormone panel review', 'IV therapy', 'Yoga & meditation', 'Beach relaxation'] },
      { day: 5, activities: ['PRP treatments', 'Advanced diagnostics review', 'Personalized fitness session'] },
      { day: 6, activities: ['Final treatments', 'Wellness coaching', 'Spa day'] },
      { day: 7, activities: ['Follow-up consultation', 'Take-home protocol review', 'Departure preparation'] }
    ],
    inclusions: ['All medical treatments', 'Luxury accommodation', 'All meals (nutritionist-designed)', 'Airport transfers', 'Daily spa access', 'Personal concierge'],
    accommodation: 'Steigenberger Pure Lifestyle or equivalent 5-star',
    rating: 4.9,
    reviewCount: 127,
    popular: true,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800'
  },
  {
    id: 'weight-loss-transformation',
    name: 'Weight Loss Transformation',
    tagline: 'Medically Supervised Weight Management',
    category: 'weight-management',
    duration: { nights: 14, days: 15 },
    priceRange: { min: 6500, max: 9500 },
    currency: 'EUR',
    medicalSupervision: 'Bariatric physician + dietitian + fitness coach',
    description: 'A 2-week intensive medical weight loss program with physician supervision, personalized nutrition, and fitness training. Ideal pre or post bariatric surgery support.',
    highlights: [
      'Complete metabolic assessment',
      'Medically supervised diet protocol',
      'Daily fitness & movement sessions',
      'Behavioral therapy for eating habits',
      'Optional GLP-1 medication support',
      'Body composition analysis',
      'Cooking & nutrition classes',
      'Lifetime support community access'
    ],
    medicalProgram: [
      { day: 1, activities: ['Health screening', 'Metabolic testing', 'Fitness assessment', 'Goal setting'] },
      { day: '2-7', activities: ['Morning fitness', 'Medical check-ins', 'Nutrition workshops', 'Evening relaxation'] },
      { day: '8-13', activities: ['Intensified training', 'Cooking classes', 'Behavioral therapy', 'Progress reviews'] },
      { day: 14, activities: ['Final assessment', 'Home program creation', 'Follow-up scheduling'] }
    ],
    inclusions: ['All medical supervision', 'Fitness sessions', 'Calorie-controlled meals', 'Accommodation', 'Supplements', 'Take-home program'],
    accommodation: 'Baron Palace Sahl Hasheesh or equivalent 5-star',
    rating: 4.8,
    reviewCount: 89,
    popular: true,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800'
  },
  {
    id: 'post-surgery-recovery',
    name: 'Post-Surgery Recovery Retreat',
    tagline: 'Premium Medical Recovery Experience',
    category: 'recovery',
    duration: { nights: 10, days: 11 },
    priceRange: { min: 4500, max: 7500 },
    currency: 'EUR',
    medicalSupervision: '24/7 nursing + daily physician visits',
    description: 'Specialized recovery program for patients after surgery. Combines medical monitoring with therapeutic activities in a 5-star resort environment.',
    highlights: [
      '24/7 medical nursing care',
      'Daily physician rounds',
      'Physical rehabilitation sessions',
      'Wound care & monitoring',
      'Pain management protocols',
      'Nutritional support for healing',
      'Lymphatic drainage massage',
      'Psychological support'
    ],
    medicalProgram: [
      { day: '1-3', activities: ['Intensive monitoring', 'Wound care', 'Pain management', 'Gentle mobilization'] },
      { day: '4-7', activities: ['Increased activity', 'Physiotherapy', 'Scar treatment', 'Nutrition optimization'] },
      { day: '8-10', activities: ['Advanced rehabilitation', 'Independence building', 'Discharge planning', 'Follow-up coordination'] }
    ],
    inclusions: ['All medical care', 'Private room', 'Special recovery meals', 'Rehabilitation equipment', 'Compression garments', 'Airport wheelchair service'],
    accommodation: 'Medical-adjacent luxury suite',
    rating: 4.9,
    reviewCount: 156,
    popular: true,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
  },
  {
    id: 'stress-burnout-recovery',
    name: 'Stress & Burnout Recovery',
    tagline: 'Executive Wellness & Mental Reset',
    category: 'mental-wellness',
    duration: { nights: 5, days: 6 },
    priceRange: { min: 5500, max: 8000 },
    currency: 'EUR',
    medicalSupervision: 'Psychiatrist + psychologist + wellness coaches',
    description: 'A medically-guided retreat for executives and professionals experiencing burnout. Combines mental health support with physical wellness in a secluded luxury environment.',
    highlights: [
      'Psychiatric assessment & support',
      'Daily therapy sessions',
      'Stress hormone testing',
      'Sleep study & optimization',
      'Meditation & mindfulness training',
      'Digital detox protocol',
      'Spa & relaxation therapies',
      'Executive coaching sessions'
    ],
    medicalProgram: [
      { day: 1, activities: ['Psychiatric assessment', 'Stress biomarker testing', 'Goal setting', 'Digital detox begins'] },
      { day: 2, activities: ['Therapy session', 'Yoga & meditation', 'Massage therapy', 'Beach relaxation'] },
      { day: 3, activities: ['Sleep optimization', 'Breathing exercises', 'Journaling workshop', 'Spa treatments'] },
      { day: 4, activities: ['Cognitive therapy', 'Fitness session', 'Art therapy', 'Sunset meditation'] },
      { day: 5, activities: ['Integration session', 'Home protocol creation', 'Follow-up scheduling', 'Graduation ceremony'] }
    ],
    inclusions: ['All therapy sessions', 'Luxury suite', 'Wellness meals', 'Spa treatments', 'Meditation app subscription', 'Follow-up teleconsultations'],
    accommodation: 'Oberoi Sahl Hasheesh or equivalent 5-star',
    rating: 4.7,
    reviewCount: 64,
    popular: false,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800'
  },
  {
    id: 'detox-cleanse',
    name: 'Medical Detox & Cleanse',
    tagline: 'Deep Cellular Cleansing Program',
    category: 'detox',
    duration: { nights: 7, days: 8 },
    priceRange: { min: 4000, max: 6000 },
    currency: 'EUR',
    medicalSupervision: 'Physician + nutritionist + naturopath',
    description: 'A physician-supervised detoxification program combining medical protocols with natural therapies. Designed to reset your body at the cellular level.',
    highlights: [
      'Pre-detox medical assessment',
      'Liver & kidney function monitoring',
      'Customized juice & cleanse protocols',
      'Colon hydrotherapy (optional)',
      'IV nutrient support',
      'Infrared sauna sessions',
      'Lymphatic drainage',
      'Reintroduction meal plan'
    ],
    medicalProgram: [
      { day: 1, activities: ['Medical assessment', 'Baseline bloodwork', 'Detox protocol introduction', 'First cleanse meal'] },
      { day: '2-3', activities: ['Juice cleanse phase', 'Daily medical check', 'Spa therapies', 'Gentle movement'] },
      { day: '4-5', activities: ['Deep cleanse phase', 'IV support', 'Colon therapy', 'Rest & rejuvenation'] },
      { day: '6-7', activities: ['Reintroduction phase', 'Final bloodwork', 'Home protocol', 'Meal planning'] }
    ],
    inclusions: ['All detox protocols', 'Organic juices & meals', 'Spa therapies', 'Accommodation', 'Supplements', 'Recipe book'],
    accommodation: 'Wellness-focused 5-star resort',
    rating: 4.6,
    reviewCount: 78,
    popular: false,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800'
  },
  {
    id: 'fertility-wellness',
    name: 'Fertility Wellness Retreat',
    tagline: 'Holistic Fertility Support',
    category: 'fertility',
    duration: { nights: 10, days: 11 },
    priceRange: { min: 7000, max: 11000 },
    currency: 'EUR',
    medicalSupervision: 'Fertility specialist + acupuncturist + nutritionist',
    description: 'A comprehensive fertility support program combining medical assessment with holistic therapies. Suitable for couples or individuals preparing for conception or IVF.',
    highlights: [
      'Fertility assessment (both partners)',
      'Hormone panel & optimization',
      'Acupuncture protocols',
      'Fertility nutrition program',
      'Stress reduction focus',
      'Couples counseling',
      'Supplement optimization',
      'Coordination with home fertility clinic'
    ],
    medicalProgram: [
      { day: 1, activities: ['Comprehensive fertility assessment', 'Hormone testing', 'Ultrasound', 'Nutrition assessment'] },
      { day: '2-5', activities: ['Daily acupuncture', 'Fertility yoga', 'Couples activities', 'Medical consultations'] },
      { day: '6-9', activities: ['Treatment adjustments', 'Relaxation focus', 'Bonding activities', 'Supplement protocols'] },
      { day: 10, activities: ['Final consultation', 'Home protocol', 'Clinic coordination', 'Follow-up scheduling'] }
    ],
    inclusions: ['All medical assessments', 'Acupuncture sessions', 'Couples accommodation', 'Fertility-focused meals', 'Supplements', 'Follow-up support'],
    accommodation: 'Romantic 5-star resort suite',
    rating: 4.8,
    reviewCount: 42,
    popular: false,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
  }
];

export const SELECT_HOTELS: SelectHotel[] = [
  {
    id: 'steigenberger-pure',
    name: 'Steigenberger Pure Lifestyle',
    category: 'luxury',
    starRating: 5,
    location: 'El Gouna, Red Sea',
    distanceToClinic: '15 min',
    pricePerNight: { min: 180, max: 350 },
    currency: 'EUR',
    description: 'Adults-only luxury resort with contemporary design, private beach, and world-class spa. Ideal for recovery in a sophisticated atmosphere.',
    features: [
      'Adults Only (16+)',
      'Private Beach',
      '3 Restaurants, 4 Bars',
      'Infinity Pool',
      'Spa & Wellness Center',
      'Fitness Center',
      'Free Wi-Fi',
      'Airport Transfer Available'
    ],
    medicalAmenities: [
      'In-room medical equipment available',
      'Wheelchair accessible rooms',
      'Special dietary menus',
      'Nurse call service (on request)',
      'Pharmacy nearby'
    ],
    roomTypes: [
      { type: 'Lagoon View Room', price: 180, size: '42m²' },
      { type: 'Sea View Suite', price: 280, size: '65m²' },
      { type: 'Presidential Suite', price: 550, size: '120m²' }
    ],
    rating: 4.8,
    reviewCount: 1247,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    popular: true
  },
  {
    id: 'oberoi-sahl-hasheesh',
    name: 'The Oberoi Sahl Hasheesh',
    category: 'ultra-luxury',
    starRating: 5,
    location: 'Sahl Hasheesh, Red Sea',
    distanceToClinic: '20 min',
    pricePerNight: { min: 350, max: 800 },
    currency: 'EUR',
    description: 'Ultra-luxury beachfront resort with stunning architecture, private pools, and exceptional service. Perfect for discerning patients seeking the finest recovery experience.',
    features: [
      'Private Pool Villas',
      '800m Private Beach',
      'Award-winning Spa',
      'Multiple Fine Dining',
      'Butler Service',
      'Infinity Edge Pools',
      'Tennis Courts',
      'Water Sports Center'
    ],
    medicalAmenities: [
      '24-hour in-villa nurse service available',
      'Medical equipment rental',
      'Private physician visits',
      'Special recovery menus',
      'Wheelchair accessible throughout'
    ],
    roomTypes: [
      { type: 'Superior Suite', price: 350, size: '85m²' },
      { type: 'Royal Suite', price: 550, size: '120m²' },
      { type: 'Villa with Private Pool', price: 800, size: '200m²' }
    ],
    rating: 4.9,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    popular: true
  },
  {
    id: 'baron-palace',
    name: 'Baron Palace Sahl Hasheesh',
    category: 'luxury',
    starRating: 5,
    location: 'Sahl Hasheesh, Red Sea',
    distanceToClinic: '18 min',
    pricePerNight: { min: 150, max: 400 },
    currency: 'EUR',
    description: 'Palatial resort with extensive grounds, multiple pools, and comprehensive wellness facilities. Popular choice for medical tourists seeking value and quality.',
    features: [
      'Private Beach',
      '9 Restaurants & Bars',
      'Multiple Pools',
      'Spa & Wellness Center',
      'Kids Club',
      'Diving Center',
      'Convention Facilities',
      'Shopping Arcade'
    ],
    medicalAmenities: [
      'Medical consultation room',
      'Wheelchair accessible',
      'Dietary accommodation',
      'In-room care available',
      'Pharmacy on-site'
    ],
    roomTypes: [
      { type: 'Deluxe Room', price: 150, size: '45m²' },
      { type: 'Family Suite', price: 280, size: '85m²' },
      { type: 'Royal Suite', price: 400, size: '140m²' }
    ],
    rating: 4.6,
    reviewCount: 2341,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    popular: true
  },
  {
    id: 'kempinski-soma-bay',
    name: 'Kempinski Hotel Soma Bay',
    category: 'ultra-luxury',
    starRating: 5,
    location: 'Soma Bay, Red Sea',
    distanceToClinic: '35 min',
    pricePerNight: { min: 280, max: 650 },
    currency: 'EUR',
    description: 'Elegant beachfront resort with world-class spa and championship golf course. Ideal for longer recovery stays with varied activities.',
    features: [
      'Private Beach',
      'Championship Golf Course',
      'The Spa by Kempinski',
      'Multiple Restaurants',
      'Water Sports',
      'Fitness Center',
      'Tennis Courts',
      'Boutique Shopping'
    ],
    medicalAmenities: [
      'In-room medical equipment',
      'Private nurse available',
      'Special dietary menus',
      'Accessible rooms',
      'Medical transport arranged'
    ],
    roomTypes: [
      { type: 'Superior Sea View', price: 280, size: '55m²' },
      { type: 'Deluxe Suite', price: 450, size: '90m²' },
      { type: 'Presidential Suite', price: 650, size: '150m²' }
    ],
    rating: 4.7,
    reviewCount: 1567,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    popular: false
  },
  {
    id: 'sheraton-soma-bay',
    name: 'Sheraton Soma Bay Resort',
    category: 'luxury',
    starRating: 5,
    location: 'Soma Bay, Red Sea',
    distanceToClinic: '40 min',
    pricePerNight: { min: 140, max: 320 },
    currency: 'EUR',
    description: 'Full-service resort with all-inclusive options, beautiful beach, and comprehensive amenities. Excellent value for extended recovery stays.',
    features: [
      'All-Inclusive Available',
      'Private Beach',
      'Multiple Pools',
      'Shine Spa',
      '5 Restaurants',
      'Diving Center',
      'Kids Club',
      'Evening Entertainment'
    ],
    medicalAmenities: [
      'Accessible rooms available',
      'Medical diet options',
      'Pharmacy nearby',
      'Medical equipment rental',
      'Transport to clinic'
    ],
    roomTypes: [
      { type: 'Garden View Room', price: 140, size: '38m²' },
      { type: 'Sea View Room', price: 200, size: '42m²' },
      { type: 'Suite', price: 320, size: '75m²' }
    ],
    rating: 4.5,
    reviewCount: 1823,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    popular: false
  }
];

export const RETREAT_PACKAGES: RetreatPackage[] = [
  {
    id: 'ultimate-longevity',
    retreatId: 'longevity-reset',
    hotelId: 'steigenberger-pure',
    packageName: 'Ultimate Longevity Experience',
    totalPrice: { min: 9500, max: 14000 },
    currency: 'EUR',
    savings: 1200,
    popular: true
  },
  {
    id: 'recovery-baron',
    retreatId: 'post-surgery-recovery',
    hotelId: 'baron-palace',
    packageName: 'Premium Recovery Package',
    totalPrice: { min: 5500, max: 9000 },
    currency: 'EUR',
    savings: 800,
    popular: true
  },
  {
    id: 'weight-loss-baron',
    retreatId: 'weight-loss-transformation',
    hotelId: 'baron-palace',
    packageName: 'Weight Loss Transformation Package',
    totalPrice: { min: 7500, max: 11000 },
    currency: 'EUR',
    savings: 1000,
    popular: false
  }
];

// Helper functions
export const getRetreatById = (id: string): MedicalRetreat | undefined => {
  return MEDICAL_RETREATS.find(r => r.id === id);
};

export const getHotelById = (id: string): SelectHotel | undefined => {
  return SELECT_HOTELS.find(h => h.id === id);
};

export const getRetreatsByCategory = (category: string): MedicalRetreat[] => {
  return MEDICAL_RETREATS.filter(r => r.category === category);
};

export const getPopularRetreats = (): MedicalRetreat[] => {
  return MEDICAL_RETREATS.filter(r => r.popular);
};

export const getPopularHotels = (): SelectHotel[] => {
  return SELECT_HOTELS.filter(h => h.popular);
};

export const getRetreatPackageById = (id: string): RetreatPackage | undefined => {
  return RETREAT_PACKAGES.find(p => p.id === id);
};
