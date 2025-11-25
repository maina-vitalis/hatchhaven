import { GalleryHero, GalleryGrid } from "@/src/features/gallery";
import { Footer } from "@/src/features/shared";

import prisma from "@/src/lib/prisma";

async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
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

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <GalleryHero />
      <GalleryGrid images={images} />
      <Footer />
    </>
  );
}
