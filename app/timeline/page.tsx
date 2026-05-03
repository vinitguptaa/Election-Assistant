import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimeline } from "@/lib/data";
import { daysUntil, formatDate } from "@/lib/utils";

export const metadata = { title: "Election Timeline" };

export default async function TimelinePage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const { region } = await searchParams;
  const events = await getTimeline(region);

  return (
    <>
      <PageHeader eyebrow="Calendar" title="Interactive election timeline" description="Track registration, nominations, campaigning, polling, counting, and result publication by region." />
      <section className="section-shell grid gap-4">
        {events.map((event) => (
          <Card key={`${event.title}-${event.startsAt}`}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> {event.title}</CardTitle>
                <Badge variant="outline">{event.region}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[1fr_12rem]">
              <p className="text-sm leading-6 text-muted-foreground">{event.description}</p>
              <div className="rounded-md bg-muted p-3">
                <p className="font-semibold">{formatDate(event.startsAt)}</p>
                <p className="text-sm text-muted-foreground">{daysUntil(event.startsAt)} days remaining</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
