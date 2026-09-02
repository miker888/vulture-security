# Vulture Security Services

Marketing site for Vulture Security Services Ltd., Calgary. Replaces the Wix site at vulturesecurity.ca.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Supabase (Postgres + Auth) · Vercel

## What's in here

| Route | What it is |
| --- | --- |
| `/` | One-page marketing site: hero, about, services, partners, latest news, contact form |
| `/blog` | News & Updates listing |
| `/blog/[slug]` | Individual post, Markdown rendered |
| `/admin` | Login-protected dashboard: write posts, read contact form enquiries |
| `/admin/login` | Supabase email + password sign-in |

Contact form submissions are written to a Supabase `leads` table by a server action using the service-role key, so the public can submit but nobody can read the table without signing in. An optional Resend email fires on each submission; if it fails, the lead is still saved.

Site copy, services, contact details and partner logos live in one file: **`src/lib/site.ts`**. Edit there, not in the components.

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. SQL Editor → New query → paste `supabase/schema.sql` → Run.
3. Same again with `supabase/seed.sql` to import the post migrated off Wix.
4. Authentication → Users → **Add user** → create your own email + password. This is the `/admin` login. Turn off public sign-ups under Authentication → Providers so nobody else can register.
5. Project Settings → API → copy the Project URL, the `anon` key, and the `service_role` key.

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in the three Supabase values. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be committed or prefixed with `NEXT_PUBLIC_`.

### 3. Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

### 4. Deploy

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo → deploy. No build settings to change.
3. Vercel → Settings → Environment Variables → paste the same values from `.env.local`.
4. Redeploy. You now have a live preview URL.
5. Only once the preview looks right: Vercel → Settings → Domains → add `vulturesecurity.ca` and `www.vulturesecurity.ca`, then update the DNS records at your registrar as Vercel instructs.
6. Keep Wix running until DNS has propagated and the new site is verified, then cancel it.

Every push to `main` deploys automatically. Every branch gets its own preview URL.

## Images

`public/images/` currently holds **generated placeholders** marked `REPLACE:`. Export the originals from Wix (Wix Dashboard → Media Manager → select → Download) and overwrite these files, keeping the same names:

| File | Used for |
| --- | --- |
| `logo.png` | Header wordmark (transparent PNG, roughly 420×110) |
| `shield.png` | Hero shield crest (transparent PNG) |
| `hero.jpg` | Hero background, 1920×1080 or larger |
| `about-guard.jpg` | About section portrait, tall crop |
| `service-static.jpg` | Static Security card |
| `service-loss-prevention.jpg` | Loss Prevention card |
| `service-event.jpg` | Event Security card |
| `service-vip.jpg` | VIP Escort card |
| `partners/minto.png` | Community partner logo |

## Writing posts

Sign in at `/admin`, click **New post**. The body accepts Markdown:

```
## Section heading
**bold**  ·  *italic*  ·  [link](https://example.com)
- bullet
> pull quote
```

Leave **Published** unchecked to save a draft. Published posts appear on `/blog` and in the "News & Updates" block on the home page within five minutes.

## Notes

- `src/proxy.ts` is the Next.js 16 replacement for `middleware.ts`. It refreshes the Supabase session cookie and redirects unauthenticated visitors away from `/admin`.
- Poppins is self-hosted from `src/fonts/`. No requests to Google Fonts at build or run time.
- `/admin` is excluded from `robots.txt` and the sitemap.
