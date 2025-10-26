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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fresh farm chickens"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-full p-8 shadow-lg">
              <div className="text-center">
                <div className="text-3xl">100%</div>
                <div className="text-xs">Organic</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary mb-2">Welcome to Our Mega Agg Farm</p>
            <h2 className="text-4xl md:text-5xl mb-6">
              Quality You Can Trust, Freshness You Can Taste
            </h2>
            <p className="text-muted-foreground mb-8">
              At Mega Farm, we're dedicated to providing the finest quality
              poultry and eggs. Our commitment to ethical farming practices
              ensures that every product meets the highest standards of
              freshness and nutrition.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/about">Discover More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
