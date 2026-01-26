/**
 * SelectCareOS - Doctors Data
 * Complete German Select Medical Team
 * Source: www.germanselect.org
 */

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  subspecialties: string[];
  qualifications: string[];
  languages: string[];
  experience_years: number;
  location: string;
  consultation_fee: number;
  rating: number;
  total_reviews: number;
  is_premium: boolean;
  avatar: string;
  available: boolean;
  photo_url?: string | null;
}

export const DOCTORS: Doctor[] = [
  // LEADERSHIP & FOUNDERS
  {
    id: 'dr-metwalli',
    name: 'Dr. med. Sherif Akram Metwalli, M.Sc.',
    title: 'Founder, CEO & CMO',
    specialization: 'Plastic & Reconstructive Surgery',
    subspecialties: ['Post-Bariatric Surgery', 'Body Contouring', 'Facial Surgery'],
    qualifications: ['Triple Board-Certified German Facharzt', '20+ Years International Experience', 'German Select Founder'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 20,
    location: 'Germany / Hurghada',
    consultation_fee: 150,
    rating: 4.9,
    total_reviews: 247,
    is_premium: true,
    avatar: 'SM',
    available: true,
    photo_url: null
  },
  // BARIATRIC SURGERY TEAM
  {
    id: 'dr-sherif-aly',
    name: 'Dr. Sherif Aly, FACS',
    title: 'Chief Consultant Bariatric Surgery',
    specialization: 'Bariatric Surgery',
    subspecialties: ['Gastric Sleeve', 'Gastric Bypass', 'Antireflux Surgery', 'Colorectal Surgery'],
    qualifications: ['Fellow American College of Surgeons (FACS)', 'Chief Consultant Nagold Hospital Germany', 'Bielefeld University Hospitals'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 25,
    location: 'Nagold, Germany / Hurghada',
    consultation_fee: 200,
    rating: 4.95,
    total_reviews: 487,
    is_premium: true,
    avatar: 'SA',
    available: true,
    photo_url: null
  },
  {
    id: 'dr-hesham-elzahi',
    name: 'Dr. Hesham El Zahi',
    title: 'Consultant Surgeon',
    specialization: 'General & Gastrointestinal Surgery',
    subspecialties: ['Laparoscopic Surgery', 'GI Surgery', 'Hernia Repair'],
    qualifications: ['German Board Certified', 'St. Augustinus Krankenhaus Düren'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 18,
    location: 'Düren, Germany / Hurghada',
    consultation_fee: 160,
    rating: 4.8,
    total_reviews: 156,
    is_premium: true,
    avatar: 'HE',
    available: true,
    photo_url: null
  },
  // ORTHOPEDICS
  {
    id: 'dr-weber',
    name: 'Dr. L. Weber',
    title: 'Senior Consultant Orthopedics',
    specialization: 'Orthopedics',
    subspecialties: ['Joint Surgery', 'Sports Medicine', 'Arthroscopy', 'Sports Injuries'],
    qualifications: ['German Board Certified', 'Head of Arthroscopy Unit', 'Senior Consultant Orthopedic Surgeon'],
    languages: ['German', 'English'],
    experience_years: 18,
    location: 'Germany / Hurghada',
    consultation_fee: 180,
    rating: 4.8,
    total_reviews: 189,
    is_premium: true,
    avatar: 'LW',
    available: true
  },
  // CARDIOLOGY
  {
    id: 'dr-muller',
    name: 'Dr. K. Müller',
    title: 'Assoc. Prof. Cardiology',
    specialization: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Cardiac Imaging', 'Heart Disease'],
    qualifications: ['Ass. Prof of Cardiology', 'Deputy Head of Cardiology', 'University Hospital Kiel Germany'],
    languages: ['German', 'English'],
    experience_years: 15,
    location: 'Kiel, Germany / Hurghada',
    consultation_fee: 200,
    rating: 4.9,
    total_reviews: 156,
    is_premium: true,
    avatar: 'KM',
    available: true
  },
  // NUTRITIONAL MEDICINE
  {
    id: 'dr-schmidt',
    name: 'Dr. A. Schmidt',
    title: 'Consultant Nutritional Medicine',
    specialization: 'Nutritional Medicine',
    subspecialties: ['Bariatric Nutrition', 'Metabolic Health', 'Weight Management'],
    qualifications: ['Nutritional Medicine Specialist', 'German Board Certified', 'Consultant of Nutritional Medicine'],
    languages: ['German', 'English'],
    experience_years: 12,
    location: 'Germany / Hurghada',
    consultation_fee: 120,
    rating: 4.7,
    total_reviews: 203,
    is_premium: false,
    avatar: 'AS',
    available: true
  },
  // LEGACY - Keeping for backward compatibility
  {
    id: 'dr-fischer',
    name: 'Dr. H. Fischer',
    title: 'Senior Consultant',
    specialization: 'Bariatric Surgery',
    subspecialties: ['Gastric Sleeve', 'Gastric Bypass', 'Revision Surgery'],
    qualifications: ['Consultant of Bariatric and Antireflux Surgery', 'Colorectal Surgery'],
    languages: ['German', 'English', 'Arabic'],
    experience_years: 22,
    location: 'Germany / Hurghada',
    consultation_fee: 180,
    rating: 4.9,
    total_reviews: 312,
    is_premium: true,
    avatar: 'HF',
    available: true
  },
  {
    id: 'dr-bauer',
    name: 'Dr. M. Bauer',
    title: 'Consultant',
    specialization: 'Urology & Andrology',
    subspecialties: ['Minimally Invasive Surgery', "Men's Health"],
    qualifications: ['Hmmling Hospital Sgel', 'German Board Certified'],
    languages: ['German', 'English'],
    experience_years: 16,
    location: 'Germany / Hurghada',
    consultation_fee: 160,
    rating: 4.8,
    total_reviews: 124,
    is_premium: true,
    avatar: 'MB',
    available: true
  },
  {
    id: 'dr-koch',
    name: 'Dr. P. Koch',
    title: 'Head of Department',
    specialization: 'Anesthesia & Pain Management',
    subspecialties: ['Intensive Care', 'Pain Therapy', 'Regional Anesthesia'],
    qualifications: ['Medias Hospital Germany', 'Academic Teaching Hospital'],
    languages: ['German', 'English'],
    experience_years: 19,
    location: 'Germany / Hurghada',
    consultation_fee: 140,
    rating: 4.9,
    total_reviews: 98,
    is_premium: true,
    avatar: 'PK',
    available: true
  },
  {
    id: 'dr-hoffmann',
    name: 'Dr. J. Hoffmann',
    title: 'Consultant',
    specialization: 'Internal Medicine & Gastroenterology',
    subspecialties: ['Palliative Medicine', 'Emergency Medicine', 'Hygiene'],
    qualifications: ['Facharzt für Innere Medizin', 'German Board Certified'],
    languages: ['German', 'English'],
    experience_years: 14,
    location: 'Germany / Hurghada',
    consultation_fee: 150,
    rating: 4.7,
    total_reviews: 167,
    is_premium: false,
    avatar: 'JH',
    available: true
  }
];

// Helper functions
export const getDoctorById = (id: string): Doctor | undefined => {
  return DOCTORS.find(d => d.id === id);
};

export const getDoctorsBySpecialization = (specialization: string): Doctor[] => {
  return DOCTORS.filter(d => d.specialization.toLowerCase().includes(specialization.toLowerCase()));
};

export const getPremiumDoctors = (): Doctor[] => {
  return DOCTORS.filter(d => d.is_premium);
};

export const getAvailableDoctors = (): Doctor[] => {
  return DOCTORS.filter(d => d.available);
};
