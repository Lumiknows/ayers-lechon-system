import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface Testimonial {
  id: string;
  comments: string | null;
  overallRating: number;
  customerName: string | null;
  branch: { name: string };
}

export function TestimonialsPreview({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="relative overflow-hidden bg-pearl-beige-100 py-12 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-dark-khaki-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-pearl-beige-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-subtitle text-sm font-semibold uppercase tracking-[0.2em] text-logo-red-600">
              Customer Love
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">
              What Our Guests Say
            </h2>
          </div>
          <Button href="/feedback" variant="outline">
            Share Your Feedback
          </Button>
        </AnimateOnScroll>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 120} direction="up">
              <div className="group relative h-full rounded-2xl border border-pearl-beige-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-pearl-beige-200 transition-colors group-hover:text-dark-khaki-200" />

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.overallRating
                          ? "fill-dark-khaki-500 text-dark-khaki-500"
                          : "text-pearl-beige-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
                  &ldquo;{item.comments ?? "Great experience!"}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-pearl-beige-200 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-logo-red-600 font-display text-sm font-bold text-white">
                    {(item.customerName ?? "G")[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      {item.customerName ?? "Happy Customer"}
                    </p>
                    <p className="text-xs text-charcoal-light">{item.branch.name}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
