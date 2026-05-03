import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNav } from "@/components/app-nav";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "CivicPulse Election Assistant",
    template: "%s | CivicPulse"
  },
  description: "AI-powered election guidance for timelines, registration, eligibility, polling booths, candidates, verified news, and civic FAQs.",
  keywords: ["election assistant", "voter registration", "polling booth", "candidate comparison", "AI civic tech"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "CivicPulse Election Assistant",
    description: "Understand election processes with accessible AI guidance and verified civic data.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="government-band h-1.5 w-full" />
        <AppNav />
        <main>{children}</main>
        <footer className="mt-16 border-t bg-card py-8">
          <div className="section-shell flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>CivicPulse provides neutral election guidance. Always verify legal deadlines with official election authorities.</p>
            <p>Accessibility-first, multilingual-ready, and deployment-ready.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
