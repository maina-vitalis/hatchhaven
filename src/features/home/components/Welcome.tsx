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
      description: "Naturally raised in open pastures",
    },
    {
      icon: Shield,
      title: "No Hormones or Antibiotics",
      description: "100% natural and chemical-free",
    },
    {
      icon: Heart,
      title: "Ethically Raised",
      description: "With care and respect for animal welfare",
    },
    {
      icon: Truck,
      title: "Fresh Daily Delivery",
      description: "Farm-to-table freshness guaranteed",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration - Simplified */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* Main image */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                <Image
                  src="https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fresh farm chickens at Hatch Haven"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -right-6 z-10 hidden md:block">
                <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Quality
                    </p>
                    <p className="font-bold text-foreground">100% Organic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="w-fit px-4 py-1 border-primary/20 text-primary bg-primary/5"
              >
                Est. 2010 • Award Winning Farm
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Welcome to <span className="text-primary">Hatch Haven</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                We are dedicated to providing the finest quality poultry and
                eggs through ethical farming practices and sustainable
                agriculture. Our birds roam free, ensuring healthier, tastier
                produce for your family.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all px-8 h-12 text-base"
                asChild
              >
                <Link href="/about">Our Story</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-input hover:bg-accent text-foreground h-12 px-8 text-base"
                asChild
              >
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
