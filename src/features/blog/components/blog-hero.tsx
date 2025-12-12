import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function BlogHero() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Blog
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12">
            Stay updated with the latest news, tips, and insights from Hatch Haven. Learn about poultry care, farming practices, and delicious recipes featuring our fresh products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#blog-content">
                Browse Articles
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">
                Shop Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
