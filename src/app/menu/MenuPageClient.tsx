"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuCard } from "@/components/menu/MenuCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BRAND, MENU_CATEGORIES } from "@/lib/constants";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string | null;
  imageUrl: string;
  isAvailable: boolean;
}

export default function MenuPageClient({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-logo-red-600 pt-[var(--header-height)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <AnimateOnScroll>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bright-lemon-300">
              Official Price List
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              Cebu Lechon Menu
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Kinutchillo half lechon, boneless belly, and whole lechon regular —
              roasted fresh for your next Cebu celebration.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="border-b border-pearl-beige-200 bg-bright-lemon-50 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-6">
          <Truck className="h-5 w-5 shrink-0 text-dry-sage-800" />
          <p className="text-sm font-medium text-dry-sage-800">
            {BRAND.deliveryNote}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <CategoryFilter
              categories={[...MENU_CATEGORIES]}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </AnimateOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <AnimateOnScroll key={item.id} delay={index * 80} direction="scale" className="h-full">
                <MenuCard item={item} />
              </AnimateOnScroll>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-charcoal-light">
              No items found in this category.
            </p>
          )}

          <AnimateOnScroll className="mt-16" direction="up">
            <div className="overflow-hidden rounded-3xl bg-pearl-beige-100 p-4 shadow-lg ring-1 ring-pearl-beige-200 sm:p-6">
              <h2 className="mb-4 text-center font-display text-2xl font-semibold text-dry-sage-900">
                Official Menu Pricelist
              </h2>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={BRAND.menuPricelist}
                  alt="Cebu's Ayers Lechon official menu and price list"
                  width={900}
                  height={1200}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
              <p className="mt-4 text-center text-xs text-charcoal-light">
                * {BRAND.priceDisclaimer}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PublicLayout>
  );
}
