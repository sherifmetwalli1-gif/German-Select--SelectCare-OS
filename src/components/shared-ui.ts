/**
 * SelectCareOS™ Shared UI Components
 * Reusable UI components with multi-language support
 */

import { 
  LANGUAGE_CONFIG, 
  t, 
  getDir, 
  generateLanguageSelector,
  generateLanguageScript,
  type SupportedLanguage 
} from '../services/app-i18n'

// ============================================================================
// SHARED HEADER COMPONENT
// ============================================================================

export function sharedHeader(lang: SupportedLanguage, options: {
  title?: string
  showNav?: boolean
  showUserMenu?: boolean
  userName?: string
  userInitials?: string
  points?: number
  transparent?: boolean
} = {}): string {
  const {
    title = 'SelectCareOS',
    showNav = true,
    showUserMenu = true,
    userName = 'Sherif',
    userInitials = 'SM',
    points = 8450,
    transparent = false
  } = options
  
  const dir = getDir(lang)
  const langSelector = generateLanguageSelector(lang)
  const bgClass = transparent ? 'bg-transparent' : 'gradient-navy'
  
  return `
    <header class="${bgClass}">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}">
          <!-- Logo -->
          <div class="flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'}">
            <a href="/?lang=${lang}" class="text-2xl font-bold text-white">
              SelectCare<span class="text-gold">OS</span>™
            </a>
            <span class="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full hidden md:inline">
              ${t('header.patientPortal', lang)}
            </span>
          </div>
          
          <!-- Right Side -->
          <div class="flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-3' : 'space-x-3'}">
            <!-- Language Selector -->
            ${langSelector}
            
            ${showUserMenu ? `
              <!-- Points Badge -->
              <a href="/rewards?lang=${lang}" class="hidden sm:flex items-center gap-1 bg-gradient-to-r from-gold to-yellow-500 text-navy px-3 py-1.5 rounded-full text-sm font-bold">
                <i class="fas fa-coins"></i>
                <span>${points.toLocaleString()}</span>
              </a>
              
              <!-- Notifications -->
              <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white relative" title="${t('header.notifications', lang)}">
                <i class="fas fa-bell"></i>
                <span class="absolute -top-1 -${dir === 'rtl' ? 'left' : 'right'}-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              
              <!-- User Avatar -->
              <a href="/patient-dashboard?lang=${lang}" class="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy font-bold">
                ${userInitials}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </header>
  `
}

// ============================================================================
// BOTTOM NAVIGATION COMPONENT
// ============================================================================

export function bottomNav(lang: SupportedLanguage, activePage: string = 'home'): string {
  const dir = getDir(lang)
  
  const navItems = [
    { id: 'home', href: '/', icon: 'fa-home', label: t('nav.home', lang) },
    { id: 'wellness', href: '/daily-wellness', icon: 'fa-heart', label: t('nav.wellness', lang) },
    { id: 'medisense', href: '/medisense', icon: 'fa-stethoscope', label: 'MediSense' },
    { id: 'rewards', href: '/rewards', icon: 'fa-coins', label: t('nav.rewards', lang) },
    { id: 'profile', href: '/patient-dashboard', icon: 'fa-user', label: t('nav.profile', lang) }
  ]
  
  return `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style="padding-bottom: max(12px, env(safe-area-inset-bottom))">
      <div class="flex justify-around items-center max-w-md mx-auto py-2">
        ${navItems.map(item => `
          <a href="${item.href}?lang=${lang}" class="flex flex-col items-center px-3 py-1 ${activePage === item.id ? 'text-gold' : 'text-gray-400'}">
            <i class="fas ${item.icon} text-xl mb-1"></i>
            <span class="text-xs">${item.label}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `
}

// ============================================================================
// PAGE WRAPPER WITH LANGUAGE SUPPORT
// ============================================================================

export function pageWrapper(lang: SupportedLanguage, options: {
  title: string
  description?: string
  bodyClass?: string
  headerOptions?: Parameters<typeof sharedHeader>[1]
  showBottomNav?: boolean
  activePage?: string
  additionalHead?: string
  additionalStyles?: string
}): { open: string, close: string } {
  const {
    title,
    description = 'SelectCareOS - German Excellence, Egyptian Care',
    bodyClass = 'bg-cream',
    headerOptions = {},
    showBottomNav = true,
    activePage = 'home',
    additionalHead = '',
    additionalStyles = ''
  } = options
  
  const dir = getDir(lang)
  
  const open = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title} - SelectCareOS™</title>
  <meta name="description" content="${description}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  ${additionalHead}
  <style>
    :root {
      --navy: #001F3F;
      --navy-light: #003366;
      --gold: #C9A227;
      --gold-light: #E8D5A3;
      --cream: #F8F6F0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      ${showBottomNav ? 'padding-bottom: 80px;' : ''}
    }
    
    .bg-navy { background-color: var(--navy); }
    .bg-navy-light { background-color: var(--navy-light); }
    .bg-gold { background-color: var(--gold); }
    .bg-gold-light { background-color: var(--gold-light); }
    .bg-cream { background-color: var(--cream); }
    .text-navy { color: var(--navy); }
    .text-gold { color: var(--gold); }
    .border-gold { border-color: var(--gold); }
    
    .gradient-navy { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%); }
    .gradient-gold { background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%); }
    
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 31, 63, 0.08);
    }
    
    ${additionalStyles}
  </style>
</head>
<body class="${bodyClass}">
  <!-- Language Change Script -->
  <script>
    ${generateLanguageScript()}
  </script>
  
  ${sharedHeader(lang, headerOptions)}
  
  <main class="max-w-7xl mx-auto px-4 py-6">
`

  const close = `
  </main>
  
  ${showBottomNav ? bottomNav(lang, activePage) : ''}
  
  <!-- Floating AI Button -->
  <a href="/ai-concierge?lang=${lang}" class="fixed bottom-24 ${dir === 'rtl' ? 'left-5' : 'right-5'} w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg z-40" title="${t('ai.title', lang)}">
    <i class="fas fa-robot text-navy text-xl"></i>
  </a>
</body>
</html>`

  return { open, close }
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

export { LANGUAGE_CONFIG, t, getDir, generateLanguageSelector, generateLanguageScript }
export type { SupportedLanguage }
