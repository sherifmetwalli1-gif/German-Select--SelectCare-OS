/**
 * SelectCareOS - Treatment Categories Data
 * Prioritized for Medical Tourism with Names & Symbols
 */

export interface Procedure {
  id: string;
  name: string;
  price: number;
  germanyPrice: number;
  turkeyPrice: number;
  duration: string;
  recovery: string;
  hospitalNights: number;
  recoveryNights: number;
  complexity?: string;
  programType?: string;
}

export interface SurgeryTimeline {
  hospitalStay: string;
  recoveryStay: string;
  totalProgram: string;
  description: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  displayName: string;
  symbol: string;
  icon: string;
  priority: number;
  surgeryTimeline: SurgeryTimeline;
  procedures: Procedure[];
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  // HIGH PRIORITY - Core Medical Procedures
  {
    id: 'bariatric',
    name: 'Weight Loss Surgery',
    displayName: 'MetaFit™ Bariatric',
    symbol: '⚖️',
    icon: 'weight',
    priority: 1,
    surgeryTimeline: {
      hospitalStay: '2 nights',
      recoveryStay: '3 nights',
      totalProgram: '5 nights',
      description: 'Standard bariatric surgery recovery with 5-star resort accommodation'
    },
    procedures: [
      { id: 'gastric-sleeve', name: 'Gastric Sleeve', price: 5500, germanyPrice: 22000, turkeyPrice: 4500, duration: '2-3 hours', recovery: '2-4 weeks', hospitalNights: 2, recoveryNights: 3 },
      { id: 'gastric-bypass', name: 'Gastric Bypass', price: 7500, germanyPrice: 28000, turkeyPrice: 6500, duration: '3-4 hours', recovery: '4-6 weeks', hospitalNights: 2, recoveryNights: 3 },
      { id: 'revision-surgery', name: 'Revision Surgery', price: 9500, germanyPrice: 35000, turkeyPrice: 7500, duration: '3-5 hours', recovery: '4-6 weeks', hospitalNights: 3, recoveryNights: 4 }
    ]
  },
  {
    id: 'orthopedic',
    name: 'Bone & Joint Surgery',
    displayName: 'MoveWell™ Orthopedics',
    symbol: '🦴',
    icon: 'bone',
    priority: 2,
    surgeryTimeline: {
      hospitalStay: '5-7 nights',
      recoveryStay: '7-14 nights',
      totalProgram: '12-21 nights',
      description: 'Complex orthopedic procedures require extended hospital and recovery stays'
    },
    procedures: [
      { id: 'knee-replacement', name: 'Knee Replacement', price: 10500, germanyPrice: 40000, turkeyPrice: 9000, duration: '2-3 hours', recovery: '6-12 weeks', hospitalNights: 5, recoveryNights: 10, complexity: 'complex' },
      { id: 'hip-replacement', name: 'Hip Replacement', price: 13500, germanyPrice: 45000, turkeyPrice: 12000, duration: '2-3 hours', recovery: '6-12 weeks', hospitalNights: 6, recoveryNights: 12, complexity: 'complex' },
      { id: 'spine-surgery', name: 'Spine Surgery', price: 16500, germanyPrice: 55000, turkeyPrice: 14000, duration: '4-6 hours', recovery: '8-16 weeks', hospitalNights: 7, recoveryNights: 14, complexity: 'complex' }
    ]
  },
  {
    id: 'aesthetic',
    name: 'Plastic Surgery',
    displayName: 'SculptBeauty™ Aesthetic',
    symbol: '💎',
    icon: 'sparkles',
    priority: 3,
    surgeryTimeline: {
      hospitalStay: '2-3 nights',
      recoveryStay: '3-5 nights',
      totalProgram: '5-8 nights',
      description: 'Elective plastic surgeries based on complexity'
    },
    procedures: [
      { id: 'facelift', name: 'Facelift', price: 6500, germanyPrice: 25000, turkeyPrice: 5500, duration: '3-5 hours', recovery: '2-4 weeks', hospitalNights: 2, recoveryNights: 4, complexity: 'moderate' },
      { id: 'body-contouring', name: 'Body Contouring', price: 7500, germanyPrice: 30000, turkeyPrice: 6500, duration: '4-6 hours', recovery: '4-6 weeks', hospitalNights: 3, recoveryNights: 5, complexity: 'moderate-complex' },
      { id: 'rhinoplasty', name: 'Rhinoplasty', price: 4200, germanyPrice: 18000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '2-3 weeks', hospitalNights: 1, recoveryNights: 3, complexity: 'moderate' }
    ]
  },
  {
    id: 'antiaging',
    name: 'Anti-Aging & Regenerative',
    displayName: 'AgeLess™ Longevity',
    symbol: '🌟',
    icon: 'clock',
    priority: 4,
    surgeryTimeline: {
      hospitalStay: '0-1 night',
      recoveryStay: '2-3 nights',
      totalProgram: '3 nights',
      description: 'Rejuvenation and anti-aging treatments with spa-resort recovery'
    },
    procedures: [
      { id: 'stem-cell', name: 'Stem Cell Therapy', price: 9500, germanyPrice: 35000, turkeyPrice: 8000, duration: '1-2 hours', recovery: '1 week', hospitalNights: 1, recoveryNights: 2, programType: 'rejuvenation' },
      { id: 'prp-therapy', name: 'PRP Therapy', price: 950, germanyPrice: 8000, turkeyPrice: 800, duration: '1 hour', recovery: '1-2 days', hospitalNights: 0, recoveryNights: 1, programType: 'single-day' },
      { id: 'hormone-therapy', name: 'Hormone Optimization', price: 2950, germanyPrice: 12000, turkeyPrice: 2500, duration: 'Ongoing', recovery: 'None', hospitalNights: 0, recoveryNights: 2, programType: 'rejuvenation' },
      { id: 'iv-therapy', name: 'IV Vitamin & NAD+ Therapy', price: 850, germanyPrice: 4000, turkeyPrice: 1000, duration: '2-4 hours', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'exosome-therapy', name: 'Exosome Therapy', price: 6950, germanyPrice: 25000, turkeyPrice: 6000, duration: '1-2 hours', recovery: '2-3 days', hospitalNights: 0, recoveryNights: 2, programType: 'rejuvenation' }
    ]
  },
  {
    id: 'cardiology',
    name: 'Heart & Vascular',
    displayName: 'HeartCare™ Cardiology',
    symbol: '❤️',
    icon: 'heart',
    priority: 5,
    surgeryTimeline: {
      hospitalStay: '3-5 nights',
      recoveryStay: '5-7 nights',
      totalProgram: '8-12 nights',
      description: 'Cardiac procedures with close monitoring and cardiac rehabilitation'
    },
    procedures: [
      { id: 'cardiac-checkup', name: 'Comprehensive Cardiac Checkup', price: 1450, germanyPrice: 5000, turkeyPrice: 1250, duration: '1 day', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'angioplasty', name: 'Angioplasty', price: 5950, germanyPrice: 20000, turkeyPrice: 5000, duration: '1-2 hours', recovery: '1-2 weeks', hospitalNights: 3, recoveryNights: 5, complexity: 'complex' },
      { id: 'cardiac-stent', name: 'Cardiac Stent Placement', price: 8950, germanyPrice: 28000, turkeyPrice: 7500, duration: '1-2 hours', recovery: '2-3 weeks', hospitalNights: 3, recoveryNights: 7, complexity: 'complex' }
    ]
  },
  {
    id: 'aesthetic-surgical',
    name: 'Cosmetic Surgery',
    displayName: 'TransformU™ Cosmetic',
    symbol: '✨',
    icon: 'user-nurse',
    priority: 6,
    surgeryTimeline: {
      hospitalStay: '2-3 nights',
      recoveryStay: '3-5 nights',
      totalProgram: '5-8 nights',
      description: 'Elective plastic surgeries with recovery based on complexity level'
    },
    procedures: [
      { id: 'rhinoplasty-full', name: 'Rhinoplasty', price: 2950, germanyPrice: 15000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '2-3 weeks', hospitalNights: 1, recoveryNights: 3, complexity: 'moderate' },
      { id: 'breast-augmentation', name: 'Breast Augmentation', price: 2950, germanyPrice: 10000, turkeyPrice: 3500, duration: '2-3 hours', recovery: '4-6 weeks', hospitalNights: 1, recoveryNights: 4, complexity: 'moderate' },
      { id: 'breast-reduction', name: 'Breast Reduction', price: 2450, germanyPrice: 12000, turkeyPrice: 2800, duration: '3-4 hours', recovery: '4-6 weeks', hospitalNights: 2, recoveryNights: 4, complexity: 'moderate' },
      { id: 'breast-lift', name: 'Breast Lift', price: 1950, germanyPrice: 8000, turkeyPrice: 2400, duration: '2-3 hours', recovery: '3-4 weeks', hospitalNights: 1, recoveryNights: 3, complexity: 'moderate' },
      { id: 'liposuction-area', name: 'Liposuction (per area)', price: 1850, germanyPrice: 8000, turkeyPrice: 2400, duration: '1-2 hours', recovery: '2-4 weeks', hospitalNights: 0, recoveryNights: 2, complexity: 'minor', programType: 'single-day' },
      { id: 'facelift-surgical', name: 'Facelift (Surgical)', price: 3450, germanyPrice: 20000, turkeyPrice: 4000, duration: '4-6 hours', recovery: '3-4 weeks', hospitalNights: 2, recoveryNights: 5, complexity: 'moderate-complex' },
      { id: 'blepharoplasty', name: 'Blepharoplasty (Eyelid)', price: 1350, germanyPrice: 5000, turkeyPrice: 1800, duration: '1-2 hours', recovery: '1-2 weeks', hospitalNights: 0, recoveryNights: 2, complexity: 'minor', programType: 'single-day' },
      { id: 'otoplasty', name: 'Otoplasty (Ear Pinning)', price: 1650, germanyPrice: 6000, turkeyPrice: 2000, duration: '1-2 hours', recovery: '1-2 weeks', hospitalNights: 0, recoveryNights: 2, complexity: 'minor', programType: 'single-day' }
    ]
  },
  {
    id: 'non-surgical-face',
    name: 'Non-Surgical Facial',
    displayName: 'FaceLift™ Express',
    symbol: '🌸',
    icon: 'spa',
    priority: 7,
    surgeryTimeline: {
      hospitalStay: '0 nights',
      recoveryStay: '0-3 nights',
      totalProgram: '1-3 nights',
      description: 'Single-day and 3-night rejuvenation programs'
    },
    procedures: [
      { id: 'hifu-face', name: 'HIFU Face Lift', price: 850, germanyPrice: 1400, turkeyPrice: 1200, duration: '60-90 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'ultherapy', name: 'Ultherapy (Branded HIFU)', price: 1350, germanyPrice: 2000, turkeyPrice: 1800, duration: '90 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'rf-tightening', name: 'RF Skin Tightening', price: 650, germanyPrice: 1100, turkeyPrice: 1000, duration: '45-60 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'plasma-pen', name: 'Plasma Pen Treatment', price: 450, germanyPrice: 800, turkeyPrice: 700, duration: '30-60 min', recovery: '5-7 days', hospitalNights: 0, recoveryNights: 2, programType: 'rejuvenation' },
      { id: 'thread-lift', name: 'Thread Lift', price: 1450, germanyPrice: 4000, turkeyPrice: 1800, duration: '60-90 min', recovery: '1-2 weeks', hospitalNights: 0, recoveryNights: 3, programType: 'rejuvenation' },
      { id: 'botox-full', name: 'Botox (Full Face)', price: 350, germanyPrice: 1000, turkeyPrice: 600, duration: '15-30 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'dermal-fillers', name: 'Dermal Fillers (1ml)', price: 250, germanyPrice: 450, turkeyPrice: 400, duration: '30-45 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' }
    ]
  },
  {
    id: 'body-contouring-treatments',
    name: 'Body Sculpting',
    displayName: 'BodyShape™ Contouring',
    symbol: '🎯',
    icon: 'person-dress',
    priority: 8,
    surgeryTimeline: {
      hospitalStay: '1-3 nights',
      recoveryStay: '3-5 nights',
      totalProgram: '4-8 nights',
      description: 'Elective body contouring surgeries with complexity-based timelines'
    },
    procedures: [
      { id: 'vaser-lipo', name: 'VASER Liposuction', price: 2650, germanyPrice: 3800, turkeyPrice: 3500, duration: '2-4 hours', recovery: '2-4 weeks', hospitalNights: 0, recoveryNights: 3, complexity: 'minor', programType: 'single-day' },
      { id: 'coolsculpting', name: 'CoolSculpting (per cycle)', price: 550, germanyPrice: 900, turkeyPrice: 750, duration: '45-60 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'tummy-tuck', name: 'Tummy Tuck (Abdominoplasty)', price: 3150, germanyPrice: 10000, turkeyPrice: 4000, duration: '3-4 hours', recovery: '4-6 weeks', hospitalNights: 2, recoveryNights: 5, complexity: 'moderate-complex' },
      { id: 'arm-lift', name: 'Arm Lift (Brachioplasty)', price: 2450, germanyPrice: 8000, turkeyPrice: 3200, duration: '2-3 hours', recovery: '2-4 weeks', hospitalNights: 1, recoveryNights: 3, complexity: 'moderate' },
      { id: 'thigh-lift', name: 'Thigh Lift', price: 2850, germanyPrice: 9000, turkeyPrice: 3600, duration: '2-3 hours', recovery: '3-4 weeks', hospitalNights: 2, recoveryNights: 4, complexity: 'moderate' }
    ]
  },
  {
    id: 'skin-treatments',
    name: 'Skin Rejuvenation',
    displayName: 'SkinGlow™ Treatments',
    symbol: '✹',
    icon: 'wand-magic-sparkles',
    priority: 9,
    surgeryTimeline: {
      hospitalStay: '0 nights',
      recoveryStay: '0-3 nights',
      totalProgram: '1-3 nights',
      description: 'Single-day treatments and rejuvenation programs'
    },
    procedures: [
      { id: 'fractional-co2', name: 'Fractional CO2 Laser', price: 450, germanyPrice: 1500, turkeyPrice: 700, duration: '30-60 min', recovery: '5-7 days', hospitalNights: 0, recoveryNights: 2, programType: 'rejuvenation' },
      { id: 'chemical-peel', name: 'Chemical Peel (Deep)', price: 250, germanyPrice: 800, turkeyPrice: 350, duration: '30-45 min', recovery: '7-14 days', hospitalNights: 0, recoveryNights: 3, programType: 'rejuvenation' },
      { id: 'microneedling-prp', name: 'Microneedling + PRP', price: 295, germanyPrice: 1000, turkeyPrice: 450, duration: '45-60 min', recovery: '2-3 days', hospitalNights: 0, recoveryNights: 1, programType: 'single-day' },
      { id: 'laser-tattoo', name: 'Laser Tattoo Removal (session)', price: 125, germanyPrice: 300, turkeyPrice: 170, duration: '15-30 min', recovery: '1-2 weeks', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'laser-scar', name: 'Laser Scar Revision (session)', price: 185, germanyPrice: 450, turkeyPrice: 250, duration: '30-45 min', recovery: '3-5 days', hospitalNights: 0, recoveryNights: 1, programType: 'single-day' },
      { id: 'hydrafacial', name: 'Hydrafacial', price: 95, germanyPrice: 350, turkeyPrice: 130, duration: '45-60 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' }
    ]
  },
  {
    id: 'laser-hair-removal',
    name: 'Hair Removal',
    displayName: 'SmoothSkin™ Laser',
    symbol: '⚡',
    icon: 'bolt',
    priority: 10,
    surgeryTimeline: {
      hospitalStay: '0 nights',
      recoveryStay: '0 nights',
      totalProgram: 'Single day',
      description: 'Same-day treatments with no recovery time needed'
    },
    procedures: [
      { id: 'lhr-full-body-female', name: 'Full Body (Female)', price: 850, germanyPrice: 3500, turkeyPrice: 1250, duration: '2-3 hours', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'lhr-full-body-male', name: 'Full Body (Male)', price: 1050, germanyPrice: 4500, turkeyPrice: 1500, duration: '2-3 hours', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'lhr-brazilian', name: 'Brazilian/Bikini', price: 295, germanyPrice: 1200, turkeyPrice: 500, duration: '30-45 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'lhr-legs', name: 'Legs (Full)', price: 395, germanyPrice: 1500, turkeyPrice: 600, duration: '60-90 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'lhr-face', name: 'Face (Full)', price: 250, germanyPrice: 1200, turkeyPrice: 400, duration: '30 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' }
    ]
  },
  {
    id: 'intimate-aesthetics',
    name: 'Intimate Wellness',
    displayName: 'IntimateCare™ Aesthetics',
    symbol: '🌸',
    icon: 'venus',
    priority: 11,
    surgeryTimeline: {
      hospitalStay: '0-2 nights',
      recoveryStay: '2-4 nights',
      totalProgram: '2-6 nights',
      description: 'Non-surgical same-day treatments to elective surgical procedures'
    },
    procedures: [
      { id: 'vaginal-laser', name: 'Vaginal Tightening (Laser)', price: 595, germanyPrice: 3000, turkeyPrice: 850, duration: '30-45 min', recovery: '2-3 days', hospitalNights: 0, recoveryNights: 1, programType: 'single-day' },
      { id: 'vaginal-rf', name: 'Vaginal Tightening (RF)', price: 350, germanyPrice: 2000, turkeyPrice: 500, duration: '30-45 min', recovery: '1-2 days', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'vaginal-hifu', name: 'Vaginal Tightening (HIFU)', price: 285, germanyPrice: 2500, turkeyPrice: 400, duration: '30-45 min', recovery: 'None', hospitalNights: 0, recoveryNights: 0, programType: 'single-day' },
      { id: 'vaginoplasty', name: 'Vaginoplasty (Surgical)', price: 1195, germanyPrice: 5000, turkeyPrice: 1750, duration: '1-2 hours', recovery: '4-6 weeks', hospitalNights: 1, recoveryNights: 4, complexity: 'moderate' },
      { id: 'labiaplasty', name: 'Labiaplasty', price: 995, germanyPrice: 3500, turkeyPrice: 1400, duration: '1-2 hours', recovery: '2-4 weeks', hospitalNights: 0, recoveryNights: 3, complexity: 'minor', programType: 'single-day' }
    ]
  }
];

// Surgery Timeline Programs
export const SURGERY_TIMELINE_PROGRAMS = {
  bariatric: {
    name: 'Bariatric Surgery Program',
    hospitalStay: 2,
    recoveryStay: 3,
    totalNights: 5,
    description: 'Standard bariatric surgery with 2 nights hospital stay followed by 3 nights recovery at 5-star resort'
  },
  complex: {
    name: 'Complex Surgery Program',
    hospitalStay: { min: 5, max: 7 },
    recoveryStay: { min: 7, max: 14 },
    totalNights: { min: 12, max: 21 },
    description: 'Major orthopedic, cardiac, or complex surgical procedures requiring extended hospital monitoring'
  },
  electivePlastic: {
    name: 'Elective Plastic Surgery Program',
    hospitalStay: { min: 2, max: 3 },
    recoveryStay: { min: 3, max: 5 },
    totalNights: { min: 5, max: 8 },
    description: 'Cosmetic and reconstructive surgeries with recovery based on procedure complexity'
  },
  rejuvenation: {
    name: '3-Night Rejuvenation Program',
    hospitalStay: 0,
    recoveryStay: 3,
    totalNights: 3,
    description: 'Anti-aging, regenerative, and wellness treatments with spa-resort recovery'
  },
  singleDay: {
    name: 'Single-Day Elective Program',
    hospitalStay: 0,
    recoveryStay: 0,
    totalNights: 0,
    description: 'Non-surgical treatments and minor procedures completed in a single day visit'
  }
};

// Helper functions
export const getTreatmentById = (id: string): TreatmentCategory | undefined => {
  return TREATMENT_CATEGORIES.find(t => t.id === id);
};

export const getProcedureById = (procedureId: string): Procedure | undefined => {
  for (const category of TREATMENT_CATEGORIES) {
    const procedure = category.procedures.find(p => p.id === procedureId);
    if (procedure) return procedure;
  }
  return undefined;
};

export const getTreatmentsByPriority = (): TreatmentCategory[] => {
  return [...TREATMENT_CATEGORIES].sort((a, b) => a.priority - b.priority);
};

export const getAllProcedures = (): Procedure[] => {
  return TREATMENT_CATEGORIES.flatMap(c => c.procedures);
};
