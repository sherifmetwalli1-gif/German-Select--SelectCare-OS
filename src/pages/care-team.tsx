import { Context } from 'hono'
import { Header, PageWrapper, Card, DoctorCard } from '../components/layout'

export const careTeamPage = (c: Context) => {
  return c.render(
    <PageWrapper active="careteam">
      <Header title="Care Team" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Search */}
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search specialists..." 
            class="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-gs border-0 focus:ring-2 focus:ring-gs-gold outline-none"
          />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        {/* Your Primary Team */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Your Primary Care Team</h3>
          <div class="space-y-3">
            {[
              { name: 'Dr. Sherif Akram Metwalli', specialty: 'Lead Bariatric & Colorectal Surgeon', hospital: 'Bielefeld University Hospitals, Germany', rating: 4.9, available: true },
              { name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', hospital: 'German Select Egypt', rating: 4.9, available: true },
              { name: 'Dr. K. Müller', specialty: 'Cardiologist', hospital: 'University Hospital Kiel, Germany', rating: 4.8, available: true }
            ].map((doctor) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class="w-14 h-14 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-md text-gs-gold text-xl"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gs-navy">{doctor.name}</h4>
                    <p class="text-gs-gold text-sm">{doctor.specialty}</p>
                    <p class="text-gray-500 text-xs mt-1">{doctor.hospital}</p>
                    <div class="flex items-center gap-3 mt-2">
                      <div class="flex items-center gap-1">
                        <i class="fas fa-star text-gs-gold text-xs"></i>
                        <span class="text-xs font-medium">{doctor.rating}</span>
                      </div>
                      <span class={`text-xs px-2 py-0.5 rounded-full ${doctor.available ? 'bg-gs-green/10 text-gs-green' : 'bg-gray-100 text-gray-500'}`}>
                        {doctor.available ? 'Available' : 'Busy'}
                      </span>
                      <span class="text-xs text-gray-400">German Certified</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 mt-4">
                  <a href="/patient/telemedicine" class="flex-1 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg text-center hover:bg-gs-navy-light transition-colors">
                    <i class="fas fa-video mr-2"></i>Video Call
                  </a>
                  <a href="/patient/messages" class="flex-1 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg text-center hover:bg-gray-200 transition-colors">
                    <i class="fas fa-comment mr-2"></i>Message
                  </a>
                  <button class="w-10 h-10 bg-gray-100 text-gs-navy rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Support Team */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Support Team</h3>
          <div class="space-y-3">
            {[
              { name: 'Dr. A. Schmidt', specialty: 'Nutritionist', role: 'Nutrition & Diet Planning', available: true },
              { name: 'M. Hassan', specialty: 'Physiotherapist', role: 'Rehabilitation & Exercise', available: true },
              { name: 'S. Ahmed', specialty: 'Care Coordinator', role: 'Patient Liaison & Logistics', available: true },
              { name: 'Dr. H. El Zahi', specialty: 'Post-Bariatric Plastic Surgeon', role: 'Body Contouring Consultant', available: false }
            ].map((member) => (
              <Card className="p-3">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-gs-navy/10 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-gs-navy"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm text-gs-navy">{member.name}</h4>
                    <p class="text-xs text-gs-gold">{member.specialty}</p>
                    <p class="text-xs text-gray-500">{member.role}</p>
                  </div>
                  <div class="flex gap-2">
                    <button class={`w-9 h-9 rounded-full ${member.available ? 'bg-gs-green/10 text-gs-green hover:bg-gs-green/20' : 'bg-gray-100 text-gray-400'} transition-colors`}>
                      <i class="fas fa-video text-sm"></i>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-gs-navy/10 text-gs-navy hover:bg-gs-navy/20 transition-colors">
                      <i class="fas fa-comment text-sm"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Find Specialists */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Find More Specialists</h3>
          <div class="grid grid-cols-3 gap-3">
            {[
              { icon: 'fa-tooth', label: 'Dental', count: 5 },
              { icon: 'fa-eye', label: 'Ophthalmology', count: 3 },
              { icon: 'fa-spa', label: 'Aesthetics', count: 8 },
              { icon: 'fa-brain', label: 'Neurology', count: 2 },
              { icon: 'fa-bone', label: 'Orthopedics', count: 6 },
              { icon: 'fa-lungs', label: 'Pulmonology', count: 2 }
            ].map((specialty) => (
              <Card className="p-3 text-center hover:shadow-gs-lg transition-all cursor-pointer">
                <div class="w-10 h-10 rounded-full bg-gs-gold/10 flex items-center justify-center mx-auto mb-2">
                  <i class={`fas ${specialty.icon} text-gs-gold`}></i>
                </div>
                <p class="text-xs font-medium text-gs-navy">{specialty.label}</p>
                <p class="text-xs text-gray-400">{specialty.count} doctors</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Emergency Contact */}
        <Card className="p-4 bg-gs-red/5 border border-gs-red/20">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gs-red/10 flex items-center justify-center">
              <i class="fas fa-ambulance text-gs-red text-lg"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gs-red">Emergency Support</h4>
              <p class="text-sm text-gray-600">24/7 Medical Emergency Line</p>
            </div>
            <a href="tel:+201234567890" class="w-12 h-12 rounded-full bg-gs-red text-white flex items-center justify-center hover:bg-red-600 transition-colors">
              <i class="fas fa-phone"></i>
            </a>
          </div>
        </Card>
        
        {/* Schedule Consultation Button */}
        <a href="/patient/booking" class="block w-full py-4 bg-gs-gold text-gs-navy font-bold rounded-xl text-center hover:bg-gs-gold-dark transition-colors shadow-gs">
          <i class="fas fa-calendar-plus mr-2"></i>
          Schedule New Consultation
        </a>
      </main>
    </PageWrapper>
  )
}
