"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

interface QuestionStatsProps {
  questionId: Id<"quizQuestions">;
  options: string[];
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuestionStats({
  questionId,
  options,
  onNext,
  isLastQuestion,
}: QuestionStatsProps) {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;

  const questionStats = useQuery(api.questions.getQuestionStats, {
    questionId,
    siteId,
  }) ?? {
    stats: {},
    total: 0,
  };

  // Use questionId to deterministically choose a color
  // This ensures the same question always gets the same color
  const isGirl = useMemo(() => {
    // Convert the questionId to a number for consistent randomization
    const sum = questionId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum % 2 === 0; // Even sum = pink, Odd sum = blue
  }, [questionId]);

  const barColor = isGirl ? "bg-pink-500/10" : "bg-blue-500/10";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <div
            key={option}
            className="p-4 rounded-lg border border-neutral-200 relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 ${barColor} origin-left transition-transform duration-1000`}
              style={{
                transform: `scaleX(${(questionStats.stats[option] || 0) / 100})`,
              }}
            />
            <div className="relative flex justify-between items-center">
              <span>{option}</span>
              <span className="font-medium">
                {questionStats.stats[option] || 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-neutral-600">
        {questionStats.total}{" "}
        {questionStats.total === 1 ? "person has" : "people have"} answered this
        question
      </div>
      <button
        onClick={onNext}
        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
      >
        {isLastQuestion ? "Finish Quiz" : "Next Question"}
      </button>
    </div>
  );
}
