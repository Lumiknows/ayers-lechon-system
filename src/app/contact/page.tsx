import { Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Cebu's Ayers Lechon for orders, catering, and inquiries.",
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-logo-red-600 pt-[var(--header-height)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <p className="font-subtitle text-sm font-semibold uppercase tracking-[0.2em] text-bright-lemon-300">
            Get in Touch
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Ready to order authentic Cebu lechon for your next celebration?
            We&apos;re just a call away.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <AnimateOnScroll>
              <Card hover className="h-full">
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-red-600/10">
                    <PhoneCall className="h-5 w-5 text-logo-red-600" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    Call & Order
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    Reach us directly for orders, bulk inquiries, and event bookings.
                  </p>
                  <div className="mt-4 space-y-1">
                    <a
                      href={`tel:${BRAND.phone.replace(/[^\d+]/g, "")}`}
                      className="block text-lg font-bold text-logo-red-600 transition-colors hover:text-logo-red-700"
                    >
                      {BRAND.phone}
                    </a>
                    <a
                      href={`tel:${BRAND.phoneAlt.replace(/[^\d+]/g, "")}`}
                      className="block text-sm font-semibold text-charcoal-light hover:text-charcoal"
                    >
                      {BRAND.phoneAlt}
                    </a>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={`tel:${BRAND.mobile}`}
                        className="rounded-full bg-cream px-3 py-1.5 font-subtitle text-xs font-medium text-charcoal transition-colors hover:bg-pearl-beige-200"
                      >
                        {BRAND.mobile}
                      </a>
                      <a
                        href={`tel:${BRAND.mobileAlt}`}
                        className="rounded-full bg-cream px-3 py-1.5 font-subtitle text-xs font-medium text-charcoal transition-colors hover:bg-pearl-beige-200"
                      >
                        {BRAND.mobileAlt}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={80}>
              <Card hover className="h-full">
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-red-600/10">
                    <Mail className="h-5 w-5 text-logo-red-600" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    Email Us
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    For catering proposals, partnerships, and detailed inquiries.
                  </p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="mt-4 inline-block font-semibold text-logo-red-600 transition-colors hover:text-logo-red-700"
                  >
                    {BRAND.email}
                  </a>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={160}>
              <Card hover className="h-full">
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-red-600/10">
                    <MapPin className="h-5 w-5 text-logo-red-600" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    Visit Our Branches
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    8 locations across Cebu — find the one nearest you.
                  </p>
                  <Button href="/locations" variant="outline" className="mt-4">
                    View All Locations
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={240}>
              <Card hover className="h-full">
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logo-red-600/10">
                    <FacebookIcon className="h-5 w-5 text-logo-red-600" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    Follow Us
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    Stay updated with promos, events, and mouth-watering lechon photos.
                  </p>
                  <a
                    href={BRAND.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-logo-red-600 transition-colors hover:text-logo-red-700"
                  >
                    {BRAND.facebookLabel} →
                  </a>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll className="mt-10" direction="up">
            <Card className="overflow-hidden bg-gradient-to-br from-cream to-pearl-beige-100">
              <CardContent className="text-center">
                <h3 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                  Order for Your Next Celebration
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-charcoal-light">
                  Whole lechon, party trays, and full catering available. Browse our
                  menu or call us to place your order.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button href="/menu" variant="secondary" size="lg">
                    View Menu
                  </Button>
                  <Button href={`tel:${BRAND.phone.replace(/[^\d+]/g, "")}`} variant="primary" size="lg">
                    <Phone className="h-4 w-4" />
                    Call to Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>
    </PublicLayout>
  );
}
