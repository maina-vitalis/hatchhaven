import {
  ProductHero,
  FilterableProductGrid,
  FeaturedProducts,
  VideoSection,
  ProductGallery,
} from "@/src/features/products";
import { Footer } from "@/src/features/shared";

export default function ProductsPage() {
  return (
    <>
      <ProductHero />
      <FilterableProductGrid />
      <FeaturedProducts />
      <VideoSection />
      <ProductGallery />
      <Footer />
    </>
  );
}
