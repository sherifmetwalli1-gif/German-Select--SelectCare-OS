import { Context } from 'hono'
import { Header, PageWrapper, Card, VitalCard } from '../components/layout'

export const rpmPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Health Monitoring" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Sync Status */}
        <Card className="p-3 bg-gs-green/10 border border-gs-green/20">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gs-green/20 flex items-center justify-center">
              <i class="fas fa-sync text-gs-green text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gs-green">Devices synced</p>
              <p class="text-xs text-gray-500">Last sync: 2 minutes ago</p>
            </div>
            <button class="text-gs-green text-sm font-medium hover:underline">Sync Now</button>
          </div>
        </Card>
        
        {/* Vitals Overview */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Current Vitals</h3>
            <span class="text-xs text-gray-400">Updated just now</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <VitalCard 
              icon="fa-heart"
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
              icon="fa-thermometer-half"
              label="Temperature"
              value="36.8"
              unit="°C"
              trend="stable"
              status="normal"
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
              unit="/ 8,000"
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
              {['Day', 'Week', 'Month'].map((period, idx) => (
                <button class={`px-3 py-1 text-xs rounded-full ${idx === 0 ? 'bg-gs-navy text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div class="h-40 flex items-end justify-between gap-1" id="heartRateChart">
            {[68, 72, 75, 70, 73, 71, 74, 72, 69, 71, 73, 72].map((value, idx) => (
              <div class="flex-1 flex flex-col items-center gap-1">
                <div 
                  class="w-full bg-gs-red/20 rounded-t hover:bg-gs-red/40 transition-colors cursor-pointer relative group"
                  style={`height: ${(value - 60) * 4}px`}
                >
                  <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-gs-navy text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {value} bpm
                  </div>
                </div>
                <span class="text-xs text-gray-400">{idx * 2}h</span>
              </div>
            ))}
          </div>
          <div class="flex justify-between mt-3 pt-3 border-t text-sm">
            <div>
              <span class="text-gray-500">Avg: </span>
              <span class="font-medium text-gs-navy">71 bpm</span>
            </div>
            <div>
              <span class="text-gray-500">Min: </span>
              <span class="font-medium text-gs-navy">68 bpm</span>
            </div>
            <div>
              <span class="text-gray-500">Max: </span>
              <span class="font-medium text-gs-navy">75 bpm</span>
            </div>
          </div>
        </Card>
        
        {/* Blood Pressure Chart */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-gs-navy">Blood Pressure History</h4>
            <a href="#" class="text-xs text-gs-gold hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            {[
              { date: 'Today, 9:00 AM', systolic: 128, diastolic: 82, status: 'elevated' },
              { date: 'Yesterday, 8:30 PM', systolic: 125, diastolic: 80, status: 'elevated' },
              { date: 'Yesterday, 8:00 AM', systolic: 122, diastolic: 78, status: 'normal' },
              { date: 'Oct 20, 9:15 AM', systolic: 120, diastolic: 78, status: 'normal' },
              { date: 'Oct 19, 8:45 AM', systolic: 118, diastolic: 76, status: 'normal' }
            ].map((reading) => (
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gs-navy">{reading.systolic}/{reading.diastolic} mmHg</p>
                  <p class="text-xs text-gray-400">{reading.date}</p>
                </div>
                <span class={`text-xs px-2 py-0.5 rounded-full ${
                  reading.status === 'normal' ? 'bg-gs-green/10 text-gs-green' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {reading.status === 'normal' ? 'Normal' : 'Elevated'}
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
              <i class="fas fa-running text-gs-green"></i>
              <h4 class="font-bold text-sm text-gs-navy">Activity</h4>
            </div>
            <div class="relative w-20 h-20 mx-auto mb-3">
              <svg class="transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#27AE60" stroke-width="3" stroke-dasharray="53, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-lg font-bold text-gs-navy">53%</span>
              </div>
            </div>
            <div class="text-center text-xs text-gray-500">
              <p>4,230 of 8,000 steps</p>
              <p class="mt-1">2.8 km walked</p>
            </div>
          </Card>
          
          {/* Sleep */}
          <Card className="p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-moon text-gs-purple"></i>
              <h4 class="font-bold text-sm text-gs-navy">Sleep</h4>
            </div>
            <div class="relative w-20 h-20 mx-auto mb-3">
              <svg class="transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#9B59B6" stroke-width="3" stroke-dasharray="90, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-lg font-bold text-gs-navy">7.2h</span>
              </div>
            </div>
            <div class="text-center text-xs text-gray-500">
              <p>Sleep score: 85/100</p>
              <p class="mt-1">11:30 PM - 6:45 AM</p>
            </div>
          </Card>
        </div>
        
        {/* Weight Trend */}
        <Card className="p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-gs-navy">Weight Progress</h4>
            <span class="text-xs bg-gs-green/10 text-gs-green px-2 py-1 rounded-full">-5.2 kg this month</span>
          </div>
          <div class="flex items-end justify-between h-24 gap-2">
            {[
              { week: 'W1', weight: 83.7 },
              { week: 'W2', weight: 82.1 },
              { week: 'W3', weight: 80.5 },
              { week: 'W4', weight: 78.5 }
            ].map((data, idx) => (
              <div class="flex-1 flex flex-col items-center">
                <span class="text-xs font-medium text-gs-navy mb-1">{data.weight}</span>
                <div 
                  class="w-full bg-gs-gold rounded-t"
                  style={`height: ${(data.weight - 75) * 10}px`}
                ></div>
                <span class="text-xs text-gray-400 mt-1">{data.week}</span>
              </div>
            ))}
          </div>
          <div class="mt-4 pt-4 border-t">
            <div class="flex justify-between text-sm">
              <div>
                <span class="text-gray-500">Starting: </span>
                <span class="font-medium text-gs-navy">83.7 kg</span>
              </div>
              <div>
                <span class="text-gray-500">Current: </span>
                <span class="font-medium text-gs-navy">78.5 kg</span>
              </div>
              <div>
                <span class="text-gray-500">Goal: </span>
                <span class="font-medium text-gs-gold">75 kg</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Connected Devices */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Connected Devices</h3>
            <button class="text-xs text-gs-gold hover:underline">+ Add Device</button>
          </div>
          <div class="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: 'Apple Watch', icon: 'fa-clock', status: 'Connected', battery: 85 },
              { name: 'Withings Body+', icon: 'fa-weight', status: 'Connected', battery: 100 },
              { name: 'BP Monitor', icon: 'fa-heartbeat', status: 'Connected', battery: 72 }
            ].map((device) => (
              <Card className="flex-shrink-0 w-36 p-3 text-center">
                <div class="w-10 h-10 rounded-full bg-gs-green/10 flex items-center justify-center mx-auto mb-2">
                  <i class={`fas ${device.icon} text-gs-green`}></i>
                </div>
                <p class="text-xs font-medium text-gs-navy">{device.name}</p>
                <p class="text-xs text-gs-green">{device.status}</p>
                <div class="flex items-center justify-center gap-1 mt-1">
                  <i class="fas fa-battery-three-quarters text-gray-400 text-xs"></i>
                  <span class="text-xs text-gray-400">{device.battery}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Health Alerts */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Health Alerts</h3>
          <Card className="p-4 bg-yellow-50 border border-yellow-200">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-exclamation-triangle text-yellow-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-sm text-yellow-800">Elevated Blood Pressure</h4>
                <p class="text-xs text-yellow-700 mt-1">Your blood pressure reading (128/82) is slightly elevated. Monitor and consider lifestyle adjustments.</p>
                <div class="flex gap-2 mt-3">
                  <button class="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors">
                    View Tips
                  </button>
                  <button class="px-3 py-1 bg-white text-yellow-700 text-xs font-medium rounded border border-yellow-300 hover:bg-yellow-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick Log */}
        <Card className="p-4">
          <h4 class="font-bold text-gs-navy mb-3">Quick Log</h4>
          <div class="grid grid-cols-4 gap-3">
            {[
              { icon: 'fa-tint', label: 'Blood Pressure' },
              { icon: 'fa-weight', label: 'Weight' },
              { icon: 'fa-thermometer', label: 'Temperature' },
              { icon: 'fa-utensils', label: 'Meal' }
            ].map((item) => (
              <button class="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <i class={`fas ${item.icon} text-gs-navy mb-2`}></i>
                <span class="text-xs text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </Card>
        
        {/* Share with Doctor */}
        <button class="w-full py-4 bg-gs-navy text-white font-bold rounded-xl hover:bg-gs-navy-light transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-share-alt"></i>
          <span>Share Report with Care Team</span>
        </button>
      </main>
    </PageWrapper>
  )
}
