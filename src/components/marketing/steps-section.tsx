"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Create Your Site",
    description:
      "Sign up and customize your reveal site with our intuitive tools.",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>
    ),
  },
  {
    title: "Add Your Magic",
    description:
      "Choose your features, set your reveal time, and personalize every detail.",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.828 14.828a4 4 0 01-5.656 0M9.172 9.172a4 4 0 015.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    ),
  },
  {
    title: "Share the Joy",
    description:
      "Invite loved ones to join in the excitement of your reveal moment.",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0.8 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    ),
  },
];

const FloatingShape = ({
  delay = 0,
  style,
}: {
  delay?: number;
  style?: React.CSSProperties;
}) => (
  <motion.div
    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-brand-pink to-brand-blue opacity-20"
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
    }}
    style={style}
  />
);

export function StepsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      className="py-16 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Reduce number of floating shapes on mobile */}
      {[...Array(window?.innerWidth > 768 ? 20 : 10)].map((_, i) => (
        <FloatingShape
          key={i}
          delay={i * 0.2}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        style={{ opacity, scale }}
        className="container relative px-4 mx-auto"
      >
        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-brand-pink via-primary to-brand-blue bg-clip-text text-transparent px-4"
          >
            Create Your Reveal in Minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
          >
            Our simple process gets you from idea to reveal in just three easy
            steps.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line for tablet/desktop */}
          <motion.div
            className="absolute hidden md:block top-[45%] left-[120px] right-[120px] h-0.5 bg-gradient-to-r from-brand-pink via-primary to-brand-blue"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Mobile connection line (vertical) */}
          <motion.div
            className="absolute md:hidden left-[24px] top-[80px] bottom-[80px] w-0.5 bg-gradient-to-b from-brand-pink via-primary to-brand-blue"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {/* Mobile step connector dots */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-[90px] flex flex-col space-y-1 md:hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-pink/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40" />
                  </div>
                )}

                <div className="group relative bg-background/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 hover:border-border transition-all">
                  {/* Step number - adjusted position for mobile */}
                  <motion.div
                    className="absolute -top-3 -left-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-brand-pink to-brand-blue p-0.5 z-10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-xs md:text-sm lg:text-base">
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Icon - adjusted size for mobile */}
                  <div className="mb-3 md:mb-4 lg:mb-6 text-primary">
                    <div className="w-6 h-6 md:w-8 md:h-8">{step.icon}</div>
                  </div>

                  {/* Content - adjusted spacing and font sizes */}
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect - keep as is */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-pink/10 to-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    whileHover={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
