import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1A2E4A" />
        <meta name="description" content="German Select - German Medical Excellence, Red Sea Recovery. Premium healthcare in Egypt with German-trained surgeons." />
        <title>German Select™ | Excellence in Medical Care, Luxury in Healing</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts - Adding Playfair Display for elegant serif logo text */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Chart.js */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
        
        {/* Day.js */}
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js"></script>
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config - German Select Brand Colors */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    // German Select Official Brand Colors
                    'gs-navy': '#1A2E4A',
                    'gs-navy-light': '#2A4A6E',
                    'gs-navy-dark': '#0F1D30',
                    'gs-black': '#0A0A0A',
                    // Bronze/Gold Gradient Colors
                    'gs-gold': '#B8860B',
                    'gs-gold-light': '#D4AF37',
                    'gs-gold-dark': '#8B6914',
                    'gs-bronze': '#CD7F32',
                    'gs-bronze-light': '#E6B17E',
                    // Silver/Gray for "GERMAN" text
                    'gs-silver': '#C0C0C0',
                    'gs-silver-dark': '#8C8C8C',
                    // Background Colors
                    'gs-cream': '#FDF9F3',
                    'gs-offwhite': '#F5F5F0',
                    // Accent Colors
                    'gs-teal': '#4A9B9B',
                    'gs-red': '#C41E3A',
                    'gs-green': '#27AE60',
                    'gs-blue': '#3498DB',
                    'gs-purple': '#9B59B6'
                  },
                  fontFamily: {
                    'inter': ['Inter', 'sans-serif'],
                    'playfair': ['Playfair Display', 'serif']
                  },
                  boxShadow: {
                    'gs': '0 4px 20px rgba(26, 46, 74, 0.15)',
                    'gs-lg': '0 8px 40px rgba(26, 46, 74, 0.2)',
                    'gs-gold': '0 4px 20px rgba(184, 134, 11, 0.3)'
                  },
                  backgroundImage: {
                    'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #8B6914 100%)',
                    'silver-gradient': 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #8C8C8C 100%)',
                    'bronze-gradient': 'linear-gradient(135deg, #E6B17E 0%, #CD7F32 50%, #8B6914 100%)'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="font-inter bg-gs-cream text-gs-navy min-h-screen">
        {children}
        <script src="/static/app.js" type="module"></script>
      </body>
    </html>
  )
})
