"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

export function WelcomeHero({ preview = false }: { preview?: boolean }) {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const settings = useQuery(api.settings.get, { siteId });

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative text-center space-y-2 md:space-y-8 py-2 md:py-8 px-4"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-200/30 to-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl" />
      </div>

      <motion.h1
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
      >
        {settings?.welcomeHeroText || "Welcome to Our Baby Reveal!"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
      >
        Join us in the excitement. Will it be a boy or a girl? Make your guess
        and take the quiz!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {settings?.features.showGenderQuiz && (
          <Button
            className="px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 text-white border-none"
            asChild
          >
            <Link
              href={
                preview
                  ? `/preview/${siteId}/quiz`
                  : config.isDev
                    ? `/sites/${siteId}/quiz`
                    : `/quiz`
              }
            >
              Take the Quiz
            </Link>
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
    </motion.section>
  );
}
