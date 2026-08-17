-- Non-destructive migration for anti-spam tracking columns and rate limiting

-- 1. Add spam tracking columns to public.inquiries safely
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS spam_reason TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- 2. Create database-backed rate limit table for persistent tracking across edge function instances
CREATE TABLE IF NOT EXISTS public.inquiry_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  request_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiry_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow service role full access to rate limits table
CREATE POLICY "Service role manages rate limits" ON public.inquiry_rate_limits
  FOR ALL TO service_role USING (true);

-- Create index for fast rate limit queries
CREATE INDEX IF NOT EXISTS idx_inquiry_rate_limits_ip_window ON public.inquiry_rate_limits(ip_address, window_start);
