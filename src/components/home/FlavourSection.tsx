import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMergedProducts } from "@/hooks/useMergedProducts";
import Reveal from "@/components/Reveal";
import lifestyleStrawberry from "@/assets/lifestyle-strawberry.jpg";
import lifestyleLemon from "@/assets/lifestyle-lemon.jpg";
import strawberryCan from "@/assets/strawberry-pearl.png";
import lemonCan from "@/assets/lemon-elderflower.png";

const cards = [
  {
    handle: "strawberry-pearl",
    backdrop: lifestyleStrawberry,
    can: strawberryCan,
    name: "Strawberry Pearl",
    tagline: "Soft, ripe strawberry with a whisper of cream.",
  },
  {
    handle: "lemon-elderflower",
    backdrop: lifestyleLemon,
    can: lemonCan,
    name: "Lemon Elderflower",
    tagline: "Bright Amalfi lemon meets delicate elderflower.",
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
          Two Ways to Glow
        </p>
        <h2 className="font-serif text-4xl text-foreground md:text-5xl">
          Find Your Ritual
        </h2>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.handle} delay={i * 120}>
            <Link to={`/product/${card.handle}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={card.backdrop}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
                <img
                  src={card.can}
                  alt={card.name}
                  className="absolute left-1/2 top-1/2 h-[78%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-[54%]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                  <div>
                    <h3 className="font-serif text-2xl text-background drop-shadow">
                      {card.name}
                    </h3>
                    {priceFor(card.handle) && (
                      <span className="text-sm text-background/90 drop-shadow">
                        from {priceFor(card.handle)}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground md:text-left">
                {card.tagline}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
