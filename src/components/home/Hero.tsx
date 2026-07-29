import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5.5rem)] items-end overflow-hidden md:items-center">
      {/* Full-bleed photo */}
      <img
        src={heroBg}
        alt="NORA Strawberry Pearl and Lemon Elderflower cans"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center] md:object-[center]"
      />
      {/* Legibility scrim: bottom fade on mobile, left fade on desktop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/30 to-transparent md:bg-gradient-to-r md:from-background/90 md:via-background/45 md:to-transparent" />

      <div className="container pb-14 md:pb-0">
        <div className="max-w-xl animate-fade-in text-center md:text-left">
          <p className="mb-4 text-xs uppercase tracking-luxe text-peach-deep md:text-sm">
            Skin-First Sparkling Hydration
          </p>
          <h1 className="font-serif text-6xl leading-[0.95] tracking-tight text-foreground drop-shadow-sm md:text-7xl lg:text-8xl">
            Drink to <span className="text-peach-deep">Glow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-foreground/80 md:mx-0 md:text-lg">
            A sparkling collagen beverage designed to support skin hydration and
            radiance, in flavours you will actually crave.
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
      </div>
    </section>
  );
}
