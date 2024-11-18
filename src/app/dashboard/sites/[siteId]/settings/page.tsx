"use client";

import { SiteLayout } from "@/components/layouts/site-layout";
import { BabyDetailsForm } from "@/components/settings/baby-details-form";
import { DangerZone } from "@/components/settings/danger-zone";
import { DateTimeForm } from "@/components/settings/date-time-form";
import { RevealSettingsForm } from "@/components/settings/reveal-settings-form";
import { SettingsForm } from "@/components/settings/settings-form";
import { SharingForm } from "@/components/settings/sharing-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  Baby,
  Calendar,
  ChevronRight,
  Layout,
  Share2,
  Shield,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const settings = useQuery(api.settings.get, { siteId });
  const site = useQuery(api.sites.getSite, { siteId });
  const [activeTab, setActiveTab] = useState("general");

  if (!settings || !site) {
    return (
      <SiteLayout siteId={siteId}>
        <div className="container max-w-5xl space-y-6 p-8">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Separator />
          <div className="grid gap-6">
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  const tabs = [
    { value: "general", icon: Layout, label: "General" },
    { value: "reveal", icon: Sparkles, label: "Reveal" },
    { value: "baby", icon: Baby, label: "Baby Details" },
    { value: "date", icon: Calendar, label: "Date & Time" },
    { value: "sharing", icon: Share2, label: "Sharing" },
    { value: "danger", icon: Shield, label: "Danger Zone" },
  ];

  return (
    <SiteLayout siteId={siteId}>
      <div className="container max-w-5xl space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
            <p className="text-muted-foreground">
              Manage your site preferences and configuration.
            </p>
          </div>
          <Button>
            View Site
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <Card>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`flex-1 border-b-2 px-4 py-3 ${
                      activeTab === tab.value
                        ? "border-primary font-semibold"
                        : "border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <tab.icon className="mr-2 h-5 w-5" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="p-6">
                <TabsContent value="general">
                  <SettingsForm settings={settings} />
                </TabsContent>
                <TabsContent value="reveal">
                  <RevealSettingsForm settings={settings} />
                </TabsContent>
                <TabsContent value="baby">
                  <BabyDetailsForm siteId={siteId} />
                </TabsContent>
                <TabsContent value="date">
                  <DateTimeForm settings={settings} />
                </TabsContent>
                <TabsContent value="sharing">
                  <SharingForm site={site} settings={settings} />
                </TabsContent>
                <TabsContent value="danger">
                  <Card className="border-2 border-destructive bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="text-destructive">
                        Danger Zone
                      </CardTitle>
                      <CardDescription>
                        These actions are irreversible. Please proceed with
                        caution.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DangerZone />
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
