-- Add unique constraint to user_profiles if not exists
DO $$ 
BEGIN
    ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);
EXCEPTION 
    WHEN duplicate_object THEN null;
END $$;

-- Create trigger to automatically grant admin access to specific email
CREATE OR REPLACE FUNCTION public.handle_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the admin email
  IF NEW.email = 'immortalwar777@gmail.com' THEN
    -- Insert or update profile with admin access
    INSERT INTO public.user_profiles (user_id, email, is_admin, created_at, updated_at)
    VALUES (NEW.id, NEW.email, true, now(), now())
    ON CONFLICT (user_id) DO UPDATE SET
      is_admin = true,
      email = NEW.email,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_user();