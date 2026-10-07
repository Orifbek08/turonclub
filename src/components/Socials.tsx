import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaYoutube } from "react-icons/fa6";
import { site } from "@content/site";

const networks = [
  { key: "instagram", name: "Instagram", Icon: FaInstagram, always: false },
  { key: "linkedin", name: "LinkedIn", Icon: FaLinkedinIn, always: false },
  { key: "facebook", name: "Facebook", Icon: FaFacebookF, always: false },
  { key: "telegram", name: "Telegram", Icon: FaTelegram, always: false },
  { key: "youtube", name: "YouTube", Icon: FaYoutube, always: false },
] as const;

/** Ko'rsatiladigan tarmoqlar ro'yxati (havolasi bor-yo'qligi bilan) */
export function socialList() {
  return networks
    .map((n) => ({ ...n, url: site.socials[n.key] }))
    .filter((n) => n.always || n.url);
}

/** Faqat havolasi yozilgan tarmoqlar manzillari (schema.org uchun) */
export function socialUrls(): string[] {
  return networks.map((n) => site.socials[n.key]).filter(Boolean);
}

/**
 * Ijtimoiy tarmoq belgilari. Faqat content/site.ts da havolasi yozilgan tarmoqlar chiqadi.
 */
export function Socials({ size = "md", label }: { size?: "md" | "lg"; label: string }) {
  const box = size === "lg" ? "h-16 w-16 text-2xl" : "h-12 w-12 text-lg";
  const base = `grid ${box} place-items-center border border-[var(--hair)] transition-colors duration-500`;
  return (
    <ul className="flex flex-wrap gap-3" aria-label={label}>
      {socialList().map(({ key, name, Icon, url }) => (
        <li key={key}>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener"
              aria-label={name}
              title={name}
              className={`${base} text-gold-light hover:border-gold hover:bg-gold hover:text-night`}
            >
              <Icon aria-hidden="true" />
            </a>
          ) : (
            <span role="img" aria-label={name} title={name} className={`${base} text-gold-light/70`}>
              <Icon aria-hidden="true" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
