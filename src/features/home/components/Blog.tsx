import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export function Blog() {
  const posts: BlogPost[] = [
    {
      title: "The Benefits of Free-Range Farming",
      excerpt:
        "Discover why free-range farming produces healthier, happier chickens and better quality eggs.",
      date: "Oct 15, 2025",
      category: "Farming",
      image:
        "https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Farm-to-Table: Our Journey",
      excerpt:
        "Learn about our commitment to sustainable practices and how we ensure the freshest products.",
      date: "Oct 10, 2025",
      category: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Healthy Recipes with Fresh Eggs",
      excerpt:
        "Check out our favorite recipes that showcase the incredible flavor of farm-fresh eggs.",
      date: "Oct 5, 2025",
      category: "Recipes",
      image:
        "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Latest Updates</p>
          <h2 className="text-4xl md:text-5xl mb-4">From Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and stories from our farm
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <span className="text-primary">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
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
                  <Link href="/blog">
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
      </div>
    </section>
  );
}
