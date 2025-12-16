import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { patientDashboard } from './pages/patient-dashboard'
import { doctorDashboard } from './pages/doctor-dashboard'
import { timelinePage } from './pages/timeline'
import { careTeamPage } from './pages/care-team'
import { messagesPage } from './pages/messages'
import { profilePage } from './pages/profile'
import { bookingPage } from './pages/booking'
import { marketplacePage } from './pages/marketplace' // CareSelect™ Journeys page
import { aiDiagnosticsPage } from './pages/ai-diagnostics'
import { rpmPage } from './pages/rpm'
import { wellnessPage } from './pages/wellness'
import { telemedicinePage } from './pages/telemedicine'
import { loginPage } from './pages/login'
import { landingPage } from './pages/landing'
import { apiRoutes } from './api'

const app = new Hono()

// CORS for API routes
app.use('/api/*', cors())

// Use renderer for HTML pages
app.use(renderer)

// Landing page
app.get('/', (c) => landingPage(c))

// Auth routes
app.get('/login', (c) => loginPage(c))

// Patient routes
app.get('/patient', (c) => patientDashboard(c))
app.get('/patient/timeline', (c) => timelinePage(c))
app.get('/patient/care-team', (c) => careTeamPage(c))
app.get('/patient/messages', (c) => messagesPage(c))
app.get('/patient/profile', (c) => profilePage(c))
app.get('/patient/booking', (c) => bookingPage(c))
app.get('/patient/careselect-journeys', (c) => marketplacePage(c)) // CareSelect™ Journeys
app.get('/patient/marketplace', (c) => marketplacePage(c)) // Backward compatibility
app.get('/patient/ai-diagnostics', (c) => aiDiagnosticsPage(c))
app.get('/patient/rpm', (c) => rpmPage(c))
app.get('/patient/wellness', (c) => wellnessPage(c))
app.get('/patient/telemedicine', (c) => telemedicinePage(c))

// Doctor routes
app.get('/doctor', (c) => doctorDashboard(c))

// API routes
app.route('/api', apiRoutes)

export default app
