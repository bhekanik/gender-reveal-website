"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-3">
          <Link
            href="/"
            onClick={handleClick}
            className={
              pathname === "/"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }
          >
            Home
          </Link>
          <Link
            href="/examples"
            onClick={handleClick}
            className={
              pathname === "/examples"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }
          >
            Examples
          </Link>
          <SignedOut>
            <Link
              href="/pricing"
              onClick={handleClick}
              className={
                pathname === "/pricing"
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }
            >
              Pricing
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={handleClick}
              className={
                pathname === "/dashboard"
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }
            >
              Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="outline" asChild>
                <Link href="/sign-in" onClick={handleClick}>
                  Sign In
                </Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90"
                asChild
              >
                <Link href="/sign-up" onClick={handleClick}>
                  Create Reveal Site
                </Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
