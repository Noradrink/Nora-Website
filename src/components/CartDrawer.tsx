import { useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useCartUI } from "@/stores/cartUI";

export default function CartDrawer() {
  const { isOpen, setOpen, close } = useCartUI();
  const {
    items,
    updateQuantity,
    removeItem,
    syncCart,
    getCheckoutUrl,
    isLoading,
  } = useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const subtotalNote = items.reduce((sum, i) => {
    const numeric = parseFloat(i.price.replace(/[^0-9.]/g, ""));
    return sum + (Number.isNaN(numeric) ? 0 : numeric * i.quantity);
  }, 0);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button variant="hero" asChild onClick={close}>
              <Link to="/shop">Shop the collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-gradient-to-b from-ivory to-rose-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.handle}`}
                            onClick={close}
                            className="font-serif text-lg leading-tight text-foreground hover:text-peach-deep"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs tracking-wide text-muted-foreground">
                            {item.variantTitle}
                          </p>
                        </div>
                        <p className="text-sm text-foreground">{item.price}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-sm border border-border">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeItem(item.variantId)}
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-serif text-xl text-foreground">
                  ${subtotalNote.toFixed(2)}
                </span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout.
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                Checkout with Shopify
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
