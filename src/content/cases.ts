import { caseSchema, type CaseStudy } from "@/content/schema";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/** Ported from the prototype `Cases.dc.html` + `Case Detail.dc.html` (casesData[]).
 *  Image paths assume the prototype's `uploads/` folder is copied to
 *  `public/uploads/` (see README).
 *
 *  `id` is the stable key across locales (it happens to equal the Dutch slug);
 *  `slug` is what appears in the URL and differs per locale. Company names and
 *  imagery are locale-independent and live in `base`. */

type CaseBase = { id: string; name: string; image: string | null };

type CaseCopy = {
  slug: string;
  category: string;
  summary: string;
  description: string;
};

const base: CaseBase[] = [
  { id: "wehkamp", name: "Wehkamp", image: "/uploads/card-wehkamp.jpg" },
  { id: "ibiza", name: "Ibiza Mi Vida", image: "/uploads/case-ibiza-site.jpg" },
  { id: "rooster", name: "Rooster", image: "/uploads/case-rooster.jpeg" },
  { id: "equivest", name: "Equivest", image: "/uploads/case-equivest-site.jpg" },
  { id: "robeco", name: "Robeco", image: "/uploads/case-robeco.avif" },
  { id: "nunhems", name: "Nunhems", image: "/uploads/case-nunhems.jpg" },
  { id: "schippers", name: "MS Schippers", image: "/uploads/card-schippers.jpg" },
  { id: "vamipro", name: "VaMiPro", image: "/uploads/case-vamipro-site.jpg" },
];

