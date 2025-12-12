import { Check, Leaf, Shield, Heart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export function Welcome() {
  const features = [
    {
      icon: Leaf,
      title: "Free-range & Organic",
      description: "Naturally raised in open pastures"
    },
    {
      icon: Shield,
      title: "No Hormones or Antibiotics",
      description: "100% natural and chemical-free"
    },
    {
      icon: Heart,
      title: "Ethically Raised",
      description: "With care and respect for animal welfare"
    },
    {
      icon: Truck,
      title: "Fresh Daily Delivery",
      description: "Farm-to-table freshness guaranteed"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fresh farm chickens at Hatch Haven"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 z-10">
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-lg">
                  Premium Quality
                </Badge>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-8 -left-4 w-16 h-16 bg-primary/5 rounded-full blur-lg" />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Est. 2010 • Award Winning Farm
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Welcome to{" "}
                <span className="text-primary">Hatch Haven</span>
              </h2>
              <p className="text-lg text-muted-foreground leadiaxed max-w-lg">
                At Hatch Haven, we're dedicated to providing the finest quality poultry and eggs through ethical farming practices and sustainable agriculture.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all px-8 h-12"
                asChild
              >
                <Link href="/about">
                  Learn More About Us
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 hover:bg-primary/5 h-12 px-8"
                asChild
              >
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
