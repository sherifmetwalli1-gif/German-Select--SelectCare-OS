import { Context } from 'hono'
import { Header, PageWrapper, Card, VitalCard } from '../components/layout'

export const rpmPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Health Monitoring" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Connection Status */}
        <Card className="p-4 bg-gradient-to-r from-gs-green/10 to-gs-teal/10">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gs-green/20 flex items-center justify-center">
                <i class="fas fa-link text-gs-green"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gs-navy">Devices Connected</h4>
                <p class="text-xs text-gray-500">Last sync: 2 minutes ago</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-gs-green animate-pulse"></div>
              <span class="text-xs text-gs-green font-medium">Live</span>
            </div>
          </div>
        </Card>
        
        {/* Vitals Grid */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Current Vitals</h3>
            <button class="text-xs text-gs-gold hover:underline flex items-center gap-1">
              <i class="fas fa-sync-alt"></i>
              <span>Refresh</span>
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <VitalCard 
              icon="fa-heartbeat" 
              label="Heart Rate" 
              value="72" 
              unit="bpm" 
              trend="stable"
              status="normal"
            />
            <VitalCard 
              icon="fa-tint" 
              label="Blood Pressure" 
              value="128/82" 
              unit="mmHg" 
              trend="up"
              status="warning"
            />
            <VitalCard 
              icon="fa-lungs" 
              label="SpO2" 
              value="98" 
              unit="%" 
              trend="stable"
              status="normal"
            />
            <VitalCard 
              icon="fa-thermometer-half" 
              label="Temperature" 
              value="36.6" 
              unit="°C" 
              trend="stable"
              status="normal"
            />
            <VitalCard 
              icon="fa-weight" 
              label="Weight" 
              value="78.5" 
              unit="kg" 
              trend="down"
              status="normal"
            />
            <VitalCard 
              icon="fa-shoe-prints" 
              label="Steps" 
              value="4,230" 
              unit="today" 
              trend="up"
              status="normal"
            />
          </div>
        </div>
        
        {/* Heart Rate Chart */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-gs-navy">Heart Rate Trend</h4>
            <div class="flex gap-2">
              {['24h', '7d', '30d'].map((period, idx) => (
                <button class={`px-3 py-1 text-xs font-medium rounded-full ${idx === 0 ? 'bg-gs-navy text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div class="h-40 bg-gradient-to-b from-gs-red/5 to-transparent rounded-lg flex items-end justify-around px-4 pb-4">
            {[65, 72, 68, 75, 70, 73, 72, 69, 74, 71, 72, 70].map((val, idx) => (
              <div 
                class="w-4 bg-gs-red/60 rounded-t" 
                style={{ height: `${(val - 60) * 4}px` }}
              ></div>
            ))}
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-400">
            <span>12:00</span>
            <span>18:00</span>
            <span>00:00</span>
            <span>06:00</span>
            <span>Now</span>
          </div>
          
          <div class="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-xs text-gray-500">Average</p>
              <p class="font-bold text-gs-navy">71 bpm</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Resting</p>
              <p class="font-bold text-gs-navy">62 bpm</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Max</p>
              <p class="font-bold text-gs-navy">98 bpm</p>
            </div>
          </div>
        </Card>
        
        {/* Blood Pressure History */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-gs-navy">Blood Pressure History</h4>
            <a href="#" class="text-xs text-gs-gold">View All</a>
          </div>
          
          <div class="space-y-3">
            {[
              { date: 'Today, 8:30 AM', systolic: 128, diastolic: 82, status: 'Elevated' },
              { date: 'Yesterday, 9:15 AM', systolic: 124, diastolic: 79, status: 'Normal' },
              { date: 'Oct 19, 8:45 AM', systolic: 130, diastolic: 84, status: 'High' },
              { date: 'Oct 18, 9:00 AM', systolic: 122, diastolic: 78, status: 'Normal' }
            ].map((reading) => (
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="text-sm font-medium text-gs-navy">{reading.systolic}/{reading.diastolic} mmHg</p>
                  <p class="text-xs text-gray-400">{reading.date}</p>
                </div>
                <span class={`text-xs px-2 py-1 rounded-full ${
                  reading.status === 'Normal' ? 'bg-gs-green/10 text-gs-green' :
                  reading.status === 'Elevated' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gs-red/10 text-gs-red'
                }`}>
                  {reading.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Activity & Sleep */}
        <div class="grid grid-cols-2 gap-3">
          {/* Activity */}
          <Card className="p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-fire text-orange-500"></i>
              <span class="font-semibold text-sm text-gs-navy">Activity</span>
            </div>
            <div class="relative w-20 h-20 mx-auto mb-3">
              <svg class="transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#F97316" stroke-width="3" stroke-dasharray="53, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-lg font-bold text-gs-navy">53%</span>
              </div>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500">Daily Goal</p>
              <p class="text-sm font-medium text-gs-navy">4,230 / 8,000 steps</p>
            </div>
          </Card>
          
          {/* Sleep */}
          <Card className="p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-moon text-indigo-500"></i>
              <span class="font-semibold text-sm text-gs-navy">Sleep</span>
            </div>
            <div class="relative w-20 h-20 mx-auto mb-3">
              <svg class="transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#6366F1" stroke-width="3" stroke-dasharray="90, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-lg font-bold text-gs-navy">7.2h</span>
              </div>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500">Last Night</p>
              <p class="text-sm font-medium text-gs-navy">Good Quality</p>
            </div>
          </Card>
        </div>
        
        {/* Alerts & Notifications */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Health Alerts</h3>
          <div class="space-y-3">
            <Card className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-exclamation-triangle text-yellow-600 text-sm"></i>
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-sm text-gray-800">Elevated Blood Pressure</h5>
                  <p class="text-xs text-gray-600 mt-1">Your blood pressure reading (128/82) is slightly elevated. Consider reducing sodium intake and increasing physical activity.</p>
                  <p class="text-xs text-gray-400 mt-2">Today, 8:30 AM</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-gs-green bg-gs-green/5">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-gs-green/20 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-check-circle text-gs-green text-sm"></i>
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-sm text-gray-800">Medication Reminder Completed</h5>
                  <p class="text-xs text-gray-600 mt-1">You've taken all your morning medications on time for 7 consecutive days. Great job!</p>
                  <p class="text-xs text-gray-400 mt-2">Today, 8:00 AM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Connected Devices */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Connected Devices</h3>
            <button class="text-xs text-gs-gold">+ Add Device</button>
          </div>
          
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { name: 'Apple Watch', status: 'Connected', battery: 78, icon: 'fa-clock' },
              { name: 'Withings Scale', status: 'Connected', battery: 92, icon: 'fa-weight' },
              { name: 'Blood Pressure', status: 'Syncing', battery: 65, icon: 'fa-heartbeat' }
            ].map((device) => (
              <Card className="flex-shrink-0 w-36 p-3 text-center">
                <div class="w-12 h-12 rounded-full bg-gs-navy/10 flex items-center justify-center mx-auto mb-2">
                  <i class={`fas ${device.icon} text-gs-navy`}></i>
                </div>
                <p class="text-sm font-medium text-gs-navy">{device.name}</p>
                <p class={`text-xs ${device.status === 'Connected' ? 'text-gs-green' : 'text-gs-gold'}`}>{device.status}</p>
                <div class="flex items-center justify-center gap-1 mt-2">
                  <i class="fas fa-battery-three-quarters text-gray-400 text-xs"></i>
                  <span class="text-xs text-gray-400">{device.battery}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Health Integrations */}
        <Card className="p-4">
          <h4 class="font-bold text-gs-navy mb-3">Health Integrations</h4>
          <div class="space-y-3">
            {[
              { name: 'Apple Health', icon: 'fab fa-apple', connected: true, color: 'text-gray-800' },
              { name: 'Google Fit', icon: 'fab fa-google', connected: false, color: 'text-red-500' },
              { name: 'Fitbit', icon: 'fas fa-running', connected: false, color: 'text-teal-500' },
              { name: 'Garmin', icon: 'fas fa-clock', connected: false, color: 'text-blue-500' }
            ].map((integration) => (
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <i class={`${integration.icon} ${integration.color} text-xl`}></i>
                  <span class="text-sm font-medium text-gs-navy">{integration.name}</span>
                </div>
                <button class={`px-3 py-1 text-xs font-medium rounded-full ${
                  integration.connected ? 'bg-gs-green/10 text-gs-green' : 'bg-gs-navy text-white'
                }`}>
                  {integration.connected ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Export Data */}
        <div class="flex gap-3">
          <button class="flex-1 py-3 bg-gs-navy text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gs-navy-light transition-colors">
            <i class="fas fa-download"></i>
            <span>Export Data</span>
          </button>
          <button class="flex-1 py-3 bg-white text-gs-navy rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-gs">
            <i class="fas fa-share-alt"></i>
            <span>Share with Doctor</span>
          </button>
        </div>
      </main>
    </PageWrapper>
  )
}
