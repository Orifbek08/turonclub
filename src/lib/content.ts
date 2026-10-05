import { founders, type Founder } from "@content/founders";

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
