"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { SettingsForm } from "@/components/settings/settings-form";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const settings = useQuery(api.settings.get);
  const setDefaultSettings = useMutation(api.settings.setDefaultSettings);

  useEffect(() => {
    const initializeSettings = async () => {
      if (settings === null) {
        await setDefaultSettings({});
      }
    };

    initializeSettings();
  }, [settings, setDefaultSettings]);

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
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
                onClick={() => router.push("/")}
                variant="outline"
                className="px-6 py-3 rounded-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
