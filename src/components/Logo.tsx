import { mark, tag, word } from "./logo-paths";

/** Logotip belgisi (yer shari va qo'l siqish) */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${mark.w} ${mark.h}`} className={className} fill="currentColor" fillRule="evenodd">
      <path d={mark.d} />
    </svg>
  );
}

/** "TURON" yozuvi */
export function LogoWord({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${word.w} ${word.h}`} className={className} fill="currentColor" fillRule="evenodd">
      <path d={word.d} />
    </svg>
  );
}

/** "XALQARO BIZNES KLUBI" yozuvi */
export function LogoTag({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${tag.w} ${tag.h}`} className={className} fill="currentColor" fillRule="evenodd">
      <path d={tag.d} />
    </svg>
  );
}

/** To'liq logotip, ustma-ust joylashuv */
export function LogoStack({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <LogoMark className="h-[5.5em] w-auto" />
      <LogoWord className="mt-[1.4em] h-[2.9em] w-auto" />
      <LogoTag className="mt-[0.65em] h-[0.8em] w-auto" />
    </span>
  );
}
