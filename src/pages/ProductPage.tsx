import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Check, Truck, Leaf, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrustRow from "@/components/TrustRow";
import NutritionPanel from "@/components/NutritionPanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  useMergedProductByHandle,
  useMergedProducts,
} from "@/hooks/useMergedProducts";
import { useCartStore } from "@/stores/cartStore";
import { useCartUI } from "@/stores/cartUI";
import type { PackSize } from "@/lib/products";

const assurances = [
  { icon: Truck, label: "Free shipping over $45" },
  { icon: RefreshCw, label: "30-day happiness promise" },
  { icon: Leaf, label: "Clean, functional formula" },
];

const productFaqs = [
  {
    q: "How many cans come in a pack?",
    a: "Choose a 6-pack or a 12-pack above. The 12-pack is the best value per can.",
  },
  {
    q: "How should I store it?",
    a: "Keep it in a cool, dry place and refrigerate before serving. NORA tastes best ice cold.",
  },
  {
    q: "When will it arrive?",
    a: "Orders ship within 1 to 2 business days, with delivery typically in 3 to 7 business days.",
  },
];

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading } = useMergedProductByHandle(slug);
  const { products: allProducts } = useMergedProducts();

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

  const crossSell = allProducts.filter((p) => p.handle !== product.handle);

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
                className="aspect-square w-full object-cover"
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
                    <img src={img} alt="" className="h-full w-full object-cover" />
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

            <TrustRow className="mt-6" />

            {/* Pack toggle */}
            <div className="mt-8">
              <span className="text-xs uppercase tracking-luxe text-muted-foreground">
                Pack Size
              </span>
              <div className="mt-3 flex gap-3">
                {product.variants.map((v) => {
                  const isBest =
                    v.packSize === 12 &&
                    v.price != null &&
                    product.variants[0]?.price != null &&
                    v.price / 12 < product.variants[0].price / 6;
                  return (
                    <button
                      key={v.packSize}
                      onClick={() => setPackSize(v.packSize)}
                      disabled={!v.variantId}
                      className={cn(
                        "relative flex-1 rounded-sm border px-4 py-3 text-sm transition-colors disabled:opacity-40",
                        packSize === v.packSize
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50",
                      )}
                    >
                      <span className="block font-medium">{v.packSize}-Pack</span>
                      {v.priceFormatted && (
                        <span className="block text-xs">{v.priceFormatted}</span>
                      )}
                      {isBest && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary-foreground">
                          Best value
                        </span>
                      )}
                    </button>
                  );
                })}
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

            {/* Assurances */}
            <ul className="mt-6 space-y-2">
              {assurances.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-peach-deep" />
                  {label}
                </li>
              ))}
            </ul>

            {/* Description */}
            <p className="mt-8 leading-relaxed text-muted-foreground">
              {editorial.longDescription}
            </p>

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

            {/* Nutrition + benefits */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <NutritionPanel />
              <div>
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

            {/* FAQ */}
            <div className="mt-10">
              <h3 className="font-serif text-xl text-foreground">
                Good to know
              </h3>
              <Accordion type="single" collapsible className="mt-2">
                {productFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`f-${i}`}>
                    <AccordionTrigger className="text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <h2 className="text-center font-serif text-3xl text-foreground">
              Complete the ritual
            </h2>
            <div className="mx-auto mt-8 grid max-w-3xl gap-8 sm:grid-cols-2">
              {crossSell.map((p) => (
                <Link
                  key={p.handle}
                  to={`/product/${p.handle}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-gradient-to-b from-ivory to-rose-muted">
                    <img
                      src={p.image}
                      alt={p.editorial.flavor}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-foreground">
                      {p.editorial.flavor}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {p.editorial.tagline}
                    </p>
                    <span className="mt-2 inline-block text-sm text-peach-deep">
                      {p.defaultVariant.priceFormatted &&
                        `from ${p.defaultVariant.priceFormatted}`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
