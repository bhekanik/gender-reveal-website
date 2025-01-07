"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

export function WelcomeHero() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const settings = useQuery(api.settings.get, { siteId });

  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        {settings?.welcomeHeroText}
      </h1>
      <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
        Join us in the excitement of discovering whether we&apos;re having a
        little prince or princess. Make your guess and participate in our fun
        activities!
      </p>
      <div className="flex gap-4 justify-center">
        {settings?.features.showGenderQuiz && (
          <Button className="px-6 py-3 rounded-full" asChild>
            <Link
              href={`/preview/${siteId}/quiz`}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
            >
              Take the Quiz
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
