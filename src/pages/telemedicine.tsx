import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const telemedicinePage = (c: Context) => {
  return c.render(
    <PageWrapper active="home" showNav={false}>
      <Header title="Telemedicine" showBack={true} showProfile={false} />
      
      <main class="px-4 py-4 space-y-6">
        {/* HIPAA/GDPR Compliance Badge */}
        <div class="flex items-center justify-center gap-4 py-2">
          <span class="flex items-center gap-1 text-xs text-gs-green bg-gs-green/10 px-3 py-1 rounded-full">
            <i class="fas fa-shield-alt"></i>
            HIPAA Compliant
          </span>
          <span class="flex items-center gap-1 text-xs text-gs-blue bg-gs-blue/10 px-3 py-1 rounded-full">
            <i class="fas fa-lock"></i>
            GDPR Protected
          </span>
          <span class="flex items-center gap-1 text-xs text-gs-gold bg-gs-gold/10 px-3 py-1 rounded-full">
            <i class="fas fa-certificate"></i>
            E2E Encrypted
          </span>
        </div>

        {/* ==================== VIRTUAL WAITING ROOM - DOXY.ME STYLE ==================== */}
        <Card className="p-0 overflow-hidden bg-gradient-to-br from-gs-navy via-gs-navy to-gs-navy-dark text-white relative">
          {/* Animated background pattern */}
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 30px 30px;"></div>
          </div>
          
          <div class="relative z-10 p-5">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-gs-green rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-gs-gold">Virtual Waiting Room</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-white/10 px-3 py-1 rounded-full"><i class="fas fa-video mr-1"></i>No Download Required</span>
              </div>
            </div>
            
            {/* Doctor Profile */}
            <div class="flex items-center gap-4 mb-5">
              <div class="relative">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-gs-gold/30 to-gs-gold/10 flex items-center justify-center border-2 border-gs-gold overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200" alt="Doctor" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <div class="hidden w-full h-full items-center justify-center">
                    <i class="fas fa-user-md text-gs-gold text-2xl"></i>
                  </div>
                </div>
                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gs-green rounded-full flex items-center justify-center border-2 border-gs-navy">
                  <i class="fas fa-check text-white text-xs"></i>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-xl">Dr. K. Müller</h3>
                <p class="text-sm text-gs-gold">Cardiologist</p>
                <p class="text-xs text-white/70">University Hospital Kiel, Germany</p>
                <div class="flex items-center gap-3 mt-2">
                  <div class="flex items-center gap-1">
                    <i class="fas fa-star text-gs-gold text-xs"></i>
                    <span class="text-sm font-medium">4.8</span>
                    <span class="text-xs text-white/50">(342 reviews)</span>
                  </div>
                  <span class="text-xs text-white/50">|</span>
                  <span class="text-xs text-gs-green"><i class="fas fa-circle text-[8px] mr-1"></i>Available Now</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Queue Status */}
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-users text-gs-gold"></i>
                  <span class="text-xs text-white/70">Queue Position</span>
                </div>
                <div class="flex items-end gap-1">
                  <span class="text-3xl font-bold text-gs-gold">#1</span>
                  <span class="text-xs text-white/50 mb-1">of 1</span>
                </div>
              </div>
              <div class="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-clock text-gs-green"></i>
                  <span class="text-xs text-white/70">Estimated Wait</span>
                </div>
                <div class="flex items-end gap-1">
                  <span class="text-3xl font-bold text-gs-green">~2</span>
                  <span class="text-xs text-white/50 mb-1">min</span>
                </div>
              </div>
            </div>
            
            {/* Waiting Room Features */}
            <div class="grid grid-cols-4 gap-2 mb-4">
              <div class="text-center p-2">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-1">
                  <i class="fas fa-clock text-white/70"></i>
                </div>
                <span class="text-[10px] text-white/60">Auto-Join</span>
              </div>
              <div class="text-center p-2">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-1">
                  <i class="fas fa-bell text-white/70"></i>
                </div>
                <span class="text-[10px] text-white/60">Notifications</span>
              </div>
              <div class="text-center p-2">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-1">
                  <i class="fas fa-volume-up text-white/70"></i>
                </div>
                <span class="text-[10px] text-white/60">Sound Alert</span>
              </div>
              <div class="text-center p-2">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-1">
                  <i class="fas fa-mobile-alt text-white/70"></i>
                </div>
                <span class="text-[10px] text-white/60">SMS Ready</span>
              </div>
            </div>
          </div>
          
          {/* Pre-visit Questionnaire Status */}
          <div class="relative z-10 px-5 py-3 bg-gs-gold/10 border-t border-white/10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gs-green/20 flex items-center justify-center">
                  <i class="fas fa-clipboard-check text-gs-green"></i>
                </div>
                <div>
                  <span class="text-sm font-medium">Pre-visit form completed</span>
                  <p class="text-[10px] text-white/60">Chief complaint: Follow-up consultation</p>
                </div>
              </div>
              <span class="text-xs bg-gs-green text-white px-3 py-1 rounded-full font-medium">
                <i class="fas fa-check mr-1"></i>Ready
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div class="relative z-10 p-4 grid grid-cols-3 gap-2">
            <button onclick="startVideoCall()" class="col-span-2 py-4 bg-gradient-to-r from-gs-gold to-gs-gold-dark text-gs-navy font-bold rounded-xl hover:shadow-lg hover:shadow-gs-gold/30 transition-all flex items-center justify-center gap-2 text-lg">
              <i class="fas fa-video"></i>
              <span>Join Video Call</span>
            </button>
            <div class="grid grid-rows-2 gap-2">
              <button class="py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <i class="fas fa-phone"></i>
                <span class="text-xs">Audio</span>
              </button>
              <button class="py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <i class="fas fa-comment-dots"></i>
                <span class="text-xs">Chat</span>
              </button>
            </div>
          </div>
        </Card>

        {/* ==================== QUICK CONNECT - INSTANT ACCESS ==================== */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy flex items-center gap-2">
              <i class="fas fa-bolt text-gs-gold"></i>
              Quick Connect
            </h3>
            <span class="text-xs text-gray-500">Available now</span>
          </div>
          <div class="grid grid-cols-3 gap-3">
            {[
              { name: 'Dr. Weber', specialty: 'Orthopedic', wait: 'Instant', status: 'online', rating: '4.9' },
              { name: 'Dr. Schmidt', specialty: 'Nutritionist', wait: '~2 min', status: 'online', rating: '4.7' },
              { name: 'M. Hassan', specialty: 'Physio', wait: '~5 min', status: 'busy', rating: '4.8' }
            ].map((doc) => (
              <Card className="p-3 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div class="relative inline-block mb-2">
                  <div class="w-14 h-14 rounded-full bg-gs-gold/10 flex items-center justify-center mx-auto group-hover:bg-gs-gold/20 transition-colors">
                    <i class="fas fa-user-md text-gs-gold text-xl"></i>
                  </div>
                  <div class={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.status === 'online' ? 'bg-gs-green' : 'bg-yellow-500'}`}></div>
                </div>
                <h4 class="text-sm font-semibold text-gs-navy truncate">{doc.name}</h4>
                <p class="text-[10px] text-gray-500">{doc.specialty}</p>
                <div class="flex items-center justify-center gap-1 mt-1">
                  <i class="fas fa-star text-gs-gold text-[8px]"></i>
                  <span class="text-[10px]">{doc.rating}</span>
                </div>
                <p class={`text-[10px] mt-1 font-medium ${doc.status === 'online' ? 'text-gs-green' : 'text-yellow-600'}`}>{doc.wait}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ==================== HD VIDEO CONSULTATION INTERFACE ==================== */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gs-navy">HD Video Consultation</h3>
            <span class="text-xs bg-gs-green/10 text-gs-green px-3 py-1 rounded-full">
              <i class="fas fa-lock mr-1"></i>End-to-End Encrypted
            </span>
          </div>
          <Card className="overflow-hidden shadow-xl">
            <div class="aspect-video bg-gradient-to-br from-gray-900 via-gs-navy-dark to-gray-900 flex items-center justify-center relative">
              {/* Video Quality Indicator */}
              <div class="absolute top-4 right-4 flex items-center gap-2">
                <div class="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div class="flex gap-0.5">
                    <div class="w-1 h-2 bg-gs-green rounded-sm"></div>
                    <div class="w-1 h-3 bg-gs-green rounded-sm"></div>
                    <div class="w-1 h-4 bg-gs-green rounded-sm"></div>
                    <div class="w-1 h-5 bg-gs-green rounded-sm"></div>
                  </div>
                  <span class="text-white text-xs font-medium">1080p HD</span>
                </div>
              </div>
              
              {/* Recording Indicator */}
              <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                <div class="w-2 h-2 bg-gs-red rounded-full animate-pulse"></div>
                <span class="text-white text-sm font-mono">00:00:00</span>
              </div>
              
              {/* Main video area */}
              <div class="text-center text-white">
                <div class="w-28 h-28 rounded-full bg-gradient-to-br from-gs-gold/30 to-gs-gold/10 flex items-center justify-center mx-auto mb-4 border-4 border-gs-gold/50 shadow-lg shadow-gs-gold/20">
                  <i class="fas fa-user-md text-gs-gold text-4xl"></i>
                </div>
                <p class="text-white font-semibold text-lg">Dr. K. Müller</p>
                <p class="text-xs text-gs-gold">Cardiologist</p>
                <div class="flex items-center justify-center gap-1 mt-3">
                  <div class="w-2 h-2 bg-gs-gold rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                  <div class="w-2 h-2 bg-gs-gold rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                  <div class="w-2 h-2 bg-gs-gold rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
                </div>
                <p class="text-xs text-white/60 mt-2">Connecting securely...</p>
              </div>
              
              {/* Network Quality Overlay */}
              <div class="absolute bottom-24 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-wifi text-gs-green text-xs"></i>
                  <span class="text-white text-xs">Excellent Connection</span>
                </div>
                <div class="flex gap-2 text-[10px] text-white/60">
                  <span>↓ 45 Mbps</span>
                  <span>↑ 12 Mbps</span>
                  <span>12ms latency</span>
                </div>
              </div>
              
              {/* Picture-in-Picture (Self View) */}
              <div class="absolute bottom-24 right-4 w-32 h-44 bg-gs-navy rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <i class="fas fa-user text-white/30 text-3xl"></i>
                  
                  {/* Camera Preview Controls */}
                  <div class="absolute top-2 right-2 flex gap-1">
                    <button class="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i class="fas fa-expand-alt text-white text-xs"></i>
                    </button>
                  </div>
                  
                  {/* Self View Label */}
                  <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span class="bg-black/50 px-2 py-0.5 rounded text-xs text-white">You</span>
                    <div class="flex gap-1">
                      <div class="w-5 h-5 rounded-full bg-gs-green/80 flex items-center justify-center">
                        <i class="fas fa-microphone text-white text-[8px]"></i>
                      </div>
                      <div class="w-5 h-5 rounded-full bg-gs-green/80 flex items-center justify-center">
                        <i class="fas fa-video text-white text-[8px]"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Control Bar */}
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-md px-6 py-4 rounded-2xl">
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center group relative" title="Toggle Microphone">
                  <i class="fas fa-microphone text-lg"></i>
                  <span class="absolute -top-8 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Mute (M)</span>
                </button>
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center group relative" title="Toggle Camera">
                  <i class="fas fa-video text-lg"></i>
                  <span class="absolute -top-8 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Camera (V)</span>
                </button>
                <button class="w-16 h-16 rounded-full bg-gs-red text-white hover:bg-red-600 transition-all hover:scale-105 flex items-center justify-center shadow-lg shadow-red-500/30" title="End Call">
                  <i class="fas fa-phone-slash text-xl"></i>
                </button>
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center group relative" title="Share Screen">
                  <i class="fas fa-desktop text-lg"></i>
                  <span class="absolute -top-8 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Share (S)</span>
                </button>
                <button class="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center group relative" title="More Options">
                  <i class="fas fa-ellipsis-h text-lg"></i>
                  <span class="absolute -top-8 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">More</span>
                </button>
              </div>
            </div>
            
            {/* Enhanced Feature Bar */}
            <div class="p-4 bg-gradient-to-r from-gray-50 to-white">
              <div class="grid grid-cols-8 gap-2">
                {[
                  { icon: 'fa-desktop', label: 'Screen Share', color: 'gs-blue' },
                  { icon: 'fa-comment-alt', label: 'Live Chat', color: 'gs-purple', badge: '3' },
                  { icon: 'fa-file-upload', label: 'Share Files', color: 'gs-green' },
                  { icon: 'fa-language', label: 'Translate', color: 'gs-gold' },
                  { icon: 'fa-closed-captioning', label: 'Captions', color: 'gs-red' },
                  { icon: 'fa-user-plus', label: 'Add Guest', color: 'gs-navy' },
                  { icon: 'fa-record-vinyl', label: 'Record', color: 'gs-teal' },
                  { icon: 'fa-notes-medical', label: 'Notes', color: 'gs-purple' }
                ].map((feature) => (
                  <button class="flex flex-col items-center p-2 rounded-lg hover:bg-white hover:shadow-md transition-all group relative">
                    <div class={`w-10 h-10 rounded-full bg-${feature.color}/10 flex items-center justify-center mb-1 group-hover:bg-${feature.color}/20 transition-colors relative`}>
                      <i class={`fas ${feature.icon} text-${feature.color}`}></i>
                      {feature.badge && (
                        <span class="absolute -top-1 -right-1 w-4 h-4 bg-gs-red rounded-full text-white text-[8px] flex items-center justify-center">{feature.badge}</span>
                      )}
                    </div>
                    <span class="text-[9px] text-gray-600 text-center">{feature.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* ==================== IN-CALL FEATURES PANEL ==================== */}
        <div class="grid grid-cols-2 gap-4">
          {/* Live Chat Panel */}
          <Card className="p-0 overflow-hidden">
            <div class="p-3 bg-gradient-to-r from-gs-purple/10 to-gs-purple/5 border-b flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fas fa-comment-alt text-gs-purple"></i>
                <span class="text-sm font-semibold text-gs-navy">Live Chat</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 bg-gs-red rounded-full text-white text-xs flex items-center justify-center">3</span>
                <button class="text-gray-400 hover:text-gs-navy"><i class="fas fa-expand-alt text-xs"></i></button>
              </div>
            </div>
            <div class="p-3 h-36 overflow-y-auto space-y-3 bg-gray-50/50">
              <div class="flex gap-2">
                <div class="w-7 h-7 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user-md text-gs-gold text-xs"></i>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 mb-0.5">Dr. Müller • 10:01</p>
                  <div class="bg-white rounded-lg px-3 py-2 text-xs shadow-sm">
                    How are you feeling today?
                  </div>
                </div>
              </div>
              <div class="flex gap-2 justify-end">
                <div>
                  <p class="text-[10px] text-gray-500 mb-0.5 text-right">You • 10:01</p>
                  <div class="bg-gs-navy text-white rounded-lg px-3 py-2 text-xs shadow-sm">
                    Much better than last week, thank you!
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <div class="w-7 h-7 rounded-full bg-gs-gold/20 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user-md text-gs-gold text-xs"></i>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 mb-0.5">Dr. Müller • 10:02</p>
                  <div class="bg-white rounded-lg px-3 py-2 text-xs shadow-sm">
                    I see your vitals have improved as well. 📊
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3 border-t bg-white">
              <div class="flex gap-2">
                <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <i class="fas fa-paperclip text-xs"></i>
                </button>
                <input type="text" placeholder="Type a message..." class="flex-1 text-xs px-3 py-2 bg-gray-50 rounded-full border-0 focus:ring-2 focus:ring-gs-purple/50" />
                <button class="w-8 h-8 bg-gs-purple text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <i class="fas fa-paper-plane text-xs"></i>
                </button>
              </div>
            </div>
          </Card>
          
          {/* File Sharing Panel */}
          <Card className="p-0 overflow-hidden">
            <div class="p-3 bg-gradient-to-r from-gs-green/10 to-gs-green/5 border-b flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fas fa-folder-open text-gs-green"></i>
                <span class="text-sm font-semibold text-gs-navy">Shared Files</span>
              </div>
              <button class="text-xs text-gs-gold font-medium hover:text-gs-gold-dark">
                <i class="fas fa-plus mr-1"></i>Upload
              </button>
            </div>
            <div class="p-3 space-y-2 h-36 overflow-y-auto bg-gray-50/50">
              {[
                { name: 'Lab_Results_Oct.pdf', type: 'pdf', size: '2.3 MB', from: 'You' },
                { name: 'X-Ray_Knee.jpg', type: 'image', size: '4.1 MB', from: 'You' },
                { name: 'Prescription.pdf', type: 'pdf', size: '156 KB', from: 'Dr. Müller' }
              ].map((file) => (
                <div class="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div class={`w-8 h-8 rounded-lg flex items-center justify-center ${file.type === 'pdf' ? 'bg-gs-red/10' : 'bg-gs-blue/10'}`}>
                    <i class={`fas ${file.type === 'pdf' ? 'fa-file-pdf text-gs-red' : 'fa-file-image text-gs-blue'} text-sm`}></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium truncate">{file.name}</p>
                    <p class="text-[10px] text-gray-500">{file.size} • {file.from}</p>
                  </div>
                  <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="w-6 h-6 rounded bg-gs-blue/10 text-gs-blue flex items-center justify-center hover:bg-gs-blue/20">
                      <i class="fas fa-eye text-[10px]"></i>
                    </button>
                    <button class="w-6 h-6 rounded bg-gs-green/10 text-gs-green flex items-center justify-center hover:bg-gs-green/20">
                      <i class="fas fa-download text-[10px]"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div class="p-3 border-t bg-white">
              <label class="block w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gs-green hover:text-gs-green transition-colors cursor-pointer text-center">
                <i class="fas fa-cloud-upload-alt mr-2"></i>Drop files or click to upload
                <input type="file" class="hidden" multiple />
              </label>
            </div>
          </Card>
        </div>

        {/* ==================== E-PRESCRIPTIONS ==================== */}
        <Card className="p-0 overflow-hidden">
          <div class="p-4 bg-gradient-to-r from-gs-teal/10 to-gs-teal/5 border-b">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gs-teal/20 flex items-center justify-center">
                  <i class="fas fa-prescription text-gs-teal text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gs-navy">E-Prescriptions</h4>
                  <p class="text-xs text-gray-500">Digital prescriptions sent directly to your pharmacy</p>
                </div>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 bg-gs-green text-white text-xs rounded-full font-medium">3 Active</span>
              </div>
            </div>
          </div>
          
          <div class="p-4 space-y-3">
            {[
              { name: 'Metformin 500mg', dosage: 'Twice daily with meals', duration: '90 days', doctor: 'Dr. K. Müller', date: 'Oct 20', status: 'active', pharmacy: 'Apotheke am Markt', refills: 2 },
              { name: 'Lisinopril 10mg', dosage: 'Once daily in morning', duration: '30 days', doctor: 'Dr. K. Müller', date: 'Oct 20', status: 'active', pharmacy: 'Apotheke am Markt', refills: 1 },
              { name: 'Vitamin D3 1000IU', dosage: 'Once daily', duration: '60 days', doctor: 'Dr. A. Schmidt', date: 'Oct 15', status: 'completed', pharmacy: 'Online Pharmacy', refills: 0 }
            ].map((rx) => (
              <div class={`p-4 rounded-xl border-2 ${rx.status === 'active' ? 'bg-white border-gs-teal/20' : 'bg-gray-50 border-gray-100'}`}>
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class={`w-10 h-10 rounded-lg flex items-center justify-center ${rx.status === 'active' ? 'bg-gs-teal/10' : 'bg-gray-100'}`}>
                      <i class={`fas fa-pills ${rx.status === 'active' ? 'text-gs-teal' : 'text-gray-400'}`}></i>
                    </div>
                    <div>
                      <h5 class="font-semibold text-gs-navy">{rx.name}</h5>
                      <p class="text-xs text-gray-500">{rx.dosage}</p>
                    </div>
                  </div>
                  <span class={`px-2 py-1 text-xs rounded-full font-medium ${rx.status === 'active' ? 'bg-gs-green/10 text-gs-green' : 'bg-gray-100 text-gray-500'}`}>
                    {rx.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
                <div class="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <span class="text-gray-400 block">Duration</span>
                    <span class="font-medium">{rx.duration}</span>
                  </div>
                  <div>
                    <span class="text-gray-400 block">Prescribed</span>
                    <span class="font-medium">{rx.date}</span>
                  </div>
                  <div>
                    <span class="text-gray-400 block">Pharmacy</span>
                    <span class="font-medium truncate block">{rx.pharmacy}</span>
                  </div>
                  <div>
                    <span class="text-gray-400 block">Refills</span>
                    <span class="font-medium">{rx.refills} remaining</span>
                  </div>
                </div>
                {rx.status === 'active' && (
                  <div class="flex gap-2 mt-3">
                    <button class="flex-1 py-2 bg-gs-teal/10 text-gs-teal text-xs font-medium rounded-lg hover:bg-gs-teal/20">
                      <i class="fas fa-paper-plane mr-1"></i>Send to Pharmacy
                    </button>
                    <button class="flex-1 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200">
                      <i class="fas fa-download mr-1"></i>Download PDF
                    </button>
                    <button class="w-10 bg-gs-gold/10 text-gs-gold rounded-lg hover:bg-gs-gold/20">
                      <i class="fas fa-redo"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div class="p-4 border-t bg-gray-50">
            <button class="w-full py-3 bg-white border border-gs-teal text-gs-teal text-sm font-medium rounded-xl hover:bg-gs-teal/5 transition-colors">
              <i class="fas fa-history mr-2"></i>View Full Prescription History
            </button>
          </div>
        </Card>

        {/* ==================== MULTI-PARTY VIDEO CALL ==================== */}
        <Card className="p-5 border-2 border-gs-gold/30 bg-gradient-to-br from-gs-gold/5 to-white">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gs-gold/20 flex items-center justify-center">
                <i class="fas fa-users text-gs-gold text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-gs-navy">Multi-Party Video Call</h4>
                <p class="text-xs text-gray-500">Include family members, caregivers, or interpreters</p>
              </div>
            </div>
            <span class="text-xs bg-gs-gold/20 text-gs-gold px-3 py-1 rounded-full">Up to 4 guests</span>
          </div>
          
          <div class="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full bg-gs-navy flex items-center justify-center text-white text-sm font-medium border-2 border-white z-30">You</div>
              <div class="w-10 h-10 rounded-full bg-gs-gold flex items-center justify-center border-2 border-white z-20">
                <i class="fas fa-user-md text-gs-navy text-sm"></i>
              </div>
              <div class="w-10 h-10 rounded-full bg-gs-teal flex items-center justify-center text-white text-sm border-2 border-white z-10">
                <i class="fas fa-language text-sm"></i>
              </div>
              <button class="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 hover:border-gs-gold hover:text-gs-gold transition-colors">
                <i class="fas fa-plus text-sm"></i>
              </button>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gs-navy">Current participants: 3</p>
              <p class="text-xs text-gray-500">You, Dr. Müller, Interpreter</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <button class="py-3 bg-gs-gold text-gs-navy text-sm font-bold rounded-xl hover:bg-gs-gold-dark transition-colors flex items-center justify-center gap-2">
              <i class="fas fa-user-plus"></i>
              <span>Invite Family</span>
            </button>
            <button class="py-3 bg-gs-teal text-white text-sm font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2">
              <i class="fas fa-language"></i>
              <span>Add Interpreter</span>
            </button>
          </div>
        </Card>

        {/* ==================== REAL-TIME TRANSLATION ==================== */}
        <Card className="p-0 overflow-hidden">
          <div class="p-4 bg-gradient-to-r from-gs-blue/10 to-gs-purple/5 border-b">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gs-blue/20 to-gs-purple/20 flex items-center justify-center">
                  <i class="fas fa-language text-gs-blue text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gs-navy">Real-time Translation</h4>
                  <p class="text-xs text-gray-500">Live subtitles & voice translation</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gs-blue"></div>
              </label>
            </div>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-xs text-gray-500 mb-2 block">Doctor speaks</label>
                <select class="w-full text-sm px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gs-blue font-medium">
                  <option>🇩🇪 German</option>
                  <option>🇬🇧 English</option>
                  <option>🇫🇷 French</option>
                </select>
              </div>
              <div>
                <label class="text-xs text-gray-500 mb-2 block">Translate to</label>
                <select class="w-full text-sm px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gs-blue font-medium">
                  <option>🇬🇧 English</option>
                  <option>🇸🇦 Arabic</option>
                  <option>🇹🇷 Turkish</option>
                  <option>🇷🇺 Russian</option>
                  <option>🇫🇷 French</option>
                </select>
              </div>
            </div>
            
            {/* Live Caption Preview */}
            <div class="p-4 bg-gray-900 rounded-xl text-white">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-gs-green rounded-full animate-pulse"></div>
                <span class="text-xs text-gs-green">Live Captions Active</span>
              </div>
              <p class="text-sm">
                <span class="text-gs-gold">[Dr. Müller]:</span> "Your recovery progress is excellent. I recommend..."
              </p>
              <p class="text-xs text-gray-400 mt-2">
                <span class="text-gs-blue">[Translation]:</span> "تقدمك في التعافي ممتاز. أوصي..."
              </p>
            </div>
            
            <div class="flex gap-2 mt-4">
              <button class="flex-1 py-2 bg-gs-blue/10 text-gs-blue text-xs font-medium rounded-lg flex items-center justify-center gap-2">
                <i class="fas fa-closed-captioning"></i>Show Captions
              </button>
              <button class="flex-1 py-2 bg-gs-purple/10 text-gs-purple text-xs font-medium rounded-lg flex items-center justify-center gap-2">
                <i class="fas fa-volume-up"></i>Voice Translation
              </button>
            </div>
          </div>
        </Card>

        {/* ==================== UPCOMING SESSIONS ==================== */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gs-navy text-lg">Upcoming Sessions</h3>
            <a href="/patient/booking" class="text-sm text-gs-gold font-medium hover:text-gs-gold-dark flex items-center gap-1">
              <i class="fas fa-plus"></i>Schedule New
            </a>
          </div>
          
          <div class="space-y-4">
            {[
              { doctor: 'Dr. K. Müller', specialty: 'Cardiologist', date: 'Oct 22, 2024', time: '10:00 AM', type: 'Follow-up', duration: '15 min', status: 'confirmed', color: 'gs-teal' },
              { doctor: 'Dr. A. Schmidt', specialty: 'Nutritionist', date: 'Nov 5, 2024', time: '2:00 PM', type: 'Diet Review', duration: '30 min', status: 'pending', color: 'gs-gold' },
              { doctor: 'Dr. L. Weber', specialty: 'Orthopedic', date: 'Nov 12, 2024', time: '11:00 AM', type: '6-Week Check', duration: '30 min', status: 'confirmed', color: 'gs-blue' }
            ].map((apt) => (
              <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
                <div class={`h-1 bg-${apt.color}`}></div>
                <div class="p-4">
                  <div class="flex items-start gap-4">
                    <div class={`w-14 h-14 rounded-xl bg-${apt.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <i class={`fas fa-user-md text-${apt.color} text-xl`}></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <h4 class="font-bold text-gs-navy">{apt.doctor}</h4>
                        <span class={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'confirmed' ? 'bg-gs-green/10 text-gs-green' : 'bg-yellow-100 text-yellow-600'}`}>
                          {apt.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                        </span>
                      </div>
                      <p class={`text-sm text-${apt.color}`}>{apt.specialty}</p>
                      <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span><i class="far fa-calendar mr-1"></i>{apt.date}</span>
                        <span><i class="far fa-clock mr-1"></i>{apt.time}</span>
                        <span><i class="fas fa-hourglass-half mr-1"></i>{apt.duration}</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class={`inline-block px-3 py-1 bg-${apt.color}/10 text-${apt.color} text-xs rounded-full mb-2`}>
                        {apt.type}
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <button class={`flex-1 py-3 bg-${apt.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                      <i class="fas fa-video"></i>Join Session
                    </button>
                    <button class="flex-1 py-3 bg-gray-100 text-gs-navy font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <i class="fas fa-calendar-alt"></i>Reschedule
                    </button>
                    <button class="w-12 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ==================== SESSION HISTORY ==================== */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gs-navy text-lg">Meeting History</h3>
            <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Last 30 days</span>
          </div>
          <div class="space-y-4">
            {[
              { doctor: 'Dr. L. Weber', specialty: 'Orthopedic Surgeon', date: 'Oct 19, 2024', time: '09:15 AM', duration: '25 min', summary: 'Post-surgery follow-up. Progress excellent. Continue current exercise regimen. Next milestone: Advanced strengthening.', prescription: true, files: ['Visit_Summary.pdf', 'Exercise_Plan.pdf'] },
              { doctor: 'M. Hassan', specialty: 'Physiotherapist', date: 'Oct 15, 2024', time: '02:30 PM', duration: '30 min', summary: 'Physiotherapy assessment completed. New exercise plan provided focusing on mobility and flexibility. Recommended weekly sessions for 4 weeks.', prescription: false, files: ['PT_Assessment.pdf'] }
            ].map((session) => (
              <Card className="p-0 overflow-hidden">
                <div class="p-4">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-user-md text-gray-400 text-lg"></i>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <div>
                          <h4 class="font-bold text-gs-navy">{session.doctor}</h4>
                          <p class="text-xs text-gs-gold">{session.specialty}</p>
                        </div>
                        <div class="text-right">
                          <p class="text-sm font-medium text-gs-navy">{session.date}</p>
                          <p class="text-xs text-gray-500">{session.time} • {session.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Summary */}
                  <div class="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl mb-4">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="fas fa-clipboard text-gs-navy"></i>
                      <span class="text-xs font-semibold text-gs-navy">Session Summary</span>
                    </div>
                    <p class="text-sm text-gray-700">{session.summary}</p>
                  </div>
                  
                  {/* Attachments */}
                  {session.files.length > 0 && (
                    <div class="flex flex-wrap gap-2 mb-4">
                      {session.files.map((file) => (
                        <span class="inline-flex items-center gap-1 px-3 py-1 bg-gs-blue/10 text-gs-blue text-xs rounded-full">
                          <i class="fas fa-file-pdf"></i>{file}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div class="flex gap-2">
                    <button class="flex-1 py-2 bg-gs-navy text-white text-sm font-medium rounded-lg hover:bg-gs-navy-light transition-colors">
                      <i class="fas fa-file-alt mr-2"></i>Full Notes
                    </button>
                    <button class="flex-1 py-2 bg-gray-100 text-gs-navy text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      <i class="fas fa-download mr-2"></i>PDF Summary
                    </button>
                    {session.prescription && (
                      <button class="w-10 h-10 bg-gs-teal/10 text-gs-teal rounded-lg hover:bg-gs-teal/20 transition-colors flex items-center justify-center" title="View Prescriptions">
                        <i class="fas fa-prescription"></i>
                      </button>
                    )}
                    <button class="w-10 h-10 bg-gs-gold/10 text-gs-gold rounded-lg hover:bg-gs-gold/20 transition-colors flex items-center justify-center" title="Book Follow-up">
                      <i class="fas fa-redo"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ==================== DEVICE CHECK & SETUP ==================== */}
        <Card className="p-0 overflow-hidden">
          <div class="p-4 bg-gradient-to-r from-gs-navy/10 to-gs-navy/5 border-b">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gs-navy/10 flex items-center justify-center">
                  <i class="fas fa-cog text-gs-navy text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gs-navy">Device Check</h4>
                  <p class="text-xs text-gray-500">Ensure your setup is ready for the best experience</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-gs-green/10 text-gs-green text-xs rounded-full">
                <i class="fas fa-check-circle mr-1"></i>All Good
              </span>
            </div>
          </div>
          
          <div class="p-4 space-y-3">
            {[
              { name: 'Camera', icon: 'fa-video', status: 'working', details: 'FaceTime HD Camera (1080p)' },
              { name: 'Microphone', icon: 'fa-microphone', status: 'working', details: 'MacBook Pro Microphone' },
              { name: 'Speaker', icon: 'fa-volume-up', status: 'working', details: 'MacBook Pro Speakers' },
              { name: 'Internet', icon: 'fa-wifi', status: 'excellent', details: '45 Mbps • 12ms latency' },
              { name: 'Browser', icon: 'fa-chrome', status: 'supported', details: 'Chrome 120 • WebRTC enabled' }
            ].map((device) => (
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <i class={`fas ${device.icon} text-gs-green`}></i>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gs-navy">{device.name}</span>
                    <p class="text-xs text-gray-500">{device.details}</p>
                  </div>
                </div>
                <span class="text-xs bg-gs-green/10 text-gs-green px-3 py-1 rounded-full font-medium">
                  <i class="fas fa-check mr-1"></i>{device.status === 'excellent' ? 'Excellent' : device.status === 'supported' ? 'Supported' : 'Working'}
                </span>
              </div>
            ))}
          </div>
          
          <div class="p-4 border-t bg-gray-50 flex gap-3">
            <button class="flex-1 py-3 bg-gs-navy text-white text-sm font-medium rounded-xl hover:bg-gs-navy-light transition-colors">
              <i class="fas fa-sync-alt mr-2"></i>Run Full Test
            </button>
            <button class="flex-1 py-3 bg-white border border-gs-navy/20 text-gs-navy text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors">
              <i class="fas fa-cog mr-2"></i>Settings
            </button>
          </div>
        </Card>

        {/* ==================== 24/7 SUPPORT ==================== */}
        <Card className="p-5 bg-gradient-to-r from-gs-blue/5 via-gs-purple/5 to-gs-blue/5 border-2 border-gs-blue/20">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-gs-blue to-gs-purple flex items-center justify-center shadow-lg">
              <i class="fas fa-headset text-white text-2xl"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gs-navy text-lg">24/7 Technical Support</h4>
              <p class="text-sm text-gray-500">Available in German, English, Arabic & Turkish</p>
              <div class="flex gap-2 mt-2">
                <span class="text-xs bg-white/80 px-2 py-1 rounded">🇩🇪 DE</span>
                <span class="text-xs bg-white/80 px-2 py-1 rounded">🇬🇧 EN</span>
                <span class="text-xs bg-white/80 px-2 py-1 rounded">🇸🇦 AR</span>
                <span class="text-xs bg-white/80 px-2 py-1 rounded">🇹🇷 TR</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <button class="px-6 py-3 bg-gs-blue text-white font-medium rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
                <i class="fas fa-phone"></i>Call Now
              </button>
              <button class="px-6 py-2 bg-white text-gs-blue font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gs-blue/20">
                <i class="fas fa-comment"></i>Live Chat
              </button>
            </div>
          </div>
        </Card>

        {/* Bottom spacing for nav */}
        <div class="h-20"></div>
      </main>

      {/* JavaScript for telemedicine interactions */}
      <script dangerouslySetInnerHTML={{__html: `
        function startVideoCall() {
          // Show loading state
          const btn = event.target.closest('button');
          const originalContent = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connecting...';
          btn.disabled = true;
          
          // Simulate API call
          fetch('/api/telemedicine/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: 1 })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              window.showToast('Connecting to video call...', 'success');
              // In production, this would open the video call interface
              setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                window.showToast('Video call room ready!', 'success');
              }, 2000);
            }
          })
          .catch(err => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            window.showToast('Connection failed. Please try again.', 'error');
          });
        }
      `}} />
    </PageWrapper>
  )
}
