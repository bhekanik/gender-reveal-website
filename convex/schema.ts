import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    stripeCustomerId: v.optional(v.string()),
    clerkUserId: v.string(),
    stripeSubscriptionId: v.optional(v.string()),
    stripeSubscriptionInterval: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripePlanId: v.optional(v.string()),
    trialUsed: v.boolean(),
    isDeleted: v.boolean(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"])
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_stripeCustomerId", ["stripeCustomerId"]),

  sites: defineTable({
    userId: v.id("users"),
    siteName: v.string(), // Used as the site identifier in URLs
    subdomain: v.optional(v.string()), // New field for subdomain
    paid: v.boolean(),
    published: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_siteName", ["siteName"])
    .index("by_subdomain", ["subdomain"]), // New index for subdomain lookups

  settings: defineTable({
    siteId: v.id("sites"),
    announcementDate: v.number(),
    welcomeHeroText: v.string(),
    revealText: v.string(),
    features: v.object({
      showCountdown: v.boolean(),
      showGenderPoll: v.boolean(),
      showGenderQuiz: v.boolean(),
    }),
    theme: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  babies: defineTable({
    siteId: v.id("sites"),
    name: v.string(),
    gender: v.union(v.literal("boy"), v.literal("girl")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  votes: defineTable({
    siteId: v.id("sites"),
    gender: v.string(),
    visitorId: v.string(), // Use visitorId instead of userId for public visitors
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_siteId", ["siteId"])
    .index("by_visitorId", ["visitorId"]),

  quizQuestions: defineTable({
    siteId: v.optional(v.id("sites")),
    question: v.string(),
    options: v.array(v.string()),
    easterEggOptionIndex: v.optional(v.number()),
    easterEgg: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  quizResponses: defineTable({
    siteId: v.id("sites"),
    visitorId: v.string(),
    questionId: v.id("quizQuestions"),
    sessionId: v.id("quizSessions"),
    selectedOption: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_siteId", ["siteId"])
    .index("by_questionId", ["questionId"])
    .index("by_visitorId", ["visitorId"])
    .index("by_sessionId", ["sessionId"]),

  quizSessions: defineTable({
    siteId: v.id("sites"),
    visitorId: v.string(),
    questionIds: v.array(v.id("quizQuestions")),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_siteId", ["siteId"])
    .index("by_visitorId", ["visitorId"]),

  payments: defineTable({
    userId: v.id("users"),
    siteId: v.id("sites"),
    amount: v.number(),
    currency: v.string(),
    timestamp: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_siteId", ["siteId"]),
});
