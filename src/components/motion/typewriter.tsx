"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  text: string;
  /** ms per character. */
  speed?: number;
  /** Start typing only once scrolled into view. */
  onView?: boolean;
  /** Delay before typing starts (ms). */
  startDelay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

/**
 * Types `text` out one character at a time. Falls back to the full string
 * immediately when reduced-motion is requested.
 */
export function Typewriter({
  text,
  speed = 24,
  onView = false,
  startDelay = 0,
  as = "span",
  className,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [count, setCount] = useState(0);
  const [armed, setArmed] = useState(!onView);
  const done = count >= text.length;

  useEffect(() => {
    if (!onView || armed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onView, armed]);

  useEffect(() => {
    if (reduced || !armed) return;
    setCount(0);
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [reduced, armed, text, speed, startDelay]);

  const Tag = as as React.ElementType;
  const shown = reduced || !armed ? text : text.slice(0, count);
  const showCaret = armed && !reduced && !done;

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {shown || " "}
      {showCaret ? <span className="caret" aria-hidden="true" /> : null}
    </Tag>
  );
}
