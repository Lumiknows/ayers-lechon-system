import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { StorePreview } from "@/components/home/StorePreview";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [featuredItems, testimonials, stores] = await Promise.all([
    prisma.menuItem.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
    prisma.feedback.findMany({
      where: { comments: { not: null } },
      include: { branch: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.store.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <PublicLayout>
      <HeroSection />
      <FeaturedProducts items={featuredItems} />
      <WhyChooseUs />
      <TestimonialsPreview testimonials={testimonials} />
      <StorePreview stores={stores} />
    </PublicLayout>
  );
}
