"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export function QuizResultsView() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;

  const questions = useQuery(api.quiz.getAllQuestions, {
    siteId,
  });

  if (!questions) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse">Loading results...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-neutral-600">
        No quiz questions found. Please add some questions to your quiz.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <QuestionResultCard
          key={question._id}
          question={question}
          questionNumber={index + 1}
          siteId={siteId}
        />
      ))}
    </div>
  );
}

interface QuestionResultCardProps {
  question: {
    _id: Id<"quizQuestions">;
    question: string;
    options: string[];
  };
  questionNumber: number;
  siteId: Id<"sites">;
}

function QuestionResultCard({
  question,
  questionNumber,
  siteId,
}: QuestionResultCardProps) {
  const stats = useQuery(api.quiz.getQuestionStats, {
    questionId: question._id,
    siteId,
  });

  // Use questionId to deterministically choose a color
  const isGirl =
    question._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      2 ===
    0;

  const barColor = isGirl ? "bg-pink-500/10" : "bg-blue-500/10";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        {questionNumber}. {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option}
            className="p-4 rounded-lg border border-neutral-200 relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 ${barColor} origin-left transition-transform duration-1000`}
              style={{
                transform: `scaleX(${(stats?.stats[option] || 0) / 100 || 0})`,
              }}
            />
            <div className="relative flex justify-between items-center">
              <span>{option}</span>
              <span className="font-medium">{stats?.stats[option] || 0}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-neutral-600">
        {stats?.total || 0}{" "}
        {(stats?.total || 0) === 1 ? "person has" : "people have"} answered this
        question
      </div>
    </div>
  );
}
