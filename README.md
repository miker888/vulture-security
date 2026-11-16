# Vulture Security Services website

Marketing site for Vulture Security Services Ltd., Calgary. Replaces the Wix site at vulturesecurity.ca.
Set up the same way as the Aspire site:

- **Framework:** Next.js, exported as a static site (`out/`)
- **Hosting:** GitHub Pages at vulturesecurity.ca, deployed automatically on every push to `main`
- **Forms:** the contact form and the risk assessment form save to a Supabase `leads` table and email info@vulturesecurity.ca

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
The site is served at the root of **https://vulturesecurity.ca**.

- Repo Settings → Pages → Source: **GitHub Actions**, Custom domain: `vulturesecurity.ca`, **Enforce HTTPS** on.
- No `CNAME` file: GitHub ignores it when publishing with Actions.

### DNS (GoDaddy)

The domain's DNS is at GoDaddy. Email is Microsoft 365, also through GoDaddy.

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Website (GitHub Pages) |
| A | `@` | `185.199.109.153` | Website |
| A | `@` | `185.199.110.153` | Website |
| A | `@` | `185.199.111.153` | Website |
| CNAME | `www` | `miker888.github.io` | Website, www redirects to the bare domain |
| MX | `send` | from Resend | Lead alert email (Resend) |
| TXT | `send` | from Resend | Lead alert email (Resend) |
| TXT | `resend._domainkey` | from Resend | Lead alert email (Resend) |

Leave the Microsoft 365 records alone: the root `MX` (`...mail.protection.outlook.com`), the root `TXT`
records (`NETORG...onmicrosoft.com` and `v=spf1 include:secureserver.net -all`), `_dmarc`, `autodiscover`
and any other email entries.

## Email alerts for new leads

[`supabase/lead-alerts.sql`](supabase/lead-alerts.sql) adds a trigger in the shared virus-demos project:
every new lead with `site = 'vulture-security'` is emailed to info@vulturesecurity.ca through
[Resend](https://resend.com) (free plan: 3,000 emails a month, 100 a day). Alerts come from
`website@vulturesecurity.ca`, and replying goes straight to the visitor.

- The Resend API key lives encrypted in Supabase Vault (`vulture_resend_api_key`), never in this repo.
- If an email fails, the lead is still saved. Check sends with
  `select created, status_code, content::text from net._http_response order by created desc limit 5;`
- Turn alerts off with `drop trigger if exists email_vulture_lead on public.leads;`
