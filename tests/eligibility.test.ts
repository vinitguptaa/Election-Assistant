import { describe, expect, it } from "vitest";
import { checkEligibility } from "@/lib/eligibility";

describe("checkEligibility", () => {
  it("marks a registered adult citizen with ID as eligible", () => {
    const result = checkEligibility({
      age: 22,
      citizenship: "Indian",
      region: "Delhi",
      hasGovernmentId: true,
      isRegistered: true
    });

    expect(result.eligible).toBe(true);
    expect(result.nextSteps).toContain("Find your polling booth");
  });

  it("returns missing requirements for underage unregistered users", () => {
    const result = checkEligibility({
      age: 16,
      citizenship: "Indian",
      region: "Delhi",
      hasGovernmentId: false,
      isRegistered: false
    });

    expect(result.eligible).toBe(false);
    expect(result.missingRequirements.length).toBeGreaterThan(1);
  });
});
