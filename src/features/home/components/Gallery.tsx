import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

interface GalleryProps {
  images: Array<{
    id: string;
    imageUrl: string;
    alt: string;
  }>;
}

export function Gallery({ images = [] }: GalleryProps) {
  // Fallback to empty array if no images provided
  const displayImages = images.length > 0 ? images : [];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Our Farm Gallery</p>
          <h2 className="text-4xl md:text-5xl mb-4">See Our Farm in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into our daily operations and the care we put into
            every aspect
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayImages.map((image, index) => (
            <div
              key={image.id || index}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || `Farm gallery ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
