import { MenuManager } from "@/components/admin/MenuManager";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Menu Management",
};

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return <MenuManager initialItems={items} />;
}
