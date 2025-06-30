
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  excerpt text,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add missing columns to propfirms table
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS affiliate_link text;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS buy_now_url text;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS category_id uuid;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS evaluation_model text;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS starting_fee numeric DEFAULT 0;
ALTER TABLE public.propfirms ADD COLUMN IF NOT EXISTS funding_amount text;

-- Create user_profiles table for admin functionality
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  is_admin boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user_reviews table for anonymous reviews
CREATE TABLE public.user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id uuid REFERENCES public.propfirms(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  reviewer_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blog_posts
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for user_profiles
CREATE POLICY "Users can read their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert their profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_reviews
CREATE POLICY "Anyone can read reviews" ON public.user_reviews
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert reviews" ON public.user_reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage reviews" ON public.user_reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for propfirms (public read, admin write)
CREATE POLICY "Anyone can read propfirms" ON public.propfirms
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage propfirms" ON public.propfirms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for reviews table
CREATE POLICY "Anyone can read reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage reviews" ON public.reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for account_sizes
CREATE POLICY "Anyone can read account sizes" ON public.account_sizes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage account sizes" ON public.account_sizes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for cheap_firms and top_firms
CREATE POLICY "Anyone can read cheap firms" ON public.cheap_firms
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage cheap firms" ON public.cheap_firms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Anyone can read top firms" ON public.top_firms
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage top firms" ON public.top_firms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_propfirms_slug ON public.propfirms(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_user_reviews_firm_id ON public.user_reviews(firm_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON public.user_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_admin ON public.user_profiles(is_admin);
