import Reveal from "@/components/Reveal";
import glow from "@/assets/lifestyle-glow.jpg";

/**
 * Full-bleed immersive brand statement over the glow close-up.
 * An editorial promise, not a customer testimonial.
 */
export default function QuoteSection() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <img
        src={glow}
        alt="Glowing skin, mid-sip"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_center] md:object-[40%_center]"
      />
      {/* scrim for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="mb-6 text-xs uppercase tracking-luxe text-background/80">
            Our Promise
          </p>
          <blockquote className="font-serif text-3xl leading-snug text-background md:text-4xl lg:text-5xl">
            Beauty should feel like a moment you look forward to, not another box
            to check. NORA is that moment, poured over ice.
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-luxe text-background/70">
            The NORA Ethos
          </p>
        </Reveal>
      </div>
    </section>
  );
}
