/**
 * SelectCareOS - Accommodations & Excursions Data
 */

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  price_per_night: number;
  features: string[];
  rating: number;
}

export interface Excursion {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface WellnessService {
  id: string;
  name: string;
  price_from: number;
  description: string;
  duration: string;
}

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'standard-hotel',
    name: '4-Star Hotel',
    type: 'Hotel',
    price_per_night: 120,
    features: ['Sea View', 'Breakfast Included', 'Airport Transfer', 'Wi-Fi'],
    rating: 4.2
  },
  {
    id: 'premium-resort',
    name: '5-Star Resort',
    type: 'Resort',
    price_per_night: 280,
    features: ['Private Beach', 'All-Inclusive', 'Spa Access', 'Butler Service', 'Pool'],
    rating: 4.8
  },
  {
    id: 'private-villa',
    name: 'Private Villa',
    type: 'Villa',
    price_per_night: 550,
    features: ['Private Pool', 'Personal Chef', 'Private Nurse Option', '24/7 Concierge', 'Sea View'],
    rating: 5.0
  }
];

export const EXCURSIONS: Excursion[] = [
  { id: 'red-sea-diving', name: 'Red Sea Diving Experience', price: 150, duration: 'Full Day' },
  { id: 'desert-safari', name: 'Desert Safari Adventure', price: 120, duration: 'Half Day' },
  { id: 'luxor-tour', name: 'Luxor Ancient Temple Tour', price: 250, duration: 'Full Day' },
  { id: 'yacht-cruise', name: 'Private Yacht Cruise', price: 500, duration: 'Full Day' },
  { id: 'snorkeling', name: 'Snorkeling Trip', price: 80, duration: 'Half Day' },
  { id: 'spa-day', name: 'Luxury Spa Day', price: 200, duration: 'Full Day' }
];

export const WELLNESS_SERVICES: WellnessService[] = [
  { id: 'massage', name: 'Therapeutic Massage', price_from: 80, description: 'Various massage techniques', duration: '60-90 min' },
  { id: 'acupuncture', name: 'Acupuncture Session', price_from: 120, description: 'Traditional Chinese medicine', duration: '45-60 min' },
  { id: 'yoga', name: 'Private Yoga Session', price_from: 60, description: 'Personalized yoga instruction', duration: '60 min' },
  { id: 'nutrition', name: 'Nutrition Consultation', price_from: 100, description: 'Personalized diet planning', duration: '45 min' },
  { id: 'physiotherapy', name: 'Physiotherapy Session', price_from: 90, description: 'Rehabilitation exercises', duration: '45-60 min' }
];

export const TELEMEDICINE_SPECS = {
  videoPlatform: { name: 'Zoom Healthcare or Doxy.me', compliance: 'HIPAA/GDPR-compliant' },
  examinationCamera: { name: 'High-resolution USB camera + ring light' },
  digitalStethoscope: { name: 'Eko Core or ThinkLabs One', connectivity: 'Bluetooth' },
  ehrIntegration: { name: 'Custom API connector', method: 'Zapier or n8n workflow' },
  cloudVps: { specs: '4 vCPU, 8GB RAM, 100GB SSD', cost: '€80-€120/month', compliance: 'GDPR Article 32' }
};

// Helper functions
export const getAccommodationById = (id: string): Accommodation | undefined => {
  return ACCOMMODATIONS.find(a => a.id === id);
};

export const getExcursionById = (id: string): Excursion | undefined => {
  return EXCURSIONS.find(e => e.id === id);
};

export const getAccommodationsByType = (type: string): Accommodation[] => {
  return ACCOMMODATIONS.filter(a => a.type.toLowerCase() === type.toLowerCase());
};

export const getTotalExcursionCost = (excursionIds: string[]): number => {
  return excursionIds.reduce((total, id) => {
    const excursion = getExcursionById(id);
    return total + (excursion?.price || 0);
  }, 0);
};
