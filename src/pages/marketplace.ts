/**
 * SelectCareOS™ Smart Health Marketplace
 * Commission-Based Partner Monetization
 */

export const MARKETPLACE_PRODUCTS = {
  categories: [
    { id: 'devices', name: 'Health Devices', icon: 'heartbeat', commission: 15 },
    { id: 'supplements', name: 'Supplements', icon: 'pills', commission: 20 },
    { id: 'fitness', name: 'Fitness Gear', icon: 'dumbbell', commission: 12 },
    { id: 'wellness', name: 'Wellness', icon: 'spa', commission: 18 },
    { id: 'nutrition', name: 'Nutrition', icon: 'apple-alt', commission: 15 },
    { id: 'skincare', name: 'Skincare', icon: 'pump-soap', commission: 22 },
  ],
  featured: [
    { id: 'selecttech-watch', name: 'SelectTech Pro Watch', price: 299, originalPrice: 399, category: 'devices', rating: 4.9, reviews: 1247, image: 'watch', badge: 'BESTSELLER' },
    { id: 'bp-monitor', name: 'Smart Blood Pressure Monitor', price: 89, originalPrice: 129, category: 'devices', rating: 4.8, reviews: 892, image: 'bp' },
    { id: 'smart-scale', name: 'Body Composition Scale', price: 79, originalPrice: 99, category: 'devices', rating: 4.7, reviews: 654, image: 'scale' },
    { id: 'vitamin-d', name: 'Premium Vitamin D3+K2', price: 29, originalPrice: 39, category: 'supplements', rating: 4.9, reviews: 2341, image: 'vitamin' },
    { id: 'omega3', name: 'Ultra Omega-3 Fish Oil', price: 34, originalPrice: 49, category: 'supplements', rating: 4.8, reviews: 1876, image: 'omega' },
    { id: 'collagen', name: 'Marine Collagen Peptides', price: 45, originalPrice: 59, category: 'skincare', rating: 4.9, reviews: 1432, image: 'collagen', badge: 'NEW' },
  ],
};

