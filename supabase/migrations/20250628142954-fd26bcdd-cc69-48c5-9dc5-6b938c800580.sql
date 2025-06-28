
-- Create admin_users table for role-based access control
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can insert admin users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create cheap_firms reference table
CREATE TABLE public.cheap_firms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id UUID REFERENCES public.propfirms(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(firm_id)
);

-- Create top_firms reference table
CREATE TABLE public.top_firms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id UUID REFERENCES public.propfirms(id) ON DELETE CASCADE NOT NULL,
  rank INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(firm_id),
  UNIQUE(rank)
);

-- Enable RLS on all tables with public read access
ALTER TABLE public.cheap_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.top_firms ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can view cheap firms" 
  ON public.cheap_firms 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view top firms" 
  ON public.top_firms 
  FOR SELECT 
  USING (true);

-- Admin write policies for cheap_firms
CREATE POLICY "Admins can manage cheap firms" 
  ON public.cheap_firms 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Admin write policies for top_firms
CREATE POLICY "Admins can manage top firms" 
  ON public.top_firms 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Admin write policies for propfirms
CREATE POLICY "Anyone can view propfirms" 
  ON public.propfirms 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage propfirms" 
  ON public.propfirms 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Admin write policies for reviews
CREATE POLICY "Anyone can view reviews" 
  ON public.reviews 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage reviews" 
  ON public.reviews 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Admin write policies for account_sizes
CREATE POLICY "Anyone can view account sizes" 
  ON public.account_sizes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage account sizes" 
  ON public.account_sizes 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Enable realtime for all tables
ALTER TABLE public.propfirms REPLICA IDENTITY FULL;
ALTER TABLE public.reviews REPLICA IDENTITY FULL;
ALTER TABLE public.account_sizes REPLICA IDENTITY FULL;
ALTER TABLE public.cheap_firms REPLICA IDENTITY FULL;
ALTER TABLE public.top_firms REPLICA IDENTITY FULL;
ALTER TABLE public.admin_users REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.propfirms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.account_sizes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cheap_firms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.top_firms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_users;
