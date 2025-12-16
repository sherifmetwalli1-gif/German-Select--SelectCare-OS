import { Context } from 'hono'
import { Header, BottomNav, PageWrapper, Card, MilestoneCard, StatusBadge } from '../components/layout'

export const timelinePage = (c: Context) => {
  return c.render(
    <PageWrapper active="timeline">
      <Header title="Recovery Timeline" showBack={true} />
      
      <main class="px-4 py-4">
        {/* Overall Progress */}
        <Card className="p-4 mb-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-gs-navy">Post-Op Recovery Journey</h3>
              <p class="text-sm text-gray-500">Orthopedic Knee Surgery</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gs-gold">75%</div>
              <div class="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          <div class="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-gs-gold to-gs-gold-dark rounded-full"></div>
          </div>
          
          <div class="flex justify-between mt-2 text-xs text-gray-500">
            <span>Oct 12, 2024</span>
            <span>Expected: Jan 12, 2025</span>
          </div>
        </Card>
        
        {/* Phase Tabs */}
        <div class="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
          {['All', 'Pre-Op', 'Surgery', 'Recovery', 'Follow-up'].map((phase, idx) => (
            <button class={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${idx === 0 ? 'bg-gs-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              {phase}
            </button>
          ))}
        </div>
        
        {/* Timeline */}
        <div class="space-y-0">
          {/* Pre-Surgery Phase */}
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-gs-green text-white flex items-center justify-center">
                <i class="fas fa-check text-sm"></i>
              </div>
              <h4 class="font-bold text-gs-navy">Pre-Surgery Phase</h4>
              <StatusBadge status="success" text="Completed" />
            </div>
          </div>
          
          <MilestoneCard
            week="Week -4"
            title="Initial Consultation"
            dateRange="Sep 15 - 21"
            icon="fa-stethoscope"
            status="completed"
            details="Video consultation with Dr. Weber. Medical history review and surgery recommendation."
          />
          
          <MilestoneCard
            week="Week -2"
            title="Pre-Op Optimization"
            dateRange="Sep 29 - Oct 5"
            icon="fa-heartbeat"
            status="completed"
            details="Blood tests, ECG, and fitness assessment. Nutrition plan started."
          />
          
          <MilestoneCard
            week="Week -1"
            title="Final Preparation"
            dateRange="Oct 6 - 11"
            icon="fa-clipboard-check"
            status="completed"
            details="Travel to Red Sea facility. Pre-surgical consultations and consent."
          />
          
          {/* Surgery Phase */}
          <div class="my-4">
            <div class="flex items-center gap-2 mb-4 mt-6">
              <div class="w-8 h-8 rounded-full bg-gs-green text-white flex items-center justify-center">
                <i class="fas fa-check text-sm"></i>
              </div>
              <h4 class="font-bold text-gs-navy">Surgery Phase</h4>
              <StatusBadge status="success" text="Completed" />
            </div>
          </div>
          
          <MilestoneCard
            week="Week 0"
            title="Knee Replacement Surgery"
            dateRange="Oct 12"
            icon="fa-hospital"
            status="completed"
            details="Successful surgery by Dr. Weber. 3-day hospital stay with 24/7 monitoring."
          />
          
          {/* Recovery Phase */}
          <div class="my-4">
            <div class="flex items-center gap-2 mb-4 mt-6">
              <div class="w-8 h-8 rounded-full bg-gs-gold text-gs-navy flex items-center justify-center">
                <i class="fas fa-spinner text-sm"></i>
              </div>
              <h4 class="font-bold text-gs-navy">Recovery Phase</h4>
              <StatusBadge status="info" text="In Progress" />
            </div>
          </div>
          
          <MilestoneCard
            week="Week 1"
            title="Initial Assessment"
            dateRange="Oct 15 - 21"
            icon="fa-clipboard-list"
            status="completed"
            details="First post-op assessment. Wound check and early mobilization started."
          />
          
          <MilestoneCard
            week="Week 2"
            title="Basic Rehabilitation"
            dateRange="Oct 22 - 28"
            icon="fa-procedures"
            status="current"
            details="Daily physiotherapy sessions. Range of motion exercises. Pain management."
          />
          
          <MilestoneCard
            week="Week 3"
            title="Mobility Training"
            dateRange="Oct 29 - Nov 4"
            icon="fa-walking"
            status="upcoming"
            details="Progressive weight bearing. Stair climbing practice. Pool therapy."
          />
          
          <MilestoneCard
            week="Week 4-5"
            title="Strengthening Program"
            dateRange="Nov 5 - 18"
            icon="fa-dumbbell"
            status="upcoming"
            details="Muscle strengthening exercises. Balance training. Increased activity."
          />
          
          <MilestoneCard
            week="Week 6"
            title="Advanced Strengthening"
            dateRange="Nov 19 - 25"
            icon="fa-running"
            status="upcoming"
            details="Advanced exercises. Return to daily activities assessment."
          />
          
          {/* Follow-up Phase */}
          <div class="my-4">
            <div class="flex items-center gap-2 mb-4 mt-6">
              <div class="w-8 h-8 rounded-full border-2 border-gs-navy/30 text-gs-navy flex items-center justify-center">
                <i class="fas fa-calendar text-sm"></i>
              </div>
              <h4 class="font-bold text-gs-navy">Long-term Follow-up</h4>
              <StatusBadge status="info" text="Upcoming" />
            </div>
          </div>
          
          <MilestoneCard
            week="Week 8"
            title="6-Week Check-up"
            dateRange="Dec 3"
            icon="fa-user-md"
            status="upcoming"
            details="Telemedicine follow-up with Dr. Weber. X-ray review and progress assessment."
          />
          
          <MilestoneCard
            week="Week 12"
            title="3-Month Assessment"
            dateRange="Jan 12, 2025"
            icon="fa-clipboard-check"
            status="upcoming"
            details="Final recovery assessment. Return to normal activities clearance."
          />
        </div>
        
        {/* Next Appointments */}
        <Card className="p-4 mt-6">
          <h4 class="font-bold text-gs-navy mb-4">Upcoming Appointments</h4>
          <div class="space-y-3">
            {[
              { type: 'Cardiology Consult', doctor: 'Dr. K. Müller', date: 'Oct 22', time: '10:00 AM', method: 'video' },
              { type: 'Nutrition Plan', doctor: 'Dr. A. Schmidt', date: 'Nov 5', time: '2:00 PM', method: 'video' },
              { type: 'Physiotherapy', doctor: 'M. Hassan', date: 'Oct 23', time: '9:00 AM', method: 'onsite' }
            ].map((apt) => (
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div class={`w-10 h-10 rounded-full flex items-center justify-center ${apt.method === 'video' ? 'bg-gs-blue/10 text-gs-blue' : 'bg-gs-green/10 text-gs-green'}`}>
                  <i class={`fas ${apt.method === 'video' ? 'fa-video' : 'fa-hospital'}`}></i>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-sm text-gs-navy">{apt.type}</p>
                  <p class="text-xs text-gray-500">{apt.doctor}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gs-navy">{apt.date}</p>
                  <p class="text-xs text-gray-500">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Download Timeline */}
        <div class="mt-6 flex gap-3">
          <button class="flex-1 py-3 bg-gs-navy text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gs-navy-light transition-colors">
            <i class="fas fa-download"></i>
            <span>Export PDF</span>
          </button>
          <button class="flex-1 py-3 bg-white text-gs-navy rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-gs">
            <i class="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
        </div>
      </main>
    </PageWrapper>
  )
}
