"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { BRAND_COLORS } from "@/lib/colors";

interface Store {
  id: string;
  name: string;
}

export function QRGenerator({ stores }: { stores: Store[] }) {
  const [branchId, setBranchId] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [feedbackUrl, setFeedbackUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const branchOptions = [
    { value: "", label: "General (All Branches)" },
    ...stores.map((s) => ({ value: s.id, label: s.name })),
  ];

  async function generateQR() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branchId: branchId || null }),
      });
      if (res.ok) {
        const data = await res.json();
        setQrDataUrl(data.dataUrl);
        setFeedbackUrl(data.url);
      }
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    const params = branchId ? `?branchId=${branchId}` : "";
    window.open(`/api/admin/qr${params}`, "_blank");
  }

  function printQR() {
    if (!qrDataUrl) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const branchName =
      stores.find((s) => s.id === branchId)?.name ?? "Cubu's Ayer Lechon";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Feedback QR - ${branchName}</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 40px; }
            img { width: 300px; height: 300px; }
            h1 { font-size: 24px; margin-bottom: 8px; color: ${BRAND_COLORS.primary}; }
            p { color: #666; margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1>${branchName}</h1>
          <p>Scan to share your feedback</p>
          <img src="${qrDataUrl}" alt="Feedback QR Code" />
          <p style="font-size: 12px; margin-top: 16px;">${feedbackUrl}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-charcoal">
          Feedback QR Codes
        </h2>
        <p className="mt-2 text-sm text-charcoal-light">
          Generate QR codes for tables and counters. Branch-specific codes
          automatically pre-select the branch on the feedback form.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <Select
            label="Select Branch"
            options={branchOptions}
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
          />

          <Button onClick={generateQR} disabled={loading}>
            {loading ? "Generating..." : "Generate QR Code"}
          </Button>

          {qrDataUrl && (
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-cream p-8">
              <div className="rounded-2xl bg-white p-4 shadow-md">
                <Image
                  src={qrDataUrl}
                  alt="Feedback QR Code"
                  width={300}
                  height={300}
                  unoptimized
                />
              </div>
              <p className="text-sm text-charcoal-light break-all text-center max-w-md">
                {feedbackUrl}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={downloadQR} variant="primary">
                  <Download className="h-4 w-4" />
                  Download PNG
                </Button>
                <Button onClick={printQR} variant="outline">
                  <Printer className="h-4 w-4" />
                  Print QR Code
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
