import { caseSchema, type CaseStudy } from "@/content/schema";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/** Ported from the prototype `Cases.dc.html` + `Case Detail.dc.html` (casesData[]).
 *  Image paths assume the prototype's `uploads/` folder is copied to
 *  `public/uploads/` (see README).
 *
 *  `id` is the stable key across locales (it happens to equal the Dutch slug);
 *  `slug` is what appears in the URL and differs per locale. Company names and
 *  imagery are locale-independent and live in `base`. */

type CaseBase = {
  id: string;
  name: string;
  image: string | null;
  gallery?: string[];
  /** Live site. Omitted for the internal dashboard, which has nothing public. */
  url?: string;
};

type CaseCopy = {
  slug: string;
  category: string;
  summary: string;
  description: string;
};

const base: CaseBase[] = [
  {
    id: "wehkamp",
    name: "Wehkamp",
    image: "/uploads/card-wehkamp.jpg",
    url: "https://www.wehkamp.nl",
  },
  {
    id: "ibiza",
    name: "Ibiza Mi Vida",
    image: "/uploads/case-ibiza-site.jpg",
    url: "https://www.ibizamivida.com",
    gallery: [
      "/uploads/case-ibiza-clubs.jpg",
      "/uploads/case-ibiza-artists.jpg",
      "/uploads/case-ibiza-portal-login.jpg",
      "/uploads/case-ibiza-portal-fleet.jpg",
    ],
  },
  {
    id: "equivest",
    name: "Equivest",
    image: "/uploads/case-equivest-site.jpg",
    url: "https://www.equivestworldwide.com",
  },
  {
    id: "robeco",
    name: "Robeco",
    image: "/uploads/case-robeco.avif",
    url: "https://www.robeco.nl",
  },
  {
    id: "nunhems",
    name: "Nunhems",
    image: "/uploads/case-nunhems.jpg",
    url: "https://www.nunhems.com",
  },
  {
    id: "schippers",
    name: "MS Schippers",
    image: "/uploads/card-schippers.jpg",
    url: "https://www.msschippers.nl",
  },
  {
    id: "vamipro",
    name: "VaMiPro",
    image: "/uploads/case-vamipro-site.jpg",
    url: "https://www.vamipro.nl",
    gallery: ["/uploads/case-vamipro-categories.jpg"],
  },
  {
    id: "viesa-dashboard",
    name: "Viesa Dashboard",
    image: "/uploads/case-viesa-dashboard.jpg",
    gallery: [
      "/uploads/case-viesa-dashboard-audit.jpg",
      "/uploads/case-viesa-dashboard-promomail.jpg",
    ],
  },
];

