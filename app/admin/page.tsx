import { Activity, Database, MessageSquareWarning, Shield } from "lucide-react";
import { AnalyticsChart } from "@/components/analytics-chart";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPartyPerformance } from "@/lib/data";

export const metadata = { title: "Admin Dashboard" };

async function getAnalytics() {
  return {
    activeUsers: 18420,
    assistantSessions: 5312,
    eligibilityChecks: 2940,
    remindersCreated: 1280,
    misinformationFlags: 174,
    regionBreakdown: []
  };
}

export default async function AdminPage() {
  const analytics = await getAnalytics();
  const stats = [
    { label: "Active users", value: analytics.activeUsers, icon: Activity },
    { label: "Assistant sessions", value: analytics.assistantSessions, icon: Database },
    { label: "Eligibility checks", value: analytics.eligibilityChecks, icon: Shield },
    { label: "Misinformation flags", value: analytics.misinformationFlags, icon: MessageSquareWarning }
  ];

  return (
    <>
      <PageHeader eyebrow="Operations" title="Admin dashboard for election data and AI governance" description="Manage timelines, moderate assistant responses, inspect engagement analytics, and track audit-ready administrative activity." />
      <section className="section-shell space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-2xl font-bold">{Number(stat.value).toLocaleString("en-IN")}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
          <AnalyticsChart data={getPartyPerformance()} />
          <Card>
            <CardHeader>
              <CardTitle>Governance controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="success">RBAC enabled</Badge>
              <Badge variant="outline">Audit logs</Badge>
              <Badge variant="outline">Rate limited APIs</Badge>
              <Badge variant="outline">Zod validation</Badge>
              <div className="pt-3">
                <Button variant="outline">Review AI moderation queue</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
