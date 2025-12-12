import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function TeamHero() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our Team
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12">
            Our dedicated team brings together decades of experience in sustainable farming and ethical poultry production. Get to know the passionate professionals behind Hatch Haven.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#team-members">
                Meet the Team
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
