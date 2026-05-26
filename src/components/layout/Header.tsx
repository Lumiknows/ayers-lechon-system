"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-maroon-950/90 shadow-lg shadow-black/25 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500",
        scrolled && "shadow-xl shadow-black/30"
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={36}
              height={36}
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight tracking-wide text-white">
              AYER&apos;S
            </p>
            <p className="font-subtitle text-[10px] font-medium uppercase tracking-[0.2em] text-bright-lemon-300">
              Lechon Cebu
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-underline relative px-3 py-1.5 font-subtitle text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                pathname === link.href
                  ? "active text-bright-lemon-300"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-md bg-bright-lemon-400 px-4 py-2 font-subtitle text-[11px] font-black uppercase tracking-[0.1em] text-maroon-950 shadow-md shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-bright-lemon-300"
          >
            <ShoppingBag className="h-3 w-3 transition-transform duration-300 group-hover:-rotate-12" />
            Order Now
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white/80 transition-colors hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/15 bg-maroon-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 font-subtitle text-[13px] font-medium uppercase tracking-wider transition-all",
                      pathname === link.href
                        ? "bg-white/10 text-bright-lemon-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.25 }}
                className="mt-1.5"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-bright-lemon-400 px-5 py-2.5 font-subtitle text-[13px] font-black uppercase tracking-wider text-maroon-950"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Order Now
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
