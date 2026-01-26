/**
 * SelectCareOS - Data Module Index
 * Central export point for all static data
 */

// Doctors
export { DOCTORS, getDoctorById, getDoctorsBySpecialization, getPremiumDoctors, getAvailableDoctors } from './doctors';
export type { Doctor } from './doctors';

// Packages
export { CARE_PACKAGES, getPackageById, getPackagesByTier, getPopularPackages, getPackagesBySurgeryType } from './packages';
export type { CarePackage } from './packages';

// Treatments
export { 
  TREATMENT_CATEGORIES, 
  SURGERY_TIMELINE_PROGRAMS,
  getTreatmentById, 
  getProcedureById, 
  getTreatmentsByPriority, 
  getAllProcedures 
} from './treatments';
export type { TreatmentCategory, Procedure, SurgeryTimeline } from './treatments';

// Retreats & Hotels
export { 
  MEDICAL_RETREATS, 
  SELECT_HOTELS, 
  RETREAT_PACKAGES,
  getRetreatById, 
  getHotelById, 
  getRetreatsByCategory, 
  getPopularRetreats, 
  getPopularHotels,
  getRetreatPackageById
} from './retreats';
export type { MedicalRetreat, SelectHotel, RetreatPackage } from './retreats';

// Accommodations & Excursions
export { 
  ACCOMMODATIONS, 
  EXCURSIONS, 
  WELLNESS_SERVICES,
  TELEMEDICINE_SPECS,
  getAccommodationById, 
  getExcursionById, 
  getAccommodationsByType,
  getTotalExcursionCost
} from './accommodations';
export type { Accommodation, Excursion, WellnessService } from './accommodations';

// Aesthetic Packages
export { 
  AESTHETIC_PACKAGES, 
  getAestheticPackageById, 
  getPackagesByProgramType, 
  getPopularAestheticPackages,
  getSingleDayPackages,
  getRejuvenationPackages
} from './aesthetic-packages';
export type { AestheticPackage } from './aesthetic-packages';
