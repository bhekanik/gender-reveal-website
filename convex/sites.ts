import { faker } from "@faker-js/faker";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all sites for a user
export const getUserSites = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const sites = await ctx.db
      .query("sites")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return sites;
  },
});

// Get a single site
export const getSite = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.siteId);
    return site;
  },
});

// Create a new site
export const createSite = mutation({
  args: {
    userId: v.id("users"),
    siteName: v.string(),
    subdomain: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if siteName is already taken
    const existingSite = await ctx.db
      .query("sites")
      .withIndex("by_siteName", (q) => q.eq("siteName", args.siteName))
      .first();

    if (existingSite) {
      throw new Error("Site name already taken");
    }

    // Check if subdomain is already taken and generate a new one if needed
    let subdomain = args.subdomain;
    let existingSubdomain = await ctx.db
      .query("sites")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", subdomain))
      .first();

    while (existingSubdomain) {
      // Generate a new random subdomain
      const adjective = faker.word.adjective();
      const noun = faker.word.noun();
      subdomain = `${adjective}-${noun}`.toLowerCase();

      existingSubdomain = await ctx.db
        .query("sites")
        .withIndex("by_subdomain", (q) => q.eq("subdomain", subdomain))
        .first();
    }

    // Update args.subdomain with the final valid subdomain
    args.subdomain = subdomain;

    const now = Date.now();

    // Create the site
    const siteId = await ctx.db.insert("sites", {
      userId: args.userId,
      siteName: args.siteName,
      subdomain: args.subdomain,
      paid: false,
      published: false,
      createdAt: now,
      updatedAt: now,
    });

    // Create default settings for the site
    await ctx.db.insert("settings", {
      siteId,
      announcementDate: now + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      welcomeHeroText: "Welcome to Our Baby Gender Reveal!",
      revealText: "The big moment is here...",
      features: {
        showCountdown: true,
        showGenderPoll: true,
        showGenderQuiz: true,
      },
      theme: "default",
      createdAt: now,
      updatedAt: now,
    });

    // Create default baby for the site
    await ctx.db.insert("babies", {
      siteId,
      name: "Baby",
      gender: "girl",
      createdAt: now,
      updatedAt: now,
    });

    return siteId;
  },
});

// Update site details
export const updateSite = mutation({
  args: {
    siteId: v.id("sites"),
    siteName: v.string(),
    subdomain: v.string(),
  },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.siteId);
    if (!site) {
      throw new Error("Site not found");
    }

    // Check if new siteName is already taken by another site
    if (args.siteName !== site.siteName) {
      const existingSite = await ctx.db
        .query("sites")
        .withIndex("by_siteName", (q) => q.eq("siteName", args.siteName))
        .first();

      if (existingSite) {
        throw new Error("Site name already taken");
      }
    }

    // Check if new subdomain is already taken by another site
    if (args.subdomain !== site.subdomain) {
      const existingSubdomain = await ctx.db
        .query("sites")
        .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
        .first();

      if (existingSubdomain) {
        throw new Error("Subdomain already taken");
      }
    }

    await ctx.db.patch(args.siteId, {
      siteName: args.siteName,
      subdomain: args.subdomain,
      updatedAt: Date.now(),
    });
  },
});

// Delete a site and all its associated data
export const deleteSite = mutation({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    // Delete all associated data
    const deleteQueries = [
      ctx.db
        .query("settings")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
      ctx.db
        .query("babies")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
      ctx.db
        .query("votes")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
      ctx.db
        .query("quizQuestions")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
      ctx.db
        .query("quizResponses")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
      ctx.db
        .query("quizSessions")
        .withIndex("by_siteId", (q) => q.eq("siteId", args.siteId))
        .collect(),
    ];

    const results = await Promise.all(deleteQueries);

    // Delete all records
    await Promise.all(
      results.flat().map((record) => ctx.db.delete(record._id))
    );

    // Finally, delete the site itself
    await ctx.db.delete(args.siteId);
  },
});

// Update site status (paid/published)
export const updateSiteStatus = mutation({
  args: {
    siteId: v.id("sites"),
    paid: v.optional(v.boolean()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.siteId);
    if (!site) {
      throw new Error("Site not found");
    }

    const updates: Partial<{
      paid: boolean;
      published: boolean;
      updatedAt: number;
    }> = {
      updatedAt: Date.now(),
    };

    if (args.paid !== undefined) {
      updates.paid = args.paid;
    }

    if (args.published !== undefined) {
      // Only allow publishing if site is paid
      if (args.published && !site.paid && !args.paid) {
        throw new Error("Cannot publish unpaid site");
      }
      updates.published = args.published;
    }

    await ctx.db.patch(args.siteId, updates);
  },
});

// Add a new query to get site by subdomain
export const getSiteBySubdomain = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const site = await ctx.db
      .query("sites")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
      .first();
    return site;
  },
});
