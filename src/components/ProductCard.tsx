import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useCartUI } from "@/stores/cartUI";
import type { MergedProduct, PackVariant } from "@/hooks/useMergedProducts";
import type { PackSize } from "@/lib/products";

interface ProductCardProps {
  product: MergedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [packSize, setPackSize] = useState<PackSize>(
    product.defaultVariant.packSize,
  );
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const openCart = useCartUI((s) => s.open);

  const selected: PackVariant =
    product.variants.find((v) => v.packSize === packSize) ??
    product.defaultVariant;

  // "Best value" if the 12-pack is cheaper per can than the 6-pack.
  const six = product.variants.find((v) => v.packSize === 6);
  const twelve = product.variants.find((v) => v.packSize === 12);
  const twelveIsBestValue =
    six?.price != null &&
    twelve?.price != null &&
    twelve.price / 12 < six.price / 6;

  const handleAdd = async () => {
    if (!selected.variantId) return;
    await addItem({
      variantId: selected.variantId,
      quantity: 1,
      title: product.editorial.flavor,
      variantTitle: `${packSize}-Pack`,
      image: product.image,
      price: selected.priceFormatted,
      handle: product.handle,
    });
    openCart();
  };

  return (
    <div className="group flex flex-col">
      <Link
        to={`/product/${product.handle}`}
        className="relative block overflow-hidden rounded-2xl bg-gradient-to-b from-ivory to-rose-muted"
      >
        {product.editorial.badge && (
          <Badge variant="soft" className="absolute left-3 top-3 z-10">
            {product.editorial.badge}
          </Badge>
        )}
        <img
          src={product.image}
          alt={product.editorial.flavor}
          className="aspect-[4/5] w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl text-foreground">
            {product.editorial.flavor}
          </h3>
          <span className="text-sm text-foreground">
            {selected.priceFormatted || "—"}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.editorial.tagline}
        </p>

        {/* Pack toggle */}
        <div className="mt-4 flex rounded-sm border border-border p-1">
          {product.variants.map((v) => (
            <button
              key={v.packSize}
              onClick={() => setPackSize(v.packSize)}
              className={cn(
                "flex-1 rounded-sm px-3 py-1.5 text-xs font-medium tracking-wide transition-colors",
                packSize === v.packSize
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v.packSize}-Pack
            </button>
          ))}
        </div>

        <div className="mt-2 flex min-h-5 items-center justify-between text-xs text-muted-foreground">
          <span>{selected.pricePerCan && `${selected.pricePerCan} / can`}</span>
          {packSize === 12 && twelveIsBestValue && (
            <span className="text-peach-deep">Best value</span>
          )}
        </div>

        <Button
          variant="hero"
          className="mt-3 w-full"
          onClick={handleAdd}
          disabled={!selected.available || !selected.variantId || isLoading}
        >
          {selected.available && selected.variantId
            ? "Add to Cart"
            : "Sold Out"}
        </Button>
      </div>
    </div>
  );
}
