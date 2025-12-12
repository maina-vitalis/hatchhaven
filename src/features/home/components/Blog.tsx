import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string | null;
  publishedAt: Date | null;
}

interface BlogProps {
  posts: BlogPost[];
}

export function Blog({ posts }: BlogProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="h-4 w-4" />
            Latest Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            From Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, tips, and stories from the world of poultry farming
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder-blog.jpg"}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-background/95 px-3 py-2 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                        <Calendar className="h-3 w-3 text-primary" />
                        {post.publishedAt ? format(new Date(post.publishedAt), "MMM dd") : "Draft"}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="pt-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group/link transition-colors duration-200"
                      >
                        Read Full Article
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="group"
                asChild
              >
                <Link href="/blog" className="flex items-center gap-2">
                  Explore All Articles
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-card rounded-lg p-12 shadow-sm max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-foreground text-lg">No blog posts available yet.</p>
              <p className="text-muted-foreground text-sm mt-2">Check back soon for fresh content!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
