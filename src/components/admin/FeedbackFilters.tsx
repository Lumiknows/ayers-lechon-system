"use client";

import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ORDER_TYPES } from "@/lib/constants";

interface FeedbackFiltersProps {
  branches: { id: string; name: string }[];
  filters: {
    branchId: string;
    orderType: string;
    minRating: string;
    startDate: string;
    endDate: string;
  };
  onChange: (filters: FeedbackFiltersProps["filters"]) => void;
  onExport: () => void;
}

export function FeedbackFilters({
  branches,
  filters,
  onChange,
  onExport,
}: FeedbackFiltersProps) {
  const branchOptions = [
    { value: "ALL", label: "All Branches" },
    ...branches.map((b) => ({ value: b.id, label: b.name })),
  ];

  const orderOptions = [
    { value: "ALL", label: "All Order Types" },
    ...ORDER_TYPES.map((t) => ({ value: t.id, label: t.label })),
  ];

  const ratingOptions = [
    { value: "ALL", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
  ];

  return (
    <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-5">
      <Select
        label="Branch"
        options={branchOptions}
        value={filters.branchId}
        onChange={(e) => onChange({ ...filters, branchId: e.target.value })}
      />
      <Select
        label="Order Type"
        options={orderOptions}
        value={filters.orderType}
        onChange={(e) => onChange({ ...filters, orderType: e.target.value })}
      />
      <Select
        label="Min Rating"
        options={ratingOptions}
        value={filters.minRating}
        onChange={(e) => onChange({ ...filters, minRating: e.target.value })}
      />
      <Input
        label="Start Date"
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
      />
      <Input
        label="End Date"
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
      />
      <div className="sm:col-span-2 lg:col-span-5">
        <Button type="button" variant="outline" onClick={onExport}>
          Export to CSV
        </Button>
      </div>
    </div>
  );
}
