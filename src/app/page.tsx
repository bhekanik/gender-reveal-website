import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { ArrowRight, Baby, Heart, Sparkles, Timer, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <AnimatedBackground>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Create Your Perfect Baby Gender Reveal
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Share your special moment with loved ones through an interactive and
            personalized reveal experience. Create polls, quizzes, and countdown
            timers - all in one magical place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
              >
                Create My Baby Reveal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything You Need for the Perfect Reveal
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Create Your Reveal in Minutes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Parents Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm"
              >
                <p className="text-neutral-600 mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Create Your Special Moment?
            </h2>
            <p className="text-xl text-neutral-600">
              Join thousands of parents sharing their joy with loved ones
              through our interactive reveal platform.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 mt-6"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AnimatedBackground>
  );
}

const features = [
  {
    title: "Interactive Polls",
    description:
      "Let friends and family guess the gender before the big reveal. Track votes and build excitement!",
    icon: Users,
  },
  {
    title: "Custom Countdown",
    description:
      "Build anticipation with a beautiful countdown timer to your reveal moment.",
    icon: Timer,
  },
  {
    title: "Fun Mini-Quiz",
    description:
      "Engage guests with a fun quiz about your pregnancy journey and predictions.",
    icon: Sparkles,
  },
  {
    title: "Multiple Babies",
    description:
      "Expecting twins or triplets? Our platform supports multiple baby reveals!",
    icon: Baby,
  },
  {
    title: "Personalization",
    description: "Customize colors, messages, and themes to match your style.",
    icon: Heart,
  },
  {
    title: "Easy Sharing",
    description:
      "Share your reveal page with a simple link. Perfect for including everyone!",
    icon: ArrowRight,
  },
];

const steps = [
  {
    title: "Sign Up",
    description: "Create your free account in seconds and access all features.",
  },
  {
    title: "Customize",
    description:
      "Set your reveal date, customize your page, and add interactive elements.",
  },
  {
    title: "Share & Celebrate",
    description:
      "Share your unique link with loved ones and enjoy the excitement together!",
  },
];

const testimonials = [
  {
    text: "Such a creative way to share our news! Everyone loved guessing and the countdown made it so exciting.",
    name: "Sarah & Mike",
    location: "California",
  },
  {
    text: "Perfect for including our family overseas. They felt like they were part of our special moment!",
    name: "Emma & James",
    location: "New York",
  },
];
