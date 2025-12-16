import { html } from 'hono/html'

// Navigation items for patient
export const patientNavItems = [
  { icon: 'fa-home', label: 'Home', href: '/patient', id: 'home' },
  { icon: 'fa-clock', label: 'Timeline', href: '/patient/timeline', id: 'timeline' },
  { icon: 'fa-comments', label: 'Messages', href: '/patient/messages', id: 'messages' },
  { icon: 'fa-user-md', label: 'Care Team', href: '/patient/care-team', id: 'careteam' },
  { icon: 'fa-user', label: 'Profile', href: '/patient/profile', id: 'profile' }
]

// Header component with German Select branding
export const Header = ({ title = 'German Select', showBack = false, showProfile = true, backHref = '/patient' }: { title?: string, showBack?: boolean, showProfile?: boolean, backHref?: string }) => (
  <header class="bg-gs-black text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-gs">
    <div class="flex items-center gap-3">
      {showBack && (
        <a href={backHref} class="text-white hover:text-gs-gold transition-colors">
          <i class="fas fa-arrow-left text-lg"></i>
        </a>
      )}
      {!showBack ? (
        <div class="flex flex-col leading-none">
          <span class="text-[10px] font-bold tracking-[0.2em] text-gs-silver uppercase">GERMAN</span>
          <span class="text-sm font-playfair font-semibold text-gs-gold">Select</span>
        </div>
      ) : (
        <h1 class="text-lg font-semibold tracking-wide">{title}</h1>
      )}
    </div>
    {showProfile && (
      <a href="/patient/profile" class="w-9 h-9 rounded-full bg-gradient-to-r from-gs-gold-light to-gs-gold flex items-center justify-center hover:from-gs-gold hover:to-gs-bronze transition-all">
        <i class="fas fa-user text-gs-black text-sm"></i>
      </a>
    )}
  </header>
)

// Bottom navigation
export const BottomNav = ({ active = 'home' }: { active?: string }) => (
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
    <div class="flex justify-around items-center max-w-md mx-auto">
      {patientNavItems.map((item) => (
        <a 
          href={item.href} 
          class={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
            active === item.id 
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
)

// Page wrapper with bottom nav padding
export const PageWrapper = ({ children, active = 'home', showNav = true }: { children: any, active?: string, showNav?: boolean }) => (
  <div class={`min-h-screen bg-gs-cream ${showNav ? 'pb-20' : ''}`}>
    {children}
    {showNav && <BottomNav active={active} />}
  </div>
)

// Card component
export const Card = ({ children, className = '', gold = false }: { children: any, className?: string, gold?: boolean }) => (
  <div class={`rounded-xl shadow-gs ${gold ? 'bg-gradient-to-r from-gs-gold to-gs-gold-dark text-gs-navy' : 'bg-white'} ${className}`}>
    {children}
  </div>
)

// Status badge
export const StatusBadge = ({ status, text }: { status: 'success' | 'warning' | 'danger' | 'info', text: string }) => {
  const colors = {
    success: 'bg-gs-green/10 text-gs-green border-gs-green/20',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    danger: 'bg-gs-red/10 text-gs-red border-gs-red/20',
    info: 'bg-gs-blue/10 text-gs-blue border-gs-blue/20'
  }
  return (
    <span class={`px-2 py-1 text-xs font-medium rounded-full border ${colors[status]}`}>
      {text}
    </span>
  )
}

// Progress circle
export const ProgressCircle = ({ percent, size = 80, strokeWidth = 8, showLabel = true }: { percent: number, size?: number, strokeWidth?: number, showLabel?: boolean }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percent / 100) * circumference
  
  return (
    <div class="relative inline-flex items-center justify-center">
      <svg width={size} height={size} class="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          stroke-width={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#C9A962"
          stroke-width={strokeWidth}
          fill="none"
          stroke-linecap="round"
          stroke-dasharray={circumference}
          stroke-dashoffset={offset}
          class="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-xl font-bold text-gs-navy">{percent}%</span>
          <span class="text-xs text-gray-500">Complete</span>
        </div>
      )}
    </div>
  )
}

// Quick action button
export const QuickAction = ({ icon, label, href, color = 'gs-navy' }: { icon: string, label: string, href: string, color?: string }) => (
  <a 
    href={href} 
    class={`flex flex-col items-center p-3 rounded-xl bg-white shadow-gs hover:shadow-gs-lg transition-all hover:-translate-y-1`}
  >
    <div class={`w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center mb-2`}>
      <i class={`fas ${icon} text-${color} text-lg`}></i>
    </div>
    <span class="text-xs font-medium text-gray-700 text-center">{label}</span>
  </a>
)

// Doctor card component
export const DoctorCard = ({ 
  name, 
  specialty, 
  hospital, 
  imageUrl, 
  available = true,
  rating = 4.9 
}: { 
  name: string, 
  specialty: string, 
  hospital?: string, 
  imageUrl?: string, 
  available?: boolean,
  rating?: number 
}) => (
  <div class="bg-gs-navy rounded-xl p-4 text-white shadow-gs">
    <div class="flex items-start gap-3">
      <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} class="w-full h-full object-cover" />
        ) : (
          <i class="fas fa-user-md text-gs-gold text-xl"></i>
        )}
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-sm truncate">{name}</h4>
        <p class="text-gs-gold text-xs">{specialty}</p>
        {hospital && <p class="text-gray-300 text-xs mt-1 truncate">{hospital}</p>}
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center gap-1">
            <i class="fas fa-star text-gs-gold text-xs"></i>
            <span class="text-xs">{rating}</span>
          </div>
          <span class={`text-xs px-2 py-0.5 rounded-full ${available ? 'bg-gs-green/20 text-gs-green' : 'bg-gray-500/20 text-gray-400'}`}>
            {available ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
      <button class="w-8 h-8 rounded-full bg-gs-gold text-gs-navy flex items-center justify-center hover:bg-gs-gold-dark transition-colors">
        <i class="fas fa-video text-sm"></i>
      </button>
    </div>
  </div>
)

