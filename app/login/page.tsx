import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="section-shell grid min-h-[calc(100vh-16rem)] items-center gap-8 py-10 lg:grid-cols-[1fr_26rem]">
      <div className="max-w-3xl">
        <Badge variant="outline">Secure access</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Sign in or create an account to continue</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          CivicPulse keeps election tools behind an authenticated workspace, including assistant chat, eligibility checks, search, candidate comparison, and admin analytics.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Protected app access", "Credentials auth", "Role-ready access"].map((item) => (
            <div key={item} className="rounded-md border bg-card p-4 text-sm font-medium">
              <ShieldCheck className="mb-3 h-5 w-5 text-secondary" aria-hidden />
              {item}
            </div>
          ))}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account access</CardTitle>
          <CardDescription>Use the prefilled demo credentials or create an account for review deployments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-48 rounded-md bg-muted" />}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
