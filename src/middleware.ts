import { api } from "@/convex/_generated/api";
import { config as siteConfig } from "@/lib/config";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/account(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);
const isPublicApiRoute = createRouteMatcher([
  "/api/og",
  "/api/webhooks/auth",
  "/api/webhooks/stripe",
  "/api/webhooks/emails",
  "/api/stripe/create-customer",
  "/api/changelogs",
  "/api/feature-requests",
  "/api/public/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  if (isApiRoute(req)) {
    if (!isPublicApiRoute(req)) {
      await auth.protect();
    }
  }

  const hostname = req.headers.get("host");
  const baseDomain = siteConfig.domain;

  // Skip if this is the main domain
  if (hostname === baseDomain) {
    return NextResponse.next();
  }

  // Get subdomain by removing the base domain
  const subdomain = hostname?.replace(`.${baseDomain}`, "");

  if (!subdomain) {
    return NextResponse.next();
  }

  try {
    // Look up the site by subdomain
    const site = await convex.query(api.sites.getSiteBySubdomain, {
      subdomain,
    });

    if (!site) {
      // If no site is found, you might want to redirect to a 404 page
      // or show some kind of error page
      return NextResponse.redirect(new URL("/404", req.url));
    }

    // Rewrite the URL to the dashboard path
    const url = req.nextUrl.clone();
    url.pathname = `/sites/${site._id}`;

    return NextResponse.rewrite(url);
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/500", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
