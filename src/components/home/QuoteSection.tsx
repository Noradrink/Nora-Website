import Reveal from "@/components/Reveal";

/**
 * An editorial brand statement, not a customer testimonial. No fabricated
 * reviews or ratings.
 */
export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-rose-muted/40 to-background py-24 md:py-32">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-peach/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-rose/30 blur-3xl" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs uppercase tracking-luxe text-peach-deep">
            Our Promise
          </p>
          <blockquote className="font-serif text-3xl leading-snug text-foreground md:text-4xl lg:text-5xl">
            Beauty should feel like a moment you look forward to, not another box
            to check. NORA is that moment, poured over ice.
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-luxe text-muted-foreground">
            The NORA Ethos
          </p>
        </Reveal>
      </div>
    </section>
  );
}
