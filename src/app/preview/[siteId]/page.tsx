"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/countdown-timer";
import { GenderPoll } from "@/components/gender-poll";
import { WelcomeHero } from "@/components/welcome-hero";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

export default function PreviewPage() {
  const user = useUser();

  if (!user.isSignedIn) {
    redirect("/sign-in");
  }

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
    redirect("/reveal");
  }

  return (
    <>
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
            <span className="font-medium">Preview Mode</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              This is a preview of how your site will appear to visitors
            </span>
            <Link
              href={`/dashboard/sites/${siteId}/settings`}
              className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Back to Settings</span>
            </Link>
          </div>
        </div>
      </div>
      <AnimatedBackground>
        <div className="min-h-screen flex items-center pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
              <WelcomeHero />
              {settings.features.showGenderPoll && <GenderPoll />}
              {settings.features.showCountdown && <CountdownTimer />}
            </div>
          </div>
        </div>
      </AnimatedBackground>
    </>
  );
}
