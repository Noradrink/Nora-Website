import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useMergedProducts } from "@/hooks/useMergedProducts";

export default function Shop() {
  const { products, isLoading, error } = useMergedProducts();

  const hasProducts = products.some((p) => p.defaultVariant.variantId);

  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            The Collection
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">
            Shop NORA
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Sparkling beauty in every can. Choose your flavor, choose your pack.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
