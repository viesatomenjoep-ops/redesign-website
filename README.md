# Viesa Automations — website

Next.js 15 (App Router) marketing site. **Drietalig**: Nederlands op de root,
Engels onder `/en`, Spaans onder `/es`. Landingspagina, 6 dienstpagina's,
cases-overzicht + 8 case-detailpagina's, en juridische pagina's.

## Stack

- Next.js 15 · React 19 · TypeScript (strict, incl. `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (tokens in `src/app/globals.css` `@theme`)
- Radix UI (contact dialog, FAQ accordion) · Embla (carousels) · lucide-react
- Eigen lichtgewicht motion-primitives (`src/components/motion/*`), allemaal
  reduced-motion aware
- Getypeerde content in `src/content/*` (Zod-gevalideerd), per taal
- Contactformulier → `/api/contact` → Resend (env-guarded) + optionele n8n-webhook
- Reviews via de Google Places API (New), server-side, 24 uur gecached, met
  `src/content/reviews.ts` als fallback. Zie [`GOOGLE_REVIEWS_PLAN.md`](./GOOGLE_REVIEWS_PLAN.md).
- **"Vraag gratis audit aan"** → Cal.com embed (`@calcom/embed-react`), geladen
  bij klik; optionele booking-webhook op `/api/cal/webhook`. Zie
  [`CALCOM_INTEGRATION_PLAN.md`](./CALCOM_INTEGRATION_PLAN.md).
- Vercel Analytics + Speed Insights

## Aan de slag

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open daarna http://localhost:3000.

Andere scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`,
`pnpm format`.

> **Let op bij typechecken:** de repo heeft `noUncheckedIndexedAccess` aan.
> Een losse `tsc`-run zonder de repo-`tsconfig.json` mist die fouten — draai
> altijd `pnpm build` voordat je pusht.

## Meertaligheid

Nederlands staat op de root; `en` en `es` zijn geprefixt. Alle routes leven
onder `src/app/[lang]/`, en `src/middleware.ts` herschrijft onvoorvoegde
verzoeken naar `/nl/...` (de bezoeker houdt de schone URL). `/nl/...` direct
opvragen redirect permanent weg, zodat elke pagina één indexeerbare URL heeft.

URL-segmenten en slugs zijn per taal vertaald via `src/lib/route-slugs.ts`:

| | Nederlands | Engels | Spaans |
|---|---|---|---|
| Cases | `/cases` | `/en/cases` | `/es/casos` |
| Diensten | `/diensten/workflow-automatisering` | `/en/services/workflow-automation` | `/es/servicios/automatizacion-de-flujos` |

Alle UI-teksten staan in `src/lib/dictionaries/{nl,en,es}.ts`. De Nederlandse
dictionary bepaalt het `Dictionary`-type, dus een vergeten sleutel in `en` of
`es` is een compile-fout. Placeholders (`{count}`) vul je met `interpolate()`.

De juridische pagina's (`/privacy`, `/cookies`) zijn **alleen in het
Nederlands**; bezoekers in `en`/`es` krijgen een melding dat de Nederlandse
versie leidend is.

## Projectstructuur

```
src/
  app/
    [lang]/
      layout.tsx                  root shell (html lang), fonts, analytics, providers
      page.tsx                    landingspagina
      [section]/page.tsx          cases-index, privacy, cookies, bedankt
      [section]/[slug]/page.tsx   case- én dienstdetail (sectie bepaalt welke)
      opengraph-image.tsx         OG-beelden per taal
    api/contact/route.ts          formulier (Resend + optionele webhook)
    api/cal/webhook/route.ts      Cal.com-bookings
    sitemap.ts robots.ts manifest.ts icon.tsx apple-icon.tsx
    globals.css                   Tailwind v4 + design tokens + keyframes
  middleware.ts                   NL op de root, en/es geprefixt
  components/
    layout/    Header, MobileMenu, Footer, SiteChrome, LanguageSwitcher
    i18n/      LocaleProvider (locale-context voor client components)
    ui/        Button, Container, Eyebrow, SectionTile, Carousel, LucideIcon
    motion/    Reveal, Typewriter, CountUp, useReducedMotion
    contact/   ContactDialogProvider, ContactButton, ContactForm, WhatsAppButton
    marketing/ Hero, Reviews, ClientMarquee, ServicesGrid, ServiceCardVisual,
               WhyViesa, TechStack, FeaturedCases, CaseCard, DeviceFrame,
               About, Faq, ContactCta
    legal/     LegalPage, PrivacyBody, CookiesBody
    seo/       json-ld helpers
  content/     services, cases, reviews, faq, tech, clients (+ schema.ts) — per taal
  lib/         i18n, route-slugs, dictionaries, site config, fonts, seo, utils
public/uploads/  alle afbeeldingen (screenshots, logo's, tech-iconen)
```

### Cases

`src/content/cases.ts` houdt per case een stabiele `id` (taalonafhankelijk) en
een `slug` per taal. Verder:

- `image` — hoofdscreenshot, getoond in een MacBook Pro-frame
- `gallery` — extra screenshots, afwisselend op een iMac en een MacBook Air
- `url` — de live site van de klant; levert een "Bekijk de live website"-knop op.
  `null` voor intern werk zonder publieke site (het Viesa Dashboard).

De apparaatframes in `components/marketing/device-frame.tsx` zijn volledig met
CSS getekend — geen frame-afbeeldingen, dus scherp op elk formaat.

## Environment variables

Zie `.env.example`.

**Verplicht voor productie:**

```
NEXT_PUBLIC_SITE_URL = https://<het-echte-domein>
```

Zonder deze variabele wijzen de canonical- en hreflang-tags naar
`http://localhost:3000`, wat de meertalige indexering onbruikbaar maakt.

**Optioneel:** met `RESEND_API_KEY` leeg valideren `/api/contact` en
`/api/cal/webhook` de payload en loggen die alleen — prima voor lokaal werk.
Voor live Google-reviews: `GOOGLE_PLACES_API_KEY` (beperkt tot *Places API New*,
server-side) en `GOOGLE_PLACE_ID`. Voor de boekingsknop:
`NEXT_PUBLIC_CALCOM_LINK` plus een Cal.com-webhook naar `/api/cal/webhook` met
`CALCOM_WEBHOOK_SECRET`.

## Deployen

Productie hangt aan branch **`master`** — Vercel deployt die automatisch.

```bash
pnpm build     # moet slagen vóór push
git push origin master
```

## Bekende afwijkingen van het oorspronkelijke prototype

- **Hash-routing + `localStorage` verwijderd** — detailpagina's gebruiken echte
  routes met `generateStaticParams`.
- **`mailto:` vervangen** door een echte form handler met validatie en honeypot.
- **Service-card-animaties vereenvoudigd** — de 6 micro-visuals houden het
  concept met veel minder code. Zie `service-card-visual.tsx`.
- **Uitgesteld:** de ROI-calculator, de scroll-gedreven "Mario"-sprite, de 3D
  phone ring en de twee fotocarrousels ("Achter de schermen" / "Work in action").
- **Oprichtersportretten worden niet weergegeven.** De bestanden staan wel in
  `public/uploads/` (`portret-tom.jpg`, `portret-joep.jpg`);
  `components/marketing/about.tsx` toont momenteel alleen de namen.
