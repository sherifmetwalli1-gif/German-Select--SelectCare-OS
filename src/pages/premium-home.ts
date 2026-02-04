/**
 * SelectCareOS™ Premium Home Dashboard
 * World-Class Patient Dashboard with Integrated Monetization
 * Enhanced for daily life applications, engagement & conversion
 * 
 * Multi-language support: EN, AR, DE, FR
 */

import { LANGUAGE_CONFIG, DASHBOARD_TRANSLATIONS, type SupportedLanguage } from '../services/dashboard-i18n'

// Helper function for translations
const t = (key: string, lang: SupportedLanguage) => DASHBOARD_TRANSLATIONS[lang]?.[key] || DASHBOARD_TRANSLATIONS.en[key] || key
const getDir = (lang: SupportedLanguage) => LANGUAGE_CONFIG[lang]?.dir || 'ltr'

// Premium Home Dashboard with full monetization ecosystem
export const premiumHomePage = (userTier: string = 'plus', lang: SupportedLanguage = 'en') => {
  const isPremium = userTier !== 'free';
  const locale = LANGUAGE_CONFIG[lang]?.locale || 'en-US';
  const currentDate = new Date().toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' });
  const dir = getDir(lang);
  const langOptions = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${config.flag} ${config.nativeName}</option>`)
    .join('');
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SelectCareOS™ - Your Health Command Center</title>
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
            --cream: #F8F6F0;
        }
        
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--cream);
            min-height: 100vh;
            padding-bottom: 100px;
            overscroll-behavior: none;
        }
        
        /* Premium Design System */
        .bg-navy { background-color: var(--navy); }
        .bg-navy-light { background-color: var(--navy-light); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .border-gold { border-color: var(--gold); }
        
        .gradient-navy { background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%); }
        .gradient-gold { background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 50%, var(--gold-light) 100%); }
        .gradient-premium { background: linear-gradient(135deg, #001F3F 0%, #003366 50%, #004080 100%); }
        
        /* Card System */
        .card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 4px 24px rgba(0, 31, 63, 0.08);
            transition: all 0.3s ease;
        }
        
        .card:active { transform: scale(0.98); }
        
        .card-premium {
            background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
            border-radius: 20px;
        }
        
        .card-glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
        }
        
        /* Progress Components */
        .progress-ring { transform: rotate(-90deg); }
        .progress-ring-circle { transition: stroke-dashoffset 0.8s ease; }
        
        .progress-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        /* Status Indicators */
        .pulse-dot {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .streak-flame { animation: flicker 0.5s infinite alternate; }
        @keyframes flicker { from { opacity: 0.8; } to { opacity: 1; } }
        
        /* Navigation */
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
            transition: all 0.2s;
            border-radius: 12px;
        }
        
        .nav-item:hover { color: var(--navy); background: rgba(0, 31, 63, 0.05); }
        .nav-item.active { color: var(--gold); background: rgba(201, 162, 39, 0.1); }
        .nav-item i { font-size: 24px; }
        
        /* Buttons */
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            padding: 14px 28px;
            border-radius: 14px;
            font-weight: 600;
            transition: all 0.2s;
            box-shadow: 0 4px 14px rgba(201, 162, 39, 0.3);
        }
        
        .btn-gold:active { transform: scale(0.98); background: #B8922A; }
        
        .btn-navy {
            background: var(--navy);
            color: white;
            padding: 14px 28px;
            border-radius: 14px;
            font-weight: 600;
        }
        
        /* Metrics Grid */
        .metric-card {
            background: white;
            border-radius: 16px;
            padding: 16px;
            text-align: center;
            transition: transform 0.2s;
        }
        
        .metric-card:active { transform: scale(0.96); }
        
        .metric-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
        }
        
        /* Quick Actions */
        .quick-action {
            background: white;
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            transition: all 0.2s;
            border: 2px solid transparent;
        }
        
        .quick-action:hover { border-color: var(--gold); transform: translateY(-2px); }
        .quick-action:active { transform: scale(0.98); }
        
        /* Floating Elements */
        .floating-action {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: var(--gold);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--navy);
            font-size: 24px;
            box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
            z-index: 50;
            transition: all 0.2s;
        }
        
        .floating-action:active { transform: scale(0.95); }
        
        /* Scrolling */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Tier Badges */
        .tier-free { background: #6B7280; color: white; }
        .tier-basic { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; }
        .tier-plus { background: linear-gradient(135deg, var(--gold), #D4AF37); color: var(--navy); }
        .tier-elite { background: linear-gradient(135deg, #000000, #1a1a2e); color: var(--gold); border: 2px solid var(--gold); }
        
        /* Animations */
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-up { animation: slideUp 0.5s ease forwards; }
        
        @keyframes countUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Gamification */
        .points-badge {
            background: linear-gradient(135deg, var(--gold) 0%, #FFD700 100%);
            color: var(--navy);
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(201, 162, 39, 0.3);
        }
        
        .streak-badge {
            background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 12px;
        }
        
        /* Premium Lock Overlay */
        .premium-lock {
            position: relative;
            overflow: hidden;
        }
        
        .premium-lock::after {
            content: '🔒 Plus';
            position: absolute;
            top: 8px;
            right: 8px;
            background: var(--gold);
            color: var(--navy);
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 700;
        }
        
        .premium-lock.locked { filter: blur(2px); pointer-events: none; }
    </style>
</head>
<body>
    <!-- Premium Header with User Status -->
    <header class="gradient-premium px-5 pt-12 pb-6">
        <!-- Top Bar -->
        <div class="flex justify-between items-center mb-5">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 gradient-gold rounded-full flex items-center justify-center text-navy font-bold text-lg">
                    SM
                </div>
                <div>
                    <p class="text-white/60 text-xs">${currentDate}</p>
                    <h2 class="text-white font-bold text-lg">${t('welcome.back', lang)} Sherif</h2>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <!-- Language Selector -->
                <select id="languageSelect" onchange="changeLanguage(this.value)" 
                        class="appearance-none bg-white/10 text-white px-3 py-1.5 pr-8 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition border border-white/20">
                    ${langOptions}
                </select>
                <!-- SelectPoints Badge -->
                <a href="/rewards?lang=${lang}" class="points-badge flex items-center gap-1">
                    <i class="fas fa-coins"></i>
                    <span>8,450</span>
                </a>
                <!-- Notifications -->
                <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white relative" title="${t('header.notifications', lang)}">
                    <i class="fas fa-bell"></i>
                    <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
                </button>
            </div>
        </div>
        
        <!-- Subscription Status -->
        <div class="card-glass p-3 mb-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <span class="tier-plus px-3 py-1 rounded-full text-xs font-bold">
                        <i class="fas fa-crown mr-1"></i>PLUS
                    </span>
                    <div>
                        <p class="text-white text-sm font-medium">SelectCare ${t('premium.plus', lang)} ${t('premium.patient', lang)}</p>
                        <p class="text-white/60 text-xs">${t('premium.doublePoints', lang)} ${t('premium.earning', lang)}</p>
                    </div>
                </div>
                <a href="/subscription" class="text-gold text-xs font-bold">
                    <i class="fas fa-arrow-up mr-1"></i>Elite
                </a>
            </div>
        </div>
        
        <!-- Recovery Status Card -->
        <div class="card-premium p-5">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-heartbeat text-navy"></i>
                </div>
                <div>
                    <p class="text-navy font-bold">${t('premium.postOp', lang).toUpperCase()} ${t('premium.recovery', lang).toUpperCase()}</p>
                    <p class="text-navy/70 text-sm">${t('premium.day', lang)} 14 • ${t('journey.week', lang)} 2 ${t('journey.of', lang)} 6</p>
                </div>
            </div>
            
            <!-- Progress Ring & Stats -->
            <div class="flex items-center gap-5">
                <div class="relative w-24 h-24">
                    <svg class="progress-ring w-24 h-24" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,31,63,0.2)" stroke-width="8"/>
                        <circle class="progress-ring-circle" cx="50" cy="50" r="42" fill="none" stroke="#001F3F" stroke-width="8" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="66"/>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-navy text-2xl font-bold">75%</span>
                        <span class="text-navy/60 text-xs">Complete</span>
                    </div>
                </div>
                
                <div class="flex-1 space-y-2">
                    <div>
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-navy/80">${t('premium.physicalRecovery', lang)}</span>
                            <span class="text-navy font-bold">82%</span>
                        </div>
                        <div class="progress-bar bg-navy/10">
                            <div class="progress-fill bg-navy" style="width: 82%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-navy/80">${t('premium.weightGoal', lang)}</span>
                            <span class="text-navy font-bold">68%</span>
                        </div>
                        <div class="progress-bar bg-navy/10">
                            <div class="progress-fill bg-navy" style="width: 68%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Milestone Alert -->
            <div class="mt-4 bg-white/30 rounded-xl p-3 flex items-center gap-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-check text-white text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-navy text-sm font-medium">${t('premium.milestone', lang)} 25% ${t('premium.fasterThanAvg', lang)}</p>
                    <p class="text-navy/60 text-xs">+100 ${t('premium.selectPoints', lang)} ${t('premium.earned', lang)}</p>
                </div>
            </div>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- TREATMENTS - Prioritized Section -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-procedures text-gold mr-2"></i>${t('treatments.title', lang)}
                </h2>
                <a href="/services?lang=${lang}" class="text-gold text-sm font-bold">${t('treatments.viewAll', lang)}</a>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <!-- Bariatric Surgery -->
                <a href="/services?category=bariatric&lang=${lang}" class="card p-4 hover:border-gold hover:border transition-all group">
                    <div class="w-12 h-12 bg-gradient-to-br from-gold/20 to-amber-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <i class="fas fa-weight text-gold text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy text-sm">${t('treatments.bariatric', lang)}</h4>
                    <p class="text-xs text-gray-500 mt-1">${t('treatments.bariatricDesc', lang)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-60% ${t('treatments.cost', lang)}</span>
                    </div>
                </a>
                
                <!-- Orthopedic -->
                <a href="/services?category=orthopedic&lang=${lang}" class="card p-4 hover:border-gold hover:border transition-all group">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <i class="fas fa-bone text-blue-600 text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy text-sm">${t('treatments.orthopedic', lang)}</h4>
                    <p class="text-xs text-gray-500 mt-1">${t('treatments.orthopedicDesc', lang)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-55% ${t('treatments.cost', lang)}</span>
                    </div>
                </a>
                
                <!-- Cosmetic Surgery -->
                <a href="/services?category=cosmetic&lang=${lang}" class="card p-4 hover:border-gold hover:border transition-all group">
                    <div class="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <i class="fas fa-star text-pink-500 text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy text-sm">${t('treatments.cosmetic', lang)}</h4>
                    <p class="text-xs text-gray-500 mt-1">${t('treatments.cosmeticDesc', lang)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-50% ${t('treatments.cost', lang)}</span>
                    </div>
                </a>
                
                <!-- Dental -->
                <a href="/services?category=dental&lang=${lang}" class="card p-4 hover:border-gold hover:border transition-all group">
                    <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <i class="fas fa-tooth text-emerald-600 text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy text-sm">${t('treatments.dental', lang)}</h4>
                    <p class="text-xs text-gray-500 mt-1">${t('treatments.dentalDesc', lang)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-65% ${t('treatments.cost', lang)}</span>
                    </div>
                </a>
            </div>
            
            <!-- Featured Treatment Banner -->
            <div class="card mt-4 p-4 bg-gradient-to-r from-navy to-blue-900 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gold rounded-xl flex items-center justify-center">
                        <i class="fas fa-fire-alt text-navy text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <span class="text-xs bg-gold text-navy px-2 py-0.5 rounded-full font-bold">${t('treatments.popular', lang)}</span>
                        <h4 class="font-bold text-white mt-1">${t('treatments.gastricSleeve', lang)}</h4>
                        <p class="text-white/70 text-xs">${t('treatments.gastricSleeveDesc', lang)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-gold text-lg font-bold">€4,500</p>
                        <p class="text-white/50 text-xs line-through">€12,000</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Daily Streak & Points Summary -->
        <div class="flex gap-3">
            <a href="/rewards" class="card flex-1 p-4 flex items-center gap-3">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-fire text-orange-500 text-xl streak-flame"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-navy">14</p>
                    <p class="text-xs text-gray-500">${t('premium.dayStreak', lang)}</p>
                </div>
            </a>
            
            <a href="/daily-wellness" class="card flex-1 p-4 flex items-center gap-3">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-tasks text-green-600 text-xl"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-navy">4/7</p>
                    <p class="text-xs text-gray-500">${t('premium.dailyTasks', lang)}</p>
                </div>
            </a>
        </div>
        
        <!-- Real-Time Health Metrics -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-heartbeat text-gold mr-2"></i>${t('premium.liveMetrics', lang)}
                </h2>
                <span class="text-xs text-green-600 flex items-center gap-1">
                    <span class="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                    ${t('premium.synced', lang)} 2m ${t('premium.ago', lang)}
                </span>
            </div>
            
            <div class="grid grid-cols-3 gap-3">
                <!-- Heart Rate -->
                <div class="metric-card">
                    <div class="metric-icon bg-red-100">
                        <i class="fas fa-heartbeat text-red-500 text-lg"></i>
                    </div>
                    <p class="text-2xl font-bold text-navy">72</p>
                    <p class="text-xs text-gray-500">${t('stats.heartRate', lang)}</p>
                    <p class="text-xs text-green-600 mt-1">${t('stats.normal', lang)}</p>
                </div>
                
                <!-- Blood Pressure -->
                <div class="metric-card">
                    <div class="metric-icon bg-blue-100">
                        <i class="fas fa-tint text-blue-500 text-lg"></i>
                    </div>
                    <p class="text-2xl font-bold text-navy">120/80</p>
                    <p class="text-xs text-gray-500">BP</p>
                    <p class="text-xs text-green-600 mt-1">Optimal</p>
                </div>
                
                <!-- Weight -->
                <div class="metric-card">
                    <div class="metric-icon bg-purple-100">
                        <i class="fas fa-weight text-purple-500 text-lg"></i>
                    </div>
                    <p class="text-2xl font-bold text-navy">-8kg</p>
                    <p class="text-xs text-gray-500">Progress</p>
                    <p class="text-xs text-green-600 mt-1">On track</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mt-3">
                <!-- Steps -->
                <div class="metric-card">
                    <div class="flex items-center justify-between mb-2">
                        <div class="metric-icon bg-green-100" style="margin:0;width:36px;height:36px;">
                            <i class="fas fa-walking text-green-600"></i>
                        </div>
                        <span class="text-xs text-gold font-bold">+25 pts</span>
                    </div>
                    <div class="text-left">
                        <p class="text-xl font-bold text-navy">6,847</p>
                        <p class="text-xs text-gray-500">Steps • 68% of goal</p>
                        <div class="progress-bar bg-green-100 mt-2">
                            <div class="progress-fill bg-green-500" style="width: 68%"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Sleep -->
                <div class="metric-card">
                    <div class="flex items-center justify-between mb-2">
                        <div class="metric-icon bg-indigo-100" style="margin:0;width:36px;height:36px;">
                            <i class="fas fa-moon text-indigo-600"></i>
                        </div>
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Great</span>
                    </div>
                    <div class="text-left">
                        <p class="text-xl font-bold text-navy">7h 32m</p>
                        <p class="text-xs text-gray-500">Deep: 2h 15m • REM: 1h 45m</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- AI Health Insight - Premium Modern Design -->
        <a href="/medisense" class="block card p-5 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-amber-200/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div class="flex items-start gap-4 relative">
                <div class="relative flex-shrink-0">
                    <!-- Ultra-modern AI Icon -->
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold via-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-gold/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <svg class="w-7 h-7 text-navy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Sparkle/AI Magic Icon -->
                            <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                    </div>
                    <!-- Animated pulse ring -->
                    <div class="absolute inset-0 rounded-2xl border-2 border-gold/50 animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="font-bold text-navy text-lg">AI Health Insight</h3>
                        <span class="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-gold to-amber-500 text-white rounded-full shadow-sm">
                            ✨ Daily
                        </span>
                    </div>
                    <p class="text-sm text-gray-700 leading-relaxed">Your recovery is <strong class="text-emerald-600">25% ahead of schedule</strong>. Consider increasing protein intake by <strong class="text-navy">10g</strong> for optimal muscle recovery. Your sleep quality has improved <strong class="text-gold">15%</strong> this week!</p>
                    <div class="flex items-center gap-4 mt-4">
                        <div class="flex items-center gap-2 text-gold font-bold text-sm group-hover:text-amber-600 transition-colors">
                            <span>Explore AI Analysis</span>
                            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </div>
                        <div class="flex items-center gap-1 text-xs text-gray-400">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                            </svg>
                            <span>42/50 queries left</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        
        <!-- Today's Appointments -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-calendar-check text-gold mr-2"></i>Today's Schedule
                </h2>
                <a href="/booking" class="text-gold text-sm font-bold">+ Book</a>
            </div>
            
            <div class="card bg-navy p-4 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-video text-gold text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-xs text-gold font-bold">IN 2 HOURS</p>
                        <h3 class="text-white font-bold">Cardiology Follow-up</h3>
                        <div class="flex items-center gap-2 mt-1">
                            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-xs text-navy font-bold">KM</div>
                            <span class="text-white/70 text-sm">Dr. K. Müller</span>
                        </div>
                    </div>
                    <button class="bg-gold text-navy px-4 py-2 rounded-xl font-bold text-sm">
                        Join Call
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions Grid -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-bolt text-gold mr-2"></i>Quick Actions
            </h2>
            
            <div class="grid grid-cols-4 gap-3">
                <a href="/telemedicine" class="quick-action">
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-video text-blue-600 text-lg"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">Video Call</p>
                </a>
                
                <a href="/booking" class="quick-action">
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-calendar-plus text-green-600 text-lg"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">Book</p>
                </a>
                
                <a href="/ai-concierge" class="quick-action">
                    <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-robot text-purple-600 text-lg"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">AI Chat</p>
                </a>
                
                <a href="/emergency" class="quick-action" style="border-color: #FEE2E2;">
                    <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-phone-alt text-red-600 text-lg"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">Emergency</p>
                </a>
            </div>
        </div>
        
        <!-- Daily Wellness Tasks with Points -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-check-circle text-gold mr-2"></i>Daily Tasks
                </h2>
                <span class="text-xs text-gray-500">Earn up to 155 pts</span>
            </div>
            
            <div class="card overflow-hidden">
                <div class="p-4 flex items-center gap-4 border-b">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-sm"></i>
                    </div>
                    <span class="flex-1 text-navy">Morning medications</span>
                    <span class="text-gold text-sm font-bold">+30 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 border-b">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-sm"></i>
                    </div>
                    <span class="flex-1 text-navy line-through opacity-60">Log breakfast</span>
                    <span class="text-green-600 text-sm font-bold">✓ Done</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 border-b bg-gold/5">
                    <div class="w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-tint text-gold text-sm"></i>
                    </div>
                    <span class="flex-1 text-navy">Drink 8 glasses water</span>
                    <span class="text-gold text-sm font-bold">+10 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4">
                    <div class="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                    <span class="flex-1 text-gray-500">Log blood pressure</span>
                    <span class="text-gray-400 text-sm font-bold">+20 pts</span>
                </div>
            </div>
            
            <a href="/daily-wellness" class="block text-center text-gold text-sm font-bold mt-3">
                View All Tasks →
            </a>
        </div>
        
        <!-- Marketplace Recommendations -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-star text-gold mr-2"></i>Recommended for You
                </h2>
                <a href="/marketplace" class="text-gold text-sm font-bold">Shop All</a>
            </div>
            
            <div class="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
                <!-- Product 1 -->
                <div class="card flex-shrink-0 w-40 overflow-hidden">
                    <div class="h-28 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center relative">
                        <i class="fas fa-sun text-yellow-600 text-4xl"></i>
                        <span class="absolute top-2 left-2 text-xs bg-gold text-navy px-2 py-0.5 rounded-full font-bold">DR. PICK</span>
                    </div>
                    <div class="p-3">
                        <h4 class="font-bold text-navy text-sm">Vitamin D3+K2</h4>
                        <p class="text-xs text-gray-500">Recovery support</p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€29</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Product 2 -->
                <div class="card flex-shrink-0 w-40 overflow-hidden">
                    <div class="h-28 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <i class="fas fa-fish text-blue-600 text-4xl"></i>
                    </div>
                    <div class="p-3">
                        <h4 class="font-bold text-navy text-sm">Omega-3 Fish Oil</h4>
                        <p class="text-xs text-gray-500">Heart health</p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€34</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Product 3 -->
                <div class="card flex-shrink-0 w-40 overflow-hidden">
                    <div class="h-28 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <i class="fas fa-leaf text-green-600 text-4xl"></i>
                    </div>
                    <div class="p-3">
                        <h4 class="font-bold text-navy text-sm">Magnesium</h4>
                        <p class="text-xs text-gray-500">Sleep & recovery</p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="font-bold text-navy">€24</span>
                            <button class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-plus text-navy text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bundle Upsell -->
            <div class="card mt-4 p-4 bg-gradient-to-r from-gold/10 to-yellow-50 border border-gold/30">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gold rounded-xl flex items-center justify-center">
                        <i class="fas fa-box-open text-navy text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-navy">Recovery Essentials Bundle</h4>
                        <p class="text-xs text-gray-500">All 3 supplements for €79 (Save €8)</p>
                        <p class="text-xs text-gold font-bold mt-1">+ Earn 395 SelectPoints</p>
                    </div>
                    <button class="bg-gold text-navy px-4 py-2 rounded-lg font-bold text-sm">Add</button>
                </div>
            </div>
        </div>
        
        <!-- Your Care Team -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-user-md text-gold mr-2"></i>Your Care Team
                </h2>
                <a href="/doctors" class="text-gold text-sm font-bold">View All</a>
            </div>
            
            <div class="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
                <!-- Doctor 1 -->
                <div class="card flex-shrink-0 w-32 p-4 text-center">
                    <div class="w-14 h-14 bg-navy rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">HF</div>
                    <h4 class="font-bold text-navy text-sm">Dr. Fischer</h4>
                    <p class="text-xs text-gray-500">Surgery</p>
                    <div class="flex items-center justify-center gap-1 mt-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-xs text-green-600">Online</span>
                    </div>
                </div>
                
                <!-- Doctor 2 -->
                <div class="card flex-shrink-0 w-32 p-4 text-center">
                    <div class="w-14 h-14 bg-gold rounded-full flex items-center justify-center mx-auto mb-2 text-navy font-bold">AS</div>
                    <h4 class="font-bold text-navy text-sm">Dr. Schmidt</h4>
                    <p class="text-xs text-gray-500">Nutrition</p>
                    <div class="flex items-center justify-center gap-1 mt-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-xs text-green-600">Online</span>
                    </div>
                </div>
                
                <!-- Doctor 3 -->
                <div class="card flex-shrink-0 w-32 p-4 text-center">
                    <div class="w-14 h-14 bg-navy rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">KM</div>
                    <h4 class="font-bold text-navy text-sm">Dr. Müller</h4>
                    <p class="text-xs text-gray-500">Cardiology</p>
                    <div class="flex items-center justify-center gap-1 mt-2">
                        <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span class="text-xs text-yellow-600">Busy</span>
                    </div>
                </div>
                
                <!-- Add Specialist -->
                <a href="/doctors" class="card flex-shrink-0 w-32 p-4 text-center border-2 border-dashed border-gold/50">
                    <div class="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-plus text-gold text-xl"></i>
                    </div>
                    <p class="text-xs font-medium text-gold">Add Specialist</p>
                </a>
            </div>
        </div>
        
        <!-- Wellness Programs Upsell -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-spa text-gold mr-2"></i>Enhance Your Recovery
            </h2>
            
            <div class="card bg-gradient-to-r from-navy to-blue-900 p-5 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="relative">
                    <span class="text-xs bg-gold text-navy px-3 py-1 rounded-full font-bold">EXCLUSIVE</span>
                    <h3 class="text-xl font-bold mt-3">Red Sea Recovery Retreat</h3>
                    <p class="text-white/70 text-sm mt-1">7 days of therapeutic wellness in Hurghada</p>
                    <div class="flex items-center gap-3 mt-3">
                        <span class="text-gold text-2xl font-bold">€2,500</span>
                        <span class="text-white/50 line-through">€3,200</span>
                        <span class="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 22%</span>
                    </div>
                    <div class="flex items-center gap-2 mt-4">
                        <button class="bg-gold text-navy px-6 py-2 rounded-xl font-bold text-sm">Learn More</button>
                        <span class="text-xs text-white/60">+ 12,500 SelectPoints</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Family Hub Teaser (Plus Feature) -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-users text-gold mr-2"></i>Family Health Hub
            </h2>
            
            <div class="card p-4">
                <div class="flex items-center gap-4 mb-4">
                    <div class="flex -space-x-2">
                        <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">SM</div>
                        <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">SD</div>
                        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">MD</div>
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm border-2 border-white">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-navy">3 Family Members</h4>
                        <p class="text-xs text-gray-500">Plus plan includes up to 4</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                    <div class="text-center p-2 bg-green-50 rounded-xl">
                        <p class="text-lg font-bold text-green-600">3/3</p>
                        <p class="text-xs text-gray-500">Healthy</p>
                    </div>
                    <div class="text-center p-2 bg-blue-50 rounded-xl">
                        <p class="text-lg font-bold text-blue-600">2</p>
                        <p class="text-xs text-gray-500">Appointments</p>
                    </div>
                    <div class="text-center p-2 bg-gold/10 rounded-xl">
                        <p class="text-lg font-bold text-gold">24,450</p>
                        <p class="text-xs text-gray-500">Family Pts</p>
                    </div>
                </div>
                
                <a href="/family" class="block text-center text-gold text-sm font-bold mt-4">
                    Manage Family →
                </a>
            </div>
        </div>
        
        <!-- Referral Program -->
        <div class="card bg-gradient-to-r from-gold/10 to-yellow-50 p-5 border border-gold/30">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
                    <i class="fas fa-gift text-navy text-xl"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-navy">${t('referral.title', lang)}</h3>
                    <p class="text-sm text-gray-600">${t('referral.desc', lang)} €50 + 1,000 ${t('nav.rewards', lang).toLowerCase()} ${t('referral.each', lang)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <code class="bg-white px-3 py-1 rounded-lg text-navy font-mono font-bold text-sm">SHERIF2024</code>
                        <button class="text-gold text-sm"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gold/20 flex justify-between items-center">
                <span class="text-sm text-gray-600"><strong>3</strong> ${t('referral.friends', lang)}</span>
                <span class="text-gold font-bold">€150 + 3,000 pts ${t('referral.earned', lang)}</span>
            </div>
        </div>
    </main>
    
    <!-- Floating AI Button -->
    <a href="/ai-concierge" class="floating-action">
        <i class="fas fa-robot"></i>
    </a>
    
    <!-- Bottom Navigation - Icons Only -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/?lang=${lang}" class="nav-item active" title="${t('nav.home', lang)}">
                <i class="fas fa-home text-2xl"></i>
            </a>
            <a href="/services?lang=${lang}" class="nav-item" title="${t('treatments.title', lang)}">
                <i class="fas fa-procedures text-2xl"></i>
            </a>
            <a href="/daily-wellness?lang=${lang}" class="nav-item" title="${t('nav.wellness', lang)}">
                <i class="fas fa-heart text-2xl"></i>
            </a>
            <a href="/rewards?lang=${lang}" class="nav-item" title="${t('nav.rewards', lang)}">
                <i class="fas fa-coins text-2xl"></i>
            </a>
            <a href="/patient-dashboard?lang=${lang}" class="nav-item" title="${t('nav.profile', lang)}">
                <i class="fas fa-user text-2xl"></i>
            </a>
        </div>
    </nav>
    
    <script>
        // Language change function
        function changeLanguage(lang) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            localStorage.setItem('selectcare-language', lang);
            window.location.href = url.toString();
        }
        
        // Real-time metric updates simulation
        function updateMetrics() {
            // Update heart rate with slight variation
            const hrElement = document.querySelector('.metric-card:first-child .text-2xl');
            if (hrElement) {
                const baseHR = 72;
                hrElement.textContent = baseHR + Math.floor(Math.random() * 4) - 2;
            }
        }
        
        // Update every 30 seconds
        setInterval(updateMetrics, 30000);
        
        // Points animation on load
        document.addEventListener('DOMContentLoaded', () => {
            const pointsBadge = document.querySelector('.points-badge span:last-child');
            if (pointsBadge) {
                let points = 0;
                const target = 8450;
                const duration = 1000;
                const steps = 30;
                const increment = target / steps;
                
                const counter = setInterval(() => {
                    points += increment;
                    if (points >= target) {
                        pointsBadge.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        pointsBadge.textContent = Math.floor(points).toLocaleString();
                    }
                }, duration / steps);
            }
        });
    </script>
</body>
</html>`;
};
