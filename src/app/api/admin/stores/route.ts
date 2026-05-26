import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireSession();
    const stores = await prisma.store.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(stores);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
