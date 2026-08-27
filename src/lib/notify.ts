import { site } from "@/lib/site";

/**
 * Send a plain-text notification to the internal inbox via Resend.
 * No-ops (logs) when RESEND_API_KEY is unset so local dev works.
 */
export async function sendInternalEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@viesa-automations.nl";

  if (!apiKey) {
    console.info(`[notify] (no RESEND_API_KEY — not sent)\n${subject}\n\n${text}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} <${from}>`,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}`);
  }
}
