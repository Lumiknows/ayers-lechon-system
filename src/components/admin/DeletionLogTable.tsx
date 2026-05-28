"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

interface DeletionLog {
  id: string;
  feedbackId: string;
  adminId: string;
  adminEmail: string;
  adminName: string;
  ipAddress: string;
  userAgent: string | null;
  feedbackSnapshot: {
    branchName?: string;
    overallRating?: number;
    customerName?: string | null;
    createdAt?: string;
  };
  deletedAt: string;
}

export function DeletionLogTable() {
  const [logs, setLogs] = useState<DeletionLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/feedback/deletions?limit=100");
    if (res.ok) {
      const json = await res.json();
      setLogs(json.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (loading) {
    return (
      <Card className="p-8 text-center text-charcoal-light">Loading audit log…</Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card className="p-8 text-center text-charcoal-light">
        No feedback deletions recorded yet.
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/5 bg-cream/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-charcoal">Deleted at</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Admin</th>
              <th className="px-4 py-3 font-semibold text-charcoal">IP address</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Feedback ID</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Snapshot</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-cream/30">
                <td className="px-4 py-3 whitespace-nowrap text-charcoal-light">
                  {formatDate(log.deletedAt)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal">{log.adminName}</p>
                  <p className="text-xs text-charcoal-light">{log.adminEmail}</p>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal-light">
                  {log.ipAddress}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal-light max-w-[120px] truncate">
                  {log.feedbackId}
                </td>
                <td className="px-4 py-3 text-charcoal-light">
                  <p>{log.feedbackSnapshot.branchName ?? "—"}</p>
                  <p className="text-xs">
                    {log.feedbackSnapshot.overallRating != null &&
                      `${log.feedbackSnapshot.overallRating}/5`}
                    {log.feedbackSnapshot.customerName &&
                      ` · ${log.feedbackSnapshot.customerName}`}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
