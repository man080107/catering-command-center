-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Admins can read user_roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image_url TEXT,
  website_url TEXT,
  order_url TEXT,
  instagram_url TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible brands" ON public.brands FOR SELECT USING (is_visible = true);
CREATE POLICY "Admins can do anything with brands" ON public.brands FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Menu items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  price_label TEXT,
  min_pax INTEGER,
  courses INTEGER,
  image_url TEXT,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  is_seasonal BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read available menu items" ON public.menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Admins can manage menu items" ON public.menu_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Inquiries table
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_type TEXT,
  pax INTEGER,
  event_date DATE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible testimonials" ON public.testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Site content table
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();