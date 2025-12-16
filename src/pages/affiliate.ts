/**
 * Affiliate Portal Page
 * Enterprise-grade affiliate management dashboard
 */

import type { Context } from 'hono'

export const affiliatePage = (c: Context) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Affiliate Portal - German Select Enterprise Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .gradient-header { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); }
        .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .stat-card { transition: all 0.3s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px -10px rgb(0 0 0 / 0.2); }
        .badge { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-paid { background: #dbeafe; color: #1e40af; }
        .link-box { background: linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%); border: 1px dashed #a855f7; }
        .copy-btn:hover { background: #7c3aed; color: white; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="gradient-header text-white py-8 px-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold flex items-center">
                        <i class="fas fa-handshake mr-3"></i>
                        Affiliate Portal
                    </h1>
                    <p class="text-purple-200 mt-2">Earn up to 15% commission on every referral</p>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/dashboard" class="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
                        <i class="fas fa-home mr-2"></i> Main Site
                    </a>
                    <div class="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=affiliate" class="w-8 h-8 rounded-full">
                        <span>Partner Account</span>
                    </div>
                </div>
            </div>
            
            <!-- Welcome Banner -->
            <div class="mt-8 bg-white/10 rounded-xl p-6 backdrop-blur">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold">Welcome back, Partner!</h2>
                        <p class="text-purple-200 mt-1">Your affiliate link is generating results. Keep sharing!</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-purple-200">Current Tier</p>
                        <p class="text-2xl font-bold">Gold Partner</p>
                        <p class="text-sm text-purple-200">10% commission rate</p>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="card stat-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Total Earnings</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="total-earnings">€0</h3>
                        <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>+15% this month</p>
                    </div>
                    <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-euro-sign text-green-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card stat-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Total Referrals</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="total-referrals">0</h3>
                        <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>+8 this month</p>
                    </div>
                    <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-users text-purple-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card stat-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Conversion Rate</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="conversion-rate">0%</h3>
                        <p class="text-sm text-gray-500 mt-2">Industry avg: 3.2%</p>
                    </div>
                    <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="card stat-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Pending Payout</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2" id="pending-payout">€0</h3>
                        <p class="text-sm text-orange-600 mt-2">Next payout: Jan 15</p>
                    </div>
                    <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-clock text-orange-600 text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Affiliate Link Section -->
        <div class="card p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Your Affiliate Links</h3>
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Main Referral Link</label>
                    <div class="link-box rounded-lg p-4 flex items-center justify-between">
                        <code class="text-sm text-purple-700" id="main-link">Loading...</code>
                        <button onclick="copyLink('main-link')" class="copy-btn px-3 py-1 border border-purple-400 rounded text-purple-600 text-sm transition-all">
                            <i class="fas fa-copy mr-1"></i> Copy
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">30-day cookie duration</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Short Link</label>
                    <div class="link-box rounded-lg p-4 flex items-center justify-between">
                        <code class="text-sm text-purple-700" id="short-link">Loading...</code>
                        <button onclick="copyLink('short-link')" class="copy-btn px-3 py-1 border border-purple-400 rounded text-purple-600 text-sm transition-all">
                            <i class="fas fa-copy mr-1"></i> Copy
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Perfect for social media</p>
                </div>
            </div>
            
            <!-- UTM Builder -->
            <div class="mt-6 pt-6 border-t">
                <h4 class="font-medium text-gray-700 mb-4">UTM Campaign Builder</h4>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Campaign Source</label>
                        <input type="text" id="utm-source" placeholder="e.g., facebook" class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Campaign Medium</label>
                        <input type="text" id="utm-medium" placeholder="e.g., social" class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Campaign Name</label>
                        <input type="text" id="utm-campaign" placeholder="e.g., summer_promo" class="w-full px-3 py-2 border rounded-lg">
                    </div>
                </div>
                <button onclick="generateUTMLink()" class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <i class="fas fa-link mr-2"></i> Generate UTM Link
                </button>
                <div id="utm-result" class="hidden mt-4 link-box rounded-lg p-4">
                    <code class="text-sm text-purple-700 break-all" id="utm-link"></code>
                    <button onclick="copyLink('utm-link')" class="ml-2 copy-btn px-3 py-1 border border-purple-400 rounded text-purple-600 text-sm">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Earnings Over Time</h3>
                <canvas id="earnings-chart" height="200"></canvas>
            </div>
            
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Referral Sources</h3>
                <canvas id="sources-chart" height="200"></canvas>
            </div>
        </div>

        <!-- Recent Referrals & Payouts -->
        <div class="grid grid-cols-3 gap-6 mb-8">
            <!-- Recent Referrals -->
            <div class="card p-6 col-span-2">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Recent Referrals</h3>
                    <button class="text-purple-600 text-sm hover:underline">View All</button>
                </div>
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 text-sm font-medium text-gray-500">Patient</th>
                            <th class="text-left py-3 text-sm font-medium text-gray-500">Service</th>
                            <th class="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                            <th class="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                            <th class="text-left py-3 text-sm font-medium text-gray-500">Commission</th>
                        </tr>
                    </thead>
                    <tbody id="referrals-table">
                        <tr><td colspan="5" class="py-8 text-center text-gray-500">Loading referrals...</td></tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Payout History -->
            <div class="card p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Payout History</h3>
                <div class="space-y-3" id="payouts-list">
                    <div class="flex justify-center py-8 text-gray-500">Loading...</div>
                </div>
            </div>
        </div>

        <!-- Commission Tiers -->
        <div class="card p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Commission Tiers</h3>
            <div class="grid grid-cols-3 gap-6">
                <div class="border rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i class="fas fa-medal text-gray-400 text-2xl"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800">Bronze</h4>
                    <p class="text-3xl font-bold text-gray-800 my-2">5%</p>
                    <p class="text-sm text-gray-500">0-10 referrals/month</p>
                    <ul class="mt-4 text-sm text-gray-600 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Basic dashboard</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Monthly payouts</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Email support</li>
                    </ul>
                </div>
                
                <div class="border-2 border-purple-500 rounded-xl p-6 text-center relative">
                    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">CURRENT</span>
                    </div>
                    <div class="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i class="fas fa-award text-yellow-500 text-2xl"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800">Gold</h4>
                    <p class="text-3xl font-bold text-purple-600 my-2">10%</p>
                    <p class="text-sm text-gray-500">11-50 referrals/month</p>
                    <ul class="mt-4 text-sm text-gray-600 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Advanced analytics</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Bi-weekly payouts</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Priority support</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Custom landing pages</li>
                    </ul>
                </div>
                
                <div class="border rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i class="fas fa-gem text-purple-500 text-2xl"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800">Platinum</h4>
                    <p class="text-3xl font-bold text-gray-800 my-2">15%</p>
                    <p class="text-sm text-gray-500">50+ referrals/month</p>
                    <ul class="mt-4 text-sm text-gray-600 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Real-time analytics</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Weekly payouts</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Dedicated manager</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Co-branded materials</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>API access</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Marketing Materials -->
        <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Marketing Materials</h3>
            <div class="grid grid-cols-4 gap-4">
                <div class="border rounded-lg p-4 text-center hover:border-purple-500 transition-all cursor-pointer">
                    <div class="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <i class="fas fa-image text-gray-400 text-2xl"></i>
                    </div>
                    <p class="font-medium text-sm">Banner Ads</p>
                    <p class="text-xs text-gray-500">Multiple sizes</p>
                </div>
                <div class="border rounded-lg p-4 text-center hover:border-purple-500 transition-all cursor-pointer">
                    <div class="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <i class="fas fa-envelope text-gray-400 text-2xl"></i>
                    </div>
                    <p class="font-medium text-sm">Email Templates</p>
                    <p class="text-xs text-gray-500">Ready to send</p>
                </div>
                <div class="border rounded-lg p-4 text-center hover:border-purple-500 transition-all cursor-pointer">
                    <div class="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <i class="fas fa-hashtag text-gray-400 text-2xl"></i>
                    </div>
                    <p class="font-medium text-sm">Social Media Kit</p>
                    <p class="text-xs text-gray-500">Posts & stories</p>
                </div>
                <div class="border rounded-lg p-4 text-center hover:border-purple-500 transition-all cursor-pointer">
                    <div class="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <i class="fas fa-file-pdf text-gray-400 text-2xl"></i>
                    </div>
                    <p class="font-medium text-sm">Brochures</p>
                    <p class="text-xs text-gray-500">PDF downloads</p>
                </div>
            </div>
        </div>
    </main>

    <script>
        const API_BASE = '/api';
        const AFFILIATE_ID = 'demo-affiliate'; // Would come from auth
        
        document.addEventListener('DOMContentLoaded', async () => {
            await loadAffiliateData();
            initCharts();
        });
        
        async function loadAffiliateData() {
            try {
                // Load affiliate stats
                const statsRes = await fetch(\`\${API_BASE}/affiliates/\${AFFILIATE_ID}/stats\`);
                if (statsRes.ok) {
                    const stats = await statsRes.json();
                    document.getElementById('total-earnings').textContent = '€' + (stats.total_commission || 0).toLocaleString();
                    document.getElementById('total-referrals').textContent = stats.total_referrals || 0;
                    document.getElementById('conversion-rate').textContent = (stats.conversion_rate || 0).toFixed(1) + '%';
                    document.getElementById('pending-payout').textContent = '€' + (stats.pending_commission || 0).toLocaleString();
                }
                
                // Load affiliate links
                const linksRes = await fetch(\`\${API_BASE}/affiliates/\${AFFILIATE_ID}/links\`);
                if (linksRes.ok) {
                    const links = await linksRes.json();
                    document.getElementById('main-link').textContent = links.main_link || 'https://germanselect.com?ref=' + AFFILIATE_ID;
                    document.getElementById('short-link').textContent = links.short_link || 'https://gs.io/' + AFFILIATE_ID.substring(0, 8);
                }
                
                // Load recent referrals
                const referralsRes = await fetch(\`\${API_BASE}/affiliates/\${AFFILIATE_ID}/referrals\`);
                if (referralsRes.ok) {
                    const referrals = await referralsRes.json();
                    renderReferrals(referrals.data || generateDemoReferrals());
                }
                
                // Load payout history
                const payoutsRes = await fetch(\`\${API_BASE}/affiliates/\${AFFILIATE_ID}/payouts\`);
                if (payoutsRes.ok) {
                    const payouts = await payoutsRes.json();
                    renderPayouts(payouts.data || generateDemoPayouts());
                }
                
            } catch (error) {
                console.error('Error loading affiliate data:', error);
                // Load demo data on error
                document.getElementById('total-earnings').textContent = '€4,850';
                document.getElementById('total-referrals').textContent = '47';
                document.getElementById('conversion-rate').textContent = '8.5%';
                document.getElementById('pending-payout').textContent = '€620';
                document.getElementById('main-link').textContent = 'https://germanselect.com?ref=' + AFFILIATE_ID;
                document.getElementById('short-link').textContent = 'https://gs.io/demo123';
                renderReferrals(generateDemoReferrals());
                renderPayouts(generateDemoPayouts());
            }
        }
        
        function generateDemoReferrals() {
            return [
                { patient: 'M. Schmidt', service: 'Bariatric Consultation', date: '2024-01-10', status: 'converted', commission: 250 },
                { patient: 'A. Mueller', service: 'SurgeryBridge Package', date: '2024-01-08', status: 'pending', commission: 1200 },
                { patient: 'J. Weber', service: 'Orthopedic Consultation', date: '2024-01-05', status: 'converted', commission: 150 },
                { patient: 'K. Fischer', service: 'Plastic Surgery Package', date: '2024-01-03', status: 'converted', commission: 800 },
                { patient: 'T. Wagner', service: 'Cardiology Consultation', date: '2024-01-01', status: 'pending', commission: 200 }
            ];
        }
        
        function generateDemoPayouts() {
            return [
                { date: '2024-01-01', amount: 1250, status: 'paid' },
                { date: '2023-12-15', amount: 980, status: 'paid' },
                { date: '2023-12-01', amount: 1420, status: 'paid' },
                { date: '2023-11-15', amount: 850, status: 'paid' }
            ];
        }
        
        function renderReferrals(referrals) {
            const table = document.getElementById('referrals-table');
            if (referrals.length === 0) {
                table.innerHTML = '<tr><td colspan="5" class="py-8 text-center text-gray-500">No referrals yet</td></tr>';
                return;
            }
            
            table.innerHTML = referrals.map(r => \`
                <tr class="border-b">
                    <td class="py-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span class="text-purple-600 font-medium text-sm">\${r.patient?.charAt(0) || 'P'}</span>
                            </div>
                            <span class="font-medium">\${r.patient || 'Anonymous'}</span>
                        </div>
                    </td>
                    <td class="py-3 text-sm">\${r.service}</td>
                    <td class="py-3 text-sm text-gray-500">\${r.date}</td>
                    <td class="py-3">
                        <span class="badge badge-\${r.status === 'converted' ? 'success' : 'pending'}">\${r.status}</span>
                    </td>
                    <td class="py-3 font-medium text-green-600">€\${r.commission}</td>
                </tr>
            \`).join('');
        }
        
        function renderPayouts(payouts) {
            const list = document.getElementById('payouts-list');
            if (payouts.length === 0) {
                list.innerHTML = '<p class="text-center text-gray-500 py-8">No payouts yet</p>';
                return;
            }
            
            list.innerHTML = payouts.map(p => \`
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <p class="font-medium">€\${p.amount.toLocaleString()}</p>
                        <p class="text-sm text-gray-500">\${p.date}</p>
                    </div>
                    <span class="badge badge-\${p.status === 'paid' ? 'paid' : 'pending'}">\${p.status}</span>
                </div>
            \`).join('');
        }
        
        function copyLink(elementId) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                alert('Link copied to clipboard!');
            });
        }
        
        function generateUTMLink() {
            const source = document.getElementById('utm-source').value;
            const medium = document.getElementById('utm-medium').value;
            const campaign = document.getElementById('utm-campaign').value;
            
            if (!source || !medium || !campaign) {
                alert('Please fill in all UTM fields');
                return;
            }
            
            const baseUrl = document.getElementById('main-link').textContent;
            const utmLink = \`\${baseUrl}&utm_source=\${encodeURIComponent(source)}&utm_medium=\${encodeURIComponent(medium)}&utm_campaign=\${encodeURIComponent(campaign)}\`;
            
            document.getElementById('utm-link').textContent = utmLink;
            document.getElementById('utm-result').classList.remove('hidden');
        }
        
        function initCharts() {
            // Earnings Chart
            new Chart(document.getElementById('earnings-chart'), {
                type: 'line',
                data: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Earnings',
                        data: [450, 680, 890, 720, 1100, 1250],
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
            
            // Sources Chart
            new Chart(document.getElementById('sources-chart'), {
                type: 'doughnut',
                data: {
                    labels: ['Social Media', 'Blog', 'Email', 'YouTube', 'Direct'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }
    </script>
</body>
</html>`
}
