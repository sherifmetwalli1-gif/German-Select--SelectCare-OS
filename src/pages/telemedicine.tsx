import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const telemedicinePage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={false}>
      <Header title="Telemedicine" showBack={true} showProfile={false} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Active Call Banner (when in call) */}
        <Card className="p-4 bg-gs-navy text-white">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center">
                <i class="fas fa-user-md text-gs-gold"></i>
              </div>
              <div>
                <h4 class="font-bold">Dr. K. Müller</h4>
                <p class="text-sm text-white/70">Cardiologist</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-3 py-1 bg-gs-green/20 text-gs-green text-xs rounded-full">Available Now</span>
              <p class="text-xs text-white/60 mt-1">Next: Oct 22, 10:00 AM</p>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button class="flex-1 py-3 bg-gs-gold text-gs-navy font-bold rounded-lg hover:bg-gs-gold-dark transition-colors flex items-center justify-center gap-2">
              <i class="fas fa-video"></i>
              <span>Start Video Call</span>
            </button>
            <button class="w-12 h-12 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              <i class="fas fa-phone"></i>
            </button>
          </div>
        </Card>
        
        {/* Upcoming Appointments */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Upcoming Sessions</h3>
            <a href="/patient/booking" class="text-xs text-gs-gold">+ Schedule</a>
          </div>
          
          <div class="space-y-3">
            {[
              { doctor: 'Dr. K. Müller', specialty: 'Cardiologist', date: 'Oct 22', time: '10:00 AM', type: 'Follow-up', duration: '15 min' },
              { doctor: 'Dr. A. Schmidt', specialty: 'Nutritionist', date: 'Nov 5', time: '2:00 PM', type: 'Consultation', duration: '30 min' },
              { doctor: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', date: 'Nov 12', time: '11:00 AM', type: '6-Week Check-up', duration: '30 min' }
            ].map((apt) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-full bg-gs-gold/10 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-md text-gs-gold"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gs-navy">{apt.doctor}</h4>
                    <p class="text-xs text-gs-gold">{apt.specialty}</p>
                    <p class="text-xs text-gray-500 mt-1">{apt.type} • {apt.duration}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gs-navy">{apt.date}</p>
                    <p class="text-xs text-gray-500">{apt.time}</p>
                  </div>
                </div>
                <div class="flex gap-2 mt-3">
                  <button class="flex-1 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                    <i class="fas fa-video mr-2"></i>Join
                  </button>
                  <button class="flex-1 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-calendar-alt mr-2"></i>Reschedule
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Quick Connect */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Quick Connect</h3>
          <div class="grid grid-cols-4 gap-3">
            {[
              { icon: 'fa-user-md', name: 'Dr. Weber', available: true },
              { icon: 'fa-user-md', name: 'Dr. Müller', available: true },
              { icon: 'fa-user-md', name: 'Dr. Schmidt', available: false },
              { icon: 'fa-user', name: 'Support', available: true }
            ].map((contact) => (
              <Card className="p-3 text-center">
                <div class="relative inline-block">
                  <div class="w-12 h-12 rounded-full bg-gs-gold/10 flex items-center justify-center mx-auto">
                    <i class={`fas ${contact.icon} text-gs-gold`}></i>
                  </div>
                  <div class={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.available ? 'bg-gs-green' : 'bg-gray-400'}`}></div>
                </div>
                <p class="text-xs font-medium text-gs-navy mt-2 truncate">{contact.name}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Video Call Interface Preview */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Video Consultation</h3>
          <Card className="overflow-hidden">
            <div class="aspect-video bg-gs-navy-dark flex items-center justify-center relative">
              {/* Main video area */}
              <div class="text-center text-white">
                <div class="w-20 h-20 rounded-full bg-gs-gold/20 flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-video text-gs-gold text-3xl"></i>
                </div>
                <p class="text-white/80">Ready to connect</p>
                <p class="text-xs text-white/50 mt-1">Check your camera and microphone</p>
              </div>
              
              {/* Self view */}
              <div class="absolute bottom-4 right-4 w-24 h-32 bg-gs-navy rounded-lg overflow-hidden shadow-lg">
                <div class="w-full h-full flex items-center justify-center bg-gray-800">
                  <i class="fas fa-user text-white/50 text-xl"></i>
                </div>
              </div>
              
              {/* Controls */}
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <i class="fas fa-microphone"></i>
                </button>
                <button class="w-14 h-14 rounded-full bg-gs-red text-white hover:bg-red-600 transition-colors">
                  <i class="fas fa-phone-slash"></i>
                </button>
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <i class="fas fa-video"></i>
                </button>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex gap-2">
                <button class="flex-1 py-3 bg-gs-gold text-gs-navy font-bold rounded-lg hover:bg-gs-gold-dark transition-colors">
                  <i class="fas fa-video mr-2"></i>Start Call
                </button>
              </div>
              
              {/* Quick Actions */}
              <div class="flex justify-around mt-4 pt-4 border-t">
                <button class="flex flex-col items-center text-gray-500 hover:text-gs-navy transition-colors">
                  <i class="fas fa-desktop text-lg mb-1"></i>
                  <span class="text-xs">Share Screen</span>
                </button>
                <button class="flex flex-col items-center text-gray-500 hover:text-gs-navy transition-colors">
                  <i class="fas fa-comment text-lg mb-1"></i>
                  <span class="text-xs">Chat</span>
                </button>
                <button class="flex flex-col items-center text-gray-500 hover:text-gs-navy transition-colors">
                  <i class="fas fa-file-upload text-lg mb-1"></i>
                  <span class="text-xs">Files</span>
                </button>
                <button class="flex flex-col items-center text-gray-500 hover:text-gs-navy transition-colors">
                  <i class="fas fa-language text-lg mb-1"></i>
                  <span class="text-xs">Translate</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Session Preparation */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Before Your Session</h3>
          <Card className="p-4">
            <div class="space-y-3">
              {[
                { icon: 'fa-check-circle', text: 'Test your camera and microphone', done: true },
                { icon: 'fa-wifi', text: 'Ensure stable internet connection', done: true },
                { icon: 'fa-file-medical', text: 'Prepare your medical documents', done: false },
                { icon: 'fa-list', text: 'Write down your questions', done: false }
              ].map((item) => (
                <div class="flex items-center gap-3">
                  <div class={`w-8 h-8 rounded-full flex items-center justify-center ${item.done ? 'bg-gs-green/10 text-gs-green' : 'bg-gray-100 text-gray-400'}`}>
                    <i class={`fas ${item.done ? 'fa-check' : item.icon} text-sm`}></i>
                  </div>
                  <span class={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gs-navy'}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Past Sessions */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Recent Sessions</h3>
          <div class="space-y-3">
            {[
              { doctor: 'Dr. L. Weber', date: 'Oct 19, 2024', duration: '25 min', summary: 'Post-surgery follow-up, progress excellent' },
              { doctor: 'M. Hassan', date: 'Oct 15, 2024', duration: '30 min', summary: 'Physiotherapy assessment and exercise plan' }
            ].map((session) => (
              <Card className="p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-gs-navy">{session.doctor}</h4>
                    <p class="text-xs text-gray-500">{session.date} • {session.duration}</p>
                    <p class="text-sm text-gray-600 mt-2">{session.summary}</p>
                  </div>
                </div>
                <div class="flex gap-2 mt-3">
                  <button class="flex-1 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-file-alt mr-2"></i>View Notes
                  </button>
                  <button class="flex-1 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-download mr-2"></i>Summary
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Technical Support */}
        <Card className="p-4 bg-gs-blue/5 border border-gs-blue/20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gs-blue/10 flex items-center justify-center">
              <i class="fas fa-headset text-gs-blue"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gs-navy">Technical Issues?</h4>
              <p class="text-xs text-gray-500">Our support team is here to help</p>
            </div>
            <button class="px-4 py-2 bg-gs-blue text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Get Help
            </button>
          </div>
        </Card>
      </main>
    </PageWrapper>
  )
}
