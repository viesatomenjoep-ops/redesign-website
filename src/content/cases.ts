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
  { id: "ibiza", name: "Ibiza Mi Vida", image: "/uploads/pasted-1786565066955-0.png" },
  { id: "rooster", name: "Rooster", image: "/uploads/case-rooster.jpeg" },
  { id: "equivest", name: "Equivest", image: "/uploads/case-equivest.jpeg" },
  { id: "robeco", name: "Robeco", image: "/uploads/case-robeco.avif" },
  { id: "nunhems", name: "Nunhems", image: "/uploads/case-nunhems.jpg" },
  { id: "schippers", name: "MS Schippers", image: "/uploads/card-schippers.jpg" },
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
      category: "MOBIELE APP",
      summary: "Maatwerk mobiele applicatie gebouwd rond de behoeften van de doelgroep.",
      description:
        "Een maatwerk mobiele applicatie, ontwikkeld van concept tot livegang, met een gebruiksvriendelijke interface die aansluit op de behoeften van de doelgroep.",
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
      category: "FINTECH",
      summary: "Platform voor investeringsbeheer met heldere, realtime inzichten.",
      description:
        "Een platform voor investeringsbeheer, gebouwd met een focus op heldere, realtime inzichten in portefeuilles en prestaties.",
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
      category: "MOBILE APP",
      summary: "Custom mobile application built around the needs of the target audience.",
      description:
        "A custom mobile application, developed from concept to launch, with a user-friendly interface that matches the needs of the target audience.",
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
      category: "FINTECH",
      summary: "Investment management platform with clear, real-time insights.",
      description:
        "An investment management platform, built with a focus on clear, real-time insight into portfolios and performance.",
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
      category: "APLICACIÓN MÓVIL",
      summary:
        "Aplicación móvil a medida creada en torno a las necesidades del público objetivo.",
      description:
        "Una aplicación móvil a medida, desarrollada desde el concepto hasta la puesta en marcha, con una interfaz fácil de usar que responde a las necesidades del público objetivo.",
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
      category: "FINTECH",
      summary: "Plataforma de gestión de inversiones con información clara y en tiempo real.",
      description:
        "Una plataforma de gestión de inversiones, desarrollada con el foco puesto en ofrecer información clara y en tiempo real sobre las carteras y su rendimiento.",
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
