import { Context } from 'hono'

export const loginPage = (c: Context) => {
  const isRegister = c.req.query('register') === '1'
  
  return c.render(
    <div class="min-h-screen bg-navy-900 flex">
      {/* Left Side - Branding */}
      <div class="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 bg-mesh-gold opacity-30"></div>
        <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <div class="mb-12">
            <a href="/" class="flex items-center gap-3">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-brand">
                <span class="text-2xl font-bold text-navy-900">S</span>
              </div>
              <div>
                <div class="text-2xl font-semibold text-white">SelectCare</div>
                <div class="text-brand-400 text-sm font-medium tracking-wider uppercase">Operating System</div>
              </div>
            </a>
          </div>
          
          {/* Headline */}
          <h1 class="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            German Medical<br/>
            <span class="text-gradient-gold">Excellence</span>,<br/>
            Red Sea Recovery
          </h1>
          <p class="text-lg text-slate-400 mb-10 max-w-md">
            Your digital healthcare companion. Connect with world-class surgeons and track your recovery journey.
          </p>
          
          {/* Features */}
          <div class="space-y-4">
            {[
              { icon: 'fa-shield-check', text: 'HIPAA & GDPR Compliant' },
              { icon: 'fa-video', text: '24/7 Telemedicine Support' },
              { icon: 'fa-chart-line', text: 'AI-Powered Health Insights' },
            ].map((item) => (
              <div class="flex items-center gap-3 text-slate-300">
                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <i class={`fas ${item.icon} text-brand-400`}></i>
                </div>
                <span class="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div class="mt-12 pt-8 border-t border-white/10">
            <blockquote class="text-slate-400 italic mb-4">
              "SelectCare made my surgery journey seamless. From consultation to recovery, everything was in one app."
            </blockquote>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                <span class="text-brand-400 font-semibold">M</span>
              </div>
              <div>
                <p class="text-white font-medium text-sm">Maria S.</p>
                <p class="text-slate-500 text-xs">Gastric Sleeve Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div class="flex-1 flex items-center justify-center p-6 lg:p-12 bg-slate-50">
        <div class="w-full max-w-md">
          {/* Mobile Logo */}
          <div class="lg:hidden text-center mb-8">
            <a href="/" class="inline-flex items-center gap-2">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-brand">
                <span class="text-xl font-bold text-navy-900">S</span>
              </div>
              <div class="text-left">
                <div class="text-xl font-semibold text-navy-900">SelectCare</div>
                <div class="text-brand-600 text-xs font-medium tracking-wider uppercase">Operating System</div>
              </div>
            </a>
          </div>
          
          {/* Auth Card */}
          <div class="bg-white rounded-3xl shadow-soft-xl p-8">
            {/* Header */}
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-navy-900 mb-2">
                {isRegister ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p class="text-slate-500">
                {isRegister ? 'Start your healthcare journey today' : 'Sign in to continue your journey'}
              </p>
            </div>
            
            {/* Tabs */}
            <div class="flex mb-8 bg-slate-100 rounded-xl p-1">
              <a 
                href="/login" 
                class={`flex-1 py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${!isRegister ? 'bg-white text-navy-900 shadow-soft' : 'text-slate-500 hover:text-navy-900'}`}
              >
                Sign In
              </a>
              <a 
                href="/login?register=1" 
                class={`flex-1 py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${isRegister ? 'bg-white text-navy-900 shadow-soft' : 'text-slate-500 hover:text-navy-900'}`}
              >
                Create Account
              </a>
            </div>
            
            <form id="authForm" class="space-y-5">
              {isRegister && (
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-navy-900 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-navy-900 placeholder-slate-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-navy-900 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-navy-900 placeholder-slate-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label class="block text-sm font-semibold text-navy-900 mb-2">Email Address</label>
                <div class="relative">
                  <input 
                    type="email" 
                    name="email"
                    class="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-navy-900 placeholder-slate-400"
                    placeholder="john@example.com"
                  />
                  <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-navy-900 mb-2">Password</label>
                <div class="relative">
                  <input 
                    type="password" 
                    name="password"
                    id="passwordInput"
                    class="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-navy-900 placeholder-slate-400 pr-12"
                    placeholder="••••••••"
                  />
                  <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <button 
                    type="button" 
                    onclick="togglePassword()"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 transition-colors"
                  >
                    <i class="fas fa-eye" id="passwordToggleIcon"></i>
                  </button>
                </div>
              </div>
              
              {isRegister && (
                <>
                  <div>
                    <label class="block text-sm font-semibold text-navy-900 mb-2">Phone Number</label>
                    <div class="relative">
                      <input 
                        type="tel" 
                        name="phone"
                        class="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-navy-900 placeholder-slate-400"
                        placeholder="+49 123 456 7890"
                      />
                      <i class="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-navy-900 mb-2">I am a</label>
                    <div class="grid grid-cols-2 gap-3">
                      <label class="flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-brand-400 transition-all peer-checked:border-brand-500 peer-checked:bg-brand-50 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
                        <input type="radio" name="userType" value="patient" class="sr-only peer" checked />
                        <div class="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                          <i class="fas fa-user text-brand-600"></i>
                        </div>
                        <span class="font-semibold text-navy-900">Patient</span>
                      </label>
                      <label class="flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-brand-400 transition-all has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
                        <input type="radio" name="userType" value="doctor" class="sr-only peer" />
                        <div class="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                          <i class="fas fa-user-doctor text-teal-600"></i>
                        </div>
                        <span class="font-semibold text-navy-900">Doctor</span>
                      </label>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <input type="checkbox" id="terms" class="mt-1 w-5 h-5 text-brand-500 focus:ring-brand-500 rounded-md border-slate-300" />
                    <label for="terms" class="text-sm text-slate-600 leading-tight">
                      I agree to the <a href="#" class="text-brand-600 font-semibold hover:underline">Terms of Service</a> and <a href="#" class="text-brand-600 font-semibold hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </>
              )}
              
              {!isRegister && (
                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="w-5 h-5 text-brand-500 focus:ring-brand-500 rounded-md border-slate-300" />
                    <span class="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" class="text-sm text-brand-600 font-semibold hover:underline">Forgot password?</a>
                </div>
              )}
              
              <button 
                type="submit"
                onclick="handleAuth(event)"
                class="w-full py-3.5 bg-gradient-to-r from-navy-900 to-navy-800 text-white font-semibold rounded-xl hover:from-navy-800 hover:to-navy-700 transition-all shadow-soft-lg flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {isRegister ? (
                  <>
                    <span>Create Account</span>
                    <i class="fas fa-arrow-right"></i>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i class="fas fa-sign-in-alt"></i>
                  </>
                )}
              </button>
            </form>
            
            {/* Social Login */}
            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-4 text-slate-400 font-medium">Or continue with</span>
                </div>
              </div>
              
              <div class="grid grid-cols-3 gap-3 mt-6">
                <button class="py-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                  <i class="fab fa-google text-lg" style="color: #EA4335;"></i>
                </button>
                <button class="py-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                  <i class="fab fa-apple text-lg text-gray-800"></i>
                </button>
                <button class="py-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                  <i class="fab fa-facebook-f text-lg" style="color: #1877F2;"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Demo Quick Access */}
          <div class="mt-8 text-center">
            <p class="text-slate-500 text-sm mb-4">Quick Demo Access</p>
            <div class="flex justify-center gap-3">
              <a href="/patient" class="px-5 py-2.5 bg-gradient-to-r from-brand-400 to-brand-600 text-navy-900 text-sm font-semibold rounded-xl hover:shadow-glow-brand transition-all active:scale-95">
                <i class="fas fa-user mr-2"></i>Patient Demo
              </a>
              <a href="/doctor" class="px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all active:scale-95">
                <i class="fas fa-user-doctor mr-2"></i>Doctor Demo
              </a>
            </div>
          </div>
          
          {/* Back Link */}
          <div class="mt-6 text-center">
            <a href="/" class="text-slate-500 text-sm hover:text-navy-900 transition-colors inline-flex items-center gap-2">
              <i class="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          function togglePassword() {
            const input = document.getElementById('passwordInput');
            const icon = document.getElementById('passwordToggleIcon');
            if (input.type === 'password') {
              input.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
            } else {
              input.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
            }
          }
          
          function handleAuth(e) {
            e.preventDefault();
            // Demo: redirect to patient dashboard
            window.location.href = '/patient';
          }
        `
      }} />
    </div>
  )
}
