import { Badge } from "@/components/ui/badge";

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="section-shell py-10 md:py-14">
      <Badge variant="outline">{eyebrow}</Badge>
      <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
    </section>
  );
}
