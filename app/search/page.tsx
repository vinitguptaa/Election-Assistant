import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SearchBox } from "@/components/search-box";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faqKnowledge, mockBooths, mockCandidates, mockElectionEvents, mockElections, mockNews, mockParties } from "@/lib/mock-data";

export const metadata = { title: "Search" };

type SearchResult = {
  title: string;
  href: string;
  description: string;
  category: string;
  keywords: string[];
};

const searchablePages: SearchResult[] = [
  {
    title: "AI Election Assistant",
    href: "/assistant",
    description: "Ask natural-language election questions and review AI-assisted civic guidance.",
    category: "Feature",
    keywords: ["assistant", "chatbot", "ai", "prompt", "question", "help"]
  },
  {
    title: "Election Timeline",
    href: "/timeline",
    description: "Explore election dates, deadlines, regional events, and countdowns.",
    category: "Feature",
    keywords: ["timeline", "date", "deadline", "schedule", "region"]
  },
  {
    title: "Voter Eligibility",
    href: "/eligibility",
    description: "Check voter eligibility requirements and missing next steps.",
    category: "Feature",
    keywords: ["eligibility", "voter", "age", "registration", "requirements"]
  },
  {
    title: "Polling Booth Finder",
    href: "/polling-booths",
    description: "Find polling booths, addresses, queue estimates, and route links.",
    category: "Feature",
    keywords: ["booth", "polling", "pin", "address", "map", "route"]
  },
  {
    title: "Candidate Comparison",
    href: "/candidates",
    description: "Compare candidates, parties, priorities, declarations, and performance data.",
    category: "Feature",
    keywords: ["candidate", "party", "manifesto", "assets", "comparison"]
  },
  {
    title: "News and Fact Checks",
    href: "/news",
    description: "Read verified election updates and check misinformation claims.",
    category: "Feature",
    keywords: ["news", "alert", "fact", "misinformation", "verified"]
  },
  {
    title: "Admin Dashboard",
    href: "/admin",
    description: "Access protected analytics, moderation controls, and governance indicators.",
    category: "Feature",
    keywords: ["admin", "dashboard", "analytics", "moderation", "login"]
  },
  {
    title: "Login",
    href: "/login",
    description: "Sign in to access protected admin workflows.",
    category: "Account",
    keywords: ["login", "signin", "auth", "account"]
  }
];

const dataResults: SearchResult[] = [
  ...mockElections.map((election) => ({
    title: election.title,
    href: `/timeline?region=${encodeURIComponent(election.region)}`,
    description: election.description,
    category: "Election",
    keywords: [election.region, election.country, election.status, "election", "voting"]
  })),
  ...mockElectionEvents.map((event) => ({
    title: event.title,
    href: `/timeline?region=${encodeURIComponent(event.region)}`,
    description: event.description,
    category: "Timeline",
    keywords: [event.region, event.phase, "date", "deadline", "schedule"]
  })),
  ...mockCandidates.map((candidate) => ({
    title: candidate.name,
    href: `/candidates?q=${encodeURIComponent(candidate.name)}`,
    description: `${candidate.constituency}, ${candidate.region}. ${candidate.profession}. Priorities: ${candidate.publicPriorities.join(", ")}.`,
    category: "Candidate",
    keywords: [candidate.name, candidate.constituency, candidate.region, candidate.education, candidate.profession, ...candidate.publicPriorities]
  })),
  ...mockParties.map((party) => ({
    title: party.name,
    href: "/candidates",
    description: `${party.shortName}: ${party.ideology}. Manifesto focus: ${party.manifesto}`,
    category: "Party",
    keywords: [party.name, party.shortName, party.ideology, party.manifesto]
  })),
  ...mockBooths.map((booth) => ({
    title: booth.name,
    href: `/polling-booths?pinCode=${encodeURIComponent(booth.pinCode)}`,
    description: `${booth.address}. Open ${booth.openingTime}-${booth.closingTime}. PIN ${booth.pinCode}.`,
    category: "Polling booth",
    keywords: [booth.name, booth.address, booth.region, booth.pinCode, "booth", "polling station", "queue"]
  })),
  ...mockNews.map((article) => ({
    title: article.title,
    href: "/news",
    description: article.summary,
    category: article.verified ? "Verified news" : "Fact check",
    keywords: [article.title, article.summary, article.source, article.region, article.sentiment, article.verified ? "verified" : "misinformation"]
  })),
  ...faqKnowledge.map((faq) => ({
    title: faq.question,
    href: "/assistant",
    description: faq.answer,
    category: "FAQ",
    keywords: [faq.question, faq.answer, "question", "assistant"]
  }))
];

const searchIndex = [...searchablePages, ...dataResults];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const results = query
    ? searchIndex.filter((page) => `${page.title} ${page.description} ${page.category} ${page.keywords.join(" ")}`.toLowerCase().includes(query))
    : searchIndex;

  return (
    <>
      <PageHeader eyebrow="Site search" title="Find CivicPulse tools and workflows" description="Search across assistant, timelines, eligibility, polling booth, candidate, news, login, and admin features." />
      <section className="section-shell space-y-5">
        <SearchBox defaultQuery={q ?? ""} />
        <div className="flex flex-wrap items-center gap-2">
          <Search className="h-5 w-5 text-primary" aria-hidden />
          <p className="text-sm text-muted-foreground">
            {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${q}"` : "Showing all searchable sections"}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-6 text-muted-foreground">{page.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">{page.category}</Badge>
                    {page.keywords.slice(0, 3).map((keyword) => (
                      <Badge key={keyword} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {results.length === 0 ? <p className="rounded-md border bg-card p-5 text-sm text-muted-foreground">No matching result found. Try Delhi, Anika, booth, voting date, candidate, misinformation, eligibility, or admin.</p> : null}
      </section>
    </>
  );
}
