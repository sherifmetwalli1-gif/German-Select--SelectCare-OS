// SelectCare OS - World-Class UI Components
// Premium Design System with Superior Visual Hierarchy

// Navigation items for patient
export const patientNavItems = [
  { icon: 'fa-home', label: 'Home', href: '/patient', id: 'home' },
  { icon: 'fa-chart-line', label: 'Progress', href: '/patient/timeline', id: 'timeline' },
  { icon: 'fa-comments', label: 'Messages', href: '/patient/messages', id: 'messages' },
  { icon: 'fa-user-doctor', label: 'Care Team', href: '/patient/care-team', id: 'careteam' },
  { icon: 'fa-user', label: 'Profile', href: '/patient/profile', id: 'profile' }
]

// Logo Component - SelectCare OS Branding
export const Logo = ({ size = 'default', theme = 'dark' }: { size?: 'small' | 'default' | 'large', theme?: 'dark' | 'light' }) => {
  const sizes = {
    small: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    default: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]' },
    large: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' }
  }
  
  return (
    <div class="flex items-center gap-2.5">
      <div class={`${sizes[size].icon} rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-brand relative`}>
        <span class={`font-bold text-navy-900 ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'}`}>S</span>
        <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-navy-900"></div>
      </div>
      <div class="flex flex-col leading-tight">
        <span class={`${sizes[size].text} font-semibold ${theme === 'dark' ? 'text-white' : 'text-navy-900'} tracking-tight`}>
          SelectCare
        </span>
        <span class={`${sizes[size].sub} font-medium tracking-wider uppercase ${theme === 'dark' ? 'text-brand-400' : 'text-brand-600'}`}>
          Operating System
        </span>
      </div>
    </div>
  )
}