const copy: Record<Locale, Record<string, CaseCopy>> = {
  nl: {
    wehkamp: {
      slug: "wehkamp",
      category: "MOBIELE APP",
      summary:
        "Bijgedragen aan de native Wehkamp- en Kleertjes-app — een support-chatbot, nieuwe zoekfunctie en de overstap van XML naar Jetpack Compose.",
      description:
        "We droegen bij aan de ontwikkeling van de native Wehkamp-app en de Kleertjes-app. We bouwden en integreerden een klantenservice-chatbot waarmee gebruikers direct antwoord krijgen op veelgestelde vragen binnen de app, implementeerden nieuwe zoekfunctionaliteit met Jetpack Compose en Jetpack Navigation, en leidden de migratie van legacy XML-gebaseerde UI-componenten naar Jetpack Compose — wat de onderhoudbaarheid verbeterde en de codebase in lijn bracht met moderne Android-ontwikkelpraktijken.",
    },
    ibiza: {
      slug: "ibiza",
      category: "BOEKINGSPLATFORM",
      summary:
        "Compleet boekingsplatform voor tickets, privéboten en activiteiten op Ibiza — binnen twee weken 150 tickets verkocht.",
      description:
        "Voor onze Franse partner bouwden we het volledige Ibiza Mi Vida-platform: een meertalige boekingssite voor events, clubtickets, privéboten en activiteiten, met custom CMS en directe partnerships met bedrijven op het eiland. Dankzij een slimme SEO-strategie werden binnen twee weken na livegang al 150 tickets verkocht.",
    },
    equivest: {
      slug: "equivest",
      category: "PLATFORM & CMS",
      summary:
        "Meertalig platform voor de handel in elite sportpaarden — custom CMS, investeerdersportaal en social-media-builder.",
      description:
        "Voor Equivest bouwden we het volledige platform: een meertalige website (EN/NL/DE/ES), een custom CMS met ingebouwde social-media-builder, een afgeschermd investeerdersportaal en een privécollectie achter toegangscode. Van paardencatalogus tot referenties — alles wordt beheerd vanuit één omgeving.",
    },
    robeco: {
      slug: "robeco",
      category: "FINANCE",
      summary: "Digitale oplossing binnen de financiële dienstverlening.",
      description:
        "Een digitale oplossing binnen de financiële dienstverlening, ontwikkeld met oog voor betrouwbaarheid en een heldere gebruikerservaring.",
    },
    nunhems: {
      slug: "nunhems",
      category: "AGRI & KOTLIN MULTIPLATFORM",
      summary:
        "Kotlin Multiplatform tablet-app waarmee telers hun gewassen in kassen bijhouden, ook met weinig tot geen internetverbinding.",
      description:
        "We bouwden een Kotlin Multiplatform-applicatie voor tablets waarmee telers hun gewassen in kassen kunnen bijhouden, ook op plekken met weinig tot geen internetverbinding. De app is offline-first ontworpen en synchroniseert data automatisch zodra er weer verbinding is, zodat het werk op de kas nooit hoeft te wachten op een signaal.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRI & ANDROID APP",
      summary: "Android-app voor een e-commerceplatform waarmee boeren snel producten bestellen — volledig functioneel offline.",
      description:
        "We ontwikkelden een Android-applicatie voor een e-commerceplatform gericht op boeren, waarmee zij snel en eenvoudig producten kunnen bestellen vanaf het land. De app is volledig offline te gebruiken, zodat gebruikers op plekken met weinig tot geen internetverbinding gewoon door kunnen werken.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE & CMS",
      summary:
        "Complete maatwerk webshop met eigen CMS — van A tot Z aanpasbaar, zonder maandelijkse Shopify-kosten.",
      description:
        "Voor VaMiPro bouwden we een complete webshop volledig op maat: productcatalogus, winkelwagen, kortingscodes en combinatiedeals, met een eigen CMS waarin de klant alles van A tot Z zelf aanpast — teksten, producten, acties en campagnes. Custom gebouwd, dus zonder de maandelijkse kosten van een Shopify-abonnement.",
    },
    "viesa-dashboard": {
      slug: "viesa-dashboard",
      category: "EIGEN PLATFORM",
      summary:
        "Ons eigen alles-in-één sales- en administratiedashboard — van leads en offertes tot facturen, AI-audits en e-mailcampagnes.",
      description:
        "We bouwden ons eigen alles-in-één dashboard waarin het hele bedrijf draait: leads en pipeline als kanban, offertes met AI-generator die met één klik een factuur worden, facturen met automatische herinneringen, agenda, taken en e-mail met promomail-builder. De belmodule bevat belscripts en AI-suggesties, en de AI Visibility Audit vraagt ChatGPT, Claude, Gemini en Perplexity parallel wie zij aanraden in een niche — inclusief PDF-rapport voor de prospect. Aangevuld met notulen, whiteboards, projectnotities, sjablonen en een globale zoekfunctie: één omgeving, alles geautomatiseerd.",
    },
  },
  en: {
    wehkamp: {
      slug: "wehkamp",
      category: "MOBILE APP",
      summary:
        "Contributed to the native Wehkamp and Kleertjes apps — a support chatbot, new search, and a move from XML views to Jetpack Compose.",
      description:
        "We contributed to the development of the native Wehkamp app and the Kleertjes app. We built and integrated a customer support chatbot that gives users instant answers to frequently asked questions inside the app, implemented new search functionality using Jetpack Compose and Jetpack Navigation, and led the migration of legacy XML-based UI components to Jetpack Compose — improving code maintainability and bringing the codebase in line with modern Android development practices.",
    },
    ibiza: {
      slug: "ibiza",
      category: "BOOKING PLATFORM",
      summary:
        "Complete booking platform for tickets, private boats and activities on Ibiza — 150 tickets sold within two weeks.",
      description:
        "For our French partner we built the entire Ibiza Mi Vida platform: a multilingual booking site for events, club tickets, private boats and activities, with a custom CMS and direct partnerships with businesses on the island. Thanks to a smart SEO strategy, 150 tickets were sold within two weeks of launch.",
    },
    equivest: {
      slug: "equivest",
      category: "PLATFORM & CMS",
      summary:
        "Multilingual platform for trading elite sport horses — custom CMS, investors portal and social media builder.",
      description:
        "For Equivest we built the entire platform: a multilingual website (EN/NL/DE/ES), a custom CMS with a built-in social media builder, a gated investors portal and a private collection behind an access code. From the horse catalogue to references — everything is managed from a single environment.",
    },
    robeco: {
      slug: "robeco",
      category: "FINANCE",
      summary: "Digital solution within financial services.",
      description:
        "A digital solution within financial services, developed with an eye for reliability and a clear user experience.",
    },
    nunhems: {
      slug: "nunhems",
      category: "AGRI & KOTLIN MULTIPLATFORM",
      summary:
        "Kotlin Multiplatform tablet app that lets farmers track greenhouse crops with little to no internet connectivity.",
      description:
        "We built a Kotlin Multiplatform application for tablets, giving farmers a way to track their crops in greenhouses even where internet connectivity is poor or absent. The app was designed offline-first, syncing data automatically once a connection becomes available, so fieldwork never has to wait on a signal.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRI & ANDROID APP",
      summary:
        "Android app for an e-commerce platform that lets farmers order products quickly — fully functional offline.",
      description:
        "We developed an Android application for an e-commerce platform aimed at farmers, letting them order products quickly and easily from the field. The app was built to be fully functional offline, so users in locations with little to no internet connectivity can keep working without interruption.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE & CMS",
      summary:
        "Complete custom-built webshop with its own CMS — customisable from A to Z, without monthly Shopify fees.",
      description:
        "For VaMiPro we built a complete webshop fully from scratch: product catalogue, cart, discount codes and bundle deals, with its own CMS in which the client adjusts everything from A to Z — copy, products, promotions and campaigns. Custom built, so without the monthly cost of a Shopify subscription.",
    },
    "viesa-dashboard": {
      slug: "viesa-dashboard",
      category: "IN-HOUSE PLATFORM",
      summary:
        "Our own all-in-one sales and admin dashboard — from leads and quotes to invoices, AI audits and email campaigns.",
      description:
        "We built our own all-in-one dashboard that runs the entire business: leads and pipeline as a kanban, quotes with an AI generator that turn into invoices in one click, invoices with automatic reminders, calendar, tasks and email with a promo-mail builder. The calling module ships call scripts and AI suggestions, and the AI Visibility Audit asks ChatGPT, Claude, Gemini and Perplexity in parallel who they recommend in a niche — including a PDF report for the prospect. Rounded out with meeting notes, whiteboards, project notes, templates and global search: one environment, everything automated.",
    },
  },
  es: {
    wehkamp: {
      slug: "wehkamp",
      category: "APLICACIÓN MÓVIL",
      summary:
        "Colaboración en las apps nativas de Wehkamp y Kleertjes: chatbot de soporte, nueva búsqueda y migración de XML a Jetpack Compose.",
      description:
        "Colaboramos en el desarrollo de la app nativa de Wehkamp y de la app Kleertjes. Desarrollamos e integramos un chatbot de atención al cliente que da respuestas instantáneas a las preguntas frecuentes dentro de la app, implementamos una nueva funcionalidad de búsqueda con Jetpack Compose y Jetpack Navigation, y lideramos la migración de los componentes de UI basados en XML heredado a Jetpack Compose, mejorando la mantenibilidad del código y alineando la base de código con las prácticas modernas de desarrollo Android.",
    },
    ibiza: {
      slug: "ibiza",
      category: "PLATAFORMA DE RESERVAS",
      summary:
        "Plataforma completa de reservas de entradas, barcos privados y actividades en Ibiza: 150 entradas vendidas en dos semanas.",
      description:
        "Para nuestro socio francés desarrollamos la plataforma completa de Ibiza Mi Vida: una web de reservas multilingüe para eventos, entradas de clubs, barcos privados y actividades, con un CMS a medida y colaboraciones directas con empresas de la isla. Gracias a una estrategia SEO inteligente, se vendieron 150 entradas en las dos primeras semanas tras el lanzamiento.",
    },
    equivest: {
      slug: "equivest",
      category: "PLATAFORMA Y CMS",
      summary:
        "Plataforma multilingüe para la compraventa de caballos de deporte de élite: CMS a medida, portal de inversores y creador de contenido social.",
      description:
        "Para Equivest desarrollamos la plataforma completa: una web multilingüe (EN/NL/DE/ES), un CMS a medida con creador de contenido para redes sociales integrado, un portal privado para inversores y una colección privada protegida con código de acceso. Del catálogo de caballos a las referencias: todo se gestiona desde un único entorno.",
    },
    robeco: {
      slug: "robeco",
      category: "FINANZAS",
      summary: "Solución digital dentro de los servicios financieros.",
      description:
        "Una solución digital dentro de los servicios financieros, desarrollada con atención a la fiabilidad y a una experiencia de usuario clara.",
    },
    nunhems: {
      slug: "nunhems",
      category: "AGRO Y KOTLIN MULTIPLATFORM",
      summary:
        "App Kotlin Multiplatform para tablets con la que los agricultores registran sus cultivos en invernaderos, con poca o ninguna conexión a internet.",
      description:
        "Desarrollamos una aplicación Kotlin Multiplatform para tablets que permite a los agricultores hacer seguimiento de sus cultivos en invernaderos, incluso en lugares con poca o ninguna conectividad a internet. La app se diseñó offline-first y sincroniza los datos automáticamente en cuanto hay conexión, para que el trabajo en el invernadero nunca tenga que esperar a una señal.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRO Y APP ANDROID",
      summary:
        "App Android para una plataforma de e-commerce con la que los agricultores piden productos rápidamente, totalmente funcional sin conexión.",
      description:
        "Desarrollamos una aplicación Android para una plataforma de comercio electrónico dirigida a agricultores, con la que pueden pedir productos de forma rápida y sencilla desde el campo. La app se diseñó para funcionar completamente sin conexión, de modo que los usuarios en zonas con poca o ninguna conectividad puedan seguir trabajando sin interrupciones.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE Y CMS",
      summary:
        "Tienda online completa a medida con CMS propio: personalizable de la A a la Z, sin cuotas mensuales de Shopify.",
      description:
        "Para VaMiPro desarrollamos una tienda online completa totalmente a medida: catálogo de productos, carrito, códigos de descuento y packs combinados, con un CMS propio en el que el cliente ajusta todo de la A a la Z — textos, productos, promociones y campañas. Desarrollo a medida, sin el coste mensual de una suscripción a Shopify.",
    },
    "viesa-dashboard": {
      slug: "viesa-dashboard",
      category: "PLATAFORMA PROPIA",
      summary:
        "Nuestro propio panel todo en uno de ventas y administración: de leads y presupuestos a facturas, auditorías con IA y campañas de correo.",
      description:
        "Construimos nuestro propio panel todo en uno en el que funciona todo el negocio: leads y pipeline en kanban, presupuestos con generador de IA que se convierten en factura con un clic, facturas con recordatorios automáticos, agenda, tareas y correo con creador de promomails. El módulo de llamadas incluye guiones y sugerencias de IA, y la AI Visibility Audit pregunta en paralelo a ChatGPT, Claude, Gemini y Perplexity a quién recomiendan en un nicho, con informe PDF para el prospecto. Completado con actas, pizarras, notas de proyecto, plantillas y búsqueda global: un único entorno, todo automatizado.",
    },
  },
};

