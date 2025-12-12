import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
  </svg>
);

interface ContactDetail {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  link?: string;
  linkText?: string;
  color: string;
}

export function ContactInfo() {
  const contactDetails: ContactDetail[] = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "0748645010",
      link: "tel:0748645010",
      linkText: "Call now for immediate assistance",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "info@hatchhaven.co.ke",
      link: "mailto:info@hatchhaven.co.ke",
      linkText: "Send us an email anytime",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Nanyuki, Kenya",
      linkText: "Premium poultry farm location",
      color: "bg-red-500/10 text-red-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      subtitle: "Monday - Friday: 8:00 AM - 6:00 PM",
      linkText: "Saturday: 9:00 AM - 4:00 PM",
      color: "bg-purple-500/10 text-purple-600"
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/share/1KR5U8RB2W/?mibextid=wwXIfr",
      color: "hover:text-blue-600"
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/hatchpoultry.ke?igsh=eXM2bXJyOWVzM3Bm&utm_source=qr",
      color: "hover:text-pink-600"
    },
    {
      icon: TikTokIcon,
      name: "TikTok",
      href: "https://www.tiktok.com/@hatchhavenacre?_r=1&_t=ZM-922sRdeftL2",
      color: "hover:text-black"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How To Reach Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-primary">Information</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Choose the most convenient way to get in touch with our team. We're here to help with all your poultry needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {contactDetails.map((detail, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10" />
              <CardContent className="p-8 text-center relative">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${detail.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <detail.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{detail.title}</h3>
                <p className="text-foreground mb-3 font-medium">
                  {detail.subtitle}
                </p>
                {detail.link ? (
                  <Link
                    href={detail.link}
                    className="text-primary hover:text-primary/80 text-sm transition-colors inline-block"
                  >
                    {detail.linkText}
                  </Link>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {detail.linkText}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Follow Us
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Stay Connected
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, farm stories, and product announcements.
          </p>

          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/20 hover:shadow-lg transition-all duration-300 group ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-8 w-8 text-muted-foreground group-hover:scale-110 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
