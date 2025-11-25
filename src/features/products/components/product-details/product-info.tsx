"use client";

import { Badge } from "@/src/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="secondary"
          className="text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20"
        >
          {category}
        </Badge>
        {purpose && (
          <Badge variant="outline" className="text-xs">
            {purpose}
          </Badge>
        )}
        <div className="flex items-center gap-1 text-yellow-500 text-sm ml-auto">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium text-foreground">4.9</span>
          <span className="text-muted-foreground">(128 reviews)</span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight">
          {name}
        </h1>
        {origin && (
          <p className="text-base text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/60" />
            Origin: {origin}
          </p>
        )}
      </div>

      {/* Price & Stock */}
      <div className="flex items-end gap-4 pb-4 border-b">
        {price !== undefined ? (
          <>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">/ unit</span>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <Badge variant="outline" className={cn("mb-1", stockBadgeClasses)}>
                {stockStatus}
              </Badge>
              {stockCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  {stockCount} available
                </span>
              )}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">
            Select a variant to see pricing
          </p>
        )}
      </div>
    </div>
  );
}
