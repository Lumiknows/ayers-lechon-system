-- Run once in Supabase: SQL Editor → New query → paste → Run
-- Required for admin feedback delete + audit log feature

CREATE TABLE IF NOT EXISTS "FeedbackDeletionLog" (
  "id" TEXT NOT NULL,
  "feedbackId" TEXT NOT NULL,
  "adminId" TEXT NOT NULL,
  "adminEmail" TEXT NOT NULL,
  "adminName" TEXT NOT NULL,
  "ipAddress" TEXT NOT NULL,
  "userAgent" TEXT,
  "feedbackSnapshot" JSONB NOT NULL,
  "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FeedbackDeletionLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "FeedbackDeletionLog_deletedAt_idx"
  ON "FeedbackDeletionLog"("deletedAt");
CREATE INDEX IF NOT EXISTS "FeedbackDeletionLog_adminId_idx"
  ON "FeedbackDeletionLog"("adminId");
CREATE INDEX IF NOT EXISTS "FeedbackDeletionLog_feedbackId_idx"
  ON "FeedbackDeletionLog"("feedbackId");
