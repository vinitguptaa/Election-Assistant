import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Election Awareness Quiz" };

const quiz = [
  { q: "When should campaigning usually stop?", a: "During the notified silence period before polling." },
  { q: "What does VVPAT help voters verify?", a: "That the printed slip reflects the selected candidate." },
  { q: "What should you do with viral date-change claims?", a: "Check official commission notices before sharing." }
];

export default function QuizPage() {
  return (
    <>
      <PageHeader eyebrow="Gamified awareness" title="Election awareness quiz" description="A lightweight civic learning module for awareness campaigns, schools, and community outreach." />
      <section className="section-shell grid gap-4 md:grid-cols-3">
        {quiz.map((item, index) => (
          <Card key={item.q}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-accent" /> Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{item.q}</p>
              <Badge className="mt-4" variant="outline">{item.a}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
