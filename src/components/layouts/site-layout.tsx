"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

interface SiteLayoutProps extends PropsWithChildren {
  siteId: Id<"sites">;
}

export function SiteLayout({ children, siteId }: SiteLayoutProps) {
  const router = useRouter();
  const site = useQuery(api.sites.getSite, { siteId });
  const user = useQuery(api.users.getUser);

  // Redirect if site doesn't exist or user doesn't have access
  if (site === null) {
    router.push("/dashboard");
    return null;
  }

  if (site && user && site.userId !== user._id) {
    toast.error("You don't have access to this site");
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-8 hidden md:flex">
            <Button
              variant="ghost"
              onClick={() => router.push(`/sites/${siteId}`)}
            >
              {site?.siteName || "Loading..."}
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => router.push(`/sites/${siteId}`)}
              >
                Preview
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/sites/${siteId}/settings`)}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/sites/${siteId}/quiz`)}
              >
                Quiz
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/sites/${siteId}/reveal`)}
              >
                Reveal
              </Button>
              <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            </nav>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
