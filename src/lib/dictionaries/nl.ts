/**
 * Dutch is the source dictionary: its shape defines the `Dictionary` type that
 * `en.ts` and `es.ts` must satisfy, so a forgotten key is a compile error.
 *
 * Values are plain strings only — no functions. Placeholders are written as
 * `{name}` and filled with `interpolate()` from `@/lib/dictionaries`. Keeping
 * the object serialisable means it can cross the server/client boundary as a
 * prop if a component ever needs that.
 */
export const nl = {
  nav: {
    services: "Diensten",
    cases: "Cases",
    contact: "Contact",
  },
  common: {
    planCall: "Plan een strategiegesprek",
    viewWork: "Bekijk ons werk",
    close: "Sluiten",
    menu: "Menu",
    home: "home",
    backHome: "Terug naar home",
    toHome: "Naar home",
    skipToContent: "Direct naar inhoud",
  },
  header: {
    /** {value} = the rating, already formatted for the locale. */
    ratingOnGoogle: "{value} op Google",
  },
  languageSwitcher: {
    label: "Taal",
    ariaLabel: "Kies een taal",
  },
  hero: {
    title: "Wij maken werkprocessen slimmer en mobieler.",
    lede: "Met combinatie van 10+ jaar softwarekennis met de kracht van AI om bedrijven slimmer, sneller en efficiënter te laten werken.",
    pillars: [
      { title: "AI-Calling agents", tag: "Telefonie" },
      { title: "AI-Chatbots", tag: "Klantenservice" },
      { title: "Workflow-automatisering", tag: "Integraties" },
      { title: "Software & dashboards", tag: "Maatwerk" },
    ],
    strip: "AI-AGENTS · AUTOMATISERING · SAAS en APPS · E-COMMERCE · STRATEGIE",
  },
  sectionLabels: {
    testimonial: "Testimonial",
    services: "Diensten",
    techStack: "Tech stack",
    cases: "Cases",
    about: "Over ons",
    faq: "FAQ",
    whyViesa: "Waarom Viesa",
  },
  reviews: {
    eyebrow: "Klantbeoordelingen",
    title: "Vijf sterren, van iedereen die ons beoordeelde",
    lede: "We tonen ze allemaal, niet alleen de mooiste.",
    /** {count} = number of Google reviews. */
    googleReviews: "{count} Google reviews",
    viewOnGoogle: "Bekijk op Google",
    carouselLabel: "Klantbeoordelingen",
  },
  clientMarquee: {
    title: "Ervaring bij toonaangevende organisaties",
  },
  services: {
    eyebrow: "Wat wij doen",
    title: "Onze diensten",
    lede: "Zes pijlers, één aanspreekpunt: van AI-agents en automatisering tot maatwerk software en digitale platformen.",
  },
  whyViesa: {
    eyebrow: "Waarom Viesa",
    title: "Waarom bedrijven voor ons kiezen",
    reasons: [
      {
        title: "Alles werkt samen",
        text: "Onze oplossingen sluiten direct aan op de systemen die u al gebruikt. Geen losse silo's, maar één werkend geheel.",
      },
      {
        title: "AI & SEO Geoptimaliseerd",
        text: "Websites en content die goed scoren in Google én zichtbaar zijn in AI-platforms zoals ChatGPT en Gemini.",
      },
      {
        title: "100% Maatwerk ROI-focus",
        text: "Elke oplossing wordt gebouwd met een concreet doel: meetbaar minder handmatig werk en meer rendement.",
      },
    ],
  },
  techStack: {
    eyebrow: "Built with",
    title: "Een moderne, bewezen tech stack",
    lede: "Wij werken met technologieën die we per project bewust kiezen, aangevuld met de nieuwste AI-modellen voor slimme automatisering.",
    aiStudio: "AI Studio",
  },
  featuredCases: {
    eyebrow: "Cases",
    title: "Gebouwd voor elk bedrijf",
    lede: "Echte projecten voor echte bedrijven — van e-commerce tot dienstverlening en alles daartussenin.",
    carouselLabel: "Uitgelichte cases",
    viewAll: "Bekijk volledig portfolio",
  },
  about: {
    eyebrow: "Over ons",
    title: "Gebouwd in Breda, draait door heel Nederland",
    body1:
      "Van maatwerksoftware en mobiele applicaties tot AI-agents, workflowautomatisering en complete digitale platformen — wij bouwen end-to-end oplossingen die aansluiten op de manier waarop jouw bedrijf werkt.",
    body2:
      "Met 10+ jaar softwarekennis combineren we bewezen technologie met de kracht van AI. We houden de lijnen kort, werken in fases en blijven ook na de livegang betrokken. Eén partij voor software, automatisering en AI — van idee tot werkende oplossing.",
    roleCofounder: "MEDE-OPRICHTER",
    /** {name} = founder's first name. */
    photoAlt: "{name}, medeoprichter van Viesa Automations",
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Nog vragen?",
  },
  contactCta: {
    eyebrow: "Gratis audit",
    title: "Klaar om uw bedrijf te automatiseren?",
    lede: "Plan een gratis AI- & automatiseringsaudit in. Binnen 30 minuten weet je waar automatisering bij jou het meeste oplevert.",
    preferEmail: "Liever eerst mailen?",
    sendMessage: "Stuur een bericht",
  },
  booking: {
    requestAudit: "Vraag gratis audit aan",
  },
  contactDialog: {
    eyebrow: "Contact",
    title: "Neem contact op",
  },
  contactForm: {
    nameLabel: "Naam",
    namePlaceholder: "Voor- en achternaam",
    emailLabel: "E-mailadres",
    emailPlaceholder: "naam@bedrijf.nl",
    websiteLabel: "Website",
    websitePlaceholder: "www.voorbeeld.nl",
    messageLabel: "Bericht",
    messagePlaceholder: "Waarmee kunnen we je helpen?",
    messagePlaceholderAudit: "Waar loopt het nu vast? Wat wil je automatiseren?",
    submit: "Versturen",
    submitting: "Versturen…",
    genericError: "Er ging iets mis.",
    successTitle: "Bedankt — je bericht is verstuurd.",
    successBody: "We nemen binnen één werkdag contact met je op.",
  },
  footer: {
    contact: "Contact",
    sitemap: "Sitemap",
    social: "Social",
    /** {year} = current year, {name} = site name. */
    rights: "© {year} {name}. Alle rechten voorbehouden.",
    privacy: "Privacy",
    cookies: "Cookies",
  },
  serviceVisual: {
    chatQuestion: "Kan ik mijn maat nog ruilen?",
    chatReply: "Zeker, ik regel het direct.",
    chatConfirm: "Ruilbon verstuurd ✓",
    checklist: [
      "Offerte goedgekeurd",
      "Order in productie",
      "Factuur verzonden",
      "Levering gepland",
    ],
  },
  detail: {
    backToPortfolio: "Terug naar portfolio",
    aboutProject: "Over dit project",
    moreProjects: "Meer projecten",
    backToServices: "Terug naar diensten",
    whatThisMeans: "Wat dit voor u betekent",
    otherServices: "Andere diensten",
  },
  casesPage: {
    eyebrow: "Portfolio",
    title: "Gebouwd voor elk bedrijf",
    lede: "Echte projecten voor echte bedrijven — van e-commerce tot agri, finance en dienstverlening.",
    metaTitle: "Cases",
  },
  thankYouPage: {
    eyebrow: "Ingepland",
    title: "Je audit staat in de agenda",
    body: "Je ontvangt een bevestiging per e-mail met de afspraakdetails en een agenda-uitnodiging. Tot snel — dan bespreken we waar automatisering bij jou het meeste oplevert.",
    metaTitle: "Bedankt",
    metaDescription: "Je audit is ingepland.",
  },
  notFound: {
    eyebrow: "404",
    title: "Pagina niet gevonden",
    body: "De pagina die je zoekt bestaat niet (meer). Ga terug naar de homepagina.",
  },
  errorPage: {
    title: "Er ging iets mis",
    body: "Probeer het opnieuw. Blijft het misgaan, mail ons dan gerust direct.",
    retry: "Opnieuw proberen",
  },
  legal: {
    /** {date} = the last-updated date, already formatted for the locale. */
    lastUpdated: "Laatst bijgewerkt: {date}",
    /** Shown above the Dutch legal text when the visitor is browsing in en/es. */
    dutchOnlyNotice:
      "Deze juridische tekst is alleen in het Nederlands beschikbaar. De Nederlandse versie is leidend.",
  },
  seo: {
    /** {title} = page title, {name} = site name. */
    ogEyebrow: "Automatisering · AI-agents · Maatwerk software",
    titleTemplate: "{title} — {name}",
    defaultTitle: "Viesa Automations — Automatisering, AI-agents & maatwerk software",
    description:
      "Viesa Automations bouwt AI-agents, workflow-automatisering en maatwerk software voor groeiende e-commerce bedrijven. Plan een vrijblijvend strategiegesprek.",
    keywords: [
      "automatisering",
      "workflow automatisering",
      "AI-agents",
      "AI calling agents",
      "AI chatbots",
      "maatwerk software",
      "webapplicaties",
      "KPI dashboards",
      "systeemintegraties",
      "Breda",
    ],
  },
};

/** Shape every other locale must satisfy. Deliberately *not* `as const` —
 *  literal types would make "Services" unassignable to "Diensten". */
export type Dictionary = typeof nl;
