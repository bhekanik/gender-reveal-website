"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useVisitorId } from "@/lib/hooks/use-user-id";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export function GenderPoll() {
  const visitorId = useVisitorId();
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;

  const castVote = useMutation(api.votes.castVote);
  const userHasVoted = useQuery(api.votes.userHasVoted, { siteId, visitorId });
  const results = useQuery(api.votes.getVoteResults, { siteId }) ?? {
    boy: 0,
    girl: 0,
    total: 0,
  };

  const handleVote = async (gender: "boy" | "girl") => {
    try {
      await castVote({ siteId, gender, visitorId: visitorId });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "User has already voted"
      ) {
        console.error("Failed to cast vote:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/10 before:to-white/5 before:-z-10"
    >
      {/* Decorative background elements - adjusted for frosted glass */}
      <div className="absolute inset-0 -z-20 overflow-hidden rounded-3xl">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-2xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
      >
        What&apos;s Your Guess?
      </motion.h2>

      {!userHasVoted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVote("boy")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/90 to-blue-600/90 backdrop-blur-sm text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600/90 hover:to-blue-700/90 border border-blue-400/20"
          >
            <span className="flex items-center justify-center gap-2">
              <span>It&apos;s a Boy!</span>
              <span className="text-2xl">👶</span>
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVote("girl")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500/90 to-pink-600/90 backdrop-blur-sm text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-600/90 hover:to-pink-700/90 border border-pink-400/20"
          >
            <span className="flex items-center justify-center gap-2">
              <span>It&apos;s a Girl!</span>
              <span className="text-2xl">👶</span>
            </span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-center text-neutral-700 font-medium">
            Thanks for voting!{" "}
            <span className="text-neutral-900 font-semibold">
              {results.total}
            </span>{" "}
            votes cast
          </p>
          <div className="space-y-4">
            {/* Progress Labels */}
            <div className="flex justify-between mb-2 font-semibold">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500/90 shadow-sm border border-blue-400/20" />
                <span className="text-neutral-700">Boy {results.boy}%</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-neutral-700">Girl {results.girl}%</span>
                <span className="h-3 w-3 rounded-full bg-pink-500/90 shadow-sm border border-pink-400/20" />
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-6 rounded-full overflow-hidden flex shadow-inner bg-black/5 backdrop-blur-sm border border-white/30">
              {/* Boy Progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${results.boy}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                  "h-full bg-gradient-to-r from-blue-400/90 to-blue-500/90 backdrop-blur-sm border-r border-blue-400/20",
                  results.boy > 0 && "rounded-l-full"
                )}
              />
              {/* Girl Progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${results.girl}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                  "h-full bg-gradient-to-r from-pink-400/90 to-pink-500/90 backdrop-blur-sm border-l border-pink-400/20",
                  results.girl > 0 && "rounded-r-full"
                )}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
