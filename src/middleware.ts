import { config as siteConfig } from "@/lib/config";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

function isRewriteExcluded(req: Request): boolean {
  const { pathname } = new URL(req.url);
  return pathname.startsWith("/monitoring") || pathname.startsWith("/ingest");
}

export default clerkMiddleware(async (auth, req) => {
  // Protected route/auth checks
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  if (isApiRoute(req)) {
    if (!isPublicApiRoute(req)) {
      await auth.protect();
    }
  }

  // Skip rewriting for these routes
  if (isRewriteExcluded(req)) {
    return NextResponse.next();
  }

  const hostname = req.headers.get("host");
  const baseDomain = siteConfig.domain;

  // Skip if this is the main domain or www subdomain
  if (hostname === baseDomain || hostname === `www.${baseDomain}`) {
    return NextResponse.next();
  }

  // Get subdomain by removing the base domain
  const subdomain = hostname?.replace(`.${baseDomain}`, "");

  // Skip if no subdomain or if it's www
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  function rewriteSubdomains(req: Request, baseDomain: string, siteId: string) {
    const { pathname, search } = new URL(req.url);
    const rewriteUrl = new URL(
      `https://${baseDomain}/sites/${siteId}${pathname}`
    );
    rewriteUrl.search = search;

    const res = NextResponse.rewrite(rewriteUrl);
    res.headers.set("x-middleware-rewrite", rewriteUrl.toString());
    res.headers.set("x-original-host", req.headers.get("host") ?? "");
    return res;
  }

  try {
    // Call our API route to lookup the site
    const response = await fetch(
      `${new URL(req.url).origin}/api/sites/lookup/${subdomain}`
    );

    if (!response.ok) {
      return NextResponse.next();
    }

    const site = await response.json();

    // Only allow access to published sites
    if (!site.published) {
      return NextResponse.next();
    }

    return rewriteSubdomains(req, baseDomain, site._id);
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
