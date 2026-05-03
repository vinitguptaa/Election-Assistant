import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Search" };

const searchablePages = [
  {
    title: "AI Election Assistant",
    href: "/assistant",
    description: "Ask natural-language election questions and review AI-assisted civic guidance.",
    keywords: ["assistant", "chatbot", "ai", "prompt", "question", "help"]
  },
  {
    title: "Election Timeline",
    href: "/timeline",
    description: "Explore election dates, deadlines, regional events, and countdowns.",
    keywords: ["timeline", "date", "deadline", "schedule", "region"]
  },
  {
    title: "Voter Eligibility",
    href: "/eligibility",
    description: "Check voter eligibility requirements and missing next steps.",
    keywords: ["eligibility", "voter", "age", "registration", "requirements"]
  },
  {
    title: "Polling Booth Finder",
    href: "/polling-booths",
    description: "Find polling booths, addresses, queue estimates, and route links.",
    keywords: ["booth", "polling", "pin", "address", "map", "route"]
  },
  {
    title: "Candidate Comparison",
    href: "/candidates",
    description: "Compare candidates, parties, priorities, declarations, and performance data.",
    keywords: ["candidate", "party", "manifesto", "assets", "comparison"]
  },
  {
    title: "News and Fact Checks",
    href: "/news",
    description: "Read verified election updates and check misinformation claims.",
    keywords: ["news", "alert", "fact", "misinformation", "verified"]
  },
  {
    title: "Admin Dashboard",
    href: "/admin",
    description: "Access protected analytics, moderation controls, and governance indicators.",
    keywords: ["admin", "dashboard", "analytics", "moderation", "login"]
  },
  {
    title: "Login",
    href: "/login",
    description: "Sign in to access protected admin workflows.",
    keywords: ["login", "signin", "auth", "account"]
  }
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const results = query
    ? searchablePages.filter((page) => `${page.title} ${page.description} ${page.keywords.join(" ")}`.toLowerCase().includes(query))
    : searchablePages;

  return (
    <>
      <PageHeader eyebrow="Site search" title="Find CivicPulse tools and workflows" description="Search across assistant, timelines, eligibility, polling booth, candidate, news, login, and admin features." />
      <section className="section-shell space-y-5">
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
        {results.length === 0 ? <p className="rounded-md border bg-card p-5 text-sm text-muted-foreground">No matching section found. Try searching for assistant, candidate, booth, news, timeline, eligibility, admin, or login.</p> : null}
      </section>
    </>
  );
}
