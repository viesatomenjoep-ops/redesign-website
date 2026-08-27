import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // disabled
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(input: {
  name: string;
  email: string;
  message: string;
  website?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@viesa-automations.nl";

  const lines = [
    `Naam: ${input.name}`,
    `E-mail: ${input.email}`,
    input.website ? `Website: ${input.website}` : null,
    "",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    // Dev / not-yet-configured: log instead of sending.
    console.info("[contact] (no RESEND_API_KEY — not sent)\n" + lines);
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
      reply_to: input.email,
      subject: `Nieuw bericht via de website — ${input.name}`,
      text: lines,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}`);
  }
}

async function forwardToWebhook(payload: unknown) {
  const url = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[contact] webhook forward failed", err);
  }
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Controleer de ingevulde gegevens.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { company, turnstileToken, ...data } = parsed.data;

  // Honeypot tripped — pretend success.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json({ error: "Verificatie mislukt. Probeer opnieuw." }, { status: 400 });
  }

  try {
    await sendEmail(data);
    await forwardToWebhook(data);
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Versturen is niet gelukt. Mail ons gerust direct." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
