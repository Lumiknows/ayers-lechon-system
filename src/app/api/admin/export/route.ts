import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { formatDate, getOrderTypeLabel } from "@/lib/utils";

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
      include: { branch: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Date",
      "Branch",
      "Order Type",
      "Food Rating",
      "Service Rating",
      "Cleanliness Rating",
      "Overall Rating",
      "Would Recommend",
      "Order Details",
      "Comments",
      "Customer Name",
      "Phone",
      "Email",
    ];

    const rows = feedback.map((f) => [
      formatDate(f.createdAt),
      f.branch.name,
      getOrderTypeLabel(f.orderType),
      f.foodRating,
      f.serviceRating,
      f.cleanlinessRating,
      f.overallRating,
      f.wouldRecommend ? "Yes" : "No",
      `"${(f.orderDetails ?? "").replace(/"/g, '""')}"`,
      `"${(f.comments ?? "").replace(/"/g, '""')}"`,
      f.customerName ?? "",
      f.customerPhone ?? "",
      f.customerEmail ?? "",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="feedback-export-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to export data";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
