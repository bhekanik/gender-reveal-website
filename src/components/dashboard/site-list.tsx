"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { EmptyState } from "./empty-state";
import { SiteCard } from "./site-card";

interface SiteListProps {
  userId: Id<"users">;
}

export function SiteList({ userId }: SiteListProps) {
  const sites = useQuery(api.sites.getUserSites, { userId });

  if (!sites?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <SiteCard key={site._id} site={site} />
      ))}
    </div>
  );
}
