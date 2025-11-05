import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
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

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
          Get In Touch
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out to us with any questions, comments, or inquiries.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
          <span>Home</span>
          <span>/</span>
          <span className="text-white">Contact</span>
        </div>
      </div>
    </section>
  );
}
