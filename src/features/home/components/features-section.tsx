import { Truck, Shield, Award, Phone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders over $50",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "100% fresh guarantee",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Best poultry farm 2024",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
