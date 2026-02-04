/**
 * 🏥 Unified Bottom Navigation Component v4.0
 * SelectCareOS™ - World-Class Healthcare Navigation
 * 
 * ENHANCED MOBILE-FIRST NAVIGATION
 * ================================
 * Clearer, more intuitive navigation that works consistently across ALL pages.
 * 
 * Design Principles:
 * - Clear visual hierarchy with active state indicators
 * - Touch-friendly 48px minimum tap targets
 * - Consistent styling on ALL pages
 * - Reduced cognitive load with clear labels
 * - Accessible with ARIA labels
 * 
 * Navigation Structure:
 * 1. Floating Buttons: Emergency (112) & Instant Connect
 * 2. Quick Access Pills: Treatments | Retreats | Calculators
 * 3. Main Bottom Nav: Home | Services | MediSense | Connect | Profile
 */

export type ActivePage = 
  | 'home' 
  | 'dashboard' 
  | 'services'
  | 'medisense' 
  | 'connect' 
  | 'doctors' 
  | 'profile' 
  | 'treatments' 
  | 'retreats' 
  | 'calculators' 
  | 'telemedicine'
  | 'wellness'
  | 'family'
  | 'marketplace'
  | 'rewards'
  | 'none';

// German Select Brand Colors
const COLORS = {
  navy: '#001F3F',
  navyLight: '#003366',
  navyDark: '#001530',
  gold: '#D4A843',
  goldBright: '#E8C158',
  goldLight: '#F5E6C0',
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  grayDark: '#374151',
  white: '#FFFFFF',
  cream: '#FDFBF7',
  green: '#22C55E',
  red: '#DC2626',
  blue: '#3B82F6',
};

