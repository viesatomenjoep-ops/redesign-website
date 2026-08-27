# Viesa Automations — Website Implementation Plan

Rebuild the Claude Design prototype as a production Next.js site.

- **Source of truth:** `~/Downloads/Landing page setup progress (2)/` — four `.dc.html` templates plus `uploads/` assets.
- **Target stack:** Next.js (App Router) + React + TypeScript + Tailwind, deployed on Vercel.
- **Status:** planning only. No code written yet.

---

## 1. What the design actually is

The prototype is a **Claude Design Canvas** export. Each `*.dc.html` file is a single screen written as an `<x-dc>` template with `{{ }}` bindings, `sc-for` / `sc-if` control tags, `style-hover` attributes, and a `class Component extends DCLogic` script block. `support.js` is the generated DC runtime (a React-based interpreter) and `image-slot.js` is a canvas-only `<image-slot>` web component for drag-and-drop placeholder images.

**None of `support.js`, `image-slot.js`, the `<x-dc>` wrapper, or the `.dc.html` structure ships to production.** They are the prototyping harness. We keep: the markup structure, the CSS, the copy, the data arrays, the interaction logic, and the assets.

### Pages / routes

| Prototype file | Production route | Notes |
|---|---|---|
| `Viesa Landing Page.dc.html` | `/` | The main page. ~12 sections. |
| `Service Detail.dc.html` | `/diensten/[slug]` | 6 services, currently hash-routed (`#ai-calling-agents`). |
| `Cases.dc.html` | `/cases` | Portfolio grid, 7 cases. |
| `Case Detail.dc.html` | `/cases/[slug]` | 7 cases, currently hash-routed + `localStorage` slug handoff. |

Detail pages will use real dynamic routes with `generateStaticParams` and `generateMetadata`. Drop the hash routing and the `localStorage.setItem('viesa_case_slug', …)` handoff entirely.

### Landing page section inventory

1. **Fixed header / nav** — transparent navy over the hero, swaps to a light "scrolled" theme via `body.vz-scrolled` past 60px. Google-rating pill, Diensten / Cases / Contact links, CTA button, hamburger < 900px.
2. **Hero** — fluid `clamp()` H1 + subhead with a **typewriter** intro animation; right column is an animated numbered index of the 4 service pillars (row highlight loop).
3. **Hero meta strip** — mono keyword line, "EST. 2024".
4. **Testimonial tile** — Google-reviews block: 15 reviews, carousel of 5 pages × 3 cards, click-to-expand card text; "Achter de schermen" photo carousel (4 fillable slots); a client-testimonial quote with typewriter.
5. **Diensten tile** — client-logo **marquee** (infinite scroll) + 6 service cards, each with a **bespoke CSS/SVG micro-animation** (call waveform, chat bubbles, integration flow graph, website skeleton loader, KPI bars + line chart, portal checklist). Each card links to `/diensten/[slug]`.
6. **Waarom Viesa tile** — 3 overlapping circular cards + a "Work in action" photo carousel (3 fillable slots).
7. **Tech stack tile** — infinite "train" marquee of tech logos (Kotlin, Java, TS, Next.js, React, Node, PostgreSQL, n8n) + an "AI Studio" row (OpenAI, Claude, n8n). Scroll-driven "Mario" sprite animation using `animation-timeline: view()` (Chromium-only, ≥ 981px).
8. **Featured cases tile** — 2-up carousel, 5 cards, links to `/cases`.
9. **Over ons tile** — founder portraits Tom & Joep (fillable slots), company story copy, "Gebouwd in Breda".
10. **FAQ tile** — single-open accordion, 10 items.
11. **Contact CTA section** — "Gratis audit" form (name / email / website) — **visual only**, opens the contact modal.
12. **Footer** — contact details (email, phone, KVK, Breda), sitemap, Instagram, "SIMPLICITY, AUTOMATED."
13. **Contact modal** — email + message, submits by building a `mailto:` link.

### Cross-cutting interaction logic (from the `DCLogic` scripts)

