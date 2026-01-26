/**
 * SelectCareOS - Care Packages Data
 * Service Package Names and Symbols - Redesigned for clarity and appeal
 */

export interface CarePackage {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  tier: string;
  price_range: { min: number; max: number };
  base_price: number;
  turkey_comparison: number;
  savings_vs_germany: number;
  currency: string;
  description: string;
  hospitalNights: number;
  recoveryNights: number;
  totalNights: number;
  surgeryType: string;
  features: string[];
  inclusions: string[];
  duration_days: number;
  recovery_days: number;
  popular: boolean;
}

export const CARE_PACKAGES: CarePackage[] = [
  {
    id: 'healbridge-essential',
    name: 'HealBridge Essential',
    symbol: '🌉',
    icon: 'bridge',
    tier: 'Essential',
    price_range: { min: 4500, max: 8000 },
    base_price: 5500,
    turkey_comparison: 4500,
    savings_vs_germany: 16500,
    currency: 'EUR',
    description: 'Your bridge to German-standard bariatric care',
    hospitalNights: 2,
    recoveryNights: 3,
    totalNights: 5,
    surgeryType: 'bariatric',
    features: [
      'German Board-Certified Surgeon',
      'JCI-Certified Facility',
      '2 Nights Hospital Stay',
      '3 Nights Resort Recovery',
      '4-Star Accommodation',
      'Airport Transfers',
      '1-Year Digital Follow-up',
      'SelectCareOS™ Access',
      '24/7 Support Line'
    ],
    inclusions: ['Surgery', '2 Nights Hospital', '3 Nights Recovery', 'Medications', 'Lab Tests', 'Accommodation', 'Transfers'],
    duration_days: 5,
    recovery_days: 3,
    popular: false
  },
  {
    id: 'vitacare-premium',
    name: 'VitaCare Premium',
    symbol: '✨',
    icon: 'star',
    tier: 'Premium',
    price_range: { min: 7500, max: 15000 },
    base_price: 9500,
    turkey_comparison: 7500,
    savings_vs_germany: 22500,
    currency: 'EUR',
    description: 'Premium aesthetic surgery with luxury recovery',
    hospitalNights: 2,
    recoveryNights: 5,
    totalNights: 7,
    surgeryType: 'aesthetic',
    features: [
      'German Board-Certified Surgeon',
      'JCI-Certified Facility',
      '2 Nights Hospital Stay',
      '5 Nights Luxury Resort',
      '5-Star Accommodation',
      'VIP Airport Lounge',
      'Personal Patient Coordinator',
      'Compression Garments',
      'Lifetime Follow-up',
      'SelectCareOS™ Premium'
    ],
    inclusions: ['Surgery', '2 Nights Hospital', '5 Nights Resort', 'All Medications', 'Post-op Supplies', 'Spa Access', 'VIP Transfers'],
    duration_days: 7,
    recovery_days: 5,
    popular: true
  },
  {
    id: 'elitecare-royal',
    name: 'EliteCare Royal',
    symbol: '👑',
    icon: 'crown',
    tier: 'Royal',
    price_range: { min: 15000, max: 35000 },
    base_price: 22000,
    turkey_comparison: 18000,
    savings_vs_germany: 45000,
    currency: 'EUR',
    description: 'The ultimate medical tourism experience',
    hospitalNights: 3,
    recoveryNights: 11,
    totalNights: 14,
    surgeryType: 'complex',
    features: [
      'Senior German Consultant Surgeon',
      'Private Hospital Suite',
      '3 Nights Hospital Stay',
      '11 Nights Private Villa',
      'Private Pool Villa',
      'Personal Chef',
      'Private Nurse (12 hrs/day)',
      'Physical Therapist',
      'Helicopter Transfer Option',
      'Concierge Service',
      'Lifetime VIP Access'
    ],
    inclusions: ['All Medical', 'Private Suite', 'Private Villa', 'Personal Staff', 'All Meals', 'Luxury Transfers', 'Excursions'],
    duration_days: 14,
    recovery_days: 11,
    popular: false
  },
  {
    id: 'renew-retreat',
    name: 'Renew Retreat',
    symbol: '🌿',
    icon: 'leaf',
    tier: 'Wellness',
    price_range: { min: 3500, max: 6000 },
    base_price: 4200,
    turkey_comparison: 3500,
    savings_vs_germany: 8000,
    currency: 'EUR',
    description: '3-night rejuvenation retreat with anti-aging treatments',
    hospitalNights: 0,
    recoveryNights: 3,
    totalNights: 3,
    surgeryType: 'rejuvenation',
    features: [
      'IV Therapy Protocols',
      'PRP/Stem Cell Treatments',
      '3 Nights 5-Star Resort',
      'Daily Spa Treatments',
      'Nutritionist Consultation',
      'Fitness Assessment',
      'Anti-aging Skincare Kit',
      'Follow-up Telemedicine'
    ],
    inclusions: ['Treatments', '3 Nights Resort', 'All Meals', 'Spa Access', 'Transfers', 'Skincare Kit'],
    duration_days: 3,
    recovery_days: 3,
    popular: true
  },
  {
    id: 'glow-express',
    name: 'Glow Express',
    symbol: '⚡',
    icon: 'bolt',
    tier: 'Day',
    price_range: { min: 500, max: 2000 },
    base_price: 850,
    turkey_comparison: 750,
    savings_vs_germany: 1500,
    currency: 'EUR',
    description: 'Single-day aesthetic treatment with same-day results',
    hospitalNights: 0,
    recoveryNights: 0,
    totalNights: 0,
    surgeryType: 'single-day',
    features: [
      'Same-Day Treatment',
      'Botox / Fillers / HIFU',
      'Private Treatment Suite',
      'Refreshments Included',
      'Transportation',
      'Follow-up Consultation',
      'Touch-up Option'
    ],
    inclusions: ['Treatment', 'Day Suite', 'Refreshments', 'Transportation', 'Follow-up Consultation'],
    duration_days: 1,
    recovery_days: 0,
    popular: false
  }
];

// Helper functions
export const getPackageById = (id: string): CarePackage | undefined => {
  return CARE_PACKAGES.find(p => p.id === id);
};

export const getPackagesByTier = (tier: string): CarePackage[] => {
  return CARE_PACKAGES.filter(p => p.tier.toLowerCase() === tier.toLowerCase());
};

export const getPopularPackages = (): CarePackage[] => {
  return CARE_PACKAGES.filter(p => p.popular);
};

export const getPackagesBySurgeryType = (surgeryType: string): CarePackage[] => {
  return CARE_PACKAGES.filter(p => p.surgeryType === surgeryType);
};
