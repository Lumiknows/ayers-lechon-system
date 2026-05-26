import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "brown" | "success";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-cream text-charcoal",
    gold: "bg-dark-khaki-100 text-dry-sage-900",
    brown: "bg-dry-sage-100 text-dry-sage-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
