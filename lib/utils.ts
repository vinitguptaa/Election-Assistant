import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata"
  }).format(new Date(value));
}

export function daysUntil(value: string | Date) {
  const diff = new Date(value).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function safeJson<T>(value: unknown, fallback: T): T {
  return value as T | undefined ?? fallback;
}
