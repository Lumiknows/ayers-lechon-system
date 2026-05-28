import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import {
  deleteFeedbackWithAudit,
  verifyDeleteConfirmation,
} from "@/lib/feedback-delete";
import { getRequestIp, getUserAgent } from "@/lib/request-meta";
import { feedbackDeleteConfirmSchema } from "@/lib/validations";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSession();
    const { id } = await params;

    const body = await request.json();
    const parsed = feedbackDeleteConfirmSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid confirmation", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const emailError = verifyDeleteConfirmation(
      session,
      parsed.data.confirmEmail
    );
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400 });
    }

    const { deletedCount } = await deleteFeedbackWithAudit([id], session, {
      ipAddress: getRequestIp(request),
      userAgent: getUserAgent(request),
    });

    if (deletedCount === 0) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedCount });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Unauthorized"
        ? "Unauthorized"
        : "Failed to delete feedback";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
