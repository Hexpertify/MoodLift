-- Migration: create consultants table
-- Run this in Supabase SQL editor or with supabase CLI

CREATE TABLE public.consultants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  title text,
  picture_url text,
  booking_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Optional: grant select/insert/update/delete to authenticated role if using RLS
-- GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultants TO authenticated;
