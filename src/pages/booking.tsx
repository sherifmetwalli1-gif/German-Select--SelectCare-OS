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
        
        {/* Select Doctor - Premium Enhanced */}
        <div>
          <h3 class="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
            <i class="fas fa-user-doctor text-brand-500"></i>
            Available Doctors
          </h3>
          <div class="space-y-4">
            {[
              { 
                name: 'Dr. L. Weber', 
                initials: 'LW',
                specialty: 'Orthopedic Surgeon', 
                specialtyColor: 'brand',
                nextSlot: 'Today, 3:00 PM', 
                rating: 4.9, 
                reviewCount: 420,
                price: '€150',
                experience: '15+ years',
                certifications: ['Board Certified', 'German License'],
                availability: 'high',
                bio: 'Specialized in joint replacement and sports medicine. Trained in Berlin.'
              },
              { 
                name: 'Dr. K. Müller', 
                initials: 'KM',
                specialty: 'Cardiologist', 
                specialtyColor: 'teal',
                nextSlot: 'Tomorrow, 10:00 AM', 
                rating: 4.8, 
                reviewCount: 380,
                price: '€180',
                experience: '20+ years',
                certifications: ['Board Certified', 'EU Recognition'],
                availability: 'medium',
                bio: 'Expert in interventional cardiology. Munich University graduate.'
              },
              { 
                name: 'Dr. A. Schmidt', 
                initials: 'AS',
                specialty: 'Nutritionist', 
                specialtyColor: 'emerald',
                nextSlot: 'Today, 5:30 PM', 
                rating: 4.7, 
                reviewCount: 290,
                price: '€90',
                experience: '10+ years',
                certifications: ['Certified Nutritionist', 'Bariatric Specialist'],
                availability: 'high',
                bio: 'Focus on medical nutrition therapy and weight management programs.'
              }
            ].map((doctor) => (
              <div class="group relative">
                <Card className="p-5 cursor-pointer hover:shadow-card-hover hover:border-brand-500 border-2 border-transparent transition-all card-lift overflow-hidden">
                  {/* Availability Heat Indicator */}
                  <div class="absolute top-3 right-3 z-10">
                    {doctor.availability === 'high' ? (
                      <div class="px-3 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-soft">
                        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        High Availability
                      </div>
                    ) : (
                      <div class="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-soft">
                        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Limited Slots
                      </div>
                    )}
                  </div>
                  
                  <div class="flex items-start gap-4">
                    {/* Premium Gradient Avatar */}
                    <div class="relative flex-shrink-0">
                      <div class={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${doctor.specialtyColor}-400 to-${doctor.specialtyColor}-600 flex items-center justify-center text-white text-xl font-extrabold shadow-soft group-hover:scale-105 transition-transform`}>
                        {doctor.initials}
                      </div>
                      {/* Verification Badge */}
                      <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-soft border-2 border-white">
                        <i class="fas fa-badge-check text-white text-xs"></i>
                      </div>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2 mb-2">
                        <div class="flex-1">
                          <h4 class="font-bold text-navy-900 text-base mb-0.5">{doctor.name}</h4>
                          <p class={`text-xs text-${doctor.specialtyColor}-600 font-semibold mb-1`}>{doctor.specialty}</p>
                          
                          {/* Certifications */}
                          <div class="flex items-center gap-1.5 flex-wrap mb-2">
                            <span class="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded-full">{doctor.experience}</span>
                            {doctor.certifications.map(cert => (
                              <span class="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-medium rounded-full flex items-center gap-1">
                                <i class="fas fa-certificate text-[8px]"></i>{cert}
                              </span>
                            ))}
                          </div>
                          
                          {/* Rating & Reviews */}
                          <div class="flex items-center gap-3 text-xs mb-2">
                            <div class="flex items-center gap-1">
                              <i class="fas fa-star text-amber-400"></i>
                              <span class="font-bold text-navy-900">{doctor.rating}</span>
                              <span class="text-slate-400">({doctor.reviewCount} reviews)</span>
                            </div>
                          </div>
                          
                          {/* Next Slot with Urgency */}
                          <div class="flex items-center gap-2 text-xs">
                            <i class="fas fa-clock text-emerald-500"></i>
                            <span class="font-semibold text-emerald-600">{doctor.nextSlot}</span>
                            {doctor.nextSlot.includes('Today') && (
                              <span class="px-2 py-0.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-[10px] font-bold rounded-full">
                                Available Now
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div class="text-right">
                          <p class="text-2xl font-extrabold text-navy-900">{doctor.price}</p>
                          <p class="text-xs text-slate-400">per session</p>
                        </div>
                      </div>
                      
                      {/* Expandable Bio on Hover */}
                      <div class="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                        <div class="pt-3 border-t border-slate-200 mt-3">
                          <p class="text-xs text-slate-600 leading-relaxed italic">{doctor.bio}</p>
                          <div class="flex items-center gap-2 mt-2">
                            <button class="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl hover:bg-navy-800 transition-colors shadow-soft">
                              Book Appointment
                            </button>
                            <button class="px-4 py-2 bg-slate-100 text-navy-900 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
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
