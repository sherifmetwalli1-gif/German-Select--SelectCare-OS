/**
 * SelectCareOS™ Mindfulness & Breathing Exercises
 * Meditation and breathing exercises for mental wellness
 */

export const mindfulnessPage = (type: 'meditation' | 'breathing' | 'all' = 'all') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${type === 'meditation' ? 'Meditation' : type === 'breathing' ? 'Breathing Exercises' : 'Mindfulness'} - SelectCareOS™</title>
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
        
        /* Breathing Animation */
        .breath-circle {
            transition: transform 4s ease-in-out, opacity 0.5s;
        }
        .breath-circle.inhale {
            transform: scale(1.5);
        }
        .breath-circle.exhale {
            transform: scale(1);
        }
        .breath-circle.hold {
            transform: scale(1.5);
        }
        
        /* Pulse Animation for Active Session */
        @keyframes pulse-soft {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .pulse-animation {
            animation: pulse-soft 2s ease-in-out infinite;
        }
        
        /* Wave Animation */
        @keyframes wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .wave-animation {
            animation: wave 3s ease-in-out infinite;
        }
        
        /* Progress Ring */
        .progress-ring {
            transform: rotate(-90deg);
        }
        .progress-ring circle {
            transition: stroke-dashoffset 0.5s ease-in-out;
        }
        
        /* Meditation Card Hover */
        .meditation-card {
            transition: all 0.3s ease;
        }
        .meditation-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 31, 63, 0.12);
        }
        
        /* Tab Active State */
        .tab-btn.active {
            background: var(--navy);
            color: white;
        }
        
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
        .nav-item.active { color: var(--gold); }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="bg-navy px-5 pt-12 pb-6">
        <div class="flex justify-between items-center mb-4">
            <a href="/daily-wellness" class="text-gold"><i class="fas fa-arrow-left mr-2"></i>Back</a>
            <button class="text-white" onclick="toggleFavorites()"><i class="fas fa-heart"></i></button>
        </div>
        <div class="text-center">
            <h1 class="text-white text-2xl font-bold">Mindfulness</h1>
            <p class="text-white/60 text-sm mt-1">Meditation & Breathing Exercises</p>
        </div>
    </header>
    
    <!-- Tab Navigation -->
    <div class="px-5 py-4 flex gap-2">
        <button class="tab-btn flex-1 py-3 rounded-xl font-bold text-sm ${type === 'all' || type === 'meditation' ? 'active' : 'bg-white text-navy'}" onclick="filterContent('all')">
            All
        </button>
        <button class="tab-btn flex-1 py-3 rounded-xl font-bold text-sm ${type === 'meditation' ? 'active' : 'bg-white text-navy'}" onclick="filterContent('meditation')">
            <i class="fas fa-brain mr-1"></i> Meditation
        </button>
        <button class="tab-btn flex-1 py-3 rounded-xl font-bold text-sm ${type === 'breathing' ? 'active' : 'bg-white text-navy'}" onclick="filterContent('breathing')">
            <i class="fas fa-wind mr-1"></i> Breathing
        </button>
    </div>
    
    <main class="px-5 py-2 space-y-6">
        <!-- Quick Start Section -->
        <div class="card p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center wave-animation">
                    <i class="fas fa-spa text-3xl"></i>
                </div>
                <div class="flex-1">
                    <p class="text-xs text-white/70">Quick Start</p>
                    <h3 class="font-bold text-lg">1-Minute Calm</h3>
                    <p class="text-sm text-white/80">Perfect for a quick reset</p>
                </div>
                <button onclick="startQuickSession()" class="bg-white text-indigo-600 px-5 py-3 rounded-xl font-bold">
                    <i class="fas fa-play mr-1"></i> Start
                </button>
            </div>
        </div>
        
        <!-- Breathing Exercises Section -->
        <div id="breathing-section">
            <h2 class="font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-wind text-blue-500 mr-2"></i>
                Breathing Exercises
            </h2>
            
            <div class="space-y-4">
                <!-- Box Breathing -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startBreathingExercise('box')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-square text-blue-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Popular</span>
                                <span class="text-xs text-gray-500">4 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Box Breathing</h4>
                            <p class="text-sm text-gray-500">4-4-4-4 pattern for focus & calm</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- 4-7-8 Breathing -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startBreathingExercise('478')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-moon text-purple-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Sleep Aid</span>
                                <span class="text-xs text-gray-500">5 min</span>
                            </div>
                            <h4 class="font-bold text-navy">4-7-8 Relaxing Breath</h4>
                            <p class="text-sm text-gray-500">Natural tranquilizer for the nervous system</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Energizing Breath -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startBreathingExercise('energize')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-sun text-orange-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Morning</span>
                                <span class="text-xs text-gray-500">3 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Energizing Breath</h4>
                            <p class="text-sm text-gray-500">Wake up your body and mind</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Stress Relief -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startBreathingExercise('stress')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-leaf text-green-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Anxiety Relief</span>
                                <span class="text-xs text-gray-500">5 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Calming Breath</h4>
                            <p class="text-sm text-gray-500">Release tension and find peace</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Meditation Section -->
        <div id="meditation-section">
            <h2 class="font-bold text-navy mb-4 flex items-center">
                <i class="fas fa-brain text-indigo-500 mr-2"></i>
                Guided Meditations
            </h2>
            
            <div class="space-y-4">
                <!-- Morning Meditation -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startMeditation('morning')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-sun text-yellow-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Morning</span>
                                <span class="text-xs text-gray-500">5 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Morning Intention</h4>
                            <p class="text-sm text-gray-500">Start your day with clarity and purpose</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Body Scan -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startMeditation('bodyscan')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-user text-indigo-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Relaxation</span>
                                <span class="text-xs text-gray-500">10 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Body Scan</h4>
                            <p class="text-sm text-gray-500">Release tension from head to toe</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Stress Relief Meditation -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startMeditation('stress')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-water text-teal-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Popular</span>
                                <span class="text-xs text-gray-500">7 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Stress Melting</h4>
                            <p class="text-sm text-gray-500">Let go of worry and anxiety</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Sleep Meditation -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startMeditation('sleep')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-moon text-purple-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Bedtime</span>
                                <span class="text-xs text-gray-500">15 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Sleep Journey</h4>
                            <p class="text-sm text-gray-500">Drift into peaceful, restful sleep</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Gratitude Meditation -->
                <div class="card p-4 meditation-card cursor-pointer" onclick="startMeditation('gratitude')">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-heart text-pink-500 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Emotional</span>
                                <span class="text-xs text-gray-500">8 min</span>
                            </div>
                            <h4 class="font-bold text-navy">Gratitude Practice</h4>
                            <p class="text-sm text-gray-500">Cultivate appreciation and joy</p>
                        </div>
                        <div class="text-gold">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Stats Section -->
        <div class="card p-5">
            <h3 class="font-bold text-navy mb-4">Your Mindfulness Journey</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div class="text-2xl font-bold text-indigo-600">12</div>
                    <p class="text-xs text-gray-500">Sessions</p>
                </div>
                <div>
                    <div class="text-2xl font-bold text-purple-600">86</div>
                    <p class="text-xs text-gray-500">Minutes</p>
                </div>
                <div>
                    <div class="text-2xl font-bold text-gold">5</div>
                    <p class="text-xs text-gray-500">Day Streak</p>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Weekly Goal</span>
                    <span class="text-sm font-bold text-navy">3/5 sessions</span>
                </div>
                <div class="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style="width: 60%"></div>
                </div>
            </div>
        </div>
        
        <!-- Premium Upsell -->
        <div class="card p-5 bg-gradient-to-r from-navy to-indigo-900 text-white">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-crown text-gold text-xl"></i>
                </div>
                <div class="flex-1">
                    <h4 class="font-bold">SelectMind Premium</h4>
                    <p class="text-xs text-white/70">100+ meditations, sleep stories, personalized programs</p>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-gold font-bold">€9.99/mo</span>
                        <span class="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">7-day free trial</span>
                    </div>
                </div>
            </div>
            <button class="w-full mt-4 bg-gold text-navy py-3 rounded-xl font-bold">
                Start Free Trial
            </button>
        </div>
    </main>
    
    <!-- Breathing Exercise Modal -->
    <div id="breathing-modal" class="fixed inset-0 bg-black/80 z-50 hidden flex items-center justify-center">
        <div class="bg-white rounded-3xl p-8 m-5 max-w-sm w-full text-center">
            <button onclick="closeBreathingModal()" class="absolute top-4 right-4 text-gray-400 text-2xl">
                <i class="fas fa-times"></i>
            </button>
            
            <h3 id="breathing-title" class="text-xl font-bold text-navy mb-2">Box Breathing</h3>
            <p id="breathing-subtitle" class="text-sm text-gray-500 mb-6">Follow the circle</p>
            
            <div class="relative w-48 h-48 mx-auto mb-6">
                <div id="breath-circle" class="breath-circle w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span id="breath-instruction" class="text-white text-xl font-bold">Breathe In</span>
                </div>
            </div>
            
            <div id="breath-timer" class="text-4xl font-bold text-navy mb-2">4</div>
            <p id="breath-phase" class="text-gray-500 mb-6">Inhale</p>
            
            <div class="flex gap-4">
                <button onclick="pauseBreathing()" class="flex-1 py-3 border-2 border-navy text-navy rounded-xl font-bold">
                    <i class="fas fa-pause mr-2"></i>Pause
                </button>
                <button onclick="closeBreathingModal()" class="flex-1 py-3 bg-navy text-white rounded-xl font-bold">
                    End
                </button>
            </div>
        </div>
    </div>
    
    <!-- Meditation Modal -->
    <div id="meditation-modal" class="fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-50 hidden">
        <div class="h-full flex flex-col p-5">
            <div class="flex justify-between items-center mb-8">
                <button onclick="closeMeditationModal()" class="text-white/70 text-xl">
                    <i class="fas fa-times"></i>
                </button>
                <span id="med-timer" class="text-white text-lg font-mono">5:00</span>
                <button onclick="toggleMeditationFavorite()" class="text-white/70 text-xl">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center text-center">
                <div class="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-8 pulse-animation">
                    <i id="med-icon" class="fas fa-sun text-gold text-5xl"></i>
                </div>
                
                <h2 id="med-title" class="text-white text-2xl font-bold mb-2">Morning Intention</h2>
                <p id="med-instruction" class="text-white/70 text-lg max-w-xs">
                    Find a comfortable position and close your eyes...
                </p>
            </div>
            
            <!-- Progress Bar -->
            <div class="mb-4">
                <div class="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div id="med-progress" class="h-full bg-gold transition-all duration-1000" style="width: 0%"></div>
                </div>
            </div>
            
            <div class="flex gap-4">
                <button onclick="pauseMeditation()" class="flex-1 py-4 border-2 border-white/30 text-white rounded-xl font-bold">
                    <i id="med-pause-icon" class="fas fa-pause mr-2"></i><span id="med-pause-text">Pause</span>
                </button>
                <button onclick="closeMeditationModal()" class="flex-1 py-4 bg-gold text-navy rounded-xl font-bold">
                    End Session
                </button>
            </div>
        </div>
    </div>
    
    <!-- Floating AI Button -->
    <a href="/ai-concierge" class="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-navy text-2xl shadow-lg z-40 hover:scale-105 transition-transform" title="AI Health Assistant">
        <i class="fas fa-robot"></i>
    </a>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item active">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/rewards" class="nav-item">
                <i class="fas fa-coins"></i>
                <span>Rewards</span>
            </a>
            <a href="/marketplace" class="nav-item">
                <i class="fas fa-store"></i>
                <span>Shop</span>
            </a>
        </div>
    </nav>
    
    <script>
        // Breathing Exercise State
        let breathingInterval = null;
        let breathingPaused = false;
        let currentBreathingType = 'box';
        
        // Meditation State
        let meditationInterval = null;
        let meditationPaused = false;
        let meditationTimeLeft = 300; // 5 minutes default
        let currentMeditationType = 'morning';
        
        // Breathing Patterns (in seconds)
        const breathingPatterns = {
            box: { inhale: 4, hold1: 4, exhale: 4, hold2: 4, name: 'Box Breathing', subtitle: '4-4-4-4 pattern for focus & calm' },
            '478': { inhale: 4, hold1: 7, exhale: 8, hold2: 0, name: '4-7-8 Breathing', subtitle: 'Natural tranquilizer for sleep' },
            energize: { inhale: 2, hold1: 0, exhale: 2, hold2: 0, name: 'Energizing Breath', subtitle: 'Quick energy boost' },
            stress: { inhale: 4, hold1: 2, exhale: 6, hold2: 2, name: 'Calming Breath', subtitle: 'Release tension and find peace' }
        };
        
        // Meditation Content
        const meditations = {
            morning: {
                title: 'Morning Intention',
                icon: 'fa-sun',
                duration: 300,
                instructions: [
                    'Find a comfortable seated position...',
                    'Take a deep breath in... and out...',
                    'Set your intention for today...',
                    'What do you want to accomplish?',
                    'How do you want to feel?',
                    'Carry this intention with you...',
                    'Slowly open your eyes...'
                ]
            },
            bodyscan: {
                title: 'Body Scan',
                icon: 'fa-user',
                duration: 600,
                instructions: [
                    'Lie down or sit comfortably...',
                    'Close your eyes and breathe deeply...',
                    'Bring awareness to your feet...',
                    'Notice any sensations in your legs...',
                    'Move your attention to your torso...',
                    'Relax your shoulders and neck...',
                    'Release tension from your face...',
                    'Feel your whole body relaxed...'
                ]
            },
            stress: {
                title: 'Stress Melting',
                icon: 'fa-water',
                duration: 420,
                instructions: [
                    'Find a quiet, comfortable space...',
                    'Let your worries float away...',
                    'Imagine stress leaving your body...',
                    'With each breath, feel lighter...',
                    'You are safe and at peace...',
                    'Let go of what you cannot control...',
                    'Embrace this moment of calm...'
                ]
            },
            sleep: {
                title: 'Sleep Journey',
                icon: 'fa-moon',
                duration: 900,
                instructions: [
                    'Settle into your bed...',
                    'Let your body sink into the mattress...',
                    'Release the day from your mind...',
                    'Breathe slowly and deeply...',
                    'Feel yourself drifting...',
                    'Peaceful... calm... safe...',
                    'Let sleep embrace you...'
                ]
            },
            gratitude: {
                title: 'Gratitude Practice',
                icon: 'fa-heart',
                duration: 480,
                instructions: [
                    'Close your eyes gently...',
                    'Think of something you are grateful for...',
                    'Feel the warmth of appreciation...',
                    'Think of someone who has helped you...',
                    'Send them gratitude...',
                    'Notice the joy in small things...',
                    'Carry this gratitude with you...'
                ]
            }
        };
        
        // Filter content by type
        function filterContent(type) {
            const breathingSection = document.getElementById('breathing-section');
            const meditationSection = document.getElementById('meditation-section');
            
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            if (type === 'breathing') {
                breathingSection.style.display = 'block';
                meditationSection.style.display = 'none';
            } else if (type === 'meditation') {
                breathingSection.style.display = 'none';
                meditationSection.style.display = 'block';
            } else {
                breathingSection.style.display = 'block';
                meditationSection.style.display = 'block';
            }
        }
        
        // Quick 1-minute session
        function startQuickSession() {
            startBreathingExercise('box');
        }
        
        // Start Breathing Exercise
        function startBreathingExercise(type) {
            currentBreathingType = type;
            const pattern = breathingPatterns[type];
            
            document.getElementById('breathing-title').textContent = pattern.name;
            document.getElementById('breathing-subtitle').textContent = pattern.subtitle;
            document.getElementById('breathing-modal').classList.remove('hidden');
            
            runBreathingCycle(pattern);
        }
        
        function runBreathingCycle(pattern) {
            let phase = 'inhale';
            let count = pattern.inhale;
            const circle = document.getElementById('breath-circle');
            const timer = document.getElementById('breath-timer');
            const instruction = document.getElementById('breath-instruction');
            const phaseText = document.getElementById('breath-phase');
            
            circle.classList.add('inhale');
            instruction.textContent = 'Breathe In';
            phaseText.textContent = 'Inhale';
            timer.textContent = count;
            
            breathingInterval = setInterval(() => {
                if (breathingPaused) return;
                
                count--;
                timer.textContent = count;
                
                if (count <= 0) {
                    if (phase === 'inhale' && pattern.hold1 > 0) {
                        phase = 'hold1';
                        count = pattern.hold1;
                        circle.classList.remove('inhale');
                        circle.classList.add('hold');
                        instruction.textContent = 'Hold';
                        phaseText.textContent = 'Hold';
                    } else if ((phase === 'inhale' || phase === 'hold1')) {
                        phase = 'exhale';
                        count = pattern.exhale;
                        circle.classList.remove('inhale', 'hold');
                        circle.classList.add('exhale');
                        instruction.textContent = 'Breathe Out';
                        phaseText.textContent = 'Exhale';
                    } else if (phase === 'exhale' && pattern.hold2 > 0) {
                        phase = 'hold2';
                        count = pattern.hold2;
                        instruction.textContent = 'Hold';
                        phaseText.textContent = 'Hold';
                    } else {
                        phase = 'inhale';
                        count = pattern.inhale;
                        circle.classList.remove('exhale', 'hold');
                        circle.classList.add('inhale');
                        instruction.textContent = 'Breathe In';
                        phaseText.textContent = 'Inhale';
                    }
                    timer.textContent = count;
                }
            }, 1000);
        }
        
        function pauseBreathing() {
            breathingPaused = !breathingPaused;
            const btn = event.target.closest('button');
            btn.innerHTML = breathingPaused ? 
                '<i class="fas fa-play mr-2"></i>Resume' : 
                '<i class="fas fa-pause mr-2"></i>Pause';
        }
        
        function closeBreathingModal() {
            clearInterval(breathingInterval);
            breathingPaused = false;
            document.getElementById('breathing-modal').classList.add('hidden');
            
            // Award points
            showPointsEarned(25, 'Breathing exercise completed!');
        }
        
        // Start Meditation
        function startMeditation(type) {
            currentMeditationType = type;
            const meditation = meditations[type];
            
            document.getElementById('med-title').textContent = meditation.title;
            document.getElementById('med-icon').className = 'fas ' + meditation.icon + ' text-gold text-5xl';
            document.getElementById('med-instruction').textContent = meditation.instructions[0];
            meditationTimeLeft = meditation.duration;
            updateMeditationTimer();
            
            document.getElementById('meditation-modal').classList.remove('hidden');
            
            let instructionIndex = 0;
            const totalTime = meditation.duration;
            
            meditationInterval = setInterval(() => {
                if (meditationPaused) return;
                
                meditationTimeLeft--;
                updateMeditationTimer();
                
                // Update progress
                const progress = ((totalTime - meditationTimeLeft) / totalTime) * 100;
                document.getElementById('med-progress').style.width = progress + '%';
                
                // Update instruction periodically
                const instructionInterval = Math.floor(totalTime / meditation.instructions.length);
                const newIndex = Math.floor((totalTime - meditationTimeLeft) / instructionInterval);
                if (newIndex !== instructionIndex && newIndex < meditation.instructions.length) {
                    instructionIndex = newIndex;
                    document.getElementById('med-instruction').textContent = meditation.instructions[instructionIndex];
                }
                
                if (meditationTimeLeft <= 0) {
                    closeMeditationModal();
                }
            }, 1000);
        }
        
        function updateMeditationTimer() {
            const minutes = Math.floor(meditationTimeLeft / 60);
            const seconds = meditationTimeLeft % 60;
            document.getElementById('med-timer').textContent = 
                minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
        
        function pauseMeditation() {
            meditationPaused = !meditationPaused;
            document.getElementById('med-pause-icon').className = 
                'fas ' + (meditationPaused ? 'fa-play' : 'fa-pause') + ' mr-2';
            document.getElementById('med-pause-text').textContent = 
                meditationPaused ? 'Resume' : 'Pause';
        }
        
        function closeMeditationModal() {
            clearInterval(meditationInterval);
            meditationPaused = false;
            document.getElementById('meditation-modal').classList.add('hidden');
            
            // Award points based on time spent
            const meditation = meditations[currentMeditationType];
            const timeSpent = meditation.duration - meditationTimeLeft;
            const points = Math.floor(timeSpent / 60) * 10; // 10 points per minute
            if (points > 0) {
                showPointsEarned(points, 'Meditation completed!');
            }
        }
        
        function toggleMeditationFavorite() {
            const icon = event.target.closest('button').querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-pink-400');
        }
        
        function toggleFavorites() {
            // Toggle favorites filter
            alert('Favorites feature coming soon!');
        }
        
        // Show points earned toast
        function showPointsEarned(points, message) {
            const toast = document.createElement('div');
            toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gold text-navy px-6 py-3 rounded-xl font-bold shadow-lg z-50 flex items-center gap-2';
            toast.innerHTML = '<i class="fas fa-coins"></i> +' + points + ' pts - ' + message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.5s';
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }
    </script>
</body>
</html>
`;

// Export individual pages for routes
export const meditationPage = () => mindfulnessPage('meditation');
export const breathingPage = () => mindfulnessPage('breathing');
