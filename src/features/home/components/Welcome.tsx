import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Welcome() {
  const features = [
    "Free-range and organic farming",
    "No hormones or antibiotics",
    "Ethically raised with care",
    "Fresh daily delivery available",
  ];

  return (
    <section className="pb-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-4/3 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fresh farm chickens"
                width={600}
                height={450}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Our Mega Agg Farm
            </h2>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
              At Mega Farm, we&apos;re dedicated to providing the finest quality
              poultry and eggs. Our commitment to ethical farming practices
              ensures that every product meets the highest standards of
              freshness and nutrition.
            </p>

            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 px-8"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
