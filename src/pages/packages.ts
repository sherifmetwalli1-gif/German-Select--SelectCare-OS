/**
 * Packages Page
 */
import { Context } from 'hono'

export function packagesPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Care Packages - German Select</title>
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
            --gold-light: #E8D5A3;
            --cream: #FAF8F5;
        }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .german-gradient { background: linear-gradient(135deg, #001F3F 0%, #003366 50%, #001530 100%); }
        .card-hover { transition: all 0.3s ease; border: 1px solid rgba(201,162,39,0.1); }
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
            padding: 8px 12px;
            color: #9CA3AF;
            font-size: 10px;
            text-decoration: none;
            transition: all 0.2s;
        }
        .nav-item:hover { color: var(--navy); }
        .nav-item.active { color: var(--gold); }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        main { padding-bottom: 100px; }
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
                    <a href="/doctors" class="hover:text-blue-200">Doctors</a>
                    <a href="/packages" class="text-white font-semibold">Packages</a>
                    <a href="/booking" class="hover:text-blue-200">Book Now</a>
                    <a href="/dashboard" class="hover:text-blue-200">Dashboard</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="german-gradient text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold mb-4">Premium Care Packages</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">
                German precision meets Egyptian care. Comprehensive medical packages designed for your complete healthcare journey.
            </p>
        </div>
    </section>

    <main class="container mx-auto px-4 py-12">
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8">
            <select id="category-filter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="bariatric">Bariatric Surgery</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="wellness">Wellness</option>
                <option value="diagnostic">Diagnostic</option>
            </select>
            <select id="price-sort" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
            </select>
        </div>

        <!-- Package Grid -->
        <div id="packages-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Loaded dynamically -->
        </div>
    </main>

    <!-- Package Modal -->
    <div id="package-modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div id="modal-content">
                <!-- Populated dynamically -->
            </div>
        </div>
    </div>

    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 German Select. All rights reserved.</p>
        </div>
    </footer>

    <script>
        let packages = [];

        document.addEventListener('DOMContentLoaded', loadPackages);

        async function loadPackages() {
            try {
                const response = await fetch('/api/packages');
                const data = await response.json();
                if (data.success) {
                    packages = data.data;
                    renderPackages(packages);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        function renderPackages(pkgs) {
            const grid = document.getElementById('packages-grid');
            grid.innerHTML = pkgs.map(pkg => \`
                <div class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                    \${pkg.isFeatured ? '<div class="bg-yellow-500 text-white text-center py-1 text-sm font-semibold"><i class="fas fa-star mr-1"></i>Featured</div>' : ''}
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm capitalize">\${pkg.category}</span>
                            <div class="flex items-center text-yellow-500">
                                <i class="fas fa-star mr-1"></i>
                                <span>\${pkg.rating}</span>
                            </div>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">\${pkg.name}</h3>
                        <p class="text-gray-600 text-sm mb-4">\${pkg.shortDescription}</p>
                        
                        <div class="flex items-center text-gray-500 text-sm mb-4">
                            <i class="fas fa-clock mr-2"></i>
                            <span>\${pkg.duration}</span>
                            <span class="mx-2">•</span>
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            <span>\${pkg.location.split('→')[1] || pkg.location}</span>
                        </div>

                        <div class="flex items-center justify-between mb-4">
                            <div>
                                \${pkg.discountPercent ? \`<span class="text-gray-400 line-through text-sm">€\${pkg.basePrice.toLocaleString()}</span>\` : ''}
                                <p class="text-2xl font-bold text-gray-800">€\${pkg.finalPrice.toLocaleString()}</p>
                            </div>
                            \${pkg.discountPercent ? \`<span class="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">\${pkg.discountPercent}% OFF</span>\` : ''}
                        </div>

                        <div class="flex space-x-2">
                            <button onclick="viewPackage('\${pkg.id}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                View Details
                            </button>
                            <button onclick="bookPackage('\${pkg.id}')" class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        function viewPackage(id) {
            const pkg = packages.find(p => p.id === id);
            if (!pkg) return;

            const modal = document.getElementById('package-modal');
            const content = document.getElementById('modal-content');

            content.innerHTML = \`
                <div class="p-6">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm capitalize">\${pkg.category}</span>
                            <h2 class="text-2xl font-bold text-gray-800 mt-2">\${pkg.name}</h2>
                        </div>
                        <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <p class="text-gray-600 mb-6">\${pkg.description}</p>

                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 class="font-semibold text-gray-800 mb-3">What's Included</h3>
                        <div class="grid grid-cols-2 gap-3">
                            \${pkg.inclusions.map(inc => \`
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                    <span class="text-sm">\${inc.name}</span>
                                </div>
                            \`).join('')}
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-6">
                        <div>
                            <p class="text-gray-600 text-sm">Package Price</p>
                            \${pkg.discountPercent ? \`<span class="text-gray-400 line-through">€\${pkg.basePrice.toLocaleString()}</span>\` : ''}
                            <p class="text-3xl font-bold text-gray-800">€\${pkg.finalPrice.toLocaleString()}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-gray-600 text-sm">Duration</p>
                            <p class="font-semibold">\${pkg.duration}</p>
                        </div>
                    </div>

                    <button onclick="bookPackage('\${pkg.id}')" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Book This Package
                    </button>
                </div>
            \`;

            modal.classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('package-modal').classList.add('hidden');
        }

        function bookPackage(id) {
            window.location.href = '/booking?package=' + id;
        }

        // Filter functionality
        document.getElementById('category-filter').addEventListener('change', (e) => {
            const filtered = e.target.value 
                ? packages.filter(p => p.category === e.target.value)
                : packages;
            renderPackages(filtered);
        });

        // Close modal on outside click
        document.getElementById('package-modal').addEventListener('click', (e) => {
            if (e.target.id === 'package-modal') closeModal();
        });
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/packages" class="nav-item active">
                <i class="fas fa-box"></i>
                <span>Packages</span>
            </a>
            <a href="/booking" class="nav-item">
                <i class="fas fa-calendar-plus"></i>
                <span>Book</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`
}
