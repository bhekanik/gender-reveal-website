const testimonials = [
  {
    text: "Pink and Blue made our virtual gender reveal absolutely magical! The countdown timer and poll kept everyone engaged, and the reveal moment was perfect.",
    name: "Sarah & Mike",
    location: "California, USA",
  },
  {
    text: "We loved how easy it was to include our family overseas. The quiz feature was a hit, and everyone felt like they were part of our special moment!",
    name: "Emma & James",
    location: "London, UK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-brand-blue/5 dark:from-background dark:to-brand-blue/10 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5" />

      <div className="container relative px-4 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Loved by Parents Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of parents who&apos;ve made their reveal moments
            unforgettable.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all"
            >
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 h-8 w-8 text-brand-pink/20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-lg text-muted-foreground mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-blue" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
