import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { htmlLang, type Locale } from "@/lib/i18n";
import { getDictionary, interpolate } from "@/lib/dictionaries";

type LegalPageProps = {
  locale: Locale;
  /** This page's URL per locale, handed to the language switcher. */
  alternates?: Partial<Record<Locale, string>>;
  eyebrow: string;
  title: string;
  /** ISO date, e.g. "2026-08-27" */
  updated: string;
  /** Flags that the legal text below is Dutch-only (en/es visitors). */
  showDutchOnlyNotice?: boolean;
  children: React.ReactNode;
};

export function LegalPage({
  locale,
  alternates,
  eyebrow,
  title,
  updated,
  showDutchOnlyNotice,
  children,
}: LegalPageProps) {
  const t = getDictionary(locale);
  const updatedLabel = new Date(updated).toLocaleDateString(htmlLang[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SiteChrome locale={locale} alternates={alternates} headerVariant="solid">
      <Container width="text" className="pb-10 pt-[130px]">
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-paper">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11.5px] tracking-[0.14em] text-muted-2">
          {interpolate(t.legal.lastUpdated, { date: updatedLabel })}
        </p>
      </Container>

      <section className="bg-paper text-ink">
        <Container width="text" className="py-20">
          {showDutchOnlyNotice && (
            <p className="mb-8 rounded-xl border border-line bg-paper-2 px-5 py-4 text-[14px] text-muted-ink">
              {t.legal.dutchOnlyNotice}
            </p>
          )}
          <div className="legal-prose">{children}</div>
        </Container>
      </section>
    </SiteChrome>
  );
}
