"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { PreOrderModal } from "@/components/store/PreOrderModal";
import { ProductDrawer } from "@/components/store/ProductDrawer";
import type { ColorwayId } from "@/lib/products";

export type PreOrderPrefill = Readonly<{
  productId?: string;
  colorwayId?: ColorwayId;
}>;

type StoreState = Readonly<{
  activeProductId: string | null;
  preOrderOpen: boolean;
  preOrderPrefill: PreOrderPrefill;
}>;

type StoreActions = Readonly<{
  openProduct: (productId: string) => void;
  closeProduct: () => void;
  openPreOrder: (prefill?: PreOrderPrefill) => void;
  closePreOrder: () => void;
}>;

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

/**
 * Holds the two pieces of global UI state on the page (which product drawer
 * is open, whether the pre-order modal is open) and mounts both overlays once
 * at the root so any section can trigger them.
 */
export function StoreProvider({ children }: { children: ReactNode }): JSX.Element {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [preOrderPrefill, setPreOrderPrefill] = useState<PreOrderPrefill>({});

  const openProduct = useCallback((productId: string) => setActiveProductId(productId), []);
  const closeProduct = useCallback(() => setActiveProductId(null), []);

  const openPreOrder = useCallback((prefill: PreOrderPrefill = {}) => {
    setPreOrderPrefill(prefill);
    setActiveProductId(null);
    setPreOrderOpen(true);
  }, []);
  const closePreOrder = useCallback(() => setPreOrderOpen(false), []);

  const value = useMemo(
    () => ({
      activeProductId,
      preOrderOpen,
      preOrderPrefill,
      openProduct,
      closeProduct,
      openPreOrder,
      closePreOrder,
    }),
    [activeProductId, preOrderOpen, preOrderPrefill, openProduct, closeProduct, openPreOrder, closePreOrder],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <ProductDrawer />
      <PreOrderModal />
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState & StoreActions {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside <StoreProvider>.");
  }
  return context;
}
