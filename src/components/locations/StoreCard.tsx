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
      <div className="aspect-video w-full">
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
      <CardContent>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          {store.city}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-charcoal">
          {store.name}
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-charcoal-light">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
            {store.address}
          </li>
          <li className="flex gap-3">
            <Phone className="h-4 w-4 shrink-0 text-brown" />
            <a href={`tel:${store.phone}`} className="hover:text-brown transition-colors">
              {store.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <Clock className="h-4 w-4 shrink-0 text-brown" />
            {store.hours}
          </li>
        </ul>

        <div className="mt-6">
          <a
            href={store.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brown px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-brown-dark hover:shadow-lg"
          >
            Get Directions
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
