"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface GalleryGridProps {
  images: Array<{
    id: string;
    imageUrl: string;
    alt: string;
  }>;
}

export function GalleryGrid({ images = [] }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use provided images or fallback to empty array
  const displayImages = images.length > 0 ? images : [];

  const galleryImages = displayImages.map(img => ({
    src: img.imageUrl,
    alt: img.alt
  }));

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <div className="relative">
            {selectedImage && (
              <div className="relative">
                <Image
                  src={selectedImage}
                  alt="Gallery image"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
