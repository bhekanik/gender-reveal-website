"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/countdown-timer";
import { GenderPoll } from "@/components/gender-poll";
import { WelcomeHero } from "@/components/welcome-hero";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const announcementDate = useQuery(api.settings.getAnnouncementDate);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!announcementDate) return;

    const targetDate = new Date(announcementDate).getTime();
    const now = new Date().getTime();
    const expired = now > targetDate;

    setIsExpired(expired);

    if (expired) {
      router.push("/reveal");
      return;
    }
  }, [announcementDate, router]);

  if (isExpired) {
    return null;
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <WelcomeHero />
            <GenderPoll />
            <CountdownTimer />
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
