"use client";

import { SiteLayout } from "@/components/layouts/site-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import {
  Baby,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  Eye,
  Globe,
  Settings,
  Share2,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SitePage() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const site = useQuery(api.sites.getSite, { siteId });
  const settings = useQuery(api.settings.get, { siteId });
  const babies = useQuery(api.settings.getBabies, { siteId }) ?? [];

  if (!site || !settings) {
    return null;
  }

  const siteUrl = `https://${site.subdomain}.${config.domain}`;
  const revealDate = new Date(settings.announcementDate);
  const isRevealPassed = new Date() > revealDate;

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6 p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {site.siteName}
            </h1>
            <p className="text-muted-foreground">
              Created on {format(site.createdAt, "MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href={`/preview/${siteId}`}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/sites/${siteId}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              {site.published ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {site.published ? "Published" : "Draft"}
              </div>
              <p className="text-xs text-muted-foreground">
                {site.published
                  ? "Your site is live and accessible"
                  : "Your site is not yet published"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan</CardTitle>
              <Crown className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {site.paid ? "Premium" : "Free"}
              </div>
              <p className="text-xs text-muted-foreground">
                {site.paid
                  ? "All features unlocked"
                  : "Upgrade to unlock all features"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reveal Date</CardTitle>
              <Calendar className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {format(revealDate, "MMM d")}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRevealPassed ? "Reveal completed" : "Upcoming reveal"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Babies</CardTitle>
              <Baby className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{babies.length}</div>
              <p className="text-xs text-muted-foreground">
                {babies.length === 1 ? "Baby" : "Babies"} registered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Site Details</CardTitle>
              <CardDescription>
                Basic information about your reveal site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Site URL</p>
                  <p className="text-sm text-muted-foreground">{siteUrl}</p>
                </div>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Visitors Access</p>
                  <p className="text-sm text-muted-foreground">
                    {site.published ? "Public" : "Private"}
                  </p>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-sm font-medium">Quick Actions</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/sites/${siteId}/settings`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Settings
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Active features on your reveal site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm">Countdown Timer</p>
                </div>
                {settings.features.showCountdown ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <p className="text-sm">Gender Poll</p>
                </div>
                {settings.features.showGenderPoll ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4" />
                  <p className="text-sm">Gender Quiz</p>
                </div>
                {settings.features.showGenderQuiz ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
