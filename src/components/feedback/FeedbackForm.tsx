"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ORDER_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from "lucide-react";

interface Store {
  id: string;
  name: string;
}

function FeedbackFormInner({ stores }: { stores: Store[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedBranch = searchParams.get("branch") ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    branchId: preselectedBranch,
    orderType: "DINE_IN",
    foodRating: 0,
    serviceRating: 0,
    cleanlinessRating: 0,
    overallRating: 0,
    orderDetails: "",
    comments: "",
    wouldRecommend: null as boolean | null,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });

  const storeOptions = [
    { value: "", label: "Select branch visited" },
    ...stores.map((s) => ({ value: s.id, label: s.name })),
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.branchId) {
      setError("Please select the branch you visited.");
      return;
    }
    if (
      !form.foodRating ||
      !form.serviceRating ||
      !form.cleanlinessRating ||
      !form.overallRating
    ) {
      setError("Please rate all categories before submitting.");
      return;
    }
    if (form.wouldRecommend === null) {
      setError("Please let us know if you would recommend us.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit feedback");
      }

      router.push("/feedback/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-logo-red-200 bg-logo-red-50 px-4 py-3 text-sm text-logo-red-700">
          {error}
        </div>
      )}

      <Select
        label="Branch Visited *"
        options={storeOptions}
        value={form.branchId}
        onChange={(e) => setForm({ ...form, branchId: e.target.value })}
        required
      />

      <div className="space-y-2">
        <p className="font-subtitle text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          Order Type *
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ORDER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setForm({ ...form, orderType: t.id })}
              className={cn(
                "rounded-xl border-2 px-3 py-2.5 font-subtitle text-xs font-semibold uppercase tracking-wide transition-all",
                form.orderType === t.id
                  ? "border-logo-red-600 bg-logo-red-600 text-white"
                  : "border-charcoal/10 bg-white text-charcoal-light hover:border-logo-red-300 hover:text-charcoal"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-cream/50 ring-charcoal/5">
        <CardContent className="space-y-5">
          <p className="font-subtitle text-xs font-semibold uppercase tracking-wider text-logo-red-600">
            Rate Your Experience *
          </p>
          <StarRating
            label="Food Quality"
            value={form.foodRating}
            onChange={(v) => setForm({ ...form, foodRating: v })}
          />
          <StarRating
            label="Service"
            value={form.serviceRating}
            onChange={(v) => setForm({ ...form, serviceRating: v })}
          />
          <StarRating
            label="Cleanliness / Store"
            value={form.cleanlinessRating}
            onChange={(v) => setForm({ ...form, cleanlinessRating: v })}
          />
          <StarRating
            label="Overall Experience"
            value={form.overallRating}
            onChange={(v) => setForm({ ...form, overallRating: v })}
          />
        </CardContent>
      </Card>

      <Textarea
        label="What did you order?"
        placeholder="e.g. Lechon Belly Full Tray, Rice Meals..."
        value={form.orderDetails}
        onChange={(e) => setForm({ ...form, orderDetails: e.target.value })}
      />

      <Textarea
        label="Comments / Suggestions"
        placeholder="Tell us how we can improve..."
        value={form.comments}
        onChange={(e) => setForm({ ...form, comments: e.target.value })}
      />

      <div className="space-y-2">
        <p className="font-subtitle text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          Would you recommend us? *
        </p>
        <div className="flex gap-3">
          {([true, false] as const).map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => setForm({ ...form, wouldRecommend: val })}
              className={cn(
                "flex-1 rounded-xl border-2 py-3 font-subtitle text-sm font-semibold uppercase tracking-wider transition-all",
                form.wouldRecommend === val
                  ? val
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-logo-red-600 bg-logo-red-600 text-white"
                  : "border-charcoal/10 bg-white text-charcoal-light hover:border-charcoal/20"
              )}
            >
              {val ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-cream p-5 ring-1 ring-pearl-beige-200">
        <p className="font-subtitle text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          Optional Contact Info
        </p>
        <div className="mt-4 space-y-4">
          <Input
            label="Name"
            placeholder="Your name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+63 9XX XXX XXXX"
            value={form.customerPhone}
            onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={form.customerEmail}
            onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full gap-2" size="lg" variant="secondary" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Feedback
          </>
        )}
      </Button>
    </form>
  );
}

export function FeedbackForm({ stores }: { stores: Store[] }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-dark-khaki-500" />
        </div>
      }
    >
      <FeedbackFormInner stores={stores} />
    </Suspense>
  );
}
