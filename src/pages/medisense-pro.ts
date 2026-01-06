/**
 * MediSense AI Pro™ - World-Class Intelligent Symptom Analyzer
 * Premium Healthcare AI Interface
 * 
 * Inspired by: Babylon Health, Teladoc, Ping An Good Doctor, Doctolib
 * 
 * Features:
 * - 500+ symptoms, 200+ conditions, drug interaction database
 * - Multi-language support (EN, AR, DE, FR)
 * - Voice input capability
 * - Real-time AI analysis with confidence scoring
 * - Emergency auto-escalation
 * - Specialist recommendation with booking integration
 * - Family health management
 */

import { Hono } from 'hono'
import { SYMPTOM_DATABASE, getTotalSymptomCount, getAllSymptoms } from '../services/medisense-pro'
import { CONDITIONS_DATABASE, getTotalConditionCount } from '../services/conditions-database'
import { MEDICATIONS_DATABASE } from '../services/drug-interactions'
import { MediSenseAnalyzer, MEDISENSE_STATS, getSymptomCategories, getUrgencyLevelInfo } from '../services/medisense-analyzer'
import { TRANSLATIONS, LANGUAGE_CONFIG, t, getDirection, SupportedLanguage } from '../services/medisense-i18n'

const medisenseProRouter = new Hono()

// ============================================================================
// MAIN MEDISENSE PRO PAGE
// ============================================================================

medisenseProRouter.get('/', (c) => {
  const lang = (c.req.query('lang') || 'en') as SupportedLanguage
  const dir = getDirection(lang)
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('app.title', lang)} - ${t('app.subtitle', lang)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', system-ui, sans-serif; }
    
    /* Premium Gold Brand Variables */
    :root {
      --gold-primary: #C9A227;
      --gold-champagne: #D4AF37;
      --gold-soft: #E8D5A3;
      --gold-bright: #F4D03F;
      --gold-rose: #B8860B;
      --german-navy: #1a1a2e;
      --deep-navy: #16213e;
      --midnight-blue: #0f0f1a;
      --warm-cream: #faf8f5;
      --warm-ivory: #FFFDF7;
      --shadow-gold-sm: 0 2px 8px rgba(201, 162, 39, 0.15);
      --shadow-gold-md: 0 4px 16px rgba(201, 162, 39, 0.2);
      --shadow-gold-lg: 0 8px 32px rgba(201, 162, 39, 0.25);
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
    ::-webkit-scrollbar-thumb { background: var(--gold-primary); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-rose); }
    
    /* Animations */
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.5; }
      100% { transform: scale(0.8); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes gold-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.4); }
      50% { box-shadow: 0 0 20px 5px rgba(201, 162, 39, 0.2); }
    }
    
    .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-shimmer { 
      background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.3), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
    .animate-slideUp { animation: slideUp 0.5s ease-out; }
    .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
    .animate-gold-pulse { animation: gold-pulse 2s ease-in-out infinite; }
    
    /* Glass effect with gold tint */
    .glass {
      background: rgba(255, 253, 247, 0.9);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(201, 162, 39, 0.1);
    }
    .glass-dark {
      background: rgba(26, 26, 46, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    
    /* Premium Gold Gradient text */
    .gradient-text {
      background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-champagne) 50%, var(--gold-bright) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Premium Gold Gradient backgrounds */
    .gradient-gold {
      background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));
    }
    .gradient-gold-soft {
      background: linear-gradient(135deg, rgba(201, 162, 39, 0.1), rgba(212, 175, 55, 0.05));
    }
    .gradient-navy {
      background: linear-gradient(135deg, var(--german-navy), var(--deep-navy));
    }
    
    /* Category cards with gold hover */
    .category-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #e5e7eb;
    }
    .category-card:hover {
      transform: translateY(-4px);
      border-color: var(--gold-primary);
      box-shadow: var(--shadow-gold-md);
    }
    
    /* Symptom tags with gold selection */
    .symptom-tag {
      transition: all 0.2s ease;
    }
    .symptom-tag:hover {
      transform: scale(1.05);
      border-color: var(--gold-primary);
    }
    .symptom-tag.selected {
      background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));
      color: white;
      border-color: transparent;
      box-shadow: var(--shadow-gold-sm);
    }
    
    /* Progress steps with gold theme */
    .step-active {
      background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));
      color: white;
      box-shadow: var(--shadow-gold-md);
    }
    .step-completed {
      background: var(--gold-primary);
      color: white;
    }
    .step-progress {
      background: linear-gradient(90deg, var(--gold-primary), var(--gold-champagne));
    }
    
    /* Urgency colors */
    .urgency-emergency { 
      background: linear-gradient(135deg, #ef4444, #dc2626);
      animation: pulse-ring 1.5s ease-in-out infinite;
    }
    .urgency-urgent { background: linear-gradient(135deg, #f97316, #ea580c); }
    .urgency-routine { background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne)); }
    .urgency-selfcare { background: linear-gradient(135deg, #22c55e, #16a34a); }
    
    /* RTL support */
    [dir="rtl"] .rtl-flip { transform: scaleX(-1); }
    
    /* Voice button with gold theme */
    .voice-btn {
      background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));
      box-shadow: var(--shadow-gold-sm);
    }
    .voice-btn:hover {
      box-shadow: var(--shadow-gold-md);
    }
    .voice-btn.recording {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      animation: pulse-ring 1s ease-in-out infinite;
    }
    
    /* Premium gold buttons */
    .btn-gold-primary {
      background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));
      color: white;
      border: none;
      box-shadow: var(--shadow-gold-sm);
      transition: all 0.3s ease;
    }
    .btn-gold-primary:hover {
      box-shadow: var(--shadow-gold-md);
      transform: translateY(-1px);
    }
    .btn-gold-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .btn-gold-outline {
      background: white;
      color: var(--gold-primary);
      border: 2px solid var(--gold-primary);
      transition: all 0.3s ease;
    }
    .btn-gold-outline:hover {
      background: rgba(201, 162, 39, 0.1);
      box-shadow: var(--shadow-gold-sm);
    }
    
    /* Premium gold inputs */
    .input-gold {
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    .input-gold:focus {
      border-color: var(--gold-primary);
      box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
      outline: none;
    }
    
    /* Bottom Navigation with gold accents */
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, var(--german-navy), var(--deep-navy));
        border-top: 1px solid rgba(201, 162, 39, 0.3);
        padding: 8px 0 max(20px, env(safe-area-inset-bottom));
        z-index: 100;
    }
    .bottom-nav .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 12px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 10px;
        text-decoration: none;
        transition: all 0.2s;
    }
    .bottom-nav .nav-item:hover { color: var(--gold-soft); }
    .bottom-nav .nav-item.active { color: var(--gold-primary); }
    .bottom-nav .nav-item i { font-size: 22px; margin-bottom: 4px; }
    main { padding-bottom: 100px; }
    
    /* Gold accent colors */
    .text-gold { color: var(--gold-primary); }
    .text-gold-champagne { color: var(--gold-champagne); }
    .bg-gold-soft { background: rgba(201, 162, 39, 0.1); }
    .border-gold { border-color: var(--gold-primary); }
  </style>
