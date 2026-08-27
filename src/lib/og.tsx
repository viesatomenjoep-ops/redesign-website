import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgArgs = {
  eyebrow?: string;
  title: string;
};

/** Shared brand template for every `opengraph-image` route. Font-agnostic. */
export function renderOgImage({ eyebrow, title }: OgArgs) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(900px 520px at 82% 8%, rgba(15,92,102,.55), transparent 60%), #19445B",
          fontFamily: "sans-serif",
          color: "#F3F0E9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, letterSpacing: 1 }}>
          <span style={{ fontWeight: 800 }}>VIESA</span>
          <span style={{ fontWeight: 500, color: "#8FA1BD", marginLeft: 10 }}>AUTOMATIONS</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#E2603F",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ fontSize: 20, letterSpacing: 3, color: "#68788F" }}>
          SIMPLICITY, AUTOMATED.
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
