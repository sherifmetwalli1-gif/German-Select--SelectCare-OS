import { Context } from 'hono'
import { Logo } from '../components/layout'

export const marketplacePage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-32">
      {/* Premium Marketplace Header */}
      <header class="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-mesh-gold opacity-10"></div>
        <div class="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div class="relative px-4 pt-4 pb-8">
          {/* Top Bar */}
          <div class="flex items-center justify-between mb-6">
            <a href="/patient" class="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
              <i class="fas fa-arrow-left text-white/90"></i>
            </a>
            <Logo size="small" theme="dark" />
            <button class="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 relative">
              <i class="fas fa-shopping-cart text-white/90"></i>
              <span class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">3</span>
            </button>
          </div>
          
          {/* Hero Content */}
          <div class="text-center mb-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 rounded-full mb-4">
              <i class="fas fa-gem text-brand-400"></i>
              <span class="text-xs font-bold text-brand-400 uppercase tracking-wider">CareSelect™ Journeys</span>
            </div>
            <h1 class="text-3xl font-bold mb-2">Curated Healthcare<br/>Experiences</h1>
            <p class="text-slate-400 text-sm max-w-xs mx-auto">German medical excellence combined with Red Sea luxury recovery</p>
          </div>
          
          {/* Trust Badges */}
          <div class="flex justify-center gap-3 flex-wrap">
            <span class="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/10">
              <i class="fas fa-shield-alt text-brand-400"></i>German Standards
            </span>
            <span class="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/10">
              <i class="fas fa-umbrella-beach text-teal-400"></i>Red Sea Recovery
            </span>
            <span class="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/10">
              <i class="fas fa-star text-warning-400"></i>4.9 Rating
            </span>
          </div>
        </div>
      </header>
      
      <main class="px-4 py-6 space-y-10 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav class="flex items-center gap-2 text-xs -mt-2 mb-4">
          <a href="/patient" class="text-slate-500 hover:text-navy-900 transition-colors">Dashboard</a>
          <i class="fas fa-chevron-right text-slate-300 text-[10px]"></i>
          <span class="text-navy-900 font-semibold">Marketplace</span>
        </nav>
        
        {/* Search Bar with Enhanced Design */}
        <div class="relative -mt-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search treatments, activities, accommodations..." 
              class="w-full pl-12 pr-24 py-4 bg-white rounded-2xl shadow-card border-2 border-slate-200 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none text-sm transition-all hover:border-slate-300"
            />
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <button class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-navy-900 to-navy-800 rounded-xl flex items-center justify-center hover:from-navy-800 hover:to-navy-700 transition-all shadow-soft">
              <i class="fas fa-sliders-h text-brand-400 text-sm"></i>
            </button>
          </div>
          <div class="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <i class="fas fa-lightbulb text-amber-400"></i>
            <span>Try searching: <span class="font-semibold text-navy-900">"knee surgery"</span>, <span class="font-semibold text-navy-900">"yacht"</span>, or <span class="font-semibold text-navy-900">"spa"</span></span>
          </div>
        </div>
        
        {/* Category Tabs with Item Counts */}
        <div class="sticky top-0 z-30 bg-gradient-to-b from-slate-50 to-slate-100 -mx-4 px-4 py-3 mb-4">
          <div class="flex items-center gap-2 mb-2">
            <i class="fas fa-filter text-slate-400 text-xs"></i>
            <span class="text-xs font-semibold text-slate-600 uppercase tracking-wider">Browse Categories</span>
          </div>
          <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-gradient-to-r from-navy-800 to-navy-900 text-brand-400 shadow-soft ring-2 ring-brand-400/30">
              <i class="fas fa-box-open"></i>
              <span>Journeys</span>
              <span class="ml-1 px-1.5 py-0.5 bg-brand-400/20 rounded-full text-[10px]">3</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 shadow-card border border-slate-100 hover:border-slate-300 transition-all">
              <i class="fas fa-procedures"></i>
              <span>Surgery</span>
              <span class="ml-1 px-1.5 py-0.5 bg-slate-100 rounded-full text-[10px]">8</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 shadow-card border border-slate-100 hover:border-slate-300 transition-all">
              <i class="fas fa-spa"></i>
              <span>Wellness</span>
              <span class="ml-1 px-1.5 py-0.5 bg-slate-100 rounded-full text-[10px]">5</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 shadow-card border border-slate-100 hover:border-slate-300 transition-all">
              <i class="fas fa-hotel"></i>
              <span>Stay</span>
              <span class="ml-1 px-1.5 py-0.5 bg-slate-100 rounded-full text-[10px]">5</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-teal-50 text-teal-700 hover:bg-teal-100 shadow-card border border-teal-200 hover:border-teal-300 transition-all">
              <i class="fas fa-anchor"></i>
              <span>Hurghada</span>
              <span class="ml-1 px-1.5 py-0.5 bg-teal-200/50 rounded-full text-[10px]">12</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 shadow-card border border-amber-200 hover:border-amber-300 transition-all">
              <i class="fas fa-landmark"></i>
              <span>Luxor</span>
              <span class="ml-1 px-1.5 py-0.5 bg-amber-200/50 rounded-full text-[10px]">14</span>
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 shadow-card border border-slate-100 hover:border-slate-300 transition-all">
              <i class="fas fa-leaf"></i>
              <span>Anti-Aging</span>
              <span class="ml-1 px-1.5 py-0.5 bg-slate-100 rounded-full text-[10px]">5</span>
            </button>
          </div>
        </div>
        
        {/* Featured Journeys */}
        <section class="pt-2">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-star text-navy-900 text-lg"></i>
              </div>
              <div>
                <h2 class="font-bold text-navy-900 text-xl">Featured Journeys</h2>
                <p class="text-xs text-slate-500">Complete medical tourism packages</p>
              </div>
            </div>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group bg-brand-50 px-3 py-1.5 rounded-full hover:bg-brand-100 transition-all">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          {/* Value Proposition Banner */}
          <div class="bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 rounded-2xl p-4 mb-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                  <i class="fas fa-badge-check text-white text-xl"></i>
                </div>
                <div>
                  <p class="font-bold text-navy-900 text-sm">All-Inclusive Packages</p>
                  <p class="text-xs text-slate-600">Surgery + Recovery + Activities • Save up to 40%</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-500">Starting from</p>
                <p class="text-2xl font-bold text-brand-600">€6.5k</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            {/* Essential Journey */}
            <div class="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100 hover:shadow-card-hover transition-all">
              <div class="h-28 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 flex items-center justify-between px-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-mesh-gold opacity-5"></div>
                <div class="relative z-10">
                  <span class="text-xs text-brand-400 font-bold uppercase tracking-wider">Essential</span>
                  <h3 class="text-white font-bold text-xl">Essential Journey</h3>
                  <p class="text-slate-400 text-xs">Complete surgery with recovery basics</p>
                </div>
                <div class="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-star text-brand-400 text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">German Surgeon</span>
                  <span class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Hospital 3-5 days</span>
                  <span class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Airport Transfers</span>
                  <span class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Digital Follow-up</span>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-3xl font-bold text-navy-900">€6,500</span>
                    <span class="text-sm text-slate-400 ml-1">starting</span>
                  </div>
                  <button class="px-6 py-3 bg-navy-900 text-white text-sm font-bold rounded-xl hover:bg-navy-800 transition-colors shadow-soft active:scale-95">
                    Select Journey →
                  </button>
                </div>
              </div>
            </div>
            
            {/* Premium Journey */}
            <div class="bg-white rounded-2xl shadow-card overflow-hidden ring-2 ring-brand-500 hover:shadow-card-hover transition-all relative">
              <div class="absolute top-4 left-4 z-20 bg-gradient-to-r from-danger-500 to-danger-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <i class="fas fa-fire"></i>Most Popular
              </div>
              <div class="h-32 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 flex items-center justify-between px-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-mesh-gold opacity-10"></div>
                <div class="relative z-10 pt-4">
                  <span class="text-xs text-navy-900 font-bold uppercase tracking-wider">Premium</span>
                  <h3 class="text-navy-900 font-bold text-xl">Premium Journey</h3>
                  <p class="text-navy-800 text-xs">5-star resort recovery experience</p>
                </div>
                <div class="w-16 h-16 bg-navy-900/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-crown text-navy-900 text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="px-3 py-1.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">5★ Resort Hurghada</span>
                  <span class="px-3 py-1.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">Care Coordinator</span>
                  <span class="px-3 py-1.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">Wellness Spa</span>
                  <span class="px-3 py-1.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">24/7 Support</span>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-3xl font-bold text-navy-900">€12,000</span>
                    <span class="text-sm text-slate-400 ml-1">starting</span>
                  </div>
                  <button class="px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-sm font-bold rounded-xl hover:from-brand-500 hover:to-brand-700 transition-all shadow-glow-brand active:scale-95">
                    Select Journey →
                  </button>
                </div>
              </div>
            </div>
            
            {/* Crown Journey */}
            <div class="bg-white rounded-2xl shadow-card overflow-hidden border-2 border-purple-300 hover:shadow-card-hover transition-all relative">
              <div class="absolute top-4 left-4 z-20 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <i class="fas fa-gem"></i>Ultimate Luxury
              </div>
              <div class="h-32 bg-gradient-to-br from-purple-600 via-purple-500 to-navy-800 flex items-center justify-between px-6 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>
                <div class="relative z-10 pt-4">
                  <span class="text-xs text-brand-400 font-bold uppercase tracking-wider">Crown</span>
                  <h3 class="text-white font-bold text-xl">Crown Journey</h3>
                  <p class="text-slate-300 text-xs">Ultimate VIP experience</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-gem text-white text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Private Villa</span>
                  <span class="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Private Chef</span>
                  <span class="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Yacht Excursions</span>
                  <span class="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Luxor Tours</span>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-3xl font-bold text-navy-900">€22,000</span>
                    <span class="text-sm text-slate-400 ml-1">starting</span>
                  </div>
                  <button class="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-bold rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-soft active:scale-95">
                    Select Journey →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Divider */}
        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-4 bg-gradient-to-b from-slate-50 to-slate-100 text-xs text-slate-400 uppercase tracking-wider font-semibold">Activities & Experiences</span>
          </div>
        </div>
        
        {/* Hurghada Activities */}
        <section class="pt-2">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-anchor text-white text-lg"></i>
              </div>
              <div>
                <h2 class="font-bold text-navy-900 text-xl">Hurghada Activities</h2>
                <p class="text-xs text-slate-500">Red Sea adventures for recovery & wellness</p>
              </div>
            </div>
            <a href="#" class="text-sm text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1 group bg-teal-50 px-3 py-1.5 rounded-full">
              All 12 <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            {/* Glass Bottom Boat */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover hover:border-teal-300 transition-all cursor-pointer group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative">
                <div class="flex items-start justify-between mb-3">
                  <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-200 transition-all">
                    <i class="fas fa-ship text-teal-600 text-lg"></i>
                  </div>
                  <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-amber-100 transition-colors">
                    <i class="fas fa-star text-amber-400 text-xs"></i>
                    <span class="text-xs font-bold text-slate-700">4.8</span>
                  </div>
                </div>
                <h4 class="font-bold text-navy-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">Glass Bottom Boat</h4>
                <p class="text-xs text-slate-500 mb-2">View marine life without getting wet</p>
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>3 hrs</span>
                  <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">Recovery OK</span>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-bold text-brand-600">€45</span>
                    <span class="text-xs text-slate-400 ml-1">/person</span>
                  </div>
                  <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors active:scale-95">Add +</button>
                </div>
              </div>
            </div>
            
            {/* Snorkeling */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-water text-blue-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.9</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Red Sea Snorkeling</h4>
              <p class="text-xs text-slate-500 mb-2">Explore coral reefs & tropical fish</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>4 hrs</span>
                <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">Recovery OK</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€65</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Sunset Yacht */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-sailboat text-brand-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.9</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Sunset Yacht Cruise</h4>
              <p class="text-xs text-slate-500 mb-2">Luxury sunset experience</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>3 hrs</span>
                <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">Recovery OK</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€120</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Spa Day */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-spa text-purple-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">5.0</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Spa & Wellness Day</h4>
              <p class="text-xs text-slate-500 mb-2">Luxury spa treatments</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>Full day</span>
                <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">Recovery OK</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€180</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Dolphin House */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-fish text-teal-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.7</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Dolphin House Trip</h4>
              <p class="text-xs text-slate-500 mb-2">Swim with wild dolphins</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>6 hrs</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€85</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Desert Safari */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-car text-amber-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.5</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Desert Quad Safari</h4>
              <p class="text-xs text-slate-500 mb-2">Quad bikes through desert</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>4 hrs</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€75</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Luxor Sightseeing */}
        <section class="pt-2">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <i class="fas fa-landmark text-white text-lg"></i>
              </div>
              <div>
                <h2 class="font-bold text-navy-900 text-xl">Luxor Sightseeing</h2>
                <p class="text-xs text-slate-500">Ancient wonders & pharaonic heritage</p>
              </div>
            </div>
            <a href="#" class="text-sm text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1 group bg-amber-50 px-3 py-1.5 rounded-full">
              All 14 <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          {/* Premium Tours */}
          <div class="space-y-4 mb-4">
            {/* Complete Luxor */}
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-card hover:shadow-card-hover transition-all">
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <i class="fas fa-pyramid text-white text-2xl"></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 bg-amber-200 text-amber-800 text-[10px] font-bold rounded-full uppercase">Best Seller</span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-amber-400 text-xs"></i>
                      <span class="text-xs font-bold text-slate-700">4.9</span>
                    </div>
                  </div>
                  <h3 class="font-bold text-navy-900 text-lg mb-1">Complete Luxor Experience</h3>
                  <p class="text-sm text-slate-600 mb-3">Full-day guided tour: Valley of Kings, Karnak & Luxor Temples, Hatshepsut</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="px-2 py-1 bg-white/80 text-amber-800 text-xs font-medium rounded-full">Valley of Kings</span>
                    <span class="px-2 py-1 bg-white/80 text-amber-800 text-xs font-medium rounded-full">Karnak Temple</span>
                    <span class="px-2 py-1 bg-white/80 text-amber-800 text-xs font-medium rounded-full">Lunch</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-xs text-slate-500">
                      <span><i class="far fa-clock mr-1"></i>10 hrs</span>
                      <span><i class="fas fa-car mr-1"></i>Private</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-xl font-bold text-navy-900">€195</span>
                      <button class="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all shadow-soft active:scale-95">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hot Air Balloon */}
            <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-200 shadow-card hover:shadow-card-hover transition-all">
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <i class="fas fa-hot-air-balloon text-white text-2xl"></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 bg-rose-200 text-rose-800 text-[10px] font-bold rounded-full uppercase">Unforgettable</span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-amber-400 text-xs"></i>
                      <span class="text-xs font-bold text-slate-700">5.0</span>
                    </div>
                  </div>
                  <h3 class="font-bold text-navy-900 text-lg mb-1">Sunrise Hot Air Balloon</h3>
                  <p class="text-sm text-slate-600 mb-3">Magical sunrise flight over Valley of Kings & ancient Thebes</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-xs text-slate-500">
                      <span><i class="far fa-clock mr-1"></i>1.5 hrs</span>
                      <span><i class="fas fa-sun mr-1"></i>Sunrise</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-xl font-bold text-navy-900">€125</span>
                      <button class="px-4 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-bold rounded-xl hover:from-rose-500 hover:to-pink-600 transition-all shadow-soft active:scale-95">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Individual Attractions */}
          <div class="grid grid-cols-2 gap-3">
            {/* Valley of Kings */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-crown text-amber-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.9</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Valley of the Kings</h4>
              <p class="text-xs text-slate-500 mb-2">Royal tombs of pharaohs</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>3 hrs</span>
                <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded-full">3 tombs</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€55</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Karnak Temple */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-gopuram text-orange-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.8</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Karnak Temple</h4>
              <p class="text-xs text-slate-500 mb-2">Largest ancient religious site</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>2.5 hrs</span>
                <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded-full">Sound show opt.</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€45</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Hatshepsut */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-chess-queen text-purple-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.8</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Hatshepsut Temple</h4>
              <p class="text-xs text-slate-500 mb-2">Temple of female pharaoh</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>2 hrs</span>
                <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded-full">Architecture</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€40</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
            
            {/* Nile Felucca */}
            <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-sailboat text-teal-600 text-lg"></i>
                </div>
                <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-xs font-bold text-slate-700">4.9</span>
                </div>
              </div>
              <h4 class="font-bold text-navy-900 text-sm mb-1">Nile Felucca Sunset</h4>
              <p class="text-xs text-slate-500 mb-2">Traditional boat sunset cruise</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i>2 hrs</span>
                <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">Recovery OK</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-brand-600">€35</span>
                <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">Add +</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Divider */}
        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-4 bg-gradient-to-b from-slate-50 to-slate-100 text-xs text-slate-400 uppercase tracking-wider font-semibold">Accommodations & Wellness</span>
          </div>
        </div>
        
        {/* Accommodations */}
        <section class="pt-2">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-hotel text-white text-lg"></i>
              </div>
              <div>
                <h2 class="font-bold text-navy-900 text-xl">Recovery Accommodations</h2>
                <p class="text-xs text-slate-500">Certified recovery-friendly stays</p>
              </div>
            </div>
            <a href="#" class="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1 group bg-purple-50 px-3 py-1.5 rounded-full">
              All 5 <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
            {/* Steigenberger */}
            <div class="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-all">
              <div class="h-36 bg-gradient-to-br from-navy-800 via-navy-700 to-teal-900 flex items-center justify-center relative">
                <i class="fas fa-hotel text-brand-400 text-4xl opacity-50"></i>
                <div class="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-white text-xs font-bold">4.9</span>
                </div>
                <div class="absolute top-3 right-3 px-2 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                  <i class="fas fa-heart-pulse mr-1"></i>Recovery Certified
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-navy-900 mb-0.5">Steigenberger Al Dau</h4>
                <p class="text-xs text-slate-500 mb-3">5-Star Beach Resort</p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Sea View</span>
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Private Beach</span>
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Spa</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-brand-600">€180<span class="text-xs text-slate-400 font-normal">/night</span></span>
                  <button class="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-colors">Book →</button>
                </div>
              </div>
            </div>
            
            {/* Private Villa */}
            <div class="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border-2 border-brand-300 shadow-card hover:shadow-card-hover transition-all">
              <div class="h-36 bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 flex items-center justify-center relative">
                <i class="fas fa-house text-navy-900 text-4xl opacity-50"></i>
                <div class="absolute top-3 left-3 flex items-center gap-1 bg-navy-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-white text-xs font-bold">5.0</span>
                </div>
                <div class="absolute top-3 right-3 px-2 py-1 bg-navy-900/80 backdrop-blur-sm text-brand-400 text-[10px] font-bold rounded-full">
                  <i class="fas fa-gem mr-1"></i>Premium
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-navy-900 mb-0.5">Private Recovery Villa</h4>
                <p class="text-xs text-slate-500 mb-3">Luxury Villa • 24/7 Care</p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10px] bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">Private Pool</span>
                  <span class="text-[10px] bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">Chef</span>
                  <span class="text-[10px] bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">24/7 Nurse</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-brand-600">€450<span class="text-xs text-slate-400 font-normal">/night</span></span>
                  <button class="px-4 py-2 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-xs font-bold rounded-xl transition-colors">Book →</button>
                </div>
              </div>
            </div>
            
            {/* Kempinski */}
            <div class="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-all">
              <div class="h-36 bg-gradient-to-br from-navy-800 via-navy-700 to-teal-900 flex items-center justify-center relative">
                <i class="fas fa-hotel text-brand-400 text-4xl opacity-50"></i>
                <div class="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <i class="fas fa-star text-amber-400 text-xs"></i>
                  <span class="text-white text-xs font-bold">4.9</span>
                </div>
                <div class="absolute top-3 right-3 px-2 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                  <i class="fas fa-heart-pulse mr-1"></i>Recovery Certified
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-navy-900 mb-0.5">Kempinski Soma Bay</h4>
                <p class="text-xs text-slate-500 mb-3">5-Star Boutique Resort</p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Golf Course</span>
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Thalasso Spa</span>
                  <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">Diving</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-brand-600">€280<span class="text-xs text-slate-400 font-normal">/night</span></span>
                  <button class="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-colors">Book →</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Wellness Treatments */}
        <section class="pt-2">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-leaf text-white text-lg"></i>
              </div>
              <div>
                <h2 class="font-bold text-navy-900 text-xl">Wellness & Anti-Aging</h2>
                <p class="text-xs text-slate-500">Premium treatments & therapies</p>
              </div>
            </div>
            <a href="#" class="text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 group bg-emerald-50 px-3 py-1.5 rounded-full">
              All 5 <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="space-y-3">
            {/* IV Vitamin */}
            <div class="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                <i class="fas fa-syringe text-emerald-600 text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h4 class="font-bold text-navy-900">IV Vitamin Therapy</h4>
                  <span class="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-bold rounded-full">Popular</span>
                </div>
                <p class="text-xs text-slate-500">Energy & immunity boost infusion</p>
                <p class="text-xs text-teal-600 mt-1 font-medium"><i class="far fa-clock mr-1"></i>45 min</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-bold text-navy-900 text-lg">€150</p>
                <button class="text-xs text-brand-600 hover:text-brand-700 font-semibold">Book →</button>
              </div>
            </div>
            
            {/* Skin Rejuvenation */}
            <div class="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                <i class="fas fa-wand-magic-sparkles text-purple-600 text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h4 class="font-bold text-navy-900">Skin Rejuvenation</h4>
                  <span class="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-bold rounded-full">Popular</span>
                </div>
                <p class="text-xs text-slate-500">LED therapy + Microneedling</p>
                <p class="text-xs text-teal-600 mt-1 font-medium"><i class="far fa-clock mr-1"></i>90 min</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-bold text-navy-900 text-lg">€280</p>
                <button class="text-xs text-brand-600 hover:text-brand-700 font-semibold">Book →</button>
              </div>
            </div>
            
            {/* Medical Checkup */}
            <div class="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <i class="fas fa-stethoscope text-blue-600 text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h4 class="font-bold text-navy-900">German Medical Check-up</h4>
                </div>
                <p class="text-xs text-slate-500">Comprehensive health screening</p>
                <p class="text-xs text-teal-600 mt-1 font-medium"><i class="far fa-clock mr-1"></i>3 hours</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-bold text-navy-900 text-lg">€450</p>
                <button class="text-xs text-brand-600 hover:text-brand-700 font-semibold">Book →</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Floating Action Buttons */}
      <div class="fixed bottom-28 right-4 z-40 flex flex-col gap-3">
        <button class="w-14 h-14 bg-white rounded-full shadow-soft-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group">
          <i class="fas fa-balance-scale text-navy-900 group-hover:scale-110 transition-transform"></i>
        </button>
        <button class="w-14 h-14 bg-white rounded-full shadow-soft-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group">
          <i class="fas fa-heart text-slate-400 group-hover:text-rose-500 group-hover:scale-110 transition-all"></i>
        </button>
      </div>
      
      {/* Enhanced Sticky Cart */}
      <div class="fixed bottom-24 left-0 right-0 px-4 z-40">
        <div class="max-w-lg mx-auto">
          <div class="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-2xl p-4 shadow-soft-lg border border-white/10 backdrop-blur-xl">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-shopping-bag text-brand-400 text-xs"></i>
                  <p class="text-xs text-brand-400 font-semibold uppercase tracking-wider">Your Journey</p>
                </div>
                <p class="font-bold text-lg mb-1">3 items • €2,850</p>
                <div class="flex gap-2">
                  <span class="px-2 py-0.5 bg-white/10 text-[10px] font-medium rounded-full">Premium Journey</span>
                  <span class="px-2 py-0.5 bg-white/10 text-[10px] font-medium rounded-full">2 Activities</span>
                </div>
              </div>
              <button class="px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 font-bold rounded-xl hover:from-brand-500 hover:to-brand-700 transition-all shadow-glow-brand flex items-center gap-2 active:scale-95 whitespace-nowrap">
                <span>View Cart</span>
                <i class="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 p-4 z-50 safe-bottom">
        <div class="max-w-lg mx-auto">
          <div class="bg-white/90 backdrop-blur-xl rounded-3xl px-3 py-3 shadow-soft-lg border border-slate-200/50">
            <div class="flex justify-around items-center">
              <a href="/patient" class="flex flex-col items-center py-2 px-4 rounded-2xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                <i class="fas fa-home text-lg"></i>
                <span class="text-[10px] font-semibold mt-1">Home</span>
              </a>
              <a href="/patient/marketplace" class="flex flex-col items-center py-2 px-4 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-white shadow-soft-md">
                <i class="fas fa-shopping-bag text-lg text-brand-400"></i>
                <span class="text-[10px] font-semibold mt-1 text-brand-400">Marketplace</span>
              </a>
              <a href="/patient/timeline" class="flex flex-col items-center py-2 px-4 rounded-2xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                <i class="fas fa-calendar text-lg"></i>
                <span class="text-[10px] font-semibold mt-1">Bookings</span>
              </a>
              <a href="/patient/rpm" class="flex flex-col items-center py-2 px-4 rounded-2xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                <i class="fas fa-heart text-lg"></i>
                <span class="text-[10px] font-semibold mt-1">Wellness</span>
              </a>
              <a href="/patient/profile" class="flex flex-col items-center py-2 px-4 rounded-2xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                <i class="fas fa-user text-lg"></i>
                <span class="text-[10px] font-semibold mt-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
