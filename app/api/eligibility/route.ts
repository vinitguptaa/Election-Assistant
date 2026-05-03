import { NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api";
import { checkEligibility } from "@/lib/eligibility";
import { eligibilitySchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = eligibilitySchema.parse(await request.json());
    return apiOk(checkEligibility(body));
  } catch (error) {
    return apiError(error);
  }
}
