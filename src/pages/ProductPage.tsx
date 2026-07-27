import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMergedProductByHandle } from "@/hooks/useMergedProducts";
import { useCartStore } from "@/stores/cartStore";
import { useCartUI } from "@/stores/cartUI";
import type { PackSize } from "@/lib/products";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading } = useMergedProductByHandle(slug);

  const [packSize, setPackSize] = useState<PackSize>(6);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const openCart = useCartUI((s) => s.open);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-24">
          <div className="grid animate-pulse gap-12 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-muted" />
            <div className="space-y-4">
              <div className="h-8 w-1/2 rounded bg-muted" />
              <div className="h-6 w-1/4 rounded bg-muted" />
              <div className="h-24 w-full rounded bg-muted" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <h1 className="font-serif text-4xl text-foreground">
            Product not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            We could not find the product you were looking for.
          </p>
          <Button variant="hero" className="mt-8" asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const { editorial } = product;
  const selected =
    product.variants.find((v) => v.packSize === packSize) ??
    product.defaultVariant;

  const images =
    product.shopifyImages.length > 0
      ? product.shopifyImages
      : [editorial.fallbackImage];

  const handleAdd = async () => {
    if (!selected.variantId) return;
    await addItem({
      variantId: selected.variantId,
      quantity,
      title: editorial.flavor,
      variantTitle: `${packSize}-Pack`,
      image: product.image,
      price: selected.priceFormatted,
      handle: product.handle,
    });
    openCart();
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{editorial.flavor}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-ivory to-rose-muted">
              <img
                src={images[activeImage] ?? images[0]}
                alt={editorial.flavor}
                className="aspect-square w-full object-contain p-10"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "h-20 w-20 overflow-hidden rounded-sm border-2 bg-ivory transition-colors",
                      activeImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-border",
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {editorial.badge && (
              <Badge variant="soft" className="mb-4">
                {editorial.badge}
              </Badge>
            )}
            <h1 className="font-serif text-4xl text-foreground md:text-5xl">
              {editorial.flavor}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {editorial.tagline}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-foreground">
                {selected.priceFormatted || "—"}
              </span>
              {selected.pricePerCan && (
                <span className="text-sm text-muted-foreground">
                  {selected.pricePerCan} / can
                </span>
              )}
            </div>

            {/* Pack toggle */}
            <div className="mt-8">
              <span className="text-xs uppercase tracking-luxe text-muted-foreground">
                Pack Size
              </span>
              <div className="mt-3 flex gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.packSize}
                    onClick={() => setPackSize(v.packSize)}
                    disabled={!v.variantId}
                    className={cn(
                      "flex-1 rounded-sm border px-4 py-3 text-sm transition-colors disabled:opacity-40",
                      packSize === v.packSize
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    <span className="block font-medium">{v.packSize}-Pack</span>
                    {v.priceFormatted && (
                      <span className="block text-xs">{v.priceFormatted}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + add */}
            <div className="mt-6 flex gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAdd}
                disabled={!selected.available || !selected.variantId || isAdding}
              >
                {selected.available && selected.variantId
                  ? "Add to Cart"
                  : "Sold Out"}
              </Button>
            </div>

            {/* Description */}
            <p className="mt-8 leading-relaxed text-muted-foreground">
              {editorial.longDescription}
            </p>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {editorial.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 rounded-sm bg-secondary px-3 py-2.5"
                >
                  <Check className="h-4 w-4 shrink-0 text-peach-deep" />
                  <span className="text-sm text-foreground">{h}</span>
                </div>
              ))}
            </div>

            {/* Taste */}
            <div className="mt-8">
              <h3 className="font-serif text-xl text-foreground">Taste</h3>
              <p className="mt-2 text-muted-foreground">{editorial.taste}</p>
            </div>

            {/* Ingredients */}
            <div className="mt-8">
              <h3 className="font-serif text-xl text-foreground">Ingredients</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {editorial.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mt-8">
              <h3 className="font-serif text-xl text-foreground">Benefits</h3>
              <ul className="mt-3 space-y-2">
                {editorial.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-peach-deep" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-serif text-3xl text-foreground">Reviews</h2>
          {editorial.reviews.length === 0 ? (
            <p className="mt-4 text-muted-foreground">
              No reviews yet. Be the first to share your NORA ritual.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {editorial.reviews.map((review, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <p className="text-muted-foreground">"{review.text}"</p>
                  <footer className="mt-4 text-sm font-medium text-foreground">
                    {review.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
