import { Context } from 'hono'

export const landingPage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-slate-50">
      {/* ========== NAVIGATION ========== */}
      <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav class="glass-dark border-b border-white/5">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <a href="/" class="flex items-center gap-3 group">
                <div class="relative">
                  <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 flex items-center justify-center shadow-glow-brand group-hover:scale-105 transition-transform">
                    <span class="text-white font-bold text-lg lg:text-xl">S</span>
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-navy-900"></div>
                </div>
                <div class="hidden sm:block">
                  <div class="text-white font-semibold text-lg tracking-tight">SelectCare</div>
                  <div class="text-brand-400 text-xs font-medium tracking-wider uppercase">Operating System</div>
                </div>
              </a>
              
              {/* Desktop Navigation */}
              <div class="hidden lg:flex items-center gap-1">
                <a href="#features" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">Features</a>
                <a href="#how-it-works" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">How It Works</a>
                <a href="#journeys" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">Care Journeys</a>
                <a href="#doctors" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">Our Doctors</a>
              </div>
              
              {/* Auth Buttons */}
              <div class="flex items-center gap-3">
                <a href="/login" class="hidden sm:flex px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Sign In
                </a>
                <a href="/login?register=1" class="px-4 py-2.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-sm font-semibold rounded-xl hover:shadow-glow-brand transition-all btn-press">
                  Get Started
                </a>
                {/* Mobile menu button */}
                <button class="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5">
                  <i class="fas fa-bars text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section class="relative min-h-screen bg-navy-900 overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 bg-mesh-dark"></div>
        <div class="absolute inset-0 bg-mesh-gold opacity-50"></div>
        <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
        
        {/* Grid Pattern Overlay */}
        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div class="animate-fade-in">
              {/* Badge */}
              <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-brand-500/30 backdrop-blur-sm mb-8">
                <div class="flex items-center -space-x-1">
                  <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse" style="animation-delay: 0.2s;"></span>
                </div>
                <span class="text-sm font-medium text-brand-300">German Medical Excellence</span>
                <i class="fas fa-certificate text-brand-400 text-xs"></i>
              </div>
              
              {/* Headline */}
              <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                <span class="text-white">Your Health,</span><br/>
                <span class="text-gradient-gold">Reimagined</span><br/>
                <span class="text-slate-400 text-3xl sm:text-4xl lg:text-5xl font-medium">with SelectCare OS</span>
              </h1>
              
              {/* Description */}
              <p class="text-lg lg:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
                Experience German-standard medical care in Egypt's serene Red Sea environment. 
                Our digital platform connects you with world-class surgeons for a complete healing journey.
              </p>
              
              {/* CTA Buttons */}
              <div class="flex flex-wrap gap-4 mb-12">
                <a href="/login?register=1" class="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 font-semibold rounded-2xl hover:shadow-glow-brand transition-all btn-press">
                  <span>Start Your Journey</span>
                  <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="#how-it-works" class="inline-flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl hover:bg-white/10 transition-all">
                  <i class="fas fa-play-circle text-brand-400"></i>
                  <span>See How It Works</span>
                </a>
              </div>
              
              {/* Trust Stats */}
              <div class="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div class="text-3xl lg:text-4xl font-bold text-gradient-gold mb-1">60%</div>
                  <div class="text-sm text-slate-500">Cost Savings</div>
                </div>
                <div>
                  <div class="text-3xl lg:text-4xl font-bold text-gradient-gold mb-1">98%</div>
                  <div class="text-sm text-slate-500">Satisfaction Rate</div>
                </div>
                <div>
                  <div class="text-3xl lg:text-4xl font-bold text-gradient-gold mb-1">500+</div>
                  <div class="text-sm text-slate-500">Procedures/Year</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Premium App Preview */}
            <div class="relative lg:pl-8 animate-slide-up" style="animation-delay: 0.3s;">
              {/* Glow Effects */}
              <div class="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-teal-500/20 rounded-[3rem] blur-3xl opacity-50"></div>
              
              {/* Phone Mockup */}
              <div class="relative mx-auto max-w-[320px] lg:max-w-[380px]">
                {/* Phone Frame */}
                <div class="bg-navy-800 rounded-[2.5rem] p-3 shadow-2xl ring-1 ring-white/10">
                  <div class="bg-navy-950 rounded-[2rem] p-[2px]">
                    <div class="bg-slate-50 rounded-[1.9rem] overflow-hidden">
                      {/* Status Bar */}
                      <div class="h-7 bg-navy-900 flex items-center justify-center">
                        <div class="w-20 h-5 bg-black rounded-b-2xl"></div>
                      </div>
                      
                      {/* App Header */}
                      <div class="bg-navy-900 px-4 py-3">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                              <span class="text-navy-900 font-bold text-sm">S</span>
                            </div>
                            <div>
                              <div class="text-white font-semibold text-sm">SelectCare</div>
                              <div class="text-brand-400 text-[10px]">OS</div>
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <i class="fas fa-bell text-brand-400 text-xs"></i>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                              <span class="text-navy-900 font-semibold text-xs">M</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div class="p-4 space-y-4 h-[400px] overflow-hidden bg-slate-50">
                        {/* Welcome Card */}
                        <div class="bg-white rounded-2xl p-4 shadow-card">
                          <div class="flex items-center gap-3 mb-3">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                              <i class="fas fa-hand-wave text-white text-lg"></i>
                            </div>
                            <div>
                              <p class="text-slate-400 text-xs">Good morning</p>
                              <p class="text-navy-900 font-semibold">Max Mustermann</p>
                            </div>
                          </div>
                          <div class="flex items-center justify-between text-xs">
                            <span class="text-slate-500">Recovery Day 12</span>
                            <span class="text-teal-600 font-medium flex items-center gap-1">
                              <i class="fas fa-trending-up"></i> On track
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress Card */}
                        <div class="bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 rounded-2xl p-4 text-navy-900">
                          <div class="flex items-center gap-2 mb-3">
                            <i class="fas fa-chart-line text-sm"></i>
                            <span class="font-semibold text-sm">Recovery Progress</span>
                          </div>
                          <div class="flex items-center gap-4">
                            <div class="relative w-16 h-16">
                              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="3"/>
                                <circle cx="18" cy="18" r="15" fill="none" stroke="#0A1628" stroke-width="3" stroke-dasharray="70.65, 94.2" stroke-linecap="round"/>
                              </svg>
                              <div class="absolute inset-0 flex items-center justify-center">
                                <span class="font-bold text-lg">75%</span>
                              </div>
                            </div>
                            <div class="flex-1">
                              <div class="text-xs font-medium mb-1">Post-Op Rehabilitation</div>
                              <div class="h-2 bg-navy-900/20 rounded-full overflow-hidden">
                                <div class="h-full w-3/4 bg-navy-900 rounded-full"></div>
                              </div>
                              <div class="text-[10px] mt-1 opacity-80">Week 3 of 4</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Upcoming */}
                        <div class="bg-white rounded-2xl p-4 shadow-card">
                          <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-navy-900">Next Appointment</span>
                            <span class="text-xs text-brand-600 font-medium">Today</span>
                          </div>
                          <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center">
                              <i class="fas fa-video text-navy-600"></i>
                            </div>
                            <div class="flex-1">
                              <p class="text-sm font-medium text-navy-900">Telemedicine Follow-up</p>
                              <p class="text-xs text-slate-500">Dr. L. Weber • 2:00 PM</p>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                              <i class="fas fa-play text-white text-xs"></i>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div class="grid grid-cols-4 gap-2">
                          {[
                            { icon: 'fa-heartbeat', label: 'Vitals', color: 'text-danger-500 bg-danger-50' },
                            { icon: 'fa-pills', label: 'Meds', color: 'text-teal-500 bg-teal-50' },
                            { icon: 'fa-comments', label: 'Chat', color: 'text-info-500 bg-info-50' },
                            { icon: 'fa-calendar', label: 'Book', color: 'text-brand-500 bg-brand-50' },
                          ].map((item) => (
                            <div class={`flex flex-col items-center gap-1 p-2 rounded-xl ${item.color.split(' ')[1]}`}>
                              <i class={`fas ${item.icon} text-sm ${item.color.split(' ')[0]}`}></i>
                              <span class="text-[10px] font-medium text-navy-700">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bottom Nav */}
                      <div class="bg-white border-t border-slate-100 px-6 py-3">
                        <div class="flex justify-between items-center">
                          <div class="flex flex-col items-center gap-0.5">
                            <i class="fas fa-home text-brand-500 text-sm"></i>
                            <span class="text-[10px] font-medium text-brand-500">Home</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5">
                            <i class="fas fa-chart-simple text-slate-400 text-sm"></i>
                            <span class="text-[10px] font-medium text-slate-400">Progress</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5">
                            <i class="fas fa-user-md text-slate-400 text-sm"></i>
                            <span class="text-[10px] font-medium text-slate-400">Team</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5">
                            <i class="fas fa-user text-slate-400 text-sm"></i>
                            <span class="text-[10px] font-medium text-slate-400">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div class="absolute -right-8 top-24 bg-white rounded-xl p-3 shadow-soft-lg animate-float hidden lg:block">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                      <i class="fas fa-heart text-success-500 text-sm"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-navy-900">72 BPM</p>
                      <p class="text-[10px] text-slate-500">Heart Rate</p>
                    </div>
                  </div>
                </div>
                
                <div class="absolute -left-6 top-1/2 bg-navy-900 rounded-xl p-3 shadow-soft-lg animate-float hidden lg:block" style="animation-delay: 1s;">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                      <i class="fas fa-star text-brand-400 text-sm"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-white">SelectScore™</p>
                      <p class="text-brand-400 text-xs font-semibold">85 Excellent</p>
                    </div>
                  </div>
                </div>
                
                <div class="absolute -right-4 bottom-24 bg-teal-500 rounded-xl p-3 shadow-soft-lg animate-float hidden lg:block" style="animation-delay: 2s;">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <i class="fas fa-video text-white text-sm"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-white">Dr. Weber</p>
                      <p class="text-teal-100 text-xs">Available Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span class="text-xs font-medium">Scroll to explore</span>
          <div class="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
            <div class="w-1.5 h-2.5 bg-brand-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES STRIP ========== */}
      <section class="py-8 bg-white border-y border-slate-100">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-wrap justify-center gap-8 lg:gap-16">
            {[
              { icon: 'fa-video', label: 'Telemedicine', desc: 'Virtual consultations' },
              { icon: 'fa-user-md', label: 'German Trained', desc: 'Certified surgeons' },
              { icon: 'fa-shield-check', label: 'ISO Standards', desc: 'Quality assured' },
              { icon: 'fa-umbrella-beach', label: 'Red Sea Recovery', desc: 'Healing environment' },
            ].map((item) => (
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-brand-600 text-lg`}></i>
                </div>
                <div>
                  <p class="font-semibold text-navy-900">{item.label}</p>
                  <p class="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section id="features" class="py-20 lg:py-28 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
              <i class="fas fa-stethoscope"></i>
              <span>Medical Excellence</span>
            </div>
            <h2 class="text-3xl lg:text-5xl font-bold text-navy-900 mb-4">
              Treatments We <span class="text-gradient-teal">Provide</span>
            </h2>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
              German-trained specialists deliver world-class medical care with complete packages including surgery, recovery, and follow-up.
            </p>
          </div>
          
          {/* Services Grid */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: 'fa-weight-scale', title: 'Bariatric Surgery', desc: 'Gastric sleeve and bypass with German protocols, careful pre-operative screening and structured nutritional follow-up.', color: 'from-brand-400 to-brand-600', bg: 'brand' },
              { icon: 'fa-bone', title: 'Orthopedic Surgery', desc: 'Knee, hip and spine procedures with modern techniques and European standards of hygiene and safety.', color: 'from-teal-400 to-teal-600', bg: 'teal' },
              { icon: 'fa-face-smile', title: 'Cosmetic Procedures', desc: 'Tummy tuck, breast surgery and mommy makeover with strong focus on safety and natural-looking results.', color: 'from-info-400 to-info-600', bg: 'info' },
              { icon: 'fa-tooth', title: 'Dental Implants', desc: 'Implants, restorations and aesthetic dentistry. Combine dental care with a controlled recovery stay.', color: 'from-success-400 to-success-600', bg: 'success' },
              { icon: 'fa-spa', title: 'Anti-Aging Treatments', desc: 'Non-surgical and minimally invasive treatments following European safety standards.', color: 'from-warning-400 to-warning-600', bg: 'warning' },
              { icon: 'fa-heart-pulse', title: 'Cardiology', desc: 'Comprehensive cardiac care with advanced diagnostics and treatment protocols from German specialists.', color: 'from-danger-400 to-danger-600', bg: 'danger' },
            ].map((service) => (
              <div class="group bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all card-lift border border-slate-100">
                <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <i class={`fas ${service.icon} text-white text-xl`}></i>
                </div>
                <h3 class="text-xl font-semibold text-navy-900 mb-3">{service.title}</h3>
                <p class="text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                <a href="/login?register=1" class="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <i class="fas fa-arrow-right text-xs"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" class="py-20 lg:py-28 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-4">
              <i class="fas fa-route"></i>
              <span>Your Journey</span>
            </div>
            <h2 class="text-3xl lg:text-5xl font-bold text-navy-900 mb-4">
              How It <span class="text-gradient-gold">Works</span>
            </h2>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
              From initial consultation to complete recovery - we guide you through every step
            </p>
          </div>
          
          {/* Steps */}
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, icon: 'fa-laptop-medical', title: 'Virtual Assessment', desc: 'Share your medical history online. A German-trained specialist reviews your case and provides expert advice.' },
              { step: 2, icon: 'fa-plane-departure', title: 'Planning & Travel', desc: 'We schedule your procedure, book premium accommodation, and coordinate all airport transfers.' },
              { step: 3, icon: 'fa-hospital', title: 'Surgery & Care', desc: 'Treatment in German-standard clinics with 24/7 medical supervision and world-class facilities.' },
              { step: 4, icon: 'fa-mobile-screen-button', title: 'Digital Follow-up', desc: 'Telemedicine calls, health monitoring and long-term support through our SelectCare OS platform.' },
            ].map((item, index) => (
              <div class="relative">
                {/* Connector line */}
                {index < 3 && (
                  <div class="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-brand-300 to-brand-100 z-0"></div>
                )}
                
                <div class="relative text-center">
                  {/* Step circle */}
                  <div class="relative inline-flex mb-6">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                      <div class="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-brand">
                        <i class={`fas ${item.icon} text-white text-3xl`}></i>
                      </div>
                    </div>
                    <div class="absolute -top-2 -right-2 w-10 h-10 bg-navy-900 text-brand-400 rounded-full flex items-center justify-center font-bold text-lg shadow-soft-lg">
                      {item.step}
                    </div>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-navy-900 mb-3">{item.title}</h3>
                  <p class="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section class="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        {/* Background */}
        <div class="absolute inset-0 bg-mesh-dark"></div>
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-500/5 to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
                <i class="fas fa-award"></i>
                <span>Why SelectCare OS</span>
              </div>
              <h2 class="text-3xl lg:text-5xl font-bold mb-6">
                German Quality,<br/>
                <span class="text-gradient-gold">Exceptional Value</span>
              </h2>
              <p class="text-lg text-slate-400 mb-8">
                We combine German medical excellence with Egypt's world-renowned hospitality and healing environment, delivering premium healthcare at a fraction of European costs.
              </p>
              
              <div class="space-y-4">
                {[
                  { icon: 'fa-user-doctor', title: 'German-Trained Specialists', desc: 'Surgeons who trained and worked in Germany following strict European guidelines' },
                  { icon: 'fa-certificate', title: 'ISO Quality Standards', desc: 'KTQ-style procedures with clear protocols and comprehensive documentation' },
                  { icon: 'fa-hand-holding-medical', title: 'Complete Care Packages', desc: 'Surgery, accommodation, transfers and follow-up in one coherent package' },
                ].map((item) => (
                  <div class="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                      <i class={`fas ${item.icon} text-brand-400 text-lg`}></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-white mb-1">{item.title}</h4>
                      <p class="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Stats */}
            <div class="grid grid-cols-2 gap-4 lg:gap-6">
              {[
                { value: '60%', label: 'Cost Savings', sublabel: 'vs European prices', icon: 'fa-tag' },
                { value: '100%', label: 'German Standards', sublabel: 'ISO certified', icon: 'fa-shield-check' },
                { value: '98%', label: 'Satisfaction', sublabel: 'Patient rating', icon: 'fa-heart' },
                { value: '24/7', label: 'Support', sublabel: 'Always available', icon: 'fa-headset' },
              ].map((stat) => (
                <div class="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-colors group">
                  <div class="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i class={`fas ${stat.icon} text-brand-400 text-lg`}></i>
                  </div>
                  <div class="text-3xl lg:text-4xl font-bold text-gradient-gold mb-2">{stat.value}</div>
                  <div class="font-medium text-white">{stat.label}</div>
                  <div class="text-sm text-slate-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CARE JOURNEYS ========== */}
      <section id="journeys" class="py-20 lg:py-28 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-4">
              <i class="fas fa-gem"></i>
              <span>CareSelect™ Journeys</span>
            </div>
            <h2 class="text-3xl lg:text-5xl font-bold text-navy-900 mb-4">
              Complete Healthcare <span class="text-gradient-gold">Packages</span>
            </h2>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
              Combine world-class medical care with 5-star accommodations and Red Sea wellness experiences
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Essential */}
            <div class="bg-white rounded-3xl p-8 shadow-card border border-slate-100 hover:shadow-card-hover transition-all">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center">
                  <i class="fas fa-star text-navy-600 text-lg"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-navy-900">Essential Journey</h3>
                  <p class="text-sm text-slate-500">Quality care basics</p>
                </div>
              </div>
              <div class="mb-6">
                <span class="text-4xl font-bold text-navy-900">€6,500</span>
                <span class="text-slate-500 ml-2">starting</span>
              </div>
              <ul class="space-y-3 mb-8">
                {['German-certified surgeon', 'Hospital stay (3-5 days)', 'Standard accommodation', 'Airport transfers', 'Digital follow-up via app'].map((feature) => (
                  <li class="flex items-center gap-3 text-sm">
                    <i class="fas fa-check text-teal-500"></i>
                    <span class="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/login?register=1" class="block w-full py-3 text-center bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold rounded-xl transition-colors">
                Choose Essential
              </a>
            </div>
            
            {/* Premium - Featured */}
            <div class="relative bg-navy-900 rounded-3xl p-8 shadow-soft-xl border border-brand-500/20 hover:border-brand-500/40 transition-all lg:-mt-4 lg:mb-4">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <div class="flex items-center gap-3 mb-6 mt-2">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <i class="fas fa-crown text-navy-900 text-lg"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-white">Premium Journey</h3>
                  <p class="text-sm text-slate-400">Complete experience</p>
                </div>
              </div>
              <div class="mb-6">
                <span class="text-4xl font-bold text-white">€12,000</span>
                <span class="text-slate-400 ml-2">starting</span>
              </div>
              <ul class="space-y-3 mb-8">
                {['Everything in Essential', '5-star resort recovery', 'Personal care coordinator', 'Family accommodation option', 'Wellness treatments included', 'Priority booking & support'].map((feature) => (
                  <li class="flex items-center gap-3 text-sm">
                    <i class="fas fa-check text-brand-400"></i>
                    <span class="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/login?register=1" class="block w-full py-3 text-center bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 font-semibold rounded-xl hover:shadow-glow-brand transition-all">
                Choose Premium
              </a>
            </div>
            
            {/* Crown */}
            <div class="bg-white rounded-3xl p-8 shadow-card border border-slate-100 hover:shadow-card-hover transition-all">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <i class="fas fa-gem text-white text-lg"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-navy-900">Crown Journey</h3>
                  <p class="text-sm text-slate-500">Ultimate luxury</p>
                </div>
              </div>
              <div class="mb-6">
                <span class="text-4xl font-bold text-navy-900">€22,000</span>
                <span class="text-slate-500 ml-2">starting</span>
              </div>
              <ul class="space-y-3 mb-8">
                {['Everything in Premium', 'Private villa with chef', '24/7 medical supervision', 'Yacht excursions', 'VIP spa & concierge', 'Lifetime follow-up care'].map((feature) => (
                  <li class="flex items-center gap-3 text-sm">
                    <i class="fas fa-check text-purple-500"></i>
                    <span class="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/login?register=1" class="block w-full py-3 text-center bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold rounded-xl transition-colors">
                Choose Crown
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIAL ========== */}
      <section class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-8">
            <i class="fas fa-quote-left text-navy-900 text-2xl"></i>
          </div>
          <blockquote class="text-2xl lg:text-3xl text-navy-900 font-medium leading-relaxed mb-8">
            "From the first video call, I knew I was in good hands. The surgeon explained every detail, the team met me at the airport, and ten days later I went home feeling lighter - both in weight and in worry."
          </blockquote>
          <div class="flex items-center justify-center gap-4">
            <div class="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center">
              <span class="text-brand-600 font-semibold text-lg">M</span>
            </div>
            <div class="text-left">
              <p class="font-semibold text-navy-900">Maria S.</p>
              <p class="text-sm text-slate-500">Gastric Sleeve Patient • Spain</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section class="py-20 lg:py-28 bg-gradient-to-r from-brand-500 via-brand-500 to-brand-600 relative overflow-hidden">
        {/* Background pattern */}
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
        
        <div class="relative max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl lg:text-5xl font-bold text-navy-900 mb-6">
            Ready to Start Your<br/>Health Journey?
          </h2>
          <p class="text-lg text-navy-900/80 mb-10 max-w-2xl mx-auto">
            Take the first step towards German-quality healthcare with Red Sea recovery. 
            Share your situation, receive honest advice, and decide at your own pace.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/login?register=1" class="inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all shadow-soft-lg">
              <span>Create Free Account</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#" class="inline-flex items-center gap-3 px-8 py-4 bg-white text-navy-900 font-semibold rounded-xl hover:bg-slate-50 transition-all">
              <i class="fas fa-phone"></i>
              <span>Schedule a Call</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer class="bg-navy-950 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <span class="text-navy-900 font-bold text-lg">S</span>
                </div>
                <div>
                  <div class="font-semibold">SelectCare</div>
                  <div class="text-brand-400 text-xs font-medium">Operating System</div>
                </div>
              </div>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">
                German medical excellence with Red Sea recovery. Premium healthcare at exceptional value.
              </p>
              <div class="flex gap-3">
                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                  <i class="fab fa-facebook-f text-brand-400"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                  <i class="fab fa-instagram text-brand-400"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                  <i class="fab fa-linkedin-in text-brand-400"></i>
                </a>
              </div>
            </div>
            
            {/* Treatments */}
            <div>
              <h4 class="font-semibold mb-4 text-brand-400">Treatments</h4>
              <ul class="space-y-3 text-sm text-slate-400">
                <li><a href="#" class="hover:text-white transition-colors">Bariatric Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Orthopedic Surgery</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Cosmetic Procedures</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Dental Implants</a></li>
              </ul>
            </div>
            
            {/* Platform */}
            <div>
              <h4 class="font-semibold mb-4 text-brand-400">Platform</h4>
              <ul class="space-y-3 text-sm text-slate-400">
                <li><a href="/patient" class="hover:text-white transition-colors">Patient Dashboard</a></li>
                <li><a href="/patient/telemedicine" class="hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="/patient/rpm" class="hover:text-white transition-colors">Health Monitoring</a></li>
                <li><a href="/patient/ai-diagnostics" class="hover:text-white transition-colors">AI Diagnostics</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 class="font-semibold mb-4 text-brand-400">Contact</h4>
              <ul class="space-y-3 text-sm text-slate-400">
                <li class="flex items-center gap-2">
                  <i class="fas fa-envelope text-brand-500 w-4"></i>
                  <span>info@selectcare.health</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-globe text-brand-500 w-4"></i>
                  <span>www.selectcare.health</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-phone text-brand-500 w-4"></i>
                  <span>+49 123 456 7890</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-slate-500">
              © 2024 SelectCare OS. All rights reserved.
            </p>
            <div class="flex items-center gap-6 text-sm text-slate-500">
              <span class="flex items-center gap-2">
                <i class="fas fa-shield-check text-teal-500"></i>
                HIPAA Compliant
              </span>
              <span class="flex items-center gap-2">
                <i class="fas fa-certificate text-brand-500"></i>
                ISO Certified
              </span>
              <span class="flex items-center gap-2">
                <i class="fas fa-lock text-success-500"></i>
                GDPR Ready
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
