import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: "content" | "wide" | "text" | "narrow";
  as?: "div" | "section" | "header" | "footer";
};

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  wide: "max-w-[var(--container-wide)]",
  content: "max-w-[var(--container-content)]",
  text: "max-w-[820px]",
  narrow: "max-w-[760px]",
};

export function Container({
  width = "content",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-[22px] xs:px-8", widths[width], className)}
      {...props}
    />
  );
}
