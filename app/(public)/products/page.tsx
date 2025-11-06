import {
  ProductHero,
  Categories,
  ProductGrid,
  FeaturedProducts,
  VideoSection,
  ProductGallery,
} from "@/src/features/products";
import { Footer } from "@/src/features/shared";

export default function ProductsPage() {
  return (
    <>
      <ProductHero />
      <Categories />
      <ProductGrid />
      <FeaturedProducts />
      <VideoSection />
      <ProductGallery />
      <Footer />
    </>
  );
}
