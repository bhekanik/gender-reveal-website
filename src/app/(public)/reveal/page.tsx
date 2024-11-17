"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const FloatingElement = ({
  children,
  delay = 0,
  duration = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ y: 0, x: 0 }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className="absolute opacity-20"
  >
    {children}
  </motion.div>
);

export default function RevealPage() {
  const announcementDate = useQuery(api.settings.getAnnouncementDate);
  const settings = useQuery(api.settings.get);
  console.log("settings:", settings);
  const babies = useQuery(api.settings.getBabies, {
    settingsId: settings!._id,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!announcementDate) return;

    const targetDate = new Date(announcementDate).getTime();
    const now = new Date().getTime();

    if (now > targetDate) {
      setTimeout(() => setIsRevealed(true), 1000);
    }
  }, [announcementDate]);

  const handleShare = async () => {
    const text = getBabyAnnouncement(babies || []);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Our Baby Reveal",
          text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(`${text}\n\n: ${window.location.href}`);
      alert("Copied to clipboard!");
    }
  };

  // Helper function to generate announcement text
  const getBabyAnnouncement = (babies: { gender: string }[]) => {
    if (babies.length === 0) return "The big reveal is here!";
    if (babies.length === 1) return `It's a ${babies[0].gender}! 🎉`;

    const genderCount = babies.reduce(
      (acc, baby) => {
        acc[baby.gender] = (acc[baby.gender] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const parts = [];
    if (genderCount.boy)
      parts.push(
        `${genderCount.boy} ${genderCount.boy === 1 ? "boy" : "boys"}`
      );
    if (genderCount.girl)
      parts.push(
        `${genderCount.girl} ${genderCount.girl === 1 ? "girl" : "girls"}`
      );

    return `We're having ${parts.join(" and ")}! 🎉`;
  };

  // Helper function to get gradient colors
  const getGradientColors = (babies: { gender: string }[]) => {
    if (babies.length === 0)
      return "from-neutral-400 via-neutral-500 to-neutral-600";
    if (babies.length === 1) {
      return babies[0].gender === "girl"
        ? "from-pink-400 via-pink-500 to-pink-600"
        : "from-blue-400 via-blue-500 to-blue-600";
    }
    // For multiple babies, create a gradient based on the genders
    const hasGirl = babies.some((b) => b.gender === "girl");
    const hasBoy = babies.some((b) => b.gender === "boy");
    if (hasGirl && hasBoy) return "from-pink-400 via-purple-500 to-blue-600";
    if (hasGirl) return "from-pink-400 via-rose-500 to-pink-600";
    return "from-blue-400 via-sky-500 to-blue-600";
  };

  if (!announcementDate || !babies) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const targetDate = new Date(announcementDate).getTime();
  const now = new Date().getTime();

  if (now <= targetDate) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-neutral-800">
            Not So Fast! 🤫
          </h1>
          <p className="text-neutral-600">
            The big reveal hasn&apos;t happened yet. Check back when the
            countdown reaches zero!
          </p>
          <Button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
          >
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  const backgroundGradients =
    babies?.length === 1
      ? babies[0].gender === "girl"
        ? [
            "from-pink-200/40 via-rose-200/40 to-pink-100/40",
            "from-rose-100/40 via-pink-200/40 to-rose-200/40",
          ]
        : [
            "from-blue-200/40 via-sky-200/40 to-blue-100/40",
            "from-sky-100/40 via-blue-200/40 to-sky-200/40",
          ]
      : [
          "from-pink-200/40 via-purple-200/40 to-blue-200/40",
          "from-blue-200/40 via-purple-200/40 to-pink-200/40",
        ];

  const getConfettiColors = (babies: { gender: string }[]) => {
    const colors = [];
    if (babies.some((b) => b.gender === "girl"))
      colors.push("#EC4899", "#FB7185", "#FDA4AF");
    if (babies.some((b) => b.gender === "boy"))
      colors.push("#60A5FA", "#3B82F6", "#93C5FD");
    return colors;
  };

  const getMessage = (babies: { gender: string }[]) => {
    if (babies.length === 0) return "";
    if (babies.length === 1) {
      return babies[0].gender === "girl"
        ? "Sugar, spice, and everything nice - we can't wait to meet our little princess! 👶💖"
        : "Snips and snails, and puppy dog tails - we can't wait to meet our little prince! 👶💙";
    }

    const girlCount = babies.filter((b) => b.gender === "girl").length;
    const boyCount = babies.filter((b) => b.gender === "boy").length;
    const emojis = [...Array(boyCount)]
      .map(() => "👶💙")
      .concat([...Array(girlCount)].map(() => "👶💖"))
      .join(" ");

    // Helper function to create grammatically correct lists
    const createList = (count: number, word: string) => {
      if (count === 0) return "";
      return `${count} ${word}${count > 1 ? "s" : ""}`;
    };

    // Create the lists for boys and girls
    const boyList = createList(boyCount, "prince");
    const girlList = createList(girlCount, "princess");

    // Combine the lists grammatically
    const childrenList = [boyList, girlList].filter(Boolean).join(" and ");

    // Choose the appropriate message based on the number of babies
    let multipleBabiesMessage;
    if (babies.length > 3) {
      multipleBabiesMessage =
        "It's a full royal court! What an incredible blessing!";
    } else if (babies.length === 3) {
      multipleBabiesMessage = "Triple the blessings, triple the joy!";
    } else {
      multipleBabiesMessage = "Double the love, double the joy!";
    }

    return `${multipleBabiesMessage} We can't wait to meet our precious ${childrenList}! ${emojis}`;
  };

  const renderFloatingElements = (isGirl: boolean) => {
    const color = isGirl ? "#FDF2F8" : "#EFF6FF"; // Pink/Blue base colors

    return (
      <>
        {/* Top left heart */}
        <FloatingElement delay={0} duration={15}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill={color}
            className="absolute top-20 left-20 rotate-12"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </FloatingElement>

        {/* Top right stars */}
        <FloatingElement delay={2} duration={18}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill={color}
            className="absolute top-40 right-40 -rotate-12"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </FloatingElement>

        {/* Bottom left circles */}
        <FloatingElement delay={4} duration={20}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill={color}
            className="absolute bottom-40 left-40"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </FloatingElement>

        {/* Bottom right elements */}
        <FloatingElement delay={6} duration={17}>
          {isGirl ? (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill={color}
              className="absolute bottom-20 right-20 rotate-45"
            >
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            </svg>
          ) : (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill={color}
              className="absolute bottom-20 right-20 rotate-45"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          )}
        </FloatingElement>

        {/* Center decorative elements */}
        <FloatingElement delay={8} duration={16}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill={color}
            className="absolute top-1/2 left-1/4 -translate-y-1/2"
          >
            {isGirl ? (
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            ) : (
              <circle cx="12" cy="12" r="10" />
            )}
          </svg>
        </FloatingElement>
      </>
    );
  };

  return (
    <AnimatedBackground
      variant={
        babies?.length === 1
          ? babies[0].gender === "girl"
            ? "pink"
            : "blue"
          : "default"
      }
    >
      {renderFloatingElements(
        babies?.some((b) => b.gender === "girl") ?? false
      )}

      {isRevealed && babies && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={getConfettiColors(babies)}
          recycle={true}
          numberOfPieces={200 * babies.length} // More confetti for more babies!
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <h1
              className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${getGradientColors(babies || [])} bg-clip-text text-transparent`}
            >
              {getBabyAnnouncement(babies || [])}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600">
              {getMessage(babies || [])}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              onClick={handleShare}
              className={`px-8 py-4 rounded-full bg-gradient-to-r ${getGradientColors(babies || [])} text-white hover:opacity-90 transition-opacity`}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share the News
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
