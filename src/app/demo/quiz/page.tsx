import { AnimatedBackground } from "@/components/animated-background";
import { Quiz } from "@/components/demo/quiz";
import { cn } from "@/lib/utils";
import { Love_Ya_Like_A_Sister } from "next/font/google";

const font = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: ["400"],
});

export default function DemoQuizPage() {
  return (
    <AnimatedBackground>
      <div className={cn("min-h-screen flex items-center", font.variable)}>
        <div className="container mx-auto px-4 py-12 font-love-ya-like-a-sister">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Baby Prediction Quiz
              </h1>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Help us predict our baby&apos;s future preferences! Answer these
                fun questions and see if you can spot any hidden clues...
              </p>
            </div>
            <Quiz />
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
