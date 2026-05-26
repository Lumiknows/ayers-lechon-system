import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const feedback = await prisma.feedback.findMany({
    include: { branch: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(feedback);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      branchId,
      orderType,
      foodRating,
      serviceRating,
      cleanlinessRating,
      overallRating,
      orderDetails,
      comments,
      wouldRecommend,
      customerName,
      customerPhone,
      customerEmail,
    } = body;

    if (!branchId || wouldRecommend === null || wouldRecommend === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        branchId,
        orderType,
        foodRating: Number(foodRating),
        serviceRating: Number(serviceRating),
        cleanlinessRating: Number(cleanlinessRating),
        overallRating: Number(overallRating),
        orderDetails: orderDetails || null,
        comments: comments || null,
        wouldRecommend: Boolean(wouldRecommend),
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        customerEmail: customerEmail || null,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
