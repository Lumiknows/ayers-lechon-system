"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Utensils } from "lucide-react";
import { BRAND } from "@/lib/constants";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const floatIn = (delay: number, rotate: number) => ({
  initial: { opacity: 0, y: 40, rotate },
  animate: { opacity: 1, y: 0, rotate },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroSection() {
  const { lechonBelly, wholeLechon, friedChicken } = BRAND.heroProducts;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-logo-red-600">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-bright-lemon-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-maroon-950/20 blur-[80px]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-4 px-4 pb-6 pt-[var(--header-height)] sm:gap-8 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:pb-12">
        {/* Left — headline & CTA */}
        <div className="text-left">
          <motion.p
            {...fadeUp(0.05)}
            className="font-subtitle text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm"
          >
            Cebu&apos;s #1 Lechon Since 2009
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-3 font-display text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:mt-4 sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
          >
            <span className="text-white">Roasted to</span>
            <br />
            <span className="text-hero-yellow">Perfection</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
          >
            Crispy golden skin, tender flavorful meat, and the rich tradition of
            Cebu roasting — now available at all Ayer&apos;s Lechon branches.
            Get them while they&apos;re hot.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-bright-lemon-400 px-5 py-3 font-subtitle text-xs font-black uppercase tracking-[0.12em] text-maroon-950 shadow-[0_8px_30px_rgba(247,231,59,0.35)] transition-all duration-300 hover:scale-105 hover:bg-bright-lemon-300 hover:shadow-[0_12px_40px_rgba(247,231,59,0.5)] sm:gap-2.5 sm:px-8 sm:py-4 sm:text-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Order Now
            </Link>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 py-3 font-subtitle text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 sm:gap-2.5 sm:px-8 sm:py-4 sm:text-sm"
            >
              <Utensils className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              View Menu
            </Link>
          </motion.div>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-6 font-subtitle text-xs tracking-wide text-white/50"
          >
            {BRAND.deliveryNote}
          </motion.p>
        </div>

        {/* Right — floating product mockups */}
        <div className="relative mx-auto h-[260px] w-full max-w-lg sm:h-[400px] lg:mx-0 lg:h-[520px] lg:max-w-none">
          {/* Decorative badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 right-0 z-20 hidden h-28 w-28 items-center justify-center rounded-full border-4 border-white/20 bg-maroon-950 shadow-2xl sm:flex lg:bottom-12 lg:right-4"
          >
            <p className="text-center font-subtitle text-[9px] font-bold uppercase leading-tight tracking-wider text-bright-lemon-400">
              Freshly
              <br />
              Roasted
              <br />
              Daily
            </p>
          </motion.div>

          {/* Lechon belly */}
          <motion.div
            {...floatIn(0.35, -8)}
            className="absolute left-0 top-4 z-10 w-[48%] sm:left-2 sm:top-8 sm:w-[44%] lg:left-0 lg:top-12"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-2 ring-white/10">
              <Image
                src={lechonBelly}
                alt="Lechon belly mockup"
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 768px) 45vw, 280px"
              />
            </div>
            <p className="mt-2 text-center font-subtitle text-[10px] font-bold uppercase tracking-widest text-white/60">
              Lechon Belly
            </p>
          </motion.div>

          {/* Whole lechon */}
          <motion.div
            {...floatIn(0.5, 6)}
            className="absolute right-0 top-0 z-20 w-[52%] sm:right-2 sm:top-0 sm:w-[48%] lg:right-4 lg:top-4"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.4)] ring-2 ring-white/15">
              <Image
                src={wholeLechon}
                alt="Whole lechon mockup"
                width={440}
                height={330}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 768px) 50vw, 320px"
                priority
              />
            </div>
            <p className="mt-2 text-center font-subtitle text-[10px] font-bold uppercase tracking-widest text-white/60">
              Whole Lechon
            </p>
          </motion.div>

          {/* Fried chicken */}
          <motion.div
            {...floatIn(0.65, -4)}
            className="absolute bottom-0 left-[28%] z-30 w-[44%] sm:bottom-4 sm:left-[30%] lg:bottom-8 lg:left-[32%]"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-2 ring-white/10">
              <Image
                src={friedChicken}
                alt="Fried chicken mockup"
                width={360}
                height={270}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 768px) 42vw, 260px"
              />
            </div>
            <p className="mt-2 text-center font-subtitle text-[10px] font-bold uppercase tracking-widest text-white/60">
              Fried Chicken
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
