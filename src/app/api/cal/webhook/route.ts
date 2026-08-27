import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendInternalEmail } from "@/lib/notify";

export const runtime = "nodejs";

type CalAttendee = { name?: string; email?: string; timeZone?: string };
type CalPayload = {
  uid?: string;
  type?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  attendees?: CalAttendee[];
  organizer?: { name?: string; email?: string };
  responses?: Record<string, { label?: string; value?: unknown }>;
};
type CalEvent = { triggerEvent?: string; payload?: CalPayload };

function verifySignature(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw, "utf8").digest("hex");
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function forwardToN8n(body: unknown) {
  const url = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.warn("[cal webhook] n8n forward failed", err);
  }
}

function summarise(triggerEvent: string, p: CalPayload): { subject: string; text: string; replyTo?: string } {
  const attendee = p.attendees?.[0];
  const when = p.startTime ? new Date(p.startTime).toLocaleString("nl-NL") : "onbekend";
  const extras = p.responses
    ? Object.values(p.responses)
        .filter((r) => r?.value)
        .map((r) => `${r.label ?? "veld"}: ${String(r.value)}`)
        .join("\n")
    : "";

  const label =
    triggerEvent === "BOOKING_CREATED"
      ? "Nieuwe auditafspraak"
      : triggerEvent === "BOOKING_RESCHEDULED"
        ? "Auditafspraak verzet"
        : triggerEvent === "BOOKING_CANCELLED"
          ? "Auditafspraak geannuleerd"
          : `Cal.com: ${triggerEvent}`;

  return {
    subject: `${label} — ${attendee?.name ?? "onbekend"}`,
    replyTo: attendee?.email,
    text: [
      `Trigger: ${triggerEvent}`,
      `Naam: ${attendee?.name ?? "-"}`,
      `E-mail: ${attendee?.email ?? "-"}`,
      `Tijdzone: ${attendee?.timeZone ?? "-"}`,
      `Wanneer: ${when}`,
      `Type: ${p.type ?? "-"}`,
      `Locatie: ${p.location ?? "-"}`,
      extras ? `\n${extras}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  const secret = process.env.CALCOM_WEBHOOK_SECRET;

  if (secret && !verifySignature(raw, request.headers.get("x-cal-signature-256"), secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: CalEvent;
  try {
    event = JSON.parse(raw) as CalEvent;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const triggerEvent = event.triggerEvent ?? "UNKNOWN";
  const payload = event.payload ?? {};

  await forwardToN8n({ source: "cal.com", triggerEvent, payload });

  if (["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED"].includes(triggerEvent)) {
    try {
      const { subject, text, replyTo } = summarise(triggerEvent, payload);
      await sendInternalEmail({ subject, text, replyTo });
    } catch (err) {
      console.error("[cal webhook] notification failed", err);
      // Don't 500 — Cal would retry; the calendar event itself already exists.
    }
  }

  return NextResponse.json({ ok: true });
}
