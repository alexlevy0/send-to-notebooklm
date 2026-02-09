-- Fonction sécurisée pour incrémenter l'usage
-- Utilise auth.uid() contextuel, pas de paramètres
CREATE OR REPLACE FUNCTION increment_capture_count()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- 1. Get User
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- 2. Insert/Update Usage
  INSERT INTO daily_usage (user_id, date, captures_count)
  VALUES (v_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET captures_count = daily_usage.captures_count + 1;
END;
$$;
