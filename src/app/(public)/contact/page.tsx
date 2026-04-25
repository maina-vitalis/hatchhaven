import type { Metadata } from "next";
import { ContactHero, ContactInfo, ContactForm } from "@/src/features/contact";
import { Footer } from "@/src/features/shared";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Hatch Haven Acres. Located in Nanyuki, Kenya. Call 0748645010 or email info@hatchhaven.co.ke.",
  openGraph: {
    title: "Contact Hatch Haven Acres",
    description: "Reach out for orders, inquiries, or farm visits.",
    url: "https://www.hatchhavenacres.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <Footer />
    </>
  );
}
