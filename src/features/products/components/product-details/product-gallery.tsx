"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isSoldOut?: boolean;
}

export function ProductGallery({ images, productName, isSoldOut }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const mainImage = images[selectedImageIndex] || images[0] || "";

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square lg:aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-sm">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={productName}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image Available
          </div>
        )}
        {/* Favorite Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full shadow-md bg-background/90 hover:bg-background transition-all hover:scale-110"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            )}
          />
        </Button>
        {isSoldOut && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-6 py-3 rounded-full text-lg font-bold shadow-lg transform -rotate-12">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={`image-${index}-${image}`}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                selectedImageIndex === index
                  ? "border-primary ring-2 ring-primary/20 scale-95"
                  : "border-transparent hover:border-primary/50"
              )}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
