import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fresh farm chickens"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="text-primary mb-4">Welcome to Our Farm</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
            Fresh Ethical Poultry
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/80">
            Chicken, Turkey, Ducks
          </p>
          <p className="text-lg mb-8 text-white/70 max-w-xl">
            Experience the difference of farm-fresh, ethically raised poultry.
            Committed to quality, sustainability, and the highest standards of
            animal welfare.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur border-white text-white hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
