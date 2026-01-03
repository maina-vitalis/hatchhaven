"use client";

import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Zap, Minus, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
    <div className="space-y-4 pt-4">
      <div className="flex items-stretch gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border rounded-xl bg-background shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-10 rounded-l-xl hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-semibold text-lg tabular-nums">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-10 rounded-r-xl hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onQuantityChange(Math.min(stock || 1, quantity + 1))}
            disabled={disabled || quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          variant="outline"
          className="flex-1 h-12 text-base font-semibold rounded-xl border-2 hover:bg-muted/50 transition-all active:scale-[0.98]"
          onClick={onAddToCart}
          disabled={disabled}
        >
          Add to Cart
        </Button>
      </div>

      {/* Buy Now Button */}
      <Button
        size="lg"
        className={cn(
          "w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98]",
          "bg-gradient-to-r from-primary to-primary/90 hover:to-primary"
        )}
        onClick={onBuyNow}
        disabled={disabled}
      >
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 fill-current" />
          <span>Buy Now via WhatsApp</span>
        </div>
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Secure checkout powered by WhatsApp Business</span>
      </div>
    </div>
  );
}
