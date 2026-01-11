/**
 * Doctor Profile Page - SelectCareOS™ Premium Design
 * Individual doctor detail view with booking capability
 */

export function doctorProfilePage(doctorId: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Profile - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            /* SelectCareOS™ Brand Colors */
            --navy: #001F3F;
            --navy-light: #003366;
            --primary: #001F3F;
            --primary-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --coral: #FF6B35;
            --success: #06D6A0;
            --cream: #FAF8F5;
        }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            background: var(--cream);
            color: #2D3748;
        }
        
        h1, h2, h3, h4 {
            font-weight: 600;
            letter-spacing: -0.02em;
            color: var(--primary);
        }
        
        /* Hero Background */
        .hero-bg { 
            background: linear-gradient(135deg, rgba(0,31,63,0.95), rgba(0,51,102,0.90)), 
                        url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400');
            background-size: cover;
            background-position: center;
        }
        
        /* Gradients */
        .gradient-primary { background: linear-gradient(135deg, #001F3F 0%, #003366 100%); }
        .gradient-gold { background: linear-gradient(135deg, #C9A227 0%, #E8D5A3 100%); }
        .gradient-coral { background: linear-gradient(135deg, #FF6B35 0%, #F77F00 100%); }
        .gradient-success { background: linear-gradient(135deg, #06D6A0 0%, #2D6A4F 100%); }
        
        /* Badges */
        .badge-german {
            background: linear-gradient(135deg, #001F3F 0%, #003366 100%);
            box-shadow: 0 4px 12px rgba(0,51,102,0.3);
        }
        .badge-premium {
            background: linear-gradient(135deg, #C9A227 0%, #E8D5A3 100%);
            color: #001F3F;
            box-shadow: 0 6px 16px rgba(212,175,55,0.4);
        }
        .badge-verified {
            background: linear-gradient(135deg, #06D6A0 0%, #2D6A4F 100%);
            box-shadow: 0 4px 12px rgba(6,214,160,0.3);
        }
        
        /* Cards */
        .card {
            background: white;
            border: 2px solid #EAE3DA;
            border-radius: 20px;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card:hover {
            box-shadow: 0 20px 40px rgba(30,58,95,0.1);
            border-color: var(--gold);
        }
        
        /* Avatar Ring */
        .avatar-ring {
            padding: 4px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            border-radius: 50%;
            box-shadow: 0 8px 24px rgba(212,175,55,0.4);
        }
        
        /* Buttons */
        .btn-primary {
            background: linear-gradient(135deg, #001F3F 0%, #003366 100%);
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(0,51,102,0.35);
        }
        
        .btn-gold {
            background: linear-gradient(135deg, #C9A227 0%, #B8860B 100%);
            color: white;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(201,162,39,0.4);
        }
        .btn-gold:hover {
            background: linear-gradient(135deg, #E8D5A3 0%, #C9A227 100%);
            color: #001F3F;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 16px 32px rgba(201,162,39,0.5);
        }
        
        .btn-coral {
            background: linear-gradient(135deg, #FF6B35 0%, #F77F00 100%);
            color: white;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(255,107,53,0.3);
            transition: all 0.3s ease;
        }
        .btn-coral:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 16px 32px rgba(255,107,53,0.45);
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-outline:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
        }
        
        /* Shimmer Animation */
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .shimmer-gold {
            background: linear-gradient(90deg, #C9A227 0%, #E8D5A3 50%, #C9A227 100%);
            background-size: 200% 100%;
            animation: shimmer 3s linear infinite;
        }
        
        /* Pulse Animation */
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        .pulse { animation: pulse 2s infinite; }
        
        /* Tab Styles */
        .tab-btn {
            padding: 12px 24px;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.3s ease;
            color: #6B7280;
        }
        .tab-btn.active {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 12px rgba(30,58,95,0.3);
        }
        .tab-btn:hover:not(.active) {
            background: #F3F4F6;
            color: var(--primary);
        }
        
        /* Review Card */
        .review-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #E5E7EB;
            transition: all 0.3s ease;
        }
        .review-card:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            border-color: var(--gold);
        }
        
        /* Time Slot */
        .time-slot {
            padding: 10px 16px;
            border: 2px solid #E5E7EB;
            border-radius: 10px;
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .time-slot:hover {
            border-color: var(--primary);
            background: rgba(30,58,95,0.05);
        }
        .time-slot.selected {
            border-color: var(--gold);
            background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,231,206,0.2));
            color: var(--primary);
        }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 12px 16px;
            color: #9CA3AF;
            text-decoration: none;
            transition: all 0.2s;
            border-radius: 12px;
        }
        .nav-item:hover { color: var(--primary); background: rgba(30, 58, 95, 0.05); }
        .nav-item.active { color: var(--gold); background: rgba(212, 175, 55, 0.1); }
        .nav-item i { font-size: 24px; }
        
        main { padding-bottom: 100px; }
        
        /* Loading Skeleton */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-4">
                    <a href="/doctors" class="text-gray-500 hover:text-primary transition">
                        <i class="fas fa-arrow-left text-xl"></i>
                    </a>
                    <a href="/premium" class="flex items-center space-x-3">
                        <div class="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center shadow-md">
                            <i class="fas fa-plus text-white text-lg"></i>
                        </div>
                        <span class="text-xl font-bold text-gray-800 hidden sm:block">SelectCare<span class="text-gold">OS</span>™</span>
                    </a>
                </div>
                <div class="flex items-center gap-3">
                    <button class="p-2 text-gray-500 hover:text-primary transition" onclick="shareDoctor()">
                        <i class="fas fa-share-alt text-xl"></i>
                    </button>
                    <button class="p-2 text-gray-500 hover:text-red-500 transition" onclick="toggleFavorite()">
                        <i class="far fa-heart text-xl" id="favorite-icon"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Doctor Profile Content -->
    <div id="doctor-profile">
        <!-- Loading State -->
        <div id="loading-state" class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div class="card p-8">
                        <div class="flex gap-6">
                            <div class="skeleton w-32 h-32 rounded-full"></div>
                            <div class="flex-1 space-y-3">
                                <div class="skeleton h-8 w-3/4"></div>
                                <div class="skeleton h-5 w-1/2"></div>
                                <div class="skeleton h-5 w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="skeleton h-64 rounded-2xl"></div>
            </div>
        </div>
        
        <!-- Profile Content (Hidden until loaded) -->
        <div id="profile-content" class="hidden">
            <!-- Hero Section with Doctor Info -->
            <section class="hero-bg text-white py-12">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        <!-- Avatar -->
                        <div class="avatar-ring">
                            <div class="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-4xl font-bold" id="doctor-avatar">
                                --
                            </div>
                        </div>
                        
                        <!-- Doctor Info -->
                        <div class="flex-1 text-center lg:text-left">
                            <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
                                <span id="premium-badge" class="hidden badge-premium px-4 py-1.5 rounded-full text-sm font-bold">
                                    <i class="fas fa-crown mr-1"></i>Premium Specialist
                                </span>
                                <span class="badge-verified text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                                    <i class="fas fa-check-circle mr-1"></i>Verified
                                </span>
                                <span id="available-badge" class="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                                    <i class="fas fa-circle text-xs mr-1 pulse"></i>Available
                                </span>
                            </div>
                            
                            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2" id="doctor-name">Loading...</h1>
                            <p class="text-xl text-yellow-300 font-medium mb-2" id="doctor-title">--</p>
                            <p class="text-lg text-white/80 mb-4" id="doctor-specialization">--</p>
                            
                            <!-- Quick Stats -->
                            <div class="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <span class="font-bold" id="doctor-rating">--</span>
                                    <span class="text-white/60">(<span id="doctor-reviews">--</span> reviews)</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-briefcase-medical text-yellow-300"></i>
                                    <span><span id="doctor-experience">--</span> years exp.</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-map-marker-alt text-coral"></i>
                                    <span id="doctor-location">--</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Booking Card (Desktop) -->
                        <div class="hidden lg:block">
                            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[280px]">
                                <div class="text-center mb-4">
                                    <span class="text-white/70 text-sm">Consultation Fee</span>
                                    <p class="text-4xl font-bold text-white">€<span id="doctor-fee-hero">--</span></p>
                                </div>
                                <a href="#booking-section" class="btn-gold w-full py-3 rounded-xl flex items-center justify-center text-lg mb-3">
                                    <i class="fas fa-calendar-check mr-2"></i>Book Now
                                </a>
                                <button onclick="startVideoCall()" class="btn-outline border-white text-white hover:bg-white hover:text-primary w-full py-3 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-video mr-2"></i>Video Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <main class="max-w-7xl mx-auto px-4 py-8">
                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- Tabs -->
                        <div class="flex gap-2 overflow-x-auto pb-2">
                            <button class="tab-btn active" onclick="showTab('about')">About</button>
                            <button class="tab-btn" onclick="showTab('qualifications')">Qualifications</button>
                            <button class="tab-btn" onclick="showTab('reviews')">Reviews</button>
                            <button class="tab-btn" onclick="showTab('procedures')">Procedures</button>
                        </div>
                        
                        <!-- About Tab -->
                        <div id="tab-about" class="tab-content">
                            <div class="card p-6">
                                <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                                    <i class="fas fa-user-md text-primary"></i>About
                                </h2>
                                <p class="text-gray-600 leading-relaxed mb-6" id="doctor-bio">
                                    Loading doctor information...
                                </p>
                                
                                <!-- Subspecialties -->
                                <h3 class="font-bold text-lg mb-3">Subspecialties</h3>
                                <div class="flex flex-wrap gap-2 mb-6" id="subspecialties-list">
                                    <!-- Populated dynamically -->
                                </div>
                                
                                <!-- Languages -->
                                <h3 class="font-bold text-lg mb-3">Languages</h3>
                                <div class="flex flex-wrap gap-3" id="languages-list">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Qualifications Tab -->
                        <div id="tab-qualifications" class="tab-content hidden">
                            <div class="card p-6">
                                <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                                    <i class="fas fa-graduation-cap text-primary"></i>Qualifications & Certifications
                                </h2>
                                <div class="space-y-4" id="qualifications-list">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Reviews Tab -->
                        <div id="tab-reviews" class="tab-content hidden">
                            <div class="card p-6">
                                <div class="flex items-center justify-between mb-6">
                                    <h2 class="text-xl font-bold flex items-center gap-2">
                                        <i class="fas fa-star text-yellow-500"></i>Patient Reviews
                                    </h2>
                                    <div class="flex items-center gap-2">
                                        <span class="text-3xl font-bold text-primary" id="review-score">--</span>
                                        <div>
                                            <div class="flex text-yellow-400" id="review-stars"></div>
                                            <span class="text-sm text-gray-500"><span id="review-count">--</span> reviews</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Reviews List -->
                                <div class="space-y-4" id="reviews-list">
                                    <!-- Sample reviews - in production, fetch from API -->
                                </div>
                                
                                <button class="w-full mt-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium hover:border-primary hover:text-primary transition">
                                    Load More Reviews
                                </button>
                            </div>
                        </div>
                        
                        <!-- Procedures Tab -->
                        <div id="tab-procedures" class="tab-content hidden">
                            <div class="card p-6">
                                <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                                    <i class="fas fa-procedures text-primary"></i>Procedures & Treatments
                                </h2>
                                <div class="grid md:grid-cols-2 gap-4" id="procedures-list">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="space-y-6">
                        <!-- Booking Card -->
                        <div class="card p-6" id="booking-section">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <i class="fas fa-calendar-alt text-gold"></i>Book Appointment
                            </h3>
                            
                            <!-- Consultation Fee -->
                            <div class="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-4 mb-6">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Consultation Fee</span>
                                    <span class="text-2xl font-bold text-primary">€<span id="doctor-fee">--</span></span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">Video or In-person consultation</p>
                            </div>
                            
                            <!-- Date Selection -->
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                                <input type="date" id="booking-date" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                            </div>
                            
                            <!-- Time Slots -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                                <div class="grid grid-cols-3 gap-2" id="time-slots">
                                    <div class="time-slot text-center" onclick="selectTime(this)">09:00</div>
                                    <div class="time-slot text-center" onclick="selectTime(this)">10:00</div>
                                    <div class="time-slot text-center" onclick="selectTime(this)">11:00</div>
                                    <div class="time-slot text-center" onclick="selectTime(this)">14:00</div>
                                    <div class="time-slot text-center" onclick="selectTime(this)">15:00</div>
                                    <div class="time-slot text-center" onclick="selectTime(this)">16:00</div>
                                </div>
                            </div>
                            
                            <!-- Consultation Type -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                                <div class="grid grid-cols-2 gap-3">
                                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition has-[:checked]:border-gold has-[:checked]:bg-gold/5">
                                        <input type="radio" name="consult-type" value="video" class="hidden" checked>
                                        <i class="fas fa-video text-primary"></i>
                                        <span class="font-medium">Video Call</span>
                                    </label>
                                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition has-[:checked]:border-gold has-[:checked]:bg-gold/5">
                                        <input type="radio" name="consult-type" value="inperson" class="hidden">
                                        <i class="fas fa-hospital text-primary"></i>
                                        <span class="font-medium">In-Person</span>
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Book Button -->
                            <button onclick="bookAppointment()" class="btn-gold w-full py-4 rounded-xl text-lg flex items-center justify-center">
                                <i class="fas fa-calendar-check mr-2"></i>Confirm Booking
                            </button>
                            
                            <p class="text-xs text-gray-500 text-center mt-3">
                                <i class="fas fa-shield-alt mr-1"></i>Free cancellation up to 24 hours before
                            </p>
                        </div>
                        
                        <!-- Contact Card -->
                        <div class="card p-6">
                            <h3 class="font-bold mb-4">Need Help?</h3>
                            <div class="space-y-3">
                                <a href="tel:+491234567890" class="flex items-center gap-3 text-gray-600 hover:text-primary transition">
                                    <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-phone text-primary"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium">Call Us</p>
                                        <p class="text-sm text-gray-500">+49 123 456 7890</p>
                                    </div>
                                </a>
                                <a href="/ai-concierge" class="flex items-center gap-3 text-gray-600 hover:text-primary transition">
                                    <div class="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-robot text-gold"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium">AI Concierge</p>
                                        <p class="text-sm text-gray-500">24/7 assistance</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Similar Doctors -->
                        <div class="card p-6">
                            <h3 class="font-bold mb-4">Similar Specialists</h3>
                            <div class="space-y-4" id="similar-doctors">
                                <!-- Populated dynamically -->
                            </div>
                            <a href="/doctors" class="block text-center text-primary font-medium mt-4 hover:underline">
                                View All Doctors →
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Mobile Booking Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
        <div class="flex items-center justify-between gap-4">
            <div>
                <span class="text-sm text-gray-500">Consultation</span>
                <p class="text-xl font-bold text-primary">€<span id="doctor-fee-mobile">--</span></p>
            </div>
            <a href="#booking-section" class="btn-gold px-8 py-3 rounded-xl flex items-center">
                <i class="fas fa-calendar-check mr-2"></i>Book Now
            </a>
        </div>
    </div>

    <script>
        const doctorId = '${doctorId}';
        let doctorData = null;
        
        document.addEventListener('DOMContentLoaded', () => {
            loadDoctorProfile();
            setMinDate();
        });
        
        async function loadDoctorProfile() {
            try {
                const response = await fetch('/api/doctors');
                const data = await response.json();
                
                if (data.success) {
                    // Find the specific doctor
                    doctorData = data.data.find(d => d.id === doctorId);
                    
                    if (doctorData) {
                        renderDoctorProfile(doctorData);
                        loadSimilarDoctors(data.data);
                    } else {
                        showError('Doctor not found');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                showError('Failed to load doctor profile');
            }
        }
        
        function renderDoctorProfile(doctor) {
            // Hide loading, show content
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('profile-content').classList.remove('hidden');
            
            // Update page title
            document.title = doctor.name + ' - SelectCareOS™';
            
            // Basic Info
            document.getElementById('doctor-avatar').textContent = doctor.avatar || doctor.name.split(' ').map(n => n[0]).join('').substring(0,2);
            document.getElementById('doctor-name').textContent = doctor.name;
            document.getElementById('doctor-title').textContent = doctor.title;
            document.getElementById('doctor-specialization').textContent = doctor.specialization;
            document.getElementById('doctor-rating').textContent = doctor.rating;
            document.getElementById('doctor-reviews').textContent = doctor.total_reviews || doctor.reviewCount;
            document.getElementById('doctor-experience').textContent = doctor.experience_years || doctor.experienceYears;
            document.getElementById('doctor-location').textContent = doctor.location;
            
            // Fees
            const fee = doctor.consultation_fee || doctor.consultationFee;
            document.getElementById('doctor-fee').textContent = fee;
            document.getElementById('doctor-fee-hero').textContent = fee;
            document.getElementById('doctor-fee-mobile').textContent = fee;
            
            // Premium badge
            if (doctor.is_premium || doctor.isPremium) {
                document.getElementById('premium-badge').classList.remove('hidden');
            }
            
            // Availability
            if (!doctor.available) {
                document.getElementById('available-badge').innerHTML = '<i class="fas fa-clock mr-1"></i>Unavailable';
                document.getElementById('available-badge').classList.remove('bg-green-500');
                document.getElementById('available-badge').classList.add('bg-gray-500');
            }
            
            // Bio
            document.getElementById('doctor-bio').textContent = generateBio(doctor);
            
            // Subspecialties
            const subspecialtiesHtml = (doctor.subspecialties || []).map(s => 
                '<span class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">' + s + '</span>'
            ).join('');
            document.getElementById('subspecialties-list').innerHTML = subspecialtiesHtml || '<span class="text-gray-500">Not specified</span>';
            
            // Languages
            const languagesHtml = (doctor.languages || []).map(l => 
                '<div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"><i class="fas fa-globe text-gray-500"></i><span>' + l + '</span></div>'
            ).join('');
            document.getElementById('languages-list').innerHTML = languagesHtml;
            
            // Qualifications
            const qualificationsHtml = (doctor.qualifications || []).map(q => 
                '<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">' +
                    '<div class="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">' +
                        '<i class="fas fa-award text-gold"></i>' +
                    '</div>' +
                    '<div>' +
                        '<p class="font-medium text-gray-800">' + q + '</p>' +
                    '</div>' +
                '</div>'
            ).join('');
            document.getElementById('qualifications-list').innerHTML = qualificationsHtml || '<p class="text-gray-500">No qualifications listed</p>';
            
            // Reviews
            document.getElementById('review-score').textContent = doctor.rating;
            document.getElementById('review-count').textContent = doctor.total_reviews || doctor.reviewCount;
            document.getElementById('review-stars').innerHTML = generateStars(doctor.rating);
            document.getElementById('reviews-list').innerHTML = generateSampleReviews(doctor);
            
            // Procedures
            document.getElementById('procedures-list').innerHTML = generateProcedures(doctor);
        }
        
        function generateBio(doctor) {
            return doctor.name + ' is a highly experienced ' + doctor.specialization + ' specialist with ' + 
                   (doctor.experience_years || doctor.experienceYears) + ' years of clinical experience. ' +
                   'Based in ' + doctor.location + ', ' + doctor.name.split(' ')[0] + ' provides exceptional care ' +
                   'with a focus on ' + (doctor.subspecialties ? doctor.subspecialties[0] : doctor.specialization) + '. ' +
                   'Fluent in ' + (doctor.languages || []).join(', ') + ', ensuring clear communication with international patients.';
        }
        
        function generateStars(rating) {
            let html = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    html += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= rating) {
                    html += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    html += '<i class="far fa-star text-gray-300"></i>';
                }
            }
            return html;
        }
        
        function generateSampleReviews(doctor) {
            const reviews = [
                { name: 'Anna M.', country: 'Germany', rating: 5, text: 'Excellent care and professionalism. The consultation was thorough and all my questions were answered. Highly recommend!' },
                { name: 'James W.', country: 'UK', rating: 5, text: 'Outstanding experience. The doctor took time to explain everything in detail. The video consultation was seamless.' },
                { name: 'Sarah K.', country: 'USA', rating: 4, text: 'Very knowledgeable and caring doctor. Made me feel comfortable throughout the entire process.' }
            ];
            
            return reviews.map(r => 
                '<div class="review-card">' +
                    '<div class="flex items-center justify-between mb-3">' +
                        '<div class="flex items-center gap-3">' +
                            '<div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">' + r.name[0] + '</div>' +
                            '<div>' +
                                '<p class="font-medium">' + r.name + '</p>' +
                                '<p class="text-sm text-gray-500">' + r.country + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="flex text-yellow-400 text-sm">' + generateStars(r.rating) + '</div>' +
                    '</div>' +
                    '<p class="text-gray-600">' + r.text + '</p>' +
                '</div>'
            ).join('');
        }
        
        function generateProcedures(doctor) {
            const procedures = doctor.subspecialties || [doctor.specialization];
            return procedures.map(p => 
                '<div class="p-4 border-2 border-gray-100 rounded-xl hover:border-gold transition cursor-pointer">' +
                    '<div class="flex items-center gap-3">' +
                        '<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">' +
                            '<i class="fas fa-procedures text-primary"></i>' +
                        '</div>' +
                        '<div>' +
                            '<p class="font-medium text-gray-800">' + p + '</p>' +
                            '<p class="text-sm text-gray-500">Consultation available</p>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            ).join('');
        }
        
        function loadSimilarDoctors(allDoctors) {
            const similar = allDoctors
                .filter(d => d.id !== doctorId)
                .slice(0, 3);
            
            const html = similar.map(d => 
                '<a href="/doctor/' + d.id + '" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">' +
                    '<div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold">' +
                        (d.avatar || d.name.split(' ').map(n => n[0]).join('').substring(0,2)) +
                    '</div>' +
                    '<div class="flex-1">' +
                        '<p class="font-medium text-gray-800">' + d.name + '</p>' +
                        '<p class="text-sm text-gray-500">' + d.specialization.split(',')[0] + '</p>' +
                    '</div>' +
                    '<div class="text-right">' +
                        '<div class="flex items-center gap-1 text-yellow-500 text-sm">' +
                            '<i class="fas fa-star"></i>' +
                            '<span>' + d.rating + '</span>' +
                        '</div>' +
                    '</div>' +
                '</a>'
            ).join('');
            
            document.getElementById('similar-doctors').innerHTML = html;
        }
        
        function showError(message) {
            document.getElementById('loading-state').innerHTML = 
                '<div class="text-center py-12">' +
                    '<i class="fas fa-exclamation-circle text-5xl text-red-400 mb-4"></i>' +
                    '<p class="text-gray-600">' + message + '</p>' +
                    '<a href="/doctors" class="btn-primary px-6 py-2 rounded-lg mt-4 inline-block">Back to Doctors</a>' +
                '</div>';
        }
        
        // Tab functionality
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            
            // Show selected tab
            document.getElementById('tab-' + tabName).classList.remove('hidden');
            event.target.classList.add('active');
        }
        
        // Time slot selection
        function selectTime(element) {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            element.classList.add('selected');
        }
        
        // Set minimum date to today
        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('booking-date').min = today;
            document.getElementById('booking-date').value = today;
        }
        
        // Booking
        function bookAppointment() {
            const date = document.getElementById('booking-date').value;
            const selectedTime = document.querySelector('.time-slot.selected');
            const consultType = document.querySelector('input[name="consult-type"]:checked').value;
            
            if (!date) {
                alert('Please select a date');
                return;
            }
            
            if (!selectedTime) {
                alert('Please select a time slot');
                return;
            }
            
            // Redirect to booking page with pre-filled info
            window.location.href = '/booking?doctor=' + doctorId + '&date=' + date + '&time=' + selectedTime.textContent + '&type=' + consultType;
        }
        
        function startVideoCall() {
            alert('Video consultation feature coming soon! For now, please book an appointment.');
        }
        
        function shareDoctor() {
            if (navigator.share) {
                navigator.share({
                    title: doctorData ? doctorData.name + ' - SelectCareOS™' : 'Doctor Profile',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        }
        
        function toggleFavorite() {
            const icon = document.getElementById('favorite-icon');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-red-500');
        }
    </script>
</body>
</html>`
}
