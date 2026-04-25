import type { Metadata } from "next";
import { FAQHero, FAQContent } from "@/src/features/faq";
import { Footer } from "@/src/features/shared";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about ordering, delivery, our breeds, and farming practices at Hatch Haven Acres.",
  openGraph: {
    title: "FAQ | Hatch Haven Acres",
    description: "Everything you need to know before placing your order.",
    url: "https://www.hatchhavenacres.com/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQHero />
      <FAQContent />
      <Footer />
    </>
  );
}
