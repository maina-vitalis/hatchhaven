"use client";

import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Zap, Minus, Plus, Truck, Shield } from "lucide-react";

interface ProductActionsProps {
  quantity: number;
  stock: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  disabled: boolean;
}

export function ProductActions({
  quantity,
  stock,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  disabled,
}: ProductActionsProps) {
  return (
    <div className="pt-6 mt-auto space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border-2 rounded-xl bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-l-lg hover:bg-transparent"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold text-lg">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-r-lg hover:bg-transparent"
            onClick={() => onQuantityChange(Math.min(stock || 1, quantity + 1))}
            disabled={disabled || quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="lg"
          className="flex-1 h-12 text-base rounded-xl shadow-lg shadow-primary/20"
          onClick={onAddToCart}
          disabled={disabled}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>

      <Button
        size="lg"
        variant="secondary"
        className="w-full h-12 text-base rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20"
        onClick={onBuyNow}
        disabled={disabled}
      >
        <Zap className="mr-2 h-5 w-5 fill-current" />
        Buy Now
      </Button>

      <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Truck className="h-4 w-4" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-4 w-4" />
          <span>Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