export const marketplacePage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Marketplace - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --gold: #C9A227;
            --cream: #F8F6F0;
        }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--cream); padding-bottom: 100px; }
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08); overflow: hidden; }
        .product-card:hover { transform: translateY(-4px); transition: transform 0.2s; }
        .category-pill { padding: 10px 20px; border-radius: 25px; white-space: nowrap; transition: all 0.2s; }
        .category-pill.active { background: var(--gold); color: var(--navy); }
        .category-pill:not(.active) { background: white; color: var(--navy); }
        .badge-sale { background: #EF4444; color: white; }
        .badge-new { background: #10B981; color: white; }
        .badge-bestseller { background: var(--gold); color: var(--navy); }
        .price-strike { text-decoration: line-through; color: #9CA3AF; }
        .cart-badge { position: absolute; top: -8px; right: -8px; background: #EF4444; color: white; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; display: flex; align-items: center; justify-content: center; }
        .rating-stars { color: #FBBF24; }
        .search-input { background: white; border: none; padding: 14px 20px 14px 50px; border-radius: 30px; width: 100%; font-size: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="bg-navy px-5 pt-12 pb-6">
        <div class="flex justify-between items-center mb-4">
            <a href="/" class="text-gold"><i class="fas fa-arrow-left"></i></a>
            <h1 class="text-white text-lg font-bold">Health Marketplace</h1>
            <div class="relative">
                <button class="text-white text-xl"><i class="fas fa-shopping-cart"></i></button>
                <span class="cart-badge">3</span>
            </div>
        </div>
        
        <!-- Search -->
        <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder="Search products..." class="search-input">
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Categories -->
        <div class="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
            <button class="category-pill active flex-shrink-0">
                <i class="fas fa-th-large mr-2"></i>All
            </button>
            <button class="category-pill flex-shrink-0">
                <i class="fas fa-heartbeat mr-2"></i>Devices
            </button>
            <button class="category-pill flex-shrink-0">
                <i class="fas fa-pills mr-2"></i>Supplements
            </button>
            <button class="category-pill flex-shrink-0">
                <i class="fas fa-dumbbell mr-2"></i>Fitness
            </button>
            <button class="category-pill flex-shrink-0">
                <i class="fas fa-spa mr-2"></i>Wellness
            </button>
            <button class="category-pill flex-shrink-0">
                <i class="fas fa-pump-soap mr-2"></i>Skincare
            </button>
        </div>
        
        <!-- Featured Banner -->
        <div class="card bg-gradient-to-r from-navy to-blue-800 p-6 text-white">
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-xs bg-gold text-navy px-2 py-1 rounded-full font-bold">EXCLUSIVE</span>
                    <h2 class="text-2xl font-bold mt-2">SelectTech Pro Bundle</h2>
                    <p class="text-white/70 text-sm mt-1">Watch + Scale + BP Monitor</p>
                    <div class="mt-3">
                        <span class="text-gold text-2xl font-bold">€399</span>
                        <span class="price-strike ml-2">€597</span>
                        <span class="text-green-400 text-sm ml-2">Save 33%</span>
                    </div>
                    <button class="mt-4 bg-gold text-navy px-6 py-2 rounded-full font-bold">Shop Now</button>
                </div>
                <div class="text-6xl opacity-30">
                    <i class="fas fa-watch"></i>
                </div>
            </div>
        </div>
        
        <!-- SelectPoints Banner -->
        <div class="card p-4 bg-gradient-to-r from-gold/10 to-yellow-100 border border-gold/30">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <i class="fas fa-coins text-navy"></i>
                </div>
                <div class="flex-1">
                    <p class="font-bold text-navy">Earn 5% back in SelectPoints</p>
                    <p class="text-sm text-gray-600">On every purchase. Use points for future orders!</p>
                </div>
            </div>
        </div>
        
        <!-- Doctor Recommended -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-user-md text-gold mr-2"></i>Doctor Recommended
                </h2>
                <a href="/marketplace/recommended" class="text-gold text-sm">See All</a>
            </div>
            
            <div class="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
                <!-- Product Card 1 -->
                <div class="card flex-shrink-0 w-44 product-card">
                    <div class="relative">
                        <div class="h-36 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <i class="fas fa-watch text-blue-600 text-5xl"></i>
                        </div>
                        <span class="absolute top-2 left-2 text-xs px-2 py-1 rounded-full badge-bestseller font-bold">BESTSELLER</span>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm line-clamp-2">SelectTech Pro Watch</h3>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span class="text-xs text-gray-500">(1,247)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <div>
                                <span class="font-bold text-navy">€299</span>
                                <span class="price-strike text-xs ml-1">€399</span>
                            </div>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Product Card 2 -->
                <div class="card flex-shrink-0 w-44 product-card">
                    <div class="relative">
                        <div class="h-36 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                            <i class="fas fa-heartbeat text-red-600 text-5xl"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm line-clamp-2">Blood Pressure Monitor</h3>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                            <span class="text-xs text-gray-500">(892)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <div>
                                <span class="font-bold text-navy">€89</span>
                                <span class="price-strike text-xs ml-1">€129</span>
                            </div>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Product Card 3 -->
                <div class="card flex-shrink-0 w-44 product-card">
                    <div class="relative">
                        <div class="h-36 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                            <i class="fas fa-weight text-green-600 text-5xl"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm line-clamp-2">Body Composition Scale</h3>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span class="text-xs text-gray-500">(654)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <div>
                                <span class="font-bold text-navy">€79</span>
                                <span class="price-strike text-xs ml-1">€99</span>
                            </div>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Supplements Section -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-pills text-gold mr-2"></i>Premium Supplements
                </h2>
                <a href="/marketplace/supplements" class="text-gold text-sm">See All</a>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <!-- Supplement 1 -->
                <div class="card product-card">
                    <div class="relative">
                        <div class="h-32 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                            <i class="fas fa-sun text-yellow-600 text-4xl"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm">Vitamin D3+K2</h3>
                        <p class="text-xs text-gray-500">90 capsules</p>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span class="text-xs text-gray-500">(2,341)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€29</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Supplement 2 -->
                <div class="card product-card">
                    <div class="relative">
                        <div class="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <i class="fas fa-fish text-blue-600 text-4xl"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm">Omega-3 Fish Oil</h3>
                        <p class="text-xs text-gray-500">120 softgels</p>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                            <span class="text-xs text-gray-500">(1,876)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€34</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Supplement 3 -->
                <div class="card product-card">
                    <div class="relative">
                        <div class="h-32 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                            <i class="fas fa-gem text-pink-600 text-4xl"></i>
                        </div>
                        <span class="absolute top-2 left-2 text-xs px-2 py-1 rounded-full badge-new font-bold">NEW</span>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm">Marine Collagen</h3>
                        <p class="text-xs text-gray-500">300g powder</p>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span class="text-xs text-gray-500">(1,432)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€45</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Supplement 4 -->
                <div class="card product-card">
                    <div class="relative">
                        <div class="h-32 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                            <i class="fas fa-leaf text-green-600 text-4xl"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-bold text-navy text-sm">Magnesium Complex</h3>
                        <p class="text-xs text-gray-500">60 tablets</p>
                        <div class="flex items-center gap-1 my-1">
                            <span class="rating-stars text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span class="text-xs text-gray-500">(987)</span>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€24</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Subscription Boxes -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-box-open text-gold mr-2"></i>Monthly Wellness Boxes
            </h2>
            
            <div class="space-y-4">
                <div class="card p-4 border-2 border-gold">
                    <div class="flex items-center gap-4">
                        <div class="w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center">
                            <i class="fas fa-crown text-white text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-navy">SelectWellness Premium</h3>
                            <p class="text-sm text-gray-500">Curated supplements + devices</p>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="font-bold text-gold text-lg">€89/month</span>
                                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">€120+ value</span>
                            </div>
                        </div>
                        <button class="bg-gold text-navy px-4 py-2 rounded-lg font-bold">Subscribe</button>
                    </div>
                </div>
                
                <div class="card p-4">
                    <div class="flex items-center gap-4">
                        <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                            <i class="fas fa-pills text-white text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-navy">Vitamin Essentials</h3>
                            <p class="text-sm text-gray-500">Core daily supplements</p>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="font-bold text-navy text-lg">€49/month</span>
                                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">€65+ value</span>
                            </div>
                        </div>
                        <button class="bg-navy text-white px-4 py-2 rounded-lg font-bold">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="text-center text-gray-400 py-2 px-3">
                <i class="fas fa-home text-xl"></i>
                <p class="text-xs mt-1">Home</p>
            </a>
            <a href="/rewards" class="text-center text-gray-400 py-2 px-3">
                <i class="fas fa-coins text-xl"></i>
                <p class="text-xs mt-1">Rewards</p>
            </a>
            <a href="/marketplace" class="text-center text-gold py-2 px-3">
                <i class="fas fa-store text-xl"></i>
                <p class="text-xs mt-1">Shop</p>
            </a>
            <a href="/profile" class="text-center text-gray-400 py-2 px-3">
                <i class="fas fa-user text-xl"></i>
                <p class="text-xs mt-1">Profile</p>
            </a>
        </div>
    </nav>
</body>
</html>
`;
