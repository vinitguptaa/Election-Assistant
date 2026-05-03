"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Result = { eligible: boolean; missingRequirements: string[]; nextSteps: string[] };

export function EligibilityChecker() {
  const [age, setAge] = useState(18);
  const [citizenship, setCitizenship] = useState("Indian");
  const [region, setRegion] = useState("Delhi");
  const [hasGovernmentId, setHasGovernmentId] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit() {
    const response = await fetch("/api/eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, citizenship, region, hasGovernmentId, isRegistered })
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error("Please check the eligibility form.");
      return;
    }
    setResult(json.data);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Eligibility inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="text-sm font-medium">
            Age
            <Input type="number" min={0} value={age} onChange={(event) => setAge(Number(event.target.value))} />
          </label>
          <label className="text-sm font-medium">
            Citizenship
            <Input value={citizenship} onChange={(event) => setCitizenship(event.target.value)} />
          </label>
          <label className="text-sm font-medium">
            Region
            <Input value={region} onChange={(event) => setRegion(event.target.value)} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasGovernmentId} onChange={(event) => setHasGovernmentId(event.target.checked)} />
            I have an accepted government ID
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isRegistered} onChange={(event) => setIsRegistered(event.target.checked)} />
            I am registered on the electoral roll
          </label>
          <Button onClick={submit}>Check eligibility</Button>
        </CardContent>
      </Card>

      <Card className="shadow-civic">
        <CardHeader>
          <CardTitle>Result and next steps</CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {result.eligible ? <CheckCircle2 className="h-8 w-8 text-emerald-600" /> : <XCircle className="h-8 w-8 text-destructive" />}
                <p className="text-xl font-bold">{result.eligible ? "Likely eligible" : "Requirements missing"}</p>
              </div>
              {result.missingRequirements.length > 0 && (
                <ul className="space-y-2">
                  {result.missingRequirements.map((item) => (
                    <li key={item} className="rounded-md border p-3 text-sm">{item}</li>
                  ))}
                </ul>
              )}
              <div className="grid gap-2">
                {result.nextSteps.map((step) => (
                  <p key={step} className="rounded-md bg-muted p-3 text-sm font-medium">{step}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">The checker dynamically evaluates age, citizenship, ID, registration, and region-specific next steps.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
