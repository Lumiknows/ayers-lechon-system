import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, getCategoryLabel } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string | null;
  imageUrl: string;
  isAvailable: boolean;
}

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Card
      hover
      className="group h-full overflow-hidden transition-shadow duration-500 hover:shadow-xl hover:ring-dark-khaki-200/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dry-sage-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-charcoal">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <CardContent>
        <Badge variant="gold" className="mb-3">
          {getCategoryLabel(item.category)}
        </Badge>
        <h3 className="font-display text-xl font-semibold text-charcoal transition-colors group-hover:text-dry-sage-800">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
          {item.description}
        </p>
        {item.sizes && (
          <p className="mt-2 rounded-lg bg-pearl-beige-100 px-3 py-2 text-xs font-medium text-dry-sage-700">
            {item.sizes}
          </p>
        )}
        <p className="mt-4 text-2xl font-bold text-dark-khaki-700">
          {formatPrice(item.price)}
        </p>
      </CardContent>
    </Card>
  );
}
