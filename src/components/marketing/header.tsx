"use client";

import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 w-full border-b backdrop-blur-sm transition-all bg-background/80 border-border/40 z-50",
        className
      )}
    >
      <div className="mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 transition-opacity hover:opacity-90"
          >
            <div className="relative size-12 rounded-lg bg-gradient-to-br from-brand-pink via-primary to-brand-blue">
              <Image
                src="/logo.png"
                alt={`${config.projectName} Logo`}
                className="absolute inset-0 m-auto size-10 text-black"
                width={80}
                height={80}
              />
            </div>
            <span className="hidden font-display text-xl font-bold md:block">
              {config.projectName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                pathname === "/"
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary hover:bg-muted"
              )}
              href="/"
            >
              Home
            </Link>

            <SignedIn>
              <Link
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === "/dashboard"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
                href="/dashboard"
              >
                Dashboard
              </Link>
            </SignedIn>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90"
                  asChild
                >
                  <Link href="/sign-up">Create Reveal Site</Link>
                </Button>
              </div>
            </SignedOut>

            <SignedIn>
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90"
                asChild
              >
                <Link href="/dashboard/sites/create">
                  <Sparkles className="mr-2 size-4" />
                  New Reveal
                </Link>
              </Button>
            </SignedIn>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </SignedIn>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
