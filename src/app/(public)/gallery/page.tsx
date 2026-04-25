import type { Metadata } from "next";
import { GalleryHero, GalleryGrid } from "@/src/features/gallery";
import { Footer } from "@/src/features/shared";
import prisma from "@/src/lib/prisma";

export const metadata: Metadata = {
  title: "Farm Gallery",
  description:
    "Photos from Hatch Haven Acres — our birds, facilities, and daily farm life in Nanyuki, Kenya.",
  openGraph: {
    title: "Farm Gallery | Hatch Haven Acres",
    description: "A visual look at life on our free-range poultry farm.",
    url: "https://www.hatchhavenacres.com/gallery",
  },
};

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
