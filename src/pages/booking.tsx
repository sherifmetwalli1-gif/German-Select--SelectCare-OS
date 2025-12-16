import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const bookingPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Book Appointment" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Booking Type Tabs */}
        <div class="grid grid-cols-2 gap-3">
          <button class="p-4 bg-gs-navy text-white rounded-xl text-center">
            <i class="fas fa-video text-2xl mb-2"></i>
            <p class="text-sm font-medium">Telemedicine</p>
          </button>
          <button class="p-4 bg-white text-gs-navy rounded-xl text-center shadow-gs hover:shadow-gs-lg transition-all">
            <i class="fas fa-hospital text-2xl text-gs-gold mb-2"></i>
            <p class="text-sm font-medium">Onsite Visit</p>
          </button>
        </div>
        
        {/* Select Specialty */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Select Specialty</h3>
          <div class="grid grid-cols-3 gap-3">
            {[
              { icon: 'fa-bone', name: 'Orthopedics', available: 6 },
              { icon: 'fa-heart', name: 'Cardiology', available: 4 },
              { icon: 'fa-weight', name: 'Bariatric', available: 5 },
              { icon: 'fa-smile', name: 'Aesthetics', available: 8 },
              { icon: 'fa-apple-alt', name: 'Nutrition', available: 3 },
              { icon: 'fa-running', name: 'Physio', available: 5 }
            ].map((specialty) => (
              <Card className="p-3 text-center cursor-pointer hover:shadow-gs-lg hover:border-gs-gold border-2 border-transparent transition-all">
                <div class="w-10 h-10 rounded-full bg-gs-gold/10 flex items-center justify-center mx-auto mb-2">
                  <i class={`fas ${specialty.icon} text-gs-gold`}></i>
                </div>
                <p class="text-xs font-medium text-gs-navy">{specialty.name}</p>
                <p class="text-xs text-gray-400">{specialty.available} available</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Select Doctor */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Available Doctors</h3>
          <div class="space-y-3">
            {[
              { name: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', nextSlot: 'Today, 3:00 PM', rating: 4.9, price: '€150' },
              { name: 'Dr. K. Müller', specialty: 'Cardiologist', nextSlot: 'Tomorrow, 10:00 AM', rating: 4.8, price: '€180' },
              { name: 'Dr. A. Schmidt', specialty: 'Nutritionist', nextSlot: 'Today, 5:30 PM', rating: 4.7, price: '€90' }
            ].map((doctor) => (
              <Card className="p-4 cursor-pointer hover:shadow-gs-lg hover:border-gs-gold border-2 border-transparent transition-all">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-md text-gs-gold"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gs-navy">{doctor.name}</h4>
                    <p class="text-xs text-gs-gold">{doctor.specialty}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <i class="fas fa-star text-gs-gold text-xs"></i>
                      <span class="text-xs">{doctor.rating}</span>
                      <span class="text-xs text-gray-400">•</span>
                      <span class="text-xs text-gs-green">{doctor.nextSlot}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gs-navy">{doctor.price}</p>
                    <p class="text-xs text-gray-400">per session</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Select Date */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Select Date</h3>
          <Card className="p-4">
            <div class="flex justify-between items-center mb-4">
              <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <i class="fas fa-chevron-left text-gray-600 text-sm"></i>
              </button>
              <span class="font-medium text-gs-navy">October 2024</span>
              <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <i class="fas fa-chevron-right text-gray-600 text-sm"></i>
              </button>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div class="text-xs text-gray-400 font-medium py-2">{day}</div>
              ))}
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center">
              {/* Empty days for October starting on Tuesday */}
              <div></div><div></div>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button class={`py-2 rounded-lg text-sm ${
                  day === 22 ? 'bg-gs-gold text-gs-navy font-bold' : 
                  day < 21 ? 'text-gray-300' :
                  [21, 23, 25, 28, 30].includes(day) ? 'bg-gs-green/10 text-gs-green hover:bg-gs-green/20' :
                  'text-gray-600 hover:bg-gray-100'
                } transition-colors`}>
                  {day}
                </button>
              ))}
            </div>
            
            <div class="flex items-center gap-4 mt-4 text-xs">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-gs-green/10"></div>
                <span class="text-gray-500">Available</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-gs-gold"></div>
                <span class="text-gray-500">Selected</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Select Time */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Available Times</h3>
          <div class="grid grid-cols-3 gap-2">
            {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:30 PM'].map((time, idx) => (
              <button class={`py-3 rounded-lg text-sm font-medium transition-all ${
                idx === 1 ? 'bg-gs-gold text-gs-navy' : 'bg-white text-gs-navy hover:bg-gray-50 shadow-gs'
              }`}>
                {time}
              </button>
            ))}
          </div>
        </div>
        
        {/* Consultation Type */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Consultation Type</h3>
          <div class="space-y-2">
            {[
              { type: 'Initial Consultation', duration: '30 min', price: '€150', desc: 'First-time visit or new concern' },
              { type: 'Follow-up', duration: '15 min', price: '€90', desc: 'Continue treatment discussion' },
              { type: 'Second Opinion', duration: '45 min', price: '€250', desc: 'Expert review of diagnosis' }
            ].map((consult, idx) => (
              <Card className={`p-4 cursor-pointer border-2 transition-all ${idx === 0 ? 'border-gs-gold bg-gs-gold/5' : 'border-transparent hover:border-gs-gold/50'}`}>
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gs-navy">{consult.type}</h4>
                    <p class="text-xs text-gray-500">{consult.desc}</p>
                    <p class="text-xs text-gs-gold mt-1">{consult.duration}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gs-navy">{consult.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Additional Notes</h3>
          <textarea 
            class="w-full p-4 bg-white rounded-xl shadow-gs border-0 focus:ring-2 focus:ring-gs-gold outline-none resize-none"
            rows={3}
            placeholder="Describe your symptoms or reason for visit..."
          ></textarea>
        </div>
        
        {/* Booking Summary */}
        <Card className="p-4 bg-gs-navy text-white">
          <h4 class="font-bold mb-3">Booking Summary</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/70">Doctor</span>
              <span>Dr. K. Müller</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Date & Time</span>
              <span>Oct 22, 10:00 AM</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Type</span>
              <span>Initial Consultation</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Method</span>
              <span>Telemedicine (Video)</span>
            </div>
            <div class="border-t border-white/20 pt-2 mt-2 flex justify-between">
              <span class="font-bold">Total</span>
              <span class="text-gs-gold font-bold">€150.00</span>
            </div>
          </div>
        </Card>
        
        {/* Book Button */}
        <button class="w-full py-4 bg-gs-gold text-gs-navy font-bold rounded-xl hover:bg-gs-gold-dark transition-colors shadow-gs">
          <i class="fas fa-calendar-check mr-2"></i>
          Confirm Booking
        </button>
        
        <p class="text-center text-xs text-gray-400">
          You can cancel or reschedule up to 24 hours before the appointment
        </p>
      </main>
    </PageWrapper>
  )
}
