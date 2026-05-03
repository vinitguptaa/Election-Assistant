"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBox({ defaultQuery = "" }: { defaultQuery?: string }) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center gap-2">
      <Input name="q" defaultValue={defaultQuery} placeholder="Search candidates, booths, news, dates, parties..." aria-label="Search CivicPulse content" className="h-11" />
      <Button type="submit" className="h-11">
        <Search className="h-4 w-4" aria-hidden />
        Search
      </Button>
    </form>
  );
}
