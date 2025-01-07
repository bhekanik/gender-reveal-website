"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import { Copy, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";

interface SharingFormProps {
  site: Doc<"sites">;
}

export function SharingForm({ site }: SharingFormProps) {
  const siteUrl = `https://${site.subdomain}.pinkandblue.live`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        siteUrl
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        siteUrl
      )}&text=${encodeURIComponent("Join us for our baby gender reveal!")}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Share Your Reveal Site</h3>
        <p className="text-sm text-muted-foreground">
          Share your reveal site with friends and family
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Input value={siteUrl} readOnly />
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" className="flex-1" onClick={shareOnFacebook}>
          <Facebook className="mr-2 h-4 w-4" />
          Share on Facebook
        </Button>
        <Button variant="outline" className="flex-1" onClick={shareOnTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          Share on Twitter
        </Button>
      </div>
    </div>
  );
}
