import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const marketplacePage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Marketplace" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
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
            { icon: 'fa-procedures', label: 'Surgery', active: true },
            { icon: 'fa-spa', label: 'Wellness' },
            { icon: 'fa-hotel', label: 'Stay' },
            { icon: 'fa-ship', label: 'Excursions' },
            { icon: 'fa-leaf', label: 'Anti-Aging' },
            { icon: 'fa-magic', label: 'Aesthetics' }
          ].map((cat) => (
            <button class={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${cat.active ? 'bg-gs-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <i class={`fas ${cat.icon}`}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
        
        {/* Featured Packages */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Featured Packages</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="space-y-4">
            {/* SelectCare+ Package */}
            <Card className="overflow-hidden">
              <div class="h-32 bg-gradient-to-br from-gs-navy to-gs-navy-light flex items-center justify-center relative">
                <div class="absolute top-3 right-3 bg-gs-gold text-gs-navy text-xs font-bold px-2 py-1 rounded-full">
                  Most Popular
                </div>
                <i class="fas fa-crown text-gs-gold text-4xl"></i>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-lg text-gs-navy">SelectCare+ Package</h4>
                <p class="text-sm text-gray-500 mt-1">Complete surgery + 5-star recovery experience</p>
                <div class="flex flex-wrap gap-2 mt-3">
                  {['Surgery', '5★ Hotel', 'Transfers', 'Wellness', 'Follow-up'].map((item) => (
                    <span class="px-2 py-1 bg-gs-gold/10 text-gs-gold text-xs rounded-full">{item}</span>
                  ))}
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div>
                    <span class="text-2xl font-bold text-gs-navy">€12,000</span>
                    <span class="text-sm text-gray-400 ml-1">starting</span>
                  </div>
                  <button class="px-4 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                    Customize
                  </button>
                </div>
              </div>
            </Card>
            
            {/* SelectCrown Package */}
            <Card className="overflow-hidden border-2 border-gs-gold">
              <div class="h-32 bg-gradient-to-br from-gs-gold to-gs-gold-dark flex items-center justify-center relative">
                <div class="absolute top-3 right-3 bg-gs-navy text-white text-xs font-bold px-2 py-1 rounded-full">
                  Premium
                </div>
                <i class="fas fa-gem text-gs-navy text-4xl"></i>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-lg text-gs-navy">SelectCrown Package</h4>
                <p class="text-sm text-gray-500 mt-1">Ultimate luxury recovery experience</p>
                <div class="flex flex-wrap gap-2 mt-3">
                  {['Surgery', 'Private Villa', 'Chef', '24/7 Care', 'Yacht', 'Spa'].map((item) => (
                    <span class="px-2 py-1 bg-gs-navy/10 text-gs-navy text-xs rounded-full">{item}</span>
                  ))}
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div>
                    <span class="text-2xl font-bold text-gs-navy">€22,000</span>
                    <span class="text-sm text-gray-400 ml-1">starting</span>
                  </div>
                  <button class="px-4 py-2 bg-gs-gold text-gs-navy text-sm font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
                    Customize
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Accommodations */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Red Sea Accommodations</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { name: 'Steigenberger Resort', type: '5-Star Hotel', price: '€180/night', rating: 4.9 },
              { name: 'Recovery Villa', type: 'Private Villa', price: '€450/night', rating: 5.0 },
              { name: 'Wellness Retreat', type: 'Medical Spa', price: '€250/night', rating: 4.8 }
            ].map((hotel) => (
              <Card className="flex-shrink-0 w-56 overflow-hidden">
                <div class="h-28 bg-gs-navy flex items-center justify-center">
                  <i class="fas fa-hotel text-gs-gold text-3xl"></i>
                </div>
                <div class="p-3">
                  <h5 class="font-semibold text-sm text-gs-navy">{hotel.name}</h5>
                  <p class="text-xs text-gray-500">{hotel.type}</p>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-gs-gold text-xs"></i>
                      <span class="text-xs font-medium">{hotel.rating}</span>
                    </div>
                    <span class="text-gs-gold font-bold text-sm">{hotel.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Excursions & Activities */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Red Sea Experiences</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            {[
              { name: 'Yacht Day Trip', duration: '6 hours', price: '€350', icon: 'fa-ship' },
              { name: 'Snorkeling Tour', duration: '4 hours', price: '€85', icon: 'fa-water' },
              { name: 'Desert Safari', duration: '5 hours', price: '€120', icon: 'fa-mountain' },
              { name: 'Diving Course', duration: '2 days', price: '€250', icon: 'fa-swimmer' },
              { name: 'Spa Day', duration: 'Full day', price: '€180', icon: 'fa-spa' },
              { name: 'Sunset Cruise', duration: '3 hours', price: '€95', icon: 'fa-sun' }
            ].map((activity) => (
              <Card className="p-4 cursor-pointer hover:shadow-gs-lg transition-all">
                <div class="w-10 h-10 rounded-full bg-gs-gold/10 flex items-center justify-center mb-3">
                  <i class={`fas ${activity.icon} text-gs-gold`}></i>
                </div>
                <h5 class="font-semibold text-sm text-gs-navy">{activity.name}</h5>
                <p class="text-xs text-gray-500">{activity.duration}</p>
                <p class="text-gs-gold font-bold text-sm mt-2">{activity.price}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Wellness & Anti-Aging */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Wellness & Anti-Aging</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          
          <div class="space-y-3">
            {[
              { name: 'IV Vitamin Therapy', desc: 'Energy boost infusion', price: '€150', duration: '45 min' },
              { name: 'Medical Check-up', desc: 'Comprehensive health screening', price: '€450', duration: '3 hours' },
              { name: 'Skin Rejuvenation', desc: 'LED + Microneedling treatment', price: '€280', duration: '90 min' },
              { name: 'Detox Program', desc: '5-day cleanse with supervision', price: '€1,200', duration: '5 days' }
            ].map((treatment) => (
              <Card className="p-4 flex items-center gap-4 hover:shadow-gs-lg transition-all cursor-pointer">
                <div class="w-12 h-12 rounded-full bg-gs-purple/10 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-leaf text-gs-purple"></i>
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-gs-navy">{treatment.name}</h5>
                  <p class="text-xs text-gray-500">{treatment.desc}</p>
                  <p class="text-xs text-gs-gold mt-1">{treatment.duration}</p>
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
            <h3 class="font-bold text-gs-navy">Wellness Memberships</h3>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { tier: 'Silver', price: '€49', features: ['Telemedicine', 'Nutrition Plans', 'Health Tracking', 'Community'], color: 'gray-400' },
              { tier: 'Gold', price: '€99', features: ['+ 20% Retreat Discount', '+ Device Rental', '+ Priority Booking', '+ Monthly Consult'], color: 'gs-gold', current: true },
              { tier: 'Platinum', price: '€199', features: ['+ Free Annual Check-up', '+ 30% Hotel Discount', '+ Dedicated Coordinator', '+ VIP Events'], color: 'gs-purple' }
            ].map((membership) => (
              <Card className={`flex-shrink-0 w-56 p-4 ${membership.current ? 'ring-2 ring-gs-gold' : ''}`}>
                <div class="flex items-center gap-2 mb-3">
                  <i class={`fas fa-crown text-${membership.color}`}></i>
                  <span class="font-bold text-gs-navy">{membership.tier}</span>
                  {membership.current && (
                    <span class="text-xs bg-gs-gold text-gs-navy px-2 py-0.5 rounded-full ml-auto">Current</span>
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
                <button class={`w-full mt-4 py-2 rounded-lg text-sm font-medium ${membership.current ? 'bg-gray-100 text-gray-400' : 'bg-gs-navy text-white hover:bg-gs-navy-light'} transition-colors`}>
                  {membership.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Cart Summary */}
        <Card className="p-4 bg-gs-navy text-white sticky bottom-20 shadow-gs-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-white/60">Your Selection</p>
              <p class="font-bold">3 items • €2,850</p>
            </div>
            <button class="px-6 py-3 bg-gs-gold text-gs-navy font-bold rounded-lg hover:bg-gs-gold-dark transition-colors flex items-center gap-2">
              <i class="fas fa-shopping-cart"></i>
              <span>View Cart</span>
            </button>
          </div>
        </Card>
      </main>
    </PageWrapper>
  )
}
