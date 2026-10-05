import Image from "next/image";
import { Tiles } from "./Tiles";
import { initials } from "@/lib/content";

/**
 * Portret: oltin hoshiyali sakkiz qirrali ramka, naqshli fon ustida fonsiz rasm.
 * `file` bo'sh bo'lsa, o'rnida ism bosh harflari chiqadi.
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
      <div className="octagon relative aspect-square overflow-hidden bg-deep">
        <Tiles cols={5} rows={5} seed={seed} density={29} className="absolute inset-0 h-full w-full opacity-60" />
        <div className="frame-inner absolute inset-0">
          {file ? (
            <Image
              src={`/images/founders/${file}`}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-top"
            />
          ) : (
            <span role="img" aria-label={alt} className="absolute inset-0 grid place-items-center">
              <span className="bg-deep px-5 py-3">
                <span className="gold-text font-display text-6xl leading-none">{initials(name) || "T"}</span>
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
