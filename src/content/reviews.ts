import { reviewSchema, type Review } from "@/content/schema";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Curated snapshot of Google reviews. Used as the fallback when the live
 * Places API fetch (`src/lib/google-reviews.ts`) is unavailable or unconfigured.
 *
 * Author names are locale-independent; the review body and the "N reviews"
 * meta line are translated. `copy` is zipped onto `authors` by index, so the
 * arrays must stay the same length and order.
 *
 * Note: two of these reviews (Simon Zoubkov, Heather) were written in English
 * originally — the `en` column reproduces them verbatim rather than
 * round-tripping them through Dutch.
 */

const authors = [
  "Wendy de Graaf",
  "CBH Jump Ltd",
  "Simon Zoubkov",
  "Bas Hellemons",
  "AKIRAHKV Lam",
  "Heather",
  "Loek Kok",
  "Joep Morsink",
  "Ma Vabi",
  "Thomas van der Kuijl",
  "Jill Tempelaars",
  "Mattie van Biene",
  "Eduard Platje",
  "John Wendriks",
  "Donny Stoppelenburg",
];

type ReviewCopy = { meta?: string; text?: string };

const copy: Record<Locale, ReviewCopy[]> = {
  nl: [
    {
      meta: "2 reviews",
      text: "Fantastischer mannen weten heel goed waar ze mee bezig zijn met weinig uitleg komen ze al snel met een goed werkende programma fijne mensen in de omgang",
    },
    {
      meta: "1 review",
      text: "Als ondernemer heb ik in de loop der jaren met diverse webontwikkelaars samengewerkt, en het team van Viesa Automations springt er om de juiste redenen uit. Vanaf ons eerste gesprek was het duidelijk dat ze niet zomaar een website wilden opleveren.",
    },
    {
      meta: "4 reviews",
      text: "Excellent experience working with Viesa Automations. Throughout the development of the Ibizamivida project, we have seen continuous progress and a high level of professionalism at every stage.",
    },
    {
      meta: "2 reviews",
      text: "Tom en Joep hebben ons goed geholpen met een IT vraagstuk waarbij hun kennis en kunde goed van pas kwam. Duidelijke communicatie, snelle schakeling en geen verassingen tijdens het project. Kortom, een aanrader!",
    },
    {
      meta: "Local Guide · 42 reviews",
      text: "Super tevreden over de samenwerking met Joep en Tom. Dankzij hun innovatieve aanpak en slimme automatiseringen draait onze webshop nu nóg optimaler. Vanaf het eerste contactmoment was de communicatie top: transparant, snel en to the point.",
    },
    {
      meta: "1 review",
      text: "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business. Instead of just spinning up a pretty landing page, Tom VB took the time to understand how our operation really works.",
    },
    {
      meta: "Local Guide · 12 reviews",
      text: "Top gasten dynamisch pro actief en weten perfect invulling te geven aan de vragen die de markt op dit moment wenst",
    },
    {
      meta: "Local Guide · 13 reviews",
      text: "Prettig, vlot en impactvol zaken doen. Aan te raden aan iedereen die mee wilt gaan met de tijd en wilt investeren in de toekomst.",
    },
    { meta: "1 review" },
    { meta: "Local Guide · 19 reviews" },
    { meta: "3 reviews" },
    {},
    {},
    {},
    {},
  ],
  en: [
    {
      meta: "2 reviews",
      text: "Fantastic guys, they know exactly what they are doing and with little explanation they quickly come up with a well-working programme, pleasant people to deal with",
    },
    {
      meta: "1 review",
      text: "As an entrepreneur I have worked with various web developers over the years, and the team at Viesa Automations stands out for the right reasons. From our first conversation it was clear that they did not just want to deliver a website.",
    },
    {
      meta: "4 reviews",
      text: "Excellent experience working with Viesa Automations. Throughout the development of the Ibizamivida project, we have seen continuous progress and a high level of professionalism at every stage.",
    },
    {
      meta: "2 reviews",
      text: "Tom and Joep helped us well with an IT question where their knowledge and skills came in handy. Clear communication, quick responses and no surprises during the project. In short, highly recommended!",
    },
    {
      meta: "Local Guide · 42 reviews",
      text: "Very satisfied with the collaboration with Joep and Tom. Thanks to their innovative approach and smart automations, our webshop now runs even more optimally. From the very first contact the communication was excellent: transparent, fast and to the point.",
    },
    {
      meta: "1 review",
      text: "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business. Instead of just spinning up a pretty landing page, Tom VB took the time to understand how our operation really works.",
    },
    {
      meta: "Local Guide · 12 reviews",
      text: "Great guys, dynamic, proactive and they know exactly how to meet the demands the market has right now",
    },
    {
      meta: "Local Guide · 13 reviews",
      text: "Pleasant, swift and impactful to do business with. Recommended to anyone who wants to move with the times and invest in the future.",
    },
    { meta: "1 review" },
    { meta: "Local Guide · 19 reviews" },
    { meta: "3 reviews" },
    {},
    {},
    {},
    {},
  ],
  es: [
    {
      meta: "2 reseñas",
      text: "Hombres fantásticos, saben muy bien lo que hacen; con poca explicación ya llegan a un programa que funciona bien, gente agradable en el trato",
    },
    {
      meta: "1 reseña",
      text: "Como empresario he trabajado a lo largo de los años con varios desarrolladores web, y el equipo de Viesa Automations destaca por las razones correctas. Desde nuestra primera conversación quedó claro que no querían entregar simplemente una web.",
    },
    {
      meta: "4 reseñas",
      text: "Excelente experiencia trabajando con Viesa Automations. A lo largo del desarrollo del proyecto Ibizamivida hemos visto un avance continuo y un alto nivel de profesionalidad en cada fase.",
    },
    {
      meta: "2 reseñas",
      text: "Tom y Joep nos ayudaron mucho con una cuestión de TI en la que sus conocimientos y su capacidad vinieron muy bien. Comunicación clara, respuesta rápida y ninguna sorpresa durante el proyecto. En resumen, ¡muy recomendables!",
    },
    {
      meta: "Local Guide · 42 reseñas",
      text: "Muy satisfechos con la colaboración con Joep y Tom. Gracias a su enfoque innovador y a sus automatizaciones inteligentes, nuestra tienda online funciona ahora aún mejor. Desde el primer contacto la comunicación fue excelente: transparente, rápida y directa.",
    },
    {
      meta: "1 reseña",
      text: "Trabajar con Viesa Automations fue como incorporar a un equipo que realmente entendía el negocio que hay detrás del negocio. En lugar de montar sin más una landing page bonita, Tom VB se tomó el tiempo de entender cómo funciona realmente nuestra operativa.",
    },
    {
      meta: "Local Guide · 12 reseñas",
      text: "Grandes profesionales, dinámicos y proactivos, y saben dar respuesta perfectamente a lo que el mercado demanda en este momento",
    },
    {
      meta: "Local Guide · 13 reseñas",
      text: "Hacer negocios de forma agradable, ágil y con impacto. Recomendable para cualquiera que quiera avanzar con los tiempos e invertir en el futuro.",
    },
    { meta: "1 reseña" },
    { meta: "Local Guide · 19 reseñas" },
    { meta: "3 reseñas" },
    {},
    {},
    {},
    {},
  ],
};

