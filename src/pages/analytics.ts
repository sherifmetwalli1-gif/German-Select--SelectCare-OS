/**
 * Analytics Dashboard Page
 * Enterprise-grade business intelligence
 */

import type { Context } from 'hono'

export const analyticsPage = (c: Context) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard - German Select Enterprise Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .gradient-header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); }
        .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .metric-card { transition: all 0.3s; border-left: 4px solid transparent; }
        .metric-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px -5px rgb(0 0 0 / 0.1); }
        .metric-card.revenue { border-left-color: #10b981; }
        .metric-card.bookings { border-left-color: #3b82f6; }
        .metric-card.patients { border-left-color: #8b5cf6; }
        .metric-card.conversion { border-left-color: #f59e0b; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn.active { background: #3b82f6; color: white; }
        
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
        .nav-item:hover { color: #6B7280; }
        .nav-item.active { color: #3B82F6; }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        main { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="gradient-header text-white py-6 px-8">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-chart-line mr-3"></i>
                    Analytics Dashboard
                </h1>
                <p class="text-blue-200 mt-1">Real-time business intelligence</p>
            </div>
            <div class="flex items-center space-x-4">
                <select id="date-range" class="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
                    <option value="7d">Last 7 days</option>
                    <option value="30d" selected>Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                </select>
                <button onclick="exportReport()" class="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 flex items-center">
                    <i class="fas fa-download mr-2"></i> Export
                </button>
                <a href="/admin" class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100">
                    <i class="fas fa-arrow-left mr-2"></i> Back to Admin
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 py-8">
        <!-- KPI Cards -->
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="card metric-card revenue p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Revenue</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="kpi-revenue">€0</h3>
                        <div class="flex items-center mt-3">
                            <span class="text-green-600 text-sm font-medium" id="revenue-change">+0%</span>
                            <span class="text-gray-400 text-sm ml-2">vs last period</span>
                        </div>
                    </div>
                    <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-euro-sign text-green-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card metric-card bookings p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Bookings</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="kpi-bookings">0</h3>
                        <div class="flex items-center mt-3">
                            <span class="text-green-600 text-sm font-medium" id="bookings-change">+0%</span>
                            <span class="text-gray-400 text-sm ml-2">vs last period</span>
                        </div>
                    </div>
                    <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-calendar-check text-blue-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card metric-card patients p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">New Patients</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="kpi-patients">0</h3>
                        <div class="flex items-center mt-3">
                            <span class="text-green-600 text-sm font-medium" id="patients-change">+0%</span>
                            <span class="text-gray-400 text-sm ml-2">vs last period</span>
                        </div>
                    </div>
                    <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-user-plus text-purple-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card metric-card conversion p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Conversion Rate</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="kpi-conversion">0%</h3>
                        <div class="flex items-center mt-3">
                            <span class="text-red-600 text-sm font-medium" id="conversion-change">-0%</span>
                            <span class="text-gray-400 text-sm ml-2">vs last period</span>
                        </div>
                    </div>
                    <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-percentage text-orange-600 text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Revenue Analytics -->
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="card p-6 col-span-2">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Revenue Trend</h3>
                    <div class="flex space-x-2">
                        <button class="tab-btn active px-3 py-1 rounded text-sm" data-chart="revenue" data-type="line">Line</button>
                        <button class="tab-btn px-3 py-1 rounded text-sm bg-gray-100" data-chart="revenue" data-type="bar">Bar</button>
                    </div>
                </div>
                <canvas id="revenue-trend-chart" height="200"></canvas>
            </div>
            
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Revenue Breakdown</h3>
                <canvas id="revenue-breakdown-chart" height="200"></canvas>
                <div class="mt-4 space-y-2" id="revenue-breakdown-legend"></div>
            </div>
        </div>

        <!-- Booking Analytics -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Booking Status Distribution</h3>
                <canvas id="booking-status-chart" height="180"></canvas>
            </div>
            
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Bookings by Specialization</h3>
                <canvas id="booking-specialization-chart" height="180"></canvas>
            </div>
        </div>

        <!-- Lead & Conversion Funnel -->
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="card p-6 col-span-2">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Lead Conversion Funnel</h3>
                <div class="space-y-4" id="conversion-funnel">
                    <div class="relative">
                        <div class="flex items-center">
                            <div class="w-32 text-sm font-medium text-gray-600">Website Visits</div>
                            <div class="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-blue-500 h-full rounded-full transition-all" style="width: 100%" id="funnel-visits"></div>
                                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" id="funnel-visits-count">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="flex items-center">
                            <div class="w-32 text-sm font-medium text-gray-600">Lead Captured</div>
                            <div class="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-blue-500 h-full rounded-full transition-all" style="width: 60%" id="funnel-leads"></div>
                                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" id="funnel-leads-count">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="flex items-center">
                            <div class="w-32 text-sm font-medium text-gray-600">Qualified</div>
                            <div class="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-blue-500 h-full rounded-full transition-all" style="width: 35%" id="funnel-qualified"></div>
                                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" id="funnel-qualified-count">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="flex items-center">
                            <div class="w-32 text-sm font-medium text-gray-600">Consultation</div>
                            <div class="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-blue-500 h-full rounded-full transition-all" style="width: 20%" id="funnel-consultation"></div>
                                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" id="funnel-consultation-count">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="flex items-center">
                            <div class="w-32 text-sm font-medium text-gray-600">Converted</div>
                            <div class="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-green-500 h-full rounded-full transition-all" style="width: 12%" id="funnel-converted"></div>
                                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" id="funnel-converted-count">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Traffic Sources</h3>
                <canvas id="traffic-sources-chart" height="200"></canvas>
            </div>
        </div>

        <!-- Doctor Performance -->
        <div class="card p-6 mb-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-800">Doctor Performance</h3>
                <select id="doctor-metric" class="border rounded-lg px-3 py-2 text-sm">
                    <option value="revenue">By Revenue</option>
                    <option value="bookings">By Bookings</option>
                    <option value="rating">By Rating</option>
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Doctor</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Specialization</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Bookings</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Avg Rating</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Conversion</th>
                        </tr>
                    </thead>
                    <tbody id="doctor-performance-table">
                        <tr><td colspan="6" class="py-8 text-center text-gray-500">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Affiliate Performance -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Top Affiliates</h3>
                <div class="space-y-4" id="top-affiliates">
                    <div class="flex justify-center py-8 text-gray-500">Loading...</div>
                </div>
            </div>
            
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Affiliate Revenue Trend</h3>
                <canvas id="affiliate-revenue-chart" height="200"></canvas>
            </div>
        </div>

        <!-- Geographic Distribution -->
        <div class="card p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Patient Geographic Distribution</h3>
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <canvas id="geo-chart" height="250"></canvas>
                </div>
                <div class="space-y-3" id="geo-breakdown">
                    <div class="flex justify-center py-8 text-gray-500">Loading geographic data...</div>
                </div>
            </div>
        </div>
    </main>

    <script>
        const API_BASE = '/api';
        let charts = {};
        
        document.addEventListener('DOMContentLoaded', async () => {
            await loadAnalyticsData();
            initAllCharts();
        });
        
        document.getElementById('date-range').addEventListener('change', async (e) => {
            await loadAnalyticsData(e.target.value);
        });
        
        async function loadAnalyticsData(period = '30d') {
            try {
                // Load overview
                const overviewRes = await fetch(\`\${API_BASE}/analytics/overview?period=\${period}\`);
                if (overviewRes.ok) {
                    const data = await overviewRes.json();
                    updateKPIs(data);
                }
                
                // Load revenue analytics
                const revenueRes = await fetch(\`\${API_BASE}/analytics/revenue?period=\${period}\`);
                if (revenueRes.ok) {
                    const data = await revenueRes.json();
                    updateRevenueCharts(data);
                }
                
                // Load booking analytics  
                const bookingsRes = await fetch(\`\${API_BASE}/analytics/bookings?period=\${period}\`);
                if (bookingsRes.ok) {
                    const data = await bookingsRes.json();
                    updateBookingCharts(data);
                }
                
                // Load doctors performance
                const doctorsRes = await fetch(\`\${API_BASE}/analytics/doctors\`);
                if (doctorsRes.ok) {
                    const data = await doctorsRes.json();
                    renderDoctorPerformance(data.data || []);
                }
                
                // Load affiliates
                const affiliatesRes = await fetch(\`\${API_BASE}/analytics/affiliates\`);
                if (affiliatesRes.ok) {
                    const data = await affiliatesRes.json();
                    renderTopAffiliates(data.data || []);
                }
                
            } catch (error) {
                console.error('Error loading analytics:', error);
            }
        }
        
        function updateKPIs(data) {
            document.getElementById('kpi-revenue').textContent = '€' + (data.revenue?.total || 0).toLocaleString();
            document.getElementById('kpi-bookings').textContent = data.bookings?.total || 0;
            document.getElementById('kpi-patients').textContent = data.patients?.new || 0;
            document.getElementById('kpi-conversion').textContent = (data.conversion?.rate || 0).toFixed(1) + '%';
            
            // Update change indicators
            const revenueChange = data.revenue?.change || 0;
            const revenueEl = document.getElementById('revenue-change');
            revenueEl.textContent = (revenueChange >= 0 ? '+' : '') + revenueChange.toFixed(1) + '%';
            revenueEl.className = \`text-sm font-medium \${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}\`;
        }
        
        function updateRevenueCharts(data) {
            // Update trend chart
            if (charts.revenueTrend) {
                charts.revenueTrend.data.labels = data.trend?.labels || [];
                charts.revenueTrend.data.datasets[0].data = data.trend?.values || [];
                charts.revenueTrend.update();
            }
            
            // Update breakdown chart
            if (charts.revenueBreakdown) {
                const breakdown = data.breakdown || [];
                charts.revenueBreakdown.data.labels = breakdown.map(b => b.source);
                charts.revenueBreakdown.data.datasets[0].data = breakdown.map(b => b.amount);
                charts.revenueBreakdown.update();
            }
        }
        
        function updateBookingCharts(data) {
            // Update status chart
            if (charts.bookingStatus) {
                const statuses = data.byStatus || {};
                charts.bookingStatus.data.datasets[0].data = [
                    statuses.confirmed || 0,
                    statuses.pending || 0,
                    statuses.completed || 0,
                    statuses.cancelled || 0
                ];
                charts.bookingStatus.update();
            }
        }
        
        function renderDoctorPerformance(doctors) {
            const table = document.getElementById('doctor-performance-table');
            if (doctors.length === 0) {
                table.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-500">No doctor data available</td></tr>';
                return;
            }
            
            table.innerHTML = doctors.map(d => \`
                <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                        <div class="flex items-center space-x-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=\${d.id}" class="w-10 h-10 rounded-full">
                            <div>
                                <p class="font-medium">\${d.name}</p>
                                <p class="text-sm text-gray-500">\${d.email || ''}</p>
                            </div>
                        </div>
                    </td>
                    <td class="py-3 px-4 text-sm">\${d.specialization}</td>
                    <td class="py-3 px-4 text-sm font-medium">\${d.bookings || 0}</td>
                    <td class="py-3 px-4 text-sm font-medium text-green-600">€\${(d.revenue || 0).toLocaleString()}</td>
                    <td class="py-3 px-4">
                        <div class="flex items-center">
                            <span class="text-yellow-500 mr-1">★</span>
                            <span class="text-sm font-medium">\${(d.rating || 4.5).toFixed(1)}</span>
                        </div>
                    </td>
                    <td class="py-3 px-4 text-sm font-medium">\${(d.conversion || 0).toFixed(1)}%</td>
                </tr>
            \`).join('');
        }
        
        function renderTopAffiliates(affiliates) {
            const container = document.getElementById('top-affiliates');
            if (affiliates.length === 0) {
                container.innerHTML = '<p class="text-center text-gray-500 py-8">No affiliate data available</p>';
                return;
            }
            
            container.innerHTML = affiliates.slice(0, 5).map((a, i) => \`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">\${i + 1}</span>
                        <div>
                            <p class="font-medium">\${a.name}</p>
                            <p class="text-sm text-gray-500">\${a.referrals || 0} referrals</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-green-600">€\${(a.commission || 0).toLocaleString()}</p>
                        <p class="text-sm text-gray-500">earned</p>
                    </div>
                </div>
            \`).join('');
        }
        
        function initAllCharts() {
            // Revenue Trend Chart
            charts.revenueTrend = new Chart(document.getElementById('revenue-trend-chart'), {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000],
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
            
            // Revenue Breakdown Chart
            charts.revenueBreakdown = new Chart(document.getElementById('revenue-breakdown-chart'), {
                type: 'doughnut',
                data: {
                    labels: ['Consultations', 'Packages', 'Subscriptions', 'Affiliate'],
                    datasets: [{
                        data: [45, 35, 15, 5],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
            
            // Booking Status Chart
            charts.bookingStatus = new Chart(document.getElementById('booking-status-chart'), {
                type: 'bar',
                data: {
                    labels: ['Confirmed', 'Pending', 'Completed', 'Cancelled'],
                    datasets: [{
                        data: [45, 25, 80, 10],
                        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
            
            // Booking by Specialization Chart
            new Chart(document.getElementById('booking-specialization-chart'), {
                type: 'bar',
                data: {
                    labels: ['Bariatric', 'Plastic', 'Orthopedic', 'Cardiology', 'Oncology'],
                    datasets: [{
                        label: 'Bookings',
                        data: [35, 28, 22, 18, 12],
                        backgroundColor: '#3b82f6'
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: 'y',
                    plugins: { legend: { display: false } }
                }
            });
            
            // Traffic Sources Chart
            new Chart(document.getElementById('traffic-sources-chart'), {
                type: 'pie',
                data: {
                    labels: ['Organic', 'Paid Ads', 'Social', 'Referral', 'Direct'],
                    datasets: [{
                        data: [35, 25, 18, 12, 10],
                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#6b7280']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'right' } }
                }
            });
            
            // Affiliate Revenue Chart
            new Chart(document.getElementById('affiliate-revenue-chart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Affiliate Revenue',
                        data: [2000, 3500, 4200, 3800, 5500, 6200],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { callback: v => '€' + v } }
                    }
                }
            });
            
            // Geographic Chart
            new Chart(document.getElementById('geo-chart'), {
                type: 'doughnut',
                data: {
                    labels: ['Germany', 'UK', 'USA', 'UAE', 'Others'],
                    datasets: [{
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'right' } }
                }
            });
            
            // Update geo breakdown
            document.getElementById('geo-breakdown').innerHTML = \`
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="flex items-center"><span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Germany</span>
                    <span class="font-medium">30%</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="flex items-center"><span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>United Kingdom</span>
                    <span class="font-medium">25%</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="flex items-center"><span class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>United States</span>
                    <span class="font-medium">20%</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="flex items-center"><span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>UAE</span>
                    <span class="font-medium">15%</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="flex items-center"><span class="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Others</span>
                    <span class="font-medium">10%</span>
                </div>
            \`;
        }
        
        function exportReport() {
            alert('Exporting analytics report... This feature would generate a PDF/Excel report.');
        }
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/admin" class="nav-item">
                <i class="fas fa-shield-alt"></i>
                <span>Admin</span>
            </a>
            <a href="/analytics" class="nav-item active">
                <i class="fas fa-chart-line"></i>
                <span>Analytics</span>
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
