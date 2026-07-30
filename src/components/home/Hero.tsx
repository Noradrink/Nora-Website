import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-5.5rem)] md:grid-cols-[0.95fr_1.05fr]">
      {/* Text panel */}
      <div className="relative order-2 flex items-center overflow-hidden bg-gradient-to-br from-rose-muted via-background to-peach-soft md:order-1">
        {/* soft glow accents */}
        <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-peach/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-rose/40 blur-3xl" />

        <div className="relative px-6 py-16 sm:px-10 md:px-12 lg:px-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-luxe text-peach-deep">
            Skin-First Sparkling Hydration
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Drink to
            <br />
            <span className="text-peach-deep">Glow</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            A sparkling collagen beverage made to support skin hydration and
            radiance, in flavours you will actually crave.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#why-nora">Discover the Ritual</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-luxe text-muted-foreground">
            <span>5g Collagen</span>
            <span className="h-1 w-1 rounded-full bg-peach-deep" />
            <span>20 Calories</span>
            <span className="h-1 w-1 rounded-full bg-peach-deep" />
            <span>No Fillers</span>
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="relative order-1 min-h-[44vh] md:order-2 md:min-h-0">
        <img
          src={heroPhoto}
          alt="NORA Strawberry Pearl and Lemon Elderflower cans"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
      </div>
    </section>
  );
}