export const bottomNavStyles = `
/* ════════════════════════════════════════════════════════════════════════════
   UNIFIED BOTTOM NAVIGATION v4.0 - SelectCareOS Premium Design
   Clearer, More Intuitive Navigation
   ════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════
   QUICK ACCESS BAR (Treatments, Retreats, Calculators)
   ═══════════════════════════════════════ */

.quick-access-bar {
    position: fixed;
    bottom: 68px;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(253, 251, 247, 0.98) 30%);
    padding: 10px 16px 6px;
    z-index: 999;
    display: flex;
    justify-content: center;
    gap: 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.quick-access-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: ${COLORS.white};
    color: ${COLORS.navy};
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 24px;
    box-shadow: 0 2px 8px rgba(0, 31, 63, 0.1), 0 1px 2px rgba(0, 31, 63, 0.06);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1.5px solid ${COLORS.gold};
    min-height: 40px;
    -webkit-tap-highlight-color: transparent;
}

.quick-access-pill i {
    font-size: 14px;
    color: ${COLORS.gold};
}

.quick-access-pill span {
    letter-spacing: 0.3px;
}

.quick-access-pill:hover,
.quick-access-pill:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(212, 168, 67, 0.3), 0 2px 4px rgba(0, 31, 63, 0.1);
    background: linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.white} 100%);
}

.quick-access-pill:active {
    transform: scale(0.97);
    box-shadow: 0 1px 4px rgba(0, 31, 63, 0.1);
}

.quick-access-pill.highlight {
    background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldBright} 100%);
    color: ${COLORS.navy};
    border-color: ${COLORS.gold};
}

.quick-access-pill.highlight i {
    color: ${COLORS.navy};
}

.quick-access-pill.secondary {
    background: ${COLORS.navy};
    color: ${COLORS.white};
    border-color: ${COLORS.navy};
}

.quick-access-pill.secondary i {
    color: ${COLORS.gold};
}

/* ═══════════════════════════════════════
   MAIN BOTTOM NAVIGATION BAR
   ═══════════════════════════════════════ */

.unified-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${COLORS.white};
    border-top: 1px solid rgba(0, 31, 63, 0.06);
    padding: 4px 0 max(6px, env(safe-area-inset-bottom));
    z-index: 1000;
    box-shadow: 0 -2px 16px rgba(0, 31, 63, 0.06);
}

.unified-nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 4px;
}

.unified-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    color: ${COLORS.gray};
    font-size: 10px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    min-width: 56px;
    min-height: 54px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    letter-spacing: 0.2px;
}

.unified-nav-item i {
    font-size: 20px;
    margin-bottom: 4px;
    transition: all 0.2s ease;
}

.unified-nav-item span {
    white-space: nowrap;
    text-transform: capitalize;
}

.unified-nav-item:hover,
.unified-nav-item:focus {
    color: ${COLORS.navy};
    background: rgba(212, 168, 67, 0.06);
}

.unified-nav-item:hover i,
.unified-nav-item:focus i {
    transform: scale(1.1);
    color: ${COLORS.gold};
}

.unified-nav-item:active {
    transform: scale(0.95);
    background: rgba(212, 168, 67, 0.1);
}

/* Active State - Clear Indicator */
.unified-nav-item.active {
    color: ${COLORS.navy};
    background: linear-gradient(180deg, rgba(212, 168, 67, 0.12) 0%, rgba(232, 193, 88, 0.06) 100%);
}

.unified-nav-item.active i {
    transform: scale(1.05);
    color: ${COLORS.gold};
}

.unified-nav-item.active span {
    font-weight: 700;
    color: ${COLORS.navy};
}

/* Active indicator bar */
.unified-nav-item.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldBright});
    border-radius: 0 0 3px 3px;
}

/* Connect Button - Special Styling with Live Indicator */
.unified-nav-item.connect-btn {
    position: relative;
}

.unified-nav-item .live-dot {
    position: absolute;
    top: 6px;
    right: 12px;
    width: 8px;
    height: 8px;
    background: ${COLORS.green};
    border-radius: 50%;
    border: 2px solid ${COLORS.white};
    animation: live-pulse 2s infinite;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
}

@keyframes live-pulse {
    0%, 100% { 
        opacity: 1; 
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
    }
    50% { 
        opacity: 0.85; 
        box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
    }
}

/* ═══════════════════════════════════════
   FLOATING ACTION BUTTONS
   ═══════════════════════════════════════ */

.floating-connect {
    position: fixed;
    bottom: 135px;
    right: 16px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldBright} 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.navy};
    font-size: 22px;
    box-shadow: 0 4px 16px rgba(212, 168, 67, 0.4), 0 0 0 4px rgba(212, 168, 67, 0.12);
    z-index: 998;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    border: 3px solid ${COLORS.white};
}

.floating-connect:hover,
.floating-connect:focus {
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(212, 168, 67, 0.5), 0 0 0 6px rgba(212, 168, 67, 0.15);
}

.floating-connect:active {
    transform: scale(0.96);
}

.floating-connect .live-indicator {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 14px;
    height: 14px;
    background: ${COLORS.green};
    border-radius: 50%;
    border: 2.5px solid ${COLORS.white};
    animation: live-pulse 2s infinite;
}

.floating-connect-label {
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    font-weight: 700;
    color: ${COLORS.navy};
    white-space: nowrap;
    background: ${COLORS.white};
    padding: 3px 8px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
}

.floating-emergency {
    position: fixed;
    bottom: 135px;
    left: 16px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, ${COLORS.red}, #B91C1C);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.white};
    font-size: 18px;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);
    z-index: 998;
    transition: all 0.25s ease;
    text-decoration: none;
    border: 2px solid ${COLORS.white};
}

.floating-emergency:hover,
.floating-emergency:focus {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45);
}

.floating-emergency:active {
    transform: scale(0.95);
}

.floating-emergency::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(220, 38, 38, 0.3);
    animation: emergency-pulse 2.5s infinite;
    z-index: -1;
}

@keyframes emergency-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
}

.floating-emergency-label {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8px;
    font-weight: 700;
    color: ${COLORS.red};
    white-space: nowrap;
    background: ${COLORS.white};
    padding: 2px 6px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* ═══════════════════════════════════════
   PAGE CONTENT SPACING
   ═══════════════════════════════════════ */

.page-content,
.main-content,
main {
    padding-bottom: 130px !important;
}

/* ═══════════════════════════════════════
   RESPONSIVE ADJUSTMENTS
   ═══════════════════════════════════════ */

/* Extra small screens (iPhone SE, etc.) */
@media (max-width: 360px) {
    .quick-access-bar {
        gap: 6px;
        padding: 8px 12px 4px;
    }
    
    .quick-access-pill {
        padding: 8px 12px;
        font-size: 11px;
        min-height: 36px;
    }
    
    .quick-access-pill i {
        font-size: 12px;
    }
    
    .unified-nav-item {
        padding: 6px 8px;
        min-width: 50px;
        min-height: 50px;
    }
    
    .unified-nav-item i {
        font-size: 18px;
    }
    
    .unified-nav-item span {
        font-size: 9px;
    }
    
    .floating-connect {
        width: 50px;
        height: 50px;
        font-size: 20px;
        bottom: 125px;
        right: 12px;
    }
    
    .floating-emergency {
        width: 44px;
        height: 44px;
        font-size: 16px;
        bottom: 125px;
        left: 12px;
    }
}

/* Small phones (375px) */
@media (min-width: 361px) and (max-width: 390px) {
    .quick-access-bar {
        gap: 8px;
    }
    
    .quick-access-pill {
        padding: 9px 14px;
        font-size: 11px;
    }
}

/* Tablet - Enhanced layout */
@media (min-width: 768px) {
    .quick-access-bar {
        bottom: 72px;
        padding: 12px 24px 8px;
        gap: 14px;
    }
    
    .quick-access-pill {
        padding: 12px 22px;
        font-size: 13px;
        min-height: 44px;
    }
    
    .unified-bottom-nav {
        background: linear-gradient(90deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%);
        border-top: none;
        padding: 8px 0 max(10px, env(safe-area-inset-bottom));
        box-shadow: 0 -4px 24px rgba(0, 31, 63, 0.12);
    }
    
    .unified-nav-container {
        max-width: 600px;
        padding: 0 20px;
    }
    
    .unified-nav-item {
        flex-direction: row;
        gap: 8px;
        padding: 12px 20px;
        color: rgba(255, 255, 255, 0.75);
        font-size: 13px;
        border-radius: 24px;
        min-height: 48px;
    }
    
    .unified-nav-item i {
        font-size: 18px;
        margin-bottom: 0;
    }
    
    .unified-nav-item span {
        font-weight: 500;
    }
    
    .unified-nav-item:hover,
    .unified-nav-item:focus {
        color: ${COLORS.white};
        background: rgba(212, 168, 67, 0.2);
    }
    
    .unified-nav-item:hover i,
    .unified-nav-item:focus i {
        color: ${COLORS.goldBright};
    }
    
    .unified-nav-item.active {
        color: ${COLORS.navy};
        background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldBright} 100%);
        box-shadow: 0 4px 14px rgba(212, 168, 67, 0.4);
    }
    
    .unified-nav-item.active i {
        color: ${COLORS.navy};
        filter: none;
    }
    
    .unified-nav-item.active span {
        color: ${COLORS.navy};
    }
    
    .unified-nav-item.active::after {
        display: none;
    }
    
    .unified-nav-item .live-dot {
        border-color: ${COLORS.navyLight};
        top: 8px;
        right: 14px;
    }
    
    .floating-connect {
        bottom: 150px;
        right: 24px;
        width: 64px;
        height: 64px;
        font-size: 26px;
    }
    
    .floating-emergency {
        bottom: 150px;
        left: 24px;
        width: 54px;
        height: 54px;
        font-size: 20px;
    }
    
    .page-content,
    .main-content,
    main {
        padding-bottom: 140px !important;
    }
}

/* Desktop - Full enhanced nav */
@media (min-width: 1024px) {
    .quick-access-bar {
        gap: 18px;
    }
    
    .quick-access-pill {
        padding: 12px 26px;
        font-size: 14px;
    }
    
    .unified-nav-container {
        max-width: 700px;
    }
    
    .unified-nav-item {
        padding: 12px 24px;
        font-size: 14px;
    }
}

/* Large desktop - Keep navigation visible for consistency */
@media (min-width: 1280px) {
    .floating-connect,
    .floating-emergency {
        bottom: 160px;
    }
}

/* ═══════════════════════════════════════
   HIDE SCROLLBAR UTILITY
   ═══════════════════════════════════════ */

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

/**
 * Get the unified bottom navigation HTML with quick access bar
 * @param activePage - The currently active page
 * @returns HTML string for the complete navigation system
 */
export function getUnifiedBottomNav(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Emergency Call Button (Left) -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112" aria-label="Emergency Call">
        <i class="fas fa-phone-alt"></i>
        <span class="floating-emergency-label">SOS 112</span>
    </a>
    
    <!-- Instant Connect Button (Right - Primary CTA) -->
    <a href="/instant-connect" class="floating-connect" title="Connect with Doctor Now" aria-label="Instant video consultation">
        <span class="live-indicator"></span>
        <i class="fas fa-video"></i>
        <span class="floating-connect-label">CONNECT</span>
    </a>
    
    <!-- Quick Access Bar - Key Features -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill highlight" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
        <a href="/calculators" class="quick-access-pill" aria-label="Health Calculators">
            <i class="fas fa-calculator"></i>
            <span>Calculators</span>
        </a>
    </div>
    
    <!-- Unified Bottom Navigation -->
    <nav class="unified-bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="unified-nav-container">
            <a href="/" class="unified-nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/services" class="unified-nav-item ${isActive('services')}" aria-label="Services">
                <i class="fas fa-hospital"></i>
                <span>Services</span>
            </a>
            <a href="/medisense" class="unified-nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="unified-nav-item connect-btn ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/profile" class="unified-nav-item ${isActive('profile')}" aria-label="Profile">
                <i class="fas fa-user-circle"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    `;
}

