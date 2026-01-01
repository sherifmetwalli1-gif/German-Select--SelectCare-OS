-- SelectCareOS™ Database Schema v2.0
-- Initial migration for core monetization features
-- Platform: Cloudflare D1 (SQLite)

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

-- Core users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT CHECK(gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'Europe/Berlin',
    role TEXT DEFAULT 'patient' CHECK(role IN ('patient', 'doctor', 'admin', 'affiliate')),
    tier TEXT DEFAULT 'free' CHECK(tier IN ('free', 'basic', 'plus', 'elite', 'enterprise')),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME
);

-- User sessions for JWT refresh
CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL,
    device_info TEXT,
    ip_address TEXT,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SUBSCRIPTIONS & BILLING
-- ============================================================================

-- Subscription records
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    tier TEXT NOT NULL CHECK(tier IN ('free', 'basic', 'plus', 'elite', 'enterprise')),
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'canceled', 'past_due', 'trialing', 'paused')),
    billing_interval TEXT DEFAULT 'month' CHECK(billing_interval IN ('month', 'year')),
    current_period_start DATETIME,
    current_period_end DATETIME,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at DATETIME,
    trial_start DATETIME,
    trial_end DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Payment history
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT UNIQUE,
    amount INTEGER NOT NULL, -- in cents
    currency TEXT DEFAULT 'eur',
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'succeeded', 'failed', 'refunded')),
    payment_type TEXT CHECK(payment_type IN ('subscription', 'one_time', 'consultation', 'marketplace', 'treatment')),
    description TEXT,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SELECTPOINTS & GAMIFICATION
-- ============================================================================

