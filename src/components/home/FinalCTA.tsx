import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="bg-foreground text-background">
      <div className="container py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
          Begin the ritual.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-background/70">
          Two flavors, one glow. Find the can that is yours.
        </p>
        <div className="mt-8">
          <Button variant="hero" size="lg" asChild>
            <Link to="/shop">Shop NORA</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
