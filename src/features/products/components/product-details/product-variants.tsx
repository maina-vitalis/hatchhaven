"use client";

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

  const genders = Array.from(new Set(variants.map((v) => v.gender)));
  const hasGender = !variants.every((v) => v.gender === "N/A");

  return (
    <div className="space-y-6">
      {/* Gender Selection */}
      {hasGender && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            Select Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genders.map((gender) => {
              const variant = variants.find((v) => v.gender === gender);
              const isSelected = selectedVariant?.gender === gender;
              const isOutOfStock = variants
                .filter((v) => v.gender === gender)
                .every((v) => v.stock === 0);

              return (
                <button
                  key={gender}
                  onClick={() => {
                    // Try to find a variant with the same age group first
                    let newVariant = variants.find(
                      (v) =>
                        v.gender === gender &&
                        v.ageGroup === selectedVariant?.ageGroup
                    );
                    // If not found, just get the first one
                    if (!newVariant) {
                      newVariant = variants.find((v) => v.gender === gender);
                    }
                    if (newVariant) onVariantSelect(newVariant);
                  }}
                  disabled={isOutOfStock}
                  className={cn(
                    "relative flex items-center justify-center py-3 px-4 rounded-xl border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-muted bg-background hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground",
                    isOutOfStock && "opacity-50 cursor-not-allowed bg-muted/50"
                  )}
                >
                  <span className="font-semibold">{gender}</span>
                  {isSelected && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-primary rounded-full ring-2 ring-background" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Age Group / Size Selection */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-foreground">
            {hasGender ? "Select Age Group" : "Select Option"}
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(variants.map((v) => v.ageGroup)))
            .filter((ageGroup) => {
              // Show age groups relevant to selected gender (if gender selected)
              if (hasGender && selectedVariant?.gender) {
                return variants.some(
                  (v) =>
                    v.ageGroup === ageGroup &&
                    v.gender === selectedVariant.gender
                );
              }
              return true;
            })
            .map((ageGroup) => {
              // Find the specific variant for this age group + selected gender
              const variant = variants.find(
                (v) =>
                  v.ageGroup === ageGroup &&
                  (!hasGender || v.gender === selectedVariant?.gender)
              );

              const isSelected = selectedVariant?.ageGroup === ageGroup;
              const isOutOfStock = !variant || variant.stock === 0;

              return (
                <button
                  key={ageGroup}
                  onClick={() => variant && onVariantSelect(variant)}
                  disabled={isOutOfStock}
                  className={cn(
                    "group relative flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-muted bg-background hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground",
                    isOutOfStock && "opacity-50 cursor-not-allowed bg-muted/50"
                  )}
                >
                  <span className="font-medium text-sm">{ageGroup}</span>
                  {variant && !isOutOfStock ? (
                    <span
                      className={cn(
                        "text-xs font-semibold px-1.5 py-0.5 rounded-md transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                      )}
                    >
                      {variant.price.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[10px] text-destructive font-medium uppercase tracking-wide">
                      Sold Out
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
