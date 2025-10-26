import Image from "next/image";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1705113998946-1eefc7961c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYxMzc3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Farm video"
              fill
              className="w-full h-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-10 w-10 text-primary-foreground ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
