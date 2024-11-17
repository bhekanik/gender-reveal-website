import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

type Baby = {
  gender: "boy" | "girl";
  order?: number; // For birth order in case of twins/triplets
};

export const getAnnouncementDate = query({
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "announcementDate"))
      .first();

    return setting?.value as string | null;
  },
});

export const getBabies = query({
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "babies"))
      .first();

    return (setting?.value ?? []) as Baby[];
  },
});

export const setBabies = mutation({
  args: {
    babies: v.array(
      v.object({
        gender: v.union(v.literal("boy"), v.literal("girl")),
        order: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "babies"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.babies,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("settings", {
        key: "babies",
        value: args.babies,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

export const setAnnouncementDate = mutation({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "announcementDate"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.date,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("settings", {
        key: "announcementDate",
        value: args.date,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});
