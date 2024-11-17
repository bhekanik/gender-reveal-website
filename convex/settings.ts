import { v } from "convex/values";
import { config } from "../src/lib/config";
import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings;
  },
});

export const setDefaultSettings = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const createdSettingsId = await ctx.db.insert("settings", {
      ...config.defaults.settings,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("babies", {
      settingsId: createdSettingsId,
      gender: "girl",
      createdAt: now,
      updatedAt: now,
    });

    return ctx.db.query("settings").first();
  },
});

export const getBabies = query({
  args: { settingsId: v.id("settings") },
  handler: async (ctx, args) => {
    const babies = await ctx.db
      .query("babies")
      .withIndex("by_settingsId", (q) => q.eq("settingsId", args.settingsId))
      .collect();

    return babies;
  },
});

export const update = mutation({
  args: {
    accountName: v.string(),
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
    const settings = await ctx.db.query("settings").first();
    const now = Date.now();

    if (settings) {
      await ctx.db.patch(settings._id, {
        ...args,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("settings", {
        ...args,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

export const setBabies = mutation({
  args: {
    babies: v.array(
      v.object({
        gender: v.union(v.literal("boy"), v.literal("girl")),
      })
    ),
  },
  handler: async (ctx, args) => {
    const settings = await ctx.db.query("settings").first();
    if (!settings) throw new Error("Settings not found");

    // Delete existing babies
    const existingBabies = await ctx.db
      .query("babies")
      .withIndex("by_settingsId", (q) => q.eq("settingsId", settings._id))
      .collect();

    await Promise.all(existingBabies.map((baby) => ctx.db.delete(baby._id)));

    // Insert new babies
    const now = Date.now();
    await Promise.all(
      args.babies.map((baby) =>
        ctx.db.insert("babies", {
          settingsId: settings._id,
          gender: baby.gender,
          createdAt: now,
          updatedAt: now,
        })
      )
    );
  },
});

export const deleteAccount = mutation({
  args: { settingsId: v.id("settings") },
  handler: async (ctx, args) => {
    // Delete all related data
    const babies = await ctx.db
      .query("babies")
      .withIndex("by_settingsId", (q) => q.eq("settingsId", args.settingsId))
      .collect();

    // Delete babies
    await Promise.all(babies.map((baby) => ctx.db.delete(baby._id)));

    // Delete settings
    await ctx.db.delete(args.settingsId);
  },
});

export const getAnnouncementDate = query({
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings?.announcementDate;
  },
});
