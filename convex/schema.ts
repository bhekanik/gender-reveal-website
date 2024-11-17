import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  votes: defineTable({
    gender: v.string(),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  questions: defineTable({
    question: v.string(),
    options: v.array(v.string()),
    easter_egg: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  quizSessions: defineTable({
    userId: v.string(),
    questionIds: v.array(v.id("questions")),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_completed", ["completed"]),

  questionResponses: defineTable({
    userId: v.string(),
    questionId: v.id("questions"),
    sessionId: v.id("quizSessions"),
    selectedOption: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_session", ["sessionId"])
    .index("by_question", ["questionId"])
    .index("by_question_user", ["questionId", "userId"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
