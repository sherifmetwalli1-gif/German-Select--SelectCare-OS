/**
 * 🏋️ Wellness Pages - Exercise & Nutrition Browsing UI
 * SelectCareOS™ Wellness Programs Hub
 * 
 * Modern, responsive pages for browsing exercise programs and nutrition plans
 * with filtering, search, and detailed views
 */

import { 
  EXERCISE_PROGRAMS_DATABASE, 
  NUTRITION_PLANS_DATABASE,
  getWellnessStats
} from './medisense-wellness';

// Common header HTML for SelectCareOS branding
const getHeaderHTML = (activePage: 'exercises' | 'nutrition' | 'wellness') => `
  <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-gold flex items-center justify-center">
            <i class="fas fa-heartbeat text-white"></i>
          </div>
          <div>
            <div class="font-bold text-navy">SelectCareOS™</div>
            <div class="text-xs text-gray-500">Wellness Hub</div>
          </div>
        </a>
        <nav class="hidden md:flex items-center space-x-6">
          <a href="/wellness/exercises" class="text-sm font-medium ${activePage === 'exercises' ? 'text-gold' : 'text-gray-600 hover:text-navy'}">
            <i class="fas fa-dumbbell mr-1"></i>Exercise Programs
          </a>
          <a href="/wellness/nutrition" class="text-sm font-medium ${activePage === 'nutrition' ? 'text-gold' : 'text-gray-600 hover:text-navy'}">
            <i class="fas fa-utensils mr-1"></i>Meal Plans
          </a>
          <a href="/medisense" class="text-sm font-medium text-gray-600 hover:text-navy">
            <i class="fas fa-brain mr-1"></i>AI Analysis
          </a>
        </nav>
        <a href="/medisense" class="btn-primary-sm">
          <i class="fas fa-stethoscope mr-2"></i>Get Personalized Plan
        </a>
      </div>
    </div>
  </header>
`;

// Common footer HTML
const getFooterHTML = () => `
  <footer class="bg-navy text-white py-8 mt-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center">
        <div class="text-xl font-bold mb-2">SelectCareOS™ <span class="text-gold">Wellness</span></div>
        <p class="text-sm text-gold-soft mb-4">Evidence-Based Wellness Programs</p>
        <div class="flex justify-center flex-wrap gap-4 text-xs text-gold-soft mb-4">
          <span><i class="fas fa-user-md mr-1 text-gold"></i>MD Reviewed</span>
          <span><i class="fas fa-certificate mr-1 text-gold"></i>Evidence-Based</span>
          <span><i class="fas fa-shield-alt mr-1 text-gold"></i>Safe & Effective</span>
        </div>
        <p class="text-gray-400 text-xs">© 2024 German Select. Consult your doctor before starting any exercise or diet program.</p>
      </div>
    </div>
  </footer>
`;

// Common bottom navigation - Healthcare-First (Option A)
const getBottomNavHTML = (activePage: 'exercises' | 'nutrition' | 'wellness') => `
  <!-- Emergency Call Button -->
  <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
    <i class="fas fa-phone-alt"></i>
  </a>
  
  <!-- Bottom Navigation - Healthcare-First (Option A) -->
  <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
    <div class="bottom-nav-container">
      <a href="/" class="nav-item" aria-label="Home">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="/medisense" class="nav-item" aria-label="MediSense AI">
        <i class="fas fa-brain"></i>
        <span>MediSense</span>
      </a>
      <a href="/instant-connect" class="nav-item connect-btn" aria-label="Instant Connect">
        <span class="live-dot"></span>
        <i class="fas fa-video"></i>
        <span>Connect</span>
      </a>
      <a href="/care-team" class="nav-item" aria-label="Doctors">
        <i class="fas fa-user-md"></i>
        <span>Doctors</span>
      </a>
      <a href="/dashboard" class="nav-item" aria-label="My Profile">
        <i class="fas fa-user"></i>
        <span>Profile</span>
      </a>
    </div>
  </nav>
`;

