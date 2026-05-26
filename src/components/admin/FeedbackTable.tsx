import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDate, getOrderTypeLabel } from "@/lib/utils";

interface FeedbackItem {
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

export function FeedbackTable({ feedback }: { feedback: FeedbackItem[] }) {
  if (feedback.length === 0) {
    return (
      <Card className="p-8 text-center text-charcoal-light">
        No feedback found for the selected filters.
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/5 bg-cream/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-charcoal">Date</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Branch</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Order</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Ratings</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Comment</th>
              <th className="px-4 py-3 font-semibold text-charcoal">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {feedback.map((item) => (
              <tr key={item.id} className="hover:bg-cream/30">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
