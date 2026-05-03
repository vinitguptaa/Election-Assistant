import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { getCandidates } from "@/lib/data";
import { candidateQuerySchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const query = candidateQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    return apiOk(await getCandidates(query));
  } catch (error) {
    return apiError(error);
  }
}
