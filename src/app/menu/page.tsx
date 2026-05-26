import { prisma } from "@/lib/db";
import MenuPageClient from "./MenuPageClient";

export const metadata = {
  title: "Menu",
  description: "Browse our full menu of authentic Cebu lechon, belly trays, value meals, and more.",
};

export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return <MenuPageClient items={items} />;
}