- Contact modal open/close (+ open from mobile menu), backdrop click, `stopPropagation`.
- Mobile menu toggle.
- FAQ accordion — one open at a time (`faqOpen` index).
- Carousels — reviews (`reviewPage` 0–4), "achter de schermen" photos (`photoPage` 0–3), "work in action" photos (`actiePage` 0–2), cases (`casePage` 0–3). Each: prev/next + `n / total` label, `translateX` transform.
- Review card expand — toggles `.vz-review-open` class.
- Typewriter — hero title + subhead on load; about, testimonial, strategy paragraphs on scroll-in (IntersectionObserver).
- Reveal-on-scroll — `[data-rv]` elements fade + translateY via IntersectionObserver.
- Count-up — `[data-countup]` elements animate to a number on scroll-in.
- Scroll nav — toggles `body.vz-scrolled`; scales the logo marquee based on scroll position.
- Detail pages — `hashchange` → select service/case by slug.
- **Dead code to note:** `renderVals()` on the landing page exposes an ROI calculator (`roiHours`, `roiPeople`, `roiRate` → weekly/yearly savings) but there is **no markup for it**. Decide: build it as a lead magnet, or drop it (see Open Questions).

---

## 2. Design tokens

Pull these into the Tailwind theme (`@theme` in Tailwind v4) as the single source of truth. Values are lifted directly from the prototype's inline styles.

### Color

| Token | Value | Use |
|---|---|---|
| `navy` / bg | `#19445B` | Page background, nav, dark sections |
| `navy-800` | `#123243` | Footer |
| `navy-700` | `#1B4F63` | Card surfaces on navy |
| `ink` | `#111D36` | Near-black headings on cream |
| `ink-soft` | `#22334D` | Scrolled-nav text |
| `paper` | `#F3F0E9` | Cream sections / tiles, light buttons |
| `paper-2` | `#F7F5EF` / `#FBFAF5` | Inset panels inside service cards |
| `coral` | `#E2603F` | Primary accent, links-hover, CTAs |
| `coral-grad` | `#EE9A66 → #E2603F` (150deg) | Icon chips, some CTAs |
| `coral-bright` | `#FF9169` | Animation highlights |
| `border-light` | `#E4E1D8` | Card borders on cream |
| `border-dark` | `rgba(243,240,233,.09)` | Borders on navy |
| `muted` | `#AAB6C9`, `#8FA1BD`, `#8899B0`, `#C7CFDC` | Body/label text on navy |
| `muted-ink` | `#55617A` | Body text on cream |
| `star` | `#FBBC05` | Review stars |
| Google brand | `#4285F4 #34A853 #FBBC05 #EA4335` | Google-reviews badge only |

Contrast risk: `#8899B0` / `#8FA1BD` on `#19445B` is ~3:1 — fails WCAG AA for body text. Bump the darkest mutes during the a11y pass.

### Typography

- **Archivo** — headings + body, weights 400–900. Fluid sizes via `clamp()`, tight tracking (`-0.03em` to `-0.035em` on headings), `text-wrap: balance`.
- **IBM Plex Mono** — eyebrows / labels / metadata, weights 400–600, letter-spacing `.14em`–`.22em`, uppercase.
- **Outfit** — the "VIESA AUTOMATIONS" wordmark only.
- Loaded but essentially unused: **Oswald**, **Inter**, **Cormorant Garamond**. Drop them.
- A few decorative italic `&` glyphs use `Georgia, serif` inline — keep as a one-off utility class.

Move all fonts to `next/font` (self-hosted, `display: swap`, subset `latin`). Remove the three Google Fonts `<link>` tags.

### Radius / spacing / layout

- Radius: buttons `999px` (pill); cards `16–24px`; **section tiles `44px`**; modal `24px`; small chips `6–12px`.
- Containers: `max-width` `1160px` (content) / `1240px` (hero, footer) / `900px`–`760px` (text-heavy sections), `32px` side padding (`22px` < 620px).
- Section rhythm: ~`90–100px` vertical padding. Cream "tiles" sit on the navy background with `14px` margin + `44px` radius, creating an inset-card look.
- Breakpoints in the design: **900px** (nav → hamburger, multi-col grids → 1 col), **620px** (hide header CTA, tighten padding), **981px** min (Mario scroll animation), **860px** (why-circles stack).

### Motion

Heavy, and central to the brand ("SIMPLICITY, AUTOMATED"). Every animation in the prototype is already gated behind `@media (prefers-reduced-motion: reduce)` — preserve that discipline.

- Typewriter (hero, on-scroll paragraphs), reveal-on-scroll, count-up.
- Infinite marquees: client logos, tech "train".
- Per-service-card looping micro-animations (6 distinct ones).
- Scroll-linked: navbar theme swap, logo-marquee scaling, "Mario" sprite (`animation-timeline: view()`).
- 3D rotating phone "ring" (`ringSpin`, `perspective`) — CSS in the file; markup for it wasn't in the shipped hero, treat as optional.

