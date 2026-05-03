import type { z } from "zod";
import type { eligibilitySchema } from "./validation";

export function checkEligibility(input: z.infer<typeof eligibilitySchema>) {
  const missingRequirements: string[] = [];

  if (input.age < 18) {
    missingRequirements.push("You must be at least 18 years old on the qualifying date.");
  }

  if (!/indian/i.test(input.citizenship)) {
    missingRequirements.push("You must satisfy the citizenship requirement for this election.");
  }

  if (!input.hasGovernmentId) {
    missingRequirements.push("Carry or obtain an accepted government photo ID.");
  }

  if (!input.isRegistered) {
    missingRequirements.push("Complete voter registration or verify your electoral roll entry.");
  }

  return {
    eligible: missingRequirements.length === 0,
    missingRequirements,
    nextSteps:
      missingRequirements.length === 0
        ? ["Find your polling booth", "Review candidate information", "Set a voting day reminder"]
        : ["Check the current voter registration deadline", "Prepare accepted identity documents", "Contact your local electoral office"]
  };
}
