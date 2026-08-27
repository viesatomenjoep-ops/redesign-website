import { serviceSchema, type Service } from "@/content/schema";

/** Ported verbatim from the prototype `Service Detail.dc.html` (services[]). */
const data: Service[] = [
  {
    slug: "ai-calling-agents",
    label: "TELEFONIE",
    icon: "phone-call",
    title: "AI Calling Agents",
    intro:
      "Volledig geautomatiseerde, meertalige klantenservice via telefoon — 24/7 beschikbaar en gekoppeld aan uw bestaande systemen.",
    imagePlaceholder: "beeld: AI calling agent interface",
    features: [
      {
        icon: "phone-call",
        title: "Altijd bereikbaar",
        text: "Uw klanten worden dag en nacht te woord gestaan, zonder wachttijd.",
      },
      {
        icon: "calendar-check",
        title: "Boekingen & acties",
        text: "De agent maakt boekingen, verwerkt klantgegevens en voert acties direct uit in uw systemen.",
      },
      {
        icon: "settings-2",
        title: "Volledig instelbaar",
        text: "Inzetbaar op ieder gewenst telefoonnummer, flexibel in te stellen op specifieke dagen en tijden.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    label: "KLANTENSERVICE",
    icon: "message-circle",
    title: "AI Chatbots",
    intro:
      "Slimme chatbots die repetitieve werkzaamheden uit handen nemen en direct gekoppeld kunnen worden aan uw bestaande systemen.",
    imagePlaceholder: "beeld: AI chatbot gesprek",
    features: [
      {
        icon: "message-circle",
        title: "Directe antwoorden",
        text: "Klantvragen worden direct en correct beantwoord, zonder wachttijd.",
      },
      {
        icon: "shopping-cart",
        title: "Verwerkt bestellingen",
        text: "De chatbot voert acties automatisch uit, van bestellingen tot statuswijzigingen.",
      },
      {
        icon: "plug",
        title: "Eenvoudig te integreren",
        text: "Snel te implementeren in uw bestaande website en infrastructuur.",
      },
    ],
  },
  {
    slug: "workflow-automatisering",
    label: "INTEGRATIES",
    icon: "workflow",
    title: "Workflow-automatisering",
    intro:
      "Elimineer handmatig werk door uw bestaande systemen slim met elkaar te verbinden.",
    imagePlaceholder: "beeld: workflow-diagram",
    features: [
      {
        icon: "link-2",
        title: "Systemen verbonden",
        text: "Data wordt automatisch, naadloos en foutloos tussen systemen uitgewisseld.",
      },
      {
        icon: "gauge",
        title: "Sneller & efficiënter",
        text: "Processen verlopen sneller en zijn minder foutgevoelig.",
      },
      {
        icon: "shield-check",
        title: "Betrouwbaar",
        text: "Geen handmatige overdracht meer, dus minder kans op fouten.",
      },
    ],
  },
  {
    slug: "websites-apps",
    label: "DIGITAAL",
    icon: "globe",
    title: "Websites & Apps",
    intro:
      "Digitale oplossingen die aansluiten op uw bedrijf, processen en ambities. Van moderne websites tot mobiele applicaties.",
    imagePlaceholder: "beeld: website en app op scherm",
    features: [
      {
        icon: "search",
        title: "SEO-geoptimaliseerd",
        text: "Beter vindbaar in Google door technische en inhoudelijke optimalisatie.",
      },
      {
        icon: "sparkles",
        title: "AEO/GEO-klaar",
        text: "Content en structuur ingericht voor zichtbaarheid in AI-platforms en LLM's zoals ChatGPT en Gemini.",
      },
      {
        icon: "smartphone",
        title: "Native & PWA",
        text: "Native apps voor iOS en Android of moderne webapps, passend bij uw doelgroep.",
      },
    ],
  },
  {
    slug: "kpi-dashboards",
    label: "INZICHT",
    icon: "layout-dashboard",
    title: "KPI-Dashboards",
    intro:
      "Maak complexe data eenvoudig inzichtelijk met dashboards die realtime inzicht geven in uw prestaties.",
    imagePlaceholder: "beeld: KPI-dashboard",
    features: [
      {
        icon: "bar-chart-3",
        title: "Realtime inzicht",
        text: "Backend-data vertaald naar overzichtelijke, actuele cijfers.",
      },
      {
        icon: "layout-dashboard",
        title: "Gebruiksvriendelijk",
        text: "Een helder overzicht van alle vitale bedrijfsresultaten op één scherm.",
      },
      {
        icon: "target",
        title: "Op maat",
        text: "Gebouwd rond de KPI's die voor uw organisatie daadwerkelijk relevant zijn.",
      },
    ],
  },
  {
    slug: "software-portalen",
    label: "MAATWERK",
    icon: "app-window",
    title: "Software & Portalen",
    intro:
      "Software die volledig aansluit op uw specifieke bedrijfsprocessen — boekingssystemen, klantportalen, CMS-omgevingen en meer.",
    imagePlaceholder: "beeld: maatwerk software portaal",
    features: [
      {
        icon: "app-window",
        title: "Volledig op maat",
        text: "Gebouwd rondom de manier waarop uw organisatie werkt.",
      },
      {
        icon: "users",
        title: "Klant- & planningsportalen",
        text: "Van boekingssystemen tot planningsportalen en klantportalen.",
      },
      {
        icon: "layers",
        title: "Schaalbaar",
        text: "Software die meegroeit met uw organisatie en processen.",
      },
    ],
  },
];

export const services: Service[] = data.map((s) => serviceSchema.parse(s));

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
