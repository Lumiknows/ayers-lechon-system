import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brown text-white hover:bg-brown-dark shadow-md hover:shadow-lg",
  secondary:
    "bg-accent text-charcoal hover:bg-bright-lemon-300 shadow-md hover:shadow-lg",
  outline:
    "border-2 border-brown text-brown hover:bg-brown hover:text-white",
  ghost: "text-brown hover:bg-cream",
  white: "bg-white text-brown hover:bg-cream shadow-md",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
