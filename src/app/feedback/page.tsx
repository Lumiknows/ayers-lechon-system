import { PublicLayout } from "@/components/layout/PublicLayout";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card, CardContent } from "@/components/ui/Card";
import { prisma } from "@/lib/db";
import { Clock, MessageSquareHeart, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Customer Feedback",
  description: "Share your dining experience at Cebu's Ayers Lechon. Quick and easy feedback form.",
};

export default async function FeedbackPage() {
  const stores = await prisma.store.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-logo-red-600 pt-[var(--header-height)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <MessageSquareHeart className="h-6 w-6 text-bright-lemon-300" />
          </div>
          <p className="font-subtitle text-sm font-semibold uppercase tracking-[0.2em] text-bright-lemon-300">
            We Value Your Opinion
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">
            Customer Feedback
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Tell us about your experience — it takes less than a minute and helps
            us serve you better.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <AnimateOnScroll direction="up">
              <div className="flex items-center gap-3 rounded-xl bg-bright-lemon-50 px-4 py-3 ring-1 ring-bright-lemon-200">
                <Clock className="h-5 w-5 shrink-0 text-dark-khaki-600" />
                <p className="text-sm font-medium text-charcoal">Under 1 minute</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80} direction="up">
              <div className="flex items-center gap-3 rounded-xl bg-bright-lemon-50 px-4 py-3 ring-1 ring-bright-lemon-200">
                <ShieldCheck className="h-5 w-5 shrink-0 text-dark-khaki-600" />
                <p className="text-sm font-medium text-charcoal">Confidential</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={160} direction="up">
              <div className="flex items-center gap-3 rounded-xl bg-bright-lemon-50 px-4 py-3 ring-1 ring-bright-lemon-200">
                <MessageSquareHeart className="h-5 w-5 shrink-0 text-dark-khaki-600" />
                <p className="text-sm font-medium text-charcoal">All branches</p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll direction="up">
            <Card className="shadow-lg">
              <CardContent>
                <FeedbackForm stores={stores} />
              </CardContent>
            </Card>
          </AnimateOnScroll>

          <p className="mt-6 text-center text-sm text-charcoal-light">
            Your feedback helps us maintain the highest quality of lechon and
            service across all Ayer&apos;s Lechon branches.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
