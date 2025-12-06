import {
  Hero,
  Welcome,
  Products,
  Services,
  Gallery,
  Blog,
  Newsletter,
} from "@/src/features/home";
import { CustomerTestimonials } from "@/src/features/testimonials";
import { Footer } from "@/src/features/shared";

import prisma from "@/src/lib/prisma";

async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 8,
      select: {
        id: true,
        imageUrl: true,
        alt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

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
  const [galleryImages, blogPosts] = await Promise.all([
    getGalleryImages(),
    getBlogPosts(),
  ]);

  return (
    <>
      <Hero />
      <Welcome />
      <Products />
      <Services />
      <Gallery images={galleryImages} />
      <CustomerTestimonials />
      <Blog posts={blogPosts} />
      <Newsletter />
      <Footer />
    </>
  );
}
