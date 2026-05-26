import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/constants";
import { verifySessionToken } from "@/lib/auth";

const publicAdminPaths = ["/admin/login"];

function getAllowedOrigins(): string[] {
  const origins = process.env.ALLOWED_ORIGINS;
  if (!origins) return [];
  return origins.split(",").map((o) => o.trim());
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Same-origin requests don't send Origin header
  const allowed = getAllowedOrigins();
  if (allowed.length === 0) return true; // No restrictions configured
  return allowed.includes(origin);
}

function addCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
  const allowedOrigins = getAllowedOrigins();

  if (origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // Handle CORS preflight for API routes
  if (pathname.startsWith("/api") && request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response, origin);
  }

  // Origin validation for state-changing API requests
  if (
    pathname.startsWith("/api") &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(request.method)
  ) {
    if (!isOriginAllowed(origin)) {
      return NextResponse.json(
        { error: "Forbidden: invalid origin" },
        { status: 403 }
      );
    }
  }

  // Admin auth protection
  if (pathname.startsWith("/admin")) {
    if (publicAdminPaths.some((p) => pathname.startsWith(p))) {
      return addCorsHeaders(NextResponse.next(), origin);
    }

    const token = request.cookies.get(AUTH_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Add CORS headers to all API responses
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    return addCorsHeaders(response, origin);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
