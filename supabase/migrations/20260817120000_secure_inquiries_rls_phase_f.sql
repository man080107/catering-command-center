-- Phase F: Revoke direct anonymous INSERT access to public.inquiries
-- Submissions are now routed exclusively through the secure notify-inquiry Edge Function using service role credentials.

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Service role inserts inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;

-- Ensure service role can insert inquiries
CREATE POLICY "Service role inserts inquiries" ON public.inquiries
  FOR INSERT TO service_role WITH CHECK (true);

-- Ensure admins can read and update inquiries
CREATE POLICY "Admins can read inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

