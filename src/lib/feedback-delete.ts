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

  await prisma.$transaction([
    prisma.feedbackDeletionLog.createMany({
      data: feedbackRows.map((row) => ({
        feedbackId: row.id,
        adminId: session.adminId,
        adminEmail: session.email,
        adminName: session.name,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
        feedbackSnapshot: buildFeedbackSnapshot(row),
      })),
    }),
    prisma.feedback.deleteMany({
      where: { id: { in: feedbackRows.map((r) => r.id) } },
    }),
  ]);

  return { deletedCount: feedbackRows.length };
}
