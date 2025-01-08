"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
};

export function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
        The Big Reveal In...
      </h2>
      <div className="flex justify-center gap-4 md:gap-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 min-w-[100px] shadow-lg"
          >
            <div className="text-3xl md:text-4xl font-bold text-neutral-800">
              {value}
            </div>
            <div className="text-sm text-neutral-600 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
