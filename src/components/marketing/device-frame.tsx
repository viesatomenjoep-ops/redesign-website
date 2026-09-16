import Image from "next/image";
import { cn } from "@/lib/utils";

export type DeviceVariant = "macbook-pro" | "macbook-air" | "imac";

/** Cycled by index so a grid of cards never shows the same device twice in a row. */
export const deviceCycle: DeviceVariant[] = ["macbook-pro", "imac", "macbook-air"];

type DeviceFrameProps = {
  src: string;
  alt: string;
  variant: DeviceVariant;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * CSS-drawn Apple-style device around a screenshot — no frame images, so it
 * stays crisp at every size. The screen shows the top of the page
 * (object-cover object-top), exactly what the device would display.
 */
export function DeviceFrame({
  src,
  alt,
  variant,
  priority = false,
  sizes = "(max-width: 820px) 100vw, 780px",
  className,
}: DeviceFrameProps) {
  if (variant === "imac") {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-[14px] bg-gradient-to-b from-[#F2F3F5] to-[#D6D8DC] p-[3.5%] pb-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              quality={90}
              priority={priority}
              className="object-cover object-top"
            />
          </div>
          <div className="flex h-[clamp(20px,7%,34px)] min-h-[20px] items-center justify-center py-[6px]">
            <span className="block h-[7px] w-[7px] rounded-full bg-[#B9BCC2]" />
          </div>
        </div>
        <div
          className="mx-auto h-[clamp(18px,6vw,40px)] w-[18%] bg-gradient-to-b from-[#C9CCD1] to-[#E4E6E9]"
          style={{ clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)" }}
        />
        <div className="mx-auto h-[7px] w-[26%] rounded-[3px] bg-gradient-to-b from-[#E4E6E9] to-[#B9BCC2]" />
      </div>
    );
  }

  const lid = variant === "macbook-pro" ? "bg-[#101216]" : "bg-gradient-to-b from-[#EDEEF0] to-[#D9DBDF]";
  const bezel = variant === "macbook-pro" ? "border-[#101216]" : "border-[#2A2C30]";

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("mx-auto w-[84%] rounded-t-[12px] p-[1.6%] pb-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]", lid)}>
        <div className={cn("relative aspect-[16/10] overflow-hidden rounded-t-[6px] border-[3px] border-b-0 bg-white", bezel)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={90}
            priority={priority}
            className="object-cover object-top"
          />
          {variant === "macbook-pro" ? (
            <span className="absolute left-1/2 top-0 h-[3.2%] w-[14%] -translate-x-1/2 rounded-b-[5px] bg-[#101216]" />
          ) : null}
        </div>
      </div>
      <div className="relative h-[clamp(10px,1.6vw,16px)] rounded-b-[10px] bg-gradient-to-b from-[#E7E8EA] to-[#9EA2A8] shadow-[0_18px_36px_-18px_rgba(0,0,0,0.55)]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[13%] -translate-x-1/2 rounded-b-[7px] bg-[#C3C6CB]" />
      </div>
    </div>
  );
}
