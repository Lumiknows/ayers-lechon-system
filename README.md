# Cubu's Ayer Lechon Website

A modern, mobile-first website for **Cubu's Ayer Lechon** — authentic Cebu lechon with menu, store locations, customer feedback (QR survey), and admin dashboard.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + **SQLite** (easily migratable to PostgreSQL/Supabase)
- **Recharts** for admin analytics
- **QRCode** for feedback QR generation
- **JWT** auth for admin panel

## Getting Started

```bash
# Install dependencies
npm install

# Set up database (migrate + seed sample data)
npm run db:setup

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@ayerlechon.com`
- Password: `admin123`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, featured products, testimonials |
| `/menu` | Full menu with category filters |
| `/locations` | Cebu City branch locations with maps |
| `/feedback` | Mobile-friendly customer survey (QR target) |
| `/feedback/thank-you` | Post-submission thank you page |
| `/contact` | Contact information and order CTAs |
| `/admin` | Manager dashboard with analytics |
| `/admin/menu` | Menu item management |
| `/admin/stores` | Branch management |
| `/admin/qr` | QR code generator (branch-specific) |

## Environment Variables

Copy `.env` and configure:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-secret-here"
```

## Production Notes

- Change admin password after first login
- Set a strong `JWT_SECRET`
- Migrate SQLite to PostgreSQL/Supabase for production
- Update Facebook URL in `src/lib/constants.ts`
- Replace placeholder Unsplash images with brand photos
