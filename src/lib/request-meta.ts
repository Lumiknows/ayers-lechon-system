import { NextRequest } from "next/server";

export function getRequestIp(request: NextRequest | Request): string {
  const headers =
    request.headers instanceof Headers ? request.headers : new Headers();

  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

export function getUserAgent(request: NextRequest | Request): string | null {
  const headers =
    request.headers instanceof Headers ? request.headers : new Headers();

  return headers.get("user-agent");
}
