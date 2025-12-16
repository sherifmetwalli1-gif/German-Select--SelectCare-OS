import { Context } from 'hono'

export const landingPage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gs-cream">
      {/* Hero Section */}
      <header class="bg-gradient-to-br from-gs-navy via-gs-navy-light to-gs-navy text-white">
        <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gs-gold rounded-full flex items-center justify-center">
              <i class="fas fa-heartbeat text-gs-navy"></i>
            </div>
            <span class="text-xl font-bold tracking-wide">SelectCareOS<sup class="text-xs">™</sup></span>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <a href="#services" class="text-white/80 hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" class="text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#doctors" class="text-white/80 hover:text-white transition-colors">Our Team</a>
            <a href="#marketplace" class="text-white/80 hover:text-white transition-colors">Marketplace</a>
          </div>
          <div class="flex items-center gap-3">
            <a href="/login" class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Sign In</a>
            <a href="/login?register=1" class="px-4 py-2 bg-gs-gold text-gs-navy text-sm font-semibold rounded-lg hover:bg-gs-gold-dark transition-colors">Get Started</a>
          </div>
        </nav>
        
        <div class="container mx-auto px-4 py-16 md:py-24">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-gs-gold/20 text-gs-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i class="fas fa-rocket"></i>
                <span>Launching 2026</span>
              </div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                German Medical<br/>
                <span class="text-gs-gold">Excellence</span>,<br/>
                Red Sea Recovery
              </h1>
              <p class="text-lg text-white/80 mb-8 max-w-lg">
                World-class healthcare combining German-board certified surgeons, advanced digital care platform, and therapeutic Red Sea recovery at 60% less cost.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="/login?register=1" class="px-6 py-3 bg-gs-gold text-gs-navy font-semibold rounded-lg hover:bg-gs-gold-dark transition-colors flex items-center gap-2">
                  <span>Start Your Journey</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#how-it-works" class="px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                  <i class="fas fa-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
              
              {/* Stats */}
              <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div class="text-3xl font-bold text-gs-gold">60%</div>
                  <div class="text-sm text-white/60">Cost Savings</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-gs-gold">100%</div>
                  <div class="text-sm text-white/60">German Certified</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-gs-gold">98%</div>
                  <div class="text-sm text-white/60">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* App Preview */}
            <div class="hidden md:flex justify-center">
              <div class="relative">
                <div class="absolute -inset-4 bg-gs-gold/20 rounded-3xl blur-2xl"></div>
                <div class="relative bg-gs-navy-dark rounded-3xl p-3 shadow-2xl border border-white/10">
                  <div class="w-72 bg-gs-cream rounded-2xl overflow-hidden">
                    {/* Mini app preview */}
                    <div class="bg-gs-navy p-3 flex items-center justify-between">
                      <span class="text-white text-sm font-semibold">SelectCareOS™</span>
                      <div class="w-7 h-7 bg-gs-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-gs-navy text-xs"></i>
                      </div>
                    </div>
                    <div class="p-3 space-y-3">
                      {/* Surgery prep card */}
                      <div class="bg-gs-navy/10 rounded-lg p-3">
                        <div class="flex items-center gap-2 mb-2">
                          <div class="w-6 h-6 bg-gs-gold rounded-full flex items-center justify-center">
                            <i class="fas fa-running text-gs-navy text-xs"></i>
                          </div>
                          <span class="text-xs font-semibold text-gs-navy">SURGERY PREPARATION</span>
                        </div>
                        <p class="text-xs text-gray-500">Status: Completed - Oct 12</p>
                      </div>
                      
                      {/* Recovery phase */}
                      <div class="bg-gradient-to-r from-gs-gold to-gs-gold-dark rounded-lg p-3">
                        <div class="flex items-center gap-2 text-gs-navy">
                          <i class="fas fa-check-circle"></i>
                          <span class="text-xs font-bold">RECOVERY PHASE: POST-OP REHAB</span>
                        </div>
                        <div class="flex items-center gap-4 mt-3">
                          <div class="relative w-14 h-14">
                            <svg class="transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" stroke="#ffffff30" stroke-width="3"/>
                              <circle cx="18" cy="18" r="16" fill="none" stroke="#1A2E4A" stroke-width="3" stroke-dasharray="75, 100" stroke-linecap="round"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                              <span class="text-xs font-bold text-gs-navy">75%</span>
                            </div>
                          </div>
                          <div class="flex-1 h-1.5 bg-white/30 rounded-full">
                            <div class="w-3/4 h-full bg-gs-navy rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Milestone */}
                      <div class="flex gap-2">
                        <div class="flex flex-col items-center">
                          <div class="w-6 h-6 bg-gs-navy rounded-full flex items-center justify-center">
                            <i class="fas fa-clipboard-list text-gs-gold text-xs"></i>
                          </div>
                          <div class="w-0.5 h-8 bg-gray-200"></div>
                        </div>
                        <div class="bg-white rounded-lg p-2 flex-1 shadow-sm">
                          <p class="text-xs font-bold text-gs-navy">WEEK 1: INITIAL ASSESSMENT</p>
                          <p class="text-xs text-gray-500">Oct 15 - 21</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Grid */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'fa-video', title: 'Virtual Pre-Op', desc: 'Digital Follow-up', color: 'gs-navy' },
              { icon: 'fa-user-md', title: 'Board-Certified', desc: 'German Surgeons', color: 'gs-gold' },
              { icon: 'fa-tag', title: 'Cost Efficiency', desc: 'Premium Care, Egyptian Prices', color: 'gs-teal' },
              { icon: 'fa-star', title: '5-Star Recovery', desc: 'Red Sea Wellness', color: 'gs-gold' }
            ].map((feature) => (
              <div class="text-center p-6">
                <div class={`w-14 h-14 rounded-full bg-${feature.color}/10 flex items-center justify-center mx-auto mb-4`}>
                  <i class={`fas ${feature.icon} text-${feature.color} text-xl`}></i>
                </div>
                <h3 class="font-semibold text-gs-navy mb-1">{feature.title}</h3>
                <p class="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" class="py-20 bg-gs-cream">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">Our Services</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Comprehensive healthcare solutions from surgery to wellness, all managed through our integrated digital platform.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-weight', title: 'Bariatric Surgery', desc: 'Gastric sleeve, bypass, and revision procedures with German protocols and structured nutritional follow-up.', color: 'gs-navy' },
              { icon: 'fa-bone', title: 'Orthopedic Surgery', desc: 'Knee, hip, and spine procedures with modern techniques and personalized recovery programs.', color: 'gs-teal' },
              { icon: 'fa-smile', title: 'Aesthetic Surgery', desc: 'Reconstructive and cosmetic procedures with natural-looking results and discreet recovery.', color: 'gs-gold' },
              { icon: 'fa-tooth', title: 'Dental Implants', desc: 'Expert implants, restorations, and aesthetic dentistry in a medical tourism setting.', color: 'gs-blue' },
              { icon: 'fa-spa', title: 'Anti-Aging Treatments', desc: 'Non-surgical rejuvenation treatments following European safety standards.', color: 'gs-purple' },
              { icon: 'fa-heart', title: 'Chronic Disease Care', desc: 'Comprehensive management of diabetes, hypertension, and metabolic conditions.', color: 'gs-red' }
            ].map((service) => (
              <div class="bg-white rounded-2xl p-6 shadow-gs hover:shadow-gs-lg transition-all hover:-translate-y-1">
                <div class={`w-12 h-12 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-4`}>
                  <i class={`fas ${service.icon} text-${service.color} text-xl`}></i>
                </div>
                <h3 class="font-semibold text-lg text-gs-navy mb-2">{service.title}</h3>
                <p class="text-gray-600 text-sm">{service.desc}</p>
                <a href="/login?register=1" class="inline-flex items-center gap-2 text-gs-gold font-medium text-sm mt-4 hover:text-gs-gold-dark transition-colors">
                  <span>Learn More</span>
                  <i class="fas fa-arrow-right text-xs"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">How It Works</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Your medical tourism journey in four clear steps</p>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div class="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gs-gold/30"></div>
            
            {[
              { step: 1, title: 'Online Assessment', desc: 'Share your medical history and goals. Get reviewed by German-trained specialists.', icon: 'fa-laptop-medical' },
              { step: 2, title: 'Planning & Travel', desc: 'We schedule your procedure, book your stay, and coordinate all logistics.', icon: 'fa-plane' },
              { step: 3, title: 'Surgery & Recovery', desc: 'Treatment in German-standard clinics with Red Sea recovery environment.', icon: 'fa-hospital' },
              { step: 4, title: 'Follow-up Care', desc: 'Telemedicine support and long-term care through SelectCareOS platform.', icon: 'fa-mobile-alt' }
            ].map((item) => (
              <div class="text-center relative">
                <div class="w-32 h-32 rounded-full bg-gs-gold/10 flex items-center justify-center mx-auto mb-6 relative z-10">
                  <div class="w-24 h-24 rounded-full bg-gs-gold flex items-center justify-center">
                    <i class={`fas ${item.icon} text-gs-navy text-3xl`}></i>
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-gs-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 class="font-semibold text-lg text-gs-navy mb-2">{item.title}</h3>
                <p class="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Platform Features */}
      <section class="py-20 bg-gs-navy text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">SelectCareOS™ Platform</h2>
            <p class="text-white/70 max-w-2xl mx-auto">Your complete digital health companion for continuous care and monitoring</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-video', title: 'Telemedicine', desc: 'HD video consultations with German specialists', color: 'gs-blue' },
              { icon: 'fa-heartbeat', title: 'Remote Monitoring', desc: 'Real-time vitals tracking with wearable integration', color: 'gs-red' },
              { icon: 'fa-robot', title: 'AI Diagnostics', desc: 'Risk analysis and evidence-based recommendations', color: 'gs-purple' },
              { icon: 'fa-calendar-check', title: 'Smart Booking', desc: 'Book consultations, treatments, and accommodations', color: 'gs-green' },
              { icon: 'fa-chart-line', title: 'Progress Tracking', desc: 'Surgery timeline and recovery milestones', color: 'gs-gold' },
              { icon: 'fa-apple-alt', title: 'Wellness Tools', desc: 'Nutrition plans, exercise guidance, and lifestyle coaching', color: 'gs-teal' }
            ].map((feature) => (
              <div class="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div class={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                  <i class={`fas ${feature.icon} text-${feature.color} text-xl`}></i>
                </div>
                <h3 class="font-semibold text-lg mb-2">{feature.title}</h3>
                <p class="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Marketplace Preview */}
      <section id="marketplace" class="py-20 bg-gs-cream">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">Complete Packages</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Combine medical procedures with 5-star accommodations and Red Sea experiences</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'SelectCare', price: '€6,500', features: ['German-certified surgeon', 'Hospital stay', 'Basic accommodation', 'Airport transfers', 'Digital follow-up'], icon: 'fa-star', color: 'gs-navy' },
              { tier: 'SelectCare+', price: '€12,000', features: ['All SelectCare features', '5-star resort recovery', 'Personal care coordinator', 'Family accommodation', 'Wellness treatments'], icon: 'fa-crown', color: 'gs-gold', featured: true },
              { tier: 'SelectCrown', price: '€22,000', features: ['All SelectCare+ features', 'Private villa', 'Chef service', '24/7 medical supervision', 'Yacht excursions'], icon: 'fa-gem', color: 'gs-purple' }
            ].map((pkg) => (
              <div class={`rounded-2xl p-6 ${pkg.featured ? 'bg-gs-navy text-white ring-4 ring-gs-gold' : 'bg-white'} shadow-gs-lg relative`}>
                {pkg.featured && (
                  <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gs-gold text-gs-navy px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div class={`w-12 h-12 rounded-xl ${pkg.featured ? 'bg-gs-gold' : `bg-${pkg.color}/10`} flex items-center justify-center mb-4`}>
                  <i class={`fas ${pkg.icon} ${pkg.featured ? 'text-gs-navy' : `text-${pkg.color}`} text-xl`}></i>
                </div>
                <h3 class="font-bold text-xl mb-2">{pkg.tier}</h3>
                <div class="mb-4">
                  <span class="text-3xl font-bold">{pkg.price}</span>
                  <span class={`text-sm ${pkg.featured ? 'text-white/70' : 'text-gray-500'}`}> starting</span>
                </div>
                <ul class="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li class="flex items-center gap-2 text-sm">
                      <i class={`fas fa-check ${pkg.featured ? 'text-gs-gold' : 'text-gs-green'}`}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/login?register=1" class={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${pkg.featured ? 'bg-gs-gold text-gs-navy hover:bg-gs-gold-dark' : 'bg-gs-navy text-white hover:bg-gs-navy-light'}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-br from-gs-gold to-gs-gold-dark">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">Ready to Start Your Journey?</h2>
          <p class="text-gs-navy/80 max-w-2xl mx-auto mb-8">Join thousands of patients who have experienced German-quality healthcare with Red Sea recovery.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/login?register=1" class="px-8 py-4 bg-gs-navy text-white font-semibold rounded-lg hover:bg-gs-navy-light transition-colors flex items-center gap-2">
              <span>Create Free Account</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#" class="px-8 py-4 bg-white text-gs-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i class="fas fa-phone"></i>
              <span>Talk to Us</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer class="bg-gs-navy-dark text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-gs-gold rounded-full flex items-center justify-center">
                  <i class="fas fa-heartbeat text-gs-navy"></i>
                </div>
                <span class="text-xl font-bold">SelectCareOS<sup class="text-xs">™</sup></span>
              </div>
              <p class="text-white/60 text-sm">German Medical Excellence, Red Sea Recovery & Digital Care Integration</p>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Services</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><a href="#" class="hover:text-white transition-colors">Bariatric Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Orthopedic Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Aesthetic Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Wellness & Recovery</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Platform</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><a href="#" class="hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Remote Monitoring</a></li>
                <li><a href="#" class="hover:text-white transition-colors">AI Diagnostics</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Booking System</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Contact</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><i class="fas fa-envelope mr-2"></i>info@germanselect.org</li>
                <li><i class="fas fa-globe mr-2"></i>www.germanselect.org</li>
              </ul>
              <div class="flex gap-4 mt-4">
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>© 2024 German Select Health. All rights reserved. | GDPR Compliant | JCI Certified Partners</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
