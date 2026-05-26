import { Clock, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
  mapLink: string;
  city: string;
}

export function StoreCard({ store }: { store: Store }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/1] w-full sm:aspect-video">
        <iframe
          src={store.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${store.name}`}
          className="h-full w-full"
        />
      </div>
      <CardContent className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold sm:text-xs">
          {store.city}
        </p>
        <h3 className="mt-0.5 font-display text-base font-semibold text-charcoal sm:mt-1 sm:text-xl">
          {store.name}
        </h3>

        <ul className="mt-3 space-y-2 text-xs text-charcoal-light sm:mt-4 sm:space-y-3 sm:text-sm">
          <li className="flex gap-2 sm:gap-3">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brown sm:h-4 sm:w-4" />
            {store.address}
          </li>
          <li className="flex gap-2 sm:gap-3">
            <Phone className="h-3.5 w-3.5 shrink-0 text-brown sm:h-4 sm:w-4" />
            <a href={`tel:${store.phone}`} className="hover:text-brown transition-colors">
              {store.phone}
            </a>
          </li>
          <li className="flex gap-2 sm:gap-3">
            <Clock className="h-3.5 w-3.5 shrink-0 text-brown sm:h-4 sm:w-4" />
            {store.hours}
          </li>
        </ul>

        <div className="mt-4 sm:mt-6">
          <a
            href={store.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-lg bg-brown px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brown-dark hover:shadow-lg sm:rounded-xl sm:px-6 sm:py-3"
          >
            Get Directions
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
