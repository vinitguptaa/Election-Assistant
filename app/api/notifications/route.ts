import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return apiOk([
    { title: "Registration deadline approaching", body: "Delhi voter registration closes on 5 Jul 2026.", channel: "APP" },
    { title: "Verified update", body: "No notified change to Delhi polling date.", channel: "PUSH" }
  ]);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { userId?: string; title: string; body: string; channel?: "APP" | "EMAIL" | "SMS" | "PUSH" };
    if (process.env.NEXT_PUBLIC_ENABLE_MOCKS !== "false") return apiOk({ queued: true, mock: true, ...body });
    return apiOk(await prisma.notification.create({ data: { ...body, channel: body.channel ?? "APP" } }));
  } catch (error) {
    return apiError(error);
  }
}
