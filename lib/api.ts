import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "./logger";

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function apiError(error: unknown, status = 500) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: "Validation failed", details: error.flatten() }, { status: 400 });
  }

  const message = error instanceof Error ? error.message : "Unexpected error";
  logger.error(message);
  return NextResponse.json({ error: message }, { status });
}
