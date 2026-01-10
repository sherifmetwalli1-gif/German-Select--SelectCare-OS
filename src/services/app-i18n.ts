/**
 * SelectCareOS™ Application-Wide Multi-Language Support (i18n)
 * Comprehensive translations for ALL pages
 * Supports: English (EN), Arabic (AR), German (DE), French (FR)
 * 
 * Features:
 * - Complete UI translations for all pages
 * - RTL support for Arabic
 * - Localized date/number formatting
 * - Shared components translations
 */

export type SupportedLanguage = 'en' | 'ar' | 'de' | 'fr'

export const LANGUAGE_CONFIG: Record<SupportedLanguage, {
  code: string
  name: string
  nativeName: string
  dir: 'ltr' | 'rtl'
  flag: string
  locale: string
}> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    locale: 'en-US'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    locale: 'ar-SA'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪',
    locale: 'de-DE'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    locale: 'fr-FR'
  }
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const APP_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // ========== COMMON / SHARED ==========
    'app.name': 'SelectCareOS',
    'app.tagline': 'German Excellence, Egyptian Care',
    
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.treatments': 'Treatments',
    'nav.packages': 'Packages',
    'nav.doctors': 'Doctors',
    'nav.booking': 'Book Now',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.wellness': 'Wellness',
    'nav.rewards': 'Rewards',
    'nav.shop': 'Shop',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.myJourney': 'My Journey',
    'nav.appointments': 'Appointments',
    'nav.family': 'Family',
    'nav.medisense': 'MediSense AI',
    
    // Header
    'header.patientPortal': 'Patient Portal',
    'header.notifications': 'Notifications',
    'header.settings': 'Settings',
    'header.selectLanguage': 'Select Language',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    
    // Buttons
    'btn.submit': 'Submit',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save',
    'btn.edit': 'Edit',
    'btn.delete': 'Delete',
    'btn.back': 'Back',
    'btn.next': 'Next',
    'btn.continue': 'Continue',
    'btn.confirm': 'Confirm',
    'btn.close': 'Close',
    'btn.learnMore': 'Learn More',
    'btn.viewAll': 'View All',
    'btn.viewDetails': 'View Details',
    'btn.bookNow': 'Book Now',
    'btn.getStarted': 'Get Started',
    'btn.calculate': 'Calculate',
    'btn.add': 'Add',
    'btn.remove': 'Remove',
    'btn.search': 'Search',
    'btn.filter': 'Filter',
    'btn.apply': 'Apply',
    'btn.reset': 'Reset',
    'btn.sendMessage': 'Send Message',
    'btn.subscribe': 'Subscribe',
    'btn.upgrade': 'Upgrade',
    
    // Status
    'status.loading': 'Loading...',
    'status.success': 'Success',
    'status.error': 'Error',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.inProgress': 'In Progress',
    'status.scheduled': 'Scheduled',
    'status.cancelled': 'Cancelled',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.busy': 'Busy',
    
    // Time
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.tomorrow': 'Tomorrow',
    'time.days': 'days',
    'time.hours': 'hours',
    'time.minutes': 'minutes',
    'time.seconds': 'seconds',
    'time.weeks': 'weeks',
    'time.months': 'months',
    'time.years': 'years',
    'time.ago': 'ago',
    
    // ========== WELCOME / GREETINGS ==========
    'welcome.back': 'Welcome back,',
    'welcome.hello': 'Hello,',
    'welcome.goodMorning': 'Good morning,',
    'welcome.goodAfternoon': 'Good afternoon,',
    'welcome.goodEvening': 'Good evening,',
    
    // ========== DASHBOARD ==========
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.quickStats': 'Quick Stats',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.upcomingAppointments': 'Upcoming Appointments',
    'dashboard.healthMetrics': 'Health Metrics',
    'dashboard.journeyProgress': 'Journey Progress',
    
    // Stats
    'stats.heartRate': 'Heart Rate',
    'stats.weight': 'Weight',
    'stats.bmi': 'BMI',
    'stats.steps': 'Steps',
    'stats.stepsToday': 'Steps Today',
    'stats.calories': 'Calories',
    'stats.sleep': 'Sleep',
    'stats.water': 'Water',
    'stats.bloodPressure': 'Blood Pressure',
    'stats.spO2': 'SpO2',
    'stats.normal': 'Normal',
    'stats.low': 'Low',
    'stats.high': 'High',
    'stats.optimal': 'Optimal',
    
    // ========== SERVICES ==========
    'services.title': 'Our Services',
    'services.subtitle': 'World-class medical services',
    'services.bariatric': 'Bariatric Surgery',
    'services.orthopedic': 'Orthopedic Surgery',
    'services.aesthetic': 'Aesthetic Surgery',
    'services.cardiology': 'Cardiology',
    'services.antiAging': 'Anti-Aging & Longevity',
    'services.dental': 'Dental Care',
    'services.wellness': 'Wellness Programs',
    'services.telemedicine': 'Telemedicine',
    'services.consultation': 'Consultation',
    'services.surgery': 'Surgery',
    'services.recovery': 'Recovery',
    'services.followUp': 'Follow-Up',
    
    // ========== BOOKING ==========
    'booking.title': 'Book Your Appointment',
    'booking.selectDoctor': 'Select Doctor',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.selectService': 'Select Service',
    'booking.personalInfo': 'Personal Information',
    'booking.paymentInfo': 'Payment Information',
    'booking.confirmation': 'Confirmation',
    'booking.appointmentDetails': 'Appointment Details',
    'booking.patientDetails': 'Patient Details',
    'booking.firstName': 'First Name',
    'booking.lastName': 'Last Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.dateOfBirth': 'Date of Birth',
    'booking.gender': 'Gender',
    'booking.male': 'Male',
    'booking.female': 'Female',
    'booking.other': 'Other',
    'booking.address': 'Address',
    'booking.city': 'City',
    'booking.country': 'Country',
    'booking.notes': 'Notes',
    'booking.medicalHistory': 'Medical History',
    'booking.allergies': 'Allergies',
    'booking.medications': 'Current Medications',
    'booking.insurance': 'Insurance',
    'booking.total': 'Total',
    'booking.deposit': 'Deposit Required',
    'booking.balance': 'Balance Due',
    'booking.payNow': 'Pay Now',
    'booking.payLater': 'Pay Later',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.bookingConfirmed': 'Booking Confirmed!',
    'booking.bookingReference': 'Booking Reference',
    'booking.checkEmail': 'Check your email for confirmation details',
    
    // ========== DOCTORS ==========
    'doctors.title': 'Our Doctors',
    'doctors.subtitle': 'German-certified medical experts',
    'doctors.specialization': 'Specialization',
    'doctors.experience': 'Experience',
    'doctors.yearsExperience': 'years experience',
    'doctors.languages': 'Languages',
    'doctors.rating': 'Rating',
    'doctors.reviews': 'reviews',
    'doctors.availability': 'Availability',
    'doctors.consultationFee': 'Consultation Fee',
    'doctors.bookAppointment': 'Book Appointment',
    'doctors.viewProfile': 'View Profile',
    
    // ========== PACKAGES ==========
    'packages.title': 'Care Packages',
    'packages.subtitle': 'All-inclusive medical tourism packages',
    'packages.includes': 'Package Includes',
    'packages.duration': 'Duration',
    'packages.nights': 'nights',
    'packages.startingFrom': 'Starting from',
    'packages.comparePackages': 'Compare Packages',
    'packages.essential': 'Essential',
    'packages.plus': 'Plus',
    'packages.crown': 'Crown',
    'packages.popular': 'Most Popular',
    'packages.savings': 'Savings vs Germany',
    
    // ========== WELLNESS ==========
    'wellness.title': 'Daily Wellness',
    'wellness.subtitle': 'Your daily health companion',
    'wellness.todayTasks': 'Today\'s Tasks',
    'wellness.completedTasks': 'Completed',
    'wellness.pendingTasks': 'Pending',
    'wellness.streak': 'Day Streak',
    'wellness.points': 'Points Earned',
    'wellness.meditation': 'Meditation',
    'wellness.exercise': 'Exercise',
    'wellness.nutrition': 'Nutrition',
    'wellness.hydration': 'Hydration',
    'wellness.sleep': 'Sleep',
    'wellness.mindfulness': 'Mindfulness',
    'wellness.breathing': 'Breathing',
    'wellness.yoga': 'Yoga',
    'wellness.walking': 'Walking',
    'wellness.supplements': 'Supplements',
    
    // ========== REWARDS ==========
    'rewards.title': 'SelectPoints Rewards',
    'rewards.subtitle': 'Earn and redeem points',
    'rewards.yourPoints': 'Your Points',
    'rewards.pointsBalance': 'Points Balance',
    'rewards.earnPoints': 'Earn Points',
    'rewards.redeemPoints': 'Redeem Points',
    'rewards.history': 'Points History',
    'rewards.howToEarn': 'How to Earn',
    'rewards.tier': 'Your Tier',
    'rewards.nextTier': 'Next Tier',
    'rewards.pointsToNext': 'points to next tier',
    'rewards.bronze': 'Bronze',
    'rewards.silver': 'Silver',
    'rewards.gold': 'Gold',
    'rewards.platinum': 'Platinum',
    'rewards.elite': 'Elite',
    
    // ========== MARKETPLACE ==========
    'marketplace.title': 'Health Marketplace',
    'marketplace.subtitle': 'Products for your health journey',
    'marketplace.categories': 'Categories',
    'marketplace.supplements': 'Supplements',
    'marketplace.equipment': 'Medical Equipment',
    'marketplace.skincare': 'Skincare',
    'marketplace.postOp': 'Post-Op Care',
    'marketplace.addToCart': 'Add to Cart',
    'marketplace.cart': 'Shopping Cart',
    'marketplace.checkout': 'Checkout',
    'marketplace.emptyCart': 'Your cart is empty',
    'marketplace.subtotal': 'Subtotal',
    'marketplace.shipping': 'Shipping',
    'marketplace.tax': 'Tax',
    'marketplace.orderTotal': 'Order Total',
    
    // ========== FAMILY HUB ==========
    'family.title': 'Family Health Hub',
    'family.subtitle': 'Manage your family\'s health',
    'family.members': 'Family Members',
    'family.addMember': 'Add Family Member',
    'family.relationship': 'Relationship',
    'family.spouse': 'Spouse',
    'family.child': 'Child',
    'family.parent': 'Parent',
    'family.sibling': 'Sibling',
    'family.familyPlan': 'Family Plan',
    'family.sharedPoints': 'Shared Points',
    'family.appointments': 'Family Appointments',
    'family.healthOverview': 'Family Health Overview',
    
    // ========== SUBSCRIPTION ==========
    'subscription.title': 'Subscription Plans',
    'subscription.subtitle': 'Choose your care level',
    'subscription.currentPlan': 'Current Plan',
    'subscription.upgradePlan': 'Upgrade Plan',
    'subscription.features': 'Features',
    'subscription.free': 'Free',
    'subscription.basic': 'Basic',
    'subscription.plus': 'Plus',
    'subscription.premium': 'Premium',
    'subscription.perMonth': 'per month',
    'subscription.perYear': 'per year',
    'subscription.annual': 'Annual',
    'subscription.monthly': 'Monthly',
    'subscription.savePercent': 'Save',
    'subscription.mostPopular': 'Most Popular',
    'subscription.bestValue': 'Best Value',
    'subscription.currentlySubscribed': 'Currently Subscribed',
    
    // ========== AI CONCIERGE ==========
    'ai.title': 'AI Health Concierge',
    'ai.subtitle': 'Your personal health assistant',
    'ai.greeting': 'Hello! I\'m your personal AI Health Concierge. How can I help you today?',
    'ai.placeholder': 'Type your message...',
    'ai.suggestions': 'Suggested Questions',
    'ai.typing': 'AI is typing...',
    'ai.disclaimer': 'This AI provides general health information only. For medical advice, please consult a doctor.',
    
    // ========== MEDISENSE ==========
    'medisense.title': 'MediSense AI',
    'medisense.subtitle': 'Intelligent Symptom Analyzer',
    'medisense.selectSymptoms': 'Select Symptoms',
    'medisense.searchSymptoms': 'Search symptoms...',
    'medisense.selectedSymptoms': 'Selected Symptoms',
    'medisense.analyzeSymptoms': 'Analyze Symptoms',
    'medisense.results': 'Analysis Results',
    'medisense.possibleConditions': 'Possible Conditions',
    'medisense.recommendations': 'Recommendations',
    'medisense.urgencyLevel': 'Urgency Level',
    'medisense.emergency': 'Emergency',
    'medisense.urgent': 'Urgent',
    'medisense.routine': 'Routine',
    'medisense.selfCare': 'Self-Care',
    'medisense.consultDoctor': 'Consult a Doctor',
    'medisense.bookConsultation': 'Book Consultation',
    'medisense.disclaimer': 'This is not a medical diagnosis. Please consult a healthcare professional.',
    
    // ========== MINDFULNESS ==========
    'mindfulness.title': 'Mindfulness & Meditation',
    'mindfulness.subtitle': 'Find your inner peace',
    'mindfulness.breathing': 'Breathing Exercises',
    'mindfulness.meditation': 'Guided Meditation',
    'mindfulness.relaxation': 'Relaxation',
    'mindfulness.focus': 'Focus',
    'mindfulness.sleep': 'Sleep',
    'mindfulness.stress': 'Stress Relief',
    'mindfulness.duration': 'Duration',
    'mindfulness.start': 'Start Session',
    'mindfulness.pause': 'Pause',
    'mindfulness.resume': 'Resume',
    'mindfulness.complete': 'Session Complete',
    'mindfulness.breatheIn': 'Breathe In',
    'mindfulness.breatheOut': 'Breathe Out',
    'mindfulness.hold': 'Hold',
    
    // ========== REFERRAL ==========
    'referral.title': 'Share & Earn',
    'referral.subtitle': 'Refer friends and earn rewards',
    'referral.yourCode': 'Your Referral Code',
    'referral.copyCode': 'Copy Code',
    'referral.shareLink': 'Share Link',
    'referral.friendsReferred': 'Friends Referred',
    'referral.earned': 'Earned',
    'referral.howItWorks': 'How It Works',
    'referral.step1': 'Share your unique code',
    'referral.step2': 'Friend signs up',
    'referral.step3': 'Both earn rewards',
    
    // ========== CARE TEAM ==========
    'team.title': 'Your Care Team',
    'team.subtitle': 'Your dedicated medical professionals',
    'team.primaryDoctor': 'Primary Doctor',
    'team.specialist': 'Specialist',
    'team.coordinator': 'Care Coordinator',
    'team.nutritionist': 'Nutritionist',
    'team.physiotherapist': 'Physiotherapist',
    'team.psychologist': 'Psychologist',
    'team.message': 'Send Message',
    'team.schedule': 'Schedule Call',
    'team.addSpecialist': 'Add Specialist',
    
    // ========== JOURNEY ==========
    'journey.title': 'Your Medical Journey',
    'journey.phase': 'Current Phase',
    'journey.preparation': 'Preparation',
    'journey.virtualPrep': 'Virtual Preparation',
    'journey.travel': 'Travel',
    'journey.surgery': 'Surgery',
    'journey.recovery': 'Recovery',
    'journey.followUp': 'Follow-Up Care',
    'journey.complete': 'Journey Complete',
    'journey.timeline': 'Timeline',
    'journey.milestones': 'Milestones',
    'journey.documents': 'Documents',
    'journey.checklist': 'Checklist',
    
    // ========== CURRENCY & PRICING ==========
    'price.currency': 'EUR',
    'price.from': 'From',
    'price.perNight': 'per night',
    'price.total': 'Total',
    'price.discount': 'Discount',
    'price.savings': 'You Save',
    'price.free': 'Free',
    'price.included': 'Included'
  },
  
  // ========== ARABIC TRANSLATIONS ==========
  ar: {
    // Common
    'app.name': 'سيليكت كير أو إس',
    'app.tagline': 'التميز الألماني، الرعاية المصرية',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.treatments': 'العلاجات',
    'nav.packages': 'الباقات',
    'nav.doctors': 'الأطباء',
    'nav.booking': 'احجز الآن',
    'nav.about': 'عن الشركة',
    'nav.contact': 'اتصل بنا',
    'nav.wellness': 'العافية',
    'nav.rewards': 'المكافآت',
    'nav.shop': 'المتجر',
    'nav.profile': 'الملف الشخصي',
    'nav.dashboard': 'لوحة التحكم',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.myJourney': 'رحلتي',
    'nav.appointments': 'المواعيد',
    'nav.family': 'العائلة',
    'nav.medisense': 'ميدي سينس AI',
    
    // Header
    'header.patientPortal': 'بوابة المريض',
    'header.notifications': 'الإشعارات',
    'header.settings': 'الإعدادات',
    'header.selectLanguage': 'اختر اللغة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.contact': 'اتصل بنا',
    
    // Buttons
    'btn.submit': 'إرسال',
    'btn.cancel': 'إلغاء',
    'btn.save': 'حفظ',
    'btn.edit': 'تعديل',
    'btn.delete': 'حذف',
    'btn.back': 'رجوع',
    'btn.next': 'التالي',
    'btn.continue': 'متابعة',
    'btn.confirm': 'تأكيد',
    'btn.close': 'إغلاق',
    'btn.learnMore': 'اعرف المزيد',
    'btn.viewAll': 'عرض الكل',
    'btn.viewDetails': 'عرض التفاصيل',
    'btn.bookNow': 'احجز الآن',
    'btn.getStarted': 'ابدأ الآن',
    'btn.calculate': 'احسب',
    'btn.add': 'إضافة',
    'btn.remove': 'إزالة',
    'btn.search': 'بحث',
    'btn.filter': 'تصفية',
    'btn.apply': 'تطبيق',
    'btn.reset': 'إعادة تعيين',
    'btn.sendMessage': 'إرسال رسالة',
    'btn.subscribe': 'اشترك',
    'btn.upgrade': 'ترقية',
    
    // Status
    'status.loading': 'جاري التحميل...',
    'status.success': 'نجاح',
    'status.error': 'خطأ',
    'status.pending': 'قيد الانتظار',
    'status.completed': 'مكتمل',
    'status.inProgress': 'قيد التنفيذ',
    'status.scheduled': 'مجدول',
    'status.cancelled': 'ملغي',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    'status.online': 'متصل',
    'status.offline': 'غير متصل',
    'status.busy': 'مشغول',
    
    // Time
    'time.today': 'اليوم',
    'time.yesterday': 'أمس',
    'time.tomorrow': 'غداً',
    'time.days': 'أيام',
    'time.hours': 'ساعات',
    'time.minutes': 'دقائق',
    'time.seconds': 'ثواني',
    'time.weeks': 'أسابيع',
    'time.months': 'أشهر',
    'time.years': 'سنوات',
    'time.ago': 'مضت',
    
    // Welcome
    'welcome.back': 'أهلاً بعودتك،',
    'welcome.hello': 'مرحباً،',
    'welcome.goodMorning': 'صباح الخير،',
    'welcome.goodAfternoon': 'مساء الخير،',
    'welcome.goodEvening': 'مساء الخير،',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.quickStats': 'إحصائيات سريعة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.upcomingAppointments': 'المواعيد القادمة',
    'dashboard.healthMetrics': 'المؤشرات الصحية',
    'dashboard.journeyProgress': 'تقدم الرحلة',
    
    // Stats
    'stats.heartRate': 'نبضات القلب',
    'stats.weight': 'الوزن',
    'stats.bmi': 'مؤشر كتلة الجسم',
    'stats.steps': 'الخطوات',
    'stats.stepsToday': 'خطوات اليوم',
    'stats.calories': 'السعرات الحرارية',
    'stats.sleep': 'النوم',
    'stats.water': 'الماء',
    'stats.bloodPressure': 'ضغط الدم',
    'stats.spO2': 'تشبع الأكسجين',
    'stats.normal': 'طبيعي',
    'stats.low': 'منخفض',
    'stats.high': 'مرتفع',
    'stats.optimal': 'مثالي',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'خدمات طبية عالمية المستوى',
    'services.bariatric': 'جراحة السمنة',
    'services.orthopedic': 'جراحة العظام',
    'services.aesthetic': 'الجراحة التجميلية',
    'services.cardiology': 'أمراض القلب',
    'services.antiAging': 'مكافحة الشيخوخة',
    'services.dental': 'طب الأسنان',
    'services.wellness': 'برامج العافية',
    'services.telemedicine': 'الطب عن بُعد',
    'services.consultation': 'استشارة',
    'services.surgery': 'جراحة',
    'services.recovery': 'التعافي',
    'services.followUp': 'المتابعة',
    
    // Booking
    'booking.title': 'احجز موعدك',
    'booking.selectDoctor': 'اختر الطبيب',
    'booking.selectDate': 'اختر التاريخ',
    'booking.selectTime': 'اختر الوقت',
    'booking.selectService': 'اختر الخدمة',
    'booking.personalInfo': 'المعلومات الشخصية',
    'booking.paymentInfo': 'معلومات الدفع',
    'booking.confirmation': 'التأكيد',
    'booking.appointmentDetails': 'تفاصيل الموعد',
    'booking.patientDetails': 'بيانات المريض',
    'booking.firstName': 'الاسم الأول',
    'booking.lastName': 'اسم العائلة',
    'booking.email': 'البريد الإلكتروني',
    'booking.phone': 'الهاتف',
    'booking.dateOfBirth': 'تاريخ الميلاد',
    'booking.gender': 'الجنس',
    'booking.male': 'ذكر',
    'booking.female': 'أنثى',
    'booking.other': 'آخر',
    'booking.address': 'العنوان',
    'booking.city': 'المدينة',
    'booking.country': 'الدولة',
    'booking.notes': 'ملاحظات',
    'booking.medicalHistory': 'التاريخ الطبي',
    'booking.allergies': 'الحساسية',
    'booking.medications': 'الأدوية الحالية',
    'booking.insurance': 'التأمين',
    'booking.total': 'المجموع',
    'booking.deposit': 'العربون المطلوب',
    'booking.balance': 'المبلغ المتبقي',
    'booking.payNow': 'ادفع الآن',
    'booking.payLater': 'ادفع لاحقاً',
    'booking.confirmBooking': 'تأكيد الحجز',
    'booking.bookingConfirmed': 'تم تأكيد الحجز!',
    'booking.bookingReference': 'رقم الحجز',
    'booking.checkEmail': 'تحقق من بريدك الإلكتروني للحصول على تفاصيل التأكيد',
    
    // Doctors
    'doctors.title': 'أطباؤنا',
    'doctors.subtitle': 'خبراء طبيون معتمدون من ألمانيا',
    'doctors.specialization': 'التخصص',
    'doctors.experience': 'الخبرة',
    'doctors.yearsExperience': 'سنوات خبرة',
    'doctors.languages': 'اللغات',
    'doctors.rating': 'التقييم',
    'doctors.reviews': 'تقييمات',
    'doctors.availability': 'التوفر',
    'doctors.consultationFee': 'رسوم الاستشارة',
    'doctors.bookAppointment': 'حجز موعد',
    'doctors.viewProfile': 'عرض الملف',
    
    // Packages
    'packages.title': 'باقات الرعاية',
    'packages.subtitle': 'باقات سياحة علاجية شاملة',
    'packages.includes': 'تشمل الباقة',
    'packages.duration': 'المدة',
    'packages.nights': 'ليالي',
    'packages.startingFrom': 'تبدأ من',
    'packages.comparePackages': 'قارن الباقات',
    'packages.essential': 'الأساسية',
    'packages.plus': 'بلس',
    'packages.crown': 'كراون',
    'packages.popular': 'الأكثر شعبية',
    'packages.savings': 'التوفير مقارنة بألمانيا',
    
    // Wellness
    'wellness.title': 'العافية اليومية',
    'wellness.subtitle': 'رفيقك الصحي اليومي',
    'wellness.todayTasks': 'مهام اليوم',
    'wellness.completedTasks': 'مكتمل',
    'wellness.pendingTasks': 'قيد الانتظار',
    'wellness.streak': 'أيام متتالية',
    'wellness.points': 'النقاط المكتسبة',
    'wellness.meditation': 'التأمل',
    'wellness.exercise': 'التمارين',
    'wellness.nutrition': 'التغذية',
    'wellness.hydration': 'الترطيب',
    'wellness.sleep': 'النوم',
    'wellness.mindfulness': 'اليقظة',
    'wellness.breathing': 'التنفس',
    'wellness.yoga': 'اليوغا',
    'wellness.walking': 'المشي',
    'wellness.supplements': 'المكملات',
    
    // Rewards
    'rewards.title': 'مكافآت سيليكت بوينتس',
    'rewards.subtitle': 'اكسب واستبدل النقاط',
    'rewards.yourPoints': 'نقاطك',
    'rewards.pointsBalance': 'رصيد النقاط',
    'rewards.earnPoints': 'اكسب نقاط',
    'rewards.redeemPoints': 'استبدل النقاط',
    'rewards.history': 'سجل النقاط',
    'rewards.howToEarn': 'كيف تكسب',
    'rewards.tier': 'مستواك',
    'rewards.nextTier': 'المستوى التالي',
    'rewards.pointsToNext': 'نقطة للمستوى التالي',
    'rewards.bronze': 'برونزي',
    'rewards.silver': 'فضي',
    'rewards.gold': 'ذهبي',
    'rewards.platinum': 'بلاتيني',
    'rewards.elite': 'النخبة',
    
    // Marketplace
    'marketplace.title': 'متجر الصحة',
    'marketplace.subtitle': 'منتجات لرحلتك الصحية',
    'marketplace.categories': 'الفئات',
    'marketplace.supplements': 'المكملات',
    'marketplace.equipment': 'المعدات الطبية',
    'marketplace.skincare': 'العناية بالبشرة',
    'marketplace.postOp': 'رعاية ما بعد العملية',
    'marketplace.addToCart': 'أضف للسلة',
    'marketplace.cart': 'سلة التسوق',
    'marketplace.checkout': 'الدفع',
    'marketplace.emptyCart': 'سلتك فارغة',
    'marketplace.subtotal': 'المجموع الفرعي',
    'marketplace.shipping': 'الشحن',
    'marketplace.tax': 'الضريبة',
    'marketplace.orderTotal': 'إجمالي الطلب',
    
    // Family Hub
    'family.title': 'مركز صحة العائلة',
    'family.subtitle': 'إدارة صحة عائلتك',
    'family.members': 'أفراد العائلة',
    'family.addMember': 'إضافة فرد',
    'family.relationship': 'العلاقة',
    'family.spouse': 'الزوج/الزوجة',
    'family.child': 'طفل',
    'family.parent': 'الوالد/الوالدة',
    'family.sibling': 'الأخ/الأخت',
    'family.familyPlan': 'خطة العائلة',
    'family.sharedPoints': 'النقاط المشتركة',
    'family.appointments': 'مواعيد العائلة',
    'family.healthOverview': 'نظرة عامة على صحة العائلة',
    
    // Subscription
    'subscription.title': 'خطط الاشتراك',
    'subscription.subtitle': 'اختر مستوى رعايتك',
    'subscription.currentPlan': 'الخطة الحالية',
    'subscription.upgradePlan': 'ترقية الخطة',
    'subscription.features': 'المميزات',
    'subscription.free': 'مجاني',
    'subscription.basic': 'أساسي',
    'subscription.plus': 'بلس',
    'subscription.premium': 'بريميوم',
    'subscription.perMonth': 'شهرياً',
    'subscription.perYear': 'سنوياً',
    'subscription.annual': 'سنوي',
    'subscription.monthly': 'شهري',
    'subscription.savePercent': 'وفر',
    'subscription.mostPopular': 'الأكثر شعبية',
    'subscription.bestValue': 'أفضل قيمة',
    'subscription.currentlySubscribed': 'مشترك حالياً',
    
    // AI Concierge
    'ai.title': 'مساعد الصحة الذكي',
    'ai.subtitle': 'مساعدك الصحي الشخصي',
    'ai.greeting': 'مرحباً! أنا مساعدك الصحي الذكي. كيف يمكنني مساعدتك اليوم؟',
    'ai.placeholder': 'اكتب رسالتك...',
    'ai.suggestions': 'أسئلة مقترحة',
    'ai.typing': 'الذكاء الاصطناعي يكتب...',
    'ai.disclaimer': 'هذا الذكاء الاصطناعي يقدم معلومات صحية عامة فقط. للحصول على استشارة طبية، يرجى استشارة طبيب.',
    
    // MediSense
    'medisense.title': 'ميدي سينس AI',
    'medisense.subtitle': 'محلل الأعراض الذكي',
    'medisense.selectSymptoms': 'اختر الأعراض',
    'medisense.searchSymptoms': 'ابحث عن الأعراض...',
    'medisense.selectedSymptoms': 'الأعراض المختارة',
    'medisense.analyzeSymptoms': 'تحليل الأعراض',
    'medisense.results': 'نتائج التحليل',
    'medisense.possibleConditions': 'الحالات المحتملة',
    'medisense.recommendations': 'التوصيات',
    'medisense.urgencyLevel': 'مستوى الإلحاح',
    'medisense.emergency': 'طوارئ',
    'medisense.urgent': 'عاجل',
    'medisense.routine': 'روتيني',
    'medisense.selfCare': 'رعاية ذاتية',
    'medisense.consultDoctor': 'استشر طبيباً',
    'medisense.bookConsultation': 'احجز استشارة',
    'medisense.disclaimer': 'هذا ليس تشخيصاً طبياً. يرجى استشارة متخصص في الرعاية الصحية.',
    
    // Mindfulness
    'mindfulness.title': 'اليقظة والتأمل',
    'mindfulness.subtitle': 'اعثر على سلامك الداخلي',
    'mindfulness.breathing': 'تمارين التنفس',
    'mindfulness.meditation': 'التأمل الموجه',
    'mindfulness.relaxation': 'الاسترخاء',
    'mindfulness.focus': 'التركيز',
    'mindfulness.sleep': 'النوم',
    'mindfulness.stress': 'تخفيف التوتر',
    'mindfulness.duration': 'المدة',
    'mindfulness.start': 'ابدأ الجلسة',
    'mindfulness.pause': 'إيقاف مؤقت',
    'mindfulness.resume': 'استئناف',
    'mindfulness.complete': 'اكتملت الجلسة',
    'mindfulness.breatheIn': 'استنشق',
    'mindfulness.breatheOut': 'ازفر',
    'mindfulness.hold': 'احبس',
    
    // Referral
    'referral.title': 'شارك واربح',
    'referral.subtitle': 'ادعُ أصدقاءك واربح مكافآت',
    'referral.yourCode': 'رمز الإحالة الخاص بك',
    'referral.copyCode': 'نسخ الرمز',
    'referral.shareLink': 'مشاركة الرابط',
    'referral.friendsReferred': 'الأصدقاء المُحالون',
    'referral.earned': 'المكتسب',
    'referral.howItWorks': 'كيف يعمل',
    'referral.step1': 'شارك رمزك الفريد',
    'referral.step2': 'صديقك يسجل',
    'referral.step3': 'كلاكما يربح مكافآت',
    
    // Care Team
    'team.title': 'فريق الرعاية',
    'team.subtitle': 'المتخصصون الطبيون المخصصون لك',
    'team.primaryDoctor': 'الطبيب الرئيسي',
    'team.specialist': 'أخصائي',
    'team.coordinator': 'منسق الرعاية',
    'team.nutritionist': 'أخصائي تغذية',
    'team.physiotherapist': 'أخصائي علاج طبيعي',
    'team.psychologist': 'أخصائي نفسي',
    'team.message': 'إرسال رسالة',
    'team.schedule': 'جدولة مكالمة',
    'team.addSpecialist': 'إضافة أخصائي',
    
    // Journey
    'journey.title': 'رحلتك الطبية',
    'journey.phase': 'المرحلة الحالية',
    'journey.preparation': 'التحضير',
    'journey.virtualPrep': 'التحضير الافتراضي',
    'journey.travel': 'السفر',
    'journey.surgery': 'الجراحة',
    'journey.recovery': 'التعافي',
    'journey.followUp': 'المتابعة',
    'journey.complete': 'اكتملت الرحلة',
    'journey.timeline': 'الجدول الزمني',
    'journey.milestones': 'الإنجازات',
    'journey.documents': 'المستندات',
    'journey.checklist': 'قائمة المهام',
    
    // Currency
    'price.currency': 'يورو',
    'price.from': 'من',
    'price.perNight': 'لليلة',
    'price.total': 'المجموع',
    'price.discount': 'الخصم',
    'price.savings': 'توفر',
    'price.free': 'مجاني',
    'price.included': 'مشمول'
  },
  
  // ========== GERMAN TRANSLATIONS ==========
  de: {
    // Common
    'app.name': 'SelectCareOS',
    'app.tagline': 'Deutsche Exzellenz, Ägyptische Fürsorge',
    
    // Navigation
    'nav.home': 'Start',
    'nav.services': 'Leistungen',
    'nav.treatments': 'Behandlungen',
    'nav.packages': 'Pakete',
    'nav.doctors': 'Ärzte',
    'nav.booking': 'Jetzt Buchen',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',
    'nav.wellness': 'Wellness',
    'nav.rewards': 'Prämien',
    'nav.shop': 'Shop',
    'nav.profile': 'Profil',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.myJourney': 'Meine Reise',
    'nav.appointments': 'Termine',
    'nav.family': 'Familie',
    'nav.medisense': 'MediSense AI',
    
    // Header
    'header.patientPortal': 'Patientenportal',
    'header.notifications': 'Benachrichtigungen',
    'header.settings': 'Einstellungen',
    'header.selectLanguage': 'Sprache wählen',
    
    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.contact': 'Kontakt',
    
    // Buttons
    'btn.submit': 'Absenden',
    'btn.cancel': 'Abbrechen',
    'btn.save': 'Speichern',
    'btn.edit': 'Bearbeiten',
    'btn.delete': 'Löschen',
    'btn.back': 'Zurück',
    'btn.next': 'Weiter',
    'btn.continue': 'Fortfahren',
    'btn.confirm': 'Bestätigen',
    'btn.close': 'Schließen',
    'btn.learnMore': 'Mehr erfahren',
    'btn.viewAll': 'Alle anzeigen',
    'btn.viewDetails': 'Details ansehen',
    'btn.bookNow': 'Jetzt buchen',
    'btn.getStarted': 'Loslegen',
    'btn.calculate': 'Berechnen',
    'btn.add': 'Hinzufügen',
    'btn.remove': 'Entfernen',
    'btn.search': 'Suchen',
    'btn.filter': 'Filtern',
    'btn.apply': 'Anwenden',
    'btn.reset': 'Zurücksetzen',
    'btn.sendMessage': 'Nachricht senden',
    'btn.subscribe': 'Abonnieren',
    'btn.upgrade': 'Upgrade',
    
    // Status
    'status.loading': 'Laden...',
    'status.success': 'Erfolg',
    'status.error': 'Fehler',
    'status.pending': 'Ausstehend',
    'status.completed': 'Abgeschlossen',
    'status.inProgress': 'In Bearbeitung',
    'status.scheduled': 'Geplant',
    'status.cancelled': 'Storniert',
    'status.active': 'Aktiv',
    'status.inactive': 'Inaktiv',
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.busy': 'Beschäftigt',
    
    // Time
    'time.today': 'Heute',
    'time.yesterday': 'Gestern',
    'time.tomorrow': 'Morgen',
    'time.days': 'Tage',
    'time.hours': 'Stunden',
    'time.minutes': 'Minuten',
    'time.seconds': 'Sekunden',
    'time.weeks': 'Wochen',
    'time.months': 'Monate',
    'time.years': 'Jahre',
    'time.ago': 'vor',
    
    // Welcome
    'welcome.back': 'Willkommen zurück,',
    'welcome.hello': 'Hallo,',
    'welcome.goodMorning': 'Guten Morgen,',
    'welcome.goodAfternoon': 'Guten Tag,',
    'welcome.goodEvening': 'Guten Abend,',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Übersicht',
    'dashboard.quickStats': 'Schnellstatistik',
    'dashboard.recentActivity': 'Letzte Aktivitäten',
    'dashboard.upcomingAppointments': 'Anstehende Termine',
    'dashboard.healthMetrics': 'Gesundheitswerte',
    'dashboard.journeyProgress': 'Reisefortschritt',
    
    // Stats
    'stats.heartRate': 'Herzfrequenz',
    'stats.weight': 'Gewicht',
    'stats.bmi': 'BMI',
    'stats.steps': 'Schritte',
    'stats.stepsToday': 'Schritte heute',
    'stats.calories': 'Kalorien',
    'stats.sleep': 'Schlaf',
    'stats.water': 'Wasser',
    'stats.bloodPressure': 'Blutdruck',
    'stats.spO2': 'SpO2',
    'stats.normal': 'Normal',
    'stats.low': 'Niedrig',
    'stats.high': 'Hoch',
    'stats.optimal': 'Optimal',
    
    // Services
    'services.title': 'Unsere Leistungen',
    'services.subtitle': 'Erstklassige medizinische Leistungen',
    'services.bariatric': 'Adipositas-Chirurgie',
    'services.orthopedic': 'Orthopädische Chirurgie',
    'services.aesthetic': 'Ästhetische Chirurgie',
    'services.cardiology': 'Kardiologie',
    'services.antiAging': 'Anti-Aging & Longevity',
    'services.dental': 'Zahnmedizin',
    'services.wellness': 'Wellness-Programme',
    'services.telemedicine': 'Telemedizin',
    'services.consultation': 'Beratung',
    'services.surgery': 'Operation',
    'services.recovery': 'Genesung',
    'services.followUp': 'Nachsorge',
    
    // Booking
    'booking.title': 'Termin buchen',
    'booking.selectDoctor': 'Arzt wählen',
    'booking.selectDate': 'Datum wählen',
    'booking.selectTime': 'Zeit wählen',
    'booking.selectService': 'Leistung wählen',
    'booking.personalInfo': 'Persönliche Daten',
    'booking.paymentInfo': 'Zahlungsinformationen',
    'booking.confirmation': 'Bestätigung',
    'booking.appointmentDetails': 'Termindetails',
    'booking.patientDetails': 'Patientendaten',
    'booking.firstName': 'Vorname',
    'booking.lastName': 'Nachname',
    'booking.email': 'E-Mail',
    'booking.phone': 'Telefon',
    'booking.dateOfBirth': 'Geburtsdatum',
    'booking.gender': 'Geschlecht',
    'booking.male': 'Männlich',
    'booking.female': 'Weiblich',
    'booking.other': 'Andere',
    'booking.address': 'Adresse',
    'booking.city': 'Stadt',
    'booking.country': 'Land',
    'booking.notes': 'Anmerkungen',
    'booking.medicalHistory': 'Krankengeschichte',
    'booking.allergies': 'Allergien',
    'booking.medications': 'Aktuelle Medikamente',
    'booking.insurance': 'Versicherung',
    'booking.total': 'Gesamt',
    'booking.deposit': 'Anzahlung erforderlich',
    'booking.balance': 'Restbetrag',
    'booking.payNow': 'Jetzt bezahlen',
    'booking.payLater': 'Später bezahlen',
    'booking.confirmBooking': 'Buchung bestätigen',
    'booking.bookingConfirmed': 'Buchung bestätigt!',
    'booking.bookingReference': 'Buchungsnummer',
    'booking.checkEmail': 'Prüfen Sie Ihre E-Mail für Bestätigungsdetails',
    
    // Doctors
    'doctors.title': 'Unsere Ärzte',
    'doctors.subtitle': 'Deutsch-zertifizierte Medizinexperten',
    'doctors.specialization': 'Fachgebiet',
    'doctors.experience': 'Erfahrung',
    'doctors.yearsExperience': 'Jahre Erfahrung',
    'doctors.languages': 'Sprachen',
    'doctors.rating': 'Bewertung',
    'doctors.reviews': 'Bewertungen',
    'doctors.availability': 'Verfügbarkeit',
    'doctors.consultationFee': 'Beratungsgebühr',
    'doctors.bookAppointment': 'Termin buchen',
    'doctors.viewProfile': 'Profil ansehen',
    
    // Packages
    'packages.title': 'Pflegepakete',
    'packages.subtitle': 'All-inclusive Medizintourismus-Pakete',
    'packages.includes': 'Paket beinhaltet',
    'packages.duration': 'Dauer',
    'packages.nights': 'Nächte',
    'packages.startingFrom': 'Ab',
    'packages.comparePackages': 'Pakete vergleichen',
    'packages.essential': 'Essential',
    'packages.plus': 'Plus',
    'packages.crown': 'Crown',
    'packages.popular': 'Am beliebtesten',
    'packages.savings': 'Ersparnis vs. Deutschland',
    
    // Wellness
    'wellness.title': 'Tägliches Wohlbefinden',
    'wellness.subtitle': 'Ihr täglicher Gesundheitsbegleiter',
    'wellness.todayTasks': 'Heutige Aufgaben',
    'wellness.completedTasks': 'Erledigt',
    'wellness.pendingTasks': 'Ausstehend',
    'wellness.streak': 'Tage-Serie',
    'wellness.points': 'Punkte verdient',
    'wellness.meditation': 'Meditation',
    'wellness.exercise': 'Training',
    'wellness.nutrition': 'Ernährung',
    'wellness.hydration': 'Flüssigkeit',
    'wellness.sleep': 'Schlaf',
    'wellness.mindfulness': 'Achtsamkeit',
    'wellness.breathing': 'Atmung',
    'wellness.yoga': 'Yoga',
    'wellness.walking': 'Gehen',
    'wellness.supplements': 'Nahrungsergänzung',
    
    // Rewards
    'rewards.title': 'SelectPoints Prämien',
    'rewards.subtitle': 'Punkte sammeln und einlösen',
    'rewards.yourPoints': 'Ihre Punkte',
    'rewards.pointsBalance': 'Punktestand',
    'rewards.earnPoints': 'Punkte sammeln',
    'rewards.redeemPoints': 'Punkte einlösen',
    'rewards.history': 'Punkteverlauf',
    'rewards.howToEarn': 'So sammeln Sie',
    'rewards.tier': 'Ihre Stufe',
    'rewards.nextTier': 'Nächste Stufe',
    'rewards.pointsToNext': 'Punkte zur nächsten Stufe',
    'rewards.bronze': 'Bronze',
    'rewards.silver': 'Silber',
    'rewards.gold': 'Gold',
    'rewards.platinum': 'Platin',
    'rewards.elite': 'Elite',
    
    // Marketplace
    'marketplace.title': 'Gesundheitsmarkt',
    'marketplace.subtitle': 'Produkte für Ihre Gesundheitsreise',
    'marketplace.categories': 'Kategorien',
    'marketplace.supplements': 'Nahrungsergänzung',
    'marketplace.equipment': 'Medizingeräte',
    'marketplace.skincare': 'Hautpflege',
    'marketplace.postOp': 'Nachsorge',
    'marketplace.addToCart': 'In den Warenkorb',
    'marketplace.cart': 'Warenkorb',
    'marketplace.checkout': 'Zur Kasse',
    'marketplace.emptyCart': 'Ihr Warenkorb ist leer',
    'marketplace.subtotal': 'Zwischensumme',
    'marketplace.shipping': 'Versand',
    'marketplace.tax': 'MwSt.',
    'marketplace.orderTotal': 'Gesamtsumme',
    
    // Family Hub
    'family.title': 'Familien-Gesundheit',
    'family.subtitle': 'Verwalten Sie die Gesundheit Ihrer Familie',
    'family.members': 'Familienmitglieder',
    'family.addMember': 'Mitglied hinzufügen',
    'family.relationship': 'Beziehung',
    'family.spouse': 'Ehepartner',
    'family.child': 'Kind',
    'family.parent': 'Elternteil',
    'family.sibling': 'Geschwister',
    'family.familyPlan': 'Familienplan',
    'family.sharedPoints': 'Geteilte Punkte',
    'family.appointments': 'Familientermine',
    'family.healthOverview': 'Familien-Gesundheitsübersicht',
    
    // Subscription
    'subscription.title': 'Abonnement-Pläne',
    'subscription.subtitle': 'Wählen Sie Ihre Pflegestufe',
    'subscription.currentPlan': 'Aktueller Plan',
    'subscription.upgradePlan': 'Plan upgraden',
    'subscription.features': 'Funktionen',
    'subscription.free': 'Kostenlos',
    'subscription.basic': 'Basis',
    'subscription.plus': 'Plus',
    'subscription.premium': 'Premium',
    'subscription.perMonth': 'pro Monat',
    'subscription.perYear': 'pro Jahr',
    'subscription.annual': 'Jährlich',
    'subscription.monthly': 'Monatlich',
    'subscription.savePercent': 'Sparen',
    'subscription.mostPopular': 'Am beliebtesten',
    'subscription.bestValue': 'Bester Wert',
    'subscription.currentlySubscribed': 'Aktuell abonniert',
    
    // AI Concierge
    'ai.title': 'KI-Gesundheitsassistent',
    'ai.subtitle': 'Ihr persönlicher Gesundheitsberater',
    'ai.greeting': 'Hallo! Ich bin Ihr persönlicher KI-Gesundheitsassistent. Wie kann ich Ihnen heute helfen?',
    'ai.placeholder': 'Ihre Nachricht eingeben...',
    'ai.suggestions': 'Vorgeschlagene Fragen',
    'ai.typing': 'KI tippt...',
    'ai.disclaimer': 'Diese KI bietet nur allgemeine Gesundheitsinformationen. Für medizinische Beratung konsultieren Sie bitte einen Arzt.',
    
    // MediSense
    'medisense.title': 'MediSense AI',
    'medisense.subtitle': 'Intelligenter Symptom-Analysator',
    'medisense.selectSymptoms': 'Symptome auswählen',
    'medisense.searchSymptoms': 'Symptome suchen...',
    'medisense.selectedSymptoms': 'Ausgewählte Symptome',
    'medisense.analyzeSymptoms': 'Symptome analysieren',
    'medisense.results': 'Analyseergebnisse',
    'medisense.possibleConditions': 'Mögliche Erkrankungen',
    'medisense.recommendations': 'Empfehlungen',
    'medisense.urgencyLevel': 'Dringlichkeitsstufe',
    'medisense.emergency': 'Notfall',
    'medisense.urgent': 'Dringend',
    'medisense.routine': 'Routine',
    'medisense.selfCare': 'Selbstpflege',
    'medisense.consultDoctor': 'Arzt konsultieren',
    'medisense.bookConsultation': 'Beratung buchen',
    'medisense.disclaimer': 'Dies ist keine medizinische Diagnose. Bitte konsultieren Sie einen Arzt.',
    
    // Mindfulness
    'mindfulness.title': 'Achtsamkeit & Meditation',
    'mindfulness.subtitle': 'Finden Sie Ihre innere Ruhe',
    'mindfulness.breathing': 'Atemübungen',
    'mindfulness.meditation': 'Geführte Meditation',
    'mindfulness.relaxation': 'Entspannung',
    'mindfulness.focus': 'Fokus',
    'mindfulness.sleep': 'Schlaf',
    'mindfulness.stress': 'Stressabbau',
    'mindfulness.duration': 'Dauer',
    'mindfulness.start': 'Sitzung starten',
    'mindfulness.pause': 'Pause',
    'mindfulness.resume': 'Fortsetzen',
    'mindfulness.complete': 'Sitzung abgeschlossen',
    'mindfulness.breatheIn': 'Einatmen',
    'mindfulness.breatheOut': 'Ausatmen',
    'mindfulness.hold': 'Halten',
    
    // Referral
    'referral.title': 'Teilen & Verdienen',
    'referral.subtitle': 'Freunde empfehlen und Prämien erhalten',
    'referral.yourCode': 'Ihr Empfehlungscode',
    'referral.copyCode': 'Code kopieren',
    'referral.shareLink': 'Link teilen',
    'referral.friendsReferred': 'Empfohlene Freunde',
    'referral.earned': 'Verdient',
    'referral.howItWorks': 'So funktioniert\'s',
    'referral.step1': 'Teilen Sie Ihren Code',
    'referral.step2': 'Freund registriert sich',
    'referral.step3': 'Beide erhalten Prämien',
    
    // Care Team
    'team.title': 'Ihr Pflegeteam',
    'team.subtitle': 'Ihre engagierten Medizinexperten',
    'team.primaryDoctor': 'Hauptarzt',
    'team.specialist': 'Spezialist',
    'team.coordinator': 'Pflegekoordinator',
    'team.nutritionist': 'Ernährungsberater',
    'team.physiotherapist': 'Physiotherapeut',
    'team.psychologist': 'Psychologe',
    'team.message': 'Nachricht senden',
    'team.schedule': 'Anruf planen',
    'team.addSpecialist': 'Spezialist hinzufügen',
    
    // Journey
    'journey.title': 'Ihre medizinische Reise',
    'journey.phase': 'Aktuelle Phase',
    'journey.preparation': 'Vorbereitung',
    'journey.virtualPrep': 'Virtuelle Vorbereitung',
    'journey.travel': 'Reise',
    'journey.surgery': 'Operation',
    'journey.recovery': 'Genesung',
    'journey.followUp': 'Nachsorge',
    'journey.complete': 'Reise abgeschlossen',
    'journey.timeline': 'Zeitplan',
    'journey.milestones': 'Meilensteine',
    'journey.documents': 'Dokumente',
    'journey.checklist': 'Checkliste',
    
    // Currency
    'price.currency': 'EUR',
    'price.from': 'Ab',
    'price.perNight': 'pro Nacht',
    'price.total': 'Gesamt',
    'price.discount': 'Rabatt',
    'price.savings': 'Sie sparen',
    'price.free': 'Kostenlos',
    'price.included': 'Inklusive'
  },
  
  // ========== FRENCH TRANSLATIONS ==========
  fr: {
    // Common
    'app.name': 'SelectCareOS',
    'app.tagline': 'Excellence Allemande, Soins Égyptiens',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.treatments': 'Traitements',
    'nav.packages': 'Forfaits',
    'nav.doctors': 'Médecins',
    'nav.booking': 'Réserver',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.wellness': 'Bien-être',
    'nav.rewards': 'Récompenses',
    'nav.shop': 'Boutique',
    'nav.profile': 'Profil',
    'nav.dashboard': 'Tableau de Bord',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.myJourney': 'Mon Parcours',
    'nav.appointments': 'Rendez-vous',
    'nav.family': 'Famille',
    'nav.medisense': 'MediSense AI',
    
    // Header
    'header.patientPortal': 'Portail Patient',
    'header.notifications': 'Notifications',
    'header.settings': 'Paramètres',
    'header.selectLanguage': 'Choisir la Langue',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'footer.contact': 'Contactez-nous',
    
    // Buttons
    'btn.submit': 'Soumettre',
    'btn.cancel': 'Annuler',
    'btn.save': 'Enregistrer',
    'btn.edit': 'Modifier',
    'btn.delete': 'Supprimer',
    'btn.back': 'Retour',
    'btn.next': 'Suivant',
    'btn.continue': 'Continuer',
    'btn.confirm': 'Confirmer',
    'btn.close': 'Fermer',
    'btn.learnMore': 'En Savoir Plus',
    'btn.viewAll': 'Voir Tout',
    'btn.viewDetails': 'Voir Détails',
    'btn.bookNow': 'Réserver',
    'btn.getStarted': 'Commencer',
    'btn.calculate': 'Calculer',
    'btn.add': 'Ajouter',
    'btn.remove': 'Supprimer',
    'btn.search': 'Rechercher',
    'btn.filter': 'Filtrer',
    'btn.apply': 'Appliquer',
    'btn.reset': 'Réinitialiser',
    'btn.sendMessage': 'Envoyer',
    'btn.subscribe': 'S\'abonner',
    'btn.upgrade': 'Mettre à niveau',
    
    // Status
    'status.loading': 'Chargement...',
    'status.success': 'Succès',
    'status.error': 'Erreur',
    'status.pending': 'En Attente',
    'status.completed': 'Terminé',
    'status.inProgress': 'En Cours',
    'status.scheduled': 'Programmé',
    'status.cancelled': 'Annulé',
    'status.active': 'Actif',
    'status.inactive': 'Inactif',
    'status.online': 'En Ligne',
    'status.offline': 'Hors Ligne',
    'status.busy': 'Occupé',
    
    // Time
    'time.today': 'Aujourd\'hui',
    'time.yesterday': 'Hier',
    'time.tomorrow': 'Demain',
    'time.days': 'jours',
    'time.hours': 'heures',
    'time.minutes': 'minutes',
    'time.seconds': 'secondes',
    'time.weeks': 'semaines',
    'time.months': 'mois',
    'time.years': 'ans',
    'time.ago': 'il y a',
    
    // Welcome
    'welcome.back': 'Bon retour,',
    'welcome.hello': 'Bonjour,',
    'welcome.goodMorning': 'Bonjour,',
    'welcome.goodAfternoon': 'Bon après-midi,',
    'welcome.goodEvening': 'Bonsoir,',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.overview': 'Aperçu',
    'dashboard.quickStats': 'Statistiques Rapides',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.upcomingAppointments': 'Rendez-vous à Venir',
    'dashboard.healthMetrics': 'Métriques de Santé',
    'dashboard.journeyProgress': 'Progression du Parcours',
    
    // Stats
    'stats.heartRate': 'Rythme Cardiaque',
    'stats.weight': 'Poids',
    'stats.bmi': 'IMC',
    'stats.steps': 'Pas',
    'stats.stepsToday': 'Pas Aujourd\'hui',
    'stats.calories': 'Calories',
    'stats.sleep': 'Sommeil',
    'stats.water': 'Eau',
    'stats.bloodPressure': 'Tension Artérielle',
    'stats.spO2': 'SpO2',
    'stats.normal': 'Normal',
    'stats.low': 'Bas',
    'stats.high': 'Élevé',
    'stats.optimal': 'Optimal',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Services médicaux de classe mondiale',
    'services.bariatric': 'Chirurgie Bariatrique',
    'services.orthopedic': 'Chirurgie Orthopédique',
    'services.aesthetic': 'Chirurgie Esthétique',
    'services.cardiology': 'Cardiologie',
    'services.antiAging': 'Anti-Âge & Longévité',
    'services.dental': 'Soins Dentaires',
    'services.wellness': 'Programmes Bien-être',
    'services.telemedicine': 'Télémédecine',
    'services.consultation': 'Consultation',
    'services.surgery': 'Chirurgie',
    'services.recovery': 'Récupération',
    'services.followUp': 'Suivi',
    
    // Booking
    'booking.title': 'Réserver un Rendez-vous',
    'booking.selectDoctor': 'Choisir le Médecin',
    'booking.selectDate': 'Choisir la Date',
    'booking.selectTime': 'Choisir l\'Heure',
    'booking.selectService': 'Choisir le Service',
    'booking.personalInfo': 'Informations Personnelles',
    'booking.paymentInfo': 'Informations de Paiement',
    'booking.confirmation': 'Confirmation',
    'booking.appointmentDetails': 'Détails du Rendez-vous',
    'booking.patientDetails': 'Informations Patient',
    'booking.firstName': 'Prénom',
    'booking.lastName': 'Nom',
    'booking.email': 'E-mail',
    'booking.phone': 'Téléphone',
    'booking.dateOfBirth': 'Date de Naissance',
    'booking.gender': 'Sexe',
    'booking.male': 'Homme',
    'booking.female': 'Femme',
    'booking.other': 'Autre',
    'booking.address': 'Adresse',
    'booking.city': 'Ville',
    'booking.country': 'Pays',
    'booking.notes': 'Notes',
    'booking.medicalHistory': 'Historique Médical',
    'booking.allergies': 'Allergies',
    'booking.medications': 'Médicaments Actuels',
    'booking.insurance': 'Assurance',
    'booking.total': 'Total',
    'booking.deposit': 'Acompte Requis',
    'booking.balance': 'Solde Dû',
    'booking.payNow': 'Payer Maintenant',
    'booking.payLater': 'Payer Plus Tard',
    'booking.confirmBooking': 'Confirmer la Réservation',
    'booking.bookingConfirmed': 'Réservation Confirmée!',
    'booking.bookingReference': 'Référence de Réservation',
    'booking.checkEmail': 'Vérifiez votre e-mail pour les détails de confirmation',
    
    // Doctors
    'doctors.title': 'Nos Médecins',
    'doctors.subtitle': 'Experts médicaux certifiés en Allemagne',
    'doctors.specialization': 'Spécialisation',
    'doctors.experience': 'Expérience',
    'doctors.yearsExperience': 'ans d\'expérience',
    'doctors.languages': 'Langues',
    'doctors.rating': 'Évaluation',
    'doctors.reviews': 'avis',
    'doctors.availability': 'Disponibilité',
    'doctors.consultationFee': 'Frais de Consultation',
    'doctors.bookAppointment': 'Prendre Rendez-vous',
    'doctors.viewProfile': 'Voir le Profil',
    
    // Packages
    'packages.title': 'Forfaits de Soins',
    'packages.subtitle': 'Forfaits tourisme médical tout compris',
    'packages.includes': 'Le Forfait Comprend',
    'packages.duration': 'Durée',
    'packages.nights': 'nuits',
    'packages.startingFrom': 'À partir de',
    'packages.comparePackages': 'Comparer les Forfaits',
    'packages.essential': 'Essentiel',
    'packages.plus': 'Plus',
    'packages.crown': 'Crown',
    'packages.popular': 'Le Plus Populaire',
    'packages.savings': 'Économies vs Allemagne',
    
    // Wellness
    'wellness.title': 'Bien-être Quotidien',
    'wellness.subtitle': 'Votre compagnon santé quotidien',
    'wellness.todayTasks': 'Tâches du Jour',
    'wellness.completedTasks': 'Terminées',
    'wellness.pendingTasks': 'En Attente',
    'wellness.streak': 'Jours Consécutifs',
    'wellness.points': 'Points Gagnés',
    'wellness.meditation': 'Méditation',
    'wellness.exercise': 'Exercice',
    'wellness.nutrition': 'Nutrition',
    'wellness.hydration': 'Hydratation',
    'wellness.sleep': 'Sommeil',
    'wellness.mindfulness': 'Pleine Conscience',
    'wellness.breathing': 'Respiration',
    'wellness.yoga': 'Yoga',
    'wellness.walking': 'Marche',
    'wellness.supplements': 'Compléments',
    
    // Rewards
    'rewards.title': 'Récompenses SelectPoints',
    'rewards.subtitle': 'Gagnez et échangez des points',
    'rewards.yourPoints': 'Vos Points',
    'rewards.pointsBalance': 'Solde de Points',
    'rewards.earnPoints': 'Gagner des Points',
    'rewards.redeemPoints': 'Échanger des Points',
    'rewards.history': 'Historique des Points',
    'rewards.howToEarn': 'Comment Gagner',
    'rewards.tier': 'Votre Niveau',
    'rewards.nextTier': 'Niveau Suivant',
    'rewards.pointsToNext': 'points pour le niveau suivant',
    'rewards.bronze': 'Bronze',
    'rewards.silver': 'Argent',
    'rewards.gold': 'Or',
    'rewards.platinum': 'Platine',
    'rewards.elite': 'Élite',
    
    // Marketplace
    'marketplace.title': 'Marketplace Santé',
    'marketplace.subtitle': 'Produits pour votre parcours santé',
    'marketplace.categories': 'Catégories',
    'marketplace.supplements': 'Compléments',
    'marketplace.equipment': 'Équipement Médical',
    'marketplace.skincare': 'Soins de Peau',
    'marketplace.postOp': 'Soins Post-Op',
    'marketplace.addToCart': 'Ajouter au Panier',
    'marketplace.cart': 'Panier',
    'marketplace.checkout': 'Commander',
    'marketplace.emptyCart': 'Votre panier est vide',
    'marketplace.subtotal': 'Sous-total',
    'marketplace.shipping': 'Livraison',
    'marketplace.tax': 'Taxes',
    'marketplace.orderTotal': 'Total de la Commande',
    
    // Family Hub
    'family.title': 'Centre Santé Familiale',
    'family.subtitle': 'Gérez la santé de votre famille',
    'family.members': 'Membres de la Famille',
    'family.addMember': 'Ajouter un Membre',
    'family.relationship': 'Relation',
    'family.spouse': 'Conjoint(e)',
    'family.child': 'Enfant',
    'family.parent': 'Parent',
    'family.sibling': 'Frère/Sœur',
    'family.familyPlan': 'Plan Famille',
    'family.sharedPoints': 'Points Partagés',
    'family.appointments': 'Rendez-vous Famille',
    'family.healthOverview': 'Aperçu Santé Familiale',
    
    // Subscription
    'subscription.title': 'Plans d\'Abonnement',
    'subscription.subtitle': 'Choisissez votre niveau de soins',
    'subscription.currentPlan': 'Plan Actuel',
    'subscription.upgradePlan': 'Mettre à Niveau',
    'subscription.features': 'Fonctionnalités',
    'subscription.free': 'Gratuit',
    'subscription.basic': 'Basique',
    'subscription.plus': 'Plus',
    'subscription.premium': 'Premium',
    'subscription.perMonth': 'par mois',
    'subscription.perYear': 'par an',
    'subscription.annual': 'Annuel',
    'subscription.monthly': 'Mensuel',
    'subscription.savePercent': 'Économisez',
    'subscription.mostPopular': 'Le Plus Populaire',
    'subscription.bestValue': 'Meilleur Rapport',
    'subscription.currentlySubscribed': 'Abonné Actuellement',
    
    // AI Concierge
    'ai.title': 'Concierge Santé IA',
    'ai.subtitle': 'Votre assistant santé personnel',
    'ai.greeting': 'Bonjour! Je suis votre concierge santé IA personnel. Comment puis-je vous aider aujourd\'hui?',
    'ai.placeholder': 'Tapez votre message...',
    'ai.suggestions': 'Questions Suggérées',
    'ai.typing': 'L\'IA tape...',
    'ai.disclaimer': 'Cette IA fournit uniquement des informations de santé générales. Pour un avis médical, veuillez consulter un médecin.',
    
    // MediSense
    'medisense.title': 'MediSense AI',
    'medisense.subtitle': 'Analyseur de Symptômes Intelligent',
    'medisense.selectSymptoms': 'Sélectionner les Symptômes',
    'medisense.searchSymptoms': 'Rechercher des symptômes...',
    'medisense.selectedSymptoms': 'Symptômes Sélectionnés',
    'medisense.analyzeSymptoms': 'Analyser les Symptômes',
    'medisense.results': 'Résultats de l\'Analyse',
    'medisense.possibleConditions': 'Conditions Possibles',
    'medisense.recommendations': 'Recommandations',
    'medisense.urgencyLevel': 'Niveau d\'Urgence',
    'medisense.emergency': 'Urgence',
    'medisense.urgent': 'Urgent',
    'medisense.routine': 'Routine',
    'medisense.selfCare': 'Auto-soins',
    'medisense.consultDoctor': 'Consulter un Médecin',
    'medisense.bookConsultation': 'Réserver une Consultation',
    'medisense.disclaimer': 'Ceci n\'est pas un diagnostic médical. Veuillez consulter un professionnel de santé.',
    
    // Mindfulness
    'mindfulness.title': 'Pleine Conscience & Méditation',
    'mindfulness.subtitle': 'Trouvez votre paix intérieure',
    'mindfulness.breathing': 'Exercices de Respiration',
    'mindfulness.meditation': 'Méditation Guidée',
    'mindfulness.relaxation': 'Relaxation',
    'mindfulness.focus': 'Concentration',
    'mindfulness.sleep': 'Sommeil',
    'mindfulness.stress': 'Réduction du Stress',
    'mindfulness.duration': 'Durée',
    'mindfulness.start': 'Démarrer la Séance',
    'mindfulness.pause': 'Pause',
    'mindfulness.resume': 'Reprendre',
    'mindfulness.complete': 'Séance Terminée',
    'mindfulness.breatheIn': 'Inspirez',
    'mindfulness.breatheOut': 'Expirez',
    'mindfulness.hold': 'Retenez',
    
    // Referral
    'referral.title': 'Partagez & Gagnez',
    'referral.subtitle': 'Parrainez des amis et gagnez des récompenses',
    'referral.yourCode': 'Votre Code de Parrainage',
    'referral.copyCode': 'Copier le Code',
    'referral.shareLink': 'Partager le Lien',
    'referral.friendsReferred': 'Amis Parrainés',
    'referral.earned': 'Gagné',
    'referral.howItWorks': 'Comment ça Marche',
    'referral.step1': 'Partagez votre code unique',
    'referral.step2': 'Votre ami s\'inscrit',
    'referral.step3': 'Vous gagnez tous les deux',
    
    // Care Team
    'team.title': 'Votre Équipe de Soins',
    'team.subtitle': 'Vos professionnels médicaux dédiés',
    'team.primaryDoctor': 'Médecin Principal',
    'team.specialist': 'Spécialiste',
    'team.coordinator': 'Coordinateur de Soins',
    'team.nutritionist': 'Nutritionniste',
    'team.physiotherapist': 'Kinésithérapeute',
    'team.psychologist': 'Psychologue',
    'team.message': 'Envoyer un Message',
    'team.schedule': 'Planifier un Appel',
    'team.addSpecialist': 'Ajouter un Spécialiste',
    
    // Journey
    'journey.title': 'Votre Parcours Médical',
    'journey.phase': 'Phase Actuelle',
    'journey.preparation': 'Préparation',
    'journey.virtualPrep': 'Préparation Virtuelle',
    'journey.travel': 'Voyage',
    'journey.surgery': 'Chirurgie',
    'journey.recovery': 'Récupération',
    'journey.followUp': 'Suivi',
    'journey.complete': 'Parcours Terminé',
    'journey.timeline': 'Chronologie',
    'journey.milestones': 'Jalons',
    'journey.documents': 'Documents',
    'journey.checklist': 'Liste de Contrôle',
    
    // Currency
    'price.currency': 'EUR',
    'price.from': 'À partir de',
    'price.perNight': 'par nuit',
    'price.total': 'Total',
    'price.discount': 'Remise',
    'price.savings': 'Vous Économisez',
    'price.free': 'Gratuit',
    'price.included': 'Inclus'
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get translation for a key in specified language
 */
export function t(key: string, lang: SupportedLanguage = 'en'): string {
  return APP_TRANSLATIONS[lang]?.[key] || APP_TRANSLATIONS.en[key] || key
}

/**
 * Get text direction for language
 */
export function getDir(lang: SupportedLanguage): 'ltr' | 'rtl' {
  return LANGUAGE_CONFIG[lang]?.dir || 'ltr'
}

/**
 * Get locale for language
 */
export function getLocale(lang: SupportedLanguage): string {
  return LANGUAGE_CONFIG[lang]?.locale || 'en-US'
}

/**
 * Format number based on locale
 */
export function formatNumber(num: number, lang: SupportedLanguage): string {
  return new Intl.NumberFormat(getLocale(lang)).format(num)
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, lang: SupportedLanguage, currency: string = 'EUR'): string {
  return new Intl.NumberFormat(getLocale(lang), {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Format date based on locale
 */
export function formatDate(date: Date, lang: SupportedLanguage, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(getLocale(lang), options || {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Generate language selector HTML
 */
export function generateLanguageSelector(currentLang: SupportedLanguage = 'en', className: string = ''): string {
  const options = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => {
      const selected = code === currentLang ? 'selected' : ''
      return `<option value="${code}" ${selected}>${config.flag} ${config.nativeName}</option>`
    })
    .join('')

  return `
    <select id="languageSelect" onchange="changeLanguage(this.value)" 
            class="${className || 'appearance-none bg-white/10 text-white px-3 py-1.5 pr-8 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition border border-white/20'}">
      ${options}
    </select>
  `
}

/**
 * Generate language change script
 */
export function generateLanguageScript(): string {
  return `
    function changeLanguage(lang) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      localStorage.setItem('selectcare-language', lang);
      window.location.href = url.toString();
    }
  `
}

/**
 * Get HTML lang and dir attributes
 */
export function getHtmlAttrs(lang: SupportedLanguage): string {
  return `lang="${lang}" dir="${getDir(lang)}"`
}

/**
 * Parse language from request query
 */
export function parseLang(queryLang: string | undefined): SupportedLanguage {
  const validLangs: SupportedLanguage[] = ['en', 'ar', 'de', 'fr']
  if (queryLang && validLangs.includes(queryLang as SupportedLanguage)) {
    return queryLang as SupportedLanguage
  }
  return 'en'
}

console.log('SelectCareOS™ App i18n loaded with', Object.keys(LANGUAGE_CONFIG).length, 'languages and', Object.keys(APP_TRANSLATIONS.en).length, 'translation keys')
