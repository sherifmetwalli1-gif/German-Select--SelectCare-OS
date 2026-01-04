/**
 * Booking Page
 * Consultation booking interface
 */

import { Context } from 'hono'

export function bookingPage(c: Context): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Consultation - German Select</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .german-gradient { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%); }
        .slot-available { cursor: pointer; transition: all 0.2s; }
        .slot-available:hover { background-color: #dbeafe; border-color: #3b82f6; }
        .slot-selected { background-color: #3b82f6 !important; color: white !important; border-color: #3b82f6 !important; }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E5E7EB;
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            color: #9CA3AF;
            font-size: 10px;
            text-decoration: none;
            transition: all 0.2s;
        }
        .nav-item:hover { color: #6B7280; }
        .nav-item.active { color: #3B82F6; }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        main { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="german-gradient text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/dashboard" class="flex items-center space-x-3">
                    <i class="fas fa-hospital text-2xl"></i>
                    <span class="text-xl font-bold">German Select</span>
                </a>
                <nav class="flex items-center space-x-6">
                    <a href="/doctors" class="hover:text-blue-200">Doctors</a>
                    <a href="/packages" class="hover:text-blue-200">Packages</a>
                    <a href="/dashboard" class="hover:text-blue-200">Dashboard</a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Progress Steps -->
            <div class="flex items-center justify-center mb-8">
                <div class="flex items-center">
                    <div class="step-circle active bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                    <span class="ml-2 text-blue-600 font-medium">Select Doctor</span>
                </div>
                <div class="w-16 h-1 bg-gray-300 mx-4"></div>
                <div class="flex items-center">
                    <div class="step-circle bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold" id="step2">2</div>
                    <span class="ml-2 text-gray-500" id="step2-text">Choose Time</span>
                </div>
                <div class="w-16 h-1 bg-gray-300 mx-4"></div>
                <div class="flex items-center">
                    <div class="step-circle bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold" id="step3">3</div>
                    <span class="ml-2 text-gray-500" id="step3-text">Payment</span>
                </div>
            </div>

            <!-- Step 1: Select Doctor -->
            <section id="section-doctor" class="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6">Select a Doctor</h2>
                
                <!-- Filter -->
                <div class="flex space-x-4 mb-6">
                    <select id="specialization-filter" class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Specializations</option>
                        <option value="Bariatric">Bariatric Surgery</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedic">Orthopedics</option>
                        <option value="Urology">Urology</option>
                    </select>
                    <select id="price-filter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Any Price</option>
                        <option value="150">Up to €150</option>
                        <option value="200">Up to €200</option>
                        <option value="300">Up to €300</option>
                    </select>
                </div>

                <!-- Doctor List -->
                <div id="doctor-list" class="space-y-4">
                    <!-- Loaded dynamically -->
                </div>
            </section>

            <!-- Step 2: Select Time (Hidden initially) -->
            <section id="section-time" class="bg-white rounded-xl shadow-sm p-6 mb-6 hidden">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-gray-800">Select Date & Time</h2>
                    <button onclick="goToStep(1)" class="text-blue-600 hover:underline">
                        <i class="fas fa-arrow-left mr-2"></i>Change Doctor
                    </button>
                </div>

                <!-- Selected Doctor Info -->
                <div id="selected-doctor-info" class="bg-blue-50 p-4 rounded-lg mb-6">
                    <!-- Populated dynamically -->
                </div>

                <!-- Calendar -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <button id="prev-week" class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 id="current-week" class="font-semibold text-gray-700"></h3>
                        <button id="next-week" class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div id="time-slots" class="grid grid-cols-7 gap-2">
                        <!-- Slots loaded dynamically -->
                    </div>
                </div>

                <div id="selected-slot-info" class="bg-green-50 p-4 rounded-lg mb-6 hidden">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                        <div>
                            <p class="font-semibold text-gray-800" id="slot-date-display"></p>
                            <p class="text-gray-600" id="slot-time-display"></p>
                        </div>
                    </div>
                </div>

                <button id="continue-to-payment" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    Continue to Payment
                </button>
            </section>

            <!-- Step 3: Payment (Hidden initially) -->
            <section id="section-payment" class="bg-white rounded-xl shadow-sm p-6 mb-6 hidden">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-gray-800">Complete Your Booking</h2>
                    <button onclick="goToStep(2)" class="text-blue-600 hover:underline">
                        <i class="fas fa-arrow-left mr-2"></i>Change Time
                    </button>
                </div>

                <!-- Booking Summary -->
                <div class="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 class="font-semibold text-gray-800 mb-4">Booking Summary</h3>
                    <div id="booking-summary" class="space-y-3">
                        <!-- Populated dynamically -->
                    </div>
                    <div class="border-t mt-4 pt-4">
                        <div class="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span id="total-price">€0</span>
                        </div>
                    </div>
                </div>

                <!-- Patient Information -->
                <div class="mb-6">
                    <h3 class="font-semibold text-gray-800 mb-4">Your Information</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" id="patient-name" placeholder="Full Name *" class="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                        <input type="email" id="patient-email" placeholder="Email Address *" class="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                        <input type="tel" id="patient-phone" placeholder="Phone Number" class="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        <select id="patient-country" class="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="DE">Germany</option>
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="AE">UAE</option>
                            <option value="CH">Switzerland</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <textarea id="patient-notes" placeholder="Notes for the doctor (symptoms, concerns, etc.)" class="w-full mt-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"></textarea>
                </div>

                <!-- Affiliate Code -->
                <div class="mb-6">
                    <label class="block text-sm text-gray-600 mb-2">Have a referral code?</label>
                    <input type="text" id="affiliate-code" placeholder="Enter code" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Payment Button -->
                <button id="complete-booking" class="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
                    <i class="fas fa-lock mr-2"></i>Complete Booking
                </button>

                <p class="text-center text-gray-500 text-sm mt-4">
                    <i class="fas fa-shield-alt mr-1"></i>
                    Secure payment powered by Stripe. Your data is encrypted.
                </p>
            </section>

            <!-- Confirmation (Hidden initially) -->
            <section id="section-confirmation" class="bg-white rounded-xl shadow-sm p-8 text-center hidden">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-green-600 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                <p class="text-gray-600 mb-6">Your consultation has been successfully booked.</p>
                
                <div id="confirmation-details" class="bg-gray-50 p-6 rounded-lg text-left mb-6">
                    <!-- Populated dynamically -->
                </div>

                <p class="text-gray-500 mb-6">A confirmation email has been sent to your email address.</p>

                <div class="flex space-x-4 justify-center">
                    <a href="/dashboard" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        View Dashboard
                    </a>
                    <button onclick="window.print()" class="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        <i class="fas fa-print mr-2"></i>Print Details
                    </button>
                </div>
            </section>
        </div>
    </main>

    <script>
        // State
        let doctors = [];
        let selectedDoctor = null;
        let selectedSlot = null;
        let currentWeekOffset = 0;

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadDoctors();
            setupEventListeners();
        });

        async function loadDoctors() {
            try {
                const response = await fetch('/api/doctors');
                const data = await response.json();
                if (data.success) {
                    doctors = data.data;
                    renderDoctors(doctors);
                }
            } catch (error) {
                console.error('Error loading doctors:', error);
            }
        }

        function renderDoctors(doctorsToShow) {
            const container = document.getElementById('doctor-list');
            container.innerHTML = doctorsToShow.map(doctor => \`
                <div class="doctor-card border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors" data-id="\${doctor.id}">
                    <div class="flex items-start justify-between">
                        <div class="flex items-start space-x-4">
                            <div class="bg-blue-100 p-4 rounded-full">
                                <i class="fas fa-user-md text-blue-600 text-2xl"></i>
                            </div>
                            <div>
                                <div class="flex items-center">
                                    <h3 class="font-semibold text-gray-800">\${doctor.name}</h3>
                                    \${doctor.isPremium ? '<span class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full"><i class="fas fa-crown mr-1"></i>Premium</span>' : ''}
                                </div>
                                <p class="text-gray-500 text-sm">\${doctor.specialization}</p>
                                <p class="text-gray-400 text-sm mt-1"><i class="fas fa-map-marker-alt mr-1"></i>\${doctor.location}</p>
                                <div class="flex items-center mt-2">
                                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                                    <span class="text-sm font-medium">\${doctor.rating}</span>
                                    <span class="text-gray-400 text-sm ml-1">(\${doctor.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-gray-800">€\${doctor.consultationFee}</p>
                            <p class="text-gray-500 text-sm">per consultation</p>
                            <button class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');

            // Add click handlers
            container.querySelectorAll('.doctor-card').forEach(card => {
                card.addEventListener('click', () => selectDoctor(card.dataset.id));
            });
        }

        function selectDoctor(doctorId) {
            selectedDoctor = doctors.find(d => d.id === doctorId);
            if (!selectedDoctor) return;

            // Update UI
            document.getElementById('selected-doctor-info').innerHTML = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-user-md text-blue-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800">\${selectedDoctor.name}</h4>
                            <p class="text-gray-500 text-sm">\${selectedDoctor.specialization}</p>
                        </div>
                    </div>
                    <p class="text-xl font-bold text-gray-800">€\${selectedDoctor.consultationFee}</p>
                </div>
            \`;

            goToStep(2);
            loadAvailability();
        }

        async function loadAvailability() {
            try {
                const response = await fetch(\`/api/doctors/\${selectedDoctor.id}/availability\`);
                const data = await response.json();
                if (data.success) {
                    renderTimeSlots(data.data.slots);
                }
            } catch (error) {
                console.error('Error loading availability:', error);
            }
        }

        function renderTimeSlots(slots) {
            // Group slots by date
            const slotsByDate = {};
            slots.forEach(slot => {
                if (!slotsByDate[slot.date]) slotsByDate[slot.date] = [];
                slotsByDate[slot.date].push(slot);
            });

            // Get next 7 days
            const dates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i + (currentWeekOffset * 7) + 1);
                dates.push(date.toISOString().split('T')[0]);
            }

            // Update week display
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[6]);
            document.getElementById('current-week').textContent = 
                \`\${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - \${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\`;

            const container = document.getElementById('time-slots');
            container.innerHTML = dates.map(date => {
                const dayDate = new Date(date);
                const daySlots = slotsByDate[date] || [];
                const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = dayDate.getDate();

                return \`
                    <div class="text-center">
                        <div class="text-gray-500 text-sm mb-2">\${dayName}</div>
                        <div class="font-semibold text-gray-700 mb-3">\${dayNum}</div>
                        <div class="space-y-2">
                            \${daySlots.length > 0 ? daySlots.map(slot => \`
                                <div class="slot-available border rounded py-2 px-3 text-sm" 
                                     data-slot-id="\${slot.id}" 
                                     data-date="\${slot.date}" 
                                     data-time="\${slot.startTime}">
                                    \${slot.startTime}
                                </div>
                            \`).join('') : '<div class="text-gray-400 text-sm">No slots</div>'}
                        </div>
                    </div>
                \`;
            }).join('');

            // Add click handlers
            container.querySelectorAll('.slot-available').forEach(slot => {
                slot.addEventListener('click', () => selectSlot(slot));
            });
        }

        function selectSlot(slotElement) {
            // Remove previous selection
            document.querySelectorAll('.slot-selected').forEach(el => el.classList.remove('slot-selected'));
            
            // Select new slot
            slotElement.classList.add('slot-selected');
            
            selectedSlot = {
                id: slotElement.dataset.slotId,
                date: slotElement.dataset.date,
                time: slotElement.dataset.time
            };

            // Update display
            const date = new Date(selectedSlot.date);
            document.getElementById('slot-date-display').textContent = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            document.getElementById('slot-time-display').textContent = \`\${selectedSlot.time} (30 minutes)\`;
            document.getElementById('selected-slot-info').classList.remove('hidden');
            document.getElementById('continue-to-payment').disabled = false;
        }

        function goToStep(step) {
            // Hide all sections
            document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
            
            // Update step indicators
            for (let i = 1; i <= 3; i++) {
                const circle = document.getElementById(\`step\${i}\`) || document.querySelector('.step-circle');
                const text = document.getElementById(\`step\${i}-text\`);
                if (i <= step) {
                    if (circle) {
                        circle.classList.remove('bg-gray-300', 'text-gray-600');
                        circle.classList.add('bg-blue-600', 'text-white');
                    }
                    if (text) text.classList.add('text-blue-600', 'font-medium');
                } else {
                    if (circle) {
                        circle.classList.add('bg-gray-300', 'text-gray-600');
                        circle.classList.remove('bg-blue-600', 'text-white');
                    }
                    if (text) text.classList.remove('text-blue-600', 'font-medium');
                }
            }

            // Show relevant section
            if (step === 1) {
                document.getElementById('section-doctor').classList.remove('hidden');
            } else if (step === 2) {
                document.getElementById('section-time').classList.remove('hidden');
            } else if (step === 3) {
                updateBookingSummary();
                document.getElementById('section-payment').classList.remove('hidden');
            }
        }

        function updateBookingSummary() {
            if (!selectedDoctor || !selectedSlot) return;

            const date = new Date(selectedSlot.date);
            document.getElementById('booking-summary').innerHTML = \`
                <div class="flex justify-between">
                    <span class="text-gray-600">Doctor</span>
                    <span class="font-medium">\${selectedDoctor.name}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Specialization</span>
                    <span>\${selectedDoctor.specialization.split(',')[0]}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Date</span>
                    <span>\${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Time</span>
                    <span>\${selectedSlot.time}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Duration</span>
                    <span>30 minutes</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Type</span>
                    <span>Telemedicine</span>
                </div>
            \`;
            document.getElementById('total-price').textContent = \`€\${selectedDoctor.consultationFee}\`;
        }

        async function completeBooking() {
            const name = document.getElementById('patient-name').value;
            const email = document.getElementById('patient-email').value;

            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        doctorId: selectedDoctor.id,
                        scheduledAt: \`\${selectedSlot.date}T\${selectedSlot.time}:00\`,
                        patientName: name,
                        patientEmail: email,
                        patientPhone: document.getElementById('patient-phone').value,
                        notes: document.getElementById('patient-notes').value,
                        affiliateCode: document.getElementById('affiliate-code').value,
                        price: selectedDoctor.consultationFee,
                        currency: 'EUR',
                    })
                });

                const data = await response.json();
                if (data.success) {
                    showConfirmation(data.data);
                } else {
                    alert('Booking failed: ' + data.error);
                }
            } catch (error) {
                console.error('Error creating booking:', error);
                alert('An error occurred. Please try again.');
            }
        }

        function showConfirmation(bookingData) {
            const date = new Date(selectedSlot.date);
            document.getElementById('confirmation-details').innerHTML = \`
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Booking ID</span>
                        <span class="font-mono font-semibold">\${bookingData.booking.id}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Doctor</span>
                        <span class="font-medium">\${selectedDoctor.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Date & Time</span>
                        <span>\${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at \${selectedSlot.time}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Amount</span>
                        <span class="font-bold text-green-600">€\${bookingData.booking.price}</span>
                    </div>
                </div>
            \`;

            document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
            document.getElementById('section-confirmation').classList.remove('hidden');
        }

        function setupEventListeners() {
            document.getElementById('continue-to-payment').addEventListener('click', () => goToStep(3));
            document.getElementById('complete-booking').addEventListener('click', completeBooking);
            
            document.getElementById('prev-week').addEventListener('click', () => {
                currentWeekOffset = Math.max(0, currentWeekOffset - 1);
                loadAvailability();
            });
            
            document.getElementById('next-week').addEventListener('click', () => {
                currentWeekOffset = Math.min(4, currentWeekOffset + 1);
                loadAvailability();
            });

            // Filters
            document.getElementById('specialization-filter').addEventListener('change', filterDoctors);
            document.getElementById('price-filter').addEventListener('change', filterDoctors);
        }

        function filterDoctors() {
            const spec = document.getElementById('specialization-filter').value.toLowerCase();
            const maxPrice = parseInt(document.getElementById('price-filter').value) || 10000;

            const filtered = doctors.filter(d => {
                const matchSpec = !spec || d.specialization.toLowerCase().includes(spec);
                const matchPrice = d.consultationFee <= maxPrice;
                return matchSpec && matchPrice;
            });

            renderDoctors(filtered);
        }
    </script>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="/" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/doctors" class="nav-item">
                <i class="fas fa-user-md"></i>
                <span>Doctors</span>
            </a>
            <a href="/booking" class="nav-item active">
                <i class="fas fa-calendar-plus"></i>
                <span>Book</span>
            </a>
            <a href="/medisense" class="nav-item">
                <i class="fas fa-stethoscope"></i>
                <span>MediSense</span>
            </a>
            <a href="/dashboard" class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        </div>
    </nav>
</body>
</html>`
}
