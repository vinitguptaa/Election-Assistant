import { Mail, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = { title: "Contact and Support" };

export default function SupportPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Contact election support" description="Route voter questions, accessibility requests, booth corrections, and verified source updates to the right civic team." />
      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_24rem]">
        <Card>
          <CardHeader>
            <CardTitle>Support request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Full name" aria-label="Full name" />
            <Input placeholder="Email address" type="email" aria-label="Email address" />
            <Input placeholder="Region or constituency" aria-label="Region or constituency" />
            <Textarea placeholder="Describe your election support request" aria-label="Support request" />
            <Button><Send className="h-4 w-4" /> Submit request</Button>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-sm">support@civicpulse.example</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <Phone className="h-5 w-5 text-primary" />
              <p className="text-sm">1800-000-CIVIC</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
