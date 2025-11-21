"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
}

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      src: "https://images.unsplash.com/photo-1659288311731-fb6975a4cde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMG91dGRvb3J8ZW58MXx8fHwxNzYxMzgzMDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Free range chickens",
    },
    {
      src: "https://images.unsplash.com/photo-1656082305048-1c52029110c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwY2FnZXMlMjBmYXJtfGVufDF8fHx8MTc2MTM4MzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Chicken cages",
    },
    {
      src: "https://images.unsplash.com/photo-1720508664849-0bd2e5d927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2hpY2tzJTIweWVsbG93fGVufDF8fHx8MTc2MTM4MzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Baby chicks",
    },
    {
      src: "https://images.unsplash.com/photo-1723625449830-ed7f88977635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNoaWNrZW5zJTIwZmFybXxlbnwxfHx8fDE3NjEzODMwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "White chickens",
    },
    {
      src: "https://images.unsplash.com/photo-1749367494185-a41c68e8a8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBob2xkaW5nJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjEzODMwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Farmer with chicken",
    },
    {
      src: "https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTM4MzAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Poultry farm interior",
    },
  ];

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
