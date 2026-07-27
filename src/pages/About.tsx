import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blend from "@/assets/nora-cans-blend.png";

export default function About() {
  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            Our Story
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-6xl">
            Beauty you can drink
          </h1>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            NORA began with a simple idea. Hydration should feel like a ritual,
            not a chore. We wanted a drink that tasted beautiful and did
            something real for the skin you live in.
          </p>
          <p>
            So we built one. Every can of NORA brings together marine collagen,
            vitamin C, electrolytes, and hyaluronic acid in a light, sparkling
            sip. No heavy sugar. No long list of fillers. Just clean, functional
            ingredients that support your skin from the inside.
          </p>
          <p>
            We start with two flavors, Strawberry Pearl and Lemon Elderflower.
            One is soft and creamy. The other is bright and floral. Both are
            made to slow you down for a moment, to make an ordinary afternoon
            feel a little more considered.
          </p>
          <p>
            NORA is for anyone who believes that taking care of yourself can be
            small, daily, and lovely. Pour a can. Take a breath. Drink to glow.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-b from-ivory to-rose-muted">
          <img
            src={blend}
            alt="NORA cans"
            className="mx-auto max-h-[420px] w-full object-contain p-10"
          />
        </div>

        <div className="mt-16 text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/shop">Explore the Collection</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
