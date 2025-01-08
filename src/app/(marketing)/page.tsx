import { CTASection } from "@/components/marketing/cta-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { StepsSection } from "@/components/marketing/steps-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
