/**
 * Admin Dashboard Page
 * Enterprise-grade administration portal
 */

import type { Context } from 'hono'

export const adminPage = (c: Context) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - German Select Enterprise Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #FAF8F5;
        }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .gradient-header { background: linear-gradient(135deg, #001F3F 0%, #003366 100%); }
        .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid rgba(201,162,39,0.1); }
        .stat-card { transition: transform 0.2s; }
        .stat-card:hover { transform: translateY(-2px); }
        .sidebar { background: linear-gradient(180deg, #001F3F 0%, #001530 100%); }
        .menu-item { transition: all 0.2s; }
        .menu-item:hover { background: rgba(201, 162, 39, 0.15); }
        .menu-item.active { background: rgba(201, 162, 39, 0.25); border-left: 3px solid #C9A227; }
        .data-table tr:hover { background: #f8fafc; }
        .badge { padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 500; }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 256px;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(12px, env(safe-area-inset-bottom));
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
        .nav-item i { font-size: 20px; margin-bottom: 4px; }
        
        @media (max-width: 768px) {
            .bottom-nav { left: 0; }
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="flex">
        <!-- Sidebar -->
        <aside class="sidebar w-64 min-h-screen text-white fixed left-0 top-0">
            <div class="p-6 border-b border-gray-700">
                <h1 class="text-xl font-bold flex items-center">
                    <i class="fas fa-hospital-alt mr-3 text-blue-400"></i>
                    German Select
                </h1>
                <p class="text-xs text-gray-400 mt-1">Admin Portal v2.0</p>
            </div>
            
            <nav class="p-4 space-y-2">
                <a href="/admin" class="menu-item active flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-tachometer-alt w-5 mr-3"></i> Dashboard
                </a>
                <a href="#users" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-users w-5 mr-3"></i> Users
                </a>
                <a href="#doctors" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-user-md w-5 mr-3"></i> Doctors
                </a>
                <a href="#bookings" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-calendar-check w-5 mr-3"></i> Bookings
                </a>
                <a href="#packages" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-box w-5 mr-3"></i> Packages
                </a>
                <a href="#payments" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-credit-card w-5 mr-3"></i> Payments
                </a>
                <a href="#leads" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-funnel-dollar w-5 mr-3"></i> Leads
                </a>
                <a href="#affiliates" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-handshake w-5 mr-3"></i> Affiliates
                </a>
                <a href="/analytics" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-chart-line w-5 mr-3"></i> Analytics
                </a>
                <a href="#settings" class="menu-item flex items-center px-4 py-3 rounded-lg">
                    <i class="fas fa-cog w-5 mr-3"></i> Settings
                </a>
            </nav>
            
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                <a href="/dashboard" class="flex items-center text-gray-400 hover:text-white">
                    <i class="fas fa-arrow-left mr-2"></i> Back to Main Site
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="ml-64 flex-1 p-8">
            <!-- Header -->
            <header class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p class="text-gray-500 mt-1">Manage your enterprise platform</p>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center">
                        <i class="fas fa-bell mr-2 text-gray-500"></i>
                        <span class="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">5</span>
                    </button>
                    <div class="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" class="w-8 h-8 rounded-full">
                        <span class="font-medium">Admin User</span>
                    </div>
                </div>
            </header>

            <!-- KPI Cards -->
            <div class="grid grid-cols-4 gap-6 mb-8">
                <div class="card stat-card p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Total Revenue</p>
                            <h3 class="text-2xl font-bold text-gray-800 mt-1" id="total-revenue">€0</h3>
                            <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>+12.5% vs last month</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-euro-sign text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="card stat-card p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Total Bookings</p>
                            <h3 class="text-2xl font-bold text-gray-800 mt-1" id="total-bookings">0</h3>
                            <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>+8.3% vs last month</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="card stat-card p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Active Patients</p>
                            <h3 class="text-2xl font-bold text-gray-800 mt-1" id="active-patients">0</h3>
                            <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>+15.2% vs last month</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-users text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="card stat-card p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Conversion Rate</p>
                            <h3 class="text-2xl font-bold text-gray-800 mt-1" id="conversion-rate">0%</h3>
                            <p class="text-sm text-red-600 mt-2"><i class="fas fa-arrow-down mr-1"></i>-2.1% vs last month</p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-percentage text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="card p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                    <canvas id="revenue-chart" height="200"></canvas>
                </div>
                
                <div class="card p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Booking Sources</h3>
                    <canvas id="sources-chart" height="200"></canvas>
                </div>
            </div>

            <!-- Recent Activity & Tables -->
            <div class="grid grid-cols-3 gap-6 mb-8">
                <!-- Recent Bookings -->
                <div class="card p-6 col-span-2">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Recent Bookings</h3>
                        <a href="#bookings" class="text-blue-600 text-sm hover:underline">View All</a>
                    </div>
                    <table class="w-full data-table">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-3 text-sm font-medium text-gray-500">Patient</th>
                                <th class="text-left py-3 text-sm font-medium text-gray-500">Doctor</th>
                                <th class="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                                <th class="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                                <th class="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                            </tr>
                        </thead>
                        <tbody id="recent-bookings-table">
                            <tr>
                                <td class="py-3" colspan="5">
                                    <div class="flex justify-center items-center py-8">
                                        <i class="fas fa-spinner fa-spin mr-2"></i> Loading...
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Activity Feed -->
                <div class="card p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Activity Feed</h3>
                    <div class="space-y-4" id="activity-feed">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-user-plus text-blue-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-800">New patient registration</p>
                                <p class="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-credit-card text-green-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-800">Payment received - €2,500</p>
                                <p class="text-xs text-gray-500">15 minutes ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-calendar-check text-purple-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-800">Booking confirmed</p>
                                <p class="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-star text-orange-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-800">New 5-star review</p>
                                <p class="text-xs text-gray-500">3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Management Sections -->
            <div class="grid grid-cols-2 gap-6 mb-8">
                <!-- Doctor Management -->
                <div class="card p-6" id="doctors">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Doctor Management</h3>
                        <button onclick="openDoctorModal()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                            <i class="fas fa-plus mr-1"></i> Add Doctor
                        </button>
                    </div>
                    <div class="space-y-3" id="doctors-list">
                        <div class="flex justify-center py-8">
                            <i class="fas fa-spinner fa-spin mr-2"></i> Loading doctors...
                        </div>
                    </div>
                </div>
                
                <!-- Lead Management -->
                <div class="card p-6" id="leads">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Lead Pipeline</h3>
                        <span class="text-sm text-gray-500">Last 30 days</span>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium">New Leads</span>
                            <span class="badge badge-info" id="new-leads-count">0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium">Contacted</span>
                            <span class="badge badge-warning" id="contacted-leads-count">0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium">Qualified</span>
                            <span class="badge badge-info" id="qualified-leads-count">0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium">Converted</span>
                            <span class="badge badge-success" id="converted-leads-count">0</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Affiliate & Subscription Management -->
            <div class="grid grid-cols-2 gap-6">
                <!-- Affiliates -->
                <div class="card p-6" id="affiliates">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Top Affiliates</h3>
                        <a href="/affiliate" class="text-blue-600 text-sm hover:underline">View All</a>
                    </div>
                    <table class="w-full data-table">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2 text-sm font-medium text-gray-500">Affiliate</th>
                                <th class="text-left py-2 text-sm font-medium text-gray-500">Referrals</th>
                                <th class="text-left py-2 text-sm font-medium text-gray-500">Commission</th>
                            </tr>
                        </thead>
                        <tbody id="top-affiliates-table">
                            <tr><td colspan="3" class="py-4 text-center text-gray-500">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Active Subscriptions -->
                <div class="card p-6" id="subscriptions">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Active Subscriptions</h3>
                        <span class="text-sm text-gray-500">Premium Listings</span>
                    </div>
                    <div class="space-y-3" id="subscriptions-list">
                        <div class="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p class="font-medium">Basic Plan</p>
                                <p class="text-sm text-gray-500">€200/month</p>
                            </div>
                            <span class="badge badge-info" id="basic-subs">0 active</span>
                        </div>
                        <div class="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p class="font-medium">Professional Plan</p>
                                <p class="text-sm text-gray-500">€350/month</p>
                            </div>
                            <span class="badge badge-info" id="pro-subs">0 active</span>
                        </div>
                        <div class="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p class="font-medium">Enterprise Plan</p>
                                <p class="text-sm text-gray-500">€500/month</p>
                            </div>
                            <span class="badge badge-info" id="enterprise-subs">0 active</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Add Doctor Modal -->
    <div id="doctor-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 class="text-xl font-bold mb-4">Add New Doctor</h3>
            <form id="add-doctor-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <select name="specialization" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Select specialization</option>
                        <option value="bariatric">Bariatric Surgery</option>
                        <option value="plastic">Plastic Surgery</option>
                        <option value="orthopedic">Orthopedics</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="oncology">Oncology</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (€)</label>
                    <input type="number" name="fee" min="50" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex space-x-3 pt-4">
                    <button type="button" onclick="closeDoctorModal()" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Doctor</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const API_BASE = '/api';
        
        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', async () => {
            await loadDashboardData();
            initCharts();
        });
        
        async function loadDashboardData() {
            try {
                // Load analytics overview
                const analyticsRes = await fetch(\`\${API_BASE}/analytics/overview\`);
                if (analyticsRes.ok) {
                    const data = await analyticsRes.json();
                    document.getElementById('total-revenue').textContent = '€' + (data.revenue?.total || 0).toLocaleString();
                    document.getElementById('total-bookings').textContent = data.bookings?.total || 0;
                    document.getElementById('active-patients').textContent = data.patients?.total || 0;
                    document.getElementById('conversion-rate').textContent = (data.conversion?.rate || 0).toFixed(1) + '%';
                }
                
                // Load recent bookings
                const bookingsRes = await fetch(\`\${API_BASE}/admin/bookings?limit=5\`);
                if (bookingsRes.ok) {
                    const bookings = await bookingsRes.json();
                    renderRecentBookings(bookings.data || []);
                }
                
                // Load doctors
                const doctorsRes = await fetch(\`\${API_BASE}/doctors\`);
                if (doctorsRes.ok) {
                    const doctors = await doctorsRes.json();
                    renderDoctorsList(doctors.data || []);
                }
                
                // Load lead stats
                const leadsRes = await fetch(\`\${API_BASE}/analytics/leads\`);
                if (leadsRes.ok) {
                    const leads = await leadsRes.json();
                    document.getElementById('new-leads-count').textContent = leads.new || 0;
                    document.getElementById('contacted-leads-count').textContent = leads.contacted || 0;
                    document.getElementById('qualified-leads-count').textContent = leads.qualified || 0;
                    document.getElementById('converted-leads-count').textContent = leads.converted || 0;
                }
                
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        }
        
        function renderRecentBookings(bookings) {
            const table = document.getElementById('recent-bookings-table');
            if (bookings.length === 0) {
                table.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No bookings yet</td></tr>';
                return;
            }
            
            table.innerHTML = bookings.map(b => \`
                <tr class="border-b">
                    <td class="py-3">
                        <div class="flex items-center space-x-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=\${b.patient_id}" class="w-8 h-8 rounded-full">
                            <span class="font-medium">\${b.patient_name || 'Patient'}</span>
                        </div>
                    </td>
                    <td class="py-3">\${b.doctor_name || 'Dr. Unknown'}</td>
                    <td class="py-3">\${new Date(b.scheduled_date).toLocaleDateString()}</td>
                    <td class="py-3">
                        <span class="badge badge-\${getStatusBadge(b.status)}">\${b.status}</span>
                    </td>
                    <td class="py-3 font-medium">€\${(b.amount || 0).toLocaleString()}</td>
                </tr>
            \`).join('');
        }
        
        function renderDoctorsList(doctors) {
            const list = document.getElementById('doctors-list');
            if (doctors.length === 0) {
                list.innerHTML = '<p class="text-center text-gray-500 py-4">No doctors found</p>';
                return;
            }
            
            list.innerHTML = doctors.slice(0, 5).map(d => \`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=\${d.id}" class="w-10 h-10 rounded-full">
                        <div>
                            <p class="font-medium">\${d.name}</p>
                            <p class="text-sm text-gray-500">\${d.specialization}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="badge badge-\${d.is_active ? 'success' : 'danger'}">\${d.is_active ? 'Active' : 'Inactive'}</span>
                        <p class="text-sm text-gray-500 mt-1">€\${d.consultation_fee || 150}/consultation</p>
                    </div>
                </div>
            \`).join('');
        }
        
        function getStatusBadge(status) {
            const map = {
                'confirmed': 'success',
                'pending': 'warning',
                'cancelled': 'danger',
                'completed': 'info'
            };
            return map[status] || 'info';
        }
        
        function initCharts() {
            // Revenue Chart
            new Chart(document.getElementById('revenue-chart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue (€)',
                        data: [15000, 22000, 18000, 35000, 42000, 38000],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { callback: v => '€' + v.toLocaleString() } }
                    }
                }
            });
            
            // Sources Chart
            new Chart(document.getElementById('sources-chart'), {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Affiliates', 'Google', 'Social Media', 'Referrals'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }
        
        function openDoctorModal() {
            document.getElementById('doctor-modal').classList.remove('hidden');
            document.getElementById('doctor-modal').classList.add('flex');
        }
        
        function closeDoctorModal() {
            document.getElementById('doctor-modal').classList.add('hidden');
            document.getElementById('doctor-modal').classList.remove('flex');
        }
        
        document.getElementById('add-doctor-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const res = await fetch(\`\${API_BASE}/admin/doctors\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (res.ok) {
                    alert('Doctor added successfully!');
                    closeDoctorModal();
                    loadDashboardData();
                } else {
                    const error = await res.json();
                    alert('Error: ' + (error.message || 'Failed to add doctor'));
                }
            } catch (error) {
                alert('Error adding doctor');
            }
        });
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/admin" class="nav-item active">
                <i class="fas fa-shield-alt"></i>
                <span>Admin</span>
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
