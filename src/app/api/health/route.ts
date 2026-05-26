import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const health: {
    status: "ok" | "degraded" | "error";
    timestamp: string;
    database: "connected" | "disconnected";
    version: string;
    error?: string;
  } = {
    status: "ok",
    timestamp: new Date().toISOString(),
    database: "disconnected",
    version: process.env.npm_package_version ?? "0.1.0",
  };

  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    health.database = "connected";
  } catch (error) {
    health.status = "degraded";
    health.database = "disconnected";
    health.error = error instanceof Error ? error.message : "Database connection failed";
  }

  const statusCode = health.status === "ok" ? 200 : 503;
  return NextResponse.json(health, { status: statusCode });
}
