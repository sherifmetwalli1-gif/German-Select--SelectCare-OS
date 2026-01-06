/**
 * Intelligent Booking System
 * Best practices inspired by Zocdoc, Doctolib, and Cal.com
 * Features:
 * - Smart doctor suggestions based on symptoms
 * - Real-time availability
 * - Segmented onboarding flow
 * - Intelligent filters
 * - Quick booking options
 * - Confirmation with reminders
 */

import { Context } from 'hono'

export function bookingPage(c: Context): string {
  // Get URL parameters for pre-selection
  const doctorId = c.req.query('doctor') || ''
  const packageId = c.req.query('package') || ''
  const symptoms = c.req.query('symptoms') || ''
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Consultation - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #1e40af;
            --primary-light: #3b82f6;
            --accent: #d4af37;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }
        
        .german-gradient { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%); 
        }
        
        .gold-gradient {
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
        }
        
        /* Card Styles */
        .card {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        
        /* Doctor Card */
        .doctor-card {
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .doctor-card:hover {
            border-color: var(--primary-light);
            transform: translateY(-2px);
        }
        
        .doctor-card.selected {
            border-color: var(--primary);
            background: linear-gradient(to right, #eff6ff, white);
        }
        
        /* Time Slots */
        .slot-grid {
            display: grid;
            gap: 0.5rem;
        }
        
        .time-slot {
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        
        .time-slot:hover:not(.disabled) {
            background: #eff6ff;
            border-color: var(--primary-light);
        }
        
        .time-slot.selected {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        
        .time-slot.disabled {
            background: #f3f4f6;
            color: #9ca3af;
            cursor: not-allowed;
            text-decoration: line-through;
        }
        
        /* Date Picker */
        .date-card {
            min-width: 80px;
            text-align: center;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .date-card:hover:not(.disabled) {
            border-color: var(--primary-light);
        }
        
        .date-card.selected {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        
        .date-card.today {
            border-color: var(--accent);
        }
        
        /* Progress Steps */
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .step {
            display: flex;
            align-items: center;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .step-number.active {
            background: var(--primary);
            color: white;
        }
        
        .step-number.completed {
            background: var(--success);
            color: white;
        }
        
        .step-number.pending {
            background: #e5e7eb;
            color: #6b7280;
        }
        
        .step-line {
            width: 60px;
            height: 3px;
            margin: 0 0.5rem;
            transition: background 0.3s ease;
        }
        
        .step-line.completed {
            background: var(--success);
        }
        
        .step-line.pending {
            background: #e5e7eb;
        }
        
        /* Quick Action Cards */
        .quick-action {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quick-action:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
            border-color: var(--primary-light);
        }
        
        .quick-action .icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
        }
        
        /* Premium Badge */
        .premium-badge {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: #1a1a1a;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        /* Animations */
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in {
            animation: slideIn 0.4s ease-out forwards;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
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
        .nav-item.active { color: #3B82F6; }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        
        main { padding-bottom: 120px; }
        
        /* Loading State */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Rating Stars */
        .star-rating {
            color: #fbbf24;
        }
        
        /* Urgency Indicators */
        .urgency-urgent { border-left: 4px solid #ef4444; }
        .urgency-soon { border-left: 4px solid #f59e0b; }
        .urgency-routine { border-left: 4px solid #10b981; }
        
        /* Calendar Navigation */
        .calendar-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        
        .calendar-nav button {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }
        
        .calendar-nav button:hover {
            background: #f3f4f6;
        }
        
        /* Filters */
        .filter-chip {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 9999px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .filter-chip:hover {
            border-color: var(--primary-light);
        }
        
        .filter-chip.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        
        /* Symptom Input */
        .symptom-tag {
            display: inline-flex;
            align-items: center;
            padding: 0.375rem 0.75rem;
            background: #eff6ff;
            color: var(--primary);
            border-radius: 9999px;
            font-size: 0.875rem;
            margin: 0.25rem;
        }
        
        .symptom-tag button {
            margin-left: 0.5rem;
            color: #6b7280;
        }
        
        .symptom-tag button:hover {
            color: #ef4444;
        }
        
        /* Consultation Type Toggle */
        .consultation-type {
            display: flex;
            border: 2px solid #e5e7eb;
            border-radius: 0.75rem;
            overflow: hidden;
        }
        
        .consultation-type button {
            flex: 1;
            padding: 1rem;
            text-align: center;
            transition: all 0.2s;
            border: none;
            background: white;
        }
        
        .consultation-type button.active {
            background: var(--primary);
            color: white;
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
            .step-line { width: 30px; }
            .date-card { min-width: 65px; padding: 0.75rem; }
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="german-gradient text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-3">
                    <i class="fas fa-hospital text-2xl"></i>
                    <div>
                        <span class="text-xl font-bold">SelectCareOS™</span>
                        <span class="text-xs block text-blue-200">Book Your Consultation</span>
                    </div>
                </a>
                <nav class="hidden md:flex items-center space-x-6">
                    <a href="/doctors" class="hover:text-blue-200 transition-colors">
                        <i class="fas fa-user-md mr-1"></i> Doctors
                    </a>
                    <a href="/packages" class="hover:text-blue-200 transition-colors">
                        <i class="fas fa-box mr-1"></i> Packages
                    </a>
                    <a href="/dashboard" class="hover:text-blue-200 transition-colors">
                        <i class="fas fa-user mr-1"></i> My Account
                    </a>
                    <!-- Language Selector -->
                    <div class="relative">
                        <select id="language-selector" onchange="changeLanguage(this.value)" class="appearance-none bg-white/10 text-white px-3 py-1.5 pr-8 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition border border-white/20">
                            <option value="en" class="text-gray-800">🇬🇧 English</option>
                            <option value="de" class="text-gray-800">🇩🇪 Deutsch</option>
                            <option value="ar" class="text-gray-800">🇸🇦 العربية</option>
                            <option value="ru" class="text-gray-800">🇷🇺 Русский</option>
                            <option value="tr" class="text-gray-800">🇹🇷 Türkçe</option>
                        </select>
                        <i class="fas fa-globe absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none"></i>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-6">
        <!-- Progress Indicator -->
        <div class="step-indicator mb-8">
            <div class="step">
                <div class="step-number active" id="step1-circle">
                    <i class="fas fa-user-md"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Find Doctor</span>
            </div>
            <div class="step-line pending" id="line1"></div>
            <div class="step">
                <div class="step-number pending" id="step2-circle">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Select Time</span>
            </div>
            <div class="step-line pending" id="line2"></div>
            <div class="step">
                <div class="step-number pending" id="step3-circle">
                    <i class="fas fa-check"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Confirm</span>
            </div>
        </div>

        <!-- Step 1: Find Doctor -->
        <section id="section-find-doctor" class="animate-slide-in">
            <!-- Quick Booking Options -->
            <div class="mb-8" id="quick-booking-section">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Quick Booking</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="quick-action" onclick="quickBook('general')">
                        <div class="icon bg-blue-100 text-blue-600">
                            <i class="fas fa-stethoscope"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">General Consultation</h3>
                        <p class="text-sm text-gray-500 mt-1">Next available</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('urgent')">
                        <div class="icon bg-red-100 text-red-600">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">Urgent Care</h3>
                        <p class="text-sm text-gray-500 mt-1">Same day</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('specialist')">
                        <div class="icon bg-purple-100 text-purple-600">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">See Specialist</h3>
                        <p class="text-sm text-gray-500 mt-1">Expert care</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('followup')">
                        <div class="icon bg-green-100 text-green-600">
                            <i class="fas fa-redo"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">Follow-up</h3>
                        <p class="text-sm text-gray-500 mt-1">Existing patient</p>
                    </div>
                </div>
            </div>

            <!-- Symptom-Based Suggestions -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-search-plus text-blue-600 mr-2"></i>
                    What's your concern? <span class="text-sm font-normal text-gray-500">(Optional)</span>
                </h3>
                <div class="flex flex-wrap gap-2 mb-4" id="selected-symptoms">
                    <!-- Selected symptoms will appear here -->
                </div>
                <div class="flex gap-2">
                    <input type="text" id="symptom-input" 
                        placeholder="Type a symptom (e.g., back pain, weight loss)" 
                        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors">
                    <button onclick="addSymptom()" 
                        class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="mt-3">
                    <span class="text-sm text-gray-500">Suggested: </span>
                    <button onclick="addSuggestedSymptom('Back pain')" class="text-sm text-blue-600 hover:underline">Back pain</button>,
                    <button onclick="addSuggestedSymptom('Weight management')" class="text-sm text-blue-600 hover:underline">Weight management</button>,
                    <button onclick="addSuggestedSymptom('Heart health')" class="text-sm text-blue-600 hover:underline">Heart health</button>,
                    <button onclick="addSuggestedSymptom('Joint pain')" class="text-sm text-blue-600 hover:underline">Joint pain</button>
                </div>
                <button onclick="getSuggestions()" id="get-suggestions-btn"
                    class="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hidden">
                    <i class="fas fa-magic mr-2"></i>Find Best Doctor for My Symptoms
                </button>
            </div>

            <!-- AI Suggestions -->
            <div id="ai-suggestions" class="card p-6 mb-6 hidden">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">
                        <i class="fas fa-robot text-purple-600 mr-2"></i>
                        Recommended for You
                    </h3>
                    <span class="text-sm text-gray-500">Based on your symptoms</span>
                </div>
                <div id="suggestions-list" class="space-y-4">
                    <!-- Suggestions will be loaded here -->
                </div>
            </div>

            <!-- Filters -->
            <div class="card p-6 mb-6">
                <div class="flex flex-wrap gap-4 items-center">
                    <select id="specialization-filter" 
                        class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 min-w-[200px]">
                        <option value="">All Specializations</option>
                        <option value="Bariatric">Bariatric Surgery</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Plastic">Plastic Surgery</option>
                        <option value="Urology">Urology</option>
                        <option value="Nutritionist">Nutrition</option>
                    </select>
                    <select id="price-filter" 
                        class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500">
                        <option value="">Any Price</option>
                        <option value="150">Up to €150</option>
                        <option value="200">Up to €200</option>
                        <option value="300">Up to €300</option>
                    </select>
                    <div class="flex gap-2">
                        <button onclick="toggleFilter('premium')" id="filter-premium"
                            class="filter-chip">
                            <i class="fas fa-crown mr-2 text-yellow-500"></i>Premium Only
                        </button>
                        <button onclick="toggleFilter('available')" id="filter-available"
                            class="filter-chip active">
                            <i class="fas fa-clock mr-2 text-green-500"></i>Available Today
                        </button>
                    </div>
                </div>
            </div>

            <!-- Doctor List -->
            <div class="mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <span id="doctor-count">Loading...</span> Available Doctors
                </h2>
                <div id="doctor-list" class="space-y-4">
                    <!-- Loading skeleton -->
                    <div class="card p-6">
                        <div class="flex items-start space-x-4">
                            <div class="w-16 h-16 skeleton rounded-full"></div>
                            <div class="flex-1">
                                <div class="h-6 skeleton rounded w-1/3 mb-2"></div>
                                <div class="h-4 skeleton rounded w-1/4 mb-4"></div>
                                <div class="h-4 skeleton rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Step 2: Select Time -->
        <section id="section-select-time" class="hidden animate-slide-in">
            <button onclick="goToStep(1)" class="mb-6 text-blue-600 hover:text-blue-800 font-medium">
                <i class="fas fa-arrow-left mr-2"></i>Back to Doctor Selection
            </button>

            <!-- Selected Doctor Summary -->
            <div id="selected-doctor-summary" class="card p-6 mb-6 bg-gradient-to-r from-blue-50 to-white">
                <!-- Populated dynamically -->
            </div>

            <!-- Consultation Type -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Consultation Type</h3>
                <div class="consultation-type">
                    <button id="type-onsite" class="active" onclick="setConsultationType('onsite')">
                        <i class="fas fa-hospital text-2xl mb-2"></i>
                        <div class="font-semibold">In-Person Visit</div>
                        <div class="text-sm text-gray-500">At our clinic</div>
                    </button>
                    <button id="type-video" onclick="setConsultationType('video')">
                        <i class="fas fa-video text-2xl mb-2"></i>
                        <div class="font-semibold">Video Call</div>
                        <div class="text-sm text-gray-500">From anywhere</div>
                    </button>
                </div>
            </div>

            <!-- Date Selection -->
            <div class="card p-6 mb-6">
                <div class="calendar-nav">
                    <button onclick="prevWeek()" id="prev-week-btn" class="disabled:opacity-50">
                        <i class="fas fa-chevron-left mr-2"></i>Previous
                    </button>
                    <h3 class="text-lg font-semibold text-gray-800" id="week-display">
                        Loading...
                    </h3>
                    <button onclick="nextWeek()" id="next-week-btn">
                        Next<i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
                
                <div id="date-picker" class="flex gap-3 overflow-x-auto pb-4">
                    <!-- Dates will be rendered here -->
                </div>
            </div>

            <!-- Time Slots -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Available Times for <span id="selected-date-display">-</span>
                </h3>
                
                <div id="time-slots-container">
                    <div class="mb-6">
                        <h4 class="text-sm font-medium text-gray-600 mb-3">
                            <i class="fas fa-sun text-yellow-500 mr-2"></i>Morning
                        </h4>
                        <div id="morning-slots" class="slot-grid grid-cols-4 sm:grid-cols-6">
                            <!-- Morning slots -->
                        </div>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-600 mb-3">
                            <i class="fas fa-moon text-indigo-500 mr-2"></i>Afternoon
                        </h4>
                        <div id="afternoon-slots" class="slot-grid grid-cols-4 sm:grid-cols-6">
                            <!-- Afternoon slots -->
                        </div>
                    </div>
                </div>

                <div id="no-slots-message" class="text-center py-8 hidden">
                    <i class="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No available slots for this date.</p>
                    <button onclick="nextWeek()" class="mt-4 text-blue-600 hover:underline">
                        Check next week →
                    </button>
                </div>
            </div>

            <!-- Selected Slot Summary -->
            <div id="slot-summary" class="card p-6 mb-6 border-2 border-green-500 bg-green-50 hidden">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-check text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800" id="summary-datetime">-</p>
                            <p class="text-sm text-gray-500" id="summary-duration">30 minute consultation</p>
                        </div>
                    </div>
                    <button onclick="goToStep(3)" 
                        class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Continue <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Step 3: Confirm Booking -->
        <section id="section-confirm" class="hidden animate-slide-in">
            <button onclick="goToStep(2)" class="mb-6 text-blue-600 hover:text-blue-800 font-medium">
                <i class="fas fa-arrow-left mr-2"></i>Back to Time Selection
            </button>

            <div class="grid md:grid-cols-3 gap-6">
                <!-- Patient Information -->
                <div class="md:col-span-2 space-y-6">
                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-user text-blue-600 mr-2"></i>Your Information
                        </h3>
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" id="patient-name" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                                    placeholder="John Doe">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" id="patient-email" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                                    placeholder="john@example.com">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" id="patient-phone" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                                    placeholder="+49 123 456 7890">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <select id="patient-country" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors">
                                    <option value="DE">Germany</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US">United States</option>
                                    <option value="AE">UAE</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-notes-medical text-blue-600 mr-2"></i>Additional Information
                        </h3>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Visit / Notes
                            </label>
                            <textarea id="patient-notes" rows="4"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                                placeholder="Please describe your symptoms or reason for the consultation..."></textarea>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Referral Code (Optional)
                            </label>
                            <input type="text" id="affiliate-code"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                                placeholder="Enter referral code for discount">
                        </div>
                    </div>

                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-bell text-blue-600 mr-2"></i>Reminder Preferences
                        </h3>
                        <div class="space-y-3">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" id="reminder-email" checked
                                    class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                                <span class="ml-3 text-gray-700">Email reminder 24 hours before</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" id="reminder-sms"
                                    class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                                <span class="ml-3 text-gray-700">SMS reminder 1 hour before</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" id="reminder-calendar" checked
                                    class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                                <span class="ml-3 text-gray-700">Add to calendar</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Booking Summary -->
                <div class="md:col-span-1">
                    <div class="card p-6 sticky top-24">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                        
                        <div id="booking-summary-details" class="space-y-4 mb-6">
                            <!-- Populated dynamically -->
                        </div>

                        <div class="border-t pt-4 mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-600">Consultation Fee</span>
                                <span class="font-semibold" id="summary-price">€0</span>
                            </div>
                            <div class="flex justify-between items-center text-sm text-gray-500">
                                <span>Service Fee</span>
                                <span>€0</span>
                            </div>
                            <div class="flex justify-between items-center mt-4 pt-4 border-t text-lg font-bold">
                                <span>Total</span>
                                <span id="summary-total">€0</span>
                            </div>
                        </div>

                        <div class="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                            <i class="fas fa-coins mr-2"></i>
                            You'll earn <strong id="points-earned">0</strong> SelectPoints!
                        </div>

                        <button onclick="confirmBooking()" id="confirm-btn"
                            class="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all">
                            <i class="fas fa-lock mr-2"></i>Confirm Booking
                        </button>

                        <p class="text-center text-xs text-gray-500 mt-4">
                            <i class="fas fa-shield-alt mr-1"></i>
                            Your information is secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Confirmation Success -->
        <section id="section-success" class="hidden animate-slide-in">
            <div class="max-w-2xl mx-auto">
                <div class="card p-8 text-center">
                    <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-check text-green-600 text-4xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                    <p class="text-gray-600 mb-6">Your consultation has been successfully scheduled.</p>
                    
                    <div id="confirmation-details" class="bg-gray-50 rounded-xl p-6 text-left mb-6">
                        <!-- Populated dynamically -->
                    </div>

                    <div class="bg-blue-50 rounded-lg p-4 mb-6">
                        <h4 class="font-semibold text-blue-800 mb-2">What's Next?</h4>
                        <ul class="text-sm text-blue-700 text-left space-y-2" id="next-steps">
                            <!-- Populated dynamically -->
                        </ul>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/dashboard" 
                            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            <i class="fas fa-home mr-2"></i>Go to Dashboard
                        </a>
                        <button onclick="window.print()" 
                            class="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            <i class="fas fa-print mr-2"></i>Print Details
                        </button>
                        <button onclick="addToCalendar()" 
                            class="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            <i class="fas fa-calendar-plus mr-2"></i>Add to Calendar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Floating AI Assistant -->
    <a href="/ai-concierge" 
        class="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40">
        <i class="fas fa-robot text-white text-xl"></i>
    </a>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/doctors" class="nav-item">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/booking" class="nav-item active">
                <i class="fas fa-calendar-plus"></i>
                <span>Book</span>
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

    <script>
        // ===== STATE =====
        const state = {
            doctors: [],
            selectedDoctor: null,
            selectedDate: null,
            selectedTime: null,
            slots: [],
            symptoms: [],
            consultationType: 'onsite',
            weekOffset: 0,
            filters: {
                premium: false,
                available: true
            },
            booking: null
        };

        // Pre-populated from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const preSelectedDoctor = '${doctorId}';
        const preSelectedSymptoms = '${symptoms}'.split(',').filter(s => s);

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', async () => {
            // Load doctors
            await loadDoctors();
            
            // Add pre-selected symptoms
            preSelectedSymptoms.forEach(s => {
                if (s) addSuggestedSymptom(s);
            });
            
            // If doctor pre-selected, go directly to time selection
            if (preSelectedDoctor) {
                const doctor = state.doctors.find(d => d.id === preSelectedDoctor);
                if (doctor) {
                    selectDoctor(doctor);
                }
            }
            
            // Setup event listeners
            setupEventListeners();
        });

        function setupEventListeners() {
            document.getElementById('specialization-filter').addEventListener('change', filterDoctors);
            document.getElementById('price-filter').addEventListener('change', filterDoctors);
            
            document.getElementById('symptom-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addSymptom();
            });
        }

        // ===== DOCTORS =====
        async function loadDoctors() {
            try {
                const response = await fetch('/api/doctors');
                const data = await response.json();
                if (data.success) {
                    state.doctors = data.data.map(d => ({
                        id: d.id,
                        name: d.name,
                        title: d.title,
                        specialization: d.specialization,
                        subspecialties: d.subspecialties || [],
                        qualifications: d.qualifications || [],
                        languages: d.languages || [],
                        experienceYears: d.experience_years,
                        location: d.location,
                        consultationFee: d.consultation_fee,
                        rating: d.rating,
                        reviewCount: d.total_reviews,
                        isPremium: d.is_premium,
                        avatar: d.avatar,
                        available: d.available
                    }));
                    renderDoctors(state.doctors);
                }
            } catch (error) {
                console.error('Error loading doctors:', error);
            }
        }

        function renderDoctors(doctors) {
            const container = document.getElementById('doctor-list');
            document.getElementById('doctor-count').textContent = doctors.length;
            
            if (doctors.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-8">
                        <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">No doctors match your criteria.</p>
                        <button onclick="clearFilters()" class="mt-4 text-blue-600 hover:underline">Clear filters</button>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = doctors.map(doctor => \`
                <div class="card doctor-card p-6" data-id="\${doctor.id}" onclick="selectDoctor(state.doctors.find(d => d.id === '\${doctor.id}'))">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div class="flex items-start space-x-4">
                            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                \${doctor.avatar || doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center flex-wrap gap-2">
                                    <h3 class="font-bold text-gray-800">\${doctor.name}</h3>
                                    \${doctor.isPremium ? '<span class="premium-badge"><i class="fas fa-crown mr-1"></i>Premium</span>' : ''}
                                </div>
                                <p class="text-blue-600 font-medium">\${doctor.specialization}</p>
                                <p class="text-gray-500 text-sm mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>\${doctor.location}
                                </p>
                                <div class="flex items-center mt-2">
                                    <div class="star-rating">
                                        \${Array(5).fill(0).map((_, i) => 
                                            i < Math.floor(doctor.rating) 
                                                ? '<i class="fas fa-star"></i>' 
                                                : i < doctor.rating 
                                                    ? '<i class="fas fa-star-half-alt"></i>' 
                                                    : '<i class="far fa-star"></i>'
                                        ).join('')}
                                    </div>
                                    <span class="ml-2 text-sm font-medium">\${doctor.rating}</span>
                                    <span class="ml-1 text-sm text-gray-500">(\${doctor.reviewCount} reviews)</span>
                                </div>
                                \${doctor.subspecialties?.length > 0 ? \`
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        \${doctor.subspecialties.slice(0, 3).map(s => 
                                            \`<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">\${s}</span>\`
                                        ).join('')}
                                    </div>
                                \` : ''}
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-gray-800">€\${doctor.consultationFee}</p>
                            <p class="text-sm text-gray-500">per consultation</p>
                            <button class="mt-3 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        function selectDoctor(doctor) {
            state.selectedDoctor = doctor;
            
            // Update summary
            document.getElementById('selected-doctor-summary').innerHTML = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            \${doctor.avatar || doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">\${doctor.name}</h3>
                            <p class="text-blue-600">\${doctor.specialization}</p>
                            <p class="text-sm text-gray-500">\${doctor.location}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold text-gray-800">€\${doctor.consultationFee}</p>
                        <div class="flex items-center justify-end mt-1">
                            <div class="star-rating text-sm">
                                <i class="fas fa-star"></i>
                            </div>
                            <span class="ml-1 text-sm">\${doctor.rating}</span>
                        </div>
                    </div>
                </div>
            \`;
            
            goToStep(2);
            loadAvailability();
        }

        // ===== AVAILABILITY =====
        async function loadAvailability() {
            if (!state.selectedDoctor) return;
            
            try {
                const response = await fetch(\`/api/doctors/\${state.selectedDoctor.id}/availability?week=\${state.weekOffset}&type=\${state.consultationType}\`);
                const data = await response.json();
                
                if (data.success) {
                    state.slots = data.data.slots;
                    renderDatePicker();
                    
                    // Auto-select first available date
                    const dates = [...new Set(state.slots.map(s => s.date))];
                    if (dates.length > 0 && !state.selectedDate) {
                        selectDate(dates[0]);
                    } else if (state.selectedDate) {
                        renderTimeSlots();
                    }
                }
            } catch (error) {
                console.error('Error loading availability:', error);
            }
        }

        function renderDatePicker() {
            const container = document.getElementById('date-picker');
            const dates = getWeekDates();
            
            // Update week display
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[6]);
            document.getElementById('week-display').textContent = 
                \`\${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - \${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\`;
            
            container.innerHTML = dates.map(dateStr => {
                const date = new Date(dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                const hasSlots = state.slots.some(s => s.date === dateStr);
                const isSelected = state.selectedDate === dateStr;
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return \`
                    <div class="date-card \${isSelected ? 'selected' : ''} \${isToday ? 'today' : ''} \${!hasSlots || isPast || isWeekend ? 'disabled opacity-50' : ''}"
                        \${hasSlots && !isPast && !isWeekend ? \`onclick="selectDate('\${dateStr}')"\` : ''}>
                        <div class="text-xs \${isSelected ? 'text-blue-100' : 'text-gray-500'}">\${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div class="text-2xl font-bold \${isSelected ? '' : 'text-gray-800'}">\${date.getDate()}</div>
                        <div class="text-xs mt-1 \${isSelected ? 'text-blue-100' : hasSlots && !isPast ? 'text-green-600' : 'text-gray-400'}">
                            \${isPast ? 'Past' : isWeekend ? 'Closed' : hasSlots ? \`\${state.slots.filter(s => s.date === dateStr).length} slots\` : 'Full'}
                        </div>
                    </div>
                \`;
            }).join('');
            
            // Update prev button state
            document.getElementById('prev-week-btn').disabled = state.weekOffset === 0;
        }

        function getWeekDates() {
            const dates = [];
            const today = new Date();
            const start = new Date(today);
            start.setDate(today.getDate() + 1 + (state.weekOffset * 7));
            
            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(start.getDate() + i);
                dates.push(d.toISOString().split('T')[0]);
            }
            return dates;
        }

        function selectDate(dateStr) {
            state.selectedDate = dateStr;
            renderDatePicker();
            renderTimeSlots();
            
            const date = new Date(dateStr);
            document.getElementById('selected-date-display').textContent = 
                date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        }

        function renderTimeSlots() {
            const dateSlots = state.slots.filter(s => s.date === state.selectedDate);
            
            const morningSlots = dateSlots.filter(s => {
                const hour = parseInt(s.startTime.split(':')[0]);
                return hour < 12;
            });
            
            const afternoonSlots = dateSlots.filter(s => {
                const hour = parseInt(s.startTime.split(':')[0]);
                return hour >= 12;
            });
            
            const renderSlots = (slots, containerId) => {
                const container = document.getElementById(containerId);
                if (slots.length === 0) {
                    container.innerHTML = '<p class="text-gray-400 text-sm col-span-full">No slots available</p>';
                    return;
                }
                container.innerHTML = slots.map(slot => \`
                    <div class="time-slot \${state.selectedTime === slot.startTime ? 'selected' : ''}"
                        onclick="selectTime('\${slot.startTime}', '\${slot.id}')">
                        \${slot.startTime}
                    </div>
                \`).join('');
            };
            
            renderSlots(morningSlots, 'morning-slots');
            renderSlots(afternoonSlots, 'afternoon-slots');
            
            // Show/hide no slots message
            document.getElementById('no-slots-message').classList.toggle('hidden', dateSlots.length > 0);
            document.getElementById('time-slots-container').classList.toggle('hidden', dateSlots.length === 0);
        }

        function selectTime(time, slotId) {
            state.selectedTime = time;
            state.selectedSlotId = slotId;
            renderTimeSlots();
            
            // Show summary
            const date = new Date(state.selectedDate);
            document.getElementById('summary-datetime').textContent = 
                \`\${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at \${time}\`;
            document.getElementById('slot-summary').classList.remove('hidden');
        }

        function prevWeek() {
            if (state.weekOffset > 0) {
                state.weekOffset--;
                state.selectedDate = null;
                loadAvailability();
            }
        }

        function nextWeek() {
            if (state.weekOffset < 4) {
                state.weekOffset++;
                state.selectedDate = null;
                loadAvailability();
            }
        }

        // ===== FILTERS =====
        function filterDoctors() {
            const spec = document.getElementById('specialization-filter').value.toLowerCase();
            const maxPrice = parseInt(document.getElementById('price-filter').value) || 10000;
            
            let filtered = state.doctors.filter(d => {
                const matchSpec = !spec || d.specialization.toLowerCase().includes(spec);
                const matchPrice = d.consultationFee <= maxPrice;
                const matchPremium = !state.filters.premium || d.isPremium;
                return matchSpec && matchPrice && matchPremium;
            });
            
            renderDoctors(filtered);
        }

        function toggleFilter(filter) {
            state.filters[filter] = !state.filters[filter];
            document.getElementById(\`filter-\${filter}\`).classList.toggle('active', state.filters[filter]);
            filterDoctors();
        }

        function clearFilters() {
            document.getElementById('specialization-filter').value = '';
            document.getElementById('price-filter').value = '';
            state.filters = { premium: false, available: true };
            document.getElementById('filter-premium').classList.remove('active');
            document.getElementById('filter-available').classList.add('active');
            renderDoctors(state.doctors);
        }

        // ===== SYMPTOMS =====
        function addSymptom() {
            const input = document.getElementById('symptom-input');
            const symptom = input.value.trim();
            if (symptom && !state.symptoms.includes(symptom)) {
                state.symptoms.push(symptom);
                renderSymptoms();
                input.value = '';
            }
        }

        function addSuggestedSymptom(symptom) {
            if (!state.symptoms.includes(symptom)) {
                state.symptoms.push(symptom);
                renderSymptoms();
            }
        }

        function removeSymptom(symptom) {
            state.symptoms = state.symptoms.filter(s => s !== symptom);
            renderSymptoms();
        }

        function renderSymptoms() {
            const container = document.getElementById('selected-symptoms');
            container.innerHTML = state.symptoms.map(s => \`
                <span class="symptom-tag">
                    \${s}
                    <button onclick="removeSymptom('\${s}')">&times;</button>
                </span>
            \`).join('');
            
            // Show/hide suggestions button
            document.getElementById('get-suggestions-btn').classList.toggle('hidden', state.symptoms.length === 0);
        }

        async function getSuggestions() {
            if (state.symptoms.length === 0) return;
            
            try {
                const response = await fetch('/api/booking/suggest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        symptoms: state.symptoms,
                        urgency: 'routine'
                    })
                });
                
                const data = await response.json();
                if (data.success) {
                    renderSuggestions(data.data);
                }
            } catch (error) {
                console.error('Error getting suggestions:', error);
            }
        }

        function renderSuggestions(data) {
            const container = document.getElementById('suggestions-list');
            container.innerHTML = data.suggestions.map(s => \`
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                    onclick="selectDoctor(state.doctors.find(d => d.id === '\${s.doctor.id}'))">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            \${s.doctor.avatar || s.doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="font-semibold text-gray-800">\${s.doctor.name}</h4>
                                <span class="text-xs px-2 py-0.5 rounded-full \${s.matchScore === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                                    \${s.matchScore === 'high' ? 'Best Match' : 'Good Match'}
                                </span>
                            </div>
                            <p class="text-sm text-blue-600">\${s.doctor.specialization}</p>
                            \${s.nextAvailable ? \`
                                <p class="text-sm text-green-600 mt-1">
                                    <i class="fas fa-clock mr-1"></i>
                                    Next: \${new Date(s.nextAvailable.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at \${s.nextAvailable.startTime}
                                </p>
                            \` : '<p class="text-sm text-gray-500 mt-1">Check availability</p>'}
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-gray-800">€\${s.doctor.consultationFee}</p>
                        <p class="text-sm text-gray-500">\${s.totalSlots} slots</p>
                    </div>
                </div>
            \`).join('');
            
            document.getElementById('ai-suggestions').classList.remove('hidden');
            
            // Scroll to suggestions
            document.getElementById('ai-suggestions').scrollIntoView({ behavior: 'smooth' });
        }

        // ===== CONSULTATION TYPE =====
        function setConsultationType(type) {
            state.consultationType = type;
            document.getElementById('type-onsite').classList.toggle('active', type === 'onsite');
            document.getElementById('type-video').classList.toggle('active', type === 'video');
            loadAvailability();
        }

        // ===== QUICK BOOKING =====
        function quickBook(type) {
            switch(type) {
                case 'general':
                    // Show all doctors
                    clearFilters();
                    break;
                case 'urgent':
                    // Filter to those with immediate availability
                    state.filters.available = true;
                    filterDoctors();
                    break;
                case 'specialist':
                    // Scroll to filters
                    document.getElementById('specialization-filter').focus();
                    break;
                case 'followup':
                    // Could show patient history - for now just scroll to doctors
                    break;
            }
            
            document.getElementById('doctor-list').scrollIntoView({ behavior: 'smooth' });
        }

        // ===== NAVIGATION =====
        function goToStep(step) {
            // Update step indicators
            for (let i = 1; i <= 3; i++) {
                const circle = document.getElementById(\`step\${i}-circle\`);
                const line = document.getElementById(\`line\${i-1}\`);
                
                if (i < step) {
                    circle?.classList.remove('active', 'pending');
                    circle?.classList.add('completed');
                    line?.classList.remove('pending');
                    line?.classList.add('completed');
                } else if (i === step) {
                    circle?.classList.remove('completed', 'pending');
                    circle?.classList.add('active');
                } else {
                    circle?.classList.remove('active', 'completed');
                    circle?.classList.add('pending');
                    line?.classList.remove('completed');
                    line?.classList.add('pending');
                }
            }
            
            // Show/hide sections
            document.getElementById('section-find-doctor').classList.toggle('hidden', step !== 1);
            document.getElementById('section-select-time').classList.toggle('hidden', step !== 2);
            document.getElementById('section-confirm').classList.toggle('hidden', step !== 3);
            document.getElementById('section-success').classList.add('hidden');
            
            // Update summary for step 3
            if (step === 3) {
                updateBookingSummary();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function updateBookingSummary() {
            if (!state.selectedDoctor || !state.selectedDate || !state.selectedTime) return;
            
            const date = new Date(state.selectedDate);
            const price = state.selectedDoctor.consultationFee;
            
            document.getElementById('booking-summary-details').innerHTML = \`
                <div class="flex items-center space-x-3 pb-4 border-b">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        \${state.selectedDoctor.avatar}
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800">\${state.selectedDoctor.name}</p>
                        <p class="text-sm text-blue-600">\${state.selectedDoctor.specialization}</p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-calendar mr-2"></i>Date</span>
                        <span class="font-medium">\${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-clock mr-2"></i>Time</span>
                        <span class="font-medium">\${state.selectedTime}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-hourglass-half mr-2"></i>Duration</span>
                        <span class="font-medium">30 min</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-hospital mr-2"></i>Type</span>
                        <span class="font-medium">\${state.consultationType === 'onsite' ? 'In-Person' : 'Video Call'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-map-marker-alt mr-2"></i>Location</span>
                        <span class="font-medium">\${state.selectedDoctor.location}</span>
                    </div>
                </div>
            \`;
            
            document.getElementById('summary-price').textContent = \`€\${price}\`;
            document.getElementById('summary-total').textContent = \`€\${price}\`;
            document.getElementById('points-earned').textContent = Math.floor(price * 2);
        }

        // ===== BOOKING CONFIRMATION =====
        async function confirmBooking() {
            const name = document.getElementById('patient-name').value.trim();
            const email = document.getElementById('patient-email').value.trim();
            
            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const btn = document.getElementById('confirm-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            
            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        doctorId: state.selectedDoctor.id,
                        slotId: state.selectedSlotId,
                        date: state.selectedDate,
                        time: state.selectedTime,
                        patientName: name,
                        patientEmail: email,
                        patientPhone: document.getElementById('patient-phone').value,
                        notes: document.getElementById('patient-notes').value,
                        consultationType: state.consultationType,
                        affiliateCode: document.getElementById('affiliate-code').value,
                        symptoms: state.symptoms,
                        urgency: 'routine'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    state.booking = data.data.booking;
                    showConfirmation(data.data);
                } else {
                    alert('Booking failed: ' + data.error);
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-lock mr-2"></i>Confirm Booking';
                }
            } catch (error) {
                console.error('Booking error:', error);
                alert('An error occurred. Please try again.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-lock mr-2"></i>Confirm Booking';
            }
        }

        function showConfirmation(data) {
            const booking = data.booking;
            const date = new Date(booking.date);
            
            document.getElementById('confirmation-details').innerHTML = \`
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Booking ID</p>
                        <p class="font-mono font-semibold text-gray-800">\${booking.id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status</p>
                        <p class="font-semibold text-green-600"><i class="fas fa-check-circle mr-1"></i>Confirmed</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Doctor</p>
                        <p class="font-semibold text-gray-800">\${booking.doctorName}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Specialization</p>
                        <p class="text-gray-800">\${booking.doctorSpecialization}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Date & Time</p>
                        <p class="font-semibold text-gray-800">\${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at \${booking.time}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p class="text-gray-800">\${booking.location}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Amount Paid</p>
                        <p class="text-xl font-bold text-gray-800">€\${booking.price}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Points Earned</p>
                        <p class="text-green-600 font-semibold">+\${data.pointsEarned} SelectPoints</p>
                    </div>
                </div>
            \`;
            
            document.getElementById('next-steps').innerHTML = data.nextSteps.map(step => 
                \`<li><i class="fas fa-check text-green-500 mr-2"></i>\${step}</li>\`
            ).join('');
            
            // Hide all sections and show success
            document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
            document.getElementById('section-success').classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function addToCalendar() {
            if (!state.booking) return;
            
            const booking = state.booking;
            const date = new Date(booking.date + 'T' + booking.time);
            const endDate = new Date(date.getTime() + 30 * 60000);
            
            // Create ICS file
            const icsContent = \`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:\${formatICSDate(date)}
DTEND:\${formatICSDate(endDate)}
SUMMARY:Consultation with \${booking.doctorName}
DESCRIPTION:Booking ID: \${booking.id}\\nType: \${booking.consultationType}\\nSpecialization: \${booking.doctorSpecialization}
LOCATION:\${booking.location}
END:VEVENT
END:VCALENDAR\`;
            
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'appointment.ics';
            a.click();
            URL.revokeObjectURL(url);
        }

        function formatICSDate(date) {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }

        function validateEmail(email) {
            return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
        }

        // ============================================================================
        // INTERNATIONALIZATION (i18n)
        // ============================================================================
        
        const LANG_STORAGE_KEY = 'selectcare_language';
        let currentLanguage = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
        let translations = {};
        
        // Load translations
        async function loadTranslations(lang) {
            try {
                const response = await fetch(\`/api/i18n/translations/\${lang}\`);
                const data = await response.json();
                if (data.success) {
                    translations = data.data.translations;
                    if (data.data.fallback) {
                        translations = { ...data.data.fallback, ...translations };
                    }
                    return true;
                }
            } catch (error) {
                console.error('Failed to load translations:', error);
            }
            return false;
        }
        
        // Change language
        async function changeLanguage(lang) {
            const success = await loadTranslations(lang);
            if (success) {
                currentLanguage = lang;
                localStorage.setItem(LANG_STORAGE_KEY, lang);
                
                // Update text direction for RTL languages
                document.documentElement.dir = ['ar', 'he', 'fa'].includes(lang) ? 'rtl' : 'ltr';
                
                // Apply translations to page
                applyTranslations();
                
                // Show notification
                showNotification(\`Language changed to \${getLanguageName(lang)}\`, 'success');
            }
        }
        
        function getLanguageName(code) {
            const names = {
                'en': 'English',
                'de': 'Deutsch',
                'ar': 'العربية',
                'ru': 'Русский',
                'tr': 'Türkçe',
                'fr': 'Français',
                'es': 'Español',
                'zh': '中文'
            };
            return names[code] || code;
        }
        
        // Translate function
        function t(key) {
            return translations[key] || key;
        }
        
        // Apply translations to page elements
        function applyTranslations() {
            // Update elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = t(key);
            });
            
            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                el.placeholder = t(key);
            });
        }
        
        // Show notification
        function showNotification(message, type = 'info') {
            const colors = {
                'success': 'bg-green-500',
                'error': 'bg-red-500',
                'info': 'bg-blue-500'
            };
            
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 \${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in\`;
            notification.innerHTML = \`<i class="fas fa-\${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle mr-2"></i>\${message}\`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        // Initialize language on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Set language selector to current language
            const selector = document.getElementById('language-selector');
            if (selector) {
                selector.value = currentLanguage;
            }
            
            // Load translations if not English (English is default)
            if (currentLanguage !== 'en') {
                loadTranslations(currentLanguage).then(() => applyTranslations());
            }
        });
    </script>
</body>
</html>`
}
