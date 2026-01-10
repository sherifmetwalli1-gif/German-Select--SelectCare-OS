/**
 * SelectCareOS™ Gamification & Rewards System
 * SelectPoints - Engagement-Driven Monetization
 */

export const REWARDS_CONFIG = {
  pointsEarning: {
    dailyLogin: 10,
    completeProfile: 500,
    connectDevice: 200,
    logWeight: 20,
    logMeal: 15,
    logExercise: 25,
    reachStepGoal: 50,
    completeMedication: 30,
    videoConsultation: 100,
    writeReview: 150,
    referFriend: 1000,
    completeHealthAssessment: 300,
    achieveWeeklyGoal: 200,
    monthlyStreak: 500,
  },
  tiers: {
    bronze: { min: 0, max: 999, multiplier: 1, perks: ['Basic Rewards'] },
    silver: { min: 1000, max: 4999, multiplier: 1.25, perks: ['5% Consultation Discount', 'Priority Support'] },
    gold: { min: 5000, max: 14999, multiplier: 1.5, perks: ['10% All Discounts', 'Free Monthly Checkup'] },
    platinum: { min: 15000, max: 49999, multiplier: 2, perks: ['15% All Discounts', 'VIP Events', 'Dedicated Manager'] },
    diamond: { min: 50000, max: Infinity, multiplier: 3, perks: ['20% All Discounts', 'Exclusive Access', 'Concierge Service'] },
  },
  redemptions: [
    { id: 'consult-15', name: '15-min Video Consultation', points: 2000, value: 50 },
    { id: 'consult-30', name: '30-min Video Consultation', points: 3500, value: 100 },
    { id: 'health-report', name: 'Premium Health Report', points: 1500, value: 40 },
    { id: 'wellness-box', name: 'SelectWellness Box', points: 5000, value: 120 },
    { id: 'spa-voucher', name: 'Red Sea Spa Voucher', points: 8000, value: 200 },
    { id: 'retreat-discount', name: '€500 Retreat Discount', points: 15000, value: 500 },
  ],
};

import { LANGUAGE_CONFIG, t, getDir, type SupportedLanguage } from '../services/app-i18n'

