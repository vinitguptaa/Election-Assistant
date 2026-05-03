"use client";

import { Mic, Send, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ChatResponse = {
  answer: string;
  intent: string;
  cards: Array<{ title: string; body: string; meta: string }>;
  sources: string[];
};

export function AssistantChat() {
  const [message, setMessage] = useState("How do I check if I can vote in Delhi?");
  const [region, setRegion] = useState("Delhi");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  const speechSupported = useMemo(() => typeof window !== "undefined" && "speechSynthesis" in window, []);

  async function askAssistant() {
    setLoading(true);
    try {
      const result = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, region, language })
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error ?? "Assistant failed");
      setResponse(json.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not contact assistant");
    } finally {
      setLoading(false);
    }
  }

  function speak() {
    if (!speechSupported || !response?.answer) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(response.answer));
  }

  function voiceInput() {
    type BrowserSpeechRecognition = {
      lang: string;
      onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
      start: () => void;
    };
    const SpeechRecognition = (window as unknown as { webkitSpeechRecognition?: new () => BrowserSpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.info("Voice input is not available in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (event) => setMessage(event.results[0][0].transcript);
    recognition.start();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="shadow-civic">
        <CardHeader>
          <CardTitle>Ask the election assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Region
              <select className="mt-1 h-10 w-full rounded-md border bg-background px-3" value={region} onChange={(event) => setRegion(event.target.value)}>
                <option>Delhi</option>
                <option>Maharashtra</option>
                <option>National</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Language
              <select className="mt-1 h-10 w-full rounded-md border bg-background px-3" value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </label>
          </div>
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Election question" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={askAssistant} disabled={loading}>
              <Send className="h-4 w-4" />
              {loading ? "Thinking..." : "Ask"}
            </Button>
            <Button variant="outline" onClick={voiceInput}>
              <Mic className="h-4 w-4" />
              Voice
            </Button>
            <Button variant="outline" onClick={speak} disabled={!response}>
              <Volume2 className="h-4 w-4" />
              Read aloud
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guidance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {response ? (
            <>
              <Badge variant="outline">Intent: {response.intent.replaceAll("_", " ")}</Badge>
              <p className="leading-7">{response.answer}</p>
              <div className="grid gap-3">
                {response.cards.map((card) => (
                  <div key={card.title} className="rounded-md border bg-background p-3">
                    <p className="font-semibold">{card.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{card.body}</p>
                    <p className="mt-2 text-xs font-medium text-primary">{card.meta}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Ask about registration, EVM/VVPAT, polling booths, candidates, deadlines, or suspicious election claims.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
