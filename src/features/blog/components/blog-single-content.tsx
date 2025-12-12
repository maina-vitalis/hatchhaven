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
        // Share cancelled
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


    </div>
  );
}
