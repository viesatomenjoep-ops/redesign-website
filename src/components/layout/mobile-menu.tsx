"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { getNav } from "@/lib/nav";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/contact/contact-dialog";

type MobileMenuProps = {
  light: boolean;
  locale: Locale;
  alternates?: Partial<Record<Locale, string>>;
};

export function MobileMenu({ light, locale, alternates }: MobileMenuProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { open: openContact } = useContactDialog();
  const nav = getNav(locale);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t.common.menu}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 nav:hidden",
          light ? "text-navy" : "text-paper",
        )}
      >
        <Menu className="h-5 w-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[95] bg-[rgba(10,20,40,0.5)] backdrop-blur-sm nav:hidden" />
        <Dialog.Content
          className="fixed inset-x-3 top-3 z-[96] rounded-[24px] border border-line-dark bg-[rgba(25,68,91,0.96)] p-[22px] backdrop-blur-xl nav:hidden"
          aria-describedby={undefined}
        >
          <div className="mb-2 flex items-center justify-between">
            <Dialog.Title className="eyebrow text-muted-2">{t.common.menu}</Dialog.Title>
            <Dialog.Close aria-label={t.common.close} className="rounded p-1 text-paper">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] font-semibold text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Button
              type="button"
              variant="paper"
              className="mt-3 w-full"
              onClick={() => {
                setOpen(false);
                openContact();
              }}
            >
              {t.common.planCall}
            </Button>
            <LanguageSwitcher
              alternates={alternates}
              className="mt-4 justify-center"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
