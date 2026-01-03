"use client";

import { Badge } from "@/src/components/ui/badge";
import { Star } from "lucide-react";
import { cn, formatPrice } from "@/src/lib/utils";

interface ProductInfoProps {
  name: string;
  category: string;
  purpose?: string;
  origin?: string;
  price?: number;
  stockStatus: string;
  stockBadgeClasses: string;
  stockCount: number;
}

export function ProductInfo({
  name,
  category,
  purpose,
  origin,
  price,
  stockStatus,
  stockBadgeClasses,
  stockCount,
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {category}
          </Badge>
          {purpose && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-muted-foreground border-muted-foreground/20"
            >
              {purpose}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
          {name}
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-medium underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer transition-colors">
            128 Reviews
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        {price !== undefined ? (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground tracking-tight">
                  {formatPrice(price)}
                </span>
                <span className="text-muted-foreground font-medium">
                  / unit
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Price includes VAT
              </p>
            </div>

            <div className="text-right">
              <Badge
                variant="outline"
                className={cn(
                  "px-2.5 py-0.5 rounded-full border mb-1.5",
                  stockBadgeClasses
                )}
              >
                {stockStatus}
              </Badge>
              {stockCount > 0 && stockCount <= 10 && (
                <p className="text-[10px] text-red-500 font-medium animate-pulse">
                  Only {stockCount} left!
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground font-medium">
              Select options to view price
            </p>
          </div>
        )}
      </div>

      {origin && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 p-3 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          Origin: <span className="font-medium text-foreground">{origin}</span>
        </div>
      )}
    </div>
  );
}