const byLocale: Record<Locale, CaseStudy[]> = Object.fromEntries(
  locales.map((locale) => [
    locale,
    base.map((b) => caseSchema.parse({ ...b, ...copy[locale][b.id] })),
  ]),
) as Record<Locale, CaseStudy[]>;

export function getCases(locale: Locale): CaseStudy[] {
  return byLocale[locale];
}

export function getCaseSlugs(locale: Locale): string[] {
  return byLocale[locale].map((c) => c.slug);
}

export function findCase(locale: Locale, slug: string): CaseStudy | undefined {
  return byLocale[locale].find((c) => c.slug === slug);
}

export function getOtherCases(locale: Locale, id: string, limit = 3): CaseStudy[] {
  return byLocale[locale].filter((c) => c.id !== id).slice(0, limit);
}

/** Slug of `id` in every locale — feeds hreflang and the language switcher. */
export function caseAlternateSlugs(id: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => {
      const entry = copy[l][id];
      if (!entry) throw new Error(`Missing ${l} copy for case "${id}"`);
      return [l, entry.slug];
    }),
  ) as Record<Locale, string>;
}

/* ------------------------------------------------------------------------- *
 * Dutch-bound compatibility exports.
 *
 * The pages under `src/app` still render a single language. They keep working
 * against these until the routes move to `src/app/[lang]`, at which point the
 * whole block can go.
 * ------------------------------------------------------------------------- */

export const cases: CaseStudy[] = byLocale[defaultLocale];
export const caseSlugs: string[] = getCaseSlugs(defaultLocale);
export const getCase = (slug: string) => findCase(defaultLocale, slug);
export const otherCases = (slug: string, limit = 3) =>
  getOtherCases(defaultLocale, slug, limit);
