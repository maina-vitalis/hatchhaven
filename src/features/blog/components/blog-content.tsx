"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  ThumbsUp,
  Clock,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { BlogQuote } from "./blog-quote";
import { BlogSidebar } from "./blog-sidebar";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  comments: number;
  likes: number;
  slug: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  featured?: boolean;
}

export function BlogContent() {
  const blogPosts: BlogPost[] = [
    {
      title: "The Complete Guide to Free-Range Chicken Farming",
      excerpt:
        "Discover the benefits of free-range chicken farming and how it impacts both animal welfare and the quality of your poultry products. Learn about best practices, space requirements, and nutrition management for healthier, happier chickens.",
      image:
        "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 23,
      likes: 145,
      slug: "complete-guide-free-range-chicken-farming",
      category: "Farming",
      author: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      date: "March 15, 2024",
      readTime: 8,
      featured: true,
    },
    {
      title: "Organic Poultry Nutrition: Feeding Your Flock Naturally",
      excerpt:
        "Explore organic feeding strategies that promote natural growth and development in your poultry. This comprehensive guide covers organic feed options, supplements, and the importance of proper nutrition for sustainable farming practices.",
      image:
        "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 18,
      likes: 112,
      slug: "organic-poultry-nutrition-feeding-flock-naturally",
      category: "Nutrition",
      author: {
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      date: "March 12, 2024",
      readTime: 6,
    },
    {
      title: "Sustainable Egg Production: Best Practices for Modern Farms",
      excerpt:
        "Learn about sustainable egg production methods that balance productivity with environmental responsibility. We discuss housing systems, waste management, and how to maintain high standards while reducing your farm's ecological footprint.",
      image:
        "https://images.unsplash.com/photo-1601671397510-30dbfaa431db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGVnZ3N8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 31,
      likes: 189,
      slug: "sustainable-egg-production-best-practices",
      category: "Sustainability",
      author: {
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      date: "March 10, 2024",
      readTime: 10,
    },
    {
      title: "Chicken Health Management: Preventing Common Diseases",
      excerpt:
        "A veterinarian's guide to maintaining healthy flocks through preventive care, vaccination schedules, and early disease detection. Essential knowledge for any poultry farmer looking to minimize losses and ensure animal welfare.",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VucyUyMGNvb3B8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 42,
      likes: 256,
      slug: "chicken-health-management-preventing-diseases",
      category: "Health",
      author: {
        name: "Dr. James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
      },
      date: "March 8, 2024",
      readTime: 12,
    },
    {
      title: "Starting Your Backyard Chicken Coop: A Beginner's Guide",
      excerpt:
        "Everything you need to know to start raising chickens in your backyard. From coop design and setup to choosing the right breeds, this guide walks you through each step of beginning your poultry journey.",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VucyUyMGNvb3B8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 15,
      likes: 98,
      slug: "starting-backyard-chicken-coop-beginners-guide",
      category: "Beginners",
      author: {
        name: "Lisa Thompson",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
      date: "March 5, 2024",
      readTime: 7,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {blogPosts.map((post, index) => (
              <div key={post.slug}>
                <BlogPost {...post} />
                {index === 2 && (
                  <div className="mt-10">
                    <BlogQuote />
                  </div>
                )}
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-12 border-t">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                First
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 rounded-md min-w-[40px]"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors rounded-md min-w-[40px]"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors rounded-md min-w-[40px]"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Last
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPost({
  title,
  excerpt,
  image,
  comments,
  likes,
  slug,
  category,
  author,
  date,
  readTime,
  featured,
}: BlogPost) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-primary/90 text-primary-foreground border-0 shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          <Link href={`/blog/${slug}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Category and Meta Info */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <Badge variant="secondary" className="text-xs font-semibold">
              {category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/blog/${slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 leading-relaxed text-base line-clamp-3">
            {excerpt}
          </p>

          {/* Author and Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {author.name}
                </p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">{comments}</span>
                </span>
                <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="font-medium">{likes}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="group/btn w-full sm:w-auto hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              asChild
            >
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center gap-2"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
