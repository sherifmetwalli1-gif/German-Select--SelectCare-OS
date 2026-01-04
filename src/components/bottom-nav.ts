/**
 * Shared Bottom Navigation Component
 * Used across all SelectCareOS pages for consistent navigation
 */

export type ActivePage = 'home' | 'wellness' | 'medisense' | 'rewards' | 'shop' | 'profile' | 'dashboard' | 'none';

export const bottomNavStyles = `
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
    
    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 12px;
        color: #9CA3AF;
        font-size: 10px;
        text-decoration: none;
        transition: all 0.2s;
    }
    
    .nav-item:hover { color: #6B7280; }
    .nav-item.active { color: #C9A227; }
    .nav-item i { font-size: 22px; margin-bottom: 4px; }
    
    /* Floating AI Button */
    .floating-action {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #C9A227, #B8922A);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1B2B5B;
        font-size: 24px;
        box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
        z-index: 50;
        transition: all 0.2s;
        text-decoration: none;
    }
    
    .floating-action:hover { transform: scale(1.05); box-shadow: 0 6px 24px rgba(201, 162, 39, 0.5); }
    .floating-action:active { transform: scale(0.95); }
    
    /* Content padding for bottom nav */
    .page-content { padding-bottom: 100px; }
`;

export function getBottomNav(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Floating AI Button -->
    <a href="/ai-concierge" class="floating-action" title="AI Health Assistant">
        <i class="fas fa-robot"></i>
    </a>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item ${isActive('home')}">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item ${isActive('wellness')}">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/medisense" class="nav-item ${isActive('medisense')}">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/rewards" class="nav-item ${isActive('rewards')}">
                <i class="fas fa-coins"></i>
                <span>Rewards</span>
            </a>
            <a href="/marketplace" class="nav-item ${isActive('shop')}">
                <i class="fas fa-store"></i>
                <span>Shop</span>
            </a>
        </div>
    </nav>
    `;
}

// Extended nav with profile for logged-in users
export function getBottomNavWithProfile(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Floating AI Button -->
    <a href="/ai-concierge" class="floating-action" title="AI Health Assistant">
        <i class="fas fa-robot"></i>
    </a>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item ${isActive('home')}">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item ${isActive('wellness')}">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/medisense" class="nav-item ${isActive('medisense')}">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/marketplace" class="nav-item ${isActive('shop')}">
                <i class="fas fa-store"></i>
                <span>Shop</span>
            </a>
            <a href="/dashboard" class="nav-item ${isActive('dashboard')}">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
    `;
}

// Compact version without floating button
export function getBottomNavCompact(activePage: ActivePage = 'none'): string {
    const isActive = (page: ActivePage) => activePage === page ? 'active' : '';
    
    return `
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item ${isActive('home')}">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/daily-wellness" class="nav-item ${isActive('wellness')}">
                <i class="fas fa-heart"></i>
                <span>Wellness</span>
            </a>
            <a href="/medisense" class="nav-item ${isActive('medisense')}">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/rewards" class="nav-item ${isActive('rewards')}">
                <i class="fas fa-coins"></i>
                <span>Rewards</span>
            </a>
            <a href="/marketplace" class="nav-item ${isActive('shop')}">
                <i class="fas fa-store"></i>
                <span>Shop</span>
            </a>
        </div>
    </nav>
    `;
}
