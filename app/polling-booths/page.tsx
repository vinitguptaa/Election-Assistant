import { ExternalLink, MapPinned, Navigation } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooths } from "@/lib/data";

export const metadata = { title: "Polling Booth Finder" };

export default async function BoothPage({ searchParams }: { searchParams: Promise<{ region?: string; pinCode?: string }> }) {
  const filters = await searchParams;
  const booths = await getBooths(filters);

  return (
    <>
      <PageHeader eyebrow="Polling workflow" title="Find polling booths and queue estimates" description="Search stations by region or PIN code, check accessibility, opening hours, route links, and mock real-time crowd levels." />
      <section className="section-shell grid gap-4 lg:grid-cols-[0.85fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPinned className="h-5 w-5" /> Map preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,76,129,.14)_1px,transparent_1px),linear-gradient(rgba(20,116,111,.14)_1px,transparent_1px)] bg-[size:36px_36px]" />
              {booths.map((booth, index) => (
                <div
                  key={booth.name}
                  className="absolute rounded-full bg-primary p-2 text-primary-foreground shadow-lg"
                  style={{ left: `${24 + index * 24}%`, top: `${32 + index * 16}%` }}
                  title={booth.name}
                >
                  <MapPinned className="h-4 w-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          {booths.map((booth) => (
            <Card key={booth.name}>
              <CardHeader>
                <CardTitle>{booth.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{booth.address}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PIN {booth.pinCode}</Badge>
                  <Badge variant={booth.accessibility ? "success" : "warning"}>{booth.accessibility ? "Accessible" : "Limited access"}</Badge>
                  <Badge variant={booth.queueLevel > 3 ? "warning" : "success"}>Queue level {booth.queueLevel}/5</Badge>
                </div>
                <Button asChild variant="outline">
                  <a href={`https://www.openstreetmap.org/?mlat=${booth.latitude}&mlon=${booth.longitude}#map=16/${booth.latitude}/${booth.longitude}`} target="_blank" rel="noreferrer">
                    <Navigation className="h-4 w-4" /> Route <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
