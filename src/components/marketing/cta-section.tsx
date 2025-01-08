import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 text-center mx-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Create Your Special Moment?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of parents sharing their joy with loved ones through
            our interactive reveal platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90 w-full sm:w-auto"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
