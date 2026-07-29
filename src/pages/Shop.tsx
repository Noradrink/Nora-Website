import { Truck, RefreshCw, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import TrustRow from "@/components/TrustRow";
import { useMergedProducts } from "@/hooks/useMergedProducts";

const assurances = [
  { icon: Truck, label: "Free shipping over $45" },
  { icon: RefreshCw, label: "30-day happiness promise" },
  { icon: Sparkles, label: "5g collagen in every can" },
];

export default function Shop() {
  const { products, isLoading, error } = useMergedProducts();
  const hasProducts = products.some((p) => p.defaultVariant.variantId);

  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            The Collection
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-6xl">
            Shop NORA
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Sparkling beauty in every can. Choose your flavour, choose your pack.
          </p>
        </div>

        <TrustRow className="mx-auto mb-14 max-w-3xl" />

        {isLoading && (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-muted" />
                <div className="mt-4 h-5 w-2/3 rounded bg-muted" />
                <div className="mt-2 h-4 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              We could not load products right now. Please refresh in a moment.
            </p>
          </div>
        )}

        {!isLoading && !error && !hasProducts && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}

        {!isLoading && !error && hasProducts && (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}

        {/* Assurances */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center gap-6 border-t border-border pt-10 sm:flex-row sm:gap-12">
          {assurances.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 text-peach-deep" />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
