import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMergedProducts } from "@/hooks/useMergedProducts";
import Reveal from "@/components/Reveal";
import lifestyleStrawberry from "@/assets/photo-strawberry.jpg";
import lifestyleLemon from "@/assets/photo-lemon.jpg";

const cards = [
  {
    handle: "strawberry-pearl",
    image: lifestyleStrawberry,
    name: "Strawberry Pearl",
    tagline: "Soft strawberry with a smooth, lightly sweet finish.",
  },
  {
    handle: "lemon-elderflower",
    image: lifestyleLemon,
    name: "Lemon Elderflower",
    tagline: "Bright citrus with a delicate floral finish.",
  },
];

export default function FlavourSection() {
  const { products } = useMergedProducts();

  const priceFor = (handle: string) =>
    products.find((x) => x.handle === handle)?.defaultVariant?.priceFormatted ??
    "";

  return (
    <section className="container py-20 md:py-28">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
          Our Flavours
        </p>
        <h2 className="font-serif text-4xl text-foreground md:text-5xl">
          Find Your Ritual
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {cards.map((card, i) => (
          <Reveal key={card.handle} delay={i * 120}>
            <Link
              to={`/product/${card.handle}`}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <img
                src={card.image}
                alt={card.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 md:aspect-[5/6]"
              />
              {/* legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/5 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl text-background drop-shadow-sm md:text-4xl">
                      {card.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-background/85">
                      {card.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-background">
                      Shop Flavour
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  {priceFor(card.handle) && (
                    <span className="whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-sm text-foreground">
                      from {priceFor(card.handle)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
