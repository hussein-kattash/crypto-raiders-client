import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix } from "./config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale: "ar",
  pathnames,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(ru|en|ar)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
