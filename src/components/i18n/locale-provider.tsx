"use client";

import { createContext, useContext, useMemo } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";

type LocaleContextValue = { locale: Locale; t: Dictionary };

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Makes the active locale and its dictionary available to client components.
 *
 * Only the locale string crosses the server/client boundary — the dictionary is
 * looked up here, on the client. That keeps the server payload tiny and means
 * the dictionary never has to be serialisable as a prop.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: getDictionary(locale) }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Active locale + dictionary. Falls back to Dutch outside a provider so a
 *  stray client component renders copy rather than throwing. */
export function useI18n(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx;
  return { locale: defaultLocale, t: getDictionary(defaultLocale) };
}
