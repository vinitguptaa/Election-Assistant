import OpenAI from "openai";
import { faqKnowledge, processSteps } from "./mock-data";
import { getCandidates, getTimeline } from "./data";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export function detectIntent(message: string) {
  const text = message.toLowerCase();
  if (text.includes("eligible") || text.includes("register")) return "eligibility";
  if (text.includes("booth") || text.includes("polling") || text.includes("where vote")) return "polling_booth";
  if (text.includes("candidate") || text.includes("party") || text.includes("manifesto")) return "candidate_info";
  if (text.includes("date") || text.includes("timeline") || text.includes("counting")) return "timeline";
  if (text.includes("fake") || text.includes("rumor") || text.includes("news")) return "misinformation";
  return "general_guidance";
}

export async function answerElectionQuestion(input: { message: string; language: string; region?: string }) {
  const intent = detectIntent(input.message);
  const [timeline, candidates] = await Promise.all([getTimeline(input.region), getCandidates({ region: input.region })]);
  const context = {
    timeline: timeline.slice(0, 5),
    candidates: candidates.slice(0, 5),
    processSteps,
    faqs: faqKnowledge
  };

  if (!openai) {
    return {
      intent,
      answer: fallbackAnswer(input.message, intent, input.language, input.region),
      cards: buildSupportCards(intent, context),
      sources: ["Seeded election dataset", "Election process knowledge base"]
    };
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are CivicPulse, a neutral election assistant. Give concise, step-by-step, accessible guidance. Do not support parties or candidates. Ask users to verify official commission notices for legal deadlines."
      },
      {
        role: "user",
        content: JSON.stringify({
          question: input.message,
          language: input.language,
          region: input.region,
          intent,
          context
        })
      }
    ]
  });

  return {
    intent,
    answer: completion.choices[0]?.message.content ?? fallbackAnswer(input.message, intent, input.language, input.region),
    cards: buildSupportCards(intent, context),
    sources: ["Election dataset", "OpenAI generated summary"]
  };
}

function fallbackAnswer(message: string, intent: string, language: string, region?: string) {
  const localeHint = language === "hi" ? "Hindi support is enabled in production with OpenAI translation." : "";
  const regionText = region ? ` for ${region}` : "";

  const answers: Record<string, string> = {
    eligibility: `To vote${regionText}, confirm you are at least 18, meet citizenship rules, have an accepted photo ID, and are listed on the electoral roll before the deadline. ${localeHint}`,
    polling_booth: `Search by PIN code or area, confirm your assigned polling station, carry accepted ID, and check queue level before leaving. ${localeHint}`,
    candidate_info: `Compare candidates by constituency, party manifesto, declared assets, public priorities, education, and affidavit details. ${localeHint}`,
    timeline: `Election timelines usually move from voter registration to nominations, campaigning, polling day, counting, and result declaration. ${localeHint}`,
    misinformation: `Treat viral election claims as unverified until they match official commission notices or verified news sources. ${localeHint}`,
    general_guidance: `I can explain registration, booth workflows, EVM/VVPAT voting, candidate comparison, timelines, and election FAQs in simple steps. ${localeHint}`
  };

  return answers[intent] ?? answers.general_guidance;
}

type SupportContext = {
  timeline: Array<{ title: string; description: string; startsAt: string | Date }>;
  candidates: unknown[];
  processSteps: typeof processSteps;
  faqs: typeof faqKnowledge;
};

function buildSupportCards(intent: string, context: SupportContext) {
  if (intent === "timeline") {
    return (context.timeline as Array<{ title: string; description: string; startsAt: string | Date }>).slice(0, 3).map((event) => ({
      title: event.title,
      body: event.description,
      meta: new Date(event.startsAt).toLocaleDateString("en-IN")
    }));
  }

  if (intent === "candidate_info") {
    return context.candidates.slice(0, 3).map((candidate) => {
      const row = candidate as { name: string; constituency: string; party?: { shortName?: string } };
      return { title: row.name, body: row.constituency, meta: row.party?.shortName ?? "Independent" };
    });
  }

  return context.processSteps.slice(0, 3).map((step) => ({ title: step.title, body: step.detail, meta: "Election process" }));
}

export async function detectMisinformation(text: string) {
  if (!openai) {
    const risk = /changed|cancelled|boycott|free money|secret/i.test(text) ? 0.78 : 0.18;
    return {
      risk,
      verdict: risk > 0.65 ? "High risk: verify against official notices before sharing." : "Low risk: still verify dates and sources."
    };
  }

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      { role: "system", content: "Score election misinformation risk from 0 to 1 and give a short verdict. Return JSON." },
      { role: "user", content: text }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(result.choices[0]?.message.content ?? "{}") as { risk: number; verdict: string };
}