---

## 3. Recommended stack

| Concern | Recommendation | Why |
|---|---|---|
| Framework | **Next.js 15, App Router, React 19, TypeScript (strict)** | Requested; static-first marketing site, per-route metadata, image optimization, `generateStaticParams`. |
| Package manager / Node | **pnpm**, Node 20 LTS, `.nvmrc` + `packageManager` field | Fast, disk-efficient, deterministic. |
| Styling | **Tailwind CSS v4** with `@theme` tokens | Prototype is token-heavy inline styles → maps 1:1 to a Tailwind theme. Keeps CSS co-located, no naming overhead. Bespoke keyframes live in a small `globals.css` / per-component `*.module.css`. |
| UI primitives | **Radix UI** (Dialog for contact modal, Accordion for FAQ, optional NavigationMenu) via **shadcn/ui** | Free accessibility: focus trap, ESC, ARIA, keyboard. |
| Carousel | **Embla Carousel** (`embla-carousel-react`) | Replaces four hand-rolled `translateX` carousels; touch/drag, keyboard, a11y, snap points. Keep the `n / total` label + arrow buttons. |
| Animation | **Motion** (`motion` / framer-motion) for reveal + typewriter + count-up; **plain CSS** for marquees and the looping card visuals | JS only where it needs orchestration; CSS for anything that can be CSS. All wrapped in a `useReducedMotion` guard. |
| Icons | **lucide-react** | Replaces the `unpkg.com/lucide@latest` runtime script + `data-lucide` + `createIcons()` calls. |
| Tech/brand logos | **`simple-icons`** package or local SVGs in `/public/logos` | Removes remote `cdn.simpleicons.org` dependencies. |
| Images | **`next/image`** for all raster; import SVGs as components/static | AVIF/WebP, responsive `sizes`, no CLS. |
| Content | **Hardcoded typed TS content modules** in `/content` (`services.ts`, `cases.ts`, `reviews.ts`, `faq.ts`, `tech.ts`, `clients.ts`) with Zod schemas — **decided** | The prototype already externalizes this into arrays; port them verbatim. No CMS for now. Clean upgrade path to **Sanity** later if non-devs need to edit (schemas + a fetch layer swap; components stay the same). |
| Forms | **React Hook Form + Zod**, **Next Route Handler**, **Resend** for delivery, **Cloudflare Turnstile** + honeypot for spam | Replaces `mailto:`. One `<ContactForm>` shared by the modal and the audit section. Optionally also POST to an **n8n webhook** to fit their own automation stack / CRM. |
| SEO / structured data | Metadata API, `next/og` OG images, JSON-LD (`Organization`, `LocalBusiness` + `aggregateRating`, `Service`, `FAQPage`, `BreadcrumbList`), `sitemap.ts`, `robots.ts` | Their own copy sells "AEO/GEO" — structured data is on-brand and load-bearing. |
| Analytics | **Vercel Analytics + Speed Insights**, or **Plausible** (EU, cookieless) | Cookieless → no consent banner needed for analytics. |
| Hosting / CI | **Vercel** + GitHub; preview deploy per PR | Next-native; matches the stack they advertise. |
| Quality gates | ESLint + Prettier, `typescript` strict, **Playwright** smoke tests, **axe-core** in CI, **Lighthouse CI** (optional) | Catch a11y/regressions before prod. |
| Error monitoring | **Sentry** (optional, low volume) | Client + route-handler errors. |

### Other recommendations

- **Repo layout**

  ```
  app/
    layout.tsx                 # fonts, <body> shell, analytics
    page.tsx                   # landing
    diensten/[slug]/page.tsx
    cases/page.tsx
    cases/[slug]/page.tsx
    api/contact/route.ts
    sitemap.ts  robots.ts  opengraph-image.tsx
    not-found.tsx  error.tsx
  components/
    layout/     (Header, MobileMenu, Footer, SectionTile, Container)
    ui/         (Button, Eyebrow, Card, Dialog, Accordion, Carousel)
    marketing/  (Hero, ServiceGrid, ServiceCardVisuals/*, CaseCard,
                 ReviewCarousel, LogoMarquee, TechMarquee, FaqAccordion,
                 WhyCircles, ContactModal, ContactForm, AuditForm)
    motion/     (Reveal, Typewriter, CountUp, useReducedMotion)
  content/      (services.ts, cases.ts, reviews.ts, faq.ts, tech.ts, clients.ts + schema.ts)
  lib/          (seo.ts, jsonld.ts, email.ts, env.ts)
  public/       (logos/, cases/, tech/, brand/)
  ```

