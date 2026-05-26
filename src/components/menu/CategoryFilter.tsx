"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        type="button"
        onClick={() => onChange("ALL")}
        className={cn(
          "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
          active === "ALL"
            ? "bg-brown text-white shadow-md"
            : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:bg-cream"
        )}
      >
        All Items
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={cn(
            "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
            active === cat.id
              ? "bg-brown text-white shadow-md"
              : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:bg-cream"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
