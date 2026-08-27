# Cal.com integration — "Vraag gratis audit aan"

Replace the mail-based audit form with a real scheduling flow: clicking
**"Vraag gratis audit aan"** opens Cal.com so the visitor books an audit call
directly, with calendar sync, confirmation e-mails, reminders and reschedule/cancel
handled by Cal.

Planning only — no code in this document.

---

## 1. Current behaviour

| Where | Trigger | Today |
|---|---|---|
| `src/components/marketing/contact-cta.tsx` | **"Vraag gratis audit aan"** (submit of `<ContactForm variant="audit">`) | POST `/api/contact` → Resend e-mail |
| Header / hero / mobile menu / service pages | "Plan een strategiegesprek" | Opens `ContactDialogProvider` modal → same `/api/contact` |

**In scope:** the audit CTA only.
**Decision needed:** whether "Plan een strategiegesprek" also moves to Cal (§12, Q1).

---

## 2. Approach options

| Option | What it is | Verdict |
|---|---|---|
| **A. Embed popup (`@calcom/embed-react`)** | Button opens Cal in a modal iframe over the page. Script + iframe load on demand. On-brand color, theme, layout. | **Recommended.** Least code, keeps the visitor on-page, Cal owns all the calendar/timezone/notification complexity. |
| B. Inline embed | `<Cal>` calendar rendered directly in the CTA section (lazy-mounted on scroll). | Good UX (calendar visible immediately) but heavier and changes the section's visual design. Viable alternative — see §6.4. |
| C. Cal.com Atoms (`@calcom/atoms`) | Fully white-label React booking components. | Overkill: needs an OAuth client + platform plan. Revisit only if the iframe look is unacceptable. |
| D. Custom UI on Cal API v2 | Build our own availability picker + `POST /bookings`. | Most control, most work and maintenance. Not justified for one event type. |
| E. Plain link out to `cal.com/viesa/...` | `<a target="_blank">`. | Fallback only (no-JS, embed failure). |

Recommendation: **A**, with **E** as the built-in fallback.

---

## 3. Cal.com account & event-type setup (no code)

1. **Account / plan**
   - Cal.com cloud, Free plan is enough for embeds + brand colour.
   - "Remove Cal.com branding" and full CSS-variable theming require a paid
     (Teams) plan — decide if that matters (§12, Q2).
   - Team vs personal account: use a **team** ("Viesa") so both founders can be
     hosts / round-robin. Reserve the handle `viesa`.

