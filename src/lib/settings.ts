import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getSettings(siteId: string) {
  try {
    return await convex.query(api.settings.get, {
      siteId: siteId as Id<"sites">,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
