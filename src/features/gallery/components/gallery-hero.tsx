import Image from "next/image";

export function GalleryHero() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VucyUyMGNvb3B8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Farm gallery"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-4">Hatch Haven Gallery</h1>
        <p className="text-lg">
          <span className="text-white/70">Home</span> /{" "}
          <span className="text-white/70">Gallery</span> / <span>Gallery</span>
        </p>
      </div>
    </section>
  );
}
