"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  once?: boolean;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const directionClass = {
    up: "animate-on-scroll-up",
    down: "animate-on-scroll-down",
    left: "animate-on-scroll-left",
    right: "animate-on-scroll-right",
    scale: "animate-on-scroll-scale",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        directionClass,
        visible && "is-visible",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
