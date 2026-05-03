import { NextRequest, NextResponse } from "next/server";
import { answerElectionQuestion } from "@/lib/ai";
import { apiError, apiOk } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { assistantRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(request, 20);
    if (!limit.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

    const body = assistantRequestSchema.parse(await request.json());
    const result = await answerElectionQuestion(body);

    if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === "false") {
      await prisma.chatHistory.create({
        data: {
          userId: body.userId,
          question: body.message,
          answer: result.answer,
          intent: result.intent,
          language: body.language,
          sources: result.sources
        }
      });
    }

    return apiOk(result);
  } catch (error) {
    return apiError(error);
  }
}
