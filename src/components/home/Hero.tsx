import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import strawberryCan from "@/assets/strawberry-pearl.png";
import lemonCan from "@/assets/lemon-elderflower.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-soft/50 via-background to-background">
      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-peach/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-rose/40 blur-3xl" />

      <div className="container relative grid items-center gap-10 py-16 md:min-h-[86vh] md:grid-cols-2 md:gap-8 md:py-20">
        {/* Copy */}
        <div className="relative z-10 order-2 text-center md:order-1 md:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs tracking-wide text-muted-foreground">
              Skin hydration, reimagined
            </span>
          </div>

          <h1 className="font-serif text-6xl leading-[1.02] text-foreground md:text-7xl lg:text-8xl">
            Drink to <span className="italic text-primary">Glow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:mx-0">
            A sparkling beauty ritual. Collagen, vitamin C, and electrolytes in
            every can, made for the way you want to feel.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#why-nora">Discover the Ritual</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs uppercase tracking-luxe text-muted-foreground md:justify-start">
            <span>5g Collagen</span>
            <span className="h-1 w-1 rounded-full bg-peach-deep" />
            <span>20 Calories</span>
            <span className="h-1 w-1 rounded-full bg-peach-deep" />
            <span>No Fillers</span>
          </div>
        </div>

        {/* Cans */}
        <div className="relative order-1 flex items-end justify-center md:order-2 md:h-[70vh]">
          <div className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-gradient-to-br from-peach/40 to-rose/40 blur-2xl md:h-96 md:w-96" />
          <img
            src={strawberryCan}
            alt="NORA Strawberry Pearl"
            className="relative z-10 w-40 animate-float drop-shadow-2xl sm:w-48 md:w-56 lg:w-64"
          />
          <img
            src={lemonCan}
            alt="NORA Lemon Elderflower"
            className="relative z-0 -ml-10 w-36 animate-float-slow drop-shadow-2xl sm:w-44 md:w-52 lg:w-60"
          />
        </div>
      </div>
    </section>
  );
}
