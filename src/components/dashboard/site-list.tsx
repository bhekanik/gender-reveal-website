"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Site {
  _id: Id<"sites">;
  _creationTime: number;
  siteName: string;
  paid: boolean;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

export function SiteList({ userId }: { userId: Id<"users"> }) {
  const sites = useQuery(api.sites.getUserSites, { userId });
  const createSite = useMutation(api.sites.createSite);
  const deleteSite = useMutation(api.sites.deleteSite);
  const router = useRouter();
  const [newSiteName, setNewSiteName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSite = async () => {
    try {
      const siteId = await createSite({
        userId,
        siteName: newSiteName,
      });
      setNewSiteName("");
      setIsCreating(false);
      toast.success("Site created successfully");
      router.push(`/sites/${siteId}/settings`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create site"
      );
    }
  };

  const handleDeleteSite = async (siteId: Id<"sites">) => {
    try {
      await deleteSite({ siteId });
      toast.success("Site deleted successfully");
    } catch (error) {
      toast.error("Failed to delete site");
    }
  };

  if (!sites) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Sites</h2>
        <Button onClick={() => setIsCreating(true)}>Create New Site</Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Site</CardTitle>
            <CardDescription>
              Choose a unique name for your reveal site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter site name"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSite}>Create Site</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site: Site) => (
          <Card key={site._id}>
            <CardHeader>
              <CardTitle>{site.siteName}</CardTitle>
              <div className="flex space-x-2">
                <Badge variant={site.published ? "default" : "secondary"}>
                  {site.published ? "Published" : "Draft"}
                </Badge>
                <Badge variant={site.paid ? "default" : "secondary"}>
                  {site.paid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created on {new Date(site.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push(`/sites/${site._id}/settings`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/preview/${site._id}`)}
              >
                Preview
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteSite(site._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
