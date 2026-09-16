import { z } from "zod";

/** All content is hardcoded (see IMPLEMENTATION_PLAN §5). These schemas
 *  validate the modules at import time and give us shared types. */

export const serviceFeatureSchema = z.object({
  icon: z.string(), // lucide-react icon name
  title: z.string(),
  text: z.string(),
});

export const serviceSchema = z.object({
  /** Stable, locale-independent key. Equals the original Dutch slug. */
  id: z.string(),
  /** Localised URL segment — differs per locale. */
  slug: z.string(),
  label: z.string(),
  icon: z.string(),
  title: z.string(),
  intro: z.string(),
  imagePlaceholder: z.string(),
  features: z.array(serviceFeatureSchema).min(1),
});

export const caseSchema = z.object({
  /** Stable, locale-independent key. Equals the original Dutch slug. */
  id: z.string(),
  /** Localised URL segment — differs per locale. */
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  summary: z.string(),
  description: z.string(),
  image: z.string().nullable(),
});

export const reviewSchema = z.object({
  author: z.string(),
  meta: z.string().optional(),
  text: z.string().optional(),
});

export const faqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
});

export const techItemSchema = z.object({
  name: z.string(),
  icon: z.string(), // path under /public or remote-free asset
});

export const clientSchema = z.object({
  name: z.string(),
  logo: z.string(),
  /** rendered height in px to normalise wildly different logo files */
  height: z.number(),
});

export type ServiceFeature = z.infer<typeof serviceFeatureSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type CaseStudy = z.infer<typeof caseSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type TechItem = z.infer<typeof techItemSchema>;
export type Client = z.infer<typeof clientSchema>;
