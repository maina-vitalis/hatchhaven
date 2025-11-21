import { ContactHero, ContactInfo, ContactForm } from "@/src/features/contact";
import { Footer } from "@/src/features/shared";

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
