import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "coral" | "paper" | "outline" | "navy";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-bold transition duration-200 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  coral:
    "bg-coral text-navy hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(226,96,63,0.5)]",
  paper: "bg-paper text-navy hover:-translate-y-0.5 hover:bg-coral hover:text-paper",
  outline: "border border-paper/30 text-paper hover:border-coral hover:text-coral",
  navy: "bg-navy text-paper hover:bg-coral",
};

const sizes: Record<Size, string> = {
  md: "px-[22px] py-[11px] text-sm",
  lg: "px-8 py-4 text-[15.5px]",
};

type StyleProps = { variant?: Variant; size?: Size };

export function buttonClasses({ variant = "coral", size = "md" }: StyleProps = {}, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = StyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size }, className)} {...props} />;
}

type ButtonLinkProps = StyleProps &
  React.ComponentPropsWithoutRef<typeof Link> & { className?: string };

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size }, className)} {...props} />;
}
