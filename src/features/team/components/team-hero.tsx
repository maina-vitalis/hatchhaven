import Image from "next/image";

export function TeamHero() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1705113998946-1eefc7961c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYxMzc3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Team"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-4">Our Team</h1>
        <p className="text-lg">
          Meet the dedicated professionals behind Hatch Haven
        </p>
      </div>
    </section>
  );
}
