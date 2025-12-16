// SelectCareOS Frontend Application

// API Base URL
const API_BASE = '/api';

// State management
const state = {
  user: null,
  vitals: [],
  appointments: [],
  messages: [],
  notifications: []
};

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// API Helper
async function api(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}

// Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-slideIn ${
    type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
    type === 'warning' ? 'bg-yellow-500 text-white' :
    'bg-gs-navy text-white'
  }`;
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fas ${
        type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
        type === 'warning' ? 'fa-exclamation-triangle' :
        'fa-info-circle'
      }"></i>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Modal helper
function showModal(content, options = {}) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-auto animate-scaleIn">
      ${options.title ? `
        <div class="p-4 border-b flex items-center justify-between">
          <h3 class="font-bold text-gs-navy">${options.title}</h3>
          <button onclick="this.closest('.fixed').remove()" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <i class="fas fa-times text-gray-500"></i>
          </button>
        </div>
      ` : ''}
      <div class="p-4">
        ${content}
      </div>
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  
  document.body.appendChild(modal);
  return modal;
}

// Loading state
function setLoading(element, loading = true) {
  if (loading) {
    element.classList.add('opacity-50', 'pointer-events-none');
    element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + element.innerHTML;
  } else {
    element.classList.remove('opacity-50', 'pointer-events-none');
    element.innerHTML = element.innerHTML.replace(/<i class="fas fa-spinner fa-spin mr-2"><\/i>/g, '');
  }
}

// Format date/time
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatTime(dateString) {
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return new Date(dateString).toLocaleTimeString('en-US', options);
}

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

// Vitals Chart (if Chart.js is loaded)
function initVitalsChart(canvasId, data) {
  if (typeof Chart === 'undefined') return;
  
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: data.label,
        data: data.values,
        borderColor: '#C9A962',
        backgroundColor: 'rgba(201, 169, 98, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: false },
        x: { display: true }
      }
    }
  });
}

// Health score animation
function animateScore(element, targetScore) {
  let current = 0;
  const duration = 1000;
  const start = performance.now();
  
  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    
    current = Math.floor(progress * targetScore);
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Form validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('border-red-500');
      input.classList.remove('border-gray-200');
    } else {
      input.classList.remove('border-red-500');
      input.classList.add('border-gray-200');
    }
  });
  
  return isValid;
}

// Booking functions
async function bookAppointment(doctorId, date, time, type) {
  const result = await api('/appointments', {
    method: 'POST',
    body: JSON.stringify({
      doctorId,
      date,
      time,
      type,
      patientId: '1' // Demo patient
    })
  });
  
  if (result.success) {
    showToast('Appointment booked successfully!', 'success');
    return result.data;
  } else {
    showToast('Failed to book appointment', 'error');
    return null;
  }
}

// Risk calculator
async function calculateRisk(type, params) {
  const result = await api('/risk-calculator', {
    method: 'POST',
    body: JSON.stringify({
      calculatorType: type,
      ...params
    })
  });
  
  return result.success ? result.data : null;
}

// BMI Calculator
function calculateBMI(weight, height) {
  const bmi = weight / Math.pow(height / 100, 2);
  let category = 'Normal';
  let color = 'gs-green';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'gs-blue';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'gs-gold';
  } else if (bmi >= 30) {
    category = 'Obese';
    color = 'gs-red';
  }
  
  return { value: bmi.toFixed(1), category, color };
}

// AI Chat helper
async function sendAIMessage(message) {
  const result = await api('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
  
  return result.success ? result.data : null;
}

// Package builder
async function buildPackage(procedureId, accommodationId, excursionIds, nights) {
  const result = await api('/packages/build', {
    method: 'POST',
    body: JSON.stringify({
      procedureId,
      accommodationId,
      excursionIds,
      nights
    })
  });
  
  return result.success ? result.data : null;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('SelectCareOS initialized');
  
  // Add smooth scroll to all anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Initialize any score animations
  $$('[data-animate-score]').forEach(el => {
    const target = parseInt(el.dataset.animateScore);
    animateScore(el, target);
  });
  
  // Form submissions
  $$('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
        showToast('Please fill in all required fields', 'warning');
      }
    });
  });
  
  // Initialize tooltips (if any)
  $$('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute bg-gs-navy text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50';
      tooltip.textContent = el.dataset.tooltip;
      el.appendChild(tooltip);
    });
    el.addEventListener('mouseleave', () => {
      el.querySelector('.absolute')?.remove();
    });
  });
});

// Service Worker registration (for PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker would be registered here for offline support
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Export for global use
window.SelectCareOS = {
  api,
  showToast,
  showModal,
  formatDate,
  formatTime,
  timeAgo,
  calculateBMI,
  bookAppointment,
  calculateRisk,
  sendAIMessage,
  buildPackage
};
