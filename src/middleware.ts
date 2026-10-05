import { NextResponse, type NextRequest } from "next/server";

const locales = ["uz", "uz-cyrl", "ru", "en"];

/** Til ko'rsatilmagan manzilni mos tilga yo'naltiradi: "/" -> "/uz" */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = (request.headers.get("accept-language") ?? "").toLowerCase();
  const preferred = accept
    .split(",")
    .map((part) => part.trim().slice(0, 2))
    .find((code) => locales.includes(code));

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred ?? "uz"}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // API, Next ichki fayllari va kengaytmali fayllar (rasm, sitemap.xml...) bundan mustasno
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
