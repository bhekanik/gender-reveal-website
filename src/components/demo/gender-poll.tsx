"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function GenderPoll() {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({ boy: 45, girl: 55 });

  useEffect(() => {
    const hasVoted = localStorage.getItem("demo-gender-vote");
    if (hasVoted) {
      setVoted(true);
    }
  }, []);

  const handleVote = (gender: "boy" | "girl") => {
    localStorage.setItem("demo-gender-vote", gender);
    setVoted(true);
    setVotes((prev) => ({
      ...prev,
      [gender]: prev[gender] + 1,
    }));
  };

  const total = votes.boy + votes.girl;
  const boyPercentage = Math.round((votes.boy / total) * 100);
  const girlPercentage = Math.round((votes.girl / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
        {voted ? "Poll Results" : "What's Your Guess?"}
      </h2>

      {voted ? (
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <span className="w-16 text-right font-medium">Boy</span>
            <div className="flex-1 bg-blue-100 rounded-full h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${boyPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
              />
            </div>
            <span className="w-16 text-left font-medium">{boyPercentage}%</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="w-16 text-right font-medium">Girl</span>
            <div className="flex-1 bg-pink-100 rounded-full h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${girlPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500"
              />
            </div>
            <span className="w-16 text-left font-medium">
              {girlPercentage}%
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleVote("boy")}
            className="px-8 py-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full text-lg hover:opacity-90"
          >
            Boy 👶💙
          </Button>
          <Button
            onClick={() => handleVote("girl")}
            className="px-8 py-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full text-lg hover:opacity-90"
          >
            Girl 👶💖
          </Button>
        </div>
      )}
    </motion.div>
  );
}
