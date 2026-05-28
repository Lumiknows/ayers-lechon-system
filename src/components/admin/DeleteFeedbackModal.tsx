"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate, getOrderTypeLabel } from "@/lib/utils";

export interface FeedbackDeleteTarget {
  id: string;
  createdAt: string;
  orderType: string;
  overallRating: number;
  comments: string | null;
  customerName: string | null;
  branch: { name: string };
}

interface DeleteFeedbackModalProps {
  open: boolean;
  targets: FeedbackDeleteTarget[];
  adminEmail: string;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteFeedbackModal({
  open,
  targets,
  adminEmail,
  onClose,
  onDeleted,
}: DeleteFeedbackModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const count = targets.length;
  const isBulk = count > 1;

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setConfirmText("");
    setConfirmEmail("");
    setError("");
    setLoading(false);
  }, [open, targets]);

  if (!open || count === 0) return null;

  const canSubmit =
    confirmText === "DELETE" &&
    confirmEmail.trim().toLowerCase() === adminEmail.toLowerCase();

  async function handleDelete() {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const payload = { confirmText: "DELETE" as const, confirmEmail: confirmEmail.trim() };

      const res = isBulk
        ? await fetch("/api/admin/feedback/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              ids: targets.map((t) => t.id),
            }),
          })
        : await fetch(`/api/admin/feedback/${targets[0].id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to delete feedback");
        return;
      }

      onDeleted();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal/60"
        onClick={loading ? undefined : onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-feedback-title"
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-charcoal/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-logo-red-50">
              <AlertTriangle className="h-5 w-5 text-logo-red-600" />
            </div>
            <div>
              <h2
                id="delete-feedback-title"
                className="font-display text-lg font-semibold text-charcoal"
              >
                {step === 1 ? "Delete feedback?" : "Confirm deletion"}
              </h2>
              <p className="text-sm text-charcoal-light">
                Step {step} of 2 — {isBulk ? `${count} entries` : "1 entry"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1 text-charcoal-light hover:bg-cream hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
          {step === 1 ? (
            <>
              <p className="text-sm text-charcoal-light">
                This permanently removes the selected feedback from your dashboard and
                database. A deletion record (admin, IP, snapshot) is saved for audit.
              </p>
              <ul className="mt-4 space-y-2 rounded-xl bg-cream/80 p-4 text-sm">
                {targets.slice(0, 5).map((t) => (
                  <li key={t.id} className="border-b border-charcoal/5 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium text-charcoal">
                      {t.branch.name}
                    </span>
                    <span className="text-charcoal-light">
                      {" "}
                      · {formatDate(t.createdAt)} · {getOrderTypeLabel(t.orderType)} ·{" "}
                      {t.overallRating}/5
                    </span>
                    {t.customerName && (
                      <p className="text-xs text-charcoal-light">{t.customerName}</p>
                    )}
                  </li>
                ))}
                {count > 5 && (
                  <li className="text-xs text-charcoal-light">
                    …and {count - 5} more
                  </li>
                )}
              </ul>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm text-charcoal-light">
                Type <strong className="text-charcoal">DELETE</strong> and your admin email{" "}
                <strong className="text-charcoal">{adminEmail}</strong> to confirm.
              </p>
              <div className="space-y-4">
                <Input
                  label='Type "DELETE"'
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                  autoComplete="off"
                />
                <Input
                  label="Your admin email"
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder={adminEmail}
                  autoComplete="off"
                />
              </div>
              {error && (
                <p className="mt-3 text-sm text-logo-red-600">{error}</p>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-charcoal/10 px-6 py-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          {step === 1 ? (
            <Button
              type="button"
              variant="primary"
              className="bg-logo-red-600 hover:bg-logo-red-700"
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              className="bg-logo-red-600 hover:bg-logo-red-700"
              onClick={handleDelete}
              disabled={!canSubmit || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                `Delete ${isBulk ? `${count} entries` : "feedback"}`
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
