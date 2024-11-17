import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { useQuery } from "convex/react";

export type User = {
  id: Id<"users">;
  role: "user" | "admin";
  email: string;
  firstName?: string;
  lastName?: string;
  stripeCustomerId?: string;
  username: string;
  clerkUserId?: string;
  trialUsed: boolean;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export async function getUserFromClerkId(clerkUserId: string): Promise<{
  id?: Id<"users">;
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  stripeCustomerId?: string;
}> {
  if (!clerkUserId) {
    return {};
  }

  const user = await fetchQuery(api.users.getUserByClerkId, { clerkUserId });

  if (!user) {
    return {};
  }

  return {
    id: user.id,
    role: user.role,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    stripeCustomerId: user.stripeCustomerId,
  };
}

export async function getUserFromId(userId: Id<"users">): Promise<User | null> {
  if (!userId) {
    return null;
  }

  return fetchQuery(api.users.getUserById, { userId });
}

// Client-side React hook for getting the current user
export function useUser(clerkUserId: string | null) {
  return useQuery(api.users.getUserByClerkId, {
    clerkUserId: clerkUserId ?? "",
  });
}
