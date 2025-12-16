import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const aiDiagnosticsPage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={true}>
      <Header title="AI Health Assistant" showBack={true} />
      
      <main class="px-4 py-4 space-y-6">
        {/* AI Assistant Header */}
        <Card className="p-4 bg-gradient-to-br from-gs-purple/10 to-gs-blue/10">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gs-purple/20 flex items-center justify-center">
              <i class="fas fa-robot text-gs-purple text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-gs-navy">AI Health Assistant</h3>
              <p class="text-sm text-gray-500">Evidence-based health insights & risk analysis</p>
            </div>
          </div>
        </Card>
        
        {/* Disclaimer */}
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          <span>AI insights are for informational purposes only. Always consult your healthcare provider for medical decisions.</span>
        </div>
        
        {/* Quick Tools */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Health Tools</h3>
          <div class="grid grid-cols-2 gap-3">
            {[
              { icon: 'fa-calculator', title: 'Risk Calculators', desc: 'ASCVD, Diabetes Risk, BMI', color: 'gs-red' },
              { icon: 'fa-file-medical', title: 'Document Analysis', desc: 'Lab results & reports', color: 'gs-blue' },
              { icon: 'fa-images', title: 'Image Analysis', desc: 'Medical imaging review', color: 'gs-purple' },
              { icon: 'fa-lightbulb', title: 'Health Tips', desc: 'Personalized recommendations', color: 'gs-green' }
            ].map((tool) => (
              <Card className="p-4 cursor-pointer hover:shadow-gs-lg transition-all">
                <div class={`w-10 h-10 rounded-lg bg-${tool.color}/10 flex items-center justify-center mb-3`}>
                  <i class={`fas ${tool.icon} text-${tool.color}`}></i>
                </div>
                <h4 class="font-semibold text-sm text-gs-navy">{tool.title}</h4>
                <p class="text-xs text-gray-500">{tool.desc}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Risk Calculators */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Risk Calculators</h3>
          <div class="space-y-3">
            {[
              { name: 'Cardiovascular Risk (ASCVD)', desc: '10-year heart disease risk', score: 8.2, status: 'Low', color: 'gs-green', lastUpdated: 'Oct 15' },
              { name: 'Diabetes Risk (ADA)', desc: 'Type 2 diabetes risk score', score: 3, status: 'Low', color: 'gs-green', lastUpdated: 'Oct 10' },
              { name: 'BMI Calculator', desc: 'Body Mass Index', score: 27.8, status: 'Overweight', color: 'gs-gold', lastUpdated: 'Today' },
              { name: 'Kidney Function (eGFR)', desc: 'Estimated glomerular filtration rate', score: 92, status: 'Normal', color: 'gs-green', lastUpdated: 'Oct 12' }
            ].map((calc) => (
              <Card className="p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gs-navy">{calc.name}</h4>
                    <p class="text-xs text-gray-500">{calc.desc}</p>
                    <p class="text-xs text-gray-400 mt-1">Last updated: {calc.lastUpdated}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-gs-navy">{calc.score}</p>
                    <span class={`text-xs px-2 py-0.5 rounded-full bg-${calc.color}/10 text-${calc.color}`}>
                      {calc.status}
                    </span>
                  </div>
                </div>
                <button class="w-full mt-3 py-2 border border-gs-navy/20 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Recalculate
                </button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Document Analysis */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Document Analysis</h3>
          <Card className="p-4">
            <div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <div class="w-12 h-12 rounded-full bg-gs-blue/10 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-cloud-upload-alt text-gs-blue text-xl"></i>
              </div>
              <p class="text-sm font-medium text-gs-navy mb-1">Upload Medical Document</p>
              <p class="text-xs text-gray-500 mb-3">Lab results, imaging reports, medical records</p>
              <button class="px-4 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                Select File
              </button>
            </div>
            
            {/* Recent Analyses */}
            <div class="mt-4 pt-4 border-t">
              <p class="text-xs font-medium text-gray-500 mb-3">Recent Analyses</p>
              <div class="space-y-2">
                {[
                  { name: 'Blood Test Results.pdf', date: 'Oct 15', status: 'Analyzed' },
                  { name: 'X-Ray Report.pdf', date: 'Oct 12', status: 'Analyzed' }
                ].map((doc) => (
                  <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <i class="fas fa-file-pdf text-gs-red"></i>
                    <div class="flex-1">
                      <p class="text-sm text-gs-navy">{doc.name}</p>
                      <p class="text-xs text-gray-400">{doc.date}</p>
                    </div>
                    <span class="text-xs text-gs-green">{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* AI Chat */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Ask AI Assistant</h3>
          <Card className="p-4">
            {/* Chat Messages */}
            <div class="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {/* AI Welcome */}
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-gs-purple/10 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-robot text-gs-purple text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="bg-gray-50 rounded-lg rounded-tl-none p-3">
                    <p class="text-sm text-gray-700">Hello! I'm your AI Health Assistant. I can help you understand your health data, calculate risk scores, and provide evidence-based health information. How can I help you today?</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>
              
              {/* User Question */}
              <div class="flex gap-3 flex-row-reverse">
                <div class="w-8 h-8 rounded-full bg-gs-gold flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user text-gs-navy text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="bg-gs-navy text-white rounded-lg rounded-tr-none p-3">
                    <p class="text-sm">What does my blood pressure reading of 128/82 mean?</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1 text-right">2 min ago</p>
                </div>
              </div>
              
              {/* AI Response */}
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-gs-purple/10 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-robot text-gs-purple text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="bg-gray-50 rounded-lg rounded-tl-none p-3">
                    <p class="text-sm text-gray-700 mb-2">Your blood pressure reading of 128/82 mmHg falls into the <strong>Elevated</strong> category according to American Heart Association guidelines:</p>
                    <ul class="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Normal: Less than 120/80 mmHg</li>
                      <li><strong>Elevated: 120-129/&lt;80 mmHg</strong> ← Your range</li>
                      <li>High (Stage 1): 130-139/80-89 mmHg</li>
                    </ul>
                    <p class="text-sm text-gray-700 mt-2">This suggests you may benefit from lifestyle modifications. I recommend discussing this with your care team.</p>
                    <div class="mt-2 p-2 bg-gs-blue/10 rounded text-xs text-gs-blue">
                      <i class="fas fa-book mr-1"></i>
                      Source: American Heart Association Blood Pressure Guidelines (2023)
                    </div>
                  </div>
                  <p class="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>
            </div>
            
            {/* Quick Suggestions */}
            <div class="flex gap-2 flex-wrap mb-3">
              {['Explain my lab results', 'Recovery tips', 'Diet recommendations'].map((suggestion) => (
                <button class="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors">
                  {suggestion}
                </button>
              ))}
            </div>
            
            {/* Input */}
            <div class="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask a health question..." 
                class="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gs-purple outline-none text-sm"
              />
              <button class="w-12 h-12 bg-gs-purple text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </Card>
        </div>
        
        {/* Health Insights */}
        <div>
          <h3 class="text-sm font-bold text-gs-navy mb-3">Personalized Insights</h3>
          <div class="space-y-3">
            {[
              { icon: 'fa-heartbeat', title: 'Heart Health', insight: 'Your cardiovascular risk is low. Keep maintaining your exercise routine.', color: 'gs-green' },
              { icon: 'fa-weight', title: 'Weight Management', insight: 'You\'re on track with your post-surgery weight loss goals. 5.2kg lost this month.', color: 'gs-gold' },
              { icon: 'fa-moon', title: 'Sleep Quality', insight: 'Your sleep patterns have improved. Average 7.2 hours this week.', color: 'gs-blue' }
            ].map((insight) => (
              <Card className="p-4">
                <div class="flex items-start gap-3">
                  <div class={`w-10 h-10 rounded-full bg-${insight.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <i class={`fas ${insight.icon} text-${insight.color}`}></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-sm text-gs-navy">{insight.title}</h4>
                    <p class="text-sm text-gray-600 mt-1">{insight.insight}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Connect to Doctor */}
        <Card className="p-4 bg-gs-navy text-white">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gs-gold/20 flex items-center justify-center">
              <i class="fas fa-user-md text-gs-gold"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-bold">Need Expert Opinion?</h4>
              <p class="text-sm text-white/70">Connect with your care team</p>
            </div>
            <a href="/patient/telemedicine" class="px-4 py-2 bg-gs-gold text-gs-navy text-sm font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
              Connect
            </a>
          </div>
        </Card>
      </main>
    </PageWrapper>
  )
}
