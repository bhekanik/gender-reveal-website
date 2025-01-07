"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";
import Case from "case";
import { useMutation, useQuery } from "convex/react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function EmptyState() {
  const { userId } = useAuth();
  const router = useRouter();
  const createSite = useMutation(api.sites.createSite);
  const user = useQuery(api.users.getUserByClerkId, {
    clerkUserId: userId || "",
  });

  const handleCreateSite = async () => {
    if (!user) return;

    try {
      const defaultSiteName = Case.sentence(
        `${faker.word.adjective()} ${faker.word.noun()}`
      );
      const siteId = await createSite({
        userId: user.id,
        siteName: defaultSiteName,
        subdomain: defaultSiteName.toLowerCase().replace(/\s+/g, "-"),
      });

      toast.success("Site created successfully!");
      router.push(`/dashboard/sites/${siteId}/settings`);
    } catch (error) {
      toast.error("Failed to create site. Please try again.");
      console.error("Error creating site:", error);
    }
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Sparkles className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">No reveal sites yet</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Create your first gender reveal site and start sharing the excitement
          with your loved ones.
        </p>
        <Button
          size="lg"
          className="mt-6 bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90"
          asChild
          onClick={handleCreateSite}
        >
          <Link href="/dashboard/sites/create">
            <Sparkles className="mr-2 h-4 w-4" />
            Create Your First Reveal
          </Link>
        </Button>
      </div>
    </div>
  );
}
