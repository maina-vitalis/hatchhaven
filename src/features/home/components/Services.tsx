import {
  Truck,
  Shield,
  Award,
  Leaf,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Services() {
  const services: Service[] = [
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Free Delivery",
      description:
        "Free delivery on orders over $50 within 20 miles of our farm",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed or your money back",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Award Winning",
      description: "Recognized for excellence in sustainable farming practices",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Organic & Ethical",
      description:
        "Certified organic with the highest animal welfare standards",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Always Fresh",
      description: "Farm-to-table freshness delivered daily to your door",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: "Community First",
      description: "Supporting local communities and sustainable agriculture",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">What We Offer</p>
          <h2 className="text-4xl md:text-5xl mb-4">Our Farm Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Committed to providing exceptional service alongside our premium
            products
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-colors"
            >
              <CardContent className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
