"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselProps = {
  children: React.ReactNode;
  /** Tailwind classes for each slide wrapper — controls how many show at once. */
  slideClassName?: string;
  options?: EmblaOptions;
  /** Gap between slides, in px. */
  gap?: number;
  className?: string;
  ariaLabel: string;
};

export function Carousel({
  children,
  slideClassName = "basis-full",
  options,
  gap = 20,
  className,
  ariaLabel,
}: CarouselProps) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", ...options });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnapCount(embla.scrollSnapList().length);
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", () => {
      setSnapCount(embla.scrollSnapList().length);
      onSelect();
    });
  }, [embla, onSelect]);

  const slides = Array.isArray(children) ? children : [children];

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ marginLeft: -gap }} role="region" aria-label={ariaLabel}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className={cn("min-w-0 shrink-0 grow-0", slideClassName)}
              style={{ paddingLeft: gap }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          aria-label="Vorige"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D3C6] bg-white text-navy transition hover:border-navy"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#8A8FA0]">
          {String(selected + 1)} / {String(Math.max(snapCount, 1))}
        </span>
        <button
          type="button"
          onClick={() => embla?.scrollNext()}
          aria-label="Volgende"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D3C6] bg-white text-navy transition hover:border-navy"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
