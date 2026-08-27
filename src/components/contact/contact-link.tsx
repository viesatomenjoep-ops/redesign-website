"use client";

import { useContactDialog } from "@/components/contact/contact-dialog";
import { cn } from "@/lib/utils";

/** Inline text button that opens the global contact dialog. */
export function ContactLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useContactDialog();
  return (
    <button
      type="button"
      onClick={open}
      className={cn("underline underline-offset-2 transition hover:text-coral", className)}
    >
      {children}
    </button>
  );
}
