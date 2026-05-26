import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const branches = await prisma.store.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return <AdminDashboard branches={branches} />;
}
