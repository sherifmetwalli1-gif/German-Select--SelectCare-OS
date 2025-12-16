import { Context } from 'hono'

export const loginPage = (c: Context) => {
  const isRegister = c.req.query('register') === '1'
  
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-gs-navy via-gs-navy-light to-gs-navy flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        {/* Logo */}
        <div class="text-center mb-8">
          <a href="/" class="inline-flex items-center gap-2 text-white">
            <div class="w-12 h-12 bg-gs-gold rounded-full flex items-center justify-center">
              <i class="fas fa-heartbeat text-gs-navy text-xl"></i>
            </div>
            <span class="text-2xl font-bold tracking-wide">SelectCareOS<sup class="text-xs">™</sup></span>
          </a>
          <p class="text-white/60 mt-2">German Medical Excellence</p>
        </div>
        
        {/* Auth Card */}
        <div class="bg-white rounded-2xl shadow-gs-lg p-8">
          {/* Tabs */}
          <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
            <a 
              href="/login" 
              class={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-colors ${!isRegister ? 'bg-white text-gs-navy shadow-sm' : 'text-gray-500 hover:text-gs-navy'}`}
            >
              Sign In
            </a>
            <a 
              href="/login?register=1" 
              class={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-colors ${isRegister ? 'bg-white text-gs-navy shadow-sm' : 'text-gray-500 hover:text-gs-navy'}`}
            >
              Create Account
            </a>
          </div>
          
          <form id="authForm" class="space-y-4">
            {isRegister && (
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gs-gold focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gs-gold focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gs-gold focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input 
                  type="password" 
                  name="password"
                  id="passwordInput"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gs-gold focus:border-transparent outline-none transition-all pr-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onclick="togglePassword()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i class="fas fa-eye" id="passwordToggleIcon"></i>
                </button>
              </div>
            </div>
            
            {isRegister && (
              <>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gs-gold focus:border-transparent outline-none transition-all"
                    placeholder="+49 123 456 7890"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                  <div class="grid grid-cols-2 gap-3">
                    <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gs-gold transition-colors">
                      <input type="radio" name="userType" value="patient" class="text-gs-gold focus:ring-gs-gold" checked />
                      <div>
                        <i class="fas fa-user text-gs-gold mr-2"></i>
                        <span class="text-sm font-medium">Patient</span>
                      </div>
                    </label>
                    <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gs-gold transition-colors">
                      <input type="radio" name="userType" value="doctor" class="text-gs-gold focus:ring-gs-gold" />
                      <div>
                        <i class="fas fa-user-md text-gs-gold mr-2"></i>
                        <span class="text-sm font-medium">Doctor</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div class="flex items-start gap-2">
                  <input type="checkbox" id="terms" class="mt-1 text-gs-gold focus:ring-gs-gold rounded" />
                  <label for="terms" class="text-sm text-gray-600">
                    I agree to the <a href="#" class="text-gs-gold hover:underline">Terms of Service</a> and <a href="#" class="text-gs-gold hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </>
            )}
            
            {!isRegister && (
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2">
                  <input type="checkbox" class="text-gs-gold focus:ring-gs-gold rounded" />
                  <span class="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" class="text-sm text-gs-gold hover:underline">Forgot password?</a>
              </div>
            )}
            
            <button 
              type="submit"
              onclick="handleAuth(event)"
              class="w-full py-3 bg-gs-navy text-white font-semibold rounded-lg hover:bg-gs-navy-light transition-colors flex items-center justify-center gap-2"
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
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-4 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-3 mt-4">
              <button class="py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <i class="fab fa-google text-red-500"></i>
              </button>
              <button class="py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <i class="fab fa-apple text-gray-800"></i>
              </button>
              <button class="py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <i class="fab fa-facebook-f text-blue-600"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Demo Login Links */}
        <div class="mt-6 text-center">
          <p class="text-white/60 text-sm mb-3">Quick Demo Access:</p>
          <div class="flex justify-center gap-4">
            <a href="/patient" class="px-4 py-2 bg-gs-gold text-gs-navy text-sm font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
              <i class="fas fa-user mr-2"></i>Patient Demo
            </a>
            <a href="/doctor" class="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
              <i class="fas fa-user-md mr-2"></i>Doctor Demo
            </a>
          </div>
        </div>
        
        {/* Back to home */}
        <div class="mt-6 text-center">
          <a href="/" class="text-white/60 text-sm hover:text-white transition-colors">
            <i class="fas fa-arrow-left mr-2"></i>Back to Home
          </a>
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
