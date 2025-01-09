"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";
import { useVisitorId } from "@/lib/hooks/use-user-id";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { QuestionCard } from "./quiz/question-card";
import { Button } from "./ui/button";

type QuizState = "not-started" | "in-progress" | "completed" | "all-done";

export function Quiz({ preview = false }: { preview?: boolean }) {
  const visitorId = useVisitorId();
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const site = useQuery(api.sites.getSite, { siteId });
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>("not-started");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingStats, setShowingStats] = useState(false);

  const startSession = useMutation(api.quiz.startSession);
  const submitAnswer = useMutation(api.quiz.submitAnswer);
  const currentSession = useQuery(api.quiz.getCurrentSession, {
    visitorId,
    siteId,
  });

  const handleStartQuiz = async () => {
    setCurrentQuestionIndex(0);
    setQuizState("in-progress");
    const result = await startSession({ visitorId, siteId });

    if (result.questions.length === 0) {
      setQuizState("all-done");
    }
  };

  const handleAnswer = async (option: string) => {
    if (!currentSession?.questions[currentQuestionIndex]) return;

    try {
      await submitAnswer({
        visitorId,
        siteId,
        sessionId: currentSession.sessionId,
        questionId: currentSession.questions[currentQuestionIndex]._id,
        selectedOption: option,
      });

      setShowingStats(true);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentSession?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowingStats(false);
    } else {
      setQuizState("completed");
    }
  };

  if (quizState === "all-done") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-2xl bg-white shadow-sm border border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-semibold">Quiz Champion!</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Wow! You&apos;ve answered all our questions - you&apos;re really
                committed to helping us predict the baby&apos;s preferences!
              </p>
              <p className="text-sm italic">
                (We&apos;ll add more questions soon, so check back later!)
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full"
                asChild
              >
                <Link
                  href={
                    preview
                      ? `/preview/${site?.subdomain}`
                      : config.isDev
                        ? `/sites/${siteId}`
                        : `https://${site?.subdomain}.${config.domain}`
                  }
                >
                  Back to Home
                </Link>
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    preview
                      ? `/preview/${site?.subdomain}`
                      : config.isDev
                        ? `/sites/${siteId}`
                        : `https://${site?.subdomain}.${config.domain}`
                  )
                }
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
              >
                Make Your Gender Prediction
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizState === "not-started") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-2xl bg-white shadow-sm border border-neutral-200">
          <div className="text-center space-y-6">
            <p className="text-neutral-600">
              Get ready to answer fun questions about our baby&apos;s future
              preferences. Keep an eye out for subtle hints along the way!
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full"
                asChild
              >
                <Link
                  href={
                    preview
                      ? `/preview/${site?.subdomain}`
                      : config.isDev
                        ? `/sites/${siteId}`
                        : `https://${site?.subdomain}.${config.domain}`
                  }
                >
                  Back to Home
                </Link>
              </Button>
              <Button
                onClick={handleStartQuiz}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                aria-label="Start the quiz"
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentSession?.questions?.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-neutral-200">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (quizState === "completed") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-2xl bg-white shadow-sm border border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-semibold">Thanks for Playing!</h2>
            <p className="text-neutral-600">
              Did you spot any hidden clues? The big reveal is coming soon!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full"
                asChild
              >
                <Link
                  href={
                    preview
                      ? `/preview/${site?.subdomain}`
                      : config.isDev
                        ? `/sites/${siteId}`
                        : `https://${site?.subdomain}.${config.domain}`
                  }
                >
                  Back to Home
                </Link>
              </Button>
              <Button
                onClick={handleStartQuiz}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
              >
                More Questions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentSession?.questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <QuestionCard
        question={currentQuestion}
        showingStats={showingStats}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentSession.questions.length}
      />
    </div>
  );
}
