import { cn } from "@/lib/utils";

type SectionTileProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  /** Screen label from the prototype's data-screen-label — kept for parity/debug. */
  label?: string;
};

/**
 * The cream, 44px-radius panel that floats on the navy background with a
 * small margin — the signature "inset card" rhythm of the landing page.
 */
export function SectionTile({ className, label, children, ...props }: SectionTileProps) {
  return (
    <section
      data-screen-label={label}
      className={cn(
        "m-[14px] rounded-tile bg-paper text-ink xs:m-[14px]",
        "overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
