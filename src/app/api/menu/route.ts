import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const item = await prisma.menuItem.create({ data: body });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized or failed" }, { status: 401 });
  }
}
