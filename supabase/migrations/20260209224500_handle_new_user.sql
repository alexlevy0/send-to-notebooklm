-- 1. Make email nullable for anonymous users
ALTER TABLE public.users ALTER COLUMN email DROP NOT NULL;

-- 2. Create Trigger Function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, tier)
  VALUES (
    NEW.id,
    NEW.email, -- Can be null for anonymous
    'free'
  );
  RETURN NEW;
END;
$$;

-- 3. Create Trigger
-- Drop if exists to avoid errors on multiple runs
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Backfill existing users (if any anonymous users were already created but missing in public)
INSERT INTO public.users (id, email, tier)
SELECT id, email, 'free'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;
