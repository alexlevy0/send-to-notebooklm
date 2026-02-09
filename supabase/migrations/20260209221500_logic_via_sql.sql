-- Fonction check_limit (Remplace Edge Function)
-- Gère la logique Free/Pro directement dans la DB
-- Retourne JSON pour compatibilité facile

CREATE OR REPLACE FUNCTION check_limit()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_tier TEXT;
  v_daily_limit INT;
  v_monthly_limit INT;
  v_today_count INT;
  v_monthly_count INT;
BEGIN
  -- 1. Get User
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('error', 'Unauthorized');
  END IF;

  -- 2. Get Tier
  SELECT tier INTO v_tier FROM users WHERE id = v_user_id;
  v_tier := COALESCE(v_tier, 'free');

  -- 3. Set Limits
  IF v_tier = 'free' THEN
    v_daily_limit := 10;
    v_monthly_limit := 200;
  ELSE
    v_daily_limit := 999999999; -- Infinity
    v_monthly_limit := 999999999;
  END IF;

  -- 4. Get Usage
  -- Daily
  SELECT COALESCE(SUM(captures_count), 0) INTO v_today_count
  FROM daily_usage
  WHERE user_id = v_user_id AND date = CURRENT_DATE;

  -- Monthly
  SELECT COALESCE(SUM(captures_count), 0) INTO v_monthly_count
  FROM daily_usage
  WHERE user_id = v_user_id AND date >= DATE_TRUNC('month', CURRENT_DATE);

  -- 5. Check Limits
  IF v_today_count >= v_daily_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'daily_limit',
      'isPro', (v_tier != 'free'),
      'resetAt', (CURRENT_DATE + 1)::TEXT
    );
  END IF;

  IF v_monthly_count >= v_monthly_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'monthly_limit',
      'isPro', (v_tier != 'free'),
      'resetAt', (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')::DATE::TEXT
    );
  END IF;

  -- 6. Success
  RETURN jsonb_build_object(
    'allowed', true,
    'isPro', (v_tier != 'free'),
    'remaining', jsonb_build_object(
      'daily', v_daily_limit - v_today_count,
      'monthly', v_monthly_limit - v_monthly_count
    )
  );
END;
$$;

-- Note: increment_usage existe déjà dans le schema initial
