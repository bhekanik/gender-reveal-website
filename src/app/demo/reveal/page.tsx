"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { TiltCard } from "@/components/demo/tilt-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { Love_Ya_Like_A_Sister } from "next/font/google";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const font = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: ["400"],
});

const DEMO_BABY = { gender: "girl" };

function renderFloatingElements(isGirl: boolean) {
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
}

function FloatingElement({
  children,
  delay = 0,
  duration = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
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
}

export default function DemoRevealPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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
      setTimeout(() => setIsRevealed(true), 1000);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleShare = async () => {
    const text = "It's a girl! 🎉";

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
      navigator.clipboard.writeText(`${text}\n\n${window.location.href}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <AnimatedBackground variant="pink">
      {renderFloatingElements(true)}

      {isRevealed && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={["#EC4899", "#FB7185", "#FDA4AF"]}
          recycle={true}
          numberOfPieces={200}
        />
      )}

      <div
        className={cn(
          "grid place-items-center h-screen container mx-auto px-4 relative z-10",
          font.variable
        )}
      >
        <div
          className="font-love-ya-like-a-sister"
          style={{ perspective: "1000px" }}
        >
          <TiltCard>
            <motion.div
              className="max-w-2xl mx-auto text-center space-y-12 p-8 rounded-3xl backdrop-blur-md shadow-xl border border-white/40 relative z-20 bg-pink-100/30"
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
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                  It&apos;s a girl! 🎉
                </h1>
                <p className="text-xl md:text-2xl text-neutral-700">
                  Sugar, spice, and everything nice - we can&apos;t wait to meet
                  our little princess! 👶💖
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={handleShare}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share the News
                </Button>
              </motion.div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </AnimatedBackground>
  );
}
