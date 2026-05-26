import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireSession();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const orderType = searchParams.get("orderType");
    const minRating = searchParams.get("minRating");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: Record<string, unknown> = {};

    if (branchId && branchId !== "ALL") where.branchId = branchId;
    if (orderType && orderType !== "ALL") where.orderType = orderType;
    if (minRating && minRating !== "ALL") {
      where.overallRating = { gte: Number(minRating) };
    }
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        (where.createdAt as Record<string, Date>).gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        (where.createdAt as Record<string, Date>).lte = end;
      }
    }

    const feedback = await prisma.feedback.findMany({
      where,
      include: { branch: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const total = feedback.length;
    const avg = (field: keyof typeof feedback[0]) =>
      total > 0
        ? feedback.reduce((sum, f) => sum + (f[field] as number), 0) / total
        : 0;

    const recommendCount = feedback.filter((f) => f.wouldRecommend).length;
    const recommendPercent = total > 0 ? (recommendCount / total) * 100 : 0;

    const branches = await prisma.store.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    const branchStats = branches.map((branch) => {
      const branchFeedback = feedback.filter((f) => f.branchId === branch.id);
      const count = branchFeedback.length;
      const avgOverall =
        count > 0
          ? branchFeedback.reduce((s, f) => s + f.overallRating, 0) / count
          : 0;
      return { branchId: branch.id, branchName: branch.name, count, avgOverall };
    });

    const monthlyTrend: Record<string, number> = {};
    feedback.forEach((f) => {
      const key = new Date(f.createdAt).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
      });
      monthlyTrend[key] = (monthlyTrend[key] ?? 0) + 1;
    });

    const monthlyTrendData = Object.entries(monthlyTrend)
      .map(([month, count]) => ({ month, count }))
      .slice(-12);

    return NextResponse.json({
      summary: {
        total,
        avgFood: avg("foodRating"),
        avgService: avg("serviceRating"),
        avgCleanliness: avg("cleanlinessRating"),
        avgOverall: avg("overallRating"),
        recommendPercent,
      },
      feedback,
      branchStats,
      monthlyTrend: monthlyTrendData,
    });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to fetch stats";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