const copy: Record<Locale, Record<string, CaseCopy>> = {
  nl: {
    wehkamp: {
      slug: "wehkamp",
      category: "E-COMMERCE",
      summary: "Automatisering en integraties voor een grootschalig e-commerceplatform.",
      description:
        "Voor Wehkamp bouwden we automatiseringen en integraties die processen rond het e-commerceplatform stroomlijnen, zodat data foutloos tussen systemen doorstroomt en handmatig werk afneemt.",
    },
    ibiza: {
      slug: "ibiza",
      category: "BOEKINGSPLATFORM",
      summary:
        "Compleet boekingsplatform voor tickets, privéboten en activiteiten op Ibiza — binnen twee weken 150 tickets verkocht.",
      description:
        "Voor onze Franse partner bouwden we het volledige Ibiza Mi Vida-platform: een meertalige boekingssite voor events, clubtickets, privéboten en activiteiten, met custom CMS en directe partnerships met bedrijven op het eiland. Dankzij een slimme SEO-strategie werden binnen twee weken na livegang al 150 tickets verkocht.",
    },
    rooster: {
      slug: "rooster",
      category: "PLANNINGSSOFTWARE",
      summary: "Planningsoplossing die roosterbeheer eenvoudiger en overzichtelijker maakt.",
      description:
        "Een planningsoplossing die roosterbeheer overzichtelijker maakt, met een interface die is afgestemd op de dagelijkse werkwijze van de organisatie.",
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
      category: "AGRI",
      summary: "Software ter ondersteuning van processen binnen de agrarische sector.",
      description:
        "Software ter ondersteuning van processen binnen de agrarische sector, afgestemd op de specifieke behoeften van de organisatie.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRI & VEEHOUDERIJ",
      summary: "Maatwerk software voor processen binnen de veehouderijsector.",
      description:
        "Maatwerk software voor processen binnen de veehouderijsector, gebouwd rondom de specifieke werkwijze van de organisatie.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE & CMS",
      summary:
        "Complete maatwerk webshop met eigen CMS — van A tot Z aanpasbaar, zonder maandelijkse Shopify-kosten.",
      description:
        "Voor VaMiPro bouwden we een complete webshop volledig op maat: productcatalogus, winkelwagen, kortingscodes en combinatiedeals, met een eigen CMS waarin de klant alles van A tot Z zelf aanpast — teksten, producten, acties en campagnes. Custom gebouwd, dus zonder de maandelijkse kosten van een Shopify-abonnement.",
    },
  },
  en: {
    wehkamp: {
      slug: "wehkamp",
      category: "E-COMMERCE",
      summary: "Automation and integrations for a large-scale e-commerce platform.",
      description:
        "For Wehkamp we built automations and integrations that streamline the processes around the e-commerce platform, so data flows between systems without errors and manual work decreases.",
    },
    ibiza: {
      slug: "ibiza",
      category: "BOOKING PLATFORM",
      summary:
        "Complete booking platform for tickets, private boats and activities on Ibiza — 150 tickets sold within two weeks.",
      description:
        "For our French partner we built the entire Ibiza Mi Vida platform: a multilingual booking site for events, club tickets, private boats and activities, with a custom CMS and direct partnerships with businesses on the island. Thanks to a smart SEO strategy, 150 tickets were sold within two weeks of launch.",
    },
    rooster: {
      slug: "rooster",
      category: "SCHEDULING SOFTWARE",
      summary: "Scheduling solution that makes roster management simpler and clearer.",
      description:
        "A scheduling solution that makes roster management clearer, with an interface tailored to the organisation's day-to-day way of working.",
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
      category: "AGRI",
      summary: "Software supporting processes within the agricultural sector.",
      description:
        "Software supporting processes within the agricultural sector, tailored to the specific needs of the organisation.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRI & LIVESTOCK",
      summary: "Custom software for processes within the livestock farming sector.",
      description:
        "Custom software for processes within the livestock farming sector, built around the organisation's specific way of working.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE & CMS",
      summary:
        "Complete custom-built webshop with its own CMS — customisable from A to Z, without monthly Shopify fees.",
      description:
        "For VaMiPro we built a complete webshop fully from scratch: product catalogue, cart, discount codes and bundle deals, with its own CMS in which the client adjusts everything from A to Z — copy, products, promotions and campaigns. Custom built, so without the monthly cost of a Shopify subscription.",
    },
  },
  es: {
    wehkamp: {
      slug: "wehkamp",
      category: "COMERCIO ELECTRÓNICO",
      summary:
        "Automatización e integraciones para una plataforma de comercio electrónico a gran escala.",
      description:
        "Para Wehkamp desarrollamos automatizaciones e integraciones que agilizan los procesos en torno a la plataforma de comercio electrónico, de modo que los datos fluyen sin errores entre sistemas y disminuye el trabajo manual.",
    },
    ibiza: {
      slug: "ibiza",
      category: "PLATAFORMA DE RESERVAS",
      summary:
        "Plataforma completa de reservas de entradas, barcos privados y actividades en Ibiza: 150 entradas vendidas en dos semanas.",
      description:
        "Para nuestro socio francés desarrollamos la plataforma completa de Ibiza Mi Vida: una web de reservas multilingüe para eventos, entradas de clubs, barcos privados y actividades, con un CMS a medida y colaboraciones directas con empresas de la isla. Gracias a una estrategia SEO inteligente, se vendieron 150 entradas en las dos primeras semanas tras el lanzamiento.",
    },
    rooster: {
      slug: "rooster",
      category: "SOFTWARE DE PLANIFICACIÓN",
      summary: "Solución de planificación que simplifica y clarifica la gestión de turnos.",
      description:
        "Una solución de planificación que aporta más claridad a la gestión de turnos, con una interfaz adaptada a la forma de trabajar diaria de la organización.",
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
      category: "AGRO",
      summary: "Software de apoyo a los procesos del sector agrario.",
      description:
        "Software de apoyo a los procesos del sector agrario, adaptado a las necesidades específicas de la organización.",
    },
    schippers: {
      slug: "schippers",
      category: "AGRO Y GANADERÍA",
      summary: "Software a medida para los procesos del sector ganadero.",
      description:
        "Software a medida para los procesos del sector ganadero, desarrollado en torno a la forma de trabajar específica de la organización.",
    },
    vamipro: {
      slug: "vamipro",
      category: "E-COMMERCE Y CMS",
      summary:
        "Tienda online completa a medida con CMS propio: personalizable de la A a la Z, sin cuotas mensuales de Shopify.",
      description:
        "Para VaMiPro desarrollamos una tienda online completa totalmente a medida: catálogo de productos, carrito, códigos de descuento y packs combinados, con un CMS propio en el que el cliente ajusta todo de la A a la Z — textos, productos, promociones y campañas. Desarrollo a medida, sin el coste mensual de una suscripción a Shopify.",
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
