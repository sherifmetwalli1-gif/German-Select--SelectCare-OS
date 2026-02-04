/**
 * 🏨 Medical Retreats & Select Hotels Page
 * SelectCareOS™ - German Select Health Platform
 * 
 * Features:
 * - Medically supervised retreat programs
 * - Select partner hotels & resorts
 * - Combined packages with savings
 * - Booking integration
 */

import { Context } from 'hono'

export function retreatsHotelsPage(c: Context): string {
  const tab = c.req.query('tab') || 'retreats'
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Retreats & Hotels - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-soft: #D4AF37;
            --gold-light: #F5E6C8;
            --cream: #FFF8F0;
            --pearl: #FFFDF7;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--cream);
            padding-bottom: 100px;
        }
        
        .german-gradient {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
        }
        
        .gold-gradient {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-soft) 100%);
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(201, 162, 39, 0.1);
            transition: all 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
            border-color: rgba(201, 162, 39, 0.3);
        }
        
        .tab-btn {
            padding: 12px 24px;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.2s;
        }
        
        .tab-btn.active {
            background: var(--gold);
            color: var(--navy);
        }
        
        .tab-btn:not(.active) {
            background: white;
            color: #6B7280;
        }
        
        .tab-btn:not(.active):hover {
            background: #F3F4F6;
        }
        
        .category-pill {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .category-anti-aging { background: #EDE9FE; color: #7C3AED; }
        .category-weight-management { background: #D1FAE5; color: #059669; }
        .category-recovery { background: #FEE2E2; color: #DC2626; }
        .category-mental-wellness { background: #DBEAFE; color: #2563EB; }
        .category-detox { background: #FEF3C7; color: #D97706; }
        .category-fertility { background: #FCE7F3; color: #DB2777; }
        
        .hotel-category-luxury { background: var(--gold-light); color: var(--navy); }
        .hotel-category-ultra-luxury { background: #EDE9FE; color: #7C3AED; }
        .hotel-category-premium { background: #DBEAFE; color: #2563EB; }
        .hotel-category-exclusive { background: linear-gradient(135deg, var(--gold) 0%, #B8860B 100%); color: white; }
        
        .star-rating {
            color: var(--gold);
        }
        
        .price-tag {
            background: var(--navy);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
        }
        
        .savings-badge {
            background: #D1FAE5;
            color: #059669;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 2000;
            overflow-y: auto;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            margin: 40px auto;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
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
        
        @media (min-width: 768px) {
            .bottom-nav { display: none; }
            .floating-emergency { bottom: 24px; right: 24px; width: 64px; height: 64px; font-size: 26px; }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="german-gradient px-4 pt-12 pb-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <a href="/" class="text-xl font-bold text-white">
                    SelectCare<span class="text-gold-soft">OS</span>™
                </a>
                <a href="/booking" class="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition">
                    <i class="fas fa-calendar-plus mr-2"></i>Book Now
                </a>
            </div>
            
            <h1 class="text-3xl font-bold text-white mb-2">
                <i class="fas fa-spa mr-3" style="color: var(--gold-soft)"></i>
                Retreats & Hotels
            </h1>
            <p class="text-white/80">Medically supervised wellness retreats & select partner accommodations</p>
        </div>
    </header>
    
    <!-- Tab Navigation -->
    <div class="sticky top-0 bg-cream/95 backdrop-blur z-50 py-4 px-4 border-b border-gray-200">
        <div class="max-w-7xl mx-auto flex space-x-3 overflow-x-auto hide-scrollbar">
            <button onclick="switchTab('retreats')" class="tab-btn ${tab === 'retreats' ? 'active' : ''}" id="tab-retreats">
                <i class="fas fa-heart-pulse mr-2"></i>Medical Retreats
            </button>
            <button onclick="switchTab('hotels')" class="tab-btn ${tab === 'hotels' ? 'active' : ''}" id="tab-hotels">
                <i class="fas fa-hotel mr-2"></i>Select Hotels
            </button>
            <button onclick="switchTab('packages')" class="tab-btn ${tab === 'packages' ? 'active' : ''}" id="tab-packages">
                <i class="fas fa-gift mr-2"></i>Combined Packages
            </button>
        </div>
    </div>
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- Retreats Section -->
        <section id="section-retreats" class="${tab === 'retreats' ? '' : 'hidden'}">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-navy">Medical Retreats</h2>
                    <p class="text-gray-600">Physician-supervised wellness programs</p>
                </div>
                <select id="retreat-filter" onchange="filterRetreats(this.value)" class="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gold">
                    <option value="">All Categories</option>
                    <option value="anti-aging">Anti-Aging</option>
                    <option value="weight-management">Weight Management</option>
                    <option value="recovery">Recovery</option>
                    <option value="mental-wellness">Mental Wellness</option>
                    <option value="detox">Detox</option>
                    <option value="fertility">Fertility</option>
                </select>
            </div>
            
            <div id="retreats-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Loaded dynamically -->
                <div class="col-span-full flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
                </div>
            </div>
        </section>
        
        <!-- Hotels Section -->
        <section id="section-hotels" class="${tab === 'hotels' ? '' : 'hidden'}">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-navy">Select Hotels & Resorts</h2>
                    <p class="text-gray-600">Partner accommodations optimized for recovery</p>
                </div>
                <select id="hotel-filter" onchange="filterHotels(this.value)" class="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gold">
                    <option value="">All Categories</option>
                    <option value="luxury">Luxury</option>
                    <option value="ultra-luxury">Ultra Luxury</option>
                    <option value="premium">Premium</option>
                    <option value="exclusive">Exclusive</option>
                </select>
            </div>
            
            <div id="hotels-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Loaded dynamically -->
                <div class="col-span-full flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
                </div>
            </div>
        </section>
        
        <!-- Combined Packages Section -->
        <section id="section-packages" class="${tab === 'packages' ? '' : 'hidden'}">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-navy">Combined Packages</h2>
                <p class="text-gray-600">Retreat + accommodation bundles with exclusive savings</p>
            </div>
            
            <div id="packages-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Loaded dynamically -->
                <div class="col-span-full flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
                </div>
            </div>
        </section>
        
    </main>
    
    <!-- Retreat Detail Modal -->
    <div id="retreat-modal" class="modal-overlay">
        <div class="modal-content" id="retreat-modal-content">
            <!-- Dynamic content -->
        </div>
    </div>
    
    <!-- Hotel Detail Modal -->
    <div id="hotel-modal" class="modal-overlay">
        <div class="modal-content" id="hotel-modal-content">
            <!-- Dynamic content -->
        </div>
    </div>
    
    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>
    
    <!-- Bottom Navigation -->
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
            <a href="/doctors" class="nav-item" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    
    <script>
        let retreatsData = [];
        let hotelsData = [];
        let packagesData = [];
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadRetreats();
            loadHotels();
            loadPackages();
        });
        
        // Tab switching
        function switchTab(tab) {
            // Update URL
            const url = new URL(window.location.href);
            url.searchParams.set('tab', tab);
            history.pushState({}, '', url);
            
            // Update tabs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('tab-' + tab).classList.add('active');
            
            // Update sections
            document.querySelectorAll('[id^="section-"]').forEach(section => section.classList.add('hidden'));
            document.getElementById('section-' + tab).classList.remove('hidden');
        }
        
        // Load Retreats
        async function loadRetreats(category = '') {
            try {
                const url = category ? '/api/retreats?category=' + category : '/api/retreats';
                const res = await fetch(url);
                const data = await res.json();
                
                if (data.success) {
                    retreatsData = data.data;
                    renderRetreats(retreatsData);
                }
            } catch (err) {
                console.error('Error loading retreats:', err);
                document.getElementById('retreats-grid').innerHTML = '<p class="text-red-500 col-span-full text-center">Failed to load retreats</p>';
            }
        }
        
        function filterRetreats(category) {
            loadRetreats(category);
        }
        
        function renderRetreats(retreats) {
            const grid = document.getElementById('retreats-grid');
            
            if (retreats.length === 0) {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No retreats found</p>';
                return;
            }
            
            grid.innerHTML = retreats.map(retreat => \`
                <div class="card overflow-hidden cursor-pointer" onclick="showRetreatDetail('\${retreat.id}')">
                    <div class="h-48 bg-gradient-to-br from-navy/20 to-gold/20 relative">
                        <img src="\${retreat.image}" alt="\${retreat.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                        <div class="absolute top-4 left-4">
                            <span class="category-pill category-\${retreat.category}">\${formatCategory(retreat.category)}</span>
                        </div>
                        \${retreat.popular ? '<div class="absolute top-4 right-4 bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>' : ''}
                    </div>
                    <div class="p-5">
                        <h3 class="font-bold text-lg text-navy mb-1">\${retreat.name}</h3>
                        <p class="text-sm text-gold-soft font-medium mb-2">\${retreat.tagline}</p>
                        <p class="text-sm text-gray-600 mb-3 line-clamp-2">\${retreat.description}</p>
                        
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-sm text-gray-500">
                                <i class="fas fa-calendar-day mr-1"></i>\${retreat.duration.nights} nights
                            </span>
                            <span class="text-sm text-gray-500">
                                <i class="fas fa-user-md mr-1"></i>\${retreat.medicalSupervision.split('+')[0].trim()}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-xl font-bold text-navy">€\${retreat.priceRange.min.toLocaleString()}</span>
                                <span class="text-sm text-gray-400"> - €\${retreat.priceRange.max.toLocaleString()}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-star text-gold mr-1"></i>
                                <span class="font-semibold">\${retreat.rating}</span>
                                <span class="text-gray-400 text-sm ml-1">(\${retreat.reviewCount})</span>
                            </div>
                        </div>
                    </div>
                </div>
            \`).join('');
        }
        
        // Load Hotels
        async function loadHotels(category = '') {
            try {
                const url = category ? '/api/hotels?category=' + category : '/api/hotels';
                const res = await fetch(url);
                const data = await res.json();
                
                if (data.success) {
                    hotelsData = data.data;
                    renderHotels(hotelsData);
                }
            } catch (err) {
                console.error('Error loading hotels:', err);
                document.getElementById('hotels-grid').innerHTML = '<p class="text-red-500 col-span-full text-center">Failed to load hotels</p>';
            }
        }
        
        function filterHotels(category) {
            loadHotels(category);
        }
        
        function renderHotels(hotels) {
            const grid = document.getElementById('hotels-grid');
            
            if (hotels.length === 0) {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No hotels found</p>';
                return;
            }
            
            grid.innerHTML = hotels.map(hotel => \`
                <div class="card overflow-hidden cursor-pointer" onclick="showHotelDetail('\${hotel.id}')">
                    <div class="h-48 bg-gradient-to-br from-navy/20 to-gold/20 relative">
                        <img src="\${hotel.image}" alt="\${hotel.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                        <div class="absolute top-4 left-4">
                            <span class="category-pill hotel-category-\${hotel.category}">\${formatCategory(hotel.category)}</span>
                        </div>
                        \${hotel.popular ? '<div class="absolute top-4 right-4 bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">RECOMMENDED</div>' : ''}
                    </div>
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-2">
                            <h3 class="font-bold text-lg text-navy">\${hotel.name}</h3>
                            <span class="star-rating text-sm">\${'★'.repeat(hotel.starRating)}</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-2">
                            <i class="fas fa-map-marker-alt mr-1"></i>\${hotel.location}
                            <span class="mx-2">•</span>
                            <i class="fas fa-hospital mr-1"></i>\${hotel.distanceToClinic} to clinic
                        </p>
                        <p class="text-sm text-gray-600 mb-3 line-clamp-2">\${hotel.description}</p>
                        
                        <div class="flex flex-wrap gap-1 mb-3">
                            \${hotel.features.slice(0, 4).map(f => \`
                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">\${f}</span>
                            \`).join('')}
                            \${hotel.features.length > 4 ? \`<span class="text-xs text-gold font-medium">+\${hotel.features.length - 4} more</span>\` : ''}
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-sm text-gray-400">from</span>
                                <span class="text-xl font-bold text-navy ml-1">€\${hotel.pricePerNight.min}</span>
                                <span class="text-sm text-gray-400">/night</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-star text-gold mr-1"></i>
                                <span class="font-semibold">\${hotel.rating}</span>
                                <span class="text-gray-400 text-sm ml-1">(\${hotel.reviewCount})</span>
                            </div>
                        </div>
                    </div>
                </div>
            \`).join('');
        }
        
        // Load Combined Packages
        async function loadPackages() {
            try {
                const res = await fetch('/api/retreat-packages');
                const data = await res.json();
                
                if (data.success) {
                    packagesData = data.data;
                    renderPackages(packagesData);
                }
            } catch (err) {
                console.error('Error loading packages:', err);
                document.getElementById('packages-grid').innerHTML = '<p class="text-red-500 col-span-full text-center">Failed to load packages</p>';
            }
        }
        
        function renderPackages(packages) {
            const grid = document.getElementById('packages-grid');
            
            if (packages.length === 0) {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No packages available</p>';
                return;
            }
            
            grid.innerHTML = packages.map(pkg => \`
                <div class="card overflow-hidden cursor-pointer border-2 border-gold/30" onclick="showPackageDetail('\${pkg.id}')">
                    <div class="bg-gradient-to-r from-navy to-navy-light p-4">
                        <span class="savings-badge mb-2 inline-block">
                            <i class="fas fa-tag mr-1"></i>Save €\${pkg.savings.toLocaleString()}
                        </span>
                        <h3 class="font-bold text-xl text-white">\${pkg.name}</h3>
                        <p class="text-gold-soft text-sm">\${pkg.description}</p>
                    </div>
                    <div class="p-5">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                                <i class="fas fa-heart-pulse text-gold text-xl"></i>
                            </div>
                            <div>
                                <p class="font-semibold text-navy">\${pkg.retreat?.name || 'Retreat'}</p>
                                <p class="text-sm text-gray-500">\${pkg.duration.nights} nights program</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                                <i class="fas fa-hotel text-gold text-xl"></i>
                            </div>
                            <div>
                                <p class="font-semibold text-navy">\${pkg.hotel?.name || 'Hotel'}</p>
                                <p class="text-sm text-gray-500">\${pkg.hotel?.starRating || 5}★ \${pkg.hotel?.location || ''}</p>
                            </div>
                        </div>
                        
                        <div class="border-t pt-4 flex items-center justify-between">
                            <div>
                                <span class="text-sm text-gray-400">Package Price</span>
                                <div>
                                    <span class="text-2xl font-bold text-navy">€\${pkg.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <button class="gold-gradient text-navy px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                                Book Package
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }
        
        // Show Retreat Detail
        async function showRetreatDetail(id) {
            const retreat = retreatsData.find(r => r.id === id);
            if (!retreat) return;
            
            const modal = document.getElementById('retreat-modal');
            const content = document.getElementById('retreat-modal-content');
            
            content.innerHTML = \`
                <div class="relative">
                    <div class="h-64 bg-gradient-to-br from-navy to-navy-light relative">
                        <img src="\${retreat.image}" alt="\${retreat.name}" class="w-full h-full object-cover opacity-60" onerror="this.style.display='none'">
                        <div class="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                        <button onclick="closeModal('retreat-modal')" class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="absolute bottom-6 left-6 right-6">
                            <span class="category-pill category-\${retreat.category} mb-2">\${formatCategory(retreat.category)}</span>
                            <h2 class="text-3xl font-bold text-white">\${retreat.name}</h2>
                            <p class="text-gold-soft">\${retreat.tagline}</p>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="grid md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-calendar-day text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">\${retreat.duration.nights} Nights</p>
                                <p class="text-sm text-gray-500">\${retreat.duration.days} Days</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-user-md text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">24/7 Medical</p>
                                <p class="text-sm text-gray-500">Supervision</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-star text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">\${retreat.rating} Rating</p>
                                <p class="text-sm text-gray-500">\${retreat.reviewCount} reviews</p>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">About This Retreat</h3>
                            <p class="text-gray-600">\${retreat.description}</p>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">Program Highlights</h3>
                            <div class="grid md:grid-cols-2 gap-2">
                                \${retreat.highlights.map(h => \`
                                    <div class="flex items-start gap-2">
                                        <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                        <span class="text-gray-600">\${h}</span>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">What's Included</h3>
                            <div class="flex flex-wrap gap-2">
                                \${retreat.inclusions.map(i => \`
                                    <span class="bg-gold/10 text-navy px-3 py-1 rounded-full text-sm">\${i}</span>
                                \`).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">Accommodation</h3>
                            <p class="text-gray-600"><i class="fas fa-hotel text-gold mr-2"></i>\${retreat.accommodation}</p>
                        </div>
                        
                        <div class="bg-navy/5 p-6 rounded-xl">
                            <div class="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p class="text-sm text-gray-500">Starting from</p>
                                    <p class="text-3xl font-bold text-navy">€\${retreat.priceRange.min.toLocaleString()}</p>
                                    <p class="text-sm text-gray-500">up to €\${retreat.priceRange.max.toLocaleString()}</p>
                                </div>
                                <div class="flex gap-3">
                                    <a href="/booking?retreat=\${retreat.id}" class="gold-gradient text-navy px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition inline-block">
                                        <i class="fas fa-calendar-plus mr-2"></i>Book Now
                                    </a>
                                    <a href="/instant-connect" class="bg-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-600 transition inline-block">
                                        <i class="fas fa-video mr-2"></i>Consult First
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        // Show Hotel Detail
        function showHotelDetail(id) {
            const hotel = hotelsData.find(h => h.id === id);
            if (!hotel) return;
            
            const modal = document.getElementById('hotel-modal');
            const content = document.getElementById('hotel-modal-content');
            
            content.innerHTML = \`
                <div class="relative">
                    <div class="h-64 bg-gradient-to-br from-navy to-navy-light relative">
                        <img src="\${hotel.image}" alt="\${hotel.name}" class="w-full h-full object-cover opacity-60" onerror="this.style.display='none'">
                        <div class="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                        <button onclick="closeModal('hotel-modal')" class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="absolute bottom-6 left-6 right-6">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="category-pill hotel-category-\${hotel.category}">\${formatCategory(hotel.category)}</span>
                                <span class="text-gold text-lg">\${'★'.repeat(hotel.starRating)}</span>
                            </div>
                            <h2 class="text-3xl font-bold text-white">\${hotel.name}</h2>
                            <p class="text-white/80"><i class="fas fa-map-marker-alt mr-2"></i>\${hotel.location}</p>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="grid md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-hospital text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">\${hotel.distanceToClinic}</p>
                                <p class="text-sm text-gray-500">to clinic</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-star text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">\${hotel.rating} Rating</p>
                                <p class="text-sm text-gray-500">\${hotel.reviewCount} reviews</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-xl text-center">
                                <i class="fas fa-bed text-gold text-2xl mb-2"></i>
                                <p class="font-bold text-navy">\${hotel.roomTypes.length} Room Types</p>
                                <p class="text-sm text-gray-500">available</p>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">About This Hotel</h3>
                            <p class="text-gray-600">\${hotel.description}</p>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">Features & Amenities</h3>
                            <div class="flex flex-wrap gap-2">
                                \${hotel.features.map(f => \`
                                    <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">\${f}</span>
                                \`).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">Medical Amenities</h3>
                            <div class="grid md:grid-cols-2 gap-2">
                                \${hotel.medicalAmenities.map(a => \`
                                    <div class="flex items-start gap-2">
                                        <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                                        <span class="text-gray-600">\${a}</span>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-bold text-navy mb-3">Room Types</h3>
                            <div class="space-y-3">
                                \${hotel.roomTypes.map(room => \`
                                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p class="font-semibold text-navy">\${room.type}</p>
                                            <p class="text-sm text-gray-500">\${room.size}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-bold text-navy">€\${room.price}</p>
                                            <p class="text-sm text-gray-500">per night</p>
                                        </div>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-navy/5 p-6 rounded-xl">
                            <div class="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p class="text-sm text-gray-500">Starting from</p>
                                    <p class="text-3xl font-bold text-navy">€\${hotel.pricePerNight.min}</p>
                                    <p class="text-sm text-gray-500">per night</p>
                                </div>
                                <a href="/booking?hotel=\${hotel.id}" class="gold-gradient text-navy px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition inline-block">
                                    <i class="fas fa-calendar-plus mr-2"></i>Reserve Room
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        // Show Package Detail
        function showPackageDetail(id) {
            const pkg = packagesData.find(p => p.id === id);
            if (!pkg) return;
            
            // For simplicity, redirect to booking
            window.location.href = '/booking?package=' + id + '&type=retreat-package';
        }
        
        // Close Modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = '';
        }
        
        // Close modal on overlay click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Format category
        function formatCategory(category) {
            return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
    </script>
</body>
</html>`;
}
