import { NextRequest, NextResponse } from "next/server";
import { detectMisinformation } from "@/lib/ai";
import { apiError, apiOk } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(request, 20);
    if (!limit.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const { text } = (await request.json()) as { text?: string };
    if (!text || text.length < 5) return NextResponse.json({ error: "Text is required" }, { status: 400 });
    return apiOk(await detectMisinformation(text));
  } catch (error) {
    return apiError(error);
  }
}
