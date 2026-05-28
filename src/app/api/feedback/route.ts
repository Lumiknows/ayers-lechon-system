import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { feedbackSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { sendFeedbackNotification } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    await requireSession();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
    const skip = (page - 1) * limit;

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        include: { branch: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.feedback.count(),
    ]);

    return NextResponse.json({
      data: feedback,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to fetch feedback";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, "feedback", 3, "24h");
    if (rateLimitResult) return rateLimitResult;

    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const branch = await prisma.store.findUnique({ where: { id: data.branchId } });
    if (!branch) {
      return NextResponse.json({ error: "Invalid branch ID" }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        branchId: data.branchId,
        orderType: data.orderType,
        foodRating: data.foodRating,
        serviceRating: data.serviceRating,
        cleanlinessRating: data.cleanlinessRating,
        overallRating: data.overallRating,
        orderDetails: data.orderDetails || null,
        comments: data.comments || null,
        wouldRecommend: data.wouldRecommend,
        customerName: data.customerName || null,
        customerPhone: data.customerPhone || null,
        customerEmail: data.customerEmail || null,
      },
    });

    sendFeedbackNotification({
      branchName: branch.name,
      orderType: data.orderType,
      overallRating: data.overallRating,
      foodRating: data.foodRating,
      serviceRating: data.serviceRating,
      cleanlinessRating: data.cleanlinessRating,
      comments: data.comments,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      wouldRecommend: data.wouldRecommend,
    }).catch(() => {});

    return NextResponse.json(feedback, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
