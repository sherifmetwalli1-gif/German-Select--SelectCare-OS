import { Context } from 'hono'
import { Header, BottomNav, PageWrapper, Card, ProgressCircle, QuickAction, DoctorCard, AppointmentCard, StatusBadge, SectionHeader, VitalCard } from '../components/layout'

export const patientDashboard = (c: Context) => {
  return c.render(
    <PageWrapper active="home">
      <Header />
      
      <main class="px-4 py-4 space-y-6">
        {/* Premium Welcome Hero Card */}
        <div class="glass-gold rounded-3xl p-6 shadow-soft-lg border border-brand-200/50 card-luxury relative overflow-hidden animate-fade-in">
          {/* Animated Background Particles */}
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/15 rounded-full blur-2xl animate-pulse-slow" style="animation-delay: 1s;"></div>
          </div>
          
          <div class="relative flex items-start justify-between gap-4">
            {/* Left: Patient Info */}
            <div class="flex items-center gap-4 flex-1">
              {/* Premium Avatar with Verification */}
              <div class="relative group">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 flex items-center justify-center text-navy-900 text-2xl font-extrabold shadow-glow-brand group-hover:scale-105 transition-transform">
                  MM
                </div>
                <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-soft border-2 border-white">
                  <i class="fas fa-badge-check text-white text-xs"></i>
                </div>
                {/* Online Status Indicator */}
                <div class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <div class="flex-1">
                {/* Dynamic Greeting */}
                <p class="text-sm text-slate-600 font-medium mb-1 flex items-center gap-2">
                  <i class="fas fa-sun text-amber-500 animate-pulse"></i>
                  <span>Good morning</span>
                </p>
                <h1 class="text-3xl font-extrabold text-navy-900 mb-2 tracking-tight">Max Mustermann</h1>
                <p class="text-xs text-slate-600 leading-relaxed">Welcome back! Your recovery is progressing excellently.</p>
                
                {/* Achievement Badges */}
                <div class="flex items-center gap-2 mt-3 flex-wrap">
                  <div class="group relative">
                    <div class="px-3 py-1.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer">
                      <i class="fas fa-fire text-sm"></i>
                      <span>12 Day Streak</span>
                    </div>
                    {/* Tooltip */}
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div class="glass-dark rounded-xl px-3 py-2 text-[10px] text-white whitespace-nowrap shadow-soft-lg">
                        Keep it up! 🔥
                        <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900/80 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="group relative">
                    <div class="px-3 py-1.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer">
                      <i class="fas fa-trophy text-sm"></i>
                      <span>Milestone</span>
                    </div>
                    {/* Tooltip */}
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div class="glass-dark rounded-xl px-3 py-2 text-[10px] text-white whitespace-nowrap shadow-soft-lg">
                        Week 2 Complete! 🏆
                        <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900/80 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="group relative">
                    <div class="px-3 py-1.5 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer">
                      <i class="fas fa-star text-sm"></i>
                      <span>Top 15%</span>
                    </div>
                    {/* Tooltip */}
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div class="glass-dark rounded-xl px-3 py-2 text-[10px] text-white whitespace-nowrap shadow-soft-lg">
                        Top performer! ⭐
                        <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900/80 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Recovery Status */}
            <div class="flex flex-col items-end gap-2">
              <div class="px-4 py-2 glass-dark rounded-2xl text-xs font-bold flex items-center gap-2 shadow-soft">
                <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span class="text-white">Recovery Day 12</span>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-500 mb-0.5">Next Milestone</p>
                <p class="text-sm font-bold text-navy-900">Week 3 Complete</p>
                <p class="text-[10px] text-teal-600 flex items-center gap-1 justify-end mt-1">
                  <i class="fas fa-clock"></i>
                  <span>5 days remaining</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recovery Progress - Hero Card */}
        <Card variant="gold" padding="large">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-chart-line"></i>
            <h3 class="font-bold uppercase tracking-wide text-sm">Recovery Progress</h3>
            <StatusBadge status="success" text="On Track" size="small" />
          </div>
          
          <div class="flex items-center gap-6">
            <ProgressCircle percent={75} size={90} color="teal" labelSize="default" />
            
            <div class="flex-1">
              <h4 class="font-semibold mb-2">Post-Op Rehabilitation</h4>
              <div class="relative h-2.5 bg-navy-900/20 rounded-full overflow-hidden">
                <div class="absolute inset-y-0 left-0 w-3/4 bg-navy-900 rounded-full transition-all duration-700"></div>
              </div>
              <div class="flex justify-between mt-2 text-xs opacity-70">
                <span>Week 3 of 4</span>
                <span>9 days left</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-navy-900/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fas fa-calendar-check"></i>
              <span class="text-sm font-medium">Next: Mobility Training</span>
            </div>
            <span class="text-xs bg-navy-900 text-white px-3 py-1 rounded-full font-semibold">Oct 29</span>
          </div>
        </Card>

        {/* SelectScore Card */}
        <div class="bg-navy-900 rounded-2xl p-5 shadow-soft-lg relative overflow-hidden">
          {/* Background glow */}
          <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
          
          <div class="relative flex items-center gap-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-brand">
                <div class="text-center">
                  <span class="text-3xl font-bold text-navy-900">85</span>
                </div>
              </div>
              <div class="absolute -top-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center border-2 border-navy-900">
                <i class="fas fa-arrow-up text-white text-xs"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-white">SelectScore™</h4>
                <span class="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded-full font-semibold">Excellent</span>
              </div>
              <p class="text-sm text-slate-400 mb-2">Your recovery readiness based on vitals, adherence, and progress.</p>
              <div class="flex items-center gap-4 text-xs">
                <span class="text-teal-400 flex items-center gap-1">
                  <i class="fas fa-arrow-up"></i> +5 from last week
                </span>
                <span class="text-slate-500">Top 15% of patients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <SectionHeader title="Quick Actions" />
          <div class="grid grid-cols-4 gap-3">
            <QuickAction icon="fa-video" label="Telemedicine" href="/patient/telemedicine" color="gs-blue" />
            <QuickAction icon="fa-calendar-plus" label="Book" href="/patient/booking" color="gs-green" />
            <QuickAction icon="fa-heartbeat" label="Vitals" href="/patient/rpm" color="gs-red" />
            <QuickAction icon="fa-robot" label="AI Assist" href="/patient/ai-diagnostics" color="gs-purple" />
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-3">
          <QuickAction icon="fa-gem" label="CareSelect™" href="/patient/marketplace" color="gs-gold" />
          <QuickAction icon="fa-spa" label="Wellness" href="/patient/wellness" color="gs-teal" />
          <QuickAction icon="fa-user-doctor" label="Care Team" href="/patient/care-team" color="gs-navy" />
          <QuickAction icon="fa-comments" label="Messages" href="/patient/messages" color="gs-blue" badge="2" />
        </div>

        {/* Health Vitals Summary */}
        <div>
          <SectionHeader title="Today's Vitals" action="View All" actionHref="/patient/rpm" />
          <div class="grid grid-cols-2 gap-3">
            <VitalCard icon="fa-heart" label="Heart Rate" value="72" unit="bpm" status="normal" trend="stable" />
            <VitalCard icon="fa-droplet" label="Blood Pressure" value="120/80" unit="mmHg" status="normal" trend="stable" />
            <VitalCard icon="fa-weight-scale" label="Weight" value="78.5" unit="kg" status="normal" trend="down" />
            <VitalCard icon="fa-person-walking" label="Steps" value="4,230" unit="/ 8,000" status="normal" trend="up" />
          </div>
        </div>

        {/* Timeline Preview */}
        <div>
          <SectionHeader title="Recovery Timeline" action="Full Timeline" actionHref="/patient/timeline" />
          
          <div class="space-y-1">
            {/* Completed - Week 1 */}
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-navy-900 flex items-center justify-center shadow-soft">
                  <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="w-0.5 h-full bg-slate-200 mt-2"></div>
              </div>
              <div class="flex-1 pb-4">
                <Card padding="small">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wide">Week 1</span>
                      <h4 class="font-semibold text-navy-900 text-sm">Initial Assessment</h4>
                      <p class="text-xs text-slate-500 mt-0.5">Oct 15 - 21 • Dr. L. Weber</p>
                    </div>
                    <StatusBadge status="success" text="Done" size="small" />
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Upcoming Appointment */}
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-xl bg-navy-900 text-brand-400 flex items-center justify-center shadow-soft">
                  <i class="fas fa-heart-pulse"></i>
                </div>
                <div class="w-0.5 h-full bg-slate-200 mt-2"></div>
              </div>
              <div class="flex-1 pb-4 flex justify-end">
                <div class="w-[90%]">
                  <AppointmentCard 
                    type="Today"
                    title="Cardiology Consult"
                    datetime="2:00 PM"
                    doctor="Dr. K. Müller"
                    specialty="Cardiologist"
                    isUpcoming={true}
                  />
                </div>
              </div>
            </div>
            
            {/* Upcoming Label */}
            <div class="flex gap-3 items-center">
              <div class="w-10 flex justify-center">
                <div class="w-0.5 h-6 bg-slate-200"></div>
              </div>
              <span class="text-xs font-bold text-navy-900 border border-navy-200 bg-navy-50 px-3 py-1 rounded-full">
                UPCOMING
              </span>
            </div>
            
            {/* Week 3 */}
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-xl border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                  <i class="fas fa-person-walking"></i>
                </div>
                <div class="w-0.5 h-full bg-slate-200 mt-2"></div>
              </div>
              <div class="flex-1 pb-4">
                <Card padding="small" className="border-dashed">
                  <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wide">Week 3</span>
                  <h4 class="font-semibold text-navy-900 text-sm">Mobility Training</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Oct 29 - Nov 4</p>
                </Card>
              </div>
            </div>
            
            {/* Week 4 */}
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-xl border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                  <i class="fas fa-dumbbell"></i>
                </div>
              </div>
              <div class="flex-1">
                <Card padding="small" className="border-dashed">
                  <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wide">Week 4</span>
                  <h4 class="font-semibold text-navy-900 text-sm">Advanced Strengthening</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Nov 5 - 11</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div>
          <SectionHeader title="Today's Tasks" action="3 of 5 done" actionHref="/patient/timeline" />
          <Card padding="default">
            <div class="space-y-3">
              {[
                { icon: 'fa-pills', title: 'Morning medication', time: '8:00 AM', done: true },
                { icon: 'fa-person-walking', title: 'Light mobility exercises', time: '10:00 AM', done: true },
                { icon: 'fa-bowl-food', title: 'Log breakfast nutrition', time: '9:00 AM', done: true },
                { icon: 'fa-dumbbell', title: 'Physiotherapy session', time: '2:00 PM', done: false },
                { icon: 'fa-moon', title: 'Evening medication', time: '8:00 PM', done: false }
              ].map((task) => (
                <div class={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${task.done ? 'bg-success-50/50' : 'bg-slate-50 hover:bg-slate-100'}`}>
                  <div class={`w-9 h-9 rounded-xl flex items-center justify-center ${task.done ? 'bg-success-500 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                    <i class={`fas ${task.done ? 'fa-check' : task.icon} text-sm`}></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class={`text-sm font-medium ${task.done ? 'text-slate-400 line-through' : 'text-navy-900'}`}>{task.title}</p>
                    <p class="text-xs text-slate-400">{task.time}</p>
                  </div>
                  {!task.done && (
                    <button class="w-8 h-8 rounded-lg border-2 border-brand-400 text-brand-500 hover:bg-brand-50 flex items-center justify-center transition-all active:scale-95">
                      <i class="fas fa-check text-sm"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Care Team */}
        <div>
          <SectionHeader title="Your Care Team" action="View All" actionHref="/patient/care-team" />
          <div class="space-y-3">
            <DoctorCard 
              name="Dr. L. Weber"
              specialty="Orthopedic Surgeon"
              hospital="University Hospital Bielefeld"
              available={true}
              rating={4.9}
            />
            <DoctorCard 
              name="Dr. K. Müller"
              specialty="Cardiologist"
              hospital="University Hospital Kiel"
              available={true}
              rating={4.8}
            />
          </div>
        </div>

        {/* CareSelect™ Journey Preview - Enhanced with Hurghada & Luxor */}
        <div>
          <SectionHeader title="CareSelect™ Journeys" action="Explore All" actionHref="/patient/marketplace" />
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {/* Hurghada Activities */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-44 group">
              <Card hover className="overflow-hidden">
                <div class="h-24 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center relative">
                  <i class="fas fa-anchor text-white text-3xl group-hover:scale-110 transition-transform"></i>
                  <span class="absolute top-2 right-2 bg-white/90 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                </div>
                <div class="p-3">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-[10px] font-bold text-teal-600 uppercase tracking-wide">Hurghada</span>
                  </div>
                  <h5 class="font-semibold text-sm text-navy-900">Red Sea Activities</h5>
                  <p class="text-xs text-slate-500">12 experiences</p>
                  <p class="text-brand-600 font-bold text-sm mt-2">From €45</p>
                </div>
              </Card>
            </a>
            
            {/* Luxor Tours */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-44 group">
              <Card hover className="overflow-hidden">
                <div class="h-24 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center relative">
                  <i class="fas fa-landmark text-white text-3xl group-hover:scale-110 transition-transform"></i>
                  <span class="absolute top-2 right-2 bg-white/90 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                </div>
                <div class="p-3">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Luxor</span>
                  </div>
                  <h5 class="font-semibold text-sm text-navy-900">Ancient Wonders</h5>
                  <p class="text-xs text-slate-500">14 attractions</p>
                  <p class="text-brand-600 font-bold text-sm mt-2">From €20</p>
                </div>
              </Card>
            </a>
            
            {/* Hot Air Balloon - Featured */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-44 group">
              <Card hover className="overflow-hidden ring-2 ring-rose-400">
                <div class="h-24 bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center relative">
                  <i class="fas fa-hot-air-balloon text-white text-3xl group-hover:scale-110 transition-transform"></i>
                  <span class="absolute top-2 right-2 bg-navy-900 text-brand-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <i class="fas fa-star text-[8px]"></i>5.0
                  </span>
                </div>
                <div class="p-3">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wide">Featured</span>
                  </div>
                  <h5 class="font-semibold text-sm text-navy-900">Sunrise Balloon</h5>
                  <p class="text-xs text-slate-500">Luxor aerial view</p>
                  <p class="text-brand-600 font-bold text-sm mt-2">€125</p>
                </div>
              </Card>
            </a>
            
            {/* Sunset Yacht */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-44 group">
              <Card hover className="overflow-hidden">
                <div class="h-24 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center relative">
                  <i class="fas fa-sailboat text-navy-900 text-3xl group-hover:scale-110 transition-transform"></i>
                  <span class="absolute top-2 left-2 bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Recovery OK</span>
                </div>
                <div class="p-3">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wide">Hurghada</span>
                  </div>
                  <h5 class="font-semibold text-sm text-navy-900">Sunset Yacht</h5>
                  <p class="text-xs text-slate-500">3 hour cruise</p>
                  <p class="text-brand-600 font-bold text-sm mt-2">€120</p>
                </div>
              </Card>
            </a>
            
            {/* Valley of Kings */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-44 group">
              <Card hover className="overflow-hidden">
                <div class="h-24 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <i class="fas fa-crown text-white text-3xl group-hover:scale-110 transition-transform"></i>
                </div>
                <div class="p-3">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Luxor</span>
                  </div>
                  <h5 class="font-semibold text-sm text-navy-900">Valley of Kings</h5>
                  <p class="text-xs text-slate-500">Royal tombs tour</p>
                  <p class="text-brand-600 font-bold text-sm mt-2">€55</p>
                </div>
              </Card>
            </a>
            
            {/* See All Card */}
            <a href="/patient/marketplace" class="flex-shrink-0 w-36 group">
              <div class="h-full bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-navy-700 hover:border-brand-500 transition-all">
                <div class="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-3 group-hover:bg-brand-500/30 transition-colors">
                  <i class="fas fa-arrow-right text-brand-400 text-lg group-hover:translate-x-1 transition-transform"></i>
                </div>
                <p class="text-white font-semibold text-sm">See All</p>
                <p class="text-slate-400 text-xs mt-1">26+ activities</p>
              </div>
            </a>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div class="bg-danger-50 border border-danger-200 rounded-2xl p-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-danger-100 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-phone-volume text-danger-600 text-lg"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-danger-900">Emergency Support</h4>
              <p class="text-xs text-danger-700 mt-0.5">24/7 medical assistance available</p>
            </div>
            <a href="tel:+4912345678" class="w-11 h-11 rounded-xl bg-danger-500 text-white flex items-center justify-center shadow-lg shadow-danger-500/30 hover:bg-danger-600 transition-all active:scale-95">
              <i class="fas fa-phone"></i>
            </a>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
