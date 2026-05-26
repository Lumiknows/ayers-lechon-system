import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string | false;
}

const sizes = {
  sm: { image: 40, text: "text-base" },
  md: { image: 52, text: "text-lg" },
  lg: { image: 72, text: "text-xl" },
};

export function Logo({
  size = "md",
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  const config = sizes[size];

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={BRAND.logo}
        alt={BRAND.name}
        width={config.image}
        height={config.image}
        className="rounded-xl object-contain"
        priority={size !== "sm"}
      />
      {showText && (
        <div>
          <p
            className={cn(
              "font-display font-semibold leading-tight text-brown",
              config.text
            )}
          >
            {BRAND.name}
          </p>
          <p className="text-xs text-charcoal-light">Cebu&apos;s Finest Lechon</p>
        </div>
      )}
    </div>
  );

  if (href !== false) {
    return (
      <Link href={href ?? "/"} className="group inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
