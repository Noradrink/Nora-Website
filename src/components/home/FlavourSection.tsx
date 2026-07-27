import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMergedProducts } from "@/hooks/useMergedProducts";
import lifestyleStrawberry from "@/assets/lifestyle-strawberry.jpg";
import lifestyleLemon from "@/assets/lifestyle-lemon.jpg";

const cards = [
  {
    handle: "strawberry-pearl",
    image: lifestyleStrawberry,
    name: "Strawberry Pearl",
    tagline: "Soft, ripe strawberry with a whisper of cream.",
  },
  {
    handle: "lemon-elderflower",
    image: lifestyleLemon,
    name: "Lemon Elderflower",
    tagline: "Bright Amalfi lemon meets delicate elderflower.",
  },
];

export default function FlavourSection() {
  const { products } = useMergedProducts();

  const priceFor = (handle: string) => {
    const p = products.find((x) => x.handle === handle);
    return p?.defaultVariant?.priceFormatted ?? "";
  };

  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
          Two Ways to Glow
        </p>
        <h2 className="font-serif text-4xl text-foreground md:text-5xl">
          Find Your Ritual
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.handle}
            to={`/product/${card.handle}`}
            className="group block"
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-ivory to-rose-muted">
              <img
                src={card.image}
                alt={card.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-foreground">
                  {card.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.tagline}
                </p>
              </div>
              {priceFor(card.handle) && (
                <span className="whitespace-nowrap pt-1 text-sm text-muted-foreground">
                  from {priceFor(card.handle)}
                </span>
              )}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-peach-deep">
              Shop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
