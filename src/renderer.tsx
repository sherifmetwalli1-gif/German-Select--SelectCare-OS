import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#0A1628" />
        <meta name="description" content="SelectCare OS - Premium Digital Healthcare Platform by German Select. German Medical Excellence with Red Sea Recovery." />
        <meta name="keywords" content="healthcare, medical tourism, German doctors, Egypt, telemedicine, recovery" />
        <title>SelectCare OS | German Select Health</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        
        {/* Tailwind CSS Play CDN - with referrerpolicy for better compatibility */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio" referrerpolicy="no-referrer"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet" crossorigin="anonymous" />
        
        {/* Google Fonts - Premium Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        
        {/* Chart.js */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" crossorigin="anonymous"></script>
        
        {/* Day.js */}
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js" crossorigin="anonymous"></script>
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config - SelectCare OS Premium Design System */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    // SelectCare OS Brand Colors
                    'brand': {
                      50: '#FDF8E7',
                      100: '#FAF0C8',
                      200: '#F5E091',
                      300: '#EFD05A',
                      400: '#EABD2A',
                      500: '#D4A51A',  // Primary Gold
                      600: '#A88214',
                      700: '#7C5F0F',
                      800: '#503C0A',
                      900: '#241C05'
                    },
                    // Deep Navy - Primary Background
                    'navy': {
                      50: '#E8EBF0',
                      100: '#C5CBD8',
                      200: '#9EA8BC',
                      300: '#7786A0',
                      400: '#596D8C',
                      500: '#3B5478',
                      600: '#324868',
                      700: '#273855',
                      800: '#1C2942',
                      900: '#0A1628',  // Primary Dark
                      950: '#050B14'
                    },
                    // Medical Teal - Accent
                    'teal': {
                      50: '#E6FAF8',
                      100: '#B3F0EB',
                      200: '#80E6DD',
                      300: '#4DDCD0',
                      400: '#26D4C5',
                      500: '#00CCBA',  // Primary Teal
                      600: '#00A396',
                      700: '#007A71',
                      800: '#00524B',
                      900: '#002926'
                    },
                    // Success Green
                    'success': {
                      50: '#ECFDF5',
                      100: '#D1FAE5',
                      200: '#A7F3D0',
                      300: '#6EE7B7',
                      400: '#34D399',
                      500: '#10B981',
                      600: '#059669',
                      700: '#047857',
                      800: '#065F46',
                      900: '#064E3B'
                    },
                    // Alert/Danger Red
                    'danger': {
                      50: '#FEF2F2',
                      100: '#FEE2E2',
                      200: '#FECACA',
                      300: '#FCA5A5',
                      400: '#F87171',
                      500: '#EF4444',
                      600: '#DC2626',
                      700: '#B91C1C',
                      800: '#991B1B',
                      900: '#7F1D1D'
                    },
                    // Warning Amber
                    'warning': {
                      50: '#FFFBEB',
                      100: '#FEF3C7',
                      200: '#FDE68A',
                      300: '#FCD34D',
                      400: '#FBBF24',
                      500: '#F59E0B',
                      600: '#D97706',
                      700: '#B45309',
                      800: '#92400E',
                      900: '#78350F'
                    },
                    // Info Blue
                    'info': {
                      50: '#EFF6FF',
                      100: '#DBEAFE',
                      200: '#BFDBFE',
                      300: '#93C5FD',
                      400: '#60A5FA',
                      500: '#3B82F6',
                      600: '#2563EB',
                      700: '#1D4ED8',
                      800: '#1E40AF',
                      900: '#1E3A8A'
                    },
                    // Neutral Gray
                    'slate': {
                      50: '#F8FAFC',
                      100: '#F1F5F9',
                      200: '#E2E8F0',
                      300: '#CBD5E1',
                      400: '#94A3B8',
                      500: '#64748B',
                      600: '#475569',
                      700: '#334155',
                      800: '#1E293B',
                      900: '#0F172A'
                    }
                  },
                  fontFamily: {
                    'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                    'display': ['Playfair Display', 'Georgia', 'serif'],
                    'mono': ['JetBrains Mono', 'Menlo', 'monospace']
                  },
                  fontSize: {
                    'xs': ['0.75rem', { lineHeight: '1rem' }],
                    'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                    'base': ['1rem', { lineHeight: '1.5rem' }],
                    'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                    'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                    '2xl': ['1.5rem', { lineHeight: '2rem' }],
                    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                    '5xl': ['3rem', { lineHeight: '1.15' }],
                    '6xl': ['3.75rem', { lineHeight: '1.1' }],
                    '7xl': ['4.5rem', { lineHeight: '1.05' }]
                  },
                  boxShadow: {
                    'soft-xs': '0 1px 2px 0 rgba(0,0,0,0.03)',
                    'soft-sm': '0 2px 4px 0 rgba(0,0,0,0.04)',
                    'soft': '0 4px 12px 0 rgba(0,0,0,0.05)',
                    'soft-md': '0 8px 24px 0 rgba(0,0,0,0.08)',
                    'soft-lg': '0 16px 40px 0 rgba(0,0,0,0.1)',
                    'soft-xl': '0 24px 56px 0 rgba(0,0,0,0.12)',
                    'glow-brand': '0 0 60px -10px rgba(212,165,26,0.4)',
                    'glow-teal': '0 0 60px -10px rgba(0,204,186,0.4)',
                    'glow-success': '0 0 40px -5px rgba(16,185,129,0.3)',
                    'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
                    'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
                    'card-hover': '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
                  },
                  backgroundImage: {
                    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                    'mesh-dark': 'radial-gradient(at 40% 20%, #1C2942 0px, transparent 50%), radial-gradient(at 80% 0%, #273855 0px, transparent 50%), radial-gradient(at 0% 50%, #0A1628 0px, transparent 50%)',
                    'mesh-gold': 'radial-gradient(at 50% 0%, rgba(212,165,26,0.15) 0px, transparent 50%)',
                    'shimmer': 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)'
                  },
                  animation: {
                    'shimmer': 'shimmer 2.5s ease-in-out infinite',
                    'float': 'float 6s ease-in-out infinite',
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'fade-in': 'fadeIn 0.5s ease-out forwards',
                    'slide-up': 'slideUp 0.5s ease-out forwards',
                    'slide-down': 'slideDown 0.3s ease-out forwards',
                    'scale-in': 'scaleIn 0.3s ease-out forwards',
                    'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
                    'spin-slow': 'spin 3s linear infinite'
                  },
                  keyframes: {
                    shimmer: {
                      '0%': { backgroundPosition: '-200% 0' },
                      '100%': { backgroundPosition: '200% 0' }
                    },
                    float: {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-12px)' }
                    },
                    fadeIn: {
                      '0%': { opacity: '0' },
                      '100%': { opacity: '1' }
                    },
                    slideUp: {
                      '0%': { transform: 'translateY(20px)', opacity: '0' },
                      '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    slideDown: {
                      '0%': { transform: 'translateY(-10px)', opacity: '0' },
                      '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    scaleIn: {
                      '0%': { transform: 'scale(0.95)', opacity: '0' },
                      '100%': { transform: 'scale(1)', opacity: '1' }
                    },
                    bounceSoft: {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-8px)' }
                    }
                  },
                  borderRadius: {
                    '4xl': '2rem',
                    '5xl': '2.5rem'
                  },
                  spacing: {
                    '18': '4.5rem',
                    '22': '5.5rem',
                    '88': '22rem',
                    '128': '32rem'
                  },
                  transitionTimingFunction: {
                    'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }
                }
              }
            }
          `
        }} />
        
        {/* Global Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Smooth scrolling */
            html { 
              scroll-behavior: smooth; 
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Selection color */
            ::selection {
              background: rgba(212, 165, 26, 0.3);
              color: #0A1628;
            }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 4px; }
            ::-webkit-scrollbar-thumb { 
              background: linear-gradient(180deg, #D4A51A 0%, #A88214 100%);
              border-radius: 4px; 
            }
            ::-webkit-scrollbar-thumb:hover { background: #A88214; }
            
            /* Glass morphism */
            .glass { 
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .glass-dark {
              background: rgba(10, 22, 40, 0.85);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            /* Gradient text */
            .text-gradient-gold {
              background: linear-gradient(135deg, #EFD05A 0%, #D4A51A 50%, #A88214 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .text-gradient-teal {
              background: linear-gradient(135deg, #4DDCD0 0%, #00CCBA 50%, #00A396 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            /* Card effects */
            .card-lift {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .card-lift:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.1);
            }
            
            /* Button press effect */
            .btn-press:active {
              transform: scale(0.98);
            }
            
            /* Focus states */
            .focus-ring:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba(212, 165, 26, 0.4);
            }
            .focus-ring:focus-visible {
              outline: none;
              box-shadow: 0 0 0 3px rgba(212, 165, 26, 0.4);
            }
            
            /* Animated border */
            .border-gradient {
              position: relative;
              background: linear-gradient(white, white) padding-box,
                          linear-gradient(135deg, #D4A51A, #A88214) border-box;
              border: 2px solid transparent;
            }
            
            /* Shimmer skeleton */
            .skeleton {
              background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            
            /* iOS safe area */
            @supports (padding-bottom: env(safe-area-inset-bottom)) {
              .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
              .safe-top { padding-top: env(safe-area-inset-top); }
            }
            
            /* Hide scrollbar but keep functionality */
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            
            /* Stagger animation delays */
            .stagger-1 { animation-delay: 0.1s; }
            .stagger-2 { animation-delay: 0.2s; }
            .stagger-3 { animation-delay: 0.3s; }
            .stagger-4 { animation-delay: 0.4s; }
            .stagger-5 { animation-delay: 0.5s; }
            
            /* Pulse ring animation */
            .pulse-ring {
              animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse-ring {
              0% { box-shadow: 0 0 0 0 rgba(212, 165, 26, 0.4); }
              70% { box-shadow: 0 0 0 12px rgba(212, 165, 26, 0); }
              100% { box-shadow: 0 0 0 0 rgba(212, 165, 26, 0); }
            }
          `
        }} />
      </head>
      <body class="font-sans bg-slate-50 text-navy-900 min-h-screen antialiased">
        {children}
        <script src="/static/app.js" type="module"></script>
      </body>
    </html>
  )
})