-- User points balance and tier
CREATE TABLE IF NOT EXISTS user_points (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER DEFAULT 0,
    total_earned INTEGER DEFAULT 0,
    total_redeemed INTEGER DEFAULT 0,
    points_tier TEXT DEFAULT 'bronze' CHECK(points_tier IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
    multiplier REAL DEFAULT 1.0,
    streak_days INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Points transaction history
CREATE TABLE IF NOT EXISTS points_history (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- e.g., 'daily_login', 'log_weight', 'referral'
    points INTEGER NOT NULL, -- positive for earn, negative for redeem
    balance_after INTEGER NOT NULL,
    description TEXT,
    reference_id TEXT, -- e.g., order_id, task_id
    reference_type TEXT, -- e.g., 'order', 'task', 'achievement'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Achievements/Badges
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    category TEXT,
    points_reward INTEGER DEFAULT 0,
    requirement_type TEXT, -- e.g., 'streak', 'points_total', 'tasks_completed'
    requirement_value INTEGER,
    is_active BOOLEAN DEFAULT TRUE
);

-- User achievements (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES achievements(id),
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- ============================================================================
-- MARKETPLACE & ORDERS
-- ============================================================================

-- Products catalog
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price INTEGER NOT NULL, -- in cents
    original_price INTEGER,
    currency TEXT DEFAULT 'eur',
    image_url TEXT,
    stock_quantity INTEGER DEFAULT -1, -- -1 = unlimited
    commission_rate REAL DEFAULT 0.15, -- 15% default
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    badge TEXT, -- 'BESTSELLER', 'NEW', 'SALE'
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT,
    subtotal INTEGER NOT NULL, -- in cents
    discount INTEGER DEFAULT 0,
    shipping INTEGER DEFAULT 0,
    tax INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    currency TEXT DEFAULT 'eur',
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'canceled', 'refunded')),
    shipping_address JSON,
    billing_address JSON,
    points_earned INTEGER DEFAULT 0,
    promo_code TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL, -- snapshot at time of order
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL, -- in cents
    total_price INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- DAILY WELLNESS & HEALTH TRACKING
-- ============================================================================

-- Daily wellness logs
CREATE TABLE IF NOT EXISTS daily_wellness (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    wellness_score INTEGER, -- 0-100
    water_intake REAL, -- liters
    water_goal REAL DEFAULT 2.5,
    steps INTEGER,
    steps_goal INTEGER DEFAULT 10000,
    sleep_hours REAL,
    sleep_quality TEXT CHECK(sleep_quality IN ('poor', 'fair', 'good', 'excellent')),
    calories_consumed INTEGER,
    calories_goal INTEGER,
    mood TEXT CHECK(mood IN ('very_bad', 'bad', 'neutral', 'good', 'excellent')),
    energy_level INTEGER, -- 1-10
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Daily tasks
CREATE TABLE IF NOT EXISTS daily_tasks (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_type TEXT NOT NULL, -- e.g., 'medication', 'water', 'exercise', 'log_weight'
    title TEXT NOT NULL,
    description TEXT,
    points_reward INTEGER DEFAULT 0,
    scheduled_time TIME,
    is_recurring BOOLEAN DEFAULT TRUE,
    recurrence_pattern TEXT, -- 'daily', 'weekly', 'custom'
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Task completions
CREATE TABLE IF NOT EXISTS task_completions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL REFERENCES daily_tasks(id) ON DELETE CASCADE,
    completed_date DATE NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    points_earned INTEGER DEFAULT 0,
    UNIQUE(user_id, task_id, completed_date)
);

-- Health metrics log (from devices or manual entry)
CREATE TABLE IF NOT EXISTS health_metrics (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL, -- 'heart_rate', 'blood_pressure', 'weight', 'glucose', etc.
    value REAL NOT NULL,
    value_secondary REAL, -- for BP (diastolic)
    unit TEXT NOT NULL,
    source TEXT DEFAULT 'manual', -- 'manual', 'apple_watch', 'withings', etc.
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- ============================================================================
-- APPOINTMENTS & CONSULTATIONS
-- ============================================================================

-- Doctor profiles
CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    name TEXT NOT NULL,
    title TEXT,
    specialization TEXT NOT NULL,
    subspecialties JSON,
    qualifications JSON,
    languages JSON,
    experience_years INTEGER,
    location TEXT,
    consultation_fee INTEGER, -- in cents
    video_fee INTEGER,
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    avatar TEXT,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    patient_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id TEXT NOT NULL REFERENCES doctors(id),
    appointment_type TEXT DEFAULT 'video' CHECK(appointment_type IN ('video', 'in_person', 'phone')),
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'canceled', 'no_show')),
    video_room_id TEXT,
    video_room_url TEXT,
    notes TEXT,
    patient_notes TEXT,
    doctor_notes TEXT,
    fee_paid INTEGER,
    points_earned INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FAMILY HEALTH HUB
-- ============================================================================

-- Family groups
CREATE TABLE IF NOT EXISTS family_groups (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT DEFAULT 'My Family',
    shared_points_pool INTEGER DEFAULT 0,
    max_members INTEGER DEFAULT 4,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Family members
CREATE TABLE IF NOT EXISTS family_members (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    family_group_id TEXT NOT NULL REFERENCES family_groups(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    relationship TEXT, -- 'spouse', 'child', 'parent', 'sibling', 'other'
    date_of_birth DATE,
    avatar TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    can_view_health BOOLEAN DEFAULT TRUE,
    can_book_appointments BOOLEAN DEFAULT TRUE,
    invited_email TEXT,
    invitation_status TEXT DEFAULT 'pending' CHECK(invitation_status IN ('pending', 'accepted', 'declined')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- REFERRALS & AFFILIATE
-- ============================================================================

-- Referral codes
CREATE TABLE IF NOT EXISTS referral_codes (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    reward_points INTEGER DEFAULT 1000,
    reward_credit INTEGER DEFAULT 5000, -- €50 in cents
    usage_count INTEGER DEFAULT 0,
    max_uses INTEGER DEFAULT -1, -- -1 = unlimited
    is_active BOOLEAN DEFAULT TRUE,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    referrer_id TEXT NOT NULL REFERENCES users(id),
    referred_id TEXT NOT NULL REFERENCES users(id),
    referral_code_id TEXT NOT NULL REFERENCES referral_codes(id),
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'converted', 'rewarded')),
    converted_at DATETIME,
    rewarded_at DATETIME,
    points_awarded INTEGER DEFAULT 0,
    credit_awarded INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(referred_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_tier ON users(tier);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_user ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_daily_wellness_user_date ON daily_wellness(user_id, date);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_type ON health_metrics(user_id, metric_type);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_task_completions_user_date ON task_completions(user_id, completed_date);

-- ============================================================================
-- INITIAL DATA - ACHIEVEMENTS
-- ============================================================================

INSERT OR IGNORE INTO achievements (id, name, description, icon, category, points_reward, requirement_type, requirement_value) VALUES
('first-steps', 'First Steps', 'Complete your first health log', 'star', 'onboarding', 50, 'tasks_completed', 1),
('health-hero', 'Health Hero', 'Complete 7 daily tasks', 'heartbeat', 'engagement', 100, 'tasks_completed', 7),
('week-warrior', 'Week Warrior', 'Maintain a 7-day streak', 'calendar-check', 'streak', 200, 'streak', 7),
('consistency-king', 'Consistency King', 'Maintain a 30-day streak', 'crown', 'streak', 1000, 'streak', 30),
('point-collector', 'Point Collector', 'Earn 1,000 SelectPoints', 'coins', 'points', 100, 'points_total', 1000),
('gold-member', 'Gold Member', 'Reach Gold tier status', 'medal', 'tier', 500, 'tier_reached', 5000),
('social-butterfly', 'Social Butterfly', 'Refer 3 friends', 'user-plus', 'referral', 500, 'referrals', 3),
('early-bird', 'Early Bird', 'Log health data before 8 AM for 7 days', 'sun', 'engagement', 150, 'early_logs', 7),
('night-owl', 'Night Owl', 'Complete evening medication 14 days in a row', 'moon', 'medication', 200, 'med_streak', 14),
('recovery-champion', 'Recovery Champion', 'Reach 75% recovery progress', 'trophy', 'recovery', 500, 'recovery_percent', 75);
