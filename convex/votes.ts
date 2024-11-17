import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const castVote = mutation({
  args: {
    gender: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user has already voted
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existingVote) {
      throw new Error("User has already voted");
    }

    const now = Date.now();

    await ctx.db.insert("votes", {
      gender: args.gender,
      userId: args.userId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getVoteResults = query({
  handler: async (ctx) => {
    const votes = await ctx.db.query("votes").collect();
    const total = votes.length;

    const boyVotes = votes.filter((vote) => vote.gender === "boy").length;
    const girlVotes = votes.filter((vote) => vote.gender === "girl").length;

    return {
      boy: total ? Math.round((boyVotes / total) * 100) : 0,
      girl: total ? Math.round((girlVotes / total) * 100) : 0,
      total,
    };
  },
});
