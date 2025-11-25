import Image from "next/image";
import { Calendar, User, MessageCircle } from "lucide-react";
import { format } from "date-fns";

interface BlogSingleHeroProps {
  post: {
    title: string;
    image: string | null;
    publishedAt: Date | null;
    author: {
      name: string;
    };
    comments: number;
  };
}

export function BlogSingleHero({ post }: BlogSingleHeroProps) {
  const imageUrl = post.image || "/placeholder-blog.jpg";
  const publishedDate = post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Unknown";

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-end justify-center overflow-hidden pb-16">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm md:text-base font-medium text-white/90 flex-wrap">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          {post.comments > 0 && (
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments} {post.comments === 1 ? "Comment" : "Comments"}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
