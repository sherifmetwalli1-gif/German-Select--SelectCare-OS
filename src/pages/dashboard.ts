/**
 * Dashboard Page
 * Enterprise monetization dashboard for German Select
 */

import { Context } from 'hono'

export function dashboardPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>German Select - Enterprise Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            /* SelectCareOS™ Brand Colors */
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #FAF8F5;
        }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .german-gradient { background: linear-gradient(135deg, #001F3F 0%, #003366 50%, #001530 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,31,63,0.15); }
        .stat-card { background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(201,162,39,0.1); }
        .sidebar { width: 260px; min-height: 100vh; }
        .main-content { margin-left: 260px; padding-bottom: 100px; }
        @media (max-width: 1024px) { .sidebar { display: none; } .main-content { margin-left: 0; } }
        
        /* ════════════════════════════════════════════════════════════════
           UNIFIED BOTTOM NAVIGATION - Healthcare-First (Option A)
           ════════════════════════════════════════════════════════════════ */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 260px;
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
        @media (max-width: 1024px) { .bottom-nav { left: 0; } }
        @media (max-width: 360px) {
            .nav-item { padding: 6px 8px; min-width: 48px; }
            .nav-item i { font-size: 18px; }
            .nav-item span { font-size: 9px; }
        }
        @media (min-width: 768px) {
            .floating-emergency { bottom: 24px; right: 24px; width: 64px; height: 64px; font-size: 26px; }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Sidebar -->
    <aside class="sidebar fixed left-0 top-0 german-gradient text-white p-6 z-50">
        <div class="flex items-center space-x-3 mb-8">
            <i class="fas fa-hospital text-2xl"></i>
            <div>
                <h1 class="text-xl font-bold">German Select</h1>
                <p class="text-xs text-blue-200">Enterprise Platform</p>
            </div>
        </div>
        
        <nav class="space-y-2">
            <a href="/dashboard" class="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
                <i class="fas fa-chart-line w-5"></i>
                <span>Dashboard</span>
            </a>
            <a href="/doctors" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-user-md w-5"></i>
                <span>Doctors</span>
            </a>
            <a href="/booking" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-calendar-check w-5"></i>
                <span>Bookings</span>
            </a>
            <a href="/packages" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-box w-5"></i>
                <span>Packages</span>
            </a>
            <a href="/analytics" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-chart-bar w-5"></i>
                <span>Analytics</span>
            </a>
            <a href="/affiliate" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-handshake w-5"></i>
                <span>Affiliates</span>
            </a>
            <a href="/admin" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <i class="fas fa-cog w-5"></i>
                <span>Admin</span>
            </a>
        </nav>
        
        <div class="mt-8 pt-8 border-t border-white/20">
            <div class="text-xs text-blue-200 mb-2">API Status</div>
            <div class="flex items-center space-x-2">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-sm">All Systems Operational</span>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Enterprise Dashboard</h1>
                <p class="text-gray-600">Welcome back! Here's your business overview.</p>
            </div>
            <div class="flex items-center space-x-4">
                <select id="period-select" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="last_7_days">Last 7 Days</option>
                    <option value="last_30_days" selected>Last 30 Days</option>
                    <option value="last_90_days">Last 90 Days</option>
                </select>
                <button class="text-white px-4 py-2 rounded-lg transition-colors" style="background: linear-gradient(135deg, #C9A227, #B8860B);">
                    <i class="fas fa-download mr-2"></i>Export
                </button>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="stat-card card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Total Revenue</p>
                        <h3 class="text-2xl font-bold text-gray-800" id="total-revenue">€186,543</h3>
                        <p class="text-green-600 text-sm mt-1"><i class="fas fa-arrow-up mr-1"></i>23.5% vs last period</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                        <i class="fas fa-euro-sign text-green-600 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="stat-card card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Total Bookings</p>
                        <h3 class="text-2xl font-bold text-gray-800" id="total-bookings">487</h3>
                        <p class="text-green-600 text-sm mt-1"><i class="fas fa-arrow-up mr-1"></i>18.2% vs last period</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                        <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="stat-card card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Active Patients</p>
                        <h3 class="text-2xl font-bold text-gray-800" id="active-patients">1,247</h3>
                        <p class="text-green-600 text-sm mt-1"><i class="fas fa-arrow-up mr-1"></i>12.8% vs last period</p>
                    </div>
                    <div class="bg-purple-100 p-3 rounded-full">
                        <i class="fas fa-users text-purple-600 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="stat-card card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Conversion Rate</p>
                        <h3 class="text-2xl font-bold text-gray-800" id="conversion-rate">68.5%</h3>
                        <p class="text-green-600 text-sm mt-1"><i class="fas fa-arrow-up mr-1"></i>5.2% vs last period</p>
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-full">
                        <i class="fas fa-percentage text-yellow-600 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Revenue Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Revenue Trend</h3>
                    <div class="flex space-x-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Consultations</span>
                        <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Packages</span>
                    </div>
                </div>
                <canvas id="revenue-chart" height="200"></canvas>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Revenue by Source</h3>
                <canvas id="source-chart" height="200"></canvas>
                <div class="mt-4 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            <span class="text-gray-600">Consultations</span>
                        </div>
                        <span class="font-semibold">€97,400</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            <span class="text-gray-600">Packages</span>
                        </div>
                        <span class="font-semibold">€89,143</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <span class="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                            <span class="text-gray-600">Subscriptions</span>
                        </div>
                        <span class="font-semibold">€2,793</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Performers & Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Top Doctors -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Top Performing Doctors</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-blue-100 p-3 rounded-full mr-4">
                                <i class="fas fa-user-md text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Dr. Friedrich Schmidt</h4>
                                <p class="text-sm text-gray-500">Bariatric Surgery • 67 bookings</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-green-600">€34,500</p>
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                                <span class="text-sm text-gray-500">4.95</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-red-100 p-3 rounded-full mr-4">
                                <i class="fas fa-heartbeat text-red-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Prof. Dr. Michael Richter</h4>
                                <p class="text-sm text-gray-500">Cardiology • 54 bookings</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-green-600">€28,750</p>
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                                <span class="text-sm text-gray-500">4.92</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-green-100 p-3 rounded-full mr-4">
                                <i class="fas fa-procedures text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Dr. Klaus Weber</h4>
                                <p class="text-sm text-gray-500">Plastic Surgery • 48 bookings</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-green-600">€22,500</p>
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                                <span class="text-sm text-gray-500">4.90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
                <div class="space-y-4" id="recent-activity">
                    <div class="flex items-start space-x-4">
                        <div class="bg-green-100 p-2 rounded-full">
                            <i class="fas fa-credit-card text-green-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800">Payment received <span class="font-semibold">€8,500</span></p>
                            <p class="text-sm text-gray-500">SurgeryBridge Package • 5 minutes ago</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="bg-blue-100 p-2 rounded-full">
                            <i class="fas fa-calendar-plus text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800">New consultation booked</p>
                            <p class="text-sm text-gray-500">Dr. Schmidt • 12 minutes ago</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="bg-purple-100 p-2 rounded-full">
                            <i class="fas fa-user-plus text-purple-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800">New patient registered</p>
                            <p class="text-sm text-gray-500">From Germany • 23 minutes ago</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="bg-yellow-100 p-2 rounded-full">
                            <i class="fas fa-star text-yellow-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800">5-star review received</p>
                            <p class="text-sm text-gray-500">Prof. Dr. Richter • 45 minutes ago</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="bg-orange-100 p-2 rounded-full">
                            <i class="fas fa-handshake text-orange-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800">Affiliate conversion</p>
                            <p class="text-sm text-gray-500">€542 commission earned • 1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Platform Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 class="text-lg font-semibold mb-4">Platform Fees</h3>
                <p class="text-3xl font-bold mb-2">€32,645</p>
                <p class="text-blue-100">17.5% of total revenue</p>
                <div class="mt-4 pt-4 border-t border-white/20">
                    <p class="text-sm text-blue-100">Doctor Payouts: €149,320</p>
                </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <h3 class="text-lg font-semibold mb-4">Lead Generation</h3>
                <p class="text-3xl font-bold mb-2">1,234</p>
                <p class="text-green-100">New leads this month</p>
                <div class="mt-4 pt-4 border-t border-white/20">
                    <p class="text-sm text-green-100">Conversion Rate: 14.7%</p>
                </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 class="text-lg font-semibold mb-4">Premium Subscriptions</h3>
                <p class="text-3xl font-bold mb-2">7</p>
                <p class="text-purple-100">Active premium doctors</p>
                <div class="mt-4 pt-4 border-t border-white/20">
                    <p class="text-sm text-purple-100">MRR: €2,793</p>
                </div>
            </div>
        </div>
    </main>

    <script>
        // Revenue Chart
        const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Consultations',
                        data: [18500, 22400, 26800, 29700],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Packages',
                        data: [15000, 22000, 24500, 27643],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '€' + value.toLocaleString()
                        }
                    }
                }
            }
        });

        // Source Chart
        const sourceCtx = document.getElementById('source-chart').getContext('2d');
        const sourceChart = new Chart(sourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Consultations', 'Packages', 'Subscriptions'],
                datasets: [{
                    data: [97400, 89143, 2793],
                    backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6'],
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                cutout: '70%',
            }
        });

        // Fetch real-time data
        async function fetchDashboardData() {
            try {
                const response = await fetch('/api/analytics/realtime');
                const data = await response.json();
                if (data.success) {
                    // Update metrics if needed
                    console.log('Real-time data:', data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Auto-refresh every 30 seconds
        setInterval(fetchDashboardData, 30000);
        fetchDashboardData();
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
            <a href="/care-team" class="nav-item" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item active" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`
}
