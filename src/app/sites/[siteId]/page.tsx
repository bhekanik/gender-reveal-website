import { AnimatedBackground } from "@/components/animated-background";
import { CountdownTimer } from "@/components/countdown-timer";
import { GenderPoll } from "@/components/gender-poll";
import { WelcomeHero } from "@/components/welcome-hero";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { Love_Ya_Like_A_Sister } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `BK & Nobue's Baby Gender Reveal - Pink and Blue`,
  description: `Join BK & Nobue for their baby gender reveal! Make your prediction and join the excitement as we countdown to the big moment.`,
  keywords: [
    "baby gender reveal",
    "gender prediction",
    "baby announcement",
    "BK & Nobue gender reveal",
    "interactive gender reveal",
    "online gender reveal",
    "baby reveal countdown",
  ],
  openGraph: {
    title: `BK & Nobue's Baby Gender Reveal`,
    description: `The big reveal! Join us in guessing if it&apos;s a boy or girl.`,
    url: `${config.baseUrl}/`,
    siteName: "Pink and Blue",
    images: [
      {
        url: `${config.baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `BK & Nobue's Baby Gender Reveal`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `BK & Nobue's Baby Gender Reveal`,
    description: `Make your prediction! Will BK & Nobue's baby be a boy or girl?`,
    images: [`${config.baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${config.baseUrl}/`,
  },
};

const font = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: ["400"],
});

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  const settings = await fetchQuery(api.settings.get, {
    siteId: siteId as Id<"sites">,
  });

  if (!settings) {
    return null;
  }

  const targetDate = new Date(settings.announcementDate).getTime();
  const now = new Date().getTime();
  const expired = now > targetDate;

  if (expired) {
    redirect(config.isDev ? `/sites/${siteId}/reveal` : `/reveal`);
  }

  return (
    <AnimatedBackground variant="default" density="high">
      <div
        className={cn(
          "min-h-screen grid place-items-center py-4",
          font.variable
        )}
      >
        <div className="container mx-auto px-4 py-4 font-love-ya-like-a-sister">
          <div className="max-w-4xl mx-auto space-y-4">
            <WelcomeHero />
            {settings.features.showCountdown && <CountdownTimer />}
            {settings.features.showGenderPoll && <GenderPoll />}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
