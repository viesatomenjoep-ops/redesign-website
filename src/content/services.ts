import { serviceSchema, type Service } from "@/content/schema";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/** Ported from the prototype `Service Detail.dc.html` (services[]).
 *
 *  `id` is the stable key across locales (it equals the Dutch slug); `slug` is
 *  the localised URL segment. Lucide icon names are locale-independent and live
 *  in `base`, so a copy change can never desync the icons. */

type ServiceBase = { id: string; icon: string; featureIcons: string[] };

type ServiceCopy = {
  slug: string;
  label: string;
  title: string;
  intro: string;
  imagePlaceholder: string;
  features: { title: string; text: string }[];
};

const base: ServiceBase[] = [
  {
    id: "ai-calling-agents",
    icon: "phone-call",
    featureIcons: ["phone-call", "calendar-check", "settings-2"],
  },
  {
    id: "ai-chatbots",
    icon: "message-circle",
    featureIcons: ["message-circle", "shopping-cart", "plug"],
  },
  {
    id: "workflow-automatisering",
    icon: "workflow",
    featureIcons: ["link-2", "gauge", "shield-check"],
  },
  {
    id: "websites-apps",
    icon: "globe",
    featureIcons: ["search", "sparkles", "smartphone"],
  },
  {
    id: "kpi-dashboards",
    icon: "layout-dashboard",
    featureIcons: ["bar-chart-3", "layout-dashboard", "target"],
  },
  {
    id: "software-portalen",
    icon: "app-window",
    featureIcons: ["app-window", "users", "layers"],
  },
];

