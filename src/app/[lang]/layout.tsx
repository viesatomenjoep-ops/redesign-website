import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { htmlLang, isLocale, locales } from "@/lib/i18n";
import { getDictionary, interpolate } from "@/lib/dictionaries";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { ContactDialogProvider } from "@/components/contact/contact-dialog";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";

/**
 * This is the root layout. Every route lives under `[lang]`, so there is no
 * `src/app/layout.tsx` — the `<html>` element belongs here, where the locale is
 * actually known and can be put on `lang`.
 *
 * Dutch is served from the root of the domain; `src/middleware.ts` rewrites
 * those requests to `/nl/...` so this param is always populated.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#19445B",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    metadataBase: new URL(site.url),
    ...buildMetadata({ locale: lang }),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className={fontVariables}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only rounded-pill focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy"
        >
          {t.common.skipToContent}
        </a>
        <LocaleProvider locale={lang}>
          <ContactDialogProvider>{children}</ContactDialogProvider>
          <WhatsAppButton ariaLabel={interpolate(t.whatsapp.ariaLabel, { phone: site.phone })} />
        </LocaleProvider>
        <OrganizationJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
