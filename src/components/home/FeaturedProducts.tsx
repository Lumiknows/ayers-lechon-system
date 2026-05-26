import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { formatPrice, getCategoryLabel } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string | null;
  imageUrl: string;
}

export function FeaturedProducts({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dark-khaki-600">
            Our Favorites
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
            From Kinutchillo half lechon to whole lechon regular, discover our
            most ordered Cebu specialties.
          </p>
        </AnimateOnScroll>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100} direction="scale">
              <Card hover className="group h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent>
                  <Badge variant="gold" className="mb-3">
                    {getCategoryLabel(item.category)}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold text-charcoal">
                    {item.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal-light">
                    {item.description}
                  </p>
                  {item.sizes && (
                    <p className="mt-2 text-xs text-dry-sage-600">{item.sizes}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-dark-khaki-700">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-10 text-center" delay={200}>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-semibold text-dry-sage-800 transition-all hover:gap-3 hover:text-dark-khaki-700"
          >
            View Full Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
