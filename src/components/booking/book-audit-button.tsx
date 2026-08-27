"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { track } from "@vercel/analytics";
import { buttonClasses } from "@/components/ui/button";
import { calcom, calcomBrandVars, calcomEmbedConfig } from "@/lib/calcom";
import { cn } from "@/lib/utils";

type BookAuditButtonProps = {
  children?: React.ReactNode;
  className?: string;
  /** Where to send the visitor after a successful booking. */
  redirectTo?: string;
};

/**
 * Opens the Cal.com booking modal for the "gratis audit" event type.
 * Popup only — a plain <button> with `data-cal-*` attributes, which the embed
 * script binds. No `href`/`target`, so it can never navigate, and we don't
 * also call `cal("modal")` programmatically (doing both spawns two instances
 * and leaves a stuck loader on close).
 */
export function BookAuditButton({
  children = "Vraag gratis audit aan",
  className,
  redirectTo = "/bedankt",
}: BookAuditButtonProps) {
  useEffect(() => {
    let cancelled = false;

    const onBooked = () => {
      try {
        track("audit_booked", { eventType: calcom.namespace });
      } catch {
        /* analytics optional */
      }
      if (redirectTo) window.location.href = redirectTo;
    };

    (async () => {
      const cal = await getCalApi({ namespace: calcom.namespace });
      if (cancelled) return;

      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        // We force the light theme; `dark` is only here because the type requires it.
        cssVarsPerTheme: { light: calcomBrandVars, dark: calcomBrandVars },
      });
      cal("on", { action: "bookingSuccessful", callback: onBooked });
    })();

    return () => {
      cancelled = true;
      getCalApi({ namespace: calcom.namespace }).then((cal) => {
        cal("off", { action: "bookingSuccessful", callback: onBooked });
      });
    };
  }, [redirectTo]);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      data-cal-namespace={calcom.namespace}
      data-cal-link={calcom.link}
      data-cal-config={JSON.stringify(calcomEmbedConfig)}
      className={cn(buttonClasses({ variant: "coral", size: "lg" }), className)}
    >
      {children}
    </button>
  );
}
