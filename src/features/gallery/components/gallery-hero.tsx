import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function GalleryHero() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Farm Gallery
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12">
            Take a visual journey through Hatch Haven. See our happy chickens, beautiful farm facilities, and the care that goes into raising our premium poultry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#gallery-content">
                View Photos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
