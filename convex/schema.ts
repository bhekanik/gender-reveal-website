import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripeSubscriptionInterval: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripePlanId: v.optional(v.string()),
    trialUsed: v.boolean(),
    isDeleted: v.boolean(),
    clerkUserId: v.optional(v.string()),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"])
    .index("by_stripeCustomerId", ["stripeCustomerId"])
    .index("by_clerkUserId", ["clerkUserId"]),

  settings: defineTable({
    accountName: v.string(),
    announcementDate: v.number(),
    welcomeHeroText: v.string(),
    revealText: v.string(),
    features: v.object({
      showCountdown: v.boolean(),
      showGenderPoll: v.boolean(),
      showGenderQuiz: v.boolean(),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_accountName", ["accountName"]),

  babies: defineTable({
    settingsId: v.id("settings"),
    gender: v.union(v.literal("boy"), v.literal("girl")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_settingsId", ["settingsId"]),

  votes: defineTable({
    gender: v.string(),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  questions: defineTable({
    question: v.string(),
    options: v.array(v.string()),
    easter_egg: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  questionResponses: defineTable({
    userId: v.string(),
    questionId: v.id("questions"),
    sessionId: v.id("quizSessions"),
    selectedOption: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_question", ["questionId"])
    .index("by_session", ["sessionId"]),

  quizSessions: defineTable({
    userId: v.string(),
    questionIds: v.array(v.id("questions")),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
});
