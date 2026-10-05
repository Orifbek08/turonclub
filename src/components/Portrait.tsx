import Image from "next/image";
import { Tiles } from "./Tiles";
import { initials } from "@/lib/content";

/**
 * Portret rasmi, oltin hoshiyali sakkiz qirrali ramkada.
 * `file` bo'sh bo'lsa, naqsh va ism bosh harflari chiqadi, shuning uchun
 * rasmlar hali tayyor bo'lmasa ham sahifa to'liq ko'rinadi.
 */
export function Portrait({
  file,
  name,
  alt,
  sizes,
  seed = 0,
  priority = false,
}: {
  file: string;
  name: string;
  alt: string;
  sizes: string;
  seed?: number;
  priority?: boolean;
}) {
  return (
    <div className="frame octagon">
      <div className="octagon relative aspect-[4/5] overflow-hidden bg-deep">
        <div className="frame-inner absolute inset-0">
          {file ? (
            <Image
              src={`/images/founders/${file}`}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          ) : (
            <div role="img" aria-label={alt} className="absolute inset-0">
              <Tiles cols={4} rows={5} seed={seed} density={11} className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="bg-deep px-5 py-3">
                  <span className="gold-text font-display text-6xl leading-none">{initials(name)}</span>
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
