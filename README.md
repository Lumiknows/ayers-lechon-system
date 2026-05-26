# Cebu's Ayers Lechon

A full-stack restaurant website for Cebu's Ayers Lechon, built with Next.js 16 (App Router) and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Database**: PostgreSQL via Supabase + Prisma 7
- **Auth**: JWT (jose) with HTTP-only cookies
- **Image Uploads**: Cloudinary
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Cloudinary](https://cloudinary.com) account (free tier works)
- (Optional) [Upstash Redis](https://upstash.com) for rate limiting
- (Optional) [Resend](https://resend.com) for email notifications

### 1. Supabase Setup

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Settings > Database**
3. Copy the **Connection string** (URI format) — use the "Transaction" pooler mode (port 6543) for serverless
4. Replace `[YOUR-PASSWORD]` with your database password
5. Your URL will look like:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in all values in `.env`. See `.env.example` for documentation on each variable.

### 3. Install Dependencies

```bash
npm install
```

### 4. Push Schema & Seed Database

```bash
npm run db:setup
```

This creates all tables and seeds the default admin user plus sample data.

**Default admin credentials:**
- Email: `admin@ayerlechon.com`
- Password: `admin123`

> Change these immediately in production by updating the seed or adding a password-change endpoint.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/menu` | List available menu items |
| GET | `/api/menu/[id]` | Get single menu item |
| GET | `/api/stores` | List active stores |
| GET | `/api/feedback?page=1&limit=20` | Paginated feedback list |
| POST | `/api/feedback` | Submit customer feedback (rate limited) |
| GET | `/api/health` | Health check with DB status |

### Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login (rate limited) |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET | `/api/auth/me` | Current admin session |

### Admin (requires auth)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/menu` | All menu items (incl. unavailable) |
| GET | `/api/admin/stores` | All stores (incl. inactive) |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/export` | CSV export of feedback |
| GET/POST | `/api/admin/qr` | Generate QR codes |
| POST | `/api/admin/upload` | Upload image to Cloudinary |
| POST | `/api/menu` | Create menu item |
| PUT | `/api/menu/[id]` | Update menu item |
| DELETE | `/api/menu/[id]` | Delete menu item |
| POST | `/api/stores` | Create store |
| PUT | `/api/stores/[id]` | Update store |
| DELETE | `/api/stores/[id]` | Delete store |

## Security Features

- **Rate Limiting**: Auth (5/min), feedback submissions (3/min) via Upstash Redis
- **Input Validation**: All POST/PUT bodies validated with Zod schemas
- **CORS**: Configurable allowed origins with preflight support
- **Origin Validation**: State-changing requests verified against allowed origins
- **HTTP-only Cookies**: JWT stored in secure, httpOnly, sameSite cookies
- **File Validation**: Upload restricted to images (JPEG/PNG/WebP/GIF), max 5MB

## Deployment to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Vercel will auto-detect Next.js and use the correct build settings
5. After first deploy, run `npm run db:setup` locally (pointed at production DB) to seed data

### Vercel Integrations (Recommended)

- [Upstash Redis](https://vercel.com/integrations/upstash) — auto-configures `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Environment variables are managed in Vercel Dashboard > Settings > Environment Variables

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Generate Prisma client + build Next.js |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database |
| `npm run db:setup` | Push schema + seed (fresh setup) |
| `npm run db:migrate` | Create a migration |
