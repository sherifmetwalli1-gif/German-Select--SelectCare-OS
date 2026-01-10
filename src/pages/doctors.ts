/**
 * Doctors Page - SelectCareOS™ Branding
 */
import { Context } from 'hono'

export function doctorsPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Doctors - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #F8F6F0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
        }
        
        .gradient-navy { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%); }
        .bg-navy { background-color: var(--navy); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .bg-gold { background-color: var(--gold); }
        
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,31,63,0.15); border-color: var(--gold); }
        
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
        .nav-item:hover { color: var(--navy); background: rgba(0, 31, 63, 0.05); }
        .nav-item.active { color: var(--gold); background: rgba(201, 162, 39, 0.1); }
        .nav-item i { font-size: 24px; }
        main { padding-bottom: 100px; }
        
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            transition: all 0.3s;
        }
        .btn-gold:hover {
            background: #B8922A;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(201, 162, 39, 0.4);
        }
    </style>
</head>
<body>
    <header class="gradient-navy text-white">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/premium" class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                        <i class="fas fa-plus text-navy text-lg"></i>
                    </div>
                    <span class="text-xl font-bold">SelectCare<span class="text-gold">OS</span>™</span>
                </a>
                <nav class="flex items-center space-x-6">
                    <a href="/doctors" class="text-gold font-semibold">Doctors</a>
                    <a href="/services" class="hover:text-gold transition">Services</a>
                    <a href="/booking" class="hover:text-gold transition">Book Now</a>
                    <a href="/patient-dashboard" class="hover:text-gold transition">Dashboard</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="gradient-navy text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold mb-4">Our Medical <span class="text-gold">Specialists</span></h1>
            <p class="text-xl text-white/70 max-w-2xl mx-auto">
                World-class German-certified doctors ready to provide exceptional care
            </p>
        </div>
    </section>

    <main class="container mx-auto px-4 py-12">
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-transparent hover:border-gold transition">
                <div class="text-3xl font-bold text-navy" id="doctor-count">0</div>
                <div class="text-gray-500">Specialists</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-transparent hover:border-gold transition">
                <div class="text-3xl font-bold text-gold" id="spec-count">0</div>
                <div class="text-gray-500">Specializations</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-transparent hover:border-gold transition">
                <div class="text-3xl font-bold text-navy">4.83</div>
                <div class="text-gray-500">Avg. Rating</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-transparent hover:border-gold transition">
                <div class="text-3xl font-bold text-gold">16+</div>
                <div class="text-gray-500">Years Experience</div>
            </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8">
            <input type="text" id="search" placeholder="Search doctors..." class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold w-64 transition">
            <select id="specialization-filter" class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold transition">
                <option value="">All Specializations</option>
            </select>
            <select id="premium-filter" class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold transition">
                <option value="">All Doctors</option>
                <option value="true">Premium Only</option>
            </select>
        </div>

        <!-- Doctors Grid -->
        <div id="doctors-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loaded dynamically -->
        </div>
    </main>

    <footer class="bg-navy text-white py-8 mt-16">
        <div class="container mx-auto px-4 text-center">
            <p class="text-white/60">&copy; 2024 SelectCareOS™. All rights reserved.</p>
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
            grid.innerHTML = docs.map(doctor => \`
                <div class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-4">
                                <div class="bg-gold/10 p-4 rounded-full">
                                    <i class="fas fa-user-md text-gold text-2xl"></i>
                                </div>
                                <div>
                                    <div class="flex items-center">
                                        <h3 class="font-bold text-gray-800">\${doctor.name}</h3>
                                        \${doctor.isPremium ? '<i class="fas fa-crown text-yellow-500 ml-2" title="Premium Doctor"></i>' : ''}
                                    </div>
                                    <p class="text-gray-500 text-sm">\${doctor.title}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex items-center text-gray-600 text-sm">
                                <i class="fas fa-stethoscope w-5 mr-2 text-gold"></i>
                                <span>\${doctor.specialization.split(',')[0]}</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm">
                                <i class="fas fa-map-marker-alt w-5 mr-2 text-red-500"></i>
                                <span>\${doctor.location}</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm">
                                <i class="fas fa-clock w-5 mr-2 text-green-500"></i>
                                <span>\${doctor.experienceYears} years experience</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm">
                                <i class="fas fa-globe w-5 mr-2 text-purple-500"></i>
                                <span>\${doctor.languages.join(', ')}</span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t">
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-400 mr-1"></i>
                                <span class="font-semibold">\${doctor.rating}</span>
                                <span class="text-gray-400 text-sm ml-1">(\${doctor.reviewCount})</span>
                            </div>
                            <div class="text-right">
                                <p class="text-xl font-bold text-gray-800">€\${doctor.consultationFee}</p>
                                <p class="text-gray-400 text-xs">per consultation</p>
                            </div>
                        </div>

                        <a href="/booking?doctor=\${doctor.id}" class="mt-4 w-full btn-gold py-3 rounded-xl font-semibold flex items-center justify-center">
                            <i class="fas fa-calendar-plus mr-2"></i>Book Consultation
                        </a>
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
    
    <!-- Bottom Navigation - Icons Only -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/premium" class="nav-item" title="Home">
                <i class="fas fa-home text-2xl"></i>
            </a>
            <a href="/services" class="nav-item" title="Treatments">
                <i class="fas fa-procedures text-2xl"></i>
            </a>
            <a href="/doctors" class="nav-item active" title="Doctors">
                <i class="fas fa-user-md text-2xl"></i>
            </a>
            <a href="/booking" class="nav-item" title="Book">
                <i class="fas fa-calendar-plus text-2xl"></i>
            </a>
            <a href="/patient-dashboard" class="nav-item" title="Profile">
                <i class="fas fa-user text-2xl"></i>
            </a>
        </div>
    </nav>
</body>
</html>`
}