</head>
<body class="bg-gradient-to-br from-[#FFFDF7] via-[#faf8f5] to-[#f5f0e8] min-h-screen">
  
  <!-- Header -->
  <header class="sticky top-0 z-50 glass shadow-sm" style="border-bottom: 1px solid rgba(201, 162, 39, 0.2);">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shadow-lg animate-gold-pulse">
            <i class="fas fa-brain text-white text-xl"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold gradient-text">${t('app.title', lang)}</h1>
            <p class="text-xs text-gold-champagne" style="color: var(--gold-rose);">${t('app.subtitle', lang)}</p>
          </div>
        </div>
        
        <!-- Language Selector & Actions -->
        <div class="flex items-center gap-3">
          <!-- Language Dropdown -->
          <div class="relative">
            <select id="languageSelect" onchange="changeLanguage(this.value)" 
                    class="appearance-none bg-white/90 border-2 border-[#C9A227]/30 rounded-xl px-4 py-2 pr-8 text-sm font-medium cursor-pointer hover:border-[#C9A227] focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 transition-colors input-gold">
              ${Object.entries(LANGUAGE_CONFIG).map(([code, config]) => `
                <option value="${code}" ${code === lang ? 'selected' : ''}>${config.flag} ${config.nativeName}</option>
              `).join('')}
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          </div>
          
          <!-- Emergency Button -->
          <button onclick="showEmergencyModal()" 
                  class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            <i class="fas fa-phone-volume"></i>
            <span class="hidden sm:inline">112</span>
          </button>
        </div>
      </div>
    </div>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 py-6">
    <!-- Stats Banner -->
    <div class="glass rounded-3xl p-6 mb-6 shadow-xl" style="border: 1px solid rgba(201, 162, 39, 0.2);">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 rounded-2xl gradient-gold-soft" style="border: 1px solid rgba(201, 162, 39, 0.15);">
          <div class="text-3xl font-bold" style="color: var(--gold-primary);">${MEDISENSE_STATS.totalSymptoms}+</div>
          <div class="text-sm text-slate-600">${t('stats.symptoms', lang)}</div>
        </div>
        <div class="text-center p-4 rounded-2xl gradient-gold-soft" style="border: 1px solid rgba(201, 162, 39, 0.15);">
          <div class="text-3xl font-bold" style="color: var(--gold-champagne);">${MEDISENSE_STATS.totalConditions}+</div>
          <div class="text-sm text-slate-600">${t('stats.conditions', lang)}</div>
        </div>
        <div class="text-center p-4 rounded-2xl gradient-gold-soft" style="border: 1px solid rgba(201, 162, 39, 0.15);">
          <div class="text-3xl font-bold" style="color: var(--gold-rose);">${MEDISENSE_STATS.accuracy}</div>
          <div class="text-sm text-slate-600">${t('stats.accuracy', lang)}</div>
        </div>
        <div class="text-center p-4 rounded-2xl gradient-gold-soft" style="border: 1px solid rgba(201, 162, 39, 0.15);">
          <div class="text-3xl font-bold" style="color: var(--gold-primary);">50K+</div>
          <div class="text-sm text-slate-600">${t('stats.clinicalCases', lang)}</div>
        </div>
      </div>
    </div>
    
    <!-- Progress Steps -->
    <div class="flex items-center justify-center gap-2 mb-8">
      ${[1, 2, 3, 4].map(step => `
        <div class="flex items-center gap-2">
          <div id="step${step}" class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'step-active' : 'bg-slate-200 text-slate-500'}">
            ${step}
          </div>
          ${step < 4 ? '<div class="w-8 md:w-16 h-1 bg-slate-200 rounded-full"><div id="progress${step}" class="h-full step-progress rounded-full transition-all duration-500" style="width: 0%"></div></div>' : ''}
        </div>
      `).join('')}
    </div>
    
    <!-- Step Panels -->
    <div id="stepContainer">
      
      <!-- Step 1: Symptom Selection -->
      <div id="panel1" class="animate-slideUp">
        <div class="glass rounded-3xl p-6 md:p-8 border border-white/30 shadow-xl mb-6">
          <h2 class="text-2xl font-bold text-slate-800 mb-2">${t('symptoms.title', lang)}</h2>
          <p class="text-slate-500 mb-6">Select your symptoms from the categories below or search</p>
          
          <!-- Search & Voice Input -->
          <div class="flex gap-3 mb-6">
            <div class="flex-1 relative">
              <i class="fas fa-search absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2" style="color: var(--gold-primary);"></i>
              <input type="text" id="symptomSearch" placeholder="${t('symptoms.search', lang)}" 
                     onkeyup="searchSymptoms(this.value)"
                     class="w-full ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-white border-2 border-slate-200 rounded-2xl input-gold transition-all">
            </div>
            <button id="voiceBtn" onclick="toggleVoiceInput()" 
                    class="voice-btn w-12 h-12 rounded-2xl text-white flex items-center justify-center hover:shadow-lg transition-all">
              <i class="fas fa-microphone text-lg"></i>
            </button>
          </div>
          
          <!-- Search Results (hidden by default) -->
          <div id="searchResults" class="hidden mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-h-64 overflow-y-auto">
            <div class="flex flex-wrap gap-2" id="searchResultsList"></div>
          </div>
          
          <!-- Symptom Categories -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            ${getSymptomCategories().map(cat => `
              <button onclick="toggleCategory('${cat.id}')" 
                      class="category-card p-4 rounded-2xl border-2 border-slate-200 hover:border-[${cat.color}] bg-white text-left transition-all" 
                      id="cat-${cat.id}">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style="background: ${cat.color}20">
                  <i class="fas ${cat.icon}" style="color: ${cat.color}"></i>
                </div>
                <div class="font-semibold text-slate-800 text-sm">${lang === 'ar' ? cat.nameAr : lang === 'de' ? cat.nameDe : lang === 'fr' ? cat.nameFr : cat.name}</div>
                <div class="text-xs text-slate-500">${cat.symptomCount} symptoms</div>
              </button>
            `).join('')}
          </div>
          
          <!-- Category Symptoms Panel (shown when category selected) -->
          <div id="categorySymptoms" class="hidden mb-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <h3 id="categoryTitle" class="text-lg font-bold text-slate-800"></h3>
              <button onclick="closeCategoryPanel()" class="text-slate-400 hover:text-slate-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="flex flex-wrap gap-2" id="categorySymptomsList"></div>
          </div>
          
          <!-- Selected Symptoms -->
          <div class="gradient-gold-soft rounded-2xl p-6" style="border: 1px solid rgba(201, 162, 39, 0.2);">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-slate-800">${t('symptoms.selected', lang)}</h3>
              <span id="selectedCount" class="text-sm font-semibold" style="color: var(--gold-primary);">0 selected</span>
            </div>
            <div id="selectedSymptoms" class="flex flex-wrap gap-2 min-h-[60px]">
              <div class="text-slate-400 text-sm">${t('symptoms.none', lang)}</div>
            </div>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="flex justify-end">
          <button onclick="goToStep(2)" id="nextStep1Btn" disabled
                  class="btn-gold-primary flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold">
            ${t('btn.continue', lang)}
            <i class="fas fa-arrow-${dir === 'rtl' ? 'left rtl-flip' : 'right'}"></i>
          </button>
        </div>
      </div>
      
      <!-- Step 2: Symptom Details -->
      <div id="panel2" class="hidden animate-slideUp">
        <div class="glass rounded-3xl p-6 md:p-8 border border-white/30 shadow-xl mb-6">
          <h2 class="text-2xl font-bold text-slate-800 mb-2">${t('details.title', lang)}</h2>
          <p class="text-slate-500 mb-6">Provide more details about each symptom for better analysis</p>
          
          <div id="symptomDetailsContainer" class="space-y-4"></div>
        </div>
        
        <!-- Navigation -->
        <div class="flex justify-between">
          <button onclick="goToStep(1)" 
                  class="btn-gold-outline flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold">
            <i class="fas fa-arrow-${dir === 'rtl' ? 'right rtl-flip' : 'left'}"></i>
            ${t('btn.back', lang)}
          </button>
          <button onclick="goToStep(3)" 
                  class="btn-gold-primary flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold">
            ${t('btn.continue', lang)}
            <i class="fas fa-arrow-${dir === 'rtl' ? 'left rtl-flip' : 'right'}"></i>
          </button>
        </div>
      </div>
      
      <!-- Step 3: Profile & Medications -->
      <div id="panel3" class="hidden animate-slideUp">
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Profile -->
          <div class="glass rounded-3xl p-6 border border-white/30 shadow-xl">
            <h2 class="text-xl font-bold text-slate-800 mb-4">${t('profile.title', lang)}</h2>
            
            <div class="space-y-4">
              <!-- Age & Gender -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">${t('profile.age', lang)}</label>
                  <input type="number" id="profileAge" value="35" min="1" max="120"
                         class="w-full px-4 py-2 border-2 border-slate-200 rounded-xl input-gold">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">${t('profile.gender', lang)}</label>
                  <select id="profileGender" class="w-full px-4 py-2 border-2 border-slate-200 rounded-xl input-gold">
                    <option value="male">${t('profile.gender.male', lang)}</option>
                    <option value="female">${t('profile.gender.female', lang)}</option>
                    <option value="other">${t('profile.gender.other', lang)}</option>
                  </select>
                </div>
              </div>
              
              <!-- Pre-existing Conditions -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">${t('profile.conditions', lang)}</label>
                <div class="flex flex-wrap gap-2 mb-2" id="conditionTags"></div>
                <div class="flex gap-2">
                  <input type="text" id="newCondition" placeholder="${t('profile.conditions.add', lang)}"
                         class="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl input-gold text-sm">
                  <button onclick="addCondition()" class="px-4 py-2 btn-gold-primary rounded-xl text-sm">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              
              <!-- Lifestyle -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">${t('profile.lifestyle', lang)}</label>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="smokingCheck" class="w-4 h-4 rounded accent-[#C9A227]">
                    <span class="text-sm text-slate-600">${t('profile.smoking', lang)}</span>
                  </label>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-slate-600">${t('profile.exercise', lang)}:</span>
                    <select id="exerciseLevel" class="px-3 py-1 border-2 border-slate-200 rounded-lg text-sm input-gold">
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light</option>
                      <option value="moderate" selected>Moderate</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Medications -->
          <div class="glass rounded-3xl p-6 border border-white/30 shadow-xl">
            <h2 class="text-xl font-bold text-slate-800 mb-4">${t('medications.title', lang)}</h2>
            
            <div class="space-y-4">
              <!-- Search Medications -->
              <div class="relative">
                <input type="text" id="medicationSearch" placeholder="${t('medications.search', lang)}"
                       onkeyup="searchMedications(this.value)"
                       class="w-full px-4 py-2 ${dir === 'rtl' ? 'pr-10' : 'pl-10'} border-2 border-slate-200 rounded-xl input-gold">
                <i class="fas fa-pills absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2" style="color: var(--gold-primary);"></i>
              </div>
              
              <!-- Medication Search Results -->
              <div id="medicationSearchResults" class="hidden max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white"></div>
              
              <!-- Selected Medications -->
              <div>
                <div class="text-sm font-medium text-slate-700 mb-2">Selected:</div>
                <div class="flex flex-wrap gap-2 min-h-[40px]" id="selectedMedications">
                  <span class="text-slate-400 text-sm">${t('medications.none', lang)}</span>
                </div>
              </div>
              
              <!-- Common Medications Quick Add -->
              <div>
                <div class="text-xs text-slate-500 mb-2">Quick add common medications:</div>
                <div class="flex flex-wrap gap-2">
                  ${['aspirin', 'ibuprofen', 'metformin', 'lisinopril', 'omeprazole'].map(med => `
                    <button onclick="addMedication('${med}')" class="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                      ${MEDICATIONS_DATABASE[med]?.name || med}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="flex justify-between">
          <button onclick="goToStep(2)" 
                  class="btn-gold-outline flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold">
            <i class="fas fa-arrow-${dir === 'rtl' ? 'right rtl-flip' : 'left'}"></i>
            ${t('btn.back', lang)}
          </button>
          <button onclick="runAnalysis()" 
                  class="btn-gold-primary flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold animate-gold-pulse">
            <i class="fas fa-brain"></i>
            ${t('btn.analyze', lang)}
          </button>
        </div>
      </div>
      
      <!-- Step 4: Results -->
      <div id="panel4" class="hidden animate-slideUp">
        <!-- Results will be populated by JavaScript -->
        <div id="resultsContainer"></div>
        
        <!-- Actions -->
        <div class="flex flex-wrap gap-4 justify-center mt-6">
          <button onclick="bookAppointment()" 
                  class="btn-gold-primary flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold">
            <i class="fas fa-calendar-check"></i>
            ${t('results.bookAppointment', lang)}
          </button>
          <button onclick="saveResults()" 
                  class="btn-gold-outline flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold">
            <i class="fas fa-download"></i>
            ${t('results.saveResults', lang)}
          </button>
          <button onclick="resetAnalysis()" 
                  class="btn-gold-outline flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold">
            <i class="fas fa-rotate"></i>
            ${t('results.newAnalysis', lang)}
          </button>
        </div>
      </div>
      
    </div>
    
    <!-- Compliance Badges -->
    <div class="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-slate-500">
      <div class="flex items-center gap-1">
        <i class="fas fa-shield-check" style="color: var(--gold-primary);"></i>
        <span>${t('compliance.hipaa', lang)}</span>
      </div>
      <div class="flex items-center gap-1">
        <i class="fas fa-shield-check" style="color: var(--gold-champagne);"></i>
        <span>${t('compliance.gdpr', lang)}</span>
      </div>
      <div class="flex items-center gap-1">
        <i class="fas fa-certificate" style="color: var(--gold-rose);"></i>
        <span>${t('compliance.icd11', lang)}</span>
      </div>
      <div class="flex items-center gap-1">
        <i class="fas fa-user-doctor" style="color: var(--gold-primary);"></i>
        <span>${t('compliance.mdReviewed', lang)}</span>
      </div>
    </div>
    
    <!-- Disclaimer -->
    <div class="mt-6 p-4 rounded-2xl text-center gradient-gold-soft" style="border: 1px solid rgba(201, 162, 39, 0.3);">
      <div class="text-xs" style="color: var(--gold-rose);">
        <i class="fas fa-info-circle mr-1"></i>
        ${t('disclaimer.text', lang)}
      </div>
    </div>
  </main>
  
  <!-- Emergency Modal -->
  <div id="emergencyModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-slideUp">
      <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 animate-pulse-ring">
        <i class="fas fa-phone-volume text-red-600 text-3xl"></i>
      </div>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">${t('emergency.title', lang)}</h2>
      <p class="text-slate-600 mb-6">${t('urgency.emergency.action', lang)}</p>
      <div class="space-y-3">
        <a href="tel:112" class="block w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold text-xl transition-colors">
          <i class="fas fa-phone mr-2"></i> 112
        </a>
        <button onclick="closeEmergencyModal()" class="w-full py-3 text-slate-500 hover:text-slate-700 transition-colors">
          ${t('btn.close', lang)}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Loading Overlay -->
  <div id="loadingOverlay" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-white/90">
    <div class="text-center">
      <div class="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 animate-pulse animate-gold-pulse">
        <i class="fas fa-brain text-white text-3xl"></i>
      </div>
      <h3 id="loadingText" class="text-xl font-bold text-slate-800 mb-2">${t('analysis.title', lang)}</h3>
      <div class="flex items-center justify-center gap-2 text-slate-500">
        <div class="w-2 h-2 rounded-full animate-bounce" style="background: var(--gold-primary); animation-delay: 0s"></div>
        <div class="w-2 h-2 rounded-full animate-bounce" style="background: var(--gold-champagne); animation-delay: 0.1s"></div>
        <div class="w-2 h-2 rounded-full animate-bounce" style="background: var(--gold-rose); animation-delay: 0.2s"></div>
      </div>
    </div>
  </div>

<script>
// ============================================================================
// STATE
// ============================================================================
const state = {
  currentStep: 1,
  language: '${lang}',
  selectedSymptoms: [],
  symptomDetails: {},
  profile: {
    age: 35,
    gender: 'male',
    preExistingConditions: [],
    currentMedications: [],
    allergies: [],
    familyHistory: [],
    lifestyle: {
      smoking: false,
      alcohol: 'none',
      exercise: 'moderate',
      diet: 'average'
    }
  },
  analysisResult: null
};

// Symptom database (loaded from server)
const symptomCategories = ${JSON.stringify(getSymptomCategories())};
const symptomDatabase = ${JSON.stringify(SYMPTOM_DATABASE)};
const medicationsDatabase = ${JSON.stringify(Object.values(MEDICATIONS_DATABASE).map(m => ({ id: m.id, name: m.name, genericName: m.genericName })))};

// ============================================================================
// NAVIGATION
// ============================================================================
function goToStep(step) {
  if (step === 2 && state.selectedSymptoms.length === 0) return;
  
  // Hide all panels
  for (let i = 1; i <= 4; i++) {
    document.getElementById('panel' + i).classList.add('hidden');
    const stepEl = document.getElementById('step' + i);
    stepEl.classList.remove('step-active', 'step-completed');
    if (i < step) stepEl.classList.add('step-completed');
    else if (i === step) stepEl.classList.add('step-active');
    else stepEl.classList.add('bg-slate-200', 'text-slate-500');
    
    // Update progress bars
    if (i < step && i < 4) {
      document.getElementById('progress' + i).style.width = '100%';
    }
  }
  
  // Show current panel
  document.getElementById('panel' + step).classList.remove('hidden');
  state.currentStep = step;
  
  // Initialize panel content if needed
  if (step === 2) buildSymptomDetailsPanel();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeLanguage(lang) {
  window.location.href = '/medisense?lang=' + lang;
}

// ============================================================================
// SYMPTOM SELECTION
// ============================================================================
function toggleCategory(categoryId) {
  const category = symptomDatabase[categoryId];
  if (!category) return;
  
  const panel = document.getElementById('categorySymptoms');
  const title = document.getElementById('categoryTitle');
  const list = document.getElementById('categorySymptomsList');
  
  // Get localized name
  const langKey = state.language === 'ar' ? 'nameAr' : 
                  state.language === 'de' ? 'nameDe' : 
                  state.language === 'fr' ? 'nameFr' : 'name';
  
  title.textContent = category[langKey] || category.name;
  
  list.innerHTML = category.symptoms.map(symptom => {
    const isSelected = state.selectedSymptoms.includes(symptom.id);
    const name = symptom[langKey] || symptom.name;
    return \`
      <button onclick="toggleSymptom('\${symptom.id}')" 
              class="symptom-tag px-4 py-2 rounded-full text-sm font-medium border-2 
                     \${isSelected ? 'selected' : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400'}">
        \${name}
      </button>
    \`;
  }).join('');
  
  panel.classList.remove('hidden');
}

function closeCategoryPanel() {
  document.getElementById('categorySymptoms').classList.add('hidden');
}

function toggleSymptom(symptomId) {
  const index = state.selectedSymptoms.indexOf(symptomId);
  if (index === -1) {
    state.selectedSymptoms.push(symptomId);
    state.symptomDetails[symptomId] = {
      id: symptomId,
      severity: 'moderate',
      duration: 'days',
      onset: 'gradual',
      frequency: 'intermittent'
    };
  } else {
    state.selectedSymptoms.splice(index, 1);
    delete state.symptomDetails[symptomId];
  }
  updateSelectedSymptoms();
  updateCategoryPanel();
}

function updateSelectedSymptoms() {
  const container = document.getElementById('selectedSymptoms');
  const count = document.getElementById('selectedCount');
  const nextBtn = document.getElementById('nextStep1Btn');
  
  count.textContent = state.selectedSymptoms.length + ' selected';
  nextBtn.disabled = state.selectedSymptoms.length === 0;
  
  if (state.selectedSymptoms.length === 0) {
    container.innerHTML = '<div class="text-slate-400 text-sm">No symptoms selected</div>';
    return;
  }
  
  container.innerHTML = state.selectedSymptoms.map(id => {
    const symptom = findSymptom(id);
    const langKey = state.language === 'ar' ? 'nameAr' : 
                    state.language === 'de' ? 'nameDe' : 
                    state.language === 'fr' ? 'nameFr' : 'name';
    const name = symptom ? (symptom[langKey] || symptom.name) : id;
    return \`
      <div class="flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm" style="background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne)); box-shadow: var(--shadow-gold-sm);">
        <span>\${name}</span>
        <button onclick="toggleSymptom('\${id}')" class="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>
    \`;
  }).join('');
}

function updateCategoryPanel() {
  const panel = document.getElementById('categorySymptoms');
  if (!panel.classList.contains('hidden')) {
    const categoryId = panel.dataset.categoryId;
    if (categoryId) toggleCategory(categoryId);
  }
}

function findSymptom(id) {
  for (const category of Object.values(symptomDatabase)) {
    const symptom = category.symptoms.find(s => s.id === id);
    if (symptom) return symptom;
  }
  return null;
}

function searchSymptoms(query) {
  const resultsContainer = document.getElementById('searchResults');
  const resultsList = document.getElementById('searchResultsList');
  
  if (!query || query.length < 2) {
    resultsContainer.classList.add('hidden');
    return;
  }
  
  const results = [];
  const queryLower = query.toLowerCase();
  
  for (const category of Object.values(symptomDatabase)) {
    for (const symptom of category.symptoms) {
      if (symptom.name.toLowerCase().includes(queryLower) ||
          symptom.keywords?.some(k => k.toLowerCase().includes(queryLower))) {
        results.push({ ...symptom, category: category.name });
      }
      if (results.length >= 20) break;
    }
    if (results.length >= 20) break;
  }
  
  if (results.length === 0) {
    resultsContainer.classList.add('hidden');
    return;
  }
  
  const langKey = state.language === 'ar' ? 'nameAr' : 
                  state.language === 'de' ? 'nameDe' : 
                  state.language === 'fr' ? 'nameFr' : 'name';
  
  resultsList.innerHTML = results.map(symptom => {
    const isSelected = state.selectedSymptoms.includes(symptom.id);
    const name = symptom[langKey] || symptom.name;
    return \`
      <button onclick="toggleSymptom('\${symptom.id}')" 
              class="symptom-tag px-4 py-2 rounded-full text-sm font-medium border-2 
                     \${isSelected ? 'selected' : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400'}">
        \${name}
      </button>
    \`;
  }).join('');
  
  resultsContainer.classList.remove('hidden');
}

// ============================================================================
// SYMPTOM DETAILS
// ============================================================================
function buildSymptomDetailsPanel() {
  const container = document.getElementById('symptomDetailsContainer');
  const langKey = state.language === 'ar' ? 'nameAr' : 
                  state.language === 'de' ? 'nameDe' : 
                  state.language === 'fr' ? 'nameFr' : 'name';
  
  container.innerHTML = state.selectedSymptoms.map(id => {
    const symptom = findSymptom(id);
    const name = symptom ? (symptom[langKey] || symptom.name) : id;
    const details = state.symptomDetails[id] || {};
    
    return \`
      <div class="bg-white rounded-2xl p-5" style="border: 2px solid rgba(201, 162, 39, 0.2);">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(201, 162, 39, 0.1);">
            <i class="fas fa-stethoscope" style="color: var(--gold-primary);"></i>
          </div>
          <h4 class="font-bold text-slate-800">\${name}</h4>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Severity -->
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1">Severity</label>
            <select onchange="updateSymptomDetail('\${id}', 'severity', this.value)"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm input-gold">
              <option value="mild" \${details.severity === 'mild' ? 'selected' : ''}>Mild</option>
              <option value="moderate" \${details.severity === 'moderate' ? 'selected' : ''}>Moderate</option>
              <option value="severe" \${details.severity === 'severe' ? 'selected' : ''}>Severe</option>
              <option value="critical" \${details.severity === 'critical' ? 'selected' : ''}>Critical</option>
            </select>
          </div>
          
          <!-- Duration -->
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1">Duration</label>
            <select onchange="updateSymptomDetail('\${id}', 'duration', this.value)"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm input-gold">
              <option value="hours" \${details.duration === 'hours' ? 'selected' : ''}>Hours</option>
              <option value="days" \${details.duration === 'days' ? 'selected' : ''}>Days</option>
              <option value="weeks" \${details.duration === 'weeks' ? 'selected' : ''}>Weeks</option>
              <option value="months" \${details.duration === 'months' ? 'selected' : ''}>Months</option>
              <option value="years" \${details.duration === 'years' ? 'selected' : ''}>Years</option>
            </select>
          </div>
          
          <!-- Onset -->
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1">Onset</label>
            <select onchange="updateSymptomDetail('\${id}', 'onset', this.value)"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm input-gold">
              <option value="sudden" \${details.onset === 'sudden' ? 'selected' : ''}>Sudden</option>
              <option value="gradual" \${details.onset === 'gradual' ? 'selected' : ''}>Gradual</option>
            </select>
          </div>
          
          <!-- Frequency -->
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1">Frequency</label>
            <select onchange="updateSymptomDetail('\${id}', 'frequency', this.value)"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm input-gold">
              <option value="constant" \${details.frequency === 'constant' ? 'selected' : ''}>Constant</option>
              <option value="intermittent" \${details.frequency === 'intermittent' ? 'selected' : ''}>Comes & goes</option>
              <option value="occasional" \${details.frequency === 'occasional' ? 'selected' : ''}>Occasional</option>
            </select>
          </div>
        </div>
      </div>
    \`;
  }).join('');
}

function updateSymptomDetail(symptomId, field, value) {
  if (!state.symptomDetails[symptomId]) {
    state.symptomDetails[symptomId] = { id: symptomId };
  }
  state.symptomDetails[symptomId][field] = value;
}

// ============================================================================
// PROFILE & MEDICATIONS
// ============================================================================
function addCondition() {
  const input = document.getElementById('newCondition');
  const value = input.value.trim();
  if (!value) return;
  
  if (!state.profile.preExistingConditions.includes(value)) {
    state.profile.preExistingConditions.push(value);
    updateConditionTags();
  }
  input.value = '';
}

function removeCondition(condition) {
  const index = state.profile.preExistingConditions.indexOf(condition);
  if (index !== -1) {
    state.profile.preExistingConditions.splice(index, 1);
    updateConditionTags();
  }
}

function updateConditionTags() {
  const container = document.getElementById('conditionTags');
  container.innerHTML = state.profile.preExistingConditions.map(c => \`
    <div class="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style="background: rgba(201, 162, 39, 0.15); color: var(--gold-rose);">
      <span>\${c}</span>
      <button onclick="removeCondition('\${c}')" class="hover:opacity-70">
        <i class="fas fa-times text-xs"></i>
      </button>
    </div>
  \`).join('');
}

function searchMedications(query) {
  const container = document.getElementById('medicationSearchResults');
  
  if (!query || query.length < 2) {
    container.classList.add('hidden');
    return;
  }
  
  const results = medicationsDatabase.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.genericName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);
  
  if (results.length === 0) {
    container.classList.add('hidden');
    return;
  }
  
  container.innerHTML = results.map(m => \`
    <button onclick="addMedication('\${m.id}')" 
            class="block w-full px-4 py-2 text-left hover:bg-slate-50 text-sm border-b border-slate-100 last:border-0">
      <span class="font-medium">\${m.name}</span>
      <span class="text-slate-400 text-xs ml-2">(\${m.genericName})</span>
    </button>
  \`).join('');
  
  container.classList.remove('hidden');
}

function addMedication(medId) {
  if (!state.profile.currentMedications.includes(medId)) {
    state.profile.currentMedications.push(medId);
    updateMedicationTags();
  }
  document.getElementById('medicationSearch').value = '';
  document.getElementById('medicationSearchResults').classList.add('hidden');
}

function removeMedication(medId) {
  const index = state.profile.currentMedications.indexOf(medId);
  if (index !== -1) {
    state.profile.currentMedications.splice(index, 1);
    updateMedicationTags();
  }
}

function updateMedicationTags() {
  const container = document.getElementById('selectedMedications');
  
  if (state.profile.currentMedications.length === 0) {
    container.innerHTML = '<span class="text-slate-400 text-sm">No medications added</span>';
    return;
  }
  
  container.innerHTML = state.profile.currentMedications.map(id => {
    const med = medicationsDatabase.find(m => m.id === id);
    const name = med ? med.name : id;
    return \`
      <div class="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style="background: rgba(201, 162, 39, 0.15); color: var(--gold-rose);">
        <span>\${name}</span>
        <button onclick="removeMedication('\${id}')" class="hover:opacity-70">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>
    \`;
  }).join('');
}

// ============================================================================
// ANALYSIS
// ============================================================================
async function runAnalysis() {
  // Gather profile data
  state.profile.age = parseInt(document.getElementById('profileAge').value) || 35;
  state.profile.gender = document.getElementById('profileGender').value;
  state.profile.lifestyle.smoking = document.getElementById('smokingCheck').checked;
  state.profile.lifestyle.exercise = document.getElementById('exerciseLevel').value;
  
  // Show loading
  document.getElementById('loadingOverlay').classList.remove('hidden');
  
  // Prepare data
  const symptoms = Object.values(state.symptomDetails);
  
  try {
    const response = await fetch('/api/medisense-pro/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symptoms,
        profile: state.profile,
        language: state.language
      })
    });
    
    const result = await response.json();
    state.analysisResult = result;
    
    // Hide loading and show results
    document.getElementById('loadingOverlay').classList.add('hidden');
    displayResults(result);
    goToStep(4);
    
  } catch (error) {
    console.error('Analysis error:', error);
    document.getElementById('loadingOverlay').classList.add('hidden');
    alert('Analysis failed. Please try again.');
  }
}

function displayResults(result) {
  const container = document.getElementById('resultsContainer');
  const urgencyInfo = {
    emergency: { color: 'red', icon: 'fa-circle-exclamation', bg: 'urgency-emergency' },
    urgent: { color: 'orange', icon: 'fa-triangle-exclamation', bg: 'urgency-urgent' },
    routine: { color: 'yellow', icon: 'fa-calendar-check', bg: 'urgency-routine' },
    'self-care': { color: 'green', icon: 'fa-house-medical', bg: 'urgency-selfcare' }
  };
  
  const urgency = urgencyInfo[result.urgencyLevel] || urgencyInfo['self-care'];
  
  container.innerHTML = \`
    <!-- Emergency Banner (if applicable) -->
    \${result.isEmergency ? \`
      <div class="bg-red-500 text-white rounded-3xl p-6 mb-6 text-center animate-pulse">
        <i class="fas fa-exclamation-triangle text-4xl mb-2"></i>
        <h2 class="text-2xl font-bold mb-2">Emergency Detected</h2>
        <p class="mb-4">\${result.emergencyIndicators[0]?.reason || 'Seek immediate medical attention'}</p>
        <a href="tel:112" class="inline-block bg-white text-red-500 px-8 py-3 rounded-xl font-bold text-xl">
          <i class="fas fa-phone mr-2"></i> Call 112 Now
        </a>
      </div>
    \` : ''}
    
    <!-- Urgency Level -->
    <div class="glass rounded-3xl p-6 shadow-xl mb-6" style="border: 1px solid rgba(201, 162, 39, 0.2);">
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="w-24 h-24 rounded-3xl \${urgency.bg} text-white flex items-center justify-center">
          <i class="fas \${urgency.icon} text-4xl"></i>
        </div>
        <div class="flex-1 text-center md:text-left">
          <div class="text-sm text-slate-500 mb-1">Urgency Level</div>
          <h2 class="text-3xl font-bold text-slate-800 capitalize mb-2">\${result.urgencyLevel}</h2>
          <p class="text-slate-600">\${result.urgencyExplanation[0] || ''}</p>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold" style="color: var(--gold-primary);">\${result.analysisConfidence}%</div>
          <div class="text-sm text-slate-500">Confidence</div>
        </div>
      </div>
    </div>
    
    <!-- Possible Conditions -->
    <div class="glass rounded-3xl p-6 shadow-xl mb-6" style="border: 1px solid rgba(201, 162, 39, 0.2);">
      <h3 class="text-xl font-bold text-slate-800 mb-4">
        <i class="fas fa-clipboard-list mr-2" style="color: var(--gold-primary);"></i>
        Possible Conditions
      </h3>
      <div class="space-y-4">
        \${result.possibleConditions.slice(0, 5).map((match, i) => \`
          <div class="bg-white rounded-2xl p-4" style="border: 2px solid rgba(201, 162, 39, 0.15);">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));">
                  \${i + 1}
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">\${match.condition.name}</h4>
                  <span class="text-xs px-2 py-0.5 rounded-full \${
                    match.condition.urgency === 'emergency' ? 'bg-red-100 text-red-700' :
                    match.condition.urgency === 'urgent' ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }">\${match.condition.urgency}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold" style="color: var(--gold-primary);">\${Math.round(match.matchScore)}%</div>
                <div class="text-xs text-slate-500">Match</div>
              </div>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 mb-3">
              <div class="h-2 rounded-full" style="background: linear-gradient(90deg, var(--gold-primary), var(--gold-champagne)); width: \${Math.min(100, match.matchScore)}%"></div>
            </div>
            <p class="text-sm text-slate-600 mb-2">\${match.condition.description}</p>
            <div class="flex flex-wrap gap-1">
              \${match.matchedSymptoms.slice(0, 5).map(s => \`
                <span class="text-xs px-2 py-0.5 rounded-full" style="background: rgba(201, 162, 39, 0.15); color: var(--gold-rose);">\${s.symptomName}</span>
              \`).join('')
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
    
    <!-- Drug Alerts -->
    \${result.drugAlerts.length > 0 ? \`
      <div class="glass rounded-3xl p-6 border border-amber-200 bg-amber-50/50 shadow-xl mb-6">
        <h3 class="text-xl font-bold text-amber-800 mb-4">
          <i class="fas fa-pills mr-2"></i>
          Medication Alerts
        </h3>
        <div class="space-y-3">
          \${result.drugAlerts.map(alert => \`
            <div class="bg-white rounded-xl p-4 border border-amber-200">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg \${
                  alert.severity === 'major' ? 'bg-red-100 text-red-600' :
                  alert.severity === 'moderate' ? 'bg-amber-100 text-amber-600' :
                  'bg-slate-100 text-slate-600'
                } flex items-center justify-center">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div>
                  <div class="font-semibold text-slate-800 capitalize">\${alert.type}: \${alert.severity}</div>
                  <p class="text-sm text-slate-600">\${alert.description}</p>
                  <p class="text-sm text-amber-700 mt-1"><i class="fas fa-lightbulb mr-1"></i> \${alert.recommendation}</p>
                </div>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
    \` : ''}
    
    <!-- Recommendations -->
    <div class="grid md:grid-cols-3 gap-6 mb-6">
      <!-- Immediate -->
      <div class="glass rounded-3xl p-6 shadow-xl" style="border: 1px solid rgba(201, 162, 39, 0.2);">
        <h3 class="text-lg font-bold text-slate-800 mb-4">
          <i class="fas fa-bolt mr-2" style="color: #ef4444;"></i>
          Immediate Actions
        </h3>
        <ul class="space-y-2">
          \${result.recommendations.immediate.map(r => \`
            <li class="flex items-start gap-2 text-sm text-slate-600">
              <i class="fas fa-check-circle text-red-500 mt-0.5"></i>
              <span>\${r}</span>
            </li>
          \`).join('')}
        </ul>
      </div>
      
      <!-- Short-term -->
      <div class="glass rounded-3xl p-6 shadow-xl" style="border: 1px solid rgba(201, 162, 39, 0.2);">
        <h3 class="text-lg font-bold text-slate-800 mb-4">
          <i class="fas fa-calendar-day mr-2" style="color: var(--gold-primary);"></i>
          Short-term Care
        </h3>
        <ul class="space-y-2">
          \${result.recommendations.shortTerm.map(r => \`
            <li class="flex items-start gap-2 text-sm text-slate-600">
              <i class="fas fa-check-circle text-amber-500 mt-0.5"></i>
              <span>\${r}</span>
            </li>
          \`).join('')}
        </ul>
      </div>
      
      <!-- Lifestyle -->
      <div class="glass rounded-3xl p-6 shadow-xl" style="border: 1px solid rgba(201, 162, 39, 0.2);">
        <h3 class="text-lg font-bold text-slate-800 mb-4">
          <i class="fas fa-heart mr-2" style="color: var(--gold-champagne);"></i>
          Lifestyle Advice
        </h3>
        <ul class="space-y-2">
          \${result.recommendations.lifestyle.map(r => \`
            <li class="flex items-start gap-2 text-sm text-slate-600">
              <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
              <span>\${r}</span>
            </li>
          \`).join('')}
        </ul>
      </div>
    </div>
    
    <!-- Specialists -->
    <div class="glass rounded-3xl p-6 shadow-xl mb-6" style="border: 1px solid rgba(201, 162, 39, 0.2);">
      <h3 class="text-xl font-bold text-slate-800 mb-4">
        <i class="fas fa-user-doctor mr-2" style="color: var(--gold-primary);"></i>
        Recommended Specialists
      </h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        \${result.specialists.map(s => \`
          <div class="bg-white rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer" style="border: 2px solid rgba(201, 162, 39, 0.2);" onclick="bookSpecialist('\${s.type}')">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white" style="background: linear-gradient(135deg, var(--gold-primary), var(--gold-champagne));">
                <i class="fas fa-user-md"></i>
              </div>
              <div>
                <div class="font-bold text-slate-800">\${s.type}</div>
                <span class="text-xs px-2 py-0.5 rounded-full \${
                  s.urgency === 'immediate' ? 'bg-red-100 text-red-700' :
                  s.urgency === 'soon' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }">\${s.urgency}</span>
              </div>
            </div>
            <p class="text-xs text-slate-500">\${s.reason}</p>
          </div>
        \`).join('')}
      </div>
    </div>
    
    <!-- Analysis Meta -->
    <div class="text-center text-xs text-slate-400">
      Analysis ID: \${result.id} | Algorithm v\${result.algorithmVersion} | \${result.dataPoints} data points analyzed
    </div>
  \`;
}

// ============================================================================
// VOICE INPUT
// ============================================================================
let recognition = null;
let isRecording = false;

function toggleVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
    return;
  }
  
  if (isRecording) {
    stopVoiceInput();
  } else {
    startVoiceInput();
  }
}

function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = state.language === 'ar' ? 'ar-SA' : 
                     state.language === 'de' ? 'de-DE' : 
                     state.language === 'fr' ? 'fr-FR' : 'en-US';
  
  recognition.onstart = () => {
    isRecording = true;
    document.getElementById('voiceBtn').classList.add('recording');
  };
  
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    document.getElementById('symptomSearch').value = transcript;
    searchSymptoms(transcript);
  };
  
  recognition.onend = () => {
    isRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
  };
  
  recognition.start();
}

function stopVoiceInput() {
  if (recognition) {
    recognition.stop();
    isRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
  }
}

// ============================================================================
// MODALS & ACTIONS
// ============================================================================
function showEmergencyModal() {
  document.getElementById('emergencyModal').classList.remove('hidden');
}

function closeEmergencyModal() {
  document.getElementById('emergencyModal').classList.add('hidden');
}

function bookAppointment() {
  window.location.href = '/booking?source=medisense';
}

function bookSpecialist(type) {
  window.location.href = '/booking?specialist=' + encodeURIComponent(type);
}

function saveResults() {
  if (!state.analysisResult) return;
  
  const blob = new Blob([JSON.stringify(state.analysisResult, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`medisense-analysis-\${state.analysisResult.id}.json\`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetAnalysis() {
  state.selectedSymptoms = [];
  state.symptomDetails = {};
  state.profile.preExistingConditions = [];
  state.profile.currentMedications = [];
  state.analysisResult = null;
  
  updateSelectedSymptoms();
  updateConditionTags();
  updateMedicationTags();
  goToStep(1);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateSelectedSymptoms();
  updateConditionTags();
  updateMedicationTags();
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
        <a href="/medisense" class="nav-item active">
            <i class="fas fa-brain"></i>
            <span>MediSense</span>
        </a>
        <a href="/rewards" class="nav-item">
            <i class="fas fa-coins"></i>
            <span>Rewards</span>
        </a>
        <a href="/dashboard" class="nav-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </div>
</nav>
</body>
</html>
  `)
})

export default medisenseProRouter
