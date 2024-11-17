"use client";

import { Id } from "@/convex/_generated/dataModel";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { QuestionOptions } from "./question-options";
import { QuestionStats } from "./question-stats";

interface QuestionCardProps {
  question: {
    _id: Id<"quizQuestions">;
    question: string;
    options: string[];
    easter_egg?: string;
  };
  showingStats: boolean;
  onAnswer: (option: string) => void;
  onNext: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  showingStats,
  onAnswer,
  onNext,
  currentQuestionIndex,
  totalQuestions,
}: QuestionCardProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const randomizedOptions = useMemo(() => {
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question]);

  return (
    <div className="p-8 rounded-2xl bg-white shadow-sm border border-neutral-200">
      <div className="space-y-8">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question Counter */}
        <div className="text-sm text-neutral-600 text-center">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-center">
              {question.question}
            </h3>

            {showingStats ? (
              <QuestionStats
                questionId={question._id}
                options={randomizedOptions}
                onNext={onNext}
                isLastQuestion={currentQuestionIndex === totalQuestions - 1}
              />
            ) : (
              <QuestionOptions
                options={randomizedOptions}
                onSelect={onAnswer}
                easterEggHint={question.easter_egg}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
