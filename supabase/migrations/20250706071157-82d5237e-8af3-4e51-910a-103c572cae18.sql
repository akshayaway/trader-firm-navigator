-- Create admin user and grant admin access
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  'immortalwar777@gmail.com',
  crypt('Hanuman@543', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO UPDATE SET
  encrypted_password = crypt('Hanuman@543', gen_salt('bf')),
  updated_at = now();

-- Insert or update user profile with admin access
INSERT INTO public.user_profiles (
  id,
  user_id,
  email,
  is_admin,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  auth_user.id,
  'immortalwar777@gmail.com',
  true,
  now(),
  now()
FROM auth.users auth_user
WHERE auth_user.email = 'immortalwar777@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
  is_admin = true,
  email = 'immortalwar777@gmail.com',
  updated_at = now();