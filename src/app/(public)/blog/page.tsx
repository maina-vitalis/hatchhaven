import type { Metadata } from "next";
import { BlogHero, BlogContent } from "@/src/features/blog";
import { Footer } from "@/src/features/shared";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Poultry farming tips, breed guides, farm news, and more from the Hatch Haven Acres team.",
  openGraph: {
    title: "Blog | Hatch Haven Acres",
    description: "Insights and stories from our farm in Nanyuki, Kenya.",
    url: "https://www.hatchhavenacres.com/blog",
  },
};

async function getBlogPosts(page: number = 1, postsPerPage: number = 6) {
  try {
    const skip = (page - 1) * postsPerPage;

    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
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
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
        skip,
        take: postsPerPage,
      }),
      prisma.blogPost.count({
        where: {
          published: true,
        },
      }),
    ]);

    const formattedPosts = posts.map((post) => ({
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

    return { posts: formattedPosts, totalCount };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], totalCount: 0 };
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 6;

  const [{ posts, totalCount }, categories, recentPosts] = await Promise.all([
    getBlogPosts(currentPage, postsPerPage),
    getBlogCategories(),
    getRecentPosts(),
  ]);

  return (
    <>
      <BlogHero />
      <BlogContent
        initialPosts={posts}
        categories={categories}
        recentPosts={recentPosts}
        totalPosts={totalCount}
        postsPerPage={postsPerPage}
      />
      <Footer />
    </>
  );
}
