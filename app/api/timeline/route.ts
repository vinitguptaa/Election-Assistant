import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { getTimeline } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { timelineCreateSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const region = request.nextUrl.searchParams.get("region") ?? undefined;
    return apiOk(await getTimeline(region));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = timelineCreateSchema.parse(await request.json());
    if (process.env.NEXT_PUBLIC_ENABLE_MOCKS !== "false") return apiOk({ ...body, id: "mock-event", mock: true });
    return apiOk(await prisma.electionEvent.create({ data: body }));
  } catch (error) {
    return apiError(error);
  }
}