const byLocale: Record<Locale, Review[]> = Object.fromEntries(
  locales.map((locale) => [
    locale,
    authors.map((author, i) => reviewSchema.parse({ author, ...copy[locale][i] })),
  ]),
) as Record<Locale, Review[]>;

export function getCuratedReviews(locale: Locale): Review[] {
  return byLocale[locale];
}

/** The "client testimonial" pull-quote featured near the reviews. */
const testimonial: Record<Locale, { quote: string; label: string }> = {
  nl: {
    quote:
      "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business.",
    label: "CLIENT TESTIMONIAL",
  },
  en: {
    quote:
      "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business.",
    label: "CLIENT TESTIMONIAL",
  },
  es: {
    quote:
      "Trabajar con Viesa Automations fue como incorporar a un equipo que realmente entendía el negocio que hay detrás del negocio.",
    label: "TESTIMONIO DE CLIENTE",
  },
};

export function getFeaturedTestimonial(locale: Locale) {
  return testimonial[locale];
}

/* ------------------------------------------------------------------------- *
 * Dutch-bound compatibility exports — see the same block in `cases.ts`.
 * ------------------------------------------------------------------------- */

export const curatedReviews: Review[] = byLocale[defaultLocale];
export const featuredTestimonial = testimonial[defaultLocale];
