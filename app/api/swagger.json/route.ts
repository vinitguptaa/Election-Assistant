import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openapi: "3.1.0",
    info: { title: "CivicPulse Election Assistant API", version: "1.0.0" },
    paths: {
      "/api/assistant/chat": { post: { summary: "Generate contextual AI election guidance" } },
      "/api/eligibility": { post: { summary: "Check voter eligibility and next steps" } },
      "/api/timeline": { get: { summary: "List election timeline events" }, post: { summary: "Create timeline event for admin workflows" } },
      "/api/polling-booths": { get: { summary: "Search polling booths by region or PIN code" } },
      "/api/candidates": { get: { summary: "Search candidates and party data" } },
      "/api/news": { get: { summary: "Fetch verified election news and fact checks" } },
      "/api/admin/analytics": { get: { summary: "Engagement analytics for administrators" } },
      "/api/updates/stream": { get: { summary: "Server-sent realtime polling booth updates" } }
    }
  });
}
