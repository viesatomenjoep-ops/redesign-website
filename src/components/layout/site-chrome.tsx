import type { Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type SiteChromeProps = {
  locale: Locale;
  /** This page's URL per locale, handed to the language switcher. */
  alternates?: Partial<Record<Locale, string>>;
  headerVariant?: "overlay" | "solid";
  children: React.ReactNode;
};

/** Header + <main> + Footer wrapper shared by every page. */
export function SiteChrome({
  locale,
  alternates,
  headerVariant = "solid",
  children,
}: SiteChromeProps) {
  return (
    <>
      <Header variant={headerVariant} locale={locale} alternates={alternates} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