export const rewardsPage = (lang: SupportedLanguage = 'en') => {
  const dir = getDir(lang)
  const langOptions = Object.entries(LANGUAGE_CONFIG)
    .map(([code, config]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${config.flag} ${config.nativeName}</option>`)
    .join('')
  
  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SelectPoints Rewards - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --gold: #C9A227;
            --cream: #F8F6F0;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--cream); padding-bottom: 100px; }
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08); }
        .tier-badge { padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .tier-bronze { background: linear-gradient(135deg, #CD7F32, #8B4513); color: white; }
        .tier-silver { background: linear-gradient(135deg, #C0C0C0, #A8A8A8); color: #333; }
        .tier-gold { background: linear-gradient(135deg, #FFD700, #FFA500); color: #333; }
        .tier-platinum { background: linear-gradient(135deg, #E5E4E2, #BCC6CC); color: #333; }
        .tier-diamond { background: linear-gradient(135deg, #B9F2FF, #4DD0E1); color: #333; }
        .progress-bar { height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), #FFD700); border-radius: 4px; transition: width 0.5s; }
        .streak-flame { animation: flicker 0.5s infinite alternate; }
        @keyframes flicker { from { opacity: 0.8; } to { opacity: 1; } }
        .badge-earned { filter: none; }
        .badge-locked { filter: grayscale(100%); opacity: 0.4; }
        .reward-card:hover { transform: scale(1.02); transition: transform 0.2s; }
        .confetti { position: fixed; pointer-events: none; }
        .activity-item { border-left: 3px solid var(--gold); }
    </style>
</head>
<body>
    <!-- Header with Points Balance -->
    <header class="bg-navy px-5 pt-12 pb-8">
        <div class="flex justify-between items-start mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
            <a href="/?lang=${lang}" class="text-gold"><i class="fas fa-arrow-${dir === 'rtl' ? 'right' : 'left'} ${dir === 'rtl' ? 'ml-2' : 'mr-2'}"></i>${t('btn.back', lang)}</a>
            <select id="languageSelect" onchange="changeLanguage(this.value)" 
                    class="appearance-none bg-white/10 text-white px-2 py-1 rounded-lg text-sm cursor-pointer border border-white/20">
                ${langOptions}
            </select>
        </div>
        
        <div class="text-center">
            <span class="tier-badge tier-gold">${t('rewards.gold', lang).toUpperCase()}</span>
            <div class="inline-flex items-center justify-center w-24 h-24 bg-gold/20 rounded-full my-4">
                <i class="fas fa-coins text-gold text-4xl"></i>
            </div>
            <h1 class="text-white text-lg mb-1">${t('rewards.yourPoints', lang)}</h1>
            <p class="text-5xl font-bold text-gold mb-2">8,450</p>
            <p class="text-white/60 text-sm">Worth approximately €211</p>
        </div>
        
        <!-- Progress to Next Tier -->
        <div class="mt-6 bg-white/10 rounded-2xl p-4">
            <div class="flex justify-between text-sm mb-2">
                <span class="text-white">Gold Member</span>
                <span class="text-gold">6,550 pts to Platinum</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 56%"></div>
            </div>
            <p class="text-white/60 text-xs mt-2 text-center">Earn 1.5x points on all activities</p>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Daily Streak -->
        <div class="card p-5">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-fire text-orange-500 text-xl streak-flame"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-navy">Daily Streak</h3>
                        <p class="text-sm text-gray-500">Keep it going!</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-3xl font-bold text-orange-500">14</p>
                    <p class="text-xs text-gray-500">days</p>
                </div>
            </div>
            
            <div class="flex justify-between">
                ${['M','T','W','T','F','S','S'].map((day, i) => `
                    <div class="text-center">
                        <div class="w-8 h-8 rounded-full ${i < 6 ? 'bg-orange-500' : 'bg-gray-200'} flex items-center justify-center mb-1">
                            ${i < 6 ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                        </div>
                        <span class="text-xs text-gray-500">${day}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-4 bg-orange-50 rounded-lg p-3 text-center">
                <p class="text-sm text-orange-700"><i class="fas fa-gift mr-2"></i>7-day streak bonus: <strong>+100 points</strong> earned!</p>
            </div>
        </div>
        
        <!-- Quick Earn Actions -->
        <div>
            <h3 class="font-bold text-navy mb-3">Quick Earn</h3>
            <div class="grid grid-cols-2 gap-3">
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-weight text-green-600"></i>
                    </div>
                    <p class="font-semibold text-navy text-sm">Log Weight</p>
                    <p class="text-gold text-sm font-bold">+20 pts</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-utensils text-blue-600"></i>
                    </div>
                    <p class="font-semibold text-navy text-sm">Log Meal</p>
                    <p class="text-gold text-sm font-bold">+15 pts</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-running text-purple-600"></i>
                    </div>
                    <p class="font-semibold text-navy text-sm">Log Exercise</p>
                    <p class="text-gold text-sm font-bold">+25 pts</p>
                </div>
                <div class="card p-4 text-center">
                    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-pills text-red-600"></i>
                    </div>
                    <p class="font-semibold text-navy text-sm">Take Meds</p>
                    <p class="text-gold text-sm font-bold">+30 pts</p>
                </div>
            </div>
        </div>
        
        <!-- Achievements/Badges -->
        <div>
            <div class="flex justify-between items-center mb-3">
                <h3 class="font-bold text-navy">Achievements</h3>
                <a href="/achievements" class="text-gold text-sm">View All</a>
            </div>
            <div class="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                <div class="flex-shrink-0 text-center badge-earned">
                    <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <i class="fas fa-star text-white text-2xl"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">First Steps</p>
                </div>
                <div class="flex-shrink-0 text-center badge-earned">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <i class="fas fa-heartbeat text-white text-2xl"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">Health Hero</p>
                </div>
                <div class="flex-shrink-0 text-center badge-earned">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <i class="fas fa-calendar-check text-white text-2xl"></i>
                    </div>
                    <p class="text-xs font-medium text-navy">Week Warrior</p>
                </div>
                <div class="flex-shrink-0 text-center badge-locked">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-2">
                        <i class="fas fa-trophy text-white text-2xl"></i>
                    </div>
                    <p class="text-xs font-medium text-gray-400">Champion</p>
                </div>
                <div class="flex-shrink-0 text-center badge-locked">
                    <div class="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-2">
                        <i class="fas fa-crown text-white text-2xl"></i>
                    </div>
                    <p class="text-xs font-medium text-gray-400">Legend</p>
                </div>
            </div>
        </div>
        
        <!-- Redeem Rewards -->
        <div>
            <h3 class="font-bold text-navy mb-3">Redeem Rewards</h3>
            <div class="space-y-3">
                <div class="card p-4 reward-card cursor-pointer">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-video text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">15-min Video Consultation</h4>
                                <p class="text-sm text-gray-500">Quick check-in with a doctor</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gold">2,000 pts</p>
                            <p class="text-xs text-gray-500">€50 value</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 reward-card cursor-pointer">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-file-medical text-green-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Premium Health Report</h4>
                                <p class="text-sm text-gray-500">AI-powered comprehensive analysis</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gold">1,500 pts</p>
                            <p class="text-xs text-gray-500">€40 value</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 reward-card cursor-pointer">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="fas fa-box-open text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">SelectWellness Box</h4>
                                <p class="text-sm text-gray-500">Curated health products</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gold">5,000 pts</p>
                            <p class="text-xs text-gray-500">€120 value</p>
                        </div>
                    </div>
                </div>
                
                <div class="card p-4 reward-card cursor-pointer bg-gradient-to-r from-gold/10 to-orange-100">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-gold rounded-xl flex items-center justify-center">
                                <i class="fas fa-spa text-navy text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Red Sea Spa Voucher</h4>
                                <p class="text-sm text-gray-500">Luxury spa experience</p>
                                <span class="text-xs bg-gold text-navy px-2 py-0.5 rounded-full">FEATURED</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gold">8,000 pts</p>
                            <p class="text-xs text-gray-500">€200 value</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Referral Bonus -->
        <div class="card p-5 bg-gradient-to-r from-navy to-blue-900 text-white">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
                    <i class="fas fa-user-plus text-navy text-xl"></i>
                </div>
                <div>
                    <h3 class="font-bold text-lg">Refer a Friend</h3>
                    <p class="text-white/70 text-sm">Earn 1,000 points per referral</p>
                </div>
            </div>
            <div class="bg-white/10 rounded-xl p-3 mb-4">
                <p class="text-xs text-white/60 mb-1">Your referral code</p>
                <div class="flex items-center justify-between">
                    <code class="text-gold font-mono text-lg">JOHN2024</code>
                    <button class="text-gold text-sm"><i class="fas fa-copy mr-1"></i>Copy</button>
                </div>
            </div>
            <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Friends referred: <strong class="text-white">3</strong></span>
                <span class="text-gold">+3,000 pts earned</span>
            </div>
        </div>
        
        <!-- Recent Activity -->
        <div>
            <h3 class="font-bold text-navy mb-3">Recent Activity</h3>
            <div class="space-y-3">
                <div class="card p-4 activity-item">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium text-navy">Daily Login Bonus</p>
                            <p class="text-xs text-gray-500">Today, 9:00 AM</p>
                        </div>
                        <span class="text-green-600 font-bold">+10</span>
                    </div>
                </div>
                <div class="card p-4 activity-item">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium text-navy">Completed Video Consultation</p>
                            <p class="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                        </div>
                        <span class="text-green-600 font-bold">+100</span>
                    </div>
                </div>
                <div class="card p-4 activity-item">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium text-navy">7-Day Streak Bonus</p>
                            <p class="text-xs text-gray-500">Yesterday, 12:00 AM</p>
                        </div>
                        <span class="text-green-600 font-bold">+100</span>
                    </div>
                </div>
            </div>
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
            <a href="/daily-wellness?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-heart text-xl mb-1"></i>
                <span class="text-xs">${t('nav.wellness', lang)}</span>
            </a>
            <a href="/medisense?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-stethoscope text-xl mb-1"></i>
                <span class="text-xs">MediSense</span>
            </a>
            <a href="/rewards?lang=${lang}" class="flex flex-col items-center py-2 px-3 text-yellow-600">
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
