-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'lifetime')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table daily_usage
CREATE TABLE daily_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  captures_count INTEGER DEFAULT 0 CHECK (captures_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Index pour performance
CREATE INDEX idx_daily_usage_user_date ON daily_usage(user_id, date DESC);
CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);

-- Vue monthly_usage
CREATE VIEW monthly_usage AS
SELECT 
  user_id,
  DATE_TRUNC('month', date)::DATE as month,
  SUM(captures_count) as total_captures
FROM daily_usage
GROUP BY user_id, DATE_TRUNC('month', date);

-- Fonction pour incrémenter l'usage de manière atomique
CREATE OR REPLACE FUNCTION increment_usage(p_user_id UUID, p_date DATE)
RETURNS VOID AS $$
BEGIN
  INSERT INTO daily_usage (user_id, date, captures_count)
  VALUES (p_user_id, p_date, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    captures_count = daily_usage.captures_count + 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;

-- Policy : Users peuvent lire leurs propres données
CREATE POLICY users_select_own ON users
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY daily_usage_select_own ON daily_usage
  FOR SELECT 
  USING (user_id = auth.uid());

-- Policy : Service role peut tout faire
CREATE POLICY users_service_all ON users
  FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY daily_usage_service_all ON daily_usage
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Insérer un utilisateur de test
INSERT INTO users (email, tier) 
VALUES ('test@example.com', 'free');
