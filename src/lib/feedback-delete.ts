import type { AdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

type FeedbackWithBranch = Awaited<
  ReturnType<
    typeof prisma.feedback.findMany<{
      include: { branch: { select: { name: true } } };
    }>
  >
>[number];

export function buildFeedbackSnapshot(feedback: FeedbackWithBranch) {
  return {
    branchId: feedback.branchId,
    branchName: feedback.branch.name,
    orderType: feedback.orderType,
    foodRating: feedback.foodRating,
    serviceRating: feedback.serviceRating,
    cleanlinessRating: feedback.cleanlinessRating,
    overallRating: feedback.overallRating,
    orderDetails: feedback.orderDetails,
    comments: feedback.comments,
    wouldRecommend: feedback.wouldRecommend,
    customerName: feedback.customerName,
    customerPhone: feedback.customerPhone,
    customerEmail: feedback.customerEmail,
    createdAt: feedback.createdAt.toISOString(),
  };
}

export function verifyDeleteConfirmation(
  session: AdminSession,
  confirmEmail: string
): string | null {
  if (confirmEmail.trim().toLowerCase() !== session.email.toLowerCase()) {
    return "Email does not match your logged-in admin account.";
  }
  return null;
}

export async function deleteFeedbackWithAudit(
  feedbackIds: string[],
  session: AdminSession,
  meta: { ipAddress: string; userAgent: string | null }
): Promise<{ deletedCount: number }> {
  const uniqueIds = [...new Set(feedbackIds)];

  const feedbackRows = await prisma.feedback.findMany({
    where: { id: { in: uniqueIds } },
    include: { branch: { select: { name: true } } },
  });

  if (feedbackRows.length === 0) {
    return { deletedCount: 0 };
  }

  // Sequential writes (not $transaction) — Supabase pooler :6543 often rejects transactions.
  await prisma.feedbackDeletionLog.createMany({
    data: feedbackRows.map((row) => ({
      feedbackId: row.id,
      adminId: session.adminId,
      adminEmail: session.email,
      adminName: session.name,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      feedbackSnapshot: buildFeedbackSnapshot(row),
    })),
  });

  await prisma.feedback.deleteMany({
    where: { id: { in: feedbackRows.map((r) => r.id) } },
  });

  return { deletedCount: feedbackRows.length };
}

export function getDeleteErrorResponse(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof Error && error.message === "Unauthorized") {
    return { message: "Unauthorized", status: 401 };
  }

  const text =
    error instanceof Error
      ? `${error.message} ${(error as { code?: string }).code ?? ""}`
      : String(error);

  if (
    text.includes("FeedbackDeletionLog") &&
    (text.includes("does not exist") ||
      text.includes("P2021") ||
      text.includes("42P01"))
  ) {
    return {
      message:
        "Deletion log table is missing in the database. Run the FeedbackDeletionLog migration in Supabase (see README or SQL in project docs).",
      status: 503,
    };
  }

  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return { message: error.message, status: 500 };
  }

  return { message: "Failed to delete feedback", status: 500 };
}
