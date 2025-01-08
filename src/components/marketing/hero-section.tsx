import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[100svh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-dot-pattern">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-brand-pink via-primary to-brand-blue bg-clip-text text-transparent">
              Share Your Special Moment
            </span>
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
            Create Your Perfect Baby Gender Reveal
          </h2>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create a beautiful, interactive reveal experience in minutes. Engage
          your loved ones with polls, quizzes, and countdowns - all in one
          magical place.
        </p>

        {/* Preview Images */}
        <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[250px]">
          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center">
            <div
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl
              transform
              -rotate-6
              translate-y-4
              md:translate-y-0
              z-20
              transition-all
              hover:rotate-0
              hover:z-30"
            >
              <Image
                src="/images/settings.png"
                alt="Preview of reveal site"
                fill
                className="object-contain"
              />
            </div>
            <div
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl
              transform
              -translate-y-16
              md:-translate-y-0
              md:translate-y-8
              z-10
              transition-all
              hover:translate-y-0
              hover:z-30"
            >
              <Image
                src="/images/screenshot.png"
                alt="Preview of reveal site"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl
              transform
              rotate-6
              -translate-y-32
              md:translate-y-0
              transition-all
              hover:rotate-0
              hover:z-30"
            >
              <Image
                src="/images/reveal.jpeg"
                alt="Preview of reveal site"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90 w-full sm:w-auto"
            >
              Create My Reveal Site <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Demo Site
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
