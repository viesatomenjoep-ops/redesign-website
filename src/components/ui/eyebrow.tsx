import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & {
  tone?: "coral" | "navy" | "muted";
};

const tones = {
  coral: "text-coral",
  navy: "text-navy",
  muted: "text-muted-2",
} as const;

/** Monospace, wide-tracked, uppercase label used above section headings. */
export function Eyebrow({ tone = "coral", className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("eyebrow", tones[tone], className)} {...props}>
      {children}
    </p>
  );
}
