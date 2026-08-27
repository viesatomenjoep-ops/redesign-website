# Google Reviews — implementation plan

Replace the hardcoded review snapshot with live Google reviews so the rating,
count and testimonials stay current without manual edits.

Planning only — no code in this document.

---

## 1. Current state

| Piece | File | Today |
|---|---|---|
| Review data | `src/content/reviews.ts` | Hardcoded array of 15 (`author`, `meta`, optional `text`) + `featuredTestimonial` |
| Display | `src/components/marketing/reviews.tsx` | Embla carousel, 3-up, header "5,0 / 15 Google reviews" |
| Rating source | `src/lib/site.ts` → `site.rating` | `{ value: 5.0, count: 15, source: "Google" }` |
| Structured data | `src/components/seo/json-ld.tsx` → `OrganizationJsonLd` | Emits `aggregateRating` from `site.rating` |

`IMPLEMENTATION_PLAN.md` §5 flagged this as "static snapshot — revisit if the
rating drifts." This is the revisit.

---

## 2. The core constraint

**Google's Places API returns at most 5 reviews and you cannot paginate or pick
which 5.** This shapes every option below.

| Source | Reviews | Total count & avg rating | Setup | Cost |
|---|---|---|---|---|
| **Places API (New)** — `GET /v1/places/{id}`, fieldmask `reviews` | **5 max**, "most relevant" | ✅ real `userRatingCount` + `rating` (not capped) | API key + Place ID | ~free at daily refresh (priciest SKU, ~30 calls/mo) |
| **Google Business Profile API** — `accounts.locations.reviews.list` | **All**, paginated | ✅ | OAuth as the listing owner + Cloud project + access-request form (lead time) + token refresh + somewhere to store them | free |
| **Featurable API** (3rd-party, free) | **All**, JSON | ✅ | Sign up, get a widget/feed id | free tier |
| Elfsight / Trustindex / EmbedSocial | All | ✅ | Paid iframe widget | paid, off-brand, adds a 3rd-party script (same cookie/consent problem we hit with Cal) |

---

## 3. Recommended approach

**Places API (New), server-side, cached — for the rating, the real count, and
5 fresh reviews. Keep `reviews.ts` as a curated fallback / supplement.**

- Official, cheap, no OAuth, renders through our existing `ReviewCard` so it
  stays on-brand.
- The header ("5,0 / N Google reviews") and any on-page rating use the API's
  real `rating` + `userRatingCount`.
- The carousel shows the 5 live reviews; the curated set in `reviews.ts` stays as
  the fallback when the API is unavailable, and optionally pads the carousel so
  it doesn't look thin (clearly separated, not passed off as "just in from
  Google").

**Escalate to Option B (Business Profile API)** only if "just 5" is unacceptable
and we want all reviews + the ability to reply. **Consider Featurable** if we
want all reviews without a Google Cloud project and accept a third-party
dependency.

---

## 4. Prerequisites (no code)

1. **Google Cloud project** → enable **Places API (New)**.
2. **API key** → restrict it to *Places API (New)* only. Keep it **server-side**
   (`GOOGLE_PLACES_API_KEY`, never `NEXT_PUBLIC_`).
3. **Place ID** for the Viesa Automations Google Business listing (Place ID
   Finder, or one Text Search call). Store as `GOOGLE_PLACE_ID`.
4. Confirm which Google account **owns** the listing (needed for Option B, and to
   verify the Place ID is the right business).

Env additions (`.env.example` / Vercel):

```
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
# optional: secret for the manual/cron revalidation route
REVIEWS_REVALIDATE_SECRET=
```

---

## 5. Implementation

### 5.1 Data layer — `src/lib/google-reviews.ts` (server-only)

- `getGoogleReviews(): Promise<GoogleReviewsData | null>`
- `fetch("https://places.googleapis.com/v1/places/" + placeId, { headers: { "X-Goog-Api-Key", "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews" }, next: { revalidate: 86400 } })`
- **Zod-validate** the response; on any failure `return null`.
- Normalise each review to our shape:
  `{ author, authorPhotoUrl, authorUrl, rating, text, publishedAt, relativeTime }`
  from `authorAttribution.{displayName,photoUri,uri}`, `rating`, `text.text`,
  `publishTime`, `relativePublishTimeDescription`.
- `GoogleReviewsData = { rating, count, mapsUrl, reviews: NormalizedReview[] }`.
- Optional filter for the carousel: `rating >= 4 && text` (see §8, risk).
- Cache: `revalidate: 86400` (1 day) — well inside Google's 30-day cache limit.
  Wrap in `unstable_cache` with tag `google-reviews` if we want on-demand
  invalidation (§5.5).

### 5.2 Content — `src/content/reviews.ts`

- Rename the export to `curatedReviews` (it's now the fallback + optional
  padding). Keep `featuredTestimonial` hardcoded for editorial control (or derive
  it from the longest 5-star live review — decision, §7 Q2).

### 5.3 Display — `src/components/marketing/reviews.tsx` → async Server Component

