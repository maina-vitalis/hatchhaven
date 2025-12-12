import {
  Hero,
  Welcome,
  Products,
  Services,
  Blog,
  Newsletter,
} from "@/src/features/home";
import { CustomerTestimonials } from "@/src/features/testimonials";
import { Footer } from "@/src/features/shared";

import prisma from "@/src/lib/prisma";

async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        image: true,
        publishedAt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Hero />
      <Welcome />
      <Products />
      <Services />
      <CustomerTestimonials />
      <Blog posts={blogPosts} />
      <Newsletter />
      <Footer />
    </>
  );
}
