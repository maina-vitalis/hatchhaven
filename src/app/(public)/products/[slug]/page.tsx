import { Metadata } from "next";
import { ProductDetails } from "@/src/features/products/components/product-details";
import { Footer } from "@/src/features/shared";
import { notFound } from "next/navigation";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductData(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const title = product.name;
  const description = `${product.name} - ${product.breed.description.substring(
    0,
    150
  )}...`;
  const images =
    product.images.length > 0 ? product.images : ["/placeholder-product.jpg"];

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: title,
      })),
      url: `https://www.hatchhavenacres.com/products/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: images,
    },
  };
}

async function getProductData(slug: string) {
  try {
    // Find the breed by slug first
    const breed = await prisma.breed.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
        variants: {
          include: {
            images: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!breed || breed.variants.length === 0) {
      return null;
    }

    // Get all images for the breed
    const breedImages = await prisma.productImage.findMany({
      where: { breedId: breed.id },
      orderBy: { order: "asc" },
    });

    // Transform the data to match the frontend structure
    return {
      id: breed.variants[0].id, // Use first variant ID for compatibility
      slug: breed.slug,
      name: breed.name,
      category: breed.category.name,
      categorySlug: breed.category.slug,
      breed: {
        id: breed.id,
        name: breed.name,
        slug: breed.slug,
        description: breed.description,
        origin: breed.origin ?? undefined,
        purpose: breed.purpose ?? undefined,
        image:
          breed.image ||
          breed.category.image ||
          "/placeholder-product.jpg",
      },
      variants: breed.variants.map((v) => ({
        id: v.id,
        gender: v.gender,
        ageGroup: v.ageGroup,
        price: v.price,
        stock: v.stock,
        image:
          v.image ||
          v.images[0]?.imageUrl ||
          breed.image ||
          "/placeholder-product.jpg",
      })),
      images: [
        ...breedImages.map((img) => img.imageUrl),
        ...(breed.variants.map((v) => v.image).filter(Boolean) as string[]),
        breed.image,
      ].filter(Boolean) as string[],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(slug: string) {
  try {
    // Get the current breed by slug to find its category
    const currentBreed = await prisma.breed.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!currentBreed) {
      return [];
    }

    // Get other breeds from the same category, excluding the current breed
    const relatedBreeds = await prisma.breed.findMany({
      where: {
        categoryId: currentBreed.categoryId,
        id: {
          not: currentBreed.id,
        },
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
            image: true,
          },
        },
        variants: {
          take: 1, // Get first variant for each breed
          include: {
            images: {
              take: 1,
              orderBy: { order: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    // Transform the data - return breed-based products with slug
    return relatedBreeds
      .filter(breed => breed.variants.length > 0) // Only include breeds with variants
      .map((breed) => {
        const firstVariant = breed.variants[0];
        return {
          id: breed.id,
          slug: breed.slug,
          name: breed.name,
          price: firstVariant.price,
          image:
            firstVariant.image ||
            firstVariant.images[0]?.imageUrl ||
            breed.image ||
            breed.category.image ||
            "/placeholder-product.jpg",
          category: breed.category.name,
          categorySlug: breed.category.slug,
        };
      });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductData(slug);
  const relatedProducts = await getRelatedProducts(slug);

  if (!product) {
    notFound();
  }

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const inStock = product.variants.some((v) => v.stock > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.breed.description,
    image: product.images[0] ?? "/placeholder-product.jpg",
    url: `https://www.hatchhavenacres.com/products/${slug}`,
    brand: { "@type": "Brand", name: "Hatch Haven Acres" },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: lowestPrice,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Hatch Haven Acres" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}