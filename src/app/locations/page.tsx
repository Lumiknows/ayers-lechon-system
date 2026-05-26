import { PublicLayout } from "@/components/layout/PublicLayout";
import { StoreCard } from "@/components/locations/StoreCard";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Locations",
  description: "Find Cubu's Ayer Lechon branches across Cebu City. More locations coming soon nationwide.",
};

export default async function LocationsPage() {
  const stores = await prisma.store.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  const cities = [...new Set(stores.map((s) => s.city))];

  return (
    <PublicLayout>
      <section className="bg-logo-red-600 pt-[var(--header-height)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-bright-lemon-300">
            Find Us
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Store Locations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Visit us in Cebu City today. Our structure is ready for nationwide
            expansion, with more branches coming soon.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cities.map((city) => (
            <div key={city} className="mb-12 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-semibold text-charcoal">
                {city}
              </h2>
              <div className="grid gap-8 lg:grid-cols-2">
                {stores
                  .filter((s) => s.city === city)
                  .map((store) => (
                    <StoreCard key={store.id} store={store} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
