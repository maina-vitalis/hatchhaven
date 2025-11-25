"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface ProductVariant {
  id: string;
  gender: string;
  ageGroup: string;
  price: number;
  stock: number;
}

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
}

export function ProductVariants({
  variants,
  selectedVariant,
  onVariantSelect,
}: ProductVariantsProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-6">
      {/* Gender Selection */}
      {!variants.every((v) => v.gender === "N/A") && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Select Type</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from(new Set(variants.map((v) => v.gender))).map((gender) => {
              const variant = variants.find((v) => v.gender === gender);
              const isSelected = selectedVariant?.gender === gender;
              return (
                <button
                  key={gender}
                  onClick={() => {
                    const newVariant = variants.find((v) => v.gender === gender);
                    if (newVariant) onVariantSelect(newVariant);
                  }}
                  disabled={variant?.stock === 0}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-muted hover:border-primary/50",
                    variant?.stock === 0 && "opacity-50 cursor-not-allowed bg-muted"
                  )}
                >
                  <span className="font-semibold">{gender}</span>
                  {variant?.stock === 0 && (
                    <span className="text-[10px] text-destructive mt-1">
                      Sold Out
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size/Quantity Selection */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {variants.some((v) => v.gender !== "N/A")
              ? "Select Age Group"
              : "Select Size / Quantity"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(variants.map((v) => v.ageGroup)))
            .filter((ageGroup) => {
              if (selectedVariant?.gender && selectedVariant.gender !== "N/A") {
                return variants.some(
                  (v) =>
                    v.ageGroup === ageGroup && v.gender === selectedVariant.gender
                );
              }
              if (variants.every((v) => v.gender === "N/A")) {
                return true;
              }
              return variants.some(
                (v) =>
                  v.ageGroup === ageGroup && v.gender === selectedVariant?.gender
              );
            })
            .map((ageGroup) => {
              const variant = variants.find(
                (v) =>
                  v.ageGroup === ageGroup &&
                  (selectedVariant?.gender === "N/A" ||
                    v.gender === selectedVariant?.gender ||
                    variants.every((v) => v.gender === "N/A"))
              );
              const isSelected = selectedVariant?.ageGroup === ageGroup;
              return (
                <Button
                  key={ageGroup}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const newVariant = variants.find(
                      (v) =>
                        v.ageGroup === ageGroup &&
                        (selectedVariant?.gender === "N/A" ||
                          v.gender === selectedVariant?.gender ||
                          variants.every((v) => v.gender === "N/A"))
                    );
                    if (newVariant) onVariantSelect(newVariant);
                  }}
                  disabled={!variant || variant.stock === 0}
                  className={cn(
                    "h-9 rounded-lg",
                    isSelected && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {ageGroup}
                  {variant && (
                    <span className="ml-1.5 opacity-80 text-xs">
                      — ${variant.price.toFixed(0)}
                    </span>
                  )}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
