DROP POLICY "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries 
  FOR INSERT WITH CHECK (
    length(name) > 0 AND length(phone) > 0
  );