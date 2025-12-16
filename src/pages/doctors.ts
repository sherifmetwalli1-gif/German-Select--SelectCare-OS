/**
 * Doctors Page
 */
import { Context } from 'hono'

export function doctorsPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Doctors - German Select</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .german-gradient { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    </style>
</head>
<body class="bg-gray-50">
    <header class="german-gradient text-white">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/dashboard" class="flex items-center space-x-3">
                    <i class="fas fa-hospital text-2xl"></i>
                    <span class="text-xl font-bold">German Select</span>
                </a>
                <nav class="flex items-center space-x-6">
                    <a href="/doctors" class="text-white font-semibold">Doctors</a>
                    <a href="/packages" class="hover:text-blue-200">Packages</a>
                    <a href="/booking" class="hover:text-blue-200">Book Now</a>
                    <a href="/dashboard" class="hover:text-blue-200">Dashboard</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="german-gradient text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold mb-4">German Medical Specialists</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">
                World-class German-certified doctors ready to provide exceptional care
            </p>
        </div>
    </section>

    <main class="container mx-auto px-4 py-12">
        <!-- Stats -->
        <div class="grid grid-cols-4 gap-6 mb-12">
            <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                <div class="text-3xl font-bold text-blue-600" id="doctor-count">0</div>
                <div class="text-gray-500">Specialists</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                <div class="text-3xl font-bold text-green-600" id="spec-count">0</div>
                <div class="text-gray-500">Specializations</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                <div class="text-3xl font-bold text-yellow-600">4.83</div>
                <div class="text-gray-500">Avg. Rating</div>
            </div>
            <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                <div class="text-3xl font-bold text-purple-600">16+</div>
                <div class="text-gray-500">Years Experience</div>
            </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8">
            <input type="text" id="search" placeholder="Search doctors..." class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64">
            <select id="specialization-filter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Specializations</option>
            </select>
            <select id="premium-filter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Doctors</option>
                <option value="true">Premium Only</option>
            </select>
        </div>

        <!-- Doctors Grid -->
        <div id="doctors-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loaded dynamically -->
        </div>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 German Select. All rights reserved.</p>
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
                                <div class="bg-blue-100 p-4 rounded-full">
                                    <i class="fas fa-user-md text-blue-600 text-2xl"></i>
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
                                <i class="fas fa-stethoscope w-5 mr-2 text-blue-500"></i>
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

                        <a href="/booking?doctor=\${doctor.id}" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
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
</body>
</html>`
}
