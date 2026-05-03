import { Newspaper, ShieldCheck } from "lucide-react";
import { FakeNewsChecker } from "@/components/fake-news-checker";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "News and Notifications" };

export default async function NewsPage() {
  const articles = await getNews({});

  return (
    <>
      <PageHeader eyebrow="Verified information" title="Election news, alerts, and fact checks" description="Aggregate official updates, verified source badges, sentiment signals, and AI-assisted misinformation detection." />
      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_24rem]">
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Newspaper className="h-5 w-5 text-primary" /> {article.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="leading-7 text-muted-foreground">{article.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={article.verified ? "success" : "warning"}>{article.verified ? "Verified source" : "Unverified claim"}</Badge>
                  <Badge variant="outline">{article.region}</Badge>
                  <Badge variant="outline">{article.sentiment}</Badge>
                  <Badge variant="outline">{formatDate(article.publishedAt)}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Notification readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Push, email, and SMS reminder APIs are shaped for production providers through `/api/notifications`.</p>
              <p>Use role-based admin workflows to publish official alerts only from verified sources.</p>
            </CardContent>
          </Card>
          <FakeNewsChecker />
        </aside>
      </section>
    </>
  );
}
