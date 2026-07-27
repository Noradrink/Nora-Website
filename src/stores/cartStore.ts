import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import {
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
} from "@/lib/shopifyCart";

export interface CartItem {
  variantId: string;
  lineId: string | null;
  quantity: number;
  // Display metadata (not authoritative — price still comes from Shopify)
  title: string;
  variantTitle: string;
  image: string;
  price: string; // formatted, for display
  handle: string;
}

interface CartState {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;

  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,

      addItem: async (item) => {
        set({ isLoading: true });
        try {
          const { cartId } = get();
          const existing = get().items.find(
            (i) => i.variantId === item.variantId,
          );

          // If already in cart, just bump quantity via update.
          if (existing) {
            await get().updateQuantity(
              item.variantId,
              existing.quantity + item.quantity,
            );
            toast.success(`${item.title} added to cart`);
            return;
          }

          if (!cartId) {
            const result = await createShopifyCart({
              variantId: item.variantId,
              quantity: item.quantity,
            });
            set({
              cartId: result.cartId,
              checkoutUrl: result.checkoutUrl,
              items: [...get().items, { ...item, lineId: result.lineId }],
            });
          } else {
            const result = await addLineToShopifyCart(cartId, {
              variantId: item.variantId,
              quantity: item.quantity,
            });

            if (result.cartNotFound) {
              // Stale cart — recreate from scratch.
              const fresh = await createShopifyCart({
                variantId: item.variantId,
                quantity: item.quantity,
              });
              set({
                cartId: fresh.cartId,
                checkoutUrl: fresh.checkoutUrl,
                items: [{ ...item, lineId: fresh.lineId }],
              });
            } else if (result.success) {
              set({
                checkoutUrl: result.checkoutUrl ?? get().checkoutUrl,
                items: [
                  ...get().items,
                  { ...item, lineId: result.lineId ?? null },
                ],
              });
            } else {
              throw new Error("Could not add item to cart.");
            }
          }

          toast.success(`${item.title} added to cart`);
        } catch (err) {
          toast.error("Could not add to cart", {
            description: err instanceof Error ? err.message : undefined,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        const { cartId } = get();
        const item = get().items.find((i) => i.variantId === variantId);
        if (!item) return;

        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }

        // Optimistic update
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        });

        if (cartId && item.lineId) {
          const result = await updateShopifyCartLine(
            cartId,
            item.lineId,
            quantity,
          );
          if (result.cartNotFound) {
            get().clearCart();
            toast.error("Your cart expired. Please add items again.");
          } else if (result.checkoutUrl) {
            set({ checkoutUrl: result.checkoutUrl });
          }
        }
      },

      removeItem: async (variantId) => {
        const { cartId } = get();
        const item = get().items.find((i) => i.variantId === variantId);

        set({ items: get().items.filter((i) => i.variantId !== variantId) });

        if (cartId && item?.lineId) {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.cartNotFound) {
            get().clearCart();
          } else if (result.checkoutUrl) {
            set({ checkoutUrl: result.checkoutUrl });
          }
        }
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      syncCart: async () => {
        const { cartId, items } = get();
        if (!cartId || items.length === 0) return;
        // Lightweight presence check by attempting a no-op update on first line.
        set({ isSyncing: true });
        try {
          const first = items[0];
          if (first.lineId) {
            const result = await updateShopifyCartLine(
              cartId,
              first.lineId,
              first.quantity,
            );
            if (result.cartNotFound) {
              get().clearCart();
            } else if (result.checkoutUrl) {
              set({ checkoutUrl: result.checkoutUrl });
            }
          }
        } catch {
          // Non-fatal; keep local state.
        } finally {
          set({ isSyncing: false });
        }
      },

      getCheckoutUrl: () => get().checkoutUrl,
    }),
    {
      name: "shopify-cart",
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);
