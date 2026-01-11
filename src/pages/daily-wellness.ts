/**
 * SelectCareOS™ Daily Wellness Hub
 * Daily Life Applications with Monetization Hooks
 * Multi-language support: EN, AR, DE, FR
 */

import { LANGUAGE_CONFIG, t, getDir, type SupportedLanguage } from '../services/app-i18n'

export const dailyWellnessPage = (lang: SupportedLanguage = 'en') => {
  const dir = getDir(lang)
  const langOptions = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${config.flag} ${config.nativeName}</option>`)
    .join('')
  const locale = LANGUAGE_CONFIG[lang]?.locale || 'en-US'
  const today = new Date().toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })
  
  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Wellness - SelectCareOS™</title>
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
        .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08); }
        .progress-ring { transform: rotate(-90deg); }
        .metric-card { transition: transform 0.2s; }
        .metric-card:hover { transform: scale(1.02); }
        .water-drop { background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%); }
        .sleep-gradient { background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); }
        .steps-gradient { background: linear-gradient(135deg, #10B981 0%, #059669 100%); }
        .nutrition-gradient { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); }
        .checklist-item { transition: all 0.2s; }
        .checklist-item.completed { opacity: 0.6; }
        .checklist-item.completed span { text-decoration: line-through; }
        .habit-ring { stroke-dasharray: 100; transition: stroke-dashoffset 0.5s; }
        .meal-card:hover { transform: translateY(-2px); transition: transform 0.2s; }
    </style>
</head>
<body>
    <!-- Header with Date -->
    <header class="bg-navy px-5 pt-12 pb-6">
        <div class="flex justify-between items-center mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
            <a href="/?lang=${lang}" class="text-gold"><i class="fas fa-arrow-${dir === 'rtl' ? 'right' : 'left'} ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('btn.back', lang)}</a>
            <select id="languageSelect" onchange="changeLanguage(this.value)" 
                    class="appearance-none bg-white/10 text-white px-2 py-1 rounded-lg text-sm cursor-pointer border border-white/20">
                ${langOptions}
            </select>
        </div>
        <div class="text-center">
            <p class="text-gold text-sm">${t('time.today', lang)}</p>
            <h1 class="text-white text-2xl font-bold">${today}</h1>
            <p class="text-white/60 text-sm mt-1">${t('wellness.streak', lang)}: 14 ${t('time.days', lang)}</p>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Daily Health Score -->
        <div class="card p-5">
            <div class="flex items-center justify-between mb-4">
                <h2 class="font-bold text-navy">${t('wellness.title', lang)}</h2>
                <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">+5 from yesterday</span>
            </div>
            <div class="flex items-center gap-6">
                <div class="relative w-28 h-28">
                    <svg class="progress-ring w-28 h-28" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="10"/>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#C9A227" stroke-width="10" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="57"/>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-3xl font-bold text-navy">80</span>
                        <span class="text-xs text-gray-500">/ 100</span>
                    </div>
                </div>
                <div class="flex-1 space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Sleep Quality</span>
                        <span class="text-green-600 font-bold">92%</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Activity</span>
                        <span class="text-yellow-600 font-bold">68%</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Nutrition</span>
                        <span class="text-green-600 font-bold">85%</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Hydration</span>
                        <span class="text-red-500 font-bold">55%</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Metrics Grid -->
        <div class="grid grid-cols-2 gap-4">
            <!-- Water Intake -->
            <div class="card p-4 metric-card">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 water-drop rounded-full flex items-center justify-center">
                        <i class="fas fa-tint text-white"></i>
                    </div>
                    <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+10 pts</span>
                </div>
                <h3 class="font-bold text-navy text-lg">1.1L / 2.5L</h3>
                <p class="text-xs text-gray-500">Water intake</p>
                <div class="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div class="h-full water-drop" style="width: 44%"></div>
                </div>
                <button class="mt-3 w-full text-blue-600 text-sm font-medium">
                    <i class="fas fa-plus mr-1"></i>Log Water
                </button>
            </div>
            
            <!-- Steps -->
            <div class="card p-4 metric-card">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 steps-gradient rounded-full flex items-center justify-center">
                        <i class="fas fa-walking text-white"></i>
                    </div>
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+25 pts</span>
                </div>
                <h3 class="font-bold text-navy text-lg">6,847 / 10,000</h3>
                <p class="text-xs text-gray-500">Steps today</p>
                <div class="mt-2 h-2 bg-green-100 rounded-full overflow-hidden">
                    <div class="h-full steps-gradient" style="width: 68%"></div>
                </div>
                <p class="mt-3 text-green-600 text-xs font-medium text-center">3,153 steps to goal!</p>
            </div>
            
            <!-- Sleep -->
            <div class="card p-4 metric-card">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 sleep-gradient rounded-full flex items-center justify-center">
                        <i class="fas fa-moon text-white"></i>
                    </div>
                    <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Great!</span>
                </div>
                <h3 class="font-bold text-navy text-lg">7h 32m</h3>
                <p class="text-xs text-gray-500">Last night's sleep</p>
                <div class="flex items-center gap-2 mt-2">
                    <span class="text-xs text-gray-500">Deep: 2h 15m</span>
                    <span class="text-xs text-gray-500">REM: 1h 45m</span>
                </div>
                <button class="mt-3 w-full text-purple-600 text-sm font-medium">View Sleep Report</button>
            </div>
            
            <!-- Calories -->
            <div class="card p-4 metric-card">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 nutrition-gradient rounded-full flex items-center justify-center">
                        <i class="fas fa-fire text-white"></i>
                    </div>
                    <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">+15 pts</span>
                </div>
                <h3 class="font-bold text-navy text-lg">1,450 / 1,800</h3>
                <p class="text-xs text-gray-500">Calories consumed</p>
                <div class="mt-2 h-2 bg-yellow-100 rounded-full overflow-hidden">
                    <div class="h-full nutrition-gradient" style="width: 80%"></div>
                </div>
                <button class="mt-3 w-full text-yellow-600 text-sm font-medium">
                    <i class="fas fa-plus mr-1"></i>Log Meal
                </button>
            </div>
        </div>
        
        <!-- Today's Meal Plan -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy">Today's Meal Plan</h2>
                <a href="/meal-plans" class="text-gold text-sm">Customize</a>
            </div>
            
            <div class="space-y-3">
                <!-- Breakfast -->
                <div class="card p-4 meal-card cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-sun text-orange-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs text-gray-500">7:00 AM</span>
                                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                            </div>
                            <h4 class="font-bold text-navy">Breakfast</h4>
                            <p class="text-sm text-gray-500">Greek yogurt with berries, granola</p>
                            <p class="text-xs text-gray-400 mt-1">380 cal • 22g protein</p>
                        </div>
                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                    </div>
                </div>
                
                <!-- Lunch -->
                <div class="card p-4 meal-card cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-leaf text-green-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs text-gray-500">12:30 PM</span>
                                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                            </div>
                            <h4 class="font-bold text-navy">Lunch</h4>
                            <p class="text-sm text-gray-500">Grilled chicken salad, quinoa</p>
                            <p class="text-xs text-gray-400 mt-1">520 cal • 35g protein</p>
                        </div>
                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                    </div>
                </div>
                
                <!-- Snack -->
                <div class="card p-4 meal-card cursor-pointer border-2 border-gold/30">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-apple-alt text-purple-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs text-gray-500">3:30 PM</span>
                                <span class="text-xs bg-gold text-navy px-2 py-0.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            <h4 class="font-bold text-navy">Afternoon Snack</h4>
                            <p class="text-sm text-gray-500">Apple with almond butter</p>
                            <p class="text-xs text-gray-400 mt-1">180 cal • 6g protein</p>
                        </div>
                        <button class="bg-gold text-navy px-3 py-1.5 rounded-lg text-xs font-bold">Log</button>
                    </div>
                </div>
                
                <!-- Dinner -->
                <div class="card p-4 meal-card cursor-pointer opacity-60">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-moon text-blue-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <span class="text-xs text-gray-500">7:00 PM</span>
                            <h4 class="font-bold text-navy">Dinner</h4>
                            <p class="text-sm text-gray-500">Salmon, roasted vegetables</p>
                            <p class="text-xs text-gray-400 mt-1">450 cal • 38g protein</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Premium Meal Plan Upsell -->
            <div class="card p-4 mt-4 bg-gradient-to-r from-gold/10 to-yellow-50 border border-gold/30">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-crown text-navy"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-navy">Personalized Meal Plans</h4>
                        <p class="text-xs text-gray-500">AI-generated plans based on your goals</p>
                    </div>
                    <a href="/subscription" class="bg-gold text-navy px-4 py-2 rounded-lg text-xs font-bold">Upgrade</a>
                </div>
            </div>
        </div>
        
        <!-- Daily Checklist -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy">Daily Health Checklist</h2>
                <span class="text-xs text-gray-500">4/7 completed</span>
            </div>
            
            <div class="card divide-y">
                <div class="p-4 flex items-center gap-4 checklist-item completed">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-xs"></i>
                    </div>
                    <span class="flex-1 text-navy">Morning medications taken</span>
                    <span class="text-gold text-sm font-bold">+30 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item completed">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-xs"></i>
                    </div>
                    <span class="flex-1 text-navy">Log breakfast</span>
                    <span class="text-gold text-sm font-bold">+15 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item completed">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-xs"></i>
                    </div>
                    <span class="flex-1 text-navy">15-minute walk</span>
                    <span class="text-gold text-sm font-bold">+25 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item completed">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-white text-xs"></i>
                    </div>
                    <span class="flex-1 text-navy">Log blood pressure</span>
                    <span class="text-gold text-sm font-bold">+20 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item">
                    <div class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    <span class="flex-1 text-navy">Drink 8 glasses of water</span>
                    <span class="text-gray-400 text-sm font-bold">+10 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item">
                    <div class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    <span class="flex-1 text-navy">Evening stretching</span>
                    <span class="text-gray-400 text-sm font-bold">+20 pts</span>
                </div>
                
                <div class="p-4 flex items-center gap-4 checklist-item">
                    <div class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    <span class="flex-1 text-navy">Log sleep time</span>
                    <span class="text-gray-400 text-sm font-bold">+15 pts</span>
                </div>
            </div>
            
            <p class="text-center text-sm text-gray-500 mt-3">
                <i class="fas fa-coins text-gold mr-1"></i>Complete all tasks to earn <strong>135 bonus SelectPoints!</strong>
            </p>
        </div>
        
        <!-- Mindfulness & Mental Wellness -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy">Mental Wellness</h2>
                <a href="/mindfulness" class="text-gold text-sm font-medium">View All <i class="fas fa-arrow-right ml-1"></i></a>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <a href="/meditation" class="card p-4 text-center bg-gradient-to-br from-indigo-50 to-purple-50 block hover:shadow-lg transition-shadow">
                    <div class="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-brain text-white text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy">Meditation</h4>
                    <p class="text-xs text-gray-500 mb-3">5-min guided session</p>
                    <span class="inline-block w-full bg-indigo-500 text-white py-2 rounded-lg text-sm font-bold">Start</span>
                </a>
                
                <a href="/breathing" class="card p-4 text-center bg-gradient-to-br from-blue-50 to-cyan-50 block hover:shadow-lg transition-shadow">
                    <div class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-wind text-white text-xl"></i>
                    </div>
                    <h4 class="font-bold text-navy">Breathing</h4>
                    <p class="text-xs text-gray-500 mb-3">3-min stress relief</p>
                    <span class="inline-block w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-bold">Start</span>
                </a>
            </div>
            
            <!-- Quick Mindfulness Actions -->
            <div class="grid grid-cols-4 gap-2 mt-4">
                <a href="/mindfulness" class="card p-3 text-center hover:bg-indigo-50 transition-colors">
                    <i class="fas fa-moon text-purple-500 text-lg mb-1"></i>
                    <p class="text-xs text-gray-600">Sleep</p>
                </a>
                <a href="/mindfulness" class="card p-3 text-center hover:bg-green-50 transition-colors">
                    <i class="fas fa-leaf text-green-500 text-lg mb-1"></i>
                    <p class="text-xs text-gray-600">Calm</p>
                </a>
                <a href="/mindfulness" class="card p-3 text-center hover:bg-orange-50 transition-colors">
                    <i class="fas fa-sun text-orange-500 text-lg mb-1"></i>
                    <p class="text-xs text-gray-600">Energy</p>
                </a>
                <a href="/mindfulness" class="card p-3 text-center hover:bg-pink-50 transition-colors">
                    <i class="fas fa-heart text-pink-500 text-lg mb-1"></i>
                    <p class="text-xs text-gray-600">Gratitude</p>
                </a>
            </div>
            
            <!-- Premium Mindfulness -->
            <div class="card p-4 mt-4 bg-navy text-white">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                        <i class="fas fa-spa text-gold text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold">SelectMind Premium</h4>
                        <p class="text-xs text-white/70">100+ guided meditations, sleep stories</p>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-gold font-bold">€9.99/mo</span>
                            <span class="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">7-day free trial</span>
                        </div>
                    </div>
                </div>
                <a href="/mindfulness" class="block w-full mt-3 text-center bg-gold text-navy py-2 rounded-lg text-sm font-bold">
                    Explore All Sessions
                </a>
            </div>
        </div>
        
        <!-- Weekly Challenge -->
        <div class="card p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-trophy text-yellow-300 text-2xl"></i>
                </div>
                <div>
                    <p class="text-xs text-white/70">Weekly Challenge</p>
                    <h3 class="font-bold text-lg">10K Steps Challenge</h3>
                    <p class="text-sm text-white/80">5/7 days completed</p>
                </div>
            </div>
            
            <div class="flex justify-between mb-2">
                ${['M','T','W','T','F','S','S'].map((day, i) => `
                    <div class="text-center">
                        <div class="w-8 h-8 rounded-full ${i < 5 ? 'bg-white text-green-600' : i === 5 ? 'bg-white/30 text-white' : 'bg-white/10 text-white/50'} flex items-center justify-center mb-1 text-xs font-bold">
                            ${i < 5 ? '<i class="fas fa-check text-xs"></i>' : day}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <p class="text-center text-sm text-white/80 mt-2">
                <i class="fas fa-gift mr-1"></i>Complete challenge to earn <strong>500 SelectPoints + Badge!</strong>
            </p>
        </div>
    </main>
    
    <!-- Language Change Script -->
    <script>
        function changeLanguage(lang) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            localStorage.setItem('selectcare-language', lang);
            window.location.href = url.toString();
        }
    </script>
    
    <!-- Floating AI Button -->
    <a href="/ai-concierge?lang=${lang}" class="fixed bottom-24 ${dir === 'rtl' ? 'left-5' : 'right-5'} w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-navy text-2xl shadow-lg z-50 hover:scale-105 transition-transform" title="${t('ai.title', lang)}">
        <i class="fas fa-robot"></i>
    </a>
    
    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-40">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-home text-xl mb-1"></i>
                <span class="text-xs">${t('nav.home', lang)}</span>
            </a>
            <a href="/daily-wellness?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-yellow-600">
                <i class="fas fa-heart text-xl mb-1"></i>
                <span class="text-xs">${t('nav.wellness', lang)}</span>
            </a>
            <a href="/medisense?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-stethoscope text-xl mb-1"></i>
                <span class="text-xs">MediSense</span>
            </a>
            <a href="/rewards?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-coins text-xl mb-1"></i>
                <span class="text-xs">${t('nav.rewards', lang)}</span>
            </a>
            <a href="/marketplace?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-store text-xl mb-1"></i>
                <span class="text-xs">${t('nav.shop', lang)}</span>
            </a>
        </div>
    </nav>
</body>
</html>
`
};
