import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Start a new quiz session
export const startSession = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Get all questions
    const questions = await ctx.db.query("questions").collect();

    // Get all questions this user has already answered
    const answeredQuestions = await ctx.db
      .query("questionResponses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const answeredQuestionIds = new Set(
      answeredQuestions.map((response) => response.questionId.toString())
    );

    // Filter out questions the user has already answered
    const availableQuestions = questions.filter(
      (question) => !answeredQuestionIds.has(question._id.toString())
    );

    // Randomly select up to 5 questions from available questions
    const shuffled = availableQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    const now = Date.now();

    // Create a new session
    const sessionId = await ctx.db.insert("quizSessions", {
      userId: args.userId,
      questionIds: shuffled.map((q) => q._id),
      completed: false,
      createdAt: now,
      updatedAt: now,
    });

    return {
      sessionId,
      questions: shuffled,
    };
  },
});

// Get current session questions
export const getCurrentSession = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Find the most recent session, regardless of completion status
    const session = await ctx.db
      .query("quizSessions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    if (!session) return null;

    // Get the questions for this session
    const questions = await Promise.all(
      session.questionIds.map((id) => ctx.db.get(id))
    );

    // Get user's responses for this session
    const responses = await ctx.db
      .query("questionResponses")
      .withIndex("by_session", (q) => q.eq("sessionId", session._id))
      .collect();

    return {
      sessionId: session._id,
      questions: questions.filter(Boolean), // Remove any null values
      responses: responses,
      completed: session.completed,
    };
  },
});

// Submit an answer
export const submitAnswer = mutation({
  args: {
    userId: v.string(),
    sessionId: v.id("quizSessions"),
    questionId: v.id("questions"),
    selectedOption: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user has already answered this question in THIS session
    const existingResponse = await ctx.db
      .query("questionResponses")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.eq(q.field("questionId"), args.questionId))
      .first();

    if (existingResponse) {
      throw new Error("Question already answered in this session");
    }

    const now = Date.now();

    // Record the response
    await ctx.db.insert("questionResponses", {
      userId: args.userId,
      questionId: args.questionId,
      sessionId: args.sessionId,
      selectedOption: args.selectedOption,
      createdAt: now,
      updatedAt: now,
    });

    // Check if this was the last question
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");

    const responses = await ctx.db
      .query("questionResponses")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    // If all questions are answered, mark session as completed
    if (responses.length === session.questionIds.length) {
      await ctx.db.patch(args.sessionId, {
        completed: true,
        updatedAt: now,
      });
    }

    return { success: true };
  },
});

// Get answer statistics for a question
export const getQuestionStats = query({
  args: { questionId: v.id("questions") },
  handler: async (ctx, args) => {
    const responses = await ctx.db
      .query("questionResponses")
      .withIndex("by_question", (q) => q.eq("questionId", args.questionId))
      .collect();

    const total = responses.length;
    const stats: Record<string, number> = {};

    // Calculate percentages for each option
    responses.forEach((response) => {
      stats[response.selectedOption] =
        (stats[response.selectedOption] || 0) + 1;
    });

    // Convert counts to percentages
    Object.keys(stats).forEach((option) => {
      stats[option] = Math.round((stats[option] / total) * 100);
    });

    return { stats, total };
  },
});
