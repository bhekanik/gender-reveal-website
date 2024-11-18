"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement = ({
  children,
  delay = 0,
  duration = 20,
  className = "",
}: FloatingElementProps) => (
  <motion.div
    className={`fixed pointer-events-none ${className}`}
    animate={{
      y: [0, -40, 0],
      x: [0, 25, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: "default" | "pink" | "blue";
}

export function AnimatedBackground({
  children,
  variant = "default",
}: AnimatedBackgroundProps) {
  const gradients = {
    default: {
      first: "from-blue-200/50 via-purple-100/40 to-pink-200/50",
      second: "from-pink-200/50 via-purple-100/40 to-blue-200/50",
      third: "from-blue-100/30 to-pink-100/30",
    },
    pink: {
      first: "from-pink-200/40 via-rose-200/40 to-pink-100/40",
      second: "from-rose-100/40 via-pink-200/40 to-rose-200/40",
      third: "from-pink-100/30 to-rose-100/30",
    },
    blue: {
      first: "from-blue-200/40 via-sky-200/40 to-blue-100/40",
      second: "from-sky-100/40 via-blue-200/40 to-sky-200/40",
      third: "from-blue-100/30 to-sky-100/30",
    },
  };

  return (
    <main className="min-h-screen relative isolate overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[variant].first}`}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-tr ${gradients[variant].second}`}
          animate={{
            opacity: [0.7, 0.5, 0.7],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradients[variant].third}`}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Elements */}
      {/* Large Elements */}
      <FloatingElement className="left-[5%] top-[10%]" delay={0} duration={18}>
        <svg
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="#E9D5FF"
          className="opacity-40"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="right-[15%] top-[20%]"
        delay={5}
        duration={20}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 24 24"
          fill="#DBEAFE"
          className="opacity-40"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </FloatingElement>

      {/* Medium Elements */}
      <FloatingElement className="left-[20%] top-[40%]" delay={2} duration={15}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="#FCE7F3"
          className="opacity-40"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="right-[25%] bottom-[30%]"
        delay={8}
        duration={22}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="#E9D5FF"
          className="opacity-40"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
        </svg>
      </FloatingElement>

      {/* Small Elements */}
      <FloatingElement className="left-[40%] top-[15%]" delay={3} duration={17}>
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="#BFDBFE"
          className="opacity-40"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="right-[10%] top-[45%]"
        delay={6}
        duration={19}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="#FCE7F3"
          className="opacity-40"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </FloatingElement>

      {/* Extra Small Elements */}
      <FloatingElement
        className="left-[30%] bottom-[20%]"
        delay={4}
        duration={16}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="#DBEAFE"
          className="opacity-40"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="right-[35%] top-[25%]"
        delay={7}
        duration={21}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="#E9D5FF"
          className="opacity-40"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </FloatingElement>

      {/* Additional Elements for More Coverage */}
      <FloatingElement
        className="left-[50%] bottom-[40%]"
        delay={9}
        duration={23}
      >
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="#BFDBFE"
          className="opacity-40"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="right-[45%] bottom-[15%]"
        delay={1}
        duration={24}
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="#FCE7F3"
          className="opacity-40"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
        </svg>
      </FloatingElement>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </main>
  );
}
