-- Add name and message columns to leads for contact form submissions.
-- Nullable so existing newsletter-only rows (no name/message) remain valid.
alter table public.leads
  add column if not exists name text,
  add column if not exists message text;
