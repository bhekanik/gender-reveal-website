"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { SiteLayout } from "@/components/layouts/site-layout";
import { SettingsForm } from "@/components/settings/settings-form";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const auth = useAuth();

  const settings = useQuery(api.settings.get, { siteId });

  if (!settings || !auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <SiteLayout siteId={siteId}>
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Site Settings
                </h1>
                <p className="text-xl text-neutral-600">
                  Customize your baby reveal site settings and content
                </p>
              </div>

              <div className="bg-white shadow-sm border border-neutral-200 rounded-2xl p-8">
                <SettingsForm settings={settings} />
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/sites/${siteId}`)}
                >
                  Back to Site
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedBackground>
    </SiteLayout>
  );
}
