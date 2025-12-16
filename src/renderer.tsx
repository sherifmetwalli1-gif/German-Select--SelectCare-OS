import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1A2E4A" />
        <meta name="description" content="SelectCareOS - German Medical Excellence, Red Sea Recovery & Digital Care Integration" />
        <title>SelectCareOS™ | German Select Health</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Chart.js */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
        
        {/* Day.js */}
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js"></script>
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'gs-navy': '#1A2E4A',
                    'gs-navy-light': '#2A4A6E',
                    'gs-navy-dark': '#0F1D30',
                    'gs-gold': '#C9A962',
                    'gs-gold-light': '#E5D4A8',
                    'gs-gold-dark': '#9A7B3A',
                    'gs-cream': '#FDF9F3',
                    'gs-teal': '#4A9B9B',
                    'gs-red': '#E74C3C',
                    'gs-green': '#27AE60',
                    'gs-blue': '#3498DB',
                    'gs-purple': '#9B59B6'
                  },
                  fontFamily: {
                    'inter': ['Inter', 'sans-serif']
                  },
                  boxShadow: {
                    'gs': '0 4px 20px rgba(26, 46, 74, 0.15)',
                    'gs-lg': '0 8px 40px rgba(26, 46, 74, 0.2)'
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
