import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, prefixedLocales } from "@/lib/i18n";

/**
 * Dutch is served from the root but every page lives under `src/app/[lang]`,
 * so unprefixed requests get rewritten (not redirected) to `/nl/...`. The
 * visitor keeps the clean URL; the router still sees a `lang` param.
 *
 * `/nl/...` requested directly is redirected away permanently, so the Dutch
 * pages only ever have one indexable URL.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const isPrefixed = prefixedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (isPrefixed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /** Skip the API, Next internals, and anything that looks like a file. */
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
