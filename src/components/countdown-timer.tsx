"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

export function CountdownTimer() {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const announcementDate = useQuery(api.settings.getAnnouncementDate);

  useEffect(() => {
    if (announcementDate === undefined) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);

    if (!announcementDate) {
      console.error("No announcement date set in database");
      return;
    }

    const targetDate = new Date(announcementDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsExpired(true);
        return [];
      }

      return [
        {
          value: Math.floor(distance / (1000 * 60 * 60 * 24)),
          label: "days",
        },
        {
          value: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          label: "hours",
        },
        {
          value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          label: "minutes",
        },
        {
          value: Math.floor((distance % (1000 * 60)) / 1000),
          label: "seconds",
        },
      ];
    };

    setTimeUnits(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeUnits(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [announcementDate]);

  if (isLoading) {
    return (
      <div className="p-8 md:p-12 rounded-2xl bg-white shadow-sm border border-neutral-200">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (!announcementDate) {
    return (
      <div className="p-8 md:p-12 rounded-2xl bg-white shadow-sm border border-neutral-200">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Announcement Date Coming Soon!
        </h2>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="p-8 md:p-12 rounded-2xl bg-white shadow-sm border border-neutral-200">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          The Big Reveal Has Happened!
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 rounded-2xl bg-white shadow-sm border border-neutral-200">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        The Big Reveal In:
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        {timeUnits.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="relative">
              <div className="text-4xl md:text-6xl font-mono bg-neutral-50 rounded-xl p-6 md:p-8 font-bold overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="block"
                  >
                    {value.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-1 left-2 right-2 h-2 bg-gradient-to-r from-pink-200 to-blue-200 rounded-t-lg opacity-50" />
              <div className="absolute -bottom-1 left-2 right-2 h-2 bg-gradient-to-r from-pink-200 to-blue-200 rounded-b-lg opacity-50" />
            </div>
            <div className="mt-3 text-base md:text-lg text-neutral-600 capitalize font-medium">
              {label}
            </div>
            {/* Show "and" between minutes and seconds on mobile */}
            {label === "minutes" && (
              <div className="block md:hidden text-neutral-400 my-2">and</div>
            )}
          </div>
        ))}
      </div>
      {/* Optional: Add a message about timezone */}
      <p className="text-center text-sm text-neutral-400 mt-6">
        Times shown in your local timezone
      </p>
    </div>
  );
}
