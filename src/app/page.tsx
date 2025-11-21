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

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Products />
      <Services />
      <Gallery />
      <CustomerTestimonials />
      <Blog />
      <Newsletter />
      <Footer />
    </>
  );
}
