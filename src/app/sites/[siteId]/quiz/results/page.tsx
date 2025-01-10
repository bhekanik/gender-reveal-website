import { QuizResultsView } from "@/components/quiz/quiz-results-view";
import { Suspense } from "react";

export default function QuizResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        }
      >
        <QuizResultsView />
      </Suspense>
    </div>
  );
}
