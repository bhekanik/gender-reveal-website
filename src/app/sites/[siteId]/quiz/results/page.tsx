import { QuizResultsView } from "@/components/quiz/quiz-results-view";

export default function QuizResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
      <QuizResultsView />
    </div>
  );
}
