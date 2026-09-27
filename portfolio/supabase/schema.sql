-- Enquiries table.
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Free tier is more than enough: each enquiry is well under a kilobyte.

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null,
  email       text        not null,
  phone       text,
  company     text,
  message     text        not null,
  budget      text,
  timeline    text,
  locale      text        not null default 'en',
  read        boolean     not null default false
);

-- Newest-first is the only way the admin panel ever reads this.
create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);

-- Lock the table down completely.
--
-- RLS is enabled and NO policies are created, which means the anon and
-- authenticated roles can do nothing at all. Only the service-role key can
-- read or write, and that key lives exclusively in server-side environment
-- variables. If the anon key ever leaks, no enquiry is exposed.
alter table public.enquiries enable row level security;

-- Verify after running:
--   select * from public.enquiries;          -- works in the SQL editor
--   (the anon key returns zero rows and an RLS error, which is correct)
