import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const marketplacePage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="CareSelect™ Journeys" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Hero Banner */}
        <div class="bg-gradient-to-br from-gs-black via-gs-navy-dark to-gs-navy rounded-2xl p-6 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gs-gold/30 to-transparent rounded-full blur-2xl"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-gem text-gs-gold"></i>
              <span class="text-xs font-medium text-gs-gold uppercase tracking-wider">CareSelect™ Journeys</span>
            </div>
            <h2 class="text-xl font-bold mb-2">Curated Healthcare<br/>Experiences</h2>
            <p class="text-sm text-white/70 mb-4">German medical excellence + Red Sea recovery</p>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-gs-gold/20 text-gs-gold text-xs rounded-full">
                <i class="fas fa-shield-alt mr-1"></i>German Standards
              </span>
              <span class="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                <i class="fas fa-umbrella-beach mr-1"></i>Red Sea Recovery
              </span>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search treatments, accommodations..." 
            class="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-gs border-0 focus:ring-2 focus:ring-gs-gold outline-none"
          />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        {/* Category Tabs */}
        <div class="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { icon: 'fa-box-open', label: 'Journeys', active: true },
            { icon: 'fa-procedures', label: 'Surgery' },
            { icon: 'fa-spa', label: 'Wellness' },
            { icon: 'fa-hotel', label: 'Stay' },
            { icon: 'fa-ship', label: 'Excursions' },
            { icon: 'fa-leaf', label: 'Anti-Aging' }
          ].map((cat) => (
            <button class={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${cat.active ? 'bg-gs-black text-gs-gold' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <i class={`fas ${cat.icon}`}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
        
        {/* Featured Journeys */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-star text-gs-gold"></i>
              Featured Journeys
            </h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="space-y-4">
            {/* Essential Journey */}
            <Card className="overflow-hidden">
              <div class="h-24 bg-gradient-to-r from-gs-navy to-gs-navy-light flex items-center justify-between px-6 relative">
                <div>
                  <span class="text-xs text-gs-gold font-medium uppercase tracking-wider">Essential</span>
                  <h4 class="text-white font-bold text-lg">Essential Journey</h4>
                </div>
                <div class="w-16 h-16 bg-gs-gold/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-star text-gs-gold text-2xl"></i>
                </div>
              </div>
              <div class="p-4">
                <p class="text-sm text-gray-500 mb-3">Complete surgery with basic recovery package</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {['German Surgeon', 'Hospital 3-5 days', 'Transfers', 'Digital Follow-up'].map((item) => (
                    <span class="px-2 py-1 bg-gs-navy/5 text-gs-navy text-xs rounded-full">{item}</span>
                  ))}
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gs-navy">€6,500</span>
                    <span class="text-sm text-gray-400 ml-1">starting</span>
                  </div>
                  <button class="px-4 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                    Select Journey
                  </button>
                </div>
              </div>
            </Card>
            
            {/* Premium Journey - Featured */}
            <Card className="overflow-hidden ring-2 ring-gs-gold">
              <div class="h-28 bg-gradient-to-r from-gs-gold-light via-gs-gold to-gs-bronze flex items-center justify-between px-6 relative">
                <div class="absolute top-3 left-3 bg-gs-black text-gs-gold text-xs font-bold px-3 py-1 rounded-full">
                  <i class="fas fa-fire mr-1"></i>Most Popular
                </div>
                <div class="pt-6">
                  <span class="text-xs text-gs-black font-medium uppercase tracking-wider">Premium</span>
                  <h4 class="text-gs-black font-bold text-lg">Premium Journey</h4>
                </div>
                <div class="w-16 h-16 bg-gs-black/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-crown text-gs-black text-2xl"></i>
                </div>
              </div>
              <div class="p-4">
                <p class="text-sm text-gray-500 mb-3">5-star resort recovery with personal coordinator</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {['5★ Resort', 'Care Coordinator', 'Family Stay', 'Wellness Spa', 'Transfers'].map((item) => (
                    <span class="px-2 py-1 bg-gs-gold/10 text-gs-gold text-xs rounded-full">{item}</span>
                  ))}
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gs-navy">€12,000</span>
                    <span class="text-sm text-gray-400 ml-1">starting</span>
                  </div>
                  <button class="px-4 py-2 bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black text-sm font-medium rounded-lg hover:from-gs-gold hover:to-gs-bronze transition-all">
                    Select Journey
                  </button>
                </div>
              </div>
            </Card>
            
            {/* Crown Journey */}
            <Card className="overflow-hidden border-2 border-gs-purple/30">
              <div class="h-28 bg-gradient-to-br from-gs-purple via-gs-purple to-gs-navy-dark flex items-center justify-between px-6 relative">
                <div class="absolute top-3 left-3 bg-gs-gold text-gs-black text-xs font-bold px-3 py-1 rounded-full">
                  <i class="fas fa-gem mr-1"></i>Ultimate Luxury
                </div>
                <div class="pt-6">
                  <span class="text-xs text-gs-gold font-medium uppercase tracking-wider">Crown</span>
                  <h4 class="text-white font-bold text-lg">Crown Journey</h4>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-gem text-white text-2xl"></i>
                </div>
              </div>
              <div class="p-4">
                <p class="text-sm text-gray-500 mb-3">Ultimate VIP experience with private villa & yacht</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {['Private Villa', 'Private Chef', '24/7 Care', 'Yacht', 'VIP Spa'].map((item) => (
                    <span class="px-2 py-1 bg-gs-purple/10 text-gs-purple text-xs rounded-full">{item}</span>
                  ))}
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gs-navy">€22,000</span>
                    <span class="text-sm text-gray-400 ml-1">starting</span>
                  </div>
                  <button class="px-4 py-2 bg-gs-purple text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                    Select Journey
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Red Sea Accommodations */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-hotel text-gs-bronze"></i>
              Red Sea Accommodations
            </h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { name: 'Steigenberger Resort', type: '5-Star Hotel', price: '€180/night', rating: 4.9, features: ['Sea View', 'Spa'] },
              { name: 'Recovery Villa', type: 'Private Villa', price: '€450/night', rating: 5.0, features: ['Pool', 'Chef'] },
              { name: 'Wellness Retreat', type: 'Medical Spa', price: '€250/night', rating: 4.8, features: ['Treatments', 'Diet'] }
            ].map((hotel) => (
              <Card className="flex-shrink-0 w-56 overflow-hidden hover:shadow-gs-lg transition-shadow">
                <div class="h-28 bg-gradient-to-br from-gs-navy to-gs-black flex items-center justify-center relative">
                  <i class="fas fa-hotel text-gs-gold text-3xl"></i>
                  <div class="absolute top-2 right-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                    <i class="fas fa-star text-gs-gold text-xs"></i>
                    <span class="text-white text-xs font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div class="p-3">
                  <h5 class="font-semibold text-sm text-gs-navy">{hotel.name}</h5>
                  <p class="text-xs text-gray-500">{hotel.type}</p>
                  <div class="flex gap-1 mt-2">
                    {hotel.features.map((f) => (
                      <span class="text-[10px] bg-gs-gold/10 text-gs-gold px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div class="flex items-center justify-between mt-3">
                    <span class="text-gs-gold font-bold text-sm">{hotel.price}</span>
                    <button class="text-xs text-gs-navy hover:text-gs-gold">Book →</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Red Sea Experiences */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-umbrella-beach text-gs-teal"></i>
              Red Sea Experiences
            </h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            {[
              { name: 'Yacht Day Trip', duration: '6 hours', price: '€350', icon: 'fa-ship', color: 'gs-navy' },
              { name: 'Snorkeling Tour', duration: '4 hours', price: '€85', icon: 'fa-water', color: 'gs-teal' },
              { name: 'Desert Safari', duration: '5 hours', price: '€120', icon: 'fa-mountain', color: 'gs-bronze' },
              { name: 'Diving Course', duration: '2 days', price: '€250', icon: 'fa-swimmer', color: 'gs-blue' },
              { name: 'Spa Day', duration: 'Full day', price: '€180', icon: 'fa-spa', color: 'gs-purple' },
              { name: 'Sunset Cruise', duration: '3 hours', price: '€95', icon: 'fa-sun', color: 'gs-gold' }
            ].map((activity) => (
              <Card className="p-4 cursor-pointer hover:shadow-gs-lg transition-all group">
                <div class={`w-10 h-10 rounded-full bg-${activity.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <i class={`fas ${activity.icon} text-${activity.color}`}></i>
                </div>
                <h5 class="font-semibold text-sm text-gs-navy">{activity.name}</h5>
                <p class="text-xs text-gray-500">{activity.duration}</p>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-gs-gold font-bold text-sm">{activity.price}</p>
                  <button class="text-xs text-gs-navy hover:text-gs-gold">Add +</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Wellness & Anti-Aging */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-leaf text-gs-green"></i>
              Wellness & Anti-Aging
            </h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="space-y-3">
            {[
              { name: 'IV Vitamin Therapy', desc: 'Energy boost infusion', price: '€150', duration: '45 min', icon: 'fa-syringe' },
              { name: 'Medical Check-up', desc: 'Comprehensive health screening', price: '€450', duration: '3 hours', icon: 'fa-stethoscope' },
              { name: 'Skin Rejuvenation', desc: 'LED + Microneedling treatment', price: '€280', duration: '90 min', icon: 'fa-magic' },
              { name: 'Detox Program', desc: '5-day cleanse with supervision', price: '€1,200', duration: '5 days', icon: 'fa-leaf' }
            ].map((treatment) => (
              <Card className="p-4 flex items-center gap-4 hover:shadow-gs-lg transition-all cursor-pointer group">
                <div class="w-12 h-12 rounded-xl bg-gs-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gs-green/20 transition-colors">
                  <i class={`fas ${treatment.icon} text-gs-green`}></i>
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-gs-navy">{treatment.name}</h5>
                  <p class="text-xs text-gray-500">{treatment.desc}</p>
                  <p class="text-xs text-gs-gold mt-1"><i class="far fa-clock mr-1"></i>{treatment.duration}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-gs-navy">{treatment.price}</p>
                  <button class="text-xs text-gs-gold hover:underline">Book</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Membership Tiers */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-crown text-gs-gold"></i>
              Wellness Memberships
            </h3>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { tier: 'Silver', price: '€49', features: ['Telemedicine', 'Nutrition Plans', 'Health Tracking', 'Community'], color: 'gs-silver' },
              { tier: 'Gold', price: '€99', features: ['+ 20% Retreat Discount', '+ Device Rental', '+ Priority Booking', '+ Monthly Consult'], color: 'gs-gold', current: true },
              { tier: 'Platinum', price: '€199', features: ['+ Free Annual Check-up', '+ 30% Hotel Discount', '+ Dedicated Coordinator', '+ VIP Events'], color: 'gs-purple' }
            ].map((membership) => (
              <Card className={`flex-shrink-0 w-56 p-4 ${membership.current ? 'ring-2 ring-gs-gold bg-gs-gold/5' : ''}`}>
                <div class="flex items-center gap-2 mb-3">
                  <i class={`fas fa-crown text-${membership.color}`}></i>
                  <span class="font-bold text-gs-navy">{membership.tier}</span>
                  {membership.current && (
                    <span class="text-xs bg-gs-gold text-gs-black px-2 py-0.5 rounded-full ml-auto font-medium">Current</span>
                  )}
                </div>
                <p class="text-2xl font-bold text-gs-navy mb-3">{membership.price}<span class="text-sm font-normal text-gray-400">/mo</span></p>
                <ul class="space-y-2">
                  {membership.features.map((feature) => (
                    <li class="text-xs text-gray-600 flex items-start gap-2">
                      <i class="fas fa-check text-gs-green mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button class={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${membership.current ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-gs-black text-gs-gold hover:bg-gs-navy'}`}>
                  {membership.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Cart Summary */}
        <Card className="p-4 bg-gs-black text-white sticky bottom-20 shadow-gs-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gs-gold">Your Journey Selection</p>
              <p class="font-bold">3 items • €2,850</p>
            </div>
            <button class="px-6 py-3 bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black font-bold rounded-lg hover:from-gs-gold hover:to-gs-bronze transition-all flex items-center gap-2">
              <i class="fas fa-shopping-cart"></i>
              <span>View Cart</span>
            </button>
          </div>
        </Card>
      </main>
    </PageWrapper>
  )
}
