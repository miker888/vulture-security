-- Leads table, identical to the one in the shared virus-demos project (see the
-- Aspire repo). Only needed if Vulture moves to its own Supabase project.
-- Every row is tagged with the site that sent it, e.g. 'vulture-security'.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  site        text not null check (site ~ '^[a-z0-9][a-z0-9-]{1,59}$'),
  name        text not null check (char_length(name) between 1 and 200),
  email       text not null check (char_length(email) <= 320 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       text check (char_length(phone) <= 40),
  interest    text check (char_length(interest) <= 120),
  message     text check (char_length(message) <= 4000),
  source_url  text check (char_length(source_url) <= 500),
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

comment on table public.leads is 'Form submissions from demo and client websites, tagged by site.';

create index if not exists leads_site_created_at_idx on public.leads (site, created_at desc);

-- Visitors can submit a lead but can never read, change or delete one.
alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert (site, name, email, phone, interest, message, source_url) on table public.leads to anon, authenticated;

drop policy if exists "Visitors can submit leads" on public.leads;
create policy "Visitors can submit leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (status = 'new');
