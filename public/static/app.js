// SelectCareOS Frontend Application

// API Base URL
const API_BASE = '/api';

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.background = type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#1A2E4A';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// API helper
async function api(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    showToast('Something went wrong. Please try again.', 'error');
    throw error;
  }
}

// Load vitals data
async function loadVitals() {
  const data = await api('/vitals');
  return data.vitals;
}

// Load appointments
async function loadAppointments() {
  const data = await api('/appointments');
  return data;
}

// Load care team
async function loadCareTeam() {
  const data = await api('/care-team');
  return data;
}

// Load timeline
async function loadTimeline() {
  const data = await api('/timeline');
  return data;
}

// Load marketplace packages
async function loadMarketplacePackages() {
  const data = await api('/marketplace/packages');
  return data.packages;
}

// Load wellness data
async function loadWellnessData() {
  const data = await api('/wellness/goals');
  return data;
}

// Book appointment
async function bookAppointment(appointmentData) {
  const data = await api('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData)
  });
  showToast('Appointment booked successfully!', 'success');
  return data;
}

// Send message
async function sendMessage(conversationId, message) {
  const data = await api('/messages', {
    method: 'POST',
    body: JSON.stringify({ conversationId, message })
  });
  return data;
}

// AI Chat
async function sendAIMessage(message) {
  const data = await api('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
  return data;
}

// Mark goal complete
function markGoalComplete(goalId) {
  showToast('Goal marked as complete!', 'success');
  const goalElement = document.querySelector(`[data-goal-id="${goalId}"]`);
  if (goalElement) {
    goalElement.classList.add('line-through', 'text-gray-400');
  }
}

// Toggle password visibility
function togglePassword() {
  const input = document.getElementById('passwordInput');
  const icon = document.getElementById('passwordToggleIcon');
  if (input && icon) {
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
}

// Handle authentication
function handleAuth(e) {
  e.preventDefault();
  // Demo: redirect to patient dashboard
  window.location.href = '/patient';
}

// Initialize charts (placeholder)
function initCharts() {
  // Heart rate chart
  const heartRateChart = document.getElementById('heartRateChart');
  if (heartRateChart) {
    // Chart would be initialized here with Chart.js
    console.log('Heart rate chart initialized');
  }
}

// Handle form submissions
document.addEventListener('submit', (e) => {
  const form = e.target;
  
  if (form.id === 'authForm') {
    handleAuth(e);
  }
  
  if (form.id === 'bookingForm') {
    e.preventDefault();
    const formData = new FormData(form);
    bookAppointment(Object.fromEntries(formData));
  }
  
  if (form.id === 'messageForm') {
    e.preventDefault();
    const input = form.querySelector('input[type="text"]');
    if (input && input.value.trim()) {
      sendMessage('current', input.value);
      input.value = '';
    }
  }
});

// Handle click events
document.addEventListener('click', (e) => {
  // Handle goal completion
  if (e.target.closest('[data-action="complete-goal"]')) {
    const goalId = e.target.closest('[data-action="complete-goal"]').dataset.goalId;
    markGoalComplete(goalId);
  }
  
  // Handle quick actions
  if (e.target.closest('[data-action="quick-log"]')) {
    const type = e.target.closest('[data-action="quick-log"]').dataset.type;
    showToast(`Opening ${type} logger...`, 'info');
  }
});

// Service Worker registration (for PWA support)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker would be registered here for offline support
    console.log('PWA ready');
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('SelectCareOS initialized');
  
  // Initialize charts if on RPM page
  initCharts();
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add loading states to buttons
  document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
      if (!this.disabled) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
    });
  });
});

// Wearable device integration helpers
const WearableIntegration = {
  // Apple HealthKit
  async connectAppleHealth() {
    showToast('Connecting to Apple Health...', 'info');
    // Integration would happen here
    return { connected: true, provider: 'apple_health' };
  },
  
  // Google Health Connect
  async connectGoogleHealth() {
    showToast('Connecting to Google Health Connect...', 'info');
    return { connected: true, provider: 'google_health_connect' };
  },
  
  // Fitbit
  async connectFitbit() {
    showToast('Connecting to Fitbit...', 'info');
    return { connected: true, provider: 'fitbit' };
  },
  
  // Garmin
  async connectGarmin() {
    showToast('Connecting to Garmin...', 'info');
    return { connected: true, provider: 'garmin' };
  },
  
  // Oura
  async connectOura() {
    showToast('Connecting to Oura Ring...', 'info');
    return { connected: true, provider: 'oura' };
  },
  
  // Withings
  async connectWithings() {
    showToast('Connecting to Withings...', 'info');
    return { connected: true, provider: 'withings' };
  },
  
  // Sync all connected devices
  async syncAll() {
    showToast('Syncing all devices...', 'info');
    return { synced: true, timestamp: new Date().toISOString() };
  }
};

// Risk Calculator helpers
const RiskCalculators = {
  // BMI Calculator
  calculateBMI(weight, height) {
    const bmi = weight / Math.pow(height / 100, 2);
    let status = 'Normal';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi >= 25 && bmi < 30) status = 'Overweight';
    else if (bmi >= 30) status = 'Obese';
    return { value: bmi.toFixed(1), status };
  },
  
  // ASCVD Risk (simplified)
  calculateASCVD(age, systolic, cholesterol, hdl, smoker, diabetic) {
    // Simplified calculation - real implementation would use Pooled Cohort Equations
    let risk = 0;
    risk += (age - 40) * 0.5;
    risk += (systolic - 120) * 0.1;
    risk += (cholesterol - 200) * 0.05;
    risk -= (hdl - 50) * 0.1;
    if (smoker) risk += 5;
    if (diabetic) risk += 3;
    return Math.max(0, Math.min(100, risk)).toFixed(1);
  },
  
  // Diabetes Risk (ADA)
  calculateDiabetesRisk(age, bmi, familyHistory, hypertension, physicallyActive) {
    let score = 0;
    if (age >= 40 && age < 50) score += 1;
    else if (age >= 50 && age < 60) score += 2;
    else if (age >= 60) score += 3;
    
    if (bmi >= 25 && bmi < 30) score += 1;
    else if (bmi >= 30 && bmi < 40) score += 2;
    else if (bmi >= 40) score += 3;
    
    if (familyHistory) score += 1;
    if (hypertension) score += 1;
    if (!physicallyActive) score += 1;
    
    return score;
  }
};

// Export for use in other modules
window.SelectCareOS = {
  api,
  showToast,
  WearableIntegration,
  RiskCalculators,
  loadVitals,
  loadAppointments,
  loadCareTeam,
  loadTimeline,
  loadMarketplacePackages,
  loadWellnessData,
  bookAppointment,
  sendMessage,
  sendAIMessage
};
