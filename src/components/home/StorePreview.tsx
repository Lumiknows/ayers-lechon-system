import { Clock, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapLink: string;
}

export function StorePreview({ stores }: { stores: Store[] }) {
  return (
    <section className="relative overflow-hidden bg-dry-sage-800 py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,185,41,0.1),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bright-lemon-400">
            Visit Us
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Cebu City Locations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Free door-to-door delivery within Metro Cebu. Available nationwide.
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stores.map((store, index) => (
            <AnimateOnScroll key={store.id} delay={index * 120} direction="up">
              <Card className="h-full bg-white/10 ring-white/10 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <CardContent>
                  <h3 className="font-display text-lg font-semibold text-bright-lemon-300">
                    {store.name}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-white/80">
                    <li className="flex gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bright-lemon-400" />
                      {store.address}
                    </li>
                    <li className="flex gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-bright-lemon-400" />
                      {store.phone}
                    </li>
                    <li className="flex gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-bright-lemon-400" />
                      {store.hours}
                    </li>
                  </ul>
                  <a
                    href={store.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-bright-lemon-300 transition-colors hover:text-bright-lemon-400"
                  >
                    Get Directions →
                  </a>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-10 text-center" delay={200}>
          <Button href="/locations" variant="secondary">
            View All Locations
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
