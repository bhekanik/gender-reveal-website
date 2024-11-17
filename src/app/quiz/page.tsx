"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { Quiz } from "@/components/quiz";

export default function QuizPage() {
  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Baby Prediction Quiz
              </h1>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Help us predict our baby&apos;s future preferences! Answer these
                fun questions and see if you can spot any hidden clues...
              </p>
            </div>
            <Quiz />
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
