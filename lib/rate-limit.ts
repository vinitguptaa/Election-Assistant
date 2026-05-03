import { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(request: NextRequest, limit = 30, windowMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "local";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  current.count += 1;
  return { ok: true, remaining: limit - current.count };
}
