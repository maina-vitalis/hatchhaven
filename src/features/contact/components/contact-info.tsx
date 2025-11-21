import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";

interface ContactDetail {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link?: string;
  linkText?: string;
}

export function ContactInfo() {
  const contactDetails: ContactDetail[] = [
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Visit Us",
      subtitle: "Sector # 48, 123 Street",
      linkText: "Melbourne City, Australia",
    },
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Call Us",
      subtitle: "+61 2 8596 5100",
      link: "tel:+61285965100",
      linkText: "+61 2 8596 5101",
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email Us",
      subtitle: "info@hatchhaven.com",
      link: "mailto:info@hatchhaven.com",
      linkText: "Send us an email",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Business Hours",
      subtitle: "Monday - Friday: 8:00 AM - 6:00 PM",
      linkText: "Saturday: 9:00 AM - 4:00 PM",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
            How To Reach Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Information
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the most convenient way to get in touch with our team
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactDetails.map((detail, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {detail.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{detail.title}</h3>
                <p className="text-foreground mb-1 font-medium">
                  {detail.subtitle}
                </p>
                {detail.link ? (
                  <Link
                    href={detail.link}
                    className="text-primary hover:text-primary/80 text-sm transition-colors inline-block mt-2"
                  >
                    {detail.linkText}
                  </Link>
                ) : (
                  <p className="text-muted-foreground text-sm mt-2">
                    {detail.linkText}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
