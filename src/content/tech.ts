import { clientSchema, techItemSchema, type Client, type TechItem } from "@/content/schema";

/**
 * Tech-stack "train" marquee. Icon paths point at `public/uploads/tech-*.svg`
 * (from the prototype's `uploads/`). React, PostgreSQL and Claude were loaded
 * from cdn.simpleicons.org in the prototype — add local SVGs for those three
 * to `public/uploads/` (see README), or swap in the `simple-icons` package.
 */
const techData: TechItem[] = [
  { name: "Kotlin", icon: "/uploads/tech-kotlin.svg" },
  { name: "Java", icon: "/uploads/tech-java.svg" },
  { name: "TypeScript", icon: "/uploads/tech-typescript.svg" },
  { name: "Next.js", icon: "/uploads/tech-nextjs.svg" },
  { name: "React", icon: "/uploads/tech-react.svg" },
  { name: "Node.js", icon: "/uploads/tech-nodejs.svg" },
  { name: "PostgreSQL", icon: "/uploads/tech-postgresql.svg" },
  { name: "n8n", icon: "/uploads/tech-n8n.svg" },
];

export const tech: TechItem[] = techData.map((t) => techItemSchema.parse(t));

export const aiStudio: TechItem[] = [
  { name: "OpenAI", icon: "/uploads/tech-openai.svg" },
  { name: "Claude", icon: "/uploads/tech-claude.svg" },
  { name: "n8n", icon: "/uploads/tech-n8n.svg" },
].map((t) => techItemSchema.parse(t));

/** Client-logo marquee ("Ervaring bij toonaangevende organisaties"). */
const clientData: Client[] = [
  { name: "Wehkamp", logo: "/uploads/wehkamp-logo-20A9DC6115-seeklogo.com_.png", height: 32 },
  { name: "Commerced", logo: "/uploads/commerced-logo-color.svg", height: 26 },
  { name: "Equivest", logo: "/uploads/equivest-logo.png", height: 52 },
  { name: "Robeco", logo: "/uploads/robeco-logo.png", height: 26 },
  { name: "Vakanties.nl", logo: "/uploads/vakanties-logo.svg", height: 26 },
  { name: "Nacholito", logo: "/uploads/nacholito.png", height: 46 },
  { name: "Politie", logo: "/uploads/politie-logo.webp", height: 30 },
  { name: "Centraal Beheer", logo: "/uploads/centraal-beheer-logo.webp", height: 52 },
];

export const clients: Client[] = clientData.map((c) => clientSchema.parse(c));
