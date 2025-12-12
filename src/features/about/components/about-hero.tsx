import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowDown, Award, Users, Leaf } from "lucide-react";

export function AboutHero() {
  const highlights = [
    { icon: Award, label: "25+ Years", sublabel: "Experience" },
    { icon: Users, label: "10,000+", sublabel: "Happy Customers" },
    { icon: Leaf, label: "100%", sublabel: "Organic & Ethical" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Hatch Haven
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12">
            For over 25 years, we've been committed to raising the finest poultry with ethical farming practices, delivering fresh, quality products to families and businesses across the region.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#our-story">
                Our Story
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">
                View Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
