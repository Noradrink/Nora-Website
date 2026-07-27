import { create } from "zustand";

interface CartUIState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

/**
 * Lightweight, non-persisted UI state controlling the cart drawer.
 */
export const useCartUI = create<CartUIState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
}));
