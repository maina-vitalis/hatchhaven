import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowDown, Phone, Mail, MapPin } from "lucide-react";

export function ContactHero() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12">
            We'd love to hear from you. Reach out to us with any questions, comments, or inquiries about our premium poultry products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#contact-form">
                Send Message
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:0748645010">
                Call Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
