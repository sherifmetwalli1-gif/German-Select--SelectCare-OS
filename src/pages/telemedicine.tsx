import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const telemedicinePage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Telemedicine" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Quick Connect */}
        <Card className="p-4 bg-gs-navy text-white">
          <h3 class="font-bold mb-3">Connect with Your Care Team</h3>
          <p class="text-sm text-white/70 mb-4">HD video consultations with German-certified specialists</p>
          <div class="grid grid-cols-2 gap-3">
            <a href="/patient/booking" class="py-3 bg-gs-gold text-gs-navy font-medium rounded-lg text-center hover:bg-gs-gold-dark transition-colors">
              <i class="fas fa-calendar-plus mr-2"></i>Schedule
            </a>
            <button class="py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors" onclick="startInstantCall()">
              <i class="fas fa-video mr-2"></i>Instant Call
            </button>
          </div>
        </Card>
        
        {/* Upcoming Consultations */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Upcoming Consultations</h3>
            <a href="/patient/booking" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            {[
              { 
                doctor: 'Dr. K. Müller', 
                specialty: 'Cardiologist',
                type: 'Cardiology Consult',
                datetime: 'Oct 22, 10:00 AM',
                duration: '30 min',
                status: 'upcoming',
                canJoin: true
              },
              { 
                doctor: 'Dr. A. Schmidt', 
                specialty: 'Nutritionist',
                type: 'Nutrition Plan Review',
                datetime: 'Nov 5, 2:00 PM',
                duration: '30 min',
                status: 'scheduled',
                canJoin: false
              }
            ].map((consult) => (
              <Card className={`p-4 ${consult.canJoin ? 'ring-2 ring-gs-green' : ''}`}>
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-md text-gs-gold"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gs-navy">{consult.doctor}</h4>
                    <p class="text-xs text-gs-gold">{consult.specialty}</p>
                    <p class="text-sm text-gray-600 mt-1">{consult.type}</p>
                    <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <i class="fas fa-calendar"></i>
                      <span>{consult.datetime}</span>
                      <span>•</span>
                      <span>{consult.duration}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 mt-4">
                  {consult.canJoin ? (
                    <>
                      <button class="flex-1 py-2 bg-gs-green text-white font-medium rounded-lg hover:bg-green-600 transition-colors" onclick="joinCall()">
                        <i class="fas fa-video mr-2"></i>Join Now
                      </button>
                      <button class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button class="flex-1 py-2 bg-gray-100 text-gs-navy font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-bell mr-2"></i>Set Reminder
                      </button>
                      <button class="flex-1 py-2 border border-gs-navy/20 text-gs-navy font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <i class="fas fa-calendar-alt mr-2"></i>Reschedule
                      </button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Available Now */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Available Now</h3>
            <span class="flex items-center gap-1 text-xs text-gs-green">
              <span class="w-2 h-2 bg-gs-green rounded-full animate-pulse"></span>
              3 doctors online
            </span>
          </div>
          <div class="space-y-3">
            {[
              { name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', rating: 4.9, waitTime: '~5 min', price: '€150' },
              { name: 'M. Hassan', specialty: 'Physiotherapist', rating: 4.8, waitTime: '~2 min', price: '€80' },
              { name: 'S. Ahmed', specialty: 'Care Coordinator', rating: 5.0, waitTime: 'Available', price: 'Free' }
            ].map((doctor) => (
              <Card className="p-4">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center">
                      <i class="fas fa-user-md text-gs-gold"></i>
                    </div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-gs-green border-2 border-white rounded-full"></div>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gs-navy">{doctor.name}</h4>
                    <p class="text-xs text-gs-gold">{doctor.specialty}</p>
                    <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <i class="fas fa-star text-gs-gold"></i>
                      <span>{doctor.rating}</span>
                      <span>•</span>
                      <span class="text-gs-green">{doctor.waitTime}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gs-navy">{doctor.price}</p>
                    <button class="mt-2 px-3 py-1 bg-gs-navy text-white text-xs font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                      <i class="fas fa-video mr-1"></i>Call
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Consultation History */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Recent Consultations</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            {[
              { 
                doctor: 'Dr. L. Weber', 
                specialty: 'Orthopedic Surgeon',
                type: 'Post-Op Follow-up',
                date: 'Oct 19, 2024',
                duration: '25 min',
                hasNotes: true,
                hasPrescription: false
              },
              { 
                doctor: 'Dr. Sherif Akram Metwalli', 
                specialty: 'Bariatric Surgeon',
                type: 'Initial Consultation',
                date: 'Oct 15, 2024',
                duration: '45 min',
                hasNotes: true,
                hasPrescription: true
              }
            ].map((consult) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-md text-gray-400"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-sm text-gs-navy">{consult.doctor}</h4>
                    <p class="text-xs text-gray-500">{consult.type}</p>
                    <p class="text-xs text-gray-400 mt-1">{consult.date} • {consult.duration}</p>
                    <div class="flex gap-2 mt-2">
                      {consult.hasNotes && (
                        <button class="px-2 py-1 bg-gs-blue/10 text-gs-blue text-xs rounded hover:bg-gs-blue/20 transition-colors">
                          <i class="fas fa-file-alt mr-1"></i>Notes
                        </button>
                      )}
                      {consult.hasPrescription && (
                        <button class="px-2 py-1 bg-gs-green/10 text-gs-green text-xs rounded hover:bg-gs-green/20 transition-colors">
                          <i class="fas fa-prescription mr-1"></i>Prescription
                        </button>
                      )}
                      <button class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors">
                        <i class="fas fa-redo mr-1"></i>Book Again
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* How It Works */}
        <Card className="p-4 bg-gs-gold/10">
          <h4 class="font-bold text-gs-navy mb-3">How Telemedicine Works</h4>
          <div class="space-y-3">
            {[
              { step: 1, title: 'Schedule or Start', desc: 'Book an appointment or start an instant call' },
              { step: 2, title: 'Connect', desc: 'Join via video with your doctor' },
              { step: 3, title: 'Consult', desc: 'Discuss your health, share files/images' },
              { step: 4, title: 'Follow-up', desc: 'Receive notes, prescriptions, and next steps' }
            ].map((item) => (
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-gs-gold text-gs-navy flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {item.step}
                </div>
                <div>
                  <p class="text-sm font-medium text-gs-navy">{item.title}</p>
                  <p class="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Technical Requirements */}
        <Card className="p-4">
          <h4 class="font-bold text-gs-navy mb-3">Before Your Call</h4>
          <div class="space-y-2">
            {[
              { icon: 'fa-wifi', text: 'Stable internet connection', status: 'good' },
              { icon: 'fa-video', text: 'Camera access enabled', status: 'good' },
              { icon: 'fa-microphone', text: 'Microphone access enabled', status: 'good' },
              { icon: 'fa-volume-up', text: 'Speaker/headphones ready', status: 'good' }
            ].map((item) => (
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gs-green/10 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-gs-green text-sm`}></i>
                </div>
                <span class="text-sm text-gs-navy flex-1">{item.text}</span>
                <i class="fas fa-check-circle text-gs-green"></i>
              </div>
            ))}
          </div>
          <button class="w-full mt-4 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
            <i class="fas fa-cog mr-2"></i>Test Your Setup
          </button>
        </Card>
        
        {/* Emergency Notice */}
        <Card className="p-4 bg-gs-red/5 border border-gs-red/20">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-gs-red/10 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-exclamation-triangle text-gs-red text-sm"></i>
            </div>
            <div>
              <h4 class="font-semibold text-sm text-gs-red">Medical Emergency?</h4>
              <p class="text-xs text-gray-600 mt-1">Telemedicine is not for emergencies. If you're experiencing a medical emergency, please call local emergency services immediately.</p>
              <a href="tel:112" class="inline-block mt-2 px-3 py-1 bg-gs-red text-white text-xs font-medium rounded hover:bg-red-600 transition-colors">
                <i class="fas fa-phone mr-1"></i>Emergency: 112
              </a>
            </div>
          </div>
        </Card>
      </main>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          function startInstantCall() {
            alert('Connecting to available care team member...');
          }
          
          function joinCall() {
            alert('Joining video consultation...');
          }
        `
      }} />
    </PageWrapper>
  )
}
