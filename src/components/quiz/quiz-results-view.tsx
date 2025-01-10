"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { QuestionResultCard } from "./question-result-card";

export function QuizResultsView() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;

  const questions = useQuery(api.quiz.getAllQuestions, {
    siteId,
  });

  console.log("questions:", questions);

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
        <Suspense
          key={question._id}
          fallback={
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          }
        >
          <QuestionResultCard
            key={question._id}
            question={question}
            questionNumber={index + 1}
            siteId={siteId}
          />
        </Suspense>
      ))}
    </div>
  );
}
