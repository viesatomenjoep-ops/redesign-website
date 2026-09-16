"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import { getNav } from "@/lib/nav";
import { interpolate } from "@/lib/dictionaries";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ContactButton } from "@/components/contact/contact-button";
import { MobileMenu } from "@/components/layout/mobile-menu";

type HeaderProps = {
  /** "overlay" sits transparent over a dark hero; "solid" is for inner pages. */
  variant?: "overlay" | "solid";
  locale: Locale;
  /** This page's URL per locale, handed to the language switcher. */
  alternates?: Partial<Record<Locale, string>>;
};

export function Header({ variant = "overlay", locale, alternates }: HeaderProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(variant === "solid");

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const light = scrolled;
  const home = localePath(locale, "/");
  /** "" for Dutch (root), "/en" elsewhere — so hash links stay on the right home. */
  const homeBase = home === "/" ? "" : home;
  const nav = getNav(locale);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <div
        className={cn(
          "flex w-full items-center justify-between gap-5 border-b px-11 py-[18px] transition-[background,border-color,box-shadow] duration-300 xs:px-[22px]",
          light
            ? "border-navy/10 bg-paper shadow-[0_10px_30px_-18px_rgba(25,68,91,0.35)]"
            : "border-line-dark bg-navy",
        )}
      >
        <Link
          href={`${homeBase}/#top`}
          className="flex items-center gap-[11px]"
          aria-label={`${site.name} — ${t.common.home}`}
        >
          <Image
            src="/uploads/viesa-hex.png"
            alt=""
            width={51}
            height={51}
            className="h-[51px] w-[51px] object-contain"
            priority
          />
          <span
            className={cn(
              "font-brand text-xl leading-none tracking-[0.005em] transition-colors",
              light ? "text-navy" : "text-paper",
            )}
          >
            <span className="font-extrabold">VIESA</span>{" "}
            <span className={cn("font-medium", light ? "text-muted-ink" : "text-muted-2")}>
              AUTOMATIONS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 nav:flex">
          <Link
            href={`${homeBase}/#testimonial`}
            className={cn(
              "inline-flex items-center gap-[7px] text-[13px] font-semibold transition-colors",
              light ? "text-ink-soft hover:text-navy" : "text-muted-3 hover:text-coral",
            )}
          >
            <span className="inline-flex text-star" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </span>
            <span>
              {interpolate(t.header.ratingOnGoogle, {
                value: site.rating.value.toLocaleString(htmlLang[locale]),
              })}
            </span>
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                light ? "text-ink-soft hover:text-navy" : "text-muted-3 hover:text-coral",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher
            alternates={alternates}
            light={light}
            className="hidden nav:flex"
          />
          <ContactButton
            variant={light ? "navy" : "paper"}
            className="hidden xs:inline-flex"
          />
          <MobileMenu light={light} locale={locale} alternates={alternates} />
        </div>
      </div>
    </header>
  );
}
