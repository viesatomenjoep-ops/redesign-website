import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Viesa Automations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Automatisering · AI-agents · Maatwerk software",
    title: "Wij maken werkprocessen slimmer en mobieler.",
  });
}
