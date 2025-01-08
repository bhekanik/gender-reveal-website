"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Create Your Site",
    description:
      "Sign up and customize your reveal site with our intuitive tools.",
  },
  {
    title: "Add Your Magic",
    description:
      "Choose your features, set your reveal time, and personalize every detail.",
  },
  {
    title: "Share the Joy",
    description:
      "Invite loved ones to join in the excitement of your reveal moment.",
  },
];

export function StepsSection() {
  return (
    <section className="py-24 bg-brand-pink/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-12 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-12 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-4 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Create Your Reveal in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our simple process gets you from idea to reveal in just three easy
            steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute hidden md:block top-[88px] left-[120px] right-[120px] h-0.5 bg-gradient-to-r from-brand-pink via-primary to-brand-blue" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center relative bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-border/80 transition-all group">
                  {/* Number Circle */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-blue p-0.5 mx-auto mb-6 transform group-hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center text-2xl font-bold relative overflow-hidden">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-brand-pink via-primary to-brand-blue group-hover:opacity-30 transition-opacity" />
                        <span className="relative">{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Decorative dots */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[88px] -right-4 space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-pink/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
