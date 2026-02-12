-- 1. D'abord, on supprime l'ancienne version (celle qui n'avait pas de paramètre)
-- Cela évite d'avoir deux fonctions avec le même nom mais des signatures différentes.
DROP FUNCTION IF EXISTS increment_capture_count();

-- 2. Ensuite, on crée la nouvelle version qui accepte 'amount'
CREATE OR REPLACE FUNCTION increment_capture_count(amount integer DEFAULT 1)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Récupération de l'ID utilisateur via le contexte d'auth Supabase
  v_user_id := auth.uid();
  
  -- Sécurité : Si pas connecté, on arrête tout
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Upsert : On insère une nouvelle ligne pour aujourd'hui, 
  -- OU on met à jour le compteur si la ligne existe déjà.
  INSERT INTO daily_usage (user_id, date, captures_count)
  VALUES (v_user_id, CURRENT_DATE, amount)
  ON CONFLICT (user_id, date)
  DO UPDATE SET captures_count = daily_usage.captures_count + amount;
END;
$$;