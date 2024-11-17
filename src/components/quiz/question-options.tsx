"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface QuestionOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
  easterEggHint?: string;
}

export function QuestionOptions({
  options,
  onSelect,
  easterEggHint,
}: QuestionOptionsProps) {
  const [easterEggEffect, setEasterEggEffect] = useState<string | null>(null);
  const [effectType, setEffectType] = useState<"pink" | "blue" | "neutral">(
    "neutral"
  );

  const handleSelect = (option: string) => {
    if (easterEggHint?.toLowerCase().includes(option.toLowerCase())) {
      // Determine effect type based on the hint content
      const hint = easterEggHint.toLowerCase();
      let type: "pink" | "blue" | "neutral" = "neutral";

      // Check for feminine hints
      if (
        hint.includes("girl") ||
        hint.includes("princess") ||
        hint.includes("pink") ||
        hint.includes("ballet") ||
        hint.includes("feminine") ||
        hint.includes("she")
      ) {
        type = "pink";
      }
      // Check for masculine hints
      else if (
        hint.includes("boy") ||
        hint.includes("prince") ||
        hint.includes("blue") ||
        hint.includes("masculine") ||
        hint.includes("he")
      ) {
        type = "blue";
      }

      setEffectType(type);
      setEasterEggEffect(option);

      // Reset effects after animation
      setTimeout(() => {
        setEasterEggEffect(null);
        setEffectType("neutral");
      }, 1000);
    }
    onSelect(option);
  };

  const getEffectStyles = (option: string) => {
    if (easterEggEffect !== option) return "";

    switch (effectType) {
      case "pink":
        return "animate-pulse border-pink-500 bg-pink-50";
      case "blue":
        return "animate-pulse border-blue-500 bg-blue-50";
      default:
        return "animate-pulse border-purple-500 bg-purple-50";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option) => (
        <motion.button
          key={option}
          onClick={() => handleSelect(option)}
          className={`p-4 text-left rounded-lg border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all relative overflow-hidden
            ${getEffectStyles(option)}
          `}
          role="radio"
          aria-checked={false}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
        >
          {option}
          {easterEggEffect === option && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 1 }}
            >
              <div className="w-full h-full bg-current opacity-10" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