/**
 * Get navigation without floating buttons (for pages with custom CTAs)
 */
export function getBottomNavOnly(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Quick Access Bar - Key Features -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill highlight" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
        <a href="/calculators" class="quick-access-pill" aria-label="Health Calculators">
            <i class="fas fa-calculator"></i>
            <span>Calculators</span>
        </a>
    </div>
    
    <!-- Unified Bottom Navigation -->
    <nav class="unified-bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="unified-nav-container">
            <a href="/" class="unified-nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/services" class="unified-nav-item ${isActive('services')}" aria-label="Services">
                <i class="fas fa-hospital"></i>
                <span>Services</span>
            </a>
            <a href="/medisense" class="unified-nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="unified-nav-item connect-btn ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/profile" class="unified-nav-item ${isActive('profile')}" aria-label="Profile">
                <i class="fas fa-user-circle"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    `;
}

/**
 * Get floating action buttons only
 */
export function getFloatingButtons(): string {
    return `
    <!-- Emergency Call Button (Left) -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112" aria-label="Emergency Call">
        <i class="fas fa-phone-alt"></i>
        <span class="floating-emergency-label">SOS 112</span>
    </a>
    
    <!-- Instant Connect Button (Right - Primary CTA) -->
    <a href="/instant-connect" class="floating-connect" title="Connect with Doctor Now" aria-label="Instant video consultation">
        <span class="live-indicator"></span>
        <i class="fas fa-video"></i>
        <span class="floating-connect-label">CONNECT</span>
    </a>
    `;
}

/**
 * Get quick access bar only (Treatments, Retreats, Calculators)
 */
export function getQuickAccessBar(): string {
    return `
    <!-- Quick Access Bar - Key Features -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill highlight" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
        <a href="/calculators" class="quick-access-pill" aria-label="Health Calculators">
            <i class="fas fa-calculator"></i>
            <span>Calculators</span>
        </a>
    </div>
    `;
}

// Legacy exports for backward compatibility
export const getBottomNav = getUnifiedBottomNav;
export const getBottomNavWithProfile = getUnifiedBottomNav;
export const getBottomNavCompact = getBottomNavOnly;
export function getEmergencyButton(): string {
    return `<a href="tel:112" class="floating-emergency" title="Emergency Call 112"><i class="fas fa-phone-alt"></i></a>`;
}
