/**
 * Doctors Page - SelectCareOS™ Premium Design
 * Inspired by German Select SurgeryBridge design
 */
import { Context } from 'hono'

export function doctorsPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Medical Specialists - SelectCareOS™</title>
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
            --success: #22C55E;
            --cream: #F8F6F0;
            --green: #22C55E;
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
            background: linear-gradient(135deg, rgba(30,58,95,0.92), rgba(74,144,164,0.85)), 
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
            background: linear-gradient(135deg, #001F3F 0%, #0066CC 100%);
            box-shadow: 0 4px 12px rgba(0,102,204,0.3);
        }
        .badge-medical {
            background: linear-gradient(135deg, #06D6A0 0%, #2D6A4F 100%);
            box-shadow: 0 4px 12px rgba(6,214,160,0.3);
        }
        .badge-premium {
            background: linear-gradient(135deg, #C9A227 0%, #E8D5A3 100%);
            color: #001530;
            box-shadow: 0 6px 16px rgba(212,175,55,0.4);
        }
        
        /* Card Styles */
        .card {
            background: white;
            border: 2px solid #EAE3DA;
            border-radius: 16px;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(30,58,95,0.15);
            border-color: var(--gold);
        }
        
        .card-premium {
            position: relative;
            border: 3px solid var(--gold);
            box-shadow: 0 0 30px rgba(212,175,55,0.2);
        }
        .card-premium::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #C9A227 0%, #E8D5A3 50%, #C9A227 100%);
        }
        
        /* Buttons */
        .btn-primary {
            background: linear-gradient(135deg, #001F3F 0%, #0066CC 100%);
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background: linear-gradient(135deg, #001530 0%, #0066CC 100%);
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(0,102,204,0.35);
        }
        
        .btn-gold {
            background: linear-gradient(135deg, #C9A227 0%, #CD7F32 100%);
            color: white;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(212,175,55,0.4);
        }
        .btn-gold:hover {
            background: linear-gradient(135deg, #E8D5A3 0%, #C9A227 100%);
            color: #001530;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 16px 32px rgba(212,175,55,0.5);
        }
        
        .btn-coral {
            background: linear-gradient(135deg, #FF6B35 0%, #F77F00 100%);
            color: white;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(255,107,53,0.3);
            transition: all 0.3s ease;
        }
        .btn-coral:hover {
            background: linear-gradient(135deg, #E64500 0%, #FF6B35 100%);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 16px 32px rgba(255,107,53,0.45);
        }
        
        /* Stats Card */
        .stat-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            border-color: var(--gold);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(30,58,95,0.1);
        }
        
        /* Doctor Card Enhanced */
        .doctor-card {
            background: linear-gradient(145deg, #FFFFFF 0%, #FFFDF7 100%);
            border: 2px solid #EAE3DA;
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        .doctor-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .doctor-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 48px rgba(30,58,95,0.15);
            border-color: var(--gold);
        }
        .doctor-card:hover::before {
            opacity: 1;
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
        }
        
        .doctor-card.premium-doctor {
            border-color: var(--gold);
            box-shadow: 0 0 30px rgba(212,175,55,0.15);
        }
        .doctor-card.premium-doctor::before {
            opacity: 1;
            background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
        }
        
        /* Avatar */
        .avatar-ring {
            padding: 3px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            border-radius: 50%;
        }
        
        /* Animations */
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        .shimmer-gold {
            background: linear-gradient(90deg, #C9A227 0%, #E8D5A3 50%, #C9A227 100%);
            background-size: 200% 100%;
            animation: shimmer 3s linear infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .pulse-badge {
            animation: pulse 2s infinite;
        }
        
        /* ════════════════════════════════════════════════════════════════
           UNIFIED BOTTOM NAVIGATION - Healthcare-First (Option A)
           ════════════════════════════════════════════════════════════════ */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(12px, env(safe-area-inset-bottom));
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }
        .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 500px;
            margin: 0 auto;
            padding: 0 8px;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 6px 12px;
            color: #9CA3AF;
            font-size: 10px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            border-radius: 8px;
            min-width: 56px;
            position: relative;
        }
        .nav-item i { font-size: 20px; margin-bottom: 4px; transition: transform 0.2s ease; }
        .nav-item span { white-space: nowrap; }
        .nav-item:hover { color: #6B7280; background: rgba(0, 0, 0, 0.02); }
        .nav-item:hover i { transform: scale(1.1); }
        .nav-item.active { color: #C9A227; }
        .nav-item.active i { transform: scale(1.1); }
        .nav-item.connect-btn { position: relative; }
        .nav-item.connect-btn .live-dot {
            position: absolute;
            top: 4px;
            right: 12px;
            width: 8px;
            height: 8px;
            background: #22C55E;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        .floating-emergency {
            position: fixed;
            bottom: 90px;
            right: 16px;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #DC2626, #B91C1C);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 22px;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
            z-index: 999;
            transition: all 0.2s ease;
            text-decoration: none;
            border: 3px solid white;
        }
        .floating-emergency:hover { transform: scale(1.08); }
        .floating-emergency::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(220, 38, 38, 0.3);
            animation: emergency-pulse 2s infinite;
            z-index: -1;
        }
        @keyframes emergency-pulse {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 360px) {
            .nav-item { padding: 6px 8px; min-width: 48px; }
            .nav-item i { font-size: 18px; }
            .nav-item span { font-size: 9px; }
        }
        @media (min-width: 768px) {
            .bottom-nav { display: none; }
            .floating-emergency { bottom: 24px; right: 24px; width: 64px; height: 64px; font-size: 26px; }
        }
        
        main { padding-bottom: 100px; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: var(--primary-light); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <a href="/premium" class="flex items-center space-x-3">
                    <div class="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center shadow-md">
                        <i class="fas fa-plus text-white text-lg"></i>
                    </div>
                    <span class="text-xl font-bold text-gray-800">SelectCare<span class="text-gold">OS</span>™</span>
                </a>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/premium" class="text-gray-600 hover:text-primary transition">Home</a>
                    <a href="/services" class="text-gray-600 hover:text-primary transition">Services</a>
                    <a href="/doctors" class="text-primary font-semibold">Doctors</a>
                    <a href="/booking" class="text-gray-600 hover:text-primary transition">Book Now</a>
                    <a href="/patient-dashboard" class="btn-coral text-white px-5 py-2 rounded-lg text-sm">
                        <i class="fas fa-user-md mr-2"></i>Patient Portal
                    </a>
                </div>
                <button class="md:hidden text-gray-600 p-2">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-bg text-white py-20">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center">
                <!-- Trust Badges -->
                <div class="flex justify-center gap-3 mb-6 flex-wrap">
                    <div class="badge-german backdrop-blur-sm px-5 py-2 rounded-full inline-flex items-center space-x-2">
                        <i class="fas fa-shield-alt"></i>
                        <span class="font-semibold text-sm">German Medical Standards</span>
                    </div>
                    <div class="badge-medical backdrop-blur-sm px-5 py-2 rounded-full text-white inline-flex items-center space-x-2">
                        <i class="fas fa-hospital"></i>
                        <span class="font-semibold text-sm">JCI Accredited</span>
                    </div>
                    <div class="badge-premium backdrop-blur-sm px-5 py-2 rounded-full inline-flex items-center space-x-2">
                        <i class="fas fa-star"></i>
                        <span class="font-semibold text-sm">5-Star Care</span>
                    </div>
                </div>
                
                <!-- Main Headline -->
                <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">
                    World-Class Medical <span class="text-yellow-300">Specialists</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                    German-certified surgeons with 15+ years experience • Personalized care plans • Lifetime follow-up support
                </p>
                
                <!-- Stats Row -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div class="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                        <div class="text-4xl font-bold text-white mb-1" id="doctor-count">0</div>
                        <div class="text-sm text-white/80">Specialists</div>
                    </div>
                    <div class="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                        <div class="text-4xl font-bold text-yellow-300 mb-1" id="spec-count">0</div>
                        <div class="text-sm text-white/80">Specializations</div>
                    </div>
                    <div class="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                        <div class="text-4xl font-bold text-white mb-1">4.9</div>
                        <div class="text-sm text-white/80">Average Rating</div>
                        <div class="flex justify-center gap-0.5 mt-1 text-yellow-400 text-xs">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                        <div class="text-4xl font-bold text-yellow-300 mb-1">16+</div>
                        <div class="text-sm text-white/80">Years Experience</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <main class="max-w-7xl mx-auto px-4 py-12">
        <!-- Search & Filters -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 relative">
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="search" placeholder="Search by name or specialty..." 
                           class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-gray-700">
                </div>
                <select id="specialization-filter" class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white min-w-[200px]">
                    <option value="">All Specializations</option>
                </select>
                <select id="premium-filter" class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white min-w-[160px]">
                    <option value="">All Doctors</option>
                    <option value="true">⭐ Premium Only</option>
                </select>
                <button onclick="document.getElementById('search').value=''; document.getElementById('specialization-filter').value=''; document.getElementById('premium-filter').value=''; setupFilters();" 
                        class="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition text-gray-600 font-medium">
                    <i class="fas fa-redo mr-2"></i>Reset
                </button>
            </div>
        </div>

        <!-- Doctors Grid -->
        <div id="doctors-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Loading State -->
            <div class="col-span-full text-center py-12">
                <div class="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-gray-500">Loading specialists...</p>
            </div>
        </div>
        
        <!-- CTA Section -->
        <div class="mt-16 gradient-primary rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div class="relative">
                <h2 class="text-3xl font-bold mb-4 text-white">Can't Find Your Specialist?</h2>
                <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                    Book a free consultation and our medical team will match you with the perfect doctor for your needs.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/booking" class="btn-gold px-8 py-4 rounded-xl text-lg inline-flex items-center justify-center">
                        <i class="fas fa-calendar-check mr-2"></i>Book Free Consultation
                    </a>
                    <a href="/medisense" class="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-primary transition inline-flex items-center justify-center">
                        <i class="fas fa-brain mr-2"></i>AI Symptom Checker
                    </a>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center">
                            <i class="fas fa-plus text-white"></i>
                        </div>
                        <span class="text-xl font-bold">SelectCareOS™</span>
                    </div>
                    <p class="text-white/70 text-sm">German medical excellence with Red Sea recovery. Your health transformation journey starts here.</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4 text-white">Quick Links</h4>
                    <ul class="space-y-2 text-white/70 text-sm">
                        <li><a href="/services" class="hover:text-white transition">Our Services</a></li>
                        <li><a href="/doctors" class="hover:text-white transition">Find a Doctor</a></li>
                        <li><a href="/booking" class="hover:text-white transition">Book Consultation</a></li>
                        <li><a href="/patient-dashboard" class="hover:text-white transition">Patient Portal</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4 text-white">Treatments</h4>
                    <ul class="space-y-2 text-white/70 text-sm">
                        <li><a href="/services?category=bariatric" class="hover:text-white transition">Bariatric Surgery</a></li>
                        <li><a href="/services?category=orthopedic" class="hover:text-white transition">Orthopedic</a></li>
                        <li><a href="/services?category=cosmetic" class="hover:text-white transition">Cosmetic Surgery</a></li>
                        <li><a href="/services?category=dental" class="hover:text-white transition">Dental Care</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4 text-white">Contact</h4>
                    <ul class="space-y-2 text-white/70 text-sm">
                        <li><i class="fas fa-phone mr-2"></i>+49 123 456 789</li>
                        <li><i class="fas fa-envelope mr-2"></i>info@selectcareos.com</li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i>Munich, Germany</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
                <p>&copy; 2024 SelectCareOS™. All rights reserved. German Quality • Egyptian Hospitality • Lifetime Care</p>
            </div>
        </div>
    </footer>

    <script>
        let doctors = [];

        document.addEventListener('DOMContentLoaded', async () => {
            await loadDoctors();
            await loadSpecializations();
            setupFilters();
        });

        async function loadDoctors() {
            try {
                const response = await fetch('/api/doctors');
                const data = await response.json();
                if (data.success) {
                    doctors = data.data;
                    document.getElementById('doctor-count').textContent = doctors.length;
                    renderDoctors(doctors);
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('doctors-grid').innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">Unable to load doctors. Please try again.</div>';
            }
        }

        async function loadSpecializations() {
            try {
                const response = await fetch('/api/doctors/specializations');
                const data = await response.json();
                if (data.success) {
                    document.getElementById('spec-count').textContent = data.data.length;
                    const select = document.getElementById('specialization-filter');
                    data.data.forEach(spec => {
                        const option = document.createElement('option');
                        option.value = spec;
                        option.textContent = spec;
                        select.appendChild(option);
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        function renderDoctors(docs) {
            const grid = document.getElementById('doctors-grid');
            
            if (docs.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-12"><i class="fas fa-search text-4xl text-gray-300 mb-4"></i><p class="text-gray-500">No doctors found matching your criteria.</p></div>';
                return;
            }
            
            grid.innerHTML = docs.map(doctor => \`
                <div class="doctor-card \${doctor.isPremium ? 'premium-doctor' : ''}" onclick="window.location.href='/doctor/\${doctor.id}'" style="cursor:pointer">
                    \${doctor.isPremium ? '<div class="shimmer-gold text-center py-2 text-xs font-bold text-white uppercase tracking-wider"><i class="fas fa-crown mr-1"></i>Premium Specialist</div>' : ''}
                    <div class="p-6">
                        <!-- Doctor Header -->
                        <div class="flex items-start gap-4 mb-5">
                            <a href="/doctor/\${doctor.id}" class="avatar-ring">
                                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xl font-bold">
                                    \${doctor.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                </div>
                            </a>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <a href="/doctor/\${doctor.id}" class="font-bold text-lg text-gray-800 hover:text-primary transition">\${doctor.name}</a>
                                    \${doctor.isPremium ? '<i class="fas fa-check-circle text-yellow-500" title="Verified Premium"></i>' : ''}
                                </div>
                                <p class="text-primary font-medium text-sm">\${doctor.title}</p>
                                <div class="flex items-center gap-1 mt-1">
                                    <div class="flex text-yellow-400 text-xs">
                                        \${Array(5).fill().map((_, i) => i < Math.floor(doctor.rating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star text-gray-300"></i>').join('')}
                                    </div>
                                    <span class="text-sm font-semibold text-gray-700">\${doctor.rating}</span>
                                    <span class="text-xs text-gray-400">(\${doctor.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Specialization Badge -->
                        <div class="mb-4">
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold badge-german text-white">
                                <i class="fas fa-stethoscope"></i>
                                \${doctor.specialization.split(',')[0]}
                            </span>
                        </div>

                        <!-- Doctor Info -->
                        <div class="space-y-3 mb-5">
                            <div class="flex items-center text-gray-600 text-sm">
                                <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                                    <i class="fas fa-map-marker-alt text-blue-500"></i>
                                </div>
                                <span>\${doctor.location}</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm">
                                <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                                    <i class="fas fa-clock text-green-500"></i>
                                </div>
                                <span>\${doctor.experienceYears} years experience</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm">
                                <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                                    <i class="fas fa-globe text-purple-500"></i>
                                </div>
                                <span>\${doctor.languages.join(', ')}</span>
                            </div>
                        </div>

                        <!-- Pricing & CTA -->
                        <div class="pt-4 border-t border-gray-100">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <span class="text-xs text-gray-500 uppercase tracking-wider">Consultation</span>
                                    <p class="text-2xl font-bold text-primary">€\${doctor.consultationFee}</p>
                                </div>
                                <div class="text-right">
                                    <span class="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        <i class="fas fa-video"></i> Video Available
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <a href="/doctor/\${doctor.id}" class="flex-1 btn-outline py-3 rounded-xl font-semibold flex items-center justify-center text-sm" onclick="event.stopPropagation()">
                                    <i class="fas fa-user mr-2"></i>View Profile
                                </a>
                                <a href="/booking?doctor=\${doctor.id}" class="flex-1 \${doctor.isPremium ? 'btn-gold' : 'btn-primary'} py-3 rounded-xl font-semibold flex items-center justify-center text-sm" onclick="event.stopPropagation()">
                                    <i class="fas fa-calendar-check mr-2"></i>Book
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        function setupFilters() {
            const search = document.getElementById('search');
            const specFilter = document.getElementById('specialization-filter');
            const premiumFilter = document.getElementById('premium-filter');

            const applyFilters = () => {
                const searchTerm = search.value.toLowerCase();
                const spec = specFilter.value;
                const premium = premiumFilter.value;

                const filtered = doctors.filter(d => {
                    const matchSearch = !searchTerm || 
                        d.name.toLowerCase().includes(searchTerm) ||
                        d.specialization.toLowerCase().includes(searchTerm);
                    const matchSpec = !spec || d.specialization.includes(spec);
                    const matchPremium = !premium || d.isPremium === (premium === 'true');
                    return matchSearch && matchSpec && matchPremium;
                });

                renderDoctors(filtered);
            };

            search.addEventListener('input', applyFilters);
            specFilter.addEventListener('change', applyFilters);
            premiumFilter.addEventListener('change', applyFilters);
        }
    </script>
    
    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>
    
    <!-- Bottom Navigation - Healthcare-First (Option A) -->
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/" class="nav-item" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="nav-item" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="nav-item connect-btn" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/care-team" class="nav-item active" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`
}
