# Cebu's Ayers Lechon

A full-stack restaurant website for Cebu's Ayers Lechon, built with Next.js 16 (App Router) and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Database**: PostgreSQL via Supabase + Prisma 7
- **Auth**: JWT (jose) with HTTP-only cookies
- **Image Uploads**: Supabase Storage
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- [Upstash Redis](https://upstash.com) for rate limiting (recommended for production)
- [Resend](https://resend.com) for feedback email notifications (recommended for production)

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

### 2b. Upstash Redis (rate limiting)

1. Sign up at [console.upstash.com](https://console.upstash.com)
2. **Create Database** (region near your Supabase/Vercel deployment)
3. Open **REST API** → copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into `.env`
4. Limits: admin login **5/min per IP**, feedback submit **3 per 24 hours per IP**

### 2c. Resend (feedback emails)

1. Sign up at [resend.com](https://resend.com) and create an API key
2. Set `RESEND_API_KEY` and `ADMIN_NOTIFICATION_EMAIL` in `.env`
3. **Test mode** (no custom domain): emails send from `onboarding@resend.dev` and can only go to the email you used to sign up for Resend
4. **Production**: verify your domain in Resend, then update `from` in `src/lib/email.ts`

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
| GET | `/api/feedback?page=1&limit=20` | Paginated feedback list (admin) |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/export` | CSV export of feedback |
| GET/POST | `/api/admin/qr` | Generate QR codes |
| POST | `/api/admin/upload` | Upload image to Supabase Storage |
| POST | `/api/menu` | Create menu item |
| PUT | `/api/menu/[id]` | Update menu item |
| DELETE | `/api/menu/[id]` | Delete menu item |
| POST | `/api/stores` | Create store |
| PUT | `/api/stores/[id]` | Update store |
| DELETE | `/api/stores/[id]` | Delete store |

## Security Features

- **Rate Limiting**: Auth (5/min), feedback submissions (3 per 24h per IP) via Upstash Redis
- **Input Validation**: All POST/PUT bodies validated with Zod schemas
- **CORS**: Configurable allowed origins with preflight support
- **Origin Validation**: State-changing requests verified against allowed origins
- **HTTP-only Cookies**: JWT stored in secure, httpOnly, sameSite cookies
- **File Validation**: Upload restricted to images (JPEG/PNG/WebP/GIF), max 5MB

## Deployment to Vercel

1. Push to GitHub (`git push origin main`)
2. Import **Lumiknows/ayers-lechon-frontend** (or your repo) in [Vercel](https://vercel.com)
3. **Settings → Environment Variables** — add every variable from `.env.example` for **Production**:
   - `DATABASE_URL`, `JWT_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
   - `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`
   - `ALLOWED_ORIGINS` — your live URL, e.g. `https://your-app.vercel.app`
4. Deploy (auto on push to `main`)
5. If needed, run `npm run db:setup` locally against production `DATABASE_URL` once
6. Change default admin password if you used seed credentials

### Vercel Integrations (Recommended)

- [Upstash Redis](https://vercel.com/integrations/upstash) — auto-configures `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Feedback deletion log (required once)

Admin **delete feedback** needs the `FeedbackDeletionLog` table. If you see *"Deletion log table is missing"*, run this **once** in Supabase:

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor** → **New query**
2. Paste the contents of [`scripts/create-feedback-deletion-log.sql`](scripts/create-feedback-deletion-log.sql)
3. Click **Run** (success: no errors)
4. Retry delete in **Admin → Dashboard**

Or locally (if `DATABASE_URL` is set): `npm run db:deletion-log`

### Verify after deploy

- Submit test feedback → email arrives at `ADMIN_NOTIFICATION_EMAIL`
- Rapid login attempts → `429 Too many requests` after 5 tries per minute
- `GET /api/feedback` without admin cookie → `401 Unauthorized`

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
