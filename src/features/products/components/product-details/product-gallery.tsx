"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isSoldOut?: boolean;
}

export function ProductGallery({
  images,
  productName,
  isSoldOut,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mainImage = images[selectedImageIndex] || images[0] || "";

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 h-full lg:h-[600px] xl:h-[700px]">
      {/* Thumbnail Strip (Vertical on Desktop, Horizontal on Mobile) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-auto lg:overflow-y-auto lg:w-24 shrink-0 no-scrollbar pb-2 lg:pb-0">
          {images.map((image, index) => (
            <button
              key={`image-${index}-${image}`}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative flex-none w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-xl border-2 transition-all",
                selectedImageIndex === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-border"
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 bg-muted rounded-3xl overflow-hidden aspect-square lg:aspect-auto">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={productName}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
            priority
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
            No Image Available
          </div>
        )}

        {isSoldOut && (
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-destructive/90 backdrop-blur-md text-destructive-foreground px-4 py-2 rounded-full text-sm font-bold shadow-xl">
              SOLD OUT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
