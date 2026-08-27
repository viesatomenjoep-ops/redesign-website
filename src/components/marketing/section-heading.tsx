import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "center" | "left";
  tone?: "coral" | "navy";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "navy",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto max-w-[680px]",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Eyebrow tone={tone} className="mb-5">
        {eyebrow}
      </Eyebrow>
      <h2 className="text-[clamp(1.875rem,3.8vw,2.75rem)] font-extrabold text-ink">{title}</h2>
      {lede ? (
        <p className="mt-5 text-base leading-relaxed text-muted-ink">{lede}</p>
      ) : null}
    </Reveal>
  );
}
