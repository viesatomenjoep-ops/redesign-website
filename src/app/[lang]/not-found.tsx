"use client";

import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";
import { localePath } from "@/lib/i18n";

/**
 * A client component on purpose: `not-found.tsx` receives no route params, so
 * the locale has to come from `LocaleProvider` in the layout rather than from
 * `params.lang`.
 */
export default function NotFound() {
  const { locale, t } = useI18n();

  return (
    <SiteChrome locale={locale} headerVariant="solid">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
        <Eyebrow>{t.notFound.eyebrow}</Eyebrow>
        <h1 className="mt-5 text-4xl font-extrabold text-paper">{t.notFound.title}</h1>
        <p className="mt-4 max-w-md text-muted">{t.notFound.body}</p>
        <ButtonLink href={localePath(locale, "/")} variant="coral" size="lg" className="mt-8">
          {t.common.toHome}
        </ButtonLink>
      </Container>
    </SiteChrome>
  );
}
