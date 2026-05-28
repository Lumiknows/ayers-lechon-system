import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const branches = await prisma.store.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return <AdminDashboard branches={branches} adminEmail={session.email} />;
}
