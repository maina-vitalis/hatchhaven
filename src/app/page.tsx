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

export default async function Home() {
  const galleryImages = await getGalleryImages();

  return (
    <>
      <Hero />
      <Welcome />
      <Products />
      <Services />
      <Gallery images={galleryImages} />
      <CustomerTestimonials />
      <Blog />
      <Newsletter />
      <Footer />
    </>
  );
}
