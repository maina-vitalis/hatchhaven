"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/src/context/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
