-- Vulture Security Services — database schema
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

-- ---------------------------------------------------------------------------
-- leads: contact form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null,
  last_name   text,
  email       text not null,
  phone       text,
  message     text not null,
  source      text,
  user_agent  text,
  handled     boolean not null default false,
  notes       text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- No public policies at all. The website writes leads with the service-role
-- key from a server action, which bypasses RLS. Signed-in staff read them.
drop policy if exists "authenticated read leads" on public.leads;
create policy "authenticated read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated update leads" on public.leads;
create policy "authenticated update leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- posts: News & Updates
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  content       text not null default '',
  cover_image   text,
  author        text default 'Vulture Security Services',
  published     boolean not null default false,
  published_at  timestamptz
);

create index if not exists posts_published_idx
  on public.posts (published, published_at desc);

alter table public.posts enable row level security;

-- Anyone can read published posts.
drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
  on public.posts for select
  to anon, authenticated
  using (published = true);

-- Signed-in staff can read everything, including drafts.
drop policy if exists "authenticated read all posts" on public.posts;
create policy "authenticated read all posts"
  on public.posts for select
  to authenticated
  using (true);

drop policy if exists "authenticated write posts" on public.posts;
create policy "authenticated write posts"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated update posts" on public.posts;
create policy "authenticated update posts"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated delete posts" on public.posts;
create policy "authenticated delete posts"
  on public.posts for delete
  to authenticated
  using (true);
