import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const profilePage = (c: Context) => {
  return c.render(
    <PageWrapper active="profile">
      <Header title="Profile" showBack={true} showProfile={false} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 text-center">
          <div class="relative inline-block">
            <div class="w-24 h-24 rounded-full bg-gs-gold/20 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-user text-gs-gold text-3xl"></i>
            </div>
            <button class="absolute bottom-4 right-0 w-8 h-8 bg-gs-navy text-white rounded-full flex items-center justify-center shadow-gs hover:bg-gs-navy-light transition-colors">
              <i class="fas fa-camera text-xs"></i>
            </button>
          </div>
          <h2 class="text-xl font-bold text-gs-navy">Max Mustermann</h2>
          <p class="text-sm text-gray-500">Patient ID: GS-2024-0847</p>
          
          <div class="flex justify-center gap-6 mt-4 pt-4 border-t">
            <div class="text-center">
              <p class="text-2xl font-bold text-gs-gold">85</p>
              <p class="text-xs text-gray-500">SelectScore</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gs-navy">75%</p>
              <p class="text-xs text-gray-500">Recovery</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gs-green">12</p>
              <p class="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </Card>
        
        {/* Membership */}
        <Card className="p-4 bg-gradient-to-r from-gs-gold to-gs-gold-dark text-gs-navy">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <i class="fas fa-crown"></i>
                <span class="font-bold">Gold Member</span>
              </div>
              <p class="text-xs text-gs-navy/70 mt-1">Premium benefits active</p>
            </div>
            <a href="/patient/marketplace" class="px-4 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
              Upgrade
            </a>
          </div>
        </Card>
        
        {/* Personal Information */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Personal Information</h3>
          <Card className="divide-y divide-gray-100">
            {[
              { icon: 'fa-user', label: 'Full Name', value: 'Max Mustermann' },
              { icon: 'fa-envelope', label: 'Email', value: 'max.mustermann@email.de' },
              { icon: 'fa-phone', label: 'Phone', value: '+49 151 1234 5678' },
              { icon: 'fa-birthday-cake', label: 'Date of Birth', value: 'March 15, 1978' },
              { icon: 'fa-flag', label: 'Nationality', value: 'German' },
              { icon: 'fa-globe', label: 'Language', value: 'Deutsch, English' }
            ].map((item) => (
              <div class="flex items-center gap-3 p-4">
                <div class="w-9 h-9 rounded-full bg-gs-navy/5 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-gs-navy text-sm`}></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-400">{item.label}</p>
                  <p class="text-sm font-medium text-gs-navy">{item.value}</p>
                </div>
                <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
              </div>
            ))}
          </Card>
        </div>
        
        {/* Medical Information */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Medical Information</h3>
          <Card className="divide-y divide-gray-100">
            {[
              { icon: 'fa-tint', label: 'Blood Type', value: 'A+' },
              { icon: 'fa-allergies', label: 'Allergies', value: 'Penicillin' },
              { icon: 'fa-pills', label: 'Current Medications', value: '3 medications' },
              { icon: 'fa-heartbeat', label: 'Conditions', value: 'Hypertension (controlled)' },
              { icon: 'fa-hospital', label: 'Emergency Contact', value: 'Anna Mustermann' }
            ].map((item) => (
              <div class="flex items-center gap-3 p-4">
                <div class="w-9 h-9 rounded-full bg-gs-red/5 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-gs-red text-sm`}></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-400">{item.label}</p>
                  <p class="text-sm font-medium text-gs-navy">{item.value}</p>
                </div>
                <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
              </div>
            ))}
          </Card>
        </div>
        
        {/* Connected Devices */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Connected Devices</h3>
          <Card className="p-4">
            <div class="space-y-3">
              {[
                { name: 'Apple Watch Series 9', icon: 'fa-clock', connected: true, brand: 'fab fa-apple' },
                { name: 'Withings Body+', icon: 'fa-weight', connected: true, brand: 'fas fa-balance-scale' },
                { name: 'Oura Ring', icon: 'fa-ring', connected: false, brand: 'fas fa-ring' }
              ].map((device) => (
                <div class="flex items-center gap-3">
                  <div class={`w-10 h-10 rounded-lg ${device.connected ? 'bg-gs-green/10' : 'bg-gray-100'} flex items-center justify-center`}>
                    <i class={`fas ${device.icon} ${device.connected ? 'text-gs-green' : 'text-gray-400'}`}></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gs-navy">{device.name}</p>
                    <p class={`text-xs ${device.connected ? 'text-gs-green' : 'text-gray-400'}`}>
                      {device.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                  <button class={`px-3 py-1 text-xs font-medium rounded-full ${device.connected ? 'bg-gray-100 text-gray-600' : 'bg-gs-navy text-white'}`}>
                    {device.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
            <button class="w-full mt-4 py-2 border-2 border-dashed border-gray-200 text-gray-500 text-sm rounded-lg hover:border-gs-gold hover:text-gs-gold transition-colors">
              <i class="fas fa-plus mr-2"></i>Add Device
            </button>
          </Card>
        </div>
        
        {/* Settings */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Settings</h3>
          <Card className="divide-y divide-gray-100">
            {[
              { icon: 'fa-bell', label: 'Notifications', value: 'On' },
              { icon: 'fa-lock', label: 'Privacy & Security', value: '' },
              { icon: 'fa-credit-card', label: 'Payment Methods', value: '2 cards' },
              { icon: 'fa-file-medical', label: 'Medical Records', value: '' },
              { icon: 'fa-shield-alt', label: 'Data & Privacy', value: 'GDPR Compliant' },
              { icon: 'fa-question-circle', label: 'Help & Support', value: '' }
            ].map((item) => (
              <a href="#" class="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <div class="w-9 h-9 rounded-full bg-gs-navy/5 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-gs-navy text-sm`}></i>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gs-navy">{item.label}</p>
                </div>
                {item.value && <span class="text-xs text-gray-400">{item.value}</span>}
                <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
              </a>
            ))}
          </Card>
        </div>
        
        {/* Logout */}
        <a href="/login" class="block w-full py-3 bg-gs-red/10 text-gs-red font-medium rounded-xl text-center hover:bg-gs-red/20 transition-colors">
          <i class="fas fa-sign-out-alt mr-2"></i>
          Sign Out
        </a>
        
        {/* App Version */}
        <p class="text-center text-xs text-gray-400">
          SelectCareOS™ v1.0.0<br/>
          © 2024 German Select Health
        </p>
      </main>
    </PageWrapper>
  )
}
