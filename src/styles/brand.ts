/**
 * SelectCareOS™ Unified Brand Design System
 * German Select Medical Tourism Platform
 * 
 * This file contains the complete brand design system ensuring consistency
 * across all pages including dashboard, health calculators, and all other views.
 * 
 * Version: 2.0 - Enhanced with unified visual hierarchy and micro-interactions
 */

// ============================================================================
// BRAND COLORS
// ============================================================================

export const BRAND_COLORS = {
  // Primary Navy Palette
  navy: '#001F3F',
  navyLight: '#003366',
  navyDark: '#001529',
  
  // Premium Gold Palette
  gold: '#D4A843',
  goldBright: '#E8C158',
  goldLight: '#F5E6C0',
  goldWarm: '#B8941F',
  goldGlow: 'rgba(212, 168, 67, 0.4)',
  
  // Background Colors
  cream: '#FDFBF7',
  creamWarm: '#FDF8EC',
  white: '#FFFFFF',
  
  // Status Colors
  green: '#22C55E',
  greenLight: '#86EFAC',
  coral: '#FF6B35',
  red: '#DC2626',
  amber: '#F59E0B',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  pink: '#EC4899',
  teal: '#14B8A6',
  
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
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace",
  display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// ============================================================================
// UNIFIED CSS DESIGN SYSTEM
// ============================================================================

export const UNIFIED_CSS = `
  /* ═══════════════════════════════════════════════════════════════════════════
     SELECTCAREOS™ UNIFIED DESIGN SYSTEM v2.0
     Consistent branding across all pages
     ═══════════════════════════════════════════════════════════════════════════ */

  :root {
    /* ─────────────────────────────────────────────────────────────────────────
       COLOR TOKENS
       ───────────────────────────────────────────────────────────────────────── */
    --navy: #001F3F;
    --navy-light: #003366;
    --navy-dark: #001529;
    --gold: #D4A843;
    --gold-bright: #E8C158;
    --gold-light: #F5E6C0;
    --gold-warm: #B8941F;
    --gold-glow: rgba(212, 168, 67, 0.4);
    --cream: #FDFBF7;
    --cream-warm: #FDF8EC;
    
    /* ─────────────────────────────────────────────────────────────────────────
       SPACING SYSTEM
       ───────────────────────────────────────────────────────────────────────── */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;
    --spacing-3xl: 64px;
    
    /* ─────────────────────────────────────────────────────────────────────────
       SHADOW SYSTEM - Visual Depth Layers
       ───────────────────────────────────────────────────────────────────────── */
    --shadow-xs: 0 1px 2px rgba(0, 31, 63, 0.04);
    --shadow-sm: 0 2px 8px rgba(0, 31, 63, 0.06);
    --shadow-md: 0 4px 16px rgba(0, 31, 63, 0.08);
    --shadow-lg: 0 8px 32px rgba(0, 31, 63, 0.12);
    --shadow-xl: 0 16px 48px rgba(0, 31, 63, 0.16);
    --shadow-glow: 0 0 24px rgba(212, 168, 67, 0.25);
    --shadow-gold: 0 8px 24px rgba(212, 168, 67, 0.35);
    
    /* ─────────────────────────────────────────────────────────────────────────
       BORDER RADIUS SYSTEM
       ───────────────────────────────────────────────────────────────────────── */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --radius-3xl: 32px;
    --radius-full: 9999px;
    
    /* ─────────────────────────────────────────────────────────────────────────
       TRANSITION PRESETS
       ───────────────────────────────────────────────────────────────────────── */
    --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --transition-fast: 150ms var(--ease-smooth);
    --transition: 200ms var(--ease-smooth);
    --transition-slow: 300ms var(--ease-smooth);
    --transition-spring: 350ms var(--ease-spring);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     BASE STYLES
     ═══════════════════════════════════════════════════════════════════════════ */
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }
  
  body {
    background: linear-gradient(180deg, var(--cream-warm) 0%, var(--cream) 50%, #F5F0E6 100%);
    color: var(--navy);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     COLOR UTILITY CLASSES
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .bg-navy { background-color: var(--navy); }
  .bg-navy-light { background-color: var(--navy-light); }
  .bg-gold { background-color: var(--gold); }
  .bg-gold-light { background-color: var(--gold-light); }
  .bg-gold-bright { background-color: var(--gold-bright); }
  .bg-cream { background-color: var(--cream); }
  .bg-cream-warm { background-color: var(--cream-warm); }
  .text-navy { color: var(--navy); }
  .text-gold { color: var(--gold); }
  .text-gold-bright { color: var(--gold-bright); }
  .border-gold { border-color: var(--gold); }
  .border-navy { border-color: var(--navy); }

  /* ═══════════════════════════════════════════════════════════════════════════
     GRADIENT SYSTEM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .gradient-navy {
    background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-light) 100%);
  }
  
  .gradient-gold {
    background: linear-gradient(135deg, var(--gold-warm) 0%, var(--gold) 50%, var(--gold-bright) 100%);
  }
  
  .gradient-gold-subtle {
    background: linear-gradient(135deg, rgba(212, 168, 67, 0.08) 0%, rgba(232, 193, 88, 0.15) 100%);
  }
  
  .gradient-hero {
    background: linear-gradient(135deg, var(--navy) 0%, #0A2E4F 40%, var(--navy) 100%);
    position: relative;
    overflow: hidden;
  }
  
  .gradient-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(ellipse at center, rgba(212, 168, 67, 0.15) 0%, transparent 70%);
    animation: pulse-glow 8s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
  
  .gradient-mesh {
    background: 
      radial-gradient(at 40% 20%, rgba(212, 168, 67, 0.12) 0px, transparent 50%),
      radial-gradient(at 80% 0%, rgba(0, 51, 102, 0.08) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(212, 168, 67, 0.08) 0px, transparent 50%),
      radial-gradient(at 80% 50%, rgba(0, 31, 63, 0.06) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(212, 168, 67, 0.1) 0px, transparent 50%);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     GLASSMORPHISM EFFECTS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .glass-dark {
    background: rgba(0, 31, 63, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 168, 67, 0.2);
  }
  
  .glass-gold {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 248, 236, 0.9) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(212, 168, 67, 0.2);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     UNIFIED CARD SYSTEM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .card {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 100%);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(212, 168, 67, 0.08);
    transition: all var(--transition-spring);
    position: relative;
    overflow: hidden;
  }
  
  .card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
    transform: scaleX(0);
    transition: transform 0.4s var(--ease-spring);
    transform-origin: left;
  }
  
  .card:hover {
    box-shadow: var(--shadow-xl), var(--shadow-glow);
    border-color: rgba(212, 168, 67, 0.2);
    transform: translateY(-4px);
  }
  
  .card:hover::after {
    transform: scaleX(1);
  }
  
  .card-premium {
    background: linear-gradient(145deg, #FFFFFF 0%, var(--cream-warm) 100%);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(212, 168, 67, 0.15);
    position: relative;
    overflow: hidden;
  }
  
  .card-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gold-warm), var(--gold), var(--gold-bright));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     BUTTON SYSTEM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-bright));
    color: var(--navy);
    padding: 14px 28px;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 15px;
    transition: all var(--transition-spring);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }
  
  .btn-primary:hover {
    background: linear-gradient(135deg, var(--gold-warm), var(--gold));
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold);
  }
  
  .btn-primary:active {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    color: white;
    padding: 14px 28px;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 15px;
    transition: all var(--transition-spring);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .btn-outline {
    background: transparent;
    border: 2px solid var(--gold);
    color: var(--gold);
    padding: 12px 26px;
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: all var(--transition-spring);
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
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SECTION HEADERS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid rgba(0, 31, 63, 0.06);
    position: relative;
  }
  
  .section-header::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-bright));
    border-radius: 2px;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .section-icon {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-spring);
  }
  
  .section-icon:hover {
    transform: rotate(-5deg) scale(1.1);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     STAT CARDS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .stat-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(253, 251, 247, 0.9));
    backdrop-filter: blur(12px);
    border-radius: var(--radius-2xl);
    padding: 28px 24px;
    text-align: center;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(255, 255, 255, 0.6);
    position: relative;
    overflow: hidden;
    transition: all 0.4s var(--ease-spring);
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
    background-size: 200% 100%;
    animation: shimmer 4s linear infinite;
  }
  
  .stat-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-xl), var(--shadow-glow);
  }
  
  .stat-number {
    font-size: 2.75rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     BADGES & LABELS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: 12px;
    font-weight: 600;
    transition: all var(--transition-spring);
  }
  
  .badge:hover {
    transform: scale(1.05);
  }
  
  .badge-gold {
    background: linear-gradient(135deg, rgba(212, 168, 67, 0.15), rgba(232, 193, 88, 0.1));
    color: var(--gold-warm);
    border: 1px solid rgba(212, 168, 67, 0.2);
  }
  
  .badge-success {
    background: rgba(34, 197, 94, 0.1);
    color: #16A34A;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .badge-info {
    background: rgba(59, 130, 246, 0.1);
    color: #2563EB;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INPUT SYSTEM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .input-field {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E5E7EB;
    border-radius: var(--radius-lg);
    font-size: 16px;
    transition: all var(--transition);
    background: white;
  }
  
  .input-field:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(212, 168, 67, 0.15);
  }
  
  .input-field::placeholder {
    color: #9CA3AF;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     UNIFIED BOTTOM NAVIGATION
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%);
    border-top: 2px solid transparent;
    border-image: linear-gradient(90deg, transparent 10%, var(--gold) 50%, transparent 90%) 1;
    padding: 10px 0 max(14px, env(safe-area-inset-bottom));
    z-index: 1000;
    box-shadow: 0 -4px 20px rgba(0, 31, 63, 0.08), 0 -1px 4px rgba(212, 168, 67, 0.1);
  }
  
  .bottom-nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 12px;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 14px;
    color: #6B7280;
    font-size: 11px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s var(--ease-spring);
    border-radius: 12px;
    min-width: 60px;
    position: relative;
  }
  
  .nav-item i { 
    font-size: 22px; 
    margin-bottom: 5px; 
    transition: all 0.3s ease;
  }
  
  .nav-item:hover { 
    color: var(--navy); 
    background: linear-gradient(135deg, rgba(212, 168, 67, 0.1) 0%, rgba(232, 193, 88, 0.05) 100%);
    transform: translateY(-2px);
  }
  
  .nav-item:hover i { 
    transform: scale(1.15); 
    color: var(--gold); 
  }
  
  .nav-item.active { 
    color: var(--navy); 
    background: linear-gradient(135deg, rgba(212, 168, 67, 0.2) 0%, rgba(232, 193, 88, 0.1) 100%);
    box-shadow: 0 4px 12px rgba(212, 168, 67, 0.2);
  }
  
  .nav-item.active i { 
    transform: scale(1.15); 
    color: var(--gold-bright);
    filter: drop-shadow(0 2px 4px rgba(212, 168, 67, 0.4));
  }
  
  .nav-item.active::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-bright));
    border-radius: 2px;
  }
  
  .nav-item .live-dot {
    position: absolute;
    top: 6px;
    right: 14px;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #22C55E, #10B981);
    border-radius: 50%;
    border: 2px solid white;
    animation: pulse-dot 2s infinite;
    box-shadow: 0 2px 6px rgba(34, 197, 94, 0.4);
  }
  
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.1); }
  }
  
  /* Desktop Bottom Nav */
  @media (min-width: 768px) {
    .bottom-nav { 
      background: linear-gradient(90deg, var(--navy) 0%, var(--navy-light) 100%);
      border-top: none;
      border-image: none;
      padding: 12px 0;
      box-shadow: 0 -4px 30px rgba(0, 31, 63, 0.15);
    }
    
    .bottom-nav-container {
      max-width: 800px;
      padding: 0 24px;
    }
    
    .nav-item {
      flex-direction: row;
      gap: 8px;
      padding: 10px 20px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
      border-radius: 30px;
    }
    
    .nav-item i { 
      font-size: 18px; 
      margin-bottom: 0;
    }
    
    .nav-item:hover {
      color: white;
      background: rgba(212, 168, 67, 0.2);
      transform: translateY(0);
    }
    
    .nav-item:hover i { color: var(--gold-bright); }
    
    .nav-item.active {
      color: var(--navy);
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%);
      box-shadow: 0 4px 15px rgba(212, 168, 67, 0.4);
    }
    
    .nav-item.active i { color: var(--navy); filter: none; }
    .nav-item.active::after { display: none; }
  }
  
  @media (min-width: 1024px) {
    .bottom-nav-container { max-width: 900px; }
    .nav-item { padding: 12px 24px; font-size: 14px; }
  }
  
  main { padding-bottom: 110px; }

  /* ═══════════════════════════════════════════════════════════════════════════
     FLOATING EMERGENCY BUTTON
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .floating-emergency {
    position: fixed;
    bottom: 100px;
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
  
  @media (min-width: 768px) {
    .floating-emergency { 
      bottom: 100px; 
      right: 24px; 
      width: 64px; 
      height: 64px; 
      font-size: 26px; 
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     ANIMATIONS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s var(--ease-spring);
  }
  
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stagger-in {
    opacity: 0;
    transform: translateY(30px);
    animation: stagger-in 0.6s var(--ease-spring) forwards;
  }
  
  @keyframes stagger-in {
    to { opacity: 1; transform: translateY(0); }
  }
  
  .stagger-delay-1 { animation-delay: 0.1s; }
  .stagger-delay-2 { animation-delay: 0.2s; }
  .stagger-delay-3 { animation-delay: 0.3s; }
  .stagger-delay-4 { animation-delay: 0.4s; }
  .stagger-delay-5 { animation-delay: 0.5s; }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SCROLLBAR STYLING
     ═══════════════════════════════════════════════════════════════════════════ */
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--cream);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--gold), var(--gold-bright));
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold-warm);
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
`;

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
// UNIFIED BOTTOM NAVIGATION COMPONENT
// ============================================================================

export function getUnifiedBottomNav(activePage: string = 'home'): string {
  const navItems = [
    { href: '/', icon: 'fa-home', label: 'Home', id: 'home' },
    { href: '/medisense', icon: 'fa-brain', label: 'MediSense', id: 'medisense' },
    { href: '/instant-connect', icon: 'fa-video', label: 'Connect', id: 'connect', hasLiveDot: true },
    { href: '/care-team', icon: 'fa-user-doctor', label: 'Doctors', id: 'doctors' },
    { href: '/dashboard', icon: 'fa-user', label: 'Profile', id: 'profile' },
  ];
  
  const navItemsHtml = navItems.map(item => {
    const activeClass = activePage === item.id ? 'active' : '';
    const connectClass = item.hasLiveDot ? 'connect-btn' : '';
    const liveDot = item.hasLiveDot ? '<span class="live-dot"></span>' : '';
    return '<a href="' + item.href + '" class="nav-item ' + activeClass + ' ' + connectClass + '">' +
           '<i class="fas ' + item.icon + '"></i>' +
           liveDot +
           '<span>' + item.label + '</span>' +
           '</a>';
  }).join('');
  
  return '<a href="tel:112" class="floating-emergency" title="Emergency: 112">' +
         '<i class="fas fa-phone"></i>' +
         '</a>' +
         '<nav class="bottom-nav" role="navigation" aria-label="Main navigation">' +
         '<div class="bottom-nav-container">' +
         navItemsHtml +
         '</div>' +
         '</nav>';
}

// ============================================================================
// UNIFIED HEADER COMPONENT
// ============================================================================

export function getUnifiedHeader(title: string = '', subtitle: string = '', showBack: boolean = true): string {
  const titleBadge = title ? 
    '<span class="px-4 py-1.5 glass-dark text-gold text-sm rounded-full font-medium flex items-center border border-gold/20">' +
    '<i class="fas fa-sparkles mr-2"></i> ' + title +
    '</span>' : '';
  
  const backButton = showBack ?
    '<a href="/dashboard" class="text-white/80 hover:text-white text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all border border-white/10">' +
    '<i class="fas fa-arrow-left"></i> Dashboard' +
    '</a>' : '';
  
  const subtitleSection = subtitle ?
    '<div class="max-w-7xl mx-auto px-4 pb-8 relative z-10">' +
    '<p class="text-white/70 text-lg">' + subtitle + '</p>' +
    '</div>' : '';
  
  return '<header class="gradient-hero relative overflow-hidden">' +
         '<div class="max-w-7xl mx-auto px-4 py-6 relative z-10">' +
         '<div class="flex justify-between items-center">' +
         '<div class="flex items-center space-x-4">' +
         '<a href="/" class="text-2xl font-bold text-white group">' +
         'SelectCare<span class="text-gold group-hover:text-yellow-300 transition-colors">OS</span>™' +
         '</a>' +
         titleBadge +
         '</div>' +
         '<div class="flex items-center space-x-3">' +
         backButton +
         '</div>' +
         '</div>' +
         '</div>' +
         subtitleSection +
         '</header>';
}

// ============================================================================
// LEGACY EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================================================

export const BRAND_CSS_VARIABLES = UNIFIED_CSS;
export const BRAND_CSS_CLASSES = '';
export const BRAND_STYLES = UNIFIED_CSS;

export function getBrandNavigation(activePage: string = 'home', isRTL: boolean = false): string {
  return getUnifiedHeader();
}

export function getBrandBottomNav(activePage: string = 'home'): string {
  return getUnifiedBottomNav(activePage);
}

export function getBrandFooter(): string {
  const year = new Date().getFullYear();
  return '<footer class="gradient-navy text-white py-12 px-6 mt-12">' +
         '<div class="max-w-6xl mx-auto">' +
         '<div class="grid md:grid-cols-4 gap-8 mb-8">' +
         '<div>' +
         '<h3 class="text-xl font-bold mb-4">SelectCare<span class="text-gold">OS</span>™</h3>' +
         '<p class="text-white/60 text-sm">German Medical Excellence,<br>Red Sea Recovery</p>' +
         '</div>' +
         '<div>' +
         '<h4 class="font-semibold mb-4">Services</h4>' +
         '<ul class="space-y-2 text-sm text-white/60">' +
         '<li><a href="/services" class="hover:text-gold transition-colors">All Services</a></li>' +
         '<li><a href="/packages" class="hover:text-gold transition-colors">Care Packages</a></li>' +
         '<li><a href="/calculators" class="hover:text-gold transition-colors">Health Tools</a></li>' +
         '</ul>' +
         '</div>' +
         '<div>' +
         '<h4 class="font-semibold mb-4">Company</h4>' +
         '<ul class="space-y-2 text-sm text-white/60">' +
         '<li><a href="/doctors" class="hover:text-gold transition-colors">Our Doctors</a></li>' +
         '<li><a href="https://germanselect.org" class="hover:text-gold transition-colors" target="_blank">German Select</a></li>' +
         '<li><a href="/about" class="hover:text-gold transition-colors">About Us</a></li>' +
         '</ul>' +
         '</div>' +
         '<div>' +
         '<h4 class="font-semibold mb-4">Contact</h4>' +
         '<ul class="space-y-2 text-sm text-white/60">' +
         '<li><i class="fas fa-envelope text-gold mr-2"></i>info@germanselect.org</li>' +
         '<li><i class="fas fa-phone text-gold mr-2"></i>+49 123 456 789</li>' +
         '</ul>' +
         '</div>' +
         '</div>' +
         '<div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">' +
         '<p class="text-sm text-white/40">© ' + year + ' German Select. All rights reserved.</p>' +
         '<div class="flex items-center gap-4">' +
         '<span class="badge badge-gold text-xs">JCI Accredited</span>' +
         '<span class="badge badge-gold text-xs">German Board Certified</span>' +
         '<span class="badge badge-gold text-xs">GDPR Compliant</span>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</footer>';
}

// Export default
export default {
  BRAND_COLORS,
  FONTS,
  UNIFIED_CSS,
  BRAND_HEAD,
  getUnifiedBottomNav,
  getUnifiedHeader,
  getBrandFooter,
  // Legacy
  BRAND_CSS_VARIABLES,
  BRAND_CSS_CLASSES,
  BRAND_STYLES,
  getBrandNavigation,
  getBrandBottomNav,
};
