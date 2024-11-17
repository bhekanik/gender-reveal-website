import { SiteList } from "@/components/dashboard/site-list";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await fetchQuery(api.users.getUserByClerkId, {
    clerkUserId: userId,
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container py-8">
      <SiteList userId={user.id} />
    </div>
  );
}
