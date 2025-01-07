"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/countdown-timer";
import { GenderPoll } from "@/components/gender-poll";
import { WelcomeHero } from "@/components/welcome-hero";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";

export default function HomePage() {
  const { subdomain } = useParams();
  const settings = useQuery(api.settings.getBySubdomain, {
    subdomain: subdomain as string,
  });

  if (!settings) {
    return null;
  }

  const targetDate = new Date(settings.announcementDate).getTime();
  const now = new Date().getTime();
  const expired = now > targetDate;

  if (expired) {
    redirect("/reveal");
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12">
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
