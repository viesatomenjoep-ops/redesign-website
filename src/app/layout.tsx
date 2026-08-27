import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { ContactDialogProvider } from "@/components/contact/contact-dialog";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#19445B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={fontVariables}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only rounded-pill focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy"
        >
          Direct naar inhoud
        </a>
        <ContactDialogProvider>{children}</ContactDialogProvider>
        <OrganizationJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
