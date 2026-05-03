import { apiOk } from "@/lib/api";
import { getPartyPerformance } from "@/lib/data";

export async function GET() {
  return apiOk({
    activeUsers: 18420,
    assistantSessions: 5312,
    eligibilityChecks: 2940,
    remindersCreated: 1280,
    misinformationFlags: 174,
    regionBreakdown: [
      { region: "Delhi", users: 10240 },
      { region: "Maharashtra", users: 8180 }
    ],
    partyPerformance: getPartyPerformance()
  });
}
