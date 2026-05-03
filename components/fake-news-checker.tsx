"use client";

import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function FakeNewsChecker() {
  const [text, setText] = useState("Forwarded message says Delhi voting day has been cancelled.");
  const [result, setResult] = useState<{ risk: number; verdict: string } | null>(null);

  async function check() {
    const response = await fetch("/api/assistant/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const json = await response.json();
    setResult(json.data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Misinformation check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
        <Button onClick={check}>Analyze claim</Button>
        {result && (
          <div className="rounded-md border p-3">
            <p className="font-semibold">Risk score: {(result.risk * 100).toFixed(0)}%</p>
            <p className="text-sm text-muted-foreground">{result.verdict}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
