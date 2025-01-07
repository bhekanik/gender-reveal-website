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
import { Doc } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import {
  Baby,
  CheckCircle2,
  Clock,
  Eye,
  Settings,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface SiteListProps {
  site: Doc<"sites">;
}

export function SiteCard({ site }: SiteListProps) {
  const settings = useQuery(api.settings.get, { siteId: site._id });
  const babies = useQuery(api.settings.getBabies, { siteId: site._id }) ?? [];

  const formatDate = (date: number) => {
    return format(date, "MMMM d, yyyy");
  };

  return (
    <Card key={site._id} className="overflow-hidden">
      <CardHeader className="border-b bg-muted/40 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Baby className="size-5" />
            {site.siteName}
          </CardTitle>
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
        <CardDescription className="line-clamp-1">
          {site.subdomain
            ? `${site.subdomain}.${config.domain}`
            : "No subdomain set"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        {settings && (
          <>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                Reveal Date: {formatDate(settings.announcementDate)}
              </div>
              <div className="flex flex-wrap gap-1">
                {babies.map((baby, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      baby.gender === "boy"
                        ? "bg-blue-500/10 text-blue-700"
                        : "bg-pink-500/10 text-pink-700"
                    )}
                  >
                    <Baby className="size-3" />
                    {baby.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-1">
              <p className="text-xs font-medium text-muted-foreground">
                Features
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  {settings.features.showCountdown ? (
                    <CheckCircle2 className="size-3 text-green-600" />
                  ) : (
                    <XCircle className="size-3 text-muted-foreground" />
                  )}
                  Countdown
                </div>
                <div className="flex items-center gap-1">
                  {settings.features.showGenderPoll ? (
                    <CheckCircle2 className="size-3 text-green-600" />
                  ) : (
                    <XCircle className="size-3 text-muted-foreground" />
                  )}
                  Gender Poll
                </div>
                <div className="flex items-center gap-1">
                  {settings.features.showGenderQuiz ? (
                    <CheckCircle2 className="size-3 text-green-600" />
                  ) : (
                    <XCircle className="size-3 text-muted-foreground" />
                  )}
                  Gender Quiz
                </div>
              </div>
            </div>
          </>
        )}
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
  );
}
