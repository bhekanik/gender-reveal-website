import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .first();
    return settings;
  },
});

export const getBySubdomain = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const site = await ctx.db
      .query("sites")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
      .first();

    if (!site) {
      throw new Error("Site not found");
    }

    const settings = await ctx.db
      .query("settings")
      .withIndex("by_siteId", (q) => q.eq("siteId", site._id))
      .first();
    return settings;
  },
});

export const getBabies = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const babies = await ctx.db
      .query("babies")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .collect();

    return babies;
  },
});

export const getBabiesBySubdomain = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const site = await ctx.db
      .query("sites")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
      .first();

    if (!site) {
      throw new Error("Site not found");
    }

    const babies = await ctx.db
      .query("babies")
      .withIndex("by_siteId", (q) => q.eq("siteId", site._id))
      .collect();
    return babies;
  },
});

export const update = mutation({
  args: {
    siteId: v.id("sites"),
    announcementDate: v.number(),
    welcomeHeroText: v.string(),
    revealText: v.string(),
    features: v.object({
      showCountdown: v.boolean(),
      showGenderPoll: v.boolean(),
      showGenderQuiz: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .first();

    const now = Date.now();

    if (settings) {
      await ctx.db.patch(settings._id, {
        ...args,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("settings", {
        ...args,
        theme: "default",
        siteId: args.siteId,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

export const setBabies = mutation({
  args: {
    siteId: v.id("sites"), // Add siteId to args
    babies: v.array(
      v.object({
        name: v.string(),
        gender: v.union(v.literal("boy"), v.literal("girl")),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Delete existing babies
    const existingBabies = await ctx.db
      .query("babies")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .collect();

    await Promise.all(existingBabies.map((baby) => ctx.db.delete(baby._id)));

    // Insert new babies
    const now = Date.now();
    await Promise.all(
      args.babies.map((baby) =>
        ctx.db.insert("babies", {
          siteId: args.siteId,
          name: baby.name,
          gender: baby.gender,
          createdAt: now,
          updatedAt: now,
        })
      )
    );
  },
});

export const deleteAccount = mutation({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    // Delete all related data
    const babies = await ctx.db
      .query("babies")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .collect();

    // Delete babies
    await Promise.all(babies.map((baby) => ctx.db.delete(baby._id)));

    // Delete settings
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
      .first();

    if (settings) {
      await ctx.db.delete(settings._id);
    }
  },
});

export const getAnnouncementDate = query({
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings?.announcementDate;
  },
});
