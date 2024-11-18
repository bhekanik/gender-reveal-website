"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { Baby, ChevronLeft, Eye, Settings, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SiteLayoutProps {
  children: React.ReactNode;
  siteId: Id<"sites">;
}

export function SiteLayout({ children, siteId }: SiteLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const site = useQuery(api.sites.getSite, { siteId });
  const user = useQuery(api.users.getUser);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (site === null) {
    router.push("/dashboard");
    return null;
  }

  if (site && user && site.userId !== user._id) {
    toast.error("You don't have access to this site");
    router.push("/dashboard");
    return null;
  }

  const navItems = [
    { path: `/sites/${siteId}`, label: "Overview", icon: Baby },
    { path: `/sites/${siteId}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <AnimatePresence>
            <motion.div
              className="flex items-center gap-4 md:gap-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => router.push("/dashboard")}
              >
                <ChevronLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <nav className="hidden items-center gap-1 sm:flex">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={pathname === item.path ? "default" : "ghost"}
                    size="sm"
                    onClick={() => router.push(item.path)}
                    className="gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </motion.div>
          </AnimatePresence>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => router.push(`/preview/${siteId}`)}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onSelect={() =>
                    navigator.clipboard.writeText(
                      `https://yoursite.com/sites/${siteId}`
                    )
                  }
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=https://yoursite.com/sites/${siteId}`,
                      "_blank"
                    )
                  }
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=https://yoursite.com/sites/${siteId}`,
                      "_blank"
                    )
                  }
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    const embedCode = `<iframe src="https://yoursite.com/embed/${siteId}" width="100%" height="500" frameborder="0"></iframe>`;
                    navigator.clipboard.writeText(embedCode);
                    toast.success("Embed code copied to clipboard");
                  }}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Copy Embed Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container max-w-screen-2xl py-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
