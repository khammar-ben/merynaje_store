"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { getProductById } from "./catalog";
import { readStorage, writeStorage } from "./storage";

const CART_KEY = "mn-cart";
export const MAX_QTY = 10;

/** What is stored: names and prices always come from data/products.ts, so they stay up to date. */
export type CartLine = { productId: string; size: string; color: string; qty: number };
export type CartItem = CartLine & { key: string; product: Product };

type Cart = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** False until the saved cart has been read (avoids an "empty cart" flash). */
  hydrated: boolean;
  add: (line: CartLine) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<Cart | null>(null);

const lineKey = (l: Pick<CartLine, "productId" | "size" | "color">) => `${l.productId}|${l.size}|${l.color}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = readStorage<CartLine[]>(CART_KEY, []);
    /* eslint-disable react-hooks/set-state-in-effect -- restoring the saved cart after hydration */
    setLines(Array.isArray(saved) ? saved.filter((l) => getProductById(l.productId)) : []);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, lines);
  }, [lines, hydrated]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const key = lineKey(line);
      const existing = prev.find((l) => lineKey(l) === key);
      if (!existing) return [...prev, { ...line, qty: Math.min(line.qty, MAX_QTY) }];
      return prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + line.qty, MAX_QTY) } : l));
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(1, Math.min(qty, MAX_QTY)) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => lineKey(l) !== key)), []);
  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<Cart>(() => {
    const items = lines
      .map((l) => ({ ...l, key: lineKey(l), product: getProductById(l.productId)! }))
      .filter((i) => i.product);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.qty, 0),
      hydrated,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open,
      close,
    };
  }, [lines, hydrated, add, setQty, remove, clear, isOpen, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