2. **Event type: `gratis-audit`**
   - Slug: `gratis-audit` → public link `viesa/gratis-audit`.
   - Duration: 30 min (confirm).
   - Location: Google Meet / Zoom / phone (confirm).
   - Scheduling: round-robin between Tom & Joep, or collective. Min. notice
     (e.g. 12h), rolling window (e.g. 30 days), buffers.
   - **Booking questions** (these replace the old form fields):
     - Name — default, required
     - Email — default, required
     - "Website / webshop" — short text, optional (was the audit form's `website`)
     - "Waar loopt het nu vast? Wat wil je automatiseren?" — long text, optional
     - Phone — optional
   - Confirmation / reminder e-mails: enable, set Dutch copy, add the
     `contact@viesa-automations.nl` reply-to.
   - Redirect on booking: leave default (Cal success screen) or redirect to a
     `/bedankt` page we add (§6.3).

3. **Calendar connections** — connect Tom's + Joep's Google Calendars for
   real-time availability and event creation.

4. **Branding** — set brand colour `#E2603F`, light theme.

5. **Developer → Webhooks** (optional but recommended, §7) — add subscriber URL,
   signing secret, triggers `BOOKING_CREATED`, `BOOKING_RESCHEDULED`,
   `BOOKING_CANCELLED`.

---

## 4. Environment variables

Add to `.env.example` / Vercel:

```
# Public Cal.com booking link (handle/slug) and embed namespace
NEXT_PUBLIC_CALCOM_LINK=viesa/gratis-audit
NEXT_PUBLIC_CALCOM_NAMESPACE=gratis-audit

# Only if we add the booking webhook (§7)
CALCOM_WEBHOOK_SECRET=
```

No API key is needed for the embed. `CALCOM_API_KEY` would only be required for
option D or server-side booking management.

---

## 5. Dependencies

- `@calcom/embed-react` (adds `@calcom/embed-core` + `@calcom/embed-snippet`
  transitively). ~30–50 KB, **loaded on demand** — not in the initial bundle.

No other packages.

---

## 6. Frontend implementation

### 6.1 New component — `src/components/booking/book-audit-button.tsx` (client)

- Wraps the existing `<Button variant="coral" size="lg">`.
- On mount: `const cal = await getCalApi({ namespace: NEXT_PUBLIC_CALCOM_NAMESPACE })`
  then `cal("ui", { theme: "light", styles: { branding: { brandColor: "#E2603F" } }, hideEventTypeDetails: false, layout: "month_view" })`.
- Open on click via the `data-cal-link` / `data-cal-namespace` / `data-cal-config`
  attributes on the button (most reliable), or `cal("modal", { calLink })`.
- `data-cal-config` = `{"layout":"month_view","theme":"light"}` (+ prefill, §6.5).
- Conversion hook: `cal("on", { action: "bookingSuccessful", callback })` →
  `track("audit_booked")` (Vercel Analytics) and optional redirect to `/bedankt`.
- Fallback: the button is a real `<a href={https://cal.com/${LINK}} target="_blank">`
  so it works before the script loads and if the embed fails; JS upgrades it to
  the modal and calls `preventDefault()`.
- Respect `prefers-reduced-motion` (pass through to Cal `ui` config where
  supported; our own trigger has no animation to suppress).

### 6.2 Wire into the CTA section — `src/components/marketing/contact-cta.tsx`

- Replace the `<div class="...bg-paper..."><ContactForm variant="audit" /></div>`
  block with `<BookAuditButton>Vraag gratis audit aan</BookAuditButton>`.
- Keep the eyebrow ("Gratis audit"), heading and lede.
- Optionally keep a secondary "Liever eerst mailen?" text link that opens the
  existing contact modal (`useContactDialog`).

### 6.3 Optional `/bedankt` page

- Static confirmation page (`src/app/bedankt/page.tsx`) for the post-booking
  redirect: short thank-you, what to expect, link back home. `noIndex`.

### 6.4 Alternative: inline embed

If we prefer the calendar visible in the section instead of a modal:
- `<Cal namespace={...} calLink={...} config={...} style={{ width:"100%" }} />`
- Lazy-mount with an IntersectionObserver wrapper so the iframe only loads when
  the section scrolls into view (it's below the fold).
- Costs more layout work to keep it on-brand inside the cream card.

### 6.5 Prefill (nice-to-have)

If we keep a single email field before the button, pass
`config: { name, email, notes }` so Cal's form is pre-populated. Recommendation:
**skip** for v1 — fewer steps, let Cal collect everything.

### 6.6 Cleanup

- `ContactForm`'s `variant="audit"` branch + the `website` field become unused
  once the CTA switches over. Either drop the `variant` prop (leaving
  `ContactForm` as the generic modal form) or keep it for a future use. Update
  `contact-schema.ts` if `website` is removed.
- `/api/contact` stays for the generic contact modal — unchanged.

---

## 7. Optional backend — booking webhook (parity with the contact flow)

To mirror what `/api/contact` does today (notify + optional CRM/n8n):

- `src/app/api/cal/webhook/route.ts` (`runtime = "nodejs"`).
- Verify `X-Cal-Signature-256` = HMAC-SHA256(rawBody, `CALCOM_WEBHOOK_SECRET`);
  reject on mismatch. Read the **raw** body (`await request.text()`) before
  parsing.
- On `BOOKING_CREATED`: forward a normalised payload to
  `N8N_CONTACT_WEBHOOK_URL` (already in env) and/or send an internal Resend
  notification. On `CANCELLED` / `RESCHEDULED`: same, for the CRM.
- Idempotency: dedupe on Cal's booking `uid`.

Skip this if Cal's own calendar events + e-mails are enough for now.

---

## 8. Privacy / cookies / CSP — **must update**

The Cal embed loads `https://app.cal.com/embed/embed.js` and an
`app.cal.com` iframe, which sets its own storage. This **contradicts** the
current `/cookies` page ("no third-party embeds, no tracking, no banner") and the
`/privacy` page.

Required changes:
1. **`src/app/cookies/page.tsx`** — add a section: the booking module loads
   Cal.com when you open it; Cal may set functional storage on `app.cal.com`;
   link to Cal.com's privacy policy.
2. **`src/app/privacy/page.tsx`** — add **Cal.com (Cal.com, Inc.)** as a
   processor for appointment scheduling, note data collected at booking
   (name, e-mail, answers, timezone) and the US transfer basis (SCCs / DPF).
3. **Consent** — decide (§12, Q4):
   - a) It only loads on an explicit user click → treat as strictly functional,
     no banner, just disclosure (lightest, defensible).
   - b) Gate the embed behind a consent click ("Agenda laden") — heavier.
   Recommendation: **(a)** + clear disclosure, since nothing loads until the
   visitor clicks the CTA.
