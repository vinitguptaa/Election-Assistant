import Link from "next/link";
import { ArrowRight, Bell, Bot, CalendarDays, MapPinned, ShieldCheck, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessVisualizer } from "@/components/process-visualizer";
import { getNews, getTimeline } from "@/lib/data";
import { daysUntil, formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [timeline, news] = await Promise.all([getTimeline("Delhi"), getNews({})]);
  const nextEvent = timeline[0];

  return (
    <>
      <section className="section-shell grid gap-10 py-10 md:grid-cols-[1fr_0.9fr] md:py-16">
        <div>
          <Badge variant="outline">AI civic guidance</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">Understand every election step before voting day.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            CivicPulse combines verified election data, AI explanations, candidate comparison, booth discovery, reminders, and misinformation checks in one accessible workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/assistant">Ask assistant <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/eligibility">Check eligibility</Link>
            </Button>
          </div>
        </div>
        <Card className="shadow-civic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Next election milestone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg bg-muted p-5">
              <p className="text-sm font-semibold text-primary">{nextEvent?.phase}</p>
              <h2 className="mt-2 text-2xl font-bold">{nextEvent?.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{nextEvent?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border p-4">
                <p className="text-3xl font-bold">{nextEvent ? daysUntil(nextEvent.startsAt) : 0}</p>
                <p className="text-sm text-muted-foreground">days remaining</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-sm font-semibold">{nextEvent ? formatDate(nextEvent.startsAt) : "TBD"}</p>
                <p className="text-sm text-muted-foreground">starts on</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="section-shell grid gap-4 md:grid-cols-4">
        {[
          { title: "AI Chat", href: "/assistant", icon: Bot },
          { title: "Booth Finder", href: "/polling-booths", icon: MapPinned },
          { title: "Verified Alerts", href: "/news", icon: Bell },
          { title: "Admin Analytics", href: "/admin", icon: ShieldCheck }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="rounded-lg border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-civic">
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-4 font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">Open workspace <ArrowRight className="inline h-3 w-3" /></p>
            </Link>
          );
        })}
      </section>

      <section className="section-shell py-14">
        <div className="mb-6 flex items-center gap-2">
          <Vote className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Election process visualizer</h2>
        </div>
        <ProcessVisualizer />
      </section>

      <section className="section-shell grid gap-4 md:grid-cols-3">
        {news.slice(0, 3).map((article) => (
          <Card key={article.title}>
            <CardHeader>
              <CardTitle className="text-base">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{article.summary}</p>
              <Badge className="mt-4" variant={article.verified ? "success" : "warning"}>{article.verified ? "Verified source" : "Needs verification"}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
