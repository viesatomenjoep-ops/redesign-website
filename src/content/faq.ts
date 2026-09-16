import { faqItemSchema, type FaqItem } from "@/content/schema";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/** Ported verbatim from the prototype landing page `faqData[]`, then translated.
 *  Order is identical across locales so the accordion keys stay stable. */
const data: Record<Locale, FaqItem[]> = {
  nl: [
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
  ],
  en: [
    {
      q: "What kind of companies do you help?",
      a: "We help companies that want to automate their processes, work more efficiently or need a tailor-made digital solution. This ranges from e-commerce and customer service to internal business processes, software and mobile applications.",
    },
    {
      q: "What can you automate for us?",
      a: "Almost any process that involves a lot of manual work, repetition or data exchange. Think of order processing, customer service, sales, scheduling, administration, data processing and connections between different systems.",
    },
    {
      q: "Can you integrate AI into our existing systems?",
      a: "Yes. We can connect AI solutions such as voice agents and chatbots to existing software, websites, CRM systems and other business systems. This way AI can not only answer questions, but also actually carry out actions.",
    },
    {
      q: "Can you also develop custom software?",
      a: "Yes. We develop fully tailor-made software that fits your business processes. Think of booking systems, customer portals, scheduling software, dashboards, CMS platforms and other internal tools.",
    },
    {
      q: "Do you also develop mobile apps?",
      a: "Yes. We develop both native mobile applications and modern web apps. We can build a completely new application or extend an existing website, software or business process with a mobile solution.",
    },
    {
      q: "How does a typical project run?",
      a: "We start by understanding your business, processes and objectives. We then determine the best solution together and split the project into clear phases. Each phase delivers a working, production-ready component, so you see results quickly and can adjust course along the way.",
    },
    {
      q: "Why do you work in phases?",
      a: "By delivering software in phases, you do not have to wait until the entire project is finished. You get a working solution quickly, retain flexibility and can make further choices based on the first results.",
    },
    {
      q: "Which technology do you use?",
      a: "We work with a modern and proven tech stack, including Kotlin, Java, TypeScript and Next.js. For each project we determine which technology best suits the desired solution, scalability and future plans.",
    },
    {
      q: "Do you also provide maintenance after launch?",
      a: "Yes. After delivery we remain available for maintenance, bug fixing, optimisations and further development. That way your software can grow along with your organisation.",
    },
    {
      q: "What does automation actually deliver for us?",
      a: "Automation can lead to less manual work, lower operational costs, fewer errors and faster processes. It also creates more room for employees to focus on work that genuinely adds value.",
    },
  ],
  es: [
    {
      q: "¿A qué tipo de empresas ayudan?",
      a: "Ayudamos a empresas que quieren automatizar sus procesos, trabajar de forma más eficiente o necesitan una solución digital a medida. Esto abarca desde el comercio electrónico y la atención al cliente hasta los procesos internos, el software y las aplicaciones móviles.",
    },
    {
      q: "¿Qué pueden automatizar para nosotros?",
      a: "Prácticamente cualquier proceso con mucho trabajo manual, repetición o intercambio de datos. Piense en la gestión de pedidos, la atención al cliente, las ventas, la planificación, la administración, el procesamiento de datos y las conexiones entre distintos sistemas.",
    },
    {
      q: "¿Pueden integrar IA en nuestros sistemas actuales?",
      a: "Sí. Podemos conectar soluciones de IA como agentes de voz y chatbots con el software, las webs, los sistemas CRM y otros sistemas empresariales existentes. Así, la IA no solo responde preguntas, sino que también ejecuta acciones reales.",
    },
    {
      q: "¿Desarrollan también software a medida?",
      a: "Sí. Desarrollamos software totalmente a medida que encaja con sus procesos de negocio. Piense en sistemas de reservas, portales de clientes, software de planificación, cuadros de mando, plataformas CMS y otras herramientas internas.",
    },
    {
      q: "¿Desarrollan también aplicaciones móviles?",
      a: "Sí. Desarrollamos tanto aplicaciones móviles nativas como webapps modernas. Podemos crear una aplicación completamente nueva o ampliar una web, un software o un proceso de negocio existente con una solución móvil.",
    },
    {
      q: "¿Cómo se desarrolla un proyecto habitual?",
      a: "Empezamos por entender su empresa, sus procesos y sus objetivos. A continuación, determinamos juntos la mejor solución y dividimos el proyecto en fases claras. Cada fase entrega una parte funcional y lista para producción, de modo que usted ve resultados rápido y puede ajustar el rumbo por el camino.",
    },
    {
      q: "¿Por qué trabajan por fases?",
      a: "Al entregar el software por fases, no tiene que esperar a que el proyecto completo esté terminado. Obtiene rápidamente una solución funcional, mantiene la flexibilidad y puede tomar las siguientes decisiones a partir de los primeros resultados.",
    },
    {
      q: "¿Qué tecnología utilizan?",
      a: "Trabajamos con un stack tecnológico moderno y probado, que incluye Kotlin, Java, TypeScript y Next.js. En cada proyecto determinamos qué tecnología encaja mejor con la solución deseada, la escalabilidad y los planes de futuro.",
    },
    {
      q: "¿Ofrecen también mantenimiento tras la puesta en marcha?",
      a: "Sí. También después de la entrega seguimos disponibles para el mantenimiento, la corrección de errores, las optimizaciones y el desarrollo posterior. Así, su software puede crecer con su organización.",
    },
    {
      q: "¿Qué nos aporta la automatización en concreto?",
      a: "La automatización puede suponer menos trabajo manual, menores costes operativos, menos errores y procesos más rápidos. Además, deja más espacio a los empleados para centrarse en tareas que realmente aportan valor.",
    },
  ],
};

const byLocale: Record<Locale, FaqItem[]> = Object.fromEntries(
  locales.map((l) => [l, data[l].map((f) => faqItemSchema.parse(f))]),
) as Record<Locale, FaqItem[]>;

export function getFaqItems(locale: Locale): FaqItem[] {
  return byLocale[locale];
}

/** Dutch-bound compatibility export — see the same block in `cases.ts`. */
export const faqItems: FaqItem[] = byLocale[defaultLocale];