4. **CSP** — `next.config.ts` has no CSP today. When one is added (Phase 10),
   allowlist: `script-src https://app.cal.com`, `frame-src https://app.cal.com`,
   `connect-src https://app.cal.com https://api.cal.com`. `X-Frame-Options` is on
   our pages, not Cal's iframe, so it's unaffected.

---

## 9. Analytics / conversion tracking

- `bookingSuccessful` → `track("audit_booked", { eventType: "gratis-audit" })`.
- Optional: `linkReady` / modal-open → `track("audit_booking_opened")` to measure
  open-to-book drop-off.
- If GA4/Ads is ever added, fire the conversion here too.

---

## 10. Accessibility & performance

- Trigger stays a native button/link: `aria-haspopup="dialog"`, visible focus
  ring (already global). Cal's modal manages its own focus trap + Esc.
- Nothing Cal-related in the initial JS/CSS payload; script fetched on first
  interaction (or on scroll for the inline variant).
- Keyboard: Tab to the CTA, Enter opens, Esc closes, focus returns to the button.
- Test with VoiceOver + NVDA; the iframe content is Cal's responsibility but the
  entry/exit is ours.
- `prefers-reduced-motion`: no custom animation on our side.

---

## 11. Testing

- Manual: desktop + mobile, book a real test slot, confirm calendar event +
  e-mails + reschedule + cancel.
- Fallback: disable JS → CTA still links to the Cal hosted page.
- Embed failure: block `app.cal.com` in devtools → link fallback still works.
- Webhook (if built): Cal "Ping test" + a real booking; verify signature check
  rejects a tampered body.
- Playwright smoke: CTA renders, has the correct `href` fallback, clicking it
  injects the Cal iframe (`iframe[src*="cal.com"]` appears).
- Lighthouse: confirm no regression to the landing/CTA route's initial load.

---

## 12. Open questions

1. **Scope** — audit CTA only, or also move "Plan een strategiegesprek" to Cal
   (same event type, or a separate `strategiegesprek` one)?
2. **Plan** — is removing Cal.com branding / full theme control worth a paid
   Teams plan, or is Free + brand colour fine for v1?
3. **Event details** — duration (30 min?), location (Meet/Zoom/phone?),
   round-robin vs collective, min notice, booking window.
4. **Consent** — disclosure-only (recommended, loads on click) vs an explicit
   "load calendar" consent gate.
5. **Webhook** — build the `BOOKING_CREATED` → n8n/CRM bridge now, or rely on
   Cal's native calendar + e-mail for launch?
6. **Post-booking** — use Cal's default success screen or redirect to a
   `/bedankt` page?
7. **Keep the message form** as a secondary option in the CTA section, or fully
   replace it with the booking button?

---

## 13. Risks

- **Policy drift** — shipping the embed without updating `/privacy` + `/cookies`
  makes those pages inaccurate. Treat §8 as part of the same PR.
- **Vendor iframe styling** — Free plan can't fully match the cream/navy design;
  the modal will look like Cal with our brand colour. Acceptable, but set
  expectations.
- **Availability accuracy** depends on both founders keeping Google Calendar
  connected and tidy.
- **Bundle creep** if someone imports `@calcom/embed-react` at module scope
  instead of via `getCalApi()` — enforce lazy usage in review.
- **Double data path** — bookings live in Cal, contact-form messages in e-mail;
  without the webhook there's no single inbox. The webhook (§7) closes this.

---

## 14. Phased steps & estimate

| Step | Work | Est. |
|---|---|---|
| 0 | Cal.com team + `gratis-audit` event type + booking questions + calendars + branding (§3) | 0.5 day (mostly non-dev) |
| 1 | `@calcom/embed-react`, env vars, `BookAuditButton` with theming + fallback + `bookingSuccessful` hook | 0.5 day |
| 2 | Swap into `contact-cta.tsx`; optional `/bedankt`; `ContactForm` cleanup | 0.25 day |
| 3 | Update `/privacy` + `/cookies` (§8); CSP allowlist note | 0.25 day |
| 4 | Optional webhook `→ /api/cal/webhook` with signature verify + n8n/Resend forward (§7) | 0.5 day |
| 5 | Testing (§11), analytics wiring, Lighthouse check | 0.25 day |

**~1.5 dev-days** without the webhook, **~2** with it (plus the Cal.com account setup).
