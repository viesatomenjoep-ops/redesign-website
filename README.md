# Viesa Automations — website

Next.js 15 (App Router) rebuild of the Claude Design prototype. Dutch-language
marketing site: landing page, 6 service detail pages, cases index + 7 case
detail pages.

See [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) for the full plan,
design tokens, and open questions.

## Stack

- Next.js 15 · React 19 · TypeScript (strict)
- Tailwind CSS v4 (tokens in `src/app/globals.css` `@theme`)
- Radix UI (contact dialog, FAQ accordion) · Embla (carousels) · lucide-react
- Custom lightweight motion primitives (`src/components/motion/*`), all
  reduced-motion aware
- Hardcoded typed content in `src/content/*` (Zod-validated)
- Contact form → `/api/contact` route handler → Resend (env-guarded) + optional
  n8n webhook
- Reviews section pulls live Google reviews via the Places API (New), server-side
  and cached 24h, with `src/content/reviews.ts` as the fallback. See
  [`GOOGLE_REVIEWS_PLAN.md`](./GOOGLE_REVIEWS_PLAN.md).
- **"Vraag gratis audit aan"** → Cal.com embed (`@calcom/embed-react`), loaded on
  click; optional booking webhook at `/api/cal/webhook`. See
  [`CALCOM_INTEGRATION_PLAN.md`](./CALCOM_INTEGRATION_PLAN.md).
- Vercel Analytics + Speed Insights

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open http://localhost:3000.

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`,
`pnpm format`.

## Required: copy prototype assets

The components reference images at `/uploads/...`. Copy the prototype's asset
folder into `public/`:

```bash
cp -R "~/Downloads/Landing page setup progress (2)/uploads" public/uploads
```

### Assets still missing (add before launch)

These are referenced by the code but are **not** in the prototype export:

| Path | What |
|---|---|
| `public/uploads/tech-react.svg` | React logo (was `cdn.simpleicons.org`) |
| `public/uploads/tech-postgresql.svg` | PostgreSQL logo (was `cdn.simpleicons.org`) |
| `public/uploads/tech-claude.svg` | Claude logo (was `cdn.simpleicons.org`) |
| `public/uploads/portret-tom.jpg` | Founder portrait (Tom) — was a fillable slot |
| `public/uploads/portret-joep.jpg` | Founder portrait (Joep) — was a fillable slot |

Grab the three logos from the [`simple-icons`](https://simpleicons.org) package
or download the SVGs. Portraits need to come from the client.

## Project layout

```
src/
  app/
    layout.tsx                    root shell, fonts, analytics, contact provider
    page.tsx                      landing page
    diensten/[slug]/page.tsx      service detail (static params)
    cases/page.tsx                portfolio grid
    cases/[slug]/page.tsx         case detail (static params)
    api/contact/route.ts          form handler (Resend + optional webhook)
    sitemap.ts robots.ts manifest.ts not-found.tsx error.tsx
    globals.css                   Tailwind v4 + design tokens + keyframes
  components/
    layout/    Header, MobileMenu, Footer, SiteChrome
    ui/        Button, Container, Eyebrow, SectionTile, Carousel, LucideIcon
    motion/    Reveal, Typewriter, CountUp, useReducedMotion
    contact/   ContactDialogProvider, ContactButton, ContactForm
    marketing/ Hero, Reviews, ClientMarquee, ServicesGrid, ServiceCardVisual,
               WhyViesa, TechStack, FeaturedCases, CaseCard, About, Faq, ContactCta
    seo/       json-ld helpers
  content/     services, cases, reviews, faq, tech, clients (+ schema.ts)
  lib/         site config, fonts, seo, utils (cn), contact-schema
```

## Deviations from the prototype (intentional, v1)

- **Hash routing + `localStorage` removed** — service/case detail pages use real
  routes with `generateStaticParams`.
- **`mailto:` submission replaced** — real form handler with validation, honeypot,
  and optional Cloudflare Turnstile.
- **Service-card animations simplified** — the 6 micro-visuals keep the concept
  (waveform, chat, flow graph, skeleton, KPI bars, checklist) with far less code.
  See `service-card-visual.tsx`.
- **Deferred:** the ROI calculator (dead code in the prototype), the scroll-driven
  "Mario" sprite, the 3D phone ring, and the two on-page photo carousels
  ("Achter de schermen" / "Work in action") — the last pending real photos.
- **Legal pages** (`/privacy`, `/cookies`) — not built yet; required for launch.

## Environment variables

See `.env.example`. With `RESEND_API_KEY` unset, `/api/contact` and
`/api/cal/webhook` validate and log the payload instead of sending — fine for
local dev.

For live Google reviews, set `GOOGLE_PLACES_API_KEY` (restricted to *Places API
New*, server-side only) and `GOOGLE_PLACE_ID`. Without them the reviews section
falls back to the curated snapshot in `src/content/reviews.ts`.

For the Cal.com booking button, set `NEXT_PUBLIC_CALCOM_LINK` to your
`<handle>/<event-slug>` and configure the event type (duration, booking
questions, brand colour `#E2603F`) in the Cal.com dashboard. Point a Cal.com
webhook at `/api/cal/webhook` with `CALCOM_WEBHOOK_SECRET` to mirror bookings
into the internal inbox / n8n. Details in `CALCOM_INTEGRATION_PLAN.md`.

## Status

Hand-written scaffold — **not yet run through `pnpm install` / `next build`**.
Expect a few small fixes on first boot (type nits, a Tailwind class here or
there). Work through `pnpm typecheck` then `pnpm build`.