- **Design tokens as the contract.** All colors/radii/type live in `@theme`; components reference tokens, never raw hex. This is the main thing to get right early — the prototype's inline hex values are copy-pasted everywhere.
- **Keep the detail-page chrome DRY.** All four prototype files inline their own `<header>`, `<footer>`, and contact modal. In Next these become one shared `app/layout.tsx` + a route group. Note the landing nav (scroll-reactive, rating pill) differs slightly from the detail-page nav (static) — build one `<Header variant="overlay" | "solid">`.
- **Isolate the 6 service-card visuals.** They're the most time-consuming and lowest-reuse part. One component each under `ServiceCardVisuals/`, pure CSS, `prefers-reduced-motion` → static poster frame. Budget accordingly; consider simplifying 2–3 of them.
- **Cut or flag the exotic bits:** the "Mario" `animation-timeline: view()` sprite (Chromium-only) and the 3D phone ring. Ship as progressive enhancement or drop — confirm with stakeholders.
- **Environment / secrets:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET`, optional `N8N_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`. Validate with a Zod `env.ts` at boot.
- **Legal pages** (`/privacy`, `/cookies`, optional `/voorwaarden`) — required for a NL site with a contact form (GDPR/AVG). Not in the prototype; add to scope.
- **i18n:** content is Dutch; several testimonials are already English. Structure `/content` so a `nl` / `en` split is possible later, but don't build i18n now unless it's a launch requirement.

---

## 4. Phased delivery

Each phase ends in a deployable state.

### Phase 0 — Discovery & decisions (0.5 day)
- Resolve remaining Open Questions below (form destination, analytics choice, ROI calculator, exotic animations, i18n, domain, legal pages). Content is **decided**: hardcoded typed modules.
- Confirm brand assets: real photos for founder portraits and the two photo carousels (currently empty `image-slot` placeholders).
- Set up Vercel project, GitHub repo, domain/DNS, Resend sending domain (SPF/DKIM).

### Phase 1 — Scaffold & foundations (1 day)
- `create-next-app` (TS, App Router, Tailwind, ESLint). Add Prettier, pnpm, `.nvmrc`, CI workflow (typecheck + lint + build).
- `next/font` for Archivo + IBM Plex Mono + Outfit.
- Tailwind `@theme`: full token set from §2. `globals.css`: `::selection`, base `body` bg, `prefers-reduced-motion` reset, reveal keyframes.
- `app/layout.tsx` shell, metadata defaults, analytics wiring.
- Deploy the empty shell to Vercel.

### Phase 2 — Layout & design system (1.5 days)
- `Container`, `SectionTile` (cream, `44px`, inset), `Eyebrow` (mono label), `Button` (variants: `paper`, `coral`, `outline`; pill), typography components.
- `Header` (overlay + solid variants, scroll-state hook), `MobileMenu` (Radix), `Footer`.
- `not-found.tsx`, `error.tsx`.

### Phase 3 — Motion primitives (1 day)
- `useReducedMotion`, `<Reveal>`, `<Typewriter>`, `<CountUp>`, marquee CSS utilities.
- Verify each degrades to a static state.

### Phase 4 — Content model (1 day)
- `/content/*.ts` + Zod schemas for services (6), cases (7), reviews (15), faq (10), tech (8), clients (10). Port data verbatim from the prototype's arrays.
- (If Sanity was chosen in Phase 0: schemas + GROQ queries + a seed script instead.)

### Phase 5 — Landing page (3–4 days)
Assemble section by section against the prototype:
1. Hero (typewriter + animated service index).
2. Client logo marquee.
3. Diensten grid + **6 service-card visuals** (the long pole).
4. Waarom Viesa (overlapping circles) + "work in action" carousel.
5. Tech stack marquee + AI studio row.
6. Featured cases carousel.
7. Over ons (founder portraits).
8. FAQ accordion (Radix).
9. Contact CTA / audit section.
Wire Embla for all carousels. Match responsive behavior at 900/620px.

### Phase 6 — Inner routes (1.5 days)
- `/diensten/[slug]` — hero, feature grid (lucide icons), "andere diensten", `generateStaticParams`, `generateMetadata`.
- `/cases` — portfolio grid from `cases.ts`.
- `/cases/[slug]` — detail + "meer projecten". Remove hash routing + `localStorage` handoff; use real links.

### Phase 7 — Forms (1.5 days)
- `<ContactForm>` (RHF + Zod), success/error/loading states, honeypot + Turnstile.
- `app/api/contact/route.ts` → Resend (+ optional n8n webhook). Rate-limit.
- Mount in the contact modal and the audit section. Delete all `mailto:` logic.

### Phase 8 — SEO & structured data (1 day)
- Per-route metadata + canonical; `sitemap.ts`, `robots.ts`.
- OG images via `next/og` (landing + per service/case).
- JSON-LD: `Organization` + `LocalBusiness` (Breda address, phone, KVK) with `aggregateRating` (5.0 / 15), `Service` per service page, `FAQPage`, `BreadcrumbList`.
- `manifest.webmanifest`, favicons from `viesa-hex.png`.

### Phase 9 — Analytics, legal, polish (1 day)
- Analytics + Speed Insights (or Plausible). Consent banner only if a cookie-based tool is chosen.
- `/privacy`, `/cookies` pages.
- Optional: build the ROI calculator if greenlit.

### Phase 10 — A11y & performance pass (1.5 days)
- axe + manual keyboard pass: modal focus trap, carousel ARIA + arrow-key nav, nav landmarks, skip link, `:focus-visible`, heading order, review "expand" as a real `<button>`.
- Fix low-contrast mutes flagged in §2.
- Lighthouse: LCP < 2.5s, CLS ~0, TBT low. Lazy-load below-fold sections (`content-visibility`), check bundle size (Motion + Embla), confirm every animation respects reduced-motion.
- `next/image` `sizes` audit; convert case images to AVIF/WebP.

### Phase 11 — QA & launch (1 day)
- Cross-browser (Safari, Chrome, Firefox) + real iOS/Android.
- Playwright smoke tests: routes render, modal opens/submits (mocked), FAQ toggles, carousels advance, form validation.
- Redirects, 404/500, env vars in Vercel, preview → production, DNS cutover, submit sitemap to Search Console.

**Rough total: ~19–22 working days** for one senior front-end engineer, excluding content production (photography, copy review, legal text) and any CMS build-out.

---

## 5. Risks & open questions

**Resolved**
- **Content management** — hardcoded typed TS content modules in `/content`, no CMS. Port the prototype's arrays verbatim. Sanity remains a later upgrade.
- **Reviews** — keep the prototype's 15 Google reviews as a static hardcoded snapshot (in `content/reviews.ts`) with a "bron: Google" note and the fixed "5,0 / 15" count. No live Google Places API. Revisit if the rating drifts.

**Blocking / needs a stakeholder decision**
1. **Where do form submissions go?** — email via Resend only, or also into a CRM / n8n webhook / spreadsheet? Who receives them?
2. **Missing imagery** — founder portraits (Tom, Joep) and both photo carousels ("achter de schermen", "work in action") are empty placeholder slots. Need real photos before those sections can ship.
3. **ROI calculator** — logic exists in the prototype but has no UI. Build it as a lead magnet, or delete the dead code?
4. **Exotic animations** — keep, simplify, or cut the "Mario" scroll sprite (Chromium-only) and the 3D phone ring?
5. **Language** — Dutch only at launch, or is an English version in scope? (Some testimonials are already English.)
6. **Analytics tool** — Vercel Analytics / Plausible (cookieless, no banner) vs. GA4 (needs a consent banner).

**Non-blocking, handle during build**
- No legal pages exist — `/privacy` + `/cookies` are required for a NL site with a contact form (add to scope).
- Verify the footer's **KVK number** and phone number are correct and current.
- The audit form (name/email/website) and the contact modal (email/message) collect different fields — confirm the intended single flow, or keep two.
- Landing nav and detail-page nav differ slightly — unify into one `<Header>` with variants.
- `object-fit: contain` on case cards in `Cases.dc.html` vs. `cover` on the landing case cards — pick one treatment.
- Remote asset dependencies to internalize: Google Fonts, `unpkg` lucide, `cdn.simpleicons.org` (React, PostgreSQL, Claude logos).
- Decorative SVG background paths in hero/contact — reproduce as inline SVG components.
- `prefers-reduced-motion` must be honored for every new animation, matching the prototype.
