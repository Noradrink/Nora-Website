import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDuo from "@/assets/hero-duo.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full">
        <img
          src={heroDuo}
          alt="NORA Strawberry Pearl and Lemon Elderflower cans"
          className="h-[42vh] w-full object-cover md:h-[56vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
      </div>

      <div className="container relative -mt-8 pb-16 text-center md:-mt-16 md:pb-24">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <p className="mb-4 text-xs uppercase tracking-luxe text-peach-deep">
            Skin Hydration Drink
          </p>
          <h1 className="font-serif text-5xl leading-tight text-foreground md:text-7xl">
            Drink to <span className="italic text-primary">Glow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A sparkling beauty ritual, collagen, vitamin C, and electrolytes in
            every can.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#why-nora">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
