import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const wellnessPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="Wellness & Lifestyle" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* Wellness Score */}
        <Card className="p-4 bg-gradient-to-br from-gs-teal/10 to-gs-green/10">
          <div class="flex items-center gap-4">
            <div class="relative">
              <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#4A9B9B" stroke-width="3" stroke-dasharray="78, 100" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-gs-navy">78</span>
                <span class="text-xs text-gray-500">Score</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gs-navy">Wellness Score</h3>
              <p class="text-sm text-gray-500">Great progress! Keep it up.</p>
              <div class="flex gap-2 mt-2">
                <span class="px-2 py-0.5 bg-gs-green/10 text-gs-green text-xs rounded-full">+3 this week</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gs-navy/10">
            {[
              { label: 'Nutrition', score: 82, color: 'gs-green' },
              { label: 'Exercise', score: 75, color: 'gs-gold' },
              { label: 'Sleep', score: 85, color: 'gs-purple' },
              { label: 'Mood', score: 70, color: 'gs-blue' }
            ].map((item) => (
              <div class="text-center">
                <p class={`text-lg font-bold text-${item.color}`}>{item.score}</p>
                <p class="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Daily Goals */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Today's Goals</h3>
            <span class="text-xs text-gs-gold">4/6 completed</span>
          </div>
          <div class="space-y-2">
            {[
              { icon: 'fa-glass-water', task: 'Drink 8 glasses of water', progress: '6/8', done: false },
              { icon: 'fa-walking', task: 'Walk 8,000 steps', progress: '4,230/8,000', done: false },
              { icon: 'fa-apple-alt', task: 'Eat 5 servings of vegetables', progress: '5/5', done: true },
              { icon: 'fa-dumbbell', task: 'Complete physiotherapy exercises', progress: '', done: true },
              { icon: 'fa-pills', task: 'Take medications', progress: '', done: true },
              { icon: 'fa-bed', task: 'Sleep 7+ hours', progress: '7.2h', done: true }
            ].map((goal) => (
              <Card className={`p-3 ${goal.done ? 'bg-gs-green/5 border border-gs-green/20' : ''}`}>
                <div class="flex items-center gap-3">
                  <div class={`w-10 h-10 rounded-full flex items-center justify-center ${goal.done ? 'bg-gs-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <i class={`fas ${goal.done ? 'fa-check' : goal.icon}`}></i>
                  </div>
                  <div class="flex-1">
                    <p class={`text-sm font-medium ${goal.done ? 'text-gs-green line-through' : 'text-gs-navy'}`}>{goal.task}</p>
                    {goal.progress && <p class="text-xs text-gray-400">{goal.progress}</p>}
                  </div>
                  {!goal.done && (
                    <button class="w-8 h-8 rounded-full bg-gs-gold/10 text-gs-gold hover:bg-gs-gold/20 transition-colors">
                      <i class="fas fa-check text-sm"></i>
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Nutrition Plan */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Today's Nutrition</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">Full Plan</a>
          </div>
          <Card className="p-4">
            {/* Calories Progress */}
            <div class="mb-4">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gs-navy">Calories</span>
                <span class="text-sm text-gray-500">1,420 / 1,800 kcal</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gs-green rounded-full" style="width: 79%"></div>
              </div>
            </div>
            
            {/* Macros */}
            <div class="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Protein', value: '85g', target: '100g', percent: 85, color: 'gs-red' },
                { label: 'Carbs', value: '120g', target: '150g', percent: 80, color: 'gs-gold' },
                { label: 'Fat', value: '45g', target: '60g', percent: 75, color: 'gs-blue' }
              ].map((macro) => (
                <div class="text-center">
                  <div class="relative w-14 h-14 mx-auto">
                    <svg class="transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                      <circle cx="18" cy="18" r="14" fill="none" stroke={macro.color === 'gs-red' ? '#E74C3C' : macro.color === 'gs-gold' ? '#C9A962' : '#3498DB'} stroke-width="4" stroke-dasharray={`${macro.percent}, 100`} stroke-linecap="round"/>
                    </svg>
                    <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gs-navy">{macro.percent}%</span>
                  </div>
                  <p class="text-xs font-medium text-gs-navy mt-1">{macro.label}</p>
                  <p class="text-xs text-gray-400">{macro.value}/{macro.target}</p>
                </div>
              ))}
            </div>
            
            {/* Meals */}
            <div class="space-y-3">
              {[
                { meal: 'Breakfast', time: '8:00 AM', items: 'Oatmeal, Berries, Greek Yogurt', cal: 350, logged: true },
                { meal: 'Lunch', time: '12:30 PM', items: 'Grilled Chicken Salad', cal: 520, logged: true },
                { meal: 'Snack', time: '3:30 PM', items: 'Apple, Almonds', cal: 180, logged: true },
                { meal: 'Dinner', time: '7:00 PM', items: 'Suggested: Salmon with vegetables', cal: 450, logged: false }
              ].map((meal) => (
                <div class={`flex items-center gap-3 p-2 rounded-lg ${meal.logged ? 'bg-gs-green/5' : 'bg-gray-50'}`}>
                  <div class={`w-10 h-10 rounded-full flex items-center justify-center ${meal.logged ? 'bg-gs-green/10 text-gs-green' : 'bg-gray-100 text-gray-400'}`}>
                    <i class={`fas ${meal.logged ? 'fa-check' : 'fa-utensils'}`}></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium text-gs-navy">{meal.meal}</p>
                      <span class="text-xs text-gray-400">{meal.time}</span>
                    </div>
                    <p class="text-xs text-gray-500">{meal.items}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gs-navy">{meal.cal}</p>
                    <p class="text-xs text-gray-400">kcal</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button class="w-full mt-4 py-2 bg-gs-gold text-gs-navy font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
              <i class="fas fa-plus mr-2"></i>Log Meal
            </button>
          </Card>
        </div>
        
        {/* Exercise Plan */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Exercise Plan</h3>
            <span class="text-xs bg-gs-gold/10 text-gs-gold px-2 py-1 rounded-full">Week 2 of Recovery</span>
          </div>
          <Card className="p-4">
            <div class="space-y-3">
              {[
                { exercise: 'Morning Walk', duration: '20 min', intensity: 'Light', status: 'completed', icon: 'fa-walking' },
                { exercise: 'Knee Mobility', duration: '15 min', intensity: 'Gentle', status: 'completed', icon: 'fa-sync' },
                { exercise: 'Pool Therapy', duration: '30 min', intensity: 'Moderate', status: 'upcoming', icon: 'fa-swimmer', time: '2:00 PM' },
                { exercise: 'Evening Stretch', duration: '10 min', intensity: 'Light', status: 'upcoming', icon: 'fa-child', time: '7:00 PM' }
              ].map((ex) => (
                <div class="flex items-center gap-3">
                  <div class={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ex.status === 'completed' ? 'bg-gs-green text-white' : 'bg-gs-navy/10 text-gs-navy'
                  }`}>
                    <i class={`fas ${ex.status === 'completed' ? 'fa-check' : ex.icon}`}></i>
                  </div>
                  <div class="flex-1">
                    <p class={`text-sm font-medium ${ex.status === 'completed' ? 'text-gs-green' : 'text-gs-navy'}`}>{ex.exercise}</p>
                    <p class="text-xs text-gray-400">{ex.duration} • {ex.intensity}</p>
                  </div>
                  {ex.time && (
                    <span class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{ex.time}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div class="mt-4 p-3 bg-gs-blue/5 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-info-circle text-gs-blue"></i>
                <span class="text-sm font-medium text-gs-navy">Recovery Exercise Tips</span>
              </div>
              <p class="text-xs text-gray-600">Start with gentle movements. Stop if you feel pain. Focus on mobility over intensity during weeks 1-3.</p>
            </div>
          </Card>
        </div>
        
        {/* Mood Tracking */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Mood Journal</h3>
            <a href="#" class="text-xs text-gs-gold hover:underline">History</a>
          </div>
          <Card className="p-4">
            <p class="text-sm text-gray-600 mb-3">How are you feeling today?</p>
            <div class="flex justify-between mb-4">
              {[
                { emoji: '😊', label: 'Great', value: 5 },
                { emoji: '🙂', label: 'Good', value: 4 },
                { emoji: '😐', label: 'Okay', value: 3 },
                { emoji: '😔', label: 'Low', value: 2 },
                { emoji: '😢', label: 'Bad', value: 1 }
              ].map((mood, idx) => (
                <button class={`flex flex-col items-center p-2 rounded-lg transition-all ${idx === 1 ? 'bg-gs-gold/20 ring-2 ring-gs-gold' : 'hover:bg-gray-100'}`}>
                  <span class="text-2xl mb-1">{mood.emoji}</span>
                  <span class="text-xs text-gray-500">{mood.label}</span>
                </button>
              ))}
            </div>
            
            <textarea 
              class="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-gs-gold outline-none text-sm resize-none"
              rows={2}
              placeholder="Add a note about how you're feeling..."
            ></textarea>
            
            <button class="w-full mt-3 py-2 bg-gs-navy text-white font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
              <i class="fas fa-save mr-2"></i>Save Entry
            </button>
          </Card>
        </div>
        
        {/* Sleep Tracking */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">Sleep Quality</h3>
            <span class="text-xs text-gray-400">Last 7 nights</span>
          </div>
          <Card className="p-4">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-full bg-gs-purple/10 flex items-center justify-center">
                <div class="text-center">
                  <p class="text-xl font-bold text-gs-purple">85</p>
                  <p class="text-xs text-gray-500">Score</p>
                </div>
              </div>
              <div class="flex-1">
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p class="text-gray-500">Bedtime</p>
                    <p class="font-medium text-gs-navy">11:30 PM</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Wake up</p>
                    <p class="font-medium text-gs-navy">6:45 AM</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Duration</p>
                    <p class="font-medium text-gs-navy">7h 15m</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Deep sleep</p>
                    <p class="font-medium text-gs-navy">1h 45m</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sleep Chart */}
            <div class="flex items-end justify-between h-16 gap-1 mb-2">
              {[6.5, 7.2, 6.8, 7.5, 7.0, 7.2, 7.2].map((hours, idx) => (
                <div class="flex-1 flex flex-col items-center">
                  <div 
                    class={`w-full rounded-t ${hours >= 7 ? 'bg-gs-purple' : 'bg-gs-purple/40'}`}
                    style={`height: ${hours * 8}px`}
                  ></div>
                </div>
              ))}
            </div>
            <div class="flex justify-between text-xs text-gray-400">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span>{day}</span>
              ))}
            </div>
            
            <div class="mt-4 p-3 bg-gs-purple/5 rounded-lg">
              <p class="text-sm text-gs-navy"><strong>Tip:</strong> Try to maintain consistent sleep and wake times, even on weekends, for better recovery.</p>
            </div>
          </Card>
        </div>
        
        {/* Resources */}
        <div>
          <h3 class="font-bold text-gs-navy mb-3">Wellness Resources</h3>
          <div class="flex gap-3 overflow-x-auto pb-2">
            {[
              { title: 'Post-Surgery Nutrition', type: 'Guide', icon: 'fa-book', color: 'gs-green' },
              { title: 'Gentle Yoga', type: 'Video', icon: 'fa-video', color: 'gs-purple' },
              { title: 'Sleep Meditation', type: 'Audio', icon: 'fa-headphones', color: 'gs-blue' }
            ].map((resource) => (
              <Card className="flex-shrink-0 w-40 p-3 cursor-pointer hover:shadow-gs-lg transition-all">
                <div class={`w-10 h-10 rounded-lg bg-${resource.color}/10 flex items-center justify-center mb-2`}>
                  <i class={`fas ${resource.icon} text-${resource.color}`}></i>
                </div>
                <p class="text-sm font-medium text-gs-navy">{resource.title}</p>
                <p class="text-xs text-gray-400">{resource.type}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
