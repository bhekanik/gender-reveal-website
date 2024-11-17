import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Start a new quiz session
export const startSession = mutation({
  args: {
    visitorId: v.string(),
    siteId: v.id("sites"),
  },
  handler: async (ctx, args) => {
    // Get all questions for this site
    const questions = await ctx.db
      .query("quizQuestions")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .collect();

    // Get all questions this visitor has already answered for this site
    const answeredQuestions = await ctx.db
      .query("quizResponses")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .filter((q) => q.eq(q.field("visitorId"), args.visitorId))
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

    // Create a new session with siteId
    const sessionId = await ctx.db.insert("quizSessions", {
      siteId: args.siteId,
      visitorId: args.visitorId,
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
  args: {
    visitorId: v.string(),
    siteId: v.id("sites"),
  },
  handler: async (ctx, args) => {
    // Find the most recent session for this site and visitor
    const session = await ctx.db
      .query("quizSessions")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .filter((q) => q.eq(q.field("visitorId"), args.visitorId))
      .order("desc")
      .first();

    if (!session) return null;

    // Get the questions for this session
    const questions = await Promise.all(
      session.questionIds.map((id) => ctx.db.get(id))
    );

    // Get user's responses for this session
    const responses = await ctx.db
      .query("quizResponses")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", session._id))
      .collect();

    return {
      sessionId: session._id,
      questions: questions.filter(Boolean),
      responses: responses,
      completed: session.completed,
    };
  },
});

// Submit an answer
export const submitAnswer = mutation({
  args: {
    visitorId: v.string(),
    siteId: v.id("sites"),
    sessionId: v.id("quizSessions"),
    questionId: v.id("quizQuestions"),
    selectedOption: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if visitor has already answered this question in THIS session
    const existingResponse = await ctx.db
      .query("quizResponses")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.eq(q.field("questionId"), args.questionId))
      .first();

    if (existingResponse) {
      throw new Error("Question already answered in this session");
    }

    const now = Date.now();

    // Record the response with siteId
    await ctx.db.insert("quizResponses", {
      siteId: args.siteId,
      visitorId: args.visitorId,
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
      .query("quizResponses")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
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
  args: {
    questionId: v.id("quizQuestions"),
    siteId: v.id("sites"),
  },
  handler: async (ctx, args) => {
    const responses = await ctx.db
      .query("quizResponses")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .filter((q) => q.eq(q.field("questionId"), args.questionId))
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
