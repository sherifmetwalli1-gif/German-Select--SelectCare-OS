import { Context } from 'hono'

export const landingPage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gs-cream">
      {/* Hero Section */}
      <header class="bg-gradient-to-br from-gs-black via-gs-navy-dark to-gs-navy text-white">
        <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* German Select Logo */}
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-center leading-none">
              <span class="text-lg font-bold tracking-[0.3em] text-gs-silver uppercase" style="font-family: 'Inter', sans-serif; letter-spacing: 0.35em;">GERMAN</span>
              <span class="text-xl font-playfair font-semibold tracking-wider bg-gradient-to-r from-gs-gold-light via-gs-gold to-gs-bronze bg-clip-text text-transparent">Select</span>
            </div>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <a href="#services" class="text-white/80 hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" class="text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#doctors" class="text-white/80 hover:text-white transition-colors">Our Team</a>
            <a href="#careselect" class="text-white/80 hover:text-white transition-colors">CareSelect™</a>
          </div>
          <div class="flex items-center gap-3">
            <a href="/login" class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Sign In</a>
            <a href="/login?register=1" class="px-4 py-2 bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black text-sm font-semibold rounded-lg hover:from-gs-gold hover:to-gs-bronze transition-all shadow-gs-gold">Get Started</a>
          </div>
        </nav>
        
        <div class="container mx-auto px-4 py-16 md:py-24">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-gs-gold/20 text-gs-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i class="fas fa-certificate"></i>
                <span>German-Quality Healthcare</span>
              </div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span class="text-gs-silver">German</span> Medical<br/>
                <span class="bg-gradient-to-r from-gs-gold-light via-gs-gold to-gs-bronze bg-clip-text text-transparent">Excellence</span>,<br/>
                Red Sea Recovery
              </h1>
              <p class="text-lg text-white/80 mb-8 max-w-lg">
                Safe medical tourism in Egypt with German-trained surgeons and calm recovery by the Red Sea. European medical standards with the comfort and value of Egypt.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="/login?register=1" class="px-6 py-3 bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black font-semibold rounded-lg hover:from-gs-gold hover:to-gs-bronze transition-all shadow-lg shadow-gs-gold/30 flex items-center gap-2">
                  <span>Start Your Journey</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#how-it-works" class="px-6 py-3 border-2 border-gs-gold/50 text-gs-gold font-semibold rounded-lg hover:bg-gs-gold/10 transition-colors flex items-center gap-2">
                  <i class="fas fa-play-circle"></i>
                  <span>How It Works</span>
                </a>
              </div>
              
              {/* Stats */}
              <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div class="text-3xl font-bold bg-gradient-to-r from-gs-gold-light to-gs-gold bg-clip-text text-transparent">60%</div>
                  <div class="text-sm text-white/60">Cost Savings</div>
                </div>
                <div>
                  <div class="text-3xl font-bold bg-gradient-to-r from-gs-gold-light to-gs-gold bg-clip-text text-transparent">100%</div>
                  <div class="text-sm text-white/60">German Certified</div>
                </div>
                <div>
                  <div class="text-3xl font-bold bg-gradient-to-r from-gs-gold-light to-gs-gold bg-clip-text text-transparent">98%</div>
                  <div class="text-sm text-white/60">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced App Mockup Preview */}
            <div class="hidden md:flex justify-center">
              <div class="relative">
                {/* Glow effect */}
                <div class="absolute -inset-8 bg-gradient-to-r from-gs-gold/30 to-gs-bronze/30 rounded-[3rem] blur-3xl animate-pulse"></div>
                <div class="absolute -inset-4 bg-gs-black/50 rounded-[2.5rem] blur-xl"></div>
                
                {/* Phone frame */}
                <div class="relative">
                  {/* Phone outer frame */}
                  <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Phone screen border */}
                    <div class="bg-black rounded-[2rem] p-1">
                      {/* Phone screen */}
                      <div class="w-80 bg-gs-cream rounded-[1.75rem] overflow-hidden relative">
                        {/* Status bar / Notch */}
                        <div class="bg-gs-black px-4 pt-2 pb-0">
                          <div class="flex justify-center">
                            <div class="w-24 h-6 bg-black rounded-b-xl"></div>
                          </div>
                        </div>
                        
                        {/* App Header with German Select Branding */}
                        <div class="bg-gs-black px-4 py-3 flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="flex flex-col items-start leading-none">
                              <span class="text-[8px] font-bold tracking-[0.2em] text-gs-silver uppercase">GERMAN</span>
                              <span class="text-xs font-playfair font-semibold text-gs-gold">Select</span>
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-gs-gold/20 rounded-full flex items-center justify-center">
                              <i class="fas fa-bell text-gs-gold text-xs"></i>
                            </div>
                            <div class="w-8 h-8 bg-gradient-to-r from-gs-gold-light to-gs-gold rounded-full flex items-center justify-center">
                              <i class="fas fa-user text-gs-black text-xs"></i>
                            </div>
                          </div>
                        </div>
                        
                        {/* App Content */}
                        <div class="p-4 space-y-3 h-[420px] overflow-hidden">
                          {/* Surgery Preparation Card */}
                          <div class="bg-white rounded-xl p-3 shadow-md border-l-4 border-gs-green">
                            <div class="flex items-center gap-3">
                              <div class="w-10 h-10 bg-gradient-to-r from-gs-gold-light to-gs-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-check text-gs-black"></i>
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-xs font-bold text-gs-navy uppercase tracking-wide">Surgery Preparation</span>
                                  <i class="fas fa-check-circle text-gs-green text-xs"></i>
                                </div>
                                <p class="text-xs text-gray-500">Completed - Oct 12</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Recovery Phase Card - Gold/Bronze Gradient */}
                          <div class="bg-gradient-to-r from-gs-gold-light via-gs-gold to-gs-bronze rounded-xl p-4 shadow-lg">
                            <div class="flex items-center gap-2 mb-3">
                              <i class="fas fa-shield-alt text-gs-black"></i>
                              <span class="text-xs font-bold text-gs-black uppercase tracking-wider">Recovery Phase: Post-Op Rehab</span>
                            </div>
                            <div class="flex items-center gap-4">
                              {/* Circular Progress */}
                              <div class="relative w-16 h-16 flex-shrink-0">
                                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="3"/>
                                  <circle cx="18" cy="18" r="15" fill="none" stroke="#0A0A0A" stroke-width="3" stroke-dasharray="70.65, 94.2" stroke-linecap="round"/>
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                  <span class="text-lg font-bold text-gs-black leading-none">75%</span>
                                  <span class="text-[8px] text-gs-black/70 uppercase">Complete</span>
                                </div>
                              </div>
                              {/* Linear Progress */}
                              <div class="flex-1">
                                <div class="relative h-2 bg-black/20 rounded-full overflow-hidden">
                                  <div class="absolute inset-y-0 left-0 w-3/4 bg-gs-black rounded-full"></div>
                                  <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gs-black rounded-full shadow"></div>
                                </div>
                                <div class="flex justify-between mt-1 text-[10px] text-gs-black/70 font-medium">
                                  <span>Start</span>
                                  <span>12 weeks</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Timeline Section */}
                          <div class="space-y-0">
                            {/* Week 1: Initial Assessment */}
                            <div class="flex gap-3">
                              <div class="flex flex-col items-center">
                                <div class="w-8 h-8 bg-gradient-to-r from-gs-gold-light to-gs-gold rounded-full flex items-center justify-center shadow-md">
                                  <i class="fas fa-clipboard-list text-gs-black text-xs"></i>
                                </div>
                                <div class="w-0.5 h-12 bg-gs-gold/50"></div>
                              </div>
                              <div class="flex-1 pb-2">
                                <div class="bg-white rounded-lg p-3 shadow-sm">
                                  <span class="text-[10px] font-bold text-gs-gold uppercase">Week 1:</span>
                                  <h4 class="text-xs font-bold text-gs-navy">INITIAL ASSESSMENT</h4>
                                  <p class="text-[10px] text-gray-500">Oct 15 - 21</p>
                                  <p class="text-[10px] text-gray-600 mt-1">Dr. L. Weber, Orthopedics</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Appointment: Cardiology */}
                            <div class="flex gap-3">
                              <div class="flex flex-col items-center">
                                <div class="w-0.5 h-2 bg-gs-gold/50"></div>
                                <div class="w-8 h-8 bg-gs-black rounded-full flex items-center justify-center shadow-md">
                                  <i class="fas fa-heart text-gs-gold text-xs"></i>
                                </div>
                                <div class="w-0.5 h-8 bg-gray-300"></div>
                              </div>
                              <div class="flex-1 pb-2 flex justify-end">
                                <div class="w-5/6 bg-gs-black rounded-lg p-3 shadow-md">
                                  <span class="text-[10px] font-medium text-gs-gold">APPOINTMENT:</span>
                                  <h4 class="text-xs font-bold text-white">CARDIOLOGY CONSULT</h4>
                                  <p class="text-[10px] text-white/70">Oct 22, 10:00 AM</p>
                                  <div class="flex items-center gap-2 mt-1">
                                    <div class="w-5 h-5 bg-gs-gold/20 rounded-full flex items-center justify-center">
                                      <i class="fas fa-user-md text-gs-gold text-[8px]"></i>
                                    </div>
                                    <div>
                                      <p class="text-[10px] text-white font-medium">Dr. K. Müller</p>
                                      <p class="text-[8px] text-white/50">Cardiologist</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Upcoming Label */}
                            <div class="flex gap-3">
                              <div class="flex flex-col items-center w-8">
                                <div class="w-0.5 h-4 bg-gray-300"></div>
                              </div>
                              <div class="pb-2">
                                <span class="text-[10px] font-bold text-gs-black border border-gs-black px-2 py-0.5 rounded-full">
                                  UPCOMING MILESTONES
                                </span>
                              </div>
                            </div>
                            
                            {/* Week 3: Mobility */}
                            <div class="flex gap-3">
                              <div class="flex flex-col items-center">
                                <div class="w-8 h-8 border-2 border-gs-gold/30 rounded-full flex items-center justify-center">
                                  <i class="fas fa-walking text-gs-gold/50 text-xs"></i>
                                </div>
                              </div>
                              <div class="flex-1">
                                <div class="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                                  <span class="text-[10px] font-bold text-gs-gold uppercase">Week 3:</span>
                                  <h4 class="text-xs font-bold text-gs-navy">MOBILITY TRAINING</h4>
                                  <p class="text-[10px] text-gray-500">Oct 29 - Nov 4</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Navigation */}
                        <div class="bg-white border-t border-gray-200 px-2 py-2">
                          <div class="flex justify-around items-center">
                            <div class="flex flex-col items-center">
                              <div class="w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-home text-gs-gold text-sm"></i>
                              </div>
                              <span class="text-[9px] text-gs-gold font-medium">Home</span>
                            </div>
                            <div class="flex flex-col items-center">
                              <div class="w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-clock text-gray-400 text-sm"></i>
                              </div>
                              <span class="text-[9px] text-gray-400">Timeline</span>
                            </div>
                            <div class="flex flex-col items-center">
                              <div class="w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-comments text-gray-400 text-sm"></i>
                              </div>
                              <span class="text-[9px] text-gray-400">Messages</span>
                            </div>
                            <div class="flex flex-col items-center">
                              <div class="w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-user-md text-gray-400 text-sm"></i>
                              </div>
                              <span class="text-[9px] text-gray-400">Care Team</span>
                            </div>
                            <div class="flex flex-col items-center">
                              <div class="w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-user text-gray-400 text-sm"></i>
                              </div>
                              <span class="text-[9px] text-gray-400">Profile</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements for visual appeal */}
                  <div class="absolute -right-12 top-20 bg-white rounded-xl p-3 shadow-lg animate-bounce" style="animation-duration: 3s;">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-gs-green/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-heart text-gs-green text-sm"></i>
                      </div>
                      <div>
                        <p class="text-xs font-bold text-gs-navy">72 BPM</p>
                        <p class="text-[10px] text-gray-500">Heart Rate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="absolute -left-16 bottom-32 bg-white rounded-xl p-3 shadow-lg animate-bounce" style="animation-duration: 4s; animation-delay: 1s;">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-gradient-to-r from-gs-gold-light to-gs-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-star text-gs-black text-sm"></i>
                      </div>
                      <div>
                        <p class="text-xs font-bold text-gs-navy">SelectScore™</p>
                        <p class="text-[10px] text-gs-gold font-bold">85 Excellent</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="absolute -right-8 bottom-16 bg-gs-black rounded-xl p-3 shadow-lg animate-bounce" style="animation-duration: 3.5s; animation-delay: 0.5s;">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-gs-gold/20 rounded-full flex items-center justify-center">
                        <i class="fas fa-video text-gs-gold text-sm"></i>
                      </div>
                      <div>
                        <p class="text-xs font-bold text-white">Dr. Weber</p>
                        <p class="text-[10px] text-gs-gold">Available Now</p>
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
              { icon: 'fa-user-md', title: 'German Trained', desc: 'Certified Surgeons', color: 'gs-gold' },
              { icon: 'fa-shield-alt', title: 'German Standards', desc: 'ISO & KTQ Quality', color: 'gs-teal' },
              { icon: 'fa-umbrella-beach', title: 'Red Sea Recovery', desc: 'Calm Environment', color: 'gs-bronze' }
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
            <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">Treatments We Provide</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">We work with German-trained specialists and carefully selected clinics in Egypt. You receive clear medical advice, transparent pricing and complete packages.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-weight', title: 'Bariatric Surgery', desc: 'Gastric sleeve and bypass with German protocols, careful pre-operative screening and structured nutritional follow-up.', color: 'gs-navy' },
              { icon: 'fa-bone', title: 'Orthopedic Surgery', desc: 'Knee, hip and spine procedures with modern techniques and European standards of hygiene and safety.', color: 'gs-teal' },
              { icon: 'fa-smile', title: 'Cosmetic Procedures', desc: 'Tummy tuck, breast surgery and mommy makeover with strong focus on safety and natural-looking results.', color: 'gs-gold' },
              { icon: 'fa-tooth', title: 'Dental Implants', desc: 'Implants, restorations and aesthetic dentistry. Combine dental care with a controlled recovery stay.', color: 'gs-blue' },
              { icon: 'fa-spa', title: 'Anti-Aging Treatments', desc: 'Non-surgical and minimally invasive treatments following European safety standards.', color: 'gs-purple' },
              { icon: 'fa-baby', title: 'Breast Augmentation', desc: 'European quality implants with careful planning. Privacy and discreet recovery are standard.', color: 'gs-red' }
            ].map((service) => (
              <div class="bg-white rounded-2xl p-6 shadow-gs hover:shadow-gs-lg transition-all hover:-translate-y-1">
                <div class={`w-12 h-12 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-4`}>
                  <i class={`fas ${service.icon} text-${service.color} text-xl`}></i>
                </div>
                <h3 class="font-semibold text-lg text-gs-navy mb-2">{service.title}</h3>
                <p class="text-gray-600 text-sm">{service.desc}</p>
                <a href="/login?register=1" class="inline-flex items-center gap-2 text-gs-gold font-medium text-sm mt-4 hover:text-gs-bronze transition-colors">
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
            <div class="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-gs-gold-light to-gs-bronze"></div>
            
            {[
              { step: 1, title: 'Online Assessment', desc: 'Share your medical history. A German-trained specialist reviews and advises you.', icon: 'fa-laptop-medical' },
              { step: 2, title: 'Planning & Travel', desc: 'We schedule your procedure, book your stay, and coordinate all transfers.', icon: 'fa-plane' },
              { step: 3, title: 'Surgery & Recovery', desc: 'Treatment in German-standard clinics with Red Sea recovery environment.', icon: 'fa-hospital' },
              { step: 4, title: 'Follow-up Care', desc: 'Telemedicine calls and long-term support through our digital platform.', icon: 'fa-mobile-alt' }
            ].map((item) => (
              <div class="text-center relative">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-gs-gold-light/20 to-gs-bronze/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                  <div class="w-24 h-24 rounded-full bg-gradient-to-r from-gs-gold-light to-gs-gold flex items-center justify-center">
                    <i class={`fas ${item.icon} text-gs-black text-3xl`}></i>
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-gs-black text-gs-gold rounded-full flex items-center justify-center font-bold text-sm">
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
      
      {/* Why Choose German Select */}
      <section class="py-20 bg-gs-black text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span class="text-gs-silver">German</span> <span class="bg-gradient-to-r from-gs-gold-light to-gs-gold bg-clip-text text-transparent">Select</span>?
            </h2>
            <p class="text-white/70 max-w-2xl mx-auto">A healthcare experience that combines German expertise, cutting-edge technology, and a serene recovery environment.</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-user-md', title: 'German-Trained Specialists', desc: 'Surgeons who trained and worked in Germany following strict European guidelines', color: 'gs-gold' },
              { icon: 'fa-certificate', title: 'German Standards', desc: 'ISO-based quality systems and KTQ-style procedures with clear protocols', color: 'gs-silver' },
              { icon: 'fa-box', title: 'Complete Packages', desc: 'Surgery, accommodation, transfers and follow-up in one coherent package', color: 'gs-bronze' },
              { icon: 'fa-tag', title: 'Higher Value', desc: 'Treatment costs significantly less while receiving care under German methods', color: 'gs-green' },
              { icon: 'fa-umbrella-beach', title: 'Red Sea Recovery', desc: 'Calm, low-pollution environment near the sea with controlled light activity', color: 'gs-blue' },
              { icon: 'fa-language', title: 'Clear Communication', desc: 'Team speaks German, English and Arabic - you always know what to expect', color: 'gs-purple' }
            ].map((feature) => (
              <div class="bg-white/5 backdrop-blur rounded-xl p-6 hover:bg-white/10 transition-colors border border-white/10">
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
      
      {/* CareSelect™ Journeys - RENAMED MARKETPLACE */}
      <section id="careselect" class="py-20 bg-gs-cream">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-gs-gold/20 text-gs-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i class="fas fa-gem"></i>
              <span>CareSelect™ Journeys</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gs-navy mb-4">Complete Healthcare Packages</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Combine medical procedures with 5-star accommodations and Red Sea wellness experiences</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'Essential Journey', price: '€6,500', features: ['German-certified surgeon', 'Hospital stay (3-5 days)', 'Basic accommodation', 'Airport transfers', 'Digital follow-up via app'], icon: 'fa-star', color: 'gs-navy' },
              { tier: 'Premium Journey', price: '€12,000', features: ['All Essential features', '5-star resort recovery', 'Personal care coordinator', 'Family accommodation', 'Wellness treatments included'], icon: 'fa-crown', color: 'gs-gold', featured: true },
              { tier: 'Crown Journey', price: '€22,000', features: ['All Premium features', 'Private villa with chef', '24/7 medical supervision', 'Yacht excursions', 'VIP spa & concierge'], icon: 'fa-gem', color: 'gs-purple' }
            ].map((pkg) => (
              <div class={`rounded-2xl p-6 ${pkg.featured ? 'bg-gs-black text-white ring-4 ring-gs-gold' : 'bg-white'} shadow-gs-lg relative`}>
                {pkg.featured && (
                  <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div class={`w-12 h-12 rounded-xl ${pkg.featured ? 'bg-gradient-to-r from-gs-gold-light to-gs-gold' : `bg-${pkg.color}/10`} flex items-center justify-center mb-4`}>
                  <i class={`fas ${pkg.icon} ${pkg.featured ? 'text-gs-black' : `text-${pkg.color}`} text-xl`}></i>
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
                <a href="/login?register=1" class={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${pkg.featured ? 'bg-gradient-to-r from-gs-gold-light to-gs-gold text-gs-black hover:from-gs-gold hover:to-gs-bronze' : 'bg-gs-black text-white hover:bg-gs-navy'}`}>
                  Select Journey
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-gs-gold-light to-gs-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-quote-left text-gs-black text-2xl"></i>
            </div>
            <blockquote class="text-xl md:text-2xl text-gs-navy italic mb-6">
              "I felt safe from the first video call. The surgeon explained every step, and the team met me at the airport. Ten days later I went home lighter, both in weight and in worry."
            </blockquote>
            <div class="flex items-center justify-center gap-3">
              <div class="w-12 h-12 bg-gs-cream rounded-full flex items-center justify-center">
                <i class="fas fa-user text-gs-gold"></i>
              </div>
              <div class="text-left">
                <p class="font-semibold text-gs-navy">Maria</p>
                <p class="text-sm text-gray-500">Gastric sleeve patient from Spain</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-gs-gold-light via-gs-gold to-gs-bronze">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gs-black mb-4">Start Your German Quality Treatment</h2>
          <p class="text-gs-black/80 max-w-2xl mx-auto mb-8">If you want German quality care with a calm recovery by the Red Sea, German Select is ready to guide you. Share your situation, receive honest advice, then decide at your own pace.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/login?register=1" class="px-8 py-4 bg-gs-black text-white font-semibold rounded-lg hover:bg-gs-navy transition-colors flex items-center gap-2">
              <span>Create Free Account</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#" class="px-8 py-4 bg-white text-gs-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i class="fas fa-phone"></i>
              <span>Talk to Us</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer class="bg-gs-black text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              {/* German Select Logo */}
              <div class="flex items-center gap-3 mb-4">
                <div class="flex flex-col items-start leading-none">
                  <span class="text-sm font-bold tracking-[0.3em] text-gs-silver uppercase">GERMAN</span>
                  <span class="text-lg font-playfair font-semibold bg-gradient-to-r from-gs-gold-light to-gs-gold bg-clip-text text-transparent">Select</span>
                </div>
              </div>
              <p class="text-white/60 text-sm">Excellence in Medical Care, Luxury in Healing. German-trained surgeons, Red Sea recovery.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-4 text-gs-gold">Treatments</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><a href="#" class="hover:text-white transition-colors">Bariatric Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Orthopedic Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Cosmetic Procedures</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Anti-Aging Treatments</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4 text-gs-gold">Platform</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><a href="/patient/telemedicine" class="hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="/patient/rpm" class="hover:text-white transition-colors">Remote Monitoring</a></li>
                <li><a href="/patient/ai-diagnostics" class="hover:text-white transition-colors">AI Diagnostics</a></li>
                <li><a href="/patient/marketplace" class="hover:text-white transition-colors">CareSelect™ Journeys</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4 text-gs-gold">Contact</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li><i class="fas fa-envelope mr-2 text-gs-gold"></i>info@germanselect.org</li>
                <li><i class="fas fa-globe mr-2 text-gs-gold"></i>www.germanselect.org</li>
              </ul>
              <div class="flex gap-4 mt-4">
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gs-gold/20 transition-colors">
                  <i class="fab fa-facebook-f text-gs-gold"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gs-gold/20 transition-colors">
                  <i class="fab fa-instagram text-gs-gold"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gs-gold/20 transition-colors">
                  <i class="fab fa-linkedin-in text-gs-gold"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>© 2024 German Select. All rights reserved. | GDPR Compliant | ISO Quality Partners</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
