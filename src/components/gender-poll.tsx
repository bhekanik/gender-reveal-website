"use client";

import { api } from "@/convex/_generated/api";
import { useUserId } from "@/lib/hooks/use-user-id";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";

export function GenderPoll() {
  const userId = useUserId();

  const [hasVoted, setHasVoted] = useState(false);
  const castVote = useMutation(api.votes.castVote);
  const results = useQuery(api.votes.getVoteResults) ?? {
    boy: 0,
    girl: 0,
    total: 0,
  };

  // Check if user has voted on component mount
  useEffect(() => {
    const voted = localStorage.getItem(`gender-poll-voted-${userId}`);
    if (voted) setHasVoted(true);
  }, [userId]);

  const handleVote = async (gender: "boy" | "girl") => {
    try {
      await castVote({ gender, userId });
      localStorage.setItem(`gender-poll-voted-${userId}`, "true");
      setHasVoted(true);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "User has already voted"
      ) {
        setHasVoted(true);
      } else {
        console.error("Failed to cast vote:", error);
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm border border-neutral-200">
      <h2 className="text-2xl font-semibold text-center mb-6">
        What&apos;s Your Guess?
      </h2>

      {!hasVoted ? (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleVote("boy")}
            className="px-8 py-4 rounded-xl bg-blue-100 hover:bg-blue-200 transition"
          >
            It&apos;s a Boy! 👶
          </button>
          <button
            onClick={() => handleVote("girl")}
            className="px-8 py-4 rounded-xl bg-pink-100 hover:bg-pink-200 transition"
          >
            It&apos;s a Girl! 👶
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-center text-neutral-600">
            Thanks for voting! {results.total} votes cast
          </p>
          <div className="relative">
            {/* Progress Labels */}
            <div className="flex justify-between mb-2 font-medium">
              <span className="text-blue-500">Boy {results.boy}%</span>
              <span className="text-pink-500">Girl {results.girl}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-4 rounded-full overflow-hidden flex">
              {/* Boy Progress */}
              <div
                className="h-full bg-blue-400 transition-all duration-500 ease-out"
                style={{ width: `${results.boy}%` }}
              />
              {/* Girl Progress */}
              <div
                className="h-full bg-pink-400 transition-all duration-500 ease-out"
                style={{ width: `${results.girl}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
