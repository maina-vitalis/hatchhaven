import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-black/60 to-black/40">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&h=600&fit=crop&crop=center')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Fresh Killed Poultry
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Premium Quality Poultry Delivered Fresh to Your Door
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 px-8"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
