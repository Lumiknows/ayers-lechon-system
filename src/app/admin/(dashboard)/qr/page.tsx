import { QRGenerator } from "@/components/admin/QRGenerator";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "QR Code Generator",
};

export default async function AdminQRPage() {
  const stores = await prisma.store.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return <QRGenerator stores={stores} />;
}
