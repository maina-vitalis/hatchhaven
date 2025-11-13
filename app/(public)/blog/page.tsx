import { BlogHero, BlogContent } from "@/src/features/blog";
import { Footer } from "@/src/features/shared";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: {
              where: {
                approved: true,
              },
            },
          },
        },
      },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" },
      ],
      take: 10,
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      image: post.image,
      featured: post.featured,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      views: post.views,
      likes: post.likes,
      comments: post._count.comments,
      category: {
        id: post.category.id,
        name: post.category.name,
        slug: post.category.slug,
      },
      author: {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
        avatar: post.author.avatar,
      },
      tags: post.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
        slug: pt.tag.slug,
      })),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

async function getBlogCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      postCount: category._count.posts,
    }));
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

async function getRecentPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 4,
    });

    return posts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categories, recentPosts] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
    getRecentPosts(),
  ]);

  return (
    <>
      <BlogHero />
      <BlogContent initialPosts={posts} categories={categories} recentPosts={recentPosts} />
      <Footer />
    </>
  );
}
