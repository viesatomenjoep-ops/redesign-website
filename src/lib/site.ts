/**
 * Global site configuration and NAP (name / address / phone) details.
 * Values taken from the prototype footer — flagged for verification
 * (see IMPLEMENTATION_PLAN §5 "Non-blocking").
 */
export const site = {
  name: "Viesa Automations",
  shortName: "VIESA",
  tagline: "SIMPLICITY, AUTOMATED.",
  description:
    "Viesa Automations bouwt AI-agents, workflow-automatisering en maatwerk software voor groeiende e-commerce bedrijven. Plan een vrijblijvend strategiegesprek.",
  locale: "nl_NL",
  lang: "nl",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founded: "2024",
  email: "contact@viesa-automations.nl",
  phone: "+31 6 83 05 28 75",
  phoneHref: "tel:+31683052875",
  /** wa.me expects the number in international format, without "+" or spaces. */
  whatsappHref: "https://wa.me/31683052875",
  kvk: "42070922",
  address: {
    city: "Breda",
    country: "Nederland",
    countryCode: "NL",
  },
  social: {
    instagram: "https://www.instagram.com/viesa.automations/",
  },
  rating: {
    value: 5.0,
    count: 15,
    source: "Google",
  },
} as const;

export const nav = [
  { label: "Diensten", href: "/#diensten" },
  { label: "Cases", href: "/cases" },
  { label: "Contact", href: "/#contact" },
] as const;
