"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";
import { useMutation, useQuery } from "convex/react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const createSite = useMutation(api.sites.createSite);
  const user = useQuery(api.users.getUserByClerkId, {
    clerkUserId: userId || "",
  });

  const handleCreateSite = async () => {
    if (!user) return;

    try {
      const defaultSiteName = `${faker.word.adjective()} ${faker.word.noun()}`;
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
    <div className={cn("flex items-center justify-between", className)}>
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="default"
          className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90"
          onClick={handleCreateSite}
          disabled={!user}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Create New Site
        </Button>
        {children}
      </div>
    </div>
  );
}
