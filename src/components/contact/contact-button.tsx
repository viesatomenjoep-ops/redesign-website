"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";
import { useContactDialog } from "@/components/contact/contact-dialog";

type ContactButtonProps = React.ComponentProps<typeof Button>;

/** A <Button> wired to open the global contact dialog. */
export function ContactButton({ children, ...props }: ContactButtonProps) {
  const { t } = useI18n();
  const { open } = useContactDialog();
  return (
    <Button type="button" onClick={open} {...props}>
      {children ?? t.common.planCall}
    </Button>
  );
}
