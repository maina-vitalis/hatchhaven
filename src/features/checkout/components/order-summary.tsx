"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/cart-context";
import { formatPrice } from "@/src/lib/utils";

export function OrderSummary() {
  const { items, cartTotal } = useCart();

  const subtotal = cartTotal;
  const total = subtotal;

  if (items.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-16 w-16 rounded-md bg-muted overflow-hidden shrink-0 border relative">
                {item.image ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                    Img
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <div className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            Secure Checkout - 256-bit SSL Encrypted
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
