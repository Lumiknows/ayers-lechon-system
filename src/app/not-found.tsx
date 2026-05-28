import Link from "next/link";
import { Home, UtensilsCrossed, MessageSquare, SearchX } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-brown pt-[var(--header-height)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <p className="font-subtitle text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
            Error 404
          </p>
          <h1 className="mt-2 font-display text-6xl font-bold uppercase sm:text-8xl">
            404
          </h1>
          <p className="mt-3 font-display text-2xl font-bold uppercase sm:text-3xl">
            Page Not Found
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-lg px-5 sm:px-8">
          <Card className="text-center shadow-lg">
            <CardContent className="py-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream">
                <SearchX className="h-10 w-10 text-brown" />
              </div>
              <p className="mt-6 text-lg leading-relaxed text-charcoal-light">
                The page you&apos;re looking for doesn&apos;t exist or may have been
                moved. Let&apos;s get you back to something delicious.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Button href="/" variant="secondary" size="lg" className="w-full">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/menu"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brown px-6 py-3 font-semibold text-brown transition-colors hover:bg-brown hover:text-white"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    View Menu
                  </Link>
                  <Link
                    href="/feedback"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-charcoal/15 px-6 py-3 font-semibold text-charcoal-light transition-colors hover:border-brown hover:text-brown"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Leave Feedback
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
