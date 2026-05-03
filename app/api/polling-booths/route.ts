import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { getBooths } from "@/lib/data";
import { boothSearchSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const query = boothSearchSchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    return apiOk(await getBooths(query));
  } catch (error) {
    return apiError(error);
  }
}
