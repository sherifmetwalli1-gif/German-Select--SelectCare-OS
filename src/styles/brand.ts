/**
 * SelectCareOS™ Brand Style Guide
 * German Select Medical Tourism Platform
 * 
 * This file contains all brand-related styles for consistency across the platform.
 */

// ============================================================================
// BRAND COLORS
// ============================================================================

export const BRAND_COLORS = {
  // Primary Colors
  navy: '#001F3F',
  navyLight: '#003366',
  navyDark: '#001530',
  
  // Accent Colors
  gold: '#C9A227',
  goldLight: '#E8D5A3',
  goldDark: '#B8922A',
  
  // Background Colors
  cream: '#F8F6F0',
  white: '#FFFFFF',
  
  // Status Colors
  green: '#22C55E',
  greenLight: '#86EFAC',
  coral: '#FF6B35',
  red: '#DC2626',
  amber: '#F59E0B',
  
  // Neutral Colors
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONTS = {
  // Primary font stack - Inter for modern, clean look
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  
  // Monospace for code/numbers
  mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace",
  
  // Display font for headings (optional premium feel)
  display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// ============================================================================
// BRAND CSS VARIABLES
// ============================================================================

export const BRAND_CSS_VARIABLES = `
  :root {
    /* Primary Colors */
    --navy: #001F3F;
    --navy-light: #003366;
    --navy-dark: #001530;
    
    /* Accent Colors */
    --gold: #C9A227;
    --gold-light: #E8D5A3;
    --gold-dark: #B8922A;
    
    /* Background Colors */
    --cream: #F8F6F0;
    --white: #FFFFFF;
    
    /* Status Colors */
    --green: #22C55E;
    --green-light: #86EFAC;
    --coral: #FF6B35;
    --red: #DC2626;
    --amber: #F59E0B;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 31, 63, 0.05);
    --shadow: 0 4px 6px rgba(0, 31, 63, 0.1);
    --shadow-md: 0 4px 20px rgba(0, 31, 63, 0.08);
    --shadow-lg: 0 8px 30px rgba(0, 31, 63, 0.15);
    --shadow-gold: 0 8px 20px rgba(201, 162, 39, 0.4);
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition: 200ms ease;
    --transition-slow: 300ms ease;
  }
`;

// ============================================================================
// STANDARD CSS CLASSES
// ============================================================================

export const BRAND_CSS_CLASSES = `
  /* Typography */
  body {
    font-family: ${FONTS.primary};
    color: var(--navy);
    background: var(--cream);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Background Colors */
  .bg-navy { background-color: var(--navy); }
  .bg-navy-light { background-color: var(--navy-light); }
  .bg-gold { background-color: var(--gold); }
  .bg-gold-light { background-color: var(--gold-light); }
  .bg-cream { background-color: var(--cream); }
  
  /* Text Colors */
  .text-navy { color: var(--navy); }
  .text-gold { color: var(--gold); }
  .text-cream { color: var(--cream); }
  
  /* Border Colors */
  .border-navy { border-color: var(--navy); }
  .border-gold { border-color: var(--gold); }
  
  /* Gradients */
  .gradient-navy {
    background: linear-gradient(135deg, var(--navy) 0%, #002244 50%, var(--navy-dark) 100%);
  }
  
  .gradient-gold {
    background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%);
  }
  
  .gradient-premium {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--gold) 100%);
  }
  
  /* Glassmorphism */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-dark {
    background: rgba(0, 31, 63, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(201, 162, 39, 0.2);
  }
  
  .glass-white {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 31, 63, 0.1);
  }
  
  /* Cards */
  .card {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-slow);
  }
  
  .card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }
  
  .card-flat {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
  }
  
  /* Buttons */
  .btn-gold {
    background: var(--gold);
    color: var(--navy);
    padding: 14px 28px;
    border-radius: var(--radius);
    font-weight: 600;
    transition: all var(--transition-slow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  
  .btn-gold:hover {
    background: var(--gold-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold);
  }
  
  .btn-navy {
    background: var(--navy);
    color: white;
    padding: 14px 28px;
    border-radius: var(--radius);
    font-weight: 600;
    transition: all var(--transition-slow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  
  .btn-navy:hover {
    background: var(--navy-light);
    transform: translateY(-2px);
  }
  
  .btn-outline {
    background: transparent;
    border: 2px solid var(--gold);
    color: var(--gold);
    padding: 12px 26px;
    border-radius: var(--radius);
    font-weight: 600;
    transition: all var(--transition-slow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .btn-outline:hover {
    background: var(--gold);
    color: var(--navy);
  }
  
  .btn-outline-navy {
    background: transparent;
    border: 2px solid var(--navy);
    color: var(--navy);
    padding: 12px 26px;
    border-radius: var(--radius);
    font-weight: 600;
    transition: all var(--transition-slow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .btn-outline-navy:hover {
    background: var(--navy);
    color: white;
  }
  
  /* Status Indicators */
  .status-online {
    background: var(--green);
    animation: pulse 2s infinite;
  }
  
  .status-busy {
    background: var(--amber);
    animation: pulse 2s infinite;
  }
  
  .status-offline {
    background: #9CA3AF;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  /* Avatar Ring */
  .avatar-ring {
    background: linear-gradient(135deg, var(--gold), var(--navy));
    padding: 3px;
    border-radius: 50%;
  }
  
  .avatar-inner {
    background: white;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: var(--navy);
  }
  
  /* Bottom Navigation */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #E5E7EB;
    padding: 8px 0 max(20px, env(safe-area-inset-bottom));
    z-index: 100;
  }
  
  .bottom-nav .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    color: #9CA3AF;
    font-size: 10px;
    text-decoration: none;
    transition: all var(--transition);
  }
  
  .bottom-nav .nav-item:hover { color: #6B7280; }
  .bottom-nav .nav-item.active { color: var(--gold); }
  .bottom-nav .nav-item i { font-size: 22px; margin-bottom: 4px; }
  
  /* Input Styles */
  .input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #E5E7EB;
    border-radius: var(--radius);
    font-size: 16px;
    transition: all var(--transition);
    font-family: inherit;
  }
  
  .input:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--cream);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold-dark);
  }
  
  /* Selection */
  ::selection {
    background: var(--gold);
    color: var(--navy);
  }
  
  /* Focus Visible */
  :focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
  
  /* Safe area padding for mobile */
  main {
    padding-bottom: 100px;
  }
`;

// ============================================================================
// COMPLETE BRAND STYLES (CSS VARIABLES + CLASSES)
// ============================================================================

export const BRAND_STYLES = BRAND_CSS_VARIABLES + BRAND_CSS_CLASSES;

// ============================================================================
// BRAND HEAD SECTION (for HTML pages)
// ============================================================================

export const BRAND_HEAD = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#001F3F">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
`;

// ============================================================================
// BRAND NAVIGATION COMPONENT
// ============================================================================

export function getBrandNavigation(activePage: string = 'home', isRTL: boolean = false): string {
  return `
    <nav class="bg-navy py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-white text-xl font-bold">
          SelectCare<span class="text-gold">OS</span>™
        </a>
        <div class="flex items-center gap-4">
          <a href="/services" class="text-white/80 hover:text-white text-sm hidden md:block">Services</a>
          <a href="/doctors" class="text-white/80 hover:text-white text-sm hidden md:block">Doctors</a>
          <a href="/booking" class="btn-gold text-sm py-2 px-4">
            <i class="fas fa-calendar-check ${isRTL ? 'ml-2' : 'mr-2'}"></i>Book
          </a>
        </div>
      </div>
    </nav>
  `;
}

// ============================================================================
// BRAND BOTTOM NAVIGATION COMPONENT
// ============================================================================

export function getBrandBottomNav(activePage: string = 'home'): string {
  const navItems = [
    { href: '/', icon: 'fa-home', label: 'Home', id: 'home' },
    { href: '/services', icon: 'fa-concierge-bell', label: 'Services', id: 'services' },
    { href: '/instant-doctor', icon: 'fa-video', label: '24/7', id: 'instant' },
    { href: '/doctors', icon: 'fa-user-md', label: 'Doctors', id: 'doctors' },
    { href: '/dashboard', icon: 'fa-user', label: 'Profile', id: 'profile' },
  ];
  
  return `
    <nav class="bottom-nav">
      <div class="flex justify-around items-center max-w-md mx-auto">
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-item ${activePage === item.id ? 'active' : ''}">
            <i class="fas ${item.icon}"></i>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

// ============================================================================
// BRAND FOOTER COMPONENT
// ============================================================================

export function getBrandFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="bg-navy text-white py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-xl font-bold mb-4">
              SelectCare<span class="text-gold">OS</span>™
            </h3>
            <p class="text-white/60 text-sm">
              German Medical Excellence,<br>Red Sea Recovery
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-sm text-white/60">
              <li><a href="/services" class="hover:text-gold">All Services</a></li>
              <li><a href="/packages" class="hover:text-gold">Care Packages</a></li>
              <li><a href="/instant-doctor" class="hover:text-gold">24/7 Doctor</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-sm text-white/60">
              <li><a href="/doctors" class="hover:text-gold">Our Doctors</a></li>
              <li><a href="https://germanselect.org" class="hover:text-gold" target="_blank">German Select</a></li>
              <li><a href="/about" class="hover:text-gold">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contact</h4>
            <ul class="space-y-2 text-sm text-white/60">
              <li><i class="fas fa-envelope text-gold mr-2"></i>info@germanselect.org</li>
              <li><i class="fas fa-phone text-gold mr-2"></i>+49 123 456 789</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-white/40">© ${year} German Select. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <span class="text-xs text-white/40">JCI Accredited</span>
            <span class="text-xs text-white/40">German Board Certified</span>
            <span class="text-xs text-white/40">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Export default
export default {
  BRAND_COLORS,
  FONTS,
  BRAND_CSS_VARIABLES,
  BRAND_CSS_CLASSES,
  BRAND_STYLES,
  BRAND_HEAD,
  getBrandNavigation,
  getBrandBottomNav,
  getBrandFooter,
};
