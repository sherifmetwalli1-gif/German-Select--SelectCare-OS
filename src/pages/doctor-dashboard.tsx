import { Context } from 'hono'
import { Header, Card } from '../components/layout'

export const doctorDashboard = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gs-cream">
      {/* Doctor Header */}
      <header class="bg-gs-navy text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-gs">
        <div class="flex items-center gap-3">
          <h1 class="text-lg font-semibold tracking-wide">SelectCareOS™</h1>
          <span class="px-2 py-0.5 bg-gs-gold text-gs-navy text-xs font-medium rounded-full">Doctor</span>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative">
            <i class="fas fa-bell text-white/80 hover:text-white"></i>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-gs-red text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          <a href="/patient/profile" class="w-9 h-9 rounded-full bg-gs-gold flex items-center justify-center hover:bg-gs-gold-dark transition-colors">
            <i class="fas fa-user-md text-gs-navy text-sm"></i>
          </a>
        </div>
      </header>
      
      <main class="px-4 py-4 pb-24 space-y-6">
        {/* Welcome Card */}
        <Card className="p-4 bg-gradient-to-r from-gs-navy to-gs-navy-light text-white">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gs-gold/20 flex items-center justify-center">
              <i class="fas fa-user-md text-gs-gold text-xl"></i>
            </div>
            <div>
              <p class="text-white/60 text-sm">Welcome back,</p>
              <h2 class="text-xl font-bold">Dr. L. Weber</h2>
              <p class="text-gs-gold text-sm">Orthopedic Surgeon</p>
            </div>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div class="grid grid-cols-4 gap-3">
          {[
            { icon: 'fa-calendar-check', value: '8', label: 'Today', color: 'gs-blue' },
            { icon: 'fa-users', value: '24', label: 'Patients', color: 'gs-gold' },
            { icon: 'fa-bell', value: '3', label: 'Alerts', color: 'gs-red' },
            { icon: 'fa-comment-medical', value: '12', label: 'Messages', color: 'gs-green' }
          ].map((stat) => (
            <Card className="p-3 text-center">
              <div class={`w-8 h-8 rounded-full bg-${stat.color}/10 flex items-center justify-center mx-auto mb-2`}>
                <i class={`fas ${stat.icon} text-${stat.color} text-sm`}></i>
              </div>
              <p class="text-xl font-bold text-gs-navy">{stat.value}</p>
              <p class="text-xs text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </div>
        
        {/* RPM Alerts */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-exclamation-triangle text-gs-red"></i>
              RPM Alerts
            </h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            {[
              { patient: 'Max Mustermann', alert: 'Elevated BP: 145/92 mmHg', time: '10 min ago', severity: 'high' },
              { patient: 'Anna Schmidt', alert: 'Low SpO2: 94%', time: '25 min ago', severity: 'medium' },
              { patient: 'Thomas Müller', alert: 'Missed medication reminder', time: '1 hour ago', severity: 'low' }
            ].map((alert) => (
              <Card className={`p-3 border-l-4 ${
                alert.severity === 'high' ? 'border-gs-red bg-gs-red/5' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-gs-blue bg-gs-blue/5'
              }`}>
                <div class="flex items-start gap-3">
                  <div class={`w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-gs-red/10 text-gs-red' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gs-blue/10 text-gs-blue'
                  }`}>
                    <i class="fas fa-user text-sm"></i>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-sm text-gs-navy">{alert.patient}</p>
                    <p class="text-xs text-gray-600">{alert.alert}</p>
                    <p class="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <button class="px-3 py-1 bg-gs-navy text-white text-xs font-medium rounded hover:bg-gs-navy-light transition-colors">
                    Review
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Today's Schedule */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Today's Schedule</h3>
            <span class="text-xs text-gray-500">Oct 22, 2024</span>
          </div>
          <div class="space-y-3">
            {[
              { time: '9:00 AM', patient: 'Hans Weber', type: 'Follow-up', method: 'video', status: 'completed' },
              { time: '10:00 AM', patient: 'Max Mustermann', type: 'Cardiology Consult', method: 'video', status: 'current' },
              { time: '11:30 AM', patient: 'Maria Klein', type: 'Pre-Op Assessment', method: 'video', status: 'upcoming' },
              { time: '2:00 PM', patient: 'Peter Fischer', type: 'Post-Op Review', method: 'onsite', status: 'upcoming' },
              { time: '3:30 PM', patient: 'Sophie Braun', type: 'Initial Consult', method: 'video', status: 'upcoming' }
            ].map((appt) => (
              <Card className={`p-3 ${appt.status === 'current' ? 'ring-2 ring-gs-green' : ''}`}>
                <div class="flex items-center gap-3">
                  <div class="text-center w-16">
                    <p class="text-sm font-bold text-gs-navy">{appt.time}</p>
                    <span class={`text-xs px-2 py-0.5 rounded-full ${
                      appt.method === 'video' ? 'bg-gs-blue/10 text-gs-blue' : 'bg-gs-green/10 text-gs-green'
                    }`}>
                      <i class={`fas ${appt.method === 'video' ? 'fa-video' : 'fa-hospital'} mr-1`}></i>
                      {appt.method}
                    </span>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-sm text-gs-navy">{appt.patient}</p>
                    <p class="text-xs text-gray-500">{appt.type}</p>
                  </div>
                  {appt.status === 'completed' && (
                    <span class="text-xs text-gs-green"><i class="fas fa-check-circle mr-1"></i>Done</span>
                  )}
                  {appt.status === 'current' && (
                    <button class="px-3 py-2 bg-gs-green text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                      <i class="fas fa-video mr-1"></i>Join
                    </button>
                  )}
                  {appt.status === 'upcoming' && (
                    <button class="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      Details
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Patient Panel */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Active Patients</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All (24)</a>
          </div>
          <div class="space-y-3">
            {[
              { name: 'Max Mustermann', condition: 'Knee Replacement Recovery', week: 2, progress: 75, nextAppt: 'Today, 10:00 AM' },
              { name: 'Anna Schmidt', condition: 'Gastric Sleeve Post-Op', week: 4, progress: 60, nextAppt: 'Oct 24' },
              { name: 'Thomas Müller', condition: 'Hip Replacement Recovery', week: 6, progress: 90, nextAppt: 'Oct 25' }
            ].map((patient) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-gs-gold"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="font-semibold text-gs-navy">{patient.name}</h4>
                      <span class="text-xs bg-gs-navy/10 text-gs-navy px-2 py-0.5 rounded-full">Week {patient.week}</span>
                    </div>
                    <p class="text-xs text-gray-500">{patient.condition}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-gs-gold rounded-full" style={`width: ${patient.progress}%`}></div>
                      </div>
                      <span class="text-xs text-gs-gold font-medium">{patient.progress}%</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-2"><i class="fas fa-calendar mr-1"></i>Next: {patient.nextAppt}</p>
                  </div>
                </div>
                <div class="flex gap-2 mt-3">
                  <button class="flex-1 py-1.5 bg-gs-navy text-white text-xs font-medium rounded hover:bg-gs-navy-light transition-colors">
                    <i class="fas fa-chart-line mr-1"></i>Vitals
                  </button>
                  <button class="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded hover:bg-gray-200 transition-colors">
                    <i class="fas fa-file-medical mr-1"></i>Records
                  </button>
                  <button class="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded hover:bg-gray-200 transition-colors">
                    <i class="fas fa-comment mr-1"></i>Message
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Quick Actions</h3>
          <div class="grid grid-cols-3 gap-3">
            {[
              { icon: 'fa-user-plus', label: 'Add Patient' },
              { icon: 'fa-prescription', label: 'E-Prescribe' },
              { icon: 'fa-file-medical-alt', label: 'New Note' },
              { icon: 'fa-calendar-plus', label: 'Schedule' },
              { icon: 'fa-chart-bar', label: 'Analytics' },
              { icon: 'fa-cog', label: 'Settings' }
            ].map((action) => (
              <Card className="p-3 text-center cursor-pointer hover:shadow-gs-lg transition-all">
                <div class="w-10 h-10 rounded-full bg-gs-navy/10 flex items-center justify-center mx-auto mb-2">
                  <i class={`fas ${action.icon} text-gs-navy`}></i>
                </div>
                <p class="text-xs font-medium text-gray-600">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <Card className="p-4">
          <h4 class="font-bold text-gs-navy mb-4">This Month</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gs-green/10 rounded-lg">
              <p class="text-2xl font-bold text-gs-green">98%</p>
              <p class="text-xs text-gray-500">Patient Satisfaction</p>
            </div>
            <div class="text-center p-3 bg-gs-blue/10 rounded-lg">
              <p class="text-2xl font-bold text-gs-blue">156</p>
              <p class="text-xs text-gray-500">Consultations</p>
            </div>
            <div class="text-center p-3 bg-gs-gold/10 rounded-lg">
              <p class="text-2xl font-bold text-gs-gold">4.9</p>
              <p class="text-xs text-gray-500">Average Rating</p>
            </div>
            <div class="text-center p-3 bg-gs-purple/10 rounded-lg">
              <p class="text-2xl font-bold text-gs-purple">92%</p>
              <p class="text-xs text-gray-500">Recovery Success</p>
            </div>
          </div>
        </Card>
      </main>
      
      {/* Doctor Bottom Nav */}
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div class="flex justify-around items-center max-w-md mx-auto">
          {[
            { icon: 'fa-home', label: 'Dashboard', href: '/doctor', active: true },
            { icon: 'fa-users', label: 'Patients', href: '#' },
            { icon: 'fa-calendar', label: 'Schedule', href: '#' },
            { icon: 'fa-comments', label: 'Messages', href: '/patient/messages' },
            { icon: 'fa-user-md', label: 'Profile', href: '/patient/profile' }
          ].map((item) => (
            <a 
              href={item.href} 
              class={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
                item.active ? 'text-gs-gold' : 'text-gray-400 hover:text-gs-navy'
              }`}
            >
              <i class={`fas ${item.icon} text-xl mb-1`}></i>
              <span class="text-xs font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
