/**
 * 🏥 Unified Bottom Navigation Component v3.0
 * SelectCareOS™ - Premium Healthcare Navigation
 * 
 * WORLD-CLASS MOBILE-FIRST NAVIGATION
 * Consistent across ALL pages for optimal user experience
 * 
 * Navigation Items (Primary - Always Visible):
 * 1. Home - Landing page
 * 2. Dashboard - Main patient dashboard with Treatments/Retreats tabs
 * 3. MediSense - AI health assistant  
 * 4. Connect - Instant video consultations
 * 5. Profile - User profile and settings
 * 
 * Quick Access (Above Nav Bar):
 * - Treatments (links to /dashboard with treatments tab)
 * - Retreats (links to /retreats)
 * 
 * Floating Actions:
 * - Instant Connect (Video Call) - Right side
 * - Emergency Call (112) - Left side
 */

export type ActivePage = 'home' | 'dashboard' | 'medisense' | 'connect' | 'doctors' | 'profile' | 'treatments' | 'retreats' | 'calculators' | 'services' | 'none';

// Color scheme - German Select Brand
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
       UNIFIED BOTTOM NAVIGATION v3.0 - SelectCareOS Premium Design
       Navy/Gold Theme - Mobile-First, World-Class UX
       ════════════════════════════════════════════════════════════════════════════ */
    
    /* ═══════════════════════════════════════
       QUICK ACCESS BAR (Treatments & Retreats)
       ═══════════════════════════════════════ */
    
    .quick-access-bar {
        position: fixed;
        bottom: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 31, 63, 0.95) 100%);
        padding: 8px 16px 4px;
        z-index: 999;
        display: flex;
        justify-content: center;
        gap: 12px;
    }
    
    .quick-access-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldBright} 100%);
        color: ${COLORS.navy};
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(212, 168, 67, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .quick-access-pill i {
        font-size: 14px;
    }
    
    .quick-access-pill:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 4px 15px rgba(212, 168, 67, 0.5);
    }
    
    .quick-access-pill:active {
        transform: scale(0.98);
    }
    
    .quick-access-pill.retreats {
        background: linear-gradient(135deg, ${COLORS.blue} 0%, #2563EB 100%);
        color: ${COLORS.white};
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
        border-top: 1px solid rgba(0, 31, 63, 0.08);
        padding: 6px 0 max(8px, env(safe-area-inset-bottom));
        z-index: 1000;
        box-shadow: 0 -4px 20px rgba(0, 31, 63, 0.08);
    }
    
    .unified-nav-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 500px;
        margin: 0 auto;
        padding: 0 4px;
    }
    
    .unified-nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 6px 10px;
        color: ${COLORS.gray};
        font-size: 10px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 10px;
        min-width: 52px;
        position: relative;
        -webkit-tap-highlight-color: transparent;
    }
    
    .unified-nav-item i {
        font-size: 20px;
        margin-bottom: 3px;
        transition: all 0.25s ease;
    }
    
    .unified-nav-item span {
        white-space: nowrap;
        letter-spacing: 0.2px;
    }
    
    .unified-nav-item:hover {
        color: ${COLORS.navy};
        background: rgba(212, 168, 67, 0.08);
    }
    
    .unified-nav-item:hover i {
        transform: scale(1.12);
        color: ${COLORS.gold};
    }
    
    .unified-nav-item:active {
        transform: scale(0.95);
    }
    
    .unified-nav-item.active {
        color: ${COLORS.navy};
        background: linear-gradient(135deg, rgba(212, 168, 67, 0.15) 0%, rgba(232, 193, 88, 0.08) 100%);
    }
    
    .unified-nav-item.active i {
        transform: scale(1.1);
        color: ${COLORS.gold};
        filter: drop-shadow(0 2px 4px rgba(212, 168, 67, 0.3));
    }
    
    .unified-nav-item.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 3px;
        background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldBright});
        border-radius: 3px 3px 0 0;
    }
    
    /* Connect Button - Special Styling with Live Indicator */
    .unified-nav-item.connect-special {
        position: relative;
    }
    
    .unified-nav-item .live-dot {
        position: absolute;
        top: 4px;
        right: 10px;
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
            opacity: 0.9; 
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);
        }
    }
    
    /* ═══════════════════════════════════════
       FLOATING ACTION BUTTONS
       ═══════════════════════════════════════ */
    
    .floating-connect {
        position: fixed;
        bottom: 140px;
        right: 16px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldBright});
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${COLORS.navy};
        font-size: 22px;
        box-shadow: 0 4px 20px rgba(212, 168, 67, 0.4), 0 0 0 3px rgba(212, 168, 67, 0.15);
        z-index: 998;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        border: 3px solid ${COLORS.white};
    }
    
    .floating-connect:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 25px rgba(212, 168, 67, 0.5), 0 0 0 5px rgba(212, 168, 67, 0.2);
    }
    
    .floating-connect:active {
        transform: scale(0.95);
    }
    
    .floating-connect .live-indicator {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 14px;
        height: 14px;
        background: ${COLORS.green};
        border-radius: 50%;
        border: 2px solid ${COLORS.white};
        animation: live-pulse 2s infinite;
    }
    
    .floating-connect-label {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 9px;
        font-weight: 700;
        color: ${COLORS.navy};
        white-space: nowrap;
        background: ${COLORS.white};
        padding: 2px 6px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    .floating-emergency {
        position: fixed;
        bottom: 140px;
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
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.35);
        z-index: 998;
        transition: all 0.2s ease;
        text-decoration: none;
        border: 2px solid ${COLORS.white};
    }
    
    .floating-emergency:hover {
        transform: scale(1.06);
        box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45);
    }
    
    .floating-emergency::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(220, 38, 38, 0.25);
        animation: emergency-pulse 2s infinite;
        z-index: -1;
    }
    
    @keyframes emergency-pulse {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(1.4); opacity: 0; }
    }
    
    /* ═══════════════════════════════════════
       PAGE CONTENT SPACING
       ═══════════════════════════════════════ */
    
    .page-content,
    main {
        padding-bottom: 120px !important;
    }
    
    /* ═══════════════════════════════════════
       RESPONSIVE ADJUSTMENTS
       ═══════════════════════════════════════ */
    
    /* Extra small screens (iPhone SE, etc.) */
    @media (max-width: 360px) {
        .unified-nav-item {
            padding: 5px 8px;
            min-width: 46px;
        }
        
        .unified-nav-item i {
            font-size: 18px;
        }
        
        .unified-nav-item span {
            font-size: 9px;
        }
        
        .quick-access-pill {
            padding: 6px 12px;
            font-size: 11px;
        }
        
        .floating-connect {
            width: 50px;
            height: 50px;
            font-size: 20px;
            bottom: 130px;
        }
        
        .floating-emergency {
            width: 44px;
            height: 44px;
            font-size: 16px;
            bottom: 130px;
        }
    }
    
    /* Tablet - Enhanced layout */
    @media (min-width: 768px) {
        .quick-access-bar {
            bottom: 75px;
            padding: 10px 24px 6px;
            gap: 16px;
        }
        
        .quick-access-pill {
            padding: 10px 20px;
            font-size: 13px;
        }
        
        .unified-bottom-nav {
            background: linear-gradient(90deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%);
            border-top: none;
            padding: 10px 0 max(12px, env(safe-area-inset-bottom));
            box-shadow: 0 -4px 30px rgba(0, 31, 63, 0.12);
        }
        
        .unified-nav-container {
            max-width: 600px;
            padding: 0 16px;
        }
        
        .unified-nav-item {
            flex-direction: row;
            gap: 8px;
            padding: 10px 18px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            border-radius: 20px;
        }
        
        .unified-nav-item i {
            font-size: 18px;
            margin-bottom: 0;
        }
        
        .unified-nav-item:hover {
            color: ${COLORS.white};
            background: rgba(212, 168, 67, 0.2);
        }
        
        .unified-nav-item:hover i {
            color: ${COLORS.goldBright};
        }
        
        .unified-nav-item.active {
            color: ${COLORS.navy};
            background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldBright} 100%);
            box-shadow: 0 4px 12px rgba(212, 168, 67, 0.35);
        }
        
        .unified-nav-item.active i {
            color: ${COLORS.navy};
            filter: none;
        }
        
        .unified-nav-item.active::after {
            display: none;
        }
        
        .unified-nav-item .live-dot {
            border-color: ${COLORS.navyLight};
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
    }
    
    /* Desktop - Full enhanced nav */
    @media (min-width: 1024px) {
        .quick-access-bar {
            gap: 20px;
        }
        
        .quick-access-pill {
            padding: 10px 24px;
            font-size: 13px;
        }
        
        .unified-nav-container {
            max-width: 700px;
        }
        
        .unified-nav-item {
            padding: 10px 22px;
            font-size: 13px;
        }
    }
    
    /* Large desktop - Optional hide bottom nav */
    @media (min-width: 1280px) {
        /* Keep bottom nav visible on all screen sizes for consistency */
        /* Uncomment below to hide on large screens if you have desktop sidebar nav */
        /* .unified-bottom-nav, .quick-access-bar { display: none; } */
    }
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
    </a>
    
    <!-- Instant Connect Button (Right - Primary CTA) -->
    <a href="/instant-connect" class="floating-connect" title="Connect with Doctor Now" aria-label="Instant video consultation">
        <span class="live-indicator"></span>
        <i class="fas fa-video"></i>
        <span class="floating-connect-label">Connect</span>
    </a>
    
    <!-- Quick Access Bar - Treatments & Retreats -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill retreats" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
    </div>
    
    <!-- Unified Bottom Navigation -->
    <nav class="unified-bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="unified-nav-container">
            <a href="/" class="unified-nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/dashboard" class="unified-nav-item ${isActive('dashboard')}" aria-label="Dashboard">
                <i class="fas fa-th-large"></i>
                <span>Dashboard</span>
            </a>
            <a href="/medisense" class="unified-nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="unified-nav-item connect-special ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/doctors" class="unified-nav-item ${isActive('doctors')}" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
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
    <!-- Quick Access Bar - Treatments & Retreats -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill retreats" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
    </div>
    
    <!-- Unified Bottom Navigation -->
    <nav class="unified-bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="unified-nav-container">
            <a href="/" class="unified-nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/dashboard" class="unified-nav-item ${isActive('dashboard')}" aria-label="Dashboard">
                <i class="fas fa-th-large"></i>
                <span>Dashboard</span>
            </a>
            <a href="/medisense" class="unified-nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="unified-nav-item connect-special ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/doctors" class="unified-nav-item ${isActive('doctors')}" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
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
    </a>
    
    <!-- Instant Connect Button (Right - Primary CTA) -->
    <a href="/instant-connect" class="floating-connect" title="Connect with Doctor Now" aria-label="Instant video consultation">
        <span class="live-indicator"></span>
        <i class="fas fa-video"></i>
        <span class="floating-connect-label">Connect</span>
    </a>
    `;
}

/**
 * Get quick access bar only (Treatments & Retreats)
 */
export function getQuickAccessBar(): string {
    return `
    <!-- Quick Access Bar - Treatments & Retreats -->
    <div class="quick-access-bar" role="navigation" aria-label="Quick access">
        <a href="/dashboard?tab=treatments" class="quick-access-pill" aria-label="View Treatments">
            <i class="fas fa-procedures"></i>
            <span>Treatments</span>
        </a>
        <a href="/retreats" class="quick-access-pill retreats" aria-label="View Retreats">
            <i class="fas fa-umbrella-beach"></i>
            <span>Retreats</span>
        </a>
    </div>
    `;
}

// Legacy exports for backward compatibility
export const getBottomNav = getUnifiedBottomNav;
export const getBottomNavWithProfile = getUnifiedBottomNav;
export const getBottomNavCompact = getBottomNavOnly;
export function getEmergencyButton(): string {
    return \`<a href="tel:112" class="floating-emergency" title="Emergency Call 112"><i class="fas fa-phone-alt"></i></a>\`;
}
