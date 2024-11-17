import { formatEntityList } from "@/lib/formatEntity";
import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";

const questions = [
  {
    id: 1,
    question: "What is your name?",
  },
  {
    id: 2,
    question: "How old are you?",
  },
  {
    id: 3,
    question: "What is your favorite color?",
  },
  {
    id: 4,
    question: "Where are you from?",
  },
  {
    id: 5,
    question: "What are your hobbies?",
  },
];

export async function GET() {
  logger.info("GET request received at /api/questions");

  try {
    return NextResponse.json(formatEntityList(questions, "question"));
  } catch (error) {
    logger.error(
      {
        message: error instanceof Error ? error.message : "Unknown error",
        error,
      },
      "Error in GET /api/questions"
    );

    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
