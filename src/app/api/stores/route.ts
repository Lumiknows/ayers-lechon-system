import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET() {
  const stores = await prisma.store.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(stores);
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const store = await prisma.store.create({ data: body });
    return NextResponse.json(store, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized or failed" }, { status: 401 });
  }
}
