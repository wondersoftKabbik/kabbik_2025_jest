import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en', 'bl']
 function getLocale(request: Request) { 
    let headers = { 'accept-language': 'en,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'en'
    
    return match(languages, locales, defaultLocale) // -> 'en-US'
  }


function withCorsHeaders(response: NextResponse, origin: string = "*") {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, user-token, oc-status"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
export function middleware(req: NextRequest) {

  // "languages"
   const { pathname } = req.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(req)
  req.nextUrl.pathname = `/${locale}${pathname}`
  console.log(req.nextUrl.pathname);
  // e.g. incoming req is /products
  // The new URL is now /en-US/products
  if(!req.nextUrl.pathname.includes("/download-app")){
    return NextResponse.redirect(req.nextUrl)
  }
  // languages

  const origin = req.headers.get("origin") || "*";
  const method = req.method;
  // const redirectUrlFullPath = "http://localhost:3000/unauthorized";
  // const redirectUrlFullPath = "https://pwa.kabbik.com/unauthorized";

  if (method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    return withCorsHeaders(res, origin);
  }
  const { ua, device, os } = userAgent(req);
  if (os.name?.toLowerCase() === "ios" || os.name?.toLowerCase() === "macos") {
    const res= NextResponse.redirect(
      "https://apps.apple.com/us/app/kabbik-audiobooks-podcast/id6459885875"
      // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
    );
    return withCorsHeaders(res, origin);
  } else if (os.name?.toLowerCase() === "android") {
    const res =  NextResponse.redirect(
      "https://play.google.com/store/apps/details?id=com.kabbik.app"
      // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
    );
    return withCorsHeaders(res, origin);
  } else {
    const res= NextResponse.redirect(
      "https://play.google.com/store/apps/details?id=com.kabbik.app"
      // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
    );
    return withCorsHeaders(res, origin);
  }
}

// export const config = {
//   matcher: "/download-app",
// };

export const config = {
  matcher: [
    '/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.txt|.*\\.json).*)',

    // Explicit route (e.g. for tracking app downloads)
    '/download-app',
  ],
}