import Image from "next/image";
import { Calendar, User, MessageCircle } from "lucide-react";

export function BlogSingleHero() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Blog post"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-6">
          Continually utilize bleeding edge
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>25 Mar, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Johan Smith</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>3 Comments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
