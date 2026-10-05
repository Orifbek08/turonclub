import { events, type ClubEvent } from "@content/events";
import { founders, type Founder } from "@content/founders";
import { todayInTashkent } from "./i18n";

export function splitEvents(): { upcoming: ClubEvent[]; past: ClubEvent[] } {
  const today = todayInTashkent();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((e) => e.date >= today),
    past: sorted.filter((e) => e.date < today).reverse(),
  };
}

export function findFounder(slug: string): Founder | undefined {
  return founders.find((f) => f.slug === slug);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
