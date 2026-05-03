import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" | "success" | "warning" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "outline" && "border bg-background",
        variant === "success" && "bg-emerald-600 text-white",
        variant === "warning" && "bg-amber-500 text-slate-950",
        className
      )}
      {...props}
    />
  );
}
