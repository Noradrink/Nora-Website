import Reveal from "@/components/Reveal";

const ingredients = [
  {
    num: "01",
    name: "Collagen",
    benefit: "Supports skin hydration",
  },
  {
    num: "02",
    name: "Vitamin C",
    benefit: "Supports collagen production",
  },
  {
    num: "03",
    name: "Electrolytes",
    benefit: "Hydration balance",
  },
  {
    num: "04",
    name: "Hyaluronic Acid",
    benefit: "Skin moisture support",
  },
];

export default function WhyNora() {
  return (
    <section
      id="why-nora"
      className="relative overflow-hidden bg-gradient-to-b from-background via-peach-soft/40 to-background py-24 md:py-32"
    >
      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-peach/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-rose/40 blur-3xl" />

      <div className="container relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            What's Inside
          </p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">
            Functional ingredients. Real benefits.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Each can is formulated with clinically backed actives, no fillers, no
            compromises.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((item, i) => (
            <Reveal
              key={item.num}
              delay={i * 100}
              className="group rounded-2xl border border-border/60 bg-background/70 p-8 backdrop-blur-sm transition-colors hover:border-primary/60"
            >
              <span className="font-serif text-2xl text-peach-deep/70">
                {item.num}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-foreground">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.benefit}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
