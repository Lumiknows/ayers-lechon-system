"use client";

import { useCallback, useEffect, useState } from "react";
import { StatsCards } from "@/components/admin/StatsCards";
import { FeedbackFilters } from "@/components/admin/FeedbackFilters";
import { FeedbackCharts } from "@/components/admin/FeedbackCharts";
import { FeedbackTable } from "@/components/admin/FeedbackTable";

interface DashboardData {
  summary: {
    total: number;
    avgFood: number;
    avgService: number;
    avgCleanliness: number;
    avgOverall: number;
    recommendPercent: number;
  };
  feedback: Array<{
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
  }>;
  branchStats: Array<{
    branchId: string;
    branchName: string;
    count: number;
    avgOverall: number;
  }>;
  monthlyTrend: Array<{ month: string; count: number }>;
}

interface Branch {
  id: string;
  name: string;
}

export function AdminDashboard({ branches }: { branches: Branch[] }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    branchId: "ALL",
    orderType: "ALL",
    minRating: "ALL",
    startDate: "",
    endDate: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const res = await fetch(`/api/admin/stats?${params}`);
    if (res.ok) {
      setData(await res.json());
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleExport() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.open(`/api/admin/export?${params}`, "_blank");
  }

  if (loading && !data) {
    return <div className="py-12 text-center text-charcoal-light">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="py-12 text-center text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="mt-1 text-charcoal-light">
          Customer feedback overview and analytics
        </p>
      </div>

      <StatsCards summary={data.summary} />

      <FeedbackFilters
        branches={branches}
        filters={filters}
        onChange={setFilters}
        onExport={handleExport}
      />

      <FeedbackCharts
        branchStats={data.branchStats}
        monthlyTrend={data.monthlyTrend}
      />

      <div>
        <h2 className="mb-4 font-display text-xl font-semibold text-charcoal">
          Recent Feedback
        </h2>
        <FeedbackTable feedback={data.feedback} />
      </div>
    </div>
  );
}
