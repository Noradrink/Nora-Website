import { Link } from "react-router-dom";
import { Sparkles, Leaf, Heart, FlaskConical } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import vanity from "@/assets/lifestyle-vanity.jpg";
import glow from "@/assets/lifestyle-glow.jpg";

const values = [
  {
    icon: FlaskConical,
    title: "Functional first",
    text: "Every can is built around clinically backed actives, collagen, vitamin C, electrolytes, and hyaluronic acid.",
  },
  {
    icon: Leaf,
    title: "Clean, never heavy",
    text: "Low sugar, around 20 calories, and no long list of fillers. Just what belongs and nothing that does not.",
  },
  {
    icon: Heart,
    title: "Made to enjoy",
    text: "Beauty should feel good. NORA is a ritual you look forward to, not another thing to tick off.",
  },
  {
    icon: Sparkles,
    title: "Glow from within",
    text: "Real hydration and skin support, sipped daily, so your routine works from the inside out.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="container pt-16 text-center md:pt-24">
        <Reveal className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            Our Story
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-6xl">
            Beauty you can drink
          </h1>
        </Reveal>
      </section>

      {/* Story + image */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={vanity}
                alt="NORA on a vanity"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              NORA began with a simple idea. Hydration should feel like a ritual,
              not a chore. We wanted a drink that tasted beautiful and did
              something real for the skin you live in.
            </p>
            <p>
              So we built one. Every can of NORA brings together marine collagen,
              vitamin C, electrolytes, and hyaluronic acid in a light, sparkling
              sip. No heavy sugar. No long list of fillers. Just clean,
              functional ingredients that support your skin from the inside.
            </p>
            <p>
              We start with two flavours, Strawberry Pearl and Lemon Elderflower.
              One is soft and creamy. The other is bright and floral. Both are
              made to slow you down for a moment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
              What We Believe
            </p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Small ritual, real intention
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 100}
                className="rounded-2xl border border-border/60 bg-background p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-peach-soft/70 text-peach-deep">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed image line */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden">
        <img
          src={glow}
          alt="Glowing skin"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/70 via-foreground/35 to-transparent" />
        <div className="container">
          <Reveal className="max-w-xl">
            <p className="font-serif text-3xl leading-snug text-background md:text-4xl">
              Take care of yourself in a way that feels small, daily, and lovely.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center md:py-24">
        <Button variant="hero" size="lg" asChild>
          <Link to="/shop">Explore the Collection</Link>
        </Button>
      </section>
    </Layout>
  );
}
