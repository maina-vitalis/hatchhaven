import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">From Our Blog</h2>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.image || "/placeholder-blog.jpg"}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.publishedAt ? format(new Date(post.publishedAt), "MMM dd, yyyy") : "Draft"}
                      </div>
                    </div>
                    <h3 className="mb-3">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <Button
                      variant="link"
                      className="text-primary p-0 h-auto"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
