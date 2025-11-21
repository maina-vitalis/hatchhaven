"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Share2, Heart, Flag, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
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
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentForm, setCommentForm] = useState({
    author: "",
    email: "",
    content: "",
  });

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await fetch(`/api/blog/posts/${slug}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        toast.success("Post liked!");
      } else {
        toast.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentForm.author || !commentForm.email || !commentForm.content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/blog/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentForm),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Comment submitted for approval");
        setCommentForm({ author: "", email: "", content: "" });
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="space-y-8">
      <div className="bg-card p-8 rounded-lg shadow-lg space-y-6">
        <div
          className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex items-center gap-4 pt-8 border-t">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
          >
            {isLiking ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Heart className="mr-2 h-4 w-4" />
            )}
            Like ({likes})
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      {post.comments.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl">Comments ({post.comments.length})</h3>
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 bg-card p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={comment.avatar || "/placeholder-avatar.jpg"}
                  alt={comment.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4>{comment.author}</h4>
                  <span className="text-sm text-muted-foreground">
                    {format(
                      new Date(comment.createdAt),
                      "dd MMM, yyyy 'at' h:mm a"
                    )}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-card p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Leave a Comment</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your comment will be reviewed before being published.
        </p>
        <form className="space-y-4" onSubmit={handleCommentSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comment-name">Name *</Label>
              <Input
                id="comment-name"
                type="text"
                placeholder="Your Name"
                value={commentForm.author}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, author: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment-email">Email *</Label>
              <Input
                id="comment-email"
                type="email"
                placeholder="Your Email"
                value={commentForm.email}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment-content">Comment *</Label>
            <Textarea
              id="comment-content"
              placeholder="Share your thoughts..."
              rows={6}
              value={commentForm.content}
              onChange={(e) =>
                setCommentForm({ ...commentForm, content: e.target.value })
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
