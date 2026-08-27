"use client";

import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/contact/contact-dialog";

type ContactButtonProps = React.ComponentProps<typeof Button>;

/** A <Button> wired to open the global contact dialog. */
export function ContactButton({ children = "Plan een strategiegesprek", ...props }: ContactButtonProps) {
  const { open } = useContactDialog();
  return (
    <Button type="button" onClick={open} {...props}>
      {children}
    </Button>
  );
}
