import Image from "next/image";
import { Tiles } from "./Tiles";
import { initials } from "@/lib/content";

/**
 * Portret rasmi. `file` bo'sh bo'lsa, naqshli ramka va ism bosh harflari chiqadi,
 * shuning uchun rasmlar hali tayyor bo'lmasa ham sahifa to'liq ko'rinadi.
 */
export function Portrait({
  dir,
  file,
  name,
  alt,
  sizes,
  seed = 0,
  priority = false,
}: {
  dir: "speakers" | "team";
  file: string;
  name: string;
  alt: string;
  sizes: string;
  seed?: number;
  priority?: boolean;
}) {
  return (
    <div className="octagon relative aspect-[4/5] overflow-hidden bg-lapis">
      {file ? (
        <Image
          src={`/images/${dir}/${file}`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0">
          <Tiles cols={4} rows={5} seed={seed} className="absolute inset-0 h-full w-full" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="bg-lapis px-4 py-2 font-display text-5xl leading-none text-glaze-light">
              {initials(name)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
