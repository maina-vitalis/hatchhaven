"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";

interface BlogSingleContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    slug: string;
    likes: number;
    comments: Array<{
      id: string;
      author: string;
      avatar: string | null;
      content: string;
      createdAt: Date;
    }>;
  };
}

export function BlogSingleContent({ post }: BlogSingleContentProps) {
  const params = useParams();
  const slug = (params?.slug as string) || post.slug;
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-card p-8 md:p-12 rounded-xl shadow-sm border space-y-8">
        <div
          className="prose prose-lg max-w-none text-foreground/90 leading-relaxed prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg ProseMirror"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex items-center justify-between pt-8 border-t">
          <span className="text-sm text-muted-foreground font-medium">
            Share this post
          </span>
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {post.comments.length > 0 && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl font-bold">Comments</h3>
            <span className="bg-muted px-2.5 py-0.5 rounded-full text-sm font-medium text-muted-foreground">
              {post.comments.length}
            </span>
          </div>
          
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-4 bg-card p-6 rounded-xl border shadow-sm transition-colors hover:border-primary/20"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border-2 border-background shadow-sm">
                  <Image
                    src={comment.avatar || "/placeholder-avatar.jpg"}
                    alt={comment.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-base">{comment.author}</h4>
                    <span className="text-xs text-muted-foreground">
                      {format(
                        new Date(comment.createdAt),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
