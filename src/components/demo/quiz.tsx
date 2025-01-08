"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";

const DEMO_QUESTIONS = [
  {
    question: "What's mom's favorite ice cream flavor?",
    options: ["Chocolate", "Vanilla", "Strawberry", "Mint"],
    answer: 2,
  },
  {
    question: "Which side of the family has twins?",
    options: ["Mom's side", "Dad's side", "Both sides", "Neither side"],
    answer: 0,
  },
  {
    question: "What was mom's first craving?",
    options: ["Pickles", "Ice cream", "Pizza", "Fruit"],
    answer: 3,
  },
];

export function Quiz() {
  const [quizState, setQuizState] = useState<
    "not-started" | "in-progress" | "completed"
  >("not-started");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizState("in-progress");
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === DEMO_QUESTIONS[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < DEMO_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizState("completed");
      }
    }, 1000);
  };

  if (quizState === "not-started") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-6">
          <p className="text-neutral-600">
            Get ready to answer fun questions about our baby&apos;s future
            preferences. Keep an eye out for subtle hints along the way!
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/demo")}
              variant="outline"
              className="px-6 py-3 rounded-full"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleStartQuiz}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === "completed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
        <p className="text-center text-lg mb-4">
          You scored {score} out of {DEMO_QUESTIONS.length}
        </p>
        <p className="text-center text-neutral-600 mb-8">
          {score === DEMO_QUESTIONS.length
            ? "Perfect score! You really know us well! 🎉"
            : score > DEMO_QUESTIONS.length / 2
              ? "Great job! You know us pretty well! 🌟"
              : "Thanks for playing! Maybe you learned something new about us! 😊"}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => (window.location.href = "/demo")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 transition"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    );
  }

  // Quiz in progress
  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
    >
      <div className="text-sm text-neutral-600 mb-4">
        Question {currentQuestion + 1} of {DEMO_QUESTIONS.length}
      </div>
      <h3 className="text-xl font-semibold mb-6">
        {DEMO_QUESTIONS[currentQuestion].question}
      </h3>
      <div className="space-y-4">
        {DEMO_QUESTIONS[currentQuestion].options.map((option, index) => (
          <Button
            key={option}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full justify-start p-4 ${
              selectedAnswer === null
                ? "hover:bg-neutral-100"
                : index === DEMO_QUESTIONS[currentQuestion].answer
                  ? "bg-green-500 text-white"
                  : selectedAnswer === index
                    ? "bg-red-500 text-white"
                    : ""
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
