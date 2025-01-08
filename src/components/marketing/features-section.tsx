import { Baby, Heart, Share2, Sparkles, Timer, Users } from "lucide-react";

// Move these to a separate constants file
const features = [
  {
    title: "Interactive Polls",
    description:
      "Engage your guests with real-time gender prediction polls. Watch as the excitement builds with every vote!",
    icon: Users,
  },
  {
    title: "Custom Countdown",
    description:
      "Build anticipation with an elegant countdown timer. Perfect for both virtual and in-person reveals.",
    icon: Timer,
  },
  {
    title: "Fun Mini-Quiz",
    description:
      "Keep everyone entertained with personalized quizzes about your journey. Hidden surprises await the observant!",
    icon: Sparkles,
  },
  {
    title: "Multiple Babies",
    description:
      "Expecting twins or triplets? Our platform makes it easy to create the perfect reveal for multiple bundles of joy.",
    icon: Baby,
  },
  {
    title: "Beautiful Design",
    description:
      "Choose from elegant themes and customize colors to match your style. Every reveal site looks professionally crafted.",
    icon: Heart,
  },
  {
    title: "Easy Sharing",
    description:
      "Share your reveal page with a simple link. Perfect for including loved ones near and far in your special moment.",
    icon: Share2,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />

      <div className="container relative px-4 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need for the Perfect Reveal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;ve thought of everything to make your reveal special and
            engaging for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 hover:border-border transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-blue p-0.5">
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