const copy: Record<Locale, Record<string, ServiceCopy>> = {
  nl: {
    "ai-calling-agents": {
      slug: "ai-calling-agents",
      label: "TELEFONIE",
      title: "AI Calling Agents",
      intro:
        "Volledig geautomatiseerde, meertalige klantenservice via telefoon — 24/7 beschikbaar en gekoppeld aan uw bestaande systemen.",
      imagePlaceholder: "beeld: AI calling agent interface",
      features: [
        {
          title: "Altijd bereikbaar",
          text: "Uw klanten worden dag en nacht te woord gestaan, zonder wachttijd.",
        },
        {
          title: "Boekingen & acties",
          text: "De agent maakt boekingen, verwerkt klantgegevens en voert acties direct uit in uw systemen.",
        },
        {
          title: "Volledig instelbaar",
          text: "Inzetbaar op ieder gewenst telefoonnummer, flexibel in te stellen op specifieke dagen en tijden.",
        },
      ],
    },
    "ai-chatbots": {
      slug: "ai-chatbots",
      label: "KLANTENSERVICE",
      title: "AI Chatbots",
      intro:
        "Slimme chatbots die repetitieve werkzaamheden uit handen nemen en direct gekoppeld kunnen worden aan uw bestaande systemen.",
      imagePlaceholder: "beeld: AI chatbot gesprek",
      features: [
        {
          title: "Directe antwoorden",
          text: "Klantvragen worden direct en correct beantwoord, zonder wachttijd.",
        },
        {
          title: "Verwerkt bestellingen",
          text: "De chatbot voert acties automatisch uit, van bestellingen tot statuswijzigingen.",
        },
        {
          title: "Eenvoudig te integreren",
          text: "Snel te implementeren in uw bestaande website en infrastructuur.",
        },
      ],
    },
    "workflow-automatisering": {
      slug: "workflow-automatisering",
      label: "INTEGRATIES",
      title: "Workflow-automatisering",
      intro:
        "Elimineer handmatig werk door uw bestaande systemen slim met elkaar te verbinden.",
      imagePlaceholder: "beeld: workflow-diagram",
      features: [
        {
          title: "Systemen verbonden",
          text: "Data wordt automatisch, naadloos en foutloos tussen systemen uitgewisseld.",
        },
        {
          title: "Sneller & efficiënter",
          text: "Processen verlopen sneller en zijn minder foutgevoelig.",
        },
        {
          title: "Betrouwbaar",
          text: "Geen handmatige overdracht meer, dus minder kans op fouten.",
        },
      ],
    },
    "websites-apps": {
      slug: "websites-apps",
      label: "DIGITAAL",
      title: "Websites & Apps",
      intro:
        "Digitale oplossingen die aansluiten op uw bedrijf, processen en ambities. Van moderne websites tot mobiele applicaties.",
      imagePlaceholder: "beeld: website en app op scherm",
      features: [
        {
          title: "SEO-geoptimaliseerd",
          text: "Beter vindbaar in Google door technische en inhoudelijke optimalisatie.",
        },
        {
          title: "AEO/GEO-klaar",
          text: "Content en structuur ingericht voor zichtbaarheid in AI-platforms en LLM's zoals ChatGPT en Gemini.",
        },
        {
          title: "Native & PWA",
          text: "Native apps voor iOS en Android of moderne webapps, passend bij uw doelgroep.",
        },
      ],
    },
    "kpi-dashboards": {
      slug: "kpi-dashboards",
      label: "INZICHT",
      title: "KPI-Dashboards",
      intro:
        "Maak complexe data eenvoudig inzichtelijk met dashboards die realtime inzicht geven in uw prestaties.",
      imagePlaceholder: "beeld: KPI-dashboard",
      features: [
        {
          title: "Realtime inzicht",
          text: "Backend-data vertaald naar overzichtelijke, actuele cijfers.",
        },
        {
          title: "Gebruiksvriendelijk",
          text: "Een helder overzicht van alle vitale bedrijfsresultaten op één scherm.",
        },
        {
          title: "Op maat",
          text: "Gebouwd rond de KPI's die voor uw organisatie daadwerkelijk relevant zijn.",
        },
      ],
    },
    "software-portalen": {
      slug: "software-portalen",
      label: "MAATWERK",
      title: "Software & Portalen",
      intro:
        "Software die volledig aansluit op uw specifieke bedrijfsprocessen — boekingssystemen, klantportalen, CMS-omgevingen en meer.",
      imagePlaceholder: "beeld: maatwerk software portaal",
      features: [
        {
          title: "Volledig op maat",
          text: "Gebouwd rondom de manier waarop uw organisatie werkt.",
        },
        {
          title: "Klant- & planningsportalen",
          text: "Van boekingssystemen tot planningsportalen en klantportalen.",
        },
        {
          title: "Schaalbaar",
          text: "Software die meegroeit met uw organisatie en processen.",
        },
      ],
    },
  },
  en: {
    "ai-calling-agents": {
      slug: "ai-calling-agents",
      label: "TELEPHONY",
      title: "AI Calling Agents",
      intro:
        "Fully automated, multilingual customer service by phone — available 24/7 and connected to your existing systems.",
      imagePlaceholder: "image: AI calling agent interface",
      features: [
        {
          title: "Always reachable",
          text: "Your customers are assisted day and night, without waiting times.",
        },
        {
          title: "Bookings & actions",
          text: "The agent makes bookings, processes customer data and carries out actions directly in your systems.",
        },
        {
          title: "Fully configurable",
          text: "Deployable on any phone number you choose, flexibly configurable for specific days and times.",
        },
      ],
    },
    "ai-chatbots": {
      slug: "ai-chatbots",
      label: "CUSTOMER SERVICE",
      title: "AI Chatbots",
      intro:
        "Smart chatbots that take repetitive work off your hands and can be connected directly to your existing systems.",
      imagePlaceholder: "image: AI chatbot conversation",
      features: [
        {
          title: "Instant answers",
          text: "Customer questions are answered immediately and correctly, without waiting times.",
        },
        {
          title: "Processes orders",
          text: "The chatbot carries out actions automatically, from orders to status changes.",
        },
        {
          title: "Easy to integrate",
          text: "Quick to implement in your existing website and infrastructure.",
        },
      ],
    },
    "workflow-automatisering": {
      slug: "workflow-automation",
      label: "INTEGRATIONS",
      title: "Workflow automation",
      intro: "Eliminate manual work by connecting your existing systems intelligently.",
      imagePlaceholder: "image: workflow diagram",
      features: [
        {
          title: "Systems connected",
          text: "Data is exchanged between systems automatically, seamlessly and without errors.",
        },
        {
          title: "Faster & more efficient",
          text: "Processes run faster and are less error-prone.",
        },
        {
          title: "Reliable",
          text: "No more manual handovers, so less chance of errors.",
        },
      ],
    },
    "websites-apps": {
      slug: "websites-apps",
      label: "DIGITAL",
      title: "Websites & Apps",
      intro:
        "Digital solutions that fit your business, processes and ambitions. From modern websites to mobile applications.",
      imagePlaceholder: "image: website and app on screen",
      features: [
        {
          title: "SEO-optimised",
          text: "Easier to find in Google through technical and content optimisation.",
        },
        {
          title: "AEO/GEO-ready",
          text: "Content and structure set up for visibility in AI platforms and LLMs such as ChatGPT and Gemini.",
        },
        {
          title: "Native & PWA",
          text: "Native apps for iOS and Android or modern web apps, suited to your audience.",
        },
      ],
    },
    "kpi-dashboards": {
      slug: "kpi-dashboards",
      label: "INSIGHT",
      title: "KPI Dashboards",
      intro:
        "Make complex data easy to understand with dashboards that give real-time insight into your performance.",
      imagePlaceholder: "image: KPI dashboard",
      features: [
        {
          title: "Real-time insight",
          text: "Backend data translated into clear, up-to-date figures.",
        },
        {
          title: "User-friendly",
          text: "A clear overview of all vital business results on a single screen.",
        },
        {
          title: "Tailor-made",
          text: "Built around the KPIs that are genuinely relevant to your organisation.",
        },
      ],
    },
    "software-portalen": {
      slug: "software-portals",
      label: "CUSTOM",
      title: "Software & Portals",
      intro:
        "Software that fits your specific business processes completely — booking systems, customer portals, CMS environments and more.",
      imagePlaceholder: "image: custom software portal",
      features: [
        {
          title: "Fully tailor-made",
          text: "Built around the way your organisation works.",
        },
        {
          title: "Customer & scheduling portals",
          text: "From booking systems to scheduling portals and customer portals.",
        },
        {
          title: "Scalable",
          text: "Software that grows along with your organisation and processes.",
        },
      ],
    },
  },
  es: {
    "ai-calling-agents": {
      slug: "agentes-de-llamadas-con-ia",
      label: "TELEFONÍA",
      title: "Agentes de llamadas con IA",
      intro:
        "Atención al cliente telefónica totalmente automatizada y multilingüe: disponible 24/7 y conectada a sus sistemas actuales.",
      imagePlaceholder: "imagen: interfaz de agente de llamadas con IA",
      features: [
        {
          title: "Siempre disponible",
          text: "Sus clientes son atendidos de día y de noche, sin tiempos de espera.",
        },
        {
          title: "Reservas y acciones",
          text: "El agente realiza reservas, procesa datos de clientes y ejecuta acciones directamente en sus sistemas.",
        },
        {
          title: "Totalmente configurable",
          text: "Utilizable en cualquier número de teléfono, con configuración flexible para días y horarios concretos.",
        },
      ],
    },
    "ai-chatbots": {
      slug: "chatbots-con-ia",
      label: "ATENCIÓN AL CLIENTE",
      title: "Chatbots con IA",
      intro:
        "Chatbots inteligentes que asumen las tareas repetitivas y pueden conectarse directamente a sus sistemas actuales.",
      imagePlaceholder: "imagen: conversación con chatbot de IA",
      features: [
        {
          title: "Respuestas inmediatas",
          text: "Las preguntas de los clientes se responden de forma inmediata y correcta, sin tiempos de espera.",
        },
        {
          title: "Procesa pedidos",
          text: "El chatbot ejecuta acciones de forma automática, desde pedidos hasta cambios de estado.",
        },
        {
          title: "Fácil de integrar",
          text: "Rápido de implementar en su web e infraestructura actuales.",
        },
      ],
    },
    "workflow-automatisering": {
      slug: "automatizacion-de-flujos",
      label: "INTEGRACIONES",
      title: "Automatización de flujos de trabajo",
      intro:
        "Elimine el trabajo manual conectando de forma inteligente sus sistemas actuales entre sí.",
      imagePlaceholder: "imagen: diagrama de flujo de trabajo",
      features: [
        {
          title: "Sistemas conectados",
          text: "Los datos se intercambian entre sistemas de forma automática, fluida y sin errores.",
        },
        {
          title: "Más rápido y eficiente",
          text: "Los procesos se desarrollan más rápido y son menos propensos a errores.",
        },
        {
          title: "Fiable",
          text: "Sin traspasos manuales, por lo que hay menos riesgo de errores.",
        },
      ],
    },
    "websites-apps": {
      slug: "webs-y-apps",
      label: "DIGITAL",
      title: "Webs y apps",
      intro:
        "Soluciones digitales que encajan con su empresa, sus procesos y sus ambiciones. Desde webs modernas hasta aplicaciones móviles.",
      imagePlaceholder: "imagen: web y app en pantalla",
      features: [
        {
          title: "Optimizado para SEO",
          text: "Mayor visibilidad en Google gracias a la optimización técnica y de contenidos.",
        },
        {
          title: "Preparado para AEO/GEO",
          text: "Contenido y estructura preparados para la visibilidad en plataformas de IA y LLM como ChatGPT y Gemini.",
        },
        {
          title: "Nativa y PWA",
          text: "Apps nativas para iOS y Android o webapps modernas, según su público objetivo.",
        },
      ],
    },
    "kpi-dashboards": {
      slug: "cuadros-de-mando-kpi",
      label: "VISIÓN",
      title: "Cuadros de mando de KPI",
      intro:
        "Haga que los datos complejos sean fáciles de interpretar con dashboards que ofrecen información en tiempo real sobre sus resultados.",
      imagePlaceholder: "imagen: cuadro de mando de KPI",
      features: [
        {
          title: "Información en tiempo real",
          text: "Datos del backend traducidos a cifras claras y actualizadas.",
        },
        {
          title: "Fácil de usar",
          text: "Una visión clara de todos los resultados vitales del negocio en una sola pantalla.",
        },
        {
          title: "A medida",
          text: "Construido en torno a los KPI que realmente son relevantes para su organización.",
        },
      ],
    },
    "software-portalen": {
      slug: "software-y-portales",
      label: "A MEDIDA",
      title: "Software y portales",
      intro:
        "Software que encaja plenamente con sus procesos de negocio específicos: sistemas de reservas, portales de clientes, entornos CMS y más.",
      imagePlaceholder: "imagen: portal de software a medida",
      features: [
        {
          title: "Totalmente a medida",
          text: "Construido en torno a la forma en que trabaja su organización.",
        },
        {
          title: "Portales de clientes y planificación",
          text: "Desde sistemas de reservas hasta portales de planificación y portales de clientes.",
        },
        {
          title: "Escalable",
          text: "Software que crece con su organización y sus procesos.",
        },
      ],
    },
  },
};