// Common CSS styles
const getStylesCSS = () => `
  <style>
    :root {
      --navy: #003366;
      --navy-light: #004080;
      --gold: #C9A227;
      --gold-soft: #D4AF37;
      --cream: #FFF8F0;
      --cream-dark: #F5E6D3;
    }
    
    * { box-sizing: border-box; }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%);
      min-height: 100vh;
      padding-bottom: 80px;
    }
    
    .text-navy { color: var(--navy); }
    .text-gold { color: var(--gold); }
    .text-gold-soft { color: var(--gold-soft); }
    .bg-navy { background-color: var(--navy); }
    .bg-cream { background-color: var(--cream); }
    
    .btn-primary-sm {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      color: white;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }
    
    .btn-primary-sm:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
    }
    
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(201, 162, 39, 0.1);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      border-color: rgba(201, 162, 39, 0.3);
    }
    
    .card-clickable {
      cursor: pointer;
    }
    
    .program-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .category-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .difficulty-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .difficulty-beginner { background: #D1FAE5; color: #065F46; }
    .difficulty-intermediate { background: #FEF3C7; color: #92400E; }
    .difficulty-advanced { background: #FEE2E2; color: #991B1B; }
    .difficulty-clinical { background: #E0E7FF; color: #3730A3; }
    
    .category-cardiovascular { background: #FEE2E2; color: #DC2626; }
    .category-strength { background: #DBEAFE; color: #2563EB; }
    .category-rehabilitation { background: #D1FAE5; color: #059669; }
    .category-mind-body { background: #F3E8FF; color: #7C3AED; }
    .category-flexibility { background: #FEF9C3; color: #CA8A04; }
    .category-therapeutic { background: #CFFAFE; color: #0891B2; }
    .category-weight-management { background: #FFEDD5; color: #EA580C; }
    .category-general-wellness { background: #DCFCE7; color: #16A34A; }
    .category-disease-specific { background: #FCE7F3; color: #DB2777; }
    
    .search-input {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 2.75rem;
      border: 2px solid #E5E7EB;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
    }
    
    .filter-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #E5E7EB;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      background: white;
      color: #6B7280;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .filter-btn:hover {
      border-color: var(--navy);
      color: var(--navy);
    }
    
    .filter-btn.active {
      background: var(--navy);
      border-color: var(--navy);
      color: white;
    }
    
    .hero-section {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      color: white;
      padding: 3rem 1rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .stat-item {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      backdrop-filter: blur(10px);
    }
    
    .stat-number {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--gold);
    }
    
    .stat-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .program-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    
    .meal-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      background: #F3F4F6;
      border-radius: 6px;
      font-size: 0.75rem;
      margin: 0.125rem;
    }
    
    .exercise-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
      border-radius: 6px;
      font-size: 0.75rem;
      color: #1E40AF;
      margin: 0.125rem;
    }
    
    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem;
      background: #F0FDF4;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }
    
    .benefit-item i {
      color: #16A34A;
      margin-top: 0.125rem;
    }
    
    /* ════════════════════════════════════════════════════════════════
       UNIFIED BOTTOM NAVIGATION - Healthcare-First (Option A)
       ════════════════════════════════════════════════════════════════ */
    
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #E5E7EB;
      padding: 8px 0 max(12px, env(safe-area-inset-bottom));
      z-index: 1000;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .bottom-nav-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 500px;
      margin: 0 auto;
      padding: 0 8px;
    }
    
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 12px;
      color: #9CA3AF;
      font-size: 10px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      border-radius: 8px;
      min-width: 56px;
      position: relative;
    }
    
    .nav-item i {
      font-size: 20px;
      margin-bottom: 4px;
      transition: transform 0.2s ease;
    }
    
    .nav-item span { white-space: nowrap; }
    
    .nav-item:hover {
      color: #6B7280;
      background: rgba(0, 0, 0, 0.02);
    }
    
    .nav-item:hover i { transform: scale(1.1); }
    
    .nav-item.active { color: #C9A227; }
    .nav-item.active i { transform: scale(1.1); }
    
    /* Connect button with live indicator */
    .nav-item.connect-btn { position: relative; }
    
    .nav-item.connect-btn .live-dot {
      position: absolute;
      top: 4px;
      right: 12px;
      width: 8px;
      height: 8px;
      background: #22C55E;
      border-radius: 50%;
      border: 2px solid white;
      animation: pulse-dot 2s infinite;
    }
    
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }
    
    /* Floating Emergency Button */
    .floating-emergency {
      position: fixed;
      bottom: 90px;
      right: 16px;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #DC2626, #B91C1C);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 22px;
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
      z-index: 999;
      transition: all 0.2s ease;
      text-decoration: none;
      border: 3px solid white;
    }
    
    .floating-emergency:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(220, 38, 38, 0.5);
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
      100% { transform: scale(1.5); opacity: 0; }
    }
    
    @media (max-width: 360px) {
      .nav-item { padding: 6px 8px; min-width: 48px; }
      .nav-item i { font-size: 18px; }
      .nav-item span { font-size: 9px; }
    }
    
    @media (min-width: 768px) {
      .bottom-nav { display: none; }
      .floating-emergency { bottom: 24px; right: 24px; width: 64px; height: 64px; font-size: 26px; }
    }
    
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2000;
      backdrop-filter: blur(4px);
    }
    
    .modal-overlay.active {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    
    .modal-content {
      background: white;
      border-radius: 20px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #F3F4F6;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .modal-close:hover {
      background: #E5E7EB;
    }
    
    .no-results {
      text-align: center;
      padding: 3rem 1rem;
      color: #6B7280;
    }
    
    .no-results i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #D1D5DB;
    }
    
    @media (max-width: 768px) {
      .program-grid {
        grid-template-columns: 1fr;
      }
      
      .hero-section {
        padding: 2rem 1rem;
      }
      
      .stat-number {
        font-size: 1.5rem;
      }
    }
  </style>
`;

