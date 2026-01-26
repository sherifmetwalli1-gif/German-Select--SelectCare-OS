/**
 * SelectCareOS - Aesthetic Tourism Packages
 * All-Inclusive Aesthetic Packages
 */

export interface AestheticPackage {
  id: string;
  name: string;
  tagline: string;
  priceRange: { min: number; max: number };
  currency: string;
  duration: string;
  hospitalNights: number;
  recoveryNights: number;
  programType: string;
  accommodation: string;
  targetMarket: string;
  proceduresIncluded: string[];
  features: string[];
  popular: boolean;
}

export const AESTHETIC_PACKAGES: AestheticPackage[] = [
  // 3-Night Rejuvenation & Anti-Aging Programs
  {
    id: 'rejuvenation-essentials',
    name: 'Rejuvenation Essentials',
    tagline: '3-Night Anti-Aging Retreat',
    priceRange: { min: 2200, max: 3200 },
    currency: 'USD',
    duration: '3 nights',
    hospitalNights: 0,
    recoveryNights: 3,
    programType: 'rejuvenation',
    accommodation: '5-Star Resort',
    targetMarket: 'Adults 35-65',
    proceduresIncluded: ['PRP Therapy', 'IV Vitamin Drip', 'Hydrafacial', 'Anti-aging consultation'],
    features: ['No Surgery Required', 'Immediate Results', 'German Specialist Consultation', 'Spa Treatments', 'Nutritionist Plan', 'Red Sea Relaxation'],
    popular: true
  },
  {
    id: 'stem-cell-renewal',
    name: 'Stem Cell Renewal',
    tagline: 'Advanced Regenerative Therapy',
    priceRange: { min: 12000, max: 18000 },
    currency: 'USD',
    duration: '3 nights',
    hospitalNights: 0,
    recoveryNights: 3,
    programType: 'rejuvenation',
    accommodation: '5-Star Resort Suite',
    targetMarket: 'Adults 45+',
    proceduresIncluded: ['Stem Cell Therapy', 'NAD+ Infusion', 'Exosome Therapy', 'Full Health Assessment'],
    features: ['Cutting-Edge Science', 'Longevity Focus', 'Private VIP Suite', 'Personal Concierge', 'Follow-up Protocol'],
    popular: true
  },
  {
    id: 'anti-aging-weekend',
    name: 'Anti-Aging Weekend',
    tagline: 'Quick Refresh Escape',
    priceRange: { min: 1500, max: 2200 },
    currency: 'USD',
    duration: '3 nights',
    hospitalNights: 0,
    recoveryNights: 3,
    programType: 'rejuvenation',
    accommodation: '5-Star Resort',
    targetMarket: 'Adults 30-55',
    proceduresIncluded: ['Botox', 'Dermal Fillers', 'HIFU Face Lift', 'Hydrafacial'],
    features: ['Quick Results', 'Non-Invasive', 'Beach Access', 'Spa Package', 'Skincare Kit'],
    popular: false
  },

  // Single-Day Programs
  {
    id: 'beauty-day-express',
    name: 'Beauty Day Express',
    tagline: 'Same-Day Transformation',
    priceRange: { min: 450, max: 1200 },
    currency: 'USD',
    duration: '1 day',
    hospitalNights: 0,
    recoveryNights: 0,
    programType: 'single-day',
    accommodation: 'Day Suite',
    targetMarket: 'All Adults',
    proceduresIncluded: ['Choice of: Botox OR Fillers OR Hydrafacial', 'Consultation', 'Touch-up if needed'],
    features: ['No Overnight Stay', 'Immediate Return', 'Transport Included', 'Aftercare Kit'],
    popular: true
  },
  {
    id: 'laser-day',
    name: 'Laser Day',
    tagline: 'Skin Resurfacing & Hair Removal',
    priceRange: { min: 300, max: 1500 },
    currency: 'USD',
    duration: '1 day',
    hospitalNights: 0,
    recoveryNights: 0,
    programType: 'single-day',
    accommodation: 'Day Suite',
    targetMarket: 'All Adults',
    proceduresIncluded: ['Laser Treatment (Hair/Skin)', 'Consultation', 'Cooling Gel & Aftercare'],
    features: ['Quick Procedure', 'No Downtime', 'Transport Included', 'Aftercare Products'],
    popular: false
  },
  {
    id: 'lipo-express',
    name: 'Lipo Express',
    tagline: 'Day Surgery Body Contouring',
    priceRange: { min: 1800, max: 3500 },
    currency: 'USD',
    duration: '1 day',
    hospitalNights: 0,
    recoveryNights: 0,
    programType: 'single-day',
    accommodation: 'Day Surgery Suite',
    targetMarket: 'Adults 25-55',
    proceduresIncluded: ['VASER Liposuction (1-2 areas)', 'Local Anesthesia', 'Compression Garment'],
    features: ['Minor Surgery', 'Same-Day Return', 'Post-op Care Kit', 'Follow-up Call'],
    popular: false
  },

  // Full Surgical Packages
  {
    id: 'mommy-makeover',
    name: 'Mommy Makeover',
    tagline: 'Complete Post-Pregnancy Restoration',
    priceRange: { min: 8500, max: 14000 },
    currency: 'USD',
    duration: '10-14 nights',
    hospitalNights: 2,
    recoveryNights: 10,
    programType: 'complex',
    accommodation: '5-Star Resort',
    targetMarket: 'Post-pregnancy Women',
    proceduresIncluded: ['Tummy Tuck', 'Breast Lift/Augmentation', 'Liposuction', 'Optional: Labiaplasty'],
    features: ['Multiple Procedures', 'German Surgeon', 'Luxury Recovery', 'Compression Garments', 'Private Nurse Option'],
    popular: true
  },
  {
    id: 'male-makeover',
    name: 'Male Makeover',
    tagline: 'Masculine Transformation Package',
    priceRange: { min: 6500, max: 12000 },
    currency: 'USD',
    duration: '7-10 nights',
    hospitalNights: 1,
    recoveryNights: 7,
    programType: 'electivePlastic',
    accommodation: '5-Star Resort',
    targetMarket: 'Men 30-60',
    proceduresIncluded: ['Gynecomastia Surgery OR Liposuction', 'Hair Transplant Consultation', 'PRP for Hair'],
    features: ['Discreet Service', 'Male-focused Care', 'Fitness Recovery Plan', 'VIP Transfers'],
    popular: false
  },
  {
    id: 'complete-facelift',
    name: 'Complete Facelift Package',
    tagline: 'Comprehensive Facial Rejuvenation',
    priceRange: { min: 9000, max: 15000 },
    currency: 'USD',
    duration: '10-14 nights',
    hospitalNights: 2,
    recoveryNights: 10,
    programType: 'electivePlastic',
    accommodation: '5-Star Private Suite',
    targetMarket: 'Adults 50+',
    proceduresIncluded: ['Full Facelift', 'Blepharoplasty', 'Neck Lift', 'Fat Transfer (optional)'],
    features: ['Surgical Excellence', 'Private Recovery', 'Scar Management', 'Photography Documentation'],
    popular: false
  }
];

// Helper functions
export const getAestheticPackageById = (id: string): AestheticPackage | undefined => {
  return AESTHETIC_PACKAGES.find(p => p.id === id);
};

export const getPackagesByProgramType = (type: string): AestheticPackage[] => {
  return AESTHETIC_PACKAGES.filter(p => p.programType === type);
};

export const getPopularAestheticPackages = (): AestheticPackage[] => {
  return AESTHETIC_PACKAGES.filter(p => p.popular);
};

export const getSingleDayPackages = (): AestheticPackage[] => {
  return AESTHETIC_PACKAGES.filter(p => p.programType === 'single-day');
};

export const getRejuvenationPackages = (): AestheticPackage[] => {
  return AESTHETIC_PACKAGES.filter(p => p.programType === 'rejuvenation');
};
