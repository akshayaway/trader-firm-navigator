-- Add unique constraint to user_profiles if not exists
ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);

-- Create admin user in auth.users (Supabase managed table)
-- Note: We cannot directly insert into auth.users, so we'll create the profile for existing user

-- Insert admin profile for the user (assuming they sign up normally first)
-- This will be activated when the user signs up with this email
INSERT INTO public.user_profiles (
  user_id,
  email,
  is_admin,
  created_at,
  updated_at
) VALUES (
  -- Use a placeholder UUID that will be updated when user actually signs up
  '00000000-0000-0000-0000-000000000000',
  'immortalwar777@gmail.com',
  true,
  now(),
  now()
);

-- Create trigger to automatically grant admin access to this specific email
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