// ============================================================================
// EXERCISE PROGRAMS PAGE
// ============================================================================

export function exerciseProgramsPage(lang: string = 'en'): string {
  const stats = getWellnessStats();
  const programs = Object.values(EXERCISE_PROGRAMS_DATABASE);
  
  // Get unique categories
  const categories = [...new Set(programs.map(p => p.category))];
  
  // Generate program cards HTML
  const programCardsHTML = programs.map(program => `
    <div class="card card-clickable program-card p-5" onclick="openProgramModal('${program.id}')" data-category="${program.category}" data-difficulty="${program.difficulty}" data-name="${program.name.toLowerCase()}">
      <div class="flex items-start justify-between mb-3">
        <span class="category-badge category-${program.category}">
          <i class="fas ${getCategoryIcon(program.category)} mr-1"></i>
          ${formatCategory(program.category)}
        </span>
        <span class="difficulty-badge difficulty-${program.difficulty}">
          ${program.difficulty}
        </span>
      </div>
      
      <h3 class="font-bold text-navy text-lg mb-2">${program.name}</h3>
      
      <div class="flex items-center text-sm text-gray-600 mb-3 space-x-4">
        <span><i class="fas fa-clock mr-1 text-gold"></i>${program.duration}</span>
        <span><i class="fas fa-calendar-alt mr-1 text-gold"></i>${program.frequency}</span>
      </div>
      
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">Target Conditions:</div>
        <div class="flex flex-wrap">
          ${program.targetConditions.slice(0, 3).map(c => `
            <span class="exercise-tag">${formatCondition(c)}</span>
          `).join('')}
          ${program.targetConditions.length > 3 ? `<span class="exercise-tag">+${program.targetConditions.length - 3} more</span>` : ''}
        </div>
      </div>
      
      <div class="mt-auto pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">
            <i class="fas fa-fire text-orange-500 mr-1"></i>${program.caloriesBurned}
          </span>
          <span class="text-navy font-medium">
            ${program.exercises.length} exercises <i class="fas fa-chevron-right ml-1 text-gold"></i>
          </span>
        </div>
      </div>
    </div>
  `).join('');

  // Generate program data for JavaScript
  const programsData = JSON.stringify(
    Object.fromEntries(
      programs.map(p => [p.id, p])
    )
  );

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exercise Programs | SelectCareOS™ Wellness</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${getStylesCSS()}
</head>
<body>
  ${getHeaderHTML('exercises')}
  
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-4">
        <i class="fas fa-dumbbell text-gold mr-2"></i>
        <span class="text-sm">Evidence-Based Exercise Programs</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Exercise Programs</h1>
      <p class="text-lg text-white/80 mb-6">Find the perfect workout routine for your health goals and conditions</p>
      
      <div class="stats-grid max-w-2xl mx-auto">
        <div class="stat-item">
          <div class="stat-number">${stats.exercisePrograms}</div>
          <div class="stat-label">Programs</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.totalExercises}</div>
          <div class="stat-label">Exercises</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.conditionsWithExercise}</div>
          <div class="stat-label">Conditions</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">MD Reviewed</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Search & Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" id="searchInput" placeholder="Search programs by name or condition..." class="search-input">
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="filter-btn active" data-filter="all">All</button>
          ${categories.map(cat => `
            <button class="filter-btn" data-filter="${cat}">
              <i class="fas ${getCategoryIcon(cat)} mr-1"></i>${formatCategory(cat)}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Programs Grid -->
    <div class="program-grid" id="programsGrid">
      ${programCardsHTML}
    </div>
    
    <!-- No Results -->
    <div class="no-results hidden" id="noResults">
      <i class="fas fa-search"></i>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">No programs found</h3>
      <p>Try adjusting your search or filters</p>
    </div>
    
    <!-- CTA -->
    <div class="card p-6 mt-8 bg-gradient-to-r from-navy to-navy-light text-white text-center">
      <h3 class="text-xl font-bold mb-2">Get a Personalized Exercise Plan</h3>
      <p class="text-white/80 mb-4">Use our AI symptom analyzer to get exercise recommendations tailored to your health conditions</p>
      <a href="/medisense" class="inline-flex items-center px-6 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-gold-soft transition-colors">
        <i class="fas fa-brain mr-2"></i>Start AI Analysis
      </a>
    </div>
  </main>
  
  <!-- Program Detail Modal -->
  <div class="modal-overlay" id="programModal">
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">
        <i class="fas fa-times"></i>
      </button>
      <div id="modalContent">
        <!-- Dynamic content -->
      </div>
    </div>
  </div>
  
  ${getFooterHTML()}
  ${getBottomNavHTML('exercises')}
  
  <script>
    const programs = ${programsData};
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', filterPrograms);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterPrograms();
      });
    });
    
    function filterPrograms() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
      const cards = document.querySelectorAll('.program-card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const name = card.dataset.name;
        const category = card.dataset.category;
        const matchesSearch = name.includes(search);
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      document.getElementById('noResults').classList.toggle('hidden', visibleCount > 0);
    }
    
    function openProgramModal(programId) {
      const program = programs[programId];
      if (!program) return;
      
      const modal = document.getElementById('programModal');
      const content = document.getElementById('modalContent');
      
      content.innerHTML = \`
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="category-badge category-\${program.category}">
              \${program.category}
            </span>
            <span class="difficulty-badge difficulty-\${program.difficulty}">
              \${program.difficulty}
            </span>
          </div>
          
          <h2 class="text-2xl font-bold text-navy mb-2">\${program.name}</h2>
          
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span><i class="fas fa-clock mr-1 text-gold"></i>\${program.duration}</span>
            <span><i class="fas fa-calendar-alt mr-1 text-gold"></i>\${program.frequency}</span>
            <span><i class="fas fa-fire mr-1 text-orange-500"></i>\${program.caloriesBurned}</span>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-bullseye text-gold mr-2"></i>Target Conditions</h3>
            <div class="flex flex-wrap">
              \${program.targetConditions.map(c => '<span class="exercise-tag">' + c.replace(/-/g, ' ') + '</span>').join('')}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-check-circle text-green-500 mr-2"></i>Benefits</h3>
            <div class="space-y-1">
              \${program.benefits.map(b => '<div class="benefit-item"><i class="fas fa-check text-sm"></i><span class="text-sm">' + b + '</span></div>').join('')}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-dumbbell text-gold mr-2"></i>Exercises (\${program.exercises.length})</h3>
            <div class="space-y-3">
              \${program.exercises.map((ex, i) => \`
                <div class="p-3 bg-cream rounded-lg">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-navy">\${i + 1}. \${ex.name}</span>
                    <span class="text-xs px-2 py-0.5 rounded bg-white">\${ex.difficulty}</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">\${ex.description}</p>
                  <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                    \${ex.sets ? '<span><i class="fas fa-redo mr-1"></i>' + ex.sets + ' sets × ' + ex.reps + '</span>' : ''}
                    \${ex.duration ? '<span><i class="fas fa-clock mr-1"></i>' + ex.duration + '</span>' : ''}
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
          
          \${program.contraindications.length > 0 ? \`
            <div class="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 class="font-semibold text-red-700 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>Contraindications</h3>
              <ul class="text-sm text-red-600 list-disc list-inside">
                \${program.contraindications.map(c => '<li>' + c.replace(/-/g, ' ') + '</li>').join('')}
              </ul>
            </div>
          \` : ''}
          
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-semibold text-blue-700 mb-2"><i class="fas fa-shield-alt mr-2"></i>Safety Notes</h3>
            <ul class="text-sm text-blue-600 list-disc list-inside">
              \${program.safetyNotes.map(n => '<li>' + n + '</li>').join('')}
            </ul>
          </div>
        </div>
      \`;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
      document.getElementById('programModal').classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close modal on outside click
    document.getElementById('programModal').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  </script>
</body>
</html>
  `;
}

// ============================================================================
// NUTRITION PLANS PAGE
// ============================================================================

export function nutritionPlansPage(lang: string = 'en'): string {
  const stats = getWellnessStats();
  const plans = Object.values(NUTRITION_PLANS_DATABASE);
  
  // Get unique categories
  const categories = [...new Set(plans.map(p => p.category))];
  
  // Generate plan cards HTML
  const planCardsHTML = plans.map(plan => `
    <div class="card card-clickable program-card p-5" onclick="openPlanModal('${plan.id}')" data-category="${plan.category}" data-name="${plan.name.toLowerCase()}">
      <div class="flex items-start justify-between mb-3">
        <span class="category-badge category-${plan.category}">
          <i class="fas ${getNutritionCategoryIcon(plan.category)} mr-1"></i>
          ${formatCategory(plan.category)}
        </span>
        <span class="text-sm font-medium text-gray-600">
          ${plan.calorieRange}
        </span>
      </div>
      
      <h3 class="font-bold text-navy text-lg mb-2">${plan.name}</h3>
      
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">Macros:</div>
        <div class="flex gap-2 text-xs">
          <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">Carbs ${plan.macroRatio.carbohydrates}</span>
          <span class="px-2 py-1 bg-red-100 text-red-700 rounded">Protein ${plan.macroRatio.protein}</span>
          <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Fat ${plan.macroRatio.fat}</span>
        </div>
      </div>
      
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">Best For:</div>
        <div class="flex flex-wrap">
          ${plan.targetConditions.slice(0, 3).map(c => `
            <span class="meal-tag">${formatCondition(c)}</span>
          `).join('')}
          ${plan.targetConditions.length > 3 ? `<span class="meal-tag">+${plan.targetConditions.length - 3} more</span>` : ''}
        </div>
      </div>
      
      <div class="text-xs text-gray-500 mb-3">
        <strong>Key Principles:</strong>
        <ul class="list-disc list-inside mt-1">
          ${plan.keyPrinciples.slice(0, 2).map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      
      <div class="mt-auto pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">
            <i class="fas fa-utensils text-gold mr-1"></i>${countMeals(plan)} meals
          </span>
          <span class="text-navy font-medium">
            View Details <i class="fas fa-chevron-right ml-1 text-gold"></i>
          </span>
        </div>
      </div>
    </div>
  `).join('');

  // Generate plans data for JavaScript
  const plansData = JSON.stringify(
    Object.fromEntries(
      plans.map(p => [p.id, p])
    )
  );

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nutrition & Meal Plans | SelectCareOS™ Wellness</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${getStylesCSS()}
</head>
<body>
  ${getHeaderHTML('nutrition')}
  
  <!-- Hero Section -->
  <div class="hero-section" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-4">
        <i class="fas fa-apple-alt text-gold mr-2"></i>
        <span class="text-sm">Evidence-Based Nutrition Plans</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Nutrition & Meal Plans</h1>
      <p class="text-lg text-white/80 mb-6">Therapeutic diets and meal plans designed for specific health conditions</p>
      
      <div class="stats-grid max-w-2xl mx-auto">
        <div class="stat-item">
          <div class="stat-number">${stats.nutritionPlans}</div>
          <div class="stat-label">Meal Plans</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.totalMealOptions}</div>
          <div class="stat-label">Meal Options</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.conditionsWithNutrition}</div>
          <div class="stat-label">Conditions</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">RD Reviewed</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Search & Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" id="searchInput" placeholder="Search meal plans by name or condition..." class="search-input">
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="filter-btn active" data-filter="all">All</button>
          ${categories.map(cat => `
            <button class="filter-btn" data-filter="${cat}">
              <i class="fas ${getNutritionCategoryIcon(cat)} mr-1"></i>${formatCategory(cat)}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Plans Grid -->
    <div class="program-grid" id="plansGrid">
      ${planCardsHTML}
    </div>
    
    <!-- No Results -->
    <div class="no-results hidden" id="noResults">
      <i class="fas fa-search"></i>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">No meal plans found</h3>
      <p>Try adjusting your search or filters</p>
    </div>
    
    <!-- CTA -->
    <div class="card p-6 mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
      <h3 class="text-xl font-bold mb-2">Get a Personalized Nutrition Plan</h3>
      <p class="text-white/80 mb-4">Use our AI symptom analyzer to get nutrition recommendations tailored to your health conditions</p>
      <a href="/medisense" class="inline-flex items-center px-6 py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        <i class="fas fa-brain mr-2"></i>Start AI Analysis
      </a>
    </div>
  </main>
  
  <!-- Plan Detail Modal -->
  <div class="modal-overlay" id="planModal">
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">
        <i class="fas fa-times"></i>
      </button>
      <div id="modalContent">
        <!-- Dynamic content -->
      </div>
    </div>
  </div>
  
  ${getFooterHTML()}
  ${getBottomNavHTML('nutrition')}
  
  <script>
    const plans = ${plansData};
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', filterPlans);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterPlans();
      });
    });
    
    function filterPlans() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
      const cards = document.querySelectorAll('.program-card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const name = card.dataset.name;
        const category = card.dataset.category;
        const matchesSearch = name.includes(search);
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      document.getElementById('noResults').classList.toggle('hidden', visibleCount > 0);
    }
    
    function openPlanModal(planId) {
      const plan = plans[planId];
      if (!plan) return;
      
      const modal = document.getElementById('planModal');
      const content = document.getElementById('modalContent');
      
      const mealPlan = plan.sampleMealPlan;
      
      content.innerHTML = \`
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="category-badge category-\${plan.category}">
              \${plan.category.replace(/-/g, ' ')}
            </span>
            <span class="text-sm font-semibold text-gray-600">
              \${plan.calorieRange}
            </span>
          </div>
          
          <h2 class="text-2xl font-bold text-navy mb-2">\${plan.name}</h2>
          
          <div class="flex gap-2 text-xs mb-4">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">Carbs \${plan.macroRatio.carbohydrates}</span>
            <span class="px-2 py-1 bg-red-100 text-red-700 rounded">Protein \${plan.macroRatio.protein}</span>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Fat \${plan.macroRatio.fat}</span>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-bullseye text-gold mr-2"></i>Target Conditions</h3>
            <div class="flex flex-wrap">
              \${plan.targetConditions.map(c => '<span class="meal-tag">' + c.replace(/-/g, ' ') + '</span>').join('')}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-list-check text-gold mr-2"></i>Key Principles</h3>
            <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
              \${plan.keyPrinciples.map(p => '<li>' + p + '</li>').join('')}
            </ul>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-2"><i class="fas fa-check-circle text-green-500 mr-2"></i>Benefits</h3>
            <div class="space-y-1">
              \${plan.benefits.map(b => '<div class="benefit-item"><i class="fas fa-check text-sm"></i><span class="text-sm">' + b + '</span></div>').join('')}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold text-navy mb-3"><i class="fas fa-utensils text-gold mr-2"></i>Sample Meal Plan</h3>
            
            <div class="space-y-4">
              <div class="p-3 bg-orange-50 rounded-lg">
                <h4 class="font-medium text-orange-700 mb-2"><i class="fas fa-sun mr-1"></i>Breakfast</h4>
                \${mealPlan.breakfast.map(m => \`
                  <div class="p-2 bg-white rounded mb-2">
                    <div class="font-medium text-gray-800">\${m.name}</div>
                    <div class="text-xs text-gray-500 mt-1">\${m.ingredients.join(', ')}</div>
                    <div class="flex gap-2 text-xs mt-1">
                      <span class="text-orange-600">\${m.calories} kcal</span>
                      <span class="text-gray-500">P:\${m.protein}g C:\${m.carbs}g F:\${m.fat}g</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
              
              <div class="p-3 bg-green-50 rounded-lg">
                <h4 class="font-medium text-green-700 mb-2"><i class="fas fa-cloud-sun mr-1"></i>Lunch</h4>
                \${mealPlan.lunch.map(m => \`
                  <div class="p-2 bg-white rounded mb-2">
                    <div class="font-medium text-gray-800">\${m.name}</div>
                    <div class="text-xs text-gray-500 mt-1">\${m.ingredients.join(', ')}</div>
                    <div class="flex gap-2 text-xs mt-1">
                      <span class="text-green-600">\${m.calories} kcal</span>
                      <span class="text-gray-500">P:\${m.protein}g C:\${m.carbs}g F:\${m.fat}g</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
              
              <div class="p-3 bg-blue-50 rounded-lg">
                <h4 class="font-medium text-blue-700 mb-2"><i class="fas fa-moon mr-1"></i>Dinner</h4>
                \${mealPlan.dinner.map(m => \`
                  <div class="p-2 bg-white rounded mb-2">
                    <div class="font-medium text-gray-800">\${m.name}</div>
                    <div class="text-xs text-gray-500 mt-1">\${m.ingredients.join(', ')}</div>
                    <div class="flex gap-2 text-xs mt-1">
                      <span class="text-blue-600">\${m.calories} kcal</span>
                      <span class="text-gray-500">P:\${m.protein}g C:\${m.carbs}g F:\${m.fat}g</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
              
              <div class="p-3 bg-purple-50 rounded-lg">
                <h4 class="font-medium text-purple-700 mb-2"><i class="fas fa-cookie mr-1"></i>Snacks</h4>
                \${mealPlan.snacks.map(m => \`
                  <div class="p-2 bg-white rounded mb-2">
                    <div class="font-medium text-gray-800">\${m.name}</div>
                    <div class="text-xs text-gray-500 mt-1">\${m.ingredients.join(', ')}</div>
                    <div class="flex gap-2 text-xs mt-1">
                      <span class="text-purple-600">\${m.calories} kcal</span>
                      <span class="text-gray-500">P:\${m.protein}g C:\${m.carbs}g F:\${m.fat}g</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>
          
          <div class="mb-6 p-4 bg-cyan-50 rounded-lg">
            <h3 class="font-semibold text-cyan-700 mb-2"><i class="fas fa-tint mr-2"></i>Hydration</h3>
            <p class="text-sm text-cyan-600">\${plan.hydrationGuidelines}</p>
          </div>
          
          \${plan.contraindications.length > 0 ? \`
            <div class="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 class="font-semibold text-red-700 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>Contraindications</h3>
              <ul class="text-sm text-red-600 list-disc list-inside">
                \${plan.contraindications.map(c => '<li>' + c.replace(/-/g, ' ') + '</li>').join('')}
              </ul>
            </div>
          \` : ''}
          
          <div class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-700 mb-2"><i class="fas fa-microscope mr-2"></i>Scientific Evidence</h3>
            <p class="text-sm text-gray-600">\${plan.scientificEvidence}</p>
          </div>
        </div>
      \`;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
      document.getElementById('planModal').classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close modal on outside click
    document.getElementById('planModal').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  </script>
</body>
</html>
  `;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'cardiovascular': 'fa-heart-pulse',
    'strength': 'fa-dumbbell',
    'rehabilitation': 'fa-hand-holding-medical',
    'mind-body': 'fa-spa',
    'flexibility': 'fa-person-walking',
    'balance': 'fa-scale-balanced',
    'sport-specific': 'fa-running'
  };
  return icons[category] || 'fa-running';
}

function getNutritionCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'therapeutic': 'fa-prescription-bottle-medical',
    'weight-management': 'fa-weight-scale',
    'general-wellness': 'fa-leaf',
    'disease-specific': 'fa-stethoscope',
    'performance': 'fa-bolt'
  };
  return icons[category] || 'fa-utensils';
}

function formatCategory(category: string): string {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatCondition(condition: string): string {
  return condition.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function countMeals(plan: any): number {
  const mp = plan.sampleMealPlan;
  return mp.breakfast.length + mp.lunch.length + mp.dinner.length + mp.snacks.length;
}
