/**
 * SelectCareOS™ AI Health Concierge
 * Premium AI-Powered Health Assistant with Upselling
 * Multi-language support: EN, AR, DE, FR
 */

import { LANGUAGE_CONFIG, t, getDir, generateLanguageSelector, type SupportedLanguage } from '../services/app-i18n'

export const aiConciergePage = (lang: SupportedLanguage = 'en') => {
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
    <title>AI Health Concierge - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy: #001F3F;
            --gold: #C9A227;
            --cream: #F8F6F0;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--cream); min-height: 100vh; }
        .bg-navy { background-color: var(--navy); }
        .bg-gold { background-color: var(--gold); }
        .text-navy { color: var(--navy); }
        .text-gold { color: var(--gold); }
        .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08); }
        .chat-container { height: calc(100vh - 180px); overflow-y: auto; }
        .message-user { background: var(--navy); color: white; border-radius: 20px 20px 4px 20px; margin-left: auto; max-width: 80%; }
        .message-ai { background: white; color: var(--navy); border-radius: 20px 20px 20px 4px; max-width: 85%; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .typing-indicator span { animation: blink 1.4s infinite both; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        .suggestion-chip { background: white; border: 2px solid var(--gold); color: var(--navy); padding: 8px 16px; border-radius: 20px; font-size: 14px; transition: all 0.2s; }
        .suggestion-chip:hover { background: var(--gold); color: var(--navy); }
        .upsell-card { background: linear-gradient(135deg, var(--gold) 0%, #E8C547 100%); border-radius: 16px; }
        .premium-badge { background: linear-gradient(135deg, #9333EA, #7C3AED); }
        .input-container { background: white; border-radius: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
        .ai-avatar { position: relative; }
        .ai-avatar::before { content: ''; position: absolute; inset: -4px; background: var(--gold); border-radius: 50%; animation: pulse-ring 2s ease-out infinite; opacity: 0; }
        
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
        .nav-item.active { color: #C9A227; }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        .input-area { padding-bottom: 80px; }
    </style>
</head>
<body class="flex flex-col">
    <!-- Header -->
    <header class="bg-navy px-5 pt-12 pb-4">
        <div class="flex items-center justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
            <a href="/?lang=${lang}" class="text-gold"><i class="fas fa-arrow-${dir === 'rtl' ? 'right' : 'left'}"></i></a>
            <div class="flex items-center gap-3">
                <div class="ai-avatar w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-navy"></i>
                </div>
                <div>
                    <h1 class="text-white font-bold">${t('ai.title', lang)}</h1>
                    <p class="text-green-400 text-xs"><i class="fas fa-circle text-xs ${dir === 'rtl' ? 'ml-1' : 'mr-1'}"></i>${t('status.online', lang)}</p>
                </div>
            </div>
            <select id="languageSelect" onchange="changeLanguage(this.value)" 
                    class="appearance-none bg-white/10 text-white px-2 py-1 rounded-lg text-sm cursor-pointer border border-white/20">
                ${langOptions}
            </select>
        </div>
        
        <!-- Usage Banner -->
        <div class="bg-white/10 rounded-xl p-3 flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
            <div class="flex items-center gap-2">
                <i class="fas fa-bolt text-gold"></i>
                <span class="text-white text-sm">42/50 ${lang === 'ar' ? 'استفسارات هذا الشهر' : lang === 'de' ? 'Anfragen diesen Monat' : lang === 'fr' ? 'requêtes ce mois' : 'AI queries this month'}</span>
            </div>
            <a href="/subscription?lang=${lang}" class="text-gold text-sm font-bold">${t('btn.upgrade', lang)}</a>
        </div>
    </header>
    
    <!-- Chat Container -->
    <main class="chat-container px-5 py-4 space-y-4 flex-1">
        <!-- Welcome Message -->
        <div class="message-ai p-4">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-navy text-sm"></i>
                </div>
                <div>
                    <p class="text-sm mb-3">${t('ai.greeting', lang).replace('Hello!', `${t('welcome.hello', lang)} Sherif!`)}</p>
                    <ul class="text-sm text-gray-600 space-y-1 mb-3">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Health questions & symptom analysis</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Medication information</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Recovery guidance & tips</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Booking appointments</li>
                    </ul>
                    <p class="text-sm">How can I assist you today?</p>
                </div>
            </div>
        </div>
        
        <!-- User Message -->
        <div class="message-user p-4">
            <p class="text-sm">I've been having some mild headaches the past few days. Should I be concerned?</p>
        </div>
        
        <!-- AI Response with Analysis -->
        <div class="message-ai p-4">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-navy text-sm"></i>
                </div>
                <div class="space-y-3">
                    <p class="text-sm">I understand you're experiencing headaches. Let me help you assess this.</p>
                    
                    <!-- Quick Assessment Card -->
                    <div class="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <h4 class="font-bold text-navy text-sm mb-2"><i class="fas fa-clipboard-check text-blue-600 mr-2"></i>Quick Assessment</h4>
                        <p class="text-xs text-gray-600 mb-2">Based on your profile and recent data:</p>
                        <ul class="text-xs space-y-1">
                            <li><i class="fas fa-tint text-blue-500 mr-2"></i>Hydration: Below target (1.2L vs 2L goal)</li>
                            <li><i class="fas fa-bed text-purple-500 mr-2"></i>Sleep: 5.5 hrs avg (below 7-8 hrs recommended)</li>
                            <li><i class="fas fa-laptop text-gray-500 mr-2"></i>Screen time: 8+ hrs/day detected</li>
                        </ul>
                    </div>
                    
                    <p class="text-sm">Mild headaches with your patterns are often related to <strong>dehydration</strong> and <strong>sleep quality</strong>. However, I recommend:</p>
                    
                    <!-- Recommendations -->
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                            <i class="fas fa-check-circle text-green-600"></i>
                            <span class="text-sm">Increase water intake to 2L daily</span>
                        </div>
                        <div class="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                            <i class="fas fa-check-circle text-green-600"></i>
                            <span class="text-sm">Aim for 7-8 hours of sleep</span>
                        </div>
                        <div class="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg">
                            <i class="fas fa-exclamation-circle text-yellow-600"></i>
                            <span class="text-sm">If headaches persist beyond 5 days, consult a doctor</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Upsell Card -->
        <div class="upsell-card p-4">
            <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-user-md text-navy"></i>
                </div>
                <div>
                    <p class="text-navy font-bold text-sm">Want expert advice?</p>
                    <p class="text-navy/70 text-xs">Talk to a German specialist</p>
                </div>
            </div>
            <button class="w-full bg-navy text-white py-3 rounded-xl font-bold text-sm">
                <i class="fas fa-video mr-2"></i>Book 15-min Consultation - €50
            </button>
            <p class="text-center text-navy/60 text-xs mt-2">Or use 2,000 SelectPoints</p>
        </div>
        
        <!-- User Follow-up -->
        <div class="message-user p-4">
            <p class="text-sm">What supplements would help with energy and focus?</p>
        </div>
        
        <!-- AI Response with Product Recommendations -->
        <div class="message-ai p-4">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-navy text-sm"></i>
                </div>
                <div class="space-y-3">
                    <p class="text-sm">Great question! Based on your health profile and goals, here are evidence-based supplements that can help:</p>
                    
                    <!-- Product Recommendations -->
                    <div class="space-y-3">
                        <div class="card p-3 border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-sun text-yellow-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-navy text-sm">Vitamin D3+K2</h4>
                                    <p class="text-xs text-gray-500">Energy & immune support</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-gold font-bold">€29</span>
                                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Doctor Recommended</span>
                                    </div>
                                </div>
                                <button class="bg-gold text-navy px-3 py-1.5 rounded-lg text-xs font-bold">Add</button>
                            </div>
                        </div>
                        
                        <div class="card p-3 border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-fish text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-navy text-sm">Omega-3 DHA</h4>
                                    <p class="text-xs text-gray-500">Brain function & focus</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-gold font-bold">€34</span>
                                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Cognitive Support</span>
                                    </div>
                                </div>
                                <button class="bg-gold text-navy px-3 py-1.5 rounded-lg text-xs font-bold">Add</button>
                            </div>
                        </div>
                        
                        <div class="card p-3 border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-leaf text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-navy text-sm">Magnesium Glycinate</h4>
                                    <p class="text-xs text-gray-500">Sleep & energy metabolism</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-gold font-bold">€24</span>
                                    </div>
                                </div>
                                <button class="bg-gold text-navy px-3 py-1.5 rounded-lg text-xs font-bold">Add</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gold/10 rounded-xl p-3 border border-gold/30">
                        <p class="text-sm text-navy"><i class="fas fa-gift text-gold mr-2"></i><strong>Bundle & Save:</strong> Get all 3 for €79 (save €8) + earn 395 SelectPoints!</p>
                        <button class="w-full mt-2 bg-gold text-navy py-2 rounded-lg font-bold text-sm">Add Bundle to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Premium Feature Teaser -->
        <div class="card p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div class="flex items-center gap-3 mb-2">
                <div class="premium-badge px-3 py-1 rounded-full text-xs font-bold">PLUS</div>
                <span class="text-sm font-bold">Unlock Advanced AI Features</span>
            </div>
            <ul class="text-xs space-y-1 mb-3 text-white/80">
                <li><i class="fas fa-check mr-2"></i>Unlimited AI conversations</li>
                <li><i class="fas fa-check mr-2"></i>Personalized meal plans</li>
                <li><i class="fas fa-check mr-2"></i>Symptom tracking & predictions</li>
                <li><i class="fas fa-check mr-2"></i>Health report generation</li>
            </ul>
            <a href="/subscription" class="block text-center bg-white text-purple-600 py-2 rounded-lg font-bold text-sm">Upgrade to Plus - €79/mo</a>
        </div>
        
        <!-- Typing Indicator -->
        <div class="message-ai p-4 hidden" id="typing">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-navy text-sm"></i>
                </div>
                <div class="typing-indicator flex gap-1">
                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Quick Suggestions -->
    <div class="px-5 py-2 flex gap-2 overflow-x-auto hide-scrollbar">
        <button class="suggestion-chip flex-shrink-0">Check my vitals</button>
        <button class="suggestion-chip flex-shrink-0">Recovery tips</button>
        <button class="suggestion-chip flex-shrink-0">Book appointment</button>
        <button class="suggestion-chip flex-shrink-0">Medication info</button>
    </div>
    
    <!-- Input Area -->
    <div class="px-5 py-4 bg-cream input-area">
        <div class="input-container flex items-center gap-3 px-4 py-2">
            <button class="text-gray-400"><i class="fas fa-plus-circle text-xl"></i></button>
            <input type="text" placeholder="Ask me anything about your health..." class="flex-1 py-2 outline-none text-sm">
            <button class="text-gray-400"><i class="fas fa-microphone text-xl"></i></button>
            <button class="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <i class="fas fa-paper-plane text-navy"></i>
            </button>
        </div>
        <p class="text-center text-xs text-gray-400 mt-2">AI responses are informational only. Always consult a doctor for medical advice.</p>
    </div>
    
    <!-- Language Change Script -->
    <script>
        function changeLanguage(lang) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            localStorage.setItem('selectcare-language', lang);
            window.location.href = url.toString();
        }
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/?lang=${lang}" class="nav-item">
                <i class="fas fa-home"></i>
                <span>${t('nav.home', lang)}</span>
            </a>
            <a href="/daily-wellness?lang=${lang}" class="nav-item">
                <i class="fas fa-heart"></i>
                <span>${t('nav.wellness', lang)}</span>
            </a>
            <a href="/ai-concierge?lang=${lang}" class="nav-item active">
                <i class="fas fa-robot"></i>
                <span>AI</span>
            </a>
            <a href="/medisense?lang=${lang}" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/patient-dashboard?lang=${lang}" class="nav-item">
                <i class="fas fa-user"></i>
                <span>${t('nav.profile', lang)}</span>
            </a>
        </div>
    </nav>
</body>
</html>
`
};
