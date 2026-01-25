/**
 * SelectCareOS™ Enterprise Dashboard
 * Modern, animated dashboard with navy/gold brand palette
 * Enhanced visuals matching the platform design system
 */

import { Context } from 'hono'

export function dashboardPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise Dashboard | SelectCareOS™</title>
    <meta name="description" content="Enterprise analytics dashboard for SelectCareOS medical tourism platform">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        /* ═══════════════════════════════════════════════════════════════════
           SelectCareOS™ Brand System - Navy, Gold, Cream
           ═══════════════════════════════════════════════════════════════════ */
        :root {
            --navy: #001F3F;
            --navy-light: #003366;
            --navy-dark: #001530;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --gold-dark: #B8922B;
            --cream: #FAF8F5;
            --cream-dark: #F5F0E8;
        }
        
        * { box-sizing: border-box; }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Morphing Background Animation
           ═══════════════════════════════════════════════════════════════════ */
        .hero-bg {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--navy-dark) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .hero-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(ellipse at center, rgba(201, 162, 39, 0.15) 0%, transparent 50%);
            animation: morphing 20s ease-in-out infinite;
        }
        
        .hero-bg::after {
            content: '';
            position: absolute;
            bottom: -30%;
            right: -30%;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(201, 162, 39, 0.1) 0%, transparent 60%);
            animation: morphing 15s ease-in-out infinite reverse;
        }
        
        @keyframes morphing {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(5%, 5%) rotate(90deg) scale(1.1); }
            50% { transform: translate(-5%, 10%) rotate(180deg) scale(0.95); }
            75% { transform: translate(10%, -5%) rotate(270deg) scale(1.05); }
        }
        
        /* Floating particles */
        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(201, 162, 39, 0.4);
            border-radius: 50%;
            animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
            50% { transform: translateY(-100px) translateX(30px); opacity: 0.8; }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Sidebar Styles
           ═══════════════════════════════════════════════════════════════════ */
        .sidebar {
            width: 280px;
            min-height: 100vh;
            background: linear-gradient(180deg, var(--navy) 0%, var(--navy-dark) 100%);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 50;
            transition: all 0.3s ease;
        }
        
        .sidebar-logo {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(201, 162, 39, 0.2);
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
            margin: 4px 8px;
            border-radius: 0 8px 8px 0;
        }
        
        .nav-item:hover {
            background: rgba(201, 162, 39, 0.1);
            color: white;
            border-left-color: var(--gold);
        }
        
        .nav-item.active {
            background: rgba(201, 162, 39, 0.2);
            color: var(--gold);
            border-left-color: var(--gold);
            font-weight: 600;
        }
        
        .nav-item i {
            width: 24px;
            text-align: center;
            margin-right: 12px;
            font-size: 18px;
        }
        
        .main-content {
            margin-left: 280px;
            padding-bottom: 100px;
            min-height: 100vh;
        }
        
        @media (max-width: 1024px) {
            .sidebar { 
                transform: translateX(-100%);
            }
            .sidebar.open {
                transform: translateX(0);
            }
            .main-content { 
                margin-left: 0; 
            }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Modern Card Styles
           ═══════════════════════════════════════════════════════════════════ */
        .stat-card {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0, 31, 63, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold), var(--gold-light));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 31, 63, 0.12);
        }
        
        .stat-card:hover::before {
            opacity: 1;
        }
        
        .stat-card .icon-wrapper {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover .icon-wrapper {
            transform: scale(1.1) rotate(-5deg);
        }
        
        .stat-card .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--navy);
            line-height: 1.2;
        }
        
        .stat-card .stat-change {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .stat-card .stat-change.positive {
            background: rgba(16, 185, 129, 0.15);
            color: #059669;
        }
        
        .stat-card .stat-change.negative {
            background: rgba(239, 68, 68, 0.15);
            color: #DC2626;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Chart Card Styles
           ═══════════════════════════════════════════════════════════════════ */
        .chart-card {
            background: white;
            border-radius: 24px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px rgba(0, 31, 63, 0.06);
            border: 1px solid rgba(0, 31, 63, 0.06);
        }
        
        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .chart-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--navy);
        }
        
        .chart-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Activity Feed Styles
           ═══════════════════════════════════════════════════════════════════ */
        .activity-item {
            display: flex;
            align-items: flex-start;
            padding: 1rem;
            background: var(--cream);
            border-radius: 16px;
            margin-bottom: 12px;
            transition: all 0.2s ease;
            border: 1px solid transparent;
        }
        
        .activity-item:hover {
            background: white;
            border-color: var(--gold-light);
            transform: translateX(4px);
        }
        
        .activity-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Doctor Card Styles
           ═══════════════════════════════════════════════════════════════════ */
        .doctor-card {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: linear-gradient(135deg, var(--cream) 0%, white 100%);
            border-radius: 16px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 31, 63, 0.08);
        }
        
        .doctor-card:hover {
            transform: translateX(8px);
            box-shadow: 0 8px 24px rgba(0, 31, 63, 0.1);
            border-color: var(--gold);
        }
        
        .doctor-avatar {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-right: 14px;
            flex-shrink: 0;
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Platform Metrics Cards
           ═══════════════════════════════════════════════════════════════════ */
        .metric-card-gradient {
            border-radius: 24px;
            padding: 1.5rem;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .metric-card-gradient::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: pulse-glow 4s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Bottom Navigation
           ═══════════════════════════════════════════════════════════════════ */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 280px;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(12px, env(safe-area-inset-bottom));
            z-index: 1000;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 500px;
            margin: 0 auto;
            padding: 0 8px;
        }
        
        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 6px 12px;
            color: #9CA3AF;
            font-size: 10px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            border-radius: 12px;
            min-width: 56px;
            position: relative;
        }
        
        .bottom-nav-item i { 
            font-size: 20px; 
            margin-bottom: 4px; 
            transition: all 0.2s ease; 
        }
        
        .bottom-nav-item:hover { 
            color: #6B7280; 
            background: rgba(0, 0, 0, 0.02); 
        }
        
        .bottom-nav-item:hover i { 
            transform: scale(1.1) translateY(-2px); 
        }
        
        .bottom-nav-item.active { 
            color: var(--gold); 
        }
        
        .bottom-nav-item.active i { 
            transform: scale(1.1); 
        }
        
        .live-dot {
            position: absolute;
            top: 4px;
            right: 10px;
            width: 8px;
            height: 8px;
            background: #22C55E;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse-dot 2s infinite;
        }
        
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.3); }
        }
        
        /* Floating Emergency Button */
        .floating-emergency {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #DC2626, #B91C1C);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            box-shadow: 0 6px 24px rgba(220, 38, 38, 0.4);
            z-index: 999;
            transition: all 0.3s ease;
            text-decoration: none;
            border: 3px solid white;
        }
        
        .floating-emergency:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.5);
        }
        
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
            100% { transform: scale(1.6); opacity: 0; }
        }
        
        @media (max-width: 1024px) { 
            .bottom-nav { left: 0; } 
        }
        
        @media (min-width: 768px) {
            .bottom-nav { display: none; }
            .floating-emergency { 
                bottom: 32px; 
                right: 32px; 
            }
        }
        
        /* ═══════════════════════════════════════════════════════════════════
           Animations
           ═══════════════════════════════════════════════════════════════════ */
        .animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .animate-slide-up {
            animation: slideUp 0.6s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        /* Count up animation */
        .count-up {
            transition: all 0.5s ease;
        }
        
        /* Shimmer loading */
        .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        /* Status indicator */
        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
        }
        
        .status-dot.online {
            background: #22C55E;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
            animation: pulse-dot 2s infinite;
        }
        
        /* Tooltip */
        .tooltip {
            position: relative;
        }
        
        .tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 6px 12px;
            background: var(--navy);
            color: white;
            font-size: 12px;
            border-radius: 8px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
        }
        
        .tooltip:hover::after {
            opacity: 1;
            visibility: visible;
            bottom: calc(100% + 8px);
        }
    </style>
