import { Scale, ShieldCheck } from "lucide-react";
import { AnalyticsChart } from "@/components/analytics-chart";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidates, getPartyPerformance } from "@/lib/data";

export const metadata = { title: "Candidate Comparison" };

export default async function CandidatesPage({ searchParams }: { searchParams: Promise<{ region?: string; constituency?: string; q?: string }> }) {
  const filters = await searchParams;
  const candidates = await getCandidates(filters);

  return (
    <>
      <PageHeader eyebrow="Candidate transparency" title="Compare candidates, parties, manifestos, and declarations" description="Search candidate profiles, compare public priorities, view declared assets, and inspect party performance trends." />
      <section className="section-shell space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <Card key={candidate.name}>
              <CardHeader>
                <CardTitle>{candidate.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{candidate.constituency}</Badge>
                  <Badge style={{ backgroundColor: candidate.party?.color, color: "white" }}>{candidate.party?.shortName}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{candidate.education} | {candidate.profession}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-semibold">Assets</p>
                    <p>INR {Number(candidate.declaredAssets).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-semibold">Cases</p>
                    <p>{candidate.criminalCases}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {candidate.publicPriorities.map((priority) => (
                    <p key={priority} className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-secondary" /> {priority}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AnalyticsChart data={getPartyPerformance()} />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5" /> Comparison safeguards</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Candidate views are designed to be neutral and source-oriented. Production deployments should connect affidavit URLs, official candidate rolls, manifesto PDFs, and asset declarations from election authority data feeds.
          </CardContent>
        </Card>
      </section>
    </>
  );
}
