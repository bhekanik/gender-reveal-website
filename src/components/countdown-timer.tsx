"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

export function CountdownTimer({ preview = false }: { preview?: boolean }) {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const siteId = params.siteId as Id<"sites">;

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      >
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </motion.div>
    );
  }

  if (!announcementDate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          Announcement Date Coming Soon!
        </h2>
      </motion.div>
    );
  }

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          The Big Reveal Has Happened!
        </h2>
        <div className="flex justify-center">
          <Link
            href={`/${preview ? "preview" : "sites"}/${siteId}/reveal`}
            className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-500/90 to-blue-500/90 backdrop-blur-sm text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <span>View Gender Reveal</span>
            <motion.svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-20 overflow-hidden rounded-3xl">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-2xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
      >
        The Big Reveal In:
      </motion.h2>

      <div className="grid grid-cols-4 gap-2 max-w-4xl mx-auto">
        {timeUnits.map(({ value, label }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-center"
          >
            <div className="relative">
              <div className="relative bg-white/30 backdrop-blur-md rounded-xl p-4 md:p-8 overflow-hidden border border-white/30">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="block text-2xl md:text-6xl font-mono font-bold text-neutral-800"
                  >
                    {value.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-1 left-2 right-2 h-2 bg-gradient-to-r from-pink-200/40 to-blue-200/40 rounded-t-lg blur-sm" />
              <div className="absolute -bottom-1 left-2 right-2 h-2 bg-gradient-to-r from-pink-200/40 to-blue-200/40 rounded-b-lg blur-sm" />
            </div>
            <div className="mt-3 text-base md:text-lg text-neutral-700 capitalize font-medium">
              {label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs md:text-sm text-neutral-600 mt-2 md:mt-6"
      >
        Times shown in your local timezone
      </motion.p>
    </motion.div>
  );
}
