"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/demo/countdown-timer";
import { GenderPoll } from "@/components/demo/gender-poll";
import { WelcomeHero } from "@/components/demo/welcome-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Love_Ya_Like_A_Sister } from "next/font/google";
import Link from "next/link";

const font = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: ["400"],
});

const DEMO_SETTINGS = {
  welcomeHeroText: "Welcome to Our Baby Reveal!",
  announcementDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  features: {
    showGenderPoll: true,
    showCountdown: true,
    showGenderQuiz: true,
  },
};

export default function DemoPage() {
  return (
    <>
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 bg-indigo-600 text-white py-3 px-4 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-medium">Demo Mode</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden sm:inline">
              This is a demo of how your reveal site could look
            </span>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AnimatedBackground variant="default" density="high">
        <div
          className={cn("min-h-screen flex items-center pt-16", font.variable)}
        >
          <div className="container mx-auto px-4 py-12 font-love-ya-like-a-sister">
            <div className="max-w-4xl mx-auto space-y-12">
              <WelcomeHero settings={DEMO_SETTINGS} />
              <GenderPoll />
              <CountdownTimer targetDate={DEMO_SETTINGS.announcementDate} />
            </div>
          </div>
        </div>
      </AnimatedBackground>
    </>
  );
}
