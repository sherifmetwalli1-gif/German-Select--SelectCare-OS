/**
 * SelectCareOS™ Family Health Hub
 * Multi-User Health Management with Premium Features
 * Monetization through family plan upgrades and shared wellness
 */

export const FAMILY_MEMBERS = [
  {
    id: 'member-1',
    name: 'John Doe',
    role: 'primary',
    avatar: 'JD',
    avatarColor: '#001F3F',
    age: 42,
    healthScore: 85,
    status: 'healthy',
    streak: 14,
    points: 8450,
    appointments: 2,
    medications: 3,
    lastActivity: '2 min ago',
  },
  {
    id: 'member-2',
    name: 'Sarah Doe',
    role: 'spouse',
    avatar: 'SD',
    avatarColor: '#EC4899',
    age: 39,
    healthScore: 92,
    status: 'healthy',
    streak: 21,
    points: 12340,
    appointments: 1,
    medications: 1,
    lastActivity: '1 hour ago',
  },
  {
    id: 'member-3',
    name: 'Max Doe',
    role: 'child',
    avatar: 'MD',
    avatarColor: '#3B82F6',
    age: 14,
    healthScore: 96,
    status: 'healthy',
    streak: 7,
    points: 3660,
    appointments: 0,
    medications: 0,
    lastActivity: 'Yesterday',
  },
];

