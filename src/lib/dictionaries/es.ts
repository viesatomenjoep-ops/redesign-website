import type { Dictionary } from "@/lib/dictionaries/nl";

/** European Spanish. Addresses the visitor formally ("usted"), matching the
 *  Dutch "u/uw" register used across the site. */
export const es: Dictionary = {
  nav: {
    services: "Servicios",
    cases: "Casos",
    contact: "Contacto",
  },
  common: {
    planCall: "Reserve una consulta estratégica",
    viewWork: "Vea nuestro trabajo",
    close: "Cerrar",
    menu: "Menú",
    home: "inicio",
    backHome: "Volver al inicio",
    toHome: "Ir al inicio",
    skipToContent: "Ir al contenido",
  },
  header: {
    ratingOnGoogle: "{value} en Google",
  },
  languageSwitcher: {
    label: "Idioma",
    ariaLabel: "Elija un idioma",
  },
  hero: {
    title: "Hacemos los procesos de trabajo más inteligentes y móviles.",
    lede: "Combinamos más de 10 años de experiencia en software con la fuerza de la IA para que las empresas trabajen de forma más inteligente, rápida y eficiente.",
    pillars: [
      { title: "Agentes de llamadas con IA", tag: "Telefonía" },
      { title: "Chatbots con IA", tag: "Atención al cliente" },
      { title: "Automatización de flujos", tag: "Integraciones" },
      { title: "Software y cuadros de mando", tag: "A medida" },
    ],
    strip: "AGENTES DE IA · AUTOMATIZACIÓN · SAAS y APPS · COMERCIO ELECTRÓNICO · ESTRATEGIA",
  },
  sectionLabels: {
    testimonial: "Testimonio",
    services: "Servicios",
    techStack: "Stack tecnológico",
    cases: "Casos",
    about: "Sobre nosotros",
    faq: "Preguntas frecuentes",
    whyViesa: "Por qué Viesa",
  },
  reviews: {
    eyebrow: "Opiniones de clientes",
    title: "Cinco estrellas, de todos los que nos han valorado",
    lede: "Las mostramos todas, no solo las mejores.",
    googleReviews: "{count} reseñas de Google",
    viewOnGoogle: "Ver en Google",
    carouselLabel: "Opiniones de clientes",
  },
  clientMarquee: {
    title: "Experiencia en organizaciones de referencia",
  },
  services: {
    eyebrow: "Qué hacemos",
    title: "Nuestros servicios",
    lede: "Seis pilares, un único interlocutor: desde agentes de IA y automatización hasta software a medida y plataformas digitales.",
  },
  whyViesa: {
    eyebrow: "Por qué Viesa",
    title: "Por qué las empresas nos eligen",
    reasons: [
      {
        title: "Todo funciona en conjunto",
        text: "Nuestras soluciones se conectan directamente con los sistemas que ya utiliza. Nada de silos aislados, sino un único conjunto que funciona.",
      },
      {
        title: "Optimizado para IA y SEO",
        text: "Webs y contenidos que posicionan bien en Google y que además son visibles en plataformas de IA como ChatGPT y Gemini.",
      },
      {
        title: "100% a medida, con foco en el ROI",
        text: "Cada solución se construye con un objetivo concreto: medir menos trabajo manual y más rentabilidad.",
      },
    ],
  },
  techStack: {
    eyebrow: "Built with",
    title: "Un stack tecnológico moderno y probado",
    lede: "Trabajamos con tecnologías que elegimos de forma consciente en cada proyecto, complementadas con los últimos modelos de IA para una automatización inteligente.",
    aiStudio: "AI Studio",
  },
  featuredCases: {
    eyebrow: "Casos",
    title: "Construido para cualquier empresa",
    lede: "Proyectos reales para empresas reales: desde el comercio electrónico hasta los servicios profesionales y todo lo que hay entre medias.",
    carouselLabel: "Casos destacados",
    viewAll: "Ver el portfolio completo",
  },
  about: {
    eyebrow: "Sobre nosotros",
    title: "Creado en Breda, en marcha por todos los Países Bajos",
    body1:
      "Desde software a medida y aplicaciones móviles hasta agentes de IA, automatización de flujos de trabajo y plataformas digitales completas: construimos soluciones de principio a fin que encajan con la forma en que trabaja su empresa.",
    body2:
      "Con más de 10 años de experiencia en software, combinamos tecnología probada con la fuerza de la IA. Mantenemos el contacto directo, trabajamos por fases y seguimos implicados también después de la puesta en marcha. Un único socio para software, automatización e IA: de la idea a la solución en funcionamiento.",
    roleCofounder: "COFUNDADOR",
    photoAlt: "{name}, cofundador de Viesa Automations",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "¿Le queda alguna duda?",
  },
  contactCta: {
    eyebrow: "Auditoría gratuita",
    title: "¿Listo para automatizar su empresa?",
    lede: "Reserve una auditoría gratuita de IA y automatización. En 30 minutos sabrá dónde le compensa más automatizar.",
    preferEmail: "¿Prefiere escribirnos primero?",
    sendMessage: "Envíe un mensaje",
  },
  booking: {
    requestAudit: "Solicite una auditoría gratuita",
  },
  contactDialog: {
    eyebrow: "Contacto",
    title: "Póngase en contacto",
  },
  contactForm: {
    nameLabel: "Nombre",
    namePlaceholder: "Nombre y apellidos",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    websiteLabel: "Web",
    websitePlaceholder: "www.ejemplo.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "¿En qué podemos ayudarle?",
    messagePlaceholderAudit: "¿Dónde se atasca ahora mismo? ¿Qué le gustaría automatizar?",
    submit: "Enviar",
    submitting: "Enviando…",
    genericError: "Algo ha salido mal.",
    successTitle: "Gracias, su mensaje se ha enviado.",
    successBody: "Le responderemos en un plazo de un día laborable.",
  },
  footer: {
    contact: "Contacto",
    sitemap: "Mapa del sitio",
    social: "Redes sociales",
    rights: "© {year} {name}. Todos los derechos reservados.",
    privacy: "Privacidad",
    cookies: "Cookies",
  },
  serviceVisual: {
    chatQuestion: "¿Todavía puedo cambiar mi talla?",
    chatReply: "Por supuesto, lo gestiono ahora mismo.",
    chatConfirm: "Vale de cambio enviado ✓",
    checklist: [
      "Presupuesto aprobado",
      "Pedido en producción",
      "Factura enviada",
      "Entrega programada",
    ],
  },
  detail: {
    backToPortfolio: "Volver al portfolio",
    aboutProject: "Sobre este proyecto",
    moreProjects: "Más proyectos",
    backToServices: "Volver a los servicios",
    whatThisMeans: "Qué significa esto para usted",
    otherServices: "Otros servicios",
  },
  casesPage: {
    eyebrow: "Portfolio",
    title: "Construido para cualquier empresa",
    lede: "Proyectos reales para empresas reales: desde el comercio electrónico hasta el sector agrario, las finanzas y los servicios profesionales.",
    metaTitle: "Casos",
  },
  thankYouPage: {
    eyebrow: "Reservado",
    title: "Su auditoría está en la agenda",
    body: "Recibirá una confirmación por correo electrónico con los detalles de la cita y una invitación de calendario. Hasta pronto: entonces veremos dónde le compensa más automatizar.",
    metaTitle: "Gracias",
    metaDescription: "Su auditoría está reservada.",
  },
  notFound: {
    eyebrow: "404",
    title: "Página no encontrada",
    body: "La página que busca ya no existe. Vuelva a la página de inicio.",
  },
  errorPage: {
    title: "Algo ha salido mal",
    body: "Inténtelo de nuevo. Si sigue fallando, escríbanos directamente sin problema.",
    retry: "Intentar de nuevo",
  },
  legal: {
    lastUpdated: "Última actualización: {date}",
    dutchOnlyNotice:
      "Este texto legal solo está disponible en neerlandés. La versión neerlandesa es la que prevalece.",
  },
  seo: {
    ogEyebrow: "Automatización · Agentes de IA · Software a medida",
    titleTemplate: "{title} — {name}",
    defaultTitle: "Viesa Automations — Automatización, agentes de IA y software a medida",
    description:
      "Viesa Automations desarrolla agentes de IA, automatización de flujos de trabajo y software a medida para empresas de comercio electrónico en crecimiento. Reserve una consulta estratégica sin compromiso.",
    keywords: [
      "automatización",
      "automatización de flujos de trabajo",
      "agentes de IA",
      "agentes de llamadas con IA",
      "chatbots con IA",
      "software a medida",
      "aplicaciones web",
      "cuadros de mando KPI",
      "integraciones de sistemas",
      "Breda",
    ],
  },
};
