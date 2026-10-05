import { events, type ClubEvent } from "@content/events";
import { speakers, type Speaker } from "@content/speakers";
import { todayInTashkent } from "./i18n";

export function splitEvents(): { upcoming: ClubEvent[]; past: ClubEvent[] } {
  const today = todayInTashkent();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((e) => e.date >= today),
    past: sorted.filter((e) => e.date < today).reverse(),
  };
}

export function findSpeaker(slug: string): Speaker | undefined {
  return speakers.find((s) => s.slug === slug);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
