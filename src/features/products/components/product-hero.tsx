import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export function ProductHero() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fresh farm chickens"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-4">Fresh Killed Poultry</h1>
        <p className="text-xl md:text-2xl mb-8">
          Chicken, Specialty Game Meats, Eggs And More!
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
          <Link href="#products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
