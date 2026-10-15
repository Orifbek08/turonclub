import Script from "next/script";

/**
 * Meta (Facebook/Instagram) piksellari — target reklama natijalarini o'lchash uchun.
 * Bir nechta piksel bo'lsa, har bir hodisa hammasiga yuboriladi.
 */
export const META_PIXEL_IDS = ["2096668338389476", "1726064479077063"];

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
${META_PIXEL_IDS.map((id) => `fbq('init','${id}');`).join("")}fbq('track','PageView');`}
      </Script>
      <noscript>
        {META_PIXEL_IDS.map((id) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          />
        ))}
      </noscript>
    </>
  );
}

/** Piksel hodisasi (piksel yuklanmagan bo'lsa jim o'tadi) */
export function track(event: string, params?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    fbq?.("track", event, params);
  } catch {}
}
