import { caseSchema, type CaseStudy } from "@/content/schema";

/** Ported from the prototype `Cases.dc.html` + `Case Detail.dc.html` (casesData[]).
 *  Image paths assume the prototype's `uploads/` folder is copied to
 *  `public/uploads/` (see README). */
const data: CaseStudy[] = [
  {
    slug: "wehkamp",
    name: "Wehkamp",
    category: "E-COMMERCE",
    image: "/uploads/card-wehkamp.jpg",
    summary: "Automatisering en integraties voor een grootschalig e-commerceplatform.",
    description:
      "Voor Wehkamp bouwden we automatiseringen en integraties die processen rond het e-commerceplatform stroomlijnen, zodat data foutloos tussen systemen doorstroomt en handmatig werk afneemt.",
  },
  {
    slug: "ibiza",
    name: "Ibiza Mi Vida",
    category: "MOBIELE APP",
    image: "/uploads/pasted-1786565066955-0.png",
    summary: "Maatwerk mobiele applicatie gebouwd rond de behoeften van de doelgroep.",
    description:
      "Een maatwerk mobiele applicatie, ontwikkeld van concept tot livegang, met een gebruiksvriendelijke interface die aansluit op de behoeften van de doelgroep.",
  },
  {
    slug: "rooster",
    name: "Rooster",
    category: "PLANNINGSSOFTWARE",
    image: "/uploads/case-rooster.jpeg",
    summary: "Planningsoplossing die roosterbeheer eenvoudiger en overzichtelijker maakt.",
    description:
      "Een planningsoplossing die roosterbeheer overzichtelijker maakt, met een interface die is afgestemd op de dagelijkse werkwijze van de organisatie.",
  },
  {
    slug: "equivest",
    name: "Equivest",
    category: "FINTECH",
    image: "/uploads/case-equivest.jpeg",
    summary: "Platform voor investeringsbeheer met heldere, realtime inzichten.",
    description:
      "Een platform voor investeringsbeheer, gebouwd met een focus op heldere, realtime inzichten in portefeuilles en prestaties.",
  },
  {
    slug: "robeco",
    name: "Robeco",
    category: "FINANCE",
    image: "/uploads/case-robeco.avif",
    summary: "Digitale oplossing binnen de financiële dienstverlening.",
    description:
      "Een digitale oplossing binnen de financiële dienstverlening, ontwikkeld met oog voor betrouwbaarheid en een heldere gebruikerservaring.",
  },
  {
    slug: "nunhems",
    name: "Nunhems",
    category: "AGRI",
    image: "/uploads/case-nunhems.jpg",
    summary: "Software ter ondersteuning van processen binnen de agrarische sector.",
    description:
      "Software ter ondersteuning van processen binnen de agrarische sector, afgestemd op de specifieke behoeften van de organisatie.",
  },
  {
    slug: "schippers",
    name: "MS Schippers",
    category: "AGRI & VEEHOUDERIJ",
    image: "/uploads/card-schippers.jpg",
    summary: "Maatwerk software voor processen binnen de veehouderijsector.",
    description:
      "Maatwerk software voor processen binnen de veehouderijsector, gebouwd rondom de specifieke werkwijze van de organisatie.",
  },
];

export const cases: CaseStudy[] = data.map((c) => caseSchema.parse(c));

export const caseSlugs = cases.map((c) => c.slug);

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function otherCases(slug: string, limit = 3): CaseStudy[] {
  return cases.filter((c) => c.slug !== slug).slice(0, limit);
}
