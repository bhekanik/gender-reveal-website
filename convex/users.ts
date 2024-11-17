import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();

    if (!user) return null;

    return {
      id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      stripeCustomerId: user.stripeCustomerId,
      username: user.username,
      trialUsed: user.trialUsed,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) return null;

    return {
      id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      stripeCustomerId: user.stripeCustomerId,
      username: user.username,
      trialUsed: user.trialUsed,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    return user;
  },
});

// Helper function to create a new user
export const createUser = mutation({
  args: {
    email: v.string(),
    clerkUserId: v.string(),
    username: v.string(),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripeSubscriptionInterval: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripePlanId: v.optional(v.string()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    // Check if user already exists with this email or clerkUserId
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Check for duplicate username
    const existingUsername = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // Check for duplicate email
    const existingEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingEmail) {
      throw new Error("Email already registered");
    }

    const now = Date.now();

    const userId = await ctx.db.insert("users", {
      email: args.email,
      clerkUserId: args.clerkUserId,
      username: args.username,
      firstname: args.firstname,
      lastname: args.lastname,
      role: args.role ?? "user",
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
      stripeSubscriptionInterval: args.stripeSubscriptionInterval,
      stripePriceId: args.stripePriceId,
      stripePlanId: args.stripePlanId,
      trialUsed: false,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    });

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not created");
    }

    return {
      id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      stripeCustomerId: user.stripeCustomerId,
      username: user.username,
      trialUsed: user.trialUsed,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
});

// Helper function to update user details
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    username: v.optional(v.string()),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripeSubscriptionInterval: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripePlanId: v.optional(v.string()),
    trialUsed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const now = Date.now();

    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: now,
    });

    return ctx.db.get(userId);
  },
});

// Function to delete a user (soft delete)
export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
    hardDelete: v.optional(v.boolean()), // Optional flag for hard delete
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();

    if (args.hardDelete) {
      // Hard delete - completely remove the user
      await ctx.db.delete(args.userId);

      // Delete all related data
      // Find and delete user's votes
      const votes = await ctx.db
        .query("votes")
        .withIndex("by_visitorId", (q) => q.eq("visitorId", user.clerkUserId))
        .collect();

      for (const vote of votes) {
        await ctx.db.delete(vote._id);
      }

      // Find and delete user's quiz responses
      const responses = await ctx.db
        .query("quizResponses")
        .withIndex("by_visitorId", (q) => q.eq("visitorId", user.clerkUserId))
        .collect();

      for (const response of responses) {
        await ctx.db.delete(response._id);
      }

      const sites = await ctx.db
        .query("sites")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect();

      for (const site of sites) {
        await ctx.db.delete(site._id);

        // Find and delete user's quiz sessions
        const sessions = await ctx.db
          .query("quizSessions")
          .withIndex("by_siteId", (q) => q.eq("siteId", site._id))
          .collect();

        for (const session of sessions) {
          await ctx.db.delete(session._id);
        }
      }

      return {
        success: true,
        message: "User and related data permanently deleted",
      };
    } else {
      // Soft delete - just mark the user as deleted
      await ctx.db.patch(args.userId, {
        isDeleted: true,
        updatedAt: now,
      });

      return { success: true, message: "User marked as deleted" };
    }
  },
});

// Function to restore a soft-deleted user
export const restoreUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isDeleted) {
      throw new Error("User is not deleted");
    }

    const now = Date.now();

    await ctx.db.patch(args.userId, {
      isDeleted: false,
      updatedAt: now,
    });

    return {
      success: true,
      message: "User restored successfully",
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        stripeCustomerId: user.stripeCustomerId,
        username: user.username,
        trialUsed: user.trialUsed,
        isDeleted: false,
        createdAt: user.createdAt,
        updatedAt: now,
      },
    };
  },
});

// Helper function to update user minutes
export const updateUserMinutes = mutation({
  args: {
    stripeCustomerId: v.string(),
    operation: v.union(v.literal("set"), v.literal("add")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_stripeCustomerId", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();

    await ctx.db.patch(user._id, {
      updatedAt: now,
    });

    return ctx.db.get(user._id);
  },
});
