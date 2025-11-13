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
  const publishedDate = post.publishedAt ? format(new Date(post.publishedAt), "dd MMM, yyyy") : "Unknown";

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments} {post.comments === 1 ? "Comment" : "Comments"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
