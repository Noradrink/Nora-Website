import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

/**
 * Sync the local cart with Shopify on mount and whenever the tab becomes
 * visible again (e.g. returning from the hosted checkout). Call once, high in
 * the tree (inside AppRoutes).
 */
export function useCartSync() {
  const syncCart = useCartStore((s) => s.syncCart);

  useEffect(() => {
    syncCart();

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        syncCart();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncCart]);
}
