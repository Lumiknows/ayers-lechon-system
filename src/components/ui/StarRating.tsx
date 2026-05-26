"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  label?: string;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  value,
  onChange,
  label,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-charcoal">{label}</p>
      )}
      <div className="flex gap-1" role="group" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            className={cn(
              "transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded",
              !readonly && "hover:scale-110 active:scale-95",
              readonly && "cursor-default"
            )}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                sizes[size],
                star <= value
                  ? "fill-gold text-gold"
                  : "fill-transparent text-charcoal/20"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
