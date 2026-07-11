"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CART_COOKIE_NAME, parseCartCookie } from "@/lib/cart";

interface CartContextValue {
  items: string[];
  count: number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCookie(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`(?:^|; )${CART_COOKIE_NAME}=([^;]*)`));
  return parseCartCookie(match ? decodeURIComponent(match[1]) : undefined);
}

function writeCookie(ids: string[]) {
  const value = encodeURIComponent(JSON.stringify(ids));
  // 30-day cart, lax samesite is enough since this is read for display/convenience only —
  // checkout always re-validates products and prices server-side from this cookie's IDs.
  document.cookie = `${CART_COOKIE_NAME}=${value}; path=/; max-age=2592000; samesite=lax`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // One-time hydration from document.cookie, which doesn't exist during SSR. Reading it via
    // a lazy useState initializer instead would make the client's first render diverge from
    // the server-rendered HTML and trigger a hydration mismatch — this has to run post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readCookie());
  }, []);

  const addItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        if (prev.includes(productId)) return prev;
        const next = [...prev, productId];
        writeCookie(next);
        return next;
      });
      router.refresh();
    },
    [router]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const next = prev.filter((id) => id !== productId);
        writeCookie(next);
        return next;
      });
      router.refresh();
    },
    [router]
  );

  const clear = useCallback(() => {
    setItems([]);
    writeCookie([]);
    router.refresh();
  }, [router]);

  return (
    <CartContext.Provider value={{ items, count: items.length, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
