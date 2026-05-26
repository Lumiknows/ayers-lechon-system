"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { BRAND_COLORS } from "@/lib/colors";

interface BranchStat {
  branchName: string;
  count: number;
  avgOverall: number;
}

interface MonthlyTrend {
  month: string;
  count: number;
}

export function FeedbackCharts({
  branchStats,
  monthlyTrend,
}: {
  branchStats: BranchStat[];
  monthlyTrend: MonthlyTrend[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Average Rating per Branch
          </h3>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchStats}>
                <CartesianGrid strokeDasharray="3 3" stroke={BRAND_COLORS.cream} />
                <XAxis
                  dataKey="branchName"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => v.replace("Cebu's Ayers Lechon - ", "")}
                />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="avgOverall" fill={BRAND_COLORS.primary} radius={[6, 6, 0, 0]} name="Avg Rating" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Feedback Count per Branch
          </h3>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchStats}>
                <CartesianGrid strokeDasharray="3 3" stroke={BRAND_COLORS.cream} />
                <XAxis
                  dataKey="branchName"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => v.replace("Cebu's Ayers Lechon - ", "")}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill={BRAND_COLORS.gold} radius={[6, 6, 0, 0]} name="Feedback Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Monthly Feedback Trends
          </h3>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={BRAND_COLORS.cream} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={BRAND_COLORS.primary}
                  strokeWidth={2}
                  dot={{ fill: BRAND_COLORS.gold, r: 4 }}
                  name="Feedback Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
