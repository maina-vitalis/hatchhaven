import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContactDetail {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function ContactInfo() {
  const contactDetails: ContactDetail[] = [
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "Sector # 48,123 Street,Melbourn City",
      subtitle: "Australia",
    },
    {
      icon: <Phone className="h-8 w-8 text-white" />,
      title: "+8978-658-125, 0078-88-964",
      subtitle: "012 859 6510083",
    },
    {
      icon: <Mail className="h-8 w-8 text-white" />,
      title: "info@megafarm.com",
      subtitle: "www.MegaFarm.com",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactDetails.map((detail, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
                  {detail.icon}
                </div>
                <p className="mb-1">{detail.title}</p>
                <p className="text-muted-foreground">{detail.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
