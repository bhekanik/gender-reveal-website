"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

interface WelcomeHeroProps {
  settings: {
    welcomeHeroText: string;
    features: {
      showGenderQuiz: boolean;
    };
  };
}

export function WelcomeHero({ settings }: WelcomeHeroProps) {
  return (
    <div className="text-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
      >
        {settings.welcomeHeroText}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
      >
        Join us in the excitement of discovering whether we&apos;re having a
        little prince or princess. Make your guess and participate in our fun
        activities!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {settings.features.showGenderQuiz && (
          <Button
            className="px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 text-white border-none"
            asChild
          >
            <Link href="/demo/quiz">Take the Quiz</Link>
          </Button>
        )}
      </motion.div>

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: i % 2 === 0 ? "#ec4899" : "#3b82f6",
              opacity: 0.2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}