// Header component with premium design
export const Header = ({ 
  title = 'SelectCare OS', 
  showBack = false, 
  showProfile = true, 
  backHref = '/patient',
  transparent = false,
  notifications = 2
}: { 
  title?: string, 
  showBack?: boolean, 
  showProfile?: boolean, 
  backHref?: string,
  transparent?: boolean,
  notifications?: number 
}) => (
  <header class={`${transparent ? 'bg-transparent absolute top-0 left-0 right-0' : 'glass-dark sticky top-0'} text-white px-4 py-3 flex items-center justify-between z-50`}>
    <div class="flex items-center gap-3">
      {showBack ? (
        <>
          <a href={backHref} class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95">
            <i class="fas fa-chevron-left"></i>
          </a>
          <h1 class="text-lg font-semibold">{title}</h1>
        </>
      ) : (
        <Logo size="small" theme="dark" />
      )}
    </div>
    {showProfile && (
      <div class="flex items-center gap-2">
        <button class="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95">
          <i class="fas fa-bell text-sm"></i>
          {notifications > 0 && (
            <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>
        <a href="/patient/profile" class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all active:scale-95">
          <span class="font-semibold text-navy-900 text-sm">M</span>
        </a>
      </div>
    )}
  </header>
)

// Bottom navigation - Premium floating design
export const BottomNav = ({ active = 'home' }: { active?: string }) => (
  <nav class="fixed bottom-0 left-0 right-0 p-3 z-50 safe-bottom">
    <div class="max-w-md mx-auto">
      <div class="glass rounded-2xl px-2 py-2 shadow-soft-lg border border-white/30">
        <div class="flex justify-around items-center">
          {patientNavItems.map((item) => (
            <a 
              href={item.href} 
              class={`relative flex flex-col items-center py-2 px-3 sm:px-4 rounded-xl transition-all ${
                active === item.id 
                  ? 'bg-navy-900 text-white shadow-soft-md' 
                  : 'text-slate-500 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              <i class={`fas ${item.icon} ${active === item.id ? 'text-brand-400' : ''}`}></i>
              <span class={`text-[10px] font-medium mt-1 ${active === item.id ? 'text-brand-400' : ''}`}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
)

// Page wrapper with proper spacing
export const PageWrapper = ({ children, active = 'home', showNav = true, bgClass = 'bg-slate-50' }: { children: any, active?: string, showNav?: boolean, bgClass?: string }) => (
  <div class={`min-h-screen ${bgClass} ${showNav ? 'pb-28' : ''}`}>
    {children}
    {showNav && <BottomNav active={active} />}
  </div>
)

// Card component - Premium variants
export const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  padding = 'default',
  gold = false
}: { 
  children: any, 
  className?: string, 
  variant?: 'default' | 'gold' | 'dark' | 'glass' | 'outline',
  hover?: boolean,
  padding?: 'none' | 'small' | 'default' | 'large',
  gold?: boolean
}) => {
  // Support legacy 'gold' prop
  const effectiveVariant = gold ? 'gold' : variant
  
  const variants = {
    default: 'bg-white border border-slate-100 shadow-card',
    gold: 'bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 text-navy-900 shadow-glow-brand',
    dark: 'bg-navy-900 text-white border border-navy-800',
    glass: 'glass border border-white/20',
    outline: 'bg-transparent border-2 border-slate-200'
  }
  const paddings = {
    none: '',
    small: 'p-3',
    default: 'p-4',
    large: 'p-6'
  }
  
  return (
    <div class={`rounded-2xl ${variants[effectiveVariant]} ${paddings[padding]} ${hover ? 'card-lift cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Status badge - Enhanced with icons
export const StatusBadge = ({ status, text, size = 'default' }: { status: 'success' | 'warning' | 'danger' | 'info' | 'neutral', text: string, size?: 'small' | 'default' }) => {
  const colors = {
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    danger: 'bg-danger-50 text-danger-700 border-danger-200',
    info: 'bg-info-50 text-info-700 border-info-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200'
  }
  const icons = {
    success: 'fa-check',
    warning: 'fa-exclamation',
    danger: 'fa-times',
    info: 'fa-info',
    neutral: ''
  }
  const sizes = {
    small: 'px-2 py-0.5 text-[10px]',
    default: 'px-2.5 py-1 text-xs'
  }
  return (
    <span class={`font-semibold rounded-full border ${colors[status]} ${sizes[size]} inline-flex items-center gap-1`}>
      {icons[status] && <i class={`fas ${icons[status]} text-[8px]`}></i>}
      {text}
    </span>
  )
}

// Progress circle - Premium with glow effect
export const ProgressCircle = ({ 
  percent, 
  size = 80, 
  strokeWidth = 6, 
  showLabel = true,
  color = 'brand',
  labelSize = 'default'
}: { 
  percent: number, 
  size?: number, 
  strokeWidth?: number, 
  showLabel?: boolean,
  color?: 'brand' | 'success' | 'info' | 'danger' | 'teal',
  labelSize?: 'small' | 'default' | 'large'
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percent / 100) * circumference
  
  const colors: Record<string, string> = {
    brand: '#D4A51A',
    success: '#10B981',
    info: '#3B82F6',
    danger: '#EF4444',
    teal: '#00CCBA'
  }
  
  const labelSizes = {
    small: { value: 'text-lg', label: 'text-[8px]' },
    default: { value: 'text-2xl', label: 'text-[10px]' },
    large: { value: 'text-3xl', label: 'text-xs' }
  }
  
  return (
    <div class="relative inline-flex items-center justify-center flex-shrink-0">
      <svg width={size} height={size} class="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          stroke-width={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          stroke-width={strokeWidth}
          fill="none"
          stroke-linecap="round"
          stroke-dasharray={circumference}
          stroke-dashoffset={offset}
          class="transition-all duration-700 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${colors[color]}50)` }}
        />
      </svg>
      {showLabel && (
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class={`${labelSizes[labelSize].value} font-bold text-navy-900`}>{percent}%</span>
          <span class={`${labelSizes[labelSize].label} font-medium text-slate-500 uppercase tracking-wider`}>Complete</span>
        </div>
      )}
    </div>
  )
}

// Quick action button - Premium glassmorphism
export const QuickAction = ({ 
  icon, 
  label, 
  href, 
  color = 'brand',
  badge
}: { 
  icon: string, 
  label: string, 
  href: string, 
  color?: string,
  badge?: string
}) => {
  // Map legacy color names to new system
  const colorMap: Record<string, { bg: string, icon: string, hover: string }> = {
    'gs-blue': { bg: 'bg-info-50', icon: 'text-info-600', hover: 'group-hover:bg-info-500 group-hover:text-white' },
    'gs-green': { bg: 'bg-success-50', icon: 'text-success-600', hover: 'group-hover:bg-success-500 group-hover:text-white' },
    'gs-red': { bg: 'bg-danger-50', icon: 'text-danger-600', hover: 'group-hover:bg-danger-500 group-hover:text-white' },
    'gs-purple': { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'group-hover:bg-purple-500 group-hover:text-white' },
    'gs-gold': { bg: 'bg-brand-50', icon: 'text-brand-600', hover: 'group-hover:bg-brand-500 group-hover:text-white' },
    'gs-teal': { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'group-hover:bg-teal-500 group-hover:text-white' },
    'gs-navy': { bg: 'bg-navy-100', icon: 'text-navy-600', hover: 'group-hover:bg-navy-900 group-hover:text-white' },
    'brand': { bg: 'bg-brand-50', icon: 'text-brand-600', hover: 'group-hover:bg-brand-500 group-hover:text-white' },
    'teal': { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'group-hover:bg-teal-500 group-hover:text-white' },
    'navy': { bg: 'bg-navy-100', icon: 'text-navy-600', hover: 'group-hover:bg-navy-900 group-hover:text-white' }
  }
  
  const colorConfig = colorMap[color] || colorMap['brand']
  
  return (
    <a 
      href={href} 
      class="group relative flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 active:scale-95"
    >
      {badge && (
        <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
      <div class={`w-11 h-11 rounded-xl ${colorConfig.bg} ${colorConfig.icon} flex items-center justify-center mb-2 transition-all ${colorConfig.hover}`}>
        <i class={`fas ${icon} text-lg`}></i>
      </div>
      <span class="text-[11px] font-semibold text-slate-600 text-center group-hover:text-navy-900 transition-colors leading-tight">{label}</span>
    </a>
  )
}

// Doctor card - Premium dark card design
export const DoctorCard = ({ 
  name, 
  specialty, 
  hospital, 
  imageUrl, 
  available = true,
  rating = 4.9,
  compact = false
}: { 
  name: string, 
  specialty: string, 
  hospital?: string, 
  imageUrl?: string, 
  available?: boolean,
  rating?: number,
  compact?: boolean
}) => (
  <div class="bg-navy-900 rounded-2xl p-4 shadow-soft-lg border border-navy-800 card-lift cursor-pointer">
    <div class="flex items-center gap-3">
      <div class="relative flex-shrink-0">
        <div class="w-14 h-14 rounded-xl bg-navy-800 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} class="w-full h-full object-cover" />
          ) : (
            <i class="fas fa-user-doctor text-brand-400 text-xl"></i>
          )}
        </div>
        <span class={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-navy-900 ${available ? 'bg-teal-400' : 'bg-slate-400'}`}></span>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-white truncate">{name}</h4>
        <p class="text-brand-400 text-sm font-medium">{specialty}</p>
        {hospital && !compact && <p class="text-slate-400 text-xs mt-0.5 truncate">{hospital}</p>}
        <div class="flex items-center gap-3 mt-2">
          <div class="flex items-center gap-1">
            <i class="fas fa-star text-brand-400 text-xs"></i>
            <span class="text-white text-sm font-medium">{rating}</span>
          </div>
          <StatusBadge 
            status={available ? 'success' : 'neutral'} 
            text={available ? 'Available' : 'Busy'} 
            size="small" 
          />
        </div>
      </div>
      <button class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-navy-900 flex items-center justify-center transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95">
        <i class="fas fa-video"></i>
      </button>
    </div>
  </div>
)

// Appointment card - Enhanced with variants
export const AppointmentCard = ({ 
  type, 
  title, 
  datetime, 
  doctor, 
  specialty,
  isUpcoming = false,
  showActions = true
}: { 
  type: string, 
  title: string, 
  datetime: string, 
  doctor: string, 
  specialty: string,
  isUpcoming?: boolean,
  showActions?: boolean
}) => (
  <div class={`rounded-2xl p-4 shadow-card border ${isUpcoming ? 'bg-navy-900 text-white border-navy-800' : 'bg-white border-slate-100'}`}>
    <div class="flex items-start gap-3">
      <div class={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isUpcoming ? 'bg-brand-500/20' : 'bg-slate-100'
      }`}>
        <i class={`fas fa-calendar-check text-lg ${isUpcoming ? 'text-brand-400' : 'text-navy-600'}`}></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class={`text-xs font-bold uppercase tracking-wider ${isUpcoming ? 'text-brand-400' : 'text-brand-600'}`}>
          {type}
        </p>
        <h4 class={`font-semibold mt-0.5 ${isUpcoming ? 'text-white' : 'text-navy-900'}`}>{title}</h4>
        <div class="flex items-center gap-2 mt-2">
          <i class={`fas fa-clock text-xs ${isUpcoming ? 'text-slate-400' : 'text-slate-400'}`}></i>
          <p class={`text-sm ${isUpcoming ? 'text-slate-300' : 'text-slate-500'}`}>{datetime}</p>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <div class={`w-7 h-7 rounded-lg ${isUpcoming ? 'bg-white/10' : 'bg-slate-100'} flex items-center justify-center`}>
            <i class={`fas fa-user-doctor text-xs ${isUpcoming ? 'text-brand-400' : 'text-navy-600'}`}></i>
          </div>
          <div>
            <p class={`text-sm font-medium ${isUpcoming ? 'text-white' : 'text-navy-900'}`}>{doctor}</p>
            <p class={`text-xs ${isUpcoming ? 'text-slate-400' : 'text-slate-500'}`}>{specialty}</p>
          </div>
        </div>
      </div>
      {showActions && isUpcoming && (
        <button class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-navy-900 flex items-center justify-center transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95">
          <i class="fas fa-video text-sm"></i>
        </button>
      )}
    </div>
  </div>
)

// Vital card for RPM - Premium design
export const VitalCard = ({ 
  icon, 
  label, 
  value, 
  unit, 
  trend, 
  status = 'normal',
  compact = false
}: { 
  icon: string, 
  label: string, 
  value: string, 
  unit: string, 
  trend?: 'up' | 'down' | 'stable',
  status?: 'normal' | 'warning' | 'critical',
  compact?: boolean
}) => {
  const statusColors = {
    normal: 'border-l-teal-500',
    warning: 'border-l-warning-500',
    critical: 'border-l-danger-500'
  }
  const trendConfig = {
    up: { icon: 'fa-arrow-trend-up', color: 'text-danger-500' },
    down: { icon: 'fa-arrow-trend-down', color: 'text-success-500' },
    stable: { icon: 'fa-minus', color: 'text-slate-400' }
  }
  
  return (
    <div class={`bg-white rounded-2xl border border-slate-100 shadow-card border-l-4 ${statusColors[status]} ${compact ? 'p-3' : 'p-4'}`}>
      <div class="flex items-center justify-between mb-2">
        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <i class={`fas ${icon} text-navy-600`}></i>
        </div>
        {trend && (
          <div class={`flex items-center gap-1 ${trendConfig[trend].color}`}>
            <i class={`fas ${trendConfig[trend].icon} text-sm`}></i>
          </div>
        )}
      </div>
      <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div class="flex items-baseline gap-1 mt-1">
        <span class="text-2xl font-bold text-navy-900">{value}</span>
        <span class="text-sm text-slate-400 font-medium">{unit}</span>
      </div>
    </div>
  )
}

// Section header - Clean design
export const SectionHeader = ({ 
  title, 
  action, 
  actionHref,
  actionIcon = 'fa-arrow-right'
}: { 
  title: string, 
  action?: string, 
  actionHref?: string,
  actionIcon?: string
}) => (
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-bold text-navy-900">{title}</h3>
    {action && actionHref && (
      <a href={actionHref} class="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 transition-colors">
        {action}
        <i class={`fas ${actionIcon} text-xs`}></i>
      </a>
    )}
  </div>
)

// Empty state - Premium design
export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  actionHref 
}: { 
  icon: string, 
  title: string, 
  description: string, 
  action?: string, 
  actionHref?: string 
}) => (
  <div class="text-center py-12 px-4">
    <div class="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
      <i class={`fas ${icon} text-3xl text-slate-400`}></i>
    </div>
    <h3 class="font-semibold text-navy-900 mb-2">{title}</h3>
    <p class="text-sm text-slate-500 mb-6 max-w-sm mx-auto">{description}</p>
    {action && actionHref && (
      <a href={actionHref} class="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all active:scale-95">
        {action}
        <i class="fas fa-arrow-right text-sm"></i>
      </a>
    )}
  </div>
)

// Loading skeleton - Shimmer effect
export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div class={`skeleton rounded-xl ${className}`}></div>
)

// Stat card - Premium metrics display
export const StatCard = ({ 
  label, 
  value, 
  change, 
  changeType = 'neutral',
  icon
}: { 
  label: string, 
  value: string, 
  change?: string, 
  changeType?: 'positive' | 'negative' | 'neutral',
  icon?: string
}) => {
  const changeColors = {
    positive: 'text-success-600 bg-success-50',
    negative: 'text-danger-600 bg-danger-50',
    neutral: 'text-slate-500 bg-slate-100'
  }
  
  return (
    <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <p class="text-2xl font-bold text-navy-900 mt-1">{value}</p>
          {change && (
            <span class={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-2 ${changeColors[changeType]}`}>
              {changeType === 'positive' && <i class="fas fa-arrow-up text-[8px]"></i>}
              {changeType === 'negative' && <i class="fas fa-arrow-down text-[8px]"></i>}
              {change}
            </span>
          )}
        </div>
        {icon && (
          <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <i class={`fas ${icon} text-brand-600`}></i>
          </div>
        )}
      </div>
    </div>
  )
}

// Alert Banner - For important notifications
export const AlertBanner = ({
  type = 'info',
  title,
  message,
  action,
  onDismiss
}: {
  type?: 'info' | 'success' | 'warning' | 'danger',
  title: string,
  message?: string,
  action?: { label: string, href: string },
  onDismiss?: () => void
}) => {
  const styles = {
    info: 'bg-info-50 border-info-200 text-info-900',
    success: 'bg-success-50 border-success-200 text-success-900',
    warning: 'bg-warning-50 border-warning-200 text-warning-900',
    danger: 'bg-danger-50 border-danger-200 text-danger-900'
  }
  const icons = {
    info: 'fa-info-circle text-info-500',
    success: 'fa-check-circle text-success-500',
    warning: 'fa-exclamation-triangle text-warning-500',
    danger: 'fa-exclamation-circle text-danger-500'
  }
  
  return (
    <div class={`rounded-xl border p-4 ${styles[type]}`}>
      <div class="flex items-start gap-3">
        <i class={`fas ${icons[type]} mt-0.5`}></i>
        <div class="flex-1">
          <p class="font-semibold">{title}</p>
          {message && <p class="text-sm mt-0.5 opacity-80">{message}</p>}
          {action && (
            <a href={action.href} class="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:underline">
              {action.label}
              <i class="fas fa-arrow-right text-xs"></i>
            </a>
          )}
        </div>
        {onDismiss && (
          <button onclick={onDismiss} class="opacity-60 hover:opacity-100 transition-opacity">
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

// Feature Card - For showcasing features
export const FeatureCard = ({
  icon,
  title,
  description,
  href,
  color = 'brand'
}: {
  icon: string,
  title: string,
  description: string,
  href?: string,
  color?: 'brand' | 'teal' | 'success' | 'info'
}) => {
  const colorStyles = {
    brand: 'from-brand-400 to-brand-600',
    teal: 'from-teal-400 to-teal-600',
    success: 'from-success-400 to-success-600',
    info: 'from-info-400 to-info-600'
  }
  
  const content = (
    <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all card-lift">
      <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorStyles[color]} flex items-center justify-center mb-4`}>
        <i class={`fas ${icon} text-white text-xl`}></i>
      </div>
      <h3 class="font-semibold text-navy-900 text-lg mb-2">{title}</h3>
      <p class="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
  
  return href ? <a href={href}>{content}</a> : content
}

// Milestone Card - For timeline milestones
export const MilestoneCard = ({
  week,
  title,
  date,
  icon,
  status = 'pending',
  description
}: {
  week: string,
  title: string,
  date: string,
  icon: string,
  status?: 'completed' | 'current' | 'pending',
  description?: string
}) => {
  const statusStyles = {
    completed: {
      iconBg: 'bg-gradient-to-br from-brand-400 to-brand-600 text-navy-900 shadow-glow-brand',
      card: 'bg-white border-slate-100',
      badge: 'bg-success-50 text-success-700 border-success-200'
    },
    current: {
      iconBg: 'bg-navy-900 text-brand-400 shadow-soft-lg ring-2 ring-brand-400/50',
      card: 'bg-brand-50 border-brand-200',
      badge: 'bg-brand-100 text-brand-700 border-brand-200'
    },
    pending: {
      iconBg: 'border-2 border-slate-300 text-slate-400',
      card: 'bg-white border-slate-100 border-dashed',
      badge: 'bg-slate-100 text-slate-500 border-slate-200'
    }
  }
  
  const styles = statusStyles[status]
  
  return (
    <div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div class={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.iconBg}`}>
          <i class={`fas ${status === 'completed' ? 'fa-check' : icon}`}></i>
        </div>
        <div class="w-0.5 flex-1 bg-slate-200 mt-2"></div>
      </div>
      <div class="flex-1 pb-4">
        <div class={`rounded-2xl p-4 border shadow-card ${styles.card}`}>
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wide">{week}</span>
              <h4 class="font-semibold text-navy-900 text-sm">{title}</h4>
              <p class="text-xs text-slate-500 mt-0.5">{date}</p>
              {description && <p class="text-xs text-slate-600 mt-2">{description}</p>}
            </div>
            <span class={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles.badge}`}>
              {status === 'completed' ? 'Done' : status === 'current' ? 'In Progress' : 'Upcoming'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Avatar Group - For showing multiple people
export const AvatarGroup = ({
  avatars,
  max = 4,
  size = 'default'
}: {
  avatars: Array<{ name: string, imageUrl?: string }>,
  max?: number,
  size?: 'small' | 'default' | 'large'
}) => {
  const sizes = {
    small: 'w-8 h-8 text-xs',
    default: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  }
  const displayed = avatars.slice(0, max)
  const remaining = avatars.length - max
  
  return (
    <div class="flex -space-x-2">
      {displayed.map((avatar) => (
        <div class={`${sizes[size]} rounded-full bg-navy-800 border-2 border-white flex items-center justify-center overflow-hidden`}>
          {avatar.imageUrl ? (
            <img src={avatar.imageUrl} alt={avatar.name} class="w-full h-full object-cover" />
          ) : (
            <span class="font-semibold text-brand-400">{avatar.name.charAt(0)}</span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div class={`${sizes[size]} rounded-full bg-brand-500 border-2 border-white flex items-center justify-center`}>
          <span class="font-semibold text-navy-900">+{remaining}</span>
        </div>
      )}
    </div>
  )
}
