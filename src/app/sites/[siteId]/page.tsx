"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/countdown-timer";
import { GenderPoll } from "@/components/gender-poll";
import { WelcomeHero } from "@/components/welcome-hero";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Love_Ya_Like_A_Sister } from "next/font/google";
import { redirect, useParams } from "next/navigation";

const font = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: ["400"],
});

export default function PreviewPage() {
  const { siteId } = useParams();
  const settings = useQuery(api.settings.get, {
    siteId: siteId as Id<"sites">,
  });

  if (!settings) {
    return null;
  }

  const targetDate = new Date(settings.announcementDate).getTime();
  const now = new Date().getTime();
  const expired = now > targetDate;

  if (expired) {
    redirect(`/sites/${siteId}/reveal`);
  }

  return (
    <AnimatedBackground variant="default" density="high">
      <div
        className={cn("min-h-screen flex items-center pt-16", font.variable)}
      >
        <div className="container mx-auto px-4 py-12 font-love-ya-like-a-sister">
          <div className="max-w-4xl mx-auto space-y-12">
            <WelcomeHero />
            {settings.features.showGenderPoll && <GenderPoll />}
            {settings.features.showCountdown && <CountdownTimer />}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
