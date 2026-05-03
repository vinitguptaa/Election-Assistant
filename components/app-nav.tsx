"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bot, CalendarDays, LayoutDashboard, LogIn, MapPinned, Moon, Search, ShieldCheck, Sun, UsersRound, Vote } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/timeline", label: "Timeline", icon: CalendarDays },
  { href: "/eligibility", label: "Eligibility", icon: ShieldCheck },
  { href: "/polling-booths", label: "Booths", icon: MapPinned },
  { href: "/candidates", label: "Candidates", icon: UsersRound },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
  { href: "/login", label: "Login", icon: LogIn }
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold" aria-label="CivicPulse home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Vote className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">CivicPulse</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  pathname === item.href && "bg-muted text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
                placeholder="Search"
                aria-label="Search CivicPulse"
                className="h-10 w-40 sm:w-56"
              />
              <Button type="submit" variant="outline" size="icon" aria-label="Submit search">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="outline" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={() => setDark((value) => !value)} aria-label="Toggle dark mode">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <nav className="section-shell flex gap-2 overflow-x-auto pb-3 lg:hidden" aria-label="Mobile primary">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md border bg-card px-3 py-2 text-sm">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
