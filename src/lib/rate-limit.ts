import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Duration = Parameters<typeof Ratelimit.slidingWindow>[1];

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(prefix: string, maxRequests: number, window: Duration): Ratelimit | null {
  const redisClient = getRedis();
  if (!redisClient) return null;

  const key = `${prefix}:${maxRequests}:${window}`;
  if (!limiters.has(key)) {
    limiters.set(
      key,
      new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(maxRequests, window),
        prefix: `ratelimit:${prefix}`,
      })
    );
  }

  return limiters.get(key)!;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}

/**
 * Apply rate limiting to a request.
 * Returns a NextResponse if rate limited, or null if the request should proceed.
 * Gracefully degrades if Redis is not configured (allows all requests).
 */
export async function rateLimit(
  request: NextRequest,
  prefix: string,
  maxRequests: number,
  window: Duration
): Promise<NextResponse | null> {
  const limiter = getLimiter(prefix, maxRequests, window);
  if (!limiter) return null; // Redis not configured, allow request

  const ip = getClientIp(request);
  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
