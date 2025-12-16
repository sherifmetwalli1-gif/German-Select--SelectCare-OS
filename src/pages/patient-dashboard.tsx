import { Context } from 'hono'
import { Header, BottomNav, PageWrapper, Card, ProgressCircle, QuickAction, DoctorCard, AppointmentCard, StatusBadge } from '../components/layout'

export const patientDashboard = (c: Context) => {
  return c.render(
    <PageWrapper active="home">
      <Header title="SelectCareOS™" />
      
      <main class="px-4 py-4 space-y-6">
        {/* Surgery Preparation Status */}
        <Card className="p-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gs-gold flex items-center justify-center">
              <i class="fas fa-running text-gs-navy text-lg"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gs-navy flex items-center gap-2">
                SURGERY PREPARATION
                <i class="fas fa-check-circle text-gs-green text-sm"></i>
              </h3>
              <p class="text-sm text-gray-500">Status: Completed - Oct 12</p>
            </div>
          </div>
        </Card>
        
        {/* Recovery Phase Card - Gold Gradient */}
        <Card gold className="p-5">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-check-circle text-gs-navy"></i>
            <h3 class="font-bold text-gs-navy uppercase tracking-wide text-sm">Recovery Phase: Post-Op Rehab</h3>
          </div>
          
          <div class="flex items-center gap-6">
            <ProgressCircle percent={75} />
            
            <div class="flex-1">
              <div class="relative h-2 bg-white/40 rounded-full overflow-hidden">
                <div class="absolute inset-y-0 left-0 w-3/4 bg-gs-navy rounded-full"></div>
                <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gs-navy rounded-full"></div>
              </div>
              <div class="flex justify-between mt-2 text-xs text-gs-navy/70">
                <span>Start</span>
                <span>12 weeks</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gs-navy/10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fas fa-calendar-alt text-gs-navy"></i>
                <span class="text-sm text-gs-navy font-medium">Next: Mobility Training</span>
              </div>
              <span class="text-xs bg-gs-navy text-white px-2 py-1 rounded-full">Oct 29</span>
            </div>
          </div>
        </Card>
        
        {/* Timeline Preview */}
        <div class="space-y-1">
          {/* Week 1 */}
          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full bg-gs-gold text-gs-navy flex items-center justify-center">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <div class="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div class="flex-1 pb-6">
              <Card className="p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-bold text-gs-gold uppercase tracking-wide">Week 1:</span>
                    <h4 class="font-bold text-gs-navy mt-1">INITIAL ASSESSMENT</h4>
                    <p class="text-xs text-gray-500 mt-1">Oct 15 - 21</p>
                    <div class="mt-2 text-xs text-gray-600">
                      <p>Dr. L. Weber, Orthopedics.</p>
                      <p>Follow-up: Oct 19</p>
                    </div>
                  </div>
                  <StatusBadge status="success" text="Completed" />
                </div>
              </Card>
            </div>
          </div>
          
          {/* Appointment Card - Right Side */}
          <div class="flex gap-4">
            <div class="w-10 flex flex-col items-center">
              <div class="w-0.5 h-full bg-gray-200"></div>
            </div>
            <div class="flex-1 flex justify-end pb-6">
              <div class="w-4/5">
                <AppointmentCard 
                  type="APPOINTMENT:"
                  title="CARDIOLOGY CONSULT"
                  datetime="Oct 22, 10:00 AM"
                  doctor="Dr. K. Müller"
                  specialty="Cardiologist"
                  isUpcoming={true}
                />
              </div>
            </div>
          </div>
          
          {/* Upcoming Milestones Label */}
          <div class="flex gap-4">
            <div class="w-10 flex flex-col items-center">
              <div class="w-0.5 h-8 bg-gray-200"></div>
            </div>
            <div class="pb-2">
              <span class="text-xs font-bold text-gs-navy border-2 border-gs-navy px-3 py-1 rounded-full">
                UPCOMING MILESTONES
              </span>
            </div>
          </div>
          
          {/* Week 3 */}
          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full border-2 border-gs-navy/30 text-gs-navy flex items-center justify-center">
                <i class="fas fa-walking"></i>
              </div>
              <div class="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div class="flex-1 pb-6">
              <Card className="p-4">
                <span class="text-xs font-bold text-gs-gold uppercase tracking-wide">Week 3:</span>
                <h4 class="font-bold text-gs-navy mt-1">MOBILITY TRAINING</h4>
                <p class="text-xs text-gray-500 mt-1">Oct 29 - Nov 4</p>
              </Card>
            </div>
          </div>
          
          {/* Appointment - Nutrition */}
          <div class="flex gap-4">
            <div class="w-10 flex flex-col items-center">
              <div class="w-0.5 h-full bg-gray-200"></div>
            </div>
            <div class="flex-1 flex justify-end pb-6">
              <div class="w-4/5">
                <AppointmentCard 
                  type="APPOINTMENT:"
                  title="NUTRITION PLAN"
                  datetime="Nov 5, 2:00 PM"
                  doctor="Dr. A. Schmidt"
                  specialty="Nutritionist"
                  isUpcoming={true}
                />
              </div>
            </div>
          </div>
          
          {/* Week 6 */}
          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full border-2 border-gs-navy/30 text-gs-navy flex items-center justify-center">
                <i class="fas fa-dumbbell"></i>
              </div>
            </div>
            <div class="flex-1 pb-6">
              <Card className="p-4">
                <span class="text-xs font-bold text-gs-gold uppercase tracking-wide">Week 6:</span>
                <h4 class="font-bold text-gs-navy mt-1">ADVANCED STRENGTHENING</h4>
                <p class="text-xs text-gray-500 mt-1">Nov 19 - 25</p>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Quick Actions</h3>
          <div class="grid grid-cols-4 gap-3">
            <QuickAction icon="fa-video" label="Telemedicine" href="/patient/telemedicine" color="gs-blue" />
            <QuickAction icon="fa-calendar-plus" label="Book" href="/patient/booking" color="gs-green" />
            <QuickAction icon="fa-heartbeat" label="RPM" href="/patient/rpm" color="gs-red" />
            <QuickAction icon="fa-robot" label="AI Assist" href="/patient/ai-diagnostics" color="gs-purple" />
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-3">
          <QuickAction icon="fa-shopping-bag" label="Marketplace" href="/patient/marketplace" color="gs-gold" />
          <QuickAction icon="fa-spa" label="Wellness" href="/patient/wellness" color="gs-teal" />
          <QuickAction icon="fa-user-md" label="Care Team" href="/patient/care-team" color="gs-navy" />
          <QuickAction icon="fa-comment-medical" label="Messages" href="/patient/messages" color="gs-blue" />
        </div>
        
        {/* Today's Tasks */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gs-navy">Today's Tasks</h3>
            <a href="/patient/timeline" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            {[
              { icon: 'fa-pills', title: 'Take morning medication', time: '8:00 AM', done: true },
              { icon: 'fa-walking', title: 'Light mobility exercises', time: '10:00 AM', done: true },
              { icon: 'fa-utensils', title: 'Log breakfast', time: '9:00 AM', done: false },
              { icon: 'fa-dumbbell', title: 'Physiotherapy session', time: '2:00 PM', done: false }
            ].map((task) => (
              <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div class={`w-8 h-8 rounded-full flex items-center justify-center ${task.done ? 'bg-gs-green/10 text-gs-green' : 'bg-gray-100 text-gray-400'}`}>
                  <i class={`fas ${task.done ? 'fa-check' : task.icon} text-sm`}></i>
                </div>
                <div class="flex-1">
                  <p class={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gs-navy font-medium'}`}>{task.title}</p>
                  <p class="text-xs text-gray-400">{task.time}</p>
                </div>
                {!task.done && (
                  <button class="text-gs-gold hover:text-gs-gold-dark">
                    <i class="fas fa-check-circle"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
        
        {/* Your Care Team Preview */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Your Care Team</h3>
            <a href="/patient/care-team" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
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
        
        {/* Health Summary */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gs-navy">Health Summary</h3>
            <a href="/patient/rpm" class="text-xs text-gs-gold hover:underline">View Details</a>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gs-navy/5 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-heart text-gs-red text-sm"></i>
                <span class="text-xs text-gray-500">Heart Rate</span>
              </div>
              <p class="text-xl font-bold text-gs-navy">72 <span class="text-xs font-normal text-gray-400">bpm</span></p>
            </div>
            <div class="bg-gs-navy/5 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-tint text-gs-blue text-sm"></i>
                <span class="text-xs text-gray-500">Blood Pressure</span>
              </div>
              <p class="text-xl font-bold text-gs-navy">120/80 <span class="text-xs font-normal text-gray-400">mmHg</span></p>
            </div>
            <div class="bg-gs-navy/5 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-weight text-gs-gold text-sm"></i>
                <span class="text-xs text-gray-500">Weight</span>
              </div>
              <p class="text-xl font-bold text-gs-navy">78.5 <span class="text-xs font-normal text-gray-400">kg</span></p>
            </div>
            <div class="bg-gs-navy/5 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-shoe-prints text-gs-green text-sm"></i>
                <span class="text-xs text-gray-500">Steps Today</span>
              </div>
              <p class="text-xl font-bold text-gs-navy">4,230 <span class="text-xs font-normal text-gray-400">/ 8,000</span></p>
            </div>
          </div>
        </Card>
        
        {/* SelectScore */}
        <Card gold className="p-4">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-full border-4 border-gs-navy flex items-center justify-center">
                <div class="text-center">
                  <span class="text-2xl font-bold text-gs-navy">85</span>
                  <span class="text-xs text-gs-navy/70 block">Score</span>
                </div>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gs-navy">SelectScore™</h4>
              <p class="text-xs text-gs-navy/70 mt-1">Your recovery readiness score based on vitals, adherence, and progress.</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="px-2 py-0.5 bg-gs-navy text-white text-xs rounded-full">Excellent</span>
                <span class="text-xs text-gs-navy/60">+5 from last week</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Marketplace Preview */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Explore Red Sea Recovery</h3>
            <a href="/patient/marketplace" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { title: 'Wellness Retreat', desc: '5-day recovery program', price: '€2,500', image: 'fa-spa' },
              { title: 'Yacht Excursion', desc: 'Day trip on Red Sea', price: '€350', image: 'fa-ship' },
              { title: 'Snorkeling Tour', desc: 'Coral reef experience', price: '€85', image: 'fa-water' }
            ].map((item) => (
              <div class="flex-shrink-0 w-40">
                <Card className="overflow-hidden">
                  <div class="h-24 bg-gs-navy flex items-center justify-center">
                    <i class={`fas ${item.image} text-gs-gold text-3xl`}></i>
                  </div>
                  <div class="p-3">
                    <h5 class="font-semibold text-sm text-gs-navy">{item.title}</h5>
                    <p class="text-xs text-gray-500">{item.desc}</p>
                    <p class="text-gs-gold font-bold text-sm mt-2">{item.price}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
