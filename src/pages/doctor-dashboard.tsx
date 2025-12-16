import { Context } from 'hono'
import { Card } from '../components/layout'

export const doctorDashboard = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gs-cream">
      {/* Doctor Header */}
      <header class="bg-gs-navy text-white px-4 py-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gs-gold flex items-center justify-center">
              <i class="fas fa-user-md text-gs-navy text-lg"></i>
            </div>
            <div>
              <h1 class="font-bold">Dr. L. Weber</h1>
              <p class="text-sm text-white/70">Orthopedic Surgeon</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors relative">
              <i class="fas fa-bell"></i>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-gs-red text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            <button class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <i class="fas fa-cog"></i>
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div class="grid grid-cols-4 gap-3">
          {[
            { label: "Today's Patients", value: '12', icon: 'fa-users' },
            { label: 'Pending Reviews', value: '8', icon: 'fa-clock' },
            { label: 'RPM Alerts', value: '3', icon: 'fa-exclamation-triangle', alert: true },
            { label: 'Messages', value: '15', icon: 'fa-envelope' }
          ].map((stat) => (
            <div class="bg-white/10 rounded-lg p-3 text-center">
              <div class={`w-8 h-8 rounded-full ${stat.alert ? 'bg-gs-red/20' : 'bg-gs-gold/20'} flex items-center justify-center mx-auto mb-2`}>
                <i class={`fas ${stat.icon} ${stat.alert ? 'text-gs-red' : 'text-gs-gold'} text-sm`}></i>
              </div>
              <p class="text-xl font-bold">{stat.value}</p>
              <p class="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </header>
      
      <main class="px-4 py-4 space-y-6">
        {/* RPM Alerts */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gs-red animate-pulse"></span>
              RPM Alerts
            </h3>
            <a href="#" class="text-xs text-gs-gold">View All</a>
          </div>
          
          <div class="space-y-3">
            {[
              { patient: 'Max Mustermann', alert: 'Elevated BP: 145/92 mmHg', time: '10 min ago', severity: 'warning' },
              { patient: 'Anna Schmidt', alert: 'Low SpO2: 93%', time: '25 min ago', severity: 'critical' },
              { patient: 'Peter Müller', alert: 'Missed medication check-in', time: '1 hour ago', severity: 'info' }
            ].map((alert) => (
              <Card className={`p-4 border-l-4 ${
                alert.severity === 'critical' ? 'border-gs-red bg-gs-red/5' :
                alert.severity === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                'border-gs-blue bg-gs-blue/5'
              }`}>
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-gs-navy">{alert.patient}</h4>
                    <p class="text-sm text-gray-600">{alert.alert}</p>
                    <p class="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <div class="flex gap-2">
                    <button class="w-9 h-9 rounded-full bg-gs-green text-white hover:bg-green-600 transition-colors">
                      <i class="fas fa-phone text-sm"></i>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-gs-navy text-white hover:bg-gs-navy-light transition-colors">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Today's Schedule */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Today's Schedule</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Oct 21, 2024</span>
              <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <i class="fas fa-calendar text-gray-600 text-sm"></i>
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            {[
              { time: '9:00 AM', patient: 'Max Mustermann', type: 'Post-op Follow-up', method: 'video', status: 'completed' },
              { time: '10:00 AM', patient: 'Klaus Weber', type: 'Initial Consultation', method: 'video', status: 'current' },
              { time: '11:00 AM', patient: 'Emma Fischer', type: 'Pre-op Assessment', method: 'onsite', status: 'upcoming' },
              { time: '2:00 PM', patient: 'Hans Müller', type: 'Second Opinion', method: 'video', status: 'upcoming' },
              { time: '3:30 PM', patient: 'Lisa König', type: 'X-Ray Review', method: 'video', status: 'upcoming' },
              { time: '4:30 PM', patient: 'Michael Braun', type: 'Post-op 6-week', method: 'video', status: 'upcoming' }
            ].map((apt) => (
              <Card className={`p-3 ${apt.status === 'current' ? 'ring-2 ring-gs-gold' : ''}`}>
                <div class="flex items-center gap-3">
                  <div class="w-16 text-center">
                    <p class={`text-sm font-medium ${apt.status === 'current' ? 'text-gs-gold' : 'text-gs-navy'}`}>{apt.time}</p>
                  </div>
                  <div class={`w-1 h-12 rounded-full ${
                    apt.status === 'completed' ? 'bg-gs-green' :
                    apt.status === 'current' ? 'bg-gs-gold' :
                    'bg-gray-200'
                  }`}></div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-sm text-gs-navy">{apt.patient}</h4>
                    <p class="text-xs text-gray-500">{apt.type}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class={`w-8 h-8 rounded-full flex items-center justify-center ${apt.method === 'video' ? 'bg-gs-blue/10 text-gs-blue' : 'bg-gs-green/10 text-gs-green'}`}>
                      <i class={`fas ${apt.method === 'video' ? 'fa-video' : 'fa-hospital'} text-xs`}></i>
                    </span>
                    {apt.status === 'current' && (
                      <button class="px-3 py-1 bg-gs-gold text-gs-navy text-xs font-bold rounded-full">
                        Join
                      </button>
                    )}
                    {apt.status === 'completed' && (
                      <span class="px-2 py-1 bg-gs-green/10 text-gs-green text-xs rounded-full">Done</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Patient Panel */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">My Patients</h3>
            <div class="flex gap-2">
              <input 
                type="text" 
                placeholder="Search patients..." 
                class="w-40 px-3 py-1.5 bg-white rounded-lg text-sm border-0 focus:ring-2 focus:ring-gs-gold outline-none"
              />
              <button class="px-3 py-1.5 bg-gs-navy text-white text-sm rounded-lg">
                <i class="fas fa-filter mr-1"></i>Filter
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Max Mustermann', surgery: 'Knee Replacement', status: 'Recovery', progress: 75, phase: 'Week 2', alerts: 1 },
              { name: 'Anna Schmidt', surgery: 'Hip Replacement', status: 'Recovery', progress: 45, phase: 'Week 1', alerts: 2 },
              { name: 'Peter Müller', surgery: 'Spine Surgery', status: 'Pre-op', progress: 80, phase: 'Week -1', alerts: 0 },
              { name: 'Emma Fischer', surgery: 'Knee Arthroscopy', status: 'Scheduled', progress: 100, phase: 'Pre-op Done', alerts: 0 }
            ].map((patient) => (
              <Card className="p-4">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gs-gold/10 flex items-center justify-center">
                      <i class="fas fa-user text-gs-gold"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gs-navy">{patient.name}</h4>
                      <p class="text-xs text-gray-500">{patient.surgery}</p>
                    </div>
                  </div>
                  {patient.alerts > 0 && (
                    <span class="w-6 h-6 bg-gs-red text-white text-xs rounded-full flex items-center justify-center">
                      {patient.alerts}
                    </span>
                  )}
                </div>
                
                <div class="flex items-center gap-3 mb-3">
                  <div class="flex-1">
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-gray-500">{patient.phase}</span>
                      <span class="text-gs-gold font-medium">{patient.progress}%</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-gs-gold rounded-full" style={{ width: `${patient.progress}%` }}></div>
                    </div>
                  </div>
                  <span class={`px-2 py-1 text-xs rounded-full ${
                    patient.status === 'Recovery' ? 'bg-gs-green/10 text-gs-green' :
                    patient.status === 'Pre-op' ? 'bg-gs-gold/10 text-gs-gold' :
                    'bg-gs-blue/10 text-gs-blue'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                
                <div class="flex gap-2">
                  <button class="flex-1 py-2 bg-gs-navy text-white text-xs font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                    <i class="fas fa-chart-line mr-1"></i>View Progress
                  </button>
                  <button class="flex-1 py-2 bg-gray-100 text-gs-navy text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-video mr-1"></i>Call
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Quick Actions</h3>
          <div class="grid grid-cols-4 gap-3">
            {[
              { icon: 'fa-prescription', label: 'E-Prescribe', color: 'gs-green' },
              { icon: 'fa-file-medical', label: 'New Note', color: 'gs-blue' },
              { icon: 'fa-share-square', label: 'Refer Patient', color: 'gs-purple' },
              { icon: 'fa-chart-bar', label: 'Reports', color: 'gs-gold' }
            ].map((action) => (
              <Card className="p-4 text-center cursor-pointer hover:shadow-gs-lg transition-all">
                <div class={`w-12 h-12 rounded-xl bg-${action.color}/10 flex items-center justify-center mx-auto mb-2`}>
                  <i class={`fas ${action.icon} text-${action.color} text-lg`}></i>
                </div>
                <p class="text-xs font-medium text-gs-navy">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Care Plan Templates */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Care Plan Templates</h3>
            <button class="text-xs text-gs-gold">+ Create New</button>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: 'Knee Replacement Protocol', patients: 45, duration: '12 weeks' },
              { name: 'Hip Surgery Recovery', patients: 32, duration: '10 weeks' },
              { name: 'Spine Surgery Plan', patients: 18, duration: '16 weeks' },
              { name: 'Arthroscopy Recovery', patients: 28, duration: '6 weeks' }
            ].map((template) => (
              <Card className="flex-shrink-0 w-48 p-4">
                <h5 class="font-semibold text-sm text-gs-navy mb-2">{template.name}</h5>
                <div class="flex justify-between text-xs text-gray-500">
                  <span><i class="fas fa-users mr-1"></i>{template.patients}</span>
                  <span><i class="fas fa-clock mr-1"></i>{template.duration}</span>
                </div>
                <button class="w-full mt-3 py-1.5 bg-gray-100 text-gs-navy text-xs font-medium rounded hover:bg-gray-200 transition-colors">
                  Use Template
                </button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <Card className="p-4 bg-gs-navy text-white">
          <h4 class="font-bold mb-4">This Month's Performance</h4>
          <div class="grid grid-cols-4 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-gs-gold">48</p>
              <p class="text-xs text-white/60">Consultations</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gs-gold">12</p>
              <p class="text-xs text-white/60">Surgeries</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gs-gold">98%</p>
              <p class="text-xs text-white/60">Satisfaction</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gs-gold">4.9</p>
              <p class="text-xs text-white/60">Rating</p>
            </div>
          </div>
        </Card>
      </main>
      
      {/* Doctor Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div class="flex justify-around items-center max-w-md mx-auto">
          {[
            { icon: 'fa-home', label: 'Dashboard', href: '/doctor', active: true },
            { icon: 'fa-users', label: 'Patients', href: '#' },
            { icon: 'fa-calendar', label: 'Schedule', href: '#' },
            { icon: 'fa-comments', label: 'Messages', href: '#' },
            { icon: 'fa-chart-line', label: 'Analytics', href: '#' }
          ].map((item) => (
            <a 
              href={item.href} 
              class={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
                item.active 
                  ? 'text-gs-gold' 
                  : 'text-gray-400 hover:text-gs-navy'
              }`}
            >
              <i class={`fas ${item.icon} text-xl mb-1`}></i>
              <span class="text-xs font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      
      <div class="h-20"></div>
    </div>
  )
}
