import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(120),
  email: z.string().trim().email("Vul een geldig e-mailadres in."),
  message: z.string().trim().min(10, "Vertel kort waar we mee kunnen helpen.").max(4000),
  /** Optional — used by the "Gratis audit" variant. */
  website: z.string().trim().max(200).optional().or(z.literal("")),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().or(z.literal("")),
  /** Cloudflare Turnstile token, when enabled. */
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
