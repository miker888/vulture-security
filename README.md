# Vulture Security Services website

Marketing site for Vulture Security Services Ltd., Calgary. Replaces the Wix site at vulturesecurity.ca.
Set up the same way as the Aspire site:

- **Framework:** Next.js, exported as a static site (`out/`)
- **Hosting:** GitHub Pages, deployed automatically on every push to `main`
- **Forms:** the contact form and the risk assessment form save to a Supabase `leads` table

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, services, who we protect, how we show up, our standard, partners, contact |
| `/risk-assessment/` | Free risk assessment request, a 3-step form |
| `/blog/` | News & Updates. Appears in the menu once a post is published |

## Editing content

- Copy, services, contact details, form options and partner logos: [`src/lib/site.ts`](src/lib/site.ts)
- Images: `src/assets/` (imported in code so they work under the GitHub Pages base path)
- Anything in `[brackets]` is a placeholder, e.g. the licence number in the footer

## News & Updates posts

Posts are Markdown files in [`src/content/posts/`](src/content/posts). Add a file, push to `main`, and the site rebuilds.
Each file starts with:

```
---
title: Post title
excerpt: One or two sentences for listings and search results.
date: 2026-05-13
author: Vulture Security Services
draft: false
---
```

`draft: true` keeps a post out of the site. The post migrated from Wix is a draft until the ranked table of
ten communities is pasted in where the `TODO` is.

## Leads (Supabase)

Both forms insert into `public.leads` in the shared **virus-demos** Supabase project, the same one Aspire uses.
Every row is tagged `site = 'vulture-security'`. Visitors can insert rows but never read them.

- Contact form rows have `interest = 'General enquiry'`
- Risk assessment rows have `interest = 'Free risk assessment'`, with property type, services, coverage, start date,
  address, company and preferred contact in `message`

To see leads: Supabase dashboard → virus-demos → Table Editor → `leads` → filter `site` = `vulture-security`.

The URL and publishable key in `.env.production` are browser-safe values meant to be public.
Never put a secret or service-role key in this repo. To move Vulture to its own Supabase project later, run
[`supabase/leads.sql`](supabase/leads.sql) in that project and swap the two values in `.env.production`.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: .env.production already points at the shared project
npm run dev                  # http://localhost:3000
```

`npm run build` writes the static site to `out/`, and `npm run preview` serves it.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

1. Repo Settings → Pages → Source: **GitHub Actions**.
2. GitHub Pages on a free account only works for **public** repos (Aspire is public). Either make this repo public
   or use GitHub Pro.

The preview lives at `https://miker888.github.io/vulture-security/`.

### Moving vulturesecurity.ca off Wix

Only once the preview is approved:

1. Add `public/CNAME` containing `vulturesecurity.ca`.
2. In the workflow, delete `NEXT_PUBLIC_BASE_PATH` and set `NEXT_PUBLIC_SITE_URL: https://vulturesecurity.ca`. Push.
3. Repo Settings → Pages → Custom domain: `vulturesecurity.ca`.
4. At the domain registrar, point the apex at GitHub Pages with four A records
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` with a CNAME to
   `miker888.github.io`. **Leave the MX records alone** so info@vulturesecurity.ca keeps working.
5. When the certificate is issued, tick **Enforce HTTPS**.
6. Keep Wix running until the new site is live on the domain, then cancel it. If the domain itself is registered
   through Wix, transfer it to a registrar first.
