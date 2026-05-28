/**
 * Creates FeedbackDeletionLog table. Uses direct/session DB URL because
 * prisma db execute hangs on Supabase transaction pooler (:6543).
 *
 * Usage: npm run db:deletion-log
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";
import { Pool } from "pg";

function getMigrationConnectionString(): string {
  const direct = process.env.DIRECT_URL ?? process.env.DIRECT_DATABASE_URL;
  if (direct) return direct;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Set DATABASE_URL (or DIRECT_URL) in .env");
  }

  // Supabase: session pooler or direct — not transaction pooler (6543)
  return url
    .replace(":6543/", ":5432/")
    .replace("?pgbouncer=true", "")
    .replace("&pgbouncer=true", "")
    .replace("pgbouncer=true&", "")
    .replace("?sslmode=require", "?sslmode=require");
}

async function main() {
  const connectionString = getMigrationConnectionString();
  const sqlPath = join(__dirname, "create-feedback-deletion-log.sql");
  const sql = readFileSync(sqlPath, "utf8");

  const host = connectionString.match(/@([^:/]+)/)?.[1] ?? "database";
  console.log(`Connecting to ${host} (port 5432 / direct)…`);

  const pool = new Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 20_000,
    ssl: connectionString.includes("supabase")
      ? { rejectUnauthorized: false }
      : undefined,
  });

  const client = await pool.connect();
  try {
    await client.query(sql);
    const { rows } = await client.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'FeedbackDeletionLog'
      ) AS ok`
    );
    if (!rows[0]?.ok) {
      throw new Error("Table was not created — check SQL output.");
    }
    console.log("Success: FeedbackDeletionLog table is ready.");
    console.log("You can delete feedback in Admin → Dashboard now.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err instanceof Error ? err.message : err);
  console.error(
    "\nIf this times out, use Supabase Dashboard → SQL Editor and paste:\n" +
      "  scripts/create-feedback-deletion-log.sql"
  );
  process.exit(1);
});
