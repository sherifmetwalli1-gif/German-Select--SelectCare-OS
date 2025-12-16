import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const wellnessPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Wellness & Lifestyle" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Daily Wellness Score */}
        <Card className="p-6 bg-gradient-to-br from-gs-teal/10 to-gs-green/10">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-gs-navy">Today's Wellness Score</h3>
              <p class="text-sm text-gray-500 mt-1">Based on nutrition, exercise, sleep & mood</p>
            </div>
            <div class="relative w-20 h-20">
              <svg class="transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#4A9B9B" stroke-width="3" stroke-dasharray="82, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-gs-teal">82</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-4 gap-2 mt-4">
            {[
              { icon: 'fa-utensils', label: 'Nutrition', score: 85, color: 'gs-green' },
              { icon: 'fa-running', label: 'Exercise', score: 72, color: 'gs-gold' },
              { icon: 'fa-moon', label: 'Sleep', score: 90, color: 'gs-blue' },
              { icon: 'fa-smile', label: 'Mood', score: 80, color: 'gs-purple' }
            ].map((item) => (
              <div class="text-center">
                <div class={`w-10 h-10 rounded-full bg-${item.color}/10 flex items-center justify-center mx-auto mb-1`}>
                  <i class={`fas ${item.icon} text-${item.color} text-sm`}></i>
                </div>
                <p class="text-xs text-gray-500">{item.label}</p>
                <p class="text-sm font-bold text-gs-navy">{item.score}%</p>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Nutrition Tracking */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Nutrition</h3>
            <button class="text-xs text-gs-gold">+ Log Meal</button>
          </div>
          
          <Card className="p-4">
            {/* Calories Progress */}
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-2xl font-bold text-gs-navy">1,450</p>
                <p class="text-xs text-gray-500">of 2,000 kcal</p>
              </div>
              <div class="flex-1 mx-4">
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gs-green rounded-full" style="width: 72%"></div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gs-green">550</p>
                <p class="text-xs text-gray-500">remaining</p>
              </div>
            </div>
            
            {/* Macros */}
            <div class="grid grid-cols-3 gap-4 pt-4 border-t">
              {[
                { label: 'Protein', value: 85, target: 120, color: 'gs-red' },
                { label: 'Carbs', value: 165, target: 250, color: 'gs-gold' },
                { label: 'Fat', value: 48, target: 65, color: 'gs-blue' }
              ].map((macro) => (
                <div class="text-center">
                  <div class="relative w-12 h-12 mx-auto mb-2">
                    <svg class="transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                      <circle cx="18" cy="18" r="14" fill="none" stroke={macro.color === 'gs-red' ? '#E74C3C' : macro.color === 'gs-gold' ? '#C9A962' : '#3498DB'} stroke-width="4" stroke-dasharray={`${(macro.value / macro.target) * 100}, 100`} stroke-linecap="round"/>
                    </svg>
                  </div>
                  <p class="text-xs text-gray-500">{macro.label}</p>
                  <p class="text-sm font-medium text-gs-navy">{macro.value}g</p>
                </div>
              ))}
            </div>
            
            {/* Today's Meals */}
            <div class="mt-4 pt-4 border-t">
              <p class="text-xs font-medium text-gray-500 mb-3">Today's Meals</p>
              <div class="space-y-2">
                {[
                  { meal: 'Breakfast', time: '8:00 AM', calories: 420, items: 'Oatmeal, berries, almonds' },
                  { meal: 'Snack', time: '10:30 AM', calories: 150, items: 'Greek yogurt' },
                  { meal: 'Lunch', time: '12:30 PM', calories: 580, items: 'Grilled chicken salad' },
                  { meal: 'Snack', time: '3:00 PM', calories: 120, items: 'Apple, protein bar' }
                ].map((meal) => (
                  <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p class="text-sm font-medium text-gs-navy">{meal.meal}</p>
                      <p class="text-xs text-gray-400">{meal.items}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-medium text-gs-navy">{meal.calories} kcal</p>
                      <p class="text-xs text-gray-400">{meal.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Personalized Meal Plan */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Your Meal Plan</h3>
          <Card className="p-4 bg-gs-navy text-white">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-gs-gold/20 flex items-center justify-center">
                <i class="fas fa-utensils text-gs-gold"></i>
              </div>
              <div>
                <h4 class="font-bold">Post-Surgery Recovery Diet</h4>
                <p class="text-xs text-white/70">By Dr. A. Schmidt, Nutritionist</p>
              </div>
            </div>
            <p class="text-sm text-white/80 mb-4">High-protein, anti-inflammatory diet optimized for tissue healing and recovery.</p>
            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-gs-gold text-gs-navy text-sm font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
                View Full Plan
              </button>
              <button class="flex-1 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
                Shopping List
              </button>
            </div>
          </Card>
        </div>
        
        {/* Exercise Program */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Exercise Program</h3>
            <button class="text-xs text-gs-gold">+ Log Exercise</button>
          </div>
          
          <Card className="p-4">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="font-semibold text-gs-navy">Week 2: Mobility Phase</h4>
                <p class="text-xs text-gray-500">Post-op rehabilitation program</p>
              </div>
              <span class="px-2 py-1 bg-gs-gold/10 text-gs-gold text-xs rounded-full">4/7 completed</span>
            </div>
            
            {/* Today's Exercises */}
            <div class="space-y-3">
              {[
                { name: 'Gentle Knee Bends', duration: '10 min', sets: '3 x 15 reps', completed: true },
                { name: 'Seated Leg Raises', duration: '10 min', sets: '3 x 12 reps', completed: true },
                { name: 'Walking Practice', duration: '15 min', sets: 'Light pace', completed: false },
                { name: 'Stretching Routine', duration: '10 min', sets: 'Full body', completed: false }
              ].map((exercise) => (
                <div class={`flex items-center gap-3 p-3 rounded-lg ${exercise.completed ? 'bg-gs-green/5' : 'bg-gray-50'}`}>
                  <button class={`w-8 h-8 rounded-full flex items-center justify-center ${exercise.completed ? 'bg-gs-green text-white' : 'border-2 border-gray-300'}`}>
                    {exercise.completed && <i class="fas fa-check text-sm"></i>}
                  </button>
                  <div class="flex-1">
                    <p class={`text-sm font-medium ${exercise.completed ? 'text-gray-400 line-through' : 'text-gs-navy'}`}>{exercise.name}</p>
                    <p class="text-xs text-gray-400">{exercise.sets} • {exercise.duration}</p>
                  </div>
                  {!exercise.completed && (
                    <button class="px-3 py-1 bg-gs-navy text-white text-xs rounded-full">Start</button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Mood & Mental Wellness */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Mood Journal</h3>
          <Card className="p-4">
            <p class="text-sm text-gray-600 mb-4">How are you feeling today?</p>
            
            <div class="flex justify-between mb-4">
              {[
                { emoji: '😢', label: 'Sad' },
                { emoji: '😕', label: 'Low' },
                { emoji: '😐', label: 'Okay' },
                { emoji: '🙂', label: 'Good' },
                { emoji: '😊', label: 'Great' }
              ].map((mood, idx) => (
                <button class={`flex flex-col items-center p-2 rounded-lg transition-all ${idx === 3 ? 'bg-gs-gold/10 ring-2 ring-gs-gold' : 'hover:bg-gray-50'}`}>
                  <span class="text-2xl mb-1">{mood.emoji}</span>
                  <span class="text-xs text-gray-500">{mood.label}</span>
                </button>
              ))}
            </div>
            
            <textarea 
              class="w-full p-3 bg-gray-50 rounded-lg text-sm border-0 focus:ring-2 focus:ring-gs-gold outline-none resize-none"
              rows={3}
              placeholder="Add notes about your day..."
            ></textarea>
            
            <button class="w-full mt-3 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
              Save Entry
            </button>
          </Card>
        </div>
        
        {/* Sleep Tracking */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Sleep Analysis</h3>
          <Card className="p-4">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-2xl font-bold text-gs-navy">7h 12m</p>
                <p class="text-xs text-gray-500">Last night's sleep</p>
              </div>
              <span class="px-3 py-1 bg-gs-green/10 text-gs-green text-sm font-medium rounded-full">Good</span>
            </div>
            
            {/* Sleep Stages */}
            <div class="h-8 rounded-full overflow-hidden flex mb-4">
              <div class="bg-indigo-300 h-full" style="width: 15%"></div>
              <div class="bg-indigo-500 h-full" style="width: 20%"></div>
              <div class="bg-indigo-700 h-full" style="width: 25%"></div>
              <div class="bg-indigo-500 h-full" style="width: 20%"></div>
              <div class="bg-indigo-300 h-full" style="width: 20%"></div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="w-3 h-3 rounded-full bg-indigo-300 mx-auto mb-1"></div>
                <p class="text-xs text-gray-500">Awake</p>
                <p class="text-sm font-medium text-gs-navy">32m</p>
              </div>
              <div>
                <div class="w-3 h-3 rounded-full bg-indigo-500 mx-auto mb-1"></div>
                <p class="text-xs text-gray-500">Light</p>
                <p class="text-sm font-medium text-gs-navy">3h 20m</p>
              </div>
              <div>
                <div class="w-3 h-3 rounded-full bg-indigo-700 mx-auto mb-1"></div>
                <p class="text-xs text-gray-500">Deep</p>
                <p class="text-sm font-medium text-gs-navy">1h 45m</p>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Bedtime</span>
                <span class="font-medium text-gs-navy">11:15 PM</span>
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span class="text-gray-500">Wake time</span>
                <span class="font-medium text-gs-navy">6:27 AM</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Tips & Resources */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Recovery Tips</h3>
          <div class="space-y-3">
            {[
              { icon: 'fa-water', title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily for optimal healing.', color: 'gs-blue' },
              { icon: 'fa-bed', title: 'Quality Sleep', desc: 'Aim for 7-9 hours of sleep to support tissue repair.', color: 'gs-purple' },
              { icon: 'fa-walking', title: 'Light Movement', desc: 'Short walks help circulation and prevent stiffness.', color: 'gs-green' }
            ].map((tip) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class={`w-10 h-10 rounded-full bg-${tip.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <i class={`fas ${tip.icon} text-${tip.color}`}></i>
                  </div>
                  <div>
                    <h5 class="font-semibold text-sm text-gs-navy">{tip.title}</h5>
                    <p class="text-xs text-gray-600 mt-1">{tip.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
