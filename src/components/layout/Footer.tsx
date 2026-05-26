import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto bg-dry-sage-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo size="md" showText={false} href={false} className="mx-auto mb-3" />
            <h3 className="font-display text-xl font-semibold text-gold">
              {BRAND.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Serving authentic Cebu lechon for family gatherings, fiestas, and
              everyday celebrations. Roasted with tradition, served with pride.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/menu" className="hover:text-gold transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-gold transition-colors">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-gold transition-colors">
                  Customer Feedback
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold">Contact</h4>
            <ul className="mt-3 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {BRAND.phone} · {BRAND.phoneAlt}
                  <br />
                  {BRAND.mobile} · {BRAND.mobileAlt}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                {BRAND.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                Cebu City, Philippines
              </li>
              <li>
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <FacebookIcon className="h-4 w-4 text-gold" />
                  {BRAND.facebookLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
