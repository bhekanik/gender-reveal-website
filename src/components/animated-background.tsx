"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FloatingElement = ({
  children,
  delay = 0,
  duration = 20,
  className = "",
  style = {},
}: FloatingElementProps) => (
  <motion.div
    className={`fixed pointer-events-none ${className}`}
    style={style}
    animate={{
      y: [0, -40, 0],
      x: [0, 25, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
      times: [0, 0.5, 1],
    }}
  >
    {children}
  </motion.div>
);

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: "default" | "pink" | "blue";
  density?: "low" | "medium" | "high";
}

export function AnimatedBackground({
  children,
  variant = "default",
  density = "medium",
}: AnimatedBackgroundProps) {
  const gradients = {
    default: {
      first: "from-blue-200/40 via-purple-100/30 to-pink-200/40",
      second: "from-pink-200/40 via-purple-100/30 to-blue-200/40",
      third: "from-blue-100/20 to-pink-100/20",
    },
    pink: {
      first: "from-pink-200/30 via-rose-200/30 to-pink-100/30",
      second: "from-rose-100/30 via-pink-200/30 to-rose-200/30",
      third: "from-pink-100/20 to-rose-100/20",
    },
    blue: {
      first: "from-blue-200/30 via-sky-200/30 to-blue-100/30",
      second: "from-sky-100/30 via-blue-200/30 to-sky-200/30",
      third: "from-blue-100/20 to-sky-100/20",
    },
  };

  const elements = [
    {
      type: "heart",
      sizes: ["w-12 h-12", "w-16 h-16", "w-20 h-20"],
      colors: ["#FDE7F3", "#FCE7F3", "#FBCFE8"],
    },
    {
      type: "star",
      sizes: ["w-10 h-10", "w-14 h-14", "w-18 h-18"],
      colors: ["#DBEAFE", "#BFDBFE", "#93C5FD"],
    },
    {
      type: "circle",
      sizes: ["w-8 h-8", "w-12 h-12", "w-16 h-16"],
      colors: ["#E9D5FF", "#DDD6FE", "#C4B5FD"],
    },
    {
      type: "rattle",
      sizes: ["w-14 h-14", "w-18 h-18", "w-22 h-22"],
      colors: ["#FDE7F3", "#DBEAFE", "#E9D5FF"],
    },
  ];

  const densityConfig = {
    low: 8,
    medium: 12,
    high: 16,
  };

  const renderElements = () => {
    const numElements = densityConfig[density];
    const elements_to_render = [];

    for (let i = 0; i < numElements; i++) {
      const element = elements[Math.floor(Math.random() * elements.length)];
      const size =
        element.sizes[Math.floor(Math.random() * element.sizes.length)];
      const color =
        element.colors[Math.floor(Math.random() * element.colors.length)];
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 15;

      // Calculate positions for better distribution
      const leftPosition = `${Math.floor(Math.random() * 85)}%`;
      const topPosition = `${Math.floor(Math.random() * 85)}%`;

      elements_to_render.push(
        <FloatingElement
          key={i}
          delay={delay}
          duration={duration}
          className={`${size} absolute`}
          style={{
            left: leftPosition,
            top: topPosition,
          }}
        >
          {renderShape(element.type, color)}
        </FloatingElement>
      );
    }

    return elements_to_render;
  };

  const renderShape = (type: string, color: string) => {
    switch (type) {
      case "heart":
        return (
          <svg viewBox="0 0 24 24" fill={color} className="opacity-40">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "star":
        return (
          <svg viewBox="0 0 24 24" fill={color} className="opacity-40">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case "circle":
        return (
          <svg viewBox="0 0 24 24" fill={color} className="opacity-40">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case "rattle":
        return (
          <svg viewBox="0 0 24 24" fill={color} className="opacity-40">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen relative isolate overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[variant].first}`}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
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
            opacity: [0.6, 0.4, 0.6],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradients[variant].third} backdrop-blur-[100px]`}
          animate={{
            opacity: [0.2, 0.4, 0.2],
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
      {renderElements()}

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </main>
  );
}
