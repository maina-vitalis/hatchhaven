import { Shield, Truck, Award } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "All our poultry is raised with the highest standards of care and quality.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available for orders placed before 2 PM.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized as the best poultry supplier in the region for 3 consecutive years.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to providing the highest quality poultry
            products with exceptional service
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
