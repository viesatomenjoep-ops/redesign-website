import { faqItemSchema, type FaqItem } from "@/content/schema";

/** Ported verbatim from the prototype landing page `faqData[]`. */
const data: FaqItem[] = [
  {
    q: "Wat voor bedrijven helpen jullie?",
    a: "Wij helpen bedrijven die hun processen willen automatiseren, efficiënter willen werken of een digitale oplossing op maat nodig hebben. Dit varieert van e-commerce en klantenservice tot interne bedrijfsprocessen, software en mobiele applicaties.",
  },
  {
    q: "Wat kunnen jullie voor ons automatiseren?",
    a: "Vrijwel ieder proces waarin veel handmatig werk, herhaling of data-uitwisseling voorkomt. Denk aan orderverwerking, klantenservice, sales, planning, administratie, dataverwerking en koppelingen tussen verschillende systemen.",
  },
  {
    q: "Kunnen jullie AI integreren in onze bestaande systemen?",
    a: "Ja. We kunnen AI-oplossingen zoals voice agents en chatbots koppelen aan bestaande software, websites, CRM-systemen en andere bedrijfssystemen. Hierdoor kan AI niet alleen vragen beantwoorden, maar ook daadwerkelijk acties uitvoeren.",
  },
  {
    q: "Kunnen jullie ook maatwerksoftware ontwikkelen?",
    a: "Ja. We ontwikkelen volledig op maat gemaakte software die aansluit op uw bedrijfsprocessen. Denk aan boekingssystemen, klantportalen, planningssoftware, dashboards, CMS-platformen en andere interne tools.",
  },
  {
    q: "Ontwikkelen jullie ook mobiele apps?",
    a: "Ja. We ontwikkelen zowel native mobiele applicaties als moderne webapps. We kunnen een compleet nieuwe applicatie bouwen of een bestaande website, software of bedrijfsproces uitbreiden met een mobiele oplossing.",
  },
  {
    q: "Hoe verloopt een gemiddeld project?",
    a: "We beginnen met het begrijpen van uw bedrijf, processen en doelstellingen. Vervolgens bepalen we samen de beste oplossing en delen we het project op in duidelijke fases. Iedere fase levert een werkend en productieklaar onderdeel op, waardoor u snel resultaat ziet en tussentijds kunt bijsturen.",
  },
  {
    q: "Waarom werken jullie in fases?",
    a: "Door software gefaseerd op te leveren, hoeft u niet te wachten tot het volledige project klaar is. U krijgt snel een werkende oplossing, houdt flexibiliteit en kunt op basis van de eerste resultaten verdere keuzes maken.",
  },
  {
    q: "Welke technologie gebruiken jullie?",
    a: "We werken met een moderne en bewezen tech stack, waaronder Kotlin, Java, TypeScript en Next.js. Per project bepalen we welke technologie het beste past bij de gewenste oplossing, schaalbaarheid en toekomstplannen.",
  },
  {
    q: "Verzorgen jullie ook onderhoud na de livegang?",
    a: "Ja. Ook na de oplevering blijven we beschikbaar voor onderhoud, bugfixing, optimalisaties en verdere doorontwikkeling. Zo kan uw software meegroeien met uw organisatie.",
  },
  {
    q: "Wat levert automatisering ons concreet op?",
    a: "Automatisering kan zorgen voor minder handmatig werk, lagere operationele kosten, minder fouten en snellere processen. Daarnaast ontstaat er meer ruimte voor medewerkers om zich te richten op werkzaamheden die daadwerkelijk waarde toevoegen.",
  },
];

export const faqItems: FaqItem[] = data.map((f) => faqItemSchema.parse(f));
