import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const castVote = mutation({
  args: {
    siteId: v.id("sites"),
    gender: v.union(v.literal("boy"), v.literal("girl")),
    visitorId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user has already voted
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .filter((q) => q.eq(q.field("visitorId"), args.visitorId))
      .first();

    if (existingVote) {
      throw new Error("Visitor has already voted");
    }

    const now = Date.now();

    await ctx.db.insert("votes", {
      siteId: args.siteId,
      gender: args.gender,
      visitorId: args.visitorId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getVoteResults = query({
  args: {
    siteId: v.id("sites"),
  },
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .collect();

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
