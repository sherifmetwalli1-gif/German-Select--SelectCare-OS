/**
 * Intelligent Booking System
 * Best practices inspired by Zocdoc, Doctolib, and Cal.com
 * Features:
 * - Smart doctor suggestions based on symptoms
 * - Real-time availability
 * - Segmented onboarding flow
 * - Intelligent filters
 * - Quick booking options
 * - Confirmation with reminders
 */

import { Context } from 'hono'

export function bookingPage(c: Context): string {
  // Get URL parameters for pre-selection
  const doctorId = c.req.query('doctor') || ''
  const packageId = c.req.query('package') || ''
  const symptoms = c.req.query('symptoms') || ''
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Consultation - SelectCareOS™</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        /* ============================================================================
           SELECTCAREOS™ PREMIUM BOOKING SYSTEM
           German Select Luxury Healthcare Branding
           ============================================================================ */
        
        :root {
            /* German Navy Spectrum */
            --german-navy: #1a1a2e;
            --deep-navy: #0f0f1a;
            --midnight-blue: #16213e;
            
            /* Luxurious Gold Spectrum */
            --gold-primary: #C9A227;
            --gold-champagne: #D4AF37;
            --gold-soft: #E8D5A3;
            --gold-bright: #F4D03F;
            --gold-rose: #B8860B;
            
            /* Warm Neutrals */
            --cream: #faf8f5;
            --warm-ivory: #F5F0E8;
            --pearl: #FFFDF7;
            --soft-beige: #F0EBE3;
            
            /* Functional Colors */
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            
            /* Premium Shadows */
            --shadow-gold-sm: 0 2px 8px rgba(201, 162, 39, 0.2);
            --shadow-gold-md: 0 4px 15px rgba(201, 162, 39, 0.3);
            --shadow-gold-lg: 0 8px 30px rgba(201, 162, 39, 0.4);
            --shadow-navy-md: 0 4px 15px rgba(26, 26, 46, 0.15);
            --shadow-navy-lg: 0 12px 40px rgba(26, 26, 46, 0.2);
        }
        
        body {
            background: var(--cream);
        }
        
        /* Premium German Select Header */
        .german-gradient { 
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%);
            border-bottom: 2px solid rgba(201, 162, 39, 0.3);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(201, 162, 39, 0.2) inset;
        }
        
        /* Luxurious Gold Gradient */
        .gold-gradient {
            background: linear-gradient(135deg, #D4AF37 0%, #C9A227 50%, #B8860B 100%);
        }
        
        /* Card Styles - Premium */
        .card {
            background: linear-gradient(145deg, #FFFFFF 0%, #FFFDF7 100%);
            border: 1px solid rgba(201, 162, 39, 0.1);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(26, 26, 46, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
            box-shadow: 0 12px 40px rgba(26, 26, 46, 0.12), 0 4px 12px rgba(201, 162, 39, 0.08);
            border-color: rgba(201, 162, 39, 0.2);
        }
        
        /* Doctor Card - Luxury Style */
        .doctor-card {
            background: linear-gradient(145deg, #FFFFFF 0%, #FFFDF7 100%);
            border: 2px solid rgba(201, 162, 39, 0.15);
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .doctor-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #C9A227 0%, #D4AF37 50%, #C9A227 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .doctor-card:hover {
            transform: translateY(-4px);
            border-color: rgba(201, 162, 39, 0.4);
            box-shadow: 0 12px 40px rgba(26, 26, 46, 0.12), 0 4px 12px rgba(201, 162, 39, 0.08);
        }
        
        .doctor-card:hover::before {
            opacity: 1;
        }
        
        .doctor-card.selected {
            border: 2px solid var(--gold-primary);
            background: linear-gradient(145deg, #FFFDF7 0%, rgba(201, 162, 39, 0.05) 100%);
            box-shadow: 0 8px 30px rgba(201, 162, 39, 0.15), 0 0 0 4px rgba(201, 162, 39, 0.1);
        }
        
        .doctor-card.selected::before {
            opacity: 1;
        }
        
        /* Time Slots - Gold Selection */
        .slot-grid {
            display: grid;
            gap: 0.5rem;
        }
        
        .time-slot {
            padding: 14px 20px;
            border: 2px solid #E8E8E8;
            border-radius: 12px;
            background: #FFFFFF;
            color: var(--german-navy);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            position: relative;
        }
        
        .time-slot:hover:not(.disabled) {
            border-color: var(--gold-primary);
            background: linear-gradient(145deg, #FFFDF7 0%, rgba(201, 162, 39, 0.05) 100%);
            transform: scale(1.02);
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.15);
        }
        
        .time-slot.selected {
            border-color: var(--gold-primary);
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            color: var(--german-navy);
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .time-slot.selected::after {
            content: '✓';
            position: absolute;
            top: 4px;
            right: 8px;
            font-size: 12px;
            font-weight: 700;
        }
        
        .time-slot.disabled {
            background: #F5F5F5;
            border-color: #E0E0E0;
            color: #B0B0B0;
            cursor: not-allowed;
            text-decoration: line-through;
        }
        
        /* Date Picker - Premium */
        .date-card {
            min-width: 80px;
            text-align: center;
            padding: 1rem;
            border: 2px solid #E8E8E8;
            border-radius: 12px;
            background: #FFFFFF;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .date-card:hover:not(.disabled) {
            border-color: var(--gold-primary);
            background: rgba(201, 162, 39, 0.05);
        }
        
        .date-card.selected {
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            border-color: var(--gold-primary);
            color: var(--german-navy);
            box-shadow: var(--shadow-gold-md);
        }
        
        .date-card.today {
            border-color: var(--gold-primary);
            box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
        }
        
        /* Progress Steps - Gold Active */
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .step {
            display: flex;
            align-items: center;
        }
        
        .step-number {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .step-number.active {
            background: linear-gradient(135deg, #D4AF37 0%, #C9A227 100%);
            color: var(--german-navy);
            border: none;
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2), 0 4px 15px rgba(201, 162, 39, 0.4);
            animation: pulse-gold 2s infinite;
        }
        
        @keyframes pulse-gold {
            0%, 100% { box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2), 0 4px 15px rgba(201, 162, 39, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(201, 162, 39, 0.1), 0 4px 20px rgba(201, 162, 39, 0.5); }
        }
        
        .step-number.completed {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: var(--gold-primary);
            border: 2px solid var(--gold-primary);
            box-shadow: 0 4px 12px rgba(26, 26, 46, 0.3);
        }
        
        .step-number.pending {
            background: var(--soft-beige);
            color: #8B8B8B;
            border: 2px solid #D0D0D0;
        }
        
        .step-line {
            width: 60px;
            height: 3px;
            margin: 0 12px;
            border-radius: 2px;
            transition: all 0.4s ease;
        }
        
        .step-line.completed {
            background: linear-gradient(90deg, #C9A227 0%, #D4AF37 100%);
        }
        
        .step-line.active {
            background: linear-gradient(90deg, #C9A227 0%, #E0E0E0 100%);
        }
        
        .step-line.pending {
            background: #E0E0E0;
        }
        
        /* Quick Action Cards - Premium */
        .quick-action {
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
            border: 1px solid rgba(201, 162, 39, 0.15);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .quick-action::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .quick-action:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(26, 26, 46, 0.1), 0 4px 12px rgba(201, 162, 39, 0.1);
            border-color: rgba(201, 162, 39, 0.3);
        }
        
        .quick-action:hover::after {
            opacity: 1;
        }
        
        .quick-action .icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
            background: linear-gradient(145deg, rgba(201, 162, 39, 0.1), rgba(201, 162, 39, 0.05));
            border: 2px solid rgba(201, 162, 39, 0.2);
            transition: all 0.3s ease;
        }
        
        .quick-action:hover .icon {
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            border-color: var(--gold-primary);
            color: var(--german-navy);
            box-shadow: var(--shadow-gold-sm);
        }
        
        /* Premium Badge - Enhanced */
        .premium-badge {
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            color: var(--german-navy);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(201, 162, 39, 0.3);
        }
        
        /* Primary CTA Button - Gold */
        .btn-gold-primary {
            background: linear-gradient(135deg, #D4AF37 0%, #C9A227 50%, #B8860B 100%);
            color: var(--german-navy);
            font-weight: 600;
            padding: 14px 32px;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
        }
        
        .btn-gold-primary:hover {
            background: linear-gradient(135deg, #E8D5A3 0%, #D4AF37 50%, #C9A227 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(201, 162, 39, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .btn-gold-primary:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(201, 162, 39, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Secondary Button - Navy with Gold Border */
        .btn-navy-secondary {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: var(--gold-primary);
            font-weight: 600;
            padding: 12px 28px;
            border: 2px solid var(--gold-primary);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(26, 26, 46, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .btn-navy-secondary:hover {
            background: var(--gold-primary);
            color: var(--german-navy);
            box-shadow: var(--shadow-gold-md);
        }
        
        /* Form Inputs - Premium */
        .input-field {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #E8E8E8;
            border-radius: 12px;
            background: var(--pearl);
            color: var(--german-navy);
            font-size: 15px;
            transition: all 0.3s ease;
        }
        
        .input-field::placeholder {
            color: #A0A0A0;
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--gold-primary);
            background: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.15), 0 4px 12px rgba(201, 162, 39, 0.1);
        }
        
        /* Animations */
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in {
            animation: slideIn 0.4s ease-out forwards;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Bottom Navigation - Premium */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%);
            border-top: 2px solid rgba(201, 162, 39, 0.15);
            padding: 8px 0 max(20px, env(safe-area-inset-bottom));
            z-index: 100;
            box-shadow: 0 -4px 20px rgba(26, 26, 46, 0.08);
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
        
        .nav-item:hover { color: var(--german-navy); }
        .nav-item.active { color: var(--gold-primary); }
        .nav-item i { font-size: 22px; margin-bottom: 4px; }
        
        main { padding-bottom: 120px; }
        
        /* Loading State */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Rating Stars - Gold */
        .star-rating {
            color: var(--gold-primary);
            filter: drop-shadow(0 1px 2px rgba(201, 162, 39, 0.3));
        }
        
        /* Urgency Indicators - Premium */
        .urgency-urgent { border-left: 4px solid #ef4444; }
        .urgency-soon { border-left: 4px solid var(--gold-primary); }
        .urgency-routine { border-left: 4px solid #10b981; }
        
        /* Gold Divider */
        .gold-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #C9A227 20%, #D4AF37 50%, #C9A227 80%, transparent 100%);
            margin: 24px 0;
        }
        
        /* Section Header Premium */
        .section-header {
            font-size: 20px;
            font-weight: 700;
            color: var(--german-navy);
            margin-bottom: 20px;
            position: relative;
            padding-left: 16px;
        }
        
        .section-header::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, #C9A227 0%, #D4AF37 100%);
            border-radius: 2px;
        }
        
        /* Confirmation Card - Premium */
        .confirmation-card {
            background: linear-gradient(145deg, #FFFFFF 0%, #FFFDF7 100%);
            border: 2px solid rgba(201, 162, 39, 0.3);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(26, 26, 46, 0.1), 0 8px 24px rgba(201, 162, 39, 0.08);
        }
        
        .confirmation-card::before,
        .confirmation-card::after {
            content: '';
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
        }
        
        .confirmation-card::before { top: -30px; left: -30px; }
        .confirmation-card::after { bottom: -30px; right: -30px; }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4), 0 0 0 8px rgba(201, 162, 39, 0.1);
            animation: success-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes success-bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .success-icon i { color: var(--german-navy); font-size: 36px; }
        
        .confirmation-code {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: var(--gold-primary);
            padding: 16px 32px;
            border-radius: 12px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 4px;
            display: inline-block;
            margin: 20px 0;
            border: 2px solid var(--gold-primary);
            box-shadow: 0 4px 20px rgba(26, 26, 46, 0.2), inset 0 1px 0 rgba(201, 162, 39, 0.1);
        }
        
        /* Doctor Avatar Ring */
        .avatar-ring {
            padding: 3px;
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #B8860B 100%);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
        }
        
        .avatar-ring img, .avatar-ring .avatar-placeholder {
            border-radius: 50%;
            border: 3px solid #FFFFFF;
        }
        
        /* Time Period Headers */
        .time-period-header {
            background: linear-gradient(90deg, rgba(201, 162, 39, 0.1) 0%, transparent 100%);
            border-left: 4px solid var(--gold-primary);
            padding: 12px 16px;
            font-weight: 600;
            color: var(--german-navy);
            border-radius: 0 8px 8px 0;
            margin-bottom: 16px;
        }
        
        /* Calendar Navigation */
        .calendar-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        
        .calendar-nav button {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }
        
        .calendar-nav button:hover {
            background: #f3f4f6;
        }
        
        /* Filters - Premium Gold */
        .filter-chip {
            display: inline-flex;
            align-items: center;
            padding: 0.625rem 1.25rem;
            border: 2px solid #E8E8E8;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            background: linear-gradient(145deg, #FFFFFF 0%, var(--pearl) 100%);
        }
        
        .filter-chip:hover {
            border-color: var(--gold-primary);
            background: rgba(201, 162, 39, 0.05);
            box-shadow: var(--shadow-gold-sm);
        }
        
        .filter-chip.active {
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            border-color: var(--gold-primary);
            color: var(--german-navy);
            font-weight: 600;
            box-shadow: var(--shadow-gold-sm);
        }
        
        /* Symptom Input - Premium Gold */
        .symptom-tag {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%);
            color: var(--german-navy);
            border: 1px solid rgba(201, 162, 39, 0.3);
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            margin: 0.25rem;
            transition: all 0.2s ease;
        }
        
        .symptom-tag:hover {
            background: linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(201, 162, 39, 0.08) 100%);
            border-color: var(--gold-primary);
        }
        
        .symptom-tag button {
            margin-left: 0.5rem;
            color: var(--gold-rose);
            font-weight: 600;
        }
        
        .symptom-tag button:hover {
            color: #ef4444;
        }
        
        /* Consultation Type Toggle - Premium Gold */
        .consultation-type {
            display: flex;
            border: 2px solid rgba(201, 162, 39, 0.2);
            border-radius: 16px;
            overflow: hidden;
            background: var(--pearl);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .consultation-type button {
            flex: 1;
            padding: 1.25rem;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            background: transparent;
            color: var(--german-navy);
            font-weight: 500;
            position: relative;
        }
        
        .consultation-type button:hover:not(.active) {
            background: rgba(201, 162, 39, 0.08);
        }
        
        .consultation-type button.active {
            background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%);
            color: var(--german-navy);
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
        }
        
        .consultation-type button i {
            transition: transform 0.3s ease;
        }
        
        .consultation-type button.active i {
            transform: scale(1.1);
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
            .step-line { width: 30px; }
            .date-card { min-width: 65px; padding: 0.75rem; }
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="german-gradient text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-3">
                    <i class="fas fa-hospital text-2xl" style="color: var(--gold-primary)"></i>
                    <div>
                        <span class="text-xl font-bold">SelectCareOS™</span>
                        <span class="text-xs block" style="color: var(--gold-soft)">Book Your Consultation</span>
                    </div>
                </a>
                <nav class="hidden md:flex items-center space-x-6">
                    <a href="/doctors" class="hover:opacity-80 transition-opacity" style="color: var(--gold-soft)">
                        <i class="fas fa-user-md mr-1"></i> Doctors
                    </a>
                    <a href="/packages" class="hover:opacity-80 transition-opacity" style="color: var(--gold-soft)">
                        <i class="fas fa-box mr-1"></i> Packages
                    </a>
                    <a href="/dashboard" class="hover:opacity-80 transition-opacity" style="color: var(--gold-soft)">
                        <i class="fas fa-user mr-1"></i> My Account
                    </a>
                    <!-- Language Selector -->
                    <div class="relative">
                        <select id="language-selector" onchange="changeLanguage(this.value)" class="appearance-none bg-white/10 text-white px-3 py-1.5 pr-8 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition border border-white/20">
                            <option value="en" class="text-gray-800">🇬🇧 English</option>
                            <option value="de" class="text-gray-800">🇩🇪 Deutsch</option>
                            <option value="ar" class="text-gray-800">🇸🇦 العربية</option>
                            <option value="ru" class="text-gray-800">🇷🇺 Русский</option>
                            <option value="tr" class="text-gray-800">🇹🇷 Türkçe</option>
                        </select>
                        <i class="fas fa-globe absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none"></i>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-6">
        <!-- Progress Indicator -->
        <div class="step-indicator mb-8">
            <div class="step">
                <div class="step-number active" id="step1-circle">
                    <i class="fas fa-user-md"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Find Doctor</span>
            </div>
            <div class="step-line pending" id="line1"></div>
            <div class="step">
                <div class="step-number pending" id="step2-circle">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Select Time</span>
            </div>
            <div class="step-line pending" id="line2"></div>
            <div class="step">
                <div class="step-number pending" id="step3-circle">
                    <i class="fas fa-check"></i>
                </div>
                <span class="ml-2 text-sm font-medium hidden sm:inline">Confirm</span>
            </div>
        </div>

        <!-- Step 1: Find Doctor -->
        <section id="section-find-doctor" class="animate-slide-in">
            <!-- Quick Booking Options - Premium Gold -->
            <div class="mb-8" id="quick-booking-section">
                <h2 class="section-header">Quick Booking</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="quick-action" onclick="quickBook('general')">
                        <div class="icon" style="background: linear-gradient(145deg, rgba(201, 162, 39, 0.15), rgba(201, 162, 39, 0.05)); color: var(--gold-primary);">
                            <i class="fas fa-stethoscope"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">General Consultation</h3>
                        <p class="text-sm text-gray-500 mt-1">Next available</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('urgent')">
                        <div class="icon" style="background: linear-gradient(145deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05)); color: #ef4444;">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">Urgent Care</h3>
                        <p class="text-sm text-gray-500 mt-1">Same day</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('specialist')">
                        <div class="icon" style="background: linear-gradient(145deg, rgba(26, 26, 46, 0.1), rgba(26, 26, 46, 0.05)); color: var(--german-navy);">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">See Specialist</h3>
                        <p class="text-sm text-gray-500 mt-1">Expert care</p>
                    </div>
                    <div class="quick-action" onclick="quickBook('followup')">
                        <div class="icon" style="background: linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05)); color: #10b981;">
                            <i class="fas fa-redo"></i>
                        </div>
                        <h3 class="font-semibold text-gray-800">Follow-up</h3>
                        <p class="text-sm text-gray-500 mt-1">Existing patient</p>
                    </div>
                </div>
            </div>

            <!-- Symptom-Based Suggestions - Premium Gold -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-search-plus mr-2" style="color: var(--gold-primary)"></i>
                    What's your concern? <span class="text-sm font-normal text-gray-500">(Optional)</span>
                </h3>
                <div class="flex flex-wrap gap-2 mb-4" id="selected-symptoms">
                    <!-- Selected symptoms will appear here -->
                </div>
                <div class="flex gap-2">
                    <input type="text" id="symptom-input" 
                        placeholder="Type a symptom (e.g., back pain, weight loss)" 
                        class="input-field flex-1">
                    <button onclick="addSymptom()" 
                        class="btn-gold-primary px-4 py-3">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="mt-3">
                    <span class="text-sm text-gray-500">Suggested: </span>
                    <button onclick="addSuggestedSymptom('Back pain')" class="text-sm hover:underline" style="color: var(--gold-primary)">Back pain</button>,
                    <button onclick="addSuggestedSymptom('Weight management')" class="text-sm hover:underline" style="color: var(--gold-primary)">Weight management</button>,
                    <button onclick="addSuggestedSymptom('Heart health')" class="text-sm hover:underline" style="color: var(--gold-primary)">Heart health</button>,
                    <button onclick="addSuggestedSymptom('Joint pain')" class="text-sm hover:underline" style="color: var(--gold-primary)">Joint pain</button>
                </div>
                <button onclick="getSuggestions()" id="get-suggestions-btn"
                    class="mt-4 w-full py-3 btn-gold-primary hidden">
                    <i class="fas fa-magic mr-2"></i>Find Best Doctor for My Symptoms
                </button>
            </div>

            <!-- AI Suggestions - Premium Gold -->
            <div id="ai-suggestions" class="card p-6 mb-6 hidden" style="border: 2px solid rgba(201, 162, 39, 0.2); background: linear-gradient(145deg, #FFFDF7 0%, rgba(201, 162, 39, 0.03) 100%);">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">
                        <i class="fas fa-robot mr-2" style="color: var(--gold-primary)"></i>
                        Recommended for You
                    </h3>
                    <span class="premium-badge"><i class="fas fa-sparkles mr-1"></i>AI Powered</span>
                </div>
                <div id="suggestions-list" class="space-y-4">
                    <!-- Suggestions will be loaded here -->
                </div>
            </div>

            <!-- Filters -->
            <div class="card p-6 mb-6">
                <div class="flex flex-wrap gap-4 items-center">
                    <select id="specialization-filter" 
                        class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 min-w-[200px]">
                        <option value="">All Specializations</option>
                        <option value="Bariatric">Bariatric Surgery</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Plastic">Plastic Surgery</option>
                        <option value="Urology">Urology</option>
                        <option value="Nutritionist">Nutrition</option>
                    </select>
                    <select id="price-filter" 
                        class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500">
                        <option value="">Any Price</option>
                        <option value="150">Up to €150</option>
                        <option value="200">Up to €200</option>
                        <option value="300">Up to €300</option>
                    </select>
                    <div class="flex gap-2">
                        <button onclick="toggleFilter('premium')" id="filter-premium"
                            class="filter-chip">
                            <i class="fas fa-crown mr-2 text-yellow-500"></i>Premium Only
                        </button>
                        <button onclick="toggleFilter('available')" id="filter-available"
                            class="filter-chip active">
                            <i class="fas fa-clock mr-2 text-green-500"></i>Available Today
                        </button>
                    </div>
                </div>
            </div>

            <!-- Doctor List -->
            <div class="mb-6">
                <h2 class="section-header">
                    <span id="doctor-count">Loading...</span> Available Doctors
                </h2>
                <div id="doctor-list" class="space-y-4">
                    <!-- Loading skeleton -->
                    <div class="card p-6">
                        <div class="flex items-start space-x-4">
                            <div class="w-16 h-16 skeleton rounded-full"></div>
                            <div class="flex-1">
                                <div class="h-6 skeleton rounded w-1/3 mb-2"></div>
                                <div class="h-4 skeleton rounded w-1/4 mb-4"></div>
                                <div class="h-4 skeleton rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Step 2: Select Time -->
        <section id="section-select-time" class="hidden animate-slide-in">
            <button onclick="goToStep(1)" class="mb-6 font-medium hover:opacity-80 transition-opacity" style="color: var(--gold-primary)">
                <i class="fas fa-arrow-left mr-2"></i>Back to Doctor Selection
            </button>

            <!-- Selected Doctor Summary - Premium Gold -->
            <div id="selected-doctor-summary" class="card p-6 mb-6" style="background: linear-gradient(145deg, rgba(201, 162, 39, 0.08) 0%, #FFFDF7 100%); border: 2px solid rgba(201, 162, 39, 0.2);">
                <!-- Populated dynamically -->
            </div>

            <!-- Consultation Type -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Consultation Type</h3>
                <div class="consultation-type">
                    <button id="type-onsite" class="active" onclick="setConsultationType('onsite')">
                        <i class="fas fa-hospital text-2xl mb-2"></i>
                        <div class="font-semibold">In-Person Visit</div>
                        <div class="text-sm text-gray-500">At our clinic</div>
                    </button>
                    <button id="type-video" onclick="setConsultationType('video')">
                        <i class="fas fa-video text-2xl mb-2"></i>
                        <div class="font-semibold">Video Call</div>
                        <div class="text-sm text-gray-500">From anywhere</div>
                    </button>
                </div>
            </div>

            <!-- Date Selection -->
            <div class="card p-6 mb-6">
                <div class="calendar-nav">
                    <button onclick="prevWeek()" id="prev-week-btn" class="disabled:opacity-50">
                        <i class="fas fa-chevron-left mr-2"></i>Previous
                    </button>
                    <h3 class="text-lg font-semibold text-gray-800" id="week-display">
                        Loading...
                    </h3>
                    <button onclick="nextWeek()" id="next-week-btn">
                        Next<i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
                
                <div id="date-picker" class="flex gap-3 overflow-x-auto pb-4">
                    <!-- Dates will be rendered here -->
                </div>
            </div>

            <!-- Time Slots -->
            <div class="card p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Available Times for <span id="selected-date-display">-</span>
                </h3>
                
                <div id="time-slots-container">
                    <div class="mb-6">
                        <h4 class="text-sm font-medium text-gray-600 mb-3">
                            <i class="fas fa-sun text-yellow-500 mr-2"></i>Morning
                        </h4>
                        <div id="morning-slots" class="slot-grid grid-cols-4 sm:grid-cols-6">
                            <!-- Morning slots -->
                        </div>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-600 mb-3">
                            <i class="fas fa-moon text-indigo-500 mr-2"></i>Afternoon
                        </h4>
                        <div id="afternoon-slots" class="slot-grid grid-cols-4 sm:grid-cols-6">
                            <!-- Afternoon slots -->
                        </div>
                    </div>
                </div>

                <div id="no-slots-message" class="text-center py-8 hidden">
                    <i class="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No available slots for this date.</p>
                    <button onclick="nextWeek()" class="mt-4 text-blue-600 hover:underline">
                        Check next week →
                    </button>
                </div>
            </div>

            <!-- Selected Slot Summary - Premium Gold -->
            <div id="slot-summary" class="card p-6 mb-6 hidden" style="border: 2px solid var(--gold-primary); background: linear-gradient(145deg, rgba(201, 162, 39, 0.08) 0%, #FFFDF7 100%);">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" style="background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%); box-shadow: var(--shadow-gold-sm);">
                            <i class="fas fa-check text-xl" style="color: var(--german-navy)"></i>
                        </div>
                        <div>
                            <p class="font-semibold" style="color: var(--german-navy)" id="summary-datetime">-</p>
                            <p class="text-sm text-gray-500" id="summary-duration">30 minute consultation</p>
                        </div>
                    </div>
                    <button onclick="goToStep(3)" class="btn-gold-primary">
                        Continue <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Step 3: Confirm Booking -->
        <section id="section-confirm" class="hidden animate-slide-in">
            <button onclick="goToStep(2)" class="mb-6 font-medium hover:opacity-80 transition-opacity" style="color: var(--gold-primary)">
                <i class="fas fa-arrow-left mr-2"></i>Back to Time Selection
            </button>

            <div class="grid md:grid-cols-3 gap-6">
                <!-- Patient Information -->
                <div class="md:col-span-2 space-y-6">
                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-user mr-2" style="color: var(--gold-primary)"></i>Your Information
                        </h3>
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" id="patient-name" 
                                    class="input-field"
                                    placeholder="John Doe">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" id="patient-email" 
                                    class="input-field"
                                    placeholder="john@example.com">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" id="patient-phone" 
                                    class="input-field"
                                    placeholder="+49 123 456 7890">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <select id="patient-country" 
                                    class="input-field">
                                    <option value="DE">Germany</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US">United States</option>
                                    <option value="AE">UAE</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-notes-medical mr-2" style="color: var(--gold-primary)"></i>Additional Information
                        </h3>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Visit / Notes
                            </label>
                            <textarea id="patient-notes" rows="4"
                                class="input-field"
                                placeholder="Please describe your symptoms or reason for the consultation..."></textarea>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Referral Code (Optional)
                            </label>
                            <input type="text" id="affiliate-code"
                                class="input-field"
                                placeholder="Enter referral code for discount">
                        </div>
                    </div>

                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-bell mr-2" style="color: var(--gold-primary)"></i>Reminder Preferences
                        </h3>
                        <div class="space-y-3">
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" id="reminder-email" checked
                                    class="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-offset-0" style="accent-color: var(--gold-primary);">
                                <span class="ml-3 text-gray-700 group-hover:text-gray-900">Email reminder 24 hours before</span>
                            </label>
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" id="reminder-sms"
                                    class="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-offset-0" style="accent-color: var(--gold-primary);">
                                <span class="ml-3 text-gray-700 group-hover:text-gray-900">SMS reminder 1 hour before</span>
                            </label>
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" id="reminder-calendar" checked
                                    class="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-offset-0" style="accent-color: var(--gold-primary);">
                                <span class="ml-3 text-gray-700 group-hover:text-gray-900">Add to calendar</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Booking Summary -->
                <div class="md:col-span-1">
                    <div class="card p-6 sticky top-24">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                        
                        <div id="booking-summary-details" class="space-y-4 mb-6">
                            <!-- Populated dynamically -->
                        </div>

                        <div class="border-t pt-4 mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-600">Consultation Fee</span>
                                <span class="font-semibold" id="summary-price">€0</span>
                            </div>
                            <div class="flex justify-between items-center text-sm text-gray-500">
                                <span>Service Fee</span>
                                <span>€0</span>
                            </div>
                            <div class="flex justify-between items-center mt-4 pt-4 border-t text-lg font-bold">
                                <span>Total</span>
                                <span id="summary-total">€0</span>
                            </div>
                        </div>

                        <div class="mb-4 p-3 rounded-lg text-sm" style="background: linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%); border: 1px solid rgba(201, 162, 39, 0.2); color: var(--german-navy);">
                            <i class="fas fa-coins mr-2" style="color: var(--gold-primary)"></i>
                            You'll earn <strong id="points-earned" style="color: var(--gold-primary)">0</strong> SelectPoints!
                        </div>

                        <button onclick="confirmBooking()" id="confirm-btn"
                            class="w-full py-4 btn-gold-primary text-lg">
                            <i class="fas fa-lock mr-2"></i>Confirm Booking
                        </button>

                        <p class="text-center text-xs text-gray-500 mt-4">
                            <i class="fas fa-shield-alt mr-1"></i>
                            Your information is secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Confirmation Success - Premium Gold -->
        <section id="section-success" class="hidden animate-slide-in">
            <div class="max-w-2xl mx-auto">
                <div class="confirmation-card">
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2 class="text-2xl font-bold mb-2" style="color: var(--german-navy)">Booking Confirmed!</h2>
                    <p class="text-gray-600 mb-4">Your consultation has been successfully scheduled.</p>
                    
                    <div class="confirmation-code" id="booking-confirmation-code">-</div>
                    
                    <div id="confirmation-details" class="rounded-xl p-6 text-left mb-6" style="background: linear-gradient(145deg, rgba(201, 162, 39, 0.08) 0%, #FFFDF7 100%); border: 1px solid rgba(201, 162, 39, 0.2);">
                        <!-- Populated dynamically -->
                    </div>

                    <div class="rounded-lg p-4 mb-6 text-left" style="background: linear-gradient(135deg, var(--german-navy) 0%, #16213e 100%);">
                        <h4 class="font-semibold mb-2" style="color: var(--gold-primary)"><i class="fas fa-lightbulb mr-2"></i>What's Next?</h4>
                        <ul class="text-sm text-gray-300 space-y-2" id="next-steps">
                            <!-- Populated dynamically -->
                        </ul>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/dashboard" class="btn-gold-primary">
                            <i class="fas fa-home mr-2"></i>Go to Dashboard
                        </a>
                        <button onclick="window.print()" class="btn-navy-secondary">
                            <i class="fas fa-print mr-2"></i>Print Details
                        </button>
                        <button onclick="addToCalendar()" class="btn-navy-secondary">
                            <i class="fas fa-calendar-plus mr-2"></i>Add to Calendar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Floating AI Assistant - Premium Gold -->
    <a href="/ai-concierge" 
        class="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        style="background: linear-gradient(135deg, #C9A227 0%, #D4AF37 100%); box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);">
        <i class="fas fa-robot text-xl" style="color: var(--german-navy)"></i>
    </a>

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

    <script>
        // ===== STATE =====
        const state = {
            doctors: [],
            selectedDoctor: null,
            selectedDate: null,
            selectedTime: null,
            slots: [],
            symptoms: [],
            consultationType: 'onsite',
            weekOffset: 0,
            filters: {
                premium: false,
                available: true
            },
            booking: null
        };

        // Pre-populated from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const preSelectedDoctor = '${doctorId}';
        const preSelectedSymptoms = '${symptoms}'.split(',').filter(s => s);

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', async () => {
            // Load doctors
            await loadDoctors();
            
            // Add pre-selected symptoms
            preSelectedSymptoms.forEach(s => {
                if (s) addSuggestedSymptom(s);
            });
            
            // If doctor pre-selected, go directly to time selection
            if (preSelectedDoctor) {
                const doctor = state.doctors.find(d => d.id === preSelectedDoctor);
                if (doctor) {
                    selectDoctor(doctor);
                }
            }
            
            // Setup event listeners
            setupEventListeners();
        });

        function setupEventListeners() {
            document.getElementById('specialization-filter').addEventListener('change', filterDoctors);
            document.getElementById('price-filter').addEventListener('change', filterDoctors);
            
            document.getElementById('symptom-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addSymptom();
            });
        }

        // ===== DOCTORS =====
        async function loadDoctors() {
            try {
                const response = await fetch('/api/doctors');
                const data = await response.json();
                if (data.success) {
                    state.doctors = data.data.map(d => ({
                        id: d.id,
                        name: d.name,
                        title: d.title,
                        specialization: d.specialization,
                        subspecialties: d.subspecialties || [],
                        qualifications: d.qualifications || [],
                        languages: d.languages || [],
                        experienceYears: d.experience_years,
                        location: d.location,
                        consultationFee: d.consultation_fee,
                        rating: d.rating,
                        reviewCount: d.total_reviews,
                        isPremium: d.is_premium,
                        avatar: d.avatar,
                        available: d.available
                    }));
                    renderDoctors(state.doctors);
                }
            } catch (error) {
                console.error('Error loading doctors:', error);
            }
        }

        function renderDoctors(doctors) {
            const container = document.getElementById('doctor-list');
            document.getElementById('doctor-count').textContent = doctors.length;
            
            if (doctors.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-8">
                        <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">No doctors match your criteria.</p>
                        <button onclick="clearFilters()" class="mt-4 text-blue-600 hover:underline">Clear filters</button>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = doctors.map(doctor => \`
                <div class="card doctor-card p-6" data-id="\${doctor.id}" onclick="selectDoctor(state.doctors.find(d => d.id === '\${doctor.id}'))">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div class="flex items-start space-x-4">
                            <div class="avatar-ring">
                                <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style="background: linear-gradient(135deg, var(--german-navy) 0%, #16213e 100%);">
                                    \${doctor.avatar || doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center flex-wrap gap-2">
                                    <h3 class="font-bold text-gray-800">\${doctor.name}</h3>
                                    \${doctor.isPremium ? '<span class="premium-badge"><i class="fas fa-crown mr-1"></i>Premium</span>' : ''}
                                </div>
                                <p class="font-medium" style="color: var(--gold-primary)">\${doctor.specialization}</p>
                                <p class="text-gray-500 text-sm mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>\${doctor.location}
                                </p>
                                <div class="flex items-center mt-2">
                                    <div class="star-rating">
                                        \${Array(5).fill(0).map((_, i) => 
                                            i < Math.floor(doctor.rating) 
                                                ? '<i class="fas fa-star"></i>' 
                                                : i < doctor.rating 
                                                    ? '<i class="fas fa-star-half-alt"></i>' 
                                                    : '<i class="far fa-star"></i>'
                                        ).join('')}
                                    </div>
                                    <span class="ml-2 text-sm font-medium">\${doctor.rating}</span>
                                    <span class="ml-1 text-sm text-gray-500">(\${doctor.reviewCount} reviews)</span>
                                </div>
                                \${doctor.subspecialties?.length > 0 ? \`
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        \${doctor.subspecialties.slice(0, 3).map(s => 
                                            \`<span class="text-xs px-2 py-1 rounded" style="background: rgba(201, 162, 39, 0.1); color: var(--german-navy);">\${s}</span>\`
                                        ).join('')}
                                    </div>
                                \` : ''}
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold" style="color: var(--german-navy)">€\${doctor.consultationFee}</p>
                            <p class="text-sm text-gray-500">per consultation</p>
                            <button class="mt-3 w-full sm:w-auto btn-gold-primary">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        function selectDoctor(doctor) {
            state.selectedDoctor = doctor;
            
            // Update summary - Premium Gold Style
            document.getElementById('selected-doctor-summary').innerHTML = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="avatar-ring">
                            <div class="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background: linear-gradient(135deg, var(--german-navy) 0%, #16213e 100%);">
                                \${doctor.avatar || doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                        </div>
                        <div>
                            <h3 class="font-bold" style="color: var(--german-navy)">\${doctor.name}</h3>
                            <p style="color: var(--gold-primary); font-weight: 500;">\${doctor.specialization}</p>
                            <p class="text-sm text-gray-500">\${doctor.location}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold" style="color: var(--german-navy)">€\${doctor.consultationFee}</p>
                        <div class="flex items-center justify-end mt-1">
                            <div class="star-rating text-sm">
                                <i class="fas fa-star"></i>
                            </div>
                            <span class="ml-1 text-sm">\${doctor.rating}</span>
                        </div>
                    </div>
                </div>
            \`;
            
            goToStep(2);
            loadAvailability();
        }

        // ===== AVAILABILITY =====
        async function loadAvailability() {
            if (!state.selectedDoctor) return;
            
            try {
                const response = await fetch(\`/api/doctors/\${state.selectedDoctor.id}/availability?week=\${state.weekOffset}&type=\${state.consultationType}\`);
                const data = await response.json();
                
                if (data.success) {
                    state.slots = data.data.slots;
                    renderDatePicker();
                    
                    // Auto-select first available date
                    const dates = [...new Set(state.slots.map(s => s.date))];
                    if (dates.length > 0 && !state.selectedDate) {
                        selectDate(dates[0]);
                    } else if (state.selectedDate) {
                        renderTimeSlots();
                    }
                }
            } catch (error) {
                console.error('Error loading availability:', error);
            }
        }

        function renderDatePicker() {
            const container = document.getElementById('date-picker');
            const dates = getWeekDates();
            
            // Update week display
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[6]);
            document.getElementById('week-display').textContent = 
                \`\${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - \${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\`;
            
            container.innerHTML = dates.map(dateStr => {
                const date = new Date(dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                const hasSlots = state.slots.some(s => s.date === dateStr);
                const isSelected = state.selectedDate === dateStr;
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return \`
                    <div class="date-card \${isSelected ? 'selected' : ''} \${isToday ? 'today' : ''} \${!hasSlots || isPast || isWeekend ? 'disabled opacity-50' : ''}"
                        \${hasSlots && !isPast && !isWeekend ? \`onclick="selectDate('\${dateStr}')"\` : ''}>
                        <div class="text-xs \${isSelected ? 'text-blue-100' : 'text-gray-500'}">\${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div class="text-2xl font-bold \${isSelected ? '' : 'text-gray-800'}">\${date.getDate()}</div>
                        <div class="text-xs mt-1 \${isSelected ? 'text-blue-100' : hasSlots && !isPast ? 'text-green-600' : 'text-gray-400'}">
                            \${isPast ? 'Past' : isWeekend ? 'Closed' : hasSlots ? \`\${state.slots.filter(s => s.date === dateStr).length} slots\` : 'Full'}
                        </div>
                    </div>
                \`;
            }).join('');
            
            // Update prev button state
            document.getElementById('prev-week-btn').disabled = state.weekOffset === 0;
        }

        function getWeekDates() {
            const dates = [];
            const today = new Date();
            const start = new Date(today);
            start.setDate(today.getDate() + 1 + (state.weekOffset * 7));
            
            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(start.getDate() + i);
                dates.push(d.toISOString().split('T')[0]);
            }
            return dates;
        }

        function selectDate(dateStr) {
            state.selectedDate = dateStr;
            renderDatePicker();
            renderTimeSlots();
            
            const date = new Date(dateStr);
            document.getElementById('selected-date-display').textContent = 
                date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        }

        function renderTimeSlots() {
            const dateSlots = state.slots.filter(s => s.date === state.selectedDate);
            
            const morningSlots = dateSlots.filter(s => {
                const hour = parseInt(s.startTime.split(':')[0]);
                return hour < 12;
            });
            
            const afternoonSlots = dateSlots.filter(s => {
                const hour = parseInt(s.startTime.split(':')[0]);
                return hour >= 12;
            });
            
            const renderSlots = (slots, containerId) => {
                const container = document.getElementById(containerId);
                if (slots.length === 0) {
                    container.innerHTML = '<p class="text-gray-400 text-sm col-span-full">No slots available</p>';
                    return;
                }
                container.innerHTML = slots.map(slot => \`
                    <div class="time-slot \${state.selectedTime === slot.startTime ? 'selected' : ''}"
                        onclick="selectTime('\${slot.startTime}', '\${slot.id}')">
                        \${slot.startTime}
                    </div>
                \`).join('');
            };
            
            renderSlots(morningSlots, 'morning-slots');
            renderSlots(afternoonSlots, 'afternoon-slots');
            
            // Show/hide no slots message
            document.getElementById('no-slots-message').classList.toggle('hidden', dateSlots.length > 0);
            document.getElementById('time-slots-container').classList.toggle('hidden', dateSlots.length === 0);
        }

        function selectTime(time, slotId) {
            state.selectedTime = time;
            state.selectedSlotId = slotId;
            renderTimeSlots();
            
            // Show summary
            const date = new Date(state.selectedDate);
            document.getElementById('summary-datetime').textContent = 
                \`\${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at \${time}\`;
            document.getElementById('slot-summary').classList.remove('hidden');
        }

        function prevWeek() {
            if (state.weekOffset > 0) {
                state.weekOffset--;
                state.selectedDate = null;
                loadAvailability();
            }
        }

        function nextWeek() {
            if (state.weekOffset < 4) {
                state.weekOffset++;
                state.selectedDate = null;
                loadAvailability();
            }
        }

        // ===== FILTERS =====
        function filterDoctors() {
            const spec = document.getElementById('specialization-filter').value.toLowerCase();
            const maxPrice = parseInt(document.getElementById('price-filter').value) || 10000;
            
            let filtered = state.doctors.filter(d => {
                const matchSpec = !spec || d.specialization.toLowerCase().includes(spec);
                const matchPrice = d.consultationFee <= maxPrice;
                const matchPremium = !state.filters.premium || d.isPremium;
                return matchSpec && matchPrice && matchPremium;
            });
            
            renderDoctors(filtered);
        }

        function toggleFilter(filter) {
            state.filters[filter] = !state.filters[filter];
            document.getElementById(\`filter-\${filter}\`).classList.toggle('active', state.filters[filter]);
            filterDoctors();
        }

        function clearFilters() {
            document.getElementById('specialization-filter').value = '';
            document.getElementById('price-filter').value = '';
            state.filters = { premium: false, available: true };
            document.getElementById('filter-premium').classList.remove('active');
            document.getElementById('filter-available').classList.add('active');
            renderDoctors(state.doctors);
        }

        // ===== SYMPTOMS =====
        function addSymptom() {
            const input = document.getElementById('symptom-input');
            const symptom = input.value.trim();
            if (symptom && !state.symptoms.includes(symptom)) {
                state.symptoms.push(symptom);
                renderSymptoms();
                input.value = '';
            }
        }

        function addSuggestedSymptom(symptom) {
            if (!state.symptoms.includes(symptom)) {
                state.symptoms.push(symptom);
                renderSymptoms();
            }
        }

        function removeSymptom(symptom) {
            state.symptoms = state.symptoms.filter(s => s !== symptom);
            renderSymptoms();
        }

        function renderSymptoms() {
            const container = document.getElementById('selected-symptoms');
            container.innerHTML = state.symptoms.map(s => \`
                <span class="symptom-tag">
                    \${s}
                    <button onclick="removeSymptom('\${s}')">&times;</button>
                </span>
            \`).join('');
            
            // Show/hide suggestions button
            document.getElementById('get-suggestions-btn').classList.toggle('hidden', state.symptoms.length === 0);
        }

        async function getSuggestions() {
            if (state.symptoms.length === 0) return;
            
            try {
                const response = await fetch('/api/booking/suggest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        symptoms: state.symptoms,
                        urgency: 'routine'
                    })
                });
                
                const data = await response.json();
                if (data.success) {
                    renderSuggestions(data.data);
                }
            } catch (error) {
                console.error('Error getting suggestions:', error);
            }
        }

        function renderSuggestions(data) {
            const container = document.getElementById('suggestions-list');
            container.innerHTML = data.suggestions.map(s => \`
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                    onclick="selectDoctor(state.doctors.find(d => d.id === '\${s.doctor.id}'))">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            \${s.doctor.avatar || s.doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="font-semibold text-gray-800">\${s.doctor.name}</h4>
                                <span class="text-xs px-2 py-0.5 rounded-full \${s.matchScore === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                                    \${s.matchScore === 'high' ? 'Best Match' : 'Good Match'}
                                </span>
                            </div>
                            <p class="text-sm text-blue-600">\${s.doctor.specialization}</p>
                            \${s.nextAvailable ? \`
                                <p class="text-sm text-green-600 mt-1">
                                    <i class="fas fa-clock mr-1"></i>
                                    Next: \${new Date(s.nextAvailable.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at \${s.nextAvailable.startTime}
                                </p>
                            \` : '<p class="text-sm text-gray-500 mt-1">Check availability</p>'}
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-gray-800">€\${s.doctor.consultationFee}</p>
                        <p class="text-sm text-gray-500">\${s.totalSlots} slots</p>
                    </div>
                </div>
            \`).join('');
            
            document.getElementById('ai-suggestions').classList.remove('hidden');
            
            // Scroll to suggestions
            document.getElementById('ai-suggestions').scrollIntoView({ behavior: 'smooth' });
        }

        // ===== CONSULTATION TYPE =====
        function setConsultationType(type) {
            state.consultationType = type;
            document.getElementById('type-onsite').classList.toggle('active', type === 'onsite');
            document.getElementById('type-video').classList.toggle('active', type === 'video');
            loadAvailability();
        }

        // ===== QUICK BOOKING =====
        function quickBook(type) {
            switch(type) {
                case 'general':
                    // Show all doctors
                    clearFilters();
                    break;
                case 'urgent':
                    // Filter to those with immediate availability
                    state.filters.available = true;
                    filterDoctors();
                    break;
                case 'specialist':
                    // Scroll to filters
                    document.getElementById('specialization-filter').focus();
                    break;
                case 'followup':
                    // Could show patient history - for now just scroll to doctors
                    break;
            }
            
            document.getElementById('doctor-list').scrollIntoView({ behavior: 'smooth' });
        }

        // ===== NAVIGATION =====
        function goToStep(step) {
            // Update step indicators
            for (let i = 1; i <= 3; i++) {
                const circle = document.getElementById(\`step\${i}-circle\`);
                const line = document.getElementById(\`line\${i-1}\`);
                
                if (i < step) {
                    circle?.classList.remove('active', 'pending');
                    circle?.classList.add('completed');
                    line?.classList.remove('pending');
                    line?.classList.add('completed');
                } else if (i === step) {
                    circle?.classList.remove('completed', 'pending');
                    circle?.classList.add('active');
                } else {
                    circle?.classList.remove('active', 'completed');
                    circle?.classList.add('pending');
                    line?.classList.remove('completed');
                    line?.classList.add('pending');
                }
            }
            
            // Show/hide sections
            document.getElementById('section-find-doctor').classList.toggle('hidden', step !== 1);
            document.getElementById('section-select-time').classList.toggle('hidden', step !== 2);
            document.getElementById('section-confirm').classList.toggle('hidden', step !== 3);
            document.getElementById('section-success').classList.add('hidden');
            
            // Update summary for step 3
            if (step === 3) {
                updateBookingSummary();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function updateBookingSummary() {
            if (!state.selectedDoctor || !state.selectedDate || !state.selectedTime) return;
            
            const date = new Date(state.selectedDate);
            const price = state.selectedDoctor.consultationFee;
            
            document.getElementById('booking-summary-details').innerHTML = \`
                <div class="flex items-center space-x-3 pb-4 border-b">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        \${state.selectedDoctor.avatar}
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800">\${state.selectedDoctor.name}</p>
                        <p class="text-sm text-blue-600">\${state.selectedDoctor.specialization}</p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-calendar mr-2"></i>Date</span>
                        <span class="font-medium">\${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-clock mr-2"></i>Time</span>
                        <span class="font-medium">\${state.selectedTime}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-hourglass-half mr-2"></i>Duration</span>
                        <span class="font-medium">30 min</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-hospital mr-2"></i>Type</span>
                        <span class="font-medium">\${state.consultationType === 'onsite' ? 'In-Person' : 'Video Call'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500"><i class="fas fa-map-marker-alt mr-2"></i>Location</span>
                        <span class="font-medium">\${state.selectedDoctor.location}</span>
                    </div>
                </div>
            \`;
            
            document.getElementById('summary-price').textContent = \`€\${price}\`;
            document.getElementById('summary-total').textContent = \`€\${price}\`;
            document.getElementById('points-earned').textContent = Math.floor(price * 2);
        }

        // ===== BOOKING CONFIRMATION =====
        async function confirmBooking() {
            const name = document.getElementById('patient-name').value.trim();
            const email = document.getElementById('patient-email').value.trim();
            
            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const btn = document.getElementById('confirm-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            
            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        doctorId: state.selectedDoctor.id,
                        slotId: state.selectedSlotId,
                        date: state.selectedDate,
                        time: state.selectedTime,
                        patientName: name,
                        patientEmail: email,
                        patientPhone: document.getElementById('patient-phone').value,
                        notes: document.getElementById('patient-notes').value,
                        consultationType: state.consultationType,
                        affiliateCode: document.getElementById('affiliate-code').value,
                        symptoms: state.symptoms,
                        urgency: 'routine'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    state.booking = data.data.booking;
                    showConfirmation(data.data);
                } else {
                    alert('Booking failed: ' + data.error);
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-lock mr-2"></i>Confirm Booking';
                }
            } catch (error) {
                console.error('Booking error:', error);
                alert('An error occurred. Please try again.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-lock mr-2"></i>Confirm Booking';
            }
        }

        function showConfirmation(data) {
            const booking = data.booking;
            const date = new Date(booking.date);
            
            // Update confirmation code
            const codeEl = document.getElementById('booking-confirmation-code');
            if (codeEl) {
                codeEl.textContent = booking.confirmationCode || booking.id;
            }
            
            document.getElementById('confirmation-details').innerHTML = \`
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Booking ID</p>
                        <p class="font-mono font-semibold" style="color: var(--german-navy)">\${booking.id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status</p>
                        <p class="font-semibold" style="color: var(--gold-primary)"><i class="fas fa-check-circle mr-1"></i>Confirmed</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Doctor</p>
                        <p class="font-semibold" style="color: var(--german-navy)">\${booking.doctorName}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Specialization</p>
                        <p style="color: var(--gold-primary)">\${booking.doctorSpecialization}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Date & Time</p>
                        <p class="font-semibold" style="color: var(--german-navy)">\${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at \${booking.time}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p style="color: var(--german-navy)">\${booking.location}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Amount</p>
                        <p class="text-xl font-bold" style="color: var(--german-navy)">€\${booking.price}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Points Earned</p>
                        <p class="font-semibold" style="color: var(--gold-primary)">+\${data.pointsEarned} SelectPoints</p>
                    </div>
                </div>
            \`;
            
            document.getElementById('next-steps').innerHTML = data.nextSteps.map(step => 
                \`<li><i class="fas fa-check mr-2" style="color: var(--gold-primary)"></i>\${step}</li>\`
            ).join('');
            
            // Hide all sections and show success
            document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
            document.getElementById('section-success').classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function addToCalendar() {
            if (!state.booking) return;
            
            const booking = state.booking;
            const date = new Date(booking.date + 'T' + booking.time);
            const endDate = new Date(date.getTime() + 30 * 60000);
            
            // Create ICS file
            const icsContent = \`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:\${formatICSDate(date)}
DTEND:\${formatICSDate(endDate)}
SUMMARY:Consultation with \${booking.doctorName}
DESCRIPTION:Booking ID: \${booking.id}\\nType: \${booking.consultationType}\\nSpecialization: \${booking.doctorSpecialization}
LOCATION:\${booking.location}
END:VEVENT
END:VCALENDAR\`;
            
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'appointment.ics';
            a.click();
            URL.revokeObjectURL(url);
        }

        function formatICSDate(date) {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }

        function validateEmail(email) {
            return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
        }

        // ============================================================================
        // INTERNATIONALIZATION (i18n)
        // ============================================================================
        
        const LANG_STORAGE_KEY = 'selectcare_language';
        let currentLanguage = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
        let translations = {};
        
        // Load translations
        async function loadTranslations(lang) {
            try {
                const response = await fetch(\`/api/i18n/translations/\${lang}\`);
                const data = await response.json();
                if (data.success) {
                    translations = data.data.translations;
                    if (data.data.fallback) {
                        translations = { ...data.data.fallback, ...translations };
                    }
                    return true;
                }
            } catch (error) {
                console.error('Failed to load translations:', error);
            }
            return false;
        }
        
        // Change language
        async function changeLanguage(lang) {
            const success = await loadTranslations(lang);
            if (success) {
                currentLanguage = lang;
                localStorage.setItem(LANG_STORAGE_KEY, lang);
                
                // Update text direction for RTL languages
                document.documentElement.dir = ['ar', 'he', 'fa'].includes(lang) ? 'rtl' : 'ltr';
                
                // Apply translations to page
                applyTranslations();
                
                // Show notification
                showNotification(\`Language changed to \${getLanguageName(lang)}\`, 'success');
            }
        }
        
        function getLanguageName(code) {
            const names = {
                'en': 'English',
                'de': 'Deutsch',
                'ar': 'العربية',
                'ru': 'Русский',
                'tr': 'Türkçe',
                'fr': 'Français',
                'es': 'Español',
                'zh': '中文'
            };
            return names[code] || code;
        }
        
        // Translate function
        function t(key) {
            return translations[key] || key;
        }
        
        // Apply translations to page elements
        function applyTranslations() {
            // Update elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = t(key);
            });
            
            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                el.placeholder = t(key);
            });
        }
        
        // Show notification
        function showNotification(message, type = 'info') {
            const colors = {
                'success': 'bg-green-500',
                'error': 'bg-red-500',
                'info': 'bg-blue-500'
            };
            
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 \${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in\`;
            notification.innerHTML = \`<i class="fas fa-\${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle mr-2"></i>\${message}\`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        // Initialize language on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Set language selector to current language
            const selector = document.getElementById('language-selector');
            if (selector) {
                selector.value = currentLanguage;
            }
            
            // Load translations if not English (English is default)
            if (currentLanguage !== 'en') {
                loadTranslations(currentLanguage).then(() => applyTranslations());
            }
        });
    </script>
</body>
</html>`
}
