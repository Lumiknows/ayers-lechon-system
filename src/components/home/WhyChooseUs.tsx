import Image from "next/image";
import Link from "next/link";
import { Flame, Beef, Truck, PartyPopper } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bright-lemon-50 via-banana-cream-50 to-bright-lemon-100 py-12 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-bright-lemon-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-dark-khaki-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">

          {/* Big hero tile — image + headline */}
          <AnimateOnScroll direction="left" className="sm:col-span-2 lg:row-span-2">
            <div className="group relative h-full min-h-[260px] overflow-hidden rounded-3xl sm:min-h-[420px]">
              <Image
                src="/hero-lechon-belly.jpg"
                alt="Crispy lechon belly close-up"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.3em] text-bright-lemon-400">
                  Why Choose Us
                </p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase leading-[0.95] text-white sm:text-4xl lg:text-5xl">
                  The Ayers
                  <br />
                  <span className="text-bright-lemon-400">Difference</span>
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                  Every lechon we serve carries a tradition of Cebuano craftsmanship — hand-picked, 
                  slow-roasted, and delivered crispy to your table.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Tile — Authentic roasting */}
          <AnimateOnScroll delay={100} direction="right">
            <div className="group relative flex h-full min-h-[160px] flex-col justify-end overflow-hidden rounded-3xl bg-logo-red-600 p-5 sm:min-h-[200px] sm:p-6">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl transition-all group-hover:scale-150" />
              <div className="pointer-events-none absolute right-4 top-4">
                <svg viewBox="0 0 64 64" className="h-16 w-16 text-white/10" fill="currentColor">
                  <path d="M32 4c-6 0-12 8-12 20s6 20 12 20 12-8 12-20S38 4 32 4zm0 36c-4 0-8-6-8-16s4-16 8-16 8 6 8 16-4 16-8 16z" />
                  <path d="M28 44c-2 2-4 6-4 10h16c0-4-2-8-4-10" />
                  <circle cx="32" cy="58" r="4" />
                </svg>
              </div>
              <Flame className="h-10 w-10 text-white/20" />
              <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                Authentic Cebu
                <br />Roasting
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Slow-roasted over open coals using techniques perfected over decades in Cebu.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Tile — Stats + image */}
          <AnimateOnScroll delay={200} direction="right">
            <div className="group relative flex h-full min-h-[160px] flex-col overflow-hidden rounded-3xl sm:min-h-[200px]">
              <Image
                src="/hero-lechon-whole.jpg"
                alt="Whole lechon roast"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/95 via-maroon-950/50 to-maroon-950/20" />
              <div className="relative mt-auto p-6">
                <div className="flex items-end gap-3">
                  <span className="font-display text-5xl font-black leading-none text-bright-lemon-400">8</span>
                  <div>
                    <p className="font-subtitle text-sm font-bold uppercase tracking-wider text-white">Branches</p>
                    <p className="text-xs text-white/50">Across Metro Cebu</p>
                  </div>
                </div>
                <Link
                  href="/locations"
                  className="mt-4 inline-block font-subtitle text-xs font-semibold uppercase tracking-wider text-bright-lemon-400 transition-colors hover:text-bright-lemon-300"
                >
                  Find a Store →
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom row — three small tiles */}
        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 sm:grid-cols-3">
          <AnimateOnScroll delay={80} direction="up">
            <div className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:gap-4 sm:rounded-3xl sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-logo-red-600 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                <Beef className="h-5 w-5 text-white sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-charcoal sm:text-base">Premium Pork</h3>
                <p className="mt-0.5 text-xs text-charcoal-light sm:text-sm">Hand-selected, locally sourced from trusted Cebu farms.</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={160} direction="up">
            <div className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:gap-4 sm:rounded-3xl sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dark-khaki-500 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                <Truck className="h-5 w-5 text-white sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-charcoal sm:text-base">Free Delivery</h3>
                <p className="mt-0.5 text-xs text-charcoal-light sm:text-sm">Door-to-door within Metro Cebu, nationwide via airport.</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={240} direction="up">
            <div className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:gap-4 sm:rounded-3xl sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-logo-red-600 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                <PartyPopper className="h-5 w-5 text-white sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-charcoal sm:text-base">Event Catering</h3>
                <p className="mt-0.5 text-xs text-charcoal-light sm:text-sm">Birthdays, weddings, fiestas — we handle it all.</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
