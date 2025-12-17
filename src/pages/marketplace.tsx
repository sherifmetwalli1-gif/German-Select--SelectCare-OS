import { Context } from 'hono'
import { Logo, StatusBadge } from '../components/layout'

export const marketplacePage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-28">
      {/* Premium Marketplace Header */}
      <header class="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 bg-mesh-gold opacity-10"></div>
        <div class="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div class="relative px-4 pt-4 pb-8">
          {/* Top Bar */}
          <div class="flex items-center justify-between mb-6">
            <button onclick="history.back()" class="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
              <i class="fas fa-arrow-left text-white/90"></i>
            </button>
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
      
      <main class="px-4 py-6 space-y-8 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search treatments, activities, accommodations..." 
            class="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-card border border-slate-200 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none text-sm transition-all"
          />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <button class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-navy-900 rounded-xl flex items-center justify-center hover:bg-navy-800 transition-colors">
            <i class="fas fa-sliders-h text-brand-400 text-sm"></i>
          </button>
        </div>
        
        {/* Category Tabs */}
        <div class="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {[
            { icon: 'fa-box-open', label: 'Journeys', active: true },
            { icon: 'fa-procedures', label: 'Surgery' },
            { icon: 'fa-spa', label: 'Wellness' },
            { icon: 'fa-hotel', label: 'Stay' },
            { icon: 'fa-anchor', label: 'Hurghada' },
            { icon: 'fa-landmark', label: 'Luxor' },
            { icon: 'fa-leaf', label: 'Anti-Aging' }
          ].map((cat) => (
            <button class={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all ${cat.active ? 'bg-gradient-to-r from-navy-800 to-navy-900 text-brand-400 shadow-soft' : 'bg-white text-slate-600 hover:bg-slate-50 shadow-card border border-slate-100'}`}>
              <i class={`fas ${cat.icon}`}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
        
        {/* Featured Journeys */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-star text-brand-500"></i>
              Featured Journeys
            </h3>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="space-y-4">
            {/* Essential Journey */}
            <div class="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100 hover:shadow-card-hover transition-all">
              <div class="h-28 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 flex items-center justify-between px-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-mesh-gold opacity-5"></div>
                <div class="relative z-10">
                  <span class="text-xs text-brand-400 font-bold uppercase tracking-wider">Essential</span>
                  <h4 class="text-white font-bold text-xl">Essential Journey</h4>
                  <p class="text-slate-400 text-xs">Complete surgery with recovery basics</p>
                </div>
                <div class="w-18 h-18 bg-brand-500/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-star text-brand-400 text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  {['German Surgeon', 'Hospital 3-5 days', 'Airport Transfers', 'Digital Follow-up', 'Basic Recovery'].map((item) => (
                    <span class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">{item}</span>
                  ))}
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
            
            {/* Premium Journey - Featured */}
            <div class="bg-white rounded-2xl shadow-card overflow-hidden ring-2 ring-brand-500 hover:shadow-card-hover transition-all relative">
              <div class="absolute top-4 left-4 z-20 bg-gradient-to-r from-danger-500 to-danger-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <i class="fas fa-fire"></i>Most Popular
              </div>
              <div class="h-32 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 flex items-center justify-between px-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-mesh-gold opacity-10"></div>
                <div class="relative z-10 pt-4">
                  <span class="text-xs text-navy-900 font-bold uppercase tracking-wider">Premium</span>
                  <h4 class="text-navy-900 font-bold text-xl">Premium Journey</h4>
                  <p class="text-navy-800 text-xs">5-star resort recovery experience</p>
                </div>
                <div class="w-18 h-18 bg-navy-900/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-crown text-navy-900 text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  {['5★ Resort Hurghada', 'Care Coordinator', 'Family Accommodation', 'Wellness Spa', 'VIP Transfers', '24/7 Support'].map((item) => (
                    <span class="px-3 py-1.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">{item}</span>
                  ))}
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
                <div class="absolute inset-0 bg-mesh-gold opacity-5"></div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>
                <div class="relative z-10 pt-4">
                  <span class="text-xs text-brand-400 font-bold uppercase tracking-wider">Crown</span>
                  <h4 class="text-white font-bold text-xl">Crown Journey</h4>
                  <p class="text-slate-300 text-xs">Ultimate VIP experience</p>
                </div>
                <div class="w-18 h-18 bg-white/20 rounded-full flex items-center justify-center relative z-10">
                  <i class="fas fa-gem text-white text-2xl"></i>
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-2 mb-4">
                  {['Private Villa', 'Private Chef', '24/7 Concierge', 'Yacht Excursions', 'Luxor Tours', 'VIP Spa Suite'].map((item) => (
                    <span class="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">{item}</span>
                  ))}
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
        </div>
        
        {/* Hurghada Activities Section */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
                <i class="fas fa-anchor text-teal-500"></i>
                Hurghada Activities
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">Red Sea adventures for recovery & wellness</p>
            </div>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            {[
              { name: 'Glass Bottom Boat Tour', duration: '3 hours', price: '€45', icon: 'fa-ship', color: 'teal', rating: 4.8, desc: 'View marine life without getting wet', recovery: true },
              { name: 'Red Sea Snorkeling', duration: '4 hours', price: '€65', icon: 'fa-water', color: 'info', rating: 4.9, desc: 'Explore coral reefs & tropical fish', recovery: true },
              { name: 'Dolphin House Trip', duration: '6 hours', price: '€85', icon: 'fa-fish', color: 'teal', rating: 4.7, desc: 'Swim with wild dolphins', recovery: false },
              { name: 'Sunset Yacht Cruise', duration: '3 hours', price: '€120', icon: 'fa-sailboat', color: 'brand', rating: 4.9, desc: 'Luxury sunset experience', recovery: true },
              { name: 'Private Beach Day', duration: 'Full day', price: '€95', icon: 'fa-umbrella-beach', color: 'warning', rating: 4.8, desc: 'Exclusive beach resort access', recovery: true },
              { name: 'Scuba Diving Intro', duration: '4 hours', price: '€110', icon: 'fa-person-swimming', color: 'info', rating: 4.6, desc: 'Beginner-friendly dive experience', recovery: false },
              { name: 'Desert Quad Safari', duration: '4 hours', price: '€75', icon: 'fa-car', color: 'warning', rating: 4.5, desc: 'Quad bikes through desert', recovery: false },
              { name: 'Parasailing Adventure', duration: '30 min', price: '€55', icon: 'fa-parachute-box', color: 'danger', rating: 4.7, desc: 'Fly above the Red Sea', recovery: false },
              { name: 'Spa & Wellness Day', duration: 'Full day', price: '€180', icon: 'fa-spa', color: 'purple', rating: 5.0, desc: 'Luxury spa treatments', recovery: true },
              { name: 'Bedouin Dinner Experience', duration: '5 hours', price: '€65', icon: 'fa-moon', color: 'navy', rating: 4.8, desc: 'Traditional desert dinner under stars', recovery: true },
              { name: 'Fishing Trip', duration: '6 hours', price: '€95', icon: 'fa-fish-fins', color: 'teal', rating: 4.6, desc: 'Deep sea fishing excursion', recovery: true },
              { name: 'Submarine Tour', duration: '2 hours', price: '€90', icon: 'fa-submarine', color: 'navy', rating: 4.8, desc: 'Explore underwater world in comfort', recovery: true }
            ].map((activity) => (
              <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
                <div class="flex items-start justify-between mb-3">
                  <div class={`w-12 h-12 rounded-xl bg-${activity.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i class={`fas ${activity.icon} text-${activity.color}-600 text-lg`}></i>
                  </div>
                  <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                    <i class="fas fa-star text-warning-500 text-xs"></i>
                    <span class="text-xs font-bold text-slate-700">{activity.rating}</span>
                  </div>
                </div>
                <h5 class="font-bold text-navy-900 text-sm mb-1">{activity.name}</h5>
                <p class="text-xs text-slate-500 mb-2">{activity.desc}</p>
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs text-slate-400 flex items-center gap-1">
                    <i class="far fa-clock"></i>{activity.duration}
                  </span>
                  {activity.recovery && (
                    <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">
                      Recovery Friendly
                    </span>
                  )}
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-brand-600">{activity.price}</span>
                  <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Luxor Sightseeing Section */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
                <i class="fas fa-landmark text-brand-500"></i>
                Luxor Sightseeing
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">Ancient wonders & pharaonic heritage</p>
            </div>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          {/* Premium Luxor Tours */}
          <div class="space-y-4 mb-4">
            {/* Full Day Luxor Tour */}
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-card hover:shadow-card-hover transition-all">
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <i class="fas fa-pyramid text-white text-2xl"></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 bg-amber-200 text-amber-800 text-[10px] font-bold rounded-full uppercase">Best Seller</span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-warning-500 text-xs"></i>
                      <span class="text-xs font-bold text-slate-700">4.9</span>
                    </div>
                  </div>
                  <h4 class="font-bold text-navy-900 text-lg mb-1">Complete Luxor Experience</h4>
                  <p class="text-sm text-slate-600 mb-3">Full-day guided tour covering both East & West Bank including Valley of the Kings, Karnak & Luxor Temples</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    {['Valley of Kings', 'Karnak Temple', 'Luxor Temple', 'Hatshepsut Temple', 'Colossi of Memnon', 'Lunch Included'].map((item) => (
                      <span class="px-2 py-1 bg-white/80 text-amber-800 text-xs font-medium rounded-full">{item}</span>
                    ))}
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-xs text-slate-500">
                      <span><i class="far fa-clock mr-1"></i>Full day (10 hrs)</span>
                      <span><i class="fas fa-car mr-1"></i>Private transfer</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-xl font-bold text-navy-900">€195</span>
                      <button class="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all shadow-soft active:scale-95">
                        Book Tour
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
                      <i class="fas fa-star text-warning-500 text-xs"></i>
                      <span class="text-xs font-bold text-slate-700">5.0</span>
                    </div>
                  </div>
                  <h4 class="font-bold text-navy-900 text-lg mb-1">Sunrise Hot Air Balloon</h4>
                  <p class="text-sm text-slate-600 mb-3">Magical sunrise flight over the Valley of the Kings, Hatshepsut Temple & ancient Thebes - a once-in-a-lifetime experience</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-xs text-slate-500">
                      <span><i class="far fa-clock mr-1"></i>1.5 hours</span>
                      <span><i class="fas fa-sun mr-1"></i>Sunrise departure</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-xl font-bold text-navy-900">€125</span>
                      <button class="px-4 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-bold rounded-xl hover:from-rose-500 hover:to-pink-600 transition-all shadow-soft active:scale-95">
                        Book Flight
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Individual Luxor Attractions */}
          <div class="grid grid-cols-2 gap-4">
            {[
              { name: 'Valley of the Kings', duration: '3 hours', price: '€55', icon: 'fa-crown', color: 'amber', rating: 4.9, desc: 'Royal tombs of ancient pharaohs', highlight: '3 tombs included' },
              { name: 'Karnak Temple Complex', duration: '2.5 hours', price: '€45', icon: 'fa-gopuram', color: 'orange', rating: 4.8, desc: 'Largest ancient religious site', highlight: 'Sound & Light show opt.' },
              { name: 'Luxor Temple Night Tour', duration: '2 hours', price: '€35', icon: 'fa-moon', color: 'indigo', rating: 4.7, desc: 'Illuminated temple at night', highlight: 'Photography perfect' },
              { name: 'Hatshepsut Temple', duration: '2 hours', price: '€40', icon: 'fa-chess-queen', color: 'purple', rating: 4.8, desc: 'Temple of the female pharaoh', highlight: 'Architectural wonder' },
              { name: 'Nile Felucca Sunset Sail', duration: '2 hours', price: '€35', icon: 'fa-sailboat', color: 'teal', rating: 4.9, desc: 'Traditional boat sunset cruise', highlight: 'Banana Island visit' },
              { name: 'Colossi of Memnon', duration: '1 hour', price: '€20', icon: 'fa-monument', color: 'stone', rating: 4.5, desc: 'Massive stone statues', highlight: 'Free to visit' },
              { name: 'Luxor Museum Tour', duration: '2 hours', price: '€30', icon: 'fa-building-columns', color: 'slate', rating: 4.6, desc: 'Ancient Egyptian artifacts', highlight: 'Air-conditioned' },
              { name: 'Medinet Habu Temple', duration: '2 hours', price: '€35', icon: 'fa-place-of-worship', color: 'emerald', rating: 4.7, desc: 'Temple of Ramesses III', highlight: 'Best preserved colors' },
              { name: 'Deir el-Medina Village', duration: '1.5 hours', price: '€25', icon: 'fa-house', color: 'cyan', rating: 4.5, desc: 'Ancient workers\' village', highlight: 'Unique perspective' },
              { name: 'Nile Dinner Cruise', duration: '3 hours', price: '€75', icon: 'fa-utensils', color: 'rose', rating: 4.8, desc: 'Dinner cruise with entertainment', highlight: 'Belly dance show' },
              { name: 'Private Guide Full Day', duration: '8 hours', price: '€150', icon: 'fa-user-tie', color: 'navy', rating: 5.0, desc: 'Egyptologist private guide', highlight: 'Customize itinerary' },
              { name: 'Photography Tour', duration: '4 hours', price: '€85', icon: 'fa-camera', color: 'zinc', rating: 4.9, desc: 'Best photo spots & timing', highlight: 'Pro tips included' }
            ].map((attraction) => (
              <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
                <div class="flex items-start justify-between mb-3">
                  <div class={`w-12 h-12 rounded-xl bg-${attraction.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i class={`fas ${attraction.icon} text-${attraction.color}-600 text-lg`}></i>
                  </div>
                  <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                    <i class="fas fa-star text-warning-500 text-xs"></i>
                    <span class="text-xs font-bold text-slate-700">{attraction.rating}</span>
                  </div>
                </div>
                <h5 class="font-bold text-navy-900 text-sm mb-1">{attraction.name}</h5>
                <p class="text-xs text-slate-500 mb-2">{attraction.desc}</p>
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs text-slate-400 flex items-center gap-1">
                    <i class="far fa-clock"></i>{attraction.duration}
                  </span>
                  <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded-full">
                    {attraction.highlight}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-brand-600">{attraction.price}</span>
                  <button class="px-3 py-1.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors">
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Red Sea Accommodations */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-hotel text-purple-500"></i>
              Red Sea Accommodations
            </h3>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
            {[
              { name: 'Steigenberger Al Dau', type: '5-Star Beach Resort', price: '€180/night', rating: 4.9, features: ['Sea View', 'Private Beach', 'Spa'], recovery: true },
              { name: 'Sunrise Grand Select', type: '5-Star Adults Only', price: '€220/night', rating: 4.8, features: ['All Inclusive', 'Infinity Pool', 'Butler'], recovery: true },
              { name: 'Private Recovery Villa', type: 'Luxury Villa', price: '€450/night', rating: 5.0, features: ['Private Pool', 'Chef', '24/7 Nurse'], recovery: true },
              { name: 'Marriott Beach Resort', type: '5-Star Family Resort', price: '€160/night', rating: 4.7, features: ['Kids Club', 'Water Park', 'Spa'], recovery: true },
              { name: 'Kempinski Soma Bay', type: '5-Star Boutique', price: '€280/night', rating: 4.9, features: ['Golf Course', 'Thalasso Spa', 'Diving'], recovery: true }
            ].map((hotel) => (
              <div class="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-all">
                <div class="h-36 bg-gradient-to-br from-navy-800 via-navy-700 to-teal-900 flex items-center justify-center relative">
                  <i class="fas fa-hotel text-brand-400 text-4xl opacity-50"></i>
                  <div class="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <i class="fas fa-star text-warning-400 text-xs"></i>
                    <span class="text-white text-xs font-bold">{hotel.rating}</span>
                  </div>
                  {hotel.recovery && (
                    <div class="absolute top-3 right-3 px-2 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                      <i class="fas fa-heart-pulse mr-1"></i>Recovery Certified
                    </div>
                  )}
                </div>
                <div class="p-4">
                  <h5 class="font-bold text-navy-900 mb-0.5">{hotel.name}</h5>
                  <p class="text-xs text-slate-500 mb-3">{hotel.type}</p>
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    {hotel.features.map((f) => (
                      <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">{f}</span>
                    ))}
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-brand-600">{hotel.price}</span>
                    <button class="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-colors">
                      Book →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Wellness & Anti-Aging */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-leaf text-success-500"></i>
              Wellness & Anti-Aging
            </h3>
            <a href="#" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="space-y-3">
            {[
              { name: 'IV Vitamin Therapy', desc: 'Energy & immunity boost infusion', price: '€150', duration: '45 min', icon: 'fa-syringe', popular: true },
              { name: 'German Medical Check-up', desc: 'Comprehensive health screening', price: '€450', duration: '3 hours', icon: 'fa-stethoscope', popular: false },
              { name: 'Skin Rejuvenation', desc: 'LED therapy + Microneedling treatment', price: '€280', duration: '90 min', icon: 'fa-magic', popular: true },
              { name: 'Detox Program', desc: '5-day supervised cleanse program', price: '€1,200', duration: '5 days', icon: 'fa-leaf', popular: false },
              { name: 'PRP Therapy', desc: 'Platelet-rich plasma regeneration', price: '€350', duration: '60 min', icon: 'fa-vial', popular: true }
            ].map((treatment) => (
              <div class="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
                <div class="w-14 h-14 rounded-2xl bg-success-100 flex items-center justify-center flex-shrink-0 group-hover:bg-success-200 transition-colors">
                  <i class={`fas ${treatment.icon} text-success-600 text-xl`}></i>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <h5 class="font-bold text-navy-900">{treatment.name}</h5>
                    {treatment.popular && (
                      <span class="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-bold rounded-full">Popular</span>
                    )}
                  </div>
                  <p class="text-xs text-slate-500">{treatment.desc}</p>
                  <p class="text-xs text-teal-600 mt-1 font-medium"><i class="far fa-clock mr-1"></i>{treatment.duration}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <p class="font-bold text-navy-900 text-lg">{treatment.price}</p>
                  <button class="text-xs text-brand-600 hover:text-brand-700 font-semibold">Book →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Wellness Memberships */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-crown text-brand-500"></i>
              Wellness Memberships
            </h3>
          </div>
          
          <div class="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
            {[
              { tier: 'Silver', price: '€49', features: ['Unlimited Telemedicine', 'Nutrition Plans', 'Health Tracking', 'Community Access'], color: 'slate' },
              { tier: 'Gold', price: '€99', features: ['+ 20% Activity Discount', '+ Device Rental', '+ Priority Booking', '+ Monthly Consultation'], color: 'brand', current: true },
              { tier: 'Platinum', price: '€199', features: ['+ Annual Health Check', '+ 30% Hotel Discount', '+ Dedicated Coordinator', '+ VIP Lounge Access'], color: 'purple' }
            ].map((membership) => (
              <div class={`flex-shrink-0 w-64 bg-white rounded-2xl p-5 border ${membership.current ? 'ring-2 ring-brand-500 bg-brand-50/50' : 'border-slate-200'} shadow-card hover:shadow-card-hover transition-all`}>
                <div class="flex items-center gap-2 mb-4">
                  <div class={`w-10 h-10 rounded-xl bg-${membership.color}-100 flex items-center justify-center`}>
                    <i class={`fas fa-crown text-${membership.color}-600`}></i>
                  </div>
                  <span class="font-bold text-navy-900 text-lg">{membership.tier}</span>
                  {membership.current && (
                    <span class="ml-auto text-xs bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 px-2.5 py-1 rounded-full font-bold">Current</span>
                  )}
                </div>
                <p class="text-3xl font-bold text-navy-900 mb-4">{membership.price}<span class="text-sm font-normal text-slate-400">/mo</span></p>
                <ul class="space-y-2.5">
                  {membership.features.map((feature) => (
                    <li class="text-xs text-slate-600 flex items-start gap-2">
                      <i class="fas fa-check text-success-500 mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button class={`w-full mt-5 py-3 rounded-xl text-sm font-bold transition-all ${membership.current ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-navy-900 text-white hover:bg-navy-800 shadow-soft active:scale-95'}`}>
                  {membership.current ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Sticky Cart Summary */}
      <div class="fixed bottom-24 left-0 right-0 px-4 z-40">
        <div class="max-w-lg mx-auto">
          <div class="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-2xl p-4 shadow-soft-lg border border-white/10 backdrop-blur-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-brand-400 font-semibold">Your Journey Selection</p>
                <p class="font-bold text-lg">3 items • €2,850</p>
              </div>
              <button class="px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 font-bold rounded-xl hover:from-brand-500 hover:to-brand-700 transition-all shadow-glow-brand flex items-center gap-2 active:scale-95">
                <i class="fas fa-shopping-cart"></i>
                <span>View Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 p-4 z-50 safe-bottom">
        <div class="max-w-lg mx-auto">
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl px-3 py-3 shadow-soft-lg border border-slate-200/50">
            <div class="flex justify-around items-center">
              {[
                { icon: 'fa-home', label: 'Home', href: '/patient' },
                { icon: 'fa-shopping-bag', label: 'Marketplace', href: '/patient/marketplace', active: true },
                { icon: 'fa-calendar', label: 'Bookings', href: '/patient/timeline' },
                { icon: 'fa-heart', label: 'Wellness', href: '/patient/rpm' },
                { icon: 'fa-user', label: 'Profile', href: '/patient/profile' }
              ].map((item) => (
                <a 
                  href={item.href} 
                  class={`relative flex flex-col items-center py-2 px-4 rounded-2xl transition-all ${
                    item.active 
                      ? 'bg-gradient-to-br from-navy-800 to-navy-900 text-white shadow-soft-md' 
                      : 'text-slate-500 hover:text-navy-900 hover:bg-slate-100'
                  }`}
                >
                  <i class={`fas ${item.icon} text-lg ${item.active ? 'text-brand-400' : ''}`}></i>
                  <span class={`text-[10px] font-semibold mt-1 ${item.active ? 'text-brand-400' : ''}`}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
