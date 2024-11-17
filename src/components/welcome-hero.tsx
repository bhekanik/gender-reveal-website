"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./ui/button";

export function WelcomeHero() {
  const announcementDate = useQuery(api.settings.getAnnouncementDate);
  const babies = useQuery(api.settings.getBabies);
  const [isExpired, setIsExpired] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!announcementDate) return;

    const targetDate = new Date(announcementDate).getTime();
    const now = new Date().getTime();
    setIsExpired(now > targetDate);
  }, [announcementDate]);

  if (isExpired && babies) {
    const isGirl = babies.filter((b) => b.gender === "girl").length > 0;
    const gradientColors = isGirl
      ? "from-pink-400 to-pink-600"
      : "from-blue-400 to-blue-600";

    return (
      <section className="text-center space-y-6 py-12 relative">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={
            isGirl
              ? ["#EC4899", "#FB7185", "#FDA4AF"]
              : ["#60A5FA", "#3B82F6", "#93C5FD"]
          }
          recycle={true}
          numberOfPieces={200}
        />
        <h1
          className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`}
        >
          It&apos;s a {isGirl ? "Girl" : "Boy"}!
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          {isGirl
            ? "We're overjoyed to announce that we're expecting a beautiful baby girl! Thank you for being part of our journey and sharing in our excitement. 💝"
            : "We're thrilled to share that we're expecting a wonderful baby boy! Thank you for being part of our journey and sharing in our excitement. 💙"}
        </p>
      </section>
    );
  }

  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Welcome to Our Baby Gender Reveal!
      </h1>
      <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
        Join us in the excitement of discovering whether we&apos;re having a
        little prince or princess. Make your guess and participate in our fun
        activities!
      </p>
      <div className="flex gap-4 justify-center">
        <Button className="px-6 py-3 rounded-full" asChild>
          <Link
            href="/quiz"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
          >
            Take the Quiz
          </Link>
        </Button>
      </div>
    </section>
  );
}
