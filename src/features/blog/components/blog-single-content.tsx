"use client";

import Image from "next/image";
import { Share2, Heart, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  author: string;
  avatar: string;
  date: string;
  comment: string;
}

export function BlogSingleContent() {
  const comments: Comment[] = [
    {
      author: "John Anderson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      date: "25 Mar, 2024 at 12:15 pm",
      comment:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.",
    },
    {
      author: "Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "25 Mar, 2024 at 12:45 pm",
      comment:
        "Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-card p-8 rounded-lg shadow-lg space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          Collaboratively administrate empowered markets via plug-and-play
          networks. Dynamically procrastinate B2C users after installed base
          benefits. Dramatically visualize customer directed convergence without
          revolutionary ROI.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Efficiently unleash cross-media information without cross-media value.
          Quickly maximize timely deliverables for real-time schemas.
          Dramatically maintain clicks-and-mortar solutions without functional
          solutions. Completely synergize resource taxing relationships via
          premier niche markets. Professionally cultivate one-to-one customer
          service with robust ideas. Dynamically innovate resource-leveling
          customer service for state of the art customer service.
        </p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded">
          <p className="italic text-foreground leading-relaxed">
            "Efficiently unleash cross-media information without cross-media
            value. Quickly maximize timely deliverables for real-time schemas.
            Dramatically maintain clicks-and-mortar solutions without functional
            solutions."
          </p>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Objectively innovate empowered manufactured products whereas parallel
          platforms. Holisticly predominate extensible testing procedures for
          reliable supply chains. Dramatically engage top-line web services
          vis-a-vis cutting-edge deliverables.
        </p>

        <div className="flex items-center gap-4 pt-8 border-t">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl">Comments (3)</h3>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex gap-4 bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4>{comment.author}</h4>
                <span className="text-sm text-muted-foreground">
                  {comment.date}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-8 rounded-lg shadow-lg">
        <h3 className="mb-6">Leave a Comment</h3>
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg bg-background"
                required
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Your Comment"
              rows={6}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  );
}