const byLocale: Record<Locale, Service[]> = Object.fromEntries(
  locales.map((locale) => [
    locale,
    base.map((b) => {
      const c = copy[locale][b.id];
      return serviceSchema.parse({
        id: b.id,
        icon: b.icon,
        slug: c.slug,
        label: c.label,
        title: c.title,
        intro: c.intro,
        imagePlaceholder: c.imagePlaceholder,
        features: c.features.map((f, i) => ({ ...f, icon: b.featureIcons[i] })),
      });
    }),
  ]),
) as Record<Locale, Service[]>;

export function getServices(locale: Locale): Service[] {
  return byLocale[locale];
}

export function getServiceSlugs(locale: Locale): string[] {
  return byLocale[locale].map((s) => s.slug);
}

export function findService(locale: Locale, slug: string): Service | undefined {
  return byLocale[locale].find((s) => s.slug === slug);
}

/** Slug of `id` in every locale — feeds hreflang and the language switcher. */
export function serviceAlternateSlugs(id: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, copy[l][id].slug]),
  ) as Record<Locale, string>;
}

/* ------------------------------------------------------------------------- *
 * Dutch-bound compatibility exports — see the same block in `cases.ts`.
 * ------------------------------------------------------------------------- */

export const services: Service[] = byLocale[defaultLocale];
export const serviceSlugs: string[] = getServiceSlugs(defaultLocale);
export const getService = (slug: string) => findService(defaultLocale, slug);
