import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { getNews } from "@/lib/data";
import { newsQuerySchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const query = newsQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    return apiOk(await getNews(query));
  } catch (error) {
    return apiError(error);
  }
}
