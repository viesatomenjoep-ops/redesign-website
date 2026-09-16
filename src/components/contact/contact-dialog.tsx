"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useI18n } from "@/components/i18n/locale-provider";
import { ContactForm } from "@/components/contact/contact-form";

type ContactDialogContextValue = {
  open: () => void;
  close: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function useContactDialog() {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) throw new Error("useContactDialog must be used within <ContactDialogProvider>");
  return ctx;
}

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<ContactDialogContextValue>(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [],
  );

  const onOpenChange = useCallback((next: boolean) => setIsOpen(next), []);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[1000] bg-[rgba(10,20,40,0.66)] backdrop-blur-md data-[state=open]:animate-[fade-in_0.2s_ease]" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-[1001] w-[calc(100vw-48px)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-paper p-[34px] shadow-[0_40px_80px_-24px_rgba(10,20,40,0.55)] focus:outline-none"
            aria-describedby={undefined}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="eyebrow text-navy">{t.contactDialog.eyebrow}</span>
              <Dialog.Close
                aria-label={t.common.close}
                className="rounded p-1 text-[#8A8375] transition hover:text-coral"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
            <Dialog.Title className="mb-5 text-[22px] font-extrabold tracking-tight text-ink">
              {t.contactDialog.title}
            </Dialog.Title>
            <ContactForm onSuccess={() => undefined} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ContactDialogContext.Provider>
  );
}
