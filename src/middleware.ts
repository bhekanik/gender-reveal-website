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

  console.log("hostname:", hostname);
  console.log("baseDomain:", baseDomain);

  // Skip if this is the main domain
  if (hostname === baseDomain) {
    return NextResponse.next();
  }

  // Get subdomain by removing the base domain
  const subdomain = hostname?.replace(`.${baseDomain}`, "");

  console.log("subdomain:", subdomain);

  if (!subdomain) {
    return NextResponse.next();
  }

  try {
    // Call our API route to lookup the site
    const response = await fetch(`${req.url}/api/sites/lookup/${subdomain}`);

    if (!response.ok) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    const site = await response.json();

    // Only allow access to published sites
    if (!site.published) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    // Rewrite the URL to the sites path with the site ID
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
