import { StoreManager } from "@/components/admin/StoreManager";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Store Management",
};

export default async function AdminStoresPage() {
  const stores = await prisma.store.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return <StoreManager initialStores={stores} />;
}
