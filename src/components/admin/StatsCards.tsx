import {
  MessageSquare,
  Star,
  ThumbsUp,
  Utensils,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPercent } from "@/lib/utils";

interface StatsSummary {
  total: number;
  avgFood: number;
  avgService: number;
  avgCleanliness: number;
  avgOverall: number;
  recommendPercent: number;
}

export function StatsCards({ summary }: { summary: StatsSummary }) {
  const cards = [
    {
      label: "Total Feedback",
      value: summary.total.toString(),
      icon: MessageSquare,
      color: "text-dry-sage-800 bg-dry-sage-100",
    },
    {
      label: "Avg Food Rating",
      value: summary.avgFood.toFixed(1),
      icon: Utensils,
      color: "text-dark-khaki-700 bg-dark-khaki-100",
    },
    {
      label: "Avg Service Rating",
      value: summary.avgService.toFixed(1),
      icon: Star,
      color: "text-dry-sage-800 bg-dry-sage-100",
    },
    {
      label: "Avg Store Rating",
      value: summary.avgCleanliness.toFixed(1),
      icon: Star,
      color: "text-dark-khaki-700 bg-dark-khaki-100",
    },
    {
      label: "Avg Overall Rating",
      value: summary.avgOverall.toFixed(1),
      icon: Star,
      color: "text-dry-sage-800 bg-dry-sage-100",
    },
    {
      label: "Would Recommend",
      value: formatPercent(summary.recommendPercent),
      icon: ThumbsUp,
      color: "text-green-700 bg-green-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center gap-4">
            <div className={`rounded-xl p-3 ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-charcoal-light">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-charcoal">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
