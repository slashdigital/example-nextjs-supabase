import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import acceptLanguage from "accept-language";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const cookieName = "system-language";

const fallbackLng = "en";
const languages = [fallbackLng, "km"];

acceptLanguage.languages(languages);

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // console.log('sdfsdsf', await supabase.rpc('get_my_claim', {
  //   claim: 'superadmin'
  // }));

  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // Is valid token and redirect to Dashboard page
  if (
    user &&
    (req.nextUrl.pathname.indexOf(`/${lng}/login`) !== -1 ||
      req.nextUrl.pathname.indexOf(`/${lng}/dashboard`) === -1)
  ) {
    return NextResponse.redirect(new URL(`/${lng}/dashboard`, req.url));
  } else if (!user && req.nextUrl.pathname.indexOf(`/${lng}/login`) === -1) {
    return NextResponse.redirect(new URL(`/${lng}/login`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:locale*"],
};
