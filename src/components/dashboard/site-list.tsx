"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Baby, Calendar, Eye, Settings, Users } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "./empty-state";

interface SiteListProps {
  userId: Id<"users">;
}

export function SiteList({ userId }: SiteListProps) {
  const sites = useQuery(api.sites.getUserSites, { userId });

  if (!sites?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <Card key={site._id} className="overflow-hidden">
          <CardHeader className="border-b bg-muted/40 p-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Baby className="size-5" />
              {site.siteName}
            </CardTitle>
            <CardDescription className="line-clamp-1">
              {site.siteName || "No description"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {new Date(site.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  {0} visitors
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-6 w-fit items-center gap-1 rounded-full px-2 text-xs font-medium",
                    site.published
                      ? "bg-green-500/10 text-green-700"
                      : "bg-yellow-500/10 text-yellow-700"
                  )}
                >
                  {site.published ? "Published" : "Draft"}
                </div>
                {site.paid && (
                  <div className="flex h-6 w-fit items-center gap-1 rounded-full bg-blue-500/10 px-2 text-xs font-medium text-blue-700">
                    Premium
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-2 border-t p-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/preview/${site._id}`}>
                <Eye className="mr-2 size-4" />
                Preview
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/sites/${site._id}/settings`}>
                <Settings className="mr-2 size-4" />
                Settings
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
