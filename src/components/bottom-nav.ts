/**
 * 🏥 Unified Bottom Navigation Component
 * SelectCareOS™ - Healthcare-First Navigation (Option A)
 * 
 * STANDARDIZED across ALL pages for consistent user experience
 * 
 * Navigation Items:
 * 1. Home - Main dashboard
 * 2. MediSense - AI symptom checker  
 * 3. Connect - Instant video consultations
 * 4. Doctors - Find and manage care team
 * 5. Profile - Personal health dashboard
 * 
 * Floating Action: Emergency Call (112)
 */

export type ActivePage = 'home' | 'medisense' | 'connect' | 'doctors' | 'profile' | 'none';

export const bottomNavStyles = `
    /* ════════════════════════════════════════════════════════════════
       BOTTOM NAVIGATION - Healthcare-First Design
       ════════════════════════════════════════════════════════════════ */
    
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid #E5E7EB;
        padding: 8px 0 max(12px, env(safe-area-inset-bottom));
        z-index: 1000;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .bottom-nav-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 500px;
        margin: 0 auto;
        padding: 0 8px;
    }
    
    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 6px 12px;
        color: #9CA3AF;
        font-size: 10px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        border-radius: 8px;
        min-width: 56px;
        position: relative;
    }
    
    .nav-item i {
        font-size: 20px;
        margin-bottom: 4px;
        transition: transform 0.2s ease;
    }
    
    .nav-item span {
        white-space: nowrap;
    }
    
    .nav-item:hover {
        color: #6B7280;
        background: rgba(0, 0, 0, 0.02);
    }
    
    .nav-item:hover i {
        transform: scale(1.1);
    }
    
    .nav-item.active {
        color: #C9A227;
    }
    
    .nav-item.active i {
        transform: scale(1.1);
    }
    
    /* Connect button with live indicator */
    .nav-item.connect-btn {
        position: relative;
    }
    
    .nav-item.connect-btn .live-dot {
        position: absolute;
        top: 4px;
        right: 12px;
        width: 8px;
        height: 8px;
        background: #22C55E;
        border-radius: 50%;
        border: 2px solid white;
        animation: pulse-dot 2s infinite;
    }
    
    @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.2); }
    }
    
    /* ════════════════════════════════════════════════════════════════
       FLOATING EMERGENCY BUTTON
       ════════════════════════════════════════════════════════════════ */
    
    .floating-emergency {
        position: fixed;
        bottom: 90px;
        right: 16px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #DC2626, #B91C1C);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
        box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
        z-index: 999;
        transition: all 0.2s ease;
        text-decoration: none;
        border: 3px solid white;
    }
    
    .floating-emergency:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 24px rgba(220, 38, 38, 0.5);
    }
    
    .floating-emergency:active {
        transform: scale(0.95);
    }
    
    /* Pulse animation for emergency button */
    .floating-emergency::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(220, 38, 38, 0.3);
        animation: emergency-pulse 2s infinite;
        z-index: -1;
    }
    
    @keyframes emergency-pulse {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(1.5); opacity: 0; }
    }
    
    /* ════════════════════════════════════════════════════════════════
       PAGE CONTENT SPACING
       ════════════════════════════════════════════════════════════════ */
    
    .page-content {
        padding-bottom: 100px;
    }
    
    /* ════════════════════════════════════════════════════════════════
       RESPONSIVE ADJUSTMENTS
       ════════════════════════════════════════════════════════════════ */
    
    @media (max-width: 360px) {
        .nav-item {
            padding: 6px 8px;
            min-width: 48px;
        }
        
        .nav-item i {
            font-size: 18px;
        }
        
        .nav-item span {
            font-size: 9px;
        }
    }
    
    @media (min-width: 768px) {
        .bottom-nav {
            display: none; /* Hide on desktop - use header nav instead */
        }
        
        .floating-emergency {
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            font-size: 26px;
        }
    }
`;

/**
 * Standard Bottom Navigation - Option A: Healthcare-First
 * Use this on ALL pages for consistency
 */
export function getBottomNav(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>
    
    <!-- Bottom Navigation - Healthcare-First (Option A) -->
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/" class="nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="nav-item connect-btn ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/care-team" class="nav-item ${isActive('doctors')}" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item ${isActive('profile')}" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    `;
}

/**
 * Bottom Navigation HTML only (without floating button)
 * For pages that have their own floating action
 */
export function getBottomNavOnly(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Bottom Navigation - Healthcare-First (Option A) -->
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
        <div class="bottom-nav-container">
            <a href="/" class="nav-item ${isActive('home')}" aria-label="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/medisense" class="nav-item ${isActive('medisense')}" aria-label="MediSense AI">
                <i class="fas fa-brain"></i>
                <span>MediSense</span>
            </a>
            <a href="/instant-connect" class="nav-item connect-btn ${isActive('connect')}" aria-label="Instant Connect">
                <span class="live-dot"></span>
                <i class="fas fa-video"></i>
                <span>Connect</span>
            </a>
            <a href="/care-team" class="nav-item ${isActive('doctors')}" aria-label="Doctors">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/dashboard" class="nav-item ${isActive('profile')}" aria-label="My Profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    `;
}

/**
 * Get just the emergency button
 */
export function getEmergencyButton(): string {
    return `
    <!-- Emergency Call Button -->
    <a href="tel:112" class="floating-emergency" title="Emergency Call 112">
        <i class="fas fa-phone-alt"></i>
    </a>
    `;
}

/**
 * Legacy function aliases for backward compatibility
 * @deprecated Use getBottomNav() instead
 */
export const getBottomNavWithProfile = getBottomNav;
export const getBottomNavCompact = getBottomNavOnly;