export const familyHubPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Family Health Hub - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --gold: #C9A227;
            --cream: #F8F6F0;
        }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: var(--cream); 
            padding-bottom: 100px; 
        }
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .card { 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 4px 24px rgba(0, 31, 63, 0.08); 
        }
        .member-card { transition: all 0.2s; }
        .member-card:active { transform: scale(0.98); }
        .progress-ring { transform: rotate(-90deg); }
        .avatar-ring {
            box-shadow: 0 0 0 3px white, 0 0 0 5px var(--gold);
        }
        .family-stat {
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
            backdrop-filter: blur(10px);
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .pulse { animation: pulse 2s infinite; }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="bg-navy px-5 pt-12 pb-8">
        <div class="flex items-center justify-between mb-6">
            <a href="/" class="text-gold"><i class="fas fa-arrow-left mr-2"></i>Back</a>
            <button class="text-white"><i class="fas fa-cog"></i></button>
        </div>
        
        <div class="text-center mb-6">
            <h1 class="text-white text-2xl font-bold">Family Health Hub</h1>
            <p class="text-gold mt-1">Manage your family's wellness together</p>
        </div>
        
        <!-- Family Overview Stats -->
        <div class="grid grid-cols-4 gap-3">
            <div class="family-stat rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-navy">3</p>
                <p class="text-xs text-gray-600">Members</p>
            </div>
            <div class="family-stat rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-green-600">3/3</p>
                <p class="text-xs text-gray-600">Healthy</p>
            </div>
            <div class="family-stat rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-gold">24.4k</p>
                <p class="text-xs text-gray-600">Points</p>
            </div>
            <div class="family-stat rounded-xl p-3 text-center">
                <p class="text-2xl font-bold text-blue-600">3</p>
                <p class="text-xs text-gray-600">Appts</p>
            </div>
        </div>
    </header>
    
    <main class="px-5 py-6 space-y-6">
        <!-- Family Members -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">Family Members</h2>
                <span class="text-xs text-gray-500">3/4 slots used</span>
            </div>
            
            <div class="space-y-4">
                ${FAMILY_MEMBERS.map(member => `
                    <div class="card p-4 member-card">
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl avatar-ring" style="background: ${member.avatarColor}">
                                    ${member.avatar}
                                </div>
                                <span class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <i class="fas fa-check text-white text-xs"></i>
                                </span>
                            </div>
                            
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <h3 class="font-bold text-navy">${member.name}</h3>
                                    ${member.role === 'primary' ? '<span class="text-xs bg-gold text-navy px-2 py-0.5 rounded-full">Primary</span>' : ''}
                                    ${member.role === 'child' ? '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Child</span>' : ''}
                                </div>
                                <p class="text-sm text-gray-500">${member.age} years old • ${member.streak} day streak</p>
                                
                                <div class="flex items-center gap-4 mt-2">
                                    <span class="text-xs text-green-600"><i class="fas fa-heart mr-1"></i>Score: ${member.healthScore}</span>
                                    <span class="text-xs text-gold"><i class="fas fa-coins mr-1"></i>${member.points.toLocaleString()} pts</span>
                                </div>
                            </div>
                            
                            <div class="text-right">
                                <div class="relative w-14 h-14">
                                    <svg class="progress-ring w-14 h-14" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" stroke-width="6"/>
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="#22C55E" stroke-width="6" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="${264 - (264 * member.healthScore / 100)}"/>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-sm font-bold text-navy">${member.healthScore}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="flex gap-2 mt-4 pt-4 border-t">
                            <button class="flex-1 py-2 px-3 bg-navy/5 rounded-lg text-sm text-navy font-medium">
                                <i class="fas fa-chart-line mr-1"></i>Health
                            </button>
                            <button class="flex-1 py-2 px-3 bg-navy/5 rounded-lg text-sm text-navy font-medium">
                                <i class="fas fa-calendar mr-1"></i>Appts
                            </button>
                            <button class="flex-1 py-2 px-3 bg-navy/5 rounded-lg text-sm text-navy font-medium">
                                <i class="fas fa-pills mr-1"></i>Meds
                            </button>
                        </div>
                    </div>
                `).join('')}
                
                <!-- Add Member -->
                <div class="card p-4 border-2 border-dashed border-gold/50 text-center">
                    <div class="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-user-plus text-gold text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-navy">Add Family Member</h3>
                    <p class="text-sm text-gray-500 mt-1">1 slot remaining on Plus plan</p>
                    <button class="mt-3 bg-gold text-navy px-6 py-2 rounded-xl font-bold text-sm">
                        <i class="fas fa-plus mr-2"></i>Add Member
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Family Calendar -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-navy text-lg">
                    <i class="fas fa-calendar-alt text-gold mr-2"></i>Family Calendar
                </h2>
                <a href="/calendar" class="text-gold text-sm font-bold">View All</a>
            </div>
            
            <div class="card p-4">
                <div class="space-y-3">
                    <!-- Appointment 1 -->
                    <div class="flex items-center gap-4 p-3 bg-blue-50 rounded-xl">
                        <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-navy">Cardiology Follow-up</p>
                            <p class="text-sm text-gray-500">John • Today, 10:00 AM</p>
                        </div>
                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Video</span>
                    </div>
                    
                    <!-- Appointment 2 -->
                    <div class="flex items-center gap-4 p-3 bg-pink-50 rounded-xl">
                        <div class="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-stethoscope"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-navy">Annual Checkup</p>
                            <p class="text-sm text-gray-500">Sarah • Tomorrow, 2:00 PM</p>
                        </div>
                        <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">In-person</span>
                    </div>
                    
                    <!-- Appointment 3 -->
                    <div class="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                        <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-tooth"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-navy">Dental Checkup</p>
                            <p class="text-sm text-gray-500">Max • Dec 5, 9:00 AM</p>
                        </div>
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">In-person</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Family Challenges -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-trophy text-gold mr-2"></i>Family Challenges
            </h2>
            
            <div class="card p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <i class="fas fa-walking text-3xl"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-xs text-white/70">Weekly Family Challenge</p>
                        <h3 class="font-bold text-xl">Step Together Challenge</h3>
                        <p class="text-sm text-white/80">Family goal: 50,000 combined steps</p>
                    </div>
                </div>
                
                <div class="bg-white/10 rounded-xl p-3 mb-4">
                    <div class="flex justify-between text-sm mb-2">
                        <span>Family Progress</span>
                        <span class="font-bold">38,450 / 50,000</span>
                    </div>
                    <div class="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div class="h-full bg-white rounded-full" style="width: 77%"></div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="flex -space-x-2">
                        ${FAMILY_MEMBERS.map(m => `
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white" style="background: ${m.avatarColor}">${m.avatar}</div>
                        `).join('')}
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-white/70">Prize</p>
                        <p class="font-bold">1,500 Family Points</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Shared SelectPoints Pool -->
        <div class="card p-5">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-coins text-navy text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-navy">Family Points Pool</h3>
                        <p class="text-xs text-gray-500">Shared rewards for all members</p>
                    </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gold"></div>
                </label>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-4">
                ${FAMILY_MEMBERS.map(m => `
                    <div class="text-center">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2" style="background: ${m.avatarColor}">${m.avatar}</div>
                        <p class="text-sm font-bold text-navy">${m.points.toLocaleString()}</p>
                        <p class="text-xs text-gray-500">pts</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="bg-gold/10 rounded-xl p-4">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm text-gray-600">Combined Family Pool</p>
                        <p class="text-2xl font-bold text-gold">24,450 <span class="text-sm font-normal text-gray-500">SelectPoints</span></p>
                    </div>
                    <button class="bg-gold text-navy px-4 py-2 rounded-xl font-bold text-sm">
                        Redeem
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Medication Schedule -->
        <div>
            <h2 class="font-bold text-navy text-lg mb-4">
                <i class="fas fa-pills text-gold mr-2"></i>Family Medications
            </h2>
            
            <div class="card p-4">
                <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                        <div class="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold">JD</div>
                        <div class="flex-1">
                            <p class="font-medium text-navy">Vitamin D3 • Omega-3 • Metformin</p>
                            <p class="text-xs text-gray-500">Morning dose taken</p>
                        </div>
                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                    </div>
                    
                    <div class="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                        <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">SD</div>
                        <div class="flex-1">
                            <p class="font-medium text-navy">Prenatal Vitamins</p>
                            <p class="text-xs text-gray-500">Morning dose taken</p>
                        </div>
                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t">
                    <p class="text-sm text-gray-500 text-center">
                        <i class="fas fa-bell text-gold mr-2"></i>
                        All family medications tracked in one place
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Upgrade Prompt -->
        <div class="card p-5 bg-gradient-to-r from-navy to-blue-900 text-white">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-crown text-gold text-2xl"></i>
                </div>
                <div>
                    <h3 class="font-bold text-lg">Upgrade to Elite</h3>
                    <p class="text-white/70 text-sm">Get 8 family members + dedicated care manager</p>
                </div>
            </div>
            
            <ul class="space-y-2 mb-4">
                <li class="flex items-center text-sm text-white/80">
                    <i class="fas fa-check text-gold mr-3"></i>8 family member slots
                </li>
                <li class="flex items-center text-sm text-white/80">
                    <i class="fas fa-check text-gold mr-3"></i>Dedicated family care manager
                </li>
                <li class="flex items-center text-sm text-white/80">
                    <i class="fas fa-check text-gold mr-3"></i>Family health reports
                </li>
                <li class="flex items-center text-sm text-white/80">
                    <i class="fas fa-check text-gold mr-3"></i>5x SelectPoints for all members
                </li>
            </ul>
            
            <a href="/subscription" class="block w-full bg-gold text-navy py-3 rounded-xl font-bold text-center">
                Upgrade to Elite - €199/mo
            </a>
        </div>
    </main>
    
    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4" style="padding-bottom: max(20px, env(safe-area-inset-bottom));">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="text-center text-gray-400 py-2 px-3">
                <i class="fas fa-home text-xl"></i>
                <p class="text-xs mt-1">Home</p>
            </a>
            <a href="/daily-wellness" class="text-center text-gray-400 py-2 px-3">
                <i class="fas fa-heart text-xl"></i>
                <p class="text-xs mt-1">Wellness</p>
            </a>
            <a href="/family" class="text-center text-gold py-2 px-3">
                <i class="fas fa-users text-xl"></i>
                <p class="text-xs mt-1">Family</p>
            </a>
            <a href="/marketplace" class="text-center text-gray-400 py-2 px-3">
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
