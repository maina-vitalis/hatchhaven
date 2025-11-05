import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hatch Haven Farm"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto text-white">
          <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
            Get To Know Us
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            About Hatch Haven
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            For over 25 years, we've been committed to raising the finest
            poultry with ethical farming practices, delivering fresh, quality
            products to families and businesses across the region.
          </p>
        </div>
      </div>
    </section>
  );
}