// Appointment card
export const AppointmentCard = ({ 
  type, 
  title, 
  datetime, 
  doctor, 
  specialty,
  isUpcoming = false 
}: { 
  type: string, 
  title: string, 
  datetime: string, 
  doctor: string, 
  specialty: string,
  isUpcoming?: boolean 
}) => (
  <div class={`rounded-xl p-4 ${isUpcoming ? 'bg-gs-navy text-white' : 'bg-white'} shadow-gs`}>
    <div class="flex items-start gap-3">
      <div class={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUpcoming ? 'bg-gs-gold/20' : 'bg-gs-navy/10'}`}>
        <i class={`fas fa-calendar-check ${isUpcoming ? 'text-gs-gold' : 'text-gs-navy'}`}></i>
      </div>
      <div class="flex-1">
        <p class={`text-xs font-medium ${isUpcoming ? 'text-gs-gold' : 'text-gs-gold-dark'}`}>{type}</p>
        <h4 class="font-semibold text-sm mt-0.5">{title}</h4>
        <p class={`text-xs mt-1 ${isUpcoming ? 'text-white/80' : 'text-gray-500'}`}>{datetime}</p>
        <div class="flex items-center gap-2 mt-2">
          <div class={`w-6 h-6 rounded-full ${isUpcoming ? 'bg-gs-gold/20' : 'bg-gs-navy/10'} flex items-center justify-center`}>
            <i class={`fas fa-user-md text-xs ${isUpcoming ? 'text-gs-gold' : 'text-gs-navy'}`}></i>
          </div>
          <div>
            <p class="text-xs font-medium">{doctor}</p>
            <p class={`text-xs ${isUpcoming ? 'text-white/60' : 'text-gray-400'}`}>{specialty}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Milestone card for timeline
export const MilestoneCard = ({ 
  week, 
  title, 
  dateRange, 
  icon,
  status = 'upcoming',
  details 
}: { 
  week: string, 
  title: string, 
  dateRange: string, 
  icon: string,
  status?: 'completed' | 'current' | 'upcoming',
  details?: string 
}) => {
  const statusColors = {
    completed: 'bg-gs-green text-white',
    current: 'bg-gs-gold text-gs-navy',
    upcoming: 'bg-white text-gs-navy border-2 border-gs-navy/20'
  }
  
  return (
    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[status]}`}>
          <i class={`fas ${icon}`}></i>
        </div>
        <div class="w-0.5 h-full bg-gray-200 mt-2"></div>
      </div>
      <div class="flex-1 pb-6">
        <div class="bg-white rounded-xl p-4 shadow-gs">
          <span class="text-xs font-bold text-gs-gold uppercase tracking-wide">{week}</span>
          <h4 class="font-semibold text-gs-navy mt-1">{title}</h4>
          <p class="text-xs text-gray-500 mt-1">{dateRange}</p>
          {details && <p class="text-xs text-gray-600 mt-2">{details}</p>}
        </div>
      </div>
    </div>
  )
}

// Vital card for RPM
export const VitalCard = ({ 
  icon, 
  label, 
  value, 
  unit, 
  trend, 
  status = 'normal' 
}: { 
  icon: string, 
  label: string, 
  value: string, 
  unit: string, 
  trend?: 'up' | 'down' | 'stable',
  status?: 'normal' | 'warning' | 'critical' 
}) => {
  const statusColors = {
    normal: 'border-gs-green/30',
    warning: 'border-yellow-400/50',
    critical: 'border-gs-red/50'
  }
  const trendIcons = {
    up: 'fa-arrow-up text-gs-red',
    down: 'fa-arrow-down text-gs-green',
    stable: 'fa-minus text-gray-400'
  }
  
  return (
    <div class={`bg-white rounded-xl p-4 shadow-gs border-l-4 ${statusColors[status]}`}>
      <div class="flex items-center justify-between mb-2">
        <div class="w-8 h-8 rounded-full bg-gs-navy/10 flex items-center justify-center">
          <i class={`fas ${icon} text-gs-navy text-sm`}></i>
        </div>
        {trend && <i class={`fas ${trendIcons[trend]} text-xs`}></i>}
      </div>
      <p class="text-xs text-gray-500">{label}</p>
      <div class="flex items-baseline gap-1 mt-1">
        <span class="text-2xl font-bold text-gs-navy">{value}</span>
        <span class="text-xs text-gray-400">{unit}</span>
      </div>
    </div>
  )
}