</head>
<body>
    <!-- ═══════════════════════════════════════════════════════════════════
         SIDEBAR NAVIGATION
         ═══════════════════════════════════════════════════════════════════ -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
            <a href="/" class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                    <i class="fas fa-heartbeat text-navy text-lg"></i>
                </div>
                <div>
                    <h1 class="text-lg font-bold text-white">SelectCare<span class="text-gold">OS</span></h1>
                    <p class="text-xs text-gray-400">Enterprise Platform</p>
                </div>
            </a>
        </div>
        
        <nav class="mt-6 px-2">
            <a href="/dashboard" class="nav-item active">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </a>
            <a href="/care-team" class="nav-item">
                <i class="fas fa-user-md"></i>
                <span>Care Team</span>
            </a>
            <a href="/booking" class="nav-item">
                <i class="fas fa-calendar-check"></i>
                <span>Bookings</span>
            </a>
            <a href="/services" class="nav-item">
                <i class="fas fa-box"></i>
                <span>Packages</span>
            </a>
            <a href="/calculators" class="nav-item">
                <i class="fas fa-calculator"></i>
                <span>Calculators</span>
            </a>
            <a href="/analytics" class="nav-item">
                <i class="fas fa-chart-bar"></i>
                <span>Analytics</span>
            </a>
            <a href="/affiliate" class="nav-item">
                <i class="fas fa-handshake"></i>
                <span>Affiliates</span>
            </a>
            
            <div class="mt-8 pt-6 border-t border-white/10">
                <a href="/admin" class="nav-item">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
                <a href="/medisense" class="nav-item">
                    <i class="fas fa-brain"></i>
                    <span>MediSense AI</span>
                </a>
            </div>
        </nav>
        
        <!-- API Status -->
        <div class="absolute bottom-6 left-6 right-6">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="status-dot online"></span>
                    <span class="text-sm text-white font-medium">System Status</span>
                </div>
                <p class="text-xs text-gray-400">All systems operational</p>
                <div class="mt-3 flex items-center text-xs text-gray-400">
                    <i class="fas fa-shield-alt text-green-400 mr-2"></i>
                    <span>HIPAA Compliant</span>
                </div>
            </div>
        </div>
    </aside>

    <!-- ═══════════════════════════════════════════════════════════════════
         MAIN CONTENT
         ═══════════════════════════════════════════════════════════════════ -->
    <main class="main-content">
        <!-- Hero Header -->
        <header class="hero-bg text-white relative">
            <!-- Floating particles -->
            <div class="particle" style="top: 20%; left: 10%;"></div>
            <div class="particle" style="top: 60%; left: 20%; animation-delay: -2s;"></div>
            <div class="particle" style="top: 30%; left: 70%; animation-delay: -4s;"></div>
            <div class="particle" style="top: 70%; left: 80%; animation-delay: -6s;"></div>
            <div class="particle" style="top: 40%; left: 50%; animation-delay: -3s;"></div>
            
            <div class="relative z-10 px-8 py-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="animate-fade-in">
                        <div class="flex items-center space-x-3 mb-4">
                            <span class="px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full flex items-center">
                                <span class="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                                LIVE DASHBOARD
                            </span>
                            <span class="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                                <i class="fas fa-check-circle mr-1"></i>Updated Now
                            </span>
                        </div>
                        <h1 class="text-3xl md:text-4xl font-bold mb-2">
                            Enterprise Dashboard
                        </h1>
                        <p class="text-gray-300">Welcome back! Here's your business overview for today.</p>
                    </div>
                    
                    <div class="mt-6 md:mt-0 flex items-center space-x-4 animate-fade-in stagger-2">
                        <select id="period-select" class="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-gold transition cursor-pointer" onchange="updatePeriod(this.value)">
                            <option value="today" class="text-navy">Today</option>
                            <option value="7days" class="text-navy">Last 7 Days</option>
                            <option value="30days" selected class="text-navy">Last 30 Days</option>
                            <option value="90days" class="text-navy">Last 90 Days</option>
                            <option value="year" class="text-navy">This Year</option>
                        </select>
                        <button class="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-navy font-semibold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center" onclick="exportData()">
                            <i class="fas fa-download mr-2"></i>
                            Export
                        </button>
                    </div>
                </div>
                
                <!-- Quick Stats Row -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-slide-up stagger-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-xs uppercase tracking-wide">Total Revenue</p>
                                <p class="text-2xl font-bold text-white mt-1" id="hero-revenue">€186,543</p>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                <i class="fas fa-euro-sign text-white"></i>
                            </div>
                        </div>
                        <div class="flex items-center mt-3 text-green-400 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>23.5% vs last period</span>
                        </div>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-slide-up stagger-2">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-xs uppercase tracking-wide">Total Bookings</p>
                                <p class="text-2xl font-bold text-white mt-1" id="hero-bookings">487</p>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <i class="fas fa-calendar-check text-white"></i>
                            </div>
                        </div>
                        <div class="flex items-center mt-3 text-green-400 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>18.2% vs last period</span>
                        </div>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-slide-up stagger-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-xs uppercase tracking-wide">Active Patients</p>
                                <p class="text-2xl font-bold text-white mt-1" id="hero-patients">1,247</p>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                <i class="fas fa-users text-white"></i>
                            </div>
                        </div>
                        <div class="flex items-center mt-3 text-green-400 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>12.8% vs last period</span>
                        </div>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-slide-up stagger-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-xs uppercase tracking-wide">Conversion Rate</p>
                                <p class="text-2xl font-bold text-white mt-1" id="hero-conversion">68.5%</p>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                                <i class="fas fa-percentage text-navy"></i>
                            </div>
                        </div>
                        <div class="flex items-center mt-3 text-green-400 text-sm">
                            <i class="fas fa-arrow-up mr-1"></i>
                            <span>5.2% vs last period</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Dashboard Content -->
        <div class="p-8">
            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Revenue Chart -->
                <div class="lg:col-span-2 chart-card animate-slide-up">
                    <div class="chart-header">
                        <div>
                            <h3 class="chart-title flex items-center">
                                <i class="fas fa-chart-line text-gold mr-2"></i>
                                Revenue Trend
                            </h3>
                            <p class="text-sm text-gray-500 mt-1">Monthly revenue breakdown</p>
                        </div>
                        <div class="flex space-x-2">
                            <span class="chart-badge bg-blue-100 text-blue-600">Consultations</span>
                            <span class="chart-badge bg-green-100 text-green-600">Packages</span>
                            <span class="chart-badge bg-purple-100 text-purple-600">Subscriptions</span>
                        </div>
                    </div>
                    <canvas id="revenue-chart" height="280"></canvas>
                </div>
                
                <!-- Revenue by Source -->
                <div class="chart-card animate-slide-up stagger-2">
                    <div class="chart-header">
                        <h3 class="chart-title flex items-center">
                            <i class="fas fa-chart-pie text-gold mr-2"></i>
                            Revenue Sources
                        </h3>
                    </div>
                    <canvas id="source-chart" height="200"></canvas>
                    <div class="mt-6 space-y-3">
                        <div class="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                                <span class="text-gray-700 font-medium">Consultations</span>
                            </div>
                            <span class="font-bold text-navy">€97,400</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                <span class="text-gray-700 font-medium">Packages</span>
                            </div>
                            <span class="font-bold text-navy">€89,143</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                                <span class="text-gray-700 font-medium">Subscriptions</span>
                            </div>
                            <span class="font-bold text-navy">€2,793</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Top Performers & Activity -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Top Doctors -->
                <div class="chart-card animate-slide-up">
                    <div class="chart-header">
                        <h3 class="chart-title flex items-center">
                            <i class="fas fa-trophy text-gold mr-2"></i>
                            Top Performing Doctors
                        </h3>
                        <a href="/care-team" class="text-gold text-sm font-semibold hover:underline">View All →</a>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="doctor-card">
                            <div class="doctor-avatar bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-navy">Dr. Friedrich Schmidt</h4>
                                <p class="text-sm text-gray-500 flex items-center">
                                    <i class="fas fa-stethoscope mr-1 text-xs"></i>
                                    Bariatric Surgery • 67 bookings
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">€34,500</p>
                                <div class="flex items-center justify-end text-sm">
                                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                                    <span class="text-gray-600">4.95</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="doctor-card">
                            <div class="doctor-avatar bg-gradient-to-br from-red-500 to-red-600 text-white">
                                <i class="fas fa-heartbeat"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-navy">Prof. Dr. Michael Richter</h4>
                                <p class="text-sm text-gray-500 flex items-center">
                                    <i class="fas fa-heart mr-1 text-xs"></i>
                                    Cardiology • 54 bookings
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">€28,750</p>
                                <div class="flex items-center justify-end text-sm">
                                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                                    <span class="text-gray-600">4.92</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="doctor-card">
                            <div class="doctor-avatar bg-gradient-to-br from-green-500 to-green-600 text-white">
                                <i class="fas fa-procedures"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-navy">Dr. Klaus Weber</h4>
                                <p class="text-sm text-gray-500 flex items-center">
                                    <i class="fas fa-magic mr-1 text-xs"></i>
                                    Plastic Surgery • 48 bookings
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">€22,500</p>
                                <div class="flex items-center justify-end text-sm">
                                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                                    <span class="text-gray-600">4.90</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="doctor-card">
                            <div class="doctor-avatar bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                                <i class="fas fa-bone"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-navy">Dr. Anna Becker</h4>
                                <p class="text-sm text-gray-500 flex items-center">
                                    <i class="fas fa-bone mr-1 text-xs"></i>
                                    Orthopedics • 42 bookings
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">€19,200</p>
                                <div class="flex items-center justify-end text-sm">
                                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                                    <span class="text-gray-600">4.88</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="chart-card animate-slide-up stagger-2">
                    <div class="chart-header">
                        <h3 class="chart-title flex items-center">
                            <i class="fas fa-bolt text-gold mr-2"></i>
                            Recent Activity
                        </h3>
                        <span class="text-xs text-gray-400">Live updates</span>
                    </div>
                    
                    <div class="space-y-2" id="activity-feed">
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-green-400 to-green-500 text-white">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">Payment received <span class="text-green-600 font-bold">€8,500</span></p>
                                <p class="text-sm text-gray-500">SelectCare+ Package • 5 minutes ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                                <i class="fas fa-calendar-plus"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">New consultation booked</p>
                                <p class="text-sm text-gray-500">Dr. Schmidt • Gastric Sleeve • 12 min ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-purple-400 to-purple-500 text-white">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">New patient registered</p>
                                <p class="text-sm text-gray-500">From Germany • Weight Loss Program • 23 min ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-yellow-400 to-amber-500 text-white">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">5-star review received</p>
                                <p class="text-sm text-gray-500">Prof. Dr. Richter • "Excellent care!" • 45 min ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">Affiliate conversion</p>
                                <p class="text-sm text-gray-500">€542 commission earned • HealthTours Partner • 1h ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-gradient-to-br from-teal-400 to-teal-500 text-white">
                                <i class="fas fa-video"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-navy font-medium">Video consultation completed</p>
                                <p class="text-sm text-gray-500">Dr. Becker • Follow-up • 2h ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Platform Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="metric-card-gradient bg-gradient-to-br from-navy to-navy-light animate-slide-up">
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold">Platform Fees</h3>
                            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <i class="fas fa-coins text-gold"></i>
                            </div>
                        </div>
                        <p class="text-4xl font-bold mb-2">€32,645</p>
                        <p class="text-gray-300 text-sm">17.5% of total revenue</p>
                        <div class="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
                            <span class="text-gray-300">Doctor Payouts</span>
                            <span class="text-gold font-semibold">€149,320</span>
                        </div>
                    </div>
                </div>
                
                <div class="metric-card-gradient bg-gradient-to-br from-green-500 to-emerald-600 animate-slide-up stagger-2">
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold">Lead Generation</h3>
                            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <p class="text-4xl font-bold mb-2">1,234</p>
                        <p class="text-green-100 text-sm">New leads this month</p>
                        <div class="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
                            <span class="text-green-100">Conversion Rate</span>
                            <span class="font-semibold">14.7%</span>
                        </div>
                    </div>
                </div>
                
                <div class="metric-card-gradient bg-gradient-to-br from-purple-500 to-purple-600 animate-slide-up stagger-3">
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold">Premium Subscriptions</h3>
                            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <i class="fas fa-crown"></i>
                            </div>
                        </div>
                        <p class="text-4xl font-bold mb-2">7</p>
                        <p class="text-purple-100 text-sm">Active premium doctors</p>
                        <div class="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
                            <span class="text-purple-100">MRR</span>
                            <span class="font-semibold">€2,793</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Links & Popular Packages -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Quick Links -->
                <div class="chart-card animate-slide-up">
                    <div class="chart-header">
                        <h3 class="chart-title flex items-center">
                            <i class="fas fa-rocket text-gold mr-2"></i>
                            Quick Actions
                        </h3>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <a href="/instant-connect" class="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all group">
                            <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-video text-white text-lg"></i>
                            </div>
                            <span class="text-sm font-semibold text-navy">Start Call</span>
                        </a>
                        <a href="/booking" class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all group">
                            <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-calendar-plus text-white text-lg"></i>
                            </div>
                            <span class="text-sm font-semibold text-navy">New Booking</span>
                        </a>
                        <a href="/medisense" class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all group">
                            <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-brain text-white text-lg"></i>
                            </div>
                            <span class="text-sm font-semibold text-navy">MediSense AI</span>
                        </a>
                        <a href="/calculators" class="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all group">
                            <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gold to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-calculator text-navy text-lg"></i>
                            </div>
                            <span class="text-sm font-semibold text-navy">Calculators</span>
                        </a>
                    </div>
                </div>
                
                <!-- Popular Packages -->
                <div class="lg:col-span-2 chart-card animate-slide-up stagger-2">
                    <div class="chart-header">
                        <h3 class="chart-title flex items-center">
                            <i class="fas fa-fire text-gold mr-2"></i>
                            Popular Packages
                        </h3>
                        <a href="/services" class="text-gold text-sm font-semibold hover:underline">View All →</a>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 rounded-2xl bg-gradient-to-r from-navy to-navy-light text-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='/services'">
                            <div class="absolute top-0 right-0 p-2">
                                <span class="px-2 py-1 bg-gold text-navy text-xs font-bold rounded-full">MOST POPULAR</span>
                            </div>
                            <div class="pt-4">
                                <h4 class="font-bold text-lg">Gastric Sleeve</h4>
                                <p class="text-gray-300 text-sm">Complete weight loss surgery package</p>
                                <div class="mt-4 flex items-end justify-between">
                                    <div>
                                        <p class="text-gold text-2xl font-bold">€5,500</p>
                                        <p class="text-gray-400 text-xs line-through">Germany: €22,000</p>
                                    </div>
                                    <span class="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                                        Save 75%
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-4 rounded-2xl border-2 border-gold bg-gradient-to-r from-cream to-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='/services'">
                            <div class="absolute top-0 right-0 p-2">
                                <span class="px-2 py-1 bg-navy text-white text-xs font-bold rounded-full">PREMIUM</span>
                            </div>
                            <div class="pt-4">
                                <h4 class="font-bold text-lg text-navy">SelectCare+ Package</h4>
                                <p class="text-gray-500 text-sm">21 days all-inclusive recovery</p>
                                <div class="mt-4 flex items-end justify-between">
                                    <div>
                                        <p class="text-gold text-2xl font-bold">€7,900</p>
                                        <p class="text-gray-400 text-xs">5-Star Red Sea Resort</p>
                                    </div>
                                    <span class="px-3 py-1 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
                                        Best Value
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Package Stats -->
                    <div class="mt-4 pt-4 border-t border-gray-100 grid grid-cols-4 gap-4 text-center">
                        <div>
                            <p class="text-2xl font-bold text-navy">487</p>
                            <p class="text-xs text-gray-500">Bookings</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-green-600">4.9</p>
                            <p class="text-xs text-gray-500">Avg Rating</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-navy">75%</p>
                            <p class="text-xs text-gray-500">Avg Savings</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-gold">98%</p>
                            <p class="text-xs text-gray-500">Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/" class="bottom-nav-item" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="bottom-nav-item" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="bottom-nav-item" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/care-team" class="bottom-nav-item" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="bottom-nav-item active" aria-label="Dashboard">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </a>
        </div>
    </nav>

    <script>
        // ═══════════════════════════════════════════════════════════════════
        // CHART.JS CONFIGURATION
        // ═══════════════════════════════════════════════════════════════════
        
        // Navy/Gold color scheme
        const colors = {
            navy: '#001F3F',
            navyLight: '#003366',
            gold: '#C9A227',
            goldLight: '#E8D5A3',
            blue: '#3B82F6',
            green: '#10B981',
            purple: '#8B5CF6'
        };
        
        // Revenue Chart
        const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Consultations',
                        data: [45000, 52000, 61000, 58000, 72000, 97400],
                        borderColor: colors.blue,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: colors.blue,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                    },
                    {
                        label: 'Packages',
                        data: [38000, 42000, 55000, 64000, 78000, 89143],
                        borderColor: colors.green,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: colors.green,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                    },
                    {
                        label: 'Subscriptions',
                        data: [1200, 1500, 1800, 2100, 2500, 2793],
                        borderColor: colors.purple,
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: colors.purple,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: colors.navy,
                        titleColor: colors.gold,
                        bodyColor: 'white',
                        padding: 12,
                        cornerRadius: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': €' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 31, 63, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            callback: value => '€' + (value/1000) + 'k',
                            color: '#6B7280',
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6B7280',
                            padding: 10
                        }
                    }
                }
            }
        });

        // Source Chart (Doughnut)
        const sourceCtx = document.getElementById('source-chart').getContext('2d');
        const sourceChart = new Chart(sourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Consultations', 'Packages', 'Subscriptions'],
                datasets: [{
                    data: [97400, 89143, 2793],
                    backgroundColor: [colors.blue, colors.green, colors.purple],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: colors.navy,
                        titleColor: colors.gold,
                        bodyColor: 'white',
                        padding: 12,
                        cornerRadius: 12,
                        callbacks: {
                            label: function(context) {
                                return '€' + context.parsed.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // ═══════════════════════════════════════════════════════════════════
        // DASHBOARD FUNCTIONS
        // ═══════════════════════════════════════════════════════════════════
        
        // Count up animation
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            if (!obj) return;
            
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                
                if (id.includes('revenue')) {
                    obj.textContent = '€' + value.toLocaleString();
                } else if (id.includes('conversion')) {
                    obj.textContent = value.toFixed(1) + '%';
                } else {
                    obj.textContent = value.toLocaleString();
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        // Initialize count animations
        setTimeout(() => {
            animateValue('hero-revenue', 0, 186543, 1500);
            animateValue('hero-bookings', 0, 487, 1500);
            animateValue('hero-patients', 0, 1247, 1500);
            animateValue('hero-conversion', 0, 68.5, 1500);
        }, 500);
        
        // Update period
        function updatePeriod(period) {
            console.log('Updating period to:', period);
            // Add loading state
            document.querySelectorAll('.stat-value').forEach(el => {
                el.classList.add('shimmer');
            });
            
            // Simulate API call
            setTimeout(() => {
                document.querySelectorAll('.stat-value').forEach(el => {
                    el.classList.remove('shimmer');
                });
                // Update values based on period
                // This would be replaced with actual API calls
            }, 1000);
        }
        
        // Export data
        function exportData() {
            // Show confetti celebration
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#C9A227', '#001F3F', '#10B981']
            });
            
            alert('Exporting dashboard data...');
        }
        
        // Toggle sidebar (mobile)
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }
        
        // Real-time data fetch
        async function fetchDashboardData() {
            try {
                const response = await fetch('/api/analytics/realtime');
                const data = await response.json();
                if (data.success) {
                    console.log('Real-time data:', data.data);
                    // Update UI with new data
                }
            } catch (error) {
                console.log('Using cached data');
            }
        }
        
        // Auto-refresh every 30 seconds
        setInterval(fetchDashboardData, 30000);
        fetchDashboardData();
        
        // Add live activity simulation
        function addActivity(type, message, time) {
            const feed = document.getElementById('activity-feed');
            const icons = {
                payment: { icon: 'fa-credit-card', bg: 'from-green-400 to-green-500' },
                booking: { icon: 'fa-calendar-plus', bg: 'from-blue-400 to-blue-500' },
                patient: { icon: 'fa-user-plus', bg: 'from-purple-400 to-purple-500' },
                review: { icon: 'fa-star', bg: 'from-yellow-400 to-amber-500' }
            };
            
            const item = document.createElement('div');
            item.className = 'activity-item animate-slide-up';
            item.innerHTML = \`
                <div class="activity-icon bg-gradient-to-br \${icons[type].bg} text-white">
                    <i class="fas \${icons[type].icon}"></i>
                </div>
                <div class="flex-1">
                    <p class="text-navy font-medium">\${message}</p>
                    <p class="text-sm text-gray-500">\${time}</p>
                </div>
            \`;
            
            feed.insertBefore(item, feed.firstChild);
            if (feed.children.length > 6) {
                feed.removeChild(feed.lastChild);
            }
        }
        
        // Simulate live activity
        const activities = [
            { type: 'payment', message: 'Payment received <span class="text-green-600 font-bold">€5,500</span>', time: 'Gastric Sleeve • Just now' },
            { type: 'booking', message: 'New consultation booked', time: 'Dr. Weber • Plastic Surgery • Just now' },
            { type: 'patient', message: 'New patient inquiry', time: 'From UK • Knee Replacement • Just now' },
            { type: 'review', message: '5-star review received', time: 'Dr. Schmidt • "Life changing!" • Just now' }
        ];
        
        let activityIndex = 0;
        setInterval(() => {
            const activity = activities[activityIndex % activities.length];
            addActivity(activity.type, activity.message, activity.time);
            activityIndex++;
        }, 15000);
    </script>
</body>
</html>`
}
