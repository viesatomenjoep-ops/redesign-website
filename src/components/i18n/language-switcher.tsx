"use client";

import Link from "next/link";
import { locales, localeName, localeShortName, localePath, type Locale } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /**
   * The equivalent URL of the current page in each locale. Pages compute this
   * themselves because only they know their section and localised slug. When a
   * locale is missing, the switcher falls back to that locale's home page
   * rather than linking to a path that would 404.
   */
  alternates?: Partial<Record<Locale, string>>;
  light?: boolean;
  className?: string;
};

export function LanguageSwitcher({ alternates, light, className }: LanguageSwitcherProps) {
  const { locale: active, t } = useI18n();

  return (
    <nav aria-label={t.languageSwitcher.ariaLabel} className={cn("flex items-center", className)}>
      {locales.map((locale, i) => {
        const href = alternates?.[locale] ?? localePath(locale, "/");
        const isActive = locale === active;

        return (
          <span key={locale} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden="true" className={cn("px-1 text-[11px]", light ? "text-muted-ink/40" : "text-muted-2/40")}>
                /
              </span>
            ) : null}
            <Link
              href={href}
              hrefLang={locale}
              lang={locale}
              aria-current={isActive ? "true" : undefined}
              title={localeName[locale]}
              className={cn(
                "text-[12px] font-bold uppercase tracking-[0.08em] transition-colors",
                isActive
                  ? light
                    ? "text-navy"
                    : "text-paper"
                  : light
                    ? "text-ink-soft/60 hover:text-navy"
                    : "text-muted-3/60 hover:text-coral",
              )}
            >
              {localeShortName[locale]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
