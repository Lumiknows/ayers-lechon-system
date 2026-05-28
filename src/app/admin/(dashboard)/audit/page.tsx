import { DeletionLogTable } from "@/components/admin/DeletionLogTable";

export const metadata = {
  title: "Deletion Audit Log",
};

export default function AuditPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">
          Deletion Audit Log
        </h1>
        <p className="mt-1 text-charcoal-light">
          Every feedback deletion is recorded with the admin account, IP address,
          and a snapshot of the removed entry.
        </p>
      </div>
      <DeletionLogTable />
    </div>
  );
}
