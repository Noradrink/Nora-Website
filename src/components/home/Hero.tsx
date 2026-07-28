import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/photo-hero.jpg";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-6.5rem)] flex-col">
      {/* Full-bleed editorial banner */}
      <div className="relative w-full flex-1 overflow-hidden">
        <img
          src={heroBanner}
          alt="NORA Strawberry Pearl and Lemon Elderflower"
          className="h-full max-h-[62vh] min-h-[280px] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Headline block */}
      <div className="container relative z-10 -mt-6 pb-10 text-center md:pb-14">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <p className="mb-4 text-xs uppercase tracking-luxe text-peach-deep md:text-sm">
            Skin-First Sparkling Hydration
          </p>
          <h1 className="font-serif text-6xl leading-[0.98] text-foreground md:text-8xl">
            Drink to <span className="italic text-primary">Glow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A sparkling collagen beverage designed to support skin hydration and
            radiance, in flavours you will actually crave.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#why-nora">Discover the Ritual</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
