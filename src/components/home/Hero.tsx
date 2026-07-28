import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/photo-hero.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-muted/60 via-background to-peach-soft/50">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-peach/40 blur-3xl" />

      <div className="container relative grid items-center gap-10 py-10 md:min-h-[calc(100vh-6.5rem)] md:grid-cols-2 md:gap-12 md:py-12">
        {/* Copy */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="mb-4 text-xs uppercase tracking-luxe text-peach-deep md:text-sm">
            Skin-First Sparkling Hydration
          </p>
          <h1 className="font-serif text-6xl leading-[0.98] text-foreground md:text-7xl lg:text-8xl">
            Drink to <span className="italic text-primary">Glow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
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

        {/* Photo */}
        <div className="order-1 md:order-2">
          <div className="mx-auto max-w-md overflow-hidden rounded-3xl shadow-2xl md:ml-auto">
            <img
              src={heroPhoto}
              alt="NORA Strawberry Pearl and Lemon Elderflower cans"
              className="aspect-[3/4] w-full object-cover md:aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
