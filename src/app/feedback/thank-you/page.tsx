import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "Thank You",
};

export default function ThankYouPage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-logo-red-600 pt-[var(--header-height)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <p className="font-subtitle text-sm font-semibold uppercase tracking-[0.2em] text-bright-lemon-300">
            Feedback Received
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
            Thank You!
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-lg px-5 sm:px-8">
          <Card className="text-center shadow-lg">
            <CardContent className="py-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <p className="mt-6 text-lg leading-relaxed text-charcoal-light">
                Thank you for helping us improve! Your feedback means the world to
                our team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/" variant="secondary" size="lg">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
                <Link
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brown px-6 py-3 font-semibold text-brown transition-colors hover:bg-brown hover:text-white"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Follow us on Facebook
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
