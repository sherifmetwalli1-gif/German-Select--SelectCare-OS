import { Context } from 'hono'
import { Logo, StatusBadge } from '../components/layout'

export const doctorDashboard = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-28">
      {/* Premium Doctor Header */}
      <header class="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 bg-mesh-gold opacity-10"></div>
        <div class="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div class="relative px-4 pt-4 pb-8">
          {/* Top Bar */}
          <div class="flex items-center justify-between mb-8">
            <Logo size="small" theme="dark" />
            <div class="flex items-center gap-3">
              <button class="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 relative group">
                <i class="fas fa-bell text-white/90 group-hover:text-brand-400 transition-colors"></i>
                <span class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-danger-500 to-danger-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">7</span>
              </button>
              <button class="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 group">
                <i class="fas fa-gear text-white/90 group-hover:text-brand-400 transition-colors"></i>
              </button>
            </div>
          </div>
          
          {/* Doctor Profile Card */}
          <div class="bg-white/5 backdrop-blur-lg rounded-3xl p-5 border border-white/10 mb-6">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 flex items-center justify-center shadow-glow-brand ring-4 ring-brand-400/20">
                  <i class="fas fa-user-doctor text-navy-900 text-3xl"></i>
                </div>
                <div class="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl border-3 border-navy-900 flex items-center justify-center shadow-lg">
                  <i class="fas fa-check text-white text-xs"></i>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h1 class="text-2xl font-bold">Dr. Lukas Weber</h1>
                  <span class="px-2 py-0.5 bg-brand-500/20 text-brand-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Pro</span>
                </div>
                <p class="text-brand-400 font-semibold text-sm mb-1">Orthopedic Surgeon</p>
                <div class="flex items-center gap-3 text-xs text-slate-400">
                  <span><i class="fas fa-hospital mr-1 text-teal-400"></i>University Hospital Bielefeld</span>
                  <span class="flex items-center gap-1">
                    <i class="fas fa-star text-brand-400"></i>4.9
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Grid - Premium Design */}
          <div class="grid grid-cols-4 gap-3">
            {[
              { label: 'Today', value: '12', sublabel: 'Patients', icon: 'fa-users', color: 'brand', gradient: 'from-brand-400 to-brand-600' },
              { label: 'Pending', value: '8', sublabel: 'Reviews', icon: 'fa-clipboard-list', color: 'info', gradient: 'from-info-400 to-info-600' },
              { label: 'Active', value: '3', sublabel: 'RPM Alerts', icon: 'fa-triangle-exclamation', color: 'danger', gradient: 'from-danger-400 to-danger-600', alert: true },
              { label: 'Unread', value: '15', sublabel: 'Messages', icon: 'fa-envelope', color: 'teal', gradient: 'from-teal-400 to-teal-600' }
            ].map((stat) => (
              <div class={`bg-white/5 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/10 hover:bg-white/10 transition-all cursor-pointer group ${stat.alert ? 'ring-2 ring-danger-500/50 animate-pulse-subtle' : ''}`}>
                <div class={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                  <i class={`fas ${stat.icon} text-white text-sm`}></i>
                </div>
                <p class="text-2xl font-bold text-white">{stat.value}</p>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </header>
      
      <main class="px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Critical RPM Alerts Section */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-danger-500 animate-pulse shadow-lg shadow-danger-500/50"></span>
              <span>Critical Alerts</span>
              <span class="px-2.5 py-1 bg-danger-100 text-danger-700 text-xs font-bold rounded-full">3 Active</span>
            </h3>
            <a href="/doctor/alerts" class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
              View All <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
          
          <div class="space-y-3">
            {[
              { patient: 'Max Mustermann', id: 'GS-2024-0847', alert: 'Elevated Blood Pressure: 145/92 mmHg', time: '10 min ago', severity: 'critical', trend: '+12 mmHg', icon: 'fa-heartbeat' },
              { patient: 'Anna Schmidt', id: 'GS-2024-0923', alert: 'Low Oxygen Saturation: SpO₂ 93%', time: '25 min ago', severity: 'warning', trend: '-4%', icon: 'fa-lungs' },
              { patient: 'Peter Müller', id: 'GS-2024-0756', alert: 'Missed Medication Check-in (2nd occurrence)', time: '1 hour ago', severity: 'info', trend: 'Pattern', icon: 'fa-pills' }
            ].map((alert) => (
              <div class={`bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all border-l-4 ${
                alert.severity === 'critical' ? 'border-danger-500' :
                alert.severity === 'warning' ? 'border-warning-500' :
                'border-info-500'
              }`}>
                <div class="flex items-start justify-between gap-4">
                  <div class={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    alert.severity === 'critical' ? 'bg-danger-100' :
                    alert.severity === 'warning' ? 'bg-warning-100' :
                    'bg-info-100'
                  }`}>
                    <i class={`fas ${alert.icon} text-xl ${
                      alert.severity === 'critical' ? 'text-danger-600' :
                      alert.severity === 'warning' ? 'text-warning-600' :
                      'text-info-600'
                    }`}></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 class="font-bold text-navy-900">{alert.patient}</h4>
                      <span class="text-xs text-slate-400 font-mono">#{alert.id}</span>
                    </div>
                    <p class="text-sm text-slate-600 mb-2">{alert.alert}</p>
                    <div class="flex items-center gap-4 text-xs">
                      <span class="text-slate-400 flex items-center gap-1">
                        <i class="far fa-clock"></i>{alert.time}
                      </span>
                      <span class={`font-bold px-2 py-0.5 rounded-full ${
                        alert.severity === 'critical' ? 'bg-danger-100 text-danger-700' :
                        alert.severity === 'warning' ? 'bg-warning-100 text-warning-700' :
                        'bg-info-100 text-info-700'
                      }`}>{alert.trend}</span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <button class="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700 transition-all shadow-soft active:scale-95">
                      <i class="fas fa-video text-sm"></i>
                    </button>
                    <button class="w-11 h-11 rounded-xl bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-soft active:scale-95">
                      <i class="fas fa-chart-line text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Today's Schedule - Timeline View */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-calendar-day text-brand-500"></i>
              Today's Schedule
            </h3>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-500 font-medium">Dec 17, 2024</span>
              <button class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-brand-500 transition-all shadow-soft">
                <i class="fas fa-calendar-alt text-slate-600 text-sm"></i>
              </button>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100">
            {[
              { time: '9:00 AM', patient: 'Max Mustermann', type: 'Post-op Follow-up', method: 'video', status: 'completed', avatar: 'MM' },
              { time: '10:00 AM', patient: 'Klaus Weber', type: 'Initial Consultation', method: 'video', status: 'current', avatar: 'KW' },
              { time: '11:00 AM', patient: 'Emma Fischer', type: 'Pre-op Assessment', method: 'onsite', status: 'upcoming', avatar: 'EF' },
              { time: '2:00 PM', patient: 'Hans Müller', type: 'Second Opinion Review', method: 'video', status: 'upcoming', avatar: 'HM' },
              { time: '3:30 PM', patient: 'Lisa König', type: 'X-Ray Analysis', method: 'video', status: 'upcoming', avatar: 'LK' },
              { time: '4:30 PM', patient: 'Michael Braun', type: 'Post-op Week 6 Check', method: 'video', status: 'upcoming', avatar: 'MB' }
            ].map((apt, idx) => (
              <div class={`p-4 flex items-center gap-4 border-b border-slate-100 last:border-0 transition-all ${apt.status === 'current' ? 'bg-gradient-to-r from-brand-50 to-transparent ring-inset ring-2 ring-brand-500/20' : 'hover:bg-slate-50'}`}>
                <div class="w-16 text-center flex-shrink-0">
                  <p class={`text-sm font-bold ${apt.status === 'current' ? 'text-brand-600' : apt.status === 'completed' ? 'text-slate-400' : 'text-navy-900'}`}>{apt.time}</p>
                </div>
                
                <div class={`w-1.5 h-14 rounded-full relative ${
                  apt.status === 'completed' ? 'bg-success-500' :
                  apt.status === 'current' ? 'bg-gradient-to-b from-brand-400 to-brand-600 shadow-glow-brand' :
                  'bg-slate-200'
                }`}>
                  {apt.status === 'current' && (
                    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></span>
                  )}
                </div>
                
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                    apt.status === 'completed' ? 'bg-slate-100 text-slate-400' : 'bg-navy-100 text-navy-600'
                  }`}>
                    {apt.avatar}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class={`font-semibold truncate ${apt.status === 'completed' ? 'text-slate-400' : 'text-navy-900'}`}>{apt.patient}</h4>
                    <p class={`text-xs truncate ${apt.status === 'completed' ? 'text-slate-300' : 'text-slate-500'}`}>{apt.type}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class={`w-9 h-9 rounded-xl flex items-center justify-center ${apt.method === 'video' ? 'bg-info-100 text-info-600' : 'bg-teal-100 text-teal-600'}`}>
                    <i class={`fas ${apt.method === 'video' ? 'fa-video' : 'fa-hospital'} text-sm`}></i>
                  </span>
                  {apt.status === 'current' && (
                    <button class="px-5 py-2.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-xs font-bold rounded-xl shadow-glow-brand hover:shadow-lg transition-all active:scale-95">
                      Join Now
                    </button>
                  )}
                  {apt.status === 'completed' && (
                    <span class="px-3 py-1.5 bg-success-100 text-success-700 text-xs font-semibold rounded-full flex items-center gap-1">
                      <i class="fas fa-check text-[10px]"></i>Done
                    </span>
                  )}
                  {apt.status === 'upcoming' && (
                    <button class="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-navy-900 transition-colors">
                      <i class="fas fa-ellipsis-h text-sm"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Patient Portfolio */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-users text-teal-500"></i>
              My Patients
            </h3>
            <div class="flex gap-2">
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  class="w-36 pl-9 pr-3 py-2.5 bg-white rounded-xl text-sm border border-slate-200 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none shadow-soft transition-all"
                />
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              </div>
              <button class="px-4 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors active:scale-95 shadow-soft flex items-center gap-2">
                <i class="fas fa-filter text-xs"></i>Filter
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Max Mustermann', id: 'GS-0847', surgery: 'Total Knee Replacement', status: 'Recovery', progress: 75, phase: 'Week 2 of 12', alerts: 1, score: 85, flag: '🇩🇪', recovery: 'Hurghada' },
              { name: 'Anna Schmidt', id: 'GS-0923', surgery: 'Hip Replacement', status: 'Recovery', progress: 45, phase: 'Week 1 of 10', alerts: 2, score: 72, flag: '🇩🇪', recovery: 'Hurghada' },
              { name: 'Peter Müller', id: 'GS-0756', surgery: 'Lumbar Spine Fusion', status: 'Pre-op', progress: 80, phase: 'Surgery in 5 days', alerts: 0, score: 91, flag: '🇦🇹', recovery: 'Luxor' },
              { name: 'Emma Fischer', id: 'GS-1024', surgery: 'Knee Arthroscopy', status: 'Scheduled', progress: 100, phase: 'Tomorrow', alerts: 0, score: 88, flag: '🇨🇭', recovery: 'Hurghada' }
            ].map((patient) => (
              <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all group">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center relative">
                      <span class="text-navy-700 font-bold text-lg">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                      <span class="absolute -bottom-1 -right-1 text-lg">{patient.flag}</span>
                    </div>
                    <div>
                      <h4 class="font-bold text-navy-900">{patient.name}</h4>
                      <p class="text-xs text-slate-500">{patient.surgery}</p>
                      <p class="text-[10px] text-teal-600 font-medium mt-0.5">
                        <i class="fas fa-map-marker-alt mr-1"></i>Recovery: {patient.recovery}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    {patient.alerts > 0 && (
                      <span class="w-7 h-7 bg-gradient-to-br from-danger-400 to-danger-600 text-white text-xs font-bold rounded-lg flex items-center justify-center animate-pulse shadow-lg">
                        {patient.alerts}
                      </span>
                    )}
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 flex flex-col items-center justify-center border border-brand-200">
                      <span class="text-lg font-bold text-brand-600">{patient.score}</span>
                      <span class="text-[8px] text-brand-500 font-semibold -mt-0.5">SCORE</span>
                    </div>
                  </div>
                </div>
                
                <div class="mb-4">
                  <div class="flex justify-between text-xs mb-2">
                    <span class="text-slate-500 font-medium">{patient.phase}</span>
                    <span class="text-brand-600 font-bold">{patient.progress}%</span>
                  </div>
                  <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 rounded-full transition-all relative"
                      style={{ width: `${patient.progress}%` }}
                    >
                      <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <StatusBadge 
                    status={patient.status === 'Recovery' ? 'success' : patient.status === 'Pre-op' ? 'warning' : 'info'}
                    text={patient.status}
                    size="small"
                  />
                  <div class="flex gap-2">
                    <button class="flex-1 px-4 py-2.5 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-colors active:scale-95 shadow-soft">
                      <i class="fas fa-chart-line mr-1.5"></i>Progress
                    </button>
                    <button class="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white text-xs font-semibold rounded-xl hover:from-teal-500 hover:to-teal-700 transition-all active:scale-95 shadow-soft">
                      <i class="fas fa-video mr-1.5"></i>Call
                    </button>
                    <button class="w-10 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 hover:text-navy-900 transition-colors active:scale-95">
                      <i class="fas fa-ellipsis-v text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions Grid */}
        <div>
          <h3 class="font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
            <i class="fas fa-bolt text-warning-500"></i>
            Quick Actions
          </h3>
          <div class="grid grid-cols-4 gap-3">
            {[
              { icon: 'fa-prescription', label: 'E-Prescribe', color: 'from-teal-400 to-teal-600', desc: 'Write Rx' },
              { icon: 'fa-file-medical', label: 'Clinical Note', color: 'from-info-400 to-info-600', desc: 'New entry' },
              { icon: 'fa-user-plus', label: 'Refer Patient', color: 'from-purple-400 to-purple-600', desc: 'Specialist' },
              { icon: 'fa-chart-bar', label: 'Analytics', color: 'from-brand-400 to-brand-600', desc: 'Reports' }
            ].map((action) => (
              <div class="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group active:scale-95">
                <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-soft`}>
                  <i class={`fas ${action.icon} text-white text-xl`}></i>
                </div>
                <p class="text-sm font-bold text-navy-900">{action.label}</p>
                <p class="text-[10px] text-slate-500">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Care Plan Templates - Horizontal Scroll */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-clipboard-list text-info-500"></i>
              Care Plan Templates
            </h3>
            <button class="text-sm text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1">
              <i class="fas fa-plus"></i>Create New
            </button>
          </div>
          
          <div class="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
            {[
              { name: 'Total Knee Replacement', patients: 45, duration: '12 weeks', icon: 'fa-bone', color: 'brand', phases: 4 },
              { name: 'Hip Replacement Surgery', patients: 32, duration: '10 weeks', icon: 'fa-user-injured', color: 'teal', phases: 3 },
              { name: 'Spine Fusion Protocol', patients: 18, duration: '16 weeks', icon: 'fa-stairs', color: 'info', phases: 5 },
              { name: 'Arthroscopy Recovery', patients: 28, duration: '6 weeks', icon: 'fa-microscope', color: 'success', phases: 2 }
            ].map((template) => (
              <div class="flex-shrink-0 w-52 bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all group">
                <div class={`w-12 h-12 rounded-xl bg-${template.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <i class={`fas ${template.icon} text-${template.color}-600 text-lg`}></i>
                </div>
                <h5 class="font-bold text-navy-900 mb-1">{template.name}</h5>
                <div class="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span class="flex items-center gap-1">
                    <i class="fas fa-users text-brand-500"></i>{template.patients}
                  </span>
                  <span class="flex items-center gap-1">
                    <i class="fas fa-clock text-brand-500"></i>{template.duration}
                  </span>
                </div>
                <div class="flex items-center gap-1 mb-4">
                  {[...Array(template.phases)].map((_, i) => (
                    <div class={`flex-1 h-1.5 rounded-full bg-${template.color}-${(i + 1) * 100}`}></div>
                  ))}
                </div>
                <button class="w-full py-2.5 bg-slate-100 text-navy-900 text-xs font-semibold rounded-xl hover:bg-navy-900 hover:text-white transition-colors">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Performance Dashboard */}
        <div class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-6 shadow-soft-lg relative overflow-hidden">
          {/* Background Effects */}
          <div class="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h4 class="font-bold text-white text-lg">Performance Dashboard</h4>
                <p class="text-sm text-slate-400">December 2024 Overview</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1.5 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full flex items-center gap-1">
                  <i class="fas fa-arrow-up"></i>+15% vs Nov
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-4 gap-4 text-center">
              {[
                { value: '48', label: 'Consultations', change: '+12%', icon: 'fa-stethoscope', color: 'brand' },
                { value: '12', label: 'Surgeries', change: '+3', icon: 'fa-scalpel', color: 'teal' },
                { value: '98%', label: 'Satisfaction', change: '+2%', icon: 'fa-heart', color: 'danger' },
                { value: '4.9', label: 'Rating', change: '★★★★★', icon: 'fa-star', color: 'warning' }
              ].map((stat) => (
                <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                  <div class={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-3`}>
                    <i class={`fas ${stat.icon} text-${stat.color}-400`}></i>
                  </div>
                  <p class="text-3xl font-bold bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">{stat.value}</p>
                  <p class="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
                  <p class="text-[10px] text-teal-400 font-semibold mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Activity Feed */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-navy-900 text-lg flex items-center gap-2">
              <i class="fas fa-stream text-purple-500"></i>
              Recent Activity
            </h3>
            <button class="text-sm text-brand-600 font-semibold hover:text-brand-700">View All</button>
          </div>
          
          <div class="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
            {[
              { action: 'Completed consultation', patient: 'Max Mustermann', time: '9:45 AM', icon: 'fa-check-circle', color: 'success' },
              { action: 'RPM Alert reviewed', patient: 'Anna Schmidt', time: '10:15 AM', icon: 'fa-heart-pulse', color: 'danger' },
              { action: 'Care plan updated', patient: 'Peter Müller', time: '11:30 AM', icon: 'fa-clipboard-list', color: 'info' },
              { action: 'E-Prescription sent', patient: 'Emma Fischer', time: '12:00 PM', icon: 'fa-prescription', color: 'teal' }
            ].map((activity, idx) => (
              <div class="p-4 flex items-center gap-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div class={`w-10 h-10 rounded-xl bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <i class={`fas ${activity.icon} text-${activity.color}-600`}></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-navy-900">{activity.action}</p>
                  <p class="text-xs text-slate-500">{activity.patient}</p>
                </div>
                <span class="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Premium Doctor Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 p-4 z-50 safe-bottom">
        <div class="max-w-lg mx-auto">
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl px-3 py-3 shadow-soft-lg border border-slate-200/50">
            <div class="flex justify-around items-center">
              {[
                { icon: 'fa-home', label: 'Dashboard', href: '/doctor', active: true },
                { icon: 'fa-users', label: 'Patients', href: '/doctor/patients' },
                { icon: 'fa-calendar-check', label: 'Schedule', href: '/doctor/schedule' },
                { icon: 'fa-comments', label: 'Messages', href: '/doctor/messages', badge: '15' },
                { icon: 'fa-chart-line', label: 'Analytics', href: '/doctor/analytics' }
              ].map((item) => (
                <a 
                  href={item.href} 
                  class={`relative flex flex-col items-center py-2 px-4 rounded-2xl transition-all ${
                    item.active 
                      ? 'bg-gradient-to-br from-navy-800 to-navy-900 text-white shadow-soft-md' 
                      : 'text-slate-500 hover:text-navy-900 hover:bg-slate-100'
                  }`}
                >
                  {item.badge && (
                    <span class="absolute -top-1 right-1 min-w-[18px] h-[18px] px-1.5 bg-gradient-to-r from-danger-500 to-danger-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                      {item.badge}
                    </span>
                  )}
                  <i class={`fas ${item.icon} text-lg ${item.active ? 'text-brand-400' : ''}`}></i>
                  <span class={`text-[10px] font-semibold mt-1 ${item.active ? 'text-brand-400' : ''}`}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