- `const data = await getGoogleReviews();`
- `rating = data?.rating ?? site.rating.value`
- `count  = data?.count  ?? site.rating.count`
- `cards  = data?.reviews.length ? data.reviews : curatedReviews`
  (or `[...data.reviews, ...curatedReviews]` if padding — see Q2).
- Header text uses `rating` + `count`.
- Add a **"Bekijk alle reviews op Google"** link → `data.mapsUrl`.
- Small **attribution** line ("Reviews via Google") — required by Google's ToS.

### 5.4 `ReviewCard` updates

- Render `authorPhotoUrl` via `next/image` (avatar), `authorUrl` as the name
  link (`target="_blank" rel="noopener"`), per-review star `rating`, and
  `relativeTime`.
- Keep the current initial-letter avatar as the fallback when there's no photo
  (curated reviews).
- `next.config.ts` → add `images.remotePatterns` for
  `lh3.googleusercontent.com` and `*.googleusercontent.com` (author photos).

### 5.5 Freshness (optional)

- Time-based `revalidate: 86400` is enough for launch.
- For tighter control: `src/app/api/reviews/revalidate/route.ts` guarded by
  `REVIEWS_REVALIDATE_SECRET`, calls `revalidateTag("google-reviews")`; trigger
  from a **Vercel Cron** daily. Keeps users off the cold-fetch path.

### 5.6 Structured data — `OrganizationJsonLd`

- `src/lib/site.ts` → `site.rating` becomes the **fallback only**.
- Either: make `OrganizationJsonLd` async and read `getGoogleReviews()` (Next
  dedupes the fetch), or pass `rating`/`count` in as props from the homepage.
- **Decision required (Q3):** whether to emit `aggregateRating` at all — see §8.

---

## 6. Privacy / policy

- Review author avatars load from `googleusercontent.com` — a third-party
  **image** request (no script, no cookies), much lighter than the Cal embed.
- Add one line to `src/app/privacy/page.tsx` / `src/app/cookies/page.tsx`
  ("Externe content"): review avatars are served by Google. No consent banner
  needed.
- No personal data of *our* visitors leaves the site.

---

## 7. Open questions

1. **Is 5 live reviews enough** (Places API New), or do we need all of them
   → Business Profile API OAuth, or Featurable?
2. **Carousel content** — show only the live 5, or pad with the curated set
   (labelled how)? And: keep `featuredTestimonial` hardcoded or auto-pick?
3. **`aggregateRating` structured data** — emit it from Google's numbers, or
   display the rating visually with attribution and drop the schema? (§8)
4. **Which listing / Place ID**, and who owns it?
5. **Refresh cadence** — daily fine, or do they want near-real-time (cron)?
6. **Official Places API (5, no vendor)** vs **Featurable (all, free, 3rd-party
   dependency)**?

---

## 8. Risks

- **5-review cap** is a hard Google limit on the recommended path.
- **Google Places ToS**: content (incl. reviews) may be cached **max 30 days**;
  attribution is **mandatory**; review text must not be edited; author name +
  photo + link must be shown. Daily `revalidate` and rendering the fields as-is
  keeps us compliant.
- **Structured-data guidelines**: Google says `aggregateRating` markup should be
  for reviews *you* collect and display, not ratings sourced from another
  platform. Emitting Google's aggregate as our own schema is a grey area and
  could trigger a manual action. We already do this from the hardcoded snapshot;
  the safer position is **display + attribution, no `aggregateRating` schema**
  until there are first-party reviews. Needs a call.
- **Filtering negatives**: hiding <4-star reviews on our own marketing page is a
  reputational/ethical choice, and arguably against the spirit of "don't
  cherry-pick". Decide explicitly; default could be "show all with text".
- **API key exposure** — must never be `NEXT_PUBLIC_`; all fetching server-side.
- **New reviews are unpredictable** — a future 1-star review would surface
  automatically. Whatever filter policy we pick, it's now live.
- **Cost/SKU** — the `reviews` field is in the most expensive Place Details SKU;
  fine at daily refresh, watch it if revalidation is made aggressive.

---

## 9. Phased steps & estimate

| Step | Work | Est. |
|---|---|---|
| 0 | Cloud project, enable Places API (New), restricted key, find Place ID, env vars | 0.5 day (mostly clicking / waiting) |
| 1 | `google-reviews.ts` — fetch + Zod + normalise + cache + null-fallback | 0.5 day |
| 2 | `reviews.tsx` async + real data; `ReviewCard` photo/link/stars/time; `curatedReviews` rename; `next.config` remotePatterns; "alle reviews" link + attribution | 0.5 day |
| 3 | JSON-LD decision + wiring; `site.rating` → fallback | 0.25 day |
| 4 | Optional cron + tag revalidation route | 0.25 day |
| 5 | Privacy note, fixture-based test of the normaliser, fallback test, Lighthouse | 0.25 day |

**~1.5–2 dev-days** on the recommended path (Option A). Add ~1–2 days + an access
approval wait if we go Option B for all reviews.
