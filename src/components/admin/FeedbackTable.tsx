"use client";

import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  DeleteFeedbackModal,
  type FeedbackDeleteTarget,
} from "@/components/admin/DeleteFeedbackModal";
import { formatDate, getOrderTypeLabel } from "@/lib/utils";

export interface FeedbackItem {
  id: string;
  createdAt: string;
  orderType: string;
  foodRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  overallRating: number;
  comments: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  wouldRecommend: boolean;
  branch: { name: string };
}

function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < value ? "fill-gold text-gold" : "text-charcoal/15"
          }`}
        />
      ))}
    </div>
  );
}

interface FeedbackTableProps {
  feedback: FeedbackItem[];
  adminEmail: string;
  onDeleted: () => void;
}

export function FeedbackTable({
  feedback,
  adminEmail,
  onDeleted,
}: FeedbackTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTargets, setDeleteTargets] = useState<FeedbackDeleteTarget[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === feedback.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(feedback.map((f) => f.id)));
    }
  }

  function openDeleteModal(targets: FeedbackDeleteTarget[]) {
    setDeleteTargets(targets);
    setModalOpen(true);
  }

  function handleDeleteOne(item: FeedbackItem) {
    openDeleteModal([
      {
        id: item.id,
        createdAt: item.createdAt,
        orderType: item.orderType,
        overallRating: item.overallRating,
        comments: item.comments,
        customerName: item.customerName,
        branch: item.branch,
      },
    ]);
  }

  function handleDeleteSelected() {
    const targets = feedback
      .filter((f) => selected.has(f.id))
      .map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        orderType: item.orderType,
        overallRating: item.overallRating,
        comments: item.comments,
        customerName: item.customerName,
        branch: item.branch,
      }));
    openDeleteModal(targets);
  }

  function handleDeleted() {
    setSelected(new Set());
    onDeleted();
  }

  if (feedback.length === 0) {
    return (
      <Card className="p-8 text-center text-charcoal-light">
        No feedback found for the selected filters.
      </Card>
    );
  }

  return (
    <>
      {selected.size > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-logo-red-50 px-4 py-3">
          <span className="text-sm font-medium text-charcoal">
            {selected.size} selected
          </span>
          <Button
            type="button"
            size="sm"
            variant="primary"
            className="bg-logo-red-600 hover:bg-logo-red-700"
            onClick={handleDeleteSelected}
          >
            <Trash2 className="h-4 w-4" />
            Delete selected
          </Button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-sm text-charcoal-light hover:text-charcoal"
          >
            Clear selection
          </button>
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal/5 bg-cream/50">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      feedback.length > 0 && selected.size === feedback.length
                    }
                    onChange={toggleSelectAll}
                    aria-label="Select all feedback"
                    className="h-4 w-4 rounded border-charcoal/20"
                  />
                </th>
                <th className="px-4 py-3 font-semibold text-charcoal">Date</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Branch</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Order</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Ratings</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Comment</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Contact</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {feedback.map((item) => (
                <tr key={item.id} className="hover:bg-cream/30">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      aria-label={`Select feedback from ${item.branch.name}`}
                      className="h-4 w-4 rounded border-charcoal/20"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-charcoal-light">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-3 max-w-[160px]">
                    <span className="line-clamp-2">{item.branch.name}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getOrderTypeLabel(item.orderType)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-charcoal-light w-8">Food</span>
                        <RatingStars value={item.foodRating} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-charcoal-light w-8">Svc</span>
                        <RatingStars value={item.serviceRating} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-charcoal-light w-8">All</span>
                        <RatingStars value={item.overallRating} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="line-clamp-2 text-charcoal-light">
                      {item.comments ?? "—"}
                    </p>
                    <span
                      className={`mt-1 inline-block text-xs font-medium ${
                        item.wouldRecommend ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.wouldRecommend ? "Would recommend" : "Would not recommend"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-charcoal-light">
                    {item.customerName && <p>{item.customerName}</p>}
                    {item.customerPhone && <p className="text-xs">{item.customerPhone}</p>}
                    {item.customerEmail && <p className="text-xs">{item.customerEmail}</p>}
                    {!item.customerName && !item.customerPhone && !item.customerEmail && "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteOne(item)}
                      className="rounded-lg p-2 text-charcoal-light transition-colors hover:bg-logo-red-50 hover:text-logo-red-600"
                      aria-label="Delete feedback"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DeleteFeedbackModal
        open={modalOpen}
        targets={deleteTargets}
        adminEmail={adminEmail}
        onClose={() => setModalOpen(false)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
