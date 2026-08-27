import { reviewSchema, type Review } from "@/content/schema";

/**
 * Curated snapshot of Google reviews. Used as the fallback when the live
 * Places API fetch (`src/lib/google-reviews.ts`) is unavailable or unconfigured.
 */
const data: Review[] = [
  {
    author: "Wendy de Graaf",
    meta: "2 reviews",
    text: "Fantastischer mannen weten heel goed waar ze mee bezig zijn met weinig uitleg komen ze al snel met een goed werkende programma fijne mensen in de omgang",
  },
  {
    author: "CBH Jump Ltd",
    meta: "1 review",
    text: "Als ondernemer heb ik in de loop der jaren met diverse webontwikkelaars samengewerkt, en het team van Viesa Automations springt er om de juiste redenen uit. Vanaf ons eerste gesprek was het duidelijk dat ze niet zomaar een website wilden opleveren.",
  },
  {
    author: "Simon Zoubkov",
    meta: "4 reviews",
    text: "Excellent experience working with Viesa Automations. Throughout the development of the Ibizamivida project, we have seen continuous progress and a high level of professionalism at every stage.",
  },
  {
    author: "Bas Hellemons",
    meta: "2 reviews",
    text: "Tom en Joep hebben ons goed geholpen met een IT vraagstuk waarbij hun kennis en kunde goed van pas kwam. Duidelijke communicatie, snelle schakeling en geen verassingen tijdens het project. Kortom, een aanrader!",
  },
  {
    author: "AKIRAHKV Lam",
    meta: "Local Guide · 42 reviews",
    text: "Super tevreden over de samenwerking met Joep en Tom. Dankzij hun innovatieve aanpak en slimme automatiseringen draait onze webshop nu nóg optimaler. Vanaf het eerste contactmoment was de communicatie top: transparant, snel en to the point.",
  },
  {
    author: "Heather",
    meta: "1 review",
    text: "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business. Instead of just spinning up a pretty landing page, Tom VB took the time to understand how our operation really works.",
  },
  {
    author: "Loek Kok",
    meta: "Local Guide · 12 reviews",
    text: "Top gasten dynamisch pro actief en weten perfect invulling te geven aan de vragen die de markt op dit moment wenst",
  },
  {
    author: "Joep Morsink",
    meta: "Local Guide · 13 reviews",
    text: "Prettig, vlot en impactvol zaken doen. Aan te raden aan iedereen die mee wilt gaan met de tijd en wilt investeren in de toekomst.",
  },
  { author: "Ma Vabi", meta: "1 review" },
  { author: "Thomas van der Kuijl", meta: "Local Guide · 19 reviews" },
  { author: "Jill Tempelaars", meta: "3 reviews" },
  { author: "Mattie van Biene" },
  { author: "Eduard Platje" },
  { author: "John Wendriks" },
  { author: "Donny Stoppelenburg" },
];

export const curatedReviews: Review[] = data.map((r) => reviewSchema.parse(r));

/** The "client testimonial" pull-quote featured near the reviews. */
export const featuredTestimonial = {
  quote:
    "Working with Viesa Automations felt like bringing in a team that actually understood the business beneath the business.",
  label: "CLIENT TESTIMONIAL",
} as const;
