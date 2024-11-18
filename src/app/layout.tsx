import { Header } from "@/components/marketing/header";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Pink and Blue – Create Your Personalized Baby Gender Reveal Website",
  description:
    "Create and customize your own baby gender reveal website with Pink and Blue. Share the excitement with friends and family through interactive polls, quizzes, countdowns, and more. Start creating your personalized reveal site today!",
  keywords: [
    "Pink and Blue",
    "baby gender reveal",
    "personalized reveal site",
    "create gender reveal website",
    "baby reveal platform",
    "gender reveal countdown",
    "interactive baby reveal",
    "gender reveal quiz",
    "gender reveal poll",
    "baby announcement",
    "baby reveal online",
    "customizable reveal page",
    "micro SaaS baby reveal",
    "share baby news",
    "expecting parents",
    "gender reveal website",
  ],
  openGraph: {
    title:
      "Pink and Blue – Create Your Personalized Baby Gender Reveal Website",
    description:
      "Design your own interactive baby gender reveal website with Pink and Blue. Engage your loved ones with polls, quizzes, and countdowns, and make your announcement unforgettable.",
    url: "https://www.pinkandblue.live",
    siteName: "Pink and Blue",
    images: [
      {
        url: "https://www.pinkandblue.live/og-image.jpg", // Replace with the actual URL of your Open Graph image
        width: 1200,
        height: 630,
        alt: "Pink and Blue – Baby Gender Reveal Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pink and Blue – Create Your Personalized Baby Gender Reveal Website",
    description:
      "Share your joy with Pink and Blue by creating a personalized baby gender reveal website featuring interactive elements like polls, quizzes, and countdowns.",
    images: ["https://www.pinkandblue.live/og-image.jpg"], // Replace with the actual URL of your Twitter image
    site: "@YourTwitterHandle", // Replace with your Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.pinkandblue.live",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider
          publishableKey={
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "pk_test_JA=="
          }
          dynamic
        >
          <ConvexClientProvider>
            <NextTopLoader />
            <Header />
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
